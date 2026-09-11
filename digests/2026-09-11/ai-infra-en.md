# AI Infrastructure Digest 2026-09-11

> Generated: 2026-09-11 00:31 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Comparison — 2026-09-11

*Note: issue/PR counts below are unique GitHub issue/PR links cited in the 2026-09-11 digest summaries, not full repository tracker totals. They are a directional proxy for activity.*

## 1. Ecosystem Overview

The AI infrastructure layer is in a high-velocity but correctness-constrained phase: no major serving-engine release landed today, while DeepSeek V4.1/V4, GLM-5.3-Flash, Qwen3.8, Kimi-K3, and MiniMax-M3 integration work dominates vLLM, SGLang, and llama.cpp. The most important pattern is that **silent correctness and determinism regressions are now the primary blocker**, not raw throughput: speculative decoding, prefix caching, quantized kernels, and distributed serving paths all surfaced wrong-output or crash reports. Hardware fragmentation is also widening across Blackwell/SM120/SM121/GB10, ROCm, Vulkan, NPU, and Apple MLX. Meanwhile, LiteLLM is expanding the gateway/control-plane surface with OCR and spend/routing fixes, and Unsloth is pushing fine-tuning plus multimodal quantization toward NVFP4/FP8/INT8. The market is separating into three races: datacenter serving engines, local runtimes, and control-plane/training tooling.

## 2. Activity Comparison

| Project | Digest-referenced unique Issues | Digest-referenced unique PRs | Release status |
|---|---:|---:|---|
| vLLM | 26 | 17 | No new releases/tags in last 24h |
| SGLang | 28 | 18 | No new releases; CI reports 2 broken, 8 flaky |
| llama.cpp | 18 | 25 | 10 nightly builds landed, b10889 → b10901; no breaking changes |
| Ollama | 15 | 14 | No releases; open CVE report and FD leak |
| LiteLLM | 21 | 16 | v1.100.1 stable; v1.101.0-rc.2 release candidate |
| Unsloth | 22 | 18 | No tagged releases |

**Read:** vLLM and SGLang remain the most issue-heavy datacenter serving projects, with correctness and hardware-backend triage dominating. llama.cpp has the highest PR cadence, reflecting rapid backend/kernel iteration. LiteLLM is the only project with a stable + RC release in this window. Ollama and Unsloth are active but not releasing tagged artifacts today.

## 3. Model Support Race

| Model / architecture cluster | vLLM | SGLang | llama.cpp | Ollama | LiteLLM | Unsloth |
|---|---|---|---|---|---|---|
| **DeepSeek V4 / V4.1 / V4-Flash** | V4 Vision on ROCm, V4.1 Engram DP sharding/offload; Ampere SM8x for V4-Flash still unsupported | Deepest V4.1 integration: shared-experts fusion, HiCache SWA replay, indexer unification, compressed pool; V4-Flash corruption and V4.1 fusion garbage-logits issues | V4.1-Flash conversion support in PR | Cloud support requested/closed | Time-of-day pricing request stale | — |
| **GLM-5.3-Flash / GLM5-Next** | Unsupported `Glm5NextTextLinearAttention`; GLM-5.3 B200 crashes and ROCm silent random-token regression | SM120 qualification, ROCm GLM5 DSA indexer optimization; checkpoint-loading weight-drop issue | GLM-5.3-Flash GLM5-Next conversion PR | Cloud stream-abort fix | — | — |
| **Qwen3.5 / Qwen3.8 / Next** | Qwen3.8 non-determinism, tool-choice/MTP issues; hybrid GDN + MTP prefix-cache penalty | Qwen3.5 GDN multi-item scoring, AMD fused quantized `in_proj`, Qwen3.8 QSA removal; H20 FP8 launch failure and DFlash2 divergence | Vulkan small-M Qwen optimization; qwen4exp QSA indexer cache | qwen3-coder tool-call gaps; qwen2.5-coder low-bit failures | vLLM `cached_tokens` cost gap | Qwen3.5-9B LoRA SFT; Qwen3.8 GGUF long-context reprocessing |
| **Kimi-K3 / MiniMax-M3** | Kimi-K3 ROCm shared-expert multi-stream WIP; MiniMax-M3 FP4 AR+GemmaNorm fusion | Kimi-K3 strict tool-call grammar bug; MiniMax-M3 ROCm fp8 indexer + shared-experts fusion | — | — | Kimi-K2.6 Together request | — |
| **Local / multimodal** | Ling-3.0-flash-VL XPU CI dependency | SenseNova-U1/U1.5 tracking | Ling 3.0 chat parser; GLM-5.3, DeepSeek V4.1 conversion | Gemma4/3n parser fixes; Gemma3n CPU projector corruption | Azure/Vertex/Reducto OCR adapters | NVFP4 video, FP8/INT8 image, MLX MoE/decode fusion |

**Who is ahead:**
- **SGLang** is furthest into DeepSeek V4.1 integration depth, but that code is not production-safe yet.
- **vLLM** has the broadest model + hardware enablement and the most active correctness triage, especially around GLM, Qwen, speculative decoding, and ROCm/Blackwell.
- **llama.cpp** is ahead on local/GGUF conversion for DeepSeek V4.1-Flash, GLM-5.3-Flash, and Ling 3.0, and on backend portability.
- **Ollama** lags on new model kernels; today’s work is mostly parser/tool-call correctness and cloud plumbing.
- **LiteLLM** is not competing on model kernels but is expanding provider and OCR surface.
- **Unsloth** leads on fine-tuning and multimodal quantization, not serving-engine model support.

## 4. Performance Frontier

| Optimization area | Where effort is concentrated |
|---|---|
| **KV cache / prefix cache** | vLLM: MTP/EAGLE prefix-cache last-block recompute, scheduler collapse at batch ≥ 4. SGLang: HiCache, Mamba radix-cache prefix-hit regression, versioned KV hint envelope. llama.cpp: prompt-cache LoRA contamination. Ollama: prefix-cache eviction on active path. Unsloth: full-context reprocessing after tool calls/reloads. |
| **Batching / scheduling** | vLLM: PCP decode sharding, async scheduling, batch-invariant determinism. SGLang: breakable prefill CUDA graphs under DCP, speculative-worker prefill staging. llama.cpp: Vulkan small-M and MoE top-k prefill fusion. LiteLLM: `max_parallel_requests` leak on cancelled Anthropic streams. |
| **Quantization** | vLLM: MXFP4 MoE, Marlin W4A8-FP8, FP4 fusion; GB10 Marlin silent corruption. SGLang: SM120 per-tensor FP8 GEMM, MiniMax fp8 K cache, AMD fused quantized `in_proj`. llama.cpp: VNNI k-quant `mul_mat` claiming 3–7x, CUDA 4-bit KV fallback. Unsloth: NVFP4/FP8/INT8 image/video paths. Ollama: q2/q3 Qwen2.5-Coder failures. |
| **Distributed serving** | vLLM: fixed-order TP all-reduce, CUTLASS Blackwell fused GEMM+AllReduce, MoE collectives via `torch.compile`, EP/DP/TP/PP combinations. SGLang: TP24 Hopper vocab padding, NCCL 2.29–2.30 roadmap, PD disaggregation, DCP. |
| **Kernels / backends** | vLLM: CUTLASS, Triton, Marlin, ROCm/TheRock. SGLang: ROCm aiter, SM120 FP8, DeepSeek V4 indexer kernels. llama.cpp: Vulkan, SYCL graph replay, CUDA/ROCm RDNA3.5 WMMA MMQ. Unsloth: NVFP4 kernels, MLX MoE/decode fusion. |
| **Gateway / control plane** | LiteLLM: spend-tracking sidecar, health-check DB storm, budget-reset scaling, OCR adapters, streaming mock re-tokenization. SGLang: KV hint envelope for orchestrators. Ollama: GGUF metadata caching, MLX scheduler memory checks. |

**Concentration:** Datacenter serving effort is splitting between vLLM’s distributed/correctness work and SGLang’s ROCm/SM120 + DeepSeek V4.1 integration. Local inference effort is in llama.cpp’s CPU/Vulkan kernels and Ollama’s MLX/memory management. Control-plane optimization is almost entirely LiteLLM. Training/quantization optimization is Unsloth.

## 5. Layer Positioning

| Layer | Projects | Positioning |
|---|---|---|
| **Datacenter serving engines** | **vLLM**, **SGLang** | High-throughput GPU serving for production LLMs. vLLM emphasizes broad model/hardware coverage + correctness fixes. SGLang emphasizes DeepSeek V4.x, ROCm/SM120, structured/agentic serving. |
| **Local runtimes** | **llama.cpp**, **Ollama** | llama.cpp is the portable GGUF/CPU/GPU inference engine with aggressive backend/kernel work. Ollama is the user-friendly desktop/server wrapper around llama.cpp/MLX with cloud offload. |
| **LLM gateway / proxy** | **LiteLLM** | Provider-agnostic routing, auth, spend tracking, fallbacks, observability, and now OCR/control-plane features. Not an inference engine. |
| **Fine-tuning / training acceleration** | **Unsloth** | LoRA/fine-tuning, quantization, Studio inference, MLX/MoE optimization, and multimodal/video quantization. Adjacent to serving but focused upstream. |

**Practical implication:** If you are building production inference, vLLM and SGLang are your serving candidates, but both have open correctness caveats today. llama.cpp/Ollama are for local or edge deployment. LiteLLM is the gateway layer for multi-provider orchestration. Unsloth is the training/quantization layer.

## 6. Trend Signals

