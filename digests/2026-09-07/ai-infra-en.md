# AI Infrastructure Digest 2026-09-07

> Generated: 2026-09-06 22:45 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Comparison Report — 2026-09-07

## 1. Ecosystem Overview

The ecosystem is between feature releases and deep in a reliability cycle. vLLM and SGLang cut no releases in 24h; llama.cpp shipped seven builds; the gateway layer (LiteLLM) moved two versions; Ollama advanced an RC. The center of gravity is no longer raw throughput — the day's most severe failures are **silent correctness breaks across quantized sparse-attention and hybrid Mamba/attention models** (Qwen3.8-Flash-Next, DeepSeek-V4, GLM-5.3, MiniMax-M3 recur across every stack). Prefix caches are not yet geometry-safe for sparse/hybrid architectures, producing zero cache reuse or memory faults even on identical prompts. Hardware fragmentation (Blackwell SM120/SM121, GB10/DGX Spark, ROCm/MI355X, RDNA4, Apple silicon) continues forcing per-platform backend and kernel qualification. The overall mood is "known-good configurations over new features."

## 2. Activity Comparison

Counts reflect issues/PRs referenced in the 24-hour digests, not full repository totals. Release status indicates tags cut within the window.

| Project | Issues refs. | PRs refs. | Releases (24h) |
|---|---|---|---|
| vLLM | ~15 | ~17 | None |
| SGLang | ~18 | ~14 | None |
| llama.cpp | ~9 | ~18 | 7 builds (b10821–b10828) |
| Ollama | ~15 | 4 | v0.34.0-rc1 |
| LiteLLM | ~16 | ~14 | v1.100.0, v1.101.0-rc.1 |
| Unsloth | ~5 | ~20 | None |

**Reading:** llama.cpp has the fastest release cadence and is shipping code; vLLM/SGLang have the highest issue load and are absorbing correctness work without cutting releases. LiteLLM activity is split between budget-accounting bug reports and a large PR queue. Unsloth is unusual: low issue count, very high PR throughput (~20), nearly all hardening its Studio/llama.cpp integration rather than the training kernel work it is known for.

## 3. Model Support Race

| Project | Model / architecture signal | Status |
|---|---|---|
| llama.cpp | **Spark2_5ForCausalLM** end-to-end (GGUF conversion + inference) | **Shipped in b10828** — fastest arch enablement today |
| llama.cpp | HrmTextForCausalLM / Mimir 1B, sharded mmproj | Open PRs |
| vLLM | Qwen3.8-Flash-Next FP8 (QSA) | Supported; greedy nondeterminism at sparse boundary |
| vLLM | DeepseekV4 on GB10/SM121 | Blocked by unguarded DeepGEMM; fix in review |
| SGLang | Qwen3.8-Flash-Next NVFP4 on DGX Spark | Cookbook + FP4 GEMM default PR |
| SGLang | MiniMax-M3 W4A16 on DGX Spark | **Broken** — all-NUL tokens; identical weights work on vLLM |
| SGLang | DeepSeek-V4 long-context prefill | DSA top-k kernel IMA fault |
| Ollama | spark2_5 native support | Pending; models download but fail to start |
| LiteLLM | Standard Compute, The Grid providers | Added — provider breadth, not model kernels |

**Who is ahead:** llama.cpp on architecture breadth and merge velocity — it moved a new architecture from PR to release binary in under 24 hours. Among serving engines, neither vLLM nor SGLang has clean frontier-model support. vLLM is ahead on correctness for the Qwen-family/MiniMax class (MiniMax-M3 works there while failing on SGLang), while SGLang leads on *qualified recipes* (NVFP4 + DGX Spark/RTX PRO cookbooks) and cutting-edge FP4 kernel selection. Ollama is structurally a follower since it inherits architecture support from llama.cpp.

## 4. Performance Frontier

**KV cache & prefix reuse** is the hottest optimization surface. vLLM is fixing hybrid-Mamba prefix-cache geometry (OOB reads, wrong block size) and still shows **zero prefix reuse on identical 1.04M-token prompts** for DFlash2+YaRN and on first-repeat MTP. SGLang is iterating radix-hash collection to iterative traversal and closing a 1.96% unified-memory decode gap on B300. llama.cpp diagnosed a 42–54% prompt-processing drop under `--kv-unified`; Ollama's MLX cache truncates restores to 8192-token multiples, costing a 17–27 s re-prefill tax per agent turn.

**Quantized-kernel work** is concentrated on Blackwell FP4/FP8 and hybrid sparse paths: SGLang is making FlashInfer NVFP4 `b12x` the SM120 default GEMM; vLLM is investigating FP8 sparse-attention nondeterminism; llama.cpp fixed OpenCL weight-pack selection for `q4_K`/`q5_K`. Unsloth opened NVFP4 + low-rank correction benchmarks for RTX 5090/DGX Spark.

**Distributed serving** optimization targets dynamic MoE topologies: elastic EP with CUDA-graph recapture (SGLang), removing MRV2 fallback so elastic EP works on Model Runner V2 (vLLM), deferred NCCL sample receives on PP stages, and FP32 MoE routing-weight preservation in SGLang's mxfp4 path.

**Kernel tuning outside NVIDIA**: ROCm/DSA fusion on MI355X (SGLang), FlashAttention MLA + AITER FA coverage on AMD (vLLM), RDNA4 warp counts and LDS bank-conflict fixes, Metal `fa-vec` tuning for M2 Max, plus a claim of **>2× prefill on GB10** for qwen4exp via lazy-PLE direct reads in llama.cpp.

**Speculative decoding** is a cross-cutting reliability problem: MTP first-repeat cache misses (vLLM), NEXTN acceptance decay to ~0 over uptime (SGLang), and speculative divergence on quantized targets (llama.cpp).

**Agent-workload caching** is emerging as a competitive area: vLLM's early-UUID media cache fast path (hundreds of ms saved per repeated multimodal request), llama.cpp checkpoint placement at user-turn boundaries, and parent-level metrics for `n>1` parallel sampling.

## 5. Layer Positioning

| Project | Layer | Role | Typical deployment |
|---|---|---|---|
| vLLM | Production serving engine | Paged KV, CUDA graphs, TP/PP/EP/CP, speculative decoding, OpenAI-compatible API | Multi-GPU production inference (H100/B200/GB10) |
| SGLang | Production serving engine | Radix-prefix cache, DCP, elastic EP, native sparse-attention tuning | Multi-GPU production inference; strong Blackwell/ROCm tuning |
| llama.cpp | Embeddable local runtime | GGUF inference across CPU/Metal/Vulkan/OpenCL/CUDA; bindings ecosystem | Edge, desktop, embedded; llama-server |
| Ollama | Local-first product layer | Model distribution, desktop app, cloud-model proxy; wraps llama.cpp | Developer laptops, local agent/assistant use |
| LiteLLM | Control-plane gateway | Routing, budgets, spend accounting, auth, provider translation | Proxy in front of many model backends |
| Unsloth | Training/fine-tuning + Studio runtime | QLoRA efficiency; Studio is a productized llama.cpp server with agent/turn semantics | Fine-tuning workstations; desktop agent serving |

**Overlaps to watch:** Ollama and Unsloth Studio both wrap llama.cpp but for different users — Ollama is general local inference; Unsloth Studio targets agentic/voice workflows with stronger session semantics (per-account isolation, checkpointing at tool-call turns). vLLM and SGLang remain direct substitutes for production serving; the market signal today is that neither has a decisive correctness edge on the newest sparse-attention models.

