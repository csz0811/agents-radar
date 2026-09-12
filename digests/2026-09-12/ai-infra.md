# AI 基础设施日报 2026-09-12

> 生成时间: 2026-09-12 00:36 UTC | 覆盖项目: 6 个

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## 横向对比

# 跨项目 AI 基础设施对比 — 2026-09-12

## 1. 生态概览

今日活动的核心是 DeepSeek-V4.1 成为服务引擎竞赛的共同目标：vLLM 正在合入一组协调好的流水线/序列并行 PR，而 SGLang 则通过单个 PR 提出对 V4.1 的完整支持，覆盖量化、HiCache、NPU 和 JIT 内核。在这个头条之下，最具影响的工作是防御性的——推测解码（DFlash2/DSpark/MTP）和工具调用解析器正在从引擎到网关再到本地运行时的每一层制造彼此独立的正确性故障。稳定性债务广泛存在：vLLM 0.28/0.29 存在未解决的主机内存冻结，Ollama 0.34.0 在约 45 分钟后于云模型上卡死，LiteLLM 仍在消化一起 PyPI 供应链事件。与此同时，硬件覆盖继续向外碎片化——ROCm/RDNA4、Blackwell SM120、NPU、ARM64 和 Apple MLX 都处于积极适配中，且今天没有任何项目发布稳定版。

## 2. 活跃度对比

| 项目 | 层级 | Issue（24h） | PR（24h） | Release（24h） | 当前渠道 / 部署风险 |
|---|---|---|---|---|---|
| **vLLM** | 服务引擎 | n/r（热帖 #27433：92 条评论） | n/r（协同的 DSv4.1 PR 集） | **0** | 0.28.0/0.29.0 主机内存冻结；**0.27.1 = 已知良好** |
| **SGLang** | 服务引擎 | n/r（coredump 跟踪 #26340：298 条评论） | n/r（#38798 DSv4.1） | **0** | 仅主线；无版本锁定信号 |
| **llama.cpp** | 本地运行时 | **76 个更新** | **120 个更新** | **8**（b10902–b10917） | 每夜构建节奏；**MSVC 用户 → b10917** |
| **Ollama** | 本地运行时 / CLI | n/r | n/r（#16590 manifest lists） | **0** | 0.34.0 云模型卡死；**0.33.1 = 回退方案** |
| **LiteLLM** | 网关 | **47 个更新** | **304 个更新** | **1 个 dev**（v1.102.0-dev.2） | Dev 预发布；需要 cosign 验证 |
| **Unsloth** | 训练 / 微调 | n/r | n/r（多 PR 修复潮） | **0** | 包 `2026.9.4` 破坏 `max_seq_length` 配置 |

*注：若干摘要不发布 issue/PR 汇总计数；“n/r”表示未报告。计数缺失时，定性规模根据跟踪帖和 PR 活动推断。*

**解读：** LiteLLM 和 llama.cpp 公布了最高的原始吞吐（304 PR / 120 PR），这与其浅层、高换手率的变更面一致。服务引擎的工作单元更小、更深——单个 vLLM PR 可以跨越 PP stage 边界，而单个 SGLang PR 可以承载整个模型家族。只有 llama.cpp 持续发版（每天 8 个构建）；其余项目处于 staged 或 dev 渠道。

## 3. 模型支持竞赛

**DeepSeek-V4.1 是决定性战场，而这场较量实质上是不同形态的平局：**

- **vLLM** 正以渐进且硬件深入的方式落地它：SP stage 边界与跨 PP 缓存/索引中继（#56438/#56439/#56437）、用于 delayed pre block 的 ROCm AITER mHC（#56503）、跨 `fp8_ds_mla`/BF16/FP8 缓存格式的仅 KV 上下文插入（#56441），以及 Engram 查找重叠门控（#56436）。其差异化在于 **ROCm 内核深度**。
- **SGLang** 通过一个综合性 PR（#38798）提出它，捆绑了文档、量化、HiCache、NPU、JIT 内核和内存池影响，并将 Hopper 上的 packed FP4 KV 单独跟踪（#38902）。其差异化在于 **单个 PR 的广度，以及对 NPU 和 FP4-KV 路线图的主导权**。

**其他项目：**

| 项目 | 今日新增支持 | 定位 |
|---|---|---|
| **vLLM** | DSv4.1 PP/SP、gfx942/950 上的 W4A16 MoE、DFlash2/DSpark 推测解码、Gemma4 MTP 修复 | **在推测解码多样性 + ROCm 上领先** |
| **SGLang** | DSv4.1（#38798）、SenseNova-U1/U1.5 LoRA、GLM-5.3-Flash SM120、AMD RDNA3/4、Qwen3-VL、Qwen-Image-Edit | **在 NPU、FP4 KV、多模态服务上领先** |
| **llama.cpp** | 面向 DeepSeek2/GLM4-MoE/Cohere2-MoE 的 MTP KV 分配、RDNA4 `gfx1201` FA、Ling 3.0 解析器、Nemotron-H guard | **广泛但局限于 GGUF 本地；GLM5.3 仍不受支持（#27922）** |
| **Ollama** | Gemma3n/Gemma3 projector 放置；Hy4 和 `deepseek-v4.1-flash` 是*请求*，不是支持 | **落后——消费上游，而非参与竞赛** |
| **LiteLLM** | 更新 218 个模型 / 新增 27 个；GitGot + Prism 提供商 | **提供商目录层，而非架构层** |
| **Unsloth** | FLUX.2 Klein、Gemma-4-12B QAT GGUF、MLX 认证 | **微调/导出覆盖范围** |

**结论：** vLLM 和 SGLang 是共同领跑者；vLLM 在内核和并行原语上胜出，SGLang 在模型家族完整性和新型硬件（NPU、FP4 KV）上胜出。llama.cpp 是吸收适合 GGUF 的*架构*变化最快的项目。Ollama 是下游消费者，其模型差距正在扩大。

## 4. 性能前沿

优化工作集中在六个集群：

1. **KV 缓存经济学——头号主题。** SGLang 拥有最多工作：面向 agentic 工作负载的分布式 KVCache（#21846）、KV-canary 工作区核算（#38596，约 1 GB 未计入的 OOM）、混合 SWA 页释放（#38159）、NVFP4 KV（#29913）。vLLM 以仅 KV 上下文插入（#56441）、DCP 有效块大小（#56538）和前缀缓存未命中修复（#52244/#56404）回应。llama.cpp 在此暴露了最糟糕的故障模式：**CUDA 上的 4-bit KV 静默回退到 CPU prefill（约 30× 减速，#28633）。**
2. **内核。** llama.cpp 将 Metal 融合整合到一个声明式表（b10909），并修复了六个 IQ `mul_mv` 内核中的空闲线程（b10908）；SGLang 通过 Triton autotune 挽回了 **10×+ 的 Mamba2 prefill 损失**（#39130）；vLLM 融合了 DFlash2 grouped conv（#55960），并将 AWQ CUDA GEMM 分析为 L1/内存绑定（#55462）。
3. **量化。** vLLM：W4A16 MoE、MXFP4、SM120 上的 FP8 MoE（当前已损坏）。SGLang：packed FP4 KV、QSA packed-varlen decode。llama.cpp：Blackwell `sm_120` 上的 IQ 乱码输出（#28784）、可选启用的 Q4_K P6/VNNI（#28791）。
4. **分布式服务。** vLLM PP/SP 边界 + 拓扑感知 EPLB（#31671）+ Elastic EP CUDA-graph 复用（#54985）。SGLang：面向 GLM-5.3 decode 的 DCP（#39117）、PD replay（#39151）、DeepGEMM MegaMoE（#38700）。
5. **批处理与调度。** vLLM 的长 prefill 饥饿（#54919）和约 2× 的结构化输出 decode 回退（#49013，已关闭/已二分定位）是其两个最大的吞吐量隐患。SGLang 的 DP 健康检查路由扰动（#35241）使长 prefill 吞吐崩溃——这是自己造成的调度创伤。
6. **内存驻留与卸载。** vLLM 的增量式 MoE expert 卸载（#38256）针对超过 VRAM 的模型；Unsloth 的 Windows GGUF 驻留修复（#10618）是本地运行时层的同一问题。

**模式：** KV 缓存内存核算现在是 OOM 和静默减速的主要来源——而且其中大部分*未被记录*。

## 5. 层级定位

| 层级 | 项目 | 所拥有的领域 | 故障影响半径 |
|---|---|---|---|
| **服务引擎（数据中心）** | vLLM、SGLang | 吞吐量、PP/SP/EP、推测解码、量化 KV、多节点 | 集群范围；静默正确性问题（ROCm GLM 91.6%→14.9%） |
| **本地 / 边缘运行时** | llama.cpp、Ollama | 单节点 GGUF、消费级 GPU、Metal/Vulkan/OpenCL | 单用户；乱码输出、CPU 回退 |
| **网关 / 控制平面** | LiteLLM | 路由、成本、认证、提供商归一化、缓存策略 | 请求级；预算和认证完整性 |
| **训练 / 微调** | Unsloth | LoRA/QLoRA、数据集预处理、量化导出、Studio | 数据集损坏、凭据泄漏、导出损坏 |

边界正在固化：vLLM 和 SGLang 在*相同*功能上竞争；Ollama 越来越多地继承 llama.cpp 的能力（manifest lists 明确正在为 llama-server 兼容性做准备），使其成为 UX/打包层，而非引擎。LiteLLM 是这里唯一主要价值单元是*元数据和策略*而非计算的项目——这就是为什么其 304 个 PR 偏向定价表和提供商注册。Unsloth 是唯一生产模型而非服务模型的层，因此其回归问题（剥离非 ASCII 字符、导出 4-bit 而非 16-bit）位于本报告中所有其他项目的上游。

## 6. 趋势信号

**1. 推测解码是新的正确性前沿。** vLLM 展示了三种独立的 DFlash2/DSpark 故障模式——K=1 时第 30 个 token 的贪心发散（#54928）、使用 xgrammar 时的确定性 FSM 停滞（#53777），以及 1M token prompt 上零前缀缓存复用（#54094）——而 llama.cpp 修复了跨三种架构的 MTP KV 分配（b10907）以及图像输入后推测损坏（b10906）。推测解码正作为吞吐默认项被部署，而它尚未成为可信的正确性默认项。**关注：** 是否有人会在 CI 中为推测解码提供确定性输出差异门禁。

