# Contributing

Thank you for helping improve Awesome Finance Agents. This list is a **shortlist, not a catalog**. Every entry should help someone build or evaluate an LLM agent for a real financial job.

中文贡献者：可以直接用中文提 issue 或 PR。新增条目时请同时更新 `README.md`（英文）和 `README.zh-CN.md`（中文）；如果只会写一种语言，在 PR 里说明，维护者会补另一种。

## What Belongs Here

A resource belongs here if it is **open-source** (or an open benchmark/dataset with a public repo) and clearly related to **LLM agents, MCP, skills, or agent evaluation** in finance, including:

- Market / filing / macro data tools that agents actually call (MCP, CLI, SDK designed for agents).
- Research, trading, quant-automation, accounting, compliance, or personal-finance agents.
- Finance-specific evaluation harnesses, arenas, and leakage-safe backtest/replay tooling.

Activity rule: GitHub projects should have commits within the **last 12 months**, unless the entry is an important frozen benchmark, classic paper code, or survey.

## What Does Not Belong

- Marketing pages, affiliate / rebate funnels, paid signal rooms, or "guaranteed return" screenshots.
- Generic quant libraries with no LLM/agent interface (put those in classic awesome-quant instead).
- Closed APIs with no open client, skill, or MCP surface.
- Token or NFT promotion repos.
- Thin wrappers that only print one API response.
- Projects without a usable license note when listed under open-source implementations (call out AGPL / unclear licenses in the description if kept).

## Which Chapter Does It Go In?

Place an entry in the **single most specific** chapter:

| If the resource is mainly about… | Put it in |
| -------------------------------- | --------- |
| Market data, filings, MCP, skills, official broker/exchange agent kits | 1 |
| Deep research / equity memos / filing QA agents, self-hosted research workbenches | 2 |
| Multi-agent debate, analyst teams, hedge-fund sims | 3 |
| Order execution, portfolio agents, prediction-market trading | 4 |
| Factor mining, strategy codegen, RD-Agent style loops | 5 |
| Bookkeeping, reconciliation, invoices, tax, ledgers, accounting-system MCP | 6 |
| AML/KYC, DD, fraud, ESG gates, action firewalls | 7 |
| Budgets, personal net worth, consumer finance MCP | 8 |
| Benchmarks, live arenas, public track records, graders, trustworthiness | 9 |
| PIT backtests, replay, look-ahead / leakage control | 10 |
| Base FinLLMs, surveys, neighboring awesome lists | Appendix |

For long trading-only catalogs, prefer linking to [LLMQuant/awesome-trading-agents](https://github.com/LLMQuant/awesome-trading-agents) instead of duplicating them here.

## Entry Format

```md
- [Name](https://github.com/org/repo) - Why it is worth reading, in one sentence.
```

- Use the canonical GitHub URL (follow renames; do not keep stale redirects).
- Start the description with an uppercase letter and end with a period.
- Optional markers: `🇨🇳` (China A-share / Chinese project), `⭐` (start here, sparingly), `(sim)` / `(live)` / `(paper)` when clearly documented.
- Do **not** write star counts or version numbers.
- Add new entries at the end of the relevant subsection unless order teaches something.

## Pull Requests

1. One PR per resource, or one PR per chapter for a related group.
2. Title format: `Add <Name> to <chapter number>` (for example, `Add Klaudia to 6`).
3. Update both `README.md` and `README.zh-CN.md`, or say which one you could not do.
4. Make sure CI passes: `awesome-lint` and lychee.

```sh
npx awesome-lint README.md
lychee --config lychee.toml README.md README.zh-CN.md
```

## License of Contributions

By contributing, you agree to dedicate your contribution under [CC0 1.0](LICENSE).
