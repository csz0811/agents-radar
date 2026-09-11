# ArXiv AI Research Digest 2026-09-11

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-11 00:31 UTC

---

# ArXiv AI Research Digest — 2026-09-11

## 1. Today's Highlights

Today's submissions reveal three converging pressures on the field: **theory consolidation** (a positive resolution of the gap-entropy conjecture and a full characterization of language generation in the limit), **evaluation credibility** (a contamination-free hold-out showing time-series foundation models retain pretraining familiarity, plus a protocol arguing that enterprise AI should be measured by serving route rather than model identifier), and **agent memory and embodiment** (multiple papers on what agents should store, forget, and how VLMs can control robots through compact semantic interfaces). Applied work continues to push multimodal federated learning, reinforcement-learning-driven physics discovery, and claim-level auditing for high-stakes legal generation.

## 2. Key Papers

### 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [ConvMem: Convolutional Memory for Long-Context Reasoning](http://arxiv.org/abs/2609.10441v1) | Hongming Zhang, Zhaozhen Gu, Fengshuo Bai et al. | Proposes a convolutional memory mechanism that aggregates segment-level representations instead of relying purely on sequential, iterative memory updates for long-context reasoning. This matters because sequential memory schemes accumulate error and serialize computation, limiting both accuracy and throughput on very long inputs. |
| [A Later Test Set Is Not a New Domain: Pretraining Familiarity Survives a Contamination-Free Hold-Out](http://arxiv.org/abs/2609.10357v1) | Mahdi Naser Moghadasi, Faezeh Ghaderi | Builds a forecast hold-out that postdates thirteen time-series foundation models and classical baselines, testing whether temporal recency alone establishes a genuinely unseen domain. The finding is that pretraining familiarity survives the hold-out, implying that a later timestamp is not sufficient evidence of uncontaminated evaluation. |
| [Building Multilingual Bridges: Data Mixing as the Pillar of Generalization for In-Language Reasoning](http://arxiv.org/abs/2609.10445v1) | Mehrnaz Mofakhami, Ananya Sahu, Alejandro R. Salamanca et al. | Systematically studies data mixing as the driver of in-language reasoning generalization, addressing the tendency of reasoning models to reason in English regardless of prompt language. The results give concrete guidance for building non-English reasoning capability without sacrificing cross-lingual transfer. |
| [Forgetting Only What Matters: Layer-Selective Unlearning toward Robust LLMs](http://arxiv.org/abs/2609.10439v1) | Ravi Ranjan, Olivera Kotevska, Agoritsa Polyzou | Introduces layer-selective parameter updates for machine unlearning, replacing the broad or fixed parameter targeting of prior methods. The approach aims to remove sensitive or copyrighted content while preserving general model capability, directly relevant to privacy and regulatory compliance. |

### 🤖 Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Show-Harness: Just a VLM Agent Can Play Robots](http://arxiv.org/abs/2609.10522v1) | Yanzhe Chen, Zechen Bai, Zhijun Cao et al. | Introduces an embodied harness that lets foundation VLMs "play" robots through a compact semantic interface linking intent to action. This matters because it sidesteps task-specific policy training and offers a path from general VLM intelligence to real robot control. |
| [JarvisGUI: Towards Cross-Device GUI Agents with Dynamic Task Composition](http://arxiv.org/abs/2609.10451v1) | Zixiang Chen, Yuheng Lu, Zihao Cheng et al. | Targets GUI workflows that span multiple devices and platforms, requiring transfer of intermediate results, shared state, and coordination across heterogeneous environments. It fills a real gap, since existing GUI benchmarks overwhelmingly evaluate agents on single-device settings. |
| [TRACE: Training Reasoning Agents for Causal Exploration with Synthesized Rewards](http://arxiv.org/abs/2609.10315v1) | Rui Sun, Zhan Shi, Bing He | Extends reinforcement learning with verifiable rewards to diagnostic reasoning, where the true cause of an anomaly is not cheap to check, by synthesizing rewards for causal exploration. This broadens RLVR beyond mathematics and code into domains where answer verification is itself the bottleneck. |
| [What Should an Agent Forget? Separating What Is Stored from What Is Used](http://arxiv.org/abs/2609.10263v1) | Yuhang Li, Yuchen Li | Presents RD-Forget, a training-free framework that decouples what a persistent agent stores from what it uses at answer time. This resolves a real failure mode: a superseded fact can mislead a current-state answer while remaining essential for historical queries. |

### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [IdeaAMBIG: Benchmarking Implementation-Critical Gaps in Research-Idea Specifications](http://arxiv.org/abs/2609.10539v1) | Yiling Ma, Yilun Zhao, Sihong Wu et al. | Formalizes the "codification readiness" of research-method specifications, measuring whether an idea provides enough methodological detail for faithful implementation. It matters as an evaluation target for AI research assistants, where novelty and plausibility can mask under-specification. |
| [A positive resolution of the gap-entropy conjecture](http://arxiv.org/abs/2609.10529v1) | P. M. Aronow, Nathan Kallus, Patrick Lopatto | Proves the gap-entropy conjecture for fixed-confidence best-arm identification with independent unit-variance Gaussian arms and a unique optimal arm. This closes a long-standing theoretical question linking the gap entropy $H=\sum \Delta_i^{-2}$ to the optimal sample complexity of sequential identification. |
| [Characterizing Language Generation in the Limit: Finite Witnesses and a Separation-Width Hierarchy](http://arxiv.org/abs/2609.10525v1) | Xiaoyu Li, Andi Han, Jiaojiao Jiang et al. | Fully characterizes language generation in the limit for arbitrary families over a countable universe, showing generation is possible exactly when each target admits a finite positive witness. The separation-width hierarchy sharpens the boundary between learnable and generatable language classes. |
| [IBIB: A Protocol for Measuring Enterprise AI Systems by Serving Route, Not Model Identifier](http://arxiv.org/abs/2609.10494v1) | Blake Stenstrom, Charangan Vasantharajan, Brian Sathianathan | Argues that usable capability depends jointly on weights, serving route, precision, output contract, and harness, yet all 18 audited benchmarks score advertised model identifiers. It treats this mismatch as reportable measurement error and supplies a protocol to correct it. |

### 📊 Applications

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [OmniMed-FL: A Robust Multimodal Federated Learning Framework for Clinical Diagnosis](http://arxiv.org/abs/2609.10364v1) | Ayush Debnath, Ruelia Saha, Sudip Misra | Enables joint analysis of medical imaging and patient records without centralized aggregation, respecting HIPAA and GDPR constraints. It addresses the practical gap that standard multimodal clinical models require data pooling that compliance regimes forbid. |
| [Searching for New Physics with Reinforcement Learning](http://arxiv.org/abs/2609.10382v1) | Jacky Kumar, Marianne Bouchard, David London | Uses reinforcement learning to explore the SMEFT parameter space in search of anomalies that deviate from Standard Model predictions. It demonstrates RL as an active search strategy for particle physics rather than a purely predictive tool. |
| [GANDR: Claim Auditing for Verifiable Legal Answer Generation](http://arxiv.org/abs/2609.10293v1) | Chen Qian, Yimeng Wang, Yu Chen et al. | Moves grounded legal generation from whole-answer scoring to per-claim auditing against cited sources. This matters because a correct conclusion can currently rest on fabricated or loosely matched citations, a critical failure mode in high-stakes domains. |

## 3. Research Trend Signal

Three signals stand out. First, **evaluation validity is becoming a first-class research problem**: the contamination-free time-series hold-out and the IBIB serving-route protocol both argue that benchmark scores are systematically misattributed to the wrong object — the model identifier rather than the deployed system, or the model's capability rather than its pretraining exposure. Second, **agent memory is splitting into two distinct problems**: what to store (ConvMem, ontology-driven memory lifecycle) versus what to use at inference time (RD-Forget), with the latter reframing forgetting as a retrieval-time decision rather than a deletion operation. Third, **theory and practice are converging on sequential decision-making**, with the gap-entropy resolution, language generation in the limit, and RL-driven anomaly search all formalizing how much information each observation is worth — a shared mathematical core behind bandits, language learning, and scientific discovery.

## 4. Worth Deep Reading

1. **[A Later Test Set Is Not a New Domain](http://arxiv.org/abs/2609.10357v1)** — This is the most consequential evaluation paper of the day. It constructs the hold-out that everyone assumes would settle the contamination debate and shows it does not, which should change how time-series and other temporally ordered model evaluations are reported and reviewed.

2. **[A positive resolution of the gap-entropy conjecture](http://arxiv.org/abs/2609.10529v1)** — A definitive theoretical result from a strong author group. Read it for the proof technique as much as the theorem; fixed-confidence identification bounds propagate into experiment design across bandits, A/B testing, and adaptive data collection.

3. **[What Should an Agent Forget? Separating What Is Stored from What Is Used](http://arxiv.org/abs/2609.10263v1)** — Short, training-free, and conceptually clean. The store/use distinction reframes a large class of agent memory failures (stale facts, conflicting evidence, temporal queries) as a single design principle rather than a collection of heuristics.

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*