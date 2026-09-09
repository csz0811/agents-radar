# ArXiv AI Research Digest 2026-09-10

> Source: [ArXiv](https://arxiv.org/) (cs.AI, cs.CL, cs.LG) | 50 papers | Generated: 2026-09-09 22:46 UTC

---

# ArXiv AI Research Digest — 2026-09-10

## Today's Highlights

Submissions this cycle emphasize a shift from static prompt-response agents toward self-evolving, execution-aware systems: procedural graph scaffolds, coding agents that learn from their own tests, and on-policy harness evolution appear across multiple papers. Several training-stack results challenge standard assumptions—checkpoints selected by pretraining loss are not necessarily SFT-optimal, and group-relative rewards in RLVR can carry no learning signal without difficulty-aware sampling. Evaluation research is also maturing beyond static benchmarks, with sustained multi-turn pressure tests for sycophancy and audits that expose protocol-dependent bias findings. Applied work spans whole-body humanoid navigation, clinical primary-care diagnostics, and 3D open-vocabulary scene understanding, reflecting broader movement toward embodied and high-stakes real-world tasks.

## Key Papers

### 🧠 Large Language Models

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Learning Length-Extrapolatable Recurrent Models](http://arxiv.org/abs/2609.09157v1) | Hanwen Jiang | Revisits why recurrent models trained with backpropagation through time fail to generalize to longer sequences, arguing that dense per-token losses complicate standard vanishing/exploding-gradient explanations. It provides a clearer lens for designing recurrent models that can length-extrapolate from short-context training. |
| [Measuring LLM Sycophancy under Sustained Multi-Turn Pressure](http://arxiv.org/abs/2609.09090v1) | Leyuan Tang, Kangda Wei, Tianyu Jiang et al. | Introduces SPINE, a multi-turn evaluation protocol that applies sustained, adaptive disagreement instead of short pre-specified scripts. SPINE surfaces sycophancy failures that standard evals miss and supports more realistic robustness testing. |
| [It's Not RoPE that Creates Sinks: The Role of Self-Concentration and Value-Non-Mixing in Attention](http://arxiv.org/abs/2609.09085v1) | Raito Kiya, Satoki Ohashi, Kosuke Sato et al. | Argues that attention sinks and massive activations arise from self-concentration and non-mixing value structure rather than from RoPE positional encoding. This reframing matters for low-bit quantization and attention architecture design. |
| [Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1) | Sohir Maskey, Philipp Scholl, Jonas Knupp et al. | Shows in a 30B mixture-of-experts pipeline that checkpoints selected by pretraining loss or benchmark scores can become suboptimal after supervised fine-tuning. The result cautions against selecting checkpoints without considering downstream training stages. |
| [Transformers as In-Context Samplers: From Closed-Form Diffusion to Estimation-Free Sampling](http://arxiv.org/abs/2609.08981v1) | Arman Adibi, Alireza Jafari, Mohammad Ghavamzadeh et al. | Develops a theoretical treatment of transformers as in-context samplers, connecting closed-form diffusion ideas to estimation-free inference. It strengthens probabilistic interpretations of in-context learning and may inspire more robust sampling-based reasoning. |

### 🤖 Agents & Reasoning

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1) | Yuxing Lu, Yicheng Chen, Shanchan Wu et al. | Introduces procedural graphs as self-evolving execution structures that capture procedural knowledge—actions, ordering, and conditions—for LLM agents. This shifts agents away from unconstrained generation over accumulating histories, which is important for long-horizon reliability. |
| [ExecCritic: Learn to Test, Test to Improve for Coding Agents](http://arxiv.org/abs/2609.09133v1) | Leitian Tao, Baolin Peng, Haorui Wang et al. | Presents a coding-agent framework that generates tests and uses execution feedback to iteratively repair repository code. By avoiding a single trajectory that writes both patch and test, it aims to reduce correlated errors and improve issue-driven patching. |
| [Co-Evolving Harnesses and Models: On-Policy Correction Helps Weaker Models Catch Up Where Imitation Fails](http://arxiv.org/abs/2609.09134v1) | Zhou Yu, Bin Bi, Shiva Kumar Pentyala et al. | Studies automatic co-evolution of modular harnesses and models, showing that on-policy correction helps weaker models improve beyond imitation-based training. This suggests a cheaper alternative to frontier-model distillation for domain-specific agent tasks. |
| [Copying explains the collective behavior of AI agents in the wild](http://arxiv.org/abs/2609.09150v1) | Giordano De Marzo, Nicola Alboré, David Garcia | Analyzes a June 2026 episode in which thousands of short-lived AI agents used a shared public wiki to help each other pass timed tests, finding copying was central to collective success. It offers a rare empirical window into emergent cooperation among autonomous agents. |

### 🔧 Methods & Frameworks

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [ThinkPrior: Zero-Rollout Difficulty Priors for Cold-Start Prompt Selection in RLVR](http://arxiv.org/abs/2609.09075v1) | Tommy Sha, Skylar Zhai, Siqi Zhao et al. | Supplies zero-rollout difficulty priors to seed GRPO/RLVR prompt selection, addressing cold-start settings where groups with all-correct or all-wrong rollouts provide no useful relative advantage signal. This reduces inefficiency in verifiable-reward training pipelines. |
| [Training-Free Task Vectors for LLM Behavioral Control](http://arxiv.org/abs/2609.09054v1) | Gabriel J. Perin, Lucas Boscaini, André Araujo et al. | Identifies task-vector directions in weight space without expensive fine-tuning, enabling faster behavioral editing of LLMs. It makes post-training model control more practical and accessible. |
| [Curriculum Learning as Transport: Understanding Curricula with Wasserstein Geodesics](http://arxiv.org/abs/2609.09099v1) | Changho Shin, David Alvarez-Melis | Frames curriculum learning as movement along Wasserstein geodesics, decomposing difficulty, ordering, exposure, and pacing. This provides a formal geometric lens for designing and comparing curricula. |

### 📊 Applications

| Paper | Authors | Summary |
| :--- | :--- | :--- |
| [TANGO: Humanoid Navigation in Cluttered Environments with a Whole-Body Vision-Language-Action Model](http://arxiv.org/abs/2609.09158v1) | Anqi Li, Yuxin Chen, Zhaobo Li et al. | Presents a whole-body vision-language-action approach for humanoid navigation in cluttered rooms, coordinating arm and body geometry instead of treating navigation as pure 2D path planning. It advances humanoid mobility in human-centered indoor environments. |
| [Performance of Clinical AI System and Physicians and Frontier Language Models in primary care diagnostics](http://arxiv.org/abs/2609.09070v1) | Andy Nkansah, Hanna Plotnitskaya, Stanislau Salavei et al. | Compares a clinical AI system, physicians, and standalone frontier LLMs on 150 Polish-language primary-care consultations with adaptive information gathering. The study highlights diagnostic concordance gaps and the need for evaluation that includes management decisions, not just final answers. |
| [GoDeep: Annotation-Free Open-Vocabulary 3D Scene Understanding via Language-Space Lifting](http://arxiv.org/abs/2609.09082v1) | Thodoris Betsas, Anastasios Doulamis, Andreas Georgopoulos | Proposes annotation-free open-vocabulary 3D segmentation by lifting language features into 3D without requiring large 3D training corpora. It targets CLIP’s bag-of-words limitations, which is important for compositional 3D scene understanding. |

## Research Trend Signal

Today’s papers point toward a broader movement from static model-centric benchmarks to feedback-driven, self-modifying systems. Agent papers treat procedural memory, execution signals, and test generation as first-class design elements rather than relying on unstructured prompts or accumulated history. Training-stack results reinforce that data and checkpoint choices must be optimized jointly across pretraining, fine-tuning, and alignment; RLVR work similarly injects difficulty priors where group-relative rewards become uninformative. There is also a methodological turn toward reusable formal abstractions—procedural graphs, Wasserstein curriculum paths, and training-free task vectors—rather than purely scaling recipes. Important emerging threads include mechanistic reinterpretations of attention sinks, sustained multi-turn evaluation, and empirical multi-agent copying dynamics. On the application side, vision-language-action models are moving toward cluttered physical environments, while clinical and 3D perception systems emphasize adaptive evaluation and reduced annotation cost. Several papers identify failures of common assumptions about checkpoint goodness, RoPE, and static audits, indicating a field increasingly focused on self-correction.

## Worth Deep Reading

- [Procedural Graphs: Self-Evolving Execution Structures for LLM Agents](http://arxiv.org/abs/2609.09153v1) — Proposes an explicit, evolving representation for procedural knowledge instead of unstructured agent histories. Likely to influence agent scaffolding, tool-use, and self-improvement design.
- [Good Pretraining, Bad SFT: Checkpoint Quality Across the Training Stack](http://arxiv.org/abs/2609.08966v1) — Challenges a common production assumption using concrete 30B MoE evidence: pretraining loss alone is not a reliable proxy for post-SFT quality.
- [Learning Length-Extrapolatable Recurrent Models](http://arxiv.org/abs/2609.09157v1) — Long-context efficiency remains a core bottleneck, and this paper reconsiders both theoretical and training-side causes of length-extrapolation failure in recurrent architectures.

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*