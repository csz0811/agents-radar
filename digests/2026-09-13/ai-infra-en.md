# AI Infrastructure Digest 2026-09-13

> Generated: 2026-09-13 00:17 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — AI Infrastructure Ecosystem
**Data window:** 2026-09-13 (24h digests) · **Projects:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth

---

## 1. Ecosystem Overview

Activity today is overwhelmingly *reactive* rather than *additive*: no project shipped a versioned release in the last 24h, yet SGLang logged 338 PR updates and LiteLLM 241, with the bulk of work going into hardware enablement and bug suppression rather than new capability. **DeepSeek-V4.1-Flash is the single forcing function** across the stack — it is driving SM8x/Ampere support requests and SM120/SM121 correctness failures in vLLM, silent 25% GEMM error and CUDA-graph capture failures in SGLang, and only a *user request* (no implementation) in Ollama and Unsloth. The most dangerous class of defect in this window is **silent numerical corruption** (quantized MoE routing, FP8 absorb GEMMs, Marlin W4A8-FP8) rather than crashes — several of which produce plausible token streams with no error surfaced. Meanwhile the training/fine-tuning layer is absorbing collateral damage from upstream `trl`/`accelerate` churn, and the gateway layer is fighting cost-accounting correctness. The net picture: **frontier serving engines are shipping kernel-level performance while still fighting correctness regressions on the newest Blackwell parts**, and local runtimes are a full model generation behind on datacenter-class checkpoints.

---

## 2. Activity Comparison

| Project | Layer | Issues (24h) | PRs (24h) | Releases | Status Notes |
|---|---|---|---|---|---|
| **vLLM** | Serving engine (datacenter) | n/d (heavy; 12+ issues itemized) | n/d (10+ PRs itemized) | **None** | 3 living upgrade trackers open (Transformers v5, batch-invariant, zero-JIT). 12 open stability items, 1 CUDA IMA crash. |
| **SGLang** | Serving engine (datacenter) | **26** updates | **338** updates | **None** | CI: 3 broken, 9 flaky, 997 recently fixed. 2 critical silent/crash bugs, no fix PR. |
| **llama.cpp** | Local/edge runtime | n/d (8+ issues itemized) | n/d (6+ PRs itemized) | **b10923–b10934** (12 builds) | Only project shipping continuously. 5 high-severity open regressions. |
| **Ollama** | Local runtime + distribution | n/d (10+ issues itemized) | n/d (8+ PRs itemized) | **None** | 1 critical KV-bleed bug, 3 high-severity. Two behavior-change PRs pending (`OLLAMA_CONTEXT_SHIFT`, thinking budget). |
| **LiteLLM** | LLM gateway / proxy | **33** touched | **241** touched | **None** | 2 competing bot-generated catalog syncs (83 new models) need consolidation. 2 unfixed install/crash-loop blockers. |
| **Unsloth** | Fine-tuning / training | n/d (10+ issues itemized) | n/d (12+ PRs itemized) | **None** | `main` was red since 09-11, poisoning ~25 PRs; fix landed today. Training broken in `unsloth:latest` on GPU hosts (fixed). |

> **Caveat:** "updates/touched" ≠ net-new. Only SGLang and LiteLLM published aggregate counts; the others itemize notable items. Treat counts as an activity *signal*, not a like-for-like metric.

**Reading:** SGLang and LiteLLM are the highest-churn projects; llama.cpp is the only one with a release cadence, which reflects its rolling-build model rather than higher velocity. vLLM's activity is disproportionately concentrated in *silent-correctness triage* — the ratio of bug items to feature items is the worst in the set.

---

## 3. Model Support Race

**Frontier datacenter models — vLLM and SGLang are neck-and-neck, both incomplete.**

