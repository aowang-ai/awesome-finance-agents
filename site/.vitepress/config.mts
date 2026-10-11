import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, type DefaultTheme, type HeadConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
// The READMEs are the source of truth: split them into pages every time the
// config loads (dev, build). Output goes to site/src/ (git-ignored).
import { splitReadmes, REPO_URL, ROOT } from '../scripts/split-readme.mjs'

const here = path.dirname(fileURLToPath(import.meta.url))
const manifest = splitReadmes()
const en = manifest.locales.root
const zh = manifest.locales.zh

// Served at the root of the custom domain (site/public/CNAME).
const base = process.env.DOCS_BASE || '/'
const siteUrl = process.env.DOCS_SITE_URL || 'https://finance-agents.dev/'
const ogImage = `${siteUrl}og.png`
const zhSiteTitle = 'Awesome Finance Agents（金融 Agent 精选）'

function pageUrl(relativePath: string): string {
  return (
    siteUrl +
    relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
  )
}

function altPaths(relativePath: string): { en: string; zh: string } {
  const isZh = relativePath.startsWith('zh/')
  const enRel = isZh ? relativePath.slice(3) : relativePath
  const zhRel = isZh ? relativePath : `zh/${relativePath}`
  return { en: pageUrl(enRel), zh: pageUrl(zhRel) }
}

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

const personOrgLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}#person`,
      name: 'Ao Wang',
      url: 'https://aowang.ai',
      sameAs: ['https://github.com/aowang-ai', 'https://aowang.ai'],
    },
    {
      '@type': 'Organization',
      '@id': `${siteUrl}#organization`,
      name: 'Awesome Finance Agents',
      url: siteUrl,
      logo: `${siteUrl}logo.svg`,
      sameAs: [REPO_URL],
      founder: { '@id': `${siteUrl}#person` },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}#website`,
      name: en.name,
      url: siteUrl,
      description: en.tagline,
      inLanguage: ['en-US', 'zh-CN'],
      publisher: { '@id': `${siteUrl}#organization` },
      author: { '@id': `${siteUrl}#person` },
    },
  ],
}

function collectionLd(locale: 'en' | 'zh') {
  const loc = locale === 'zh' ? zh : en
  const home = locale === 'zh' ? `${siteUrl}zh/` : siteUrl
  const name = locale === 'zh' ? zhSiteTitle : en.name
  const items = loc.pages.map((p: any, i: number) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: p.title,
    url: pageUrl(
      locale === 'zh'
        ? p.slug === 'appendix'
          ? 'zh/appendix.md'
          : `zh/chapters/${p.slug}.md`
        : p.slug === 'appendix'
          ? 'appendix.md'
          : `chapters/${p.slug}.md`,
    ),
  }))
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${home}#collection`,
    name,
    description: loc.tagline,
    url: home,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    isPartOf: { '@id': `${siteUrl}#website` },
    author: { '@id': `${siteUrl}#person` },
    publisher: { '@id': `${siteUrl}#organization` },
    mainEntity: {
      '@type': 'ItemList',
      name: locale === 'zh' ? '章节目录' : 'Chapters',
      numberOfItems: items.length,
      itemListElement: items,
    },
  }
}

const buildDay = new Date().toISOString().slice(0, 10)

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
      ['link', { rel: 'icon', href: `${base}favicon.ico`, sizes: '48x48' }],
      ['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}favicon.svg` }],
      ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${base}favicon-32x32.png` }],
      ['link', { rel: 'apple-touch-icon', href: `${base}apple-touch-icon.png` }],
      ['meta', { name: 'theme-color', content: '#ffffff' }],
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:site_name', content: en.name }],
      ['meta', { property: 'og:image', content: ogImage }],
      ['meta', { property: 'og:image:width', content: '1200' }],
      ['meta', { property: 'og:image:height', content: '630' }],
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:image', content: ogImage }],
      [
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(personOrgLd),
      ],
    ],
    transformPageData(pageData) {
      const title = pageData.frontmatter.title || pageData.title || en.name
      const desc = pageData.frontmatter.description || pageData.description || en.tagline
      const url = pageUrl(pageData.relativePath)
      const isZh = pageData.relativePath.startsWith('zh/')
      pageData.frontmatter.head ??= []
      const head = pageData.frontmatter.head as HeadConfig[]
      head.push(
        ['meta', { property: 'og:title', content: String(title) }],
        ['meta', { property: 'og:description', content: String(desc) }],
        ['meta', { property: 'og:url', content: url }],
        ['meta', { property: 'og:locale', content: isZh ? 'zh_CN' : 'en_US' }],
        ['link', { rel: 'canonical', href: url }],
      )
      // Home CollectionPage + ItemList (10 chapters + appendix)
      if (
        pageData.relativePath === 'index.md' ||
        pageData.relativePath === 'zh/index.md'
      ) {
        head.push([
          'script',
          { type: 'application/ld+json' },
          JSON.stringify(
            collectionLd(pageData.relativePath.startsWith('zh/') ? 'zh' : 'en'),
          ),
        ])
      }
    },
    transformHead({ pageData }) {
      // Ensure hreflang / og tags also land via transformHead for pages
      // where frontmatter.head merging is incomplete in some VitePress paths.
      const { en: enHref, zh: zhHref } = altPaths(pageData.relativePath)
      return [
        ['link', { rel: 'alternate', hreflang: 'en-US', href: enHref }],
        ['link', { rel: 'alternate', hreflang: 'zh-CN', href: zhHref }],
        ['link', { rel: 'alternate', hreflang: 'x-default', href: enHref }],
      ]
    },
    sitemap: {
      hostname: siteUrl,
      transformItems(items) {
        return items.map((item) => ({
          ...item,
          lastmod: buildDay,
        }))
      },
    },
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
      // Short brand in the navbar; full name stays in <title>, h1 and SEO metadata.
      logo: { src: '/logo.svg', width: 24, height: 24, alt: '' },
      siteTitle: 'Finance Agents',
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
          siteTitle: 'Finance Agents',
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
        title: zhSiteTitle,
        description: zh.tagline,
        themeConfig: {
          siteTitle: 'Finance Agents',
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
