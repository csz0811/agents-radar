# AI 开源趋势日报 2026-09-10

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-09 22:46 UTC

---

# AI 开源趋势报告 — 2026-09-10

> 注：Star 数值取自所提供的数据源。对于同时出现在 Trending 与 Topic Search 数据中的仓库，总数显示为 Topic Search 数值，并附上 Trending 的当日增量。`0 (+N)` 条目表示仅出现在数据源的 Trending 榜单中。

## 1. 今日亮点

今日 AI 开源社区的热度异常集中：关注重点已从模型本身转向 **智能体技能与编码智能体执行框架（harness）**。`i-have-adhd`、`diagram-design`、`superpowers`、`ECC` 和 `PI-Desktop` 等仓库表明，开发者正在为 Claude Code、Codex、Cursor 等智能体打包行为、上下文与护栏。与此同时，企业级与本地优先（local-first）工具也在快速升温：腾讯的 `teamai-cli` 迅速攀升，`PI-Desktop` 则提供了完全本地的 Electron + Rust 智能体桌面。金融、CAD/3D 设计与图像生成等垂直 AI 用例依然强劲。在 RAG 领域，多个头部项目正在超越向量搜索，转向知识图谱、基于推理的检索与上下文压缩。

## 2. 分类热门项目

### 🔧 AI 基础设施

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,531 | 开放权重模型事实上标准的本地 LLM 运行时。其 README 已在持续跟踪 Kimi、GLM、DeepSeek、Qwen、Gemma 等快速迭代的模型发布，使其成为众多智能体与 RAG 项目的核心基础设施。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,022 | 领先的智能体工程框架，用于模型、工具、检索与记忆编排。它仍是生产级 LLM 应用的默认底座，并且正在吸收生态中涌现的 “skills”（技能）新模式。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,573 | 一个用于构建可扩展 LLM 应用的模块化 Rust 框架。其稳步增长的热度表明，开发者对系统级语言 AI 基础设施的兴趣正日益增长，而不再局限于 Python 技术栈。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,555 | 一个动手实践项目，可在 Apple Silicon 上构建微型 vLLM + Qwen 推理系统。对于希望理解推理内部机制、又不想通读完整生产代码库的工程师来说尤为实用。 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | Python | 549 | 一个通用 LLM 网关，提供 OpenAI 与 Anthropic 兼容端点，具备多提供商协议转换与负载均衡能力。这强烈表明团队已开始将多个 LLM 后端视为常规基础设施。 |
| [apache/casbin-gateway](https://github.com/apache/casbin-gateway) | Go | 622 | 基于 Casbin 的 AI 与 MCP 安全网关，面向 HTTP API。它出现在 LLM/MCP 主题中，凸显出围绕智能体工具链的授权与访问控制需求正在增长。 |
| [openai/plugins](https://github.com/openai/plugins) | JavaScript | 0 (+505) | OpenAI 官方插件参考仓库。其单日增量骤然飙升，表明随着 MCP 与智能体技能成为主流，人们对插件及工具可扩展性标准的兴趣正在回升。 |
| [Tencent/teamai-cli](https://github.com/Tencent/teamai-cli) | TypeScript | 0 (+563) | 腾讯推出的 CLI，旨在让团队实现 “AI 原生”（AI native）。其今日新增超过 500 颗 star，说明大型厂商正在交付 AI 开发者工作流，而不仅仅是模型。 |

### 🤖 AI 智能体 / 工作流

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+4,624) | 一个阻止编码智能体“埋没”答案的技能，专为对 ADHD（注意力缺陷多动障碍）友好的输出而设计。它在今日榜单上拿下了最大单日 star 增量，印证了智能体输出质量与可读性是用户的重大痛点。 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+2,286) | 一个为 Claude Code、Codex 和 Pi 提供的包含 38 种编辑级图表类型的库。其热度表明，开发者需要的是精良、自包含的 HTML/SVG 视觉呈现，而不是千篇一律的 Mermaid 劣质图（slop）。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 255,121 (+1,151) | 一个面向智能体执行框架的性能优化系统，为其加入技能、本能、记忆、安全与研究优先的工作流。它拥有非常庞大的 star 总量，且今日仍在快速上涨。 |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+690) | 一个智能体技能框架与软件开发方法论。其 star 快速增长表明，编码智能体的行为模式正在成为可分发、可复用的产品。 |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | 0 (+393) | 一款本地优先的桌面 AI 编码智能体，采用 Electron + Rust 宿主核心，内置智能体执行框架并支持用户安装插件。它反映了向本地自有、桌面化智能体环境迁移的趋势。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 113,953 | 让智能体驱动真实浏览器的领先开源库。它仍是 Web 自动化、研究智能体与工作流智能体的核心基础设施。 |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | Python | 41,336 | 用于构建弹性、有状态、多步骤智能体的框架。LangGraph 现已成为许多基于 LangChain 的生产级智能体应用的首选编排层。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 243,841 | 被描述为 “与你一同成长的智能体”。其惊人的 star 数量表明，记忆、适应性与持续个性化正在成为下一代智能体运行时的标志性特性。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | 0 (+367) | 面向金融交易的多智能体 LLM 框架。它再次进入热门榜单，印证了金融是智能体工作流落地最快的垂直领域之一。 |
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | JavaScript | 0 (+612) | 一个面向 GPT-Image2 的工业化 prompt-as-code（提示词即代码）引擎与模板库，包含 530+ 逆向工程案例与 20+ 生产模板。该项目为图像生成工作流引入了可重复、类代码化的控制方式。 |
| [earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad) | Python | 0 (+97) | 一个面向 CAD、CAE 与 CAM 的智能体技能库。这充分说明工程仿真与设计工具正在被封装给 AI 智能体使用。 |
| [pascalorg/editor](https://github.com/pascalorg/editor) | TypeScript | 0 (+171) | 一个开源 3D 建筑编辑器，提供本地 CLI、MCP 工具与智能体工作流。今日 +171 的涨幅凸显了 MCP 原生创意/设计应用这一新兴品类。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,774 | 一个开源 AI 求职智能体，可在编码 CLI 内本地扫描招聘门户、为职位评分并定制简历。它是智能体解决现实个人工作流最典型的例子之一。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,845 | 一个由 LLM 驱动的多市场股票分析系统，具备实时新闻、仪表盘与自动告警功能。它与 TradingAgents 共同表明，金融是 AI 开源领域的领先用例。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,329 | 将文档或主题转换为原生 PowerPoint 演示文稿，支持图表、切换效果与语音旁白。它表明 AI 应用正从文本生成走向结构化、设计丰富的输出产物。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,612 | 一个 AI 生产力工作台，提供智能聊天、自主智能体与 300+ 助手。它代表了将多种智能体体验整合进单一桌面应用的趋势。 |

### 🧠 LLM / 训练

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,042 | 开源 AI 领域定义与微调模型的核心框架。它仍是把新发布模型转化为可用基础设施的主要入口。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,878 | 支撑大多数 LLM 训练与微调的基础深度学习框架。它出现在本周 ML 主题搜索中，显示出训练基础设施持续的核心地位。 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,287 | 一个极简项目，可在约两小时内从零训练一个 64M 参数 LLM。它有力地表明，小模型训练与动手实践教育已成为主流开源内容。 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | Python | 53,649 (+382) | 一个端到端的 “学会、构建、交付”（learn it, build it, ship it）AI 工程学习资源。它今日新增 382 颗 star，说明人们对项目制 AI 教育的需求依然旺盛。 |
| [opencompass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,404 | 一个 LLM 评测平台，支持 100+ 数据集和数十个主流模型系列。随着开源模型发布加速，健全的评测基础设施正变得更加重要。 |
| [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) | Python | 3,090 | 无矩阵乘法（MatMul-free）语言模型的实现。它促使人们关注主流 Transformer 技术栈之外的替代架构与效率研究。 |
| [AkaliKong/MiniOneRec](https://github.com/AkaliKong/MiniOneRec) | Python | 1,806 | OneRec 的最小复现，展示类 LLM 架构如何应用于推荐系统。其 ML 系统视角使其成为有价值的研究起点。 |
| [testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io) | HTML | 113 | 一个关于 LLM 测试时扩展（test-time scaling）的综述中心。尽管 star 不多，但它追踪了近期推理模型发布后最重要的推理期计算趋势之一。 |

### 🔍 RAG / 知识

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,474 | 最受欢迎的本地 AI 友好前端，支持 Ollama、OpenAI 兼容 API 与 RAG。它仍是自托管知识助手的默认入口。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,384 | 使用确定性的本地 AST 解析，将代码库、文档、PDF 与 SQL schema 转换为可查询的知识图谱，且无需向量存储。它是无向量（vectorless）RAG 运动最有力的标志之一。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 93,579 | 捕获智能体的所有操作，压缩后注入到多个智能体 CLI 的未来会话中。它正在成为编码智能体的 “上下文记忆层”。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,391 | 领先的开源 RAG 引擎，将检索增强生成与智能体能力相结合。它仍是目前最完整的自托管 RAG 系统之一。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,073 | 在工具输出、日志、文件与 RAG 分块进入 LLM 之前对其进行压缩。它宣称可为编码智能体节省 20% token、为 JSON 节省 60-95%，直接解决 LLM 上下文成本与延迟问题。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,008 | “AI 智能体的记忆层”，提供跨会话的持久化生产级上下文。随着智能体从无状态演示走向长期运行的工作流，它正变得愈发重要。 |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 52,100 | 领先的文档智能体与 OCR 平台，用于将私有数据接入 LLM。它仍是 RAG 流水线与知识密集型应用的重要工具。 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,604 | 一个为无向量、基于推理的 RAG 设计的文档索引。其热度表明检索正从嵌入相似度转向结构化、可解释的检索。 |

## 3. 趋势信号分析

今日社区关注度最爆炸的领域，是位于 **编码智能体之上** 的新一层 AI 工具：智能体技能、智能体执行框架（harness）与智能体上下文系统。`i-have-adhd`、`diagram-design`、`superpowers`、`ECC` 和 `PI-Desktop` 等项目不是模型，也不是通用框架；它们是面向 Claude Code、Codex、Cursor 及同类 CLI 的、带有明确主张的可复用行为包。这看起来像是智能体行为“包管理器”生态的开端：开发者正在把沟通风格、记忆、图表输出与安全行为打包成可安装的技能。

第二个明确信号是向 **本地优先与 MCP 原生应用** 的转变。腾讯的 `teamai-cli`、`PI-Desktop`、`pascalorg/editor` 和 `text-to-cad` 都将 MCP 与本地开发者工作流作为集成面。这与行业整体方向一致：智能体应当操控真实的本地工具，而不只是聊天。

第三，RAG 正在快速超越向量数据库。`Graphify`、`PageIndex`、`headroom` 等高星项目主张知识图谱、确定性解析、token 压缩与基于推理的检索。这一趋势与近期 LLM 发布直接相关：随着开放权重模型不断改进，核心价值已不再是能否访问模型，而是能否向模型提供干净、压缩且结构化的上下文。

## 4. 社区热点

- **智能体技能与行为包**：[`i-have-adhd`](https://github.com/ayghri/i-have-adhd)、[`diagram-design`](https://github.com/cathrynlavery/diagram-design) 和 [`superpowers`](https://github.com/obra/superpowers) 拥有最强的单日增长势头，因为它们改变了智能体的沟通与工作方式。这一方向很可能成为编码智能体的“应用市场”层。

- **Agent 性能执行框架（harness）**：[`ECC`](https://github.com/affaan-m/ECC) 与 [`PI-Desktop`](https://github.com/vastsa/PI-Desktop) 值得密切关注，因为它们将记忆、安全、技能与本地执行整合进同一个系统。如果这一模式走向整合，它可能成为智能体化编码的“操作系统”。

- **上下文与记忆基础设施**：[`claude-mem`](https://github.com/thedotmack/claude-mem)、[`mem0`](https://github.com/mem0ai/mem0) 与 [`headroom`](https://github.com/headroomlabs-ai/headroom) 正从不同角度攻克智能体的上下文瓶颈：捕获、持久化与压缩。构建长期运行智能体的开发者应密切关注它们。

- **无向量知识 RAG**：[`Graphify`](https://github.com/Graphify-Labs/graphify)、[`PageIndex`](https://github.com/VectifyAI/PageIndex) 与 [`LEANN`](https://github.com/StarTrail-org/LEANN) 指向一个检索更结构化、更少依赖稠密嵌入的未来。这些项目可能重新定义未来 RAG 系统的架构。

- **垂直智能体应用**：[`TradingAgents`](https://github.com/TauricResearch/TradingAgents)、[`daily_stock_analysis`](https://github.com/ZhuLinsen/daily_stock_analysis)、[`text-to-cad`](https://github.com/earthtojake/text-to-cad) 与 [`awesome-gpt-image-2`](https://github.com/freestylefly/awesome-gpt-image-2) 表明，社区增长最快的需求是领域特定的智能体工作流，而不仅仅是通用助手。

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*