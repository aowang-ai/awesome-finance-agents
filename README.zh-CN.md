# Awesome Finance Agents [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> 按金融职能组织的开源 LLM 金融 agent 精选：投研、交易、财务运营、风控合规、个人理财、评测与回测。

[English](README.md) | **简体中文**

本清单按**金融职能**组织。交易是其中一章；更完整的交易向目录见附录中的 LLMQuant/awesome-trading-agents。其余章节覆盖会计、合规、评测与回测/回放。

每章固定写：要解决的问题、开源实现、踩坑提示。正文不写星数，避免过时。🇨🇳 标记 A 股 / 中文项目；其他国旗标记特定地区的数据源（如 🇹🇷、🇰🇷）。`(sim)` / `(live)` / `(paper)` 在资料明确时标注模拟盘、实盘或论文代码。

## 目录

- [全景图](#全景图)
- [怎么用这份清单](#怎么用这份清单)
- [1. 数据与工具](#1-数据与工具)
- [2. 投研与深度研究](#2-投研与深度研究)
- [3. 多 agent 投研与决策系统](#3-多-agent-投研与决策系统)
- [4. 交易执行与组合管理](#4-交易执行与组合管理)
- [5. 量化研究自动化](#5-量化研究自动化)
- [6. 财务运营与会计](#6-财务运营与会计)
- [7. 风控、合规与审计](#7-风控、合规与审计)
- [8. 个人理财](#8-个人理财)
- [9. 评测基准与竞技场](#9-评测基准与竞技场)
- [10. 回测、回放与防泄漏](#10-回测、回放与防泄漏)
- [附录](#附录)

## 全景图

```mermaid
flowchart TB
    subgraph Tools["数据与工具"]
        C1["1 数据 / MCP / Skills"]
    end
    subgraph Jobs["金融职能"]
        C2["2 投研"]
        C3["3 多 agent 决策"]
        C4["4 交易与组合"]
        C5["5 量化自动化"]
        C6["6 会计"]
        C7["7 风控合规"]
        C8["8 个人理财"]
    end
    subgraph Trust["可靠性"]
        C9["9 评测与竞技场"]
        C10["10 回测 / 回放 / 防泄漏"]
    end
    C1 --> Jobs
    Jobs --> Trust
    Trust -. 反哺 .-> Jobs
```

| #  | 章节          | 核心问题                                   |
| -- | ------------- | ------------------------------------------ |
| 1  | 数据与工具    | agent 如何拿到可信、带时间戳的行情与财报？ |
| 2  | 投研          | 如何把财报和新闻变成可溯源备忘录？         |
| 3  | 多 agent 决策 | 专长 agent 如何辩论并交接决策？            |
| 4  | 交易与组合    | 信号如何变成带仓位与风控的订单？           |
| 5  | 量化自动化    | agent 如何挖因子并迭代策略？               |
| 6  | 会计          | 如何记账对账且不改写历史？                 |
| 7  | 风控合规      | AML/KYC、尽调与不可逆动作如何闸控？        |
| 8  | 个人理财      | 本地优先应用如何把账户暴露给 agent？       |
| 9  | 评测与竞技场  | 如何衡量研究、决策、安全与实盘能力？       |
| 10 | 回测与防泄漏  | agent 循环下如何保持市场时间正确性？       |

## 怎么用这份清单

**做投研 agent。** 从第 1 → 2 → 9 章开始。

**做交易 agent。** 读 1 → 3/4 → 10 → 9，交易深度见附录里的交易向清单。

**运营 / 合规 / 个人理财。** 从第 6、7、8 章开始。

**面试或设计评审。** 把每章的踩坑提示当失败模式清单。

这是精选短名单，不是大全。链接在收录时检查过；CI 会跑 awesome-lint 与每周坏链检查。

## 1. 数据与工具

### 要解决的问题

金融 agent 的上限取决于它能调用的数据和工具。本章收录行情、财报、券商桥，以及面向 MCP 的 Skills 包。

相关页面：[数据与工具](https://finance-agents.dev/zh/categories/data-and-tools)、[OpenBB](https://finance-agents.dev/zh/projects/openbb)、[AKShare](https://finance-agents.dev/zh/projects/akshare)。

### 平台与行情数据

- [OpenBB](https://github.com/openbq-org/OpenBB) - 面向分析师、量化和 AI agent 的开放数据平台，覆盖股票、期权、加密和宏观。
- [akshare](https://github.com/akfamily/akshare) - 🇨🇳 A 股与多市场数据工具包，常被当作 agent 的数据后端。
- [a-stock-data](https://github.com/simonlin1212/a-stock-data) - 🇨🇳 面向 agent 与投研流程的高覆盖 A 股数据接口。
- [edgartools](https://github.com/dgunning/edgartools) - 类型友好的 SEC EDGAR Python API：10-K/8-K、XBRL、13F、Form 3/4/5。
- [MarS](https://github.com/microsoft/MarS) - 微软的金融市场仿真引擎，由生成式基础模型驱动。
- [global-stock-data](https://github.com/simonlin1212/global-stock-data) - 面向编码 agent 的免鉴权美股数据 Skill：CBOE 期权希腊值、FINRA 卖空量、SEC 文件、选股器。
- [yahoo-finance2](https://github.com/gadicc/yahoo-finance2) - Node 版非官方 Yahoo Finance API，附 CLI、MCP 服务与 Agent Skill。
- [CNEquity](https://github.com/rootSunc/CNEquity) - 🇨🇳 中国市场本地 Parquet 数据湖，带 PIT 语义、质量审计，可通过 MCP 供 agent 查询。
- [FQGate-agent](https://github.com/fqgate/FQGate-agent) - 🇨🇳 把同花顺客户端的本机 A 股行情、K 线、Level-2 与资讯开放给 Codex、Claude Code 等 agent。
- [dartlab](https://github.com/eddmpython/dartlab) - 🇰🇷 把韩国 DART 与 SEC EDGAR 披露文件整理成结构化 Python 数据，用于公司分析。

### MCP 服务器

- [financial-services](https://github.com/anthropics/financial-services) - Anthropic 官方的金融服务 Skills 与连接器合集。
- [FinanceMCP](https://github.com/guangxiangdebizi/FinanceMCP) - 🇨🇳 面向 Claude 类 agent 的 Tushare + Binance 金融 MCP。
- [mcp-cn-a-stock](https://github.com/elsejj/mcp-cn-a-stock) - 🇨🇳 向大模型提供 A 股行情数据的 MCP 服务。
- [sec-edgar-mcp](https://github.com/stefanoamorelli/sec-edgar-mcp) - 用于浏览和查询 SEC EDGAR 文件的 MCP 服务器。
- [yahoo-finance-mcp](https://github.com/Alex2Yang97/yahoo-finance-mcp) - 通过 MCP 暴露的 Yahoo Finance 行情数据。
- [mcp_massive](https://github.com/massive-com/mcp_massive) - Massive.com（原 Polygon）行情数据的 MCP。
- [tradingview-mcp](https://github.com/atilaahmettaner/tradingview-mcp) - TradingView MCP：行情、筛选、技术指标与回测桥接。
- [Equibles](https://github.com/daniel3303/Equibles) - 自托管金融数据 MCP：SEC 文件、XBRL 财报、13F 持仓、内部人与国会议员交易、FRED。
- [opennews-mcp](https://github.com/6551Team/opennews-mcp) - 新闻聚合 MCP，带 AI 评级与交易信号标注，侧重加密与市场快讯。
- [financial-datasets/mcp-server](https://github.com/financial-datasets/mcp-server) - Financial Datasets 股票数据 API 的 MCP 服务（行情、财报、新闻）。
- [stock-api](https://github.com/zhangxiangliang/stock-api) - 🇨🇳 A 股、美股、港股与场内基金行情，可经 Node.js、浏览器、CLI 或 MCP 接入。
- [metatrader-mcp-server](https://github.com/ariadng/metatrader-mcp-server) - 让 LLM 通过 MetaTrader 5 读取数据并下单的 MCP。(live)
- [maverick-mcp](https://github.com/wshobson/maverick-mcp) - 股票 MCP：Yahoo Finance 数据、技术分析、持仓跟踪与 Python 回测。
- [borsa-mcp](https://github.com/saidsurucu/borsa-mcp) - 🇹🇷 伊斯坦布尔交易所、美股与土耳其基金数据 MCP。
- [investor-agent](https://github.com/ferdousbhai/investor-agent) - 为投资 agent 打包行情、基本面、期权与情绪数据的 MCP 服务。
- [interactive-brokers-mcp](https://github.com/code-rabi/interactive-brokers-mcp) - 盈透证券 MCP，提供账户、行情与下单工具。(sim/live)
- [alpha_vantage_mcp](https://github.com/alphavantage/alpha_vantage_mcp) - Alpha Vantage 官方 MCP 服务，覆盖股票、外汇、加密与宏观指标。
- [Financial-Modeling-Prep-MCP-Server](https://github.com/imbenrabi/Financial-Modeling-Prep-MCP-Server) - Financial Modeling Prep API 的 MCP 实现（财报、比率、预期、文件）。
- [fred-mcp-server](https://github.com/stefanoamorelli/fred-mcp-server) - FRED（美联储经济数据）宏观序列的 MCP 服务。
- [Financial Evidence](https://github.com/beepboop2025/financial-evidence-skills) - 免费只读的 MCP 服务与 Python SDK，提供货币市场、银行与 BTC 流动性数据，每条数据附带来源链接、日期和单位。

### 官方券商与交易所 agent 工具包

- [alpaca-mcp-server](https://github.com/alpacahq/alpaca-mcp-server) - Alpaca 官方 MCP：股票/ETF/期权/加密，支持模拟盘。(sim)
- [okx/agent-trade-kit](https://github.com/okx/agent-trade-kit) - OKX 交易 MCP：现货、永续、期货、期权与网格。(live)
- [kraken-cli](https://github.com/krakenfx/kraken-cli) - Kraken 官方的 AI 原生 CLI，覆盖加密、代币化股票、外汇与衍生品，面向 agent 调用。(live)
- [Bitget-AI/agent_hub](https://github.com/Bitget-AI/agent_hub) - Bitget 官方工具包，把 Claude、Cursor、Codex、ChatGPT 接到 Bitget 交易。(live)
- [Polymarket/agent-skills](https://github.com/Polymarket/agent-skills) - Polymarket 官方 agent skills，用于市场检索与交易。
- [okx/agent-skills](https://github.com/okx/agent-skills) - OKX 官方 agent skills：行情、持仓查询与交易。(live)
- [alpaca-skills](https://github.com/alpacahq/alpaca-skills) - Alpaca 官方 SKILL.md，覆盖 Trading 与 Broker API。(sim/live)
- [QuantConnect/mcp-server](https://github.com/QuantConnect/mcp-server) - QuantConnect 官方 MCP，可由 agent 管理项目、回测与实盘算法。
- [futu-agent-hub](https://github.com/FutunnOpen/futu-agent-hub) - 富途官方 Skills：OpenAPI、资讯检索与情绪指标。
- [longbridge-terminal](https://github.com/longbridge/longbridge-terminal) - 长桥官方 CLI，覆盖全部 Longbridge OpenAPI：港美股行情、期权、持仓与下单，面向 agent 工具调用，附 TUI。(live)
- [longbridge-mcp](https://github.com/longbridge/longbridge-mcp) - 长桥官方 MCP，164 个工具，经 OAuth 2.1 托管端点提供港美股行情、期权、下单、基本面、分析师评级与日历。(live)
- [longbridge/skills](https://github.com/longbridge/skills) - 长桥官方 agent skills（13 个）：行情、技术分析、基本面、持仓与财报等，支持 Claude Code 与 Codex。

### Skills 包

- [finance-skills](https://github.com/himself65/finance-skills) - 面向 AI 金融分析流程的 Skills 包。
- [claude-trading-skills](https://github.com/tradermonty/claude-trading-skills) - 面向美股投资者与交易者的 Claude Skills 包。
- [UZI-Skill](https://github.com/wbh604/UZI-Skill) - 🇨🇳 流行的"投资大佬"人格式看盘 Skill，覆盖 A/港/美股并带规则化打分。
- [investorskills](https://github.com/questflowai/investorskills) - 把知名投资人的判断框架整理成结构化、可移植的 Skill 库。
- [digital-oracle](https://github.com/komako-workshop/digital-oracle) - 用市场隐含概率回答宏观问题（房产、黄金、BTC、地缘）的 Skill。
- [equity-research-skill](https://github.com/rollingSirius/equity-research-skill) - 个股与财报深度研究 Skill，输出分章节研报。
- [agentii-investment-intelligence](https://github.com/agentii-ai/agentii-investment-intelligence) - 25 个股票研究 Skill，基于 SEC 文件、XBRL 财报与行情数据。
- [JoelLewis/finance_skills](https://github.com/JoelLewis/finance_skills) - 81 个 Claude Code 金融服务 Skill，分 7 个插件（财富管理、合规、运营等）。
- [quant-buddy-skills](https://github.com/pseudo-longinus/quant-buddy-skills) - 🇨🇳 覆盖 A/港/美股、期货、宏观与 ETF 的量化分析 Skill 集。

### 踩坑提示

优先使用带时间戳、可做时点对齐的数据源。不要让模型编造行情或财报数字。凡是能下单的工具都标成有写入能力，并放在审批后面。

## 2. 投研与深度研究

### 要解决的问题

投研 agent 阅读财报、电话会、新闻和资料室，产出可溯源的投资备忘录。难点是每一条数字和结论都要有出处。

相关页面：[投研与深度研究](https://finance-agents.dev/zh/categories/investment-research)、[Dexter](https://finance-agents.dev/zh/projects/dexter)、[FinRobot](https://finance-agents.dev/zh/projects/finrobot)、[开源金融研究与报告 agent 对照](https://finance-agents.dev/zh/compare/financial-research-agents)。

### 开源投研 agent

- [dexter](https://github.com/virattt/dexter) - 带工具调用和结构化报告的自主深度金融研究 agent。
- [FinRobot](https://github.com/AI4Finance-Foundation/FinRobot) - AI4Finance 出品的开源金融 AI agent 平台。
- [FinSight](https://github.com/RUC-NLPIR/FinSight) - 深度金融研究 agent 框架（ACL 2026 相关）。
- [ai-berkshire](https://github.com/xbtlin/ai-berkshire) - 巴菲特/芒格式的价值投资多智能体投研。
- [ai-financial-agent](https://github.com/virattt/ai-financial-agent) - 来自 dexter / ai-hedge-fund 作者的投资研究金融 agent。
- [DeepEar](https://github.com/HKUSTDial/DeepEar) - 🇨🇳 深度研究与金融信号追踪框架（顺风耳）。
- [claude-equity-research](https://github.com/quant-sentiment-ai/claude-equity-research) - 面向机构风格股票研究的 Claude Code 插件。
- [FinnewsHunter](https://github.com/DemonDamon/FinnewsHunter) - 多 agent 金融新闻情报平台：实时分析、情绪与信号提取。
- [FinSight-AI](https://github.com/juanjuandog/FinSight-AI) - 股票研究 agent：证据化 RAG、版本化研报与质量检查。
- [prism-insight](https://github.com/dragon1086/prism-insight) - 多 agent 股票分析与交易系统，生成研报（韩股与美股）。
- [augur](https://github.com/BruceLanLan/augur) - 本地优先的投研记忆系统：多大师视角分析、带时间语义的证据、可复查运行记录。
- [dayu-agent](https://github.com/noho/dayu-agent) - 🇨🇳 买方财报分析 agent：美/A/港股财报下载、问答与可追溯的报告写作。
- [Claude-Code-Stock-Deep-Research-Agent](https://github.com/liangdabiao/Claude-Code-Stock-Deep-Research-Agent) - 🇨🇳 基于 Claude Code 的 8 阶段个股尽调流程，多研究 agent 并行。
- [alphasift](https://github.com/ZhuLinsen/alphasift) - 全市场选股引擎：LLM 排序、风险感知打分与可审计证据。
- [dexter-jp](https://github.com/edinetdb/dexter-jp) - 面向日本上市公司的 Dexter 式深度研究 agent，基于 EDINET 数据。
- [FinanceHarness](https://github.com/Yijia-Xiao/FinanceHarness) - 自主金融深度研究框架（论文代码）。
- [kamathhrishi/finance-agent](https://github.com/kamathhrishi/finance-agent) - 对财报电话会、SEC 文件与新闻问答，用文件工具检索而非向量 RAG。

### 自托管投研工作台与终端

- [LangAlpha](https://github.com/ginlix-ai/LangAlpha) - 面向金融市场投研的 Claude Code 风格工作台。
- [Vibe-Research](https://github.com/simonlin1212/Vibe-Research) - 🇨🇳 A/美/港股投研工作台，本地数据面较全。
- [easy-stock](https://github.com/jundizhou/easy-stock) - 🇨🇳 A 股分析与 AI 投研桌面工作台。
- [Seris](https://github.com/aowang-ai/seris) - 桌面 AI 投研助手：在实时行情图旁对话，支持价格提醒和本地回测，可接自己的模型。
- [FinceptTerminal](https://github.com/Fincept-Corporation/FinceptTerminal) - 开源金融终端（AGPL），含行情分析、内置 AI 投研 agent、券商与回测接入。
- [go-stock](https://github.com/ArvinLovegood/go-stock) - 🇨🇳 本地优先的桌面 AI 选股分析工具：A/港/美股行情、资讯与资金分析、选股、提醒。
- [tick-stock-panel](https://github.com/shy3130/tick-stock-panel) - 🇨🇳 自托管 A 股工作台：LLM 辅助策略定制、盯盘、回测与复盘。
- [PanWatch](https://github.com/TNT-Likely/PanWatch) - 🇨🇳 基于 TradingAgents 的 A/港/美股 AI 盯盘，含持仓洞察与提醒。
- [vibe-astock](https://github.com/simonlin1212/vibe-astock) - 🇨🇳 A 股短线复盘工作台：异动盯盘、情绪复盘、AI 复盘与交易日志。
- [hunter-community](https://github.com/agentpit-io/hunter-community) - 🇨🇳 自托管多 agent 投研终端，覆盖 A/港/美股：选股器、个股深度分析、自选与持仓管理，使用自己的模型 key。
- [folio](https://github.com/helsome/folio) - 本地优先的 AI 投研工作台：证据化投资论点、组合风险分析与 Pi agent 副驾驶。

### 踩坑提示

要求引用到具体财报章节或 URL。拒绝编造财务比率的回答。优先选择能保留工具调用轨迹、可审计的 agent。

## 3. 多 agent 投研与决策系统

### 要解决的问题

这类系统模拟分析师团队：专长 agent 辩论、交接并形成决策。更适合研究角色结构，而不是开箱即用的 alpha。

相关页面：[多 agent 决策](https://finance-agents.dev/zh/categories/multi-agent-decisions)、[TradingAgents](https://finance-agents.dev/zh/projects/tradingagents)、[ai-hedge-fund](https://finance-agents.dev/zh/projects/ai-hedge-fund)、[FinGPT vs TradingAgents](https://finance-agents.dev/zh/compare/fingpt-vs-tradingagents)。

### 代表性多 agent 系统

- [TradingAgents](https://github.com/TauricResearch/TradingAgents) - 带分析师、交易员、风控角色的多智能体 LLM 交易框架。
- [ai-hedge-fund](https://github.com/virattt/ai-hedge-fund) - 由专长投资 agent 组成的 AI 对冲基金模拟。
- [TradingAgents-CN](https://github.com/hsliuping/TradingAgents-CN) - 🇨🇳 中文增强版 TradingAgents，适配本地市场。
- [valuecell](https://github.com/ValueCell-ai/valuecell) - 面向金融应用的社区多智能体平台。
- [AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) - Swarm 风格的自动对冲多智能体系统。
- [TradingAgents-astock](https://github.com/simonlin1212/TradingAgents-astock) - 🇨🇳 适配 A 股的 TradingAgents，带本地数据特性。
- [aiagents-stock](https://github.com/oficcejo/aiagents-stock) - 🇨🇳 多 AI 股票团队：分析、盯盘与板块轮动预警。
- [TradingAgents-AShare](https://github.com/KylinMountain/TradingAgents-AShare) - 🇨🇳 A 股多智能体投研台，带辩论界面。
- [lumibot](https://github.com/Lumiwealth/lumibot) - 可连接多家券商的交易 agent，支持回测。(sim/live)
- [ai-hedge-fund-crypto](https://github.com/51bitquant/ai-hedge-fund-crypto) - 面向加密市场的 ai-hedge-fund 分支。
- [ALTA](https://github.com/kyky2347/ALTA) - 仅供研究的多 agent 交易公司：侦察、复核与策略台分工，券商执行边界单独隔离。(sim)
- [atlas-gic](https://github.com/chrisworsey55/atlas-gic) - 自我改进的交易 agent，按市场反馈迭代 prompt（autoresearch 思路）。
- [ai-market-maker](https://github.com/olaxbt/ai-market-maker) - 加密对冲基金式 agent 栈（LangGraph），执行前有硬性风控否决。
- [easy_investment_Agent_crewai](https://github.com/liangdabiao/easy_investment_Agent_crewai) - 🇨🇳 CrewAI + AKShare 的多 agent A 股分析平台。
- [CryptoTradingAgents](https://github.com/Tomortec/CryptoTradingAgents) - 面向加密市场的多 agent LLM 交易决策框架。
- [trading-agents-java](https://github.com/BlackmodeN/trading-agents-java) - 🇨🇳 Spring AI 多 agent 投研：辩论决策、每日持仓复盘与向量记忆。
- [AlpacaTradingAgent](https://github.com/huygiatrng/AlpacaTradingAgent) - TradingAgents 式多 agent 框架，接 Alpaca 模拟/实盘下单。(sim/live)
- [FinCon](https://github.com/The-FinAI/FinCon) - 经理-分析师多 agent 结构与概念化语言强化（NeurIPS 2024）。(paper)

### 踩坑提示

辩论不等于正确。注意跨 agent 的上下文污染，以及所谓共识其实只是提示词最响的那个角色。

## 4. 交易执行与组合管理

### 要解决的问题

从信号到订单：仓位、风险预算、券商/交易所连接，以及组合分析。更完整的交易向清单见附录中的 LLMQuant/awesome-trading-agents。

相关页面：[交易与组合](https://finance-agents.dev/zh/categories/trading-and-portfolio)、[nofx](https://finance-agents.dev/zh/projects/nofx)、[FinRL-Trading](https://finance-agents.dev/zh/projects/finrl-trading)、[开源交易 agent 对照](https://finance-agents.dev/zh/compare/open-source-trading-agents)。

### LLM 交易 agent

- [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) - 🇨🇳 多市场 LLM 股票分析，带看板与告警。
- [Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) - HKUDS 的个人交易 agent 栈。(sim)
- [AI-Trader](https://github.com/HKUDS/AI-Trader) - 面向 agent 的自动化交易研究系统。
- [nofx](https://github.com/NoFxAiOS/nofx) - 覆盖美股、商品、外汇与加密的 AI 交易终端助手。(sim/live)
- [OpenAlice](https://github.com/TraderAlice/OpenAlice) - 一人华尔街风格的多资产 AI 交易 agent。
- [AgenticTrading](https://github.com/Open-Finance-Lab/AgenticTrading) - 与评测 harness 配套的 agent 交易研究代码。
- [FinRL-Trading](https://github.com/AI4Finance-Foundation/FinRL-Trading) - AI 原生的模块化量化交易基础设施（FinRL-X）。
- [FinMem-LLM-StockTrading](https://github.com/pipiku915/FinMem-LLM-StockTrading) - FinMem 系列的分层记忆 LLM 交易 agent。(paper)
- [jev-trade](https://github.com/aowang-ai/jev-trade) - 模型驱动的 Hyperliquid 交易机器人：五个币种独立钱包，每个 tick 决策一次，带实时看板与 dry-run 模式。(sim/live)
- [QuantDinger](https://github.com/OpenByteInc/QuantDinger) - 可自托管的 AI 交易系统：agent 与自然语言建策略、回测、券商/交易所执行。(sim/live)
- [OctoBot](https://github.com/Drakkar-Software/OctoBot) - 开源加密交易机器人，除网格、定投与 TradingView 信号外还有 AI/LLM 策略模式。(sim/live)
- [Hyper-Alpha-Arena](https://github.com/HammerGPT/Hyper-Alpha-Arena) - 面向 Hyperliquid 与币安合约的 AI 交易平台，策略由模型驱动。(sim/live)
- [MAHORAGA](https://github.com/ygwyg/MAHORAGA) - 由社交情绪分析驱动的自主交易 agent。(sim/live)
- [nof1.ai](https://github.com/195440/nof1.ai) - nof1.ai 自主 LLM 交易 agent 的开源复刻。(sim/live)
- [OpenTrade](https://github.com/OpenTradeOSS/OpenTrade) - macOS 应用，让 Claude Code/Codex 经 Robinhood 官方 MCP 交易，带审批与限额。(live)
- [hummingbot/condor](https://github.com/hummingbot/condor) - Hummingbot 官方的 Telegram 控制端，经 Hummingbot API 监控与运行 AI 交易 agent。(live)
- [WyckoffTradingAgent](https://github.com/YoungCan-Wang/WyckoffTradingAgent) - 🇨🇳 威科夫量价交易 agent 与 A 股筛股工具，带 CLI 工作流和 MCP 工具。
- [FriesTrader](https://github.com/YizhiSong/FriesTrader) - 通过 Robinhood 官方 agentic-trading MCP 真实下单的交易 agent，风控规则由机械规则执行，模型无法覆盖。(live)

### 预测市场 agent

- [polymarket-mcp-server](https://github.com/caiovicentino/polymarket-mcp-server) - Polymarket 预测市场 MCP，带监控与安全特性。(sim/live)
- [CloddsBot](https://github.com/alsk1992/CloddsBot) - 跨 Polymarket、Kalshi 与加密交易所的自主 AI 交易 agent。(sim/live)
- [pmxt](https://github.com/pmxt-dev/pmxt) - 统一 API，交易 Polymarket、Kalshi 等预测市场。(live)
- [Polyseer](https://github.com/yorkeccak/Polyseer) - 针对 Polymarket/Kalshi 问题的多 agent 深度研究，证据加权并输出带引用报告。
- [kalshi-ai-trading-bot](https://github.com/ryanfrigo/kalshi-ai-trading-bot) - Kalshi 预测市场 AI 策略工具包。(sim/live)
- [kalshi-trading-bot-cli](https://github.com/OctagonAI/kalshi-trading-bot-cli) - Kalshi 交易 CLI：研究市场、估算概率并下单。(sim/live)

### 券商桥与执行底座

- [alpaca-py](https://github.com/alpacahq/alpaca-py) - Alpaca 官方 Python SDK，常作 agent 模拟/实盘后端。(sim/live)
- [freqtrade](https://github.com/freqtrade/freqtrade) - 常用的加密交易机器人，也常被当作 agent 执行后端。(sim/live)
- [hummingbot](https://github.com/hummingbot/hummingbot) - 开源加密做市与执行框架。(live)
- [tradememory-protocol](https://github.com/mnemox-ai/tradememory-protocol) - 面向 AI 交易 agent 的决策审计轨迹与记忆协议。
- [ccxt](https://github.com/ccxt/ccxt) - 统一 100+ 加密交易所的 API，常作为加密 agent 的执行层。(live)
- [easytrader](https://github.com/shidenggui/easytrader) - 🇨🇳 同花顺、miniQMT、雪球的 A 股交易自动化，可作 agent 执行层。(live)
- [fintool](https://github.com/second-state/fintool) - 面向 agent 交易与市场情报的 Rust CLI 套件，每个交易所一个二进制。(live)

### 踩坑提示

模拟盘和实盘要分开。永远不要给 agent 无上限的实盘下单权限。在相信收益截图之前，先建模手续费、滑点和停牌规则。

## 5. 量化研究自动化

### 要解决的问题

挖掘因子、写策略代码、跑回测并迭代的 agent，最接近「自主量化研究员」。

相关页面：[量化研究自动化](https://finance-agents.dev/zh/categories/quant-automation)、[Qlib](https://finance-agents.dev/zh/projects/qlib)、[RD-Agent](https://finance-agents.dev/zh/projects/rd-agent)。

### 研究自动化系统

- [qlib](https://github.com/microsoft/qlib) - 面向 AI 的量化平台，常作因子与模型研究 agent 的底座。
- [RD-Agent](https://github.com/microsoft/RD-Agent) - 微软 R&D agent，在金融因子/策略自动化赛道很强。
- [alphagen](https://github.com/ICT-FinD-Lab/alphagen) - 用强化学习生成公式化 alpha 因子集合。
- [QuantaAlpha](https://github.com/QuantaAlpha/QuantaAlpha) - 用 agent 工作流发现量化 alpha 因子。
- [QuantGPT](https://github.com/Miasyster/QuantGPT) - 自主设计、回测并提交因子的 agent 化 alpha 工厂。
- [AlphaFin](https://github.com/AlphaFin-proj/AlphaFin) - 检索增强的 stock-chain 风格金融分析。
- [pwb-alphaevolve](https://github.com/paperswithbacktest/pwb-alphaevolve) - 把 AlphaEvolve 风格编码 agent 用到交易策略上。
- [Alpha-R1](https://github.com/FinStep-AI/Alpha-R1) - FinStep-AI 的 alpha / 因子研究 agent 系列。
- [LLMQuant/quant-mind](https://github.com/LLMQuant/quant-mind) - 面向 agent 的流水线，把论文、新闻、文件整理成带类型、引用与时间戳的金融知识。
- [QuantHarness](https://github.com/Y-Research-SBU/QuantHarness) - 价格驱动的多 agent LLM 高频交易研究框架。(paper)
- [Qbot](https://github.com/UFund-Me/Qbot) - 🇨🇳 本地部署的 AI 量化研究与交易机器人平台。
- [ai_quant_trade](https://github.com/charliedream1/ai_quant_trade) - 🇨🇳 一站式 AI 量化工具箱：策略、大模型、因子挖掘、模拟与实盘。
- [qusong0627/QuantMind](https://github.com/qusong0627/QuantMind) - 🇨🇳 集成 Qlib 与 RD-Agent 因子演化的 AI 原生多市场量化平台。
- [loopera](https://github.com/Loopera-ai/loopera) - 假设驱动的基本面因子研究 agent，验证需证据把关。
- [finlab-ai](https://github.com/koreal6803/finlab-ai) - 在 FinLab（台股）上生成与测试量化策略的 agent skills。
- [qanat](https://github.com/fidetolabs/qanat) - 可由 agent 直接调用的因子处理与回测 MCP。
- [x2strategy](https://github.com/ALAGENT-HKU/x2strategy) - 从量化论文中抽取结构化策略规格的 Agent Skill。
- [AgentQuant](https://github.com/OnePunchMonk/AgentQuant) - 失败感知的可复现策略研究框架，agent 工作流有类型约束。
- [alphaevo](https://github.com/ZhuLinsen/alphaevo) - 基于回测反馈自我进化的选股策略研究 agent。
- [EvoQuant](https://github.com/CamusGIT/EvoQuant) - 跑完整量化研究闭环的自进化研究 agent。
- [quantitative-signal-discovery-agent](https://github.com/NVIDIA-AI-Blueprints/quantitative-signal-discovery-agent) - NVIDIA 官方示例：LLM 闭环生成、编码并评估 alpha 信号。
- [AlphaQuanter](https://github.com/horizon-llm/AlphaQuanter) - 工具编排的 agent 强化学习交易框架（ACL 2026）。(paper)

### 踩坑提示

因子工厂很容易过拟合。要求走步向前验证或 purged CV，并留一份 agent 永远看不到的 holdout。

## 6. 财务运营与会计

### 要解决的问题

记账、对账、发票、税务与报表类 agent，以及接入会计系统的 MCP。

相关页面：[财务与会计](https://finance-agents.dev/zh/categories/accounting)、[Beancount](https://finance-agents.dev/zh/projects/beancount)。

### 账本与会计 agent

- [beancount](https://github.com/beancount/beancount) - 复式明文记账账本，常被记账 agent 当作写入目标。
- [fava](https://github.com/beancount/fava) - Beancount 的 Web UI，适合作为会计 agent 旁边的人工复核界面。
- [Klaudia](https://github.com/Yudhyy/Klaudia) - 自托管的 agent 会计师：票据、对账与审批。
- [Bookkeeping-Agency-Skill](https://github.com/cyhzzz/Bookkeeping-Agency-Skill) - 🇨🇳 面向中国代理记账场景的 Skills 包。
- [accounted](https://github.com/erp-mafia/accounted) - 为 agent 操作而设计的开源 ERP。
- [cfo-stack](https://github.com/MikeChongCan/cfo-stack) - 基于 Beancount 的 AI CFO 流程：导入、分类、对账、报表与税务 Skill。

### 税务、发票与应付

- [TaxHacker](https://github.com/vas3k/TaxHacker) - 自托管 AI 记账应用：LLM 识别票据、发票与流水，可自定义分类。
- [openaccountants](https://github.com/openaccountants/openaccountants) - 写给人和 AI agent 的会计与税务指南，标注来源与审核状态。
- [shinkoku](https://github.com/kazukinagata/shinkoku) - 日本确定申告 agent 插件，从记账到 e-Tax 填报。
- [mcp-fiscal-brasil](https://github.com/DeHor-Labs/mcp-fiscal-brasil) - 巴西税务 MCP：CNPJ、NF-e、SPED、Simples Nacional 等。
- [opentax](https://github.com/filedcom/opentax) - 开源美国联邦税计算引擎，单个 CLI 附 agent skills。

### 会计系统 MCP

- [norman-mcp-server](https://github.com/norman-finance/norman-mcp-server) - 面向欧洲的 AI 记账与报税自动化 MCP。
- [quickbooks-online-mcp-server](https://github.com/intuit/quickbooks-online-mcp-server) - Intuit 官方 MCP，让 AI 助手访问 QuickBooks Online 账务数据。
- [xero-mcp-server](https://github.com/XeroAPI/xero-mcp-server) - Xero 官方 MCP，覆盖联系人、发票、科目与报表。
- [stripe/ai](https://github.com/stripe/ai) - Stripe 官方 agent 工具包与 MCP，覆盖支付、账单与按量计费。

### 踩坑提示

会计 agent 必须只追加或经审批。绝不允许 agent 静默改写历史账本分录。

## 7. 风控、合规与审计

### 要解决的问题

AML/KYC、反欺诈分诊、尽调、ESG 审查，以及挡在不可逆动作（下单、支付、写账）前面的 action firewall。

相关页面：[风控与合规](https://finance-agents.dev/zh/categories/risk-and-compliance)。

### 尽调、AML/KYC 与防火墙

- [due-diligence-agents](https://github.com/zoharbabin/due-diligence-agents) - 多智能体的并购 / 企业尽调工作流。
- [cordum](https://github.com/cordum-io/cordum) - 在高风险工具调用执行前做审批的 agent action firewall。
- [tcaml-framework](https://github.com/tomcustos/tcaml-framework) - 带明确人工闸门的开源 AML/KYC/KYB agent 框架。
- [MutiAgent4Fraud](https://github.com/zheng977/MutiAgent4Fraud) - 多智能体反欺诈检测研究系统。
- [agentfactory-business-plugins](https://github.com/panaversity/agentfactory-business-plugins) - 覆盖 AML/KYC、IFRS9、Basel 等主题的银行金融 agent skills。
- [banking_plugin_qcc](https://github.com/duhu2000/banking_plugin_qcc) - 🇨🇳 银行类 agent，配合企查查 MCP 做中国尽调。
- [FinVault](https://github.com/aifinlab/FinVault) - 面向执行落地的金融 agent 安全评测。
- [ESGenius](https://github.com/ANGEL-NTU/ESGenius) - 面向 LLM 的 ESG 知识评测基准。
- [cre-acquisition-orchestrator](https://github.com/ahacker-1/cre-acquisition-orchestrator) - 商业地产收购 agent 框架：尽调、承销与融资。

### 踩坑提示

合规 agent 应该提出建议，而不是自动放行。保留人工闸门，以及对每条被覆盖告警的不可篡改审计日志。

## 8. 个人理财

### 要解决的问题

预算、消费分析、净资产跟踪，以及 agent 可通过 MCP/Skills 接入的本地优先理财应用。

相关页面：[个人理财](https://finance-agents.dev/zh/categories/personal-finance)、[Actual](https://finance-agents.dev/zh/projects/actual)。

### 应用与 MCP 桥

- [actual](https://github.com/actualbudget/actual) - 本地优先的个人理财应用，常作为 agent 的接入面。
- [firefly-iii](https://github.com/firefly-iii/firefly-iii) - 自托管个人财务管家，API 较成熟。
- [accountant24](https://github.com/machulav/accountant24) - 围绕记账流程的个人理财 agent。
- [monarch-mcp-server](https://github.com/robcerda/monarch-mcp-server) - Monarch Money 个人财务数据的 MCP 服务器。
- [lunchmoney-mcp](https://github.com/akutishevsky/lunchmoney-mcp) - Lunch Money 个人理财 MCP。
- [moneymatter](https://github.com/letehaha/moneymatter) - 自托管预算工具，内置 MCP 服务器。
- [mcp-server-firefly-iii](https://github.com/fabianonetto/mcp-server-firefly-iii) - 把 agent 接到 Firefly III 的 MCP 服务器。
- [finance-assistant](https://github.com/googlarz/finance-assistant) - 个人理财副驾 skill（FIRE 规划、银行流水格式等）。
- [opencoffer](https://github.com/osirishorus/opencoffer) - 自托管个人理财，支持自备 LLM 聊天与 MCP。
- [BeeCount](https://github.com/TNT-Likely/BeeCount) - 🇨🇳 本地优先记账应用（iOS/Android/Web），支持 AI 记账、自托管同步与 MCP。
- [aurelio-finance](https://github.com/LosaLosSantos/aurelio-finance) - 开源个人理财应用，带 AI 顾问，跟踪净资产、投资与现金流。
- [actual-ai](https://github.com/sakowicz/actual-ai) - 用 LLM 为 Actual Budget 交易自动分类（兼容 OpenAI 或 Ollama）。
- [Finance-Guru](https://github.com/AojdevStudio/Finance-Guru) - 自托管家族办公室引擎：类型化计算器、私有账本与专职 agent。
- [ray-finance](https://github.com/cdinnison/ray-finance) - 开源 AI 理财顾问，跨对话记住你的财务情况。
- [beancount-io](https://github.com/bex-co/beancount-io) - 面向人与 AI agent 的纯文本复式记账应用（iOS/Android）。

### 踩坑提示

优先本地优先或只读 MCP 访问银行数据。绝不要把原始银行凭证写进 agent 提示词或聊天日志。

## 9. 评测基准与竞技场

### 要解决的问题

衡量研究问答、交易决策、安全性和实盘竞技场表现。没有评测，金融 agent 就只是演示。

相关页面：[评测与竞技场](https://finance-agents.dev/zh/categories/evaluation)。

### 研究与开卷问答

- [PIXIU](https://github.com/The-FinAI/PIXIU) - FinMA + FinBen 金融 LLM 评测套件。
- [FinBen](https://github.com/The-FinAI/FinBen) - The-FinAI 的综合性金融 LLM 基准。
- [financebench](https://github.com/patronus-ai/financebench) - 基于真实财报的开卷金融问答基准。
- [finance-agent](https://github.com/vals-ai/finance-agent) - 带工具调用的金融研究 agent 基准（arXiv:2508.00828）。
- [finance-agent-v2](https://github.com/vals-ai/finance-agent-v2) - Finance Agent 基准 v2，含 EDGAR、网页与价格工具。
- [FinSearchComp](https://github.com/randomtutu/FinSearchComp) - 专家级金融搜索与推理基准（字节 Seed 相关）。
- [BizFinBench](https://github.com/HiThink-Research/BizFinBench) - 面向真实业务场景的金融 LLM 基准。
- [FinEval](https://github.com/SUFE-AIFLM-Lab/FinEval) - 🇨🇳 中文金融 LLM 评测套件。
- [MME-Finance](https://github.com/HiThink-Research/MME-Finance) - 面向专家级理解的多模态金融基准。
- [FinToolBench](https://github.com/Double-wk/FinToolBench) - 760 个可执行金融工具、295 个查询，评测工具调用 agent。
- [FinMTM](https://github.com/HiThink-Research/FinMTM) - 多轮多模态金融推理与 agent 基准。
- [finchain](https://github.com/mbzuai-nlp/finchain) - 可验证思维链金融推理的符号化基准。
- [big-finance-benchmark](https://github.com/Rogo-Technologies/big-finance-benchmark) - BigFinanceBench 参考评测框架，基于真实工作流的金融研究基准。
- [CNFinBench](https://github.com/open-compass/CNFinBench) - 🇨🇳 OpenCompass 出品的高风险金融 agent 任务基准。
- [FinanceBenchmark](https://github.com/microsoft/FinanceBenchmark) - 微软 M365 Copilot 财务 agent 基准（约 300 个任务，含 ERP 与网页工具）。

### 决策与交易基准

- [INVESTOR-BENCH](https://github.com/felis33/INVESTOR-BENCH) - InvestorBench：LLM agent 金融决策基准（ACL 2025）。
- [QuantitativeFinance-Bench](https://github.com/QF-Bench/QuantitativeFinance-Bench) - 在 Harbor 上的状态感知交互式量化 agent 基准。
- [stockbench](https://github.com/ChenYXxxx/stockbench) - 受控环境下检验 LLM agent 能否交易盈利的基准。
- [DeepFund](https://github.com/HKUSTDial/DeepFund) - NeurIPS'25 基金投资风格的 agent 评测试点。
- [QuantCode-Bench](https://github.com/LimexAILab/QuantCode-Bench) - 可执行算法交易代码生成基准。
- [TwinMarket](https://github.com/FreedomIntelligence/TwinMarket) - 用于研究 agent 交互的 LLM 驱动市场仿真。

### 实盘竞技场与公开战绩

- [live-trade-bench](https://github.com/ulab-uiuc/live-trade-bench) - 交易 agent 的实盘/在线评测。
- [Agent_Market_Arena](https://github.com/The-FinAI/Agent_Market_Arena) - 面向 LLM agent 的多市场实盘竞技场。
- [alpha-arena](https://github.com/AmadeusGB/alpha-arena) - 交易 agent 的 Alpha 竞技场竞赛 harness。
- [LLM-Trading-Lab](https://github.com/LuckyOne7777/LLM-Trading-Lab) - 公开实验：ChatGPT 管理一笔小额真实资金的微盘股组合，附日志与代码。(live)
- [nof0](https://github.com/wquguru/nof0) - 🇨🇳 开源 AI 交易竞技场，仿 nof1 Alpha Arena。
- [continuous-record-llm-trading-agents](https://github.com/ProjectDXAI/continuous-record-llm-trading-agents) - 对 LLM 交易 agent 实际行为做连续记录研究的数据与产物。(paper)

### 安全与可信

- [awesome-financial-llm-trustworthiness-benchmarks](https://github.com/FDU-INS/awesome-financial-llm-trustworthiness-benchmarks) - 金融 LLM 可信度相关基准的精选清单。
- [TradeTrap](https://github.com/Yanlewen/TradeTrap) - 检验 LLM 交易 agent 在扰动下是否可靠、忠实。(paper)

### 踩坑提示

没有成本、延迟和防泄漏控制的排行榜收益不能当证据。优先选择公开污染策略和工具访问规则的基准。

## 10. 回测、回放与防泄漏

### 要解决的问题

金融专属可靠性层：时点数据、前视偏差控制、确定性回放和真实成本模型。通用 agent 持久执行放在 agent-infra 类清单；本章只谈市场时间正确性。

相关页面：[回测与防泄漏](https://finance-agents.dev/zh/categories/backtesting)、[NautilusTrader](https://finance-agents.dev/zh/projects/nautilus-trader)。

### Harness 与引擎

- [TraderHarness](https://github.com/HephaestLab/TraderHarness) - ⭐ 面向 LLM 交易者的抗污染时点回测与回放 harness。
- [nautilus_trader](https://github.com/nautechsystems/nautilus_trader) - 确定性生产级交易引擎，可作 agent 执行底座。
- [vectorbt](https://github.com/polakowo/vectorbt) - 高性能向量化回测，常被策略 agent 封装调用。
- [backtesting.py](https://github.com/kernc/backtesting.py) - 简洁易读的 Python 回测库，适合策略原型。
- [pybroker](https://github.com/edtechre/pybroker) - 带机器学习友好回测钩子的 Python 算法交易库。
- [zipline-reloaded](https://github.com/stefan-jansen/zipline-reloaded) - 持续维护的 Zipline 分支，做 Python 事件驱动回测。
- [Lean](https://github.com/QuantConnect/Lean) - QuantConnect 开源事件驱动引擎，用于回测与实盘。
- [llm-agent-trader](https://github.com/jason8745/llm-agent-trader) - 由 LLM 做交易决策的回测系统，FastAPI + Next.js 界面。
- [vectorbt-backtesting-skills](https://github.com/marketcalls/vectorbt-backtesting-skills) - 编写和运行 VectorBT 回测的 agent skills（印度、美股、加密）。

### 踩坑提示

如果回测能看到明天的收盘价，agent 就是在作弊。优先使用时点数据集、隔离分割，以及钉住模型与数据版本的回放日志。

## 附录

模型、综述和相邻清单：有用的上下文，但本身不都是 agent。

相关页面：[FinGPT](https://finance-agents.dev/zh/projects/fingpt)、[FinRL](https://finance-agents.dev/zh/projects/finrl)。

### 金融大模型与相关模型

- [FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) - AI4Finance 的开源金融大模型系列。
- [FinRL](https://github.com/AI4Finance-Foundation/FinRL) - 金融强化学习库与教程。
- [Fin-R1](https://github.com/SUFE-AIFLM-Lab/Fin-R1) - 🇨🇳 金融推理大模型 Fin-R1。
- [Kronos](https://github.com/shiyu-coder/Kronos) - 面向金融市场的基础模型。
- [finBERT](https://github.com/ProsusAI/finBERT) - 经典的金融情感分析 BERT。
- [XuanYuan](https://github.com/Duxiaoman-DI/XuanYuan) - 🇨🇳 中文金融大模型「轩辕」。
- [qwen-dianjin](https://github.com/aliyun/qwen-dianjin) - 🇨🇳 阿里云通义点金金融大模型。

### 综述与论文清单

- [Agentic_FinTech_Survey](https://github.com/agentic-fintech/Agentic_FinTech_Survey) - 金融 / 金融科技中的 AI agent 综述。
- [fin_survey](https://github.com/F1y1113/fin_survey) - EMNLP 2025：金融领域 LLM agent 综述材料。
- [Awesome-LLM-Quantitative-Trading-Papers](https://github.com/Tom-roujiang/Awesome-LLM-Quantitative-Trading-Papers) - LLM 量化交易、基准与竞技场相关论文清单。
- [LLMs-in-Finance](https://github.com/hananedupouy/LLMs-in-Finance) - 金融领域 LLM 与 agent 的 notebook 与资料。

### 相关 awesome 清单

- [awesome-trading-agents](https://github.com/LLMQuant/awesome-trading-agents) - 交易向 agents / MCP / skills 清单（与本仓库互补）。
- [awesome-ai-in-finance](https://github.com/georgezouq/awesome-ai-in-finance) - 长期维护的 AI × 金融清单（经典量化/ML + 较新的 agent 层）。
- [awesome-finance-mcp](https://github.com/BlockRunAI/awesome-finance-mcp) - 按资产类别整理的金融 MCP 与 Skills 目录。
- [Awesome_AI4Finance](https://github.com/AI4Finance-Foundation/Awesome_AI4Finance) - AI4Finance 生态 awesome 清单。
- [awesome-quant](https://github.com/wilsonfreitas/awesome-quant) - 经典量化金融库与资源清单。
- [thuquant/awesome-quant](https://github.com/thuquant/awesome-quant) - 🇨🇳 中文 awesome-quant。
- [awesome-systematic-trading](https://github.com/paperswithbacktest/awesome-systematic-trading) - 系统化交易论文与代码。
- [Awesome-Prediction-Market-Tools](https://github.com/aarora4/Awesome-Prediction-Market-Tools) - 预测市场工具与基础设施。
- [Introduction-to-Quantitative-Finance](https://github.com/Barca0412/Introduction-to-Quantitative-Finance) - 🇨🇳 中文量化入门，带 AI+金融 arXiv Radar。
- [Awesome-finance-skills](https://github.com/RKiding/Awesome-finance-skills) - 🇨🇳 免费金融 Agent Skills 合集（中英）。
- [quantskills](https://github.com/quantskills/quantskills) - 🇨🇳 开源量化 Skill 与 Agent 的全景导航，从数据到风控监控。
- [Finance-LLMs](https://github.com/kennethleungty/Finance-LLMs) - 金融服务中真实 LLM 与 agent 用例汇编。
- [Awesome-FinLLMs](https://github.com/DataArcTech/Awesome-FinLLMs) - 金融大模型论文、模型与数据集清单。

## 贡献

欢迎贡献。请先阅读 [贡献指南](CONTRIBUTING.md)。变更记录见 [changelog](CHANGELOG.md)。

## 备注

仅供学习研究，不构成投资建议。

以 [CC0 1.0 Universal](LICENSE) 发布。

由 [Ao Wang](https://aowang.ai)（王奥）维护。
