# AI Open Source Trends 2026-09-14

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-14 00:23 UTC

---

# AI Open Source Trends Report — 2026-09-14

**Filtering note:** I excluded non-AI or general-purpose repos such as `ever-co/ever-gauzy`, `bilawalsidhu/gods-eye-view`, `yuliskov/SmartTube`, `tonhowtf/omniget`, `jiji262/douyin-downloader`, `Swordfish90/cool-retro-term`, `Developer-Y/cs-video-courses`, and `JuliaLang/julia`. The report below focuses on clearly AI/ML-related projects.

---

## 1. Today’s Highlights

Today’s AI open-source momentum is dominated by **local/on-device AI** and **agent context engineering**. `JustVugg/colibri` (+868 today) pushes frontier MoE inference into pure C with disk-streamed experts, while `debpalash/VoiceStudio` (+2,632 today) brings a fully local ElevenLabs alternative with voice cloning/design in 646 languages. Agent tooling is professionalizing fast: secure skill registries, autonomous pentesting agents, parallel research agents, and offensive-security Claude skills all trended strongly. RAG is also shifting beyond naive vector search toward persistent memory, knowledge graphs, token compression, and vectorless reasoning. Finally, the ecosystem continues to orbit recent frontier-model releases, with prompt leaks and local runners referencing Claude Fable 5.1, GPT-6-Astra, Gemini 3.8 Flash, Kimi, DeepSeek, and GLM-5.2.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | 0 (+868 today) | A pure-C, zero-dependency engine for running frontier MoE models on local hardware by streaming experts from disk. Its large single-day jump signals intense interest in practical local inference for very large models. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,512 (+152 today) | The model-definition framework for state-of-the-art text, vision, audio, and multimodal models. It remains the default integration layer for new model releases and training/inference workflows. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,834 | A local model runner supporting Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma, and more. It is the de facto gateway for developers experimenting with open-weight models on their own machines. |
| [0xPlaygrounds/rig](https://github.com/0xPlaygrounds/rig) | Rust | 8,615 | A Rust framework for building modular and scalable LLM applications. Its presence highlights Rust’s growing role in production-grade AI infrastructure. |
| [skyzh/tiny-llm](https://github.com/skyzh/tiny-llm) | Python | 4,561 | A systems-engineering course that builds a tiny vLLM + Qwen inference stack on Apple Silicon. It is becoming a key learning resource for LLM inference internals. |
| [apache/casbin-gateway](https://github.com/apache/casbin-gateway) | Go | 623 | An AI & MCP security gateway for HTTP with an online demo. It reflects the rising need to secure tool-calling and model-context-protocol traffic in agent systems. |
| [Picovoice/picollm](https://github.com/Picovoice/picollm) | Python | 317 | On-device LLM inference powered by X-Bit quantization. It fits the broader push toward private, low-latency AI outside the cloud. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) | Go | 0 (+590 today) | A fully autonomous AI agent system for complex penetration-testing tasks. Its strong daily gain shows growing demand for offensive-security agents with real tool execution. |
| [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) | TypeScript | 0 (+265 today) | A secure, validated skill registry for professional AI coding agents like Antigravity, Claude Code, Cursor, and Copilot. It points to an emerging “agent skills” supply chain. |
| [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) | Rust | 0 (+289 today) | A Rust tool for running parallel research agents with any model. It targets the growing use case of multi-agent literature review and automated research workflows. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 257,747 | An agent-harness performance optimization system covering skills, instincts, memory, security, and research-first development. Its huge star count reflects demand for making coding agents more reliable and efficient. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 245,161 | “The agent that grows with you,” focused on persistent, evolving agent behavior. It is one of the highest-star agent projects in the dataset. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,246 | The agent engineering platform, still central for chaining LLM calls, tools, and workflows. It remains a baseline dependency for many agent and RAG stacks. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,518 | Agents that use the browser to complete tasks. It continues to lead the browser-automation agent niche. |
| [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) | Python | 0 (+506 today) | A curated library of offensive-security skills for the Claude skills system, covering SQLi to shellcode and EDR evasion. It shows how agent skills are being weaponized for specialized security work. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) | Python | 0 (+2,632 today) | A fully local, open-source ElevenLabs alternative for voice cloning, design, dubbing, dictation, transcription, and audiobooks in 646 languages. Today’s standout momentum signal is the massive +2,632 star jump. |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | 0 (+487 today) | Frontier music generation with symbolic planning, zero-shot covers, and agentic music editing. It brings agentic workflows into creative audio production. |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | 0 (+432 today) | An open-source AI sales OS: self-hosted CRM with native AI agents and WhatsApp integration. It is an open alternative to Kommo, Octadesk, and Intercom for chat-first sales. |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | 0 (+380 today) | An open-source agentic video production system with 12 pipelines, 100+ tools, and 700+ skill/knowledge files. It turns AI coding assistants into full video-production studios. |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | Go | 0 (+443 today) | A battle-tested hybrid code-review tool combining deterministic pipelines with an LLM agent. It produces precise line-level comments and supports multi-language security rules. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 123,249 | Generates HD short videos from a topic or keyword using AI models and automated workflows. It remains one of the most popular open-source AI video generators. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,759 | An AI productivity studio with chat, autonomous agents, and 300+ assistants unified across frontier LLMs. It is a strong example of the “AI desktop workspace” category. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 54,095 | Turns documents or topics into native PowerPoint decks with charts, animations, and audio narration. It shows vertical AI applications moving from text generation to full office deliverables. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [jingyaogong/minimind](https://github.com/jingyaogong/minimind) | Python | 60,928 | Train a 64M-parameter LLM from scratch in just 2 hours. It remains one of the most accessible end-to-end LLM training projects. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,899 | Step-by-step implementation of a ChatGPT-like LLM in PyTorch. It is a canonical educational resource for understanding model internals. |
| [open-compass/opencompass](https://github.com/open-compass/opencompass) | Python | 7,425 | An LLM evaluation platform supporting Llama3, Mistral, InternLM2, GPT-4, Qwen, GLM, Claude, and 100+ datasets. Evaluation tooling is increasingly critical as model releases accelerate. |
| [genieincodebottle/generative-ai](https://github.com/genieincodebottle/generative-ai) | Jupyter Notebook | 2,623 | A comprehensive Generative AI resource covering roadmaps, projects, use cases, and interview prep. It captures the ongoing demand for structured AI upskilling. |
| [ultralytics/ultralytics](https://github.com/ultralytics/ultralytics) | Python | 61,559 | YOLO26, YOLO11, and YOLOv8 for detection, segmentation, classification, pose, and tracking. It remains the dominant open-source computer-vision model suite. |
| [microsoft/ML-For-Beginners](https://github.com/microsoft/ML-For-Beginners) | Jupyter Notebook | 90,440 | A 12-week, 26-lesson classic machine-learning curriculum. It continues to anchor beginner ML education on GitHub. |
| [RyanLiu112/Awesome-Process-Reward-Models](https://github.com/RyanLiu112/Awesome-Process-Reward-Models) | | 180 | A comprehensive collection of process reward models. It reflects growing interest in reward modeling for reasoning and agentic LLM training. |
| [testtimescaling/testtimescaling.github.io](https://github.com/testtimescaling/testtimescaling.github.io) | HTML | 113 | A survey on test-time scaling in large language models. It tracks a key research direction for improving reasoning without retraining. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,903 | A user-friendly AI interface supporting Ollama, OpenAI APIs, and more. It is one of the highest-star RAG-adjacent front ends in the ecosystem. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,432 | Turns any codebase, docs, SQL schemas, configs, and PDFs into a queryable knowledge graph with local deterministic AST parsing and no vector store. It represents the “vectorless RAG” and code-knowledge-graph trend. |
| [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | TypeScript | 93,809 | Captures agent sessions, compresses them with AI, and injects relevant context into future sessions. Persistent cross-session memory is becoming a core agent requirement. |
| [infiniflow/ragflow](https://github.com/infiniflow/ragflow) | Go | 90,617 | A leading open-source RAG engine fusing retrieval with agent capabilities. It is a direct competitor to managed RAG pipelines and context layers. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,914 | Compresses tool outputs, logs, files, and RAG chunks before they reach the LLM, claiming 20% fewer tokens for coding agents and 60–95% fewer for JSON. Token-efficiency tooling is becoming a hot subcategory. |
| [mem0ai/mem0](https://github.com/mem0ai/mem0) | Python | 65,241 | A drop-in memory layer for AI agents with production-grade persistent context. It is a key building block for agent memory. |
| [run-llama/llama_index](https://github.com/run-llama/llama_index) | Python | 52,150 | A document-processing platform for AI, widely used for RAG and knowledge workflows. It remains a foundational RAG framework. |
| [milvus-io/milvus](https://github.com/milvus-io/milvus) | Go | 46,091 | A high-performance, cloud-native vector database for scalable ANN search. It continues to anchor the vector-database layer of the RAG stack. |

---

## 3. Trend Signal Analysis

The strongest signal today is **local and on-device AI infrastructure**. `colibri` (+868), `VoiceStudio` (+2,632), `picollm`, and `tiny-llm` all point to developers wanting frontier capability without cloud dependency. The technical direction is notable: pure C inference, disk-streamed MoE experts, X-Bit quantization, and Apple Silicon-first learning stacks. This is not just hobbyist energy; it reflects cost, privacy, and latency pressures on production AI.

A second major signal is **agent context and skill infrastructure**. `claude-mem`, `Graphify`, `headroom`, `mem0`, and `ragflow` show that the RAG conversation has moved from “which vector DB?” to “how do we compress, persist, and structure context across sessions?” Meanwhile, `agent-skills`, `Claude-Red`, `pentagi`, and `OpenResearch` show an emerging agent-skills supply chain, including security-sensitive and offensive-security use cases. The appearance of `apache/casbin-gateway` for AI & MCP security suggests MCP is becoming infrastructure that needs governance.

New tech stacks are also visible. Rust appears repeatedly in agent and infrastructure projects (`rig`, `OpenResearch`, `Codewhale`, `lancedb`, `qdrant`), while Go is strong in RAG engines and security gateways. Multi-modal creative agents are surging: `YuE` for music, `OpenMontage` for video, and `VoiceStudio` for voice. Finally, frontier-model references — Claude Fable 5.1, GPT-6-Astra, Gemini 3.8 Flash, Kimi, DeepSeek, GLM-5.2 — continue to drive prompt leaks, local runners, and evaluation tooling.

---

## 4. Community Hot Spots

- **Local/on-device inference and voice**: `colibri`, `VoiceStudio`, `picollm`, and `tiny-llm` are pushing private, low-cost AI onto developer hardware. Watch for more MoE streaming, quantization, and Apple Silicon optimization.
- **Agent memory and context compression**: `claude-mem`, `mem0`, `headroom`, and `Graphify` are defining the context layer for agents. This is likely to become as important as vector search was for early RAG.
- **Agent skills and security**: `agent-skills`, `Claude-Red`, `pentagi`, and `casbin-gateway` show that skill registries, offensive-security agents, and MCP gateways are becoming a serious sub-ecosystem.
- **Vectorless and graph-based RAG**: `PageIndex`, `Graphify`, `LightRAG`, and `cognee` are challenging the default “embed everything” approach. Reasoning-based retrieval and knowledge graphs are gaining traction.
- **Multi-modal creative production**: `YuE`, `OpenMontage`, `VoiceStudio`, and `MoneyPrinterTurbo` demonstrate that agentic workflows are moving into music, video, dubbing, and full media production.

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*