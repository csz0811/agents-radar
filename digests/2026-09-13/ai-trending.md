# AI 开源趋势日报 2026-09-13

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-13 00:17 UTC

---

# AI 开源趋势报告 — 2026-09-13

**范围说明：** 趋势仓库已按 AI/ML 相关性筛选（`gods-eye-view`、`iloader`、`zapret-discord-youtube`、`Sonarr`、`SmartTube`、`OpenFlux`、`armorpaint` 等无关条目已排除）。80 仓库的主题搜索由各类别中最重要的项目代表，每类最多 8 行。

---

## 1. 今日亮点

今天属于 **agent harness 层**——技能、记忆、上下文压缩与编排——而不是基础模型：`ECC`（257,112 stars）、`hermes-agent`（244,902）和 `caveman`（105,244）均位居数据集顶部，`ponytail`、`claude-mem`、`headroom` 等 token 效率项目紧随其后。自主 **垂直智能体（vertical agents）** 正在进入真实、高风险领域，领跑者包括 `CloddsBot`（今日 +376，跨 1,000+ 市场交易）、`pentagi`（+189，渗透测试）和 `MathModelAgent`（+262，自动生成建模论文）。今日趋势榜上 AI 类增幅最大的单一项目是 `DeskcommCRM`（+504），一个自托管的 AI 原生 CRM，具备 MCP-ready agents 和 WhatsApp 集成——这表明 agentic 后台办公软件如今已成为主流开源目标。基础设施正围绕 **本地优先与提供商无关的管道** 整合：`ollama`、`anything-llm`、`picollm`、LLM API 代理和 MCP 安全网关。与此同时，"skills as files"（`SKILL.md`）已成为一种真正的分发格式，涵盖攻击性安全、代码库知识图谱和文档生成。

---

## 2. 各分类热门项目

### 🔧 AI 基础设施

