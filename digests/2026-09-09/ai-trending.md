# AI 开源趋势日报 2026-09-09

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-08 22:47 UTC

---

# AI 开源趋势报告 — 2026-09-09

*范围：从今日 GitHub Trending 列表和 AI 主题搜索快照中，筛选出与 AI/ML 相关的项目。非 AI 仓库（如 `escrcpy`）以及仅含许可证的 `LunaTV` 已被排除。对于仅在 Trending 中出现、源数据未展示总 star 数的仓库，表中以 `n/a` 标注，同时给出可靠的每日 star 增量。*

## 1. 今日亮点

今天 AI 开源的重心已经决定性地转移到了 Agent 层。OpenAI 发布并推广了 [Codex Skills 目录](https://github.com/openai/skills) 和 [Plugins](https://github.com/openai/plugins) 仓库；第三方的 Claude/Codex 技能包，如 [diagram-design](https://github.com/cathrynlavery/diagram-design) 和 [marketing skills](https://github.com/coreyhaines31/marketingskills)，增速已超过大多数常规框架。今日最大增量来自 [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)（+2,628），它把 HTML 变成由 Agent 生成的视频，说明 Agent 的输出正在从文本/代码扩展到富媒体。[microsoft/markitdown](https://github.com/microsoft/markitdown)（+2,045）则印证了“文档转 Markdown”正在成为 LLM/RAG 必不可少的基础管道。今天反复出现的主题与其说是“新模型”，不如说是“如何让 Agent 更可靠、更具上下文感知能力，并直接产出可交付成果”。

## 2. 各类别热门项目

### 🔧 AI 基础设施

| 项目 | 语言 | Stars (总数 / 今日) | 简介 |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,478 | 本地 LLM 运行时与模型仓库，现已支持 Kimi、GLM、MiniMax、DeepSeek、Qwen、Gemma 等更新的开放权重模型。在当前 Agent 密集的生态中，它依然是自托管推理的核心锚点。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,006 | 面向文本、视觉、音频和多模态模型训练与推理的模型定义框架。它出现在各类 LLM/ML 主题拉取结果中，说明标准化的模型接口仍是整个 AI 技术栈的底座。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 178,011 | 把搜索、抓取和大规模网页交互封装成面向 LLM 的上下文 API。它本质上就是“让网页成为可用上下文”的 Agent 基础设施。 |
| [jo-inc/camofox-browser](https://github.com/jo-inc/camofox-browser) | JavaScript | n/a (+872) | 专为 AI Agent 设计的隐形无头浏览器，定位为 Puppeteer/Playwright 的替代品，用于绕过机器人检测和反爬保护。它的快速增长说明市场对可靠 Agent 网页访问能力的需求强劲。 |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | TypeScript | n/a (+652) | 面向 AI 编码 Agent 的上下文窗口优化器：把工具输出放入沙箱并宣称可减少 98% 的上下文，同时还能持久化会话记忆，通过 MCP 和 hooks 在 17 个平台间路由，直击 Agent 上下文过载问题。 |

### 🤖 AI 智能体 / 工作流

| 项目 | 语言 | Stars (总数 / 今日) | 简介 |
| :--- | :--- | ---: | :--- |
| [openai/skills](https://github.com/openai/skills) | Python | n/a (+490) | Codex 官方技能目录，定义可复用的 Agent 能力。今日的增长表明，OpenAI 正在为自己的编码 Agent 构建“技能即代码”的正式层。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 254,243 (+1,426) | 覆盖技能、本能、记忆、安全以及“研究优先”开发方式的 Agent 框架性能优化系统。它是本次筛选集中 star 总数最高的项目，也是今天增长动能最强的仓库之一。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 145,961 | 用工具、RAG 和工作流构建 LLM 应用的 Agent 工程平台。它在 `ai-agent` 和 `llm` 主题社区中依然是稳定存在的基础设施。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,071 | 构建智能体工作流与 RAG 管道的协作式平台，支持丰富的模型和工具。它持续出现在主题搜索前列，是领先的全栈 Agent 构建工具。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 113,443 (+320) | 让 AI Agent 能够直接操作网站，至今仍是 Agent 浏览器自动化领域最成熟的方案。今天再次登上趋势榜，说明它正被越来越广泛地采用。 |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | n/a (+446) | 一套 Agent 技能框架外加软件开发方法论。它把 Agent 行为本身做成可复用、可共享的框架，而不是完全靠模型提示词临场发挥。 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | n/a (+1,020) | 面向 Claude Code、Codex 和 Pi 的自包含 HTML/SVG 编辑级图表模板。它打出“拒绝 Mermaid 劣质图”的旗号，配合 +1,020 的增量，说明市场对达到演示品质的 Agent 输出需求上升。 |
| [openai/plugins](https://github.com/openai/plugins) | JavaScript | n/a (+176) | OpenAI 官方插件仓库。与 Skills 目录并列来看，OpenAI 正在为自家 Agent 工具链构建一套标准化的扩展/插件生态。 |

### 📦 AI 应用

| 项目 | 语言 | Stars (总数 / 今日) | 简介 |
| :--- | :--- | ---: | :--- |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | n/a (+2,628) | “写 HTML，渲染视频，为 Agent 而生。”它是本数据集中单日增量最大的项目，也打开了一个全新的 Agent 输出品类：原生 HTML 视频生成。 |
| [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) | Python | n/a (+494) | 借助群体智能和 AI Agent 构建自主运行的对冲基金，负责市场分析、风控与交易执行。这表明垂直 AI Agent 正在进入高风险的金融工作流。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 121,581 | 根据主题或关键词，利用 AI 模型和自动化工作流生成短视频。它仍是全自动 AI 内容生产领域的参考项目。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,376 | 用户友好、可自托管的 AI 交互界面，支持 Ollama、OpenAI 兼容 API 与本地模型。它已成为许多本地 LLM 部署默认选用的开源 UI 层。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,623 | 开源 AI 求职工作流：自动扫描招聘网站，按 A–H 评级报告为职位打分，并针对性地定制简历。它运行在主流 AI 编码 CLI 中，是 Agent 直接服务职业工作流的代表。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,801 | 由 LLM 驱动的多市场股票分析工具，集成实时新闻、决策面板和自动推送通知。免费且定时运行的设定，使它成为一个非常务实的 AI Agent 垂直应用。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,074 | 将文档或主题转换为原生 PowerPoint 演示文稿，支持形状、动画、图表以及可选的配音讲解。它是 Agent 进入办公文档生产领域的有力信号。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,576 | AI 生产力工作室，提供智能聊天、自主 Agent 和 300+ 助手。它用桌面应用形态统一接入前沿 LLM，而不是局限于 CLI 工作流。 |

### 🧠 LLM / 训练

| 项目 | 语言 | Stars (总数 / 今日) | 简介 |
| :--- | :--- | ---: | :--- |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 59,881 | 大约两小时内从零训练一个 64M 参数的 LLM。它让“从零训练”的路径保持低门槛，是广受欢迎的动手实践类教学仓库。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,402 | 开源 LLM 评测平台，覆盖 100+ 数据集和大量模型。在新开放权重模型高频发布的当下，这类评测工具的重要性正在快速提升。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,553 | 在 Apple Silicon 上从零构建小型 vLLM 风格推理系统，并跑通 Qwen。这是一个面向 LLM 推理的系统层教学项目，持续吸引关注基础设施的开发者。 |
| [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) | Python | 3,090 | MatMul-free LM（无矩阵乘法语言模型）研究的开源实现。权重/架构层的研究在开源 AI 领域规模不大，却一直持续存在。 |

### 🔍 RAG / 知识

| 项目 | 语言 | Stars (总数 / 今日) | 简介 |
| :--- | :--- | ---: | :--- |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | n/a (+2,045) | 把文件和 Office 文档统一转成 Markdown，供 LLM 与 Agent 使用。它今天的 star 涨幅位居前列，说明文档摄取已成为 RAG/Agent 的关键管道。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,056 | 不依赖向量库，仅用确定性 AST 解析，即可把代码库、文档、SQL schema、配置和 PDF 转化为可查询的知识图谱。它代表了新兴的“无向量 / 基于推理”RAG 方向。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 93,490 | 捕获 Agent 会话活动，用 AI 压缩后把相关上下文注入后续会话。它实际上就是 Claude Code、Codex、Gemini 等 Agent 的持久记忆基础设施。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,311 | 融合检索增强生成与 Agent 能力的开源 RAG 引擎。它仍是生态中最主要的自托管 RAG 平台之一。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 64,927 | 为 AI Agent 和应用提供即插即用的记忆基础设施，实现持久化上下文。它是与 RAG 系统对应的记忆层方案，正在快速赢得开发者心智。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 46,026 | 面向向量 ANN 检索的高性能、云原生向量数据库，仍是生产级 RAG 与 Agent 检索管道的核心基础设施。 |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 34,450 | 面向 AI 应用的高性能向量数据库与检索引擎。Rust 底座和可扩展架构让它长期稳居 RAG 技术栈的领先选择。 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,583 | 面向无向量、基于推理的 RAG 的文档索引。它的走红标志着一个重要的子趋势：减少对向量数据库的依赖，转向结构化上下文与推理。 |

## 3. 趋势信号分析

从今天的数据中可以看到三个强信号。

首先，Agent 技能层正在取代模型发布，成为关注焦点。OpenAI 将面向 Codex 的 [skills](https://github.com/openai/skills) 和 [plugins](https://github.com/openai/plugins) 正式化；独立仓库则把 Agent 的判断方式、输出风格与领域经验打包成可分发的能力模块：[diagram-design](https://github.com/cathrynlavery/diagram-design) 单日 +1,020，[superpowers](https://github.com/obra/superpowers) +446，[marketing skills](https://github.com/coreyhaines31/marketingskills) +666，连 [i-have-adhd](https://github.com/ayghri/i-have-adhd) 这类行为技能也收获了 +422。开发者正在像使用插件一样对待提示词和 Agent 框架。

其次，上下文正在成为瓶颈。[ECC](https://github.com/affaan-m/ECC)、[context-mode](https://github.com/mksglu/context-mode)、[claude-mem](https://github.com/thedotmack/claude-mem) 和 [mem0](https://github.com/mem0ai/mem0) 都在做同一件事：压缩、持久化或隔离 Agent 上下文。“减少 98% token”这种激进的宣传也说明，下一场关键性能战将发生在上下文管理上，而不是模型原始质量上。

第三，浏览器访问和文档访问正被产品化为 Agent 中间件。[browser-use](https://github.com/browser-use/browser-use) 已拥有庞大而稳定的基本盘；[camofox-browser](https://github.com/jo-inc/camofox-browser)（+872）瞄准反机器人检测与 Cloudflare 防护绕过；[markitdown](https://github.com/microsoft/markitdown)（+2,045）让文档摄取变得可靠。与此同时，[hyperframes](https://github.com/heygen-com/hyperframes)（+2,628）在探索 HTML 直接生成视频，[Graphify](https://github.com/Graphify-Labs/graphify) 和 [PageIndex](https://github.com/VectifyAI/PageIndex) 则表明业界对无向量 RAG 的兴趣日益浓厚。Ollama 更新的模型列表——Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma——提醒我们：开放权重模型的发布从未停止；一旦模型可以相互替换，Agent 框架本身就成了护城河。

## 4. 社区热点

- **Agent 技能 / 扩展格式**——关注 [openai/skills](https://github.com/openai/skills) 和 [obra/superpowers](https://github.com/obra/superpowers)。生态正从“大而全的 Agent”转向可组合、可复用的技能目录，尽早形成标准将非常有价值。
- **上下文与记忆基础设施**——[context-mode](https://github.com/mksglu/context-mode)、[mem0](https://github.com/mem0ai/mem0) 和 [claude-mem](https://github.com/thedotmack/claude-mem) 都在解决长时间运行 Agent 会话的真实痛点。持久化记忆与压缩后的工具输出，能在成本和可靠性上带来立竿见影的收益。
- **Web / 浏览器 Agent 化层**——[browser-use](https://github.com/browser-use/browser-use) 和 [camofox-browser](https://github.com/jo-inc/camofox-browser) 表明，网页访问已成为 Agent 的核心基础设施。可以预期，合规与反机器人之间的军备竞赛将一直持续。
- **交付物质量类应用**——[diagram-design](https://github.com/cathrynlavery/diagram-design)、[heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) 与 [ppt-master](https://github.com/hugohe3/ppt-master) 都在强调：Agent 必须产出可直接演示、视觉丰富的交付物，而不仅仅是正确的文本。
- **垂直领域 Agent 部署**——[AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge)、[career-ops](https://github.com/career-ops-hq/career-ops) 和 [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) 将 Agent 直接用于高价值职业场景和金融决策。这些项目展现了通向现实 ROI 的最快路径，但也带来治理与风控方面的隐忧。

---

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*