# AI Open Source Trends 2026-09-11

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-11 00:31 UTC

---

Filtering note: I excluded non-AI trending repos such as `gods-eye-view` (spy satellite simulator), `system-design-notes`, and `armorpaint` (graphics tool). Trending rows use the source’s total-star values verbatim; where total stars appear as `0`, today’s new-star count is the useful momentum signal.

## 1. Today's Highlights

Today’s AI open-source attention is concentrated on the **agent harness layer**: skills, output discipline, memory, routing, and token efficiency. `ayghri/i-have-adhd` exploded with `+3882` today stars for a small coding-agent behavior skill, while `obra/superpowers` and `vercel-labs/skills` show that portable agent skills are becoming a packaging format. Local/private inference also remains strong via `colibri`, `llmfit`, and Ollama, and multi-provider gateways like `OmniRoute` are responding to model fragmentation. Finally, vertical agents continue to mature, with trading, job-search, stock-analysis, presentation, and classroom agents appearing as complete workflows rather than demos.

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 0 (+626) | Free MIT AI gateway: one endpoint, 352 providers, 1,200+ models, quota-aware fallback, and token compression. It is trending because multi-model routing is becoming mandatory for coding-agent users. |
| [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit) | Rust | 0 (+258) | One command finds which of hundreds of models/providers run on your hardware. It addresses the practical local-AI question of model fit before download. |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | 0 (+98) | Pure C, zero-dependency engine that runs frontier MoE models on owned hardware by streaming experts from disk. Strong signal for local frontier-model inference without cloud GPUs. |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | 0 (+624) | Local-first AI coding agent desktop built with Electron, Rust host core, and user-installable plugins. Its early stars show demand for private, extensible coding agents. |
| [vercel-labs/skills](https://github.com/vercel-labs/skills) | TypeScript | 0 (+122) | Open agent skills tool run via `npx skills`. It points to skills becoming a portable distribution layer for agent behavior. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,091 | The agent engineering platform with a broad ecosystem for LLM apps. It remains a default framework reference in the AI application stack. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,597 | Gets Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma, and other models running locally. It anchors the local-inference ecosystem. |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | Python | 550 | Universal LLM gateway with OpenAI/Anthropic-compatible endpoints, multi-provider translation, and intelligent load balancing. It reflects demand for provider-agnostic infrastructure. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+3882) | A skill that stops coding agents from burying the answer, using ADHD-friendly output. It is today’s strongest AI-adjacent momentum signal by new stars. |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+732) | An agentic skills framework and software-development methodology. It shows skills are being treated as reusable engineering process, not just prompts. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,214 | “The agent that grows with you” with a very large total star count. It remains a landmark open agent project. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 255,893 | Agent harness performance optimization system covering skills, instincts, memory, security, and research-first development. Its huge star count signals harness-level competition around Claude Code, Codex, Cursor, and similar tools. |
| [Tencent/teamai-cli](https://github.com/Tencent/teamai-cli) | TypeScript | 0 (+841) | “Make Every Team AI Native” CLI from Tencent. It indicates enterprise interest in standardizing AI workflows across teams. |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | TypeScript | 0 (+837) | Open Multi-Agent Interactive Classroom for one-click immersive multi-agent learning. It is a notable vertical multi-agent workflow from a university lab. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,081 | Agents that use the browser as their action surface. Browser automation remains one of the clearest agent interfaces. |
| [HKUDS/nanobot](https://github.com/HKUDS/nanobot) | Python | 47,993 | Ultra-lightweight, self-hosted personal AI agent framework with WebUI, tools, memory, MCP, and multi-agent workflows. It serves the growing self-hosted personal-agent niche. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 0 (+277) | Open-source AI trading agent operating across 1,000+ markets, including Polymarket, Kalshi, Binance, Hyperliquid, Solana DEXs, and EVM chains. It also proposes an agent commerce protocol for machine-to-machine payments. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,899 | LLM-powered multi-market stock analysis system with multi-source data, real-time news, dashboards, and automated notifications. It shows vertical finance agents moving toward zero-cost scheduled operation. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,541 | AI turns documents or topics into native PowerPoint decks with shapes, transitions, charts, narration, and custom templates. It is a high-star example of document-to-deliverable automation. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,141 | Open-source AI job search that scans portals, scores listings, tailors CVs, and tracks applications locally inside AI coding CLIs. It packages a full vertical workflow rather than a single prompt. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,652 | AI productivity studio with smart chat, autonomous agents, and 300+ assistants across frontier LLMs. It competes as a unified desktop front end for multi-model work. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,236 | Generates HD short videos from a topic or keyword using an automated AI workflow. Its large star count shows continued demand for generative-media pipelines. |
| [acon96/home-llm](https://github.com/acon96/home-llm) | Python | 1,431 | Home Assistant integration and model to control a smart home with a local LLM. It is a concrete edge-AI application for private home automation. |
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | JavaScript | 0 (+962) | Prompt-as-code library for GPT Image 2/2.5 with 530+ cases, 20+ industrial templates, and reusable skills. Its strong trending signal shows prompt asset libraries are becoming valuable as model upgrades accelerate. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,546 | Train a 64M-parameter LLM from scratch in just two hours. It remains a popular entry point for hands-on LLM training. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,415 | LLM evaluation platform supporting Llama, Mistral, InternLM, GPT-4, Qwen, GLM, Claude, and 100+ datasets. Evaluation is increasingly critical as model choices multiply. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,557 | Teaches LLM inference systems on Apple Silicon by building a tiny vLLM + Qwen. It targets systems engineers who want deeper inference-stack knowledge. |
| [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) | Python | 3,090 | Implementation for MatMul-free LM. It signals continued interest in cheaper, more efficient model architectures. |
| [AkaliKong/MiniOneRec](https://github.com/AkaliKong/MiniOneRec) | Python | 1,807 | Minimal reproduction of OneRec. Reproducibility of recommender-scale models is gaining attention. |
| [LiberCoders/FeatureBench](https://github.com/LiberCoders/FeatureBench) | Python | 92 | ICLR 2026 benchmark for agentic coding of complex feature development. It provides a new measurement layer for coding agents. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,090 | The model-definition framework for state-of-the-art text, vision, audio, and multimodal models. It remains foundational infrastructure for nearly all model work. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,713 | Implement a ChatGPT-like LLM in PyTorch step by step. It continues to dominate practical LLM education. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,722 | Turns any codebase, docs, SQL schemas, configs, and PDFs into a queryable knowledge graph. It uses local deterministic AST parsing and explicitly avoids a vector store, making it a key vectorless-RAG signal. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 93,643 | Persistent context across sessions for every agent: captures activity, compresses it, and injects relevant context into future sessions. It addresses the memory gap in coding agents. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,465 | Leading open-source RAG engine that fuses RAG with Agent capabilities for a superior context layer. It remains a production-grade reference in retrieval. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,078 | Drop-in memory infrastructure for AI agents and apps, built for production persistent context. It shows memory is becoming a separate infrastructure layer. |
| [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG) | Python | 39,550 | EMNLP2025 simple and fast retrieval-augmented generation. It is a lightweight alternative for teams avoiding heavier RAG stacks. |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,619 | Document index for vectorless, reasoning-based RAG. It is part of the push away from pure embedding search. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 46,047 | High-performance, cloud-native vector database for scalable ANN search. It remains core infrastructure for retrieval at scale. |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | 0 (+142) | Cross-platform desktop app that turns documents into an organized, interlinked knowledge base automatically. Instead of repeated RAG, it incrementally builds and maintains a persistent wiki. |

## 3. Trend Signal Analysis

Today’s center of gravity is not a new base model but the **agent harness**: skills, memory, routing, and token discipline. `i-have-adhd` (`+3882`) is the clearest example—a small behavior skill for coding agents outperformed most model-centric repos. `obra/superpowers`, `vercel-labs/skills`, `ECC`, `Ponytail`, `Caveman`, and `headroom` all point to an emerging layer that packages agent behavior, memory, and compression. The community is optimizing how agents run and respond, not just which model they call.

Second, local/private inference is broadening. `JustVugg/colibri` streams MoE experts from disk in pure C; `AlexsJones/llmfit` matches models to hardware; Ollama remains a default local runner; `LEANN`, `zvec`, and `home-llm` show storage-efficient, in-process, and edge deployments. This is a cost and privacy response to frontier-model pricing.

Third, multi-provider gateways and vertical agents are maturing. `OmniRoute`, `LLM-API-Key-Proxy`, and `Casbin gateway` abstract hundreds of providers, quotas, and MCP/A2A security. `CloddsBot`, `Vibe-Trading`, `daily_stock_analysis`, `career-ops`, and `PPT Master` turn agents into domain products with measurable outputs. The mention of Claude, Kimi, GLM, DeepSeek, Gemini, GPT, and coding CLIs in one stack shows model fragmentation is now the norm.

Finally, RAG is shifting from vector-only retrieval to persistent memory and knowledge graphs. `Graphify`, `claude-mem`, `mem0`, `cognee`, `PageIndex`, and `LightRAG` emphasize context continuity, reasoning-based indexing, and token compression. The signal is clear: the next competitive edge is not just retrieval, but durable, efficient context that survives sessions.

## 4. Community Hot Spots

- **Agent skills standardization**: [vercel-labs/skills](https://github.com/vercel-labs/skills), [obra/superpowers](https://github.com/obra/superpowers), [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd). Portable skills across Claude Code, Codex, Cursor, and similar tools are becoming a new distribution layer.
- **Context and token efficiency**: [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem), [mem0ai/mem0](https://github.com/mem0ai/mem0), [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom), [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman). Cost, latency, and context-window pressure are driving compression and persistent-memory tooling.
- **Local/private inference**: [JustVugg/colibri](https://github.com/JustVugg/colibri), [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit), [ollama/ollama](https://github.com/ollama/ollama), [StarTrail-org/LEANN](https://github.com/StarTrail-org/LEANN). Running capable models on owned hardware is moving from novelty to practical requirement.
- **Multi-provider AI gateways**: [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute), [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy), [apache/casbin-gateway](https://github.com/apache/casbin-gateway). Model fragmentation, quota management, and MCP/A2A security make gateway infrastructure increasingly important.
- **Vertical autonomous agents**: [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot), [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis), [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops), [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master). Domain-specific agents with clear ROI and end-to-end workflows are attracting strong developer attention.

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*