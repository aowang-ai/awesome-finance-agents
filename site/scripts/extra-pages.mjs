// Category notes, project pages, and comparisons.
// Prose lives in site/content/guides.mjs. Numbers come only from
// site/data/repo-facts.json, fetched from the GitHub API on 2026-10-22.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { CATEGORIES, PROJECTS, COMPARISONS } from '../content/guides.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const facts = JSON.parse(fs.readFileSync(path.join(here, '../data/repo-facts.json'), 'utf8'))
export const FACT_DATE = facts.fetched_at
const byRepo = facts.repos

const REPO_URL = 'https://github.com/aowang-ai/awesome-finance-agents'
const SITE_ORIGIN = (process.env.DOCS_SITE_URL || 'https://finance-agents.dev/').replace(/\/$/, '')

function repoOf(id) {
  const r = byRepo[id]
  if (!r) throw new Error(`repo-facts.json has no ${id}`)
  return r
}

function num(n) {
  return new Intl.NumberFormat('en-US').format(n)
}

function cell(s) {
  return String(s ?? '').replace(/\|/g, '\\|').replace(/\r?\n/g, ' ').trim()
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function yamlStr(s) {
  return JSON.stringify(s)
}

function prefix(lang) {
  return lang === 'zh' ? '/zh' : ''
}

function projectBySlug(slug) {
  const p = PROJECTS.find((x) => x.slug === slug)
  if (!p) throw new Error(`unknown project slug ${slug}`)
  return p
}

function projectByRepo(id) {
  return PROJECTS.find((p) => p.repo === id)
}

function hrefProject(slug, lang) {
  return `${prefix(lang)}/projects/${slug}`
}

function hrefCategory(slug, lang) {
  return `${prefix(lang)}/categories/${slug}`
}

function hrefCompare(slug, lang) {
  return `${prefix(lang)}/compare/${slug}`
}

function hrefChapter(chapter, lang) {
  if (chapter === 'appendix') return `${prefix(lang)}/appendix`
  const cat = CATEGORIES.find((c) => c.num === chapter)
  if (!cat) throw new Error(`no category for chapter ${chapter}`)
  return `${prefix(lang)}/chapters/${cat.chapterSlug}`
}

function L(lang) {
  if (lang === 'zh') {
    return {
      what: '它做什么',
      facts: '仓库事实',
      stack: '技术栈',
      activity: '近期活动',
      who: '适合谁',
      inList: '在这份清单里',
      covers: '本章收录什么',
      pages: '项目页',
      compares: '对照',
      fullList: '完整条目列表',
      guides: '导读',
      catNotes: '分类导读',
      projPages: '项目页',
      comparisons: '对照',
      noneProjects: '这一章没有单独的项目页，条目在章节列表里。',
      source: `来源：GitHub API，${FACT_DATE}。`,
      repo: '仓库',
      stars: 'Star',
      forks: 'Fork',
      created: '创建',
      branch: '默认分支',
      commit: '最近提交',
      push: '最近推送',
      license: '许可证',
      home: '主页',
      language: '主要语言',
      languages: '语言',
      topics: 'Topics',
      description: 'GitHub 简介',
      html: '网页版',
      maintained: '由 Ao Wang（王奥，https://aowang.ai）维护。',
      colRepo: '仓库',
      colStars: 'Star',
      colForks: 'Fork',
      colCommit: '最近提交',
      colLicense: '许可证',
      colLang: '语言',
      licenseNotes: '许可证说明',
      depsEmpty: '抓取当日没有读到依赖清单。',
      primary: 'GitHub 报告的主要语言',
      alsoLang: 'GitHub 报告的语言',
      rootDirs: '仓库根目录包含',
      goMod: 'go.mod 首行',
      depFiles: '依赖文件（仅包名，抓取当日）',
      chapterOf: (n) => `第 ${n} 章`,
      appendix: '附录',
      listed: '收录位置',
      category: '分类导读',
      related: '相关项目页',
      seeChapter: '章节页末尾有一条踩坑提示。',
    }
  }
  return {
    what: 'What it does',
    facts: 'Repository facts',
    stack: 'Technical stack',
    activity: 'Activity',
    who: 'Who it is for',
    inList: 'In this list',
    covers: 'What the chapter covers',
    pages: 'Project pages',
    compares: 'Comparisons',
    fullList: 'Full entry list',
    guides: 'Guides',
    catNotes: 'Category notes',
    projPages: 'Project pages',
    comparisons: 'Comparisons',
    noneProjects: 'This chapter has no separate project page. The entry list is the chapter page.',
    source: `Source: GitHub API, ${FACT_DATE}.`,
    repo: 'Repository',
    stars: 'Stars',
    forks: 'Forks',
    created: 'Created',
    branch: 'Default branch',
    commit: 'Last commit',
    push: 'Last push',
    license: 'License',
    home: 'Homepage',
    language: 'Primary language',
    languages: 'Languages',
    topics: 'Topics',
    description: 'GitHub description',
    html: 'Web version',
    maintained: 'Maintained by Ao Wang (https://aowang.ai).',
    colRepo: 'Repository',
    colStars: 'Stars',
    colForks: 'Forks',
    colCommit: 'Last commit',
    colLicense: 'License',
    colLang: 'Language',
    licenseNotes: 'License notes',
    depsEmpty: 'No dependency manifest was read on the fetch date.',
    primary: 'Primary language reported by GitHub',
    alsoLang: 'Languages reported by GitHub',
    rootDirs: 'Repository root contains',
    goMod: 'First line of go.mod',
    depFiles: 'Dependency files (package names only, as read on the fetch date)',
    chapterOf: (n) => `Chapter ${n}`,
    appendix: 'Appendix',
    listed: 'Filed under',
    category: 'Category note',
    related: 'Related project pages',
    seeChapter: 'The chapter page ends with a pitfall note.',
  }
}

function kvTable(r, lang) {
  const t = L(lang)
  const lic = r.license[lang === 'zh' ? 'short_zh' : 'short_en']
  const commit = `[${r.commit.date}](${r.commit.url}) \`${r.commit.short}\``
  const rows = [
    [t.repo, `[${r.nameWithOwner}](${r.url})`],
    [t.description, cell(r.description) || '—'],
    [t.stars, num(r.stars)],
    [t.forks, num(r.forks)],
    [t.created, r.created],
    [t.branch, `\`${r.branch}\``],
    [t.commit, commit],
    [t.push, r.pushed],
    [t.license, cell(lic)],
    ...(r.homepage ? [[t.home, r.homepage]] : []),
    [t.language, r.language || '—'],
    [t.languages, r.languages.join(', ') || '—'],
    ...(r.topics.length ? [[t.topics, cell(r.topics.join(', '))]] : []),
  ]
  const body = [
    '<div class="afa-facts afa-kv">',
    '',
    '| | |',
    '| --- | --- |',
    ...rows.map(([k, v]) => `| ${cell(k)} | ${v} |`),
    '',
    '</div>',
    '',
    t.source,
  ]
  return body.join('\n')
}

function stackSection(r, lang) {
  const t = L(lang)
  const lines = [
    `${t.primary}: ${r.language || '—'}.`,
    `${t.alsoLang}: ${r.languages.join(', ') || '—'}.`,
  ]
  if (r.go_mod) lines.push(`${t.goMod}: \`${r.go_mod}\`.`)
  if (r.root?.length) lines.push(`${t.rootDirs}: ${r.root.map((d) => `\`${d}\``).join(', ')}.`)
  if (r.deps?.length) {
    lines.push('', t.depFiles + ':')
    for (const d of r.deps) {
      lines.push(`- \`${d.file}\`: ${d.packages.map((p) => `\`${p}\``).join(', ')}`)
    }
  } else {
    lines.push('', t.depsEmpty)
  }
  return lines.join('\n')
}

function activitySection(r, lang) {
  const subject = (r.commit.headline || '').replace(/`/g, "'")
  if (lang === 'zh') {
    return [
      `默认分支 \`${r.branch}\` 上最近一次提交是 ${r.commit.date}（[\`${r.commit.short}\`](${r.commit.url})）。提交说明：${subject.trim() || '—'}`,
      `仓库最近一次 push 是 ${r.pushed}。仓库创建于 ${r.created}。`,
    ].join('\n\n')
  }
  return [
    `Last commit on the default branch \`${r.branch}\`: ${r.commit.date} ([\`${r.commit.short}\`](${r.commit.url})). Subject: ${subject.trim() || '—'}.`,
    `Last push to the repository: ${r.pushed}. Created: ${r.created}.`,
  ].join('\n\n')
}

