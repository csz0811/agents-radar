# AI 基础设施日报 2026-09-09

> 生成时间: 2026-09-08 22:47 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 跨项目 AI 基础设施对比 — 2026-09-09

## 1. 生态总览

推理服务层正在向新一代混合稀疏注意力/线性注意力 MoE 模型（Qwen3.8-Flash-Next、GLM-5.x-Flash、Kimi-K3、DeepSeek-V4）收敛。上季度模型支持快速落地之后，当前大量工作属于**收尾整合**：确定性修复、缓存布局修正、draft/spec-decode 稳定性。基础设施侧，NVFP4/FP4 混合精度正从“模型量化的小技巧”变成**系统级默认**，横跨权重、KV 缓存与分离式推理——SGLang、vLLM、llama.cpp 在同一个 24 小时窗口内各自动了技术栈的不同部分。快速重启和权重缓存守护进程正在成为推理引擎真正的竞争主轴。与此同时，Agent 协议正确性（tool calls、`/v1/responses`、流式响应转换）是网关、本地运行时和推理引擎共同面对的最主要*用户可见* bug 类别。

## 2. 活跃度对比

| 项目 | 24h Issue 更新 | 24h PR 更新 | 24h 发版 | 定位 |
|---|---|---|---|---|
| **vLLM** | 113 | 500 | 无 | 混合稀疏注意力模型上的收尾整合；未发版，但加固量大 |
| **SGLang** | 未报告\* | 未报告\* | 无 | 快速引擎恢复 + Qwen4/GNVFP4 支持；1 条 CI 通道故障 / 9 条不稳定（flaky） |
| **llama.cpp** | 56 | 132 | **15 个构建**（b10853–b10867） | 发版速度最高；正确性/性能修复日更 |
| **Ollama** | 未报告\* | 未报告\* | 无 | Agent API 正确性；上游 llama.cpp/MLX 升级在 review 中 |
| **LiteLLM** | 未报告\* | 未报告\* | 无 | 代理加固：auth 泄露报告、预算 bug、流式桥接损坏 |
| **Unsloth** | 42 | 未报告\* | **v0.1.807-beta** | AMD 默认 Vulkan（约快 20%）；Studio 多租户/沙箱化工作 |

\* *“未报告”指源摘要中未给出该数据。Issue/PR 数字统计的是更新次数，而非新建条目；不同摘要的统计口径并不完全一致。*

**小结：** llama.cpp 是唯一在大量发版的项目；更大的推理引擎 vLLM 和 SGLang 都处于版本间歇期，但 PR 推进数量达数百。Unsloth 一边发布了面向用户性能的版本，一边合入了一大批 Studio 加固 PR。

## 3. 模型支持竞赛

**今天新模型/新架构支持的落地情况：**

| 架构 / 模型 | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **Kimi-K3** | ROCm large-M MoE 前端（PR） | DP-attn 下 draft-KV 预算修复 | 循环状态回滚（b10853） | — | — |
| **Qwen3.8-Flash-Next** | 确定性 bug 修复（#54521） | NVFP4 混合精度加载；工具循环 bug | — | — | 工具调用预算幻觉（open） |
| **GLM-5.3-Flash** | B200 不支持（open） | HiCache 损坏（open）；SM90 无 FP8 KV | 请求 FA 支持（open） | Cloud 无限推理 bug | — |
| **Qwen4 / NVFP4** | — | **面向 GB10/DGX Spark 的 PLE offload；面向 Qwen MoE 的 MegaMoE** | qwen4exp tensor-split 提案 | Qwen 静态 YaRN（MLX） | — |
| **DeepSeek-V4** | A100 不支持（open） | TP8 decode 在约 245K ctx 挂起（根因修复 review 中） | — | — | — |
| **Mamba / hybrid** | Qwen3.8 混合模型的 GDN 问题 | Mamba 1/2 推理支持已提案 | DFM Mimir 1B（open PR） | — | — |
| **NVFP4 quant + KV** | Non-SM100 NVFP4 KV 缓存 | Qwen3.8-Flash-Next NVFP4 权重 | llama-quantize 中的 NVFP4 量化类型 | — | — |

**谁领先：** **SGLang 在新前沿上走得最远**——它是唯一能跑通 Qwen3.8-Flash-Next NVFP4 加载路径的引擎，也是唯一给出 GB10/DGX Spark 上 Qwen4 FP8 适配方案的引擎，投机解码覆盖也最广（DFlash V2、Domino、动态验证）。**vLLM 的混合模型加固做得最深**（DSA/MLA/NVFP4 缓存、PD 分离），但在 Ampere 上仍跑不了 DeepSeek-V4-Flash，在 B200 上仍跑不了 GLM-5.3-Flash。**llama.cpp 在基础架构支持上依旧最快**（Kimi-K3、Nemotron 3 Super MTPv2、日更构建）；**Ollama 和 Unsloth 则主要是消费上游支持，而非率先落地**——Ollama 靠升级 llama.cpp/MLX，Unsloth 靠自己的 llama.cpp fork。

## 4. 性能前沿

当前优化工作集中在五个方向：

- **KV 缓存压缩与分离式推理（vLLM、SGLang）。** 面向 pre-SM100 GPU 的 NVFP4 KV 缓存（vLLM PR #46963）；HiSparse 常驻主机内存（host-resident）设计改为只在内存压力下换出（spill-only-on-pressure）（vLLM #53781）；DP attention 的 draft-KV 预算核算修复（SGLang #38202）。NIXL PD 部署中跨模型版本的静默 KV 混用仍是一个现实风险（vLLM #55776）。
- **快速重启 / 权重缓存守护进程（SGLang、Ollama）。** SGLang 的 Weight Cache Daemon 把 Qwen3-235B FP8 的量化后权重加载时间从约 306–327 秒降到 **<1 秒**——这是今天各摘要里最亮眼的一个数字。Ollama 在做同样但更小规模的工作，即 GGUF 元数据缓存。
- **spec-decode 与 batching 下的确定性（vLLM、SGLang、llama.cpp）。** SGLang 在 kernel 中默认以确定性方式做 top-p/top-k 重归一化，消除了整整一类 TP>1 死锁；vLLM 仍在追踪 Qwen3.8-Flash-Next 中一个非确定性的 greedy decoding bug；llama.cpp 有未关闭的 MTP 状态保持不确定性问题。在混合模型上，前缀缓存 + EAGLE/MTP 会牺牲 30–40% 吞吐（vLLM #53670）。
- **kernel/后端选型（vLLM、llama.cpp、Unsloth）。** Helion 自定义算子在 H100 上展现出 1.38–1.78x 的几何平均加速（vLLM 提案）；llama.cpp 合入了 Vulkan activation+MUL 融合以及 Metal iq3_xxs 修复；Unsloth 让 **Vulkan 成为 AMD 默认后端（比 ROCm 约快 20%）**。LiteLLM 在攻*宿主侧*事件循环：tokenizer 调用在处理 600k token 计数时会阻塞并持有 GIL 约 0.7 秒，image/template 拉取也会卡住无关请求。
- **大规模长上下文稳定性（vLLM、SGLang、llama.cpp）。** 反复出现的崩溃集中在 SM120（Blackwell）、约 245K context（DSV4 TP8 decode 挂起），以及 Vulkan 约 131K context（RX 7900 XTX，78% 解码断崖）处。规律很明显：上下文长度支持总是先于让它安全运行所需的内存管理工作落地。

## 5. 分层定位

| 层级 | 项目 | 主要竞争/关系 |
|---|---|---|
| **生产级推理引擎** | vLLM、SGLang | 在 paged attention、PD 分离、spec-decode 和 FP4/FP8 缓存路径上正面竞争。SGLang 正把前沿推向新架构（Qwen4 探路、DFlash2）；vLLM 是 PR 速度和加固广度上的领先者。 |
| **本地推理运行时** | llama.cpp | 是其余所有层级的公共底座。后端广度就是护城河：CUDA、ROCm、Vulkan、Metal、SYCL 集成在同一个二进制里。 |
| **本地/云端模型运行时产品** | Ollama | 包装 llama.cpp + MLX；并增加模型分发、上下文管理、OpenAI/Anthropic 兼容。其路线图本质上就是“在一个产品外壳里把上游运行时的正确性做出来”——今天主要就是修 `/v1/responses` 和工具循环。 |
| **Agent 网关 / 控制面** | LiteLLM | 不参与张量计算，位于上述所有引擎之前；竞争点是路由、鉴权/预算执行与无损协议转换。它最大的风险是错误响应体里的*信息泄露*，以及被静默破坏的流式工具调用——这两类故障在推理引擎中都不存在。 |
| **微调框架 + 桌面 Studio** | Unsloth | 微调（FastLanguageModel/QLoRA）之外，还有一个会启动 llama.cpp 衍生 `llama-server` 的桌面应用。作为本地 agent 运行时，它与 Ollama 的位置日渐接近，但差异点在于训练工作流和 GPU 效率钩子。 |

值得注意的依赖链：**Ollama 与 Unsloth Studio 的稳定性都继承自 llama.cpp/上游 fork**，而 LiteLLM 可以路由到这四个中的任意一个。因此即使这两个项目自身没有任何改动，llama.cpp 的一个回归也会传导到 Ollama 和 Unsloth 的用户。

## 6. 趋势信号

1. **混合模型浪潮正在超过推理引擎的成熟速度。** Qwen3.8-Flash-Next、GLM-5.3-Flash、Kimi-K3 和 DeepSeek-V4 在*多个*项目里同时存在未解决的确定性、缓存或崩溃 bug。这些架构的落地速度快于调度器、缓存布局和 spec-decode 路径的适配速度。请把 `temperature=0` 的可复现性当作一项需要测试验证的特性，而不是一个默认成立的假设。

