// Bilingual guide copy for category notes, project pages, and comparisons.
// Star counts, licenses, and commit dates are NOT stored here. The generator
// fills them from site/data/repo-facts.json (GitHub API, 2026-10-22).

export const CATEGORIES = [
  {
    slug: 'data-and-tools',
    num: 1,
    chapterSlug: '1-data-and-tools',
    title: { en: 'Data and Tools', zh: '数据与工具' },
    description: {
      en: 'Reading note for chapter 1: market and filing data, MCP servers, official broker kits, and skill packs.',
      zh: '第 1 章导读：行情与披露数据、MCP 服务器、官方券商工具包和 Skills。',
    },
    summary: {
      en: 'Chapter 1 is the tool layer. It lists market and filing data, MCP servers, official broker and exchange kits, and skill packs. The chapter question is how an agent gets trustworthy, timestamped data.',
      zh: '第 1 章是工具层，收录行情与披露数据、MCP 服务器、官方券商与交易所工具包，以及 Skills 包。这一章要回答的是：agent 怎样拿到可信、带时间戳的数据。',
    },
    who: {
      en: 'For someone wiring sources and tools an agent can call, before choosing a research or trading framework.',
      zh: '适合先接数据和工具、再选投研或交易框架的人。',
    },
    subsections: {
      en: ['Platforms and market data', 'MCP servers', 'Official broker and exchange agent kits', 'Skills packs'],
      zh: ['平台与行情数据', 'MCP 服务器', '官方券商与交易所 agent 工具包', 'Skills 包'],
    },
    projects: ['openbb', 'akshare'],
    compares: [],
  },
  {
    slug: 'investment-research',
    num: 2,
    chapterSlug: '2-investment-research-and-deep-research',
    title: { en: 'Investment Research', zh: '投研与深度研究' },
    description: {
      en: 'Reading note for chapter 2: research agents and self-hosted workbenches that turn filings and news into memos.',
      zh: '第 2 章导读：把财报和新闻写成备忘录的投研 agent，以及自托管工作台。',
    },
    summary: {
      en: 'Chapter 2 lists agents that read filings, transcripts, news, and data rooms and write source-backed memos, plus self-hosted research workbenches. The chapter question is how a memo stays tied to its sources.',
      zh: '第 2 章收录阅读财报、电话会、新闻和资料室并写出可溯源备忘录的 agent，以及自托管投研工作台。这一章要回答的是备忘录怎样和出处绑在一起。',
    },
    who: {
      en: 'For someone building or reading a research agent, as distinct from a model checkpoint or an order router.',
      zh: '适合在做或在读投研 agent 的人，和模型权重、下单路由不是同一件事。',
    },
    subsections: {
      en: ['Open-source research agents', 'Self-hosted research workbenches and terminals'],
      zh: ['开源投研 agent', '自托管投研工作台与终端'],
    },
    projects: ['dexter', 'finrobot'],
    compares: ['financial-research-agents'],
  },
  {
    slug: 'multi-agent-decisions',
    num: 3,
    chapterSlug: '3-multi-agent-research-and-decision-systems',
    title: { en: 'Multi-Agent Decisions', zh: '多 agent 决策' },
    description: {
      en: 'Reading note for chapter 3: multi-agent desks that debate and hand off a decision.',
      zh: '第 3 章导读：用辩论和交接做决策的多 agent 系统。',
    },
    summary: {
      en: 'Chapter 3 lists systems that split work across specialist agents. The chapter text says they are useful for studying role structure, not as out-of-the-box alpha.',
      zh: '第 3 章收录把工作拆给专长 agent 的系统。章节原文写的是：适合研究角色结构，而不是开箱即用的 alpha。',
    },
    who: {
      en: 'For someone reading how an analyst desk can be split into roles, prompts, and a handoff.',
      zh: '适合阅读分析师团队如何被拆成角色、提示词和交接的人。',
    },
    subsections: {
      en: ['Flagship multi-agent systems'],
      zh: ['代表性多 agent 系统'],
    },
    projects: ['tradingagents', 'ai-hedge-fund'],
    compares: ['fingpt-vs-tradingagents', 'open-source-trading-agents'],
  },
  {
    slug: 'trading-and-portfolio',
    num: 4,
    chapterSlug: '4-trading-execution-and-portfolio-management',
    title: { en: 'Trading and Portfolio', zh: '交易与组合' },
    description: {
      en: 'Reading note for chapter 4: from a signal to a sized order, plus prediction markets and broker bridges.',
      zh: '第 4 章导读：从信号到带仓位的订单，以及预测市场和券商桥。',
    },
    summary: {
      en: 'Chapter 4 covers the path from a signal to a sized, risk-checked order: LLM trading agents, prediction-market agents, and the broker or exchange bridges underneath them.',
      zh: '第 4 章写的是从信号到带仓位、经过风险检查的订单：LLM 交易 agent、预测市场 agent，以及底下的券商或交易所桥。',
    },
    who: {
      en: 'For someone separating a decision agent from the process that can actually send an order.',
      zh: '适合把“做决策的 agent”和“真能发单的路径”分开看的人。',
    },
    subsections: {
      en: ['LLM trading agents', 'Prediction-market agents', 'Broker bridges and execution substrates'],
      zh: ['LLM 交易 agent', '预测市场 agent', '券商桥与执行底座'],
    },
    projects: ['nofx', 'finrl-trading'],
    compares: ['open-source-trading-agents'],
  },
  {
    slug: 'quant-automation',
    num: 5,
    chapterSlug: '5-quantitative-research-automation',
    title: { en: 'Quant Automation', zh: '量化研究自动化' },
    description: {
      en: 'Reading note for chapter 5: agents that mine factors, write strategy code, and iterate backtests.',
      zh: '第 5 章导读：挖因子、写策略代码并迭代回测的 agent。',
    },
    summary: {
      en: 'Chapter 5 lists agent loops that mine factors, write strategy code, run backtests, and iterate. The chapter question is how that loop stays honest about overfitting.',
      zh: '第 5 章收录挖因子、写策略代码、跑回测并迭代的 agent 循环。这一章要回答的是循环怎样面对过拟合。',
    },
    who: {
      en: 'For someone automating a research loop on top of a quant platform, not for a single trading signal.',
      zh: '适合在量化平台上自动化研究循环的人，不是在找一条交易信号。',
    },
    subsections: {
      en: ['Research automation systems'],
      zh: ['研究自动化系统'],
    },
    projects: ['qlib', 'rd-agent'],
    compares: [],
  },
  {
    slug: 'accounting',
    num: 6,
    chapterSlug: '6-finance-operations-and-accounting',
    title: { en: 'Accounting', zh: '财务与会计' },
    description: {
      en: 'Reading note for chapter 6: ledgers, tax and invoicing, and accounting-system MCP servers.',
      zh: '第 6 章导读：账本、税务与发票，以及会计系统的 MCP。',
    },
    summary: {
      en: 'Chapter 6 lists bookkeeping, reconciliation, invoices, tax, and MCP access to accounting systems. The chapter question is how an agent reports without rewriting history.',
      zh: '第 6 章收录记账、对账、发票、税务，以及接入会计系统的 MCP。这一章要回答的是 agent 怎样出报表而不改写历史。',
    },
    who: {
      en: 'For someone connecting an agent to a ledger or an accounting API, with posting still approval-gated.',
      zh: '适合把 agent 接到账本或会计 API、过账仍要审批的人。',
    },
    subsections: {
      en: ['Ledgers and agent accountants', 'Tax, invoicing, and payables', 'Accounting-system MCP servers'],
      zh: ['账本与会计 agent', '税务、发票与应付', '会计系统 MCP'],
    },
    projects: ['beancount'],
    compares: [],
  },
  {
    slug: 'risk-and-compliance',
    num: 7,
    chapterSlug: '7-risk-compliance-and-audit',
    title: { en: 'Risk and Compliance', zh: '风控与合规' },
    description: {
      en: 'Reading note for chapter 7: AML/KYC, due diligence, and firewalls in front of irreversible actions.',
      zh: '第 7 章导读：AML/KYC、尽调，以及挡在不可逆动作前面的防火墙。',
    },
    summary: {
      en: 'Chapter 7 lists AML/KYC, fraud triage, due diligence, ESG review, and action firewalls that sit in front of irreversible tool calls. The chapter question is how those actions stay gated.',
      zh: '第 7 章收录 AML/KYC、反欺诈分诊、尽调、ESG 审查，以及挡在不可逆工具调用前面的 action firewall。这一章要回答的是这些动作怎样被拦住。',
    },
    who: {
      en: 'For someone designing a gate in front of an order, a payment, or a ledger write.',
      zh: '适合在下单、支付或写账前面设计闸门的人。',
    },
    subsections: {
      en: ['Due diligence, AML/KYC, and firewalls'],
      zh: ['尽调、AML/KYC 与防火墙'],
    },
    projects: [],
    compares: [],
  },
  {
    slug: 'personal-finance',
    num: 8,
    chapterSlug: '8-personal-finance',
    title: { en: 'Personal Finance', zh: '个人理财' },
    description: {
      en: 'Reading note for chapter 8: local-first budgets and the bridges agents use to read them.',
      zh: '第 8 章导读：本地优先的预算应用，以及 agent 用来读取它们的桥。',
    },
    summary: {
      en: 'Chapter 8 lists budgeting and net-worth apps, mostly local-first, and the MCP or skill bridges an agent can use to read them. The chapter question is how that access stays on the reader’s machine.',
      zh: '第 8 章收录预算和净资产应用，多数是本地优先，以及 agent 用来读取它们的 MCP 或 Skills 桥。这一章要回答的是访问怎样留在读者自己的机器上。',
    },
    who: {
      en: 'For someone connecting an assistant to a personal budget without putting bank secrets in a prompt.',
      zh: '适合把助手接到个人预算、又不把银行密钥放进提示词的人。',
    },
    subsections: {
      en: ['Apps and MCP bridges'],
      zh: ['应用与 MCP 桥'],
    },
    projects: ['actual'],
    compares: [],
  },
  {
    slug: 'evaluation',
    num: 9,
    chapterSlug: '9-evaluation-benchmarks-and-arenas',
    title: { en: 'Evaluation and Arenas', zh: '评测与竞技场' },
    description: {
      en: 'Reading note for chapter 9: benchmarks, live arenas, and public track records for finance agents.',
      zh: '第 9 章导读：金融 agent 的基准、实盘竞技场和公开战绩。',
    },
    summary: {
      en: 'Chapter 9 lists research QA benchmarks, decision and trading benchmarks, live arenas, public track records, and trustworthiness suites. The chapter question is how to measure research, decisions, safety, and live skill.',
      zh: '第 9 章收录研究问答基准、决策与交易基准、实盘竞技场、公开战绩和可信度套件。这一章要回答的是怎样衡量研究、决策、安全性和实盘能力。',
    },
    who: {
      en: 'For someone who needs a published task, tool policy, and scoring rule before trusting a demo.',
      zh: '适合在相信一个演示之前，先要公开任务、工具策略和评分规则的人。',
    },
    subsections: {
      en: ['Research and open-book QA', 'Decision and trading benchmarks', 'Live arenas and public track records', 'Safety and trustworthiness'],
      zh: ['研究与开卷问答', '决策与交易基准', '实盘竞技场与公开战绩', '安全与可信'],
    },
    projects: [],
    compares: [],
  },
  {
    slug: 'backtesting',
    num: 10,
    chapterSlug: '10-backtesting-replay-and-leakage-control',
    title: { en: 'Backtesting and Leakage', zh: '回测与防泄漏' },
    description: {
      en: 'Reading note for chapter 10: point-in-time data, replay, and look-ahead control for agent loops.',
      zh: '第 10 章导读：时点数据、回放，以及 agent 循环里的前视控制。',
    },
    summary: {
      en: 'Chapter 10 is the market-time layer: point-in-time data, look-ahead control, deterministic replay, and cost models. The chapter question is how an agent loop stays inside the clock.',
      zh: '第 10 章是市场时间这一层：时点数据、前视控制、确定性回放和成本模型。这一章要回答的是 agent 循环怎样待在时钟里面。',
    },
    who: {
      en: 'For someone checking whether a backtest can see the future, before reading a PnL screenshot.',
      zh: '适合在看收益截图之前，先检查回测能不能看到未来的人。',
    },
    subsections: {
      en: ['Harnesses and engines'],
      zh: ['Harness 与引擎'],
    },
    projects: ['nautilus-trader'],
    compares: [],
  },
]

