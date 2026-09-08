# AI Open Source Trends 2026-09-09

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-08 22:47 UTC

---

# AI Open Source Trends Report — 2026-09-09

*Scope: Filtered to AI/ML-relevant projects from today’s GitHub Trending list and the AI topic-search snapshot. Non-AI repos such as `escrcpy` and the license-only `LunaTV` were excluded. For trending-only repos where total stars were not exposed in the source, the table shows `n/a` plus the reliable daily star delta.*

## 1. Today’s Highlights

Today’s AI open-source momentum has moved decisively to the agent layer. OpenAI shipped and promoted both a [Codex Skills catalog](https://github.com/openai/skills) and its [Plugins](https://github.com/openai/plugins) repository, while third-party Claude/Codex skill packs such as [diagram-design](https://github.com/cathrynlavery/diagram-design) and [marketing skills](https://github.com/coreyhaines31/marketingskills) are growing faster than most conventional frameworks. The single largest delta is [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) (+2,628), which turns HTML into agent-produced video — a sign that agent output is expanding from text/code to rich media. [microsoft/markitdown](https://github.com/microsoft/markitdown) (+2,045) confirms document-to-Markdown conversion is becoming essential LLM/RAG plumbing. The recurring theme is less “new model” and more “how to make agents reliable, context-aware and artifact-ready.”

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,478 | Local LLM runtime and model hub now surfaces newer open-weight models such as Kimi, GLM, MiniMax, DeepSeek, Qwen and Gemma. It remains the anchor for self-hosted inference in the current agent-heavy ecosystem. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,006 | Model-definition framework for training and inference across text, vision, audio and multimodal models. Its presence across every LLM/ML topic pull shows that a standard model interface still underpins the AI stack. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 178,011 | Search, scrape and interact with web pages at scale as a context API for LLMs. It is effectively agent infrastructure for turning the web into usable context. |
| [jo-inc/camofox-browser](https://github.com/jo-inc/camofox-browser) | JavaScript | n/a (+872) | Stealth headless browser designed for AI agents, positioned as a Puppeteer/Playwright replacement for bypassing bot detection and anti-scraping. Its rapid growth signals demand for reliable agent web access. |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | TypeScript | n/a (+652) | Context-window optimizer for AI coding agents, sandboxing tool output at a claimed 98% reduction. It also persists session memory and routes across 17 platforms via MCP and hooks, attacking agent context overload directly. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [openai/skills](https://github.com/openai/skills) | Python | n/a (+490) | Official Codex skills catalog, defining reusable agent abilities. Today’s growth shows OpenAI formalizing the “skills as code” layer for its coding agent. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 254,243 (+1,426) | Agent harness performance optimization system covering skills, instincts, memory, security and research-first development. It has the largest star base in this filtered set and remains one of the most momentum-heavy repos today. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 145,961 | The agent engineering platform for building LLM applications with tools, RAG and workflows. It remains steady infrastructure in the `ai-agent` and `llm` topic communities. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,071 | Collaborative workspace for building agentic workflows and RAG pipelines with rich model and tool support. Its continued topic-search visibility makes it a leading full-stack agent builder. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 113,443 (+320) | Makes websites accessible to AI agents and remains the most established browser automation layer for agent tasks. The additional trending bump shows ongoing mainstream adoption. |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | n/a (+446) | An agentic skills framework plus software development methodology. It treats agent behavior itself as a reusable, shareable framework rather than leaving it to model prompting. |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | n/a (+1,020) | Self-contained HTML/SVG editorial diagram types for Claude Code, Codex and Pi. Its “No Mermaid slop” positioning and +1,020 delta indicate rising demand for presentation-quality agent output. |
| [openai/plugins](https://github.com/openai/plugins) | JavaScript | n/a (+176) | Official OpenAI Plugins repository. Alongside the Skills catalog, it points to a standardized extension/plugin ecosystem around OpenAI’s agent tooling. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | n/a (+2,628) | “Write HTML. Render video. Built for agents.” It had the largest one-day delta in this dataset and opens a genuinely new agent output category: HTML-native video generation. |
| [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) | Python | n/a (+494) | Builds autonomous hedge funds via swarm intelligence and AI agents for market analysis, risk and trade execution. It shows vertical AI agents moving into high-stakes financial workflows. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 121,581 | Generates short videos from a topic or keyword using AI models and automated workflows. It remains the reference project for fully automated AI content production. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,376 | User-friendly, self-hosted AI interface supporting Ollama, OpenAI-compatible APIs and local models. It is the default open-source UI layer for many local LLM deployments. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,623 | Open-source AI job-search workflow that scans portals, scores listings in an A–H report and tailors CVs. It runs inside popular AI coding CLIs, showing agents applied directly to professional workflows. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,801 | LLM-powered multi-market stock analysis with real-time news, decision dashboards and automated push notifications. Its cost-free scheduled design makes it a strong practical AI-agent vertical. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,074 | Converts documents or topics into native PowerPoint decks with shapes, animations, charts and optional narration. It is a good indicator of agents moving into office artifact production. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,576 | AI productivity studio with smart chat, autonomous agents and 300+ assistants. It unifies access to frontier LLMs in a desktop-style app layer rather than a CLI-only workflow. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 59,881 | Train a 64M-parameter LLM from scratch in about two hours. It keeps the from-scratch training path accessible and is a popular hands-on education repo. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,402 | Open-source LLM evaluation platform covering 100+ datasets and a wide range of models. Evaluation tooling like this becomes more important as new open-weight models arrive at high frequency. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,553 | Build a tiny vLLM-style inference system plus Qwen on Apple Silicon. This is systems-level education for LLM inference and continues to attract infrastructure-minded developers. |
| [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) | Python | 3,090 | Implementation of MatMul-free LM research. Weight/architecture-level research remains a smaller but persistent part of the open-source AI landscape. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | n/a (+2,045) | Converts files and Office documents to Markdown for use by LLMs and agents. It earned one of today’s largest star jumps, reflecting how document ingestion has become core RAG/agent plumbing. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,056 | Turns codebases, docs, SQL schemas, configs and PDFs into a queryable knowledge graph using deterministic AST parsing and no vector store. It represents the emerging “vectorless/reasoning-based” RAG direction. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 93,490 | Captures agent session activity, compresses it with AI and injects relevant context into future sessions. It is effectively durable memory infrastructure for Claude Code, Codex, Gemini and other agents. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,311 | Open-source RAG engine fusing retrieval-augmented generation with agent capabilities. It remains one of the key self-hosted RAG platforms in the ecosystem. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 64,927 | Drop-in memory infrastructure for AI agents and applications with persistent context. It is the memory-layer counterpart to RAG systems and is gaining developer mindshare. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 46,026 | High-performance, cloud-native vector database for vector ANN search. It remains core infrastructure for production RAG and agent retrieval pipelines. |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 34,450 | High-performance vector database and search engine for AI applications. Its Rust foundation and scalable architecture keep it a leading alternative in the RAG stack. |
| [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex) | Python | 35,583 | Document index for vectorless, reasoning-based RAG. Its popularity signals a meaningful sub-trend: reducing reliance on vector databases in favor of structured context and reasoning. |

## 3. Trend Signal Analysis

Three strong signals emerge from today’s data.

First, the agent skills layer is overtaking model releases as the center of attention. OpenAI formalized [skills](https://github.com/openai/skills) and [plugins](https://github.com/openai/plugins) for Codex, while independent repos packaged agent judgment, output style and domain expertise as distributable artifacts: [diagram-design](https://github.com/cathrynlavery/diagram-design) gained +1,020, [superpowers](https://github.com/obra/superpowers) +446, [marketing skills](https://github.com/coreyhaines31/marketingskills) +666, and even behavioral skills such as [i-have-adhd](https://github.com/ayghri/i-have-adhd) +422. Developers are now treating prompts and agent harnesses like plugins.

Second, context is becoming the bottleneck. [ECC](https://github.com/affaan-m/ECC), [context-mode](https://github.com/mksglu/context-mode), [claude-mem](https://github.com/thedotmack/claude-mem) and [mem0](https://github.com/mem0ai/mem0) all work on compressing, persisting or sandboxing agent context. The aggressive 98% token-reduction claims suggest that context management, not raw model quality, is the next major performance battleground.

Third, browser and document access are being productized as agent middleware. [browser-use](https://github.com/browser-use/browser-use) is now a large stable base, [camofox-browser](https://github.com/jo-inc/camofox-browser) (+872) targets anti-bot and Cloudflare resistance, and [markitdown](https://github.com/microsoft/markitdown) (+2,045) makes ingestion reliable. Meanwhile, [hyperframes](https://github.com/heygen-com/hyperframes) (+2,628) explores HTML-to-video generation, and [Graphify](https://github.com/Graphify-Labs/graphify) plus [PageIndex](https://github.com/VectifyAI/PageIndex) demonstrate growing interest in vector-free RAG. Ollama’s updated model list — Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma — is a reminder that open-weight releases remain constant; once models are interchangeable, the agent harness becomes the moat.

## 4. Community Hot Spots

- **Agent skills / extension formats** — Watch [openai/skills](https://github.com/openai/skills) and [obra/superpowers](https://github.com/obra/superpowers). The ecosystem is moving from monolithic “agents” to composable, reusable skill directories, and early standardization will be valuable.
- **Context and memory infrastructure** — [context-mode](https://github.com/mksglu/context-mode), [mem0](https://github.com/mem0ai/mem0) and [claude-mem](https://github.com/thedotmack/claude-mem) address the real pain of long-running agent sessions. Durable memory and compressed tool output have immediate cost and reliability benefits.
- **Agentic web / browser layer** — [browser-use](https://github.com/browser-use/browser-use) and [camofox-browser](https://github.com/jo-inc/camofox-browser) show that web access is now core agent infrastructure. Expect an ongoing compliance and anti-bot arms race here.
- **Artifact-quality applications** — [diagram-design](https://github.com/cathrynlavery/diagram-design), [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) and [ppt-master](https://github.com/hugohe3/ppt-master) emphasize that agents must produce presentation-ready, visually rich output — not just correct text.
- **Vertical agent deployments** — [AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge), [career-ops](https://github.com/career-ops-hq/career-ops) and [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) apply agents directly to high-value jobs and financial decisions. These projects show the fastest path to real-world ROI, but also bring governance and risk-control concerns.

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*