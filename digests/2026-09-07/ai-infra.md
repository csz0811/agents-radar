# AI 基础设施日报 2026-09-07

> 生成时间: 2026-09-06 22:45 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 跨项目 AI 基础设施对比报告——2026-09-07

## 1. 生态概览

整个生态正处于功能发布间歇期，并深度处于可靠性修复周期中。vLLM 和 SGLang 在 24 小时内没有发布任何版本；llama.cpp 发布了 7 个构建版本；网关层（LiteLLM）发布了两个版本；Ollama 发布了一个 RC。重心已不再是原始吞吐量——当天最严重的故障是**量化稀疏注意力和混合 Mamba/注意力模型的静默正确性故障**（Qwen3.8-Flash-Next、DeepSeek-V4、GLM-5.3、MiniMax-M3 在所有技术栈中反复出现）。前缀缓存尚未对稀疏/混合架构做到几何安全，即使在完全相同的提示词下也会产生零缓存复用或内存故障。硬件碎片化（Blackwell SM120/SM121、GB10/DGX Spark、ROCm/MI355X、RDNA4、Apple silicon）继续迫使各平台分别进行后端与内核验证。整体氛围是「已知良好配置优先于新功能」。

## 2. 活动对比

计数反映的是 24 小时摘要中提及的 issue/PR，而非仓库完整总数。发布状态表示在该时间窗口内打出的标签。

| 项目 | Issue 提及数 | PR 提及数 | 发布（24h） |
|---|---|---|---|
| vLLM | ~15 | ~17 | 无 |
| SGLang | ~18 | ~14 | 无 |
| llama.cpp | ~9 | ~18 | 7 个构建版本（b10821–b10828） |
| Ollama | ~15 | 4 | v0.34.0-rc1 |
| LiteLLM | ~16 | ~14 | v1.100.0、v1.101.0-rc.1 |
| Unsloth | ~5 | ~20 | 无 |

**解读：** llama.cpp 的发布节奏最快，而且正在持续交付代码；vLLM/SGLang 的 issue 负载最高，正在消化正确性修复工作，但尚未发布版本。LiteLLM 的活动分散在预算核算 bug 报告和大量 PR 队列之间。Unsloth 的情况很特殊：issue 很少，PR 吞吐量却极高（约 20 个），几乎全部是在加固其 Studio/llama.cpp 集成，而不是它为人熟知的训练内核工作。

## 3. 模型支持竞赛

| 项目 | 模型 / 架构信号 | 状态 |
|---|---|---|
| llama.cpp | **Spark2_5ForCausalLM** 端到端（GGUF 转换 + 推理） | **已在 b10828 中发布**——目前架构支持落地最快的项目 |
| llama.cpp | HrmTextForCausalLM / Mimir 1B、分片 mmproj | 开放中的 PR |
| vLLM | Qwen3.8-Flash-Next FP8（QSA） | 已支持；稀疏边界处存在贪心解码不确定性 |
| vLLM | GB10/SM121 上的 DeepseekV4 | 被未加防护的 DeepGEMM 阻塞；修复正在评审中 |
| SGLang | DGX Spark 上的 Qwen3.8-Flash-Next NVFP4 | Cookbook + FP4 GEMM 默认 PR |
| SGLang | DGX Spark 上的 MiniMax-M3 W4A16 | **损坏**——输出全为 NUL token；相同权重在 vLLM 上可正常运行 |
| SGLang | DeepSeek-V4 长上下文 prefill | DSA top-k 内核 IMA 故障 |
| Ollama | spark2_5 原生支持 | 待定；模型可下载但无法启动 |
| LiteLLM | Standard Compute、The Grid 服务商 | 已新增——属于服务商广度扩展，而非模型内核 |

**谁领先：** llama.cpp 在架构覆盖广度和合并速度上领先——它用了不到 24 小时就把一个新架构从 PR 推进到了发布二进制。在服务引擎中，vLLM 和 SGLang 都没有对前沿模型实现干净的支持。vLLM 在 Qwen 系列/MiniMax 这一类模型的正确性上领先（MiniMax-M3 在 vLLM 上可运行，而在 SGLang 上失败）；SGLang 则在*经过验证的方案*（NVFP4 + DGX Spark/RTX PRO cookbook）和前沿 FP4 内核选择上领先。Ollama 在结构上是跟随者，因为它的架构支持直接继承自 llama.cpp。

## 4. 性能前沿

**KV 缓存与前缀复用**是目前最热门的优化面。vLLM 正在修复混合 Mamba 前缀缓存几何问题（越界读取、错误的块大小），并且在 DFlash2+YaRN 以及 MTP 首次重复场景下，对完全相同的 1.04M token 提示词仍然存在前缀零复用。SGLang 正在把基数哈希收集改造为迭代式遍历，并缩小 B300 上 1.96% 的统一内存解码差距。llama.cpp 诊断出 `--kv-unified` 下提示词处理性能下降 42–54%；Ollama 的 MLX 缓存恢复时截断为 8192 token 的整数倍，导致每轮 agent 交互要多付出 17–27 秒的重新 prefill 成本。

**量化内核工作**集中在 Blackwell FP4/FP8 与混合稀疏路径上：SGLang 正在将 FlashInfer NVFP4 `b12x` 设为 SM120 的默认 GEMM；vLLM 正在调查 FP8 稀疏注意力的不确定性问题；llama.cpp 修复了 OpenCL 中 `q4_K`/`q5_K` 的权重打包选择。Unsloth 为 RTX 5090/DGX Spark 启动了 NVFP4 + 低秩修正基准测试。

**分布式推理服务**优化针对动态 MoE 拓扑：带 CUDA graph 重新捕获的弹性 EP（SGLang）、移除 MRV2 回退以使弹性 EP 可在 Model Runner V2 上工作（vLLM）、延迟 PP 阶段上的 NCCL 样本接收，以及在 SGLang 的 mxfp4 路径中保留 FP32 MoE 路由权重。

**NVIDIA 之外的内核调优**：MI355X 上的 ROCm/DSA 融合（SGLang）、AMD 上的 FlashAttention MLA + AITER FA 覆盖（vLLM）、RDNA4 warp 数量与 LDS bank 冲突修复、面向 M2 Max 的 Metal `fa-vec` 调优，以及 llama.cpp 通过 lazy-PLE 直接读取使 qwen4exp 在 GB10 上实现 **>2× prefill** 的说法。

**投机解码**是一个跨领域的可靠性问题：MTP 首次重复缓存未命中（vLLM）、NEXTN 接受率随运行时间增长衰减至约 0（SGLang），以及量化目标上的投机发散（llama.cpp）。

**Agent 工作负载缓存**正成为一个竞争性领域：vLLM 的 early-UUID 媒体缓存快速路径（每次重复多模态请求可节省数百毫秒）、llama.cpp 在用户回合边界放置检查点，以及针对 `n>1` 并行采样的父级指标。

## 5. 层级定位

| 项目 | 层级 | 角色 | 典型部署 |
|---|---|---|---|
| vLLM | 生产级服务引擎 | Paged KV、CUDA graph、TP/PP/EP/CP、投机解码、兼容 OpenAI 的 API | 多 GPU 生产推理（H100/B200/GB10） |
| SGLang | 生产级服务引擎 | 基数前缀缓存、DCP、弹性 EP、原生稀疏注意力调优 | 多 GPU 生产推理；Blackwell/ROCm 调优能力强 |
| llama.cpp | 可嵌入的本地运行时 | 跨 CPU/Metal/Vulkan/OpenCL/CUDA 的 GGUF 推理；绑定生态 | 边缘、桌面、嵌入式；llama-server |
| Ollama | 本地优先的产品层 | 模型分发、桌面应用、云模型代理；封装 llama.cpp | 开发者笔记本、本地 agent/助手使用 |
| LiteLLM | 控制面网关 | 路由、预算、费用核算、认证、服务商翻译 | 位于众多模型后端之前的代理 |
| Unsloth | 训练/微调 + Studio 运行时 | QLoRA 效率优化；Studio 是产品化的 llama.cpp 服务端，具备 agent/回合语义 | 微调工作站；桌面 agent 推理服务 |

**值得关注的交叉区域：** Ollama 和 Unsloth Studio 都封装了 llama.cpp，但面向的是不同用户——Ollama 做通用本地推理；Unsloth Studio 面向 agent/语音工作流，会话语义更强（按账户隔离、在工具调用回合设置检查点）。vLLM 和 SGLang 在生产级推理服务上仍是直接替代关系；当下的市场信号是，两者在最新的稀疏注意力模型上都没有决定性的正确性优势。

