# AI 基础设施日报 2026-09-14

> 生成时间: 2026-09-14 00:23 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 跨项目 AI 基础设施报告 — 2026-09-14

## 1. 生态系统概览

AI 基础设施栈正处于重度开发周期，活动集中在新模型启用、KV 缓存/内存管理以及 agent/工具调用可靠性上，而非稳定发布。服务引擎正竞相支持 DeepSeek V4.1 和其他前沿架构，但生产就绪度滞后：SGLang 的 V4.1 PR 被 CI 阻塞，并伴随 V4.1 特有的 bug，而 llama.cpp 的 V4.1 转换支持仍在审查中。本地运行时和网关正在向 OpenAI/Anthropic/Responses API 兼容性收敛，但前缀缓存行为、结构化输出以及 MCP/工具负载处理仍是薄弱环节。值得注意的是，vLLM 的摘要生成失败，因此本报告无法对其进行评估。跨项目来看，缓存正确性、客户端取消和内存容量规划是反复出现的稳定性主题。

---

## 2. 活动对比

N/R = 在提供的摘要中未报告为聚合计数；这并不意味着零活动。

| 项目 | 层级 | Issues 更新数（24h） | PR 更新数（24h） | 发布状态 | 备注 |
|---|---:|---:|---:|---|---|
| **vLLM** | 服务引擎 | 未知 | 未知 | 未知 | 摘要生成失败 |
| **SGLang** | 服务引擎 | **41** | **277** | 无发布 | 重度开发周期；DeepSeek V4.1、router、HiCache、统一内存 |
| **llama.cpp** | 本地运行时 | N/R | N/R | **9 个 nightly 构建** b10935–b10948 | 后端健壮性、Kimi-K3、DeepSeek V4.1 转换 |
| **Ollama** | 本地运行时 / 云桥接 | N/R | N/R | 无发布 | API/工具调用正确性、prompt 缓存未命中、量化泄漏 |
| **LiteLLM** | LLM 网关 | N/R | N/R | **v1.102.0-rc.1** | Cosign 镜像签名；Rust 网关迁移进行中 |
| **Unsloth** | 微调 / 训练 | N/R | N/R | 无发布 | Studio 安全绕过、MCP 截断、安装器/训练性能 |

SGLang 是此快照中唯一有明确聚合活动数字的项目：277 个 PR 和 41 个 issue 更新，且无发布。llama.cpp 正在快速发布 nightly 构建。LiteLLM 是该时间窗口内唯一有版本化发布的项目，尽管只是 RC。

---

## 3. 模型支持竞赛