function inList(p, lang) {
  const t = L(lang)
  const cat = p.chapter === 'appendix' ? null : CATEGORIES.find((c) => c.num === p.chapter)
  const whereName = p.chapter === 'appendix' ? t.appendix : t.chapterOf(p.chapter)
  const lines = [
    `${t.listed}: [${whereName}](${hrefChapter(p.chapter, lang)}).`,
  ]
  if (cat) lines.push(`${t.category}: [${cat.title[lang]}](${hrefCategory(cat.slug, lang)}).`)
  if (p.related?.length) {
    const links = p.related.map((slug) => {
      const o = projectBySlug(slug)
      return `[${o.name}](${hrefProject(slug, lang)})`
    })
    lines.push(`${t.related}: ${links.join(lang === 'zh' ? '、' : ', ')}.`)
  }
  const cmp = COMPARISONS.filter((c) => c.groups.some((g) => g.repos.includes(p.repo)))
  if (cmp.length) {
    const links = cmp.map((c) => `[${c.title[lang]}](${hrefCompare(c.slug, lang)})`)
    lines.push(`${t.compares}: ${links.join(lang === 'zh' ? '、' : ', ')}.`)
  }
  return lines.join('\n\n')
}

function needsLicenseNote(r) {
  return !r.license_spdx || r.license_spdx === 'NOASSERTION'
}

