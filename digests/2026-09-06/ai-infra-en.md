# AI Infrastructure Digest 2026-09-06

> Generated: 2026-09-05 22:45 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — 2026-09-06

## 1. Ecosystem Overview

The ecosystem is defined by a new generation of hybrid state-space MoE architectures (Qwen3.x "Flash/Next", DeepSeek-V4-Flash, Kimi Linear/K3, GLM-5-class) outrunning the verification maturity of the runtimes serving them. The dominant correctness story is speculative decoding on these hybrids: both vLLM and SGLang carry open silent-corruption and token-loop bugs in MTP/EAGLE + prefix-cache paths, and SGLang's Kimi-K3 cross-prompt reasoning-leakage report is the kind of tenant-isolation defect that should make shared deployments cautious. The most consequential operational win in the window is SGLang's Weight Cache Daemon, which cuts per-rank weight load for Qwen3-235B-class FP8 models from ~306–327 s to under 1 s — a step-change in restart economics. Otherwise, no major capability release landed outside SGLang v0.5.19; llama.cpp shipped three patch releases, while vLLM, Ollama, LiteLLM, and Unsloth stayed in stabilization and hardening mode.

## 2. Activity Comparison

*Counts are distinct issues/PRs explicitly referenced in each 24-hour digest, not repo-wide totals (LiteLLM is the exception, reporting window totals). Digest curation favors severity and visibility, so treat these as lower bounds on real activity.*

| Project | Layer | Issues (referenced) | PRs (referenced) | Release status (24h) |
|---|---|---|---|---|
| vLLM | Serving engine | ~16 | ~11 | None; v0.28.0 in field with reported host-memory regression |
| SGLang | Serving engine | ~21 | ~15 | **v0.5.19 shipped** (786 PRs / 214 contributors cumulative) |
| llama.cpp | Local runtime | ~9 | ~19 | **3 patches: b10817–b10819** (SYCL tracing, SYCL FWHT restore, Metal leak) |
| Ollama | Local serving | ~11 | ~11 | None |
| LiteLLM | Gateway / router | 48 updated | 325 updated | None |
| Unsloth | Fine-tuning / Studio | ~16 | ~17 | None; channels at v0.1.806-beta / 2026.9.2 |

Takeaways: llama.cpp has the highest patch-release cadence; LiteLLM has the highest raw issue/PR churn, concentrated in spend accounting and router hardening; SGLang's cumulative release is the largest single artifact; vLLM's queue is dominated by correctness fixes rather than features.

## 3. Model Support Race

**SGLang is the only project that closed the loop on a major new model this window:** Qwen3.8 (2.4T-A95B) autoregressive support landed in v0.5.19 with cookbook and model-support tables. It is concurrently hardening Kimi Linear / NoPE-MLA FP8 prefill on B200/GB300 and added pure-Triton sparse MLA backends for ROCm — the clearest signal of where its datacenter-model roadmap points.

**vLLM merged zero new model/hardware support in the window.** Its frontier is enabling *existing* next-gen models on older/lower-cost hardware: Qwen3.5-122B-A10B fused-MoE tuning on A100 at TP=2 (open PR), plus still-open requests for DeepSeek-V4-Flash on SM8x Ampere and RDNA4/gfx1201 FP8 upstreaming.

**llama.cpp** in-flight work covers DFM Mimir 1B (HrmTextForCausalLM, open PR) and a merge-ready Hy4-preview conversion refactor; nothing shipped. **Ollama** has no merged model support, with meaningful WIP on the MLX side: static YaRN context scaling for Qwen3.5/3.8 RoPE/M-RoPE and legacy glm-OCR GGUF end-of-generation fixes. **LiteLLM** is model-agnostic by design; closest items are Cohere Parse OCR config and a Switchyard capability classifier. **Unsloth** is tracking the Qwen3.8 ecosystem from the fine-tuning side (sampling defaults by reasoning mode; investigating Flash-Next GGUF MTP loading failures), with Voxtral remaining the most-upvoted open request.

**Bottom line:** SGLang leads on fresh datacenter-scale model enablement; llama.cpp and Ollama move at a slower cadence for local/quantized models; vLLM is the reference target for hybrid-model *correctness*, but not for new-model speed this window.

## 4. Performance Frontier

Optimization effort splits across five fronts:

- **KV cache / context memory.** vLLM sees a patch claiming ~2× usable KV pool on GB10 by wiring the missing FP8 e4m3 read path for Qwen3.8-Flash-Next (awaiting corroboration). llama.cpp still silently falls back to CPU FlashAttention for unsupported KV cache types (up to ~8× prefill drop). Ollama is chasing an unbounded ~8 GiB/runner host-RAM prompt cache and MLX prefix-cache truncation to 8192-token multiples (17–27 s re-prefill tax). Unsloth is pushing KV-cache preemption into llama-server so parallel Studio chats share one cache.
- **Quantization kernels.** vLLM's W8A8 decode regression remains open and traced to the kernel itself. llama.cpp is the most active on quantized decode: Vulkan IQ4_XS dedicated shaders deliver +6–17% token generation on RDNA4, plus TQ2_0 ARM GEMM proposals. Ollama serves a cautionary data point: low-bit Qwen2.5-Coder-3B artifacts score 0/15 on code smoke tests while sibling quants score 87–100%.
- **Engine recovery and host-memory hygiene.** SGLang's Weight Cache Daemon (per-rank CUDA IPC weight serving) is the single most impactful ops improvement in the digest. vLLM has a PR to release pinned host memory after sleep/wake instead of holding a weight-sized RAM block for process lifetime.
- **Distributed serving on new silicon.** SGLang is closing the Blackwell unified-memory decode-CP gap (1.96% behind static pool on B300, Kimi-Linear at TP2/DCP2). vLLM has a fix PR for NIXL disaggregation segfaults after prefill-pod restart; llama.cpp has an open ROCm RPC server crash on TOP_K during distributed Qwen3.8-Flash-Next inference.
- **Speculative decoding and scheduling.** Effort here is correctness-first, not speed-first: vLLM PRs target per-request spec-decode block indexing, hybrid-state recovery across speculative batches, and prefill misdispatch into spec-decode CUDA graphs. SGLang removes CPU sync by keeping sampling masks on GPU and pins benchmark timing semantics (`itl` per stream event, not per token); vLLM is normalizing TTFT/TPOT across serving endpoints.

## 5. Layer Positioning

- **vLLM / SGLang — serving engines.** Both target datacenter serving with continuous batching, prefix caching, speculative decoding, and PD disaggregation. SGLang is moving faster on release cadence, distributed collectives (deepep_v2, DSA), and Blackwell enablement; vLLM competes on ecosystem breadth and is currently absorbing the correctness debt of hybrid architectures across more model families.
- **llama.cpp — local runtime bedrock.** CPU/GPU kernels, GGUF quantization, grammar/structured output. No serving management or gateway; all optimization happens at kernel and backend-ops level. It is the shared substrate beneath Ollama and Unsloth Studio.
- **Ollama — local serving product.** Wraps llama.cpp and MLX runners with model registry, launcher/context alignment, and device/RAM accounting. Its digest concerns are exactly what a productized wrapper inherits: context-window mismatches, memory caps invisible to accounting, and model-artifact quality.
- **LiteLLM — control-plane gateway.** No kernels, no model execution; routing, budgets, spend logs, entitlements. Its 325-PR churn is almost entirely enterprise reliability: budget resets, spend-log collisions, router priors, and streaming fidelity.
- **Unsloth — fine-tuning layer with an inference front-end.** Differentiates on Triton kernel coverage for training and RL (GRPO, SAO in review), while Studio's serving side reuses llama-server — placing it at the convergence point of fine-tuning and local inference.

Watch the overlap zones: Ollama and Unsloth both wrap llama.cpp and will inherit its regressions; LiteLLM fronts vLLM/SGLang/Ollama and is where engine-level bugs become application-visible (e.g., streaming tool-call mangling).