2. **FP4/NVFP4 正在成为默认的服务精度——也将成为默认的 bug 来源。** 权重侧 NVFP4 与 KV 缓存侧 NVFP4 在同一周内分别落到 vLLM（DSA MLA）、SGLang（MIXED_PRECISION 加载）和 llama.cpp（量化类型）。反复出现的崩溃形态——Blackwell SM120 + NVFP4 + 混合注意力——表明硬件支持和量化 kernel 的正确性仍在赛跑。

3. **快速重启是新的服务成本杠杆。** SGLang 把 235B FP8 模型的权重加载降到 **<1 秒**（此前约 5 分钟），这让从零扩容和 P/D 副本回收变得可行。可以预期权重缓存守护进程和元数据缓存会成为入场门槛；Ollama 和 Unsloth 已经在做更小规模的版本。

4. **确定性正在往技术栈下层推进。** SGLang 将跨 rank 的采样重归一化变成默认行为；vLLM 把 batch-shape-invariant（batch 形状无关）推理作为特性跟踪；llama.cpp 在追查 MTP 的请求间状态泄漏。投机解码是把问题暴露出来的催化器——它会把任何非确定性放大成死锁和吞吐断崖。

5. **Agent 协议正确性是最脆弱的一层。** 工具调用损坏在*每一层*都会出现：LiteLLM 的协议桥会丢掉 `tool_calls[].id`/args；Ollama 的 `/v1/responses` 会静默丢弃 developer 消息，也从不把 `tool_search` 工具提供给模型；vLLM 正在重做 Responses-API 解析；llama.cpp 在处理宽 schema 的并行工具调用时会出错。更糟的是，部分失败是**静默**的——HTTP 200、状态为 `completed`，但内容缺失。Agent/应用开发者应该锁定包含这些修复的版本，而不是跟随 `main`。

6. **滚动部署 + 分离式推理存在静默损坏风险。** vLLM 的 NIXL 兼容性哈希只检查几何形状而不检查模型修订版本；Ollama/上游 llama.cpp 的升级正在 review 中；Unsloth 的运行时在加载时可能被杀毒软件隔离。对于 P/D 分离式部署，请固定（pin）修订版本，并协调整个副本组的重启节奏。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-09

## 1. 今日亮点
过去 24h 内没有新发布，但 issue/PR 活动依然频繁（113 个 issue、500 个 PR 有更新）。当前主题是整合收敛：修复正集中到新一代混合稀疏注意力/线性注意力模型上，值得关注的包括 Qwen3.8-Flash-Next 贪心解码的非确定性 bug（#54521）、融合 norm+rope kernel 中缺失的 NVFP4 DSA MLA 写入（#55538），以及 NIXL PD 握手流程中的一个缺口（#55776），后者可能导致 KV 状态跨模型版本混用。此外，多个面向 Responses API 的工具调用/解析器正确性修复已经落地或正在推进。

## 2. 发布与破坏性变更
无。过去 24h 内没有发布新的 release tag 或 wheel。