1. **DeepSeek V4.1 and GLM-5.3-Flash are the integration battleground — but not production-ready.** SGLang is deepest on V4.1, vLLM is broadest on hardware, and llama.cpp is converting for local use. However, shared-experts fusion garbage logits, checkpoint weight drops, B200 crashes, and ROCm silent random tokens mean production rollout should wait for fixes.

2. **Silent correctness and determinism are now the top infrastructure risk.** vLLM has GLM-5.3 ROCm silent random tokens, Qwen3.8 greedy non-determinism, and GB10 Marlin corruption. llama.cpp has speculative decoding divergence on quantized targets and MTP lockups. Ollama has low-bit Qwen2.5-Coder failures. Application developers should pin known-good versions, run golden-output tests, and avoid speculative decoding on quantized targets unless validated.

3. **Speculative decoding + prefix caching is not a free performance win.** vLLM reports 30–40% batch throughput loss on prefix-reusing hybrid GDN/MTP workloads and a scheduler concurrency cliff. llama.cpp reports MTP lockups and greedy divergence. Benchmark spec decode against vanilla before enabling it for agent or batch workloads.

4. **Hardware fragmentation is increasing, and non-CUDA backends are getting real attention.** Blackwell/SM120/SM121/GB10, ROCm, Vulkan, SYCL, NPU, and Apple MLX all appear in active work. But GB10/DGX Spark currently has multiple quantized-serving corruption reports, and ROCm paths have platform-specific failures. Validate per-driver and per-quant.

5. **Agentic workloads are pulling gateway and runtime features forward.** Tool calling, structured output, 1M context, KV-cache hints, OCR, and per-request LoRA isolation are all active. LiteLLM is consolidating OCR and spend/routing; SGLang is proposing KV hint envelopes; Ollama and llama.cpp are fixing tool-call and server API semantics. If you build agents, watch tool-call grammar correctness and prompt-cache contamination.

6. **Quantization and multimodal fine-tuning are expanding.** Unsloth is adding NVFP4 video/image paths, MLX MoE fusion, and LoRA SFT improvements. llama.cpp may land a 3–7x CPU k-quant matmul speedup. But low-bit quants still produce silent failures in some stacks — especially Ollama’s q2_K/q3_K Qwen2.5-Coder artifacts.

7. **Security and supply-chain hygiene remain production readiness items.** Ollama has an open CVE report and an FD leak in `ollama serve`. LiteLLM is enforcing cosign-signed Docker images, but also had a retry-breadcrumb memory leak in v1.100.0. SGLang users on IB fabrics may need NVSHMEM 3.7.2 for `NVSHMEM_IB_GID_INDEX`. Treat these as deployment blockers, not backlog noise.

**What to watch next:** whether SGLang’s DeepSeek V4.1 shared-experts fix lands, whether vLLM resolves Ampere DeepSeek-V4-Flash support and GB10 quantized corruption, whether llama.cpp’s VNNI k-quant PR merges, and whether LiteLLM closes the Claude Code → vLLM routing gap. For now, the ecosystem is advancing fastest in model coverage and kernel specialization, but the gating factor for production remains output correctness and hardware-specific stability.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-11

## 1. Today's Highlights