export const PROJECTS = [
  {
    slug: 'openbb',
    repo: 'openbq-org/OpenBB',
    name: 'OpenBB',
    chapter: 1,
    description: {
      en: 'What the OpenBB repository is, which directories it ships, and the GitHub facts recorded on 2026-10-22.',
      zh: 'OpenBB 仓库是什么、根目录有哪些部分，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The GitHub description calls OpenBB an open data platform for analysts, quants, and AI agents. The repository root contains `openbb_platform`, `cli`, and `desktop`. This list files it in chapter 1 as a data platform across equities, options, crypto, and macro. No dependency manifest was read at the repository root on the fetch date.',
      zh: 'GitHub 简介把 OpenBB 写成面向分析师、量化和 AI agent 的开放数据平台。仓库根目录有 `openbb_platform`、`cli` 和 `desktop`。本清单把它放在第 1 章，作为覆盖股票、期权、加密和宏观的数据平台。抓取当日没有在仓库根目录读到依赖清单。',
    },
    who: {
      en: 'For people putting a shared data layer under a research or trading agent. It is not, by this repository’s description, a trading bot.',
      zh: '适合要在投研或交易 agent 下面放一层共享数据的人。按这个仓库的简介，它不是交易机器人。',
    },
    related: ['akshare'],
  },
  {
    slug: 'akshare',
    repo: 'akfamily/akshare',
    name: 'AKShare',
    chapter: 1,
    description: {
      en: 'What the AKShare Python data library covers, and the GitHub facts recorded on 2026-10-22.',
      zh: 'AKShare 这个 Python 数据库覆盖什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'AKShare is a Python financial-data interface library. `pyproject.toml` sets `requires-python` to `>=3.11` and depends on packages such as `pandas`, `requests`, `beautifulsoup4`, and `lxml`. This list marks it as a China A-share and multi-market toolkit often used as an agent data backend.',
      zh: 'AKShare 是一个 Python 金融数据接口库。`pyproject.toml` 把 `requires-python` 设为 `>=3.11`，依赖包括 `pandas`、`requests`、`beautifulsoup4` 和 `lxml`。本清单把它标成 A 股与多市场工具包，常被当作 agent 的数据后端。',
    },
    who: {
      en: 'For notebooks and agents that need Chinese-market and multi-market series through a Python API.',
      zh: '适合用 Python API 取 A 股和多市场序列的笔记本和 agent。',
    },
    related: ['openbb'],
  },
  {
    slug: 'dexter',
    repo: 'virattt/dexter',
    name: 'Dexter',
    chapter: 2,
    description: {
      en: 'What the Dexter research agent repository contains, and the GitHub facts recorded on 2026-10-22.',
      zh: 'Dexter 投研 agent 仓库里有什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The README describes Dexter as an autonomous financial research agent that plans tasks, reflects, and uses market data. `package.json` names the package `dexter-ts` and its start script is `bun run`. Dependencies include `@langchain/core`, provider packages for Anthropic, OpenAI, Google, and Ollama, plus `better-sqlite3` and `playwright`. This list files it as a deep research agent with tool use and structured reports.',
      zh: 'README 把 Dexter 写成会做任务规划、自我反思并使用市场数据的自主金融研究 agent。`package.json` 里的包名是 `dexter-ts`，启动脚本是 `bun run`。依赖包括 `@langchain/core`，以及 Anthropic、OpenAI、Google、Ollama 的 provider 包，还有 `better-sqlite3` 和 `playwright`。本清单把它写成带工具调用和结构化报告的深度研究 agent。',
    },
    who: {
      en: 'For people reading a TypeScript research agent that calls tools and writes a report. The repository does not describe a hosted product.',
      zh: '适合阅读一个用 TypeScript 写的、会调工具并写报告的投研 agent。仓库没有把它写成托管产品。',
    },
    related: ['finrobot'],
  },
  {
    slug: 'finrobot',
    repo: 'AI4Finance-Foundation/FinRobot',
    name: 'FinRobot',
    chapter: 2,
    description: {
      en: 'What the FinRobot agent platform repository contains, and the GitHub facts recorded on 2026-10-22.',
      zh: 'FinRobot agent 平台仓库里有什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The README calls FinRobot an open-source AI agent platform for financial applications using large language models. It says the `finrobot_autogen/` tree is the original AutoGen codebase behind the whitepaper and marks that tree as educational. The same README describes a later stack with a Python backend and a React/Tauri desktop, and says valuation numbers are produced by Python operators rather than by the model. GitHub reports Python, Jupyter Notebook, TypeScript, and Rust among the languages. The repository root also contains `finrobot_desktop` and `finrobot_equity`. This list files it as AI4Finance’s agent platform.',
      zh: 'README 把 FinRobot 写成使用大语言模型的开源金融 AI agent 平台。它写明 `finrobot_autogen/` 是白皮书背后的 AutoGen 代码，并标明这一支是教学用途。同一份 README 还描述了后来的 Python 后端和 React/Tauri 桌面，并写明估值数字由 Python 算子产生，而不是由模型口算。GitHub 报告的语言包括 Python、Jupyter Notebook、TypeScript 和 Rust。仓库根目录还有 `finrobot_desktop` 和 `finrobot_equity`。本清单把它写成 AI4Finance 的 agent 平台。',
    },
    who: {
      en: 'For people comparing an agent platform (tools, compute, report writing) with a single financial model. The model line from the same organization is FinGPT.',
      zh: '适合拿 agent 平台（工具、计算、写报告）和单个金融模型对照着看的人。同一组织的模型线是 FinGPT。',
    },
    related: ['fingpt', 'dexter'],
  },
  {
    slug: 'tradingagents',
    repo: 'TauricResearch/TradingAgents',
    name: 'TradingAgents',
    chapter: 3,
    description: {
      en: 'What the TradingAgents multi-agent framework contains, and the GitHub facts recorded on 2026-10-22.',
      zh: 'TradingAgents 多 agent 框架里有什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The GitHub description is “TradingAgents: Multi-Agents LLM Financial Trading Framework.” `pyproject.toml` depends on `langgraph`, `langchain-core`, and LangChain provider packages for OpenAI, Anthropic, and Google, plus `yfinance` and `stockstats`. The GitHub homepage field points at an arXiv PDF. This list files it as a multi-agent framework with analyst, trader, and risk roles.',
      zh: 'GitHub 简介是 “TradingAgents: Multi-Agents LLM Financial Trading Framework.” `pyproject.toml` 依赖 `langgraph`、`langchain-core`，以及 OpenAI、Anthropic、Google 的 LangChain provider 包，还有 `yfinance` 和 `stockstats`。GitHub 主页字段指向一篇 arXiv PDF。本清单把它写成带分析师、交易员和风控角色的多 agent 框架。',
    },
    who: {
      en: 'For people reading how a trading desk can be split into LLM roles and a graph, before any live order path.',
      zh: '适合在接实盘下单之前，先阅读交易台怎样被拆成 LLM 角色和图的人。',
    },
    related: ['ai-hedge-fund', 'fingpt'],
  },
  {
    slug: 'ai-hedge-fund',
    repo: 'virattt/ai-hedge-fund',
    name: 'ai-hedge-fund',
    chapter: 3,
    description: {
      en: 'What the ai-hedge-fund simulation contains, and the GitHub facts recorded on 2026-10-22.',
      zh: 'ai-hedge-fund 模拟仓库里有什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The README calls this a proof of concept for an AI-powered hedge fund and states that the system does not actually make any trades. `pyproject.toml` depends on `langchain-openai`, `langchain-anthropic`, `langchain-deepseek`, `langchain-google-genai`, `langchain-xai`, and `textual`. This list files it as a simulation with specialized investing agents.',
      zh: 'README 把它写成 AI 对冲基金的概念验证，并写明系统实际上不下单。`pyproject.toml` 依赖 `langchain-openai`、`langchain-anthropic`、`langchain-deepseek`、`langchain-google-genai`、`langchain-xai` 和 `textual`。本清单把它写成由专长投资 agent 组成的模拟。',
    },
    who: {
      en: 'For people studying investor-persona agents in a simulation. The README says the project is educational and does not place trades.',
      zh: '适合在模拟里研究投资人角色 agent 的人。README 写明项目用于学习，并不下单。',
    },
    related: ['tradingagents', 'dexter'],
  },
  {
    slug: 'nofx',
    repo: 'NoFxAiOS/nofx',
    name: 'nofx',
    chapter: 4,
    description: {
      en: 'What the nofx trading terminal repository contains, and the GitHub facts recorded on 2026-10-22.',
      zh: 'nofx 交易终端仓库里有什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The GitHub description calls nofx an AI trading terminal assistant for US stocks, commodities, forex, and crypto. GitHub’s primary language is Go; TypeScript is the next language by bytes. `go.mod` declares `go 1.26.10` and requires Gin plus exchange clients for Binance, Bybit, and Hyperliquid, and a Postgres driver. The README says a source build uses the Go version in `go.mod` and Node.js 24 for the frontend. This list marks the project sim/live.',
      zh: 'GitHub 简介把 nofx 写成面向美股、商品、外汇和加密的 AI 交易终端助手。GitHub 的主要语言是 Go，按字节数其次是 TypeScript。`go.mod` 声明 `go 1.26.10`，并引用 Gin，以及 Binance、Bybit、Hyperliquid 的交易所客户端和一个 Postgres 驱动。README 写明源码构建使用 `go.mod` 里的 Go 版本，前端使用 Node.js 24。本清单把它标成可模拟/可实盘。',
    },
    who: {
      en: 'For people who want a self-hosted trading terminal with exchange connectors and can accept the AGPL-3.0 terms reported by GitHub.',
      zh: '适合要自托管交易终端、需要交易所连接，并且接受 GitHub 报告的 AGPL-3.0 条款的人。',
    },
    related: ['finrl-trading', 'tradingagents'],
  },
  {
    slug: 'finrl-trading',
    repo: 'AI4Finance-Foundation/FinRL-Trading',
    name: 'FinRL-Trading',
    chapter: 4,
    description: {
      en: 'What the FinRL-Trading (FinRL-X) repository contains, and the GitHub facts recorded on 2026-10-22.',
      zh: 'FinRL-Trading（FinRL-X）仓库里有什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The README titles the project FinRL-X and describes it as modular infrastructure for quantitative trading that unifies data processing, strategy composition, backtesting, and broker execution through a weight-centric interface. It links a paper at `arxiv.org/abs/2603.21330`. `requirements.txt` includes `torch`, `lightgbm`, `xgboost`, `yfinance`, `alpaca-py`, `openai`, and `streamlit`. This list files it as that FinRL-X stack.',
      zh: 'README 把项目称为 FinRL-X，并写成以权重为中心的接口，把数据处理、策略组合、回测和券商执行放在一起的量化交易基础设施。它链接了论文 `arxiv.org/abs/2603.21330`。`requirements.txt` 包含 `torch`、`lightgbm`、`xgboost`、`yfinance`、`alpaca-py`、`openai` 和 `streamlit`。本清单按这个 FinRL-X 技术栈收录它。',
    },
    who: {
      en: 'For people moving from the original FinRL tutorials to the modular stack. The FinRL README points at this repository for the newer architecture.',
      zh: '适合从最初的 FinRL 教程迁到模块化技术栈的人。FinRL 的 README 把较新的架构指向这个仓库。',
    },
    related: ['finrl', 'qlib'],
  },
  {
    slug: 'qlib',
    repo: 'microsoft/qlib',
    name: 'Qlib',
    chapter: 5,
    description: {
      en: 'What the Qlib quant platform is, and the GitHub facts recorded on 2026-10-22.',
      zh: 'Qlib 量化平台是什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The README describes Qlib as an AI-oriented quantitative investment platform, from exploring ideas to production, with supervised learning, market-dynamics modeling, and reinforcement learning. It points at RD-Agent for an automated R&D loop. `pyproject.toml` depends on `pandas`, `lightgbm`, `mlflow`, `gym`, and `cvxpy`, among others. This list files Qlib as a substrate for factor and model research agents.',
      zh: 'README 把 Qlib 写成面向 AI 的量化投资平台，从想法到生产，支持监督学习、市场动态建模和强化学习。它把自动化研发循环指向 RD-Agent。`pyproject.toml` 的依赖包括 `pandas`、`lightgbm`、`mlflow`、`gym` 和 `cvxpy`。本清单把 Qlib 写成因子和模型研究 agent 的底座。',
    },
    who: {
      en: 'For people running factor or model research on a quant platform, including an agent loop that drives Qlib rather than replacing it.',
      zh: '适合在量化平台上做因子或模型研究的人，包括驱动 Qlib 而不是替换它的 agent 循环。',
    },
    related: ['rd-agent'],
  },
  {
    slug: 'rd-agent',
    repo: 'microsoft/RD-Agent',
    name: 'RD-Agent',
    chapter: 5,
    description: {
      en: 'What the RD-Agent research loop covers in quant scenarios, and the GitHub facts recorded on 2026-10-22.',
      zh: 'RD-Agent 的研究循环在量化场景里覆盖什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The GitHub description says RD-Agent automates data and model R&D. The README describes a quant scenario that proposes and implements factors and models on Qlib, and shows the commands `rdagent fin_factor` and `rdagent fin_model`. `requirements.txt` includes `langchain`, `openai`, `litellm`, and `docker`. This list files it as Microsoft’s R&D agent with a finance factor and strategy track. Performance figures printed in that README are not repeated here.',
      zh: 'GitHub 简介写 RD-Agent 用来自动化数据和模型研发。README 描述了在 Qlib 上提出并实现因子和模型的量化场景，并给出命令 `rdagent fin_factor` 和 `rdagent fin_model`。`requirements.txt` 包含 `langchain`、`openai`、`litellm` 和 `docker`。本清单把它写成微软的研发 agent，带金融因子和策略一条线。那份 README 里的业绩数字这里不转述。',
    },
    who: {
      en: 'For people automating a propose-code-run loop on top of a platform such as Qlib.',
      zh: '适合在 Qlib 这类平台上自动化“提出、写代码、跑”循环的人。',
    },
    related: ['qlib'],
  },
  {
    slug: 'beancount',
    repo: 'beancount/beancount',
    name: 'Beancount',
    chapter: 6,
    description: {
      en: 'What the Beancount ledger is, and the GitHub facts recorded on 2026-10-22.',
      zh: 'Beancount 账本是什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The README describes a double-entry bookkeeping language: transactions in a text file, loaded into memory, with reports and a web interface. `pyproject.toml` depends on `click`, `python-dateutil`, and `regex`. GitHub also reports C and HTML besides Python. This list files Beancount as a plaintext ledger that bookkeeping agents often target. It is not itself an LLM agent.',
      zh: 'README 把它写成复式记账语言：交易记在文本文件里，读入内存，再生成报表并提供网页界面。`pyproject.toml` 依赖 `click`、`python-dateutil` 和 `regex`。除了 Python，GitHub 还报告了 C 和 HTML。本清单把 Beancount 写成记账 agent 经常对接的纯文本账本。它本身不是 LLM agent。',
    },
    who: {
      en: 'For people who want a text ledger an agent can read and propose entries against, with a human still posting.',
      zh: '适合要一个文本账本、让 agent 阅读并提出分录、过账仍由人来做的人。',
    },
    related: [],
  },
  {
    slug: 'actual',
    repo: 'actualbudget/actual',
    name: 'Actual',
    chapter: 8,
    description: {
      en: 'What the Actual budget app is, and the GitHub facts recorded on 2026-10-22.',
      zh: 'Actual 预算应用是什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The README calls Actual a local-first personal finance tool, written in Node.js, with sync across devices. The root `package.json` is a workspace over `packages/*`, and its scripts name browser, sync-server, and Electron targets. GitHub’s primary language is TypeScript; Swift is also reported. This list files it as a local-first app and a common surface for agents. It is not itself an LLM agent.',
      zh: 'README 把 Actual 写成用 Node.js 编写的本地优先个人理财工具，可以在设备之间同步。根目录 `package.json` 是 `packages/*` 的 workspace，脚本里有浏览器、sync-server 和 Electron 目标。GitHub 的主要语言是 TypeScript，同时也报告了 Swift。本清单把它写成本地优先应用，以及 agent 常见的对接面。它本身不是 LLM agent。',
    },
    who: {
      en: 'For people connecting an assistant to a local budget, usually through a read or approval-gated bridge.',
      zh: '适合把助手接到本地预算上的人，通常经由只读或需要确认的桥。',
    },
    related: ['beancount'],
  },
  {
    slug: 'fingpt',
    repo: 'AI4Finance-Foundation/FinGPT',
    name: 'FinGPT',
    chapter: 'appendix',
    description: {
      en: 'What the FinGPT financial-LLM repository contains, and the GitHub facts recorded on 2026-10-22.',
      zh: 'FinGPT 金融大模型仓库里有什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The README title is “FinGPT: Open-Source Financial Large Language Models.” The GitHub description says trained models are released on Hugging Face. `requirements.txt` includes `transformers`, `peft`, `torch`, `datasets`, `accelerate`, `bitsandbytes`, and `tushare`. GitHub’s primary language is Jupyter Notebook, followed by Python. This list files FinGPT in the appendix as a financial LLM line, not as a trading agent.',
      zh: 'README 标题是 “FinGPT: Open-Source Financial Large Language Models.” GitHub 简介写明训练好的模型发布在 Hugging Face。`requirements.txt` 包含 `transformers`、`peft`、`torch`、`datasets`、`accelerate`、`bitsandbytes` 和 `tushare`。GitHub 的主要语言是 Jupyter Notebook，其次是 Python。本清单把 FinGPT 放在附录，作为金融大模型系列，而不是交易 agent。',
    },
    who: {
      en: 'For people fine-tuning or reading a financial language-model codebase. The repository does not describe a multi-agent desk or an order router.',
      zh: '适合微调或阅读金融语言模型代码的人。这个仓库没有描述多 agent 交易台或下单路由。',
    },
    related: ['finrobot', 'finrl', 'tradingagents'],
  },
  {
    slug: 'finrl',
    repo: 'AI4Finance-Foundation/FinRL',
    name: 'FinRL',
    chapter: 'appendix',
    description: {
      en: 'What the FinRL reinforcement-learning repository contains, and the GitHub facts recorded on 2026-10-22.',
      zh: 'FinRL 强化学习仓库里有什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The README heading is “FinRL: Financial Reinforcement Learning → FinRL-X.” It says this repository keeps the original end-to-end educational framework, and points at FinRL-Trading for the newer modular stack. `pyproject.toml` depends on `stable-baselines3`, `ray`, `ccxt`, `alpaca-py`, and `yfinance`. `requirements.txt` also lists `gymnasium`. GitHub’s primary language is Jupyter Notebook. This list files it in the appendix as a financial reinforcement-learning library and tutorials.',
      zh: 'README 标题是 “FinRL: Financial Reinforcement Learning → FinRL-X.” 它写明这个仓库保留最初的端到端教学框架，并把较新的模块化技术栈指向 FinRL-Trading。`pyproject.toml` 依赖 `stable-baselines3`、`ray`、`ccxt`、`alpaca-py` 和 `yfinance`。`requirements.txt` 里还有 `gymnasium`。GitHub 的主要语言是 Jupyter Notebook。本清单把它放在附录，作为金融强化学习库和教程。',
    },
    who: {
      en: 'For people learning a deep-RL trading pipeline from tutorials and notebooks. For the later architecture, see FinRL-Trading.',
      zh: '适合用教程和笔记本学习深度强化学习交易流程的人。较新的架构见 FinRL-Trading。',
    },
    related: ['finrl-trading', 'fingpt'],
  },
  {
    slug: 'nautilus-trader',
    repo: 'nautechsystems/nautilus_trader',
    name: 'NautilusTrader',
    chapter: 10,
    description: {
      en: 'What the NautilusTrader engine is, and the GitHub facts recorded on 2026-10-22.',
      zh: 'NautilusTrader 引擎是什么，以及 2026-10-22 记录的 GitHub 事实。',
    },
    what: {
      en: 'The README describes a Rust-native, event-driven trading engine, with Python as the control plane through PyO3 and async networking through tokio. `Cargo.toml` is a workspace. Members named near the top of that file include `crates/core`, `crates/backtest`, and adapters such as `binance`, `okx`, `hyperliquid`, `interactive_brokers`, and `polymarket`. This list files it in chapter 10 as a deterministic engine an agent can use as an execution substrate. It is not an LLM agent.',
      zh: 'README 把它写成 Rust 原生的事件驱动交易引擎，Python 通过 PyO3 做控制面，异步网络使用 tokio。`Cargo.toml` 是一个 workspace。文件前部列出的成员包括 `crates/core`、`crates/backtest`，以及 `binance`、`okx`、`hyperliquid`、`interactive_brokers`、`polymarket` 等适配器。本清单把它放在第 10 章，作为 agent 可以使用的确定性执行底座。它不是 LLM agent。',
    },
    who: {
      en: 'For people who want one event-driven engine for research and live trading and will bring their own strategy or agent logic.',
      zh: '适合要同一套事件驱动引擎做研究和实盘、策略或 agent 逻辑自己带的人。',
    },
    related: ['finrl-trading'],
  },
]