## 3. 新模型与硬件支持
- **DeepSeek-V4-Flash 在 SM8x（A100/A800/RTX 30xx）上**仍是一个开放请求，已有 106 条评论——目前 DeepSeek-V4-Flash 和 DeepSeek-V4-Flash-0731 都无法在 Ampere 上运行。[Issue #50576](https://github.com/vllm-project/vllm/issues/50576)
- **GLM-5.3-Flash** 被报告在 B200 上不受支持（无法识别 `Glm5NextTextLinearAttention`）。[Issue #54062](https://github.com/vllm-project/vllm/issues/54062)
- **pre-SM100 GPU 上的 NVFP4 KV cache**：该 PR 重写了非 SM100 路径，改用 FlashInfer 的 slot-mapping API 执行 NVFP4 分页追加，让 Ampere/Hopper 系统也能使用更小的缓存格式。[PR #46963](https://github.com/vllm-project/vllm/pull/46963)
- **Kimi-K3（ROCm）**：新增了一个精简的 large-M 合并 MoE 前端，由 `VLLM_ROCM_KIMI_K3_LARGE_M_FRONT=1` 控制；据称在 512 ≤ M ≤ 8192 范围内使用 FP32 累加的融合 BF16 前端投影。[PR #55811](https://github.com/vllm-project/vllm/pull/55811)
- **GLM-5.2-FP8** 已加入 AMD MoRIIO 分离式（disaggregated）CI 模型目录。[PR #53885](https://github.com/vllm-project/vllm/pull/53885)
- **为 GLM 稀疏索引器移除了 DCP interleave 保护**，从而解除使用 `cp_kv_cache_interleave_size > 1` 的 DCP + NIXL 组合的限制。[PR #55802](https://github.com/vllm-project/vllm/pull/55802)

## 4. 性能与优化
- **ROCm 上的 Helion 自定义算子**：有提案建议对部分算子默认采用 Helion kernel；在 H100 上，参与基准测试的 3 个 kernel 显示 1.382–1.785x 的几何平均加速。[Issue #53788](https://github.com/vllm-project/vllm/issues/53788)
- **Batch-invariant inference（跨 batch shape 的确定性执行）** 作为 feature 被跟踪，已有 89 条评论；后续工作仍在继续。[Issue #27433](https://github.com/vllm-project/vllm/issues/27433)（另见 [PR #26468](https://github.com/vllm-project/vllm/pull/26468)）
- **HiSparse（DSv4）**：修订了 host-resident sparse-MLA decode 热缓冲设计，现在默认将 KV 保留在 GPU cache 中，只有出现内存压力时才换出——这是对早期“始终 host-resident”方案缺陷的回应。[PR #53781](https://github.com/vllm-project/vllm/pull/53781)
- **EAGLE/MTP + prefix cache**：最后一个 block 被丢弃会导致每次 prefix 命中都要重算 1,648 个 token；在混合 Qwen3.8 GDN 布局上使用 spec decoding 并复用 prefix 时，batch 吞吐量会损失约 30–40%。[Issue #53670](https://github.com/vllm-project/vllm/issues/53670)
- **KV prefetch 时机**：prefetch 启动过晚会造成 GPU 空闲时间——这对 LMCache 用户有影响。[Issue #41784](https://github.com/vllm-project/vllm/issues/41784)

## 5. 稳定性与回归问题
按严重程度排序：

1. **Qwen3.8-Flash-Next 非确定性贪心解码** —— 当上下文超过 `indexer_budget`、Qwen Sparse Attention 切换到 top-k 选择后，即使 5 个字节完全相同的请求设置 `temperature=0`，也会返回不同输出。影响 eval/CI 的可复现性。[Issue #54521](https://github.com/vllm-project/vllm/issues/54521)
2. **RTX 3090 上静默 CUDA IMA（exit 0）**：hybrid GDN + MTP k=3 + async scheduling 组合会触发；多个加固修复后仍然存在。[Issue #53726](https://github.com/vllm-project/vllm/issues/53726)
3. **sm_120 上的 FlashInfer IMA**：NVFP4 + FP8 KV cache 下，即使 16 个 token 的请求也会崩溃。TRITON_ATTN 不受影响。一个针对 FlashInfer NVLink-multicast 融合 all-reduce 路径的相关修复已经提交。[Issue #54225](https://github.com/vllm-project/vllm/issues/54225) · [PR #55973](https://github.com/vllm-project/vllm/pull/55973)
4. **NVFP4 DSA MLA 损坏** —— 融合 norm+rope 的 Triton kernel 会写入 MLA KV，但 rebase 后遗漏了 `nvfp4_ds_mla` 布局。修复正在评审中。[PR #55538](https://github.com/vllm-project/vllm/pull/55538)
5. **NIXL KV 跨模型版本混用** —— 兼容性哈希只检查 geometry，不检查主模型 revision；滚动更新可能静默混用不兼容的 KV。[PR #55776](https://github.com/vllm-project/vllm/pull/55776)
6. **EngineCore 在父进程死亡后成为孤儿** —— 如果父进程被 SIGKILL/OOM-killer 杀死，worker 仍会继续运行；修复增加了父进程死亡后的关闭机制。[PR #55846](https://github.com/vllm-project/vllm/pull/55846)
7. **KV-offload 缓存跨布局复用** —— 持久化 offload 命名空间没有包含 `kv_cache_layout`，导致共享 `root_dir` 下会发生跨布局 prefix 命中。[PR #55907](https://github.com/vllm-project/vllm/pull/55907)
8. **SM120 在持续负载下反复出现 Xid 13 warp 错误**（Nemotron-3.5-Lightning、NVFP4、hybrid Mamba）。[Issue #52225](https://github.com/vllm-project/vllm/issues/52225)
9. **工具调用解析器修复**：Kimi K2 在 streaming 中、slot 初始化前触发 `IndexError` [PR #55975](https://github.com/vllm-project/vllm/pull/55975)；模型省略 `<｜DSML｜tool_calls>` 包装的 DSML 调用现在也能被解析 [PR #55954](https://github.com/vllm-project/vllm/pull/55954)；当内置 Responses 工具参数格式错误时，现在返回 HTTP 400/明确错误，而不是 500/AttributeError [PR #55974](https://github.com/vllm-project/vllm/pull/55974) · [PR #55540](https://github.com/vllm-project/vllm/pull/55540)

## 6. 这对应用开发者意味着什么
- **在依赖稀疏注意力时代模型之前，先把相关修复合入。** Qwen3.8-Flash-Next 的确定性问题以及 hybrid GDN/Mamba 上长期存在的崩溃意味着，你需要验证 `temperature=0` 的可复现性，并在大规模服务这些架构前添加崩溃检测（exit 0 监控）。
- **采用滚动发布的 PD 分离部署必须固定 revision**，否则 prefill 和 decode 副本之间可能发生静默 KV 混用；请先升级，再协调重启。
- **`/v1/responses` 上的工具调用正确性正在积极加固**（Kimi K2、DSML、browser/container/code-interpreter 工具），错误语义正从 500 转向结构化 400。如果你的应用会流式接收工具调用，请固定到包含这些补丁的版本。
- **Ampere 用户仍无法运行 DeepSeek-V4-Flash/0731。** 如果你在使用 A100，请规划迁移或跟踪 #50576。
- **混合模型上的 prefix-cache + spec-decode 可能静默拖垮吞吐量**（损失 30–40%）；请测量每次重复请求的 prefix 命中率，而不要只看首轮 TTFT。

*数据：vllm-project/vllm 的 GitHub issues 和 PRs，更新于 2026-09-08/09。*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 文摘 — 2026-09-09

*基于 sgl-project/sglang 过去 24 小时（截至 2026-09-08）的活动。*

## 1. 今日亮点

本期头条是引擎的快速恢复：Weight Cache Daemon 路线图（[#33522](https://github.com/sgl-project/sglang/issues/33522)）显示第一阶段已通过 [#27139](https://github.com/sgl-project/sglang/pull/27139) 落地，将 Qwen3-235B FP8 的量化后权重加载时间从约 306–327 秒降至 1 秒以内。针对 DFlash/DSpark TP>1 死锁（[#33549](https://github.com/sgl-project/sglang/issues/33549)）的根因修复也已在推进中——[#38565](https://github.com/sgl-project/sglang/pull/38565) 将 top-p/top-k 重归一化默认为确定性行为，消除了跨 rank 的采样分歧。模型方面，main 分支的工作正集中到 Qwen4/GNVFP4 混合精度支持上：Qwen3.8-Flash-Next 的 NVFP4 MIXED_PRECISION 加载（[#38569](https://github.com/sgl-project/sglang/pull/38569)）、Qwen MoE block 的 MegaMoE 接入（[#38080](https://github.com/sgl-project/sglang/pull/38080)），以及 DGX Spark/GB10 上 Qwen4 的 PLE 卸载（[#38570](https://github.com/sgl-project/sglang/pull/38570)）。

## 2. 版本发布与破坏性变更

过去 24 小时内没有发布或破坏性变更。

## 3. 新模型与硬件支持

- 支持 **Mamba 1/2 推理**的提案已提交 —[#34556](https://github.com/sgl-project/sglang/pull/34556)。
- **Qwen3.8-Flash-Next-NVFP4**：支持 ModelOpt MIXED_PRECISION 权重加载（NVFP4 路由专家、FP8 PLE n-gram 表、FP8_BLOCK_SCALES MTP 专家）—[#38569](https://github.com/sgl-project/sglang/pull/38569)。配套修复可确保由 PDL 启动的 router 在加载前会等待 bias 依赖就绪 —[#38568](https://github.com/sgl-project/sglang/pull/38568)。
- **GB10/DGX Spark 上的 Qwen4**：针对 47.7 GiB 的 FP8 表实现基于文件的 PLE 卸载，使约 126 GiB 的 checkpoint 可以装入单个 128 GB 设备 —[#38570](https://github.com/sgl-project/sglang/pull/38570)。
- **MegaMoE**（`--moe-a2a-backend megamoe`）的接入范围从 DeepSeek 系列模型的 block 扩展到了 Qwen MoE block（Qwen3.5-MoE、Qwen3-Next 等），支持 MXFP4 与 NVFP4 专家 —[#38080](https://github.com/sgl-project/sglang/pull/38080)。
- **Domino**：为公开的 `Qwen3-8B-Domino-b16` 在 DFlash V2 中加入优化的 rollout（连续前缀接受、奖励 token）—[#36899](https://github.com/sgl-project/sglang/pull/36899)。
- 支持 **DP attention + LoRA**（含 DeepSeek 系列）—[#36389](https://github.com/sgl-project/sglang/pull/36389)。
- **ROCm**：此前日志中宣告的 Aiter AllReduce 融合现已实际启用 —[#38345](https://github.com/sgl-project/sglang/pull/38345)。AITER 升级就绪这一长期跟踪项仍保持开启（[#21302](https://github.com/sgl-project/sglang/issues/21302)）。
- **Blackwell**：面向 SM100/103 的 TRT-LLM DSv4 attention 仍在推进中 —[#30805](https://github.com/sgl-project/sglang/pull/30805)。注意 Blackwell GPU 上尚不支持 FlashInfer（[#35080](https://github.com/sgl-project/sglang/issues/35080)）。

## 4. 性能与优化

- **Weight Cache Daemon（第一阶段）**：每个 rank 的守护进程持有量化后的权重，并通过 CUDA IPC 对外提供；Qwen3-235B FP8 的权重加载时间从约 306–327 秒降至 1 秒以内 —[#33522](https://github.com/sgl-project/sglang/issues/33522)。
- **`sgl_kernel` 将 top-p/top-k 重归一化默认为确定性行为**，消除了 DFlash/DSpark 死锁背后的 TP rank 间采样分歧，并取代了 rank-0 广播等临时规避方案 —[#38565](https://github.com/sgl-project/sglang/pull/38565)。
- **自适应投机解码**：采用吞吐感知策略，按成本引导自适应投机步数 —[#28045](https://github.com/sgl-project/sglang/pull/28045)。DFlash2 也加入了按请求/位置动态验证的能力，替代固定数量的批量验证 —[#36136](https://github.com/sgl-project/sglang/pull/36136)。
- **MSCCL++** 现在支持 8 节点 AllReduce/AllGather 以及 MNVLS 算法 —[#37442](https://github.com/sgl-project/sglang/pull/37442)。
- **Rust server + DP attention** 在多节点部署中复用节点本地 HTTP 端口范围，而不是为每个节点分配唯一端口 —[#34430](https://github.com/sgl-project/sglang/pull/34430)。
- **缓存遥测**：RadixCache/HiRadixCache 现在会在命中/淘汰时上报 KV 年龄，并在淘汰时上报生命周期与复用次数 —[#38559](https://github.com/sgl-project/sglang/pull/38559)。
- **Mamba 前缀缓存检查点**现在会按配置的 dtype 保存 SSM 状态，而不是固定为 bf16 —[#34820](https://github.com/sgl-project/sglang/pull/34820)。
- 上下文并行 prefill 仍仅限于 DSA 模型和 MHA/GQA + FA3；更广泛的统一方案在 2026 年 Q3 路线图中跟踪 —[#21788](https://github.com/sgl-project/sglang/issues/21788)。

## 5. 稳定性与回归问题

按严重程度大致排序：

1. **Rust TreeCore（v0.5.19 可选启用）在并发下相对 Python TreeCore 出现端到端回归**，发生在一个短共享前缀的小型稠密模型上 —[#38536](https://github.com/sgl-project/sglang/issues/38536)。不透明的 `NodeId` 设计还破坏了外部缓存链接器 —[#37306](https://github.com/sgl-project/sglang/pull/37306)。
2. **DeepSeek-V4（DSV4 + DSPARK）在 8×H20 上 TP8 解码在约 245K 上下文处挂起**：GPU 占用率打满，看门狗杀掉服务器；[#38565](https://github.com/sgl-project/sglang/pull/38565) 中的确定性采样正是针对这一根因 —[#33549](https://github.com/sgl-project/sglang/issues/33549)。
3. **Qwen3.8-Flash-Next 的 thinking 模式与 qwen3_coder 工具解析器在 token ID 0 上死循环**——这是高频工具调用路径上的高优先级正确性 bug —[#36537](https://github.com/sgl-project/sglang/issues/36537)。
4. **GLM-5.3-Flash + HiCache 主机层回载会破坏生成结果**，即使未使用投机解码也会如此：在 8×H100/TP8 上表现为工具调用丢失和退化式重复循环 —[#38031](https://github.com/sgl-project/sglang/issues/38031)。
5. **可中断的 prefill CUDA graph 对 break 输入仅持有弱引用**，导致已释放的内存块被复用 → 错误的贪婪解码输出 / 非法内存访问 —[#37606](https://github.com/sgl-project/sglang/issues/37606)。
6. **GLM-5.2-NVFP4 + EAGLE** 在 nextn 草稿 MoE 使用的 flashinfer_trtllm bf16 批量 GEMM 中发生非法内存访问并崩溃 —[#30209](https://github.com/sgl-project/sglang/issues/30209)。
7. **DFLASH/DSPARK 草稿 KV 池预算使用 `tp_size` 而不是 `attn_tp_size`**，在 Kimi-K3 上使用 DP attention 时导致 OOM —[#38202](https://github.com/sgl-project/sglang/issues/38202)。
8. **B300 上的 TP2 挂起**：由 HiCache、可中断 prefill CUDA graphs 与 FlashInfer MNNVL 组合触发；已附带公开的虚拟权重复现方法 —[#38300](https://github.com/sgl-project/sglang/issues/38300)。
9. **QSA extend 中的 CUDA 非法内存访问**：Qwen3.8-Flash-Next-FP8（H20 TP8）在约 8 个并发请求时出现；可通过 `CUDA_LAUNCH_BLOCKING=1` 或 `--disable-overlap-schedule` 抑制 —[#37633](https://github.com/sgl-project/sglang/issues/37633)。
10. **断开的流式客户端会留下僵尸请求**，它们会一直解码到 max_tokens，并不断刷屏 "state was deleted in TokenizerManager"——回滚 #34160 后出现的回归 —[#36333](https://github.com/sgl-project/sglang/issues/36333)。
11. **GLM-5.3-Flash 在 SM90 上无法使用 FP8 KV 缓存**（`index_kpool: 4` 将 `flashmla_kv` 排除在外；目前没有 DSA 后端支持 bf16-query × fp8-KV）—[#36830](https://github.com/sgl-project/sglang/issues/36830)。
12. **`max_running_requests`（4096）与 `cuda_graph_max_bs`（32）的默认值**使得越过 CUDA graph 上限成为无法回退的吸收态 —[#33483](https://github.com/sgl-project/sglang/issues/33483)。

CI 跟踪显示，截至最近一次自动更新，`main` 分支有 1 个失败测试 / 9 个不稳定测试（近期已修复 972 个）（[#17050](https://github.com/sgl-project/sglang/issues/17050)）。HiCache/prefill-CP 活锁问题（[#38019](https://github.com/sgl-project/sglang/issues/38019)）已关闭。

## 6. 对应用开发者的意义

- **引擎快速重启正在成为现实**：235B FP8 模型的亚秒级权重加载（[#33522](https://github.com/sgl-project/sglang/issues/33522)）改变了从零扩容（scale-from-zero）、自动扩缩容和 P/D 副本回收的成本结构——回收空闲 GPU 不再意味着多分钟的冷启动。
- **GLM-5.3-Flash 与 HiCache / DP attention 组合在生产环境中尚不安全**：主机层回载导致的静默生成损坏（[#38031](https://github.com/sgl-project/sglang/issues/38031)）和草稿 KV 池预算 bug（[#38202](https://github.com/sgl-project/sglang/issues/38202)）都说明，在修复落地之前应继续固定使用已知良好的配置。
- **Qwen3.8-Flash-Next 工具模式部署**在发布上线前应对 thinking + parser 路径设置门禁（gate）或进行监控（[#36537](https://github.com/sgl-project/sglang/issues/36537)），并测试重叠调度下的并发表现（[#37633](https://github.com/sgl-project/sglang/issues/37633)）。
- **确定性采样修复（[#38565](https://github.com/sgl-project/sglang/pull/38565)）**移除了一整类 TP>1 投机解码死锁；如果你正在服务 DeepSeek-V4/DSPARK 长上下文，请升级到包含该修复的构建。
- **DGX Spark/GB10 上的 Qwen4 FP4** 只有在 [#38570](https://github.com/sgl-project/sglang/pull/38570) 的 PLE 卸载路径下才可行；否则 checkpoint 无法放入单个 128 GB 设备。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 动态 — 2026-09-09

**活动：** 过去 24 小时内有 15 个构建（`b10853`–`b10867`）落地；56 个 issue 和 132 个 PR 有更新。所有链接均指向 GitHub。

## 1. 今日亮点

- **`b10867` 修复了集成 GPU 上的延迟张量加载回归。** 在 [#27837](https://github.com/ggml-org/llama.cpp/issues/27837) 引入 TENSOR_READ_LAZY 改动后，[#28160](https://github.com/ggml-org/llama.cpp/issues/28160) 中测得 AMD iGPU/Vulkan 上 qwen4exp 工作负载的预填充吞吐量（`pp512`）大约**减半**。修复方式为：在 `auto` 模式下检测到集成 GPU 时禁用延迟加载；同时将 [#28326](https://github.com/ggml-org/llama.cpp/pull/28326) 中更大范围的 `large`/`all` 模式重构予以部分回滚，让改动保持精准。
- **新模型支持：** `b10853` 为 Kimi-K3 添加循环状态回滚（[#28466](https://github.com/ggml-org/llama.cpp/pull/28466)）；PR [#28617](https://github.com/ggml-org/llama.cpp/pull/28617) 修复了 Nemotron 3 Super MTPv2 草稿头加载（此前缺失两个张量）。
- **稳定性观察：** 当前最严重的未解决报告包括：RTX 5090 在 Qwen3.8-27B Q6_K 推理期间发生整芯片重置（[#27910](https://github.com/ggml-org/llama.cpp/issues/27910)），以及 Qwen3.6 MoE + 部分专家卸载时出现可稳定复现的 CUDA flash-attn 非法内存访问（[#26609](https://github.com/ggml-org/llama.cpp/issues/26609)）。

## 2. 发布与破坏性变更

- **`b10867`** — [PR #28326](https://github.com/ggml-org/llama.cpp/pull/28326)：检测到集成 GPU 时，`auto` 模式下的延迟张量加载现在默认关闭。该行为变化仅影响 iGPU 用户；独立 GPU 的默认值不变。Vulkan/Metal iGPU 部署建议更新到该版本。
- **`b10865`** — [revert #28604](https://github.com/ggml-org/llama.cpp/pull/28604) 撤销了 [#24233](https://github.com/ggml-org/llama.cpp/pull/24233) 中对 CUDA/HIP `prop.integrated` 的恢复。发布说明中未给出理由；HIP 用户应留意 iGPU 检测回归。
- **`b10864`** — [PR #28302](https://github.com/ggml-org/llama.cpp/pull/28302)：服务端检查点的 min-step 淘汰现在只在检查点列表已满时触发。此前，短于 `checkpoint_min_step` 的提示词可能因过于激进的间距淘汰而丢失其后所有检查点。
- **`b10856`** — [PR #27764](https://github.com/ggml-org/llama.cpp/pull/27764)：14 个专用聊天模板解析器已从 `chat.cpp` 移入 `common/parsers/`，仿照 `src/models` 的拆分方式。属内部重构，但自定义聊天模板值得做一次回归测试。
- **其他构建/正确性修复版本：** `b10859` 修复缺失头文件导致的编译错误（[#28566](https://github.com/ggml-org/llama.cpp/pull/28566)，关闭 [#28557](https://github.com/ggml-org/llama.cpp/issues/28557)/[#28559](https://github.com/ggml-org/llama.cpp/issues/28559)）；`b10855` 修复 OpenCL conv2d 非连续 stride 处理（[#28503](https://github.com/ggml-org/llama.cpp/pull/28503)）；`b10857` 修复 Vulkan-Hpp 32 位句柄问题（[#22892](https://github.com/ggml-org/llama.cpp/pull/22892)）。

## 3. 新模型与硬件支持

- **Kimi-K3 循环状态回滚** — [b10853](https://github.com/ggml-org/llama.cpp/releases/tag/b10853) / [#28466](https://github.com/ggml-org/llama.cpp/pull/28466)：为 Kimi-K3 添加状态回滚支持，适用于混合/循环架构上的投机解码与多轮回溯。
- **Nemotron 3 Super MTPv2** — [#28617](https://github.com/ggml-org/llama.cpp/pull/28617)（已关闭）：草稿头加载此前只会创建 21 个张量中的 19 个；现在会创建缺失的 latent 输入/输出投影。
- **qwen4exp 张量切分** — [#28569](https://github.com/ggml-org/llama.cpp/pull/28569)（开放中）：提议重新启用 `-sm tensor`；该选项此前因 PLE 层调度器断言而被 [#27941](https://github.com/ggml-org/llama.cpp/pull/27941) 禁用。
- **DFM Mimir 1B（HrmTextForCausalLM）** — [#27625](https://github.com/ggml-org/llama.cpp/pull/27625)（开放中）：为一种交替双栈循环架构提供转换与模型支持。
- **NVFP4 量化** — [#22897](https://github.com/ggml-org/llama.cpp/pull/22897)（已关闭）：为 `llama-quantize` 补上缺失的 `LLAMA_FTYPE_MOSTLY_NVFP4` 映射，并生成 CUDA MMA 反量化路径所需的逐张量 `.scale`/`.input_scale` 张量。
- **构建/平台支持：** Windows ARM64 使用 MSVC `cl.exe`（[#28362](https://github.com/ggml-org/llama.cpp/pull/28362)）— 移除了 WoA 构建对 clang 的要求。
- **较受关注的开放功能请求：** AMD XDNA 后端（[#21725](https://github.com/ggml-org/llama.cpp/issues/21725)，32 👍）、GLM5.3 flash-attention 支持（[#27922](https://github.com/ggml-org/llama.cpp/issues/27922)，14 👍）、Intel Mac 上的 Metal 多 GPU（[#28565](https://github.com/ggml-org/llama.cpp/issues/28565)），以及扩散模型 GGUF 的 RFC（LTX-2 图像/视频/音频，[#28541](https://github.com/ggml-org/llama.cpp/issues/28541)）。

## 4. 性能与优化

**已合入：**

- **Vulkan 激活算子与 MUL 融合** — [b10858](https://github.com/ggml-org/llama.cpp/releases/tag/b10858) / [#27220](https://github.com/ggml-org/llama.cpp/pull/27220)：将 UNARY(GELU|SIGMOID|SILU|SOFTPLUS) 与 MUL 融合，减少 dispatch 开销。
- **Metal iq3_xxs 空闲线程修复** — [b10863](https://github.com/ggml-org/llama.cpp/releases/tag/b10863) / [#28086](https://github.com/ggml-org/llama.cpp/pull/28086)：当 `ne00 < 1024` 时避免 SIMD 组半空闲，并为小矩阵分发单独的 8 行切分内核。
- **iGPU 预填充性能恢复** — `b10867` 修复了 [#28160](https://github.com/ggml-org/llama.cpp/issues/28160) 报告的 pp512 回归。

**进行中：**

- **主机卸载的 MoE 解码**受主机带宽限制；目前有两条互补路线：一是为最近使用的专家权重增加 GPU 常驻 LRU 缓存（[#27861](https://github.com/ggml-org/llama.cpp/pull/27861)）；二是通过 `--prefetch-experts-slots N` 做前瞻式 H2D 专家预取（[#28414](https://github.com/ggml-org/llama.cpp/pull/28414)）。
- **Vulkan 异步拷贝** — [#28618](https://github.com/ggml-org/llama.cpp/pull/28618) 提出在上下文空闲时于 `ggml_backend_vk_cpy_tensor_async` 中执行 CPU 写入，减少每次跨 split 拷贝约 50 μs 的 fence 等待开销。
- **HIP intrinsics** — [#28616](https://github.com/ggml-org/llama.cpp/pull/28616) 用无分支 SWAR 替换了基于循环的 `__vsub4`/`__vcmpne4`/`__vcmpeq4` 模拟实现，并修复 `__vsub4` 中错误的饱和语义。
- **Vulkan 可观测性** — [#28101](https://github.com/ggml-org/llama.cpp/pull/28101) 为命令缓冲添加调试标签，使 GPU profiler 的 trace 能显示每个 dispatch 属于哪个 op。
- **需要了解的性能问题：** [#27734](https://github.com/ggml-org/llama.cpp/issues/27734) — 由于子分配碎片化，RX 7900 XTX 在 131k 上下文时 Vulkan 解码吞吐量下降约 78%；规避方法是设置 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`。

## 5. 稳定性与回归问题

按严重程度排序；已有修复 PR 的会注明。

1. **RTX 5090 显示丢失 / GSP 整芯片重置** — [#27910](https://github.com/ggml-org/llama.cpp/issues/27910)：在 CUDA 上运行 Qwen3.8-27B Q6_K 时，多次请求后会触发黑屏与 GPU 重置。已通过多个前端（Codex、DeepSeek Harness）复现。开放中。
2. **CUDA flash-attn 中可稳定复现的非法内存访问** — [#26609](https://github.com/ggml-org/llama.cpp/issues/26609)：Qwen3.6-35B MoE + 部分专家卸载，在 b10107 到 b10243 的多个构建中均可在 `cudaStreamSynchronize` 中复现；使用 `-fa off` 后消失。开放中。
3. **MTP 请求间状态残留** — [#26425](https://github.com/ggml-org/llama.cpp/issues/26425)：当 MTP 状态在请求之间泄漏时（CPU + Vulkan），Qwen3.6-35B-A3B-MTP 会产生非确定性输出和模型质量下降。开放中。
4. **Qwen2.5-Omni 在 Metal 上的音频损坏** — [#28441](https://github.com/ggml-org/llama.cpp/issues/28441)：M5 Max (b10809) 上系统负载较高时出现音频数据的静默损坏。开放中。
5. **Vulkan DeviceLost 系列问题：** Intel Arc A770 在 Qwen3.8 flash 下触发断言（[#28247](https://github.com/ggml-org/llama.cpp/issues/28247)）；Vega 8 iGPU 在约 50k 上下文时 device-lost（[#26447](https://github.com/ggml-org/llama.cpp/issues/26447)）；RADV gfx1151 上 `draft-mtp` 在提示词处理中途 device-lost（[#27306](https://github.com/ggml-org/llama.cpp/issues/27306)）；ANV/Arc B580 的标量 flash-attention 回退导致性能呈 O(N²) 退化（[#27638](https://github.com/ggml-org/llama.cpp/issues/27638)）。
6. **HIP/ROCm 在 gfx1151 上输出错误 logits** — [#28211](https://github.com/ggml-org/llama.cpp/issues/28211)：在 Strix Halo (RDNA 3.5) 上，当提示词长度超过 `n_ubatch` 时结果不正确。开放中。
7. **SYCL/OpenCL 多 GPU 崩溃** — [#27168](https://github.com/ggml-org/llama.cpp/issues/27168)：`dev2dev_memcpy` 在 OpenCL 适配器上触发了未实现的实验性 P2P 路径。开放中。
8. **llama-server `fattn.cu:579` 崩溃** — [#24440](https://github.com/ggml-org/llama.cpp/issues/24440)：Gemma 4 31B 搭配 MTP + `-sm tensor` 时，编辑系统消息后崩溃。开放中。
9. **并行工具调用错乱/挂起** — [#28522](https://github.com/ggml-org/llama.cpp/issues/28522)：多个 Qwen 模型在包含约 48 个可选参数的 schema 下无法正确处理并行工具调用。开放中。

**今日已关闭/修复：** CUDA 在 compute capability 120 上的 mmq 构建失败（[#18363](https://github.com/ggml-org/llama.cpp/issues/18363)）；SYCL 在第二次 prompt 时出现乱码（[#26845](https://github.com/ggml-org/llama.cpp/issues/26845)）；iGPU 延迟张量加载回归（[#28160](https://github.com/ggml-org/llama.cpp/issues/28160)，已在 `b10867` 中修复）。值得跟踪的在途修复：DeepSeek V3.2 的 DSML 标记泄漏到字符串工具参数（[#28612](https://github.com/ggml-org/llama.cpp/pull/28612)）、Jinja `in` 运算符左操作数为 null（[#28620](https://github.com/ggml-org/llama.cpp/pull/28620)）、以及槽位保存/恢复时上下文检查点的保留（[#26004](https://github.com/ggml-org/llama.cpp/pull/26004)）。

## 6. 对应用开发者的影响

- **如果你在 iGPU 上提供服务，或使用服务端检查点，请升级到 `b10867`：** 它恢复了 AMD iGPU/Vulkan 上的预填充性能，并修复了短提示词的检查点过度淘汰问题（`b10864`）。
- **在 Qwen3.6 MoE 模型上使用 MTP 需谨慎。** [#26425](https://github.com/ggml-org/llama.cpp/issues/26425) 显示请求间状态残留会导致静默的非确定性；[#27306](https://github.com/ggml-org/llama.cpp/issues/27306) 显示 prefill 期间会出现 device-lost。如果对外提供这些模型的推理服务，请验证输出的确定性，或在问题修复前禁用 MTP。
- **CUDA + 部分专家卸载：** 请跟踪 [#26609](https://github.com/ggml-org/llama.cpp/issues/26609)。目前可靠的规避方式是使用 `-fa off`；flash-attn 搭配 MoE 专家卸载容易崩溃。
- **在 Qwen 上使用大型/并行工具 schema 的工具调用应用：** 并行调用可能发生错乱或挂起（[#28522](https://github.com/ggml-org/llama.cpp/issues/28522)）。在问题解决前，可考虑将工具调用串行化，或简化 schema。
- **Kimi-K3 与 Nemotron 3 Super MTPv2 用户** 可以从今日构建中获得有意义的正确性修复（`b10853`、[#28617](https://github.com/ggml-org/llama.cpp/pull/28617)）——在对这些模型跑基准测试之前请先更新。
- **长上下文场景下的 Vulkan：** 如果接近 131k 上下文时遇到约 78% 的解码性能断崖，`GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` 环境变量是经过验证的规避方法（[#27734](https://github.com/ggml-org/llama.cpp/issues/27734)）。
- **配置语义变化：** `--lazy-mode auto` 现在的含义是“该系统的安全默认值”，而不是“延迟加载大于 4 GiB 的张量”——如果你在 iGPU 硬件上显式设置过该选项，这一点值得注意。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

## Ollama Digest — 2026-09-09

### 1. 今日亮点

过去 24 小时没有发布版本。当前的主要关注点是 Agent 相关 API 的正确性：新增 issue 报告了 `/v1/responses` 中存在的**静默失败**，包括 developer 角色消息被丢弃（`#18305`），以及 `tool_search` 结果从未提供给模型（`#18306`）。后端方面，GGUF 元数据缓存/统一以及上游 llama.cpp/MLX 版本升级工作仍在继续。

### 2. 发布与破坏性变更

过去 24 小时没有新的发布或破坏性 API/配置变更。

正在审查中的上游/基础设施升级：

- [llama.cpp 版本升级 b10864 #18317](https://github.com/ollama/ollama/pull/18317)
- [MLX 版本升级 #18235](https://github.com/ollama/ollama/pull/18235)

### 3. 新模型与硬件支持

大多是后端/运行时层面的改动，而非新增模型架构支持：

- [mlxrunner：支持 Qwen 静态 YaRN 上下文 #18263](https://github.com/ollama/ollama/pull/18263) — 添加对 Qwen3.5/3.8 静态 YaRN 元数据的解析，将 YaRN 应用到文本 RoPE 和多模态 M-RoPE，并允许上下文窗口最大可达 `factor * original_max_position_embeddings`。
- [mlxrunner：显式指定上下文时不覆盖软容量 #18285](https://github.com/ollama/ollama/pull/18285) — 保留根据 VRAM 容量自动设置软上下文的行为；仅当显式请求 `num_ctx` 时才传入 `--ctx-size`。
- [create：增加服务端 MLX 导入并去除 GGUF 转换 #14969](https://github.com/ollama/ollama/pull/14969) — 在服务端为 safetensors/MLX 增加 create 支持；将 GGUF create 限制为仅包装既有 GGUF 输入。
- [server：提取 GGUF 元数据并统一能力检测 #17858](https://github.com/ollama/ollama/pull/17858) — 减少重复的 GGUF 元数据读取，并使跨模型路径的能力检测结果保持一致。

### 4. 性能与优化

- [server：提取 GGUF 元数据并统一能力检测 #17858](https://github.com/ollama/ollama/pull/17858) — 将提取出的 GGUF 元数据按 blob 缓存到 `<OLLAMA_MODELS>/metadata/` 下，减少高成本的重复元数据加载，并修复 runner 能力结果不一致的问题。
- [mlx：将数组生命周期限定到作用域内，而不是固定（pin）并扫描清理（sweep） #18327](https://github.com/ollama/ollama/pull/18327) — 修复 MLX 前缀缓存中内存无限累积的问题，并避免重复的 KV 快照拷贝。未附带具体基准数据。
- [api：在模型详情中暴露估算的上下文长度 #17663](https://github.com/ollama/ollama/pull/17663) — 让客户端更清楚地看到上下文大小的设置；目前采用分桶方式，但设计上为未来基于 MLX runner 的估算改进留出空间。

### 5. 稳定性与回归问题

今天提交/更新、并大致按严重程度排序的 issue：

- [openai：`/v1/responses` 静默丢弃 developer 角色输入项 #18305](https://github.com/ollama/ollama/issues/18305) — 返回 `200` 且 `status: completed`，但 developer 角色内容从未进入模型。对 Agent 工作负载来说，这是一个静默的正确性缺陷。
- [Responses API：`tool_search` 工具从未提供给模型 #18306](https://github.com/ollama/ollama/issues/18306) — 由客户端 `tool_search` 找到的工具会以文本形式出现在结果中，但模型无法调用它们。影响 Codex CLI/MCP 风格集成。
- [Cloud：glm-5.3 可能陷入无限推理并中止任务 #18193](https://github.com/ollama/ollama/issues/18193) — 在 OpenCode 和 ZCode 中使用 Ollama Cloud 时出现；官方 Z.AI API 行为正常。
- [gemma3:12b 在带引号输入上结构化输出被截断 #18094](https://github.com/ollama/ollama/issues/18094) — 当源文本包含转义的双引号内容时，使用 JSON-schema `format` 的 `/api/generate` 会提前停止输出。
- [针对纯工具回合的 500 "no user query found in messages" #18303](https://github.com/ollama/ollama/issues/18303) — 今天提交并关闭；很可能是未关闭的 [Qwen3.8 tool-loop 500 issue #17778](https://github.com/ollama/ollama/issues/17778) 的重复。
- [Qwen3.8 / 工具 Agent 循环返回 500 #17778](https://github.com/ollama/ollama/issues/17778) — 当模型反复调用工具且没有用户文本回合时，Chat/API 流式传输会失败，报错 `no user query found in messages`。
- [ROCm：RX 9060 XT 上缺少 `TensileLibrary_lazy_gfx1200.dat` #17782](https://github.com/ollama/ollama/issues/17782) — AMD 后端在运行一段时间后加载失败。
- [Qwen3.8-27B GSQ-RCO-GGUF IQ3_S 返回空内容 #18297](https://github.com/ollama/ollama/issues/18297) — 生成以 `done_reason: stop` 结束，但 `content` 为空。

值得关注的修复 PR（进行中）：

- [template：在 Go 模板中保留 developer 指令 #18315](https://github.com/ollama/ollama/pull/18315) — 在 Go 模板渲染时将 developer 消息归一化为 system 消息；很可能解决 #18305 中 developer 消息静默丢失的问题。
- [server：上下文溢出后重试压缩 #18324](https://github.com/ollama/ollama/pull/18324) — 在截短最旧的可移除转录文本后，重试摘要压缩。
- [openai：为工具搜索调用 ID 使用 `tsc_` 前缀 #18296](https://github.com/ollama/ollama/pull/18296) — 修复切换到 OpenAI 模型时的 Codex 对话验证错误。
- [model/parsers：保留多行 FunctionGemma 工具参数 #18322](https://github.com/ollama/ollama/pull/18322) — 修复包含换行的字符串参数的工具调用被丢失的问题。
- [修复 progress 和 sched 中的数据竞争 #18319](https://github.com/ollama/ollama/pull/18319) — 修复进度渲染和调度器卸载日志中的数据竞争。
- [anthropic：没有 thinking 时 `output_config.effort` 会禁用 thinking #18326](https://github.com/ollama/ollama/pull/18326) — 修正设置 effort 但没有 thinking 块时 Anthropic 端点的行为。

### 6. 对应用开发者的影响

- **当前请谨慎使用 `/v1/responses`。** developer 角色消息和通过 tool search 加载的工具可能会静默地从模型可见上下文中消失。相关工作正在进行，但在 #18305/#18306 合入之前，请尽量使用 `system`/`user` 角色，并确认工具定义确实提供给了模型。
- **纯工具轮次仍然是一个故障点。** 如果你的 Agent 循环发送了一个 assistant `tool_use` 消息加上工具结果消息，却没有用户文本，Ollama 的兼容端点可能会返回 `500 no user query found in messages` 错误。可考虑保留一条轻量级用户消息，或关注 #17778/#18303 相关的修复。
- **Gemma 在转义文本输入上的结构化输出并非完全可靠。** 如果你在 Gemma 模型上依赖 JSON-schema `format`，请针对源内容中的双引号添加回归测试。
- **MLX 用户应留意 Qwen YaRN 与上下文长度的变化。** 目前开放的 MLX PR 会为 Qwen 模型添加长上下文支持，并更合理地处理显式/软上下文，但两者都还没有合入。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM 文摘 — 2026-09-09**

**今日亮点**

过去 24 小时的活动以代理的正确性与加固为主，而非新版本发布：两份报告描述了认证失败响应泄露密钥哈希、后端内部信息和模型允许列表的问题（[#40217](https://github.com/BerriAI/litellm/issues/40217)、[#39757](https://github.com/BerriAI/litellm/issues/39757)）；预算/速率限制执行则暴露了三个未关闭缺陷（[#40095](https://github.com/BerriAI/litellm/issues/40095)、[#34140](https://github.com/BerriAI/litellm/issues/34140)、[#24677](https://github.com/BerriAI/litellm/issues/24677)）。跨 Anthropic/OpenAI/Codex 协议的流式转换仍是最活跃的缺陷领域，包括工具调用 ID/参数丢失以及加密推理缓存内容问题（[#39796](https://github.com/BerriAI/litellm/issues/39796)、[#27144](https://github.com/BerriAI/litellm/issues/27144)、[#39339](https://github.com/BerriAI/litellm/issues/39339)）。性能方面，两个 PR 致力于解决阻塞式分词器/模板/图片获取导致的的事件循环停滞问题（[#40311](https://github.com/BerriAI/litellm/pull/40311)、[#40186](https://github.com/BerriAI/litellm/pull/40186)）；同时，重试策略处理现在会在所有路由器入口排除刚拒绝请求的部署（[#40306](https://github.com/BerriAI/litellm/pull/40306)）。

**版本发布与破坏性变更**

过去 24 小时内没有发布新的 LiteLLM 版本。以下为已关闭/合并且对用户有可见影响的 PR：

- OTel v2 现在会遵循 `OTEL_EXPORTER_OTLP_PROTOCOL=http/json`（之前虽接受该值但仍发送 protobuf），从而修复了与仅支持 JSON 的收集器（如 Splunk HEC）的不兼容问题（[#40290](https://github.com/BerriAI/litellm/pull/40290)）。
- 策略引擎的 `post_call` 护栏流水线现在会在响应和流上执行，并携带准确的成功响应头（[#38721](https://github.com/BerriAI/litellm/pull/38721)）；后续工作让传统 post-call 钩子也能作为流式流水线步骤运行（[#40284](https://github.com/BerriAI/litellm/pull/40284)）。
- 新增批量端点 `PATCH /v2/team/{team_id}/members`，并会在批量写入后使成员缓存失效（[#32958](https://github.com/BerriAI/litellm/pull/32958)）。
- 模型生命周期：`PATCH /model/{id}/update` 中显式传入的 `null` 现在会清除相应字段（cost、固定的 `max_input_tokens`、`mode`），而不再被静默忽略（[#40047](https://github.com/BerriAI/litellm/pull/40047)）；MCP 工具集更新也应用了相同的 null 处理修复（[#40022](https://github.com/BerriAI/litellm/pull/40022)）。

**新模型与硬件支持**

本周期没有确认新增的模型/硬件。当前排队中的项目包括：官方 QwenCloud provider，作为现有 DashScope provider 的国际迁移路径（[#36150](https://github.com/BerriAI/litellm/issues/36150)）；以及 vLLM `/v1/realtime` 端点的透传（[#23102](https://github.com/BerriAI/litellm/issues/23102)）。注意：OpenAI `gpt-6-astra` 可正常访问，但模型族辅助函数无法识别 gpt-6 族，因此旧版 `max_tokens` 会被拒绝——目前请使用 `max_completion_tokens`（[#40279](https://github.com/BerriAI/litellm/issues/40279)）。

**性能与优化**

- **将模板/图片获取移出事件循环**（[#40311](https://github.com/BerriAI/litellm/pull/40311)）：Anthropic direct-HTTP 图片、Vertex AI Anthropic 强制 base64、Ollama 图片以及 HF 模板此前会在事件循环上执行阻塞式 HTTP 请求；若出现一批慢速图片 URL，可能会导致无关的文本请求停滞。
- **为精确 token 计数释放 GIL**（[#40186](https://github.com/BerriAI/litellm/pull/40186)）：Claude 分词器上一次 600k token 的计数会持有 GIL 长达约 0.7 秒，即使计数是在工作线程上运行的，也仍会使事件循环饥饿。同时，该改动还限制了每个字符串的精确计数上限，并跳过对失败请求的计数，避免生成消费记录。
- **重试策略中的部署排除**（[#40306](https://github.com/BerriAI/litellm/pull/40306)）：现在，在所有路由器入口（embeddings、images、speech、transcription、rerank、batches、adapters），重试都会绕开刚刚拒绝请求的部署——此前只有 chat completions 和通用 API helper 会记住该失败。
- **预算/数据库操作时序**（[#40310](https://github.com/BerriAI/litellm/pull/40310)）：预算预留对账现在会在消费记录入队之前运行，消除了一个竞态条件：一次预算重置加上已结算成本可能对同一请求重复计费。

**稳定性与回归缺陷**

按严重程度排序，除非另有说明，均为未关闭状态：

1. **认证错误泄漏内部信息（尚无修复 PR）。** 密钥错误的 401 响应会泄露后端软件标识、数据库表名以及所提交密钥的 SHA-256 哈希（[#39757](https://github.com/BerriAI/litellm/issues/39757)）。另一份报告显示，401 会回显已存储的密钥哈希，403 则会把密钥的完整模型允许列表返回给未获得相应授权的调用方（[#40217](https://github.com/BerriAI/litellm/issues/40217)）。面向互联网的代理存在数据暴露风险。
2. **并发首次请求可绕过预算。** 在使用自定义认证、`custom_auth_run_common_checks` 和 `max_end_user_budget_id` 时，某个未知终端用户的多个并发首次请求会完全绕过默认预算（[#40095](https://github.com/BerriAI/litellm/issues/40095)）。
3. **速率限制双向失准。** v3 限流器会重复计算团队的按模型限制，导致在配置值 N 时，约 N/2 即返回 429（[#34140](https://github.com/BerriAI/litellm/issues/34140)）。虚拟密钥 TPM 限制缺陷在 v1.82.3 中仍可复现，尽管此前已被标记为已修复（[#24677](https://github.com/BerriAI/litellm/issues/24677)）。
4. **协议桥中的流式工具调用损坏。** 当兼容 OpenAI 的上游在单个 delta 中发送完整 tool_call 时，重新分块器会丢弃 `tool_calls[].id` 和 `function.name`（[#39796](https://github.com/BerriAI/litellm/issues/39796)）。当 `function_call_arguments.done` 在没有前置 delta 的情况下到达时，Codex Responses 流式传输会丢弃已累积的函数调用参数（[#27144](https://github.com/BerriAI/litellm/issues/27144)）。Anthropic 流式 `tool_use` 可能在其内部工具调用块生成之前即被丢弃（[#36262](https://github.com/BerriAI/litellm/issues/36262)）。
5. **推理缓存/内容在跨桥和路由时失效。** Anthropic `/v1/messages` → OpenAI Responses 桥会丢弃 `encrypted_content`，因此提示缓存不会被延续（[#39339](https://github.com/BerriAI/litellm/issues/39339)）。复杂度自动路由器可能会把包含 `encrypted_content` 的后续对话迁移到其他模型组（[#40237](https://github.com/BerriAI/litellm/issues/40237)）。
6. **Bedrock 托管文件无法删除。** `DELETE /v1/files/{id}` 返回 500，错误为 “BedrockFilesConfig does not support file deletion”（[#39715](https://github.com/BerriAI/litellm/issues/39715)）。
7. **兼容性回归。** `gpt-6-astra` 拒绝 `max_tokens`（[#40279](https://github.com/BerriAI/litellm/issues/40279)）。Anthropic `messages[]` 中的 system-role 条目会被静默丢弃（[#36917](https://github.com/BerriAI/litellm/issues/36917)）。OpenAI `input_audio` 内容块会导致 `token_counter` 崩溃，进而静默禁用上下文窗口/缓存预检查，并使 `/utils/token_counter` 返回 500（[#38459](https://github.com/BerriAI/litellm/issues/38459)）。SearXNG 适配器会把上游 HTTP 429/503 转换为成功但空的结果，从而掩盖服务商中断（[#38628](https://github.com/BerriAI/litellm/issues/38628)）。
8. **基础设施/配置。** Azure Entra Redis 认证在集群模式下无法启动代理——`init_redis_cluster` 没有凭据提供者路径（[#37726](https://github.com/BerriAI/litellm/issues/37726)）。包含多个 Entra app_roles 的 SSO 负载只会让第一个角色生效（[#33434](https://github.com/BerriAI/litellm/issues/33434)）。

**这对应用开发者意味着什么**

- 对 Anthropic (Claude Code) → OpenAI 推理模型路由要保持谨慎：加密的推理内容和提示缓存尚未在桥接过程中保留，而且复杂度路由可能让后续对话停留在错误的模型组上（[#39339](https://github.com/BerriAI/litellm/issues/39339)、[#40237](https://github.com/BerriAI/litellm/issues/40237)）。
- 若你的应用依赖通过 LiteLLM 进行流式智能体工具调用，请添加明确的回归测试——跨协议流式传输仍会以多种形式丢失工具调用 ID/名称和参数（[#39796](https://github.com/BerriAI/litellm/issues/39796)、[#27144](https://github.com/BerriAI/litellm/issues/27144)）。
- 不要根据团队按模型速率限制来规划容量：重复计数会在约配置值一半处产生 429，且虚拟密钥 TPM 限制仍然不可靠（[#34140](https://github.com/BerriAI/litellm/issues/34140)、[#24677](https://github.com/BerriAI/litellm/issues/24677)）。
- 对于暴露在互联网上的代理，在 [#40217](https://github.com/BerriAI/litellm/issues/40217) 和 [#39757](https://github.com/BerriAI/litellm/issues/39757) 的泄漏修复完成前，请将 401/403 响应体视作信息泄露渠道；与此同时可考虑在边缘层进行清理。
- 并发首次请求导致终端用户预算被绕过（[#40095](https://github.com/BerriAI/litellm/issues/40095)），意味着默认预算应设置得保守一些；请关注消费对账修复（[#40310](https://github.com/BerriAI/litellm/pull/40310)）的落地。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-09

来源：[unslothai/unsloth](https://github.com/unslothai/unsloth)

## 1. 今日亮点

[unsloth v0.1.807-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.807-beta) 默认将 AMD 后端切换到 Vulkan（预填充/解码相比 ROCm 快约 20%），为 Windows 版 `llama-server.exe` 添加签名以减少 Smart App Control 误报，并修复了 Strix/核显上 AMD 输出乱码的问题。与此同时，一大批 Studio 加固 PR 已进入评审：共享 GPU 机器上的每账户隔离（[#10375](https://github.com/unslothai/unsloth/pull/10375)）、为 Python/Terminal 工具提供 OS 级沙箱（[#10526](https://github.com/unslothai/unsloth/pull/10526)）、将文档上传处理移出事件循环（[#10552](https://github.com/unslothai/unsloth/pull/10552)）。issue 分拣也在持续进行：42 个 issue 获得更新，过去 24 小时内关闭了许多长期未决的报告（离线安装、Qwen3-omni、导入缓慢、tokenizer 缺陷等）。

## 2. 版本发布与破坏性变更

- [v0.1.807-beta — “大规模性能改进与修复”](https://github.com/unslothai/unsloth/releases/tag/v0.1.807-beta)
  - AMD 现在默认使用 Vulkan：预填充和解码相比 ROCm 均快约 20%。
  - Windows 版 `llama-server.exe` 现已签名，可减少杀毒软件/Smart App Control 误报。
  - Strix 和核显上的 AMD 乱码输出问题已在上游修复（发布说明原文在来源中被截断）。
  - 行为提示：AMD 的默认计算路径由 ROCm 切换为 Vulkan。发布说明中未提及 ROCm 的回退选项或迁移开关。

值得注意的 issue 关闭（无迁移影响）：[#10356](https://github.com/unslothai/unsloth/issues/10356)（离线 Desktop 安装请求）、[#10449](https://github.com/unslothai/unsloth/issues/10449)（`unsloth studio update` 对 GitHub API 请求过于频繁）。

## 3. 新模型与硬件支持

本期没有发布全新的模型架构，但以下模型/硬件主题较为活跃：

- [Qwen3-omni TTS 语音克隆支持](https://github.com/unslothai/unsloth/issues/3636) — 长期未决的功能请求已关闭（Qwen2.5-omni 此前已被支持）。
- [Gemma 4 基础模型在 tokenizer 配置中缺少 `<bos>`](https://github.com/unslothai/unsloth/issues/7903) — 已关闭。
- [Wan2.2 TI2V 视频生成在 AMD RX 9060 XT 上 OOM](https://github.com/unslothai/unsloth/issues/10415) — 已关闭；根本原因是 AMD 上缺少融合注意力 kernel，回退到了 PyTorch SDPA math 后端。
- [AMD Radeon 6950 XT 支持问题](https://github.com/unslothai/unsloth/issues/10468) — 已关闭。
- [`FastLanguageModel.get_peft_model()` 中的 MiCA（Minor Component Adaptation）支持](https://github.com/unslothai/unsloth/issues/6730) — 仍开启，获得 4 个 👍；可与 HF PEFT 中已合入的 LoRA 兼容初始化方案配合。
- [GGUF 选择器隐藏了重复的量化版本（如普通版与 `-mtp` 构建）](https://github.com/unslothai/unsloth/pull/10556) — 修复正在评审中，合并后两种构建都可以被选择。

## 4. 性能与优化

- **AMD 性能提升 20%**：v0.1.807-beta 将 Vulkan 设为 AMD 的默认后端——预填充与解码相对 ROCm 均有提升（[发布说明](https://github.com/unslothai/unsloth/releases/tag/v0.1.807-beta)）。
- **缓慢导入（60 秒以上）已修复**：[#1859](https://github.com/unslothai/unsloth/issues/1859) 的根因是经入口点导入时 `PatchFastRL` 所致；现已以“已修复，待确认”状态关闭。
- **文档上传移出事件循环**：[#10552](https://github.com/unslothai/unsloth/pull/10552) — 复制/哈希/embedder 探测此前直接在异步路由中内联执行，且处理程序从未 await，导致大文件上传会在传输中途冻结整个后端。
- **KV 抢占交由 llama-server 处理**：[#10358](https://github.com/unslothai/unsloth/pull/10358) — 当被启动的 llama-server 能够自行把槽位暂存到宿主 RAM（`--preempt-ram`，unslothai/llama.cpp#184/#190）时，Studio 会禁用自身的抢占逻辑，让每个聊天都能用满整个上下文窗口。该 PR 尚未合并，基于 [#10301](https://github.com/unslothai/unsloth/pull/10301) 堆叠。
- **本地模型大小计算更准确**：[#10558](https://github.com/unslothai/unsloth/pull/10558) — Studio 此前会加总每个权重文件（重复的 `original/` 副本、`optimizer.pt`），导致 VRAM 估算失真；现在按单份权重计算大小。
- **启动超时加固**：[#10550](https://github.com/unslothai/unsloth/pull/10550) 与 [#10551](https://github.com/unslothai/unsloth/pull/10551) 让 `unsloth start` 在 LoRA 基座模型下载期间保持存活，并允许轮询一台从不打印早期 API key 行的服务器。

## 5. 稳定性与回归

**未解决的回归（按严重程度从高到低）：**

- **[#7485 — 最新 llama.cpp 构建导致 AMD GPU 检测失效](https://github.com/unslothai/unsloth/issues/7485)** — 仍开启。全新安装后，AMD ROCm（gfx1201）GPU 不再被检测到；目前尚无可用的修复 PR。AMD 用户在升级前应先固定/核对自己的 llama.cpp 版本。
- **[#10544 — Windows：两个回合落在同一个时钟 tick 内时，对话召回顺序不是全序](https://github.com/unslothai/unsloth/issues/10544)** — 仍开启。测试失败显示的顺序为 `['1', '2', '4', '3', '5']` 而非排序结果；作者是 danielhanchen，核心团队应该已经注意到。
- **[#10338 / #10339 / #10337 — AMD ROCm Studio 状态缺陷](https://github.com/unslothai/unsloth/issues/10338)** — 仍开启。在 Radeon PRO W7900/W7500 上：“Switch Back”会以 4096 上下文重新加载模型；点击红圈卸载会报错；每个聊天的 token 计数不会被重新统计。
- **[#10479 — 模型幻觉出一个工具调用预算](https://github.com/unslothai/unsloth/issues/10479)** — 仍开启。尽管“Max Tool Calls Per Message”设为 Max，Qwen 3.8 Flash Next 仍会在约 20 次工具调用后开始“节省”调用。
- **[#10176 — KV 准入的“无上限容量”豁免范围超出预期](https://github.com/unslothai/unsloth/issues/10176)** — 仍开启。携带 `tools` 的请求会完全绕过无上限令牌重试逻辑。
- **[#10529 — 未锚定的链接定义探测会把回复升级到完整文档渲染路径](https://github.com/unslothai/unsloth/issues/10529)** — 仍开启。
- **[#10460 — Windows 奇偶校验测试失败：非 ASCII 标记回滚](https://github.com/unslothai/unsloth/issues/10460)** — 仍开启。CI 红色通道一直存在（2 失败 / 670 通过 / 9 跳过），PowerShell 和 pwsh 均为如此。

**评审中的修复 PR：**

- [#10494 — 启动时修复被隔离的 llama.cpp 运行时](https://github.com/unslothai/unsloth/pull/10494) — 杀毒软件/Smart App Control 造成的隔离目前只在模型加载时才暴露；该 PR 会在启动阶段直接修复安装。
- [#10430 — 避免“模型加载过程中退出”导致 llama-server 成为孤儿进程](https://github.com/unslothai/unsloth/pull/10430) — 这是 #10369 的后续；崩溃已修复，但残留的孤儿服务器进程问题仍然存在。
- [#10471 — 卸载程序修复](https://github.com/unslothai/unsloth/pull/10471) — 所有权门槛会卡住旧版本安装；卸载程序也可能删除不属于 Unsloth 的目录。
- [#10473 — 标识不可打开的 AMD 设备节点](https://github.com/unslothai/unsloth/pull/10473) — `/dev/kfd` 与 `/dev/dri/renderD*` 可能存在但权限为 0660；账户不在 `render` 组中时，目前会被识别为“没有 GPU”。关闭 [#10466](https://github.com/unslothai/unsloth/issues/10466)。
- [#10557 — 将因上下文窗口截断的 Claude 回复标记为 `truncated`](https://github.com/unslothai/unsloth/pull/10557) — Anthropic 的停止原因此前落到了 “stop” 分支，导致被截断的回复渲染为已完成状态，API 客户端也拿到了错误的 `finish_reason`。
- [#10553 — 为上传的图片应用 EXIF 方向信息](https://github.com/unslothai/unsloth/pull/10553) — 后端解码的是原始像素，而预览遵循了旋转信息；导致 inpaint 蒙版被绘制在错误的坐标上。
- [#10561 — RAG 作用域淘汰逻辑改为基于文件夹身份](https://github.com/unslothai/unsloth/pull/10561) — 基于时间戳的淘汰逻辑在 Windows 上存在竞态；修复 `Uploads (windows-latest)` 失败问题。
- [#10560 — 避免在 CLI 中使用隐藏的 PowerShell 参数](https://github.com/unslothai/unsloth/pull/10560) — `-WindowStyle Hidden` 与 `-ExecutionPolicy Bypass` 的组合会命中微软杀毒软件的检测特征。
- [#10555 — 退出 CPT 时保留 LoRA rank/alpha/variant](https://github.com/unslothai/unsloth/pull/10555) — 切换到继续预训练再切回后，会静默地把 rank 8 重置为 16，并丢弃用户设置的值。
- [#10515 — 测试卫生：`read_text()` 未指定编码](https://github.com/unslothai/unsloth/issues/10515) — 已关闭；另有 [#10516](https://github.com/unslothai/unsloth/issues/10516)（仍开启，`UNSLOTH_PYTORCH_MIRROR` 查询令牌拼接问题）和 [#10505](https://github.com/unslothai/unsloth/pull/10505)（已关闭，比较窗格设置恢复）。

**分拣期间值得注意的关闭项：** [#4846](https://github.com/unslothai/unsloth/issues/4846)（Windows 提权安装后 `llama-server.exe` 提示 `Access denied`）、[#1859](https://github.com/unslothai/unsloth/issues/1859)（导入缓慢）、[#10415](https://github.com/unslothai/unsloth/issues/10415)（Wan2.2 AMD OOM）、[#10436](https://github.com/unslothai/unsloth/issues/10436)（日期提示覆盖远程 Ollama 系统提示）、[#10400](https://github.com/unslothai/unsloth/issues/10400)（空 bearer 的无密钥认证）、[#6528](https://github.com/unslothai/unsloth/issues/6528)（diffusiongemma 报错）。

## 6. 对应用开发者的意义

- **AMD GPU 推理服务**：升级到 v0.1.807-beta，以获得默认 Vulkan 路径带来的约 20% 预填充/解码性能提升；但要留意 [#7485](https://github.com/unslothai/unsloth/issues/7485)——最新的上游 llama.cpp 构建可能会直接导致 AMD 检测失效，在问题解决前请固定/锁住你的 llama.cpp/运行时版本。
- **Windows/Studio 部署**：已签名的 `llama-server.exe` 加上 PR [#10494](https://github.com/unslothai/unsloth/pull/10494) 的启动自修复隔离逻辑，能显著减少 Smart App Control/杀毒软件方面的摩擦。如果你以普通用户身份运行提权安装出来的 Studio，请确认 #4846 在你的版本上已修复。
- **Agent/工具调用类应用**：有三点值得关注：(1) MCP 工具图片终于能真正送到模型面前，而不是被模型凭空捏造——[#10088](https://github.com/unslothai/unsloth/pull/10088)；(2) 即使上限设为无限制，也要当心模型自行施加工具调用预算——[#10479](https://github.com/unslothai/unsloth/issues/10479)；(3) 工具 UI 语法修复（“Using tool”与“Used tool”）虽小，但能改善流式工具调用的体验——[#10470](https://github.com/unslothai/unsloth/issues/10470)。
- **共享/租用 GPU 基础设施**：如果你面向多个租户开放 Unsloth Studio，[#10375](https://github.com/unslothai/unsloth/pull/10375)（每账户隔离）与 [#10526](https://github.com/unslothai/unsloth/pull/10526)（为 Python/Terminal 工具提供 bubblewrap/Seatbelt 沙箱）是两个值得关注的 PR——目前 Python/Terminal 工具仅靠宿主机上的软件级防护来运行。
- **推理正确性**：如果你代理 Anthropic 兼容接口的回复，请留意 [#10557](https://github.com/unslothai/unsloth/pull/10557) 中的 `finish_reason` 截断修复；目前被截断的生成结果与完整结果难以区分。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*