No releases landed in the last 24h, but the tracker stayed hot around three clusters: **Ampere (SM8x) support for DeepSeek-V4-Flash** remains the highest-engagement open issue, **speculative decoding + prefix cache** correctness in hybrid GDN/MTP models is generating both bug reports and fix PRs ([#53670](https://github.com/vllm-project/vllm/issues/53670), [#52244](https://github.com/vllm-project/vllm/pull/52244)), and **Blackwell/GB10 (sm_121) plus ROCm** paths continue to surface correctness regressions rather than clean perf wins. On the positive side, determinism work advanced with a new opt-in fixed-order TP all-reduce and continued batch-invariant tracking.

## 2. Releases & Breaking Changes

- **No new releases or tags in the last 24h.**
- Behavioral guard in flight: MRV1 + PP>1 + async scheduling + structured output is being explicitly rejected instead of failing at runtime with HTTP 500 / "Failed to advance FSM" — [PR #56250](https://github.com/vllm-project/vllm/pull/56250).
- New opt-in config surface: `VLLM_TP_FIXED_ORDER_ALLREDUCE=1` for deterministic, fixed-rank-order TP reduction — [PR #56358](https://github.com/vllm-project/vllm/pull/56358).
- New build flag: `VLLM_USE_ROCK=1` to select TheRock-based ROCm Dockerfiles in AMD CI — [PR #56351](https://github.com/vllm-project/vllm/pull/56351).

## 3. New Model & Hardware Support

- **DeepSeek V4 Vision on ROCm** — moves the platform-neutral `DeepseekV4ForConditionalGeneration` wrapper to `common/` and enables ROCm registry, dummy-init and tensor-schema paths; [PR #55107](https://github.com/vllm-project/vllm/pull/55107).
- **DeepSeek V4.1 Engram (DP sharding + offload prefetch)** — stacked work supporting DP-sharded Engram tables with mmap-shared host tables; [PR #56357](https://github.com/vllm-project/vllm/pull/56357).
- **Ampere/SM8x for DeepSeek-V4-Flash-0731** — still unsupported on A100/A800/RTX 30xx; top-traffic feature request with 107 comments; [Issue #50576](https://github.com/vllm-project/vllm/issues/50576).
- **GLM-5.3-Flash `Glm5NextTextLinearAttention` unsupported** — new architecture not yet handled in vLLM nightly; [Issue #54062](https://github.com/vllm-project/vllm/issues/54062).
- **Kimi-K3 shared-expert multi-stream overlap on ROCm TP>1** — WIP enablement; [PR #56167](https://github.com/vllm-project/vllm/pull/56167).
- **Turing (SM 7.5) Gemma4** — all attention backends hit shared-memory limits; no path forward reported; [Issue #38918](https://github.com/vllm-project/vllm/issues/38918).
- **sm_121 (GB10 / DGX Spark) on aarch64** — still no official support; [Issue #36821](https://github.com/vllm-project/vllm/issues/36821).
- **OmniLingual ASR (1600+ languages)** — new-model request, referenced as Voxtral/LLaMA-adjacent; [Issue #28509](https://github.com/vllm-project/vllm/issues/28509).
- **XPU CI dependency**: `decord==0.6.0` added to test requirements after `inclusionAI/Ling-3.0-flash-VL` registry entry; [PR #56355](https://github.com/vllm-project/vllm/pull/56355).

## 4. Performance & Optimization

- **CUTLASS Blackwell Lamport fused GEMM+AllReduce** — proposal to replace the existing GEMM-RS path on SM100; no benchmark numbers yet; [Issue #55261](https://github.com/vllm-project/vllm/issues/55261).
- **TP MoE collectives via `torch.compile` pass** — eliminates redundant sequence-parallel all-gathers in DeepSeek-family MoE without linear-layer surgery; [Issue #29139](https://github.com/vllm-project/vllm/issues/29139).
- **MXFP4 MoE round-up starving KV cache on CDNA3** — TP-sharded expert weights inflated to 135.35 GiB (no EP) vs 103.54 GiB (EP); fix PR open; [PR #56359](https://github.com/vllm-project/vllm/pull/56359), [Issue #53961](https://github.com/vllm-project/vllm/issues/53961).
- **PCP decode sharding** — round-robins decode-only rows across PCP ranks instead of replicating decode on every rank when `DCP == 1`; [PR #52162](https://github.com/vllm-project/vllm/pull/52162).
- **EAGLE/MTP prefix-cache last-block drop** — 1,648-token recompute per cache hit on one hybrid Qwen3.8 GDN layout → ~30–40% batch throughput loss on prefix-reusing workloads; fix PR in review; [Issue #53670](https://github.com/vllm-project/vllm/issues/53670), [PR #52244](https://github.com/vllm-project/vllm/pull/52244).
- **Hybrid GDN + MTP scheduler collapse** — only ~3 concurrent sequences at batch ≥ 4, acceptance/throughput cliff; [Issue #55533](https://github.com/vllm-project/vllm/issues/55533).
- **Minimax-M3 FP4: fuse AR + GemmaNorm** — in-progress kernel fusion; [PR #52680](https://github.com/vllm-project/vllm/pull/52680).
- **Zero JIT compilation at runtime** — umbrella tracking issue for de-JIT-ification across DeepSeek V4 and other families, several blockers closed; [Issue #49349](https://github.com/vllm-project/vllm/issues/49349).
- **Marlin W4A8-FP8 on GB10** — runs ~2.5% faster but produces silently corrupted output; perf gain not usable; [Issue #49546](https://github.com/vllm-project/vllm/issues/49546).

## 5. Stability & Regressions

Ranked by severity (silent wrong output > crash > perf regression):

**Critical — silent correctness**
- **GLM-5.3 (`GlmMoeDsa`) + decode-context-parallel on ROCm**: crashes on 0.28.0, **silently returns random tokens on 0.29.0** — regression 0.27→0.28+; [Issue #54300](https://github.com/vllm-project/vllm/issues/54300).
- **Marlin W4A8-FP8 (`VLLM_MARLIN_INPUT_DTYPE=fp8`) on GB10/sm_121a**: corrupts output, WNA16 INT4 MoE emits repeated `</think>` loop at temp 0; [Issue #49546](https://github.com/vllm-project/vllm/issues/49546).
- **Qwen3.8-Flash-Next greedy non-determinism**: five identical `temperature=0` requests return five completions once context exceeds `indexer_budget` (QSA dense→top-k switch), traced to `persistent_topk` in prefill; sm121/GB10; [Issue #54521](https://github.com/vllm-project/vllm/issues/54521).
- **`persistent_topk` drops candidates** when many values share a coarse histogram bin — related to above; [Issue #51782](https://github.com/vllm-project/vllm/issues/51782).
- **Stale Triton kernel cache on DGX Spark (sm_121)**: garbled outputs, wiping `~/.triton/cache` restores correctness — now **closed**; [Issue #41871](https://github.com/vllm-project/vllm/issues/41871).
- **Fixed-order TP reduction** proposed to eliminate run-to-run nondeterminism from rank-order-dependent summation; [PR #56358](https://github.com/vllm-project/vllm/pull/56358). Batch-invariant work continues to be tracked; [Issue #27433](https://github.com/vllm-project/vllm/issues/27433).

**High — crashes / init failures**
- **GLM-5.3-Flash recurring CUDA illegal memory access on 4×B200**, surfacing in three unrelated kernels (KDA linear-attention, MHC TileLang, TRT-LLM fused MoE); [Issue #54317](https://github.com/vllm-project/vllm/issues/54317).
- **GLM-5.3-Flash checkpoint loading error** on v0.29.0 (worker proc fails to start, TP2/EP2) — **closed**; [Issue #56007](https://github.com/vllm-project/vllm/issues/56007).
- **`custom_all_reduce` IPC handle failure** with `expandable_segments:True` when DP>1 **and** TP>1 (works with either alone); [Issue #42609](https://github.com/vllm-project/vllm/issues/42609).
- **DeepSeek-V4-Pro on 8×H20-3e**: `mlir_global_dtors()` missing-argument error; [Issue #44949](https://github.com/vllm-project/vllm/issues/44949).
- **ROCm FLA `chunk_gated_delta_rule` Triton compile failure** on MI210/gfx90a with `num_stages=4`; [Issue #44973](https://github.com/vllm-project/vllm/issues/44973).
- **Tesla T4 shared-memory OOR** in Triton (required 81920, limit 65536); [Issue #36802](https://github.com/vllm-project/vllm/issues/36802).
- **Mistral3 HF-format text-only `LLM()` init** fails in multimodal profiling — **closed**; [Issue #50706](https://github.com/vllm-project/vllm/issues/50706).

**Frontend / API correctness**
- **Anthropic-compatible streaming drops `stop_sequence`** in terminal `message_delta` due to `exclude_unset=True`; fix PR open (needs rebase), duplicate closed; [PR #56259](https://github.com/vllm-project/vllm/pull/56259), [PR #55325](https://github.com/vllm-project/vllm/pull/55325).
- **`tool_choice="required"` not enforced** for Qwen3.8-Flash-Next (streaming, `enable_thinking=false`), plus xgrammar FSM failures with thinking + MTP — **closed**; [Issue #55552](https://github.com/vllm-project/vllm/issues/55552).
- **Thinking-token budget not enforced with MTP speculative decoding** (works without MTP) — **closed**; [Issue #39573](https://github.com/vllm-project/vllm/issues/39573).
- **MRV1 + PP>1 + async sched + structured output** now blocked at config validation; [PR #56250](https://github.com/vllm-project/vllm/pull/56250).

**In-flight fixes worth tracking**
- Hybrid GDN prefix-cache under MTP: [PR #52244](https://github.com/vllm-project/vllm/pull/52244).
- DFlash DP metadata during profiling: [PR #56330](https://github.com/vllm-project/vllm/pull/56330).
- Step-3.5 MTP fix (merged/closed): [PR #54672](https://github.com/vllm-project/vllm/pull/54672).
- Noncompiled cudagraph fallback (stacked, superseded by #55095): [PR #55095](https://github.com/vllm-project/vllm/pull/55095), [PR #56191](https://github.com/vllm-project/vllm/pull/56191).

## 6. What This Means for Application Developers

- **Determinism is not yet a default guarantee.** If you rely on reproducible outputs (eval harnesses, caching, regression tests), be aware of `persistent_topk` non-determinism on Qwen3.8/SM121 ([#54521](https://github.com/vllm-project/vllm/issues/54521)) and rank-order-sensitive TP reductions. Watch `VLLM_TP_FIXED_ORDER_ALLREDUCE` ([#56358](https://github.com/vllm-project/vllm/pull/56358)) and the batch-invariant tracking issue ([#27433](https://github.com/vllm-project/vllm/issues/27433)).
- **Avoid GB10/DGX Spark for quantized serving today.** Both stale Triton cache corruption ([#41871](https://github.com/vllm-project/vllm/issues/41871), now closed) and Marlin W4A8-FP8 silent corruption ([#49546](https://github.com/vllm-project/vllm/issues/49546)) hit this platform. If you must use it, pin kernel caches and validate outputs.
- **GLM-5.3-Flash is not production-ready on B200 or ROCm.** Illegal memory access on 4×B200 ([#54317](https://github.com/vllm-project/vllm/issues/54317)) and silent random-token output on ROCm 0.29.0 ([#54300](https://github.com/vllm-project/vllm/issues/54300)) are blockers; 0.27 was the last non-crashing point for the ROCm DCP path.
- **Speculative decoding + prefix caching can cost you throughput, not save it.** If you serve Qwen3.5/3.8 hybrid GDN with MTP and heavy prompt reuse, budget for the last-block recompute penalty ([#53670](https://github.com/vllm-project/vllm/issues/53670)) or disable MTP until [#52244](https://github.com/vllm-project/vllm/pull/52244) lands. The scheduler concurrency cliff at batch ≥ 4 ([#55533](https://github.com/vllm-project/vllm/issues/55533)) is worth benchmarking against your own traffic.
- **Anthropic-compatible clients**: the streaming `message_delta` `stop_sequence` field is currently dropped on some stop reasons; if your client parses it, wait for [#56259](https://github.com/vllm-project/vllm/pull/56259) or read `stop_reason` only.
- **Config combinations to avoid until patched**: MRV1 + PP>1 + async scheduling + structured output ([#56250](https://github.com/vllm-project/vllm/pull/56250)), and `expandable_segments:True` with simultaneous DP>1 and TP>1 ([#42609](https://github.com/vllm-project/vllm/issues/42609)).
- **ROCm users**: decode-context-parallel on GLM MoE is unsafe ([#54300](https://github.com/vllm-project/vllm/issues/54300)); MI210 FLA paths need `num_stages` adjustment ([#44973](https://github.com/vllm-project/vllm/issues/44973)); MXFP4 MoE KV-cache pressure is being fixed ([#56359](https://github.com/vllm-project/vllm/pull/56359)).

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang Digest — 2026-09-11

### 1. Today's Highlights
No new releases landed in the last 24h; activity is dominated by DeepSeek V4.1 integration work, ROCm/SM120 kernel optimization, and ongoing CI/CUDA stability triage. The most active issue remains the CUDA coredump tracker [#26340](https://github.com/sgl-project/sglang/issues/26340) with 297 comments, while CI reports 2 broken and 8 flaky tests [#17050](https://github.com/sgl-project/sglang/issues/17050). Several model-specific correctness and crash reports remain open across DeepSeek, GLM, Kimi, Qwen, and MiniMax workloads.

### 2. Releases & Breaking Changes
- No new SGLang releases were published in the last 24h.
- Closed RFCs propose deprecating legacy GPTQ non-Marlin kernels and the Dual Chunk Flash Attention backend [#32112](https://github.com/sgl-project/sglang/issues/32112), plus the CUTLASS MLA attention backend [#32111](https://github.com/sgl-project/sglang/issues/32111). Users pinned to these backends should plan migration.
- ROCm 7.0 kernel wheel retirement is proposed, leaving ROCm 7.2/10.0 legs with CI coverage [#38767](https://github.com/sgl-project/sglang/pull/38767).
- Bundled NVSHMEM 3.4.5 lacks `NVSHMEM_IB_GID_INDEX`; an upgrade to 3.7.2 is requested for IB fabrics requiring explicit GID pinning [#38769](https://github.com/sgl-project/sglang/issues/38769).

### 3. New Model & Hardware Support
- **DeepSeek V4.1 / V4 / V4-Flash**: active integration includes shared-experts fusion routing [#38963](https://github.com/sgl-project/sglang/pull/38963), HiCache encoder SWA replay [#38957](https://github.com/sgl-project/sglang/pull/38957), indexer execution unification [#38962](https://github.com/sgl-project/sglang/pull/38962), compressed pool generalization [#38954](https://github.com/sgl-project/sglang/pull/38954), and a fork-sync prerequisite for V4.1 [#38818](https://github.com/sgl-project/sglang/issues/38818). Rust frontend fallback renderers are proposed for models without chat templates [#38939](https://github.com/sgl-project/sglang/pull/38939).
- **SenseNova-U1 / U1.5**: feature and performance tracking for support in SGLang [#37742](https://github.com/sgl-project/sglang/issues/37742).
- **GLM-5.3-Flash**: SM120/Blackwell qualification tracking [#37813](https://github.com/sgl-project/sglang/issues/37813); ROCm GLM5 DSA indexer optimization [#34394](https://github.com/sgl-project/sglang/pull/34394); checkpoint-loading correctness issue [#38618](https://github.com/sgl-project/sglang/issues/38618).
- **Qwen3.5 / Qwen3.8**: Qwen3.5 GDN multi-item scoring feature closed [#31969](https://github.com/sgl-project/sglang/issues/31969); AMD fused quantized `in_proj` layers for Qwen3.5 [#33068](https://github.com/sgl-project/sglang/pull/33068); Qwen3.8 Next tokenwise QSA removal [#38960](https://github.com/sgl-project/sglang/pull/38960); H20 Qwen3.8-Flash-Next-FP8 launch failure [#38793](https://github.com/sgl-project/sglang/issues/38793); DFlash2 Qwen3.8-27B divergence [#38009](https://github.com/sgl-project/sglang/issues/38009).
- **MiniMax-M3**: ROCm fp8 lightning-indexer K cache allocation [#36549](https://github.com/sgl-project/sglang/pull/36549) and shared-experts fusion on gfx942+ [#36576](https://github.com/sgl-project/sglang/pull/36576).
- **Hardware backends**: SM120 per-tensor FP8 GEMM for small-M [#34429](https://github.com/sgl-project/sglang/pull/34429); NPU router GEMM fp32 requirement [#34861](https://github.com/sgl-project/sglang/issues/34861); DeepSeek V4 Pro TP24 Hopper vocabulary-padding fix [#31801](https://github.com/sgl-project/sglang/pull/31801).

### 4. Performance & Optimization
- ROCm GLM5 DSA indexer q/k prep collapsed into a single aiter kernel, reducing ~11 kernels per decode layer [#34394](https://github.com/sgl-project/sglang/pull/34394).
- SM120 small-M per-tensor FP8 GEMM added for Blackwell-class GPUs [#34429](https://github.com/sgl-project/sglang/pull/34429).
- AMD Qwen3.5 quantized `in_proj_qkvz` and `in_proj_ba` GEMMs fused into one wider GEMM [#33068](https://github.com/sgl-project/sglang/pull/33068).
- MiniMax-M3 lightning-indexer K cache moved to fp8 on ROCm [#36549](https://github.com/sgl-project/sglang/pull/36549); shared-experts fusion enabled on ROCm gfx942+ [#36576](https://github.com/sgl-project/sglang/pull/36576).
- DSV4 DeepGEMM MegaMoE shared-to-sparse expert fusion proposed [#38700](https://github.com/sgl-project/sglang/issues/38700).
- DeepSeek V4.1 indexer execution decisions and compressed pool management are being centralized for better prefill/decode behavior [#38962](https://github.com/sgl-project/sglang/pull/38962), [#38954](https://github.com/sgl-project/sglang/pull/38954).
- Breakable prefill CUDA graphs under decode context parallelism are being fixed/enabled [#38943](https://github.com/sgl-project/sglang/pull/38943).
- Speculative workers can stage prefill shared reads early via an opt-in callback [#38554](https://github.com/sgl-project/sglang/pull/38554).
- NCCL 2.29–2.30 feature integration roadmap includes EP, M-to-N transfer, zero-SM one-sided communication, and RAS monitoring [#32774](https://github.com/sgl-project/sglang/issues/32774).
- Versioned KV hint envelope proposal aims to give orchestrators programmatic KV-cache control for agentic workloads [#36224](https://github.com/sgl-project/sglang/issues/36224).

### 5. Stability & Regressions
Ranked by severity:

1. **CUDA coredump tracker remains very active** — auto-collected coredumps from `pr-test.yml`, 297 comments, no single fix tracked [#26340](https://github.com/sgl-project/sglang/issues/26340).
2. **CI health degraded** — 2 broken, 8 flaky, 984 recently fixed; maintenance mode was previously activated [#17050](https://github.com/sgl-project/sglang/issues/17050), [#21065](https://github.com/sgl-project/sglang/issues/21065).
3. **PD-disaggregation decode retraction crash** — DCP > 1 decode retraction can hit CUDA device-side assert in `get_cpu_copy`; hardening PR open [#38645](https://github.com/sgl-project/sglang/issues/38645), fix PR [#38961](https://github.com/sgl-project/sglang/pull/38961).
4. **DeepSeek V4.1 shared-experts fusion produces garbage logits** — FP8 weights + mxfp4 experts with `--enforce-shared-experts-fusion`; fix PR open [#38963](https://github.com/sgl-project/sglang/pull/38963).
5. **DeepSeek-V4-Flash progressive output corruption** — concurrency issue on 2× H200 with dsv4 + DP attention [#33397](https://github.com/sgl-project/sglang/issues/33397).
6. **GLM-5.3 checkpoint loading silently drops MoE/mHC/KDA weights** — correctness risk for transformers-written checkpoints [#38618](https://github.com/sgl-project/sglang/issues/38618).
7. **Kimi-K3 strict tool-call grammar bug** — `additionalProperties` can satisfy a named property with a looser schema, weakening strict tool constraints [#38587](https://github.com/sgl-project/sglang/issues/38587).
8. **Mamba radix cache prefix-hit regression** — fresh prefill prefix hits can become 0-hit after split; 6 👍 [#22935](https://github.com/sgl-project/sglang/issues/22935).
9. **DFlash2 speculative decoding divergence** — greedy output diverges from target-only Qwen3.8-27B when thinking is enabled [#38009](https://github.com/sgl-project/sglang/issues/38009).
10. **H20 launch failure** — 8-card H20 cannot launch Qwen3.8-Flash-Next-FP8 [#38793](https://github.com/sgl-project/sglang/issues/38793).
11. **Scripted-runtime rid reuse race** — 60s recv timeout, 3 red tests in `test/manual/chunked_prefill` [#38788](https://github.com/sgl-project/sglang/issues/38788).
12. **HiCache TP-deadlock** — `HiRadixCache.writing_check` divergent write-backup/load-back enqueue decisions; issue closed [#28429](https://github.com/sgl-project/sglang/issues/28429).
13. **Fixes available/open**: DeepSeek V4 Pro TP24 Hopper vocab padding [#31801](https://github.com/sgl-project/sglang/pull/31801), msgspec `ServerArgs` `asdict` failure [#38958](https://github.com/sgl-project/sglang/pull/38958), custom logit processor with `num_tokens_in_batch` [#38730](https://github.com/sgl-project/sglang/pull/38730).
14. **Closed inactive**: JPEG image decoding for Step3-VL/DeepSeek-OCR2 [#24699](https://github.com/sgl-project/sglang/issues/24699), build without CUDA [#30931](https://github.com/sgl-project/sglang/issues/30931), minilb abort proxy [#30955](https://github.com/sgl-project/sglang/issues/30955), `stop_regex` buffer bound [#30932](https://github.com/sgl-project/sglang/issues/30932), uppercase `--log-level` hang [#30353](https://github.com/sgl-project/sglang/issues/30353).

### 6. What This Means for Application Developers
- **No new release to pin to today.** If you need DeepSeek V4.1, track the active PRs and the fork-sync blocker rather than assuming main is production-ready.
- **DeepSeek V4.1 shared-experts fusion is risky right now**: avoid `--enforce-shared-experts-fusion` until [#38963](https://github.com/sgl-project/sglang/pull/38963) lands or validate outputs.
- **Kimi-K3 strict tool calling needs schema caution**: mixing named properties with `additionalProperties` may weaken grammar constraints [#38587](https://github.com/sgl-project/sglang/issues/38587).
- **PD disaggregation with DCP > 1 carries crash risk** under decode retraction; watch [#38645](https://github.com/sgl-project/sglang/issues/38645) and [#38961](https://github.com/sgl-project/sglang/pull/38961).
- **ROCm users get meaningful performance work** for Qwen3.5, MiniMax-M3, and GLM5, but ROCm 7.0 wheel support is being retired [#38767](https://github.com/sgl-project/sglang/pull/38767).
- **SM120/Blackwell users should track GLM-5.3-Flash qualification** [#37813](https://github.com/sgl-project/sglang/issues/37813) and the new small-M FP8 GEMM [#34429](https://github.com/sgl-project/sglang/pull/34429).
- **Models without chat templates** — notably DeepSeek V4 — may get Rust Dynamo native renderer fallback for `/v1/chat/completions` [#38939](https://github.com/sgl-project/sglang/pull/38939).
- **IB fabrics requiring explicit GID index may need NVSHMEM 3.7.2**; bundled 3.4.5 lacks `NVSHMEM_IB_GID_INDEX` [#38769](https://github.com/sgl-project/sglang/issues/38769).
- **CI flakiness remains high**, so treat upstream main as fast-moving; for production, prefer pinned releases once available.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-11

## 1. Today's Highlights

The Vulkan backend absorbed the bulk of today's landing work, with three separate PRs targeting small-M matmul, MoE top-k fusion during prefill, and async copy paths — a clear signal that non-CUDA GPU backends are getting sustained optimization attention. On the CPU side, a long-running PR proposes a tiled `mul_mat` for k-quants claiming **3–7x speedup using VNNI**, which would be the largest single CPU inference gain in recent memory if merged. Meanwhile the issue tracker is dominated by speculative-decoding correctness problems (MTP/draft divergence on quantized targets, CUDA lockups, KV-position tracking failures), making this a day where *matching vanilla output* matters more than raw tokens/sec.

## 2. Releases & Breaking Changes

Ten builds landed in the last 24h (b10889 → b10901). **No breaking API, CLI, or config changes.** Notable entries:

- **b10901** — Vulkan: use CPU writes in `ggml_backend_vk_cpy_tensor_async` when the context is idle ([PR #28618](https://github.com/ggml-org/llama.cpp/pull/28618))
- **b10900** — Vulkan: `add_alloc_dep` to enable `topk_moe` fusion for prefill ([PR #28422](https://github.com/ggml-org/llama.cpp/pull/28422))
- **b10899** — Vulkan: small-M matrix optimizations for Qwen ([PR #28457](https://github.com/ggml-org/llama.cpp/pull/28457))
- **b10897** — CI: WoA CUDA 13.4 builds moved from Developer Preview to 13.4.1 GA redistributables ([PR #28687](https://github.com/ggml-org/llama.cpp/pull/28687))
- **b10896** — Speculative: fix failed mtmd chunk decode with DFlash ([PR #28587](https://github.com/ggml-org/llama.cpp/pull/28587))
- **b10894** — Models: remove dead switch branches in legacy model paths ([PR #28669](https://github.com/ggml-org/llama.cpp/pull/28669))
- **b10893 / b10892** — Tests: relax Add-fusion tolerance ([PR #28691](https://github.com/ggml-org/llama.cpp/pull/28691)); drop SYCL special-casing in `test-backend-ops` ([PR #28688](https://github.com/ggml-org/llama.cpp/pull/28688))
- **b10891** — Vulkan: shared-memory reduction fallback for dmmv on PowerVR ([PR #28341](https://github.com/ggml-org/llama.cpp/pull/28341))
- **b10889** — Memory: stop allocating V cache for the indexer, which never reads it ([PR #28330](https://github.com/ggml-org/llama.cpp/pull/28330))

## 3. New Model & Hardware Support

**Models / architectures (in flight):**
- **DeepSeek V4.1-Flash** (`DeepseekV41ForCausalLM`) conversion support, subclassing the V4 path under a new `deepseek41` arch; handles `text_config` parameter nesting ([PR #28696](https://github.com/ggml-org/llama.cpp/pull/28696))
- **GLM-5.3-Flash (GLM5-Next)** — 320B hybrid (34 KDA linear + 11 DSA layers, mHC, Deep…) with text + vision ([PR #27773](https://github.com/ggml-org/llama.cpp/pull/27773))
- **Ling 3.0 (Bailing V3)** dedicated chat parser — pre-opened `<think>` and tool calls before `</think>` previously produced empty `content` and no `tool_calls` ([PR #28682](https://github.com/ggml-org/llama.cpp/pull/28682))

**Backends / platforms:**
- **Hexagon**: multi-NPU support (IQ9/IQ10) and a fully asynchronous backend — async graph compute, events, tensor copy, cross-device fences ([PR #26501](https://github.com/ggml-org/llama.cpp/pull/26501), closed)
- **SYCL**: graph record & replay port from CUDA ([PR #28725](https://github.com/ggml-org/llama.cpp/pull/28725))
- **Windows ARM64**: native MSVC `cl.exe` builds via `cmake -B build -DGGML_NATIVE=ON`, removing the clang preset requirement ([PR #28362](https://github.com/ggml-org/llama.cpp/pull/28362))
- **CUDA/ROCm**: RDNA3.5 batched-WMMA MMQ kernels ([PR #28714](https://github.com/ggml-org/llama.cpp/pull/28714))
- **ARM CPU variants**: skip unsupported ISA extensions (e.g. `+sme` on GCC < 14) instead of failing the whole `GGML_CPU_ALL_VARIANTS` build ([PR #26103](https://github.com/ggml-org/llama.cpp/pull/26103))
- **OpenVINO**: Qwen3.5 support still absent on Intel NPU ([Issue #28567](https://github.com/ggml-org/llama.cpp/issues/28567)); `Q2_0` quant format request closed without adoption ([Issue #23909](https://github.com/ggml-org/llama.cpp/issues/23909))

## 4. Performance & Optimization

- **CPU k-quant matmul, 3–7x**: generic tiled `mul_mat` working on 256×256 int8 windows with VNNI; avoids repeated quant unpacking that the current `vec_dot` path duplicates ([PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851)) — highest-impact item in flight
- **Vulkan small-M (Qwen)**: `m=1 mul_mat` now swaps A/B, split_k is allowed for small M, and coopmat2 tile selection keys off M rather than N ([PR #28457](https://github.com/ggml-org/llama.cpp/pull/28457))
- **Vulkan prefill**: `add_alloc_dep` unblocks `topk_moe` fusion during prefill ([PR #28422](https://github.com/ggml-org/llama.cpp/pull/28422))
- **qwen4exp / QSA indexer**: pooled block-summary keys are now cached incrementally instead of being regathered and recomputed over the entire context every token — addresses the dominant decode cost at depth ([PR #28699](https://github.com/ggml-org/llama.cpp/pull/28699)); related decode-cost-growth report closed ([Issue #28012](https://github.com/ggml-org/llama.cpp/issues/28012))
- **Memory**: V-cache allocation removed for the DSA/Lightning indexer (~unused allocation per layer) ([PR #28330](https://github.com/ggml-org/llama.cpp/pull/28330), [Issue #28296](https://github.com/ggml-org/llama.cpp/issues/28296))
- **CUDA scaling**: user reports that default builds silently drop 4-bit KV prefill (`q4_0`/`q4_1`) to CPU speed — ~30x slowdown with no warning; proposes defaulting `GGML_CUDA_FA_ALL_QUANTS=ON` ([Issue #28633](https://github.com/ggml-org/llama.cpp/issues/28633))

## 5. Stability & Regressions

Ranked by severity:

1. **CUDA illegal memory access in the flash-attn path** — `cudaStreamSynchronize` crash on the *second* request of a specific sequence with Qwen3.6-35B MoE + partial expert offload; deterministic, reproducible across b10107/b10243, disappears with `-fa off`. No fix PR visible ([Issue #26609](https://github.com/ggml-org/llama.cpp/issues/26609))
2. **MTP CUDA lockups** — reproducible hard lockups with Qwen3.8-27B under `--split-mode tensor` ([Issue #27122](https://github.com/ggml-org/llama.cpp/issues/27122)); separately, MTP retains inter-request state causing non-deterministic output and progressive model degradation on Qwen3.6-35B-A3B ([Issue #26425](https://github.com/ggml-org/llama.cpp/issues/26425))
3. **qwen4exp `ggml_abort` on SM121** — graph builder aborts under sustained load on DGX Spark/GB10 ([Issue #27780](https://github.com/ggml-org/llama.cpp/issues/27780))
4. **Speculative decoding correctness** — draft-mtp/draft-dspark greedy output diverges from vanilla on quantized targets while matching on bf16; ngram speculation is unaffected (highest-traffic issue, 23 comments) ([Issue #25618](https://github.com/ggml-org/llama.cpp/issues/25618))
5. **Spec KV position tracking** — `llama-spec` fails at the 16k boundary with non-consecutive positions (`Y != X + 1`) on Vulkan ([Issue #26478](https://github.com/ggml-org/llama.cpp/issues/26478))
6. **Vulkan flash attention reads stale K/V** from freed cells, contaminating output ([Issue #26744](https://github.com/ggml-org/llama.cpp/issues/26744))
7. **Intel Arc 140V (Windows, Vulkan)** produces garbage with layers offloaded; batch-size dependent, present in b10831/b10850/b10865 ([Issue #28648](https://github.com/ggml-org/llama.cpp/issues/28648))
8. **SYCL pool crash** — `ggml_sycl_pool_vmm::free` breaks LIFO ordering due to oneDNN scratchpad ([Issue #28660](https://github.com/ggml-org/llama.cpp/issues/28660)); SYCL Sysman free-memory query may be unavailable ([Issue #28239](https://github.com/ggml-org/llama.cpp/issues/28239))
9. **Server-side correctness** — prompt cache reused across requests selecting different per-request LoRA adapters, silently contaminating output ([Issue #26207](https://github.com/ggml-org/llama.cpp/issues/26207)); malformed client tool-call arguments return HTTP 500 instead of 4xx ([Issue #25510](https://github.com/ggml-org/llama.cpp/issues/25510))
10. **Chat template parsing** — `</think>` detection matches the literal string rather than the special token ([Issue #28679](https://github.com/ggml-org/llama.cpp/issues/28679))

**Fixes landed or queued:** DFlash/mtmd spec decode failure ([b10896](https://github.com/ggml-org/llama.cpp/pull/28587)); speculation position after image input, affecting all drafters, not just DFlash ([PR #28715](https://github.com/ggml-org/llama.cpp/pull/28715)); PowerVR dmmv pipeline creation failure ([PR #28341](https://github.com/ggml-org/llama.cpp/pull/28341)); GDN normalization corrected from `x / max(sqrt(sum(x²)), eps)` to `x * rsqrt(sum(x²) + eps)` ([PR #28068](https://github.com/ggml-org/llama.cpp/pull/28068), closed); HIP multi-sequence batch logit corruption resolved ([Issue #28537](https://github.com/ggml-org/llama.cpp/issues/28537), closed).

## 6. What This Means for Application Developers

- **Don't assume speculative decoding is output-equivalent.** If you run quantized targets (Q4_K_M and similar) with draft-mtp/draft-dspark under greedy sampling, expect divergence from the non-speculative baseline. `bf16` targets and ngram speculation are currently the safe configurations — relevant if you depend on deterministic agent outputs or golden-test replay ([#25618](https://github.com/ggml-org/llama.cpp/issues/25618)).
- **Per-request LoRA + prompt cache is a live contamination risk.** Until [#26207](https://github.com/ggml-org/llama.cpp/issues/26207) lands, do not rely on KV reuse for multi-tenant routing that swaps adapters mid-cache; partition by adapter or disable prefix caching.
- **Server API semantics are tightening.** [PR #28711](https://github.com/ggml-org/llama.cpp/pull/28711) reports non-truncating limits as `finish_reason: "stop"` instead of `"length"`, [PR #28724](https://github.com/ggml-org/llama.cpp/pull/28724) sanitizes invalid UTF-8 at token boundaries to stop PEG-native parse failures, and [PR #28707](https://github.com/ggml-org/llama.cpp/pull/28707) makes `--lora-init-without-apply` and `"lora": []` actually disable adapters — check any client logic that infers adapter state from the response.
- **Vulkan is becoming a viable first-class target** for Qwen-class small-M decode and MoE prefill, but the Arc 140V garbage-output and stale-K/V flash-attention reports mean you should validate numerics per-driver before production rollout.
- **CUDA 4-bit KV users: audit your build flags.** The silent CPU fallback described in [#28633](https://github.com/ggml-org/llama.cpp/issues/28633) can look like a mysterious 30x slowdown with no log line — enable `GGML_CUDA_FA_ALL_QUANTS=ON` explicitly until it becomes default.
- **Watch [PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851)** if you serve on CPUs: a 3–7x `mul_mat` improvement on k-quants would materially change CPU-only cost-per-token for quantized models.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-11

## 1. Today's Highlights
No releases shipped in the last 24h; activity was dominated by parser/tool-call correctness fixes and MLX memory management. Several tool-call parsing gaps closed or were addressed (Gemma 4 `BEGIN_ARG`, Gemma3n, Gemma4 placeholder collision), and cloud stream failures now propagate as aborted responses instead of false completions ([#18351](https://github.com/ollama/ollama/pull/18351)). On the risk side, a critical/high CVE report against the Ollama Go binary ([#16033](https://github.com/ollama/ollama/issues/16033)) remains open, alongside an unreleased file-descriptor leak in `ollama serve` ([#18344](https://github.com/ollama/ollama/issues/18344)).

## 2. Releases & Breaking Changes
- No new releases in the last 24h.
- In flight (not yet landed): [PR #18235](https://github.com/ollama/ollama/pull/18235) bumps MLX, and [PR #18317](https://github.com/ollama/ollama/pull/18317) merged a llama.cpp bump to `b10864`.
- Watch item: [PR #14969](https://github.com/ollama/ollama/pull/14969) adds server-side MLX/safetensors imports and **drops GGUF conversion from `create`**, wrapping existing GGUFs into manifests instead. This is a likely migration point for anyone relying on server-side conversion.

## 3. New Model & Hardware Support
- **DeepSeek-V4.1-Flash cloud support requested** — [issue #18360](https://github.com/ollama/ollama/issues/18360) closed with 27 👍; a related V4-Flash-Vision request ([#18178](https://github.com/ollama/ollama/issues/18178)) also closed.
- **Gemma3n projector on CPU is broken** — [PR #18376](https://github.com/ollama/ollama/pull/18376) forces the MobileNetV5 projector off CPU because it silently produces corrupted image embeddings (no error, wrong image description) on llama.cpp b10760.
- **1M context enablement** — [PR #18364](https://github.com/ollama/ollama/pull/18364) adds 512K/1M options to the app context slider; [PR #18365](https://github.com/ollama/ollama/pull/18365) lets Claude Desktop use a model's full context window via `supports_1m` / `max_input_tokens`.
- **Vulkan backend** — AMD UMA APU runner wedge reported on 0.24.0 ([#18370](https://github.com/ollama/ollama/issues/18370)); no fix PR yet.

## 4. Performance & Optimization
- **MLX array lifetime rework** — [PR #18327](https://github.com/ollama/ollama/pull/18327) replaces pin-and-sweep freeing with scoped array lifetimes, fixing accumulation when prefix cache evicted long stored paths.
- **Prefix cache eviction** — [PR #18353](https://github.com/ollama/ollama/pull/18353) allows eviction of snapshots on the active conversation path, addressing unbounded growth for models with non-KV snapshot state.
- **MLX scheduler memory check** — [PR #18345](https://github.com/ollama/ollama/pull/18345) checks system free memory and waits for evicted runners before loading, reducing OOM pressure from memory held by other apps.
- **GGUF metadata caching** — [PR #17858](https://github.com/ollama/ollama/pull/17858) extracts metadata once per blob to `<OLLAMA_MODELS>/metadata/` and unifies capability reporting, cutting the cost of an expensive repeated operation.
- **Loading regression reported** — [#18373](https://github.com/ollama/ollama/issues/18373) reports significantly slower model loading since 0.23.4 (observed with `GPT-OSS:120b`); no fix PR yet.

## 5. Stability & Regressions
Ranked by severity:

1. **CVE exposure — open** — [Issue #16033](https://github.com/ollama/ollama/issues/16033): Go binary reports 36 vulnerabilities (1 CRITICAL, 11 HIGH, 23 MEDIUM). No fix PR referenced.
2. **FD leak in `ollama serve` — open** — [Issue #18344](https://github.com/ollama/ollama/issues/18344): one descriptor retained per successfully served `/api/generate` request; requires periodic restarts under sustained load.
3. **Vulkan runner wedge — open** — [Issue #18370](https://github.com/ollama/ollama/issues/18370): single thread pinned at 100% CPU, GPU idle, generations never complete, persisting ~40h until restart (AMD Strix Halo-class UMA APU, 0.24.0).
4. **Cloud stream failures now surfaced — fixed** — [PR #18351](https://github.com/ollama/ollama/pull/18351) propagates non-client stream-copy failures via `http.ErrAbortHandler`; fixes the `glm-5.3:cloud` endless-reasoning/abort symptom in [issue #18193](https://github.com/ollama/ollama/issues/18193).
5. **macOS GUI silent failure — open** — [Issue #18368](https://github.com/ollama/ollama/issues/18368): chat processing fails silently after ~6k tokens with 128K context, no GUI notification.
6. **Broken low-bit quants — open** — [Issue #18252](https://github.com/ollama/ollama/issues/18252): `qwen2.5-coder:3b-instruct` q2_K/q3_K_S/q3_K_M/q3_K_L score 0/15 on a functional smoke suite while sibling quants pass 87–100%.
7. **Tool-call parsing correctness** — mixed:
   - Fixed: Gemma 4 `BEGIN_ARG` parsing including malformed markers ([PR #18299](https://github.com/ollama/ollama/pull/18299)); Gemma4 string placeholder/array collision causing empty `content` and `tool_calls` ([PR #18366](https://github.com/ollama/ollama/pull/18366)).
   - Open: qwen3-coder drops calls when the opening `<tool_call>` tag is omitted ([#16686](https://github.com/ollama/ollama/issues/16686)); Anthropic `/v1/messages` emits complex tool schemas as literal text ([#18346](https://github.com/ollama/ollama/issues/18346)); Gemma3n returns empty `tool_calls` via `/v1` ([#18357](https://github.com/ollama/ollama/issues/18357)).
8. **Template mutation bug — open** — [PR #18367](https://github.com/ollama/ollama/pull/18367): `Template.Execute` mutates caller messages, so repeated renders produce differing output.
9. **Misc — open** — `/api/codex/v1/responses` 502 ([#18375](https://github.com/ollama/ollama/issues/18375)); qwen2.5vl:3b grammar-stack collapse on GPU with one specific JPEG ([#18369](https://github.com/ollama/ollama/issues/18369)); gemma4:12b repeated `<unused50>` frames and EOF without `done` ([#18359](https://github.com/ollama/ollama/issues/18359)).

## 6. What This Means for Application Developers
- **Tool-calling remains the highest-variance surface.** If you build agents on Ollama, pin known-good model+quant combos and validate parser behavior for your specific model family — Gemma and qwen3-coder both had parsing defects addressed or outstanding this cycle. Anthropic-compat clients (Claude Code) are especially exposed to complex-schema failures ([#18346](https://github.com/ollama/ollama/issues/18346)).
- **Avoid q2_K/q3_K Qwen2.5-Coder 3B artifacts** until [#18252](https://github.com/ollama/ollama/issues/18252) is resolved; failures are silent (fluent output, zero task success).
- **Run `ollama serve` behind a supervisor if you serve high request volumes** — the FD leak ([#18344](https://github.com/ollama/ollama/issues/18344)) accumulates until restart.
- **Cloud responses are now fail-fast.** With [#18351](https://github.com/ollama/ollama/pull/18351), clients should expect aborted streams rather than truncated-but-`done` responses — ensure your retry/error handling treats HTTP aborts explicitly.
- **Context limits are moving to 1M.** Apps reading context caps should not hardcode 256K; consume `max_input_tokens` / `supports_1m` metadata once [PR #18364](https://github.com/ollama/ollama/pull/18364) and [PR #18365](https://github.com/ollama/ollama/pull/18365) land.
- **Treat the open CVE report as a supply-chain action item** ([#16033](https://github.com/ollama/ollama/issues/16033)) — track whether affected Go dependencies are reachable in your deployment before the next release.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-11

Source: [github.com/BerriAI/litellm](https://github.com/BerriAI/litellm)

## 1. Today's Highlights

LiteLLM shipped stable **v1.100.1** alongside release candidate **v1.101.0-rc.2**, both continuing the cosign-signed Docker image policy introduced in commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). The largest in-flight workstream is a coordinated OCR backend expansion (Azure Document Intelligence, Azure Mistral, Vertex Mistral, Reducto v3/legacy) landing as an 8-layer stack. On the reliability side, the v1.100.0 retry-breadcrumb memory leak has a new release-gate regression test, and a spend-tracking sidecar PR aims to get spend logging off the inference event loop.

## 2. Releases & Breaking Changes

- **v1.100.1** (stable) — Docker image signature verification via cosign. [Release](https://github.com/BerriAI/litellm/releases)
- **v1.101.0-rc.2** — release candidate; same cosign signing key. [Release](https://github.com/BerriAI/litellm/releases)
- No explicit breaking API/config changes in this window. Two *de facto* regressions from recently released code are called out in PRs (see §5): the `x-litellm-priority` response header added in [#37228](https://github.com/BerriAI/litellm/pull/37228) breaks `/v1/messages` for non-Latin-1 priorities, and v1.100.0 introduced a retry-breadcrumb leak on failed requests.

## 3. New Model & Hardware Support

No new GPU/accelerator backend or quantization work in this window. Provider/surface expansion:

- **Azure Document Intelligence** adapter added to the shared Rust OCR facade with authenticated submission, bounded polling, and normalized responses — [#40534](https://github.com/BerriAI/litellm/pull/40534).
- **Azure Mistral** OCR adapter plus bounded remote-document fetching — [#40533](https://github.com/BerriAI/litellm/pull/40533).
- **Vertex Mistral** OCR adapter — [#40507](https://github.com/BerriAI/litellm/pull/40507).
- **Reducto** legacy + v3 OCR adapters — [#40535](https://github.com/BerriAI/litellm/pull/40535).
- **Native OCR routed through core** for core-supported providers — [#40532](https://github.com/BerriAI/litellm/pull/40532).
- **Vertex AI Search vector store** gains an HTTP/2 httpx client path — [#40631](https://github.com/BerriAI/litellm/pull/40631).
- Requested but not yet landed: [Kimi-K2.6 for Together AI](https://github.com/BerriAI/litellm/issues/27450), [DeepSeek V4 Pro/Flash time-of-day pricing](https://github.com/BerriAI/litellm/issues/37255) (flagged as stale data).

## 4. Performance & Optimization

- **Streaming `mock_response` re-tokenization removed** — mock streaming generators now emit an admission-time usage chunk instead of re-tokenizing the full prompt after the stream ends. Quoted saving: **100–200 ms of Python per request** on 50k–100k-token bodies. [#40637](https://github.com/BerriAI/litellm/pull/40637)
- **Spend tracking offloaded to a pod-local collector sidecar** (opt-in) — moves `_PROXY_track_cost_callback` and `DBSpendUpdateWriter` off the inference workers' event loop, where py-spy showed them stalling the request path on slow DB/Redis. [#40545](https://github.com/BerriAI/litellm/pull/40545) *(closed)*
- **Background health-check DB storm fix** — `SharedHealthCheckManager` no longer loads the entire unbounded `LiteLLM_HealthCheckTable` into every worker each cycle under `use_shared_health_check: true`. [#37611](https://github.com/BerriAI/litellm/issues/37611) *(closed)*
- **Budget reset job scaling** — resets end users by budget link rather than user ID; previously a shared budget past **~32,700 customers** would roll back every reset attempt and block those customers indefinitely. [#40639](https://github.com/BerriAI/litellm/pull/40639)
- **Vertex AI Search** concurrent multi-datastore searches no longer queue behind per-request HTTP/1.1 connection setup. [#40631](https://github.com/BerriAI/litellm/pull/40631)

## 5. Stability & Regressions

Ranked by severity:

**Critical**
- **v1.100.0 retry-breadcrumb leak → OOM.** Every failed attempt copied the whole request; proxy grew until OOM-killed. New e2e memory/size regression test added to the release gate. [#40640](https://github.com/BerriAI/litellm/pull/40640)
- **Non-Latin-1 `x-litellm-priority` → HTTP 500 on `/v1/messages`.** Regression from #37228; provider call already succeeded, so the customer is billed for a 500. Fix PR open. [#40636](https://github.com/BerriAI/litellm/pull/40636)
- **`max_parallel_requests` counter leaks on cancelled Anthropic streaming.** Redis counter monotonically increases when clients cancel `/v1/messages` mid-stream, eventually blocking every request. Open, 5 comments. [#27955](https://github.com/BerriAI/litellm/issues/27955)
- **Background health checks near-OOM at scale** (see §4). Closed. [#37611](https://github.com/BerriAI/litellm/issues/37611)
- **Claude Code → vLLM has no stable routing path.** `hosted_vllm` corrupts Anthropic Messages streaming; the `anthropic` provider path also broken. Open hotfix request. [#30043](https://github.com/BerriAI/litellm/issues/30043)

**High**
- **`/metrics` returns empty after upgrade to 1.88.0** — 307 redirect on Prometheus scrapes. Open. [#30079](https://github.com/BerriAI/litellm/issues/30079)
- **Streaming fallback ignores key-level `router_settings`** while non-streaming fallback works correctly. Open. [#25843](https://github.com/BerriAI/litellm/issues/25843)
- **Health checks fail hard when a provider host is offline**, instead of failing gracefully. Open, 12 comments — top-commented issue in the window. [#34281](https://github.com/BerriAI/litellm/issues/34281)
- **MCP `/mcp` endpoint misreads `SERVER_ROOT_PATH` prefix as a scoped server name → 0 tools returned.** Open. [#32142](https://github.com/BerriAI/litellm/issues/32142)
- **Reused `x-litellm-call-id` silently drops spend-log rows** (primary-key collision). Open. [#35563](https://github.com/BerriAI/litellm/issues/35563)
- **Spend logs record $0 for custom models absent from the built-in cost map**, even when `usage.estimated_cost` is correct. Open. [#35691](https://github.com/BerriAI/litellm/issues/35691)
- **VLLM `cached_tokens` not handled in cost calculation.** Open, 5 👍. [#22984](https://github.com/BerriAI/litellm/issues/22984)
- **Claude Code authentication failures** against LiteLLM backend. Open. [#25427](https://github.com/BerriAI/litellm/issues/25427)

**Medium / resolved**
- Bedrock `post_call` guardrail buffers entire `/v1/messages` stream, so Claude Code shows nothing until generation completes; unbuffered opt-in now being exposed in the Admin UI. [#40635](https://github.com/BerriAI/litellm/pull/40635)
- Custom-model / cache-control UI toggles not persisting on model update. [#40632](https://github.com/BerriAI/litellm/pull/40632)
- `/cursor/chat/completions` returns 200 and bills the provider but creates no SpendLogs entry. Open. [#30126](https://github.com/BerriAI/litellm/issues/30126)
- MCP OAuth: temporary OAuth server did not inherit `authorization_url` / `token_url`. **Closed.** [#20495](https://github.com/BerriAI/litellm/issues/20495)
- GPT-5.4 tool calls with `reasoning_effort` failed through the `openai-agents` SDK. **Closed**, 8 👍. [#23156](https://github.com/BerriAI/litellm/issues/23156)
- OpenAPI MCP `build_input_schema` dropped `items`/`enum` from inline parameter schemas. **Closed.** [#29715](https://github.com/BerriAI/litellm/issues/29715)
- `/v1/audio/transcriptions` collapsed repeated `known_speaker_references[]`/`known_speaker_names[]` to the last value, breaking `gpt-4o-transcribe-diarize` multi-speaker. **Closed.** [#29766](https://github.com/BerriAI/litellm/issues/29766)
- OTel `gen_ai.input.messages` part-key normalization inconsistency on Anthropic Messages. **Closed.** [#29756](https://github.com/BerriAI/litellm/issues/29756)
- Session idle timeout for dashboard auth still unsupported. Open. [#28237](https://github.com/BerriAI/litellm/issues/28237)

## 6. What This Means for Application Developers

- **Treat v1.100.0 as unsafe for retry-heavy workloads** — the retry-breadcrumb copy leak grew proxy memory to OOM. Pin to v1.100.1+ if you have aggressive retry/fallback configs, and watch for the [#40636](https://github.com/BerriAI/litellm/pull/40636) priority-header fix before enabling non-ASCII team/key priority labels.
- **Do not build production Claude Code → vLLM paths yet.** Both `hosted_vllm` and `anthropic` routes have known streaming/correctness failures ([#30043](https://github.com/BerriAI/litellm/issues/30043), [#27955](https://github.com/BerriAI/litellm/issues/27955)). Cancelled streams are the specific hazard — the Redis concurrency counter never decrements, so a single chatty user cancelling generations can eventually 429 the whole key.
- **Streaming fallback is not equivalent to non-streaming fallback.** If your key-level `router_settings` fallbacks are your reliability story, do not rely on them for streaming callers until [#25843](https://github.com/BerriAI/litellm/issues/25843) lands.
- **Spend/billing accuracy has several open holes:** custom models off the built-in cost map log $0 ([#35691](https://github.com/BerriAI/litellm/issues/35691)), reused `x-litellm-call-id` drops rows ([#35563](https://github.com/BerriAI/litellm/issues/35563)), and Cursor traffic isn't logged at all ([#30126](https://github.com/BerriAI/litellm/issues/30126)). Do not use LiteLLM spend logs as your sole billing source for custom or proxied routes.
- **OCR is becoming a first-class surface.** If you're building document-ingestion agents, the Azure Document Intelligence / Azure Mistral / Vertex Mistral / Reducto adapters plus core-routed native OCR ([#40534](https://github.com/BerriAI/litellm/pull/40534), [#40533](https://github.com/BerriAI/litellm/pull/40533), [#40507](https://github.com/BerriAI/litellm/pull/40507), [#40535](https://github.com/BerriAI/litellm/pull/40535), [#40532](https://github.com/BerriAI/litellm/pull/40532)) consolidate OCR into one `/v1/ocr` contract with bounded remote-document fetching and trusted credential provenance.
- **Latency win if you use mock/recorded responses in CI:** the admission-time usage chunk saves 100–200 ms per request on large prompts ([#40637](https://github.com/BerriAI/litellm/pull/40637)).
- **Guardrails expand:** ConductGuard lands as a first-class pre-call policy check ([#38143](https://github.com/BerriAI/litellm/pull/38143)); NeMo Guardrails support is still only a request ([#25255](https://github.com/BerriAI/litellm/issues/25255), 11 👍).
- **Agent observability:** the auto-router can now surface the routed model and session savings in Claude Code and Codex status lines ([#40330](https://github.com/BerriAI/litellm/pull/40330)) — useful if you're quantifying routing cost reductions per developer session.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-11

## 1. Today's Highlights
No tagged Unsloth releases landed in the last 24h. The main activity is Studio/inference optimization: NVFP4/FP8/INT8 fast paths for image and video pipelines, MLX MoE/decode fusion, and an offload-planner rework. Long-context agent workloads remain exposed to full-context reprocessing/prefill regressions, while a severe non-NVLink CUDA P2P output-corruption issue was closed.

## 2. Releases & Breaking Changes
- **No new releases or documented breaking API/config changes.**
- In-flight behavior changes worth tracking: per-account isolation for shared Studio installs ([#10588](https://github.com/unslothai/unsloth/pull/10588)) and env-gated smart offload planning via `UNSLOTH_SMART_OFFLOAD` ([#9872](https://github.com/unslothai/unsloth/pull/9872)).

## 3. New Model & Hardware Support
- **Dense image model fast path:** official BF16 image models can now use Studio’s FP8 or INT8 path on supported GPUs; files stay BF16 and are converted in memory ([#10697](https://github.com/unslothai/unsloth/pull/10697)).
- **NVFP4 video families:** whole-model NVFP4 for Wan2.2-TI2V-5B, Wan2.2-T2V-A14B, and HunyuanVideo-1.5 480p/720p, with hosted pre-quantized denoisers ([#10729](https://github.com/unslothai/unsloth/pull/10729)).
- **NVFP4 image policies:** per-layer NVFP4 image DiT policies, flashinfer FP4 backend, GPTQ builder, and gated auto-selection ([#10730](https://github.com/unslothai/unsloth/pull/10730)); kernel follow-ups for device guard, barriers, bias path, and cached dispatch ([#10731](https://github.com/unslothai/unsloth/pull/10731)).
- **Apple Silicon / MLX:** optional MLX MoE gate/up fusion and recurrent decode fusion integrated into Studio ([#10733](https://github.com/unslothai/unsloth/pull/10733)).
- **bitsandbytes backend:** use live PyTorch accelerator streams for native dequantization and GEMV/GEMM calls ([#10745](https://github.com/unslothai/unsloth/pull/10745)).
- **Hardware reports closed:** DGX Spark no-GPU-after-update ([#10691](https://github.com/unslothai/unsloth/issues/10691)), DGX Spark image-generation memory refusal ([#9919](https://github.com/unslothai/unsloth/issues/9919)), and AMD 6950 XT support query ([#10468](https://github.com/unslothai/unsloth/issues/10468)).

## 4. Performance & Optimization
- **B200 LoRA SFT:** experimental Qwen3.5-9B LoRA run reports **1.28x faster step** from 8 changes; includes acceleration takeaways for the repo ([#10744](https://github.com/unslothai/unsloth/pull/10744)).
- **Smart offload planner:** weighs spill decisions against llama.cpp’s own fitter, with sub-FFN spill ladder, context-aware device reserve, and launch ordering; behind `UNSLOTH_SMART_OFFLOAD` ([#9872](https://github.com/unslothai/unsloth/pull/9872)).
- **Studio update latency:** avoid re-validating llama.cpp, whisper.cpp, and Node installs when markers match, saving **13–63s on macOS** and **~5s on Windows** ([#10648](https://github.com/unslothai/unsloth/pull/10648)).
- **Setup cache reuse:** POSIX uv cache selector can see warm shared cache ([#10647](https://github.com/unslothai/unsloth/pull/10647)); reuse uv installed by previous run instead of re-downloading ([#10659](https://github.com/unslothai/unsloth/pull/10659)).
- **Agent startup:** authenticated resident-model endpoint avoids waiting on full local/media catalog scans and 30s HTTP timeout ([#10728](https://github.com/unslothai/unsloth/pull/10728)).
- **Data prep:** don’t append EOS to full-size mid-stride chunks, fixing training-data corruption at chunk boundaries ([#10734](https://github.com/unslothai/unsloth/pull/10734)).
- **Latency regressions to watch:** full prefill after model reload ([#9037](https://github.com/unslothai/unsloth/issues/9037)) and full-context reprocessing after every tool call ([#10698](https://github.com/unslothai/unsloth/issues/10698)).

## 5. Stability & Regressions
**Critical / correctness**
- **Closed:** `GGML_CUDA_P2P=1` was set on non-NVLink GPUs such as RTX 6000 Ada, RTX PRO 6000, L40/L40S, and L4, silently corrupting model output ([#10613](https://github.com/unslothai/unsloth/issues/10613)). Verify environment overrides on multi-GPU hosts.

**High**
- **Open:** long Qwen3.8 GGUF chats lose reusable prompt state after model reload, causing **~11 minute full prefill** ([#9037](https://github.com/unslothai/unsloth/issues/9037)).
- **Open regression:** entire context is reprocessed slowly after every tool call; at 30k tokens this adds minutes of delay ([#10698](https://github.com/unslothai/unsloth/issues/10698)).
- **Open:** diffusion pipeline unloads models after each generation and lacks LoRA support in some paths ([#10716](https://github.com/unslothai/unsloth/issues/10716)).
- **Open:** `--tensor-split` is ignored, affecting multi-GPU partitioning ([#10355](https://github.com/unslothai/unsloth/issues/10355)).
- **Open:** constant CPU usage in Studio ([#10390](https://github.com/unslothai/unsloth/issues/10390)).

**Medium**
- **Open:** Windows `unsloth start codex` fails with `stdout is not a terminal` ([#10699](https://github.com/unslothai/unsloth/issues/10699)).
- **Open, fix available:** Windows/PowerShell installer fails when user profile path contains spaces ([#10722](https://github.com/unslothai/unsloth/issues/10722)); fix PR ([#10765](https://github.com/unslothai/unsloth/pull/10765)).
- **Open:** Data Recipe incorrectly reports all columns dropped ([#10738](https://github.com/unslothai/unsloth/issues/10738)).
- **Open:** Android browser network loss stops generation when away from browser ([#10739](https://github.com/unslothai/unsloth/issues/10739)).
- **Open UX:** Studio image generation lacks intuitive controls ([#10695](https://github.com/unslothai/unsloth/issues/10695)); Studio Hub conflates cached diffusion assets with incomplete base-model downloads ([#10696](https://github.com/unslothai/unsloth/issues/10696)).
- **Closed:** Studio PDF uploads rejected scans or omitted image-only pages ([#10619](https://github.com/unslothai/unsloth/issues/10619)); CLI API key churn on every Studio run ([#10595](https://github.com/unslothai/unsloth/issues/10595)).

## 6. What This Means for Application Developers
- **Long-context agents:** do not assume prompt/KV reuse survives model reloads or tool calls. Budget for full prefill unless [#9037](https://github.com/unslothai/unsloth/issues/9037) and [#10698](https://github.com/unslothai/unsloth/issues/10698) are resolved. The rolling-context/compaction request [#7472](https://github.com/unslothai/unsloth/issues/7472) remains relevant.
- **Multi-GPU inference:** audit `GGML_CUDA_P2P` on non-NVLink cards; the severe output-corruption issue is closed ([#10613](https://github.com/unslothai/unsloth/issues/10613)), but `--tensor-split` being ignored is still open ([#10355](https://github.com/unslothai/unsloth/issues/10355)).
- **Quant/inference deployments:** NVFP4/FP8/INT8 paths are expanding for image and video workloads ([#10697](https://github.com/unslothai/unsloth/pull/10697), [#10730](https://github.com/unslothai/unsloth/pull/10730), [#10729](https://github.com/unslothai/unsloth/pull/10729)). Test against target GPU families before rollout. Apple Silicon users should watch MLX MoE/decode integration ([#10733](https://github.com/unslothai/unsloth/pull/10733)).
- **Fine-tuning/training:** B200 LoRA users can evaluate the 1.28x step improvement ([#10744](https://github.com/unslothai/unsloth/pull/10744)); data preparers should pick up the EOS chunk-boundary fix ([#10734](https://github.com/unslothai/unsloth/pull/10734)).
- **Studio/desktop:** Windows installer space-path fix ([#10765](https://github.com/unslothai/unsloth/pull/10765)) and UI improvements such as top-level Models grouping ([#10736](https://github.com/unslothai/unsloth/pull/10736)), live dataset preview ([#10737](https://github.com/unslothai/unsloth/pull/10737)), and meaningful downloaded filenames ([#10727](https://github.com/unslothai/unsloth/pull/10727)) are in flight. Requested features include dataset download ([#10637](https://github.com/unslothai/unsloth/issues/10637)), URL query parameters ([#10764](https://github.com/unslothai/unsloth/issues/10764)), macOS menu-bar toggle ([#10157](https://github.com/unslothai/unsloth/issues/10157)), and RTL/BiDi chat rendering ([#8912](https://github.com/unslothai/unsloth/issues/8912)).
- **Upgrade hygiene:** no release means these are PRs/issues, not shipped guarantees. Treat env-gated changes and quant backends as test candidates rather than production defaults.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*