## 6. Trend Signals

- **Hybrid models + speculative decoding are a fail-dangerous class.** Silent wrong outputs, constant-token loops, and illegal memory access across vLLM and SGLang — all in the same GDN/Mamba/MTP interaction space. If you serve Qwen3-class hybrids with EAGLE/MTP and prefix caching, run regression suites per rollout, and consider disabling speculative decoding for stateful hybrids until the fix clusters land.
- **Restart economics just changed.** A 306–327 s weight load dropping to <1 s (SGLang Weight Cache Daemon) makes scale-to-zero, rolling upgrades, and fast failure recovery viable for 200B+-class FP8 deployments. Expect this pattern to propagate to vLLM; plan for per-rank CUDA IPC daemon lifecycle management.
- **Host-RAM governance lags VRAM accounting.** vLLM holding a weight-sized pinned block after one sleep cycle, Ollama consuming ~8 GiB/runner invisibly via llama-server prompt cache, SGLang double-charging HiCache host memory for co-located ranks — all in one day. Track RSS, not just VRAM, for long-lived runners.
- **Agent correctness moves up the stack.** The most damaging bugs are no longer token-level but history-level: Ollama's `</think>` trimming that produced a 31M-token tool-call loop, LiteLLM's streaming re-chunker dropping `tool_calls[].id`/`function.name`, and vLLM leaking the `strict` flag into the model-visible template. Rule for application developers: never rewrite or trim assistant history client-side, and validate that tool-call identity survives the gateway before trusting streaming agents.
- **Multi-tenant isolation needs explicit gates.** SGLang's Kimi-K3 cross-prompt reasoning-leakage report and LiteLLM's A2A permission bypass both argue for tenant isolation on newer models until the trackers close. Do not serve bleeding-edge hybrid models in shared contexts.
- **Quantization is fragmenting into silent correctness risk.** FP8 KV cache corruption on Qwen-VL, skipped NVFP4 layers serving garbage, W8A8 slower than FP16, broken low-bit code-model artifacts — all without errors raised. Put a task-level validation suite (not perplexity) in front of any quantized deployment, and pin versions when you find a working combination.
- **Non-NVIDIA acceleration is diverging by vendor.** RDNA4 gets real Vulkan decode gains in llama.cpp while AMD ROCm RPC crashes remain open; Intel Arc and Windows-on-ARM NVIDIA (GB10) support are one-off patches; MLX context enforcement is still landing. Multi-accelerator deployments need per-backend verification, not a single binary assumption.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-06

## 1. Today's Highlights

