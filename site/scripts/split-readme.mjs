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
  ]
  fs.writeFileSync(path.join(out, 'index.md'), home.join('\n'))

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
    pages: [...pages, appendixPage].map(({ body, ...rest }) => rest),
  }
}

export function splitReadmes() {
  fs.rmSync(SRC, { recursive: true, force: true })
  fs.mkdirSync(SRC, { recursive: true })
  const en = buildLocale(LOCALES[0])
  const zh = buildLocale(LOCALES[1], en.slugs)
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
