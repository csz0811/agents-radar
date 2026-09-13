# AI Open Source Trends 2026-09-13

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-13 00:17 UTC

---

# AI Open Source Trends Report — 2026-09-13

**Scope note:** Trending repos were filtered for AI/ML relevance (unrelated items such as `gods-eye-view`, `iloader`, `zapret-discord-youtube`, `Sonarr`, `SmartTube`, `OpenFlux`, `armorpaint` were excluded). The 80-repo topic search is represented by the most significant projects per category, capped at 8 rows each.

---

## 1. Today's Highlights

The day belongs to the **agent harness layer** — skills, memory, context compression and orchestration — rather than to base models: `ECC` (257,112 stars), `hermes-agent` (244,902) and `caveman` (105,244) all sit at the top of the dataset, with token-efficiency projects like `ponytail`, `claude-mem` and `headroom` close behind. Autonomous **vertical agents** are shipping into real, high-stakes domains, led by `CloddsBot` (+376 today, trading across 1,000+ markets), `pentagi` (+189, penetration testing) and `MathModelAgent` (+262, auto-generating modeling papers). The single largest AI gainer on today's trending list is `DeskcommCRM` (+504), a self-hosted AI-native CRM with MCP-ready agents and WhatsApp integration — a sign that agentic back-office software is now a mainstream open-source target. Infrastructure is consolidating around **local-first and provider-agnostic plumbing**: `ollama`, `anything-llm`, `picollm`, LLM API proxies and MCP security gateways. Meanwhile, "skills as files" (`SKILL.md`) has become a genuine distribution format, spanning offensive security, codebase knowledge graphs and document generation.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,760 | Local LLM runner supporting Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and more. Its model roster doubles as a live index of frontier open-weight releases, making it the default on-ramp for self-hosted inference. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,587 | Context API that searches, scrapes and interacts with the web at scale for LLM pipelines. Web-to-context conversion remains one of the highest-leverage infrastructure layers for agent quality. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,211 | The model-definition framework for state-of-the-art text, vision, audio and multimodal models, for inference and training alike. It is still the canonical integration target that new open-weight releases ship against first. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,201 | Now positioned as "the agent engineering platform" rather than a chain library. Its repositioning is a clear signal that the framework layer has reorganized around agents, tools and memory. |
| [langchain4j/langchain4j](https://github.com/langchain4j/langchain4j) | Java | 13,077 | Idiomatic JVM library for LLM apps with tool calling (including MCP), agents and RAG, integrating with Quarkus and Spring Boot. Enterprise Java is now a first-class agent target, not a porting afterthought. |
| [apache/casbin-gateway](https://github.com/apache/casbin-gateway) | Go | 623 | Casbin's AI and MCP security gateway for HTTP traffic, providing authz in front of tool servers. Its appearance tracks MCP moving from demo surface to production surface that needs policy enforcement. |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | Python | 550 | Universal LLM gateway exposing OpenAI/Anthropic-compatible endpoints with multi-provider translation and intelligent load balancing. Provider-agnostic routing is becoming standard plumbing rather than a differentiator. |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | Rust | 0 (+54) | CLI for Git worktree management explicitly designed for parallel AI agent workflows. Small but representative: developer tooling is being redesigned around running several agents concurrently in one repo. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 257,112 | Agent harness performance optimization system adding skills, instincts, memory and security for Claude Code, Codex, Opencode and Cursor. It is the highest-starred project in the entire dataset, confirming harness quality as the new competitive frontier. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,902 | "The agent that grows with you," positioned around persistent, evolving agent capability. Its scale alongside ECC shows two independent harness ecosystems each attracting six-figure star counts. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,550 | Collaborative workspace for agentic workflows and RAG pipelines with broad model and tool support, deployable cloud, VPC or self-hosted. It remains the strongest open alternative to hosted agent-builder platforms. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,383 | Agents that operate the browser as their action space. Browser control is proving to be the most generally useful agent capability, since most real workflows end in a web UI. |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Go | 105,244 | Claude Code skill that cuts ~65% of tokens by making the agent "talk like caveman." It is the purest expression of today's cost-engineering obsession: same answers, radically fewer tokens. |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 0 (+376) | Open-source autonomous trading agent operating across Polymarket, Kalshi, Binance, Hyperliquid, Solana DEXs and five EVM chains, with an agent-commerce protocol for machine-to-machine payments. It is the top-gaining agent on today's trending list and shows agents moving into direct financial execution. |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | 0 (+262) | Agent and skills set purpose-built for mathematical modeling that autonomously produces a complete, submission-ready paper. Strong daily momentum (+262) suggests vertical, deliverable-producing agents are a fast-growing niche. |
| [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) | Go | 0 (+189) | Fully autonomous multi-agent system for complex penetration-testing tasks. Its traction shows offensive security is becoming one of the first domains where fully autonomous agent loops are accepted in practice. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,790 | User-friendly AI interface supporting Ollama and OpenAI-compatible APIs. It remains the de facto self-hosted front end for anyone running local or private models. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,843 | One-click generation of HD short videos from a topic or keyword using LLM-driven automated workflows. It keeps demonstrating that consumer-grade content automation draws far larger audiences than developer tooling. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,378 | Local AI job search that scans portals, scores listings into a structured A–H report, tailors CVs and tracks applications inside Claude Code, Codex, OpenCode or Antigravity. It is a strong example of a CLI agent being repackaged as a single-purpose consumer product. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,886 | Turns documents or topics into native PowerPoint decks with real shapes, animations, charts, narration and custom `.pptx` templates. Deliverable-native output (editable files, not screenshots) is the differentiator. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,733 | AI productivity studio with smart chat, autonomous agents and 300+ assistants unified over frontier LLMs. Multi-provider access plus assistants is now the baseline feature set for desktop AI clients. |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | 0 (+504) | Self-hosted, MCP-ready, multi-tenant CRM with native AI agents and WhatsApp integration via WAHA, pitched as an open alternative to Kommo and Intercom. It is today's biggest AI star-gainer on trending, a clear signal that agentic vertical SaaS is going open source. |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | Python | 33,315 | Personal trading agent from the HKUDS lab. Together with CloddsBot it shows financial autonomy is the fastest-moving vertical for agent applications. |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | 0 (+217) | Extracted system prompts from Claude Fable 5.1, Opus 5, Claude Code, ChatGPT GPT-6-Astra, Codex, Gemini 3.8 Flash and Grok, updated regularly. It functions as a de facto reference for how frontier labs structure agent behavior and guardrails. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,959 | Tensors and dynamic neural networks with strong GPU acceleration. It remains the substrate nearly every training and fine-tuning project in this report is built on. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,847 | Step-by-step implementation of a ChatGPT-like LLM in PyTorch. Its enduring popularity reflects sustained demand for first-principles understanding rather than API usage. |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,830 | Train a 64M-parameter LLM from scratch in roughly two hours. Tiny-model training is becoming a practical teaching and prototyping staple, not just a curiosity. |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | 0 (+210) | YuE2 delivers frontier music generation with symbolic planning, zero-shot covers and agentic music editing. It is one of few non-text frontier generative models gaining daily traction, highlighting audio as an expanding open-weight frontier. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,422 | LLM evaluation platform covering Llama, Mistral, Qwen, GLM, Claude, GPT-4 and more across 100+ datasets. As model releases accelerate, standardized evaluation is increasingly the bottleneck skill. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,561 | Teaches LLM inference-system engineering on Apple Silicon by building a tiny vLLM with Qwen. It targets the systems-engineer gap that most ML curricula leave open. |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 317 | On-device LLM inference powered by X-bit quantization. Edge inference keeps attracting steady interest as a privacy and latency answer to cloud APIs. |
| [AkaliKong/MiniOneRec](https://github.com/AkaliKong/MiniOneRec) | Python | 1,812 | Minimal reproduction of the OneRec generative recommendation model. It marks the growing convergence of LLM architectures with production recommender systems. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Python | 137,619 | Curated collection of 100+ free AI agents, agent skills and RAG apps. It is one of the most-used launch points for developers choosing a retrieval or agent pattern to copy. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,249 | Turns a codebase with its docs, SQL schemas, configs and PDFs into a queryable knowledge graph via deterministic local AST parsing with every edge explained — no vector store. Its scale makes graph-based, explainable retrieval the most credible challenger to embedding-first RAG. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 93,747 | Persistent cross-session context for agents: captures session activity, compresses it with AI and injects relevant memory into future runs across Claude Code, Codex, Gemini, Copilot and others. Memory portability across harnesses is emerging as a key requirement. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,587 | Open-source RAG engine fusing retrieval with agent capabilities to form a context layer for LLMs. It remains the most complete self-hosted RAG stack for production document workloads. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,756 | Compresses tool outputs, logs, files and RAG chunks before they reach the model — 20% fewer tokens for coding agents and 60–95% fewer for JSON, with matching answers. It ships as a library, proxy and MCP server, targeting the cost problem at the retrieval boundary. |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 65,962 | Local-first agent experience with document ingestion, chat and "own your intelligence" positioning. It is the most popular packaged answer for private document Q&A. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,194 | Drop-in memory infrastructure giving agents persistent, production-grade context. Memory is consolidating into its own infrastructure category, separate from both RAG and orchestration. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 46,076 | High-performance, cloud-native vector database for scalable ANN search. It anchors the still-growing vector DB tier, even as vectorless approaches gain mindshare. |

---

## 3. Trend Signal Analysis

Explosive community attention is landing on the **agent harness layer** — skills, memory, context and token economics around a model — rather than on base models. `ECC` (257,112) and `hermes-agent` (244,902) lead the entire dataset, while `caveman` (105,244), `ponytail` (136,617), `claude-mem` (93,747) and `headroom` (71,756) all attack the same problem: fewer tokens, longer memory, identical answers. Context engineering has become a product category.

New directions visible today include skills distributed as plain `SKILL.md` files (`Claude-Red` for offensive security, `graphify` as a codebase-to-knowledge-graph skill), Git tooling for running parallel agents (`worktrunk`), MCP security gateways (`casbin-gateway`), and structured or vectorless retrieval (`PageIndex`, `graphify`) alongside embedded in-process vector search (`alibaba/zvec`, `orama`) as a counterweight to heavyweight vector databases. Provider-specific agent tuning also appears — `DeepSeek-Reasonix` is engineered around prefix-cache stability — signalling that harnesses are being co-designed with individual model families.

Recent releases drive the churn: `ollama`'s index already spans Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen and Gemma, while `system_prompts_leaks` tracks Claude Fable 5.1, GPT-6-Astra and Gemini 3.8 Flash. Rapid frontier refreshes make prompt and harness tooling instantly obsolete — and instantly valuable. Vertical autonomy is monetizing too: `CloddsBot` pushes an agent-commerce protocol for machine-to-machine payments, and `pentagi` moves autonomous pentesting past research demos.

---

## 4. Community Hot Spots

- **Context & token economics** — `caveman`, `headroom`, `claude-mem`, `ponytail`: the clearest cost-reduction payoff available today, applied at the prompt, tool-output and session-memory layers respectively.
- **Agent harness + skills standardization** — `affaan-m/ECC`, `SnailSploit/Claude-Red`, `Graphify-Labs/graphify`, `max-sixty/worktrunk`: `SKILL.md` is becoming a distribution format, and harness-level tooling now rivals frameworks in star velocity.
- **Autonomous vertical agents with real stakes** — `CloddsBot`, `HKUDS/Vibe-Trading`, `vxcontrol/pentagi`: trading and offensive security are where fully autonomous loops are being deployed first, with real money and real attack surfaces.
- **MCP security and multi-provider gateways** — `apache/casbin-gateway`, `Mirrowel/LLM-API-Key-Proxy`, `iOfficeAI/AionUi`: as MCP and multi-CLI workflows proliferate, authorization, routing and aggregation are the emerging plumbing gaps.
- **Local-first and edge inference** — `ollama`, `Mintplex-Labs/anything-llm`, `Picovoice/picollm`, `alibaba/zvec`: privacy, latency and cost are keeping self-hosted stacks competitive even as hosted capabilities advance.

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*