## 6. Trend Signals

1. **Sparse-attention and hybrid models are, for the first time, the dominant source of engine instability across every layer.** Qwen3.8-Flash-Next, DeepSeek-V4, GLM-5.3, and MiniMax-M3 trigger nondeterminism, illegal memory access, all-NUL output, or prefix-cache geometry failures in every project that serves them. Complexity has moved from the attention kernel into the *boundary layers*: sparse indexer budgets, hybrid Mamba/attention block geometry, and speculative-draft interactions.

2. **Silent failures outnumber crashes, and they cluster in quantization × spec-decode combinations.** The top stability items across digests are output-corrupting rather than process-killing: greedy nondeterminism near the QSA budget boundary (`#54521`), TurboQuant k8v4 + MTP degenerate text (`#53180`), MiniMax-M3 token-0 output, Unsloth cross-request response leakage after cancellation (`#10388`), and LiteLLM false budget 429s (`#40050`). Agent/application developers need output validation and token-ID anomaly monitors, not just error-rate dashboards.

3. **Prefix caching is the new throughput battleground, and hybrid models are breaking it.** Identical prompts getting *zero* cache reuse is still an open bug at vLLM; MTP first-repeat misses cache entirely; llama.cpp's unified KV has a second-request throughput collapse; Ollama's MLX truncates caches to 8192 tokens. For repeat-request/agent workloads, budget for full re-prefill on hybrid models until geometry-aware prefix caching lands.

4. **Agent workload semantics are pulling infrastructure changes.** Caching is being redesigned around turn boundaries (llama.cpp checkpoints, Ollama renderer delimiters), media cache fast paths (vLLM early-UUID), and parent-level request metrics — the demand side is Claude-Code-style local loops, and the supply side is responding.

5. **Observability and supply-chain hardening are moving up the roadmap.** Ollama's Prometheus `/metrics` endpoint is in review; llama.cpp shipped `--log-jsonl`; LiteLLM added CI benchmarks gating Rust/Python callback performance and cosign-signed images; Unsloth is replacing seeded admin passwords with one-time setup tokens. Operational trust is overtaking raw feature work.

6. **Blackwell consumer/edge SKUs (SM120/SM121) remain a cross-project hazard zone.** llama.cpp has CUDA-graph GPU hangs on RTX 5090 laptops; vLLM sees Xid 13 illegal memory access under FP8 load on RTX PRO 5000; SGLang has unresolved SM120 DSA blockers and MiniMax-M3 failures on DGX Spark. Every engine is working SM120 kernels in parallel, but no single project has declared it stable — pin kernels or GPUs carefully.

**Bottom line for decision-makers:** Do not upgrade to the newest sparse-attention models or Blackwell consumer GPUs expecting greedy determinism and cache reuse to just work. Pin known-good engine versions, run batch-invariance and token-ID sanity checks after any upgrade, and treat silent wrong-output bugs — not crashes — as the primary production risk this quarter.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-07

## Today's Highlights

