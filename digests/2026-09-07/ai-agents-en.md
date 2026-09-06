# OpenClaw Ecosystem Digest 2026-09-07

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-06 22:45 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-07

## 1. Today's Overview

OpenClaw is in an intense stabilization and triage phase. The last 24 hours saw 500 issues and 500 PRs updated (377 open/active issues, 303 open PRs; 123 issues and 197 PRs closed/merged), with **zero new releases**. A notable cluster of P0/P1 regressions surrounds the recent 2026.8.x → 2026.9.x update train — Windows gateway startup failures, gateway restart cascades, silent cron tick loss, and session/transcript reliability issues. On the positive side, a steady stream of maintainer-led fix PRs (WebSocket transport, SDK iterator cleanup, Matrix test isolation, UI focus restoration) merged or reached "ready for maintainer look" status, indicating active core maintenance. The volume of items labeled `clawsweeper:needs-maintainer-review` and `needs-product-decision` suggests issue discovery outpaces maintainer bandwidth right now.

## 2. Releases

**No new releases were published in the last 24 hours.** The most recent publicly referenced versions in issue reports are 2026.9.1 (`ad6fe23`) and 2026.9.2, both of which have outstanding regression reports under active investigation — so the next release is likely a patch/bugfix cut.

## 3. Project Progress

197 PRs were merged/closed in the last 24 hours. Among visible high-signal items:

