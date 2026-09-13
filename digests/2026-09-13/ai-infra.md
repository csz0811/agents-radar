# AI 基础设施日报 2026-09-13

> 生成时间: 2026-09-13 00:17 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 跨项目对比报告 — AI 基础设施生态
**数据窗口：** 2026-09-13（24 小时摘要） · **项目：** vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth

---

## 1. 生态概览

今天的活动压倒性地是*反应式*而非*增量式*：过去 24 小时内没有项目发布带版本号的 release，但 SGLang 记录了 338 条 PR 更新，LiteLLM 为 241 条，大部分工作投向硬件启用和 bug 压制，而不是新能力。**DeepSeek-V4.1-Flash 是整个技术栈唯一的强制驱动因素**——它在 vLLM 中驱动 SM8x/Ampere 支持请求和 SM120/SM121 正确性失败，在 SGLang 中驱动静默 25% GEMM 误差和 CUDA-graph capture 失败，而在 Ollama 和 Unsloth 中仅有一个*用户请求*（无实现）。这个窗口中最危险的一类缺陷是**静默数值损坏**（量化 MoE 路由、FP8 absorb GEMM、Marlin W4A8-FP8），而不是崩溃——其中一些会生成看似合理的 token 流，却不暴露任何错误。与此同时，训练/微调层正在承受来自上游 `trl`/`accelerate` 变动的附带损害，而网关层正与成本核算正确性作斗争。整体图景：**前沿服务引擎在交付内核级性能的同时，仍在与新 Blackwell 部件上的正确性回归作斗争**，而本地运行时在数据中心级 checkpoints 上落后整整一个模型代际。

---

## 2. 活动对比

| 项目 | 层级 | Issue（24h） | PR（24h） | 发布 | 状态备注 |
|---|---|---|---|---|---|
| **vLLM** | 服务引擎（数据中心） | n/d（密集；逐项列出 12+ issue） | n/d（逐项列出 10+ PR） | **无** | 3 个长期升级跟踪器仍开放（Transformers v5、batch-invariant、zero-JIT）。12 个未决稳定性项，1 个 CUDA IMA 崩溃。 |
| **SGLang** | 服务引擎（数据中心） | **26** 项更新 | **338** 项更新 | **无** | CI：3 个损坏，9 个 flaky，997 个最近已修复。2 个关键静默/崩溃 bug，无修复 PR。 |
| **llama.cpp** | 本地/边缘运行时 | n/d（逐项列出 8+ issue） | n/d（逐项列出 6+ PR） | **b10923–b10934**（12 个构建） | 唯一持续出包的项目。5 个高严重度未决回归。 |
| **Ollama** | 本地运行时 + 分发 | n/d（逐项列出 10+ issue） | n/d（逐项列出 8+ PR） | **无** | 1 个关键 KV 泄漏 bug，3 个高严重度。两个行为变更 PR 待处理（`OLLAMA_CONTEXT_SHIFT`、thinking budget）。 |
| **LiteLLM** | LLM 网关 / 代理 | **33** 项涉及 | **241** 项涉及 | **无** | 2 个相互竞争的机器人生成目录同步（83 个新模型）需要合并。2 个未修复的安装/崩溃循环阻塞项。 |
| **Unsloth** | 微调 / 训练 | n/d（逐项列出 10+ issue） | n/d（逐项列出 12+ PR） | **无** | `main` 自 09-11 起为红，污染约 25 个 PR；修复今日合入。`unsloth:latest` 在 GPU 主机上训练损坏（已修复）。 |

> **注意：**“updates/touched” ≠ 净新增。只有 SGLang 和 LiteLLM 公布了汇总计数；其他项目逐项列出值得注意的事项。把这些计数视为活动*信号*，而不是同口径指标。

**解读：** SGLang 和 LiteLLM 是变动最剧烈的项目；llama.cpp 是唯一有发布节奏的项目，这反映其滚动构建模式，而非更高速度。vLLM 的活动不成比例地集中在*静默正确性分诊*上——其 bug 项与功能项的比例是这一组里最差的。

---

## 3. 模型支持竞赛

**前沿数据中心模型——vLLM 和 SGLang 并驾齐驱，但都不完整。**

| 模型 | vLLM | SGLang | llama.cpp | Ollama |
|---|---|---|---|---|
| **DeepSeek-V4.1-Flash** | SM120/121 **失败**（#56461）；ROCm MI355X 可运行但余量浪费（#56506）；不支持 SM8x | SM121 静默 25% GEMM 误差（#39193）；MXFP4 deep_gemm capture 失败（#39226）；gfx950 FP8 two-pool unified KV **已启用**（#37413） | 不支持 | **仅收到请求**（#10838） |
| **DeepSeek-V4-Flash/-0731** | 不支持 SM8x（#50576，108 条评论）；len ≡3 mod 4 时的错误 token bug | — | 不支持 | — |
| **GLM-5.2 / 5.3** | de-JITification（#55348/56323）；5.3-Flash 胡言乱语 bug（#56605） | 工具解析器 union 修复（#39136） | dense-MLA CUDA 上**输出损坏**（#26027） | — |
| **Kimi K3** | 性能跟踪（#50587） | PP8 TTFT 约 30s 下限（#34815） | — | — |
| **Qwen3.5 / Qwen4** | 混合 GDN prefix-cache 修复（#52244）；QSA indexer OOM（#56457） | — | Sparse-FA PR（#28770） | — |
| **MiniMax H3** | — | VibeCUDA MSA 集成（#39233） | GGUF Conv3D 加载失败（#38904） | — |
| **Gemma 4** | — | Gemma 4 detector 修复（#39240） | OpenVINO 加载失败（#24415） | 统一视觉 PR（#16879） |
| **ELMOD 2.7b** | — | — | 转换 PR（#28818） | — |

**谁领先：** **vLLM** 拥有最广泛的硬件矩阵（SM8x → SM100/103 → SM120/121，外加 ROCm MI355X），并且是新 checkpoint 的参考目标——它的短板是*对 DSv4-Flash 的 Ampere 支持*，后者完全不存在。**SGLang** 在*第二平台深度*上领先：它是唯一一个今天有活跃 gfx942/gfx950、NPU HiCache 和 Apple/MLX 路径落地的项目，并且在 AMD 上率先为 DSv4 落地 FP8 two-pool unified KV。**llama.cpp 和 Ollama 在数据中心 MoE checkpoints 上实际上落后一代**；llama.cpp 在 2026 年现实中的角色是 GGUF 量化的中等规模模型（Qwen、Gemma、Llama），而不是 DSv4.1 级服务。

---

## 4. 性能前沿

| 维度 | vLLM | SGLang | llama.cpp | Unsloth |
|---|---|---|---|---|
| **KV cache / offload** | KV-offload CPU store 修复（#56621）；NIXL PCP/DCP 分片（#56645）；MTP 下的 hybrid-GDN prefix cache（#52244） | HiCache prefix-hit 正确性（#39147）；ROCm FP8 KV 路径（#37413） | 4-bit KV CPU fallback——**约 30× 减速**（#28633）；混合模型的 slot save/restore 损坏（#25913） | — |
| **分布式服务** | 低 SM multimem reduce-scatter SM100/103（#55072）；ROCm elastic EP 死锁修复（#56610） | PP8 分离式 prefill TTFT 下限（#34815）；争用感知 EPLB RFC（#39192） | — | — |
| **量化** | NVFP4 NaN sentinel（#52501）；Marlin W4A8-FP8 *静默损坏*（#49546）；RDNA3 W4A16 MoE 重构（#44460） | FP8 `wo_a` absorb GEMM 在 SM121 上**约 25% 数值误差**（#39193）；packed FP4 KV 请求（#38902） | Blackwell 上 IQ 量化的 cuBLAS fallback（#28823）；Vulkan IQ3_S MMQ（#28822） | **EXL3 后端**——2-bit + **MoE 量化**，而 bitsandbytes 做不到（#7115） |
| **内核 / 融合** | DSv4.1 mHC 折叠进延迟 pre-projection（#56633）；DeepSeek DeepSelect TopK（#56464）；de-JITification（#55348/56323） | `trtllm_mla` 在 verify 上融合 FP8 KV/Q（#39232）；MegaMoE SM 预算修复（#39223） | 面向 Qwen4 的 Sparse FA（#28770）；GCN HIP 配置表落地（b10929） | CPU 侧每步开销：B200 LoRA SFT **0.85s → 0.66s/step**（#10744） |
| **投机解码** | DFlash：IMA 崩溃、FSM 失败、185k ctx 下 4× *减速*（#54691） | 量化 DFlash2 draft → **约 0% 接受率，比没有 drafter 更慢**（#39087）；ngram 路线图（#21052） | MTP：RTX 5090 原生 Linux 上约 1.7×，Windows MSVC 上 **约 57× prefill 减速**（#28790） | — |
| **多模态 / TTFT** | FP8 文本 TTFT 在 5 req/s 下 **−34.5%**（#56305） | 向量化 diffusion JointThreshold（#34122） | — | — |

**精力集中在哪里——四点观察：**

1. **投机解码是最喧闹的战场，也是最不可靠的。** 三个引擎今天都发布或调试了 spec-decode 工作，而且三者都有未决报告显示 drafter *输给*无 drafter（vLLM 长上下文、SGLang 量化 draft、llama.cpp Windows MTP）。接受率没有被当作一等指标来监控，这就是这些问题未被发现的原因。
2. **瓶颈是量化正确性，而不是速度。** 这个窗口里的每个静默损坏 bug 都与量化相关（FP8 absorb GEMM、Marlin W4A8-FP8、MXFP4 deep_gemm、Blackwell 上的 IQ 量化）。vLLM #49546 中 2.5% 的内核加速，明确不值得以损坏为代价。
3. **KV cache 正在从内存问题转向正确性与覆盖问题**——offload 水位线、混合/循环模型下的 prefix-hit 记账、NIXL 分片暴露，压过了原始容量工作。
4. **Blackwell 上训练侧的优化空间在主机侧，而不是内核侧**——Unsloth 的 22% 步时提升来自每步 CPU 开销，这与服务引擎的优化目标有本质不同。

---

## 5. 层级定位

| 层级 | 项目 | 主要角色 | 部署目标 | 差异化 |
|---|---|---|---|---|
| **数据中心服务引擎** | **vLLM** | 高吞吐多租户推理 | 8×H20/H100/B200/MI355X 集群 | 最广泛硬件矩阵；DeepSeek/GLM 事实参考；最强 MoE + 量化内核覆盖面 |
| **数据中心服务引擎** | **SGLang** | 服务 + 结构化输出/agent 前端 | 同上，外加 AMD/NPU/Apple | 在 PD 解耦、Radix/HiCache、解析器正确性、第二平台方面领先 |
| **本地/边缘运行时** | **llama.cpp** | 单二进制推理，GGUF | RTX 50xx、RDNA3/4、Intel Arc、Apple、CPU | 唯一真正跨平台运行时；滚动构建；IQ/K-quant 生态主导者 |
| **本地运行时 + 分发** | **Ollama** | CLI/桌面模型用户体验，封装 llama.cpp | 工作站、Strix Halo、Jetson、Windows/macOS | 拥有*开发者上手*层，而非内核层；继承 llama.cpp 的限制 |
| **LLM 网关** | **LiteLLM** | 提供商抽象、路由、成本/预算 | 位于*上述所有*系统前面的代理 | 跨提供商目录、支出跟踪、护栏；不在推理数据路径中 |
| **微调** | **Unsloth** | LoRA/QLoRA SFT + GRPO，Studio 应用 | 单 GPU B200/4090、ROCm | 内存高效训练 + MoE 量化（EXL3）；对上游依赖敏感 |