| 项目 | 语言 | Stars（总计 / 今日） | 摘要 |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,760 | 本地 LLM 运行器，支持 Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等。其模型列表同时也可作为前沿开放权重发布的实时索引，使其成为自托管推理的默认入口。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,587 | 面向 LLM 管道的上下文 API，可大规模搜索、抓取并与 Web 交互。Web 到上下文的转换仍是影响智能体质量最具杠杆效应的基础设施层之一。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,211 | 面向最先进文本、视觉、音频和多模态模型的模型定义框架，同时适用于推理和训练。它仍是新的开放权重发布首先适配的经典集成目标。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,201 | 如今定位为“智能体工程平台”，而非链式调用库。其重新定位是一个清晰信号：框架层已围绕智能体、工具和记忆重新组织。 |
| [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) | Java | 13,077 | 面向 LLM 应用的惯用 JVM 库，支持工具调用（包括 MCP）、智能体和 RAG，并与 Quarkus 和 Spring Boot 集成。企业级 Java 如今已是一等智能体目标，而非事后移植的补充。 |
| [apache/casbin-gateway](https://github.com/apache/casbin-gateway) | Go | 623 | Casbin 面向 HTTP 流量的 AI 与 MCP 安全网关，在工具服务器前提供授权。它的出现表明 MCP 正从演示面转向需要策略执行的生产面。 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | Python | 550 | 通用 LLM 网关，暴露 OpenAI/Anthropic 兼容端点，并支持多提供商转换与智能负载均衡。提供商无关路由正成为标准管道，而非差异化优势。 |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | Rust | 0 (+54) | 专为并行 AI 智能体工作流设计的 Git worktree 管理 CLI。虽小但具代表性：开发者工具正围绕在单个仓库中并发运行多个智能体而重新设计。 |

### 🤖 AI 智能体 / 工作流

| 项目 | 语言 | Stars（总计 / 今日） | 摘要 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 257,112 | 智能体 harness 性能优化系统，为 Claude Code、Codex、Opencode 和 Cursor 增加技能、本能、记忆和安全能力。它是整个数据集中 Star 数最高的项目，确认了 harness 质量已成为新的竞争前沿。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,902 | “与你共同成长的智能体”，围绕持久、演进的智能体能力定位。它与 ECC 的规模表明，两个独立的 harness 生态各自吸引了六位数 Star 数。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,550 | 面向 agentic 工作流和 RAG 管道的协作工作空间，支持广泛的模型与工具，可部署在云端、VPC 或自托管。它仍是托管型智能体构建平台最强开源替代品。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,383 | 以浏览器作为动作空间来操作的智能体。浏览器控制正被证明是最普遍有用的智能体能力，因为大多数真实工作流最终都落在 Web UI 上。 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Go | 105,244 | Claude Code 技能，通过让智能体“像穴居人一样说话”削减约 65% 的 token。它是当今成本工程执念的最纯粹体现：相同答案，token 大幅减少。 |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 0 (+376) | 开源自主交易智能体，跨 Polymarket、Kalshi、Binance、Hyperliquid、Solana DEX 和五条 EVM 链运行，并带有用于机器对机器支付的 agent-commerce 协议。它是今日趋势榜上增幅最高的智能体，显示智能体正进入直接金融执行领域。 |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | 0 (+262) | 专为数学建模打造的智能体与技能集，可自主生成完整且可提交的论文。强劲的日增长（+262）表明，能够产出交付物的垂直智能体是一个快速增长的细分领域。 |
| [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) | Go | 0 (+189) | 面向复杂渗透测试任务的全自主多智能体系统。其增长势头表明，攻击性安全正成为全自主智能体循环在实践中被接受的首批领域之一。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总计 / 今日） | 摘要 |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,790 | 用户友好的 AI 界面，支持 Ollama 和 OpenAI 兼容 API。对于运行本地或私有模型的用户来说，它仍是事实上的自托管前端。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,843 | 使用 LLM 驱动的自动化工作流，从主题或关键词一键生成高清短视频。它持续证明，消费级内容自动化吸引的受众远多于开发者工具。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,378 | 本地 AI 求职工具，扫描招聘门户、将职位列表评分并整理为结构化 A–H 报告、定制简历，并在 Claude Code、Codex、OpenCode 或 Antigravity 中跟踪申请。它是 CLI 智能体被重新包装为单一用途消费产品的有力示例。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,886 | 将文档或主题转为原生 PowerPoint 演示文稿，包含真实形状、动画、图表、旁白和自定义 `.pptx` 模板。以交付物原生输出（可编辑文件，而非截图）作为差异化优势。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,733 | AI 生产力工作室，具备智能聊天、自主智能体和 300+ 助手，并统一接入前沿 LLM。多提供商访问加助手，如今已成为桌面 AI 客户端的基础功能集。 |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | 0 (+504) | 自托管、MCP-ready、多租户 CRM，具备原生 AI 智能体，并通过 WAHA 集成 WhatsApp，定位为 Kommo 和 Intercom 的开源替代品。它是今日趋势榜上 AI 类 Star 增幅最大的项目，清晰表明 agentic 垂直 SaaS 正在走向开源。 |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | Python | 33,315 | 来自 HKUDS 实验室的个人交易智能体。与 CloddsBot 一起表明，金融自主性是智能体应用中移动最快的垂直领域。 |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | 0 (+217) | 从 Claude Fable 5.1、Opus 5、Claude Code、ChatGPT GPT-6-Astra、Codex、Gemini 3.8 Flash 和 Grok 中提取的系统提示词，定期更新。它事实上成为前沿实验室如何组织智能体行为与护栏的参考。 |

### 🧠 LLM / 训练

| 项目 | 语言 | Stars（总计 / 今日） | 摘要 |
| :--- | :--- | ---: | :--- |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,959 | 张量与动态神经网络，具备强大的 GPU 加速。它仍是本报告中几乎所有训练与微调项目所构建于其上的基座。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,847 | 在 PyTorch 中逐步实现类 ChatGPT LLM。其持久人气反映出对第一性原理理解而非 API 使用的持续需求。 |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,830 | 约两小时从零训练一个 64M 参数 LLM。小型模型训练正成为实用的教学和原型开发常规手段，而不只是奇观。 |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | 0 (+210) | YuE2 提供前沿音乐生成，具备符号规划、零样本翻唱和 agentic 音乐编辑。它是少数每日获得关注的非文本前沿生成模型之一，凸显音频作为不断扩展的开放权重前沿。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,422 | LLM 评估平台，覆盖 Llama、Mistral、Qwen、GLM、Claude、GPT-4 等，跨 100+ 数据集。随着模型发布加速，标准化评估正日益成为瓶颈技能。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,561 | 通过用 Qwen 构建一个小型 vLLM，在 Apple Silicon 上教授 LLM 推理系统工程。它针对大多数 ML 课程未覆盖的系统工程师缺口。 |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 317 | 由 X-bit 量化驱动的端侧 LLM 推理。作为云 API 在隐私和延迟方面的答案，边缘推理持续吸引稳定关注。 |
| [AkaliKong/MiniOneRec](https://github.com/AkaliKong/MiniOneRec) | Python | 1,812 | OneRec 生成式推荐模型的最小复现。它标志着 LLM 架构与生产推荐系统日益融合。 |

### 🔍 RAG / 知识

| 项目 | 语言 | Stars（总计 / 今日） | 摘要 |
| :--- | :--- | ---: | :--- |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Python | 137,619 | 100+ 免费 AI 智能体、智能体技能和 RAG 应用精选集合。它是开发者选择要复制的检索或智能体模式时最常用的起点之一。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,249 | 通过确定性的本地 AST 解析，将代码库及其文档、SQL schema、配置和 PDF 转为可查询知识图谱，并解释每条边——无需向量存储。其规模使基于图谱、可解释的检索成为对 embedding-first RAG 最可信的挑战者。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 93,747 | 面向智能体的持久跨会话上下文：捕获会话活动，用 AI 压缩，并将相关记忆注入 Claude Code、Codex、Gemini、Copilot 等未来运行中。跨 harness 的记忆可移植性正成为关键需求。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,587 | 开源 RAG 引擎，将检索与智能体能力融合，为 LLM 形成上下文层。它仍是生产文档工作负载最完整的自托管 RAG 栈。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,756 | 在工具输出、日志、文件和 RAG 分块到达模型前进行压缩——编码智能体减少 20% token，JSON 减少 60–95%，答案保持一致。它以库、代理和 MCP 服务器形式提供，针对检索边界处的成本问题。 |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 65,962 | 本地优先的智能体体验，具备文档摄取、聊天，并以“拥有你的智能”为定位。它是私有文档问答最流行的打包方案。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,194 | 即插即用记忆基础设施，为智能体提供持久、生产级上下文。记忆正整合为独立的基础设施类别，既不同于 RAG，也不同于编排。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 46,076 | 高性能、云原生向量数据库，用于可扩展 ANN 搜索。即使无向量方法获得更多关注，它仍锚定持续增长的向量数据库层级。 |

---

## 3. 趋势信号分析

爆发式的社区关注正落在 **agent harness 层**——模型周围的技能、记忆、上下文和 token 经济学——而不是基础模型。`ECC`（257,112）和 `hermes-agent`（244,902）领跑整个数据集，而 `caveman`（105,244）、`ponytail`（136,617）、`claude-mem`（93,747）和 `headroom`（71,756）都在攻克同一个问题：更少 token、更长记忆、相同答案。上下文工程已成为一个产品类别。

今日可见的新方向包括以纯 `SKILL.md` 文件分发的技能（`Claude-Red` 用于攻击性安全，`graphify` 作为代码库到知识图谱技能）、用于运行并行智能体的 Git 工具（`worktrunk`）、MCP 安全网关（`casbin-gateway`），以及结构化或无向量检索（`PageIndex`、`graphify`），同时还有嵌入式进程内向量搜索（`alibaba/zvec`、`orama`）作为对重量级向量数据库的制衡。还出现了针对特定提供商的智能体调优——`DeepSeek-Reasonix` 围绕 prefix-cache 稳定性进行工程化——这表明 harness 正与各个模型家族协同设计。

近期发布推动着这种更替：`ollama` 的索引已覆盖 Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek、gpt-oss、Qwen 和 Gemma，而 `system_prompts_leaks` 追踪 Claude Fable 5.1、GPT-6-Astra 和 Gemini 3.8 Flash。前沿的快速刷新让提示词和 harness 工具瞬间过时——也瞬间有价值。垂直自主性也在变现：`CloddsBot` 推动用于机器对机器支付的 agent-commerce 协议，`pentagi` 将自主渗透测试推进到研究演示之外。

---

## 4. 社区热点

- **上下文与 token 经济学** — `caveman`、`headroom`、`claude-mem`、`ponytail`：当今最清晰的降本收益，分别应用于提示词、工具输出和会话记忆层。
- **Agent harness + 技能标准化** — `affaan-m/ECC`、`SnailSploit/Claude-Red`、`Graphify-Labs/graphify`、`max-sixty/worktrunk`：`SKILL.md` 正成为一种分发格式，harness 级工具如今在 Star 增速上已可与框架匹敌。
- **具有真实利害关系的自主垂直智能体** — `CloddsBot`、`HKUDS/Vibe-Trading`、`vxcontrol/pentagi`：交易和攻击性安全是全自主循环最先被部署的领域，涉及真金白银和真实攻击面。
- **MCP 安全与多提供商网关** — `apache/casbin-gateway`、`Mirrowel/LLM-API-Key-Proxy`、`iOfficeAI/AionUi`：随着 MCP 和多 CLI 工作流激增，授权、路由和聚合正成为新兴的管道缺口。
- **本地优先与边缘推理** — `ollama`、`Mintplex-Labs/anything-llm`、`Picovoice/picollm`、`alibaba/zvec`：隐私、延迟和成本使自托管栈保持竞争力，即使托管能力不断进步。

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*