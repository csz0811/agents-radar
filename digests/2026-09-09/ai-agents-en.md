# OpenClaw Ecosystem Digest 2026-09-09

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-08 22:47 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-09

Data source: github.com/openclaw/openclaw | Snapshot: 2026-09-09

## 1. Today's Overview

OpenClaw activity remains very high: 500 issues and 500 PRs were updated in the last 24 hours. Of those, 285 issues are open/active and 215 are closed; 229 PRs are open and 271 are merged/closed. One new release, **v2026.9.3**, shipped during the window, focused on safer update rehearsal and recovery. The dominant theme of community and maintainer attention is hardening recent release paths: Windows/updater failures, silent session/message loss, model fallback regressions, and multi-agent reliability. Overall, project health is mixed but responsive — numerous P0/P1 reliability items have fixes or closed states, while several long-running "silent loss" issues remain open.

## 2. Releases

### v2026.9.3 — openclaw 2026.9.3

Released 2026-09-09-ish window. Key highlights:

- **Safer updates**: core and plugin changes are rehearsed in isolated candidate state before activation.
- Supports eligible **2026.9.2 migrations**.
- Recovers abandoned update records without stopping a healthy matching Gateway.
- Related issue: [#136997](https://github.com/openclaw/openclaw/issues/136997).
- Linked PR references: [#138839](https://github.com/openclaw/openclaw/pull/138839), [#141109](https://github.com/openclaw/openclaw/pull/141109), [#141175](https://github.com/openclaw/openclaw/pull/141175), [#1415](https://github.com/openclaw/openclaw/pull/1415).

No explicit breaking-change or manual migration notes were provided in the release excerpt.

## 3. Project Progress

271 PRs reached merged/closed state in the last 24 hours. Since only a top subset is visible in the digest feed, the following are notable entries that appear closed or otherwise advanced:

- [#137485](https://github.com/openclaw/openclaw/pull/137485) — **closed**: `fix(codex): stop marketplace polling when native plugins are disabled`
- [#142609](https://github.com/openclaw/openclaw/pull/142609) — **closed**: `fix(memory): align deep status with the published fallback index`
- [#142278](https://github.com/openclaw/openclaw/pull/142278) — **closed**: `fix(agents): explain returned fallback stops`

Other high-signal PRs moving through review with favorable labels (`ready for maintainer look`, `proof: sufficient`) include:

- [#142631](https://github.com/openclaw/openclaw/pull/142631) — `fix(update): restart Git installs upgrading from 2026.9.1`
- [#141869](https://github.com/openclaw/openclaw/pull/141869) — configured model fallbacks when the primary model times out
- [#141825](https://github.com/openclaw/openclaw/pull/141825) — making auth-provider cooldown bypass configurable
- [#131805](https://github.com/openclaw/openclaw/pull/131805) — keeping WebChat new-session model display and routing aligned
- [#137576](https://github.com/openclaw/openclaw/pull/137576) — worker input waits safely during setup/workspace sync
- [#142612](https://github.com/openclaw/openclaw/pull/142612) — reduce cold presence work when viewing multiple sessions

The presence of update-hardening PRs and closed memory/codex fixes suggests maintenance is actively converging on post-2026.9.x stability.

## 4. Community Hot Topics

Leading issues by comment count show concentrated concern about **silent loss, message delivery, and update/restart corruption**:

- [#44925](https://github.com/openclaw/openclaw/issues/44925) — *Subagent completion silently lost — no retry, no notification, no auto-restart on timeout* — **26 comments**. Long-running P1 with diamond-lobster severity. Users report distributed subagent failures with no surfaced error.
- [#135111](https://github.com/openclaw/openclaw/issues/135111) — *Intermittent "Provider completed tool call with malformed JSON arguments"* — **23 comments**. Appeared in v2026.8.1 with claude-sonnet-5; not tied to a file/tool.
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — *Unreaped hook/tool child processes accumulate as zombies* — **15 comments**. Tied to runtime degradation and crash-loop risk.
- [#43367](https://github.com/openclaw/openclaw/issues/43367) — *Multi-agent orchestration unstable* — **14 comments**. Config overwrites, session-lock failures, detached child work.
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — *Synchronous agent persistence blocks the Gateway event loop at scale* — **14 comments**.
- [#85251](https://github.com/openclaw/openclaw/issues/85251) — *Codex app-server emits notification:turn/started then goes silent* — **13 comments**. Embedded run wedges for full recovery window.
- [#127229](https://github.com/openclaw/openclaw/issues/127229) — *Telegram watchdog-released durable update falsely tombstoned* — **13 comments**.
- [#137813](https://github.com/openclaw/openclaw/issues/137813) — *Windows gateway never starts after 2026.9.1* — **12 comments**. P0, closed.
- [#139714](https://github.com/openclaw/openclaw/issues/139714) — *`openclaw status` reports "update in progress" forever* after failed post-core update resume — **12 comments**.
- [#137927](https://github.com/openclaw/openclaw/issues/137927) — *Internal context block leaks into visible Telegram message text* — **12 comments**. Closed.

Underlying need: users are asking for bulletproof **observability and recoverability** — if work cannot be retried, it must at least not vanish silently. Update/upgrade paths are also a major trust boundary.

## 5. Bugs & Stability

### P0 / Release-blocking

- [#136203](https://github.com/openclaw/openclaw/issues/136203) — **P0 open**: Windows de-DE 2026.8.2 upgrade leaves Doctor maintenance blocked and legacy workspace state behind.
- [#115642](https://github.com/openclaw/openclaw/issues/115642) — **P0 open**: Billing cooldown outlives outage on subscription auth; requests fail for hours after transient upstream errors.
- [#140908](https://github.com/openclaw/openclaw/issues/140908) — **P0 open**: `doctor --fix` / `gateway status --deep` fail with EACCES under systemd user service account, blocking post-upgrade migrations.
- [#137813](https://github.com/openclaw/openclaw/issues/137813) — **P0 closed**: Windows gateway never starts after 2026.9.1 due to silent `--task-supervisor` exit.

### High-severity regressions / open bugs

- [#139847](https://github.com/openclaw/openclaw/issues/139847) and [#141252](https://github.com/openclaw/openclaw/issues/141252) — **2026.9.2 regression**: reply runs fail with `Reply operation has no active tool authority snapshot`; messages arriving during an active reply can be dropped. Both remain open with `fix-shape-clear`/`queueable-fix` labels, but no dedicated fix PR is visible in the top PR set.
- [#135704](https://github.com/openclaw/openclaw/issues/135704) — iMessage reflections with `reply_to_guid` bypass the echo cache.
- [#135111](https://github.com/openclaw/openclaw/issues/135111) — Intermittent malformed JSON tool-call arguments on v2026.8.1, not tied to tool/file.
- [#136183](https://github.com/openclaw/openclaw/issues/136183) — Command executor hangs when spawning ssh; SIGTERM while waiting for banner (regression persisting through 2026.8.2).
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — Zombie child-process accumulation from hooks/tools causes runtime degradation.
- [#85251](https://github.com/openclaw/openclaw/issues/85251) — Codex app-server sessions wedged in `embedded_run` until stuck-session recovery.
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — Event-loop blocking from synchronous persistence at scale; partial repairs landed but issue remains open.
- [#87109](https://github.com/openclaw/openclaw/issues/87109) — Gateway heap growth at idle on macOS, silent cron failures under memory pressure (closed).

### Update-specific failures

- [#139714](https://github.com/openclaw/openclaw/issues/139714) — update run row can never finalize; `openclaw status` stuck on "update in progress".
- [#133984](https://github.com/openclaw/openclaw/issues/133984) — closed: 2026.7.1-2 → 2026.8.1 leaves Gateway unstartable; `doctor --fix` skips config-key migrations.
- [#134896](https://github.com/openclaw/openclaw/issues/134896) — closed: 5-blocker 2026.8.1 gateway restart cascade plus self-referential `doctor --fix` failure.

## 6. Feature Requests & Roadmap Signals

- [#96675](https://github.com/openclaw/openclaw/issues/96675) — **Owner-signed responsibility gates** for assistant memory, actions, skills, and evidence reuse. A privacy/control feature with real traction (+2, 10 comments).
- [#60602](https://github.com/openclaw/openclaw/issues/60602) — Per-agent Bedrock `requestMetadata` injection for multi-agent cost attribution. Likely meaningful for enterprise/multi-tenant usage.
- [#46058](https://github.com/openclaw/openclaw/issues/46058) — Discussion of a chat-first Android surface for OpenClaw; not a full upstream fork, but a request for alignment.
- [#83143](https://github.com/openclaw/openclaw/issues/83143) — Skip HEARTBEAT prompt when `HEARTBEAT.md` does not exist; reduces unnecessary model invocation.
- [#138279](https://github.com/openclaw/openclaw/issues/138279) — Ship Linux companion builds for aarch64 (.deb + AppImage); current Linux artifacts are amd64-only.
- [#115367](https://github.com/openclaw/openclaw/issues/115367) — Provider-owned read gate currently locked to bundled origins, but privileged chat surfaces are now external plugins; reads are effectively restricted in Slack/Discord/Matrix/etc.

Prediction: near-term releases are likely to continue focusing on update safety, reply-run tool-authority fixes, and configurable fallback/cooldown behavior. The "fix-shape-clear/queueable-fix" tagged items (#139847, #141252, #135704, #136203) appear most likely to land soon.

## 7. User Feedback Summary

User sentiment across issues shows real frustration with update and migration quality:

- Upgrade paths remain painful: users report needing "a dozen manual repair steps" ([#133984](https://github.com/openclaw/openclaw/issues/133984)) and "manual dist-source inspection" after a 5-blocker cascade ([#134896](https://github.com/openclaw/openclaw/issues/134896)).
- Silent loss is the largest trust issue: subagent results are lost with no retry/notification ([#44925](https://github.com/openclaw/openclaw/issues/44925)), Telegram outbound messages can be stuck and lost on restart ([#126246](https://github.com/openclaw/openclaw/issues/126246)), and the user sees generic errors even when provider health was fine ([#141694](https://github.com/openclaw/openclaw/issues/141694)).
- Memory/scale users report unrecoverable states, e.g. `memory-core` reindex lock never released and 19 GB of orphaned temp DBs ([#136311](https://github.com/openclaw/openclaw/issues/136311)).
- Plugin/packaging skew after updates is also common: exact-pinned official plugins stay on prior core versions ([#135776](https://github.com/openclaw/openclaw/issues/135776)), and official plugins can be rejected by key-store trust checks ([#138342](https://github.com/openclaw/openclaw/issues/138342)).

The release of v2026.9.3 and the number of closed PRs targeting update/fallback issues indicate the team is addressing these complaints, but many users have already lost trust in non-interactive migration/doctor paths.

## 8. Backlog Watch

Issues that have remained open for a long time and still carry maintainer/product-decision flags:

- [#43367](https://github.com/openclaw/openclaw/issues/43367) — opened 2026-03-11: multi-agent orchestration instability; P1, `needs-maintainer-review`, `needs-product-decision`. Quietly active for 6 months.
- [#44925](https://github.com/openclaw/openclaw/issues/44925) — opened 2026-03-13: subagent completion silently lost; P1, `needs-maintainer-review`, `needs-product-decision`, 26 comments.
- [#56693](https://github.com/openclaw/openclaw/issues/56693) — opened 2026-03-29: OpenAI Codex OAuth can bind to a deactivated ChatGPT workspace.
- [#86174](https://github.com/openclaw/openclaw/issues/86174) — opened 2026-05-24: WebChat "New Session" model display/routing mismatch has a linked, reviewable fix PR ([#131805](https://github.com/openclaw/openclaw/pull/131805)) but the issue remains open.
- [#92870](https://github.com/openclaw/openclaw/issues/92870) — opened 2026-06-14: system event text leaked into user attribution during compaction; P1 security/session-state concern.
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — opened 2026-06-29: zombie process accumulation; P1 with `needs-maintainer-review`.
- [#115642](https://github.com/openclaw/openclaw/issues/115642) — opened 2026-07-29: P0 billing-cooldown recovery needs product decision.
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — opened 2026-08-05: Gateway event-loop blocking from synchronous persistence; P1, needs product decision.

These high-impact, long-lived items suggest maintainer bandwidth is stretched by post-release regressions, but they remain important signals for future architectural changes: durable session ownership, model fallback policy, and observable multi-agent execution.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent Open Source Ecosystem
**Digest window:** 2026-09-09 (24 hours) | **Prepared by:** Senior Analyst, AI Agent & Personal Assistant OSS Ecosystem

---

## 1. Ecosystem Overview

The open-source personal AI assistant landscape is deep into a post-growth hardening phase: the projects with the highest contributor velocity are spending more cycles on update safety, session persistence, and provider compatibility than on net-new features. A notable cluster — OpenClaw, IronClaw, QwenPaw, and ZeroClaw — shares naming and family-resemblance architecture (gateway-centric, multi-channel "Claw/Paw" agent cores), while Hermes Agent represents a research-lab-origin alternative stack with a strong desktop/TUI footprint. Across all five projects, the dominant trust boundary is no longer model intelligence but **reliability fundamentals**: silent message/session loss, false-failure update reporting, and multi-user/multi-agent state isolation. The busiest projects are converging on similar architectural answers — rehearsed updates, caller-attributed sessions, cache-aware context trimming, and profile-scoped tooling — which suggests the ecosystem is standardizing on operational maturity rather than differentiating on agent capability alone.

---

## 2. Activity Comparison

*Health score is an analyst composite of digest signals: responsiveness to bugs, closure velocity, presence of unresolved P0/P1s, and process strain. Scale: 5 = healthy & stable, 1 = distressed.*

| Project | Issues updated (open / closed) | PRs updated (open / merged-closed) | Release in window | Health (1–5) | Primary health signal |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (285 / 215) | 500 (229 / 271) | **v2026.9.3** — safer update rehearsal & recovery | **3.0** | Industrial throughput; 271 PRs closed in 24h, but long-lived P1 "silent loss" issues and open P0s (Windows de-DE upgrade, billing cooldown, systemd EACCES) keep trust debt high |
| **Hermes Agent** | 50 (49 / 1) | 50 (45 / 5) | None | **3.0** | Responsive pipeline — new bugs matched to fix PRs within 24h — but P1 Windows updater false-failure and desktop WS reconnect-loop issues have no visible fix PRs |
| **IronClaw** | 2 (2 / 0) | 11 (8 / 3) | None | **4.0** | Smallest project, cleanest loop: maintainer consistently pairs issues with fix PRs same-day; only drag is a 6-week-old security-relevant MCP issue (#6778) with fixes in flight |
| **QwenPaw** | 30 (15 / 15) | 45 (21 / 24) | **v2.2.1-beta.1** — model routing + chat streaming fix | **4.0** | Fastest feature-release cadence among non-OpenClaw peers; 24 merged/closed PRs in 24h; most reported regressions already have open follow-up PRs |
| **ZeroClaw** | 26 | 50 (47 / 3) | None | **2.5** | High-quality architecture work, but strained: 47 PRs open, several `risk:high` security PRs stalled on `needs-author-action`, and RFC vote snapshots invalidated by new revisions |

**Volume contrast worth noting:** OpenClaw alone touched 10× the issues and PRs of Hermes (the next-largest), and closed 271 PRs in one day — more than ZeroClaw's entire open-PR backlog. The ecosystem is a power-law distribution, with OpenClaw as the dominant reference project and a long tail of focused derivatives.

---

## 3. OpenClaw's Position

**Advantages vs. peers:**
- **Order-of-magnitude community scale.** 500 issues + 500 PRs touched daily, with 271 PRs merged/closed. Hot-topic issues draw 12–26 comments, implying a large, active user base actively exercising Windows, Telegram, iMessage, WebChat, and Codex surfaces.
- **Only project shipping update-rehearsal infrastructure.** v2026.9.3 rehearses core/plugin changes in isolated candidate state before activation, supports eligible migrations, and recovers abandoned update records without stopping healthy gateways. Peers are still fixing basic update verification (Hermes wrong-CWD false failures; QwenPaw silent llama.cpp rollback).
- **Fastest P0 response.** The Windows gateway P0 (#137813) was closed within the window; update-hardening PRs dominate the merge stream (e.g., restart for Git installs upgrading from 2026.9.1).
- **Broadest surface matrix.** No peer matches OpenClaw's channel span (Telegram, WebChat, iMessage, Codex app-server, multi-agent orchestration), making it the de facto reference for gateway architecture.

**Technical approach differences:** OpenClaw's architecture is Gateway-centric with distinct operational sub-systems — `doctor` maintenance, `--task-supervisor`, workspace sync, and an update system that treats migrations as first-class, recoverable state. Peers differ: Hermes uses multiplex profiles and a desktop fleet model; QwenPaw is Console-desktop-centric with pluggable memory backends; ZeroClaw is deliberately RFC-driven around runtime-owned sessions and sandboxing; IronClaw is a Rust single-crate hosted-MCP infrastructure play.

**Community size comparison:** OpenClaw's daily activity (500/500) is roughly equal to the *combined* activity of all four peers measured against their own digest counts — Hermes had 50/50, QwenPaw 30/45, ZeroClaw 26/50, IronClaw 2/11. Its open-issue count alone (285 open) exceeds IronClaw's total PR + issue traffic by ~20×.

**Net assessment:** OpenClaw is the ecosystem's center of gravity and reference implementation, but its scale is a double-edged sword: it carries the largest absolute backlog of open P0/P1 reliability items and the most severe user trust damage from update/migration failures. Its position is secure, but its next differentiator must be closing the "silent loss" class of issues (#44925, #139847, #141252) and restoring confidence in non-interactive migration paths.

---

## 4. Shared Technical Focus Areas

Requirements emerging independently across multiple projects (highest-signal first):

| Focus area | Projects | Specific needs / evidence |
|---|---|---|
| **No-silent-loss session/message semantics** | OpenClaw, QwenPaw, Hermes, ZeroClaw | Retry/notification guarantees for subagent results (OpenClaw #44925); persisted replies missing from subsequent model context (QwenPaw #7579); failed turns vanishing on session switch (ZeroClaw #9333); session_key→session_id recovery at shutdown flush (Hermes PR #106112) |
| **Update & migration trust** | OpenClaw, Hermes, QwenPaw | Rehearsed/atomic candidate updates (OpenClaw v2026.9.3); updater verification resolving correct CWD to stop false FAILED reports (Hermes #105145, #106097); honest "fetch failed" receipts instead of success banners (Hermes #106026); prevention of silent runtime rollback of manually upgraded llama.cpp (QwenPaw #7633) |
| **Provider adapter resilience** | All five | Model fallback on primary timeout (OpenClaw #141869); malformed tool-call JSON not tied to tool/file (OpenClaw #135111); local Ollama "no API key" regressions (Hermes #106010); Mistral streaming breaking on new padding field (Hermes #106006); Gemini rejecting model-turn-ending requests (QwenPaw #7625); async tools + reasoning-state parity with OpenAI Responses (ZeroClaw #10704–#10708) |
| **Multi-agent / multi-principal isolation** | IronClaw, Hermes, OpenClaw, ZeroClaw | Cross-user tool-catalog contamination on hosted MCP servers with per-caller attribution fix (IronClaw #6778, PR #8090, SEP-414 #8084); MCP toolsets not profile-scoped under multiplex (Hermes #106005); multi-agent orchestration instability incl. config overwrites and detached child work (OpenClaw #43367); runtime-owned session ownership RFC (ZeroClaw #9487, Rev 5) |
| **Context & cost economics** | ZeroClaw, IronClaw, QwenPaw, OpenClaw | History trimming defeats prompt caching and re-trims every few turns (ZeroClaw #10674); cache writes not billed at Anthropic's premium rate (ZeroClaw #10716); per-conversation cost attribution broken by daemon-lifetime session UUID (ZeroClaw #10700); PDF pointer mode to avoid ~25k-token/turn inline cost (IronClaw #8082); context-compaction must consider full provider request with active-turn overflow handling (QwenPaw #7628) |
| **Windows desktop / client robustness** | Hermes, QwenPaw, OpenClaw | False-failure update verification and WS reconnect loops (Hermes #105145, #94769); event-loop freezes and console stdin inheritance hangs (QwenPaw #7363, #7554); Windows gateway never starting after update (OpenClaw #137813, closed) |
| **Skills/plugin trust & lifecycle** | Hermes, QwenPaw, OpenClaw, IronClaw | Stale skills index with 180-comment thread (Hermes #66616); plugin marketplace update UX + batch updates (QwenPaw PR #7605); owner-signed responsibility gates for memory/actions/skills (OpenClaw #96675); CLI cannot see runtime-installed skills, misdirecting debugging (IronClaw #8086) |
| **Sandboxing & security policy** | ZeroClaw, OpenClaw | Granular filesystem sandbox policy with drift between app-layer path admission and OS backends (ZeroClaw #6996); three stalled `risk:high` security PRs needing author action (ZeroClaw #9977, #10241, #10337); official plugin rejection by key-store trust checks (OpenClaw #138342) |

---

## 5. Differentiation Analysis

| Project | Primary identity | Target user | Architecture / approach | Defining focus |
|---|---|---|---|---|
| **OpenClaw** | General-purpose reference assistant (community/core) | Self-hosters and power users running many channels; the "default" agent gateway | Gateway + task-supervisor + doctor + workspace sync; update rehearsal in isolated candidate state | Breadth of surfaces and update-safety engineering; de facto reference for gateway architecture |
| **Hermes Agent** | Research-lab-origin assistant (Nous Research) | Desktop/TUI-first individual operators; multi-profile "fleet" managers | Desktop app + gateway; multiplex profiles via `GATEWAY_MULTIPLEX_PROFILES`; cron jobs in Python (`cron/jobs.py`); Windows PowerShell updater scripts | Profile/session isolation, cron & automation workflows (Kanban, email, Discord voice), desktop UX |
| **IronClaw** | Infra/extension platform (Near AI) | Hosted-MCP operators and multi-tenant deployments needing caller attribution | Rust single-crate packaged extensions; hosted-MCP catalog discovery; SEP-414 attribution | Multi-tenant MCP correctness — per-caller catalogs, extension packaging, provider bundling |
| **QwenPaw** | Console-first assistant in the AgentScope ecosystem | Desktop mainstream users, especially Chinese-speaking; local-model (llama.cpp) community | Electron-style Console desktop app + CLI; plugin marketplace; pluggable memory backends (ReMe, OpenViking, ADBPG/PowerContext); OpenAI-compatible-first providers (incl. Zhipu GLM) | Localization (zh/en), plugin/marketplace UX, memory-backend ecosystem, local runtime management |
| **ZeroClaw** | Standards/architecture-driven agent core | Developers and security-conscious operators; ACP/Codex and OpenAI Responses power users | RFC-driven design process; runtime-owned sessions, unified attachments, granular sandbox policy, WASM plugin runtime; zerocode/TUI client; OpenAI Responses/Astra native adapter | Correct-by-construction state ownership, cost/prompt-cache precision, sandbox enforcement |

**Key architectural differentiators in one line:** OpenClaw scales breadth via surface count; Hermes scales multi-profile isolation via desktop fleet primitives; QwenPaw differentiates via ecosystem lock-in (marketplace, memory backends, China-friendly infra); ZeroClaw differentiates via design rigor and policy controls; IronClaw competes purely on multi-tenant hosted-MCP correctness.

---

## 6. Community Momentum & Maturity

**Tier 1 — Industrial scale, stabilizing under load:** **OpenClaw.** Its cadence (271 PRs closed/24h, new point release in window) matches a mature project at company scale. The risk is not momentum but backlog depth: 285 open issues and 229 open PRs mean even responsive triage leaves long-lived P1s (multi-agent instability, silent subagent loss) open for 6 months with `needs-product-decision` labels.

**Tier 2 — Rapid iteration, feature-forward:** **QwenPaw** and **Hermes Agent.** QwenPaw is the most feature-velocity project per unit of scale: beta releases, 24 merged PRs/day, and a plugin/memory ecosystem expanding faster than its stabilization (llama.cpp rollback, heartbeat feedback loops). Hermes is highly responsive on paper — most new P2s have matching fix PRs — but its Windows updater and desktop session P1s sit without visible fixes, and it produced no release in the window, indicating a stabilization gap concentrated in desktop/updater code.

**Tier 3 — Architecture phase with process strain:** **ZeroClaw.** High-caliber RFC work (runtime-owned sessions, sandbox policy, WASM runtime) and strong bug-close discipline (3 issues closed within 24h of filing) are offset by a decision-queue bottleneck: 47 open PRs, several `do-not-merge`/stalled security PRs, and meta-RFCs to simplify RFC voting and PR-review evidence. The process itself is scaling poorly relative to contributor velocity.

**Tier 4 — Focused niche, healthy:** **IronClaw.** Smallest footprint but the most consistent issue→PR pairing, with the two oldest PRs cleared (superseded) in the window. Its sole long-standing issue (#6778) has an active per-caller fix under review — a sign of deliberate, bounded scope rather than stagnation.

**Maturity ranking by "bug-to-fix loop" quality:** IronClaw ≈ QwenPaw > OpenClaw ≈ Hermes > ZeroClaw. **Maturity ranking by architectural investment:** ZeroClaw > OpenClaw > IronClaw > QwenPaw > Hermes. The most mature overall remains OpenClaw, but it is also the project where user trust is hardest to regain.

---

## 7. Trend Signals

*Value for AI agent developers — what the community is telling us to build:*

1. **Durable execution is the new differentiator.** The most damaging bug class across four of five projects is **silent loss**: subagent results vanish with no retry/notification (OpenClaw #44925), replies persist but disappear from model context (QwenPaw #7579), failed turns vanish on session switch (ZeroClaw #9333). Implication: agent frameworks need outbox/queue semantics, idempotent message persistence, and explicit "failed — will not retry" surfaces, not best-effort in-memory delivery.

2. **Update paths are a trust boundary, not a build detail.** Every significant project had a release-train defect this window: false-failure verification (Hermes), silent rollback of user-managed runtimes (QwenPaw), stuck update state (OpenClaw). OpenClaw's rehearsal-in-isolated-state model is the emerging best practice; expect peers to copy it. Developers should treat "update" as a user-facing state machine with rollback, migration checks, and honest exit codes.

3. **Context/cost economics are a product feature.** Tool-heavy sessions breaking prompt caching (ZeroClaw), ~25k-token PDFs re-costing every turn (IronClaw), and cache-write pricing errors (ZeroClaw) show that token spend is now as visible to users as correctness. Build cache-aware trimmers with hysteresis, pointer/file-reference modes instead of inline blobs, and per-conversation cost ledgers from day one.

4. **Multi-agent = multi-principal security, not just concurrency.** Cross-user tool-catalog contamination on shared MCP servers (IronClaw #6778), non-profile-scoped MCP toolsets (Hermes #106005), config overwrites in multi-agent orchestration (OpenClaw #43367), and heartbeat feedback loops (QwenPaw #7589) all point to the same gap: **session, catalog, and tool ownership must be attributed per caller/principal**. Standards like SEP-414 caller attribution are early signals of where the ecosystem is heading.

5. **Provider compatibility is a moving target, and local models are first-class.** New model features (reasoning effort, steering, opaque reasoning state, async tools, new streaming fields) break generic chat-completions adapters; Ollama/vLLM/Mistral/llama.cpp regressions appear whenever clients are refactored. Expect cost of maintaining provider adapters to exceed core agent logic within a year unless conformance-test suites and fallback shims become standard project components.

6. **Desktop/Windows UX is the weakest surface across the ecosystem.** False update failures, event-loop freezes, stdin-inheritance hangs, invisible sidebars, and WS reconnect loops cluster on Windows/desktop builds — even at projects with otherwise strong engineering. For agent developers targeting end users, desktop reliability is currently the highest-ROI surface for differentiation.

7. **Governance features are emerging from users, not vendors.** Demand for owner-signed responsibility gates (OpenClaw #96675), granular sandbox policy (ZeroClaw #6996), plugin key-store trust (OpenClaw #138342), and official China mirror/update channels (Hermes #96858) shows power users want *control and provenance* over agent memory, actions, and distribution — a roadmap signal that privacy/security-by-default is becoming a purchase criterion.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-09

## 1. Today's Overview

Hermes Agent had a very active 24-hour maintenance cycle: 50 issues were updated (49 open/active, 1 closed) and 50 PRs were updated (45 open, 5 merged/closed). No new release or release candidate was published in this window. The issue stream was dominated by desktop/Windows updater verification bugs, profile-scoped session/UI problems, gateway message-delivery edge cases, and provider compatibility regressions. Several new P2/P3 bug reports from 2026-09-08 already have matching open fix PRs, indicating a responsive review pipeline. The volume of activity is high, but the number of open follow-up bugs around Windows updates and desktop session state suggests those areas remain the top stability risks.

## 2. Releases

No new releases were published in this digest window. No changelog, migration, or breaking-change notes are available for 2026-09-09.

## 3. Project Progress

- 5 PRs were reported as merged/closed during the period, though the top-comment PR sample does not expose their individual details.
- The only closed issue visible in the sample is [Desktop Bot Mode tracking issue #94726](https://github.com/NousResearch/hermes-agent/issues/94726), which was closed after maintainer revalidation narrowed the accepted scope to four Bot Mode improvements.
- Active PR work advancing fixes and features includes:
  - [PR #106106 — fix(cron): re-derive repeat defaults when schedule type changes](https://github.com/NousResearch/hermes-agent/pull/106106), addressing issue [#106096](https://github.com/NousResearch/hermes-agent/issues/106096).
  - [PR #106111 — CI public-surface step timeout bound](https://github.com/NousResearch/hermes-agent/pull/106111), fixing blocking Windows-footguns CI timeout risk ([#106103](https://github.com/NousResearch/hermes-agent/issues/106103)).
  - [PR #106018 — route local Ollama/vLLM provider aliases through auxiliary custom branch](https://github.com/NousResearch/hermes-agent/pull/106018), fixing empty-key local Ollama failures ([#106010](https://github.com/NousResearch/hermes-agent/issues/106010)).
  - [PR #106029 — keep active gateway default profile reachable in desktop fleet dropdown](https://github.com/NousResearch/hermes-agent/pull/106029), fixing [#106017](https://github.com/NousResearch/hermes-agent/issues/106017).
  - [PR #106107 — reroute warn-class gateway status to home channel in group chats](https://github.com/NousResearch/hermes-agent/pull/106107).
  - [PR #106112 — resolve flush session_key to session_id at shutdown-flush recovery](https://github.com/NousResearch/hermes-agent/pull/106112).
  - [PR #106110 — bound redirect/rebuilt restart refunds in agent retry handling](https://github.com/NousResearch/hermes-agent/pull/106110).
  - [PR #105681 — expose execution-scoped original-message context to native plugins](https://github.com/NousResearch/hermes-agent/pull/105681).

## 4. Community Hot Topics

- [Issue #66616 — Skills index is stale or degraded](https://github.com/NousResearch/hermes-agent/issues/66616)  
  **180 comments** — The highest-traffic issue. An automated freshness probe reports the Skills Hub index is 29.8h old against a 26h limit. The long comment thread suggests this stale-index problem has been recurring and is a major source of community frustration with skills discoverability/docs.

- [Issue #88584 — Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584)  
  **78 comments** — Scheduled Nous-to-Enterkey merge conflicts in `cron/jobs.py` continue to block automated integration work. The long-lived nature indicates an underlying cron/workflow maintainability problem rather than a one-off merge conflict.

- [Issue #105145 — Windows desktop-driven `hermes update` reports FAILED after successful update](https://github.com/NousResearch/hermes-agent/issues/105145)  
  **13 comments, P1** — Active Windows users are seeing post-update verification resolve the wrong working directory, producing exit code 8 despite a successful update. This is a high-trust-impact updater bug. A duplicate was filed as [#106097](https://github.com/NousResearch/hermes-agent/issues/106097).

- [Issue #26277 — Email session isolation by normalized subject](https://github.com/NousResearch/hermes-agent/issues/26277)  
  **11 comments, 2 👍** — Users want opt-in email gateway behavior that isolates sessions by normalized subject instead of by sender. This feature has been open since May and is a good candidate for future gateway/session work.

## 5. Bugs & Stability

Ranked by priority and attention:

- **P1 — Windows updater verification uses wrong working directory after successful update**  
  [Issue #105145](https://github.com/NousResearch/hermes-agent/issues/105145), duplicate [#106097](https://github.com/NousResearch/hermes-agent/issues/106097). `scripts/desktop-update/windows.ps1` runs verification with `cwd=$HERMES_HOME` rather than the install root, so every desktop-driven update incorrectly reports FAILED. No direct fix PR appears in the top sample; related constrained-network fallback work is in [PR #106036](https://github.com/NousResearch/hermes-agent/pull/106036).

- **P1 — Desktop UI flicker / WebSocket reconnect loop**  
  [Issue #94769](https://github.com/NousResearch/hermes-agent/issues/94769). Multi-profile desktop setups experience WS reconnect every 2–5 seconds, worse during agent turns. Still open with no visible fix PR.

- **P2 — Updater prints success banner after HTTP 429 fetch failure**  
  [Issue #106026](https://github.com/NousResearch/hermes-agent/issues/106026). The updater reports “update complete” even when the fetch step was blocked; users request an honest “code unchanged (fetch failed)” receipt.

- **P2 — Desktop Sessions sidebar near-zero width while marked visible**  
  [Issue #106009](https://github.com/NousResearch/hermes-agent/issues/106009). Navigation breaks because `focus_pane` reports success without restoring the sidebar.

- **P2 — Quick-command skill alias prints “Loading skill” then never runs**  
  [Issue #106063](https://github.com/NousResearch/hermes-agent/issues/106063). Desktop/TUI worker drops skill-targeted aliases, while the same alias works on Telegram.

- **P2 — WhatsApp quote parser drops ephemeral-message quoted text**  
  [Issue #106066](https://github.com/NousResearch/hermes-agent/issues/106066). `quotedText` is empty when the quoted message is wrapped in `ephemeralMessage`.

- **P2 — Desktop sidebar says “No sessions yet” despite matching sessions in `state.db`**  
  [Issue #106003](https://github.com/NousResearch/hermes-agent/issues/106003). New sessions persist but are never listed for the project.

- **P2 — Multiplex profiles: MCP connections and toolsets are not profile-scoped**  
  [Issue #106005](https://github.com/NousResearch/hermes-agent/issues/106005). Under `GATEWAY_MULTIPLEX_PROFILES=true`, only the first profile receives tools for shared MCP server names.

- **P2 — Discord voice inactivity timer never re-arms**  
  [Issue #105974](https://github.com/NousResearch/hermes-agent/issues/105974). Active two-way voice calls are dropped after the initial timeout because user voice input does not reset the timer.

- **P2 — Mistral custom-provider streaming breaks on new `p` padding field**  
  [Issue #106006](https://github.com/NousResearch/hermes-agent/issues/106006). Causes `'list' object has no attribute 'strip'` and false network-error retry loops.

- **P2 — Auxiliary local Ollama provider raises “no API key was found”**  
  [Issue #106010](https://github.com/NousResearch/hermes-agent/issues/106010). Regression from the auxiliary-client refactor; `provider: custom` still works. Fix PR: [PR #106018](https://github.com/NousResearch/hermes-agent/pull/106018).

- **P2 — Cron one-shot → recurring schedule update fires once and completes**  
  [Issue #106096](https://github.com/NousResearch/hermes-agent/issues/106096). `update_job` keeps `repeat.times=1`. Fix PR: [PR #106106](https://github.com/NousResearch/hermes-agent/pull/106106).

- **P2 — CI advisory public-surface check can time out blocking Windows-footguns job**  
  [Issue #106103](https://github.com/NousResearch/hermes-agent/issues/106103). Fix PR: [PR #106111](https://github.com/NousResearch/hermes-agent/pull/106111).

- **Older P2/P3 stability debts still open**  
  MCP HTTP transport cleanup `RuntimeError` ([#31987](https://github.com/NousResearch/hermes-agent/issues/31987)), Ollama reasoning models returning empty content ([#46131](https://github.com/NousResearch/hermes-agent/issues/46131)), Hermes Link missing web-originated sync ([#45709](https://github.com/NousResearch/hermes-agent/issues/45709)), and Kanban respawn guard blocking legitimate rework ([#62418](https://github.com/NousResearch/hermes-agent/issues/62418)).

## 6. Feature Requests & Roadmap Signals

- **Email session isolation by normalized subject**  
  [Issue #26277](https://github.com/NousResearch/hermes-agent/issues/26277) continues to be the most-upvoted feature request in the sample (2 👍, 11 comments). It fits naturally with the project’s session-state sweeper focus and could ship as an opt-in gateway mode.

- **Switch working directory during an active session**  
  [Issue #50195](https://github.com/NousResearch/hermes-agent/issues/50195) remains open with community support (1 👍). Likely requires coordinated CLI/TUI/Desktop session-state changes.

- **Official China mirror / update channel**  
  [Issue #96858](https://github.com/NousResearch/hermes-agent/issues/96858) is a detailed Chinese-language request arguing that official mirrors would benefit both mainland users and project reach. Useful roadmap signal for install/update infrastructure.

- **Full-backup reliability consolidation and auditable dry-run coverage**  
  [Issue #105868](https://github.com/NousResearch/hermes-agent/issues/105868) tracks verification gaps where an archive can be readable but incomplete and still return exit 0.

- **Feature-forward open PRs**  
  [PR #105681](https://github.com/NousResearch/hermes-agent/pull/105681) adds execution-scoped original-message context for native plugins; [PR #102022](https://github.com/NousResearch/hermes-agent/pull/102022) adds opt-in required-author enforcement for locally created skills; [PR #106083](https://github.com/NousResearch/hermes-agent/pull/106083) adds Beeper quote-reply and emoji-reaction support for Matrix.

Likely near-term changes: cron schedule-kind handling ([#106106](https://github.com/NousResearch/hermes-agent/pull/106106)), auxiliary local-provider compatibility ([#106018](https://github.com/NousResearch/hermes-agent/pull/106018)), and desktop profile-dropdown restoration ([#106029](https://github.com/NousResearch/hermes-agent/pull/106029)) are small enough to appear in the next patch/minor release.

## 7. User Feedback Summary

- **Windows update trust is being eroded by false failure reporting.** Users report that updater verification runs from the wrong CWD, so successful installs are displayed as hard failures ([#105145](https://github.com/NousResearch/hermes-agent/issues/105145), [#106097](https://github.com/NousResearch/hermes-agent/issues/106097)). Conversely, HTTP 429 fetch failures still print a full success banner ([#106026](https://github.com/NousResearch/hermes-agent/issues/106026)).

- **Desktop/session UX is a recurring pain point.** Users report invisible sessions sidebars ([#106009](https://github.com/NousResearch/hermes-agent/issues/106009)), missing sessions in project views ([#106003](https://github.com/NousResearch/hermes-agent/issues/106003)), unreachable profiles in fleet mode ([#106017](https://github.com/NousResearch/hermes-agent/issues/106017)), and unbound sessions when using `--in DIR` plus `--continue --create-if-missing` ([#106016](https://github.com/NousResearch/hermes-agent/issues/106016)).

- **Power users are pushing for correct profile/workspace isolation.** Multi-profile setups expect MCP tools, terminal CWD/AGENTS.md injection, and session state to be scoped to the active profile. Current regressions violate that expectation ([#106005](https://github.com/NousResearch/hermes-agent/issues/106005), [#106012](https://github.com/NousResearch/hermes-agent/issues/106012), [#94769](https://github.com/NousResearch/hermes-agent/issues/94769)).

- **Local/model-provider users are sensitive to refactor regressions.** Empty responses or “no API key” errors from Ollama and Mistral custom setups are reported as “worked before” breakages ([#46131](https://github.com/NousResearch/hermes-agent/issues/46131), [#106010](https://github.com/NousResearch/hermes-agent/issues/106010), [#106006](https://github.com/NousResearch/hermes-agent/issues/106006)).

- **International community is active.** A Chinese user request for official mirror channels ([#96858](https://github.com/NousResearch/hermes-agent/issues/96858)) and multiple Indonesian documentation PRs ([#92192](https://github.com/NousResearch/hermes-agent/pull/92192), [#93632](https://github.com/NousResearch/hermes-agent/pull/93632)) show growing non-English user and contributor engagement.

## 8. Backlog Watch

- [Issue #66616 — Skills index is stale or degraded](https://github.com/NousResearch/hermes-agent/issues/66616)  
  Open since July 18, 180 comments, automated sweeper `degraded` status. This is the single most active unresolved issue and needs maintainer diagnosis of why index freshness keeps failing.

- [Issue #88584 — Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584)  
  Open since August 17, 78 comments. Cron job conflicts are blocking an entire automated integration path; likely needs a maintainer decision on merge strategy or workflow ownership.

- [Issue #26277 — Email session isolation by normalized subject](https://github.com/NousResearch/hermes-agent/issues/26277)  
  Open since May 15 with community support but no visible maintainer direction or milestone.

- [Issue #31987 — MCP HTTP transport cleanup RuntimeError](https://github.com/NousResearch/hermes-agent/issues/31987)  
  Open since May 25. Causes reconnect failure loops for StreamableHTTP MCP servers; relevant to the active MCP/OAuth security work in [PR #95756](https://github.com/NousResearch/hermes-agent/pull/95756).

- [Issue #45709 — Hermes Link fails to sync web-originated messages](https://github.com/NousResearch/hermes-agent/issues/45709)  
  Open since June 13 with no visible fix; important for cross-surface conversation continuity.

- [Issue #62418 — Kanban dispatcher respawn guard blocks legitimate rework](https://github.com/NousResearch/hermes-agent/issues/62418)  
  Open since July 11, 1 👍 + 3 comments. No bypass exists short of manual claim+spawn, making this a workflow-automation dead-end for agent operators.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-09

## 1. Today's Overview
High-activity day: 11 PRs were touched in the last 24 hours (8 open, 3 closed/merged) and 2 issues were updated, both still open. Development is concentrated on hosted-MCP multi-tenant correctness — catalog isolation (#8090, #8083), SEP-414 caller attribution (#8084), and provider bundling (#8089) — plus agent-loop ergonomics around context budgets and configuration. Notably, two long-running July PRs (#6760, #6759) were closed, signaling that older work is being superseded by cleaner reimplementations rather than abandoned. No new releases were published. Project health looks solid: the same maintainer is consistently pairing issue reports with fix PRs, though one security-relevant MCP issue (#6778) remains unresolved after six weeks.

## 2. Releases
None in this period.

## 3. Project Progress
Three PRs closed/merged (all by kirikov):

- **[#8083 — fix(extensions): merge discovered hosted-MCP catalogs instead of replacing them](https://github.com/nearai/ironclaw/pull/8083)** — Addresses issue #6778 where, on a hosted-MCP server with user-dependent tool lists, the last discovery deleted previous users' tools. The merge approach was closed in favor of the more complete per-caller fix in #8090.
- **[#6760 — feat(extensions): bundle the agent-market marketplace extension](https://github.com/nearai/ironclaw/pull/6760)** — Closed as "superseded in shape, not in intent"; bundled extensions moved to a single-crate structure. Its intent is carried forward by #8089.
- **[#6759 — feat(mcp): SEP-414 `_meta` attribution on outbound hosted-MCP tools/list + tools/call](https://github.com/nearai/ironclaw/pull/6759)** — Closed as needing a rebase; superseded by the newer #8084.

Net progress: MCP multi-tenant isolation and attribution are actively iterating, with the older approaches folded into stronger open follow-ups.

## 4. Community Hot Topics
The only item with comments (2) is:

- **[Issue #6778 — Hosted-MCP: discovered tool catalogs are published per extension id, not per installation — cross-user metadata exposure on multi-principal servers](https://github.com/nearai/ironclaw/issues/6778)** (open since 2026-07-28)

Underlying need: hosted-MCP activation runs `tools/list` discovery under the *activating user's* credential, then publishes the result into a shared registry slot keyed by extension id alone. On multi-principal servers, each discovery overwrites the previous user's tool surface, causing both functional breakage and potential cross-user metadata exposure. The issue has generated two fix attempts (#8083 closed, #8090 open), making it the clear focal point of current development.

## 5. Bugs & Stability
Ranked by severity:

1. **Cross-user tool catalog contamination / metadata exposure (#6778)** — High. Multi-tenant hosted-MCP servers overwrite each other's tool catalogs because discovery results are keyed per extension, not per installation/user. Fix PR **[#8090](https://github.com/nearai/ironclaw/pull/8090)** (key per caller) is open; intermediate fix #8083 was closed.
2. **Operator-installed extension packages can be built but not used (#8085)** — Medium. `from_host_bundled_manifest_with_inline_dynamic_schemas` and `validate_consistency` disagree on which manifest sources may carry inline dynamic descriptor schemas, so operator-installed packages fail at use time. Fix PR [#8085](https://github.com/nearai/ironclaw/pull/8085) is open.
3. **`ironclaw skills list` cannot see runtime-written skills (#8086)** — Medium/Low. Skills installed by agents, or owned by users the CLI wasn't configured for, are invisible to the CLI, actively misdirecting debugging. No fix PR yet.
4. **Set-but-empty env var silently selects default (#8088)** — Low/Medium. `env_or_override` treats `FOO=` the same as an absent `FOO`, so an operator typo on a deployment-critical variable (e.g., endpoint override) fails quietly. Fix PR [#8088](https://github.com/nearai/ironclaw/pull/8088) is open.

## 6. Feature Requests & Roadmap Signals
Notable feature PRs currently open:

- **[#8084 — Opt-in SEP-414 caller attribution on outbound hosted-MCP calls](https://github.com/nearai/ironclaw/pull/8084)** — Lets hosted MCP providers distinguish conversations and retries (currently one bearer token per user). Direct continuation of #6759; likely to land soon.
- **[#8089 — Bundle the agent-market hosted-MCP provider package](https://github.com/nearai/ironclaw/pull/8089)** — First-party provider package with static tool declarations as a pre-discovery fallback; revives the intent of #6760.
- **[#8087 — Make the prompt-context limit an override instead of a constant](https://github.com/nearai/ironclaw/pull/8087)** — The hardcoded 128k `DEFAULT_CONTEXT_LIMIT_TOKENS` forces deployments with larger-context models to patch source.
- **[#8082 — Opt-in pointer mode for document text in model context](https://github.com/nearai/ironclaw/pull/8082)** — Addresses documents being inlined at ~25k tokens per PDF and re-costing every turn; pointer mode would reference instead of inline.
- **[#8072 — Telegram Bot API command menu registration at activation](https://github.com/nearai/ironclaw/pull/8072)** — Registers `/model`, `/status`, `/new`, `/stop`, `/interrupt` via `setMyCommands`; awaiting maintainer review since 2026-09-04.

Prediction for next version: the per-caller MCP catalog fix (#8090) and SEP-414 attribution (#8084) are the most mature and directly close the project's longest-open issue; context-budget features (#8082, #8087) address recurring user cost complaints and may follow in the same or next cycle.

## 7. User Feedback Summary
Real pain points expressed across issues and PRs:

- **Multi-tenant MCP isolation is broken in practice** — users silently overwrite each other's tools on shared hosted-MCP servers, and the registry structure risks cross-user metadata exposure (#6778). The clearest and most urgent complaint.
- **Skill debuggability is confusing** — the CLI shows an empty list for skills the runtime actually installed, sending users down the wrong debugging path (#8086).
- **Context budget is consumed silently** — attaching 2–3 PDFs (~25k tokens each) exhausts the model budget before any work happens, and the cost repeats every turn (#8082).
- **Configuration inflexibility and footguns** — hardcoded 128k context limits require source forks (#8087), and empty-string env vars silently fall back to defaults (#8088).
- **Extension packaging inconsistency** — operator-installed packages build but can't be used, undermining the operator workflow (#8085).

Satisfaction signals are mixed: maintainer responsiveness is strong (fix PRs appear within the same day for new issues), but the recurring MCP multi-tenant and context-economics friction suggests those areas need deeper architectural attention.

## 8. Backlog Watch
- **[Issue #6778 — Hosted-MCP per-extension catalog keying](https://github.com/nearai/ironclaw/issues/6778)** — Open since 2026-07-28; the longest-standing open issue. Two fix attempts exist; per-caller fix #8090 needs to land and be verified.
- **[Issue #8086 — `ironclaw skills list` visibility gap](https://github.com/nearai/ironclaw/issues/8086)** — New (2026-09-08), no comments, no assignee, no fix PR yet; needs maintainer triage.
- **[PR #8072 — Telegram Bot API command menu](https://github.com/nearai/ironclaw/pull/8072)** — Open since 2026-09-04 with no maintainer comments; awaiting first review.

Backlog is otherwise healthy: the two other July-era items (#6760, #6759) were just closed, showing maintainers are actively sweeping older work.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-09

## 1. Today's Overview
QwenPaw is in a highly active maintenance and feature-development cycle. In the last 24 hours, 30 issues were updated (15 open/active, 15 closed) and 45 PRs were touched (21 open, 24 merged/closed), indicating sustained contributor momentum. A new beta, **v2.2.1-beta.1**, was released, adding agent-model routing settings and a chat streaming fix. The project continues to show strong community engagement, especially around Windows console behavior, tool-result payload handling, MCP protocol compatibility, and chat queue reliability. Several reported regressions from v2.2.0 are already being addressed by open follow-up PRs.

---

## 2. Releases

### v2.2.1-beta.1
Source: [QwenPaw v2.2.1-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.1)

Included changes:
- **feat: add agent model routing settings** by @zhaozhuang521 — [PR #7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)
- **docs: update website for v2.2.0** by @cuiyuebing — [PR #7517](https://github.com/agentscope-ai/QwenPaw/pull/7517)
- **fix(chat): sync resolved sessions during streaming** by @zhaozh…

No breaking changes or migration notes were included in the release description. This is a beta release, so users should expect iterative stabilization.

---

## 3. Project Progress

Merged/closed PRs in the last 24h include several targeted fixes and UI/UX improvements:

- **Hub CLI auth fix** — [`qwenpaw agents list` now authenticates inside Hub local sandboxes](https://github.com/agentscope-ai/QwenPaw/pull/7631).
- **MCP legacy fallback fix** — [Legacy handshake now arbitrates 401 discovery probes](https://github.com/agentscope-ai/QwenPaw/pull/7627), addressing the misreported “requires OAuth” issue.
- **Console chat queue enforcement** — [Chat submissions can no longer bypass the running-task queue](https://github.com/agentscope-ai/QwenPaw/pull/7610), fixing the 409-error workflow reported by users.
- **PDF block handling for text-only models** — [PR #7621](https://github.com/agentscope-ai/QwenPaw/pull/7621) was closed; a stronger follow-up, [PR #7636](https://github.com/agentscope-ai/QwenPaw/pull/7636), strips PDF blocks for all OpenAI-compatible chat-completions requests.
- **Windows shell stdin fix** — [Child processes no longer inherit console stdin](https://github.com/agentscope-ai/QwenPaw/pull/7598), fixing hangs caused by commands reading from stdin.
- **Console sidebar redesign** — [Redesigned sidebar and settings experience](https://github.com/agentscope-ai/QwenPaw/pull/7502) merged into the Console.
- **Plugin manager improvements** — [PR #7605](https://github.com/agentscope-ai/QwenPaw/pull/7605) closed; it preserves marketplace context, detects available updates, and adds one-click/batch update support.
- **Agent Kanban localization** — [Chinese and English localization added](https://github.com/agentscope-ai/QwenPaw/pull/7482).

Other notable work in flight:
- **QwenPaw-Data app 0.3.0 integration** — [PR #7637](https://github.com/agentscope-ai/QwenPaw/pull/7637) integrates QwenPaw-Data as an analysis engine and embeds the reviewed QPD Data Console.
- **Requesty provider** — [PR #7638](https://github.com/agentscope-ai/QwenPaw/pull/7638) adds Requesty as an OpenAI-compatible provider.
- **Per-session model overrides** — [PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) remains under review.
- **OpenViking long-term memory backend** — [PR #7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) is under review.
- **Scroll history integrity optimization** — [PR #7639](https://github.com/agentscope-ai/QwenPaw/pull/7639) avoids repeated `PRAGMA quick_check` scans.

---

## 4. Community Hot Topics

The busiest issues reveal a mix of platform-level bugs and UX concerns:

- **[Issue #7579 — Model replies unexpectedly lost from context](https://github.com/agentscope-ai/QwenPaw/issues/7579)** — 8 comments. Persistent reply disappears on later requests; model “cannot see its own just-spoken message,” resulting in empty responses. High trust/impact concern for memory consistency.
- **[Issue #7597 — Tool-returned image/PDF binary sent as bare base64](https://github.com/agentscope-ai/QwenPaw/issues/7597)** — 6 comments. Triggers `400 "file must have a file_id or file_data"`; closed, but conceptually ties into the open PDF-block handling work.
- **[Issue #7559 — Sending message during task execution triggers 409](https://github.com/agentscope-ai/QwenPaw/issues/7559)** — 5 comments. Closed after queue routing behavior was restored via [PR #7610](https://github.com/agentscope-ai/QwenPaw/pull/7610).
- **[Issue #7363 — Synchronous calls freeze event loop and timeout never fires](https://github.com/agentscope-ai/QwenPaw/issues/7363)** — 5 comments. Windows Desktop becomes unresponsive for ~2 minutes during startup and when sending messages.
- **[Issue #7469 — ReMe background embedding/indexing job fails](https://github.com/agentscope-ai/QwenPaw/issues/7469)** — 5 comments. Closed; OpenAI-compatible embedding backend failure silently disabled new memories.
- **[Issue #7589 — Heartbeat cron session feedback loop](https://github.com/agentscope-ai/QwenPaw/issues/7589)** — 4 comments. Duplicate message pile-up caused agent to become unresponsive for ~2 hours; flagged as high severity.
- **[Issue #7620 — MCP streamable-http 401 masks legacy fallback](https://github.com/agentscope-ai/QwenPaw/issues/7620)** — 3 comments. Closed via [PR #7627](https://github.com/agentscope-ai/QwenPaw/pull/7627).

Most-liked discussion: **[Issue #7615 — Where to ask about third-party plugins/skills/deployment](https://github.com/agentscope-ai/QwenPaw/issues/7615)** — 3 👍, signaling community desire for clearer support channels around the Plugin/Skill Marketplace.

---

## 5. Bugs & Stability

The following issues were active/closed in the last 24h, ranked by severity:

| Severity | Issue | Description | Status / Fix |
|---|---|---|---|
| **High** | [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) | llama.cpp version-format parser fails on new 5-digit build numbers; `has_update` misreports an update and **silently rolls back the user's manually upgraded runtime** to an older snapshot. | Open |
| **High** | [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) | Heartbeat cron session feedback loop creates duplicate-message pile-up; agent became unresponsive for ~2 hours. | Open |
| **High** | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) | Assistant reply persisted but missing from subsequent requests; model sees empty context and returns empty responses. | Open |
| **High** | [#7625](https://github.com/agentscope-ai/QwenPaw/issues/7625) | Gemini returns `400 "Requests ending with a model turn are not supported"` after background/offloaded tool completion. | Open |
| **Medium** | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | Synchronous call blocks Windows Desktop event loop; timeout never fires, causing 118–135s freezes. | Open |
| **Medium** | [#7607](https://github.com/agentscope-ai/QwenPaw/issues/7607) | Cursor ACP Runner extension-method handling violates JSON-RPC protocol, causing `WritableIterable is closed` stream crash. | Open |
| **Medium** | [#7619](https://github.com/agentscope-ai/QwenPaw/issues/7619) | On Windows 11, v2.2.0 + qwen-35B-A3B-FP8 conversation ends unexpectedly. | Open |
| **Medium** | [#7634](https://github.com/agentscope-ai/QwenPaw/issues/7634) | ClawHub skill installation fails when multiple skills share the same name. | Open |
| **Medium** | [#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622) | Dialogs in background pages become transparent; modal backdrop not rendered in v2.2.0. | Open |
| **Medium** | [#7630](https://github.com/agentscope-ai/QwenPaw/issues/7630) | No option to disable CPU baseline detection; VM/cloud-desktop users cannot launch QwenPaw. | Open |
| **Low** | [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617) | PDF `DataBlock` in session history permanently breaks text-only OpenAI-compatible endpoints (Zhipu GLM). Closed; follow-up fix at [#7636](https://github.com/agentscope-ai/QwenPaw/pull/7636) open. | Closed + fix PR |
| **Low** | [#7620](https://github.com/agentscope-ai/QwenPaw/issues/7620) | Non-conforming HTTP 401 from MCP server misleads users as “requires OAuth” and blocks legacy fallback. | Closed via [#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627) |
| **Low** | [#7612](https://github.com/agentscope-ai/QwenPaw/issues/7612) | Built-in CLI commands fail inside Hub local sandboxes due to missing runtime boundary token. | Closed via [#7631](https://github.com/agentscope-ai/QwenPaw/pull/7631) |
| **Low** | [#7554](https://github.com/agentscope-ai/QwenPaw/issues/7554) | Shell children inherit console stdin on Windows; commands that read stdin hang and cannot be killed by Ctrl+C. | Closed via [#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598) |

---

## 6. Feature Requests & Roadmap Signals

Several user-requested features are already represented in merged or open PRs:

- **Plugin marketplace UX overhaul** — [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) asked for update notifications, batch updates, and preserving store context. Implemented in [PR #7605](https://github.com/agentscope-ai/QwenPaw/pull/7605).
- **Unknown slash-command feedback** — [#7479](https://github.com/agentscope-ai/QwenPaw/issues/7479) wants misspelled commands like `/mew` to get local feedback rather than being forwarded to the agent. Addressed by open [PR #7632](https://github.com/agentscope-ai/QwenPaw/pull/7632).
- **Context compaction budget awareness** — [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) requests that compaction consider the complete provider request, not just the visible conversation, with safe handling of active-turn overflow. This is likely to be picked up in an upcoming 2.2.x release.
- **AgentScope community integration** — [#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583) asks for community login, inbox, and rapid feedback loops from the Console. This is a longer-horizon product/community feature.
- **Disable CPU baseline detection** — [#7630](https://github.com/agentscope-ai/QwenPaw/issues/7630) is a practical deployment request for VM/cloud-desktop environments.
- **Artifact display position** — [#7553](https://github.com/agentscope-ai/QwenPaw/issues/7553) asks that artifacts appear above each message timestamp instead of collapsed inside completed steps.
- **Memory-backend ecosystem growth** — Open PRs for OpenViking memory backend ([#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613)), memory-backend plugin migration for ADBPG/PowerContext ([#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616)), and skill versioning/dependency validation ([#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609)) suggest the platform is evolving toward a pluggable memory and skills architecture.
- **Per-session model overrides** — Long-running [PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) would allow different LLMs per conversation; it remains a candidate for future releases.

---

## 7. User Feedback Summary

Real user pain points revolve around **session history integrity**, **chat reentrancy**, **tool-result payload compatibility**, and **silent background failures**:

- The loss of assistant replies from model context ([#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)) is particularly alarming to users because even persisted replies become invisible to model follow-ups.
- Heartbeat-cron feedback loops ([#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589)) are seen as high-impact because agents become unresponsive for long periods without clear recovery.
- Silent runtime rollback of manually upgraded llama.cpp binaries ([#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633)) creates a trust issue for local-model power users.
- Desktop/Windows users continue to report hangs: queue 409s ([#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)), event-loop freezes ([#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)), and console-stdin hangs ([#7554](https://github.com/agentscope-ai/QwenPaw/issues/7554)).
- Users on OpenAI-compatible text-only endpoints face hard breakage when PDF/image blocks enter history ([#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597), [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617)).
- Chinese-speaking users frequently request simpler management workflows: batch plugin updates ([#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582)), better artifact placement ([#7553](https://github.com/agentscope-ai/QwenPaw/issues/7553)), and community integration ([#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583)).
- Overall, issues show strong enthusiasm and real-world deployment breadth, but also reveal that **edge-case robustness** — especially around multimodal data, memory backends, and runtime processes — is the current main stability challenge.

---

## 8. Backlog Watch

Items that have been open for a while and may need maintainer attention:

- **[Issue #7363 — Synchronous calls freeze event loop and timeout never fires](https://github.com/agentscope-ai/QwenPaw/issues/7363)** — Open since 2026-08-27, 5 comments, Windows Desktop responsiveness issue. No linked fix PR yet.
- **[PR #5992 — Per-session model overrides](https://github.com/agentscope-ai/QwenPaw/pull/5992)** — Open since 2026-07-12, under review with first-time contributor status; requires careful design review but has high roadmap value.
- **[PR #6399 — Reranker UI config panel for ReMeLightMemoryCard](https://github.com/agentscope-ai/QwenPaw/pull/6399)** — Open since 2026-07-23, under review; complements the reranker backend but appears to be waiting on maintainer bandwidth.
- **[PR #7427 — Creator frontend dependency vulnerabilities](https://github.com/agentscope-ai/QwenPaw/pull/7427)** — Open since 2026-08-31; security-related maintenance (React Router DOM, Nano ID, PostCSS, Undici) that should not linger.
- **[Issue #7583 — AgentScope community login/inbox/feedback](https://github.com/agentscope-ai/QwenPaw/issues/7583)** — Open since 2026-09-06, 2 comments; could be a product-direction signal, but needs a maintainer response or roadmap label.
- **[PR #7613 — OpenViking long-term memory backend](https://github.com/agentscope-ai/QwenPaw/pull/7613)** — Open since 2026-09-07, under review, first-time contributor; the memory-backend ecosystem is clearly expanding, so review time is valuable.

---

**Overall project health:** High activity, well-maintained release cadence, and fast issue-to-PR turnaround on many reports. The main risk area is **stabilization of background/runtime edge cases** (memory indexing, heartbeats, child processes, local model binaries) rather than feature velocity.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-09

## 1. Today's Overview
ZeroClaw is in a sustained architecture-and-hardening phase: in the 24h window ending 2026-09-09, 26 issues and 50 PRs were updated, with **no new release cut**. Design/RFC work (runtime-owned sessions, unified file/attachment handling, sandbox policy, WASM plugin runtime) accounts for the most-commented items, while a steady stream of bug reports and small fixes targets cost accounting, prompt-cache efficiency, and channel/provider edge cases. Three PRs were closed — two small, targeted fixes and one XL branch closed unanswered the same day it was opened. Project health is active but strained: 47 PRs remain open, many tagged `needs-author-action` or `needs-maintainer-review`, and RFCs continue to pile up in the maintainer decision queue.

## 2. Releases
**No new releases** were published during this window. The most recently referenced user-facing version in issue reports is v0.8.5 (see [#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)).

## 3. Project Progress
Three PRs were closed/merged in the window (GitHub labels do not distinguish merged from closed-without-merge):

- **[#10718 — feat(cost): attribute ledger records to the chat conversation](https://github.com/zeroclaw-labs/zeroclaw/pull/10718)** (`size:S`, closed 2026-09-08). Fixes the ledger-attribution half of [#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700); a maintainer note clarifies it is *partial* coverage and trace correlation remains open.
- **[#10719 — fix(providers): preserve tool image references through normalization](https://github.com/zeroclaw-labs/zeroclaw/pull/10719)** (`size:S`, closed 2026-09-08). Keeps the original image path/URL as `Image reference:` text when converting tool images to provider payloads, so agents can still deliver images after normalization.
- **[#10717 — Feat/native security and helpers v2](https://github.com/zeroclaw-labs/zeroclaw/pull/10717)** (`size:XL`, created and closed 2026-09-08). The body is an unfilled placeholder with no description of changes or blast radius; this appears to be a branch cleanup or accidental PR rather than a landed feature.

Close-adjacent progress: **[#10716 — feat(cost): price cache writes at the configured write premium](https://github.com/zeroclaw-labs/zeroclaw/pull/10716)** (open, `size:M`) is the companion to #10718 and would correct Anthropic cache-write pricing (1.25x/2x input rate); it received no new activity beyond the window update.

## 4. Community Hot Topics
Most active items by comment count (all issues; PR comment data was unavailable in this export, and no items had reactions):

- **[#9487 — RFC: Runtime-owned conversation sessions and transport surface adapters](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** — 35 comments. Now at Revision 5, which invalidates the Revision 4 vote snapshot; maintainers must open a new discussion window. This is the central open question about where conversation state should live as channels (ACP, Telegram, web) multiply.
- **[#9488 — RFC: Unified file and attachment architecture for conversation surfaces](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** — 28 comments, Revision 10. Tightly coupled to #9487; both are drafted via Codex and submitted by the same author.
- **[#6996 — RFC: Granular sandbox policy - filesystem restrictions](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — 26 comments, `in-progress` since 2026-05-28. Addresses drift between application-layer path admission and OS sandbox backends (Bubblewrap/Landlock/Seatbelt).
- **[#8692 — [Tracker]: Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 15 comments. The backlog itself is now tracked as an issue, which signals the RFC process is the main bottleneck.
- **[#10076 — RFC: Composable WASM plugin runtime architecture](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)** — 11 comments. Revision 1 (2026-09-01) delegates session-history concerns to #10526.
- **[#5514 — [Bug]: batch Telegram media groups into one multimodal turn](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)** — 7 comments, `in-progress` since April.
- **[#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366), [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549), [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526), [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** — 5–6 comments each.

**Underlying need:** ZeroClaw's community — dominated by maintainers and principal contributors — is actively re-architecting state ownership, file handling, and sandboxing in public RFCs, while meta-RFCs like [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) ("Simplify RFC voting") and [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) ("Clarify PR review evidence") show process friction is being felt internally.

## 5. Bugs & Stability
Bugs ranked by severity, with fix status:

**S1 / high risk**
- **[#10674 — History trimming stops at the cap, so tool-heavy sessions re-trim every few turns and defeat prompt caching](https://github.com/zeroclaw-labs/zeroclaw/issues/10674)** — filed 2026-09-07, `p1`, `accepted`, `risk:high`. Whole-turn trimming leaves history just under `max_history_messages`, causing repeated trims and broken Anthropic/compatible prompt caching. No fix PR yet.
- **[#9333 — Failed ACP turns disappear after switching sessions](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** — `p1`, `S1`, `in-progress` since 2026-07-24 but still updated; workflow-blocking for Code/ACP users.
- **[#10670 — heartbeat.target rejects a channel instance composite key (`<type>.<alias>`)](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)** — S1, filed and **closed** within the window.

**S2 / medium risk**
- **[#10667 — ZeroCode can duplicate a streamed response when prompt completion precedes TurnComplete](https://github.com/zeroclaw-labs/zeroclaw/issues/10667)** — `p2`, `in-progress`; duplicated transcript entries in zerocode/TUI.
- **[#10688 — WhatsApp Web voice notes are never transcribed](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)** — S2 on v0.8.5; channel built without the agent's transcription provider. **Closed.**

**S3 / minor**
- **[#10326 — Reliable streaming errors report the requested model instead of the served pinned model](https://github.com/zeroclaw-labs/zeroclaw/issues/10326)** — **Closed.**
- **[#10702 — Token-budget history trimming stops at the first turn boundary that fits (same hysteresis gap as the message cap)](https://github.com/zeroclaw-labs/zeroclaw/issues/10702)** — `p3`, a sibling of #10674; no fix PR.

**Cost-accounting bug with fix:** [#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700) (`p2`) — `CostTracker.session_id` is a daemon-lifetime UUID, so per-conversation spend cannot be separated. PR [#10718](https://github.com/zeroclaw-labs/zeroclaw/pull/10718) (closed) fixes ledger attribution; trace correlation remains open.

**Legacy bug still open:** [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram media groups trigger one LLM request per image instead of a single multimodal turn; `in-progress` since 2026-04-08.

No regressions involving a released version were identified beyond the WhatsApp v0.8.5 transcription issue above.

## 6. Feature Requests & Roadmap Signals
The clearest roadmap signal is a **coordinated burst of six OpenAI Responses / Astra provider features**, all filed 2026-09-07 by IftekharUddin and all untriaged (0 comments):

- [#10704 — Support asynchronous function tools with OpenAI Responses](https://github.com/zeroclaw-labs/zeroclaw/issues/10704)
- [#10705 — Support max reasoning effort for compatible OpenAI models](https://github.com/zeroclaw-labs/zeroclaw/issues/10705) (cites GPT-6 Astra's documented `max` level)
- [#10706 — Preserve opaque reasoning state across OpenAI Responses call paths](https://github.com/zeroclaw-labs/zeroclaw/issues/10706)
- [#10707 — Support bounded programmatic tool calling through OpenAI Responses](https://github.com/zeroclaw-labs/zeroclaw/issues/10707)
- [#10708 — Support active-response steering on OpenAI Responses WebSockets](https://github.com/zeroclaw-labs/zeroclaw/issues/10708)
- [#10709 — [Docs]: Document Astra setup for API-key and Codex subscription providers](https://github.com/zeroclaw-labs/zeroclaw/issues/10709)

These read as a single coherent workstream: bring the native OpenAI Responses adapter to parity with the mature Anthropic/compatible providers (reasoning state, steering, async/programmatic tools) and then document it. If a maintainer picks them up as one epic, they are plausible candidates for the next minor release.

Other inbound requests:
- **[#10715 — Opt-in passive group context for Telegram group chats](https://github.com/zeroclaw-labs/zeroclaw/issues/10715)** (filed 09-08). Requests the Telegram equivalent of the WhatsApp Web `passive_group_context` feature (#8379/#8389).
- **[#10641 — [Feature] [Web]: Per-field cron schedule input](https://github.com/zeroclaw-labs/zeroclaw/issues/10641)** — `status:accepted`, adding client-side validation and human-readable confirmation to the cron modal; likely to ship soon.
- **[#9727 — Epic: run and monitor multiple agents from a zerocode sidebar](https://github.com/zeroclaw-labs/zeroclaw/issues/9727)** — `in-progress`, `risk:high`.

Roadmap-shaping RFCs still in review: [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) (session ownership), [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) (attachments), [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) (sandbox policy), [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) (append-only session history). These are architectural and will land across several future releases rather than one version.

## 7. User Feedback Summary
Concrete pain points expressed in this window:

- **Cost visibility is broken per conversation.** Users cannot separate spend by chat because every `costs.jsonl` record shares one daemon-lifetime session id ([#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700)); the partial fix landed the same day ([#10718](https://github.com/zeroclaw-labs/zeroclaw/pull/10718)).
- **Provider bills are inflated.** Tool-heavy sessions re-trim history every few turns, defeating prompt caching ([#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674)), and cache writes are not billed at Anthropic's premium rates ([#10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716)). Users are effectively paying for tokens twice.
- **Workflow-blocking transcript loss on ACP.** Failed turns vanish from the live transcript when switching sessions ([#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)).
- **Channel gaps frustrate users:** WhatsApp Web voice notes are never transcribed on v0.8.5 ([#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688), closed), Telegram albums produce multiple replies instead of one multimodal turn ([#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)), and heartbeat config rejects valid non-default channel instance keys ([#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670), closed).
- **zerocode UI trust issue:** streamed responses can be rendered twice even when persistence contains one message ([#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667)).
- **Power users want Astra/OpenAI Responses parity** in reasoning effort, steering, tool calling, and async execution ([#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704)–[#10708](https://github.com/zeroclaw-labs/zeroclaw/issues/10708)).

Satisfaction signals are indirect but positive: the maintainer queue is visibly working (three bugs closed within 24h of filing, two fix PRs landed), and long-running RFCs are converging through revisions rather than stalling.

## 8. Backlog Watch
Items that need maintainer attention or have been waiting longest:

- **[#6996 — RFC: Granular sandbox policy](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — open since 2026-05-28 (~3.5 months), 26 comments, `in-progress` but still `needs-maintainer-review`. The oldest unresolved security-RFC.
- **[#5514 — Telegram media groups bug](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)** — open since 2026-04-08 (~5 months), `in-progress` with no fix PR attached.
- **[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) / [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** — open since 2026-07-28, the two highest-comment RFCs, both awaiting fresh maintainer decision windows after revisions invalidated prior votes. The decision queue tracker is [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692).
- **Stalled security-critical PRs needing author action:**
  - [#9977 — fix(tools): confine filesystem mutations to workspace](https://github.com/zeroclaw-labs/zeroclaw/pull/9977) — `risk:high`, `size:XL`, `needs-author-action` since August.
  - [#10241 — fix(channels): restore supervised shell approval routing](https://github.com/zeroclaw-labs/zeroclaw/pull/10241) — `risk:high`, `needs-author-action`; cross-cutting security fix across all channels.
  - [#10337 — fix(tools): honor allowed roots for git operations](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) — `risk:high`, `needs-author-action`.
  - [#9819 — fix(multimodal): pixel-level image validation](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) — `risk:high`, `needs-author-action`.
- **PRs flagged do-not-merge / blocked:** [#9109 — native Hailo-Ollama support](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) (`do-not-merge`, since 07-17) and [#9212 — gate CI on replay regression suite](https://github.com/zeroclaw-labs/zeroclaw/pull/9212) (`blocked`, `do-not-merge`, since 07-20). Both represent finished work that cannot land until maintainers resolve blocking concerns.
- **Unreviewed feature cluster:** the six OpenAI Responses/Astra items ([#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704)–[#10709](https://github.com/zeroclaw-labs/zeroclaw/issues/10709)) are all untriaged with zero comments; they need a maintainer to confirm or merge scope before they become stale.

**Overall health assessment:** High contributor velocity and genuine architectural investment, with a well-functioning bug-close loop (3 bugs closed in 24h). The primary risks are queue depth — 47 open PRs and a growing RFC decision backlog — and the concentration of design work among a handful of named maintainer/principal contributors.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*