function licenseNotes(ids, lang) {
  const t = L(lang)
  const rows = ids.filter((id) => needsLicenseNote(repoOf(id)))
  if (!rows.length) return ''
  const key = lang === 'zh' ? 'note_zh' : 'note_en'
  return [
    `## ${t.licenseNotes}`,
    '',
    ...rows.map((id) => {
      const r = repoOf(id)
      return `- **${r.nameWithOwner}.** ${r.license[key]}`
    }),
    '',
  ].join('\n')
}

function cmpTable(ids, lang) {
  const t = L(lang)
  const header = `| ${t.colRepo} | ${t.colStars} | ${t.colForks} | ${t.colCommit} | ${t.colLicense} | ${t.colLang} |`
  const align = '| --- | ---: | ---: | --- | --- | --- |'
  const lines = ids.map((id) => {
    const r = repoOf(id)
    const page = projectByRepo(id)
    const label = page ? `[${page.name}](${hrefProject(page.slug, lang)})` : `[${r.nameWithOwner.split('/')[1]}](${r.url})`
    const repoLink = `[${r.nameWithOwner}](${r.url})`
    const commit = `[${r.commit.date}](${r.commit.url})`
    const lic = r.license[lang === 'zh' ? 'short_zh' : 'short_en']
    return `| ${label} · ${repoLink} | ${num(r.stars)} | ${num(r.forks)} | ${commit} | ${cell(lic)} | ${cell(r.language)} |`
  })
  return ['<div class="afa-facts">', '', header, align, ...lines, '', '</div>', '', L(lang).source].join('\n')
}

function orderRepos(group) {
  const ids = [...group.repos]
  if (group.sort === 'stars') ids.sort((a, b) => repoOf(b).stars - repoOf(a).stars)
  return ids
}

function writeFile(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, text.endsWith('\n') ? text : text + '\n')
}