**关键结构性洞察：** 这些项目**并非全面竞争**。LiteLLM 作为路由器位于 vLLM/SGLang/Ollama *之上*——而今天的摘要正好展示了该层的故障模式：以 `openai/` 为前缀的自托管模型被静默路由到 Responses API，导致 vLLM/SGLang/TGI 后端的多模态内容被丢弃。Ollama 位于 llama.cpp *之上*。Unsloth 是正交的——它消费 Hugging Face checkpoints，并产出随后由服务引擎运行的权重。唯一真正的正面竞争是数据中心服务层的 **vLLM vs. SGLang**，以及本地层的 **llama.cpp vs. Ollama**（Ollama 是封装器，而非内核竞争者）。

---

## 6. 趋势信号

**1. 新模型启用现在受硬件正确性门控，而不是受模型代码门控。** DSv4.1-Flash 在两个引擎的 SM120/SM121 上“能跑”——只是加载 75 GB 权重后返回错误数字，或 graph capture 失败。2026 年容量规划的实际约束是*经验证的（模型 × GPU × 量化配方）三元组*，而不是模型可用性。

**2. 静默损坏是主导风险类别——要为其做埋点。** 静默输出损坏（vLLM #49546、SGLang #39193、Ollama 全零 embedding 返回 HTTP 200、llama.cpp 在 Blackwell 上的 IQ 量化）在这个窗口里数量超过崩溃。**行动：** 在部署门禁中加入输出健全性金丝雀（重复 token 检测、哨兵提示、非零 embedding 断言）——这些 bug 没有一个会产生日志行。

**3. 投机解码需要熔断开关和接受率指标。** 每个引擎至少有一个未决报告显示 spec-decode 是*净损失*（vLLM #54691、SGLang #39087、llama.cpp #28790），以及一个显示它破坏下游契约（grammar FSM #53777、YaRN prefix cache #54094）。**行动：** 按请求、依据上下文长度和 grammar 模式对 spec-decode 做门控；在接受率 <1.5 时告警。

**4. 确定性正在成为 RL/评测的一等要求。** vLLM 在序列并行下的 batch-invariance 破坏（#56370）和 SGLang 的“内核位级相同但贪心输出不同”案例（#39235）都在今天落地。**行动：** RL 和评测流水线应固定非 SP 配置，并把 batch-invariance 视为经过测试的不变量。

**5. 混合（Mamba/GDN）架构下的前缀/radix 缓存是一条活跃的正确性前沿。** vLLM #54094（1.04M prompts 上零复用）、SGLang #39147（无法恢复的 prefix hits）、llama.cpp #25913（循环模型的 slot save/restore）。每请求成本收益是真实的，但记账还不可信。

**6. 网关经济性审计不足。** LiteLLM 在同一窗口存在未决的多计费（实时缓存音频约 2×）、少计费（Azure 支出 → $0、OCR → $0）以及虚假预算超限路径。**行动：** 将网关报告的支出与提供商发票对账；尚不要将 LiteLLM 的预算执行视为权威。

**7. 上游依赖变动是训练栈中的顶级生产风险。** `accelerate` 1.15.0 破坏了*所有* Windows ROCm 训练；TRL ≥0.20 移除了 Unsloth Studio 仍在发出的 kwargs；并且两天红灯的 `main` 污染了约 25 个 PR。**行动：** 固定 `accelerate` <1.15 并显式固定 `trl`；用今天的修复重建 Studio Docker 镜像。

**8. AMD/NPU 现在是一个真正的第二平台——但伴随性能税。** SGLang 今天落地了 gfx942、gfx950 和 NPU 路径；vLLM 有 MI355X 基线，但“大量设备余量未被使用”；llama.cpp 增加了 GCN 配置表。**行动：** 今天在 ROCm 上要为调优投入做预算，而不是指望达到对等性能。

**9. 客户端断连健壮性是一个共同盲点。** SGLang 因单个客户端掉线导致全引擎崩溃（#39216）是这个窗口中最严重的单个 bug；Ollama 的 keep-alive 禁用导致回环耗尽（#18392）属于同一故障家族。**行动：** 这些引擎前面的每个网关都需要重试、退避和健康检查故障转移——不应假定会优雅降级。

**10. 工具调用和结构化输出仍然是最具杠杆效应的可靠性工作。** 在所有六个项目中，解析器/grammar 修复是*面向 agent* 的变更中最大的一簇：llama.cpp 的 `common_schema` 重构（b10934）、三个 SGLang 解析器修复、两个 Ollama Gemma4 解析修复。**行动：** 如果你运行 agents，这是用户可见收益最清晰的升级类别——同时也是 schema 边缘用例回归风险最高的类别。

---

**给决策者的结论：** 数据中心服务层（vLLM、SGLang）在 Blackwell 上处于*正确性防御*姿态——功能速度很高，但经过验证的配置正在收窄。固定到经验证的（模型 × GPU × 量化）配方，为静默输出损坏做埋点，积极门控投机解码，并把网关和训练层视为两个最可能因*上游变动*（而非你自己的代码）在本周引发生产事故的地方。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-13

## 今日亮点
过去 24 小时没有新版本发布，但活动主要由 DeepSeek-V4.1-Flash 支持及其后续影响主导：新的 SM8x/Ampere 支持请求、MI355X 上的 ROCm 性能差距，以及 Blackwell/SM12x 上若干特定硬件的正确性 bug。投机解码（DFlash）相关报告密集出现——非法内存访问、语法 FSM 失败和长上下文性能下降——再加上活跃的 KV-offload/去 JIT 化 PR 工作，构成了今日全貌。

