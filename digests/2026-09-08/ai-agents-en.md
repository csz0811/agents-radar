# OpenClaw Ecosystem Digest 2026-09-08

> Issues: 480 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-07 22:45 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-08

## 1. Today’s Overview

OpenClaw activity is very high: 480 issues and 500 PRs were updated in the last 24 hours, with 241 issues and 236 PRs closing/merging. No new release was cut in this window, so the project is in a consolidation-and-bugfix phase around the current 2026.8.x/2026.9.x line. The most active discussion clusters are core runtime reliability problems: transcript/session-state stalls, SQLite contention, child-process leaks, and channel/multi-agent regressions. Maintainers are actively labeling and triaging issues, but a large share of top issues still carry `clawsweeper:no-new-fix-pr` or `needs-maintainer-review`, indicating a substantial unresolved backlog.

## 2. Releases

No new releases were published in the observed 24-hour window.

## 3. Project Progress

No major feature merge appeared in the top PR set, but there was steady maintainer-driven cleanup and targeted fixes. Seeing the 236 merged/closed PRs, representative examples include:

- [#141618](https://github.com/openclaw/openclaw/pull/141618) — `fix(status): report missing skill requirements`; closes #141606.
- [#141619](https://github.com/openclaw/openclaw/pull/141619) — `fix(state): distinguish slow database validation stages`, improving diagnosis of slow agent-database opens.
- [#141623](https://github.com/openclaw/openclaw/pull/141623) — refactors provider HTTP error normalization to reduce duplicate parsing complexity.
- [#141601](https://github.com/openclaw/openclaw/pull/141601) — `fix(telegram): keep successful album recovery quiet`, fixing noisy error logs after photo-limit recovery.
- [#141311](https://github.com/openclaw/openclaw/pull/141311) — `fix(ui): avoid broken characters in download filenames` with UTF-16-safe truncation.
- [#141622](https://github.com/openclaw/openclaw/pull/141622) — reuses Discord allowlist fixtures in test coverage.
- [#141624](https://github.com/openclaw/openclaw/pull/141624) — preserves unavailable/corrupt plugin update coverage in release tests.
- [#137587](https://github.com/openclaw/openclaw/pull/137587) — isolates the macOS log locator test directory to avoid shared `/tmp` race conditions.

High-value feature/repair PRs are also gathering maintainer review, including:

- [#141562](https://github.com/openclaw/openclaw/pull/141562) — recovery from stale update runs without stopping healthy gateways.
- [#140579](https://github.com/openclaw/openclaw/pull/140579) — preserving authored settings through updates and setup.
- [#140339](https://github.com/openclaw/openclaw/pull/140339) — update checkpoints and interrupted-update recovery.
- [#141628](https://github.com/openclaw/openclaw/pull/141628) — retain `TOOLS.md` as an optional workspace file.

## 4. Community Hot Topics

The most commented and reacted issues reveal a clear focus on reliability under real-world load and channel/multi-agent edge cases:

- [#135111](https://github.com/openclaw/openclaw/issues/135111) — 17 comments  
  Intermittent `Provider completed tool call with malformed JSON arguments` regressed after v2026.8.1 with Claude Sonnet 5. This is actively discussed because it is not tied to a single tool/file, making it hard to reproduce.

- [#115908](https://github.com/openclaw/openclaw/issues/115908) — 16 comments  
  Session transcript projection can livelock under sustained writes, blocking the Node event loop and all channel transports.

- [#97616](https://github.com/openclaw/openclaw/issues/97616) — 15 comments, 1 👍  
  Hook/tool child processes are left unreaped, accumulating zombies and degrading runtime health.

- [#126360](https://github.com/openclaw/openclaw/issues/126360) — 15 comments  
  `AgentSelectionRequiredError` floods logs under explicit multi-agent ownership because logbook, Control UI RPCs, and system-agent turns lack `agentId` targets.

- [#79077](https://github.com/openclaw/openclaw/issues/79077) — 15 comments, 8 👍  
  Telegram guest-bot and bot-to-bot support request. It has the strongest positive reaction among recent issues, suggesting real community demand for Telegram platform parity.

- [#43367](https://github.com/openclaw/openclaw/issues/43367) — 14 comments, 1 👍  
  Multi-agent orchestration remains unreliable: concurrent `agents add` overwrites config, session-lock failures, and detached child work.

- [#74586](https://github.com/openclaw/openclaw/issues/74586) — 14 comments, 3 👍  
  AM embedded runs abort `memory_search` tool calls and classify them as timeouts even after the model completed.

The underlying need across these threads is core stability: event-loop health, session-state correctness, process lifecycle hygiene, multi-agent ownership, and channel-specific delivery guarantees.

## 5. Bugs & Stability

Severity is high overall, with several P0/P1 issues active in the window.

P0 / release-blocker-level:

- [#140908](https://github.com/openclaw/openclaw/issues/140908) — P0, open  
  `doctor --fix` and `gateway status --deep` fail with EACCES under `systemctl --user is-enabled` when run via a systemd user service account. This blocks all post-upgrade migrations. No fix PR is visible yet.

- [#140620](https://github.com/openclaw/openclaw/issues/140620) — P0, open  
  In-place upgrade 2026.7.1-2 → 2026.9.2 imports only 27/~1,500 sessions during transcript reconciliation, then stalls. Pre-upgrade sessions become unfindable.

- [#140497](https://github.com/openclaw/openclaw/issues/140497) — P0, closed  
  Discord setup can accept an application ID as a bot token, mark the channel configured, and never start with `lastError=null`.

- [#138965](https://github.com/openclaw/openclaw/issues/138965) — P0, closed  
  Interrupted transcript rewrite can make stale history the active conversation.

P1 regressions/instability:

- [#140971](https://github.com/openclaw/openclaw/issues/140971) — P1, open  
  All Feishu plugin tools are silently dropped in message-driven runs; host restriction blocks the whole plugin entry. Regression between 2026.7.1-2 and 2026.8.1.

- [#136183](https://github.com/openclaw/openclaw/issues/136183) — P1, open  
  Command executor hangs spawning `ssh` — SIGTERM while waiting for server banner; regression persists in 2026.8.2.

- [#137927](https://github.com/openclaw/openclaw/issues/137927) — P1, open  
  Internal context block leaks into visible Telegram message text, a security/UX issue.

- [#101793](https://github.com/openclaw/openclaw/issues/101793) — P1, open  
  Assistant text preceding a tool call in the same turn is silently dropped on the Signal channel.

- [#121232](https://github.com/openclaw/openclaw/issues/121232) — P1, open  
  `memory-core` dreaming ranker nominates candidates the applier always rejects; nightly reports show `Ranked N, Promoted 0`.

Some notable P1 issues have no visible fix PR, while a few are being addressed through linked PRs — for example the update/status stale-run problem has an open fix in [#141562](https://github.com/openclaw/openclaw/pull/141562).

## 6. Feature Requests & Roadmap Signals

The highest-signal feature requests in the dataset are mostly about channel support, context/memory control, and multi-agent ergonomics:

- [#79077](https://github.com/openclaw/openclaw/issues/79077) — Telegram guest-bot and bot-to-bot communication. Strongly upvoted; likely to return for a platform-parity roadmap.
- [#51441](https://github.com/openclaw/openclaw/issues/51441) — Expose the resolved backend model in `session_status` and agent runtime. Useful for LiteLLM/proxy users.
- [#42276](https://github.com/openclaw/openclaw/issues/42276) — Reasoning-stream-style overwrite output in the terminal. User-facing UX improvement.
- [#45503](https://github.com/openclaw/openclaw/issues/45503) — Manual clearing of large tool results from context, rather than only TTL-based pruning.
- [#137613](https://github.com/openclaw/openclaw/issues/137613) — Enable pre-compaction memory flush on CLI backends; surfaced as a correctness/context-loss issue.
- [#141472](https://github.com/openclaw/openclaw/issues/141472) — Make Workboard card notes/comments clickable for URLs and Markdown links.
- [#126781](https://github.com/openclaw/openclaw/issues/126781) — Detached managed Lobster runs after tool return, though much of this is now covered by `/loop` and TaskFlow.

Open PRs that may land in the next release include config-preservation ([#140579](https://github.com/openclaw/openclaw/pull/140579)), interrupted-update checkpoints ([#140339](https://github.com/openclaw/openclaw/pull/140339)), `TOOLS.md` retention ([#141628](https://github.com/openclaw/openclaw/pull/141628)), and exposing `pause`/`resume` to the `update_goal` tool ([#131467](https://github.com/openclaw/openclaw/pull/131467)).

## 7. User Feedback Summary

User pain points in this window cluster around reliability after upgrades, silent failures, and multi-agent complexity:

- Upgrade pain is prominent. Users report broken gateway restarts, stalled transcript reconciliation, and update-history rows that never finalize.
- Silent failure modes are especially frustrating: Telegram messages dead-lettered after one failed send without retry/alert ([#125764](https://github.com/openclaw/openclaw/issues/125764)); Feishu tools disappearing from agent tool lists ([#140971](https://github.com/openclaw/openclaw/issues/140971)); Discord `/new` not resetting the session but returning “No reply was generated” ([#140535](https://github.com/openclaw/openclaw/issues/140535)).
- Multi-agent users continue to report unsafe concurrent config writes and session ownership confusion ([#43367](https://github.com/openclaw/openclaw/issues/43367), [#126360](https://github.com/openclaw/openclaw/issues/126360)).
- Telegram platform features are actively wanted, with 8 👍 on the guest-bot/bot-to-bot request.
- There is scattered positive signal in reactions to bug reports that affect many users, e.g. 5 👍 on the gateway-restart regression ([#106920](https://github.com/openclaw/openclaw/issues/106920)).

Overall sentiment is engaged but strained: contributors are filing detailed reproductions, while users are waiting on fixes for event-loop stalls, session-state corruption, and channel adapter regressions.

## 8. Backlog Watch

Several important issues remain open for weeks or months and appear stalled in maintainer review/product decisions:

- [#43367](https://github.com/openclaw/openclaw/issues/43367) — open since 2026-03-11; P1 multi-agent orchestration instability, config overwrites, session-lock failures.
- [#51441](https://github.com/openclaw/openclaw/issues/51441) — open since 2026-03-21; P2 feature to expose resolved backend model in session metadata.
- [#74586](https://github.com/openclaw/openclaw/issues/74586) — open since 2026-04-29; P2 AM embedded run aborts `memory_search`, misclassified as timeout.
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — open since 2026-06-29; P1 zombie process accumulation from hook/tool children.
- [#115908](https://github.com/openclaw/openclaw/issues/115908) — open since 2026-07-29; P1 transcript projection livelock blocking the main thread.
- [#117262](https://github.com/openclaw/openclaw/issues/117262) — open since 2026-08-01; P1 SQLite 3-writer contention causing ~33s event-loop stalls.
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — open since 2026-08-05; P1 synchronous agent persistence blocks the Gateway event loop at scale.
- [#126874](https://github.com/openclaw/openclaw/issues/126874) — open since 2026-08-20; P2 Windows CI runs only 66 of 10,979 test files.

These are the issues most likely to need maintainer attention next: they are recurring sources of performance degradation, data-loss risk, or platform reliability complaints.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report: Open-Source Personal AI Assistant & Agent Ecosystem
**Data window:** 2026-09-07 to 2026-09-08 · Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The open-source personal AI assistant landscape is consolidating around a shared architectural pattern: a persistent gateway daemon routes messages between chat channels, agent runtimes, memory subsystems, and model providers. All five major projects are spending more engineering effort on transcript integrity, SQLite/state-db concurrency, multi-agent ownership semantics, and channel delivery guarantees than on new model-facing features — evidence that the market has shifted from demo capability to production trust. A second structural trend is fragmentation by deployment philosophy: OpenClaw, Hermes, ZeroClaw, and IronClaw target self-hosted power users and team workflows with channel-first gateways, while QwenPaw differentiates through long-term memory research and deep Chinese-market/LLM-stack integration. Notably, all projects show the same failure signature this week — silent data loss, duplicate or dropped turns, and upgrade/migration breakage — suggesting the industry's next competitive frontier is durable, observable conversation state.

---

## 2. Activity Comparison

*Health score (0–10) = composite of update throughput, close/merge ratio, open severity, and maintainer responsiveness observed in the window.*

| Project | Issues updated (closed) | PRs updated (merged/closed) | Release this window | Health score | Key health signals |
|---|---|---|---|---|---|
| **OpenClaw** | 480 (241) | 500 (236) | None (2026.8.x/9.x line) | 6.0 | Massive throughput, but P0 upgrade blockers open (#140908, #140620) and heavy `needs-maintainer-review` backlog |
| **Hermes Agent** | 50 (8) | 50 (5) | **v0.21.1 / v2026.9.7** | 7.0 | Shipped patch; closed security-relevant issues (approvals bypass, duplicate persistence); integration automation still blocked (#88584) |
| **IronClaw** | 1 (0) | 5 (0) | None | 6.0 | Very quiet; zero merges; WebUI polish PRs in review; no visible regressions |
| **QwenPaw** | 39 (16) | 48 (18) | None (v2.2.0 line) | 6.5 | Fast triage and healthy first-time-contributor pipeline; core context-loss issue (#7579) still has no fix PR |
| **ZeroClaw** | 30 (3) | 50 (5) | None (v0.8.5 line) | 6.5 | Excellent maintainer responsiveness; S0/S1 persistence family (#10121, #9333) partially addressed by open PR #10197 |

**Takeaway:** OpenClaw's raw volume is roughly an order of magnitude above every peer, but its unresolved-P0 count and stale-issue backlog are also the highest. Hermes is the only project shipping tagged releases on a visible cadence.

---

## 3. OpenClaw's Position

**Advantages vs. peers**

- **Scale and reach:** 480 issues and 500 PRs updated in 24 hours versus 30–50 for the next tier. As the designated core reference implementation, OpenClaw functions as the ecosystem's early-warning system — session-state, event-loop, and channel-adapter bugs first surface there before appearing in derivative and adjacent projects.
- **Channel breadth:** No peer matches its transport coverage (Telegram, Discord, Signal, Feishu, plus guest-bot and bot-to-bot demand). It is the default "connect everything" gateway.
- **Multi-agent maturity:** Multi-agent orchestration is first-class, even though concurrent config writes and ownership routing remain unstable (#43367, #126360).
- **Third-party contributor funnel:** The project absorbs 236 merged/closed PRs per day — a contributor and review machine no competitor currently approaches.

**Technical approach differences**

- OpenClaw's runtime is Node.js-centric; its most serious reliability issues are event-loop stalls caused by synchronous transcript projection and agent persistence (#115908, #119720). Peers on other runtimes (e.g., ZeroClaw on Rust/Tokio) do not exhibit this class of main-thread blockage.
- Stability work is concentrated on async offloading, SQLite contention mitigation, and provider HTTP normalization — i.e., hardening the gateway core rather than adding agent capabilities.
- Backlog hygiene is the weakest among peers: top issues frequently carry `clawsweeper:no-new-fix-pr` or `needs-maintainer-review`, and P0 post-upgrade migration failures (#140908, #140620) have no visible fix PRs. If these remain open another cycle, they will undermine the project's reference status.

---

## 4. Shared Technical Focus Areas

Requirements emerging independently across multiple projects:

| Focus area | Projects | Specific evidence |
|---|---|---|
| **Transcript & session-state integrity** | All | OpenClaw #115908 (projection livelock), Hermes #104653 (duplicate persistence), QwenPaw #7579 (assistant replies dropped from context), ZeroClaw #10121/#9333/#10673 (partial/failed turns disappearing) |
| **SQLite/state-db concurrency & lock safety** | OpenClaw, Hermes, QwenPaw | OpenClaw #117262 (3-writer stalls), Hermes #102589 (raw open drops POSIX locks) + fail-closed PR #105101; QwenPaw coordinator `_drain()` swallowing exceptions |
| **Task lifecycle serialization** | OpenClaw, QwenPaw, ZeroClaw | QwenPaw #7559 (409 instead of queueing), #7567 (stop doesn't stop); ZeroClaw #10408 (parallel run on second message); OpenClaw #43367 (concurrent `agents add` overwrites) |
| **Provider/API normalization & custom-provider config** | OpenClaw, QwenPaw, Hermes | OpenClaw #135111 (malformed tool-call JSON); QwenPaw #7576 (hardcoded 32K context fallback), #7587 (Cloudflare challenge); Hermes #105371/#105384 (custom-provider timeout/API-key gaps) |
| **Platform/channel parity** | OpenClaw, ZeroClaw, QwenPaw | Telegram guest bots (OpenClaw #79077), Telegram voice/STT (ZeroClaw #10688/#10689), Feishu tools dropped (OpenClaw #140971), Discord setup validation (OpenClaw #140497) |
| **Approval gates & safety-scanner correctness** | Hermes, ZeroClaw, QwenPaw | Hermes #104308 (approvals.deny bypass), #39609 (blocked Kanban auto-promotes), #92478 (scanner false positives); ZeroClaw #10606 (health-endpoint sanitization) |
| **Upgrade & migration reliability** | OpenClaw, Hermes, QwenPaw | OpenClaw #140908/#140620; Hermes #105228 (profile errors after Desktop update); QwenPaw v2.2.0 regression wave (path input, idle timeout, context fallback) |
| **Prompt-cache economics & cost transparency** | ZeroClaw, OpenClaw | ZeroClaw cache-breakpoint cluster (#10660–#10702); OpenClaw #137613 (pre-compaction memory flush) |

**The clearest cross-project demand:** *conversation runs must be serialized, durable, and crash-safe* — no duplicate replies, no lost streamed progress, no swallowed tool exceptions. Every project is actively hiring engineering effort into this problem.

---

## 5. Differentiation Analysis

| Project | Target user | Core value proposition | Technical/architecture markers | Stage |
|---|---|---|---|---|
| **OpenClaw** | Self-hosters, channel-centric power users, multi-agent deployments | Broadcast channel gateway + agent runtime, largest ecosystem | Node.js gateway, plugin adapters, transcript projection, heavy async-offload work | Consolidation (2026.9.x) |
| **Hermes Agent** | Teams requiring governance; Desktop/TUI users | Safety-first agent operations: approvals, gates, scanners, fleet profiles, cron/Kanban | Multi-profile gateway, Desktop app, state-db with POSIX locking, security scanner pipeline | Stabilization with release cadence (v0.21.x) |
| **IronClaw** | Slack/team assistant users | Polished assistant experience on shared channels; WebUI command UX | OpenAI-compatible surfaces, assistant/shared-channel adapter, benchmark-driven quality tracking (daily failure taxonomy) | Quiet maintenance |
| **QwenPaw** | Memory-intensive agent builders; Chinese-market LLM/providers | Long-term memory research (ADBPG, PowerContext, ReMe, OpenViking), mobile/console UX | Python-based (Agentscope lineage), memory-backend pluginization, MCP tooling, strong Console test investment | Expanding (v2.2.0, memory refactor on `main`) |
| **ZeroClaw** | Developers running Code/ACP and CLI-embedded agent sessions | Durable Code/ACP session semantics, prompt-cache correctness, low-level runtime discipline | Rust/Tokio runtime (stack-overflow and worker-abort reports), channel STT/TTS, ZeroCode UI, cache breakpoints | Pre-1.0 hardening (v0.8.5) |

**Architecture summary:** OpenClaw wins on breadth; QwenPaw wins on memory depth; ZeroClaw wins on low-level session discipline and cache economics; Hermes wins on governance; IronClaw occupies the narrow, polished Slack/WebUI niche.

---

## 6. Community Momentum & Maturity

**Tier 1 — High-velocity, high-strain (OpenClaw).** Unmatched contributor throughput with 236 PRs merged/closed daily, but the volume of open severity and `needs-maintainer-review` items indicates the review pipeline is near capacity. Risk: P0 upgrade blockers persisting across multiple patch lines.

**Tier 2 — Rapid iteration with healthy signals (QwenPaw, ZeroClaw).** QwenPaw is absorbing large architectural PRs (memory refactor #7561, CI release guards) plus a wave of first-time contributors (BiDi rendering, Computer Use restart, OpenViking memory backend) — the strongest positive contributor trend in this dataset. ZeroClaw shows the best maintainer-response behavior: same-day closes, maintainers merging master into contributor branches, and detailed severity/risk labeling on new issues. Both are blocked by critical open data-integrity bugs that must land before the next release.

**Tier 3 — Stabilizing with cadence (Hermes).** Hermes shipped a patch release, closed meaningful state and approval-gate bugs, and is methodically hardening SQLite and custom-provider paths. Its most visible drag is internal: the 75-comment Nous-to-Enterkey automation blocker (#88584) and slow movement on well-scoped PRs like `model.picker_explicit_only` (#65149, open ~2 months).

**Tier 4 — Quiet maintenance (IronClaw).** Low issue traffic, zero merged PRs in the window, and no release. Not unhealthy — simply a smaller team iterating on WebUI polish. The recurring daily benchmark-taxonomy issues suggest internal quality tooling rather than community-driven development.

---

## 7. Trend Signals

1. **Transcript integrity is the new benchmark.** Users across all projects punish lost context, dropped assistant messages, and duplicate turns more severely than model quality gaps. Expect "durable session" to become a marketed differentiator.
2. **Silent failures are the top UX enemy.** Dead-lettered Telegram messages, silently dropped Feishu tools, and stop-buttons that don't stop generate the most frustrated feedback. Users prefer a visible error over a quiet wrong state.
3. **Multi-agent determinism is a prerequisite, not a feature.** Queue semantics for inbound messages, ownership IDs on every internal RPC, and safe concurrent config writes are recurring demands from OpenClaw, QwenPaw, and ZeroClaw users running real multi-agent deployments.
4. **Prompt-cache economics are becoming a cost-transparency issue.** ZeroClaw's cluster of cache-breakpoint, TTL, trimming-hysteresis, and cost-ledger bugs shows that as agents grow longer context, users demand control over cache placement and accurate cost accounting. This will spread to other projects.
5. **BYO-provider friction is the adoption bottleneck.** Hardcoded context fallbacks, missing timeout/API-key forwarding, Cloudflare challenges on OpenAI-compatible proxies, and cloud reasoning-model timeout floors all punish self-hosted and Chinese-market users. Provider configuration UX is a competitive surface.
6. **Voice and multimodal channel expectations are rising.** WhatsApp voice transcription, Telegram TTS edge cases, and tool-returned image/PDF binaries failing provider validation indicate that channel adapters must now handle multimodal payloads end-to-end.
7. **Security is shifting from model guardrails to operational gates.** Approval-deny bypasses, Kanban auto-promotion, self-fabricated steer-markers, and health-endpoint information leaks show that trust must be enforced in workflow state machines, not just prompts. Scanner false positives (flagging skills that refuse to read secrets) reveal the next problem: behavior-based rather than literal-based security scoring.
8. **The community itself is becoming AI-assisted.** QwenPaw received a bilingual AI-generated bug report; IronClaw runs automated daily failure taxonomies; ZeroClaw maintainers auto-label severity/risk on arrival. Project maintainers should plan tooling expectations accordingly.
9. **First-time-contributor health is the best leading indicator.** QwenPaw's influx of quality external PRs correlates with active maintainer engagement; OpenClaw's contributor machine remains strong but its stale-label backlog is a warning sign; IronClaw's near-zero external contribution suggests limited community pull.

**Bottom line for decision-makers:** If you need channel breadth and ecosystem leverage, OpenClaw remains the default but carries upgrade-migration risk. If you need governance and approval controls, Hermes is the most mature. If your workloads are Code/ACP or cache-sensitive long sessions, ZeroClaw is the one to watch once its S0 persistence fixes land. If your differentiator is long-term memory — or you serve Chinese-market models — QwenPaw has the most active roadmap. And if you need a dependable Slack/WebUI assistant without churn, IronClaw is stable but slow.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-08

## 1. Today's Overview

Hermes Agent is in an active maintenance-and-hardening cycle: 50 issues were updated in the last 24 hours (42 open, 8 closed), and 50 PRs were updated (45 open, 5 merged/closed). One patch release, **v2026.9.7 / v0.21.1**, was published on September 7. The most visible work is around session-state integrity, SQLite/state-db safety, cron and Kanban reliability, desktop/TUI regressions, and custom-provider configuration handling. With a high open-PR count and many recently reported P1/P2 bugs, the project appears to be prioritizing stabilization and security follow-through over new features.

## 2. Releases

### Hermes Agent v0.21.1 (v2026.9.7) — September 7, 2026

- **Tag:** `v2026.9.7`
- **Type:** Patch release / main roll-up
- **Measured commit:** `6178e9f4eed8d99f4fc550add939d58c7bed6206`
- **Purpose:** Rolls up current `main` since v0.21.0 for tagged deployments and downstream consumers.

The release notes do not include explicit breaking-change or migration notes in the provided snippet. This appears to be a stabilization release carrying accumulated fixes from `main`; consumers on v0.21.0 should validate their deployments against this tag.

---

## 3. Project Progress

The snapshot does not enumerate the five merged/closed PRs, but the eight closed issues indicate meaningful bug-queue cleanup:

- **#101147** — Sealed venvs missed `hermes_state_registry`, causing unusable `state.db` and silently unindexed sessions. *Closed.*  
  https://github.com/NousResearch/hermes-agent/issues/101147
- **#104653** — P1: inbound user turns persisted twice by gateway + agent flush, causing duplicated messages on history rehydration. *Closed.*  
  https://github.com/NousResearch/hermes-agent/issues/104653
- **#104308** — `approvals.deny` documented as “never bypassable” but bypassable via a path rewrite. *Closed.*  
  https://github.com/NousResearch/hermes-agent/issues/104308
- **#98680** — Desktop keep-alive transcript ticks flashed the composer and stole focus. *Closed.*  
  https://github.com/NousResearch/hermes-agent/issues/98680
- **#46152** — `terminal.env_passthrough` did not work with the local backend when variables existed only in `.env`. *Closed.*  
  https://github.com/NousResearch/hermes-agent/issues/46152
- **#96070** — Async-delegation completion notifications were silently dropped for raw sessions. *Closed.*  
  https://github.com/NousResearch/hermes-agent/issues/96070
- **#85575** — Kanban cards created by dispatcher-spawned sessions inherited ephemeral session notification targets. *Closed.*  
  https://github.com/NousResearch/hermes-agent/issues/85575
- **#57645** — Desktop in-app update on macOS closed without actually updating. *Closed.*  
  https://github.com/NousResearch/hermes-agent/issues/57645

Notable open PRs also advanced fixes in important areas:

- **#105101** — Fail closed for vulnerable SQLite `state.db` writers exposed to WAL-reset corruption.  
  https://github.com/NousResearch/hermes-agent/pull/105101
- **#105144** — Unify manual cron-run execution semantics across CLI, tool, background delegation, and API paths.  
  https://github.com/NousResearch/hermes-agent/pull/105144
- **#102411** — P0 fix for row-addressed `api_content` backfill for pre-persisted user turns, addressing prompt-cache misses in persistent CLI sessions.  
  https://github.com/NousResearch/hermes-agent/pull/102411
- **#105380** — Fix named custom-provider configuration key resolution.  
  https://github.com/NousResearch/hermes-agent/pull/105380
- **#105392** — Report pending delegation work when agent turns end.  
  https://github.com/NousResearch/hermes-agent/pull/105392

---

## 4. Community Hot Topics

The most active discussion is around automation blockers, approval-gate integrity, and security-scanning false positives.

- **#88584 — Automated Nous integration blocked** (75 comments)  
  The scheduled Nous-to-Enterkey merge is blocked by conflicts in `cron/jobs.py`, and the dashboard updater remains on the last tested Enterkey release. This is the highest-activity item in the repository and signals an ongoing release/integration bottleneck.  
  https://github.com/NousResearch/hermes-agent/issues/88584

- **#39609 — Kanban tasks created with `--initial-status blocked` auto-promote to `ready` with no actor** (12 comments, 1 👍)  
  This bypasses the human approval gate and is a strong trust/safety concern for teams using Kanban-driven agent workflows.  
  https://github.com/NousResearch/hermes-agent/issues/39609

- **#96532 — Allow hiding the app-managed “This device” gateway from the fleet profile rail** (5 comments, 2 👍)  
  Users with remote-gateway-only Desktop setups want a cleaner device profile without an unused local runtime entry.  
  https://github.com/NousResearch/hermes-agent/issues/96532

- **#92478 — `skills_guard` flags a skill’s own denylist as `ssh_backdoor` / `aws_dir_access`** (4 comments)  
  Skills that explicitly refuse to read secrets are being quarantined as threats. Underlying need: security scanners should score behavior, not string literals.  
  https://github.com/NousResearch/hermes-agent/issues/92478

- **#84672 — Content scanners flag security documentation as attacks** (4 comments)  
  Cron prompt scanner and skills guard share a root cause: they penalize accurate descriptions of dangerous actions rather than actual dangerous behavior.  
  https://github.com/NousResearch/hermes-agent/issues/84672

---

## 5. Bugs & Stability

Bug reports in the last 24 hours were weighted toward session-state failures, Cron/Kanban state corruption, and Desktop/TUI regressions.

### High severity / high impact

- **P1 — Multiplexed gateway starves non-default profiles of MCP servers** (#105396)  
  Scope-tagging is tied to name-keyed discovery; `/reload-mcp` on non-default profiles reports “No MCP servers connected.”  
  https://github.com/NousResearch/hermes-agent/issues/105396

- **P1 — Cron/lifecycle_guard raw-opens `state.db`, dropping gateway POSIX locks → WAL split-brain** (#102589)  
  A terminal command mentioning the state-db path can close the gateway’s locks from inside the gateway process. This is a serious integrity risk.  
  https://github.com/NousResearch/hermes-agent/issues/102589

- **P1 — Errors in new and existing sessions in the default profile after updating Desktop** (#105228)  
  Includes “Profile '.hermes' does not exist” in the default profile only; other profiles are unaffected.  
  https://github.com/NousResearch/hermes-agent/issues/105228

- **P1 — Inbound user turns persisted twice** (#104653, closed)  
  One row has `platform_message_id`, the other is NULL; both remain active, so models see duplicate user messages.  
  https://github.com/NousResearch/hermes-agent/issues/104653

### Security and approval-integrity bugs

- **#104308 — `approvals.deny` bypassable via path rewrite** (*closed*, but security-relevant)  
  https://github.com/NousResearch/hermes-agent/issues/104308
- **#81828 — Steer-marker can be self-fabricated by the model**, opening a prompt-injection channel.  
  https://github.com/NousResearch/hermes-agent/issues/81828
- **#39609 — `blocked` Kanban tasks auto-promote to `ready` with no recorded actor**, bypassing human approval.  
  https://github.com/NousResearch/hermes-agent/issues/39609

### Configuration / provider bugs

- **#105371 — Named custom providers ignore `providers.<name>.timeout` settings** because runtime lookup uses `providers["custom"]`. A fix is in PR #105380.  
  https://github.com/NousResearch/hermes-agent/issues/105371  
  https://github.com/NousResearch/hermes-agent/pull/105380
- **#105384 — Custom-provider API keys are not forwarded to endpoint probes** (fix PR open).  
  https://github.com/NousResearch/hermes-agent/pull/105384
- **#104402 — Reasoning-model stale-timeout floor suppresses the local-endpoint disarm**, harming long prefills on self-hosted models.  
  https://github.com/NousResearch/hermes-agent/issues/104402
- **#105367 — Embedded Hindsight provider rewrites `profiles/hermes.env` on every daemon start**, wiping user-set env vars.  
  https://github.com/NousResearch/hermes-agent/issues/105367

### Desktop / TUI regressions

- **#105186 — TUI gateway crash: `Profile 'hermes' does not exist`** in `_session_info`.  
  https://github.com/NousResearch/hermes-agent/issues/105186
- **#98680 — Desktop keep-alive ticks flash composer and steal focus** (closed).  
  https://github.com/NousResearch/hermes-agent/issues/98680
- **#57645 — macOS in-app update closes without installing** (closed).  
  https://github.com/NousResearch/hermes-agent/issues/57645

### Relevant fix PRs in flight

- **#105101** — Fail closed for vulnerable SQLite state-db writers.  
  https://github.com/NousResearch/hermes-agent/pull/105101
- **#102411** — P0 prompt-cache/backfill fix for pre-persisted user turns.  
  https://github.com/NousResearch/hermes-agent/pull/102411
- **#105403** — Allow delayed Codex `turn/start` acknowledgements instead of retiring conversations at 10s.  
  https://github.com/NousResearch/hermes-agent/pull/105403
- **#105144** — Manual cron-run semantic unification.  
  https://github.com/NousResearch/hermes-agent/pull/105144

---

## 6. Feature Requests & Roadmap Signals

Several feature requests point toward better **configuration control**, **self-hosted provider support**, and **safer multi-profile Desktop/gateway behavior**.

- **#96532 — Hide the app-managed “This device” gateway when using a remote gateway**  
  Likely relevant to upcoming Desktop fleet/profile polish.  
  https://github.com/NousResearch/hermes-agent/issues/96532

- **PR #65149 — Add `model.picker_explicit_only` config flag**  
  Addresses a common user complaint: the `/model` picker lists the full provider universe even when users have no API key. This is a strong candidate for a future minor release.  
  https://github.com/NousResearch/hermes-agent/pull/65149

- **PR #96933 / duplicate issue #105235 — Make streaming-TTS first-sentence threshold configurable**  
  Multiple users want short opening sentences like “Yes.” / “Sure.” emitted without waiting for steady-state batching. The duplicate issue suggests real demand.  
  https://github.com/NousResearch/hermes-agent/pull/96933  
  https://github.com/NousResearch/hermes-agent/issues/105235

- **PR #94266 — Hermes Collective Wisdom Agent V1**  
  Large feature PR for community-driven skill/wisdom contribution and installation. This is a significant roadmap signal toward a plugin/ecosystem layer.  
  https://github.com/NousResearch/hermes-agent/pull/94266

- **PR #104038 — Gate streamed responses before delivery**  
  Opt-in pre-delivery enforcement boundary between agent output and platform delivery. Likely intended for enterprise/safety use cases.  
  https://github.com/NousResearch/hermes-agent/pull/104038

- **PR #104562 — Make memory-prefetch timeout configurable and keep late results**  
  Improves resilience for hosted/memory providers that exceed hard timeouts.  
  https://github.com/NousResearch/hermes-agent/pull/104562

- **PR #105221 — Add read-only cron execution receipts**  
  Introduces an authenticated, content-free cron execution receipt endpoint for external observers.  
  https://github.com/NousResearch/hermes-agent/pull/105221

---

## 7. User Feedback Summary

User feedback in this window is dominated by **stability, safety, and configuration friction**.

- **Approval and security trust are recurring pain points.**  
  Users are concerned about approval bypasses (e.g., #39609, #104308) and prompt-injection surface (#81828). These issues are more about trust in autonomous operation than simple convenience.

- **Safety scanners are generating false positives that punish good actors.**  
  Skills that explicitly refuse to read secrets are flagged as backdoor/credential-access risks (#92478). Security documentation is being penalized by content scanners (#84672). This is likely to frustrate security-conscious users and skill authors.

- **Self-hosted and custom-provider users are hitting configuration gaps.**  
  Named custom providers ignore timeout config (#105371), custom-provider keys are missing from probes (#105384), and self-hosted local endpoints inherit cloud reasoning-model timeout floors (#104402). These issues suggest Hermes’s custom-provider story still needs polish.

- **Session-state bugs are the most alarming for daily users.**  
  Duplicate inbound message persistence (#104653), SQLite lock-dropping (#102589), and profile-specific init failures (#105228, #105186) undermine confidence in conversation durability, especially after upgrades.

- **Desktop users continue to report UX regressions.**  
  Focus-stealing flashes (#98680), broken macOS in-app updates (#57645), and per-profile desktop errors (#105228) are visible quality issues.

Overall, sentiment appears mixed: users are actively deploying Hermes in sophisticated multi-profile/gateway/self-hosted environments, but they expect stricter guardrails, fewer state-integrity bugs, and cleaner configuration behavior.

---

## 8. Backlog Watch

These items are important, still open, and appear to need maintainer attention:

- **#88584 — Automated Nous integration blocked** (created Aug 17, 75 comments)  
  Long-running process/automation blocker with high community visibility and no clear resolution in the snapshot.  
  https://github.com/NousResearch/hermes-agent/issues/88584

- **#39609 — `blocked` Kanban tasks auto-promote and bypass approval gate** (created Jun 5, open ~3 months)  
  A P2 issue with direct workflow safety impact and no confirmed fix PR linked.  
  https://github.com/NousResearch/hermes-agent/issues/39609

- **#102589 — Cron/lifecycle_guard raw-opens `state.db` and drops gateway POSIX locks** (created Sep 4, P1)  
  Serious state-corruption risk; a related fail-closed PR (#105101) exists but the issue remains open.  
  https://github.com/NousResearch/hermes-agent/issues/102589

- **#92478 — `skills_guard` quarantines skills that refuse to read secrets** (created Aug 22)  
  Root-cause bug in skills-security scoring. Needs maintainer design decision on matching behavior vs. mention.  
  https://github.com/NousResearch/hermes-agent/issues/92478

- **#84672 — Content scanners flag security documentation as attacks** (created Aug 12)  
  Similar root cause to #92478; likely deserves a shared security-scanning fix.  
  https://github.com/NousResearch/hermes-agent/issues/84672

- **#81828 — Steer-marker can be self-fabricated by the model** (created Aug 8)  
  Open security/prompt-injection issue with no obvious fix yet.  
  https://github.com/NousResearch/hermes-agent/issues/81828

- **#90451 — Plugin installer rejects `manifest_version: 2` even though the loader supports it** (created Aug 20)  
  Installer/loader disagreement; blocks v2 plugins from being installed.  
  https://github.com/NousResearch/hermes-agent/issues/90451

- **PR #65149 — `model.picker_explicit_only` flag** (created Jul 15)  
  Open for nearly two months; a well-scoped UX/config improvement that maintainers have not yet moved forward.  
  https://github.com/NousResearch/hermes-agent/pull/65149

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-08

## Today's Overview
Low-to-moderate activity over the last 24 hours: 1 open issue and 5 open PRs were updated, while no PRs were merged/closed and no releases were published. The current focus is clearly on WebUI command-result polish and slash-command usability, with an additional open PR addressing assistant/shared-channel behavior. All PRs remain open, suggesting the project is actively iterating but has not shipped code in this window. Benchmark failure tracking also continues with a new daily failure-taxonomy issue.

## Releases
No new releases were published in this period.

## Project Progress
No PRs were merged or closed in the last 24 hours.

Active open PRs that advanced or remained in review:

- [#8076 fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)  
  Distinguishes a paired user's disconnected shared channel from an unpaired account, adds channel-specific guidance, and keeps rejection classification consistent across product, adapter, and OpenAI-compatible surfaces.

- [#8071 fix(webui): preserve command result card height](https://github.com/nearai/ironclaw/pull/8071)  
  Prevents command-result cards, inline command notices, and denial results from shrinking inside the transcript; keeps scrolling on the outer message viewport.

- [#8070 fix(webui): align slash-command metadata](https://github.com/nearai/ironclaw/pull/8070)  
  Switches slash-command rows to a consistent responsive grid, improves desktop alignment, and handles narrow-screen stacking.

- [#8069 fix(webui): add dismiss actions to command result cards](https://github.com/nearai/ironclaw/pull/8069)  
  Adds dismissal to success, command-list, fallback, and denial command results, while preserving durable chat messages.

- [#8068 fix(webui): keep the active slash command visible](https://github.com/nearai/ironclaw/pull/8068)  
  Ensures selected slash commands remain visible during keyboard and pointer navigation, with regression test coverage.

## Community Hot Topics
No comments or reaction counts were recorded on the issues/PRs in this window, so there is no visible community discussion to analyze. The most recently updated items are the daily failure taxonomy issue [#8081](https://github.com/nearai/ironclaw/issues/8081) and the 5 open PRs above.

The clustering of WebUI PRs indicates strong maintainer focus on command-result usability: preventing layout collapse, adding dismiss actions, and improving slash-command navigation. These are likely responses to internal UX testing or prior bug reports rather than user-thread reactions in this snapshot.

## Bugs & Stability
No new merged bug fixes. Ranked by likely impact:

1. **[#8081 Daily ironclaw failure taxonomy — 2026-09-07](https://github.com/nearai/ironclaw/issues/8081)**  
   Reports 42 non-pass cases in the `officeqa` suite, described as “overwhelmingly genuine model-quality numeric errors” in an excerpt. This appears to be a benchmark/model quality signal rather than a confirmed IronClaw regression, but it remains the only open issue and has no linked fix PR yet.

2. **[#8076 fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)**  
   Addresses a functional assistant/adapter issue where disconnected shared channels may be misclassified as unpaired accounts. Fix is open but unmerged.

3. **WebUI usability bugs/limitations (all with open fix PRs)**  
   - [#8071](https://github.com/nearai/ironclaw/pull/8071): command-result card height collapse  
   - [#8069](https://github.com/nearai/ironclaw/pull/8069): missing dismiss actions for command results  
   - [#8068](https://github.com/nearai/ironclaw/pull/8068): selected slash command can fall outside the visible menu area  
   - [#8070](https://github.com/nearai/ironclaw/pull/8070): inconsistent slash-command metadata alignment

## Feature Requests & Roadmap Signals
No explicit user feature requests were present in the issue data. However, the open PRs signal likely roadmap direction:

- Ephemeral/dismissible command results in the WebUI (#8069)
- Improved slash-command menu usability and layout stability (#8068, #8070, #8071)
- Richer shared-channel disconnect handling in the assistant/Slack surface (#8076)

If these PRs progress through review, the next IronClaw release will likely contain a WebUI command-result polish batch plus shared-channel assistant improvements.

## User Feedback Summary
Direct user feedback is essentially absent from this snapshot: no issue comments, PR comments, or 👍 reactions were reported. The only indirect signal is the daily benchmark issue [#8081](https://github.com/nearai/ironclaw/issues/8081), which identifies model-quality numeric failures in `officeqa`. No satisfaction or dissatisfaction trends can be inferred from this data window.

## Backlog Watch
No long-unanswered issues or stale PRs were detected in this snapshot. The oldest open PRs are from 2026-09-04 and were updated on 2026-09-07, so they remain under active revision/review. #8081 has no comments yet but was only opened on 2026-09-07; it may warrant maintainer follow-up if it continues to be opened daily.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-08

## 1. Today's Overview

QwenPaw (github.com/agentscope-ai/QwenPaw) saw intense activity over the last 24 hours, with 39 Issues and 48 Pull Requests updated. Of these, 16 issues and 18 PRs moved out of open state, indicating active triage and review rather than just reporting. No new release was published in this window, so the project is operating on the v2.2.0 line while a stream of regression and robustness fixes accumulates on `main`. Day-over-day activity is dominated by three themes: **memory/conversation context corruption**, **provider-API incompatibilities**, and **console/desktop UX regressions introduced around v2.2.0**. A notable positive signal is the number of high-quality first-time-contributor PRs landing this week (BiDi rendering fix, Computer Use helper restart, OpenViking memory backend, coordinator exception logging), suggesting a healthy and growing contributor community.

## 2. Releases

**None.** The data set reports 0 new releases in the window, and no release candidate or beta artifacts are visible. The latest published version therefore remains v2.2.0, against which several open bugs are still being reported (see Bugs & Stability).

## 3. Project Progress

The following PRs left open state during the window (closed/merged). Visible closed items are concentrated in memory architecture, provider correctness, and frontend hardening:

- **[PR #7561 — refactor(memory): unify automatic memory lifecycle and actions](https://github.com/agentscope-ai/QwenPaw/pull/7561)** — A deliberately breaking refactor of the memory-manager contract, unifying automatic memory capture, recall, background execution, and backend actions. This is a major architectural step and likely a precursor for the next minor release.
- **[PR #6936 — fix(providers): coerce string-typed tool args emitted as JSON numbers](https://github.com/agentscope-ai/QwenPaw/pull/6936)** — Fixes the long-reported MCP bug where models emit unquoted numbers/booleans for schema-declared string fields (see issue #6839). This unblocks real-world Chinese-market brokerage/data MCP tools.
- **[PR #7499 — fix(console): unify nav and theme-toggle icons with Spark line series](https://github.com/agentscope-ai/QwenPaw/pull/7499)** — Visual consistency fix for the console sidebar.
- **[PR #7530 — test(console): expand console unit tests (+245 cases, +5.02pp statement coverage)](https://github.com/agentscope-ai/QwenPaw/pull/7530)** — Fourth frontend coverage sprint; good evidence of ongoing quality investment in the Console.
- **[PR #7603 — ci: freeze default-branch merges during releases](https://github.com/agentscope-ai/QwenPaw/pull/7603)** — Process/CI guard to prevent the v2.2.0-beta.4 incident where a PR was merged mid-release.

**In-flight highlights still open:** [PR #7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) completes the memory-backend plugin migration by extracting ADBPG and PowerContext from core; [PR #7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) routes chat submissions through the queue (directly addressing the 409 bug, issue #7559); [PR #7521](https://github.com/agentscope-ai/QwenPaw/pull/7521) prevents long-running agents from replaying consumed thinking content.

## 4. Community Hot Topics

The most active discussions reflect real deployment pain rather than speculative questions.

- **[Issue #7505 — LAN LLM server "client disconnect" retry/timeout loop (closed, 12 comments)](https://github.com/agentscope-ai/QwenPaw/issues/7505)** — Most-commented issue of the window. A user running QwenPaw against a local-network LM Studio server (qwen3.8-flash-next-q3) saw repeated `client disconnect` failures that eventually timeout. The problem was acknowledged and closed, but it highlights that LAN/self-hosted users are a significant and sensitive segment.
- **[Issue #7576 — RetryChatModel hardcoded 32768 context fallback (open, 5 comments)](https://github.com/agentscope-ai/QwenPaw/issues/7576)** — Confirmed across v2.1.0→v2.2.0: hardcoded `context_size=32768` fallback causes `CONTEXT_UNFIT` errors above ~31,130 tokens for models whose context is set differently. This is an especially visible issue because it silently misconfigures all model providers that do not explicitly declare context size.
- **[Issue #7579 / #7584 — Model replies lost from context, causing AI behavior loops (open/closed-duplicate, 5+2 comments)](https://github.com/agentscope-ai/QwenPaw/issues/7579)** — User reports that assistant replies are persisted but **not included in subsequent requests**: the model "doesn't see its own last words", leading to repeated tool-call loops and erratic behavior. The duplicate (#7584) was explicitly marked `[严重⚠️⚠️]` ("very severe"). The rapid duplicate-close indicates maintainers have the issue on radar, **but no fix PR is visible yet**.
- **[Issue #7559 — 409 error when sending a message mid-task (open, 5 comments)](https://github.com/agentscope-ai/QwenPaw/issues/7559)** — A recurring UX conflict: while a task is executing, the UI reports `409 {"detail":"A task is already..."}` instead of queueing the user's new message. Users reasonably expect queue semantics.
- **[Issue #7597 — Tool-returned image/PDF binaries as bare base64 cause 400 (open, 4 comments)](https://github.com/agentscope-ai/QwenPaw/issues/7597)** — Affects `send_file_to_user`/`view_image` style tools; payloads sent as `"type":"data"` are rejected with "file must have a file_id or file_data". Notably, this issue itself was AI-generated and drafted bilingually — an interesting sign of AI-assisted issue reporting in this community.
- **[Issue #7587 — Cloudflare 403 when using WUSRouter OpenAI-compatible endpoint (open, 4 comments)](https://github.com/agentscope-ai/QwenPaw/issues/7587)** — A community-router/proxy provider returns a Cloudflare challenge for model-list fetches. Adds to the pattern of compatibility friction with non-standard OpenAI-compatible gateways.

## 5. Bugs & Stability

Ranked roughly by severity and user impact:

**Critical / High**

1. **Assistant replies silently dropped from context ([#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579), duplicate [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584))** — The agent repeats tool calls, forgets recent turns, and behaves erratically. This hits the core value proposition (long-horizon agent memory) and undermines user trust. No fix PR yet.
2. **Heartbeat cron feedback loop — duplicate message pile-up ([#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589))** — Verified on both 2.0.1 and current `main`; agent was unresponsive for ~2 hours. The reporter did the verification work for maintainers; this deserves prompt action.
3. **Stop control does not actually stop ([#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567))** — UI shows the task stopped; on refresh the task is still executing the wrong instruction. Combined with #7559 and [#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594) (task output repeated 3×), this suggests task-lifecycle state management needs hardening.

**Medium**

4. **Hardcoded 32768 context-size fallback ([#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576))** — Systematic `CONTEXT_UNFIT` misconfiguration across all model providers; confirmed in all published v2.1.0–v2.2.0 releases.
5. **PDF DataBlock permanently poisons a session for text-only endpoints ([#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617))** — Newly reported: once history contains a PDF tool result, even a trivial "hi" fails against Zhipu GLM with HTTP 400 error code 1210.
6. **Undiagnosable tool failures: exceptions swallowed in `_coordinator.py` `_drain()` ([#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572))** — Fix exists in open [PR #7578](https://github.com/agentscope-ai/QwenPaw/pull/7578), which adds `logger.exception()`.
7. **Hardcoded/unconfigurable stream idle timeout in v2.2.0 ([#7604](https://github.com/agentscope-ai/QwenPaw/issues/7604), closed)** — 30s idle watchdog causes timeouts on slow models and cannot be set in WebUI/envs.json on Desktop builds.
8. **Tool-returned binary as bare base64 ([#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597))** — Blocks image/PDF delivery tools on some providers; no fix yet.
9. **Provider-specific tool-call contamination with deepseek-v4-pro and others ([#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513))** — Model output mixes with QwenPaw tool-call rendering; reporter notes other agent frameworks do not exhibit it.

**Low / Niche**

10. Telegram Markdown tables rendered raw `|` / `---` ([#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585)); CLI commands fail inside Hub local sandboxes ([#7612](https://github.com/agentscope-ai/QwenPaw/issues/7612)); old LAN LM Studio disconnects ([#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505), closed); long-standing BiDi Arabic/English rendering issue ([#2120](https://github.com/agentscope-ai/QwenPaw/issues/2120)) — now with a fix PR open ([#7611](https://github.com/agentscope-ai/QwenPaw/pull/7611)).

## 6. Feature Requests & Roadmap Signals

Several signals indicate where the project is heading:

- **"Restore the v2.1.0 working-directory text input"** — Two separate requests ([#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588), [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601)) were closed in-window. Since no release happened, the fix is presumably already on `main`; expect it in the next v2.2.x patch. This is a good example of a self-inflicted regression being quickly reverted based on user complaints.
- **Feishu CardKit: auto-collapse the streaming thinking card ([#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570))** — The reporter has already **implemented and verified a local patch** using JSON 2.0 collapsible panels. Strong candidate for upstream adoption given GLM-5.x forced-thinking models generate very long reasoning text.
- **UI font scaling and clickable file-path links ([#4077](https://github.com/agentscope-ai/QwenPaw/issues/4077), closed)** — Was closed in this triage pass; possibly superseded by the sidebar/settings redesign in open [PR #7502](https://github.com/agentscope-ai/QwenPaw/pull/7502).
- **Memory subsystem is being actively refactored and pluginized** — Closed [PR #7561](https://github.com/agentscope-ai/QwenPaw/pull/7561), plus open [PR #7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) (ADBPG/PowerContext → plugins) and [PR #7606](https://github.com/agentscope-ai/QwenPaw/pull/7606) (Auto-Dream ↔ ReMe 0.4.1.12). Long-term memory backends are clearly a roadmap centerpiece; a third-party OpenViking backend ([PR #7613](https://github.com/agentscope-ai/QwenPaw/pull/7613)) shows ecosystem interest in extensibility.
- **Agent execution contract & prompt-file workspaces** ([PR #7526](https://github.com/agentscope-ai/QwenPaw/pull/7526)) — Adds a protected execution/clarification/authorization contract ahead of workspace prompt files; will likely shape how "skills" and agent policies work next.
- **Skill/plugin marketplace maturity** — New PRs expose skill versions and validate declared dependencies ([#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609)), add plugin update detection/UIs ([#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605)), and a reranker settings panel in the memory card ([#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399), under review since July). Meanwhile [Issue #7615](https://github.com/agentscope-ai/QwenPaw/issues/7615) directs third-party plugin questions to community channels — an ecosystem/user-support milestone.

**Prediction for next minor version:** a v2.2.1 patch fixing the v2.2.0 regressions (context fallback, idle timeout configurability, path-entry removal, 409 queue semantics via #7610), followed by a memory-focused v2.3.0 built on the #7561/#7616 refactor.

## 7. User Feedback Summary

The Chinese-speaking user base is highly engaged and vocal, contributing roughly half of the issues in this window. The strongest recurring pain points:

- **"AI forgetting" erodes trust.** Issue #7571 ("总是记不住，还是会遗忘" — "it always forgets") describes a plugin developer whose agent repeatedly violates an instruction about where to put TODO files and even auto-deploys wrong code over the source directory. The author is uncertain whether to blame the model or QwenPaw, which is itself a trust signal. Related context-loss reports (#7579/#7584) use words like "严重" (severe) and "请重视" (please take seriously).
- **Regression sensitivity around v2.2.0.** Users explicitly compare with v2.1.0: "我记得2.1.0是可以的" ("I remember 2.1.0 allowed it") for path editing; "v2.1.0 那个设计很好啊" for the directory picker; "为什么砍掉这个有用的设计" ("why cut this useful design"). The 409 blocking behavior and stop-button inconsistency add to a sense that 2.2.0 shipped slightly under-polished.
- **Comparison against competitors.** Issue #7513 explicitly states "其他 AI agent 工具没有遇到这个情况" ("other AI agent tools don't have this problem") for tool-call contamination — competitive pressure QwenPaw should treat seriously.
- **Scaling pain.** Issue #7242 (dashboard takes 6+ minutes with 74 agents in Docker) shows multi-agent production deployments are happening today and need performance work.

On the positive side, users are doing deep homework before reporting: verifying against `main`, unpacking PyInstaller binaries to confirm versions, reproducing with minimal examples, and even submitting verified local patches (#7570). This is a sophisticated, helping community — but that goodwill will erode quickly if fix PRs for #7579/#7589 and similar high-severity bugs do not appear soon.

## 8. Backlog Watch

Issues/PRs that look stale or under-attended and need maintainer attention:

- **[Issue #7242 — Dashboard takes 6+ minutes to load with 74 agents (open since Aug 24, 3 comments)](https://github.com/agentscope-ai/QwenPaw/issues/7242)** — No visible maintainer response/fix. This is a production-scale performance complaint, not a corner case.
- **[Issue #2120 — BiDi text rendering for Arabic/English (open since Mar 23)](https://github.com/agentscope-ai/QwenPaw/issues/2120)** — A four-month-old UI/accessibility bug finally has a fix PR ([#7611](https://github.com/agentscope-ai/QwenPaw/pull/7611)); needs review and merge.
- **[PR #6399 — Reranker UI config panel (open since Jul 23, Under Review)](https://github.com/agentscope-ai/QwenPaw/pull/6399)** — Two months in review without visible movement. Either advance it or close with clear guidance.
- **[Issue #7587 — Cloudflare 403 on WUSRouter (open Sep 6)](https://github.com/agentscope-ai/QwenPaw/issues/7587)** — Provider compatibility issue with only user-side discussion so far; maintainers should advise on whether to add request-header controls or a "challenge-mode" escape hatch.
- **[Issue #7612 — Built-in CLI commands fail in Hub sandboxes (open Sep 7)](https://github.com/agentscope-ai/QwenPaw/issues/7612)** — Sandbox/RuntimeBoundary conflict affecting even `qwenpaw agents list`; important for the platform story. Notably its author also submitted PR #7526, indicating an active technical contributor whose report should get a fast official response.
- **[Issue #7571 — "Always forgets" long-term instruction adherence (open Sep 5)](https://github.com/agentscope-ai/QwenPaw/issues/7571)** — Not strictly a code bug; may need guidance or a memory-persistence documentation follow-up rather than silence.

---

*Data window: issues and PRs updated on 2026-09-07 (last 24h before digest date 2026-09-08). Aggregated from github.com/agentscope-ai/QwenPaw.*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-08

## 1. Today's Overview

ZeroClaw is in an intense, high-activity stabilization phase: **30 issues and 50 PRs were updated in the last 24 hours** (27 open issues, 45 open PRs), while **no new release shipped** — the latest user-facing version referenced in the wild remains **v0.8.5**. The dominant theme is **turn persistence/transcript integrity for Code/ACP and ZeroCode sessions**, with one S0 data-loss report ([#10121](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)) and a cluster of S1 "workflow blocked" duplicates/descendants ([#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333), [#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659), [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673), [#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)) all pointing at interrupted streaming/persistence paths. A second major theme is **Anthropic prompt-cache correctness and cost-ledger accuracy**, where one feature closed with its PR ([#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660) / [#10666](https://github.com/zeroclaw-labs/zeroclaw/pull/10666)) but several related bugs are freshly filed. Maintainer responsiveness looks good — 3 issues closed, new tracker issues ([#10684](https://github.com/zeroclaw-labs/zeroclaw/issues/10684), [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685)) batch related fixes, and maintainers are actively merging master into contributor branches — but the volume of open S0/S1 items means the next release is likely a heavily bug-fix-oriented one.

## 2. Releases

**No new releases in this window.** No release notes, breaking changes, or migration notes to report. Given the volume of closed/landing fixes (cache breakpoints, prompt budgeting, ACP persistence, channel STT hardening), a patch/minor bump beyond v0.8.5 appears imminent once the large open PRs merge.

## 3. Project Progress

Five PRs were closed/merged in the window; the three visible in the top-20 list:

- **[PR #10666 — feat(providers): place a third cache breakpoint on the previous turn's last message](https://github.com/zeroclaw-labs/zeroclaw/pull/10666)** (XL, high risk) — Closes [#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660). Adds a third `cache_control` marker so turn-boundary cache misses fall back to history rather than the system prompt, improving cache-read hit rates for Anthropic and compatible providers.
- **[PR #10465 — feat(runtime): enforce compact local prompt budget](https://github.com/zeroclaw-labs/zeroclaw/pull/10465)** (M, high risk) — The built-in `local_small` profile now selects compact skill metadata and an 8,000-character system-prompt ceiling; legacy `compact_context` prompts retain canonical project instructions.
- **[PR #10669 — test(channels/discord): prove STT dispatch selects the agent's provider](https://github.com/zeroclaw-labs/zeroclaw/pull/10669)** (XS, test-only) — Closes the regression-test gap noted in [#10624](https://github.com/zeroclaw-labs/zeroclaw/issues/10624), locking in configured-route transcription behavior.

Also closed: **[#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)** (Bedrock Nova 2 Lite `cachePoint` disable request, closed after 12 comments of back-and-forth) and **[#10693](https://github.com/zeroclaw-labs/zeroclaw/issues/10693)** (ZeroCode ignoring Enter submissions while showing "Connected" — closed the same day it was filed).

## 4. Community Hot Topics

- **[Issue #8720 — Disable cachePoint for Bedrock Nova 2 Lite via config?](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)** — *12 comments (highest in window), now closed.* A user hit random Bedrock caching errors and wanted a config-level kill-switch. Underlying need: per-provider/per-model cache control without code changes — a need that echoes across the newer cache-marker issues.
- **[Issue #10230 — Daemon startup or reload can overflow during agent initialization](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** — *6 comments, S1.* Applying a Quickstart config while the daemon runs aborts a Tokio worker with a stack overflow. Needs a repro; risk labeled high.
- **[Issue #9333 — Failed ACP turns disappear after switching sessions](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** — *4 comments, S1.* Provider-error turns vanish from the live transcript after a session switch; spawned the follow-up slice [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673).
- **[Issue #10408 — Second message during an active turn starts a parallel run → duplicate work/reply](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)** and **[#10121 — Partial Code/ACP turns disappear if the process exits before completion](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)** — *3 comments each.* Together they expose the core demand: **session runs must be serialized and durable** (no duplicate replies, no lost streamed progress on crash or budget exhaustion).

On the PR side, the most substantive discussions are around **[#10197 — fix(acp): persist interrupted turn progress](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)** (the likely fix for the S0/S1 ACP family), **[#9739 — feat(zerocode): multi-session panes](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)**, and the very large **[#10611 — adaptive-thinking Claude models](https://github.com/zeroclaw-labs/zeroclaw/pull/10611)** which touches providers, runtime, CLI, and channels.

## 5. Bugs & Stability

Bugs updated/active in the last 24h, ranked by severity:

**S0 — data loss/security risk**
- **[#10121 — Partial Code/ACP turns disappear if the process exits before completion](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)** (p1, accepted, no-stale) — Open fix PR: [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197).

**S1 — workflow blocked**
- **[#10230 — Daemon startup/reload stack overflow during Quickstart apply](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** (p1, needs repro).
- **[#9333 — Failed ACP turns disappear after session switching](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** (p1) + **[#10673 — Persist failed ACP turns on the daemon RPC path](https://github.com/zeroclaw-labs/zeroclaw/issues/10673)** (p1, the "remaining slice" of #9333 on a different code path).
- **[#10659 — Budget-exceeded Code turn loses visible progress after session restore](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)** (p1, follow-up).
- **[#10697 — ACP transcript drops assistant text emitted before a tool call](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)** (p1, follow-up; only post-last-tool text renders).
- **[#10670 — heartbeat.target rejects a channel instance composite key (`<type>.<alias>`)](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)** (p2 but S1).
- **[#10408 — Parallel run/duplicate reply when a second message arrives mid-turn](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)** (p1, listed S2-degraded but duplicate-work impact).

**S2 — degraded behavior (p1/p2)**
- **[#9940 — Turn-context tells agents to use an unresolvable cron delivery channel](https://github.com/zeroclaw-labs/zeroclaw/issues/9940)** (p1, accepted, no-stale).
- **[#10689 — Telegram voice reply silently skipped when text starts with `[`](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)** (ElevenLabs v3 audio tags) — p2, no fix PR yet.
- **[#10688 — WhatsApp Web voice notes are never transcribed](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)** (channel built without the agent's transcription provider) — p2, no fix PR yet.
- **[#10694 — PowerShell shell tests intermittently time out on Windows CI](https://github.com/zeroclaw-labs/zeroclaw/issues/10694)** (p2).
- **[#10674 — History trimming stops at the cap, re-trims every few turns, defeats prompt caching](https://github.com/zeroclaw-labs/zeroclaw/issues/10674)** (p1, accepted); same hysteresis pattern in the token-budget trimmer: **[#10702](https://github.com/zeroclaw-labs/zeroclaw/issues/10702)** (p3).

**S3 and correctness/accounting**
- **[#10690 — Integrations page "Configure" slugifies display name instead of family key (Z.AI → 404)](https://github.com/zeroclaw-labs/zeroclaw/issues/10690)** (p2, S3, web dashboard).
- **[#10701 — Image attachment invalidates whole history cache prefix](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)** (p2, cost multiplier).
- **[#10699 — Cost ledger prices cache writes at plain input rate, understating cache misses](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)** (p2) and **[#10700 — Cost records carry a daemon-lifetime session id, not per-conversation](https://github.com/zeroclaw-labs/zeroclaw/issues/10700)** (p2).
- **[#10104 — zeroclaw-hardware feature-gated tests never execute in CI](https://github.com/zeroclaw-labs/zeroclaw/issues/10104)** (p2, accepted).
- **[#10662 — OAuth cache marker below Anthropic's cache minimum, wasting a breakpoint slot](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)** (p2, follow-up).

## 6. Feature Requests & Roadmap Signals

- **Prompt-cache economics (likely next patch):** With [#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660) closed by [#10666](https://github.com/zeroclaw-labs/zeroclaw/pull/10666), the adjacent requests are queued: configurable 1-hour cache TTL ([#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)), fixing the OAuth prefix marker minimum ([#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)), and preventing image attachments from nuking the cache prefix ([#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)). Expect these bundled in the next minor release.
- **Reliable unattended delivery:** Tracker [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685) explicitly coordinates four fixes (false send success, duplicate replies, missing cron outcomes, delivery-channel misdirection) so operators can trust cron output — a strong signal this is a prioritized reliability theme.
- **Bootstrap launcher & release registry:** Tracker [#10684](https://github.com/zeroclaw-labs/zeroclaw/issues/10684) plus the open canonical release-target registry PR ([#10590](https://github.com/zeroclaw-labs/zeroclaw/pull/10590)) point toward MCP-host-driven install/plan workflows.
- **ZeroCode multi-client collaboration:** [#10695](https://github.com/zeroclaw-labs/zeroclaw/issues/10695) (refresh sessions changed by another client) builds on the large multi-session panes PR [#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739).
- **Security hardening:** [#10606](https://github.com/zeroclaw-labs/zeroclaw/issues/10606) (sanitize component errors in unauthenticated `/health`) is accepted at p1/high-risk.
- **Biggest roadmap item in flight:** [#10611 — adaptive-thinking Claude models](https://github.com/zeroclaw-labs/zeroclaw/pull/10611) (XL, touches Anthropic + Bedrock, channels, CLI). Given its breadth and "needs-maintainer-review" state, it looks like a 0.9.0-scale feature rather than a patch.

## 7. User Feedback Summary

- **Cache configurability and cost trust are the loudest pain points.** The Bedrock Nova 2 Lite user in [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720) wanted to disable caching entirely; others are now reporting that cache TTLs are too short ([#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)), history trimming defeats caching ([#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674)), and the cost ledger "understates" cache-write spend ([#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)) — i.e., users feel they cannot trust displayed costs.
- **Data loss/duplication anxiety is high among Code/ACP users:** lost failed turns ([#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)), lost progress on exit ([#10121](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)) or budget exhaustion ([#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)), dropped pre-tool-call text ([#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)), and duplicated replies ([#10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408), [#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667)). Several carry `no-stale`/`follow-up` labels, showing maintainers know these matter.
- **Voice/multimodal channel expectations are rising:** Telegram TTS replies silently skipped ([#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)) and WhatsApp voice notes never transcribed ([#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)) both landed this cycle — users expect BYO STT/TTS providers to apply consistently across every channel.
- **Operator visibility:** cron/delivery users cannot tell whether unattended work ran or reached its destination ([#9940](https://github.com/zeroclaw-labs/zeroclaw/issues/9940), tracker [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685)).
- **Satisfaction signal:** the speed of triage is a positive — new issues arrive with severity/priority/risk labels, quick closes happen within a day ([#10693](https://github.com/zeroclaw-labs/zeroclaw/issues/10693)), and maintainers are actively reworking contributor PRs instead of closing them.

## 8. Backlog Watch

**Issues needing maintainer response or action:**
- **[#10104 — zeroclaw-hardware tests never execute in CI](https://github.com/zeroclaw-labs/zeroclaw/issues/10104)** — accepted since 2026-08-18, no visible PR.
- **[#9940 — Cron delivery channel misdirection](https://github.com/zeroclaw-labs/zeroclaw/issues/9940)** — p1, no-stale, accepted since 2026-08-12.
- **[#10606 — Sanitize health-response errors](https://github.com/zeroclaw-labs/zeroclaw/issues/10606)** — accepted p1/high-risk since 2026-09-03, no PR attached yet.
- **[#10230 — Daemon stack overflow during Quickstart](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** — S1 but waiting on a repro (`r:needs-repro`).

**PRs awaiting maintainer review (aging):**
- **[#9739 — ZeroCode multi-session panes](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)** — open since 2026-08-04, XL; `needs-maintainer-review`.
- **[#9410 — Default command audit logging to disabled](https://github.com/zeroclaw-labs/zeroclaw/pull/9410)** — open since 2026-07-26; security-related.
- **[#9678 — Harden Git shell policy arguments](https://github.com/zeroclaw-labs/zeroclaw/pull/9678)** — open since 2026-08-02; security-related.
- **[#10611 — Adaptive-thinking Claude models](https://github.com/zeroclaw-labs/zeroclaw/pull/10611)** — open since 2026-09-04; XL, broad blast radius.

**PRs at risk of stalling (needs-author-action; some labeled `stale-candidate`):** [#10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214) (log rotation, XL), [#9326](https://github.com/zeroclaw-labs/zeroclaw/pull/9326) (Signal Note to Self, XL), [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) (egress grant ceremony, XL), [#10034](https://github.com/zeroclaw-labs/zeroclaw/pull/10034) (provider alias probe), [#9283](https://github.com/zeroclaw-labs/zeroclaw/pull/9283) (web_fetch decompression — **stale-candidate**, open since 07-23), [#9399](https://github.com/zeroclaw-labs/zeroclaw/pull/9399), [#9939](https://github.com/zeroclaw-labs/zeroclaw/pull/9939), [#9313](https://github.com/zeroclaw-labs/zeroclaw/pull/9313) (WeChat sync cursor). These eight are the main drag on throughput; clearing them would meaningfully reduce PR count pressure.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*