function pagePair(src, gen, rel, fm, title, eyebrow, body, lang) {
  const html = [
    '---',
    ...fm,
    'prev: false',
    'next: false',
    '---',
    '',
    `<p class="afa-eyebrow">${esc(eyebrow)}</p>`,
    '',
    `# ${title}`,
    '',
    body.trim(),
    '',
  ].join('\n')
  const web = `${SITE_ORIGIN}${prefix(lang)}/${rel.replace(/\.md$/, '')}`
  const md = [
    `# ${title}`,
    '',
    `> ${eyebrow} · ${L(lang).html}: ${web}`,
    '',
    body.trim(),
    '',
    '---',
    '',
    `GitHub facts: ${FACT_DATE}. CC0 1.0 · ${REPO_URL}`,
    '',
    L(lang).maintained,
    '',
  ].join('\n')
  const outDir = lang === 'zh' ? path.join(src, 'zh') : src
  const genDir = lang === 'zh' ? path.join(gen, 'zh') : gen
  writeFile(path.join(outDir, rel), html)
  writeFile(path.join(genDir, rel), md)
}

function renderProject(p, lang) {
  const t = L(lang)
  const r = repoOf(p.repo)
  const body = [
    `## ${t.what}`,
    '',
    p.what[lang],
    '',
    `## ${t.facts}`,
    '',
    kvTable(r, lang),
    needsLicenseNote(r) ? `\n${r.license[lang === 'zh' ? 'note_zh' : 'note_en']}\n` : '',
    '',
    `## ${t.stack}`,
    '',
    stackSection(r, lang),
    '',
    `## ${t.activity}`,
    '',
    activitySection(r, lang),
    '',
    `## ${t.who}`,
    '',
    p.who[lang],
    '',
    `## ${t.inList}`,
    '',
    inList(p, lang),
  ].join('\n')
  const where = p.chapter === 'appendix' ? L(lang).appendix : L(lang).chapterOf(p.chapter)
  const eyebrow = lang === 'zh' ? `${where} · GitHub 事实 ${FACT_DATE}` : `${where} · GitHub facts ${FACT_DATE}`
  return { title: p.name, description: p.description[lang], eyebrow, body, repo: p.repo }
}

function renderCategory(c, lang) {
  const t = L(lang)
  const subs = c.subsections[lang].map((s) => `- ${s}`).join('\n')
  const projects = c.projects.length
    ? c.projects.map((slug) => {
        const p = projectBySlug(slug)
        return `- [${p.name}](${hrefProject(slug, lang)})`
      }).join('\n')
    : t.noneProjects
  const compares = c.compares.length
    ? [
        '',
        `## ${t.compares}`,
        '',
        ...c.compares.map((slug) => {
          const cmp = COMPARISONS.find((x) => x.slug === slug)
          return `- [${cmp.title[lang]}](${hrefCompare(slug, lang)})`
        }),
      ].join('\n')
    : ''
  const body = [
    c.summary[lang],
    '',
    `${t.fullList}: [${c.title[lang]}](${hrefChapter(c.num, lang)}). ${t.seeChapter}`,
    '',
    `## ${t.covers}`,
    '',
    subs,
    '',
    `## ${t.pages}`,
    '',
    projects,
    compares,
    '',
    `## ${t.who}`,
    '',
    c.who[lang],
  ].join('\n')
  const eyebrow = lang === 'zh' ? `第 ${c.num} 章 · 导读` : `Chapter ${c.num} · Reading note`
  return { title: c.title[lang], description: c.description[lang], eyebrow, body }
}

