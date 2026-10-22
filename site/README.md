# Site

The website is generated from `README.md` (English, `/`) and `README.zh-CN.md` (Chinese, `/zh/`).
Chapter pages come from those READMEs. `site/scripts/split-readme.mjs` splits them into one page per chapter at build time,
writing to `site/src/` (git-ignored).

Category notes, project pages, and comparisons are also generated, from `site/content/guides.mjs` plus `site/data/repo-facts.json`.
Edit that copy and the fact snapshot; do not edit `site/src/` by hand.

```bash
npm ci
npm run docs:dev      # http://localhost:5173/
npm run docs:build    # split + count check + build into site/.vitepress/dist
npm run docs:preview  # serve the built site
```

- Both READMEs must keep the same chapter order: Chinese pages reuse the English slugs so the language switch maps 1:1.
- The split step fails if a new `##` section appears that it does not know how to place, or if entry counts differ between README and pages.
- `.github/workflows/pages.yml` builds and deploys to GitHub Pages on push to `main`. Set `DOCS_BASE=/` for a custom domain.

## Look and feel

The theme (`site/.vitepress/theme/custom.css`) aims for an edited reference book, not a landing page:
system fonts (no web fonts), neutral greys with one ink-blue link colour, hairline rules instead of cards,
a plain-text home page with a contents table, and entry lists rendered as `name | description` rows.
The split script turns README markers into small badges: 🇨🇳 → `CN`, `(sim)` / `(live)` / `(paper)` (or `sim/live`) → one badge each.
The README's mermaid map stays README-only; on the site its table is folded into the home contents table.

