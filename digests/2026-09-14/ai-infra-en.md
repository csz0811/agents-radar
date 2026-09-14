# AI Infrastructure Digest 2026-09-14

> Generated: 2026-09-14 00:23 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Report — 2026-09-14

## 1. Ecosystem Overview

The AI infrastructure stack is in a heavy development cycle, with activity concentrated on new model enablement, KV-cache/memory management, and agent/tool-call reliability rather than stable releases. Serving engines are racing to support DeepSeek V4.1 and other frontier architectures, but production readiness is lagging: SGLang’s V4.1 PR is CI-blocked and accompanied by V4.1-specific bugs, while llama.cpp has V4.1 conversion support under review. Local runtimes and gateways are converging on OpenAI/Anthropic/Responses API compatibility, but prefix-cache behavior, structured outputs, and MCP/tool payload handling remain weak spots. Notably, vLLM’s digest failed to generate, so it cannot be assessed in this report. Across projects, cache correctness, client cancellation, and memory sizing are recurring stability themes.

---

## 2. Activity Comparison

N/R = not reported as an aggregate count in the provided digest; this does not mean zero activity.

| Project | Layer | Issues updated (24h) | PRs updated (24h) | Release status | Notes |
|---|---:|---:|---:|---|---|
| **vLLM** | Serving engine | Unknown | Unknown | Unknown | Digest generation failed |
| **SGLang** | Serving engine | **41** | **277** | No release | Heavy dev cycle; DeepSeek V4.1, router, HiCache, unified memory |
| **llama.cpp** | Local runtime | N/R | N/R | **9 nightly builds** b10935–b10948 | Backend robustness, Kimi-K3, DeepSeek V4.1 conversion |
| **Ollama** | Local runtime / cloud bridge | N/R | N/R | No release | API/tool-call correctness, prompt-cache misses, quant leak |
| **LiteLLM** | LLM gateway | N/R | N/R | **v1.102.0-rc.1** | Cosign image signing; Rust gateway migration in progress |
| **Unsloth** | Fine-tuning / training | N/R | N/R | No release | Studio safety bypass, MCP truncation, installer/training perf |

SGLang is the only project with explicit aggregate activity numbers in this snapshot: 277 PRs and 41 issues updated, with no release. llama.cpp is shipping nightly builds rapidly. LiteLLM is the only project with a versioned release in the window, albeit an RC.

---

## 3. Model Support Race