const tradingNotes = {
  'TauricResearch/TradingAgents': {
    en: 'Multi-agent trading framework. `pyproject.toml` depends on LangGraph and LangChain provider packages. A project page records the rest.',
    zh: '多 agent 交易框架。`pyproject.toml` 依赖 LangGraph 和 LangChain 的 provider 包。其余事实在项目页。',
  },
  'virattt/ai-hedge-fund': {
    en: 'The README calls it an AI hedge-fund proof of concept and says the system does not place trades. Dependencies are LangChain provider packages and a Textual UI.',
    zh: 'README 把它写成 AI 对冲基金的概念验证，并写明系统不下单。依赖是 LangChain 的 provider 包和 Textual 界面。',
  },
  'HKUDS/Vibe-Trading': {
    en: 'The README title is “Vibe-Trading: Your Personal Trading Agent.” `pyproject.toml` depends on `langchain` and `langgraph`. This list marks it sim.',
    zh: 'README 标题是 “Vibe-Trading: Your Personal Trading Agent.” `pyproject.toml` 依赖 `langchain` 和 `langgraph`。本清单把它标成模拟盘。',
  },
  'hsliuping/TradingAgents-CN': {
    en: 'The GitHub description calls it a Chinese-enhanced TradingAgents framework. `pyproject.toml` depends on FastAPI, MongoDB, and Redis; `requirements.txt` includes LangGraph, AKShare, Tushare, and Baostock. The license is hybrid; see the note under the table.',
    zh: 'GitHub 简介把它写成 TradingAgents 的中文增强框架。`pyproject.toml` 依赖 FastAPI、MongoDB 和 Redis；`requirements.txt` 包含 LangGraph、AKShare、Tushare 和 Baostock。许可证是混合授权，见表下说明。',
  },
  'HKUDS/AI-Trader': {
    en: 'The README calls it an agent-native trading platform. `service/requirements.txt` includes FastAPI, uvicorn, and yfinance. No LICENSE file was detected. The last default-branch commit date is in the table.',
    zh: 'README 把它写成面向 agent 的交易平台。`service/requirements.txt` 包含 FastAPI、uvicorn 和 yfinance。未检测到 LICENSE 文件。默认分支最后一次提交的日期在表里。',
  },
  'NoFxAiOS/nofx': {
    en: 'Go and TypeScript trading terminal. `go.mod` declares `go 1.26.10` and exchange clients. GitHub reports AGPL-3.0. This list marks it sim/live. See the project page.',
    zh: 'Go 和 TypeScript 的交易终端。`go.mod` 声明 `go 1.26.10`，并有交易所客户端。GitHub 报告 AGPL-3.0。本清单把它标成可模拟/可实盘。见项目页。',
  },
  'ValueCell-ai/valuecell': {
    en: 'The GitHub description calls it a community-driven multi-agent platform for financial applications. This list uses the same framing. The default-branch commit date is in the table.',
    zh: 'GitHub 简介把它写成社区驱动的金融多 agent 平台。本清单用的是同一说法。默认分支的提交日期在表里。',
  },
  'TraderAlice/OpenAlice': {
    en: 'The README calls it an AI orchestrator for trading and a one-person desk. `package.json` depends on the Anthropic SDK, the OpenAI SDK, and `@modelcontextprotocol/sdk`. GitHub reports AGPL-3.0. This list marks it live.',
    zh: 'README 把它写成交易的 AI 编排器，以及一个人的交易台。`package.json` 依赖 Anthropic SDK、OpenAI SDK 和 `@modelcontextprotocol/sdk`。GitHub 报告 AGPL-3.0。本清单把它标成可实盘。',
  },
  'Drakkar-Software/OctoBot': {
    en: 'The README calls it an open-source crypto trading bot with a visual interface. This list adds that it has AI/LLM strategy modes alongside grid, DCA, and TradingView signals, and marks it sim/live. GitHub reports GPL-3.0.',
    zh: 'README 把它写成带图形界面的开源加密交易机器人。本清单补充它在网格、DCA 和 TradingView 信号之外还有 AI/LLM 策略模式，并标成可模拟/可实盘。GitHub 报告 GPL-3.0。',
  },
  'AI4Finance-Foundation/FinRL-Trading': {
    en: 'FinRL-X, the modular trading stack from AI4Finance. `requirements.txt` includes PyTorch, LightGBM, and alpaca-py. See the project page.',
    zh: 'FinRL-X，AI4Finance 的模块化交易技术栈。`requirements.txt` 包含 PyTorch、LightGBM 和 alpaca-py。见项目页。',
  },
  'freqtrade/freqtrade': {
    en: 'GitHub description: “Free, open source crypto trading bot.” This list files it as an execution backend agents often sit on, not as an LLM agent. GitHub reports GPL-3.0.',
    zh: 'GitHub 简介：“Free, open source crypto trading bot.” 本清单把它写成 agent 经常坐上去的执行后端，而不是 LLM agent。GitHub 报告 GPL-3.0。',
  },
  'hummingbot/hummingbot': {
    en: 'GitHub description: open-source software for creating and deploying high-frequency crypto trading bots. This list files it as a market-making and execution framework. GitHub reports Apache-2.0.',
    zh: 'GitHub 简介：用来创建和部署高频加密交易机器人的开源软件。本清单把它写成做市和执行框架。GitHub 报告 Apache-2.0。',
  },
  'nautechsystems/nautilus_trader': {
    en: 'Rust-native event-driven engine with a Python control plane. This list files it in chapter 10 as a substrate, not as an LLM agent. See the project page.',
    zh: 'Rust 原生的事件驱动引擎，Python 做控制面。本清单把它放在第 10 章，作为底座，而不是 LLM agent。见项目页。',
  },
}

