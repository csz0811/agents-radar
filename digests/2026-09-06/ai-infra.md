# AI 基础设施日报 2026-09-06

> 生成时间: 2026-09-05 22:45 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 跨项目对比报告 — 2026-09-06

## 1. 生态概览

当前生态的特征在于：新一代混合状态空间 MoE 架构（Qwen3.x “Flash/Next”、DeepSeek-V4-Flash、Kimi Linear/K3、GLM-5 级）的演进速度，已经跑在了承载它们的运行时的验证成熟度前面。正确性问题的主线是这些混合模型上的投机解码：vLLM 和 SGLang 在 MTP/EAGLE + 前缀缓存路径上都带着未关闭的静默损坏与 token 循环 bug，而 SGLang 报告的 Kimi-K3 跨 prompt 推理泄漏，正是那种会让共享部署谨慎起来的租户隔离缺陷。本窗口内最具分量的运维成果是 SGLang 的 Weight Cache Daemon：它把 Qwen3-235B 级 FP8 模型每个 rank 的权重加载时间从约 306–327 秒缩短到 1 秒以内——重启成本结构上的一次阶跃式变化。除此之外，本周除 SGLang v0.5.19 外没有重要功能版本落地；llama.cpp 发布了三个补丁版本，vLLM、Ollama、LiteLLM 和 Unsloth 都停留在稳定化与加固模式。

## 2. 活跃度对比

*计数为每个 24 小时摘要中明确引用的独立 issue/PR 数量，而非仓库全量统计（LiteLLM 例外，报告的是窗口期总数）。摘要筛选优先严重度和可见性，因此请将这些数字视为实际活跃度的下限。*

| 项目 | 层 | Issues（被提及） | PRs（被提及） | 发布状态（24h） |
|---|---|---|---|---|
| vLLM | Serving engine | ~16 | ~11 | 无；v0.28.0 已在线上，且有主机内存回归的报告 |
| SGLang | Serving engine | ~21 | ~15 | **v0.5.19 已发布**（累计 786 个 PR / 214 位贡献者） |
| llama.cpp | Local runtime | ~9 | ~19 | **3 个补丁：b10817–b10819**（SYCL 追踪、SYCL FWHT 恢复、Metal 内存泄漏） |
| Ollama | Local serving | ~11 | ~11 | 无 |
| LiteLLM | Gateway / router | 48 项更新 | 325 项更新 | 无 |
| Unsloth | Fine-tuning / Studio | ~16 | ~17 | 无；通道为 v0.1.806-beta / 2026.9.2 |

要点：llama.cpp 的补丁发布节奏最密；LiteLLM 的 issue/PR 原始变动量最大，集中在费用核算与路由器加固上；SGLang 的累计发版是单个最大的交付物；vLLM 的待办队列以正确性修复为主，而非新功能。

## 3. 模型支持竞赛

**SGLang 是本周唯一一个把主要新模型支持完整闭环的项目：**Qwen3.8（2.4T-A95B）的自回归支持已随 v0.5.19 落地，并配齐了 cookbook 与模型支持表。与此同时，它正在 B200/GB300 上加固 Kimi Linear / NoPE-MLA 的 FP8 prefill，并为 ROCm 新增了纯 Triton 稀疏 MLA 后端——这是其数据中心模型路线图方向最明确的信号。

**vLLM 本周合并的新模型/新硬件支持为零。**它的前沿工作是把*已有*的下一代模型放到更旧或更低成本的硬件上：在 A100 上以 TP=2 对 Qwen3.5-122B-A10B 融合 MoE 做调优（开放中的 PR），此外还有仍未关闭的 DeepSeek-V4-Flash 上 SM8x Ampere、以及 RDNA4/gfx1201 FP8 上游化的请求。

**llama.cpp** 的在途工作涵盖 DFM Mimir 1B（HrmTextForCausalLM，开放中的 PR）和一个已具备合并条件的 Hy4-preview 转换重构；均未发布。**Ollama** 没有合并任何模型支持，但 MLX 侧有实打实的 WIP：为 Qwen3.5/3.8 的 RoPE/M-RoPE 做静态 YaRN 上下文扩展，以及修复旧版 glm-OCR GGUF 的生成终止问题。**LiteLLM** 按设计就是模型无关的；最接近模型支持的是 Cohere Parse OCR 配置和一个 Switchyard 能力分类器。**Unsloth** 正从微调侧跟进 Qwen3.8 生态（按推理模式调整采样默认值；排查 Flash-Next GGUF 的 MTP 加载失败），Voxtral 仍是获赞最多的开放请求。

**结论：**SGLang 在新数据中心级模型的启用速度上领先；llama.cpp 和 Ollama 在本地/量化模型上的上新节奏更慢；vLLM 是混合模型*正确性*的对照标杆，但本周的新模型速度不占优。

## 4. 性能前沿

优化工作集中在五个方向：

- **KV cache / 上下文内存。**vLLM 出现了一个补丁，号称通过接上 Qwen3.8-Flash-Next 缺失的 FP8 e4m3 读取路径，让 GB10 上的可用 KV 池扩大约 2 倍（有待验证）。llama.cpp 对不支持的 KV 缓存类型仍会静默回退到 CPU FlashAttention（prefill 最多掉速约 8 倍）。Ollama 正在追查两个问题：每个 runner 约 8 GiB 且上不封顶的主机 RAM prompt cache；以及 MLX 将前缀缓存截断为 8192 token 整数倍的行为（17–27 秒的重新 prefill 代价）。Unsloth 正把 KV 缓存抢占能力推进到 llama-server，让并行的 Studio 聊天共享同一份缓存。
- **量化内核。**vLLM 的 W8A8 decode 回归仍未关闭，且已定位到内核本身。量化 decode 方面 llama.cpp 最活跃：Vulkan IQ4_XS 专用着色器在 RDNA4 上带来 +6–17% 的 token 生成提升，另有 TQ2_0 ARM GEMM 提案。Ollama 提供了一个值得警惕的数据点：低比特 Qwen2.5-Coder-3B 产物在代码冒烟测试中 0/15 通过，而同模型的其他量化版本得分 87–100%。
- **引擎恢复与主机内存卫生。**SGLang 的 Weight Cache Daemon（per-rank CUDA IPC 权重服务）是本期摘要中影响最大的运维改进。vLLM 有一个 PR，会在 sleep/wake 后释放锁页主机内存，而不是让一块权重等大的 RAM 在进程生命周期内始终被占用。
- **新芯片上的分布式推理。**SGLang 正在逼近 Blackwell 统一内存的 decode-CP 差距（B300 上、Kimi-Linear 跑 TP2/DCP2 时，落后静态池 1.96%）。vLLM 有一个修复 PR，解决 prefill pod 重启后 NIXL disaggregation 的段错误；llama.cpp 在分布式 Qwen3.8-Flash-Next 推理中，还有一个 ROCm RPC 服务器在 TOP_K 处崩溃的问题未关闭。
- **投机解码与调度。**这部分的重点是正确性优先，而非速度优先：vLLM 的 PR 聚焦按请求的 spec-decode 块索引、跨投机批次的混合状态恢复，以及 prefill 被误分发进 spec-decode CUDA graph 的问题。SGLang 把采样掩码留在 GPU 上以消除 CPU 同步，并固定了基准测试计时语义（`itl` 按 stream event 计，而非按 token 计）；vLLM 正在统一各服务端点的 TTFT/TPOT。

## 5. 各层定位

- **vLLM / SGLang — Serving engines。**两者都面向数据中心推理场景，具备 continuous batching、前缀缓存、投机解码和 PD 分离。SGLang 在发版节奏、分布式集合通信（deepep_v2、DSA）和 Blackwell 支持上走得更快；vLLM 的竞争点是生态广度，目前正在为更多模型家族消化混合架构带来的正确性债务。
- **llama.cpp — Local runtime 基座。**CPU/GPU 内核、GGUF 量化、grammar/结构化输出。没有服务管理或网关；所有优化都发生在内核和后端算子层。它是 Ollama 和 Unsloth Studio 底层的共享基座。
- **Ollama — 本地推理产品。**在 llama.cpp 和 MLX runner 之外包装了模型注册表、启动器/上下文对齐，以及设备/RAM 记账。它在本期摘要中的问题，正是产品化封装层必然会继承的问题：上下文窗口不匹配、对记账不可见的内存上限，以及模型产物质量。
- **LiteLLM — 控制面网关。**没有内核，也不执行模型；负责路由、预算、费用日志与权限。它的 325 个 PR 变动几乎全部是企业级可靠性事宜：预算重置、费用日志冲突、router 先验与流式保真度。
- **Unsloth — 带推理前端的微调层。**差异化在于训练和 RL 的 Triton 内核覆盖（GRPO，SAO 在审），而 Studio 的推理侧复用 llama-server——让它正好落在微调与本地推理的汇聚点上。

值得关注的重叠区域：Ollama 和 Unsloth 都包着 llama.cpp，会继承后者的回归问题；LiteLLM 挡在 vLLM/SGLang/Ollama 前面，引擎级 bug 正是在这里变成应用层可见（例如流式 tool-call 被打乱）。

