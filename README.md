# Awesome Finance Agents [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> Open-source LLM agents for finance, organized by job: research, trading, operations, risk & compliance, personal finance, evaluation, and backtesting.

**English** | [简体中文](README.zh-CN.md)

This list is organized by **financial function**. Trading is one chapter; for a deeper trading-only catalog, see LLMQuant/awesome-trading-agents in the Appendix. It also covers accounting, compliance, evaluation, and backtesting/replay.

Each chapter answers: what problem it solves, which open-source projects to study, and one pitfall tip. Star counts are omitted so they do not go stale. 🇨🇳 marks China A-share / Chinese-language projects; other flags mark region-specific data sources (for example 🇹🇷, 🇰🇷). `(sim)` / `(live)` / `(paper)` mark paper trading, live trading, or paper-code when known.

## Contents

- [The Map](#the-map)
- [How to Use This List](#how-to-use-this-list)
- [1. Data and Tools](#1-data-and-tools)
- [2. Investment Research and Deep Research](#2-investment-research-and-deep-research)
- [3. Multi-Agent Research and Decision Systems](#3-multi-agent-research-and-decision-systems)
- [4. Trading Execution and Portfolio Management](#4-trading-execution-and-portfolio-management)
- [5. Quantitative Research Automation](#5-quantitative-research-automation)
- [6. Finance Operations and Accounting](#6-finance-operations-and-accounting)
- [7. Risk, Compliance, and Audit](#7-risk-compliance-and-audit)
- [8. Personal Finance](#8-personal-finance)
- [9. Evaluation Benchmarks and Arenas](#9-evaluation-benchmarks-and-arenas)
- [10. Backtesting, Replay, and Leakage Control](#10-backtesting-replay-and-leakage-control)
- [Appendix](#appendix)
  - [Financial LLMs and related models](#financial-llms-and-related-models)
  - [Surveys and paper lists](#surveys-and-paper-lists)
  - [Related awesome lists](#related-awesome-lists)

## The Map

```mermaid
flowchart TB
    subgraph Tools["Data and tools"]
        C1["1 Data / MCP / Skills"]
    end
    subgraph Jobs["Financial jobs"]
        C2["2 Research"]
        C3["3 Multi-agent decisions"]
        C4["4 Trading and portfolio"]
        C5["5 Quant automation"]
        C6["6 Accounting"]
        C7["7 Risk and compliance"]
        C8["8 Personal finance"]
    end
    subgraph Trust["Reliability"]
        C9["9 Evaluation and arenas"]
        C10["10 Backtest / replay / leakage"]
    end
    C1 --> Jobs
    Jobs --> Trust
    Trust -. improves .-> Jobs
```

| #  | Chapter               | Core question                                                              |
| -- | --------------------- | -------------------------------------------------------------------------- |
| 1  | Data and Tools        | How does the agent get trustworthy, timestamped market and filing data?    |
| 2  | Investment Research   | How does it turn filings and news into source-backed memos?                |
| 3  | Multi-Agent Decisions | How do specialized agents debate and hand off a decision?                  |
| 4  | Trading and Portfolio | How does a signal become a sized, risk-checked order?                      |
| 5  | Quant Automation      | How do agents mine factors and iterate strategies?                         |
| 6  | Accounting            | How do agents bookkeep, reconcile, and report without rewriting history?   |
| 7  | Risk and Compliance   | How are AML/KYC, DD, and irreversible actions gated?                       |
| 8  | Personal Finance      | How do local-first apps expose budgets and accounts to agents?             |
| 9  | Evaluation and Arenas | How do we measure research, decisions, safety, and live skill?             |
| 10 | Backtest and Leakage  | How do we keep market-time correctness under agent loops?                  |

## How to Use This List

**Building a research agent.** Start with chapters 1 → 2 → 9.

**Building a trading agent.** Read 1 → 3/4 → 10 → 9, then use the trading-only list linked in the Appendix for more depth.

**Ops / compliance / personal finance.** Start with chapters 6, 7, and 8.

**Interview or design review.** Use each chapter's pitfall tip as a failure-mode checklist.

This is a shortlist, not a catalog. Links were checked when added; CI runs awesome-lint and a weekly link checker.

## 1. Data and Tools

### What Problem It Solves

A finance agent is only as good as the data and tools it can call. This chapter covers market data, filings, broker bridges, and skill packs that expose those capabilities to MCP-aware agents.

### Platforms and market data

- [OpenBB](https://github.com/openbq-org/OpenBB) - Open data platform for analysts, quants, and AI agents across equities, options, crypto, and macro.
- [akshare](https://github.com/akfamily/akshare) - 🇨🇳 China A-share and multi-market data toolkit widely used as an agent data backend.
- [a-stock-data](https://github.com/simonlin1212/a-stock-data) - 🇨🇳 High-coverage A-share data endpoints designed for agent and research workflows.
- [edgartools](https://github.com/dgunning/edgartools) - Typed Python API for SEC EDGAR: 10-K/8-K, XBRL, 13F, Form 3/4/5.
- [MarS](https://github.com/microsoft/MarS) - Microsoft financial market simulation engine powered by a generative foundation model.
- [global-stock-data](https://github.com/simonlin1212/global-stock-data) - Zero-auth US market data skill for coding agents: CBOE options Greeks, FINRA short volume, SEC filings, screener.
- [yahoo-finance2](https://github.com/gadicc/yahoo-finance2) - Unofficial Yahoo Finance API for Node with a CLI, MCP server, and agent skill.
- [CNEquity](https://github.com/rootSunc/CNEquity) - 🇨🇳 Local Parquet data lake for China markets with point-in-time semantics, quality audits, and MCP access.
- [FQGate-agent](https://github.com/fqgate/FQGate-agent) - 🇨🇳 Local A-share quotes, K-lines, Level-2 and news from the Tonghuashun client, exposed to Codex/Claude Code-style agents.
- [dartlab](https://github.com/eddmpython/dartlab) - 🇰🇷 Korean DART and SEC EDGAR filings as structured Python data for company analysis.

### MCP servers

- [financial-services](https://github.com/anthropics/financial-services) - Anthropic official skills and connectors pack for financial-services workflows.
- [FinanceMCP](https://github.com/guangxiangdebizi/FinanceMCP) - 🇨🇳 Tushare + Binance finance MCP for Claude-style agents.
- [mcp-cn-a-stock](https://github.com/elsejj/mcp-cn-a-stock) - 🇨🇳 MCP server that exposes China A-share market data to LLMs.
- [sec-edgar-mcp](https://github.com/stefanoamorelli/sec-edgar-mcp) - MCP server for browsing and querying SEC EDGAR filings.
- [yahoo-finance-mcp](https://github.com/Alex2Yang97/yahoo-finance-mcp) - Yahoo Finance market data exposed over MCP.
- [mcp_massive](https://github.com/massive-com/mcp_massive) - MCP for Massive.com (formerly Polygon) market data.
- [tradingview-mcp](https://github.com/atilaahmettaner/tradingview-mcp) - TradingView MCP: market data, screeners, technicals, and backtesting bridges.
- [Equibles](https://github.com/daniel3303/Equibles) - Self-hosted financial data MCP: SEC filings, XBRL financials, 13F holdings, insider and congressional trades, FRED.
- [opennews-mcp](https://github.com/6551Team/opennews-mcp) - News aggregation MCP with AI ratings and trading-signal tags for crypto and markets.
- [financial-datasets/mcp-server](https://github.com/financial-datasets/mcp-server) - MCP server for the Financial Datasets stock market API (prices, statements, news).
- [stock-api](https://github.com/zhangxiangliang/stock-api) - 🇨🇳 A-share, US, HK, and exchange-traded fund quotes via Node.js, browser, CLI, or MCP.
- [metatrader-mcp-server](https://github.com/ariadng/metatrader-mcp-server) - MCP server that lets LLMs read data and place trades through MetaTrader 5. (live)
- [maverick-mcp](https://github.com/wshobson/maverick-mcp) - Stock MCP with Yahoo Finance data, technical analysis, portfolio tracking, and Python backtests.
- [borsa-mcp](https://github.com/saidsurucu/borsa-mcp) - 🇹🇷 MCP for Borsa Istanbul, US equities, and Turkish fund data.
- [investor-agent](https://github.com/ferdousbhai/investor-agent) - MCP server bundling market data, fundamentals, options, and sentiment for building an investor agent.
- [interactive-brokers-mcp](https://github.com/code-rabi/interactive-brokers-mcp) - Interactive Brokers MCP server for account, market data, and order tools. (sim/live)
- [alpha_vantage_mcp](https://github.com/alphavantage/alpha_vantage_mcp) - Official Alpha Vantage MCP server for equities, FX, crypto, and economic indicators.
- [Financial-Modeling-Prep-MCP-Server](https://github.com/imbenrabi/Financial-Modeling-Prep-MCP-Server) - MCP implementation of the Financial Modeling Prep API (statements, ratios, estimates, filings).
- [fred-mcp-server](https://github.com/stefanoamorelli/fred-mcp-server) - MCP server for FRED (Federal Reserve Economic Data) macro series.
- [Financial Evidence](https://github.com/beepboop2025/financial-evidence-skills) - Free, read-only MCP server and Python SDK for money-market, bank and BTC liquidity data, with source links, dates and units on every row.
- [Finance MCP](https://finance-mcp.com) - Hosted MCP server where agents discover, inspect, and run finance data tools for OKX, Deribit, SEC EDGAR, FMP, FRED, and Polymarket, over OAuth or an API key.

### Official broker and exchange agent kits

- [alpaca-mcp-server](https://github.com/alpacahq/alpaca-mcp-server) - Official Alpaca MCP for stocks, ETFs, options, and crypto with paper trading. (sim)
- [okx/agent-trade-kit](https://github.com/okx/agent-trade-kit) - OKX trading MCP for spot, swap, futures, options, and grid bots. (live)
- [kraken-cli](https://github.com/krakenfx/kraken-cli) - Kraken's AI-native CLI for crypto, tokenized stocks, FX, and derivatives, designed for agent use. (live)
- [Bitget-AI/agent_hub](https://github.com/Bitget-AI/agent_hub) - Official Bitget toolkit connecting Claude, Cursor, Codex, and ChatGPT to Bitget trading. (live)
- [Polymarket/agent-skills](https://github.com/Polymarket/agent-skills) - Official Polymarket agent skills for market discovery and trading.
- [okx/agent-skills](https://github.com/okx/agent-skills) - Official OKX agent skills for market data, portfolio queries, and trading. (live)
- [alpaca-skills](https://github.com/alpacahq/alpaca-skills) - Official Alpaca SKILL.md files for its Trading and Broker APIs. (sim/live)
- [QuantConnect/mcp-server](https://github.com/QuantConnect/mcp-server) - Official QuantConnect MCP for driving projects, backtests, and live algorithms from an agent.
- [futu-agent-hub](https://github.com/FutunnOpen/futu-agent-hub) - Official Futu skills for Futu OpenAPI, information search, and sentiment indicators.
- [longbridge-terminal](https://github.com/longbridge/longbridge-terminal) - Official Longbridge CLI covering every Longbridge OpenAPI endpoint for HK/US quotes, options, positions, and orders, built for agent tool calls, with a TUI. (live)
- [longbridge-mcp](https://github.com/longbridge/longbridge-mcp) - Official Longbridge MCP with 164 tools for HK/US quotes, options, orders, fundamentals, analyst ratings, and calendars over a hosted OAuth 2.1 endpoint. (live)
- [longbridge/skills](https://github.com/longbridge/skills) - Official Longbridge agent skills (13) for market data, technical analysis, fundamentals, portfolio, and earnings, for Claude Code and Codex.

### Skills packs

- [finance-skills](https://github.com/himself65/finance-skills) - Skill pack for AI financial analysis workflows.
- [claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) - Claude skills pack for US equity investors and traders.
- [UZI-Skill](https://github.com/wbh604/UZI-Skill) - 🇨🇳 Popular persona-style stock-review skill pack for A/HK/US markets with rule-based scoring.
- [investorskills](https://github.com/questflowai/investorskills) - Library encoding well-known investors' judgment as structured, portable skills for finance agents.
- [digital-oracle](https://github.com/komako-workshop/digital-oracle) - Skill that answers macro questions (housing, gold, BTC, geopolitics) with market-implied probability estimates.
- [equity-research-skill](https://github.com/rollingSirius/equity-research-skill) - Single-stock and earnings deep-dive skill producing chaptered equity research reports.
- [agentii-investment-intelligence](https://github.com/agentii-ai/agentii-investment-intelligence) - 25 equity-research skills built on SEC filings, XBRL financials, and market data.
- [JoelLewis/finance_skills](https://github.com/JoelLewis/finance_skills) - 81 Claude Code skills across 7 financial-services plugins (wealth, compliance, operations, and more).
- [quant-buddy-skills](https://github.com/pseudo-longinus/quant-buddy-skills) - 🇨🇳 Quant analysis skills across A/HK/US equities, futures, macro, and ETFs.

### Pitfall Tip

Prefer point-in-time and timestamped sources. Do not let the model invent ticker prices or filing numbers. Mark any tool that can place an order as write-capable and gate it behind approval.

## 2. Investment Research and Deep Research

### What Problem It Solves

Research agents read filings, transcripts, news, and data rooms, then produce source-backed investment memos. The hard part is grounding every number and claim.

### Open-source research agents

- [dexter](https://github.com/virattt/dexter) - Autonomous deep financial research agent with tool use and structured reports.
- [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) - Open-source AI agent platform for financial applications from AI4Finance.
- [FinSight](https://github.com/RUC-NLPIR/FinSight) - Deep financial research agent framework (ACL 2026 lineage).
- [ai-berkshire](https://github.com/xbtlin/ai-berkshire) - Value-investing multi-agent research in a Buffett/Munger style.
- [ai-financial-agent](https://github.com/virattt/ai-financial-agent) - Investment research financial agent from the dexter/ai-hedge-fund author.
- [DeepEar](https://github.com/HKUSTDial/DeepEar) - 🇨🇳 Deep research and financial signal tracking framework (顺风耳).
- [claude-equity-research](https://github.com/quant-sentiment-ai/claude-equity-research) - Claude Code plugin for institutional-style equity research workflows.
- [FinnewsHunter](https://github.com/DemonDamon/FinnewsHunter) - Multi-agent financial news intelligence: real-time analysis, sentiment, and signal extraction.
- [FinSight-AI](https://github.com/juanjuandog/FinSight-AI) - Equity research agent with evidence-grounded RAG, versioned reports, and quality checks.
- [prism-insight](https://github.com/dragon1086/prism-insight) - Multi-agent stock analysis and trading system with report generation (Korean and US markets).
- [augur](https://github.com/BruceLanLan/augur) - Local-first research memory with multi-persona analysis, time-stamped evidence, and replayable runs.
- [dayu-agent](https://github.com/noho/dayu-agent) - 🇨🇳 Buy-side filings analysis agent for US/A/HK reports: download, Q&A, and auditable report writing.
- [Claude-Code-Stock-Deep-Research-Agent](https://github.com/liangdabiao/Claude-Code-Stock-Deep-Research-Agent) - 🇨🇳 Claude Code setup running an 8-stage stock due-diligence flow with parallel research agents.
- [alphasift](https://github.com/ZhuLinsen/alphasift) - Full-market stock screening with LLM ranking, risk-aware scoring, and auditable evidence.
- [dexter-jp](https://github.com/edinetdb/dexter-jp) - Dexter-style deep research agent for Japanese listed companies on EDINET data.
- [FinanceHarness](https://github.com/Yijia-Xiao/FinanceHarness) - Autonomous financial deep-research framework (paper code).
- [kamathhrishi/finance-agent](https://github.com/kamathhrishi/finance-agent) - Q&A over earnings calls, SEC filings, and news using file-tool navigation rather than vector RAG.

### Self-hosted research workbenches and terminals

- [LangAlpha](https://github.com/ginlix-ai/LangAlpha) - Claude Code style workbench aimed at financial markets research.
- [Vibe-Research](https://github.com/simonlin1212/Vibe-Research) - 🇨🇳 A/US/HK equity research workbench with a large local data surface.
- [easy-stock](https://github.com/jundizhou/easy-stock) - 🇨🇳 A-share analysis and AI research desktop workbench.
- [Seris](https://github.com/aowang-ai/seris) - Desktop AI market research assistant: chat beside live charts, price alerts, and local backtests with your own model.
- [FinceptTerminal](https://github.com/Fincept-Corporation/FinceptTerminal) - Open-source finance terminal (AGPL) with market analytics, built-in AI research agents, and broker/backtest hooks.
- [go-stock](https://github.com/ArvinLovegood/go-stock) - 🇨🇳 Local-first desktop AI stock analysis for A/HK/US: quotes, news and fund-flow analysis, screening, alerts.
- [tick-stock-panel](https://github.com/shy3130/tick-stock-panel) - 🇨🇳 Self-hosted A-share workbench: LLM-assisted strategy building, monitoring, backtests, and reviews.
- [PanWatch](https://github.com/TNT-Likely/PanWatch) - 🇨🇳 AI stock monitoring for A/HK/US built on TradingAgents, with portfolio insights and alerts.
- [vibe-astock](https://github.com/simonlin1212/vibe-astock) - 🇨🇳 A-share short-term review workbench: anomaly watch, sentiment review, AI recaps, trade journal.
- [hunter-community](https://github.com/agentpit-io/hunter-community) - 🇨🇳 Self-hosted multi-agent research terminal for A/HK/US equities: screener, stock deep dives, watchlists, and holdings, with your own model key.
- [folio](https://github.com/helsome/folio) - Local-first AI investment research workbench with evidence-backed theses, portfolio risk, and a Pi agent copilot.

### Pitfall Tip

Require citations to filing sections or URLs. Reject answers that invent financial ratios. Prefer agents that keep a tool-call trail you can audit.

## 3. Multi-Agent Research and Decision Systems

### What Problem It Solves

These systems simulate an analyst team: specialized agents debate, hand off, and reach a decision. Useful for exploring role structure, not as out-of-the-box alpha.

### Flagship multi-agent systems

- [TradingAgents](https://github.com/TauricResearch/TradingAgents) - Multi-agent LLM trading framework with analyst, trader, and risk roles.
- [ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) - AI hedge fund simulation with specialized investing agents.
- [TradingAgents-CN](https://github.com/hsliuping/TradingAgents-CN) - 🇨🇳 Chinese-enhanced TradingAgents with local market adaptations.
- [valuecell](https://github.com/ValueCell-ai/valuecell) - Community multi-agent platform aimed at financial applications.
- [AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) - Swarm-style auto-hedge multi-agent system.
- [TradingAgents-astock](https://github.com/simonlin1212/TradingAgents-astock) - 🇨🇳 A-share adapted TradingAgents with local data features.
- [aiagents-stock](https://github.com/oficcejo/aiagents-stock) - 🇨🇳 Multi-AI stock team for analysis, watchlists, and sector rotation alerts.
- [TradingAgents-AShare](https://github.com/KylinMountain/TradingAgents-AShare) - 🇨🇳 A-share multi-agent research desk with debate UI.
- [lumibot](https://github.com/Lumiwealth/lumibot) - Broker-connected trading agents with backtests across many brokers. (sim/live)
- [ai-hedge-fund-crypto](https://github.com/51bitquant/ai-hedge-fund-crypto) - Crypto-oriented fork of ai-hedge-fund.
- [ALTA](https://github.com/kyky2347/ALTA) - Research-only multi-agent trading firm: scouts, reviewers, and a strategy desk with a separate broker boundary. (sim)
- [atlas-gic](https://github.com/chrisworsey55/atlas-gic) - Self-improving trading agents that evolve their prompts against market feedback (autoresearch-style).
- [ai-market-maker](https://github.com/olaxbt/ai-market-maker) - Crypto hedge-fund-style agent stack on LangGraph with a hard risk-guard veto before execution.
- [easy_investment_Agent_crewai](https://github.com/liangdabiao/easy_investment_Agent_crewai) - 🇨🇳 CrewAI + AKShare multi-agent A-share analysis platform.
- [CryptoTradingAgents](https://github.com/Tomortec/CryptoTradingAgents) - Multi-agent LLM decision framework adapted for crypto markets.
- [trading-agents-java](https://github.com/BlackmodeN/trading-agents-java) - 🇨🇳 Spring AI multi-agent research desk with debate, daily position reviews, and vector memory.
- [AlpacaTradingAgent](https://github.com/huygiatrng/AlpacaTradingAgent) - TradingAgents-style multi-agent framework wired to Alpaca for paper/live orders. (sim/live)
- [FinCon](https://github.com/The-FinAI/FinCon) - Manager-analyst multi-agent system with conceptual verbal reinforcement (NeurIPS 2024). (paper)

### Pitfall Tip

Debate does not equal correctness. Watch for shared context contamination across agents and for consensus that is just the loudest prompt.

## 4. Trading Execution and Portfolio Management

### What Problem It Solves

From signal to order: position sizing, risk budgets, broker/exchange connectors, and portfolio analytics. For a broader trading-only catalog, see LLMQuant/awesome-trading-agents in the Appendix.

### LLM trading agents

- [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) - 🇨🇳 LLM multi-market stock analysis with dashboard and alerts.
- [Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) - Personal trading agent stack from HKUDS. (sim)
- [AI-Trader](https://github.com/HKUDS/AI-Trader) - Agent-native automated trading research system.
- [nofx](https://github.com/NoFxAiOS/nofx) - AI trading terminal assistant for US stocks, commodities, forex, and crypto. (sim/live)
- [OpenAlice](https://github.com/TraderAlice/OpenAlice) - One-person Wall Street style AI trading agent across assets.
- [AgenticTrading](https://github.com/Open-Finance-Lab/AgenticTrading) - Agentic trading research codebase paired with evaluation harnesses.
- [FinRL-Trading](https://github.com/AI4Finance-Foundation/FinRL-Trading) - AI-native modular infrastructure for quantitative trading (FinRL-X).
- [FinMem-LLM-StockTrading](https://github.com/pipiku915/FinMem-LLM-StockTrading) - Layered-memory LLM trading agent from the FinMem line of work. (paper)
- [jev-trade](https://github.com/aowang-ai/jev-trade) - Model-driven Hyperliquid trader: one call per tick across five isolated coin sleeves, with a live desk and dry-run mode. (sim/live)
- [QuantDinger](https://github.com/OpenByteInc/QuantDinger) - Self-hostable AI trading OS: agent and natural-language strategy building, backtests, and broker/exchange execution. (sim/live)
- [OctoBot](https://github.com/Drakkar-Software/OctoBot) - Open-source crypto bot with AI/LLM strategy modes alongside grid, DCA, and TradingView signals. (sim/live)
- [Hyper-Alpha-Arena](https://github.com/HammerGPT/Hyper-Alpha-Arena) - AI trading platform for Hyperliquid and Binance futures with model-driven strategies. (sim/live)
- [MAHORAGA](https://github.com/ygwyg/MAHORAGA) - Autonomous trading agent driven by social-sentiment analysis. (sim/live)
- [nof1.ai](https://github.com/195440/nof1.ai) - Open re-implementation of the nof1.ai autonomous LLM trading agent. (sim/live)
- [OpenTrade](https://github.com/OpenTradeOSS/OpenTrade) - macOS harness letting Claude Code/Codex agents trade via Robinhood's official MCP, with approvals and limits. (live)
- [hummingbot/condor](https://github.com/hummingbot/condor) - Hummingbot's Telegram harness for monitoring and running AI trading agents via the Hummingbot API. (live)
- [WyckoffTradingAgent](https://github.com/YoungCan-Wang/WyckoffTradingAgent) - 🇨🇳 Wyckoff volume-price trading agent and A-share stock screener with CLI workflows and MCP tools.
- [FriesTrader](https://github.com/YizhiSong/FriesTrader) - Robinhood trading agent placing real orders through Robinhood's agentic-trading MCP, under mechanical risk rules the model cannot override. (live)

### Prediction-market agents

- [polymarket-mcp-server](https://github.com/caiovicentino/polymarket-mcp-server) - MCP for Polymarket prediction markets with monitoring and safety features. (sim/live)
- [CloddsBot](https://github.com/alsk1992/CloddsBot) - Autonomous AI trading agent spanning Polymarket, Kalshi, and crypto exchanges. (sim/live)
- [pmxt](https://github.com/pmxt-dev/pmxt) - Unified API for trading Polymarket, Kalshi, and other prediction markets. (live)
- [Polyseer](https://github.com/yorkeccak/Polyseer) - Multi-agent deep research for Polymarket/Kalshi questions with evidence weighting and cited reports.
- [kalshi-ai-trading-bot](https://github.com/ryanfrigo/kalshi-ai-trading-bot) - Toolkit for AI-driven strategies on Kalshi prediction markets. (sim/live)
- [kalshi-trading-bot-cli](https://github.com/OctagonAI/kalshi-trading-bot-cli) - CLI that researches Kalshi markets, estimates probabilities, and places trades. (sim/live)

### Broker bridges and execution substrates

- [alpaca-py](https://github.com/alpacahq/alpaca-py) - Official Alpaca Python SDK; common backend for paper/live agent trading. (sim/live)
- [freqtrade](https://github.com/freqtrade/freqtrade) - Popular crypto trading bot often used as an execution backend for agents. (sim/live)
- [hummingbot](https://github.com/hummingbot/hummingbot) - Open-source crypto market making and execution framework. (live)
- [tradememory-protocol](https://github.com/mnemox-ai/tradememory-protocol) - Decision audit trail and memory protocol for AI trading agents.
- [ccxt](https://github.com/ccxt/ccxt) - Unified API for 100+ crypto exchanges; a common execution layer for crypto agents. (live)
- [easytrader](https://github.com/shidenggui/easytrader) - 🇨🇳 A-share broker automation for Tonghuashun, miniQMT, and Xueqiu; used as an agent execution layer. (live)
- [fintool](https://github.com/second-state/fintool) - Rust CLI suite for agentic trading and market intelligence, one binary per exchange. (live)

### Pitfall Tip

Separate paper from live. Never give an agent unbounded live order permission. Model fees, slippage, and halt rules before trusting PnL screenshots.

## 5. Quantitative Research Automation

### What Problem It Solves

Agents that mine factors, write strategy code, run backtests, and iterate. Closest thing to an autonomous quant researcher.

### Research automation systems

- [qlib](https://github.com/microsoft/qlib) - AI-oriented quant platform; common substrate for factor and model research agents.
- [RD-Agent](https://github.com/microsoft/RD-Agent) - Microsoft R&D agent with a strong finance factor/strategy automation track.
- [alphagen](https://github.com/ICT-FinD-Lab/alphagen) - RL-based generation of formulaic alpha factor sets.
- [QuantaAlpha](https://github.com/QuantaAlpha/QuantaAlpha) - Agentic workflow for discovering quantitative alpha factors.
- [QuantGPT](https://github.com/Miasyster/QuantGPT) - Agent-driven alpha factory that designs, backtests, and submits factors.
- [AlphaFin](https://github.com/AlphaFin-proj/AlphaFin) - Retrieval-augmented stock-chain style financial analysis.
- [pwb-alphaevolve](https://github.com/paperswithbacktest/pwb-alphaevolve) - AlphaEvolve-style coding agent applied to trading strategies.
- [Alpha-R1](https://github.com/FinStep-AI/Alpha-R1) - Alpha and factor research agent line from FinStep-AI.
- [LLMQuant/quant-mind](https://github.com/LLMQuant/quant-mind) - Agent-oriented pipeline that turns papers, news, and filings into typed, cited, time-stamped financial knowledge.
- [QuantHarness](https://github.com/Y-Research-SBU/QuantHarness) - Price-driven multi-agent LLM framework for high-frequency trading research. (paper)
- [Qbot](https://github.com/UFund-Me/Qbot) - 🇨🇳 Locally deployed AI quant research and trading bot platform.
- [ai_quant_trade](https://github.com/charliedream1/ai_quant_trade) - 🇨🇳 All-in-one AI quant toolbox covering strategies, LLMs, factor mining, and sim/live trading.
- [qusong0627/QuantMind](https://github.com/qusong0627/QuantMind) - 🇨🇳 AI-native multi-market quant platform integrating Qlib and RD-Agent factor evolution.
- [loopera](https://github.com/Loopera-ai/loopera) - Hypothesis-driven agent for fundamental factor research with evidence-gated validation.
- [finlab-ai](https://github.com/koreal6803/finlab-ai) - Agent skills for generating and testing quant strategies on FinLab (Taiwan stocks).
- [qanat](https://github.com/fidetolabs/qanat) - MCP server for factor processing and backtesting that an agent can drive directly.
- [x2strategy](https://github.com/ALAGENT-HKU/x2strategy) - Agent skill that extracts structured strategy specs from quant finance papers.
- [AgentQuant](https://github.com/OnePunchMonk/AgentQuant) - Failure-aware harness for reproducible strategy research with typed agent workflows.
- [alphaevo](https://github.com/ZhuLinsen/alphaevo) - Self-evolving stock strategy research agent with backtest feedback.
- [EvoQuant](https://github.com/CamusGIT/EvoQuant) - Self-evolving research agent that runs the full quant research loop.
- [quantitative-signal-discovery-agent](https://github.com/NVIDIA-AI-Blueprints/quantitative-signal-discovery-agent) - NVIDIA blueprint: closed-loop LLM workflow that generates, codes, and evaluates alpha signals.
- [AlphaQuanter](https://github.com/horizon-llm/AlphaQuanter) - Tool-orchestrated agentic RL framework for stock trading (ACL 2026). (paper)

### Pitfall Tip

Factor factories overfit fast. Demand walk-forward or purged CV, and keep a holdout the agent never sees.

## 6. Finance Operations and Accounting

### What Problem It Solves

Agents for bookkeeping, reconciliation, invoices, tax, and reporting, plus MCP access to accounting systems.

### Ledgers and agent accountants

- [beancount](https://github.com/beancount/beancount) - Double-entry plaintext accounting ledger; common target for bookkeeping agents.
- [fava](https://github.com/beancount/fava) - Web UI for Beancount; useful review surface next to an accounting agent.
- [Klaudia](https://github.com/Yudhyy/Klaudia) - Self-hosted agentic accountant for receipts, reconciliation, and approvals.
- [Bookkeeping-Agency-Skill](https://github.com/cyhzzz/Bookkeeping-Agency-Skill) - 🇨🇳 Skills pack for China bookkeeping-agency vertical agents.
- [accounted](https://github.com/erp-mafia/accounted) - Open-source ERP designed to be operated by agents.
- [cfo-stack](https://github.com/MikeChongCan/cfo-stack) - Beancount-based AI CFO workflow: import, classification, reconciliation, reports, and tax skills.

### Tax, invoicing, and payables

- [TaxHacker](https://github.com/vas3k/TaxHacker) - Self-hosted AI accounting app: LLM extraction for receipts, invoices, and transactions with custom categories.
- [openaccountants](https://github.com/openaccountants/openaccountants) - Sourced accounting and tax guides written for both people and AI agents.
- [shinkoku](https://github.com/kazukinagata/shinkoku) - Japanese tax-return agent plugin covering bookkeeping through e-Tax entry.
- [mcp-fiscal-brasil](https://github.com/DeHor-Labs/mcp-fiscal-brasil) - Brazilian tax and fiscal MCP: CNPJ, NF-e, SPED, Simples Nacional, and more.
- [opentax](https://github.com/filedcom/opentax) - Open-source US federal tax engine shipped as a single CLI with agent skills.

### Accounting-system MCP servers

- [norman-mcp-server](https://github.com/norman-finance/norman-mcp-server) - MCP for AI-powered bookkeeping and tax filing automation (EU-oriented).
- [quickbooks-online-mcp-server](https://github.com/intuit/quickbooks-online-mcp-server) - Official Intuit MCP server giving AI assistants access to QuickBooks Online data.
- [xero-mcp-server](https://github.com/XeroAPI/xero-mcp-server) - Official Xero MCP server for contacts, invoices, accounts, and reports.
- [stripe/ai](https://github.com/stripe/ai) - Stripe's agent toolkit and MCP for payments, billing, and usage-based charging.

### Pitfall Tip

Accounting agents must be append-only or approval-gated. Never let an agent silently rewrite historical ledger entries.

## 7. Risk, Compliance, and Audit

### What Problem It Solves

AML/KYC, fraud triage, due diligence, ESG review, and action firewalls that sit in front of irreversible agent actions (orders, payments, ledger writes).

### Due diligence, AML/KYC, and firewalls

- [due-diligence-agents](https://github.com/zoharbabin/due-diligence-agents) - Multi-agent M&A / corporate due diligence workflows.
- [cordum](https://github.com/cordum-io/cordum) - Agent action firewall for approving high-risk tool calls before they execute.
- [tcaml-framework](https://github.com/tomcustos/tcaml-framework) - Open AML/KYC/KYB agent framework with explicit human gates.
- [MutiAgent4Fraud](https://github.com/zheng977/MutiAgent4Fraud) - Multi-agent fraud detection research system.
- [agentfactory-business-plugins](https://github.com/panaversity/agentfactory-business-plugins) - Banking and finance agent skills covering AML/KYC, IFRS9, Basel themes.
- [banking_plugin_qcc](https://github.com/duhu2000/banking_plugin_qcc) - 🇨🇳 Banking agents plus Qichacha MCP for China due diligence.
- [FinVault](https://github.com/aifinlab/FinVault) - Execution-grounded financial agent safety benchmark.
- [ESGenius](https://github.com/ANGEL-NTU/ESGenius) - ESG knowledge benchmark for LLMs.
- [cre-acquisition-orchestrator](https://github.com/ahacker-1/cre-acquisition-orchestrator) - Agent framework for commercial real estate acquisitions: diligence, underwriting, and financing.

### Pitfall Tip

Compliance agents should propose, not auto-clear. Keep human gates and an immutable audit log of every overridden alert.

## 8. Personal Finance

### What Problem It Solves

Budgeting, spending analysis, net-worth tracking, and local-first finance apps that agents can connect to via MCP or skills.

### Apps and MCP bridges

- [actual](https://github.com/actualbudget/actual) - Local-first personal finance app; common integration surface for agents.
- [firefly-iii](https://github.com/firefly-iii/firefly-iii) - Self-hosted personal finances manager with a mature API.
- [accountant24](https://github.com/machulav/accountant24) - Personal finance agent oriented around bookkeeping workflows.
- [monarch-mcp-server](https://github.com/robcerda/monarch-mcp-server) - MCP server for Monarch Money personal finance data.
- [lunchmoney-mcp](https://github.com/akutishevsky/lunchmoney-mcp) - Lunch Money personal finance MCP.
- [moneymatter](https://github.com/letehaha/moneymatter) - Self-hosted budget tracker with a built-in MCP server.
- [mcp-server-firefly-iii](https://github.com/fabianonetto/mcp-server-firefly-iii) - MCP server bridging agents to Firefly III.
- [finance-assistant](https://github.com/googlarz/finance-assistant) - Personal finance copilot skill (FIRE planning, bank statement formats).
- [opencoffer](https://github.com/osirishorus/opencoffer) - Self-hosted personal finance with BYO-LLM chat and MCP.
- [BeeCount](https://github.com/TNT-Likely/BeeCount) - 🇨🇳 Local-first bookkeeping app (iOS/Android/Web) with AI capture, self-hosted sync, and MCP.
- [aurelio-finance](https://github.com/LosaLosSantos/aurelio-finance) - Open-source personal finance app with an AI advisor for net worth, investments, and cash flow.
- [actual-ai](https://github.com/sakowicz/actual-ai) - Categorizes Actual Budget transactions with an LLM (OpenAI-compatible or Ollama).
- [Finance-Guru](https://github.com/AojdevStudio/Finance-Guru) - Self-hosted family-office engine with typed calculators, a private ledger, and specialist agents.
- [ray-finance](https://github.com/cdinnison/ray-finance) - Open-source AI financial advisor that keeps context about your situation across conversations.
- [beancount-io](https://github.com/bex-co/beancount-io) - Plain-text double-entry bookkeeping apps for people and AI agents (iOS/Android).

### Pitfall Tip

Prefer local-first or read-only MCP access to bank data. Never store raw banking credentials inside an agent prompt or chat log.

## 9. Evaluation Benchmarks and Arenas

### What Problem It Solves

Measure research QA, trading decisions, safety, and live arena performance. Without evals, finance agents are demos.

### Research and open-book QA

- [PIXIU](https://github.com/The-FinAI/PIXIU) - FinMA + FinBen financial LLM evaluation suite.
- [FinBen](https://github.com/The-FinAI/FinBen) - Holistic financial LLM benchmark from The-FinAI.
- [financebench](https://github.com/patronus-ai/financebench) - Open-book financial QA benchmark over real filings.
- [finance-agent](https://github.com/vals-ai/finance-agent) - Tool-using finance agent research benchmark (arXiv:2508.00828).
- [finance-agent-v2](https://github.com/vals-ai/finance-agent-v2) - Finance Agent benchmark v2 with EDGAR, web, and price tools.
- [FinSearchComp](https://github.com/randomtutu/FinSearchComp) - Expert financial search and reasoning benchmark (ByteDance Seed lineage).
- [BizFinBench](https://github.com/HiThink-Research/BizFinBench) - Business-driven real-world financial LLM benchmark.
- [FinEval](https://github.com/SUFE-AIFLM-Lab/FinEval) - 🇨🇳 Chinese financial LLM evaluation suite.
- [MME-Finance](https://github.com/HiThink-Research/MME-Finance) - Multimodal finance benchmark for expert-level understanding.
- [FinToolBench](https://github.com/Double-wk/FinToolBench) - 760 executable financial tools and 295 queries for evaluating tool-using agents.
- [FinMTM](https://github.com/HiThink-Research/FinMTM) - Multi-turn multimodal benchmark for financial reasoning and agents.
- [finchain](https://github.com/mbzuai-nlp/finchain) - Symbolic benchmark for verifiable chain-of-thought financial reasoning.
- [big-finance-benchmark](https://github.com/Rogo-Technologies/big-finance-benchmark) - Reference harness for BigFinanceBench, a workflow-grounded financial research benchmark.
- [CNFinBench](https://github.com/open-compass/CNFinBench) - 🇨🇳 OpenCompass benchmark for high-stakes financial agent tasks.
- [FinanceBenchmark](https://github.com/microsoft/FinanceBenchmark) - Microsoft benchmark for finance agents in M365 Copilot (~300 tasks with ERP and web tools).

### Decision and trading benchmarks

- [INVESTOR-BENCH](https://github.com/felis33/INVESTOR-BENCH) - InvestorBench: LLM agent financial decision benchmark (ACL 2025).
- [QuantitativeFinance-Bench](https://github.com/QF-Bench/QuantitativeFinance-Bench) - State-aware interactive quant agent benchmark on Harbor.
- [stockbench](https://github.com/ChenYXxxx/stockbench) - Controlled benchmark asking whether LLM agents can trade profitably.
- [DeepFund](https://github.com/HKUSTDial/DeepFund) - NeurIPS'25 pilot for fund-investment style agent evaluation.
- [QuantCode-Bench](https://github.com/LimexAILab/QuantCode-Bench) - Benchmark for executable algorithmic trading code generation.
- [TwinMarket](https://github.com/FreedomIntelligence/TwinMarket) - LLM-driven market simulation for agent interaction studies.

### Live arenas and public track records

- [live-trade-bench](https://github.com/ulab-uiuc/live-trade-bench) - Live evaluation of trading agents.
- [Agent_Market_Arena](https://github.com/The-FinAI/Agent_Market_Arena) - Live multi-market trading arena for LLM agents.
- [alpha-arena](https://github.com/AmadeusGB/alpha-arena) - Alpha arena competition harness for trading agents.
- [LLM-Trading-Lab](https://github.com/LuckyOne7777/LLM-Trading-Lab) - Public experiment where ChatGPT manages a small real-money micro-cap portfolio, with logs and code. (live)
- [nof0](https://github.com/wquguru/nof0) - 🇨🇳 Open-source AI trading arena in the style of nof1 Alpha Arena.
- [continuous-record-llm-trading-agents](https://github.com/ProjectDXAI/continuous-record-llm-trading-agents) - Data and artifacts from a continuous-record study of what LLM trading agents actually do. (paper)

### Safety and trustworthiness

- [awesome-financial-llm-trustworthiness-benchmarks](https://github.com/FDU-INS/awesome-financial-llm-trustworthiness-benchmarks) - Curated benchmarks for financial LLM trustworthiness.
- [TradeTrap](https://github.com/Yanlewen/TradeTrap) - Tests whether LLM trading agents stay reliable and faithful under perturbation. (paper)

### Pitfall Tip

Leaderboard PnL without costs, latency, or leakage controls is not evidence. Prefer benchmarks that publish contamination policy and tool access rules.

## 10. Backtesting, Replay, and Leakage Control

### What Problem It Solves

Finance-specific reliability layer: point-in-time data, look-ahead bias control, deterministic replay, and realistic cost models. General agent durability belongs in agent-infra style lists; this chapter is market-time correctness.

### Harnesses and engines

- [TraderHarness](https://github.com/HephaestLab/TraderHarness) - ⭐ Contamination-resistant point-in-time backtest and replay for LLM traders.
- [nautilus_trader](https://github.com/nautechsystems/nautilus_trader) - Deterministic production-grade trading engine usable as an agent execution substrate.
- [vectorbt](https://github.com/polakowo/vectorbt) - High-performance vectorized backtesting often wrapped by strategy agents.
- [backtesting.py](https://github.com/kernc/backtesting.py) - Simple, readable Python backtesting library for strategy prototypes.
- [pybroker](https://github.com/edtechre/pybroker) - Python algorithmic trading with ML-friendly backtesting hooks.
- [zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) - Maintained Zipline fork for Pythonic event-driven backtests.
- [Lean](https://github.com/QuantConnect/Lean) - QuantConnect's open-source event-driven engine for backtests and live trading.
- [llm-agent-trader](https://github.com/jason8745/llm-agent-trader) - Backtesting system where an LLM makes the trade decisions, with FastAPI and Next.js UI.
- [vectorbt-backtesting-skills](https://github.com/marketcalls/vectorbt-backtesting-skills) - Agent skills for writing and running VectorBT backtests (India, US, crypto).

### Pitfall Tip

If your backtest can see tomorrow's close, your agent is cheating. Prefer PIT datasets, embargoed splits, and replay logs that pin model + data versions.

## Appendix

Models, surveys, and neighboring lists that are useful context but not always "agents" themselves.

### Financial LLMs and related models

- [FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) - Open-source financial LLM line from AI4Finance.
- [FinRL](https://github.com/AI4Finance-Foundation/FinRL) - Financial reinforcement learning library and tutorials.
- [Fin-R1](https://github.com/SUFE-AIFLM-Lab/Fin-R1) - 🇨🇳 Financial reasoning LLM (Fin-R1).
- [Kronos](https://github.com/shiyu-coder/Kronos) - Foundation model for financial markets.
- [finBERT](https://github.com/ProsusAI/finBERT) - Classic financial sentiment BERT.
- [XuanYuan](https://github.com/Duxiaoman-DI/XuanYuan) - 🇨🇳 Chinese financial LLM (XuanYuan).
- [qwen-dianjin](https://github.com/aliyun/qwen-dianjin) - 🇨🇳 Qwen DianJin financial LLMs from Alibaba Cloud.

### Surveys and paper lists

- [Agentic_FinTech_Survey](https://github.com/agentic-fintech/Agentic_FinTech_Survey) - Survey of AI agents in finance / fintech.
- [fin_survey](https://github.com/F1y1113/fin_survey) - EMNLP 2025 survey materials on LLM agents in finance.
- [Awesome-LLM-Quantitative-Trading-Papers](https://github.com/Tom-roujiang/Awesome-LLM-Quantitative-Trading-Papers) - Paper list for LLM quantitative trading, benchmarks, and arenas.
- [LLMs-in-Finance](https://github.com/hananedupouy/LLMs-in-Finance) - Notebooks and material on LLMs and agents in finance.

### Related awesome lists

- [awesome-trading-agents](https://github.com/LLMQuant/awesome-trading-agents) - Trading-focused agents / MCP / skills list (complement to this repo).
- [awesome-ai-in-finance](https://github.com/georgezouq/awesome-ai-in-finance) - Long-running AI × finance list (classic quant/ML plus newer agent overlay).
- [awesome-finance-mcp](https://github.com/BlockRunAI/awesome-finance-mcp) - Finance MCP and skills catalog by asset class.
- [Awesome_AI4Finance](https://github.com/AI4Finance-Foundation/Awesome_AI4Finance) - AI4Finance ecosystem awesome list.
- [awesome-quant](https://github.com/wilsonfreitas/awesome-quant) - Classic quantitative finance libraries and resources.
- [thuquant/awesome-quant](https://github.com/thuquant/awesome-quant) - 🇨🇳 Chinese awesome-quant.
- [awesome-systematic-trading](https://github.com/paperswithbacktest/awesome-systematic-trading) - Systematic trading papers and code.
- [Awesome-Prediction-Market-Tools](https://github.com/aarora4/Awesome-Prediction-Market-Tools) - Prediction market tools and infrastructure.
- [Introduction-to-Quantitative-Finance](https://github.com/Barca0412/Introduction-to-Quantitative-Finance) - 🇨🇳 Chinese quant finance intro with an AI+finance arXiv radar.
- [Awesome-finance-skills](https://github.com/RKiding/Awesome-finance-skills) - 🇨🇳 Collection of free finance agent skills (bilingual).
- [quantskills](https://github.com/quantskills/quantskills) - 🇨🇳 Navigation hub for open-source quant skills and agents, from data to risk monitoring.
- [Finance-LLMs](https://github.com/kennethleungty/Finance-LLMs) - Compilation of real-world LLM and agent use cases in financial services.
- [Awesome-FinLLMs](https://github.com/DataArcTech/Awesome-FinLLMs) - Curated list of financial LLM papers, models, and datasets.

## Contributing

Contributions are welcome. Read the [contribution guidelines](CONTRIBUTING.md) first. Changes are tracked in the [changelog](CHANGELOG.md).

## Footnotes

For research and education only. Not investment advice.

Published under [CC0 1.0 Universal](LICENSE).

Maintained by [Ao Wang](https://aowang.ai).
