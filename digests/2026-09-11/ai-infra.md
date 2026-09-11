# AI 基础设施日报 2026-09-11

> 生成时间: 2026-09-11 00:31 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 跨项目 AI 基础设施对比 — 2026-09-11

*注：下方 issue/PR 数量是 2026-09-11 摘要中引用的唯一 GitHub issue/PR 链接数，并非仓库跟踪器总量。它们只是活动量的方向性代理指标。*

## 1. 生态系统概览

AI 基础设施层正处于高速发展但受正确性约束的阶段：今天没有大型服务引擎发布新版本，而 DeepSeek V4.1/V4、GLM-5.3-Flash、Qwen3.8、Kimi-K3 和 MiniMax-M3 的集成工作主导了 vLLM、SGLang 和 llama.cpp。最重要的模式是，**静默的正确性与确定性回退如今已成为首要阻塞因素**，而非原始吞吐量：投机解码、前缀缓存、量化内核和分布式服务路径都暴露出错误输出或崩溃报告。硬件碎片化也在 Blackwell/SM120/SM121/GB10、ROCm、Vulkan、NPU 和 Apple MLX 上不断扩大。与此同时，LiteLLM 正通过 OCR 和支出/路由修复扩展网关/控制平面，Unsloth 则将微调与多模态量化推向 NVFP4/FP8/INT8。市场正分化为三条赛道：数据中心服务引擎、本地运行时，以及控制平面/训练工具。

## 2. 活动对比

| 项目 | 摘要引用的唯一 Issues | 摘要引用的唯一 PRs | 发布状态 |
|---|---:|---:|---|
| vLLM | 26 | 17 | 过去 24 小时无新版本/标签 |
| SGLang | 28 | 18 | 无新版本；CI 报告 2 个损坏，8 个不稳定 |
| llama.cpp | 18 | 25 | 已发布 10 个 nightly 构建，b10889 → b10901；无破坏性变更 |
| Ollama | 15 | 14 | 无发布；存在未解决的 CVE 报告和 FD 泄漏 |
| LiteLLM | 21 | 16 | v1.100.1 稳定版；v1.101.0-rc.2 候选版本 |
| Unsloth | 22 | 18 | 无标签发布 |

**解读：** vLLM 和 SGLang 仍是 issue 最多的数据中心服务项目，正确性和硬件后端分诊占据主导。llama.cpp 的 PR 节奏最高，反映出后端/内核快速迭代。LiteLLM 是此时间窗口内唯一同时有稳定版 + RC 发布的项目。Ollama 和 Unsloth 活跃，但今天没有发布带标签的制品。

## 3. 模型支持竞赛

| 模型 / 架构集群 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---|---|---|---|---|---|---|
| **DeepSeek V4 / V4.1 / V4-Flash** | ROCm 上的 V4 Vision，V4.1 Engram DP 分片/卸载；V4-Flash 的 Ampere SM8x 仍不受支持 | 最深入的 V4.1 集成：shared-experts 融合、HiCache SWA 重放、indexer 统一、压缩池；存在 V4-Flash 损坏和 V4.1 融合垃圾 logits 问题 | PR 中支持 V4.1-Flash 转换 | 云支持请求（已请求/已关闭） | 分时定价请求已停滞 | — |
| **GLM-5.3-Flash / GLM5-Next** | 不支持 `Glm5NextTextLinearAttention`；GLM-5.3 B200 崩溃和 ROCm 静默随机 token 回退 | SM120 认证、ROCm GLM5 DSA indexer 优化；checkpoint 加载权重丢弃问题 | GLM-5.3-Flash GLM5-Next 转换 PR | 云流中止修复 | — | — |
| **Qwen3.5 / Qwen3.8 / Next** | Qwen3.8 非确定性、tool-choice/MTP 问题；混合 GDN + MTP 前缀缓存惩罚 | Qwen3.5 GDN 多条目评分、AMD 融合量化 `in_proj`、Qwen3.8 QSA 移除；H20 FP8 启动失败和 DFlash2 发散 | Vulkan small-M Qwen 优化；qwen4exp QSA indexer 缓存 | qwen3-coder 工具调用缺口；qwen2.5-coder 低比特失败 | vLLM `cached_tokens` 成本差距 | Qwen3.5-9B LoRA SFT；Qwen3.8 GGUF 长上下文重新处理 |
| **Kimi-K3 / MiniMax-M3** | Kimi-K3 ROCm shared-expert 多流 WIP；MiniMax-M3 FP4 AR+GemmaNorm 融合 | Kimi-K3 严格工具调用语法 bug；MiniMax-M3 ROCm fp8 indexer + shared-experts 融合 | — | — | Kimi-K2.6 Together 请求 | — |
| **本地 / 多模态** | Ling-3.0-flash-VL XPU CI 依赖 | SenseNova-U1/U1.5 跟踪 | Ling 3.0 聊天解析器；GLM-5.3、DeepSeek V4.1 转换 | Gemma4/3n 解析器修复；Gemma3n CPU projector 损坏 | Azure/Vertex/Reducto OCR 适配器 | NVFP4 视频、FP8/INT8 图像、MLX MoE/decode 融合 |

**谁领先：**
- **SGLang** 在 DeepSeek V4.1 集成深度上走得最远，但该代码尚未达到生产安全状态。
- **vLLM** 拥有最广泛的模型 + 硬件支持，以及最活跃的正确性分诊，尤其是围绕 GLM、Qwen、投机解码和 ROCm/Blackwell 的部分。
- **llama.cpp** 在 DeepSeek V4.1-Flash、GLM-5.3-Flash 和 Ling 3.0 的本地/GGUF 转换，以及后端可移植性方面领先。
- **Ollama** 在新模型内核方面落后；今天的工作主要是解析器/工具调用正确性和云管道。
- **LiteLLM** 不在模型内核上竞争，但正在扩展提供商和 OCR 覆盖面。
- **Unsloth** 在微调和多模态量化方面领先，而非服务引擎模型支持。

## 4. 性能前沿

| 优化领域 | 工作集中在哪里 |
|---|---|
| **KV 缓存 / 前缀缓存** | vLLM：MTP/EAGLE 前缀缓存最后块重计算、batch ≥ 4 时调度器崩溃。SGLang：HiCache、Mamba radix-cache 前缀命中回退、版本化 KV hint envelope。llama.cpp：prompt-cache LoRA 污染。Ollama：活跃路径上的前缀缓存逐出。Unsloth：工具调用/重载后全上下文重新处理。 |
| **批处理 / 调度** | vLLM：PCP 解码分片、异步调度、批不变确定性。SGLang：DCP 下可中断 prefill CUDA graphs、投机 worker prefill 暂存。llama.cpp：Vulkan small-M 和 MoE top-k prefill 融合。LiteLLM：取消 Anthropic 流时 `max_parallel_requests` 泄漏。 |
| **量化** | vLLM：MXFP4 MoE、Marlin W4A8-FP8、FP4 融合；GB10 Marlin 静默损坏。SGLang：SM120 逐张量 FP8 GEMM、MiniMax fp8 K 缓存、AMD 融合量化 `in_proj`。llama.cpp：VNNI k-quant `mul_mat` 声称 3–7 倍，CUDA 4-bit KV 回退。Unsloth：NVFP4/FP8/INT8 图像/视频路径。Ollama：q2/q3 Qwen2.5-Coder 失败。 |
| **分布式服务** | vLLM：固定顺序 TP all-reduce、CUTLASS Blackwell 融合 GEMM+AllReduce、通过 `torch.compile` 的 MoE 集合通信、EP/DP/TP/PP 组合。SGLang：TP24 Hopper 词表填充、NCCL 2.29–2.30 路线图、PD 分离、DCP。 |
| **内核 / 后端** | vLLM：CUTLASS、Triton、Marlin、ROCm/TheRock。SGLang：ROCm aiter、SM120 FP8、DeepSeek V4 indexer 内核。llama.cpp：Vulkan、SYCL graph replay、CUDA/ROCm RDNA3.5 WMMA MMQ。Unsloth：NVFP4 内核、MLX MoE/decode 融合。 |
| **网关 / 控制平面** | LiteLLM：支出跟踪 sidecar、健康检查 DB 风暴、预算重置扩展、OCR 适配器、流式 mock 重新分词。SGLang：面向编排器的 KV hint envelope。Ollama：GGUF 元数据缓存、MLX 调度器内存检查。 |

**集中度：** 数据中心服务的工作正在 vLLM 的分布式/正确性工作和 SGLang 的 ROCm/SM120 + DeepSeek V4.1 集成之间分化。本地推理工作集中在 llama.cpp 的 CPU/Vulkan 内核和 Ollama 的 MLX/内存管理上。控制平面优化几乎完全由 LiteLLM 承担。训练/量化优化则由 Unsloth 承担。

## 5. 层级定位

| 层级 | 项目 | 定位 |
|---|---|---|
| **数据中心服务引擎** | **vLLM**, **SGLang** | 面向生产 LLM 的高吞吐 GPU 服务。vLLM 强调广泛的模型/硬件覆盖 + 正确性修复。SGLang 强调 DeepSeek V4.x、ROCm/SM120、结构化/智能体服务。 |
| **本地运行时** | **llama.cpp**, **Ollama** | llama.cpp 是可移植的 GGUF/CPU/GPU 推理引擎，积极进行后端/内核工作。Ollama 是围绕 llama.cpp/MLX 的用户友好桌面/服务器封装，支持云卸载。 |
| **LLM 网关 / 代理** | **LiteLLM** | 提供商无关的路由、认证、支出跟踪、回退、可观测性，以及现在的 OCR/控制平面功能。不是推理引擎。 |
| **微调 / 训练加速** | **Unsloth** | LoRA/微调、量化、Studio 推理、MLX/MoE 优化，以及多模态/视频量化。与服务相邻，但聚焦上游。 |

**实际含义：** 如果你正在构建生产推理，vLLM 和 SGLang 是你的服务候选，但两者今天都存在未解决的正确性注意事项。llama.cpp/Ollama 用于本地或边缘部署。LiteLLM 是多提供商编排的网关层。Unsloth 是训练/量化层。

## 6. 趋势信号

1. **DeepSeek V4.1 和 GLM-5.3-Flash 是集成战场——但尚未生产就绪。** SGLang 在 V4.1 上最深入，vLLM 在硬件上最广泛，llama.cpp 正在为本地使用进行转换。然而，shared-experts 融合垃圾 logits、checkpoint 权重丢弃、B200 崩溃和 ROCm 静默随机 token 意味着生产部署应等待修复。

