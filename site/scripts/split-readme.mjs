// Split README.md / README.zh-CN.md into VitePress pages.
//
// The READMEs are the single source of truth. Everything this script writes
// lives under site/src/ and is git-ignored; never edit those files by hand.
//
//   README.md        -> site/src/index.md, site/src/chapters/*.md, site/src/appendix.md
//   README.zh-CN.md  -> site/src/zh/... (same slugs, so the language switch maps 1:1)
//
// Usage: node site/scripts/split-readme.mjs [--check]
//   --check  also verify that page / entry counts match the READMEs (exit 1 on mismatch)

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
export const ROOT = path.resolve(here, '../..')
export const SRC = path.resolve(here, '../src')
export const REPO_URL = 'https://github.com/aowang-ai/awesome-finance-agents'
// Absolute site origin (no trailing slash) for the Markdown copies and projects.json.
export const SITE_ORIGIN = (process.env.DOCS_SITE_URL || 'https://finance-agents.dev/').replace(/\/$/, '')
export const MCP_URL = 'https://mcp.finance-agents.dev/mcp'
// Build-only artifacts (per-page .md, projects.json, llms-full.txt), copied into dist by config buildEnd.
export const GEN = path.resolve(here, '../.generated')
const BLOB = `${REPO_URL}/blob/main/`

const LOCALES = [
  {
    key: 'root',
    file: 'README.md',
    prefix: '/',
    outDir: SRC,
    labels: {
      appendix: 'Appendix',
      skip: ['Contents', 'Contributing', 'Footnotes'],
      map: 'The Map',
      howTo: 'How to Use This List',
      start: 'Start reading',
      github: 'View on GitHub',
      footnotes: 'Footnotes',
      contributing: 'Contributing',
      prev: 'Previous chapter',
      next: 'Next chapter',
      problem: 'What Problem It Solves',
      pitfall: 'Pitfall Tip',
      contents: 'Contents',
      about: 'About this list',
      colNum: '#',
      colChapter: 'Chapter',
      colQuestion: 'Core question',
      colEntries: 'Entries',
      projects: 'projects',
      chaptersMeta: '10 chapters + appendix',
      chapterOf: (n, total) => `Chapter ${n} of ${total}`,
      entriesN: (n) => `${n} ${n === 1 ? 'entry' : 'entries'}`,
      edit: 'Edit on GitHub',
      useAi: 'Use with AI',
      notAdvice: 'Not investment advice. Inclusion does not mean endorsement.',
      htmlVersion: 'Web version',
      badges: {
        cn: ['CN', 'China A-share or Chinese-language project'],
        sim: ['sim', 'Paper / simulated trading'],
        live: ['live', 'Can trade live'],
        paper: ['paper', 'Research-paper code'],
      },
    },
  },
  {
    key: 'zh',
    file: 'README.zh-CN.md',
    prefix: '/zh/',
    outDir: path.join(SRC, 'zh'),
    labels: {
      appendix: '附录',
      skip: ['目录', '贡献', '备注'],
      map: '全景图',
      howTo: '怎么用这份清单',
      start: '开始阅读',
      github: '在 GitHub 查看',
      footnotes: '备注',
      contributing: '贡献',
      prev: '上一章',
      next: '下一章',
      problem: '要解决的问题',
      pitfall: '踩坑提示',
      contents: '目录',
      about: '关于这份清单',
      colNum: '#',
      colChapter: '章节',
      colQuestion: '核心问题',
      colEntries: '条目',
      projects: '个项目',
      chaptersMeta: '10 章 + 附录',
      chapterOf: (n, total) => `第 ${n} 章，共 ${total} 章`,
      entriesN: (n) => `${n} 条`,
      edit: '在 GitHub 上编辑',
      useAi: '在 AI 里使用',
      notAdvice: '不构成投资建议；收录不代表推荐。',
      htmlVersion: '网页版',
      badges: {
        cn: ['A股/中文', 'A 股或中文项目'],
        sim: ['模拟盘', '模拟盘 / 纸面交易'],
        live: ['实盘', '可接实盘交易'],
        paper: ['论文', '论文配套代码'],
      },
    },
  },
]

const ENTRY_RE = /^\s*- \[[^\]]+\]\(https?:\/\/[^)]+\)/

