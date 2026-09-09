# OpenClaw Ecosystem Digest 2026-09-10

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-09 22:46 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-10

*Digest based on a sample of the top 50 issues and top 30 PRs out of 500+ items updated in the last 24h.*

---

## 1. Today's Overview

OpenClaw remains in an intense stabilization and feature-delivery cycle: 500 issues and 500 PRs were updated in the last 24 hours, with roughly 40% of issues closed (197) and about half of PRs merged/closed (251) — healthy throughput. No new release was published today; the project appears to be converging toward the next version after 2026.9.3, with a large, coherent PR stack around ClawHub plugin discovery/install UX waiting for maintainer review. A significant share of active community reporting is regression-driven, concentrated around the 2026.8.1/2026.9.x upgrade paths, Codex OAuth authentication, memory/session persistence, and multi-agent orchestration reliability. Notably, several P0/P1 regressions (Windows gateway startup, Telegram context leakage, Feishu plugin tool loss) have already been closed in the last 24h, indicating an active triage-and-fix pipeline.

---

## 2. Releases

**New releases: 0.** No version was published in this window, so no changelog, breaking-change, or migration notes apply. Several issues indicate that 2026.9.2/2026.9.3 are current targets for regression reporting (e.g., #143278, #142336, #141617).

---

## 3. Project Progress

**Merged/closed PRs (visible sample):** 251 PRs are merged/closed overall. Only one PR in the top-30 sample is closed — a test-infrastructure improvement:

- [#143427 [CLOSED] test: reuse prepared entry for CLI JSON failure coverage](https://github.com/openclaw/openclaw/pull/143427) — cuts 79–95s cold-load CLI test runs down by reusing a prepared entry.

**Notable issue closures in the last 24h** (suggesting landed/validated fixes):
- [#137813 (P0) Windows gateway never starts after 2026.9.1 update — `--task-supervisor` exits 0 silently](https://github.com/openclaw/openclaw/issues/137813) — closed.
- [#137927 Internal `<BEGIN_OPENCLAW_INTERNAL_CONTEXT>` block leaks into visible Telegram text](https://github.com/openclaw/openclaw/issues/137927) — closed.
- [#135111 Intermittent "Provider completed tool call with malformed JSON arguments" (claude-sonnet-5)](https://github.com/openclaw/openclaw/issues/135111) — closed P1 regression, 26 comments.
- [#140971 All Feishu plugin tools silently dropped in message-driven runs](https://github.com/openclaw/openclaw/issues/140971) — closed.
- [#141617 (P0) 2026.9.2 npm update stuck at requested/running](https://github.com/openclaw/openclaw/issues/141617) — closed.
- [#91352 OpenAI Codex OAuth migration leaves stale profile](https://github.com/openclaw/openclaw/issues/91352), [#95121 Codex OAuth ~28s latency](https://github.com/openclaw/openclaw/issues/95121), [#116851 Codex final replies lost for SQLite sessions](https://github.com/openclaw/openclaw/issues/116851) — closed.

**Feature/PR work advancing (mostly open, in review):**

- **ClawHub plugin catalog & Control UI stack** (dominant theme, ~11 PRs, several marked "ready for maintainer look"): unified plugin discovery and installation [#142782](https://github.com/openclaw/openclaw/pull/142782), unified installed-plugin detail tabs [#142713](https://github.com/openclaw/openclaw/pull/142713), plugin package-owned category taxonomy/backfill [#142710](https://github.com/openclaw/openclaw/pull/142710), ClawHub category enrichment [#142711](https://github.com/openclaw/openclaw/pull/142711), grouping installed plugins by category [#142712](https://github.com/openclaw/openclaw/pull/142712), completing the catalog [#137659](https://github.com/openclaw/openclaw/pull/137659), install-from-Control-UI wizard [#137886](https://github.com/openclaw/openclaw/pull/137886), local plugin federation [#137856](https://github.com/openclaw/openclaw/pull/137856), plugin detail pages [#137846](https://github.com/openclaw/openclaw/pull/137846), unified bundled/ClawHub discovery [#138755](https://github.com/openclaw/openclaw/pull/138755), plugin setup state/icon clarity [#142624](https://github.com/openclaw/openclaw/pull/142624).
- **Gateway/runtime fixes:** runtime-aware environment listing from CLI [#143446](https://github.com/openclaw/openclaw/pull/143446), heartbeat MCP child-process leak fix for isolated sessions [#143433](https://github.com/openclaw/openclaw/pull/143433), draining ingress claim fix [#142768](https://github.com/openclaw/openclaw/pull/142768), memory recall continue-after-trigger-timeout [#142693](https://github.com/openclaw/openclaw/pull/142693).
- **Native/platform:** macOS Apple Event permission probes off the cooperative thread pool [#143329](https://github.com/openclaw/openclaw/pull/143329), App Intents routed to selected conversations (iOS/macOS; draft awaiting security review) [#143259](https://github.com/openclaw/openclaw/pull/143259).
- **Cloud workers:** reuse completed project setup across cloud sessions [#143227](https://github.com/openclaw/openclaw/pull/143227).
- **UI polish:** preserve native menus for adopted sessions [#143342](https://github.com/openclaw/openclaw/pull/143342), sticky Stop button after finished turn [#143437](https://github.com/openclaw/openclaw/pull/143437), stale git update prompt cleanup [#142959](https://github.com/openclaw/openclaw/pull/142959), progress-turn exit-row eviction [#142802](https://github.com/openclaw/openclaw/pull/142802), iMessage typing/read-receipt recovery [#142626](https://github.com/openclaw/openclaw/pull/142626).

---

## 4. Community Hot Topics

Most-discussed issues (by comment count) reveal the community's three biggest anxieties: **upgrade regressions, auth instability, and session/memory integrity.**

- [#135111 (26 comments, closed) Intermittent "Provider completed tool call with malformed JSON arguments" — regression on v2026.8.1, claude-sonnet-5](https://github.com/openclaw/openclaw/issues/135111). The highest-engagement thread; the failure is not tied to a specific file/tool, making it hard to reproduce — a marker of unease about runtime reliability after minor-version upgrades.
- [#97616 (15 comments) OpenClaw leaks unreaped hook/tool child processes → zombie accumulation and runtime degradation](https://github.com/openclaw/openclaw/issues/97616). Open P1 regression since June; operators are running long-lived gateways and watching them degrade over time.
- [#119720 (15 comments) Synchronous agent persistence/transcript maintenance blocks the Gateway event loop at scale](https://github.com/openclaw/openclaw/issues/119720). Open P1; community wants the gateway to stay responsive while sessions grow. Tied to #140231/#138984 partial repairs.
- [#137927 (14 comments, closed) Internal context block leaks into visible Telegram message text](https://github.com/openclaw/openclaw/issues/137927). Security-adjacent and embarrassing for users; closure in this window is a positive signal.
- [#53628 (14 comments) `${XDG_CONFIG_HOME}` not expanded when installing a skill from ClawHub](https://github.com/openclaw/openclaw/issues/53628). Long-running P2 with an open linked PR; Docker users keep hitting it.
- [#43367 (14 comments) Multi-agent orchestration unstable: config overwrites, session-lock failures, detached child work](https://github.com/openclaw/openclaw/issues/43367). Linked PR open; parallel agent workflows remain friction-heavy.
- [#89278 (12 comments, P0) Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth refresh timeout](https://github.com/openclaw/openclaw/issues/89278) — 2 👍; release-blocking auth reliability.
- [#95610 (12 comments, 2 👍) Prompt-cache prefix churn defeats OpenAI automatic prefix caching](https://github.com/openclaw/openclaw/issues/95610) — a cost/perf issue that resonates with heavy API users.
- [#88757 (6 comments, 3 👍) Proactive agent messages invisible in session context → conversation desynchronization](https://github.com/openclaw/openclaw/issues/88757) — highest 👍-density in the sample; scheduled/heartbeat users feel this one.

Underlying need: users are running increasingly autonomous, scheduled, multi-channel, multi-agent workloads and are sensitive to any break in **state continuity** — session context, auth state, and process lifecycle. The reaction volume on upgrade regressions (v2026.7.1-2 → v2026.8.1 appears repeatedly) suggests users want a more conservative stability bar on minor releases.

---

## 5. Bugs & Stability

Bugs active in the last 24h, ranked by severity:

**P0 / Release-blocking**
- [#89278 — Codex OAuth refresh takes >10s; cron/heartbeat fail with auth refresh timeout despite successful probe](https://github.com/openclaw/openclaw/issues/89278) — open, has linked PR, labeled `ux-release-blocker`.
- [#115642 — Billing cooldown outlives the outage (~5h `disabledUntil`); no probe-based recovery/manual reset for subscription auth](https://github.com/openclaw/openclaw/issues/115642) — open, `ux-release-blocker`.
- *(Closed this window)* [#137813 Windows gateway never starts after 2026.9.1 update](https://github.com/openclaw/openclaw/issues/137813) and [#141617 2026.9.2 npm update stuck at requested/running](https://github.com/openclaw/openclaw/issues/141617) — both resolved.

**P1 / High**
- [#97616 — Zombie child-process accumulation degrades long-running gateways](https://github.com/openclaw/openclaw/issues/97616) — open since June, 15 comments, needs maintainer info/fix.
- [#119720 — Synchronous persistence blocks Gateway event loop at scale](https://github.com/openclaw/openclaw/issues/119720) — open, complex, partially repaired.
- [#136311 — memory-core reindex lock re-acquired on every Gateway start → index unrepairable, 19 GB orphaned temp DBs](https://github.com/openclaw/openclaw/issues/136311) — open, labeled platinum-hermit severity.
- [#140010 — Windows sleep/resume: UI/WebSocket reconnects fail 30–60s+ after wake](https://github.com/openclaw/openclaw/issues/140010) — open.
- [#142336 — Core `/dashboard` command shadows Telegram Mini App launcher (2026.9.2+ regression)](https://github.com/openclaw/openclaw/issues/142336) — open, queueable-fix label.
- [#139274 — Native `/codex bind` drops voice-note attachments and skips configured STT](https://github.com/openclaw/openclaw/issues/139274) — open.
- [#125570 — Skill Workshop update overwrites live skill description, silently breaking skill routing](https://github.com/openclaw/openclaw/issues/125570) — open.
- [#123799 — Production on 2026.5.12 needs safe upgrade/backport guidance for Codex compact 404](https://github.com/openclaw/openclaw/issues/123799) — open; operators asking for an escape hatch.
- [#112160 — SSH sandbox does not stage inbound media into existing remote workspace](https://github.com/openclaw/openclaw/issues/112160) — open.
- [#128637 — Multi-agent ambient ops fail with `AgentSelectionRequiredError`](https://github.com/openclaw/openclaw/issues/128637) — open.
- [#138042 — Gateway control requests stall 157–276s (health/control/chat.history)](https://github.com/openclaw/openclaw/issues/138042) — open; crash/hang class.
- [#115367 — Provider-owned read gate requires `origin: bundled`, but privileged surfaces ship as external plugins → reads locked to current conversation](https://github.com/openclaw/openclaw/issues/115367) — open security/architecture P1.
- [#88757 — Proactive messages invisible in session context → desync](https://github.com/openclaw/openclaw/issues/88757) — open.
- [#135111 — Malformed JSON tool-call arguments (claude-sonnet-5)] — **closed** this window.
- [#137927 — Internal context block leaking to Telegram] — **closed** this window.

Smaller but notable: #143278 (heartbeat internal output leaks to Telegram user chat on 2026.9.3), #141747 (~686 tokens/turn of non-opt-out runtime scaffolding), #139714 (`update in progress` forever), #139710 (mid-turn plugin supersede kills system-agent turn), #142037 (Slack explicit-route replies recorded as "mute"), #126906 (denying write tool silently disables memory persistence).

**Fix-PR availability:** A direct fix PR is visible for #89278 (`linked-pr-open`). #53628, #43367, #95610, #44502, #50611, #128076, and #133692 also carry open linked PRs. Many P1s above (e.g., #97616, #119720, #136311, #140010) remain without a clearly linked fix in the sample.

---

## 6. Feature Requests & Roadmap Signals

**Active feature requests with clear demand:**
- [#6599 — `/models test-fallback` command to verify fallback chains without waiting for a real failure](https://github.com/openclaw/openclaw/issues/6599) (Feb 2026, P3, maintainer-review + product-decision pending).
- [#6757 — Agent-triggered context compaction (self-compact tool)](https://github.com/openclaw/openclaw/issues/6757) (2 👍; filed autonomously by an agent — a sign of advanced users self-servicing).
- [#6625 — Graceful sub-agent timeout with pre-timeout warning to save work](https://github.com/openclaw/openclaw/issues/6625).
- [#50291 — Plugin hooks trace context (messageId/runId/parentSpanId) for distributed tracing](https://github.com/openclaw/openclaw/issues/50291) — observability-minded, likely to grow in priority as multi-agent deployments scale.
- [#87584 — Make group room-event steering configurable](https://github.com/openclaw/openclaw/issues/87584) (2 👍).
- [#46058 — Chat-first Android surface discussion](https://github.com/openclaw/openclaw/issues/46058); [#70266 — assistant avatar in macOS Talk Mode overlay](https://github.com/openclaw/openclaw/issues/70266).

**What the PR stack says is shipping next:** The ClawHub/plugin experience is the clearest roadmap signal — package-owned categories (#142710), ClawHub catalog enrichment (#142711), category grouping (#142712), unified discovery/install/detail flows (#142782, #142713, #137886, #137659, #137846) are queued and mostly "ready for maintainer look." Supporting signals: cloud-session project-setup reuse (#143227), native App Intents on iOS/macOS (#143259), and macOS App lifecycle fixes (#143329). Prediction: **the next minor release is likely a "plugin ecosystem UX" release**, possibly bundled with the heartbeat/MCP and iMessage/draining fixes (#143433, #142768, #142626) as stability cargo.

---

## 7. User Feedback Summary

- **Upgrade fatigue is real:** Recurring phrasing across issues is "worked before, now fails" with version pairs like 2026.7.1-2 → 2026.8.1, and 2026.8.2 → 2026.9.1/9.2/9.3. Several users explicitly report holding old versions in production (#123799 on 2026.5.12) and asking for operational guidance rather than just fixes.
- **Auth is the most painful subsystem:** Codex OAuth appears in a disproportionate share of top issues — timeouts (#89278), latency (#95121), stale profiles (#91352), plugin-induced runtime switching (#99449), billing cooldowns (#115642). Users need auth to be self-healing and observable.
- **State-integrity complaints dominate sentiment:** invisible proactive messages, lost session context on WebChat (#99925), memory writes silently disabled (#126906), internal scaffolding leaking to channels (#137927, #143278), "update in progress forever" (#139714) — each erodes trust in the agent's model of reality.
- **Positive signals:** The community is engaged and specific — including detailed source-level analysis in reports (#119720, #138042), and an agent autonomously filing a feature request (#6757). Fast closures of P0/P1 regressions (Windows startup, Feishu tools, internal-context leak) in the same window show maintainers responsive; the `clawsweeper` bot-driven triage labels (needs-maintainer-review, needs-product-decision, fix-shape-clear) suggest a disciplined, healthy review queue.

---

## 8. Backlog Watch

Long-running, high-signal items still needing maintainer attention:

- [#97616 — Zombie/unreaped child process leak (P1, open since 2026-06-29, 15 comments)](https://github.com/openclaw/openclaw/issues/97616) — oldest severe open regression in the sample with no visible fix PR.
- [#43367 — Multi-agent orchestration instability (P2, open since 2026-03-11, 14 comments, linked PR open)](https://github.com/openclaw/openclaw/issues/43367) — monitors concurrent `agents add`, session-lock, and detached-child hazards.
- [#53628 — `${XDG_CONFIG_HOME}` not expanded in skill installs (P2, open since 2026-03-24, 14 comments, linked PR open)](https://github.com/openclaw/openclaw/issues/53628) — long wait for a small-feeling fix in Docker setups.
- [#41201 — Control UI Avatar broken image (regression, open since 2026-03-09, 12 comments)](https://github.com/openclaw/openclaw/issues/41201) — cosmetic but persistent; needs product decision.
- [#88757 — Proactive messages invisible in session context (P1, open since 2026-05-31, 3 👍)](https://github.com/openclaw/openclaw/issues/88757) — affects every scheduled/heartbeat power user.
- [#60612 — `doctor` warns about NVM node but regenerates the launchd plist with NVM path every restart (open since 2026-04-04)](https://github.com/openclaw/openclaw/issues/60612) — un-fixable warning loop on macOS.
- [#6599 / #6757 / #6625 — February 2026 feature requests (fallback test, self-compact, graceful sub-agent timeout)](https://github.com/openclaw/openclaw/issues/6599) — all still in product-decision; aging ~7 months.
- [#114612 — SQLite unbounded growth of `memory_index_chunks` / `memory_embedding_cache` (P2, open since 2026-07-27)](https://github.com/openclaw/openclaw/issues/114612) — disk-filling class; flagged `dedupe:parent` and awaiting product decision.

---

*Overall health assessment: high activity with strong issue-throughput and an unusually coherent feature stack in flight, but the project is carrying a measurable regression debt around auth and session-state that is eroding upgrade confidence. Watch for a plugin-UX-centric release soon; expect continued investment in Codex OAuth self-healing and memory/session retention.*

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent OSS Ecosystem
**Date:** 2026-09-11 (reporting on 2026-09-10 digests)

---

## 1. Ecosystem Overview

The personal AI assistant open-source landscape has entered a broad stabilization-and-hardening phase rather than greenfield feature expansion: none of the five surveyed projects published a release on 2026-09-10, yet all show continuous PR/issue throughput. Across projects, community anxiety clusters around **state continuity** (session persistence, context compression, auth state), **upgrade regression fatigue**, and **Windows platform reliability**. The Model Context Protocol (MCP) has matured from novelty into production infrastructure — multitenancy, caller attribution, timeouts, and discovery are now being actively hardened. Plugin/extension economies (ClawHub, QwenPaw skills/marketplace, ZeroClaw's WASM RFC) are emerging as the next competitive battleground, while cost observability and prompt-cache management are becoming table-stakes features.

---

## 2. Activity Comparison

*Figures as reported in each project's digest (last 24h). OpenClaw's figures reflect a top-50-issue/top-30-PR sample across 500+500 total updates.*

| Project | Issues updated (closed) | PRs updated (merged/closed) | Release | Health* |
|---|---|---|---|---|
| **OpenClaw** | 500+ sampled; 197 closed (~40%) | 500+ sampled; 251 merged/closed (~50%) | None | 8.0/10 |
| **Hermes Agent** | 50 (5 closed) | 50 (4 merged/closed) | None | 7.0/10 |
| **IronClaw** | 1 (0 closed) | 6 (2 closed) | None | 7.5/10 |
| **QwenPaw** | 22 (11 closed) | 34 (8 merged/closed) | None | 7.5/10 |
| **ZeroClaw** | 37 (3 closed) | 50 (1 merged/closed) | None | 6.5/10 |

*Health = analyst qualitative score weighted by throughput, closure ratio, fix-PR availability, and backlog debt.*

**Reading:** OpenClaw operates at ~10× the issue/PR volume of any peer and maintains the best closure ratio. QwenPaw shows the strongest per-issue closure efficiency (50%). Hermes has responsive PR coverage but carries notable infrastructure debt. ZeroClaw's throughput is constrained by an RFC decision/review bottleneck. IronClaw is small but stable, with no severe open pain.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Unmatched community scale:** 500 issues + 500 PRs updated in 24h vs. 37–50 for the next tier; 197 issues closed in a single day exceeds most peers' total open volume.
- **Fastest P0/P1 triage pipeline:** Windows gateway startup failure, Telegram internal-context leak, Feishu plugin tool loss, and Codex OAuth stale profiles were all opened *and closed* within the window — evidence of a disciplined, bot-assisted triage queue (`clawsweeper` labels).
- **Most coherent in-flight feature stack:** ~11 PRs form a unified ClawHub plugin discovery/install/category UX — an unusually aligned push toward a plugin-economy release.
- **Broadest channel surface:** Telegram, Slack, iMessage, Feishu, WebChat coverage is wider than any peer's integration set.

**Technical approach differences:** OpenClaw is architected as a **gateway runtime** (event-loop-driven, with `--task-supervisor`, heartbeat/MCP child processes) supporting autonomous scheduled/multi-agent workloads. Peers lean desktop-app (Hermes), hosted-MCP infrastructure (IronClaw), local-runtime-first (QwenPaw), or RFC-governed core with an IDE surface (ZeroClaw).

**Community size comparison:** OpenClaw is the reference project and its activity dwarfs the field. The main caveat is that its scale brings proportional regression debt — auth (Codex OAuth) and session-state bugs are the most active complaint clusters. Community sentiment shows "upgrade fatigue" with users reporting version-paired regressions (2026.7.x → 2026.8.x/9.x), a dynamic less pronounced in smaller projects.

---

## 4. Shared Technical Focus Areas

Requirements emerging across multiple projects:

| Focus area | Projects | Specific needs |
|---|---|---|
| **Session/state continuity** | OpenClaw, Hermes, QwenPaw, ZeroClaw | Non-blocking persistence (OpenClaw #119720), compression correctness & no silent timeouts (Hermes #98466/#106866), FTS history corruption repair (QwenPaw #7596), append-only event history + transcript fidelity (ZeroClaw #10526, #10697), proactive-message context visibility (OpenClaw #88757) |
| **Auth self-healing & observability** | OpenClaw, Hermes, IronClaw, ZeroClaw | OAuth refresh timeouts/billing cooldowns (OpenClaw #89278/#115642), URL-corrupting sanitizer (Hermes #48860), per-caller identity on shared MCP servers (IronClaw #8084/#8090), OAuth cache-marker correctness (ZeroClaw #10662) |
| **Windows reliability** | OpenClaw, Hermes, QwenPaw | Gateway startup/sleep-resume failures (OpenClaw #137813/#140010), desktop update false-failures, DPI transparency, build failures (Hermes #105145/#105629/#106285), event-loop freezes (QwenPaw #7363) |
| **MCP production hardening** | IronClaw, QwenPaw, Hermes, OpenClaw | Configurable client timeouts (QwenPaw #7649), multi-user catalog isolation (IronClaw #8090), authenticated Streamable HTTP (Hermes #43633), heartbeat child-process leaks (OpenClaw #143433) |
| **Cost & cache accounting** | ZeroClaw, OpenClaw, Hermes | $0 spend reports defeating budget caps (ZeroClaw #9816), cache-prefix churn (OpenClaw #95610), stale/cross-contaminated context-usage stats (Hermes #94001) |
| **Plugin/skill ecosystems** | OpenClaw, QwenPaw, ZeroClaw, IronClaw | Unified discovery/install UX (ClawHub), skill versioning + dependency validation (QwenPaw #7609), composable plugin runtime (ZeroClaw #10076), consistent extension packaging rules (IronClaw #8085) |
| **Multi-agent orchestration** | OpenClaw, ZeroClaw, Hermes | Session-lock failures/config overwrites (OpenClaw #43367), subagent visibility in transcripts (ZeroClaw #8763), delegation acceptance criteria (Hermes #356 — closed but unimplemented) |
| **IME / multilingual input** | IronClaw (+ QwenPaw context) | Enter key confirming IME composition submits prematurely (IronClaw #8091); relevant to CJK users across the ecosystem |

---

## 5. Differentiation Analysis

| Project | Primary focus | Target users | Architecture signature |
|---|---|---|---|
| **OpenClaw** | Full personal AI assistant gateway; multi-channel, multi-agent autonomous operation | Prosumers/operators running always-on assistants (scheduled, heartbeat, cron) | Gateway runtime + ClawHub plugin economy; Control UI; npm-based distribution |
| **Hermes Agent** | Desktop-centric professional agent with heavy session/compression management, cloud sessions (Astra) | Desktop power users, multi-profile professionals | Electron desktop app; sophisticated compression/context pipeline; custom provider adapters |
| **IronClaw** | Hosted-MCP server infrastructure and extension packaging (nearai ecosystem) | MCP providers/operators; multi-tenant deployments | Hosted-MCP catalogs; per-caller attribution; extension manifest validation |
| **QwenPaw** | Self-hosted assistant with local runtime (llama.cpp), marketplace, WebChat console | Chinese + global self-hosting community; AgentScope lineage | Local-first model runtime; skill marketplace; browser console (v2.2.0); active test-coverage sprints |
| **ZeroClaw** | RFC-governed, architecture-first agent core + zeroCode IDE/ACP integration | Developers/technical integrators valuing governance and sandboxing | Heavy RFC process; WASM plugin roadmap; Bubblewrap/Landlock/Seatbelt sandboxing; mixed Rust/JS toolchain |

**Key contrasts:** OpenClaw optimizes for *autonomy and channel breadth*; Hermes for *desktop UX and session correctness*; IronClaw for *multi-tenant MCP infrastructure correctness*; QwenPaw for *local/self-hosted control*; ZeroClaw for *architectural rigor and code-surface integration* (zeroCode). ZeroClaw is the only project where the dominant community conversation is meta-architectural (RFC revision cycles, voting-process reform) rather than bug- or feature-driven.

---

## 6. Community Momentum & Maturity

**Tier 1 — Mass scale, rapid iteration:**
- **OpenClaw** — 500/500 daily issue/PR updates; feature stack converging on a likely "plugin ecosystem UX" release; P0/P1 regressions closed same-day. The reference project and pace-setter.

**Tier 2 — Steady hardening with specific debt:**
- **QwenPaw** — Strong velocity (11/22 issues closed) and a notable 2,475-case test-coverage sprint; but carries serious unaddressed items (event-loop freeze, silent llama.cpp runtime rollback). Shipping 2.2.0 regression fixes quickly.
- **Hermes Agent** — Responsive fix-PR culture (compression, Windows gateway hang, large-transcript guards) but publicly bleeding trust on two long-running automated-infrastructure failures (#66616, 186 comments since July; #88584, 81 comments since August). Windows confidence is measurably lower than macOS/Linux.
- **ZeroClaw** — Architecturally productive (three-issue zeroCode sidebar milestone shipped) but the RFC decision queue (#8692) is not keeping pace: 5 high-impact RFCs await maintainer review, 8 PRs are parked behind `needs-author-action`, and a large Anthropic cost/cache bug cluster sits in `in-progress`. Review throughput is the binding constraint.

**Tier 3 — Small, focused consolidation:**
- **IronClaw** — Quietly iterating on hosted-MCP multitenancy and IME input correctness. No turbulence, but the lone open Telegram PR (#8072) has waited since September 4 — indicating a small maintainer bench.

**Overall:** No project shipped a release in the window — the ecosystem is mid-cycle: OpenClaw converging on a plugin-UX release; Hermes absorbing compression/Windows fixes; ZeroClaw finishing the zeroCode sidebar batch; QwenPaw consolidating 2.2.0 regressions.

---

## 7. Trend Signals

**For AI agent developers, the 2026-09-10 digests collectively signal:**

1. **State continuity is the #1 trust axis.** Session persistence, context compression, memory writes, and proactive-message visibility dominate cross-project complaints. Agents that silently lose state — invisible messages, dropped tool results, dead memory persistence — generate the most emotional community response. Build session architecture as a reliability feature, not an afterthought.

2. **Upgrade regression fatigue is reshaping release strategy.** OpenClaw users explicitly report holding old versions in production (#123799); QwenPaw users were burned by silent runtime rollbacks; Hermes users hit Windows update false-failures. The demand is for conservative minor-release stability bars, backport/escape-hatch guidance, and regression test suites that catch "worked before, now fails" pairs.

3. **Auth must be self-healing and observable.** Codex OAuth timeouts, stale profiles, billing-cooldown dead-ends, and URL-corrupting sanitizers appear disproportionately across top issues. Agent developers should treat auth as a long-lived stateful subsystem — with refresh probes, recovery paths, and clear status surfacing — not a one-time handshake.

4. **Plugin/extension economies are the next battleground.** ClawHub's ~11-PR coherent stack, QwenPaw's skill versioning/dependency work, ZeroClaw's WASM plugin RFC, and IronClaw's extension packaging fixes all point the same direction: the winning agent platform will make third-party capability install/discovery/packaging reliable and safe.

5. **MCP has crossed into production.** The questions are no longer "what is MCP" but multitenant catalog isolation, caller attribution (SEP-414), configurable timeouts, and child-process lifecycle. Multi-user correctness on shared MCP infrastructure is an unsolved problem most projects are only now touching.

6. **Cost/cache transparency is now expected.** $0 spend reports defeating budget caps (ZeroClaw), prompt-cache prefix churn (OpenClaw), and stale context-usage meters (Hermes) show that heavy users will hold platforms to accurate cost accounting, including cache-write and cache-read granularity.

7. **Windows remains the weak flank — and a differentiator opportunity.** Three of five projects carry Windows-specific P1s (gateway startup, sleep/resume, desktop build failures, event-loop freezes). A project that makes Windows reliability first-class can capture the most underserved segment of this market.

8. **Automation/ops credibility matters.** The two highest-comment issues in the entire ecosystem this cycle are Hermes's own automated freshness watchdog (#66616) and scheduled-merge blocker (#88584) — months-old infrastructure failures with massive comment volume. For agent platforms, dogfooding reliability (or visibly failing at it) has outsized community impact.

---

*Report compiled from project community digests dated 2026-09-10. Issue/PR counts are as reported per project and reflect differing sample methodologies; OpenClaw's metrics are sampled from 500+500 daily updates. Health scores are qualitative analyst assessments, not project metrics.*

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-10

**Project:** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. Today's Overview

Hermes Agent is in a high-activity maintenance and hardening phase: **50 issues** and **50 PRs** were updated in the last 24 hours, with triage flowing well (45 open / 5 closed issues; 46 open / 4 merged-or-closed PRs). No release was cut today, but the pipeline is clearly converging on stability work — the dominant themes are **Windows platform reliability**, **session-state / compression correctness**, and **desktop UX defects**. Several high-severity bugs already have fix PRs in flight ([#106866](https://github.com/NousResearch/hermes-agent/pull/106866), [#106934](https://github.com/NousResearch/hermes-agent/pull/106934), [#106838](https://github.com/NousResearch/hermes-agent/pull/106838)), indicating responsive maintainers. Community attention remains split between automated-infrastructure incidents ([#66616](https://github.com/NousResearch/hermes-agent/issues/66616), [#88584](https://github.com/NousResearch/hermes-agent/issues/88584)) and product-direction requests around desktop session management and mobile access.

---

## 2. Releases

**No new releases** in the last 24 hours. The project appears to be between release cuts, with effort concentrated on regression fixes and pending PRs that will likely roll into the next version.

---

## 3. Project Progress

**Merged/closed PRs (visible today):**

- **[#106866 — fix: compression no longer times out silently on aux retries and stays on the session's OpenAI endpoint](https://github.com/NousResearch/hermes-agent/pull/106866)** *(CLOSED)* — Salvages #98480 and resolves [#98466](https://github.com/NousResearch/hermes-agent/issues/98466), a P2 bug where auxiliary retry/fallback attempts bypassed the progress-hook wrapper and the idle watchdog killed healthy compression calls. This is a meaningful reliability win for long-session compression.
- **[#106927 — fix(web): Firecrawl waitFor for lazily loaded extracts](https://github.com/NousResearch/hermes-agent/pull/106927)** *(CLOSED as duplicate)* — Addressed pages that hydrate after first paint returning empty-looking markdown; closed as overlapping with existing work.

**Resolved issues today:**

- **[#105145 — Windows desktop-driven `hermes update` false FAILED (exit 8)](https://github.com/NousResearch/hermes-agent/issues/105145)** *(CLOSED, P1)* — Post-update verification resolved the wrong working directory; the most-commented bug of the week is now fixed.
- **[#98466 — Auxiliary retry/fallback bypasses progress-hook wrapper](https://github.com/NousResearch/hermes-agent/issues/98466)** *(CLOSED, P2)* — Fixed via #106866 above.
- **[#105369 — Fresh Astra session fails after background review with conflicting authenticated continuation identities](https://github.com/NousResearch/hermes-agent/issues/105369)** *(CLOSED, P2)*.
- **[#356 — Feature: Acceptance Criteria & Independent Judge for Sub-agent Delegation](https://github.com/NousResearch/hermes-agent/issues/356)** *(CLOSED)* — Long-open feature proposal (since March) finally closed, though not via an obvious merged implementation.

**Themes in progress:** compression-handoff deduplication ([#106867](https://github.com/NousResearch/hermes-agent/pull/106867)), large-transcript gateway exhaustion ([#106838](https://github.com/NousResearch/hermes-agent/pull/106838)), Windows non-interactive gateway hang/double-spawn ([#106934](https://github.com/NousResearch/hermes-agent/pull/106934)), and memory-policy transparency ([#106928](https://github.com/NousResearch/hermes-agent/pull/106928)).

---

## 4. Community Hot Topics

- **[#66616 — Skills index is stale or degraded](https://github.com/NousResearch/hermes-agent/issues/66616)** — **186 comments.** The most-active issue by a wide margin. An automated freshness probe has been reporting a degraded `/docs/api/skills-index.json` (29.8h old vs. 26h limit) since July 18. The comment volume suggests significant community frustration with a slow-moving infra problem.
- **[#88584 — Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584)** — **81 comments.** Scheduled Nous-to-Enterkey merge has been blocked on conflicts in `cron/jobs.py` since August 17. Second-most-active issue, again an automation/ops reliability concern rather than a product bug.
- **[#105145 — Windows `hermes update` false FAILED (exit 8)](https://github.com/NousResearch/hermes-agent/issues/105145)** — **17 comments, now closed.** High engagement on a Windows update regression; resolved.
- **[#70421 — Desktop: show all chats under a project](https://github.com/NousResearch/hermes-agent/issues/70421)** — **7 👍, 5 comments.** Strongest positive-reaction signal this cycle: users want the 3-session preview cap removed for multi-chat project work.
- **[#11911 — Native Mobile App (iOS & Android) with Voice Calling](https://github.com/NousResearch/hermes-agent/issues/11911)** — **7 comments, 2 👍.** Persistent roadmap ask since April, still `needs-decision`.
- **[#48860 — OAuth prompt sanitizer greedy-replaces docs URL](https://github.com/NousResearch/hermes-agent/issues/48860)** — **5 comments, P1.** `hermes-agent.nousresearch.com` is rewritten to the dead `claude-code.nousresearch.com` (NXDOMAIN) because of an over-broad string replace.

**Underlying needs:** the top conversations are about *trust in automated infrastructure* (watchdogs, scheduled integrations) and *desktop session-management ergonomics*, rather than model quality — a sign the core agent experience is stable enough that users are focused on surface area and operations.

---

## 5. Bugs & Stability

Ranked by severity. New reports from the last 24h are marked *(new)*.

**P1 — Critical**

- **[#48860 — OAuth sanitizer breaks docs URLs (NXDOMAIN)](https://github.com/NousResearch/hermes-agent/issues/48860)** *(open since June)* — Greedy string replace in `agent/anthropic_adapter.py` mangles real URLs. No fix PR yet.
- **[#105629 — Windows desktop build fails: electron-builder asar rewrite → rcedit "Unable to commit changes"](https://github.com/NousResearch/hermes-agent/issues/105629)** *(new-ish, Sep 8)* — Deterministic packaged-build failure on Windows 11 affecting `hermes update` / `hermes desktop`.
- **[#105145](https://github.com/NousResearch/hermes-agent/issues/105145)** — resolved this cycle (see above).

**P2 — High**

- **[#106838 (PR) — Large legacy transcripts exhaust the gateway (P0-impact description)](https://github.com/NousResearch/hermes-agent/pull/106838)** — Opening large compacted conversations can allocate multiple GB and freeze Desktop RPCs for 30+ seconds. Fix PR is open.
- **[#102792 — Desktop "+" new session loses owner metadata → "Couldn't open this session" on multi-profile installs](https://github.com/NousResearch/hermes-agent/issues/102792)** — Needs repro; breaks new-session creation for multi-profile users.
- **[#106909 — Rootless Docker: iron-proxy binds to unreachable loopback](https://github.com/NousResearch/hermes-agent/issues/106909)** *(new)* — Proxy reports healthy on `127.0.0.1` but containers resolve `host.docker.internal` to `172.17.0.1`; every egress sandbox fails.
- **[#94001 — Desktop status-bar context usage stale/cross-session-contaminated after compression](https://github.com/NousResearch/hermes-agent/issues/94001)** — Wrong token percentages shown; compression + stats interplay.
- **[#92644 — Scanner false-positives on SOUL.md content describing prompt-injection defenses](https://github.com/NousResearch/hermes-agent/issues/92644)** — Legit security teaching content blocked.

**P3 — Moderate**

- **[#106359 — Gateway zombie on Windows: TCP port exhaustion freezes event loop](https://github.com/NousResearch/hermes-agent/issues/106359)** *(new)* — Heartbeat stops but background threads keep logging; sessions eventually lost via `ws_orphan_reap`.
- **[#106285 — Windows Desktop window becomes transparent crossing DPI-scaled displays](https://github.com/NousResearch/hermes-agent/issues/106285)** *(new)*.
- **[#106292 — Kanban CLI completion bypasses `pre_tool_call` hooks → premature root completion](https://github.com/NousResearch/hermes-agent/issues/106292)** *(new)* — Lifecycle policy enforcement gap.
- **[#99533 — Firecrawl `web_extract` flattens 403/404 into successful empty results](https://github.com/NousResearch/hermes-agent/issues/99533)** — `metadata.statusCode` never checked; closed PR #106927 suggests a fix exists elsewhere.
- **[#105247 — Group chat harvest window drops late replies after busy-extended timeouts](https://github.com/NousResearch/hermes-agent/issues/105247)**.

**Fix-PR availability:** strong — #106866 (compression aux retries), #106934 (Windows gateway hang + double-spawn), #106838 (large transcripts), #106933 (Mistral/custom-provider tool-arg crash), #106916 (custom provider key flattening), #106931 (`hermes doctor` traceback).

---

## 6. Feature Requests & Roadmap Signals

**High-signal requests:**

- **[#70421 — Show all chats under a project](https://github.com/NousResearch/hermes-agent/issues/70421)** — 7 👍. Remove the 3-session sidebar cap. Strong candidate for a near-term desktop release.
- **[#106267 — Per-tool-scope YOLO mode via `/yolo allow/deny`](https://github.com/NousResearch/hermes-agent/issues/106267)** *(new)* — Granular bypass approvals instead of all-or-nothing. Builds naturally on existing YOLO infra.
- **[#106258 — Resolve slash commands from loose natural language](https://github.com/NousResearch/hermes-agent/issues/106258)** *(new)* — "switch to grok oauth" should map to `/model xai-oauth`.
- **[#106253 — Desktop "Fast" toggle clarity](https://github.com/NousResearch/hermes-agent/issues/106253)** *(new)* — Users misread Fast as a quality tradeoff instead of a billed priority lane; a UX-copy + affordance fix.
- **[#106918 — Show effective background memory approval policy in `/memory`](https://github.com/NousResearch/hermes-agent/issues/106918)** *(new)* — A companion fix PR [#106928](https://github.com/NousResearch/hermes-agent/pull/106928) is already open.
- **[#106908 — Cron: support future `start_at` for recurring jobs](https://github.com/NousResearch/hermes-agent/issues/106908)** *(new)* — Avoids unsafe "compare wall clock in a fresh LLM session" workarounds.

**Longer-horizon roadmap signals:** native mobile app with voice ([#11911](https://github.com/NousResearch/hermes-agent/issues/11911), since April), mid-task model switching / prompt injection ([#106269](https://github.com/NousResearch/hermes-agent/issues/106269)), dynamic workspace bindings for terminal provider plugins ([#104163](https://github.com/NousResearch/hermes-agent/issues/104163)), and caching for settings page models ([#106299](https://github.com/NousResearch/hermes-agent/issues/106299)).

**Prediction:** the next release will likely absorb the compression-handoff dedupe ([#106867](https://github.com/NousResearch/hermes-agent/pull/106867)), Windows gateway hang fix ([#106934](https://github.com/NousResearch/hermes-agent/pull/106934)), and the large-transcript guard ([#106838](https://github.com/NousResearch/hermes-agent/pull/106838)). Shipped UX polish like `/memory` policy display is already paired with PRs. Mid-term, per-tool YOLO and the project-session list are the most probable feature additions given existing infrastructure.

---

## 7. User Feedback Summary

- **Windows remains the pain point.** Users report update false-failures (exit 8, now fixed), deterministic packaged-build failures ([#105629](https://github.com/NousResearch/hermes-agent/issues/105629)), DPI-crossing transparency ([#106285](https://github.com/NousResearch/hermes-agent/issues/106285)), and event-loop-freezing TCP exhaustion ([#106359](https://github.com/NousResearch/hermes-agent/issues/106359)). Windows confidence is clearly lower than on macOS/Linux.
- **Desktop session management frustrates power users.** Complaints recur about the 3-session cap ([#70421](https://github.com/NousResearch/hermes-agent/issues/70421)), broken "+" new-session on multi-profile setups ([#102792](https://github.com/NousResearch/hermes-agent/issues/102792)), stale/cross-contaminated context usage ([#94001](https://github.com/NousResearch/hermes-agent/issues/94001)), and stuck inline embeds overlaying the UI ([#79833](https://github.com/NousResearch/hermes-agent/issues/79833)).
- **Accuracy/trust issues in tooling:** users are bothered that a scanner blocks their legitimate anti-prompt-injection SOUL.md content ([#92644](https://github.com/NousResearch/hermes-agent/issues/92644)) and that Firecrawl failures look like successful empty extractions ([#99533](https://github.com/NousResearch/hermes-agent/issues/99533)) — both erode confidence in agent tooling.
- **Control & transparency desires:** users want finer-grained approval control (per-tool YOLO), live CLI flexibility (natural-language slash commands, mid-task model switches), and honest labeling of paid features like "Fast."
- **Infrastructure sentiment:** the two highest-comment issues ([#66616](https://github.com/NousResearch/hermes-agent/issues/66616), [#88584](https://github.com/NousResearch/hermes-agent/issues/88584)) signal lingering unease about the project's own automated tooling staying green.

---

## 8. Backlog Watch

Items needing maintainer attention:

- **[#66616 — Skills index stale/degraded](https://github.com/NousResearch/hermes-agent/issues/66616)** — 186 comments and open since **July 18**. An automated freshness watchdog failing for ~2 months is the single biggest community-visible reliability black eye.
- **[#88584 — Automated Nous integration blocked](https://github.com/NousResearch/hermes-agent/issues/88584)** — 81 comments, open since **August 17**; cron merge conflicts left unresolved.
- **[#48860 — P1 OAuth sanitizer docs-URL corruption](https://github.com/NousResearch/hermes-agent/issues/48860)** — Open since **June 19** with no fix PR; P1 severity but aging.
- **[#11911 — Native mobile app request](https://github.com/NousResearch/hermes-agent/issues/11911)** — Open since **April 18**, tagged `needs-decision`; deserves an explicit roadmap answer.
- **[#79833 — Desktop stuck inline embed overlay](https://github.com/NousResearch/hermes-agent/issues/79833)** — Open since **August 6**, no movement; UI-blocking bug.
- **Long-open PRs needing review/merge:**
  - [#43633 — feat(mcp): authenticated Streamable HTTP serving](https://github.com/NousResearch/hermes-agent/pull/43633) *(open since June 10)*
  - [#45317 — fix(bluebubbles): prevent duplicate turns](https://github.com/NousResearch/hermes-agent/pull/45317) *(open since June 13)*
  - [#73572 — fix(auth): honor built-in provider api_key config](https://github.com/NousResearch/hermes-agent/pull/73572) *(open since July 28)*
  - [#93452 — fix(honcho): session titles must not override sessionStrategy](https://github.com/NousResearch/hermes-agent/pull/93452) *(open since August 24)*

---

**Overall health assessment:** Hermes Agent is shipping steady regression fixes with responsive PR coverage, but carries meaningful backlog debt in automated infrastructure ([#66616](https://github.com/NousResearch/hermes-agent/issues/66616), [#88584](https://github.com/NousResearch/hermes-agent/issues/88584)) and Windows platform confidence. Near-term release risk is low; the compression/session-state fixes in flight address the most complex correctness area in the codebase.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-10

## Today's Overview
IronClaw saw moderate activity: **1 new/open issue** and **6 pull requests updated** in the last 24 hours, with **2 PRs closed** and no new releases published. The main development focus is concentrated on hosted-MCP behavior, extension packaging, and WebChat input handling. No release or breaking-change signals are present. Overall project health appears stable, with maintainers actively iterating on multi-user MCP correctness and operator-facing configuration semantics.

## Releases
None. No new IronClaw releases were published in this window.

## Project Progress
The two closed PRs represent completed work in the configuration and hosted-MCP packaging areas:

- [#8088 [CLOSED] feat(common): distinguish a set-but-empty env var from an unset one](https://github.com/nearai/ironclaw/pull/8088)  
  Fixes a silent failure mode where `FOO=` and an absent `FOO` were treated identically, allowing an empty env var to incorrectly fall back to a default value. This matters for deployment decisions like endpoint overrides.

- [#8089 [CLOSED] feat(extensions): bundle the agent-market hosted-MCP provider package](https://github.com/nearai/ironclaw/pull/8089)  
  Adds the first-party agent.market provider package in the same shape as other bundled hosted-MCP packages, with static tool declarations as a pre-discovery fallback.

## Community Hot Topics
There are no items with unusually high comment/reaction activity in the current data, but several recently updated PRs and issues are the main focus of community attention:

- [#8091 [OPEN] bug(webchat-v2): Enter sends the message while confirming IME composition](https://github.com/nearai/ironclaw/issues/8091)  
  A user-facing input bug affecting IME users. Japanese/Chinese/Korean input methods rely on Enter to confirm composition; this PR shows that confirmation is being treated as chat submission.

- [#8084 [OPEN] feat(mcp): opt-in SEP-414 caller attribution on outbound hosted-MCP calls](https://github.com/nearai/ironclaw/pull/8084)  
  Addresses a provider-side need to distinguish per-conversation calls and retries, rather than seeing only one bearer token per user.

- [#8090 [OPEN] fix(mcp): key discovered hosted-MCP catalogs per caller, not per extension](https://github.com/nearai/ironclaw/pull/8090)  
  Fixes a multi-user tool-catalog overwrite problem. The underlying need is correct per-caller isolation on shared hosted-MCP servers.

These items signal strong community interest in making hosted-MCP servers conversation-aware and safely multi-tenant.

## Bugs & Stability
Ranked by severity:

1. **IME composition accidentally sends chat messages** — [#8091](https://github.com/nearai/ironclaw/issues/8091)  
   In WebChat v2, pressing Enter to confirm input-method composition submits the message prematurely. This is high severity for IME users because it sends unfinished text. No fix PR is currently linked.

2. **Hosted-MCP catalog collision across users** — [#8090](https://github.com/nearai/ironclaw/pull/8090)  
   Tool discovery is stored per extension ID, so one user’s discovery overwrites another’s on credential-dependent servers. A fix PR is open.

3. **Operator-installed packages can be built but not used** — [#8085 [OPEN] fix(extensions)](https://github.com/nearai/ironclaw/pull/8085)  
   Inconsistent rules between `from_host_bundled_manifest_with_inline_dynamic_schemas` and `validate_consistency` cause some operator-installed packages to fail at use time. A fix PR is open.

4. **Empty env var being treated as unset** — [#8088](https://github.com/nearai/ironclaw/pull/8088)  
   Closed as fixed. An operator typo could silently select a default configuration path.

## Feature Requests & Roadmap Signals
- **SEP-414 caller attribution for hosted MCP** — [#8084](https://github.com/nearai/ironclaw/pull/8084)  
  This is a clear roadmap item: opt-in attribution so hosted MCP providers can identify conversations and retries. Likely to continue toward next release.

- **Telegram command menu registration** — [#8072](https://github.com/nearai/ironclaw/pull/8072)  
  Open since 2026-09-04 and sized as **L** with **low risk**. It registers Bot API command menus at activation. This is a user-facing Telegram polish feature likely to land soon.

- **Bundled hosted-MCP provider packages** — [#8089](https://github.com/nearai/ironclaw/pull/8089)  
  Though closed, its completion signals continued investment in a bundled, first-party hosted-MCP provider ecosystem.

## User Feedback Summary
- **WebChat v2 IME users** are dissatisfied that Enter confirms composition and immediately sends a message. The desired behavior is that Enter only commits the composed text unless the user intentionally sends the message.

- **Hosted-MCP administrators/developers** report the need for per-conversation and retry-aware identity, and warn that per-extension catalogs cause user A’s tools to leak into or overwrite user B’s session.

- **Operators** want environment variables that are intentionally set to empty to be respected, not silently ignored, and want operator-installed extension packages to behave identically to host-bundled ones.

- **Telegram channel users** appear to benefit from discoverable commands via the Bot API command menu, which is implemented in [#8072](https://github.com/nearai/ironclaw/pull/8072).

## Backlog Watch
- [#8072 [OPEN] feat(telegram): register the Bot API command menu at activation](https://github.com/nearai/ironclaw/pull/8072)  
  Oldest open PR in this batch, created 2026-09-04 and still open as of 2026-09-10. It is marked **size: L**, **risk: low**, and appears ready for maintainer review/merge.

- [#8091 [OPEN] bug(webchat-v2): Enter sends the message while confirming IME composition](https://github.com/nearai/ironclaw/issues/8091)  
  Open for only a short time, but currently has no comments or linked fix. It affects a broad set of IME users and deserves early maintainer triage.

No other long-unanswered high-priority items appear in the current dataset.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-10

## 1. Today's Overview
In the 24h window ending 2026-09-10, QwenPaw showed high maintenance activity: 22 issues and 34 PRs were updated, with 11 issues closed and 8 PRs marked merged/closed. No new release was published. Open work remains substantial — 11 open/active issues and 26 open PRs — but activity skews toward bug-fixing, code review, and consolidation rather than brand-new announcements. Community discussion continues to be split between Chinese-language UI/UX feedback and broader self-hosting, channel, memory, and tooling requests. Overall project health looks solid, with persistent stability concerns around streaming, database integrity, event-loop responsiveness, and silent runtime auto-updates.

## 2. Releases
No releases were published in this reporting window, so there are no changelog entries, breaking-change notes, or migration instructions to summarize.

## 3. Project Progress
Among the PRs visible in the digest, two closed PRs represent concrete feature progress:

- [PR #7649 — feat(mcp): support configurable timeout for HTTP/SSE clients](https://github.com/agentscope-ai/QwenPaw/pull/7649): Adds an optional `http_timeout` parameter to MCP client config, API schemas, and driver handling. This addresses the longstanding [issue #3997](https://github.com/agentscope-ai/QwenPaw/issues/3997) about MCP timeouts being silently discarded.
- [PR #7609 — feat(skills): expose versions and validate declared dependencies](https://github.com/agentscope-ai/QwenPaw/pull/7609): Implements skill versioning/dependency metadata requested in [issue #7557](https://github.com/agentscope-ai/QwenPaw/issues/7557), including MCP requirements checks and safer skill loading.

Several open PRs also advanced significantly and are likely to be next to merge:

- [PR #7655 — fix(history): repair FTS corruption and retention cleanup](https://github.com/agentscope-ai/QwenPaw/pull/7655) targets [issue #7596](https://github.com/agentscope-ai/QwenPaw/issues/7596).
- [PR #7652 — fix(models): preserve provider-resolved context windows](https://github.com/agentscope-ai/QwenPaw/pull/7652) prevents premature context compaction.
- [PR #7647 — fix(channels): support Base64 data URLs in outbound media](https://github.com/agentscope-ai/QwenPaw/pull/7647) fixes file-path misclassification of data URLs.
- [PR #7653 — test(unit): coverage sprint batch 2, 2475 cases](https://github.com/agentscope-ai/QwenPaw/pull/7653) raises statement coverage from 64.41% to 69.43%.

Closed issues in this window also indicate progress on UI/UX regressions and bug reports, including modal overlay styling, MCP timeout configuration, working-directory path editing, and QQ group-channel behavior.

## 4. Community Hot Topics
The most-discussed issues in the last 24h cluster around UI ergonomics, desktop responsiveness, and web console behavior:

- [Issue #7177 — Feature: optimize the deploy homepage UX](https://github.com/agentscope-ai/QwenPaw/issues/7177) — 8 comments. User wants primary actions placed above the fold and safer placement of the "Stop" control, especially on mobile.
- [Issue #7597 — Bug: tool-returned image/PDF base64 triggers 400](https://github.com/agentscope-ai/QwenPaw/issues/7597) — 7 comments, closed. High relevance for agent tools returning files to the user.
- [Issue #7363 — Bug: sync calls freeze event loop and timeout never fires](https://github.com/agentscope-ai/QwenPaw/issues/7363) — 6 comments, open. Windows desktop unresponsiveness for 118–135s during startup and send.
- [Issue #7228 — Bug: installed marketplace apps still show "Install" on hover](https://github.com/agentscope-ai/QwenPaw/issues/7228) — 6 comments, closed. Confusing marketplace state feedback.
- [Issue #5329 — Feature: add agent-switch button in collapsed sidebar](https://github.com/agentscope-ai/QwenPaw/issues/5329) — 5 comments, closed. Mobile-browser users cannot switch agents after sidebar collapse.
- [Issue #6460 — High CPU in Edge + Wayland on home/session page](https://github.com/agentscope-ai/QwenPaw/issues/6460) — 5 comments, closed. Suspicion on large result rendering/WebSocket pushes.
- [Issue #7642 — Bug: console streaming renders nothing until turn completes in Chrome](https://github.com/agentscope-ai/QwenPaw/issues/7642) — 4 comments, open. Same session works in Safari, pointing to a Chromium-specific streaming/rendering issue.

Underlying user needs are clear: safer and more efficient mobile/web UI, reliable streaming responses, better desktop responsiveness, and clearer state feedback in the app marketplace/agent switcher.

## 5. Bugs & Stability
Ranked roughly by user impact and severity:

- **High — [Issue #7363: Synchronous calls block the event loop and timeout never fires](https://github.com/agentscope-ai/QwenPaw/issues/7363)**. QwenPaw Desktop on Windows becomes unresponsive for ~2 minutes during startup and message send. No visible fix PR yet, so this is a critical stability concern.
- **High — [Issue #7633: llama.cpp version format parsing failure causes silent rollback](https://github.com/agentscope-ai/QwenPaw/issues/7633)**. A manually upgraded 5-digit llama.cpp build is silently replaced with the pinned older build because `has_update` misparses version numbers. This erodes trust in the desktop runtime updater.
- **High — [Issue #7642: Console streaming renders nothing until the turn completes in Chrome](https://github.com/agentscope-ai/QwenPaw/issues/7642)**. Blocking behavior in Chromium but not Safari; indicates a browser-specific streaming regression.
- **Medium — [Issue #7628: Context compaction can exceed provider request budget](https://github.com/agentscope-ai/QwenPaw/issues/7628)**. Active turns can still fail because compaction does not account for the full provider request size.
- **Medium — [Issue #7596: history.db FTS corruption undetected; retention purge fails silently](https://github.com/agentscope-ai/QwenPaw/issues/7596)**. Closed, with fix PR [PR #7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) now open.
- **Medium — [Issue #7597: Tool-returned binary sent as bare base64 causes 400 errors](https://github.com/agentscope-ai/QwenPaw/issues/7597)**. Closed.
- **Low/Regression — [Issue #7622: Modal backgrounds "transparent" in v2.2.0](https://github.com/agentscope-ai/QwenPaw/issues/7622)**. Closed.
- **Low/Regression — [Issue #7601: Working directory picker no longer supports manual path editing in 2.2.0](https://github.com/agentscope-ai/QwenPaw/issues/7601)**. Closed.
- **Low — [Issue #7618: QQ group messages ignored after adding bot to a group](https://github.com/agentscope-ai/QwenPaw/issues/7618)**. Closed.

Related fix-PRs in flight include [PR #7654](https://github.com/agentscope-ai/QwenPaw/pull/7654) for audio-fallback error classification and [PR #7647](https://github.com/agentscope-ai/QwenPaw/pull/7647) for Base64 data URLs in outbound channel media.

## 6. Feature Requests & Roadmap Signals
Several feature requests signal where the project may head next:

- **Browser/console UX customization**:
  - [Issue #7648 — custom webpage title for multiple QwenPaw panels](https://github.com/agentscope-ai/QwenPaw/issues/7648).
  - [Issue #7177 — deploy-page layout and mobile action placement](https://github.com/agentscope-ai/QwenPaw/issues/7177).
  - [Issue #5329 — agent switch in collapsed sidebar mode](https://github.com/agentscope-ai/QwenPaw/issues/5329), now closed.
  - [Issue #7600 — QwenPaw "traffic light" status indicator](https://github.com/agentscope-ai/QwenPaw/issues/7600).
- **Channel/notification integration**:
  - [Issue #7657 — add ntfy channel support with working implementation ready](https://github.com/agentscope-ai/QwenPaw/issues/7657).
  - [Issue #7650 — pass channel-level metadata such as QQ number/phone to MCP tools](https://github.com/agentscope-ai/QwenPaw/issues/7650).
- **Memory/context and model routing**:
  - [Issue #7656 — durable memory across sessions](https://github.com/agentscope-ai/QwenPaw/issues/7656).
  - [Issue #7628 — better context compaction budget handling](https://github.com/agentscope-ai/QwenPaw/issues/7628).
  - [Issue #7644 — make default-agent essential parameters editable in the UI](https://github.com/agentscope-ai/QwenPaw/issues/7644).
- **Skills/ecosystem**:
  - [Issue #7557 — skill versioning and dependency metadata](https://github.com/agentscope-ai/QwenPaw/issues/7557), addressed by [PR #7609](https://github.com/agentscope-ai/QwenPaw/pull/7609).

Looking at review velocity, the MCP timeout support ([PR #7649](https://github.com/agentscope-ai/QwenPaw/pull/7649)) and skill versioning ([PR #7609](https://github.com/agentscope-ai/QwenPaw/pull/7609)) are strong candidates for the next patch/minor release. The ntfy feature ([Issue #7657](https://github.com/agentscope-ai/QwenPaw/issues/7657)) could move quickly if maintainers accept the submitted implementation; durable memory ([Issue #7656](https://github.com/agentscope-ai/QwenPaw/issues/7656)) looks more like a roadmap-level discussion item.

## 7. User Feedback Summary
Real user pain points across the last 24h include:

- **Mobile/browser UI is still not comfortable**: users report mis-tapping "Stop", being unable to reach agent-switch buttons in collapsed sidebar mode, and needing custom page titles when running multiple QwenPaw panels.
- **Version regressions matter**: 2.2.0 users reported the working-directory picker losing manual path editing, transparent modal backdrops, and a marketplace "Install/Uninstall" state problem.
- **Self-hosted/power users want control**: they are frustrated by silent llama.cpp runtime rollback, non-configurable MCP timeouts, and limited options for pushing notifications via ntfy.
- **Streaming and performance affect trust**: Chrome users see no console output until the turn ends; Windows desktop users experience blocking event-loop behavior; Edge/Wayland users report sustained CPU use on large pages.
- **Contributor energy is high**: multiple issues come with ready implementations or detailed root-cause analysis — e.g. ntfy support, Playwright self-healing, FTS corruption repair, and large test-coverage batches.

Overall satisfaction is mixed: the project is responsive enough to close many reported bugs, but users continue to expect more reliability and finer-grained control over runtime, UI, and channel behavior.

## 8. Backlog Watch
Several open PRs and issues appear to be waiting for maintainer review or follow-up:

- [PR #6399 — feat: add reranker UI config panel to ReMeLightMemoryCard](https://github.com/agentscope-ai/QwenPaw/pull/6399), created 2026-07-23, still under review.
- [Issue #7363 — synchronous calls freeze event loop and timeout never fires](https://github.com/agentscope-ai/QwenPaw/issues/7363), created 2026-08-27, no visible fix PR yet despite high severity.
- [PR #6776 — fix(browser): self-heal dead Playwright driver connections](https://github.com/agentscope-ai/QwenPaw/pull/6776), first-time contributor, open since 2026-08-07.
- [PR #6969 — fix: avoid duplicate tool result when MCP returns structuredContent](https://github.com/agentscope-ai/QwenPaw/pull/6969), open/under review since 2026-08-13.
- [PR #7057 — fix(shell): add user-local bin dirs to subprocess PATH](https://github.com/agentscope-ai/QwenPaw/pull/7057), marked ready-for-human-review, open since 2026-08-15.
- [PR #7237 — fix(console): prevent session races during queued sends and switches](https://github.com/agentscope-ai/QwenPaw/pull/7237), open since 2026-08-24.
- [PR #7378 — DO NOT MERGE: QwenPaw native mobile experience](https://github.com/agentscope-ai/QwenPaw/pull/7378), open draft since 2026-08-28.

These items are worth monitoring: several are mature, targeted fixes with clear user impact and may become bottlenecks if left unreviewed.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-10

## 1. Today's Overview

ZeroClaw is in a high-activity, release-quiet phase: 34 of 37 issues updated in the last 24 hours remain open, and 49 of 50 updated PRs are still in review. No new release shipped. Three accepted zeroCode UI issues were closed, marking completion of a multi-session/agent-sidebar milestone ([#9729](https://github.com/zeroclaw-labs/zeroclaw/issues/9729), [#9730](https://github.com/zeroclaw-labs/zeroclaw/issues/9730), [#9731](https://github.com/zeroclaw-labs/zeroclaw/issues/9731)), and one PR moved to merged/closed. The busiest threads remain long-running architecture RFCs, with a notable new cluster of Anthropic cost/cache-accounting bugs. Project health is broadly strong, but decision and review throughput is the main risk: multiple high-risk RFCs are awaiting maintainer action, and a substantial share of large open PRs are parked behind `needs-author-action` or `blocked`.

## 2. Releases

No new releases in the last 24 hours.

## 3. Project Progress

The single merged/closed PR is not itemized in the surfaced top-20 set, but the three closed issues clearly signal shipped work:

- [#9729 — zeroCode: track multiple concurrent live sessions per chat pane](https://github.com/zeroclaw-labs/zeroclaw/issues/9729) — closed; foundation for the agent sidebar.
- [#9730 — zeroCode: agent sidebar with status dots, add-picker, and click-to-switch](https://github.com/zeroclaw-labs/zeroclaw/issues/9730) — closed.
- [#9731 — zeroCode: move Quickstart from the mode bar into the sidebar](https://github.com/zeroclaw-labs/zeroclaw/issues/9731) — closed.

These complete the zeroCode agent-sidebar batch tracked under [#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727) and should surface in the next zeroCode release.

Fresh fix and housekeeping PRs entered review today:

- [#10732 — fix(service): select the daemon log by content, not existence](https://github.com/zeroclaw-labs/zeroclaw/pull/10732) — addresses the macOS/Windows/OpenRC `service logs` failure ([#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)).
- [#10733 — fix(channels): voice replies opening with an expressive audio tag](https://github.com/zeroclaw-labs/zeroclaw/pull/10733) — stops the voice "substantive reply" heuristic from rejecting ElevenLabs tags like `[whispers]`/`[laughs]`.
- [#10729 — chore(deps): bump js-yaml to 4.3.2](https://github.com/zeroclaw-labs/zeroclaw/pull/10729) — clears the GHSA-2883-xcg3-v3hh advisory from the daily `npm audit` lane.
- [#10730 — chore(assets): optimize PR-evidence images](https://github.com/zeroclaw-labs/zeroclaw/pull/10730) — lossless PNG compression.
- [#10680 — chore(deps): bump rust-all group with 44 updates](https://github.com/zeroclaw-labs/zeroclaw/pull/10680) — needs maintainer review.

## 4. Community Hot Topics

Highest-engagement issues by comment count:

- [#9487 — RFC: Runtime-owned conversation sessions and transport surface adapters](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — 36 comments; now at Revision 5, replacing the Revision 4 vote snapshot. A foundational debate about where conversation state lives and how transport adapters expose it.
- [#9488 — RFC: Unified file and attachment architecture for conversation surfaces](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — 29 comments; Revision 10, a long and heavily revised design discussion.
- [#6996 — RFC: Granular sandbox policy — filesystem restrictions](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) — 28 comments; open since May 28 and still `in-progress`, reconciling application-layer path admission with Bubblewrap/Landlock/Seatbelt backends.
- [#8692 — Tracker: Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — 15 comments; the project's own mechanism for draining the RFC decision backlog.
- [#10076 — RFC: Composable WASM plugin runtime architecture](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) — 12 comments.
- [#5514 — Bug: batch Telegram media groups into one multimodal turn](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — 8 comments; long-running user-visible channel bug.
- [#10526 — RFC: Append-only session event history, deterministic state replay](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) and [#10549 — RFC: Simplify RFC voting](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — 6 comments each.

Underlying need: the community is converging on a more rigorous session/data model (append-only history, file attachments, WASM plugins), but the RFC process itself is generating friction — Revision 5 and Revision 10 snapshots, mandatory discussion windows, and re-votes are prompting a meta-RFC ([#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)) to streamline voting. PR comment counts were not surfaced, but the largest open PRs — [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) (Gemini speech-to-speech broker), [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) (multiple models per provider profile), [#8966](https://github.com/zeroclaw-labs/zeroclaw/pull/8966) (live provider identity on usage events), and [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) (context-compaction anchored to model window) — represent the most consequential in-flight changes.

## 5. Bugs & Stability

Newly reported or newly active bugs ranked by severity:

**High (P1):**
- [#9816 — Anthropic provider reports $0.00 spend, so daily/monthly budget caps can never fire](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) — `in-progress` and `accepted`. Users with spend caps are effectively unprotected on the direct Anthropic provider.
- [#10697 — ZeroCode ACP transcript drops assistant text emitted before a tool call](https://github.com/zeroclaw-labs/zeroclaw/issues/10697) — `P1`, `risk:high`. Only post-last-tool text renders as the reply, causing transcript data loss in Code/ACP sessions.

**Medium (P2 / S2):**
- [#10731 — `zeroclaw service logs` prints nothing on macOS, Windows and OpenRC when the daemon is healthy](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) — newly filed; a fix PR already exists ([#10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732)).
- [#10721 — knowledge.db_path tilde expansion is a global replace, not a home prefix — knowledge tool silently dropped](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — newly filed; any `~` inside the path is replaced, corrupting paths. No fix PR yet.
- [#10625 — Internal `[media attachment]` placeholder delivered to users when a non-vision model is in use](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) — accepted; leaks internal markers to end users.
- [#10699 — cost ledger prices cache writes at the plain input rate, understating cache misses](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) — no `cache-write` rate exists in `ModelCostRates` or `TokenUsage`.
- [#10662 — OAuth system-prefix cache marker is below Anthropic's cache minimum and consumes one of four breakpoint slots](https://github.com/zeroclaw-labs/zeroclaw/issues/10662).
- [#10701 — user image attachment invalidates the entire history cache prefix on compatible providers](https://github.com/zeroclaw-labs/zeroclaw/issues/10701).
- [#10548 — Mermaid diagram accessibility lost inside the zoom dialog](https://github.com/zeroclaw-labs/zeroclaw/issues/10548) — S2 docs regression introduced by PR #10515.

**Low (S3):**
- [#10690 — Integrations "Configure" link slugifies provider display name (Z.AI → z-ai, path_not_found)](https://github.com/zeroclaw-labs/zeroclaw/issues/10690).
- [#10720 — zeroCode v0.8.5 agent responses render twice in the chat pane](https://github.com/zeroclaw-labs/zeroclaw/issues/10720) — display-only; tool call fires once.
- [#5514 — Telegram media groups not batched into one multimodal turn](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — open since April, still `in-progress`.

The concentration of cache-pricing and cache-prefix bugs ([#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816), [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699), [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701), [#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)) suggests provider cost/cache accounting is a genuine stability sore spot.

## 6. Feature Requests & Roadmap Signals

- **zeroCode sidebar milestone shipped** ([#9729](https://github.com/zeroclaw-labs/zeroclaw/issues/9729), [#9730](https://github.com/zeroclaw-labs/zeroclaw/issues/9730), [#9731](https://github.com/zeroclaw-labs/zeroclaw/issues/9731)) — should land in the next zeroCode release.
- **OpenAI Responses API feature cluster** — four fresh, related proposals by IftekharUddin: [async function tools](https://github.com/zeroclaw-labs/zeroclaw/issues/10704), [preserving opaque reasoning state across call paths](https://github.com/zeroclaw-labs/zeroclaw/issues/10706), [bounded programmatic tool calling](https://github.com/zeroclaw-labs/zeroclaw/issues/10707), and [active-response steering over WebSockets](https://github.com/zeroclaw-labs/zeroclaw/issues/10708). All are P2, `needs-maintainer-review`, and `risk:high` — a strong signal the next major cycle is Responses-native streaming and steering.
- [#10663 — Configurable 1-hour prompt-cache TTL for Anthropic cache markers](https://github.com/zeroclaw-labs/zeroclaw/issues/10663) — user-driven cost-control feature for native and passthrough Anthropic providers.
- [#8763 — Show subagent activity and expandable tool results in ZeroCode](https://github.com/zeroclaw-labs/zeroclaw/issues/8763) — accepted; likely paired with the new sidebar.
- RFCs moving toward decision: [#10526 — append-only session event history](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) is explicitly named by [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) as the exclusive authority for the event vocabulary, suggesting it is the architectural keystone for the next generation of session/replay features.

## 7. User Feedback Summary

- **Spend safety and cost visibility** is the sharpest pain point. Users of the direct Anthropic provider see `Spent today: $0.0000` while budgets silently cannot fire ([#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)); cache-write costs are understated ([#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)); and image attachments reset cache prefixes ([#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)), driving cost up. Users are asking for granular cache TTL control ([#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)).
- **zeroCode UI trust**: duplicated replies ([#10720](https://github.com/zeroclaw-labs/zeroclaw/issues/10720)) and dropped pre-tool-call assistant text ([#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)) erode confidence in the Code/ACP transcript; users want expandable subagent/tool visibility ([#8763](https://github.com/zeroclaw-labs/zeroclaw/issues/8763)).
- **Channel behavior**: Telegram users sending multiple images get multiple agent replies instead of one turn ([#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)); Matrix/"core" users receive literal `[media attachment]` placeholders with non-vision models ([#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625)); voice replies were being misclassified when starting with bracketed expressive tags (fix in [#10733](https://github.com/zeroclaw-labs/zeroclaw/pull/10733)).
- **Operational friction**: `service logs` silently producing no output outside systemd ([#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)) and a knowledge tool silently dropping because of broken `~` expansion ([#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721)) point to "fail-silent" behavior as a recurring annoyance.

Overall sentiment is engaged but cautious: contributors are iterating quickly and maintainers are closing accepted batches, while the cost-accounting and ZeroCode transcript bugs are the clearest sources of dissatisfaction this cycle.

## 8. Backlog Watch

- **[#6996 — RFC: Granular sandbox policy (filesystem restrictions)](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — open since May 28 with 28 comments; the oldest major RFC still `in-progress` and needing convergence between application-layer and OS-sandbox policy.
- **RFCs awaiting maintainer decisions** — [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) (Revision 5), [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) (Revision 10), [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076), [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526), and [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) all carry `needs-maintainer-review`. The maintainer decision queue tracker [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) exists precisely to drain this backlog, and the multiple revision/re-vote cycles suggest it is not keeping pace.
- **PRs parked behind `needs-author-action`** — [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) (Gemini speech-to-speech, XL, since Aug 28), [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391), [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337), [#8966](https://github.com/zeroclaw-labs/zeroclaw/pull/8966) (since Jul 11), [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324), [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809), [#10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214), and [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) — a large amount of high-value feature work is waiting on author rework.
- **Blocked / do-not-merge PRs** — [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) (token accounting on history-trim), [#10358](https://github.com/zeroclaw-labs/zeroclaw/pull/10358) (Mattermost approval prompts), and [#10304](https://github.com/zeroclaw-labs/zeroclaw/pull/10304) (PR review policy docs) need unblocking or explicit deferral.
- **Long-wait review item** — [#8546 — fix(cli): localize status fragments](https://github.com/zeroclaw-labs/zeroclaw/pull/8546) has been open since Jun 30 and was refreshed by a maintainer with regressions; still awaiting maintainer review after roughly two and a half months.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*