## 6. 趋势信号

- **混合模型 + 投机解码属于 fail-dangerous（失效即危险）类型。**vLLM 和 SGLang 都出现了静默错误输出、同一 token 循环、非法内存访问——而且全部集中在同一片 GDN/Mamba/MTP 交互空间里。如果你用 EAGLE/MTP + 前缀缓存服务 Qwen3 级混合模型，请在每次上线时跑回归套件，并考虑在相关修复成批落地之前，对有状态混合模型关闭投机解码。
- **重启经济性刚刚发生了阶跃式变化。**权重加载从 306–327 秒降到 1 秒以内（SGLang Weight Cache Daemon），让 200B+ 级 FP8 部署的 scale-to-zero、滚动升级和快速故障恢复都变得可行。预计这一模式会传导到 vLLM；请提前规划好 per-rank CUDA IPC daemon 的生命周期管理。
- **主机内存治理落后于 VRAM 记账。**vLLM 在 sleep/wake 一个周期后仍持有一块权重等大的锁页内存；Ollama 经由 llama-server 的 prompt cache，以约 8 GiB/runner 的规模不可见地消耗主机内存；SGLang 对同机共置的 rank 重复计收 HiCache 主机内存——这些都发生在同一天。对于长生命周期 runner，要盯 RSS，别只看 VRAM。
- **Agent 正确性问题正在沿着技术栈上移。**最具破坏力的 bug 已不是 token 级，而是历史级：Ollama 对 `</think>` 的裁剪引发了一个 31M token 的 tool-call 循环；LiteLLM 的流式重分块丢掉了 `tool_calls[].id` / `function.name`；vLLM 则把 `strict` 标志泄漏进了模型可见的模板。给应用开发者的规则：绝不要在客户端改写或裁剪 assistant 历史，并在信任流式 agent 之前，先验证 tool-call 身份能否原样穿过网关。
- **多租户隔离需要显式闸门。**SGLang 的 Kimi-K3 跨 prompt 推理泄漏报告和 LiteLLM 的 A2A 权限绕过，都说明在相关 tracker 关闭之前，新模型必须做租户隔离。不要在共享上下文中运行最前沿的混合模型。
- **量化正在碎片化，变成静默的正确性风险。**Qwen-VL 上的 FP8 KV 缓存损坏、被跳过的 NVFP4 层输出垃圾、W8A8 比 FP16 还慢、低比特代码模型产物不可用——而且全都不报错。任何量化部署前面都要放一套任务级验证套件（不是 perplexity）；一旦找到可用的组合，就把版本锁死。
- **非 NVIDIA 加速正在按厂商分化。**RDNA4 在 llama.cpp 中拿到了实打实的 Vulkan decode 增益，而 AMD ROCm RPC 崩溃仍未关闭；Intel Arc 和 Windows-on-ARM NVIDIA（GB10）支持仍只是零散的一次性补丁；MLX 的上下文约束还在落地中。多加速器部署需要按后端逐一验证，而不能默认同一个二进制到处通用。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 文摘 — 2026-09-06

## 1. 今日要点

过去 24 小时内没有新的 vLLM 版本发布。当前活跃的 PR 队列以正确性修复为主，内容涉及 GDN/Mamba 混合模型在 MTP/EAGLE 投机解码与前缀缓存下的缺陷；这些修复对应的正是静默错误输出、固定 token 循环和非法内存访问报告背后的根因类别。

