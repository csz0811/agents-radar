# AI Infrastructure Digest 2026-09-09

> Generated: 2026-09-08 22:47 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Comparison — 2026-09-09

## 1. Ecosystem Overview

The serving layer is converging on a new generation of hybrid sparse-attention/linear-attention MoE models (Qwen3.8-Flash-Next, GLM-5.x-Flash, Kimi-K3, DeepSeek-V4), and much of today's activity is **consolidation work**: determinism fixes, cache-layout corrections, and draft/spec-decode stability after rapid model support landed last quarter. On the infrastructure side, NVFP4/FP4 mixed-precision is moving from "model-quantization trick" to a **system-level default** spanning weights, KV cache, and disaggregated serving — with SGLang, vLLM, and llama.cpp all touching different parts of the stack in the same 24h window. Fast restart and weight-cache daemons are emerging as a real competitive axis for serving engines. Meanwhile, agentic protocol correctness (tool calls, `/v1/responses`, streaming translation) is the dominant *user-visible* bug class across gateways, local runtimes, and serving engines alike.

## 2. Activity Comparison

| Project | Issues updated (24h) | PRs updated (24h) | Releases (24h) | Positioning |
|---|---|---|---|---|
| **vLLM** | 113 | 500 | None | Consolidation on hybrid sparse-attention models; no release but heavy hardening |
| **SGLang** | n.r.* | n.r.* | None | Fast engine recovery + Qwen4/GNVFP4 enablement; 1 CI lane broken / 9 flaky |
| **llama.cpp** | 56 | 132 | **15 builds** (b10853–b10867) | Highest release velocity; daily cadence of correctness/perf fixes |
| **Ollama** | n.r.* | n.r.* | None | Agentic API correctness; upstream llama.cpp/MLX bumps in review |
| **LiteLLM** | n.r.* | n.r.* | None | Proxy hardening: auth-leak reports, budget bugs, streaming-bridge corruption |
| **Unsloth** | 42 | n.r.* | **v0.1.807-beta** | AMD Vulkan default (~20% faster); Studio multi-tenant/sandboxing work |

\* *n.r. = not reported in the source digest. Issue/PR figures measure updates, not newly opened items, and the digests do not normalize counts identically.*

**Readout:** llama.cpp is the only project shipping releases at volume; the larger serving engines (vLLM, SGLang) are between releases but moving hundreds of PRs. Unsloth shipped a user-facing performance release while also landing a large batch of Studio hardening PRs.

## 3. Model Support Race

**Where new model/architecture support landed today:**

