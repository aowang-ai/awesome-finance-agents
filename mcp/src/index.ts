// Read-only MCP server for Awesome Finance Agents (https://finance-agents.dev).
//
// Stateless Streamable HTTP at /mcp. Data comes from the live site
// (/projects.json and the per-page .md files), cached for 10 minutes, so list
// updates reach MCP clients without redeploying this Worker.
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { WebStandardStreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js'
import { CfWorkerJsonSchemaValidator } from '@modelcontextprotocol/sdk/validation/cfworker'
import { z } from 'zod'

interface RateLimit {
  limit(opts: { key: string }): Promise<{ success: boolean }>
}
export interface Env {
  SITE_URL: string
  RATE_LIMITER?: RateLimit
}

type Lang = 'en' | 'zh'
interface Chapter {
  id: string
  num: number | null
  slug: string
  title_en: string
  title_zh: string
  question_en: string
  question_zh: string
  entries: number
  url_en: string
  url_zh: string
  md_en: string
  md_zh: string
}
interface Project {
  name: string
  url: string
  chapter: string
  chapter_title_en: string
  chapter_title_zh: string
  section: string
  section_zh: string
  description_en: string
  description_zh: string
  tags: string[]
}
interface Data {
  generated: string
  site: string
  chapters: Chapter[]
  projects: Project[]
}

const TTL_MS = 10 * 60 * 1000
const memo = new Map<string, { at: number; value: unknown }>()

async function cachedFetch<T>(url: string, parse: (r: Response) => Promise<T>): Promise<T> {
  const hit = memo.get(url)
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value as T
  try {
    const res = await fetch(url, { cf: { cacheTtl: 600, cacheEverything: true } } as RequestInit)
    if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`)
    const value = await parse(res)
    memo.set(url, { at: Date.now(), value })
    return value
  } catch (e) {
    if (hit) return hit.value as T // serve stale on upstream errors
    throw e
  }
}

const site = (env: Env) => (env.SITE_URL || 'https://finance-agents.dev').replace(/\/$/, '')
const loadData = (env: Env) => cachedFetch<Data>(`${site(env)}/projects.json`, (r) => r.json())

const norm = (s: string) => s.normalize('NFKC').toLowerCase()

function findChapter(data: Data, id: string): Chapter | undefined {
  const k = norm(String(id).trim()).replace(/^chapter\s*/, '').replace(/^第\s*|\s*章$/g, '')
  return data.chapters.find(
    (c) => c.id === k || c.slug === k || norm(c.title_en) === k || norm(c.title_zh) === k ||
      (k === '附录' && c.id === 'appendix'),
  )
}

function searchProjects(data: Data, query: string, chapter?: string, limit = 10) {
  const terms = norm(query).split(/[\s,，、]+/).filter(Boolean)
  const ch = chapter ? findChapter(data, chapter) : undefined
  if (chapter && !ch) throw new Error(`Unknown chapter "${chapter}". Use list_chapters.`)
  const pool = ch ? data.projects.filter((p) => p.chapter === ch.id) : data.projects
  const fields = (p: Project): [string, number][] => [
    [norm(p.name), 6],
    [norm(p.url), 2],
    [norm(`${p.section} ${p.section_zh}`), 3],
    [norm(`${p.chapter_title_en} ${p.chapter_title_zh}`), 2],
    [norm(`${p.description_en} ${p.description_zh}`), 2],
    [p.tags.join(' '), 3],
  ]
  const score = (p: Project, every: boolean) => {
    let total = 0
    let matched = 0
    const f = fields(p)
    for (const t of terms) {
      let s = 0
      for (const [text, w] of f) if (text.includes(t)) s += w * (text === t ? 2 : 1)
      if (s) matched++
      total += s
    }
    if (!terms.length) return 1
    if (every && matched < terms.length) return 0
    return total
  }
  let ranked = pool.map((p) => ({ p, s: score(p, true) })).filter((x) => x.s > 0)
  if (!ranked.length && terms.length > 1) ranked = pool.map((p) => ({ p, s: score(p, false) })).filter((x) => x.s > 0)
  ranked.sort((a, b) => b.s - a.s)
  return { total: ranked.length, results: ranked.slice(0, limit).map((x) => x.p) }
}

const view = (p: Project, lang?: Lang) => {
  const base = { name: p.name, url: p.url, chapter: p.chapter, tags: p.tags }
  if (lang === 'en') return { ...base, chapter_title: p.chapter_title_en, section: p.section, description: p.description_en }
  if (lang === 'zh') return { ...base, chapter_title: p.chapter_title_zh, section: p.section_zh, description: p.description_zh }
  return { ...base, chapter_title_en: p.chapter_title_en, section: p.section, description_en: p.description_en, description_zh: p.description_zh }
}

const json = (v: unknown) => ({ content: [{ type: 'text' as const, text: JSON.stringify(v, null, 2) }] })
const fail = (msg: string) => ({ content: [{ type: 'text' as const, text: msg }], isError: true })
const RO = { readOnlyHint: true, openWorldHint: false, idempotentHint: true }

function buildServer(env: Env) {
  const server = new McpServer(
    { name: 'awesome-finance-agents', version: '1.0.0', title: 'Awesome Finance Agents' },
    {
      jsonSchemaValidator: new CfWorkerJsonSchemaValidator(),
      instructions:
        'Curated list of open-source LLM agents for finance (research, trading, accounting, risk, personal finance, evaluation, backtesting). English and Chinese. Not investment advice.',
    },
  )
  const lang = z.enum(['en', 'zh']).optional().describe('Description language; omit for both')

  server.registerTool(
    'search_projects',
    {
      title: 'Search projects',
      description: 'Search the list by keyword (English or Chinese). Matches names, descriptions, sections, chapters and tags (sim, live, paper, cn).',
      inputSchema: {
        query: z.string().describe('Keywords, e.g. "backtest", "MCP", "回测"'),
        chapter: z.string().optional().describe('Limit to a chapter: number 1-10, "appendix", or slug'),
        lang,
        limit: z.number().int().min(1).max(50).optional().describe('Max results (default 10)'),
      },
      annotations: RO,
    },
    async ({ query, chapter, lang, limit }) => {
      try {
        const data = await loadData(env)
        const r = searchProjects(data, query, chapter, limit ?? 10)
        return json({ query, total: r.total, results: r.results.map((p) => view(p, lang)) })
      } catch (e) {
        return fail(String((e as Error).message || e))
      }
    },
  )

  server.registerTool(
    'list_chapters',
    {
      title: 'List chapters',
      description: 'List the 10 chapters and the appendix with their core question and entry count.',
      inputSchema: {},
      annotations: RO,
    },
    async () => {
      const data = await loadData(env)
      return json({
        site: data.site,
        updated: data.generated,
        total_projects: data.projects.length,
        chapters: data.chapters.map((c) => ({
          id: c.id, title_en: c.title_en, title_zh: c.title_zh,
          question_en: c.question_en, question_zh: c.question_zh,
          entries: c.entries, url: c.url_en, markdown: c.md_en,
        })),
      })
    },
  )

  server.registerTool(
    'get_chapter',
    {
      title: 'Get chapter',
      description: 'Return one chapter (or the appendix) as Markdown: the problem it covers, every entry, and the pitfall tip.',
      inputSchema: {
        id: z.string().describe('Chapter number 1-10, "appendix", or slug'),
        lang: z.enum(['en', 'zh']).optional().describe('Language (default en)'),
      },
      annotations: RO,
    },
    async ({ id, lang }) => {
      const data = await loadData(env)
      const c = findChapter(data, id)
      if (!c) return fail(`Unknown chapter "${id}". Use list_chapters.`)
      const md = await cachedFetch<string>(lang === 'zh' ? c.md_zh : c.md_en, (r) => r.text())
      return { content: [{ type: 'text' as const, text: md }] }
    },
  )

  server.registerTool(
    'get_project',
    {
      title: 'Get project',
      description: 'Look up a project by name or URL; returns its chapter, section, descriptions and tags.',
      inputSchema: { name_or_url: z.string().describe('Project name (e.g. "OpenBB") or repository URL') },
      annotations: RO,
    },
    async ({ name_or_url }) => {
      const data = await loadData(env)
      const q = norm(name_or_url.trim()).replace(/\/+$/, '').replace(/\.git$/, '')
      const exact = data.projects.filter((p) => norm(p.name) === q || norm(p.url).replace(/\/+$/, '') === q)
      const hits = exact.length
        ? exact
        : data.projects.filter((p) => norm(p.name).includes(q) || norm(p.url).includes(q))
      if (!hits.length) return fail(`No project matches "${name_or_url}". Try search_projects.`)
      return json({ matches: hits.slice(0, 10).map((p) => view(p)) })
    },
  )
  return server
}

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version, Last-Event-ID, Authorization',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id, Mcp-Protocol-Version',
}
const withCors = (res: Response) => {
  const h = new Headers(res.headers)
  for (const [k, v] of Object.entries(CORS)) h.set(k, v)
  return new Response(res.body, { status: res.status, statusText: res.statusText, headers: h })
}
const rpcError = (status: number, message: string) =>
  withCors(Response.json({ jsonrpc: '2.0', error: { code: -32000, message }, id: null }, { status }))

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url)
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS })

    if (url.pathname === '/' || url.pathname === '') {
      return withCors(
        new Response(
          `Awesome Finance Agents MCP server (read-only)\n\nEndpoint: ${url.origin}/mcp (Streamable HTTP, no auth)\nTools: search_projects, list_chapters, get_chapter, get_project\nDocs: ${site(env)}/#use-with-ai\n`,
          { headers: { 'content-type': 'text/plain; charset=utf-8' } },
        ),
      )
    }
    if (url.pathname !== '/mcp') return rpcError(404, 'Not found. The MCP endpoint is /mcp')

    if (env.RATE_LIMITER) {
      const key = req.headers.get('cf-connecting-ip') || 'anon'
      const { success } = await env.RATE_LIMITER.limit({ key })
      if (!success) return rpcError(429, 'Rate limit exceeded, retry in a minute')
    }
    if (req.method === 'GET') return rpcError(405, 'This server is stateless; use POST')
    if (req.method === 'DELETE') return rpcError(405, 'No sessions to delete')
    if (req.method !== 'POST') return rpcError(405, 'Method not allowed')
    if (Number(req.headers.get('content-length') || 0) > 64 * 1024) return rpcError(413, 'Request too large')

    const server = buildServer(env)
    const transport = new WebStandardStreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true,
    })
    await server.connect(transport)
    try {
      return withCors(await transport.handleRequest(req))
    } catch (e) {
      return rpcError(500, 'Internal error')
    }
  },
}