**2. 工具调用是栈中最不可靠的一层——而且它会静默失败。** 每个项目都有未解决的 bug：vLLM 的 `qwen3_coder`/`qwen3_xml` 忽略 `tool_choice: "required"`（#54808），SGLang 的 DSML 解析器注入虚假的 `arguments`/`input` 键（#38924），Ollama 在解析失败时返回空 `content` 并带有 `finish_reason: "stop"`（#17274、#18390、#18357），LiteLLM 丢弃拼接 JSON 的工具参数并拒绝 Bedrock Converse 工具历史（#40582、#40735），Unsloth 的重复调用防护阻止合法重跑（#10792）。**在这个生态系统中，任何位置的 200 OK 都不意味着结果可用。** 请在客户端验证工具调用。

**3. “静默失败”现在是主要风险类别。** ROCm GLM-5.3 准确率崩塌（无报错）、4-bit KV CPU 回退（无警告）、`clean_text` 删除每个非 ASCII 字符、SGLang 忽略 `include_reasoning=false`。这些比崩溃更糟，因为它们能通过健康检查。**关注：** 项目是否会采纳可观测性诉求——响应中的 manifest 摘要（Ollama #18394）、缓存亲和性 TTL 正确性（LiteLLM #40776）、有效块大小暴露（vLLM #56538）。

**4. 约束瓶颈是内存核算，而非计算。** 启动时主机内存耗尽（vLLM #54237）、未计入的 KV 工作区（SGLang #38596）、Jetson Orin 主机 OOM（Ollama #18396）、超大 MoE 模型的主机内存卸载（vLLM #38256）。量化 KV（FP4/NVFP4）的推进速度快于使其安全的核算能力。

**5. 安全已转移到供应链和凭据路径。** LiteLLM 的 PyPI `v1.82.7`/`v1.82.8` 被入侵，外加一个未修复的 ReDoS，可导致副本崩溃循环（#32353）；Unsloth Studio API 密钥继承了服务器所有者的 Hugging Face token（#10809）。**行动：** 对 LiteLLM 镜像执行 cosign 验证，审计历史 pin 和 CI 缓存，并在 #10809 落地前将 Unsloth 多租户 Studio 视为不可信。

**6. 硬件多元化不可逆转。** ROCm/RDNA4（`gfx1201` FA、W4A16 MoE、AITER mHC）、Blackwell SM120（GLM-5.3-Flash、FP8 MoE 缺口）、NPU（SGLang DSv4.1）、仅 ARM64 CPU 和 DGX Spark（Unsloth）、Apple MLX 认证。**注意事项：** 据报道，ARM64 Unsloth Studio 镜像在 DGX Spark/GB10 上以 CPU 运行 `llama.cpp`——请验证，不要假设。

**面向应用开发者的建议：** 明确固定版本（vLLM 0.27.1、Ollama 0.33.1、llama.cpp b10917、Windows ROCm 上的 `accelerate<1.15`）；将每次工具调用都视为未经验证；在启用任何推测解码前运行确定性输出差异测试；为静默回退添加插桩，而不是信任退出码；并且，鉴于 vLLM 缓存 token 核算和 Azure AI router 跟踪存在未解决缺口，请对照提供商发票验证成本/支出日志。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-12

## 今日亮点
过去 24 小时无新版本发布。活动主要集中在 **DeepSeek-V4.1 加固**（流水线并行 stage 边界、ROCm AITER 内核、DSpark 推测解码修复）以及一组 **DFlash2 推测解码正确性 bug**。与此同时，两个高严重性回归仍未关闭——0.28.0/0.29.0 中的主机内存耗尽，以及 ROCm GLM-5.3 上的精度崩溃——而长期进行的 **batch-invariance/确定性** 工作（#27433）仍是讨论最多的问题。

## 版本发布与破坏性变更
今日无版本发布。有两个与版本相关的事项值得标出：

