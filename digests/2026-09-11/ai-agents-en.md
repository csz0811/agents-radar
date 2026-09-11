# OpenClaw Ecosystem Digest 2026-09-11

> Issues: 421 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-11 00:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-11

*Source: github.com/openclaw/openclaw. Figures reflect the rolling 24h window; issue/PR detail is drawn from the top items by comment count (top 50 issues, top 30 PRs), so long-tail activity is under-represented.*

---

## 1. Today's Overview

OpenClaw remains a very high-velocity project: 421 issues and 500 PRs were touched in 24 hours, with 264 PRs merged/closed and 186 issues closed against 235 still-active issues — roughly a 44% close rate on issues and 53% on PRs, indicating strong triage throughput rather than runaway backlog growth. One release shipped: **v2026.6.35**, the final June 2026 Extended Stable (LTS) release, which closes out the legacy LTS line while the mainline sits on 2026.9.x. Stability discussion is dominated by three recurring clusters — **SQLite/storage exhaustion** (unbounded tables, lock contention and long event-loop stalls), **Windows gateway lifecycle** (restart/install/service behavior), and **message delivery reliability** across Telegram, Teams and WebChat. Health assessment: maintenance responsiveness is good (many P1 items now carry `clawsweeper:queueable-fix` PRs and reproducible source traces), but there is meaningful accumulated stability debt in the persistence and memory-core subsystems that is affecting production, self-hosted deployments.

---

## 2. Releases