上游仍有两个关注度较高的开放议题：DeepSeek-V4-Flash 的 SM8x/Ampere 支持（[#50576](https://github.com/vllm-project/vllm/issues/50576)），以及 ROCm 的 RDNA4/gfx1201 FP8 支持（[#28649](https://github.com/vllm-project/vllm/issues/28649)）。

## 2. 版本发布与破坏性变更

无。过去 24 小时内未发布任何版本，也没有出现任何 API/配置迁移说明。

## 3. 新增模型与硬件支持

过去 24 小时内没有合入新的模型/硬件支持。

值得关注的进行中工作与未决请求：

- 开放 PR：新增面向 NVIDIA A100 80GB PCIe 调优的 fused-MoE Triton 配置，适配 TP=2 下 Qwen3.5-122B-A10B 的 MoE shape（[PR #55511](https://github.com/vllm-project/vllm/pull/55511)）。
- 开放 PR：在 Triton 不可用时，为 `MambaHybridModelState.batch_memcpy` 提供 CPU/macOS 回退路径，修复 CPU 上混合 Mamba 模型崩溃的问题（[PR #55480](https://github.com/vllm-project/vllm/pull/55480)）。
- 开放 PR：让 encoder-only/embedding 后端选择逻辑忽略全局 `--kv-cache-dtype`，修复设置了 KV cache dtype 后 encoder-only 服务无法正常工作的问题（[PR #55482](https://github.com/vllm-project/vllm/pull/55482)）。
- 开放功能请求：使 DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731 可在 SM8x Ampere GPU 上运行（[#50576](https://github.com/vllm-project/vllm/issues/50576)）。
- 开放功能请求：支持 MiniCPM-SALA 模型（[#41641](https://github.com/vllm-project/vllm/issues/41641)）。
- 开放功能请求：向 `vllm-rocm` 上游合入 RDNA4/gfx1201 FP8 补丁（[#28649](https://github.com/vllm-project/vllm/issues/28649)）。

## 4. 性能与优化

- **A100 fused-MoE 调优**：开放 PR 新增了一个面向 A100 80GB PCIe 调优的 fused-MoE Triton 配置（E=256, N=512, BF16），适用于 TP=2 下的 Qwen3.5-122B-A10B（[PR #55511](https://github.com/vllm-project/vllm/pull/55511)）。
- **Qwen3.8-Flash-Next 上的 FP8 KV cache**：有贡献者反馈，在 QSA Triton kernel 中接通缺失的 fp8_e4m3 读取路径后，GB10 上可用的 KV 池相较 BF16 大约翻倍。该补丁目前仅经单机验证，尚待更多复现确认（[#54426](https://github.com/vllm-project/vllm/issues/54426)）。
- **W8A8 解码性能回退仍待解决**：llmcompressor 的 W8A8 解码速度慢于 FP16；Perfetto 跟踪显示瓶颈在 W8A8 kernel 本身（[#38697](https://github.com/vllm-project/vllm/issues/38697)）。
- **基准测试一致性**：开放 PR 修复 TTFT/TPOT 的统计口径，使各服务端点间的流式延迟统计保持一致（[PR #55508](https://github.com/vllm-project/vllm/pull/55508)）。
- **sleep/wake 后的主机内存**：开放 PR 在 `wake_up` 之后按需释放锁页主机内存，避免 vLLM 在经历一次 sleep 周期后，于进程的整个生命周期内持续持有一块与模型权重同等大小的主机内存（[PR #55206](https://github.com/vllm-project/vllm/pull/55206)）。

## 5. 稳定性与回归问题

大致按严重程度排序：

- **GDN/Mamba 混合模型 + 前缀缓存 + MTP 在 v0.28.0 中仍会破坏输出**（[#53912](https://github.com/vllm-project/vllm/issues/53912)）。相关报告包括：MTP/dflash 下前缀缓存被静默禁用（[#54360](https://github.com/vllm-project/vllm/issues/54360)）、与提示词无关的固定 token 循环，以及 MTP 接受率崩塌（[#55357](https://github.com/vllm-project/vllm/issues/55357)）。
- **v0.28.0 新增的启动回归问题**：有报告称 v0.28.0 在进程启动时耗尽所有主机内存并卡死，而同一主机上 v0.27.1 工作正常（[#54237](https://github.com/vllm-project/vllm/issues/54237)）。
- **混合 Mamba 前缀缓存恢复时的非法内存访问**：`MambaHybridModelState.add_request` 以错误的 block size 初始化对齐状态（[#53142](https://github.com/vllm-project/vllm/issues/53142)）。已有直接修复的开放 PR：[PR #55507](https://github.com/vllm-project/vllm/pull/55507)。
- **Mamba 投机解码 block 索引缺陷**：在流水线并行 + MTP + 前缀缓存场景下，开放修复将投机解码的 block table 查找从 batch 行改为按 per-request slot 进行，以避免退化 token 循环（[PR #55506](https://github.com/vllm-project/vllm/pull/55506)）。
- **混合投机 batch 中的 GDN 状态恢复**：开放 PR 修复了请求在混合 batch 中从投机解码切换到常规解码时的状态丢失问题（[PR #55504](https://github.com/vllm-project/vllm/pull/55504)）。
- **Prefill 被错误派发至投机解码 CUDA graph**：prefill batch 可能被误分类为 uniform decode（纯 decode）批次，并被派发进完整的投机解码 CUDA graph，导致混合模型静默丢失状态（[#53051](https://github.com/vllm-project/vllm/issues/53051)）。
- **NIXL 分离式部署段错误**：prefill pod 重启后，decode 实例在 `loadRemoteMD` 中发生段错误（[#49238](https://github.com/vllm-project/vllm/issues/49238)）。针对失效的 NIXL pull-peer 元数据的修复 PR 已开放（[PR #55471](https://github.com/vllm-project/vllm/pull/55471)）。
- **FP8 KV cache 正确性**：在默认缩放（scaling）设置下，`kv_cache_dtype="fp8_e5m2"` 会静默破坏 Qwen-VL / Qwen2.5-VL 的输出（[#41343](https://github.com/vllm-project/vllm/issues/41343)）。
- **工具调用正确性缺陷**：OpenAI 的 `strict` 标志会泄漏到模型可见的聊天模板中（[#52741](https://github.com/vllm-project/vllm/issues/52741)）；Gemma4 解析器会丢弃裸的 `<|tool_call|>` 起始标记（[#53431](https://github.com/vllm-project/vllm/issues/53431)）；使用 OpenAI content 格式时 Qwen2.5 解析器会失败（[#54491](https://github.com/vllm-project/vllm/issues/54491)）。
- **停止 token 截断不一致**：`include_stop_str_in_output=False` 此前不会对停止 token ID 生效；修复 PR 已开放（[PR #55483](https://github.com/vllm-project/vllm/pull/55483)）。
- **NVFP4 静默跳过权重风险**：加载后 `weight_scale` 全零意味着 FP4 权重被跳过。开放 PR 让 vLLM 快速失败而不是输出垃圾内容（[PR #52501](https://github.com/vllm-project/vllm/pull/52501)）。

## 6. 对应用开发者的启示

- **现阶段请谨慎使用 GDN/Mamba 混合模型 + 投机解码。** 如果你通过 MTP/EAGLE 和前缀缓存为 Qwen3.x “Flash/Next” 风格混合模型提供推理服务，请先在回归测试中验证输出，再放心上线。关注 [PR #55506](https://github.com/vllm-project/vllm/pull/55506)、[PR #55507](https://github.com/vllm-project/vllm/pull/55507) 和 [PR #55504](https://github.com/vllm-project/vllm/pull/55504)，它们直接针对这类故障。
- **请谨慎锁定版本。** v0.28.0 在某些环境下可能存在启动时占满主机内存的回归问题（[#54237](https://github.com/vllm-project/vllm/issues/54237)）；据报道，该场景下 v0.27.1 可以正常工作。
- **不要认为 `strict` 工具调用是透明的。** `strict` 标志会改变模型看到的内容，且多个厂商的解析器仍有缺陷。请按模型解析器逐一测试工具调用路径。
- **警惕量化/KV cache 配置引发的静默正确性故障。** Qwen-VL 上的 FP8 KV cache（[#41343](https://github.com/vllm-project/vllm/issues/41343)），以及 NVFP4 中 BF16 层被跳过（[PR #52501](https://github.com/vllm-project/vllm/pull/52501)），都可能在无报错的情况下破坏输出。在这些修复合入前，建议在你们自己侧加入快速失败校验。
- **基准测试数据需要统一口径。** TTFT/TPOT 的定义目前才刚开始在各服务端点之间拉齐；跨服务端点延迟对比时，应考虑到当前存在的口径差异——该差异正由 [PR #55508](https://github.com/vllm-project/vllm/pull/55508) 修复。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 技术文摘 — 2026-09-06

## 1. 今日亮点

SGLang 发布了 **v0.5.19**。这是一个覆盖面很广的累积版本，汇聚了 214 位贡献者提交的 786 个 PR，核心亮点是新增对 **Qwen3.8（2.4T-A95B）** 的支持。运维侧，Fast Engine Recovery 路线图显示，Weight Cache Daemon 第一阶段可将 Qwen3-235B FP8 的每个 rank 权重加载时间从约 306–327 秒压缩到 1 秒以内（[#33522](https://github.com/sgl-project/sglang/issues/33522)）。目前上游的精力主要集中在三块：在 `tokenspeed_mla` 上完成 Kimi Linear / NoPE-MLA FP8 prefill 的稳定性收尾（[#38149](https://github.com/sgl-project/sglang/pull/38149)、[#38158](https://github.com/sgl-project/sglang/pull/38158)）、填补 Blackwell 统一内存 decode-CP 的性能差距（[#37926](https://github.com/sgl-project/sglang/pull/37926)），以及两个尚未解决的内存/正确性问题：NVFP4 Marlin 回退泄漏和 Kimi-K3 跨提示词泄漏报告。

## 2. 版本发布与破坏性变更

- **[v0.5.19](https://github.com/sgl-project/sglang/releases/tag/v0.5.19)** — 累积发布（786 个 PR / 214 位贡献者）。新增 Qwen3.8 cookbook / 模型支持表。发布说明没有标记显式的 CLI/API 破坏性变更；不过鉴于 PR 跨度很大，从较老的 v0.5.x 固定版本升级时，请验证 sampling 与 attention 相关 flag 是否仍符合预期。
- **prefill-CP v1 弃用中** — [PR #36228](https://github.com/sgl-project/sglang/pull/36228)（“CP V1 Deprecation 3/5”）移除了通用 prefill-CP v1 运行时以及 DSA v1 的 in-seq-split indexer / 后端路径，同时保留了 runner 边界处的输入分片和 token-ID 布局交接。依赖 prefill-CP v1 的团队应跟随迁移方向，转向 attention 侧 CP 和当前正在推进的 overlap 调度方案。
- **Rust 迁移 RFC 仍是 open 状态** — [Issue #23206](https://github.com/sgl-project/sglang/issues/23206) 提议将不涉及 GPU 的 SGLang 进程迁移到 Rust。目前还不构成破坏性变更，但它预示着控制面的演进方向。

## 3. 新模型与硬件支持

- **Qwen3.8（2.4T-A95B），自回归** — v0.5.19 中新增；参见 [cookbook](https://docs.sglang.io/cookbook) 和 [PR #35758](https://github.com/sgl-project/sglang/pull/35758)。
- **Kimi Linear / NoPE MLA 加固** — [PR #38149](https://github.com/sgl-project/sglang/pull/38149) 新增 skip-RoPE 的 `tokenspeed_mla` prefill 支持；[PR #38158](https://github.com/sgl-project/sglang/pull/38158) 修复了 NoPE MLA 层的 FP8 prefill。两者都针对 B200 / DGX-Blackwell 上的 Kimi Linear 架构。
- **AMD/ROCm 稀疏 MLA** — [PR #30575](https://github.com/sgl-project/sglang/pull/30575) 为 ROCm 上的 FP8 DSA 路径新增纯 Triton 稀疏 MLA prefill / decode 后端（`--dsa-prefill-backend triton`、`--dsa-decode-backend triton`）。
- **deepep_v2 BF16 检查点** — [PR #38160](https://github.com/sgl-project/sglang/pull/38160) 移除了 `--moe-a2a-backend deepep_v2` 只接受 128×128 blockwise FP8 expert 的硬性限制，从而支持 BF16 通信。
- **SM89/Ada**：为 DeepSeek-V4-Flash-FP8 添加 SM89/L20 支持的请求因长期无活动被关闭（[#28618](https://github.com/sgl-project/sglang/issues/28618)）；除非该 issue 被重新打开，否则 Ada 仍只能依赖下游补丁。

## 4. 性能与优化

- **Fast Engine Recovery — Weight Cache Daemon**（[#33522](https://github.com/sgl-project/sglang/issues/33522)）：第一阶段已通过 [#27139](https://github.com/sgl-project/sglang/pull/27139) 合入。每个 rank 上的守护进程持有量化完成后的权重，并通过 CUDA IPC 提供给推理进程，将 Qwen3-235B FP8 的权重加载时间从约 306–327 秒降至 **<1 秒**。这是本周期内对 serving 运维影响最大的一项改进。
- **Blackwell 统一内存 decode-CP 差距**（[PR #37926](https://github.com/sgl-project/sglang/pull/37926)）：Hopper 上的修复没有同步到 B300；在 TP2/DCP2 + `cutedsl_mla` 的 Kimi-Linear 上，统一内存池比静态内存池慢 1.96%。该 PR 用于弥补这一差距。
- **采样掩码 + 重叠调度**（[PR #36631](https://github.com/sgl-project/sglang/pull/36631)）：将采样掩码输出保留在 sampler 内的 GPU 上，避免 CPU 同步。
- **TRTLLM all-reduce 精度**（[PR #36143](https://github.com/sgl-project/sglang/pull/36143)）：使用 FP32 all-reduce 缓冲区（进行中）。
- **调度器/采样/流式输出开销审计**（[Issue #36226](https://github.com/sgl-project/sglang/issues/36226)）：自动化重构审查识别出 scheduler、sampling 和 streaming 路径中可能存在的可避免开销，可作为 profiling 时的候选清单。
- **基准测试计时语义敲定**（[PR #37973](https://github.com/sgl-project/sglang/pull/37973)）：明确 `itl` 按 stream 事件记录，而不是按 token 记录——在对比 benchmark 与引擎吞吐数据时这一点很重要。
- **扩散模型调优指引**（[PR #38148](https://github.com/sgl-project/sglang/pull/38148)）：基于 B300/GB300 profiling 得出的 per-model 调优决策表（`--warmup-mode`、可打断 CUDA Graph、逐层 offload）。
- **仍需调优**：DSv4 top-k v2 的 cooperative-cluster 启动参数仍是硬编码、源自 B200 的 `constexpr` 值，且没有 autotune 路径（[#37150](https://github.com/sgl-project/sglang/issues/37150)）。

## 5. 稳定性与回归问题

按严重程度排序；已有修复的条目已注明。

1. **Kimi-K3 跨提示词推理泄漏**（[#34259](https://github.com/sgl-project/sglang/issues/34259)）— 多租户使用场景下严重的隔离/正确性缺陷；目前还没有修复 PR。相关的 Kimi-K3 崩溃（[#34260](https://github.com/sgl-project/sglang/issues/34260)）已关闭，但主跟踪 issue（[#32970](https://github.com/sgl-project/sglang/issues/32970)）仍列有未解决项。
2. **NVFP4 MoE Marlin 回退内存泄漏**（[#38074](https://github.com/sgl-project/sglang/issues/38074)）— 通过被持有的 `{fqn: tensor}` 注册表，每层泄漏约 0.66 GiB；在 ≤48 GB 显存的显卡（如 L20）上运行 Qwen3.8-Flash-Next 这类 FP4 检查点会导致 OOM。目前没有修复 PR。
3. **MiniMax-M3 W4A16 在 sm_121 上输出全 NUL token**（[#38143](https://github.com/sgl-project/sglang/issues/38143)）— 通过 Triton MiniMaxSparse 路径在 2× DGX Spark（TP=2）上运行时，每个 token 的 id 都是 0；同一份权重在 vLLM 上正常。尚未在 v0.5.19 上重新测试。
4. **权重加载期间调度器 OOM**（[#37931](https://github.com/sgl-project/sglang/issues/37931)）— DeepSeek-V4-Flash-Vision 在 2× DGX Spark 上执行 FP8→FP4 MoE 转换时被 OOM kill；在官方开发镜像上连续五次启动均能复现。
5. **GLM-5-NVFP4 + EAGLE 在 B300 上崩溃**（[#25563](https://github.com/sgl-project/sglang/issues/25563)）— 在 bs=128 的 draft graph 捕获阶段通过 TRTLLM batched GEMM 派发了一个 sm100f kernel。回归表现：v0.5.12-cu130 崩溃，v0.5.11 正常。
6. **HiCache 主机内存容量计算把同机部署的 rank 重复计算**（[#38156](https://github.com/sgl-project/sglang/issues/38156)）— 修复进行中：[PR #38157](https://github.com/sgl-project/sglang/pull/38157) 会在预算拆分前按 TP group 只读取一次主机内存。
7. **trie 增长后 NGRAM 仍沿用过期的未命中缓存**（[#38129](https://github.com/sgl-project/sglang/issues/38129)）— 当插入操作使原本缺失的后缀变为可用后，NGRAM 草稿仍停留在过期状态；修复见 [PR #38130](https://github.com/sgl-project/sglang/pull/38130)。
8. **CI：Kimi Linear `tokenspeed_mla` FP8 NoPE 失败** — main 上有三个 B200 任务失败；[#38158](https://github.com/sgl-project/sglang/pull/38158) 为修复。
9. **CI/基础设施维护**：自动收集的 CUDA coredump tracker（[#26340](https://github.com/sgl-project/sglang/issues/26340)）仍是观察崩溃回归的最佳信号来源（293 个事件）；HiCache radix-cache 活锁测试（[#38019](https://github.com/sgl-project/sglang/issues/38019)）已关闭；AMD PR 测试收集仍存在 import 阶段崩溃的失败项（[#37451](https://github.com/sgl-project/sglang/issues/37451)）。
10. **Stale-bot 清理**：本周期内许多六月至七月的报告因长期无活动被关闭——包括 DeepSeek-V4 PD TTFT 回归（[#30084](https://github.com/sgl-project/sglang/issues/30084)）、GLM-5.2-FP8 shape 报错（[#30037](https://github.com/sgl-project/sglang/issues/30037)）、prefill 中止后 PD decode 输出乱码（[#30233](https://github.com/sgl-project/sglang/issues/30233)），以及 Mooncake rdma+hip 不稳定（[#30190](https://github.com/sgl-project/sglang/issues/30190)）。如果在 v0.5.19 上仍可复现，请附上复现方式重新打开。

## 6. 对应用开发者的意义

- **升级到 v0.5.19 以获得新模型支持**；但在相关修复合入上游之前，请在 B300 上使用 GLM-5-NVFP4 + EAGLE、在 DGX Spark 上使用 MiniMax-M3 W4A16 的场景中继续固定 v0.5.11 / v0.5.18。
- **Weight Cache Daemon 改变了大模型重启的成本结构。** 权重加载从约 5 分钟缩短到 1 秒以内，让 Qwen3-235B 级 FP8 部署的快速缩容/扩容、滚动升级和故障恢复都变得可行——请提前规划每个 rank 上 CUDA IPC 守护进程的生命周期管理。
- **在跨提示词泄漏问题解决前，请勿在多租户/共享环境中提供 Kimi-K3 服务**；在跟踪 issue（[#32970](https://github.com/sgl-project/sglang/issues/32970)）里的缺陷修复前，请隔离租户或对模型访问进行限制。
- **在 ≤48 GB 显存的 GPU 上服务会回退到 Marlin 的 NVFP4 MoE 检查点时，请密切关注显存占用**——约 0.66 GiB/层的泄漏最终会导致 OOM；请逐层监控内存占用，并考虑固定在修复前的版本或禁用回退路径。
- **如果使用 NGRAM 投机解码（BFS/PROB），** 请等待 [PR #38130](https://github.com/sgl-project/sglang/pull/38130) 合入后，再依赖新插入的更长上下文来生成草稿。
- **PD 分离用户**：prefill→decode 的失败通知机制正在 Mooncake / NIXL / Mori 之间统一（[PR #36612](https://github.com/sgl-project/sglang/pull/36612)）；在此之前，NIXL 传输可能会一直静默等待，直到默认的 300 秒超时。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 文摘 — 2026-09-06

## 今日重点

过去 24 小时内共落地三个补丁版本：b10817 添加了 SYCL 内存分配追踪；b10818 恢复了 SYCL 的 Kronecker/FWHT 支持并修复了 backend-ops CI 故障；b10819 修复了 Metal 提前返回路径上的内存泄漏。性能方面，Vulkan IQ4_XS kernel 相关工作在 **RDNA4 上实现了约 +6-17% 的 token 生成性能提升**，另有多项 CUDA 正确性修复正在审查中。更高严重性的回归问题仍处于打开状态，包括 Blackwell SOFT_MAX 崩溃、ROCm RPC TOP_K 失败，以及 RDNA4/FLASH-ATTN 的 prompt 处理性能问题。

## 发布与破坏性变更

- **b10819** — Metal：修复提前返回路径中的内存泄漏（[#28399](https://github.com/ggml-org/llama.cpp/pull/28399)）
- **b10818** — SYCL：修复 test-backend-ops CI 故障；恢复 Kronecker 乘积/FWHT 支持（[#28254](https://github.com/ggml-org/llama.cpp/pull/28254)、[#28016](https://github.com/ggml-org/llama.cpp/issues/28016)）
- **b10817** — SYCL：通过 `GGML_SYCL_MEMTRACE` 按调用点标注设备内存分配（[#27631](https://github.com/ggml-org/llama.cpp/pull/27631)）

这些版本未引入面向用户的破坏性 API 或配置变更。SYCL 内存追踪变量是新增特性，不影响现有行为。

## 新模型与硬件支持

- 打开中的 PR 添加 `HrmTextForCausalLM` / DFM Mimir 1B 支持（[#27625](https://github.com/ggml-org/llama.cpp/pull/27625)）
- Hy4-preview 转换重构已准备合并，将 HC 张量映射移入全局张量映射表（[#28451](https://github.com/ggml-org/llama.cpp/pull/28451)）
- 后端/硬件支持：
  - HIP：补充缺失的 AMD GCN MMQ 配置，避免回退到 RDNA2（[#27841](https://github.com/ggml-org/llama.cpp/pull/27841)）
  - OpenCL：修复 Adreno GPU 上暴露的中止路径问题（[#27630](https://github.com/ggml-org/llama.cpp/pull/27630)）
  - Windows：搜索后端 DLL 所在目录以查找依赖，修复显式加载后端时出现的错误 126（[#28010](https://github.com/ggml-org/llama.cpp/pull/28010)）

## 性能与优化

- **Vulkan IQ4_XS 解码 kernel**：
  - 使用专用 `mul_mat_vec_iq4_xs` DMMV shader 取代通用回退实现：RDNA4 上 token 生成约 **+6-17%**，具体视模型而定（[#28426](https://github.com/ggml-org/llama.cpp/pull/28426)）
  - IQ4_XS MMQ/MMV 矩阵乘法 kernel 避开慢速的通用浮点转换路径（[#28415](https://github.com/ggml-org/llama.cpp/pull/28415)）
- **Vulkan 小 M 优化（面向 Qwen 形态负载）**：通过交换 A/B 支持 m=1，并改进小 M 时的 tile 大小选择与 split_k（[#28457](https://github.com/ggml-org/llama.cpp/pull/28457)）
- **Metal**：为 M2 Max 添加覆盖 Q4_0/Q4_1/Q5_0/Q5_1 的 `fa-vec` 调优行（[#28458](https://github.com/ggml-org/llama.cpp/pull/28458)）
- **CPU**：为 `llamafile_sgemm` 提出 TQ2_0 x Q8_K 分块预填充 kernel（[#28452](https://github.com/ggml-org/llama.cpp/pull/28452)）；为 ARM 添加 TQ2_0 8x8 分块 GEMM（i8mm/SMMLA）（[#27589](https://github.com/ggml-org/llama.cpp/pull/27589)）
- **MTP**：PR 将多 ubatch 解码执行串行化，目标是解决 MTP 预填充期间的主机级锁问题（[#26827](https://github.com/ggml-org/llama.cpp/pull/26827)）
- **SYCL**：针对 Gemma 4 26B A4B FlashAttention 形状进行性能调优，包括补齐 D=512 时缺失的 GQA dispatch 场景（[#28450](https://github.com/ggml-org/llama.cpp/pull/28450)）

## 稳定性与回归问题

按严重程度排列的未解决/审查中问题：

- **Blackwell CUDA SOFT_MAX 崩溃** —— 在 RTX 5090 / 大模型负载上仍未关闭；尚无确认合入的修复（[#25060](https://github.com/ggml-org/llama.cpp/issues/25060)）
- **ROCm RPC 服务器在 TOP_K 上崩溃** —— 分布式 Qwen3.8-Flash-Next 推理期间报 “invalid configuration argument”（[#27865](https://github.com/ggml-org/llama.cpp/issues/27865)）
- **qwen4exp 多段提示词回归** —— 在 gfx1151 上使用多段提示词时会稳定复现地生成 `//////`（[#27797](https://github.com/ggml-org/llama.cpp/issues/27797)）
- **Metal Gemma 4 E4B Q8_0 解码性能回归** —— b9730 与 b10219 之间解码变慢约 13%；Qwen 模型不受影响（[#26470](https://github.com/ggml-org/llama.cpp/issues/26470)）
- **Windows OpenVINO 构建启动失败** —— 缺少 OpenSSL / `openvino.dll` / `tbb12.dll` 的打包问题（[#24729](https://github.com/ggml-org/llama.cpp/issues/24729)）
- **CUDA FlashAttention 静默回退 CPU** —— 不支持的 KV cache 类型与 `-fa` 搭配使用时，attention 会在 CPU 上运行，prefill 性能下降最高约 8 倍；PR 会添加 `LOG_WARN`（[#28456](https://github.com/ggml-org/llama.cpp/pull/28456)）
- **审查中的 CUDA 正确性修复**：
  - 修复 f16 FA kernel 中分散的 block-wide barrier 问题（[#27870](https://github.com/ggml-org/llama.cpp/pull/27870)）
  - 修复因 in-place keys 与 CUB 内部缓冲区发生别名（aliasing）而导致的 CUB `argsort` 数据损坏（[#28389](https://github.com/ggml-org/llama.cpp/pull/28389)）
- **Grammar/结构化输出缺陷** —— 仍未解决；嵌套的 `maxLength` 与空对象 schema 会产生无效 GBNF（[#25746](https://github.com/ggml-org/llama.cpp/issues/25746)、[#25923](https://github.com/ggml-org/llama.cpp/issues/25923)）；此外，当最终解析分隔符从未出现时，`common_peg_until_parser` 也会报告 SUCCESS（[#27772](https://github.com/ggml-org/llama.cpp/issues/27772)）

## 对应用开发者的影响

- **如果你使用 Metal，请升级到最新补丁版本**：b10819 包含一个提前返回路径上的内存泄漏修复。
- **如果你在 CUDA 上使用 FlashAttention**，请注意 `q5_0/q5_1/q4_1` 等不支持的 KV cache 类型可能会静默回退到 CPU attention。等 [#28456](https://github.com/ggml-org/llama.cpp/pull/28456) 合入后会记录日志，但在此之前，请确认 FA 确实运行在 GPU 上。
- **使用工具调用/结构化输出的用户应继续预先校验 JSON schema。** 若干部落生成器边界情况会以 `failed to parse grammar` 拒绝合法请求，尤其是大型嵌套 `maxLength` 约束和空对象 schema。
- **AMD/ROCm 与 RDNA4 部署需要在深上下文场景下进行基准测试。** ROCm RPC TOP_K 崩溃以及此前 RDNA4 native-MMA-FA 回归报告都说明，在推出分布式 Qwen 类模型之前应验证长上下文 prompt 处理。
- **在 Windows 上使用显式后端路径的嵌入方**应将所有依赖 DLL 与后端 DLL 放在同一目录，或等待 [#28010](https://github.com/ggml-org/llama.cpp/pull/28010) 中的 DLL 搜索路径修复。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-06

**源码快照：** github.com/ollama/ollama

## 1. 今日要点

过去 24 小时内没有新的 Ollama release tag 落地。最有价值的动态是一组配套 PR，修复了多个启动器（launcher）与 MLX runner 的上下文长度处理问题，另有 PR 解决了内存失控与工具调用正确性的缺陷。在 issue 追踪器上，最集中的主题是：推理 token 泄漏导致的 agent 循环故障、llama-server 的 prompt 缓存引发的宿主机内存超限，以及损坏的低比特量化产物。

## 2. 版本发布与破坏性变更

- **过去 24 小时内无发布。** 没有 release tag、迁移说明或公开 API/配置变更需要报告。

## 3. 新模型与硬件支持

本窗口期内没有面向用户的模型/后端发布。值得关注的进行中工作：

- **为 MLX runner 增加 Qwen 静态 YaRN 上下文支持** — [PR #18263](https://github.com/ollama/ollama/pull/18263) 为 Qwen3.5/3.8 的文本 RoPE 与多模态 M-RoPE 加入 YaRN 频率/注意力缩放，使上下文可达到 `factor * original_max_position_embeddings`。
- **旧版 glm-OCR GGUF 兼容性** — [PR #17195](https://github.com/ollama/ollama/pull/17195) 将 `<|user|>` 注册为旧版 `glmocr` GGUF 的生成结束 token，修复了输出无限重复的问题。
- **单 GPU VRAM 预测（WIP）** — [PR #18198](https://github.com/ollama/ollama/pull/18198) 建议依据公开的 head 维度和实测负载来预测 VRAM 用量，以改进调度器决策。

## 4. 性能与优化

- **llama-server 的 prompt 缓存导致每个 runner 无上限消耗约 8 GiB 宿主机内存** — [Issue #18264](https://github.com/ollama/ollama/issues/18264)。llama.cpp 的 `--cache-ram` 默认值为 **8192 MiB**；即使模型已完全卸载到 GPU，仍会占用 8 GiB 系统内存，且不计入 Ollama 的内存统计。修复 PR：[PR #18265](https://github.com/ollama/ollama/pull/18265) 引入了 `OLLAMA_CACHE_RAM` 上限。
- **MLX 前缀缓存恢复被截断为 8192 token 的倍数** — [Issue #18267](https://github.com/ollama/ollama/issues/18267)。冷 prompt 之后最多会有 8191 个 token 需要重新预填充，在 agent 工作负载上固定增加 **17–27 秒** 的开销。截至本摘要发出时仍为打开状态。
- **启动器上下文对齐工作** — [PR #18259](https://github.com/ollama/ollama/pull/18259) 让 Codex CLI 的模型目录与 Ollama 已验证的运行时上下文对齐，而不是回退到 128K；[PR #18258](https://github.com/ollama/ollama/pull/18258) 对 Qwen Code 作了相同的处理，避免它在 Ollama 实际运行更小上下文时默认假设为 1,000,000-token。
- **MLX runner 现在会强制执行请求的上下文** — [PR #18261](https://github.com/ollama/ollama/pull/18261) 将调度器选定的 `num_ctx` 传入 MLX 子进程，并向 `/api/ps` 回报有效上下文。

## 5. 稳定性与回归

按实际严重程度排序：

- **严重：`</think>` 泄漏导致 31M-token 的 agent 工具调用死循环** — [Issue #17617](https://github.com/ollama/ollama/issues/17617)。`deepseek-v4-flash:cloud` 将字面量 `</think>` 泄漏进助手历史，导致 Claude Code 连续发出 193 次完全相同的工具调用。修复 PR：[PR #18260](https://github.com/ollama/ollama/pull/18260) 让 `deepseek3.go` 不再在重放的助手历史中遇到第一个字面量 `</think>` 时进行截断。
- **高：llama-server 的 prompt 缓存导致每个 runner 增加约 8 GiB 宿主机内存** — [Issue #18264](https://github.com/ollama/ollama/issues/18264)。Ollama 的内存统计看不到这部分占用，且在 [PR #18265](https://github.com/ollama/ollama/pull/18265) 合并之前无法配置。
- **高：MLX runner 忽略 `num_ctx`，长预填充时触发 Metal 看门狗 panic** — [Issue #18125](https://github.com/ollama/ollama/issues/18125)。修复 PR：[PR #18261](https://github.com/ollama/ollama/pull/18261)。
- **高：低比特 Qwen2.5-Coder-3B 库产物功能损坏** — [Issue #18252](https://github.com/ollama/ollama/issues/18252)。`q2_K`、`q3_K_S`、`q3_K_M`、`q3_K_L` 在代码冒烟测试中得分 **0/15**，而同级别的其他量化方案得分 87–100%。
- **中：macOS GPU 重置使 runner 进入损坏的 Metal 状态** — [Issue #18213](https://github.com/ollama/ollama/issues/18213)。`/api/generate` 返回 HTTP 200，但响应为空，直到重启才恢复。
- **中：Windows 上 GTX 1080 Ti 的 CUDA 探测崩溃** — [Issue #16957](https://github.com/ollama/ollama/issues/16957)。进程启动时出现 `0xc0000005`；该 issue 仍处于打开状态，已有 13 条评论。
- **中：Anthropic `/v1/messages` 无法解析数组项中包含 `\/` 或 `\-` 的工具 schema** — [Issue #18226](https://github.com/ollama/ollama/issues/18226)。返回 HTTP 400 `failed to parse grammar`。修复 PR：[PR #18248](https://github.com/ollama/ollama/pull/18248) 在转发到 llama-server 前对转义的 pattern 字面量进行规范化。
- **中：Gemma3 结构化输出在双引号词项处截断** — [Issue #18094](https://github.com/ollama/ollama/issues/18094)。响应以 `done_reason: "stop"` 提前停止，且 `eval_count` 极低。
- **中：工具调用解析器误报 / 工具参数格式错误** — [Issue #17602](https://github.com/ollama/ollama/issues/17602) 报告 Laguna 解析器将普通 JSON 内容误判为工具调用；[Issue #17882](https://github.com/ollama/ollama/issues/17882) 报告 Gemma4 生成了 `key=value` 形式的工具参数，导致解析失败。
- **中：共享模型选项缓存可被请求级选项修改** — 修复 PR：[PR #18253](https://github.com/ollama/ollama/pull/18253) 对缓存的模型选项进行深拷贝，防止跨请求污染。

## 6. 对应用开发者的启示

- **不要信任客户端的上下文默认值。** Codex 和 Qwen Code 中的启动器缺陷表明，对外宣称的上下文窗口可能大于 Ollama 实际有效的 runner 上下文，或与它不一致。在规划大型 agent prompt 的预算之前，请检查 `/api/ps`，或等待 [PR #18249](https://github.com/ollama/ollama/pull/18249) 加入上下文来源日志。
- **在应用层限制 agent 工具调用循环。** [Issue #17617](https://github.com/ollama/ollama/issues/17617) 中的 31M-token 循环是一个极端的例子：客户端应强制设置最大迭代次数和 token 预算，并重放原始助手历史，而不是经过文本裁剪的历史。
- **运行长驻服务时注意宿主机内存。** 完全卸载到 GPU 的 runner 仍可能为 llama-server 的 prompt 缓存消耗约 8 GiB 系统内存。如果你自行托管多个 runner，请跟踪 RSS，并将 [PR #18265](https://github.com/ollama/ollama/pull/18265) 中的 `OLLAMA_CACHE_RAM` 视为未来的控制手段。
- **工具 schema 目前对转义字符敏感。** 在 [PR #18248](https://github.com/ollama/ollama/pull/18248) 合入之前，使用 Anthropic 兼容端点时，请避免在数组 `items` 内的 `pattern` 字符串中使用 `\/` 或 `\-`。
- **为小型代码模型选择量化方案时务必谨慎。** [Issue #18252](https://github.com/ollama/ollama/issues/18252) 中损坏的 Qwen2.5-Coder-3B 低比特产物提醒我们：应在真实任务上验证量化模型的行为，而不只是看困惑度（perplexity）或生成流畅度。
- **MLX 用户应关注上下文强制修复。** 如果你在 Apple Silicon 上以长上下文运行 Qwen 模型，[PR #18261](https://github.com/ollama/ollama/pull/18261) 和 [PR #18263](https://github.com/ollama/ollama/pull/18263) 与避免 Metal 看门狗崩溃、正确遵循 `num_ctx` 直接相关。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 文摘 — 2026-09-06

*覆盖 2026-09-05 至 2026-09-06 的活动。来源：github.com/BerriAI/litellm。窗口期内 0 个 release，48 个 issue 更新，325 个 PR 更新。*

## 今日要点

消费与预算正确性主导了本窗口期：一个预算重置 bug 会让消费被永久静默清零（[#39370](https://github.com/BerriAI/litellm/issues/39370)）；自 v1.99.0 起，上游返回 `id:null` 的提供商会静默丢弃消费日志（[#39749](https://github.com/BerriAI/litellm/issues/39749)）；另有修复让护栏成本在缓存命中时得以保留（[#39960](https://github.com/BerriAI/litellm/pull/39960)）。当前最严重的未决正确性问题是流式回归：重分块器会丢弃 `tool_calls[].id` 与 `function.name`（[#39796](https://github.com/BerriAI/litellm/issues/39796)）；曾导致 Anthropic/Bedrock/Vertex/Azure 请求返回 400 的 `client_side_timeout` 请求体泄漏似乎已经关闭（[#39899](https://github.com/BerriAI/litellm/issues/39899)）。路由加固也有一组相关更新：AutoRouter 事件循环阻塞、自适应路由器冷启动先验、以及成本加权评分回退（[#39954](https://github.com/BerriAI/litellm/pull/39954) – [#39957](https://github.com/BerriAI/litellm/pull/39957)）。

## 版本发布与破坏性变更

- 过去 24 小时未发布任何版本。

## 新模型与硬件支持

- 本窗口期未新增基础模型、量化或硬件后端（CUDA/ROCm/Metal/CPU）支持。最接近的条目包括：
  - **Cohere Parse OCR** 的 `cohere` 与 `azure_ai` 配置（[PR #39862](https://github.com/BerriAI/litellm/pull/39862)，已关闭）。
  - 用于复杂度路由的 **Switchyard 能力分类器** — 复现 Switchyard 的能力预测，并在缺少判定时安全失败（[PR #39961](https://github.com/BerriAI/litellm/pull/39961)，开放中）。
  - **Anthropic 工作负载身份联合**与可插拔身份源（[PR #39935](https://github.com/BerriAI/litellm/pull/39935)，开放中）。
  - **OpenRouter 视频生成**支持请求仍未实现（[#27724](https://github.com/BerriAI/litellm/issues/27724)，开放中）。

## 性能与优化

- **AutoRouter 冷启动阻塞**：首次请求的语义路由层在事件循环上执行同步 embedding 调用，且没有锁，导致并发下出现重复的冷启动构建。PR [#39954](https://github.com/BerriAI/litellm/pull/39954) 将该构建作为单一共享任务放入工作线程执行。
- **自适应路由器先验持久化**：加载持久化状态时覆盖了单元格的先验，使 `thompson_sample` 出现退化的 `Beta(x,0)`/`Beta(0,x)` 分布。PR [#39955](https://github.com/BerriAI/litellm/pull/39955) 在加载时把持久化增量加回冷启动先验。
- **自适应路由器成本加权**：之前只从 `litellm_params` 读取 `input_cost_per_token`，因此 `model_info` 中声明的自定义定价（其他地方的惯例）会被读作 $0，所有候选在成本上打平。PR [#39957](https://github.com/BerriAI/litellm/pull/39957) 增加对 `model_info` 的回退读取。
- **护栏检查开关**：AIM 与 Cato 现在支持按护栏开启 `inspect_embeddings`，用于对索引文档文本进行策略检查；默认关闭以保持原有的跳过行为（[PR #39918](https://github.com/BerriAI/litellm/pull/39918)）。
- **Fireworks AI 兼容性**：入站消息现在会移除某些提供商拒绝的 `reasoning_details` 字段（[PR #39962](https://github.com/BerriAI/litellm/pull/39962)）。
- **启发式调优的许可证边界**：首次基于数据库启动时会对 heuristic-v1 设置做快照；每个部署允许一个免费的可编辑 auto-router，更多需要许可证（[PR #39952](https://github.com/BerriAI/litellm/pull/39952)）。

## 稳定性与回归问题

*按严重程度排序。*

1. **`client_side_timeout` 泄漏到出站提供商请求体** —— 通过 headers 或 body 设置 `timeout`/`request_timeout`/`stream_timeout` 的请求，在访问 Anthropic、Bedrock、Vertex 和 Azure 时返回 400，错误为 `"Extra inputs are not permitted"`。该问题当天提交并关闭，很可能已在下个版本中修复（[#39899](https://github.com/BerriAI/litellm/issues/39899)）。
2. **流式重分块器丢失工具调用标识** —— 当上游在单个 delta 中返回完整工具调用时，`tool_calls[].id` 与 `function.name` 会丢失，破坏 LiteLLM 1.95.0 上的 agentic 流式透传。**尚无修复 PR，仍处于开放状态**（[#39796](https://github.com/BerriAI/litellm/issues/39796)）。
3. **自 v1.99.0 起消费日志被静默丢弃** —— 当上游返回 OpenAI 形状的 `"id": null` 时（已在 Databricks-Gemini 上观察到），`request_id` 变成 `"None"`，主键冲突（[#39749](https://github.com/BerriAI/litellm/issues/39749)）。
4. **预算重置把消费永久清零** —— 当 `budget_duration = null` 且 `budget_reset_at` 为非 null 的过期值时，相关行会在每次 tick 被选中且永远无法自愈（[#39370](https://github.com/BerriAI/litellm/issues/39370)）。
5. **Vercel AI Gateway 流式响应丢失 `usage.prompt_tokens_details`** —— 流式请求中的缓存提示词 token 按完整输入费率计费（[#39088](https://github.com/BerriAI/litellm/issues/39088)）。
6. **消费计算在异常 token/消息结构上崩溃** —— `cost_per_token` 在 token 计数为 `None`/字符串时崩溃（[#39618](https://github.com/BerriAI/litellm/issues/39618)）；`BudgetManager.projected_cost` 在遇到视觉块或 `null` 消息内容时崩溃（[#39615](https://github.com/BerriAI/litellm/issues/39615)）。
7. **`/user/update` 拒绝文档中记载的 `blocked` 参数** —— 始终返回 400（`LiteLLM_UserTable` 没有该列），导致 Terraform 的 `litellm_user` 资源无法使用（[#39564](https://github.com/BerriAI/litellm/issues/39564)）。
8. **最低延迟路由把 `tpm=0`/`rpm=0` 误读为无限制** —— 原因是一个“假值零”的 `or` 链（[#39744](https://github.com/BerriAI/litellm/issues/39744)）。
9. **A2A 作用域绕过** —— OpenAI 兼容的 `/v1/chat/completions` 若指定 `model: a2a/{agent}`，会跳过原生 A2A 路由上强制执行的 `object_permission.agents` 检查（[#38996](https://github.com/BerriAI/litellm/issues/38996)）。
10. **`register_model` 大小写不敏感合并泄漏配置** —— 一个部署声明的 `max_input_tokens`/`supports_vision` 会泄漏到同模型但大小写不同的部署中，导致错误部署被排除在混合能力组之外（[#39909](https://github.com/BerriAI/litellm/issues/39909)）。
11. **不带 model 的 PATCH 会把 `complexity_router_config` 附加到非 router 部署**（[#39838](https://github.com/BerriAI/litellm/issues/39838)）。
12. **非流式请求在客户端断开时不会取消上游工作** —— 流式 `/chat/completions` 路径据报已通过 #30244/#30245 修复，但非流式路径仍然开放（[#37140](https://github.com/BerriAI/litellm/issues/37140)）。

**窗口内的其他稳定性/隐私 PR**：护栏成本在缓存命中时不再被清零（[#39960](https://github.com/BerriAI/litellm/pull/39960)）；`/key/update` 终于接受 `soft_budget`（[#39002](https://github.com/BerriAI/litellm/pull/39002)）；`/v1/responses` 会为 OpenAI 非推理模型去掉 `reasoning` 参数（与开放的 Codex CLI issue #29818 相关）（[#38842](https://github.com/BerriAI/litellm/pull/38842)）；Admin UI 打包已重建 [#39959](https://github.com/BerriAI/litellm/pull/39959)；gitpython 最低版本提高到 3.1.59，以修复四个安全公告 [#39553](https://github.com/BerriAI/litellm/pull/39553)。

Stale-bot 在本窗口期关闭了一批较旧的 bug——除非你亲自复现过，否则请视为未验证：数据库模式下的 Windows DB 连接失败（[#26594](https://github.com/BerriAI/litellm/issues/26594)）、结合自定义成本的缓存读取定价（[#26807](https://github.com/BerriAI/litellm/issues/26807)）、Cloudflare Workers AI 空内容（[#29353](https://github.com/BerriAI/litellm/issues/29353)）、被忽略的 `InternalServerErrorAllowedFails`（[#29283](https://github.com/BerriAI/litellm/issues/29283)）、OpenRouter 上 qwen 的 `cache_control`（[#29322](https://github.com/BerriAI/litellm/issues/29322)），以及 API 规范输出校验提案（[#21347](https://github.com/BerriAI/litellm/issues/21347)）。

## 对应用开发者的影响

- **如果你使用 Anthropic、Bedrock、Vertex 或 Azure 路由并通过 headers/body 传递超时值，请留意下个补丁版本** —— [#39899](https://github.com/BerriAI/litellm/issues/39899) 的 400 错误影响所有相关提供商；修复已在上游关闭。
- **流式 agent 应用应固定版本并测试工具调用行为。** 如果你依赖 `stream: true` 配合工具并使用 OpenAI 兼容上游，请验证 `tool_call.id`/`function.name` 是否能穿透重分块器 —— [#39796](https://github.com/BerriAI/litellm/issues/39796) 仍然开放且暂无修复。若无法升级，可考虑禁用重分块。
- **如果你运行 Databricks-Gemini 或 Vercel AI Gateway，请审计消费看板。** 当前有两个静默计费问题：`id:null` 响应会让 v1.99.x 完全丢失消费日志（[#39749](https://github.com/BerriAI/litellm/issues/39749)），以及流式请求中的缓存 token 按完整输入价格计费（[#39088](https://github.com/BerriAI/litellm/issues/39088)）。
- **预算管理员注意**：`budget_duration = null` 但带有过期 `budget_reset_at` 的行可能每个 tick 都被清零（[#39370](https://github.com/BerriAI/litellm/issues/39370)）。如怀疑遇到此问题，可在修复前手动清理过期的 `budget_reset_at` 值。
- **自定义定价用户**：在 [#39957](https://github.com/BerriAI/litellm/pull/39957) 合入前，请把成本字段放在 `litellm_params` 中；目前仅在 `model_info` 下声明的价格会在自适应路由成本评分中全部按 $0 打平。
- **Terraform 的 `litellm_user` 用户**：文档中记载的 `blocked` 字段在 `/user/update` 上仍然不可用（[#39564](https://github.com/BerriAI/litellm/issues/39564)）；预算限制的绕开方案应使用 `/key/update`，因为其 `soft_budget` 支持正在落地（[#39002](https://github.com/BerriAI/litellm/pull/39002)）。
- **社区贡献节奏是一个风险**：维护者承认两个外部 PR（如 Vertex Lyria 音乐生成 [#30304](https://github.com/BerriAI/litellm/pull/30304)）已有多月未获评审（[#39911](https://github.com/BerriAI/litellm/issues/39911)）。对非 Berri 提交的 PR，请按较慢的上游评审节奏做好规划。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## 1. 今日要点

过去 24 小时内没有发布任何版本（当前上报的构建版本仍为 `v0.1.806-beta` / `2026.9.2`）。工程精力集中在正确性上：一个修复让 `unsloth chat` 不再从共享目录加载错误的 GGUF（[#10357](https://github.com/unslothai/unsloth/pull/10357)，修复 [#10352](https://github.com/unslothai/unsloth/issues/10352)）；Windows Desktop 上的 `torch.dynamo` 崩溃已被修复（[#10360](https://github.com/unslothai/unsloth/pull/10360)，修复 [#10350](https://github.com/unslothai/unsloth/issues/10350)）；另外两个连续 PR 将 KV-cache 抢占加入 llama-server，使并行的 Studio 聊天可以共享同一个缓存，而不是互相驱逐（[#10301](https://github.com/unslothai/unsloth/pull/10301)、[#10358](https://github.com/unslothai/unsloth/pull/10358)）。

## 2. 发布与破坏性变更

无。过去 24 小时内没有发布任何版本，因此没有新的 API/配置变更或迁移说明。有两个待合并 PR 预示了值得关注的未来行为变化：Docker Studio 将把首次启动的管理员密码打印到 `docker logs`，并支持 `UNSLOTH_STUDIO_PASSWORD`（[#10344](https://github.com/unslothai/unsloth/pull/10344)）；OpenAI 兼容的 SSE 流将把 Unsloth 专有控制帧放到需通过 `X-Unsloth-Events` opt-in 请求头才能启用（[#10362](https://github.com/unslothai/unsloth/pull/10362)）。

## 3. 新模型与硬件支持

- **Voxtral** 仍是获得 👍 最多的开放模型请求（[#3013](https://github.com/unslothai/unsloth/issues/3013)，14 👍）。
- **Windows on ARM（NVIDIA）：** [#10282](https://github.com/unslothai/unsloth/pull/10282) 让 PowerShell 安装程序能够在 NVIDIA GB10/N1X “RTX Spark” 笔记本上部署原生 ARM64 CUDA 技术栈。
- **ARM64 Linux / DGX Spark：** `Unsloth Desktop` 的打包缺口已被记录——应用本身可以干净移植，只缺少 Linux aarch64 资产（[#10332](https://github.com/unslothai/unsloth/issues/10332)）；[#10323](https://github.com/unslothai/unsloth/pull/10323) 提出了一个带异步副本路由器的双 Spark 服务编排器。
- **Hermes 集成：** Studio 将扫描 `~/.hermes/models`，并与 LM Studio、Ollama 目录并列（[#10327](https://github.com/unslothai/unsloth/pull/10327)）。
- **Qwen3.8 生态：** 按推理模式设置采样默认参数（[#9595](https://github.com/unslothai/unsloth/pull/9595)）；Flash-Next GGUF 的 MTP 加载失败问题正在调查中（[#10322](https://github.com/unslothai/unsloth/issues/10322)）。
- **PyTorch 2.11 / vLLM 0.19** 兼容性请求已被关闭（[#4851](https://github.com/unslothai/unsloth/issues/4851)）。
- 仍有一些硬件支持被 bug 阻塞：Intel Arc B580 的 XPU 导入失败问题仍处于 open 状态，已有 15 条评论（[#3533](https://github.com/unslothai/unsloth/issues/3533)）。

## 4. 性能与优化

- **面向并行聊天的 KV-cache 抢占：** Studio 目前会启动一个带 `--parallel N --kv-unified -c N` 的 llama-server，而服务器只检查每个 slot 的 `prompt_tokens`，不检查总容量——因此单独看都能放得下的并行聊天可能会相互挤出。PR [#10301](https://github.com/unslothai/unsloth/pull/10301) 在 Studio 侧加入 KV 缓存抢占；后续的 [#10358](https://github.com/unslothai/unsloth/pull/10358) 则通过 `--preempt-ram`（unslothai/llama.cpp#184/#190）把 slot parking 逻辑下放给 llama-server，让每个聊天都能使用完整的上下文窗口。
- **内核覆盖：** [#9573](https://github.com/unslothai/unsloth/pull/9573) 为 `geglu`/`swiglu`/`rms_layernorm` Triton 内核增加了 GPU 测试——这些是微调过程中每次 MLP 前向/反向计算的热点路径。
- **AMD 统一内存 APU：** [#10351](https://github.com/unslothai/unsloth/pull/10351) 仅在权重超出 APU 划分内存（carve-out）时设置 `GGML_CUDA_ENABLE_UNIFIED_MEMORY=1`，因为在 Linux ROCm 上该标志已被验证存在正确性风险。
- **RL 训练：** Studio 端的 GRPO（[#9310](https://github.com/unslothai/unsloth/pull/9310)）以及面向 GLM-5.2 式 single-rollout 目标的 SAO 训练器（[#9309](https://github.com/unslothai/unsloth/pull/9309)）正在评审中。
- 有一个性能投诉称通过 Unsloth API 调用 Claude Codex Hermes 时 token 输出吞吐量偏低，但没有附带任何基准测试数据（[#10354](https://github.com/unslothai/unsloth/issues/10354)）。今天也没有可用的具体吞吐量/延迟数据。

## 5. 稳定性与回归问题

按严重程度排序：

1. **加载了错误的模型：** `unsloth chat` 可能在选择器中显示某个 GGUF，却从同一父目录加载另一个不相关的 GGUF（例如选择 Ling 后实际加载的是 MiniMax 视频模型的 GGUF）（[#10352](https://github.com/unslothai/unsloth/issues/10352)）。修复 PR：[#10357](https://github.com/unslothai/unsloth/pull/10357)。
2. **Windows Desktop 崩溃：** 加载 Z-Image GGUF 时出现 `torch.dynamo` 循环导入；服务器在线程池中处理请求，因此第一次真正导入即崩溃（[#10350](https://github.com/unslothai/unsloth/issues/10350)）。修复 PR：[#10360](https://github.com/unslothai/unsloth/pull/10360)。
3. **AMD ROCm 集群（Radeon PRO W7900/W7500，ROCm 7.13）：** “No RAM Offload”复选框被忽略，模型仍留在 RAM 中（[#10341](https://github.com/unslothai/unsloth/issues/10341)）；点击 unload 按钮会报错（[#10339](https://github.com/unslothai/unsloth/issues/10339)）；“Switch Back”会把本地模型聊天重置为 4096 上下文（[#10338](https://github.com/unslothai/unsloth/issues/10338)）；token 计数再次无法正常工作（[#10337](https://github.com/unslothai/unsloth/issues/10337)）。目前还没有修复 PR。
4. **OpenAI SSE 兼容性：** `/v1/chat/completions` 会在同一个流中混入没有 `choices` 的 UI 控制帧（`tool_start`、`diffusion_frame` 等），导致严格的 OpenAI 客户端无法通过 schema 校验（[#10362](https://github.com/unslothai/unsloth/pull/10362)）。
5. **多 GPU 环境下 `--tensor-split` 被忽略**，让报告者损失了数小时时间（[#10355](https://github.com/unslothai/unsloth/issues/10355)）。
6. **Agent 上下文保真度：** 工具响应被硬截断到 16,000 字符（[#10349](https://github.com/unslothai/unsloth/issues/10349)）；Unsloth 会在用户不可见的情况下向模型发送修改后的上下文，包括静默去重工具调用（[#10348](https://github.com/unslothai/unsloth/issues/10348)）。
7. **模型加载回归：** MTP 无法加载 Qwen3.8-Flash-Next-GGUF（[#10322](https://github.com/unslothai/unsloth/issues/10322)）；Laguna 的 `iq4_nl` 在 llama.cpp `b10798-mix` 下无法再加载（[#10336](https://github.com/unslothai/unsloth/issues/10336)）；Qwen3.8-UD-IQ4_XS 首次运行输出乱码（[#10330](https://github.com/unslothai/unsloth/issues/10330)）。
8. **旧问题仍处于 open 状态：** Intel Arc B580 导入错误（不支持 `torch.xpu.memory.mem_get_info()`）（[#3533](https://github.com/unslothai/unsloth/issues/3533)）；滚动上下文窗口请求已关闭（[#7472](https://github.com/unslothai/unsloth/issues/7472)）。
9. **构建/发布基础设施：** 今天两次 Docker 发布运行因 Launchpad 返回 504 而失败；已在 [#10363](https://github.com/unslothai/unsloth/pull/10363) 中加入重试。Docker Hub 凭据探测现在会正确删除临时 tag（[#10294](https://github.com/unslothai/unsloth/pull/10294)）。纯 HTTP 安装环境下的 API token 复制按钮已修复（[#9906](https://github.com/unslothai/unsloth/pull/9906)）。

## 6. 对应用开发者的影响

- **验证已加载的模型：** 在 [#10357](https://github.com/unslothai/unsloth/pull/10357) 合并之前，如果同一目录下存在多个互不相关的 `.gguf` 文件，不要依赖聊天选择器准确加载你选中的 GGUF——应以编程方式验证实际加载的模型路径。
- **严格的 OpenAI 客户端：** 请过滤掉没有 `choices` 字段的 SSE 事件，或等 [#10362](https://github.com/unslothai/unsloth/pull/10362) 合并后设置 `X-Unsloth-Events`。目前这些帧可能破坏下游应用的 schema 校验。
- **Agent 工作负载：** 16k 工具输出截断（[#10349](https://github.com/unslothai/unsloth/issues/10349)）和不透明的上下文改写（[#10348](https://github.com/unslothai/unsloth/issues/10348)）都是使用工具型 agent 时容易踩的坑；在这两个问题被解决前，建议以带外方式传递完整工具输出。
- **硬件规划：** Windows on ARM 的 NVIDIA 主机（RTX Spark）将获得可用的原生 CUDA 安装程序（[#10282](https://github.com/unslothai/unsloth/pull/10282)）；AMD APU 用户可受益于条件性统一内存（[#10351](https://github.com/unslothai/unsloth/pull/10351)）；双 GPU Radeon PRO 环境应留意仍未解决的 offload/unload 相关上下文 bug（[#10338](https://github.com/unslothai/unsloth/issues/10338)–[#10341](https://github.com/unslothai/unsloth/issues/10341)）。
- **RL 微调路线图：** 如果你一直在等待 Studio 在 SFT 之外支持强化学习，可以关注 [#9310](https://github.com/unslothai/unsloth/pull/9310)（GRPO）和 [#9309](https://github.com/unslothai/unsloth/pull/9309)（SAO，依据 GLM-5.2 论文）。
- **物理隔离/离线部署**尚未得到 Unsloth Desktop 支持（[#10356](https://github.com/unslothai/unsloth/issues/10356)）；在受限网络的部署规划中需要把这一点纳入考虑。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*