// GitHub-style heading slug (close enough for the headings in this repo).
export function ghSlug(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^\p{L}\p{N}\s\-_、]/gu, '')
    .replace(/\s/g, '-')
}

function parseSections(md) {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const preamble = []
  const sections = []
  let cur = null
  let inFence = false
  for (const line of lines) {
    if (/^```/.test(line)) inFence = !inFence
    const m = !inFence && /^## (.+)$/.exec(line)
    if (m) {
      cur = { title: m[1].trim(), body: [] }
      sections.push(cur)
    } else if (cur) cur.body.push(line)
    else preamble.push(line)
  }
  return { preamble, sections }
}

function countEntries(lines) {
  let n = 0
  let inFence = false
  for (const l of lines) {
    if (/^```/.test(l)) inFence = !inFence
    else if (!inFence && ENTRY_RE.test(l)) n++
  }
  return n
}

// Demote headings by one level (### -> ##) outside code fences.
function demote(lines) {
  let inFence = false
  return lines.map((l) => {
    if (/^```/.test(l)) inFence = !inFence
    if (!inFence && /^#{3,6} /.test(l)) return l.slice(1)
    return l
  })
}

function trimBlank(lines) {
  const a = [...lines]
  while (a.length && !a[0].trim()) a.shift()
  while (a.length && !a[a.length - 1].trim()) a.pop()
  return a
}

function yamlStr(s) {
  return JSON.stringify(s)
}

// Strip markdown emphasis/links for plain-text use (frontmatter, meta).
function plain(s) {
  return s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>]/g, '')
    .trim()
}

function buildLocale(loc, chapterSlugs) {
  const md = fs.readFileSync(path.join(ROOT, loc.file), 'utf8')
  const { preamble, sections } = parseSections(md)

  const chapters = sections.filter((s) => /^\d+\.\s/.test(s.title))
  const appendix = sections.find((s) => s.title === loc.labels.appendix)
  const mapSec = sections.find((s) => s.title === loc.labels.map)
  const howToSec = sections.find((s) => s.title === loc.labels.howTo)
  const footSec = sections.find((s) => s.title === loc.labels.footnotes)
  if (!appendix || !mapSec || !howToSec) throw new Error(`${loc.file}: missing expected sections`)

  const known = new Set([
    ...chapters,
    appendix,
    mapSec,
    howToSec,
    ...sections.filter((s) => loc.labels.skip.includes(s.title)),
  ])
  const unknown = sections.filter((s) => !known.has(s))
  if (unknown.length) {
    throw new Error(`${loc.file}: unhandled sections: ${unknown.map((s) => s.title).join(', ')}`)
  }

  // slugs: English drives the URLs so both languages share paths.
  const slugs = chapterSlugs ?? chapters.map((c) => ghSlug(c.title))
  if (slugs.length !== chapters.length) {
    throw new Error(`${loc.file}: ${chapters.length} chapters but ${slugs.length} English slugs`)
  }

  const pages = chapters.map((c, i) => ({
    title: c.title,
    shortTitle: c.title.replace(/^\d+\.\s*/, ''),
    num: Number(/^(\d+)\./.exec(c.title)[1]),
    slug: slugs[i],
    link: `${loc.prefix}chapters/${slugs[i]}`,
    body: c.body,
    entries: countEntries(c.body),
  }))
  const appendixPage = {
    title: appendix.title,
    shortTitle: appendix.title,
    slug: 'appendix',
    link: `${loc.prefix}appendix`,
    body: appendix.body,
    entries: countEntries(appendix.body),
  }

  // anchor map: README anchors -> site pages
  const anchors = new Map()
  for (const p of [...pages, appendixPage]) anchors.set(ghSlug(p.title), p.link)
  anchors.set(ghSlug(mapSec.title), `${loc.prefix}#${ghSlug(mapSec.title)}`)
  anchors.set(ghSlug(howToSec.title), `${loc.prefix}#${ghSlug(howToSec.title)}`)
  // h3 headings inside chapters/appendix -> page#anchor
  for (const p of [...pages, appendixPage]) {
    for (const l of p.body) {
      const m = /^### (.+)$/.exec(l)
      if (m) anchors.set(ghSlug(m[1]), `${p.link}#${ghSlug(m[1])}`)
    }
  }

  const rewrite = (lines) =>
    lines.map((l) =>
      l.replace(/\]\(([^)\s]+)\)/g, (all, target) => {
        if (/^(https?:|mailto:)/.test(target)) return all
        if (target.startsWith('#')) {
          const to = anchors.get(decodeURIComponent(target.slice(1)))
          if (!to) throw new Error(`${loc.file}: unknown anchor ${target}`)
          return `](${to})`
        }
        if (/^README(\.zh-CN)?\.md$/.test(target)) return `](${target.includes('zh') ? '/zh/' : '/'})`
        return `](${BLOB}${target})`
      }),
    )

  const tagline = plain((preamble.find((l) => /^> /.test(l)) || '').replace(/^>\s*/, ''))
  const name = plain(preamble.find((l) => /^# /.test(l)).replace(/^# /, '').replace(/\[!\[.*$/, ''))
  // intro paragraphs: preamble minus title, tagline, language switch
  const intro = trimBlank(
    preamble.filter(
      (l) => !/^# /.test(l) && !/^> /.test(l) && !/README(\.zh-CN)?\.md\)/.test(l),
    ),
  )

  // core questions from the map table ("| 1 | Chapter | Question |")
  const questions = new Map()
  for (const l of mapSec.body) {
    const m = /^\|\s*(\d+)\s*\|[^|]*\|\s*(.+?)\s*\|$/.exec(l)
    if (m) questions.set(Number(m[1]), m[2])
  }

  const out = loc.outDir
  fs.mkdirSync(path.join(out, 'chapters'), { recursive: true })
  const entries = []

  const L = loc.labels
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
  const badge = (k) => `<span class="afa-badge afa-badge-${k}" title="${esc(L.badges[k][1])}">${esc(L.badges[k][0])}</span>`

  // README list entry "- [Name](url) - 🇨🇳 desc. (sim)" -> name link + muted
  // description + small neutral badges. Still starts with "- [Name](http"
  // so entry counting is unchanged.
  const ENTRY_FULL = /^(\s*)- (\[[^\]]+\]\(https?:\/\/[^)]+\))\s+-\s+(.*)$/
  const formatEntries = (lines) => {
    let inFence = false
    return lines.map((l) => {
      if (/^```/.test(l)) inFence = !inFence
      const m = !inFence && ENTRY_FULL.exec(l)
      if (!m) return l
      let [, indent, link, desc] = m
      const tags = []
      if (desc.includes('🇨🇳')) {
        tags.push('cn')
        desc = desc.replace(/🇨🇳\s*/g, '')
      }
      const t = /\s*\(((?:sim|live|paper)(?:\/(?:sim|live|paper))*)\)\s*$/.exec(desc)
      if (t) {
        tags.push(...t[1].split('/'))
        desc = desc.slice(0, t.index)
      }
      const badges = tags.length ? ` <span class="afa-badges">${tags.map(badge).join('')}</span>` : ''
      return `${indent}- ${link} <span class="afa-desc">${desc.trim()}${badges}</span>`
    })
  }
  // legend text in the intro: replace the emoji / code markers with the same badges
  const badgifyLegend = (lines) =>
    lines.map((l) =>
      l
        .replace(/🇨🇳/g, badge('cn'))
        .replace(/`\((sim|live|paper)\)`/g, (_, k) => badge(k)),
    )

  const total = pages.length
  const abs = (lines) => lines.map((l) => l.replace(/\]\(\//g, `](${SITE_ORIGIN}/`))
  const mdUrl = (link) => `${SITE_ORIGIN}${link === loc.prefix ? `${loc.prefix}index` : link}.md`
  const useAi = useWithAi(loc.key)
  const allEntries = pages.reduce((n, p) => n + p.entries, 0) + appendixPage.entries

  // short chapter names from the map table ("| 1 | Data and Tools | ... |")
  const shortNames = new Map()
  for (const l of mapSec.body) {
    const m = /^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|/.exec(l)
    if (m) shortNames.set(Number(m[1]), m[2])
  }

  // --- home page: title, one-line positioning, compact contents table.
  // The mermaid diagram is README-only; its table is folded into the contents table.
  const cell = (t) => String(t).replace(/\|/g, '\\|')
  const row = (num, name, link, q, n) => `| ${num} | [${cell(name)}](${link}) | ${cell(q)} | ${n} |`
  // zh HTML <title> / H1: keep the English brand, add a Chinese gloss for SEO
  const homeTitle =
    loc.key === 'zh' ? 'Awesome Finance Agents（金融 Agent 精选）' : name
  const home = [
    '---',
    `title: ${yamlStr(homeTitle)}`,
    `titleTemplate: false`,
    `description: ${yamlStr(tagline)}`,
    'aside: false',
    'prev: false',
    'next: false',
    'pageClass: afa-home-page',
    '---',
    '',
    `# ${homeTitle}`,
    '',
    `<p class="afa-lead">${esc(tagline)}</p>`,
    '',
    `<p class="afa-meta">${allEntries} ${esc(L.projects)} · ${esc(L.chaptersMeta)} · CC0 · <a href="${REPO_URL}">GitHub</a></p>`,
    '',
    `## ${L.contents} {#${ghSlug(mapSec.title)}}`,
    '',
    '<div class="afa-toc">',
    '',
    `| ${L.colNum} | ${L.colChapter} | ${L.colQuestion} | ${L.colEntries} |`,
    '| --: | --- | --- | --: |',
    ...pages.map((p) => row(p.num, shortNames.get(p.num) || p.shortTitle, p.link, questions.get(p.num) || '', p.entries)),
    row('', appendixPage.title, appendixPage.link, plain(trimBlank(appendixPage.body)[0] || ''), appendixPage.entries),
    '',
    '</div>',
    '',
    `## ${L.about}`,
    '',
    ...badgifyLegend(rewrite(intro)),
    '',
    `## ${howToSec.title}`,
    '',
    ...rewrite(trimBlank(howToSec.body)),
    '',
    `## ${L.useAi} {#use-with-ai}`,
    '',
    ...useAi,
    '',
  ]
  fs.writeFileSync(path.join(out, 'index.md'), home.join('\n'))

  // --- clean Markdown copy of the home page (for /index.md, /zh/index.md)
  const mdRow = (num, name, link, q, n) => `| ${num} | [${cell(name)}](${mdUrl(link)}) | ${cell(q)} | ${n} |`
  const homeMd = [
    `# ${homeTitle}`,
    '',
    `> ${tagline}`,
    '',
    `${allEntries} ${L.projects} · ${L.chaptersMeta} · CC0 · ${SITE_ORIGIN}${loc.prefix} · ${REPO_URL}`,
    '',
    `## ${L.contents}`,
    '',
    `| ${L.colNum} | ${L.colChapter} | ${L.colQuestion} | ${L.colEntries} |`,
    '| --: | --- | --- | --: |',
    ...pages.map((p) => mdRow(p.num, shortNames.get(p.num) || p.shortTitle, p.link, questions.get(p.num) || '', p.entries)),
    mdRow('', appendixPage.title, appendixPage.link, plain(trimBlank(appendixPage.body)[0] || ''), appendixPage.entries),
    '',
    `## ${L.about}`,
    '',
    ...abs(rewrite(intro)),
    '',
    `## ${howToSec.title}`,
    '',
    ...abs(rewrite(trimBlank(howToSec.body))),
    '',
    `## ${L.useAi}`,
    '',
    ...useAi,
    '',
    '---',
    '',
    `${L.notAdvice} CC0 1.0.`,
    '',
  ]
  const mdOut = path.join(GEN, loc.key === 'zh' ? 'zh' : '')
  fs.mkdirSync(path.join(mdOut, 'chapters'), { recursive: true })
  fs.writeFileSync(path.join(mdOut, 'index.md'), homeMd.join('\n'))

  // --- chapter pages: title, meta line, the problem as a
  // lead paragraph, entry lists, pitfall as a quiet callout.
  const splitSub = (body, title) => {
    // returns [before, sectionBody, after] for "### title"
    const i = body.findIndex((l) => l.trim() === `### ${title}`)
    if (i < 0) return [body, null, []]
    let j = i + 1
    while (j < body.length && !/^#{2,3} /.test(body[j])) j++
    return [body.slice(0, i), trimBlank(body.slice(i + 1, j)), body.slice(j)]
  }
  for (const p of [...pages, appendixPage]) {
    const desc = plain(
      trimBlank(p.body).find((l) => l.trim() && !/^#/.test(l)) || p.title,
    ).slice(0, 200)
    let body = trimBlank(p.body)
    let lead = []
    const [b1, problem, a1] = splitSub(body, L.problem)
    if (problem) {
      lead = problem
      body = [...b1, ...a1]
    }
    const [b2, pitfall, a2] = splitSub(body, L.pitfall)
    if (pitfall) body = [...b2, ...a2]
    const isChapter = p.slug !== 'appendix'
    const meta = [isChapter ? L.chapterOf(p.num, total) : null, L.entriesN(p.entries)].filter(Boolean).join(' · ')
    const page = [
      '---',
      `title: ${yamlStr(p.title)}`,
      `description: ${yamlStr(desc)}`,
      '---',
      '',
      `<p class="afa-eyebrow">${esc(meta)}</p>`,
      '',
      `# ${p.title}`,
      '',
      ...(lead.length ? ['<div class="afa-lead">', '', ...rewrite(lead), '', '</div>', ''] : []),
      ...formatEntries(rewrite(demote(trimBlank(body)))),
      '',
      ...(pitfall
        ? ['', `## ${L.pitfall}`, '', '<div class="afa-pitfall">', '', ...rewrite(pitfall), '', '</div>', '']
        : []),
    ]
    const file = p.slug === 'appendix' ? 'appendix.md' : `chapters/${p.slug}.md`
    fs.writeFileSync(path.join(out, file), page.join('\n'))

    const pageMd = [
      `# ${p.title}`,
      '',
      `> ${meta} · ${L.htmlVersion}: ${SITE_ORIGIN}${p.link}`,
      '',
      ...(lead.length ? [...abs(rewrite(lead)), ''] : []),
      ...abs(rewrite(demote(trimBlank(body)))),
      '',
      ...(pitfall ? [`## ${L.pitfall}`, '', ...abs(rewrite(pitfall)), ''] : []),
      '---',
      '',
      `${L.notAdvice} CC0 1.0 · ${REPO_URL}`,
      '',
    ]
    fs.writeFileSync(path.join(mdOut, file), pageMd.join('\n').replace(/\n{3,}/g, '\n\n'))

    // structured entries for projects.json
    let section = ''
    let inFence = false
    for (const l of trimBlank(body)) {
      if (/^```/.test(l)) inFence = !inFence
      if (inFence) continue
      const h = /^### (.+)$/.exec(l)
      if (h) section = h[1].trim()
      const m = ENTRY_FULL.exec(l)
      if (!m) continue
      const lm = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/.exec(m[2])
      let desc = m[3]
      const tags = []
      for (const f of desc.match(/[\u{1F1E6}-\u{1F1FF}]{2}/gu) || []) {
        tags.push([...f].map((c) => String.fromCharCode(c.codePointAt(0) - 0x1f1e6 + 97)).join(''))
      }
      desc = desc.replace(/[\u{1F1E6}-\u{1F1FF}]{2}\s*/gu, '')
      const t = /\s*\(((?:sim|live|paper)(?:\/(?:sim|live|paper))*)\)\s*$/.exec(desc)
      if (t) {
        tags.push(...t[1].split('/'))
        desc = desc.slice(0, t.index)
      }
      entries.push({
        name: lm[1],
        url: lm[2],
        chapter: isChapter ? String(p.num) : 'appendix',
        chapterTitle: p.title,
        section,
        description: plain(desc.trim()),
        tags,
      })
    }
  }

  return {
    key: loc.key,
    file: loc.file,
    name,
    tagline,
    footnote: footSec ? plain(trimBlank(footSec.body)[0] || '') : '',
    labels: loc.labels,
    slugs,
    readmeEntries: countEntries(chapters.flatMap((c) => c.body)) + appendixPage.entries,
    readmeChapters: chapters.length,
    entries,
    questions: Object.fromEntries(questions),
    appendixLead: plain(trimBlank(appendixPage.body)[0] || ''),
    pages: [...pages, appendixPage].map(({ body, ...rest }) => rest),
  }
}

// "Use with AI" section (site home + Markdown home). Plain, no hype.
function useWithAi(key) {
  const zh = key === 'zh'
  const p = zh ? '/zh/' : '/'
  const cfg = (o) => ['```json', JSON.stringify(o, null, 2), '```']
  return [
    zh
      ? '这份清单也提供给 AI 工具直接读取，内容与网页一致，随清单更新。'
      : 'The list is also available in formats AI tools can read directly. It is the same content as the site and updates with it.',
    '',
    zh
      ? `- **Markdown**：每页地址后加 \`.md\`，例如 [${SITE_ORIGIN}/zh/chapters/1-data-and-tools.md](${SITE_ORIGIN}/zh/chapters/1-data-and-tools.md)。每页右上角的「复制页面」菜单也可以复制 Markdown，或直接在 ChatGPT / Claude 中打开。`
      : `- **Markdown**: add \`.md\` to any page URL, e.g. [${SITE_ORIGIN}/chapters/1-data-and-tools.md](${SITE_ORIGIN}/chapters/1-data-and-tools.md). The "Copy page" menu on each page copies it or opens it in ChatGPT / Claude.`,
    zh
      ? `- **llms.txt**：[${SITE_ORIGIN}/llms.txt](${SITE_ORIGIN}/llms.txt) 是索引，[llms-full.txt](${SITE_ORIGIN}/llms-full.txt) 是中英文全文。`
      : `- **llms.txt**: [${SITE_ORIGIN}/llms.txt](${SITE_ORIGIN}/llms.txt) is the index; [llms-full.txt](${SITE_ORIGIN}/llms-full.txt) has the full text in English and Chinese.`,
    zh
      ? `- **JSON**：[${SITE_ORIGIN}/projects.json](${SITE_ORIGIN}/projects.json)，每条项目的章节、分组、中英文描述和标签。`
      : `- **JSON**: [${SITE_ORIGIN}/projects.json](${SITE_ORIGIN}/projects.json) lists every entry with chapter, section, English and Chinese descriptions, and tags.`,
    zh
      ? `- **MCP**（只读，无需鉴权）：\`${MCP_URL}\`。工具有 \`search_projects\`（中英文关键词）、\`list_chapters\`、\`get_chapter\`、\`get_project\`。`
      : `- **MCP** (read-only, no auth): \`${MCP_URL}\`. Tools: \`search_projects\` (English or Chinese keywords), \`list_chapters\`, \`get_chapter\`, \`get_project\`.`,
    '',
    'Claude Code:',
    '',
    '```sh',
    `claude mcp add --transport http finance-agents ${MCP_URL}`,
    '```',
    '',
    zh ? 'Cursor（`~/.cursor/mcp.json`）：' : 'Cursor (`~/.cursor/mcp.json`):',
    '',
    ...cfg({ mcpServers: { 'finance-agents': { url: MCP_URL } } }),
    '',
    zh
      ? 'Claude Desktop（`claude_desktop_config.json`，通过 `mcp-remote` 连接）：'
      : 'Claude Desktop (`claude_desktop_config.json`, via `mcp-remote`):',
    '',
    ...cfg({ mcpServers: { 'finance-agents': { command: 'npx', args: ['-y', 'mcp-remote', MCP_URL] } } }),
  ]
}

function writeProjectsJson(en, zh) {
  const zhByKey = new Map(zh.entries.map((e) => [`${e.chapter}|${e.url}`, e]))
  const zhByUrl = new Map(zh.entries.map((e) => [e.url, e]))
  const zhPage = new Map(zh.pages.map((p) => [p.slug, p]))
  const chapters = en.pages.map((p) => {
    const z = zhPage.get(p.slug)
    const id = p.slug === 'appendix' ? 'appendix' : String(p.num)
    return {
      id,
      num: p.num ?? null,
      slug: p.slug,
      title_en: p.title,
      title_zh: z?.title || '',
      question_en: id === 'appendix' ? en.appendixLead : en.questions[p.num] || '',
      question_zh: id === 'appendix' ? zh.appendixLead : zh.questions[p.num] || '',
      entries: p.entries,
      url_en: `${SITE_ORIGIN}${p.link}`,
      url_zh: `${SITE_ORIGIN}${z?.link}`,
      md_en: `${SITE_ORIGIN}${p.link}.md`,
      md_zh: `${SITE_ORIGIN}${z?.link}.md`,
    }
  })
  const chTitleZh = new Map(chapters.map((c) => [c.id, c.title_zh]))
  const projects = en.entries.map((e) => {
    const z = zhByKey.get(`${e.chapter}|${e.url}`) || zhByUrl.get(e.url)
    return {
      name: e.name,
      url: e.url,
      chapter: e.chapter,
      chapter_title_en: e.chapterTitle,
      chapter_title_zh: chTitleZh.get(e.chapter) || '',
      section: e.section,
      section_zh: z?.section || '',
      description_en: e.description,
      description_zh: z?.description || '',
      tags: [...new Set([...e.tags, ...(z?.tags || [])])],
    }
  })
  const data = {
    name: en.name,
    site: `${SITE_ORIGIN}/`,
    repository: REPO_URL,
    license: 'CC0-1.0',
    mcp: MCP_URL,
    generated: new Date().toISOString(),
    count: projects.length,
    chapters,
    projects,
  }
  fs.writeFileSync(path.join(GEN, 'projects.json'), JSON.stringify(data, null, 1))
  return data
}

// llms-full.txt: every Markdown page, English then Chinese.
function writeLlmsFull(en, zh) {
  const order = (loc, dir) => [
    path.join(dir, 'index.md'),
    ...loc.pages.map((p) => path.join(dir, p.slug === 'appendix' ? 'appendix.md' : `chapters/${p.slug}.md`)),
  ]
  const parts = [
    `# ${en.name}`,
    '',
    `> ${en.tagline}`,
    '',
    `Full text of ${SITE_ORIGIN}/ in English and Chinese (generated from the repository READMEs). Index: ${SITE_ORIGIN}/llms.txt. MCP: ${MCP_URL}. Not investment advice.`,
    '',
  ]
  for (const f of [...order(en, GEN), ...order(zh, path.join(GEN, 'zh'))]) {
    parts.push('', '---', '', fs.readFileSync(f, 'utf8').trim(), '')
  }
  fs.writeFileSync(path.join(GEN, 'llms-full.txt'), parts.join('\n'))
}

export function splitReadmes() {
  fs.rmSync(SRC, { recursive: true, force: true })
  fs.mkdirSync(SRC, { recursive: true })
  fs.rmSync(GEN, { recursive: true, force: true })
  fs.mkdirSync(GEN, { recursive: true })
  const enFull = buildLocale(LOCALES[0])
  const zhFull = buildLocale(LOCALES[1], enFull.slugs)
  const projects = writeProjectsJson(enFull, zhFull)
  writeLlmsFull(enFull, zhFull)
  const strip = ({ entries, questions, appendixLead, ...rest }) => rest
  const en = strip(enFull)
  const zh = strip(zhFull)
  if (projects.count !== enFull.readmeEntries) throw new Error(`projects.json has ${projects.count} entries, README has ${enFull.readmeEntries}`)
  const manifest = { generatedAt: new Date().toISOString(), locales: { root: en, zh } }
  fs.writeFileSync(path.join(SRC, 'manifest.json'), JSON.stringify(manifest, null, 2))
  fs.writeFileSync(
    path.join(SRC, 'README.md'),
    '# Generated\n\nThis folder is generated from the repository READMEs by `site/scripts/split-readme.mjs`. Do not edit.\n',
  )
  return manifest
}

// Count entries in generated pages to prove nothing was dropped.
function countGenerated(dir) {
  const files = [path.join(dir, 'appendix.md'), ...fs.readdirSync(path.join(dir, 'chapters')).map((f) => path.join(dir, 'chapters', f))]
  return {
    pages: files.length,
    entries: files.reduce((n, f) => n + countEntries(fs.readFileSync(f, 'utf8').split('\n')), 0),
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const m = splitReadmes()
  let ok = true
  for (const loc of LOCALES) {
    const info = m.locales[loc.key]
    const gen = countGenerated(loc.outDir)
    const line = `${loc.file}: ${info.readmeChapters} chapters + appendix -> ${gen.pages} pages; entries README=${info.readmeEntries} site=${gen.entries}`
    console.log(line)
    if (gen.pages !== info.readmeChapters + 1 || gen.entries !== info.readmeEntries) ok = false
  }
  if (m.locales.root.readmeEntries !== m.locales.zh.readmeEntries) {
    console.log(`warning: EN and ZH entry counts differ (${m.locales.root.readmeEntries} vs ${m.locales.zh.readmeEntries})`)
  }
  if (process.argv.includes('--check') && !ok) {
    console.error('split check failed')
    process.exit(1)
  }
}
