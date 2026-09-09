# AI 基础设施日报 2026-09-10

> 生成时间: 2026-09-09 22:46 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 跨项目基础设施对比 — 2026-09-10

## 1. 生态概览

AI 基础设施生态的重心正在从最初级的“模型支持”转向“运维纪律”：vLLM 与 SGLang 正在消化自身平台重构带来的回归，llama.cpp 继续在 Vulkan/CPU 上打磨本地推理性能，LiteLLM 则扛起了 agent 工作负载下 API 兼容性、限流和费用核算方面的大部分风险。现在最严重的问题不是功能缺失，而是静默故障——`temperature=0` 解码不确定、embedding 向量全零、工具调用事件丢失、宿主机内存耗尽。在全部六个项目中，优化工作都集中在 sparse-attention/MLA 模型家族、KV 缓存经济性、量化路径（FP8/NVFP4/MXFP4）以及 AMD Vulkan、Intel XPU、ROCm 这类非 NVIDIA 后端上。

## 2. 活跃度对比

下表数量仅覆盖各 digest 快照中明确引用的 GitHub issue/PR，并非通过 GitHub API 取得的完整总数。

| 项目 | 引用 issue 数 | 引用 PR 数 | 发布状态 |
|---|---|---|---|
| vLLM | ≈17（其中 6 个为稳定性回归） | ≈15 | **v0.29.0 stable** — 594 个提交、277 位贡献者；MRV2 为默认引擎 |
| SGLang | ≈11（其中 9 个为稳定性 bug） | ≈14 | **最近 24 小时无发布** |
| llama.cpp | **59 个开放/更新的 issue** | **105 个 PR 有更新** | **10 个滚动构建**（b10871–b10883） |
| Ollama | ≈13（2 个高严重度、未修复） | ≈8 | **最近 24 小时无发布** |
| LiteLLM | ≈16 | ≈14 | **v1.102.0.dev.1**（dev；cosign 签名镜像） |
| Unsloth | ≈10（4 个开放，5 个已关闭/已验证） | ≈12 | **v0.1.808-beta** |

从 issue/PR 数量看，最活跃的项目是 llama.cpp 和 vLLM。风险最大的发布是 vLLM v0.29.0：MRV2 现在已是所有模型的默认引擎，但 issue #54237 报告该版本在启动时会耗尽宿主机内存，而 0.27.1 没有这个问题。

## 3. 模型支持竞赛

模型前沿如今已不再只取决于规模，而是由**稀疏注意力 / 混合线性注意力 MoE 架构**定义：

- **vLLM** 在引擎侧集成方面的推进力度最大：MiniMax-M3 的 ROCm 稀疏注意力索引/top-k 内核已合并；Qwen3.8-Flash-Next 的 QSA/FP8 工作正在 GB10/sm_121 上推进；Kimi-K3 的 KDA 修复已进入评审；DeepSeek sparse-MLA 的 PCP+DCP 支持也在推进中。
- **SGLang** 的开放 PR 管线覆盖面最广：Blackwell 上的 Qwen4-Exp / Qwen3.8-Flash-Next-NVFP4 混合 checkpoint、LLaDA-Image 扩散模型的原生服务、ROCm 上的 DSA MLA + EAGLE、GLM-5.3 模板自动检测，以及 DeepSeek-V4 router 支持。
- **llama.cpp** 正在两条并行 PR 上赛跑（#27754、#27773），试图加入 GLM-5.3-Flash/GLM-5-Next（320B 级，视觉 + MoE），但两者都还没落地。此外，它还为 Qwen3.8-Flash-Next 的 K=2048 宽 TOP_K 索引器在 SYCL 上提供了实际可用的支持。
- **Ollama** 与 **Unsloth** 并未直接参与这场架构竞赛；它们通过 llama.cpp 继承模型支持。
- **LiteLLM** 以兼容层角色参与：已识别 `gpt-6-astra` 模型家族，新增 CLF AI Gateway provider，并将 Vertex AI batch 扩展到了自定义端点。

**当前格局：** vLLM 在已合入且可直接用于生产引擎的集成上领先；SGLang 在周边能力广度（diffusion、ModelOpt 混合精度、混合稀疏/SSM 服务）上领先；llama.cpp 处于本地运行时前沿，但 GLM-5.3 仍未合入。

## 4. 性能前沿

优化工作集中在五个方向：

1. **KV 缓存容量与淘汰策略。** vLLM 报告在 Qwen QSA 路径上借助 fp8_e4m3 获得约 2× 的 KV 池容量（#54426）；SGLang 正在为混合 SWA/SSM 模型添加解码侧 HiCache，以及面向 agent 的 Tail-Optimized LRU 淘汰策略。Ollama 的前缀缓存粒度最大只能按 8192 token 的倍数对齐，导致冷缓存 agent 提示词要承受 17–27s 的开销。
2. **量化稀疏注意力内核。** FP8/NVFP4/MXFP4 以及 MTP/block-FP8 专家调度在 vLLM、SGLang 和 llama.cpp 中都在活跃推进。这些路径当前也构成最大的正确性风险面（top-k 被静默丢弃、解码不确定、非法内存访问）。
3. **内核级本地推理。** llama.cpp 的 Vulkan shader 工作通过专用 IQ4_XS mat-vec 在 RDNA4 上带来 +6–17% 的解码性能提升；ARM I8MM 上的 q4_K vec_dot 获得 +34.3% GFLOPS。Unsloth 则声称 AMD Vulkan 比 ROCm 快约 20%。
4. **分布式服务与分离式架构。** vLLM 正在组合 PCP+DCP 以支持 KV 分片/prefill 拆分；SGLang 正在为 Kimi-K3 加固 2P2D/DCP 路径。两者都在攻坚长上下文多 GPU 场景（~245K 上下文仍有挂起/崩溃问题待解决）。
5. **网关控制面延迟。** LiteLLM 正在把输入 token 计数移入 Rust core（#40381），并将 Bedrock 请求签名移出事件循环（#40270）——此前一次阻塞式凭证刷新就会冻结所有请求，连 `/health` 也不例外。

## 5. 项目层级定位

这六个项目分属不同层级，有着不同的故障特征：

- **vLLM 与 SGLang** 是相互竞争的生产级服务引擎。它们掌控模型原生内核、KV 池内存管理、连续批处理、投机解码和分布式执行。它们的 bug 表现为引擎层的正确性/内存回归，最终以挂起、非法内存访问或非确定性输出的形式暴露。
- **llama.cpp** 是一个覆盖 CPU、CUDA、Vulkan、SYCL 和 Metal 的可移植推理运行时，并拥有强大的量化生态。它正以持续发布的方式迭代（每天 10 个构建），并作为其他工具的下层基础；它的 issue 会影响所有内嵌 GGUF/llama-server 的项目。
- **Ollama** 是面向应用的本地运行时/API 服务器——本质上是 llama.cpp 之上的开发者体验层，对外暴露 OpenAI/Anthropic 兼容端点并提供模型管理。它的 issue 集中在 API 契约、显存核算、runner 生命周期和静默输出损坏，而不是内核质量。
- **LiteLLM** 是 LLM 网关/控制面。它本身不执行模型推理；其价值在于路由、限流、预算、供应商协议转换、流式完整性和可观测性。因此，它影响最大的 bug 是 Redis 双重计数、缓存键失效、流事件丢失和事件循环停滞。
- **Unsloth** 位于上游微调层（PyTorch 原生），但其桌面版 Studio 也内嵌了 llama.cpp 服务器用于本地推理。更准确地说，它是一个训练/适配层，只不过推理侧的运维问题也在增多。

这条依赖链值得记住：llama.cpp 的一个内核 bug，会变成 Ollama 的一次崩溃；vLLM 的一个确定性问题，会变成应用层的正确性 bug；LiteLLM 的一个缓存键 bug，会静默破坏 Claude Code 的提示缓存。

## 6. 趋势信号

**1. 现代化平台重构正带着已知回归发布。**  
vLLM 在所有模型上默认启用了 MRV2，而宿主机内存耗尽 bug（#54237）仍未关闭。SGLang 的 Fast Engine Recovery 正在分阶段落地；其中 235B FP8 权重的加载耗时从 ~306s 降至 <1s 是真实的提升，但引擎恢复仍不完整。请把 vLLM 0.29.x 当作一次大版本升级，而不是补丁发布。

**2. 新一代稀疏注意力架构在量化边界上天然脆弱。**  
一旦超过 QSA `indexer_budget`，贪心解码便不再确定（#54521）；top-k 候选被静默丢弃（#51782）；NVFP4+MTP 的 budget 出现回归（#54906）——这些问题都在影响最新的稀疏注意力模型。在这些内核被加固之前，应用方不应假设 `temperature=0` 在这些架构上具备确定性。