2. **静默正确性和确定性如今是头号基础设施风险。** vLLM 存在 GLM-5.3 ROCm 静默随机 token、Qwen3.8 贪心非确定性和 GB10 Marlin 损坏。llama.cpp 在量化目标上存在投机解码发散和 MTP 锁死。Ollama 存在低比特 Qwen2.5-Coder 失败。应用开发者应固定已知良好版本、运行黄金输出测试，并避免在量化目标上启用尚未验证的投机解码。

3. **投机解码 + 前缀缓存并非无代价的性能收益。** vLLM 报告在复用前缀的混合 GDN/MTP 工作负载上出现 30–40% 批吞吐损失，以及调度器并发悬崖。llama.cpp 报告 MTP 锁死和贪心发散。在为智能体或批处理工作负载启用之前，请先对投机解码与原生解码进行基准测试。

4. **硬件碎片化正在加剧，非 CUDA 后端正获得真正关注。** Blackwell/SM120/SM121/GB10、ROCm、Vulkan、SYCL、NPU 和 Apple MLX 都出现在活跃工作中。但 GB10/DGX Spark 目前有多个量化服务损坏报告，ROCm 路径存在平台特定故障。请按驱动和按量化分别验证。

5. **智能体工作负载正在拉动网关和运行时功能前进。** 工具调用、结构化输出、1M 上下文、KV 缓存提示、OCR 和每请求 LoRA 隔离都在活跃推进。LiteLLM 正在整合 OCR 和支出/路由；SGLang 正在提出 KV hint envelope；Ollama 和 llama.cpp 正在修复工具调用和服务器 API 语义。如果你构建智能体，请关注工具调用语法正确性和 prompt-cache 污染。

6. **量化和多模态微调正在扩展。** Unsloth 正在增加 NVFP4 视频/图像路径、MLX MoE 融合和 LoRA SFT 改进。llama.cpp 可能落地 3–7 倍 CPU k-quant matmul 加速。但低比特量化在某些栈中仍会产生静默失败——尤其是 Ollama 的 q2_K/q3_K Qwen2.5-Coder 制品。

7. **安全和供应链卫生仍是生产就绪事项。** Ollama 有一个未解决的 CVE 报告和 `ollama serve` 中的 FD 泄漏。LiteLLM 正在强制使用 cosign 签名的 Docker 镜像，但 v1.100.0 中也有 retry-breadcrumb 内存泄漏。使用 IB fabric 的 SGLang 用户可能需要 NVSHMEM 3.7.2 来设置 `NVSHMEM_IB_GID_INDEX`。请将这些视为部署阻塞项，而非 backlog 噪音。

**下一步关注：** SGLang 的 DeepSeek V4.1 shared-experts 修复是否落地，vLLM 是否解决 Ampere DeepSeek-V4-Flash 支持和 GB10 量化损坏，llama.cpp 的 VNNI k-quant PR 是否合并，以及 LiteLLM 是否弥合 Claude Code → vLLM 路由缺口。目前，生态系统在模型覆盖和内核专用化方面进展最快，但生产的门控因素仍然是输出正确性和硬件特定稳定性。

---

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-11

## 1. 今日亮点

