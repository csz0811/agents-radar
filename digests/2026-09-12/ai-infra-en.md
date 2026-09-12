# AI Infrastructure Digest 2026-09-12

> Generated: 2026-09-12 00:36 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Comparison — 2026-09-12

## 1. Ecosystem Overview

Today's activity is defined by DeepSeek-V4.1 becoming the common target of the serving-engine race: vLLM is landing a coordinated pipeline/sequence-parallel PR set while SGLang proposes full V4.1 support in a single PR covering quantization, HiCache, NPU and JIT kernels. Underneath that headline, the most consequential work is defensive — speculative decoding (DFlash2/DSpark/MTP) and tool-calling parsers are generating independent correctness failures across every layer, from engines to gateways to local runtimes. Stability debt is broad: vLLM 0.28/0.29 carries an unresolved host-memory freeze, Ollama 0.34.0 wedges on cloud models after ~45 minutes, and LiteLLM is still digesting a PyPI supply-chain incident. Meanwhile hardware coverage continues to fragment outward — ROCm/RDNA4, Blackwell SM120, NPU, ARM64 and Apple MLX are all in active bring-up, and no project shipped a stable release today.

## 2. Activity Comparison

| Project | Layer | Issues (24h) | PRs (24h) | Releases (24h) | Current channel / deployment risk |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | n/r (top thread #27433: 92 comments) | n/r (coordinated DSv4.1 PR set) | **0** | 0.28.0/0.29.0 host-memory freeze; **0.27.1 = known good** |
| **SGLang** | Serving engine | n/r (coredump tracker #26340: 298 comments) | n/r (#38798 DSv4.1) | **0** | Mainline only; no version pinning signal |
| **llama.cpp** | Local runtime | **76 updated** | **120 updated** | **8** (b10902–b10917) | Nightly cadence; **MSVC users → b10917** |
| **Ollama** | Local runtime / CLI | n/r | n/r (#16590 manifest lists) | **0** | 0.34.0 cloud wedge; **0.33.1 = fallback** |
| **LiteLLM** | Gateway | **47 updated** | **304 updated** | **1 dev** (v1.102.0-dev.2) | Dev pre-release; cosign verify required |
| **Unsloth** | Training / fine-tuning | n/r | n/r (multi-PR fix wave) | **0** | Package `2026.9.4` breaks `max_seq_length` configs |

*Note: several digests do not publish aggregate issue/PR counts; "n/r" indicates not reported. Where counts are absent, qualitative volume is inferred from tracked-thread and PR activity.*

**Read:** LiteLLM and llama.cpp publish the highest raw throughput (304 PRs / 120 PRs), consistent with their shallow, high-churn change surfaces. The serving engines move in smaller, deeper units of work — a single vLLM PR can span PP stage boundaries, and a single SGLang PR can carry an entire model family. Only llama.cpp ships continuously (8 builds/day); the rest are on staged or dev channels.

## 3. Model Support Race

**DeepSeek-V4.1 is the decisive battleground, and it is effectively a tie with different shapes:**

- **vLLM** is landing it incrementally and hardware-deep: SP stage boundaries and cross-PP cache/index relay (#56438/#56439/#56437), ROCm AITER mHC for the delayed pre block (#56503), KV-only context insertion across `fp8_ds_mla`/BF16/FP8 cache formats (#56441), and Engram lookup overlap gating (#56436). Its differentiation is **ROCm kernel depth**.
- **SGLang** proposes it in one comprehensive PR (#38798) that bundles docs, quant, HiCache, NPU, JIT-kernel and memory-pool implications, with packed FP4 KV on Hopper tracked separately (#38902). Its differentiation is **breadth per PR, plus NPU and FP4-KV roadmap ownership**.

**Elsewhere:**

| Project | New support today | Position |
|---|---|---|
| **vLLM** | DSv4.1 PP/SP, W4A16 MoE on gfx942/950, DFlash2/DSpark spec-decode, Gemma4 MTP fix | **Ahead on spec-decode diversity + ROCm** |
| **SGLang** | DSv4.1 (#38798), SenseNova-U1/U1.5 LoRA, GLM-5.3-Flash SM120, AMD RDNA3/4, Qwen3-VL, Qwen-Image-Edit | **Ahead on NPU, FP4 KV, multimodal serving** |
| **llama.cpp** | MTP KV alloc for DeepSeek2/GLM4-MoE/Cohere2-MoE, RDNA4 `gfx1201` FA, Ling 3.0 parser, Nemotron-H guard | **Broad but GGUF-local; GLM5.3 still unsupported (#27922)** |
| **Ollama** | Gemma3n/Gemma3 projector placement; Hy4 and `deepseek-v4.1-flash` are *requests*, not support | **Lagging — consuming upstream, not racing** |
| **LiteLLM** | 218 models updated / 27 new; GitGot + Prism providers | **Provider-catalog layer, not architecture layer** |
| **Unsloth** | FLUX.2 Klein, Gemma-4-12B QAT GGUF, MLX certification | **Fine-tuning/export reach** |

**Verdict:** vLLM and SGLang are co-leaders; vLLM wins on kernel and parallelism primitives, SGLang on model-family completeness and novel hardware (NPU, FP4 KV). llama.cpp is the fastest to absorb *architectural* changes that fit GGUF. Ollama is a downstream consumer and its model gap is widening.

## 4. Performance Frontier

Optimization effort is concentrated in six clusters:

1. **KV cache economics — the top theme.** SGLang owns the most: distributed KVCache for agentic workloads (#21846), KV-canary workspace accounting (#38596, ~1 GB unaccounted OOMs), hybrid SWA page freeing (#38159), NVFP4 KV (#29913). vLLM counters with KV-only context insertion (#56441), DCP effective block size (#56538), and prefix-cache miss fixes (#52244/#56404). llama.cpp exposes the worst failure mode here: **4-bit KV on CUDA silently falls back to CPU prefill (~30× slowdown, #28633).**
2. **Kernels.** llama.cpp consolidated Metal fusion into one declarative table (b10909) and fixed idle threads in six IQ `mul_mv` kernels (b10908); SGLang restored a **10×+ Mamba2 prefill loss** via Triton autotune (#39130); vLLM fused DFlash2 grouped conv (#55960) and profiled AWQ CUDA GEMM as L1/memory-bound (#55462).
3. **Quantization.** vLLM: W4A16 MoE, MXFP4, FP8 MoE on SM120 (currently broken). SGLang: packed FP4 KV, QSA packed-varlen decode. llama.cpp: IQ garbage output on Blackwell `sm_120` (#28784), opt-in Q4_K P6/VNNI (#28791).
4. **Distributed serving.** vLLM PP/SP boundaries + topology-aware EPLB (#31671) + Elastic EP CUDA-graph reuse (#54985). SGLang: DCP for GLM-5.3 decode (#39117), PD replay (#39151), DeepGEMM MegaMoE (#38700).
5. **Batching & scheduling.** vLLM's long-prefill starvation (#54919) and the ~2× structured-output decode regression (#49013, closed/bisected) are its two biggest throughput caveats. SGLang's DP health-check routing perturbation (#35241) collapses long-prefill throughput — a self-inflicted scheduling wound.
6. **Memory residency & offloading.** vLLM's incremental MoE expert offloading (#38256) targets models exceeding VRAM; Unsloth's Windows GGUF residency fix (#10618) is the same problem at the local-runtime layer.

**Pattern:** KV-cache memory accounting is now the dominant source of both OOMs and silent slowdowns — and most of it is *unlogged*.

## 5. Layer Positioning

| Layer | Projects | What they own | Failure blast radius |
|---|---|---|---|
| **Serving engine (datacenter)** | vLLM, SGLang | Throughput, PP/SP/EP, spec-decode, quantized KV, multi-node | Cluster-wide; silent correctness (ROCm GLM 91.6%→14.9%) |
| **Local / edge runtime** | llama.cpp, Ollama | Single-node GGUF, consumer GPUs, Metal/Vulkan/OpenCL | Per-user; garbage output, CPU fallback |
| **Gateway / control plane** | LiteLLM | Routing, cost, auth, provider normalization, caching policy | Request-level; budget and auth integrity |
| **Training / fine-tuning** | Unsloth | LoRA/QLoRA, dataset preprocessing, quantized export, Studio | Dataset corruption, credential leakage, broken export |

The boundaries are hardening: vLLM and SGLang compete on *the same* features; Ollama increasingly inherits llama.cpp's capabilities (manifest lists are explicitly being prepped for llama-server compatibility), making it a UX/packaging layer rather than an engine. LiteLLM is the only project here whose primary unit of value is *metadata and policy*, not compute — which is why its 304 PRs skew toward pricing tables and provider registration. Unsloth is the only layer that produces models rather than serving them, so its regressions (non-ASCII stripping, 4-bit export instead of 16-bit) are upstream of every other project in this report.

## 6. Trend Signals

**1. Speculative decoding is the new correctness frontier.** vLLM shows three independent DFlash2/DSpark failure modes — greedy divergence at token 30 at K=1 (#54928), deterministic FSM stall with xgrammar (#53777), and zero prefix-cache reuse on 1M-token prompts (#54094) — while llama.cpp fixed MTP KV allocation across three architectures (b10907) and broken speculation after image inputs (b10906). Spec-decode is being deployed as a throughput default before it is trustworthy as a correctness default. **Watch:** whether anyone ships a deterministic output-diff gate for spec-decode in CI.

**2. Tool calling is the least reliable layer in the stack — and it fails silently.** Every project has an open bug: vLLM's `qwen3_coder`/`qwen3_xml` ignoring `tool_choice: "required"` (#54808), SGLang's DSML parser injecting spurious `arguments`/`input` keys (#38924), Ollama returning empty `content` with `finish_reason: "stop"` on parse failure (#17274, #18390, #18357), LiteLLM dropping concatenated-JSON tool arguments and rejecting Bedrock Converse tool history (#40582, #40735), Unsloth's duplicate-call guard blocking legitimate reruns (#10792). **A 200 OK does not mean a usable result anywhere in this ecosystem.** Validate tool invocations client-side.

**3. "Silent failure" is now the dominant risk class.** ROCm GLM-5.3 accuracy collapse (no error), 4-bit KV CPU fallback (no warning), `clean_text` deleting every non-ASCII character, `include_reasoning=false` ignored by SGLang. These are worse than crashes because they pass health checks. **Watch:** whether projects adopt the observability asks — manifest digests in responses (Ollama #18394), cache-affinity TTL correctness (LiteLLM #40776), effective block size exposure (vLLM #56538).

**4. Memory accounting, not compute, is the binding constraint.** Host-memory exhaustion at startup (vLLM #54237), unaccounted KV workspace (SGLang #38596), Jetson Orin host OOM (Ollama #18396), host-memory offloading for oversized MoE models (vLLM #38256). Quantized KV (FP4/NVFP4) is advancing faster than the accounting that would make it safe.

**5. Security moved to the supply chain and the credential path.** LiteLLM's PyPI `v1.82.7`/`v1.82.8` compromise plus an unfixed ReDoS that can crash-loop replicas (#32353); Unsloth Studio API keys inheriting the server owner's Hugging Face token (#10809). **Action:** cosign-verify LiteLLM images, audit historical pins and CI caches, and treat Unsloth multi-tenant Studio as untrusted until #10809 lands.

**6. Hardware diversification is irreversible.** ROCm/RDNA4 (`gfx1201` FA, W4A16 MoE, AITER mHC), Blackwell SM120 (GLM-5.3-Flash, FP8 MoE gaps), NPU (SGLang DSv4.1), ARM64 CPU-only and DGX Spark (Unsloth), Apple MLX certification. **Caveat:** the ARM64 Unsloth Studio image reportedly runs `llama.cpp` on CPU on DGX Spark/GB10 — verify, don't assume.

**Recommendations for application developers:** pin versions explicitly (vLLM 0.27.1, Ollama 0.33.1, llama.cpp b10917, `accelerate<1.15` on Windows ROCm); treat every tool call as unvalidated; run deterministic output-diff tests before enabling any speculative decoding; instrument for silent fallbacks rather than trusting exit codes; and validate cost/spend logs against provider invoices given open gaps in vLLM cached-token accounting and Azure AI router tracking.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-12

## Today's Highlights
No new releases in the last 24 hours. Activity is dominated by **DeepSeek-V4.1 hardening** (pipeline-parallel stage boundaries, ROCm AITER kernels, DSpark spec-decode fixes) and by a cluster of **DFlash2 speculative-decoding correctness bugs**. Meanwhile, two high-severity regressions remain open — host-memory exhaustion in 0.28.0/0.29.0 and an accuracy collapse on ROCm GLM-5.3 — while the long-running **batch-invariance/determinism** effort (#27433) stays the most-discussed issue.

## Releases & Breaking Changes
No releases published today. Two version-relevant items worth flagging:

- **[Bug] 0.28.0 and 0.29.0 consume all host memory at start and freeze (OK with 0.27.1)** — [#54237](https://github.com/vllm-project/vllm/issues/54237) — a bisectable startup regression between 0.27.1 and 0.28.0; users on 0.28+ should treat this as a blocker pending fix.
- **[Bug] GLM-5.3 accuracy collapses on ROCm after #53155 forces MRV1** — [#54924](https://github.com/vllm-project/vllm/issues/54924) — GSM8K drops 91.6% → 14.9% on MI350/MI355 (gfx950) once Model Runner V1 is forced; effectively a silent correctness break for ROCm GLM deployments.

## New Model & Hardware Support
- **DeepSeek-V4.1 pipeline/sequence parallelism** — a coordinated PR set adds SP stage boundaries, cache/index relay across PP stages, and construction-time dependency validation: [#56438](https://github.com/vllm-project/vllm/pull/56438), [#56439](https://github.com/vllm-project/vllm/pull/56439), [#56437](https://github.com/vllm-project/vllm/pull/56437).
- **[ROCm][DSV4.1][Perf] Use AITER mHC for the delayed pre block** — [#56503](https://github.com/vllm-project/vllm/pull/56503) (closed) moves DSv4.1's mHC block off the eager Torch reference onto the `MHCPreOp`/`MHCPostOp` dispatch layer reaching AITER.
- **[ROCm] Select Triton explicitly for W4A16 MoE on gfx942/gfx950** — [#56543](https://github.com/vllm-project/vllm/pull/56543) (DNM) pins `backend="triton"` for AITER W4A16 MoE GEMMs; gfx1250 and automatic selection elsewhere unchanged.
- **[Rust Frontend][Multimodal] Accept preprocessed multimodal gRPC features** — [#55047](https://github.com/vllm-project/vllm/pull/55047) extends the typed multimodal wire format to the Rust gRPC frontend.
- **[Frontend] Expose effective attention block size for DCP** — [#56538](https://github.com/vllm-project/vllm/pull/56538) adds `CacheConfig.effective_attention_block_size` so clients can interpret cache events when a 16-token physical block represents 64 tokens across ranks.
- **[RFC] Topology-aware EPLB placement from omni-infer** — [#31671](https://github.com/vllm-project/vllm/issues/31671) proposes integrating topology-aware expert placement/execution into vLLM EPLB.
- **MOE oracle / linear kernel migration** — [#54959](https://github.com/vllm-project/vllm/issues/54959) tracks remaining `LinearMethodBase` / `FusedMoEMethodBase` subclasses not yet on the oracles. **`CustomOp` cleanup** ([#19817](https://github.com/vllm-project/vllm/issues/19817)) remains open for Blackwell/AMD compilation-config defaults.

## Performance & Optimization
- **Batch-invariant feature and performance optimization** — [#27433](https://github.com/vllm-project/vllm/issues/27433) (92 comments, 20 👍) continues tracking remaining nondeterminism work atop the Thinking Machines batch-invariance approach.
- **Incremental MoE expert offloading — GPU cache + async pipeline** — [#38256](https://github.com/vllm-project/vllm/issues/38256) (14 comments). Expert weights in CPU pinned memory, fixed-size GPU cache with LFRU eviction and cross-layer prediction; PR [#37190](https://github.com/vllm-project/vllm/pull/37190) is open.
- **[Perf] Fused DFlash2 grouped convolution** — [#55960](https://github.com/vllm-project/vllm/pull/55960) fuses the grouped dynamic convolution into a single Triton op with row-aligned tiles (1024 elems/≥128 rows, else 512).
- **[Perf][DSpark] KV-only context insertion across V4.1 cache formats** — [#56441](https://github.com/vllm-project/vllm/pull/56441) eliminates unused query allocation/work for `fp8_ds_mla`, BF16 and FP8 e4m3fn caches.
- **[Perf][Engram] Limit DeepSeek-V4.1 lookup overlap to configured workloads** — [#56436](https://github.com/vllm-project/vllm/pull/56436) keeps overlap experimental/default-off behind an explicit workload limit.
- **[Elastic EP] Reuse CUDA graphs across reconfiguration** — [#54985](https://github.com/vllm-project/vllm/pull/54985) removes CUDA-graph warmup blocking from the serving path.
- **~2x decode regression for structured outputs (xgrammar)** — [#49013](https://github.com/vllm-project/vllm/issues/49013) (closed) bisected to commit `7df3d7d` in #45424 (`apply_grammar_bitmask` staging rewrite), affecting v0.23.0 → v0.24.0/v0.25.1.
- **AWQ CUDA GEMM kernel is L1/memory bound** — [#55462](https://github.com/vllm-project/vllm/issues/55462), `ncu` profiling of `gemm_forward_4bit_cuda_m16nXk32` on RTX 3070 Ti.
- **[RFC] DeepSeek-V4.1-Flash performance on ROCm** — [#56506](https://github.com/vllm-project/vllm/issues/56506); 8× MI355X, TP4, MXFP4 MoE + DSpark MTP reports 35.89 out tok/s (8.97/GPU) at concurrency 1, TTFT p50 0.898s.
- **Long-prefill starvation** — [#54919](https://github.com/vllm-project/vllm/issues/54919): Qwen3.8-Flash-Next prefill periodically starves active decode for 3–7 minutes on 2-node DGX Spark TP2.
- **`MLARoPEKVCacheCatFusionPass` port to manual fusion** — [#43504](https://github.com/vllm-project/vllm/issues/43504).
- **[Tools][Recipes] Staged runtime sweep tuning** — [#56340](https://github.com/vllm-project/vllm/pull/56340) adds `TP/DP -> max_concurrency -> scheduler` tuning order and accuracy/reliability improvements.

## Stability & Regressions
Ranked by severity:

1. **Host memory exhaustion / startup freeze on 0.28.0–0.29.0** — [#54237](https://github.com/vllm-project/vllm/issues/54237). No fix PR identified; 0.27.1 is the known-good fallback.
2. **ROCm GLM-5.3 accuracy collapse (91.6% → 14.9% GSM8K)** — [#54924](https://github.com/vllm-project/vllm/issues/54924), bisected to #53155 forcing MRV1. Silent correctness failure under ROCm.
3. **DeepSeek-V4.1-Flash `dsv4_topk` illegal memory access under high concurrency on H20** — [#56389](https://github.com/vllm-project/vllm/issues/56389); mitigated by capping `max_num_seqs=256`.
4. **DeepSeek-V4.1-Flash + DSpark device-side assert at draft warmup (H200, SM90, Marlin MXFP4 MoE)** — [#56443](https://github.com/vllm-project/vllm/issues/56443), failing in `map_draft_to_target`.
5. **FP8 MoE crash on SM120 (RTX PRO 6000 Blackwell)** — [#45101](https://github.com/vllm-project/vllm/issues/45101): Triton `fused_moe` asserts "Unsupported lhs dtype fp8e4nv", and `VLLM_MOE_FORCE_MARLIN=1` is not honored.
6. **DFlash2 spec-decode correctness** — greedy Qwen3.8 output diverges at token 30 even at K=1 with `--enforce-eager` ([#54928](https://github.com/vllm-project/vllm/issues/54928)); deterministic "Failed to advance FSM" with xgrammar `json_object` ([#53777](https://github.com/vllm-project/vllm/issues/53777)); zero prefix-cache reuse on identical 1.04M-token prompts with YaRN ([#54094](https://github.com/vllm-project/vllm/issues/54094)).
7. **Tool-calling parser gaps** — `qwen3_coder`/`qwen3_xml` silently ignore `tool_choice: "required"` and named functions on `/v1/chat/completions` ([#54808](https://github.com/vllm-project/vllm/issues/54808)). Fix PR for Gemma4 bare `call:` and whitespace-free channel transitions: [#54257](https://github.com/vllm-project/vllm/pull/54257).
8. **Hybrid GDN / MTP prefix-cache misses** — [#53504](https://github.com/vllm-project/vllm/issues/53504) (closed) with fix PR [#52244](https://github.com/vllm-project/vllm/pull/52244) restoring GDN prefix-cache hits under MTP; related CPU-offload hash fix in [#56404](https://github.com/vllm-project/vllm/pull/56404) (fixes #56396).
9. **Misc infra/config** — Ray 2.55.1 `ActorHandleNotFoundError` at EngineCore init vs. CI-pinned 2.48.0 ([#45318](https://github.com/vllm-project/vllm/issues/45318)); Tesla T4 Triton shared-memory OOM ([#36802](https://github.com/vllm-project/vllm/issues/36802)); sleep-mode HBM leak with `--mm-encoder-tp-mode data` ([#47654](https://github.com/vllm-project/vllm/issues/47654), closed); `prompt_token_ids` dropped in `EmbedsInput` ([#42303](https://github.com/vllm-project/vllm/issues/42303), closed).
10. **Open fix PRs of note** — Gemma4 MTP missing KV-scale validation crash ([#56539](https://github.com/vllm-project/vllm/pull/56539)); aborted-request metrics not recorded ([#55940](https://github.com/vllm-project/vllm/pull/55940)); TorchCodec video decode errors surfaced as HTTP 500 instead of 400 ([#52759](https://github.com/vllm-project/vllm/pull/52759)); DSv4.1 microbatch position/Engram history fix ([#56440](https://github.com/vllm-project/vllm/pull/56440)).

## What This Means for Application Developers
- **Pin your version, and know your fallback.** 0.28.0/0.29.0 carry an unresolved host-memory freeze, so treat 0.27.1 as the safe default until #54237 lands. ROCm + GLM-5.3 users should avoid the MRV1-forcing change entirely.
- **Speculative decoding needs validation per model/backend.** DFlash2 and DSpark show multiple independent failure modes — output divergence at greedy decoding, grammar FSM stalls, and prefix-cache misses. If you rely on them, run deterministic output-diff and structured-output regression tests before deploying, and prefer K>1 cautiously.
- **Structured output performance is a known weak spot.** The ~2x guided-JSON decode regression from #45424 is the main throughput caveat for grammar-constrained agents; budget for it or pin to a pre-0.24 version if JSON throughput is your bottleneck.
- **Tool-calling clients should not trust `tool_choice` enforcement** on Qwen3 coder/xml parsers (#54808). Validate that the required function was actually invoked rather than assuming the server enforced it, and watch the Gemma4 parser fixes for similar edge cases.
- **Capacity planning on Blackwell and H20 needs headroom.** FP8 MoE on SM120 is not functional in the Triton path without a workaround, and DeepSeek-V4.1 on H20 requires `max_num_seqs<=256` to avoid illegal memory access — encode these as deployment limits rather than discovering them at load.
- **MoE offloading is worth watching** if you serve large expert models on constrained VRAM: #38256 aims to let models exceeding GPU memory run on smaller hardware via GPU-resident hot-expert caching with async pipelining.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang Digest — 2026-09-12

### Today's Highlights
DeepSeek V4.1 support is now proposed in [PR #38798](https://github.com/sgl-project/sglang/pull/38798), bringing a major new model family into SGLang with quantization, HiCache, NPU, and JIT-kernel implications. The high-priority distributed KVCache roadmap for agentic workloads ([Issue #21846](https://github.com/sgl-project/sglang/issues/21846)) remains active, alongside a wave of session/multimodal position fixes and a significant Mamba2 kernel autotune PR that restores 10x+ prefill performance. Ongoing CUDA coredump and CI flakiness tracking continues to dominate repository activity.

### Releases & Breaking Changes
None in the last 24 hours.

### New Model & Hardware Support
- **DeepSeek V4.1**: [PR #38798](https://github.com/sgl-project/sglang/pull/38798) adds full model support (documentation, quant, HiCache, NPU, JIT-kernel, memory-pool). DeepSeek-V4.1 packed FP4 KV on Hopper is also tracked in [Issue #38902](https://github.com/sgl-project/sglang/issues/38902).
- **SenseNova-U1 / U1.5**: Feature and performance tracking in [Issue #37742](https://github.com/sgl-project/sglang/issues/37742); official 8-step distilled LoRA support proposed in [PR #38930](https://github.com/sgl-project/sglang/pull/38930).
- **AMD consumer Radeon (RDNA3/RDNA4)**: Official support tracking and enablement plan in [Issue #30599](https://github.com/sgl-project/sglang/issues/30599). ROCm QSA packed-varlen decode resolved to aiter on HIP in [PR #38909](https://github.com/sgl-project/sglang/pull/38909), fixing Qwen3.8-Flash-Next-FP8 decode crashes.
- **GLM-5.3-Flash on SM120**: Required fixes and release qualification tracked in [Issue #37813](https://github.com/sgl-project/sglang/issues/37813).
- **FP4 KV roadmap**: NVFP4 KV progress across SM120/B200 documented in [Issue #29913](https://github.com/sgl-project/sglang/issues/29913).

### Performance & Optimization
- **Mamba2 SSD Triton kernels**: [PR #39130](https://github.com/sgl-project/sglang/pull/39130) adds `@triton.autotune`, fixing a silent 10x+ prefill-kernel loss caused by default `BLOCK_SIZE_* = 16`.
- **Qwen3-VL serving on H100**: [PR #36411](https://github.com/sgl-project/sglang/pull/36411) optimizes unique-image one-pass streaming, reducing wasted preprocessing/embedding memory.
- **Qwen-Image-Edit attention on Hopper**: [PR #38584](https://github.com/sgl-project/sglang/pull/38584) reuses QKV epilogues and packs vision windows, cutting repeated QK norm/RoPE and 96 separate SDPA calls per layer.
- **GLM-5.3-Flash decode context parallelism**: [PR #39117](https://github.com/sgl-project/sglang/pull/39117) restores DCP and fixes virtual KV addressing for NoPE attention and sparse reads.
- **MiniLB / PD replay**: [PR #39151](https://github.com/sgl-project/sglang/pull/39151) preserves prefill replay rows in `/generate` responses.
- **DeepGEMM MegaMoE**: [Issue #38700](https://github.com/sgl-project/sglang/issues/38700) tracks fusing shared-to-sparse experts in DSV4.
- **Memory / OOM fixes**: KV-canary workspace accounting fixed in [PR #38596](https://github.com/sgl-project/sglang/pull/38596) (prevents near-1 GB unaccounted workspace OOMs); hybrid SWA page freeing fixed in [PR #38159](https://github.com/sgl-project/sglang/pull/38159).

### Stability & Regressions
Ranked by severity:

1. **CUDA coredump tracker** — [Issue #26340](https://github.com/sgl-project/sglang/issues/26340) (298 comments): auto-collected CUDA coredumps from CI, ongoing.
2. **CI test failures** — [Issue #17050](https://github.com/sgl-project/sglang/issues/17050): 1 broken, 10 flaky, 991 recently fixed (as of 2026-09-11).
3. **GLM-5.3 crash** — [Issue #39072](https://github.com/sgl-project/sglang/issues/39072): crash on disagg decode + DP attention + speculative decode.
4. **Flash-attn sm_89 cubin missing** — [Issue #38980](https://github.com/sgl-project/sglang/issues/38980): `is_fa3_supported()` accepts sm_89 but no sm_89 cubin ships; raw CUDA error instead of clean rejection.
5. **Encoder-decoder KV cache double-free** — [Issue #38840](https://github.com/sgl-project/sglang/issues/38840): shared boundary page double-freed when `page_size > 1`.
6. **DeepSeek V4/V3.2 DSML tool-call parser** — [Issue #38924](https://github.com/sgl-project/sglang/issues/38924): spurious top-level `"arguments"` / `"input"` keys wrap tool call arguments.
7. **`include_reasoning=false` ignored** — [Issue #39103](https://github.com/sgl-project/sglang/issues/39103): reasoning still emitted in responses, chat completions, and completions.
8. **DP routing perturbation** — [Issue #35241](https://github.com/sgl-project/sglang/issues/35241): generation health checks perturb DP user routing state and collapse long-prefill throughput.
9. **Session / multimodal crashes** — fixed in PRs [PR #39145](https://github.com/sgl-project/sglang/pull/39145), [PR #39144](https://github.com/sgl-project/sglang/pull/39144), [PR #39038](https://github.com/sgl-project/sglang/pull/39038), [PR #39146](https://github.com/sgl-project/sglang/pull/39146): image/text position mismatches, empty continuations, and PD session connection fields.
10. **Closed lower-severity items** — PD disaggregation handoff token ([Issue #32897](https://github.com/sgl-project/sglang/issues/32897)), H20 Qwen3.8-Flash-Next-FP8 launch ([Issue #38793](https://github.com/sgl-project/sglang/issues/38793)), `stop_regex` buffer bound ([Issue #30932](https://github.com/sgl-project/sglang/issues/30932)), tokenizer deleted state ([Issue #15486](https://github.com/sgl-project/sglang/issues/15486)).

### What This Means for Application Developers
- **DeepSeek V4.1 is coming**: plan for new model IDs, FP4 KV memory profiles, and MoE routing changes. If you rely on DeepSeek V3.x, watch for parser fixes and backward-compatibility notes in upcoming releases.
- **Agentic and multi-turn apps**: the distributed KVCache roadmap ([Issue #21846](https://github.com/sgl-project/sglang/issues/21846)) and lightweight SessionAware router ([Issue #25760](https://github.com/sgl-project/sglang/issues/25760)) are the key workstreams for reducing KV transfer bottlenecks and improving prefix reuse across agent sessions.
- **Multimodal/session APIs are stabilizing**: if you use image + text sessions, pin a known-good version or test the recent PRs — several crashes around image positions and session continuations are actively being fixed.
- **Performance**: Mamba2 prefill gets a large autotune win; Qwen3-VL, Qwen-Image-Edit, and GLM-5.3 decode paths are being optimized. Expect better throughput on H100/Hopper and Blackwell SM120.
- **Production caution**: the `include_reasoning=false` bug, DSML tool-call parser spurious keys, and DP health-check throughput collapse are real user-facing issues. Validate your reasoning and tool-call outputs, and avoid aggressive generation health checks in latency-sensitive DP routing until fixed.
- **Hardware expansion**: AMD RDNA3/RDNA4 consumer GPUs and SM120 Blackwell are moving toward supported status; ROCm QSA decode is already fixed.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-12

Source: [github.com/ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) · Window: last 24h · 8 releases, 76 issues updated, 120 PRs updated (top 20 shown)

---

## 1. Today's Highlights

Backend hardening dominated the last 24 hours: Metal consolidated all fusion patterns into a single table and fixed idle-thread underutilization in the remaining IQ `mul_mv` kernels, while HIP/CUDA Flash Attention got fresh tuning for RDNA4 (`gfx1201`). A cluster of correctness fixes landed for multi-token-prediction (MTP) KV cache allocation across DeepSeek2/GLM4-MoE/Cohere2-MoE and for server-side speculation after image inputs. On the risk side, two open items deserve attention: garbage output from IQ1_S/IQ2_S/IQ3_S quant kernels on Blackwell (`sm_120`) and a severe prompt-processing slowdown on Vulkan/RDNA3 after b10780.

---

## 2. Releases & Breaking Changes

No API or config breaking changes in this window.

- **[b10917](https://github.com/ggml-org/llama.cpp/releases/tag/b10917)** — `cmake`: skip PCH for `llama-server` when building with MSVC. This is a regression fix for [#28091](https://github.com/ggml-org/llama.cpp/pull/28091) ("cmake: add PCH and unity build"), which broke MSVC linking with `LNK2001 unresolved external "__"` ([#28758](https://github.com/ggml-org/llama.cpp/issues/28758), closed). **Windows/MSVC builders should upgrade to b10917.**
- **[b10909](https://github.com/ggml-org/llama.cpp/releases/tag/b10909)** — Metal: fusion patterns reworked into a single declarative table (`ggml-metal-fuse.cpp`), consumed by both the graph optimizer and fusion debug tooling.
- **[b10908](https://github.com/ggml-org/llama.cpp/releases/tag/b10908)** — Metal: generalized the row-split fix from [#28086](https://github.com/ggml-org/llama.cpp/pull/28086) to the six remaining IQ `mul_mv` kernels (`iq1_s`, `iq1_m`, …) for `ne00 < 1024`.
- **[b10907](https://github.com/ggml-org/llama.cpp/releases/tag/b10907)** — model: fix MTP context KV cache allocation for `deepseek2`, `glm4moe`, `cohere2moe`; adds inverse architecture gating and architecture tests for MTP layer filtering.
- **[b10906](https://github.com/ggml-org/llama.cpp/releases/tag/b10906)** — server: fix speculation after an image (pass actual position, not token count, to the drafter; affects all drafters, not just DFlash). `draft n_past` renamed to `pos0`.
- **[b10905](https://github.com/ggml-org/llama.cpp/releases/tag/b10905)** — CUDA/HIP: Flash Attention tuning for `gfx1201` (see Performance).
- **[b10903](https://github.com/ggml-org/llama.cpp/releases/tag/b10903)** — Vulkan: fix data race and out-of-bounds access in `argsort(large)` ([#28705](https://github.com/ggml-org/llama.cpp/pull/28705)).
- **[b10902](https://github.com/ggml-org/llama.cpp/releases/tag/b10902)** — OpenCL: add A8 × Q4_0 `mm` binary kernel support ([#28268](https://github.com/ggml-org/llama.cpp/pull/28268)).

---

## 3. New Model & Hardware Support

- **OpenCL A8/Q4_0 matrix-multiply binary kernel** — [b10902](https://github.com/ggml-org/llama.cpp/releases/tag/b10902) / [#28268](https://github.com/ggml-org/llama.cpp/pull/28268): expands quantized compute coverage on the OpenCL backend.
- **MTP architectures: DeepSeek2, GLM4-MoE, Cohere2-MoE** — [b10907](https://github.com/ggml-org/llama.cpp/releases/tag/b10907): correct MTP KV cache allocation, with architecture-gated layer filtering and expanded tests.
- **AMD RDNA4 (`gfx1201`) HIP Flash Attention** — [b10905](https://github.com/ggml-org/llama.cpp/releases/tag/b10905): enables MMA FA for head size 256; prefers whole-tile FA grids over stream-k on AMD WMMA.
- **AMD GCN MMQ config** — [#27841](https://github.com/ggml-org/llama.cpp/pull/27841) (open): per-arch MMQ config to properly handle wave64 (nthreads 512) instead of falling back to the RDNA2 wave32/256 config.
- **Intel Vulkan FA tiles** — [#28780](https://github.com/ggml-org/llama.cpp/pull/28780) (closed): constrain coopmat2 FA `Br` to 32 rows on Intel to avoid register spilling at HSK=HSV=128.
- **WebGPU / Dawn update** — [#28683](https://github.com/ggml-org/llama.cpp/pull/28683) (open): moves to a recent Dawn version, needed for `wasi:webgpu`.
- **Nemotron-H MTP guard** — [#28779](https://github.com/ggml-org/llama.cpp/pull/28779) (open): avoids SIGFPE when a NextN/MTP layer has zero `expert_feed_forward_length` / `expert_used_count`.
- **Chat template parsing** — [#28682](https://github.com/ggml-org/llama.cpp/pull/28682) (open): dedicated Ling 3.0 (Bailing V3) parser; fixes tool calls emitted before `</think>` being swallowed into `reasoning_content`.
- **Requested, not yet supported** — GLM5.3 (flash) tracking issue [#27922](https://github.com/ggml-org/llama.cpp/issues/27922) (15 👍).

---

## 4. Performance & Optimization

- **Metal fusion table consolidation** — [b10909](https://github.com/ggml-org/llama.cpp/releases/tag/b10909) / [#28164](https://github.com/ggml-org/llama.cpp/pull/28164): single source of truth for fusable op patterns, reducing optimizer/debug divergence and making new fusion patterns cheaper to add.
- **Metal IQ `mul_mv` idle-thread fix** — [b10908](https://github.com/ggml-org/llama.cpp/releases/tag/b10908) / [#28692](https://github.com/ggml-org/llama.cpp/pull/28692): row-split generalization for `ne00 < 1024` across six remaining kernels; improves occupancy for smaller-K quantized matvecs.
- **HIP `gfx1201` FA tuning** — [b10905](https://github.com/ggml-org/llama.cpp/releases/tag/b10905) / [#28102](https://github.com/ggml-org/llama.cpp/pull/28102): head-size-256 MMA FA on RDNA4 plus stream-k logic revisions.
- **CPU: skip threadpool for graphs with no CPU work** — [#28785](https://github.com/ggml-org/llama.cpp/pull/28785) (open): avoids creating/waking workers for view/NOP-only graphs, common with full GPU offload; also keeps caller priority/affinity in sync with the active pool.
- **CPU: opt-in Q4_K P6 and VNNI kernels** — [#28791](https://github.com/ggml-org/llama.cpp/pull/28791) (closed): experimental layout behind build + runtime switches, with synthetic correctness checks.
- **SYCL graph record/replay** — [#28725](https://github.com/ggml-org/llama.cpp/pull/28725) (open): port of the CUDA graph path to SYCL (requires a reorder pass before recording; async alloc extensions hang during capture).
- **CUDA: per-thread stream for buffer-init padding memset** — [#28782](https://github.com/ggml-org/llama.cpp/pull/28782) (open): replaces legacy-stream `cudaMemset` with `cudaMemsetAsync` + sync to avoid collisions with parallel HIP graph capture.
- **RPC: hash-cache weights only** — [#28789](https://github.com/ggml-org/llama.cpp/pull/28789) (open): stops hashing activations above the 10 MB threshold and refuses partial cache entries, improving multi-node split performance.

---

## 5. Stability & Regressions

Ranked by severity (correctness/silent-failure first):

1. **CUDA Blackwell (`sm_120`) IQ1_S / IQ2_S / IQ3_S garbage output** — [#28784](https://github.com/ggml-org/llama.cpp/pull/28784) (open, fix PR exists). Byte extraction from packed 32-bit quant words is miscompiled by nvcc 13.2 on `sm_120`; the plain byte mask is dropped. Affects users running IQ quantizations on Blackwell.
2. **Silent CPU fallback for 4-bit KV cache on CUDA** — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633) (open). `ggml_cuda_fattn_kv_type_supported` only accepts certain KV types under default flags, so q4_0/q4_1 KV silently drops prefill to CPU (~30× slowdown) with no warning. Proposed fix is making `GGML_CUDA_FA_ALL_QUANTS=ON` the default.
3. **Vulkan/RDNA3 prompt-processing regression after b10780** — [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) (open, 3 comments). Severe prompt-processing slowdown with layers on `Vulkan0`. No fix PR identified yet.
4. **Vulkan argsort data race + OOB** — [b10903](https://github.com/ggml-org/llama.cpp/releases/tag/b10903) / [#28705](https://github.com/ggml-org/llama.cpp/pull/28705) (fixed). VVL-caught race in the inner loop; OOB in `argsort_large` a plausible CI failure cause.
5. **Server speculation broken after image inputs** — [b10906](https://github.com/ggml-org/llama.cpp/releases/tag/b10906) / [#28715](https://github.com/ggml-org/llama.cpp/pull/28715) (fixed). Drafter received token count instead of actual position; affected every drafter.
6. **MTP KV cache allocation wrong for DeepSeek2 / GLM4-MoE / Cohere2-MoE** — [b10907](https://github.com/ggml-org/llama.cpp/releases/tag/b10907) / [#28630](https://github.com/ggml-org/llama.cpp/pull/28630) (fixed).
7. **SYCL crash in `ggml_sycl_pool_vmm::free`** — [#28660](https://github.com/ggml-org/llama.cpp/issues/28660) (open). oneDNN scratchpad breaks LIFO pool ordering; affects Intel Arc Pro B70.
8. **OpenVINO backend `STATUS_ILLEGAL_INSTRUCTION` (AVX-512)** — [#28726](https://github.com/ggml-org/llama.cpp/issues/28726) (open, new). Reproduces on Core Ultra 7 265K with the b10901 OpenVINO Windows build.
9. **ngram-cache speculation cache leaks across requests** — [#27852](https://github.com/ggml-org/llama.cpp/issues/27852) (open). Per-slot context cache persists because `begin()` is a no-op; acceptance falls 86% → 11%, slower than no speculation.
10. **MSVC link failure after PCH/unity build** — [#28758](https://github.com/ggml-org/llama.cpp/issues/28758) (closed, fixed by b10917).
11. **macOS static-build link failure with `BUILD_SHARED_LIBS=OFF`** — [#28491](https://github.com/ggml-org/llama.cpp/issues/28491) (open). `ggml-rpc` static archive never links, leaving `librdma` symbols undefined.
12. **Vulkan on Intel Arc 140V (Windows) outputs garbage** — [#28648](https://github.com/ggml-org/llama.cpp/issues/28648) (open). Batch-setting dependent; also seen on Intel B70 MoE crashes ([#23769](https://github.com/ggml-org/llama.cpp/issues/23769)).

---

## 6. What This Means for Application Developers

- **Upgrade guidance:** if you build llama.cpp on Windows/MSVC, move to **b10917** immediately — the PCH regression breaks `llama-server` linking. If you run MTP models (DeepSeek2 / GLM4-MoE / Cohere2-MoE) or speculative decoding with images, **b10906/b10907** contain fixes you need.
- **Avoid silent performance cliffs:** 4-bit KV cache users on CUDA should verify FA kernel selection ([#28633](https://github.com/ggml-org/llama.cpp/issues/28633)) — the failure mode is a ~30× prefill slowdown with no log warning. Similarly, Vulkan/RDNA3 users should pin below b10780 until [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) is resolved.
- **OpenAI-compatibility gap being closed:** `response_format: json_schema` currently only honors the nested `json_schema.schema` form and silently drops a directly-passed schema — fix in [#28697](https://github.com/ggml-org/llama.cpp/pull/28697). Schema handling is also being refactored into a proper internal representation in [#28736](https://github.com/ggml-org/llama.cpp/pull/28736), which should reduce future grammar-generation edge cases.
- **Server ergonomics improvements in flight:** `-sysf` system-prompt-from-file for `llama-server` ([#28053](https://github.com/ggml-org/llama.cpp/pull/28053)), router-mode multiple presets per loaded model ([#23704](https://github.com/ggml-org/llama.cpp/issues/23704), 17 comments), and disk-based context checkpoint offloading `--cache-disk` ([#20697](https://github.com/ggml-org/llama.cpp/issues/20697), 48 👍) remain the most-requested operational features.
- **Drafting quality could improve materially:** [#27694](https://github.com/ggml-org/llama.cpp/pull/27694) proposes making the drafter probabilistic and having the target verify via rejection sampling for simple-draft and MTP paths — worth tracking if you tune speculation acceptance rates.
- **Cheap wins for full-GPU-offload deployments:** [#28785](https://github.com/ggml-org/llama.cpp/pull/28785) removes pointless CPU threadpool wakeups when the graph has no CPU work, and RPC multi-node splits stop hashing activations ([#28789](https://github.com/ggml-org/llama.cpp/pull/28789)).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-12

## Today's Highlights
No new releases landed in the last 24 hours, but activity was dominated by tool-calling correctness failures across Gemma 4, Gemma3n, and the Anthropic-compatible endpoint, several of which silently return empty responses. On the operations side, a credible report of `:cloud` models wedging after ~45 minutes on 0.34.0 now has a fix PR that bounds proxy connect/TTFB timeouts. Finally, the manifest-list workstream (runner-specific manifests and digest selection) is being prepped for llama-server compatibility.

## Releases & Breaking Changes
- **No releases in the last 24h.**
- **Manifest list support in progress** — [PR #16590](https://github.com/ollama/ollama/pull/16590) adds manifest-list storage so runner-specific manifests can coexist under one tag while preserving v1 tags as downgrade anchors. `show/list/copy/remove/pull/push` gain runner and digest selection, plus lazy local compatibility. This is a storage/API surface change worth tracking if you pin tags in CI or evals.
- **MLX version bump** — [PR #18235](https://github.com/ollama/ollama/pull/18235) tracks upstream `ml-explore/mlx`; expect incremental behavior changes to the MLX runner on macOS.
- **`create` pipeline rework** — [PR #14969](https://github.com/ollama/ollama/pull/14969) adds server-side MLX/safetensors imports with remote upload/staging and limits GGUF create to wrapping existing GGUF inputs. Significant for anyone building model-creation automation.
- **CLI agent removed** — [PR #18393](https://github.com/ollama/ollama/pull/18393) reverts to the previous CLI chat interface.

## New Model & Hardware Support
- **Hy4 (Tencent) model request** — [Issue #18287](https://github.com/ollama/ollama/issues/18287) asks for Ollama-compatible quantized artifacts from `tencent/Hy4-preview`.
- **deepseek-v4.1-flash downloadable model requested** — [Issue #18379](https://github.com/ollama/ollama/issues/18379); the reporter also asks why Ollama has paused shipping downloadable files alongside cloud variants.
- **`ppc64le` architecture still open** — [Issue #796](https://github.com/ollama/ollama/issues/796) (open since 2023, updated today) requests IBM POWER8+ support.
- **AMD gfx1200 (RX 9060 XT) load failure** — [Issue #17782](https://github.com/ollama/ollama/issues/17782): `Could not load "TensileLibrary_lazy_gfx1200.dat"` with qwen3.8:27b on ROCm.
- **IQ3_S quantization support unclear** — [Issue #18297](https://github.com/ollama/ollama/issues/18297): `Qwen3.8-27B-GSQ-RCO-GGUF:IQ3_S` completes with `done_reason: "stop"` but always returns empty content.
- **Multimodal projector placement work:**
  - [PR #18376](https://github.com/ollama/ollama/pull/18376) keeps Gemma3n's MobileNetV5 projector off the CPU (CPU backend silently corrupts image embeddings).
  - [PR #16767](https://github.com/ollama/ollama/pull/16767) re-enables projector offload for integrated ROCm APUs, where the shared-memory check is a false positive.
- **Jetson Orin Nano 8GB OOM** — [Issue #18396](https://github.com/ollama/ollama/issues/18396): Gemma 4 E4B multimodal projector causes host OOM under unified memory on 0.34.0.

## Performance & Optimization
- **Model loading regression** — [Issue #18373](https://github.com/ollama/ollama/issues/18373): reported slowdown since upgrading past 0.23.4, affecting all models including `gpt-oss:120b`. No fix PR identified yet.
- **Strix Halo load-time regression** — [Issue #16501](https://github.com/ollama/ollama/issues/16501): Qwen3.5 122B load time went from ~61s (0.24) to ~116s (0.30.4) on unified-memory hardware.
- **Loopback port exhaustion under sustained `/api/embed`** — [Issue #18392](https://github.com/ollama/ollama/issues/18392): the llama-server HTTP client has keep-alive disabled, so sustained bulk embedding (~55 docs/s, batches of 32, `bge-m3:567m-fp16`) exhausts ephemeral ports on Windows and returns HTTP 400 `dial tcp` errors. Relevant for high-throughput embedding services.
- **MLX backend updates** — [PR #18235](https://github.com/ollama/ollama/pull/18235) is the main runner-level optimization vector this cycle.

## Stability & Regressions
Ranked by severity:

1. **Cloud models wedge after ~45 minutes on 0.34.0** — [Issue #18381](https://github.com/ollama/ollama/issues/18381). `deepseek-v4-pro:cloud` latency climbs (16s → 28s) then hangs for minutes; 0.33.1 is unaffected. **Fix PR exists:** [PR #18382](https://github.com/ollama/ollama/pull/18382) bounds cloud proxy connect and TTFB timeouts (currently `http.DefaultClient` with no timeout).
2. **Tool-call output silently discarded on parse failure** — [Issue #17274](https://github.com/ollama/ollama/issues/17274). Failed parse yields empty `content`, no `tool_calls`, and ~40 completion tokens burned with no diagnostic path; the reporter corrected an earlier mischaracterization but the silent-discard behavior remains. Affects `/api/chat` and `/v1/chat/completions`.
3. **Gemma 4 tool calls with spaces in object keys dropped** — [Issue #18390](https://github.com/ollama/ollama/issues/18390). Unquoted keys break the parser; response arrives empty with `finish_reason: "stop"`. No fix PR yet.
4. **Gemma3n tool model returns empty `tool_calls` via `/v1`** — [Issue #18357](https://github.com/ollama/ollama/issues/18357). Model emits `<tool_call>` natively but Ollama returns neither `tool_calls` nor content, despite advertising the `tools` capability.
5. **Qwen3.8 500 during chat streaming** — [Issue #17778](https://github.com/ollama/ollama/issues/17778) (28 comments, 25 👍). `ResponseError ... no user query found in messages` when the model loops on tool calls at large context.
6. **Anthropic `/v1/messages` compat breaks on complex tool schemas** — [Issue #18346](https://github.com/ollama/ollama/issues/18346). Simple schemas work; Claude Code–style complex schemas cause the model to emit the call as literal text instead of a `tool_use` block.
7. **Qwen3 tool prompt construction bugs** — [Issue #14601](https://github.com/ollama/ollama/issues/14601): malformed tool definitions when passed via the `/api/chat` `tools` parameter (works when embedded in the system prompt).
8. **Broken low-bit quant artifacts** — [Issue #18252](https://github.com/ollama/ollama/issues/18252): `qwen2.5-coder:3b-instruct` at q2_K/q3_K_S/q3_K_M/q3_K_L scores 0/15 on a functional smoke suite while sibling quants pass 87–100%.
9. **Template `.Tools` regression for custom templates** — [PR #18391](https://github.com/ollama/ollama/pull/18391): since v0.14.0-rc0, `.Tools` is passed as `templateTools`, which prints as JSON via its `String()` method instead of structured data. **Fix PR open** (also note [PR #18388](https://github.com/ollama/ollama/pull/18388), which adds `args` field parsing to the generic tool parser).
10. **`/api/embed` port exhaustion on Windows** — [Issue #18392](https://github.com/ollama/ollama/issues/18392) (see Performance section).
11. **Content-triggered task cancellation** — [Issue #18387](https://github.com/ollama/ollama/issues/18387): text containing repeated ellipses (e.g., a table of contents) causes `stop: cancel task` in the server log.
12. **Invalid boolean env vars enabled features** — [PR #17087](https://github.com/ollama/ollama/pull/17087) (closed): `BoolWithDefault` returned `true` on parse error instead of the configured default, so a typo like `OLLAMA_GO_TEMPLATE=garbage` silently enabled the feature.
13. **Withdrawn:** the per-request file-descriptor leak claim in `ollama serve` — [Issue #18344](https://github.com/ollama/ollama/issues/18344) was based on an incorrectly scoped `lsof` invocation and has been retracted by the author. Do not plan work around it.

## What This Means for Application Developers
- **Treat tool calls as unreliable and validate every response.** Multiple independent parser failures (Gemma 4 spaced keys, Gemma3n, Qwen3 prompt construction, Anthropic compat) manifest as `finish_reason: "stop"` with empty `content` and no `tool_calls`. Never assume a successful HTTP 200 means a usable result — check for empty content explicitly, and log raw server output so parser drops are diagnosable.
- **Pin Ollama versions in production.** 0.34.0 has a reproducible cloud wedge, and there are unresolved load-time regressions versus pre-0.30 builds. 0.33.1 is a safer fallback for `:cloud` workloads until [PR #18382](https://github.com/ollama/ollama/pull/18382) ships.
- **Add client-side timeouts and watchdogs for cloud models.** The underlying proxy had no timeout at all, so a stalled upstream hangs requests indefinitely. Even after the fix lands, retry logic on latency creep (rather than only on HTTP errors) is the right pattern for long-running agents.
- **If you use Claude Code or other Anthropic-SDK clients against the `/v1/messages` endpoint,** keep tool schemas simple and flatten deeply nested objects until [Issue #18346](https://github.com/ollama/ollama/issues/18346) is resolved.
- **For eval and reproducibility pipelines,** [Issue #18394](https://github.com/ollama/ollama/issues/18394) proposes including the served manifest digest in local `/api/chat` responses — a real gap today, since `/api/tags` before/after cannot detect an A→B→A tag swap during a request. The manifest-list work in [PR #16590](https://github.com/ollama/ollama/pull/16590) will make digest-pinned lookups first-class, which is the correct long-term fix.
- **Embedding-heavy workloads** should throttle concurrency or recycle connections on Windows until keep-alive is addressed in [Issue #18392](https://github.com/ollama/ollama/issues/18392).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-12

## Today's Highlights
The Trivy supply-chain incident remains the dominant security thread: affected PyPI packages have been deleted and current releases are reported clean, but operators should still audit pinned versions and verify signed artifacts. Development continues with `v1.102.0-dev.2`, while the most material engineering work in the last 24h is around prompt-cache routing/cost estimation, provider/model metadata expansion, and several high-severity proxy/tool-calling regressions. Activity remains high: 47 issues and 304 PRs were updated in the last 24h.

## Releases & Breaking Changes
- **`v1.102.0-dev.2`** published. This is a dev pre-release; Docker images are cosign-signed with the same key introduced in commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). Verify signatures before deploying. [Release link](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.2)
- No stable release, migration note, or breaking API/config change was surfaced in this 24h window.

## New Model & Hardware Support
- **Model/pricing sync:** 218 models updated, 27 new, across Anthropic, Fireworks AI, Gemini, OpenAI, and Together AI. Pricing was read from provider-published pages. [PR #40809](https://github.com/BerriAI/litellm/pull/40809)
- **GitGot provider:** added as a JSON-configured OpenAI-compatible provider with base URL, docs, model list, and pricing metadata. [PR #40810](https://github.com/BerriAI/litellm/pull/40810)
- **Prism provider:** registered as a native provider, added to the Add Model form, with verified pricing and endpoint metadata. [PR #40782](https://github.com/BerriAI/litellm/pull/40782)
- No CUDA/ROCm/Metal/CPU backend or quantization-format changes were present in this dataset.

## Performance & Optimization
- **Prompt-cache affinity TTL fix:** routing affinity now matches `cache_control.ttl` instead of being hardcoded to 5 minutes, and system/tool cache blocks are detected. This addresses missed cache hits for 1-hour Anthropic caches. [PR #40776](https://github.com/BerriAI/litellm/pull/40776) · [Issue #28427](https://github.com/BerriAI/litellm/issues/28427)
- **Prompt-cache switch cost estimator:** new proxy endpoint estimates two-arm input costs and prices reads plus both write TTLs, making 5-minute vs 1-hour cache writes comparable. [PR #40804](https://github.com/BerriAI/litellm/pull/40804)
- **Routing observability:** closed PRs expose complexity-routing headers for tier, cause, score, and configured effort. [PR #40788](https://github.com/BerriAI/litellm/pull/40788) · [PR #40792](https://github.com/BerriAI/litellm/pull/40792)
- **Latency-routing race fix:** closed stale PR prevents a lost-update race in the latency tracker used by latency-based routing. [PR #29696](https://github.com/BerriAI/litellm/pull/29696)

## Stability & Regressions
Ranked by severity.

### Critical
- **Supply-chain compromise in PyPI `v1.82.7` / `v1.82.8`:** incident is contained; affected packages were deleted and current releases are reported free of the compromised code/component. Operators should still audit historical pins and CI caches. [Issue #24518](https://github.com/BerriAI/litellm/issues/24518)
- **ReDoS in `secret_redaction.redact_string()`:** catastrophic regex backtracking on large exception strings can block the event loop for minutes, kill liveness probes, and crash-loop replicas. No fix PR is noted in the data. [Issue #32353](https://github.com/BerriAI/litellm/issues/32353)

### High
- **Config-file models evicted with `store_model_in_db: true`:** editing any `litellm_params` field removes the deployment from running pods, and nothing restores it until restart. [Issue #40761](https://github.com/BerriAI/litellm/issues/40761)
- **Bedrock Converse tool-call history:** follow-up turns carrying tool-call history without a `tools` array are rejected before leaving the proxy. [Issue #40735](https://github.com/BerriAI/litellm/issues/40735)
- **Tool-call argument parsing:** `parse_tool_call_arguments` silently drops tool calls with concatenated JSON arguments, despite `split_concatenated_json_objects` existing. [Issue #40582](https://github.com/BerriAI/litellm/issues/40582)
- **Ollama native provider tool results:** Qwen3.8 tool results are not consumed via native Ollama, while OpenAI-compatible Ollama `/v1` works. [Issue #40575](https://github.com/BerriAI/litellm/issues/40575)
- **Responses-to-Chat bridge:** raw `reasoning_text` is dropped in both streaming and non-streaming results. [Issue #40654](https://github.com/BerriAI/litellm/issues/40654)
- **Azure AI model router:** no cost tracking. [Issue #40728](https://github.com/BerriAI/litellm/issues/40728)
- **Admin UI pricing persistence:** model edits persist derived pricing; after price-map reload, Azure spend can be recorded as `$0`. [Issue #40649](https://github.com/BerriAI/litellm/issues/40649)
- **Prompt-cache routing TTL:** hardcoded 5-minute affinity breaks 1-hour ephemeral cache routing; addressed by [PR #40776](https://github.com/BerriAI/litellm/pull/40776). [Issue #28427](https://github.com/BerriAI/litellm/issues/28427)

### Medium
- **JWT auth virtual-key inflation:** each token refresh mints a new “virtual key,” filling Usage with nameless `hashed-jwt-…` rows. [Issue #40398](https://github.com/BerriAI/litellm/issues/40398)
- **`silent_model` causes HTTP 500:** Responses and Anthropic Messages primary requests fail when `silent_model` is configured. [Issue #34890](https://github.com/BerriAI/litellm/issues/34890)
- **Vertex AI Realtime sample rate:** `pcm16` is hardcoded to 24,000 Hz, corrupting transcription quality. [Issue #40563](https://github.com/BerriAI/litellm/issues/40563)
- **Bedrock GPT-5.6 cross-region image input:** requests with images fail when routed through Converse instead of an OpenAI endpoint. [Issue #40080](https://github.com/BerriAI/litellm/issues/40080)
- **vLLM cached-token accounting:** token cost calculator ignores `cached_tokens` from vLLM. [Issue #22984](https://github.com/BerriAI/litellm/issues/22984)
- **`STORE_MODEL_IN_DB` precedence:** env var is ignored when config-file `general_settings.store_model_in_db=false`. [Issue #31968](https://github.com/BerriAI/litellm/issues/31968)
- **`lite codex` proxy bypass:** when `-c` is passed after a Codex subcommand, the CLI can silently bypass the proxy. [Issue #40651](https://github.com/BerriAI/litellm/issues/40651)
- **`cache_control_injection_points` dropped:** client-set `cache_control` on any unrelated message causes configured injection points to be silently dropped. [Issue #40675](https://github.com/BerriAI/litellm/issues/40675)
- **Traffic mirroring:** A/B testing traffic mirroring is not working as documented. [Issue #31888](https://github.com/BerriAI/litellm/issues/31888)
- **SpendLogs regression:** Responses-API bridge drops the SpendLogs row for non-streaming `/v1/chat/completions`. [Issue #36426](https://github.com/BerriAI/litellm/issues/36426)

### Closed / Stale in Last 24h
- OpenAI-compatible streaming now raises on in-band `data: {"error": ...}` events instead of silently returning empty success. [Issue #40578](https://github.com/BerriAI/litellm/issues/40578)
- Invalid `reasoning_effort` on Gemini/Vertex no longer surfaces as an HTTP 500; closed. [Issue #40474](https://github.com/BerriAI/litellm/issues/40474)
- `max_budget` ignored after reset; closed stale. [Issue #27300](https://github.com/BerriAI/litellm/issues/27300)
- `ResetBudgetJob` crash from unserialized `budget_limits`; closed stale. [Issue #27171](https://github.com/BerriAI/litellm/issues/27171)
- Bedrock `BedrockException` validation error in Cursor; closed stale. [Issue #19384](https://github.com/BerriAI/litellm/issues/19384)
- Bedrock embeddings missing AWS External ID support; closed stale. [Issue #27835](https://github.com/BerriAI/litellm/issues/27835)

### Fix PRs / Features to Watch
- MCP per-server OAuth metadata issuer matching, fixing mismatched issuers and 404 discovery. [PR #40808](https://github.com/BerriAI/litellm/pull/40808)
- Team service-account keys can use key-management endpoints for their own team, simplifying CI/CD rotation. [PR #40807](https://github.com/BerriAI/litellm/pull/40807)
- Admin UI sign-in rate limiting by username and source address. [PR #36116](https://github.com/BerriAI/litellm/pull/36116)
- `lite configure codex`, `--launch`, and `CLAUDE_CONFIG_DIR` / `CODEX_HOME` handling. [PR #40447](https://github.com/BerriAI/litellm/pull/40447)
- Codex `/model` picker sync from proxy `/v1/models`. [PR #40476](https://github.com/BerriAI/litellm/pull/40476)
- ConductGuard guardrail integration, with a superseding fixed branch. [PR #40785](https://github.com/BerriAI/litellm/pull/40785) · [PR #38143](https://github.com/BerriAI/litellm/pull/38143)

## What This Means for Application Developers
- **Pin and verify LiteLLM artifacts.** Avoid compromised PyPI `v1.82.7` / `v1.82.8`; verify Docker images with cosign. Treat current dev releases as pre-production unless you are actively tracking main.
- **Tool-calling agents need regression testing.** Bedrock Converse, native Ollama/Qwen3.8, and concatenated JSON tool arguments all have open issues that can drop or reject tool calls. Add end-to-end tests for follow-up turns and multi-tool histories.
- **Streaming clients should not trust empty successes.** The closed in-band streaming error bug means older versions could return empty success on upstream error events; use recent releases and keep client-side timeouts/retries.
- **Cache-heavy apps should re-evaluate routing.** PR #40776 fixes prompt-cache affinity TTL behavior, and PR #40804 makes 5-minute vs 1-hour cache write costs comparable. If you rely on Anthropic ephemeral caching, this is the main performance item to track.
- **Watch cost accounting closely.** Azure AI model router, vLLM cached tokens, and Admin UI pricing persistence all have open cost-tracking gaps. Validate SpendLogs against provider invoices.
- **`store_model_in_db` is risky for multi-pod deployments.** If you edit config-file models at runtime, be aware of eviction/restore issues in [Issue #40761](https://github.com/BerriAI/litellm/issues/40761) until fixed.
- **Provider/model catalog is expanding.** Prism, GitGot, and the 218-model pricing sync reduce manual OpenAI-compatible wiring for new backends. Re-sync pricing if you use cost-based routing or budgets.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-12

## Today's Highlights
No new releases landed in the last 24h. The most important in-flight work is security and correctness: a fix for Studio API keys inheriting the server owner’s Hugging Face login ([#10809](https://github.com/unslothai/unsloth/pull/10809)), and a fix for `clean_text` deleting every non-ASCII character in training corpora ([#10741](https://github.com/unslothai/unsloth/pull/10741)). Hardware/deployment work continues on AMD ROCm Docker ([#10820](https://github.com/unslothai/unsloth/pull/10820)), ARM64 CPU-only images ([#10766](https://github.com/unslothai/unsloth/pull/10766)), and real-MLX certification for Apple Silicon ([#10823](https://github.com/unslothai/unsloth/pull/10823)).

## Releases & Breaking Changes
- **No releases in the last 24h.**
- **Training config migration warning:** Users on the latest Docker image/package `2026.9.4` report `SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`; `max_seq_length` appears to have moved to `max_length`. Affected users should update configs or pin the prior image/package. [Issue #10785](https://github.com/unslothai/unsloth/issues/10785)
- **Windows ROCm dependency break:** `accelerate 1.15.0` breaks all Windows ROCm training because it imports `torch.distributed.tensor`, which AMD’s Windows ROCm wheels do not ship. PR #10819 caps `accelerate` below `1.15` on Windows. [PR #10819](https://github.com/unslothai/unsloth/pull/10819)
- **Gradient-accumulation rewrite correctness:** PR #10818 fixes `patch_gradient_accumulation_fix` emitting non-raw group references in `training_step`, which can corrupt the rewritten backward path. [PR #10818](https://github.com/unslothai/unsloth/pull/10818)

## New Model & Hardware Support
- **AMD ROCm Docker image:** PR #10820 adds an AMD ROCm variant alongside the CUDA/Blackwell image, targeting RDNA2–RDNA4 and CDNA/Instinct. Mirrors the existing `docker/` layout, `build.sh`, `run.sh`, and smoke-test structure. [PR #10820](https://github.com/unslothai/unsloth/pull/10820) · [Issue #6230](https://github.com/unslothai/unsloth/issues/6230) · [Issue #9581](https://github.com/unslothai/unsloth/issues/9581)
- **ARM64 CPU-only Docker target:** PR #10766 proposes an official CUDA-free ARM64 image for CPU-only deployments, distinct from GPU-enabled ARM64 systems like GH200/DGX Spark. [PR #10766](https://github.com/unslothai/unsloth/pull/10766)
- **Apple Silicon / MLX validation:** PR #10823 adds a focused real-MLX certification harness for Studio agent workspaces on Apple Silicon. [PR #10823](https://github.com/unslothai/unsloth/pull/10823)
- **ARM64 DGX Spark caveat:** Report PR #10491 finds the published `unsloth/unsloth` ARM64 Studio image runs `llama.cpp` on CPU on DGX Spark/GB10, with no code changes. This is a deployment limitation to track for ARM64 GPU users. [PR #10491](https://github.com/unslothai/unsloth/pull/10491)
- **Docker persistence:** PR #10600 introduces a single `/data` runtime persistence volume and a turnkey `docker compose` configuration to avoid clobbering pre-installed virtual environments. [PR #10600](https://github.com/unslothai/unsloth/pull/10600)

## Performance & Optimization
- **Windows GGUF memory residency:** PR #10618 avoids resident GGUF mappings for “Don’t reserve system RAM” loads on Windows. Windows cannot partially unmap the GGUF after offload, so the file can otherwise remain resident even after GPU offload. [PR #10618](https://github.com/unslothai/unsloth/pull/10618)
- **B200 training stalls:** Issue #10806 reports GPU idle most of each step while training Qwen3.5-9B LoRA with `unsloth-cli.py` on a B200; `fla` rebuilds its autotune key on every launch. No fix PR is listed yet. [Issue #10806](https://github.com/unslothai/unsloth/issues/10806)
- **Image projector micro-batch:** PR #10683 raises micro-batch for projectors that abort `llama-server` on images, e.g. `unsloth/gemma-4-12B-it-qat-GGUF` with a 1400x1400 image (~862 prompt tokens) dying on a `GGML_ASSERT`. [PR #10683](https://github.com/unslothai/unsloth/pull/10683)
- **Tool-call replay reprocessing:** Issue #10791 reports replayed tool calls sort argument keys, causing `llama-server` to re-process every multi-parameter call such as `edit_file`. [Issue #10791](https://github.com/unslothai/unsloth/issues/10791)
- **Multi-GPU tensor split ignored:** Issue #10355 reports `--tensor-split` is ignored, affecting multi-GPU layer partitioning and utilization. No fix PR listed. [Issue #10355](https://github.com/unslothai/unsloth/issues/10355)
- **Serving concurrency:** Issue #10671 reports a long GGUF chat waiting for tool approval can block queued chats despite free serving slots, because the approval wait retains the first chat’s context-budget commitment. [Issue #10671](https://github.com/unslothai/unsloth/issues/10671)

## Stability & Regressions
Ranked by severity.

- **Critical — auth/security:** Studio API keys without their own Hugging Face token could start training with the server owner’s HF login, allowing access to private models the key was never granted. Fix PR #10809 is open. [PR #10809](https://github.com/unslothai/unsloth/pull/10809)
- **Critical — data corruption:** `TextPreprocessor.clean_text` deletes every non-ASCII character across training corpora, e.g. `Le café était très bon.` → `Le caf tait trs bon.` Fix PR #10741 is open. [PR #10741](https://github.com/unslothai/unsloth/pull/10741)
- **High — training breakage:** Latest Docker/package `2026.9.4` throws `SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`. See breaking-changes note. [Issue #10785](https://github.com/unslothai/unsloth/issues/10785)
- **High — Windows ROCm training breakage:** `accelerate 1.15.0` breaks all Windows ROCm training. Fix PR #10819 caps `accelerate < 1.15`. [PR #10819](https://github.com/unslothai/unsloth/pull/10819)
- **High — CUDA crash:** `CUBLAS_STATUS_NOT_INITIALIZED` during FLUX.2 Klein VAE decoding in `pipeline_flux2_klein` on multi-GPU setups. No fix PR listed. [Issue #10768](https://github.com/unslothai/unsloth/issues/10768)
- **High — llama-server image crash:** Sending a reasonably sized image to `gemma-4-12B-it-qat-GGUF` can kill `llama-server` with `GGML_ASSERT`. Fix PR #10683 is open. [PR #10683](https://github.com/unslothai/unsloth/pull/10683)
- **High — Linux desktop FD leak:** X11 + NVIDIA `WebKitWebProcess` leaks DMA-BUF `sync_file` FDs until `EMFILE`, producing blank/frozen windows. No fix PR listed. [Issue #10795](https://github.com/unslothai/unsloth/issues/10795)
- **High — agent/tool correctness:** Duplicate tool-call guard blocks re-running a command after files changed; fix PR #10810 is open. Related: replayed calls sort argument keys and force reprocessing ([#10791](https://github.com/unslothai/unsloth/issues/10791)). [Issue #10792](https://github.com/unslothai/unsloth/issues/10792) · [PR #10810](https://github.com/unslothai/unsloth/pull/10810)
- **Medium — export fidelity:** Exporting a full fine-tune as a 16-bit merged model saves a 4-bit model instead. Fix PR #10808 is open. [PR #10808](https://github.com/unslothai/unsloth/pull/10808)
- **Medium — stop text ignored:** On NVIDIA GPUs, transformers models ignore requested stop text and continue until model completion or token limit. Fix PR #10812 is open. [PR #10812](https://github.com/unslothai/unsloth/pull/10812)
- **Medium — Anthropic partial failures:** Partially failed Anthropic replies are saved as complete, with no error or continuation path. Fix PR #10811 is open. [PR #10811](https://github.com/unslothai/unsloth/pull/10811)
- **Medium — Deep Research link stripping:** Deep Research removes URLs from code and commands, e.g. `git clone` links and `base_url=` values. Fix PR #10814 is open. [PR #10814](https://github.com/unslothai/unsloth/pull/10814)
- **Medium — CSV data formatting:** Blank Alpaca-style CSV cells are trained as the literal word `None`. Fix PR #10813 is open. [PR #10813](https://github.com/unslothai/unsloth/pull/10813)
- **Medium — quantization/mode bug:** Issue #10549 reports Unsloth layer mode and tensor mode are the same, producing a “fake BF16 mode” on v0.1.806-beta / package 2026.9.2. No fix PR listed. [Issue #10549](https://github.com/unslothai/unsloth/issues/10549)
- **Low — misleading GPU logs:** Manual GPU memory mode logs `--fit: on` while spawning with `--fit off`, making normal launches look like failed GPU probes. [Issue #10821](https://github.com/unslothai/unsloth/issues/10821)
- **Low — Studio settings drift:** Run settings sidebar and model dropdown keep separate drafts and silently disagree. [Issue #10817](https://github.com/unslothai/unsloth/issues/10817)

## What This Means for Application Developers
- **Multi-tenant Studio deployments:** Treat API-key auth as unsafe until PR #10809 lands. Audit whether API keys can inherit the server owner’s Hugging Face token before exposing training to external users. [PR #10809](https://github.com/unslothai/unsloth/pull/10809)
- **Multilingual/custom training pipelines:** Avoid `clean_text` or apply PR #10741; non-ASCII data is silently stripped today, which can corrupt datasets and degrade model behavior. [PR #10741](https://github.com/unslothai/unsloth/pull/10741)
- **Pin versions and configs:** Migrate `max_seq_length` to `max_length` where required, and pin `accelerate < 1.15` on Windows ROCm. [Issue #10785](https://github.com/unslothai/unsloth/issues/10785) · [PR #10819](https://github.com/unslothai/unsloth/pull/10819)
- **Agentic apps:** Long tool-approval waits can block otherwise free serving slots; duplicate tool-call guards can block legitimate reruns after edits; replay sorting can force redundant `llama-server` processing. Fixes are in flight, but test long approval flows and file-edit/test loops carefully. [Issue #10671](https://github.com/unslothai/unsloth/issues/10671) · [PR #10810](https://github.com/unslothai/unsloth/pull/10810) · [Issue #10791](https://github.com/unslothai/unsloth/issues/10791)
- **Multi-GPU serving:** Verify `--tensor-split` behavior before relying on it for GPU partitioning. [Issue #10355](https://github.com/unslothai/unsloth/issues/10355)
- **Windows GGUF memory tuning:** If using “Don’t reserve system RAM,” track PR #10618; current behavior can leave the full GGUF resident in memory after offload. [PR #10618](https://github.com/unslothai/unsloth/pull/10618)
- **Export workflows:** Validate 16-bit full fine-tune exports; current Studio behavior may save 4-bit weights. [PR #10808](https://github.com/unslothai/unsloth/pull/10808)
- **Hardware roadmap:** AMD ROCm Docker and ARM64 CPU-only images are moving forward; Apple Silicon MLX certification is being added. For DGX Spark/ARM64 GPU users, note the current published image may run `llama.cpp` on CPU. [PR #10820](https://github.com/unslothai/unsloth/pull/10820) · [PR #10766](https://github.com/unslothai/unsloth/pull/10766) · [PR #10823](https://github.com/unslothai/unsloth/pull/10823) · [PR #10491](https://github.com/unslothai/unsloth/pull/10491)

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*