- **[Bug] 0.28.0 和 0.29.0 启动时耗尽所有主机内存并冻结（0.27.1 正常）** — [#54237](https://github.com/vllm-project/vllm/issues/54237) — 这是 0.27.1 到 0.28.0 之间可通过 bisect 定位的启动回归；0.28+ 用户应将其视为阻塞问题，等待修复。
- **[Bug] #53155 强制 MRV1 后，GLM-5.3 在 ROCm 上精度崩溃** — [#54924](https://github.com/vllm-project/vllm/issues/54924) — 一旦强制使用 Model Runner V1，MI350/MI355（gfx950）上的 GSM8K 从 91.6% 降至 14.9%；这实际上是对 ROCm GLM 部署的静默正确性破坏。

## 新模型与硬件支持
- **DeepSeek-V4.1 流水线/序列并行** — 一组协同 PR 增加了 SP 阶段边界、跨 PP 阶段的缓存/索引中继，以及构建时依赖校验：[#56438](https://github.com/vllm-project/vllm/pull/56438), [#56439](https://github.com/vllm-project/vllm/pull/56439), [#56437](https://github.com/vllm-project/vllm/pull/56437).
- **[ROCm][DSV4.1][Perf] 对 delayed pre block 使用 AITER mHC** — [#56503](https://github.com/vllm-project/vllm/pull/56503)（已关闭）将 DSv4.1 的 mHC block 从 eager Torch 参考实现移到可触达 AITER 的 `MHCPreOp`/`MHCPostOp` 派发层。
- **[ROCm] 在 gfx942/gfx950 上为 W4A16 MoE 显式选择 Triton** — [#56543](https://github.com/vllm-project/vllm/pull/56543)（DNM）为 AITER W4A16 MoE GEMM 固定 `backend="triton"`；gfx1250 及其他位置的自动选择不变。
- **[Rust 前端][多模态] 接受预处理后的多模态 gRPC 特征** — [#55047](https://github.com/vllm-project/vllm/pull/55047) 将类型化多模态传输格式扩展到 Rust gRPC 前端。
- **[前端] 为 DCP 暴露有效 attention block size** — [#56538](https://github.com/vllm-project/vllm/pull/56538) 添加了 `CacheConfig.effective_attention_block_size`，以便当 16-token 物理块跨 rank 表示 64 个 token 时，客户端可以解释缓存事件。
- **[RFC] 来自 omni-infer 的拓扑感知 EPLB 放置** — [#31671](https://github.com/vllm-project/vllm/issues/31671) 提议将拓扑感知的专家放置/执行集成到 vLLM EPLB 中。
- **MOE oracle / 线性 kernel 迁移** — [#54959](https://github.com/vllm-project/vllm/issues/54959) 跟踪尚未迁移到 oracle 的剩余 `LinearMethodBase` / `FusedMoEMethodBase` 子类。**`CustomOp` 清理**（[#19817](https://github.com/vllm-project/vllm/issues/19817)）仍对 Blackwell/AMD 编译配置默认值保持开启。

## 性能与优化
- **Batch-invariant 特性与性能优化** — [#27433](https://github.com/vllm-project/vllm/issues/27433)（92 条评论，20 👍）继续跟踪基于 Thinking Machines batch-invariance 方法的剩余非确定性工作。
- **增量式 MoE 专家卸载——GPU 缓存 + 异步流水线** — [#38256](https://github.com/vllm-project/vllm/issues/38256)（14 条评论）。专家权重放在 CPU 锁页内存中，固定大小 GPU 缓存采用 LFRU 淘汰和跨层预测；PR [#37190](https://github.com/vllm-project/vllm/pull/37190) 处于开启状态。
- **[Perf] 融合 DFlash2 分组卷积** — [#55960](https://github.com/vllm-project/vllm/pull/55960) 将分组动态卷积融合为单个 Triton op，使用行对齐 tile（1024 elems/≥128 rows，否则 512）。
- **[Perf][DSpark] 跨 V4.1 缓存格式的仅 KV 上下文插入** — [#56441](https://github.com/vllm-project/vllm/pull/56441) 消除了 `fp8_ds_mla`、BF16 和 FP8 e4m3fn 缓存中未使用的 query 分配/工作。
- **[Perf][Engram] 将 DeepSeek-V4.1 查找重叠限制在已配置工作负载内** — [#56436](https://github.com/vllm-project/vllm/pull/56436) 通过显式工作负载限制，使重叠保持实验性/默认关闭。
- **[Elastic EP] 跨重配置复用 CUDA graph** — [#54985](https://github.com/vllm-project/vllm/pull/54985) 从服务路径中移除 CUDA graph 预热阻塞。
- **结构化输出（xgrammar）约 2 倍 decode 回归** — [#49013](https://github.com/vllm-project/vllm/issues/49013)（已关闭）二分定位到 #45424 中的提交 `7df3d7d`（`apply_grammar_bitmask` staging 重写），影响 v0.23.0 → v0.24.0/v0.25.1。
- **AWQ CUDA GEMM kernel 受 L1/内存限制** — [#55462](https://github.com/vllm-project/vllm/issues/55462)，在 RTX 3070 Ti 上对 `gemm_forward_4bit_cuda_m16nXk32` 进行 `ncu` profiling。
- **[RFC] DeepSeek-V4.1-Flash 在 ROCm 上的性能** — [#56506](https://github.com/vllm-project/vllm/issues/56506)；8× MI355X、TP4、MXFP4 MoE + DSpark MTP 报告在并发 1 时达到 35.89 out tok/s（8.97/GPU），TTFT p50 0.898s。
- **长 prefill 饥饿** — [#54919](https://github.com/vllm-project/vllm/issues/54919)：在 2 节点 DGX Spark TP2 上，Qwen3.8-Flash-Next prefill 会周期性地让活跃 decode 饥饿 3–7 分钟。
- **`MLARoPEKVCacheCatFusionPass` 移植到手动融合** — [#43504](https://github.com/vllm-project/vllm/issues/43504)。
- **[Tools][Recipes] 分阶段 runtime sweep 调优** — [#56340](https://github.com/vllm-project/vllm/pull/56340) 增加了 `TP/DP -> max_concurrency -> scheduler` 调优顺序以及准确性/可靠性改进。

## 稳定性与回归
按严重程度排序：

1. **0.28.0–0.29.0 上的主机内存耗尽/启动冻结** — [#54237](https://github.com/vllm-project/vllm/issues/54237)。未发现修复 PR；0.27.1 是已知可用的回退版本。
2. **ROCm GLM-5.3 精度崩溃（GSM8K 91.6% → 14.9%）** — [#54924](https://github.com/vllm-project/vllm/issues/54924)，二分定位到 #53155 强制 MRV1。ROCm 下出现静默正确性故障。
3. **H20 上高并发下 DeepSeek-V4.1-Flash `dsv4_topk` 非法内存访问** — [#56389](https://github.com/vllm-project/vllm/issues/56389)；通过将 `max_num_seqs=256` 设上限来缓解。
4. **DeepSeek-V4.1-Flash + DSpark 在 draft 预热时触发 device-side assert（H200、SM90、Marlin MXFP4 MoE）** — [#56443](https://github.com/vllm-project/vllm/issues/56443)，在 `map_draft_to_target` 中失败。
5. **SM120（RTX PRO 6000 Blackwell）上的 FP8 MoE 崩溃** — [#45101](https://github.com/vllm-project/vllm/issues/45101)：Triton `fused_moe` 断言 "Unsupported lhs dtype fp8e4nv"，且 `VLLM_MOE_FORCE_MARLIN=1` 未被遵循。
6. **DFlash2 推测解码正确性** — 贪婪解码 Qwen3.8 输出即使在 K=1 且使用 `--enforce-eager` 时也在 token 30 处发散（[#54928](https://github.com/vllm-project/vllm/issues/54928)）；使用 xgrammar `json_object` 时确定性地出现 "Failed to advance FSM"（[#53777](https://github.com/vllm-project/vllm/issues/53777)）；在 YaRN 下，相同的 1.04M-token prompt 前缀缓存复用为零（[#54094](https://github.com/vllm-project/vllm/issues/54094)）。
7. **工具调用解析器缺口** — `qwen3_coder`/`qwen3_xml` 在 `/v1/chat/completions` 上静默忽略 `tool_choice: "required"` 和具名函数（[#54808](https://github.com/vllm-project/vllm/issues/54808)）。针对 Gemma4 裸 `call:` 和无空白 channel 转换的修复 PR：[#54257](https://github.com/vllm-project/vllm/pull/54257)。
8. **混合 GDN / MTP 前缀缓存未命中** — [#53504](https://github.com/vllm-project/vllm/issues/53504)（已关闭），修复 PR [#52244](https://github.com/vllm-project/vllm/pull/52244) 恢复了 MTP 下的 GDN 前缀缓存命中；相关 CPU-offload 哈希修复见 [#56404](https://github.com/vllm-project/vllm/pull/56404)（修复 #56396）。
9. **其他基础设施/配置** — Ray 2.55.1 在 EngineCore 初始化时出现 `ActorHandleNotFoundError`，而 CI 固定使用 2.48.0（[#45318](https://github.com/vllm-project/vllm/issues/45318)）；Tesla T4 Triton 共享内存 OOM（[#36802](https://github.com/vllm-project/vllm/issues/36802)）；使用 `--mm-encoder-tp-mode data` 时 sleep 模式 HBM 泄漏（[#47654](https://github.com/vllm-project/vllm/issues/47654)，已关闭）；`EmbedsInput` 中 `prompt_token_ids` 被丢弃（[#42303](https://github.com/vllm-project/vllm/issues/42303)，已关闭）。
10. **值得关注的开放修复 PR** — Gemma4 MTP 缺失 KV-scale 校验导致崩溃（[#56539](https://github.com/vllm-project/vllm/pull/56539)）；中止请求指标未记录（[#55940](https://github.com/vllm-project/vllm/pull/55940)）；TorchCodec 视频解码错误以 HTTP 500 而非 400 返回（[#52759](https://github.com/vllm-project/vllm/pull/52759)）；DSv4.1 microbatch position/Engram history 修复（[#56440](https://github.com/vllm-project/vllm/pull/56440)）。

## 这对应用开发者意味着什么
- **固定版本，并明确回退方案。** 0.28.0/0.29.0 存在未解决的主机内存冻结问题，因此在 #54237 落地前，应将 0.27.1 视为安全默认版本。ROCm + GLM-5.3 用户应完全避开强制 MRV1 的变更。
- **推测解码需要按模型/后端进行验证。** DFlash2 和 DSpark 表现出多个独立的故障模式——贪婪解码时输出发散、grammar FSM 停滞、前缀缓存未命中。如果依赖它们，请在部署前运行确定性输出 diff 和结构化输出回归测试，并谨慎使用 K>1。
- **结构化输出性能是已知弱项。** #45424 带来的约 2 倍 guided-JSON decode 回归是语法约束 agent 的主要吞吐量隐患；如果 JSON 吞吐量是你的瓶颈，请为此预留容量，或固定到 0.24 之前的版本。
- **工具调用客户端不应信任 Qwen3 coder/xml 解析器对 `tool_choice` 的强制执行**（#54808）。请验证所需函数是否确实被调用，而不是假设服务器已强制执行，并关注 Gemma4 解析器修复中的类似边界情况。
- **Blackwell 和 H20 上的容量规划需要留有余量。** 在没有规避方案的情况下，SM120 上的 FP8 MoE 在 Triton 路径中不可用，而 H20 上的 DeepSeek-V4.1 需要 `max_num_seqs<=256` 以避免非法内存访问——请将这些编码为部署限制，而不是在负载时才发现。
- **如果你在受限 VRAM 上服务大型专家模型，MoE 卸载值得关注**：#38256 旨在通过 GPU 驻留热专家缓存和异步流水线，让超出 GPU 内存的模型在更小硬件上运行。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang 摘要 — 2026-09-12

### 今日亮点
DeepSeek V4.1 支持现已在 [PR #38798](https://github.com/sgl-project/sglang/pull/38798) 中提出，将一个新的重要模型系列引入 SGLang，并带来量化、HiCache、NPU 和 JIT-kernel 方面的影响。面向 agentic 工作负载的高优先级分布式 KVCache 路线图（[Issue #21846](https://github.com/sgl-project/sglang/issues/21846)）仍在积极推进，同时还有一波 session/多模态位置修复，以及一个重要的 Mamba2 kernel autotune PR，恢复了 10 倍以上的 prefill 性能。持续的 CUDA coredump 与 CI 不稳定追踪仍主导着仓库活动。

### 发布与破坏性变更
过去 24 小时内无。

### 新模型与硬件支持
- **DeepSeek V4.1**：[PR #38798](https://github.com/sgl-project/sglang/pull/38798) 增加了完整模型支持（文档、量化、HiCache、NPU、JIT-kernel、内存池）。DeepSeek-V4.1 在 Hopper 上的 packed FP4 KV 也在 [Issue #38902](https://github.com/sgl-project/sglang/issues/38902) 中追踪。
- **SenseNova-U1 / U1.5**：功能与性能追踪见 [Issue #37742](https://github.com/sgl-project/sglang/issues/37742)；官方 8-step 蒸馏 LoRA 支持已在 [PR #38930](https://github.com/sgl-project/sglang/pull/38930) 中提出。
- **AMD 消费级 Radeon (RDNA3/RDNA4)**：官方支持追踪与启用计划见 [Issue #30599](https://github.com/sgl-project/sglang/issues/30599)。ROCm QSA packed-varlen decode 在 HIP 上已交由 aiter 处理，见 [PR #38909](https://github.com/sgl-project/sglang/pull/38909)，修复了 Qwen3.8-Flash-Next-FP8 decode 崩溃。
- **SM120 上的 GLM-5.3-Flash**：所需修复与发布资格验证见 [Issue #37813](https://github.com/sgl-project/sglang/issues/37813)。
- **FP4 KV 路线图**：SM120/B200 上的 NVFP4 KV 进展记录在 [Issue #29913](https://github.com/sgl-project/sglang/issues/29913)。

### 性能与优化
- **Mamba2 SSD Triton kernels**：[PR #39130](https://github.com/sgl-project/sglang/pull/39130) 添加了 `@triton.autotune`，修复了由默认 `BLOCK_SIZE_* = 16` 导致的静默 10 倍以上 prefill-kernel 性能损失。
- **H100 上的 Qwen3-VL 服务**：[PR #36411](https://github.com/sgl-project/sglang/pull/36411) 优化了 unique-image one-pass streaming，减少浪费的预处理/embedding 内存。
- **Hopper 上的 Qwen-Image-Edit attention**：[PR #38584](https://github.com/sgl-project/sglang/pull/38584) 复用 QKV epilogues 并打包 vision windows，减少重复的 QK norm/RoPE 以及每层 96 次独立的 SDPA 调用。
- **GLM-5.3-Flash decode 上下文并行**：[PR #39117](https://github.com/sgl-project/sglang/pull/39117) 恢复 DCP，并修复 NoPE attention 和稀疏读取的虚拟 KV 寻址。
- **MiniLB / PD replay**：[PR #39151](https://github.com/sgl-project/sglang/pull/39151) 在 `/generate` 响应中保留 prefill replay 行。
- **DeepGEMM MegaMoE**：[Issue #38700](https://github.com/sgl-project/sglang/issues/38700) 追踪 DSV4 中 shared-to-sparse experts 的融合。
- **内存 / OOM 修复**：KV-canary workspace 核算已在 [PR #38596](https://github.com/sgl-project/sglang/pull/38596) 中修复（防止接近 1 GB 的未核算 workspace OOM）；hybrid SWA 页面释放已在 [PR #38159](https://github.com/sgl-project/sglang/pull/38159) 中修复。

### 稳定性与回归
按严重程度排序：

1. **CUDA coredump 追踪器** — [Issue #26340](https://github.com/sgl-project/sglang/issues/26340)（298 条评论）：从 CI 自动收集的 CUDA coredump，仍在进行中。
2. **CI 测试失败** — [Issue #17050](https://github.com/sgl-project/sglang/issues/17050)：1 个 broken，10 个 flaky，991 个最近已修复（截至 2026-09-11）。
3. **GLM-5.3 崩溃** — [Issue #39072](https://github.com/sgl-project/sglang/issues/39072)：在 disagg decode + DP attention + speculative decode 时崩溃。
4. **Flash-attn sm_89 cubin 缺失** — [Issue #38980](https://github.com/sgl-project/sglang/issues/38980)：`is_fa3_supported()` 接受 sm_89，但未附带 sm_89 cubin；结果是原始 CUDA 错误，而不是干净的拒绝。
5. **Encoder-decoder KV cache double-free** — [Issue #38840](https://github.com/sgl-project/sglang/issues/38840)：当 `page_size > 1` 时，共享边界页被双重释放。
6. **DeepSeek V4/V3.2 DSML tool-call parser** — [Issue #38924](https://github.com/sgl-project/sglang/issues/38924)：虚假的顶层 `"arguments"` / `"input"` 键包裹了工具调用参数。
7. **`include_reasoning=false` 被忽略** — [Issue #39103](https://github.com/sgl-project/sglang/issues/39103)：responses、chat completions 和 completions 中仍会输出 reasoning。
8. **DP 路由扰动** — [Issue #35241](https://github.com/sgl-project/sglang/issues/35241)：generation 健康检查会扰动 DP 用户路由状态，并使长 prefill 吞吐崩塌。
9. **Session / 多模态崩溃** — 已在 [PR #39145](https://github.com/sgl-project/sglang/pull/39145)、[PR #39144](https://github.com/sgl-project/sglang/pull/39144)、[PR #39038](https://github.com/sgl-project/sglang/pull/39038)、[PR #39146](https://github.com/sgl-project/sglang/pull/39146) 中修复：图像/文本位置不匹配、空 continuation，以及 PD session 连接字段问题。
10. **已关闭的较低严重度事项** — PD disaggregation handoff token（[Issue #32897](https://github.com/sgl-project/sglang/issues/32897)）、H20 Qwen3.8-Flash-Next-FP8 启动（[Issue #38793](https://github.com/sgl-project/sglang/issues/38793)）、`stop_regex` 缓冲区边界（[Issue #30932](https://github.com/sgl-project/sglang/issues/30932)）、tokenizer deleted state（[Issue #15486](https://github.com/sgl-project/sglang/issues/15486)）。

### 这对应用开发者意味着什么
- **DeepSeek V4.1 即将到来**：请为新模型 ID、FP4 KV 内存配置文件和 MoE 路由变更做好规划。如果你依赖 DeepSeek V3.x，请关注即将发布的版本中的 parser 修复和向后兼容性说明。
- **Agentic 与多轮应用**：分布式 KVCache 路线图（[Issue #21846](https://github.com/sgl-project/sglang/issues/21846)）和轻量级 SessionAware router（[Issue #25760](https://github.com/sgl-project/sglang/issues/25760)）是减少 KV 传输瓶颈、提升跨 agent 会话前缀复用的关键工作流。
- **多模态/session API 正在趋于稳定**：如果你使用图像 + 文本 session，请固定一个已知可用版本，或测试最近的 PR——围绕图像位置和 session continuation 的若干崩溃正在被积极修复。
- **性能**：Mamba2 prefill 获得了大幅 autotune 收益；Qwen3-VL、Qwen-Image-Edit 和 GLM-5.3 decode 路径正在优化。预计 H100/Hopper 和 Blackwell SM120 上会有更好的吞吐。
- **生产环境注意事项**：`include_reasoning=false` bug、DSML tool-call parser 虚假键，以及 DP 健康检查吞吐崩塌是真实影响用户的问题。请验证你的 reasoning 和 tool-call 输出，并在延迟敏感的 DP 路由中避免激进的 generation 健康检查，直到问题修复。
- **硬件扩展**：AMD RDNA3/RDNA4 消费级 GPU 和 SM120 Blackwell 正逐步走向受支持状态；ROCm QSA decode 已经修复。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-12

来源：[github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) · 时间窗口：过去 24 小时 · 8 个发布版本，76 个 issue 更新，120 个 PR 更新（仅显示前 20 个）

---

## 1. 今日亮点

过去 24 小时以后端加固为主：Metal 将所有融合模式整合到一张表中，并修复了其余 IQ `mul_mv` kernel 的空闲线程利用率不足问题；HIP/CUDA Flash Attention 则针对 RDNA4（`gfx1201`）进行了新一轮调优。一批正确性修复落地，涉及 DeepSeek2/GLM4-MoE/Cohere2-MoE 的多 token 预测（MTP）KV cache 分配，以及图像输入后的服务端推测。风险方面，有两个未决项值得关注：Blackwell（`sm_120`）上 IQ1_S/IQ2_S/IQ3_S 量化 kernel 的输出乱码，以及 b10780 之后 Vulkan/RDNA3 上严重的 prompt 处理性能下降。

---

## 2. 发布与破坏性变更

本时间窗口内没有 API 或配置方面的破坏性变更。

- **[b10917](https://github.com/ggml-org/llama.cpp/releases/tag/b10917)** — `cmake`：使用 MSVC 构建时，跳过 `llama-server` 的 PCH。这是对 [#28091](https://github.com/ggml-org/llama.cpp/pull/28091)（“cmake: add PCH and unity build”）的回归修复；该变更曾导致 MSVC 链接失败，报 `LNK2001 unresolved external "__"`（[#28758](https://github.com/ggml-org/llama.cpp/issues/28758)，已关闭）。**Windows/MSVC 构建者应立即升级到 b10917。**
- **[b10909](https://github.com/ggml-org/llama.cpp/releases/tag/b10909)** — Metal：将融合模式重构为一张声明式表（`ggml-metal-fuse.cpp`），由图优化器和融合调试工具共同使用。
- **[b10908](https://github.com/ggml-org/llama.cpp/releases/tag/b10908)** — Metal：将 [#28086](https://github.com/ggml-org/llama.cpp/pull/28086) 中的行拆分修复推广到其余六个 IQ `mul_mv` kernel（`iq1_s`、`iq1_m`、……），适用于 `ne00 < 1024`。
- **[b10907](https://github.com/ggml-org/llama.cpp/releases/tag/b10907)** — `model`：修复 `deepseek2`、`glm4moe`、`cohere2moe` 的 MTP 上下文 KV cache 分配；新增反向架构门控以及针对 MTP 层过滤的架构测试。
- **[b10906](https://github.com/ggml-org/llama.cpp/releases/tag/b10906)** — `server`：修复图像之后的推测（向 drafter 传递实际位置，而不是 token 数量；影响所有 drafter，而不只是 DFlash）。`draft n_past` 重命名为 `pos0`。
- **[b10905](https://github.com/ggml-org/llama.cpp/releases/tag/b10905)** — CUDA/HIP：针对 `gfx1201` 的 Flash Attention 调优（见“性能”部分）。
- **[b10903](https://github.com/ggml-org/llama.cpp/releases/tag/b10903)** — Vulkan：修复 `argsort(large)` 中的数据竞争和越界访问（[#28705](https://github.com/ggml-org/llama.cpp/pull/28705)）。
- **[b10902](https://github.com/ggml-org/llama.cpp/releases/tag/b10902)** — OpenCL：新增 A8 × Q4_0 `mm` binary kernel 支持（[#28268](https://github.com/ggml-org/llama.cpp/pull/28268)）。

---

## 3. 新模型与硬件支持

- **OpenCL A8/Q4_0 矩阵乘法 binary kernel** — [b10902](https://github.com/ggml-org/llama.cpp/releases/tag/b10902) / [#28268](https://github.com/ggml-org/llama.cpp/pull/28268)：扩展了 OpenCL 后端的量化计算覆盖范围。
- **MTP 架构：DeepSeek2、GLM4-MoE、Cohere2-MoE** — [b10907](https://github.com/ggml-org/llama.cpp/releases/tag/b10907)：修正 MTP KV cache 分配，并加入按架构门控的层过滤和扩展测试。
- **AMD RDNA4（`gfx1201`）HIP Flash Attention** — [b10905](https://github.com/ggml-org/llama.cpp/releases/tag/b10905)：为 head size 256 启用 MMA FA；在 AMD WMMA 上优先使用 whole-tile FA grids，而不是 stream-k。
- **AMD GCN MMQ 配置** — [#27841](https://github.com/ggml-org/llama.cpp/pull/27841)（开放）：按架构设置 MMQ 配置，以正确处理 wave64（nthreads 512），而不是回退到 RDNA2 的 wave32/256 配置。
- **Intel Vulkan FA tiles** — [#28780](https://github.com/ggml-org/llama.cpp/pull/28780)（已关闭）：在 Intel 上将 coopmat2 FA `Br` 限制为 32 行，以避免 HSK=HSV=128 时发生寄存器溢出。
- **WebGPU / Dawn 更新** — [#28683](https://github.com/ggml-org/llama.cpp/pull/28683)（开放）：迁移到较新的 Dawn 版本，这是 `wasi:webgpu` 所需要的。
- **Nemotron-H MTP 防护** — [#28779](https://github.com/ggml-org/llama.cpp/pull/28779)（开放）：避免 NextN/MTP 层的 `expert_feed_forward_length` / `expert_used_count` 为零时出现 SIGFPE。
- **Chat template 解析** — [#28682](https://github.com/ggml-org/llama.cpp/pull/28682)（开放）：新增专用的 Ling 3.0（Bailing V3）解析器；修复在 `</think>` 之前发出的工具调用被吞入 `reasoning_content` 的问题。
- **已请求，尚未支持** — GLM5.3（flash）跟踪 issue [#27922](https://github.com/ggml-org/llama.cpp/issues/27922)（15 👍）。

---

## 4. 性能与优化

- **Metal 融合表整合** — [b10909](https://github.com/ggml-org/llama.cpp/releases/tag/b10909) / [#28164](https://github.com/ggml-org/llama.cpp/pull/28164)：为可融合算子模式提供单一事实来源，减少优化器/调试之间的分歧，并降低新增融合模式的成本。
- **Metal IQ `mul_mv` 空闲线程修复** — [b10908](https://github.com/ggml-org/llama.cpp/releases/tag/b10908) / [#28692](https://github.com/ggml-org/llama.cpp/pull/28692)：针对 `ne00 < 1024` 将行拆分推广到其余六个 kernel；提升较小 K 的量化矩阵向量乘法的占用率。
- **HIP `gfx1201` FA 调优** — [b10905](https://github.com/ggml-org/llama.cpp/releases/tag/b10905) / [#28102](https://github.com/ggml-org/llama.cpp/pull/28102)：在 RDNA4 上支持 head-size-256 MMA FA，并修订 stream-k 逻辑。
- **CPU：对无 CPU 工作的计算图跳过 threadpool** — [#28785](https://github.com/ggml-org/llama.cpp/pull/28785)（开放）：对于仅含 view/NOP 的计算图（在完全 GPU offload 时很常见），避免创建/唤醒 worker；同时让调用方的优先级/亲和性与活动池保持同步。
- **CPU：可选启用 Q4_K P6 和 VNNI kernel** — [#28791](https://github.com/ggml-org/llama.cpp/pull/28791)（已关闭）：实验性布局，通过构建时 + 运行时开关启用，并带有合成正确性检查。
- **SYCL 计算图录制/回放** — [#28725](https://github.com/ggml-org/llama.cpp/pull/28725)（开放）：将 CUDA 计算图路径移植到 SYCL（录制前需要一次 reorder pass；async alloc 扩展在捕获期间会挂起）。
- **CUDA：为 buffer-init padding memset 使用每线程 stream** — [#28782](https://github.com/ggml-org/llama.cpp/pull/28782)（开放）：将 legacy-stream 的 `cudaMemset` 替换为 `cudaMemsetAsync` + sync，以避免与并行 HIP 计算图捕获发生冲突。
- **RPC：仅对权重做 hash 缓存** — [#28789](https://github.com/ggml-org/llama.cpp/pull/28789)（开放）：不再对超过 10 MB 阈值的激活做哈希，并拒绝部分缓存条目，从而提升多节点拆分性能。

---

## 5. 稳定性与回归

按严重程度排序（正确性/静默失败优先）：

1. **CUDA Blackwell（`sm_120`）IQ1_S / IQ2_S / IQ3_S 输出乱码** — [#28784](https://github.com/ggml-org/llama.cpp/pull/28784)（开放，已有修复 PR）。从打包的 32 位量化字中提取字节时，nvcc 13.2 在 `sm_120` 上会错误编译；普通字节掩码被丢弃。影响在 Blackwell 上运行 IQ 量化的用户。
2. **CUDA 上 4-bit KV cache 静默回退到 CPU** — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633)（开放）。在默认标志下，`ggml_cuda_fattn_kv_type_supported` 只接受某些 KV 类型，因此 q4_0/q4_1 KV 会在无警告的情况下静默将 prefill 丢给 CPU（约慢 30×）。建议修复方案是将 `GGML_CUDA_FA_ALL_QUANTS=ON` 设为默认值。
3. **b10780 之后 Vulkan/RDNA3 prompt 处理回归** — [#28752](https://github.com/ggml-org/llama.cpp/issues/28752)（开放，3 条评论）。在层位于 `Vulkan0` 时出现严重的 prompt 处理性能下降。尚未确定修复 PR。
4. **Vulkan argsort 数据竞争 + OOB** — [b10903](https://github.com/ggml-org/llama.cpp/releases/tag/b10903) / [#28705](https://github.com/ggml-org/llama.cpp/pull/28705)（已修复）。VVL 在内层循环中捕获到竞争；`argsort_large` 中的 OOB 是 CI 失败的疑似原因。
5. **图像输入后服务端推测失效** — [b10906](https://github.com/ggml-org/llama.cpp/releases/tag/b10906) / [#28715](https://github.com/ggml-org/llama.cpp/pull/28715)（已修复）。Drafter 接收到的是 token 数量，而不是实际位置；影响了所有 drafter。
6. **DeepSeek2 / GLM4-MoE / Cohere2-MoE 的 MTP KV cache 分配错误** — [b10907](https://github.com/ggml-org/llama.cpp/releases/tag/b10907) / [#28630](https://github.com/ggml-org/llama.cpp/pull/28630)（已修复）。
7. **`ggml_sycl_pool_vmm::free` 中的 SYCL 崩溃** — [#28660](https://github.com/ggml-org/llama.cpp/issues/28660)（开放）。oneDNN scratchpad 破坏了 LIFO 池顺序；影响 Intel Arc Pro B70。
8. **OpenVINO 后端 `STATUS_ILLEGAL_INSTRUCTION`（AVX-512）** — [#28726](https://github.com/ggml-org/llama.cpp/issues/28726)（开放，新）。在 Core Ultra 7 265K 上使用 b10901 OpenVINO Windows 构建可复现。
9. **ngram-cache 推测缓存在请求间泄漏** — [#27852](https://github.com/ggml-org/llama.cpp/issues/27852)（开放）。由于 `begin()` 是 no-op，每个 slot 的上下文缓存会持续存在；接受率从 86% 降至 11%，比不做推测还慢。
10. **PCH/unity 构建后的 MSVC 链接失败** — [#28758](https://github.com/ggml-org/llama.cpp/issues/28758)（已关闭，由 b10917 修复）。
11. **使用 `BUILD_SHARED_LIBS=OFF` 的 macOS 静态构建链接失败** — [#28491](https://github.com/ggml-org/llama.cpp/issues/28491)（开放）。`ggml-rpc` 静态归档从未被链接，导致 `librdma` 符号未定义。
12. **Intel Arc 140V（Windows）上的 Vulkan 输出乱码** — [#28648](https://github.com/ggml-org/llama.cpp/issues/28648)（开放）。与 batch 设置有关；在 Intel B70 MoE 崩溃中也见到过（[#23769](https://github.com/ggml-org/llama.cpp/issues/23769)）。

---

## 6. 这对应用开发者意味着什么

- **升级建议：** 如果你在 Windows/MSVC 上构建 llama.cpp，请立即升级到 **b10917**——PCH 回归会破坏 `llama-server` 链接。如果你运行 MTP 模型（DeepSeek2 / GLM4-MoE / Cohere2-MoE）或使用图像进行推测解码，**b10906/b10907** 包含你需要的修复。
- **避免静默性能悬崖：** CUDA 上的 4-bit KV cache 用户应验证 FA kernel 选择（[#28633](https://github.com/ggml-org/llama.cpp/issues/28633)）——故障模式是 prefill 约慢 30×，且日志中无警告。同样，Vulkan/RDNA3 用户应固定使用低于 b10780 的版本，直到 [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) 解决。
- **OpenAI 兼容性缺口正在被填补：** `response_format: json_schema` 目前只认嵌套的 `json_schema.schema` 形式，并会静默丢弃直接传入的 schema——修复见 [#28697](https://github.com/ggml-org/llama.cpp/pull/28697)。Schema 处理也正在 [#28736](https://github.com/ggml-org/llama.cpp/pull/28736) 中重构为合适的内部表示，这应能减少未来语法生成的边缘情况。
- **服务端易用性改进正在进行中：** `llama-server` 的 `-sysf` 从文件读取 system prompt（[#28053](https://github.com/ggml-org/llama.cpp/pull/28053)）、路由模式下每个已加载模型支持多个预设（[#23704](https://github.com/ggml-org/llama.cpp/issues/23704)，17 条评论），以及基于磁盘的上下文 checkpoint 卸载 `--cache-disk`（[#20697](https://github.com/ggml-org/llama.cpp/issues/20697)，48 👍）仍然是需求最高的运维功能。
- **起草质量可能显著提升：** [#27694](https://github.com/ggml-org/llama.cpp/pull/27694) 提议让 drafter 概率化，并让 target 通过拒绝采样对 simple-draft 和 MTP 路径进行验证——如果你会调优推测接受率，值得跟踪。
- **全 GPU offload 部署的低成本收益：** [#28785](https://github.com/ggml-org/llama.cpp/pull/28785) 在计算图没有 CPU 工作时移除无意义的 CPU threadpool 唤醒，RPC 多节点拆分也不再对激活做哈希（[#28789](https://github.com/ggml-org/llama.cpp/pull/28789)）。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-12

## 今日要闻
过去 24 小时内没有新版本发布，但社区活动主要集中在 Gemma 4、Gemma3n 以及 Anthropic 兼容端点上的工具调用正确性故障，其中若干问题会静默返回空响应。在运维方面，一份可信的报告指出 `:cloud` 模型在 0.34.0 上运行约 45 分钟后会卡死，目前已有修复 PR 来限制代理的连接/TTFB 超时。最后，manifest-list 工作流（针对 runner 的 manifest 与 digest 选择）正在为 llama-server 兼容性做准备。

## 发布与破坏性变更
- **过去 24 小时内无新版本发布。**
- **Manifest list 支持进行中** — [PR #16590](https://github.com/ollama/ollama/pull/16590) 增加了 manifest-list 存储，使针对特定 runner 的 manifest 可以在同一个 tag 下共存，同时保留 v1 tag 作为降级锚点。`show/list/copy/remove/pull/push` 新增了 runner 与 digest 选择，以及惰性本地兼容。如果你在 CI 或评测中固定了 tag，这是一个值得关注的存储/API 表面变更。
- **MLX 版本升级** — [PR #18235](https://github.com/ollama/ollama/pull/18235) 跟踪上游 `ml-explore/mlx`；预计 macOS 上的 MLX runner 会有渐进式行为变化。
- **`create` 流水线重构** — [PR #14969](https://github.com/ollama/ollama/pull/14969) 增加了服务端 MLX/safetensors 导入，支持远程上传/暂存，并将 GGUF create 限制为包装现有 GGUF 输入。对于任何构建模型创建自动化的人来说意义重大。
- **CLI agent 被移除** — [PR #18393](https://github.com/ollama/ollama/pull/18393) 回退到之前的 CLI 聊天界面。

## 新模型与硬件支持
- **Hy4（腾讯）模型请求** — [Issue #18287](https://github.com/ollama/ollama/issues/18287) 请求为 `tencent/Hy4-preview` 提供 Ollama 兼容的量化产物。
- **deepseek-v4.1-flash 可下载模型请求** — [Issue #18379](https://github.com/ollama/ollama/issues/18379)；报告者还询问为什么 Ollama 暂停了与 cloud 变体一同提供的可下载文件。
- **`ppc64le` 架构仍然开放** — [Issue #796](https://github.com/ollama/ollama/issues/796)（自 2023 年开启，今日更新）请求支持 IBM POWER8+。
- **AMD gfx1200（RX 9060 XT）加载失败** — [Issue #17782](https://github.com/ollama/ollama/issues/17782)：在 ROCm 上使用 qwen3.8:27b 时出现 `Could not load "TensileLibrary_lazy_gfx1200.dat"`。
- **IQ3_S 量化支持不明确** — [Issue #18297](https://github.com/ollama/ollama/issues/18297)：`Qwen3.8-27B-GSQ-RCO-GGUF:IQ3_S` 以 `done_reason: "stop"` 完成，但始终返回空内容。
- **多模态投影器放置工作：**
  - [PR #18376](https://github.com/ollama/ollama/pull/18376) 使 Gemma3n 的 MobileNetV5 投影器不放在 CPU 上（CPU 后端会静默损坏图像嵌入）。
  - [PR #16767](https://github.com/ollama/ollama/pull/16767) 为集成 ROCm APU 重新启用投影器卸载，因为共享内存检查在那里是误报。
- **Jetson Orin Nano 8GB OOM** — [Issue #18396](https://github.com/ollama/ollama/issues/18396)：在 0.34.0 上，Gemma 4 E4B 多模态投影器在统一内存下导致主机 OOM。

## 性能与优化
- **模型加载回归** — [Issue #18373](https://github.com/ollama/ollama/issues/18373)：报告称从 0.23.4 之后升级开始变慢，影响所有模型，包括 `gpt-oss:120b`。尚未找到修复 PR。
- **Strix Halo 加载时间回归** — [Issue #16501](https://github.com/ollama/ollama/issues/16501)：在统一内存硬件上，Qwen3.5 122B 的加载时间从约 61 秒（0.24）增加到约 116 秒（0.30.4）。
- **持续 `/api/embed` 下回环端口耗尽** — [Issue #18392](https://github.com/ollama/ollama/issues/18392)：llama-server HTTP 客户端禁用了 keep-alive，因此持续批量嵌入（约 55 文档/秒，批大小 32，`bge-m3:567m-fp16`）在 Windows 上耗尽了临时端口并返回 HTTP 400 `dial tcp` 错误。对于高吞吐嵌入服务来说值得关注。
- **MLX 后端更新** — [PR #18235](https://github.com/ollama/ollama/pull/18235) 是本周期主要的 runner 级优化方向。

## 稳定性与回归
按严重程度排序：

1. **Cloud 模型在 0.34.0 上运行约 45 分钟后卡死** — [Issue #18381](https://github.com/ollama/ollama/issues/18381)。`deepseek-v4-pro:cloud` 延迟攀升（16 秒 → 28 秒），然后挂起数分钟；0.33.1 不受影响。**修复 PR 已存在：** [PR #18382](https://github.com/ollama/ollama/pull/18382) 限制了 cloud 代理的连接和 TTFB 超时（当前为无超时的 `http.DefaultClient`）。
2. **工具调用输出在解析失败时被静默丢弃** — [Issue #17274](https://github.com/ollama/ollama/issues/17274)。解析失败会产生空 `content`、无 `tool_calls`，并消耗约 40 个补全 token，且没有诊断路径；报告者更正了早先的错误描述，但静默丢弃行为仍然存在。影响 `/api/chat` 和 `/v1/chat/completions`。
3. **Gemma 4 工具调用中对象键含空格被丢弃** — [Issue #18390](https://github.com/ollama/ollama/issues/18390)。未加引号的键会破坏解析器；响应以 `finish_reason: "stop"` 空到达。尚无修复 PR。
4. **Gemma3n 工具模型通过 `/v1` 返回空 `tool_calls`** — [Issue #18357](https://github.com/ollama/ollama/issues/18357)。模型原生发出 `<tool_call>`，但 Ollama 既不返回 `tool_calls` 也不返回内容，尽管声明了 `tools` 能力。
5. **Qwen3.8 在聊天流式传输期间 500** — [Issue #17778](https://github.com/ollama/ollama/issues/17778)（28 条评论，25 个 👍）。当模型在大上下文下循环调用工具时出现 `ResponseError ... no user query found in messages`。
6. **Anthropic `/v1/messages` 兼容在复杂工具 schema 上失效** — [Issue #18346](https://github.com/ollama/ollama/issues/18346)。简单 schema 可用；Claude Code 风格的复杂 schema 会导致模型将调用作为字面文本而非 `tool_use` 块发出。
7. **Qwen3 工具提示构造缺陷** — [Issue #14601](https://github.com/ollama/ollama/issues/14601)：通过 `/api/chat` 的 `tools` 参数传递时工具定义格式错误（嵌入系统提示时可用）。
8. **低位量化产物损坏** — [Issue #18252](https://github.com/ollama/ollama/issues/18252)：`qwen2.5-coder:3b-instruct` 在 q2_K/q3_K_S/q3_K_M/q3_K_L 下功能冒烟测试得分为 0/15，而同类量化通过率为 87–100%。
9. **自定义模板的 `.Tools` 回归** — [PR #18391](https://github.com/ollama/ollama/pull/18391)：自 v0.14.0-rc0 起，`.Tools` 以 `templateTools` 传递，会通过其 `String()` 方法打印为 JSON 而非结构化数据。**修复 PR 已开启**（另请注意 [PR #18388](https://github.com/ollama/ollama/pull/18388)，它为通用工具解析器添加了 `args` 字段解析）。
10. **Windows 上 `/api/embed` 端口耗尽** — [Issue #18392](https://github.com/ollama/ollama/issues/18392)（见性能部分）。
11. **内容触发的任务取消** — [Issue #18387](https://github.com/ollama/ollama/issues/18387)：包含重复省略号的文本（例如目录）会在服务器日志中导致 `stop: cancel task`。
12. **无效布尔环境变量启用了功能** — [PR #17087](https://github.com/ollama/ollama/pull/17087)（已关闭）：`BoolWithDefault` 在解析错误时返回 `true` 而非配置的默认值，因此像 `OLLAMA_GO_TEMPLATE=garbage` 这样的拼写错误会静默启用该功能。
13. **已撤回：** `ollama serve` 中每请求文件描述符泄漏的说法 — [Issue #18344](https://github.com/ollama/ollama/issues/18344) 基于错误作用域的 `lsof` 调用，作者已撤回。不要围绕它规划工作。

## 这对应用开发者意味着什么
- **将工具调用视为不可靠，并验证每一个响应。** 多个独立的解析器故障（Gemma 4 键含空格、Gemma3n、Qwen3 提示构造、Anthropic 兼容）都表现为 `finish_reason: "stop"` 且 `content` 为空、无 `tool_calls`。永远不要假设 HTTP 200 成功就意味着结果可用——要显式检查空内容，并记录原始服务器输出，以便解析器丢弃问题可被诊断。
- **在生产环境中固定 Ollama 版本。** 0.34.0 存在可复现的 cloud 卡死问题，并且与 0.30 之前的构建相比存在未解决的加载时间回归。在 [PR #18382](https://github.com/ollama/ollama/pull/18382) 发布之前，0.33.1 是 `:cloud` 工作负载更安全的回退选择。
- **为 cloud 模型添加客户端超时和看门狗。** 底层代理完全没有超时，因此上游停滞会使请求无限期挂起。即使修复落地后，针对延迟攀升（而不仅是 HTTP 错误）的重试逻辑也是长时间运行 agent 的正确模式。
- **如果你使用 Claude Code 或其他 Anthropic-SDK 客户端对接 `/v1/messages` 端点，** 在 [Issue #18346](https://github.com/ollama/ollama/issues/18346) 解决之前，请保持工具 schema 简单并展平深层嵌套对象。
- **对于评测和可复现性流水线，** [Issue #18394](https://github.com/ollama/ollama/issues/18394) 提议在本地 `/api/chat` 响应中包含所服务 manifest 的 digest——这是当前的一个真实缺口，因为请求前后的 `/api/tags` 无法检测请求期间的 A→B→A tag 切换。[PR #16590](https://github.com/ollama/ollama/pull/16590) 中的 manifest-list 工作将使 digest 固定查找成为一等公民，这是正确的长期修复方案。
- **嵌入密集型工作负载** 应在 Windows 上限制并发或回收连接，直到 [Issue #18392](https://github.com/ollama/ollama/issues/18392) 中提及的 keep-alive 问题得到解决。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-12

## 今日亮点
Trivy 供应链事件仍是主要安全话题：受影响的 PyPI 包已被删除，当前版本据报告是干净的，但运维人员仍应审计固定版本并验证已签名构件。开发继续推进 `v1.102.0-dev.2`，而过去 24 小时最重要的工程工作集中在 prompt-cache 路由/成本估算、provider/model 元数据扩展，以及若干高严重度的 proxy/工具调用回归。活动量仍然很高：过去 24 小时有 47 个 issue 和 304 个 PR 被更新。

## 发布与破坏性变更
- **`v1.102.0-dev.2`** 已发布。这是一个开发预发布版；Docker 镜像使用与 commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中引入的相同密钥进行 cosign 签名。部署前请验证签名。[发布链接](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.2)
- 过去 24 小时内未出现稳定版本、迁移说明或破坏性 API/配置变更。

## 新模型与硬件支持
- **模型/定价同步：** 更新了 218 个模型，新增 27 个，覆盖 Anthropic、Fireworks AI、Gemini、OpenAI 和 Together AI。定价读取自提供商发布的页面。[PR #40809](https://github.com/BerriAI/litellm/pull/40809)
- **GitGot provider：** 作为 JSON 配置的 OpenAI 兼容 provider 添加，包含 base URL、文档、模型列表和定价元数据。[PR #40810](https://github.com/BerriAI/litellm/pull/40810)
- **Prism provider：** 注册为原生 provider，已加入 Add Model 表单，并包含经验证的定价和 endpoint 元数据。[PR #40782](https://github.com/BerriAI/litellm/pull/40782)
- 此数据集中没有 CUDA/ROCm/Metal/CPU 后端或量化格式变更。

## 性能与优化
- **Prompt-cache 亲和性 TTL 修复：** 路由亲和性现在匹配 `cache_control.ttl`，不再硬编码为 5 分钟，并且会检测 system/tool 缓存块。这解决了 1 小时 Anthropic 缓存错失缓存命中的问题。[PR #40776](https://github.com/BerriAI/litellm/pull/40776) · [Issue #28427](https://github.com/BerriAI/litellm/issues/28427)
- **Prompt-cache 切换成本估算器：** 新的 proxy endpoint 估算两组输入成本，并对读取以及两种写入 TTL 计价，使 5 分钟与 1 小时缓存写入可比较。[PR #40804](https://github.com/BerriAI/litellm/pull/40804)
- **路由可观测性：** 已关闭的 PR 暴露复杂度路由 headers，用于 tier、cause、score 和 configured effort。[PR #40788](https://github.com/BerriAI/litellm/pull/40788) · [PR #40792](https://github.com/BerriAI/litellm/pull/40792)
- **延迟路由竞态修复：** 已关闭的 stale PR 防止了基于延迟的路由所用延迟跟踪器中的丢失更新竞态。[PR #29696](https://github.com/BerriAI/litellm/pull/29696)

## 稳定性与回归
按严重度排序。

### 严重
- **PyPI `v1.82.7` / `v1.82.8` 供应链投毒：** 事件已受控；受影响的包已被删除，当前版本据报告不含被投毒的代码/组件。运维人员仍应审计历史固定版本和 CI 缓存。[Issue #24518](https://github.com/BerriAI/litellm/issues/24518)
- **`secret_redaction.redact_string()` 中的 ReDoS：** 对大型异常字符串的灾难性正则回溯可能阻塞事件循环数分钟，导致存活探针失败，并使副本 crash-loop。数据中未注明修复 PR。[Issue #32353](https://github.com/BerriAI/litellm/issues/32353)

### 高
- **`store_model_in_db: true` 时配置文件模型被驱逐：** 编辑任何 `litellm_params` 字段都会从运行中的 pod 移除该 deployment，且在重启前没有任何机制恢复它。[Issue #40761](https://github.com/BerriAI/litellm/issues/40761)
- **Bedrock Converse 工具调用历史：** 携带工具调用历史但没有 `tools` 数组的后续轮次会在离开 proxy 之前被拒绝。[Issue #40735](https://github.com/BerriAI/litellm/issues/40735)
- **工具调用参数解析：** 尽管存在 `split_concatenated_json_objects`，`parse_tool_call_arguments` 仍会静默丢弃带有拼接 JSON 参数的 tool calls。[Issue #40582](https://github.com/BerriAI/litellm/issues/40582)
- **Ollama 原生 provider 工具结果：** Qwen3.8 工具结果无法通过原生 Ollama 消费，而 OpenAI 兼容的 Ollama `/v1` 可以工作。[Issue #40575](https://github.com/BerriAI/litellm/issues/40575)
- **Responses-to-Chat 桥接：** 原始 `reasoning_text` 在流式和非流式结果中都会丢失。[Issue #40654](https://github.com/BerriAI/litellm/issues/40654)
- **Azure AI model router：** 没有成本跟踪。[Issue #40728](https://github.com/BerriAI/litellm/issues/40728)
- **Admin UI 定价持久化：** 模型编辑会持久化派生定价；在价格映射重新加载后，Azure 支出可能被记录为 `$0`。[Issue #40649](https://github.com/BerriAI/litellm/issues/40649)
- **Prompt-cache 路由 TTL：** 硬编码的 5 分钟亲和性会破坏 1 小时临时缓存路由；已由 [PR #40776](https://github.com/BerriAI/litellm/pull/40776) 处理。[Issue #28427](https://github.com/BerriAI/litellm/issues/28427)

### 中
- **JWT 认证虚拟密钥膨胀：** 每次 token 刷新都会生成新的“virtual key”，使 Usage 中充满无名的 `hashed-jwt-…` 行。[Issue #40398](https://github.com/BerriAI/litellm/issues/40398)
- **`silent_model` 导致 HTTP 500：** 配置 `silent_model` 后，Responses 和 Anthropic Messages 主请求会失败。[Issue #34890](https://github.com/BerriAI/litellm/issues/34890)
- **Vertex AI Realtime 采样率：** `pcm16` 硬编码为 24,000 Hz，破坏转写质量。[Issue #40563](https://github.com/BerriAI/litellm/issues/40563)
- **Bedrock GPT-5.6 跨区域图像输入：** 当通过 Converse 而不是 OpenAI endpoint 路由时，带图像的请求会失败。[Issue #40080](https://github.com/BerriAI/litellm/issues/40080)
- **vLLM 缓存 token 核算：** token 成本计算器忽略来自 vLLM 的 `cached_tokens`。[Issue #22984](https://github.com/BerriAI/litellm/issues/22984)
- **`STORE_MODEL_IN_DB` 优先级：** 当配置文件的 `general_settings.store_model_in_db=false` 时，环境变量会被忽略。[Issue #31968](https://github.com/BerriAI/litellm/issues/31968)
- **`lite codex` 绕过 proxy：** 当在 Codex 子命令后传入 `-c` 时，CLI 可能静默绕过 proxy。[Issue #40651](https://github.com/BerriAI/litellm/issues/40651)
- **`cache_control_injection_points` 被丢弃：** 客户端在任何不相关消息上设置 `cache_control` 会导致配置的注入点被静默丢弃。[Issue #40675](https://github.com/BerriAI/litellm/issues/40675)
- **流量镜像：** A/B 测试流量镜像未按文档工作。[Issue #31888](https://github.com/BerriAI/litellm/issues/31888)
- **SpendLogs 回归：** Responses-API 桥接会为非流式 `/v1/chat/completions` 丢弃 SpendLogs 行。[Issue #36426](https://github.com/BerriAI/litellm/issues/36426)

### 过去 24 小时内已关闭 / 过期
- OpenAI 兼容流式现在会在带内 `data: {"error": ...}` 事件上抛出错误，而不是静默返回空成功。[Issue #40578](https://github.com/BerriAI/litellm/issues/40578)
- Gemini/Vertex 上无效的 `reasoning_effort` 不再表现为 HTTP 500；已关闭。[Issue #40474](https://github.com/BerriAI/litellm/issues/40474)
- 重置后 `max_budget` 被忽略；已关闭为 stale。[Issue #27300](https://github.com/BerriAI/litellm/issues/27300)
- `ResetBudgetJob` 因未序列化的 `budget_limits` 崩溃；已关闭为 stale。[Issue #27171](https://github.com/BerriAI/litellm/issues/27171)
- Cursor 中的 Bedrock `BedrockException` 验证错误；已关闭为 stale。[Issue #19384](https://github.com/BerriAI/litellm/issues/19384)
- Bedrock embeddings 缺少 AWS External ID 支持；已关闭为 stale。[Issue #27835](https://github.com/BerriAI/litellm/issues/27835)

### 值得关注的修复 PR / 功能
- MCP 按 server 匹配 OAuth 元数据 issuer，修复 issuer 不匹配和 404 发现。[PR #40808](https://github.com/BerriAI/litellm/pull/40808)
- 团队 service-account key 可以针对自己的团队使用 key-management endpoints，简化 CI/CD 轮换。[PR #40807](https://github.com/BerriAI/litellm/pull/40807)
- Admin UI 按用户名和源地址对登录进行限流。[PR #36116](https://github.com/BerriAI/litellm/pull/36116)
- `lite configure codex`、`--launch` 以及 `CLAUDE_CONFIG_DIR` / `CODEX_HOME` 处理。[PR #40447](https://github.com/BerriAI/litellm/pull/40447)
- Codex `/model` 选择器从 proxy `/v1/models` 同步。[PR #40476](https://github.com/BerriAI/litellm/pull/40476)
- ConductGuard guardrail 集成，并有一个替代性的已修复分支。[PR #40785](https://github.com/BerriAI/litellm/pull/40785) · [PR #38143](https://github.com/BerriAI/litellm/pull/38143)

## 对应用开发者的意义
- **固定并验证 LiteLLM 构件。** 避免使用被投毒的 PyPI `v1.82.7` / `v1.82.8`；用 cosign 验证 Docker 镜像。除非你正在积极跟踪 main，否则将当前 dev 版本视为预生产版本。
- **工具调用型 agent 需要回归测试。** Bedrock Converse、原生 Ollama/Qwen3.8 以及拼接 JSON 工具参数都有未关闭 issue，可能丢弃或拒绝工具调用。为后续轮次和多工具历史添加端到端测试。
- **流式客户端不应信任空成功。** 已关闭的带内流式错误 bug 意味着旧版本可能在上游错误事件时返回空成功；请使用近期版本，并保留客户端超时/重试。
- **缓存密集型应用应重新评估路由。** PR #40776 修复了 prompt-cache 亲和性 TTL 行为，PR #40804 使 5 分钟与 1 小时缓存写入成本可比较。如果你依赖 Anthropic 临时缓存，这是需要跟踪的主要性能项。
- **密切关注成本核算。** Azure AI model router、vLLM 缓存 token 和 Admin UI 定价持久化都存在未解决的成本跟踪缺口。请对照提供商发票核验 SpendLogs。
- **`store_model_in_db` 对多 pod 部署有风险。** 如果你在运行时编辑配置文件模型，请注意 [Issue #40761](https://github.com/BerriAI/litellm/issues/40761) 中在修复前的驱逐/恢复问题。
- **Provider/model 目录正在扩展。** Prism、GitGot 以及 218 个模型的定价同步减少了为新后端手动进行 OpenAI 兼容接线的工作。如果你使用基于成本的路由或预算，请重新同步定价。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-12

## 今日要点
过去 24 小时内没有新版本发布。当前最重要的进行中工作是安全性与正确性：修复 Studio API 密钥继承服务器所有者的 Hugging Face 登录的问题（[#10809](https://github.com/unslothai/unsloth/pull/10809)），以及修复 `clean_text` 会删除训练语料中所有非 ASCII 字符的问题（[#10741](https://github.com/unslothai/unsloth/pull/10741)）。硬件/部署工作继续推进 AMD ROCm Docker（[#10820](https://github.com/unslothai/unsloth/pull/10820)）、ARM64 纯 CPU 镜像（[#10766](https://github.com/unslothai/unsloth/pull/10766)），以及 Apple Silicon 的真实 MLX 认证（[#10823](https://github.com/unslothai/unsloth/pull/10823)）。

## 版本发布与破坏性变更
- **过去 24 小时内无版本发布。**
- **训练配置迁移警告：** 使用最新 Docker 镜像/软件包 `2026.9.4` 的用户报告 `SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`；`max_seq_length` 似乎已迁移为 `max_length`。受影响的用户应更新配置，或固定到先前的镜像/软件包。 [Issue #10785](https://github.com/unslothai/unsloth/issues/10785)
- **Windows ROCm 依赖破坏：** `accelerate 1.15.0` 会破坏所有 Windows ROCm 训练，因为它导入 `torch.distributed.tensor`，而 AMD 的 Windows ROCm wheel 并不包含该模块。PR #10819 在 Windows 上将 `accelerate` 限制在 `1.15` 以下。 [PR #10819](https://github.com/unslothai/unsloth/pull/10819)
- **梯度累积重写正确性：** PR #10818 修复了 `patch_gradient_accumulation_fix` 在 `training_step` 中发出非原始 group 引用的问题，这可能损坏重写后的反向路径。 [PR #10818](https://github.com/unslothai/unsloth/pull/10818)

## 新模型与硬件支持
- **AMD ROCm Docker 镜像：** PR #10820 在 CUDA/Blackwell 镜像之外新增 AMD ROCm 变体，面向 RDNA2–RDNA4 和 CDNA/Instinct。沿用现有 `docker/` 布局、`build.sh`、`run.sh` 和冒烟测试结构。 [PR #10820](https://github.com/unslothai/unsloth/pull/10820) · [Issue #6230](https://github.com/unslothai/unsloth/issues/6230) · [Issue #9581](https://github.com/unslothai/unsloth/issues/9581)
- **ARM64 纯 CPU Docker 目标：** PR #10766 提议为纯 CPU 部署提供官方无 CUDA 的 ARM64 镜像，区别于 GH200/DGX Spark 等启用 GPU 的 ARM64 系统。 [PR #10766](https://github.com/unslothai/unsloth/pull/10766)
- **Apple Silicon / MLX 验证：** PR #10823 为 Apple Silicon 上的 Studio agent 工作区新增了一个聚焦于真实 MLX 的认证测试框架。 [PR #10823](https://github.com/unslothai/unsloth/pull/10823)
- **ARM64 DGX Spark 注意事项：** 报告 PR #10491 发现，已发布的 `unsloth/unsloth` ARM64 Studio 镜像在 DGX Spark/GB10 上以 CPU 运行 `llama.cpp`，且没有代码变更。对于 ARM64 GPU 用户而言，这是需要跟踪的部署限制。 [PR #10491](https://github.com/unslothai/unsloth/pull/10491)
- **Docker 持久化：** PR #10600 引入单一的 `/data` 运行时持久化卷以及开箱即用的 `docker compose` 配置，以避免覆盖预装的虚拟环境。 [PR #10600](https://github.com/unslothai/unsloth/pull/10600)

## 性能与优化
- **Windows GGUF 内存驻留：** PR #10618 在 Windows 上为“Don’t reserve system RAM”加载模式避免 GGUF 映射常驻。Windows 在卸载后无法部分取消映射 GGUF，因此该文件原本可能在 GPU 卸载后仍保持驻留。 [PR #10618](https://github.com/unslothai/unsloth/pull/10618)
- **B200 训练停顿：** Issue #10806 报告在 B200 上使用 `unsloth-cli.py` 训练 Qwen3.5-9B LoRA 时，每个步骤大部分时间 GPU 处于空闲；`fla` 每次启动都会重建其 autotune key。目前尚未列出修复 PR。 [Issue #10806](https://github.com/unslothai/unsloth/issues/10806)
- **图像 projector 微批处理：** PR #10683 提高了会导致 `llama-server` 在处理图像时中止的 projector 的 micro-batch，例如 `unsloth/gemma-4-12B-it-qat-GGUF` 处理 1400x1400 图像（约 862 个 prompt token）时因 `GGML_ASSERT` 崩溃。 [PR #10683](https://github.com/unslothai/unsloth/pull/10683)
- **工具调用重放重复处理：** Issue #10791 报告，重放的 tool call 会对参数键排序，导致 `llama-server` 重新处理每个多参数调用，例如 `edit_file`。 [Issue #10791](https://github.com/unslothai/unsloth/issues/10791)
- **多 GPU tensor split 被忽略：** Issue #10355 报告 `--tensor-split` 被忽略，影响多 GPU 层划分和利用率。未列出修复 PR。 [Issue #10355](https://github.com/unslothai/unsloth/issues/10355)
- **服务并发：** Issue #10671 报告，一个等待工具审批的长 GGUF 聊天可能会在仍有空闲 serving slot 的情况下阻塞排队中的聊天，因为审批等待会保留首个聊天的上下文预算占用。 [Issue #10671](https://github.com/unslothai/unsloth/issues/10671)

## 稳定性与回归
按严重程度排序。

- **严重 — 认证/安全：** 没有自己的 Hugging Face token 的 Studio API 密钥可能使用服务器所有者的 HF 登录启动训练，从而允许访问该密钥从未被授予权限的私有模型。修复 PR #10809 已开启。 [PR #10809](https://github.com/unslothai/unsloth/pull/10809)
- **严重 — 数据损坏：** `TextPreprocessor.clean_text` 会删除训练语料中的所有非 ASCII 字符，例如 `Le café était très bon.` → `Le caf tait trs bon.` 修复 PR #10741 已开启。 [PR #10741](https://github.com/unslothai/unsloth/pull/10741)
- **高 — 训练中断：** 最新 Docker/软件包 `2026.9.4` 抛出 `SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`。参见破坏性变更说明。 [Issue #10785](https://github.com/unslothai/unsloth/issues/10785)
- **高 — Windows ROCm 训练中断：** `accelerate 1.15.0` 会破坏所有 Windows ROCm 训练。修复 PR #10819 将 `accelerate < 1.15` 设为上限。 [PR #10819](https://github.com/unslothai/unsloth/pull/10819)
- **高 — CUDA 崩溃：** 在多 GPU 配置中于 `pipeline_flux2_klein` 进行 FLUX.2 Klein VAE 解码时出现 `CUBLAS_STATUS_NOT_INITIALIZED`。未列出修复 PR。 [Issue #10768](https://github.com/unslothai/unsloth/issues/10768)
- **高 — llama-server 图像崩溃：** 向 `gemma-4-12B-it-qat-GGUF` 发送大小合理的图像可能会因 `GGML_ASSERT` 杀死 `llama-server`。修复 PR #10683 已开启。 [PR #10683](https://github.com/unslothai/unsloth/pull/10683)
- **高 — Linux 桌面 FD 泄漏：** X11 + NVIDIA 的 `WebKitWebProcess` 泄漏 DMA-BUF `sync_file` FD，直至触发 `EMFILE`，导致窗口空白/冻结。未列出修复 PR。 [Issue #10795](https://github.com/unslothai/unsloth/issues/10795)
- **高 — agent/工具正确性：** 重复工具调用防护会阻止在文件变更后重新运行命令；修复 PR #10810 已开启。相关：重放的调用会对参数键排序并强制重新处理（[#10791](https://github.com/unslothai/unsloth/issues/10791)）。 [Issue #10792](https://github.com/unslothai/unsloth/issues/10792) · [PR #10810](https://github.com/unslothai/unsloth/pull/10810)
- **中 — 导出保真度：** 将完整微调导出为 16 位合并模型时，反而保存为 4 位模型。修复 PR #10808 已开启。 [PR #10808](https://github.com/unslothai/unsloth/pull/10808)
- **中 — 停止文本被忽略：** 在 NVIDIA GPU 上，transformers 模型会忽略请求的停止文本，并继续生成直到模型完成或达到 token 限制。修复 PR #10812 已开启。 [PR #10812](https://github.com/unslothai/unsloth/pull/10812)
- **中 — Anthropic 部分失败：** 部分失败的 Anthropic 回复会被保存为完整回复，且没有错误或续写路径。修复 PR #10811 已开启。 [PR #10811](https://github.com/unslothai/unsloth/pull/10811)
- **中 — Deep Research 剥离链接：** Deep Research 会从代码和命令中移除 URL，例如 `git clone` 链接和 `base_url=` 值。修复 PR #10814 已开启。 [PR #10814](https://github.com/unslothai/unsloth/pull/10814)
- **中 — CSV 数据格式：** 空的 Alpaca 风格 CSV 单元格会被训练为字面单词 `None`。修复 PR #10813 已开启。 [PR #10813](https://github.com/unslothai/unsloth/pull/10813)
- **中 — 量化/模式缺陷：** Issue #10549 报告 Unsloth layer mode 和 tensor mode 相同，在 v0.1.806-beta / 软件包 2026.9.2 上产生“假的 BF16 模式”。未列出修复 PR。 [Issue #10549](https://github.com/unslothai/unsloth/issues/10549)
- **低 — 误导性 GPU 日志：** 手动 GPU 内存模式记录 `--fit: on`，但启动时使用 `--fit off`，使正常启动看起来像 GPU 探测失败。 [Issue #10821](https://github.com/unslothai/unsloth/issues/10821)
- **低 — Studio 设置漂移：** 运行设置侧边栏和模型下拉菜单保留各自的草稿，并静默地不一致。 [Issue #10817](https://github.com/unslothai/unsloth/issues/10817)

## 对应用开发者的意义
- **多租户 Studio 部署：** 在 PR #10809 落地之前，将 API-key 认证视为不安全。在向外部用户开放训练之前，审计 API 密钥是否可能继承服务器所有者的 Hugging Face token。 [PR #10809](https://github.com/unslothai/unsloth/pull/10809)
- **多语言/自定义训练流水线：** 避免使用 `clean_text`，或应用 PR #10741；目前非 ASCII 数据会被静默剥离，这可能损坏数据集并降低模型表现。 [PR #10741](https://github.com/unslothai/unsloth/pull/10741)
- **固定版本与配置：** 在需要时迁移 `max_seq_length` 到 `max_length`，并在 Windows ROCm 上固定 `accelerate < 1.15`。 [Issue #10785](https://github.com/unslothai/unsloth/issues/10785) · [PR #10819](https://github.com/unslothai/unsloth/pull/10819)
- **Agent 应用：** 长时间的工具审批等待可能会阻塞原本空闲的 serving slot；重复工具调用防护可能会阻止编辑后合法的重跑；重放排序可能强制 `llama-server` 进行冗余处理。修复正在进行中，但请仔细测试长时间审批流程以及文件编辑/测试循环。 [Issue #10671](https://github.com/unslothai/unsloth/issues/10671) · [PR #10810](https://github.com/unslothai/unsloth/pull/10810) · [Issue #10791](https://github.com/unslothai/unsloth/issues/10791)
- **多 GPU 服务：** 在依赖 `--tensor-split` 进行 GPU 划分之前，验证其行为。 [Issue #10355](https://github.com/unslothai/unsloth/issues/10355)
- **Windows GGUF 内存调优：** 如果使用 “Don’t reserve system RAM”，请跟踪 PR #10618；当前行为可能会在卸载后仍将完整 GGUF 驻留在内存中。 [PR #10618](https://github.com/unslothai/unsloth/pull/10618)
- **导出工作流：** 验证 16 位完整微调导出；当前 Studio 行为可能会保存 4 位权重。 [PR #10808](https://github.com/unslothai/unsloth/pull/10808)
- **硬件路线图：** AMD ROCm Docker 和 ARM64 纯 CPU 镜像正在推进；Apple Silicon MLX 认证正在加入。对于 DGX Spark/ARM64 GPU 用户，请注意当前已发布镜像可能会在 CPU 上运行 `llama.cpp`。 [PR #10820](https://github.com/unslothai/unsloth/pull/10820) · [PR #10766](https://github.com/unslothai/unsloth/pull/10766) · [PR #10823](https://github.com/unslothai/unsloth/pull/10823) · [PR #10491](https://github.com/unslothai/unsloth/pull/10491)

---

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*