**DeepSeek V4.1**
- **SGLang** has the headline serving PR [#38798], but it is blocked on CI. Two same-day bugs show V4.1 paths are still settling: CUDA-graph capture failure [#39173] and image-placeholder token rejection [#39274].
- **llama.cpp** has DeepSeek V4.1 conversion support under review via `deepseek41` architecture [#28696].
- **Verdict:** llama.cpp may be closer on conversion/local execution; SGLang is closer on high-throughput serving integration but not production-ready.

**Kimi-K3**
- **llama.cpp** merged Kimi-K3 text model support [#26185], including hybrid KDA/MLA attention, cross-layer residual attention, latent MoE, and SiTU activation.
- **LiteLLM** closed Azure Kimi-K2.7-Code support via Microsoft Foundry [#32613].
- **Ollama** has a `kimi-k3:cloud` regression: HTTP 500 on image content in tool-role messages [#18426].
- **Verdict:** llama.cpp leads on local architecture support; LiteLLM leads on gateway/provider routing; Ollama’s cloud path is regressed.

**Qwen ecosystem**
- **Ollama** is actively fixing Qwen3-Coder tool-number parsing [#18421/#18422] and investigating prompt-cache misses from nondeterministic tool-schema order [#18430].
- **LiteLLM** added/closed DashScope Qwen 3.6/3.7 pricing [#29922] and OpenRouter Qwen `cache_control` support [#29335].
- **Unsloth** reports B200 Qwen3.5-9B LoRA training GPU idle due to FLA autotune-key rebuild [#10806].
- **Verdict:** Qwen support is broad, but tool-call and cache correctness are the bottleneck, not raw model availability.

**Multimodal / vision**
- **SGLang** added Ling-3.0-flash-VL support [#38526].
- **Ollama** has Windows image-generation work [#13806], but Gemma 4 image processing is broken on Windows [#16532], EXIF orientation is ignored [#18418], and Jetson Orin Nano 8GB OOMs with Gemma 4 E4B [#18396].
- **llama.cpp** added `input_image` inside `function_call_output` [#28847], but vision-model KV cache save/restore is still broken [#19466].
- **Unsloth** added PaliGemma v1 + v2 LoRA fine-tuning support [#5218].
- **Verdict:** multimodal serving is advancing unevenly; cache persistence and image preprocessing remain unsafe for production.

**Hardware breadth**
- **SGLang:** AMD EAGLE temperature sampling [#39253], NPU, Blackwell sharded pools [#37615], Intel CPU roadmap closed [#24921].
- **llama.cpp:** CUDA F32 fallback on pre-CDNA AMD [#28846], SYCL graph replay [#28725], OpenCL quant alignment [#28575], s390x guards, Vulkan NVIDIA workaround.
- **Unsloth:** Intel XPU Triton still failing [#10844], Windows ARM64 installer failing [#10875], B200/Blackwell FLA issue [#10806].
- **Ollama:** integrated Vulkan GPU direct I/O [#18124], Jetson Orin issues.

---

## 4. Performance Frontier

Optimization effort is concentrated in five areas:

**KV cache and memory**
- **SGLang** is the most aggressive: semantic KV reuse [#31057], shared byte budget for hybrid SWA memory [#36729], hierarchical HiCache for unified pools [#37507], sharded pools [#37615], mxfp8-kv padding fix [#35351], and HiCache restore-correctness bug [#39147].
- **Ollama** is fighting prefix-cache misses from Qwen3-Coder tool-schema ordering [#18430] and Anthropic-compatible system-role hoisting [#18431].
- **llama.cpp** has speculative decoding draft-cap fixes [#26575], but HIP quantized KV cache is slower than f16 on RDNA4 [#27796].
- **LiteLLM** has cache-hit spend/token semantics questions [#39057] and a Valkey semantic-cache bug [#32324].
- **Unsloth** has a KV VRAM estimator cleanup [#8994].

**Batching, routing, and distributed serving**
- **SGLang** is pushing router selection/cache-locality: queue-aware affinity [#39168–#39170], prefix-owner pinning, cache-aware metrics [#39325–#39327], runtime EP scale-down [#33111], and PD circuit-breaker issues [#31206].
- **llama.cpp** fixed CPU `mul_mat_id` false sharing [#28861] and is tracking a server speculative batch offset bug [#24840].
- **LiteLLM** has WIP client-disconnect relay [#27146] and router deep-copy kwargs per fallback attempt [#27462].

**Quantization and model compression**
- **llama.cpp** landed OpenCL quant row-alignment for `q4_K`, `q5_K`, `q8_0` [b10937/#28575], and has MoE out-of-VRAM SSD streaming [#25294].
- **Ollama** has an `IQ3_S` empty-content bug [#18297] and a large quantization disk-leak fix [#18424].
- **Unsloth** users should migrate `max_seq_length` to `max_length` on Docker `2026.9.4` [#10785].

**Kernels and compilers**
- **llama.cpp**: CUDA F32 fallback for pre-CDNA AMD [#28846], SYCL graph record/replay [#28725], Vulkan NVIDIA `QueueSubmit` mutex [b10938/#28830], grammar engine 1.2–1.3× speedup [#26885].
- **SGLang**: JIT kernels, AMD EAGLE verify sampling, and CUDA-graph capture issues around V4.1.
- **Unsloth**: FLA autotune-key rebuild causing B200 GPU idle [#10806].

**Gateway overhead**
- **LiteLLM** is pursuing a Rust migration targeting sub-1ms gateway overhead [#31263], but it remains beta/in-progress.

---

## 5. Layer Positioning

| Layer | Projects | Core role | Current focus |
|---|---|---|---|
| **High-throughput serving engine** | vLLM, SGLang | GPU-serving, continuous batching, distributed inference, KV cache, MoE | DeepSeek V4.1, HiCache/unified memory, router cache-locality, PD disaggregation |
| **Local runtime / edge** | llama.cpp, Ollama | CPU/GPU/Apple/Intel execution, model packaging, desktop/server inference | Backend robustness, architecture conversion, prompt cache, agent/tool APIs |
| **LLM gateway / proxy** | LiteLLM | Multi-provider routing, auth, budgets, guardrails, observability | Provider compatibility, `/v1/responses`, spend accounting, Rust rewrite |
| **Training / fine-tuning** | Unsloth | LoRA/SFT, quantization, Studio, agentic tooling | Installer reliability, MCP/RAG correctness, B200 throughput, PaliGemma LoRA |

**Overlaps:**
- Ollama and llama.cpp share a local-runtime lineage; Ollama abstracts llama.cpp for easier model management and cloud bridging.
- LiteLLM sits above engines and local runtimes, routing to OpenAI, Anthropic, Bedrock, Ollama, vLLM, SGLang, and others.
- SGLang/vLLM are deployment targets for models produced/fine-tuned with Unsloth.
- vLLM cannot be positioned today because its digest failed.

---

## 6. Trend Signals

1. **Frontier model support is racing ahead of production readiness.** DeepSeek V4.1 and Kimi-K3 are landing or under review, but V4.1 serving in SGLang is CI-blocked and bug-prone. Do not put V4.1 into production yet.

2. **Cache correctness is becoming more important than cache hit rate.** SGLang’s HiCache can report unrestorable prefixes [#39147]; Ollama’s Anthropic-compat and Qwen3-Coder paths defeat prefix caching [#18430/#18431]; LiteLLM has cache-hit spend/token reporting questions [#39057]. Validate restores and billing, not just hit metrics.

3. **Agent/tool reliability is the weakest link.** llama.cpp has a stdio MCP deadlock above ~1–5 KB payloads [#28723]; Unsloth has systematic MCP truncation [#10839] and a Studio safety bypass [#10835]; Ollama has multiple Qwen tool-call parser failures [#18421/#16383/#17778]. Agent developers should cap tool payloads, validate structured outputs client-side, and supervise tool execution.

4. **OpenAI/Anthropic/Responses compatibility is converging but incomplete.** llama.cpp is adding `input_image` in `function_call_output` [#28847]; LiteLLM is fixing streaming `/v1/responses` sequence/usage fields [#28899/#31332]; Ollama’s `/api/codex/v1/responses` can return empty `output_text` [#18419]. Pin versions if you depend on these APIs.

5. **Router/cache-aware scheduling is becoming first-class.** SGLang is exposing cache-locality metrics and queue-aware affinity; LiteLLM is fixing weighted routing and fallback behavior. Multi-turn agent and RAG workloads will benefit, but only once these PRs land.

6. **Memory management is going dynamic and unified.** SGLang’s shared byte budget and unified HiCache reduce hand-sizing of full-attention vs. SWA pools; llama.cpp is experimenting with SSD-streamed MoE experts; Unsloth is cleaning up KV VRAM estimation. Expect fewer OOM-adjacent failures, but more complex capacity behavior.

7. **Hardware heterogeneity is expanding.** NPU, AMD pre-CDNA, Intel XPU, Blackwell, ARM64, Jetson, and Vulkan all have active issues. Pin builds and benchmark per backend before upgrading.

8. **Security and supply-chain hygiene are emerging.** LiteLLM is signing Docker images with cosign; Unsloth Studio has a safety bypass; Ollama has a long-running license-notice compliance issue [#3185]. Treat local AI tooling as production software with supply-chain and sandboxing requirements.

9. **Observability is improving.** llama.cpp added `LOG_JSON` [#28586]; SGLang is adding router cache metrics; LiteLLM has logging-redaction work. Structured logs and cache-aware metrics are becoming practical for production monitoring.

**Bottom line for application developers:** avoid DeepSeek V4.1 in production for now, harden client-side cancellation and MCP/tool payload handling, validate cache restores and spend accounting, and pin known-good builds per hardware backend. The ecosystem is moving fast, but correctness and agent reliability are still the gating factors.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-14

## Today's Highlights

No releases shipped in the last 24h, but the project is in a heavy development cycle: **277 PRs** and **41 issues** were updated. The dominant themes are a large open PR adding **DeepSeek V4.1 support** (with several V4.1-specific bugs filed the same day), and an aggressive push on **router selection/cache-locality** and **unified memory / HiCache** plumbing. On the stability side, a client-disconnect crash that takes down the whole engine and a high-priority SWA/Mamba cache-correctness bug are the ones to watch.

---

## Releases & Breaking Changes

None. No new versions in the last 24h, and no merged API/config breakages reported. New flags in flight (not yet merged, listed for awareness of upcoming surface area):

- `--worker-queue-limit`, `--saturation-queue-floor`, `--min-load-choices` on sgl-router — [#39168](https://github.com/sgl-project/sglang/pull/39168), [#39169](https://github.com/sgl-project/sglang/pull/39169), [#39170](https://github.com/sgl-project/sglang/pull/39170)

---

## New Model & Hardware Support

- **[PR #38798] Add DeepSeek V4.1 support** — the headline landing; touches quantization, HiCache, NPU, JIT kernels and the memory pool. Currently blocked on missing `run-ci` label. [link](https://github.com/sgl-project/sglang/pull/38798)
- **[PR #38526] Add Ling-3.0-flash-VL model support** — native text/image/video serving for `inclusionAI/Ling-3.0-flash-VL` over the OpenAI-compatible API, with BF16 and quantized checkpoints. [link](https://github.com/sgl-project/sglang/pull/38526)
- **[PR #39253] [AMD][SPEC] Temperature sampling in EAGLE verify** — closes a DeepSeek-V4 benchmark accuracy gap on ROCm. [link](https://github.com/sgl-project/sglang/pull/39253)
- **[Issue #37742] SenseNova-U1 / U1.5 feature & performance tracking** — active roadmap issue for adding native support, referencing the official OpenSenseNova implementation. [link](https://github.com/sgl-project/sglang/issues/37742)
- **[Issue #24921] Intel CPU Roadmap (2026Q2)** — closed/inactive; production single-node serving, small-to-medium LLMs, heterogeneous disaggregation with host CPU cycles. [link](https://github.com/sgl-project/sglang/issues/24921)
- **[Issue #31175] Native OLMo3 via Olmo2 implementation** — closed/inactive; OLMo-3 currently only runs through the Transformers fallback backend. [link](https://github.com/sgl-project/sglang/issues/31175)

---

## Performance & Optimization

- **[PR #31057] Semantic KV cache reuse** — pluggable fuzzy-match radix backend to reuse KV across paraphrases/RAG prompts that don't share a literal prefix. Opt-in. [link](https://github.com/sgl-project/sglang/pull/31057)
- **[PR #36729] Shared byte budget for unified hybrid-SWA memory** — replaces static per-pool capacity gates with one dynamic arena, so full-attention and sliding-window pools can borrow unused bytes from each other. [link](https://github.com/sgl-project/sglang/pull/36729)
- **[PR #37507] Hierarchical cache for every unified pool shape** — extends HiCache to unified MHA+Mamba, MLA+Mamba, SWA and full/SWA/Mamba pools (stack 3/3). [link](https://github.com/sgl-project/sglang/pull/37507)
- **[PR #37615] [kv-shard 2/4] Sharded pools** — Blackwell-targeted sharded KV pool work. [link](https://github.com/sgl-project/sglang/pull/37615)
- **[PR #35351] [mxfp8-kv] Skip writes to reserved CUDA-graph padding slot** — avoids undefined activations polluting slot 0 of the KV pool. [link](https://github.com/sgl-project/sglang/pull/35351)
- **[PR #33111] Runtime EP scale-down** — gracefully retire live EP ranks via Mooncake `deactivate_ranks`, complementing existing scale-up and fault recovery. [link](https://github.com/sgl-project/sglang/pull/33111)
- **[Issue #39299] MoE deferred finalize unreachable for custom-routing models** — models requiring `trtllm_fp4_block_scale_routed_moe` are permanently excluded from the optimization. [link](https://github.com/sgl-project/sglang/issues/39299)
- **[Issue #30985] HiSparse blog throughput not reproducible** — closed/inactive; a single-H200 run could not match published numbers. [link](https://github.com/sgl-project/sglang/issues/30985)
- **[Issue #31120] Qwen3.5-4B performance degradation on RTX 5090** — closed/inactive without a fix. [link](https://github.com/sgl-project/sglang/issues/31120)

Router-side observability/policy work (a 6-PR stack from Kangyan-Zhou) is the other half of the perf story: prefix-owner pinning under fleet-wide queueing, min-load fallback sampling, and cache-aware locality metrics exposed on `/metrics` plus Grafana panels — [#39322](https://github.com/sgl-project/sglang/pull/39322), [#39168](https://github.com/sgl-project/sglang/pull/39168), [#39169](https://github.com/sgl-project/sglang/pull/39169), [#39170](https://github.com/sgl-project/sglang/pull/39170), [#39325](https://github.com/sgl-project/sglang/pull/39325), [#39326](https://github.com/sgl-project/sglang/pull/39326), [#39327](https://github.com/sgl-project/sglang/pull/39327).

---

## Stability & Regressions

Ranked by severity. No fix PRs are referenced in the data for any of these.

1. **[Issue #39216] Client disconnect crashes the entire engine** — uncaught `asyncio.CancelledError` bypasses `except Exception`; reproduced on 4× RTX 6000D (SM120) with `dev-dsv41`. Highest impact: a single aborted client request takes down serving. [link](https://github.com/sgl-project/sglang/issues/39216)
2. **[Issue #38815] [bug, high priority] SWA branching attaches a later Mamba checkpoint to an earlier prefix** — silent correctness bug in joint Full/SWA/Mamba branching-point caching (Inkling/short-conv paths). Wrong outputs, not a crash. [link](https://github.com/sgl-project/sglang/issues/38815)
3. **[Issue #31206] sgl-router PD circuit breaker keeps dispatching to decode** — after a burst of client timeouts/aborts, a permanently fake-dead prefill survives even with an open breaker; requires intervention. [link](https://github.com/sgl-project/sglang/issues/31206)
4. **[Issue #35884] `/health` timeout path leaks orphaned scheduler requests** — health-check requests pile up and crash paged-prefill batching. [link](https://github.com/sgl-project/sglang/issues/35884)
5. **[Issue #39173] DeepSeek-V4.1-Flash + Engram dies in CUDA-graph capture** — "engram target-verify expects one equal block per request" on the profiled SPS table. [link](https://github.com/sgl-project/sglang/issues/39173)
6. **[Issue #39274] DeepSeek-V4.1 rejects user text containing the image placeholder token with 400** — `encoding_dsv41.py` treats any literal `<｜deepseek_image｜>` in user text as a hard error. [link](https://github.com/sgl-project/sglang/issues/39274)
7. **[Issue #39147] HiCacheFile reports an unrestorable prefix for hybrid cache pools** — `batch_exists_v2()` can report a hit when an auxiliary pool can't restore the prefix. [link](https://github.com/sgl-project/sglang/issues/39147)
8. **[Issue #35826] Grammar token sync initializes a singleton NCCL group under DP attention** — follow-up to #8400 with confirmed root cause. [link](https://github.com/sgl-project/sglang/issues/35826)
9. **[Issue #6357] Prometheus `avg_request_queue_latency` never collected** — long-standing observability hole, tagged `good first issue`. [link](https://github.com/sgl-project/sglang/issues/6357)
10. **[Issue #26340] CUDA Coredump Tracker** — still the most active issue in the repo (299 comments), auto-fed from `pr-test.yml`. [link](https://github.com/sgl-project/sglang/issues/26340)

**CI health** ([Issue #17050](https://github.com/sgl-project/sglang/issues/17050), last auto-update 2026-09-13 23:47 UTC): 6 broken, 11 flaky, 990 recently fixed on `main`.

Closed/inactive regressions worth noting for historical context: GLM-5.2 NVFP4 + EAGLE CUDA illegal memory access on CUDA-graph capture ([#31093](https://github.com/sgl-project/sglang/issues/31093)), GLM-5.1 TP8 EAGLE verify hang when KV pool near-full ([#26399](https://github.com/sgl-project/sglang/issues/26399)), custom all-reduce deadlock across two CUDA streams ([#31117](https://github.com/sgl-project/sglang/issues/31117)), Qwen3-VL video double-sampling ([#31200](https://github.com/sgl-project/sglang/issues/31200)), and PD prefill starvation when a request's SWA budget exceeds the SWA pool ([#31205](https://github.com/sgl-project/sglang/issues/31205)).

---

## What This Means for Application Developers

- **Plan for DeepSeek V4.1, but not today.** [#38798](https://github.com/sgl-project/sglang/pull/38798) is the enabling PR and is still CI-blocked; meanwhile [#39274](https://github.com/sgl-project/sglang/issues/39274) and [#39173](https://github.com/sgl-project/sglang/issues/39173) show V4.1 encoding and CUDA-graph paths are still settling. Avoid V4.1 in production until both are resolved.
- **Harden your client-side cancellation.** [#39216](https://github.com/sgl-project/sglang/issues/39216) means an aborted HTTP request can kill the engine process. If you run aggressive request timeouts or a benchmark harness that cancels slow requests, you are exposed — add supervision/auto-restart until fixed.
- **PD-disaggregated deployments need a restart runbook.** [#31206](https://github.com/sgl-project/sglang/issues/31206) leaves a dead prefill that the circuit breaker will not evict; the same author's [#31205](https://github.com/sgl-project/sglang/issues/31205) (closed) shows the V4 hybrid SWA pool is a recurring source of PD starvation.
- **Long-running cache-tier users: validate restores, not just hits.** [#39147](https://github.com/sgl-project/sglang/issues/39147) means a reported HiCache prefix hit can be unrestorable for hybrid pools; don't treat hit-rate metrics as a correctness signal. Related long-standing scale issue: flat-directory ENOSPC at millions of pages ([#28653](https://github.com/sgl-project/sglang/issues/28653), closed).
- **Router improvements are landing for exactly your workload.** If you serve multi-turn agents or RAG with shared prefixes, the cache-locality `/metrics` work ([#39325](https://github.com/sgl-project/sglang/pull/39325)–[#39327](https://github.com/sgl-project/sglang/pull/39327)) plus queue-aware affinity ([#39168](https://github.com/sgl-project/sglang/pull/39168), [#39169](https://github.com/sgl-project/sglang/pull/39169)) will give you router-side hit-rate visibility and stop cache-affinity traffic being routed into a saturated worker. Semantic (fuzzy) KV reuse ([#31057](https://github.com/sgl-project/sglang/pull/31057)) is worth piloting for paraphrased-prompt workloads, though it is opt-in and novel.
- **Memory tuning is becoming dynamic.** The shared byte budget work ([#36729](https://github.com/sgl-project/sglang/pull/36729)) and unified HiCache ([#37507](https://github.com/sgl-project/sglang/pull/37507)) reduce the need to hand-size full-attention vs. SWA pools — expect fewer OOM-adjacent capacity-gate failures once merged.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-14

## 1. Today's Highlights

Nine nightly builds landed in the last 24h (b10935–b10948), dominated by backend robustness rather than headline features: an OpenCL quantization alignment fix, a Vulkan workaround for an NVIDIA queue-submit driver bug, and a SYCL memory-detection fix. On the PR side, the biggest items in flight are hardware-accelerated fallbacks and scheduling work — CUDA F32 fallback for pre-CDNA AMD GPUs, SYCL graph record/replay, per-thread buffers for `mul_mat_id`, and disk-streaming of MoE routed experts. The Kimi-K3 architecture landed (closed) and DeepSeek V4.1 conversion support is under review.

## 2. Releases & Breaking Changes

Nightly builds only; no API or config breaking changes. Notable landed behavior changes:

- **[b10948](https://github.com/ggml-org/llama.cpp/releases/tag/b10948)** — Excludes `HY_V4` from WebGPU `test-llama-archs` (CI-only; unblocks WebGPU CI). Fix PR: [#28855](https://github.com/ggml-org/llama.cpp/pull/28855).
- **[b10947](https://github.com/ggml-org/llama.cpp/releases/tag/b10947)** — Nemotron-H: guards the expert FFN size fallback (`n_ff / n_expert_used`) against a zero divisor in the NextN/MTP tail loop ([#28779](https://github.com/ggml-org/llama.cpp/pull/28779)).
- **[b10946](https://github.com/ggml-org/llama.cpp/releases/tag/b10946)** — s390x: guards VXE-only repack helpers so non-VXE builds compile ([#28775](https://github.com/ggml-org/llama.cpp/pull/28775)).
- **[b10944](https://github.com/ggml-org/llama.cpp/releases/tag/b10944)** — SYCL: fixes level-zero memory query errors and improves handling of unsupported ZES API paths ([#28227](https://github.com/ggml-org/llama.cpp/pull/28227)).
- **[b10941](https://github.com/ggml-org/llama.cpp/releases/tag/b10941)**, **[b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938)**, **[b10937](https://github.com/ggml-org/llama.cpp/releases/tag/b10937)**, **[b10936](https://github.com/ggml-org/llama.cpp/releases/tag/b10936)**, **[b10935](https://github.com/ggml-org/llama.cpp/releases/tag/b10935)** — see sections below.
- **Observability addition**: **[b10935](https://github.com/ggml-org/llama.cpp/releases/tag/b10935)** adds a `LOG_JSON` macro for structured-data logging in `common` ([#28586](https://github.com/ggml-org/llama.cpp/pull/28586)) — useful if you parse llama.cpp logs.

## 3. New Model & Hardware Support

- **Kimi-K3 text model** — merged (closed) via [#26185](https://github.com/ggml-org/llama.cpp/pull/26185). Hybrid KDA (linear) + MLA (full) attention as in Kimi-Linear-48B, plus cross-layer residual attention, latent MoE (routed experts at `n_expert_latent`), and SiTU activation.
- **DeepSeek V4.1 (`DeepseekV41ForCausalLM`)** — conversion support under a new `deepseek41` architecture; params nested under `text_config` ([#28696](https://github.com/ggml-org/llama.cpp/pull/28696)).
- **CUDA: F32 fallback on GPUs without BF16 hardware acceleration** — pre-CDNA / pre-RDNA3 AMD cards were landing on a 64×32×8 rocBLAS stub tile for BF16 GEMM; PR adds an F32 path ([#28846](https://github.com/ggml-org/llama.cpp/pull/28846), closed).
- **SYCL graph record & replay** — port of the CUDA graph path to SYCL, with a reorder step required before recording ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725)).
- **OpenCL quant alignment** — the noshuffle row-alignment rule now applies to `q4_K`, `q5_K`, and `q8_0`, not just `q6_K` ([b10937](https://github.com/ggml-org/llama.cpp/releases/tag/b10937) / [#28575](https://github.com/ggml-org/llama.cpp/pull/28575)).
- **New tokenizer support** — pre-tokenizer for `fraunhofer-iis/elmod-2.7b-it` with a new `escape_after_split` flag ([#28845](https://github.com/ggml-org/llama.cpp/pull/28845)).
- **MoE out-of-VRAM execution** — optional SSD streaming of routed-expert weights with a small device-side per-layer expert slab cache, targeting models larger than RAM ([#25294](https://github.com/ggml-org/llama.cpp/pull/25294)).

## 4. Performance & Optimization

- **CPU `mul_mat_id` false-sharing fix** — each thread writes to its own buffer instead of a shared one, removing a barrier on the existing path ([#28861](https://github.com/ggml-org/llama.cpp/pull/28861)).
- **Grammar engine 1.2×–1.3× speedup** — single-lookup parsing and removal of extra copies in the in-house grammar engine ([#26885](https://github.com/ggml-org/llama.cpp/pull/26885), closed).
- **Vulkan NVIDIA queue-submit mutex** — serializes `QueueSubmit` per `VkDevice` to work around a driver synchronization bug ([b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938) / [#28830](https://github.com/ggml-org/llama.cpp/pull/28830)). Correctness-first tradeoff; watch for throughput cost on multi-queue NVIDIA setups.
- **Speculative decoding** — respects effective per-sequence draft caps before constructing the draft decode block for `draft-dflash`/`draft-dspark` ([#26575](https://github.com/ggml-org/llama.cpp/pull/26575)).
- **FA test sizing reduced** — faster CI, no runtime impact ([b10941](https://github.com/ggml-org/llama.cpp/releases/tag/b10941) / [#28842](https://github.com/ggml-org/llama.cpp/pull/28842)).
- **Open regression to track**: Vulkan prompt-processing throughput on RDNA3 dropped sharply after b10780 ([#28752](https://github.com/ggml-org/llama.cpp/issues/28752)) — no fix PR yet.

## 5. Stability & Regressions

Ranked by impact, from issues updated in the last 24h:

1. **Vulkan RDNA3 prompt-processing regression** — severe PP slowdown after b10780 on llama-server ([#28752](https://github.com/ggml-org/llama.cpp/issues/28752)). No fix identified.
2. **`ggml_backend_sched_alloc_splits`: unexpected graph reallocation** — hard crash on Intel Arc Pro / IntelLLVM builds ([#28753](https://github.com/ggml-org/llama.cpp/issues/28753)).
3. **Metal OOM at init still binds port and reports "model loaded"** — every subsequent request returns 500, making failures undetectable by health checks ([#27309](https://github.com/ggml-org/llama.cpp/issues/27309)).
4. **MCP tool-call deadlock** — config-spawned stdio MCP servers deadlock permanently on tool-call payloads above ~1–5 KB ([#28723](https://github.com/ggml-org/llama.cpp/issues/28723)). Directly relevant to agent workloads.
5. **SYCL GPU TDR reset** — loading a DFlash2 draft model on dual Arc Pro B70 triggers `VIDEO_TDR_TIMEOUT_DETECTED`; process dies with no trace ([#28778](https://github.com/ggml-org/llama.cpp/issues/28778)).
6. **HIP/ROCm on Windows gfx1201** — batched target scoring changes logits/top-1 vs. Vulkan control ([#28768](https://github.com/ggml-org/llama.cpp/issues/28768)).
7. **SYCL bad output on Qwen3.6 35B A3B** ([#28728](https://github.com/ggml-org/llama.cpp/issues/28728)).
8. **HIP quantized KV cache slower than f16 on RDNA4** — deficit grows with unpacking cost, inverting the expected bandwidth tradeoff ([#27796](https://github.com/ggml-org/llama.cpp/issues/27796)).
9. **Qwen3.8-Flash-Next-Next on Metal** — decode emits one token then EOS at long context; threshold shifts with quant / KV quant / `n_ctx` ([#28805](https://github.com/ggml-org/llama.cpp/issues/28805)).
10. **Gemma 4 SWA forgets key details** ([#25751](https://github.com/ggml-org/llama.cpp/issues/25751)) and **Gemma4Assistant context init failure** ([#24343](https://github.com/ggml-org/llama.cpp/issues/24343)).
11. **Vulkan/ANV FA scalar fallback** causes O(N²) PP degradation and device loss ([#27638](https://github.com/ggml-org/llama.cpp/issues/27638)).
12. **Server `batch_view` offset not propagated to `ctx_dft`** in `update_slots()` — subtle correctness issue in the speculative batch path ([#24840](https://github.com/ggml-org/llama.cpp/issues/24840)).
13. **KV cache save (`/slots/N?action=save`) broken for vision models** ([#19466](https://github.com/ggml-org/llama.cpp/issues/19466)).

Fixes landed today: SYCL memory detection ([#28227](https://github.com/ggml-org/llama.cpp/pull/28227)), Nemotron-H zero-divisor guard ([#28779](https://github.com/ggml-org/llama.cpp/pull/28779)), Vulkan NV submit mutex ([#28830](https://github.com/ggml-org/llama.cpp/pull/28830)), MiMo-V2 SWA pattern load ([#28865](https://github.com/ggml-org/llama.cpp/pull/28865)), and a batch of incorrect `get_key_or_arr` uses ([#28868](https://github.com/ggml-org/llama.cpp/pull/28868)).

## 6. What This Means for Application Developers

- **Agent/MCP reliability is the current weak spot.** The stdio MCP deadlock above ~1–5 KB tool payloads ([#28723](https://github.com/ggml-org/llama.cpp/issues/28723)) will bite tool-heavy agents; keep tool outputs small or use a non-stdio transport until fixed.
- **Responses API is converging but incomplete.** `input_image` inside `function_call_output` is being added ([#28847](https://github.com/ggml-org/llama.cpp/pull/28847)), which unblocks Codex-style `view_image` tools. Full `/v1/responses` support is still the highest-voted open request ([#19138](https://github.com/ggml-org/llama.cpp/issues/19138), 41 👍).
- **Prompt-cache reuse for Qwen3-Coder gets fixed.** Forcing `\n</think>` on reasoning-budget end keeps template rendering consistent across turns ([#28869](https://github.com/ggml-org/llama.cpp/pull/28869)); also improves complex-type parsing in the qwen3 parser ([b10936](https://github.com/ggml-org/llama.cpp/releases/tag/b10936)).
- **Structured logging is now first-class.** `LOG_JSON` ([#28586](https://github.com/ggml-org/llama.cpp/pull/28586)) makes it practical to ship llama.cpp logs into an observability pipeline instead of regex-scraping.
- **Model cache lifecycle management is still missing.** Listing/deleting cached models remains an open, highly-upvoted enhancement ([#16393](https://github.com/ggml-org/llama.cpp/issues/16393), 21 👍) — plan your own cache eviction around the HF download path.
- **Vision + KV cache persistence is not production-safe yet.** Saving/restoring slots for vision-enabled models is broken ([#19466](https://github.com/ggml-org/llama.cpp/issues/19466)); avoid relying on cached prefixes for multimodal traffic.
- **Backend selection matters more than usual this week.** If you're on Vulkan/RDNA3, be aware of the b10780 PP regression ([#28752](https://github.com/ggml-org/llama.cpp/issues/28752)); if on dual Intel Arc with a draft model, avoid SYCL speculative decoding until the TDR issue ([#28778](https://github.com/ggml-org/llama.cpp/issues/28778)) is resolved. Pin builds and benchmark before upgrading.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-14
Source: [github.com/ollama/ollama](https://github.com/ollama/ollama)

## 1. Today's Highlights
No releases landed in the last 24h. The most consequential activity is around API/tool-call correctness and prompt-cache behavior: Anthropic-compatible system-role handling and Qwen3-Coder tool-schema rendering are both causing prefix-cache misses, while a Qwen3-Coder numeric tool-argument bug has an open fix PR. A quantization temp-blob cleanup PR also targets large disk leaks, and a closed Vulkan direct-I/O PR addresses integrated-GPU load regressions.

## 2. Releases & Breaking Changes
None in the last 24h. No new versions, API/config changes, or migration notes.

## 3. New Model & Hardware Support
- **Windows image generation support**: closed PR [#13806](https://github.com/ollama/ollama/pull/13806) adds image generation to Windows, carrying temporary upstream MLX patches. Watch for this in a future release.
- **Integrated Vulkan GPUs**: closed PR [#18124](https://github.com/ollama/ollama/pull/18124) switches to direct I/O for integrated Vulkan GPUs, matching CUDA/ROCm. It fixes a model-load regression between 0.32.9 and 0.32.10 on Virtio-GPU/Venus.
- **IQ3_S quantization issue**: Qwen3.8-27B-GSQ-RCO-GGUF with `IQ3_S` returns empty content despite `done_reason: "stop"` ([#18297](https://github.com/ollama/ollama/issues/18297)).
- **Jetson Orin Nano 8GB**: Gemma 4 E4B multimodal projector causes host OOM despite CPU-projector configuration ([#18396](https://github.com/ollama/ollama/issues/18396)).
- **Model requests**: SARVAM-30B/105B ([#14319](https://github.com/ollama/ollama/issues/14319)) and Gnani Evon-v3.3 ([#18427](https://github.com/ollama/ollama/issues/18427)) were requested.

## 4. Performance & Optimization
- **Prompt cache misses on Qwen3-Coder**: extra tool schema keys render in random order, so identical requests produce different prompts and only partially reuse the prefix cache. Affects both `/api/chat` and `/v1/chat/completions` ([#18430](https://github.com/ollama/ollama/issues/18430)).
- **Anthropic-compat prefix cache defeat**: system-role messages inside `messages` are hoisted into the top-level system block, breaking positional prefix caching. This is especially visible with Claude Code after tool results ([#18431](https://github.com/ollama/ollama/issues/18431)).
- **Quantization disk leak fix**: `ollama create --quantize` from safetensors leaves intermediate F16 blobs behind. One report showed 69 unreferenced blobs totaling 830 GB in `~/.ollama/models`; a 26B MoE import can leave ~50 GB unreferenced. PR [#18424](https://github.com/ollama/ollama/pull/18424) cleans these up.
- **Tool number parsing fix**: PR [#18422](https://github.com/ollama/ollama/pull/18422) preserves Qwen3-Coder tool `number` arguments outside `int64` range instead of clamping them, fixing [#18421](https://github.com/ollama/ollama/issues/18421).
- **Vulkan direct I/O**: PR [#18124](https://github.com/ollama/ollama/pull/18124) targets integrated-GPU load performance/reliability.

## 5. Stability & Regressions
Ranked by severity:

1. **`kimi-k3:cloud` HTTP 500 on image content in tool-role messages** — regression from `kimi-k2.6`; `glm-5.3-flash` works. Cloud OpenAI-compatible endpoint crashes ([#18426](https://github.com/ollama/ollama/issues/18426)). No fix PR noted.
2. **Qwen3-Coder tool parser mangles numbers outside `int64`** — e.g., `1e20` becomes `9223372036854775807` on macOS/ARM64 ([#18421](https://github.com/ollama/ollama/issues/18421)). Fix PR: [#18422](https://github.com/ollama/ollama/pull/18422).
3. **Qwen3.6 tool-call template drift causes 500** — `qwen3.6` registers the `qwen3.5` parser/renderer; intermittent tool-call unmarshal failures ([#16383](https://github.com/ollama/ollama/issues/16383)). No fix PR noted.
4. **Qwen 3.8 “no user query found in messages” 500** — occurs during chat streaming with tool loops; 25 👍 ([#17778](https://github.com/ollama/ollama/issues/17778)). No fix PR noted.
5. **`/api/codex/v1/responses` silent empty completion** — `previous_response_id` tool follow-up returns HTTP 200 but empty `output_text` and zero tokens ([#18419](https://github.com/ollama/ollama/issues/18419)). No fix PR noted.
6. **Gemma 4 image processing fails on Windows** — image is attached but model cannot see it; 44 comments ([#16532](https://github.com/ollama/ollama/issues/16532)). No fix PR noted.
7. **Jetson Orin Nano 8GB OOM** with Gemma 4 E4B multimodal projector ([#18396](https://github.com/ollama/ollama/issues/18396)). No fix PR noted.
8. **Cloud JSON reply schema ignored** by `qwen3-coder:480b-cloud` ([#12362](https://github.com/ollama/ollama/issues/12362)). No fix PR noted.
9. **IQ3_S quantization returns empty content** for Qwen3.8-27B-GSQ-RCO-GGUF ([#18297](https://github.com/ollama/ollama/issues/18297)). No fix PR noted.
10. **EXIF orientation not applied** — models see rotated images when EXIF orientation is set ([#18418](https://github.com/ollama/ollama/issues/18418)). No fix PR noted.
11. **Table-of-contents ellipses trigger “cancel task”** — more than ten ellipses between titles and page numbers break generation on Windows ([#18387](https://github.com/ollama/ollama/issues/18387)). No fix PR noted.
12. **License notices missing from release artifacts** — statically linked MIT projects like llama.cpp are not distributing copyright notices; 275 👍, ongoing compliance concern ([#3185](https://github.com/ollama/ollama/issues/3185)). No fix PR noted.

## 6. What This Means for Application Developers
- **If you use the Anthropic-compatible endpoint or Claude Code**, avoid relying on system-role messages inside `messages`; positional system messages are being hoisted and will hurt prefix-cache reuse until [#18431](https://github.com/ollama/ollama/issues/18431) is fixed.
- **For Qwen3-Coder tool use**, sort/pin tool schema keys where possible to reduce cache misses, and avoid large numeric arguments outside `int64` or wait for [#18422](https://github.com/ollama/ollama/pull/18422).
- **Cloud model JSON schemas are not reliable** — validate structured outputs client-side, especially with `qwen3-coder:480b-cloud` ([#12362](https://github.com/ollama/ollama/issues/12362)).
- **Codex responses API users**: check for empty `output_text` and zero token counts on `previous_response_id` tool follow-ups before shipping agent loops ([#18419](https://github.com/ollama/ollama/issues/18419)).
- **Multimodal apps**: preprocess images by stripping or applying EXIF orientation; Windows Gemma 4 image handling remains broken ([#18418](https://github.com/ollama/ollama/issues/18418), [#16532](https://github.com/ollama/ollama/issues/16532)).
- **Quantization workflows**: if using `ollama create --quantize` from safetensors, monitor disk usage; current versions can leak large intermediate blobs until [#18424](https://github.com/ollama/ollama/pull/18424) lands.
- **Hardware notes**: integrated Vulkan GPU users should see relief once [#18124](https://github.com/ollama/ollama/pull/18124) ships; Jetson Orin Nano 8GB users should avoid Gemma 4 E4B multimodal until the OOM issue is resolved ([#18396](https://github.com/ollama/ollama/issues/18396)).
- **Community integrations in flight**: Genie ([#18428](https://github.com/ollama/ollama/pull/18428)), Clips Kitty ([#18423](https://github.com/ollama/ollama/pull/18423)), SlopShield ([#18420](https://github.com/ollama/ollama/pull/18420)), and n8n/ComfyUI docs ([#18316](https://github.com/ollama/ollama/pull/18316)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-14

## 1. Today's Highlights
LiteLLM published **v1.102.0-rc.1**, with the visible release note focused on **cosign Docker image signature verification** ([release](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-rc.1)). The **Rust migration** parent issue remains the highest-engagement item, targeting a gateway with **sub-1ms overhead** ([#31263](https://github.com/BerriAI/litellm/issues/31263)). The active bug queue is concentrated around **provider param leakage, `/v1/responses` streaming, spend/budget accounting, and Anthropic `/v1/messages` guardrail coverage**.

## 2. Releases & Breaking Changes
- **v1.102.0-rc.1** — RC release. Docker images are signed with cosign; verify signatures in deployment pipelines. No breaking API/config changes or migration notes were present in the provided release excerpt: [release](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-rc.1).
- Open dependency PR: **urllib3 2.6.3 → 2.7.0** ([#27663](https://github.com/BerriAI/litellm/pull/27663)). No other release-level breaking changes noted.

## 3. New Model & Hardware Support
- **Azure Kimi-K2.7-Code** support via Microsoft Foundry: closed feature request ([#32613](https://github.com/BerriAI/litellm/issues/32613)).
- **DashScope Qwen 3.6/3.7 pricing** coverage: closed issue ([#29922](https://github.com/BerriAI/litellm/issues/29922)).
- Open provider/model additions:
  - **ai& (aiand)** provider ([#38958](https://github.com/BerriAI/litellm/pull/38958)).
  - **Nanobridge** OpenAI-compatible provider ([#29591](https://github.com/BerriAI/litellm/pull/29591)).
  - **CometAPI** images/audio/moderations endpoints ([#29580](https://github.com/BerriAI/litellm/pull/29580)).
  - **OpenRouter Qwen `cache_control`** support ([#29335](https://github.com/BerriAI/litellm/pull/29335)).
- No CUDA/ROCm/Metal/CPU backend or quantization-format changes were present in this snapshot.

## 4. Performance & Optimization
- **Rust migration** is the main performance track: issue #31263 aims at a **sub-1ms-overhead** AI gateway; blog and beta-tester links are in the issue. Status: open/in progress: [#31263](https://github.com/BerriAI/litellm/issues/31263).
- **Client disconnect relay** PR #27146 is WIP and explicitly calls for regression profiling under high concurrent loads and memory-leak checks when requests are cancelled; no landed benchmark numbers yet: [#27146](https://github.com/BerriAI/litellm/pull/27146).
- No other concrete throughput, latency, or memory figures appeared in the provided data.

## 5. Stability & Regressions

**Critical / security**
- **Guardrail blind spot:** `custom_code` and `tool_permission` guardrails cannot inspect or block MCP tools sent through Anthropic `/v1/messages` format. Open, 5 comments. Related fix PRs: Anthropic passthrough pre-call hooks ([#27609](https://github.com/BerriAI/litellm/pull/27609)) and tool_result scanning ([#29594](https://github.com/BerriAI/litellm/pull/29594)): [#40583](https://github.com/BerriAI/litellm/issues/40583).
- **Information disclosure:** unauthenticated `/model/info` exposure issue closed ([#29911](https://github.com/BerriAI/litellm/issues/29911)).
- **Authorization:** model access check ignored `access_group_ids` directly on Virtual Key; closed ([#28464](https://github.com/BerriAI/litellm/issues/28464)).

**High-impact**
- **Self-hosted install failure** due to `schema.prisma` permission (`prisma generate`); open, 7 comments, 4 👍. No fix PR listed: [#26097](https://github.com/BerriAI/litellm/issues/26097).
- **Internal `optional_params` leaking into provider request bodies** causing Bedrock/embedding 400s; open issue [#30301](https://github.com/BerriAI/litellm/issues/30301), fix PR [#41025](https://github.com/BerriAI/litellm/pull/41025).
- **`chatgpt/` gpt-5.6-sol empty `response.completed.output[]`** despite streamed content; closed issue [#41017](https://github.com/BerriAI/litellm/issues/41017), fix PR [#31332](https://github.com/BerriAI/litellm/pull/31332) backfills output from `output_item.done`.
- **Streaming `/v1/responses` logger crash** (`'dict' object has no attribute 'usage'`) causing no spend log/uncharged requests; closed ([#29913](https://github.com/BerriAI/litellm/issues/29913)).
- **Budget reservation skipped** when request cost cannot be estimated, exposing budgets to concurrent overspend; open ([#35524](https://github.com/BerriAI/litellm/issues/35524)).
- **Null provider response IDs** recorded as string `"None"` and dropped as duplicate spend rows; open PR [#41026](https://github.com/BerriAI/litellm/pull/41026) falls back to call ID.
- **Vertex AI Claude versioned IDs** get silent 4096 `max_tokens` default, and haiku-4-5 map entries cap output at 8192 instead of 64000; open ([#40363](https://github.com/BerriAI/litellm/issues/40363)).
- **Valkey semantic cache** fails because `_get_async_embedding()` forwards `**kwargs` instead of `metadata`; open ([#32324](https://github.com/BerriAI/litellm/issues/32324)).
- **Streaming usage merger** retains stale cache-write tokens after explicit zero update; open ([#40736](https://github.com/BerriAI/litellm/issues/40736)).
- **Ollama custom prompt template** raises `KeyError` when `initial_prompt_value` or `final_prompt_value` omitted; open ([#39759](https://github.com/BerriAI/litellm/issues/39759)).
- **`reasoning_effort` handling:** `xhigh` silently downgraded when model map lacks capability ([#40471](https://github.com/BerriAI/litellm/issues/40471)); Responses-to-Chat bridge forwarded dict-form `reasoning_effort`, breaking strict OpenAI-compatible providers/Codex CLI; closed ([#39354](https://github.com/BerriAI/litellm/issues/39354)).
- **Componentized gateway/backend** ignores DB pool limits and IAM refresh drops URL parameters; open ([#33021](https://github.com/BerriAI/litellm/issues/33021)).
- **`langfuse_otel`** never sets observation output for `/v1/rerank`; open ([#36537](https://github.com/BerriAI/litellm/issues/36537)).
- **Cache-hit spend/token semantics:** spend is zeroed but token columns replay original usage, raising reporting-basis questions; open ([#39057](https://github.com/BerriAI/litellm/issues/39057)).
- **Budget configuration confusion** remains active with 12 comments ([#19105](https://github.com/BerriAI/litellm/issues/19105)).

**Closed/fixed in window (selected)**
- `cache_control_injection_points` no-op on `/v1/responses` and deterministic Claude tool-call loop ([#29810](https://github.com/BerriAI/litellm/issues/29810)).
- WebSocket `/v1/responses` required `?model=` query param, breaking OpenAI spec compatibility ([#25532](https://github.com/BerriAI/litellm/issues/25532)).
- `simple-shuffle` ignored weights when first healthy deployment had none ([#33329](https://github.com/BerriAI/litellm/issues/33329)).
- `model_max_budget` shared one budget window start across models/durations ([#33326](https://github.com/BerriAI/litellm/issues/33326)).
- Spend-log batches dropped on non-transport DB write failure ([#33873](https://github.com/BerriAI/litellm/issues/33873)).
- SambaNova cost map stale/incorrect ([#29011](https://github.com/BerriAI/litellm/issues/29011)).
- Prometheus endpoint missing remaining budget ([#29937](https://github.com/BerriAI/litellm/issues/29937)).
- Pass-through endpoints lacked RPM/max-concurrency limits ([#29921](https://github.com/BerriAI/litellm/issues/29921)).
- Request Logs session sidebar sort order ([#29916](https://github.com/BerriAI/litellm/issues/29916)).

**Open fix PRs worth tracking**
- Provider-boundary internal param filtering ([#41025](https://github.com/BerriAI/litellm/pull/41025)).
- Spend fallback for null response ID ([#41026](https://github.com/BerriAI/litellm/pull/41026)).
- Responses stream `sequence_number`, `text.format`, usage details ([#28899](https://github.com/BerriAI/litellm/pull/28899)).
- Router deep-copy kwargs per fallback attempt ([#27462](https://github.com/BerriAI/litellm/pull/27462)).
- Team block/unblock cache refresh ([#28752](https://github.com/BerriAI/litellm/pull/28752)).
- Anthropic adapter bug bundle ([#28684](https://github.com/BerriAI/litellm/pull/28684)).
- Fireworks AI JSON Schema field stripping ([#28698](https://github.com/BerriAI/litellm/pull/28698)).
- AssemblyAI EU region detection ([#28748](https://github.com/BerriAI/litellm/pull/28748)).
- Logging redaction for provider-specific fields/body snapshots ([#28611](https://github.com/BerriAI/litellm/pull/28611)).
- SSO login error handling ([#26405](https://github.com/BerriAI/litellm/pull/26405)).

## 6. What This Means for Application Developers
- **If you use Docker:** v1.102.0-rc.1 is an RC; verify cosign signatures before rollout. No migration steps were surfaced in the snapshot.
- **Guardrail users on Anthropic `/v1/messages`:** MCP tools may bypass `custom_code`/`tool_permission` pre-call guardrails today. Test blocking paths and track [#40583](https://github.com/BerriAI/litellm/issues/40583), [#27609](https://github.com/BerriAI/litellm/pull/27609), and [#29594](https://github.com/BerriAI/litellm/pull/29594).
- **Provider compatibility:** internal-param leakage can cause 400s on Bedrock/embeddings; [#41025](https://github.com/BerriAI/litellm/pull/41025) is the fix to watch. Also validate Vertex AI Claude `max_tokens` and Ollama prompt-template behavior.
- **Spend/budget accuracy:** audit cache-hit token reports, budget reservations, and null response IDs. Several accounting fixes are open/landed; avoid relying on uncharged or duplicate spend rows for billing.
- **Strict Responses API clients:** fixes like [#31332](https://github.com/BerriAI/litellm/pull/31332) and [#28899](https://github.com/BerriAI/litellm/pull/28899) target Codex/Grok-style stream parsers. Upgrade once available if you hit empty `response.completed` or missing sequence/usage fields.
- **New provider/model choices:** ai&, Nanobridge, CometAPI, Azure Kimi K2.7 Code, and OpenRouter Qwen `cache_control` are the notable additions/PRs to evaluate.
- **Rust gateway:** promising for low-overhead deployments, but still beta/in-progress; plan benchmarking rather than immediate production migration.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-14

## 1. Today's Highlights
No new GitHub releases landed in the last 24h; activity is concentrated on Studio installer/update reliability, agent-tool correctness, and training performance. The highest-risk items are a Studio safety-check bypass that can execute commands like `reboot`/`rm` ([#10835](https://github.com/unslothai/unsloth/issues/10835)) and systematic MCP tool-call truncation ([#10839](https://github.com/unslothai/unsloth/issues/10839)). On the infra side, PRs aim to cut repeated install/dependency validation ([#10649](https://github.com/unslothai/unsloth/pull/10649), [#10648](https://github.com/unslothai/unsloth/pull/10648)), while a B200 Qwen3.5-9B LoRA report shows GPU idle from FLA autotune-key rebuilds ([#10806](https://github.com/unslothai/unsloth/issues/10806)).

## 2. Releases & Breaking Changes
- **No new releases** in the last 24h.
- **Compatibility:** Docker image `2026.9.4` reports `SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`; the field appears to have moved to `max_length`. The issue is closed, but users on that image/package should migrate configs. ([#10785](https://github.com/unslothai/unsloth/issues/10785))

## 3. New Model & Hardware Support
- **PaliGemma v1 + v2 LoRA fine-tuning:** open PR adds support; the Gemma/Gemma2 language backbone inherits fast-attention kernels via class-level patching. ([#5218](https://github.com/unslothai/unsloth/pull/5218))
- **Linux aarch64:** open PR installs `torchcodec` from the PyTorch `cuXXX` index because PyPI lacks an aarch64 wheel. ([#4456](https://github.com/unslothai/unsloth/pull/4456))
- **Intel XPU:** XPU Triton replacement still fails; original issue closed, follow-up remains open, and the prior patch did not fully resolve it. ([#10844](https://github.com/unslothai/unsloth/issues/10844), [#10018](https://github.com/unslothai/unsloth/issues/10018))
- **Windows ARM64:** desktop installer fails on `pyarrow`, while CLI succeeds. ([#10875](https://github.com/unslothai/unsloth/issues/10875))
- **NVIDIA B200/Blackwell:** Qwen3.5-9B LoRA training on B200/CUDA 12.8/sm_100 reports FLA rebuilding its autotune key every launch. ([#10806](https://github.com/unslothai/unsloth/issues/10806))
- **Nemotron attention handling:** open bug for attention handling. ([#7527](https://github.com/unslothai/unsloth/issues/7527))

## 4. Performance & Optimization
- **Install/update caching:** PR #10649 skips dependency-pass steps when evidence holds; PR #10648 answers llama.cpp/whisper.cpp/Node installs from markers, avoiding repeated validations (13–63s macOS, ~5s Windows). ([#10649](https://github.com/unslothai/unsloth/pull/10649), [#10648](https://github.com/unslothai/unsloth/pull/10648))
- **Installer fix:** PR #10626 addresses adaptive `uv` cache selection being unreachable on writable installs. ([#10626](https://github.com/unslothai/unsloth/pull/10626))
- **KV VRAM estimator:** PR #8994 drops the unused `ctx_checkpoints` term. ([#8994](https://github.com/unslothai/unsloth/pull/8994))
- **Speculative decoding:** PR #5623 adds `spec_draft_p_min` and `ngram-map-k/k4v` wire values. ([#5623](https://github.com/unslothai/unsloth/pull/5623))
- **Training throughput:** #10806 reports GPU idle for most of each Qwen3.5-9B LoRA step on B200 due to FLA autotune-key rebuild. ([#10806](https://github.com/unslothai/unsloth/issues/10806))
- **Multi-GPU:** #10355 reports `--tensor-split` is ignored. ([#10355](https://github.com/unslothai/unsloth/issues/10355))
- **Tool output:** #10135 requests configurable truncation; current cap is ~16,000 chars. ([#10135](https://github.com/unslothai/unsloth/issues/10135))
- **RAG SQLite:** PR #10861 fixes dense retrieval on SQLite <3.41 for #8854. ([#10861](https://github.com/unslothai/unsloth/pull/10861), [#8854](https://github.com/unslothai/unsloth/issues/8854))

## 5. Stability & Regressions
Ranked by severity:

- **Critical — Studio safety bypass:** devised commands can execute `reboot`, `rm`, etc. ([#10835](https://github.com/unslothai/unsloth/issues/10835))
- **High — MCP calls systematically truncated:** cannot be bypassed; suspected deduplication issue. ([#10839](https://github.com/unslothai/unsloth/issues/10839))
- **High — RAG/project file listing and read/write/edit failures:** partial fix PR #10861 for older SQLite runtimes. ([#8854](https://github.com/unslothai/unsloth/issues/8854), [#10861](https://github.com/unslothai/unsloth/pull/10861))
- **High — Intel XPU Triton replacement still fails:** `triton-windows` shadows torch XPU Triton after the first patch. ([#10844](https://github.com/unslothai/unsloth/issues/10844), [#10018](https://github.com/unslothai/unsloth/issues/10018))
- **High — Windows ARM64 desktop installer fails on pyarrow:** CLI path works. ([#10875](https://github.com/unslothai/unsloth/issues/10875))
- **Medium — B200 Qwen3.5-9B LoRA training GPU idle:** FLA autotune rebuild. ([#10806](https://github.com/unslothai/unsloth/issues/10806))
- **Medium — `--tensor-split` ignored.** ([#10355](https://github.com/unslothai/unsloth/issues/10355))
- **Medium — Installer ignores chosen folder:** installs dependencies under `~/.unsloth`. ([#10859](https://github.com/unslothai/unsloth/issues/10859))
- **Medium — `install.ps1` flagged by antivirus.** ([#10805](https://github.com/unslothai/unsloth/issues/10805))
- **Medium — Nemotron attention handling bug.** ([#7527](https://github.com/unslothai/unsloth/issues/7527))
- **Lower — Phi3.5 single-token/binary classification loss goes to 0.** ([#946](https://github.com/unslothai/unsloth/issues/946))
- **Closed today:** Studio local HF-cache training fails on `model-00000-of-00001.safetensors` allowlist miss ([#10853](https://github.com/unslothai/unsloth/issues/10853)); duplicate tool-call guard blocks re-running tests after edit ([#10792](https://github.com/unslothai/unsloth/issues/10792)); `SFTConfig.max_seq_length` incompatibility ([#10785](https://github.com/unslothai/unsloth/issues/10785)).
- **Fix PRs open:** conversation_extension crash ([#8373](https://github.com/unslothai/unsloth/pull/8373)); adapter_config absolute path ([#5079](https://github.com/unslothai/unsloth/pull/5079)); uv unusable venv fallback ([#6766](https://github.com/unslothai/unsloth/pull/6766)); sandbox llama.cpp validation ([#6739](https://github.com/unslothai/unsloth/pull/6739)).
- **Tool-nudge behavior:** closed PR #5052 softens tool-use nudging for small models; #9686 revisits default-on tool-call nudging. ([#5052](https://github.com/unslothai/unsloth/pull/5052), [#9686](https://github.com/unslothai/unsloth/issues/9686))

## 6. What This Means for Application Developers
- **Do not expose Unsloth Studio tool execution to untrusted prompts** until #10835 is patched; the safety guard is bypassable.
- **Agent workflows using MCP/RAG should assume truncation and file-listing gaps** (#10839, #8854, #10135); budget for chunking, retries, or pin a patched build. Older SQLite runtimes get a targeted RAG fix via #10861.
- **Install/update paths remain fragile** on Windows ARM64, Intel XPU, AV-protected Windows, and custom install folders; prefer CLI where desktop installer fails and pin known-good package versions.
- **Training on B200/Qwen3.5-9B:** watch FLA autotune-key behavior (#10806) and tensor-split support (#10355); migrate `max_seq_length` to `max_length` on Docker `2026.9.4` (#10785).
- **Requested but not landed:** Agent Builder profiles ([#10773](https://github.com/unslothai/unsloth/issues/10773)), folder-based projects ([#10873](https://github.com/unslothai/unsloth/issues/10873)), multi-drive model libraries ([#10872](https://github.com/unslothai/unsloth/issues/10872)), GPU split fields ([#10877](https://github.com/unslothai/unsloth/issues/10877)), and better default Studio/llama-server logs ([#10793](https://github.com/unslothai/unsloth/issues/10793)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*