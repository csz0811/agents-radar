# AI 基础设施日报 2026-09-08

> 生成时间: 2026-09-07 22:45 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 跨项目 AI 基础设施报告 — 2026-09-08

## 1. 生态系统概览

9月8日的快照显示，推理生态正处于三线作战状态：一边推进前沿模型能力，一边偿还混合/线性注意力架构带来的正确性技术债，一边应对 Blackwell 级 GPU 上的后端/硬件回归。vLLM 和 SGLang 都在消化 GDN 风格混合注意力模型与推测解码、PD 分离部署结合后产生的连锁影响——前缀缓存未命中、静默损坏、`temperature=0` 非确定性。llama.cpp 继续保持高频 kernel 适配/落地节奏（24 小时内 10 个构建），尤其在 Vulkan 上；Ollama 则通过一次待合并的 vendor bump 承接了这一势头。LiteLLM 和 Unsloth 分别在网关转换/预算正确性、CLI/训练可靠性上攻坚，但卡住它们的都是配置注册表或打包类 bug，而非 GPU/kernel 问题。总体来看：行业瓶颈已从纯解码吞吐转移到**新混合注意力架构下的正确性、快速启动/故障切换，以及 Blackwell/AMD 平台门控**。

## 2. 活动对比

统计各项目摘要中引用的去重 GitHub issue 与 PR 数量（24 小时窗口，非仓库总活动量）：

| 项目 | Issues（摘要引用） | PRs（摘要引用） | 发布状态（24 小时） |
|---|---|---|---|
| vLLM | ~26 | ~15 | 无发布；阻塞性修复 PR 在审（`#52244`、`#55749`） |
| SGLang | ~17 | ~18 | 无发布；**main 分支损坏**——`import sglang` 失败（`#38183`） |
| llama.cpp | ~10 | ~14 | **发布 10 个构建**（`b10831` → `b10850`） |
| Ollama | ~21 | ~13 | 无发布；llama.cpp vendor bump `b10760→b10829` 在审（`#18279`） |
| LiteLLM | ~17 | ~8 | 无发布 |
| Unsloth | ~21 | ~16 | 无发布/tag |

vLLM 的摘要以针对回归问题的侦探式排查为主（DeepSeek-V4-Flash/Kimi-K3 静默损坏、贪心解码非确定性、SM120 FP8 IMA）。SGLang 的控制面特性拥有异常高的 PR 速度（weight-cache daemon、prefill-CP 弃用），但被上游 transformers 版本锁定阻塞。llama.cpp 是唯一在 24 小时内真正发布代码的项目——而且是以高度聚焦的 kernel 增量方式推进。Ollama 和 Unsloth 处于“维护 + 等待上游”模式。LiteLLM 从发布角度看较为平静，但暴露了最深的 *API/注册表错误配置* 趋势（Bedrock 空 200 响应、`gpt-6-astra` 注册错误）。

## 3. 模型支持竞速

**24 小时内实际落地：**

- **llama.cpp** 交付了实打实的支持：Vulkan 上的 DeepSeek-V4 hyper-connection 融合算子（`#26578`，随 `b10844` 发布）、AMD `gfx90c` HIP 支持（`#26454`，`b10842`）、Vulkan TQ1_0（`#27765`）。值得注意的是，Vulkan 已不再缺失 DeepSeek-V4 路径——CUDA 和 Metal 早已具备。
- **Ollama** 的新模型支持离落地只差一个 llama.cpp 版本升级：为 Spark-X2.5 提供本地 `spark2_5` 架构支持（`#18279`），另有 MLX 静态 YaRN/RoPE 缩放在审（`#18263`、`#18285`）。

**在审 / 被阻塞：**

- **SGLang** 添加了 Qwen3.8-Flash-Next NVFP4 在 DGX Spark/RTX PRO 6000 上的部署方案（`#37995`），以及 AMD gfx950 的原生 FP8 e4m3 转换硬件路径（`#37140`）——但 GLM-5.2 FP4 + EAGLE 在 B200/B300 上仍然不可用。
- **vLLM** 受制约最明显：24 小时内没有合入任何模型支持。在审的有面向 Sarvam MLA 的 EAGLE3（`#53052`），以及 vendor 进来的 Phi-4-reasoning-vision（`#50652`）。目前明确缺少 SM120 上的 NVFP4 KV cache 支持（`#49011`）、GLM-5.3-Flash 架构（`#54062`），以及 SM80 上的 Qwen3.8-Flash-Next-FP8（`#54318`）。
- **LiteLLM** 在注册表整洁性上出现退步：`gpt-6-astra` 以错误模式注册（`mode: chat`，应为 responses；`#40123`），`openrouter/openai/gpt-5.6-sol` 未出现在 prices/config JSON 中（`#40102`）。
- **Unsloth** 有排队中的请求（Qwen3 AVL 2B/0.6B，`#10459`），但未合入任何支持。

**谁领先：** llama.cpp，靠的是执行速度。它几乎每天都能落地模型支持和 kernel 支持。就 *前沿推理服务* 的模型就绪度（大规模 GDN 混合 checkpoint）而言，目前没有引擎明显领先——vLLM 对 GDN+MTP 干扰问题拥有最深的调试积累；SGLang 在 AMD/NVFP4 部署方案上领先，但在 Blackwell/FlashInfer 组合上还需要稳定性。Ollama 和 Unsloth 属于衍生方：它们依赖 llama.cpp / 上游硬件支持。

## 4. 性能前沿

优化工作集中在五个不同方向：

- **启动/故障切换成本**：SGLang 的 Weight Cache Daemon 一期（`#27139`/`#33522`）是本期摘要中最具冲击力的数据点：借助 per-rank CUDA IPC，Qwen3-235B FP8 权重加载从约 306–327 秒降至 <1 秒。vLLM 也在同步推进启动工程：构建期 Python 字节码编译（`#55422`）和 opt-in 的 zstd 容器镜像（`#55608`）。
- **前缀缓存 + 推测解码**：vLLM 的 MTP hybrid-GDN 前缀 bug（`#53670`、`#54094`）在前缀复用工作负载上造成 30–40% 批处理吞吐损失，并在 100 万 token 提示词上导致零缓存复用。在审修复（`#52244`、`#55749`）针对哈希切片和缓存深度恢复。这是当前长上下文成本效益受损最严重的地方。
- **量化 / FP8 kernel 纵深**：SGLang 提议把 `_static_quant_fp8` 融合进 producer 的 epilogue（`#31504`）；vLLM 在 H20 上针对 GLM/DeepSeek 模型形状重新调优 block-FP8 MoE（+21%，`#54668`）；llama.cpp 为 mmvq 合入无分支的 Q4_K/Q5_K 解包实现（`#26705`）。反向趋势是：在 SM80/SM103/SM120 级目标上，FP8/NVFP4/KV-cache 支持在两个引擎中要么 *缺失*，要么门控错误。
- **Kernel 层 bring-up**：llama.cpp 的 Vulkan 融合工作已产生实测收益（Gemma 4 上 RMS_NORM 融合约 4%；`iq4_xs` 着色器预计在 RDNA4 上带来 +6–17% 生成性能提升）；SYCL 批处理 L2_NORM 使 dispatch 数量减半；面向 head_dim 256 的 CUDA/AMD MMA 正在推进（`#26419`）。
- **分布式服务**：SGLang 的 prefill-CP V2 弃用/重命名（`#36229`、`#38293`）给自定义 CP 部署带来一波破坏性变更。vLLM 在推进 Elastic EP 缩容路由（`#55772`）和 PD 分离正确性工作——但那边最显眼的是 *回归* 而非速度：Kimi-K3 在 NIXL Direct-PD 上的静默损坏（`#52627`），以及 DeepSeek-V4-Flash 的 inline-system-message 路径（`#46710`）。

## 5. 分层定位

| 层 | 项目 | 核心定位 |
|---|---|---|
| **本地引擎/kernels（C++）** | llama.cpp | 全生态最底层的公共底座：GGUF、CPU/Metal/Vulkan/CUDA/SYCL/HIP kernels、量化格式。它不是分布式服务框架，而是为上层一切提供能力支撑。 |
| **本地应用运行时** | Ollama | 位于 llama.cpp 之上，面向开发者的分发和进程生命周期管理。其价值在于模型管理、OpenAI 兼容本地 API、Apple/桌面端体验，而非 kernel 创新。它的定位从依赖升级和调度器回归就能看出来（5× CUDA 性能衰减 `#18225`）。 |
| **数据中心服务引擎** | vLLM、SGLang | 两者在多 GPU、多请求、分离式生产服务场景同台竞技。本期摘要注意到的高层差异：vLLM 优先围绕 PD/MTP/GDN 做正确性考古；SGLang 在推进控制面性能创新（Weight Cache Daemon、HiCache 设备 IPC、prefill-CP V2、KV 组件感知分层）。 |
| **网关/控制面** | LiteLLM | 位于所有引擎和模型提供商的上游。关注协议转换（Anthropic ↔ OpenAI）、预算/速率限制、注册表正确性、成本分类。没有 GPU/执行层。 |
| **微调/训练** | Unsloth | 向下深入 PyTorch/kernels，为 LoRA/QLoRA 和 GPU offload 做优化。正在向本地推理/Studio 扩展，而它的 CLI/配置和 agent 循环 bug 目前正集中在那里。 |

层间张力：Ollama 实际上就是 llama.cpp 的“产品层”；SGLang 与 vLLM 的差异化越来越体现在调度器/缓存架构上，而非模型支持本身；LiteLLM 的价值完全取决于上游模型注册表的准确性——而这目前恰好是它最薄弱的环节。

## 6. 趋势信号

