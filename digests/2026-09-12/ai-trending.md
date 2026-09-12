# AI 开源趋势日报 2026-09-12

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-12 00:36 UTC

---

# AI 开源趋势报告 — 2026-09-12

**筛选说明：** 我排除了非 AI 趋势仓库，例如 sideloaders、PVR 工具、图形编辑器、网络栈工具、卫星模拟器和通用 CS 课程列表，除非它们与 AI/ML/agent/RAG 明确相关。总星标显示为 `0` 的趋势行是逐字照搬来源；其中的今日新增星标才是有意义的动量信号。

## 1. 今日亮点

如今 AI 开源的势头较少集中在新基础模型上，而更多集中在让 Agent 在实践中可用。上升最快的 AI 相关趋势仓库是 [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)（今日 +3463），一个面向编码 Agent 的 ADHD 友好输出技能，紧随其后的是 [github/spec-kit](https://github.com/github/spec-kit)（+1015）和 [obra/superpowers](https://github.com/obra/superpowers)（+729），表明规范驱动、基于技能的 Agent 工作流正在激增。持久上下文和 token 效率也很热门：[nashsu/llm_wiki](https://github.com/nashsu/llm_wiki)（+647）提供了传统 RAG 的 wiki 式替代方案，而 [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) 和 [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) 则瞄准上下文压缩和跨会话记忆。垂直自主 Agent 继续吸引关注，交易领域的 [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot)（+626）和 AI 销售领域的 [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM)（+152）领跑。底层基础设施正在围绕 MCP 安全、多提供商网关和本地优先编码 Agent（如 [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop)，+552）走向成熟。

---

## 2. 按类别划分的顶级项目

### 🔧 AI 基础设施

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,131 | 面向文本、视觉、音频和多模态的 SOTA 机器学习模型定义框架。它仍是开放模型集成与生产推理/训练流水线的默认骨干。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,699 | 本地模型运行器，支持 Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等。其高星标数表明本地优先的 LLM 执行仍是主要采用路径。 |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,934 | 核心张量与 GPU 加速神经网络框架。它支撑着开放 AI 训练与研究生态的很大一部分。 |
| [github/spec-kit](https://github.com/github/spec-kit) | Python | 0（今日 +1015） | 面向规范驱动开发（Spec-Driven Development）的工具包，旨在让 agentic 编码更有结构。今日 +1015 星标表明市场对围绕 AI 编码 Agent 的正式工作流需求强劲。 |
| [apache/casbin-gateway](https://github.com/apache/casbin-gateway) | Go | 623 | 面向 HTTP 的 Casbin AI 与 MCP 安全网关。它凸显了围绕 MCP/Agent 基础设施进行访问控制和策略执行的新兴需求。 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | Python | 550 | 通用 LLM 网关，提供 OpenAI/Anthropic 兼容端点与负载均衡。它解决了 Agent 栈的多提供商路由和密钥管理问题。 |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,599 | 用于构建可扩展 LLM 应用的模块化 Rust 框架。它反映出人们对将 Rust 用于性能敏感型 AI 基础设施的持续兴趣。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,559 | 教育项目，用于在 Apple Silicon 上构建微型 vLLM + Qwen 推理系统。它面向希望理解 LLM 服务内部机制的系统工程师。 |

### 🤖 AI Agent / 工作流

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 256,525 | Agent harness 性能优化系统，具备技能、本能、记忆、安全和研究优先开发等能力。它面向 Claude Code、Codex、Opencode、Cursor 等，显示出用于提升 Agent 质量的元工具正在兴起。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,606 | “与你共同成长的 Agent”，一个高关注度 Agent 框架。其庞大的星标数表明，主流对开放 Agent 运行时的兴趣持续存在。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,271 | 历史悠久的自主 Agent 平台，致力于让 AI 更易获取。随着 Agent 从演示走向生产工作流，它仍是重要参照。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,138 | Agent 工程平台，也是使用最广泛的 LLM 应用框架之一。它继续锚定 agentic 与 RAG 工作流的工具层。 |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 135,831 | 让 AI Agent 像懒惰的资深开发者一样思考、偏好最简代码的技能。它属于塑造 Agent 行为而非发布新模型权重的趋势之一。 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Go | 105,042 | Claude Code 技能，通过像穴居人一样说话削减约 65% 的 token。它凸显了 token 成本和上下文效率已成为 Agent 的一等关注点。 |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0（今日 +3463） | Agent 技能，阻止编码 Agent 把答案埋没，并提供 ADHD 友好的输出。今日 +3463 星标使其成为趋势榜上最强的 AI 相关动量信号。 |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0（今日 +729） | Agentic 技能框架与软件开发方法论。今日 +729 星标表明，人们对可复用、有纪律的 Agent 工作流兴趣渐增。 |

### 📦 AI 应用

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,521 | 自动化 AI 工作流，可根据主题或关键词生成高清短视频。它代表了蓬勃发展的消费级内容生成类别。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,293 | 开源 AI 求职工具，可在 AI 编码 CLI 中本地扫描招聘门户、给职位打分、定制简历并跟踪申请。它显示出垂直 Agent 正在嵌入现有开发者工具。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,945 | 由 LLM 驱动的多市场股票分析，包含新闻、仪表盘和定时提醒。它反映出对自主金融研究 Agent 的强劲需求。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,731 | 将文档或主题转化为原生 PowerPoint 幻灯片，包含图表、旁白和模板。它是一个垂直 AI 应用，竞争点在于输出保真度，而不仅是文本生成。 |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | Python | 33,258 | 来自 HKUDS 的个人交易 Agent。它显示 Agent 框架正在进入高风险的金融决策支持领域。 |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 0（今日 +626） | 基于 Claude 构建的开源 AI 交易 Agent，覆盖 1000+ 市场和多条链。今日 +626 星标指向人们对自主 Agent 商务和机器对机器支付的兴趣。 |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | 0（今日 +152） | 自托管 AI 销售 OS，具备原生 AI Agent、WhatsApp 集成和 MCP 就绪能力。它是面向聊天驱动型企业的 Kommo/Octadesk/Intercom 开放替代方案。 |
| [pascalorg/editor](https://github.com/pascalorg/editor) | TypeScript | 0（今日 +106） | 开源 3D 建筑编辑器，具备本地 CLI、MCP 工具以及面向人类和 AI Agent 的工作流。它标志着 MCP/Agent 集成正在扩展到创意和类 CAD 垂直领域。 |

### 🧠 LLM / 训练

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,786 | 在 PyTorch 中逐步实现类 ChatGPT LLM。它仍是了解 LLM 内部机制最受欢迎的教育路径之一。 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,719 | 约 2 小时从零训练 64M 参数 LLM。它降低了动手进行 LLM 训练和实验的门槛。 |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | Python | 54,271 | 从零学习、构建并交付 AI 工程项目。它反映出对实用、端到端 AI 工程课程的需求。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,421 | LLM 评估平台，支持多种模型在 100+ 数据集上评估。随着模型激增，评估仍是关键瓶颈。 |
| [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) | Python | 3,090 | 无 MatMul 语言模型的实现。它探索可降低计算成本的替代架构。 |
| [AkaliKong/MiniOneRec](https://github.com/AkaliKong/MiniOneRec) | Python | 1,810 | OneRec 的最小复现。它表明社区对推荐系统-LLM 混合方案和可复现研究感兴趣。 |
| [testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io) | HTML | 113 | 关于大语言模型测试时扩展的综述仓库。它跟踪训练后推理时计算这一关键方向。 |

### 🔍 RAG / 知识

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 117,023 | 将任何代码库、文档、SQL schema、配置和 PDF 转化为可查询知识图谱。其无向量、本地确定性 AST 方法让每条边都可解释。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 93,696 | 为每个 Agent 提供跨会话持久上下文，具备 AI 压缩和相关上下文注入。它适用于 Claude Code、OpenClaw、Codex、Gemini、Hermes、Copilot 和 OpenCode。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,533 | 领先的开源 RAG 引擎，将前沿 RAG 与 Agent 能力融合。它为 LLM 和 agentic 工作流提供上下文层。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,600 | 在到达 LLM 之前压缩工具输出、日志、文件和 RAG 片段。它声称可为编码 Agent 减少 20% token，并在答案相同的情况下为 JSON 减少 60–95% token。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 65,936 | 本地优先的 Agent 体验与文档聊天平台。它代表了自托管、隐私优先的 RAG/Agent 应用栈。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,139 | 面向 AI Agent 的记忆层，具备持久上下文和生产就绪基础设施。记忆正在成为 Agent 的一个独立基础设施类别。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 46,063 | 高性能云原生向量数据库，用于可扩展的 ANN 搜索。它仍是 RAG 和语义搜索的核心构建块。 |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | 0（今日 +647） | 跨平台桌面应用，将文档转化为有组织、相互链接的知识库。它不采用传统 RAG，而是从来源逐步构建持久 wiki；今日 +647 星标表明人们对这一替代方案兴趣浓厚。 |

---

## 3. 趋势信号分析

今日最强的信号是 Agent 层的专业化。社区不只是在要求能力更强的模型；它正在优化 Agent 行为、token 使用和工作流纪律。[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)（+3463）和 [obra/superpowers](https://github.com/obra/superpowers)（+729）表明，技能/harness 约定可以像模型发布一样快速传播，而 [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) 和 [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) 明确以 token 削减和最小代码本能作为卖点。[github/spec-kit](https://github.com/github/spec-kit)（+1015）表明规范驱动开发正成为编码 Agent 的标准入口。

第二个信号是记忆和上下文作为产品类别。[nashsu/llm_wiki](https://github.com/nashsu/llm_wiki)（+647）提出持久 wiki 构建，而非从头检索的 RAG；[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) 构建无需向量存储的可解释知识图谱；[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)、[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) 和 [mem0ai/mem0](https://github.com/mem0ai/mem0) 攻克跨会话记忆和 token 压缩。这与引用 Claude Code、Codex、Cursor、Gemini CLI、OpenClaw 和 Hermes 的多模型 Agent 栈相契合。

第三，基础设施正在围绕 MCP 和多提供商路由整合。[apache/casbin-gateway](https://github.com/apache/casbin-gateway) 和 [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) 是面向 Agent 流量的安全、策略和网关层的早期迹象。金融和销售领域的垂直 Agent——[alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot)、[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)、[HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)、[melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM)——显示自主 Agent 商务正在进入真实市场和聊天驱动型业务工作流。

---

## 4. 社区热点

- **Agent 技能/harness 优化：** [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)、[obra/superpowers](https://github.com/obra/superpowers)、[JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)、[DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail)、[affaan-m/ECC](https://github.com/affaan-m/ECC)。这些项目带来立竿见影的 token/成本和用户体验收益，并主导着今日的势头。
- **面向编码 Agent 的规范驱动开发：** [github/spec-kit](https://github.com/github/spec-kit)。一个由 GitHub 支持的工具包，今日 +1015 星标，它规范化了团队如何借助 AI 编码 Agent 进行指定、规划和执行。
- **持久记忆与上下文压缩：** [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)、[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)、[mem0ai/mem0](https://github.com/mem0ai/mem0)、[nashsu/llm_wiki](https://github.com/nashsu/llm_wiki)。这些项目直接解决上下文重置、token 膨胀和长时间运行 Agent 的可靠性问题。
- **图/无向量知识检索：** [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)、[VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex)、[HKUDS/LightRAG](https://github.com/HKUDS/LightRAG)。它们提供可解释、基于推理的替代方案，取代传统向量搜索和 RAG 流水线。
- **垂直自主 Agent：** [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot)、[HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)、[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)、[melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM)。Agent 商务、交易和聊天驱动型销售正成为自托管 AI Agent 的高风险垂直领域。

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*