## 版本发布与破坏性变更
过去 24 小时无。值得关注的持续升级跟踪项：
- [Issue #38379](https://github.com/vllm-project/vllm/issues/38379) — Transformers v5 升级跟踪项（持续更新的阻塞项列表）。
- [Issue #27433](https://github.com/vllm-project/vllm/issues/27433) — 批次不变特性/性能优化跟踪项（93 条评论）。
- [Issue #49349](https://github.com/vllm-project/vllm/issues/49349) — “运行时零 JIT 编译”采用跟踪项。

## 新模型与硬件支持
- [Issue #50576](https://github.com/vllm-project/vllm/issues/50576) — **DeepSeek-V4-Flash / -0731 的 SM8x（Ampere A100/A800、RTX 30xx）支持**仍是互动量最高的条目（108 条评论，16 👍）；这两个 checkpoint 目前都无法在 SM8x 上运行。
- [Issue #56461](https://github.com/vllm-project/vllm/issues/56461) — DeepSeek-V4.1-Flash 在 e77daef89 上**无法在 SM120/SM121（GB10）上提供服务**：SWA 缓存 block 32 与 SM120 decode page 64 不匹配，indexer `block_kv=128` 与 DeepGEMM sm120（仅支持 64）不匹配。
- [Issue #56506](https://github.com/vllm-project/vllm/issues/56506) — 关于 **DeepSeek-V4.1-Flash 在 ROCm（MI355X/gfx950）上的 RFC**；MXFP4 MoE + DSpark MTP 可运行，但设备仍有大量余量未利用。
- [Issue #44460](https://github.com/vllm-project/vllm/issues/44460) — 将 **RDNA3 W4A16 MoE dispatch** 重构为 oracle/expert-class 模式。
- [PR #55802](https://github.com/vllm-project/vllm/pull/55802) — 移除 DCP indexer interleave guard，启用 DCP 搭配 NIXL（interleave 64）等配置。
- [PR #56645](https://github.com/vllm-project/vllm/pull/56645) — **NIXL PCP/DCP**：将 PCP producer KV shards 暴露为 transfer ranks（GLM-5.2-NVFP4，PCP4+TP1+EP4+DCP4 → TP4）。

## 性能与优化
- [PR #56633](https://github.com/vllm-project/vllm/pull/56633) — **DSv4.1**：将 mHC post block 合并进 delayed pre projection，消除每个 seam 处冗余的 residual 重读。
- [PR #56305](https://github.com/vllm-project/vllm/pull/56305) — 面向**多模态 prefix attention** 的 Triton image masks + FlashInfer causal attention 组合；在固定 5 req/s 下，**FP8 文本 TTFT 降低 34.5%**。
- [PR #55072](https://github.com/vllm-project/vllm/pull/55072) — 面向 SM100/SM103 MNNVL 组（TP2/4/8）的低 SM **multimem reduce-scatter**，≤8 CTAs/GPU。
- [PR #56464](https://github.com/vllm-project/vllm/pull/56464) — 为 DSA 稀疏 indexer 集成 **DeepSeek DeepSelect TopK**，使每种 decode top-k 实现都可选择。
- [PR #52244](https://github.com/vllm-project/vllm/pull/52244) — 恢复 MTP 投机解码下的 **hybrid GDN prefix-cache 命中**（Qwen3.5-122B-A10B 案例中，对齐到 hash unit 的 prompt 命中为零）。
- [PR #56512](https://github.com/vllm-project/vllm/pull/56512) — DS V4.1 **Engram 异步预取**用于 offloaded lookups，外加 engram DP 分片。
- [PR #55348](https://github.com/vllm-project/vllm/pull/55348) / [PR #56323](https://github.com/vllm-project/vllm/pull/56323) — GLM-5.2/5.3 和 DSv4 的**去 JIT 化**，以及 sampling/DFlash JIT kernel 的 warmup 迁移。
- [Issue #50587](https://github.com/vllm-project/vllm/issues/50587) — Kimi K3 性能优化跟踪项；[Issue #38256](https://github.com/vllm-project/vllm/issues/38256) — 增量式 MoE expert offloading RFC（GPU cache + 异步 pipeline，LFRU 淘汰）。
- [Issue #56506](https://github.com/vllm-project/vllm/issues/56506) — ROCm 基线数据：8× MI355X，TP4，MXFP4 MoE + DSpark MTP → 并发 1 时 35.89 out tok/s（8.97/GPU），TTFT p50 0.898s。

## 稳定性与回归
按严重程度排序（崩溃/数据损坏优先）：

1. [Issue #56389](https://github.com/vllm-project/vllm/issues/56389) — 高并发下，8× H20（SM90）上的 Triton `dsv4_topk` MoE 路由 kernel 出现 **CUDA 非法内存访问**；可通过 `max_num_seqs=256` 缓解。
2. [Issue #49546](https://github.com/vllm-project/vllm/issues/49546) — `VLLM_MARLIN_INPUT_DTYPE=fp8`（Marlin W4A8-FP8）在 GB10/sm_121a 上**静默损坏输出**——WNA16 INT4 MoE 在 temp 0 下会发出重复的 `</think>` 循环（约 2.5% 的 kernel 加速并不值得）。
3. [Issue #56457](https://github.com/vllm-project/vllm/issues/56457) — Qwen4Exp QSA indexer：逐 chunk 的 logits buffer 增长导致统一内存 GB10（SM121）在长 prefill 期间出现 **device OOM/挂起**。
4. [Issue #56461](https://github.com/vllm-project/vllm/issues/56461) — DeepSeek-V4.1-Flash **无法在 SM120/SM121 上提供服务**（cache block/page 与 indexer block_kv 不匹配）。
5. [Issue #56605](https://github.com/vllm-project/vllm/issues/56605) — GLM-5.3-Flash 在多轮 agentic 使用中退化为重复 token 的**“词语沙拉”**。
6. [Issue #55927](https://github.com/vllm-project/vllm/issues/55927) — 在 prompt 长度 ≡ 3 (mod 4) 时，DeepSeek-V4-Flash-0731 在深度上下文检索中**确定性地输出错误 token**；多家提供商均可复现。
7. [Issue #53777](https://github.com/vllm-project/vllm/issues/53777) — DFlash2 投机解码 + xgrammar：在 `json_object` 语法上确定性地出现 **“Failed to advance FSM”**。
8. [Issue #54691](https://github.com/vllm-project/vllm/issues/54691) — 在 hybrid GDN 模型上，DFlash 在长上下文下**净亏**：185k 上下文 decode 从 71 降至 16 tok/s（DT=4）；没有按序列长度禁用的 hook。
9. [Issue #54094](https://github.com/vllm-project/vllm/issues/54094) — DFlash2 + YaRN：1.04M prompt 的 **prefix-cache 复用为零**，而 target-only 复用约 1.039M token。修复进行中，见 [PR #54381](https://github.com/vllm-project/vllm/pull/54381)（mamba/draft-group 调查）。
10. [Issue #56370](https://github.com/vllm-project/vllm/issues/56370) — 启用序列并行 / async TP 时，**批次不变性被破坏**（`VLLM_BATCH_INVARIANT=1` + `pass_config.enable_sp`）。
11. [Issue #51782](https://github.com/vllm-project/vllm/issues/51782) — 当大量值落入同一粗粒度 histogram bin 时，`persistent_topk` **静默丢弃候选**（B300/sm103）。
12. [Issue #51562](https://github.com/vllm-project/vllm/issues/51562) — GatedDeltaNet metadata builder 将无状态的首个 chunk 误判为 decode，读取未清零的 recurrent state。

值得注意的修复/清理：
- [PR #52501](https://github.com/vllm-project/vllm/pull/52501) — NVFP4：在加载时用 NaN 哨兵检测未加载的 `weight_scale`，而不是稍后产生 NaN。
- [PR #56621](https://github.com/vllm-project/vllm/pull/56621) — KV offload：在 no-forward 步骤提交 CPU store，避免复制丢失 / 虚假完成 watermark。
- [PR #56610](https://github.com/vllm-project/vllm/pull/56610) — ROCm 弹性 EP 扩缩容死锁修复（根因在 RCCL）。
- 已关闭：[Issue #52644](https://github.com/vllm-project/vllm/issues/52644)（MRV2 + FULL_DECODE_ONLY graph 下 ROCm DeepSeek V4 精度）、[Issue #42024](https://github.com/vllm-project/vllm/issues/42024)（NIXL connector 静默禁用 HMA，使 KV 容量减半）。

## 对应用开发者的意义
- **H20 + DeepSeek-V4.1-Flash**：在 #56389 修复前，将 `max_num_seqs` 限制为 256；更高并发可能通过 Triton top-k kernel 导致引擎崩溃。
- **Blackwell / SM12x（GB10、RTX PRO 6000）**：使用 NVFP4 和 Marlin W4A8-FP8 量化时需谨慎——目前有活跃的静默损坏和 OOM 报告。在 #49546/#56457/#52501 稳定前，优先使用已验证的方案。
- **投机解码**：DFlash 仅在短上下文下是收益项；在约 185k 上下文时，可能比不启用投机解码慢 4×（#54691），并且与 JSON 语法结构化输出（#53777）和 YaRN prefix caching（#54094）交互不良。
- **Ampere（A100/A800）用户**：DeepSeek-V4-Flash/-0731 在 SM8x 上仍不受支持（#50576）——请据此规划容量。
- **ROCm 用户**：MI355X 可运行 DSv4.1-Flash，但性能仍有很大提升空间（#56506）；预计需要调优，而非开箱即用达到同等性能。
- **依赖确定性的 RL/评估流水线**：批次不变性加上序列并行/async TP 当前已损坏（#56370）——如果可复现输出很重要，请固定使用非 SP 配置。
- **长上下文多租户服务**：关注 MTP 下 hybrid GDN 的 prefix-cache 修复（[PR #52244](https://github.com/vllm-project/vllm/pull/52244)）和多模态 TTFT 收益（[PR #56305](https://github.com/vllm-project/vllm/pull/56305)）——两者都能直接降低单请求成本。

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 — 2026-09-13

*数据窗口：2026-09-12 → 2026-09-13 · 来源：github.com/sgl-project/sglang*

---

## 1. 今日亮点

过去 24 小时内没有新版本发布；活动主要由 26 条 issue 更新和 338 条 PR 更新占据，其中长尾中还有大量 Blackwell/SM121 正确性 bug，以及一个新的 `trtllm_mla` 投机解码融合 PR。CI 跟踪器报告，截至 2026-09-13 00:15 UTC，`main` 上有 **3 个 broken、9 个 flaky 测试**，另有 997 个近期已修复。最令人担忧的是 SM121 上 DeepSeek-V4.1 FP8 `wo_a` absorb GEMM 出现**静默的约 25% 数值误差**，以及**客户端断开连接触发整个引擎崩溃**。

---

## 2. 版本发布与破坏性变更

**过去 24 小时内无版本发布。**

值得提醒部署者的行为变更：

- **`/v1/responses` 持久化现在被 `--enable-response-store` 控制，且默认 OFF** — [PR #39122](https://github.com/sgl-project/sglang/pull/39122)。原因是两个无界内存字典（`response_store`、`msg_store`）没有 TTL/淘汰机制，此外还有 PD 特有的正确性问题：prefill 节点的簿记与 decode 不一致。如果你依赖跨节点的响应检索，必须显式开启。
- **[inactive, RFC] 权重加载重构已关闭** — [Issue #24703](https://github.com/sgl-project/sglang/issues/24703)。该提案旨在抽象出在 165 个模型文件中重复的约 50–150 行 `load_weights` 例程。因 inactive 关闭，因此预期现状将继续。
- **[inactive] 统一 Radix Cache 拆分为 `TreeCore`** 已关闭 — [Issue #30145](https://github.com/sgl-project/sglang/issues/30145)。

---

## 3. 新模型与硬件支持

| 领域 | 变更 | 链接 |
|---|---|---|
| **Blackwell / MiniMax** | 独立 VibeCUDA MSA 集成 — 显式路由到 FlashInfer `backend="vibecuda"`、fail-closed 提供者选择、CUDA Graph 安全的元数据 staging 与生命周期处理 | [PR #39233](https://github.com/sgl-project/sglang/pull/39233) |
| **AMD gfx942** | 将 DSA indexer projection 融合与仅限 CUDA 的 fused rotary/quant/cache-write 解耦；两个重复的 `wk`/`weights_proj` projection 可以共享一个 BF16 GEMM，同时保留 HIP Hadamard 路径 | [PR #39243](https://github.com/sgl-project/sglang/pull/39243) |
| **AMD gfx950** | 为 DeepSeek-V4 启用 FP8 双池 `unified_kv` | [PR #37413](https://github.com/sgl-project/sglang/pull/37413) |
| **NPU** | DeepSeek-V4 主机内存缓存管理（HiCache / unified radix / memory pool） | [PR #37382](https://github.com/sgl-project/sglang/pull/37382) |
| **ROCm** | 在 ROCm 上接纳统一 Triton router，包括单组路由；该 kernel 从来不是 CUDA 专属。关闭 flag 时 CUDA 行为字节级一致（已合并/关闭） | [PR #38328](https://github.com/sgl-project/sglang/pull/38328) |
| **Apple / MLX** | 为 VL 系列 wrapper（例如 `Qwen3_5ForConditionalGeneration`）解析 headless trunk，使 chunked-prefill 的非最终 chunk 不再计算全词表 logits；初始化 Mamba grid attrs，以修复 `no_buffer` 预热崩溃 | [PR #39242](https://github.com/sgl-project/sglang/pull/39242)、[PR #39238](https://github.com/sgl-project/sglang/pull/39238) |
| **量化** | 功能请求：在 Hopper 上以 packed FP4 存储 DeepSeek-V4.1 C1/C2 main KV | [Issue #38902](https://github.com/sgl-project/sglang/issues/38902) |

---

## 4. 性能与优化

**已落地 / 评审中：**

- **`trtllm_mla` target verify 复用融合 FP8 KV/Q 准备** — [PR #39232](https://github.com/sgl-project/sglang/pull/39232) 关闭 [Issue #39107](https://github.com/sgl-project/sglang/issues/39107)。`forward_decode` 已将 bf16→fp8 量化 + KV scatter + `[q_nope | q_rope]` 拼接融合为一次 `set_mla_kv_concat_q_fp8` 启动；target verify 之前仍通过 `forward_extend` 派发，存在冗余工作。直接带来投机解码延迟收益。
- **MegaMoE buffer 分配遵循有效 SM 预算** — [PR #39223](https://github.com/sgl-project/sglang/pull/39223)。DeepGEMM 根据运行时 SM 数量推导 MegaMoE buffer 大小/布局；SGLang 的 SM 预算此前被忽略，导致 buffer 尺寸错误。
- **`--startup-weight-load-mode=auto`** — [PR #35259](https://github.com/sgl-project/sglang/pull/35259)。通过 auto 模式加固启动权重加载重叠，该模式仅接纳已验证配置；`serial` 仍为默认值。
- **KDA：在融合 chain-verify kernel 中 ReplaySSM ring-write** — [PR #36821](https://github.com/sgl-project/sglang/pull/36821)。此前与 `--enable-linear-replayssm` + spec ring 互斥。
- **Diffusion：在 CUDA 上向量化 JointThreshold 解码** — [PR #34122](https://github.com/sgl-project/sglang/pull/34122)。替代了逐行 Python 路径，该路径会跨请求串行化 argmax/confidence/edit/completion，并反复同步 host↔device。另外：[PR #39206](https://github.com/sgl-project/sglang/pull/39206) 使 diffusion CI 性能失败成为终止性失败，并要求每个测试用例都有有效的 E2E 延迟。
- **[已关闭] Spark/Thor 上 unified-cache 默认翻转回归** — [Issue #36131](https://github.com/sgl-project/sglang/issues/36131)。长前缀 decode 吞吐回归已定位到 merge `ebc144ce` / [PR #34653](https://github.com/sgl-project/sglang/pull/34653)，现已关闭。

**进行中 / 测量：**

- **DeepSeek-V4 SM120 decode 将 `q` 填充到 64 heads 以满足 SM90 约束** — [Issue #39235](https://github.com/sgl-project/sglang/issues/39235)。移除该填充在 TP4 下价值**一个 decode 步骤的 0.50%**，但报告者指出 kernel 位完全相同，移除填充后 greedy 输出却发生变化 — 需要 PR 前征求第二意见。
- **PP8 分离式 prefill：Kimi-K3 上负载无关的约 30s TTFT 下限** — [Issue #34815](https://github.com/sgl-project/sglang/issues/34815)。
- **未融合的 K/V 量化 + 逐层 Q 转换导致 FP8 KV-cache decode 变慢** — [Issue #30815](https://github.com/sgl-project/sglang/issues/30815)。
- **[RFC] 面向动态 EPLB 专家迁移的争用感知 batching** — [Issue #39192](https://github.com/sgl-project/sglang/issues/39192)。
- **Ngram 投机解码路线图** — [Issue #21052](https://github.com/sgl-project/sglang/issues/21052)。
- **DeepGEMM release validation** 目前在 H200 上超时，并在每个 Blackwell runner 上失败 6 次调用（仅 attention 就 106–195 分钟）；[PR #39241](https://github.com/sgl-project/sglang/pull/39241) 修复缺失的 TileLang/TileKernels 依赖并限制 GPU 验证（已关闭）。

---

## 5. 稳定性与回归

按严重程度排序：

**严重**

1. **客户端断开连接会使整个引擎崩溃** — [Issue #39216](https://github.com/sgl-project/sglang/issues/39216)。未捕获的 `asyncio.CancelledError` 绕过了 `except Exception`，单个客户端掉线即可使整个引擎宕机。已在 4× RTX 6000D（SM120）、`lmsysorg/sglang:dev-dsv41`、DeepSeek-V4.1 上复现。**尚无修复 PR。**
2. **DeepSeek-V4.1 FP8 `wo_a` absorb GEMM 出现静默的约 25% 数值误差** — [Issue #39193](https://github.com/sgl-project/sglang/issues/39193)。在 SM121（GB10）上，当 `deep_gemm_wrapper.DEEPGEMM_SCALE_UE8M0` 为 false 时，non-ue8m0 分支传入的逐 token 激活 scale 不是 2 的幂。**无报错、无警告 — 输出错误。** **尚无修复 PR。**

**高**

3. **`--moe-runner-backend deep_gemm` 被接受用于 DSV4.1 MXFP4 专家，随后在 CUDA graph capture 中失败** — [Issue #39226](https://github.com/sgl-project/sglang/issues/39226)。在 sm_121 上，仅在花四分钟加载 75 GB 权重*之后*，于 `layout.hpp:108` 失败。验证缺口；浪费启动成本。
4. **量化 DFlash2 draft 静默地产生约 0% 接受率** — [Issue #39087](https://github.com/sgl-project/sglang/issues/39087)。Checkpoint 加载和 serving 均无错误或警告；接受率从 ~3.7 暴跌至 ~1.0，decode 速度降到*低于*无 drafter 的速度。未量化权重工作正常。
5. **DeepSeek-V4.1-Flash + Engram profiled SPS table 在 CUDA-graph capture 中崩溃** — [Issue #39173](https://github.com/sgl-project/sglang/issues/39173)。在 compact ragged verify 下出现“engram target-verify expects one equal block per request”。
6. **Kimi-K3 上 PP8 分离式 prefill 约 30s TTFT 下限** — [Issue #34815](https://github.com/sgl-project/sglang/issues/34815)。

**中**

7. **`sgl_kernel` flash_attn 声称支持 sm_89，但未附带 sm_89 cubin** — [Issue #38980](https://github.com/sgl-project/sglang/issues/38980)。`is_fa3_supported()` 接受 sm_89（RTX 4080 SUPER），但会以原始 CUDA 错误失败，而不是干净地拒绝；`ver` 参数也被忽略。
8. **`HiCacheFile.batch_exists_v2()` 对混合缓存池报告不可恢复的 prefix 命中** — [Issue #39147](https://github.com/sgl-project/sglang/issues/39147)。它取各池最长 prefix 的最小值，这对非连续覆盖是错误的。
9. **`include_reasoning=false` 仍会在 responses、chat completions 和 completions 中输出 reasoning 内容** — [Issue #39103](https://github.com/sgl-project/sglang/issues/39103)。
10. **MiniMax H3 GGUF 文本编码器加载 folded Conv3D patch embedding 失败** — [Issue #38904](https://github.com/sgl-project/sglang/issues/38904)。
11. **SM120 q-padding 变更在 kernel 位完全相同的情况下改变 greedy 输出** — [Issue #39235](https://github.com/sgl-project/sglang/issues/39235)。确定性问题。

**本窗口已关闭**

- SWA 分支将较晚的 Mamba checkpoint 附加到较早的 prefix — [Issue #38815](https://github.com/sgl-project/sglang/issues/38815)。
- DFlash 在接受 token 跨越跟踪边界时遗漏 Mamba checkpoint — [Issue #37817](https://github.com/sgl-project/sglang/issues/37817)。
- Spark/Thor 上 unified-cache 吞吐回归 — [Issue #36131](https://github.com/sgl-project/sglang/issues/36131)。

**CI 健康状况**

- 跟踪 issue [Issue #17050](https://github.com/sgl-project/sglang/issues/17050)：截至 2026-09-13 00:15 UTC，**3 个 broken、9 个 flaky、997 个近期已修复**。范围限定为 `main` 上的定时 CI。

**评审中的工具调用 / parser 修复**

- GLM 工具参数类型跨 JSON Schema union（complete 与 streamed 分歧）— [PR #39136](https://github.com/sgl-project/sglang/pull/39136)。
- Gemma 4 detector：省略开头定界符的字符串参数 — [PR #39240](https://github.com/sgl-project/sglang/pull/39240)。
- PoolsideV1Detector 在非流式路径中重复 `tool_index`（导致 OpenAI 客户端合并不同的工具调用）— [PR #30452](https://github.com/sgl-project/sglang/pull/30452)。

---

## 6. 这对应用开发者意味着什么

- **将 `include_reasoning=false` 视为尽力而为，而非保证。** [Issue #39103](https://github.com/sgl-project/sglang/issues/39103) 确认 reasoning 内容仍会在 responses/completions 中泄露。如果你出于合规、成本或 UX 原因剥离 CoT，请在修复前在客户端侧过滤。
- **针对引擎重启做好加固。** 单个客户端断开即可使整个服务器宕机（[#39216](https://github.com/sgl-project/sglang/issues/39216)）。确保你的网关具备重试/退避和基于健康检查的故障转移；不要假设会优雅降级。
- **在 Blackwell SM121/GB10 上，固定你的配置并审计输出。** 同一窗口中有两个静默正确性 bug 处于开启状态（[#39193](https://github.com/sgl-project/sglang/issues/39193) GEMM 结果错误，[#39226](https://github.com/sgl-project/sglang/issues/39226) MoE 后端 capture 失败）。在修复前，避免 `DEEPGEMM_SCALE_UE8M0=false`，并避免对 DSV4.1 MXFP4 使用 `--moe-runner-backend deep_gemm`。
- **将投机解码接受率作为一等指标监控。** 量化 DFlash2 draft 可能静默地将接受率降至约 0%，并让你*比无 drafter 还慢*（[#39087](https://github.com/sgl-project/sglang/issues/39087)）。按请求的接受率 gauge 本可立即发现这一点。
- **工具调用可靠性正在提升 — 预计需要升级。** 三个 parser 修复针对真正破坏 agent 的行为：重复 `tool_index` 合并不同调用、GLM complete 与 streamed 参数分歧，以及 Gemma 4 定界符遗漏。如果你在 GLM-4.7/5、Gemma 4 或 Poolside 模型上运行 agent，请关注这些 PR。
- **如果你依赖 `/v1/responses` 状态，请显式设置 `--enable-response-store`**（[PR #39122](https://github.com/sgl-project/sglang/pull/39122)）— 并注意跨节点 PD 簿记存在正确性问题，因此在发布前验证多节点行为。
- **MLA 目标上的投机解码延迟应会改善**，借助 [PR #39232](https://github.com/sgl-project/sglang/pull/39232)（verify 时复用融合 FP8 KV/Q 准备）；**AMD gfx950/gfx942 和 NPU 用户获得有意义的新路径**（[#37413](https://github.com/sgl-project/sglang/pull/37413)、[#39243](https://github.com/sgl-project/sglang/pull/39243)、[#37382](https://github.com/sgl-project/sglang/pull/37382)、[#38328](https://github.com/sgl-project/sglang/pull/38328)）。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-13

## 1. 今日亮点
llama.cpp 发布了 **b10923–b10934** 构建，主要是一次重大的 JSON-schema/grammar 重构（`common_schema`）以及对 Jinja 整数字面量的支持，这两者对工具调用和聊天模板正确性都很重要。硬件方面，一个开放的 CUDA PR 提议在 **Blackwell/sm_120** 上为 IQ 量化添加 cuBLAS 回退，以修复不正确的 MMQ 结果；AMD/Vulkan 方面的工作则增加了 GCN 调优和 IQ3_S MMQ 内核。稳定性关注点仍集中在 RTX 50 系列上的 CUDA graph 挂起、Vulkan RDNA3 的提示处理回归，以及 Windows 上 MTP 预填充变慢。

## 2. 版本发布与破坏性变更
未宣布明确的破坏性 API 变更。**b10934** 更改了 `json-schema-to-grammar` 使用的内部 JSON-schema 表示；请针对边缘情况 schema 验证 grammar 输出。

| 构建 | 变更 | 链接 |
|---|---|---|
| b10934 | `common_schema` 内部 JSON schema 表示、优化器，以及 `json-schema-to-grammar` 重构 | [发布](https://github.com/ggml-org/llama.cpp/releases/tag/b10934) / [#28736](https://github.com/ggml-org/llama.cpp/pull/28736) |
| b10933 | Jinja 支持点属性整数字面量 | [发布](https://github.com/ggml-org/llama.cpp/releases/tag/b10933) / [#28817](https://github.com/ggml-org/llama.cpp/pull/28817) |
| b10932 | CMake：从 Clang 预编译头中省略时间戳，以避免缓存失效 | [发布](https://github.com/ggml-org/llama.cpp/releases/tag/b10932) / [#28816](https://github.com/ggml-org/llama.cpp/pull/28816) |
| b10931 | Web UI 增加缓存 | [发布](https://github.com/ggml-org/llama.cpp/releases/tag/b10931) / [#28802](https://github.com/ggml-org/llama.cpp/pull/28802) |
| b10930 | 服务器允许在模型达到上限时下载模型；修复 #26809 | [发布](https://github.com/ggml-org/llama.cpp/releases/tag/b10930) / [#28530](https://github.com/ggml-org/llama.cpp/pull/28530) |
| b10929 | HIP 增加 AMD GCN 专用配置表 | [发布](https://github.com/ggml-org/llama.cpp/releases/tag/b10929) / [#27841](https://github.com/ggml-org/llama.cpp/pull/27841) |
| b10927 | 内置 `cpp-httplib` 更新至 0.56.0 | [发布](https://github.com/ggml-org/llama.cpp/releases/tag/b10927) / [#28787](https://github.com/ggml-org/llama.cpp/pull/28787) |
| b10926 | syscl 优雅处理不支持的 `tq1_0` 量化 | [发布](https://github.com/ggml-org/llama.cpp/releases/tag/b10926) / [#28681](https://github.com/ggml-org/llama.cpp/pull/28681) |
| b10924 | 服务器将 router 子状态命令按整行分帧 | [发布](https://github.com/ggml-org/llama.cpp/releases/tag/b10924) / [#28747](https://github.com/ggml-org/llama.cpp/pull/28747) |
| b10923 | OpenCL 后端中止修复 | [发布](https://github.com/ggml-org/llama.cpp/releases/tag/b10923) / [#27630](https://github.com/ggml-org/llama.cpp/pull/27630) |

## 3. 新模型与硬件支持
- **ELMOD 2.7b**：提议为基于 GPTNeoX、带自定义 tokenizer 的德语模型提供转换支持 — 开放 PR [#28818](https://github.com/ggml-org/llama.cpp/pull/28818)。
- **Qwen4 在 CUDA 上的 sparse-FA**：开放 PR 为 Qwen4 启用稀疏 FA；当前注意力重打分未优化 — [#28770](https://github.com/ggml-org/llama.cpp/pull/28770)。
- **Blackwell/sm_120 IQ 量化**：开放 PR 在 Blackwell+ 上强制对 IQ1_S、IQ2_XXS/XS/S、IQ3_XXS/S、IQ4_XS/NL 使用 cuBLAS 回退，同时为 K-quants 保留 MMQ。修复诸如 Unsloth Dynamic 量化等错误结果 — [#28823](https://github.com/ggml-org/llama.cpp/pull/28823)。
- **AMD GCN HIP 配置表**：已在 b10929 落地 — [#27841](https://github.com/ggml-org/llama.cpp/pull/27841)。
- **Vulkan IQ3_S MMQ matmul 内核**：开放 PR 面向 Intel Arc A770；此前 Intel 因性能回归而避开了 `VK_KHR_cooperative_matrix` — [#28822](https://github.com/ggml-org/llama.cpp/pull/28822)。
- **混合 recurrent/attention 超参数**：开放 PR 在可变 GQA 检查中忽略零 KV 层 — [#28824](https://github.com/ggml-org/llama.cpp/pull/28824)。
- **ANE 后端**：仍是路线图项目 — [#10453](https://github.com/ggml-org/llama.cpp/issues/10453)。
- **OpenVINO Gemma-4-12B 加载失败**：在 CPU/GPU/NPU 上的开放 issue — [#24415](https://github.com/ggml-org/llama.cpp/issues/24415)。
- **syscl `tq1_0`**：不支持的量化优雅处理已在 b10926 落地 — [#28681](https://github.com/ggml-org/llama.cpp/pull/28681)。

## 4. 性能与优化
- **Qwen4 sparse-FA**：避免每个 token 都对整个 KV cache 重打分 — 开放 PR [#28770](https://github.com/ggml-org/llama.cpp/pull/28770)。
- **Vulkan IQ3_S MMQ**：为 Intel Arc 增加 IQ3_S matmul 内核，此前该平台避开了 cooperative-matrix 路径 — 开放 PR [#28822](https://github.com/ggml-org/llama.cpp/pull/28822)。
- **HIP AMD GCN 调优**：GCN 专用配置表已在 b10929 落地 — [#27841](https://github.com/ggml-org/llama.cpp/pull/27841)。
- **调度器**：开放 PR 在切换 `causal_attn` 时停止重复预留调度器 — [#28751](https://github.com/ggml-org/llama.cpp/pull/28751)。
- **CI 后端测试**：`test-backend-ops` 现在作为 `ci/run.sh` 中专门的并行测试运行 — 已合并 PR [#28740](https://github.com/ggml-org/llama.cpp/pull/28740)。
- **Qwen35 RTX 5090**：issue 报告在原生 Linux 上解码达到约 76% roofline，MTP 约 1.7x；Windows/Ollama 路径慢 1.5–1.6x — [#28196](https://github.com/ggml-org/llama.cpp/issues/28196)。
- **CUDA 4-bit KV**：除非设置 `GGML_CUDA_FA_ALL_QUANTS=ON`，否则会静默回退到 CPU，导致约 30x 减速；请求将其设为默认 — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633)。
- **Windows MTP**：自行编译的 MSVC + CUDA 12.8 构建报告，使用 `--spec-type draft-mtp` 时预填充约慢 57x — [#28790](https://github.com/ggml-org/llama.cpp/issues/28790)。
- **Vulkan RDNA3**：b10780 之后出现严重的提示处理性能下降 — [#28752](https://github.com/ggml-org/llama.cpp/issues/28752)。
- **RDNA4 FA 回归**：移除 rocWMMA 后，原生 MMA FA 在深度处最多慢 2x — 已关闭 issue [#26220](https://github.com/ggml-org/llama.cpp/issues/26220)。
- **SYCL `-cb` 功耗**：连续批处理使 Battlemage GPU 在请求之间持续处于 boost 状态 — [#24946](https://github.com/ggml-org/llama.cpp/issues/24946)。
- **Vulkan AMD Resizable BAR**：禁用 ReBAR 时 token 生成缓慢 — [#27097](https://github.com/ggml-org/llama.cpp/issues/27097)。
- **Vulkan 服务器随时间变慢**：在 7900XTX 上长时间运行的服务器需要重启 — [#22360](https://github.com/ggml-org/llama.cpp/issues/22360)。

## 5. 稳定性与回归
按严重程度排序；许多已关闭 issue 是陈旧/未确认，而非已修复。

| 严重程度 | 状态 | 项目 | 链接 |
|---|---|---|---|
| 高 | 开放 | CUDA graphs 在 RTX 5090 Laptop/sm_120 上挂起 GPU 通道；绕过方法 `GGML_CUDA_DISABLE_GRAPHS=1` | [#27330](https://github.com/ggml-org/llama.cpp/issues/27330) |
| 高 | 开放 | GLM-5.2 `glm_moe_dsa` 在层被 offload 时，dense-MLA CUDA 路径产生损坏输出 | [#26027](https://github.com/ggml-org/llama.cpp/issues/26027) |
| 高 | 已关闭/未确认 | 在 1x4090 + 3x3090 上使用 `-np 3` 时持续 OOM 崩溃，构建 10930 | [#28813](https://github.com/ggml-org/llama.cpp/issues/28813) |
| 高 | 开放 | MTP `--spec-type draft-mtp` 在自行编译的 Windows 构建上导致预填充约慢 57x | [#28790](https://github.com/ggml-org/llama.cpp/issues/28790) |
| 高 | 开放 | Vulkan RDNA3 在 b10780 之后出现严重提示处理下降 | [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) |
| 高 | 开放 | `/slots` 保存/恢复在混合/recurrent 模型上丢失提示复用；修复 PR 涉及 K/V/recurrent 清理和面向字节的状态 API | [#25913](https://github.com/ggml-org/llama.cpp/issues/25913), [#27530](https://github.com/ggml-org/llama.cpp/pull/27530), [#27943](https://github.com/ggml-org/llama.cpp/pull/27943) |
| 中 | 开放 | CUDA 4-bit KV 静默回退到 CPU（约 30x 减速）；绕过方法 `GGML_CUDA_FA_ALL_QUANTS=ON` | [#28633](https://github.com/ggml-org/llama.cpp/issues/28633) |
| 中 | 已关闭 | RPC `top_k` 后端采样在 AMD 上因共享内存断言而崩溃 | [#24177](https://github.com/ggml-org/llama.cpp/issues/24177) |
| 中 | 开放 | ROCm 7.14 `libhipblas.so.3` 加载错误 | [#25807](https://github.com/ggml-org/llama.cpp/issues/25807) |
| 中 | 已关闭 | SYCL `GGML_SYCL_DEVICE_ARCH=xe2` 段错误 | [#25808](https://github.com/ggml-org/llama.cpp/issues/25808) |
| 中 | 开放 | OpenVINO 无法在 CPU/GPU/NPU 上加载 gemma-4-12B | [#24415](https://github.com/ggml-org/llama.cpp/issues/24415) |
| 中 | 已关闭/陈旧 | 当文本出现在 `<tool_call>` 之前时，Qwen3.5 工具解析器失败 | [#20260](https://github.com/ggml-org/llama.cpp/issues/20260) |
| 中 | 开放 | llama-ui 无法在桌面端打开 reasoning-level 菜单 | [#27981](https://github.com/ggml-org/llama.cpp/issues/27981) |
| 低 | 开放 | 服务器 `batch_view` 偏移未传播到 `ctx_dft` | [#24840](https://github.com/ggml-org/llama.cpp/issues/24840) |
| 低 | 已关闭 | Windows sm_120 上 CUDA graph 复用后，共驻留服务器进程死亡；同样的 graph 绕过方法 | [#28404](https://github.com/ggml-org/llama.cpp/issues/28404) |
| 低 | 已关闭 | 使用 `BUILD_SHARED_LIBS=OFF` 时 macOS 静态构建链接问题 | [#28491](https://github.com/ggml-org/llama.cpp/issues/28491) |

## 6. 对应用开发者的意义
- **工具/智能体应用**：b10934 的 `common_schema` 重构，加上针对 Qwen 复杂/`anyOf` 参数和 Ling 3.0 的开放解析器改进，应能提升工具调用可靠性，但请测试 JSON schema 的 grammar 边缘情况 — [#28736](https://github.com/ggml-org/llama.cpp/pull/28736), [#28742](https://github.com/ggml-org/llama.cpp/pull/28742), [#26833](https://github.com/ggml-org/llama.cpp/pull/26833), [#28682](https://github.com/ggml-org/llama.cpp/pull/28682)。
- **自定义解析**：当你的应用自行处理工具解析时，可使用 `--skip-chat-parsing` 强制输出纯内容 — [#20289](https://github.com/ggml-org/llama.cpp/pull/20289)。
- **服务器运维**：模型达到上限时下载已在 b10930 落地；为 `llama-server` 提议多绑定地址；提议结构化 `LOG_JSON` 日志 — [#28530](https://github.com/ggml-org/llama.cpp/pull/28530), [#28690](https://github.com/ggml-org/llama.cpp/pull/28690), [#28586](https://github.com/ggml-org/llama.cpp/pull/28586)。
- **状态/slot 可靠性**：如果你在混合/recurrent 模型上使用保存/恢复，请关注 [#25913](https://github.com/ggml-org/llama.cpp/issues/25913) 以及修复 PR [#27530](https://github.com/ggml-org/llama.cpp/pull/27530) / [#27943](https://github.com/ggml-org/llama.cpp/pull/27943)。
- **Blackwell CUDA**：IQ 量化正确性修复已在 [#28823](https://github.com/ggml-org/llama.cpp/pull/28823) 中提出；与 RTX 50 系列上的 Unsloth Dynamic 及其他 IQ 量化 GGUF 相关。
- **RTX 50 系列 CUDA graphs**：如果遇到 GPU 通道挂起，请设置 `GGML_CUDA_DISABLE_GRAPHS=1` — [#27330](https://github.com/ggml-org/llama.cpp/issues/27330)。
- **CUDA 上的 4-bit KV**：在默认值改变之前，请使用 `GGML_CUDA_FA_ALL_QUANTS=ON` 构建或运行，以避免静默回退到 CPU — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633)。
- **Windows MTP**：在 [#28790](https://github.com/ggml-org/llama.cpp/issues/28790) 解决之前，避免使用自行编译的 MTP 投机解码。

---

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-13

来源：[github.com/ollama/ollama](https://github.com/ollama/ollama)

## 1. 今日亮点

过去 24 小时内没有 Ollama 版本发布。当前活跃队列主要由围绕上下文截断以及工具/推理流顺序的正确性工作占据：[PR #17894](https://github.com/ollama/ollama/pull/17894) 针对高关注度的 qwen3.8 500 错误，[PR #18413](https://github.com/ollama/ollama/pull/18413) 修复 Responses/web_search 函数调用顺序。硬件特定报告在 ROCm Strix Halo、Linux 混合 NVIDIA、Jetson Orin Nano 以及 Windows 嵌入/安装器路径上仍然活跃。

## 2. 版本发布与破坏性变更

- 过去 24 小时内没有新版本发布。
- 没有已落地的破坏性变更。
- 值得关注的开放行为变更 PR：
  - [PR #18399](https://github.com/ollama/ollama/pull/18399)：新增 `OLLAMA_CONTEXT_SHIFT`，使服务器可以拒绝过长的提示，而不是静默移位/截断它们。
  - [PR #17566](https://github.com/ollama/ollama/pull/17566)：提议增加按请求或按模型的思考 token 预算，以防止推理循环耗尽全部上下文。

## 3. 新模型与硬件支持

- 过去 24 小时内没有新模型支持落地。
- 审核中 / 最近关闭：
  - [PR #16879](https://github.com/ollama/ollama/pull/16879)：统一 Gemma4 视觉支持；单 GGUF Gemma4 模型将通过 `/api/tags` 报告视觉/音频能力。
  - [PR #16934](https://github.com/ollama/ollama/pull/16934)：已关闭；将 `mistral3` GGUF 模型默认使用 Ministral 解析器进行工具调用。
  - [PR #18400](https://github.com/ollama/ollama/pull/18400) 和 [PR #18398](https://github.com/ollama/ollama/pull/18398)：修复 Gemma4 对包含空格的无引号对象键的工具解析，例如 `{"Basic LLM Chain": ...}`。
  - [Issue #18287](https://github.com/ollama/ollama/issues/18287)：已关闭的腾讯 Hy4 预览兼容性请求；未表明有实现。
- 活跃硬件报告：
  - [Issue #17847](https://github.com/ollama/ollama/issues/17847)：ROCm Strix Halo `gfx1151` KV 状态串扰。
  - [Issue #18412](https://github.com/ollama/ollama/issues/18412)：Linux 混合 Intel + RTX 4080 `llama-server` SIGABRT。
  - [Issue #18396](https://github.com/ollama/ollama/issues/18396)：Jetson Orin Nano 8GB Gemma4 E4B 多模态 OOM。
  - [Issue #16599](https://github.com/ollama/ollama/issues/16599)：单张 GPU 显存充足仍发生多 GPU 拆分。

## 4. 性能与优化

- [Issue #16599](https://github.com/ollama/ollama/issues/16599)：Gemma 4 31b 单独放在 3090 上约为 30 tok/s，但启用 4060 后，即使 3090 显存充足，模型也会被拆分。尚无修复 PR。
- [Issue #18392](https://github.com/ollama/ollama/issues/18392)：在 Windows 上使用 `bge-m3:567m-fp16` 持续进行 `/api/embed` 负载，批大小为 32，约 55 docs/s，会耗尽回环端口。根因似乎是 `llama-server` HTTP 客户端 keep-alive 被禁用，导致间歇性 HTTP 400。
- [Issue #18416](https://github.com/ollama/ollama/issues/18416)：从 safetensors 执行 `ollama create --quantize q4_K_M` 会为每次导入留下一个未被引用的约 50 GB F16 blob；对于一个 26B 模型导入 12 次后，这会造成显著的磁盘膨胀。`ollama rm` 不会删除它。
- [PR #18407](https://github.com/ollama/ollama/pull/18407)：在校验后保留导入的 GGUF blob，并通过将 `llama-quantize` COPY 校验输出重定向到 null，避免写入额外的完整模型文件。
- [PR #18399](https://github.com/ollama/ollama/pull/18399)：如果合并，拒绝过长的提示可以避免无效生成和静默截断，代价是客户端需要处理显式拒绝。

## 5. 稳定性与回归

| 严重程度 | 事项 | 状态 / 修复 |
|---|---|---|
| 严重 | [Issue #17847](https://github.com/ollama/ollama/issues/17847)：ROCm Strix Halo `gfx1151` KV 状态在连续请求间发生串扰；响应被之前无关请求污染。 | 开放；未发现修复 PR。 |
| 高 | [Issue #17778](https://github.com/ollama/ollama/issues/17778)：qwen3.8 聊天流式输出在多步工具循环中返回 `500: no user query found in messages`。29 条评论，25 👍。 | 开放；修复 [PR #17894](https://github.com/ollama/ollama/pull/17894) 处于开放状态。 |
| 高 | [Issue #18412](https://github.com/ollama/ollama/issues/18412)：Linux 混合 Intel Raptor Lake-S iGPU + RTX 4080；`llama-server` 在后端/设备加载期间 SIGABRT。 | 开放；未发现修复 PR。 |
| 高 | [Issue #18411](https://github.com/ollama/ollama/issues/18411)：Responses `web_search` 路径在推理完成前发出 `function_call`，破坏 Codex 工具重放。 | 开放；修复 [PR #18413](https://github.com/ollama/ollama/pull/18413) 处于开放状态。 |
| 中 | [Issue #18094](https://github.com/ollama/ollama/issues/18094)：`gemma3:12b` 结构化输出（`format`）在遇到双引号括起的词项时过早截断。 | 开放；无修复 PR。 |
| 中 | [Issue #18396](https://github.com/ollama/ollama/issues/18396)：Jetson Orin Nano 8GB 上 Gemma4 E4B 多模态投影器导致主机 OOM，即使已配置 CPU 投影器。 | 开放；无修复 PR。 |
| 中 | [Issue #18392](https://github.com/ollama/ollama/issues/18392)：在 Windows 上持续进行 `/api/embed` 会耗尽回环端口。 | 开放；无修复 PR。 |
| 中 | [Issue #18416](https://github.com/ollama/ollama/issues/18416)：`ollama create --quantize` 在 `blobs/` 中留下未被引用的 F16 blob。 | 开放；无修复 PR。 |
| 中 | [Issue #14259](https://github.com/ollama/ollama/issues/14259)：聊天历史和嵌入截断会静默发生；仅有 `slog.Debug` 可见性。 | 开放；无修复 PR。 |
| 中 | [Issue #17562](https://github.com/ollama/ollama/issues/17562)：编码智能体缺陷：重复保护、工具调用被截断、Gemma4 工具调用在缺少大括号时被丢弃。 | 开放；部分解析器 PR [#18400](https://github.com/ollama/ollama/pull/18400), [#18398](https://github.com/ollama/ollama/pull/18398)。 |
| 中 | [PR #18406](https://github.com/ollama/ollama/pull/18406)：runner 可能返回全零嵌入，而 API 报告 HTTP 200。 | 开放；提议 HTTP 500 + 日志记录。 |
| 中 | [PR #18408](https://github.com/ollama/ollama/pull/18408)：UI 将失败/过早 EOF 的聊天流视为成功。 | 开放。 |
| 低 | [Issue #18387](https://github.com/ollama/ollama/issues/18387)：目录标题与页码之间超过 10 个省略号会导致 `cancel task`。 | 开放；无修复 PR。 |
| 低 | [Issue #16599](https://github.com/ollama/ollama/issues/16599)：单张 GPU 显存充足仍发生多 GPU 拆分。 | 开放；无修复 PR。 |
| 低 | [Issue #18414](https://github.com/ollama/ollama/issues/18414)：一些模型具有未文档化的 Ollama 版本要求。 | 开放。 |
| 低 | [Issue #18415](https://github.com/ollama/ollama/issues/18415)：Windows 10 上打开 Ollama desktop 0.34.0 时会短暂显示 PowerShell 窗口。 | 开放。 |
| 低 | Windows 卸载程序留下过期的 Ollama PATH 条目。 | [PR #18409](https://github.com/ollama/ollama/pull/18409) 开放；之前的 [PR #18386](https://github.com/ollama/ollama/pull/18386) 已关闭。 |

## 6. 这对应用开发者意味着什么

- **使用工具的智能体：** qwen3.8 和其他基于渲染器的模型在多步工具循环期间、上下文溢出时可能返回 HTTP 500。限制工具响应大小、积极裁剪历史记录，并在 [PR #17894](https://github.com/ollama/ollama/pull/17894) 落地前通过重试处理 500 错误。
- **Responses / 推理流：** 如果你集成 Codex 风格的工具重放或网页搜索，预计在 [PR #18413](https://github.com/ollama/ollama/pull/18413) 修复推理先于工具调用发出的顺序问题之前，可能出现顺序错乱。同时，要暴露失败或过早 EOF 的流，而不是将其视为成功；参见 [PR #18408](https://github.com/ollama/ollama/pull/18408)。
- **结构化输出：** 当源文本包含双引号括起的词项时，`gemma3:12b` 可能截断 JSON Schema `format` 响应。请验证输出并重试，或在 [Issue #18094](https://github.com/ollama/ollama/issues/18094) 修复前避免使用此模型/路径。
- **嵌入：** 全零嵌入目前可能以 HTTP 200 通过；请在客户端验证向量。在 Windows 上，持续的批量嵌入负载可能因 keep-alive 被禁用而耗尽回环端口；请添加并发限制、重试和退避。[PR #18406](https://github.com/ollama/ollama/pull/18406) 旨在以 HTTP 500 拒绝无效向量。
- **磁盘/运维卫生：** 从 safetensors 执行 `ollama create --quantize` 可能泄漏未被引用的 F16 blob，每个最高约 50 GB。请监控 `~/.ollama/models/blobs` 并手动清理。[PR #18407](https://github.com/ollama/ollama/pull/18407) 可能减少 GGUF 导入的重复写入。
- **硬件注意事项：** 如果可能发生 KV 污染，避免将 ROCm Strix Halo 用于连续多请求工作负载（[#17847](https://github.com/ollama/ollama/issues/17847)）。Linux 混合 NVIDIA 系统可能在后端加载期间崩溃（[#18412](https://github.com/ollama/ollama/issues/18412)）；Jetson Orin Nano 8GB 在使用 Gemma4 E4B 多模态时可能 OOM（[#18396](https://github.com/ollama/ollama/issues/18396)）；多 GPU 可能会不必要地拆分（[#16599](https://github.com/ollama/ollama/issues/16599)）。
- **配置关注列表：** [PR #18399](https://github.com/ollama/ollama/pull/18399) 将添加 `OLLAMA_CONTEXT_SHIFT` 以拒绝过长的提示，[PR #17566](https://github.com/ollama/ollama/pull/17566) 将添加思考 token 预算。两者均开放、未发布，但值得跟踪以提升智能体可靠性。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-13

## 今日亮点
过去 24 小时内未发布任何版本，但活动量很大：涉及 33 个 issue 和 241 个 PR。最活跃的讨论串是成本/计费正确性（缓存实时音频超额计费、Azure 支出记录为 $0、过期的缓存写入 token）以及两个自动价格目录同步，新增了跨提供商共 83 个新上架模型。可靠性方面，OTEL 回调崩溃循环和基于 Prisma 的自托管安装失败仍未修复，是最高严重级别的未解决项。

## 发布与破坏性变更
过去 24 小时内无。

## 新模型与硬件支持
- **价格/上下文目录同步（2 个相互竞争的 PR，均处于 open 状态）：** [#40920](https://github.com/BerriAI/litellm/pull/40920) 更新了 5 个提供商下的 277 个模型，新增 49 个条目（OpenAI 120、Together 及其他）；[#40919](https://github.com/BerriAI/litellm/pull/40919) 更新了 278 个模型，新增 34 个条目，并重新指向过期的源 URL。两者均由 bot 生成，合并前需要整合。
- **Tencent TokenHub** 已作为后端提供商加入，但在 Add Model 下拉菜单中缺失；修复见 [#40924](https://github.com/BerriAI/litellm/pull/40924)。
- **OpenRouter 视频生成**模型尚未支持——已关闭的功能请求 [#27724](https://github.com/BerriAI/litellm/issues/27724)。
- **已请求但尚未落地：** `deepseek-v4-flash` / `deepseek-vr-p4o` 目录条目（[#30430](https://github.com/BerriAI/litellm/issues/30430)）、OpenAI 兼容的 `gpt-live-1` 代理支持（[#40888](https://github.com/BerriAI/litellm/issues/40888)），以及在 `model_prices_and_context_window.json` 中独立表示 OpenAI 兼容网关（[#29961](https://github.com/BerriAI/litellm/issues/29961)）。

## 性能与优化
- **MCP HTTP 服务器：每次 `tools/call` 都会调用 `list_tools`**，而不是使用缓存的工具列表，导致每次工具调用都增加一次完整的上游往返，并使延迟翻倍。处于 open 状态、长期未更新、暂无修复 PR：[#23544](https://github.com/BerriAI/litellm/issues/23544)。
- **复杂度路由器现已支持 `/v1/responses`**：新的 `get_structured_messages()` 护栏转换路径会将 Responses/Anthropic 负载转换为 OpenAI 规范消息，用于路由/分类（[#26137](https://github.com/BerriAI/litellm/pull/26137)，已关闭）。
- **日志热路径：** Redis 缓慢时，目前每个超时的 `LoggingWorker` 回调都会输出完整的 ERROR traceback——一次 40 个的突发会用 40 个堆栈跟踪淹没日志。PR [#40912](https://github.com/BerriAI/litellm/pull/40912) 将其合并为一条有界摘要。

## 稳定性与回归
按严重程度排序：

1. **OTEL 回调导致容器崩溃循环** —— 启用 OTEL collector 回调会导致 Pod 持续崩溃（`NoneType` 错误）。自 6 月起处于 open 状态，无修复 PR：[#30061](https://github.com/BerriAI/litellm/issues/30061)。
2. **自托管安装在 `prisma generate` 处失败** —— 基础安装脚本因该命令不被允许而失败，阻碍新部署：[#26097](https://github.com/BerriAI/litellm/issues/26097)。
3. **Anthropic `/v1/messages` 报 400：不允许 `vector_store_ids`** —— 互动量最高的问题（14 条评论，13 个 👍），另有一个新提交的关联问题：`enable_anthropic_prompt_caching` 会使 vector-store 预调用钩子无法执行：[#23741](https://github.com/BerriAI/litellm/issues/23741)、[#40908](https://github.com/BerriAI/litellm/issues/40908)。
4. **带 `openai/` 前缀的自托管模型会将 `/v1/messages` 静默路由到 Responses API**，导致 vLLM/llama.cpp/SGLang/TGI/LM Studio 丢失多模态支持：[#40780](https://github.com/BerriAI/litellm/issues/40780)。
5. **Responses 到 Chat 桥接丢失推理内容** —— 流式会丢弃增量推理项和缓存推理状态（[#40887](https://github.com/BerriAI/litellm/issues/40887)）；非流式会丢弃原始 `reasoning_text`（[#40654](https://github.com/BerriAI/litellm/issues/40654)）；原生 `/v1/messages` 透传会丢弃自适应思考/effort（[#40890](https://github.com/BerriAI/litellm/issues/40890)）。
6. **计费正确性问题集群：**
   - 缓存的实时音频 token 按完整音频费率计费（约 2× 超额计费）——**修复 PR 处于 open 状态**：[#40627](https://github.com/BerriAI/litellm/pull/40627)。
   - Admin UI 中的模型编辑会持久化派生定价，随后价格映射重载会将 Azure 支出记录为 $0：[#40649](https://github.com/BerriAI/litellm/issues/40649)；相关的 OCR 自定义定价被忽略，计费为 $0（[#36608](https://github.com/BerriAI/litellm/issues/36608)，已关闭）。
   - 流式用量合并器在显式置零后仍保留过期的缓存写入 token：[#40736](https://github.com/BerriAI/litellm/issues/40736)。
   - Vertex Gemini Live 会话未按会话进行端到端计费——**修复 PR 处于 open 状态**：[#40915](https://github.com/BerriAI/litellm/pull/40915)。
   - Claude Code 上出现错误的 “Budget has been exceeded”，且强制成本远高于已记录支出（已关闭）：[#40050](https://github.com/BerriAI/litellm/issues/40050)。
7. **安全 / 加固：** Helm chart 默认提供空的 `podSecurityContext` 和 `securityContext`，因此 Pod 默认以 root 运行：[#40822](https://github.com/BerriAI/litellm/issues/40822)。旧版委托 MCP 路由允许匿名流量并隐藏支出——**修复 PR**：[#40923](https://github.com/BerriAI/litellm/pull/40923)。
8. **代理行为回归：** 当 `-c` 跟在 Codex 子命令之后时，`lite codex` 会静默绕过代理（[#40651](https://github.com/BerriAI/litellm/issues/40651)）；`LiteLLM_SpendLogs.session_id` 忽略 `litellm_session_id`，破坏会话分组（[#40851](https://github.com/BerriAI/litellm/issues/40851)）；key 可能静默超出其团队的 RPM 限制，而更宽松的取值永远无法生效（[#40866](https://github.com/BerriAI/litellm/issues/40866)）；同步的 `Router._embedding` 绕过团队/访问组作用域（[#31260](https://github.com/BerriAI/litellm/issues/31260)）；OpenAI 图像生成将 `extra_headers` 放在 JSON body 内发送（[#40628](https://github.com/BerriAI/litellm/issues/40628)）。
9. **已修复/已关闭：** 自 v1.84.0 起，Vertex AI 模型在 Model Health 仪表盘中错误显示为 “Unhealthy”（[#28206](https://github.com/BerriAI/litellm/issues/28206)）；在 Vertex 上执行 Anthropic 原生 `web_search` 后，`/v1/responses` 多轮重放损坏（[#33546](https://github.com/BerriAI/litellm/issues/33546)）。

## 这对应用开发者意味着什么
- **锁定版本并密切关注成本仪表盘。** 多个未修复 bug 会导致支出记录静默为 $0（Azure、OCR），或导致超额计费（实时缓存音频约 2×、过期缓存写入 token）。如果你依赖预算强制，Claude Code 的误报 429 路径是真实的可用性风险。
- **Anthropic RAG 用户应继续使用 chat completions**，直到 #23741/#40908 解决——请求体中的 `vector_store_ids` 会触发硬 400，而 prompt caching 可能完全抑制 vector-store 钩子。
- **对于自托管 vLLM/SGLang/TGI 部署，不要以为 `openai/` 前缀意味着 “chat”**：`/v1/messages` 流量会被桥接到 Responses API，并丢失多模态内容。请显式测试多模态路径。
- **MCP 延迟：** 如果你通过 LiteLLM 代理 HTTP MCP 服务器，目前每次工具调用都会重新获取工具列表——在 #23544 落地前，每次调用都要预留额外一次 RTT。
- **如今 Agent 推理保真度很脆弱。** 流式和非流式 Responses 到 Chat 桥接，以及原生 `/v1/messages` 透传，都会丢弃 reasoning/thinking 字段。如果你的 agent 依赖跨轮次的思维链状态，请端到端验证。
- **Kubernetes 运维人员：** 请手动加固 Helm chart（设置 `runAsNonRoot`、丢弃 capabilities、`allowPrivilegeEscalation: false`）——默认发布时未设置。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要 — 2026-09-13

## 1. 今日亮点

今天最核心的事件是 CI 与打包健康度：`main` 自提交 `22bbff627`（#10706，2026-09-11 合并）以来一直处于红色状态，拖累约 25 个开放 PR，现已由 [PR #10832](https://github.com/unslothai/unsloth/pull/10832) 处理（今日关闭）。第二个关键修复 [PR #10825](https://github.com/unslothai/unsloth/pull/10825) 阻止 Docker Studio 镜像在 GPU 主机上禁用 Unsloth 的 TRL 补丁——此前在 `unsloth/unsloth:latest` 中训练会直接在构建 trainer 时抛出 `TypeError` 而失败。性能方面，[PR #10744](https://github.com/unslothai/unsloth/pull/10744) 报告在 B200 上 Qwen3.5-9B LoRA SFT 单步时间从 0.85 s 降至 0.66 s，主要归因于 CPU 侧的单步开销。

## 2. 发布与破坏性变更

过去 24 小时内没有新版本发布。

上游兼容性破坏仍在持续暴露（尚未有 Unsloth 版本升级）：

- **[PR #10740](https://github.com/unslothai/unsloth/pull/10740)** — Studio text/CPT 分支仍在传入 TRL 0.20 已移除的 kwargs（`SFTConfig` 上的 `max_seq_length`、`SFTTrainer` 上的 `tokenizer`），导致运行时一开始就抛出 `TypeError`。被标记为 `conflicts`/`superseded`。
- **[PR #10825](https://github.com/unslothai/unsloth/pull/10825)**（已关闭）— Studio Docker 镜像设置 `ENV UNSLOTH_ALLOW_CPU=1`，这会在 GPU 主机上禁用 Unsloth 的 TRL 补丁，并导致 Studio Train、捆绑 notebook、`unsloth train` 和 GRPO 在构建 trainer 时抛出 `TypeError` 而中断。该修复使 GPU 主机训练恢复正常。
- **[Issue #10738](https://github.com/unslothai/unsloth/issues/10738)** / **[PR #10836](https://github.com/unslothai/unsloth/pull/10836)** — Recipe Studio 在 seed 列仍会导出时错误报告 `ALL_COLUMNS_DROPPED`；修复保留了 seed 字段的丢弃语义。

## 3. 新模型与硬件支持

- **[PR #10820](https://github.com/unslothai/unsloth/pull/10820)** — 在 #5748 的 CUDA 镜像之外新增官方 AMD ROCm Docker 镜像（RDNA2–RDNA4、CDNA），具备匹配的 `docker/` 布局、`build.sh`/`run.sh` 入口点和冒烟测试。这是对自动关闭的 #6231 的重新同步。
- **[PR #7115](https://github.com/unslothai/unsloth/pull/7115)** — EXL3（ExLlamaV3）量化后端，作为 bitsandbytes 的替代方案：支持 2/3/4/6/8-bit 以及分数位宽，内存更低，并支持 **MoE 量化**（bitsandbytes 在 Transformers 5 下无法做到这一点）。属于增量变更。
- **[PR #10819](https://github.com/unslothai/unsloth/pull/10819)** — 在 Windows 上将 `accelerate` 限制在 1.15 以下；在该平台上 1.15.0 会破坏所有 ROCm 训练（见“稳定性”）。
- **[Issue #10838](https://github.com/unslothai/unsloth/issues/10838)** — 用户请求在 Studio 中支持 DeepSeek v4.1 Flash GGUF + llama.cpp。尚无实现。

## 4. 性能与优化

- **[PR #10744](https://github.com/unslothai/unsloth/pull/10744)** — `[perf]` 在单张 B200（sm_100，178 GB）上通过 `unsloth-cli.py` 进行 Qwen3.5-9B LoRA SFT：**0.85 s → 0.66 s 每步**，性能分析表明收益主要来自 CPU 侧的单步开销，而非 kernel 变更。实验性，标记为 `non-studio`，开放讨论。
- **[PR #10830](https://github.com/unslothai/unsloth/pull/10830)** — 将 `trust_remote_code` 解析从 `GET /api/inference/status` 的事件循环中移出；`auto_map` 回退在缓存未命中时可能访问 Hub，此前会阻塞异步处理器。
- **[PR #10834](https://github.com/unslothai/unsloth/pull/10834)** — 为 GGUF 请求向 Studio API 监视器添加实时推理阶段报告（prefill 期间为 `Prompt processing · N%`，decode 开始后为 `Token generation`）。
- **[PR #10831](https://github.com/unslothai/unsloth/pull/10831)** — 修复 Manual GPU 内存模式的 GGUF 决策日志在 Manual 分支禁用 `use_fit` 之前就对其插值的问题，导致日志记录 `--fit: on`，而实际启动携带的是 `--fit: off`。

## 5. 稳定性与回归

按严重程度排序：

1. **[PR #10832](https://github.com/unslothai/unsloth/pull/10832)**（已关闭）— `main` 自 `22bbff627`（#10706，2026-09-11）起损坏；`main` 上的每次 `Backend CI` 运行在 `34593400131`–`34657173780` 这些运行中均失败，且 `Repo tests (CPU)` 中一个陈旧断言使约 25 个开放 PR 变红。修复了五个根本原因。**修复已存在。**
2. **[PR #10825](https://github.com/unslothai/unsloth/pull/10825)**（已关闭）— 由于 `UNSLOTH_ALLOW_CPU=1` 禁用 TRL 补丁，GPU 主机上的 `unsloth/unsloth:latest` 中训练完全损坏。影响 Studio Train、notebook、`unsloth train`、GRPO。**修复已存在。**
3. **[Issue #10835](https://github.com/unslothai/unsloth/issues/10835)** — 安全问题：当工具权限设置为 “Run automatically” 或 “Full access” 时，`reboot` 或 `rm` 等命令会在无确认的情况下执行，绕过沙箱和安全检查。尚无修复 PR。
4. **[PR #10819](https://github.com/unslothai/unsloth/pull/10819)** — `accelerate` 1.15.0（2026-09-09 发布）在 `Accelerator.prepare_model` 中无条件调用 `model_has_dtensor(model)`，导入 `torch.distributed.tensor` → `torch._C._distributed_c10d`，而 AMD Windows ROCm wheels 不提供该模块。**Windows 上每次 ROCm 训练运行都会失败。** 变通方案 PR 将 accelerate 限制在 <1.15。
5. **[Issue #10839](https://github.com/unslothai/unsloth/issues/10839)** — MCP 调用被系统性地截断且无法绕过；疑似去重问题。Windows 11、NVIDIA CUDA、Studio 桌面端 + Web UI。无修复 PR。
6. **[Issue #10840](https://github.com/unslothai/unsloth/issues/10840)** — 桌面 AppImage 缺少一个包：大型模型下载（例如 Qwen 3.8 Flash Next Q5_K_XL）失败，报 `ValueError: file too large ... install hf_xet`。无修复 PR。
7. **[Issue #10817](https://github.com/unslothai/unsloth/issues/10817)** — Studio 2026.9.2 桌面端：Run-settings 侧边栏和模型下拉菜单的 Run-settings 页面持有独立草稿，并对同一组按模型设置悄无声息地不一致。
8. **[Issue #10288](https://github.com/unslothai/unsloth/issues/10288)** — Studio 在 “New chat” 时崩溃，报 `tapClientLookup: Index 1 out of bounds (length: 0)`，以及 `MessagePartText can only be used inside text or reasoning message parts`。随机发生，需要重启。
9. **[PR #10803](https://github.com/unslothai/unsloth/pull/10803)** — IPv6 黑洞可能导致 Studio 后端失效：绑定到 `127.0.0.1:8888` 后无响应；HF token 状态卡在 “Checking token…” 且桌面端在约 80 s 后报告 `terminal_reason=unresponsive_health_check`。相关：**[Issue #10379](https://github.com/unslothai/unsloth/issues/10379)**、**[Issue #10288](https://github.com/unslothai/unsloth/issues/10288)**。
10. **[Issue #1067](https://github.com/unslothai/unsloth/issues/1067)** — 长期存在：在 Llama 3.1 8B Instruct notebook 流程中加入 eval set 后，评估损失变为常数。标记为 `currently fixing, good first issue`，今日更新，8 条评论。
11. **[Issue #10822](https://github.com/unslothai/unsloth/issues/10822)**、**[Issue #10824](https://github.com/unslothai/unsloth/issues/10824)** — 功能缺口：无法从 hub 一键安装 MCP / 远程访问时 MCP 不可用；语音输入在 LAN 下无法工作。

另有值得关注的在途功能工作：**[PR #10816](https://github.com/unslothai/unsloth/pull/10816)**（model card 的 `method` 字段被丢弃）、**[PR #10088](https://github.com/unslothai/unsloth/pull/10088)**（MCP 工具返回的图现在会转发给模型）、**[PR #10837](https://github.com/unslothai/unsloth/pull/10837)**（自定义 GPT gateway 的 `max_completion_tokens`）、**[PR #10833](https://github.com/unslothai/unsloth/pull/10833)** / **[PR #10789](https://github.com/unslothai/unsloth/pull/10789)** / **[PR #10788](https://github.com/unslothai/unsloth/pull/10788)**（Studio 模型管理与图像模型控制）、**[PR #10814](https://github.com/unslothai/unsloth/pull/10814)**（Deep Research 从报告的代码中剥离链接）、**[PR #9834](https://github.com/unslothai/unsloth/pull/9834)**（Homebrew cask 文档）。

## 6. 对应用开发者意味着什么

- **固定你的 `accelerate` 和 `trl` 版本。** 两个独立的上游破坏已经出现：`accelerate` 1.15.0 会使 Windows 上的 ROCm 训练失效，而 TRL ≥0.20 移除了 Studio 代码路径仍在传入的 `max_seq_length`/`tokenizer` kwargs。在 Unsloth 发布修补版本之前，请同时约束两者。
- **如果你在 GPU 上训练，请重新拉取或重建 Docker 镜像。** `unsloth/unsloth:latest` 镜像曾通过 `UNSLOTH_ALLOW_CPU=1` 悄悄禁用 TRL 补丁；修复已于今日合入。如果你从近期 checkout 构建过镜像，请重建。
- **在生产使用前，Studio 工具执行值得仔细审查。** “Run automatically”/“Full access” 权限模式目前允许未经确认就执行未沙箱化的破坏性命令（[#10835](https://github.com/unslothai/unsloth/issues/10835)）。对于任何 agentic 场景，请将工具权限保持在每次调用确认模式。
- **MCP 流水线在 Studio 中尚不可靠。** 工具调用被截断（[#10839](https://github.com/unslothai/unsloth/issues/10839)）以及重复的相同工具调用无法去重（[#10379](https://github.com/unslothai/unsloth/issues/10379)），使 compile/retry 风格的 agent 循环非常脆弱。
- **如果 MoE 量化或内存是你的约束，请关注 EXL3 后端。** 这是在不用 bitsandbytes 的情况下量化 MoE 模型的唯一已提案路径，支持低至 2-bit 的分数位宽（[#7115](https://github.com/unslothai/unsloth/pull/7115)）。
- **ROCm 用户获得一等公民的 Docker 路径**，通过 [#10820](https://github.com/unslothai/unsloth/pull/10820)，覆盖 RDNA2–RDNA4 和 CDNA，并与 CUDA 镜像具有相同的 build/run/smoke-test 契约。
- **Blackwell 上的吞吐余量在 CPU 侧循环，而不是 kernel。** [#10744](https://github.com/unslothai/unsloth/pull/10744) 中的 B200 性能分析（0.85 s → 0.66 s/步）表明，单步主机开销是单 GPU LoRA SFT 工作负载的一个有意义杠杆。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*