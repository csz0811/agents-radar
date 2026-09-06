# AI Open Source Trends 2026-09-07

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-06 22:45 UTC

---

# AI Open Source Trends Report — 2026-09-07

## Filtering Scope

Excluded non-AI/ML trending repos: **LLVM/LLVM-project** (compiler infrastructure), **Stremio/stremio-web** (video streaming), and **BraveOPotato/FckSignups** (general no-signup tool directory). All remaining repos selected below are AI/ML/agent-related.

> Note: for repos that appear only in the “Today’s Trending” feed, the baseline star total was not exposed in the source snapshot, so the Stars column shows **— (+N today)**.

---

## 1. Today's Highlights

Agent skills are the dominant force in today’s open-source AI ecosystem. The top two trending repos — `mattpocock/skills` (+2,206 today) and `affaan-m/ECC` (+1,486 today) — are not models or apps but **skills/harness systems for AI coding agents**. The most momentum is in packaging reusable agent behavior: skills catalogs, `.agents` directories, prompt/optimizer packs, and memory layers. Local-first inference also surfaced strongly with `magnitudedev/magnitude` (+604 today), and vertical AI applications are accelerating in finance (`AutoHedge`), research (`aipoch/open-science`), and voice (`OpenWhispr`). Across the topic-search data, the biggest star counts are concentrated around agent frameworks, RAG/knowledge tools, and LLM infrastructure rather than raw model releases.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,304 | The default local model runtime, now onboarding Kimi, GLM, DeepSeek, Qwen, and other open-weight models. It remains the anchor for local-first AI infrastructure. |
| [magnitudedev/magnitude](https://github.com/magnitudedev/magnitude) | TypeScript | — (+604) | Open-source inference server that runs the best model for your hardware and plugs into Pi, OpenCode, Hermes, Claude Code, and other agents. +604 today signals strong demand for agent-agnostic local inference. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 177,263 | Search, scrape, and web-context API built for LLM and agent workloads. It is a core ingestion layer for RAG and agent research pipelines. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,909 | The central model-definition framework for open text, vision, audio, and multimodal models. It remains foundational even as agent tooling moves upstream. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 145,807 | The agent engineering platform for LLM workflows, tools, memory, and RAG. Its continued topic-search presence confirms broad production adoption. |
| [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | Python | 41,138 | Durable agent orchestration built around graphs and state machines. It is one of the most widely used lower-level runtimes for agent workflows. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 251,223 (+1,486) | Agent-harness performance optimization system with skills, instincts, memory, security, and research-first workflows for Claude Code, Codex, OpenCode, Cursor, and beyond. One of the highest-starred agent repos in the dataset and still picking up major daily momentum. |
| [mattpocock/skills](https://github.com/mattpocock/skills) | Shell | — (+2,206) | A real-world skills collection straight from the author’s `.agents` directory. It is today’s single biggest daily-star gainer and a strong signal that agent skills are becoming the new plugin format. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 242,514 (+520) | Self-described as “the agent that grows with you,” focused on continuous memory and adaptation. Its large existing base plus +520 today shows sustained interest in long-running personal agents. |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 129,264 (+1,539) | Makes AI agents behave like a “lazy senior dev” by avoiding unnecessary code. +1,539 today highlights growing concern with code-generation bloat and over-engineering. |
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | TypeScript | — (+552) | Open-source coding agent designed as a neutral target for agent tooling and model integrations. It is quickly becoming a standard reference agent in the current stack. |
| [humanlayer/skills](https://github.com/humanlayer/skills) | TypeScript | — (+451) | Skills collection tied to HumanLayer’s human-in-the-loop agent infrastructure. Rising daily stars point to demand for agent approval, control, and operations tooling. |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | TypeScript | — (+276) | Multi-agent “meta-harness” for running swarms, workflows, memory, and RAG across Claude Code, Codex, Hermes, and other runtimes. Represents the next wave of composable agent deployment frameworks. |
| [openai/skills](https://github.com/openai/skills) | Python | — (+44) | OpenAI’s official Skills Catalog for Codex. Its presence establishes a reference point for how AI vendors want agent skills packaged and shared. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,135 | The most popular open-source AI interface for local and API-based LLMs. It is now a default UI layer for RAG and agent workflows. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 121,112 | Generates complete short videos from a topic or keyword using AI models and automated workflows. Still one of the highest-star vertical AI applications in the open-source ecosystem. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 78,437 | Gives AI agents CLI-level access to Twitter, Reddit, YouTube, GitHub, Bilibili, and more without API fees. This is highly relevant for agent data acquisition and research automation. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,332 | Open-source AI job-search agent that scans listings, scores roles, tailors CVs, and runs inside coding CLIs. A strong example of vertical agents moving into professional workflows. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,519 | AI productivity studio with chat, autonomous agents, and 300+ assistant personas. Shows the consolidation of agentic AI into desktop productivity software. |
| [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) | Python | — (+137) | Enables users to build an autonomous hedge fund using swarm intelligence and AI agents for market analysis, risk, and trade execution. Financial-agent automation is an emerging trending niche. |
| [aipoch/open-science](https://github.com/aipoch/open-science) | TypeScript | — (+145) | Local-first, model-agnostic AI research workbench with scientific agents, Python/R notebooks, and reproducible provenance. Aimed at researchers who want private, traceable AI-assisted science. |
| [OpenWhispr/openwhispr](https://github.com/OpenWhispr/openwhispr) | JavaScript | — (+225) | Cross-platform voice-to-text dictation app supporting local Nvidia Parakeet/Whisper models and BYO cloud keys. Privacy-first local voice AI is a clear end-user application trend. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,476 | Step-by-step implementation of a ChatGPT-like LLM in PyTorch from scratch. Remains the standard hands-on educational repository for LLM internals. |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 59,129 | Train a 64M-parameter LLM from scratch in about two hours. It is an accessible on-ramp for developers who want to learn practical training dynamics. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,395 | LLM evaluation platform supporting a wide range of models and 100+ datasets. Evaluation tooling continues to be a critical part of the open model ecosystem. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,547 | Teaches systems engineers to build a miniature vLLM-style inference stack on Apple Silicon. Bridges the gap between LLM frameworks and low-level inference systems. |
| [llm-jp/awesome-japanese-llm](https://github.com/llm-jp/awesome-japanese-llm) | TypeScript | 1,425 | Curated overview of Japanese LLMs and resources. Important for tracking multilingual open-model progress outside the English-centric ecosystem. |
| [EasyJailbreak/EasyJailbreak](https://github.com/EasyJailbreak/EasyJailbreak) | Python | 908 | Framework for generating and evaluating adversarial jailbreak prompts. Security and red-teaming tooling is becoming a more visible open-source AI category. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 115,340 | Turns codebases, docs, schemas, configs, and PDFs into a queryable knowledge graph via a `/graphify` skill for Claude Code, Cursor, Codex, and Gemini CLI. Its “no vector store” deterministic AST approach is gaining major traction. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 93,346 | Persistent context and memory across sessions for Claude Code, OpenClaw, Codex, Gemini, Hermes, OpenCode, and more. Captures and injects relevant memory into future agent sessions. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,141 | Leading open-source RAG engine that combines retrieval-augmented generation with agent capabilities. It is one of the default infrastructure choices for LLM context layers. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 69,137 | Compresses tool outputs, logs, files, and RAG chunks before they reach the LLM, claiming large token savings. Context-efficiency is becoming its own infrastructure layer. |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 65,695 | Local-first “own your intelligence” platform for document RAG and agent chat. Strong signal for privacy-first, self-hosted knowledge applications. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 64,797 | Drop-in memory layer for AI agents with persistent cross-session context. Memory is increasingly treated as core infrastructure, not a vector-database add-on. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 52,039 | Leading document-agent and OCR platform over complex retrieval workloads. Continues to be a major RAG/data-connection framework. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 46,000 | Cloud-native vector database built for scalable ANN search. Remains foundational for production RAG stacks. |

---

## 3. Trend Signal Analysis

Today’s trending data strongly indicates that **agent skills are replacing model releases as the main open-source attention magnet**. Projects like `mattpocock/skills` (+2,206), `DietrichGebert/ponytail` (+1,539), and `affaan-m/ECC` (+1,486) all focus on changing how existing agents behave rather than introducing new models. This is the clearest signal yet that agent behavior is being packaged and distributed as shareable code, prompts, and `.agents` directories.

Another notable direction is **model-agnostic, agent-native infrastructure**. New tooling explicitly supports multiple coding agents at once — Claude Code, Codex, OpenCode, Hermes, Cursor, Pi, and Gemini CLI. `magnitudedev/magnitude` handles model selection and inference for whichever agent runs locally; `ruvnet/ruflo` and `ECC` manage harness behavior across agents; `claude-mem` persists memory across many agent CLIs. This “support everything at once” strategy suggests the community is betting on a multi-agent, multi-model future rather than locking into one vendor.

RAG is also evolving beyond simple vector retrieval. `Graphify-Labs/graphify` promotes deterministic AST-based knowledge graphs, while `claude-mem` and `mem0ai/mem0` treat memory as a persistent cross-agent layer. In parallel, vertical applications — autonomous hedge funds, AI job search, AI research workbenches, and local voice dictation — are becoming more ambitious and specific. The overall hot list points to a maturing open-source AI ecosystem: not another wave of chatbot UIs, but a growing control plane for agents, memory, local inference, and domain-specific AI workflows.

---

## 4. Community Hot Spots

- **Agent skills as the new plugin format** — Watch [mattpocock/skills](https://github.com/mattpocock/skills), [openai/skills](https://github.com/openai/skills), [humanlayer/skills](https://github.com/humanlayer/skills), [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills), and [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design). Skills are rapidly becoming reusable assets for coding, design, and marketing workflows.

- **Agent harnesses and performance optimization** — Repos such as [affaan-m/ECC](https://github.com/affaan-m/ECC), [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent), and [anomalyco/opencode](https://github.com/anomalyco/opencode) show the shift from simple coding assistants toward long-running, memory-enabled agent systems.

- **Local-first inference and privacy** — Keep an eye on [magnitudedev/magnitude](https://github.com/magnitudedev/magnitude), [ollama/ollama](https://github.com/ollama/ollama), and [OpenWhispr/openwhispr](https://github.com/OpenWhispr/openwhispr). Local models plus agent-native integration is a major deployment trend.

- **Cross-agent memory and RAG** — Projects like [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem), [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify), [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom), and [mem0ai/mem0](https://github.com/mem0ai/mem0) are building durable, efficient knowledge layers for the entire agent ecosystem.

- **Vertical agent applications** — Domain-specific agents are drawing serious interest: autonomous finance in [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge), AI-assisted research in [aipoch/open-science](https://github.com/aipoch/open-science), job-search automation in [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops), and agent-driven content creation in [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo).

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*