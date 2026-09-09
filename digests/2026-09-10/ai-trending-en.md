# AI Open Source Trends 2026-09-10

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-09 22:46 UTC

---

# AI Open Source Trends Report — 2026-09-10

> Note: Star values are taken from the provided sources. For repos appearing in both the Trending and Topic Search data, the Topic Search total is shown with the Trending daily delta. `0 (+N)` entries are trending-only in the source data.

## 1. Today's Highlights

Today's AI open-source activity is unusually concentrated around **agent skills and coding-agent harnesses**, not just models. Repos like `i-have-adhd`, `diagram-design`, `superpowers`, `ECC`, and `PI-Desktop` show that developers are now packaging behavior, context, and guardrails for agents such as Claude Code, Codex, and Cursor. At the same time, enterprise and local-first tooling is gaining momentum: Tencent's `teamai-cli` climbed quickly, while `PI-Desktop` offers a fully local Electron + Rust agent desktop. Vertical AI use-cases also remain strong in finance, CAD/3D design, and image generation. In the RAG space, several leading projects are moving beyond vector search toward knowledge graphs, reasoning-based retrieval, and context compression.

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,531 | The de facto local LLM runtime for open-weight models. Its README already tracks fast-moving releases like Kimi, GLM, DeepSeek, Qwen, and Gemma, making it central infrastructure for many agent and RAG projects. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,022 | The leading agent-engineering framework for model, tool, retrieval, and memory orchestration. It remains the default substrate for production LLM applications and is now absorbing the new "skills" pattern emerging across the ecosystem. |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,573 | A modular Rust framework for building scalable LLM applications. Its steady traction signals growing interest in systems-language AI infrastructure rather than Python-only stacks. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,555 | A hands-on project that builds a miniature vLLM + Qwen inference system on Apple Silicon. It is especially useful for engineers who want to understand inference internals without reading a full production codebase. |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | Python | 549 | A universal LLM gateway providing OpenAI- and Anthropic-compatible endpoints with multi-provider translation and load balancing. This is a strong signal that teams are treating multiple LLM backends as normal infrastructure. |
| [apache/casbin-gateway](https://github.com/apache/casbin-gateway) | Go | 622 | A Casbin-based AI and MCP security gateway for HTTP APIs. Its appearance in the LLM/MCP topic highlights growing demand for authorization and access control around agent tooling. |
| [openai/plugins](https://github.com/openai/plugins) | JavaScript | 0 (+505) | OpenAI's official plugin reference repository. The sudden daily spike suggests renewed interest in plugin and tool-extensibility standards as MCP and agent skills become mainstream. |
| [Tencent/teamai-cli](https://github.com/Tencent/teamai-cli) | TypeScript | 0 (+563) | Tencent's CLI for making teams "AI native." It gained over 500 stars today, showing that large vendors are shipping AI developer workflows rather than only models. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+4,624) | A skill that stops coding agents from burying the answer, designed for ADHD-friendly output. It earned the largest daily star spike on today's list, proving that agent output quality and readability are major user pain points. |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+2,286) | A library of 38 editorial diagram types for Claude Code, Codex, and Pi. Its popularity shows demand for polished, self-contained HTML/SVG visuals instead of generic "Mermaid slop." |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 255,121 (+1,151) | A performance optimization system for agent harnesses, adding skills, instincts, memory, security, and research-first workflows. It has a very large total star base and is still gaining quickly today. |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+690) | An agentic skills framework and software development methodology. The fast star growth signals that coding-agent behavior is becoming a distributable, reusable product. |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | 0 (+393) | A local-first desktop AI coding agent with an Electron + Rust host core, agent harness, and user-installable plugins. It reflects the shift toward locally owned, desktop-based agent environments. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 113,953 | The leading open-source library for letting agents drive a real browser. It remains core infrastructure for web automation, research agents, and workflow agents. |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | Python | 41,336 | A framework for building resilient, stateful, multi-step agents. LangGraph is now the orchestration layer of choice for many production agent applications built on LangChain. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 243,841 | Described as "the agent that grows with you." Its huge star count shows that memory, adaptation, and persistent personalization are becoming defining features of next-generation agent runtimes. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | 0 (+367) | A multi-agent LLM framework for financial trading. Its reappearance on the trending list confirms finance as one of the fastest vertical adopters of agent workflows. |
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | JavaScript | 0 (+612) | An industrial prompt-as-code engine and template library for GPT-Image2, with 530+ reverse-engineered cases and 20+ production templates. The project introduces repeatable, code-like control for image-generation workflows. |
| [earthtojake/text-to-cad](https://github.com/earthtojake/text-to-cad) | Python | 0 (+97) | A library of agent skills for CAD, CAE, and CAM. It is a strong signal that engineering simulation and design tools are being packaged for AI agents. |
| [pascalorg/editor](https://github.com/pascalorg/editor) | TypeScript | 0 (+171) | An open-source 3D architectural editor with a local CLI, MCP tools, and agent workflows. The "+171 today" move highlights the emerging category of MCP-native creative/design applications. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,774 | An open-source AI job-search agent that scans portals, scores listings, and tailors CVs locally inside coding CLIs. It is one of the clearest examples of an agent solving a practical, personal workflow. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,845 | An LLM-powered multi-market stock analysis system with real-time news, dashboards, and automated alerts. Together with TradingAgents, it shows finance is a leading AI open-source use case. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,329 | Turns documents or topics into native PowerPoint decks with charts, transitions, and audio narration. It shows AI applications moving beyond text generation into structured, design-rich output artifacts. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,612 | An AI productivity studio with smart chat, autonomous agents, and 300+ assistants. It represents the consolidation of multiple agent experiences into a single desktop application. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,042 | The central model-definition and fine-tuning framework for open-source AI. It remains the primary gateway for turning newly released models into usable infrastructure. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,878 | The foundational deep learning framework underpinning most LLM training and fine-tuning. Its presence in the weekly ML topic search shows the continued gravity of training infrastructure. |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,287 | A minimalist project that trains a 64M-parameter LLM from scratch in roughly two hours. It is a major sign that small-model training and hands-on education have become mainstream open-source content. |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | Python | 53,649 (+382) | An end-to-end "learn it, build it, ship it" AI engineering resource. It gained 382 stars today, indicating continued hunger for project-based AI education. |
| [opencompass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,404 | An LLM evaluation platform supporting 100+ datasets and dozens of major model families. As open model releases accelerate, robust evaluation infrastructure becomes more important. |
| [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) | Python | 3,090 | An implementation of MatMul-free language models. It draws attention to alternate architectures and efficiency research outside the mainstream transformer stack. |
| [AkaliKong/MiniOneRec](https://github.com/AkaliKong/MiniOneRec) | Python | 1,806 | A minimal reproduction of OneRec, showing how LLM-style architectures can be applied to recommendation. The ML-systems angle makes this a useful research starting point. |
| [testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io) | HTML | 113 | A survey hub on test-time scaling in LLMs. Although small in stars, it tracks one of the most important inference-time compute trends after recent reasoning-model releases. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,474 | The most popular user-friendly front end for local AI, with support for Ollama, OpenAI-compatible APIs, and RAG. It remains a default gateway for self-hosted knowledge assistants. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,384 | Turns codebases, docs, PDFs, and SQL schemas into queryable knowledge graphs using deterministic local AST parsing, with no vector store. It is one of the strongest markers of the vectorless RAG movement. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 93,579 | Captures everything an agent does, compresses it, and injects relevant context into future sessions across multiple agent CLIs. This is the emerging "context memory layer" for coding agents. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,391 | A leading open-source RAG engine that combines retrieval-augmented generation with agent capabilities. It remains one of the most complete self-hosted RAG systems available. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,073 | Compresses tool outputs, logs, files, and RAG chunks before they reach the LLM. With claims of 20% token savings on coding agents and 60-95% on JSON, it directly addresses LLM context cost and latency. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,008 | The "memory layer for AI agents," providing persistent production-grade context across sessions. It is increasingly essential as agents move from stateless demos to long-running workflows. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 52,100 | A leading document agent and OCR platform for connecting private data to LLMs. It continues to be a major tool for RAG pipelines and knowledge-heavy applications. |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,604 | A document index designed for vectorless, reasoning-based RAG. Its popularity signals a shift from embedding similarity toward structured, interpretable retrieval. |

## 3. Trend Signal Analysis

The most explosive community attention today is going to a new layer of AI tooling that sits **on top of coding agents**: agent skills, agent harnesses, and agent context systems. Projects like `i-have-adhd`, `diagram-design`, `superpowers`, `ECC`, and `PI-Desktop` are not models or generic frameworks; they are opinionated, reusable behavior packages for Claude Code, Codex, Cursor, and similar CLIs. This is the beginning of what looks like a package-manager ecosystem for agent conduct: developers are now shipping communication style, memory, diagram output, and security behavior as installable skills.

A second clear signal is the shift toward **local-first and MCP-native applications**. Tencent's `teamai-cli`, `PI-Desktop`, `pascalorg/editor`, and `text-to-cad` all treat MCP and local developer workflows as the integration surface. This aligns with the broader industry push toward agents that control real local tools instead of only chatting.

Third, RAG is rapidly moving beyond vector databases. High-star projects such as `Graphify`, `PageIndex`, and `headroom` advocate for knowledge graphs, deterministic parsing, token compression, and reasoning-based retrieval. That trend connects directly to recent LLM releases: as open-weight models improve, the core value is no longer model access but clean, compressed, and structured context delivered to the model.

## 4. Community Hot Spots

- **Agent skills and behavior packages**: [i-have-adhd](https://github.com/ayghri/i-have-adhd), [diagram-design](https://github.com/cathrynlavery/diagram-design), and [superpowers](https://github.com/obra/superpowers) show the strongest daily momentum because they change how agents communicate and work. This direction is likely to become a "marketplace" layer for coding agents.

- **Agent performance harnesses**: [ECC](https://github.com/affaan-m/ECC) and [PI-Desktop](https://github.com/vastsa/PI-Desktop) are worth close attention because they combine memory, security, skills, and local execution into one system. If this pattern consolidates, it could become the "operating system" for agentic coding.

- **Context and memory infrastructure**: [claude-mem](https://github.com/thedotmack/claude-mem), [mem0](https://github.com/mem0ai/mem0), and [headroom](https://github.com/headroomlabs-ai/headroom) are attacking the agent context bottleneck from different angles: capture, persistence, and compression. Developers building long-running agents should watch these closely.

- **Vectorless knowledge RAG**: [Graphify](https://github.com/Graphify-Labs/graphify), [PageIndex](https://github.com/VectifyAI/PageIndex), and [LEANN](https://github.com/StarTrail-org/LEANN) point to a future where retrieval is more structured and less dependent on dense embeddings. These projects could redefine the architecture of future RAG systems.

- **Vertical agent applications**: [TradingAgents](https://github.com/TauricResearch/TradingAgents), [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis), [text-to-cad](https://github.com/earthtojake/text-to-cad), and [awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) demonstrate that the fastest-growing community demand is for domain-specific agent workflows, not only general-purpose assistants.

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*