No new vLLM release landed in the last 24h. The active PR queue is dominated by correctness fixes for hybrid GDN/Mamba models under MTP/EAGLE speculative decoding and prefix caching — the root cause class behind silent wrong outputs, constant-token loops, and illegal memory access reports. Two high-visibility threads remain open upstream: SM8x/Ampere support for DeepSeek-V4-Flash ([#50576](https://github.com/vllm-project/vllm/issues/50576)) and RDNA4/gfx1201 FP8 enablement for ROCm ([#28649](https://github.com/vllm-project/vllm/issues/28649)).

## 2. Releases & Breaking Changes

None. No releases were published in the last 24h, and no API/config migration notes appeared in the feed.

## 3. New Model & Hardware Support

No new model/hardware support was merged in the last 24h.

Notable in-progress work and open requests:

- Open PR: tuned fused-MoE Triton config for NVIDIA A100 80GB PCIe, targeting Qwen3.5-122B-A10B MoE shapes at TP=2 ([PR #55511](https://github.com/vllm-project/vllm/pull/55511)).
- Open PR: CPU/macOS fallback for `MambaHybridModelState.batch_memcpy` when Triton is unavailable, fixing hybrid Mamba model crashes on CPU ([PR #55480](https://github.com/vllm-project/vllm/pull/55480)).
- Open PR: make encoder-only/embedding backend selection ignore global `--kv-cache-dtype`, fixing encoder-only serving when a KV cache dtype is configured ([PR #55482](https://github.com/vllm-project/vllm/pull/55482)).
- Open feature request: DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731 cannot run on SM8x Ampere GPUs ([#50576](https://github.com/vllm-project/vllm/issues/50576)).
- Open feature request: MiniCPM-SALA model support ([#41641](https://github.com/vllm-project/vllm/issues/41641)).
- Open feature request: upstream RDNA4/gfx1201 FP8 patch for `vllm-rocm` ([#28649](https://github.com/vllm-project/vllm/issues/28649)).

## 4. Performance & Optimization

- **A100 fused-MoE tuning**: Open PR adds a tuned fused-MoE Triton configuration for A100 80GB PCIe at `E=256, N=512`, BF16, relevant for Qwen3.5-122B-A10B on TP=2 ([PR #55511](https://github.com/vllm-project/vllm/pull/55511)).
- **FP8 KV cache on Qwen3.8-Flash-Next**: A contributor reports wiring up the missing fp8_e4m3 read path in the QSA Triton kernels roughly doubles the usable KV pool versus BF16 on GB10. Patch is currently single-machine and awaiting corroboration ([#54426](https://github.com/vllm-project/vllm/issues/54426)).
- **W8A8 decode regression remains open**: llmcompressor W8A8 decoding is slower than FP16; Perfetto traces point at the W8A8 kernel itself ([#38697](https://github.com/vllm-project/vllm/issues/38697)).
- **Benchmark consistency**: Open PR fixes TTFT/TPOT accounting so streaming latency statistics are consistent across serving endpoints ([PR #55508](https://github.com/vllm-project/vllm/pull/55508)).
- **Host memory after sleep/wake**: Open PR optionally releases pinned host memory after `wake_up`, preventing vLLM from holding a weight-sized host RAM block for the process lifetime after one sleep cycle ([PR #55206](https://github.com/vllm-project/vllm/pull/55206)).

## 5. Stability & Regressions

Ranked roughly by severity:

- **Hybrid GDN/Mamba + prefix caching + MTP still corrupts output in v0.28.0** ([#53912](https://github.com/vllm-project/vllm/issues/53912)). Related reports include silent prefix-cache disablement with MTP/dflash ([#54360](https://github.com/vllm-project/vllm/issues/54360)), prompt-independent constant-token loops, and MTP acceptance collapse ([#55357](https://github.com/vllm-project/vllm/issues/55357)).
- **New v0.28.0 startup regression**: One report says v0.28.0 consumes all host memory at process start and freezes, while v0.27.1 works on the same host ([#54237](https://github.com/vllm-project/vllm/issues/54237)).
- **Illegal memory access in hybrid Mamba prefix-cache resume**: `MambaHybridModelState.add_request` seeds the align state with the wrong block size ([#53142](https://github.com/vllm-project/vllm/issues/53142)). A direct fix is open in [PR #55507](https://github.com/vllm-project/vllm/pull/55507).
- **Mamba spec-decode block indexing bug**: With pipeline parallelism + MTP + prefix caching, open fix moves spec-decode block table lookup from batch row to per-request slot to avoid degenerate token loops ([PR #55506](https://github.com/vllm-project/vllm/pull/55506)).
- **GDN state recovery across mixed speculative batches**: Open PR addresses state loss when a request transitions from speculative decoding to regular decode in a mixed batch ([PR #55504](https://github.com/vllm-project/vllm/pull/55504)).
- **Prefill misdispatch into spec-decode CUDA graph**: A prefill batch can be misclassified as uniform decode and dispatched into a spec-decode full CUDA graph, causing silent state loss on hybrid models ([#53051](https://github.com/vllm-project/vllm/issues/53051)).
- **NIXL disaggregation segfault**: Decode instances segfault in `loadRemoteMD` after a prefill pod restart ([#49238](https://github.com/vllm-project/vllm/issues/49238)). A fix for invalidated NIXL pull-peer metadata is open ([PR #55471](https://github.com/vllm-project/vllm/pull/55471)).
- **FP8 KV cache correctness**: `kv_cache_dtype="fp8_e5m2"` silently corrupts output on Qwen-VL / Qwen2.5-VL with default scaling ([#41343](https://github.com/vllm-project/vllm/issues/41343)).
- **Tool-calling correctness bugs**: OpenAI `strict` flag leaks into the model-visible chat template ([#52741](https://github.com/vllm-project/vllm/issues/52741)); Gemma4 parser drops bare `<|tool_call>` openers ([#53431](https://github.com/vllm-project/vllm/issues/53431)); Qwen2.5 parser fails when OpenAI content format is used ([#54491](https://github.com/vllm-project/vllm/issues/54491)).
- **Stop-token truncation inconsistency**: `include_stop_str_in_output=False` did not apply to stop token IDs; fix is open ([PR #55483](https://github.com/vllm-project/vllm/pull/55483)).
- **NVFP4 silent weight-skip risk**: All-zero `weight_scale` after loading means FP4 weights were skipped. Open PR makes vLLM fail fast instead of serving garbage ([PR #52501](https://github.com/vllm-project/vllm/pull/52501)).

## 6. What This Means for Application Developers

- **Be careful with hybrid GDN/Mamba models + speculative decoding today.** If you serve Qwen3.x “Flash/Next”-style hybrid models with MTP/EAGLE and prefix caching, verify outputs in regression tests before trusting a rollout. Follow [PR #55506](https://github.com/vllm-project/vllm/pull/55506), [PR #55507](https://github.com/vllm-project/vllm/pull/55507), and [PR #55504](https://github.com/vllm-project/vllm/pull/55504) — they directly target this failure class.
- **Pin versions carefully.** v0.28.0 may carry a host-memory startup regression on some environments ([#54237](https://github.com/vllm-project/vllm/issues/54237)); v0.27.1 was reported working in that case.
- **Do not treat `strict` tool calling as transparent.** The `strict` flag changes what the model sees, and several vendor parsers remain buggy. Test tool-calling paths per model parser.
- **Watch for silent correctness failures from quantization/KV cache settings.** FP8 KV cache on Qwen-VL ([#41343](https://github.com/vllm-project/vllm/issues/41343)) and skipped NVFP4 BF16 layers ([PR #52501](https://github.com/vllm-project/vllm/pull/52501)) can corrupt output without raising an error. Fail-fast validation is worth adding on your side until those fixes land.
- **Benchmark numbers need normalization.** TTFT/TPOT definitions are only now being made consistent across endpoints; cross-endpoint latency comparisons should account for the current discrepancy fixed by [PR #55508](https://github.com/vllm-project/vllm/pull/55508).

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-06

## 1. Today's Highlights
SGLang shipped **v0.5.19**, a broad cumulative release spanning **786 PRs from 214 contributors**, headlined by support for **Qwen3.8 (2.4T-A95B)**. On the operational side, the Fast Engine Recovery roadmap reports that Phase 1 of the Weight Cache Daemon cuts per-rank weight load for Qwen3-235B FP8 from ~306–327 s to under 1 s ([#33522](https://github.com/sgl-project/sglang/issues/33522)). Current upstream focus is split between stabilizing Kimi Linear / NoPE-MLA FP8 prefill on `tokenspeed_mla` ([#38149](https://github.com/sgl-project/sglang/pull/38149), [#38158](https://github.com/sgl-project/sglang/pull/38158)), closing the Blackwell unified-memory decode-CP gap ([#37926](https://github.com/sgl-project/sglang/pull/37926)), and two unresolved memory/correctness issues: an NVFP4 Marlin fallback leak and a Kimi-K3 cross-prompt leakage report.

## 2. Releases & Breaking Changes
- **[v0.5.19](https://github.com/sgl-project/sglang/releases/tag/v0.5.19)** — Cumulative release (786 PRs / 214 contributors). Adds the Qwen3.8 cookbook/model-support table. The release notes do not flag explicit CLI/API breaking changes; given the PR span, validate sampling and attention-related flags when upgrading from older v0.5.x pins.
- **Prefill-CP v1 deprecation in progress** — [PR #36228](https://github.com/sgl-project/sglang/pull/36228) ("CP V1 Deprecation 3/5") removes the generic prefill-CP v1 runtime and the DSA v1 in-seq-split indexer/backend path, while preserving input sharding and token-ID layout handoff at the runner boundary. Teams relying on prefill-CP v1 should follow the migration toward attention-side CP and the current overlap scheduling work.
- **Rust migration RFC still open** — [Issue #23206](https://github.com/sgl-project/sglang/issues/23206) proposes moving non-GPU SGLang processes to Rust. Not breaking today, but signals where the control plane is heading.

## 3. New Model & Hardware Support
- **Qwen3.8 (2.4T-A95B), autoregressive** — new in v0.5.19; see the [cookbook](https://docs.sglang.io/cookbook) and [PR #35758](https://github.com/sgl-project/sglang/pull/35758).
- **Kimi Linear / NoPE MLA hardening** — [PR #38149](https://github.com/sgl-project/sglang/pull/38149) adds skip-RoPE `tokenspeed_mla` prefill support; [PR #38158](https://github.com/sgl-project/sglang/pull/38158) fixes FP8 prefill for NoPE MLA layers. Both target the Kimi Linear architecture on B200/DGX-Blackwell.
- **AMD/ROCm sparse MLA** — [PR #30575](https://github.com/sgl-project/sglang/pull/30575) adds pure-Triton sparse MLA prefill/decode backends (`--dsa-prefill-backend triton`, `--dsa-decode-backend triton`) for the FP8 DSA path on ROCm.
- **deepep_v2 BF16 checkpoints** — [PR #38160](https://github.com/sgl-project/sglang/pull/38160) removes the hard requirement that `--moe-a2a-backend deepep_v2` only accepts 128×128 blockwise FP8 experts, enabling BF16 communication.
- **SM89/Ada:** The request to add SM89/L20 support for DeepSeek-V4-Flash-FP8 was closed as inactive ([#28618](https://github.com/sgl-project/sglang/issues/28618)); Ada support remains downstream-patched unless the issue is reopened.

## 4. Performance & Optimization
- **Fast Engine Recovery — Weight Cache Daemon** ([#33522](https://github.com/sgl-project/sglang/issues/33522)): Phase 1 landed via [#27139](https://github.com/sgl-project/sglang/pull/27139). A per-rank daemon holds post-quantized weights and serves them over CUDA IPC, reducing Qwen3-235B FP8 weight load from ~306–327 s to **<1 s**. This is the most consequential serving-ops improvement in the current cycle.
- **Blackwell unified-memory decode-CP gap** ([PR #37926](https://github.com/sgl-project/sglang/pull/37926)): the Hopper fix did not carry over to B300; the unified pool ran **1.96% behind the static pool** on Kimi-Linear at TP2/DCP2 with `cutedsl_mla`. PR closes that gap.
- **Sampling masks + overlap scheduling** ([PR #36631](https://github.com/sgl-project/sglang/pull/36631)): removes CPU synchronization by keeping sampling-mask outputs on the GPU inside the sampler.
- **TRTLLM all-reduce precision** ([PR #36143](https://github.com/sgl-project/sglang/pull/36143)): uses FP32 all-reduce buffers (work in progress).
- **Scheduler/sampling/streaming overhead audit** ([Issue #36226](https://github.com/sgl-project/sglang/issues/36226)): an automated refactoring review identifies potentially avoidable overhead in scheduler, sampling, and streaming paths — useful as a candidate list for profiling.
- **Benchmark timing semantics pinned** ([PR #37973](https://github.com/sgl-project/sglang/pull/37973)): codifies that `itl` is recorded per stream *event*, not per token — important when comparing benchmark-vs-engine throughput numbers.
- **Diffusion tuning guidance** ([PR #38148](https://github.com/sgl-project/sglang/pull/38148)): per-model tuning decision table derived from B300/GB300 profiling (`--warmup-mode`, breakable CUDA graphs, layerwise offload).
- **Needs tuning work:** DSv4 top-k v2 cooperative-cluster launch parameters remain hardcoded B200-derived `constexpr` values with no autotune path ([#37150](https://github.com/sgl-project/sglang/issues/37150)).

## 5. Stability & Regressions
Ranked by severity; fixes noted where they exist.

1. **Kimi-K3 cross-prompt reasoning leakage** ([#34259](https://github.com/sgl-project/sglang/issues/34259)) — severe isolation/correctness bug for multi-tenant use; no fix PR yet. Related Kimi-K3 crash ([#34260](https://github.com/sgl-project/sglang/issues/34260)) is closed, but the master tracker ([#32970](https://github.com/sgl-project/sglang/issues/32970)) still lists open items.
2. **NVFP4 MoE Marlin fallback memory leak** ([#38074](https://github.com/sgl-project/sglang/issues/38074)) — leaks ~0.66 GiB/layer via a retained `{fqn: tensor}` registry; OOMs on ≤48 GB cards (L20) with Qwen3.8-Flash-Next-class FP4 checkpoints. No fix PR yet.
3. **MiniMax-M3 W4A16 produces all-NUL tokens on sm_121** ([#38143](https://github.com/sgl-project/sglang/issues/38143)) — on 2× DGX Spark (TP=2) via the Triton MiniMaxSparse path, every token is id 0; the same weights work on vLLM. Not yet re-tested on v0.5.19.
4. **Scheduler OOM during weight load** ([#37931](https://github.com/sgl-project/sglang/issues/37931)) — DeepSeek-V4-Flash-Vision on 2× DGX Spark is OOM-killed during FP8→FP4 MoE conversion; reproducible across five launches on the official dev image.
5. **GLM-5-NVFP4 + EAGLE crash on B300** ([#25563](https://github.com/sgl-project/sglang/issues/25563)) — dispatches an sm100f kernel via TRTLLM batched GEMM at bs=128 draft graph capture. Regression: v0.5.12-cu130 crashes, v0.5.11 works.
6. **HiCache host-memory sizing double-charges co-located ranks** ([#38156](https://github.com/sgl-project/sglang/issues/38156)) — fix in flight: [PR #38157](https://github.com/sgl-project/sglang/pull/38157) reads host memory once per TP group before budget splitting.
7. **NGRAM cached misses after trie growth** ([#38129](https://github.com/sgl-project/sglang/issues/38129)) — stale NGRAM drafts when insertion makes a previously missing suffix available; fix in [PR #38130](https://github.com/sgl-project/sglang/pull/38130).
8. **CI: Kimi Linear `tokenspeed_mla` FP8 NoPE failures** — three B200 jobs failing on main ([#38158](https://github.com/sgl-project/sglang/pull/38158) is the fix).
9. **CI/infra hygiene:** the auto-collected CUDA coredump tracker ([#26340](https://github.com/sgl-project/sglang/issues/26340)) remains the best signal for crash regressions (293 events); the HiCache radix-cache livelock test ([#38019](https://github.com/sgl-project/sglang/issues/38019)) was closed; AMD PR-test collection still has import-time crash failures ([#37451](https://github.com/sgl-project/sglang/issues/37451)).
10. **Stale-bot cleanup:** many June–July reports were closed as inactive this cycle — including DeepSeek-V4 PD TTFT regression ([#30084](https://github.com/sgl-project/sglang/issues/30084)), GLM-5.2-FP8 shape error ([#30037](https://github.com/sgl-project/sglang/issues/30037)), PD decode garbage after aborted prefill ([#30233](https://github.com/sgl-project/sglang/issues/30233)), and Mooncake rdma+hip instability ([#30190](https://github.com/sgl-project/sglang/issues/30190)). If still reproducible on v0.5.19, reopen with a repro.

## 6. What This Means for Application Developers
- **Upgrade to v0.5.19 for new-model support**, but pin v0.5.11/v0.5.18 for GLM-5-NVFP4 + EAGLE on B300 and MiniMax-M3 W4A16 on DGX Spark until the corresponding fixes land upstream.
- **Weight Cache Daemon changes the economics of large-model restarts.** A ~5-minute weight load dropping to <1 s makes rapid scale-down/scale-up, rolling upgrades, and failure recovery viable for Qwen3-235B-class FP8 deployments — plan for the per-rank CUDA IPC daemon lifecycle.
- **Do not serve Kimi-K3 in shared/multi-tenant contexts yet** given the cross-prompt reasoning leakage report; isolate tenants or gate the model until the bug is resolved in the tracker ([#32970](https://github.com/sgl-project/sglang/issues/32970)).
- **Watch VRAM carefully on ≤48 GB GPUs** when serving NVFP4 MoE checkpoints that fall back to Marlin — the ~0.66 GiB/layer leak will eventually OOM; monitor per-layer RSS and consider a pre-fix pin or disabling the fallback path.
- **If you use NGRAM speculative decoding (BFS/PROB),** wait for [PR #38130](https://github.com/sgl-project/sglang/pull/38130) before relying on newly inserted longer contexts to generate drafts.
- **PD-disaggregation users:** prefill→decode failure notification is being unified across Mooncake/NIXL/Mori ([PR #36612](https://github.com/sgl-project/sglang/pull/36612)); until then, NIXL transfers can silently wait up to the 300 s default timeout.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-06

## Today's Highlights

Three patch releases landed in the last 24h: b10817 added SYCL memory allocation tracing, b10818 restored SYCL Kronecker/FWHT support and fixed the backend-ops CI break, and b10819 fixed a Metal early-return memory leak. On the performance side, Vulkan IQ4_XS kernel work reports **+6-17% token-gen gains on RDNA4**, and several CUDA correctness fixes are in review. Higher-severity regressions remain open around Blackwell SOFT_MAX crashes, ROCm RPC TOP_K failures, and RDNA4/FLASH-ATTN prompt-processing performance.

## Releases & Breaking Changes

- **b10819** — Metal: fix memory leak in early return ([#28399](https://github.com/ggml-org/llama.cpp/pull/28399))
- **b10818** — SYCL: fix test-backend-ops CI break; restore Kronecker product FWHT support ([#28254](https://github.com/ggml-org/llama.cpp/pull/28254), [#28016](https://github.com/ggml-org/llama.cpp/issues/28016))
- **b10817** — SYCL: attribute device allocations by site via `GGML_SYCL_MEMTRACE` ([#27631](https://github.com/ggml-org/llama.cpp/pull/27631))

No breaking user-facing API or config changes were identified in these releases. The SYCL memory-trace variables are additive.

## New Model & Hardware Support

- Open PR adds `HrmTextForCausalLM` / DFM Mimir 1B support ([#27625](https://github.com/ggml-org/llama.cpp/pull/27625))
- Hy4-preview conversion refactor is merge-ready, moving HC tensor mapping into the global tensor map ([#28451](https://github.com/ggml-org/llama.cpp/pull/28451))
- Backend/hardware enablement:
  - HIP: missing AMD GCN MMQ config added to avoid RDNA2 fallback ([#27841](https://github.com/ggml-org/llama.cpp/pull/27841))
  - OpenCL: fixes for abort paths exposed on Adreno GPUs ([#27630](https://github.com/ggml-org/llama.cpp/pull/27630))
  - Windows: search backend DLL directory for dependencies to fix error 126 on explicit backend loads ([#28010](https://github.com/ggml-org/llama.cpp/pull/28010))

## Performance & Optimization

- **Vulkan IQ4_XS decode kernels**:
  - Dedicated `mul_mat_vec_iq4_xs` dmmv shader replacing generic fallback: ~**+6-17% token generation on RDNA4** depending on model ([#28426](https://github.com/ggml-org/llama.cpp/pull/28426))
  - IQ4_XS MMQ/MMV matmul kernels avoiding slow generic float-conversion path ([#28415](https://github.com/ggml-org/llama.cpp/pull/28415))
- **Vulkan small-M optimization for Qwen-shaped workloads**: supports m=1 by swapping A/B and improves tile-size selection / split_k for small M ([#28457](https://github.com/ggml-org/llama.cpp/pull/28457))
- **Metal**: added `fa-vec` tuning rows for M2 Max across Q4_0/Q4_1/Q5_0/Q5_1 ([#28458](https://github.com/ggml-org/llama.cpp/pull/28458))
- **CPU**: TQ2_0 x Q8_K tiled prefill kernel proposed for `llamafile_sgemm` ([#28452](https://github.com/ggml-org/llama.cpp/pull/28452)); TQ2_0 8x8 blocked GEMM with i8mm/SMMLA added for ARM ([#27589](https://github.com/ggml-org/llama.cpp/pull/27589))
- **MTP**: PR serializes multi-ubatch decode execution, targeting whole-host lock issues during MTP prefill ([#26827](https://github.com/ggml-org/llama.cpp/pull/26827))
- **SYCL**: performance tuning for Gemma 4 26B A4B FlashAttention shapes, including a missing GQA dispatch case at D=512 ([#28450](https://github.com/ggml-org/llama.cpp/pull/28450))

## Stability & Regressions

Open or in-review issues ranked by severity:

- **Blackwell CUDA SOFT_MAX crash** — open on RTX 5090 / large-model workloads; no confirmed merged fix yet ([#25060](https://github.com/ggml-org/llama.cpp/issues/25060))
- **ROCm RPC server crash on TOP_K** — “invalid configuration argument” during distributed Qwen3.8-Flash-Next inference ([#27865](https://github.com/ggml-org/llama.cpp/issues/27865))
- **qwen4exp multi-segment prompt regression** — deterministic `//////` generation on gfx1151 when using multi-segment prompts ([#27797](https://github.com/ggml-org/llama.cpp/issues/27797))
- **Metal Gemma 4 E4B Q8_0 decode regression** — ~13% slower decode between b9730 and b10219; Qwen models unaffected ([#26470](https://github.com/ggml-org/llama.cpp/issues/26470))
- **Windows OpenVINO builds fail on startup** — missing OpenSSL / `openvino.dll` / `tbb12.dll` packaging issue ([#24729](https://github.com/ggml-org/llama.cpp/issues/24729))
- **CUDA FlashAttention silent CPU fallback** — unsupported KV cache types with `-fa` cause attention to run on CPU, up to ~8x prefill drop; PR adds a `LOG_WARN` ([#28456](https://github.com/ggml-org/llama.cpp/pull/28456))
- **CUDA correctness fixes in review**:
  - Fix divergent block-wide barrier in f16 FA kernel ([#27870](https://github.com/ggml-org/llama.cpp/pull/27870))
  - Fix CUB `argsort` corruption caused by in-place keys aliasing CUB’s internal buffers ([#28389](https://github.com/ggml-org/llama.cpp/pull/28389))
- **Grammar/structured-output defects** — still open around invalid GBNF from nested `maxLength` and empty-object schemas ([#25746](https://github.com/ggml-org/llama.cpp/issues/25746), [#25923](https://github.com/ggml-org/llama.cpp/issues/25923)); `common_peg_until_parser` also reports SUCCESS when a final-parse delimiter never appears ([#27772](https://github.com/ggml-org/llama.cpp/issues/27772))

## What This Means for Application Developers

- **Run the latest patch release if you use Metal**: b10819 contains a memory-leak fix on an early-return path.
- **If you use FlashAttention on CUDA**, be aware that unsupported KV cache types such as `q5_0/q5_1/q4_1` can silently fall back to CPU attention. Once [#28456](https://github.com/ggml-org/llama.cpp/pull/28456) lands it will be logged, but until then validate that FA is actually running on GPU.
- **Tool-call/structured-output users should still pre-validate JSON schemas.** Several grammar-generator edge cases can reject valid requests with `failed to parse grammar`, especially around large nested `maxLength` constraints and empty-object schemas.
- **AMD/ROCm and RDNA4 deployments need benchmarking at deep context.** The ROCm RPC TOP_K crash and prior RDNA4 native-MMA-FA regression reports are reason to verify long-context prompt processing before rolling out distributed Qwen-class models.
- **Windows embedders using explicit backend paths** should keep all dependent DLLs side-by-side with backend DLLs or wait for the DLL search-path fix in [#28010](https://github.com/ggml-org/llama.cpp/pull/28010).

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-06

**Source snapshot:** github.com/ollama/ollama

## 1. Today's Highlights

No Ollama release tag landed in the last 24 hours. The most meaningful activity is a coordinated set of PRs fixing context-length handling across launchers and the MLX runner, plus PRs that address memory runaway and tool-calling correctness bugs. On the issue tracker, the dominant themes are agent-loop failures caused by leaked reasoning tokens, out-of-bounds host RAM from llama-server’s prompt cache, and broken low-bit quantization artifacts.

## 2. Releases & Breaking Changes

- **None in the last 24h.** No release tags, migration notes, or public API/config changes to report.

## 3. New Model & Hardware Support

No user-facing model/backend release shipped in this window. In-flight work worth tracking:

- **MLX runner Qwen static YaRN context support** — [PR #18263](https://github.com/ollama/ollama/pull/18263) adds YaRN frequency/attention scaling for Qwen3.5/3.8 text RoPE and multimodal M-RoPE, allowing contexts up to `factor * original_max_position_embeddings`.
- **Legacy glm-OCR GGUF compatibility** — [PR #17195](https://github.com/ollama/ollama/pull/17195) registers `<|user|>` as an end-of-generation token for legacy `glmocr` GGUFs, fixing runaway repeated output.
- **Single-GPU VRAM prediction, WIP** — [PR #18198](https://github.com/ollama/ollama/pull/18198) proposes predicting VRAM from published head dimensions and measured loads to improve scheduler decisions.

## 4. Performance & Optimization

- **llama-server prompt cache consumes ~8 GiB host RAM per runner with no bound** — [Issue #18264](https://github.com/ollama/ollama/issues/18264). llama.cpp’s default `--cache-ram` is **8192 MiB**; a fully GPU-offloaded model can still hold 8 GiB of system RAM, outside Ollama’s accounting. Fix PR: [PR #18265](https://github.com/ollama/ollama/pull/18265) introduces an `OLLAMA_CACHE_RAM` cap.
- **MLX prefix-cache restore is truncated to multiples of 8192 tokens** — [Issue #18267](https://github.com/ollama/ollama/issues/18267). Up to 8191 tokens can be re-prefilled after a cold prompt, costing a fixed **17–27 seconds** on agent workloads. Open as of this digest.
- **Context alignment work for launchers** — [PR #18259](https://github.com/ollama/ollama/pull/18259) aligns Codex CLI’s catalog with Ollama’s verified runtime context instead of a 128K fallback; [PR #18258](https://github.com/ollama/ollama/pull/18258) does the same for Qwen Code, preventing it from assuming a 1,000,000-token default when Ollama is actually running a smaller context.
- **MLX runner now enforces requested context** — [PR #18261](https://github.com/ollama/ollama/pull/18261) passes the scheduler-selected `num_ctx` into the MLX subprocess and reports effective context back to `/api/ps`.

## 5. Stability & Regressions

Ranked by practical severity:

- **Critical: `</think>` leak causes 31M-token agentic tool-call loop** — [Issue #17617](https://github.com/ollama/ollama/issues/17617). `deepseek-v4-flash:cloud` leaked a literal `</think>` into assistant history, causing Claude Code to issue 193 identical tool calls. Fix PR: [PR #18260](https://github.com/ollama/ollama/pull/18260) stops `deepseek3.go` from trimming replayed assistant history at the first literal `</think>`.
- **High: Host RAM grows by ~8 GiB per runner due to llama-server prompt cache** — [Issue #18264](https://github.com/ollama/ollama/issues/18264). Not visible to Ollama memory accounting and not configurable until [PR #18265](https://github.com/ollama/ollama/pull/18265) merges.
- **High: MLX runner ignores `num_ctx`, causing Metal watchdog panic on long prefill** — [Issue #18125](https://github.com/ollama/ollama/issues/18125). Fix PR: [PR #18261](https://github.com/ollama/ollama/pull/18261).
- **High: Low-bit Qwen2.5-Coder-3B library artifacts are functionally broken** — [Issue #18252](https://github.com/ollama/ollama/issues/18252). `q2_K`, `q3_K_S`, `q3_K_M`, `q3_K_L` score **0/15** on code smoke tests while sibling quantizations score 87–100%.
- **Medium: macOS GPU reset leaves runner in a broken Metal state** — [Issue #18213](https://github.com/ollama/ollama/issues/18213). `/api/generate` returns HTTP 200 with an empty response until restart.
- **Medium: Windows CUDA discovery crash on GTX 1080 Ti** — [Issue #16957](https://github.com/ollama/ollama/issues/16957). `0xc0000005` at process start; open with 13 comments.
- **Medium: Anthropic `/v1/messages` fails to parse tool schemas containing `\/` or `\-` inside array items** — [Issue #18226](https://github.com/ollama/ollama/issues/18226). Returns HTTP 400 `failed to parse grammar`. Fix PR: [PR #18248](https://github.com/ollama/ollama/pull/18248) normalizes escaped pattern literals before forwarding to llama-server.
- **Medium: Gemma3 structured output truncates on double-quoted terms** — [Issue #18094](https://github.com/ollama/ollama/issues/18094). Responses stop early via `done_reason: "stop"` with very low `eval_count`.
- **Medium: Tool-call parser false positives / malformed tool arguments** — [Issue #17602](https://github.com/ollama/ollama/issues/17602) reports the Laguna parser misclassifying ordinary JSON content as tool calls; [Issue #17882](https://github.com/ollama/ollama/issues/17882) reports Gemma4 emitting `key=value` tool arguments that fail parsing.
- **Medium: Shared model option cache can be mutated by request-local options** — Fix PR: [PR #18253](https://github.com/ollama/ollama/pull/18253) deep-clones cached model options to prevent cross-request contamination.

## 6. What This Means for Application Developers

- **Do not trust client-side context defaults.** The launcher bugs in Codex and Qwen Code show that the advertised context window can exceed or diverge from Ollama’s effective runner context. Check `/api/ps` or wait for the context-source logging in [PR #18249](https://github.com/ollama/ollama/pull/18249) before budgeting large agent prompts.
- **Cap agent tool-call loops at the application layer.** The 31M-token loop in [Issue #17617](https://github.com/ollama/ollama/issues/17617) is an extreme example: clients should enforce max iterations, token budgets, and replay raw assistant history rather than text-trimmed history.
- **Mind host RAM when running long-lived servers.** A fully GPU-offloaded runner can still consume ~8 GiB of system RAM for llama-server’s prompt cache. If you self-host many runners, track RSS and expect `OLLAMA_CACHE_RAM` from [PR #18265](https://github.com/ollama/ollama/pull/18265) as a future control knob.
- **Tool schemas are currently sensitive to escaped characters.** Until [PR #18248](https://github.com/ollama/ollama/pull/18248) lands, avoid `\/` or `\-` in `pattern` strings inside array `items` when using the Anthropic-compatible endpoint.
- **Choose quantizations cautiously for small code models.** The broken Qwen2.5-Coder-3B low-bit artifacts in [Issue #18252](https://github.com/ollama/ollama/issues/18252) are a reminder to validate quantized model behavior on real tasks, not just perplexity or generation fluency.
- **MLX users should watch context enforcement fixes.** If you run Qwen models on Apple Silicon with long contexts, [PR #18261](https://github.com/ollama/ollama/pull/18261) and [PR #18263](https://github.com/ollama/ollama/pull/18263) are directly relevant to avoiding Metal watchdog crashes and honoring `num_ctx`.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-06

*Covering activity from 2026-09-05 through 2026-09-06. Source: github.com/BerriAI/litellm. 0 releases, 48 issues updated in window, 325 PRs updated in window.*

## Today's Highlights

Spend and budget correctness dominate the window: a budget-reset bug that silently zeroes spend forever ([#39370](https://github.com/BerriAI/litellm/issues/39370)), silent spend-log drops for `id:null` providers since v1.99.0 ([#39749](https://github.com/BerriAI/litellm/issues/39749)), and a fix that keeps guardrail costs on cache hits ([#39960](https://github.com/BerriAI/litellm/pull/39960)). The most severe open correctness issue is a streaming regression where the re-chunker drops `tool_calls[].id` and `function.name` ([#39796](https://github.com/BerriAI/litellm/issues/39796)); the `client_side_timeout` request-body leak that was 400ing Anthropic/Bedrock/Vertex/Azure requests appears already closed ([#39899](https://github.com/BerriAI/litellm/issues/39899)). Router hardening also landed as a cluster: event-loop blocking in AutoRouter, adaptive-router cold-start priors, and cost-weighted scoring fallbacks ([#39954](https://github.com/BerriAI/litellm/pull/39954) – [#39957](https://github.com/BerriAI/litellm/pull/39957)).

## Releases & Breaking Changes

- None published in the last 24h.

## New Model & Hardware Support

- No new base-model, quantization, or hardware-backend (CUDA/ROCm/Metal/CPU) support landed in this window. Closest items:
  - **Cohere Parse OCR** config for `cohere` and `azure_ai` ([PR #39862](https://github.com/BerriAI/litellm/pull/39862), closed).
  - **Switchyard capability classifier** for complexity routing — reproduces Switchyard capability forecasts, fails closed on missing verdicts ([PR #39961](https://github.com/BerriAI/litellm/pull/39961), open).
  - **Anthropic workload identity federation** and pluggable identity sources ([PR #39935](https://github.com/BerriAI/litellm/pull/39935), open).
  - **OpenRouter video generation** support request remains unimplemented ([#27724](https://github.com/BerriAI/litellm/issues/27724), open).

## Performance & Optimization

- **AutoRouter cold-start blocking**: the first-request semantic route layer ran a synchronous embedding call on the event loop with no lock, causing duplicate cold-start builds under concurrency. PR [#39954](https://github.com/BerriAI/litellm/pull/39954) runs the build in a worker thread as a single shared task.
- **Adaptive router prior persistence**: loading persisted state overwrote the cell's prior, handing `thompson_sample` degenerate `Beta(x,0)`/`Beta(0,x)` distributions. PR [#39955](https://github.com/BerriAI/litellm/pull/39955) adds the persisted delta to the cold-start prior on load.
- **Adaptive router cost weighting**: only read `input_cost_per_token` from `litellm_params`, so custom pricing under `model_info` (the convention elsewhere) read as $0 and every candidate tied on cost. PR [#39957](https://github.com/BerriAI/litellm/pull/39957) falls back to `model_info`.
- **Guardrail inspection toggle**: AIM and Cato now have a per-guardrail `inspect_embeddings` toggle for policy checks on indexed document text, default off to preserve the skip behavior ([PR #39918](https://github.com/BerriAI/litellm/pull/39918)).
- **Fireworks AI compat**: inbound messages now strip `reasoning_details`, which some providers reject ([PR #39962](https://github.com/BerriAI/litellm/pull/39962)).
- **Heuristic tuning license boundary**: heuristic-v1 settings are snapshotted on first DB-backed boot; one free editable tuned auto-router per deployment, more requires a license ([PR #39952](https://github.com/BerriAI/litellm/pull/39952)).

## Stability & Regressions

*Ranked by severity.*

1. **`client_side_timeout` leaking into outbound provider request body** — requests setting `timeout`/`request_timeout`/`stream_timeout` (via headers or body) 400'd against Anthropic, Bedrock, Vertex, and Azure with `"Extra inputs are not permitted"`. Filed and **closed same day**; likely fixed in next release ([#39899](https://github.com/BerriAI/litellm/issues/39899)).
2. **Streaming re-chunker drops tool-call identity** — upstream full-tool-call-in-one-delta responses lose `tool_calls[].id` and `function.name`, breaking agentic streaming passthrough on LiteLLM 1.95.0. **Open, no fix PR visible** ([#39796](https://github.com/BerriAI/litellm/issues/39796)).
3. **Spend logs silently dropped since v1.99.0** when upstream returns OpenAI-shaped `"id": null` (observed Databricks-Gemini): `request_id` becomes `"None"` and collides on primary key ([#39749](https://github.com/BerriAI/litellm/issues/39749)).
4. **Budget reset zeroes spend forever** — rows with `budget_duration = null` plus a stale non-null `budget_reset_at` are picked up on every tick and never self-heal ([#39370](https://github.com/BerriAI/litellm/issues/39370)).
5. **Vercel AI Gateway streaming drops `usage.prompt_tokens_details`** — cached prompt tokens billed at the full input rate on streamed requests ([#39088](https://github.com/BerriAI/litellm/issues/39088)).
6. **Spend crashes on unusual token/message shapes** — `cost_per_token` crashes on `None`/string token counts ([#39618](https://github.com/BerriAI/litellm/issues/39618)); `BudgetManager.projected_cost` crashes on vision-block or `null` message content ([#39615](https://github.com/BerriAI/litellm/issues/39615)).
7. **`/user/update` rejects documented `blocked` param** — always 400s (`LiteLLM_UserTable` has no such column), breaking the Terraform `litellm_user` resource ([#39564](https://github.com/BerriAI/litellm/issues/39564)).
8. **Lowest-latency routing misreads `tpm=0`/`rpm=0`** as unlimited due to a falsy-zero `or`-chain ([#39744](https://github.com/BerriAI/litellm/issues/39744)).
9. **A2A scope bypass** — OpenAI-compatible `/v1/chat/completions` with `model: a2a/{agent}` skips `object_permission.agents` checks enforced on native A2A routes ([#38996](https://github.com/BerriAI/litellm/issues/38996)).
10. **`register_model` case-insensitive merge leaks config** — one deployment's declared `max_input_tokens`/`supports_vision` leaks into same-model-different-case deployments, excluding the wrong deployment from mixed-capability groups ([#39909](https://github.com/BerriAI/litellm/issues/39909)).
11. **Model-less PATCH attaches `complexity_router_config` to non-router deployments** ([#39838](https://github.com/BerriAI/litellm/issues/39838)).
12. **Non-streaming requests never cancel upstream work on client disconnect** — the streaming `/chat/completions` path was reportedly fixed earlier via #30244/#30245; the non-streaming path is still open ([#37140](https://github.com/BerriAI/litellm/issues/37140)).

**Other stability/privacy PRs in window**: guardrail cost no longer zeroed on cache hits ([#39960](https://github.com/BerriAI/litellm/pull/39960)); `/key/update` finally accepts `soft_budget` ([#39002](https://github.com/BerriAI/litellm/pull/39002)); `/v1/responses` drops the `reasoning` param for OpenAI non-reasoning models (relevant to the open Codex CLI issue [#29818](https://github.com/BerriAI/litellm/issues/29818)) ([#38842](https://github.com/BerriAI/litellm/pull/38842)); Admin UI bundle rebuilt [#39959](https://github.com/BerriAI/litellm/pull/39959); gitpython floor raised to 3.1.59 for four advisories [#39553](https://github.com/BerriAI/litellm/pull/39553).

Stale-bot closed a batch of older bugs this window — treat as unverified unless you reproduced them: Windows DB connection failure in database mode ([#26594](https://github.com/BerriAI/litellm/issues/26594)), cache-read pricing with custom costs ([#26807](https://github.com/BerriAI/litellm/issues/26807)), Cloudflare Workers AI empty content ([#29353](https://github.com/BerriAI/litellm/issues/29353)), ignored `InternalServerErrorAllowedFails` ([#29283](https://github.com/BerriAI/litellm/issues/29283)), qwen `cache_control` on OpenRouter ([#29322](https://github.com/BerriAI/litellm/issues/29322)), and the API-spec output-validation proposal ([#21347](https://github.com/BerriAI/litellm/issues/21347)).

## What This Means for Application Developers

- **Watch for the next patch release** if you use Anthropic, Bedrock, Vertex, or Azure routes and pass timeout values via headers/body — the [#39899](https://github.com/BerriAI/litellm/issues/39899) 400 was provider-wide; the fix is already closed upstream.
- **Streaming agent apps should pin and test tool-call behavior.** If you rely on `stream: true` with tools and an OpenAI-compatible upstream, verify `tool_call.id`/`function.name` survive re-chunking — [#39796](https://github.com/BerriAI/litellm/issues/39796) is open with no fix yet. Consider disabling re-chunking if you cannot upgrade.
- **Audit spend dashboards if you run Databricks-Gemini or the Vercel AI Gateway.** Two silent billing bugs are open: `id:null` responses dropping spend logs entirely on v1.99.x ([#39749](https://github.com/BerriAI/litellm/issues/39749)) and cached tokens billed at full input price on streaming ([#39088](https://github.com/BerriAI/litellm/issues/39088)).
- **Budget admins**: rows with `budget_duration = null` but a stale `budget_reset_at` can be zeroed every tick ([#39370](https://github.com/BerriAI/litellm/issues/39370)). If you suspect this, clean the stale `budget_reset_at` values by hand pending a fix.
- **Custom pricing users**: keep cost fields in `litellm_params` until [#39957](https://github.com/BerriAI/litellm/pull/39957) merges; pricing declared only under `model_info` currently ties at $0 in adaptive-router cost scoring.
- **Terraform users of `litellm_user`**: the documented `blocked` field remains broken on `/user/update` ([#39564](https://github.com/BerriAI/litellm/issues/39564)); budget-limit workarounds should use `/key/update` where `soft_budget` support is now landing ([#39002](https://github.com/BerriAI/litellm/pull/39002)).
- **Community contribution pace is a risk**: maintainers acknowledged two external PRs (e.g., Vertex Lyria music generation [#30304](https://github.com/BerriAI/litellm/pull/30304)) have sat unreviewed for months ([#39911](https://github.com/BerriAI/litellm/issues/39911)). Plan around slower upstream review for non-Berri PRs.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

## 1. Today's Highlights

No release shipped in the last 24 hours (current reported builds remain `v0.1.806-beta` / `2026.9.2`). Engineering activity was instead concentrated on correctness: a fix prevents `unsloth chat` from loading the wrong GGUF from a shared directory ([#10357](https://github.com/unslothai/unsloth/pull/10357), fixing [#10352](https://github.com/unslothai/unsloth/issues/10352)), a `torch.dynamo` crash on Windows Desktop is patched ([#10360](https://github.com/unslothai/unsloth/pull/10360), fixing [#10350](https://github.com/unslothai/unsloth/issues/10350)), and two stacked PRs push KV-cache preemption into llama-server so parallel Studio chats share one cache instead of evicting each other ([#10301](https://github.com/unslothai/unsloth/pull/10301), [#10358](https://github.com/unslothai/unsloth/pull/10358)).

## 2. Releases & Breaking Changes

None. No releases were published in the last 24 hours, so there are no new API/config changes or migration notes. Two open PRs signal future behavior changes worth watching: Docker Studio will print the first-boot admin password to `docker logs` and honor `UNSLOTH_STUDIO_PASSWORD` ([#10344](https://github.com/unslothai/unsloth/pull/10344)), and OpenAI-compatible SSE streams will gate Unsloth's proprietary control frames behind an `X-Unsloth-Events` opt-in header ([#10362](https://github.com/unslothai/unsloth/pull/10362)).

## 3. New Model & Hardware Support

- **Voxtral** remains the most-upvoted open model request ([#3013](https://github.com/unslothai/unsloth/issues/3013), 14 👍).
- **Windows on ARM (NVIDIA):** [#10282](https://github.com/unslothai/unsloth/pull/10282) makes the PowerShell installer deploy the native ARM64 CUDA stack on NVIDIA GB10/N1X “RTX Spark” laptops.
- **ARM64 Linux / DGX Spark:** packaging gap for `Unsloth Desktop` documented — the app itself ports cleanly, only Linux aarch64 assets are missing ([#10332](https://github.com/unslothai/unsloth/issues/10332)); a two-Spark serving orchestrator with async replica router is proposed in [#10323](https://github.com/unslothai/unsloth/pull/10323).
- **Hermes integration:** Studio will scan `~/.hermes/models` alongside LM Studio and Ollama directories ([#10327](https://github.com/unslothai/unsloth/pull/10327)).
- **Qwen3.8 ecosystem:** sampling defaults by reasoning mode ([#9595](https://github.com/unslothai/unsloth/pull/9595)); MTP loading failure for Flash-Next GGUF being investigated ([#10322](https://github.com/unslothai/unsloth/issues/10322)).
- **PyTorch 2.11 / vLLM 0.19** compatibility request was closed ([#4851](https://github.com/unslothai/unsloth/issues/4851)).
- Hardware support still blocked by bugs: Intel Arc B580 XPU import failure remains open with 15 comments ([#3533](https://github.com/unslothai/unsloth/issues/3533)).

## 4. Performance & Optimization

- **KV-cache preemption for parallel chat:** Studio currently launches one llama-server with `--parallel N --kv-unified -c N`, and the server only checks per-slot `prompt_tokens`, not aggregate capacity — so parallel chats that fit individually can kill each other. PR [#10301](https://github.com/unslothai/unsloth/pull/10301) adds Studio-side KV preemption; the follow-up [#10358](https://github.com/unslothai/unsloth/pull/10358) delegates slot parking to llama-server via `--preempt-ram` (unslothai/llama.cpp#184/#190), letting each chat use the full context window.
- **Kernel coverage:** [#9573](https://github.com/unslothai/unsloth/pull/9573) adds GPU tests for the `geglu`/`swiglu`/`rms_layernorm` Triton kernels — the hot path for every MLP forward/backward during fine-tuning.
- **AMD unified-memory APUs:** [#10351](https://github.com/unslothai/unsloth/pull/10351) sets `GGML_CUDA_ENABLE_UNIFIED_MEMORY=1` only when weights outgrow the APU carve-out, since on Linux ROCm the flag is a measured correctness risk.
- **RL training:** Studio-side GRPO ([#9310](https://github.com/unslothai/unsloth/pull/9310)) and a SAO trainer for the GLM-5.2-style single-rollout objective ([#9309](https://github.com/unslothai/unsloth/pull/9309)) are in review.
- A performance complaint reports low token output throughput for Claude Codex Hermes via the Unsloth API, but includes no benchmark numbers ([#10354](https://github.com/unslothai/unsloth/issues/10354)). No concrete throughput/latency figures landed today.

## 5. Stability & Regressions

Ranked by severity:

1. **Incorrect model loaded:** `unsloth chat` can display one GGUF in the picker but load a different, unrelated GGUF from the same parent directory (e.g., selecting Ling loads a MiniMax video-model GGUF) ([#10352](https://github.com/unslothai/unsloth/issues/10352)). Fix PR: [#10357](https://github.com/unslothai/unsloth/pull/10357).
2. **Windows Desktop crash:** circular import of `torch.dynamo` when loading Z-Image GGUF; the server handles requests on a thread pool, so the first real import crashes ([#10350](https://github.com/unslothai/unsloth/issues/10350)). Fix PR: [#10360](https://github.com/unslothai/unsloth/pull/10360).
3. **AMD ROCm cluster (Radeon PRO W7900/W7500, ROCm 7.13):** “No RAM Offload” checkbox ignored, model still sitting in RAM ([#10341](https://github.com/unslothai/unsloth/issues/10341)); pressing the unload button errors ([#10339](https://github.com/unslothai/unsloth/issues/10339)); “Switch Back” resets local-model chats to 4096 context ([#10338](https://github.com/unslothai/unsloth/issues/10338)); token counts are not being counted again ([#10337](https://github.com/unslothai/unsloth/issues/10337)). No fix PRs yet.
4. **OpenAI SSE compatibility:** `/v1/chat/completions` multiplexes UI control frames (`tool_start`, `diffusion_frame`, etc.) lacking `choices`, so strict OpenAI clients fail schema validation ([#10362](https://github.com/unslothai/unsloth/pull/10362)).
5. **`--tensor-split` ignored** on multi-GPU setups, resulting in hours of lost time for the reporter ([#10355](https://github.com/unslothai/unsloth/issues/10355)).
6. **Agent-context fidelity:** tool responses hard-truncated at 16,000 chars ([#10349](https://github.com/unslothai/unsloth/issues/10349)); Unsloth sends a modified context to the model without user visibility, including silent dedup of tool calls ([#10348](https://github.com/unslothai/unsloth/issues/10348)).
7. **Model loading regressions:** MTP fails to load Qwen3.8-Flash-Next-GGUF ([#10322](https://github.com/unslothai/unsloth/issues/10322)); Laguna `iq4_nl` no longer loads with llama.cpp `b10798-mix` ([#10336](https://github.com/unslothai/unsloth/issues/10336)); first-run Qwen3.8-UD-IQ4_XS outputs gibberish ([#10330](https://github.com/unslothai/unsloth/issues/10330)).
8. **Old but open:** Intel Arc B580 import error (`torch.xpu.memory.mem_get_info()` unsupported) ([#3533](https://github.com/unslothai/unsloth/issues/3533)). Rolling-context-window request closed ([#7472](https://github.com/unslothai/unsloth/issues/7472)).
9. **Build/release infra:** two Docker publish runs failed today on Launchpad 504s; retry added in [#10363](https://github.com/unslothai/unsloth/pull/10363). Docker Hub credential probe now correctly deletes its throwaway tag ([#10294](https://github.com/unslothai/unsloth/pull/10294)). API token copy button fixed for plain-HTTP installs ([#9906](https://github.com/unslothai/unsloth/pull/9906)).

## 6. What This Means for Application Developers

- **Validate loaded models:** until [#10357](https://github.com/unslothai/unsloth/pull/10357) lands, do not rely on the chat picker to load the exact GGUF you selected when multiple unrelated `.gguf` files share a directory — verify the loaded model path programmatically.
- **Strict OpenAI clients:** filter out SSE events without a `choices` field, or plan to set `X-Unsloth-Events` once [#10362](https://github.com/unslothai/unsloth/pull/10362) merges. Today those frames can break schema validation in downstream apps.
- **Agentic workloads:** the 16k tool-output truncation ([#10349](https://github.com/unslothai/unsloth/issues/10349)) and opaque context rewriting ([#10348](https://github.com/unslothai/unsloth/issues/10348)) are both footguns for tool-using agents; consider passing full tool outputs out-of-band until they are addressed.
- **Hardware planning:** Windows-on-ARM NVIDIA hosts (RTX Spark) gain a working native CUDA installer in [#10282](https://github.com/unslothai/unsloth/pull/10282); AMD APU users benefit from conditional unified memory ([#10351](https://github.com/unslothai/unsloth/pull/10351)); dual-GPU Radeon PRO setups should monitor the unresolved offload/unload context bugs ([#10338](https://github.com/unslothai/unsloth/issues/10338)–[#10341](https://github.com/unslothai/unsloth/issues/10341)).
- **RL fine-tuning roadmap:** if you have been waiting for RL beyond SFT in Studio, watch [#9310](https://github.com/unslothai/unsloth/pull/9310) (GRPO) and [#9309](https://github.com/unslothai/unsloth/pull/9309) (SAO, per the GLM-5.2 paper).
- **Air-gapped/offline deployments** are not yet supported by Unsloth Desktop ([#10356](https://github.com/unslothai/unsloth/issues/10356)); factor that into rollout plans for restricted networks.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*