过去 24 小时内没有新版本落地，但 issue 跟踪器在三个问题簇上持续火热：**DeepSeek-V4-Flash 的 Ampere (SM8x) 支持**仍是互动量最高的未关闭 issue，混合 GDN/MTP 模型中的**投机解码 + 前缀缓存**正确性正在同时催生 bug 报告和修复 PR（[#53670](https://github.com/vllm-project/vllm/issues/53670)、[#52244](https://github.com/vllm-project/vllm/pull/52244)），而 **Blackwell/GB10 (sm_121) 加 ROCm** 路径继续暴露出正确性回归，而非干净的性能提升。积极的一面是，确定性工作取得进展：新增可选的固定顺序 TP all-reduce，并继续跟踪 batch-invariant。

## 2. 发布与破坏性变更

- **过去 24 小时内没有新版本或 tag。**
- 进行中的行为防护：MRV1 + PP>1 + 异步调度 + 结构化输出现被显式拒绝，而不是在运行时以 HTTP 500 / "Failed to advance FSM" 失败 — [PR #56250](https://github.com/vllm-project/vllm/pull/56250)。
- 新增可选配置项：`VLLM_TP_FIXED_ORDER_ALLREDUCE=1`，用于确定性的、固定 rank 顺序的 TP reduction — [PR #56358](https://github.com/vllm-project/vllm/pull/56358)。
- 新增构建标志：`VLLM_USE_ROCK=1`，用于在 AMD CI 中选择基于 TheRock 的 ROCm Dockerfile — [PR #56351](https://github.com/vllm-project/vllm/pull/56351)。

## 3. 新模型与硬件支持

- **ROCm 上的 DeepSeek V4 Vision** — 将平台中立的 `DeepseekV4ForConditionalGeneration` wrapper 移至 `common/`，并启用 ROCm registry、dummy-init 和 tensor-schema 路径；[PR #55107](https://github.com/vllm-project/vllm/pull/55107)。
- **DeepSeek V4.1 Engram（DP 分片 + offload 预取）** — 支持 DP 分片 Engram 表与 mmap 共享 host 表的堆叠工作；[PR #56357](https://github.com/vllm-project/vllm/pull/56357)。
- **DeepSeek-V4-Flash-0731 的 Ampere/SM8x 支持** — 在 A100/A800/RTX 30xx 上仍不受支持；流量最高的功能请求，已有 107 条评论；[Issue #50576](https://github.com/vllm-project/vllm/issues/50576)。
- **GLM-5.3-Flash `Glm5NextTextLinearAttention` 不受支持** — vLLM nightly 尚未处理的新架构；[Issue #54062](https://github.com/vllm-project/vllm/issues/54062)。
- **ROCm TP>1 上的 Kimi-K3 shared-expert multi-stream overlap** — WIP 启用；[PR #56167](https://github.com/vllm-project/vllm/pull/56167)。
- **Turing (SM 7.5) Gemma4** — 所有 attention 后端都触及共享内存限制；未报告可行路径；[Issue #38918](https://github.com/vllm-project/vllm/issues/38918)。
- **aarch64 上的 sm_121 (GB10 / DGX Spark)** — 仍无官方支持；[Issue #36821](https://github.com/vllm-project/vllm/issues/36821)。
- **OmniLingual ASR（1600+ 种语言）** — 新模型请求，被指为与 Voxtral/LLaMA 类似；[Issue #28509](https://github.com/vllm-project/vllm/issues/28509)。
- **XPU CI 依赖**：在 `inclusionAI/Ling-3.0-flash-VL` registry 条目之后，将 `decord==0.6.0` 加入测试依赖；[PR #56355](https://github.com/vllm-project/vllm/pull/56355)。

## 4. 性能与优化

- **CUTLASS Blackwell Lamport 融合 GEMM+AllReduce** — 提议在 SM100 上替换现有 GEMM-RS 路径；尚无基准数据；[Issue #55261](https://github.com/vllm-project/vllm/issues/55261)。
- **通过 `torch.compile` pass 实现 TP MoE 集合通信** — 无需对 linear 层动刀即可消除 DeepSeek 系列 MoE 中冗余的 sequence-parallel all-gather；[Issue #29139](https://github.com/vllm-project/vllm/issues/29139)。
- **CDNA3 上 MXFP4 MoE round-up 挤占 KV cache** — TP 分片的 expert 权重膨胀到 135.35 GiB（无 EP）对比 103.54 GiB（EP）；修复 PR 已打开；[PR #56359](https://github.com/vllm-project/vllm/pull/56359)、[Issue #53961](https://github.com/vllm-project/vllm/issues/53961)。
- **PCP decode 分片** — 当 `DCP == 1` 时，将仅 decode 的行轮转分配到各 PCP rank，而不是在每个 rank 上复制 decode；[PR #52162](https://github.com/vllm-project/vllm/pull/52162)。
- **EAGLE/MTP 前缀缓存 last-block drop** — 在一种混合 Qwen3.8 GDN 布局中，每次缓存命中需重算 1,648 个 token → 在复用前缀的工作负载上造成约 30–40% 的批吞吐损失；修复 PR 正在审查；[Issue #53670](https://github.com/vllm-project/vllm/issues/53670)、[PR #52244](https://github.com/vllm-project/vllm/pull/52244)。
- **混合 GDN + MTP 调度器塌缩** — batch ≥ 4 时只有约 3 个并发序列，接受率/吞吐量断崖；[Issue #55533](https://github.com/vllm-project/vllm/issues/55533)。
- **Minimax-M3 FP4：融合 AR + GemmaNorm** — 进行中的 kernel 融合；[PR #52680](https://github.com/vllm-project/vllm/pull/52680)。
- **运行时零 JIT 编译** — 跨 DeepSeek V4 和其他系列的 de-JIT 化总跟踪 issue，多个阻塞项已关闭；[Issue #49349](https://github.com/vllm-project/vllm/issues/49349)。
- **GB10 上的 Marlin W4A8-FP8** — 运行约快 2.5%，但会产生静默损坏的输出；性能收益不可用；[Issue #49546](https://github.com/vllm-project/vllm/issues/49546)。

## 5. 稳定性与回归

按严重程度排序（静默错误输出 > 崩溃 > 性能回归）：

**严重 — 静默正确性**
- **GLM-5.3 (`GlmMoeDsa`) + ROCm 上的 decode-context-parallel**：在 0.28.0 上崩溃，**在 0.29.0 上静默返回随机 token** — 0.27→0.28+ 的回归；[Issue #54300](https://github.com/vllm-project/vllm/issues/54300)。
- **GB10/sm_121a 上的 Marlin W4A8-FP8 (`VLLM_MARLIN_INPUT_DTYPE=fp8`)**：损坏输出，WNA16 INT4 MoE 在 temp 0 下反复输出 `</think>` 循环；[Issue #49546](https://github.com/vllm-project/vllm/issues/49546)。
- **Qwen3.8-Flash-Next 贪心非确定性**：一旦上下文超过 `indexer_budget`（QSA dense→top-k 切换），五个相同的 `temperature=0` 请求会返回五个不同的 completion，追查到 prefill 中的 `persistent_topk`；sm121/GB10；[Issue #54521](https://github.com/vllm-project/vllm/issues/54521)。
- **`persistent_topk` 丢弃候选**：当许多值共享一个粗粒度直方图 bin 时 — 与上述相关；[Issue #51782](https://github.com/vllm-project/vllm/issues/51782)。
- **DGX Spark (sm_121) 上的陈旧 Triton kernel 缓存**：输出乱码，清除 `~/.triton/cache` 可恢复正确性 — 现已**关闭**；[Issue #41871](https://github.com/vllm-project/vllm/issues/41871)。
- **固定顺序 TP reduction** 提议用于消除依赖 rank 顺序的求和带来的运行间非确定性；[PR #56358](https://github.com/vllm-project/vllm/pull/56358)。batch-invariant 工作继续跟踪；[Issue #27433](https://github.com/vllm-project/vllm/issues/27433)。

**高 — 崩溃 / 初始化失败**
- **GLM-5.3-Flash 在 4×B200 上反复出现 CUDA 非法内存访问**，出现在三个不相关的 kernel 中（KDA linear-attention、MHC TileLang、TRT-LLM 融合 MoE）；[Issue #54317](https://github.com/vllm-project/vllm/issues/54317)。
- **GLM-5.3-Flash checkpoint 加载错误**：v0.29.0（worker 进程无法启动，TP2/EP2）— **已关闭**；[Issue #56007](https://github.com/vllm-project/vllm/issues/56007)。
- **`custom_all_reduce` IPC handle 失败**：当 DP>1 **且** TP>1 时，使用 `expandable_segments:True` 会出现（单独使用任一条件时可正常工作）；[Issue #42609](https://github.com/vllm-project/vllm/issues/42609)。
- **8×H20-3e 上的 DeepSeek-V4-Pro**：`mlir_global_dtors()` 缺少参数错误；[Issue #44949](https://github.com/vllm-project/vllm/issues/44949)。
- **ROCm FLA `chunk_gated_delta_rule` 在 MI210/gfx90a 上使用 `num_stages=4` 时 Triton 编译失败**；[Issue #44973](https://github.com/vllm-project/vllm/issues/44973)。
- **Tesla T4 在 Triton 中共享内存 OOR**（需要 81920，限制 65536）；[Issue #36802](https://github.com/vllm-project/vllm/issues/36802)。
- **Mistral3 HF 格式纯文本 `LLM()` 初始化**在多模态 profiling 中失败 — **已关闭**；[Issue #50706](https://github.com/vllm-project/vllm/issues/50706)。

**前端 / API 正确性**
- **Anthropic 兼容流式响应因 `exclude_unset=True` 在终止 `message_delta` 中丢弃 `stop_sequence`**；修复 PR 已打开（需要 rebase），重复项已关闭；[PR #56259](https://github.com/vllm-project/vllm/pull/56259)、[PR #55325](https://github.com/vllm-project/vllm/pull/55325)。
- 对 Qwen3.8-Flash-Next（流式，`enable_thinking=false`）**未强制执行 `tool_choice="required"`**，并且在 thinking + MTP 下出现 xgrammar FSM 失败 — **已关闭**；[Issue #55552](https://github.com/vllm-project/vllm/issues/55552)。
- 使用 MTP 投机解码时**未强制执行 thinking-token 预算**（不使用 MTP 时可正常工作）— **已关闭**；[Issue #39573](https://github.com/vllm-project/vllm/issues/39573)。
- **MRV1 + PP>1 + 异步调度 + 结构化输出**现在在配置校验阶段被阻止；[PR #56250](https://github.com/vllm-project/vllm/pull/56250)。

**值得跟踪的进行中修复**
- MTP 下的 Hybrid GDN 前缀缓存：[PR #52244](https://github.com/vllm-project/vllm/pull/52244)。
- profiling 期间的 DFlash DP 元数据：[PR #56330](https://github.com/vllm-project/vllm/pull/56330)。
- Step-3.5 MTP 修复（已合并/关闭）：[PR #54672](https://github.com/vllm-project/vllm/pull/54672)。
- 非编译 cudagraph fallback（堆叠，已被 #55095 取代）：[PR #55095](https://github.com/vllm-project/vllm/pull/55095)、[PR #56191](https://github.com/vllm-project/vllm/pull/56191)。

## 6. 对应用开发者的意义

- **确定性还不是默认保证。** 如果你依赖可复现输出（评测框架、缓存、回归测试），请注意 Qwen3.8/SM121 上 `persistent_topk` 的非确定性（[#54521](https://github.com/vllm-project/vllm/issues/54521)）以及依赖 rank 顺序的 TP reduction。关注 `VLLM_TP_FIXED_ORDER_ALLREDUCE`（[#56358](https://github.com/vllm-project/vllm/pull/56358)）和 batch-invariant 跟踪 issue（[#27433](https://github.com/vllm-project/vllm/issues/27433)）。
- **目前避免在量化服务中使用 GB10/DGX Spark。** 陈旧的 Triton 缓存损坏（[#41871](https://github.com/vllm-project/vllm/issues/41871)，现已关闭）和 Marlin W4A8-FP8 静默损坏（[#49546](https://github.com/vllm-project/vllm/issues/49546)）都会影响该平台。如果必须使用，请固定 kernel 缓存并验证输出。
- **GLM-5.3-Flash 在 B200 或 ROCm 上尚未达到生产就绪。** 4×B200 上的非法内存访问（[#54317](https://github.com/vllm-project/vllm/issues/54317)）和 ROCm 0.29.0 上的静默随机 token 输出（[#54300](https://github.com/vllm-project/vllm/issues/54300)）是阻塞项；0.27 是 ROCm DCP 路径最后一个不崩溃的版本。
- **投机解码 + 前缀缓存可能会牺牲而不是节省吞吐。** 如果你用 MTP 服务 Qwen3.5/3.8 混合 GDN，并且有大量 prompt 复用，请为 last-block 重算惩罚留出预算（[#53670](https://github.com/vllm-project/vllm/issues/53670)），或在 [#52244](https://github.com/vllm-project/vllm/pull/52244) 落地前禁用 MTP。batch ≥ 4 时的调度器并发断崖（[#55533](https://github.com/vllm-project/vllm/issues/55533)）值得用你自己的流量做基准测试。
- **Anthropic 兼容客户端**：流式 `message_delta` 的 `stop_sequence` 字段目前在某些停止原因下会被丢弃；如果你的客户端会解析它，请等待 [#56259](https://github.com/vllm-project/vllm/pull/56259)，或只读取 `stop_reason`。
- **在打补丁前应避免的配置组合**：MRV1 + PP>1 + 异步调度 + 结构化输出（[#56250](https://github.com/vllm-project/vllm/pull/56250)），以及同时 DP>1 和 TP>1 时的 `expandable_segments:True`（[#42609](https://github.com/vllm-project/vllm/issues/42609)）。
- **ROCm 用户**：GLM MoE 上的 decode-context-parallel 不安全（[#54300](https://github.com/vllm-project/vllm/issues/54300)）；MI210 FLA 路径需要调整 `num_stages`（[#44973](https://github.com/vllm-project/vllm/issues/44973)）；MXFP4 MoE KV-cache 压力正在修复（[#56359](https://github.com/vllm-project/vllm/pull/56359)）。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang 摘要 — 2026-09-11

### 1. 今日亮点
过去 24 小时内没有新版本发布；活动主要由 DeepSeek V4.1 集成工作、ROCm/SM120 内核优化以及持续的 CI/CUDA 稳定性分诊主导。最活跃的 issue 仍是 CUDA coredump 追踪器 [#26340](https://github.com/sgl-project/sglang/issues/26340)，有 297 条评论；同时 CI 报告了 2 个 broken、8 个 flaky 测试 [#17050](https://github.com/sgl-project/sglang/issues/17050)。DeepSeek、GLM、Kimi、Qwen 和 MiniMax 工作负载上仍有多个模型特定的正确性与崩溃报告处于开放状态。

### 2. 发布与破坏性变更
- 过去 24 小时内未发布新的 SGLang 版本。
- 已关闭的 RFC 提议弃用旧版 GPTQ non-Marlin 内核和 Dual Chunk Flash Attention 后端 [#32112](https://github.com/sgl-project/sglang/issues/32112)，以及 CUTLASS MLA 注意力后端 [#32111](https://github.com/sgl-project/sglang/issues/32111)。仍固定使用这些后端的用户应规划迁移。
- 提议退役 ROCm 7.0 内核 wheel，仅保留 ROCm 7.2/10.0 分支的 CI 覆盖 [#38767](https://github.com/sgl-project/sglang/pull/38767)。
- 捆绑的 NVSHMEM 3.4.5 缺少 `NVSHMEM_IB_GID_INDEX`；对于需要显式 GID pinning 的 IB fabric，请求升级到 3.7.2 [#38769](https://github.com/sgl-project/sglang/issues/38769)。

### 3. 新模型与硬件支持
- **DeepSeek V4.1 / V4 / V4-Flash**：正在进行的集成包括 shared-experts 融合路由 [#38963](https://github.com/sgl-project/sglang/pull/38963)、HiCache encoder SWA 重放 [#38957](https://github.com/sgl-project/sglang/pull/38957)、indexer 执行统一 [#38962](https://github.com/sgl-project/sglang/pull/38962)、compressed pool 泛化 [#38954](https://github.com/sgl-project/sglang/pull/38954)，以及 V4.1 的 fork-sync 前置条件 [#38818](https://github.com/sgl-project/sglang/issues/38818)。针对没有 chat template 的模型，提议加入 Rust 前端回退渲染器 [#38939](https://github.com/sgl-project/sglang/pull/38939)。
- **SenseNova-U1 / U1.5**：在 SGLang 中提供支持的功能与性能跟踪 [#37742](https://github.com/sgl-project/sglang/issues/37742)。
- **GLM-5.3-Flash**：SM120/Blackwell 资格认证跟踪 [#37813](https://github.com/sgl-project/sglang/issues/37813)；ROCm GLM5 DSA indexer 优化 [#34394](https://github.com/sgl-project/sglang/pull/34394)；checkpoint 加载正确性问题 [#38618](https://github.com/sgl-project/sglang/issues/38618)。
- **Qwen3.5 / Qwen3.8**：Qwen3.5 GDN 多条目评分功能已关闭 [#31969](https://github.com/sgl-project/sglang/issues/31969)；面向 Qwen3.5 的 AMD 融合量化 `in_proj` 层 [#33068](https://github.com/sgl-project/sglang/pull/33068)；Qwen3.8 Next tokenwise QSA 移除 [#38960](https://github.com/sgl-project/sglang/pull/38960)；H20 上 Qwen3.8-Flash-Next-FP8 启动失败 [#38793](https://github.com/sgl-project/sglang/issues/38793)；DFlash2 Qwen3.8-27B 分歧 [#38009](https://github.com/sgl-project/sglang/issues/38009)。
- **MiniMax-M3**：ROCm fp8 lightning-indexer K cache 分配 [#36549](https://github.com/sgl-project/sglang/pull/36549) 以及 gfx942+ 上的 shared-experts 融合 [#36576](https://github.com/sgl-project/sglang/pull/36576)。
- **硬件后端**：面向 small-M 的 SM120 per-tensor FP8 GEMM [#34429](https://github.com/sgl-project/sglang/pull/34429)；NPU router GEMM 的 fp32 要求 [#34861](https://github.com/sgl-project/sglang/issues/34861)；DeepSeek V4 Pro TP24 Hopper vocabulary padding 修复 [#31801](https://github.com/sgl-project/sglang/pull/31801)。

### 4. 性能与优化
- ROCm GLM5 DSA indexer q/k 预处理合并为单个 aiter 内核，每个 decode 层减少约 11 个内核 [#34394](https://github.com/sgl-project/sglang/pull/34394)。
- 为 Blackwell 级 GPU 新增 SM120 small-M per-tensor FP8 GEMM [#34429](https://github.com/sgl-project/sglang/pull/34429)。
- AMD 将 Qwen3.5 量化 `in_proj_qkvz` 和 `in_proj_ba` GEMM 融合为一个更宽的 GEMM [#33068](https://github.com/sgl-project/sglang/pull/33068)。
- MiniMax-M3 lightning-indexer K cache 在 ROCm 上迁移至 fp8 [#36549](https://github.com/sgl-project/sglang/pull/36549)；shared-experts 融合已在 ROCm gfx942+ 上启用 [#36576](https://github.com/sgl-project/sglang/pull/36576)。
- 提议 DSV4 DeepGEMM MegaMoE shared-to-sparse 专家融合 [#38700](https://github.com/sgl-project/sglang/issues/38700)。
- DeepSeek V4.1 indexer 执行决策与 compressed pool 管理正在集中化，以改善 prefill/decode 行为 [#38962](https://github.com/sgl-project/sglang/pull/38962)、[#38954](https://github.com/sgl-project/sglang/pull/38954)。
- decode 上下文并行下的可中断 prefill CUDA graphs 正在被修复/启用 [#38943](https://github.com/sgl-project/sglang/pull/38943)。
- 推测执行 worker 可通过选择启用的回调提前暂存 prefill 共享读取 [#38554](https://github.com/sgl-project/sglang/pull/38554)。
- NCCL 2.29–2.30 功能集成路线图包括 EP、M-to-N 传输、zero-SM 单边通信和 RAS 监控 [#32774](https://github.com/sgl-project/sglang/issues/32774)。
- 版本化 KV hint envelope 提案旨在让编排器能够以编程方式控制 agentic 工作负载的 KV-cache [#36224](https://github.com/sgl-project/sglang/issues/36224)。

### 5. 稳定性与回归
按严重程度排序：

1. **CUDA coredump 追踪器仍然非常活跃** — 从 `pr-test.yml` 自动收集的 coredump，297 条评论，未跟踪到单一修复 [#26340](https://github.com/sgl-project/sglang/issues/26340)。
2. **CI 健康状况下降** — 2 个 broken、8 个 flaky、最近修复 984 个；此前已激活维护模式 [#17050](https://github.com/sgl-project/sglang/issues/17050)、[#21065](https://github.com/sgl-project/sglang/issues/21065)。
3. **PD 分离 decode retraction 崩溃** — DCP > 1 时 decode retraction 可能在 `get_cpu_copy` 中触发 CUDA device-side assert；加固 PR 已开放 [#38645](https://github.com/sgl-project/sglang/issues/38645)，修复 PR [#38961](https://github.com/sgl-project/sglang/pull/38961)。
4. **DeepSeek V4.1 shared-experts 融合产生垃圾 logits** — 在 FP8 权重 + mxfp4 专家下使用 `--enforce-shared-experts-fusion`；修复 PR 已开放 [#38963](https://github.com/sgl-project/sglang/pull/38963)。
5. **DeepSeek-V4-Flash 渐进式输出损坏** — 在 2× H200 上使用 dsv4 + DP attention 时的并发问题 [#33397](https://github.com/sgl-project/sglang/issues/33397)。
6. **GLM-5.3 checkpoint 加载会静默丢弃 MoE/mHC/KDA 权重** — 对 transformers 写出的 checkpoint 存在正确性风险 [#38618](https://github.com/sgl-project/sglang/issues/38618)。
7. **Kimi-K3 严格工具调用语法 bug** — `additionalProperties` 可以用更宽松的 schema 满足命名属性，从而削弱严格工具约束 [#38587](https://github.com/sgl-project/sglang/issues/38587)。
8. **Mamba radix cache 前缀命中回归** — 新的 prefill 前缀命中在 split 后可能变成 0 命中；6 👍 [#22935](https://github.com/sgl-project/sglang/issues/22935)。
9. **DFlash2 推测解码分歧** — 启用 thinking 时，greedy 输出与仅 target 的 Qwen3.8-27B 产生分歧 [#38009](https://github.com/sgl-project/sglang/issues/38009)。
10. **H20 启动失败** — 8 卡 H20 无法启动 Qwen3.8-Flash-Next-FP8 [#38793](https://github.com/sgl-project/sglang/issues/38793)。
11. **Scripted-runtime rid 复用竞态** — 60s recv 超时，`test/manual/chunked_prefill` 中 3 个红色测试 [#38788](https://github.com/sgl-project/sglang/issues/38788)。
12. **HiCache TP 死锁** — `HiRadixCache.writing_check` 的 write-backup/load-back 入队决策不一致；issue 已关闭 [#28429](https://github.com/sgl-project/sglang/issues/28429)。
13. **可用/开放中的修复**：DeepSeek V4 Pro TP24 Hopper vocab padding [#31801](https://github.com/sgl-project/sglang/pull/31801)、msgspec `ServerArgs` `asdict` 失败 [#38958](https://github.com/sgl-project/sglang/pull/38958)、带 `num_tokens_in_batch` 的自定义 logit processor [#38730](https://github.com/sgl-project/sglang/pull/38730)。
14. **已关闭/不活跃**：Step3-VL/DeepSeek-OCR2 的 JPEG 图像解码 [#24699](https://github.com/sgl-project/sglang/issues/24699)、不使用 CUDA 构建 [#30931](https://github.com/sgl-project/sglang/issues/30931)、minilb abort proxy [#30955](https://github.com/sgl-project/sglang/issues/30955)、`stop_regex` buffer bound [#30932](https://github.com/sgl-project/sglang/issues/30932)、大写 `--log-level` 导致挂起 [#30353](https://github.com/sgl-project/sglang/issues/30353)。

### 6. 这对应用开发者意味着什么
- **今天没有可固定的新版本。** 如果你需要 DeepSeek V4.1，请跟踪活跃 PR 和 fork-sync 阻塞项，而不是假设 main 已可用于生产。
- **DeepSeek V4.1 shared-experts 融合目前有风险**：在 [#38963](https://github.com/sgl-project/sglang/pull/38963) 合入前避免使用 `--enforce-shared-experts-fusion`，或验证输出。
- **Kimi-K3 严格工具调用需要谨慎处理 schema**：将命名属性与 `additionalProperties` 混用可能削弱语法约束 [#38587](https://github.com/sgl-project/sglang/issues/38587)。
- **DCP > 1 的 PD 分离在 decode retraction 下存在崩溃风险**；关注 [#38645](https://github.com/sgl-project/sglang/issues/38645) 和 [#38961](https://github.com/sgl-project/sglang/pull/38961)。
- **ROCm 用户获得了有意义的性能优化**，涉及 Qwen3.5、MiniMax-M3 和 GLM5，但 ROCm 7.0 wheel 支持正在退役 [#38767](https://github.com/sgl-project/sglang/pull/38767)。
- **SM120/Blackwell 用户应跟踪 GLM-5.3-Flash 资格认证** [#37813](https://github.com/sgl-project/sglang/issues/37813) 和新的 small-M FP8 GEMM [#34429](https://github.com/sgl-project/sglang/pull/34429)。
- **没有 chat template 的模型**——尤其是 DeepSeek V4——可能会为 `/v1/chat/completions` 获得 Rust Dynamo 原生渲染器回退 [#38939](https://github.com/sgl-project/sglang/pull/38939)。
- **需要显式 GID index 的 IB fabric 可能需要 NVSHMEM 3.7.2**；捆绑的 3.4.5 缺少 `NVSHMEM_IB_GID_INDEX` [#38769](https://github.com/sgl-project/sglang/issues/38769)。
- **CI 不稳定性仍然很高**，因此请将上游 main 视为快速变动；生产环境请优先使用可用的固定版本。

---

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-11

## 1. 今日亮点

Vulkan 后端承接了今日大部分合入工作，三个独立 PR 分别针对 small-M matmul、prefill 阶段的 MoE top-k 融合以及异步拷贝路径——这清楚表明非 CUDA GPU 后端正在获得持续的优化关注。CPU 方面，一个长期运行的 PR 提议为 k-quants 引入分块 `mul_mat`，声称**使用 VNNI 可获得 3–7x 加速**；若合入，这将是近期记忆中单次最大的 CPU 推理提升。与此同时，issue tracker 被投机解码正确性问题主导（量化目标上的 MTP/draft 发散、CUDA 锁死、KV 位置跟踪失败），让今天成为一个 *匹配 vanilla 输出* 比原始 tokens/sec 更重要的日子。

## 2. 发布与破坏性变更

过去 24 小时有十个构建合入（b10889 → b10901）。**没有破坏性 API、CLI 或配置变更。** 值得注意的条目：

- **b10901** — Vulkan：当上下文空闲时，在 `ggml_backend_vk_cpy_tensor_async` 中使用 CPU 写入（[PR #28618](https://github.com/ggml-org/llama.cpp/pull/28618)）
- **b10900** — Vulkan：通过 `add_alloc_dep` 为 prefill 启用 `topk_moe` 融合（[PR #28422](https://github.com/ggml-org/llama.cpp/pull/28422)）
- **b10899** — Vulkan：针对 Qwen 的 small-M 矩阵优化（[PR #28457](https://github.com/ggml-org/llama.cpp/pull/28457)）
- **b10897** — CI：WoA CUDA 13.4 构建从 Developer Preview 迁移到 13.4.1 GA 可再发行组件（[PR #28687](https://github.com/ggml-org/llama.cpp/pull/28687)）
- **b10896** — 投机解码：修复使用 DFlash 时 mtmd 分块解码失败（[PR #28587](https://github.com/ggml-org/llama.cpp/pull/28587)）
- **b10894** — 模型：移除旧模型路径中的死 switch 分支（[PR #28669](https://github.com/ggml-org/llama.cpp/pull/28669)）
- **b10893 / b10892** — 测试：放宽 Add 融合容差（[PR #28691](https://github.com/ggml-org/llama.cpp/pull/28691)）；移除 `test-backend-ops` 中的 SYCL 特殊处理（[PR #28688](https://github.com/ggml-org/llama.cpp/pull/28688)）
- **b10891** — Vulkan：PowerVR 上 dmmv 的共享内存归约回退（[PR #28341](https://github.com/ggml-org/llama.cpp/pull/28341)）
- **b10889** — 内存：停止为从不读取它的 indexer 分配 V cache（[PR #28330](https://github.com/ggml-org/llama.cpp/pull/28330)）

## 3. 新模型与硬件支持

**模型 / 架构（进行中）：**
- **DeepSeek V4.1-Flash**（`DeepseekV41ForCausalLM`）转换支持，在新的 `deepseek41` 架构下将 V4 路径作为子类；处理 `text_config` 参数嵌套（[PR #28696](https://github.com/ggml-org/llama.cpp/pull/28696)）
- **GLM-5.3-Flash (GLM5-Next)** — 320B 混合模型（34 个 KDA linear + 11 个 DSA 层，mHC，Deep…），支持文本 + 视觉（[PR #27773](https://github.com/ggml-org/llama.cpp/pull/27773)）
- **Ling 3.0 (Bailing V3)** 专用聊天解析器 — 之前，预先打开的 `<think>` 以及 `</think>` 之前的工具调用会产生空的 `content` 且没有 `tool_calls`（[PR #28682](https://github.com/ggml-org/llama.cpp/pull/28682)）

**后端 / 平台：**
- **Hexagon**：多 NPU 支持（IQ9/IQ10）以及完全异步后端 — 异步图计算、事件、张量拷贝、跨设备栅栏（[PR #26501](https://github.com/ggml-org/llama.cpp/pull/26501)，已关闭）
- **SYCL**：从 CUDA 移植的图记录与回放（[PR #28725](https://github.com/ggml-org/llama.cpp/pull/28725)）
- **Windows ARM64**：通过 `cmake -B build -DGGML_NATIVE=ON` 进行原生 MSVC `cl.exe` 构建，移除了 clang preset 要求（[PR #28362](https://github.com/ggml-org/llama.cpp/pull/28362)）
- **CUDA/ROCm**：RDNA3.5 批量 WMMA MMQ 内核（[PR #28714](https://github.com/ggml-org/llama.cpp/pull/28714)）
- **ARM CPU 变体**：跳过不支持的 ISA 扩展（例如 GCC < 14 上的 `+sme`），而不是让整个 `GGML_CPU_ALL_VARIANTS` 构建失败（[PR #26103](https://github.com/ggml-org/llama.cpp/pull/26103)）
- **OpenVINO**：Intel NPU 仍然缺少 Qwen3.5 支持（[Issue #28567](https://github.com/ggml-org/llama.cpp/issues/28567)）；`Q2_0` 量化格式请求已关闭且未被采纳（[Issue #23909](https://github.com/ggml-org/llama.cpp/issues/23909)）

## 4. 性能与优化

- **CPU k-quant matmul，3–7x**：通用分块 `mul_mat` 在 256×256 int8 窗口上使用 VNNI；避免当前 `vec_dot` 路径重复进行的量化解包（[PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851)）— 进行中影响最大的条目
- **Vulkan small-M（Qwen）**：`m=1 mul_mat` 现在交换 A/B，允许对 small M 使用 split_k，并且 coopmat2 tile 选择依据 M 而非 N（[PR #28457](https://github.com/ggml-org/llama.cpp/pull/28457)）
- **Vulkan prefill**：`add_alloc_dep` 解除 prefill 期间 `topk_moe` 融合的阻塞（[PR #28422](https://github.com/ggml-org/llama.cpp/pull/28422)）
- **qwen4exp / QSA indexer**：池化的 block-summary keys 现在会增量缓存，而不是每个 token 都重新收集并在整个上下文上重新计算 — 解决了深度处主要的解码开销（[PR #28699](https://github.com/ggml-org/llama.cpp/pull/28699)）；相关的解码成本增长报告已关闭（[Issue #28012](https://github.com/ggml-org/llama.cpp/issues/28012)）
- **内存**：移除了 DSA/Lightning indexer 的 V-cache 分配（每层约一个未使用的分配）（[PR #28330](https://github.com/ggml-org/llama.cpp/pull/28330)，[Issue #28296](https://github.com/ggml-org/llama.cpp/issues/28296)）
- **CUDA scaling**：用户报告默认构建会静默地将 4-bit KV prefill（`q4_0`/`q4_1`）降到 CPU 速度 — 约 30x 减速且无警告；提议将 `GGML_CUDA_FA_ALL_QUANTS=ON` 设为默认（[Issue #28633](https://github.com/ggml-org/llama.cpp/issues/28633)）

## 5. 稳定性与回归

按严重程度排序：

1. **flash-attn 路径中的 CUDA 非法内存访问** — 在 Qwen3.6-35B MoE + 部分专家卸载的特定序列的*第二个*请求上，`cudaStreamSynchronize` 崩溃；具有确定性，在 b10107/b10243 上可复现，使用 `-fa off` 后消失。未见修复 PR（[Issue #26609](https://github.com/ggml-org/llama.cpp/issues/26609)）
2. **MTP CUDA 锁死** — 在 `--split-mode tensor` 下，Qwen3.8-27B 可复现的硬锁死（[Issue #27122](https://github.com/ggml-org/llama.cpp/issues/27122)）；另外，MTP 保留请求间状态，导致 Qwen3.6-35B-A3B 上输出非确定且模型逐步退化（[Issue #26425](https://github.com/ggml-org/llama.cpp/issues/26425)）
3. **SM121 上的 qwen4exp `ggml_abort`** — 在 DGX Spark/GB10 上持续负载下 graph builder 中止（[Issue #27780](https://github.com/ggml-org/llama.cpp/issues/27780)）
4. **投机解码正确性** — draft-mtp/draft-dspark 的贪婪输出在量化目标上与 vanilla 发散，而在 bf16 上一致；ngram 投机不受影响（流量最高的 issue，23 条评论）（[Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618)）
5. **Spec KV 位置跟踪** — 在 Vulkan 上，`llama-spec` 在 16k 边界处因非连续位置（`Y != X + 1`）失败（[Issue #26478](https://github.com/ggml-org/llama.cpp/issues/26478)）
6. **Vulkan flash attention 从已释放的 cell 读取陈旧 K/V**，污染输出（[Issue #26744](https://github.com/ggml-org/llama.cpp/issues/26744)）
7. **Intel Arc 140V（Windows，Vulkan）** 在层卸载时产生乱码；依赖 batch-size，存在于 b10831/b10850/b10865（[Issue #28648](https://github.com/ggml-org/llama.cpp/issues/28648)）
8. **SYCL pool 崩溃** — 由于 oneDNN scratchpad，`ggml_sycl_pool_vmm::free` 破坏 LIFO 顺序（[Issue #28660](https://github.com/ggml-org/llama.cpp/issues/28660)）；SYCL Sysman 空闲内存查询可能不可用（[Issue #28239](https://github.com/ggml-org/llama.cpp/issues/28239)）
9. **服务端正确性** — prompt cache 跨请求复用时选择了不同的每请求 LoRA adapter，静默污染输出（[Issue #26207](https://github.com/ggml-org/llama.cpp/issues/26207)）；格式错误的客户端工具调用参数返回 HTTP 500 而不是 4xx（[Issue #25510](https://github.com/ggml-org/llama.cpp/issues/25510)）
10. **聊天模板解析** — `</think>` 检测匹配的是字面字符串而非特殊 token（[Issue #28679](https://github.com/ggml-org/llama.cpp/issues/28679)）

**已合入或排队的修复：** DFlash/mtmd 投机解码失败（[b10896](https://github.com/ggml-org/llama.cpp/pull/28587)）；图像输入后的投机位置，影响所有 drafter，而不仅是 DFlash（[PR #28715](https://github.com/ggml-org/llama.cpp/pull/28715)）；PowerVR dmmv pipeline 创建失败（[PR #28341](https://github.com/ggml-org/llama.cpp/pull/28341)）；GDN normalization 从 `x / max(sqrt(sum(x²)), eps)` 修正为 `x * rsqrt(sum(x²) + eps)`（[PR #28068](https://github.com/ggml-org/llama.cpp/pull/28068)，已关闭）；HIP 多序列 batch logit 损坏已解决（[Issue #28537](https://github.com/ggml-org/llama.cpp/issues/28537)，已关闭）。

## 6. 这对应用开发者意味着什么

- **不要假定投机解码输出等价。** 如果你在贪婪采样下对量化目标（Q4_K_M 及类似量化）运行 draft-mtp/draft-dspark，请预期其与非投机基线发散。`bf16` 目标和 ngram 投机目前是安全配置 — 如果你依赖确定性 agent 输出或 golden-test 回放，这一点很重要（[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)）。
- **每请求 LoRA + prompt cache 是实际存在的污染风险。** 在 [#26207](https://github.com/ggml-org/llama.cpp/issues/26207) 合入之前，不要依赖 KV 复用来进行会在缓存中途切换 adapter 的多租户路由；按 adapter 分区或禁用 prefix caching。
- **服务端 API 语义正在收紧。** [PR #28711](https://github.com/ggml-org/llama.cpp/pull/28711) 将非截断限制报告为 `finish_reason: "stop"` 而不是 `"length"`，[PR #28724](https://github.com/ggml-org/llama.cpp/pull/28724) 在 token 边界清理无效 UTF-8，以阻止 PEG-native 解析失败，并且 [PR #28707](https://github.com/ggml-org/llama.cpp/pull/28707) 使 `--lora-init-without-apply` 和 `"lora": []` 真正禁用 adapter — 请检查任何从响应推断 adapter 状态的客户端逻辑。
- **Vulkan 正在成为可行的一等目标**，适用于 Qwen 级 small-M 解码和 MoE prefill，但 Arc 140V 乱码输出和 stale-K/V flash-attention 报告意味着，在生产部署前应按驱动验证数值正确性。
- **CUDA 4-bit KV 用户：审查你的构建标志。** [#28633](https://github.com/ggml-org/llama.cpp/issues/28633) 中描述的静默 CPU 回退可能看起来像没有日志行的神秘 30x 减速 — 在它成为默认之前，请显式启用 `GGML_CUDA_FA_ALL_QUANTS=ON`。
- **如果你在 CPU 上提供服务，请关注 [PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851)**：k-quants 上 3–7x 的 `mul_mat` 提升将实质性改变量化模型仅用 CPU 时的每 token 成本。

---

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-11

## 1. 今日亮点
过去 24 小时内没有发布新版本；活动主要集中在解析器/工具调用正确性修复和 MLX 内存管理上。多个工具调用解析缺陷已关闭或得到处理（Gemma 4 `BEGIN_ARG`、Gemma3n、Gemma4 占位符冲突），云流式传输失败现在会作为中止响应传播，而不是虚假的完成响应（[#18351](https://github.com/ollama/ollama/pull/18351)）。在风险方面，针对 Ollama Go 二进制文件的关键/高危 CVE 报告（[#16033](https://github.com/ollama/ollama/issues/16033)）仍然开放，同时 `ollama serve` 中还有一个未发布修复的文件描述符泄漏问题（[#18344](https://github.com/ollama/ollama/issues/18344)）。

## 2. 发布与破坏性变更
- 过去 24 小时内没有新版本发布。
- 进行中（尚未合入）：[PR #18235](https://github.com/ollama/ollama/pull/18235) 升级 MLX，[PR #18317](https://github.com/ollama/ollama/pull/18317) 已合入 llama.cpp 升级至 `b10864`。
- 关注项：[PR #14969](https://github.com/ollama/ollama/pull/14969) 添加了服务端 MLX/safetensors 导入，并**从 `create` 中移除了 GGUF 转换**，转而将现有 GGUF 包装为 manifest。对于依赖服务端转换的用户来说，这可能是一个迁移节点。

## 3. 新模型与硬件支持
- **DeepSeek-V4.1-Flash 云支持请求** — [issue #18360](https://github.com/ollama/ollama/issues/18360) 以 27 个 👍 关闭；相关的 V4-Flash-Vision 请求（[#18178](https://github.com/ollama/ollama/issues/18178)）也已关闭。
- **Gemma3n 投影器在 CPU 上损坏** — [PR #18376](https://github.com/ollama/ollama/pull/18376) 强制将 MobileNetV5 投影器从 CPU 上移开，因为在 llama.cpp b10760 上它会静默产生损坏的图像嵌入（无报错，图像描述错误）。
- **1M 上下文启用** — [PR #18364](https://github.com/ollama/ollama/pull/18364) 在应用上下文滑块中添加了 512K/1M 选项；[PR #18365](https://github.com/ollama/ollama/pull/18365) 允许 Claude Desktop 通过 `supports_1m` / `max_input_tokens` 使用模型的完整上下文窗口。
- **Vulkan 后端** — 0.24.0 上报告了 AMD UMA APU runner 卡死问题（[#18370](https://github.com/ollama/ollama/issues/18370)）；尚无修复 PR。

## 4. 性能与优化
- **MLX 数组生命周期重构** — [PR #18327](https://github.com/ollama/ollama/pull/18327) 用作用域数组生命周期替代 pin-and-sweep 释放方式，修复了前缀缓存驱逐长时间存储路径时的累积问题。
- **前缀缓存驱逐** — [PR #18353](https://github.com/ollama/ollama/pull/18353) 允许驱逐活跃对话路径上的快照，解决了具有非 KV 快照状态的模型的无界增长问题。
- **MLX 调度器内存检查** — [PR #18345](https://github.com/ollama/ollama/pull/18345) 在加载前检查系统空闲内存并等待被驱逐的 runner，减少了因其他应用占用内存而导致的 OOM 压力。
- **GGUF 元数据缓存** — [PR #17858](https://github.com/ollama/ollama/pull/17858) 每个 blob 仅提取一次元数据到 `<OLLAMA_MODELS>/metadata/`，并统一了能力报告，降低了昂贵的重复操作成本。
- **加载回归报告** — [#18373](https://github.com/ollama/ollama/issues/18373) 报告自 0.23.4 以来模型加载显著变慢（在 `GPT-OSS:120b` 上观察到）；尚无修复 PR。

## 5. 稳定性与回归
按严重程度排序：

1. **CVE 暴露 — 开放** — [Issue #16033](https://github.com/ollama/ollama/issues/16033)：Go 二进制文件报告了 36 个漏洞（1 个严重、11 个高危、23 个中危）。未引用修复 PR。
2. **`ollama serve` 中的 FD 泄漏 — 开放** — [Issue #18344](https://github.com/ollama/ollama/issues/18344)：每个成功服务的 `/api/generate` 请求保留一个描述符；在持续负载下需要定期重启。
3. **Vulkan runner 卡死 — 开放** — [Issue #18370](https://github.com/ollama/ollama/issues/18370)：单线程固定在 100% CPU，GPU 空闲，生成永不完成，持续约 40 小时直到重启（AMD Strix Halo 级 UMA APU，0.24.0）。
4. **云流式传输失败现已暴露 — 已修复** — [PR #18351](https://github.com/ollama/ollama/pull/18351) 通过 `http.ErrAbortHandler` 传播非客户端流复制失败；修复了 [issue #18193](https://github.com/ollama/ollama/issues/18193) 中 `glm-5.3:cloud` 无限推理/中止的症状。
5. **macOS GUI 静默失败 — 开放** — [Issue #18368](https://github.com/ollama/ollama/issues/18368)：128K 上下文下聊天处理在约 6k token 后静默失败，GUI 无通知。
6. **低位量化损坏 — 开放** — [Issue #18252](https://github.com/ollama/ollama/issues/18252)：`qwen2.5-coder:3b-instruct` 的 q2_K/q3_K_S/q3_K_M/q3_K_L 在功能冒烟测试中得分 0/15，而同系列量化通过率 87–100%。
7. **工具调用解析正确性** — 混合：
   - 已修复：Gemma 4 `BEGIN_ARG` 解析包括格式错误的标记（[PR #18299](https://github.com/ollama/ollama/pull/18299)）；Gemma4 字符串占位符/数组冲突导致空 `content` 和 `tool_calls`（[PR #18366](https://github.com/ollama/ollama/pull/18366)）。
   - 开放：qwen3-coder 在省略开头 `<tool_call>` 标签时丢弃调用（[#16686](https://github.com/ollama/ollama/issues/16686)）；Anthropic `/v1/messages` 将复杂工具 schema 作为字面文本输出（[#18346](https://github.com/ollama/ollama/issues/18346)）；Gemma3n 通过 `/v1` 返回空 `tool_calls`（[#18357](https://github.com/ollama/ollama/issues/18357)）。
8. **模板变更 bug — 开放** — [PR #18367](https://github.com/ollama/ollama/pull/18367)：`Template.Execute` 会修改调用者的消息，导致重复渲染产生不同输出。
9. **杂项 — 开放** — `/api/codex/v1/responses` 502（[#18375](https://github.com/ollama/ollama/issues/18375)）；qwen2.5vl:3b 在 GPU 上使用一张特定 JPEG 时语法栈崩溃（[#18369](https://github.com/ollama/ollama/issues/18369)）；gemma4:12b 重复 `<unused50>` 帧且 EOF 时无 `done`（[#18359](https://github.com/ollama/ollama/issues/18359)）。

## 6. 对应用开发者的意义
- **工具调用仍然是方差最大的接口面。** 如果你在 Ollama 上构建 agent，请锁定已知良好的模型+量化组合，并针对你的具体模型系列验证解析器行为——Gemma 和 qwen3-coder 在本周期内都有已处理或未解决的解析缺陷。Anthropic 兼容客户端（Claude Code）尤其容易受到复杂 schema 失败的影响（[#18346](https://github.com/ollama/ollama/issues/18346)）。
- **避免使用 q2_K/q3_K Qwen2.5-Coder 3B 制品**，直到 [#18252](https://github.com/ollama/ollama/issues/18252) 解决；失败是静默的（输出流畅，任务成功率为零）。
- **如果服务请求量大，请在 supervisor 下运行 `ollama serve`**——FD 泄漏（[#18344](https://github.com/ollama/ollama/issues/18344)）会持续累积直到重启。
- **云响应现在快速失败。** 有了 [#18351](https://github.com/ollama/ollama/pull/18351)，客户端应预期中止的流而非截断但带 `done` 的响应——确保你的重试/错误处理明确处理 HTTP 中止。
- **上下文限制正迈向 1M。** 读取上下文上限的应用不应硬编码 256K；在 [PR #18364](https://github.com/ollama/ollama/pull/18364) 和 [PR #18365](https://github.com/ollama/ollama/pull/18365) 合入后，请消费 `max_input_tokens` / `supports_1m` 元数据。
- **将开放的 CVE 报告视为供应链行动项**（[#16033](https://github.com/ollama/ollama/issues/16033)）——在下一个版本发布前，追踪受影响的 Go 依赖在你的部署中是否可达。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-11

来源：[github.com/BerriAI/litellm](https://github.com/BerriAI/litellm)

## 1. 今日亮点

LiteLLM 发布了稳定版 **v1.100.1**，同时还有候选发布版 **v1.101.0-rc.2**，两者都延续了 commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中引入的 cosign 签名 Docker 镜像策略。当前推进中的最大工作流是协同进行的 OCR 后端扩展（Azure Document Intelligence、Azure Mistral、Vertex Mistral、Reducto v3/legacy），以 8 层堆栈的形式落地。可靠性方面，v1.100.0 的 retry-breadcrumb 内存泄漏新增了发布门禁回归测试，并且一个 spend-tracking sidecar PR 旨在将 spend 日志记录移出推理事件循环。

## 2. 发布与破坏性变更

- **v1.100.1**（稳定版）——通过 cosign 进行 Docker 镜像签名验证。[发布](https://github.com/BerriAI/litellm/releases)
- **v1.101.0-rc.2**——候选发布版；使用相同 cosign 签名密钥。[发布](https://github.com/BerriAI/litellm/releases)
- 此窗口期内没有显式的破坏性 API/配置变更。最近发布的代码带来的两个*事实上的*回归已在 PR 中指明（见 §5）：在 [#37228](https://github.com/BerriAI/litellm/pull/37228) 中添加的 `x-litellm-priority` 响应头会因非 Latin-1 优先级破坏 `/v1/messages`，而 v1.100.0 在失败请求上引入了 retry-breadcrumb 泄漏。

## 3. 新模型与硬件支持

此窗口期内没有新的 GPU/加速器后端或量化工作。提供商/接口面扩展：

- **Azure Document Intelligence** 适配器已添加到共享 Rust OCR facade，支持带认证的提交、有界轮询和规范化响应 — [#40534](https://github.com/BerriAI/litellm/pull/40534)。
- **Azure Mistral** OCR 适配器，以及有界远程文档获取 — [#40533](https://github.com/BerriAI/litellm/pull/40533)。
- **Vertex Mistral** OCR 适配器 — [#40507](https://github.com/BerriAI/litellm/pull/40507)。
- **Reducto** legacy + v3 OCR 适配器 — [#40535](https://github.com/BerriAI/litellm/pull/40535)。
- 对核心支持的提供商，**原生 OCR 经由核心路由** — [#40532](https://github.com/BerriAI/litellm/pull/40532)。
- **Vertex AI Search 向量存储**新增 HTTP/2 httpx 客户端路径 — [#40631](https://github.com/BerriAI/litellm/pull/40631)。
- 已请求但尚未落地：[Together AI 的 Kimi-K2.6](https://github.com/BerriAI/litellm/issues/27450)、[DeepSeek V4 Pro/Flash 分时定价](https://github.com/BerriAI/litellm/issues/37255)（被标记为过期数据）。

## 4. 性能与优化

- **流式 `mock_response` 的重复分词已移除** — mock 流式生成器现在会在准入时发出 usage chunk，而不是在流结束后重新对完整 prompt 分词。引用节省：在 50k–100k token 的请求体上，**每个请求节省 100–200 ms 的 Python 开销**。[#40637](https://github.com/BerriAI/litellm/pull/40637)
- **Spend 跟踪卸载到 Pod 本地 collector sidecar**（可选开启）— 将 `_PROXY_track_cost_callback` 和 `DBSpendUpdateWriter` 移出推理 worker 的事件循环；py-spy 显示它们会在慢 DB/Redis 上拖住请求路径。[#40545](https://github.com/BerriAI/litellm/pull/40545) *（已关闭）*
- **后台健康检查 DB 风暴修复** — 在 `use_shared_health_check: true` 下，`SharedHealthCheckManager` 不再每个周期把整个无界的 `LiteLLM_HealthCheckTable` 加载到每个 worker。[#37611](https://github.com/BerriAI/litellm/issues/37611) *（已关闭）*
- **预算重置任务扩展** — 现在按预算关联而非用户 ID 重置终端用户；此前，共享预算一旦超过 **约 32,700 个客户**，每次重置尝试都会回滚，并无限期阻塞这些客户。[#40639](https://github.com/BerriAI/litellm/pull/40639)
- **Vertex AI Search** 的并发多数据存储搜索不再因每请求的 HTTP/1.1 连接建立而排队。[#40631](https://github.com/BerriAI/litellm/pull/40631)

## 5. 稳定性与回归

按严重程度排序：

**严重**
- **v1.100.0 retry-breadcrumb 泄漏 → OOM。** 每次失败尝试都会复制整个请求；代理持续增长，直到被 OOM killer 杀死。新的 e2e 内存/大小回归测试已加入发布门禁。[#40640](https://github.com/BerriAI/litellm/pull/40640)
- **非 Latin-1 的 `x-litellm-priority` → `/v1/messages` 返回 HTTP 500。** 这是 #37228 引入的回归；提供商调用其实已经成功，因此客户会为一个 500 被计费。修复 PR 已开放。[#40636](https://github.com/BerriAI/litellm/pull/40636)
- **`max_parallel_requests` 计数器在 Anthropic 流式请求被取消时泄漏。** 当客户端在流中途取消 `/v1/messages` 时，Redis 计数器单调递增，最终会阻塞所有请求。仍开启，5 条评论。[#27955](https://github.com/BerriAI/litellm/issues/27955)
- **大规模下后台健康检查接近 OOM**（见 §4）。已关闭。[#37611](https://github.com/BerriAI/litellm/issues/37611)
- **Claude Code → vLLM 没有稳定路由路径。** `hosted_vllm` 会破坏 Anthropic Messages 流式；`anthropic` provider 路径也坏了。仍开启，热修复请求。[#30043](https://github.com/BerriAI/litellm/issues/30043)

**高**
- **升级到 1.88.0 后 `/metrics` 返回空** — Prometheus 抓取时发生 307 重定向。仍开启。[#30079](https://github.com/BerriAI/litellm/issues/30079)
- **流式 fallback 忽略 key 级别的 `router_settings`**，而非流式 fallback 工作正常。仍开启。[#25843](https://github.com/BerriAI/litellm/issues/25843)
- **当提供商主机离线时健康检查会硬失败**，而不是优雅失败。仍开启，12 条评论——该窗口内评论最多的 issue。[#34281](https://github.com/BerriAI/litellm/issues/34281)
- **MCP `/mcp` 端点将 `SERVER_ROOT_PATH` 前缀误读为作用域服务器名 → 返回 0 个工具。** 仍开启。[#32142](https://github.com/BerriAI/litellm/issues/32142)
- **复用 `x-litellm-call-id` 会静默丢弃 spend-log 行**（主键冲突）。仍开启。[#35563](https://github.com/BerriAI/litellm/issues/35563)
- **内置成本映射中不存在的自定义模型会把 spend 日志记为 $0**，即使 `usage.estimated_cost` 正确。仍开启。[#35691](https://github.com/BerriAI/litellm/issues/35691)
- **VLLM 的 `cached_tokens` 未在成本计算中处理。** 仍开启，5 👍。[#22984](https://github.com/BerriAI/litellm/issues/22984)
- **针对 LiteLLM 后端的 Claude Code 认证失败。** 仍开启。[#25427](https://github.com/BerriAI/litellm/issues/25427)

**中 / 已解决**
- Bedrock `post_call` guardrail 会缓冲整个 `/v1/messages` 流，因此 Claude Code 在生成完成前什么都不显示；非缓冲的可选开启项现在已在 Admin UI 中开放。[#40635](https://github.com/BerriAI/litellm/pull/40635)
- 自定义模型 / cache-control UI 开关在模型更新时不会持久化。[#40632](https://github.com/BerriAI/litellm/pull/40632)
- `/cursor/chat/completions` 返回 200 并向提供商计费，但不会创建 SpendLogs 条目。仍开启。[#30126](https://github.com/BerriAI/litellm/issues/30126)
- MCP OAuth：临时 OAuth 服务器未继承 `authorization_url` / `token_url`。**已关闭。** [#20495](https://github.com/BerriAI/litellm/issues/20495)
- 通过 `openai-agents` SDK 使用带 `reasoning_effort` 的 GPT-5.4 工具调用失败。**已关闭**，8 👍。[#23156](https://github.com/BerriAI/litellm/issues/23156)
- OpenAPI MCP `build_input_schema` 会从内联参数 schema 中丢弃 `items`/`enum`。**已关闭。** [#29715](https://github.com/BerriAI/litellm/issues/29715)
- `/v1/audio/transcriptions` 会将重复的 `known_speaker_references[]`/`known_speaker_names[]` 折叠为最后一个值，破坏 `gpt-4o-transcribe-diarize` 多说话人功能。**已关闭。** [#29766](https://github.com/BerriAI/litellm/issues/29766)
- Anthropic Messages 上 OTel `gen_ai.input.messages` 的 part-key 规范化不一致。**已关闭。** [#29756](https://github.com/BerriAI/litellm/issues/29756)
- 仪表盘认证的会话空闲超时仍不受支持。仍开启。[#28237](https://github.com/BerriAI/litellm/issues/28237)

## 6. 对应用开发者的意义

- **对有大量重试的工作负载，应将 v1.100.0 视为不安全**——retry-breadcrumb 复制泄漏会使代理内存增长至 OOM。如果你有激进的重试/回退配置，请锁定到 v1.100.1+，并在启用非 ASCII 团队/密钥优先级标签之前关注 [#40636](https://github.com/BerriAI/litellm/pull/40636) 的 priority-header 修复。
- **现在不要构建生产环境的 Claude Code → vLLM 路径。** `hosted_vllm` 和 `anthropic` 路由都有已知的流式/正确性失败（[#30043](https://github.com/BerriAI/litellm/issues/30043)、[#27955](https://github.com/BerriAI/litellm/issues/27955)）。被取消的流是特定危险——Redis 并发计数器从不递减，因此单个频繁取消生成请求的用户最终可能让整个 key 被 429。
- **流式 fallback 并不等同于非流式 fallback。** 如果你的 key 级别 `router_settings` fallback 是你的可靠性方案，那么在 [#25843](https://github.com/BerriAI/litellm/issues/25843) 落地之前，不要对流式调用方依赖它们。
- **Spend/计费准确性存在多个未解决的漏洞：** 不在内置成本映射中的自定义模型会记为 $0（[#35691](https://github.com/BerriAI/litellm/issues/35691)），复用 `x-litellm-call-id` 会丢行（[#35563](https://github.com/BerriAI/litellm/issues/35563)），而 Cursor 流量完全没有记录（[#30126](https://github.com/BerriAI/litellm/issues/30126)）。不要将 LiteLLM spend 日志作为自定义或代理路由的唯一计费来源。
- **OCR 正在成为一等接口面。** 如果你在构建文档摄入 agent，Azure Document Intelligence / Azure Mistral / Vertex Mistral / Reducto 适配器加上核心路由的原生 OCR（[#40534](https://github.com/BerriAI/litellm/pull/40534)、[#40533](https://github.com/BerriAI/litellm/pull/40533)、[#40507](https://github.com/BerriAI/litellm/pull/40507)、[#40535](https://github.com/BerriAI/litellm/pull/40535)、[#40532](https://github.com/BerriAI/litellm/pull/40532)）将 OCR 整合为一个 `/v1/ocr` 契约，并具备有界远程文档获取和可信凭据来源。
- **如果你在 CI 中使用 mock/录制响应，可获得延迟收益：** 准入时 usage chunk 在大型 prompt 上每个请求节省 100–200 ms（[#40637](https://github.com/BerriAI/litellm/pull/40637)）。
- **Guardrails 扩展：** ConductGuard 作为一等调用前策略检查落地（[#38143](https://github.com/BerriAI/litellm/pull/38143)）；NeMo Guardrails 支持仍然只是一个请求（[#25255](https://github.com/BerriAI/litellm/issues/25255)，11 👍）。
- **Agent 可观测性：** auto-router 现在可以在 Claude Code 和 Codex 状态行中显示路由到的模型和会话节省（[#40330](https://github.com/BerriAI/litellm/pull/40330)）——如果你要量化每个开发者会话的路由成本降低，这很有用。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要 — 2026-09-11

## 1. 今日亮点
过去 24 小时内没有带标签的 Unsloth 版本发布。主要活动是 Studio/推理优化：用于图像和视频流水线的 NVFP4/FP8/INT8 快速路径、MLX MoE/解码融合，以及 offload 规划器重构。长上下文 agent 工作负载仍然容易受到全上下文重新处理/prefill 回归的影响，而一个严重的非 NVLink CUDA P2P 输出损坏问题已被关闭。

## 2. 发布与破坏性变更
- **没有新发布，也没有记录在案的破坏性 API/配置变更。**
- 值得跟踪的进行中行为变更：共享 Studio 安装的按账户隔离（[#10588](https://github.com/unslothai/unsloth/pull/10588)），以及通过 `UNSLOTH_SMART_OFFLOAD` 启用的环境变量门控智能 offload 规划（[#9872](https://github.com/unslothai/unsloth/pull/9872)）。

## 3. 新模型与硬件支持
- **Dense 图像模型快速路径：** 官方 BF16 图像模型现在可在受支持的 GPU 上使用 Studio 的 FP8 或 INT8 路径；文件保持 BF16，并在内存中转换（[#10697](https://github.com/unslothai/unsloth/pull/10697)）。
- **NVFP4 视频系列：** 为 Wan2.2-TI2V-5B、Wan2.2-T2V-A14B 和 HunyuanVideo-1.5 480p/720p 提供整模型 NVFP4，并附带托管的预量化去噪器（[#10729](https://github.com/unslothai/unsloth/pull/10729)）。
- **NVFP4 图像策略：** 逐层 NVFP4 图像 DiT 策略、flashinfer FP4 后端、GPTQ 构建器，以及门控自动选择（[#10730](https://github.com/unslothai/unsloth/pull/10730)）；针对设备保护、屏障、偏置路径和缓存调度的内核后续改进（[#10731](https://github.com/unslothai/unsloth/pull/10731)）。
- **Apple Silicon / MLX：** 可选的 MLX MoE gate/up 融合和循环解码融合已集成到 Studio（[#10733](https://github.com/unslothai/unsloth/pull/10733)）。
- **bitsandbytes 后端：** 使用实时 PyTorch 加速器流进行原生反量化和 GEMV/GEMM 调用（[#10745](https://github.com/unslothai/unsloth/pull/10745)）。
- **已关闭的硬件报告：** DGX Spark 更新后无 GPU（[#10691](https://github.com/unslothai/unsloth/issues/10691)）、DGX Spark 图像生成内存拒绝（[#9919](https://github.com/unslothai/unsloth/issues/9919)），以及 AMD 6950 XT 支持咨询（[#10468](https://github.com/unslothai/unsloth/issues/10468)）。

## 4. 性能与优化
- **B200 LoRA SFT：** 实验性 Qwen3.5-9B LoRA 运行报告称，8 项变更带来 **step 提速 1.28 倍**；包含可供仓库借鉴的加速经验（[#10744](https://github.com/unslothai/unsloth/pull/10744)）。
- **智能 offload 规划器：** 将 spill 决策与 llama.cpp 自身的 fitter 进行权衡，具备 sub-FFN spill 阶梯、上下文感知的设备预留和启动排序；受 `UNSLOTH_SMART_OFFLOAD` 门控（[#9872](https://github.com/unslothai/unsloth/pull/9872)）。
- **Studio 更新延迟：** 当标记匹配时，避免重新验证 llama.cpp、whisper.cpp 和 Node 安装，在 **macOS 上节省 13–63 秒**，在 **Windows 上节省约 5 秒**（[#10648](https://github.com/unslothai/unsloth/pull/10648)）。
- **安装缓存复用：** POSIX uv 缓存选择器可以看到已预热的共享缓存（[#10647](https://github.com/unslothai/unsloth/pull/10647)）；复用上一次运行安装的 uv，而不是重新下载（[#10659](https://github.com/unslothai/unsloth/pull/10659)）。
- **Agent 启动：** 经过认证的常驻模型端点避免等待完整的本地/媒体目录扫描和 30 秒 HTTP 超时（[#10728](https://github.com/unslothai/unsloth/pull/10728)）。
- **数据准备：** 不要向完整大小的 mid-stride chunk 追加 EOS，修复了 chunk 边界处的训练数据损坏（[#10734](https://github.com/unslothai/unsloth/pull/10734)）。
- **需要关注的延迟回归：** 模型重新加载后的完整 prefill（[#9037](https://github.com/unslothai/unsloth/issues/9037)），以及每次工具调用后的全上下文重新处理（[#10698](https://github.com/unslothai/unsloth/issues/10698)）。

## 5. 稳定性与回归
**严重 / 正确性**
- **已关闭：** 在 RTX 6000 Ada、RTX PRO 6000、L40/L40S 和 L4 等非 NVLink GPU 上设置了 `GGML_CUDA_P2P=1`，会静默损坏模型输出（[#10613](https://github.com/unslothai/unsloth/issues/10613)）。请检查多 GPU 主机上的环境变量覆盖。

**高**
- **未解决：** 长 Qwen3.8 GGUF 对话在模型重新加载后丢失可复用的 prompt 状态，导致 **约 11 分钟的完整 prefill**（[#9037](https://github.com/unslothai/unsloth/issues/9037)）。
- **未解决回归：** 每次工具调用后，整个上下文都会被缓慢地重新处理；在 30k token 时，这会增加数分钟延迟（[#10698](https://github.com/unslothai/unsloth/issues/10698)）。
- **未解决：** diffusion 流水线在每次生成后卸载模型，并且部分路径缺少 LoRA 支持（[#10716](https://github.com/unslothai/unsloth/issues/10716)）。
- **未解决：** `--tensor-split` 被忽略，影响多 GPU 分区（[#10355](https://github.com/unslothai/unsloth/issues/10355)）。
- **未解决：** Studio 中 CPU 占用持续偏高（[#10390](https://github.com/unslothai/unsloth/issues/10390)）。

**中**
- **未解决：** Windows 上 `unsloth start codex` 失败，报错 `stdout is not a terminal`（[#10699](https://github.com/unslothai/unsloth/issues/10699)）。
- **未解决，已有修复：** 当用户配置文件路径包含空格时，Windows/PowerShell 安装程序失败（[#10722](https://github.com/unslothai/unsloth/issues/10722)）；修复 PR（[#10765](https://github.com/unslothai/unsloth/pull/10765)）。
- **未解决：** Data Recipe 错误地报告所有列均被丢弃（[#10738](https://github.com/unslothai/unsloth/issues/10738)）。
- **未解决：** Android 浏览器网络丢失时，在离开浏览器后会停止生成（[#10739](https://github.com/unslothai/unsloth/issues/10739)）。
- **未解决 UX：** Studio 图像生成缺少直观控件（[#10695](https://github.com/unslothai/unsloth/issues/10695)）；Studio Hub 将缓存的 diffusion 资产与不完整的 base-model 下载混为一谈（[#10696](https://github.com/unslothai/unsloth/issues/10696)）。
- **已关闭：** Studio PDF 上传会拒绝扫描件或遗漏纯图像页面（[#10619](https://github.com/unslothai/unsloth/issues/10619)）；每次 Studio 运行时 CLI API key 都会变动（[#10595](https://github.com/unslothai/unsloth/issues/10595)）。

## 6. 这对应用开发者意味着什么
- **长上下文 agent：** 不要假设 prompt/KV 复用能在模型重新加载或工具调用后仍然有效。除非 [#9037](https://github.com/unslothai/unsloth/issues/9037) 和 [#10698](https://github.com/unslothai/unsloth/issues/10698) 得到解决，否则应按完整 prefill 做预算。滚动上下文/压缩请求 [#7472](https://github.com/unslothai/unsloth/issues/7472) 仍然相关。
- **多 GPU 推理：** 审计非 NVLink 显卡上的 `GGML_CUDA_P2P`；严重的输出损坏问题已关闭（[#10613](https://github.com/unslothai/unsloth/issues/10613)），但 `--tensor-split` 被忽略的问题仍未解决（[#10355](https://github.com/unslothai/unsloth/issues/10355)）。
- **量化/推理部署：** NVFP4/FP8/INT8 路径正在扩展到图像和视频工作负载（[#10697](https://github.com/unslothai/unsloth/pull/10697)、[#10730](https://github.com/unslothai/unsloth/pull/10730)、[#10729](https://github.com/unslothai/unsloth/pull/10729)）。在推广前针对目标 GPU 系列进行测试。Apple Silicon 用户应关注 MLX MoE/解码集成（[#10733](https://github.com/unslothai/unsloth/pull/10733)）。
- **微调/训练：** B200 LoRA 用户可以评估 1.28 倍的 step 改进（[#10744](https://github.com/unslothai/unsloth/pull/10744)）；数据准备人员应采纳 EOS chunk 边界修复（[#10734](https://github.com/unslothai/unsloth/pull/10734)）。
- **Studio/桌面端：** Windows 安装程序空格路径修复（[#10765](https://github.com/unslothai/unsloth/pull/10765)），以及顶层 Models 分组（[#10736](https://github.com/unslothai/unsloth/pull/10736)）、实时数据集预览（[#10737](https://github.com/unslothai/unsloth/pull/10737)）、有意义的下载文件名（[#10727](https://github.com/unslothai/unsloth/pull/10727)）等 UI 改进正在进行中。请求的功能包括数据集下载（[#10637](https://github.com/unslothai/unsloth/issues/10637)）、URL 查询参数（[#10764](https://github.com/unslothai/unsloth/issues/10764)）、macOS 菜单栏开关（[#10157](https://github.com/unslothai/unsloth/issues/10157)），以及 RTL/BiDi 聊天渲染（[#8912](https://github.com/unslothai/unsloth/issues/8912)）。
- **升级卫生：** 没有发布意味着这些只是 PR/issue，并非已交付的保证。请将环境变量门控变更和量化后端视为测试候选，而不是生产默认值。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*