| Architecture / Model | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **Kimi-K3** | ROCm large-M MoE front (PR) | Draft-KV budget fix w/ DP-attn | Recurrent-state rollback (b10853) | — | — |
| **Qwen3.8-Flash-Next** | Determinism bug fix (#54521) | NVFP4 mixed-precision loading; tool-loop bug | — | — | Tool-call budget hallucination (open) |
| **GLM-5.3-Flash** | B200 unsupported (open) | HiCache corruption (open); no FP8 KV on SM90 | FA support requested (open) | Cloud endless-reasoning bug | — |
| **Qwen4 / NVFP4** | — | **PLE offload for GB10/DGX Spark; MegaMoE for Qwen MoE** | qwen4exp tensor-split proposal | Qwen static YaRN (MLX) | — |
| **DeepSeek-V4** | A100 unsupported (open) | TP8 decode hang at ~245K ctx (root-cause fix in review) | — | — | — |
| **Mamba / hybrid** | Qwen3.8 hybrid GDN issues | Mamba 1/2 inference proposed | DFM Mimir 1B (open PR) | — | — |
| **NVFP4 quant + KV** | Non-SM100 NVFP4 KV cache | Qwen3.8-Flash-Next NVFP4 weights | NVFP4 quant type in llama-quantize | — | — |

**Who is ahead:** **SGLang is furthest on the newest frontier** — it has the only working NVFP4 loading path for Qwen3.8-Flash-Next, the only GB10/DGX-Spark Qwen4 FP8 fit strategy, and the broadest speculative-decoding surface (DFlash V2, Domino, dynamic verification). **vLLM has the deepest hybrid-model hardening** (DSA/MLA/NVFP4 cache, PD disaggregation) but still cannot run DeepSeek-V4-Flash on Ampere nor GLM-5.3-Flash on B200. **llama.cpp remains the fastest at base architecture enablement** (Kimi-K3, Nemotron 3 Super MTPv2, daily builds), while **Ollama and Unsloth mostly consume upstream support** rather than originating it — Ollama through llama.cpp/MLX bumps, Unsloth through its own llama.cpp fork.

## 4. Performance Frontier

Optimization effort today clusters in five areas:

- **KV cache compression & disaggregation (vLLM, SGLang).** NVFP4 KV cache for pre-SM100 GPUs (vLLM PR #46963), HiSparse host-resident design revised to spill-only-on-pressure (vLLM #53781), and draft-KV budget accounting fixes for DP attention (SGLang #38202). Silent KV-mixing across model revisions in NIXL PD deployments remains a live risk (vLLM #55776).
- **Fast restart / weight-cache daemons (SGLang, Ollama).** SGLang's Weight Cache Daemon cuts post-quantized weight load from ~306–327s to **<1s** for Qwen3-235B FP8 — the most striking single number in today's digests. Ollama is doing the analogous smaller-scale work with GGUF metadata caching.
- **Determinism under spec-decode & batching (vLLM, SGLang, llama.cpp).** Default-deterministic top-p/top-k renorm in SGLang's kernel removes an entire class of TP>1 deadlocks; vLLM still tracks a non-deterministic greedy-decoding bug in Qwen3.8-Flash-Next; llama.cpp has open MTP state-retention nondeterminism. Prefix-cache + EAGLE/MTP costs 30–40% throughput on hybrid models (vLLM #53670).
- **Kernel & backend selection (vLLM, llama.cpp, Unsloth).** Helion custom ops show 1.38–1.78x geomean speedups on H100 (vLLM proposal); llama.cpp landed Vulkan activation+MUL fusion and Metal iq3_xxs fixes; Unsloth made **Vulkan the AMD default (~20% faster than ROCm)**. LiteLLM is attacking the *host-side* event loop: blocking tokenizer calls held the GIL ~0.7s on 600k-token counts, and image/template fetches were stalling unrelated requests.
- **Long-context stability at scale (vLLM, SGLang, llama.cpp).** Recurring crashes cluster at SM120 (Blackwell), at ~245K context (DSV4 TP8 decode hang), and at ~131K context in Vulkan (RX 7900 XTX, 78% decode cliff). The pattern: context-length support lands before the memory-management work that makes it safe.

## 5. Layer Positioning

| Layer | Projects | Primary competition / relationship |
|---|---|---|
| **Production serving engines** | vLLM, SGLang | Direct head-to-head on paged attention, PD disaggregation, spec-decode, and FP4/FP8 cache paths. SGLang is pushing the frontier on new architectures (Qwen4 pathfinding, DFlash2); vLLM is the volume leader in PR velocity and hardening breadth. |
| **Local inference runtime** | llama.cpp | The common substrate for everything below. Backend breadth is the moat: CUDA, ROCm, Vulkan, Metal, SYCL in one binary. |
| **Local/cloud model runtime product** | Ollama | Wraps llama.cpp + MLX; adds model distribution, context management, and OpenAI/Anthropic compatibility. Its roadmap is effectively "make upstream runners correct in a product surface" — today that means fixing `/v1/responses` and tool loops. |
| **Agentic gateway / control plane** | LiteLLM | No tensor compute. Sits in front of every engine above; competes on routing, auth/budget enforcement, and lossless protocol translation. Its biggest risks are *information leaks* in error bodies and silently corrupted streaming tool calls — both fault classes the serving engines don't have. |
| **Fine-tuning framework + desktop studio** | Unsloth | Fine-tuning (FastLanguageModel/QLoRA) plus a desktop app that launches a llama.cpp-derived `llama-server`. Increasingly adjacent to Ollama as a local agentic runtime, but differentiated by training workflows and GPU-efficiency hooks. |

Notable dependency chain: **Ollama and Unsloth Studio both inherit stability from llama.cpp/upstream forks**, while LiteLLM can route to any of the four. A llama.cpp regression therefore propagates to Ollama and Unsloth users even when those projects change nothing.

## 6. Trend Signals

1. **The hybrid-model wave is outpacing serving-engine maturity.** Qwen3.8-Flash-Next, GLM-5.3-Flash, Kimi-K3, and DeepSeek-V4 all show unresolved determinism, caching, or crash bugs across *multiple* projects simultaneously. The architectures shipped faster than the schedulers, cache layouts, and spec-decode paths could adapt. Treat `temperature=0` reproducibility as a feature to test, not an assumption.

2. **FP4/NVFP4 is becoming the default serving precision — and the default source of bugs.** Weight-side NVFP4 and cache-side NVFP4 are landing in the same week across vLLM (DSA MLA), SGLang (MIXED_PRECISION loading), and llama.cpp (quant types). The recurring crash pattern — Blackwell SM120 + NVFP4 + hybrid attention — suggests hardware enablement and quantized-kernel correctness are still racing.

3. **Fast restart is the new serving-economics lever.** SGLang's <1s weight load for a 235B FP8 model (vs. ~5 min) makes scale-from-zero and P/D replica recycling viable. Expect weight-cache daemons and metadata caching to become table stakes; Ollama and Unsloth are already building the smaller-scale versions.

4. **Determinism is being pushed down the stack.** SGLang made cross-rank sampling renorm a default; vLLM tracks batch-shape-invariant inference as a feature; llama.cpp chases MTP inter-request state leakage. Speculative decoding is the forcing function — it multiplies any nondeterminism into deadlocks and throughput cliffs.

5. **Agentic protocol correctness is the most fragile layer of all.** Tool-call corruption shows up at *every* layer: LiteLLM's protocol bridges drop `tool_calls[].id`/args; Ollama's `/v1/responses` silently drops developer messages and never offers `tool_search` tools to the model; vLLM is reworking Responses-API parsing; llama.cpp mangles parallel tool calls against wide schemas. Worse, several failures are **silent** — HTTP 200 with `completed` status but missing content. Agent/application developers should pin versions with these fixes rather than tracking `main`.

6. **Rolling deployments + disaggregated serving is a silent-corruption risk.** vLLM's NIXL compat hash checks geometry but not model revision; Ollama/upstream llama.cpp bumps are under review; Unsloth's runtime can be quarantined by AV at load. For P/D disaggregation, pin revisions and coordinate restarts across the replica group.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-09

## 1. Today's Highlights
No new releases were published in the last 24h, but issue/PR activity remains heavy (113 issues, 500 PRs updated). The theme is consolidation: fixes are converging on the new generation of hybrid sparse-attention/linear-attention models — notably a non-determinism bug in Qwen3.8-Flash-Next greedy decoding (#54521), missing NVFP4 DSA MLA writes in the fused norm+rope kernel (#55538), and an NIXL PD handshake gap that can mix KV states across model revisions (#55776). Several tool-calling/parser correctness fixes also landed or are in flight for the Responses API surface.

## 2. Releases & Breaking Changes
None. No release tags or wheels in the last 24h.

## 3. New Model & Hardware Support
- **DeepSeek-V4-Flash on SM8x (A100/A800/RTX 30xx)** remains an open request with 106 comments – neither DeepSeek-V4-Flash nor DeepSeek-V4-Flash-0731 runs on Ampere today. [Issue #50576](https://github.com/vllm-project/vllm/issues/50576)
- **GLM-5.3-Flash** reported unsupported on B200 (`Glm5NextTextLinearAttention` not recognized). [Issue #54062](https://github.com/vllm-project/vllm/issues/54062)
- **NVFP4 KV cache on pre-SM100 GPUs**: PR reworks the non-SM100 path to use FlashInfer’s slot-mapping API for NVFP4 paged appends, enabling Ampere/Hopper systems to use the smaller cache format. [PR #46963](https://github.com/vllm-project/vllm/pull/46963)
- **Kimi-K3 (ROCm)**: minimal large-M merged MoE front, gated by `VLLM_ROCM_KIMI_K3_LARGE_M_FRONT=1`, claims fused BF16 front projection with FP32 accumulation for 512 ≤ M ≤ 8192. [PR #55811](https://github.com/vllm-project/vllm/pull/55811)
- **GLM-5.2-FP8** added to the AMD MoRIIO disaggregated CI model catalog. [PR #53885](https://github.com/vllm-project/vllm/pull/53885)
- **DCP interleave guard removed** for the GLM sparse indexer, unblocking DCP + NIXL combos that use `cp_kv_cache_interleave_size > 1`. [PR #55802](https://github.com/vllm-project/vllm/pull/55802)

## 4. Performance & Optimization
- **Helion custom ops on ROCm**: proposal to adopt Helion kernels by default for select ops; three benchmarked kernels show 1.382–1.785x geomean speedups on H100. [Issue #53788](https://github.com/vllm-project/vllm/issues/53788)
- **Batch-invariant inference** (deterministic execution across batch shapes) is tracked as a feature with 89 comments; follow-up work continues. [Issue #27433](https://github.com/vllm-project/vllm/issues/27433) (see also [PR #26468](https://github.com/vllm-project/vllm/pull/26468))
- **HiSparse (DSv4)**: host-resident sparse-MLA decode hot-buffering design revised to keep KV in GPU cache by default and spill only on pressure — a response to earlier always-host-resident drawbacks. [PR #53781](https://github.com/vllm-project/vllm/pull/53781)
- **EAGLE/MTP + prefix cache**: last-block drop causes a 1,648-token recompute per hit and ~30–40% batch throughput loss on prefix-reusing workloads with spec decoding on a hybrid Qwen3.8 GDN layout. [Issue #53670](https://github.com/vllm-project/vllm/issues/53670)
- **KV prefetch timing**: when prefetch is spawned late, GPU idle time results — relevant for LMCache users. [Issue #41784](https://github.com/vllm-project/vllm/issues/41784)

## 5. Stability & Regressions
Ranked by severity:

1. **Qwen3.8-Flash-Next non-deterministic greedy decoding** — five byte-identical requests at `temperature=0` return different outputs once context exceeds `indexer_budget` and Qwen Sparse Attention switches to top-k selection. Impacts eval/CI reproducibility. [Issue #54521](https://github.com/vllm-project/vllm/issues/54521)
2. **Silent CUDA IMA (exit 0)** on RTX 3090 with hybrid GDN + MTP k=3 + async scheduling; persists through several hardening fixes. [Issue #53726](https://github.com/vllm-project/vllm/issues/53726)
3. **FlashInfer IMA on sm_120** with NVFP4 + FP8 KV cache; crashes even on a 16-token request. TRITON_ATTN unaffected. A related fix for FlashInfer’s NVLink-multicast fused all-reduce path is up. [Issue #54225](https://github.com/vllm-project/vllm/issues/54225) · [PR #55973](https://github.com/vllm-project/vllm/pull/55973)
4. **NVFP4 DSA MLA broken** — the fused norm+rope Triton kernel writes MLA KV but the `nvfp4_ds_mla` layout was missed after a rebase. Fix in review. [PR #55538](https://github.com/vllm-project/vllm/pull/55538)
5. **NIXL KV mixing across model revisions** — compatibility hash checks geometry but not the primary model revision; rolling updates can silently mix incompatible KV. [PR #55776](https://github.com/vllm-project/vllm/pull/55776)
6. **EngineCore orphaned on parent death** — workers keep running if the parent is SIGKILLed/OOM-killed; fix adds parent-death shutdown. [PR #55846](https://github.com/vllm-project/vllm/pull/55846)
7. **KV-offload cache reuse across layouts** — persistent offload namespaces omit `kv_cache_layout`, allowing cross-layout prefix hits under a shared `root_dir`. [PR #55907](https://github.com/vllm-project/vllm/pull/55907)
8. **Recurring Xid 13 warp errors** on SM120 under sustained load (Nemotron-3.5-Lightning, NVFP4, hybrid Mamba). [Issue #52225](https://github.com/vllm-project/vllm/issues/52225)
9. **Tool-calling parser fixes**: Kimi K2 streaming `IndexError` before slot init [PR #55975](https://github.com/vllm-project/vllm/pull/55975); DSML calls where the model omits `<｜DSML｜tool_calls>` wrapper now parsed [PR #55954](https://github.com/vllm-project/vllm/pull/55954); malformed built-in Responses tool arguments return HTTP 400/clear errors instead of 500/AttributeError [PR #55974](https://github.com/vllm-project/vllm/pull/55974) · [PR #55540](https://github.com/vllm-project/vllm/pull/55540)

## 6. What This Means for Application Developers
- **Get fixes for sparse-attention-era models before relying on them.** Determinism problems in Qwen3.8-Flash-Next and lingering hybrid GDN/Mamba crashes mean you should validate `temperature=0` reproducibility and add crash-detection (exit-0 monitoring) before serving these architectures at scale.
- **PD disaggregation deployments on rolling releases must pin revisions** or risk silent KV mixing between prefill and decode replicas — upgrade then coordinate restarts.
- **Tool-calling correctness through `/v1/responses` is actively hardening** (Kimi K2, DSML, browser/container/code-interpreter tools), and error semantics are shifting from 500s to structured 400s. Pin a version that includes these patches if your app streams tool calls.
- **Ampere users still cannot run DeepSeek-V4-Flash/0731.** If you're on A100s, budget for migration or track #50576.
- **Prefix-cache + spec-decode on hybrid models can silently gut throughput** (30–40% loss); measure prefix-hit rates per repeat, not just first-turn TTFT.

*Data: vllm-project/vllm GitHub issues and PRs updated 2026-09-08/09.*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-09

*Based on sgl-project/sglang activity in the last 24h (through 2026-09-08).*

## 1. Today's Highlights

Fast engine recovery is the headline: the Weight Cache Daemon roadmap ([#33522](https://github.com/sgl-project/sglang/issues/33522)) reports Phase 1 landed in [#27139](https://github.com/sgl-project/sglang/pull/27139), cutting post-quantized weight load from ~306–327s to <1s for Qwen3-235B FP8. A root-cause fix is also in flight for the DFlash/DSpark TP>1 deadlocks ([#33549](https://github.com/sgl-project/sglang/issues/33549)) — default-deterministic top-p/top-k renorm in [#38565](https://github.com/sgl-project/sglang/pull/38565), which removes cross-rank sampling divergence. On the model side, main is converging on Qwen4/GNVFP4 mixed-precision support: NVFP4 MIXED_PRECISION loading for Qwen3.8-Flash-Next ([#38569](https://github.com/sgl-project/sglang/pull/38569)), MegaMoE wiring for Qwen MoE blocks ([#38080](https://github.com/sgl-project/sglang/pull/38080)), and DGX Spark/GB10 Qwen4 PLE offload ([#38570](https://github.com/sgl-project/sglang/pull/38570)).

## 2. Releases & Breaking Changes

None in the last 24 hours.

## 3. New Model & Hardware Support

- **Mamba 1/2 inference** support proposed —[#34556](https://github.com/sgl-project/sglang/pull/34556).
- **Qwen3.8-Flash-Next-NVFP4**: ModelOpt MIXED_PRECISION loading (NVFP4 routed experts, FP8 PLE n-gram table, FP8_BLOCK_SCALES MTP experts) —[#38569](https://github.com/sgl-project/sglang/pull/38569). Companion fix ensures PDL-launched routers wait on the bias dependency before loading —[#38568](https://github.com/sgl-project/sglang/pull/38568).
- **Qwen4 on GB10/DGX Spark**: file-backed PLE offload for the 47.7 GiB FP8 table so the ~126 GiB checkpoint fits on a single 128 GB device —[#38570](https://github.com/sgl-project/sglang/pull/38570).
- **MegaMoE** (`--moe-a2a-backend megamoe`) extended beyond DeepSeek-family blocks to Qwen MoE blocks (Qwen3.5-MoE, Qwen3-Next, …) with MXFP4 and NVFP4 experts —[#38080](https://github.com/sgl-project/sglang/pull/38080).
- **Domino**: optimized rollout (continuous-prefix acceptance, bonus tokens) added to DFlash V2 for public `Qwen3-8B-Domino-b16` —[#36899](https://github.com/sgl-project/sglang/pull/36899).
- **DP attention + LoRA** support (incl. DeepSeek-family) —[#36389](https://github.com/sgl-project/sglang/pull/36389).
- **ROCm**: the Aiter AllReduce fusion the logger already announced is now actually enabled —[#38345](https://github.com/sgl-project/sglang/pull/38345). The long-running AITER upgrade readiness tracker remains open ([#21302](https://github.com/sgl-project/sglang/issues/21302)).
- **Blackwell**: TRT-LLM DSv4 attention for SM100/103 is still in progress —[#30805](https://github.com/sgl-project/sglang/pull/30805). Note FlashInfer is not yet supported on Blackwell GPUs ([#35080](https://github.com/sgl-project/sglang/issues/35080)).

## 4. Performance & Optimization

- **Weight Cache Daemon (Phase 1)**: per-rank daemon holds post-quantized weights and serves them over CUDA IPC; weight load drops from ~306–327s to <1s on Qwen3-235B FP8 —[#33522](https://github.com/sgl-project/sglang/issues/33522).
- **Deterministic top-p/top-k renorm** by default in `sgl_kernel`, eliminating TP rank divergence behind DFlash/DSpark deadlocks and superseding rank-0 broadcast workarounds —[#38565](https://github.com/sgl-project/sglang/pull/38565).
- **Adaptive speculative decoding**: throughput-aware policy for cost-guided adaptive spec steps —[#28045](https://github.com/sgl-project/sglang/pull/28045). DFlash2 also gains dynamic verification per request/position instead of fixed-count batch verification —[#36136](https://github.com/sgl-project/sglang/pull/36136).
- **MSCCL++** now supports 8-node AllReduce/AllGather and MNVLS algorithms —[#37442](https://github.com/sgl-project/sglang/pull/37442).
- **Rust server + DP attention** reuses a node-local HTTP port range on multi-node deployments instead of allocating unique ports per node —[#34430](https://github.com/sgl-project/sglang/pull/34430).
- **Cache telemetry**: RadixCache/HiRadixCache now report KV age at hit/eviction plus lifetime and reuse count at eviction —[#38559](https://github.com/sgl-project/sglang/pull/38559).
- **Mamba prefix-cache checkpoints** now store the SSM state at the configured dtype instead of being pinned to bf16 —[#34820](https://github.com/sgl-project/sglang/pull/34820).
- Context-parallel prefill remains scoped to DSA models and MHA/GQA + FA3; the Q3 2026 roadmap tracks broader unification —[#21788](https://github.com/sgl-project/sglang/issues/21788).

## 5. Stability & Regressions

Ranked roughly by severity:

1. **Rust TreeCore (v0.5.19 opt-in) shows an e2e regression at concurrency** vs the Python TreeCore on a small dense model with short shared prefixes —[#38536](https://github.com/sgl-project/sglang/issues/38536). The opaque `NodeId` design also breaks the external-cache linker —[#37306](https://github.com/sgl-project/sglang/pull/37306).
2. **DeepSeek-V4 (DSV4 + DSPARK) TP8 decode hangs at ~245K context** on 8×H20, with GPUs pegged and the watchdog killing the server; deterministic sampling in [#38565](https://github.com/sgl-project/sglang/pull/38565) targets the root cause —[#33549](https://github.com/sgl-project/sglang/issues/33549).
3. **Qwen3.8-Flash-Next thinking + qwen3_coder tool parser loops on token ID 0** — high-priority correctness bug in a heavily used tool-calling path —[#36537](https://github.com/sgl-project/sglang/issues/36537).
4. **GLM-5.3-Flash + HiCache host-tier load-back corrupts generation** even without speculative decoding: dropped tool calls and degenerate repetition loops on 8×H100/TP8 —[#38031](https://github.com/sgl-project/sglang/issues/38031).
5. **Prefill breakable CUDA graphs hold break inputs only as weak refs**, so freed blocks are reused → wrong greedy outputs / illegal memory access —[#37606](https://github.com/sgl-project/sglang/issues/37606).
6. **GLM-5.2-NVFP4 + EAGLE** crashes with illegal memory access in the flashinfer_trtllm bf16 batched-GEMM used by nextn draft MoE —[#30209](https://github.com/sgl-project/sglang/issues/30209).
7. **DFLASH/DSPARK draft KV pool budgets use `tp_size` instead of `attn_tp_size`**, causing OOM with DP attention on Kimi-K3 —[#38202](https://github.com/sgl-project/sglang/issues/38202).
8. **TP2 hang on B300** combining HiCache, breakable prefill CUDA graphs, and FlashInfer MNNVL; public dummy-weight repro included —[#38300](https://github.com/sgl-project/sglang/issues/38300).
9. **CUDA illegal memory access in QSA extend** at ~8 concurrent requests on Qwen3.8-Flash-Next-FP8 (H20 TP8); suppressed by `CUDA_LAUNCH_BLOCKING=1` / `--disable-overlap-schedule` —[#37633](https://github.com/sgl-project/sglang/issues/37633).
10. **Disconnected streaming clients leave zombie requests** decoding to max_tokens and flooding "state was deleted in TokenizerManager" — regression from a revert of #34160 —[#36333](https://github.com/sgl-project/sglang/issues/36333).
11. **GLM-5.3-Flash cannot use FP8 KV cache on SM90** (`index_kpool: 4` excludes `flashmla_kv`; no DSA backend supports bf16-query × fp8-KV) —[#36830](https://github.com/sgl-project/sglang/issues/36830).
12. **`max_running_requests` (4096) vs `cuda_graph_max_bs` (32) defaults** make crossing the CUDA-graph ceiling an absorbing state —[#33483](https://github.com/sgl-project/sglang/issues/33483).

CI tracking shows 1 broken / 9 flaky tests on `main` (972 recently fixed) as of the last auto-update ([#17050](https://github.com/sgl-project/sglang/issues/17050)). The HiCache/prefill-CP livelock ([#38019](https://github.com/sgl-project/sglang/issues/38019)) is closed.

## 6. What This Means for Application Developers

- **Fast engine restart is becoming real**: sub-second weight load for a 235B FP8 model ([#33522](https://github.com/sgl-project/sglang/issues/33522)) changes economics for scale-from-zero, autoscaling, and P/D replica recycling — GPU idle reclaim no longer implies multi-minute cold starts.
- **GLM-5.3-Flash is not yet safe with HiCache / DP-attention combos** in production: silent generation corruption from host-tier load-back ([#38031](https://github.com/sgl-project/sglang/issues/38031)) and the draft-KV budget bug ([#38202](https://github.com/sgl-project/sglang/issues/38202)) argue for pinning known-good configurations until fixes land.
- **Qwen3.8-Flash-Next tool-mode deployments** should gate or monitor the thinking + parser path ([#36537](https://github.com/sgl-project/sglang/issues/36537)) and test concurrency under overlap scheduling ([#37633](https://github.com/sgl-project/sglang/issues/37633)) before rollout.
- **The deterministic sampling fix ([#38565](https://github.com/sgl-project/sglang/pull/38565))** removes an entire class of TP>1 speculative-decoding deadlocks — upgrade to a build containing it if you serve DeepSeek-V4/DSPARK long contexts.
- **Qwen4 FP4 on DGX Spark/GB10** is only viable with the PLE offload path in [#38570](https://github.com/sgl-project/sglang/pull/38570); without it the checkpoint does not fit on a single 128 GB device.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-09

**Activity:** 15 builds (`b10853`–`b10867`) landed in the last 24 h; 56 issues and 132 PRs updated. All links GitHub.

## 1. Today's Highlights

- **`b10867` fixes the lazy-tensor-loading regression on integrated GPUs.** Issue [#28160](https://github.com/ggml-org/llama.cpp/issues/28160) measured prefill throughput roughly **halved** (`pp512`) for a qwen4exp workload on AMD iGPU/Vulkan after the TENSOR_READ_LAZY change in [#27837](https://github.com/ggml-org/llama.cpp/issues/27837). The fix disables lazy loading on iGPUs in `auto` mode; the broader `large`/`all` mode redesign in [#28326](https://github.com/ggml-org/llama.cpp/pull/28326) was partially reverted to keep the change surgical.
- **New model support:** `b10853` adds Kimi-K3 recurrent-state rollback ([#28466](https://github.com/ggml-org/llama.cpp/pull/28466)), and PR [#28617](https://github.com/ggml-org/llama.cpp/pull/28617) fixes Nemotron 3 Super MTPv2 draft-head loading (two previously missing tensors).
- **Stability watch:** an RTX 5090 full-chip reset during Qwen3.8-27B Q6_K inference ([#27910](https://github.com/ggml-org/llama.cpp/issues/27910)) and a deterministic CUDA flash-attn illegal memory access with Qwen3.6 MoE + partial expert offload ([#26609](https://github.com/ggml-org/llama.cpp/issues/26609)) are the most severe unresolved reports.

## 2. Releases & Breaking Changes

- **`b10867`** — [PR #28326](https://github.com/ggml-org/llama.cpp/pull/28326): lazy tensor loading is now disabled by default in `auto` mode when an integrated GPU is detected. Behavior change applies to iGPU users only; discrete-GPU defaults are unchanged. Recommended update for Vulkan/Metal iGPU deployments.
- **`b10865`** — [revert #28604](https://github.com/ggml-org/llama.cpp/pull/28604) undoes the CUDA/HIP `prop.integrated` restoration from [#24233](https://github.com/ggml-org/llama.cpp/pull/24233). No rationale in the notes; HIP users should watch for iGPU-detection regressions.
- **`b10864`** — [PR #28302](https://github.com/ggml-org/llama.cpp/pull/28302): server checkpoint min-step eviction now fires only when the checkpoint list is full. Previously, prompts shorter than `checkpoint_min_step` could lose all later checkpoints due to over-aggressive spacing eviction.
- **`b10856`** — [PR #27764](https://github.com/ggml-org/llama.cpp/pull/27764): the 14 dedicated chat-template parsers moved out of `chat.cpp` into `common/parsers/`, mirroring the `src/models` split. Internal refactor, but worth regression-testing custom chat templates.
- **Minor build/correctness releases:** `b10859` missing-header compile fixes ([#28566](https://github.com/ggml-org/llama.cpp/pull/28566), closes [#28557](https://github.com/ggml-org/llama.cpp/issues/28557)/[#28559](https://github.com/ggml-org/llama.cpp/issues/28559)); `b10855` OpenCL conv2d non-contiguous stride handling ([#28503](https://github.com/ggml-org/llama.cpp/pull/28503)); `b10857` Vulkan-Hpp 32-bit handle fixes ([#22892](https://github.com/ggml-org/llama.cpp/pull/22892)).

## 3. New Model & Hardware Support

- **Kimi-K3 recurrent-state rollback** — [b10853](https://github.com/ggml-org/llama.cpp/releases/tag/b10853) / [#28466](https://github.com/ggml-org/llama.cpp/pull/28466): adds state-rollback support for Kimi-K3, relevant to speculative decoding and multi-turn backtracking on hybrid/recurrent architectures.
- **Nemotron 3 Super MTPv2** — [#28617](https://github.com/ggml-org/llama.cpp/pull/28617) (closed): draft-head loading previously created only 19 of 21 tensors; missing latent input/output projections are now created.
- **qwen4exp tensor split** — [#28569](https://github.com/ggml-org/llama.cpp/pull/28569) (open): proposes re-enabling `-sm tensor`, disabled earlier by [#27941](https://github.com/ggml-org/llama.cpp/pull/27941) after a PLE-layer scheduler assertion.
- **DFM Mimir 1B (HrmTextForCausalLM)** — [#27625](https://github.com/ggml-org/llama.cpp/pull/27625) (open): conversion + model support for an alternating two-stack recurrent architecture.
- **NVFP4 quantization** — [#22897](https://github.com/ggml-org/llama.cpp/pull/22897) (closed): adds the missing `LLAMA_FTYPE_MOSTLY_NVFP4` mapping for `llama-quantize` and emits per-tensor `.scale`/`.input_scale` tensors required by the CUDA MMA dequant path.
- **Build/platform support:** Windows ARM64 with MSVC `cl.exe` ([#28362](https://github.com/ggml-org/llama.cpp/pull/28362)) — removes the clang requirement for WoA builds.
- **Open feature requests with traction:** AMD XDNA backend ([#21725](https://github.com/ggml-org/llama.cpp/issues/21725), 32 👍), GLM5.3 flash-attention support ([#27922](https://github.com/ggml-org/llama.cpp/issues/27922), 14 👍), Metal multi-GPU on Intel Macs ([#28565](https://github.com/ggml-org/llama.cpp/issues/28565)), and an RFC for diffusion-model GGUFs (LTX-2 image/video/audio, [#28541](https://github.com/ggml-org/llama.cpp/issues/28541)).

## 4. Performance & Optimization

**Landed:**
- **Vulkan activation+MUL fusion** — [b10858](https://github.com/ggml-org/llama.cpp/releases/tag/b10858) / [#27220](https://github.com/ggml-org/llama.cpp/pull/27220): fuses UNARY(GELU|SIGMOID|SILU|SOFTPLUS) with MUL, removing dispatch overhead.
- **Metal iq3_xxs idle-thread fix** — [b10863](https://github.com/ggml-org/llama.cpp/releases/tag/b10863) / [#28086](https://github.com/ggml-org/llama.cpp/pull/28086): avoids half-idle SIMD groups when `ne00 < 1024` and dispatches a separate 8-row split kernel for small matrices.
- **iGPU prefill restore** — `b10867` closes the pp512 regression reported in [#28160](https://github.com/ggml-org/llama.cpp/issues/28160).

**In progress:**
- **Host-offloaded MoE decode** is host-bandwidth-bound; two complementary approaches are open: a GPU-resident LRU cache for recently used expert weights ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861)) and a lookahead H2D expert prefetcher via `--prefetch-experts-slots N` ([#28414](https://github.com/ggml-org/llama.cpp/pull/28414)).
- **Vulkan async copies** — [#28618](https://github.com/ggml-org/llama.cpp/pull/28618) proposes CPU writes in `ggml_backend_vk_cpy_tensor_async` when the context is idle, removing ~50 μs fence-wait overhead per cross-split copy.
- **HIP intrinsics** — [#28616](https://github.com/ggml-org/llama.cpp/pull/28616) replaces loop-based `__vsub4`/`__vcmpne4`/`__vcmpeq4` emulation with branch-free SWAR, and fixes incorrect saturating semantics in `__vsub4`.
- **Vulkan observability** — [#28101](https://github.com/ggml-org/llama.cpp/pull/28101) adds command-buffer debug labels so GPU profiler traces show which op each dispatch belongs to.
- **Perf issue to know:** [#27734](https://github.com/ggml-org/llama.cpp/issues/27734) — Vulkan decode throughput drops ~78% at 131k context on RX 7900 XTX due to suballocation fragmentation; workaround is `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`.

## 5. Stability & Regressions

Ranked by severity; fix PRs noted where they exist.

1. **RTX 5090 display loss / GSP full-chip reset** — [#27910](https://github.com/ggml-org/llama.cpp/issues/27910): Qwen3.8-27B Q6_K on CUDA triggers black screen and GPU reset after several requests. Reproduced through multiple frontends (Codex, DeepSeek Harness). Open.
2. **Deterministic CUDA illegal memory access in flash-attn** — [#26609](https://github.com/ggml-org/llama.cpp/issues/26609): Qwen3.6-35B MoE + partial expert offload, reproducible across builds (b10107 → b10243) in `cudaStreamSynchronize`; disappears with `-fa off`. Open.
3. **MTP inter-request state retention** — [#26425](https://github.com/ggml-org/llama.cpp/issues/26425): Qwen3.6-35B-A3B-MTP produces non-deterministic output and model degradation when MTP state leaks between requests (CPU + Vulkan). Open.
4. **Qwen2.5-Omni audio corruption on Metal** — [#28441](https://github.com/ggml-org/llama.cpp/issues/28441): silent audio corruption under system load on M5 Max (b10809). Open.
5. **Vulkan DeviceLost family:** Intel Arc A770 assert with Qwen3.8 flash ([#28247](https://github.com/ggml-org/llama.cpp/issues/28247)); Vega 8 iGPU device-lost at ~50k context ([#26447](https://github.com/ggml-org/llama.cpp/issues/26447)); `draft-mtp` device-lost mid-prompt on RADV gfx1151 ([#27306](https://github.com/ggml-org/llama.cpp/issues/27306)); ANV/Arc B580 scalar flash-attention fallback causing O(N²) degradation ([#27638](https://github.com/ggml-org/llama.cpp/issues/27638)).
6. **HIP/ROCm wrong logits on gfx1151** — [#28211](https://github.com/ggml-org/llama.cpp/issues/28211): incorrect results when prompt length exceeds `n_ubatch` on Strix Halo (RDNA 3.5). Open.
7. **SYCL/OpenCL multi-GPU crash** — [#27168](https://github.com/ggml-org/llama.cpp/issues/27168): `dev2dev_memcpy` hits unimplemented experimental P2P for the OpenCL adapter. Open.
8. **llama-server `fattn.cu:579` crash** — [#24440](https://github.com/ggml-org/llama.cpp/issues/24440): Gemma 4 31B with MTP + `-sm tensor` crashes after editing the system message. Open.
9. **Parallel tool-call mangling/hang** — [#28522](https://github.com/ggml-org/llama.cpp/issues/28522): multiple Qwen models mishandle parallel tool calls against a schema with ~48 optional parameters. Open.

**Closed/fixed today:** CUDA mmq build failure for compute capability 120 ([#18363](https://github.com/ggml-org/llama.cpp/issues/18363)); SYCL garbage on second prompt ([#26845](https://github.com/ggml-org/llama.cpp/issues/26845)); iGPU lazy-loading regression ([#28160](https://github.com/ggml-org/llama.cpp/issues/28160), fixed in `b10867`). In-flight fixes worth tracking: DeepSeek V3.2 DSML markup leaking into string tool arguments ([#28612](https://github.com/ggml-org/llama.cpp/pull/28612)), Jinja `in` operator with null left operand ([#28620](https://github.com/ggml-org/llama.cpp/pull/28620)), and context checkpoint preservation across slot save/restore ([#26004](https://github.com/ggml-org/llama.cpp/pull/26004)).

## 6. What This Means for Application Developers

- **Upgrade to `b10867`** if you serve on iGPUs or use server-side checkpoints: it restores prefill performance on AMD iGPU/Vulkan and fixes checkpoint over-eviction for short prompts (`b10864`).
- **Be cautious with MTP on Qwen3.6 MoE models.** [#26425](https://github.com/ggml-org/llama.cpp/issues/26425) shows silent non-determinism from inter-request state retention, and [#27306](https://github.com/ggml-org/llama.cpp/issues/27306) shows device-lost failures during prefill. If you serve these models, validate deterministic outputs or disable MTP until fixed.
- **CUDA + partial expert offload:** track [#26609](https://github.com/ggml-org/llama.cpp/issues/26609). Running with `-fa off` is the reliable workaround today; flash-attn with offloaded MoE experts is crash-prone.
- **Tool-calling apps with large/parallel tool schemas on Qwen:** parallel calls can be mangled or hang ([#28522](https://github.com/ggml-org/llama.cpp/issues/28522)). Consider serializing tool calls or simplifying schemas while this is unresolved.
- **Kimi-K3 and Nemotron 3 Super MTPv2** users get meaningful correctness fixes in today's builds (`b10853`, [#28617](https://github.com/ggml-org/llama.cpp/pull/28617)) — update before benchmarking these models.
- **Vulkan at long context:** if you hit the ~78% decode cliff near 131k context, the `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` environment variable is a proven workaround ([#27734](https://github.com/ggml-org/llama.cpp/issues/27734)).
- **Config semantics:** `--lazy-mode auto` now means "safe default for this system" rather than "lazy-load tensors >4 GiB" — relevant for anyone who set it explicitly on iGPU hardware.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

## Ollama Digest — 2026-09-09

### 1. Today's Highlights

No releases landed in the last 24 hours. The main focus is on agentic API correctness: new issues report **silent failures in `/v1/responses`**, including developer-role messages being dropped (`#18305`) and `tool_search` results never being offered to the model (`#18306`). On the backend side, work continues on GGUF metadata caching/unification and upstream llama.cpp/MLX version bumps.

### 2. Releases & Breaking Changes

No new releases or breaking API/config changes in the last 24 hours.

Upstream/infra bumps under review:

- [llama.cpp version bump b10864 #18317](https://github.com/ollama/ollama/pull/18317)
- [MLX version bump #18235](https://github.com/ollama/ollama/pull/18235)

### 3. New Model & Hardware Support

Mostly backends/runners rather than new model architecture support:

- [mlxrunner: support Qwen static YaRN contexts #18263](https://github.com/ollama/ollama/pull/18263) — Adds Qwen3.5/3.8 static YaRN metadata parsing, applies YaRN to text RoPE and multimodal M-RoPE, and allows context windows up to `factor * original_max_position_embeddings`.
- [mlxrunner: honor explicit context without overriding soft sizing #18285](https://github.com/ollama/ollama/pull/18285) — Preserves automatic soft-context behavior for VRAM sizing; sends `--ctx-size` only when `num_ctx` is explicitly requested.
- [create: add server-side MLX imports and drop GGUF conversion #14969](https://github.com/ollama/ollama/pull/14969) — Adds safetensors/MLX create support on server-side; limits GGUF create to wrapping existing GGUF inputs.
- [server: extract GGUF metadata and unify capabilities #17858](https://github.com/ollama/ollama/pull/17858) — Reduces repeated GGUF metadata reads and makes capability detection consistent across model paths.

### 4. Performance & Optimization

- [server: extract GGUF metadata and unify capabilities #17858](https://github.com/ollama/ollama/pull/17858) — Caches extracted GGUF metadata once per blob under `<OLLAMA_MODELS>/metadata/`, reducing expensive repeated metadata loads and fixing inconsistent runner capability results.
- [mlx: scope array lifetimes instead of pinning and sweeping #18327](https://github.com/ollama/ollama/pull/18327) — Fixes unbounded memory accumulation in the MLX prefix cache and avoids repeated KV snapshot copies. No concrete benchmark numbers were included.
- [api: expose projected context length in model details #17663](https://github.com/ollama/ollama/pull/17663) — Improves client-side visibility into context sizing; currently bucket-based but designed for future estimation improvements from the MLX runner.

### 5. Stability & Regressions

Issues filed/updated today, ranked roughly by severity:

- [openai: `/v1/responses` silently drops developer-role input items #18305](https://github.com/ollama/ollama/issues/18305) — Returns `200` with `status: completed`, but developer-role content never reaches the model. This is a silent correctness bug for agentic workloads.
- [Responses API: `tool_search` tools never offered to model #18306](https://github.com/ollama/ollama/issues/18306) — Tools located by a client-side `tool_search` are visible as text in the result but are not callable by the model. Affects Codex CLI/MCP-style integrations.
- [Cloud: glm-5.3 can enter endless reasoning and abort tasks #18193](https://github.com/ollama/ollama/issues/18193) — Seen with Ollama Cloud in OpenCode and ZCode; official Z.AI API behaves correctly.
- [gemma3:12b structured output truncates on quoted input #18094](https://github.com/ollama/ollama/issues/18094) — `/api/generate` with JSON-schema `format` stops early when source text contains escaped double-quoted terms.
- [500 "no user query found in messages" for tool-only turns #18303](https://github.com/ollama/ollama/issues/18303) — Filed and closed today; likely duplicates the open [Qwen3.8 tool-loop 500 issue #17778](https://github.com/ollama/ollama/issues/17778).
- [Qwen3.8 / tool agent loop returns 500 #17778](https://github.com/ollama/ollama/issues/17778) — Chat/API streaming fails with `no user query found in messages` after models call tools repeatedly without a user text turn.
- [ROCm: missing `TensileLibrary_lazy_gfx1200.dat` on RX 9060 XT #17782](https://github.com/ollama/ollama/issues/17782) — AMD backend load failure after some runtime.
- [Qwen3.8-27B GSQ-RCO-GGUF IQ3_S returns empty content #18297](https://github.com/ollama/ollama/issues/18297) — Generation completes with `done_reason: stop`, but `content` is empty.

Notable fix PRs in flight:

- [template: preserve developer instructions in Go templates #18315](https://github.com/ollama/ollama/pull/18315) — Normalizes developer messages to system messages for Go-template rendering; likely addresses the silent developer-message loss in #18305.
- [server: retry compaction after context overflow #18324](https://github.com/ollama/ollama/pull/18324) — Retries summarization compaction after reducing the oldest removable transcript text.
- [openai: use `tsc_` prefix for tool search call IDs #18296](https://github.com/ollama/ollama/pull/18296) — Fixes Codex conversation validation errors when switching to OpenAI models.
- [model/parsers: preserve multiline FunctionGemma tool arguments #18322](https://github.com/ollama/ollama/pull/18322) — Fixes tool calls with newline-containing string arguments being lost.
- [fix data races in progress and sched #18319](https://github.com/ollama/ollama/pull/18319) — Fixes races in progress rendering and scheduler unload logging.
- [anthropic: `output_config.effort` without thinking disables thinking #18326](https://github.com/ollama/ollama/pull/18326) — Corrects Anthropic endpoint behavior when effort is set but no thinking block is present.

### 6. What This Means for Application Developers

- **Be careful with `/v1/responses` today.** Developer-role messages and tool-search-loaded tools may silently disappear from model-visible context. Work is in progress, but until #18305/#18306 land, prefer `system`/`user` roles where possible and validate tool definitions are actually presented to the model.
- **Tool-only turns remain a failure point.** If your agent loop sends an assistant `tool_use` turn plus a tool-result message and no user text, Ollama’s compatibility endpoints may return the `500 no user query found in messages` error. Consider retaining a lightweight user turn or monitoring for fixes around #17778/#18303.
- **Structured output on Gemma is not fully reliable with escaped text input**. If you rely on JSON-schema `format` for Gemma models, add regression tests around double quotes in source content.
- **MLX users should watch Qwen YaRN and context-length changes.** The open MLX PRs add long-context support for Qwen models and more sensible explicit-vs-soft context handling, but neither has landed yet.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

**LiteLLM Digest — 2026-09-09**

**Today’s Highlights**

Activity in the last 24h is dominated by proxy correctness and hardening rather than new releases: two reports describe auth-failure responses leaking key hashes, backend internals, and model allowlists ([#40217](https://github.com/BerriAI/litellm/issues/40217), [#39757](https://github.com/BerriAI/litellm/issues/39757)), while budget/rate-limit enforcement shows three open defects ([#40095](https://github.com/BerriAI/litellm/issues/40095), [#34140](https://github.com/BerriAI/litellm/issues/34140), [#24677](https://github.com/BerriAI/litellm/issues/24677)). Streaming translation across Anthropic/OpenAI/Codex protocols remains the most active bug area, with dropped tool-call IDs/arguments and encrypted reasoning cache content ([#39796](https://github.com/BerriAI/litellm/issues/39796), [#27144](https://github.com/BerriAI/litellm/issues/27144), [#39339](https://github.com/BerriAI/litellm/issues/39339)). On performance, two PRs attack event-loop stalls from blocking tokenizer/template/image fetches ([#40311](https://github.com/BerriAI/litellm/pull/40311), [#40186](https://github.com/BerriAI/litellm/pull/40186)), and retry-policy handling now excludes the refusing deployment across all router entrypoints ([#40306](https://github.com/BerriAI/litellm/pull/40306)).

**Releases & Breaking Changes**

No new LiteLLM releases published in the last 24h. Closed/landed PRs with user-visible impact:

- OTel v2 now honors `OTEL_EXPORTER_OTLP_PROTOCOL=http/json` (previously accepted but still sent protobuf), fixing incompatibility with JSON-only collectors (e.g., Splunk HEC) ([#40290](https://github.com/BerriAI/litellm/pull/40290)).
- Policy-engine `post_call` guardrail pipelines now execute on responses and streams, with accurate success headers ([#38721](https://github.com/BerriAI/litellm/pull/38721)); a follow-up teaches legacy post-call hooks to run as streaming pipeline steps ([#40284](https://github.com/BerriAI/litellm/pull/40284)).
- New bulk endpoint `PATCH /v2/team/{team_id}/members`, with membership-cache invalidation after batched writes ([#32958](https://github.com/BerriAI/litellm/pull/32958)).
- Model lifecycle: explicit `null` on `PATCH /model/{id}/update` now clears fields (cost, pinned `max_input_tokens`, `mode`) instead of being silently dropped ([#40047](https://github.com/BerriAI/litellm/pull/40047)); same null-handling fix for MCP toolset updates ([#40022](https://github.com/BerriAI/litellm/pull/40022)).

**New Model & Hardware Support**

No confirmed model/hardware additions this cycle. In the queue: official QwenCloud provider as the international migration path for the existing DashScope provider ([#36150](https://github.com/BerriAI/litellm/issues/36150)), and vLLM `/v1/realtime` endpoint passthrough ([#23102](https://github.com/BerriAI/litellm/issues/23102)). Note: OpenAI `gpt-6-astra` is reachable, but model-family helpers don’t recognize the gpt-6 family, so legacy `max_tokens` is rejected — use `max_completion_tokens` for now ([#40279](https://github.com/BerriAI/litellm/issues/40279)).

**Performance & Optimization**

- **Off-event-loop template/image fetches** ([#40311](https://github.com/BerriAI/litellm/pull/40311)): Anthropic direct-HTTP images, Vertex AI Anthropic forced-base64, Ollama images, and HF templates were doing blocking HTTP on the event loop; a burst of slow image URLs could stall unrelated text requests.
- **GIL release for exact token counting** ([#40186](https://github.com/BerriAI/litellm/pull/40186)): a 600k-token count on the Claude tokenizer held the GIL for up to ~0.7 s, starving the event loop even though counting ran on a worker thread. Also caps exact counting per string and skips counting failed requests for spend records.
- **Retry-policy deployment exclusion** ([#40306](https://github.com/BerriAI/litellm/pull/40306)): retries now move off the deployment that just refused on every router entrypoint (embeddings, images, speech, transcription, rerank, batches, adapters) — previously only chat completions and the generic API helper remembered the failure.
- **Budget/DB sequencing** ([#40310](https://github.com/BerriAI/litellm/pull/40310)): budget reservation reconcile now runs before the spend row is enqueued, closing a race where a reseed plus settled cost double-counted one request.

**Stability & Regressions**

Ranked by severity, all open unless noted:

1. **Auth error leaks internals (no fix PR yet).** Wrong-key 401 responses disclose backend software identity, DB table name, and the SHA-256 hash of the submitted key ([#39757](https://github.com/BerriAI/litellm/issues/39757)). A second report shows the 401 echoes the stored key hash and the 403 returns the key’s full model allowlist to an under-authorized caller ([#40217](https://github.com/BerriAI/litellm/issues/40217)). Data-exposure risk on internet-facing proxies.
2. **Budget bypass on concurrent first requests.** With custom auth, `custom_auth_run_common_checks`, and `max_end_user_budget_id`, simultaneous first requests for an unknown end user bypass the default budget entirely ([#40095](https://github.com/BerriAI/litellm/issues/40095)).
3. **Rate-limit enforcement wrong in both directions.** v3 rate limiter double-counts team per-model limits, returning 429 at roughly N/2 of the configured N ([#34140](https://github.com/BerriAI/litellm/issues/34140)). The virtual-key TPM limiting bug is still reproducible in v1.82.3 despite being previously marked fixed ([#24677](https://github.com/BerriAI/litellm/issues/24677)).
4. **Streaming tool-call corruption in protocol bridges.** Re-chunker drops `tool_calls[].id` and `function.name` when an OpenAI-compatible upstream sends a complete tool_call in one delta ([#39796](https://github.com/BerriAI/litellm/issues/39796)). Codex Responses streaming drops accumulated function-call args when `function_call_arguments.done` arrives without preceding deltas ([#27144](https://github.com/BerriAI/litellm/issues/27144)). Anthropic streaming `tool_use` can be lost before internal tool-call chunks ([#36262](https://github.com/BerriAI/litellm/issues/36262)).
5. **Reasoning cache/content breaks across bridges and routes.** Anthropic `/v1/messages` → OpenAI Responses bridge drops `encrypted_content`, so prompt cache never carries forward ([#39339](https://github.com/BerriAI/litellm/issues/39339)). Complexity auto-router can migrate follow-ups containing `encrypted_content` across model groups ([#40237](https://github.com/BerriAI/litellm/issues/40237)).
6. **Bedrock managed files cannot be deleted.** `DELETE /v1/files/{id}` 500s with “BedrockFilesConfig does not support file deletion” ([#39715](https://github.com/BerriAI/litellm/issues/39715)).
7. **Compatibility regressions.** `gpt-6-astra` rejects `max_tokens` ([#40279](https://github.com/BerriAI/litellm/issues/40279)). System-role entries inside Anthropic `messages[]` are silently dropped ([#36917](https://github.com/BerriAI/litellm/issues/36917)). OpenAI `input_audio` content blocks crash `token_counter`, silently disabling context-window/cache pre-checks and 500ing `/utils/token_counter` ([#38459](https://github.com/BerriAI/litellm/issues/38459)). SearXNG adapter converts upstream HTTP 429/503 into a successful empty result, hiding provider outages ([#38628](https://github.com/BerriAI/litellm/issues/38628)).
8. **Infra/config.** Azure Entra Redis auth can’t start the proxy in cluster mode — `init_redis_cluster` has no credential-provider path ([#37726](https://github.com/BerriAI/litellm/issues/37726)). SSO payloads with multiple Entra app_roles only honor the first ([#33434](https://github.com/BerriAI/litellm/issues/33434)).

**What This Means for Application Developers**

- Be cautious with Anthropic (Claude Code) → OpenAI reasoning-model routes: encrypted reasoning content and prompt cache are not yet preserved across the bridge, and complexity routing can strand follow-ups on the wrong model group ([#39339](https://github.com/BerriAI/litellm/issues/39339), [#40237](https://github.com/BerriAI/litellm/issues/40237)).
- If your application depends on streaming agentic tool calls through LiteLLM, add explicit regression tests — cross-protocol streaming still drops tool-call IDs/names and arguments in several shapes ([#39796](https://github.com/BerriAI/litellm/issues/39796), [#27144](https://github.com/BerriAI/litellm/issues/27144)).
- Don’t size capacity against team per-model rate limits: double-counting produces 429s at roughly half the configured value, and virtual-key TPM limits are still unreliable ([#34140](https://github.com/BerriAI/litellm/issues/34140), [#24677](https://github.com/BerriAI/litellm/issues/24677)).
- For internet-exposed proxies, treat 401/403 bodies as a disclosure channel until the leaks in [#40217](https://github.com/BerriAI/litellm/issues/40217) and [#39757](https://github.com/BerriAI/litellm/issues/39757) are fixed; consider edge-layer sanitization in the meantime.
- The end-user budget bypass on concurrent first requests ([#40095](https://github.com/BerriAI/litellm/issues/40095)) means default budgets should be set conservatively; watch for the spend-reconciliation fix ([#40310](https://github.com/BerriAI/litellm/pull/40310)) to land.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-09

Source: [unslothai/unsloth](https://github.com/unslothai/unsloth)

## 1. Today's Highlights

[unsloth v0.1.807-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.807-beta) switches AMD to Vulkan by default (~20% faster prefill/decode vs ROCm), signs the Windows `llama-server.exe` to reduce Smart App Control false positives, and fixes AMD gibberish output on Strix/iGPUs. In parallel, a large batch of Studio hardening PRs landed for review: per-account isolation on shared GPU boxes ([#10375](https://github.com/unslothai/unsloth/pull/10375)), OS-level sandboxing for Python/Terminal tools ([#10526](https://github.com/unslothai/unsloth/pull/10526)), and an event-loop offload for document uploads ([#10552](https://github.com/unslothai/unsloth/pull/10552)). Triage is also active: 42 issues were updated and many long-running reports (offline install, Qwen3-omni, slow imports, tokenizer bugs) were closed in the last 24 hours.

## 2. Releases & Breaking Changes

- [v0.1.807-beta — "Large Perf Improvements + Fixes"](https://github.com/unslothai/unsloth/releases/tag/v0.1.807-beta)
  - AMD now uses Vulkan by default: ~20% performance boost for prefill and decoding versus ROCm.
  - Windows `llama-server.exe` is now signed, reducing antivirus/Smart App Control false positives.
  - AMD gibberish-output issues on Strix and iGPUs fixed in upstream (release note text truncated in source).
  - Behavioral note: the default AMD compute path changes from ROCm to Vulkan. The release notes do not mention a ROCm opt-out or migration flag.

Notable issue closures (no migration impact confirmed): [#10356](https://github.com/unslothai/unsloth/issues/10356) (offline Desktop install request), [#10449](https://github.com/unslothai/unsloth/issues/10449) (`unsloth studio update` hitting the GitHub API too hard).

## 3. New Model & Hardware Support

No brand-new model architectures were announced in this window, but the following model/hardware topics were active:

- [Qwen3-omni TTS voice cloning support](https://github.com/unslothai/unsloth/issues/3636) — long-standing feature request closed (Qwen2.5-omni was already supported).
- [Gemma 4 base models missing `<bos>` in tokenizer config](https://github.com/unslothai/unsloth/issues/7903) — closed.
- [Wan2.2 TI2V video generation OOM on AMD RX 9060 XT](https://github.com/unslothai/unsloth/issues/10415) — closed; root issue was missing fused attention kernel on AMD, falling back to PyTorch SDPA math backend.
- [AMD Radeon 6950 XT support question](https://github.com/unslothai/unsloth/issues/10468) — closed.
- [MiCA (Minor Component Adaptation) support in `FastLanguageModel.get_peft_model()`](https://github.com/unslothai/unsloth/issues/6730) — still open, with 4 👍; would pair with LoRA-compatible init merged in HF PEFT.
- [GGUF picker hiding duplicate quants (e.g., plain vs `-mtp` builds)](https://github.com/unslothai/unsloth/pull/10556) — fix in review so both builds are selectable.

## 4. Performance & Optimization

- **20% AMD perf boost**: Vulkan is now the default AMD backend in v0.1.807-beta — measured for both prefill and decoding vs ROCm ([release](https://github.com/unslothai/unsloth/releases/tag/v0.1.807-beta)).
- **Slow imports (60s+) fixed**: [#1859](https://github.com/unslothai/unsloth/issues/1859), root-caused to `PatchFastRL` when importing via entry points, is closed as fixed-pending-confirmation.
- **Document uploads off the event loop**: [#10552](https://github.com/unslothai/unsloth/pull/10552) — copy/hash/embedder-probe previously ran inline on async routes, so large uploads froze the whole backend mid-stream; handlers never awaited.
- **KV preemption handed to llama-server**: [#10358](https://github.com/unslothai/unsloth/pull/10358) — when the launched llama-server can park slots in host RAM itself (`--preempt-ram`, unslothai/llama.cpp#184/#190), Studio disables its own preemption so each chat can use the full context window. Open PR, stacked on [#10301](https://github.com/unslothai/unsloth/pull/10301).
- **Accurate local-model sizing**: [#10558](https://github.com/unslothai/unsloth/pull/10558) — Studio previously summed every weight file (duplicate `original/` copies, `optimizer.pt`), skewing VRAM estimates; now sizes by one copy of weights.
- **Startup timeout hardening**: [#10550](https://github.com/unslothai/unsloth/pull/10550) and [#10551](https://github.com/unslothai/unsloth/pull/10551) keep `unsloth start` alive while a LoRA base model downloads and allow polling a server that never prints the early API key line.

## 5. Stability & Regressions

**Open regressions (highest severity first):**

- **[#7485 — Latest llama.cpp build broke AMD GPU detection](https://github.com/unslothai/unsloth/issues/7485)** — OPEN. AMD ROCm (gfx1201) GPUs no longer detected after a fresh install; no fix PR visible yet. AMD users should pin/verify their llama.cpp version before upgrading.
- **[#10544 — Windows: conversation recall order is not total when two turns land in one clock tick](https://github.com/unslothai/unsloth/issues/10544)** — OPEN. Test failure shows order `['1', '2', '4', '3', '5']` instead of sorted; authored by danielhanchen, so likely on the core team's radar.
- **[#10338 / #10339 / #10337 — AMD ROCm Studio state bugs](https://github.com/unslothai/unsloth/issues/10338)** — OPEN. On Radeon PRO W7900/W7500: "Switch Back" reloads a model with 4096 context, unloading via the red circle errors, and per-chat token counts are not counted again.
- **[#10479 — Model hallucinates a tool-call budget](https://github.com/unslothai/unsloth/issues/10479)** — OPEN. Qwen 3.8 Flash Next starts "conserving" tool calls after ~20, despite "Max Tool Calls Per Message" = Max.
- **[#10176 — KV admission uncapped-cap exemption is wider than intended](https://github.com/unslothai/unsloth/issues/10176)** — OPEN. Requests carrying `tools` bypass the uncapped-token retry logic entirely.
- **[#10529 — Unanchored link definition probe escalates replies to the full-document render path](https://github.com/unslothai/unsloth/issues/10529)** — OPEN.
- **[#10460 — Windows parity test failure: non-ASCII marker rollback](https://github.com/unslothai/unsloth/issues/10460)** — OPEN. Pre-existing red CI lane (2 failed / 670 passed / 9 skipped), both PowerShell and pwsh.

**Fix PRs in review:**

- [#10494 — Repair a quarantined llama.cpp runtime at launch](https://github.com/unslothai/unsloth/pull/10494) — antivirus/Smart App Control quarantine currently only surfaces at model-load time; this repairs the install at startup instead.
- [#10430 — Stop quit-during-model-load from orphaning `llama-server`](https://github.com/unslothai/unsloth/pull/10430) — follow-up to #10369; the crash is fixed but the orphaned server process remained.
- [#10471 — Uninstaller fixes](https://github.com/unslothai/unsloth/pull/10471) — ownership gate stranded older installs; also could delete directories that are not Unsloth's.
- [#10473 — Name unopenable AMD device nodes](https://github.com/unslothai/unsloth/pull/10473) — `/dev/kfd` and `/dev/dri/renderD*` can exist but be mode 0660; account outside `render` group is currently read as "no GPU." Closes [#10466](https://github.com/unslothai/unsloth/issues/10466).
- [#10557 — Report Claude replies cut off by context window as `truncated`](https://github.com/unslothai/unsloth/pull/10557) — Anthropic's stop reason fell through to "stop", so clipped replies rendered as finished and API clients got the wrong `finish_reason`.
- [#10553 — Apply EXIF orientation to uploaded images](https://github.com/unslothai/unsloth/pull/10553) — backend decoded raw pixels while preview honored rotation; inpaint masks were drawn at wrong coordinates.
- [#10561 — RAG scope retirement by folder identity](https://github.com/unslothai/unsloth/pull/10561) — timestamp-based retirement is racy on Windows; fixes `Uploads (windows-latest)` failure.
- [#10560 — Avoid hidden PowerShell arguments in CLI](https://github.com/unslothai/unsloth/pull/10560) — `-WindowStyle Hidden` + `-ExecutionPolicy Bypass` pairing matches a Microsoft AV detection signature.
- [#10555 — Keep LoRA rank/alpha/variant when leaving CPT](https://github.com/unslothai/unsloth/pull/10555) — switching to Continued Pretraining and back silently reset rank 8 → 16 and dropped user values.
- [#10515 — Test hygiene: `read_text()` without encoding](https://github.com/unslothai/unsloth/issues/10515) — CLOSED; also [#10516](https://github.com/unslothai/unsloth/issues/10516) (OPEN, `UNSLOTH_PYTORCH_MIRROR` query-token concatenation) and [#10505](https://github.com/unslothai/unsloth/pull/10505) (CLOSED, compare-pane settings recovery).

**Notable closures during triage:** [#4846](https://github.com/unslothai/unsloth/issues/4846) (Windows `Access denied` on `llama-server.exe` after elevated install), [#1859](https://github.com/unslothai/unsloth/issues/1859) (slow imports), [#10415](https://github.com/unslothai/unsloth/issues/10415) (Wan2.2 AMD OOM), [#10436](https://github.com/unslothai/unsloth/issues/10436) (date prompt overriding remote Ollama system prompt), [#10400](https://github.com/unslothai/unsloth/issues/10400) (keyless auth with empty bearer), [#6528](https://github.com/unslothai/unsloth/issues/6528) (diffusiongemma error).

## 6. What This Means for Application Developers

- **AMD GPU serving**: upgrade to v0.1.807-beta for the default Vulkan path and ~20% prefill/decode gains, but watch [#7485](https://github.com/unslothai/unsloth/issues/7485) — the latest upstream llama.cpp build can break AMD detection entirely; keep your llama.cpp/runtime pinned until resolved.
- **Windows/Studio deployments**: the signed `llama-server.exe` plus PR [#10494](https://github.com/unslothai/unsloth/pull/10494)'s self-healing quarantine logic meaningfully reduce Smart App Control/AV friction. If you run Studio from an elevated install as a normal user, verify #4846 is fixed on your version.
- **Agent/tool-calling apps**: three items matter: (1) MCP tool images will finally reach the model instead of being hallucinated — [#10088](https://github.com/unslothai/unsloth/pull/10088); (2) beware of models self-imposing tool-call budgets even when uncapped — [#10479](https://github.com/unslothai/unsloth/issues/10479); (3) the tool UI grammar fix ("Using tool" vs "Used tool") is small but improves streamed tool-call UX — [#10470](https://github.com/unslothai/unsloth/issues/10470).
- **Shared/rented GPU infrastructure**: [#10375](https://github.com/unslothai/unsloth/pull/10375) (per-account isolation) and [#10526](https://github.com/unslothai/unsloth/pull/10526) (bubblewrap/Seatbelt sandboxing for Python and Terminal tools) are the two PRs to track if you expose Unsloth Studio to multiple tenants — today's Python/Terminal tools run on the host behind software safeguards only.
- **Inference correctness**: if you proxy Anthropic-compatible replies, watch for the `finish_reason` truncation fix in [#10557](https://github.com/unslothai/unsloth/pull/10557); truncated generations are currently indistinguishable from complete ones.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*