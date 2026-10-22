# Changelog

Notable changes to the list are recorded here. Individual link additions and fixes are visible in the Git history.

## How This List Is Maintained

- **On every pull request:** `awesome-lint` checks formatting, and lychee checks every link.
- **Every week:** a scheduled lychee run opens or updates a "Link checker report" issue when links break.
- **Every month:** `scripts/check_stale.py` flags GitHub repositories that are archived, renamed, missing, or have had no push in 12 months.
- **Every quarter:** a maintainer re-reads each chapter, removes stale entries, and records the review here.

## [Unreleased]

### Added

- Site guides in English and Chinese: 10 category notes, 15 project pages, and 3 comparison pages. Repository figures are GitHub API values from 2026-10-22.

## [0.2.2] - 2026-10-19

### Added

- WyckoffTradingAgent and FriesTrader in LLM trading agents (2); 250 entries total.

## [0.2.1] - 2026-10-11

### Added

- Longbridge official CLI, MCP server, and agent skills in Official broker and exchange agent kits (1); 248 entries total.

## [0.2.0] - 2026-10-11

### Added

- 121 entries across all chapters and the appendix (245 entries total).
- New subsections: Official broker and exchange agent kits (1), Self-hosted research workbenches and terminals (2), Prediction-market agents (4), Tax, invoicing, and payables (6), Accounting-system MCP servers (6), Live arenas and public track records (9).
- Country flags for region-specific data sources (for example 🇹🇷, 🇰🇷).

### Changed

- Moved existing entries into the new subsections: alpaca-mcp-server and okx/agent-trade-kit (1); LangAlpha, Vibe-Research, easy-stock, and Seris (2); polymarket-mcp-server (from 1 to 4); norman-mcp-server (6); live-trade-bench, Agent_Market_Arena, and alpha-arena (9).
- Renamed "Decision, trading, and arenas" (9) to "Decision and trading benchmarks".

## [0.1.0] - 2026-10-11

### Added

- First curated version (~120 entries) organized by financial function and reliability across 10 chapters plus an appendix.
- Differentiating chapters for accounting (6), risk/compliance (7), evaluation & arenas (9), and backtest/replay/leakage control (10).
- Trading chapter kept as a shortlist with an explicit pointer to LLMQuant/awesome-trading-agents.
- English `README.md` and Simplified Chinese `README.zh-CN.md`, contribution guide, CC0 license, and CI for lint + link checks.