### v2026.6.35 — final June 2026 Extended Stable (LTS) release
- **Highlights (as published):** safer provider and channel boundaries — bundled providers and channel adapters now bound untrusted response bodies, reject oversized inputs before expensive work, and preserve safe recovery when transport fails.
- **Breaking changes / migration notes:** none stated in the published notes (release text was truncated in the source data). The material migration signal is lifecycle, not code: **this is the last June 2026 LTS release**, so LTS-pinned deployments should plan a move to the newer stable line.
- **Caution for upgrade planning:** the current stable line is not friction-free. [#142585](https://github.com/openclaw/openclaw/issues/142585) (P0) reports 2026.9.3 Doctor refusing valid legacy workspace/attestation state during upgrade from 2026.7.1-2, and [#136183](https://github.com/openclaw/openclaw/issues/136183) (P1) reports an SSH-hang regression introduced in 2026.8.1 and persisting in 2026.8.2. Teams migrating off June LTS should validate against 2026.9.x first.

---

## 3. Project Progress

Notable items closed or merged in the window (264 PRs merged/closed, 186 issues closed total):

- **[#139714](https://github.com/openclaw/openclaw/issues/139714) (CLOSED, P2) — `openclaw status` stuck on "update in progress" forever.** An `update_runs` row admitted by the post-core update resume child could never be finalized. Fix removes a persistent false-state in update reporting.
- **[#132762](https://github.com/openclaw/openclaw/issues/132762) (CLOSED, P1, diamond lobster) — overflow retry ending successfully on a tool result without final delivery.** A message-loss class bug in multi-stage document workflows; closed with a clear fix shape.
- **[#101763](https://github.com/openclaw/openclaw/issues/101763) (CLOSED, P0) — Hosted Molty model selector not persisting**, caused the dotted `claude-opus-4.8` id to be sent to Anthropic and every reply to fail. High-impact hosted-provider fix.
- **[#90711](https://github.com/openclaw/openclaw/issues/90711) (CLOSED) — launchd plist `StandardErrorPath` hardcoded to `/dev/null`**, which silently discarded all gateway stderr on macOS. Restores observability for macOS self-hosters.
- **[#109657](https://github.com/openclaw/openclaw/issues/109657) (CLOSED, P1) — adopt the core durable ingress drain on WhatsApp, Discord, Slack, Signal, iMessage.** This extends the canonical durable-ingress worker (from #108924) across the remaining channels — a foundational message-loss prevention step.
- **[#136833](https://github.com/openclaw/openclaw/pull/136833) (CLOSED, P1) — reject placement-incompatible model changes before persisting.** Prevents sessions pinned to a remote node worker from being bricked by an unsupported model switch.
- **[#141592](https://github.com/openclaw/openclaw/pull/141592) (CLOSED, P2) — prevent terminal-less Responses streams with compression**, fixing "stream ended before a terminal response event" on compression-negotiated OpenAI-compatible endpoints.

**In flight and advancing:** LINE channel parity work ([#132136](https://github.com/openclaw/openclaw/pull/132136) multi-image single-turn, [#142092](https://github.com/openclaw/openclaw/pull/142092) reply quoting), Mattermost interactive `ask_user` buttons ([#135350](https://github.com/openclaw/openclaw/pull/135350)), browser mobile handoff for human-only steps ([#143015](https://github.com/openclaw/openclaw/pull/143015)), per-agent `web_fetch` SSRF policy ([#67421](https://github.com/openclaw/openclaw/pull/67421)), and owner-scoped ClawHub skill refs ([#87764](https://github.com/openclaw/openclaw/pull/87764)).

---

## 4. Community Hot Topics

| Item | Comments | Signal |
|---|---|---|
| [#125626](https://github.com/openclaw/openclaw/issues/125626) — *2026.8.1 beta feedback* (CLOSED, maintainer) | 24 | Release-validation loop working as designed; the single highest-traffic thread is structured beta feedback, not a defect. |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex `PreToolUse` hook relay spawns CPU-bound processes, stalls gateway RPC (P0, OPEN, 👍2) | 22 | Long-running (opened 2026-06-06) architectural issue: hook relay process model is too heavy. |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) — unreaped hook/tool child processes → zombie accumulation (P1, OPEN) | 15 | Same root area as #91009: child-process lifecycle management. |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) — memory-core SQLite tables have no retention policy, will fill disk (P2, OPEN, diamond lobster) | 13 | Production field evidence; storage governance is a systemic gap. |
| [#139714](https://github.com/openclaw/openclaw/issues/139714) — `update in progress` forever (CLOSED) | 13 | Update-state machine correctness. |
| [#132762](https://github.com/openclaw/openclaw/issues/132762) — overflow retry ends without final delivery (CLOSED) | 12 | Silent message loss. |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) — SSH spawn hang regression (OPEN, P1) | 11 | Regression across two releases, still open. |
| [#142585](https://github.com/openclaw/openclaw/issues/142585) — 2026.9.3 Doctor refuses legacy workspace migration (P0, OPEN) | 11 | **Upgrade blocker**, still `needs-info`. |

**Underlying needs:** the community is converging on two demands — (1) **predictable resource lifecycle** (children reaped, DB tables pruned, locks bounded), and (2) **deterministic upgrade paths** (Doctor migrations, update-state, model routing after profile changes). Users are increasingly running large fleets (one report describes a **632-agent gateway** in [#142476](https://github.com/openclaw/openclaw/issues/142476)), which converts small per-agent inefficiencies into multi-second event-loop stalls.

---

## 5. Bugs & Stability

**P0 / release-blocking**
- [#142585](https://github.com/openclaw/openclaw/issues/142585) — 2026.9.3 Doctor refuses valid legacy workspace setup and attestation import when canonical rows are absent. Upgrade/migration blocker; `clawsweeper:needs-info`, no fix PR yet.
- [#144066](https://github.com/openclaw/openclaw/issues/144066) — `gpt-5.4`/`gpt-5.4-mini` intermittently misrouted to `openai-codex` after a stale `auth_profile_state.order` entry survives profile removal; requests return 400 with no body. Regression, `ux-release-blocker`. **No fix PR visible.**
- [#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex hook relay spawns CPU-bound `openclaw-hooks` processes, stalls gateway RPC (crash-loop, 👍2). Open since June; needs maintainer review.
- [#140162](https://github.com/openclaw/openclaw/issues/140162) — Windows: `gateway restart` kills an actively booting/ready gateway as "stale" after a 181s timeout, and never finds manually started foreground gateways. Full-outage failure mode.

**P1**
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — zombie child-process accumulation → runtime degradation.
- [#142476](https://github.com/openclaw/openclaw/issues/142476) — 2026.9.3 cron session reaper runs synchronous `PRAGMA integrity_check` on every agent DB, blocking the event loop 14–76 s on a 632-agent gateway. `queueable-fix` → **fix expected soon**.
- [#117262](https://github.com/openclaw/openclaw/issues/117262) — 3 concurrent write handles on `state/openclaw.sqlite` cause ~33 s event-loop stalls (internal DEF-61).
- [#143640](https://github.com/openclaw/openclaw/issues/143640) — memory-core full index publish runs in one `IMMEDIATE` transaction exceeding the 5 s busy timeout of concurrent agent DB writes.
- [#136311](https://github.com/openclaw/openclaw/issues/136311) — gateway reacquires the reindex lock on every start, making the index unrepairable; 19 GB of orphaned `memory-reindex-*` temp DBs accumulate.
- [#139847](https://github.com/openclaw/openclaw/issues/139847) — message sent during an active reply run is dropped ("no active tool authority snapshot"), regression in 2026.9.2. `queueable-fix`.
- [#136183](https://github.com/openclaw/openclaw/issues/136183) — SSH spawn hangs waiting for server banner (regression 2026.8.1 → persists 2026.8.2).
- [#137332](https://github.com/openclaw/openclaw/issues/137332) — mixed terminal requester-settle batches retry forever after ownership check. `queueable-fix`.
- [#144424](https://github.com/openclaw/openclaw/issues/144424) — concurrent heartbeat lanes collide on unrelated dashboard sessions, trip real Anthropic 429s, and ignore retry backoff → self-sustaining storm. `queueable-fix`.
- [#128971](https://github.com/openclaw/openclaw/issues/128971) — Telegram final reply silently lost when terminal receipt returns `delivery_ambiguous`.
- [#136360](https://github.com/openclaw/openclaw/issues/136360) — internal runtime-context carrier leaks as a visible user turn on Microsoft Teams (same bug class already seen on Slack, Telegram, Feishu, Discord).
- [#139274](https://github.com/openclaw/openclaw/issues/139274) — native `/codex` bind drops voice-note attachments and skips configured STT.
- [#95866](https://github.com/openclaw/openclaw/issues/95866) — forced gateway restart uses a 0 ms reply drain and silently discards in-flight replies.

**Fix PRs currently open for stability issues:** [#144488](https://github.com/openclaw/openclaw/pull/144488) (configurable/recoverable embedding request timeout), [#144519](https://github.com/openclaw/openclaw/pull/144519) (silent heartbeat no longer re-delivers the previous final reply), [#144521](https://github.com/openclaw/openclaw/pull/144521) (display cap re-materializing retired live-buffer bytes), [#140902](https://github.com/openclaw/openclaw/pull/140902) (include tool-schema tokens in context-overflow precheck), [#144518](https://github.com/openclaw/openclaw/pull/144518) (keep fresh and resumed CLI runs on one session lane), [#143391](https://github.com/openclaw/openclaw/pull/143391) (resolve CLI execution auth identity for native compaction).

---

## 6. Feature Requests & Roadmap Signals

- **Built-in auto-update with schedule, confirmation and post-update notification** — [#12855](https://github.com/openclaw/openclaw/issues/12855) (P2, open since 2026-02-09, needs security review). With update-state bugs (#139714) and packaging-activation hazards ([#143752](https://github.com/openclaw/openclaw/issues/143752)) being actively worked, a managed auto-update flow is a plausible next-version feature once those land.
- **Auto-acknowledgment message before agent processing** — [#8285](https://github.com/openclaw/openclaw/issues/8285) (P3, open since 2026-02-03). Cheap UX win; likely a config-level addition rather than a core redesign.
- **Delivery correlation data on `message_sent` hooks** — [#109370](https://github.com/openclaw/openclaw/issues/109370). Directly complements the durable-ingress work now landing per channel (#109657); strong roadmap fit for plugin-idempotent delivery.
- **Owner-scoped ClawHub skill refs** — [#87764](https://github.com/openclaw/openclaw/pull/87764) (maintainer-authored, ~3.5 months old). Extends the skill ecosystem to namespaced ownership; flagged with compatibility and security-boundary merge risk.
- **Per-agent `web_fetch` SSRF overrides** — [#67421](https://github.com/openclaw/openclaw/pull/67421) (open since 2026-04-15). Multi-tenant/ops-agent isolation request.
- **Browser mobile handoff for remote browser tasks** — [#143015](https://github.com/openclaw/openclaw/pull/143015). Solves the CAPTCHA/login human-in-the-loop gap for phone-originated sessions.
- **Mattermost interactive `ask_user` buttons** — [#135350](https://github.com/openclaw/openclaw/pull/135350). Channel-parity catch-up versus Telegram/Discord.
- **Gateway isolation surfaced in the UI** — [#144243](https://github.com/openclaw/openclaw/pull/144243). Operability/hardening signal.

**Prediction:** the most likely near-term landings are channel-parity PRs (LINE quote/multi-image, Mattermost buttons), browser mobile handoff, and the memory/embedding timeout fix. Owner-scoped ClawHub refs and per-agent SSRF overrides are higher-risk and may slip past the next minor.

---

## 7. User Feedback Summary

**Pain points, by frequency:**
1. **Storage and process leakage** — unbounded `memory_index_chunks`/`memory_embedding_cache` growth ([#114612](https://github.com/openclaw/openclaw/issues/114612)), 19 GB of orphaned reindex temp DBs ([#136311](https://github.com/openclaw/openclaw/issues/136311)), and zombie processes ([#97616](https://github.com/openclaw/openclaw/issues/97616)). Users explicitly frame these as "will fill disk over time," i.e., long-running-host sustainability.
2. **Latency and lock contention** — 33 s event-loop stalls ([#117262](https://github.com/openclaw/openclaw/issues/117262)) and 14–76 s integrity-check blocks ([#142476](https://github.com/openclaw/openclaw/issues/142476)) reported by operators running very large gateways.
3. **Upgrade and lifecycle uncertainty** — Doctor refusing legacy migration ([#142585](https://github.com/openclaw/openclaw/issues/142585)), stranded CLI after interrupted package activation ([#143752](https://github.com/openclaw/openclaw/issues/143752)), and Windows unattended-service failures ([#143757](https://github.com/openclaw/openclaw/issues/143757), [#140162](https://github.com/openclaw/openclaw/issues/140162)).
4. **Deliverability trust** — users can see the agent finish work and still lose the final answer (Telegram [#128971](https://github.com/openclaw/openclaw/issues/128971), ack-loss mid-run [#139847](https://github.com/openclaw/openclaw/issues/139847), restart drain [#95866](https://github.com/openclaw/openclaw/issues/95866), WebChat image attachments [#103198](https://github.com/openclaw/openclaw/issues/103198)).
5. **Cost/token overhead** — ~686 tokens/turn of injected `<system-reminder>` runtime scaffolding with no opt-out ([#141747](https://github.com/openclaw/openclaw/issues/141747)) — a direct billing concern for high-volume users.
6. **Provider/auth flakiness** — misrouted models after profile edits ([#144066](https://github.com/openclaw/openclaw/issues/144066), [#101763](https://github.com/openclaw/openclaw/issues/101763)), stale subscription blocks ([#123009](https://github.com/openclaw/openclaw/issues/123009)), local auth materialization failures ([#141033](https://github.com/openclaw/openclaw/issues/141033)).

**Satisfaction signals:** reports are consistently detailed and reproducible, with internal IDs (DEF-61), exact commits and versions — a sign of a technically engaged user base. Many P1 issues are already labelled `queueable-fix`/`fix-shape-clear`, and the 2026.8.1 beta feedback thread was closed cleanly, suggesting users perceive the maintainers as responsive. Dissatisfaction concentrates on *duration*, not responsiveness: several P0/P1 items (#91009 since June, #95866 since June, #112110 since July) remain open with security or product decisions pending.

---

## 8. Backlog Watch

Long-unanswered or high-impact items needing maintainer attention:

| Item | Type | Age | Why it matters |
|---|---|---|---|
| [#8285](https://github.com/openclaw/openclaw/issues/8285) | Feature (P3) | ~7 months (2026-02-03) | Simple pre-processing acknowledgement; zero movement. |
| [#12855](https://github.com/openclaw/openclaw/issues/12855) | Feature (P2) | ~7 months (2026-02-09) | Auto-update is a top recurring request and now interacts with active update-state work. |
| [#67421](https://github.com/openclaw/openclaw/pull/67421) | PR (P2) | ~5 months (2026-04-15) | Per-agent `web_fetch` SSRF overrides; stuck at `needs proof`, carries security-boundary risk. |
| [#79588](https://github.com/openclaw/openclaw/issues/79588) | Bug (P1) | ~4 months (2026-05-09) | Compaction quality guard doesn't verify identifier survival — silent loss of UUIDs/SHAs/session keys in summaries. |
| [#83440](https://github.com/openclaw/openclaw/pull/83440) | Feature (P2) | ~4 months (2026-05-18) | CLI resolution of pending exec approvals; security-boundary review pending. |
| [#87441](https://github.com/openclaw/openclaw/issues/87441) | Bug (P2) | ~3.5 months (2026-05-27) | Memory diagnostic thresholds parameter never wired to config — observability gap. |
| [#87764](https://github.com/openclaw/openclaw/pull/87764) | Feature (maintainer, P2) | ~3.5 months (2026-05-28) | Owner-scoped ClawHub refs; large surface (docs, web-ui, gateway, cli, agents). |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Bug (P0) | ~3 months (2026-06-06) | CPU-bound hook relay stalling gateway RPC; still `needs-maintainer-review`. |
| [#95866](https://github.com/openclaw/openclaw/issues/95866) | Bug (P1) | ~2.5 months (2026-06-22) | Forced restart discards in-flight replies; needs product decision. |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Bug (P1) | ~2.5 months (2026-06-29) | Zombie process accumulation; paired with #91009 for a shared child-process-lifecycle fix. |
| [#112110](https://github.com/openclaw/openclaw/issues/112110) | Security (P1) | ~1.5 months (2026-07-21) | Subagent MCP tool authorization evaluated against parent session rather than the restricted capability boundary; `needs-security-review`. |

**Maintainer call to action:** the highest-leverage cluster is **child-process lifecycle + SQLite concurrency** (#91009, #97616, #117262, #142476, #143640, #136311). A single coordinated hardening pass on process reaping and DB transaction sizing would resolve or de-risk six open P0/P1 items at once and directly address the most credible production-outage reports in the tracker.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open-Source Ecosystem
**Data window: 2026-09-11 · Projects: OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw**

---

## 1. Ecosystem Overview

The personal AI assistant / agent open-source landscape in late 2026 is consolidating around a common maturity curve: projects have moved past feature novelty and are now battling **production-hardening debt** — resource lifecycle, session integrity, message-delivery guarantees, and security boundaries. A clear two-speed dynamic has emerged between **high-throughput reference platforms** (OpenClaw, QwenPaw) that ship fixes and releases daily, and **contributor-rich but review-constrained projects** (ZeroClaw, Hermes) where intake far outpaces merge capacity. Across every project, the same pain clusters recur: unbounded memory/SQLite growth, children that aren't reaped, sessions that leak identity across channels, and fragile upgrade paths. Security is no longer a side concern — sandbox escapes, tool-allowlist bypasses, and multi-tenant credential isolation now appear as top-severity items in four of five projects. The net signal is that the ecosystem is entering an **operability and trust phase**, where reliability engineering and governance — not raw capability — determine which projects retain self-hosted and enterprise users.

---

## 2. Activity Comparison

*Figures reflect a rolling ~24h window. "Throughput" = issues closed + PRs merged/closed. Long-tail activity is under-represented where digests sample top items.*

| Project | Issues (touched / active / closed) | PRs (touched / open / merged-closed) | Release Status (24h) | Health Score* |
|---|---|---|---|---|
| **OpenClaw** | 421 / 235 / 186 | 500 / — / 264 | ✅ v2026.6.35 (final June LTS) | **7.5 / 10** |
| **QwenPaw** | 29 / 19 / 10 | 35 / 23 / 12 | ✅ v2.2.1-beta.2 | **8.0 / 10** |
| **Hermes Agent** | 50 / 46 / 4 | 50 / 49 / 1 | ⛔ None | **6.0 / 10** |
| **ZeroClaw** | 50 / 50 / 0 | 50 / 50 / 0 | ⛔ None (v0.8.3 last) | **5.0 / 10** |
| **IronClaw** | ~1 / 1 / 0 | 8 / 6 / 2 | ⛔ None | **7.0 / 10** |

*\*Health score is a composite of activity, triage/merge throughput, backlog risk, and unresolved critical-severity items (0–10 subjective scale).*

**Key observations:**
- **OpenClaw** operates at ~10× the raw throughput of any peer and sustains a **>50% PR close rate** — genuinely exceptional for its scale.
- **QwenPaw** delivers the best *balanced* signal: high activity, 10 issues closed and 12 PRs merged in one day, plus a shipped beta.
- **ZeroClaw** shows the sharpest divergence: **50 open PRs and 0 merges** — a textbook reviewer-capacity bottleneck.
- **Hermes** and **IronClaw** are quieter; Hermes has a large open backlog (49 open PRs) with minimal drain, while IronClaw is small-scale and maintenance-dominated (5 of 8 PRs are Dependabot).

---

## 3. OpenClaw's Position

**Advantages vs. peers**
- **Scale and velocity:** 421 issues / 500 PRs touched in 24h, with 264 PRs merged/closed — an order of magnitude beyond every other project combined. This is the ecosystem's *de facto reference implementation*.
- **Release discipline:** Only OpenClaw and QwenPaw shipped software in-window; OpenClaw is managing a mature LTS/mainline split (v2026.6.x LTS vs. 2026.9.x mainline), a hallmark of enterprise-grade lifecycle management.
- **Ecosystem breadth:** owner-scoped ClawHub skills, per-agent SSRF policy, browser mobile handoff, LINE/Mattermost parity — it is the only project operating a genuine **plugin/skill marketplace** dimension.
- **Triage maturity:** many P1s already carry `clawsweeper:queueable-fix` labels and fix-shape traces, indicating a structured, automated triage pipeline.

**Technical approach differences**
- OpenClaw is built around a **gateway + durable-ingress worker + SQLite state** architecture, now extending canonical durable ingress across WhatsApp, Discord, Slack, Signal, and iMessage (#109657). Peers are still patching per-channel delivery individually.
- Heavy emphasis on **multi-agent fleets at scale** — the standout field report of a **632-agent gateway** (#142476) is unique; no peer is documented operating at that scale.
- Its weaknesses are architectural side effects of that scale: unbounded memory tables, 33s event-loop stalls, and synchronous `PRAGMA integrity_check` on hundreds of agent DBs.

**Community size comparison**
OpenClaw's engagement is categorically larger — its top issue threads carry 20–24 comments with diamond-lobster/P0 designations, and it has multiple active P0s. QwenPaw's most-engaged thread (Hub roadmap) has 24 comments; Hermes has two automation threads with 193 and 85 comments (but these are bot-driven); ZeroClaw's top thread has 19 comments. **OpenClaw is the only project where issue volume, contributor count, and release cadence all sit in a large-scale tier** — peers occupy either "small but healthy" (IronClaw) or "large intake, constrained drain" (ZeroClaw/Hermes).

---

## 4. Shared Technical Focus Areas

These requirements emerge across **multiple** projects and represent ecosystem-wide gaps:

| Need | Projects | Specific Evidence |
|---|---|---|
| **Resource lifecycle / process reaping** | OpenClaw, Hermes, ZeroClaw | Zombie child processes (OpenClaw #97616), orphaned Chrome (Hermes #32047), browser daemon reaper blind spot (Hermes #100855), unbounded RSS growth (ZeroClaw #8642), CPU-bound hook relay (OpenClaw #91009) |
| **Storage / SQLite governance** | OpenClaw, QwenPaw, Hermes | No retention policy on memory tables (OpenClaw #114612), 19 GB orphaned reindex temp DBs (#136311), FTS corruption repair (QwenPaw #7655), `PRAGMA quick_check` caching (QwenPaw #7639) |
| **Message delivery reliability / durable ingress** | OpenClaw, QwenPaw, ZeroClaw | Telegram final-reply loss (OpenClaw #128971), durable ingress across channels (#109657), Feishu queue consumer wedge (QwenPaw #7534), terminal responses falsely reported successful (ZeroClaw #9421) |
| **Session / cross-channel isolation** | QwenPaw, OpenClaw, Hermes | Console stop cancels Feishu session (QwenPaw #7011), wrong-session delivery (#7231), duplicate-session creation (#7661), session-header omissions (Hermes #65094) |
| **Security boundaries (sandbox, allowlist, tenant isolation)** | QwenPaw, ZeroClaw, IronClaw, OpenClaw | Windows sandbox bypass (QwenPaw #7672), `delegate` tool-allowlist bypass (ZeroClaw #8279), shell workspace boundary bypass (#9247), MCP cross-caller tool overwrite (IronClaw #8090), subagent MCP auth against parent session (OpenClaw #112110) |
| **Platform parity (Windows / macOS)** | OpenClaw, Hermes, ZeroClaw | Windows gateway lifecycle (OpenClaw #140162), `.sh` cron path mangling (Hermes #43073), 74 Windows test failures (ZeroClaw #7462) |
| **Upgrade / update reliability** | OpenClaw, Hermes, QwenPaw | Doctor refuses legacy migration (OpenClaw #142585), Windows self-update false-failure (Hermes #107685), update-state stuck forever (OpenClaw #139714) |
| **Channel parity & new channels** | OpenClaw, QwenPaw, ZeroClaw, IronClaw | LINE/Mattermost (OpenClaw), ntfy — *implementation ready* (QwenPaw #7657), Sendblue iMessage/SMS (ZeroClaw #10768), Telegram command menu (IronClaw #8072) |
| **Memory architecture & cost control** | OpenClaw, QwenPaw, Hermes | Configurable embedding timeout (OpenClaw #144488), `memory_model` decoupling (#7664), durable cross-restart memory (#7656), per-session model overrides (QwenPaw #5992) |
| **Multi-tenant / enterprise readiness** | QwenPaw, IronClaw, OpenClaw | Hub multi-tenant roadmap (QwenPaw #7318, 24 comments), per-caller MCP catalogs (IronClaw #8090), per-agent SSRF/web_fetch scoping (OpenClaw #67421) |
| **Local / self-hosted model friction** | QwenPaw, ZeroClaw, Hermes | LAN model endpoints via Hub (QwenPaw #7445), HF download/quant selection (#7666), Hailo-Ollama provider blocked (ZeroClaw #9109), Codex-compatible providers (Hermes #65094) |

**Convergent signal:** The industry's next hard problem is not "more agent capability" but **containment** — containing processes, storage, sessions, credentials, and blast radius. Every project independently arrived at this, which makes it a validated, cross-cutting requirement rather than one vendor's roadmap choice.

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | QwenPaw | Hermes Agent | ZeroClaw | IronClaw |
|---|---|---|---|---|---|
| **Primary focus** | Scale, multi-agent fleets, LTS lifecycle | Pre-release hardening, multi-tenant "Hub" | Desktop + plugin ecosystem | Security/auth + platform portability | Lean WebUI + channel integrations |
| **Target users** | Self-hosted fleets, ops/enterprise operators | Teams, multi-tenant/admin, mobile users | Desktop power users, plugin developers | Security-conscious + Windows/non-Linux users | Lightweight/self-hosters, CJK users |
| **Architecture** | Gateway + durable-ingress + SQLite state; skill marketplace (ClawHub) | Console + IM channels (WeCom/Feishu/Telegram/Matrix); ReMe memory; Hub edition | Desktop app (Electron-style), plugin runtime, TUI | Rust-native, RPC dispatch, ACP, OIDC/PKCE auth stack | Rust backend + WebUI, MCP-centric |
| **Signature differentiator** | 632-agent single-gateway scale; per-channel durable ingress | Session-management commands landed across IM parity (#6978); Hub multi-tenant roadmap | Highest engagement automation (193-comment thread); desktop memory/UX | RFC-driven governance; supply-chain attestation consolidation | MCP multi-tenant correctness; IME/CJK input handling |
| **Architecture maturity stage** | Mature, scaling | Pre-GA hardening | Feature-rich, maintenance pressure | Mid-refactor (auth stack unlanded) | Small, stable |

**Reading:** OpenClaw optimizes for *breadth and scale*; QwenPaw for *multi-tenant/team deployment*; Hermes for *desktop depth*; ZeroClaw for *security and Rust-native portability*; IronClaw for *lean MCP integration*. These are largely complementary rather than directly substitutive — suggesting the ecosystem is segmenting by deployment model (fleet vs. desktop vs. team vs. single-user) rather than converging on one shape.

---

## 6. Community Momentum & Maturity

**Activity tiers (by throughput, not intake):**

- **Tier 1 — High velocity, high drain:** *OpenClaw* (264 PRs merged/closed; 44% issue / 53% PR close rate). *QwenPaw* (12 PRs merged, 10 issues closed; fast small-fix turnaround — #7663, #7667 shipped same-day).
- **Tier 2 — High intake, constrained drain:** *ZeroClaw* (50 open PRs, **0 merges**) — the most acute capacity risk in the set; a stacked 7-layer auth series and two `do-not-merge` XL PRs risk indefinite stall. *Hermes* (49 open PRs, 1 merge) — a July/August merge backlog with desktop P1s lacking visible fix PRs.
- **Tier 3 — Low activity, stable:** *IronClaw* (8 PRs, mostly Dependabot; 1 open issue) — quiet but functionally sound; maintenance-only posture.

**Iterating vs. stabilizing:**
- **Rapidly iterating:** OpenClaw (v2026.9.x mainline churn), QwenPaw (2.2.1 beta cycle, backlog burn-down).
- **Attempting to stabilize but blocked:** ZeroClaw (auth unification, Windows CI) and Hermes (desktop reliability) — both have the *content* but not the *review throughput* to progress.
- **Stabilized / low-ambition:** IronClaw.

**Maturity verdict:** Only OpenClaw and QwenPaw demonstrate consistent delivery. ZeroClaw and Hermes show **structural maintainer-capacity constraints** — the ecosystem's binding constraint is now reviewer/merger time, not contributor willingness.

---

## 7. Trend Signals

Extracted from cross-project community feedback, ranked by strategic value to AI-agent developers:

1. **Resource lifecycle is the new reliability frontier.** Unbounded memory tables, zombie processes, and SQLite lock contention dominate complaints at scale (OpenClaw's 632-agent gateway, ZeroClaw's OOM reports, Hermes' 5 GB renderer footprint). *Value:* ship retention policies, process reapers, and bounded transaction sizing as first-class features — not afterthoughts.

2. **Delivery guarantees are a trust prerequisite.** Users tolerate slow agents but not silently lost final answers (OpenClaw Telegram/WebChat, QwenPaw Feishu, ZeroClaw terminal-success false-positives). *Value:* durable ingress + idempotent delivery + delivery-correlation hooks (OpenClaw #109370) will become table stakes.

3. **Security boundaries are being stress-tested in production.** Sandbox escapes (QwenPaw), tool-allowlist bypasses (ZeroClaw), MCP tenant overwrites (IronClaw), and parent-session auth leaks (OpenClaw) are open, high-severity, and often *without fix PRs*. *Value:* per-agent/per-caller isolation and capability-scoped delegation are emerging requirements, not optional hardening.

4. **Multi-tenant/enterprise readiness is the next product frontier.** QwenPaw's Hub roadmap (24 comments), IronClaw's per-caller MCP catalogs, and OpenClaw's owner-scoped skills all point the same way. *Value:* RBAC, namespaced skills, and admin-managed policy are the features that unlock team and enterprise adoption.

5. **Memory cost control and durable memory are converging.** Decoupling summarization from the expensive main LLM (QwenPaw #7664), embedding timeout recovery (OpenClaw #144488), and durable cross-restart memory (#7656) reflect a maturing view of memory as *governed infrastructure*.

6. **Platform parity (especially Windows + CJK) is an underserved market.** Windows lifecycle failures, non-Apple iMessage (Sendblue), IME composition, and localized-config gaps are recurring. *Value:* cross-platform CI (ZeroClaw #7461) and internationalization are low-risk, high-differentiation wins.

7. **Governance and CI throughput now gate delivery.** ZeroClaw's RFC-voting and review-evidence debates and 15–20 min CI runs, plus Hermes' merge backlog, show that **developer-experience and process friction directly suppress release velocity**. *Value:* investing in merge automation and fast CI is as strategically important as feature work.

8. **Provider/auth flakiness remains a persistent tax.** Stale auth-profile state (OpenClaw #144066), session-header omissions (Hermes #65094), and OIDC/PKCE modernization (ZeroClaw) show auth/routing correctness is an ongoing cost center as provider diversity grows.

**Bottom line for decision-makers:** The winning projects in the next 6–12 months will be those that convert *reliability engineering* (lifecycle, delivery, isolation) and *review/CI throughput* into shipped velocity. OpenClaw leads on scale, QwenPaw on balanced execution, and the ecosystem's collective unmet demand is **containment, correctness, and enterprise-grade governance**.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-11

## 1. Today's Overview
Hermes Agent remains highly active: 50 issues and 50 PRs were updated in the last 24h, with 46 issues still open/active and 49 PRs still open. Maintainer throughput was low today — only 4 issues closed and 1 PR merged/closed — and there were no new releases. The dominant themes are desktop stability/performance, plugin-load regressions, cron/gateway reliability, and Windows/macOS platform gaps. The project shows strong user reporting and triage activity, but the open-fix backlog and high-comment automation issues suggest maintenance pressure.

## 2. Releases
No new releases in the last 24h. No breaking changes or migration notes are available.

## 3. Project Progress
Only **1 PR was merged/closed**, and it is not among the top 20 PRs shown, so details cannot be summarized. Closed issues today include:
- [#96391](https://github.com/NousResearch/hermes-agent/issues/96391) — `hermes cron run` bypassed per-fire usage audit; manual runs invisible to cost auditing. Closed.
- [#107484](https://github.com/NousResearch/hermes-agent/issues/107484) — Windows packaged build: all runtime disk plugins fail to load. Closed as duplicate.
- [#17961](https://github.com/NousResearch/hermes-agent/issues/17961) — TUI resize ghost copies. Closed.
- [#107304](https://github.com/NousResearch/hermes-agent/issues/107304) — Desktop production build: every on-disk plugin fails to load. Closed as duplicate.

Most actual code progress is still in open PRs rather than merged changes. Notable open fixes include:
- [#98511](https://github.com/NousResearch/hermes-agent/pull/98511) — cron execution-history retention.
- [#107793](https://github.com/NousResearch/hermes-agent/pull/107793) — Kanban `initial_status=blocked` stickiness.
- [#107795](https://github.com/NousResearch/hermes-agent/pull/107795) — gateway `/save` delivery adapter.
- [#84236](https://github.com/NousResearch/hermes-agent/pull/84236) — visible closing message for interrupted turns.
- [#105308](https://github.com/NousResearch/hermes-agent/pull/105308) — replay-history canonicalization.

## 4. Community Hot Topics
PR comment counts were unavailable in the provided data, so the hot list is issue-driven.

| Item | Type | Comments / Reactions | Underlying need |
|---|---:|---:|---|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | Open issue | 193 comments, 0 👍 | Skills index stale/degraded; automation freshness watchdog needs a durable fix. |
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | Open issue | 85 comments, 0 👍 | Automated Nous-to-Enterkey integration blocked by `cron/jobs.py` conflicts; scheduled maintenance reliability. |
| [#77311](https://github.com/NousResearch/hermes-agent/issues/77311) | Open P1 | 8 comments, 0 👍 | Desktop renderer retains every message in memory; 5 GB fleet footprint. Needs session eviction/resource limits. |
| [#84361](https://github.com/NousResearch/hermes-agent/issues/84361) | Open P2 | 8 comments, 0 👍 | Desktop `MEDIA:` file links dead due to regex/URI handling; desktop file-open UX. |
| [#32047](https://github.com/NousResearch/hermes-agent/issues/32047) | Open P2 | 6 comments, 0 👍 | Windows `agent-browser` leaves 200+ orphaned Chrome processes; lifecycle cleanup needed. |
| [#18990](https://github.com/NousResearch/hermes-agent/issues/18990) | Open P3 | 5 comments, 0 👍 | Kimi Coding vision support incorrectly blocked; provider capability updates. |
| [#101535](https://github.com/NousResearch/hermes-agent/issues/101535) | Open P2 | 5 comments, 0 👍 | Desktop v0.21.0 Bot Mode “Bots” tab missing; feature discoverability/regression. |
| [#65094](https://github.com/NousResearch/hermes-agent/issues/65094) | Open P2 | 5 comments, 0 👍 | Custom Codex-compatible `/v1` providers omit Hermes session headers; provider compatibility. |
| [#43073](https://github.com/NousResearch/hermes-agent/issues/43073) | Open P2 | 5 comments, 0 👍 | Windows `.sh` cron scripts fail due to backslash path mangling; cross-platform cron. |

## 5. Bugs & Stability
Ranked by severity and visible impact:

**P1 / high impact**
- [#77311](https://github.com/NousResearch/hermes-agent/issues/77311) — Desktop renderer memory grows unboundedly; 5 GB fleet footprint after heavy use. Open. No fix PR visible in top 20.
- [#79859](https://github.com/NousResearch/hermes-agent/issues/79859) — Desktop “Talk to Hermes” still uses delayed MP3 whole-file playback with OpenAI TTS. Open, 1 👍.
- [#107721](https://github.com/NousResearch/hermes-agent/issues/107721) — Desktop: all runtime-loaded plugins fail after update (“Cannot convert undefined or null to object”). Open duplicate of a broader plugin-load incident; related [#107484](https://github.com/NousResearch/hermes-agent/issues/107484) and [#107304](https://github.com/NousResearch/hermes-agent/issues/107304) are closed duplicates.

**P2 / stability and platform**
- [#84361](https://github.com/NousResearch/hermes-agent/issues/84361) — Desktop `MEDIA:` file links dead; tag regex and `file://` handling broken.
- [#32047](https://github.com/NousResearch/hermes-agent/issues/32047) — Windows `agent-browser` leaves orphaned Chrome processes.
- [#101535](https://github.com/NousResearch/hermes-agent/issues/101535) — Desktop Bot Mode Bots tab missing.
- [#65094](https://github.com/NousResearch/hermes-agent/issues/65094) — Codex-compatible providers omit Hermes session headers.
- [#43073](https://github.com/NousResearch/hermes-agent/issues/43073) — Windows `.sh` cron scripts fail due to backslash path mangling.
- [#87822](https://github.com/NousResearch/hermes-agent/issues/87822) — A2A fast single-turn `message/send` returns empty text.
- [#100855](https://github.com/NousResearch/hermes-agent/issues/100855) — Browser daemons invisible to orphan reaper; wedged daemon survived 47h.
- [#107774](https://github.com/NousResearch/hermes-agent/issues/107774) — macOS collapsed sidebar tabs paint over titlebar and block expand button.
- [#91547](https://github.com/NousResearch/hermes-agent/issues/91547) — `hermes gateway restart` races its own port and runs without API server.
- [#107559](https://github.com/NousResearch/hermes-agent/issues/107559) — Cron manual re-fire permanently blocked by stale in-memory firing lock.
- [#107666](https://github.com/NousResearch/hermes-agent/issues/107666) — Desktop cron lists `profile=all` but saves active profile; non-owner scope 404s.
- [#107685](https://github.com/NousResearch/hermes-agent/issues/107685) — Windows self-update reports healthy install as FAILED exit 8.

**P3 / lower severity but recurring**
- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — Skills index stale/degraded.
- [#107661](https://github.com/NousResearch/hermes-agent/issues/107661) and [#107758](https://github.com/NousResearch/hermes-agent/issues/107758) — Kanban unavailable due to missing/import-broken modules.
- [#87739](https://github.com/NousResearch/hermes-agent/issues/87739) — `/hatch` burns paid image requests retrying unsegmentable rows. Fix PRs: [#87803](https://github.com/NousResearch/hermes-agent/pull/87803), [#107796](https://github.com/NousResearch/hermes-agent/pull/107796).
- [#107784](https://github.com/NousResearch/hermes-agent/issues/107784) — Kanban dependency-kind block re-dispatches worker. Fix PR: [#107793](https://github.com/NousResearch/hermes-agent/pull/107793).

Fix PRs exist for several issues, including [#84236](https://github.com/NousResearch/hermes-agent/pull/84236), [#105308](https://github.com/NousResearch/hermes-agent/pull/105308), [#107483](https://github.com/NousResearch/hermes-agent/pull/107483), [#107047](https://github.com/NousResearch/hermes-agent/pull/107047), [#67779](https://github.com/NousResearch/hermes-agent/pull/67779), [#79052](https://github.com/NousResearch/hermes-agent/pull/79052), and [#80760](https://github.com/NousResearch/hermes-agent/pull/80760). However, the P1 desktop memory and plugin-load incidents do not yet show visible fix PRs in the top 20.

## 6. Feature Requests & Roadmap Signals
- [#107700](https://github.com/NousResearch/hermes-agent/issues/107700) — `feat(secrets)`: source-apply hydration, handles for tool credentials, wrap for HTTP inject. Security/secret-management roadmap signal.
- [#96299](https://github.com/NousResearch/hermes-agent/issues/96299) — Shared named capacity pools for Kanban dispatch. Marked `needs-decision`; likely requires design approval.
- [#104586](https://github.com/NousResearch/hermes-agent/pull/104586) — OpenRouter service tiers: flex/priority, per-model overrides, opt-in TTFT escalation. Strong candidate for next feature merge if accepted.
- [#98511](https://github.com/NousResearch/hermes-agent/pull/98511) — Cron execution-history retention fairness. Likely to land as cron reliability/config improvement.
- [#107794](https://github.com/NousResearch/hermes-agent/pull/107794) — Feishu card body polish and elapsed/model footer. Platform-specific messaging enhancement.
- [#82155](https://github.com/NousResearch/hermes-agent/pull/82155) — Expose configurable search toolset in CLI configurator.
- [#80760](https://github.com/NousResearch/hermes-agent/pull/80760) — Private persisted-result writes across backends. Security hardening.
- [#67779](https://github.com/NousResearch/hermes-agent/pull/67779) — Windows drive letters in `file://` URIs for vision.
- [#79052](https://github.com/NousResearch/hermes-agent/pull/79052) — Preserve active-profile SOUL identity for delegated children.
- [#84236](https://github.com/NousResearch/hermes-agent/pull/84236) — Visible closing message and structured `stop_kind` for interrupted turns.

Likely next-version signals: a plugin-load hotfix, desktop session/memory fixes, cron retention/config, OpenRouter service tiers, Feishu card polish, and Windows/macOS platform compatibility fixes. No release cadence data is available to confirm timing.

## 7. User Feedback Summary
Real user pain is concentrated in a few areas:
- **Desktop reliability and performance:** unbounded renderer memory ([#77311](https://github.com/NousResearch/hermes-agent/issues/77311)), dead `MEDIA:` links ([#84361](https://github.com/NousResearch/hermes-agent/issues/84361)), missing Bot Mode tab ([#101535](https://github.com/NousResearch/hermes-agent/issues/101535)), sidebar/titlebar overlap ([#107774](https://github.com/NousResearch/hermes-agent/issues/107774)), and delayed TTS playback ([#79859](https://github.com/NousResearch/hermes-agent/issues/79859)).
- **Plugin ecosystem breakage:** multiple users report every runtime-loaded plugin failing after update ([#107721](https://github.com/NousResearch/hermes-agent/issues/107721), with duplicates [#107484](https://github.com/NousResearch/hermes-agent/issues/107484), [#107304](https://github.com/NousResearch/hermes-agent/issues/107304)). This is a high-frustration regression because it disables installed extensions globally.
- **Windows platform gaps:** orphaned Chrome processes ([#32047](https://github.com/NousResearch/hermes-agent/issues/32047)), cron `.sh` path mangling ([#43073](https://github.com/NousResearch/hermes-agent/issues/43073)), and self-update false failures ([#107685](https://github.com/NousResearch/hermes-agent/issues/107685)).
- **Cron/gateway/cost reliability:** manual cron locks ([#107559](https://github.com/NousResearch/hermes-agent/issues/107559)), profile-scope 404s ([#107666](https://github.com/NousResearch/hermes-agent/issues/107666)), gateway restart races ([#91547](https://github.com/NousResearch/hermes-agent/issues/91547)), and `/hatch` burning paid image requests ([#87739](https://github.com/NousResearch/hermes-agent/issues/87739)).
- **Engagement pattern:** most hot issues have 0 👍; only [#79859](https://github.com/NousResearch/hermes-agent/issues/79859) and closed [#17961](https://github.com/NousResearch/hermes-agent/issues/17961) show 1 👍. Comments are dominated by detailed bug reports and automation noise, not broad feature enthusiasm.

Overall satisfaction signal is mixed: users are actively testing and reporting, and some issues are being closed as duplicates or fixed, but desktop and Windows regressions are creating visible dissatisfaction.

## 8. Backlog Watch
Long-running or high-attention items needing maintainer focus:
- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — 193 comments; automated skills-index watchdog. Needs policy/automation fix rather than repeated probes.
- [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — 85 comments; automated Nous integration blocked by merge conflicts. Needs scheduling/conflict-resolution ownership.
- [#32047](https://github.com/NousResearch/hermes-agent/issues/32047) — opened 2026-05-25; Windows orphaned Chrome processes. Long-lived P2.
- [#18990](https://github.com/NousResearch/hermes-agent/issues/18990) — opened 2026-05-02; Kimi Coding vision support. Old provider-compatibility issue.
- [#43073](https://github.com/NousResearch/hermes-agent/issues/43073) — opened 2026-06-09; Windows cron `.sh` failures. Cross-platform backlog.
- [#65094](https://github.com/NousResearch/hermes-agent/issues/65094) — opened 2026-07-15; Codex-compatible provider session headers.
- [#72202](https://github.com/NousResearch/hermes-agent/issues/72202) — opened 2026-07-26; custom provider fallback drops `reasoning_effort`.
- [#87822](https://github.com/NousResearch/hermes-agent/issues/87822) — opened 2026-08-16; A2A empty text on fast single-turn replies.
- [#91547](https://github.com/NousResearch/hermes-agent/issues/91547) — opened 2026-08-21; gateway restart race.
- [#100855](https://github.com/NousResearch/hermes-agent/issues/100855) — opened 2026-09-02; browser daemon orphan reaper blind spot.
- [#105308](https://github.com/NousResearch/hermes-agent/pull/105308) — opened 2026-09-07; P1 replay-history canonicalization. Important but still open.
- Long-open PRs from July/August: [#67779](https://github.com/NousResearch/hermes-agent/pull/67779), [#71581](https://github.com/NousResearch/hermes-agent/pull/71581), [#71674](https://github.com/NousResearch/hermes-agent/pull/71674), [#74011](https://github.com/NousResearch/hermes-agent/pull/74011), [#74026](https://github.com/NousResearch/hermes-agent/pull/74026), [#79052](https://github.com/NousResearch/hermes-agent/pull/79052), [#80760](https://github.com/NousResearch/hermes-agent/pull/80760), [#82155](https://github.com/NousResearch/hermes-agent/pull/82155), [#84236](https://github.com/NousResearch/hermes-agent/pull/84236). These indicate a review/merge backlog that may slow down roadmap delivery.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-11

## Today's Overview
As of 2026-09-11, IronClaw recorded 8 PR updates in the last 24h (6 open, 2 closed/merged), 1 open issue update, and no new releases. Activity is low-to-moderate and maintenance-heavy: 5 of 8 PRs are Dependabot dependency bumps, while 3 are human-authored changes around Telegram, WebUI input, and MCP isolation. Two PRs closed/merged: the Telegram command-menu feature ([#8072](https://github.com/nearai/ironclaw/pull/8072)) and an older Rust dependency group ([#8080](https://github.com/nearai/ironclaw/pull/8080)), with a broader 24-update replacement ([#8097](https://github.com/nearai/ironclaw/pull/8097)) still open. The most important open work is ([#8090](https://github.com/nearai/ironclaw/pull/8090)), a high-impact fix for cross-caller MCP tool overwrites, plus ([#8092](https://github.com/nearai/ironclaw/pull/8092)) for IME composition in the chat composer. Overall, project health looks stable but quiet, with active maintenance and bug fixing but no release or community discussion in this window.

## Releases
No new releases were published. Latest Releases: None.

## Project Progress
- **Closed/merged — Telegram command UX advanced:** ([#8072](https://github.com/nearai/ironclaw/pull/8072)) `feat(telegram): register the Bot API command menu at activation`. Telegram’s chat menu now lists declared commands — `/model`, `/status`, `/new`, `/stop`, `/interrupt` — registered via `setMyCommands` at extension activation and cleared best-effort via `deleteMyCommands`.
- **Closed/merged — Rust dependency group refreshed:** ([#8080](https://github.com/nearai/ironclaw/pull/8080)) bumped the “everything-else” Rust group with 21 updates. A newer broader PR, ([#8097](https://github.com/nearai/ironclaw/pull/8097)), now proposes 24 updates, so #8080 appears to have been closed in favor of the larger bump.
- **Open fixes advancing, not yet merged:** ([#8090](https://github.com/nearai/ironclaw/pull/8090)) keys discovered hosted-MCP catalogs per caller instead of per extension; ([#8092](https://github.com/nearai/ironclaw/pull/8092)) preserves IME composition in the WebUI chat composer.
- **Open dependency maintenance:** ([#8097](https://github.com/nearai/ironclaw/pull/8097)) Rust group, ([#8096](https://github.com/nearai/ironclaw/pull/8096)) Vitest, ([#8094](https://github.com/nearai/ironclaw/pull/8094)) js-yaml, and ([#8095](https://github.com/nearai/ironclaw/pull/8095)) baseline-browser-mapping.

## Community Hot Topics
No hot topics by engagement metrics: the sole issue, ([#8093](https://github.com/nearai/ironclaw/issues/8093)), has 0 comments and 0 👍, and PR comment counts were not available in the provided feed. The most substantive threads by content are:
- ([#8090](https://github.com/nearai/ironclaw/pull/8090)) — hosted-MCP catalog isolation; underlying need is multi-tenant correctness when tool lists depend on credentials.
- ([#8092](https://github.com/nearai/ironclaw/pull/8092)) — IME/Safari chat composer handling; underlying need is reliable international text input.
- ([#8072](https://github.com/nearai/ironclaw/pull/8072)) — Telegram command-menu registration; underlying need is discoverability of channel commands.
- ([#8093](https://github.com/nearai/ironclaw/issues/8093)) — daily failure taxonomy for `officeqa`; underlying need is benchmark/eval reliability and model-error classification.

## Bugs & Stability
Ranked by severity:
1. **High — MCP cross-caller tool overwrite:** ([#8090](https://github.com/nearai/ironclaw/pull/8090)) describes a hosted-MCP server whose tool list depends on the credential; the discovered catalog is published per extension ID, so user A’s and user B’s tools overwrite each other. A fix PR is open.
2. **Medium — WebUI IME composition regression:** ([#8092](https://github.com/nearai/ironclaw/pull/8092)) addresses native IME composition keys, command-menu handling, Enter-to-send, and Safari’s `keyCode 229` behavior. Fix PR is open with regression cases.
3. **Low/Maintenance — dependency bug fixes:** ([#8096](https://github.com/nearai/ironclaw/pull/8096)) Vitest `4.1.9 → 4.1.11`, ([#8094](https://github.com/nearai/ironclaw/pull/8094)) js-yaml `4.3.1 → 4.3.2`, and ([#8095](https://github.com/nearai/ironclaw/pull/8095)) baseline-browser-mapping `2.10.17 → 2.11.22`.
4. **Quality signal, not a code bug:** ([#8093](https://github.com/nearai/ironclaw/issues/8093)) reports that `officeqa`’s 42 non-pass tasks are “overwhelmingly genuine model errors,” pointing to model/eval issues rather than harness failures.

No crashes or security regressions were explicitly reported in the issue feed today.

## Feature Requests & Roadmap Signals
- **Telegram command menu** ([#8072](https://github.com/nearai/ironclaw/pull/8072)): closed/merged; likely to appear in the next release if not already shipped.
- **WebUI internationalization/input** ([#8092](https://github.com/nearai/ironclaw/pull/8092)): IME and Safari Enter handling are strong signals for broader CJK/IME support.
- **Multi-tenant MCP correctness** ([#8090](https://github.com/nearai/ironclaw/pull/8090)): per-caller catalogs are important for hosted/enterprise MCP deployments.
- **Dependency modernization** ([#8097](https://github.com/nearai/ironclaw/pull/8097), [#8096](https://github.com/nearai/ironclaw/pull/8096), [#8094](https://github.com/nearai/ironclaw/pull/8094), [#8095](https://github.com/nearai/ironclaw/pull/8095)): ongoing maintenance; note `base64 0.22.1 → 0.23.1`, `uuid 1.24.0 → 1.26.0`, and `rust_decimal` updates in #8097 may need compatibility review.
- **Benchmark failure taxonomy** ([#8093](https://github.com/nearai/ironclaw/issues/8093)): may drive eval automation or model-routing fixes.

No explicit user-requested features appeared in the provided data.

## User Feedback Summary
Direct user feedback is absent in this window: no comments or reactions were recorded on the issue, and PR comment counts were unavailable. Inferred pain points from the code changes are:
- Cross-user MCP tool overwrites on credential-dependent hosted servers ([#8090](https://github.com/nearai/ironclaw/pull/8090)).
- IME/CJK/Safari input friction in the WebUI chat composer ([#8092](https://github.com/nearai/ironclaw/pull/8092)).
- Telegram command discoverability ([#8072](https://github.com/nearai/ironclaw/pull/8072)).
- Model failures on `officeqa` benchmark runs ([#8093](https://github.com/nearai/ironclaw/issues/8093)).

Satisfaction/dissatisfaction cannot be measured from engagement data, but open fix PRs indicate maintainers are responsive to correctness and UX issues.

## Backlog Watch
- ([#8090](https://github.com/nearai/ironclaw/pull/8090)) — open since 2026-09-08, updated 2026-09-10, no comments recorded. High-priority MCP tenant-isolation fix; needs review/merge attention.
- ([#8093](https://github.com/nearai/ironclaw/issues/8093)) — 0 comments; daily failure taxonomy may need triage, labels, or follow-up.
- ([#8092](https://github.com/nearai/ironclaw/pull/8092)) — new IME fix; needs review.
- ([#8097](https://github.com/nearai/ironclaw/pull/8097)) — 24-package Rust bump including `base64 0.23.1`; needs CI/compatibility validation.
- Low-risk dependency PRs: ([#8096](https://github.com/nearai/ironclaw/pull/8096)), ([#8094](https://github.com/nearai/ironclaw/pull/8094)), ([#8095](https://github.com/nearai/ironclaw/pull/8095)).

No long-unanswered issues or PRs beyond a few days are visible in the provided data.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-11

*Data window: last 24h · Source: github.com/agentscope-ai/QwenPaw*

---

## 1. Today's Overview

QwenPaw is in an active pre-release hardening cycle. In the last 24 hours the repository saw **29 issues updated** (19 open/active, 10 closed) and **35 PRs updated** (23 open, 12 merged/closed), plus **one new beta release (v2.2.1-beta.2)**. The dominant theme today is **bug-fix consolidation**: a large cluster of Console, channel (WeCom/Feishu/Telegram), and session-routing defects were closed, while a long-open session-management feature PR (#6978) finally landed. Activity is well above baseline and skews toward stabilization rather than new surface area, though several **unresolved subagent and sandbox-security issues** (see §5) are the main risk to this beta line.

---

## 2. Releases

### v2.2.1-beta.2 (Beta)
Release page: https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2

Included changes:
- **feat(console): improve mobile agent selector** — [PR #7623](https://github.com/agentscope-ai/QwenPaw/pull/7623) (@zhaozhuang521)
- **chore: bump version to 2.2.1b2** — [PR #7643](https://github.com/agentscope-ai/QwenPaw/pull/7643) (@cuiyuebing)
- **fix(console): align qwenpaw CSS selectors** — (@zhaozhuang, PR truncated in source data)

**Breaking changes / migration notes:** None indicated in the release notes.

**Release process signal:** An automated Release Duty verification issue was opened — [#7674](https://github.com/agentscope-ai/QwenPaw/issues/7674) "QwenPaw v2.2.1-beta.2 (Beta) — Installation Verification" — with a **4-hour pass deadline** across platform checkpoints. Release notes PR [#7673](https://github.com/agentscope-ai/QwenPaw/pull/7673) is still open, suggesting final release documentation is pending.

---

## 3. Project Progress

### Merged / Closed PRs today

| PR | Title | Impact |
|---|---|---|
| [#6978](https://github.com/agentscope-ai/QwenPaw/pull/6978) | feat(commands): add session management slash commands (`/sessions`, `/session`) | **Feature land** — gives IM channels (Matrix, QQ, Telegram) and HTTP callers parity with Console/TUI for listing, switching, and creating sessions |
| [#7647](https://github.com/agentscope-ai/QwenPaw/pull/7647) | fix(channels): support Base64 data URLs in outbound media | Fixes `OSError` on outbound `data:<mime>;base64,...` media across channels |
| [#7663](https://github.com/agentscope-ai/QwenPaw/pull/7663) | fix(memory): fall back when plugin backend is unavailable | Graceful degradation to built-in ReMeLight instead of failing workspace startup |
| [#7667](https://github.com/agentscope-ai/QwenPaw/pull/7667) | fix(files): show upload only in workspace | UI cleanup — upload entry hidden on read-only Profile/Daily/Digest tabs |

### Notable open PRs advancing

- [#7639](https://github.com/agentscope-ai/QwenPaw/pull/7639) — `perf(scroll)`: avoid repeated `PRAGMA quick_check` history integrity scans (per-process caching + concurrency guard).
- [#7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) — `fix(history)`: repair FTS corruption (`SQLITE_CORRUPT_VTAB`) and retention cleanup for #7596.
- [#7637](https://github.com/agentscope-ai/QwenPaw/pull/7637) — feat: QwenPaw-Data app 0.3.0, embedding QPD Data Console as a managed analysis engine.
- [#7665](https://github.com/agentscope-ai/QwenPaw/pull/7665) — `feat(console)`: grouped chat history with in-group pagination.
- [#7677](https://github.com/agentscope-ai/QwenPaw/pull/7677) — `fix(api)`: return structured 422 for non-finite validation inputs.
- [#7669](https://github.com/agentscope-ai/QwenPaw/pull/7669) — test-only: +18 regression cases for Console embedding verification and `toDisplayUrl`.
- [#7663](https://github.com/agentscope-ai/QwenPaw/pull/7663) and [#7667](https://github.com/agentscope-ai/QwenPaw/pull/7667) closed the same day as opened — fast turnaround on small fixes.

---

## 4. Community Hot Topics

**1. [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — [Discussion] QwenPaw Hub multi-tenant edition roadmap** · 24 comments · 4 👍 · OPEN since 2026-08-26
The single most active thread. QwenPaw is asking the community what to prioritize for the multi-tenant "Hub" edition shipping in 2.2.0, linking prior demand such as [#2324](https://github.com/agentscope-ai/QwenPaw/issues/2324) (multi-user access + admin-managed skills). **Underlying need:** teams want shared deployments with role-based administration — a clear shift from the project's personal-assistant origins.

**2. [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — [CLOSED] Model reply lost from context** · 10 comments
A detailed, well-instrumented report: assistant replies are persisted but invisible to subsequent requests, producing "empty response" symptoms. High engagement and rapid closure indicate maintainers took it seriously. **Underlying need:** reliable conversation-state consistency across persistence and context assembly.

**3. [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — Optimize the platform.agentscope.io/deploy homepage** · 9 comments · OPEN
Mobile UX complaints: the primary action entry is buried, and "Open" sits after "Stop," causing mis-taps. **Underlying need:** mobile-first deployment flows for non-technical operators.

**4. [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — [CLOSED] Console stop request cancels an active Feishu session** · 8 comments
Cross-session identity leakage where a Console stop cancelled a live Feishu conversation. **Underlying need:** strict session isolation when multiple UIs share one backend.

---

## 5. Bugs & Stability

Ranked by severity, with new/updated status noted.

### Critical / High

| Issue | Severity | Status | Notes |
|---|---|---|---|
| [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) — **Security sandbox bypassed on Windows** (2.2.0) | 🔴 Security | OPEN, 1 comment | Part 1/4 of a security research series; a Zhihu write-up is linked. No fix PR identified. Highest-priority item on the board. |
| [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — **`spawn subAgent` tasks all fail/timeout** (win 2.2.0) | 🔴 High | OPEN, new 2026-09-11 | User reports every subagent task times out regardless of timeout setting. No fix PR. |
| [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — **`subagent_model` has no effect** (2.2.1-beta.1/beta.2) | 🔴 High | OPEN | Spawned subagents always inherit parent `active_model`. Directly undercuts the per-task model selection work (#6302, #4901). Reproduced on both betas. |
| [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) — Feishu session queue consumer stuck alive → silent unresponsive session | 🟠 High | OPEN since 2026-09-03 | High-priority (priority=10 card) messages wedge the consumer; new messages can't spawn a replacement. No fix PR. |
| [#7668](https://github.com/agentscope-ai/QwenPaw/issues/7668) — Mail monitor `last_uid = 0` bypasses first-run guard, reprocesses entire INBOX | 🟠 High | OPEN, 1 comment | State-file edge case that can trigger a wake-up storm on every mailbox message. No fix PR. |

### Medium

- [#7661](https://github.com/agentscope-ai/QwenPaw/issues/7661) — **Incorrect new-session creation**: continuing an existing conversation spawns a duplicate session instead (main @ a403b24). OPEN, 4 comments.
- [#7445](https://github.com/agentscope-ai/QwenPaw/issues/7445) — QwenPaw Hub fails to connect to local/LAN model services (`127.0.0.1:8088/v1`) while cloud APIs work. OPEN since 2026-08-31.
- [#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507) — WeCom streams character-by-character (150 ms throttle) while WeChat sends full segments. OPEN.

### Resolved today (fixed/closed)

- [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — Assistant reply missing from context (empty-response symptom). ✅
- [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) — Console streaming renders nothing until turn completes in Chrome (fine in Safari). ✅
- [#7231](https://github.com/agentscope-ai/QwenPaw/issues/7231) — Console message delivered to wrong session on switch. ✅
- [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — Console stop cancelling active Feishu session. ✅
- [#3254](https://github.com/agentscope-ai/QwenPaw/issues/3254) — Console chat UUID missing (race with `GET /chats`). ✅
- [#7662](https://github.com/agentscope-ai/QwenPaw/issues/7662) — Telegram polling silently dies under proxy blackhole; watchdog only checks `updater.running`. ✅
- [#7516](https://github.com/agentscope-ai/QwenPaw/issues/7516) & [#7370](https://github.com/agentscope-ai/QwenPaw/issues/7370) — WeCom base64 data-URL images crashing (`OSError [Errno 36]`). ✅ **Fix: [PR #7647](https://github.com/agentscope-ai/QwenPaw/pull/7647)**
- [#7666](https://github.com/agentscope-ai/QwenPaw/issues/7666) — HF local-model download failure / no quantized-file selection (closed and reviewed later). ✅
- [#7634](https://github.com/agentscope-ai/QwenPaw/issues/7634) — ClawHub skill install fails on duplicate names. ✅

**Takeaway:** The Console + channel bug backlog is being burned down efficiently, but **subagent execution (#7678, #7676) and Windows sandbox security (#7672) are open, unremediated risks heading into 2.2.1 GA.**

---

## 6. Feature Requests & Roadmap Signals

**New/updated requests today:**

| Issue | Request | Likelihood for next version |
|---|---|---|
| [#7671](https://github.com/agentscope-ai/QwenPaw/issues/7671) | Auto-downscale oversized images instead of placeholder-dropping them (>2 MiB `MAX_INLINE_MEDIA_BYTES`) | Medium — self-contained, low-risk |
| [#7670](https://github.com/agentscope-ai/QwenPaw/issues/7670) | Syntax highlighting in Files-panel Preview mode | Medium — Console polish, likely paired with existing viewer work |
| [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) | `memory_model` config to decouple memory summarize/dream from the expensive main LLM | Medium-High — cost-saving, aligns with current ReMe/memory refactor (#7444, #7663) |
| [#7657](https://github.com/agentscope-ai/QwenPaw/issues/7657) | Add **ntfy** channel (self-hosted push, ~34k ★); **working implementation ready** | High — contributor-supplied, fits the channel matrix |
| [#7656](https://github.com/agentscope-ai/QwenPaw/issues/7656) | Durable cross-session/restart memory (MemCode offering integration) | Low-Medium — vendor integration, needs design review |
| [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) | Deploy-page mobile UX redesign | Medium — recurring mobile theme (cf. #7623, #7378) |
| [#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) | `tls_verify` / `ca_file` for MCP streamable_http clients (self-signed / private CA) | Medium — enterprise/self-hosted blocker |

**Roadmap reading:** Two vectors are converging — **(a) multi-tenant/enterprise readiness** (Hub #7318, MCP TLS #4175, mailing/queue robustness) and **(b) mobile-first console** (#7623 shipped, #7378 draft native app, #7177). Memory cost control (#7664) and durable memory (#7656) suggest memory architecture is the next major investment area.

---

## 7. User Feedback Summary

**Pain points (dissatisfaction):**
- **Session integrity in multi-UI/multi-channel setups** — the strongest cluster: #7231, #7011, #3254, #7661, #7676. Users running Console + Feishu/Telegram concurrently experience messages landing in the wrong session, phantom new sessions, and cross-cancellation.
- **Subagent reliability** — #7678 ("not one task completed, all timeouts") and #7676 (`subagent_model` silently ignored) represent real feature breakage for power users.
- **Self-hosted / local-model friction** — #7445 (LAN model endpoints through Hub) and #7666 (HF download + quantized file selection) show the home-lab audience hitting setup walls.
- **Mobile ergonomics** — #7177 (mis-taps on Stop, buried entry points) and the shipped #7623 mobile selector fix indicate sustained mobile demand.
- **Channel performance parity** — #7507 (WeCom 150 ms char-by-char streaming) is a perceived-quality gap vs. WeChat.

**Positive signals / satisfaction:**
- 4 👍 and 24 comments on the Hub roadmap thread show an engaged, invested community being consulted directly.
- Multiple high-quality, well-evidenced bug reports (repro steps, version pinning, log excerpts in #7534, #7579, #7662) and **contributor-supplied solutions** (#7657 ntfy "implementation ready", #5992 per-session models, #6960 PawPort) indicate a healthy contributor pipeline.
- Rapid close turnaround on 10 issues in a single day — most within days of filing — signals responsive maintenance.

---

## 8. Backlog Watch

Items needing maintainer attention — long-open and/or high-impact with limited traction.

| Item | Age | Status | Why it matters |
|---|---|---|---|
| [#3113](https://github.com/agentscope-ai/QwenPaw/issues/3113) — Team-collaboration instruction ignored until retried | **~5 months** (since 2026-04-08) | OPEN, 2 comments | Multi-agent collaboration is a flagship capability; first-request failure directly damages the demo path. |
| [#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) — MCP `tls_verify` / `ca_file` | **~4 months** (since 2026-05-10) | OPEN, 3 comments | Blocks enterprise self-signed/private-CA MCP servers. Small, well-scoped change. |
| [PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) — Per-session model overrides | **~2 months** (since 2026-07-12) | OPEN, Under Review, first-time contributor | Directly related to today's #7676 regression; landing it would resolve overlapping model-selection complaints. |
| [PR #6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) — Reranker UI config panel | **~7 weeks** (since 2026-07-23) | OPEN, Under Review | UI half of reranker feature; paired backend PR unclear. Risk of drift/conflict. |
| [PR #6969](https://github.com/agentscope-ai/QwenPaw/pull/6969) — Avoid duplicate tool result on MCP `structuredContent` (#6958) | ~4 weeks (since 2026-08-13) | OPEN, Under Review | Correctness bug affecting all FastMCP tools returning both `content` and `structuredContent`. |
| [PR #6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) — PawPort import flow (Codex/Qoder migration) | ~4 weeks (since 2026-08-13) | OPEN | Large, high-value onboarding feature with no visible review activity. |
| [PR #7444](https://github.com/agentscope-ai/QwenPaw/pull/7444) — Unify ReMe slash commands | ~11 days | OPEN | Rebased on landed #7561; needs reviewer pickup to complete memory-command unification. |
| [PR #7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) — Native mobile experience (Expo/RN) | ~2 weeks | OPEN, **DO NOT MERGE** | Strategic mobile client; needs an explicit decision on scope and merge path. |
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — Hub roadmap discussion | 16 days | OPEN, 24 comments | High community investment; needs a maintainer synthesis/decision to keep momentum. |

---

*Digest generated from GitHub activity data for 2026-09-11. All links resolve to `github.com/agentscope-ai/QwenPaw`.*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-11

## 1. Today's Overview

ZeroClaw shows **very high raw activity but zero throughput**: 50 issues and 50 PRs were touched in the last 24 hours, yet **0 issues closed and 0 PRs merged or closed**. The active surface is entirely open (50/50 open issues, 50/50 open PRs), indicating a queue that is growing rather than draining. Work is concentrated in three clusters: Windows/platform portability (`#7462`, `#7461`, `#8800`, `#10735`, `#10703`), security hardening around auth/principals/attestation (`#10248`, `#10255`, `#10275`, `#10321`, `#9101`), and release/CI hygiene (`#7108`, `#9101`, `#8519`). No release was cut, so the project remains on the v0.8.x line referenced in `#9101`. Overall health signal: **strong contributor engagement, but a visible review/merge bottleneck and a large, aging P1 backlog.**

---

## 2. Releases

**None.** No new releases in the last 24 hours, and no release notes to summarize. The most recent release referenced in open work is **v0.8.3**, cited in issue [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) as shipping with three parallel provenance/signing mechanisms (cosign bundles, GitHub artifact attestations, slsa-github-generator).

---

## 3. Project Progress

**No PRs were merged or closed today**, so there is no shipped progress to report. However, several PRs advanced through review activity:

| PR | Title | Status signal |
|---|---|---|
| [#10735](https://github.com/zeroclaw-labs/zeroclaw/pull/10735) | fix(rpc): heap-pin largest `process_line` dispatch branches for Windows stack | Updated 2026-09-11, small (`size:XS`), Windows-focused |
| [#10768](https://github.com/zeroclaw-labs/zeroclaw/pull/10768) | feat(channels): add Sendblue iMessage/SMS channel | New (created 2026-09-10), `size:XL` |
| [#10703](https://github.com/zeroclaw-labs/zeroclaw/pull/10703) | fix(providers): satisfy Windows Clippy for cache builder | Small Windows CI fix |
| [#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511) | feat(quickstart): block persist when provider rejects credential | Onboarding correctness |
| [#10565](https://github.com/zeroclaw-labs/zeroclaw/pull/10565) | fix(zerocode): pin local Code sessions to process cwd | Regression follow-up to `#10541` |

**Blocked / do-not-merge work:** [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) (token accounting on history-trim) is `status:blocked` + `do-not-merge`; [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) (native Hailo-Ollama provider) is also `do-not-merge`.

**Structural observation:** the security stack series `#10248 → #10255 → #10275 → #10321` (RFC 7141 / #8289 auth rework: canonical principals, OIDC verification, browser PKCE, Nevis/iam_policy retirement) is fully open and stacked, meaning none of the auth modernization has landed.

---

## 4. Community Hot Topics

Ranked by comment count (issues only; PR comment counts were unavailable in the dataset):

1. **[#7462 — 74 test failures on Windows (19 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — Unix-only test commands, path semantics, console encoding (CP936). P1, `status:in-progress`, high risk. Opened Jun 10, still open after three months. Underlying need: **CI does not test Windows in the Test job**, so portability rot accumulates undetected.
2. **[#9101 — Consolidate release attestation mechanisms (9 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)** — three signing stories shipping 53 release assets. Need: reduce CI cost and supply-chain ambiguity.
3. **[#10549 — RFC: simplify RFC voting (8 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)** — remove mandatory discussion windows, make REVISE stop the snapshot. Need: governance friction reduction.
4. **[#5514 — Batch Telegram media groups into one multimodal turn (8 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)** — each image spawns a separate LLM request. Open since April. Need: coherent multimodal UX.
5. **[#6157 — Nextcloud Talk correct bot message API (8 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/6157)** — `status:blocked`, wrong API URL/secret handling. Need: working enterprise chat integration.
6. **[#10366 — RFC: PR review evidence & author-action boundaries (7 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/10366)** and **[#7108 — Improve cached Rust builds / CI critical path (7 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/7108)** — both reflect contributor frustration with a 15–20 minute PR CI and unclear review expectations.
7. **[#9486 — High-entropy detector redacts Solana wallet addresses (7 comments)](https://github.com/zeroclaw-labs/zeroclaw/issues/9486)** — `high_entropy_tokens=false` is not honored on the channel path.

**Meta-signal:** the top three hot issues are all about **process and infrastructure**, not product features — a sign the contributor base is hitting scaling friction.

---

## 5. Bugs & Stability

Ranked by declared severity:

### S0 — data loss / security risk
- **[#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279)** — `delegate` bypasses the parent's tool allowlist; sub-agents can invoke tools the parent policy excludes. P1, accepted, high risk. **No linked fix PR found in this window.**
- **[#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247)** — Shell tool workspace boundary bypass: a symlink inside the workspace allows shell commands to read/write outside it. P1, accepted, high risk. **No linked fix PR found.**

### S1 — workflow blocked
- **[#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559)** — Agents stop working when the chat window is closed in the web dashboard; the loop is treated as user-interrupted.
- **[#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207)** — `web_fetch` returns garbage for gzip/brotli/deflate responses. In-progress.
- **[#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** — Failed ACP turns disappear after switching sessions; transcript loss.
- **[#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421)** — Incomplete terminal responses can be reported as successful. In-progress.
- **[#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)** — Cron agent jobs have no wall-clock timeout; in-flight locks only cleared at process start.
- **[#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390)** — Emergency stop is a CLI-only state file that no runtime path reads.
- **[#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519)** — `audit.toml`/`deny.toml` drift; outstanding wasmtime-wasi CVEs.
- **[#9393](https://github.com/zeroclaw-labs/zeroclaw/issues/9393)** — Bluesky and Reddit channels have no sender authorization and no central gate.
- **[#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794)** — Stopping the agent mid-work erases tool calls and thinking from context.
- **[#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800)** — Windows: killed process leaves port bound (zombie LISTENING/CLOSE_WAIT), new daemon fails to start.

### S2/S3 — degraded behavior
- **[#9284](https://github.com/zeroclaw-labs/zeroclaw/issues/9284)** — Config flush can overwrite concurrent writes (P1).
- **[#9391](https://github.com/zeroclaw-labs/zeroclaw/issues/9391)** — Command audit logging defaults to enabled but writes nothing (P1).
- **[#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)** — MCP/tool-schema cloning drives unbounded RSS growth in the agent loop (P1, help wanted).
- **[#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486)** — High-entropy detector redacts Solana wallet addresses (P2).
- **[#9363](https://github.com/zeroclaw-labs/zeroclaw/issues/9363)** — Config metadata stays English in localized ZeroCode/web surfaces (P2).
- **[#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)** — Discord typing indicator stuck after dashboard daemon reload (P2).
- **[#9089](https://github.com/zeroclaw-labs/zeroclaw/issues/9089)** — Tool output supports `[IMAGE:]` but not `[AUDIO:]` markers (P2).
- **[#9332](https://github.com/zeroclaw-labs/zeroclaw/issues/9332)** — Multimodal context meter severely undercounts image-heavy requests (P2).
- **[#9177](https://github.com/zeroclaw-labs/zeroclaw/issues/9177)** — JIT loading fails with "Engine protocol startup was aborted" for Qwen3.6-35B-A3B (P2).
- **[#7899](https://github.com/zeroclaw-labs/zeroclaw/issues/7899)** — OpenAI STT provider ignores env-based credentials (P3).

**Fix-PR coverage:** Partial. Windows platform fixes have matching PRs ([#10735](https://github.com/zeroclaw-labs/zeroclaw/pull/10735), [#10703](https://github.com/zeroclaw-labs/zeroclaw/pull/10703)); ACP/turn persistence has [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197); image rejection has [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480); terminal fallback delivery has [#10417](https://github.com/zeroclaw-labs/zeroclaw/pull/10417); git allowed-roots has [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337). The two **S0 security issues (#8279, #9247) have no corresponding fix PR** in this window.

---

## 6. Feature Requests & Roadmap Signals

| Signal | Item | Likelihood of next release |
|---|---|---|
| New channel: Sendblue iMessage/SMS (non-Apple hosts) | [PR #10768](https://github.com/zeroclaw-labs/zeroclaw/pull/10768) | High — XL PR already open and freshly updated |
| Native Hailo-Ollama provider | [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | Low/Medium — currently `do-not-merge` |
| OIDC token-verification provider (`oidc.<alias>`) | [PR #10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) | Medium — stacked on `#10248`, needs the stack to land |
| Browser PKCE + cross-surface enrollment API | [PR #10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) | Medium — deep stack (7+ layers) |
| Retire Nevis/`iam_policy` with config shim | [PR #10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275) | Medium — refactor + docs |
| Batch Telegram media groups into one turn | [Issue #5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) | Medium — long-standing, in-progress |
| Windows + macOS CI test matrix | [Issue #7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) | Medium — directly gates #7462 |
| CI Rust cache / critical-path improvements | [Issue #7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) | Medium — accepted, high value |
| Consolidate release attestation (53 → ~20 assets) | [Issue #9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) | Medium — accepted, well-scoped |
| Quickstart blocks persist on rejected credential | [PR #10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511) | High — small, self-contained |

**Predicted next-release themes:** security/auth unification (RFC 7141 / #8289), onboarding correctness (quickstart credential validation), and platform parity (Windows/macOS CI + Clippy/RPC stack fixes).

---

## 7. User Feedback Summary

**Recurring pain points:**

- **Agent autonomy is fragile in the UI.** Two separate issues ([#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559), [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794)) report that leaving the dashboard or stopping the agent mid-work destroys or interrupts the run and its context. This is the strongest dissatisfaction signal in the dataset.
- **Security features misfire on legitimate content.** [#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486) — an agent cannot state a Solana wallet address; every address becomes `[REDACTED_HIGH_ENTROPY_TOKEN]`, and the documented escape hatch (`high_entropy_tokens=false`) does not work on the channel path. A real, reproducible user quote is included.
- **Onboarding can silently succeed with bad credentials.** [#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511) describes a "successful" quickstart that only fails at the user's first message.
- **Internationalization gaps.** [#9363](https://github.com/zeroclaw-labs/zeroclaw/issues/9363) — localized ZeroCode still shows English Config metadata. [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) was filed specifically on a Simplified-Chinese Windows console (CP936), suggesting non-English, non-Linux users are underserved.
- **Contributor experience friction.** [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) and [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) show contributors pushing back on review evidence requirements and mandatory RFC discussion timers; [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) cites 15–20 minute PR CI runs as a drag.
- **Resource stability.** [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) (unbounded RSS growth) is explicitly derived from a user-reported OOM scenario in WSL2 (#5542), indicating sustained memory-pressure complaints.

**Satisfaction signals:** less visible in this window — no positive reactions recorded (all 👍 counts are 0), and no merged PRs to point to as delivered value.

---

## 8. Backlog Watch

Open items with significant age and/or importance that need maintainer attention:

| Item | Age | Why it matters |
|---|---|---|
| [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) Telegram media batching | Opened 2026-04-08 (~5 months) | High-comment, in-progress, still unfixed multimodal UX bug |
| [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) Nextcloud Talk API | Opened 2026-04-27 | **`status:blocked`** — integration is broken and no path forward is visible |
| [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) CI cache critical path | Opened 2026-06-02 | Affects every contributor's iteration speed |
| [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) / [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) Windows/macOS CI + 74 failures | Opened 2026-06-10 | Three months open; three related platform PRs are still unmerged |
| [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) Delegate tool allowlist bypass (S0) | Opened 2026-06-24 | Security boundary violation with **no fix PR** |
| [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) cargo-audit/deny drift + wasmtime CVEs | Opened 2026-06-30 | Supply-chain risk, audit ignore-list drift |
| [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) Agent stops on chat-window exit | Opened 2026-06-30 | S1, in-progress, top user complaint |
| [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) Unbounded RSS growth | Opened 2026-07-03 | `help wanted`, OOM reports |
| [#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247) Shell workspace boundary bypass (S0) | Opened 2026-07-21 | Security boundary violation with **no fix PR** |
| [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) Hailo-Ollama provider | Opened 2026-07-17 | XL PR, `do-not-merge` — needs a decision, not more drift |
| [PR #9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) Token accounting on history-trim | Opened 2026-08-03 | `status:blocked` + `do-not-merge`; blocks visibility into trim behavior (#9619) |
| [PR #9399](https://github.com/zeroclaw-labs/zeroclaw/pull/9399) Quickstart checklist terminal width | Opened 2026-07-26 | Six weeks without merge on a contained CLI fix |

**Backlog risk assessment:** With S0 security issues lacking fix PRs, a `blocked` channel integration, and two `do-not-merge` XL PRs aging, the maintainer/reviewer capacity — not contributor willingness — appears to be the binding constraint. The single largest health risk today is the **0-merge day against 50 open PRs**, which, if sustained, will cause the security stack (#10248 → #10255 → #10275 → #10321) and the platform-portability fixes to stall indefinitely.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*