const researchNotes = {
  'virattt/dexter': {
    en: 'TypeScript research agent. `package.json` depends on LangChain packages and runs with Bun. See the project page for the license wording.',
    zh: 'TypeScript 投研 agent。`package.json` 依赖 LangChain 包，并用 Bun 运行。许可证的表述见项目页。',
  },
  'AI4Finance-Foundation/FinRobot': {
    en: 'Agent platform. The README separates an educational AutoGen tree from a later Python and desktop stack. See the project page.',
    zh: 'Agent 平台。README 把教学用的 AutoGen 分支和后来的 Python 与桌面技术栈分开写。见项目页。',
  },
  'virattt/ai-financial-agent': {
    en: 'The README calls it a proof of concept for investment research and says it is not for real trading. `package.json` depends on the Vercel AI SDK packages `ai` and `@ai-sdk/openai`. The default-branch commit is 2025-08-19.',
    zh: 'README 把它写成投资研究的概念验证，并写明不用于真实交易。`package.json` 依赖 Vercel AI SDK 的 `ai` 和 `@ai-sdk/openai`。默认分支最后一次提交是 2025-08-19。',
  },
  'RUC-NLPIR/FinSight': {
    en: 'The README describes a multi-agent system that goes from data collection to a publication-ready report, and states Python 3.10+. GitHub’s primary language is Jupyter Notebook. GitHub reports GPL-3.0. The default-branch commit is 2026-02-13.',
    zh: 'README 把它写成从数据采集到可发表报告的多 agent 系统，并写明 Python 3.10+。GitHub 的主要语言是 Jupyter Notebook。GitHub 报告 GPL-3.0。默认分支最后一次提交是 2026-02-13。',
  },
  'Fincept-Corporation/FinceptTerminal': {
    en: 'This list files it as an open-source finance terminal with market analytics, built-in AI research agents, and broker or backtest hooks. GitHub’s primary language is C++. The LICENSE file is the AGPL-3.0 text; the API label is in the note under the table.',
    zh: '本清单把它写成开源金融终端，带市场分析、内置 AI 投研 agent，以及券商或回测接口。GitHub 的主要语言是 C++。LICENSE 文件是 AGPL-3.0 文本；API 的标注见表下说明。',
  },
  'ginlix-ai/LangAlpha': {
    en: 'This list’s line calls it a Claude Code style workbench for financial markets research. The GitHub description on the fetch date is “Claude Code for Financial Market.” The README headline on that date says “The harness for agentic trading” and describes research, a thesis, and brokerage orders inside permissions the user sets. `pyproject.toml` depends on LangChain and LangGraph. GitHub reports Apache-2.0.',
    zh: '本清单的条目把它写成面向金融市场研究的 Claude Code 式工作台。抓取当日的 GitHub 简介是 “Claude Code for Financial Market.” 当日 README 的标题是 “The harness for agentic trading”，并描述研究、论点和在用户设定的权限内向券商下单。`pyproject.toml` 依赖 LangChain 和 LangGraph。GitHub 报告 Apache-2.0。',
  },
}

