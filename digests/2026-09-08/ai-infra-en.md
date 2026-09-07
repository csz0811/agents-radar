# AI Infrastructure Digest 2026-09-08

> Generated: 2026-09-07 22:45 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project AI Infrastructure Report — 2026-09-08

## 1. Ecosystem Overview

The September 8 snapshot shows an inference ecosystem that is concurrently pushing frontier-model capabilities, paying down correctness debt from hybrid/linear-attention architectures, and wrangling backend/hardware regressions on Blackwell-class GPUs. vLLM and SGLang are both absorbing fallout from GDN-style hybrid-attention models combined with speculative decoding and PD-disaggregated serving — prefix-cache misses, silent corruption, and `temperature=0` nondeterminism. llama.cpp continues its high-cadence kernel/bring-up cadence (10 builds in 24h), particularly on Vulkan, while Ollama inherits that momentum through a pending vendor bump. LiteLLM and Unsloth are respectively hard at work on gateway translation/budget correctness and CLI/training reliability — each being held back by config-registry or packaging bugs rather than GPU/kernel issues. Overall: the industry’s bottleneck has shifted from pure decode throughput to **correctness under new attention hybrids, fast startup/failover, and Blackwell/AMD platform gating**.

## 2. Activity Comparison

Counting unique GitHub issues and PRs referenced per project digest (24-hour window, not total repo activity):

| Project | Issues (digest-referenced) | PRs (digest-referenced) | Release status (24 h) |
|---|---|---|---|
| vLLM | ~26 | ~15 | No release; blocker fix PRs in review (`#52244`, `#55749`) |
| SGLang | ~17 | ~18 | No release; **main broken** — `import sglang` fails (`#38183`) |
| llama.cpp | ~10 | ~14 | **10 builds shipped** (`b10831` → `b10850`) |
| Ollama | ~21 | ~13 | No release; llama.cpp vendor bump `b10760→b10829` in review (`#18279`) |
| LiteLLM | ~17 | ~8 | No release |
| Unsloth | ~21 | ~16 | No release/tag |

vLLM is dominated by detective-work on regressions (silent corruption on DeepSeek-V4-Flash/Kimi-K3, greedy nondeterminism, SM120 FP8 IMA). SGLang has unusually high PR velocity for control-plane features (weight-cache daemon, prefill-CP deprecation) but is blocked upstream by a transformers pin. llama.cpp is the only project actually shipping code in 24h — and it is doing so in tightly-scoped kernel increments. Ollama and Unsloth are in “maintenance + pending upstream” mode. LiteLLM is quiet from a release standpoint but shows the deepest *API/registry misconfiguration* trend (Bedrock empty 200s, mis-registered `gpt-6-astra`).

## 3. Model Support Race

**What actually landed in 24h:**

- **llama.cpp** shipped real enablement: DeepSeek-V4 hyper-connection fused ops on Vulkan (`#26578`, in `b10844`), AMD `gfx90c` HIP support (`#26454`, `b10842`), and Vulkan TQ1_0 (`#27765`). Notably, Vulkan is no longer missing the DeepSeek-V4 path — CUDA and Metal have it.
- **Ollama’s** support pipeline is a single llama.cpp bump away: local `spark2_5` architecture support for Spark-X2.5 (`#18279`), plus MLX static YaRN/RoPE scaling under review (`#18263`, `#18285`).

**What’s in review / blocked:**

- **SGLang** added deployment recipes for Qwen3.8-Flash-Next NVFP4 on DGX Spark/RTX PRO 6000 (`#37995`) and native AMD gfx950 FP8 e4m3 conversion hardware path (`#37140`) — but GLM-5.2 FP4 + EAGLE remains broken on B200/B300.
- **vLLM** is the most constrained: no model enablement merged in 24h. In review are EAGLE3 for Sarvam MLA (`#53052`) and vendored Phi-4-reasoning-vision (`#50652`). It explicitly lacks support for NVFP4 KV cache on SM120 (`#49011`), GLM-5.3-Flash architecture (`#54062`), and Qwen3.8-Flash-Next-FP8 on SM80 (`#54318`).
- **LiteLLM** is regressing on registry hygiene: `gpt-6-astra` was registered in wrong mode (`mode: chat` instead of responses; `#40123`), and `openrouter/openai/gpt-5.6-sol` is absent from the prices/config JSON (`#40102`).
- **Unsloth** has requests queued (Qwen3 AVL 2B/0.6B, `#10459`) but no support merged.

**Who is ahead:** llama.cpp, by execution velocity. It consistently lands model enablement and kernel support in a day. For *frontier serving* model readiness (hybrid GDN checkpoints at scale), no engine is clearly ahead — vLLM has the deepest debugging position on GDN+MTP interference; SGLang leads on AMD/NVFP4 deployment recipes but needs stability on Blackwell/FlashInfer combinations. Ollama and Unsloth are derivative: they depend on llama.cpp / upstream hardware support.

## 4. Performance Frontier

Optimization attention is concentrated in five distinct areas:

- **Startup/failover economics**: SGLang’s Weight Cache Daemon phase-1 (`#27139`/`#33522`) is the single most dramatic datapoint in this digest — Qwen3-235B FP8 weight loading drops from ~306–327 s to <1 s via per-rank CUDA IPC. vLLM is pushing startup engineering in parallel: build-time Python bytecode compilation (`#55422`) and opt-in zstd container images (`#55608`).
- **Prefix-cache + speculative decoding**: vLLM’s MTP hybrid-GDN prefix bug (`#53670`, `#54094`) is costing 30–40% batch throughput on prefix-reuse workloads and zero cache reuse on 1M-token prompts. Fixes in review (`#52244`, `#55749`) target hash-slicing and cache-depth restoration. This is where long-context economics are currently damaged most.
- **Quantization / FP8 kernel depth**: SGLang proposes fusing `_static_quant_fp8` into producer epilogues (`#31504`); vLLM retunes block-FP8 MoE on H20 for GLM/DeepSeek shapes (+21%, `#54668`); llama.cpp ships branchless Q4_K/Q5_K unpack for mmvq (`#26705`). The reverse trend: FP8/NVFP4/KV-cache support is *missing* or mis-gated on both engines for SM80/SM103/SM120-class targets.
- **Kernel-level bring-up**: llama.cpp’s Vulkan fusion work is yielding measured wins (RMS_NORM fusion ~4% on Gemma 4; `iq4_xs` shader projected +6–17% gen on RDNA4); SYCL batched L2_NORM halves dispatches; CUDA/AMD MMA for head_dim 256 is in progress (`#26419`).
- **Distributed serving**: SGLang’s prefill-CP V2 deprecation/renames (`#36229`, `#38293`) are a breaking-change wave for custom CP deployments. vLLM is advancing Elastic EP scale-down routing (`#55772`) and PD-disaggregated correctness — but the most visible issue there is *regression*, not speed: silent corruption in Kimi-K3 on NIXL Direct-PD (`#52627`) and DeepSeek-V4-Flash inline-system-message paths (`#46710`).

## 5. Layer Positioning

| Layer | Project(s) | Core positioning |
|---|---|---|
| **Local engine/kernels (C++)** | llama.cpp | The lowest common denominator: GGUF, CPU/Metal/Vulkan/CUDA/SYCL/HIP kernels, quant formats. Not a distributed serving framework; enables everything above it. |
| **Local app runtime** | Ollama | Developer-facing distribution and process lifecycle wrangling on top of llama.cpp. Its value is model management, OpenAI-compatible local API, and Apple/desktop UX — not kernel innovation. Its identity is visible in its dependency bumps and scheduler regressions (5× CUDA slowdown `#18225`). |
| **Datacenter serving engines** | vLLM, SGLang | Both compete at multi-GPU, multi-request, disaggregated production serving. High-level difference from this digest: vLLM is prioritizing correctness archaeology around PD/MTP/GDN; SGLang is pushing control-plane performance innovations (Weight Cache Daemon, HiCache device IPC, prefill-CP V2, KV component-aware tiering). |
| **Gateway/control plane** | LiteLLM | Sits north of all engines and model providers. Concerns are protocol translation (Anthropic ↔ OpenAI), budgets/rate limits, registry correctness, cost classification. No GPU/execution layer. |
| **Fine-tuning/training** | Unsloth | Punches down into PyTorch/kernels for LoRA/QLoRA and GPU offload optimization. Expanding breadth into local inference/Studio — where its CLI/config and agent-loop bugs currently live. |

Layer tension: Ollama effectively *is* llama.cpp’s “product layer”; SGLang and vLLM are increasingly differentiated by scheduler/caching architecture rather than raw model support; LiteLLM’s value depends entirely on upstream model-registry accuracy, which is currently its weakest point.