## 6. 趋势信号

1. **稀疏注意力与混合模型首次成为贯穿每一层级的引擎不稳定主要来源。** Qwen3.8-Flash-Next、DeepSeek-V4、GLM-5.3 与 MiniMax-M3 在每一个为其提供服务的项目中都会触发不确定性、非法内存访问、全 NUL 输出或前缀缓存几何故障。复杂性已从注意力内核转移到*边界层*：稀疏索引器预算、混合 Mamba/注意力块的几何结构，以及投机草稿之间的交互。

2. **静默故障多于崩溃，而且集中在量化 × 投机解码的组合上。** 各摘要中排名靠前的稳定性问题大多是在破坏输出，而不是杀死进程：QSA 预算边界附近的贪心解码不确定性（`#54521`）、TurboQuant k8v4 + MTP 生成退化文本（`#53180`）、MiniMax-M3 输出 token-0（全 NUL）、Unsloth 在请求取消后发生跨请求响应泄漏（`#10388`），以及 LiteLLM 误报预算不足的 429（`#40050`）。Agent/应用开发者需要输出校验和 token ID 异常监控，而不仅仅是错误率仪表盘。

3. **前缀缓存是新的吞吐量战场，而混合模型正在让它失灵。** 相同提示词得到零缓存复用在 vLLM 上仍是未关闭的 bug；MTP 首次重复时完全错过缓存；llama.cpp 的统一 KV 在第二次请求时吞吐量崩溃；Ollama 的 MLX 将缓存截断到 8192 token。对于重复请求/agent 工作负载，在几何感知的前缀缓存落地之前，请为混合模型的完整重新 prefill 预留预算。

4. **Agent 工作负载语义正在拉动基础设施层面的改动。** 缓存正在围绕回合边界（llama.cpp 检查点、Ollama 渲染器分隔符）、媒体缓存快速路径（vLLM early-UUID）和父级请求指标重新设计——需求侧是 Claude Code 风格的本地循环，供给侧也在相应跟进。

5. **可观测性与供应链加固正在被提到更高的路线图优先级。** Ollama 的 Prometheus `/metrics` 端点正在评审中；llama.cpp 发布了 `--log-jsonl`；LiteLLM 增加了以 Rust/Python 回调性能为门禁的 CI 基准测试和 cosign 签名镜像；Unsloth 正在用一次性设置令牌取代预设管理密码。运维信任的重要性正在超越原始功能开发。

6. **Blackwell 消费级/边缘 SKU（SM120/SM121）依然是跨项目的高风险地带。** llama.cpp 在搭载 RTX 5090 的笔记本上出现 CUDA graph GPU 挂起；vLLM 在 RTX PRO 5000 上遇到 FP8 负载下的 Xid 13 非法内存访问；SGLang 存在未解决的 SM120 DSA 阻塞问题和 DGX Spark 上的 MiniMax-M3 失败。每个引擎都在并行推进 SM120 内核工作，但没有任何一个项目宣布其已稳定——请谨慎锁定内核或 GPU 型号。

**给决策者的结论：** 不要指望升级到最新的稀疏注意力模型或 Blackwell 消费级 GPU 后，贪心解码确定性和缓存复用就能自动正常工作。请固定已知良好的引擎版本，在任何升级后运行批量不变性和 token ID 健全性检查，并把静默的错误输出 bug——而非崩溃——视为本季度最主要的生产风险。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-07

## 今日要点

