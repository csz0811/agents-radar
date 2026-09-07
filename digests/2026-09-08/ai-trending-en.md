# AI Open Source Trends 2026-09-08

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-07 22:45 UTC

---

# AI Open Source Trends Report — Sep 8, 2026

**Filter note:** Excluded trending projects with no AI/ML relevance (e.g., `LunaTV`, `FckSignups`, `pascalorg/editor`). `microsoft/markitdown` is retained because document-to-Markdown conversion is now a standard first-mile layer for LLM/RAG ingestion.  
**Star numbers:** `n/a` means the GitHub Trending source did not expose a reliable total; `+N` is today’s new stars. For repos present in both topic search and trending, the topic-search total is combined with the trending delta.

---

## 1. Today's Highlights

Today’s hottest AI open-source activity is unambiguously in **agent infrastructure and agent skills**, not core model training. `affaan-m/ECC` is the standout momentum story with **+1,905 stars today** and **252,755 total stars** as an agent harness/performance layer for Claude Code, Codex, Cursor, and more. OpenAI published an official **Skills Catalog for Codex**, while domain-specific skill packs such as `coreyhaines31/marketingskills` gained **+602 stars**, showing that “skills” are becoming a distribution format. New agent-facing browser infra is also emerging fast: `camofox-browser` (+285) and Lightpanda (+116) are both addressing web access and anti-bot constraints for AI agents. Meanwhile, Microsoft `markitdown` (+771) and `context-mode` (+147) signal continued focus on the data/context plumbing around LLMs.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | TypeScript | n/a (+147) | Context-window optimization for AI coding agents, with tool-output sandboxing, session memory, and cross-platform routing. Claims ~98% output reduction, making context compression a first-class infrastructure problem. |
| [jo-inc/camofox-browser](https://github.com/jo-inc/camofox-browser) | JavaScript | n/a (+285) | Stealth headless browser built for AI agents, pitched as a drop-in Puppeteer/Playwright replacement. Signals growing demand for reliable anti-bot web access inside agent workflows. |
| [openai/skills](https://github.com/openai/skills) | Python | n/a (+372) | Official Skills Catalog for Codex, giving developers a canonical way to distribute agent skills. Important because it shows a major model vendor standardizing the “agent skill” layer. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,412 | Reference local LLM runtime, now listing Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, and Gemma. Remains the default self-hosted inference gateway for new open-weight releases. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 145,883 | Leading agent engineering platform for tool use, orchestration, and LLM application development. Its continued high relevance confirms it is still core production infrastructure. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 177,634 | Web scraping/search API turned into an agent-facing “context API.” Shows that live web access is becoming essential infrastructure for both RAG pipelines and autonomous agents. |
| [lightpanda-io/browser](https://github.com/lightpanda-io/browser) | Zig | n/a (+116) | A headless browser designed specifically for AI and automation, written in Zig. New lightweight alternative to full Chromium-style browsing for agent workloads. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 252,755 (+1,905) | Agent-harness performance optimization system with skills, instincts, memory, and security for Claude Code, Codex, OpenCode, Cursor, and beyond. Today’s most-starred trending AI repo and a clear sign that the “harness layer” is commanding huge attention. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 243,032 | Self-evolving personal agent framework from Nous Research. Its enormous GitHub presence shows strong demand for agents that accumulate memory and improve over time. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,185 | The long-running autonomous-agent vision project. Still one of the largest LLM-agent repositories and a historical reference point for agentic workflows. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 112,937 | Makes websites accessible to AI agents and powers browser-based automation at scale. Remains a central open-source library for practical agent-web interactions. |
| [bytedance/deer-flow](https://github.com/bytedance/deer-flow) | Python | n/a (+188) | ByteDance’s open-source long-horizon SuperAgent harness. It researches, codes, and creates using sandboxes, memories, tools, subagents, and a message gateway, and is built for tasks lasting minutes to hours. |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | TypeScript | n/a (+392) | Agent meta-harness for deploying intelligent multi-agent swarms with adaptive memory, self-learning, RAG, and Claude Code/Codex/Hermes integration. Gained +392 stars today as swarm orchestration gains momentum. |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | JavaScript | n/a (+602) | Marketing-specific skills for Claude Code and AI agents, covering CRO, copywriting, SEO, analytics, and growth engineering. Demonstrates rapid verticalization of agent skill packs. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,253 | Popular self-hosted AI interface for Ollama and OpenAI-compatible APIs. It remains one of the most widely used end-user front ends for local RAG/agent setups. |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | n/a (+734) | “Write HTML. Render video. Built for agents.” New Heygen tool aimed at agent-generated visual content, and one of today’s fastest-moving trending projects. |
| [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) | Python | n/a (+541) | Autonomous hedge-fund builder using swarm intelligence and AI agents for market analysis, risk management, and trade execution. Gained +541 today and points to a finance-agent gold rush. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 121,343 | Generates AI short videos from a topic or keyword via automated workflows. One of the largest AI content generation apps on GitHub. |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 65,745 | Local-first RAG/agent workspace that keeps models and private data under user control. Well positioned for privacy-conscious teams building document chat and customized agents. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,456 | Open-source AI job-search agent that scans portals, scores roles, tailors CVs, and tracks applications. Runs locally inside coding CLI agents, showing vertical expansion beyond software development. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 78,615 | Gives AI agents access to Twitter, Reddit, YouTube, GitHub, Bilibili, and more through one CLI with no API fees. Valuable social/web context layer for agents. |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | Python | 32,981 | Personal AI trading-agent application. Complements AutoHedge and stock-analysis projects in a fast-growing open-source finance-agent niche. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [tensorflow/tensorflow](https://github.com/tensorflow/tensorflow) | C++ | 199,336 | The classic open-source ML framework. Despite the GenAI shift, it remains a top-tier ML project and is still tagged heavily across ML topic searches. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,962 | Standard model-definition and tooling framework for open-weight text, vision, audio, and multimodal models. Essential and still the gateway for most open-source model work. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,845 | Core deep-learning framework behind most modern LLM research and fine-tuning. Continued relevance underlines PyTorch’s dominance in model development. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,539 | Step-by-step implementation of a ChatGPT-like LLM in PyTorch. The leading hands-on educational resource for learning LLM architecture and training from first principles. |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 59,469 | Train a 64M-parameter LLM from scratch in around two hours. Important for lowering the barrier to entry for practical LLM training education. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,551 | Tutorial for building a tiny vLLM-like inference system targeting Apple Silicon. Signals rising interest in systems-level LLM optimization and local inference engineering. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,397 | LLM evaluation platform supporting 100+ datasets and many major model families. With open-weight releases accelerating, robust benchmarking tools are becoming critical infrastructure. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | n/a (+771) | Converts files and Office documents to Markdown. Gained +771 today and is widely used as document preprocessing for LLM/RAG ingestion pipelines. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,214 | Leading open-source RAG engine combining retrieval-augmented generation with agent capabilities. A mainstream choice for document-grounded LLM products. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 115,678 | Turns codebases, docs, SQL schemas, configs, and PDFs into queryable knowledge graphs without a vector store. Strong adoption as a Claude Code / Cursor / Codex / Gemini CLI skill. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | JavaScript | 93,413 | Captures everything an agent does, compresses it, and injects relevant context into future sessions across multiple agent CLIs. Memory-focused RAG is becoming one of the most active directions. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 64,861 | Drop-in memory layer for AI agents and applications. Positions persistent memory as production infrastructure rather than a session-level feature. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 52,059 | Document-agent, OCR, and RAG data framework for LLM applications. Remains a key toolkit for connecting private data to generative models. |
| [qdrant/qdrant](https://github.com/qdrant/qdrant) | Rust | 34,423 | High-performance vector database and vector search engine. Core storage layer for many large-scale RAG and agent-memory deployments. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 46,015 | Cloud-native vector database built for scalable ANN search. Together with Qdrant, it anchors the open-source vector-storage ecosystem. |

---

## 3. Trend Signal Analysis

The hottest area today is no longer raw model quality — it is **the agent stack around models**. ECC’s **+1,905 stars today** is the clearest signal that developers are investing in harness-level tooling: memory, skills, instincts, security, and cross-platform routing. OpenAI’s official Codex skills catalog and domain-specific skill packs such as `coreyhaines31/marketingskills` reinforce that “skills” are becoming a standardized distribution format, not just prompt collections.

Second, **context and memory are the new bottleneck**. `context-mode` advertises 98% tool-output compression, while related projects such as `claude-mem`, `mem0`, and `headroom` are attacking agent persistence and token cost. This explains why Microsoft `markitdown` is also trending at +771: converting heterogeneous files into LLM-friendly Markdown is now a core data-engineering task for RAG systems.

Third, **browser infrastructure for agents is emerging as a distinct category**. `camofox-browser` (+285) and `lightpanda-io/browser` (+116) both treat web access as an agent-hardening problem, including bot detection and anti-scraping bypass. That points to an escalating tension between AI agents and website anti-bot defenses.

Finally, **vertical agents are moving toward money**: AutoHedge, Vibe-Trading, and stock-analysis agents are receiving strong attention. Combined with Ollama’s updated support for Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, and Gemma, the message is clear: open-weight releases remain frequent, and the community is racing to own memory, context, skills, and agent-computer interfaces.

---

## 4. Community Hot Spots

- **Agent harness / skills layer** — [openai/skills](https://github.com/openai/skills), [affaan-m/ECC](https://github.com/affaan-m/ECC), [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills), and [mksglu/context-mode](https://github.com/mksglu/context-mode). Developers should watch this space because skills are becoming reusable, distributable building blocks for coding agents.

- **Browser automation and anti-bot tooling** — [jo-inc/camofox-browser](https://github.com/jo-inc/camofox-browser), [lightpanda-io/browser](https://github.com/lightpanda-io/browser), and [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl). Web access is now an infrastructure challenge for agents, not just a scraping convenience.

- **Context compression and persistent memory** — [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem), [mem0ai/mem0](https://github.com/mem0ai/mem0), and [mksglu/context-mode](https://github.com/mksglu/context-mode). Token cost and cross-session memory are among the most urgent practical problems in production agent systems.

- **Long-horizon / swarm-style agent harresses** — [bytedance/deer-flow](https://github.com/bytedance/deer-flow), [ruvnet/ruflo](https://github.com/ruvnet/ruflo), and [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge). Multi-agent orchestration with sandboxes and memories is shifting from research demos to deployable workflow infrastructure.

- **Autonomous finance agents** — [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge), [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading), and [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis). These projects show that agentic AI is moving quickly into high-value, decision-heavy verticals — although risk management and security remain obvious concerns.

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*