1. **混合注意力正在打破长期以来的服务假设。** GDN/DFlash2/Mamba-2 混合架构 + MTP 推测解码正在导致整体前缀缓存未命中（vLLM `#54094`）、静默损坏（SGLang `#38031`、vLLM `#52627`）和工具调用丢失（vLLM `#39056`、llama.cpp `#20837`/`#28522`）。任何运行 Qwen3.5/GLM-5.3/DeepSeek-V4 级混合架构模型的团队，都应把前缀缓存、推理/工具输出和长上下文稳定性视为 *不可信*，并加上验证层。

2. **`temperature=0` 可复现性已不再是默认保障。** Qwen3.8-Flash-Next 和 DeepSeek-V4-Flash 在接近 QSA 预算上限的贪心设置下都出现“五次请求五种输出”的现象（`#54521`、`#53257`）。batch-invariant 推理（`#27433`）至今仍开放、已有 89 条评论，vLLM 这边 24 小时内也没有修复；应用开发者需要加语义校验，或固定 batch-invariant 配置。

3. **Blackwell 平台门控 bug 是当下跨栈的共同主题。** SGLang 的 `is_sm100_supported()` 只检查 major==10，导致 sm_103 也会执行 SM100 路径（Xid 13、挂起；`#34340`、`#38300`）；vLLM 出现了新的 SM120 FP8 IMA 报告（`#55571`）；Ollama 发布的 CUDA 13 构建在 sm_86 上会静默回退到 CPU（`#17841`）。结论：硬件检测/家族门控现在已经是会产生 GPU 级规模后果的正确性 bug——请锁定已知良好的后端版本，或默认采用保守的 kernel 路径。

4. **重启成本模型正在被重新定义。** SGLang 的亚秒级 235B 权重加载、vLLM 的启动字节码和 zstd 镜像工作，都在让快速故障切换成为现实。如果你运营大规模自托管集群，请密切关注这些 PR——它们会改变你规划副本池规模和 RTO 预算的方式。

5. **Agent 流量考验的是“指令遵从”，而不仅仅是 token。** SGLang 上已断开流式客户端残留的僵尸请求（`#36333`）、vLLM MRV2 中思考预算未强制执行（`#54906`）、vLLM/llama.cpp 上 `<think>` 内被丢弃的工具调用、以及 LiteLLM 多轮工具调用回归（`#32214`）都表明：Agent 工作负载的 *生命周期语义*——中止、预算、工具调用边界——是下一个推理服务前沿。请在客户端构建重试/清洗逻辑，不要指望技术栈自我修复。

6. **从源码部署前先检查 main 分支健康状况。** SGLang 的 main 目前因 transformers 版本锁定而无法 import（`#38183`）；Ollama v0.33.2 包含约 5× CUDA 吞吐回归（`#18225`），已知 v0.32.13 正常。在快速演进的生态里，版本锁定已经是第一级的可靠性决策——不是运维的事后补充。

**给技术决策者的底线：** llama.cpp 是新模型/新硬件 bring-up 实验最稳妥的通道。如果你用混合注意力 checkpoint 承载生产流量，请预期 vLLM/SGLang 在前缀缓存/MTP 验证 PR 合并前会处于“正确但有损耗”的状态——所以多加验证、多留容量余量、锁定版本。如果你运行 Blackwell 级 GPU，在信任 FP8 kernel 前务必核实你的 sm-family 门控。如果你在构建 agent 应用，在引擎收敛流式解析器和生命周期语义之前，请把工具调用解析和断连处理当作应用层问题来解决。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 文摘 — 2026-09-08

## 1. 今日要点