**DeepSeek V4.1**
- **SGLang** 有备受关注的 serving PR [#38798]，但被 CI 阻塞。两个同日出现的 bug 表明 V4.1 路径仍在稳定中：CUDA graph 捕获失败 [#39173] 和 image-placeholder token 拒绝 [#39274]。
- **llama.cpp** 通过 `deepseek41` 架构提供的 DeepSeek V4.1 转换支持正在审查中 [#28696]。
- **结论：** llama.cpp 在转换/本地执行方面可能更接近；SGLang 在高吞吐 serving 集成方面更接近，但尚未生产就绪。

**Kimi-K3**
- **llama.cpp** 合并了 Kimi-K3 文本模型支持 [#26185]，包括混合 KDA/MLA 注意力、跨层残差注意力、latent MoE 和 SiTU 激活。
- **LiteLLM** 关闭了通过 Microsoft Foundry 的 Azure Kimi-K2.7-Code 支持 [#32613]。
- **Ollama** 存在 `kimi-k3:cloud` 回归：tool-role 消息中的图像内容返回 HTTP 500 [#18426]。
- **结论：** llama.cpp 在本地架构支持方面领先；LiteLLM 在网关/提供商路由方面领先；Ollama 的云路径出现回归。

**Qwen 生态**
- **Ollama** 正在积极修复 Qwen3-Coder 工具编号解析 [#18421/#18422]，并调查由非确定性 tool-schema 顺序导致的 prompt 缓存未命中 [#18430]。
- **LiteLLM** 新增/关闭了 DashScope Qwen 3.6/3.7 定价 [#29922] 和 OpenRouter Qwen `cache_control` 支持 [#29335]。
- **Unsloth** 报告，由于 FLA autotune-key 重建，B200 Qwen3.5-9B LoRA 训练出现 GPU 空闲 [#10806]。
- **结论：** Qwen 支持范围广泛，但瓶颈是工具调用和缓存正确性，而非原始模型可用性。

**多模态 / 视觉**
- **SGLang** 新增 Ling-3.0-flash-VL 支持 [#38526]。
- **Ollama** 有 Windows 图像生成工作 [#13806]，但 Gemma 4 图像处理在 Windows 上损坏 [#16532]，EXIF 方向被忽略 [#18418]，且 Jetson Orin Nano 8GB 在 Gemma 4 E4B 上 OOM [#18396]。
- **llama.cpp** 新增了 `function_call_output` 内的 `input_image` [#28847]，但视觉模型的 KV 缓存保存/恢复仍然损坏 [#19466]。
- **Unsloth** 新增 PaliGemma v1 + v2 LoRA 微调支持 [#5218]。
- **结论：** 多模态 serving 进展不均；缓存持久化和图像预处理对生产仍不安全。

**硬件广度**
- **SGLang：** AMD EAGLE 温度采样 [#39253]、NPU、Blackwell 分片池 [#37615]、Intel CPU 路线图关闭 [#24921]。
- **llama.cpp：** pre-CDNA AMD 上的 CUDA F32 fallback [#28846]、SYCL graph replay [#28725]、OpenCL 量化对齐 [#28575]、s390x guard、Vulkan NVIDIA workaround。
- **Unsloth：** Intel XPU Triton 仍然失败 [#10844]，Windows ARM64 安装器失败 [#10875]，B200/Blackwell FLA 问题 [#10806]。
- **Ollama：** 集成 Vulkan GPU 直接 I/O [#18124]，Jetson Orin 问题。

---

## 4. 性能前沿

优化工作集中在五个方面：

**KV 缓存与内存**
- **SGLang** 最为激进：语义 KV 复用 [#31057]、混合 SWA 内存的共享字节预算 [#36729]、统一池的分层 HiCache [#37507]、分片池 [#37615]、mxfp8-kv padding 修复 [#35351]，以及 HiCache 恢复正确性 bug [#39147]。
- **Ollama** 正在应对 Qwen3-Coder tool-schema 顺序 [#18430] 和 Anthropic 兼容 system-role 提升 [#18431] 导致的前缀缓存未命中。
- **llama.cpp** 有推测解码 draft-cap 修复 [#26575]，但 HIP 量化 KV 缓存在 RDNA4 上比 f16 更慢 [#27796]。
- **LiteLLM** 存在缓存命中花费/token 语义问题 [#39057] 和一个 Valkey 语义缓存 bug [#32324]。
- **Unsloth** 有 KV VRAM 估算器清理 [#8994]。

**批处理、路由与分布式 serving**
- **SGLang** 正在推进 router 选择/缓存局部性：队列感知亲和性 [#39168–#39170]、prefix-owner pinning、缓存感知指标 [#39325–#39327]、运行时 EP 缩容 [#33111]，以及 PD 熔断器问题 [#31206]。
- **llama.cpp** 修复了 CPU `mul_mat_id` 伪共享 [#28861]，并正在跟踪服务器推测批处理偏移 bug [#24840]。
- **LiteLLM** 有 WIP 的客户端断连中继 [#27146] 和每次 fallback 尝试时 router 深拷贝 kwargs [#27462]。

**量化与模型压缩**
- **llama.cpp** 合入了针对 `q4_K`、`q5_K`、`q8_0` 的 OpenCL 量化行对齐 [b10937/#28575]，并支持 MoE 超出 VRAM 的 SSD 流式加载 [#25294]。
- **Ollama** 有一个 `IQ3_S` 空内容 bug [#18297] 和一个大量化磁盘泄漏修复 [#18424]。
- **Unsloth** 用户应在 Docker `2026.9.4` 上将 `max_seq_length` 迁移到 `max_length` [#10785]。

**内核与编译器**
- **llama.cpp**：pre-CDNA AMD 的 CUDA F32 fallback [#28846]、SYCL graph 记录/重放 [#28725]、Vulkan NVIDIA `QueueSubmit` mutex [b10938/#28830]、语法引擎 1.2–1.3× 加速 [#26885]。
- **SGLang**：JIT 内核、AMD EAGLE verify sampling，以及 V4.1 相关的 CUDA graph 捕获问题。
- **Unsloth**：FLA autotune-key 重建导致 B200 GPU 空闲 [#10806]。

**网关开销**
- **LiteLLM** 正在推进 Rust 迁移，目标是将网关开销降至 1ms 以下 [#31263]，但仍处于 beta/进行中。

---

## 5. 层级定位

| 层级 | 项目 | 核心角色 | 当前重点 |
|---|---|---|---|
| **高吞吐 serving 引擎** | vLLM、SGLang | GPU serving、连续批处理、分布式推理、KV 缓存、MoE | DeepSeek V4.1、HiCache/统一内存、router 缓存局部性、PD 分离 |
| **本地运行时 / 边缘** | llama.cpp、Ollama | CPU/GPU/Apple/Intel 执行、模型打包、桌面/服务器推理 | 后端健壮性、架构转换、prompt 缓存、agent/工具 API |
| **LLM 网关 / 代理** | LiteLLM | 多提供商路由、认证、预算、护栏、可观测性 | 提供商兼容性、`/v1/responses`、花费核算、Rust 重写 |
| **训练 / 微调** | Unsloth | LoRA/SFT、量化、Studio、agentic 工具 | 安装器可靠性、MCP/RAG 正确性、B200 吞吐、PaliGemma LoRA |

**重叠：**
- Ollama 与 llama.cpp 共享本地运行时血统；Ollama 对 llama.cpp 进行抽象，以简化模型管理和云桥接。
- LiteLLM 位于引擎和本地运行时之上，路由到 OpenAI、Anthropic、Bedrock、Ollama、vLLM、SGLang 等。
- SGLang/vLLM 是使用 Unsloth 生产/微调模型的部署目标。
- vLLM 今天无法定位，因为其摘要生成失败。

---

## 6. 趋势信号

1. **前沿模型支持正跑在生产就绪度前面。** DeepSeek V4.1 和 Kimi-K3 正在落地或处于审查中，但 SGLang 中的 V4.1 serving 被 CI 阻塞且容易出 bug。暂时不要将 V4.1 投入生产。

2. **缓存正确性正变得比缓存命中率更重要。** SGLang 的 HiCache 可能报告无法恢复的前缀 [#39147]；Ollama 的 Anthropic 兼容和 Qwen3-Coder 路径会破坏前缀缓存 [#18430/#18431]；LiteLLM 存在缓存命中花费/token 报告问题 [#39057]。不仅要验证命中指标，还要验证恢复和计费。

3. **Agent/工具可靠性是最薄弱的环节。** llama.cpp 在约 1–5 KB 以上负载时存在 stdio MCP 死锁 [#28723]；Unsloth 存在系统性 MCP 截断 [#10839] 和 Studio 安全绕过 [#10835]；Ollama 有多个 Qwen 工具调用解析器失败 [#18421/#16383/#17778]。Agent 开发者应限制工具负载大小、在客户端验证结构化输出，并监督工具执行。

4. **OpenAI/Anthropic/Responses 兼容性正在收敛，但仍不完整。** llama.cpp 正在 `function_call_output` 中添加 `input_image` [#28847]；LiteLLM 正在修复流式 `/v1/responses` 的 sequence/usage 字段 [#28899/#31332]；Ollama 的 `/api/codex/v1/responses` 可能返回空的 `output_text` [#18419]。如果依赖这些 API，请固定版本。

5. **Router/缓存感知调度正成为一等公民。** SGLang 正在暴露缓存局部性指标和队列感知亲和性；LiteLLM 正在修复加权路由和 fallback 行为。多轮 agent 和 RAG 工作负载将受益，但前提是这些 PR 落地。

6. **内存管理正走向动态和统一。** SGLang 的共享字节预算和统一 HiCache 减少了 full-attention 与 SWA 池的手工容量规划；llama.cpp 正在试验 SSD 流式 MoE 专家；Unsloth 正在清理 KV VRAM 估算。预计 OOM 相关故障会减少，但容量行为会更复杂。

7. **硬件异构性正在扩大。** NPU、AMD pre-CDNA、Intel XPU、Blackwell、ARM64、Jetson 和 Vulkan 都有活跃问题。升级前请固定构建并按后端进行基准测试。

8. **安全与供应链卫生正在浮现。** LiteLLM 正在用 cosign 签名 Docker 镜像；Unsloth Studio 存在安全绕过；Ollama 有一个长期存在的许可证通知合规问题 [#3185]。请将本地 AI 工具视为具有供应链和沙箱要求的生产软件。

9. **可观测性正在改善。** llama.cpp 新增了 `LOG_JSON` [#28586]；SGLang 正在添加 router 缓存指标；LiteLLM 有日志脱敏工作。结构化日志和缓存感知指标正变得可用于生产监控。

**给应用开发者的最终结论：** 目前在生产中避免使用 DeepSeek V4.1，强化客户端取消和 MCP/工具负载处理，验证缓存恢复与花费核算，并按硬件后端固定已知良好的构建。生态发展迅速，但正确性和 agent 可靠性仍是关键门槛。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 — 2026-09-14

## 今日亮点

过去 24 小时没有发布任何版本，但项目正处于高频开发周期：**277 个 PR** 和 **41 个 issue** 有更新。主导主题是一个大型开放 PR，添加 **DeepSeek V4.1 支持**（同日提交了若干 V4.1 特定 bug），以及在 **router 选择/缓存局部性** 和 **统一内存 / HiCache** 管线上的激进推进。稳定性方面，需要关注的是导致整个引擎宕机的客户端断连崩溃，以及一个高优先级的 SWA/Mamba 缓存正确性 bug。

---

## 发布与破坏性变更

无。过去 24 小时没有新版本，也没有已合并的 API/配置破坏性变更报告。正在推进中的新 flag（尚未合并，列出以便了解即将暴露的能力面）：

- `--worker-queue-limit`、`--saturation-queue-floor`、`--min-load-choices` 位于 sgl-router 上 — [#39168](https://github.com/sgl-project/sglang/pull/39168), [#39169](https://github.com/sgl-project/sglang/pull/39169), [#39170](https://github.com/sgl-project/sglang/pull/39170)

---

## 新模型与硬件支持

- **[PR #38798] 添加 DeepSeek V4.1 支持** — 本次头条落地项；涉及量化、HiCache、NPU、JIT kernel 和内存池。目前因缺少 `run-ci` label 而受阻。[链接](https://github.com/sgl-project/sglang/pull/38798)
- **[PR #38526] 添加 Ling-3.0-flash-VL 模型支持** — 通过 OpenAI-compatible API 为 `inclusionAI/Ling-3.0-flash-VL` 提供原生文本/图像/视频服务，支持 BF16 和量化 checkpoint。[链接](https://github.com/sgl-project/sglang/pull/38526)
- **[PR #39253] [AMD][SPEC] EAGLE verify 中的温度采样** — 弥补 ROCm 上 DeepSeek-V4 基准精度差距。[链接](https://github.com/sgl-project/sglang/pull/39253)
- **[Issue #37742] SenseNova-U1 / U1.5 功能与性能跟踪** — 用于添加原生支持的活跃 roadmap issue，参考官方 OpenSenseNova 实现。[链接](https://github.com/sgl-project/sglang/issues/37742)
- **[Issue #24921] Intel CPU Roadmap (2026Q2)** — 已关闭/不活跃；生产级单节点服务、中小型 LLM、利用主机 CPU 周期的异构 disaggregation。[链接](https://github.com/sgl-project/sglang/issues/24921)
- **[Issue #31175] 通过 Olmo2 实现原生 OLMo3** — 已关闭/不活跃；OLMo-3 目前只能通过 Transformers fallback 后端运行。[链接](https://github.com/sgl-project/sglang/issues/31175)

---

## 性能与优化

- **[PR #31057] 语义 KV 缓存复用** — 可插拔的模糊匹配 radix 后端，用于在改写/RAG prompt 之间复用 KV，即使它们没有共享字面前缀。需手动开启。[链接](https://github.com/sgl-project/sglang/pull/31057)
- **[PR #36729] 统一 hybrid-SWA 内存的共享字节预算** — 用一个动态 arena 取代静态的按池容量门控，使 full-attention 池和 sliding-window 池可以互相借用未使用的字节。[链接](https://github.com/sgl-project/sglang/pull/36729)
- **[PR #37507] 面向每种统一池形态的分层缓存** — 将 HiCache 扩展到统一的 MHA+Mamba、MLA+Mamba、SWA 以及 full/SWA/Mamba 池（stack 3/3）。[链接](https://github.com/sgl-project/sglang/pull/37507)
- **[PR #37615] [kv-shard 2/4] 分片池** — 面向 Blackwell 的分片 KV 池工作。[链接](https://github.com/sgl-project/sglang/pull/37615)
- **[PR #35351] [mxfp8-kv] 跳过对保留的 CUDA-graph padding slot 的写入** — 避免未定义激活值污染 KV 池的 slot 0。[链接](https://github.com/sgl-project/sglang/pull/35351)
- **[PR #33111] 运行时 EP scale-down** — 通过 Mooncake `deactivate_ranks` 优雅下线活跃 EP rank，补齐现有的 scale-up 和故障恢复能力。[链接](https://github.com/sgl-project/sglang/pull/33111)
- **[Issue #39299] 自定义路由模型的 MoE deferred finalize 不可达** — 需要 `trtllm_fp4_block_scale_routed_moe` 的模型会被永久排除在该优化之外。[链接](https://github.com/sgl-project/sglang/issues/39299)
- **[Issue #30985] HiSparse 博客吞吐量无法复现** — 已关闭/不活跃；单 H200 运行无法达到公布数字。[链接](https://github.com/sgl-project/sglang/issues/30985)
- **[Issue #31120] Qwen3.5-4B 在 RTX 5090 上的性能退化** — 已关闭/不活跃，未修复。[链接](https://github.com/sgl-project/sglang/issues/31120)

Router 侧可观测性/策略工作（来自 Kangyan-Zhou 的 6-PR stack）是性能故事的另一半：在全集群排队下固定 prefix owner、min-load fallback sampling，以及在 `/metrics` 和 Grafana 面板上暴露缓存感知局部性指标 — [#39322](https://github.com/sgl-project/sglang/pull/39322), [#39168](https://github.com/sgl-project/sglang/pull/39168), [#39169](https://github.com/sgl-project/sglang/pull/39169), [#39170](https://github.com/sgl-project/sglang/pull/39170), [#39325](https://github.com/sgl-project/sglang/pull/39325), [#39326](https://github.com/sgl-project/sglang/pull/39326), [#39327](https://github.com/sgl-project/sglang/pull/39327).

---

## 稳定性与回归

按严重程度排序。数据中未引用任何针对这些问题的修复 PR。

1. **[Issue #39216] 客户端断连会导致整个引擎崩溃** — 未捕获的 `asyncio.CancelledError` 绕过了 `except Exception`；已在 4× RTX 6000D (SM120) 上使用 `dev-dsv41` 复现。影响最大：单个客户端请求被中止即可拖垮服务。[链接](https://github.com/sgl-project/sglang/issues/39216)
2. **[Issue #38815] [bug, high priority] SWA 分支将较晚的 Mamba checkpoint 挂到较早的 prefix 上** — 联合 Full/SWA/Mamba 分支点缓存（Inkling/short-conv 路径）中的静默正确性 bug。输出错误，而非崩溃。[链接](https://github.com/sgl-project/sglang/issues/38815)
3. **[Issue #31206] sgl-router PD 断路器持续向 decode 派发** — 在一波客户端超时/中止后，即使断路器已打开，一个永久假死的 prefill 仍会存活；需要人工干预。[链接](https://github.com/sgl-project/sglang/issues/31206)
4. **[Issue #35884] /health 超时路径泄漏孤儿 scheduler 请求** — 健康检查请求堆积并导致 paged-prefill batching 崩溃。[链接](https://github.com/sgl-project/sglang/issues/35884)
5. **[Issue #39173] DeepSeek-V4.1-Flash + Engram 在 CUDA-graph capture 中崩溃** — 在 profile 后的 SPS table 上出现 "engram target-verify expects one equal block per request"。[链接](https://github.com/sgl-project/sglang/issues/39173)
6. **[Issue #39274] DeepSeek-V4.1 会以 400 拒绝包含图像占位符 token 的用户文本** — `encoding_dsv41.py` 将用户文本中的任何字面量 `<｜deepseek_image｜>` 视为硬错误。[链接](https://github.com/sgl-project/sglang/issues/39274)
7. **[Issue #39147] HiCacheFile 对混合缓存池报告不可恢复的 prefix** — 当辅助池无法恢复该 prefix 时，`batch_exists_v2()` 仍可能报告命中。[链接](https://github.com/sgl-project/sglang/issues/39147)
8. **[Issue #35826] Grammar token 同步在 DP attention 下初始化单例 NCCL group** — 是 #8400 的后续，根因已确认。[链接](https://github.com/sgl-project/sglang/issues/35826)
9. **[Issue #6357] Prometheus `avg_request_queue_latency` 从未被采集** — 长期存在的可观测性缺口，标记为 `good first issue`。[链接](https://github.com/sgl-project/sglang/issues/6357)
10. **[Issue #26340] CUDA Coredump Tracker** — 仍是仓库中最活跃的 issue（299 条评论），由 `pr-test.yml` 自动喂入。[链接](https://github.com/sgl-project/sglang/issues/26340)

**CI 健康度**（[Issue #17050](https://github.com/sgl-project/sglang/issues/17050)，最后自动更新于 2026-09-13 23:47 UTC）：6 个 broken，11 个 flaky，990 个最近在 `main` 上修复。

为历史背景而值得注意的已关闭/不活跃回归：GLM-5.2 NVFP4 + EAGLE 在 CUDA-graph capture 中出现 CUDA illegal memory access（[#31093](https://github.com/sgl-project/sglang/issues/31093)）、GLM-5.1 TP8 EAGLE 在 KV 池接近满时 verify 挂起（[#26399](https://github.com/sgl-project/sglang/issues/26399)）、跨两个 CUDA stream 的自定义 all-reduce 死锁（[#31117](https://github.com/sgl-project/sglang/issues/31117)）、Qwen3-VL 视频双重采样（[#31200](https://github.com/sgl-project/sglang/issues/31200)），以及当请求的 SWA 预算超过 SWA 池时出现 PD prefill 饥饿（[#31205](https://github.com/sgl-project/sglang/issues/31205)）。

---

## 对应用开发者的意义

- **为 DeepSeek V4.1 做规划，但不是今天。** [#38798](https://github.com/sgl-project/sglang/pull/38798) 是启用 PR，目前仍被 CI 阻塞；与此同时，[#39274](https://github.com/sgl-project/sglang/issues/39274) 和 [#39173](https://github.com/sgl-project/sglang/issues/39173) 表明 V4.1 编码和 CUDA-graph 路径仍在稳定中。在上述两项都解决之前，避免在生产中使用 V4.1。
- **强化客户端取消处理。** [#39216](https://github.com/sgl-project/sglang/issues/39216) 意味着一个被中止的 HTTP 请求可能杀死引擎进程。如果你设置了激进的请求超时，或使用会取消慢请求的 benchmark harness，就会暴露在该问题下 — 在修复前请增加 supervision/auto-restart。
- **PD-disaggregated 部署需要重启 runbook。** [#31206](https://github.com/sgl-project/sglang/issues/31206) 会留下断路器无法驱逐的死 prefill；同一作者的 [#31205](https://github.com/sgl-project/sglang/issues/31205)（已关闭）表明 V4 混合 SWA 池是 PD 饥饿的反复来源。
- **长期运行的缓存层用户：验证恢复，而不只是命中。** [#39147](https://github.com/sgl-project/sglang/issues/39147) 意味着对于混合池，报告出来的 HiCache prefix 命中可能无法恢复；不要将命中率指标视为正确性信号。相关的长期规模问题：数百万页时 flat-directory ENOSPC（[#28653](https://github.com/sgl-project/sglang/issues/28653)，已关闭）。
- **Router 改进正针对的正是你的工作负载落地。** 如果你服务多轮 agent 或带共享 prefix 的 RAG，那么缓存局部性 `/metrics` 工作（[#39325](https://github.com/sgl-project/sglang/pull/39325)–[#39327](https://github.com/sgl-project/sglang/pull/39327)）加上队列感知亲和性（[#39168](https://github.com/sgl-project/sglang/pull/39168), [#39169](https://github.com/sgl-project/sglang/pull/39169)）将为你提供 router 侧命中率可见性，并阻止 cache-affinity 流量被路由到已饱和的 worker。语义（模糊）KV 复用（[#31057](https://github.com/sgl-project/sglang/pull/31057)）值得针对改写 prompt 的工作负载试点，不过它是 opt-in 且较新。
- **内存调优正变得动态化。** 共享字节预算工作（[#36729](https://github.com/sgl-project/sglang/pull/36729)）和统一 HiCache（[#37507](https://github.com/sgl-project/sglang/pull/37507)）减少了对 full-attention 与 SWA 池进行手工 sizing 的需求 — 合并后预计会减少接近 OOM 的容量门控故障。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-14

## 1. 今日要闻

过去 24 小时有九个 nightly 构建落地（b10935–b10948），主要以后端健壮性为主，而非重点功能：一个 OpenCL 量化对齐修复、一个针对 NVIDIA queue-submit 驱动 bug 的 Vulkan 规避方案，以及一个 SYCL 内存检测修复。PR 方面，进行中的最大事项是硬件加速回退与调度工作 —— 面向 pre-CDNA AMD GPU 的 CUDA F32 回退、SYCL graph record/replay、`mul_mat_id` 的 per-thread buffers，以及 MoE 路由专家的磁盘流式加载。Kimi-K3 架构已落地（closed），DeepSeek V4.1 转换支持正在审查中。

## 2. 发布与破坏性变更

仅 nightly 构建；无 API 或配置破坏性变更。值得注意的已落地行为变更：

- **[b10948](https://github.com/ggml-org/llama.cpp/releases/tag/b10948)** — 从 WebGPU `test-llama-archs` 中排除 `HY_V4`（仅 CI；解除 WebGPU CI 阻塞）。修复 PR：[#28855](https://github.com/ggml-org/llama.cpp/pull/28855)。
- **[b10947](https://github.com/ggml-org/llama.cpp/releases/tag/b10947)** — Nemotron-H：在 NextN/MTP 尾部循环中防止专家 FFN 大小回退（`n_ff / n_expert_used`）出现除零（[#28779](https://github.com/ggml-org/llama.cpp/pull/28779)）。
- **[b10946](https://github.com/ggml-org/llama.cpp/releases/tag/b10946)** — s390x：对仅 VXE 的 repack 辅助函数加保护，使非 VXE 构建也能编译（[#28775](https://github.com/ggml-org/llama.cpp/pull/28775)）。
- **[b10944](https://github.com/ggml-org/llama.cpp/releases/tag/b10944)** — SYCL：修复 level-zero 内存查询错误，并改进对不支持的 ZES API 路径的处理（[#28227](https://github.com/ggml-org/llama.cpp/pull/28227)）。
- **[b10941](https://github.com/ggml-org/llama.cpp/releases/tag/b10941)**、**[b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938)**、**[b10937](https://github.com/ggml-org/llama.cpp/releases/tag/b10937)**、**[b10936](https://github.com/ggml-org/llama.cpp/releases/tag/b10936)**、**[b10935](https://github.com/ggml-org/llama.cpp/releases/tag/b10935)** — 见下文各节。
- **可观测性新增**：**[b10935](https://github.com/ggml-org/llama.cpp/releases/tag/b10935)** 在 `common` 中新增 `LOG_JSON` 宏，用于结构化数据日志（[#28586](https://github.com/ggml-org/llama.cpp/pull/28586)）—— 如果你要解析 llama.cpp 日志会很有用。

## 3. 新模型与硬件支持

- **Kimi-K3 文本模型** — 通过 [#26185](https://github.com/ggml-org/llama.cpp/pull/26185) 合并（closed）。采用与 Kimi-Linear-48B 相同的混合 KDA（线性）+ MLA（全量）注意力，外加跨层残差注意力、latent MoE（路由专家位于 `n_expert_latent`）以及 SiTU 激活。
- **DeepSeek V4.1（`DeepseekV41ForCausalLM`）** — 在新的 `deepseek41` 架构下支持转换；参数嵌套在 `text_config` 下（[#28696](https://github.com/ggml-org/llama.cpp/pull/28696)）。
- **CUDA：在不支持 BF16 硬件加速的 GPU 上回退到 F32** — pre-CDNA / pre-RDNA3 AMD 卡在 BF16 GEMM 上会落到 64×32×8 的 rocBLAS stub tile；该 PR 增加了 F32 路径（[#28846](https://github.com/ggml-org/llama.cpp/pull/28846)，closed）。
- **SYCL graph record & replay** — 将 CUDA graph 路径移植到 SYCL，录制前需要执行一次重排序步骤（[#28725](https://github.com/ggml-org/llama.cpp/pull/28725)）。
- **OpenCL 量化对齐** — noshuffle 行对齐规则现在适用于 `q4_K`、`q5_K` 和 `q8_0`，而不再仅适用于 `q6_K`（[b10937](https://github.com/ggml-org/llama.cpp/releases/tag/b10937) / [#28575](https://github.com/ggml-org/llama.cpp/pull/28575)）。
- **新 tokenizer 支持** — 为 `fraunhofer-iis/elmod-2.7b-it` 增加 pre-tokenizer，并新增 `escape_after_split` 标志（[#28845](https://github.com/ggml-org/llama.cpp/pull/28845)）。
- **MoE 显存外执行** — 可选地将路由专家权重从 SSD 流式加载，并在设备端为每层维护一个小型 expert slab 缓存，面向大于 RAM 的模型（[#25294](https://github.com/ggml-org/llama.cpp/pull/25294)）。

## 4. 性能与优化

- **CPU `mul_mat_id` 伪共享修复** — 每个线程写入自己的缓冲区，而非共享缓冲区，从而移除了现有路径上的一个屏障（[#28861](https://github.com/ggml-org/llama.cpp/pull/28861)）。
- **语法引擎提速 1.2×–1.3×** — 在自研语法引擎中实现单次查找解析，并移除额外拷贝（[#26885](https://github.com/ggml-org/llama.cpp/pull/26885)，closed）。
- **Vulkan NVIDIA queue-submit 互斥锁** — 按 `VkDevice` 串行化 `QueueSubmit`，以规避驱动同步 bug（[b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938) / [#28830](https://github.com/ggml-org/llama.cpp/pull/28830)）。这是正确性优先的取舍；需留意多队列 NVIDIA 配置上的吞吐成本。
- **投机解码** — 在为 `draft-dflash`/`draft-dspark` 构造 draft decode block 之前，遵循有效的每序列 draft 上限（[#26575](https://github.com/ggml-org/llama.cpp/pull/26575)）。
- **FA 测试规模缩减** — 加快 CI，无运行时影响（[b10941](https://github.com/ggml-org/llama.cpp/releases/tag/b10941) / [#28842](https://github.com/ggml-org/llama.cpp/pull/28842)）。
- **待跟踪的未关闭回归**：RDNA3 上的 Vulkan prompt-processing 吞吐量在 b10780 之后大幅下降（[#28752](https://github.com/ggml-org/llama.cpp/issues/28752)）—— 尚未有修复 PR。

## 5. 稳定性与回归

按影响排序，来自过去 24 小时更新的 issue：

1. **Vulkan RDNA3 prompt-processing 回归** — b10780 之后 llama-server 上的 PP 严重变慢（[#28752](https://github.com/ggml-org/llama.cpp/issues/28752)）。尚未确定修复方案。
2. **`ggml_backend_sched_alloc_splits`：意外 graph 重分配** — 在 Intel Arc Pro / IntelLLVM 构建上硬崩溃（[#28753](https://github.com/ggml-org/llama.cpp/issues/28753)）。
3. **Metal 初始化时 OOM 仍绑定端口并报告“模型已加载”** — 之后每个请求都返回 500，使健康检查无法发现故障（[#27309](https://github.com/ggml-org/llama.cpp/issues/27309)）。
4. **MCP tool-call 死锁** — 由配置启动的 stdio MCP 服务器在 tool-call payload 超过约 1–5 KB 时会永久死锁（[#28723](https://github.com/ggml-org/llama.cpp/issues/28723)）。与 agent 工作负载直接相关。
5. **SYCL GPU TDR 重置** — 在双 Arc Pro B70 上加载 DFlash2 draft 模型会触发 `VIDEO_TDR_TIMEOUT_DETECTED`；进程无 trace 直接死亡（[#28778](https://github.com/ggml-org/llama.cpp/issues/28778)）。
6. **Windows 上 gfx1201 的 HIP/ROCm** — 批量 target scoring 会改变 logits/top-1，与 Vulkan 对照组不同（[#28768](https://github.com/ggml-org/llama.cpp/issues/28768)）。
7. **Qwen3.6 35B A3B 上 SYCL 输出异常**（[#28728](https://github.com/ggml-org/llama.cpp/issues/28728)）。
8. **RDNA4 上 HIP 量化 KV cache 比 f16 更慢** — 劣势随解包成本增长，逆转了预期的带宽权衡（[#27796](https://github.com/ggml-org/llama.cpp/issues/27796)）。
9. **Metal 上的 Qwen3.8-Flash-Next-Next** — 长上下文下解码发出一个 token 后便 EOS；阈值会随量化 / KV 量化 / `n_ctx` 变化（[#28805](https://github.com/ggml-org/llama.cpp/issues/28805)）。
10. **Gemma 4 SWA 遗忘关键细节**（[#25751](https://github.com/ggml-org/llama.cpp/issues/25751)）以及 **Gemma4Assistant 上下文初始化失败**（[#24343](https://github.com/ggml-org/llama.cpp/issues/24343)）。
11. **Vulkan/ANV FA 标量回退** 导致 O(N²) PP 退化与设备丢失（[#27638](https://github.com/ggml-org/llama.cpp/issues/27638)）。
12. **服务器 `batch_view` 偏移未传播到 `ctx_dft`**（在 `update_slots()` 中）—— 投机 batch 路径中的细微正确性问题（[#24840](https://github.com/ggml-org/llama.cpp/issues/24840)）。
13. **视觉模型的 KV cache 保存（`/slots/N?action=save`）失效**（[#19466](https://github.com/ggml-org/llama.cpp/issues/19466)）。

今日已落地的修复：SYCL 内存检测（[#28227](https://github.com/ggml-org/llama.cpp/pull/28227)）、Nemotron-H 除零保护（[#28779](https://github.com/ggml-org/llama.cpp/pull/28779)）、Vulkan NV submit 互斥锁（[#28830](https://github.com/ggml-org/llama.cpp/pull/28830)）、MiMo-V2 SWA pattern 加载（[#28865](https://github.com/ggml-org/llama.cpp/pull/28865)），以及一批错误的 `get_key_or_arr` 用法（[#28868](https://github.com/ggml-org/llama.cpp/pull/28868)）。

## 6. 对应用开发者的意义

- **Agent/MCP 可靠性是当前薄弱环节。** 超过约 1–5 KB tool payload 的 stdio MCP 死锁（[#28723](https://github.com/ggml-org/llama.cpp/issues/28723)）会影响重度使用工具的 agent；在修复前，请保持工具输出较小，或使用非 stdio 传输。
- **Responses API 正在收敛，但仍不完整。** 正在添加 `function_call_output` 中的 `input_image`（[#28847](https://github.com/ggml-org/llama.cpp/pull/28847)），这为 Codex 风格的 `view_image` 工具解除了阻塞。完整的 `/v1/responses` 支持仍是得票最高的未实现请求（[#19138](https://github.com/ggml-org/llama.cpp/issues/19138)，41 👍）。
- **Qwen3-Coder 的 prompt-cache 复用得到修复。** 在 reasoning-budget 结束时强制写入 `\n</think>`，可让模板渲染在各轮之间保持一致（[#28869](https://github.com/ggml-org/llama.cpp/pull/28869)）；同时也改进了 qwen3 parser 中的复杂类型解析（[b10936](https://github.com/ggml-org/llama.cpp/releases/tag/b10936)）。
- **结构化日志现在是一等公民。** `LOG_JSON`（[#28586](https://github.com/ggml-org/llama.cpp/pull/28586)）使 llama.cpp 日志可以实际接入可观测性流水线，而不再需要正则抓取。
- **模型缓存生命周期管理仍然缺失。** 列出/删除缓存模型仍是一个未实现、高票的增强请求（[#16393](https://github.com/ggml-org/llama.cpp/issues/16393)，21 👍）—— 请围绕 HF 下载路径自行规划缓存淘汰。
- **视觉 + KV cache 持久化尚未达到生产安全。** 对启用视觉的模型保存/恢复 slot 已失效（[#19466](https://github.com/ggml-org/llama.cpp/issues/19466)）；多模态流量中避免依赖缓存前缀。
- **本周后端选择比平时更重要。** 如果你使用 Vulkan/RDNA3，请注意 b10780 的 PP 回归（[#28752](https://github.com/ggml-org/llama.cpp/issues/28752)）；如果使用双 Intel Arc 加 draft 模型，在 TDR 问题（[#28778](https://github.com/ggml-org/llama.cpp/issues/28778)）解决前避免使用 SYCL 投机解码。升级前请固定构建版本并进行基准测试。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-14
来源：[github.com/ollama/ollama](https://github.com/ollama/ollama)

## 1. 今日亮点
过去 24 小时内没有版本发布。最重要的动态围绕 API/工具调用正确性和提示缓存行为：Anthropic 兼容的 system 角色处理与 Qwen3-Coder 工具 schema 渲染都在导致前缀缓存未命中，同时一个 Qwen3-Coder 数值工具参数 bug 已有修复 PR 处于开放状态。一个量化临时 blob 清理 PR 也针对大量磁盘泄漏，而已关闭的 Vulkan 直接 I/O PR 解决了集成 GPU 加载回归。

## 2. 版本发布与破坏性变更
过去 24 小时内无。没有新版本、API/配置变更或迁移说明。

## 3. 新模型与硬件支持
- **Windows 图像生成支持**：已关闭的 PR [#13806](https://github.com/ollama/ollama/pull/13806) 为 Windows 添加图像生成，并携带临时的上游 MLX 补丁。请关注未来版本。
- **集成 Vulkan GPU**：已关闭的 PR [#18124](https://github.com/ollama/ollama/pull/18124) 对集成 Vulkan GPU 改用直接 I/O，与 CUDA/ROCm 保持一致。它修复了 Virtio-GPU/Venus 上 0.32.9 到 0.32.10 之间的模型加载回归。
- **IQ3_S 量化问题**：使用 `IQ3_S` 的 Qwen3.8-27B-GSQ-RCO-GGUF 尽管 `done_reason: "stop"`，仍返回空内容（[#18297](https://github.com/ollama/ollama/issues/18297)）。
- **Jetson Orin Nano 8GB**：Gemma 4 E4B 多模态投影器即使配置为 CPU 投影器，仍会导致主机 OOM（[#18396](https://github.com/ollama/ollama/issues/18396)）。
- **模型请求**：请求支持 SARVAM-30B/105B（[#14319](https://github.com/ollama/ollama/issues/14319)）和 Gnani Evon-v3.3（[#18427](https://github.com/ollama/ollama/issues/18427)）。

## 4. 性能与优化
- **Qwen3-Coder 上的提示缓存未命中**：额外的工具 schema 键以随机顺序渲染，因此相同请求会生成不同提示，只能部分复用前缀缓存。影响 `/api/chat` 和 `/v1/chat/completions`（[#18430](https://github.com/ollama/ollama/issues/18430)）。
- **Anthropic 兼容性导致前缀缓存失效**：`messages` 内的 system 角色消息被提升到顶层 system 块，破坏按位置的前缀缓存。这在 Claude Code 中工具结果之后尤其明显（[#18431](https://github.com/ollama/ollama/issues/18431)）。
- **量化磁盘泄漏修复**：从 safetensors 执行 `ollama create --quantize` 会留下中间 F16 blob。一份报告显示 `~/.ollama/models` 中有 69 个未引用 blob，总计 830 GB；一次 26B MoE 导入可能留下约 50 GB 未引用数据。PR [#18424](https://github.com/ollama/ollama/pull/18424) 会清理这些。
- **工具数值解析修复**：PR [#18422](https://github.com/ollama/ollama/pull/18422) 会保留 Qwen3-Coder 工具 `number` 参数超出 `int64` 范围的值，而不是将其钳制，修复 [#18421](https://github.com/ollama/ollama/issues/18421)。
- **Vulkan 直接 I/O**：PR [#18124](https://github.com/ollama/ollama/pull/18124) 针对集成 GPU 加载性能/可靠性。

## 5. 稳定性与回归
按严重程度排序：

1. **`kimi-k3:cloud` 在工具角色消息包含图像内容时 HTTP 500** — 是 `kimi-k2.6` 的回归；`glm-5.3-flash` 正常。云 OpenAI 兼容端点崩溃（[#18426](https://github.com/ollama/ollama/issues/18426)）。未见修复 PR。
2. **Qwen3-Coder 工具解析器会错误处理 `int64` 范围外的数值** — 例如在 macOS/ARM64 上 `1e20` 变成 `9223372036854775807`（[#18421](https://github.com/ollama/ollama/issues/18421)）。修复 PR：[#18422](https://github.com/ollama/ollama/pull/18422)。
3. **Qwen3.6 工具调用模板漂移导致 500** — `qwen3.6` 注册了 `qwen3.5` 的解析器/渲染器；间歇性工具调用反序列化失败（[#16383](https://github.com/ollama/ollama/issues/16383)）。未见修复 PR。
4. **Qwen 3.8 “no user query found in messages” 500** — 在带工具循环的聊天流式传输期间发生；25 👍（[#17778](https://github.com/ollama/ollama/issues/17778)）。未见修复 PR。
5. **`/api/codex/v1/responses` 静默返回空补全** — `previous_response_id` 工具后续请求返回 HTTP 200，但 `output_text` 为空且 token 数为零（[#18419](https://github.com/ollama/ollama/issues/18419)）。未见修复 PR。
6. **Gemma 4 图像处理在 Windows 上失败** — 图像已附加，但模型看不到；44 条评论（[#16532](https://github.com/ollama/ollama/issues/16532)）。未见修复 PR。
7. **Jetson Orin Nano 8GB OOM**（使用 Gemma 4 E4B 多模态投影器）（[#18396](https://github.com/ollama/ollama/issues/18396)）。未见修复 PR。
8. **`qwen3-coder:480b-cloud` 忽略云 JSON 回复 schema**（[#12362](https://github.com/ollama/ollama/issues/12362)）。未见修复 PR。
9. **IQ3_S 量化返回空内容**，涉及 Qwen3.8-27B-GSQ-RCO-GGUF（[#18297](https://github.com/ollama/ollama/issues/18297)）。未见修复 PR。
10. **未应用 EXIF 方向** — 设置 EXIF 方向时，模型看到的是旋转后的图像（[#18418](https://github.com/ollama/ollama/issues/18418)）。未见修复 PR。
11. **目录省略号触发“cancel task”** — 标题与页码之间超过十个省略号会中断 Windows 上的生成（[#18387](https://github.com/ollama/ollama/issues/18387)）。未见修复 PR。
12. **发布产物缺少许可证声明** — 像 llama.cpp 这样的静态链接 MIT 项目未分发版权声明；275 👍，持续存在的合规问题（[#3185](https://github.com/ollama/ollama/issues/3185)）。未见修复 PR。

## 6. 这对应用开发者意味着什么
- **如果你使用 Anthropic 兼容端点或 Claude Code**，请避免依赖 `messages` 内的 system 角色消息；按位置的 system 消息会被提升，并在 [#18431](https://github.com/ollama/ollama/issues/18431) 修复前损害前缀缓存复用。
- **对于 Qwen3-Coder 工具使用**，尽可能对工具 schema 键排序/固定，以减少缓存未命中，并避免 `int64` 范围外的大数值参数，或等待 [#18422](https://github.com/ollama/ollama/pull/18422)。
- **云模型 JSON schema 不可靠** — 请在客户端验证结构化输出，尤其是使用 `qwen3-coder:480b-cloud` 时（[#12362](https://github.com/ollama/ollama/issues/12362)）。
- **Codex responses API 用户**：在发布 agent 循环前，检查 `previous_response_id` 工具后续请求是否返回空 `output_text` 和零 token 数（[#18419](https://github.com/ollama/ollama/issues/18419)）。
- **多模态应用**：通过剥离或应用 EXIF 方向来预处理图像；Windows 上 Gemma 4 图像处理仍然有问题（[#18418](https://github.com/ollama/ollama/issues/18418), [#16532](https://github.com/ollama/ollama/issues/16532)）。
- **量化工作流**：如果从 safetensors 使用 `ollama create --quantize`，请监控磁盘使用量；在 [#18424](https://github.com/ollama/ollama/pull/18424) 合入前，当前版本可能泄漏大型中间 blob。
- **硬件注意事项**：一旦 [#18124](https://github.com/ollama/ollama/pull/18124) 发布，集成 Vulkan GPU 用户应会得到缓解；Jetson Orin Nano 8GB 用户应避免使用 Gemma 4 E4B 多模态，直到 OOM 问题解决（[#18396](https://github.com/ollama/ollama/issues/18396)）。
- **正在推进的社区集成**：Genie（[#18428](https://github.com/ollama/ollama/pull/18428)）、Clips Kitty（[#18423](https://github.com/ollama/ollama/pull/18423)）、SlopShield（[#18420](https://github.com/ollama/ollama/pull/18420)）以及 n8n/ComfyUI 文档（[#18316](https://github.com/ollama/ollama/pull/18316)）。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-14

## 1. 今日亮点
LiteLLM 发布了 **v1.102.0-rc.1**，可见的发布说明聚焦于 **cosign Docker 镜像签名验证** ([release](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-rc.1))。**Rust 迁移**父 issue 仍是互动量最高的条目，目标是将网关开销降至 **1ms 以下** ([#31263](https://github.com/BerriAI/litellm/issues/31263))。当前活跃 bug 队列集中在 **提供商参数泄漏、`/v1/responses` 流式传输、spend/预算核算以及 Anthropic `/v1/messages` 护栏覆盖**。

## 2. 版本发布与破坏性变更
- **v1.102.0-rc.1** — RC 版本。Docker 镜像使用 cosign 签名；请在部署流水线中验证签名。提供的发布摘录中未出现破坏性 API/配置变更或迁移说明：[release](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-rc.1)。
- 待合并依赖 PR：**urllib3 2.6.3 → 2.7.0** ([#27663](https://github.com/BerriAI/litellm/pull/27663))。未注意到其他发布级别的破坏性变更。

## 3. 新模型与硬件支持
- 通过 Microsoft Foundry 支持 **Azure Kimi-K2.7-Code**：已关闭的功能请求 ([#32613](https://github.com/BerriAI/litellm/issues/32613))。
- **DashScope Qwen 3.6/3.7 定价**覆盖：已关闭 issue ([#29922](https://github.com/BerriAI/litellm/issues/29922))。
- 待合并的提供商/模型新增：
  - **ai& (aiand)** 提供商 ([#38958](https://github.com/BerriAI/litellm/pull/38958))。
  - **Nanobridge** OpenAI 兼容提供商 ([#29591](https://github.com/BerriAI/litellm/pull/29591))。
  - **CometAPI** 的 images/audio/moderations 端点 ([#29580](https://github.com/BerriAI/litellm/pull/29580))。
  - **OpenRouter Qwen `cache_control`** 支持 ([#29335](https://github.com/BerriAI/litellm/pull/29335))。
- 此快照中未出现 CUDA/ROCm/Metal/CPU 后端或量化格式变更。

## 4. 性能与优化
- **Rust 迁移**是主要性能工作线：issue #31263 旨在实现一个**开销低于 1ms** 的 AI 网关；博客和 beta 测试者链接在该 issue 中。状态：开放中/进行中：[#31263](https://github.com/BerriAI/litellm/issues/31263)。
- **客户端断连中继** PR #27146 仍为 WIP，并明确要求在高并发负载下进行回归性能剖析，以及在请求取消时进行内存泄漏检查；尚无已落地的基准测试数据：[#27146](https://github.com/BerriAI/litellm/pull/27146)。
- 提供的数据中未出现其他具体的吞吐量、延迟或内存数据。

## 5. 稳定性与回归

**严重 / 安全**
- **护栏盲点：** `custom_code` 和 `tool_permission` 护栏无法检查或阻止通过 Anthropic `/v1/messages` 格式发送的 MCP 工具。开放中，5 条评论。相关修复 PR：Anthropic 透传预调用钩子 ([#27609](https://github.com/BerriAI/litellm/pull/27609)) 以及 tool_result 扫描 ([#29594](https://github.com/BerriAI/litellm/pull/29594))：[#40583](https://github.com/BerriAI/litellm/issues/40583)。
- **信息泄露：** 未认证的 `/model/info` 暴露问题已关闭 ([#29911](https://github.com/BerriAI/litellm/issues/29911))。
- **授权：** 模型访问检查在 Virtual Key 上直接忽略了 `access_group_ids`；已关闭 ([#28464](https://github.com/BerriAI/litellm/issues/28464))。

**高影响**
- **自托管安装失败**，原因是 `schema.prisma` 权限 (`prisma generate`)；开放中，7 条评论，4 👍。未列出修复 PR：[#26097](https://github.com/BerriAI/litellm/issues/26097)。
- **内部 `optional_params` 泄漏到提供商请求体**，导致 Bedrock/embedding 400 错误；开放 issue [#30301](https://github.com/BerriAI/litellm/issues/30301)，修复 PR [#41025](https://github.com/BerriAI/litellm/pull/41025)。
- **`chatgpt/` gpt-5.6-sol 的 `response.completed.output[]` 为空**，尽管已有流式内容；已关闭 issue [#41017](https://github.com/BerriAI/litellm/issues/41017)，修复 PR [#31332](https://github.com/BerriAI/litellm/pull/31332) 从 `output_item.done` 回填 output。
- **流式 `/v1/responses` 日志记录器崩溃** (`'dict' object has no attribute 'usage'`)，导致没有 spend 日志/请求未计费；已关闭 ([#29913](https://github.com/BerriAI/litellm/issues/29913))。
- **无法估算请求成本时跳过预算预留**，使预算暴露于并发超支风险；开放中 ([#35524](https://github.com/BerriAI/litellm/issues/35524))。
- **为空的提供商响应 ID** 被记录为字符串 `"None"`，并作为重复 spend 行被丢弃；开放 PR [#41026](https://github.com/BerriAI/litellm/pull/41026) 回退到调用 ID。
- **Vertex AI Claude 带版本 ID** 会静默获得 4096 `max_tokens` 默认值，且 haiku-4-5 映射条目将输出上限设为 8192 而不是 64000；开放中 ([#40363](https://github.com/BerriAI/litellm/issues/40363))。
- **Valkey 语义缓存**失败，因为 `_get_async_embedding()` 转发的是 `**kwargs` 而不是 `metadata`；开放中 ([#32324](https://github.com/BerriAI/litellm/issues/32324))。
- **流式 usage 合并器**在显式更新为零后仍保留过期的缓存写入 token；开放中 ([#40736](https://github.com/BerriAI/litellm/issues/40736))。
- **Ollama 自定义提示模板**在省略 `initial_prompt_value` 或 `final_prompt_value` 时抛出 `KeyError`；开放中 ([#39759](https://github.com/BerriAI/litellm/issues/39759))。
- **`reasoning_effort` 处理：** 当模型映射缺少相应能力时，`xhigh` 被静默降级 ([#40471](https://github.com/BerriAI/litellm/issues/40471))；Responses-to-Chat 桥接转发了 dict 形式的 `reasoning_effort`，破坏了严格的 OpenAI 兼容提供商/Codex CLI；已关闭 ([#39354](https://github.com/BerriAI/litellm/issues/39354))。
- **组件化网关/后端**忽略 DB 连接池限制，且 IAM 刷新会丢弃 URL 参数；开放中 ([#33021](https://github.com/BerriAI/litellm/issues/33021))。
- **`langfuse_otel`** 从不为 `/v1/rerank` 设置 observation output；开放中 ([#36537](https://github.com/BerriAI/litellm/issues/36537))。
- **缓存命中的 spend/token 语义：** spend 被置零，但 token 列会重放原始 usage，引发报告口径问题；开放中 ([#39057](https://github.com/BerriAI/litellm/issues/39057))。
- **预算配置困惑**仍然活跃，有 12 条评论 ([#19105](https://github.com/BerriAI/litellm/issues/19105))。

**窗口期内已关闭/已修复（节选）**
- `cache_control_injection_points` 在 `/v1/responses` 上无操作，以及确定性的 Claude 工具调用循环 ([#29810](https://github.com/BerriAI/litellm/issues/29810))。
- WebSocket `/v1/responses` 要求 `?model=` 查询参数，破坏了 OpenAI 规范兼容性 ([#25532](https://github.com/BerriAI/litellm/issues/25532))。
- `simple-shuffle` 在第一个健康部署没有权重时忽略了权重 ([#33329](https://github.com/BerriAI/litellm/issues/33329))。
- `model_max_budget` 在不同模型/时长之间共享同一个预算窗口起点 ([#33326](https://github.com/BerriAI/litellm/issues/33326))。
- 非传输类数据库写入失败时丢弃 spend-log 批次 ([#33873](https://github.com/BerriAI/litellm/issues/33873))。
- SambaNova 成本映射过期/不正确 ([#29011](https://github.com/BerriAI/litellm/issues/29011))。
- Prometheus 端点缺少剩余预算 ([#29937](https://github.com/BerriAI/litellm/issues/29937))。
- 透传端点缺少 RPM/max-concurrency 限制 ([#29921](https://github.com/BerriAI/litellm/issues/29921))。
- Request Logs 会话侧边栏排序顺序 ([#29916](https://github.com/BerriAI/litellm/issues/29916))。

**值得关注的开放修复 PR**
- 提供商边界的内部参数过滤 ([#41025](https://github.com/BerriAI/litellm/pull/41025))。
- 空响应 ID 的 spend 回退 ([#41026](https://github.com/BerriAI/litellm/pull/41026))。
- Responses 流式 `sequence_number`、`text.format`、usage 详情 ([#28899](https://github.com/BerriAI/litellm/pull/28899))。
- Router 在每次回退尝试时深拷贝 kwargs ([#27462](https://github.com/BerriAI/litellm/pull/27462))。
- Team 封禁/解封缓存刷新 ([#28752](https://github.com/BerriAI/litellm/pull/28752))。
- Anthropic 适配器 bug 合集 ([#28684](https://github.com/BerriAI/litellm/pull/28684))。
- Fireworks AI JSON Schema 字段剥离 ([#28698](https://github.com/BerriAI/litellm/pull/28698))。
- AssemblyAI EU 区域检测 ([#28748](https://github.com/BerriAI/litellm/pull/28748))。
- 针对提供商特定字段/正文快照的日志脱敏 ([#28611](https://github.com/BerriAI/litellm/pull/28611))。
- SSO 登录错误处理 ([#26405](https://github.com/BerriAI/litellm/pull/26405))。

## 6. 这对应用开发者意味着什么
- **如果你使用 Docker：** v1.102.0-rc.1 是 RC；上线前请验证 cosign 签名。此快照中未出现迁移步骤。
- **在 Anthropic `/v1/messages` 上使用护栏的用户：** 目前 MCP 工具可能绕过 `custom_code`/`tool_permission` 的预调用护栏。请测试阻断路径，并跟踪 [#40583](https://github.com/BerriAI/litellm/issues/40583)、[#27609](https://github.com/BerriAI/litellm/pull/27609) 和 [#29594](https://github.com/BerriAI/litellm/pull/29594)。
- **提供商兼容性：** 内部参数泄漏可能导致 Bedrock/embeddings 返回 400；[#41025](https://github.com/BerriAI/litellm/pull/41025) 是值得关注的修复。同时请验证 Vertex AI Claude `max_tokens` 和 Ollama 提示模板行为。
- **Spend/预算准确性：** 审计缓存命中 token 报告、预算预留和空响应 ID。多个计费修复处于开放/已落地状态；避免依赖未计费或重复的 spend 行进行账单结算。
- **严格的 Responses API 客户端：** [#31332](https://github.com/BerriAI/litellm/pull/31332) 和 [#28899](https://github.com/BerriAI/litellm/pull/28899) 等修复针对 Codex/Grok 风格的流解析器。如果你遇到空的 `response.completed` 或缺少 sequence/usage 字段，请在可用后升级。
- **新的提供商/模型选择：** ai&、Nanobridge、CometAPI、Azure Kimi K2.7 Code 和 OpenRouter Qwen `cache_control` 是值得评估的显著新增/PR。
- **Rust 网关：** 对低开销部署很有前景，但仍处于 beta/进行中；应计划基准测试，而不是立即迁移生产环境。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要 — 2026-09-14

## 1. 今日亮点
过去 24 小时内没有新的 GitHub 版本发布；活动主要集中在 Studio 安装器/更新可靠性、Agent 工具正确性和训练性能上。最高风险项是 Studio 安全检查绕过，可执行 `reboot`/`rm` 等命令（[#10835](https://github.com/unslothai/unsloth/issues/10835)），以及系统性的 MCP 工具调用截断（[#10839](https://github.com/unslothai/unsloth/issues/10839)）。在基础设施方面，PR 旨在减少重复的安装/依赖校验（[#10649](https://github.com/unslothai/unsloth/pull/10649)、[#10648](https://github.com/unslothai/unsloth/pull/10648)），而一份 B200 Qwen3.5-9B LoRA 报告显示，由于 FLA 自动调优键重建，GPU 处于空闲状态（[#10806](https://github.com/unslothai/unsloth/issues/10806)）。

## 2. 版本发布与破坏性变更
- **过去 24 小时内无新版本发布**。
- **兼容性：** Docker 镜像 `2026.9.4` 报错 `SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`；该字段似乎已迁移到 `max_length`。该问题已关闭，但使用该镜像/软件包的用户应迁移配置。（[#10785](https://github.com/unslothai/unsloth/issues/10785)）

## 3. 新模型与硬件支持
- **PaliGemma v1 + v2 LoRA 微调：** 开放 PR 增加支持；Gemma/Gemma2 语言骨干通过类级补丁继承 fast-attention 内核。（[#5218](https://github.com/unslothai/unsloth/pull/5218)）
- **Linux aarch64：** 开放 PR 从 PyTorch `cuXXX` 索引安装 `torchcodec`，因为 PyPI 缺少 aarch64 wheel。（[#4456](https://github.com/unslothai/unsloth/pull/4456)）
- **Intel XPU：** XPU Triton 替换仍然失败；原始 issue 已关闭，后续 issue 仍处于开放状态，且此前的补丁并未完全解决。（[#10844](https://github.com/unslothai/unsloth/issues/10844)、[#10018](https://github.com/unslothai/unsloth/issues/10018)）
- **Windows ARM64：** 桌面安装器在 `pyarrow` 上失败，而 CLI 可成功。（[#10875](https://github.com/unslothai/unsloth/issues/10875)）
- **NVIDIA B200/Blackwell：** 在 B200/CUDA 12.8/sm_100 上进行 Qwen3.5-9B LoRA 训练时，报告称 FLA 每次启动都会重建其自动调优键。（[#10806](https://github.com/unslothai/unsloth/issues/10806)）
- **Nemotron 注意力处理：** 存在关于注意力处理的开放 bug。（[#7527](https://github.com/unslothai/unsloth/issues/7527)）

## 4. 性能与优化
- **安装/更新缓存：** PR #10649 在证据成立时跳过依赖遍历步骤；PR #10648 通过标记来判断 llama.cpp/whisper.cpp/Node 安装，避免重复校验（macOS 13–63 秒，Windows 约 5 秒）。（[#10649](https://github.com/unslothai/unsloth/pull/10649)、[#10648](https://github.com/unslothai/unsloth/pull/10648)）
- **安装器修复：** PR #10626 解决了在可写安装中无法触达自适应 `uv` 缓存选择的问题。（[#10626](https://github.com/unslothai/unsloth/pull/10626)）
- **KV 显存估算器：** PR #8994 移除了未使用的 `ctx_checkpoints` 项。（[#8994](https://github.com/unslothai/unsloth/pull/8994)）
- **投机解码：** PR #5623 增加了 `spec_draft_p_min` 和 `ngram-map-k/k4v` 的 wire 值。（[#5623](https://github.com/unslothai/unsloth/pull/5623)）
- **训练吞吐：** #10806 报告称，在 B200 上，由于 FLA 自动调优键重建，Qwen3.5-9B LoRA 的每一步中 GPU 大部分时间处于空闲状态。（[#10806](https://github.com/unslothai/unsloth/issues/10806)）
- **多 GPU：** #10355 报告 `--tensor-split` 被忽略。（[#10355](https://github.com/unslothai/unsloth/issues/10355)）
- **工具输出：** #10135 请求可配置的截断；当前上限约为 16,000 字符。（[#10135](https://github.com/unslothai/unsloth/issues/10135)）
- **RAG SQLite：** PR #10861 针对 #8854 修复了 SQLite <3.41 上的稠密检索。（[#10861](https://github.com/unslothai/unsloth/pull/10861)、[#8854](https://github.com/unslothai/unsloth/issues/8854)）

## 5. 稳定性与回归
按严重程度排序：

- **严重 — Studio 安全检查绕过：** 精心构造的命令可以执行 `reboot`、`rm` 等。（[#10835](https://github.com/unslothai/unsloth/issues/10835)）
- **高 — MCP 调用被系统性截断：** 无法绕过；疑似去重问题。（[#10839](https://github.com/unslothai/unsloth/issues/10839)）
- **高 — RAG/项目文件列出及读/写/编辑失败：** 针对较旧 SQLite 运行时的部分修复 PR #10861。（[#8854](https://github.com/unslothai/unsloth/issues/8854)、[#10861](https://github.com/unslothai/unsloth/pull/10861)）
- **高 — Intel XPU Triton 替换仍然失败：** 首次补丁后，`triton-windows` 会遮蔽 torch XPU Triton。（[#10844](https://github.com/unslothai/unsloth/issues/10844)、[#10018](https://github.com/unslothai/unsloth/issues/10018)）
- **高 — Windows ARM64 桌面安装器在 pyarrow 上失败：** CLI 路径可用。（[#10875](https://github.com/unslothai/unsloth/issues/10875)）
- **中 — B200 Qwen3.5-9B LoRA 训练 GPU 空闲：** FLA 自动调优重建。（[#10806](https://github.com/unslothai/unsloth/issues/10806)）
- **中 — `--tensor-split` 被忽略。**（[#10355](https://github.com/unslothai/unsloth/issues/10355)）
- **中 — 安装器忽略所选文件夹：** 将依赖安装到 `~/.unsloth` 下。（[#10859](https://github.com/unslothai/unsloth/issues/10859)）
- **中 — `install.ps1` 被防病毒软件标记。**（[#10805](https://github.com/unslothai/unsloth/issues/10805)）
- **中 — Nemotron 注意力处理 bug。**（[#7527](https://github.com/unslothai/unsloth/issues/7527)）
- **较低 — Phi3.5 单 token/二分类损失变为 0。**（[#946](https://github.com/unslothai/unsloth/issues/946)）
- **今日已关闭：** Studio 本地 HF 缓存训练因 `model-00000-of-00001.safetensors` 未命中允许列表而失败（[#10853](https://github.com/unslothai/unsloth/issues/10853)）；重复工具调用防护阻止编辑后重新运行测试（[#10792](https://github.com/unslothai/unsloth/issues/10792)）；`SFTConfig.max_seq_length` 不兼容（[#10785](https://github.com/unslothai/unsloth/issues/10785)）。
- **开放中的修复 PR：** conversation_extension 崩溃（[#8373](https://github.com/unslothai/unsloth/pull/8373)）；adapter_config 绝对路径（[#5079](https://github.com/unslothai/unsloth/pull/5079)）；uv 不可用时的 venv 回退（[#6766](https://github.com/unslothai/unsloth/pull/6766)）；沙箱 llama.cpp 校验（[#6739](https://github.com/unslothai/unsloth/pull/6739)）。
- **工具提示行为：** 已关闭的 PR #5052 为小模型弱化了工具使用提示；#9686 重新审视默认开启的工具调用提示。（[#5052](https://github.com/unslothai/unsloth/pull/5052)、[#9686](https://github.com/unslothai/unsloth/issues/9686)）

## 6. 对应用开发者的意义
- **在 #10835 修复之前，不要将 Unsloth Studio 工具执行暴露给不可信 prompt**；安全检查可被绕过。
- **使用 MCP/RAG 的 Agent 工作流应假定存在截断和文件列表缺口**（#10839、#8854、#10135）；应预留分块与重试开销，或固定到已修补的构建。较旧的 SQLite 运行时可通过 #10861 获得有针对性的 RAG 修复。
- **安装/更新路径仍然脆弱**，在 Windows ARM64、Intel XPU、受 AV 保护的 Windows 以及自定义安装文件夹上尤其如此；当桌面安装器失败时优先使用 CLI，并固定已知良好的软件包版本。
- **在 B200/Qwen3.5-9B 上训练：** 关注 FLA 自动调优键行为（#10806）和 tensor-split 支持（#10355）；在 Docker `2026.9.4` 上将 `max_seq_length` 迁移为 `max_length`（#10785）。
- **已请求但尚未落地：** Agent Builder 配置档案（[#10773](https://github.com/unslothai/unsloth/issues/10773)）；基于文件夹的项目（[#10873](https://github.com/unslothai/unsloth/issues/10873)）；多驱动器模型库（[#10872](https://github.com/unslothai/unsloth/issues/10872)）；GPU 拆分字段（[#10877](https://github.com/unslothai/unsloth/issues/10877)）；以及更好的默认 Studio/llama-server 日志（[#10793](https://github.com/unslothai/unsloth/issues/10793)）。

---

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*