# AI Open Source Trends 2026-09-12

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-12 00:36 UTC

---

# AI Open Source Trends Report — 2026-09-12

**Filtering note:** I excluded non-AI trending repos such as sideloaders, PVR tools, graphics editors, network-stack tools, satellite simulators, and general CS course lists unless they had explicit AI/ML/agent/RAG relevance. Trending rows with total stars shown as `0` are copied verbatim from the source; today’s new stars are the meaningful momentum signal there.

## 1. Today's Highlights

Today’s AI open-source momentum is concentrated less on new foundation models and more on making agents usable in practice. The fastest-rising AI-related trending repo is [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (+3463 today), an ADHD-friendly output skill for coding agents, followed by [github/spec-kit](https://github.com/github/spec-kit) (+1015) and [obra/superpowers](https://github.com/obra/superpowers) (+729), signaling a surge in spec-driven, skill-based agent workflows. Persistent context and token efficiency are also hot: [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) (+647) offers a wiki-style alternative to traditional RAG, while [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) and [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) target context compression and cross-session memory. Vertical autonomous agents continue to attract attention, led by [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) (+626) in trading and [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) (+152) in AI sales. Underlying infrastructure is maturing around MCP security, multi-provider gateways, and local-first coding agents such as [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) (+552).

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,131 | Model-definition framework for state-of-the-art ML across text, vision, audio, and multimodal. It remains the default backbone for open model integration and production inference/training pipelines. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,699 | Local model runner supporting Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma and more. Its high star count shows local-first LLM execution is still a major adoption path. |
| [pytorch/pytorch](https://github.com/pytorch/pytorch) | Python | 102,934 | Core tensor and GPU-accelerated neural network framework. It underpins much of the open AI training and research ecosystem. |
| [github/spec-kit](https://github.com/github/spec-kit) | Python | 0 (+1015 today) | Toolkit for Spec-Driven Development, aimed at making agentic coding more structured. Today's +1015 stars signal strong demand for formal workflows around AI coding agents. |
| [apache/casbin-gateway](https://github.com/apache/casbin-gateway) | Go | 623 | Casbin AI & MCP security gateway for HTTP. It highlights the emerging need for access control and policy enforcement around MCP/agent infrastructure. |
| [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) | Python | 550 | Universal LLM gateway with OpenAI/Anthropic-compatible endpoints and load balancing. It addresses multi-provider routing and key management for agent stacks. |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,599 | Modular Rust framework for building scalable LLM applications. It reflects continued interest in Rust for performance-sensitive AI infrastructure. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,559 | Educational project for building a tiny vLLM + Qwen inference system on Apple Silicon. It targets systems engineers who want to understand LLM serving internals. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 256,525 | Agent harness performance optimization system with skills, instincts, memory, security, and research-first development. It targets Claude Code, Codex, Opencode, Cursor and beyond, showing the rise of meta-tools for agent quality. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,606 | “The agent that grows with you,” a high-profile agent framework. Its massive star count indicates sustained mainstream interest in open agent runtimes. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,271 | Long-standing autonomous agent platform for accessible AI. It remains a reference point as agents move from demos to production workflows. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,138 | Agent engineering platform and one of the most widely used LLM application frameworks. It continues to anchor the tooling layer for agentic and RAG workflows. |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 135,831 | Skill that makes AI agents think like a lazy senior dev, favoring minimal code. It is part of the trend toward behavior-shaping agent skills rather than new model weights. |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Go | 105,042 | Claude Code skill that cuts about 65% of tokens by talking like a caveman. It highlights token cost and context efficiency as first-class agent concerns. |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+3463 today) | Agent skill that stops coding agents from burying the answer, with ADHD-friendly output. Today's +3463 stars make it the strongest AI-related momentum signal on the trending list. |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+729 today) | Agentic skills framework and software development methodology. The +729 stars today show growing appetite for reusable, disciplined agent workflows. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,521 | Automated AI workflow that generates HD short videos from a topic or keyword. It represents the booming consumer content-generation category. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,293 | Open-source AI job search that scans portals, scores listings, tailors CVs and tracks applications locally in AI coding CLIs. It shows vertical agents embedding into existing developer tools. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,945 | LLM-powered multi-market stock analysis with news, dashboards, and scheduled alerts. It reflects strong demand for autonomous finance research agents. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,731 | Turns documents or topics into native PowerPoint decks with charts, narration and templates. It is a vertical AI application competing on output fidelity, not just text generation. |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | Python | 33,258 | Personal trading agent from HKUDS. It shows agent frameworks moving into high-stakes financial decision support. |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 0 (+626 today) | Open-source AI trading agent operating across 1000+ markets and multiple chains, built on Claude. Today's +626 stars point to interest in autonomous agent commerce and machine-to-machine payments. |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | 0 (+152 today) | Self-hosted AI sales OS with native AI agents, WhatsApp integration and MCP readiness. It is an open alternative to Kommo/Octadesk/Intercom for chat-led businesses. |
| [pascalorg/editor](https://github.com/pascalorg/editor) | TypeScript | 0 (+106 today) | Open-source 3D architectural editor with local CLI, MCP tools and workflows for humans and AI agents. It signals MCP/agent integration spreading into creative and CAD-like verticals. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,786 | Step-by-step implementation of a ChatGPT-like LLM in PyTorch. It remains one of the most popular educational paths into LLM internals. |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,719 | Train a 64M-parameter LLM from scratch in about 2 hours. It lowers the barrier to hands-on LLM training and experimentation. |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | Python | 54,271 | Learn, build and ship AI engineering projects from scratch. It reflects demand for practical, end-to-end AI engineering curricula. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,421 | LLM evaluation platform supporting many models over 100+ datasets. Evaluation remains a critical bottleneck as models proliferate. |
| [ridgerchu/matmulfreellm](https://github.com/ridgerchu/matmulfreellm) | Python | 3,090 | Implementation for MatMul-free language models. It explores alternative architectures that could reduce compute costs. |
| [AkaliKong/MiniOneRec](https://github.com/AkaliKong/MiniOneRec) | Python | 1,810 | Minimal reproduction of OneRec. It is a sign of community interest in recommender-LLM hybrids and reproducible research. |
| [testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io) | HTML | 113 | Survey repository on test-time scaling in large language models. It tracks a key post-training inference-time compute direction. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 117,023 | Turns any codebase, docs, SQL schemas, configs and PDFs into a queryable knowledge graph. Its vectorless, local deterministic AST approach makes every edge explainable. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 93,696 | Persistent context across sessions for every agent, with AI compression and relevant context injection. It works across Claude Code, OpenClaw, Codex, Gemini, Hermes, Copilot and OpenCode. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,533 | Leading open-source RAG engine fusing cutting-edge RAG with agent capabilities. It provides a context layer for LLMs and agentic workflows. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,600 | Compresses tool outputs, logs, files and RAG chunks before they reach the LLM. It claims 20% fewer tokens for coding agents and 60–95% fewer for JSON with same answers. |
| [Mintplex-Labs/anything-llm](https://github.com/Mintplex-Labs/anything-llm) | JavaScript | 65,936 | Local-first agent experience and document chat platform. It represents the self-hosted, privacy-first RAG/agent application stack. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,139 | Memory layer for AI agents with persistent context and production-ready infrastructure. Memory is becoming a distinct infrastructure category for agents. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 46,063 | High-performance cloud-native vector database for scalable ANN search. It remains a core building block for RAG and semantic search. |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | 0 (+647 today) | Cross-platform desktop app that turns documents into an organized, interlinked knowledge base. Instead of traditional RAG, it incrementally builds a persistent wiki from sources; today's +647 stars show strong interest in this alternative. |

---

## 3. Trend Signal Analysis

The strongest signal today is the professionalization of the agent layer. The community is not just asking for more capable models; it is optimizing agent behavior, token use, and workflow discipline. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (+3463) and [obra/superpowers](https://github.com/obra/superpowers) (+729) show that skills/harness conventions can go viral as fast as model releases, while [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) and [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) explicitly market token reduction and minimal-code instincts. [github/spec-kit](https://github.com/github/spec-kit) (+1015) suggests spec-driven development is becoming a standard on-ramp for coding agents.

A second signal is memory and context as a product category. [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) (+647) proposes persistent wiki-building instead of retrieve-from-scratch RAG; [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) builds explainable knowledge graphs without a vector store; [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem), [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom), and [mem0ai/mem0](https://github.com/mem0ai/mem0) attack cross-session memory and token compression. This aligns with multi-model agent stacks that reference Claude Code, Codex, Cursor, Gemini CLI, OpenClaw and Hermes.

Third, infrastructure is consolidating around MCP and multi-provider routing. [apache/casbin-gateway](https://github.com/apache/casbin-gateway) and [Mirrowel/LLM-API-Key-Proxy](https://github.com/Mirrowel/LLM-API-Key-Proxy) are early signs of security, policy and gateway layers for agent traffic. Vertical agents in finance and sales—[alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot), [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis), [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading), [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM)—show autonomous agent commerce moving into real markets and chat-led business workflows.

---

## 4. Community Hot Spots

- **Agent skill/harness optimization:** [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd), [obra/superpowers](https://github.com/obra/superpowers), [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman), [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail), [affaan-m/ECC](https://github.com/affaan-m/ECC). These projects deliver immediate token/cost and UX gains, and they are dominating today’s momentum.
- **Spec-driven development for coding agents:** [github/spec-kit](https://github.com/github/spec-kit). A GitHub-backed toolkit with +1015 stars today, it formalizes how teams can specify, plan and execute with AI coding agents.
- **Persistent memory and context compression:** [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem), [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom), [mem0ai/mem0](https://github.com/mem0ai/mem0), [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki). These directly address context resets, token bloat, and long-running agent reliability.
- **Graph/vectorless knowledge retrieval:** [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify), [VectifyAI/PageIndex](https://github.com/VectifyAI/PageIndex), [HKUDS/LightRAG](https://github.com/HKUDS/LightRAG). They offer explainable, reasoning-based alternatives to conventional vector search and RAG pipelines.
- **Vertical autonomous agents:** [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot), [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading), [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis), [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM). Agent commerce, trading, and chat-led sales are emerging as high-stakes verticals for self-hosted AI agents.

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*