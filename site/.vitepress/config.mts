import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
// The READMEs are the source of truth: split them into pages every time the
// config loads (dev, build). Output goes to site/src/ (git-ignored).
import { splitReadmes, REPO_URL, ROOT } from '../scripts/split-readme.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const manifest = splitReadmes()
const en = manifest.locales.root
const zh = manifest.locales.zh

// GitHub Pages serves project sites under /<repo>/. Override with DOCS_BASE=/ for a custom domain.
const base = process.env.DOCS_BASE || '/awesome-finance-agents/'
const siteUrl = process.env.DOCS_SITE_URL || `https://aowang-ai.github.io${base}`

function sidebar(loc: typeof en, overview: string, contributing: string): DefaultTheme.SidebarItem[] {
  const chapters = loc.pages.filter((p: any) => p.slug !== 'appendix')
  const appendix = loc.pages.find((p: any) => p.slug === 'appendix')
  return [
    { text: overview, link: loc.key === 'zh' ? '/zh/' : '/' },
    {
      text: loc.key === 'zh' ? '章节' : 'Chapters',
      items: chapters.map((p: any) => ({ text: p.title, link: p.link })),
    },
    {
      text: loc.key === 'zh' ? '更多' : 'More',
      items: [
        { text: appendix.title, link: appendix.link },
        { text: contributing, link: `${REPO_URL}/blob/main/CONTRIBUTING.md` },
        { text: 'Changelog', link: `${REPO_URL}/blob/main/CHANGELOG.md` },
      ],
    },
  ]
}

const footer = (loc: typeof en, license: string) => ({
  message: loc.footnote,
  copyright: license,
})

export default withMermaid(
  defineConfig({
    srcDir: 'src',
    srcExclude: ['README.md'],
    base,
    cleanUrls: true,
    lastUpdated: false,
    title: en.name,
    description: en.tagline,
    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }],
      ['meta', { name: 'theme-color', content: '#ffffff' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: en.name }],
      ['meta', { name: 'twitter:card', content: 'summary' }],
    ],
    // per-page og:title / og:description / og:url
    transformPageData(pageData, { siteConfig }) {
      const title = pageData.frontmatter.title || pageData.title || en.name
      const desc = pageData.frontmatter.description || pageData.description || en.tagline
      const url = siteUrl + pageData.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
      pageData.frontmatter.head ??= []
      pageData.frontmatter.head.push(
        ['meta', { property: 'og:title', content: title }],
        ['meta', { property: 'og:description', content: desc }],
        ['meta', { property: 'og:url', content: url }],
        ['meta', { property: 'og:locale', content: pageData.relativePath.startsWith('zh/') ? 'zh_CN' : 'en_US' }],
        ['link', { rel: 'canonical', href: url }],
      )
    },
    sitemap: { hostname: siteUrl },
    vite: {
      publicDir: path.resolve(here, '../public'),
      server: {
        // regenerate pages when a README changes during `docs:dev`
        watch: { ignored: ['!**/README*.md'] },
      },
      plugins: [
        {
          name: 'afa-readme-watch',
          configureServer(server) {
            const files = [path.join(ROOT, 'README.md'), path.join(ROOT, 'README.zh-CN.md')]
            server.watcher.add(files)
            server.watcher.on('change', (f) => {
              if (files.includes(path.resolve(f))) {
                try {
                  splitReadmes()
                } catch (e) {
                  console.error(e)
                }
              }
            })
          },
        },
      ],
      optimizeDeps: { include: ['mermaid', 'dayjs', '@braintree/sanitize-url', 'debug', 'cytoscape-cose-bilkent', 'cytoscape'] },
    },
    mermaid: { theme: 'neutral' },
    themeConfig: {
      socialLinks: [{ icon: 'github', link: REPO_URL }],
      outline: { level: [2, 3] },
      search: {
        provider: 'local',
        options: {
          miniSearch: {
            options: {
              // CJK-aware tokenizer: Intl.Segmenter splits Chinese into words,
              // so queries like "回测" or "合规" match. Must stay self-contained
              // (VitePress serializes it to the client).
              tokenize: (text: string) => {
                const out: string[] = []
                const seg =
                  typeof Intl !== 'undefined' && (Intl as any).Segmenter
                    ? new (Intl as any).Segmenter('zh', { granularity: 'word' })
                    : null
                for (const chunk of String(text).split(/[\s\-_/.,;:!?()[\]{}"'`|<>*#~=+&^%$@]+/)) {
                  if (!chunk) continue
                  if (seg && /[\u3400-\u9fff\uf900-\ufaff]/.test(chunk)) {
                    for (const s of seg.segment(chunk)) if (s.isWordLike) out.push(s.segment)
                  } else out.push(chunk)
                }
                return out
              },
            },
            searchOptions: { prefix: true, fuzzy: 0.2, combineWith: 'AND' },
          },
          locales: {
            zh: {
              translations: {
                button: { buttonText: '搜索', buttonAriaLabel: '搜索' },
                modal: {
                  displayDetails: '显示详细列表',
                  resetButtonTitle: '清除',
                  backButtonTitle: '关闭搜索',
                  noResultsText: '没有找到结果',
                  footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
                },
              },
            },
          },
        },
      },
    },
    locales: {
      root: {
        label: 'English',
        lang: 'en-US',
        title: en.name,
        description: en.tagline,
        themeConfig: {
          nav: [
            { text: 'Chapters', link: en.pages[0].link },
            { text: 'Appendix', link: '/appendix' },
            { text: 'Contribute', link: `${REPO_URL}/blob/main/CONTRIBUTING.md` },
          ],
          sidebar: sidebar(en, 'Overview', 'Contributing'),
          footer: footer(en, 'Published under CC0 1.0 Universal'),
          docFooter: { prev: en.labels.prev, next: en.labels.next },
        },
      },
      zh: {
        label: '简体中文',
        lang: 'zh-CN',
        link: '/zh/',
        title: zh.name,
        description: zh.tagline,
        themeConfig: {
          nav: [
            { text: '章节', link: zh.pages[0].link },
            { text: '附录', link: '/zh/appendix' },
            { text: '参与贡献', link: `${REPO_URL}/blob/main/CONTRIBUTING.md` },
          ],
          sidebar: sidebar(zh, '概览', '贡献指南'),
          footer: footer(zh, '以 CC0 1.0 Universal 发布'),
          docFooter: { prev: zh.labels.prev, next: zh.labels.next },
          outline: { level: [2, 3], label: '本页目录' },
          returnToTopLabel: '回到顶部',
          sidebarMenuLabel: '菜单',
          darkModeSwitchLabel: '主题',
          lightModeSwitchTitle: '切换到浅色模式',
          darkModeSwitchTitle: '切换到深色模式',
          langMenuLabel: '切换语言',
        },
      },
    },
  }),
)