## 6. Trend Signals

1. **Hybrid-attention is breaking long-held serving assumptions.** GDN/DFlash2/Mamba-2 hybrids + MTP spec decoding are causing total prefix-cache misses (vLLM `#54094`), silent corruption (SGLang `#38031`, vLLM `#52627`), and tool-call loss (vLLM `#39056`, llama.cpp `#20837`/`#28522`). Any team running Qwen3.5/GLM-5.3/DeepSeek-V4-class hybrids should treat prefix caching, reasoning/tool output and long-context stability as *untrusted* and add validation layers.

2. **`temperature=0` reproducibility is no longer a given.** Qwen3.8-Flash-Next and DeepSeek-V4-Flash are both showing five-request-five-different-completions at greedy settings near QSA budgets (`#54521`, `#53257`). With batch-invariant inference (`#27433`) still open at 89 comments and no fix in vLLM’s 24h, application developers need semantic checks or pinned batch-invariant configurations.

3. **Blackwell platform-gating bugs are the cross-stack theme of the day.** SGLang’s `is_sm100_supported()` only checks major==10 so sm_103 executes SM100 paths (Xid 13, hangs; `#34340`, `#38300`); vLLM has fresh SM120 FP8 IMA reports (`#55571`); Ollama ships CUDA 13 builds that silently fall back to CPU on sm_86 (`#17841`). The message: hardware detection/family gating is now a correctness bug with GPU-class scale consequences — pin known-good backend versions or default to conservative kernel paths.

4. **Restart economics are being redefined.** SGLang’s sub-second 235B weight load, vLLM’s startup bytecode and zstd image work are trying to make fast failover real. If you operate large self-hosted fleets, watch these PRs closely; they will change how you size replica pools and RTO budgets.

5. **Agentic traffic is stressing obedience, not just tokens.** Zombie requests from disconnected streaming clients on SGLang (`#36333`), thinking-budget non-enforcement in vLLM MRV2 (`#54906`), tool calls dropped inside `<think>` on vLLM/llama.cpp, and LiteLLM’s multi-turn tool-use regression (`#32214`) all show that *lifecycle semantics* of agent workloads — aborts, budgets, tool-call boundaries — are the next serving frontier. Build retry/sanitization logic at the client; do not rely on the stack to self-heal.

6. **Watch main-branch health before deploying from source.** SGLang main is currently unimportable due to a transformers pin (`#38183`); Ollama’s v0.33.2 contains a ~5× CUDA throughput regression (`#18225`) with v0.32.13 known-good. In a fast-moving ecosystem, version pinning is now a first-class reliability decision — not an ops afterthought.

**Bottom line for technical decision-makers:** llama.cpp is the safe lane for new model/bring-up experimentation. If you serve production traffic on hybrid-attention checkpoints, expect vLLM/SGLang to be correct-but-lossy until the prefix/MTP validation PRs merge — so add validation, add capacity headroom, and pin versions. If you run Blackwell-class GPUs, verify your sm-family gating before trusting FP8 kernels. And if you build agentic applications, treat tool-call parsing and disconnect handling as application-layer problems until the engines converge on streaming parsers and lifecycle semantics.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-08

## 1. Today's Highlights