过去 24 小时内没有新的 vLLM 版本发布；当前窗口期的主要焦点是混合注意力（GDN）模型与推测解码组合带来的正确性和吞吐量问题，外加一批新增的 Blackwell/SM120 稳定性报告。用于恢复混合 GDN 模型 MTP 前缀缓存命中的 V1 修复（[#52244](https://github.com/vllm-project/vllm/pull/52244)）和一项 prefill 哈希切分优化（[#55749](https://github.com/vllm-project/vllm/pull/55749)）正在审查中——它们共同针对已报告的 30–40% 批量吞吐损失（[#53670](https://github.com/vllm-project/vllm/issues/53670)）以及 1M-token 提示词上完全无法命中的前缀缓存问题（[#54094](https://github.com/vllm-project/vllm/issues/54094)）。最活跃的正确性讨论仍然是：Qwen3.8-Flash-Next（[#54521](https://github.com/vllm-project/vllm/issues/54521)）和 DeepSeek-V4-Flash（[#53257](https://github.com/vllm-project/vllm/issues/53257)）在 `temperature=0` 时的贪心解码不确定性，PD 分离部署中的静默输出损坏（[#46710](https://github.com/vllm-project/vllm/issues/46710)、[#52627](https://github.com/vllm-project/vllm/issues/52627)），以及推理区域内的工具调用丢失（[#39056](https://github.com/vllm-project/vllm/issues/39056)）。

## 2. 发布与破坏性变化

过去 24 小时内没有发布新的版本 tag，也没有合入的 PR 在此窗口引入 API 或配置破坏性变化。有一项在途行为变化值得关注：[#55665](https://github.com/vllm-project/vllm/pull/55665) 会使 Pooling API 遵循客户端在请求体中提供的 `request_id`，而不是静默地将其替换为生成的 ID。

## 3. 新模型与硬件支持

**审查中 / 进行中**

- **EAGLE3 for Sarvam MLA** — [#53052](https://github.com/vllm-project/vllm/pull/53052) 为 `SarvamMLAForCausalLM` 增加 EAGLE3 推测解码支持，在单个 pipeline 阶段上捕获用于 draft 模型的辅助隐藏状态。
- **Model Runner V2 上的 Elastic EP** — [#53934](https://github.com/vllm-project/vllm/pull/53934) 将 Elastic EP 从 MRV2 的不支持功能列表中移除，这样在 MRV2 成为默认后，`--enable-elastic-ep` 不会静默强制退回旧 V1 runner。
- **无需 remote code 的 Phi-4-reasoning-vision** — [#50652](https://github.com/vllm-project/vllm/pull/50652) 将配置和 NaFlex 图像处理器内置到项目，使模型在 transformers ≥ 5.4 下可以干净加载。
- **Transformers v5 迁移** — InternVL2 子问题（[#38425](https://github.com/vllm-project/vllm/issues/38425)）仍处于打开状态；模型卡层面的工作继续在 v5 总问题下推进。

**已报告的支持缺口**

- **SM120 的 NVFP4 KV 缓存仍未被接入** — FlashInfer 已提供 kernel，但 vLLM 尚未调用；一个可工作的原型据称在 RTX 5090 上可实现 245K context（[#49011](https://github.com/vllm-project/vllm/issues/49011)）。
- **GLM-5.3-Flash 在 B200 上无法启动**，因为 `Glm5NextTextLinearAttention` 不是 vLLM 中已注册的架构（[#54062](https://github.com/vllm-project/vllm/issues/54062)）。
- **Qwen3.8-Flash-Next-FP8 无法在 4×A100（SM80）上启动**，因为 checkpoint 需要 FP8 `e4m3` 类 kernel，而它们不适用于 compute capability 8.0（[#54318](https://github.com/vllm-project/vllm/issues/54318)）。
- **Qwen35 的本地 GGUF 路径仍失败**，即使提供了 `--hf-config-path`，仍报 `architecture qwen35 is not supported yet`（[#36456](https://github.com/vllm-project/vllm/issues/36456)）。

## 4. 性能与优化

- **H20 block-FP8 MoE 调优（+21%）** — [#54668](https://github.com/vllm-project/vllm/pull/54668) 针对 GLM-5.3 在 TP=8 和 DeepSeek 系列模型使用的 `E=256, N=256` 形状重新调优低批量 fused-MoE 配置；使用更窄的 N tile 替换原有的 `BLOCK_SIZE_N=128` 条目。
- **混合 GDN 前缀缓存恢复** — [#52244](https://github.com/vllm-project/vllm/pull/52244) 修复一个 V1 bug：MTP 推测解码使重放提示词无法到达已缓存深度，且当提示词长度是哈希单位的整数倍时**完全无法命中**。相关的回归成本为每次缓存命中多计算约 1,648 个 token——在前缀复用工作负载上实测批量吞吐下降 30–40%（[#53670](https://github.com/vllm-project/vllm/issues/53670)）。
- **极端前缀缓存未命中案例** — [#54094](https://github.com/vllm-project/vllm/issues/54094)：DFlash2 + YaRN 使用完全相同的 1.04M-token 提示词得到零前缀缓存复用，而仅运行 target 模型时复用了约 1.039M token。
- **低成本长提示 prefill** — [#55749](https://github.com/vllm-project/vllm/pull/55749) 将 `BlockPool.cache_full_blocks` 的哈希限制在当前 prefill chunk 上，而不是在每个 chunk 中反复切片剩余的所有哈希（在 group block size ≠ hash block size 时相关）。
- **torch.compile 融合覆盖** — [#51934](https://github.com/vllm-project/vllm/pull/51934) 添加了 QK-norm+RoPE 融合的端到端正确性测试，填补了此前只有合成单元测试的缺口。
- **容器启动时间** — [#55422](https://github.com/vllm-project/vllm/pull/55422) 在镜像构建时编译 Python 字节码；当前镜像中 27,753 个 `.py` 文件只带 408 个 `.pyc`，一次 serving 启动又会生成约 8,700 个。[#55608](https://github.com/vllm-project/vllm/pull/55608) 新增可选的 `x86_64-zstd` 发布镜像标签，以加快镜像拉取。
- **调度器 / 容量 RFC** — 长度感知的 batch 组合并给出实测公平性/吞吐量权衡（[#55265](https://github.com/vllm-project/vllm/issues/55265)）；使用 GPU 缓存 + LFRU 淘汰的增量式 MoE expert 卸载（[#38256](https://github.com/vllm-project/vllm/issues/38256)）；面向 agent 工作负载的上下文感知 KV 缓存保留与优先级淘汰（[#37003](https://github.com/vllm-project/vllm/issues/37003)）。
- **将确定性作为性能特性** — batch 无关推理追踪项目（[#27433](https://github.com/vllm-project/vllm/issues/27433)）仍是使 vLLM 输出不依赖 batch 与调度的协调点（89 条评论）。

## 5. 稳定性与回归

以下为过去 24 小时内更新的 issue，按严重程度排序。存在的修复 PR 会相应注明。

**静默损坏 / 错误输出**

- **DeepSeek-V4-Flash 在包含内联 system messages 时产生错误输出** — PR #46025 为 chat-template 处理引入了三条行为路径之后出现（[#46710](https://github.com/vllm-project/vllm/issues/46710)）。尚无修复 PR。
- **Kimi-K3 在 1P1D NIXL Direct-PD 分离式部署中的静默输出损坏** — 通过 MultiConnector 使用 MooncakeStoreConnector + NixlConnector（[#52627](https://github.com/vllm-project/vllm/issues/52627)）。相关 Kimi-K3 断言崩溃（`checkpoint_idx < len(blocks)`）已有修复 PR 在审查中（[#55747](https://github.com/vllm-project/vllm/pull/55747)）。
- **`prompt_logprobs` 被静默损坏** — 在 Qwen3.5 系列模型启用 MTP 推测解码并使用 chunked prefill 时，部分请求会出现此问题（[#53488](https://github.com/vllm-project/vllm/issues/53488)）。尚无修复 PR。
- **Qwen3.5-35B-A3B-FP8 的工具调用丢失** — 非流式模式下 XML 工具调用标记被输出到 `<think>` 区域内部时发生（[#39056](https://github.com/vllm-project/vllm/issues/39056)）。Granite parser 向流式 Parser Engine 的迁移（[#49648](https://github.com/vllm-project/vllm/pull/49648)）是该类 bug 当前最接近的在途修复方案。

**贪心解码不确定性**

- **Qwen3.8-Flash-Next-FP8**：当提示词长度越过 QSA `indexer_budget`，注意力从 dense 切换为 persistent top-k 后，五个字节级相同的 `temperature=0` 请求返回了五个不同补全（[#54521](https://github.com/vllm-project/vllm/issues/54521)）。
- **DeepSeek-V4-Flash-NVFP4**：`temperature=0` 下输出不确定；失败率随并发度上升（[#53257](https://github.com/vllm-project/vllm/issues/53257)）。
- **`thinking_token_budget` 被 Model Runner V2 忽略** — Qwen3.8 NVFP4 + MTP 场景下，推理长度保证被破坏（[#54906](https://github.com/vllm-project/vllm/issues/54906)）；一份 RFC 提出为 RL rollout 场景增加截断模式（[#54864](https://github.com/vllm-project/vllm/issues/54864)）。

**CUDA 崩溃 / 卡死**

- **RTX PRO 5000（SM120）上的 Xid 13 + CUDA IMA** — FP8 在持续负载下触发（[#55571](https://github.com/vllm-project/vllm/issues/55571)），这是最新的报告。规避方法：使用 `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` 或 `--enforce-eager`。尚无修复 PR。
- **SM12x 上的 DeepSeek-V4-Flash**：NaN MQA logits 会使 `top_k_per_row_prefill` 将未初始化的共享内存作为索引输出，导致非法内存访问（[#49896](https://github.com/vllm-project/vllm/issues/49896)）。
- **以退出码 0 静默发生的 CUDA IMA** — 混合 GDN + MTP k=3 + 异步调度场景，RTX 3090 上在多个先前的边界加固修复后仍存在（[#53726](https://github.com/vllm-project/vllm/issues/53726)）。
- **SM121 / DGX Spark 集群**：Mamba-2 Triton 算子在异步模式下抛出 `cudaErrorIllegalInstruction`（[#37431](https://github.com/vllm-project/vllm/issues/37431)）；FlashInfer + MTP 在 GQA=16 时崩溃并出现非法内存访问，而 Triton attention 后端正常（[#37754](https://github.com/vllm-project/vllm/issues/37754)）。
- **Engine-core 活锁（100% CPU，不崩溃）** — MTP + xgrammar 结构化输出场景触发；被报告为自 v0.24.0 起的回归（[#49210](https://github.com/vllm-project/vllm/issues/49210)）。
- **XPU 上的 DFlash2**：使用 `--dtype float16` 时 draft 接受率为 0%，而 bf16 正常（[#55250](https://github.com/vllm-project/vllm/issues/55250)）。

**防御性修复与较小的回归**

- [#54123](https://github.com/vllm-project/vllm/pull/54123) 会在不兼容的 `mamba_ssm_cache_dtype` 导致 EngineCore 崩溃前将其拒绝；[#54287](https://github.com/vllm-project/vllm/pull/54287) 会在 SM89 以下拒绝 FP8 Triton MoE，并给出清晰错误而不是晦涩的编译崩溃。
- [#55772](https://github.com/vllm-project/vllm/pull/55772) 修复 4→2 scale-down 期间的 Elastic EP 路由问题：过期的 coordinator 快照导致 `IndexError`/HTTP 500；[#55761](https://github.com/vllm-project/vllm/pull/55761)（已关闭）在验证框架迁移后恢复类型化 `Responses` 验证错误边界。
- [#48745](https://github.com/vllm-project/vllm/issues/48745)：优雅关闭期间记录到虚假的 `EngineDeadError` traceback——严重性低，尚无修复 PR。
- 流程信号：[#53194](https://github.com/vllm-project/vllm/issues/53194) 汇总了过去五个月中 10+ 个独立报告的 KV 缓存 key 分区缺陷，并提出了一组一致性测试套件。

## 6. 对应用开发者的影响

- **不要假设 `temperature=0` 是可复现的**——在 FP8 混合注意力模型（Qwen3.8-Flash-Next、DeepSeek-V4-Flash）上尤其如此，尤其是在接近稀疏注意力 indexer budget 或处于负载下时（[#54521](https://github.com/vllm-project/vllm/issues/54521)、[#53257](https://github.com/vllm-project/vllm/issues/53257)）。如果你的应用依赖稳定输出，请添加语义检查，或固定使用 batch 无关配置——关注总追踪 issue [#27433](https://github.com/vllm-project/vllm/issues/27433)。
- **混合 GDN 模型上的前缀缓存 + MTP/DFlash2 目前是有损的。** 如果你在提供 Qwen3.5/Qwen3.8 类 GDN checkpoint 的服务中使用推测解码并复用前缀，那么在 [#52244](https://github.com/vllm-project/vllm/pull/52244) 这类修复落地之前，请预期命中率下降和最高 30–40% 的吞吐损失。请据此规划额外的 prefill 容量。
- **推理模型的工具调用需要重试/校验层。** 非流式解析可能静默丢弃 Qwen3.5-35B-A3B 在 `<think>` 区域内输出的工具调用（[#39056](https://github.com/vllm-project/vllm/issues/39056)）。同时请确认 `thinking_token_budget` 在你的 runner 版本上确实生效；MRV2 + MTP 构建可能会忽略它（[#54906](https://github.com/vllm-project/vllm/issues/54906)）。
- **PD 分离式部署：请端到端校验输出。** Kimi-K3 在 Mooncake + NIXL 多连接器场景下的静默损坏报告（[#52627](https://github.com/vllm-project/vllm/issues/52627)），以及 DeepSeek-V4-Flash 的内联 system messages 处理报告（[#46710](https://github.com/vllm-project/vllm/issues/46710)），都表明在信任生产环境中的生成内容之前应先做 A/B 响应校验。
- **Blackwell/SM120 运维人员应使用针对性的 kernel 规避方案。** 对于持续负载下的 FP8 模型，在 IMA 修复前请禁用 FlashInfer FP8 scaled-MM kernel（或使用 `--enforce-eager`）（[#55571](https://github.com/vllm-project/vllm/issues/55571)）。50 系 GPU 上的 NVFP4 KV 缓存仍不可用（vLLM 主线）（[#49011](https://github.com/vllm-project/vllm/issues/49011)）。
- **在 A100/SM80 上先筛查模型支持再上线**：Qwen3.8-Flash-Next-FP8 在 SM80 上无法启动（[#54318](https://github.com/vllm-project/vllm/issues/54318)），GLM-5.3-Flash 目前需要一个尚未支持的 linear-attention 架构（[#54062](https://github.com/vllm-project/vllm/issues/54062)）。
- **Pooling API 客户端**：一旦 [#55665](https://github.com/vllm-project/vllm/pull/55665) 合入，API 将遵循显式传入的 `request_id`；在此之前，请将响应 ID 视为服务端生成。对于自托管容器部署，在途的字节码预编译（[#55422](https://github.com/vllm-project/vllm/pull/55422)）和 zstd 镜像（[#55608](https://github.com/vllm-project/vllm/pull/55608)）PR 会带来可观的冷启动和镜像拉取改进。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 文摘 — 2026-09-08

## 今日亮点

Weight Cache Daemon 路线图迎来了一个重要里程碑：第一阶段（[#27139](https://github.com/sgl-project/sglang/pull/27139)）通过 per-rank CUDA IPC（[#33522](https://github.com/sgl-project/sglang/issues/33522)），将 Qwen3-235B FP8 权重加载时间从约 306–327 秒缩短到 **<1 秒**。prefill CP V1 弃用工作已推进到非 CUDA 后端，并伴随一批 API 重命名（[#38293](https://github.com/sgl-project/sglang/pull/38293)、[#36229](https://github.com/sgl-project/sglang/pull/36229)）。稳定性方面，Blackwell B300（sm_103）仍是问题最集中的领域——除了已知的 SM100 系列门控缺陷（[#34340](https://github.com/sgl-project/sglang/issues/34340)）外，又新报告了一个 TP2 挂起问题（[#38300](https://github.com/sgl-project/sglang/issues/38300)）。

## 版本发布与破坏性变更

过去 24 小时内没有新版本发布。需要关注的破坏性/进行中变更：

- **prefill CP V1 弃用：** 旧版 prefill 上下文并行（context parallelism）正在 HIP/ROCm、Ascend NPU 和 MUSA 上被移除（[#38293](https://github.com/sgl-project/sglang/pull/38293)，已关闭）。CUDA 用户应统一采用 `--enable-prefill-cp` 搭配 `--cp-strategy {zigzag,interleave}`；v1 时代的 CLI 别名和通用 server-argument 条目将在文档清理中移除（[#36230](https://github.com/sgl-project/sglang/pull/36230)）。
- **CP API 重命名：** `is_cp_v2_active` → `is_cp_active`，round-robin 相关内核/字段 → `interleave`，MLA 辅助函数 → `is_mla_cp_enabled` / `is_mla_cp_active`（[#36229](https://github.com/sgl-project/sglang/pull/36229)）。涉及 CP v2 符号的代码需要迁移。
- **main 分支损坏：** 在固定 `transformers` 5.12.1 的提交前后，`import sglang` 目前都会失败（[#38183](https://github.com/sgl-project/sglang/issues/38183)）。

## 新模型与硬件支持

- 为 DGX Spark（GB10，1x/2x，TP=2）和 RTX PRO 6000 新增了 Qwen3.8-Flash-Next NVFP4 部署指南（[#37995](https://github.com/sgl-project/sglang/pull/37995)，已关闭）。
- AMD gfx950 现在使用原生硬件 fp8 e4m3 转换指令（[#37140](https://github.com/sgl-project/sglang/pull/37140)）。
- FlashInfer A2A 通信器新增了 MXFP8 数据类型支持（[#30972](https://github.com/sgl-project/sglang/pull/30972)，已关闭）。
- Weight-cache daemon 增加了加载后生命周期钩子与 MXFP4 IPC（[#38306](https://github.com/sgl-project/sglang/pull/38306)）。
- 一个关于通过 device-memory IPC 实现进程外 HiCache 数据面的 RFC 已开放（[#37372](https://github.com/sgl-project/sglang/issues/37372)）。

## 性能与优化

- **Weight Cache Daemon 第一阶段**（[#33522](https://github.com/sgl-project/sglang/issues/33522)，已在 [#27139](https://github.com/sgl-project/sglang/pull/27139) 中合入）：每个 rank 一个 daemon 持有量化后的权重，并通过 CUDA IPC 提供访问——Qwen3-235B FP8 权重加载时间从 306–327 秒降至 <1 秒。
- **静态 FP8 量化融合提案**（[#31504](https://github.com/sgl-project/sglang/issues/31504)）：将量化融合到 producer 内核的 epilogue（norm/activation/allreduce）中，从而消除每次 FP8 GEMM 前独立的 `_static_quant_fp8` 内核；主要针对 ModelOpt FP8 导出模型，如 Qwen3.5-397B-A17B-NVFP4-V2。
- **DGX Spark/GB10 扩散模型内存驻留规划：** 一组堆叠的 PR 改善了统一内存行为——包括单次迭代探测与 pipeline 步数下限的校准修复（[#37809](https://github.com/sgl-project/sglang/pull/37809)）、单池驻留规划（[#37811](https://github.com/sgl-project/sglang/pull/37811)）、采用只读 safetensors 映射以避免私有可写映射的开销（[#37822](https://github.com/sgl-project/sglang/pull/37822)）、基于文件的融合权重存储（[#37819](https://github.com/sgl-project/sglang/pull/37819)），以及带 O_DIRECT 读取器的共享池流式权重加载（[#37680](https://github.com/sgl-project/sglang/pull/37680)）。
- MoRI 解码模式的 token 分发预算现在会对照 CUDA graph batch size 进行校验（[#37964](https://github.com/sgl-project/sglang/pull/37964)）。
- KV 事件在 `BlockStored` 上新增了 `component_types`，使混合模型的 KV 组件（full attention、sliding window、Mamba state）能够跨缓存层级独立跟踪其放置位置（[#32514](https://github.com/sgl-project/sglang/pull/32514)）。

## 稳定性与回归

按严重程度排序；已有修复 PR 的已注明。

- **Blackwell/sm_103 系列门控缺陷**（[#34340](https://github.com/sgl-project/sglang/issues/34340)）：`is_sm100_supported()` 只检查 major==10，导致 sm_103 会执行 SM100 路径——cutedsl TGV BF16 GEMM 会抛出 Xid 13，trtllm-gen 的 MoE finalize 会挂起。
- **B300 上新出现的 TP2 挂起**（[#38300](https://github.com/sgl-project/sglang/issues/38300)）：HiCache + 可中断 prefill CUDA graph + FlashInfer MNNVL。FlashInfer 在 Blackwell 上更广泛的支持也受到质疑（[#35080](https://github.com/sgl-project/sglang/issues/35080)）。
- **GLM-5.2 FP4 + EAGLE 非法内存访问**（[#30209](https://github.com/sgl-project/sglang/issues/30209)）：在 B200/B300 上，nextn 草稿 MoE 中的 flashinfer_trtllm bf16 批量 GEMM 崩溃。
- **HiCache 主机层回载破坏生成结果**（[#38031](https://github.com/sgl-project/sglang/issues/38031)）：8×H100 上的 GLM-5.3-Flash（DSA）会丢失工具调用并进入重复循环，即使未启用投机解码也会发生。
- **断开的流式客户端产生僵尸请求**（[#36333](https://github.com/sgl-project/sglang/issues/36333)）：被放弃的流会一直解码到 max_tokens，并不断刷出 “state was deleted in TokenizerManager”；这是回退 #34160 导致的回归，目前尚无修复 PR。
- **DSPARK draft KV 池预算缺陷**（[#38202](https://github.com/sgl-project/sglang/issues/38202)）：使用了 `tp_size` 而不是 `attn_tp_size`，导致 Kimi-K3 在 DP attention 下 OOM。
- **EPLB + DSPARK CUDA graph 捕获崩溃**（[#34974](https://github.com/sgl-project/sglang/issues/34974)）：当 `layer_idx=None` 时 `scatter_add_` 维度不匹配。
- **解码模式 KV retract 崩溃**（[#33385](https://github.com/sgl-project/sglang/issues/33385)）：`DeepSeekV4TokenToKVPool` 缺少 `get_cpu_copy()` → `NotImplementedError`。
- **ROCm 上 EAGLE 静默采用贪婪解码**（[#37134](https://github.com/sgl-project/sglang/pull/37134)，修复中）：verify 路径会提交 argmax，忽略 temperature/top_p，从而产生重复循环。
- **针对 Qwen3.5 的 EAGLE3 辅助层捕获修复**（[#38307](https://github.com/sgl-project/sglang/pull/38307)，新增）。
- **A100/SM80 回归：** 服务 Qwen3.8-Flash-Next-FP8 时失败，提示 `fp8e4nv` 不受支持（[#38291](https://github.com/sgl-project/sglang/issues/38291)）。
- **PP 分离式 prefill 死锁：** 当 bootstrap 队列发散导致中止风暴时发生（[#34572](https://github.com/sgl-project/sglang/issues/34572)）；相关具备 drain 感知的 `ABORT_ACK` 协议正在推进中（[#37077](https://github.com/sgl-project/sglang/pull/37077)）。
- API/正确性：服务端默认的 `reasoning_effort` 会静默覆盖每个请求单独传入的值（[#38104](https://github.com/sgl-project/sglang/issues/38104)）；`/v1/responses` 的 `created_at` 在流式输出中是 float，在非流式输出中则是 int（[#34716](https://github.com/sgl-project/sglang/issues/34716)）。
- CI 状态：根据跟踪 issue（[#17050](https://github.com/sgl-project/sglang/issues/17050)），目前 1 个损坏、9 个不稳定、962 个近期已修复；CUDA core dump 收集仍在继续（[#26340](https://github.com/sgl-project/sglang/issues/26340)）。

## 对应用开发者的影响

- **Weight-cache daemon 改变了重启成本结构。** 100B+ FP8 模型的亚秒级权重加载能显著改善故障转移与滚动部署体验——但在依赖它之前，请等待 lifecycle/MXFP4 加固 PR（[#38306](https://github.com/sgl-project/sglang/pull/38306)）合入。
- **为 CP 配置变动做好规划。** prefill-CP API 重命名与旧版非 CUDA 实现的移除会破坏现有启动脚本和代码；请在 CUDA 上迁移到 `--enable-prefill-cp` + zigzag/interleave（[#36229](https://github.com/sgl-project/sglang/pull/36229)、[#36230](https://github.com/sgl-project/sglang/pull/36230)）。
- **Blackwell + FlashInfer/HiCache 目前风险较高。** B300 上多个未修复的内核级缺陷（挂起/Xid 13）意味着生产用户应固定到已知正常的版本或默认后端，直到 sm_103 门控修复合入（[#34340](https://github.com/sgl-project/sglang/issues/34340)、[#38300](https://github.com/sgl-project/sglang/issues/38300)）。
- **断连的代价很高。** 僵尸请求回归（[#36333](https://github.com/sgl-project/sglang/issues/36333)）意味着不稳定的客户端可能会一直占用解码槽位直到 max_tokens；应用应发送显式取消请求，并监控 tokenizer-deleted-state 相关错误。
- **关注 main 分支构建健康。** `transformers` 固定提交引起的问题（[#38183](https://github.com/sgl-project/sglang/issues/38183)）目前会阻断从 main 执行 `import sglang`；此外，在跨推理层级路由 agent 工作负载时，还要注意 `--default-chat-template-kwargs reasoning_effort` 会静默覆盖请求级参数（[#38104](https://github.com/sgl-project/sglang/issues/38104)）。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-08

## 今日亮点

- 十个新的前沿构建已落地（`b10831`–`b10850`），整体主题是 Vulkan 功能对齐：DeepSeek-V4 超连接融合算子、TQ1_0 张量支持、RMS_NORM 融合，以及更安全的 GET_ROWS 处理。
- CUDA 端也获得了无分支的 Q4_K/Q5_K 解包，用于更快的 mixed-mm 向量量化，并修复了 FP16 flash attention 中的发散 barrier。
- Issue 追踪器上主要都是 Qwen 系列模型的正确性问题（工具调用解析、静默 EOS、不确定的 QSA top-k），外加一个确定性的 CUDA flash-attention 崩溃，以及一个可能导致静默内存损坏的 ggml 分配器过期计划 bug。

---

## 发布与破坏性变更

此快照中没有宣布任何面向用户的 API 或配置破坏性变更。

最新合并的发布链：`b10831` → `b10850`。值得注意的、与发布相关的更改：

- [`b10850`](https://github.com/ggml-org/llama.cpp/pull/28553)：仅影响测试的修复；初始化 L2_NORM 批次数组，以避免可能未初始化的警告。
- [`b10844`](https://github.com/ggml-org/llama.cpp/pull/26578)：Vulkan DeepSeek-V4 超连接融合算子（`DSV4_HC_COMB/PRE/POST`）。
- [`b10842`](https://github.com/ggml-org/llama.cpp/pull/26454)：AMD `gfx90c` 的 HIP 支持。
- [`b10840`](https://github.com/ggml-org/llama.cpp/pull/26705)：用于 mmvq 的 CUDA 无分支 Q4_K/Q5_K 解包，以及 DGX Spark 上的 L2 预取。
- [`b10839`](https://github.com/ggml-org/llama.cpp/pull/28253)：Vulkan GET_ROWS 现在支持类型对齐偏移，并在未对齐时回退到 CPU。
- [`b10835`](https://github.com/ggml-org/llama.cpp/pull/27870)：修复 CUDA FP16 flash-attention 路径中的发散 barrier。
- [`b10834`](https://github.com/ggml-org/llama.cpp/pull/28387)：允许后端输入跳过创建另一个张量拆分。

没有提供迁移说明。

---

## 新模型与硬件支持

- **DeepSeek-V4 on Vulkan** — [`PR #26578`](https://github.com/ggml-org/llama.cpp/pull/26578) 为 Vulkan 后端添加了 DeepSeek-V4 超连接融合算子。CUDA 在 DeepSeek-V4 合并后已经有了这些算子，Metal 通过 `#26459` 也获得了支持；Vulkan 不再缺少这条模型路径。
- **AMD gfx90c HIP support** — [`PR #26454`](https://github.com/ggml-org/llama.cpp/pull/26454) 为 AMD `gfx90c` 集成 GPU 添加了 HIP 支持。
- **Vulkan TQ1_0 support** — [`PR #27765`](https://github.com/ggml-org/llama.cpp/pull/27765) 在 Vulkan 中添加了对 TQ1_0 矩阵乘、mat-vec、mat-vec-id、反量化和 `get_rows` 的支持。
- **进行中：** [`PR #28585`](https://github.com/ggml-org/llama.cpp/pull/28585) 中的 Hexagon RELU/LEAKY_RELU 算子，以及 [`Issue #28541`](https://github.com/ggml-org/llama.cpp/issues/28541) 中关于原生 LTX-2 图像/视频/音频扩散 GGUF 服务的 RFC。

---

## 性能与优化

### 本构建链中已合入

- **CUDA 无分支 Q4_K/Q5_K 解包** — [`PR #26705`](https://github.com/ggml-org/llama.cpp/pull/26705) 避免了在 mmvq 中为每一列重复执行 scale 解包，从而在 batch size > 1 时提升性能。另在 DGX Spark 上增加了 L2 预取。
- **Vulkan RMS_NORM 融合** — [`PR #28024`](https://github.com/ggml-org/llama.cpp/pull/28024) 支持融合 `RMS_NORM + MUL + ADD (+MUL)` 和 `RMS_NORM + VIEW + SET_ROWS`；还将 `ROPE + VIEW + SET_ROWS` 扩展到 IMROPE。作者在 Gemma 4 上测得约 4% 的提升。
- **Vulkan TQ1_0 内核** — [`PR #27765`](https://github.com/ggml-org/llama.cpp/pull/27765) 为 TQ1_0 添加原生路径，而不是使用通用回退。

### 进行中 / 尚未合入的 PR

- **专用 Vulkan `iq4_xs` mat-vec shader** — [`PR #28426`](https://github.com/ggml-org/llama.cpp/pull/28426) 报告受影响模型在 RDNA4 上 token 生成速度提升 ~+6–17%。
- **SYCL 批量 L2_NORM 内核** — [`PR #28222`](https://github.com/ggml-org/llama.cpp/pull/28222) 将连续且形状相同的 F32 L2_NORM 操作批量处理；作者在 Arc B70 上测得 dispatch 次数从 12,480 降至 6,240。
- **head 维为 256 的 CUDA/AMD RDNA MMA flash attention** — [`PR #26419`](https://github.com/ggml-org/llama.cpp/pull/26419) 旨在移除 rocWMMA 后恢复 RDNA 4 上 WMMA/MMA 的 prompt 处理性能。
- **MoE 专家前视 H2D 预取** — [`PR #28414`](https://github.com/ggml-org/llama.cpp/pull/28414) 添加了一个可选的 `--prefetch-experts-slots N` 标志，以便在需要之前预取驻留在主机上的 MoE 专家。

---

## 稳定性与回归

### 本发布链中已合入的修复

- [`PR #27870`](https://github.com/ggml-org/llama.cpp/pull/27870)：修复 CUDA FP16 flash attention 中的发散 barrier。
- [`PR #28253`](https://github.com/ggml-org/llama.cpp/pull/28253)：在未对齐偏移时回退到 CPU，避免 Vulkan GET_ROWS 触发断言。
- [`PR #28553`](https://github.com/ggml-org/llama.cpp/pull/28553)：修复测试中可能未初始化的 L2_NORM 批次数组。

### 过去 24 小时内更新过的未关闭 Issue，按严重程度排序

1. **MoE + 专家卸载时 CUDA flash-attention 非法内存访问** — [`Issue #26609`](https://github.com/ggml-org/llama.cpp/issues/26609)。使用 Qwen3.6-35B MoE 和部分卸载时，第二个请求会在 `cudaStreamSynchronize` 中确定性崩溃。报告中的临时规避方法：关闭 flash attention（`-fa off`）。尚无关联修复。

2. **`ggml_gallocr` 过期分配计划可能导致静默内存损坏** — [`Issue #28448`](https://github.com/ggml-org/llama.cpp/issues/28448)。如果图节点在同一位置改变身份但大小不变，分配器可能错误地复用旧计划。这对动态拓扑的稀疏 MoE 图很危险。

3. **qwen4exp QSA 索引器在 CUDA 上的不确定性** — [`Issue #28497`](https://github.com/ggml-org/llama.cpp/issues/28497)。通过 CUB DeviceTopK 对并列的 block scores 执行 top-k 时，每次运行会选择不同的 cell 集合，导致输出不稳定。

4. **Qwen 模型上并行 `tool_calls` 损坏或挂起** — [`Issue #28522`](https://github.com/ggml-org/llama.cpp/issues/28522)。新报告：在使用一个约 48 个可选参数的工具时，并行函数调用会失败或卡住，影响多个 Qwen 模型。

5. **Qwen3.5-hybrid 在上下文超过约 130K 后静默地立即输出 EOS** — [`Issue #27756`](https://github.com/ggml-org/llama.cpp/issues/27756)。在 CUDA 和 CPU 上均可复现；报告将其与 DeltaNet 循环状态深度退化联系起来。

6. **Qwen3.5 9B 在工具调用出现在 thinking 块内时停止生成** — [`Issue #20837`](https://github.com/ggml-org/llama.cpp/issues/20837)。长期存在的 agent 式聊天解析器 bug；已有 60 条评论和 17 个 👍；仍然打开。

7. **Vulkan 下 qwen4exp 的 `--lazy-mode auto` 使 pp512 减半** — [`Issue #28160`](https://github.com/ggml-org/llama.cpp/issues/28160)。回归追溯到“llama: improve TENSOR_READ_LAZY handling”（`#27837`）。

8. **K2-Horizon 模型加载失败** — [`Issue #28361`](https://github.com/ggml-org/llama.cpp/issues/28361)。在使用 i9-14900HX + RTX 4060 的 CUDA 上加载失败；很可能是架构/GGUF 兼容性问题。

9. **HIP gfx1151 在 prompt 长于 `n_ubatch` 时 logits 错误** — [`Issue #28211`](https://github.com/ggml-org/llama.cpp/issues/28211)。不会崩溃，但在 Strix Halo Radeon 8060S 上输出不正确。

10. **Metal：发生致命 OOM 后服务器报告“model loaded”，之后每个请求都返回 500** — [`Issue #27309`](https://github.com/ggml-org/llama.cpp/issues/27309)。这是 `llama-server` 的生命周期问题；它应该快速失败，而不是绑定一个已损坏的服务器。

注：在此快照中，这些未关闭 Issue 中的大多数都没有可见的修复 PR。

---

## 这对应用开发者意味着什么

- **基于 Qwen 的 Agent 应用仍有风险。** [`#20837`](https://github.com/ggml-org/llama.cpp/issues/20837)、[`#28522`](https://github.com/ggml-org/llama.cpp/issues/28522) 和 [`#27756`](https://github.com/ggml-org/llama.cpp/issues/27756) 这组问题意味着，Qwen 衍生模型在工具调用和长上下文可靠性上仍需要纵深防御：在预期 XML 工具调用输出时关闭 thinking 模式，并增加输出校验/重试逻辑，而不是依赖原始解析的成功。

- **如果你在 CUDA 上以部分专家卸载的方式服务 MoE 模型，请确认使用 `-fa off`，或固定构建版本，直到 flash-attention 崩溃被修复。** [`Issue #26609`](https://github.com/ggml-org/llama.cpp/issues/26609) 是确定性崩溃，可能在第二个请求时让服务器挂掉。

- **Vulkan 部署正在快速改进。** DeepSeek-V4 支持、TQ1_0、RMS_NORM 融合，以及尚未合入的 `iq4_xs` shader，让 Vulkan 在 AMD iGPU 和独立 RDNA4 服务场景中成为更可行的后端。

- **如果你运行稀疏 MoE 或动态图工作负载，[`#28448`](https://github.com/ggml-org/llama.cpp/issues/28448) 中的 `ggml_gallocr` 过期计划 bug 提醒你要谨慎隔离/升级。** 静默内存损坏是最糟糕的故障模式；在依赖长时间运行的多图服务之前，请留意修复 PR。

- **性能改进仍主要发生在内核层面。** CUDA mmvq 相关工作与 Vulkan 融合/FMA 相关工作都是自动启用的——升级到 `b10840+` 后无需任何配置变更，即可获得小幅的 token 生成性能提升。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 项目日报 — 2026-09-08

## 1. 今日要点

llama.cpp 上游依赖从 b10760 升级到 b10829（[PR #18279](https://github.com/ollama/ollama/pull/18279)），将为 Spark-X2.5 模型系列新增原生 `spark2_5` 架构支持，从而关闭 [#18195](https://github.com/ollama/ollama/issues/18195)。OpenAI 兼容性方面的工作也在推进：`/v1/responses` 将接受 Codex 风格的 `agent_message` 输入（[PR #18298](https://github.com/ollama/ollama/pull/18298)，修复 [#18286](https://github.com/ollama/ollama/issues/18286)）；工具搜索调用 ID 将改用 `tsc_` 前缀，以确保与 OpenAI 的兼容性（[PR #18296](https://github.com/ollama/ollama/pull/18296)）。过去 24 小时内没有发布新版 Ollama；当前跟踪器中最紧急的是 v0.33.2 中约 5× 的 CUDA token 生成性能回归（[#18225](https://github.com/ollama/ollama/issues/18225)）。

## 2. 发布与破坏性变更

过去 24 小时内无发布、无破坏性变更。当前活跃回归涉及的版本参考：失控生成（[#17910](https://github.com/ollama/ollama/issues/17910)）以 v0.32.9 为最后已知正常版本；CUDA 吞吐量（[#18225](https://github.com/ollama/ollama/issues/18225)）在 v0.32.13 上表现正常。

## 3. 新增模型与硬件支持

- **Spark-X2.5（4B/1.7B）**：已有重复 issue 请求原生 `spark2_5` 支持（[#18195](https://github.com/ollama/ollama/issues/18195)、[#18290](https://github.com/ollama/ollama/issues/18290)）。[PR #18279](https://github.com/ollama/ollama/pull/18279) 升级 llama.cpp，是计划中的修复。
- **腾讯 Hy4**：有请求希望添加预览/量化模型系列支持（[#18287](https://github.com/ollama/ollama/issues/18287)）；目前还没有 PR。
- **MLX runner**：对 Qwen 静态 YaRN 上下文/RoPE 缩放的支持正在推进中（[PR #18263](https://github.com/ollama/ollama/pull/18263)），可在 Apple Silicon 上启用更长的请求上下文；之前强制上下文长度的 PR（[#18261](https://github.com/ollama/ollama/pull/18261)）已被 [PR #18285](https://github.com/ollama/ollama/pull/18285) 中基于 soft-sizing 感知的方案取代。
- **AMD/ROCm**：在 RX 9060 XT（gfx1200）上运行 qwen3.8:27b 时 `TensileLibrary_lazy_gfx1200.dat` 加载失败的问题仍然开放（[#17782](https://github.com/ollama/ollama/issues/17782)）。

## 4. 性能与优化

- **CUDA 性能回归（开放中）**：在 RTX 3090（24 GB ×9、无 NVLink、CUDA 13.2）上，v0.33.2 比 v0.32.13 慢约 5 倍，模型文件和 GPU 均相同；目前还没有修复 PR（[#18225](https://github.com/ollama/ollama/issues/18225)）。
- **失控生成**：v0.32.11–0.32.15 会无视自然结束点持续生成，直到进程被终止；v0.32.9 不受影响（Mac Studio M1 Max）（[#17910](https://github.com/ollama/ollama/issues/17910)，已以“需要更多信息”为由关闭）。
- **OpenAI 兼容层的 `num_ctx`**：[PR #16825](https://github.com/ollama/ollama/pull/16825) 会从 `/v1/chat/completions` 和 `/v1/completions` 转发 `num_ctx`，修复 [#16814](https://github.com/ollama/ollama/issues/16814)。
- **可观测性**：通过 `OLLAMA_METRICS=1` 启用的可选 Prometheus `/metrics` 端点（含调度器/队列/token 指标）仍在开放中（[PR #16998](https://github.com/ollama/ollama/pull/16998)）。
- **Modelfile `temperature`**：在 `/api/chat` 上仍然生效，但在 `/v1/chat/completions` 上会被服务器默认值覆盖（[#17744](https://github.com/ollama/ollama/issues/17744)）。
- **GPU 显存利用率**：有报告称模型仅使用了不到 40% 的显存并溢出到系统内存；该报告已以“需要更多信息”为由关闭（[#17971](https://github.com/ollama/ollama/issues/17971)）。

## 5. 稳定性与回归问题

按严重程度排序：

1. **0.33.x 的 CUDA 吞吐量回归** —— 生成速度慢约 5 倍，GPU 几乎处于空闲状态；RTX 3090，开放中（[#18225](https://github.com/ollama/ollama/issues/18225)）。
2. **模型库中的低比特量化产物损坏** —— qwen2.5-coder:3b-instruct 的 q2_K/q3_K_S/M/L 在代码任务上得分为 0/15，而同模型的其它量化档位均通过；开放中（[#18252](https://github.com/ollama/ollama/issues/18252)）。
3. **长时间运行的 runner 出现输出损坏** —— 使用 `keep_alive -1` 的 runner 在与第二个模型共存后会输出重复的占位 token，并持续到重启为止（[#18208](https://github.com/ollama/ollama/issues/18208)）。
4. **调度器重载抖动** —— llama-server 在一次成功加载后立即以默认 4096 上下文重新启动，造成冗余的重复加载（[#18129](https://github.com/ollama/ollama/issues/18129)）；另一份关于驱逐循环的报告建议快速失败而非反复振荡（[#18282](https://github.com/ollama/ollama/issues/18282)）。
5. **thinking 标签泄漏 / thinking 内容被丢弃** —— 未匹配的 `</think>` 结束标签会泄漏到客户端（[PR #18288](https://github.com/ollama/ollama/pull/18288)）；多轮调用中，assistant 的 `thinking` 内容不会传给聊天模板（[PR #18281](https://github.com/ollama/ollama/pull/18281)）。相关：[PR #17566](https://github.com/ollama/ollama/pull/17566) 为 thinking 循环设置了 token 预算上限。
6. **MTP（多 token 预测）在 Qwen3.8 27b + RTX 5090 上触发 CPU 卸载**（[#18186](https://github.com/ollama/ollama/issues/18186)，已关闭）。
7. **云端 JSON schema 被忽略** —— 云模型返回的 JSON 不符合回复 schema（[#12362](https://github.com/ollama/ollama/issues/12362)）；另外，glm-5.3-flash:cloud 的 `reasoning_effort` 映射有误（[#18121](https://github.com/ollama/ollama/issues/18121)）。
8. **安全** —— `OLLAMA_DEBUG_LOG_REQUESTS` 会把完整提示词内容持久化到日志，且缺少保留策略与脱敏控制（[#18210](https://github.com/ollama/ollama/issues/18210)，已关闭）；agent `read` 工具的绝对路径限制修复见 [PR #18027](https://github.com/ollama/ollama/pull/18027)。
9. **CUDA 架构支持缺口** —— CUDA 13 构建在 sm_86（RTX 30/A40/A6000）上会静默回退到 CPU（[#17841](https://github.com/ollama/ollama/issues/17841)，已关闭）；Vulkan gfx1151 在长 prefill（预填充）阶段出现 compute-ring 超时（[#17870](https://github.com/ollama/ollama/issues/17870)，已关闭 —— 设置 `num_batch=128` 可绕过）。另外，在 Ubuntu 26.04 上缺少 `zstd` CLI 时，安装程序会静默失败（[#17860](https://github.com/ollama/ollama/issues/17860)，已关闭）。
10. **模型名称长度限制** —— 80 字符的校验会阻止较长的 `hf.co` 仓库名；[PR #18278](https://github.com/ollama/ollama/pull/18278) 将上限提高到 96（[#18274](https://github.com/ollama/ollama/issues/18274)）。

## 6. 对应用开发者的意义

- **OpenAI 兼容性正在逐步对齐，但需按端点逐一验证**：`num_ctx` 转发（[PR #16825](https://github.com/ollama/ollama/pull/16825)）和 Modelfile temperature 的处理方式仍需审查；`/v1/chat/completions` 与 `/api/chat` 的行为仍不一致。
- **Codex/多 Agent 用户**：`agent_message` 输入（[PR #18298](https://github.com/ollama/ollama/pull/18298)）和 `tsc_` 工具搜索 ID（[PR #18296](https://github.com/ollama/ollama/pull/18296)）是直接针对 `/v1/responses` 差距的修复 —— 合并后互操作性会明显改善。
- **在 CUDA 环境请审慎固定版本**：如果正在使用 0.33.x 且遇到吞吐量骤降，请与 0.32.13 对比；上游仍在排查中（[#18225](https://github.com/ollama/ollama/issues/18225)）。v0.32.9 仍是生成终止行为的参考版本（[#17910](https://github.com/ollama/ollama/issues/17910)）。
- **Thinking/推理模型**：目前不要假定 thinking 块能在多轮往返中保留 —— 修复正在落地（[PR #18281](https://github.com/ollama/ollama/pull/18281)）；Agent 循环场景下，在 [PR #17566](https://github.com/ollama/ollama/pull/17566) 合入之前，建议自行限制推理预算。
- **模型库卫生**：在 [PR #18278](https://github.com/ollama/ollama/pull/18278) 合入之前，较长的 `hf.co` 模型名会校验失败；qwen2.5-coder 的部分低比特量化产物目前也无法用于代码任务（[#18252](https://github.com/ollama/ollama/issues/18252)）。
- **生产环境中的提示词日志**：在保留/脱敏控制机制出现之前，避免在 Agent/生产工作负载中使用 `OLLAMA_DEBUG_LOG_REQUESTS`（[#18210](https://github.com/ollama/ollama/issues/18210)）。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-08

## 今日要点

过去 24 小时内没有新版本落地。当前的主要关注点是转换/透传的正确性：Bedrock 非流式 Converse 透传返回空的 200 响应体（[#40131](https://github.com/BerriAI/litellm/issues/40131)），`/v1/files` 的错误响应体无法分类（[#40135](https://github.com/BerriAI/litellm/issues/40135)），`gpt-6-astra` 的模型注册表条目被误配置为 chat 模式（[#40123](https://github.com/BerriAI/litellm/issues/40123)）。与此同时，MCP 的密钥存储正在加密改造中（[#40164](https://github.com/BerriAI/litellm/pull/40164)），auto-router 也将新增 “Shunt” 预设，并提高分类成本的可见性（[#40158](https://github.com/BerriAI/litellm/pull/40158)、[#40168](https://github.com/BerriAI/litellm/pull/40168)）。

## 版本发布与破坏性变更

本摘要窗口内没有新的版本发布或迁移说明。

## 新模型与硬件支持

本次窗口内没有合并任何与硬件、量化或后端支持相关的改动。以下是与模型注册表相关的信号：

- `openrouter/openai/gpt-5.6-sol` 未收录在 `model_prices_and_context_window.json` 中，因此无法通过 LiteLLM 添加（[#40102](https://github.com/BerriAI/litellm/issues/40102)）。
- `gpt-6-astra` 以 `mode: "chat"` 注册；OpenAI 会拒绝其通过 `/v1/chat/completions` 发出的工具调用，而 Responses 桥接永远不会触发（[#40123](https://github.com/BerriAI/litellm/issues/40123)）。
- 有 PR 在 Admin UI 的“添加模型”表单中新增了 ChatGPT 订阅提供商（[#40170](https://github.com/BerriAI/litellm/pull/40170)）。
- Z.AI（智谱 AI）出现在提供商下拉选项中，但其凭据/模型表单字段在 v1.99.1 上无法渲染（[#39310](https://github.com/BerriAI/litellm/issues/39310)）。

## 性能与优化

本批次中没有报告具体的延迟/吞吐量数据。正在推进的效率优化工作：

- Auto-router “Shunt” 预设：将大文件读取限制到较便宜的模型上，并将样板代码生成从昂贵模型中分流出去（[#40158](https://github.com/BerriAI/litellm/pull/40158)）。
- Complexity 路由器：在现有 `technicalTerms` 列表之外，新增声明式 `custom_dimensions`，支持内联权重、关键词和正则模式（[#40156](https://github.com/BerriAI/litellm/pull/40156)）。
- Auto-router UI 的花费报告现在会将分类成本与实际 LLM 花费分开统计（[#40168](https://github.com/BerriAI/litellm/pull/40168)）。
- Helm/Terraform：PR 将 SSE keepalive 心跳、调用前检查以及 metrics sidecar 作为类型化部署输入开放出来（[#40163](https://github.com/BerriAI/litellm/pull/40163)）。

## 稳定性与回归问题

以下是最严重、对正确性影响最大的问题，大致按优先级排序：

- **Bedrock Converse 透传在非流式 `/converse` 上返回 HTTP 200，但响应体为空**，而 `/converse-stream` 工作正常。目前还没有看到任何修复 PR（[#40131](https://github.com/BerriAI/litellm/issues/40131)）。
- **`gpt-6-astra` 的工具调用故障**：注册表将其设置为 `mode: "chat"`，因此 chat 工具调用被拒绝，`/v1/responses` 桥接永远不会触发（[#40123](https://github.com/BerriAI/litellm/issues/40123)）。
- **自定义认证下，未知最终用户并发的首次请求会绕过 `max_end_user_budget_id`**，导致预算超支（[#40095](https://github.com/BerriAI/litellm/issues/40095)）。
- **v3 限流器会对团队的按模型限制进行双重计数**：配置的团队-模型限制为 N 时，大约到 N/2 就会开始返回 429（[#34140](https://github.com/BerriAI/litellm/issues/34140)）。
- **vLLM/Kimi K2.7 上 Claude Code / 多轮工具调用的回归问题**自 v1.91.0 起仍未解决；`sanitize_tool_use_ids_in_anthropic_messages` 会破坏透传模式下的多轮工具调用（[#32214](https://github.com/BerriAI/litellm/issues/32214)）。
- **流式 `/v1/responses` 的归属核算被跳过**：`HiddenParamsAsyncIteratorWrapper` 隐藏了 `completed_response`，重新引入了 #30210 那一类回归（[#40120](https://github.com/BerriAI/litellm/issues/40120)）。
- **OpenAI 提示词缓存在 `/v1/messages` → Responses 桥接上仍会被丢弃**（`encrypted_content` 丢失），即使在 #37953 之后也仍然如此（[#39339](https://github.com/BerriAI/litellm/issues/39339)）。此外，从 `user_id` 派生 `prompt_cache_key` 的逻辑也不正确（[#39145](https://github.com/BerriAI/litellm/issues/39145)）。
- **`cache_control_injection_points` 对于缓存完全不生效**，并且会导致确切的 Claude 工具调用循环，直到达到 MaxTurns（[#29810](https://github.com/BerriAI/litellm/issues/29810)）。
- **流式 `/v1/responses` 的 success logger 会崩溃**，导致流式响应不写入 SpendLogs，因而不会被计费（[#29913](https://github.com/BerriAI/litellm/issues/29913)）。
- **Headroom CCR 的流式转换在强制 `stream=false` 后仍会保留 `stream_options`**，导致 DeepSeek 返回 HTTP 400（[#40068](https://github.com/BerriAI/litellm/issues/40068)）。
- **所有 `/v1/files` 错误响应都会将 `type` 和 `param` 序列化为字面量 `"None"`**，导致 SDK/客户端无法对 API 错误进行分类（[#40135](https://github.com/BerriAI/litellm/issues/40135)）。
- **Bedrock invoke 路径仍会将 LiteLLM 内部的可选参数泄漏到上游请求体中**（[#30371](https://github.com/BerriAI/litellm/issues/30371)）。
- **带 mask 的 `/v1/images/edits` 仍然会失败**，报错 “Attempted to access streaming request content…”（[#26552](https://github.com/BerriAI/litellm/issues/26552)）。另外，在图像编辑请求中，按模型配置的 `drop_params` 会被当作 multipart 字段转发出去（[#40153](https://github.com/BerriAI/litellm/issues/40153)）。

正在推进中的相关修复：

- **使用 Entra ID/托管标识的 Azure 图像生成**：PR 在 `/v1/images/generations` 上解析并发送 Entra ID 令牌（[#40147](https://github.com/BerriAI/litellm/pull/40147)）。
- **Bedrock 请求 ID 可见性**：PR 在 Bedrock chat 错误响应中保留 `x-amzn-RequestId`（[#40089](https://github.com/BerriAI/litellm/pull/40089)）。
- **MCP 凭据处理**：PR 会对存储的静态请求头和 stdio 环境映射进行加密（[#40164](https://github.com/BerriAI/litellm/pull/40164)）。

## 对应用开发者的启示

- 如果你针对非 Anthropic 后端运行 Claude Code 或 Anthropic 协议客户端，请将多轮工具调用和提示词缓存桥接视为目前尚不稳定的能力。在 `#32214`、`#39339` 和 `#39145` 解决之前，请谨慎锁定 LiteLLM 版本。
- 对于 Bedrock 透传用户，建议优先使用流式的 `/converse-stream`，或者按部署逐一验证非流式行为是否正常；200 空响应体 bug 影响的是普通 `/converse` 路径（[#40131](https://github.com/BerriAI/litellm/issues/40131)）。
- 对于并发的首次访问最终用户，预算执行并非完全可靠（`#40095`），而 v3 的团队模型限流在效果上等同于限额减半（`#34140`）。在容量规划时，暂时不要依赖精确的 429 阈值。
- 由于 `#29913`，流式 `/v1/responses` 流量可能完全没有写入 SpendLogs；如果你重度使用流式 Responses，请另外审计花费记录。
- 注意较新 OpenAI 模型存在的模型注册表问题：`gpt-5.6-sol` 无法添加；`gpt-6-astra` 需要先把 `mode` 修复为 `"responses"`，工具调用才能正常工作。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 动态 — 2026-09-08

## 1. 今日要点

今日主线是 Unsloth Studio/CLI 的可靠性加固：一组配套 PR 让 `unsloth start`/`unsloth train` 尊重传入的参数与配置，而不是静默使用默认值，并让 `unsloth start` 不再中断长时间运行的模型下载（[#10451](https://github.com/unslothai/unsloth/pull/10451)、[#10452](https://github.com/unslothai/unsloth/pull/10452)、[#10453](https://github.com/unslothai/unsloth/pull/10453)）。在 Agent 侧，MCP 工具返回的图像如今能真正进入模型，而不是获得幻觉式的描述（[#10088](https://github.com/unslothai/unsloth/pull/10088)）。维护者提交的 issue 指出一个真实的安装器缺陷：torch 2.3/2.4 会匹配到错误的 torchcodec 依赖行（[#10433](https://github.com/unslothai/unsloth/issues/10433)），以及 cu128 上 torchcodec 索引可用性存在空缺（[#10434](https://github.com/unslothai/unsloth/issues/10434)）。

## 2. 发布与破坏性变更

过去 24 小时内没有新发布或新标签，也没有迁移说明。

## 3. 新模型与硬件支持

- **请求支持 Qwen 3 AVL 2B/0.6B** —— 该模型结合了 VL 与 ASR 能力；目前尚无支持（[#10459](https://github.com/unslothai/unsloth/issues/10459)）。
- **qwen3.6 35B A3B MLX API 返回错误响应** —— 通过 base64 和 URL 图像方法均可复现；仍处于开放未解决状态（[#10389](https://github.com/unslothai/unsloth/issues/10389)）。
- **NVIDIA+AMD 混合主机**：Studio 安装程序始终选择 CUDA PyTorch 技术栈，导致 AMD 显卡在训练时不可见。应用内目前没有绕过办法；请求增加 ROCm 探测的 issue 仍开放（[#10450](https://github.com/unslothai/unsloth/issues/10450)）。
- **AMD/ROCm 视频生成**：Wan2.2 TI2V 在 RX 9060 XT 上因没有可用的融合注意力 kernel，回退到 PyTorch SDPA math 后端，导致 OOM（[#10415](https://github.com/unslothai/unsloth/issues/10415)）。
- **Windows on ARM**：PR 为 NVIDIA WoA 主机（GB10/N1X "RTX Spark"）增加了原生 ARM64 CUDA 技术栈安装；此前这些主机会被误判为无 GPU（[#10282](https://github.com/unslothai/unsloth/pull/10282)）。
- **MLX 模型识别**：模型选择器现在会将 `mlx-community` 仓库识别为 MLX 模型，而不是 Safetensors；此前只能依靠以 `-MLX` 结尾的名称来区分（[#10457](https://github.com/unslothai/unsloth/pull/10457)）。

## 4. 性能与优化

- **智能卸载规划器**（进行中，由 `UNSLOTH_SMART_OFFLOAD` 开关控制）：在 VRAM 溢出的代价与 llama.cpp 自身的适配逻辑之间权衡，新增 sub-FFN 溢出阶梯以及上下文感知的设备预留（[#9872](https://github.com/unslothai/unsloth/pull/9872)）。
- **投机解码接受率度量**：提议新增 `unsloth/spec_decoding` 工具，用数据判断某个 draft/target 组合是否值得部署，取代当前"先部署再目测 tokens/sec"的做法（[#10401](https://github.com/unslothai/unsloth/issues/10401)、[#10416](https://github.com/unslothai/unsloth/pull/10416)）。
- **GitHub API 高频请求已修复**：Studio 的更新路径会对每个 llama.cpp 发布多发起一次请求，这已足够触发速率限制。修复后缩减为单个 preflight 请求（[#10461](https://github.com/unslothai/unsloth/pull/10461)，修复 [#10449](https://github.com/unslothai/unsloth/issues/10449)）。
- 待诊断问题：Studio 中存在**持续 CPU 占用**的报告，尚未定位原因（[#10390](https://github.com/unslothai/unsloth/issues/10390)）。

## 5. 稳定性与回归问题

按严重程度排序：

- **Studio 安装器的 torchcodec 矩阵对 torch 2.3/2.4 不正确** —— 对于不受支持的 torch 次版本，`_select_torchcodec_spec` 会一路回退到 torch-2.10 对应的依赖行（`torchcodec>=0.10.0,<0.11.0`）；而 ABI 稳定性豁免分支没有检查索引可用性（cu128 上没有 torchcodec 0.12+）。两个 issue 均由维护者标记且仍然开放（[#10433](https://github.com/unslothai/unsloth/issues/10433)、[#10434](https://github.com/unslothai/unsloth/issues/10434)）。
- **Windows CI 一致性检查失败**：非 ASCII 场景的 venv 加固测试在两种 PowerShell 环境下均失败（2 失败 / 670 通过）。已有解码修复方案（[#10460](https://github.com/unslothai/unsloth/issues/10460)、[#10462](https://github.com/unslothai/unsloth/pull/10462)）。
- **AMD VRAM 卸载约定被违反**：在 ROCm 上，"No Ram Offload" 复选框被忽略——模型仍会从 VRAM 卸载到 RAM（[#10341](https://github.com/unslothai/unsloth/issues/10341)）。
- **Ollama SYSTEM 提示被覆盖**：启用"告诉模型今天的日期"会覆盖远程 Ollama Modelfile 中的 `SYSTEM` 提示；修复已在 PR 中（[#10436](https://github.com/unslothai/unsloth/issues/10436)、[#10463](https://github.com/unslothai/unsloth/pull/10463)）。
- **切换缓存/下载文件夹后 GGUF 变体会消失**：修复方案会在不同文件夹间保留同一仓库的条目（[#10437](https://github.com/unslothai/unsloth/issues/10437)、[#10438](https://github.com/unslothai/unsloth/pull/10438)）。
- **每次停止生成或设置项重新加载模型时，提示队列都会被清空**（[#10428](https://github.com/unslothai/unsloth/issues/10428)）。
- **"Switch Back" 会用硬编码的 4096 上下文重新加载原始本地模型**，而不是用户之前配置的上下文（[#10338](https://github.com/unslothai/unsloth/issues/10338)）。
- **Intel Arc B580 导入仍然失败**：`unsloth_zoo/temporary_patches/gpt_oss.py` 调用了 `torch.xpu.memory.mem_get_info()`，但该 GPU 不支持此调用；已有 15 条评论，开放近 11 个月仍未解决（[#3533](https://github.com/unslothai/unsloth/issues/3533)）。
- **自定义加载设置**（上下文、KV cache 量化）在通过 API 自动加载模型时被忽略（[#10227](https://github.com/unslothai/unsloth/issues/10227)，现已关闭）。
- **较低严重程度 / 已关闭**：附件无法读取时被静默丢弃——修复正在评审中（[#10261](https://github.com/unslothai/unsloth/pull/10261)）；Studio UI 的复制按钮失效（[#5097](https://github.com/unslothai/unsloth/issues/5097)）；Studio 卸载程序不释放空间——临时办法是执行 `uv cache clean`（[#9651](https://github.com/unslothai/unsloth/issues/9651)）；238 字符的超长 API 密钥在 RSAES-OAEP 加密时失败（[#10411](https://github.com/unslothai/unsloth/issues/10411)，已关闭）；远程访问设置在 Settings 与 API 页面间重复（[#9519](https://github.com/unslothai/unsloth/issues/9519)）；代码工具的文件隐藏在折叠的工具卡片内，且没有沙箱预览（[#10425](https://github.com/unslothai/unsloth/issues/10425)）。

## 6. 对应用开发者的意义

- **CLI 自动化即将变得更安全**：`unsloth train --config` 目前会丢弃未知配置键，并静默采用默认值训练——这之后会变成硬错误；`unsloth start dsh` 将真正把 `--context-length` 等加载参数应用到已在运行的服务器上，请据此调整预期（[#10452](https://github.com/unslothai/unsloth/pull/10452)、[#10451](https://github.com/unslothai/unsloth/pull/10451)）。
- **长时间模型下载将不再被 `unsloth start` 中断**——此前 15 分钟的就绪超时会在下载中途杀掉服务器（[#10453](https://github.com/unslothai/unsloth/pull/10453)）。
- **多模态 Agent 开发者**：返回图像的 MCP 工具现在可以把图像真正送入模型上下文（[#10088](https://github.com/unslothai/unsloth/pull/10088)）；聊天在切换到不支持工具的模型时也能继续，而不是因残留的工具历史报错（[#10454](https://github.com/unslothai/unsloth/pull/10454)）。Anthropic 上仅发送图像的问题已修复（[#10455](https://github.com/unslothai/unsloth/pull/10455)）。
- **高于 "high" 的本地思考级别**目前会从模板中被读取，但在生成期间被静默丢弃；一个 PR 会将其透传——如果你面向的是带自定义 effort 级别的推理模型，这会很关键（[#10458](https://github.com/unslothai/unsloth/pull/10458)）。
- **如果你依赖 Ollama Modelfile 的 SYSTEM 提示**，启用 Studio 的"告诉模型今天的日期"功能目前会静默覆盖它们；在修复落地前，请不要将两者组合上线（[#10463](https://github.com/unslothai/unsloth/pull/10463)）。
- **切换缓存/下载文件夹后**，GGUF 量化变体（例如 Q6 在一个文件夹、Q8 在另一个文件夹）目前会碎片化并从选择器中消失；临时办法是在修复发布前把所有量化变体放在同一个下载文件夹中（[#10437](https://github.com/unslothai/unsloth/issues/10437)）。

---

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*