No releases shipped in the last 24h; the activity is concentrated in correctness and determinism work. The most-discussed issue is a **greedy-decoding nondeterminism bug on Qwen3.8-Flash-Next FP8** that appears only when long prompts cross the QSA `indexer_budget` boundary ([#54521](https://github.com/vllm-project/vllm/issues/54521)), alongside several open correctness bugs combining quantization, MTP speculative decoding, and hybrid Mamba/GDN architectures ([#53180](https://github.com/vllm-project/vllm/issues/53180)). On the PR side, a cluster of fixes targets **hybrid-Mamba prefix-cache geometry** ([#54076](https://github.com/vllm-project/vllm/pull/54076), [#55601](https://github.com/vllm-project/vllm/pull/55601)) and CUDA-graph capture with FlashInfer MoE autotuning ([#55377](https://github.com/vllm-project/vllm/pull/55377)).

## Releases & Breaking Changes

None. No releases or release-candidate tags were published in the last 24 hours.

## New Model & Hardware Support

- **Qwen3.8-Flash-Next FP8** is the subject of heavy QA activity ([#54521](https://github.com/vllm-project/vllm/issues/54521)); it is already supported but exhibits sparse-attention determinism issues (see Stability).
- **ROCm / AMD** — CI coverage to exercise `ROCM_AITER_FA` and FlashAttention MLA prefill backends is proposed in [PR #55611](https://github.com/vllm-project/vllm/pull/55611); an LDS bank-conflict fix for `vecMatMul_kernel` targets RDNA4 ([PR #41187](https://github.com/vllm-project/vllm/pull/41187)).
- **Blackwell / SM121** — DeepseekV4 startup on GB10 is blocked by unguarded DeepGEMM selection in `mhc_pre_broadcast`; a TileLang fallback is proposed in [PR #53055](https://github.com/vllm-project/vllm/pull/53055).
- **MXFP8 on AMD** remains an open feature request for dense/MoE GEMM and grouped GEMM kernels ([#34012](https://github.com/vllm-project/vllm/issues/34012)).
- **Helion linear backend** — an RFC proposes adding a PyTorch-native, hardware-agnostic kernel DSL backend as an alternative linear path ([#46526](https://github.com/vllm-project/vllm/issues/46526)).
- **Transformers v5 migration** — ColQwen3 multimodal pooling tests are ready to be unskipped ([PR #55588](https://github.com/vllm-project/vllm/pull/55588)).
- **Elastic EP on Model Runner V2** — PR removes the MRV2 unsupported-feature block so elastic expert parallelism does not force fallback to MRV1 when MRV2 becomes default ([PR #53934](https://github.com/vllm-project/vllm/pull/53934)).

## Performance & Optimization

- **Kimi-K3 MoE decode autotune before CUDA graph capture** — [PR #55377](https://github.com/vllm-project/vllm/pull/55377) splits out a fix for FlashInfer deferred-MoE decode kernels missing autotune entries during graph capture, a source of cache-miss stalls.
- **Multimodal cache hit avoids media decode** — [PR #55583](https://github.com/vllm-project/vllm/pull/55583) adds opt-in `VLLM_EARLY_UUID_LOOKUPS`: on a UUID cache hit, URLs are skipped before video/image loading and decoding, saving hundreds of milliseconds per request.
- **Pipeline-parallel sampled-result latency** — [PR #53948](https://github.com/vllm-project/vllm/pull/53948) defers sampled-result NCCL receives on non-last PP stages until the scheduler step actually consumes them.
- **KV offload group scoping** — [PR #54743](https://github.com/vllm-project/vllm/pull/54743) scopes offload-group configs to prefix-cacheable KV cache groups, avoiding over-broad assertions/allocations in hybrid-cache models.
- **Incremental MoE expert offloading** — RFC [#38256](https://github.com/vllm-project/vllm/issues/38256) remains open: CPU-pinned expert weights with a hot-expert GPU cache (LFRU eviction, cross-layer prediction) to run over-VRAM models.
- **Prefix-cache gaps on hybrid models** are currently costing real throughput: DFlash2 + YaRN gets **zero** prefix reuse on identical 1.04M-token prompts ([#54094](https://github.com/vllm-project/vllm/issues/54094)), and MTP first repeat misses the cache entirely on a Mamba/GDN model ([#53504](https://github.com/vllm-project/vllm/issues/53504)).

## Stability & Regressions

Ranked roughly by severity; fix PRs are noted where present.

1. **Silent nondeterminism at temperature 0 — Qwen3.8-Flash-Next FP8 (QSA).** Five byte-identical greedy requests diverge when prompt length nears `indexer_budget`, the point where Qwen Sparse Attention switches from dense to persistent top-k prefill. Highly active ([#54521](https://github.com/vllm-project/vllm/issues/54521)); no fix PR yet.
2. **Silent degenerate output — TurboQuant k8v4 + MTP on hybrid GDN models.** Stock v0.27.1 produces degenerate text without error on Ada hardware ([#53180](https://github.com/vllm-project/vllm/issues/53180)); no fix PR yet. Avoid this combination in production.
3. **CUDA illegal memory access on SM120 with FP8 under sustained load.** `Xid 13` on RTX PRO 5000 / Blackwell; workarounds are `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` or `--enforce-eager`. Newly filed, open ([#55571](https://github.com/vllm-project/vllm/issues/55571)).
4. **Kimi-K3 CUDA-graph failure on Hopper/SM90a.** KDA projection overlap emits PTX instructions requiring SM100+, crashing during graph profiling. Fix in review: [PR #55426](https://github.com/vllm-project/vllm/pull/55426).
5. **Prefix-cache correctness on hybrid Mamba.** Zero prefix reuse on DFlash2 + YaRN long-prompt reruns ([#54094](https://github.com/vllm-project/vllm/issues/54094)); OOB read on prefix-cache hits when an attention group has a smaller block size than `mamba_block_size`, fixed by [PR #55601](https://github.com/vllm-project/vllm/pull/55601); align-mode chunk splitting using the wrong block size, fixed by [PR #54076](https://github.com/vllm-project/vllm/pull/54076).
6. **MTP first-repeat prefix-cache miss on hybrid Mamba/GDN** — full re-prefill on first repeat, reuse only from the second repeat onward ([#53504](https://github.com/vllm-project/vllm/issues/53504)).
7. **AMD GPU–CPU KV transfer fault kills the engine.** A synchronous `hipSuccess` check in `swap_blocks_batch` takes down the whole engine on a device error; [PR #52838](https://github.com/vllm-project/vllm/pull/52838) proposes degrading the cache instead.
8. **TRT-LLM 8x4 FP4 scale padding not zeroed.** Fix in [PR #47587](https://github.com/vllm-project/vllm/pull/47587) (addresses #37563) to avoid reading uninitialized scale padding from FlashInfer's NVFP4 8x4 layout.
9. **Priority-queue preemption re-admission bug.** Preempted requests can be re-inserted out of order because `Request.__lt__` omits `num_preemptions`; fix in [PR #51574](https://github.com/vllm-project/vllm/pull/51574) (addresses #41951).
10. **Multi-node startup deadlock (gloo barrier) with Ray executor at 2×TP-16.** Closed — a regression between dev builds, now resolved ([#52907](https://github.com/vllm-project/vllm/issues/52907)).

Also notable: batch-invariance/determinism test coverage is being extended to **chunked prefill** ([PR #55612](https://github.com/vllm-project/vllm/pull/55612)) — the scheduler path a loaded server exercises constantly — which should catch a class of load-dependent nondeterminism.

## What This Means for Application Developers

- **Do not assume greedy determinism on Qwen3-Next / Qwen3.8-Flash / sparse-attention models** near the sparse-attention budget boundary, even at `temperature=0` ([#54521](https://github.com/vllm-project/vllm/issues/54521)). If you cache or compare outputs across requests, pin a version once a fix lands and validate with long contexts.
- **Quantization × speculative-decoding combinations need explicit smoke tests.** TurboQuant k8v4 + MTP on hybrid GDN models can fail silently ([#53180](https://github.com/vllm-project/vllm/issues/53180)); this is the most dangerous failure mode in the current queue because nothing is raised.
- **Repeat-request latency on hybrid Mamba/attention models can be unexpectedly bad.** Identical prompts may see zero prefix-cache reuse on the first repeat (MTP) or even entirely (DFlash2+YaRN) ([#53504](https://github.com/vllm-project/vllm/issues/53504), [#54094](https://github.com/vllm-project/vllm/issues/54094)); budget for full re-prefills in SLA planning until these are fixed.
- **Classifier/pooling heads with Multi-LoRA remain unsupported** — multiple open threads ([#19623](https://github.com/vllm-project/vllm/issues/19623), [#12829](https://github.com/vllm-project/vllm/issues/12829), [#23719](https://github.com/vllm-project/vllm/issues/23719)). Don't plan a vLLM-based multi-tenant classification rollout on it yet.
- **Parallel sampling metrics arrive** — parent-level request metrics for `n > 1` requests, so server-side token accounting will match what the client actually received ([PR #55594](https://github.com/vllm-project/vllm/pull/55594)).
- **DPR: media-heavy multimodal apps will gain an early-UUID cache fast path** ([PR #55583](https://github.com/vllm-project/vllm/pull/55583)) — useful if you serve repeated video/image URLs through `/inference/*` routes.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-07

## 1. Today’s Highlights

No release was cut in the last 24 hours; the signal is dominated by the GLM‑5.3‑Flash stability cluster and by platform‑enablement PRs for Blackwell SM120, ROCm/DSA, Apple silicon, and T‑Head PPU. New correctness reports for MiniMax‑M3 on DGX Spark and DeepSeek‑V4 long‑context prefill will matter for anyone already serving those models. Several targeted fixes are in flight or were closed around FP4 GEMM selection, fp32 MoE routing weights, CP sharding, and iterative radix‑hash collection.

## 2. Releases & Breaking Changes

None. No tags, releases, or migration notes were published in the last 24 hours.

## 3. New Model & Hardware Support

- **T‑Head PPU roadmap** — [#37519](https://github.com/sgl-project/sglang/issues/37519) proposes first‑class support for ZW810 / ZW810E / ZW‑M890P.
- **Apple Silicon** — Roadmap [#19137](https://github.com/sgl-project/sglang/issues/19137) remains open; a redesigned proposal [#32321](https://github.com/sgl-project/sglang/issues/32321) describes a Torch‑owned SRT path with an exported whole‑model MLX region.
- **Mamba 1/2 inference** — Open PR [#34556](https://github.com/sgl-project/sglang/pull/34556) adds Mamba 2 and Mamba 1 support.
- **FlashInfer prefill context parallelism** — [#33226](https://github.com/sgl-project/sglang/pull/33226) adds CP‑v2 prefill for dense MHA/GQA models on the FlashInfer backend.
- **Qwen3.8‑Flash‑Next NVFP4 on DGX Spark/RTX PRO 6000** — Cookbook recipes for 1x/2x DGX Spark and RTX PRO 6000 added in [#37995](https://github.com/sgl-project/sglang/pull/37995).
- **ROCm/DSA enablement** — Fast Triton Sparse MLA backend for the DSA prefill/decode path [#30575](https://github.com/sgl-project/sglang/pull/30575); HiCache kernel IO backend made ROCm‑aware [#37152](https://github.com/sgl-project/sglang/pull/37152).
- **MiniMax‑M3 on SM121 (DGX Spark)** — Reported broken on the Triton MiniMaxSparse path: server serves but emits token id 0 for every position; the same W4A16 weights are correct on vLLM ([#38143](https://github.com/sgl-project/sglang/issues/38143), open against v0.5.18).

## 4. Performance & Optimization

- **Unified memory decode gap on Blackwell** — [#37926](https://github.com/sgl-project/sglang/pull/37926) closes the DCP decode gap; on B300 with Kimi‑Linear at TP2/DCP2 + `cutedsl_mla`, the unified pool ran 1.96% behind the static pool, and the fix porting progress is tracked in PR.
- **SM120 NVFP4 default GEMM** — [#38170](https://github.com/sgl-project/sglang/pull/38170) makes FlashInfer’s `b12x` NVFP4 GEMM the default on SM120/SM121; `auto` currently resolves to the wrong flashinfer backend and hurts cold‑weight GEMM at roughly M=9xx.
- **DeepSeek‑V4 fp32 routing weights** — [#33608](https://github.com/sgl-project/sglang/pull/33608) keeps MoE routing weights in fp32 in the mxfp4 trtllm path instead of truncating them through packed `topk_ids`.
- **Elastic EP decode graph recapture** — [#33723](https://github.com/sgl-project/sglang/pull/33723) (3/N) recaptures full decode CUDA graphs after runtime Elastic EP scale‑up.
- **ROCm DSA decode path** — [#37124](https://github.com/sgl-project/sglang/pull/37124) fuses DSA metadata kernels and removes redundant absorb‑path work; measured on GLM‑5.2‑MXFP4 / MI355X / TP4 at concurrency 4.
- **Radix cache prefix hashing** — [#38204](https://github.com/sgl-project/sglang/pull/38204) collects prefix hash values iteratively instead of recursive parent walks.
- **HiCache/Mooncake linker loads** — [#38195](https://github.com/sgl-project/sglang/pull/38195) keeps queued Mooncake direct‑linker loads alive after an abort so layer‑wise loads can still fill device slots.
- **Test/CI consolidation** — [#37436](https://github.com/sgl-project/sglang/pull/37436) is net −11.4K lines of cleanup plus backend deduplication.

## 5. Stability & Regressions

Ranked by impact:

1. **GLM‑5.3‑Flash + HiCache host‑tier load‑back corrupts generation** — dropped tool calls and degenerate repetition loops on 8×H100 / TP8, even without speculative decoding ([#38031](https://github.com/sgl-project/sglang/issues/38031)). Still open; tracked under [#37524](https://github.com/sgl-project/sglang/issues/37524).
2. **DeepSeek‑V4 long‑context prefill illegal memory access** — DSA indexer top‑k kernel (`topk_v1.cuh:348`) faults; the paged prefill path never reaches the v2 kernel ([#37892](https://github.com/sgl-project/sglang/issues/37892)). A closed fix [#34142](https://github.com/sgl-project/sglang/pull/34142) addresses a related DSA CP row‑pitch memory fault.
3. **GLM‑5.3 DPC crashes** — new, open, with a repro against the latest version ([#38207](https://github.com/sgl-project/sglang/issues/38207)).
4. **MiniMax‑M3 on DGX Spark emits all‑NUL output** — reproducible on the Triton MiniMaxSparse path only; vLLM with identical weights is correct ([#38143](https://github.com/sgl-project/sglang/issues/38143)).
5. **GLM‑5.3‑Flash startup/backend failures** — `KeyError: 'residual'` under pipeline parallelism ([#36906](https://github.com/sgl-project/sglang/issues/36906)) and remaining SM120 DSA blockers on RTX PRO 6000 after the `deep_gemm` NameError ([#37105](https://github.com/sgl-project/sglang/issues/37105)); SM120 qualification tracked in [#37813](https://github.com/sgl-project/sglang/issues/37813).
6. **NEXTN/MTP acceptance decays to ~0 over uptime** — Qwen3.8‑Flash‑Next draft acceptance degrades until restart, suggesting a state/build‑up bug ([#37326](https://github.com/sgl-project/sglang/issues/37326)).
7. **KV pool profiler under‑allocates with speculative decoding** — ~50 GB VRAM left idle on Qwen3.6‑27B NVFP4 hybrid/GDN with EAGLE/MTP enabled ([#29857](https://github.com/sgl-project/sglang/issues/29857)).
8. **DeepSeek‑V4‑Flash `reasoning_effort` mapping off by one** — `high` is a no‑op and the vendor `max` level is unreachable ([#33185](https://github.com/sgl-project/sglang/issues/33185)).
9. **DeepSeekV4 hook rejects `--speculative-algorithm NEXTN`** — NEXTN→EAGLE alias resolution occurs after model‑specific hooks, so startup fails ([#38236](https://github.com/sgl-project/sglang/issues/38236)).
10. **OTel tracing loses Scheduler spans** — when `--tokenizer-worker-num>1` is set ([#38210](https://github.com/sgl-project/sglang/issues/38210)).
11. **GPT‑OSS + DP attention garbage output** — GSM8K 0/128 vs 124/128; now closed/inactive, so re‑test before relying on it ([#37187](https://github.com/sgl-project/sglang/issues/37187)).
12. **CI health tracker** — currently 1 broken and 14 flaky tests on main; 949 recently fixed ([#17050](https://github.com/sgl-project/sglang/issues/17050)).

## 6. What This Means for Application Developers

- **GLM‑5.3‑Flash users should be conservative today**: avoid HiCache host‑tier load‑back on H100/TP8 deployments until [#38031](https://github.com/sgl-project/sglang/issues/38031) is fixed, and watch the centralized tracker [#37524](https://github.com/sgl-project/sglang/issues/37524) before upgrading production versions. SM120 (RTX PRO 6000) remains blocked by [#37105](https://github.com/sgl-project/sglang/issues/37105).
- **DGX Spark / SM121 users**: MiniMax‑M3 W4A16 on the Triton sparse path is currently unusable ([#38143](https://github.com/sgl-project/sglang/issues/38143)); verify output token IDs before enabling this model class.
- **DeepSeek‑V4 serving**: long‑context prefill on the DSA path is unsafe until [#37892](https://github.com/sgl-project/sglang/issues/37892) lands. Also expect `reasoning_effort=high` to behave like the level below it and validate your request mapping against [#33185](https://github.com/sgl-project/sglang/issues/33185).
- **Blackwell SM120 FP4 serving**: after [#38170](https://github.com/sgl-project/sglang/pull/38170) merges, re‑benchmark cold‑weight/small‑batch GEMM; current `auto` selection is likely leaving throughput on the table.
- **Speculative decoding on Qwen/Qwen‑style Flash models**: if NEXTN/MTP acceptance slowly degrades, restarting the server is still the only remedy ([#37326](https://github.com/sgl-project/sglang/issues/37326)); for DeepSeekV4, `NEXTN` may currently be rejected at startup ([#38236](https://github.com/sgl-project/sglang/issues/38236)).
- **If you rely on OTel traces**, keep `--tokenizer-worker-num=1` for now or you will lose Scheduler spans ([#38210](https://github.com/sgl-project/sglang/issues/38210)).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-07

## Today's Highlights

llama.cpp shipped a rapid series of builds through b10828, headlined by end-to-end support for the Spark2_5ForCausalLM architecture. The next most operationally relevant changes are CUDA race fixes in `mmid`/`mmf`, OpenCL weight-pack selection for `q4_K`/`q5_K` `mul_mat`, a grammar repetition-threshold fix, and a new `--log-jsonl` flag. Open issue activity is concentrated around Qwen-family long-context/MTP correctness, CUDA graphs on Blackwell, and Vulkan/AMD iGPU prefill regressions.

## Releases & Breaking Changes

| Build | Highlights |
|---|---|
| [b10828](https://github.com/ggml-org/llama.cpp/releases/tag/b10828) | Adds Spark2_5ForCausalLM implementation ([#27868](https://github.com/ggml-org/llama.cpp/pull/27868)). |
| [b10827](https://github.com/ggml-org/llama.cpp/releases/tag/b10827) | OpenCL: correctly choose weights pack for `q4_K`/`q5_K` `mul_mat` ([#28402](https://github.com/ggml-org/llama.cpp/pull/28402)). |
| [b10826](https://github.com/ggml-org/llama.cpp/releases/tag/b10826) | CUDA: fixes races in `mmid` and `mmf` ([#28475](https://github.com/ggml-org/llama.cpp/pull/28475)). |
| [b10825](https://github.com/ggml-org/llama.cpp/releases/tag/b10825) | Grammar: fix max repetition threshold ([#28469](https://github.com/ggml-org/llama.cpp/pull/28469)). |
| [b10823](https://github.com/ggml-org/llama.cpp/releases/tag/b10823) | `common`: add `--log-jsonl` ([#28437](https://github.com/ggml-org/llama.cpp/pull/28437)). |
| [b10822](https://github.com/ggml-org/llama.cpp/releases/tag/b10822) | UI assets now embedded directly with CMake; removes external gzip dependency ([#28445](https://github.com/ggml-org/llama.cpp/pull/28445)). |
| [b10821](https://github.com/ggml-org/llama.cpp/releases/tag/b10821) | Metal: add remaining `fa-vec` tunings for M2 Max ([#28458](https://github.com/ggml-org/llama.cpp/pull/28458)). |

No explicit breaking API changes were announced. The UI build change in b10822 is the main packaging difference: cross-compilation is simplified because the build-time helper and external gzip dependency are gone.

## New Model & Hardware Support

- **Spark2_5ForCausalLM** — landed in [b10828](https://github.com/ggml-org/llama.cpp/releases/tag/b10828) via [PR #27868](https://github.com/ggml-org/llama.cpp/pull/27868). This adds GGUF conversion support, architecture registration/tensor mapping, tokenizer pre-tokenizer support, and load/inference graph support. The early implementation was labelled “Spark3” and later renamed to Spark2_5.

- **HrmTextForCausalLM / DFM Mimir 1B** — open PR [#27625](https://github.com/ggml-org/llama.cpp/pull/27625). The architecture alternates two transformer stacks over the same token stream and needs a fused `gqkv` projection conversion path. Not yet merged.

- **Sharded multimodal projector support** — open PR [#28517](https://github.com/ggml-org/llama.cpp/pull/28517). Currently `llama-server --mmproj` fails on sharded GGUF files with `clip_model_loader: unable to find tensor v.patch_embd.weight`; this PR attempts to load sharded `mmproj` GGUFs correctly.

## Performance & Optimization

- **OpenCL quant matmul fix** in [b10827](https://github.com/ggml-org/llama.cpp/releases/tag/b10827) ([#28402](https://github.com/ggml-org/llama.cpp/pull/28402)): correct weight pack selection for `q4_K`/`q5_K` `mul_mat`.

- **Metal `fa-vec` tuning** in [b10821](https://github.com/ggml-org/llama.cpp/releases/tag/b10821) ([#28458](https://github.com/ggml-org/llama.cpp/pull/28458)): additional M2 Max attention-vector tuning.

- **AMD RDNA4 MMVQ warp tuning** — [PR #24386](https://github.com/ggml-org/llama.cpp/pull/24386): tunes `ncols_dst == 1` warp counts for `Q4_K`/`Q6_K`, improving single-token decode throughput for `Q4_K_M` models on gfx1200.

- **CUDA/HIP flash-attention tuning for gfx1201** — [PR #28102](https://github.com/ggml-org/llama.cpp/pull/28102): reports poor long-context prefill on R9700 PRO and includes FA tuning plus a fix for a `HS=256` bug in the general CUDA FA path.

- **qwen4exp lazy PLE direct reads** — [PR #28136](https://github.com/ggml-org/llama.cpp/pull/28136): direct reads for the lazy PLE table, reported as more than **2× prefill performance improvement on GB10**.

- **Sparse FA for DeepSeek/GLM-class models** — [PR #27970](https://github.com/ggml-org/llama.cpp/pull/27970): adds a sparse flash-attention path driven by the API hint for maximum live KV entries per token.

- **Lazy-mode refactor to fix auto behavior** — [PR #28326](https://github.com/ggml-org/llama.cpp/pull/28326): reworks `--lazy-mode auto` to select a likely-good mode automatically and moves current “tensors >4GiB lazy” behavior to mode `large`. This is aimed at fixing the Vulkan/AMD iGPU prefill regression in [#28160](https://github.com/ggml-org/llama.cpp/issues/28160).

- **Vulkan expert count limit** — [PR #28501](https://github.com/ggml-org/llama.cpp/pull/28501): raises hoisted row-id limit for `mul_mat_id` from 256 to 512 experts, relevant for newer large-MoE models.

- **Vulkan FA shared-memory staging on AMD RDNA** — [PR #28507](https://github.com/ggml-org/llama.cpp/pull/28507): enables shared-memory staging in the scalar flash-attention path for AMD RDNA.

## Stability & Regressions

Ranked by operational severity.

1. **CUDA graphs can hang the GPU on RTX 5090 Laptop / sm_120** — [#27330](https://github.com/ggml-org/llama.cpp/issues/27330). Symptoms include RC watchdog and Xid 8; `GGML_CUDA_DISABLE_GRAPHS=1` is a complete workaround. Still open, no linked fix PR.

2. **`--kv-unified` causes 42–54% prompt-processing drop from the second long request onward** — [#28495](https://github.com/ggml-org/llama.cpp/issues/28495). Reproduced with `-np 2`, single GPU, sequential requests, no spill/speculation. Root cause appears to be the CUDA/HIP flash-attention kernels only skipping tail masked KV blocks, not interior all-`-INF` blocks.

3. **Vulkan regression: `--lazy-mode auto` halves pp512 for qwen4exp on AMD iGPU** — [#28160](https://github.com/ggml-org/llama.cpp/issues/28160). Introduced after commit `257813839`. Fix PR is open: [#28326](https://github.com/ggml-org/llama.cpp/pull/28326).

4. **Qwen hybrid model silent instant-EOS beyond ~130k context** — [#27756](https://github.com/ggml-org/llama.cpp/issues/27756). Reproduced on CUDA and CPU for Qwen3.5-hybrid/Qwen3.8-27B. Suspected DeltaNet recurrent-state depth interaction. No fix PR linked.

5. **Speculative decoding diverges from greedy on quantized targets** — [#25618](https://github.com/ggml-org/llama.cpp/issues/25618). Draft-MTP/draft-DSpark greedy output differs from vanilla when target is quantized; matches on bf16. Still open.

6. **MTP eval bug: Qwen3.6 27B outputs repeated `////` after long sessions** — [#23577](https://github.com/ggml-org/llama.cpp/issues/23577). Open/unconfirmed, likely related to MTP + long-context stability.

7. **Chat/tool-call grammar correctness** — Several open issues remain around JSON-schema-to-grammar and tool-call enforcement:
   - `tool_choice: "required"` accepted but not enforced on templates with `supports_preserve_reasoning: true` ([#27217](https://github.com/ggml-org/llama.cpp/issues/27217)).
   - Empty-object schemas and large `maxLength` can generate invalid GBNF ([#25923](https://github.com/ggml-org/llama.cpp/issues/25923), [#25746](https://github.com/ggml-org/llama.cpp/issues/25746)).
   - Open fix for enum JSON handling: [#28518](https://github.com/ggml-org/llama.cpp/pull/28518).

Already fixed in this release batch: CUDA race fixes in `mmid`/`mmf` ([#28475](https://github.com/ggml-org/llama.cpp/pull/28475)) and grammar max repetition threshold ([#28469](https://github.com/ggml-org/llama.cpp/pull/28469)).

## What This Means for Application Developers

- **New model enablement is moving fast.** Spark2_5 should soon be usable from GGUF-converted weights for inference and server deployment. Watch the conversion scripts around [PR #27868](https://github.com/ggml-org/llama.cpp/pull/27868).

- **For serving with parallel slots, validate unified-KV behavior.** If you use `-np 2 --kv-unified`, benchmark prompt processing after the first request; the known CUDA/HIP FA limitation in [#28495](https://github.com/ggml-org/llama.cpp/issues/28495) can cut throughput nearly in half.

- **Tool-calling users should test grammar generation at the edges.** Empty-object schemas, `maxLength` around 2000+, and reasoning-preserving templates all have known enforcement/grammar bugs. Do not assume `tool_choice: "required"` is strong enforcement yet.

- **`--log-jsonl` is now available** ([#28437](https://github.com/ggml-org/llama.cpp/pull/28437)). This is useful for structured log ingestion around `llama-server` and other common CLI tools.

- **If running on newer Blackwell consumer GPUs, keep `GGML_CUDA_DISABLE_GRAPHS=1` available** as a fallback until the CUDA-graph hang on sm_120 is resolved ([#27330](https://github.com/ggml-org/llama.cpp/issues/27330)).

- **The web UI is now fully embedded in the binary**, simplifying deployment for builds that include the UI ([#28445](https://github.com/ggml-org/llama.cpp/pull/28445)). If you serve the PWA, also track the service-worker caching fix for liveness endpoints in [PR #28508](https://github.com/ggml-org/llama.cpp/pull/28508).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-07

## 1. Today's Highlights
[v0.34.0-rc1](https://github.com/ollama/ollama/releases) introduces running Ollama models inside ChatGPT Desktop (macOS) and improves structured-output performance on Apple Silicon. A long-requested Prometheus `/metrics` endpoint is now in open PR. Meanwhile, stability reports dominate: a Blackwell flash-attention crash, a Vulkan regression on AMD iGPUs, and multiple cloud-model JSON/reasoning bugs.

## 2. Releases & Breaking Changes
- **[v0.34.0-rc1](https://github.com/ollama/ollama/releases)** — First release candidate for v0.34.0:
  - **ChatGPT Desktop integration**: Ollama models are selectable inside ChatGPT Desktop; setup is exposed from the Ollama macOS app.
  - **Structured output**: performance improvements on Apple Silicon.
  - No API-breaking changes announced; treat as RC and pin versions before rolling out.

## 3. New Model & Hardware Support
- No new architectures merged today.
- **New architecture request**: native support for `spark2_5` (Spark-X2.5-4B / 1.7B) is pending — models download today but fail to start inference [#18195](https://github.com/ollama/ollama/issues/18195).
- **Blackwell (sm_120) users**: note the crash in [#18276](https://github.com/ollama/ollama/issues/18276) below before relying on RTX 50-series for qwen3-moe workloads.

## 4. Performance & Optimization
- **Structured output** throughput improves on Apple Silicon in v0.34.0-rc1 (no numbers in release notes).
- **MLX prefix-cache bug**: restore points are truncated down to a multiple of 8192 tokens, so up to 8191 tokens get re-prefilled after every cold prompt. On agent workloads (e.g., Claude Code against a local model) this costs a fixed **17–27 s re-prefill tax** per turn [#18267](https://github.com/ollama/ollama/issues/18267).
- **`/metrics` for Prometheus**: [#16998](https://github.com/ollama/ollama/pull/16998) adds an opt-in (`OLLAMA_METRICS=1`) endpoint with scheduler gauges (`ollama_requests_queued`, `ollama_models_loaded`), HTTP counters, and per-model/token metrics. This addresses the long-standing feature request [#3144](https://github.com/ollama/ollama/issues/3144).
- **Checkpoint groundwork for agent workloads**: [#18271](https://github.com/ollama/ollama/pull/18271) proposes sending renderer message delimiters to llama-server so context checkpoints are placed at user-turn boundaries — relevant for prompt-caching latency on local agent loops.

## 5. Stability & Regressions
Ranked by severity; no confirmed fix PRs for the top items yet.

- **Blackwell flash-attention crash** — `qwen3-coder:30b` on RTX 5070 Ti (sm_120) auto-enables flash attention, then llama-server crashes with `0xc0000409` / "shared object initialization failed" at warmup even though all 49 layers fit in memory [#18276](https://github.com/ollama/ollama/issues/18276).
- **Vulkan regression (AMD iGPU)** — loading a 66 GB model now fails with "Not enough memory for command submission"; works on v0.32.9, broken since v0.32.12 [#18272](https://github.com/ollama/ollama/issues/18272).
- **Cloud reasoning models returning unusable JSON** — `minimax-m3:cloud` intermittently splits JSON payloads across `reasoning` and `content`, leaving `content` alone invalid for OpenAI-compatible `/v1/chat/completions` consumers [#17987](https://github.com/ollama/ollama/issues/17987).
- **Cloud model runaway loops** — `glm-5.3:cloud` enters endless reasoning and aborts tasks under OpenCode/ZCode while the official Z.AI endpoint works [#18193](https://github.com/ollama/ollama/issues/18193). `kimi-k2.6:cloud` continues to show 10+ minute latencies and stream `INTERNAL_ERROR`s [#16845](https://github.com/ollama/ollama/issues/16845).
- **gemma4 tool-call parser failure** — `BEGIN_ARG`/`END_ARG` syntax cannot be parsed; the model degenerates into a `<|channel|>` loop to the token cap and returns HTTP 200 with no usable content, breaking agent-mode Continue.dev [#18275](https://github.com/ollama/ollama/issues/18275).
- **Claude Desktop integration broken** — new integration from v0.33.1 fails at launch on some systems [#18073](https://github.com/ollama/ollama/issues/18073).
- **MLX stuck in "Stopping..."** — `muse-glimmer:30b-mlx` on Apple M4 repeatedly never exits stop state; a full macOS restart was required once [#18269](https://github.com/ollama/ollama/issues/18269).
- **Model-name validation too strict** — the 80-character limit blocks pulling long Hugging Face repository/filename paths such as `hf.co/DavidAU/...` [#18274](https://github.com/ollama/ollama/issues/18274).
- **Long-standing download integrity** — digest mismatch on `ollama pull` remains open after ~3 years [#941](https://github.com/ollama/ollama/issues/941); related progress-revert report [#8484](https://github.com/ollama/ollama/issues/8484) is closed.
- **License compliance debt** — Ollama release artifacts still omit bundled dependency notices (e.g., llama.cpp's MIT copyright), with 272 👍; relevant if your org requires OSS license audits [#3185](https://github.com/ollama/ollama/issues/3185).
- **Fixes in flight**: Windows tray balloon notification gating [#18273](https://github.com/ollama/ollama/pull/18273); EOT token fix for legacy `glm-ocr` GGUFs to stop runaway output [#17195](https://github.com/ollama/ollama/pull/17195).

## 6. What This Means for Application Developers
- **Do not assume `content` is valid JSON from `:cloud` reasoning models.** Add response validation/repair logic or use `reasoning`-aware parsing if you consume `minimax-m3:cloud` or similar via the OpenAI-compatible endpoint.
- **Pin Ollama versions if you run AMD iGPU/Vulkan or Blackwell.** v0.32.12+ is a known regression for Vulkan; qwen3-moe + Blackwell is currently unusable.
- **Instrument now for `/metrics`**: the endpoint is in review — planning dashboards around `ollama_requests_queued`, `ollama_models_loaded`, and per-token latency is safe and will land cleanly.
- **Local agent loops on MLX carry a fixed re-prefill tax** (up to ~27 s). If you target Claude-Code-style local workflows on Apple Silicon, budget for it or prefer non-MLX backends where cache behavior matters.
- **Test v0.34.0-rc1 in staging** before adopting ChatGPT Desktop integration, and verify gemma4 tool-calling paths against the new parser before upgrading production assistants.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-07

## 1. Today's Highlights
Budget and spend-accounting correctness dominates the tracker: a fresh cluster of issues reports false "Budget has been exceeded" 429s ([#40050](https://github.com/BerriAI/litellm/issues/40050)) and a process-local budget cap that never resets ([#40020](https://github.com/BerriAI/litellm/issues/40020)), compounded by spend logs recording $0 for custom models ([#35691](https://github.com/BerriAI/litellm/issues/35691)) and double-billed Anthropic cache reads ([#40006](https://github.com/BerriAI/litellm/issues/40006)). The long-running AdaptiveRouter `gammavariate` crash saga ([#29397](https://github.com/BerriAI/litellm/issues/29397), [#35590](https://github.com/BerriAI/litellm/issues/35590)) is now closed alongside [#31481](https://github.com/BerriAI/litellm/issues/31481). On the operations side, a fix PR for `POST /config/reload` ([#40035](https://github.com/BerriAI/litellm/pull/40035)) is up to resolve the 404 reported in [#30772](https://github.com/BerriAI/litellm/issues/30772).

## 2. Releases & Breaking Changes
- **v1.100.0** and **v1.101.0-rc.1** released ([releases](https://github.com/BerriAI/litellm/releases)); release notes only document cosign-verified Docker image signatures — no new migration notes surfaced.
- **Closed regression, v1.96+**: managed MCP OAuth2 flow was opening the LiteLLM UI instead of the vendor authorization page ([#39665](https://github.com/BerriAI/litellm/issues/39665)). Closed as of today; teams on managed MCP OAuth2 should confirm the flow renders the upstream vendor page after upgrading past 1.95.1.

## 3. New Model & Hardware Support
- **Standard Compute** chat completions provider added — endpoint, key env var, token-limit mapping, streaming and native tool-call support ([#39906](https://github.com/BerriAI/litellm/pull/39906)).
- **The Grid** added as a JSON-configured OpenAI-compatible provider ([#39907](https://github.com/BerriAI/litellm/pull/39907)).
- No new hardware backends (CUDA/ROCm/Metal/CPU) or quantization formats were reported.

## 4. Performance & Optimization
- **Rust/Python callback boundary**: [#40070](https://github.com/BerriAI/litellm/pull/40070) retains original Python references through callback invocation to preserve shared object identity (currently unwired foundation), and [#40008](https://github.com/BerriAI/litellm/pull/40008) adds 45 release-wheel benchmarks gating Rust/Python boundary performance in CI.
- **Cache analytics scoping**: [#32098](https://github.com/BerriAI/litellm/pull/32098) scopes `/global/activity/cache_hits` to internal users, limiting cross-tenant query surface for large deployments.
- No concrete throughput/latency numbers landed in this window.

## 5. Stability & Regressions
Ranked by severity; fix PRs noted where they exist.

1. **Budget enforcement false positives and billing integrity** (open): keys with `max_budget` return 429 with enforced cost far above recorded spend ([#40050](https://github.com/BerriAI/litellm/issues/40050)); `litellm_settings.max_budget` silently arms a never-resetting process-local `_current_cost` cap ([#40020](https://github.com/BerriAI/litellm/issues/40020)); spend logs record $0 for custom models outside the built-in cost map ([#35691](https://github.com/BerriAI/litellm/issues/35691)); `custom_cost_per_token` bills Anthropic cache-read tokens twice ([#40006](https://github.com/BerriAI/litellm/issues/40006)). Related fix: [#40060](https://github.com/BerriAI/litellm/pull/40060) prevents budget/key/user scalar updates from overwriting newer metadata they never supplied.
2. **Bedrock files** (open): `DELETE /v1/files/{file_id}` hard-fails with 500 "BedrockFilesConfig does not support file deletion" — managed files cannot be cleaned up ([#39715](https://github.com/BerriAI/litellm/issues/39715)).
3. **Headroom CCR + DeepSeek** (open): streaming conversion leaves `stream_options` in the upstream request after forcing `stream=false`, causing HTTP 400 ([#40068](https://github.com/BerriAI/litellm/issues/40068)).
4. **Chat provider bridge** (open): empty `function_call_arguments.delta` raises a `ValueError` instead of being a no-op for Responses-API-only upstreams ([#40069](https://github.com/BerriAI/litellm/issues/40069)).
5. **UI dashboard** (open): Request Logs date-range picker interprets local times as UTC, producing silently shifted windows for non-UTC users ([#39979](https://github.com/BerriAI/litellm/issues/39979)).
6. **Fixed/closed this cycle**: Anthropic `/v1/messages` erasing OpenAI Responses refusal blocks ([#39721](https://github.com/BerriAI/litellm/issues/39721)); AdaptiveRouter `gammavariate` HTTP 500 after restart/persisted zero-cell ([#29397](https://github.com/BerriAI/litellm/issues/29397), [#35590](https://github.com/BerriAI/litellm/issues/35590)); AdaptiveRouter reading costs from `litellm_params` instead of `model_info`, zeroing cost-weighted routing ([#31481](https://github.com/BerriAI/litellm/issues/31481)); `/ui/login` 404 ([#29340](https://github.com/BerriAI/litellm/issues/29340)).
7. **Notable fix PRs in flight**: `POST /config/reload` ([#40035](https://github.com/BerriAI/litellm/pull/40035)); reasoning_effort tier validation against deployment-declared levels ([#40071](https://github.com/BerriAI/litellm/pull/40071)); wildcard model expansion for `hosted_vllm/*` / `vllm/*` / `litellm_proxy/*` on `/v1/models` ([#40066](https://github.com/BerriAI/litellm/pull/40066)); keeping `ssl_verify` out of `extra_body` ([#38245](https://github.com/BerriAI/litellm/pull/38245)); Vertex AI recursion into `anyOf` for nullable enums ([#40049](https://github.com/BerriAI/litellm/pull/40049)); UI JSON model-editor key removal ([#34034](https://github.com/BerriAI/litellm/pull/34034)); Prisma zombie process reaping via tini ([#33786](https://github.com/BerriAI/litellm/pull/33786), [#33599](https://github.com/BerriAI/litellm/pull/33599)).

## 6. What This Means for Application Developers
- **Budget caps are not yet trustworthy as hard guarantees.** The combination of false "budget exceeded" enforcement ([#40050](https://github.com/BerriAI/litellm/issues/40050)), a non-resetting local cap ([#40020](https://github.com/BerriAI/litellm/issues/40020)), and $0 custom-model spend logs ([#35691](https://github.com/BerriAI/litellm/issues/35691)) means teams with strict `max_budget` should cross-check 429s against recorded spend before relying on them, and should validate custom-cost configuration after upgrades.
- **Cost-weighted routing can silently no-op** if pricing lives only in `model_info` for AdaptiveRouter deployments — pin pricing in `litellm_params` or verify cost logs.
- **Anthropic/OpenAI translation fixes are consolidating**: refusal-block handling is fixed, but reasoning-effort and Responses-API bridge edge cases ([#40069](https://github.com/BerriAI/litellm/issues/40069), [#25532](https://github.com/BerriAI/litellm/issues/25532)) still warrant testing for Claude Code / Codex-style agents.
- **Operator win**: [#40035](https://github.com/BerriAI/litellm/pull/40035) finally adds a working `POST /config/reload`, and all release images are now cosign-signed for supply-chain verification.
- Two new OpenAI-compatible providers (Standard Compute, The Grid) are on the way — useful for teams wanting routing beyond the bundled catalog.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-07

## Today's Highlights
No releases landed in the last 24 hours; instead the repository saw a burst of ~20 open PRs from Sept 6 hardening Unsloth Studio around the llama.cpp backend, plus a large triage pass that closed dozens of long-stale issues. The most important correctness fix in flight prevents responses from a cancelled generation being delivered to a *different*, still-active request ([#10388](https://github.com/unslothai/unsloth/pull/10388)). A related cluster of Strix Halo/AMD iGPU PRs addresses backend selection, prompt-cache retention, telemetry accuracy, and shutdown races in the Studio inference server.

## Releases & Breaking Changes
No new releases in the last 24h. Two unreleased Studio changes will affect operators if merged:

- **One-time setup token replaces seeded admin password** ([#10387](https://github.com/unslothai/unsloth/pull/10387)) — the served page currently carries the seeded admin password, gated by a local-browser check the authors call unwritable. The fix serves a single-use setup token instead. Scripted installs that scrape the seed will need updating.
- **Per-account isolation for shared installs** ([#10375](https://github.com/unslothai/unsloth/pull/10375)) — multi-user accounts on one GPU box, each with own config and credentials.

## New Model & Hardware Support
- **AMD integrated GPUs get the Vulkan llama.cpp prebuilt** ([#10381](https://github.com/unslothai/unsloth/pull/10381)) — on Strix Halo (gfx1150/gfx1151, Radeon 8060S) the installer now selects Vulkan instead of ROCm; existing automatic ROCm installs are offered the switch via the update banner.
- **Throwaway hardware-validation benchmarks opened** for NVFP4 + low-rank correction kernels on RTX 5090 / DGX Spark / RTX Spark / Windows-WSL ([#10391](https://github.com/unslothai/unsloth/pull/10391)) and for two-GPU layer-split of diffusion/video DiTs ([#10380](https://github.com/unslothai/unsloth/pull/10380)) — not intended to merge, but signals upcoming kernel/serving work for those targets.

## Performance & Optimization
- **Keep prompt cache on shared-memory GPUs** ([#10382](https://github.com/unslothai/unsloth/pull/10382)) — Studio's Windows full-offload tuning disables the llama-server prompt cache; on discrete cards that is a deliberate trade, but on integrated GPUs it is pure loss. One 48.8-hour Strix Halo session lost an estimated **44 hours** to it.
- **Retry as one sequence when llama.cpp refuses a unified KV cache** ([#10371](https://github.com/unslothai/unsloth/pull/10371)) — Studio appends `--kv-unified` whenever `n_parallel > 1`, which breaks architectures that need one sequence per stream; adds a fallback retry path.
- **Telemetry reports a throughput the engine could have produced** ([#10384](https://github.com/unslothai/unsloth/pull/10384)) — across 48,216 `engine_stats` records from a Strix Halo bundle, llama-server's `/metrics` showed 0 tok/s during generation and occasionally impossible rates. Measurement fix rather than engine fix, but it will make future tuning decisions trustworthy.
- **Voice conversation mode + benchmark reconstructed** ([#10373](https://github.com/unslothai/unsloth/pull/10373), [#10374](https://github.com/unslothai/unsloth/pull/10374)) — parts A and B of PR #6527 rebuilt on current `main`, adding a voice conversation loop and a deterministic end-to-end voice-pipeline latency harness.

## Stability & Regressions
Ranked by severity:

1. **Late inference responses can be delivered to the wrong request** ([#10388](https://github.com/unslothai/unsloth/pull/10388), fix PR open) — cancelling a generation releases its mailbox before the worker finishes; a response for a different request then "falls through" and is returned to the currently-active request. Cross-request response contamination is a serious API-server correctness bug.
2. **Studio crashes when shutdown tears the server down mid model-load** ([#10369](https://github.com/unslothai/unsloth/pull/10369), fix PR open) — `'NoneType' object has no attribute 'poll'` in `llama_cpp.py` `_wait_for_health` during graceful shutdown.
3. **torchcodec/torch 2.11 mismatch on fresh NVIDIA installs** ([#7474](https://github.com/unslothai/unsloth/pull/7474), fix PR open since July) — the guard built to catch the mismatch stays quiet; PR pins torchcodec per torch minor and covers 2.11.
4. **Windows ROCm torch mislabeled as CPU in install logs** ([#10370](https://github.com/unslothai/unsloth/pull/10370), fix PR open) — the installer never names the llama.cpp backend, so a correct Vulkan setup is indistinguishable from a CPU fallback in logs, a recurring misdiagnosis source in bug reports.
5. **Open training blocker** ([#7203](https://github.com/unslothai/unsloth/issues/7203)) — Qwen3.5-9B never reaches the first training step; Gemma 4 26B A4B OOMs in QLoRA at batch size 1 on 96 GB VRAM. The only high-signal still-open issue in today's top list.
6. **Large stale-issue sweep** — nearly all top issues updated today are old reports (2024–2026) now `[CLOSED]` ([#4396](https://github.com/unslothai/unsloth/issues/4396), [#3553](https://github.com/unslothai/unsloth/issues/3553), [#4137](https://github.com/unslothai/unsloth/issues/4137), [#3996](https://github.com/unslothai/unsloth/issues/3996), etc.). If you have an issue that was closed without resolution, re-opening with a current reproduction is the path forward.

## What This Means for Application Developers
- **If you serve Unsloth Studio's llama.cpp endpoint in production, watch PR #10388 closely.** Cross-request response leakage after client cancellation is the kind of bug that produces intermittent, hard-to-debug wrong answers; this fix is a strong reason to track `main`.
- **Agentic chat semantics are being made durable** — tool-using turns will survive tab-close and be labeled "interrupted" rather than appearing failed ([#10365](https://github.com/unslothai/unsloth/pull/10365)). Voice mode is also on the way, so the conversation API surface will likely grow long-running/interruptible turn semantics.
- **AMD iGPU (Strix Halo) users should expect materially better out-of-box behavior**: Vulkan backend auto-selection, prompt-cache retention, and honest throughput telemetry remove real pain points for local-LLM-on-APU deployments.
- **Multi-user GPU boxes are becoming first-class**: per-account isolation plus the setup-token bootstrap change means anyone provisioning shared installs should plan for a credential-flow change on the next Studio update.
- The daily issue triage was unusually aggressive; treat today's many `[CLOSED]` flags as housekeeping, not necessarily fixes — verify against the linked PRs before upgrading expectations.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*