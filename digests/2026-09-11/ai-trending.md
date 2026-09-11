# AI 开源趋势日报 2026-09-11

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-11 00:31 UTC

---

筛选说明：我排除了非 AI 的 trending 仓库，例如 `gods-eye-view`（间谍卫星模拟器）、`system-design-notes` 和 `armorpaint`（图形工具）。Trending 行使用来源的总 Star 数值原样呈现；当总 Star 显示为 `0` 时，今日新增 Star 数才是有用的动量信号。

## 1. 今日亮点

今天 AI 开源社区的注意力集中在 **agent harness 层**：技能、输出纪律、记忆、路由与 token 效率。`ayghri/i-have-adhd` 凭借一个小型编码智能体行为技能，今日 Star 暴涨 `+3882`；而 `obra/superpowers` 和 `vercel-labs/skills` 表明，可移植的智能体技能正在成为一种打包格式。本地/私有推理也依然强劲，`colibri`、`llmfit` 和 Ollama 表现突出；而像 `OmniRoute` 这样的多提供商网关正在回应模型碎片化问题。最后，垂直智能体持续成熟，交易、求职、股票分析、演示文稿和课堂智能体正以完整工作流而非演示的形式出现。

## 2. 按类别划分的热门项目

### 🔧 AI 基础设施