**Notable merged/closed PRs:**
- [#140490](https://github.com/openclaw/openclaw/pull/140490) — fix: use the installed WebSocket transport for node streams (avoids Bun WebSocket adapter mis-selection)
- [#140485](https://github.com/openclaw/openclaw/pull/140485) — fix(sdk): release buffered events when iterators close (prevents payload retention after iterator retirement/filter failure)
- [#139272](https://github.com/openclaw/openclaw/pull/139272) — fix: preserve complete Codex replies when previews stall (closes [#139249](https://github.com/openclaw/openclaw/issues/139249))
- [#139699](https://github.com/openclaw/openclaw/pull/139699) — feat(directives): emit `directive.rejected` diagnostic on pre-run rejection (e.g., failed `/model` scope changes)

**Correspondingly closed issues (in the top-50 list):**
- [#124991](https://github.com/openclaw/openclaw/issues/124991) — [P1] CLI session reseed inert on SQLite session stores
- [#137056](https://github.com/openclaw/openclaw/issues/137056) — [P1] memory-core: move maintenance off search/watch hot paths

**Open PRs advancing fixes and features** (mostly in "ready for maintainer look" status): plugin-SDK facade consolidation ([#140489](https://github.com/openclaw/openclaw/pull/140489), [#140500](https://github.com/openclaw/openclaw/pull/140500)), Matrix fixture/runtime isolation ([#140496](https://github.com/openclaw/openclaw/pull/140496), [#140491](https://github.com/openclaw/openclaw/pull/140491)), empty-heartbeat retry-storm fix ([#137936](https://github.com/openclaw/openclaw/pull/137936)), long-transcript availability in `sessions_yield` ([#137381](https://github.com/openclaw/openclaw/pull/137381)), UI tab recovery after missed Gateway updates ([#140484](https://github.com/openclaw/openclaw/pull/140484)), and iOS location-status refresh ([#140424](https://github.com/openclaw/openclaw/pull/140424)).

## 4. Community Hot Topics

The most active discussions (by comment count) concentrate on runtime reliability and upgrade pain:

- [#135111](https://github.com/openclaw/openclaw/issues/135111) *(14 comments, P1)* — Intermittent "Provider completed tool call with malformed JSON arguments" on v2026.8.1 with claude-sonnet-5. Not tied to file/tool; ~6 occurrences. Users need a deterministic repro instead of a flaky, provider-specific error.
- [#97616](https://github.com/openclaw/openclaw/issues/97616) *(13 comments, P1)* — Zombie accumulation from unreaped hook/tool child processes causing long-run degradation. Strong operational concern for 24/7 gateway hosts.
- [#119720](https://github.com/openclaw/openclaw/issues/119720) *(12 comments, P1)* — Synchronous agent persistence/transcript maintenance blocks the Gateway event loop at scale. Historical scope was partially fixed via [#133925](https://github.com/openclaw/openclaw/pull/133925)/[#134062](https://github.com/openclaw/openclaw/pull/134062); the core Gateway-thread issue remains.
- [#132762](https://github.com/openclaw/openclaw/issues/132762) *(12 comments, P1)* — Overflow retry can report success on a tool result without final delivery, causing silent message loss.
- [#113306](https://github.com/openclaw/openclaw/issues/113306) *(12 comments, P2)* — SQLite snapshot restore lacks end-to-end crash and identity guarantees (data-loss risk).
- [#96975](https://github.com/openclaw/openclaw/issues/96975) *(12 comments, P2)* — Feature/bug: isolate subagent completion from parent context to avoid heavy payload injection.
- [#41201](https://github.com/openclaw/openclaw/issues/41201) *(11 comments, P2, 👍 1)* — Control UI avatar broken image — open since March 2026.
- [#95610](https://github.com/openclaw/openclaw/issues/95610) *(11 comments, P2, 👍 2)* — Per-turn dynamic injections defeat OpenAI prompt caching, inflating cost.
- [#137813](https://github.com/openclaw/openclaw/issues/137813) *(11 comments, P0)* — Windows Gateway never starts after 2026.9.1 update; new `--task-supervisor` flag exits 0 silently.

**Underlying needs:** users are demanding durable message delivery, predictable updates on Windows, better cost efficiency (prompt caching), and clean session/subagent isolation — stability over new features.

## 5. Bugs & Stability

**P0 — release-blocking / critical:**

- [#137813](https://github.com/openclaw/openclaw/issues/137813) — Windows 11: Gateway never starts after 2026.9.1; `--task-supervisor` exits 0 silently via Scheduled Task; child never spawns. *No fix PR yet.*
- [#114967](https://github.com/openclaw/openclaw/issues/114967) — Agent-driven live update leaves a `launchctl submit` keepalive validator force-restarting the Gateway every ~2 minutes. *Needs maintainer review; no fix PR.*
- [#136203](https://github.com/openclaw/openclaw/issues/136203) — Windows de-DE 2026.8.2 upgrade leaves Doctor maintenance blocked and legacy workspace state behind. *Labeled queueable-fix; no new fix PR.*
- [#48920](https://github.com/openclaw/openclaw/issues/48920) — Live docs ahead of release (e.g., `IsolatedSessions` documented but not shipped). Doc/release pipeline issue, open since March with 4 👍.

**P1 — high impact (new this week):**

- [#139847](https://github.com/openclaw/openclaw/issues/139847) *(created Sep 6)* — Regression in 2026.9.2: message sent while a reply run is active is dropped ("Reply operation has no active tool authority snapshot"). *No fix PR yet.*
- [#139578](https://github.com/openclaw/openclaw/issues/139578) *(created Sep 6)* — llama.cpp managed EmbeddingGemma runs at server-default ubatch 512 (regression from [#134389](https://github.com/openclaw/openclaw/pull/134389)). *Needs live repro.*
- [#139215](https://github.com/openclaw/openclaw/issues/139215) *(created Sep 5)* — Cron scheduler silently swallows scheduled ticks since 2026.9.1; runs never launch and no run entry is written.

**P1 — established backlog:**

- Malformed JSON args regression: [#135111](https://github.com/openclaw/openclaw/issues/135111)
- Zombie child-process leaks: [#97616](https://github.com/openclaw/openclaw/issues/97616)
- Gateway event-loop blocking (persistence/transcript): [#119720](https://github.com/openclaw/openclaw/issues/119720)
- Overflow retry success without final delivery: [#132762](https://github.com/openclaw/openclaw/issues/132762)
- Stale module import paths after update/rollback cause silent inbound drops (`ERR_MODULE_NOT_FOUND`): [#92241](https://github.com/openclaw/openclaw/issues/92241)
- Session lane starvation blocking inbound dispatch 20–30 min: [#54488](https://github.com/openclaw/openclaw/issues/54488)
- CLI session reseed inert on SQLite: [#124991](https://github.com/openclaw/openclaw/issues/124991) — *CLOSED*
- Post-core-update resume admits unfinalizable `update_runs` row → "update in progress" forever: [#139714](https://github.com/openclaw/openclaw/issues/139714)
- Multi-agent ambient ops fail with `AgentSelectionRequiredError`: [#128637](https://github.com/openclaw/openclaw/issues/128637)
- Memory dreaming pegs the Gateway event loop for ~10 minutes: [#99910](https://github.com/openclaw/openclaw/issues/99910)

**Silver lining:** a number of fix PRs are in flight or just landed for adjacent issues — empty heartbeat retry storms ([#137936](https://github.com/openclaw/openclaw/pull/137936)), Codex reply truncation ([#139272](https://github.com/openclaw/openclaw/pull/139272)), memory-flush compaction context ([#137440](https://github.com/openclaw/openclaw/pull/137440)), and same-version channel-switch reporting ([#140493](https://github.com/openclaw/openclaw/pull/140493)).

## 6. Feature Requests & Roadmap Signals

**Strongest roadmap candidates (high engagement or close to product decision):**

- [#96975](https://github.com/openclaw/openclaw/issues/96975) — Isolate subagent completion from parent context; return only status + child session link. 12 comments; addresses heavy-subagent session bloat. *Needs product decision.*
- [#99583](https://github.com/openclaw/openclaw/issues/99583) — Intelligent session auto-titling using existing LLM slug generator (2 👍, 7 comments).
- [#71058](https://github.com/openclaw/openclaw/issues/71058) — Multiple Azure/Teams bots on a single Gateway (8 comments).
- [#14376](https://github.com/openclaw/openclaw/issues/14376) — Reason-aware cron guardrails: quota/auth-aware backoff and circuit breaker for 402/rate-limit failures.
- [#120244](https://github.com/openclaw/openclaw/issues/120244) — Daily cron maintenance window with role isolation and FIFO replay.
- [#51572](https://github.com/openclaw/openclaw/issues/51572) — Fire `session-memory` hook on session reset/prune, not only compaction.
- [#84242](https://github.com/openclaw/openclaw/issues/84242) — Expose LanceDB `memory_store`/`memory_recall`/`memory_forget` as callable agent tools (3 👍 — the most-liked open feature).

**Signals from new PRs:** an external AIgateway provider plugin was contributed ([#140146](https://github.com/openclaw/openclaw/pull/140146)), and an automated fix PR for per-agent daily model spend alerts ([#138679](https://github.com/openclaw/openclaw/pull/138679), target [#113481](https://github.com/openclaw/openclaw/issues/113481)) suggests cost-control is an emerging theme. The large open PR [#135868](https://github.com/openclaw/openclaw/pull/135868) (installation-owned recovery after update/startup failures) points toward self-healing installs as a near-term priority.

**Prediction:** the next minor release will lean heavily on update-path reliability (Windows, supervisor flags, launchd keepalive cleanup, doctor self-repair), plus plugin/extension polish; subagent isolation and session-memory lifecycle hooks remain the most likely feature candidates for the release after that.

## 7. User Feedback Summary

- **Windows update/recovery is the #1 pain point.** Three distinct P0/P1 reports ([#137813](https://github.com/openclaw/openclaw/issues/137813), [#136203](https://github.com/openclaw/openclaw/issues/136203), [#134896](https://github.com/openclaw/openclaw/issues/134896)) describe upgrades leaving Gateways broken, Doctor blocked, or processes silently exiting — all requiring manual intervention. Expect Windows-focused QA to be a stated priority.
- **Silent failures erode trust.** Multiple reports describe messages or runs being dropped with no error surfaced (inbound turn with zero-payload dispatch, cron ticks that never launch, overflow retries ending without final delivery, stuck-session self-suppression). Users consistently ask for dead-letter queues, retries, and visible failure states.
- **Docs/release drift frustrates users.** The P0 "Live Docs are ahead of release" issue ([#48920](https://github.com/openclaw/openclaw/issues/48920)) has 4 👍 and has been open since March.
- **Cost pressure is real for OpenAI-path users.** Prompt-cache churn ([#95610](https://github.com/openclaw/openclaw/issues/95610), 2 👍) and mid-turn estimator over-counting ([#101929](https://github.com/openclaw/openclaw/issues/101929)) indicate enterprise/heavy users are watching token spend closely.
- **Positive community energy:** external contributors (steipete alone landed/advanced ~8 PRs this cycle) and new provider plugins (AIgateway) show a healthy contributor ecosystem forming around the plugin SDK.

## 8. Backlog Watch

Long-running, high-importance items still awaiting maintainer attention:

- [#41201](https://github.com/openclaw/openclaw/issues/41201) — Control UI avatar broken image (open since **March 9**, 11 comments, `needs-maintainer-review` + `needs-product-decision`).
- [#44130](https://github.com/openclaw/openclaw/issues/44130) — TUI scroll-jump/auto-scroll disruptive (open since March 12; 3 👍; `needs-maintainer-review`, `needs-product-decision`, `needs-info`).
- [#48920](https://github.com/openclaw/openclaw/issues/48920) — Docs ahead of release (P0, open since March 17).
- [#49381](https://github.com/openclaw/openclaw/issues/49381) — Feishu duplicate final replies after model failover (open since March 18; no maintainer labels, only P2/impact).
- [#54488](https://github.com/openclaw/openclaw/issues/54488) — Session lane starvation blocking inbound dispatch (P1, open since March 25; `no-new-fix-pr`, `needs-product-decision`).
- [#51572](https://github.com/openclaw/openclaw/issues/51572) — Session-memory hook on reset/prune (open since March 21; 1 👍; waiting on product decision).
- [#103](https://github.com/openclaw/openclaw/issues/14376) *(sic)* — Reason-aware cron guardrails (open since **February 12**, 5 comments).
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — Zombie child-process leak (P1, open since June 29, 13 comments) — one of the most-upvoted reliability bugs, still `needs-maintainer-review` and without a fix PR.

**Bottom line:** Project velocity is high, but the ratio of open triage labels (`needs-maintainer-review`, `needs-product-decision`) to merged fixes indicates the maintainer team is the critical path. The update/rollback subsystem and Windows support are the clearest stability risks heading into the next release.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open Source Ecosystem
**Data window:** 2026-09-07 (24h digest) · **Projects:** OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The open-source personal AI assistant landscape spans from industrial-scale gateway platforms (OpenClaw) to focused, governance-heavy agent runtimes (ZeroClaw), Rust/MCP-native hosts (IronClaw), desktop-integrated agents (Hermes), and console-first multi-channel agents (QwenPaw). The ecosystem is in a collective stabilization phase — no project shipped a release in the window — yet combined activity remains intense at roughly 600 issues and 620 PRs touched in 24 hours, dominated by regression triage, contributor fix PRs, and architectural RFCs. The dominant engineering theme is **trust engineering**: durable memory, guaranteed delivery, prompt-cache cost control, and cross-platform reliability, rather than new model capabilities. Community health is bifurcated: contributor bases are broadening (first-time fix PRs in QwenPaw, sustained external contributors in OpenClaw), while maintainer bandwidth and RFC decision processes are emerging as the ecosystem's critical bottleneck.

---

## 2. Activity Comparison

| Project | Issues (24h) | PRs (24h) | Merged/Closed (24h) | Release Status | Health Score* |
|---|---|---|---|---|---|
| **OpenClaw** | 500 touched (377 open) | 500 touched (303 open) | 123 issues, 197 PRs | None — patch expected for 2026.9.x regressions | 6.0 / 10 |
| **Hermes Agent** | 50 touched (39 open) | 50 touched (48 open) | 2 PRs | None | 6.5 / 10 |
| **IronClaw** | 0 touched (0 open) | 9 touched (6 open) | 3 PRs (all Dependabot) | None | 7.5 / 10 |
| **QwenPaw** | 20 touched (17 open) | 10 touched (9 open) | 1 PR, 3 issues | None — 2.2.x patch queue awaiting review | 6.0 / 10 |
| **ZeroClaw** | 32 touched | 50 touched | 6 PRs, 3 issues | None — v0.8.5 wrap-up status unclear | 5.5 / 10 |

\* Composite judgment based on stability signals, fix velocity, maintainer responsiveness, and backlog pressure.

**Key observations from the table:**
- **OpenClaw** has one to two orders of magnitude more activity than any peer, but its velocity is outpacing maintainer capacity — labeled items (`needs-maintainer-review`, `needs-product-decision`) are accumulating, and multiple P0 regressions lack fix PRs.
- **Hermes** shows strong platform work (WhatsApp stack, profile isolation) but weak merge throughput — only 2 PRs left open state despite 50 touched.
- **IronClaw** reports zero user-facing issues and zero regressions: a healthy but low-engagement maintenance posture, with the queue dominated by automated dependency bumps.
- **ZeroClaw** exhibits the worst stability-to-feature ratio: six PRs merged, but several S1 bugs remain unfixed and large PRs sit in `blocked`/`do-not-merge`.
- **QwenPaw** shows the healthiest contributor dynamic — 9 of 10 open PRs come from first-time contributors — but a fresh cluster of memory-loss reports at critical severity offsets that momentum.

---

## 3. OpenClaw's Position

### Advantages vs. peers
- **Community scale:** ~377 open issues and ~303 open PRs dwarf every peer (next closest: Hermes at 39/48). Named external contributors (e.g., steipete landing/advancing ~8 PRs in one cycle) and external provider plugins (AIgateway) demonstrate a self-sustaining contributor ecosystem.
- **Surface breadth:** OpenClaw is the only project spanning gateway runtime, memory-core subsystem, control UI, cron, plugin SDK, and multi-provider inference (including managed llama.cpp) as one integrated platform. Adoption buys coverage, not assembly.
- **Maintainer throughput:** 197 PRs merged/closed in 24 hours — a merge rate no peer approaches, even while triage falls behind.

### Technical approach differences
- OpenClaw runs a Bun/JS-based typed runtime with explicit WebSocket transport adapters, a task-supervisor/launchd/Scheduled Task process model, and a "live self-healing install/update/rollback" subsystem — an unusual degree of investment in update-path reliability as a first-class platform concern.
- It embraces a **directive/hook/memory-core architecture** with a control UI, differentiating it from Hermes' desktop-app-centric model, IronClaw's Rust/WASM/MCP host, and ZeroClaw's OS-sandbox-driven security posture.

### Community size comparison
| Project | Open Issues | Open PRs | 24h Merge Volume |
|---|---|---|---|
| OpenClaw | ~377 | ~303 | 197 PRs |
| Hermes | 39 | 48 | 2 PRs |
| IronClaw | 0 | 6 | 3 dep PRs |
| QwenPaw | 17 | 9 | 1 PR |
| ZeroClaw | n/a | n/a (50 touched) | 6 PRs |

### Weak spot
OpenClaw's Windows update/recovery path is its clearest vulnerability (**P0 #137813** — gateway never starts after 2026.9.1; **P0 #136203** — Doctor blocked post-upgrade), compounded by silent failure modes (cron tick loss, dropped messages). Neither peers nor competitors are immune (ZeroClaw has a parallel Windows CI saga), but OpenClaw's scale makes its regressions proportionally more visible.

---

## 4. Shared Technical Focus Areas

Requirements appearing across multiple projects:

1. **Memory & context persistence integrity (all five projects).** OpenClaw: session reseed, transcript reliability, subagent context isolation (#96975). Hermes: `state.db` WAL split-brain corruption (#104596), mid-turn `/steer` instruction loss (#104442). QwenPaw: assistant's own replies vanishing from context (#7579, #7584). ZeroClaw: history-trim token accounting (#9713), failed-turn transcript persistence (#9378). **Need:** durable, corruption-resistant session stores with integrity checks and survivor-friendly restore semantics.

2. **Prompt-cache & cost engineering (OpenClaw, Hermes, ZeroClaw).** OpenClaw: per-turn dynamic injections defeat OpenAI prompt caching (#95610), per-agent daily spend alerts (#138679). Hermes: replay divergence causing 75–85% cache misses (#104442); a documented $19k autonomous run. ZeroClaw: new cache-breakpoint and TTL proposal cluster (#10660/#10662/#10663) targeting Anthropic's four-slot limit. **Need:** cache-aware context assembly and configurable cache breakpoints/TTLs as product features, not implementation details.

3. **Subagent orchestration: progress visibility and isolation (OpenClaw, QwenPaw, ZeroClaw, Hermes).** OpenClaw: isolate subagent completion from parent context (#96975). QwenPaw: agents only query subagent status when explicitly asked (#7450); proposed blocking wait-for-agent tool (#7580). ZeroClaw: expose delegate progress to parents (#10531); bind delegate results to owner principals (#10644). Hermes: async delegation completion never delivered to API-created sessions (#104582). **Need:** standard subagent lifecycle primitives — structured completion events, progress streams, and context isolation.

4. **Delivery guarantees / no silent failures (OpenClaw, Hermes, QwenPaw, ZeroClaw).** OpenClaw: overflow retry reports success without final delivery (#132762); cron ticks silently swallowed (#139215). QwenPaw: HTTP 409 on mid-task follow-ups vs. expected queue semantics (#7559). ZeroClaw: incomplete terminal responses reported as successful (#9421). Hermes: dropped async completion deliveries. **Need:** dead-letter queues, visible failure states, and queue-based message semantics.

5. **Windows & desktop parity (OpenClaw, ZeroClaw, QwenPaw, Hermes).** OpenClaw P0 Windows gateway failures; ZeroClaw's 74 Windows test failures (#7462); QwenPaw Windows desktop multi-minute event-loop freezes (#7363); Hermes desktop renderer trust bugs (#68321). **Need:** Windows CI parity and desktop session-state hardening are now table stakes.

6. **Multi-profile / multi-tenant isolation (Hermes leading, echoed elsewhere).** Hermes has the largest cluster: profile-scoped MCP tool isolation (#104534), env-var resolution (#104265), cron job ownership (#103188), dashboard turn isolation (#101501). OpenClaw and ZeroClaw show parallel needs in subagent context isolation and owner-principal binding. **Need:** isolation seams across tools, environment, cron, and sessions as gateway multiplexing adoption grows.

7. **Channel UX polish (QwenPaw, ZeroClaw, IronClaw, Hermes).** QwenPaw: Telegram Markdown tables, Feishu card auto-collapse, Telegram intermediate-message cleanup. ZeroClaw: Matrix transcription providers, WeCom documentation. IronClaw: Slack shared-channel disconnection guidance. Hermes: WhatsApp AST-based rendering. **Need:** per-channel rendering fidelity and streaming-message hygiene.

---

## 5. Differentiation Analysis

| Project | Positioning | Primary Users | Technical Architecture | Distinctive Focus |
|---|---|---|---|---|
| **OpenClaw** | Core reference, self-hosted always-on AI gateway | Power users, gateway operators, plugin developers | Bun/JS typed runtime; gateway + memory-core + control UI + plugin SDK; managed local models | Update-path self-healing, reliability at scale, ecosystem breadth |
| **Hermes Agent** | Desktop-integrated agent platform (Nous Research) | Desktop-first users, multi-profile operators | Desktop app + gateway + cron + skills index; profile isolation seams | Desktop continuity, WhatsApp expansion, cost/context accounting |
| **IronClaw** | Rust/MCP-native agent host (nearai) | MCP/LLM tool developers, Slack workspace operators | Rust, WASM/WIT, MCP lanes, HTTP host API | MCP safety diagnostics, assistant shared-channel behavior, dependency hygiene |
| **QwenPaw** | Console + SDK agent framework (AgentScope) | Python developers, channel operations (Feishu/Telegram/Discord) | Python core, console UI, adapter-based channels | Memory reliability, queue semantics, fast community fix economy |
| **ZeroClaw** | RFC-governed secure agent platform | Security-conscious teams, TUI/ZeroCode users | WASM plugins, OS-level sandbox backends (Bubblewrap/Landlock/Seatbelt), ACP integration | Sandbox policy, prompt-cache tuning, RFC-driven architecture evolution |

**Architectural fault lines:** OpenClaw and IrionClaw represent the **gateway/host** paradigm (always-on, transport-agnostic); Hermes and QwenPaw anchor on **user-facing surfaces** (desktop app / console); ZeroClaw is differentiated by **security governance** and formal RFC processes. IronClaw is the only Rust/WASM-first implementation; OpenClaw and QwenPaw sit on high-level dynamic runtimes (Bun/JS and Python). Hermes' Nous lineage gives it a distinct local-model and research orientation; QwenPaw's AgentScope affiliation suggests an East-Asia/Feishu-weighted community; OpenClaw already receives contributions from all of these ecosystems.

---

## 6. Community Momentum & Maturity

**Tier 1 — Industrial scale, stabilizing under load:**
- **OpenClaw** — Massive throughput (500/500 touched), broad external contribution, but P0/P1 regression clusters and triage-label accumulation indicate a project whose user base has outrun its maintainer bandwidth. The next release will be a reliability patch, not a feature cut.

**Tier 2 — Rapid iteration with sharp edges:**
- **Hermes Agent** — Strong forward motion on platform expansion (WhatsApp stack, profile isolation, Group Chat continuity). Low merge throughput (2 PRs/24h) and an unresolved new P1 WAL corruption bug temper the momentum.
- **QwenPaw** — The most vibrant contributor dynamic relative to project size — 9 open PRs from two first-time contributors, several filed within a day of the issue. Critical memory-loss reports and an accumulating review backlog are the drag factors.
- **ZeroClaw** — High raw activity (50 PRs touched) but a congested pipeline: many PRs `blocked`/`do-not-merge`, active S1 bugs without fix PRs, and RFC revision churn (#9487 v5, #9488 v10) signaling process fatigue.

**Tier 3 — Maintenance mode:**
- **IronClaw** — Zero user-reported issues, clean dependency hygiene, no regressions — but no feature momentum either. Indicates a mature, stable product in quiet upkeep rather than an active growth phase.

---

## 7. Trend Signals

1. **Agent memory durability is the new trust frontier.** Across all five projects, the most emotionally charged and highly commented reports concern agents forgetting their own outputs, losing standing instructions, or corrupting session state. For developers this means: **treat the transcript/session store as a durability-critical subsystem**, with WAL integrity checks, atomic restore, and replay-safe APIs.

2. **Prompt-cache economics are becoming a first-class product surface.** ZeroClaw is adding cache breakpoint/TTL configuration; OpenClaw and Hermes are fighting cache churn from dynamic context assembly. Value for developers: **design context assembly to be cache-stable** — static prefixes, stable ordering, and explicit cache markers with configurable TTLs.

3. **Users demand delivery guarantees, not silent best-effort.** Repeated complaints across projects describe messages/runs that vanish without error (dropped cron ticks, false-success retries, lost delegations). Dead-letter queues, idempotent retries, and visible failure states are emerging as table stakes for agent infrastructure.

4. **Subagent orchestration needs a standard protocol.** The convergence on isolation (return status + child-session link, not full context), progress events, and wait/join primitives across OpenClaw, QwenPaw, ZeroClaw, and Hermes points to a shared abstraction: **structured subagent lifecycle with explicit parent/child boundaries**.

5. **Windows and desktop are the next growth frontier — and the biggest risk.** Three of five projects have active Windows-specific failures; all show desktop UI regressions that destroy user trust even when data is intact. Cross-platform CI parity and renderer-state hardening are clear investment signals.

6. **Multi-profile/tenant isolation is rising fast.** Hermes' profile-scoped isolation cluster indicates real-world gateway multiplexing adoption hitting sharp edges. Developers building multi-agent deployments should plan for **isolation across tools, environment variables, cron ownership, and session stores** from day one.

7. **Governance is a bottleneck in both large and process-heavy projects.** OpenClaw's `needs-product-decision` backlog and ZeroClaw's RFC vote-reset churn both point the same direction: **maintainer decision queues are the ecosystem's limiting resource.** Fast fix-turnaround communities (QwenPaw's same-day first-time PRs) show that lowering process overhead unlocks contributor energy.

**Bottom line for AI agent developers:** the ecosystem is converging on a reliability core — durable and cache-aware context, guaranteed delivery with visible failure modes, structured subagent semantics, and cross-platform parity. Feature differentiation is migrating to channel UX, security sandboxing, and desktop integration, while the projects that institutionalize fast maintainer response and lightweight contribution processes are winning the community health race.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-07

## 1. Today’s Overview
Hermes Agent is in a **high-activity stabilization and platform-expansion phase**: 50 issues and 50 PRs were updated in the last 24 hours, with 39 issues and 48 PRs still open. There were **no new releases**, but the PR queue shows strong forward motion across desktop group-chat continuity, WhatsApp transport, cron UX, and gateway profile isolation. Issue heat remains concentrated on long-running automation/watchdog problems, especially the stale skills index (#66616 at 168 comments) and a blocked Nous-to-Enterkey merge (#88584 at 72 comments). The most urgent new stability signal is a P1 single-process WAL split-brain corruption bug in `state.db` (#104596), reported with a reproducible pre-corruption code path.

## 2. Releases
No new release tags were published in this window. There are no changelog, breaking-change, or migration notes to report.

## 3. Project Progress
The aggregate PR data shows **2 PRs moved out of open state** (merged/closed) in the last 24 hours, but their titles were not present in the provided top-PR snapshot, so no concrete merged-change claims can be made from this digest.

Substantial open PRs advanced or remain in active development:

- **Group Chat continuity** — #98307 is the larger bot-mode implementation for “Group Chats keep working after Desktop closes,” while #104601 adds authenticated Group Chat history retention on participant gateways. Directly supports #97681.  
  https://github.com/NousResearch/hermes-agent/pull/98307  
  https://github.com/NousResearch/hermes-agent/pull/104601
- **WhatsApp platform expansion** — Three stacked PRs: #104133 replaces the regex markdown formatter with an AST-based CommonMark → WhatsApp renderer; #104245 adds observed unmentioned group context; #104247 adds WAHA as a third WhatsApp transport.  
  https://github.com/NousResearch/hermes-agent/pull/104133  
  https://github.com/NousResearch/hermes-agent/pull/104245  
  https://github.com/NousResearch/hermes-agent/pull/104247
- **Profile isolation under gateway multiplexing** — A large cluster of PRs from contributors improving cross-profile data safety: MCP server/tool isolation (#104534), profile-scoped env var resolution (#104265), session-store profile seams (#102146), cron job ownership routing (#103188), and dashboard turn isolation (#101501).  
  https://github.com/NousResearch/hermes-agent/pull/104534  
  https://github.com/NousResearch/hermes-agent/pull/104265  
  https://github.com/NousResearch/hermes-agent/pull/102146  
  https://github.com/NousResearch/hermes-agent/pull/103188  
  https://github.com/NousResearch/hermes-agent/pull/101501
- **Gateway/desktop reliability fixes** — Typing indicators during native handoffs (#104598), progress-bubble cleanup on queued follow-ups (#104500), Discord auto-thread behavior for free-response channels (#104499), Discord `delete_message` support (#104600), sandbox process-group termination verification (#104597), and update-check origin URL isolation (#104599) were all updated or newly opened.  
  https://github.com/NousResearch/hermes-agent/pull/104598  
  https://github.com/NousResearch/hermes-agent/pull/104500  
  https://github.com/NousResearch/hermes-agent/pull/104499  
  https://github.com/NousResearch/hermes-agent/pull/104597  
  https://github.com/NousResearch/hermes-agent/pull/104599

## 4. Community Hot Topics
The most active issues by comment count are dominated by automation reliability, architectural continuity, and context/cost correctness:

- **#66616 — Skills index is stale or degraded** (168 comments, open since July 18)  
  https://github.com/NousResearch/hermes-agent/issues/66616  
  A freshness probe reports the Skills Hub index is 29.8h old against a 26h limit. The very high comment count suggests the watchdog has been repeatedly re-firing without a durable fix, or at least generating sustained community/integration discussion.
- **#88584 — Automated Nous integration is blocked** (72 comments)  
  https://github.com/NousResearch/hermes-agent/issues/88584  
  A scheduled Nous-to-Enterkey merge is blocked by conflicts in `cron/jobs.py`. The long tail of comments points to integration-owner frustration rather than a core-agent bug.
- **#97681 — Bot Group Chats should keep working after Desktop closes** (25 comments)  
  https://github.com/NousResearch/hermes-agent/issues/97681  
  Strong user demand for durable, device-independent multi-agent group chats. This is the flagship feature issue behind the active #98307/#104601 PR work.
- **#68321 — Desktop: all assistant messages vanish when switching chats** (10 comments, P1)  
  https://github.com/NousResearch/hermes-agent/issues/68321  
  A top-priority desktop bug where assistant messages disappear from the rendered chat while the DB remains intact.
- **#73327 — Customizable cron response wrapping template** (6 comments, 3 👍)  
  https://github.com/NousResearch/hermes-agent/issues/73327  
  Users want control over the cron delivery wrapper instead of the hardcoded header/footer in `cron/scheduler.py`.

The underlying signals: users care about **index freshness**, **cross-machine session continuity**, **platform connector polish**, and **accurate context/cost accounting**.

## 5. Bugs & Stability
New or still-open stability issues, ranked by severity:

| Severity | Issue | Summary |
|---|---|---|
| **P1** | [#104596 — state.db WAL split-brain inside a single process](https://github.com/NousResearch/hermes-agent/issues/104596) | Newly reported corruption path: `apply_wal_with_fallback` runs the set-pragma when the journal-mode probe fails, unlinking sibling connections’ `-wal`/`-shm` files. Causes repeated `btreeInitPage() returns error code 11`. No fix PR is yet visible. |
| **P1** | [#104442 — Mid-turn /steer text never persists](https://github.com/NousResearch/hermes-agent/issues/104442) | Replayed history diverges, causing 75–85% prompt-cache misses and losing user instructions. Marked duplicate, but unresolved behavior is high-impact for session correctness. |
| **P1** | [#68321 — Desktop assistant messages disappear after switching chats](https://github.com/NousResearch/hermes-agent/issues/68321) | Open since July 21. Rendering-only issue, DB intact, but it severely undermines trust in desktop sessions. |
| **P2** | [#104582 — Async delegation completion never delivered to API-created sessions](https://github.com/NousResearch/hermes-agent/issues/104582) | `delegate_task` completion on an `api-` prefixed session never triggers `gateway.wake`; delivery is not retried. Distinct from earlier async wake bugs. |
| **P2** | [#104541 — Cron monitor `no_change` stubs destroy context continuity](https://github.com/NousResearch/hermes-agent/issues/104541) | Silent monitor-mode ticks wipe `continuity`/`context_from: [self]` context; quieter jobs lose continuity faster. |
| **P2** | [#104176 — Inherited ContextCompressor summary overrides break on `bypass_cooldown`](https://github.com/NousResearch/hermes-agent/issues/104176) | Third-party context engines subclassing `ContextCompressor` break because `bypass_cooldown` was added to the internal summary call signature. API-compatibility regression. |
| **P2** | [#104169 — `refresh_agent_mcp_tools()` silently drops session assembly context](https://github.com/NousResearch/hermes-agent/issues/104169) | Re-derivation of the tool array loses anything not explicitly reproduced by `get_tool_definitions()`. Structural issue for MCP-heavy sessions. |
| **P2** | [#100302 — DOM normalizer removes Chromium’s active caret node; typing stops](https://github.com/NousResearch/hermes-agent/issues/100302) | macOS Desktop composer loses the active caret after a short burst; contenteditable remains active but no longer inserts characters. |
| **P2** | [#100836 — `hermes doctor --fix` self-detects as a live writer](https://github.com/NousResearch/hermes-agent/issues/100836) | Leaked `COUNT(*)` connection in `doctor.py` prevents repair of a corrupt `state.db`, even when no gateway is running. |

Some fix PRs exist for adjacent reliability issues: #104597 addresses sandbox process-group termination, #104534 isolates MCP tools per profile, and #104265 fixes profile-varying env var leaks.

## 6. Feature Requests & Roadmap Signals
The clearest near-term roadmap signal is **durable Group Chat continuity**: issue #97681 is actively matched by PRs #98307 and #104601, making this a strong candidate for the next feature release.

Also notable:

- **Cron ergonomics** — Users want atomic disabled job creation (#104572), “Deliver to All” in Desktop (#44968), and prompt-file / no-cron-hint / attach-to-session options (#103189). Combined with the customizable cron wrapper request (#73327), cron UX is a clear secondary roadmap theme.  
  https://github.com/NousResearch/hermes-agent/issues/104572  
  https://github.com/NousResearch/hermes-agent/issues/44968  
  https://github.com/NousResearch/hermes-agent/pull/103189
- **WhatsApp as a first-class gateway platform** — The stacked WAHA PR set (#104247, #104245, #104133) suggests an upcoming bundled third WhatsApp transport.
- **Context-file composition** — #98614 proposes `@path` include directives for `SOUL.md`, `.hermes.md`, `AGENTS.md`, and `CLAUDE.md`, which would improve multi-file identity/setup workflows.  
  https://github.com/NousResearch/hermes-agent/pull/98614
- **Trusted execution lanes** — #44993 asks for a trusted-profile lane allowing `execute_code` without per-script approvals for operator bots. This remains open since June.  
  https://github.com/NousResearch/hermes-agent/issues/44993
- **Model behavior controls** — #44817 requests an optional “Second Voice” guardrail for step-by-step execution control, especially for smaller local models.  
  https://github.com/NousResearch/hermes-agent/issues/44817

Predictions: the next minor release is likely to include **profile-aware gateway/cron/MCP isolation** plus **Group Chat history preservation**; WhatsApp/WAHA and cron UX features may land together if the stacked PRs merge cleanly.

## 7. User Feedback Summary
User pain points in this window cluster into three themes:

- **Desktop front-end reliability** — Users are repeatedly reporting renderer/session-state bugs that do not corrupt data but make the UI unusable: assistant messages vanish (#68321), sidebar shows zero sessions after auto-update (#97762), caret dies while typing (#100302), and model submenus close during diagonal pointer travel (#97505). The “DB is intact / renderer only” framing appears repeatedly, indicating users want session rendering hardened even when persisted state is correct.
- **Cost/context correctness** — Several users report preflight estimators and compression triggers making bad decisions: reasoning double-charging (#99398), usage anchors never applying (#99421), compression firing on tiny threads (#100381), and edit-resend triggering spurious compaction (#103391). The forensic post-mortem #103563 documents a $19,302.59 / 1,393-agent refactor run that required 13 harness fixes, showing both the power and fragility of large autonomous runs.
- **Profile/multi-agent isolation** — Contributors and users are actively pushing for correct isolation between profiles, cron jobs, MCP servers, and environments (#104534, #104265, #103188, #101501). The volume of profile-scoped fixes suggests gateway multiplexing is gaining real-world adoption and is hitting sharp edges.

Satisfaction signals are lower than usual in issue text: most comments describe failed automations, lost context, or UI regressions. However, the community is actively submitting high-quality fix PRs, including stacked WhatsApp work and a broad profile-isolation cleanup, which is a positive health indicator.

## 8. Backlog Watch
Issues that appear to need maintainer attention or triage follow-up:

- **#104596 — P1 WAL split-brain bug in `state.db`**  
  Newly filed but the highest-severity open issue; should receive immediate maintainer triage.  
  https://github.com/NousResearch/hermes-agent/issues/104596
- **#68321 — P1 Desktop assistant messages vanish**  
  Open since July 21; despite being P1, it remains unresolved and has only 10 comments.  
  https://github.com/NousResearch/hermes-agent/issues/68321
- **#66616 — Skills index stale/degraded**  
  High comment count and bot-driven updates; needs root-cause attention rather than repeated probing.  
  https://github.com/NousResearch/hermes-agent/issues/66616
- **#47815 — OIDC ID token verification has no clock-skew leeway**  
  Small, well-understood fix (`jwt.decode` without `leeway`) open since June 17. Likely an easy maintainer win.  
  https://github.com/NousResearch/hermes-agent/issues/47815
- **#84672 — Content scanners flag security documentation as attacks**  
  P2 with a suggested common root cause across cron scanner and skills guard; open since August 12.  
  https://github.com/NousResearch/hermes-agent/issues/84672
- **#44817 / #44968 / #44993 — Older P3 feature requests**  
  All open since June 12 with little comment activity; they could use explicit maintainer decisions (roadmap vs. wontfix) to clean the backlog.  
  https://github.com/NousResearch/hermes-agent/issues/44817  
  https://github.com/NousResearch/hermes-agent/issues/44968  
  https://github.com/NousResearch/hermes-agent/issues/44993

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

## 1. Today's Overview

As of 2026-09-07, Ironclaw shows **low issue activity and moderate PR activity**: 0 issues were updated in the last 24 hours, no releases were published, and 9 pull requests were touched. Three dependency-related PRs were closed, while six PRs remain open, including two human-authored fixes for MCP diagnostics and assistant shared-channel behavior. The project appears healthy and in a maintenance-oriented phase, with automated dependency bumps dominating the queue and no new reported regressions or user-facing bug reports.

## 2. Releases

**No new releases published.**

There are no release notes, breaking-change notices, or migration details to report for this digest window.

## 3. Project Progress

No feature-complete PRs were merged/closed in this window. The three closed PRs are automated dependency updates:

- [PR #8049](https://github.com/nearai/ironclaw/pull/8049) — Closed. Bumped the `everything-else` Rust dependency group with 19 updates, including `uuid`, `base64`, and `toml`.
- [PR #7835](https://github.com/nearai/ironclaw/pull/7835) — Closed. Bumped the GitHub Actions group with 5 updates, including `anthropics/claude-code-action` and `actions/setup-node` from `4.0.2` to `7.0.0`.
- [PR #7020](https://github.com/nearai/ironclaw/pull/7020) — Closed. Bumped `tokio-tungstenite` from `0.29.0` to `0.30.0` in the `tokio-ecosystem` group.

These are general maintenance and CI-hygiene changes. No user-facing product features or bug-fix PRs were merged/closed in the last 24 hours.

## 4. Community Hot Topics

There is no comment/reaction data in the supplied PR feed, so no PR can be highlighted strictly by community engagement. The two most substantive open PRs are the non-Dependabot changes:

- [PR #8077](https://github.com/nearai/ironclaw/pull/8077) — `fix(mcp): classify response leak diagnostics`
- [PR #8076](https://github.com/nearai/ironclaw/pull/8076) — `fix(assistant): distinguish disconnected shared channels`

These are likely the PRs most deserving of maintainer and contributor attention, as they modify runtime behavior rather than dependency metadata. The remaining open PRs are automated Dependabot grouping updates with no recorded discussion.

## 5. Bugs & Stability

No new bugs, crashes, or regressions were reported through the issue tracker in the last 24 hours. However, two open PRs target existing reliability/correctness concerns:

1. **[PR #8077](https://github.com/nearai/ironclaw/pull/8077) — Medium/safety-relevant.**  
   Addresses MCP egress diagnostics around response-leak blocking. It centralizes the shared `response_leak_blocked` sentinel in `ironclaw_host_api::http` and teaches the MCP lane to preserve a distinct MCP-visible reason while keeping host leak-blocking safe. This closes referenced issue #8009.

2. **[PR #8076](https://github.com/nearai/ironclaw/pull/8076) — Lower severity, user-facing.**  
   Fixes assistant behavior when a paired user’s shared channel is disconnected, distinguishing that state from an unpaired account. It also renders channel-specific guidance for both user messages and bot commands and improves rejection classification across product, adapter, and OpenAI-compatible surfaces, plus Slack capability updates.

No regressions or release-breaking stability problems were identified in this window.

## 6. Feature Requests & Roadmap Signals

There were no explicit feature-request issues updated in the last 24 hours. The clearest roadmap signals come from open source-code PRs:

- **MCP host diagnostics refinement** in [PR #8077](https://github.com/nearai/ironclaw/pull/8077) suggests the project is improving safety diagnostics for MCP integrations.
- **Assistant channel-state UX** in [PR #8076](https://github.com/nearai/ironclaw/pull/8076) indicates continued work on Slack/assistant shared-channel behavior and cross-surface consistency.

If merged, both are likely patch/minor-level improvements rather than major feature additions. No large roadmap-level features are visible in this digest window.

## 7. User Feedback Summary

No direct user feedback was captured in the issue or PR data for this window. Indirect signals from the two open fix PRs point to real user pain points:

- MCP users may have received unclear or overlapping “response leak blocked” diagnostics.
- Assistant users on Slack may have experienced insufficient guidance when a paired shared channel was disconnected, possibly being treated the same as an unpaired account.

Both issues have open fix PRs, which should positively affect user experience once merged. Overall, no satisfaction/dissatisfaction data is available.

## 8. Backlog Watch

No open issues were updated or waiting in the issue tracker. The main backlog item is a long-running dependency PR:

- [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — Open since 2026-08-23, last updated 2026-09-06.  
  Bumps the `wasm` group with 4 updates: `wasmtime`, `wasmtime-wasi`, `wit-component`, and `wit-parser`. Labeled `size: L`, `risk: medium`. Given the sensitivity of WASM/WIT dependencies, this PR likely needs maintainer review to confirm compatibility and merge readiness.

The other open PRs are recent Dependabot group updates and the two source-code fix PRs still awaiting review.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-07

## 1. Today's Overview

QwenPaw is in a period of very high activity and external contribution: 20 issues were updated in the last 24h (17 open, 3 closed) and 10 PRs were updated (9 open, 1 closed), with no new releases. The dominant theme is agent memory/context reliability — fresh critical reports of assistant replies vanishing from the context window ([#7579], [#7584]) arrived even as maintainers closed several overlapping older reports ([#7447], [#7548], [#6814]). Encouragingly, contributor momentum is strong: 9 of the 10 open PRs are from two first-time contributors (Bruce-Yii and kabishou11) who delivered ready-made fixes for console, Telegram, Feishu, and tool-call observability issues. The main project-health concern is maintainer response capacity — roughly 10 new issues have piled up since Sept 5, several high-severity items have no linked fix, and a backlog of reviewable first-time PRs is accumulating around the 2.2.x line.

## 2. Releases

No new releases in this window.

## 3. Project Progress

- PR [#2134](https://github.com/agentscope-ai/QwenPaw/pull/2134) **feat(heartbeat)** — *CLOSED.* Adds a configurable per-run heartbeat timeout exposed in the console, replacing the previously hardcoded 120s runtime timeout. Only PR closed in the window.
- Newly opened fix/feature PRs now awaiting review:
  - [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521) — Fold consumed `ThinkingBlock` content under context pressure so long-running single-turn agent workflows don't exhaust the context window by replaying old reasoning.
  - [#7546](https://github.com/agentscope-ai/QwenPaw/pull/7546) — Lazy-load unused builtin channel modules; eliminates tens of seconds of startup cost from heavy SDKs (e.g., `lark_oapi`) for console-only workspaces.
  - [#7547](https://github.com/agentscope-ai/QwenPaw/pull/7547) — Recover wedged per-session queue consumers in Feishu high-priority handles (sessions stuck in "already running" state).
  - [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577) — POST /console/chat now enqueues follow-up text/file messages instead of returning HTTP 409 while a task is running. Directly addresses [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559).
  - [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) — Log exceptions with `logger.exception` in `tool_calls/_coordinator.py::_drain()` so handler failures no longer disappear as bare strings. Fixes [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572).
  - [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) — Render GFM Markdown tables as `<pre>` blocks on Telegram instead of escaped raw pipes. Fixes [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585).
  - [#7591](https://github.com/agentscope-ai/QwenPaw/pull/7591) — Auto-collapse Feishu reasoning streaming cards after finalize. Fixes [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570).
  - [#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592) — Optional request-scoped cleanup of Telegram intermediate messages after the final answer; defaults off for backward compatibility. Closes [#7586](https://github.com/agentscope-ai/QwenPaw/issues/7586).
  - [#7593](https://github.com/agentscope-ai/QwenPaw/pull/7593) — Restore v2.1-style direct working-directory path input next to the graphical picker in console. Fixes [#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588).

## 4. Community Hot Topics

- [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450) (8 comments) — Master+multi-subagent tasks only query subagent status when the user explicitly asks "进度如何?", causing long silent stalls. Underlying need: proactive orchestration monitoring rather than user-driven polling.
- [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) (5 comments) — Sending a message or file mid-task triggers HTTP 409; users expect queue semantics, not rejection. The expectation gap between synchronous chat API and long-running async agent tasks is a recurring confusion point.
- [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) (4 comments) — Windows desktop freezes for 118–135s at startup and ~126s per message because synchronous calls block the event loop and the timeout never fires. Open since Aug 27 with no linked fix.
- [#6814](https://github.com/agentscope-ai/QwenPaw/issues/6814) (4 comments, closed) — SIGBUS crash inside `sqlite3WalFindFrame` while opening Scroll `history.db` on macOS; closed this window.
- Memory-loss cluster [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) / [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584) — Users reporting persisted replies disappearing from later requests ("模型看不到自己刚说的话"), triggering empty responses and tool-call loops. High emotional severity in thread language.
- UX regression threads [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570) and [#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588) each produced first-time-contributor PRs within a day — evidence that community care about channel and console polish is high.

## 5. Bugs & Stability

Ranked by severity:

- **Critical — Assistant replies lost from context.** [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579): persisted replies are missing from subsequent model requests (2.2.0 backend), producing "empty response" behavior. [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584): follow-up report of erratic AI behavior — repeated execution, tool-result loss, and tool-call death loops. Older related reports [#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447) and [#7548](https://github.com/agentscope-ai/QwenPaw/issues/7548) were closed this window, but the symptom pattern continues in fresh reports.
- **High — Heartbeat cron feedback loop.** [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589): duplicate message pile-up left an agent unresponsive for ~2 hours; verified against 2.0.1 and latest `main`.
- **High — 409 on mid-task follow-up messages.** [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559); fix PR [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577) is open.
- **Medium — Event-loop freeze / broken timeout.** [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363): synchronous calls block the event loop; no fix PR linked.
- **Medium — Tool exceptions swallowed.** [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572): `_drain()` returns `str(exc)` to the model without logging stacks; fix PR [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) is open.
- **Medium — Telegram Markdown tables unreadable.** [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585): raw `|`/`---` output; fix PR [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) is open.
- **Medium — Cloudflare 403 via WUSRouter.** [#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587): OpenAI-compatible model-list fetch fails against a managed challenge page; needs triage.
- **Lower — DeepSeek scroll-compression failure.** [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541): `[context compressed]` block uses `role=user`, causing `MODEL_EXECUTION_ERROR`; open since Jul 29.
- **Closed this window:** [#6814](https://github.com/agentscope-ai/QwenPaw/issues/6814) SQLite WAL SIGBUS on macOS; [#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447) long-context early-record loss; [#7548](https://github.com/agentscope-ai/QwenPaw/issues/7548) navigation history loss after conversation switch.

## 6. Feature Requests & Roadmap Signals

- **Console working-directory input regression.** Users want the v2.1.0 inline path-entry UX back; PR [#7593](https://github.com/agentscope-ai/QwenPaw/pull/7593) restores it — a likely near-term patch candidate.
- **Channel message hygiene.** Telegram auto-cleanup of intermediate messages ([#7586](https://github.com/agentscope-ai/QwenPaw/issues/7586), PR [#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592)) and Feishu auto-collapse of reasoning cards ([#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570), PR [#7591](https://github.com/agentscope-ai/QwenPaw/pull/7591)) both have ready implementations.
- **Blocking wait tool for delegated agent tasks.** [#7580](https://github.com/agentscope-ai/QwenPaw/issues/7580) proposes a built-in tool to wait for `submit_to_agent` tasks to complete, replacing fragile polling of `check_agent_task`. Consistent with orchestration pain in [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450); plausible as a core-agent enhancement.
- **Heartbeat configurability** landed via PR [#2134](https://github.com/agentscope-ai/QwenPaw/pull/2134); expect console-exposed timeout tuning in upcoming releases.
- **Ecosystem/distribution features.** [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) requests one-click plugin updates, update notifications, and less jarring store navigation; [#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583) requests AgentScope community login, mailbox, and fast feedback loops. These signal product-level investment in plugin distribution and community integration.

## 7. User Feedback Summary

- **Memory reliability is the #1 pain point.** Multiple users report the assistant "总是记不住" — forgetting standing rules such as where TODO files may be created, silently switching to the wrong working directory and overwriting deployed code ([#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)), losing early context in long document workflows ([#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)), and losing its own just-written replies ([#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)).
- **Autonomy expectations are high.** Users don't want to ask "进度如何?" to force subagent status checks ([#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)); they expect agents to detect failure and recover independently.
- **Power-user UX regressions are noticed immediately.** The 2.2.x removal of direct path input drew vocal criticism ([#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588)), and the community rewarded fast fixes with same-day contributor PRs.
- **Channel UX dissatisfaction is concrete.** Telegram/Feishu streaming spam is a recurring complaint; one user contributed a locally verified implementation for Feishu card folding ([#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570)), reflecting a mature, hands-on contributor base.

## 8. Backlog Watch

- [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) — DeepSeek scroll-context `role=user` bug, open since Jul 29, no linked PR; affects a major model family.
- [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — Sync-call event-loop freeze, open since Aug 27, no fix PR; causes multi-minute desktop freezes on Windows.
- [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450) — Multi-subagent orchestration stalls, 8 comments, open since Sept 1, no maintainer response or linked PR.
- [#7580](https://github.com/agentscope-ai/QwenPaw/issues/7580) — Wait-for-agent-task tool request, no maintainer response yet.
- [#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587) — Cloudflare 403 via WUSRouter, needs triage (possibly provider-side).
- [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) — Heartbeat duplicate-message feedback loop filed Sept 6, high severity, no response yet.
- **PR review backlog:** nine open PRs await maintainer review, including first-time contributions [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590)–[#7593](https://github.com/agentscope-ai/QwenPaw/pull/7593), [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577), [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578), and earlier items [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521), [#7546](https://github.com/agentscope-ai/QwenPaw/pull/7546), [#7547](https://github.com/agentscope-ai/QwenPaw/pull/7547). Merge/review velocity over the next few days will be the key indicator of maintainer capacity and project health.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-07

## 1. Today's Overview
ZeroClaw shows sustained, high-volume activity: **32 issues and 50 PRs were touched in the last 24 hours**, with no new release published. The issue tracker is heavily weighted toward **architecture RFCs entering new revision cycles** (#9487, #9488, #10526, #10076) and a fresh cluster of **Anthropic prompt-cache bugs/features** (#10660, #10662, #10663) filed over the past two days. The PR pipeline remains congested but productive: six PRs merged/closed, with new fixes arriving for the Windows test suite (#10668), Matrix CI (#10650), and RPC stack-overflow hardening (#10654). Overall project health is active-but-backlogged — a large share of top PRs are still marked `blocked`, `do-not-merge`, or `needs-author-action`, and several S1 bugs continue to lack a verified fix.

## 2. Releases
**No new releases in this window.** The v0.8.5 finite weekly stabilization line ([#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)) remains the active milestone tracker; its original intake freeze date (August 4) and weekly-cut schedule through August 30 have passed, and the thread is still being updated — maintainers may want to clarify wrap-up and changelog status.

## 3. Project Progress
Six PRs were merged/closed in the last 24h. Two are visible in the top-activity set:

- **[PR #10650 — `ci(channels/matrix): execute every Matrix lib test, not one module`](https://github.com/zeroclaw-labs/zeroclaw/pull/10650)** — Closed. Fixes a CI blind spot where `channel-matrix` was compiled but its library tests never ran; the workspace's Matrix test gap is now closed.
- **[PR #10487 — `fix(channels/matrix): resolve transcription providers from live config`](https://github.com/zeroclaw-labs/zeroclaw/pull/10487)** — Closed. Matrix now reads typed `[providers.transcription.*]` config at dispatch time instead of a construction-time snapshot, fixing provider registration and routing.

Three issues were also closed:
- **[#9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575)** — OpenAI-compatible warmup now uses `GET /models` instead of an erroneous chat-completions request.
- **[#9653](https://github.com/zeroclaw-labs/zeroclaw/issues/9653)** — Plugin `wasi:http` trust-store gap (bundled webpki roots only) closed as superseded by the destination-policy work (#9395 / PR #9137).
- **[#10572](https://github.com/zeroclaw-labs/zeroclaw/issues/10572)** — "Document the WeCom channel" task closed; WeCom now warrants user docs beyond a label-to-file mapping.

## 4. Community Hot Topics
The most-commented issues are all **long-running architecture and process debates**:

- **[#9487 — RFC: Runtime-owned conversation sessions and transport surface adapters](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** (34 comments, Revision 5) — A material replacement of the Revision 4 vote snapshot; the earlier no-vote does not carry forward, requiring a fresh maintainer discussion window. High-risk core architecture decision.
- **[#9488 — RFC: Unified file and attachment architecture for conversation surfaces](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** (27 comments, Revision 10) — Companion RFC on attachments; same revision/re-vote churn pattern as #9487.
- **[#6996 — RFC: Granular sandbox policy — filesystem restrictions](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** (25 comments) — Open since May 28; addresses drift between application-layer path admission and OS sandbox backends (Bubblewrap/Landlock/Seatbelt).
- **[#7462 — [Bug]: 74 test failures on Windows](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** (19 comments) — A cross-platform quality saga: Unix-only commands, path semantics, and console code-page 936 break the suite on Windows 11 Simplified Chinese.
- **[#8692 — Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** (15 comments) — The central tracker for the very backlog these RFCs feed into.

**Underlying need:** a structural bottleneck in the RFC decision process. The pairing of the new process-simplification RFC ([#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)) with the snapshot/reset friction in #9487/#9488 shows the community is frustrated with mandatory discussion windows and wants voting streamlined — contributors are asking maintainers to spend less time on process and more on substance.

## 5. Bugs & Stability
New and active bugs ranked by severity, with fix status:

**S1 — Workflow blocked**
- **[#10659 (new, S1)](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)** — Budget-exceeded Code/ACP turn loses already-streamed progress after session restore. No fix PR yet. Directly affects the ZeroCode TUI experience.
- **[#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** — Daemon startup/reload stack overflow during Quickstart agent initialization. New **[PR #10654](https://github.com/zeroclaw-labs/zeroclaw/pull/10654)** (fix(runtime): bound RPC dispatch stack usage) appears to be the targeted mitigation; still awaiting repro in `r:needs-repro`.
- **[#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421)** — Incomplete terminal responses can be reported as successful on Anthropic/reliable/compatible providers. Critical trust bug, open with no visible fix PR.
- **[#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)** — Cron agent jobs have **no wall-clock timeout**; in-flight locks clear only at process start. Accepted and in-progress since July 20; no fix PR in the current set.

**P1 / High-risk regressions (new)**
- **[#10617](https://github.com/zeroclaw-labs/zeroclaw/issues/10617)** — `thinking.display = "updates"` returns HTTP 400 on Claude Fable 5.1; the display enum must be narrowed to `summarized`/`omitted`.
- **[#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)** — Runtime profile reports `max_cost_per_day_cents = 4294967295` while the global ledger still rejects at $10.00 — misleading config surfaced to users.
- **[#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)** — OAuth system-prefix cache marker is below Anthropic's cache minimum and consumes one of the four breakpoint slots.

**S2 / Test and UX stability**
- **[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — 74 Windows failures; new **[PR #10668](https://github.com/zeroclaw-labs/zeroclaw/pull/10668)** scopes Windows test selection for package-local `locales/` resources to avoid locale-dependent failures.
- **[#10302](https://github.com/zeroclaw-labs/zeroclaw/issues/10302)** — ZeroCode Code pane stuck in Processing state while browsing history, consuming CPU.
- **[#10645 / #10644](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)** — Accepted P1 follow-ups from #10601: delegated sub-loops don't run under cost-tracking context; background delegate results aren't bound to an owner principal. Both are filed as fixes and await PRs.
- **[#10655](https://github.com/zeroclaw-labs/zeroclaw/pull/10655)** (PR) adds structured `tool_result_truncated` warnings; **[#10664](https://github.com/zeroclaw-labs/zeroclaw/pull/10664)** (PR) sanitizes the public `/health` endpoint to avoid leaking the diagnostic snapshot.

## 6. Feature Requests & Roadmap Signals
The strongest new roadmap signal is **Anthropic prompt-cache optimization**:
- **[#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660)** — Add a third cache breakpoint on the previous turn's last message so turn-boundary misses fall back to history, not the system prompt.
- **[#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)** — Configurable 1-hour prompt-cache TTL for native and passthrough cache markers.

Also active:
- **[#10531](https://github.com/zeroclaw-labs/zeroclaw/issues/10531)** — Expose delegate sub-agent progress (tool receipts, partial output) to the parent agent.
- **[#10426](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)** — User-facing agent progress for the Telegram channel.
- **[#10580](https://github.com/zeroclaw-labs/zeroclaw/issues/10580)** — Repo-wide docs internal-link checking; matching **[PR #10646](https://github.com/zeroclaw-labs/zeroclaw/pull/10646)** is waiting on author action.

Large in-flight feature PRs likely to land in a next minor release once unblocked: **SSE streaming for webhook turns** ([#10450](https://github.com/zeroclaw-labs/zeroclaw/pull/10450)), **same-session message serialization** ([#10411](https://github.com/zeroclaw-labs/zeroclaw/pull/10411)), **storage-aware CLI memory backend** ([#10652](https://github.com/zeroclaw-labs/zeroclaw/pull/10652)), and **Mattermost approval prompts** ([#10358](https://github.com/zeroclaw-labs/zeroclaw/pull/10358)).

Prediction: the next release will likely bundle the **cache-breakpoint/TTL fixes (#10660/#10662/#10663), Windows test remediation (#7462/#10668), and delegate-result ownership/cost fixes (#10644/#10645)** — they are small, high-value, and already have accepted issues or open PRs. The larger RFC-driven rewrites (runtime-owned sessions #9487, file attachments #9488, WASM plugin runtime #10076, session event history #10526) are further out.

## 7. User Feedback Summary
Recurring pain points visible across issues and PRs:

- **Cross-platform and localization exclusion:** Windows users on Simplified Chinese/codepage 936 hit 74 failing tests; CI only ran Linux, letting Unix-only test commands and encoding bugs rot ([#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)). New PR #10668 is a step toward parity, not full parity.
- **Process fatigue around RFCs:** contributors explicitly argue the fixed discussion window "often does not produce more review" and ask for REVISE to immediately halt voting ([#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)); two large RFCs just invalidated their prior votes and were "reset to Revision 5/10" ([#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487), [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)).
- **Lack of agent visibility:** Telegram users see "silence" during long tool calls ([#10426](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)); parent agents are blind until delegates finish ([#10531](https://github.com/zeroclaw-labs/zeroclaw/issues/10531)); ZeroCode can show a phantom `Processing...` pane that burns CPU ([#10302](https://github.com/zeroclaw-labs/zeroclaw/issues/10302)).
- **Budget/lifecycle data loss:** hitting a cost limit mid-turn discards already-streamed assistant text and tool results ([#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)); cost limits shown in profiles do not match actual enforcement, undermining trust ([#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)).
- **Documentation gaps:** WeCom shipped with no user-facing docs ([#10572](https://github.com/zeroclaw-labs/zeroclaw/issues/10572)); pre-existing internal links rot silently because the docs gate only checks added lines ([#10580](https://github.com/zeroclaw-labs/zeroclaw/issues/10580)).

## 8. Backlog Watch
Items needing maintainer attention, sorted by age/risk:

- **[#6932 (May 25)](https://github.com/zeroclaw-labs/zeroclaw/issues/6932)** — Accepted feature: persist gateway WebSocket sessions as full transcripts. Accepted and `no-stale` for 3+ months with no visible implementation.
- **[#6996 (May 28)](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — Filesystem-sandbox RFC, 25 comments, pending maintainer review since the end of May; closest to a decision-ready state and blocking related security-policy work.
- **[#7462 (Jun 10)](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — 74 Windows test failures, accepted/in-progress, now with a partial CI fix in review ([#10668](https://github.com/zeroclaw-labs/zeroclaw/pull/10668)).
- **[#7759 (Jun 16)](https://github.com/zeroclaw-labs/zeroclaw/issues/7759)** — P1: decouple gateway WebSocket lifetime from agent turns (in-progress, accepted). Client-disconnect cancellation is still the default behavior — a major UX/reliability gap.
- **[#9191 (Jul 20)](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)** — S1 cron jobs without wall-clock timeout; accepted but with no PR in flight.
- **[#8692 (Jul 4)](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — The maintainer decision queue itself is still the work-in-progress system; several items above are effectively queued there.

**PRs stranded in review or blocked:**
- **[#9713 (Aug 3)](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)** — Token accounting on history-trim events; XL, `blocked`, `do-not-merge`.
- **[#9739 (Aug 4)](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)** — ZeroCode multi-session panes with agent sidebar; maintainer-updated, still `needs-maintainer-review`.
- **[#10016 (Aug 15)](https://github.com/zeroclaw-labs/zeroclaw/pull/10016)** — Webhook audit correlation by identity; XL, security-relevant, needs maintainer review.
- **[#9997 / #10358 / #10356](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)** — Secure Telegram model picker, Mattermost approvals, and AnySearch provider are all `blocked` + `do-not-merge`; Mattermost and AnySearch have waited since Aug 25.
- **[#9378 (Jul 26)](https://github.com/zeroclaw-labs/zeroclaw/pull/9378)** — ACP failed/cancelled transcript persistence is marked `stale-candidate` and `needs-author-action`; if abandoned, this re-opens a session-durability gap.

The clearest health indicator remains the **concentration of S1/P1 runtime correctness bugs (#9191, #9421, #10230) that are accepted but lack merged fixes** — the project's feature/RFC velocity is outpacing its stability throughput.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*