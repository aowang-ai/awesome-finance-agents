# Site

The website is generated from `README.md` (English, `/`) and `README.zh-CN.md` (Chinese, `/zh/`).
**Edit the READMEs only** — `site/scripts/split-readme.mjs` splits them into one page per chapter at build time,
writing to `site/src/` (git-ignored).

```bash
npm ci
npm run docs:dev      # http://localhost:5173/awesome-finance-agents/
npm run docs:build    # split + count check + build into site/.vitepress/dist
npm run docs:preview  # serve the built site
```

- Both READMEs must keep the same chapter order: Chinese pages reuse the English slugs so the language switch maps 1:1.
- The split step fails if a new `##` section appears that it does not know how to place, or if entry counts differ between README and pages.
- `.github/workflows/pages.yml` builds and deploys to GitHub Pages on push to `main`. Set `DOCS_BASE=/` for a custom domain.