| 项目 | 语言 | Stars（总计 / 今日） | 概要 |
| :--- | :--- | ---: | :--- |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 0 (+626) | 免费 MIT AI 网关：单一端点、352 个提供商、1,200+ 模型、配额感知回退与 token 压缩。它之所以 trending，是因为多模型路由对编码智能体用户正变得不可或缺。 |
| [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit) | Rust | 0 (+258) | 一条命令即可找出数百个模型/提供商中哪些能在你的硬件上运行。它解决了本地 AI 在下载前判断模型适配性的实际问题。 |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | 0 (+98) | 纯 C、零依赖引擎，通过从磁盘流式加载 experts，在自有硬件上运行前沿 MoE 模型。这是无需云 GPU 即可本地推理前沿模型的强烈信号。 |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | 0 (+624) | 本地优先的 AI 编码智能体桌面端，使用 Electron、Rust 宿主核心和用户可安装插件构建。其早期 Star 表明市场对私有、可扩展编码智能体的需求。 |
| [vercel-labs/skills](https://github.com/vercel-labs/skills) | TypeScript | 0 (+122) | 通过 `npx skills` 运行的开源智能体技能工具。它表明技能正在成为智能体行为的可移植分发层。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,091 | 智能体工程平台，拥有面向 LLM 应用的广泛生态。它仍是 AI 应用栈中的默认框架参考。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,597 | 可让 Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 等模型在本地运行。它锚定着本地推理生态。 |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | Python | 550 | 通用 LLM 网关，提供 OpenAI/Anthropic 兼容端点、多提供商转换和智能负载均衡。它反映了对提供商无关基础设施的需求。 |

### 🤖 AI 智能体 / 工作流

| 项目 | 语言 | Stars（总计 / 今日） | 概要 |
| :--- | :--- | ---: | :--- |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+3882) | 一个技能，防止编码智能体把答案埋没，采用 ADHD 友好的输出方式。按新增 Star 计，它是今天最强的 AI 相关动量信号。 |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+732) | 一个智能体技能框架和软件开发方法论。它表明技能正被视为可复用的工程流程，而不只是 prompt。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,214 | “与你共同成长的智能体”，总 Star 数极高。它仍是一个里程碑式的开源智能体项目。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 255,893 | agent harness 性能优化系统，涵盖技能、本能、记忆、安全和研究优先的开发。其巨大的 Star 数表明围绕 Claude Code、Codex、Cursor 及类似工具的 harness 层竞争。 |
| [Tencent/teamai-cli](https://github.com/Tencent/teamai-cli) | TypeScript | 0 (+841) | 腾讯推出的“Make Every Team AI Native” CLI。它表明企业对跨团队标准化 AI 工作流的兴趣。 |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | TypeScript | 0 (+837) | 开放多智能体互动课堂，支持一键式沉浸式多智能体学习。这是来自大学实验室的值得关注的垂直多智能体工作流。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,081 | 将浏览器作为行动界面的智能体。浏览器自动化仍是最清晰的智能体接口之一。 |
| [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | Python | 47,993 | 超轻量、自托管的个人 AI 智能体框架，具备 WebUI、工具、记忆、MCP 和多智能体工作流。它服务于日益增长的自托管个人智能体细分领域。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总计 / 今日） | 概要 |
| :--- | :--- | ---: | :--- |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 0 (+277) | 开源 AI 交易智能体，覆盖 1,000+ 市场，包括 Polymarket、Kalshi、Binance、Hyperliquid、Solana DEX 和 EVM 链。它还提出了一种用于机器对机器支付的智能体商业协议。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,899 | 由 LLM 驱动的多市场股票分析系统，具备多源数据、实时新闻、仪表盘和自动通知。它表明垂直金融智能体正走向零成本定时运行。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,541 | AI 将文档或主题转换为原生 PowerPoint 演示文稿，包含形状、切换、图表、旁白和自定义模板。它是文档到交付物自动化领域的高 Star 示例。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,141 | 开源 AI 求职工具，在 AI 编码 CLI 中本地扫描招聘门户、给职位打分、定制简历并跟踪申请。它打包了完整的垂直工作流，而非单一 prompt。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,652 | AI 生产力工作室，具备智能聊天、自主智能体和 300+ 助手，覆盖前沿 LLM。它作为多模型工作的统一桌面前端参与竞争。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,236 | 通过自动化 AI 工作流，从主题或关键词生成高清短视频。其庞大的 Star 数表明生成式媒体管线的需求持续存在。 |
| [acon96/home-llm](https://github.com/acon96/home-llm) | Python | 1,431 | Home Assistant 集成与模型，用本地 LLM 控制智能家居。它是面向私有家庭自动化的具体边缘 AI 应用。 |
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | JavaScript | 0 (+962) | 面向 GPT Image 2/2.5 的 prompt-as-code 库，包含 530+ 案例、20+ 行业模板和可复用技能。其强劲的 trending 信号表明，随着模型升级加速，prompt 资产库正变得有价值。 |

### 🧠 大语言模型 / 训练

| 项目 | 语言 | Stars（总计 / 今日） | 概要 |
| :--- | :--- | ---: | :--- |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,546 | 只需两小时即可从零训练一个 64M 参数 LLM。它仍是动手进行 LLM 训练的热门入口。 |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,415 | LLM 评估平台，支持 Llama、Mistral、InternLM、GPT-4、Qwen、GLM、Claude 和 100+ 数据集。随着模型选择激增，评估正变得越来越关键。 |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,557 | 通过构建一个小型 vLLM + Qwen，在 Apple Silicon 上教授 LLM 推理系统。它面向希望深入了解推理栈的系统工程师。 |
| [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) | Python | 3,090 | MatMul-free LM 的实现。它表明人们对更便宜、更高效的模型架构持续感兴趣。 |
| [AkaliKong/MiniOneRec](https://github.com/AkaliKong/MiniOneRec) | Python | 1,807 | OneRec 的最小复现。推荐系统规模模型的可复现性正获得关注。 |
| [LiberCoders/FeatureBench](https://github.com/LiberCoders/FeatureBench) | Python | 92 | ICLR 2026 基准，用于复杂功能开发的智能体编码。它为编码智能体提供了新的度量层。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,090 | 面向最先进文本、视觉、音频和多模态模型的模型定义框架。它仍是几乎所有模型工作的基础基础设施。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,713 | 用 PyTorch 一步步实现类 ChatGPT LLM。它继续主导实用的 LLM 教育。 |

### 🔍 RAG / 知识

| 项目 | 语言 | Stars（总计 / 今日） | 概要 |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,722 | 将任何代码库、文档、SQL schema、配置和 PDF 转换为可查询知识图谱。它使用本地确定性 AST 解析，并明确避免向量存储，使其成为关键的 vectorless-RAG 信号。 |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 93,643 | 为每个智能体提供跨会话的持久上下文：捕获活动、压缩活动，并将相关上下文注入未来会话。它解决了编码智能体的记忆缺口。 |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,465 | 领先的开源 RAG 引擎，将 RAG 与 Agent 能力融合，提供更优的上下文层。它仍是检索领域生产级参考。 |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,078 | 面向 AI 智能体和应用的即插即用记忆基础设施，为生产级持久上下文而构建。它表明记忆正成为独立的基础设施层。 |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Python | 39,550 | EMNLP2025 简单快速的检索增强生成。对于希望避免更重 RAG 栈的团队来说，它是轻量级替代方案。 |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,619 | 面向 vectorless、基于推理的 RAG 的文档索引。它是摆脱纯 embedding 搜索潮流的一部分。 |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 46,047 | 高性能云原生向量数据库，用于可扩展 ANN 搜索。它仍是规模化检索的核心基础设施。 |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | 0 (+142) | 跨平台桌面应用，自动将文档转换为有组织、互相链接的知识库。它不进行重复 RAG，而是增量构建并维护持久 wiki。 |

## 3. 趋势信号分析

今天的重心不是新的基础模型，而是 **agent harness**：技能、记忆、路由和 token 纪律。`i-have-adhd`（`+3882`）是最清晰的例子——一个面向编码智能体的小型行为技能，表现超过了大多数以模型为中心的仓库。`obra/superpowers`、`vercel-labs/skills`、`ECC`、`Ponytail`、`Caveman` 和 `headroom` 都指向一个新兴层，用于打包智能体行为、记忆和压缩。社区正在优化智能体的运行和响应方式，而不只是它们调用哪个模型。

其次，本地/私有推理正在扩展。`JustVugg/colibri` 以纯 C 从磁盘流式加载 MoE experts；`AlexsJones/llmfit` 将模型与硬件相匹配；Ollama 仍是默认本地运行器；`LEANN`、`zvec` 和 `home-llm` 展示了存储高效、进程内和边缘部署。这是对前沿模型定价在成本与隐私方面的回应。

第三，多提供商网关和垂直智能体正在成熟。`OmniRoute`、`LLM-API-Key-Proxy` 和 `Casbin gateway` 抽象了数百个提供商、配额以及 MCP/A2A 安全。`CloddsBot`、`Vibe-Trading`、`daily_stock_analysis`、`career-ops` 和 `PPT Master` 将智能体变成具有可衡量输出的领域产品。Claude、Kimi、GLM、DeepSeek、Gemini、GPT 和编码 CLI 出现在同一套栈中，表明模型碎片化已成为常态。

最后，RAG 正从纯向量检索转向持久记忆和知识图谱。`Graphify`、`claude-mem`、`mem0`、`cognee`、`PageIndex` 和 `LightRAG` 强调上下文连续性、基于推理的索引和 token 压缩。信号很明确：下一个竞争优势不只是检索，而是能够跨会话存续的持久、高效上下文。

## 4. 社区热点

- **智能体技能标准化**：[vercel-labs/skills](https://github.com/vercel-labs/skills)、[obra/superpowers](https://github.com/obra/superpowers)、[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)。跨 Claude Code、Codex、Cursor 及类似工具的可移植技能正在成为一种新的分发层。
- **上下文与 token 效率**：[thedotmack/claude-mem](https://github.com/thedotmack/claude-mem)、[mem0ai/mem0](https://github.com/mem0ai/mem0)、[headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom)、[JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman)。成本、延迟和上下文窗口压力正在推动压缩与持久记忆工具的发展。
- **本地/私有推理**：[JustVugg/colibri](https://github.com/JustVugg/colibri)、[AlexsJones/llmfit](https://github.com/AlexsJones/llmfit)、[ollama/ollama](https://github.com/ollama/ollama)、[StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN)。在自有硬件上运行有能力的模型，正从新奇事物变为实际需求。
- **多提供商 AI 网关**：[diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)、[Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy)、[apache/casbin-gateway](https://github.com/apache/casbin-gateway)。模型碎片化、配额管理以及 MCP/A2A 安全，使网关基础设施日益重要。
- **垂直自主智能体**：[alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot)、[ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)、[career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops)、[hugohe3/ppt-master](https://github.com/hugohe3/ppt-master)。具有清晰 ROI 和端到端工作流的领域专用智能体，正吸引开发者的强烈关注。

---

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*