function renderComparison(c, lang) {
  const parts = [c.intro[lang], '']
  for (const group of c.groups) {
    const ids = orderRepos(group)
    parts.push(`## ${group.title[lang]}`, '', cmpTable(ids, lang), '')
    const noteIds = ids.filter((id) => c.notes?.[id])
    if (noteIds.length) {
      for (const id of noteIds) {
        const r = repoOf(id)
        const page = projectByRepo(id)
        const name = page ? page.name : r.nameWithOwner
        parts.push(`### ${name}`, '', c.notes[id][lang], '')
      }
    }
    const notes = licenseNotes(ids, lang)
    if (notes) parts.push(notes)
  }
  parts.push(c.after[lang], '')
  const eyebrow = lang === 'zh' ? `GitHub 事实 ${FACT_DATE}` : `GitHub facts ${FACT_DATE}`
  return { title: c.title[lang], description: c.description[lang], eyebrow, body: parts.join('\n') }
}

function fm(title, description, extra = []) {
  return [`title: ${yamlStr(title)}`, `description: ${yamlStr(description)}`, ...extra]
}

function guidesBlock(lang) {
  const t = L(lang)
  const lead = lang === 'zh'
    ? '对照、分类导读和项目页。章节页仍是完整条目列表。仓库数字来自 GitHub API，日期写在各页上。'
    : 'Comparisons, category notes, and project pages. Chapter pages remain the full entry lists. Repository figures are from the GitHub API and dated on each page.'
  const cmp = COMPARISONS.map((c) => `- [${c.title[lang]}](${hrefCompare(c.slug, lang)})`).join('\n')
  const cats = CATEGORIES.map((c) => `- [${c.title[lang]}](${hrefCategory(c.slug, lang)})`).join('\n')
  const projs = PROJECTS.map((p) => `- [${p.name}](${hrefProject(p.slug, lang)})`).join('\n')
  return [
    `## ${t.guides}`,
    '',
    lead,
    '',
    `### ${t.comparisons}`,
    '',
    cmp,
    '',
    `### ${t.catNotes}`,
    '',
    cats,
    '',
    `### ${t.projPages}`,
    '',
    projs,
    '',
  ].join('\n')
}

function patchHome(file, lang) {
  const marker = lang === 'zh' ? '## 在 AI 里使用' : '## Use with AI'
  const text = fs.readFileSync(file, 'utf8')
  if (text.includes(`## ${L(lang).guides}\n`)) return
  const i = text.indexOf(marker)
  if (i < 0) throw new Error(`home marker missing in ${file}`)
  const next = text.slice(0, i) + guidesBlock(lang) + '\n' + text.slice(i)
  fs.writeFileSync(file, next)
}

const CHAPTER_BLURBS = [
  'market and filing data, MCP servers, official broker and exchange kits, skills',
  'filings and news → source-backed memos; self-hosted research workbenches',
  'specialized agents debate and hand off',
  'signal → sized, risk-checked order; prediction-market agents',
  'factors and strategy iteration',
  'bookkeeping, tax and invoicing, accounting-system MCP',
  'AML/KYC, DD, gated actions',
  'local-first budgets and accounts',
  'benchmarks, live arenas, public track records',
  'market-time correctness',
]