**3. 工具调用正确性是跨层 agent 的头号风险。**  
llama.cpp 中 Qwen 并行工具调用格式错乱、SGLang 中 Kimi-K3 的 `tool_choice=required` 会导致挂起、Ollama 输出字面文本而不是 `tool_use` 块、LiteLLM 在 Bedrock 工具调用往返后出现 XML 流——这是系统性问题。Agent 开发者需要防御性地校验流和 schema，而不是只跟踪上游 bug。

**4. 提示缓存已成为成本与正确性风险面，而不只是延迟优化特性。**  
LiteLLM 的 `prompt_cache_key` 回归（#39145）、Ollama 前缀缓存恢复被截断，以及 vLLM 的 KV 保留/分区 RFC，都表明缓存正确性正在成为 Claude Code 这类 agent 工作负载中“董事会级”的议题。

**5. 非 NVIDIA 加速已到了必须认真对待生产的阶段。**  
AMD Vulkan 在 Unsloth 中的表现已经超过 ROCm；llama.cpp 正在发布针对 RDNA4/Intel/Adreno 的专用 shader；ROCm 的 CI 也已扩展到 MI355。但 Blackwell CUDA graph 挂起、Intel Arc/XPU 内存释放 bug、AMD iGPU Vulkan 故障仍然很常见——多后端支持已成为标配预期，但仍不成熟。

**6. 网关性能正在成为 agent 规模扩展的瓶颈。**  
LiteLLM 将 Bedrock 签名移出事件循环、把 token 计数迁入 Rust core，说明 Python 层的网关处理已经不足以支撑高并发、长上下文的流量。当消息总长达到 100K+ token 时，运维人员需要警惕 GIL 导致的请求停滞，并优先采用 Rust core 路径。

**给应用开发者的总结：** 任何 vLLM 发布都应先经过金丝雀测试再固定使用；要针对静默损坏模式校验 embedding 与输出；要对工具调用解析做 schema 边界加固；在当前这波修复落地之前，不要把基于 Redis 的限流和提示缓存正确性当作硬性保证。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 简报 — 2026-09-10

## 1. 今日要闻

