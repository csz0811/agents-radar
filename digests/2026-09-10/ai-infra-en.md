# AI Infrastructure Digest 2026-09-10

> Generated: 2026-09-09 22:46 UTC | Projects covered: 6

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)

---

## Cross-Project Comparison

# Cross-Project Infrastructure Comparison — 2026-09-10

## 1. Ecosystem Overview

The ecosystem is shifting from raw model support to operational discipline: vLLM and SGLang are absorbing regressions from their own re-platforming, llama.cpp is pushing local-runner performance on Vulkan/CPU, and LiteLLM is carrying most of the API-compatibility, rate-limiting, and spend-accounting risk for agent workloads. The most severe issues today are not missing features but silent failures — non-deterministic `temperature=0` decoding, all-zero embedding vectors, dropped tool-call events, and host-memory exhaustion. Across all six projects, optimization effort is concentrated on sparse-attention/MLA model families, KV-cache economics, quantization paths (FP8/NVFP4/MXFP4), and non-NVIDIA backends such as AMD Vulkan, Intel XPU, and ROCm.

## 2. Activity Comparison

Counts below reflect GitHub issues/PRs explicitly referenced in each digest snapshot, not complete API-level totals.

| Project | Issues cited | PRs cited | Release status |
|---|---|---|---|
| vLLM | ≈17 (6 ranked stability regressions) | ≈15 | **v0.29.0 stable** — 594 commits, 277 contributors; MRV2 default engine |
| SGLang | ≈11 (9 ranked stability bugs) | ≈14 | **No release in last 24h** |
| llama.cpp | **59 open/updated issues** | **105 PRs touched** | **10 rolling builds** (b10871–b10883) |
| Ollama | ≈13 (2 high-severity, unfixed) | ≈8 | **No release in last 24h** |
| LiteLLM | ≈16 | ≈14 | **v1.102.0.dev.1** (dev; cosign-signed images) |
| Unsloth | ≈10 (4 open, 5 closed/verified) | ≈12 | **v0.1.808-beta** |

The busiest projects by issue/PR volume are llama.cpp and vLLM. The riskiest release is vLLM v0.29.0: MRV2 is now the default for all models, but issue #54237 reports full host-memory consumption on startup that 0.27.1 does not exhibit.

## 3. Model Support Race

The model frontier is now defined by **sparse-attention / hybrid linear-attention MoE architectures**, not by scale alone:

- **vLLM** has the deepest engine-side integration motion: MiniMax-M3 ROCm sparse-attention indexing/top-k kernels merged, Qwen3.8-Flash-Next QSA/FP8 work active on GB10/sm_121, Kimi-K3 KDA fix in review, and DeepSeek sparse-MLA PCP+DCP support in flight.
- **SGLang** has the broadest open PR pipeline: Qwen4-Exp / Qwen3.8-Flash-Next-NVFP4 mixed checkpoints on Blackwell, native LLaDA-Image diffusion serving, ROCm DSA MLA + EAGLE, GLM-5.3 template auto-detection, and DeepSeek-V4 router support.
- **llama.cpp** is racing two parallel PRs (#27754, #27773) to add GLM-5.3-Flash/GLM-5-Next (320B-class, vision+MoE), but neither has landed. It also added practical support for Qwen3.8-Flash-Next’s wide K=2048 TOP_K indexer on SYCL.
- **Ollama** and **Unsloth** are not directly in the architecture race; they inherit model support from llama.cpp.
- **LiteLLM** is a compatibility-layer participant: recognized `gpt-6-astra` family, added the CLF AI Gateway provider, and extended Vertex AI batch to custom endpoints.

**Standing:** vLLM leads on merged, production-engine-ready integrations; SGLang leads on breadth of adjacent artifacts (diffusion, ModelOpt mixed precision, hybrid sparse/SSM serving); llama.cpp is the local-runtime frontier but still unmerged for GLM-5.3.

## 4. Performance Frontier

Optimization effort is concentrated in five areas:

1. **KV-cache capacity and eviction policy.** vLLM reports ~2× KV pool capacity from fp8_e4m3 on the Qwen QSA path (#54426); SGLang is adding decode-side HiCache for hybrid SWA/SSM models plus agent-aware Tail-Optimized LRU eviction. Ollama’s prefix-cache granularity is capped at 8192-token multiples, costing 17–27s on cold agent prompts.
2. **Quantized sparse-attention kernels.** FP8/NVFP4/MXFP4 + MTP/block-FP8 expert dispatch are active across vLLM, SGLang, and llama.cpp. These paths currently produce the largest correctness risk surface (silent top-k drops, non-deterministic decode, illegal memory access).
3. **Kernel-level local inference.** llama.cpp’s Vulkan shader work delivers +6–17% RDNA4 decode with dedicated IQ4_XS mat-vec; ARM I8MM q4_K vec_dot gains +34.3% GFLOPS. Unsloth claims AMD Vulkan is ~20% faster than ROCm.
4. **Distributed serving / disaggregation.** vLLM is combining PCP+DCP for KV-sharding/prefill-split; SGLang is hardening 2P2D/DCP paths for Kimi-K3; both are chasing the long-context multi-GPU regime (~245K context hangs/crashes are still open).
5. **Control-plane latency at the gateway.** LiteLLM is moving input-token counting into Rust core (#40381) and Bedrock request signing off the event loop (#40270) — a single blocking credential refresh previously froze all requests, including `/health`.

## 5. Layer Positioning

These six projects occupy distinct layers with different failure profiles:

- **vLLM and SGLang** are competing production serving engines. They own model-native kernels, KV-pool memory management, continuous batching, speculative decoding, and distributed execution. Their bugs are correctness/memory regressions in the engine layer that surface as hangs, illegal memory access, or non-deterministic output.
- **llama.cpp** is a portable inference runtime covering CPU, CUDA, Vulkan, SYCL, and Metal, with a strong quantization ecosystem. It is releasing continuously (10 builds/day) and acts as the lower layer for other tools; its issues matter to any project embedding GGUF/llama-server.
- **Ollama** is an application-facing local runtime/API server — effectively a developer-ergonomics layer over llama.cpp that exposes OpenAI/Anthropic-compatible endpoints and model management. Its issues are about API contracts, VRAM accounting, runner lifecycle, and silent output corruption rather than kernel quality.
- **LiteLLM** is an LLM gateway/control plane. It does no model execution; its value is routing, rate limiting, budgets, provider translation, streaming integrity, and observability. Consequently, its highest-impact bugs are Redis double-counting, cache-key breakage, dropped stream events, and event-loop stalls.
- **Unsloth** sits upstream in the fine-tuning layer (PyTorch-native), but its desktop Studio also embeds llama.cpp servers for local inference. It is best understood as a training/adaptation layer with increasing inference-side operational concerns.

The dependency chain matters: a llama.cpp kernel bug becomes an Ollama crash; a vLLM determinism bug becomes an application correctness bug; a LiteLLM cache-key bug silently breaks Claude Code prompt caching.

## 6. Trend Signals

**1. Modern re-platforming is shipping with known regressions.**  
vLLM made MRV2 the default for all models while a host-memory exhaustion bug (#54237) remains open. SGLang’s Fast Engine Recovery is landing in phases; its 235B FP8 weight-load drop from ~306s to <1s is real, but engine-recovery remains incomplete. Treat vLLM 0.29.x as a major upgrade, not a patch release.

**2. Next-generation sparse-attention architectures are inherently fragile at the quantization boundary.**  
Non-deterministic greedy decoding past the QSA `indexer_budget` (#54521), silent top-k candidate drops (#51782), and NVFP4+MTP budget regressions (#54906) all affect the newest sparse-attention models. Applications should not assume `temperature=0` determinism on these architectures until the kernels are hardened.

**3. Tool-call correctness is the #1 cross-layer agent risk.**  
Mangled Qwen parallel tool calls in llama.cpp, the Kimi-K3 `tool_choice=required` hang in SGLang, Ollama emitting literal text instead of `tool_use` blocks, and LiteLLM XML streams after Bedrock tool round-trips — this is systemic. Agent developers need defensive stream and schema validation, not just upstream bug tracking.

**4. Prompt caching is now a financial and correctness surface, not just a latency feature.**  
LiteLLM’s `prompt_cache_key` regression (#39145), Ollama’s truncated prefix-cache restore, and vLLM’s KV-retention/partition RFCs signal that cache correctness is becoming a board-level concern for Claude Code–style agent workloads.

**5. Non-NVIDIA acceleration has reached production seriousness.**  
AMD Vulkan now outperforms ROCm in Unsloth, llama.cpp is shipping dedicated RDNA4/Intel/Adreno shaders, and ROCm CI now extends to MI355. But Blackwell CUDA-graph hangs, Intel Arc/XPU memory-release bugs, and AMD iGPU Vulkan failures remain common — multi-backend support is expected but still immature.

**6. Gateway performance is becoming an agent-scaling bottleneck.**  
LiteLLM’s move of Bedrock signing off the event loop and token counting into Rust confirms that Python-level gateway work is no longer sufficient for high-concurrency long-context traffic. Operators should watch for GIL-bound request stalls when messages reach 100K+ tokens, and prioritize the Rust-core path.

**Bottom line for application developers:** pin vLLM releases behind canary testing, validate embeddings/outputs against silent-corruption modes, harden tool-call parsing against schema edge cases, and do not rely on Redis-based rate limits or prompt-cache correctness as hard guarantees until the current fix wave lands.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-10

## 1. Today's Highlights

v0.29.0 shipped this cycle — 594 commits from 277 contributors (91 new) — and is the first release where Model Runner V2 (MRV2) is the default path for every model ([#53183](https://github.com/vllm-project/vllm/pull/53183)). Issue activity in the last 24h is dominated by MRV2 fallout: a host-memory exhaustion regression in 0.28.0/0.29.0 ([#54237](https://github.com/vllm-project/vllm/issues/54237)) and multiple Qwen3.8-Flash-Next sparse-attention (QSA) correctness bugs on GB10/sm_121, including non-deterministic `temperature=0` output when prompts cross the `indexer_budget` threshold ([#54521](https://github.com/vllm-project/vllm/issues/54521)). On the optimization side, a community patch enabling fp8_e4m3 KV cache on the QSA path reports roughly 2× KV pool capacity ([#54426](https://github.com/vllm-project/vllm/issues/54426)).

## 2. Releases & Breaking Changes

- **v0.29.0** ([release](https://github.com/vllm-project/vllm/releases/tag/v0.29.0)): MRV2 is now the default engine for all models, completing the rollout that began with pooling models ([#48290](https://github.com/vllm-project/vllm/pull/48290)). MRV2 also gained CUDA graph memory profiling for KV cache auto-sizing.
- **Migration note:** platforms without pinned/UVA memory have no automated fallback yet — PR [#54655](https://github.com/vllm-project/vllm/pull/54655) (V1 runner fallback) is still open. Validate startup memory behavior before upgrading from 0.27.x; see [#54237](https://github.com/vllm-project/vllm/issues/54237) below.

## 3. New Model & Hardware Support

Model/hardware activity in the last 24h is mostly in-flight integration and validation:

- **Qwen3.8-Flash-Next** on GB10/sm_121 remains the most active thread: FP8 KV-cache wiring on the QSA path ([#54426](https://github.com/vllm-project/vllm/issues/54426)), NVFP4 + MTP behavior under MRV2 ([#54906](https://github.com/vllm-project/vllm/issues/54906)), and GDN-path illegal memory access with prefix caching ([#54173](https://github.com/vllm-project/vllm/issues/54173)).
- **MiniMax-M3**: ROCm sparse-attention indexing/top-k kernels integrated via aiter and merged ([#52664](https://github.com/vllm-project/vllm/pull/52664)).
- **Kimi-K3**: KDA projection-overlap fix for Hopper in review ([#55426](https://github.com/vllm-project/vllm/pull/55426)), addressing [#55350](https://github.com/vllm-project/vllm/issues/55350).
- **DeepSeek / sparse-MLA**: PCP+DCP combined KV-shard/prefill-split support ([#56157](https://github.com/vllm-project/vllm/pull/56157)); DSpark MTP + PCP consolidation draft ([#56107](https://github.com/vllm-project/vllm/pull/56107)).
- **ROCm**: CI extension to MI355 for DSv4-Flash, DiffusionGemma TP2, and FP8 DSpark ([#50519](https://github.com/vllm-project/vllm/pull/50519)); unlimited sequence lengths via multi-pass reduction ([#39001](https://github.com/vllm-project/vllm/pull/39001)).
- **Intel XPU**: dual Arc B50 (Battlemage) TP=2 IPC failure ([#48953](https://github.com/vllm-project/vllm/issues/48953)) and host memory not released after model load ([#50269](https://github.com/vllm-project/vllm/issues/50269)) remain open.
- **GLM5.3-Flash**: v0.29.0 checkpoint loading error reported and closed ([#56007](https://github.com/vllm-project/vllm/issues/56007)).

## 4. Performance & Optimization

- **KV capacity**: fp8_e4m3 KV cache on the Qwen3.8-Flash-Next QSA path roughly doubles KV pool vs bf16 (measured on one GB10/sm_121); not yet upstream, corroboration sought ([#54426](https://github.com/vllm-project/vllm/issues/54426)).
- **MRV2 `apply_write`**: UVA-backed contents would eliminate H2D staging copies before Triton kernel writes; in review ([#55819](https://github.com/vllm-project/vllm/pull/55819)).
- **GEMM+AllReduce fusion**: request to benchmark/integrate CUTLASS SM100 Lamport fused GEMM+AllReduce kernel ([#55261](https://github.com/vllm-project/vllm/issues/55261)).
- **Linear kernel efficiency (open)**: suboptimal `linear` performance for small (≤32) and medium (~257, CUDA-graph padded) batches on Qwen3-class models ([#27173](https://github.com/vllm-project/vllm/issues/27173), [#35467](https://github.com/vllm-project/vllm/issues/35467)).
- **ROCm multi-stream shared experts**: post-#55099 tuning and `wvSplitKrc` fixes ([#56098](https://github.com/vllm-project/vllm/pull/56098)).

## 5. Stability & Regressions

Ranked by severity:

1. **Critical — full host-memory consumption at startup**: 0.28.0/0.29.0 consume all host memory and freeze; 0.27.1 is unaffected. Open, no fix PR yet ([#54237](https://github.com/vllm-project/vllm/issues/54237)).
2. **Correctness — non-deterministic greedy decode**: Qwen3.8-Flash-Next FP8 returns different outputs for byte-identical `temperature=0` requests once context exceeds the QSA `indexer_budget`; `persistent_topk` path implicated ([#54521](https://github.com/vllm-project/vllm/issues/54521)).
3. **Correctness — silent top-k drops**: `persistent_topk` can drop candidates when many values share a coarse histogram bin (B300/sm103) ([#51782](https://github.com/vllm-project/vllm/issues/51782)).
4. **Memory safety — hybrid mamba prefix-cache resume**: illegal memory access when the state column is seeded with the wrong block size under explicit `--block-size` ([#53142](https://github.com/vllm-project/vllm/issues/53142)).
5. **MRV2 logic regression**: `thinking_token_budget` ignored for Qwen3.8 NVFP4 + MTP under MRV2 ([#54906](https://github.com/vllm-project/vllm/issues/54906)).
6. **Spec decode + CUDA graphs**: MTP speculator with `num_speculative_tokens_per_batch_size` fails full CUDA graph capture ([#48494](https://github.com/vllm-project/vllm/issues/48494)).

Fixes in flight: Kimi-K3 KDA overlap on H100 ([#55426](https://github.com/vllm-project/vllm/pull/55426)); Triton attention 128B alignment for decoupled fp8 scales at `head_size=256` ([#56164](https://github.com/vllm-project/vllm/pull/56164)); GPU-CPU KV transfer faults should degrade the cache, not crash the engine ([#52838](https://github.com/vllm-project/vllm/pull/52838)); fallback to V1 runner where UVA is unavailable ([#54655](https://github.com/vllm-project/vllm/pull/54655)); compilation timeouts for xgrammar JSON schema/grammar backends ([#54090](https://github.com/vllm-project/vllm/pull/54090)); and aborted-request metrics are now recorded ([#55940](https://github.com/vllm-project/vllm/pull/55940)).

## 6. What This Means for Application Developers

- **Treat 0.29.0 as a major engine change**: the MRV2 default alters startup memory behavior and kernel selection. Run a canary with your actual models and workloads before fleet upgrades, especially if you are on 0.27.x.
- **Do not rely on `temperature=0` determinism** for Qwen3.8-Flash-Next on long prompts approaching the QSA budget threshold; consider capping context or pinning to a pre-QSA path until [#54521](https://github.com/vllm-project/vllm/issues/54521) is resolved.
- **Prefix caching with stateful/hybrid models remains risky**: mamba/GDN hybrid prefix-cache resume bugs ([#53142](https://github.com/vllm-project/vllm/issues/53142)) and spec-decode interactions ([#52244](https://github.com/vllm-project/vllm/pull/52244)) continue to surface; validate replay-heavy workloads explicitly.
- **Speculative decoding + CUDA graphs** combinations (MTP, per-batch spec token counts) are still prone to capture failures — test before enabling in production.
- **Watch for upstream KV-cache direction**: long-running RFCs on context-aware KV retention ([#37003](https://github.com/vllm-project/vllm/issues/37003)) and KV-partition conformance ([#53194](https://github.com/vllm-project/vllm/issues/53194)) signal near-term changes to how KV caches are partitioned and evicted under concurrent agentic load.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

## SGLang Digest — 2026-09-10

### Today's Highlights
No new release was published in the last 24h. The most significant activity is on ModelOpt/FP8/block-FP8 correctness for Qwen-family models on Blackwell/SM100, ROCm MLA kernel enablement, and router hardening for production Kubernetes deployments. Separately, the Fast Engine Recovery roadmap reports that Phase 1 weight cache daemon work has landed via #27139, reducing Qwen3-235B FP8 weight loading from ~306–327s to <1s.

---

### Releases & Breaking Changes
None. No release tags or migration notes appeared in the last 24h; all items below are active GitHub issues/PRs.

---

### New Model & Hardware Support
- **Qwen4-Exp / ModelOpt mixed precision on Blackwell**:  
  [#38727](https://github.com/sgl-project/sglang/pull/38727) honors per-layer FP8 for the PLE table and MTP experts in Qwen4-Exp / `Qwen3.8-Flash-Next-NVFP4` mixed checkpoints.  
  [#38726](https://github.com/sgl-project/sglang/pull/38726) adds block-FP8 MoE expert dispatch and derives block size instead of hard-coding `[128, 128]`.  
  [#38728](https://github.com/sgl-project/sglang/pull/38728) defaults `modelopt_mixed` Qwen3 MoE checkpoints to the `flashinfer_trtllm` MoE runner on SM100.
- **LLaDA-Image diffusion serving**:  
  [#37907](https://github.com/sgl-project/sglang/pull/37907) adds native T2I, image editing, sequence parallelism, and FP8 variants for LLaDA-Image / LLaDA-Image-Turbo.
- **ROCm / AMD backends**:  
  [#30575](https://github.com/sgl-project/sglang/pull/30575) adds a pure Triton sparse MLA prefill/decode backend for DSA on ROCm.  
  [#38746](https://github.com/sgl-project/sglang/pull/38746) enables AITER ASM MLA decode with EAGLE speculative decoding on ROCm/MI355X, fixing 7 `dsa_backend.py` bugs.
- **GLM tool/template support**:  
  [#38297](https://github.com/sgl-project/sglang/pull/38297) auto-detects GLM-5.3 chat templates as `glm45`/`glm47` parsers instead of falling back to a broken `deepseek-r1` + `glm45` combination.
- **sgl-router DeepSeek-V4 support**:  
  [#38742](https://github.com/sgl-project/sglang/pull/38742) completes the `dsv4` chat encoder path and forwards `input_ids` for non-trivial DeepSeek-V4 traffic.
- **Model tracking**: SenseNova-U1/U1.5 support is being tracked in [#37742](https://github.com/sgl-project/sglang/issues/37742).

---

### Performance & Optimization
- **Fast engine recovery — weight cache daemon**:  
  [#33522](https://github.com/sgl-project/sglang/issues/33522) reports Phase 1 landed via #27139: a per-rank daemon holds post-quantized weights and serves them over CUDA IPC. Weight load on Qwen3-235B FP8 drops from **~306–327s to <1s**.
- **AITER ASM MLA decode on ROCm**:  
  [#38746](https://github.com/sgl-project/sglang/pull/38746) shows the AITER ASM MLA persistent kernel is **1.6× faster than TileLang at seq=1 decode: 11.6µs vs 18.57µs** on MI355X.
- **GLM-5.2 NextN draft-layer bandwidth reduction**:  
  [#38476](https://github.com/sgl-project/sglang/pull/38476) casts GLM-5.2's MTP draft-layer fused MoE to per-channel FP8 on ROCm. The bf16 experts cost 71.7 MB each vs 19.0 MB for MXFP4 experts, making this layer disproportionately expensive during draft decoding.
- **PD / cache work in flight**:  
  [#38634](https://github.com/sgl-project/sglang/pull/38634) enables decode-side HiCache for hybrid SWA/SSM models on the unified radix tree.  
  [#34012](https://github.com/sgl-project/sglang/pull/34012) adds agent-aware Tail-Optimized LRU eviction to the unified radix cache.
- **Potential Blackwell decode regression to watch**:  
  [#38628](https://github.com/sgl-project/sglang/issues/38628) reports that standalone `tiny_gemm` is faster, but integrating it in place of `dsv3_router_gemm` causes ~4% DeepSeek-R1 NVFP4 decode regression on Blackwell.

---

### Stability & Regressions
Ranked by severity:

1. **DeepSeek-V4 decode hang on 8×H20, TP=8**:  
   [#33549](https://github.com/sgl-project/sglang/issues/33549) — decode forward hangs indefinitely at ~245K context; all GPUs spin at 100% util/low power until watchdog kill.
2. **Kimi-K3 tool_choice=required hang**:  
   [#37430](https://github.com/sgl-project/sglang/issues/37430) — requests hang until ReadTimeout in 2P2D TP8/DCP8 deployments.
3. **Kimi-K3 DSPARK + DCP decode crash**:  
   [#34920](https://github.com/sgl-project/sglang/issues/34920) — first target-verify batch crashes in `dcp/planner.py` with `cumsum(extend_prefix_lens=None)`.
4. **GLM-5.2 FP4 + EAGLE illegal memory access**:  
   [#30209](https://github.com/sgl-project/sglang/issues/30209) — `flashinfer_trtllm` bf16 batched-GEMM crash on B200/B300 TP4/TP8.
5. **Kimi-K3 strict tool-call grammar bug**:  
   [#38587](https://github.com/sgl-project/sglang/issues/38587) — `additionalProperties` dilutes a named property's type constraint in compiled xgrammar schemas.
6. **Breakable CUDA graph wrong-output/IMA risk**:  
   [#37606](https://github.com/sgl-project/sglang/issues/37606) — prefill breakable CUDA graph keeps weak refs to graph-break inputs, allowing reuse across buckets after PyTorch block storage is released.
7. **Diffusion native-fallback OOM**:  
   [#34772](https://github.com/sgl-project/sglang/issues/34772) — native component load fallback silently drops CPU-offload decisions, causing fatal OOM on 8GB GPUs.
8. **DeepSeek-R1 NVFP4 decode regression**:  
   [#38628](https://github.com/sgl-project/sglang/issues/38628) — unified `tiny_gemm` path regresses decode ~4% on Blackwell; fix should not be a simple revert of #34693.
9. **Anthropic endpoint `effort` forwarding**:  
   [#36741](https://github.com/sgl-project/sglang/issues/36741) — `output_config.effort` is forwarded unvalidated, causing 500s and making `xhigh` unreachable.

No linked fix PRs were visible in this snapshot for the most severe hang/crash items.

---

### What This Means for Application Developers
- **If you serve Qwen3/Qwen4 MoE variants on Blackwell/SM100**, the upcoming ModelOpt mixed-precision and MoE-runner default changes may affect both accuracy and performance. Track [#38726](https://github.com/sgl-project/sglang/pull/38726), [#38727](https://github.com/sgl-project/sglang/pull/38727), and [#38728](https://github.com/sgl-project/sglang/pull/38728) before adopting new checkpoints.
- **If you serve DeepSeek-R1 NVFP4 on Blackwell**, the `tiny_gemm` integration regression in [#38628](https://github.com/sgl-project/sglang/issues/38628) means you should benchmark decode after upgrading rather than assuming standalone kernel numbers will translate.
- **Kimi-K3 tool calling remains risky for strict-production use** until the `tool_choice=required` hang and xgrammar `additionalProperties` issues are resolved: see [#37430](https://github.com/sgl-project/sglang/issues/37430) and [#38587](https://github.com/sgl-project/sglang/issues/38587).
- **Kubernetes router users should verify readiness and h2c behavior** with [#38744](https://github.com/sgl-project/sglang/pull/38744) and [#38743](https://github.com/sgl-project/sglang/pull/38743); both improve graceful-shutdown behavior and HTTP/2 forwarding in router-managed deployments.


</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-10

**Activity snapshot:** 10 releases (b10871–b10883), 59 open/updated issues, and 105 PRs touched in the last 24h. Vulkan was the most active front, with fixes and new kernels targeting Intel, Adreno, and RDNA4.

---

## 1. Today's Highlights

Vulkan landed three notable changes: a workaround for `maxComputeWorkGroupCount` asserts on Intel GPUs with Qwen Flash-Next models ([b10881](https://github.com/ggml-org/llama.cpp/releases/tag/b10881)), spec-constant control over MUL_MAT A-type layouts ([b10883](https://github.com/ggml-org/llama.cpp/releases/tag/b10883)), and a dedicated IQ4_XS mat-vec shader worth +6–17% decode on RDNA4 ([b10871](https://github.com/ggml-org/llama.cpp/releases/tag/b10871)). Two independent PRs ([#27754](https://github.com/ggml-org/llama.cpp/pull/27754), [#27773](https://github.com/ggml-org/llama.cpp/pull/27773)) are racing to add GLM-5.3-Flash/GLM-5-Next, a 320B-class hybrid MoE with vision tower. On the app-facing side, Qwen XML tool-calling grammars are being hardened after reports of mangled parallel calls.

---

## 2. Releases & Breaking Changes

Ten builds shipped in 24h. Relevant items, not already covered elsewhere:

- **C API / source break:** `llama_sampler_chain_n` now returns `int32_t` instead of the previous wider type ([b10878](https://github.com/ggml-org/llama.cpp/releases/tag/b10878), part of API cleanup [#4574](https://github.com/ggml-org/llama.cpp/issues/4574)). Consumers should recompile and re-check assignments.
- **Build flag change:** `GGML_FA_ALL_QUANTS` is replaced by `GGML_FA_QUANTS` for configurable Flash-Attention quant combinations; un-compiled quant combos now fall back at runtime with a warning instead of failing hard ([b10876](https://github.com/ggml-org/llama.cpp/releases/tag/b10876), [docs/build.md](https://github.com/ggml-org/llama.cpp/blob/master/docs/build.md)).
- **CLI deprecation:** `--mmap`, `--mlock`, and `--dio` are now officially deprecated ([b10875](https://github.com/ggml-org/llama.cpp/releases/tag/b10875), [#28334](https://github.com/ggml-org/llama.cpp/pull/28334)) — migrate launcher scripts before removal.
- **Bug fixes:** Granite3 MoE unknown-parameter count ([b10874](https://github.com/ggml-org/llama.cpp/releases/tag/b10874)); MTMD video-ID propagation to the bitmap index ([b10873](https://github.com/ggml-org/llama.cpp/releases/tag/b10873)); Jinja now treats a null left operand of `in` as a plain map lookup, matching Python/Jinja semantics ([b10872](https://github.com/ggml-org/llama.cpp/releases/tag/b10872)).

---

## 3. New Model & Hardware Support

- **GLM-5-Next / GLM-5.3-Flash (321.3B/320B hybrid linear+sparse-attention MoE, text+vision):** two open PRs, [#27754](https://github.com/ggml-org/llama.cpp/pull/27754) and [#27773](https://github.com/ggml-org/llama.cpp/pull/27773). Caveat from [#27754](https://github.com/ggml-org/llama.cpp/pull/27754): `NVIDIA_TF32_OVERRIDE=0` is currently required for correct CUDA output.
- **GigaChat 3.5 (432B-A28B, DeepSeek-V3-style MLA + MoE):** still in flight in [#25342](https://github.com/ggml-org/llama.cpp/pull/25342).
- **New kernels/backends:** dedicated Vulkan IQ4_XS dmmv shader ([b10871](https://github.com/ggml-org/llama.cpp/releases/tag/b10871)); radix-select TOP_K for SYCL so Qwen3.8-Flash-Next’s K=2048 indexer no longer offloads to CPU ([#28670](https://github.com/ggml-org/llama.cpp/pull/28670)).
- A fix for the Qwen4-Exp “compute buffer size” issue on >3-GPU CUDA setups is still open ([#27953](https://github.com/ggml-org/llama.cpp/issues/27953)).

---

## 4. Performance & Optimization

- **Vulkan IQ4_XS decode:** dedicated mat-vec shader delivers **+6–17% token generation on RDNA4** ([b10871](https://github.com/ggml-org/llama.cpp/releases/tag/b10871)).
- **ARM CPU (I8MM):** specialized q4_K vec_dot for batch=1 eliminates redundant Y loads and duplicate sums — **+34.3% GFLOPS** ([#28673](https://github.com/ggml-org/llama.cpp/pull/28673)).
- **CUDA MoE MMQ:** matrix-tile count is now sized from the host-side column count (typical expert width), avoiding excessive tiles for routed MoE on RDNA3-class HIP targets ([b10877](https://github.com/ggml-org/llama.cpp/releases/tag/b10877)).
- **CUDA TOP_K:** radix-select replaces full segmented radix sort in the CUB fallback for wide rows — targets the Qwen4Exp QSA indexer cost directly ([#28671](https://github.com/ggml-org/llama.cpp/pull/28671)).
- **In progress:** Vulkan stream-k MUL_MAT ([#28528](https://github.com/ggml-org/llama.cpp/pull/28528)); RDNA4/HIP MUL_MAT fixes for Q6_K/Q2_K and MMQ conditions ([#25940](https://github.com/ggml-org/llama.cpp/pull/25940)); Flash Attention tuning for gfx1201 / R9700 PRO incl. a HS=256 fix ([#28102](https://github.com/ggml-org/llama.cpp/pull/28102)).

---

## 5. Stability & Regressions

Ranked by severity:

1. **CUDA graphs hang Blackwell GPUs (RTX 5090 Laptop / sm_120)** — RC watchdog + Xid 8 events; `GGML_CUDA_DISABLE_GRAPHS=1` is a full workaround, no root-cause fix yet ([#27330](https://github.com/ggml-org/llama.cpp/issues/27330)).
2. **CUDA `invalid configuration argument` in fused RMS-norm under concurrent batching** — Volta (sm_70), multi-tenant server workloads ([#27911](https://github.com/ggml-org/llama.cpp/issues/27911)).
3. **Qwen parallel tool calls mangled/hang on schemas with ~48 optional params** ([#28522](https://github.com/ggml-org/llama.cpp/issues/28522)) — addressed by two grammar PRs: enforce string enums ([#28668](https://github.com/ggml-org/llama.cpp/pull/28668)) and preserve object-union schema alternatives ([#28651](https://github.com/ggml-org/llama.cpp/pull/28651)).
4. **Vulkan workgroup-count assert on Intel Arc A770 with Qwen 3.8 Flash-Next** ([#28247](https://github.com/ggml-org/llama.cpp/issues/28247)) — **fixed** by the 2D FILL distribution in [b10881](https://github.com/ggml-org/llama.cpp/releases/tag/b10881).
5. **SYCL garbage on the second prompt** ([#26845](https://github.com/ggml-org/llama.cpp/issues/26845)) — closed in this window; verify against current builds.
6. **Qwen2.5-Omni audio corruption on Metal under system load** — intermittent, still open on M5 Max ([#28441](https://github.com/ggml-org/llama.cpp/issues/28441)).
7. **Vulkan pipeline creation failure on Adreno 830** — traced to shaderc/NDK producing different SPIR-V from identical GLSL, not a kernel bug ([#28635](https://github.com/ggml-org/llama.cpp/issues/28635)).
8. **IQ3_S produces garbage on RTX 5060 Ti (Blackwell)** ([#28581](https://github.com/ggml-org/llama.cpp/issues/28581)); **DSpark + MoE crash at `graph_reserve`** on CPU ([#28614](https://github.com/ggml-org/llama.cpp/issues/28614)).
9. **VRAM leak with DeepSeek V4 Flash + DSpark** — ~10 MB growth per prefill/generate cycle ([#27155](https://github.com/ggml-org/llama.cpp/issues/27155)).

CI note: NVIDIA r615 drivers are requested for Vulkan runners to fix intermittent coopmat1 failures ([#28659](https://github.com/ggml-org/llama.cpp/issues/28659)).

---

## 6. What This Means for Application Developers

- **Tool-calling correctness:** If you serve Qwen models behind XML tool schemas — especially with enums or union/object argument types — test against builds ≥ b10872 and track [#28668](https://github.com/ggml-org/llama.cpp/pull/28668). The failure mode is silent: empty `{}` calls or out-of-enum values accepted.
- **Plan for flag churn now:** `--mmap/--mlock/--dio` deprecation ([b10875](https://github.com/ggml-org/llama.cpp/releases/tag/b10875)) and the `GGML_FA_ALL_QUANTS → GGML_FA_QUANTS` rename ([b10876](https://github.com/ggml-org/llama.cpp/releases/tag/b10876)) will affect server wrappers and CI image builds. The FA change adds a runtime warning fallback, so the failure mode is visible but not fatal.
- **Blackwell + CUDA graphs:** keep `GGML_CUDA_DISABLE_GRAPHS=1` as a documented escape hatch for RTX 50-series laptops until [#27330](https://github.com/ggml-org/llama.cpp/issues/27330) is resolved; watchdog/Xid events are a hard failure, not just slowdown.
- **Intel Arc/iGPU Vulkan users** running Flash-Next-class models should update to ≥ b10881 to avoid the `maxComputeWorkGroupCount` crash.
- **C-API consumers** rebuilding against `libllama` should recompile for the `llama_sampler_chain_n` `int32_t` change ([b10878](https://github.com/ggml-org/llama.cpp/releases/tag/b10878)); it’s a source-level break only if you assign to mismatched types.
- If you plan to test **GLM-5.3-Flash**, wait for one of the open PRs ([#27754](https://github.com/ggml-org/llama.cpp/pull/27754), [#27773](https://github.com/ggml-org/llama.cpp/pull/27773)) to merge, and set `NVIDIA_TF32_OVERRIDE=0` as documented.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-10

## Today’s Highlights
- No new release landed in the last 24h, but the project is handling a dense batch of correctness and stability PRs around MLX scheduling, tool-call parsing, OpenAI/Anthropic compatibility, and GPU VRAM accounting.
- The highest-impact newly surfaced issues are silent all-zero embedding vectors under load ([#17878](https://github.com/ollama/ollama/issues/17878)) and a file-descriptor leak on every successful `/api/generate` request ([#18344](https://github.com/ollama/ollama/issues/18344)); neither has a linked fix PR yet.
- The open PR queue is mostly focused on making agent-facing APIs reliable: preserving response text alongside tool calls, handling large numeric tool arguments, fixing Qwen3/GLM parser edge cases, and waiting for MLX runners to fully exit before the next load ([#18343](https://github.com/ollama/ollama/pull/18343), [#18341](https://github.com/ollama/ollama/pull/18341), [#18340](https://github.com/ollama/ollama/pull/18340), [#18345](https://github.com/ollama/ollama/pull/18345)).

## Releases & Breaking Changes
None. No Ollama releases or release-candidate tags were published in the last 24h, and no migration notes were included in this dataset.

## New Model & Hardware Support
- In progress: **Native Intel SYCL/oneAPI backend and device discovery** for Intel discrete GPUs, including Intel Arc B70 32GB, via an opt-in llama.cpp pipeline ([PR #18333](https://github.com/ollama/ollama/pull/18333)).
- Open request: Frontier 100B+ models on Ollama Cloud, including Ornith, Longcat 2.0, Mimo v2.5, Olmo 3.1, Laguna xs 2.1, Hunyuan Hy3, Jamba, and Step 3.7 ([#17100](https://github.com/ollama/ollama/issues/17100)).
- No new downloadable model artifacts were announced in this window.

## Performance & Optimization
- **MLX runner lifetime**: [PR #18345](https://github.com/ollama/ollama/pull/18345) makes the MLX runner wait for a SIGKILLed process to actually exit before the scheduler loads the next model, preventing stale memory and file handles from colliding with the next load.
- **MLX prefix-cache granularity**: [#18267](https://github.com/ollama/ollama/issues/18267) reports that prefix-cache restore is truncated to a multiple of 8192 tokens, causing a fixed 17–27s re-prefill penalty on cold prompts in agent workloads. Still open.
- **Log overhead**: [PR #17913](https://github.com/ollama/ollama/pull/17913) proposes filtering per-request llama-server logs unless debug is enabled, removing roughly 20 lines of slot bookkeeping per request from journald.
- **VRAM accounting**: [PR #18350](https://github.com/ollama/ollama/pull/18350) fixes multi-GPU VRAM accounting by keying scheduler lookups on the device names llama-server actually logs, rather than discovery-assigned names. Relevant when visible-device filters renumber devices.

## Stability & Regressions
Ranked roughly by severity:

1. **Silent embedding corruption**: Under sustained load, `/v1/embeddings` and `/api/embed` return HTTP 200 with all-zero vectors, correct dimensionality, and plausible token usage, with no log distinction between success and failure ([#17878](https://github.com/ollama/ollama/issues/17878)). High risk for RAG pipelines because failures are indistinguishable from valid output.
2. **File-descriptor leak**: `ollama serve` retains one FD per successfully served `/api/generate` request until process restart ([#18344](https://github.com/ollama/ollama/issues/18344)).
3. **Model load crash**: `gemma4:e2b` fails on startup in WSL2 with `GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS) failed` ([#16506](https://github.com/ollama/ollama/issues/16506)). 22 comments and still open.
4. **Broken quantized model artifacts**: Qwen2.5-Coder-3B-Instruct at `q2_K`, `q3_K_S`, `q3_K_M`, and `q3_K_L` scores 0/15 on functional code tasks despite fluent-looking output ([#18252](https://github.com/ollama/ollama/issues/18252)).
5. **Multi-GPU VRAM misaccounting**: Scheduler VRAM maps are keyed by child llama-server log names, but several lookup sites use discovery `DeviceInfo.Name`, causing divergence when devices are filtered/renumbered ([#18349](https://github.com/ollama/ollama/issues/18349)). A fix is already open in [PR #18350](https://github.com/ollama/ollama/pull/18350).
6. **AMD iGPU / Vulkan regressions**: `radv/amdgpu: Not enough memory for command submission` appears for AMD Radeon 780M on Ollama >=0.32.10 ([#17748](https://github.com/ollama/ollama/issues/17748)). A related 66GB-model failure on an AMD iGPU was closed ([#18272](https://github.com/ollama/ollama/issues/18272)), but the 780M issue remains open.
7. **Anthropic tool-call breakage**: With complex tool schemas, the `/v1/messages` compatibility endpoint can emit tool calls as literal text instead of `tool_use` blocks ([#18346](https://github.com/ollama/ollama/issues/18346)).
8. **MLX loader spam on non-Apple hardware**: Every `ollama` command prints `mlx_compile_cache_new_ CHECK failed` on Windows without CUDA/Apple Silicon ([#18283](https://github.com/ollama/ollama/issues/18283)). [PR #18335](https://github.com/ollama/ollama/pull/18335) addresses the root cause by making missing-symbol reporting lazy.
9. **Desktop/app integration**: “Restart Claude Desktop” in Ollama Apps silently reverts without writing gateway config ([#18188](https://github.com/ollama/ollama/issues/18188)); `ollama launch codex-app` breaks Codex’s privileged native pipe bridge for browser use ([#16177](https://github.com/ollama/ollama/issues/16177)).

Tool-parser fixes also landed in the PR queue this window: preserve response text alongside tool calls ([#18343](https://github.com/ollama/ollama/pull/18343)), support Codex standalone named function outputs without `call_id` ([#18348](https://github.com/ollama/ollama/pull/18348)), preserve large numeric tool arguments outside int64 range ([#18341](https://github.com/ollama/ollama/pull/18341)), handle literal `</tool_call>` inside quoted Qwen3 arguments ([#18340](https://github.com/ollama/ollama/pull/18340)), and avoid a parser panic on lone delimiters ([#17492](https://github.com/ollama/ollama/pull/17492)).

## What This Means for Application Developers
- If you depend on `/v1/embeddings` or `/api/embed`, treat all-zero vectors as an active risk under sustained load and add norm checks or output validation until [#17878](https://github.com/ollama/ollama/issues/17878) is fixed.
- Long-running `ollama serve` processes should be monitored for FD growth and scheduled for restart; issue [#18344](https://github.com/ollama/ollama/issues/18344) indicates an unreleased leak per generate request.
- Agent frameworks built on Ollama’s OpenAI/Anthropic-compatible endpoints should pin or test against specific Ollama builds before relying on complex tool schemas. Tool-call serialization is under active repair, especially for Codex/Claude Desktop workflows.
- Multi-GPU operators should treat VRAM-aware scheduling metrics as suspect when visible-device filters are in use, pending [PR #18350](https://github.com/ollama/ollama/pull/18350).
- With no release in the last 24h, the safest posture is to validate against the current rolling build and watch for the next tag that includes the MLX, parser, and FD-leak fixes above.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-10

## 1. Today's Highlights

Reliability and correctness dominate today: the most important signals are a cluster of Redis-backed rate-limiter bugs (team per-model limits enforced at half their configured value, per-customer limits silently dropping after virtual-key cache warmup, and least-busy router starvation), a Bedrock fix moving request signing off the event loop, and several streaming/caching regressions on the Anthropic/Responses translation paths. Performance work continues to shift hot paths into the Rust core — `/v1/messages` input-token counting is the latest candidate — and new fault-injection tests target a Redis-failure OOM that eluded a 12-day soak in v1.100.0. One development release, v1.102.0.dev.1, landed with cosign image-signature verification.

## 2. Releases & Breaking Changes

- **v1.102.0.dev.1** — [release](https://github.com/BerriAI/litellm/releases/tag/v1.102.0.dev.1). No changelog detail beyond release infrastructure: all Docker images are now signed with cosign against the key introduced in commit `0112e53`; the release notes include verification instructions. No breaking API or config changes surfaced in this window.

## 3. New Model & Hardware Support

- **CLF AI Gateway provider** ([PR #39324](https://github.com/BerriAI/litellm/pull/39324)): adds `clf_ai_gateway`, an OpenAI-compatible endpoint on Cloudflare Workers AI serving open-weight models (GLM, Kimi, DeepSeek, Qwen) on a prepaid plan — 9 models bundled.
- **gpt-6 family recognition** ([Issue #40279](https://github.com/BerriAI/litellm/issues/40279), closed): `is_model_gpt_5_model*` family checks did not recognize `gpt-6-astra`, so legacy `max_tokens` was rejected instead of translated to `max_completion_tokens`. Closed today, presumably via model-family detection update.
- **Vertex AI managed batches for `custom_endpoint` deployments** ([PR #40469](https://github.com/BerriAI/litellm/pull/40469)): self-deployed OpenAI-compatible containers previously had no batch surface; the PR runs batch jobs on batch-owned replicas of the deployment's own serving container.
- **Azure AI/Foundry passthrough routing** ([PR #39863](https://github.com/BerriAI/litellm/pull/39863)): adds passthrough config so `/azure_ai/<router model>/<native path>` relays actually reach the Foundry deployment's endpoint instead of 500ing or mis-routing OpenAI-family Foundry models as plain Azure OpenAI. Note: the related request for Entra ID token fallback parity on `azure_ai` non-chat paths ([Issue #37727](https://github.com/BerriAI/litellm/issues/37727)) remains open.

## 4. Performance & Optimization

- **Rust input-token counting on the proxy auth path** ([PR #40381](https://github.com/BerriAI/litellm/pull/40381)): counting a 120K-token `/v1/messages` request currently "holds the GIL for seconds"; small requests queued behind it see ~10× worse p50 locally. `asyncio.to_thread` helps but still contends for the GIL. The PR counts input tokens in Rust from the auth path, which is the first pass at removing this stall.
- **Bedrock request signing moved off the event loop** ([PR #40270](https://github.com/BerriAI/litellm/pull/40270)): botocore refreshes expiring credentials with a blocking HTTP call inside the signer, so a single Bedrock `/v1/messages`, Converse, count-tokens, or pass-through request froze every other request on the worker — including `/health` — while signing ran on the loop. This fix applies to all async paths.
- **Rerank request-body deduplication** ([PR #40480](https://github.com/BerriAI/litellm/pull/40480)): large rerank payloads could exhaust proxy memory because request context duplicated the document payload during provider-parameter serialization; the PR excludes request context from provider serialization while preserving it for logging/callbacks.
- **Traffic-based autoscaling** ([PR #40479](https://github.com/BerriAI/litellm/pull/40479)): Helm and Terraform gain optional per-pod RPM/TPM `Pods` metrics so token-heavy traffic can scale the gateway before CPU saturation, addressing a gap where the proxy counts requests/tokens but nothing scales on them.

## 5. Stability & Regressions

Ranked by severity. Fix PRs are noted where visible in flight.

**Rate limiting and enforcement**
- **v3 rate limiter double-counts team per-model limits** ([Issue #34140](https://github.com/BerriAI/litellm/issues/34140), open): a team-model limit of `N` via `POST /team/update {metadata: {model_rpm_limit}}` starts returning 429 at ~`N/2` requests. Wide blast radius for anyone using per-team model RPM/TPM.
- **Per-customer RPM limits stop applying once the virtual key is cached** ([Issue #39713](https://github.com/BerriAI/litellm/issues/39713), open): `rpm_limit` from budget objects applied via `litellm_settings.max_end_user_budget_id` is not enforced after key caching — undermines rate limiting as a cost guardrail at the customer layer.
- **least-busy router starvation** ([Issue #39322](https://github.com/BerriAI/litellm/issues/39322), open): response-cache hits drive the busy counter negative, ties always pick the first deployment, and the counter is not shared across workers — a root-cause follow-up to #25323 where traffic "gradually drops to zero" for some deployments. No fix PR yet.
- **Azure Redis Enterprise CROSSSLOT errors** ([Issue #30065](https://github.com/BerriAI/litellm/issues/30065), open): `_group_keys_by_hash_tag()` only groups by hash slot when the cache is an OSS Redis Cluster, so non-cluster Redis (including Azure Redis Enterprise) skips slot grouping and hits CROSSSLOT errors in `parallel_request_limiter_v3.py`.
- **Redis-failure test hardening** ([PR #40482](https://github.com/BerriAI/litellm/pull/40482), [PR #40460](https://github.com/BerriAI/litellm/pull/40460)): both reference a v1.100.0 retry-breadcrumb OOM (LIT-6780) that occurred when retries and Redis timeouts happened together and escaped 12 days of soak. The PRs add fault-injecting fakeredis and load tests for "keep answering while dependency is down" — a direct response to that class of regression.

**Streaming and translation correctness**
- **Tool-call continuation streams XML instead of text** ([Issue #30053](https://github.com/BerriAI/litellm/issues/30053), open): the `fast_path` optimization in `async_streaming_data_generator` (v1.87.0, PR #28289) breaks Claude-model follow-up streaming over Bedrock after tool-call round-trips via `/v1/chat/completions`. No fix PR surfaced today.
- **Encrypted reasoning content moved across model groups** ([Issue #40237](https://github.com/BerriAI/litellm/issues/40237), closed): complexity auto-router follow-ups included `reasoning.encrypted_content` from the prior response when the new message was classified into a different model group. Closed without a visible fix in today's data.
- **`prompt_cache_key` derived from `user_id` never changes** ([Issue #39145](https://github.com/BerriAI/litellm/issues/39145), closed): the v1.99.0 fix for #37508 is called out as incorrect and likely breaking prompt caching on the Anthropic↔OpenAI translation path, specifically for Claude Code. Closed without a visible fix today.
- **Responses API fake-stream fallback drops `function_call` events** ([Issue #21090](https://github.com/BerriAI/litellm/issues/21090), closed): `/v1/responses` with `stream: true` for custom models silently degraded to a fake stream, dropping `function_call` events. In-flight guardrail/tool-call work ([PR #40271](https://github.com/BerriAI/litellm/pull/40271), [PR #40461](https://github.com/BerriAI/litellm/pull/40461), [PR #40462](https://github.com/BerriAI/litellm/pull/40462), [PR #40451](https://github.com/BerriAI/litellm/pull/40451)) targets related stream shape issues: rewriting tools into buffered streams, scanning `custom_tool_call` outputs in Responses post-call guardrails, echoing named `tool_choice` on the chat-completions bridge, and replaying OpenAI encrypted reasoning byte-for-byte through `/v1/messages`.

**Spend and budget accounting**
- **Spend loss on client disconnect for non-streaming Bedrock** ([Issue #13245](https://github.com/BerriAI/litellm/issues/13245), open): LiteLLM fails to record full cost even though Bedrock charges for the complete request.
- **Internal-user `max_budget` blocks zero-cost models** ([Issue #29912](https://github.com/BerriAI/litellm/issues/29912), open): `_PROXY_MaxBudgetLimiter` ignores `skip_budget_checks`, so an internal user over budget cannot call free models.
- **Anthropic custom pricing override bypass** ([Issue #25204](https://github.com/BerriAI/litellm/issues/25204), closed): `custom_llm_provider: "anthropic"` with `input_cost_per_token: 0`/`output_cost_per_token: 0` was ignored because cost dispatch reaches the internal Anthropic pricing table before custom pricing is applied.

**Platform**
- **OTEL NoneType crash loop** ([Issue #30061](https://github.com/BerriAI/litellm/issues/30061), open): containers crash repeatedly when the OTEL collector callback is enabled.
- **Empty `/metrics` after upgrade to 1.88.0** ([Issue #30079](https://github.com/BerriAI/litellm/issues/30079), open): Prometheus scraping returns empty data due to a 307 redirect after the upgrade.
- **Non-string callback vars 500 in `default_team_settings`** ([PR #40458](https://github.com/BerriAI/litellm/pull/40458), closed): `turn_off_message_logging: true` or `langsmith_sampling_rate: 0.5` in natural YAML form failed str-only validation; fix accepts non-string callback vars.
- **In-image test failures** ([Issue #40357](https://github.com/BerriAI/litellm/issues/40357), closed): nine Bedrock tests in `test_base_aws_llm.py` fail inside the published `litellm-database` image due to ambient `SSL_CERT_FILE`, passing in plain CI. Lower severity, but relevant for anyone running the published image's test-suite validation.

## 6. What This Means for Application Developers

- **Do not rely on Redis-backed rate limits as a hard cost boundary right now.** Today's data shows over-enforcement (team limits at half configured values, [#34140](https://github.com/BerriAI/litellm/issues/34140)), under-enforcement after cache warmup ([#39713](https://github.com/BerriAI/litellm/issues/39713)), and broken affinity/accounting under least-busy routing ([#39322](https://github.com/BerriAI/litellm/issues/39322)). If you operate multi-tenant gateways, add independent spend/volume monitoring and pin versions once fixes land.
- **Bedrock users should prioritize the event-loop signing fix** ([PR #40270](https://github.com/BerriAI/litellm/pull/40270)): one slow credential refresh could stall all requests on a worker, including health checks. If you run Bedrock-backed `/v1/messages` or Converse traffic, this is an availability upgrade, not a micro-optimization.
- **Claude Code / Anthropic-bridge workloads are in a fragile spot.** Watch for caching-key regressions ([#39145](https://github.com/BerriAI/litellm/issues/39145)), encrypted-reasoning context leaking across router model groups ([#40237](https://github.com/BerriAI/litellm/issues/40237)), and byte-stability issues for thinking blocks. The in-flight fix set — [#40451](https://github.com/BerriAI/litellm/pull/40451), [#40271](https://github.com/BerriAI/litellm/pull/40271), [#40461](https://github.com/BerriAI/litellm/pull/40461) — directly addresses guardrail scanning/rewriting of tool calls and encrypted reasoning on the Responses/Messages bridges; if you use Codex-style `custom_tool_call` traffic, these matter for security masking to actually take effect.
- **For tool-calling agents over Bedrock/Claude chat streaming**, be aware of [#30053](https://github.com/BerriAI/litellm/issues/30053): after a tool round-trip, clients may receive XML instead of natural-language text. Validate your stream parser handles this defensively until the fast-path fix ships.
- **Performance relief for high-concurrency, large-prompt deployments is coming via the Rust core** ([#40381](https://github.com/BerriAI/litellm/pull/40381)) rather than Python-level threading. If you are GIL-bound on token counting today, this is the change to track.
- **Community feature asks to watch**: Kubernetes operator/GitOps CRDs ([#18428](https://github.com/BerriAI/litellm/issues/18428)), MCP connection troubleshooting ([#31318](https://github.com/BerriAI/litellm/issues/31318)), and LDAP group-to-team sync ([#6461](https://github.com/BerriAI/litellm/issues/6461)) continue to accumulate interest in the wishlist thread ([#361](https://github.com/BerriAI/litellm/issues/361)).

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-10

## Today's Highlights

Unsloth shipped **v0.1.808-beta**, a large performance and reliability release with 1.2–1.7x faster diffusion, a ~20% AMD performance boost via the Vulkan backend vs. ROCm, and ~2x faster update times. Studio hardening PRs in flight target idempotent background updates, offline installs, GitHub-rate-limit resilience, Windows no-reserve memory loads, and shared-KV preemption for parallel chats. Two new regressions were logged against the Windows desktop app (vLLM sampling-parameter rejection) and a Gemma 4 image-input crash in llama-server.

## Releases & Breaking Changes

- **v0.1.808-beta — Large Performance Gains + Fixes** ([releases](https://github.com/unslothai/unsloth/releases))
  - 1.2–1.7x faster diffusion workloads.
  - AMD: ~20% performance boost vs. ROCm by moving to the Vulkan backend.
  - ~2x faster updating; Windows SAC/AV false positives removed.
  - Also references Blender MCP support, Hermes model-template detection, and an AMD "gibberish" fix reported upstream to AMD.
  - No breaking API/config changes were called out in the available release notes.

## New Model & Hardware Support

- No new model architectures landed in the last 24h; activity remains backend/platform-focused.
- **Windows on ARM / NVIDIA ARM64 CUDA stack** — in progress: [PR #10282](https://github.com/unslothai/unsloth/pull/10282) makes the installer use the native ARM64 CUDA stack on NVIDIA WoA hosts (GB10 / N1X, RTX Spark parts) instead of treating every ARM64 Windows host as GPU-less.
- **Apple Silicon** remains on the roadmap ([Issue #4](https://github.com/unslothai/unsloth/issues/4), closed as tracked, 644 👍) — no change in support status.
- AMD Vulkan backend now delivers better-than-ROCm performance on supported AMD stacks (see below).

## Performance & Optimization

- **v0.1.808-beta kernel/backend wins** ([releases](https://github.com/unslothai/unsloth/releases)): 1.2–1.7x faster diffusion; AMD +20% via Vulkan versus ROCm; 2x faster Studio update path.
- **Faster/stabler Studio updates** — multiple PRs reduce redundant work:
  - Reuse previously installed `uv` instead of re-downloading on every update ([PR #10659](https://github.com/unslothai/unsloth/pull/10659)).
  - Background `uv` prefetch so the next desktop update is pre-staged ([PR #10653](https://github.com/unslothai/unsloth/pull/10653)).
  - Skip dependency-pass steps when the install manifest proves nothing changed ([PR #10649](https://github.com/unslothai/unsloth/pull/10649)).
  - Answer current `llama.cpp`, `whisper.cpp` and Node installs from markers — eliminates 13–63s of re-validation on macOS and ~5s on Windows per update ([PR #10648](https://github.com/unslothai/unsloth/pull/10648)).
  - End-to-end harness asserting a second `studio update` installs/fetches nothing ([PR #10652](https://github.com/unslothai/unsloth/pull/10652)).
- **KV-cache sharing for parallel chats** — in review: KV preemption so concurrent chats share one pooled cache instead of killing each other ([PR #10301](https://github.com/unslothai/unsloth/pull/10301)), plus enforcing the KV reservation on the wire rather than only in the ledger ([PR #10120](https://github.com/unslothai/unsloth/pull/10120)).

## Stability & Regressions

Ranked by severity; all updated within the last 24h.

1. **Gemma 4 image input crashes llama-server with `GGML_ASSERT`** ([Issue #10559](https://github.com/unslothai/unsloth/issues/10559), open) — Linux desktop app, "default ubatch too small." No fix PR yet; workaround is raising ubatch / avoiding image inputs until patched.
2. **Windows Desktop + vLLM: `min_p and logit_bias not supported`** ([Issue #10573](https://github.com/unslothai/unsloth/issues/10573), open) — reported on 0.1.807-beta; sampling params rejected by the vLLM backend path. No fix PR yet; avoid `min_p`/`logit_bias` with vLLM-backed Studio sessions.
3. **Windows no-reserve system RAM still holds GGUF memory resident** ([Issue #9033](https://github.com/unslothai/unsloth/issues/9033), open) — fix is in review: [PR #10618](https://github.com/unslothai/unsloth/pull/10618) avoids resident GGUF mappings for no-reserve loads on Windows.
4. **Security audit CI lane red on main** ([Issue #10545](https://github.com/unslothai/unsloth/issues/10545), open) — `pip scan-packages :: hf-stack` reports 164 findings; baseline needs re-review after the `unsloth-zoo` bump.
5. **Closed/verified this window:**
   - `slice_indices` NameError with Qwen2 on Kaggle — closed pending confirmation ([Issue #3450](https://github.com/unslothai/unsloth/issues/3450)).
   - Qwen3-Coder-Next 2×A100 QLoRA OOM — closed, fix in progress ([Issue #4040](https://github.com/unslothai/unsloth/issues/4040)).
   - Intel Arc B580 import failure (`torch.xpu.memory.mem_get_info`) — closed ([Issue #3533](https://github.com/unslothai/unsloth/issues/3533)).
   - Gemma 3n "maximum recursion depth exceeded" — closed ([Issue #3650](https://github.com/unslothai/unsloth/issues/3650)).
   - CI determinism flake on the Studio multi-turn smoke — closed ([Issue #10004](https://github.com/unslothai/unsloth/issues/10004)); related macOS test fix in [PR #10645](https://github.com/unslothai/unsloth/pull/10645).

## What This Means for Application Developers

- **If you build on Unsloth Studio + vLLM on Windows**, do not send `min_p` or `logit_bias` yet; track [Issue #10573](https://github.com/unslothai/unsloth/issues/10573).
- **Multi-chat / multi-agent apps sharing one GGUF-backed server** are prone to pooled-KV exhaustion killing all concurrent generations. The preemption and wire-level reservation fixes ([PR #10301](https://github.com/unslothai/unsloth/pull/10301), [PR #10120](https://github.com/unslothai/unsloth/pull/10120)) are the real cure; until they land, cap `--parallel` / per-slot context.
- **Diffusion and AMD users**: upgrade to v0.1.808-beta — 1.2–1.7x diffusion gains and ~20% AMD uplift via Vulkan are the headline numbers this cycle.
- **Automated/air-gapped Studio installs**: the upcoming update-path work (uv reuse, marker-based validation, `UV_OFFLINE`/PyPI-unreachable handling in [PR #10651](https://github.com/unslothai/unsloth/pull/10651), GitHub-down resilience in [PR #10670](https://github.com/unslothai/unsloth/pull/10670)) meaningfully improves unattended update reliability.
- **Windows users with tight system RAM**: the "Don't reserve system RAM" path can still leave the full GGUF resident; either keep reservation on or apply [PR #10618](https://github.com/unslothai/unsloth/pull/10618) when it lands.
- **Gemma 4 VLM workloads on Linux desktop**: hold off on image inputs until the llama-server ubatch crash fixes land.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*