function writeLlmsTxt(gen, en, zh) {
  const chapterLines = en.pages
    .filter((p) => p.slug !== 'appendix')
    .map((p, i) => {
      const z = zh.pages.find((q) => q.slug === p.slug)
      return `${p.num}. [${p.shortTitle}](${SITE_ORIGIN}${p.link}.md) · [中文](${SITE_ORIGIN}${z.link}.md) — ${CHAPTER_BLURBS[i]}`
    })
  const appendix = en.pages.find((p) => p.slug === 'appendix')
  const appendixZh = zh.pages.find((p) => p.slug === 'appendix')
  const catLines = CATEGORIES.map((c) => {
    return `- [${c.title.en}](${SITE_ORIGIN}${hrefCategory(c.slug, 'en')}.md) · [中文](${SITE_ORIGIN}${hrefCategory(c.slug, 'zh')}.md) — ${c.description.en}`
  })
  const projLines = PROJECTS.map((p) => {
    return `- [${p.name}](${SITE_ORIGIN}${hrefProject(p.slug, 'en')}.md) · [中文](${SITE_ORIGIN}${hrefProject(p.slug, 'zh')}.md) — ${p.description.en}`
  })
  const cmpLines = COMPARISONS.map((c) => {
    return `- [${c.title.en}](${SITE_ORIGIN}${hrefCompare(c.slug, 'en')}.md) · [中文](${SITE_ORIGIN}${hrefCompare(c.slug, 'zh')}.md) — ${c.description.en}`
  })
  const text = [
    '# Awesome Finance Agents',
    '',
    '> Open-source LLM agents for finance, organized by financial function.',
    '> 按金融职能组织的开源 LLM 金融 agent 精选清单。',
    '',
    `Site: ${SITE_ORIGIN}/`,
    `中文: ${SITE_ORIGIN}/zh/`,
    `GitHub: ${REPO_URL}`,
    `Full text for models: ${SITE_ORIGIN}/llms-full.txt`,
    'Every page has a Markdown copy: add .md to its URL (Chinese pages under /zh/).',
    '',
    '## Chapters / 章节',
    '',
    ...chapterLines,
    `- [Appendix](${SITE_ORIGIN}${appendix.link}.md) · [中文](${SITE_ORIGIN}${appendixZh.link}.md) — models, surveys, neighboring lists`,
    '',
    '## Category notes / 分类导读',
    '',
    ...catLines,
    '',
    '## Project pages / 项目页',
    '',
    ...projLines,
    '',
    '## Comparisons / 对照',
    '',
    ...cmpLines,
    '',
    '## Use with AI / 在 AI 里使用',
    '',
    `- [Home (Markdown)](${SITE_ORIGIN}/index.md) / [中文首页](${SITE_ORIGIN}/zh/index.md)`,
    `- [projects.json](${SITE_ORIGIN}/projects.json): every entry with chapter, section, English and Chinese descriptions, and tags. Entries that have a project page also include page_en and page_zh.`,
    '- MCP (read-only, Streamable HTTP, no auth): https://mcp.finance-agents.dev/mcp — tools: search_projects, list_chapters, get_chapter, get_project',
    '- Claude Code: `claude mcp add --transport http finance-agents https://mcp.finance-agents.dev/mcp`',
    '',
    '## Source READMEs',
    '',
    `- English: ${REPO_URL}/blob/main/README.md`,
    `- 中文: ${REPO_URL}/blob/main/README.zh-CN.md`,
    '',
    '## Optional',
    '',
    `- [Contributing](${REPO_URL}/blob/main/CONTRIBUTING.md)`,
    '- License: CC0 1.0 Universal',
    '- Maintained by Ao Wang (https://aowang.ai) · GitHub: https://github.com/aowang-ai',
    '',
  ].join('\n')
  writeFile(path.join(here, '../public/llms.txt'), text)
  writeFile(path.join(gen, 'llms.txt'), text)
}

