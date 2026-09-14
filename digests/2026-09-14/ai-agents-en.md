# OpenClaw Ecosystem Digest 2026-09-14

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-14 00:23 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-14

Data source: [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)

## 1. Today's Overview

OpenClaw is in a very high-activity maintenance window: 500 issues and 500 PRs were updated in the last 24h, with 213 issues closed and 254 PRs merged/closed. No new release shipped. The dominant workstreams are update/upgrade recovery, subagent completion and routing, session/transcript consistency, and channel isolation/security. Project health is mixed: throughput is strong and several regressions have closed, but multiple P0/P1 issues remain open around update failure, gateway crashes, message loss, and internal-context leakage. Maintainer review, product, and security decisions appear to be the main bottleneck, as many top issues carry `clawsweeper:needs-maintainer-review` or `clawsweeper:needs-product-decision`.

## 2. Releases

No new releases in the last 24h (`Latest Releases: None`). Active versions referenced in issues include 2026.9.2, 2026.9.3, and 2026.9.4. [PR #146170](https://github.com/openclaw/openclaw/pull/146170) is a rebased 2026.9.5 plugin/command preservation effort, but no release notes, breaking changes, or migration notes are available from the provided data.

## 3. Project Progress

- **PR throughput:** 254 PRs were merged/closed in the 24h window, though the top 30 commented PRs are all open; detailed merged-PR summaries are not in the sample.
- **Update/doctor/rollback reliability stack advanced via open PRs:** [#144811](https://github.com/openclaw/openclaw/pull/144811), [#147581](https://github.com/openclaw/openclaw/pull/147581), [#147583](https://github.com/openclaw/openclaw/pull/147583), [#147588](https://github.com/openclaw/openclaw/pull/147588), [#147544](https://github.com/openclaw/openclaw/pull/147544), [#147562](https://github.com/openclaw/openclaw/pull/147562), [#144836](https://github.com/openclaw/openclaw/pull/144836).
- **Subagent/session reliability:** [#147571](https://github.com/openclaw/openclaw/pull/147571) explains waits and separates execution from result delivery; [#142018](https://github.com/openclaw/openclaw/pull/142018) converges projections during active writes; [#147585](https://github.com/openclaw/openclaw/pull/147585) records execution ownership and settles orphaned task records; [#147596](https://github.com/openclaw/openclaw/pull/147596) completes system-expert requests when concurrency is one.
- **UI/i18n:** [#147590](https://github.com/openclaw/openclaw/pull/147590) completes Apple locales for 2026.9.5; [#147574](https://github.com/openclaw/openclaw/pull/147574) loads Home/System busyness inside panels; [#147540](https://github.com/openclaw/openclaw/pull/147540) collapses completed macOS work above replies; [#147568](https://github.com/openclaw/openclaw/pull/147568) keeps linked people consistent across mentions/sign-ins; [#143489](https://github.com/openclaw/openclaw/pull/143489) renders session references as accent links.
- **Closed/updated issues indicating fixes or cleanup:** [#135111](https://github.com/openclaw/openclaw/issues/135111) malformed JSON tool-call args; [#85030](https://github.com/openclaw/openclaw/issues/85030) MCP tools not injected into subagents; [#137927](https://github.com/openclaw/openclaw/issues/137927) internal context leak to Telegram; [#140162](https://github.com/openclaw/openclaw/issues/140162) Windows gateway restart; [#145563](https://github.com/openclaw/openclaw/issues/145563) WeChat reply dispatch; [#146958](https://github.com/openclaw/openclaw/issues/146958) 2026.9.2→9.3 update failure; [#145503](https://github.com/openclaw/openclaw/issues/145503) skill_workshop registration; [#27445](https://github.com/openclaw/openclaw/issues/27445) announceTarget routing.

## 4. Community Hot Topics

The most active issues by comment count show a clear concentration on channel leakage, process/resource leaks, subagent reliability, and update/gateway stability. PR comment counts are not available in the provided data (`Comments: undefined` for top PRs).

| Item | State | Activity | Underlying need |
|---|---|---:|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) Text between tool calls leaks to messaging channels | OPEN, P1 diamond lobster | 40 comments, 👍 1 | Strict separation between internal agent processing and user-visible channel output; security/session-state isolation. |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) Unreaped hook/tool child processes cause zombie accumulation | OPEN, P1 silver shellfish | 30 comments, 👍 1 | Reliable child-process lifecycle and runtime resource cleanup. |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) Subagent completion silently lost | OPEN, P1 diamond lobster | 28 comments, 👍 2 | Durable subagent orchestration: retry, notification, timeout recovery. |
| [#135111](https://github.com/openclaw/openclaw/issues/135111) Malformed JSON tool-call arguments | CLOSED, P1 platinum hermit | 27 comments | Provider/tool-call robustness and better diagnostics. |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) Codex PreToolUse hook relay CPU stalls gateway RPC | OPEN, P0 silver shellfish | 23 comments, 👍 2 | Hook execution isolation, backpressure, and gateway responsiveness. |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) Synchronous persistence blocks Gateway event loop | OPEN, P1 diamond lobster | 19 comments | Async I/O and scaling for transcript/session persistence. |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) Duplicate transcript, replay, context assembly across channels | OPEN, P1 silver shellfish | 15 comments | Canonical transcript/context pipeline across channels. |
| [#85030](https://github.com/openclaw/openclaw/issues/85030) MCP tools not injected into subagents | CLOSED, P1 diamond lobster | 14 comments, 👍 6 | Correct subagent tool authority, schema injection, and allowlists. |
| [#137927](https://github.com/openclaw/openclaw/issues/137927) Internal context block leaks into Telegram text | CLOSED, P1 | 14 comments | Internal scaffolding must never surface in user channels. |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) SQLite memory tables unbounded growth | OPEN, P2 diamond lobster | 14 comments | Retention/eviction policy for memory index and embedding cache. |

**Analysis:** Users and maintainers are dealing with the consequences of a complex multi-channel, multi-backend agent runtime. The highest-engagement issues are not cosmetic; they concern trust boundaries (what the user sees), data integrity (what is lost), and runtime stability (what crashes or leaks). Subagent orchestration is a recurring theme: completion announce, waits, timeouts, and terminal-state handling appear across many top issues.

## 5. Bugs & Stability

### P0 / Release-blocking

| Issue | State | Symptom | Fix signal |
|---|---|---|---|
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | OPEN | Codex PreToolUse hook relay spawns CPU-bound `openclaw-hooks` processes and stalls Gateway RPC. | No new fix PR noted. |
| [#146394](https://github.com/openclaw/openclaw/issues/146394) | OPEN | Update failure: `global-install-failed` on 2026.9.3. | Needs maintainer attention. |
| [#145252](https://github.com/openclaw/openclaw/issues/145252) | OPEN | Tracking issue: 2026.9.3 / 2026.9.4 update, upgrade, and recovery reliability. | Coordination index. |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) | OPEN | 2026.9.2 → 2026.9.4 managed update fails at candidate-Doctor, then rolls back. | No new fix PR noted. |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | OPEN | Agent SQLite WAL grows to 1.4–2.8 GB and blocks Gateway startup on Windows. | Needs info; no new fix PR. |
| [#143334](https://github.com/openclaw/openclaw/issues/143334) | OPEN | Lost subagent completion parks requester in settle-yield and starves queued user messages. | No new fix PR noted. |
| [#147160](https://github.com/openclaw/openclaw/issues/147160) | OPEN | Update failure: `finalize:doctor` on 2026.9.4. | Needs info. |
| [#146958](https://github.com/openclaw/openclaw/issues/146958) | CLOSED | 2026.9.2 → 2026.9.3 update fails on llm-task package-owner metadata, service stopped. | Closed. |
| [#140162](https://github.com/openclaw/openclaw/issues/140162) | CLOSED | Windows gateway restart kills ready/slow-booting gateway and misses foreground gateways. | Closed. |
| [#145563](https://github.com/openclaw/openclaw/issues/145563) | CLOSED | WeChat reply dispatch fails with `PreparedModelCatalogConfigReplacedError`. | Closed. |

### P1 / High-impact

| Issue | State | Symptom | Fix signal |
|---|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | OPEN | Text between tool calls leaks to messaging channels. | Linked PR open; needs security/product review. |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | OPEN | Hook/tool child processes leak as zombies, degrading runtime. | No new fix PR. |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | OPEN | Subagent completion silently lost; no retry, notification, or auto-restart. | No new fix PR. |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | OPEN | Synchronous persistence/transcript maintenance blocks Gateway event loop. | No new fix PR. |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | OPEN | Message sent while a reply run is active is dropped; regression in 2026.9.2. | `fix-shape-clear`, `queueable-fix`. |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | OPEN | MCP server init timeout crashes Gateway via unhandled rejection. | `fix-shape-clear`, `queueable-fix`. |
| [#141474](https://github.com/openclaw/openclaw/issues/141474) | OPEN | Collector child calling `sessions_yield` strands `agents_wait`; `outputSchema` inert on claude-cli. | Needs maintainer review. |
| [#132765](https://github.com/openclaw/openclaw/issues/132765) | OPEN | `agents_wait` ignores `timeoutSeconds`; dies after ~60s. | No new fix PR. |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | OPEN | Mixed terminal requester-settle batches retry forever after ownership check. | `fix-shape-clear`, `queueable-fix`. |
| [#145152](https://github.com/openclaw/openclaw/issues/145152) | OPEN | Stuck-session recovery reports force-clear as abort, names no run/owner identity. | `fix-shape-clear`, `queueable-fix`. |
| [#113701](https://github.com/openclaw/openclaw/issues/113701) | OPEN | Large tool outputs exceed context; compaction cannot recover; sessions enter failure loop. | Needs product decision. |
| [#101929](https://github.com/openclaw/openclaw/issues/101929) | OPEN | Context-overflow precheck over-counts tokens ~2.3–2.6x vs billed usage. | `fix-shape-clear`. |
| [#144809](https://github.com/openclaw/openclaw/issues/144809) | OPEN | claude-cli long turns lose entire generated reply; one 42s turn fails similarly. | Needs info. |
| [#81182](https://github.com/openclaw/openclaw/issues/81182) | OPEN | Overflow recovery waits full auto-compaction timeout before truncating tool results. | Linked PR open. |

**Stability assessment:** The P0 cluster is dominated by update/upgrade reliability and gateway crashes. P1 is dominated by message loss, subagent orchestration hangs, context-overflow handling, and process/resource leaks. Several P1s are marked queueable or fix-shape-clear, but many still lack a fix PR, so triage capacity remains the limiting factor.

## 6. Feature Requests & Roadmap Signals

- **Subagent completion/routing:** [#27445](https://github.com/openclaw/openclaw/issues/27445) requested `announceTarget` for sub-agent completion routing; it is closed with a linked PR open. [PR #147571](https://github.com/openclaw/openclaw/pull/147571) directly addresses waits, execution, and result delivery — a strong signal for the next release.
- **Transcript/session APIs:** [#79904](https://github.com/openclaw/openclaw/issues/79904), [#79903](https://github.com/openclaw/openclaw/issues/79903), and [#79905](https://github.com/openclaw/openclaw/issues/79905) asked for cursored SQLite reads, durable session lineage, and typed transcript projections. They are closed stale, but the underlying need remains visible in current session/projection PRs.
- **Browser automation:** [#60381](https://github.com/openclaw/openclaw/issues/60381) requested a force parameter for click and an exposed evaluate action for modern frontend frameworks.
- **Cross-backend context:** [#79047](https://github.com/openclaw/openclaw/issues/79047) asked to preserve conversation context across backend model switches.
- **Dynamic allowlists:** [#58057](https://github.com/openclaw/openclaw/issues/58057) requested dynamic identity resolution for `dmPolicy`/`groupPolicy` allowlists.
- **Plugin SDK:** [PR #137880](https://github.com/openclaw/openclaw/pull/137880) would let policy-bound hooks enumerate tools.
- **UI/UX:** [PR #147540](https://github.com/openclaw/openclaw/pull/147540), [PR #147568](https://github.com/openclaw/openclaw/pull/147568), [PR #143489](https://github.com/openclaw/openclaw/pull/143489), and [PR #147574](https://github.com/openclaw/openclaw/pull/147574) signal continued polish around macOS transcripts, linked identities, session references, and panel loading.

**Prediction:** The next release/update line is likely to prioritize update/doctor/rollback reliability, subagent wait/result-delivery semantics, session projection convergence, and Apple locale/UI polish. Larger feature asks such as cross-backend context preservation, dynamic allowlists, and browser-tool force/evaluate may remain backlog unless adopted by a maintainer.

## 7. User Feedback Summary

- **Update reliability is the loudest pain point.** Users report service-stopped updates, rollback loops, Doctor failures, and migration blockers: [#146394](https://github.com/openclaw/openclaw/issues/146394), [#145192](https://github.com/openclaw/openclaw/issues/145192), [#147160](https://github.com/openclaw/openclaw/issues/147160), [#146958](https://github.com/openclaw/openclaw/issues/146958), [#145252](https://github.com/openclaw/openclaw/issues/145252).
- **Silent message/data loss erodes trust.** Reports include dropped messages during active replies, lost subagent completions, and claude-cli replies disappearing: [#139847](https://github.com/openclaw/openclaw/issues/139847), [#44925](https://github.com/openclaw/openclaw/issues/44925), [#144809](https://github.com/openclaw/openclaw/issues/144809), [#143334](https://github.com/openclaw/openclaw/issues/143334), [#132765](https://github.com/openclaw/openclaw/issues/132765).
- **Security/privacy leakage is a top concern.** Internal tool-call text and runtime context have leaked into visible Telegram/Slack/messaging channels: [#25592](https://github.com/openclaw/openclaw/issues/25592), [#137927](https://github.com/openclaw/openclaw/issues/137927).
- **Resource exhaustion affects long-running deployments.** Zombie processes, CPU-bound hook relays, unbounded SQLite WAL, and memory-table growth are recurring: [#97616](https://github.com/openclaw/openclaw/issues/97616), [#91009](https://github.com/openclaw/openclaw/issues/91009), [#143524](https://github.com/openclaw/openclaw/issues/143524), [#114612](https://github.com/openclaw/openclaw/issues/114612), [#118885](https://github.com/openclaw/openclaw/issues/118885).
- **Multi-channel/backend friction remains high.** Users report issues with Telegram, WeChat, Discord, iMessage/BlueBubbles, Feishu, Docker sandbox mounts, MCP tool injection into subagents, and Node v26 gzip handling: [#31331](https://github.com/openclaw/openclaw/issues/31331), [#85030](https://github.com/openclaw/openclaw/issues/85030), [#79752](https://github.com/openclaw/openclaw/issues/79752), [#145563](https://github.com/openclaw/openclaw/issues/145563).
- **Sentiment:** Users are highly engaged and provide detailed repros, but frustration is concentrated on regressions, update failures, and the time between high-severity reports and maintainer/product decisions.

## 8. Backlog Watch

Important long-unanswered or high-comment items needing maintainer attention:

| Item | Created | Activity / State | Why watch |
|---|---:|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 2026-02-24 | 40 comments, OPEN, P1 diamond lobster | Security/session-state leak; needs product/security review and linked PR is open. |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | 30 comments, OPEN, P1 | Zombie process accumulation; long-running runtime degradation. |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 2026-03-13 | 28 comments, OPEN, P1 diamond lobster | Silent subagent completion loss; core orchestration reliability. |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | 2026-06-06 | 23 comments, OPEN, P0 | CPU-bound hook relay stalls Gateway RPC; release-impacting. |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 2026-08-05 | 19 comments, OPEN, P1 diamond lobster | Gateway event-loop blocking at scale. |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) | 2026-04-20 | 15 comments, OPEN, maintainer/P1 | Umbrella for duplicate transcript/replay/context assembly across channels. |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | 2026-07-27 | 14 comments, OPEN, P2 | SQLite memory tables have no retention policy; disk exhaustion risk. |
| [#31331](https://github.com/openclaw/openclaw/issues/31331) | 2026-03-02 | 9 comments, OPEN, P1 | Docker install + sandbox `workspaceAccess` broken. |
| [#81182](https://github.com/openclaw/openclaw/issues/81182) | 2026-05-12 | 6 comments, OPEN, P1 diamond lobster | Overflow recovery waits full timeout; linked PR open. |
| [#86214](https://github.com/openclaw/openclaw/issues/86214) | 2026-05-24 | 8 comments, OPEN, P1 | Codex app-server client closes mid-turn on large logs. |
| [PR #124467](https://github.com/openclaw/openclaw/pull/124467) | 2026-08-16 | OPEN, waiting on author | QA thread identity refactor; long-running stack. |
| [PR #144811](https://github.com/openclaw/openclaw/pull/144811) | 2026-09-11 | OPEN, waiting on author | Update health-check failure display; part of broader updater reliability. |
| [PR #145043](https://github.com/openclaw/openclaw/pull/145043) | 2026-09-11 | OPEN, waiting on author | Prevents stale Codex migrations from blocking upgrades. |
| [PR #140423](https://github.com/openclaw/openclaw/pull/140423) | 2026-09-06 | OPEN, needs proof | Disables iOS branch switching during active runs; compatibility risk. |
| [PR #146170](https://github.com/openclaw/openclaw/pull/146170) | 2026-09-12 | OPEN, rebase in progress | Preserves plugin commands/updates in rebased 2026.9.5. |
| [PR #142018](https://github.com/openclaw/openclaw/pull/142018) | 2026-09-08 | OPEN, ready for maintainer look | Session projection convergence during active writes. |
| [PR #137880](https://github.com/openclaw/openclaw/pull/137880) | 2026-09-04 | OPEN, ready for maintainer look | Policy-bound hooks enumerate tools; plugin SDK capability. |

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Date: 2026-09-14** · Sources: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw community digests

---

## 1. Ecosystem Overview

The personal-AI-assistant open-source landscape in September 2026 is dominated by **reliability and trust engineering rather than new capability**. Every active project in this sample is fighting the same class of problems — state persistence under concurrency, silent data/message loss, channel isolation, and update/install integrity — which indicates the category has crossed from "demo-ware" into deployment-hardening. **OpenClaw is the clear reference implementation** by scale (roughly 10× the issue/PR velocity of its nearest peer), while **Hermes, ZeroClaw, and QwenPaw** pursue differentiated niches around desktop control, security/governance, and lightweight provider-centric agents. **IronClaw** is effectively dormant this window, with only bot-driven dependency churn. Across the board, maintainer review/decision bandwidth — not contributor supply — is the binding constraint on progress.

---

## 2. Activity Comparison

| Project | Issues updated (24h) | Issues closed | PRs updated (24h) | PRs merged/closed | Release status | Health score* |
|---|---:|---:|---:|---:|---|---:|
| **OpenClaw** | ~500 | 213 (43%) | ~500 | 254 (51%) | None (2026.9.2–9.4 in flight; 9.5 pending) | **6.5 / 10** |
| **Hermes Agent** | 50 | 18 (36%) | 50 | 13 (26%) | None | **6.0 / 10** |
| **ZeroClaw** | 37 | 5 (14%) | 50 | **0 (0%)** | None (v0.8.5 stabilization line) | **4.5 / 10** |
| **QwenPaw** | 6 | ≥1 | 8 | ≥1 | None (v2.2.1 current) | **5.5 / 10** |
| **IronClaw** | **0** | 0 | 5 | 1 (20%) | None | **4.5 / 10** |

\* **Health score** is an analyst composite (1–10) of four dimensions derived from the digests: activity/engagement, merge throughput, open critical-bug load (inverse), and review responsiveness. It is not an official project metric.

**Read:** OpenClaw and Hermes convert activity into closures at scale. ZeroClaw has high engagement with **zero landed code** — the sharpest throughput anomaly in the set. IronClaw's low score reflects dormancy, not instability.

---

## 3. OpenClaw's Position

**Scale advantage is structural, not incremental.** At 500 issues + 500 PRs touched in 24h with 254 PRs merged/closed, OpenClaw operates an order of magnitude above peers — roughly 10× Hermes, 13× ZeroClaw, 80× QwenPaw on PR volume. This implies a materially larger contributor and deployer base, and a faster regression-detection loop.

**Breadth of surface area.** OpenClaw is the only project with a visible multi-channel matrix spanning Telegram, WeChat, Discord, iMessage/BlueBubbles, Feishu, plus Docker-sandbox execution and MCP tool injection. Peers are narrower: Hermes centers on Desktop/Dashboard + WhatsApp/CS deployments; ZeroClaw on security primitives and provider routing; QwenPaw on a desktop chat UI with ACP and a provider catalog.

**Technical approach.** OpenClaw implements a **gateway + subagent orchestration runtime** with session/transcript projections, SQLite persistence, a plugin SDK with policy-bound hooks, and an explicit update/doctor/rollback stack — a platform architecture rather than an application. Hermes leans Desktop-first with a managed Nous gateway and `browser_exec`; ZeroClaw is Rust with governance-gated changes and a strong auth/identity layer (OIDC, RPC principals, shell permission policy); QwenPaw is lighter, Python/AgentScope-oriented with fast provider onboarding.

**Where OpenClaw is behind.** Its review bottleneck is proportionally severe: top issues carry `needs-maintainer-review` / `needs-product-decision`, and core P0s (update failure, hook-relay CPU stalls, WAL growth) remain open without fix PRs. Peers show faster per-issue turnaround on small fixes — Hermes had same-day fix PRs for four issues, ZeroClaw shows disciplined triage labels — precisely because their volume is tractable.

---

## 4. Shared Technical Focus Areas

Six requirement clusters recur across two or more projects:

1. **Durable state persistence under concurrency** — *OpenClaw* (sync persistence blocks event loop #119720; WAL growth blocks Windows startup #143524), *Hermes* (multi-process `state.db` WAL unlink, `DeletedWalGenerationError` #109727/#110106/#109946), *ZeroClaw* (failed turn discards prompt + tool history #10788), *QwenPaw* (session + model config loss #7724). **Need:** multi-process-safe storage, async I/O, retention/eviction policies.

2. **Channel isolation & output integrity** — *OpenClaw* (tool-call text leaks to Telegram/Slack #25592, #137927), *Hermes* (operator diagnostics leak into customer WhatsApp #107899), *QwenPaw* (task output hidden inside thinking/steps #7709), *ZeroClaw* (notification resync cancels running turns #10785). **Need:** hard separation of internal scaffolding from user-visible output.

3. **Orchestration durability (at-least-once delivery)** — *OpenClaw* (silently lost subagent completions #44925; `agents_wait` timeout bugs #132765; settle-yield starvation #143334), *Hermes* (cron fire-claim drops future slots #110412; mis-booked successful runs #108862), *ZeroClaw* (SOP promotes steps before schema rejection #10066), *QwenPaw* (scheduled tasks emit nothing #7709). **Need:** retry, notification, timeout recovery, terminal-state bookkeeping.

4. **Context/memory management** — *OpenClaw* (unbounded memory tables #114612; overflow recovery #81182; token over-counting #101929), *QwenPaw* (agent-autonomous compaction + pre-eviction warning #7733; instruction/scope drift #7571), *ZeroClaw* (context compaction anchored to model window #9535). **Need:** deterministic, observable eviction rather than static thresholds.

5. **Credential & secret handling** — *Hermes* (unredacted secrets in `state.db` despite `redact_secrets` #110416; OAuth refresh token erasure #62333), *ZeroClaw* (OIDC provider #10255, authenticated RPC principals #10259, shell permission policy #10610), *OpenClaw* (dynamic dmPolicy/groupPolicy allowlists #58057). **Need:** redaction by default, auth durability, policy-bound tool authority.

6. **Install / update / upgrade reliability** — *OpenClaw* (doctor/rollback update stack, #146394, #145192, #147160), *Hermes* (Windows installer shim + managed `uv` self-heal #110421), *ZeroClaw* (crates.io packaging follow-ups #9381), *QwenPaw* (pre-installed CLI tools in Docker #3429, now closed). **Need:** recoverable upgrades and reproducible environments.

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | Hermes | ZeroClaw | QwenPaw | IronClaw |
|---|---|---|---|---|---|
| **Primary focus** | Multi-channel gateway + subagent orchestration platform | Desktop/Dashboard control surface + managed gateway | Security, identity, governance, local-first mesh | Lightweight desktop agent + provider catalog | Rust/WASM runtime (currently maintenance-only) |
| **Language/stack** | Node/TS-style gateway + SQLite | Python/TS Desktop + gateway + TUI | Rust | Python (AgentScope) + Desktop UI | Rust / WASM (Wasmtime) |
| **Target user** | Power deployers, multi-channel operators | Desktop users, CS/production deployments | Security-conscious, multi-device/household | Individual devs, plugin builders | Near-ecosystem/infra integrators |
| **Distinct bet** | Plugin SDK + policy-bound hooks; breadth of channels | Multi-profile first-class; live local gateway as backend (#109891) | RFC/ADR governance; OIDC, RPC principals, shell policy | Fast model onboarding (DeepSeek V4 Flash); ACP | Dependency/runtime modernization |
| **Weak point** | Review bottleneck at scale; P0 update/gateway bugs | P1 storage cluster; profile lifecycle fragility | 0 PRs merged; decision queue dominates | Critical data-loss issues lack fix PRs | No visible product/user activity |

The clearest architectural split is **governance velocity vs. scope**: ZeroClaw invests heavily in process (RFC voting, review-evidence rules, ADR inventory) and security primitives, sacrificing throughput; OpenClaw invests in breadth and ships fastest but accumulates high-severity debt. Hermes and QwenPaw sit between, optimizing for desktop/production ergonomics.

---

## 6. Community Momentum & Maturity

**Tier 1 — Rapid iteration at scale (OpenClaw).** Highest churn, highest throughput, mature release infrastructure (doctor/rollback), but compounding P0/P1 debt and a visible maintainer decision backlog. Iterating faster than it is stabilizing.

**Tier 2 — Active and consolidating (Hermes, ZeroClaw).**
- *Hermes*: healthy contributor responsiveness (same-day fix PRs for #110180, #110417, #110419, #110425), duplicate PRs consolidated, 36% issue closure. Mid-maturity, stress-tested by real multi-profile deployments.
- *ZeroClaw*: highest process maturity and security rigor, but **0 merged PRs in 24h against 50 open** — governance is the critical path. High-quality reports (3 👍 on #10603) but stalled landing.

**Tier 3 — Early/expanding (QwenPaw).** Small volume (6 issues / 8 PRs) but 5 of 7 open PRs from first-time contributors — a widening funnel. Backlog moving (#4009, #3429 closed) but severe issues (#7724, #7571, #7709) have no fix PRs, indicating triage is misaligned with severity.

**Tier 4 — Dormant (IronClaw).** 0 issues updated, 5 Dependabot PRs only, one WASM group open since 2026-08-23 awaiting review. Stable but not evolving; effectively in maintenance mode.

**Maturity ranking:** ZeroClaw (process) > OpenClaw (infrastructure) > Hermes (contributor hygiene) > QwenPaw (early) > IronClaw (dormant).

---

## 7. Trend Signals

**For AI agent developers, the community feedback points to the following industry shifts:**

1. **Concurrency correctness is the new reliability frontier.** SQLite WAL/`state.db` handling under multi-process and multi-profile access is the single most shared failure mode (Hermes P1 cluster, OpenClaw WAL growth, ZeroClaw history loss, QwenPaw session loss). Design multi-instance safety into storage from day one; avoid synchronous I/O on the event loop.

2. **Output channels are security boundaries.** Leaks of internal tool-call text, runtime context, operator diagnostics, and unredacted credentials into user-visible channels are treated as top-severity (OpenClaw #25592, Hermes #107899/#110416). Enforce strict internal↔external output separation and redaction-by-default.

3. **Silent loss is unacceptable.** Lost subagent completions, dropped messages, discarded cron slots, and vanished sessions dominate high-engagement threads. Build at-least-once task delivery with retry, notification, timeout recovery, and explicit terminal-state bookkeeping.

4. **Context management is becoming agent-directed.** The ask has moved from fixed token thresholds to agent-participatory eviction with pre-eviction warnings (QwenPaw #7733, ZeroClaw #9535, OpenClaw #81182/#101929). Expect compaction/eviction policy to become a first-class, inspectable subsystem.

5. **Cost governance and provider reliability are product features.** Budget enforcement across delegated sub-loops, retry/backoff semantics, and fallback chains are recurring asks (ZeroClaw #10635/#10645/#10787, Hermes web-search fallback PRs, QwenPaw provider catalog). Multi-provider routing needs deterministic cost and failure semantics.

6. **Upgrade/install reliability defines production trust.** Recoverable updates, doctor prechecks, and rollback are now core surfaces (OpenClaw update/doctor stack, Hermes Windows installer, ZeroClaw packaging). Treat upgrades as a tested product path, not an afterthought.

7. **Maintainer decision bandwidth is the ecosystem's bottleneck.** OpenClaw's `needs-maintainer-review`/`needs-product-decision` labels, ZeroClaw's RFC decision queue (#8692), and Hermes' `needs-decision` items (#40239, #109891) all show that staged implementations wait on human rulings, not code. Projects that productize decision-making (clear triage SLAs, delegated ownership, severity-aligned fix assignment) will out-ship peers with equal contributor volume.

8. **Localization completeness signals maturity.** pt-BR Desktop (Hermes #40239, QwenPaw #4009→#7734) and Apple locales (OpenClaw #147590) indicate projects are expanding beyond English-first developer audiences — and exposing quality-control gaps when translation PRs merge with defects.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest
**Date: 2026-09-14** · Repo: [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
*Data note: 50 issues and 50 PRs were updated in the last 24h; this digest reflects the top 30 issues / 20 PRs by comment count that were included in the source data.*

---

## 1. Today's Overview

Project activity on 2026-09-14 was **high-volume and stability-dominated**. 50 issues were touched (32 still open, 18 closed — a 36% closure rate in the window) and 50 PRs moved (37 open, 13 merged/closed — 26%), with **no new release published**. The single most important signal is a cluster of **P1 `state.db` / `DeletedWalGenerationError` defects** ([#109727](https://github.com/NousResearch/hermes-agent/issues/109727), [#110106](https://github.com/NousResearch/hermes-agent/issues/110106), [#109946](https://github.com/NousResearch/hermes-agent/issues/109946)) that affects multi-process and multi-profile deployments, and which now has at least one mitigation PR open ([#110179](https://github.com/NousResearch/hermes-agent/pull/110179)). Secondary activity concentrated on Desktop multi-profile session metadata (two related issues closed), cron scheduling correctness, and a pt-BR localization request with a matching implementation PR. The open-PR queue (37) is growing relative to the merged/closed count, which is worth watching.

**Health snapshot:** thriving community throughput, but an accumulation of concurrency/persistence bugs at the storage layer suggests the project is being stress-tested by real multi-profile and multi-process deployments faster than fixes are landing.

---

## 2. Releases

**No new releases in the last 24 hours.** There is no version changelog, breaking-change, or migration note to report for this window.

---

## 3. Project Progress

### Issues closed / resolved (top visible by activity)
- [#102792](https://github.com/NousResearch/hermes-agent/issues/102792) **[CLOSED, P1]** — Desktop project-sidebar/tab "+" losing owner metadata on multi-profile installs → immediate "Couldn't open this session". 11 comments — one of the most-discussed items of the day.
- [#108369](https://github.com/NousResearch/hermes-agent/issues/108369) **[CLOSED, duplicate, P2]** — Same defect family: tab-strip "+" on a non-default profile mints an unlisted session, breaking `session.control.read`.
- [#62333](https://github.com/NousResearch/hermes-agent/issues/62333) **[CLOSED, P2]** — OAuth `refresh_token` erased on every refresh, killing OAuth-authenticated MCP servers ~1h after login. A long-lived (since 2026-07-10) security-boundary bug now closed.
- [#67358](https://github.com/NousResearch/hermes-agent/issues/67358) **[CLOSED, P3]** — Lark/Feishu WebSocket normal close (code 1000) crashing the whole gateway; graceful-disconnect handling resolved.
- [#108302](https://github.com/NousResearch/hermes-agent/issues/108302) **[CLOSED, P2]** — Managed Tool Gateway unavailable on bot profiles due to missing profile→global-root auth fallback.
- [#108862](https://github.com/NousResearch/hermes-agent/issues/108862) **[CLOSED, P1]** — Cron delivery legs >30s starving the fire-claim heartbeat, booking successful runs as failed.
- [#108549](https://github.com/NousResearch/hermes-agent/issues/108549) **[CLOSED, P3]** — Kanban notifier polling every 5s with no config gate.
- [#108383](https://github.com/NousResearch/hermes-agent/issues/108383) **[CLOSED, P2]** — Dashboard `/chat` sessions stuck on "Setup Required" while CLI worked.
- [#85209](https://github.com/NousResearch/hermes-agent/issues/85209) **[CLOSED, P3, 👍3]** — Model picker showing reasoning-effort levels a model does not support.

### PRs merged/closed
- [#85246](https://github.com/NousResearch/hermes-agent/pull/85246) **[CLOSED]** — `fix(reasoning)`: hides unsupported effort choices in Desktop/Dashboard model pickers (closes #85209).
- [#110359](https://github.com/NousResearch/hermes-agent/pull/110359) **[CLOSED, security]** — `fix(kanban)`: SQLite triggers rejecting status/result writes from non-canonical writers — a meaningful data-integrity hardening.
- [#110378](https://github.com/NousResearch/hermes-agent/pull/110378) **[CLOSED, duplicate]** — Windows installer shim resolution + managed `uv` self-heal (superseded by [#110421](https://github.com/NousResearch/hermes-agent/pull/110421)).
- [#28559](https://github.com/NousResearch/hermes-agent/pull/28559) **[CLOSED, duplicate]** — web_search fallback chain (superseded by [#23315](https://github.com/NousResearch/hermes-agent/pull/23315)).

**Net progress:** the day's measurable wins were in Desktop session metadata, MCP OAuth persistence, cron heartbeat correctness, Kanban write integrity, and model-picker UX. The two duplicated PRs closing into canonical ones (#110421, #23315) suggests maintainers are actively consolidating a noisy contribution queue.

---

## 4. Community Hot Topics

| Rank | Item | Comments / 👍 | Signal |
|---|---|---|---|
| 1 | [#40239](https://github.com/NousResearch/hermes-agent/issues/40239) pt-BR Desktop localization **[OPEN, needs-decision]** | 12 / 👍4 | Highest-engagement issue; users note backend/TUI already ship `locales/pt.yaml`, so this is a Desktop-completion gap. |
| 2 | [#102792](https://github.com/NousResearch/hermes-agent/issues/102792) multi-profile new-session failure **[CLOSED, P1]** | 11 / 👍0 | Multi-profile installs are a real, popular configuration. |
| 3 | [#109727](https://github.com/NousResearch/hermes-agent/issues/109727) second Hermes process unlinks live WAL **[OPEN, P1]** | 8 / 👍0 | Even read-only commands (`hermes sessions list`) can strand a running gateway. |
| 4 | [#62333](https://github.com/NousResearch/hermes-agent/issues/62333) MCP OAuth token erasure **[CLOSED]** | 5 / 👍0 | Auth durability across MCP integrations. |
| 5 | [#108369](https://github.com/NousResearch/hermes-agent/issues/108369) duplicate of Desktop session bug **[CLOSED]** | 5 / 👍0 | Reinforces #102792 as a systemic, not one-off, defect. |
| 6 | [#105427](https://github.com/NousResearch/hermes-agent/issues/105427) gateway lifecycle scanner false positives **[OPEN, P3]** | 4 / 👍0 | Guardrails rejecting benign Python collectors — false-positive friction for cron users. |
| 7 | [#109480](https://github.com/NousResearch/hermes-agent/issues/109480) Profiles broken in Web UI **[OPEN, needs-repro, P3]** | 4 / 👍0 | Profile switching fails to restart gateway / chat stays on `default`. |
| 8 | [#110106](https://github.com/NousResearch/hermes-agent/issues/110106) concurrent `tui_gateway` processes thrash WAL **[OPEN, P1]** | 4 / 👍0 | Sessions die silently mid-turn. |

**Underlying needs:** (a) **multi-profile support is first-class in users' minds but not yet robust in storage/lifecycle code**; (b) **concurrency safety around `state.db`** is now the top systemic concern; (c) **localization completeness** — users who already have backend translations want Desktop parity.

---

## 5. Bugs & Stability

Ranked by severity, based on issues updated or created on 2026-09-13/14.

### P1 — Critical
1. **[#109727](https://github.com/NousResearch/hermes-agent/issues/109727)** — On Linux, any other Hermes process opening `state.db` unlinks the live `-wal`/`-shm`; running gateway falls into `DeletedWalGenerationError`. *Fix PR exists:* [#110179](https://github.com/NousResearch/hermes-agent/pull/110179) ("refuse held state.db publish; replay diverted transcripts").
2. **[#110106](https://github.com/NousResearch/hermes-agent/issues/110106)** — Multiple concurrent `tui_gateway` processes on one profile thrash WAL retirement; agent sessions die silently mid-turn. Same defect class as above.
3. **[#109946](https://github.com/NousResearch/hermes-agent/issues/109946)** — Desktop/dashboard all-profile sidebar polling every profile's DB triggers deleted-WAL detection in **live** profile gateways. Directly attributable to the new Desktop sidebar behavior.
4. **[#102792](https://github.com/NousResearch/hermes-agent/issues/102792)** *(closed)* — Multi-profile session creation via "+" completely broken.

### P2 — High
5. **[#110170](https://github.com/NousResearch/hermes-agent/issues/110170)** — `_atomic_write` failure-cleanup trap is escaped one level too deep, so the temp file is never removed (`.hermes-tmp.*` litter). *Fix PR:* [#110180](https://github.com/NousResearch/hermes-agent/pull/110180).
6. **[#110412](https://github.com/NousResearch/hermes-agent/issues/110412)** — Off-tick cron fire claims a future occurrence identity, silently dropping that slot forever. *Fix PR:* [#110419](https://github.com/NousResearch/hermes-agent/pull/110419).
7. **[#107899](https://github.com/NousResearch/hermes-agent/issues/107899)** — Customer-facing WhatsApp chats receive operator-only diagnostics (turn-budget, verifier messages, provider errors, home-channel prompt) — 5 distinct leaks observed in production.
8. **[#108310](https://github.com/NousResearch/hermes-agent/issues/108310)** **[needs-repro]** — `browser_exec` with managed Nous gateway + real-profile routes to direct-API without creds, or launches a Chrome that dies pre-attach.
9. **[#110392](https://github.com/NousResearch/hermes-agent/issues/110392)** — Checkpoint store missing `refs/heads` is permanently broken; self-repair only runs after a successful gc → silent total loss of rollback.
10. **[#90683](https://github.com/NousResearch/hermes-agent/issues/90683)** **[needs-repro]** — Post-turn background review runs as a daemon thread; short-lived CLI/kanban workers kill it mid-request.
11. **[#109024](https://github.com/NousResearch/hermes-agent/issues/109024)** — Multiplexed Docker `MEDIA:` resolution falls back to ambient default profile, dropping valid attachments.

### P3 — Moderate
12. **[#110416](https://github.com/NousResearch/hermes-agent/issues/110416)** *(new today)* — **Session store persists credentials unredacted** in `content`, `tool_calls`, and `reasoning` even with `security.redact_secrets: true`, and approval suggestions re-print them. *Fix PR:* [#110425](https://github.com/NousResearch/hermes-agent/pull/110425) masks credentials in `hermes approvals suggest`.
13. **[#76947](https://github.com/NousResearch/hermes-agent/issues/76947)** **[needs-repro]** — Desktop renderer crash-loop (`exitCode=5`) on Linux + AMD RX 7900 XTX, persisting despite GPU disable and heap flags; open since 2026-08-02.
14. **[#105427](https://github.com/NousResearch/hermes-agent/issues/105427)** — Gateway lifecycle scanner false positives on Python directory literals / absolute interpreter binaries.
15. **[#110414](https://github.com/NousResearch/hermes-agent/issues/110414)** *(new today)* — iOS Safari: dashboard `/chat` jumps away from the input line when the keyboard opens. *Fix PR:* [#110417](https://github.com/NousResearch/hermes-agent/pull/110417).
16. **[#109949](https://github.com/NousResearch/hermes-agent/issues/109949)** — "One install per profile" lock in `tools/bot_desktop/install.py` is process-local, so CLI and Desktop can install concurrently.
17. **[#110402](https://github.com/NousResearch/hermes-agent/issues/110402)** **[needs-repro]** — Skill-adherence failure: agent ignores its own loaded skill files before acting.
18. **[#108088](https://github.com/NousResearch/hermes-agent/issues/108088)** — Bot Mode relay keeps a local backend alive forever on a remote-primary Desktop (30s WebSocket churn, composer/dictation focus loss).

**Assessment:** The WAL/`state.db` family is the clear stability priority — three P1s, one shared root cause, and one open mitigation PR. Notably, **fix PRs already exist for four of today's non-WAL bugs** (#110179, #110180, #110419, #110417), indicating healthy contributor responsiveness.

---

## 6. Feature Requests & Roadmap Signals

**Most likely to land next (issue + implementation already open):**
- **pt-BR Desktop localization** — [#40239](https://github.com/NousResearch/hermes-agent/issues/40239) (12 comments, 👍4, created 2026-06-06) paired with PR [#92590](https://github.com/NousResearch/hermes-agent/pull/92590) (adds `pt-BR` to `agent/i18n.py` + ~3,400 translated lines). Long-running and explicitly tagged `needs-decision`; backend and TUI already ship Portuguese, so this is the natural next completion step.
- **Custom `.env` / env-var key management in Desktop** — [#50390](https://github.com/NousResearch/hermes-agent/issues/50390) paired with PR [#110415](https://github.com/NousResearch/hermes-agent/pull/110415) (add-key form using the existing `GET/PUT /api/env` custom-category backend).
- **Web search/extract fallback chains** — PR [#68524](https://github.com/NousResearch/hermes-agent/pull/68524) (`web_extract` fallback chain, tagged `sweeper:blast-moderate`) and PR [#23315](https://github.com/NousResearch/hermes-agent/pull/23315) (`web.search_fallback_backends`). Driven by concrete limits like Brave Search's 2k/month free tier.
- **Reasoning-effort filtering in model pickers** — already closed via [#85246](https://github.com/NousResearch/hermes-agent/pull/85246); expect it in the next release.

**Architectural signal requiring a decision:**
- [#109891](https://github.com/NousResearch/hermes-agent/issues/109891) **[needs-decision]** — "Make the live local gateway a first-class Desktop backend," retaining `hermes serve` as a compatibility path until local Desktop parity and the remote Dashboard/URL/Cloud/SSH migration are ready. This is the highest-leverage roadmap question in the current queue, and it sits adjacent to the profile/lifecycle bugs above.

**Longer-horizon asks:**
- [#50390](https://github.com/NousResearch/hermes-agent/issues/50390) generalizes to "bring my own API/provider" workflows.
- [#109891](https://github.com/NousResearch/hermes-agent/issues/109891) implies Desktop becoming the primary control surface rather than a client.

---

## 7. User Feedback Summary

**Pain points (in users' own framing):**
- **Multi-profile installs are fragile.** Users report new-session creation from the sidebar/tab "+" failing outright, profiles failing to restart gateways in the Web UI ([#109480](https://github.com/NousResearch/hermes-agent/issues/109480)), and profile switching leaving chat bound to `default`. Two P1 issues were filed from this same surface.
- **Persistence and concurrency trust is eroding.** [#109727](https://github.com/NousResearch/hermes-agent/issues/109727) is striking because *running a read-only command* (`hermes sessions list`, `hermes insights --days 1`) destabilizes a live gateway. Users on VPS/multi-profile Linux deployments are the ones hit hardest.
- **Cron correctness.** Two separate cron issues in 24h ([#110412](https://github.com/NousResearch/hermes-agent/issues/110412) dropping future slots; [#108862](https://github.com/NousResearch/hermes-agent/issues/108862) mis-booking successful deliveries as failed, now closed) indicate automation paths still lack deterministic semantics.
- **Production/customer-facing deployment hygiene.** [#107899](https://github.com/NousResearch/hermes-agent/issues/107899) reports five distinct internal-diagnostic leaks into customer WhatsApp chats for a CS-agent use case — the strongest indicator yet that Hermes is being deployed in front of non-operator end users.
- **Secret handling.** [#110416](https://github.com/NousResearch/hermes-agent/issues/110416) reports a pasted Telegram bot token persisted verbatim in `state.db` despite `security.redact_secrets: true` — a compliance-adjacent concern.
- **Install friction on Windows.** The installer shim / managed-`uv` rerun bug generated a duplicate PR pair ([#110378](https://github.com/NousResearch/hermes-agent/pull/110378) closed → [#110421](https://github.com/NousResearch/hermes-agent/pull/110421) open), with a blocking rerun failure explicitly called out by a reviewer.
- **Minor but persistent UX nits.** iOS Safari keyboard/viewport handling on the dashboard ([#110414](https://github.com/NousResearch/hermes-agent/issues/110414)) and Desktop renderer crash-loops on AMD/Linux ([#76947](https://github.com/NousResearch/hermes-agent/issues/76947)).

**Satisfaction signals:** contributors are submitting timely, well-scoped fix PRs against the same day's issues (#110180, #110417, #110419, #110425), and duplicated PRs are being consolidated rather than abandoned — a sign of an engaged, responsive contributor base. Reaction counts are low overall (only #40239 at 👍4 and #85209 at 👍3 register), suggesting the community communicates through issues and PRs rather than reactions.

---

## 8. Backlog Watch

Items needing maintainer attention — oldest or highest-impact unresolved:

| Item | Age | Status | Why it matters |
|---|---|---|---|
| [PR #23315](https://github.com/NousResearch/hermes-agent/pull/23315) — web search fallback chain | Created 2026-05-10 (~4 months) | Open, `sweeper:risk-compatibility`, `blast-moderate` | Oldest open PR in the sample; duplicate work already had to be closed (#28559). |
| [Issue #40239](https://github.com/NousResearch/hermes-agent/issues/40239) — pt-BR Desktop localization | Created 2026-06-06 (~100 days) | Open, `needs-decision`, top issue by comments (12) and reactions (👍4) | A matching implementation PR (#92590) is already open — the blocker looks like a decision, not effort. |
| [Issue #50390](https://github.com/NousResearch/hermes-agent/issues/50390) — customizable env variables in Desktop | Created 2026-06-21 (~85 days) | Open, P3 feature | Implementation PR (#110415) opened 2026-09-14; ready for triage. |
| [PR #68524](https://github.com/NousResearch/hermes-agent/pull/68524) — configurable fallback chain for `web_extract` | Created 2026-07-21 (~8 weeks) | Open, `sweeper:blast-moderate` | Same class as #23315; two related PRs pending suggests a pending design call on fallback semantics. |
| [Issue #76947](https://github.com/NousResearch/hermes-agent/issues/76947) — Desktop renderer crash-loop on Linux + AMD | Created 2026-08-02 (~6 weeks) | Open, `needs-repro` | Recurring hard crash with no reproduction path established; hard to close without hardware-specific triage. |
| [Issue #90683](https://github.com/NousResearch/hermes-agent/issues/90683) — post-turn background review killed by process exit | Created 2026-08-20 (~3.5 weeks) | Open, P2, `needs-repro` | Silently wastes full-context replays on every short-lived CLI/kanban run. |
| [Issue #108310](https://github.com/NousResearch/hermes-agent/issues/108310) — `browser_exec` routing with managed Nous gateway | Created 2026-09-11 | Open, P2, `needs-repro` | Two independent failure modes; blocks managed-gateway browser workflows. |
| [Issue #109891](https://github.com/NousResearch/hermes-agent/issues/109891) — live local gateway as first-class Desktop backend | Created 2026-09-13 | Open, `needs-decision` | Roadmap-level question that shapes how the Desktop/profile bugs above should ultimately be fixed. |

**Recommendation for maintainers:** prioritize (1) merging or closing the WAL mitigation PR #110179 and resolving the #109727 / #110106 / #109946 family, since it is the only multi-P1 cluster with a shared root cause; (2) resolving the `needs-decision` tags on #40239 and #109891, where implementation or architecture is already staged; and (3) clearing the duplicated web-fallback PR queue (#23315 / #68524) with a single design ruling.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-14

## 1. Today's Overview
IronClaw showed low, maintenance-only activity in the last 24h: **0 issues updated**, **5 PRs updated** (4 open, 1 closed/merged), and **0 new releases**. All updated PRs are automated **Dependabot dependency-maintenance** branches covering Rust crates, GitHub Actions, Tokio ecosystem components, and WASM runtime/tooling. The only closed item was [PR #8097](https://github.com/nearai/ironclaw/pull/8097), an earlier “everything-else” dependency bump that appears superseded by the newer open [PR #8099](https://github.com/nearai/ironclaw/pull/8099). No bugs, feature requests, or user discussions were reported in the supplied data. Overall project health looks stable but quiet, with dependency hygiene as the main visible workstream.

## 2. Releases
No new releases in this window.

## 3. Project Progress
- [PR #8097](https://github.com/nearai/ironclaw/pull/8097) — **CLOSED** — Dependabot “everything-else” group with 24 updates. It was closed after being updated on 2026-09-13, likely superseded by #8099.
- [PR #8099](https://github.com/nearai/ironclaw/pull/8099) — **OPEN** — Dependabot “everything-else” group with 25 updates, including `uuid` `1.24.0` → `1.26.1`, `base64` `0.22.1` → `0.23.1`, and `rust_decimal`.
- [PR #8079](https://github.com/nearai/ironclaw/pull/8079) — **OPEN** — GitHub Actions group with 6 updates, including `anthropics/claude-code-action` `1.0.183` → `1.0.221` and `actions/setup-node` `4.0.2` → `7.0.0`.
- [PR #8078](https://github.com/nearai/ironclaw/pull/8078) — **OPEN** — Tokio ecosystem group with 2 updates: `tower-http` `0.7.0` → `0.7.1` and `tokio-tungstenite`.
- [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — **OPEN** — WASM group with 4 updates: `wasmtime`, `wasmtime-wasi`, `wit-component`, and `wit-parser`. Tagged `size: L`, `risk: medium`.

**Net progress:** No product features or fixes advanced. The visible progress is dependency-maintenance churn.

## 4. Community Hot Topics
No hot topics were identified. All five updated PRs have **0 👍** and comment counts were not supplied/available. There were **0 updated issues**, so there was no issue discussion to rank.

Most visible dependency PRs by age/attention:
- [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — WASM group, open since 2026-08-23.
- [PR #8079](https://github.com/nearai/ironclaw/pull/8079) — GitHub Actions group, open since 2026-09-06.
- [PR #8078](https://github.com/nearai/ironclaw/pull/8078) — Tokio ecosystem group, open since 2026-09-06.

**Underlying need:** Routine maintainer review/merge of dependency PRs, especially major-version updates and higher-risk WASM changes.

## 5. Bugs & Stability
No bugs, crashes, or regressions were reported in the last 24h. No bug-fix PRs were present in the data.

Potential stability-relevant items:
- [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — `size: L`, `risk: medium`; WASM runtime/tooling updates are the highest-risk dependency group listed.
- [PR #8079](https://github.com/nearai/ironclaw/pull/8079) — includes major GitHub Actions bumps such as `actions/setup-node` `4.0.2` → `7.0.0`.
- [PR #8099](https://github.com/nearai/ironclaw/pull/8099) — includes `base64` `0.22.1` → `0.23.1`, which may require compatibility checks.

No incident reports or fix PRs are associated with these updates.

## 6. Feature Requests & Roadmap Signals
No feature requests were recorded because there were **0 issues updated** and no user-facing PRs in the window.

Roadmap signals are limited to dependency modernization:
- Rust crate updates via [PR #8099](https://github.com/nearai/ironclaw/pull/8099)
- GitHub Actions updates via [PR #8079](https://github.com/nearai/ironclaw/pull/8079)
- Tokio ecosystem updates via [PR #8078](https://github.com/nearai/ironclaw/pull/8078)
- WASM runtime/tooling updates via [PR #7834](https://github.com/nearai/ironclaw/pull/7834)

Prediction: if the next release occurs, it is likely to be maintenance-oriented and include some subset of these dependency updates, rather than new user-facing features, based on the available data.

## 7. User Feedback Summary
No user feedback was available in the last 24h. There were no updated issues, no user-authored PRs, and no visible comments or reactions on the dependency PRs. As a result, real user pain points, use cases, satisfaction, and dissatisfaction cannot be assessed from this dataset. All observed activity is bot-generated dependency maintenance.

## 8. Backlog Watch
- [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — **Highest backlog concern.** Open since 2026-08-23, updated 2026-09-13, tagged `size: L` and `risk: medium`. WASM dependency group needs maintainer review.
- [PR #8079](https://github.com/nearai/ironclaw/pull/8079) — Open since 2026-09-06. GitHub Actions group with major updates, including `actions/setup-node` `4.0.2` → `7.0.0`.
- [PR #8078](https://github.com/nearai/ironclaw/pull/8078) — Open since 2026-09-06. Tokio ecosystem updates; likely lower risk but still awaiting merge.
- [PR #8099](https://github.com/nearai/ironclaw/pull/8099) — Newer “everything-else” bump with 25 updates; supersedes closed [PR #8097](https://github.com/nearai/ironclaw/pull/8097).

**Maintainer attention needed:** review and merge/reject the open Dependabot PRs, especially the long-open WASM group and the major GitHub Actions bump.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-14

*Data source: github.com/agentscope-ai/QwenPaw | Window: trailing 24 hours*

---

## 1. Today's Overview

QwenPaw recorded moderate, steady activity on 2026-09-14: 6 issues and 8 PRs updated in the last 24 hours, with no new releases. Five of the seven open PRs come from first-time contributors, which signals a healthy and widening contributor funnel. The discussion mix is heavily weighted toward **reliability and persistence** — the two most-commented issues (#7571 memory retention, #7724 session loss) both describe agent state being silently lost, which is a recurring theme rather than an isolated incident. The backlog is tilting toward context/memory architecture (#7733, #7571) and UI ergonomics (#7739) rather than new feature delivery. One long-lived PR (#4009, pt-BR locale, open since May) was closed, with a corrective follow-up already filed.

**Activity assessment:** Moderate-to-high community engagement, low release cadence, and elevated stability risk concentrated in memory/session handling.

---

## 2. Releases

No new releases were published in the last 24 hours (latest reported versions in the wild: **v2.2.0 / v2.2.1**). No breaking changes, migration notes, or version-specific regressions to report.

---

## 3. Project Progress

**Closed / merged items**
- **#4009** — `feat(i18n): add Brazilian Portuguese (pt-BR) locale support` ([link](https://github.com/agentscope-ai/QwenPaw/pull/4009)). Open since 2026-05-02 and finally closed on 2026-09-13. This is a long-overdue closure (~4.5 months), but the merged artifact had defects.
- **#3429** — `[Feature]: Pre-install himalaya and other commonly used CLI tools in Docker image` ([link](https://github.com/agentscope-ai/QwenPaw/issues/3429)). Closed on 2026-09-13 after being opened 2026-04-15 — a notable backlog cleanup and an operational win for Docker users who previously reinstalled tooling on every rebuild.

**In-flight work advancing**
- **#7734** — `fix(i18n): complete pt-BR translation and repair broken strings from #4009` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7734)). Brings pt-BR to full key parity with `en.json` (from 3,860/4,275 keys).
- **#7736** — `feat(providers): add DeepSeek V4 Flash capabilities` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7736)). Adds 1M-token input window, image input, and reasoning-effort support to the packaged provider catalog.
- **#7732** — `fix(acp): select permission options by protocol kind` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7732)). Fixes ACP sessions falling back to interactive prompts for safe tool calls.
- **#7632** — `fix(runtime): return feedback for unknown slash commands` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7632)). Most recently touched PR (2026-09-14); open since 2026-09-08.

---

## 4. Community Hot Topics

| Rank | Item | Comments | Type | Link |
|---|---|---|---|---|
| 1 | #7571 — Agent "总是记不住" (instructions forgotten) | 4 | Question / reliability | [Issue #7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) |
| 2 | #7724 — 会话丢失 (session loss) | 3 | Bug | [Issue #7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) |
| 3 | #7709 — Scheduled tasks produce no output; results folded into steps/thinking | 2 | Bug | [Issue #7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) |
| 4 | #7632 — Unknown slash-command feedback | n/a (updated 09-14) | PR | [PR #7632](https://github.com/agentscope-ai/QwenPaw/pull/7632) |

**Underlying needs analysis:** All three top issues are the same user-facing complaint in different guises — *the agent does not reliably retain or surface state*. #7571 is about instruction persistence across paths (source dir A vs. runtime dir C, recurring TODO-file rule violations); #7724 is about conversation/model-configuration state vanishing entirely; #7709 is about task output being rendered invisibly inside thinking/steps. Together they suggest the community's dominant unmet need is **deterministic, observable state management** — not more capabilities. Note that most items carry 0 👍 reactions, so issue volume is being driven by a small number of vocal power users rather than broad upvoting.

---

## 5. Bugs & Stability

Ranked by severity (data-loss and silent-failure first):

1. **🔴 #7724 — Session loss (critical, data loss)** — [link](https://github.com/agentscope-ai/QwenPaw/issues/7724). Windows 10, desktop v2.2.1. A completed conversation (9 PM) disappeared from Control → Sessions after a plugin redeploy/shutdown interruption; model configuration was also lost (later restored by re-selecting). User reports this as a repeat occurrence (cross-references #7708). **No fix PR exists.** This is the highest-risk item on the board.
2. **🟠 #7571 — Agent forgets instructions / scope drift (high)** — [link](https://github.com/agentscope-ai/QwenPaw/issues/7571). Agent repeatedly ignores path-scoped rules for TODO file creation and edits runtime directory C instead of source directory A, causing automated deploys to overwrite runtime code. Cross-session, reproducible "several times." **No fix PR exists.** Directly tied to the context-management gap in #7733.
3. **🟡 #7709 — Scheduled tasks emit no visible output (medium)** — [link](https://github.com/agentscope-ai/QwenPaw/issues/7709). v2.2.1. Results are folded into steps/thinking or omitted entirely; also affects normal conversations intermittently. Output-rendering/streaming bug. **No fix PR exists.**
4. **🟡 #7738 — `TypeError` on unrecognized kwargs in OpenAI `completions.create()` (medium, crash)** — [link](https://github.com/agentscope-ai/QwenPaw/pull/7738). Middleware/proxy-injected kwargs (e.g. `streamIdleTimeoutMs`) crash provider calls. **Fix PR open.**
5. **🟡 #7735 — MCP HTTP error responses corrupted (medium)** — [link](https://github.com/agentscope-ai/QwenPaw/pull/7735). Stale body-framing headers cause double decompression, destroying useful error detail. **Fix PR open (Fixes #7716).**
6. **🟢 #7732 — ACP permission prompts misfired (low-medium, UX/security-adjacent)** — [link](https://github.com/agentscope-ai/QwenPaw/pull/7732). Safe tool calls fell back to interactive prompts because IDs (not protocol `kind`) were matched. **Fix PR open.**
7. **🟢 #7734 — Broken/defective pt-BR strings (low)** — [link](https://github.com/agentscope-ai/QwenPaw/pull/7734). Rule-based translation pass left classes of defects. **Fix PR open.**

**Pattern:** The three most severe issues (#7724, #7571, #7709) have **no corresponding fix PRs**, while the medium/low items are all actively being fixed. Maintainer attention is currently misaligned with severity.

---

## 6. Feature Requests & Roadmap Signals

| Item | Request | Likely Next-Version Signal |
|---|---|---|
| **#7733** — Agent-autonomous context management ([link](https://github.com/agentscope-ai/QwenPaw/issues/7733)) | Let the agent participate in context eviction/compaction decisions (currently a pure token threshold) and warn before eviction so work survives a "smooth handover." | **Strong candidate for the next architectural cycle.** Directly addresses #7571's root cause; likely multi-release effort. |
| **#7739** — Move history panel to the right ([link](https://github.com/agentscope-ai/QwenPaw/issues/7739)) | Left-side crowding collapses content on 14" laptops; requests a right-hand history option. | **Low-effort UI win**, plausible for a near-term patch. |
| **#7736** — DeepSeek V4 Flash capabilities ([link](https://github.com/agentscope-ai/QwenPaw/pull/7736)) | 1M-token context, image input, reasoning-effort values in the provider catalog. | Provider-catalog expansion is clearly ongoing; expect continued model onboarding. |
| **#7737** — Multi-agent collaboration trigger keywords ([link](https://github.com/agentscope-ai/QwenPaw/pull/7737)) | Recognize user phrasings for team collaboration on the first turn instead of retry-after-interruption. | Signals investment in multi-agent UX; likely landing soon. |
| **#3429** — Pre-installed CLI tools in Docker (closed) | Shipped/closed — roadmap item complete. | Establishes precedent for bundled tooling in official images. |

**Prediction:** The highest-probability near-term ship is the provider/UX batch (#7736, #7737, #7739, #7738, #7735, #7732, #7734). The highest-impact item is #7733, but it is architectural and unlikely to land in a patch release.

---

## 7. User Feedback Summary

**Pain points, in users' own framing:**
- *"我不知道怎么解决了"* ("I don't know how to solve this anymore") — plugin developer `xiaohushi512` on #7571, describing repeated instruction/scope failures and destructive deploys. This is frustration with **trustworthiness**, not features.
- *"对话完全找不到了"* ("The conversation is completely gone") — same user on #7724, after a plugin redeploy disrupted a session. Recurrence (issue #7708 referenced) amplifies dissatisfaction.
- `tina0501853` on #7709: scheduled tasks are effectively unusable for automation when output only appears inside thinking, or never appears.
- `sysweekup` on #7739: Web UI is unusable on a 14" laptop due to left-column crowding — a concrete ergonomics complaint.

**Use cases surfaced:** local plugin development with source-vs-runtime deployment workflows; scheduled/automated background tasks; desktop usage on mid-size laptops; long-context agent work requiring compaction (#7733).

**Sentiment:** Users are engaged and technically sophisticated, but confidence in persistence (memory, sessions, config) is eroding. Positively, community contribution sentiment is strong — 5 first-time contributors have PRs open, indicating newcomers still find the project approachable.

---

## 8. Backlog Watch

- **#7632** — [PR, first-time contributor](https://github.com/agentscope-ai/QwenPaw/pull/7632). Open since **2026-09-08 (6 days)** and touched again on 09-14 with no visible merge. First-time contributor PRs stalling is a retention risk; recommend a review pass.
- **#7571** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7571). Open since **2026-09-05**, 4 comments, no linked fix PR, no maintainer resolution path. High user impact, aging without owner.
- **#7724** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7724). Open since **2026-09-12**, references prior issue #7708 — this is a **repeat report**, meaning the underlying defect was never root-caused. Escalation warranted.
- **#7709** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7709). Open since **2026-09-11**, no fix PR; output-rendering bug affects both scheduled and interactive flows.
- **#7733** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7733). Recently filed (09-13) but design-heavy; needs a maintainer response to avoid becoming a long-unanswered architectural request.
- **#4009 / #7734** — [PR #7734](https://github.com/agentscope-ai/QwenPaw/pull/7734) is remediating a locale shipped via #4009 that was "produced with a rule-based dictionary pass and merged with defects." Worth a process retrospective: a 4.5-month-old PR with known quality issues still merged. Verify #7734 lands before regressions reach users.

**Health note:** Closures of #4009 and #3429 on 09-13 show backlog is moving, but the concentration of unresolved **state-persistence defects** without fix PRs is the single most important signal for maintainers this week.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-14

Data window: last 24h, based on GitHub activity from `zeroclaw-labs/zeroclaw`. Latest updates shown are 2026-09-13/14.

## 1. Today's Overview

ZeroClaw remains highly active but merge/release throughput is stalled: 37 issues and 50 PRs were updated in the last 24h, with no new releases and **zero PRs merged or closed**. Issue activity is concentrated in governance/RFC trackers, security/runtime stability bugs, and provider reliability work. Five issues were closed, which indicates some resolution progress, but the 50 open PRs and many `needs-maintainer-review` / `needs-author-action` labels suggest a review and decision bottleneck. Overall project health is strong in engagement and security focus, but today’s lack of landed code is a caution signal.

## 2. Releases

No new releases were published in the last 24h. The latest release context remains around the v0.8.5 stabilization line tracked in [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459).

## 3. Project Progress

**No PRs were merged or closed today** (`open: 50, merged/closed: 0`). No feature code landed through the PR pipeline in this window.

Closed issues today:
- [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — `knowledge.db_path` tilde expansion bug; closed.
- [#10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324) — cron manual trigger/run-history check-then-act across agent rename; closed.
- [#10580](https://github.com/zeroclaw-labs/zeroclaw/issues/10580) — docs links gate expanded to repo-wide dangling internal links; closed.
- [#10533](https://github.com/zeroclaw-labs/zeroclaw/issues/10533) — `model_routing_config` rejecting `custom.*` provider slots; closed.
- [#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) — RPC `config/set` persisting values that `Config::validate()` rejects; closed, though related [#10320](https://github.com/zeroclaw-labs/zeroclaw/issues/10320) remains open.

Notable open PRs advancing work, but not yet merged:
- [#10843](https://github.com/zeroclaw-labs/zeroclaw/pull/10843) — Telegram `add_reaction`/`remove_reaction` implementation and loud failure on unsupported channels.
- [#10840](https://github.com/zeroclaw-labs/zeroclaw/pull/10840) — generate `llms.txt` / `llms-full.txt` in mdBook build.
- [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) — OIDC token-verification provider.
- [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) — authenticated RPC principals with native + peercred.
- [#10610](https://github.com/zeroclaw-labs/zeroclaw/pull/10610) — shell V1 permission policy.
- [#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596) — paginated persisted ACP transcripts.
- [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — multiple models per provider profile.
- [#10245](https://github.com/zeroclaw-labs/zeroclaw/pull/10245) — daemon supervised error-chain preservation.
- [#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753) — distinguish absent vs empty risk-profile `allowed_tools`.

## 4. Community Hot Topics

PR comment/reaction counts were not provided in the dataset, so issue ranking below uses comment counts; PR selection uses recency, risk labels, and maintainer-review status.

Most active issues:
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — Maintainer decision queue for RFCs and design issues. 15 comments. Underlying need: a clear, prioritized maintainer decision process.
- [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC: simplify RFC voting by removing mandatory discussion windows and making REVISE stop the current snapshot. 10 comments. Underlying need: reduce process friction while preserving review quality.
- [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) — RFC: clarify PR review evidence, freshness warnings, and author-action boundaries. 7 comments. Underlying need: predictable review expectations and less ambiguity for contributors.
- [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — RPC dispatcher runs within 2% of its 2 MB stack guard on Windows. 7 comments. Underlying need: Windows CI reliability and runtime stack safety.
- [#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381) — crates.io publishing, packaging, and cargo-install follow-ups. 5 comments. Underlying need: smoother distribution and Windows checkout support.
- [#10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360) — RFC: opt-in household edge mesh with pull workers and signed receipts. 4 comments. Underlying need: multi-device, local-first scaling beyond one host.
- [#10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) — SOP engine promotes/runs later steps before recording output-schema rejection. 4 comments. Underlying need: deterministic workflow execution and fail-fast behavior.

Notable active PRs:
- [#10283](https://github.com/zeroclaw-labs/zeroclaw/pull/10283) — docs: Build Remote Agent phone pairing.
- [#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753) — config: risk-profile `allowed_tools` semantics.
- [#10245](https://github.com/zeroclaw-labs/zeroclaw/pull/10245) — daemon supervised error chains.
- [#10843](https://github.com/zeroclaw-labs/zeroclaw/pull/10843) — Telegram reactions.
- [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) — OIDC provider.
- [#10840](https://github.com/zeroclaw-labs/zeroclaw/pull/10840) — llms.txt generation.
- [#10610](https://github.com/zeroclaw-labs/zeroclaw/pull/10610) — shell V1 permission policy.
- [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) — persistent session prompt attachments.

Analysis: the community is pushing on three fronts — governance/process clarity, security/identity boundaries, and runtime/provider reliability. The maintainer decision queue tracker and RFC voting discussions dominate comments, indicating that process design is currently a first-order blocker to progress.

## 5. Bugs & Stability

Ranked by severity and impact, based on issue labels and summaries:

| Severity | Issue | Status | Summary | Fix PR status |
|---|---|---|---|---|
| P0 / S1 | [#10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | Open, accepted | SOP engine promotes and runs later steps before recording a step’s output-schema rejection. Workflow blocked. | No explicitly linked fix PR in sample. |
| P1 | [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | Open, in progress | `RpcDispatcher::process_line` runs within 2% of 2 MB stack guard; Windows stack overflow surfaces in advisory nextest. | No explicitly linked fix PR in sample. |
| P1 | [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | Open, in progress | OpenCode providers never send `x-opencode-session`, breaking Go models and risking account flags. 3 👍. | No explicitly linked fix PR in sample. |
| P1 | [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) | Open, in progress | Failed Code/ACP turn discards accepted prompt and completed tool exchanges from durable history. | No explicitly linked fix PR in sample. |
| P1 | [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) | Open, accepted | Runtime profile cost limit does not reflect effective global daily budget. | No explicitly linked fix PR in sample. |
| P1 | [#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645) | Open, accepted | Delegated sub-loops do not consistently run under scoped cost-tracking context. | No explicitly linked fix PR in sample. |
| P1 | [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) | Open, in progress | ZeroCode notification lag cancels every running turn via `begin_notification_resync → session/cancel`. | No explicitly linked fix PR in sample. |
| P1 | [#10828](https://github.com/zeroclaw-labs/zeroclaw/issues/10828) | Open, accepted | `openai-codex --device-code` uses obsolete/incorrect OpenAI device auth endpoint and returns 404. | No explicitly linked fix PR in sample. |
| P2 | [#10320](https://github.com/zeroclaw-labs/zeroclaw/issues/10320) | Open, in progress | `config set` and RPC `config/set` persist values without running validation. Related [#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) closed today. | Possibly partial/duplicate with closed #10837. |
| P2 | [#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) | Open, accepted | Pre-output stream failure skips advertised non-streaming fallback. | No explicitly linked fix PR in sample. |
| P2 | [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) | Open, in progress | Single-candidate stream recovery ignores `provider_retries`; 529 overload gets one immediate retry with no backoff. | No explicitly linked fix PR in sample. |
| P2 | [#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779) | Open | OpenCode `FreeUsageLimitError` 429 retried with sub-second backoff instead of failing fast. | No explicitly linked fix PR in sample. |
| P2 | [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793) | Open, in progress | Three Windows-only test failures on advisory job with no change to code under test. | No explicitly linked fix PR in sample. |
| P2 | [#10821](https://github.com/zeroclaw-labs/zeroclaw/issues/10821) | Open, accepted | `zeroclaw service logs` shows stale stderr as current; service-installed daemon emits no tracing without `--verbose`. | No explicitly linked fix PR in sample. |
| P3 | [#10802](https://github.com/zeroclaw-labs/zeroclaw/issues/10802) | Open, accepted | `session/list-acp` reports different `message_count` than `turn_end` for same session. | No explicitly linked fix PR in sample. |

Closed bugs today:
- [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — tilde expansion in `knowledge.db_path`.
- [#10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324) — cron manual trigger/run-history check-then-act.
- [#10533](https://github.com/zeroclaw-labs/zeroclaw/issues/10533) — `model_routing_config` provider slot validation divergence.
- [#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) — RPC `config/set` validation gap.

Adjacent stability/security PRs open: [#10245](https://github.com/zeroclaw-labs/zeroclaw/pull/10245), [#10838](https://github.com/zeroclaw-labs/zeroclaw/pull/10838), [#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753), [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337), [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819).

## 6. Feature Requests & Roadmap Signals

Process and governance:
- [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — simplify RFC voting.
- [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) — clarify PR review evidence and author-action boundaries.
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — maintainer decision queue.
- [#8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691) — ADR inventory and accepted RFC decision records.

Security and identity:
- [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) — OIDC token-verification provider.
- [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) — authenticated RPC principals.
- [#10610](https://github.com/zeroclaw-labs/zeroclaw/pull/10610) — shell V1 permission policy.
- [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) — egress grant ceremony for plugin install/list.
- [#10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360) — opt-in household edge mesh with signed receipts.

Runtime, provider, and platform:
- [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — multiple models per provider profile.
- [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — native Hailo-Ollama support.
- [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) — anchor context compaction to model window ratio.
- [#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596) — paginated persisted ACP transcripts.
- [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) — persistent session prompt attachments.
- [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) — declarative skill auto-activation.

Configuration and UX:
- [#10822](https://github.com/zeroclaw-labs/zeroclaw/issues/10822) — `config/set-many` atomic batch config mutation.
- [#10826](https://github.com/zeroclaw-labs/zeroclaw/issues/10826) — explicit ZeroCode session root selection and preservation.
- [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) — WhatsApp PDF thumbnails.
- [#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381) — crates.io publishing and packaging follow-ups.

Likely next-version candidates: security/auth stages, config validation and atomic mutation, provider reliability, ZeroCode/ACP fixes, docs/CI improvements, and possibly Telegram reaction support. Large XL features such as OIDC/RPC auth, shell permission policy, multi-model provider profiles, and edge mesh may slip beyond the immediate next cut unless maintainer review accelerates.

## 7. User Feedback Summary

Real pain points surfaced in this window:
- Config safety: users and maintainers report that `config set` and RPC `config/set` can persist invalid values without validation.
- Provider compatibility: OpenCode session headers, OpenAI Codex device auth, 429 quota handling, and streaming fallback behavior are recurring friction points.
- Cost governance: runtime profiles can misreport daily budget limits, and delegated sub-loops may escape scoped cost enforcement.
- Reliability and diagnostics: Windows stack overflows, Windows-only test failures, stale service logs, and ZeroCode turn cancellations reduce confidence in runtime stability.
- Workflow correctness: SOP engine step promotion before schema rejection blocks workflows.
- Channel UX: WhatsApp documents lack thumbnails; Telegram reactions were previously fabricated as successful.

Use cases visible in the data include local-first multi-device deployments, household edge meshes, OpenCode/OpenAI-compatible providers, long-running ZeroCode/ACP sessions, delegated agent loops, and channel integrations such as WhatsApp and Telegram. Satisfaction signals include detailed bug reports and 3 👍 on [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603). Dissatisfaction signals include many `needs-author-action`, `needs-maintainer-review`, and `status:blocked` labels, plus zero merged PRs today.

## 8. Backlog Watch

Long-unanswered or high-importance items needing maintainer attention:

- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — Maintainer decision queue tracker, created 2026-07-04, 15 comments.
- [#8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691) — ADR inventory and accepted RFC decision records, created 2026-07-04.
- [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) — Skills declarative auto-activation, created 2026-07-11, `needs-author-action`, `stacked`.
- [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — Native Hailo-Ollama support, created 2026-07-17, `status:blocked`, `do-not-merge`.
- [#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381) — crates.io publishing/packaging follow-ups, created 2026-07-26.
- [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) — v0.8.5 finite weekly stabilization tracker, created 2026-07-27.
- [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) — Context compaction anchored to model window ratio, created 2026-07-29, `needs-author-action`.
- [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) — Egress grant ceremony for plugin install/list, created 2026-07-31.
- [#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753) — Risk-profile `allowed_tools` semantics, created 2026-08-04.
- [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — Multiple models per provider profile, created 2026-08-07, `needs-author-action`.
- [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) — Multimodal image validation, created 2026-08-07, `needs-author-action`.
- [#10245](https://github.com/zeroclaw-labs/zeroclaw/pull/10245) — Daemon supervised error chains, created 2026-08-22.
- [#10283](https://github.com/zeroclaw-labs/zeroclaw/pull/10283) — Docs: Build Remote Agent phone pairing, created 2026-08-23.
- [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) — Honor allowed roots for git operations, created 2026-08-25, `needs-author-action`.
- [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) — Persistent session prompt attachments, created 2026-08-27, `needs-author-action`.

The main health risk is not lack of activity — it is review throughput. With 50 open PRs, 0 merged/closed today, and multiple high-risk XL PRs waiting, maintainer bandwidth and decision-making appear to be the critical path for ZeroClaw’s near-term progress.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*