v0.29.0 已于本周期发布 —— 共 594 个提交，来自 277 位贡献者（其中 91 位新人）—— 这也是首个让 Model Runner V2（MRV2）成为所有模型默认路径的版本（[#53183](https://github.com/vllm-project/vllm/pull/53183)）。过去 24 小时的 issue 动态几乎都集中在 MRV2 上线后的连锁反应上：0.28.0/0.29.0 的主机内存耗尽回归（[#54237](https://github.com/vllm-project/vllm/issues/54237)），以及 Qwen3.8-Flash-Next 稀疏注意力（QSA）在 GB10/sm_121 上的多个正确性 bug —— 包括 prompt 越过 `indexer_budget` 阈值后 `temperature=0` 输出不确定的问题（[#54521](https://github.com/vllm-project/vllm/issues/54521)）。优化方面，一个在 QSA 路径上启用 fp8_e4m3 KV cache 的社区补丁报告称可将 KV 池容量提升约一倍（[#54426](https://github.com/vllm-project/vllm/issues/54426)）。

## 2. 版本发布与破坏性变更

- **v0.29.0**（[发布公告](https://github.com/vllm-project/vllm/releases/tag/v0.29.0)）：MRV2 现已成为所有模型的默认引擎，完成了自池化（pooling）模型（[#48290](https://github.com/vllm-project/vllm/pull/48290)）开始的全面上线。此外，MRV2 还新增了用于 KV cache 自动定容的 CUDA 图内存分析。

- **迁移须知**：在缺少 pinned/UVA 内存的平台上，目前仍没有自动回退机制 —— PR [#54655](https://github.com/vllm-project/vllm/pull/54655)（V1 runner 回退）仍在开放中。从 0.27.x 升级前请先验证启动期的内存行为；参见下方 [#54237](https://github.com/vllm-project/vllm/issues/54237)。

## 3. 新增模型与硬件支持

过去 24 小时的模型/硬件相关工作大多仍处于集成与验证阶段：

- **Qwen3.8-Flash-Next**：GB10/sm_121 上仍是最活跃的讨论主题 —— QSA 路径的 FP8 KV-cache 接入（[#54426](https://github.com/vllm-project/vllm/issues/54426)）、MRV2 下 NVFP4 + MTP 的行为（[#54906](https://github.com/vllm-project/vllm/issues/54906)）、以及开启 prefix caching 后 GDN 路径的非法内存访问（[#54173](https://github.com/vllm-project/vllm/issues/54173)）。

- **MiniMax-M3**：通过 aiter 集成的 ROCm 稀疏注意力索引/top-k kernel 已合入（[#52664](https://github.com/vllm-project/vllm/pull/52664)）。

- **Kimi-K3**：针对 Hopper 的 KDA 投影重叠修复正在评审中（[#55426](https://github.com/vllm-project/vllm/pull/55426)），用于解决 [#55350](https://github.com/vllm-project/vllm/issues/55350)。

- **DeepSeek / sparse-MLA**：PCP+DCP 组合的 KV 分片/预填充拆分支持（[#56157](https://github.com/vllm-project/vllm/pull/56157)）；DSpark MTP + PCP 整合草案（[#56107](https://github.com/vllm-project/vllm/pull/56107)）。

- **ROCm**：CI 扩展至 MI355，覆盖 DSv4-Flash、DiffusionGemma TP2 和 FP8 DSpark（[#50519](https://github.com/vllm-project/vllm/pull/50519)）；通过多趟归约支持无限序列长度（[#39001](https://github.com/vllm-project/vllm/pull/39001)）。

- **Intel XPU**：双 Arc B50（Battlemage）的 TP=2 IPC 故障（[#48953](https://github.com/vllm-project/vllm/issues/48953)）与模型加载后主机内存未释放（[#50269](https://github.com/vllm-project/vllm/issues/50269)）仍处于开放状态。

- **GLM5.3-Flash**：v0.29.0 checkpoint 加载错误已上报并关闭（[#56007](https://github.com/vllm-project/vllm/issues/56007)）。

## 4. 性能与优化

- **KV 容量**：fp8_e4m3 KV cache 在 Qwen3.8-Flash-Next 的 QSA 路径上可将 KV 池容量提升到约 bf16 的两倍（在单块 GB10/sm_121 上测得）；尚未合入上游，正在征求更多验证（[#54426](https://github.com/vllm-project/vllm/issues/54426)）。

- **MRV2 `apply_write`**：若内容由 UVA 支撑，可省去 Triton kernel 写入前的 H2D 暂存拷贝；正在评审中（[#55819](https://github.com/vllm-project/vllm/pull/55819)）。

- **GEMM+AllReduce 融合**：有人请求对 CUTLASS SM100 Lamport 融合 GEMM+AllReduce kernel 进行基准测试并集成（[#55261](https://github.com/vllm-project/vllm/issues/55261)）。

- **Linear kernel 效率（未解决）**：在 Qwen3 系列模型上，小 batch（≤32）与中等 batch（约 257，经 CUDA 图 padding）的 `linear` 性能不理想（[#27173](https://github.com/vllm-project/vllm/issues/27173)、[#35467](https://github.com/vllm-project/vllm/issues/35467)）。

- **ROCm 多流共享 expert**：#55099 之后的调优与 `wvSplitKrc` 修复（[#56098](https://github.com/vllm-project/vllm/pull/56098)）。

## 5. 稳定性与回归问题

按严重程度排序：

1. **严重 — 启动时耗尽全部主机内存**：0.28.0/0.29.0 会耗尽全部主机内存并导致卡死；0.27.1 不受影响。问题仍开放，尚无修复 PR（[#54237](https://github.com/vllm-project/vllm/issues/54237)）。

2. **正确性 — 贪心解码不确定**：当上下文超过 QSA `indexer_budget` 后，Qwen3.8-Flash-Next FP8 对字节完全相同的 `temperature=0` 请求会返回不同输出；`persistent_topk` 路径疑似与此相关（[#54521](https://github.com/vllm-project/vllm/issues/54521)）。

3. **正确性 — top-k 候选被静默丢弃**：当大量数值落入同一个粗粒度直方图分桶时，`persistent_topk` 可能丢弃候选（B300/sm103）（[#51782](https://github.com/vllm-project/vllm/issues/51782)）。

4. **内存安全 — 混合 Mamba 前缀缓存恢复**：在显式指定 `--block-size` 时，若 state 列以错误的块大小进行初始化，会出现非法内存访问（[#53142](https://github.com/vllm-project/vllm/issues/53142)）。

5. **MRV2 逻辑回归缺陷**：MRV2 下，Qwen3.8 NVFP4 + MTP 忽略了 `thinking_token_budget`（[#54906](https://github.com/vllm-project/vllm/issues/54906)）。

6. **投机解码 + CUDA 图**：带 `num_speculative_tokens_per_batch_size` 的 MTP 推测器无法完成完整的 CUDA 图捕获（[#48494](https://github.com/vllm-project/vllm/issues/48494)）。

正在推进中的修复：Kimi-K3 在 H100 上的 KDA 重叠问题（[#55426](https://github.com/vllm-project/vllm/pull/55426)）；`head_size=256` 时解耦 fp8 scale 的 Triton attention 128B 对齐（[#56164](https://github.com/vllm-project/vllm/pull/56164)）；GPU-CPU KV 传输故障应降级缓存而不是让引擎崩溃（[#52838](https://github.com/vllm-project/vllm/pull/52838)）；在 UVA 不可用时回退到 V1 runner（[#54655](https://github.com/vllm-project/vllm/pull/54655)）；xgrammar JSON schema/grammar 后端的编译超时（[#54090](https://github.com/vllm-project/vllm/pull/54090)）；以及被中止请求的指标现在会被记录（[#55940](https://github.com/vllm-project/vllm/pull/55940)）。

## 6. 对应用开发者的影响

- **将 0.29.0 视为一次引擎级重大变更**：MRV2 成为默认会改变启动内存行为与 kernel 选择。在批量升级前，请先使用实际模型和工作负载进行 canary 验证；如果你还在 0.27.x，尤其需要如此。

- **不要依赖 `temperature=0` 的确定性**：对 Qwen3.8-Flash-Next，当长 prompt 接近 QSA budget 阈值时存在输出不确定的风险；在 [#54521](https://github.com/vllm-project/vllm/issues/54521) 修复前，可考虑限制上下文长度，或固定使用未启用 QSA 的路径。

- **有状态/混合模型 + 前缀缓存仍有风险**：混合 Mamba/GDN 前缀缓存恢复缺陷（[#53142](https://github.com/vllm-project/vllm/issues/53142)）与投机解码的交互问题（[#52244](https://github.com/vllm-project/vllm/pull/52244)）仍在不断暴露；请对重放密集型负载做显式验证。

- **投机解码 + CUDA 图的组合**（MTP、按 batch 设置的投机 token 数等）仍容易出现 CUDA 图捕获失败 —— 生产环境启用前务必先测试。

- **关注上游 KV cache 的方向**：关于上下文感知 KV 保留（[#37003](https://github.com/vllm-project/vllm/issues/37003)）与 KV 分区一致性（[#53194](https://github.com/vllm-project/vllm/issues/53194)）的长期 RFC，预示着 KV cache 在并发 agentic 负载下的分区与淘汰方式近期将发生变化。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang 动态 — 2026-09-10

### 今日要闻
过去 24 小时内没有发布任何新版本。最值得关注的动态集中在：ModelOpt/FP8/block-FP8 对 Qwen 系列模型在 Blackwell/SM100 上的正确性修复、ROCm MLA 内核的启用，以及面向生产 Kubernetes 部署的路由器加固。另外，快速引擎恢复路线图显示，第一阶段权重缓存守护进程工作已通过 #27139 合入，将 Qwen3-235B FP8 的权重加载时间从约 306–327 秒降至 1 秒以内。

---

### 版本发布与破坏性变更
无。过去 24 小时内未出现发布标签或迁移说明；下面所有条目均为当前活跃的 GitHub issue/PR。

---

### 新模型与硬件支持
- **Qwen4-Exp / ModelOpt 在 Blackwell 上的混合精度支持**：  
  [#38727](https://github.com/sgl-project/sglang/pull/38727) 使 Qwen4-Exp / `Qwen3.8-Flash-Next-NVFP4` 混合检查点中 PLE 表与 MTP 专家能够按层使用 FP8。  
  [#38726](https://github.com/sgl-project/sglang/pull/38726) 新增了 block-FP8 MoE 专家分发，并改为推导 block size，而不是硬编码 `[128, 128]`。  
  [#38728](https://github.com/sgl-project/sglang/pull/38728) 在 SM100 上将 `modelopt_mixed` Qwen3 MoE 检查点的默认 MoE runner 设为 `flashinfer_trtllm`。
- **LLaDA-Image 扩散模型服务**：  
  [#37907](https://github.com/sgl-project/sglang/pull/37907) 为 LLaDA-Image / LLaDA-Image-Turbo 增加了原生文生图、图像编辑、序列并行以及 FP8 变体支持。
- **ROCm / AMD 后端**：  
  [#30575](https://github.com/sgl-project/sglang/pull/30575) 为 ROCm 上的 DSA 增加了纯 Triton 稀疏 MLA prefill/decode 后端。  
  [#38746](https://github.com/sgl-project/sglang/pull/38746) 在 ROCm/MI355X 上启用了 AITER ASM MLA decode 与 EAGLE 投机解码，并修复了 `dsa_backend.py` 中的 7 个 bug。
- **GLM 工具/模板支持**：  
  [#38297](https://github.com/sgl-project/sglang/pull/38297) 自动将 GLM-5.3 的 chat 模板识别为 `glm45`/`glm47` 解析器，而不是回退到有问题的 `deepseek-r1` + `glm45` 组合。
- **sgl-router DeepSeek-V4 支持**：  
  [#38742](https://github.com/sgl-project/sglang/pull/38742) 完善了 `dsv4` chat encoder 路径，并为此类非平凡 DeepSeek-V4 流量转发 `input_ids`。
- **模型跟进**：SenseNano-U1/U1.5 的支持正在 [#37742](https://github.com/sgl-project/sglang/issues/37742) 中跟踪。

---

### 性能与优化
- **快速引擎恢复——权重缓存守护进程**：  
  [#33522](https://github.com/sgl-project/sglang/issues/33522) 报告第一阶段已通过 #27139 合入：每个 rank 的守护进程持有后量化权重，并通过 CUDA IPC 提供服务。Qwen3-235B FP8 的权重加载耗时从 **约 306–327 秒降至 <1 秒**。
- **ROCm 上的 AITER ASM MLA decode**：  
  [#38746](https://github.com/sgl-project/sglang/pull/38746) 显示在 MI355X 上，seq=1 decode 时 AITER ASM MLA 持久化内核比 TileLang 快 **1.6 倍：11.6µs vs 18.57µs**。
- **GLM-5.2 NextN 草稿层带宽缩减**：  
  [#38476](https://github.com/sgl-project/sglang/pull/38476) 在 ROCm 上将 GLM-5.2 MTP 草稿层的融合 MoE 转换为按通道 FP8。bf16 专家每个占用 71.7 MB，而 MXFP4 专家仅 19.0 MB，导致该层在草稿解码期间的开销占比过高。
- **进行中的 PD/缓存相关工作**：  
  [#38634](https://github.com/sgl-project/sglang/pull/38634) 在统一 radix tree 上为混合 SWA/SSM 模型启用了 decode 侧 HiCache。  
  [#34012](https://github.com/sgl-project/sglang/pull/34012) 为统一 radix cache 新增了 agent 感知的 Tail-Optimized LRU 淘汰机制。
- **值得关注的 Blackwell decode 潜在回退**：  
  [#38628](https://github.com/sgl-project/sglang/issues/38628) 报告称独立运行 `tiny_gemm` 更快，但用它替代 `dsv3_router_gemm` 后，在 Blackwell 上会造成约 4% 的 DeepSeek-R1 NVFP4 decode 回退。

---

### 稳定性与回归
按严重程度排序：

1. **DeepSeek-V4 在 8×H20、TP=8 上 decode 挂起**：  
   [#33549](https://github.com/sgl-project/sglang/issues/33549) — decode forward 在约 245K context 处无限挂起；所有 GPU 以 100% 利用率/低功耗空转，直到 watchdog 强制终止。
2. **Kimi-K3 `tool_choice=required` 挂起**：  
   [#37430](https://github.com/sgl-project/sglang/issues/37430) — 在 2P2D、TP8/DCP8 部署中，请求会一直挂起直到触发 ReadTimeout。
3. **Kimi-K3 DSPARK + DCP decode 崩溃**：  
   [#34920](https://github.com/sgl-project/sglang/issues/34920) — 在 `dcp/planner.py` 中，首个 target-verify batch 因 `cumsum(extend_prefix_lens=None)` 而崩溃。
4. **GLM-5.2 FP4 + EAGLE 非法内存访问**：  
   [#30209](https://github.com/sgl-project/sglang/issues/30209) — `flashinfer_trtllm` bf16 批量 GEMM 在 B200/B300 TP4/TP8 上崩溃。
5. **Kimi-K3 严格工具调用语法 bug**：  
   [#38587](https://github.com/sgl-project/sglang/issues/38587) — `additionalProperties` 会削弱已编译 xgrammar schema 中具名属性的类型约束。
6. **可切分 CUDA graph 的 wrong-output/IMA 风险**：  
   [#37606](https://github.com/sgl-project/sglang/issues/37606) — prefill 可切分 CUDA graph 对 graph 切分输入保留弱引用，导致 PyTorch block 存储释放后仍可在不同 bucket 间复用，产生 wrong-output/IMA 风险。
7. **扩散模型 native 回退导致 OOM**：  
   [#34772](https://github.com/sgl-project/sglang/issues/34772) — native 组件加载回退会静默丢弃 CPU offload 决策，在 8GB GPU 上导致致命 OOM。
8. **DeepSeek-R1 NVFP4 decode 回退**：  
   [#38628](https://github.com/sgl-project/sglang/issues/38628) — 统一的 `tiny_gemm` 路径在 Blackwell 上使 decode 回退约 4%；修复不应只是简单回滚 #34693。
9. **Anthropic endpoint 的 `effort` 转发**：  
   [#36741](https://github.com/sgl-project/sglang/issues/36741) — `output_config.effort` 在未经校验的情况下被转发，导致 500 错误并使 `xhigh` 无法生效。

在本快照中，最严重的挂起/崩溃问题尚未看到任何相关联的修复 PR。

---

### 对应用开发者的影响
- **如果你在 Blackwell/SM100 上服务 Qwen3/Qwen4 MoE 变体**，即将到来的 ModelOpt 混合精度与 MoE runner 默认配置变更可能会同时影响准确性与性能。在采用新检查点之前，请关注 [#38726](https://github.com/sgl-project/sglang/pull/38726)、[#38727](https://github.com/sgl-project/sglang/pull/38727) 和 [#38728](https://github.com/sgl-project/sglang/pull/38728)。
- **如果你在 Blackwell 上服务 DeepSeek-R1 NVFP4**，[#38628](https://github.com/sgl-project/sglang/issues/38628) 中的 `tiny_gemm` 集成回退意味着升级后应重新基准测试 decode，而不是想当然地认为独立内核的实测数据能直接迁移到端到端场景。
- **Kimi-K3 的工具调用在严格生产环境中仍有风险**，直到 `tool_choice=required` 挂起与 xgrammar `additionalProperties` 问题得到解决：参见 [#37430](https://github.com/sgl-project/sglang/issues/37430) 和 [#38587](https://github.com/sgl-project/sglang/issues/38587)。
- **Kubernetes Router 用户应结合 [#38744](https://github.com/sgl-project/sglang/pull/38744) 与 [#38743](https://github.com/sgl-project/sglang/pull/38743) 验证就绪状态与 h2c 行为**；两者均改进了 Router 托管部署下的优雅停机行为与 HTTP/2 转发。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 文摘 — 2026-09-10

**动态快照：** 过去 24 小时内有 10 个发布（b10871–b10883）、59 个 issue 新开/更新、105 个 PR 有变动。Vulkan 是最活跃的领域，包括面向 Intel、Adreno 和 RDNA4 的修复与新 kernel。

---

## 1. 今日亮点

Vulkan 引入了三项值得注意的改动：针对 Intel GPU 上运行 Qwen Flash-Next 模型时出现的 `maxComputeWorkGroupCount` 断言问题提供了一个规避方案（[b10881](https://github.com/ggml-org/llama.cpp/releases/tag/b10881)）；加入通过 spec-constant 控制 MUL_MAT A 型布局的能力（[b10883](https://github.com/ggml-org/llama.cpp/releases/tag/b10883)）；以及新增一个专用 IQ4_XS mat-vec 着色器，让 RDNA4 上的解码性能提升 +6–17%（[b10871](https://github.com/ggml-org/llama.cpp/releases/tag/b10871)）。两个相互独立的 PR（[#27754](https://github.com/ggml-org/llama.cpp/pull/27754)、[#27773](https://github.com/ggml-org/llama.cpp/pull/27773)）正在竞相为 GLM-5.3-Flash/GLM-5-Next（一款 320B 级、带视觉塔的线性与稀疏注意力混合 MoE）添加支持。应用侧，在收到并行工具调用错乱的报告后，Qwen 的 XML 工具调用 grammar 也在加固中。

---

## 2. 发布与破坏性变更

24 小时内发布了 10 个构建。以下为其他章节尚未覆盖的相关项目：

- **C API / 源码级破坏性变更：** `llama_sampler_chain_n` 现在返回 `int32_t`，而不是之前的更宽整数类型（[b10878](https://github.com/ggml-org/llama.cpp/releases/tag/b10878)，属于 API 清理 [#4574](https://github.com/ggml-org/llama.cpp/issues/4574) 的一部分）。使用方应重新编译并重新检查赋值。
- **构建选项变更：** `GGML_FA_ALL_QUANTS` 由 `GGML_FA_QUANTS` 取代，用于可配置的 Flash-Attention 量化组合；未编译的量化组合现在会在运行时回退并发出警告，而不是直接失败（[b10876](https://github.com/ggml-org/llama.cpp/releases/tag/b10876)，[docs/build.md](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md)）。
- **CLI 弃用：** `--mmap`、`--mlock` 和 `--dio` 现已正式弃用（[b10875](https://github.com/ggml-org/llama.cpp/releases/tag/b10875)，[#28334](https://github.com/ggml-org/llama.cpp/pull/28334)）—请在移除前迁移启动脚本。
- **Bug 修复：** 修复 Granite3 MoE 的未知参数计数问题（[b10874](https://github.com/ggml-org/llama.cpp/releases/tag/b10874)）；修复 MTMD 视频 ID 向位图索引的传递（[b10873](https://github.com/ggml-org/llama.cpp/releases/tag/b10873)）；Jinja 现在将 `in` 的空左操作数视为普通 map 查找，与 Python/Jinja 语义一致（[b10872](https://github.com/ggml-org/llama.cpp/releases/tag/b10872)）。

---

## 3. 新模型与硬件支持

- **GLM-5-Next / GLM-5.3-Flash（321.3B/320B，线性与稀疏注意力混合 MoE，文本与视觉）：** 两个开放 PR：[#27754](https://github.com/ggml-org/llama.cpp/pull/27754) 与 [#27773](https://github.com/ggml-org/llama.cpp/pull/27773)。来自 [#27754](https://github.com/ggml-org/llama.cpp/pull/27754) 的注意事项：当前必须设置 `NVIDIA_TF32_OVERRIDE=0` 才能在 CUDA 上得到正确输出。
- **GigaChat 3.5（432B-A28B，DeepSeek-V3 风格 MLA + MoE）：** 仍在 [#25342](https://github.com/ggml-org/llama.cpp/pull/25342) 中推进。
- **新 kernel / 后端：** 新增专用 Vulkan IQ4_XS dmmv 着色器（[b10871](https://github.com/ggml-org/llama.cpp/releases/tag/b10871)）；SYCL 的 radix-select TOP_K，使 Qwen3.8-Flash-Next 的 K=2048 索引器不再卸载到 CPU（[#28670](https://github.com/ggml-org/llama.cpp/pull/28670)）。
- 针对 Qwen4-Exp 在超过 3 块 GPU 的 CUDA 配置上遇到的 “compute buffer size” 问题，仍有一个修复处于开放状态（[#27953](https://github.com/ggml-org/llama.cpp/issues/27953)）。

---

## 4. 性能与优化

- **Vulkan IQ4_XS 解码：** 专用 mat-vec 着色器在 RDNA4 上带来 **+6–17% 的 token 生成性能提升**（[b10871](https://github.com/ggml-org/llama.cpp/releases/tag/b10871)）。
- **ARM CPU（I8MM）：** 面向 batch=1 的专用 q4_K vec_dot 消除了冗余的 Y 加载和重复求和——**GFLOPS 提升 +34.3%**（[#28673](https://github.com/ggml-org/llama.cpp/pull/28673)）。
- **CUDA MoE MMQ：** matrix-tile 数量现在根据主机端列数（即通常的专家宽度）确定，避免在 RDNA3 级 HIP 目标上为路由 MoE 生成过多 tile（[b10877](https://github.com/ggml-org/llama.cpp/releases/tag/b10877)）。
- **CUDA TOP_K：** 在面向宽行的 CUB 回退路径中，radix-select 取代了完整的分段基数排序——直接瞄准 Qwen4Exp QSA 索引器的开销（[#28671](https://github.com/ggml-org/llama.cpp/pull/28671)）。
- **进行中：** Vulkan stream-k MUL_MAT（[#28528](https://github.com/ggml-org/llama.cpp/pull/28528)）；RDNA4/HIP 上针对 Q6_K/Q2_K 和 MMQ 条件的 MUL_MAT 修复（[#25940](https://github.com/ggml-org/llama.cpp/pull/25940)）；面向 gfx1201 / R9700 PRO 的 Flash Attention 调优，包含 HS=256 修复（[#28102](https://github.com/ggml-org/llama.cpp/pull/28102)）。

---

## 5. 稳定性与回归

按严重程度排序：

1. **CUDA graphs 在 Blackwell GPU（RTX 5090 Laptop / sm_120）上导致挂起**——出现 RC 看门狗和 Xid 8 事件；设置 `GGML_CUDA_DISABLE_GRAPHS=1` 可完全规避，但仍无根因修复（[#27330](https://github.com/ggml-org/llama.cpp/issues/27330)）。
2. **并发批处理下，融合 RMS-norm 中出现 CUDA `invalid configuration argument`**——Volta（sm_70）、多租户服务器工作负载（[#27911](https://github.com/ggml-org/llama.cpp/issues/27911)）。
3. **Qwen 在带约 48 个可选参数的 schema 上并行工具调用错乱/挂起**（[#28522](https://github.com/ggml-org/llama.cpp/issues/28522)）——两个 grammar PR 正在处理：强制字符串枚举（[#28668](https://github.com/ggml-org/llama.cpp/pull/28668)），以及保留 object-union schema 的备选分支（[#28651](https://github.com/ggml-org/llama.cpp/pull/28651)）。
4. **Intel Arc A770 上运行 Qwen 3.8 Flash-Next 时出现 Vulkan 工作组数量断言**（[#28247](https://github.com/ggml-org/llama.cpp/issues/28247)）——已由 [b10881](https://github.com/ggml-org/llama.cpp/releases/tag/b10881) 中的 2D FILL 分布方式**修复**。
5. **SYCL 第二次 prompt 输出乱码**（[#26845](https://github.com/ggml-org/llama.cpp/issues/26845)）——已在本窗口内关闭；请用当前构建验证。
6. **系统负载下 Metal 上的 Qwen2.5-Omni 音频损坏**——间歇性出现，在 M5 Max 上仍未解决（[#28441](https://github.com/ggml-org/llama.cpp/issues/28441)）。
7. **Adreno 830 上 Vulkan 管线创建失败**——已定位为 shaderc/NDK 对相同 GLSL 生成不同的 SPIR-V，并非 kernel 缺陷（[#28635](https://github.com/ggml-org/llama.cpp/issues/28635)）。
8. **IQ3_S 在 RTX 5060 Ti（Blackwell）上产生乱码**（[#28581](https://github.com/ggml-org/llama.cpp/issues/28581)）；**CPU 上 DSpark + MoE 在 `graph_reserve` 处崩溃**（[#28614](https://github.com/ggml-org/llama.cpp/issues/28614)）。
9. **DeepSeek V4 Flash + DSpark 的 VRAM 泄漏**——每个 prefill/generate 周期增长约 10 MB（[#27155](https://github.com/ggml-org/llama.cpp/issues/27155)）。

CI 备注：Vulkan runner 需要使用 NVIDIA r615 驱动，以修复间歇性的 coopmat1 失败（[#28659](https://github.com/ggml-org/llama.cpp/issues/28659)）。

---

## 6. 应用开发者须知

- **工具调用正确性：** 如果你通过 XML 工具 schema 提供 Qwen 模型服务，尤其涉及 enum 或 union/object 参数类型时，请使用 ≥ b10872 的构建进行测试，并跟进 [#28668](https://github.com/ggml-org/llama.cpp/pull/28668)。这种失败是静默的：空的 `{}` 调用或不在枚举中的值都会被放行。
- **尽快为命令行参数的变动做规划：** `--mmap/--mlock/--dio` 的弃用（[b10875](https://github.com/ggml-org/llama.cpp/releases/tag/b10875)）以及 `GGML_FA_ALL_QUANTS → GGML_FA_QUANTS` 重命名（[b10876](https://github.com/ggml-org/llama.cpp/releases/tag/b10876)）会影响 server wrapper 和 CI 镜像构建。FA 的改动增加了带运行时警告的回退机制，因此问题可见，但不会致命。
- **Blackwell + CUDA graphs：** 在 [#27330](https://github.com/ggml-org/llama.cpp/issues/27330) 解决之前，请继续在 RTX 50 系列笔记本上把 `GGML_CUDA_DISABLE_GRAPHS=1` 作为有文档记录的应急开关保留；watchdog/Xid 事件是硬性故障，而不只是变慢。
- **Intel Arc / iGPU Vulkan 用户**如果运行 Flash-Next 类模型，应升级到 ≥ b10881，以免触发 `maxComputeWorkGroupCount` 崩溃。
- **C-API 使用方**如果正在基于 `libllama` 重新构建，请针对 `llama_sampler_chain_n` 改为 `int32_t` 的变更重新编译（[b10878](https://github.com/ggml-org/llama.cpp/releases/tag/b10878)）；只有当你把返回值赋给不匹配的类型时，才会产生源码级破坏。
- 如果你想测试 **GLM-5.3-Flash**，请等待其中一个开放 PR（[#27754](https://github.com/ggml-org/llama.cpp/pull/27754)、[#27773](https://github.com/ggml-org/llama.cpp/pull/27773)）合并，并按文档说明设置 `NVIDIA_TF32_OVERRIDE=0`。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 文摘 — 2026-09-10

## 今日亮点

- 过去 24 小时内没有新版本发布，但项目正在处理一大批与 MLX 调度、工具调用解析、OpenAI/Anthropic 兼容性以及 GPU VRAM 统计相关的正确性和稳定性 PR。
- 新出现的影响最大的问题包括：持续负载下静默返回全零 embedding 向量（[#17878](https://github.com/ollama/ollama/issues/17878)），以及每次成功的 `/api/generate` 请求都会泄漏一个文件描述符（[#18344](https://github.com/ollama/ollama/issues/18344)）；两者目前均无关联的修复 PR。
- 当前开放的 PR 队列主要集中在让面向 agent 的 API 更可靠：在工具调用旁保留响应文本、处理大型数字工具参数、修复 Qwen3/GLM 解析器边界情况，以及在加载下一个模型前等待 MLX runner 完全退出（[#18343](https://github.com/ollama/ollama/pull/18343), [#18341](https://github.com/ollama/ollama/pull/18341), [#18340](https://github.com/ollama/ollama/pull/18340), [#18345](https://github.com/ollama/ollama/pull/18345)）。

## 版本发布与破坏性变更

无。过去 24 小时内没有发布任何 Ollama 版本或候选发布（RC）标签，本数据集中也没有包含迁移说明。

## 新模型与硬件支持

- 进行中：通过可选启用的 llama.cpp 流水线，为 Intel 独立 GPU（包括 Intel Arc B70 32GB）提供**原生 Intel SYCL/oneAPI 后端与设备发现**（[PR #18333](https://github.com/ollama/ollama/pull/18333)）。
- 开放请求：在 Ollama Cloud 上支持 100B+ 前沿（Frontier）模型，包括 Ornith、Longcat 2.0、Mimo v2.5、Olmo 3.1、Laguna xs 2.1、Hunyuan Hy3、Jamba 和 Step 3.7（[#17100](https://github.com/ollama/ollama/issues/17100)）。
- 该时段内没有发布新的可下载模型产物。

## 性能与优化

- **MLX runner 生命周期**：[PR #18345](https://github.com/ollama/ollama/pull/18345) 让调度器在加载下一个模型前先等待被 SIGKILL 的进程真正退出，避免残留内存和文件句柄与下一次加载发生冲突。
- **MLX 前缀缓存粒度**：[#18267](https://github.com/ollama/ollama/issues/18267) 报告前缀缓存恢复会被截断为 8192 个 token 的整数倍，导致 agent 工作负载中的冷提示词（cold prompt）固定产生 17–27 秒的重新预填充开销。该问题仍处于开放状态。
- **日志开销**：[PR #17913](https://github.com/ollama/ollama/pull/17913) 提议在未启用调试模式时过滤掉每次请求产生的 llama-server 日志，从而让 journald 中每条请求减少约 20 行槽位记账日志。
- **VRAM 统计**：[PR #18350](https://github.com/ollama/ollama/pull/18350) 修复了多 GPU VRAM 统计问题：调度器查找改用 llama-server 实际记录的设备名称为键，而不是发现阶段分配的名称。在可见设备过滤器导致设备被重新编号时，这一点尤为重要。

## 稳定性与回归问题

按严重程度大致排序：

1. **静默 embedding 损坏**：持续负载下，`/v1/embeddings` 和 `/api/embed` 返回 HTTP 200，但向量全为零、维度正确、token 用量看似正常，且日志无法区分成功与失败（[#17878](https://github.com/ollama/ollama/issues/17878)）。对 RAG 流水线风险很高，因为失败结果与正常输出无法区分。
2. **文件描述符泄漏**：`ollama serve` 每成功服务一个 `/api/generate` 请求，就会保留一个 FD，直到进程重启（[#18344](https://github.com/ollama/ollama/issues/18344)）。
3. **模型加载崩溃**：`gemma4:e2b` 在 WSL2 中启动失败，报错 `GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS) failed`（[#16506](https://github.com/ollama/ollama/issues/16506)）。已有 22 条评论，仍处于开放状态。
4. **量化模型产物损坏**：Qwen2.5-Coder-3B-Instruct 在 `q2_K`、`q3_K_S`、`q3_K_M` 和 `q3_K_L` 量化级别下，尽管输出看似流畅，但在功能性代码任务上得分 0/15（[#18252](https://github.com/ollama/ollama/issues/18252)）。
5. **多 GPU VRAM 统计错误**：调度器的 VRAM 映射以子进程 llama-server 的日志名称为键，但多个查找位置使用的是发现阶段的 `DeviceInfo.Name`，导致设备被过滤或重新编号时出现不一致（[#18349](https://github.com/ollama/ollama/issues/18349)）。[PR #18350](https://github.com/ollama/ollama/pull/18350) 中已有修复。
6. **AMD iGPU / Vulkan 回归**：在 Ollama >=0.32.10 上，AMD Radeon 780M 出现 `radv/amdgpu: Not enough memory for command submission` 错误（[#17748](https://github.com/ollama/ollama/issues/17748)）。一个相关的 AMD iGPU 加载 66GB 模型失败的问题已被关闭（[#18272](https://github.com/ollama/ollama/issues/18272)），但 780M 问题仍然开放。
7. **Anthropic 工具调用异常**：在工具 schema 较复杂时，`/v1/messages` 兼容端点可能会将工具调用输出为字面文本，而不是 `tool_use` 块（[#18346](https://github.com/ollama/ollama/issues/18346)）。
8. **非 Apple 硬件上的 MLX 加载器日志刷屏**：在没有 CUDA/Apple Silicon 的 Windows 上，每次执行 `ollama` 命令都会打印 `mlx_compile_cache_new_ CHECK failed`（[#18283](https://github.com/ollama/ollama/issues/18283)）。[PR #18335](https://github.com/ollama/ollama/pull/18335) 通过将缺失符号报告改为惰性方式修复了根本原因。
9. **桌面端/应用集成**：Ollama Apps 中的“Restart Claude Desktop”会静默还原，且不写入网关配置（[#18188](https://github.com/ollama/ollama/issues/18188)）；`ollama launch codex-app` 会破坏 Codex 供浏览器使用的特权原生管道桥接（[#16177](https://github.com/ollama/ollama/issues/16177)）。

工具解析器修复也已进入本时段的 PR 队列：在工具调用旁保留响应文本（[#18343](https://github.com/ollama/ollama/pull/18343)）、支持没有 `call_id` 的 Codex 独立命名函数输出（[#18348](https://github.com/ollama/ollama/pull/18348)）、保留超出 int64 范围的大型数字工具参数（[#18341](https://github.com/ollama/ollama/pull/18341)）、处理 Qwen3 带引号参数中的字面量 `</tool_call>`（[#18340](https://github.com/ollama/ollama/pull/18340)），以及避免解析器在孤立分隔符上 panic（[#17492](https://github.com/ollama/ollama/pull/17492)）。

## 对应用开发者的影响

- 如果依赖 `/v1/embeddings` 或 `/api/embed`，在 [#17878](https://github.com/ollama/ollama/issues/17878) 修复前，应将持续负载下的全零向量视为实际风险，并增加范数检查或输出校验。
- 应监控长时间运行的 `ollama serve` 进程的 FD 增长情况，并安排重启；问题 [#18344](https://github.com/ollama/ollama/issues/18344) 表明每个生成请求都会泄漏一个文件描述符，且目前尚无包含修复的发布版本。
- 基于 Ollama 的 OpenAI/Anthropic 兼容端点构建的 agent 框架，在依赖复杂工具 schema 之前，应先锁定并测试特定的 Ollama 构建版本。工具调用序列化正在积极修复中，尤其是 Codex/Claude Desktop 工作流场景。
- 多 GPU 运维人员在使用可见设备过滤器时，应将感知 VRAM 的调度指标视为可疑数据，直到 [PR #18350](https://github.com/ollama/ollama/pull/18350) 合入。
- 鉴于过去 24 小时内没有新版本发布，最稳妥的做法是针对当前滚动构建进行验证，并留意包含上述 MLX、解析器与 FD 泄漏修复的下一个标签。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-10

## 1. 今日重点

可靠性与正确性仍是今日主题：最重要的信号包括一组 Redis 后端速率限制器 bug（团队按模型限制按配置值的一半执行、虚拟键缓存预热后按客户限制静默失效、least-busy 路由器饥饿），一个将 Bedrock 请求签名移出事件循环的修复，以及 Anthropic/Responses 转换路径上的若干流式/缓存回归。性能优化持续将热点路径迁移到 Rust 核心——`/v1/messages` 的输入 token 计数是最新候选——新的故障注入测试则针对一个在 v1.100.0 中经 12 天浸泡测试仍未被发现的 Redis 故障 OOM。一个开发版 v1.102.0.dev.1 已发布，带来了 cosign 镜像签名验证。

## 2. 版本发布与破坏性变更

- **v1.102.0.dev.1** — [发布](https://github.com/BerriAI/litellm/releases/tag/v1.102.0.dev.1)。除发布基础设施外没有更多变更日志细节：所有 Docker 镜像现均使用 commit `0112e53` 引入的密钥通过 cosign 签名；发布说明包含验证指引。此窗口期内没有出现破坏性 API 或配置变更。

## 3. 新模型与硬件支持

- **CLF AI Gateway provider**（[PR #39324](https://github.com/BerriAI/litellm/pull/39324)）：新增 `clf_ai_gateway`，这是 Cloudflare Workers AI 上兼容 OpenAI 的端点，以预付套餐提供开源权重模型（GLM、Kimi、DeepSeek、Qwen），共捆绑 9 个模型。
- **gpt-6 系列识别**（[Issue #40279](https://github.com/BerriAI/litellm/issues/40279)，已关闭）：`is_model_gpt_5_model*` 系列检查无法识别 `gpt-6-astra`，导致传统的 `max_tokens` 被拒绝，而不是转换为 `max_completion_tokens`。今天已关闭，推测是通过模型系列检测更新修复。
- **Vertex AI 为 `custom_endpoint` 部署提供托管批量任务**（[PR #40469](https://github.com/BerriAI/litellm/pull/40469)）：此前自行部署的 OpenAI 兼容容器没有批量处理能力；该 PR 在部署自身 serving 容器的 batch 专用副本上运行批量任务。
- **Azure AI/Foundry 透传路由**（[PR #39863](https://github.com/BerriAI/litellm/pull/39863)）：新增透传配置，使 `/azure_ai/<router model>/<native path>` 中继能够真正到达 Foundry 部署的端点，而不会返回 500 或把 OpenAI 系列 Foundry 模型错误路由为普通 Azure OpenAI。注意：关于 `azure_ai` 非聊天路径上 Entra ID token 回退对齐的相关请求（[Issue #37727](https://github.com/BerriAI/litellm/issues/37727)）仍然开启。

## 4. 性能与优化

- **在代理认证路径上用 Rust 统计输入 token**（[PR #40381](https://github.com/BerriAI/litellm/pull/40381)）：统计一个 120K token 的 `/v1/messages` 请求目前会“占用 GIL 数秒”；排在后面的小请求本地 p50 大约恶化 10 倍。`asyncio.to_thread` 有帮助，但仍要竞争 GIL。该 PR 在认证路径上改为用 Rust 统计输入 token，这是消除这一停顿的第一步。
- **Bedrock 请求签名移出事件循环**（[PR #40270](https://github.com/BerriAI/litellm/pull/40270)）：botocore 在签名器内部用阻塞式 HTTP 调用来刷新即将过期的凭据，因此一个 Bedrock `/v1/messages`、Converse、count-tokens 或透传请求在签名于事件循环上运行时，会冻结该 worker 上的所有其他请求——包括 `/health`。此修复适用于所有异步路径。
- **Rerank 请求体去重**（[PR #40480](https://github.com/BerriAI/litellm/pull/40480)）：较大的 rerank 负载可能耗尽代理内存，因为在 provider 参数序列化期间请求上下文复制了文档负载；该 PR 将请求上下文从 provider 序列化中排除，同时保留用于日志记录/回调。
- **基于流量的自动扩缩容**（[PR #40479](https://github.com/BerriAI/litellm/pull/40479)）：Helm 和 Terraform 获得可选的每 Pod RPM/TPM `Pods` 指标，使得高 token 流量能在 CPU 饱和之前扩展网关，从而弥补了“代理会统计请求/token，但没有据此进行扩缩容”的空白。

## 5. 稳定性与回归问题

按严重程度排序。可见的进行中修复 PR 已在相应位置标注。

**速率限制与执行**

- **v3 速率限制器对团队每模型限制重复计数**（[Issue #34140](https://github.com/BerriAI/litellm/issues/34140)，开启）：通过 `POST /team/update {metadata: {model_rpm_limit}}` 设置团队-模型限制 `N` 后，约在 `N/2` 个请求时就开始返回 429。对所有使用团队级模型 RPM/TPM 的用户影响范围很广。
- **虚拟键一旦缓存，按客户 RPM 限制即停止生效**（[Issue #39713](https://github.com/BerriAI/litellm/issues/39713)，开启）：通过 `litellm_settings.max_end_user_budget_id` 应用的预算对象 `rpm_limit` 在键缓存后不会被执行——这削弱了客户层速率限制作为成本护栏的作用。
- **least-busy 路由器饥饿**（[Issue #39322](https://github.com/BerriAI/litellm/issues/39322)，开启）：响应缓存命中会使 busy 计数器变为负数，平局时总是选择第一个部署，且该计数器不在 worker 之间共享——这是对 #25323 的根因跟进，后者表现为某些部署的流量“逐渐降为零”。尚未有修复 PR。
- **Azure Redis Enterprise CROSSSLOT 错误**（[Issue #30065](https://github.com/BerriAI/litellm/issues/30065)，开启）：`_group_keys_by_hash_tag()` 仅在缓存是 OSS Redis Cluster 时才按哈希槽分组，因此非集群 Redis（包括 Azure Redis Enterprise）会跳过槽分组，并在 `parallel_request_limiter_v3.py` 中触发 CROSSSLOT 错误。
- **Redis 故障测试加固**（[PR #40482](https://github.com/BerriAI/litellm/pull/40482)、[PR #40460](https://github.com/BerriAI/litellm/pull/40460)）：两者都引用了一个 v1.100.0 中的重试面包屑 OOM（LIT-6780），该问题在重试与 Redis 超时同时发生时出现，并且逃过了 12 天浸泡测试。这些 PR 增加了故障注入 fakeredis 和“依赖不可用时继续应答”的负载测试——直接针对此类回归问题。

**流式与转换正确性**

- **工具调用后续流以 XML 而非文本输出**（[Issue #30053](https://github.com/BerriAI/litellm/issues/30053)，开启）：`async_streaming_data_generator` 中的 `fast_path` 优化（v1.87.0，PR #28289）破坏了通过 `/v1/chat/completions` 进行工具调用往返后 Bedrock 上 Claude 模型的后续流式输出。今天未出现修复 PR。
- **加密推理内容跨模型组迁移**（[Issue #40237](https://github.com/BerriAI/litellm/issues/40237)，已关闭）：当新消息被分类到不同模型组时，复杂度自动路由器后续请求会包含来自先前响应的 `reasoning.encrypted_content`。已关闭，但在今天的数据中看不到明确修复。
- **从 `user_id` 派生的 `prompt_cache_key` 永不变化**（[Issue #39145](https://github.com/BerriAI/litellm/issues/39145)，已关闭）：v1.99.0 对 #37508 的修复被认为不正确，并可能破坏 Anthropic↔OpenAI 转换路径上的提示缓存，尤其是 Claude Code。今天已关闭，没有可见修复。
- **Responses API 伪流回退丢弃 `function_call` 事件**（[Issue #21090](https://github.com/BerriAI/litellm/issues/21090)，已关闭）：对自定义模型使用 `/v1/responses` 且 `stream: true` 时，会静默降级为伪流，并丢弃 `function_call` 事件。进行中的护栏/工具调用相关工作（[PR #40271](https://github.com/BerriAI/litellm/pull/40271)、[PR #40461](https://github.com/BerriAI/litellm/pull/40461)、[PR #40462](https://github.com/BerriAI/litellm/pull/40462)、[PR #40451](https://github.com/BerriAI/litellm/pull/40451)）针对相关的流形状问题：将工具重写为缓冲流、在 Responses 调用后护栏中扫描 `custom_tool_call` 输出、在 chat-completions 网桥上回显具名 `tool_choice`、以及通过 `/v1/messages` 逐字节重放 OpenAI 加密推理内容。

**费用与预算记账**

- **非流式 Bedrock 在客户端断开时丢失费用记录**（[Issue #13245](https://github.com/BerriAI/litellm/issues/13245)，开启）：即使 Bedrock 对完整请求收费，LiteLLM 也未能记录全部费用。
- **内部用户的 `max_budget` 阻止调用零成本模型**（[Issue #29912](https://github.com/BerriAI/litellm/issues/29912)，开启）：`_PROXY_MaxBudgetLimiter` 忽略 `skip_budget_checks`，导致超出预算的内部用户无法调用免费模型。
- **Anthropic 自定义定价覆盖被绕过**（[Issue #25204](https://github.com/BerriAI/litellm/issues/25204)，已关闭）：`custom_llm_provider: "anthropic"` 搭配 `input_cost_per_token: 0`/`output_cost_per_token: 0` 会被忽略，因为费用分发在应用自定义定价之前先到达内部 Anthropic 价格表。

**平台**

- **OTEL NoneType 崩溃循环**（[Issue #30061](https://github.com/BerriAI/litellm/issues/30061)，开启）：启用 OTEL collector 回调时容器反复崩溃。
- **升级到 1.88.0 后 `/metrics` 为空**（[Issue #30079](https://github.com/BerriAI/litellm/issues/30079)，开启）：升级后 Prometheus 抓取因 307 重定向而返回空数据。
- **`default_team_settings` 中非字符串回调变量导致 500**（[PR #40458](https://github.com/BerriAI/litellm/pull/40458)，已关闭）：`turn_off_message_logging: true` 或 `langsmith_sampling_rate: 0.5` 这种自然 YAML 形式无法通过仅字符串校验；修复后接受非字符串回调变量。
- **镜像内测试失败**（[Issue #40357](https://github.com/BerriAI/litellm/issues/40357)，已关闭）：在发布的 `litellm-database` 镜像内，`test_base_aws_llm.py` 中有九个 Bedrock 测试因环境变量 `SSL_CERT_FILE` 而失败，而在普通 CI 中通过。严重程度较低，但对任何运行发布镜像的测试套件验证的人都有影响。

## 6. 对应用开发者的意义

- **当前不要将 Redis 后端速率限制视为硬性成本边界。** 今天的数据显示了过度执行（团队限制为配置值的一半，[#34140](https://github.com/BerriAI/litellm/issues/34140)）、缓存预热后执行不足（[#39713](https://github.com/BerriAI/litellm/issues/39713)），以及 least-busy 路由下亲和性/记账的失效（[#39322](https://github.com/BerriAI/litellm/issues/39322)）。如果你运营多租户网关，请添加独立的费用/用量监控，并在修复发布后固定版本。
- **Bedrock 用户应优先关注事件循环签名修复**（[PR #40270](https://github.com/BerriAI/litellm/pull/40270)）：一次缓慢的凭据刷新就可能阻塞 worker 上的所有请求，包括健康检查。如果你的流量由 Bedrock 支撑并经过 `/v1/messages` 或 Converse，这是一次可用性升级，而非微优化。
- **Claude Code / Anthropic 网桥负载正处于脆弱状态。** 请留意缓存键回归（[#39145](https://github.com/BerriAI/litellm/issues/39145)）、加密推理上下文跨路由器模型组泄漏（[#40237](https://github.com/BerriAI/litellm/issues/40237)），以及 thinking 块的字节稳定性问题。进行中的修复集——[#40451](https://github.com/BerriAI/litellm/pull/40451)、[#40271](https://github.com/BerriAI/litellm/pull/40271)、[#40461](https://github.com/BerriAI/litellm/pull/40461)——直接处理 Responses/Messages 网桥上工具调用和加密推理的护栏扫描/重写；如果你使用 Codex 风格 `custom_tool_call` 流量，这些对安全掩码真正生效很关键。
- **对于在 Bedrock/Claude chat 流式传输上运行的调用工具代理**，请注意 [#30053](https://github.com/BerriAI/litellm/issues/30053)：一次工具往返后，客户端收到的可能是 XML 而不是自然语言文本。在 fast-path 修复发布之前，请验证你的流解析器能防御性地处理这种情况。
- **高并发、大提示词部署的性能缓解将通过 Rust 核心实现**（[#40381](https://github.com/BerriAI/litellm/pull/40381)），而不是 Python 级线程。如果你目前在 token 计数上受 GIL 限制，这是值得关注的变更。
- **值得关注的社区功能请求**：Kubernetes operator/GitOps CRD（[#18428](https://github.com/BerriAI/litellm/issues/18428)）、MCP 连接故障排查（[#31318](https://github.com/BerriAI/litellm/issues/31318)）和 LDAP 组到团队同步（[#6461](https://github.com/BerriAI/litellm/issues/6461)）在愿望清单主题（[#361](https://github.com/BerriAI/litellm/issues/361)）中持续获得关注。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要 — 2026-09-10

## 今日亮点

Unsloth 发布了 **v0.1.808-beta**，这是一个大型性能与可靠性版本，扩散模型速度提升 1.2–1.7 倍，AMD 通过 Vulkan 后端相比 ROCm 性能提升约 20%，更新速度约快 2 倍。Studio 加固相关的 PR 正在推进中，目标包括幂等后台更新、离线安装、GitHub 限流韧性、Windows 无保留内存加载，以及并行聊天的共享 KV 抢占。另外新增两条回归问题：Windows 桌面应用（vLLM 采样参数被拒绝）以及 Gemma 4 图像输入导致 llama-server 崩溃。

## 发布与破坏性变更

- **v0.1.808-beta — 大幅性能提升与修复**（[releases](https://github.com/unslothai/unsloth/releases)）
  - 扩散模型工作负载提升 1.2–1.7 倍。
  - AMD：改用 Vulkan 后端后，相比 ROCm 性能提升约 20%。
  - 更新速度约快 2 倍；移除 Windows SAC/AV 误报。
  - 同时涉及 Blender MCP 支持、Hermes 模型模板检测，以及已上报至 AMD 上游的 AMD“乱码”修复。
  - 现有发布说明中未提及破坏性 API/配置变更。

## 新模型与硬件支持

- 过去 24 小时内没有新增模型架构；相关工作集中在后端/平台层面。
- **Windows on ARM / NVIDIA ARM64 CUDA 栈** — 进行中：[PR #10282](https://github.com/unslothai/unsloth/pull/10282) 让安装程序在 NVIDIA WoA 主机（GB10 / N1X、RTX Spark 型号）上使用原生 ARM64 CUDA 栈，而不是把所有 ARM64 Windows 主机都视为无 GPU。
- **Apple Silicon** 仍在路线图上（[Issue #4](https://github.com/unslothai/unsloth/issues/4)，已关闭并标记为跟踪中，644 👍）— 支持状态不变。
- AMD Vulkan 后端目前在受支持的 AMD 栈上已能提供优于 ROCm 的性能（见下文）。

## 性能与优化

- **v0.1.808-beta 内核/后端增益**（[releases](https://github.com/unslothai/unsloth/releases)）：扩散模型加速 1.2–1.7 倍；AMD Vulkan 相比 ROCm 提升 20%；Studio 更新路径快 2 倍。
- **更快/更稳定的 Studio 更新** — 多个 PR 减少冗余工作：
  - 复用已安装的 `uv`，而不是每次更新都重新下载（[PR #10659](https://github.com/unslothai/unsloth/pull/10659)）。
  - 后台 `uv` 预取，让下次桌面更新预先准备好（[PR #10653](https://github.com/unslothai/unsloth/pull/10653)）。
  - 当安装清单证明没有任何变化时，跳过依赖传递步骤（[PR #10649](https://github.com/unslothai/unsloth/pull/10649)）。
  - 通过标记文件直接回答当前 `llama.cpp`、`whisper.cpp` 和 Node 安装状态 — 每次更新在 macOS 上消除 13–63 秒的重新验证，Windows 上约 5 秒（[PR #10648](https://github.com/unslothai/unsloth/pull/10648)）。
  - 端到端测试框架，断言第二次 `studio update` 不会安装或下载任何内容（[PR #10652](https://github.com/unslothai/unsloth/pull/10652)）。
- **并行聊天的 KV 缓存共享** — 审查中：KV 抢占，使并发聊天共享一个池化缓存而不是互相挤出（[PR #10301](https://github.com/unslothai/unsloth/pull/10301)），以及在网络层面而非仅在记账层面强制执行 KV 预留（[PR #10120](https://github.com/unslothai/unsloth/pull/10120)）。

## 稳定性与回归

按严重程度排序；全部在过去 24 小时内更新。

1. **Gemma 4 图像输入导致 llama-server 崩溃，出现 `GGML_ASSERT`**（[Issue #10559](https://github.com/unslothai/unsloth/issues/10559)，打开中）— Linux 桌面应用，“默认 ubatch 过小”。目前没有修复 PR；临时办法是提高 ubatch / 在修复前避免使用图像输入。
2. **Windows 桌面 + vLLM：`min_p and logit_bias not supported`**（[Issue #10573](https://github.com/unslothai/unsloth/issues/10573)，打开中）— 在 0.1.807-beta 上报告；采样参数被 vLLM 后端路径拒绝。目前没有修复 PR；在使用 vLLM 后端的 Studio 会话中避免使用 `min_p`/`logit_bias`。
3. **Windows 无保留系统 RAM 仍然让 GGUF 内存常驻**（[Issue #9033](https://github.com/unslothai/unsloth/issues/9033)，打开中）— 修复正在审查中：[PR #10618](https://github.com/unslothai/unsloth/pull/10618) 避免 Windows 上无保留加载时产生常驻 GGUF 映射。
4. **main 分支上的安全审计 CI 通道为红色**（[Issue #10545](https://github.com/unslothai/unsloth/issues/10545)，打开中）— `pip scan-packages :: hf-stack` 报告 164 项发现；在 `unsloth-zoo` 升级后需要重新审查基线。
5. **本窗口内已关闭/验证：**
   - Kaggle 上 Qwen2 出现 `slice_indices` NameError — 已关闭，等待确认（[Issue #3450](https://github.com/unslothai/unsloth/issues/3450)）。
   - Qwen3-Coder-Next 2×A100 QLoRA OOM — 已关闭，修复进行中（[Issue #4040](https://github.com/unslothai/unsloth/issues/4040)）。
   - Intel Arc B580 导入失败（`torch.xpu.memory.mem_get_info`）— 已关闭（[Issue #3533](https://github.com/unslothai/unsloth/issues/3533)）。
   - Gemma 3n“超出最大递归深度” — 已关闭（[Issue #3650](https://github.com/unslothai/unsloth/issues/3650)）。
   - Studio 多轮冒烟测试的 CI 确定性偶发失败 — 已关闭（[Issue #10004](https://github.com/unslothai/unsloth/issues/10004)）；相关 macOS 测试修复见 [PR #10645](https://github.com/unslothai/unsloth/pull/10645)。

## 对应用开发者的意义

- **如果你在 Windows 上基于 Unsloth Studio + vLLM 构建**，暂时不要发送 `min_p` 或 `logit_bias`；请跟踪 [Issue #10573](https://github.com/unslothai/unsloth/issues/10573)。
- **共享同一个 GGUF 后端服务器的多聊天/多智能体应用**容易因池化 KV 耗尽而导致所有并发生成失败。抢占和网络层预留修复（[PR #10301](https://github.com/unslothai/unsloth/pull/10301)、[PR #10120](https://github.com/unslothai/unsloth/pull/10120)）才是真正的解决办法；在它们落地之前，请限制 `--parallel` / 每槽上下文。
- **扩散模型和 AMD 用户**：升级到 v0.1.808-beta — 扩散模型增益 1.2–1.7 倍，AMD 通过 Vulkan 提升约 20%，是本周期最亮眼的数字。
- **自动化/隔离环境 Studio 安装**：即将到来的更新路径改进（`uv` 复用、基于标记文件的验证、[PR #10651](https://github.com/unslothai/unsloth/pull/10651) 中的 `UV_OFFLINE`/PyPI 不可达处理、[PR #10670](https://github.com/unslothai/unsloth/pull/10670) 中的 GitHub 宕机韧性）将显著提高无人值守更新的可靠性。
- **系统 RAM 较紧张的 Windows 用户**：“不保留系统 RAM”路径仍然可能让整个 GGUF 常驻内存；要么保持开启保留，要么等 [PR #10618](https://github.com/unslothai/unsloth/pull/10618) 落地后应用。
- **Linux 桌面上的 Gemma 4 VLM 工作负载**：在 llama-server ubatch 崩溃修复落地之前，请暂时不要使用图像输入。

---

Rules:
- Output ONLY the translation. No preamble, no explanation, no markdown fences around the whole output.
- Preserve the Markdown structure exactly: headings, tables (including column alignment rows), lists, blockquotes, bold/italic, horizontal rules, emoji.
- Keep URLs, link targets, code spans, code blocks, numbers and dates verbatim.
- Keep project names, repository slugs, usernames, version tags, file paths and API/config identifiers in their original form — do not translate them.
- Issue/PR references like #12345 and their link text stay as-is.
- Use natural technical Chinese, the register of a Chinese developer newsletter — not a literal word-for-word rendering.

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*