export function writeGuides({ src, gen, en, zh }) {
  const rels = []
  for (const lang of ['en', 'zh']) {
    for (const c of CATEGORIES) {
      const rel = `categories/${c.slug}.md`
      const page = renderCategory(c, lang)
      pagePair(src, gen, rel, fm(page.title, page.description, ['kind: category']), page.title, page.eyebrow, page.body, lang)
      if (lang === 'en') rels.push(rel)
    }
    for (const p of PROJECTS) {
      const rel = `projects/${p.slug}.md`
      const page = renderProject(p, lang)
      pagePair(
        src, gen, rel,
        fm(page.title, page.description, ['kind: project', `repo: ${yamlStr(p.repo)}`]),
        page.title, page.eyebrow, page.body, lang,
      )
      if (lang === 'en') rels.push(rel)
    }
    for (const c of COMPARISONS) {
      const rel = `compare/${c.slug}.md`
      const page = renderComparison(c, lang)
      const ids = [...new Set(c.groups.flatMap((g) => g.repos))]
      pagePair(
        src, gen, rel,
        fm(page.title, page.description, ['kind: comparison', 'aboutRepos:', ...ids.map((id) => `  - ${yamlStr(id)}`)]),
        page.title, page.eyebrow, page.body, lang,
      )
      if (lang === 'en') rels.push(rel)
    }
  }

  for (const lang of ['en', 'zh']) {
    const base = lang === 'zh' ? path.join(src, 'zh') : src
    const gbase = lang === 'zh' ? path.join(gen, 'zh') : gen
    patchHome(path.join(base, 'index.md'), lang)
    patchHome(path.join(gbase, 'index.md'), lang)
  }

  const paths = []
  for (const loc of [en, zh]) {
    paths.push(loc.key === 'zh' ? '/zh/' : '/')
    for (const p of loc.pages) paths.push(p.link)
  }
  for (const rel of rels) {
    const bare = '/' + rel.replace(/\.md$/, '')
    paths.push(bare)
    paths.push('/zh' + bare)
  }
  writeFile(path.join(gen, 'sitemap-paths.json'), JSON.stringify(paths, null, 2))
  writeLlmsTxt(gen, en, zh)

  const pageByUrl = new Map()
  for (const p of PROJECTS) {
    const url = repoOf(p.repo).url.replace(/\/$/, '').toLowerCase()
    pageByUrl.set(url, {
      page_en: `${SITE_ORIGIN}${hrefProject(p.slug, 'en')}`,
      page_zh: `${SITE_ORIGIN}${hrefProject(p.slug, 'zh')}`,
    })
  }

  const guideNav = {
    categories: CATEGORIES.map((c) => ({ title: c.title, link: { en: hrefCategory(c.slug, 'en'), zh: hrefCategory(c.slug, 'zh') } })),
    projects: PROJECTS.map((p) => ({ title: { en: p.name, zh: p.name }, link: { en: hrefProject(p.slug, 'en'), zh: hrefProject(p.slug, 'zh') } })),
    comparisons: COMPARISONS.map((c) => ({ title: c.title, link: { en: hrefCompare(c.slug, 'en'), zh: hrefCompare(c.slug, 'zh') } })),
  }

  const enCount = countMd(src)
  const zhCount = countMd(path.join(src, 'zh'))
  if (enCount !== 40 || zhCount !== 40) {
    throw new Error(`expected 40 pages per language, got en=${enCount} zh=${zhCount}`)
  }
  return { rels, pageByUrl, guideNav }
}

function countMd(dir) {
  let n = 0
  for (const name of fs.readdirSync(dir)) {
    if (name === 'zh' || name === 'README.md') continue
    const f = path.join(dir, name)
    if (fs.statSync(f).isDirectory()) n += countMd(f)
    else if (name.endsWith('.md')) n++
  }
  return n
}

export function guideRels() {
  return [
    ...CATEGORIES.map((c) => `categories/${c.slug}.md`),
    ...PROJECTS.map((p) => `projects/${p.slug}.md`),
    ...COMPARISONS.map((c) => `compare/${c.slug}.md`),
  ]
}