| Model | vLLM | SGLang | llama.cpp | Ollama |
|---|---|---|---|---|
| **DeepSeek-V4.1-Flash** | SM120/121 **fails** (#56461); ROCm MI355X runs w/ headroom wasted (#56506); SM8x unsupported | SM121 silent 25% GEMM error (#39193); MXFP4 deep_gemm capture fail (#39226); gfx950 FP8 two-pool unified KV **enabled** (#37413) | No support | **Requested only** (#10838) |
| **DeepSeek-V4-Flash/-0731** | SM8x unsupported (#50576, 108 comments); wrong-token bug at len ≡3 mod 4 | — | No support | — |
| **GLM-5.2 / 5.3** | de-JITification (#55348/56323); 5.3-Flash word-salad bug (#56605) | Tool-parser union fix (#39136) | **Corrupted output** on dense-MLA CUDA (#26027) | — |
| **Kimi K3** | Perf tracker (#50587) | PP8 TTFT ~30s floor (#34815) | — | — |
| **Qwen3.5 / Qwen4** | Hybrid GDN prefix-cache fix (#52244); QSA indexer OOM (#56457) | — | Sparse-FA PR (#28770) | — |
| **MiniMax H3** | — | VibeCUDA MSA integration (#39233) | GGUF Conv3D load fail (#38904) | — |
| **Gemma 4** | — | Gemma 4 detector fix (#39240) | OpenVINO load fail (#24415) | Unified vision PR (#16879) |
| **ELMOD 2.7b** | — | — | Conversion PR (#28818) | — |

**Who's ahead:** **vLLM** has the broadest hardware matrix (SM8x → SM100/103 → SM120/121, plus ROCm MI355X) and is the reference target for new checkpoints — its deficit is *Ampere support for DSv4-Flash*, which does not exist at all. **SGLang** leads on *second-platform depth*: it is the only project with active gfx942/gfx950, NPU HiCache, and Apple/MLX paths landing today, and it moved first on FP8 two-pool unified KV for DSv4 on AMD. **llama.cpp and Ollama are effectively one generation behind** on datacenter MoE checkpoints; llama.cpp's realistic 2026 role is GGUF-quantized mid-size models (Qwen, Gemma, Llama), not DSv4.1-class serving.

---

## 4. Performance Frontier

| Vector | vLLM | SGLang | llama.cpp | Unsloth |
|---|---|---|---|---|
| **KV cache / offload** | KV-offload CPU store fixes (#56621); NIXL PCP/DCP shards (#56645); hybrid-GDN prefix cache under MTP (#52244) | HiCache prefix-hit correctness (#39147); ROCm FP8 KV path (#37413) | 4-bit KV CPU fallback — **~30× slowdown** (#28633); slot save/restore broken for hybrid models (#25913) | — |
| **Distributed serving** | Low-SM multimem reduce-scatter SM100/103 (#55072); ROCm elastic EP deadlock fix (#56610) | PP8 disaggregated prefill TTFT floor (#34815); contention-aware EPLB RFC (#39192) | — | — |
| **Quantization** | NVFP4 NaN sentinel (#52501); Marlin W4A8-FP8 *silently corrupts* (#49546); RDNA3 W4A16 MoE refactor (#44460) | FP8 `wo_a` absorb GEMM **~25% numeric error** on SM121 (#39193); packed FP4 KV request (#38902) | cuBLAS fallback for IQ quants on Blackwell (#28823); Vulkan IQ3_S MMQ (#28822) | **EXL3 backend** — 2-bit + **MoE quant** where bitsandbytes can't (#7115) |
| **Kernels / fusion** | DSv4.1 mHC fold into delayed pre-projection (#56633); DeepSeek DeepSelect TopK (#56464); de-JITification (#55348/56323) | `trtllm_mla` fused FP8 KV/Q on verify (#39232); MegaMoE SM-budget fix (#39223) | Sparse FA for Qwen4 (#28770); GCN HIP config table landed (b10929) | CPU-side per-step overhead: B200 LoRA SFT **0.85s → 0.66s/step** (#10744) |
| **Speculative decoding** | DFlash: IMA crash, FSM failures, 4× *slowdown* at 185k ctx (#54691) | Quantized DFlash2 draft → **~0% acceptance, slower than no drafter** (#39087); ngram roadmap (#21052) | MTP: ~1.7× on RTX 5090 native Linux, **~57× prefill slowdown** on Windows MSVC (#28790) | — |
| **Multimodal / TTFT** | FP8 text TTFT **−34.5%** at 5 req/s (#56305) | Vectorized diffusion JointThreshold (#34122) | — | — |

**Where the effort is concentrated — four observations:**

1. **Speculative decoding is the loudest battleground and the least reliable.** All three engines shipped or debugged spec-decode work today, and all three have open reports where the drafter *loses* to no-drafter (vLLM long-context, SGLang quantized drafts, llama.cpp Windows MTP). Acceptance rate is not being monitored as a first-class metric, which is why these go undetected.
2. **Quantization correctness, not speed, is the bottleneck.** Every silent-corruption bug in this window is quantization-adjacent (FP8 absorb GEMM, Marlin W4A8-FP8, MXFP4 deep_gemm, IQ quants on Blackwell). The 2.5% kernel speedup in vLLM #49546 is explicitly not worth the corruption.
3. **KV cache is shifting from a memory problem to a correctness-and-coverage problem** — offload watermarks, prefix-hit accounting under hybrid/recurrent models, and NIXL shard exposure dominate over raw capacity work.
4. **Training-side headroom on Blackwell is host-side, not kernel-side** — Unsloth's 22% step-time win came from per-step CPU overhead, which is a materially different optimization target than the serving engines'.

---

## 5. Layer Positioning

| Layer | Project | Primary Role | Deployment Target | Differentiation |
|---|---|---|---|---|
| **Datacenter serving engine** | **vLLM** | High-throughput multi-tenant inference | 8×H20/H100/B200/MI355X clusters | Broadest hardware matrix; DeepSeek/GLM de-facto reference; strongest MoE + quant kernel surface |
| **Datacenter serving engine** | **SGLang** | Serving + structured-output/agent frontend | Same, plus AMD/NPU/Apple | Ahead on PD disaggregation, Radix/HiCache, parser correctness, second platforms |
| **Local/edge runtime** | **llama.cpp** | Single-binary inference, GGUF | RTX 50xx, RDNA3/4, Intel Arc, Apple, CPU | Only true cross-platform runtime; rolling builds; IQ/K-quant ecosystem owner |
| **Local runtime + distribution** | **Ollama** | CLI/desktop model UX, wraps llama.cpp | Workstations, Strix Halo, Jetson, Windows/macOS | Owns the *developer onboarding* layer, not the kernel layer; inherits llama.cpp limits |
| **LLM gateway** | **LiteLLM** | Provider abstraction, routing, cost/budget | Proxy in front of *all* of the above | Cross-provider catalog, spend tracking, guardrails; not in the inference datapath |
| **Fine-tuning** | **Unsloth** | LoRA/QLoRA SFT + GRPO, Studio app | Single-GPU B200/4090, ROCm | Memory-efficient training + MoE quantization (EXL3); upstream-dependency-sensitive |

**Key structural insight:** these are **not competitors across the board**. LiteLLM sits *above* vLLM/SGLang/Ollama as a router — and today's digest shows exactly that layer's failure mode: `openai/`-prefixed self-hosted models silently routed to the Responses API, dropping multimodal content for vLLM/SGLang/TGI backends. Ollama sits *above* llama.cpp. Unsloth is orthogonal — it consumes Hugging Face checkpoints and produces weights that the serving engines then run. The only genuine head-to-head is **vLLM vs. SGLang** at the datacenter serving layer, and **llama.cpp vs. Ollama** at the local layer (where Ollama is a wrapper, not a kernel competitor).

---

## 6. Trend Signals

**1. New-model enablement is now gated by hardware correctness, not by model code.** DSv4.1-Flash "runs" on SM120/SM121 in both engines — it just returns wrong numbers or fails graph capture after loading 75 GB of weights. The practical constraint for capacity planning in 2026 is *validated (model × GPU × quant recipe)* triples, not model availability.

**2. Silent corruption is the dominant risk class — instrument for it.** Silent output corruption (vLLM #49546, SGLang #39193, Ollama all-zero embeddings returning HTTP 200, llama.cpp IQ quants on Blackwell) outnumbers crashes in this window. **Action:** add output-sanity canaries (repeated-token detection, sentinel prompts, non-zero embedding assertions) to your deployment gates — none of these bugs produce a log line.

**3. Speculative decoding needs a kill switch and an acceptance metric.** Every engine has at least one open report where spec-decode is a *net loss* (vLLM #54691, SGLang #39087, llama.cpp #28790) and one where it breaks a downstream contract (grammar FSM #53777, YaRN prefix cache #54094). **Action:** gate spec-decode per request by context length and grammar mode; alert on acceptance rate <1.5.

**4. Determinism is becoming a first-class requirement for RL/eval.** vLLM's batch-invariance break under sequence parallelism (#56370) and SGLang's bit-identical-kernel-but-different-greedy-output case (#39235) both land today. **Action:** RL and eval pipelines should pin non-SP configs and treat batch-invariance as a tested invariant.

**5. Prefix/radix caching under hybrid (Mamba/GDN) architectures is a live correctness frontier.** vLLM #54094 (zero reuse on 1.04M prompts), SGLang #39147 (unrestorable prefix hits), llama.cpp #25913 (slot save/restore for recurrent models). Cost-per-request gains are real but the accounting is not yet trustworthy.

**6. Gateway economics are under-audited.** LiteLLM has open overbilling (realtime cached audio ~2×), under-billing (Azure spend → $0, OCR → $0), and false budget-exceeded paths — in the same window. **Action:** reconcile gateway-reported spend against provider invoices; do not treat LiteLLM's budget enforcement as authoritative yet.

**7. Upstream dependency churn is a top-tier production risk in the training stack.** `accelerate` 1.15.0 broke *all* Windows ROCm training; TRL ≥0.20 removed kwargs still emitted by Unsloth Studio; and a two-day red `main` poisoned ~25 PRs. **Action:** pin `accelerate` <1.15 and `trl` explicitly; rebuild Studio Docker images from today's fix.

**8. AMD/NPU is now a genuine second platform — with a performance tax.** SGLang landed gfx942, gfx950, and NPU paths today; vLLM has an MI355X baseline but "significant device headroom unused"; llama.cpp added a GCN config table. **Action:** budget for tuning effort, not parity, on ROCm today.

**9. Client-disconnect robustness is a shared blind spot.** SGLang's engine-wide crash on a single dropped client (#39216) is the most severe single bug in this window; Ollama's keep-alive-disabled loopback exhaustion (#18392) is the same failure family. **Action:** every gateway in front of these engines needs retry, backoff, and health-check failover — graceful degradation should not be assumed.

**10. Tool-calling and structured output remain the highest-leverage reliability work.** Across all six projects, parser/grammar fixes are the largest cluster of *agent-facing* changes: llama.cpp's `common_schema` refactor (b10934), three SGLang parser fixes, two Ollama Gemma4 parsing fixes. **Action:** if you run agents, this is the upgrade category with the clearest user-visible payoff — and the most schema-edge-case regression risk.

---

**Bottom line for decision-makers:** the datacenter serving layer (vLLM, SGLang) is in a *correctness-defensive* posture on Blackwell — feature velocity is high but validated configurations are narrowing. Pin to validated (model × GPU × quant) recipes, instrument for silent output corruption, gate speculative decoding aggressively, and treat the gateway and training layer as the two places where *upstream churn*, not your own code, is the most likely source of a production incident this week.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-13

## Today's Highlights
No new releases landed in the past 24h, but activity is dominated by DeepSeek-V4.1-Flash enablement and its fallout: new SM8x/Ampere support requests, ROCm performance gaps on MI355X, and several hardware-specific correctness bugs on Blackwell/SM12x. A dense cluster of speculative-decoding (DFlash) reports — illegal memory access, grammar-FSM failures, and long-context slowdowns — plus active KV-offload/de-JITification PR work round out the day.

## Releases & Breaking Changes
None in the last 24h. Ongoing upgrade trackers worth watching:
- [Issue #38379](https://github.com/vllm-project/vllm/issues/38379) — Transformers v5 upgrade tracker (living list of blockers).
- [Issue #27433](https://github.com/vllm-project/vllm/issues/27433) — Batch-invariant feature/perf optimization tracker (93 comments).
- [Issue #49349](https://github.com/vllm-project/vllm/issues/49349) — "Zero JIT compilation during runtime" adoption tracker.

## New Model & Hardware Support
- [Issue #50576](https://github.com/vllm-project/vllm/issues/50576) — **SM8x (Ampere A100/A800, RTX 30xx) support for DeepSeek-V4-Flash / -0731** remains the top-engagement item (108 comments, 16 👍); neither checkpoint currently runs on SM8x.
- [Issue #56461](https://github.com/vllm-project/vllm/issues/56461) — DeepSeek-V4.1-Flash **cannot serve on SM120/SM121 (GB10)** at `e77daef89`: SWA cache block 32 vs SM120 decode page 64, and indexer `block_kv=128` vs DeepGEMM sm120 (64 only).
- [Issue #56506](https://github.com/vllm-project/vllm/issues/56506) — RFC for **DeepSeek-V4.1-Flash on ROCm** (MI355X/gfx950); MXFP4 MoE + DSpark MTP runs but leaves significant device headroom unused.
- [Issue #44460](https://github.com/vllm-project/vllm/issues/44460) — Refactor of **RDNA3 W4A16 MoE dispatch** to the oracle/expert-class pattern.
- [PR #55802](https://github.com/vllm-project/vllm/pull/55802) — Removes the DCP indexer interleave guard, enabling configs like DCP with NIXL (interleave 64).
- [PR #56645](https://github.com/vllm-project/vllm/pull/56645) — **NIXL PCP/DCP**: expose PCP producer KV shards as transfer ranks (GLM-5.2-NVFP4, PCP4+TP1+EP4+DCP4 → TP4).

## Performance & Optimization
- [PR #56633](https://github.com/vllm-project/vllm/pull/56633) — **DSv4.1**: fold the mHC post block into the delayed pre projection, eliminating a redundant residual re-read at every seam.
- [PR #56305](https://github.com/vllm-project/vllm/pull/56305) — Triton image masks + FlashInfer causal attention composite for **multimodal prefix attention**; **FP8 text TTFT 34.5% lower** at a fixed 5 req/s.
- [PR #55072](https://github.com/vllm-project/vllm/pull/55072) — Low-SM **multimem reduce-scatter** for SM100/SM103 MNNVL groups (TP2/4/8), ≤8 CTAs/GPU.
- [PR #56464](https://github.com/vllm-project/vllm/pull/56464) — Integrates **DeepSeek DeepSelect TopK** for the DSA sparse indexer, making every decode top-k implementation selectable.
- [PR #52244](https://github.com/vllm-project/vllm/pull/52244) — Restores **hybrid GDN prefix-cache hits under MTP spec decoding** (Qwen3.5-122B-A10B case where prompts aligned to the hash unit got zero hits).
- [PR #56512](https://github.com/vllm-project/vllm/pull/56512) — DS V4.1 **Engram async prefetch** for offloaded lookups plus engram DP sharding.
- [PR #55348](https://github.com/vllm-project/vllm/pull/55348) / [PR #56323](https://github.com/vllm-project/vllm/pull/56323) — GLM-5.2/5.3 and DSv4 **de-JITification** and warmup migration for sampling/DFlash JIT kernels.
- [Issue #50587](https://github.com/vllm-project/vllm/issues/50587) — Kimi K3 performance optimization tracker; [Issue #38256](https://github.com/vllm-project/vllm/issues/38256) — Incremental MoE expert offloading RFC (GPU cache + async pipeline, LFRU eviction).
- [Issue #56506](https://github.com/vllm-project/vllm/issues/56506) — Baseline ROCm numbers: 8× MI355X, TP4, MXFP4 MoE + DSpark MTP → 35.89 out tok/s (8.97/GPU) at concurrency 1, TTFT p50 0.898s.

## Stability & Regressions
Ranked by severity (crashes/corruption first):

1. [Issue #56389](https://github.com/vllm-project/vllm/issues/56389) — **CUDA illegal memory access** in the Triton `dsv4_topk` MoE routing kernel on 8× H20 (SM90) under high concurrency; mitigated by `max_num_seqs=256`.
2. [Issue #49546](https://github.com/vllm-project/vllm/issues/49546) — `VLLM_MARLIN_INPUT_DTYPE=fp8` (Marlin W4A8-FP8) **silently corrupts output** on GB10/sm_121a — WNA16 INT4 MoE emits repeated `</think>` loops at temp 0 (~2.5% kernel speedup is not worth it).
3. [Issue #56457](https://github.com/vllm-project/vllm/issues/56457) — Qwen4Exp QSA indexer: per-chunk logits buffer growth causes **device OOM/hang** on unified-memory GB10 (SM121) during long prefill.
4. [Issue #56461](https://github.com/vllm-project/vllm/issues/56461) — DeepSeek-V4.1-Flash **fails to serve on SM120/SM121** (cache block/page and indexer block_kv mismatches).
5. [Issue #56605](https://github.com/vllm-project/vllm/issues/56605) — GLM-5.3-Flash degenerates into **repeated-token "word salad"** in multi-turn agentic use.
6. [Issue #55927](https://github.com/vllm-project/vllm/issues/55927) — DeepSeek-V4-Flash-0731 deterministic **wrong token on deep-context retrieval** at prompt lengths ≡ 3 (mod 4); reproduced across providers.
7. [Issue #53777](https://github.com/vllm-project/vllm/issues/53777) — DFlash2 spec decode + xgrammar: deterministic **"Failed to advance FSM"** on `json_object` grammar.
8. [Issue #54691](https://github.com/vllm-project/vllm/issues/54691) — DFlash is a **net loss at long context** on hybrid GDN models: 185k-context decode drops 71 → 16 tok/s (DT=4); no per-sequence-length disable hook.
9. [Issue #54094](https://github.com/vllm-project/vllm/issues/54094) — DFlash2 + YaRN: **zero prefix-cache reuse** for 1.04M prompts while target-only reuses ~1.039M tokens. WIP fix in [PR #54381](https://github.com/vllm-project/vllm/pull/54381) (mamba/draft-group investigation).
10. [Issue #56370](https://github.com/vllm-project/vllm/issues/56370) — **Batch invariance broken** when sequence parallelism / async TP is enabled (`VLLM_BATCH_INVARIANT=1` + `pass_config.enable_sp`).
11. [Issue #51782](https://github.com/vllm-project/vllm/issues/51782) — `persistent_topk` **silently drops candidates** when many values share a coarse histogram bin (B300/sm103).
12. [Issue #51562](https://github.com/vllm-project/vllm/issues/51562) — GatedDeltaNet metadata builder misclassifies a stateless first chunk as decode, reading un-zeroed recurrent state.

Notable fixes/cleanup:
- [PR #52501](https://github.com/vllm-project/vllm/pull/52501) — NVFP4: detect unloaded `weight_scale` with a NaN sentinel at load time instead of emitting NaN later.
- [PR #56621](https://github.com/vllm-project/vllm/pull/56621) — KV offload: submit CPU stores on no-forward steps to avoid dropped copies / false completion watermarks.
- [PR #56610](https://github.com/vllm-project/vllm/pull/56610) — ROCm elastic EP scaling deadlock fix (RCCL root cause).
- Closed: [Issue #52644](https://github.com/vllm-project/vllm/issues/52644) (ROCm DeepSeek V4 accuracy with MRV2 + FULL_DECODE_ONLY graph), [Issue #42024](https://github.com/vllm-project/vllm/issues/42024) (NIXL connector silently disabling HMA, halving KV capacity).

## What This Means for Application Developers
- **H20 + DeepSeek-V4.1-Flash**: cap `max_num_seqs` at 256 until #56389 is fixed; higher concurrency can crash the engine via the Triton top-k kernel.
- **Blackwell / SM12x (GB10, RTX PRO 6000)**: exercise caution with NVFP4 and Marlin W4A8-FP8 quantization — there are active silent-corruption and OOM reports. Prefer validated recipes until #49546/#56457/#52501 settle.
- **Speculative decoding**: DFlash is a short-context win only; at ~185k context it can be 4× slower than no spec decode (#54691), and it interacts badly with JSON-grammar structured output (#53777) and YaRN prefix caching (#54094).
- **Ampere (A100/A800) users**: DeepSeek-V4-Flash/-0731 is still unsupported on SM8x (#50576) — plan capacity accordingly.
- **ROCm shops**: MI355X runs DSv4.1-Flash but with substantial performance left on the table (#56506); expect tuning work, not out-of-the-box parity.
- **RL/eval pipelines relying on determinism**: batch invariance plus sequence parallelism/async TP is currently broken (#56370) — pin to non-SP configs if reproducible outputs matter.
- **Long-context multitenant serving**: watch the prefix-cache fixes for hybrid GDN under MTP ([PR #52244](https://github.com/vllm-project/vllm/pull/52244)) and multimodal TTFT gains ([PR #56305](https://github.com/vllm-project/vllm/pull/56305)) — both directly reduce cost per request.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-13

*Data window: 2026-09-12 → 2026-09-13 · Source: github.com/sgl-project/sglang*

---

## 1. Today's Highlights

No new releases landed in the last 24h; activity was dominated by 26 issue updates and 338 PR updates, with a heavy tail of Blackwell/SM121 correctness bugs and a fresh `trtllm_mla` spec-decoding fusion PR. The CI tracker reports **3 broken and 9 flaky tests** on `main` as of 2026-09-13 00:15 UTC, alongside 997 recently fixed. Most concerning items are a **silent ~25% numerical error** in the DeepSeek-V4.1 FP8 `wo_a` absorb GEMM on SM121 and an **engine-wide crash triggered by client disconnect**.

---

## 2. Releases & Breaking Changes

**No releases in the last 24h.**

Behavioral changes worth flagging to deployers:

- **`/v1/responses` persistence is now gated behind `--enable-response-store` and defaults OFF** — [PR #39122](https://github.com/sgl-project/sglang/pull/39122). Motivated by two unbounded in-memory dicts (`response_store`, `msg_store`) with no TTL/eviction, plus PD-specific correctness problems where a prefill node's bookkeeping diverges from decode. If you depend on response retrieval across nodes, you must opt in explicitly.
- **[inactive, RFC] Weight loading refactor closed** — [Issue #24703](https://github.com/sgl-project/sglang/issues/24703). Proposal to abstract the ~50–150 line `load_weights` routine duplicated across 165 model files. Closed as inactive, so expect the status quo to persist.
- **[inactive] Unified Radix Cache split into `TreeCore`** closed — [Issue #30145](https://github.com/sgl-project/sglang/issues/30145).

---

## 3. New Model & Hardware Support

| Area | Change | Link |
|---|---|---|
| **Blackwell / MiniMax** | Standalone VibeCUDA MSA integration — explicit routing to FlashInfer `backend="vibecuda"`, fail-closed provider selection, CUDA-Graph-safe metadata staging and lifetime handling | [PR #39233](https://github.com/sgl-project/sglang/pull/39233) |
| **AMD gfx942** | Decouple DSA indexer projection fusion from CUDA-only fused rotary/quant/cache-write; the two replicated `wk`/`weights_proj` projections can share one BF16 GEMM while retaining HIP Hadamard path | [PR #39243](https://github.com/sgl-project/sglang/pull/39243) |
| **AMD gfx950** | Enable FP8 two-pool `unified_kv` for DeepSeek-V4 | [PR #37413](https://github.com/sgl-project/sglang/pull/37413) |
| **NPU** | DeepSeek-V4 host memory cache management (HiCache / unified radix / memory pool) | [PR #37382](https://github.com/sgl-project/sglang/pull/37382) |
| **ROCm** | Admit unified Triton router on ROCm including single-group routing; kernel was never CUDA-specific. CUDA behavior byte-identical with flag off (merged/closed) | [PR #38328](https://github.com/sgl-project/sglang/pull/38328) |
| **Apple / MLX** | Resolve headless trunk for VL-family wrappers (e.g. `Qwen3_5ForConditionalGeneration`) so chunked-prefill non-final chunks stop computing full-vocab logits; init Mamba grid attrs to fix `no_buffer` warmup crash | [PR #39242](https://github.com/sgl-project/sglang/pull/39242), [PR #39238](https://github.com/sgl-project/sglang/pull/39238) |
| **Quantization** | Feature request: store DeepSeek-V4.1 C1/C2 main KV in packed FP4 on Hopper | [Issue #38902](https://github.com/sgl-project/sglang/issues/38902) |

---

## 4. Performance & Optimization

**Landed / in review:**

- **`trtllm_mla` target verify reuses fused FP8 KV/Q prepare** — [PR #39232](https://github.com/sgl-project/sglang/pull/39232) closes [Issue #39107](https://github.com/sgl-project/sglang/issues/39107). `forward_decode` already fused bf16→fp8 quantize + KV scatter + `[q_nope | q_rope]` concat into one `set_mla_kv_concat_q_fp8` launch; target verify was still dispatching through `forward_extend` with redundant work. Direct spec-decoding latency win.
- **MegaMoE buffer allocation respects effective SM budgets** — [PR #39223](https://github.com/sgl-project/sglang/pull/39223). DeepGEMM derives MegaMoE buffer size/layout from runtime SM count; SGLang's SM budget was being ignored, mis-sizing buffers.
- **`--startup-weight-load-mode=auto`** — [PR #35259](https://github.com/sgl-project/sglang/pull/35259). Hardens startup weight-load overlap with an auto mode that admits only validated configs; `serial` remains default.
- **KDA: ReplaySSM ring-write in fused chain-verify kernel** — [PR #36821](https://github.com/sgl-project/sglang/pull/36821). Previously mutually exclusive with `--enable-linear-replayssm` + spec ring.
- **Diffusion: vectorized JointThreshold decoding on CUDA** — [PR #34122](https://github.com/sgl-project/sglang/pull/34122). Replaces the per-row Python path that serialized argmax/confidence/edit/completion across requests and synchronized host↔device repeatedly. Also: [PR #39206](https://github.com/sgl-project/sglang/pull/39206) makes diffusion CI perf failures terminal and requires valid E2E latency on every testcase.
- **[CLOSED] Unified-cache default-flip regression on Spark/Thor** — [Issue #36131](https://github.com/sgl-project/sglang/issues/36131). Long-prefix decode throughput regression traced to merge `ebc144ce` / [PR #34653](https://github.com/sgl-project/sglang/pull/34653) is now closed.

**In-progress / measurement:**

- **DeepSeek-V4 SM120 decode pads `q` to 64 heads to satisfy an SM90 constraint** — [Issue #39235](https://github.com/sgl-project/sglang/issues/39235). Removing the pad is worth **0.50% of a decode step at TP4**, but the reporter notes the kernel is bit-identical yet greedy output changes after pad removal — needs a second opinion before any PR.
- **PP8 disaggregated prefill: load-independent ~30s TTFT floor on Kimi-K3** — [Issue #34815](https://github.com/sgl-project/sglang/issues/34815).
- **FP8 KV-cache decode slowdown from unfused K/V quantization + per-layer Q conversion** — [Issue #30815](https://github.com/sgl-project/sglang/issues/30815).
- **[RFC] Contention-aware batching for dynamic EPLB expert migration** — [Issue #39192](https://github.com/sgl-project/sglang/issues/39192).
- **Ngram speculative decoding roadmap** — [Issue #21052](https://github.com/sgl-project/sglang/issues/21052).
- **DeepGEMM release validation** currently times out on H200 and fails 6 invocations per Blackwell runner (attention alone 106–195 min); [PR #39241](https://github.com/sgl-project/sglang/pull/39241) fixes missing TileLang/TileKernels deps and bounds GPU validation (closed).

---

## 5. Stability & Regressions

Ranked by severity:

**Critical**

1. **Client disconnect crashes the entire engine** — [Issue #39216](https://github.com/sgl-project/sglang/issues/39216). An uncaught `asyncio.CancelledError` bypasses `except Exception`, taking down the whole engine on a single dropped client. Repro'd on 4× RTX 6000D (SM120), `lmsysorg/sglang:dev-dsv41`, DeepSeek-V4.1. **No fix PR yet.**
2. **Silent ~25% numerical error in DeepSeek-V4.1 FP8 `wo_a` absorb GEMM** — [Issue #39193](https://github.com/sgl-project/sglang/issues/39193). On SM121 (GB10), when `deep_gemm_wrapper.DEEPGEMM_SCALE_UE8M0` is false, the non-ue8m0 branch passes per-token activation scales that are not powers of two. **No error, no warning — wrong outputs.** **No fix PR yet.**

**High**

3. **`--moe-runner-backend deep_gemm` accepted for DSV4.1 MXFP4 experts, then fails in CUDA graph capture** — [Issue #39226](https://github.com/sgl-project/sglang/issues/39226). Fails at `layout.hpp:108` on sm_121 only *after* loading 75 GB of weights over four minutes. Validation gap; wasted startup cost.
4. **Quantized DFlash2 draft yields ~0% acceptance silently** — [Issue #39087](https://github.com/sgl-project/sglang/issues/39087). Checkpoint loads and serves without error or warning; acceptance collapses ~3.7 → ~1.0 and decode drops *below* no-drafter speed. Unquantized weights work fine.
5. **DeepSeek-V4.1-Flash + Engram profiled SPS table dies in CUDA-graph capture** — [Issue #39173](https://github.com/sgl-project/sglang/issues/39173). "engram target-verify expects one equal block per request" with compact ragged verify.
6. **PP8 disaggregated prefill ~30s TTFT floor on Kimi-K3** — [Issue #34815](https://github.com/sgl-project/sglang/issues/34815).

**Medium**

7. **`sgl_kernel` flash_attn advertises sm_89 but ships no sm_89 cubin** — [Issue #38980](https://github.com/sgl-project/sglang/issues/38980). `is_fa3_supported()` accepts sm_89 (RTX 4080 SUPER) and fails with a raw CUDA error instead of a clean rejection; the `ver` argument is also ignored.
8. **`HiCacheFile.batch_exists_v2()` reports unrestorable prefix hits for hybrid cache pools** — [Issue #39147](https://github.com/sgl-project/sglang/issues/39147). Takes the min of per-pool longest prefixes, which is wrong for non-contiguous coverage.
9. **`include_reasoning=false` still emits reasoning content** across responses, chat completions, and completions — [Issue #39103](https://github.com/sgl-project/sglang/issues/39103).
10. **MiniMax H3 GGUF text encoder fails loading folded Conv3D patch embedding** — [Issue #38904](https://github.com/sgl-project/sglang/issues/38904).
11. **SM120 q-padding change alters greedy output despite bit-identical kernel** — [Issue #39235](https://github.com/sgl-project/sglang/issues/39235). Determinism concern.

**Closed this window**

- SWA branching attaching a later Mamba checkpoint to an earlier prefix — [Issue #38815](https://github.com/sgl-project/sglang/issues/38815).
- DFlash missing Mamba checkpoints when accepted tokens cross a tracking boundary — [Issue #37817](https://github.com/sgl-project/sglang/issues/37817).
- Unified-cache throughput regression on Spark/Thor — [Issue #36131](https://github.com/sgl-project/sglang/issues/36131).

**CI health**

- Tracking issue [Issue #17050](https://github.com/sgl-project/sglang/issues/17050): **3 broken, 9 flaky, 997 recently fixed** as of 2026-09-13 00:15 UTC. Scoped to scheduled CI on `main`.

**Tool-calling / parser fixes in review**

- GLM tool argument types across JSON Schema unions (complete vs. streamed divergence) — [PR #39136](https://github.com/sgl-project/sglang/pull/39136).
- Gemma 4 detector: string arguments with omitted opening delimiter — [PR #39240](https://github.com/sgl-project/sglang/pull/39240).
- PoolsideV1Detector duplicate `tool_index` in non-streaming path (caused OpenAI clients to merge distinct tool calls) — [PR #30452](https://github.com/sgl-project/sglang/pull/30452).

---

## 6. What This Means for Application Developers

- **Treat `include_reasoning=false` as best-effort, not a guarantee.** [Issue #39103](https://github.com/sgl-project/sglang/issues/39103) confirms reasoning content still leaks in responses/completions. If you strip CoT for compliance, cost, or UX reasons, filter on the client side until fixed.
- **Harden against engine restarts.** A single client disconnect can take down the whole server ([#39216](https://github.com/sgl-project/sglang/issues/39216)). Ensure your gateway has retry/backoff and health-check-based failover; do not assume graceful degradation.
- **On Blackwell SM121/GB10, pin your config and audit outputs.** Two silent-correctness bugs are open in the same window ([#39193](https://github.com/sgl-project/sglang/issues/39193) wrong GEMM results, [#39226](https://github.com/sgl-project/sglang/issues/39226) MoE backend capture failure). Avoid `DEEPGEMM_SCALE_UE8M0=false` and avoid `--moe-runner-backend deep_gemm` for DSV4.1 MXFP4 until fixed.
- **Monitor speculative-decoding acceptance rate as a first-class metric.** Quantized DFlash2 drafts can silently collapse acceptance to ~0% and make you *slower than no drafter* ([#39087](https://github.com/sgl-project/sglang/issues/39087)). A per-request acceptance gauge would have caught this immediately.
- **Tool-calling reliability is improving — expect to upgrade.** Three parser fixes target real agent-breaking behavior: duplicate `tool_index` merging distinct calls, GLM complete-vs-streamed argument divergence, and Gemma 4 delimiter omission. If you run agents on GLM-4.7/5, Gemma 4, or Poolside models, watch these PRs.
- **If you rely on `/v1/responses` state, set `--enable-response-store` explicitly** ([PR #39122](https://github.com/sgl-project/sglang/pull/39122)) — and note that cross-node PD bookkeeping had correctness problems, so validate multi-node behavior before shipping.
- **Spec-decoding latency should improve on MLA targets** with [PR #39232](https://github.com/sgl-project/sglang/pull/39232) (fused FP8 KV/Q prep reused on verify) and **AMD gfx950/gfx942 and NPU users get meaningful new paths** ([#37413](https://github.com/sgl-project/sglang/pull/37413), [#39243](https://github.com/sgl-project/sglang/pull/39243), [#37382](https://github.com/sgl-project/sglang/pull/37382), [#38328](https://github.com/sgl-project/sglang/pull/38328)).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-13

## 1. Today's Highlights
llama.cpp shipped builds **b10923–b10934**, led by a major JSON-schema/grammar refactor (`common_schema`) and Jinja integer-literal support, both important for tool-calling and chat-template correctness. On hardware, an open CUDA PR proposes a cuBLAS fallback for IQ quants on **Blackwell/sm_120** to fix incorrect MMQ results, while AMD/Vulkan work adds GCN tuning and IQ3_S MMQ kernels. Stability focus remains on CUDA graph hangs on RTX 50-series, Vulkan RDNA3 prompt-processing regressions, and Windows MTP prefill slowdowns.

## 2. Releases & Breaking Changes
No explicit breaking API changes announced. **b10934** changes the internal JSON-schema representation used by `json-schema-to-grammar`; validate grammar output for edge-case schemas.

| Build | Change | Link |
|---|---|---|
| b10934 | `common_schema` internal JSON schema representation, optimizer, and `json-schema-to-grammar` refactor | [release](https://github.com/ggml-org/llama.cpp/releases/tag/b10934) / [#28736](https://github.com/ggml-org/llama.cpp/pull/28736) |
| b10933 | Jinja support for dot property integer literals | [release](https://github.com/ggml-org/llama.cpp/releases/tag/b10933) / [#28817](https://github.com/ggml-org/llama.cpp/pull/28817) |
| b10932 | CMake: omit timestamp from Clang precompiled headers to avoid cache invalidation | [release](https://github.com/ggml-org/llama.cpp/releases/tag/b10932) / [#28816](https://github.com/ggml-org/llama.cpp/pull/28816) |
| b10931 | Web UI adds cache | [release](https://github.com/ggml-org/llama.cpp/releases/tag/b10931) / [#28802](https://github.com/ggml-org/llama.cpp/pull/28802) |
| b10930 | Server allows model downloads at model limit; fixes #26809 | [release](https://github.com/ggml-org/llama.cpp/releases/tag/b10930) / [#28530](https://github.com/ggml-org/llama.cpp/pull/28530) |
| b10929 | HIP adds AMD GCN-specific config table | [release](https://github.com/ggml-org/llama.cpp/releases/tag/b10929) / [#27841](https://github.com/ggml-org/llama.cpp/pull/27841) |
| b10927 | Vendor `cpp-httplib` updated to 0.56.0 | [release](https://github.com/ggml-org/llama.cpp/releases/tag/b10927) / [#28787](https://github.com/ggml-org/llama.cpp/pull/28787) |
| b10926 | syscl gracefully handles unsupported `tq1_0` quants | [release](https://github.com/ggml-org/llama.cpp/releases/tag/b10926) / [#28681](https://github.com/ggml-org/llama.cpp/pull/28681) |
| b10924 | Server frames router child state command as a whole line | [release](https://github.com/ggml-org/llama.cpp/releases/tag/b10924) / [#28747](https://github.com/ggml-org/llama.cpp/pull/28747) |
| b10923 | OpenCL backend abort fixes | [release](https://github.com/ggml-org/llama.cpp/releases/tag/b10923) / [#27630](https://github.com/ggml-org/llama.cpp/pull/27630) |

## 3. New Model & Hardware Support
- **ELMOD 2.7b**: conversion support proposed for GPTNeoX-based German model with custom tokenizer — open PR [#28818](https://github.com/ggml-org/llama.cpp/pull/28818).
- **Qwen4 sparse-FA on CUDA**: open PR enables sparse FA for Qwen4; current attention rescoring is unoptimized — [#28770](https://github.com/ggml-org/llama.cpp/pull/28770).
- **Blackwell/sm_120 IQ quants**: open PR forces cuBLAS fallback for IQ1_S, IQ2_XXS/XS/S, IQ3_XXS/S, IQ4_XS/NL on Blackwell+, while keeping MMQ for K-quants. Fixes incorrect results like Unsloth Dynamic quants — [#28823](https://github.com/ggml-org/llama.cpp/pull/28823).
- **AMD GCN HIP config table**: landed in b10929 — [#27841](https://github.com/ggml-org/llama.cpp/pull/27841).
- **Vulkan IQ3_S MMQ matmul kernels**: open PR targets Intel Arc A770; previously Intel avoided `VK_KHR_cooperative_matrix` due to perf regressions — [#28822](https://github.com/ggml-org/llama.cpp/pull/28822).
- **Hybrid recurrent/attention hparams**: open PR ignores zero-KV layers in variable GQA checks — [#28824](https://github.com/ggml-org/llama.cpp/pull/28824).
- **ANE backend**: still a roadmap item — [#10453](https://github.com/ggml-org/llama.cpp/issues/10453).
- **OpenVINO Gemma-4-12B load failure**: open issue on CPU/GPU/NPU — [#24415](https://github.com/ggml-org/llama.cpp/issues/24415).
- **syscl `tq1_0`**: graceful unsupported-quant handling landed in b10926 — [#28681](https://github.com/ggml-org/llama.cpp/pull/28681).

## 4. Performance & Optimization
- **Qwen4 sparse-FA**: avoids rescoring the entire KV cache every token — open PR [#28770](https://github.com/ggml-org/llama.cpp/pull/28770).
- **Vulkan IQ3_S MMQ**: adds IQ3_S matmul kernels for Intel Arc, where cooperative-matrix path was avoided — open PR [#28822](https://github.com/ggml-org/llama.cpp/pull/28822).
- **HIP AMD GCN tuning**: GCN-specific config table landed in b10929 — [#27841](https://github.com/ggml-org/llama.cpp/pull/27841).
- **Scheduler**: open PR stops re-reserving scheduler when toggling `causal_attn` — [#28751](https://github.com/ggml-org/llama.cpp/pull/28751).
- **CI backend testing**: `test-backend-ops` now runs as a dedicated parallel `ci/run.sh` test — merged PR [#28740](https://github.com/ggml-org/llama.cpp/pull/28740).
- **Qwen35 RTX 5090**: issue reports ~76% roofline decode on native Linux with MTP ~1.7x; Windows/Ollama path 1.5–1.6x slower — [#28196](https://github.com/ggml-org/llama.cpp/issues/28196).
- **CUDA 4-bit KV**: silent CPU fallback causes ~30x slowdown unless `GGML_CUDA_FA_ALL_QUANTS=ON`; request to make default — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633).
- **Windows MTP**: self-compiled MSVC + CUDA 12.8 build reports ~57x prefill slowdown with `--spec-type draft-mtp` — [#28790](https://github.com/ggml-org/llama.cpp/issues/28790).
- **Vulkan RDNA3**: severe prompt-processing drop after b10780 — [#28752](https://github.com/ggml-org/llama.cpp/issues/28752).
- **RDNA4 FA regression**: native MMA FA up to 2x slower at depth after rocWMMA removal — CLOSED issue [#26220](https://github.com/ggml-org/llama.cpp/issues/26220).
- **SYCL `-cb` power**: continuous batching pins Battlemage GPU at boost between requests — [#24946](https://github.com/ggml-org/llama.cpp/issues/24946).
- **Vulkan AMD Resizable BAR**: slow token generation when ReBAR disabled — [#27097](https://github.com/ggml-org/llama.cpp/issues/27097).
- **Vulkan server slowdown over time**: long-running server requires reboots on 7900XTX — [#22360](https://github.com/ggml-org/llama.cpp/issues/22360).

## 5. Stability & Regressions
Ranked by severity; many closed issues are stale/unconfirmed rather than fixed.

| Severity | Status | Item | Link |
|---|---|---|---|
| High | OPEN | CUDA graphs hang GPU channel on RTX 5090 Laptop/sm_120; workaround `GGML_CUDA_DISABLE_GRAPHS=1` | [#27330](https://github.com/ggml-org/llama.cpp/issues/27330) |
| High | OPEN | GLM-5.2 `glm_moe_dsa` dense-MLA CUDA path produces corrupted output when layers offloaded | [#26027](https://github.com/ggml-org/llama.cpp/issues/26027) |
| High | CLOSED/unconfirmed | Consistent OOM crashes with `-np 3` on 1x4090 + 3x3090, build 10930 | [#28813](https://github.com/ggml-org/llama.cpp/issues/28813) |
| High | OPEN | MTP `--spec-type draft-mtp` causes ~57x prefill slowdown on self-compiled Windows build | [#28790](https://github.com/ggml-org/llama.cpp/issues/28790) |
| High | OPEN | Vulkan RDNA3 severe prompt-processing drop after b10780 | [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) |
| High | OPEN | `/slots` save/restore loses prompt reuse on hybrid/recurrent models; fix PRs for K/V/recurrent cleanup and byte-oriented state API | [#25913](https://github.com/ggml-org/llama.cpp/issues/25913), [#27530](https://github.com/ggml-org/llama.cpp/pull/27530), [#27943](https://github.com/ggml-org/llama.cpp/pull/27943) |
| Medium | OPEN | CUDA 4-bit KV silently falls back to CPU (~30x slowdown); workaround `GGML_CUDA_FA_ALL_QUANTS=ON` | [#28633](https://github.com/ggml-org/llama.cpp/issues/28633) |
| Medium | CLOSED | RPC `top_k` backend sampling crashes with shared-memory assert on AMD | [#24177](https://github.com/ggml-org/llama.cpp/issues/24177) |
| Medium | OPEN | ROCm 7.14 `libhipblas.so.3` loading error | [#25807](https://github.com/ggml-org/llama.cpp/issues/25807) |
| Medium | CLOSED | SYCL `GGML_SYCL_DEVICE_ARCH=xe2` segfault | [#25808](https://github.com/ggml-org/llama.cpp/issues/25808) |
| Medium | OPEN | OpenVINO cannot load gemma-4-12B on CPU/GPU/NPU | [#24415](https://github.com/ggml-org/llama.cpp/issues/24415) |
| Medium | CLOSED/stale | Qwen3.5 tool parser fails when text precedes `<tool_call>` | [#20260](https://github.com/ggml-org/llama.cpp/issues/20260) |
| Medium | OPEN | llama-ui cannot open reasoning-level menu on desktop | [#27981](https://github.com/ggml-org/llama.cpp/issues/27981) |
| Low | OPEN | Server `batch_view` offset not propagated to `ctx_dft` | [#24840](https://github.com/ggml-org/llama.cpp/issues/24840) |
| Low | CLOSED | Co-resident server processes die after CUDA graph reuse on Windows sm_120; same graph workaround | [#28404](https://github.com/ggml-org/llama.cpp/issues/28404) |
| Low | CLOSED | macOS static build linking issue with `BUILD_SHARED_LIBS=OFF` | [#28491](https://github.com/ggml-org/llama.cpp/issues/28491) |

## 6. What This Means for Application Developers
- **Tool/agent apps**: b10934’s `common_schema` refactor plus open parser improvements for Qwen complex/`anyOf` args and Ling 3.0 should improve tool-call reliability, but test JSON schemas for grammar edge cases — [#28736](https://github.com/ggml-org/llama.cpp/pull/28736), [#28742](https://github.com/ggml-org/llama.cpp/pull/28742), [#26833](https://github.com/ggml-org/llama.cpp/pull/26833), [#28682](https://github.com/ggml-org/llama.cpp/pull/28682).
- **Custom parsing**: `--skip-chat-parsing` is available to force pure content output when your app handles tool parsing itself — [#20289](https://github.com/ggml-org/llama.cpp/pull/20289).
- **Server ops**: model downloads at limit landed in b10930; multiple bind addresses proposed for `llama-server`; structured `LOG_JSON` logging proposed — [#28530](https://github.com/ggml-org/llama.cpp/pull/28530), [#28690](https://github.com/ggml-org/llama.cpp/pull/28690), [#28586](https://github.com/ggml-org/llama.cpp/pull/28586).
- **State/slot reliability**: if you use save/restore with hybrid/recurrent models, track [#25913](https://github.com/ggml-org/llama.cpp/issues/25913) and the fix PRs [#27530](https://github.com/ggml-org/llama.cpp/pull/27530) / [#27943](https://github.com/ggml-org/llama.cpp/pull/27943).
- **Blackwell CUDA**: IQ quant correctness fix is proposed in [#28823](https://github.com/ggml-org/llama.cpp/pull/28823); relevant for Unsloth Dynamic and other IQ-quantized GGUFs on RTX 50-series.
- **RTX 50-series CUDA graphs**: if you hit GPU channel hangs, set `GGML_CUDA_DISABLE_GRAPHS=1` — [#27330](https://github.com/ggml-org/llama.cpp/issues/27330).
- **4-bit KV on CUDA**: build or run with `GGML_CUDA_FA_ALL_QUANTS=ON` to avoid silent CPU fallback until the default changes — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633).
- **Windows MTP**: avoid self-compiled MTP speculative decoding until [#28790](https://github.com/ggml-org/llama.cpp/issues/28790) is resolved.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-13

Source: [github.com/ollama/ollama](https://github.com/ollama/ollama)

## 1. Today's Highlights

No Ollama releases landed in the last 24h. The active queue is dominated by correctness work around context truncation and tool/reasoning stream ordering: [PR #17894](https://github.com/ollama/ollama/pull/17894) targets the high-engagement qwen3.8 500 error, and [PR #18413](https://github.com/ollama/ollama/pull/18413) fixes Responses/web_search function-call ordering. Hardware-specific reports remain active on ROCm Strix Halo, Linux hybrid NVIDIA, Jetson Orin Nano, and Windows embedding/installer paths.

## 2. Releases & Breaking Changes

- No new releases in the last 24h.
- No landed breaking changes.
- Open behavior-change PRs to watch:
  - [PR #18399](https://github.com/ollama/ollama/pull/18399): adds `OLLAMA_CONTEXT_SHIFT` so a server can refuse over-long prompts instead of silently shifting/truncating them.
  - [PR #17566](https://github.com/ollama/ollama/pull/17566): proposes a per-request or per-model thinking token budget to prevent reasoning loops from consuming the full context.

## 3. New Model & Hardware Support

- No new model support landed in the last 24h.
- In review / recently closed:
  - [PR #16879](https://github.com/ollama/ollama/pull/16879): unified Gemma4 vision support; single-GGUF Gemma4 models would report vision/audio capabilities via `/api/tags`.
  - [PR #16934](https://github.com/ollama/ollama/pull/16934): closed; default `mistral3` GGUF models to the Ministral parser for tool use.
  - [PR #18400](https://github.com/ollama/ollama/pull/18400) and [PR #18398](https://github.com/ollama/ollama/pull/18398): fix Gemma4 tool parsing for bare object keys containing spaces, e.g. `{"Basic LLM Chain": ...}`.
  - [Issue #18287](https://github.com/ollama/ollama/issues/18287): closed request for Tencent Hy4 preview compatibility; no implementation indicated.
- Active hardware reports:
  - [Issue #17847](https://github.com/ollama/ollama/issues/17847): ROCm Strix Halo `gfx1151` KV state bleed.
  - [Issue #18412](https://github.com/ollama/ollama/issues/18412): Linux hybrid Intel + RTX 4080 `llama-server` SIGABRT.
  - [Issue #18396](https://github.com/ollama/ollama/issues/18396): Jetson Orin Nano 8GB Gemma4 E4B multimodal OOM.
  - [Issue #16599](https://github.com/ollama/ollama/issues/16599): multi-GPU split despite sufficient VRAM on one GPU.

## 4. Performance & Optimization

- [Issue #16599](https://github.com/ollama/ollama/issues/16599): Gemma 4 31b fits on a 3090 alone at ~30 tok/s, but enabling a 4060 causes the model to split despite enough VRAM on the 3090. No fix PR yet.
- [Issue #18392](https://github.com/ollama/ollama/issues/18392): sustained `/api/embed` load on Windows with `bge-m3:567m-fp16`, batches of 32, ~55 docs/s exhausts loopback ports. Root cause appears to be `llama-server` HTTP client keep-alive being disabled, causing intermittent HTTP 400.
- [Issue #18416](https://github.com/ollama/ollama/issues/18416): `ollama create --quantize q4_K_M` from safetensors leaves an unreferenced ~50 GB F16 blob per import; after 12 imports of a 26B model this becomes significant disk bloat. `ollama rm` does not remove it.
- [PR #18407](https://github.com/ollama/ollama/pull/18407): preserves imported GGUF blobs after validation and avoids writing an extra full model file by directing `llama-quantize` COPY validation output to null.
- [PR #18399](https://github.com/ollama/ollama/pull/18399): if merged, refusing over-long prompts can avoid wasted generation and silent truncation, at the cost of clients needing to handle explicit rejection.

## 5. Stability & Regressions

| Severity | Item | Status / fix |
|---|---|---|
| Critical | [Issue #17847](https://github.com/ollama/ollama/issues/17847): ROCm Strix Halo `gfx1151` KV state bleeds across sequential requests; responses contaminated by previous unrelated request. | Open; no fix PR identified. |
| High | [Issue #17778](https://github.com/ollama/ollama/issues/17778): qwen3.8 chat streaming returns `500: no user query found in messages` during multi-step tool loops. 29 comments, 25 👍. | Open; fix [PR #17894](https://github.com/ollama/ollama/pull/17894) open. |
| High | [Issue #18412](https://github.com/ollama/ollama/issues/18412): Linux hybrid Intel Raptor Lake-S iGPU + RTX 4080; `llama-server` SIGABRT during backend/device loading. | Open; no fix PR identified. |
| High | [Issue #18411](https://github.com/ollama/ollama/issues/18411): Responses `web_search` path emits `function_call` before reasoning completion, breaking Codex tool replay. | Open; fix [PR #18413](https://github.com/ollama/ollama/pull/18413) open. |
| Medium | [Issue #18094](https://github.com/ollama/ollama/issues/18094): `gemma3:12b` structured output (`format`) truncates prematurely on double-quoted terms. | Open; no fix PR. |
| Medium | [Issue #18396](https://github.com/ollama/ollama/issues/18396): Jetson Orin Nano 8GB Gemma4 E4B multimodal projector causes host OOM despite CPU-projector config. | Open; no fix PR. |
| Medium | [Issue #18392](https://github.com/ollama/ollama/issues/18392): sustained `/api/embed` exhausts loopback ports on Windows. | Open; no fix PR. |
| Medium | [Issue #18416](https://github.com/ollama/ollama/issues/18416): `ollama create --quantize` leaves unreferenced F16 blob in `blobs/`. | Open; no fix PR. |
| Medium | [Issue #14259](https://github.com/ollama/ollama/issues/14259): chat history and embedding truncation happens silently; only `slog.Debug` visibility. | Open; no fix PR. |
| Medium | [Issue #17562](https://github.com/ollama/ollama/issues/17562): coding-agent bugs: repetition guard, truncated tool calls, Gemma4 tool call dropped on missing brace. | Open; partial parser PRs [#18400](https://github.com/ollama/ollama/pull/18400), [#18398](https://github.com/ollama/ollama/pull/18398). |
| Medium | [PR #18406](https://github.com/ollama/ollama/pull/18406): runner can return all-zero embedding while API reports HTTP 200. | Open; proposes HTTP 500 + logging. |
| Medium | [PR #18408](https://github.com/ollama/ollama/pull/18408): UI treats failed/premature-EOF chat streams as success. | Open. |
| Low | [Issue #18387](https://github.com/ollama/ollama/issues/18387): >10 ellipses between TOC titles and page numbers causes `cancel task`. | Open; no fix PR. |
| Low | [Issue #16599](https://github.com/ollama/ollama/issues/16599): multi-GPU split despite enough VRAM on one GPU. | Open; no fix PR. |
| Low | [Issue #18414](https://github.com/ollama/ollama/issues/18414): some models have undocumented Ollama version requirements. | Open. |
| Low | [Issue #18415](https://github.com/ollama/ollama/issues/18415): Windows 10 briefly shows a PowerShell window when opening Ollama desktop 0.34.0. | Open. |
| Low | Windows uninstaller leaves stale Ollama PATH entry. | [PR #18409](https://github.com/ollama/ollama/pull/18409) open; previous [PR #18386](https://github.com/ollama/ollama/pull/18386) closed. |

## 6. What This Means for Application Developers

- **Tool-using agents:** qwen3.8 and other renderer-based models can return HTTP 500 under context overflow during multi-step tool loops. Cap tool-response size, trim history aggressively, and handle 500s with retries until [PR #17894](https://github.com/ollama/ollama/pull/17894) lands.
- **Responses / reasoning streams:** If you integrate Codex-style tool replay or web search, expect possible ordering breakage until [PR #18413](https://github.com/ollama/ollama/pull/18413) fixes reasoning-before-tool-call emission. Also surface failed or premature-EOF streams rather than treating them as success; see [PR #18408](https://github.com/ollama/ollama/pull/18408).
- **Structured output:** `gemma3:12b` can truncate JSON-schema `format` responses when source text contains double-quoted terms. Validate outputs and retry or avoid this model/path until [Issue #18094](https://github.com/ollama/ollama/issues/18094) is fixed.
- **Embeddings:** All-zero embeddings may currently pass as HTTP 200; validate vectors client-side. On Windows, sustained bulk embed workloads can exhaust loopback ports due to disabled keep-alive; add concurrency limits, retries, and backoff. [PR #18406](https://github.com/ollama/ollama/pull/18406) aims to reject invalid vectors with HTTP 500.
- **Disk/ops hygiene:** `ollama create --quantize` from safetensors can leak unreferenced F16 blobs up to ~50 GB each. Monitor `~/.ollama/models/blobs` and clean up manually. [PR #18407](https://github.com/ollama/ollama/pull/18407) may reduce duplicate writes for GGUF imports.
- **Hardware caution:** Avoid ROCm Strix Halo for sequential multi-request workloads if KV contamination is possible ([#17847](https://github.com/ollama/ollama/issues/17847)). Linux hybrid NVIDIA systems may crash during backend load ([#18412](https://github.com/ollama/ollama/issues/18412)); Jetson Orin Nano 8GB may OOM with Gemma4 E4B multimodal ([#18396](https://github.com/ollama/ollama/issues/18396)); multi-GPU may split unnecessarily ([#16599](https://github.com/ollama/ollama/issues/16599)).
- **Config watchlist:** [PR #18399](https://github.com/ollama/ollama/pull/18399) would add `OLLAMA_CONTEXT_SHIFT` to refuse over-long prompts, and [PR #17566](https://github.com/ollama/ollama/pull/17566) would add thinking-token budgets. Both are open, not released, but worth tracking for agent reliability.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-13

## Today's Highlights
No releases shipped in the last 24h, but activity was heavy: 33 issues and 241 PRs were touched. The most active threads are cost/billing correctness (cached realtime audio overbilling, Azure spend logged as $0, stale cache-write tokens) and two automated price-catalog syncs that add 83 newly listed models across providers. On the reliability side, an OTEL callback crash-loop and a Prisma-based self-hosted install failure remain unfixed and are the highest-severity open items.

## Releases & Breaking Changes
None in the last 24h.

## New Model & Hardware Support
- **Price/context catalog sync (2 competing PRs, both open):** [#40920](https://github.com/BerriAI/litellm/pull/40920) updates 277 models across 5 providers with 49 new entries (OpenAI 120, Together, and others); [#40919](https://github.com/BerriAI/litellm/pull/40919) updates 278 models with 34 new entries and repoints stale source URLs. Both are bot-generated and need consolidation before merge.
- **Tencent TokenHub** was added as a backend provider but was missing from the Add Model dropdown; fix in [#40924](https://github.com/BerriAI/litellm/pull/40924).
- **OpenRouter video generation** models are not yet supported — closed feature request [#27724](https://github.com/BerriAI/litellm/issues/27724).
- **Requested, not landed:** `deepseek-v4-flash` / `deepseek-vr-p4o` catalog entries ([#30430](https://github.com/BerriAI/litellm/issues/30430)), OpenAI-compatible `gpt-live-1` proxy support ([#40888](https://github.com/BerriAI/litellm/issues/40888)), and independent OpenAI-compatible gateway representation in `model_prices_and_context_window.json` ([#29961](https://github.com/BerriAI/litellm/issues/29961)).

## Performance & Optimization
- **MCP HTTP servers: `list_tools` is called on every `tools/call`** instead of using a cached tool list, adding a full upstream round-trip per tool invocation and doubling latency. Open, stale, no fix PR yet: [#23544](https://github.com/BerriAI/litellm/issues/23544).
- **Complexity router now supports `/v1/responses`**: new `get_structured_messages()` guardrail-translation path converts Responses/Anthropic payloads to OpenAI-spec messages for routing/classification ([#26137](https://github.com/BerriAI/litellm/pull/26137), closed).
- **Logging hot path:** a slow Redis currently emits a full ERROR traceback per timed-out `LoggingWorker` callback — a burst of 40 floods logs with 40 stacktraces. PR [#40912](https://github.com/BerriAI/litellm/pull/40912) collapses this into one bounded summary.

## Stability & Regressions
Ranked by severity:

1. **OTEL callback crash-loops containers** — enabling the OTEL collector callback causes constant pod crashes (`NoneType` error). Open since June, no fix PR: [#30061](https://github.com/BerriAI/litellm/issues/30061).
2. **Self-hosted install fails on `prisma generate`** — basic install script fails because the command is not permitted, blocking new deployments: [#26097](https://github.com/BerriAI/litellm/issues/26097).
3. **Anthropic `/v1/messages` 400 `vector_store_ids` not permitted** — top-engagement issue (14 comments, 13 👍), plus a newly filed interaction where `enable_anthropic_prompt_caching` starves the vector-store pre-call hook: [#23741](https://github.com/BerriAI/litellm/issues/23741), [#40908](https://github.com/BerriAI/litellm/issues/40908).
4. **`openai/`-prefixed self-hosted models silently route `/v1/messages` to the Responses API**, dropping multimodal support for vLLM/llama.cpp/SGLang/TGI/LM Studio: [#40780](https://github.com/BerriAI/litellm/issues/40780).
5. **Responses-to-Chat bridge loses reasoning** — streaming drops incremental reasoning items and cached reasoning state ([#40887](https://github.com/BerriAI/litellm/issues/40887)); non-streaming drops raw `reasoning_text` ([#40654](https://github.com/BerriAI/litellm/issues/40654)); native `/v1/messages` passthrough drops adaptive thinking/effort ([#40890](https://github.com/BerriAI/litellm/issues/40890)).
6. **Billing correctness cluster:**
   - Cached realtime audio tokens billed at full audio rate (~2× overbill) — **fix PR open**: [#40627](https://github.com/BerriAI/litellm/pull/40627).
   - Admin UI model edits persist derived pricing, then price-map reload records Azure spend as $0: [#40649](https://github.com/BerriAI/litellm/issues/40649); related OCR custom pricing ignored, bills $0 ([#36608](https://github.com/BerriAI/litellm/issues/36608), closed).
   - Streaming usage merger retains stale cache-write tokens after explicit zero: [#40736](https://github.com/BerriAI/litellm/issues/40736).
   - Vertex Gemini Live sessions not billed end-to-end per session — **fix PR open**: [#40915](https://github.com/BerriAI/litellm/pull/40915).
   - False "Budget has been exceeded" on Claude Code with enforced cost far above recorded spend (closed): [#40050](https://github.com/BerriAI/litellm/issues/40050).
7. **Security / hardening:** Helm chart ships empty `podSecurityContext` and `securityContext`, so pods run as root by default: [#40822](https://github.com/BerriAI/litellm/issues/40822). Legacy delegated MCP routes admitted anonymous traffic and hid spend — **fix PR**: [#40923](https://github.com/BerriAI/litellm/pull/40923).
8. **Proxy behavior regressions:** `lite codex` silently bypasses the proxy when `-c` follows a Codex subcommand ([#40651](https://github.com/BerriAI/litellm/issues/40651)); `LiteLLM_SpendLogs.session_id` ignores `litellm_session_id`, breaking session grouping ([#40851](https://github.com/BerriAI/litellm/issues/40851)); keys can silently exceed their team's RPM limit and the looser value can never take effect ([#40866](https://github.com/BerriAI/litellm/issues/40866)); sync `Router._embedding` bypasses team/access-group scoping ([#31260](https://github.com/BerriAI/litellm/issues/31260)); OpenAI image generation sends `extra_headers` inside the JSON body ([#40628](https://github.com/BerriAI/litellm/issues/40628)).
9. **Fixed/closed:** Vertex AI models falsely "Unhealthy" in the Model Health dashboard since v1.84.0 ([#28206](https://github.com/BerriAI/litellm/issues/28206)); `/v1/responses` multi-turn replay breakage after Anthropic native `web_search` on Vertex ([#33546](https://github.com/BerriAI/litellm/issues/33546)).

## What This Means for Application Developers
- **Pin your version and watch cost dashboards.** Multiple open bugs cause either silent $0 spend records (Azure, OCR) or overbilling (realtime cached audio ~2×, stale cache-write tokens). If you rely on budget enforcement, the Claude Code false-429 path is a real availability risk.
- **Anthropic RAG users should stay on chat completions** until #23741/#40908 are resolved — `vector_store_ids` in the request body triggers a hard 400, and prompt caching can suppress the vector-store hook entirely.
- **Don't assume `openai/` prefix means "chat"** for self-hosted vLLM/SGLang/TGI deployments: `/v1/messages` traffic is bridged to the Responses API and loses multimodal content. Test multimodal paths explicitly.
- **MCP latency:** if you proxy HTTP MCP servers through LiteLLM, every tool call currently re-fetches the tool list — budget an extra RTT per call until #23544 lands.
- **Agent reasoning fidelity is fragile today.** Streaming and non-streaming Responses-to-Chat bridges, plus native `/v1/messages` passthrough, all drop reasoning/thinking fields. If your agent depends on chain-of-thought state across turns, validate it end-to-end.
- **Kubernetes operators:** harden the Helm chart manually (set `runAsNonRoot`, drop capabilities, `allowPrivilegeEscalation: false`) — the defaults ship unset.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-13

## 1. Today's Highlights

The dominant story is CI and packaging health: `main` had been red since commit `22bbff627` (#10706, merged 2026-09-11), poisoning roughly 25 open PRs, and is addressed by [PR #10832](https://github.com/unslothai/unsloth/pull/10832) (closed today). A second critical fix, [PR #10825](https://github.com/unslothai/unsloth/pull/10825), stops the Docker Studio image from disabling Unsloth's TRL patches on GPU hosts — training in `unsloth/unsloth:latest` was failing outright with a `TypeError` on trainer construction. On the performance side, [PR #10744](https://github.com/unslothai/unsloth/pull/10744) reports a Qwen3.5-9B LoRA SFT step time reduction on a B200 from 0.85 s to 0.66 s, attributed mostly to CPU-side per-step overhead.

## 2. Releases & Breaking Changes

No new releases in the last 24h.

Upstream compatibility breakage continues to surface (no Unsloth version bump yet):

- **[PR #10740](https://github.com/unslothai/unsloth/pull/10740)** — Studio text/CPT branches still pass kwargs removed in TRL 0.20 (`max_seq_length` on `SFTConfig`, `tokenizer` on `SFTTrainer`), producing `TypeError` immediately on run start. Marked `conflicts`/`superseded`.
- **[PR #10825](https://github.com/unslothai/unsloth/pull/10825)** (closed) — The Studio Docker image sets `ENV UNSLOTH_ALLOW_CPU=1`, which disables Unsloth's TRL patches on GPU hosts and breaks Studio Train, bundled notebooks, `unsloth train`, and GRPO with a `TypeError` at trainer build time. Fix makes GPU-host training work again.
- **[Issue #10738](https://github.com/unslothai/unsloth/issues/10738)** / **[PR #10836](https://github.com/unslothai/unsloth/pull/10836)** — Recipe Studio falsely reports `ALL_COLUMNS_DROPPED` when seed columns would still export; fix preserves seed-field drop semantics.

## 3. New Model & Hardware Support

- **[PR #10820](https://github.com/unslothai/unsloth/pull/10820)** — Adds an official AMD ROCm Docker image (RDNA2–RDNA4, CDNA) alongside the CUDA image from #5748, with matching `docker/` layout, `build.sh`/`run.sh` entry points and smoke tests. This is a resync of the auto-closed #6231.
- **[PR #7115](https://github.com/unslothai/unsloth/pull/7115)** — EXL3 (ExLlamaV3) quantization backend as a bitsandbytes alternative: 2/3/4/6/8-bit plus fractional bitrates, lower memory, and **MoE quantization support** (bitsandbytes cannot do this under Transformers 5). Additive change.
- **[PR #10819](https://github.com/unslothai/unsloth/pull/10819)** — Caps `accelerate` below 1.15 on Windows, where 1.15.0 breaks all ROCm training (see Stability).
- **[Issue #10838](https://github.com/unslothai/unsloth/issues/10838)** — User request for DeepSeek v4.1 Flash GGUF + llama.cpp support in Studio. No implementation yet.

## 4. Performance & Optimization

- **[PR #10744](https://github.com/unslothai/unsloth/pull/10744)** — `[perf]` Qwen3.5-9B LoRA SFT via `unsloth-cli.py` on a single B200 (sm_100, 178 GB): **0.85 s → 0.66 s per step**, with profiling indicating the win comes mostly from CPU-side per-step overhead rather than kernel changes. Experimental, tagged `non-studio`, open for discussion.
- **[PR #10830](https://github.com/unslothai/unsloth/pull/10830)** — Moves `trust_remote_code` resolution off the event loop in `GET /api/inference/status`; the `auto_map` fallback can hit the Hub on cache miss, previously blocking the async handler.
- **[PR #10834](https://github.com/unslothai/unsloth/pull/10834)** — Adds live inference-phase reporting to the Studio API monitor (`Prompt processing · N%` during prefill, `Token generation` after decode begins) for GGUF requests.
- **[PR #10831](https://github.com/unslothai/unsloth/pull/10831)** — Fixes the Manual GPU-memory-mode GGUF decision log interpolating `use_fit` before the Manual branch disables it, so `--fit: on` was logged while the actual launch carried `--fit: off`.

## 5. Stability & Regressions

Ranked by severity:

1. **[PR #10832](https://github.com/unslothai/unsloth/pull/10832)** (closed) — `main` broken since `22bbff627` (#10706, 2026-09-11); every `Backend CI` run on `main` failed across runs `34593400131`–`34657173780`, and one stale assertion in `Repo tests (CPU)` turned ~25 open PRs red. Fixes five root causes. **Fix exists.**
2. **[PR #10825](https://github.com/unslothai/unsloth/pull/10825)** (closed) — Training entirely broken in `unsloth/unsloth:latest` on GPU hosts due to `UNSLOTH_ALLOW_CPU=1` disabling TRL patches. Affects Studio Train, notebooks, `unsloth train`, GRPO. **Fix exists.**
3. **[Issue #10835](https://github.com/unslothai/unsloth/issues/10835)** — Security: with tool permissions set to "Run automatically" or "Full access", commands such as `reboot` or `rm` execute without confirmation, bypassing the sandbox and safety checks. No fix PR yet.
4. **[PR #10819](https://github.com/unslothai/unsloth/pull/10819)** — `accelerate` 1.15.0 (released 2026-09-09) calls `model_has_dtensor(model)` unconditionally in `Accelerator.prepare_model`, importing `torch.distributed.tensor` → `torch._C._distributed_c10d`, which AMD Windows ROCm wheels do not ship. **Every ROCm training run on Windows fails.** Workaround PR caps accelerate <1.15.
5. **[Issue #10839](https://github.com/unslothai/unsloth/issues/10839)** — MCP calls systematically truncated and not bypassable; suspected deduplication issue. Windows 11, NVIDIA CUDA, Studio desktop + web UI. No fix PR.
6. **[Issue #10840](https://github.com/unslothai/unsloth/issues/10840)** — Desktop AppImage missing a package: large model downloads (e.g. Qwen 3.8 Flash Next Q5_K_XL) fail with `ValueError: file too large ... install hf_xet`. No fix PR.
7. **[Issue #10817](https://github.com/unslothai/unsloth/issues/10817)** — Studio 2026.9.2 desktop: Run-settings sidebar and the model dropdown's Run-settings page hold separate drafts and silently disagree for the same per-model settings.
8. **[Issue #10288](https://github.com/unslothai/unsloth/issues/10288)** — Studio crashes on "New chat" with `tapClientLookup: Index 1 out of bounds (length: 0)`, plus `MessagePartText can only be used inside text or reasoning message parts`. Random, requires restart.
9. **[PR #10803](https://github.com/unslothai/unsloth/pull/10803)** — IPv6 blackhole can kill the Studio backend: bound to `127.0.0.1:8888`, then unresponsive; HF token status stuck on "Checking token…" and desktop reports `terminal_reason=unresponsive_health_check` after ~80 s. Related: **[Issue #10379](https://github.com/unslothai/unsloth/issues/10379)**, **[Issue #10288](https://github.com/unslothai/unsloth/issues/10288)**.
10. **[Issue #1067](https://github.com/unslothai/unsloth/issues/1067)** — Long-standing: evaluation loss becomes constant when an eval set is added to the Llama 3.1 8B Instruct notebook flow. Tagged `currently fixing, good first issue`, updated today, 8 comments.
11. **[Issue #10822](https://github.com/unslothai/unsloth/issues/10822)**, **[Issue #10824](https://github.com/unslothai/unsloth/issues/10824)** — Feature gaps: no one-click MCP installs from a hub / MCP unavailable over remote access; voice typing does not work over LAN.

Also notable feature work in flight: **[PR #10816](https://github.com/unslothai/unsloth/pull/10816)** (model card `method` field dropped), **[PR #10088](https://github.com/unslothai/unsloth/pull/10088)** (images returned by MCP tools now forwarded to the model), **[PR #10837](https://github.com/unslothai/unsloth/pull/10837)** (`max_completion_tokens` for custom GPT gateways), **[PR #10833](https://github.com/unslothai/unsloth/pull/10833)** / **[PR #10789](https://github.com/unslothai/unsloth/pull/10789)** / **[PR #10788](https://github.com/unslothai/unsloth/pull/10788)** (Studio model management and image-model controls), **[PR #10814](https://github.com/unslothai/unsloth/pull/10814)** (Deep Research stripping links from code in reports), **[PR #9834](https://github.com/unslothai/unsloth/pull/9834)** (Homebrew cask docs).

## 6. What This Means for Application Developers

- **Pin your `accelerate` and `trl` versions.** Two independent upstream breaks are live: `accelerate` 1.15.0 kills ROCm training on Windows, and TRL ≥0.20 removed `max_seq_length`/`tokenizer` kwargs still emitted by Studio code paths. Until Unsloth ships patched releases, constrain both.
- **Re-pull or rebuild Docker images if you train on GPU.** The `unsloth/unsloth:latest` image was silently disabling TRL patches via `UNSLOTH_ALLOW_CPU=1`; the fix landed today. If you built images from a recent checkout, rebuild.
- **Studio tool execution deserves scrutiny before production use.** The "Run automatically" / "Full access" permission modes currently permit unsandboxed destructive commands without confirmation ([#10835](https://github.com/unslothai/unsloth/issues/10835)). Keep tool permissions in confirm-each-call mode for anything agentic.
- **MCP pipelines are not yet reliable in Studio.** Truncated tool calls ([#10839](https://github.com/unslothai/unsloth/issues/10839)) and un-deduplicable repeated identical tool invocations ([#10379](https://github.com/unslothai/unsloth/issues/10379)) make compile/retry-style agent loops fragile.
- **Watch the EXL3 backend if MoE quantization or memory is your constraint.** It is the only proposed path to quantizing MoE models without bitsandbytes, with fractional bitrates down to 2-bit ([#7115](https://github.com/unslothai/unsloth/pull/7115)).
- **ROCm users get a first-class Docker path** via [#10820](https://github.com/unslothai/unsloth/pull/10820), covering RDNA2–RDNA4 and CDNA with the same build/run/smoke-test contract as the CUDA image.
- **Throughput headroom on Blackwell is in the CPU-side loop, not the kernels.** The B200 profile in [#10744](https://github.com/unslothai/unsloth/pull/10744) (0.85 s → 0.66 s/step) suggests per-step host overhead is a meaningful lever for single-GPU LoRA SFT workloads.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*