export const COMPARISONS = [
  {
    slug: 'fingpt-vs-tradingagents',
    title: { en: 'FinGPT vs TradingAgents', zh: 'FinGPT vs TradingAgents' },
    description: {
      en: 'FinGPT is a financial LLM repository. TradingAgents is a multi-agent trading framework. Repository facts from the GitHub API on 2026-10-22.',
      zh: 'FinGPT 是金融大模型仓库，TradingAgents 是多 agent 交易框架。事实来自 2026-10-22 的 GitHub API。',
    },
    intro: {
      en: 'These repositories do different jobs. FinGPT is a financial language-model codebase. TradingAgents is a multi-agent trading framework. The figures below are GitHub API fields from 2026-10-22. This page does not score trading results.',
      zh: '这两个仓库做的不是同一件事。FinGPT 是金融语言模型的代码库。TradingAgents 是多 agent 交易框架。下面的数字是 2026-10-22 的 GitHub API 字段。这一页不给交易结果打分。',
    },
    groups: [
      {
        title: { en: 'Repository facts', zh: '仓库事实' },
        repos: ['AI4Finance-Foundation/FinGPT', 'TauricResearch/TradingAgents'],
        sort: false,
      },
    ],
    notes: {
      'AI4Finance-Foundation/FinGPT': {
        en: 'Financial LLM line: notebooks and Python, with `transformers` and `peft` in `requirements.txt`. Filed in the appendix, not in the trading chapters.',
        zh: '金融大模型系列：笔记本和 Python，`requirements.txt` 里有 `transformers` 和 `peft`。放在附录，不在交易章节。',
      },
      'TauricResearch/TradingAgents': {
        en: 'Multi-agent trading framework. `pyproject.toml` depends on LangGraph. Filed in chapter 3.',
        zh: '多 agent 交易框架。`pyproject.toml` 依赖 LangGraph。放在第 3 章。',
      },
    },
    after: {
      en: 'Read them for different reasons. FinGPT is for people working on a financial language model. TradingAgents is for people reading a role split (analyst, trader, risk) on a graph. Neither repository’s description says it is a substitute for the other. Project pages: [FinGPT](/projects/fingpt), [TradingAgents](/projects/tradingagents).',
      zh: '阅读的理由不一样。FinGPT 给要做金融语言模型的人。TradingAgents 给要读角色拆分（分析师、交易员、风控）和图编排的人。两个仓库的简介都没有说自己可以替换另一个。项目页：[FinGPT](/projects/fingpt)、[TradingAgents](/projects/tradingagents)。',
    },
  },
  {
    slug: 'open-source-trading-agents',
    title: {
      en: 'Best open-source trading agents',
      zh: 'Best open-source trading agents（开源交易 agent 对照）',
    },
    description: {
      en: 'Chapter 3 and 4 trading-agent repositories ordered by GitHub stars on 2026-10-22, plus the execution engines filed beside them.',
      zh: '第 3、4 章的交易 agent 仓库，按 2026-10-22 的 GitHub star 排列，并附上清单里写在旁边的执行引擎。',
    },
    intro: {
      en: 'The repositories in the first table are multi-agent or LLM trading entries from chapters 3 and 4. They are ordered by GitHub star count on 2026-10-22. Star count is a public attention figure. It is not profit, drawdown, or a code review. The second table is execution software this list files next to those agents, included so the two are not mixed together.',
      zh: '第一张表是第 3 章和第 4 章里的多 agent 或 LLM 交易条目，按 2026-10-22 的 GitHub star 数排列。Star 数是公开的关注度，不是收益、回撤，也不是代码评审。第二张表是本清单写在这些 agent 旁边的执行软件，放在这里是为了不把两类东西混在一起。',
    },
    groups: [
      {
        title: { en: 'Trading-agent repositories', zh: '交易 agent 仓库' },
        repos: [
          'TauricResearch/TradingAgents',
          'virattt/ai-hedge-fund',
          'HKUDS/Vibe-Trading',
          'hsliuping/TradingAgents-CN',
          'HKUDS/AI-Trader',
          'NoFxAiOS/nofx',
          'ValueCell-ai/valuecell',
          'TraderAlice/OpenAlice',
          'Drakkar-Software/OctoBot',
          'AI4Finance-Foundation/FinRL-Trading',
        ],
        sort: 'stars',
      },
      {
        title: { en: 'Execution engines filed beside them', zh: '写在旁边的执行引擎' },
        repos: ['freqtrade/freqtrade', 'hummingbot/hummingbot', 'nautechsystems/nautilus_trader'],
        sort: 'stars',
      },
    ],
    notes: tradingNotes,
    after: {
      en: 'Chapter lists, which are longer than this page: [chapter 3](/chapters/3-multi-agent-research-and-decision-systems), [chapter 4](/chapters/4-trading-execution-and-portfolio-management). Project pages exist for [TradingAgents](/projects/tradingagents), [ai-hedge-fund](/projects/ai-hedge-fund), [nofx](/projects/nofx), [FinRL-Trading](/projects/finrl-trading), and [NautilusTrader](/projects/nautilus-trader).',
      zh: '比这一页更全的章节列表：[第 3 章](/zh/chapters/3-multi-agent-research-and-decision-systems)、[第 4 章](/zh/chapters/4-trading-execution-and-portfolio-management)。已有项目页的是 [TradingAgents](/zh/projects/tradingagents)、[ai-hedge-fund](/zh/projects/ai-hedge-fund)、[nofx](/zh/projects/nofx)、[FinRL-Trading](/zh/projects/finrl-trading) 和 [NautilusTrader](/zh/projects/nautilus-trader)。',
    },
  },
  {
    slug: 'financial-research-agents',
    title: {
      en: 'Open-source financial research/report agents compared',
      zh: 'Open-source financial research/report agents compared（开源金融研究与报告 agent 对照）',
    },
    description: {
      en: 'Research and report agents from chapter 2, plus two workbenches, with GitHub facts from 2026-10-22.',
      zh: '第 2 章的研究与报告 agent，外加两个工作台，事实来自 2026-10-22 的 GitHub。',
    },
    intro: {
      en: 'The first table is four chapter 2 repositories whose listings are research or report agents: Dexter, FinRobot, ai-financial-agent, and FinSight. The second table is two workbenches from the same chapter, FinceptTerminal and LangAlpha. Each group is ordered by GitHub stars on 2026-10-22. Other chapter 2 entries stay on the chapter page. This is not a ranking of memo quality.',
      zh: '第一张表是第 2 章里条目本身写成研究或报告 agent 的四个仓库：Dexter、FinRobot、ai-financial-agent、FinSight。第二张表是同一章的两个工作台：FinceptTerminal 和 LangAlpha。每组按 2026-10-22 的 GitHub star 排列。第 2 章的其他条目仍在章节页上。这不是备忘录质量的排名。',
    },
    groups: [
      {
        title: { en: 'Research and report agents', zh: '研究与报告 agent' },
        repos: [
          'virattt/dexter',
          'AI4Finance-Foundation/FinRobot',
          'virattt/ai-financial-agent',
          'RUC-NLPIR/FinSight',
        ],
        sort: 'stars',
      },
      {
        title: { en: 'Workbenches from the same chapter', zh: '同一章里的工作台' },
        repos: ['Fincept-Corporation/FinceptTerminal', 'ginlix-ai/LangAlpha'],
        sort: 'stars',
      },
    ],
    notes: researchNotes,
    after: {
      en: 'The full chapter is [Investment Research](/chapters/2-investment-research-and-deep-research). Project pages: [Dexter](/projects/dexter), [FinRobot](/projects/finrobot). FinGPT is a model repository, compared separately on [FinGPT vs TradingAgents](/compare/fingpt-vs-tradingagents).',
      zh: '完整章节是[投研与深度研究](/zh/chapters/2-investment-research-and-deep-research)。项目页：[Dexter](/projects/dexter)、[FinRobot](/projects/finrobot)。FinGPT 是模型仓库，单独写在 [FinGPT vs TradingAgents](/zh/compare/fingpt-vs-tradingagents)。',
    },
  },
]
