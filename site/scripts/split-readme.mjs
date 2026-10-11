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
      disclaimerTitle: 'Not investment advice',
      footnotes: 'Footnotes',
      contributing: 'Contributing',
      prev: 'Previous chapter',
      next: 'Next chapter',
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
      disclaimerTitle: '不构成投资建议',
      footnotes: '备注',
      contributing: '贡献',
      prev: '上一章',
      next: '下一章',
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

  const disclaimer = (() => {
    const q = preamble.find((l) => /^> \*\*/.test(l))
    return q ? q.replace(/^>\s*/, '') : ''
  })()
  const tagline = plain((preamble.find((l) => /^> /.test(l) && !/^> \*\*/.test(l)) || '').replace(/^>\s*/, ''))
  const name = plain(preamble.find((l) => /^# /.test(l)).replace(/^# /, '').replace(/\[!\[.*$/, ''))
  // intro paragraphs: preamble minus title, tagline, language switch, disclaimer
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

  const warn = (body) => [
    `::: warning ${loc.labels.disclaimerTitle}`,
    plain(body.replace(/^\*\*[^*]+\*\*\s*/, '')),
    ':::',
  ]

  // --- home page
  const features = [
    ...pages.map((p) => ({
      title: `${p.num}. ${p.shortTitle}`,
      details: questions.get(p.num) || `${p.entries}`,
      link: p.link,
    })),
    {
      title: appendixPage.title,
      details: plain(trimBlank(appendixPage.body)[0] || ''),
      link: appendixPage.link,
    },
  ]
  const home = [
    '---',
    'layout: home',
    `title: ${yamlStr(name)}`,
    `titleTemplate: false`,
    `description: ${yamlStr(tagline)}`,
    'hero:',
    `  name: ${yamlStr(name)}`,
    `  tagline: ${yamlStr(tagline)}`,
    '  actions:',
    '    - theme: brand',
    `      text: ${yamlStr(loc.labels.start)}`,
    `      link: ${pages[0].link}`,
    '    - theme: alt',
    `      text: ${yamlStr(loc.labels.github)}`,
    `      link: ${REPO_URL}`,
    'features:',
    ...features.flatMap((f) => [
      `  - title: ${yamlStr(f.title)}`,
      `    details: ${yamlStr(f.details)}`,
      `    link: ${f.link}`,
    ]),
    '---',
    '',
    '<div class="afa-home">',
    '',
    ...warn(disclaimer),
    '',
    ...rewrite(intro),
    '',
    `## ${mapSec.title}`,
    '',
    ...rewrite(trimBlank(mapSec.body)),
    '',
    `## ${howToSec.title}`,
    '',
    ...rewrite(trimBlank(howToSec.body)),
    '',
    '</div>',
    '',
  ]
  fs.writeFileSync(path.join(out, 'index.md'), home.join('\n'))

  // --- chapter pages
  for (const p of [...pages, appendixPage]) {
    const desc = plain(
      trimBlank(p.body).find((l) => l.trim() && !/^#/.test(l)) || p.title,
    ).slice(0, 200)
    const page = [
      '---',
      `title: ${yamlStr(p.title)}`,
      `description: ${yamlStr(desc)}`,
      '---',
      '',
      `# ${p.title}`,
      '',
      ...warn(disclaimer),
      '',
      ...rewrite(demote(trimBlank(p.body))),
      '',
    ]
    const file = p.slug === 'appendix' ? 'appendix.md' : `chapters/${p.slug}.md`
    fs.writeFileSync(path.join(out, file), page.join('\n'))
  }

  return {
    key: loc.key,
    file: loc.file,
    name,
    tagline,
    disclaimer: plain(disclaimer.replace(/^\*\*[^*]+\*\*\s*/, '')),
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