export function pageSchema(pageData, siteUrl) {
  const rel = pageData.relativePath || ''
  const isZh = rel.startsWith('zh/')
  const bare = isZh ? rel.slice(3) : rel
  const origin = siteUrl.replace(/\/$/, '')
  const url = origin + '/' + rel.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
  const lang = isZh ? 'zh-CN' : 'en-US'
  const title = pageData.frontmatter?.title || pageData.title
  const description = pageData.frontmatter?.description || pageData.description
  const base = {
    '@context': 'https://schema.org',
    headline: title,
    name: title,
    description,
    url,
    inLanguage: lang,
    dateModified: FACT_DATE,
    author: { '@id': `${origin}/#person` },
    publisher: { '@id': `${origin}/#organization` },
    isPartOf: { '@id': `${origin}/#website` },
  }
  const code = (id) => {
    const r = byRepo[id]
    if (!r) return null
    const node = {
      '@type': 'SoftwareSourceCode',
      name: r.nameWithOwner.split('/')[1],
      codeRepository: r.url,
      programmingLanguage: r.language || undefined,
    }
    if (r.license_spdx && r.license_spdx !== 'NOASSERTION') node.license = `https://spdx.org/licenses/${r.license_spdx}.html`
    return node
  }
  if (bare.startsWith('projects/')) {
    const slug = bare.slice('projects/'.length, -3)
    const p = PROJECTS.find((x) => x.slug === slug)
    if (!p) return null
    return { ...base, '@type': 'TechArticle', about: code(p.repo) }
  }
  if (bare.startsWith('compare/')) {
    const slug = bare.slice('compare/'.length, -3)
    const c = COMPARISONS.find((x) => x.slug === slug)
    if (!c) return null
    const ids = [...new Set(c.groups.flatMap((g) => g.repos))]
    return { ...base, '@type': 'Article', about: ids.map(code).filter(Boolean) }
  }
  if (bare.startsWith('categories/')) {
    const slug = bare.slice('categories/'.length, -3)
    const c = CATEGORIES.find((x) => x.slug === slug)
    if (!c) return null
    const pre = isZh ? '/zh' : ''
    const items = [
      { '@type': 'ListItem', position: 1, name: isZh ? c.title.zh : c.title.en, url: `${origin}${pre}/chapters/${c.chapterSlug}` },
      ...c.projects.map((ps, i) => {
        const p = projectBySlug(ps)
        return { '@type': 'ListItem', position: i + 2, name: p.name, url: `${origin}${pre}/projects/${ps}` }
      }),
    ]
    return {
      ...base,
      '@type': 'CollectionPage',
      mainEntity: { '@type': 'ItemList', numberOfItems: items.length, itemListElement: items },
    }
  }
  return null
}

function normPath(u) {
  const url = new URL(u, 'https://finance-agents.dev')
  let p = url.pathname
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return p || '/'
}

export async function finalizeSitemap(outDir) {
  const file = path.join(outDir, 'sitemap.xml')
  let xml = ''
  for (let i = 0; i < 100; i++) {
    if (fs.existsSync(file)) {
      const a = fs.statSync(file).size
      await new Promise((r) => setTimeout(r, 40))
      const b = fs.existsSync(file) ? fs.statSync(file).size : 0
      if (a > 200 && a === b) {
        xml = fs.readFileSync(file, 'utf8')
        break
      }
    } else {
      await new Promise((r) => setTimeout(r, 40))
    }
  }
  if (!xml) throw new Error('sitemap.xml was not written')
  if (xml.includes('<sitemapindex')) throw new Error('sitemap.xml is a sitemap index; expected a urlset of every page')
  let pretty = xml.trim().replace(/>\s*</g, '>\n<')
  if (!pretty.endsWith('\n')) pretty += '\n'
  fs.writeFileSync(file, pretty)

  const expectFile = path.join(here, '../.generated/sitemap-paths.json')
  const expected = JSON.parse(fs.readFileSync(expectFile, 'utf8')).map(normPath)
  const blocks = [...pretty.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1])
  const locs = blocks.map((b) => {
    const m = /<loc>([^<]+)<\/loc>/.exec(b)
    return m ? m[1] : ''
  })
  const got = locs.map(normPath)
  const missing = expected.filter((p) => !got.includes(p))
  const extra = got.filter((p) => !expected.includes(p))
  if (missing.length || extra.length || got.length !== expected.length) {
    throw new Error(
      `sitemap mismatch: expected ${expected.length}, got ${got.length}, missing ${missing.slice(0, 8).join(' ')}, extra ${extra.slice(0, 8).join(' ')}`,
    )
  }
  for (const block of blocks) {
    for (const lang of ['en-US', 'zh-CN', 'x-default']) {
      if (!block.includes(`hreflang="${lang}"`)) {
        throw new Error(`sitemap url missing hreflang ${lang}`)
      }
    }
  }
  console.log(`sitemap: urlset with ${locs.length} <loc>, each with en-US, zh-CN, x-default`)
}