过去 24 小时内没有发布新版本；社区活动主要集中在正确性和确定性方面。讨论最多的问题是 **Qwen3.8-Flash-Next FP8 上的贪婪解码非确定性 bug**——只有在长提示词跨过 QSA `indexer_budget` 边界时才会出现（[#54521](https://github.com/vllm-project/vllm/issues/54521)）；此外还有几个把量化、MTP 推测解码和混合 Mamba/GDN 架构结合在一起的正确性 bug（[#53180](https://github.com/vllm-project/vllm/issues/53180)）。PR 方面，一批修复聚焦于 **混合 Mamba 前缀缓存几何**（[#54076](https://github.com/vllm-project/vllm/pull/54076)、[#55601](https://github.com/vllm-project/vllm/pull/55601)）以及 CUDA graph 捕获时 FlashInfer MoE 自动调优问题（[#55377](https://github.com/vllm-project/vllm/pull/55377)）。

## 发布与破坏性变更

无。过去 24 小时内没有发布正式版或候选版标签。

## 新模型与硬件支持

- **Qwen3.8-Flash-Next FP8** 目前是重点 QA 对象（[#54521](https://github.com/vllm-project/vllm/issues/54521)）；该模型已受支持，但存在稀疏注意力确定性问题（见“稳定性与回归问题”）。
- **ROCm / AMD** — [PR #55611](https://github.com/vllm-project/vllm/pull/55611) 提议增加 CI 覆盖以验证 `ROCM_AITER_FA` 和 FlashAttention MLA prefill 后端；针对 `vecMatMul_kernel` 的 LDS bank 冲突修复则面向 RDNA4（[PR #41187](https://github.com/vllm-project/vllm/pull/41187)）。
- **Blackwell / SM121** — DeepseekV4 在 GB10 上的启动被 `mhc_pre_broadcast` 中未加保护的 DeepGEMM 选择逻辑阻断；[PR #53055](https://github.com/vllm-project/vllm/pull/53055) 提议引入 TileLang 回退方案。
- **AMD 上的 MXFP8** 仍然是稠密/MoE GEMM 和分组 GEMM kernel 的开放功能请求（[#34012](https://github.com/vllm-project/vllm/issues/34012)）。
- **Helion 线性后端** — 一份 RFC 提议增加一个 PyTorch 原生、与硬件无关的 kernel DSL 后端，作为替代线性路径（[#46526](https://github.com/vllm-project/vllm/issues/46526)）。
- **Transformers v5 迁移** — ColQwen3 多模态池化测试已准备好取消跳过（[PR #55588](https://github.com/vllm-project/vllm/pull/55588)）。
- **Model Runner V2 上的弹性 EP** — 该 PR 移除了 MRV2 的“不支持特性”阻塞逻辑，使弹性专家并行在 MRV2 成为默认后不会被迫回退到 MRV1（[PR #53934](https://github.com/vllm-project/vllm/pull/53934)）。

## 性能与优化

- **Kimi-K3 MoE decode 在 CUDA graph 捕获前自动调优** — [PR #55377](https://github.com/vllm-project/vllm/pull/55377) 单独提取了一个修复：FlashInfer 延迟 MoE decode kernel 在 graph 捕获期间缺少自动调优条目，而这会导致缓存未命中停顿。
- **多模态缓存命中时跳过媒体解码** — [PR #55583](https://github.com/vllm-project/vllm/pull/55583) 增加了可选的 `VLLM_EARLY_UUID_LOOKUPS`：UUID 缓存命中时，会在视频/图片加载和解码之前跳过 URL，为每个请求节省数百毫秒。
- **流水线并行下采样结果的延迟优化** — [PR #53948](https://github.com/vllm-project/vllm/pull/53948) 将非最后 PP 阶段的采样结果 NCCL 接收推迟到调度器步骤真正消费这些结果时。
- **KV offload 分组作用域** — [PR #54743](https://github.com/vllm-project/vllm/pull/54743) 将 offload-group 配置限定在可做前缀缓存的 KV cache 分组内，避免混合缓存模型中出现过宽的断言/内存分配。
- **增量式 MoE 专家卸载** — RFC [#38256](https://github.com/vllm-project/vllm/issues/38256) 仍在开放中：将专家权重固定在 CPU 内存中，配合 GPU 上的热专家缓存（LFRU 淘汰、跨层预测），从而运行超出 VRAM 容量的模型。
- **混合模型上的前缀缓存缺口** 正在造成实际吞吐损失：DFlash2 + YaRN 在完全相同的 1.04M token 提示词上获得**零**前缀复用（[#54094](https://github.com/vllm-project/vllm/issues/54094)），而 Mamba/GDN 模型上的 MTP 首次重复请求会完全错过缓存（[#53504](https://github.com/vllm-project/vllm/issues/53504)）。

## 稳定性与回归问题

按严重程度大致排序；如有修复 PR 会一并注明。

1. **温度为 0 时的静默非确定性——Qwen3.8-Flash-Next FP8（QSA）。** 当提示词长度接近 `indexer_budget`（Qwen 稀疏注意力从稠密 prefill 切换为持久化 top-k prefill 的临界点）时，五个字节完全相同的贪婪请求产生不同输出。讨论非常活跃（[#54521](https://github.com/vllm-project/vllm/issues/54521)）；目前尚无修复 PR。
2. **静默劣化输出——TurboQuant k8v4 + MTP 在混合 GDN 模型上。** 官方 v0.27.1 在 Ada 硬件上会无报错地产生劣化文本（[#53180](https://github.com/vllm-project/vllm/issues/53180)）；目前尚无修复 PR。请避免在生产环境使用该组合。
3. **持续负载下 SM120 上 FP8 的 CUDA 非法内存访问。** RTX PRO 5000 / Blackwell 上出现 `Xid 13`；规避方案是设置 `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` 或使用 `--enforce-eager`。刚提交，仍开放（[#55571](https://github.com/vllm-project/vllm/issues/55571)）。
4. **Kimi-K3 在 Hopper/SM90a 上的 CUDA graph 失败。** KDA 投影重叠生成了需要 SM100+ 的 PTX 指令，导致 graph 分析期间崩溃。修复评审中：[PR #55426](https://github.com/vllm-project/vllm/pull/55426)。
5. **混合 Mamba 上的前缀缓存正确性问题。** DFlash2 + YaRN 长提示词重复运行出现零前缀复用（[#54094](https://github.com/vllm-project/vllm/issues/54094)）；当注意力组的 block size 小于 `mamba_block_size` 时，前缀缓存命中可能发生越界读取，已由 [PR #55601](https://github.com/vllm-project/vllm/pull/55601) 修复；align 模式分块使用了错误的 block size，已由 [PR #54076](https://github.com/vllm-project/vllm/pull/54076) 修复。
6. **混合 Mamba/GDN 上 MTP 首次重复的前缀缓存未命中** —— 第一次重复需要完整重新 prefill，从第二次重复起才能复用缓存（[#53504](https://github.com/vllm-project/vllm/issues/53504)）。
7. **AMD GPU–CPU KV 传输故障导致引擎崩溃。** `swap_blocks_batch` 中的同步 `hipSuccess` 检查在发生设备错误时会导致整个引擎宕掉；[PR #52838](https://github.com/vllm-project/vllm/pull/52838) 提议改为降级缓存而不是崩溃。
8. **TRT-LLM 8x4 FP4 缩放系数填充未清零。** [PR #47587](https://github.com/vllm-project/vllm/pull/47587)（解决 #37563）中的修复用于避免读取 FlashInfer NVFP4 8x4 布局中未初始化的缩放系数填充。
9. **优先级队列的抢占重入队 bug。** 被抢占的请求可能乱序重新插入，因为 `Request.__lt__` 未包含 `num_preemptions`；修复见 [PR #51574](https://github.com/vllm-project/vllm/pull/51574)（解决 #41951）。
10. **多节点启动死锁（gloo barrier）——Ray executor 在 2×TP-16 规模下。** 已关闭——这是开发构建之间的回归问题，现已解决（[#52907](https://github.com/vllm-project/vllm/issues/52907)）。

另外值得注意的是：批量无关性/确定性测试覆盖正在扩展到 **chunked prefill**（[PR #55612](https://github.com/vllm-project/vllm/pull/55612)）——这是高负载服务器持续运行的调度器路径——它应该能捕获一类与负载相关的非确定性问题。

## 对应用开发者的影响

- **不要假设 Qwen3-Next / Qwen3.8-Flash / 稀疏注意力模型在稀疏注意力预算边界附近具有贪婪确定性**，即使 `temperature=0` 也不例外（[#54521](https://github.com/vllm-project/vllm/issues/54521)）。如果你跨请求缓存或比较输出，请在修复落地后固定版本，并使用长上下文进行验证。
- **量化 × 推测解码组合需要显式冒烟测试。** TurboQuant k8v4 + MTP 在混合 GDN 模型上可能无提示地失败（[#53180](https://github.com/vllm-project/vllm/issues/53180)）；这是当前队列中最危险的故障模式，因为它不会抛出任何错误。
- **混合 Mamba/注意力模型上的重复请求延迟可能异常糟糕。** 相同的提示词可能在第一次重复时出现零前缀缓存复用（MTP），甚至完全无法复用（DFlash2+YaRN）（[#53504](https://github.com/vllm-project/vllm/issues/53504)、[#54094](https://github.com/vllm-project/vllm/issues/54094)）；在这些问题修复前，SLA 规划中要为完整重新 prefill 预留预算。
- **带 Multi-LoRA 的分类/池化头仍不受支持** —— 多个开放讨论线程（[#19623](https://github.com/vllm-project/vllm/issues/19623)、[#12829](https://github.com/vllm-project/vllm/issues/12829)、[#23719](https://github.com/vllm-project/vllm/issues/23719)）。暂时不要基于 vLLM 规划多租户分类服务。
- **并行采样指标即将到来** —— 为 `n > 1` 请求增加父级请求指标，使服务端 token 统计与客户端实际收到的内容一致（[PR #55594](https://github.com/vllm-project/vllm/pull/55594)）。
- **DPR：重媒体多模态应用将获得早期 UUID 缓存快速路径**（[PR #55583](https://github.com/vllm-project/vllm/pull/55583)）——如果你通过 `/inference/*` 路由服务重复的视频/图片 URL，这会很有用。

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 文摘 — 2026-09-07

## 1. 今日亮点

过去 24 小时没有发布任何 release；本期动态主要由 GLM‑5.3‑Flash 稳定性问题群，以及 Blackwell SM120、ROCm/DSA、Apple silicon、T‑Head PPU 的平台适配 PR 构成。MiniMax‑M3 在 DGX Spark 上、DeepSeek‑V4 长上下文 prefill 的新正确性报告，将会影响已经部署这些模型的用户。目前有多项针对性修复正在推进中或已经关闭，涉及 FP4 GEMM 选择、fp32 MoE 路由权重、CP 分片及迭代式 radix-hash 收集。

## 2. 版本发布与破坏性变更

无。过去 24 小时内没有创建 tag，也没有发布 release 或迁移说明。

## 3. 新模型与硬件支持

- **T‑Head PPU 路线图** — [#37519](https://github.com/sgl-project/sglang/issues/37519) 提议将 ZW810 / ZW810E / ZW‑M890P 作为一等公民支持。
- **Apple Silicon** — 路线图 [#19137](https://github.com/sgl-project/sglang/issues/19137) 仍未关闭；重新设计的提案 [#32321](https://github.com/sgl-project/sglang/issues/32321) 描述了一条由 Torch 持有的 SRT 路径，并包含一个导出的全模型 MLX 区域。
- **Mamba 1/2 推理** — 开放的 PR [#34556](https://github.com/sgl-project/sglang/pull/34556) 增加了对 Mamba 2 和 Mamba 1 的支持。
- **FlashInfer prefill 上下文并行** — [#33226](https://github.com/sgl-project/sglang/pull/33226) 为 FlashInfer 后端上的稠密 MHA/GQA 模型增加了 CP-v2 prefill 支持。
- **Qwen3.8‑Flash‑Next NVFP4 在 DGX Spark/RTX PRO 6000 上** — [#37995](https://github.com/sgl-project/sglang/pull/37995) 新增了 1x/2x DGX Spark 和 RTX PRO 6000 的 Cookbook 教程。
- **ROCm/DSA 支持** — [#30575](https://github.com/sgl-project/sglang/pull/30575) 为 DSA prefill/decode 路径提供了 Fast Triton Sparse MLA 后端；[#37152](https://github.com/sgl-project/sglang/pull/37152) 让 HiCache kernel IO 后端支持 ROCm。
- **MiniMax‑M3 在 SM121（DGX Spark）上** — 在 Triton MiniMaxSparse 路径上报为不可用：server 可以正常服务，但每个位置生成的 token id 都是 0；相同的 W4A16 权重在 vLLM 上表现正常（[#38143](https://github.com/sgl-project/sglang/issues/38143)，基于 v0.5.18 开放）。

## 4. 性能与优化

- **Blackwell 上的统一内存解码差距** — [#37926](https://github.com/sgl-project/sglang/pull/37926) 修复了 DCP decode 差距；在 B300 上使用 Kimi‑Linear、TP2/DCP2 + `cutedsl_mla` 时，统一内存池比静态内存池慢 1.96%；修复移植进度在该 PR 中跟踪。
- **SM120 NVFP4 默认 GEMM** — [#38170](https://github.com/sgl-project/sglang/pull/38170) 让 FlashInfer 的 `b12x` NVFP4 GEMM 成为 SM120/SM121 上的默认实现；当前 `auto` 会解析到错误的 flashinfer 后端，并在 M≈9xx 时影响 cold-weight GEMM 性能。
- **DeepSeek‑V4 fp32 路由权重** — [#33608](https://github.com/sgl-project/sglang/pull/33608) 在 mxfp4 trtllm 路径中将 MoE 路由权重保持为 fp32，而不是通过打包的 `topk_ids` 进行截断。
- **Elastic EP decode 图重新捕获** — [#33723](https://github.com/sgl-project/sglang/pull/33723)（3/N）在运行时 Elastic EP 扩容后重新捕获完整 decode CUDA 图。
- **ROCm DSA decode 路径** — [#37124](https://github.com/sgl-project/sglang/pull/37124) 融合了 DSA 元数据内核，并移除了 absorb 路径上的冗余工作；在 GLM‑5.2‑MXFP4 / MI355X / TP4、并发 4 下进行了测量。
- **Radix cache 前缀哈希** — [#38204](https://github.com/sgl-project/sglang/pull/38204) 改为迭代式收集前缀哈希值，而不是递归遍历父节点。
- **HiCache/Mooncake linker 加载** — [#38195](https://github.com/sgl-project/sglang/pull/38195) 在 abort 后仍保持队列中的 Mooncake direct-linker 加载存活，使逐层加载仍能填满设备槽位。
- **测试/CI 整合** — [#37436](https://github.com/sgl-project/sglang/pull/37436) 净删减了 11.4K 行代码，并完成了后端去重。

## 5. 稳定性与回归问题

按影响程度排序：

1. **GLM‑5.3‑Flash + HiCache 主机级回载破坏生成** — 在 8×H100 / TP8 上即使不开启投机解码，也会丢失工具调用并出现退化性重复循环（[#38031](https://github.com/sgl-project/sglang/issues/38031)）。该问题仍未关闭；正在 [#37524](https://github.com/sgl-project/sglang/issues/37524) 下跟踪。
2. **DeepSeek‑V4 长上下文 prefill 非法内存访问** — DSA indexer top-k 内核（`topk_v1.cuh:348`）发生错误；paged prefill 路径从未走到 v2 内核（[#37892](https://github.com/sgl-project/sglang/issues/37892)）。已关闭的修复 [#34142](https://github.com/sgl-project/sglang/pull/34142) 解决了一个相关的 DSA CP row-pitch 内存错误。
3. **GLM‑5.3 DPC 崩溃** — 新问题，未关闭，并带有针对最新版本的复现（[#38207](https://github.com/sgl-project/sglang/issues/38207)）。
4. **MiniMax‑M3 在 DGX Spark 上输出全为 NUL** — 仅在 Triton MiniMaxSparse 路径上可复现；相同权重在 vLLM 下正常（[#38143](https://github.com/sgl-project/sglang/issues/38143)）。
5. **GLM‑5.3‑Flash 启动/后端失败** — 流水线并行下出现 `KeyError: 'residual'`（[#36906](https://github.com/sgl-project/sglang/issues/36906)）；RTX PRO 6000 上在 `deep_gemm` NameError 之后仍存在 SM120 DSA 阻塞问题（[#37105](https://github.com/sgl-project/sglang/issues/37105)）；SM120 验证进度见 [#37813](https://github.com/sgl-project/sglang/issues/37813)。
6. **NEXTN/MTP 接受率随运行时长衰减至约 0** — Qwen3.8‑Flash‑Next 草稿接受率持续下降，直到重启才恢复，提示存在状态积累类 bug（[#37326](https://github.com/sgl-project/sglang/issues/37326)）。
7. **KV 池分析器在投机解码下分配不足** — Qwen3.6‑27B NVFP4 hybrid/GDN 启用 EAGLE/MTP 时，约 50 GB 显存被闲置（[#29857](https://github.com/sgl-project/sglang/issues/29857)）。
8. **DeepSeek‑V4‑Flash `reasoning_effort` 映射偏了一档** — `high` 不生效，厂商的 `max` 档无法触达（[#33185](https://github.com/sgl-project/sglang/issues/33185)）。
9. **DeepSeekV4 hook 拒绝 `--speculative-algorithm NEXTN`** — NEXTN→EAGLE 别名解析发生在模型特定 hook 之后，因此启动失败（[#38236](https://github.com/sgl-project/sglang/issues/38236)）。
10. **OTel 追踪丢失 Scheduler spans** — 当设置 `--tokenizer-worker-num>1` 时发生（[#38210](https://github.com/sgl-project/sglang/issues/38210)）。
11. **GPT‑OSS + DP attention 产生垃圾输出** — GSM8K 0/128 vs 124/128；该 issue 现已关闭/不再活跃，使用前请重新测试（[#37187](https://github.com/sgl-project/sglang/issues/37187)）。
12. **CI 健康度跟踪** — 当前 main 分支上有 1 个损坏测试、14 个不稳定测试；近期已修复 949 个（[#17050](https://github.com/sgl-project/sglang/issues/17050)）。

## 6. 这对应用开发者意味着什么

- **GLM‑5.3‑Flash 用户当前应保持谨慎**：在 [#38031](https://github.com/sgl-project/sglang/issues/38031) 修复前，H100/TP8 部署应避免使用 HiCache 主机级回载；升级生产版本前请留意集中跟踪 issue [#37524](https://github.com/sgl-project/sglang/issues/37524)。SM120（RTX PRO 6000）仍被 [#37105](https://github.com/sgl-project/sglang/issues/37105) 阻塞。
- **DGX Spark / SM121 用户**：MiniMax‑M3 W4A16 在 Triton sparse 路径上目前不可用（[#38143](https://github.com/sgl-project/sglang/issues/38143)）；在启用这类模型前，请验证输出 token ID。
- **DeepSeek‑V4 服务**：在 [#37892](https://github.com/sgl-project/sglang/issues/37892) 合入前，DSA 路径上的长上下文 prefill 仍不安全。另请注意，`reasoning_effort=high` 的行为与低一档相同，请对照 [#33185](https://github.com/sgl-project/sglang/issues/33185) 校验请求映射。
- **Blackwell SM120 FP4 服务**：在 [#38170](https://github.com/sgl-project/sglang/pull/38170) 合并后，请重新对 cold-weight/小批次 GEMM 进行基准测试；当前的 `auto` 选择很可能会让吞吐量白白流失。
- **Qwen 及 Qwen 风格 Flash 模型上的投机解码**：如果 NEXTN/MTP 接受率逐渐下降，重启服务仍是目前唯一的解决办法（[#37326](https://github.com/sgl-project/sglang/issues/37326)）；对于 DeepSeekV4，`NEXTN` 目前可能会在启动时被拒绝（[#38236](https://github.com/sgl-project/sglang/issues/38236)）。
- **如果你依赖 OTel 追踪**，请暂时保持 `--tokenizer-worker-num=1`，否则会丢失 Scheduler spans（[#38210](https://github.com/sgl-project/sglang/issues/38210)）。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 文摘 — 2026-09-07

## 今日要点

llama.cpp 发布了一连串快速迭代的构建，直至 b10828，其中最核心的是对 Spark2_5ForCausalLM 架构的端到端支持。其次是运维层面关系较大的改动：`mmid`/`mmf` 中的 CUDA 竞态修复、OpenCL 下 `q4_K`/`q5_K` 的 `mul_mat` 权重打包选择、语法重复阈值修复，以及新增 `--log-jsonl` 标志。开放 issue 的活动主要集中在 Qwen 系列的长上下文/MTP 正确性、Blackwell 上的 CUDA graphs，以及 Vulkan/AMD iGPU prefill 回归。

## 发布与破坏性变更

| 构建 | 亮点 |
|---|---|
| [b10828](https://github.com/ggml-org/llama.cpp/releases/tag/b10828) | 新增 Spark2_5ForCausalLM 实现（[#27868](https://github.com/ggml-org/llama.cpp/pull/27868)）。 |
| [b10827](https://github.com/ggml-org/llama.cpp/releases/tag/b10827) | OpenCL：为 `q4_K`/`q5_K` 的 `mul_mat` 正确选择权重打包（[#28402](https://github.com/ggml-org/llama.cpp/pull/28402)）。 |
| [b10826](https://github.com/ggml-org/llama.cpp/releases/tag/b10826) | CUDA：修复 `mmid` 和 `mmf` 中的竞态（[#28475](https://github.com/ggml-org/llama.cpp/pull/28475)）。 |
| [b10825](https://github.com/ggml-org/llama.cpp/releases/tag/b10825) | 语法：修复最大重复阈值（[#28469](https://github.com/ggml-org/llama.cpp/pull/28469)）。 |
| [b10823](https://github.com/ggml-org/llama.cpp/releases/tag/b10823) | `common`：新增 `--log-jsonl`（[#28437](https://github.com/ggml-org/llama.cpp/pull/28437)）。 |
| [b10822](https://github.com/ggml-org/llama.cpp/releases/tag/b10822) | UI 资源现在通过 CMake 直接嵌入，移除了外部 gzip 依赖（[#28445](https://github.com/ggml-org/llama.cpp/pull/28445)）。 |
| [b10821](https://github.com/ggml-org/llama.cpp/releases/tag/b10821) | Metal：为 M2 Max 补齐剩余的 `fa-vec` 调优（[#28458](https://github.com/ggml-org/llama.cpp/pull/28458)）。 |

没有宣布显式的破坏性 API 变更。b10822 的 UI 构建改动是主要的打包差异：由于构建期辅助工具和外部 gzip 依赖都已移除，交叉编译得以简化。

## 新模型与硬件支持

- **Spark2_5ForCausalLM** —— 通过 [PR #27868](https://github.com/ggml-org/llama.cpp/pull/27868) 合入 [b10828](https://github.com/ggml-org/llama.cpp/releases/tag/b10828)。它新增了 GGUF 转换支持、架构注册/张量映射、分词器的预分词器支持，以及加载/推理图支持。早期实现被标记为“Spark3”，后来更名为 Spark2_5。

- **HrmTextForCausalLM / DFM Mimir 1B** —— 开放 PR [#27625](https://github.com/ggml-org/llama.cpp/pull/27625)。该架构在同一个 token 流上交替使用两个 transformer 栈，并且需要融合的 `gqkv` 投影转换路径。尚未合并。

- **分片多模态投影模型支持** —— 开放 PR [#28517](https://github.com/ggml-org/llama.cpp/pull/28517)。目前 `llama-server --mmproj` 在分片 GGUF 文件上会失败，报错 `clip_model_loader: unable to find tensor v.patch_embd.weight`；该 PR 试图正确加载分片的 `mmproj` GGUF。

## 性能与优化

- **OpenCL 量化矩阵乘法修复**（[b10827](https://github.com/ggml-org/llama.cpp/releases/tag/b10827)，[#28402](https://github.com/ggml-org/llama.cpp/pull/28402)）：为 `q4_K`/`q5_K` 的 `mul_mat` 正确选择权重打包方式。

- **Metal `fa-vec` 调优**（[b10821](https://github.com/ggml-org/llama.cpp/releases/tag/b10821)，[#28458](https://github.com/ggml-org/llama.cpp/pull/28458)）：为 M2 Max 新增注意力向量调优。

- **AMD RDNA4 MMVQ warp 调优** —— [PR #24386](https://github.com/ggml-org/llama.cpp/pull/24386)：调整 `Q4_K`/`Q6_K` 在 `ncols_dst == 1` 时的 warp 数量，提升 gfx1200 上 `Q4_K_M` 模型的单 token 解码吞吐。

- **面向 gfx1201 的 CUDA/HIP flash-attention 调优** —— [PR #28102](https://github.com/ggml-org/llama.cpp/pull/28102)：报告了 R9700 PRO 上长上下文 prefill 性能不佳的问题，并包含 FA 调优，以及针对通用 CUDA FA 路径中 `HS=256` bug 的修复。

- **qwen4exp lazy PLE 直接读取** —— [PR #28136](https://github.com/ggml-org/llama.cpp/pull/28136)：对 lazy PLE 表采用直接读取，据报告在 GB10 上实现了超过 **2× 的 prefill 性能提升**。

- **面向 DeepSeek/GLM 类模型的稀疏 FA** —— [PR #27970](https://github.com/ggml-org/llama.cpp/pull/27970)：新增一条稀疏 flash-attention 路径，由 API 提示驱动，用于限制每个 token 的最大活跃 KV 条目数。

- **重构 lazy-mode 以修复 auto 行为** —— [PR #28326](https://github.com/ggml-org/llama.cpp/pull/28326)：重新设计 `--lazy-mode auto`，让其自动选择可能合适的模式，并将当前“tensors >4GiB lazy”的行为移至 `large` 模式。此举旨在修复 [#28160](https://github.com/ggml-org/llama.cpp/issues/28160) 中的 Vulkan/AMD iGPU prefill 回归。

- **Vulkan expert 数量上限** —— [PR #28501](https://github.com/ggml-org/llama.cpp/pull/28501)：将 `mul_mat_id` 的 hoisted row-id 限制从 256 个专家提升到 512 个专家，适用于较新的大型 MoE 模型。

- **Vulkan FA 在 AMD RDNA 上的共享内存暂存** —— [PR #28507](https://github.com/ggml-org/llama.cpp/pull/28507)：在 AMD RDNA 的标量 flash-attention 路径中启用共享内存暂存。

## 稳定性与回归问题

按运维严重程度排序。

1. **CUDA graphs 在 RTX 5090 Laptop / sm_120 上可能导致 GPU 挂起** —— [#27330](https://github.com/ggml-org/llama.cpp/issues/27330)。症状包括 RC watchdog 和 Xid 8；设置 `GGML_CUDA_DISABLE_GRAPHS=1` 可以完全绕过。目前仍处于 open 状态，没有关联的修复 PR。

2. **`--kv-unified` 会导致从第二个长请求开始 prompt 处理性能下降 42–54%** —— [#28495](https://github.com/ggml-org/llama.cpp/issues/28495)。使用 `-np 2`、单 GPU、顺序请求、无 spill/推测的情况下可复现。根本原因似乎是 CUDA/HIP flash-attention 内核只跳过尾部带掩码的 KV 块，而没有跳过内部全 `-INF` 的块。

3. **Vulkan 回归：`--lazy-mode auto` 使 qwen4exp 在 AMD iGPU 上的 pp512 减半** —— [#28160](https://github.com/ggml-org/llama.cpp/issues/28160)。该问题在 commit `257813839` 之后引入。修复 PR 处于 open 状态：[#28326](https://github.com/ggml-org/llama.cpp/pull/28326)。

4. **Qwen 混合模型在上下文超过约 130k 后无警告地立即 EOS** —— [#27756](https://github.com/ggml-org/llama.cpp/issues/27756)。在 CUDA 和 CPU 上针对 Qwen3.5-hybrid/Qwen3.8-27B 均已复现。怀疑与 DeltaNet 循环状态深度交互有关。没有关联修复 PR。

5. **推测解码在量化目标模型上与贪心解码产生分歧** —— [#25618](https://github.com/ggml-org/llama.cpp/issues/25618)。目标模型为量化模型时，draft-MTP/draft-DSpark 的贪心输出与原生（vanilla）不同；在 bf16 上则一致。仍处 open 状态。

6. **MTP 评估 bug：Qwen3.6 27B 在长会话后输出重复的 `////`** —— [#23577](https://github.com/ggml-org/llama.cpp/issues/23577)。开放/未确认，可能与 MTP 及长上下文稳定性有关。

7. **Chat/工具调用的语法正确性** —— 围绕 JSON-schema 转语法以及工具调用强制执行，仍有若干开放 issue：
   - `tool_choice: "required"` 会被接受，但在 `supports_preserve_reasoning: true` 的模板上并未强制执行（[#27217](https://github.com/ggml-org/llama.cpp/issues/27217)）。
   - 空对象 schema 和很大的 `maxLength` 可能生成无效 GBNF（[#25923](https://github.com/ggml-org/llama.cpp/issues/25923)、[#25746](https://github.com/ggml-org/llama.cpp/issues/25746)）。
   - 针对 enum JSON 处理的开放修复：[#28518](https://github.com/ggml-org/llama.cpp/pull/28518)。

本批次版本中已修复：`mmid`/`mmf` 的 CUDA 竞态修复（[#28475](https://github.com/ggml-org/llama.cpp/pull/28475)）和语法最大重复阈值修复（[#28469](https://github.com/ggml-org/llama.cpp/pull/28469)）。

## 对应用开发者的意义

- **新模型落地速度很快。** Spark2_5 应该很快就能通过 GGUF 转换后的权重用于推理和服务器部署。请关注与 [PR #27868](https://github.com/ggml-org/llama.cpp/pull/27868) 相关的转换脚本。

- **在使用并行槽位进行服务时，请验证 unified-KV 行为。** 如果你使用 `-np 2 --kv-unified`，请在第一个请求之后对 prompt 处理做基准测试；[#28495](https://github.com/ggml-org/llama.cpp/issues/28495) 中提到的 CUDA/HIP FA 限制可能使吞吐量下降近一半。

- **工具调用用户应在边界条件下测试语法生成。** 空对象 schema、2000 以上的 `maxLength` 以及保留 reasoning 的模板都存在已知的强制执行/语法 bug。目前不要认为 `tool_choice: "required"` 会被严格强制执行。

- **现已提供 `--log-jsonl`**（[#28437](https://github.com/ggml-org/llama.cpp/pull/28437)）。这对于围绕 `llama-server` 和其他常见 CLI 工具的结构化日志采集非常有用。

- **如果在较新的 Blackwell 消费级 GPU 上运行，请保留 `GGML_CUDA_DISABLE_GRAPHS=1`**，作为 sm_120 上 CUDA-graph 挂起问题（[#27330](https://github.com/ggml-org/llama.cpp/issues/27330)）解决前的后备方案。

- **Web UI 现在已完整嵌入二进制文件**，简化了包含 UI 的构建的部署（[#28445](https://github.com/ggml-org/llama.cpp/pull/28445)）。如果你在托管 PWA，还应关注 [PR #28508](https://github.com/ggml-org/llama.cpp/pull/28508) 中针对 liveness 端点的 service-worker 缓存修复。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 文摘 — 2026-09-07

## 1. 今日要点

[v0.34.0-rc1](https://github.com/ollama/ollama/releases) 引入了在 ChatGPT Desktop（macOS）中运行 Ollama 模型的能力，并提升了 Apple Silicon 上结构化输出的性能。社区长期请求的 Prometheus `/metrics` 端点现已进入公开 PR 阶段。与此同时，稳定性问题报告占主导：Blackwell flash-attention 崩溃、AMD iGPU 上的 Vulkan 回归，以及多个云端模型的 JSON/推理 bug。

## 2. 版本发布与破坏性变更

- **[v0.34.0-rc1](https://github.com/ollama/ollama/releases)** — v0.34.0 的首个 RC 版本：
  - **ChatGPT Desktop 集成**：ChatGPT Desktop 内现可直接选用 Ollama 模型；Ollama macOS 应用中也已提供设置入口。
  - **结构化输出**：针对 Apple Silicon 的性能改进。
  - 未宣布任何 API 破坏性变更；请按 RC 对待，正式推广前锁定版本。

## 3. 新模型与硬件支持

- 今天没有合入新的架构。
- **新架构请求**：`spark2_5`（Spark-X2.5-4B / 1.7B）的原生支持仍在等待中——模型现在可以下载，但无法启动推理 [#18195](https://github.com/ollama/ollama/issues/18195)。
- **Blackwell（sm_120）用户**：如果你打算用 RTX 50 系列跑 qwen3-moe 负载，请先看下方 [#18276](https://github.com/ollama/ollama/issues/18276) 中报告的崩溃问题。

## 4. 性能与优化

- **结构化输出**：v0.34.0-rc1 在 Apple Silicon 上的吞吐量有所提升（发布说明中未给出具体数字）。
- **MLX 前缀缓存 bug**：恢复点只会按 8192 token 的倍数向下截断，所以每次冷提示后最多会有 8191 个 token 被重新预填充。在 agent 类负载中（例如 Claude Code 接入本地模型），每一轮都要因此付出固定的 **17–27 秒重新预填充开销** [#18267](https://github.com/ollama/ollama/issues/18267)。
- **面向 Prometheus 的 `/metrics` 端点**：[#16998](https://github.com/ollama/ollama/pull/16998) 新增了一个可选启用（`OLLAMA_METRICS=1`）的端点，提供调度器 gauge（`ollama_requests_queued`、`ollama_models_loaded`）、HTTP 计数器，以及按模型/token 统计的指标。这回应了长期以来的功能请求 [#3144](https://github.com/ollama/ollama/issues/3144)。
- **面向 agent 负载的检查点基础工作**：[#18271](https://github.com/ollama/ollama/pull/18271) 提议向 llama-server 发送渲染器消息分隔符，让上下文检查点落在用户轮次边界上——这与本地 agent 循环中的提示缓存延迟密切相关。

## 5. 稳定性与回归问题

按严重程度排序；其中排在最前面的几项目前还没有已确认的修复 PR。

- **Blackwell flash-attention 崩溃** —— `qwen3-coder:30b` 在 RTX 5070 Ti（sm_120）上会自动启用 flash attention，随后 llama-server 在预热阶段崩溃，报 `0xc0000409` / “shared object initialization failed”，尽管全部 49 层都能装进内存 [#18276](https://github.com/ollama/ollama/issues/18276)。
- **Vulkan 回归（AMD iGPU）** —— 加载 66 GB 模型现在会因 “Not enough memory for command submission” 失败；v0.32.9 上正常，自 v0.32.12 起开始出错 [#18272](https://github.com/ollama/ollama/issues/18272)。
- **云端推理模型返回不可用 JSON** —— `minimax-m3:cloud` 会间歇性地把 JSON 负载拆分到 `reasoning` 与 `content` 中，导致单独的 `content` 对 OpenAI 兼容的 `/v1/chat/completions` 消费方来说无效 [#17987](https://github.com/ollama/ollama/issues/17987)。
- **云端模型失控循环** —— `glm-5.3:cloud` 在 OpenCode/ZCode 下会进入无休止推理并中止任务，而官方 Z.AI 端点工作正常 [#18193](https://github.com/ollama/ollama/issues/18193)。`kimi-k2.6:cloud` 仍会出现 10 分钟以上的延迟，并持续流式返回 `INTERNAL_ERROR` [#16845](https://github.com/ollama/ollama/issues/16845)。
- **gemma4 工具调用解析故障** —— `BEGIN_ARG`/`END_ARG` 语法无法被解析；模型会退化成 `<|channel|>` 循环直到 token 上限，并返回 HTTP 200 但没有任何可用内容，导致 Continue.dev 的 agent 模式不可用 [#18275](https://github.com/ollama/ollama/issues/18275)。
- **Claude Desktop 集成不可用** —— v0.33.1 新增的集成在部分系统上启动即失败 [#18073](https://github.com/ollama/ollama/issues/18073)。
- **MLX 卡在 “Stopping...” 状态** —— Apple M4 上的 `muse-glimmer:30b-mlx` 反复陷入该状态无法退出；曾有一次需要完全重启 macOS 才恢复 [#18269](https://github.com/ollama/ollama/issues/18269)。
- **模型名校验过于严格** —— 80 字符长度限制会阻止拉取较长的 Hugging Face 仓库名/文件路径，例如 `hf.co/DavidAU/...` [#18274](https://github.com/ollama/ollama/issues/18274)。
- **长期存在的下载完整性问题** —— `ollama pull` 时出现的 digest 不匹配问题已开放约 3 年仍未解决 [#941](https://github.com/ollama/ollama/issues/941)；相关的“进度回退”报告 [#8484](https://github.com/ollama/ollama/issues/8484) 已关闭。
- **许可证合规欠账** —— Ollama 发布产物中仍未附带所捆绑依赖的声明（例如 llama.cpp 的 MIT 版权声明），该 issue 已累计 272 👍；如果你的组织要求做开源许可证审计，这条值得关注 [#3185](https://github.com/ollama/ollama/issues/3185)。
- **修复进行中**：Windows 托盘气泡通知门控 [#18273](https://github.com/ollama/ollama/pull/18273)；为旧版 `glm-ocr` GGUF 修复 EOT token，以阻止输出失控 [#17195](https://github.com/ollama/ollama/pull/17195)。

## 6. 对应用开发者的影响

- **不要假设来自 `:cloud` 推理模型的 `content` 是有效 JSON。** 如果你通过 OpenAI 兼容端点接入 `minimax-m3:cloud` 等模型，请加入响应校验/修复逻辑，或使用能感知 `reasoning` 的解析方式。
- **使用 AMD iGPU/Vulkan 或 Blackwell 的用户请锁定 Ollama 版本。** v0.32.12+ 已知会引入 Vulkan 回归；qwen3-moe + Blackwell 目前不可用。
- **现在就开始为 `/metrics` 做接入准备**：该端点仍在审查中——围绕 `ollama_requests_queued`、`ollama_models_loaded` 和按 token 延迟规划监控面板没有风险，将来可以平滑落地。
- **MLX 上的本地 agent 循环带有固定重新预填充开销**（最高约 27 秒）。如果你要跑 Apple Silicon 上的 Claude Code 风格本地工作流，请把它计入预算；在缓存行为至关重要的场景，优先选择非 MLX 后端。
- **在接入 ChatGPT Desktop 集成之前，先在预发布环境测试 v0.34.0-rc1**，并在升级生产环境中的助手应用前，用新版解析器验证 gemma4 工具调用路径。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 动态 — 2026-09-07

## 1. 今日要点

预算与消费核算正确性问题主导了今日的 issue 追踪器：一系列新 issue 报告了误报的 "Budget has been exceeded" 429（[#40050](https://github.com/BerriAI/litellm/issues/40050)）、永不重置的进程本地预算上限（[#40020](https://github.com/BerriAI/litellm/issues/40020)），再加上自定义模型消费日志被记录为 $0（[#35691](https://github.com/BerriAI/litellm/issues/35691)）、Anthropic 缓存读取被重复计费（[#40006](https://github.com/BerriAI/litellm/issues/40006)）等问题。困扰已久的 AdaptiveRouter `gammavariate` 崩溃问题系列（[#29397](https://github.com/BerriAI/litellm/issues/29397)、[#35590](https://github.com/BerriAI/litellm/issues/35590)）现已连同 [#31481](https://github.com/BerriAI/litellm/issues/31481) 一并关闭。运维方面，用于修复 `POST /config/reload` 的 PR（[#40035](https://github.com/BerriAI/litellm/pull/40035)）已提交，以解决 [#30772](https://github.com/BerriAI/litellm/issues/30772) 中报告的 404。

## 2. 版本发布与破坏性变更

- **v1.100.0** 与 **v1.101.0-rc.1** 已发布（[releases](https://github.com/BerriAI/litellm/releases)）；发布说明仅记录了经 cosign 验证的 Docker 镜像签名，没有出现新的迁移说明。
- **已关闭的回归问题（v1.96+）**：托管 MCP OAuth2 流程此前打开的是 LiteLLM UI，而不是厂商授权页面（[#39665](https://github.com/BerriAI/litellm/issues/39665)）。该问题已于今日关闭；使用托管 MCP OAuth2 的团队在升级到 1.95.1 以上版本后，应确认该流程渲染的是上游厂商授权页面。

## 3. 新增模型与硬件支持

- 新增 **Standard Compute** chat completions 提供商：支持端点、密钥环境变量、token 上限映射、流式输出与原生工具调用（[#39906](https://github.com/BerriAI/litellm/pull/39906)）。
- **The Grid** 已作为通过 JSON 配置的 OpenAI 兼容提供商加入（[#39907](https://github.com/BerriAI/litellm/pull/39907)）。
- 没有报告新的硬件后端（CUDA/ROCm/Metal/CPU）或量化格式。

## 4. 性能与优化

- **Rust/Python 回调边界**：[#40070](https://github.com/BerriAI/litellm/pull/40070) 在回调调用期间保留原始 Python 引用，以保持共享对象身份一致（目前是尚未接入调用链的基础性改动）；[#40008](https://github.com/BerriAI/litellm/pull/40008) 新增 45 个针对 release wheel 的基准测试，在 CI 中把关 Rust/Python 边界的性能。
- **缓存分析范围收窄**：[#32098](https://github.com/BerriAI/litellm/pull/32098) 将 `/global/activity/cache_hits` 限定为仅内部用户可访问，限制大规模部署下的跨租户查询面。
- 本周期内没有具体的吞吐量/延迟数据落地。

## 5. 稳定性与回归问题

按严重程度排序；已有修复 PR 的会予以注明。

1. **预算超额误报与计费完整性（未解决）**：设置了 `max_budget` 的密钥返回 429，且强制执行成本远高于已记录的消费（[#40050](https://github.com/BerriAI/litellm/issues/40050)）；`litellm_settings.max_budget` 会静默激活一个永不重置的进程本地 `_current_cost` 上限（[#40020](https://github.com/BerriAI/litellm/issues/40020)）；对内置成本表之外的自定义模型，消费日志会记录为 $0（[#35691](https://github.com/BerriAI/litellm/issues/35691)）；`custom_cost_per_token` 会对 Anthropic 缓存读取 token 重复计费（[#40006](https://github.com/BerriAI/litellm/issues/40006)）。相关修复：[#40060](https://github.com/BerriAI/litellm/pull/40060) 防止预算/密钥/用户的标量更新覆盖本次更新未提供的较新元数据。

2. **Bedrock files（未解决）**：`DELETE /v1/files/{file_id}` 会直接报 500 "BedrockFilesConfig does not support file deletion"，托管文件无法被清理（[#39715](https://github.com/BerriAI/litellm/issues/39715)）。

3. **Headroom CCR + DeepSeek（未解决）**：流式转换在强制 `stream=false` 后仍在上游请求中保留 `stream_options`，导致 HTTP 400（[#40068](https://github.com/BerriAI/litellm/issues/40068)）。

4. **Chat 提供商桥接（未解决）**：对于仅支持 Responses API 的上游，空的 `function_call_arguments.delta` 会引发 `ValueError`，而不是作为 no-op 忽略（[#40069](https://github.com/BerriAI/litellm/issues/40069)）。

5. **UI 仪表盘（未解决）**：请求日志的日期范围选择器将本地时间解释为 UTC，导致非 UTC 用户的窗口被静默偏移（[#39979](https://github.com/BerriAI/litellm/issues/39979)）。

6. **本期已修复/关闭**：Anthropic `/v1/messages` 抹除 OpenAI Responses refusal 块的问题（[#39721](https://github.com/BerriAI/litellm/issues/39721)）；AdaptiveRouter `gammavariate` 在重启后/持久化零值单元格时出现 HTTP 500 的问题（[#29397](https://github.com/BerriAI/litellm/issues/29397)、[#35590](https://github.com/BerriAI/litellm/issues/35590)）；AdaptiveRouter 从 `litellm_params` 而非 `model_info` 读取成本、导致成本加权路由被清零失效的问题（[#31481](https://github.com/BerriAI/litellm/issues/31481)）；`/ui/login` 返回 404 的问题（[#29340](https://github.com/BerriAI/litellm/issues/29340)）。

7. **值得关注的进行中修复 PR**：`POST /config/reload`（[#40035](https://github.com/BerriAI/litellm/pull/40035)）；根据部署声明的档位对 reasoning_effort 进行校验（[#40071](https://github.com/BerriAI/litellm/pull/40071)）；在 `/v1/models` 上对 `hosted_vllm/*` / `vllm/*` / `litellm_proxy/*` 进行通配符模型展开（[#40066](https://github.com/BerriAI/litellm/pull/40066)）；确保 `ssl_verify` 不进入 `extra_body`（[#38245](https://github.com/BerriAI/litellm/pull/38245)）；Vertex AI 对可空枚举场景递归展开 `anyOf`（[#40049](https://github.com/BerriAI/litellm/pull/40049)）；UI JSON 模型编辑器的键删除（[#34034](https://github.com/BerriAI/litellm/pull/34034)）；通过 tini 回收 Prisma 僵尸进程（[#33786](https://github.com/BerriAI/litellm/pull/33786)、[#33599](https://github.com/BerriAI/litellm/pull/33599)）。

## 6. 对应用开发者的启示

- **预算上限尚不能作为硬性保证被信任。** 误报的 "budget exceeded" 强制拦截（[#40050](https://github.com/BerriAI/litellm/issues/40050)）、永不重置的本地上限（[#40020](https://github.com/BerriAI/litellm/issues/40020)）、自定义模型消费日志为 $0（[#35691](https://github.com/BerriAI/litellm/issues/35691)）等问题叠加，意味着设置了严格 `max_budget` 的团队在依赖这些 429 之前，应将其与已记录的消费进行交叉核对，并在升级后验证自定义成本配置。
- **成本加权路由可能静默失效**：在 AdaptiveRouter 部署中，如果价格信息只存在于 `model_info`，路由可能悄然失效——请将价格固定写入 `litellm_params`，或核查成本日志。
- **Anthropic/OpenAI 转换修复正在逐步收敛**：refusal 块的处理已修复，但 reasoning-effort 与 Responses-API 桥接的边界情况（[#40069](https://github.com/BerriAI/litellm/issues/40069)、[#25532](https://github.com/BerriAI/litellm/issues/25532)）仍值得为 Claude Code / Codex 风格的 agent 进行测试。
- **运维侧利好**：[#40035](https://github.com/BerriAI/litellm/pull/40035) 终于为 `POST /config/reload` 提供了可用的实现，且所有发布镜像现在都经过 cosign 签名，可支持供应链验证。
- 两个新的 OpenAI 兼容提供商（Standard Compute、The Grid）即将到来，适合希望把路由目标扩展到内置目录之外的团队。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-07

## 今日看点

过去 24 小时没有新版本落地；相反，仓库里从 9 月 6 日起涌现出约 20 个开放 PR，围绕 llama.cpp 后端加固 Unsloth Studio，并经历了一轮大规模 issue 分诊，关闭了数十个长期未动的旧 issue。目前进行中最重要的正确性修复，是防止已取消生成返回的响应被投递到另一个仍然活跃的请求上（[#10388](https://github.com/unslothai/unsloth/pull/10388)）。一组相关的 Strix Halo/AMD iGPU PR 还处理了 Studio 推理服务中的后端选择、prompt 缓存保留、遥测准确性以及关闭竞态。

## 发布与破坏性变更

过去 24 小时没有新版本发布。如果合并，有两个未发布的 Studio 改动会影响运维人员：

- **一次性设置令牌取代预置管理员密码**（[#10387](https://github.com/unslothai/unsloth/pull/10387)）— 当前服务页面会直接携带预置的管理员密码，访问控制只靠一个作者称为 unwritable 的本地浏览器检查。该修复改为发放一次性设置令牌。依赖抓取该 seed 的脚本化安装流程需要更新。
- **共享安装的按账户隔离**（[#10375](https://github.com/unslothai/unsloth/pull/10375)）— 多用户账户可共用一台 GPU 机器，每个账户拥有自己的配置与凭据。

## 新模型与硬件支持

- **AMD 集成 GPU 将获得 Vulkan 版 llama.cpp 预编译**（[#10381](https://github.com/unslothai/unsloth/pull/10381)）— 在 Strix Halo（gfx1150/gfx1151、Radeon 8060S）上，安装程序现在会选用 Vulkan 而不是 ROCm；已有自动安装 ROCm 的环境会通过更新横幅获得切换提示。
- **针对 RTX 5090 / DGX Spark / RTX Spark / Windows-WSL 的 NVFP4 + 低秩校正 kernel，以及双 GPU 层切分的扩散/视频 DiT，分别开放了不打算合入的一次性硬件验证基准**（[#10391](https://github.com/unslothai/unsloth/pull/10391)、[#10380](https://github.com/unslothai/unsloth/pull/10380)）— 它们并不旨在合并，而是预示这些目标平台上将有新的 kernel/推理服务相关工作。

## 性能与优化

- **在共享内存 GPU 上保留 prompt 缓存**（[#10382](https://github.com/unslothai/unsloth/pull/10382)）— Studio 的 Windows 全量卸载调优会关闭 llama-server 的 prompt 缓存；在独显上这是有意的取舍，在集成 GPU 上则纯属损失。一次 48.8 小时的 Strix Halo 会话因此损失了约 **44 小时**。
- **当 llama.cpp 拒绝统一 KV 缓存时，回退为按单序列重试**（[#10371](https://github.com/unslothai/unsloth/pull/10371)）— Studio 在 `n_parallel > 1` 时总会追加 `--kv-unified`，这会让需要每流一条序列的架构出错；该 PR 增加了回退重试路径。
- **遥测改为报告引擎本可达到的吞吐量**（[#10384](https://github.com/unslothai/unsloth/pull/10384)）— 在来自 Strix Halo bundle 的 48,216 条 `engine_stats` 记录中，llama-server 的 `/metrics` 在生成期间显示 0 tok/s，偶尔还会出现不可能的速率。这是测量修复而非引擎修复，但会让未来的调优决策更加可信。
- **语音对话模式与基准测试重建**（[#10373](https://github.com/unslothai/unsloth/pull/10373)、[#10374](https://github.com/unslothai/unsloth/pull/10374)）— PR #6527 的 A、B 两部分在最新 `main` 上重建，新增了语音对话循环，以及确定性的端到端语音管线延迟测试 harness。

## 稳定性与回归问题

按严重程度排序：

1. **迟到的推理响应可能被投递给错误的请求**（[#10388](https://github.com/unslothai/unsloth/pull/10388)，修复 PR 已开放）— 取消生成会先释放该请求的 mailbox，但 worker 尚未结束；随后本应属于另一个请求的响应就会“漏下去”，被返回给当前活跃请求。跨请求响应污染是 API 服务中严重的正确性 bug。
2. **当关闭流程在模型加载中途销毁服务时，Studio 会崩溃**（[#10369](https://github.com/unslothai/unsloth/pull/10369)，修复 PR 已开放）— 优雅关闭期间，`llama_cpp.py` 的 `_wait_for_health` 抛出 `'NoneType' object has no attribute 'poll'`。
3. **全新 NVIDIA 安装中的 torchcodec/torch 2.11 不匹配**（[#7474](https://github.com/unslothai/unsloth/pull/7474)，修复 PR 自 7 月起开放）— 原本用于捕获该不匹配的守卫始终没有触发；该 PR 按 torch 次版本固定 torchcodec，并覆盖 2.11。
4. **Windows ROCm torch 在安装日志中被误标为 CPU**（[#10370](https://github.com/unslothai/unsloth/pull/10370)，修复 PR 已开放）— 安装程序从不指明 llama.cpp 后端，因此日志中正确的 Vulkan 配置与 CPU 回退无法区分，成为 bug 报告中反复误判的来源。
5. **仍开放的训练阻塞问题**（[#7203](https://github.com/unslothai/unsloth/issues/7203)）— Qwen3.5-9B 始终无法进入第一个训练步骤；Gemma 4 26B A4B 在 96 GB 显存上以 batch size 1 跑 QLoRA 也会 OOM。这是今天靠前列表中唯一高信号、仍开放的问题。
6. **大规模陈旧 issue 清理** — 今天几乎所有被更新的顶部 issue 都是旧报告（2024–2026），现已标记为 `[CLOSED]`（[#4396](https://github.com/unslothai/unsloth/issues/4396)、[#3553](https://github.com/unslothai/unsloth/issues/3553)、[#4137](https://github.com/unslothai/unsloth/issues/4137)、[#3996](https://github.com/unslothai/unsloth/issues/3996) 等）。如果你的 issue 未经解决就被关闭，用当前版本的复现步骤重新打开才是正确的推进方式。

## 对应用开发者的意义

- **如果你在生产环境提供服务 Unsloth Studio 的 llama.cpp 端点，请密切关注 PR #10388。** 客户端取消后出现跨请求响应泄漏，这类 bug 会导致间歇性、难以排查的错误回答；这次修复是紧跟 `main` 的有力理由。
- **代理式对话语义正在变得更持久** — 工具调用回合在关闭标签页后仍会保留，并被标记为“interrupted”而不是显示为失败（[#10365](https://github.com/unslothai/unsloth/pull/10365)）。语音模式也在路上，因此会话 API 很可能加入长耗时/可中断回合的语义。
- **AMD iGPU（Strix Halo）用户应能获得明显更好的开箱体验**：Vulkan 后端自动选择、prompt 缓存保留以及真实的吞吐量遥测，消除了在 APU 上本地运行 LLM 的实际痛点。
- **多用户 GPU 机器正在成为一等公民**：按账户隔离加上 setup token 引导变更，意味着任何正在部署共享安装的人都应为下次 Studio 更新规划凭据流程的调整。
- 今天的 issue 分诊异常激进；请把大量 `[CLOSED]` 标记视作维护整理，而不一定代表已修复——在调整预期前，请先对照相关 PR 核实。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*