No new vLLM release landed in the last 24 hours; the window is dominated by correctness and throughput fallout from hybrid-attention (GDN) models combined with speculative decoding, plus a fresh cluster of Blackwell/SM120 stability reports. A V1 fix that restores MTP prefix-cache hits for hybrid GDN models ([#52244](https://github.com/vllm-project/vllm/pull/52244)) and a prefill hash-slicing optimization ([#55749](https://github.com/vllm-project/vllm/pull/55749)) are in review — together they target reported 30–40% batch-throughput loss ([#53670](https://github.com/vllm-project/vllm/issues/53670)) and total prefix-cache misses on 1M-token prompts ([#54094](https://github.com/vllm-project/vllm/issues/54094)). The most active correctness threads remain greedy-decoding nondeterminism at `temperature=0` on Qwen3.8-Flash-Next ([#54521](https://github.com/vllm-project/vllm/issues/54521)) and DeepSeek-V4-Flash ([#53257](https://github.com/vllm-project/vllm/issues/53257)), silent output corruption in PD-disaggregated deployments ([#46710](https://github.com/vllm-project/vllm/issues/46710), [#52627](https://github.com/vllm-project/vllm/issues/52627)), and tool-call loss inside reasoning regions ([#39056](https://github.com/vllm-project/vllm/issues/39056)).

## 2. Releases & Breaking Changes

No new version tags were published in the last 24 hours, and no merged PR introduces API or config breaking changes in this window. One in-flight behavior change to watch: [#55665](https://github.com/vllm-project/vllm/pull/55665) makes the Pooling API honor a client-supplied `request_id` from the request body instead of silently replacing it with a generated ID.

## 3. New Model & Hardware Support

**In review / in progress**

- **EAGLE3 for Sarvam MLA** — [#53052](https://github.com/vllm-project/vllm/pull/53052) adds EAGLE3 speculative-decoding support to `SarvamMLAForCausalLM`, capturing auxiliary hidden states for the drafter on a single pipeline stage.
- **Elastic EP on Model Runner V2** — [#53934](https://github.com/vllm-project/vllm/pull/53934) removes Elastic EP from the MRV2 unsupported-features list so `--enable-elastic-ep` does not silently force the legacy V1 runner once MRV2 becomes the default.
- **Phi-4-reasoning-vision without remote code** — [#50652](https://github.com/vllm-project/vllm/pull/50652) vendors the configuration and NaFlex image processor so the model loads cleanly under transformers ≥ 5.4.
- **Transformers v5 migration** — the InternVL2 sub-issue ([#38425](https://github.com/vllm-project/vllm/issues/38425)) remains open; model-card-level work continues under the v5 umbrella.

**Reported support gaps**

- **NVFP4 KV cache on SM120 is still not wired** — FlashInfer already ships the kernels, but vLLM does not call them; a working prototype reportedly reaches 245K context on an RTX 5090 ([#49011](https://github.com/vllm-project/vllm/issues/49011)).
- **GLM-5.3-Flash** fails to start on B200 because `Glm5NextTextLinearAttention` is not a registered architecture in vLLM ([#54062](https://github.com/vllm-project/vllm/issues/54062)).
- **Qwen3.8-Flash-Next-FP8** cannot start on 4×A100 (SM80) because the checkpoint requires FP8 `e4m3`-class kernels unavailable on compute capability 8.0 ([#54318](https://github.com/vllm-project/vllm/issues/54318)).
- **Local GGUF paths for Qwen35** still fail with `architecture qwen35 is not supported yet` even when `--hf-config-path` is provided ([#36456](https://github.com/vllm-project/vllm/issues/36456)).

## 4. Performance & Optimization

- **H20 block-FP8 MoE tuning (+21%)** — [#54668](https://github.com/vllm-project/vllm/pull/54668) retunes low-batch fused-MoE configs for the `E=256, N=256` shape used by GLM-5.3 at TP=8 and DeepSeek-family models; narrower N tiles replace the shipped `BLOCK_SIZE_N=128` entries.
- **Hybrid-GDN prefix-cache restoration** — [#52244](https://github.com/vllm-project/vllm/pull/52244) fixes a V1 bug where MTP speculative decoding prevents replayed prompts from reaching the cached depth, and prompts whose length is a multiple of the hash unit get **no hit at all**. The associated regression cost: ~1,648 tokens recomputed per cache hit — measured at 30–40% batch-throughput loss on prefix-reusing workloads ([#53670](https://github.com/vllm-project/vllm/issues/53670)).
- **Extreme prefix-cache miss case** — [#54094](https://github.com/vllm-project/vllm/issues/54094): DFlash2 + YaRN with an identical 1.04M-token prompt gets **zero** prefix-cache reuse, while a target-only run reused ~1.039M tokens.
- **Cheaper long-prompt prefill** — [#55749](https://github.com/vllm-project/vllm/pull/55749) bounds `BlockPool.cache_full_blocks` hashing to the current prefill chunk instead of repeatedly slicing all remaining hashes on every chunk (relevant when group block size ≠ hash block size).
- **torch.compile fusion coverage** — [#51934](https://github.com/vllm-project/vllm/pull/51934) adds end-to-end correctness tests for the QK-norm+RoPE fusion, closing a gap where only synthetic unit tests existed.
- **Container startup time** — [#55422](https://github.com/vllm-project/vllm/pull/55422) compiles Python bytecode at image build time; current images ship only 408 `.pyc` files for 27,753 `.py` files, with one serving startup generating ~8,700 more. [#55608](https://github.com/vllm-project/vllm/pull/55608) adds opt-in `x86_64-zstd` release image tags for faster pulls.
- **Scheduler / capacity RFCs** — length-aware batch composition with measured fairness/throughput trade-offs ([#55265](https://github.com/vllm-project/vllm/issues/55265)); incremental MoE expert offloading with GPU cache + LFRU eviction ([#38256](https://github.com/vllm-project/vllm/issues/38256)); context-aware KV-cache retention with prioritized evictions for agentic workloads ([#37003](https://github.com/vllm-project/vllm/issues/37003)).
- **Determinism as a performance feature** — the batch-invariant inference tracker ([#27433](https://github.com/vllm-project/vllm/issues/27433)) remains the coordination point (89 comments) for making vLLM output independent of batching and scheduling.

## 5. Stability & Regressions

Issues updated in the last 24 hours, ranked by severity. Fix PRs are noted where they exist.

**Silent corruption / wrong outputs**

- **DeepSeek-V4-Flash produces incorrect output with inline system messages** after PR #46025 introduced three behavior paths for chat-template handling ([#46710](https://github.com/vllm-project/vllm/issues/46710)). No fix PR yet.
- **Kimi-K3 silent output corruption in 1P1D NIXL Direct-PD disaggregated deployments** using MooncakeStoreConnector + NixlConnector via MultiConnector ([#52627](https://github.com/vllm-project/vllm/issues/52627)). Related Kimi-K3 assertion crash (`checkpoint_idx < len(blocks)`) has a fix in review ([#55747](https://github.com/vllm-project/vllm/pull/55747)).
- **`prompt_logprobs` silently corrupted** for some requests when MTP speculative decoding is enabled on Qwen3.5-family models with chunked prefill ([#53488](https://github.com/vllm-project/vllm/issues/53488)). No fix PR yet.
- **Tool calls lost for Qwen3.5-35B-A3B-FP8** when XML tool-call markup is emitted inside the `<think>` region in non-streaming mode ([#39056](https://github.com/vllm-project/vllm/issues/39056)). The Granite parser migration to the streaming Parser Engine ([#49648](https://github.com/vllm-project/vllm/pull/49648)) is the closest in-flight remedy for this bug class.

**Greedy-decoding nondeterminism**

- **Qwen3.8-Flash-Next-FP8**: five byte-identical `temperature=0` requests return five different completions when prompt length pushes past the QSA `indexer_budget` and attention switches from dense to persistent top-k ([#54521](https://github.com/vllm-project/vllm/issues/54521)).
- **DeepSeek-V4-Flash-NVFP4**: non-deterministic outputs at `temperature=0`; the failure rate scales with concurrency ([#53257](https://github.com/vllm-project/vllm/issues/53257)).
- **`thinking_token_budget` ignored** by Model Runner V2 with Qwen3.8 NVFP4 + MTP, breaking reasoning-length guarantees ([#54906](https://github.com/vllm-project/vllm/issues/54906)); an RFC proposes a truncate mode for RL-rollout use ([#54864](https://github.com/vllm-project/vllm/issues/54864)).

**CUDA crashes / hangs**

- **Xid 13 + CUDA IMA on RTX PRO 5000 (SM120)** with FP8 under sustained load ([#55571](https://github.com/vllm-project/vllm/issues/55571)) — this is the freshest report. Workaround: `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` or `--enforce-eager`. No fix PR yet.
- **DeepSeek-V4-Flash on SM12x**: NaN MQA logits drive `top_k_per_row_prefill` to emit uninitialized shared memory as indices, causing illegal memory access ([#49896](https://github.com/vllm-project/vllm/issues/49896)).
- **Silent CUDA IMA with exit code 0** on hybrid GDN + MTP k=3 + async scheduling on RTX 3090, persisting through several prior bounds-hardening fixes ([#53726](https://github.com/vllm-project/vllm/issues/53726)).
- **SM121 / DGX Spark cluster**: Mamba-2 Triton ops raise `cudaErrorIllegalInstruction` in async mode ([#37431](https://github.com/vllm-project/vllm/issues/37431)); FlashInfer + MTP with GQA=16 crashes with illegal memory access while the Triton attention backend works ([#37754](https://github.com/vllm-project/vllm/issues/37754)).
- **Engine-core livelock (100% CPU, no crash)** with MTP + xgrammar structured outputs — reported as a regression from v0.24.0 ([#49210](https://github.com/vllm-project/vllm/issues/49210)).
- **DFlash2 on XPU**: 0% draft acceptance with `--dtype float16` while bf16 works ([#55250](https://github.com/vllm-project/vllm/issues/55250)).

**Defensive fixes and smaller regressions**

- [#54123](https://github.com/vllm-project/vllm/pull/54123) rejects incompatible `mamba_ssm_cache_dtype` before it crashes EngineCore; [#54287](https://github.com/vllm-project/vllm/pull/54287) rejects FP8 Triton MoE below SM89 with a clear error instead of an opaque compile crash.
- [#55772](https://github.com/vllm-project/vllm/pull/55772) fixes Elastic EP routing during 4→2 scale-down, where a stale coordinator snapshot caused `IndexError`/HTTP 500s; [#55761](https://github.com/vllm-project/vllm/pull/55761) (closed) restores the typed `Responses` validation error boundary after a validation-framework migration.
- [#48745](https://github.com/vllm-project/vllm/issues/48745): spurious `EngineDeadError` traceback logged during graceful shutdown — low severity, no fix PR yet.
- Process signal: [#53194](https://github.com/vllm-project/vllm/issues/53194) catalogs ten+ independently-reported KV-cache key-partitioning defects over the last five months and proposes a conformance suite.

## 6. What This Means for Application Developers

- **Do not assume `temperature=0` is reproducible** on FP8 hybrid-attention models (Qwen3.8-Flash-Next, DeepSeek-V4-Flash), especially near sparse-attention indexer budgets or under load ([#54521](https://github.com/vllm-project/vllm/issues/54521), [#53257](https://github.com/vllm-project/vllm/issues/53257)). If your app depends on stable outputs, add semantic checks or pin to batch-invariant configurations — watch the umbrella tracker [#27433](https://github.com/vllm-project/vllm/issues/27433).
- **Prefix caching + MTP/DFlash2 on hybrid GDN models is currently lossy.** If you serve Qwen3.5/Qwen3.8-class GDN checkpoints with speculative decoding and prefix-reusing workloads, expect degraded hit rates and up to 30–40% throughput loss until the [#52244](https://github.com/vllm-project/vllm/pull/52244) fix class lands. Plan extra prefill capacity accordingly.
- **Tool-calling with reasoning models needs a retry/validation layer.** Non-streaming parsing can silently drop tool calls emitted inside `<think>` on Qwen3.5-35B-A3B ([#39056](https://github.com/vllm-project/vllm/issues/39056)). Also verify that `thinking_token_budget` is actually enforced on your runner version; MRV2 + MTP builds may ignore it ([#54906](https://github.com/vllm-project/vllm/issues/54906)).
- **PD-disaggregated deployments: validate outputs end-to-end.** Silent-corruption reports on Kimi-K3 with Mooncake + NIXL multi-connector ([#52627](https://github.com/vllm-project/vllm/issues/52627)) and DeepSeek-V4-Flash inline-system-message handling ([#46710](https://github.com/vllm-project/vllm/issues/46710)) argue for A/B response checks before trusting generated content in production.
- **Blackwell/SM120 operators should apply targeted kernel workarounds.** For FP8 models under sustained load, disable the FlashInfer FP8 scaled-MM kernel (or use `--enforce-eager`) until the IMA is fixed ([#55571](https://github.com/vllm-project/vllm/issues/55571)). NVFP4 KV cache on 50-series GPUs remains unavailable in vLLM proper ([#49011](https://github.com/vllm-project/vllm/issues/49011)).
- **On A100/SM80, screen model support before rollout**: Qwen3.8-Flash-Next-FP8 will not start on SM80 ([#54318](https://github.com/vllm-project/vllm/issues/54318)), and GLM-5.3-Flash currently requires an unsupported linear-attention architecture ([#54062](https://github.com/vllm-project/vllm/issues/54062)).
- **Pooling clients**: once [#55665](https://github.com/vllm-project/vllm/pull/55665) merges, the API will honor explicit `request_id` values; until then, treat response IDs as server-generated. For self-hosted container deployments, expect meaningful cold-start and image-pull improvements from the in-flight bytecode-compile ([#55422](https://github.com/vllm-project/vllm/pull/55422)) and zstd-image ([#55608](https://github.com/vllm-project/vllm/pull/55608)) PRs.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-08

## Today's Highlights
The Weight Cache Daemon roadmap passed a major milestone: Phase 1 ([#27139](https://github.com/sgl-project/sglang/pull/27139)) cut Qwen3-235B FP8 weight load from ~306–327 s to **<1 s** via per-rank CUDA IPC ([#33522](https://github.com/sgl-project/sglang/issues/33522)). The prefill CP V1 deprecation wave reached non-CUDA backends and API renames ([#38293](https://github.com/sgl-project/sglang/pull/38293), [#36229](https://github.com/sgl-project/sglang/pull/36229)), so custom CP deployments should expect breakage. On stability, Blackwell B300 (sm_103) remains the hottest area, with a new TP2 hang reported ([#38300](https://github.com/sgl-project/sglang/issues/38300)) alongside the known SM100-family-gating defects ([#34340](https://github.com/sgl-project/sglang/issues/34340)).

## Releases & Breaking Changes
No new releases in the last 24h. Breaking/in-flight changes to track:

- **Prefill CP V1 deprecation:** legacy prefill context parallelism is being removed on HIP/ROCm, Ascend NPU, and MUSA ([#38293](https://github.com/sgl-project/sglang/pull/38293), closed). CUDA users should standardize on `--enable-prefill-cp` with `--cp-strategy {zigzag,interleave}`; v1-era CLI aliases and generic server-argument entries are being dropped in the docs pass ([#36230](https://github.com/sgl-project/sglang/pull/36230)).
- **CP API renames:** `is_cp_v2_active` → `is_cp_active`, round-robin kernels/fields → `interleave`, and MLA helpers → `is_mla_cp_enabled` / `is_mla_cp_active` ([#36229](https://github.com/sgl-project/sglang/pull/36229)). Code touching CP v2 symbols will need migration.
- **Broken main:** `import sglang` currently fails on both sides of the `transformers` 5.12.1 pin ([#38183](https://github.com/sgl-project/sglang/issues/38183)).

## New Model & Hardware Support
- Qwen3.8-Flash-Next NVFP4 deployment recipes added for DGX Spark (GB10, 1x/2x, TP=2) and RTX PRO 6000 ([#37995](https://github.com/sgl-project/sglang/pull/37995), closed).
- AMD gfx950 now uses the native hardware fp8 e4m3 convert instruction ([#37140](https://github.com/sgl-project/sglang/pull/37140)).
- MXFP8 datatype support in the FlashInfer A2A communicator ([#30972](https://github.com/sgl-project/sglang/pull/30972), closed).
- Weight-cache daemon extended with post-load lifecycle hooks and MXFP4 IPC ([#38306](https://github.com/sgl-project/sglang/pull/38306)).
- RFC open for an out-of-process HiCache data plane over device-memory IPC ([#37372](https://github.com/sgl-project/sglang/issues/37372)).

## Performance & Optimization
- **Weight Cache Daemon Phase 1** ([#33522](https://github.com/sgl-project/sglang/issues/33522), landed in [#27139](https://github.com/sgl-project/sglang/pull/27139)): a per-rank daemon holds post-quantized weights and serves them via CUDA IPC — Qwen3-235B FP8 load drops from 306–327 s to <1 s.
- **Static FP8 quant fusion proposal** ([#31504](https://github.com/sgl-project/sglang/issues/31504)): eliminate the standalone `_static_quant_fp8` kernel before every FP8 GEMM by fusing quantization into producer-kernel epilogues (norm/activation/allreduce); targets ModelOpt FP8 exports like Qwen3.5-397B-A17B-NVFP4-V2.
- **Diffusion residency planning for DGX Spark/GB10:** stacked PRs improve unified-memory behavior — calibration fixes for single-iteration probes and pipeline step minimums ([#37809](https://github.com/sgl-project/sglang/pull/37809)), one-pool residency planning ([#37811](https://github.com/sgl-project/sglang/pull/37811)), read-only safetensors mappings to avoid private writable mapping overhead ([#37822](https://github.com/sgl-project/sglang/pull/37822)), file-backed fused-weight storage ([#37819](https://github.com/sgl-project/sglang/pull/37819)), and shared-pool streaming weights with an O_DIRECT reader ([#37680](https://github.com/sgl-project/sglang/pull/37680)).
- MoRI decode-mode dispatch token budget is now validated against CUDA graph batch sizes ([#37964](https://github.com/sgl-project/sglang/pull/37964)).
- KV events gained `component_types` on `BlockStored` so hybrid-model KV components (full attention, sliding window, Mamba state) can be placement-tracked independently across cache tiers ([#32514](https://github.com/sgl-project/sglang/pull/32514)).

## Stability & Regressions
Ranked by severity; fix PRs noted where they exist.

- **Blackwell/sm_103 family-gating bug** ([#34340](https://github.com/sgl-project/sglang/issues/34340)): `is_sm100_supported()` checks only major==10, so sm_103 executes SM100 paths — cutedsl TGV BF16 GEMM raises Xid 13 and trtllm-gen MoE finalize hangs.
- **New TP2 hang on B300** ([#38300](https://github.com/sgl-project/sglang/issues/38300)): HiCache + breakable prefill CUDA graphs + FlashInfer MNNVL. Broader FlashInfer-on-Blackwell support is also questioned ([#35080](https://github.com/sgl-project/sglang/issues/35080)).
- **GLM-5.2 FP4 + EAGLE illegal memory access** ([#30209](https://github.com/sgl-project/sglang/issues/30209)): flashinfer_trtllm bf16 batched-GEMM crash in the nextn draft MoE on B200/B300.
- **HiCache host-tier load-back corrupts generation** ([#38031](https://github.com/sgl-project/sglang/issues/38031)): GLM-5.3-Flash (DSA) on 8×H100 drops tool calls and enters repetition loops, even without speculative decoding.
- **Zombie requests from disconnected streaming clients** ([#36333](https://github.com/sgl-project/sglang/issues/36333)): abandoned streams decode to max_tokens and flood "state was deleted in TokenizerManager"; regression from the revert of #34160. No fix PR yet.
- **DSPARK draft KV pool budget bug** ([#38202](https://github.com/sgl-project/sglang/issues/38202)): uses `tp_size` instead of `attn_tp_size`, causing OOM under DP attention with Kimi-K3.
- **EPLB + DSPARK CUDA-graph capture crash** ([#34974](https://github.com/sgl-project/sglang/issues/34974)): `scatter_add_` dimension mismatch with `layer_idx=None`.
- **Decode-mode KV retract crash** ([#33385](https://github.com/sgl-project/sglang/issues/33385)): `DeepSeekV4TokenToKVPool` lacks `get_cpu_copy()` → `NotImplementedError`.
- **ROCm EAGLE silently greedy** ([#37134](https://github.com/sgl-project/sglang/pull/37134), fix open): verify path commits argmax, ignoring temperature/top_p and producing repetition loops.
- **EAGLE3 aux-layer capture fix for Qwen3.5** ([#38307](https://github.com/sgl-project/sglang/pull/38307), new).
- **A100/SM80 regression:** serving Qwen3.8-Flash-Next-FP8 fails with `fp8e4nv` unsupported ([#38291](https://github.com/sgl-project/sglang/issues/38291)).
- **PP disaggregated prefill deadlock** under abort storms from diverging bootstrap queues ([#34572](https://github.com/sgl-project/sglang/issues/34572)); related drain-aware `ABORT_ACK` protocol in progress ([#37077](https://github.com/sgl-project/sglang/pull/37077)).
- API/correctness: server-default `reasoning_effort` silently overrides per-request values ([#38104](https://github.com/sgl-project/sglang/issues/38104)); `/v1/responses` `created_at` is float in streaming but int in non-streaming ([#34716](https://github.com/sgl-project/sglang/issues/34716)).
- CI status: 1 broken, 9 flaky, 962 recently fixed per the tracking issue ([#17050](https://github.com/sgl-project/sglang/issues/17050)); CUDA coredump collection continues ([#26340](https://github.com/sgl-project/sglang/issues/26340)).

## What This Means for Application Developers
- **Weight-cache daemon changes restart economics.** Sub-second weight loading for 100B+ FP8 models materially improves failover and rolling deploys — but wait for the lifecycle/MXFP4 hardening PRs ([#38306](https://github.com/sgl-project/sglang/pull/38306)) before relying on it.
- **Plan for CP config churn.** Prefill-CP API renames and removal of non-CUDA legacy implementations will break existing launch scripts and code; migrate to `--enable-prefill-cp` + zigzag/interleave on CUDA ([#36229](https://github.com/sgl-project/sglang/pull/36229), [#36230](https://github.com/sgl-project/sglang/pull/36230)).
- **Blackwell + FlashInfer/HiCache is high-risk right now.** Multiple unfixed kernel-level defects on B300 (hang/Xid 13) mean production users should pin known-good versions or default backends until the sm_103 gating fix lands ([#34340](https://github.com/sgl-project/sglang/issues/34340), [#38300](https://github.com/sgl-project/sglang/issues/38300)).
- **Disconnects are expensive.** The zombie-request regression ([#36333](https://github.com/sgl-project/sglang/issues/36333)) means flaky clients can tie up decode slots to max_tokens; apps should send explicit cancellations and monitor tokenizer-deleted-state errors.
- **Watch main-build health.** The `transformers` pin break ([#38183](https://github.com/sgl-project/sglang/issues/38183)) blocks `import sglang` from main today; also beware `--default-chat-template-kwargs reasoning_effort` silently overriding per-request values ([#38104](https://github.com/sgl-project/sglang/issues/38104)) when routing agent workloads across reasoning tiers.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-08

## Today’s Highlights

- Ten new bleeding-edge builds landed (`b10831`–`b10850`), with the main theme being Vulkan feature parity: DeepSeek-V4 hyper-connection fused ops, TQ1_0 tensor support, RMS_NORM fusion, and safer GET_ROWS handling.
- CUDA also gained branchless Q4_K/Q5_K unpacking for faster mixed-mm vector quantization and a fix for a divergent barrier in FP16 flash attention.
- The issue tracker is dominated by Qwen-family correctness reports (tool-call parsing, silent EOS, nondeterministic QSA top-k) plus a deterministic CUDA flash-attention crash and a ggml allocator stale-plan bug that can cause silent memory corruption.

---

## Releases & Breaking Changes

No user-facing API or config breaking changes were announced in this snapshot.

Latest merged release chain: `b10831` → `b10850`. Notable release-linked changes:

- [`b10850`](https://github.com/ggml-org/llama.cpp/pull/28553): Test-only fix; initializes the L2_NORM batch array to avoid a maybe-uninitialized warning.
- [`b10844`](https://github.com/ggml-org/llama.cpp/pull/26578): Vulkan DeepSeek-V4 hyper-connection fused ops (`DSV4_HC_COMB/PRE/POST`).
- [`b10842`](https://github.com/ggml-org/llama.cpp/pull/26454): HIP support for AMD `gfx90c`.
- [`b10840`](https://github.com/ggml-org/llama.cpp/pull/26705): CUDA branchless Q4_K/Q5_K unpack for mmvq plus L2 prefetch on DGX Spark.
- [`b10839`](https://github.com/ggml-org/llama.cpp/pull/28253): Vulkan GET_ROWS now supports type-aligned offsets and falls back to CPU for misaligned cases.
- [`b10835`](https://github.com/ggml-org/llama.cpp/pull/27870): Fixes a divergent barrier in the CUDA FP16 flash-attention path.
- [`b10834`](https://github.com/ggml-org/llama.cpp/pull/28387): Allows backend inputs to skip creating another tensor split.

No migration notes were included.

---

## New Model & Hardware Support

- **DeepSeek-V4 on Vulkan** — [`PR #26578`](https://github.com/ggml-org/llama.cpp/pull/26578) adds the DeepSeek-V4 hyper-connection fused ops to the Vulkan backend. CUDA already had these after the DeepSeek-V4 merge, and Metal received them via `#26459`; Vulkan is no longer missing this model path.
- **AMD gfx90c HIP support** — [`PR #26454`](https://github.com/ggml-org/llama.cpp/pull/26454) adds HIP enablement for AMD `gfx90c` integrated GPUs.
- **Vulkan TQ1_0 support** — [`PR #27765`](https://github.com/ggml-org/llama.cpp/pull/27765) adds TQ1_0 matrix-multiply, mat-vec, mat-vec-id, dequant, and `get_rows` support in Vulkan.
- **In progress:** Hexagon RELU/LEAKY_RELU ops in [`PR #28585`](https://github.com/ggml-org/llama.cpp/pull/28585), and an RFC for native LTX-2 image/video/audio diffusion GGUF serving in [`Issue #28541`](https://github.com/ggml-org/llama.cpp/issues/28541).

---

## Performance & Optimization

### Landed in this build chain

- **CUDA branchless Q4_K/Q5_K unpack** — [`PR #26705`](https://github.com/ggml-org/llama.cpp/pull/26705) avoids re-executing scale unpacking for every column in mmvq, improving performance at batch sizes > 1. Also adds L2 prefetch on DGX Spark.
- **Vulkan RMS_NORM fusion** — [`PR #28024`](https://github.com/ggml-org/llama.cpp/pull/28024) supports fusing `RMS_NORM + MUL + ADD (+MUL)` and `RMS_NORM + VIEW + SET_ROWS`; also extends `ROPE + VIEW + SET_ROWS` to IMROPE. Author measured ~4% gain on Gemma 4.
- **Vulkan TQ1_0 kernels** — [`PR #27765`](https://github.com/ggml-org/llama.cpp/pull/27765) adds native `TQ1_0` paths rather than generic fallbacks.

### In-progress / open PRs

- **Dedicated Vulkan `iq4_xs` mat-vec shader** — [`PR #28426`](https://github.com/ggml-org/llama.cpp/pull/28426) reports ~+6–17% token generation on RDNA4 for affected models.
- **SYCL batched L2_NORM kernel** — [`PR #28222`](https://github.com/ggml-org/llama.cpp/pull/28222) batches consecutive same-shape F32 L2_NORM operations; author measured dispatches dropping from 12,480 → 6,240 on Arc B70.
- **CUDA/AMD RDNA MMA flash attention for head dim 256** — [`PR #26419`](https://github.com/ggml-org/llama.cpp/pull/26419) aims to restore WMMA/MMA prompt-processing performance on RDNA 4 after the rocWMMA removal.
- **MoE expert lookahead H2D prefetch** — [`PR #28414`](https://github.com/ggml-org/llama.cpp/pull/28414) adds an optional `--prefetch-experts-slots N` flag to prefetch host-resident MoE experts before they are needed.

---

## Stability & Regressions

### Merge fixes in this release chain

- [`PR #27870`](https://github.com/ggml-org/llama.cpp/pull/27870): Fixes divergent barrier in CUDA FP16 flash attention.
- [`PR #28253`](https://github.com/ggml-org/llama.cpp/pull/28253): Prevents Vulkan GET_ROWS assertion by falling back to CPU on misaligned offsets.
- [`PR #28553`](https://github.com/ggml-org/llama.cpp/pull/28553): Fixes a possible uninitialized L2_NORM batch array in tests.

### Open issues updated in the last 24h, ranked by severity

1. **CUDA flash-attention illegal memory access with MoE + expert offload** — [`Issue #26609`](https://github.com/ggml-org/llama.cpp/issues/26609). Deterministic crash in `cudaStreamSynchronize` on second request with Qwen3.6-35B MoE and partial offload. Workaround in report: disable flash attention (`-fa off`). No fix linked yet.

2. **`ggml_gallocr` stale allocation plan can cause silent memory corruption** — [`Issue #28448`](https://github.com/ggml-org/llama.cpp/issues/28448). If a graph node changes identity at the same position without changing size, the allocator can incorrectly reuse an old plan. This is dangerous for dynamic-topology sparse MoE graphs.

3. **qwen4exp QSA indexer nondeterminism on CUDA** — [`Issue #28497`](https://github.com/ggml-org/llama.cpp/issues/28497). Top-k over tied block scores via CUB DeviceTopK selects a different cell set on each run, producing unstable outputs.

4. **Parallel `tool_calls` mangled or hang on Qwen models** — [`Issue #28522`](https://github.com/ggml-org/llama.cpp/issues/28522). New report: parallel function calling breaks or stalls on a tool with ~48 optional parameters, affecting multiple Qwen models.

5. **Qwen3.5-hybrid silent instant-EOS beyond ~130K context** — [`Issue #27756`](https://github.com/ggml-org/llama.cpp/issues/27756). Reproduced on both CUDA and CPU; report links it to DeltaNet recurrent-state depth degradation.

6. **Qwen3.5 9B stops when tool calls appear inside thinking block** — [`Issue #20837`](https://github.com/ggml-org/llama.cpp/issues/20837). Long-running agentic chat-parser bug; 60 comments and 17 👍; still open.

7. **Vulkan qwen4exp `--lazy-mode auto` halves pp512** — [`Issue #28160`](https://github.com/ggml-org/llama.cpp/issues/28160). Regression traced to “llama: improve TENSOR_READ_LAZY handling” (`#27837`).

8. **K2-Horizon models fail to load** — [`Issue #28361`](https://github.com/ggml-org/llama.cpp/issues/28361). Load failure on CUDA with an i9-14900HX + RTX 4060; likely architecture/GGUF compatibility issue.

9. **HIP gfx1151 wrong logits for prompts longer than `n_ubatch`** — [`Issue #28211`](https://github.com/ggml-org/llama.cpp/issues/28211). No crash, but incorrect output on Strix Halo Radeon 8060S.

10. **Metal: server reports “model loaded” after fatal OOM, then 500s every request** — [`Issue #27309`](https://github.com/ggml-org/llama.cpp/issues/27309). Lifecycle issue in `llama-server`; should fail fast instead of binding a broken server.

Note: no fix PRs were visible for most of these open issues in this snapshot.

---

## What This Means for Application Developers

- **Qwen-based agent applications remain risky.** The combination of [`#20837`](https://github.com/ggml-org/llama.cpp/issues/20837), [`#28522`](https://github.com/ggml-org/llama.cpp/issues/28522), and [`#27756`](https://github.com/ggml-org/llama.cpp/issues/27756) means tool-calling and long-context reliability on Qwen-derived models still needs defense-in-depth: disable thinking when XML tool-call output is expected, and add output validation/retry logic rather than trusting raw parse success.
- **If you serve MoE models on CUDA with partial expert offload, verify `-fa off` or pin builds until the flash-attention crash is fixed.** [`Issue #26609`](https://github.com/ggml-org/llama.cpp/issues/26609) is deterministic and can crash a server on the second request.
- **Vulkan deployments are improving quickly.** DeepSeek-V4 support, TQ1_0, RMS_NORM fusion, and the pending `iq4_xs` shader make Vulkan a more viable backend for both AMD iGPU and discrete RDNA4 serving.
- **The `ggml_gallocr` stale-plan bug in [`#28448`](https://github.com/ggml-org/llama.cpp/issues/28448) is a reminder to isolate/upgrade carefully if you run sparse MoE or dynamic-graph workloads.** Silent memory corruption is the worst failure mode; watch for fix PRs before relying on long-running multi-graph services.
- **Performance is still moving mostly at the kernel level.** The CUDA mmvq work and Vulkan fusion/FMA work are auto-enabling — upgrading to `b10840+` should give small token-generation gains without any config change.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Project Digest — 2026-09-08

## 1. Today's Highlights
The llama.cpp vendor bump b10760 → b10829 ([PR #18279](https://github.com/ollama/ollama/pull/18279)) is set to add native `spark2_5` architecture support for the Spark-X2.5 model family, closing [#18195](https://github.com/ollama/ollama/issues/18195). OpenAI-compat work is active: `/v1/responses` will accept Codex-style `agent_message` inputs ([PR #18298](https://github.com/ollama/ollama/pull/18298), fixing [#18286](https://github.com/ollama/ollama/issues/18286)), and tool-search call IDs are being switched to the `tsc_` prefix for OpenAI cross-compatibility ([PR #18296](https://github.com/ollama/ollama/pull/18296)). No new Ollama release shipped in the last 24 h, but a ~5× CUDA token-generation regression in v0.33.2 ([#18225](https://github.com/ollama/ollama/issues/18225)) is the most urgent item in the tracker today.

## 2. Releases & Breaking Changes
None in the last 24 h. Version references in active regressions: v0.32.9 last-known-good for runaway generations ([#17910](https://github.com/ollama/ollama/issues/17910)), v0.32.13 normal for CUDA throughput ([#18225](https://github.com/ollama/ollama/issues/18225)).

## 3. New Model & Hardware Support
- **Spark-X2.5 (4B/1.7B)**: duplicate requests for native `spark2_5` support ([#18195](https://github.com/ollama/ollama/issues/18195), [#18290](https://github.com/ollama/ollama/issues/18290)). [PR #18279](https://github.com/ollama/ollama/pull/18279) bumps llama.cpp and is the intended fix.
- **Tencent Hy4**: preview/quantized model family requested ([#18287](https://github.com/ollama/ollama/issues/18287)); no PR yet.
- **MLX runner**: support for Qwen static YaRN contexts/RoPE scaling is in flight ([PR #18263](https://github.com/ollama/ollama/pull/18263)), enabling longer requested contexts on Apple Silicon; the earlier context-enforcement PR ([#18261](https://github.com/ollama/ollama/pull/18261)) has been superseded by the soft-sizing-aware approach in [PR #18285](https://github.com/ollama/ollama/pull/18285).
- **AMD/ROCm**: `TensileLibrary_lazy_gfx1200.dat` load failure on RX 9060 XT (gfx1200) with qwen3.8:27b remains open ([#17782](https://github.com/ollama/ollama/issues/17782)).

## 4. Performance & Optimization
- **CUDA regression (open)**: v0.33.2 is ~5× slower than v0.32.13 on RTX 3090 (24 GB ×9, no NVLink, CUDA 13.2), same model file and GPU; no fix PR yet ([#18225](https://github.com/ollama/ollama/issues/18225)).
- **Runaway generations**: v0.32.11–0.32.15 generate past any natural end until killed; v0.32.9 unaffected (Mac Studio M1 Max) ([#17910](https://github.com/ollama/ollama/issues/17910), closed as needs-more-info).
- **OpenAI-compat `num_ctx`**: [PR #16825](https://github.com/ollama/ollama/pull/16825) forwards `num_ctx` from `/v1/chat/completions` and `/v1/completions`, fixing [#16814](https://github.com/ollama/ollama/issues/16814).
- **Observability**: opt-in Prometheus `/metrics` endpoint (`OLLAMA_METRICS=1`) with scheduler/queue/token metrics remains open ([PR #16998](https://github.com/ollama/ollama/pull/16998)).
- **Modelfile `temperature`**: still honored on `/api/chat` but overridden by server defaults on `/v1/chat/completions` ([#17744](https://github.com/ollama/ollama/issues/17744)).
- **GPU memory utilization**: report of models using <40% of VRAM and spilling to system RAM closed as needs-more-info ([#17971](https://github.com/ollama/ollama/issues/17971)).

## 5. Stability & Regressions
Ranked by severity:
1. **CUDA throughput regression in 0.33.x** — ~5× slower generation, GPU idle-ish; RTX 3090, open ([#18225](https://github.com/ollama/ollama/issues/18225)).
2. **Broken low-bit library artifacts** — qwen2.5-coder:3b-instruct q2_K/q3_K_S/M/L score 0/15 on code tasks while sibling quants pass; open ([#18252](https://github.com/ollama/ollama/issues/18252)).
3. **Corrupted output from long-lived runners** — `keep_alive -1` runner emits repeated placeholder tokens after coexisting with a second model; persists until restart ([#18208](https://github.com/ollama/ollama/issues/18208)).
4. **Scheduler reload churn** — llama-server restarted with default 4096 context immediately after a successful load, forcing redundant re-loads ([#18129](https://github.com/ollama/ollama/issues/18129)); related eviction-loop report suggests fail-fast instead of thrash ([#18282](https://github.com/ollama/ollama/issues/18282)).
5. **Thinking-tag leakage / dropped thinking** — unmatched `</think>` leaks to the client ([PR #18288](https://github.com/ollama/ollama/pull/18288)); assistant `thinking` content is not passed to the chat template on multi-turn calls ([PR #18281](https://github.com/ollama/ollama/pull/18281)). Related: token-budget bound for thinking loops ([PR #17566](https://github.com/ollama/ollama/pull/17566)).
6. **MTP triggers CPU offload** on Qwen3.8 27b + RTX 5090 ([#18186](https://github.com/ollama/ollama/issues/18186), closed).
7. **Cloud JSON schema ignored** — cloud models return JSON that does not conform to the reply schema ([#12362](https://github.com/ollama/ollama/issues/12362)); also `reasoning_effort` mapping wrong for glm-5.3-flash:cloud ([#18121](https://github.com/ollama/ollama/issues/18121)).
8. **Security** — `OLLAMA_DEBUG_LOG_REQUESTS` persists full prompt bodies without retention/redaction controls ([#18210](https://github.com/ollama/ollama/issues/18210), closed); agent `read` tool absolute-path confinement fix in [PR #18027](https://github.com/ollama/ollama/pull/18027).
9. **CUDA arch gap** — silent CPU fallback on sm_86 (RTX 30/A40/A6000) with CUDA 13 builds ([#17841](https://github.com/ollama/ollama/issues/17841), closed); Vulkan gfx1151 compute-ring timeout on long prefills ([#17870](https://github.com/ollama/ollama/issues/17870), closed — `num_batch=128` works around). Installer fails silently on Ubuntu 26.04 when `zstd` CLI is missing ([#17860](https://github.com/ollama/ollama/issues/17860), closed).
10. **Model name limit** — 80-char validation blocks long `hf.co` repo names; [PR #18278](https://github.com/ollama/ollama/pull/18278) raises the limit to 96 ([#18274](https://github.com/ollama/ollama/issues/18274)).

## 6. What This Means for Application Developers
- **OpenAI-compat parity is arriving, but verify per endpoint**: `num_ctx` forwarding ([PR #16825](https://github.com/ollama/ollama/pull/16825)) and Modelfile temperature handling still need review; the `/v1/chat/completions` path remains inconsistent with `/api/chat`.
- **Codex/multi-agent users**: `agent_message` inputs ([PR #18298](https://github.com/ollama/ollama/pull/18298)) and `tsc_` tool-search IDs ([PR #18296](https://github.com/ollama/ollama/pull/18296)) are direct fixes for the `/v1/responses` gap — expect better interop once merged.
- **Pin versions deliberately on CUDA**: if you are on the 0.33.x line and see throughput collapse, compare against 0.32.13; upstream is still triaging ([#18225](https://github.com/ollama/ollama/issues/18225)). v0.32.9 remains the reference for generation-termination behavior ([#17910](https://github.com/ollama/ollama/issues/17910)).
- **Thinking/reasoning models**: don't assume thinking blocks survive round-trips today — fixes are in flight ([PR #18281](https://github.com/ollama/ollama/pull/18281)); for agent loops, consider enforcing your own reasoning budget until [PR #17566](https://github.com/ollama/ollama/pull/17566) lands.
- **Model zoo hygiene**: long `hf.co` model names fail until [PR #18278](https://github.com/ollama/ollama/pull/18278) merges, and specific low-bit qwen2.5-coder artifacts are currently unusable for code tasks ([#18252](https://github.com/ollama/ollama/issues/18252)).
- **Production prompt logging**: avoid `OLLAMA_DEBUG_LOG_REQUESTS` in agent/production workloads until retention/redaction controls exist ([#18210](https://github.com/ollama/ollama/issues/18210)).

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-08

## Today's Highlights
No releases have landed in the last 24 hours. The main attention is on translation/pass-through correctness: Bedrock non-streaming Converse passthrough returns empty 200 bodies ([#40131](https://github.com/BerriAI/litellm/issues/40131)), `/v1/files` error bodies are unclassifiable ([#40135](https://github.com/BerriAI/litellm/issues/40135)), and the `gpt-6-astra` model registry entry is misconfigured as chat mode ([#40123](https://github.com/BerriAI/litellm/issues/40123)). Meanwhile, MCP secret storage is being encrypted ([#40164](https://github.com/BerriAI/litellm/pull/40164)), and auto-router operators are getting a new “Shunt” preset and better classification cost visibility ([#40158](https://github.com/BerriAI/litellm/pull/40158), [#40168](https://github.com/BerriAI/litellm/pull/40168)).

## Releases & Breaking Changes
No new releases or migration notes for this digest window.

## New Model & Hardware Support
No hardware/quantization/backend support changes merged in this window. Model-registry-related signals:

- `openrouter/openai/gpt-5.6-sol` is missing from `model_prices_and_context_window.json`, so it cannot be added through LiteLLM ([#40102](https://github.com/BerriAI/litellm/issues/40102)).
- `gpt-6-astra` was registered with `mode: "chat"`; OpenAI rejects its tool calls over `/v1/chat/completions`, and the Responses bridge never engages ([#40123](https://github.com/BerriAI/litellm/issues/40123)).
- A PR adds the ChatGPT subscription provider to the Admin UI’s Add Model form ([#40170](https://github.com/BerriAI/litellm/pull/40170)).
- Z.AI (Zhipu AI) appears in the provider dropdown, but its credential/model form fields do not render on v1.99.1 ([#39310](https://github.com/BerriAI/litellm/issues/39310)).

## Performance & Optimization
No concrete latency/throughput numbers were reported in this batch. In-flight efficiency work:

- Auto-router “Shunt” preset: bounds large file reads to cheaper models and delegates boilerplate codegen away from expensive models ([#40158](https://github.com/BerriAI/litellm/pull/40158)).
- Complexity router: adds declarative `custom_dimensions` with inline weights, keywords, and regex patterns beyond the existing `technicalTerms` list ([#40156](https://github.com/BerriAI/litellm/pull/40156)).
- Auto-router UI spend reporting now splits out classification cost from actual LLM spend ([#40168](https://github.com/BerriAI/litellm/pull/40168)).
- Helm/Terraform: PR exposes SSE keepalive pings, pre-call checks, and a metrics sidecar as typed deployment inputs ([#40163](https://github.com/BerriAI/litellm/pull/40163)).

## Stability & Regressions
The most severe/correctness-impacting items, roughly in priority order:

- **Bedrock Converse passthrough returns HTTP 200 with an empty body** on non-streaming `/converse`, while `/converse-stream` works. No fix PR is visible yet ([#40131](https://github.com/BerriAI/litellm/issues/40131)).
- **`gpt-6-astra` tool calls are broken**: the registry sets `mode: "chat"`, so chat tool calls are rejected and the `/v1/responses` bridge never engages ([#40123](https://github.com/BerriAI/litellm/issues/40123)).
- **Concurrent first requests for unknown end users bypass `max_end_user_budget_id`** under custom auth, allowing budget overspend ([#40095](https://github.com/BerriAI/litellm/issues/40095)).
- **v3 rate limiter double-counts team per-model limits**: a configured team-model limit of N starts 429ing at ~N/2 ([#34140](https://github.com/BerriAI/litellm/issues/34140)).
- **Claude Code / multi-turn tool-use regression on vLLM/Kimi K2.7** remains open since v1.91.0; `sanitize_tool_use_ids_in_anthropic_messages` breaks pass-through multi-turn tool calls ([#32214](https://github.com/BerriAI/litellm/issues/32214)).
- **Streaming `/v1/responses` ownership accounting is skipped**: `HiddenParamsAsyncIteratorWrapper` hides `completed_response`, re-introducing the #30210 class of regression ([#40120](https://github.com/BerriAI/litellm/issues/40120)).
- **OpenAI prompt cache is still dropped on the `/v1/messages` → Responses bridge** (`encrypted_content` lost), even after #37953 ([#39339](https://github.com/BerriAI/litellm/issues/39339)). Related `prompt_cache_key` derivation from `user_id` is also incorrect ([#39145](https://github.com/BerriAI/litellm/issues/39145)).
- **`cache_control_injection_points` is a no-op for caching** and can cause a deterministic Claude tool-call loop until MaxTurns ([#29810](https://github.com/BerriAI/litellm/issues/29810)).
- **Streaming `/v1/responses` success logger crashes**, so streaming responses do not write SpendLogs and go uncharged ([#29913](https://github.com/BerriAI/litellm/issues/29913)).
- **Headroom CCR streaming conversion leaves `stream_options` after forcing `stream=false`**, causing DeepSeek HTTP 400s ([#40068](https://github.com/BerriAI/litellm/issues/40068)).
- **All `/v1/files` error responses serialize `type` and `param` as literal `"None"`**, making API errors unclassifiable for SDKs/clients ([#40135](https://github.com/BerriAI/litellm/issues/40135)).
- **Bedrock invoke path still leaks LiteLLM-internal optional params** into the upstream request body ([#30371](https://github.com/BerriAI/litellm/issues/30371)).
- **`/v1/images/edits` with mask** continues to fail with `“Attempted to access streaming request content…”` ([#26552](https://github.com/BerriAI/litellm/issues/26552)). Separately, per-model `drop_params` is being forwarded as a multipart field on image edits ([#40153](https://github.com/BerriAI/litellm/issues/40153)).

Fixes in flight for related issues:

- **Azure image generation with Entra ID/managed identity**: PR resolves and sends the Entra ID token on `/v1/images/generations` ([#40147](https://github.com/BerriAI/litellm/pull/40147)).
- **Bedrock request-ID visibility**: PR preserves `x-amzn-RequestId` on Bedrock chat error responses ([#40089](https://github.com/BerriAI/litellm/pull/40089)).
- **MCP credential handling**: PR encrypts stored static headers and stdio environment maps ([#40164](https://github.com/BerriAI/litellm/pull/40164)).

## What This Means for Application Developers
- If you run Claude Code or Anthropic-protocol clients against non-Anthropic backends, treat multi-turn tool-use and prompt-cache bridging as unstable today. Pin LiteLLM versions carefully until `#32214`, `#39339`, and `#39145` are resolved.
- For Bedrock passthrough users, prefer streaming `/converse-stream` or verify non-streaming behavior per deployment; the 200-empty-body bug affects the plain `/converse` path ([#40131](https://github.com/BerriAI/litellm/issues/40131)).
- Budget enforcement is not fully safe for concurrent first-time end users (`#40095`), and v3 team-model rate limits are effectively half-configured (`#34140`). Do not rely on exact 429 thresholds for capacity planning yet.
- Streaming `/v1/responses` traffic may be missing spend logs entirely due to `#29913`; audit spend records separately if you use streaming Responses heavily.
- Watch for model-registry issues around newer OpenAI models: `gpt-5.6-sol` cannot be added, and `gpt-6-astra` needs a `mode: "responses"` fix before tool-calling will work.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-08

## 1. Today's Highlights

The dominant theme is Unsloth Studio/CLI reliability hardening: a coordinated set of PRs makes `unsloth start`/`unsloth train` respect the flags and config they are given instead of silently using defaults, and stops `unsloth start` from tearing down long-running model downloads ([#10451](https://github.com/unslothai/unsloth/pull/10451), [#10452](https://github.com/unslothai/unsloth/pull/10452), [#10453](https://github.com/unslothai/unsloth/pull/10453)). On the agent side, images returned by MCP tools now actually reach the model instead of being described hallucinatorily ([#10088](https://github.com/unslothai/unsloth/pull/10088)). Maintainer-authored issues flag a real installer defect where torch 2.3/2.4 get the wrong torchcodec line ([#10433](https://github.com/unslothai/unsloth/issues/10433)) and a torchcodec index-availability gap on cu128 ([#10434](https://github.com/unslothai/unsloth/issues/10434)).

## 2. Releases & Breaking Changes

No releases or new tags in the last 24 hours. No migration notes.

## 3. New Model & Hardware Support

- **Qwen 3 AVL 2B/0.6B requested** — combined VL + ASR model; no support yet ([#10459](https://github.com/unslothai/unsloth/issues/10459)).
- **qwen3.6 35B A3B MLX API returning bad responses** via base64 and URL image methods; open and unsolved ([#10389](https://github.com/unslothai/unsloth/issues/10389)).
- **Mixed NVIDIA+AMD hosts**: the Studio installer always selects the CUDA PyTorch stack, making the AMD card invisible for training. No workaround exists in-app; request for ROCm probing is open ([#10450](https://github.com/unslothai/unsloth/issues/10450)).
- **AMD/ROCm video generation**: Wan2.2 TI2V OOMs on RX 9060 XT because no fused attention kernel is available and it falls back to the PyTorch SDPA math backend ([#10415](https://github.com/unslothai/unsloth/issues/10415)).
- **Windows on ARM**: PR adds native ARM64 CUDA stack installs for NVIDIA WoA hosts (GB10/N1X "RTX Spark"), previously misdetected as GPU-less ([#10282](https://github.com/unslothai/unsloth/pull/10282)).
- **MLX model detection**: the model picker now identifies `mlx-community` repos as MLX instead of Safetensors; names ending `-MLX` were previously the only signal ([#10457](https://github.com/unslothai/unsloth/pull/10457)).

## 4. Performance & Optimization

- **Smart offload planner** (in progress, behind `UNSLOTH_SMART_OFFLOAD`): weighs the cost of VRAM spill against llama.cpp's own fitter, adds a sub-FFN spill ladder and context-aware device reserve ([#9872](https://github.com/unslothai/unsloth/pull/9872)).
- **Speculative-decoding acceptance measurement**: new `unsloth/spec_decoding` tooling proposed to quantify whether a draft/target pair is worth serving, replacing the current "deploy and eyeball tokens/sec" approach ([#10401](https://github.com/unslothai/unsloth/issues/10401), [#10416](https://github.com/unslothai/unsloth/pull/10416)).
- **GitHub API hammering fixed**: the Studio update path made one extra request per llama.cpp release; this was enough to trigger rate limits. Fix reduces it to a single preflight request ([#10461](https://github.com/unslothai/unsloth/pull/10461), fixes [#10449](https://github.com/unslothai/unsloth/issues/10449)).
- Open diagnostics: **constant CPU usage** in Studio reported, no cause identified yet ([#10390](https://github.com/unslothai/unsloth/issues/10390)).

## 5. Stability & Regressions

Ranked by severity:

- **Studio installer torchcodec matrix is wrong for torch 2.3/2.4** — `_select_torchcodec_spec` falls through to the torch-2.10 line (`torchcodec>=0.10.0,<0.11.0`) for unsupported torch minors, and the ABI-stability exemption fails to check index availability (cu128 has no torchcodec 0.12+). Both are maintainer-flagged and open ([#10433](https://github.com/unslothai/unsloth/issues/10433), [#10434](https://github.com/unslothai/unsloth/issues/10434)).
- **Windows CI parity failing**: the non-ASCII venv-hardening test fails on both PowerShell shells (2 failed / 670 passed). A decoding fix exists ([#10460](https://github.com/unslothai/unsloth/issues/10460), [#10462](https://github.com/unslothai/unsloth/pull/10462)).
- **AMD VRAM offload contract violated**: on ROCm, the "No Ram Offload" checkbox is ignored — the model is still unloaded from VRAM into RAM ([#10341](https://github.com/unslothai/unsloth/issues/10341)).
- **Ollama SYSTEM prompt overridden**: enabling "tell the model today's date" clobbers a remote Ollama Modelfile `SYSTEM` prompt; fix is in PR ([#10436](https://github.com/unslothai/unsloth/issues/10436), [#10463](https://github.com/unslothai/unsloth/pull/10463)).
- **GGUF variants disappear** after switching cache/download folders; fix preserves a single repo row across folders ([#10437](https://github.com/unslothai/unsloth/issues/10437), [#10438](https://github.com/unslothai/unsloth/pull/10438)).
- **Prompt queue cleared** every time generation is stopped or settings reload the model ([#10428](https://github.com/unslothai/unsloth/issues/10428)).
- **"Switch Back" reloads original local model with hardcoded 4096 context** instead of the user's previously configured context ([#10338](https://github.com/unslothai/unsloth/issues/10338)).
- **Intel Arc B580 import still broken**: `unsloth_zoo/temporary_patches/gpt_oss.py` calls `torch.xpu.memory.mem_get_info()`, unsupported on this GPU; 15 comments and still open after ~11 months ([#3533](https://github.com/unslothai/unsloth/issues/3533)).
- Custom load settings (context, KV cache quantization) ignored when a model is auto-loaded via the API ([#10227](https://github.com/unslothai/unsloth/issues/10227), now closed).
- Lower severity / closed: attachment silently dropped when unreadable — fix in review ([#10261](https://github.com/unslothai/unsloth/pull/10261)); Copy buttons broken in Studio UI ([#5097](https://github.com/unslothai/unsloth/issues/5097)); Studio uninstaller doesn't free space — workaround is `uv cache clean` ([#9651](https://github.com/unslothai/unsloth/issues/9651)); oversized 238-char API key failing RSAES-OAEP encryption ([#10411](https://github.com/unslothai/unsloth/issues/10411), closed); remote-access settings duplicated between Settings and API pages ([#9519](https://github.com/unslothai/unsloth/issues/9519)); Code-tool files hidden inside collapsed tool cards with no sandbox preview ([#10425](https://github.com/unslothai/unsloth/issues/10425)).

## 6. What This Means for Application Developers

- **CLI automation is about to get safer**: `unsloth train --config` currently drops unknown keys and trains silently with defaults — this will become a hard error; `unsloth start dsh` will actually apply `--context-length` and load flags to already-running servers, so pin expectations accordingly ([#10452](https://github.com/unslothai/unsloth/pull/10452), [#10451](https://github.com/unslothai/unsloth/pull/10451)).
- **Long model downloads will survive** `unsloth start` — the previous 15-minute readiness timeout killed servers mid-download (([#10453](https://github.com/unslothai/unsloth/pull/10453)).
- **Multimodal agent builders**: MCP tools returning images now get those images into the model context ([#10088](https://github.com/unslothai/unsloth/pull/10088)), and chats survive switching to a model without tool support instead of erroring on stale tool history ([#10454](https://github.com/unslothai/unsloth/pull/10454)). Image-only sends on Anthropic are fixed ([#10455](https://github.com/unslothai/unsloth/pull/10455)).
- **Local thinking levels above "high"** are currently read from templates but silently dropped during generation; a PR passes them through — relevant if you target reasoning models with custom effort levels ([#10458](https://github.com/unslothai/unsloth/pull/10458)).
- **If you rely on Ollama Modelfile SYSTEM prompts**, adding the Studio "tell the model today's date" feature silently overrides them today; don't ship that combination until the fix lands ([#10463](https://github.com/unslothai/unsloth/pull/10463)).
- **After cache-folder switches**, GGUF quant variants (e.g., Q6 in one folder, Q8 in another) currently fragment and disappear from the picker; workaround is to keep quant variants in the same download folder until the fix ships ([#10437](https://github.com/unslothai/unsloth/issues/10437)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*