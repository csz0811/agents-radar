# OpenClaw Ecosystem Digest 2026-09-06

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-05 22:45 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-06

## 1. Today's Overview

OpenClaw shows very high activity: **500 issues** and **500 PRs** were updated in the last 24 hours (435 issues remain open, 65 were closed; 297 PRs remain open, 203 were merged/closed). One new release shipped (**v2026.9.2**), focused on keeping chat and dashboards responsive while long transcripts and disk-heavy work are processed, and moving durable history reads off the Gateway event loop. The issue tracker is dominated by automated ClawSweeper-triaged reliability bugs around **session-state integrity, message loss, and auth/provider failover**, with a severe backlog of long-lived P0/P1 items. Maintainer throughput is visible in the PR queue, where a large batch of fixes (many by steipete) is awaiting review or proof, indicating an active but strained review pipeline.

## 2. Releases

**v2026.9.2** — `openclaw 2026.9.2`

**Highlights:** Faster, more responsive chat: keep chat, dashboards, and session interactions responsive while long transcripts and disk usage are processed, with direct dashboard lookup, less cold-load work, and durable history reads outside the Gateway event loop. (refs [#136862](https://github.com/openclaw/openclaw/issues/136862), [#138…](https://github.com/openclaw/openclaw/issues/138…) — truncated in source data)

No breaking changes or migration notes were included in the release data.

## 3. Project Progress

203 PRs were merged/closed and 65 issues were closed in the window. Areas actively advancing:

- **Session/transcript durability** — PR [#139439](https://github.com/openclaw/openclaw/pull/139439): record a transcript notice when a run fails before replying; PR [#139469](https://github.com/openclaw/openclaw/pull/139469): prevent SQLite `database is locked` failures during session reclamation; PR [#119162](https://github.com/openclaw/openclaw/pull/119162): retain pending final delivery markers when some payloads failed.
- **Cloud/remote session orchestration** — PR [#138900](https://github.com/openclaw/openclaw/pull/138900) (XL): start cloud sessions without a local Gateway checkout; PR [#139455](https://github.com/openclaw/openclaw/pull/139455) (closed): keep worker provisioning resumable across Gateway restart.
- **Gateway/config resilience** — PR [#137713](https://github.com/openclaw/openclaw/pull/137713): preserve config when Doctor prefix recovery fails; PR [#139409](https://github.com/openclaw/openclaw/pull/139409): surface Gateway storage failures in run-failure copy.
- **Channels & notifications** — PR [#139456](https://github.com/openclaw/openclaw/pull/139456): restore native subagent progress on Discord/Slack and pause inactive cards; PR [#139292](https://github.com/openclaw/openclaw/pull/139292): preserve typing indicator in concurrent Telegram forum topics.
- **UI/UX** — PR [#139371](https://github.com/openclaw/openclaw/pull/139371) (closed): hide author avatars in subagent transcripts; PR [#136736](https://github.com/openclaw/openclaw/pull/136736): show primary user in multi-agent profile hero; PR [#139372](https://github.com/openclaw/openclaw/pull/139372): keep activity labels visible.
- **Platform/infra** — PR [#138199](https://github.com/openclaw/openclaw/pull/138199): refresh of 25 compatible npm dependencies across 34 manifest bindings; PR [#137893](https://github.com/openclaw/openclaw/pull/137893): Docker support for legacy fs-safe package exports.
- **New capability** — PR [#139466](https://github.com/openclaw/openclaw/pull/139466): one-click Chrome extension setup from the macOS app.
- **Performance** — PR [#139476](https://github.com/openclaw/openclaw/pull/139476): stop error-summary projection after first line; PR [#124632](https://github.com/openclaw/openclaw/pull/124632): exclude reasoning replay fields from proxy-like token estimates.

## 4. Community Hot Topics

Highest-engagement open issues (by comments):

- **[#38327 — `[Bug] "Cannot convert undefined or null to object"` with google-vertex/gemini-3.1-pro-preview](https://github.com/openclaw/openclaw/issues/38327)** — 15 comments, 3 👍 · P0 regression from the March release; top severity bug plus the most commented item. Users appear stuck on an auth/provider regression for months.
- **[#69208 — Umbrella: duplicate transcript, replay, and context assembly across channels](https://github.com/openclaw/openclaw/issues/69208)** — 14 comments · P1. A broad bug class spanning MSTeams, webchat, Telegram, followup queue, and delivery-mirror paths; indicates a systematic message-duplication problem rather than isolated channel bugs.
- **[#132762 — Overflow retry can end "successfully" on a tool result without final delivery](https://github.com/openclaw/openclaw/issues/132762)** — 13 comments · P1, message-loss. Multi-stage document workflow loses the final assistant answer after retry.
- **[#53763 — Feature: Built-in headless browser for reliable web access](https://github.com/openclaw/openclaw/issues/53763)** — 12 comments · P3. Repeated user demand for dependency-free browser tooling.
- **[#39476 — A2A `sessions_send` duplication when target agent replies back](https://github.com/openclaw/openclaw/issues/39476)** — 12 comments · P1, message-loss, PR linked.
- **[#96975 — Isolate subagent completion from parent context](https://github.com/openclaw/openclaw/issues/96975)** — 12 comments, 1 👍 · P2.
- **[#127229 — Telegram watchdog-released durable update falsely tombstoned](https://github.com/openclaw/openclaw/issues/127229)** — 12 comments · P1, message-loss.
- **[#14785 — Reduce tool schema token overhead (~3,500 tok/session)](https://github.com/openclaw/openclaw/issues/14785)** — 10 comments · cost/token-efficiency concern.
- **[#53408 — Write/exec tool parameters silently dropped after long conversations](https://github.com/openclaw/openclaw/issues/53408)** — 11 comments, 2 👍 · silent tool breakage is high-frustration for users.
- **[#72015 — Active-memory blocks replies / QMD boot initialization overloads multi-agent gateways](https://github.com/openclaw/openclaw/issues/72015)** — 10 comments, 2 👍.

**Underlying needs:** (1) guaranteed delivery/no-duplicates semantics across channels and agent-to-agent calls; (2) provider/auth failover that actually recovers (billing cooldowns, session limits, malformed tool calls); (3) lower token/cost overhead (schema size, prompt-cache churn); and (4) clean isolation of subagent/completion context in long-running sessions.

## 5. Bugs & Stability

Severity-ranked highlights (all still open unless noted):

**P0 / Critical**
- **[#38327](https://github.com/openclaw/openclaw/issues/38327)** — `"Cannot convert undefined or null to object"` on google-vertex/gemini-3.1 since v2026.3.2; P0, auth-provider impact, no fix PR.
- **[#91931](https://github.com/openclaw/openclaw/issues/91931)** — Preseeded `SOUL.md`/`IDENTITY.md`/`USER.md` cause bootstrap auto-complete and deletion of user `BOOTSTRAP.md`; P0 data-loss, PR linked.

**P1 — delivery/session-state integrity**
- **[#69208](https://github.com/openclaw/openclaw/issues/69208)** — Umbrella duplicate transcript/replay bugs across channels.
- **[#132762](https://github.com/openclaw/openclaw/issues/132762)** — Overflow retry falsely ends `success` without final delivery.
- **[#39476](https://github.com/openclaw/openclaw/issues/39476)** — A2A `sessions_send` back-call creates duplicates (fix PR linked).
- **[#127229](https://github.com/openclaw/openclaw/issues/127229)** — Telegram durable update falsely tombstoned after watchdog release.
- **[#112259](https://github.com/openclaw/openclaw/issues/112259)** — Inbound turn silently dropped: zero-payload dispatch has no retry/dead-letter.
- **[#54488](https://github.com/openclaw/openclaw/issues/54488)** — Followup drain starves session lane, blocking inbound dispatch 20–30 min.
- **[#78055](https://github.com/openclaw/openclaw/issues/78055)** — Subagent announce delivers stale output; subagent sessions inherit unrelated history.
- **[#49381](https://github.com/openclaw/openclaw/issues/49381)** — Feishu duplicate final replies after model failover.

**P1 — runtime/blocking/regressions**
- **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — Synchronous agent persistence blocks Gateway event loop at scale (partial fixes landed in #133925/#134062).
- **[#97616](https://github.com/openclaw/openclaw/issues/97616)** — Leaked hook/tool child processes → zombie accumulation, runtime degradation.
- **[#135111](https://github.com/openclaw/openclaw/issues/135111)** — Intermittent "Provider completed tool call with malformed JSON arguments" regression on claude-sonnet-5 in v2026.8.1.
- **[#136183](https://github.com/openclaw/openclaw/issues/136183)** — Command executor hangs spawning `ssh` until SIGTERM (regression 2026.8.1/8.2).
- **[#134? → #110190](https://github.com/openclaw/openclaw/issues/110190)** — Runtime context carrier placed after user message causes model confusion/reasoning waste.
- **[#101929](https://github.com/openclaw/openclaw/issues/101929)** — Context-overflow estimator over-counts ~2.3–2.6× vs billed usage.
- **[#132720](https://github.com/openclaw/openclaw/issues/132720)** — claude-cli `session_expired` 410 after 2026.9.1-beta.1 upgrade with valid paste-token; Doctor migrates primary off claude-cli.
- **[#132765](https://github.com/openclaw/openclaw/issues/132765)** — `agents_wait` ignores `timeoutSeconds`, dies at ~60s instead of returning pending.
- **[#102534](https://github.com/openclaw/openclaw/issues/102534)** — Cron scheduler timer permanently stops firing after heavy timeouts, survives restarts.

**P1/P2 — auth & capacity**
- **[#115642](https://github.com/openclaw/openclaw/issues/115642)** — Billing cooldown (fixed ~5h) outlives the outage on subscription auth.
- **[#118793](https://github.com/openclaw/openclaw/issues/118793)** — Claude CLI "session limit" dies with `surface_error` instead of triggering fallback chain.
- **[#120162](https://github.com/openclaw/openclaw/issues/120162)** — `qualityGuard` audit shares compaction timeout/abort budget, can fail whole compaction.
- **[#53008](https://github.com/openclaw/openclaw/issues/53008)** — Memory compaction blocks main lane → bot unresponsive 10+ minutes.

**Existing fix PRs correlated with open bugs** include [#119162](https://github.com/openclaw/openclaw/pull/119162) (pending-final retention), [#139469](https://github.com/openclaw/openclaw/pull/139469) (DB lock failures), [#139439](https://github.com/openclaw/openclaw/pull/139439) (failed-run transcript notice), and [#132831](https://github.com/openclaw/openclaw/pull/132831) (node capability approvals vanishing after 5 minutes, closes #132829).

## 6. Feature Requests & Roadmap Signals

Active, discussion-backed proposals:

- **[#53763 — Built-in headless browser for web access without external dependencies](https://github.com/openclaw/openclaw/issues/53763)** — 12 comments. Recurring, high-value ask; plausible candidate for a future minor release alongside the new Chrome-extension work in PR [#139466](https://github.com/openclaw/openclaw/pull/139466).
- **[#14785 — Reduce tool schema token overhead (~3,500 tok/session)](https://github.com/openclaw/openclaw/issues/14785)** — cost optimization aligned with the performance direction of v2026.9.2.
- **[#6599 — `/models` test-fallback command to verify fallback chains](https://github.com/openclaw/openclaw/issues/6599)** — fits the current heavy focus on provider fallback reliability.
- **[#96975 — Isolate subagent completion from parent context](https://github.com/openclaw/openclaw/issues/96975)** — fits the subagent-context-isolation work visible in PR #139456.
- **[#71058 — Multiple Azure/Teams bots per Gateway](https://github.com/openclaw/openclaw/issues/71058)** — enterprise multi-tenant demand.
- **[#99583 — Intelligent session auto-titling](https://github.com/openclaw/openclaw/issues/99583)** — UX quality-of-life; 2 👍.
- **[#54373 — RFC: context provenance metadata for injected segments](https://github.com/openclaw/openclaw/issues/54373)** — longer-term transparency/architecture signal.
- Others: [#63990](https://github.com/openclaw/openclaw/issues/63990) multi-index embedding memory with model-aware failover, [#71452](https://github.com/openclaw/openclaw/issues/71452) message-list pagination, [#85461](https://github.com/openclaw/openclaw/issues/85461) image-generation usage metadata, [#132781](https://github.com/openclaw/openclaw/issues/132781) commentary as progress label.

**Prediction:** v2026.9.x follow-ups will likely continue the responsiveness/event-loop work (pairs with release notes), plus land subagent isolation and fallback-chain improvements. Headless browser and `/models` test-fallback have the strongest demand signals and may appear as beta features in the next 1–2 releases.

**Notable closure:** [#42840 — MathJax/LaTeX support in Control UI](https://github.com/openclaw/openclaw/issues/42840) — closed with 10 👍, the most-reacted item in the dataset; if not shipped, users are likely to re-file it.

## 7. User Feedback Summary

- **Upgrade regressions are the top frustration.** Multiple reports of "worked in X, broken in Y": google-vertex crash since 2026.3.2 ([#38327](https://github.com/openclaw/openclaw/issues/38327)), malformed tool-call JSON since v2026.8.1 ([#135111](https://github.com/openclaw/openclaw/issues/135111)), ssh/exec hang regression ([#136183](https://github.com/openclaw/openclaw/issues/136183)), claude-cli auth broken after beta upgrade ([#132720](https://github.com/openclaw/openclaw/issues/132720)).
- **Worst-case recovery burden is heavy:** a macOS upgrade left the Gateway unrecoverable, requiring Time Machine restore of `~/.openclaw` ([#85027](https://github.com/openclaw/openclaw/issues/85027)).
- **Silent failure modes create distrust:** tools dropping parameters ([#53408](https://github.com/openclaw/openclaw/issues/53408)), inbound messages vanishing without retry ([#112259](https://github.com/openclaw/openclaw/issues/112259)), cron timers silently dying ([#102534](https://github.com/openclaw/openclaw/issues/102534)).
- **Bot unavailability during compaction/maintenance** (10+ minute unresponsiveness, [#53008](https://github.com/openclaw/openclaw/issues/53008), [#72015](https://github.com/openclaw/openclaw/issues/72015)) is a real reliability pain for always-on gateway users.
- **Cost-consciousness is rising:** prompt-cache churn on OpenAI ([#95610](https://github.com/openclaw/openclaw/issues/95610)) and fixed per-session token overhead ([#14785](https://github.com/openclaw/openclaw/issues/14785)) — users are measuring token waste.
- **Positive signal:** users actively propose test commands, docs improvements, and E2E harness work — signs of an engaged, sophisticated operator community despite stability friction.

## 8. Backlog Watch

Long-unanswered or long-lived items needing maintainer attention:

- **[#38327 (P0, 2026-03-06)](https://github.com/openclaw/openclaw/issues/38327)** — Critical google-vertex regression open ~6 months with no fix PR; severe both for severity and age.
- **[#6599 (2026-02-01)](https://github.com/openclaw/openclaw/issues/6599)** — `/models` test-fallback request with 11 comments and `needs-maintainer-review`; untouched since February.
- **[#14785 (2026-02-12)](https://github.com/openclaw/openclaw/issues/14785)** — Token-overhead reduction needs product decision; strong cost signal.
- **[#39476 (2026-03-08)](https://github.com/openclaw/openclaw/issues/39476)** — A2A duplication, P1 with linked open PR, still awaiting closure.
- **[#53408 (2026-03-24)](https://github.com/openclaw/openclaw/issues/53408)** — Tool params silently dropped; 11 comments, 2 👍, no fix PR.
- **[#53763 (2026-03-24)](https://github.com/openclaw/openclaw/issues/53763)** — Headless browser request in `needs-product-decision` since March.
- **[#54488 (2026-03-25)](https://github.com/openclaw/openclaw/issues/54488)** — Session-lane starvation blocking inbound dispatch for 20–30 min; P1 message-loss.
- **[#72015 (2026-04-26)](https://github.com/openclaw/openclaw/issues/72015)** — Active-memory blocking multi-agent gateways; P1.
- **[#97616 (2026-06-29)](https://github.com/openclaw/openclaw/issues/97616)** — Zombie child-process leak; P1 crash-loop impact, no fix PR yet.
- **[#95610 (2026-06-21)](https://github.com/openclaw/openclaw/issues/95610)** — OpenAI prompt-cache prefix churn; fix PR appears linked but remains open.
- **[#112259 (2026-07-21)](https://github.com/openclaw/openclaw/issues/112259)** — Silent inbound message drop; `clawsweeper-recovery-stuck`.

**Review-pipeline bottleneck:** a significant cluster of PRs are labeled `👀 ready for maintainer look` — [#137713](https://github.com/openclaw/openclaw/pull/137713), [#139409](https://github.com/openclaw/openclaw/pull/139409), [#139456](https://github.com/openclaw/openclaw/pull/139456), [#139457](https://github.com/openclaw/openclaw/pull/139457), [#139372](https://github.com/openclaw/openclaw/pull/139372), [#136736](https://github.com/openclaw/openclaw/pull/136736), [#132831](https://github.com/openclaw/openclaw/pull/132831), [#137893](https://github.com/openclaw/openclaw/pull/137893), [#120854](https://github.com/openclaw/openclaw/pull/120854) — while others wait on authors (`⏳ waiting on author`: [#137594](https://github.com/openclaw/openclaw/pull/137594), [#139439](https://github.com/openclaw/openclaw/pull/139439), [#139469](https://github.com/openclaw/openclaw/pull/139469), [#139343](https://github.com/openclaw/openclaw/pull/139343), [#98259](https://github.com/openclaw/openclaw/pull/98259), [#119162](https://github.com/openclaw/openclaw/pull/119162)). With 297 open PRs against 435 open issues, review throughput is the main constraint on closing the reliability gap.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant Open-Source Ecosystem
**Date:** 2026-09-06 | **Sources:** Community digests for OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant open-source space is shifting from feature-building to **unattended-operations reliability**: across five projects, the dominant bug classes are message loss/duplication, session-state corruption, provider/auth failover breakage, and cron/scheduled-job failures. The "Claw" lineage (OpenClaw as core reference, plus IronClaw and ZeroClaw derivatives) coexists with independently‑architected agents (Hermes Agent, QwenPaw), each orbiting a different ecosystem anchor — a reference gateway, a research lab, a hardware/cloud platform, or a model family. Collectively, these repositories processed **~605 issue events and ~610 PR events in 24 hours**, indicating a large, engaged operator/developer base running always-on, multi-channel, multi-agent deployments. Community requests now center on multi-tenancy, session event-sourcing, token-cost reduction, and decoupling agent lifecycles from desktop UI lifetimes.

## 2. Activity Comparison

| Project | Issues updated (closed) | PRs updated (merged/closed) | Release shipped | Open backlog | Health score* |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (65 closed) | 500 (203 merged/closed) | **v2026.9.2** | 435 issues / 297 PRs | 6.5/10 |
| **ZeroClaw** | 42 (8 closed) | 50 (10 merged/closed) | **v0.8.5** (454 commits, 73 contributors) | Moderate; RFC queue stretched | 7.5/10 |
| **Hermes Agent** | 50 (1 closed) | 50 (4 closed; non-feature) | None | High; several issues 68–162 comments | 5.0/10 |
| **QwenPaw** | 10 (3 closed) | 4 (0 merged) | None | Small, but PR review ~27 days stalled | 5.5/10 |
| **IronClaw** | 3 (2 closed) | 5 (2 merged) | None | Minimal | 8.0/10 |

*Health score blends merge throughput, issue-resolution rate, age/severity of open P0/P1 items, release cadence, and maintainer responsiveness relative to project scale. OpenClaw ships at massive volume but carries a 6-month-old P0 and a strained review pipeline; IronClaw is small in scope but resolves issues promptly with clean fixes.

## 3. OpenClaw's Position

OpenClaw is the **clear volume leader and de facto reference implementation**: its 500-issues/500-PRs-per-day activity is an order of magnitude above the nearest peer, and it is the only project shipping continuous releases (v2026.9.2 focused on Gateway event-loop responsiveness and durable history reads). Its advantages:

- **Breadth of channel coverage** — Discord, Slack, Telegram, MSTeams, Feishu, webchat, A2A — no peer matches this surface area.
- **Automated reliability triage (ClawSweeper)** — systematically surfaces message-loss and session-integrity bugs, giving the project a unusually complete map of its own failure modes (even if the resulting backlog — 435 open issues — is itself a risk).
- **Release cadence** — 203 PRs merged/closed in 24h demonstrates sustained maintainer throughput that Hermes and QwenPaw currently lack.
- **Performance engineering** — v2026.9.2's event-loop/durable-history work directly addresses the scale pain points other projects are only beginning to report.

**Vulnerabilities:** a P0 google-vertex regression ([#38327]) has sat unfixed for ~6 months; a cluster of ~10 PRs await maintainer review while message-loss bugs remain open; and the 297-PR queue makes review throughput the binding constraint on closing the reliability gap.

**Technical approach differences:** OpenClaw runs a Gateway-centric event-loop architecture with SQLite persistence and npm-based packaging, positioning it as a **self-hosted server gateway**. ZeroClaw shares heritage but adds ZeroRelay/ZeroRouter, a WASM plugin runtime, and OS-level sandbox backends (Bubblewrap/Landlock/Seatbelt), targeting security-conscious community governance. Hermes is a **Python/asyncio desktop-bundled runtime**; QwenPaw is a Python codebase oriented around creative-media app-plugins and Qwen model compatibility; IronClaw is a small Telegram/device-focused agent tied to the NearAI ecosystem.

## 4. Shared Technical Focus Areas

Recurring requirements across multiple projects:

| Focus area | Projects affected | Representative evidence |
|---|---|---|
| **No message loss / no duplicates under failover & retry** | OpenClaw, Hermes, ZeroClaw | OpenClaw umbrella #69208 (duplicates across channels), #132762 (retry falsely succeeds without delivery); Hermes PR #103565 (session replay corruption); ZeroClaw #10526 (append-only event history with deterministic replay) |
| **Provider/auth failover resilience** | OpenClaw, Hermes, QwenPaw, ZeroClaw | OpenClaw P0 #38327 (Vertex regression), #132720 (claude-cli 410); Hermes #103057 (GPT-6 Astra), #103929 (degenerate-model fallback); QwenPaw #7474/#7576 (custom providers break on `max_tokens` migration); ZeroClaw #10533 (`custom.*` provider slots rejected) |
| **Cron / scheduled-job dependability** | OpenClaw, Hermes, ZeroClaw | OpenClaw #102534 (timers silently die); Hermes #100401 (heartbeat deadlock), #103904 (UTC drift), PR #103930; ZeroClaw PR #9320 (wall-clock timeout for cron runs) |
| **Desktop/gateway lifecycle decoupling & UI responsiveness** | OpenClaw, Hermes, QwenPaw | OpenClaw v2026.9.2 (keep chat responsive during disk-heavy work); Hermes #58576 (51s UI stalls), #69180 (OOM crash-loop), #97681 (bot chats die with Desktop); QwenPaw #7573 (edit/rewind conversation) |
| **Subagent/context isolation** | OpenClaw, Hermes, QwenPaw | OpenClaw #96975; Hermes sidecar/context integrity (#102194); QwenPaw Advisor Mode pairing strong/weak models (#7569) |
| **Skills/tool versioning & observability** | Hermes, QwenPaw, OpenClaw | Hermes #66616 (stale skills index, 162 comments); QwenPaw #7557 (skill version/dependency metadata); OpenClaw #53408 (tool params silently dropped) |
| **Token/cost efficiency** | OpenClaw, QwenPaw | OpenClaw #14785 (~3,500 tok/session tool schema), #95610 (prompt-cache churn); QwenPaw Advisor Mode cost split |
| **Sandbox/security boundary consistency** | ZeroClaw, OpenClaw | ZeroClaw #6996 (path-admission drift across sandbox layers), #10536 (macOS Seatbelt ignores `allowed_roots`); OpenClaw #53763 (dependency-free headless browser request) |

## 5. Differentiation Analysis

| | **OpenClaw** | **Hermes Agent** | **ZeroClaw** | **QwenPaw** | **IronClaw** |
|---|---|---|---|---|---|
| **Positioning** | Core reference gateway; broadest channel matrix; scale-focused reliability engineering | Research-lab agent (NousResearch) with desktop-first UX and Copilot integrations | Community-governed, security-first derivative with rigorous RFC process | Qwen-ecosystem agent with creative-media Creator plugin and imminent multi-tenant Hub (v2.2.0) | Minimal Telegram/device agent integrated with NearAI platform; embedded Pi sandbox |
| **Target users** | Operators running always-on, multi-channel, multi-agent gateways | Desktop power users wanting local agent + unattended background operation | Security-conscious self-hosters; contributors who value architectural governance | Creative/media teams; fleet operators (9-agent skill-pool complaints); teams adopting shared Hub | Telegram bot users and benchmark/device deployments |
| **Architecture signature** | Gateway event loop + SQLite; Node/npm; macOS app; durable transcript stores | Python/asyncio; desktop app renders agent runtime; systemd/Windows update tooling; TTS stack | ZeroRelay/ZeroRouter; WASM plugin runtime; OS sandbox backends; append-only event-sourcing direction | Python tool-dispatch core; app-plugin model with T2V/I2V/S2V media scheduling; multi-tenant Hub roadmap | Lightweight: pairing/command-menu focused; Pi sandbox loop for benchmarks |
| **Primary risk** | Review pipeline can't keep pace with 297 open PRs; old P0s | P0 fixes stranded in review; no release vehicle; update/restart loops erode trust | Process friction: RFC revision cycles invalidate votes; many `blocked`/`needs-author-action` PRs | Near-zero merge velocity in window; MCP timeout PR waiting 27 days | Very small surface; low community mass |

## 6. Community Momentum & Maturity

**Tier 1 — Hyperactive, release-driven:** *OpenClaw* and *ZeroClaw* are both shipping (v2026.9.2 and v0.8.5) with high merge throughput and strong contributor bases (ZeroClaw: 73 contributors in one release). ZeroClaw's community is the most **process-mature** — RFC revision cycles, maintainer decision-queue trackers, and governance-reform proposals show a community investing in decision infrastructure, though at the cost of velocity. OpenClaw's community is the most **operationally sophisticated**, filing precise message-loss and token-cost reports and proposing test-fallback commands and E2E harnesses.

**Tier 2 — Active but shipping-constrained:** *Hermes Agent* has high issue energy (incl. a 162-comment skills-index saga) but shipped no release; visible PR closures were non-feature housekeeping. *QwenPaw* has healthy roadmap discussion (23 comments on the Hub multi-tenant thread) but zero PR merges in the window — maintainer bandwidth appears to be the constraint.

**Tier 3 — Focused maintenance:** *IronClaw* shows a tight, healthy bug-fix loop: 2 of its 3 active bugs were closed with matching fixes in 24 hours. Scope is narrow (Telegram onboarding/pairing copy), but execution quality is high.

**Overall maturity pattern:** the ecosystem is bifurcating into **platform-scale gateways** (OpenClaw, ZeroClaw) where reliability debt and review capacity are the fight, and **smaller agents** (IronClaw, QwenPaw) that must either consolidate around an ecosystem (NearAI, Qwen) or risk being absorbed by the feature breadth of the Claw core.

## 7. Trend Signals

1. **Reliability of unattended operation is the moat.** Across every project, the top-frustration cluster is silent failure: messages vanishing without retry (OpenClaw #112259), cron timers dying silently (OpenClaw #102534), cron failures greenwashed as success (Hermes #20301), update loops re-firing forever (Hermes #98022). Users no longer tolerate demo-grade delivery semantics; they expect dead-letter queues, exactly-once delivery, and crash-consistent session stores.

2. **Event-sourced session state is the emerging architectural answer.** ZeroClaw's #10526 (append-only session event history with deterministic replay) and OpenClaw's durable-history/event-loop work reflect a convergence: the duplicate/loss bug classes (#69208, #132762) are not fixable by per-channel patches — they require replayable, authoritative session logs.

3. **Multi-agent and multi-tenant demand has arrived.** QwenPaw's Hub 2.2.0 discussion, OpenClaw's multi-agent profile work, and ZeroClaw's per-user Telegram sessions all point to the same shift: from single-user personal assistants to team-shared, admin-managed fleets. Skills versioning/dependency metadata (QwenPaw #7557) is the natural packaging follow-on.

4. **Provider-support fragility is a systemic tax.** Model-schema migrations (`max_tokens` → `max_output_length`), auth-token churn, and malformed-JSON regressions break users weeks after upgrades. Projects need provider contract tests and fallback-chain test commands (OpenClaw #6599) as first-class infrastructure.

5. **Token economy is becoming a user-visible feature.** Claw users measure per-session token overhead; QwenPaw responds with Advisor Mode (expensive planner + cheap worker). Cost-aware architecture (schema minimization, prompt-cache hygiene, model-tier routing) will differentiate the next generation.

6. **Desktop and gateway lifecycles are decoupling.** Hermes users explicitly want a "lite" remote client (#58799) and bot chats that survive Desktop closing (#97681); OpenClaw moved durable reads off the Gateway event loop for the same operational reason. Agents are becoming headless services with optional UI front-ends.

**Value for developers:** if you are building on this ecosystem, invest early in (a) an append-only session store with idempotent delivery, (b) provider-agnostic fallback chains exercised continuously, and (c) headless/daemon operation decoupled from any UI process. The pattern across all five projects is consistent: at scale, session integrity and failover semantics — not model capability — determine whether users trust the agent enough to leave it running unattended.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-06

## 1. Today's Overview

As of 2026-09-06, NousResearch/hermes-agent remains highly active but did not ship: 50 issues were updated in the last 24h (49 open, 1 closed) and 50 PRs were updated (46 open, 4 closed/merged). The visible PR closures are ORCH V4 exploration/duplicate items rather than feature merges, so the code-shipping impact of the window is minimal. Issue attention is concentrated on long-running operational and refactoring topics, especially the stale Skills Hub index ([#66616](https://github.com/NousResearch/hermes-agent/issues/66616), 162 comments). Health signals are mixed: strong contribution velocity, but several P0/P1 fixes remain unmerged and there is no release to carry pending fixes to users.

## 2. Releases

None. No version/tag was published in the window, so there are no changelog, breaking-change, or migration notes to report.

## 3. Project Progress

Four PRs were closed/merged in aggregate, but the two surfaced closed PRs are not feature landings:

- [#79248](https://github.com/NousResearch/hermes-agent/pull/79248) — closed ORCH V4 sidecar control plane candidate.
- [#79819](https://github.com/NousResearch/hermes-agent/pull/79819) — closed duplicate ORCH V4 docs-only PR-prep metadata.

Visible progress is therefore happening in open PRs awaiting review/merge, including:

- [#103565](https://github.com/NousResearch/hermes-agent/pull/103565) — P0 fix to persist pre-flushed user context by exact row identity, preventing session replay corruption.
- [#103930](https://github.com/NousResearch/hermes-agent/pull/103930) — P1 cron fix for older systemd transient scopes.
- [#103609](https://github.com/NousResearch/hermes-agent/pull/103609) — Windows update recovery instruction improvements.
- [#103927](https://github.com/NousResearch/hermes-agent/pull/103927) — gateway TTS scratch directory now honors `HERMES_HOME`.
- [#103928](https://github.com/NousResearch/hermes-agent/pull/103928) — Gemini TTS timeout/retry/safety-block handling.
- [#103922](https://github.com/NousResearch/hermes-agent/pull/103922) — API server client-managed system prompts made opt-in.
- [#103911](https://github.com/NousResearch/hermes-agent/pull/103911) — opt-in `display.vivid` content styling.
- [#103057](https://github.com/NousResearch/hermes-agent/pull/103057) — GPT-6 Astra baseline compatibility support.

## 4. Community Hot Topics

The most-commented issues reveal sustained pain around automation reliability, architecture debt, and desktop/session behavior:

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — Skills index stale/degraded (162 comments). The index is 29.8h old against a 26h limit; the watchdog keeps reporting but the pipeline is not recovering.
- [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) — Repo-wide godfile eradication epic reopened with ~2K residual tasks (81 comments). Underlying need: a realistic sharding/refactor completion path.
- [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — Automated Nous integration blocked by conflicts in `cron/jobs.py` (68 comments). Underlying need: conflict handling for scheduled upstream merges.
- [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — Bot Group Chats should keep working after Desktop closes (23 comments). Underlying need: gateway/session lifecycle must be independent of desktop UI lifetime.
- [#58576](https://github.com/NousResearch/hermes-agent/issues/58576) — Web-server event-loop stalls up to 51s under heavy agent work (9 comments). Underlying need: lower GIL contention in desktop-heavy workloads.
- [#98022](https://github.com/NousResearch/hermes-agent/issues/98022) — Update catch-up fleet restart re-fires forever due stale receipt (9 comments). Underlying need: update receipts must be atomically invalidated after interrupted runs.

The most thumbed-up surfaced issue is [#58799](https://github.com/NousResearch/hermes-agent/issues/58799) (4 👍), requesting a standalone Lite Desktop client without the bundled full agent runtime.

## 5. Bugs & Stability

Highest-severity surfaced items:

- P0 fix in review: [#103565](https://github.com/NousResearch/hermes-agent/pull/103565) — prevents a previous session turn’s sidecar/context from being overwritten by follow-up prompts. Fixes [issue #102194](https://github.com/NousResearch/hermes-agent/issues/102194).
- P1 [#100401](https://github.com/NousResearch/hermes-agent/issues/100401) — cron fire-claim heartbeat can deadlock on its own fence, killing jobs >60s as “Interrupted by shutdown.”
- P1 [#98022](https://github.com/NousResearch/hermes-agent/issues/98022) — `hermes update` can fleet-restart forever from a stale interrupted receipt.
- P1 [#58576](https://github.com/NousResearch/hermes-agent/issues/58576) — desktop UI freezes for roughly a minute under heavy agent/tool work.
- P1 [#69180](https://github.com/NousResearch/hermes-agent/issues/69180) — Desktop renderer OOM crash-loop on empty chat / virtualization layout thrash.
- P1 [#20548](https://github.com/NousResearch/hermes-agent/issues/20548) — Feishu `root_id` fallback causes all replies to be threaded incorrectly.
- P1 [#96925](https://github.com/NousResearch/hermes-agent/issues/96925) — Copilot integration duplicates tool calls and emits repeated duplicate-call warnings after v0.20.6.

Newly filed P2/P3 bug reports in the window:

- [#103840](https://github.com/NousResearch/hermes-agent/issues/103840) — `state.db` `.recover` resurrects orphan FTS5 shadow tables and blocks gateway startup.
- [#103904](https://github.com/NousResearch/hermes-agent/issues/103904) — recurring cron `next_run_at` drifts to UTC, firing 2h late in Europe/Warsaw.
- [#103900](https://github.com/NousResearch/hermes-agent/issues/103900) — Desktop pinned sessions are local-only and do not set the native session-store flag.
- [#103870](https://github.com/NousResearch/hermes-agent/issues/103870) — duplicate `RuntimeWarning: coroutine '_watch_stdio_children' was never awaited`.
- [#103747](https://github.com/NousResearch/hermes-agent/issues/103747) — Windows Desktop updater UI can spin forever after the updater has completed.

Matching fix PRs are in flight for several bug clusters, including [#103930](https://github.com/NousResearch/hermes-agent/pull/103930), [#103927](https://github.com/NousResearch/hermes-agent/pull/103927), [#103922](https://github.com/NousResearch/hermes-agent/pull/103922), [#103918](https://github.com/NousResearch/hermes-agent/pull/103918), and [#103609](https://github.com/NousResearch/hermes-agent/pull/103609).

## 6. Feature Requests & Roadmap Signals

Notable requested or proposed features visible in the last 24h:

- [#103917](https://github.com/NousResearch/hermes-agent/issues/103917) — simplified structured-output contract for `delegate_task`, reducing need for inline JSON Schema.
- [#103925](https://github.com/NousResearch/hermes-agent/issues/103925) — native time-gate for Kanban cards via `dispatch_after` / `dispatch_window`.
- [#103929](https://github.com/NousResearch/hermes-agent/pull/103929) — roll to fallback provider when the model enters a degenerate/no-progress continuation.
- [#103605](https://github.com/NousResearch/hermes-agent/pull/103605) — desktop voice playback Pause/Resume support.
- [#103911](https://github.com/NousResearch/hermes-agent/pull/103911) — opt-in richer CLI content styling (`display.vivid`).
- [#103057](https://github.com/NousResearch/hermes-agent/pull/103057) — GPT-6 Astra baseline support in OpenAI provider.
- [#80790](https://github.com/NousResearch/hermes-agent/issues/80790) — readiness-annotated skill index to avoid offering skills that cannot run.
- [#80791](https://github.com/NousResearch/hermes-agent/issues/80791) — content-preservation rule for curator skill consolidation.
- [#58799](https://github.com/NousResearch/hermes-agent/issues/58799) — standalone Hermes Desktop installer / lite client, 4 👍.
- [#43224](https://github.com/NousResearch/hermes-agent/issues/43224) — minimize-to-tray compact chat popup.
- [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — keep Bot Group Chats alive after Desktop closes.

Near-term roadmap likelihood is highest for the already-open, low-risk PRs: P0/P1 fixes such as [#103565](https://github.com/NousResearch/hermes-agent/pull/103565) and [#103930](https://github.com/NousResearch/hermes-agent/pull/103930), plus small desktop/CLI features like [#103605](https://github.com/NousResearch/hermes-agent/pull/103605) and [#103911](https://github.com/NousResearch/hermes-agent/pull/103911). The GPT-6 Astra baseline PR ([#103057](https://github.com/NousResearch/hermes-agent/pull/103057)) is a clear compatibility signal for a future provider-focused release.

## 7. User Feedback Summary

User pain points in this window cluster around update reliability, desktop/session resilience, and perceived agent behavior regressions:

- Update/restart loops are a recurring real-world frustration: stale receipts can cause permanent fleet restarts ([#98022](https://github.com/NousResearch/hermes-agent/issues/98022)), update-from-gateway loops are still reported ([#98010](https://github.com/NousResearch/hermes-agent/issues/98010)), and Windows update hand-off can stall ([#102283](https://github.com/NousResearch/hermes-agent/issues/102283)).
- Desktop users report both severe freezes and crash loops ([#58576](https://github.com/NousResearch/hermes-agent/issues/58576), [#69180](https://github.com/NousResearch/hermes-agent/issues/69180)), while power users want Desktop to be a remote client rather than an agent host ([#58799](https://github.com/NousResearch/hermes-agent/issues/58799), [#97681](https://github.com/NousResearch/hermes-agent/issues/97681)).
- Agent behavior changes after v0.20.6/0.21.0 are generating dissatisfaction: Copilot tool-call duplication ([#96925](https://github.com/NousResearch/hermes-agent/issues/96925)) and strengthened runtime guidance overriding user-authored SOUL.md constraints ([#103919](https://github.com/NousResearch/hermes-agent/issues/103919)).
- Operator-focused users are sensitive to silent status corruption: cron pre-run failures are greenwashed as success ([#20301](https://github.com/NousResearch/hermes-agent/issues/20301)), and gateway signal shutdown exits leave systemd units permanently failed ([#94757](https://github.com/NousResearch/hermes-agent/issues/94757)).

Overall sentiment appears mixed: users are pushing Hermes into serious unattended/self-hosted use cases, but update loops, session-state defects, and desktop lifecycle coupling are eroding trust in unattended operation.

## 8. Backlog Watch

Issues/PRs that appear to need maintainer attention due to age, importance, or unresolved activity:

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — created Jul 18; skills index still degraded with 162 comments. The probe keeps firing, but no durable fix is visible.
- [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) — created Aug 4; godfile eradication epic reopened with ~2K residual tasks and no in-flight PR surfaced.
- [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — created Aug 17; 68 comments; automated Nous-to-Enterkey integration blocked in `cron/jobs.py`.
- [#20301](https://github.com/NousResearch/hermes-agent/issues/20301) — created May 5; cron pre-run script failures are silently reported as success; no visible fix PR.
- [#20548](https://github.com/NousResearch/hermes-agent/issues/20548) — created May 6; Feishu threading bug caused by `root_id` fallback; no visible fix PR.
- PR [#76146](https://github.com/NousResearch/hermes-agent/pull/76146) — created Aug 1; background-process completion markers are not persisted across restarts; stale after agent/gateway restart.
- PR [#82773](https://github.com/NousResearch/hermes-agent/pull/82773) — created Aug 9; one-shot CLI reasoning identity is not consistently attested.
- PR [#86508](https://github.com/NousResearch/hermes-agent/pull/86508) — created Aug 14; TUI quick aliases still bypass native command handling.

These items represent the largest unresolved operational, architectural, and merge-throughput risks in the project right now.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-06

Based on GitHub activity updated in the last 24 hours.

## Today's Overview

Activity was moderate and focused primarily on Telegram onboarding/pairing fixes. Three issues were updated, with two closed bugs confirmed fixed and one new user-facing messaging bug still open. Five PRs were updated: three remain open and two were closed, both corresponding to Telegram pairing-related fixes. The project also has one large open sandbox-default PR and one Telegram command-menu feature PR pending review. No new releases were published in this window.

## Releases

No new releases were published in the last 24h, so there are no release notes, breaking changes, or migration steps to report.

## Project Progress

Two PRs were merged/closed during the period:

- [PR #8054 — fix(assistant): check pairing before command admission so first contact gets the connect notice](https://github.com/nearai/ironclaw/pull/8054)  
  Fixes Telegram users who send `/start` before pairing. Previously they were shown the command inventory; now they receive the correct connect/pairing notice.

- [PR #8073 — fix(device-link): say "not configured by administrator" instead of blaming the user's account](https://github.com/nearai/ironclaw/pull/8073)  
  Improves Telegram personal-account linking failure copy so users are not blamed when admin configuration is missing.

These fixes correspond to the two closed bug reports:

- [Issue #7956 — Telegram: unpaired sender's /start gets the command inventory instead of the connect/pairing notice](https://github.com/nearai/ironclaw/issues/7956) — closed
- [Issue #7955 — Telegram personal-account linking shows generic "Something went wrong" when admin has not configured api_id/api_hash](https://github.com/nearai/ironclaw/issues/7955) — closed

## Community Hot Topics

Community engagement was low; only one issue currently has discussion activity:

- [Issue #8074 — [bug] Paired user's rejected action in a not-connected shared channel gets the pairing notice copy instead of channel-not-connected copy](https://github.com/nearai/ironclaw/issues/8074) — 1 comment  
  This is the only item with visible comment activity. The underlying need is clearer contextual messaging: users should not receive account-pairing instructions when the actual problem is that the shared channel is not connected for the installation.

No PRs showed notable reaction or comment activity in the last 24h.

## Bugs & Stability

Three bug-related issues were updated in the last 24h:

1. **[Issue #8074 — Open · Medium severity](https://github.com/nearai/ironclaw/issues/8074)**  
   A **paired** user acting in a shared channel that is **not connected** receives the manifest's `connect_required` notice intended for unpaired actors. This is confusing because the user is already paired. No fix PR is linked yet.

2. **[Issue #7956 — Closed · Severity medium](https://github.com/nearai/ironclaw/issues/7956)**  
   Unpaired Telegram sender's `/start` returned command inventory instead of the pairing notice. Fixed in [PR #8054](https://github.com/nearai/ironclaw/pull/8054).

3. **[Issue #7955 — Closed · Severity medium](https://github.com/nearai/ironclaw/issues/7955)**  
   Telegram personal-account linking failed with generic "Something went wrong" when the administrator had not configured `telegram_api_id` / `telegram_api_hash`. Fixed in [PR #8073](https://github.com/nearai/ironclaw/pull/8073).

Overall, the remaining open bug is localized to shared-channel messaging copy and does not indicate a systemic stability regression.

## Feature Requests & Roadmap Signals

No explicit new feature-request issues were filed in the last 24h, but two open PRs point to near-term product direction:

- [PR #8072 — feat(telegram): register the Bot API command menu at activation](https://github.com/nearai/ironclaw/pull/8072)  
  Adds `/model`, `/status`, `/new`, `/stop`, `/interrupt` to Telegram's chat menu button via `setMyCommands`. This improves discoverability of channel commands and is likely to land soon.

- [PR #8075 — feat: make the embedded Pi sandbox loop the startup default](https://github.com/nearai/ironclaw/pull/8075)  
  Makes the embedded Pi sandbox loop the default startup profile for benchmark use. Note it is stacked on an unmerged base PR and is not ready for immediate merge.

Likely next-version candidates: Telegram command-menu registration and, once the base PR lands, the Pi sandbox default startup change.

## User Feedback Summary

The data reflects several real user pain points around Telegram onboarding and configuration clarity:

- Users who start a Telegram bot before pairing were confused by receiving a command inventory instead of connection instructions. This is now fixed.
- Users were shown a generic "Something went wrong" error during personal-account linking when the real cause was missing administrator configuration. This has been corrected to point clearly at admin setup.
- There is still an unresolved messaging confusion for paired users in shared channels whose channel connection is not established. They currently receive pairing copy, which incorrectly implies their account is unpaired.

No explicit positive or negative user comments were present in the dataset.

## Backlog Watch

No issues appear critically stale, but a few items deserve maintainer attention:

- [PR #7988 — chore(agents): refresh codebase knowledge graph](https://github.com/nearai/ironclaw/pull/7988)  
  Automated nightly PR opened on 2026-08-29 and still open. It is CI-generated and says "review and merge normally," so it likely needs a routine maintainer review.

- [Issue #8074 — Open bug with no linked fix](https://github.com/nearai/ironclaw/issues/8074)  
  Newly reported messaging bug; triage and assignment have not yet happened.

- [PR #8075 — Embedded Pi sandbox loop startup default](https://github.com/nearai/ironclaw/pull/8075)  
  Open with base-PR dependency; should be tracked carefully to avoid blocking benchmark-related work.

The project appears healthy overall: Telegram onboarding bugs are being actively fixed and closed, while remaining open items are either pending review, stacked, or newly triaged.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-06

## 1. Today's Overview

QwenPaw activity remains healthy but is mostly issue-driven rather than merge-driven: 10 issues were updated in the last 24 hours (7 open/active, 3 closed) while 4 PRs were refreshed, with no PRs merged or closed and no new releases published. The hottest topic is still the upcoming **QwenPaw Hub multi-tenant edition**, which has accumulated 23 comments on issue #7318. Bug triage was active: three issues were closed, including two img-gen skill API regressions and one custom-provider loading failure. No release exists to summarize, and several open PRs remain in review — notably the MCP timeout PR from August, which has now been waiting for nearly a month.

## 2. Releases

No new QwenPaw releases were published in this window. The latest published release context still points to v2.1.0/v2.2.0 behavior mentioned in recent issue reports. No release notes, migration guides, or breaking-change notices are available for today.

## 3. Project Progress

There were **no merged or closed PRs** in the last 24 hours. Four open PRs were updated and continue to represent the project's active feature pipeline:

- **#7509 — feat(skill): Update make-skill to v2**  
  [PR #7509](https://github.com/agentscope-ai/QwenPaw/pull/7509)  
  Implements an approval-driven, script-based draft-then-publish workflow for reusable workspace Skills. Advances skill authoring reliability.

- **#7569 — feat(modes): add Advisor Mode**  
  [PR #7569](https://github.com/agentscope-ai/QwenPaw/pull/7569)  
  Adds a new conversation-level loop mode pairing a stronger "advisor" model with a cheaper worker model, including an opening plan feature.

- **#6874 — feat(mcp): add configurable tool call timeout**  
  [PR #6874](https://github.com/agentscope-ai/QwenPaw/pull/6874)  
  Under review since August 10; adds a per-client MCP tool-call deadline with configurable `tool_call_timeout` defaulting to 300 seconds.

- **#7486 — feat(creator) 1.1.2: runtime notification bus, async delegation, A/B compare, T2V/I2V/S2V scheduling**  
  [PR #7486](https://github.com/agentscope-ai/QwenPaw/pull/7486)  
  Large app-plugin update for QwenPaw Creator, including multi-timeline A/B comparison, media prompt scheduling, locking, Windows hardening, and Docker deployment.

## 4. Community Hot Topics

The community discussion is focused on platform evolution and multi-user use cases.

- **#7318 — QwenPaw Hub multi-tenant edition coming in 2.2.0: what should we build next?**  
  [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)  
  23 comments · 3 👍  
  This is by far the most active item. Community requests referenced include multi-user access, admin-managed skills, and team-oriented deployment. The underlying need is clear: QwenPaw users want to move from personal assistant usage to shared/team deployments without losing the current flexibility.

- **#7474 — Custom provider load failure after `ModelInfo.max_tokens` migration (closed)**  
  [Issue #7474](https://github.com/agentscope-ai/QwenPaw/issues/7474)  
  5 comments  
  Raised concern about a breaking migration, and is now closed — a sign that compatibility fallout from the `max_tokens` → `max_output_length` change was recognized and resolved.

- **#7557 — Feature: Version & dependency metadata for skills (`skill_pool`)**  
  [Issue #7557](https://github.com/agentscope-ai/QwenPaw/issues/7557)  
  2 comments  
  A fleet operator managing nine agents reports pain around unversioned skill copies across workspaces. This is a real production signal that skills need package-style metadata.

Other active issues each have 1 comment and represent clear user feature asks, but #7318 is the main community rally point.

## 5. Bugs & Stability

Several bugs were reported or closed in the past 24 hours. Ranked roughly by severity:

- **High: #7576 — RetryChatModel hardcodes 32768 context_size fallback**  
  [Issue #7576](https://github.com/agentscope-ai/QwenPaw/issues/7576)  
  Affects v2.1.0 through v2.2.0. Forces all models to use a 32768-token context window, causing `CONTEXT_UNFIT` errors when actual token budgets are larger. This is model-agnostic and can degrade many workflows. No fix PR is visible yet.

- **Medium/High: #7572 — Tool dispatch layer swallows exception stack traces**  
  [Issue #7572](https://github.com/agentscope-ai/QwenPaw/issues/7572)  
  In `qwenpaw/tool_calls/_coordinator.py`, `_drain()` catches all exceptions and returns only `str(exc)` to the model, with no `logger.exception()` and no re-raise. This removes all diagnostics from the logs, making agent failure debugging extremely difficult. No fix PR is listed yet.

- **Medium: #7571 — "Always forgets": memory/path constraints not honored**  
  [Issue #7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)  
  User on Windows 2.2.0 reports repeated failure to remember workspace/path rules in plugin development workflows — e.g., target files are written to wrong directories and deployment scripts later overwrite the wrong source tree. May involve memory-persistence or path-policy handling rather than a simple code crash.

- **Closed/Resolved: #7474 — Custom provider load failure**  
  [Issue #7474](https://github.com/agentscope-ai/QwenPaw/issues/7474)  
  Closed. Related to the `ModelInfo.max_tokens` migration.

- **Closed/Resolved: #7574 — img-gen skill omits model field, fallback to dall-e-2**  
  [Issue #7574](https://github.com/agentscope-ai/QwenPaw/issues/7574)  
  Closed. API request body in `openai_images.py` omitted the model name, triggering HTTP 503 fallback.

- **Closed/Resolved: #7575 — img-gen skill edit() always sends response_format**  
  [Issue #7575](https://github.com/agentscope-ai/QwenPaw/issues/7575)  
  Closed. Unconditional `response_format` caused HTTP 400 on `gpt-image-2` edit endpoint.

No fix PRs in the current PR list are linked directly to the open bugs, but the three closed issues suggest maintainers are actively resolving image-gen and provider compatibility regressions.

## 6. Feature Requests & Roadmap Signals

Strong roadmap signals visible in this dataset:

- **QwenPaw Hub / multi-tenancy (#7318)**  
  Already announced for 2.2.0. Community input emphasizes multi-user access, admin-managed skills, and team deployment. This is the clearest next-version feature.

- **Skills versioning and dependency metadata (#7557)**  
  [Issue #7557](https://github.com/agentscope-ai/QwenPaw/issues/7557)  
  Request for `skill_pool` to support versions, dependencies, and workspace-level revision tracking. With the Make Skill v2 PR (#7509), skill tooling is already evolving; version metadata is a plausible near-term addition.

- **Web UI "Edit last message" and "Rewind" controls (#7573)**  
  [Issue #7573](https://github.com/agentscope-ai/QwenPaw/issues/7573)  
  Users want to correct or roll back conversation turns without restarting. This is a core UX enhancement likely to pair well with existing conversation management.

- **Feishu streaming cards: auto-collapse thinking blocks (#7570)**  
  [Issue #7570](https://github.com/agentscope-ai/QwenPaw/issues/7570)  
  Provides a working local patch using JSON 2.0 collapsible panels. Since it is a self-contained UI optimization for Feishu, it may be small enough to merge soon.

- **Advisor Mode (#7569)**  
  The open PR suggests loop modes are becoming a structural part of the chat experience. If merged, it will enable a two-model architecture for cost-sensitive users.

- **MCP tool call timeout (#6874)**  
  Long-pending but practically important for integrations. It configures client-side deadlines and should be expected in a future MCP-focused release.

## 7. User Feedback Summary

Real user pain points expressed today:

- **Breaking changes can break custom configurations**  
  The #7474 custom provider issue shows that migrations like `ModelInfo.max_tokens` → `max_output_length` must be carefully applied to user-defined provider files. The issue is closed, but the underlying concern about compatibility is valid.

- **Image generation skill regressions are frustrating**  
  The two closed img-gen issues (#7574, #7575) both involve simple API contract errors that caused silent fallback or HTTP 400 responses. Users expect generated images to use the configured model, not fall back to `dall-e-2`.

- **Agent memory still fails in realistic workflows**  
  #7571 describes an agent that "always forgets" constraints about where it should write TODO files and which directory is the source of truth. This is not a trivial request — the user is doing plugin development with multiple workspace paths and needs reliable boundary enforcement.

- **Debugging agent errors is too hard**  
  #7572 is a maintainability complaint: tool-dispatch exceptions vanish without logs. Users are unable to tell whether the agent, a plugin, or the framework caused a failure.

- **Collaborative/team use is a growing demand**  
  #7318's volume strongly indicates that users are ready for a team/multi-tenant Hub. The issue references earlier requests for multi-user access and admin-managed skills, so this is an anticipated, community-validated direction.

## 8. Backlog Watch

Items that need maintainer attention:

- **#6874 — MCP tool call timeout PR**  
  [PR #6874](https://github.com/agentscope-ai/QwenPaw/pull/6874)  
  Open since 2026-08-10 and still "Under Review" after about 27 days. It is a concrete, user-facing feature that has received no visible merge progress. Needs maintainer decision or feedback.

- **#7318 — QwenPaw Hub roadmap discussion**  
  [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)  
  With 23 comments and high community investment, this issue needs an official maintainer reply or roadmap checklist. If 2.2.0 is close, the community will want commitments on which Hub features ship first.

- **#7557 — Skill version/dependency metadata**  
  [Issue #7557](https://github.com/agentscope-ai/QwenPaw/issues/7557)  
  Only 2 comments so far, but it describes a real operational gap for multi-agent/multi-workspace skill fleets. It could become a bigger request if more fleet operators arrive with QwenPaw Hub.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-06

## 1. Today's Overview

ZeroClaw is in a high-velocity stabilization-and-architecture phase following the **v0.8.5** release (454 commits, 73 contributors). In the last 24 hours the project touched **42 issues** (34 open, 8 closed) and **50 PRs** (40 open, 10 merged/closed), indicating strong sustained contribution volume. The open queue is split between heavyweight architecture RFCs — session ownership ([#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)), file/attachment architecture ([#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)), granular sandbox policy ([#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)) — and a broad incoming wave of channel/provider capabilities targeting Telegram, Matrix, Mattermost, Gemini, and Anthropic. The current bottleneck is maintainer review and contributor follow-through rather than contribution volume: several RFCs remain in `needs-maintainer-review` limbo, while a cluster of large older PRs is marked `blocked` / `do-not-merge` or `needs-author-action`. Overall project health is good, with the release train moving, but the decision queue is clearly stretched.

## 2. Releases

**[v0.8.5](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.5)** — "Security, connectivity, and operator-experience release spanning **454 commits** from **73 contributors**."

- Introduces **ZeroRelay** and **ZeroRouter**.
- Expands live chat and provider capabilities.
- Hardens plugin, sandbox, webhook, credential, and file boundaries.

The description captured in the data is truncated, so no explicit breaking-change or migration notes are available for this digest. Given the breadth (454 commits across security boundaries and connectivity), operators should review the full release notes before upgrading. The finite weekly stabilization tracker ([#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)) and closed CI-validation issue ([#10048](https://github.com/zeroclaw-labs/zeroclaw/issues/10048)) confirm this was the culmination of the v0.8.5 stabilization line.

## 3. Project Progress

Notable PRs that moved to **merged/closed** in the reporting window:

- **[#10088 — fix(multimodal): preserve attached images after source removal](https://github.com/zeroclaw-labs/zeroclaw/pull/10088)** — Persists image attachment markers against content-addressed workspace copies so later turns no longer depend on the original file; also bounds repeated missing-image warnings. Resolves the long-running issue [#10045](https://github.com/zeroclaw-labs/zeroclaw/issues/10045).
- **[#10435 — fix(providers): preserve model context when anchoring Gemini requests](https://github.com/zeroclaw-labs/zeroclaw/pull/10435)** — Small, focused bugfix closing out a Gemini request-shape correctness issue.
- **[#10064 — fix(channels/telegram): self-destruct approval cards after an operator tap](https://github.com/zeroclaw-labs/zeroclaw/pull/10064)** — Large (XL) Telegram fix: approval cards now resolve the oneshot, dismiss the inline spinner, and rewrite the prompt on tap, preventing stale-interaction bugs.

Closed issues advancing stability and release readiness:

- [#9593](https://github.com/zeroclaw-labs/zeroclaw/issues/9593) — Runtime refactor making `TaskRecord` the single lifecycle owner for background delegation (closed).
- [#7910](https://github.com/zeroclaw-labs/zeroclaw/issues/7910) — Windows self-update swap/rollback/sidecar test-coverage follow-up (closed).
- [#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911) — `install.sh` Android/Termux generic-Linux-binary bug (closed).
- [#10282](https://github.com/zeroclaw-labs/zeroclaw/issues/10282) — Hardware `probe` feature now correctly reaches tool implementations (closed).

## 4. Community Hot Topics

The most-active discussions are all architecture-level and remain unresolved:

- **[#9487 — RFC: Runtime-owned conversation sessions and transport surface adapters](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** — 33 comments; Revision 5 materially replaced the Revision 4 vote snapshot, meaning maintainers must open a new discussion window before re-voting.
- **[#9488 — RFC: Unified file and attachment architecture](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** — 26 comments; Revision 10 similarly invalidated the previous vote snapshot.
- **[#6808 — RFC: Work Lanes, Board Automation, Label Cleanup](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)** — 24 comments; governance RFC now ratified/rolling out through Rev 26.
- **[#6996 — RFC: Granular sandbox policy — filesystem restrictions](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — 24 comments; addresses drift between application-layer path admission and OS sandbox backends (Bubblewrap/Landlock/Seatbelt).
- **[#8692 — Tracker: Maintainer decision queue](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 15 comments; the central queue for RFC acceptance, deferral, and split follow-ups.
- **[#10050 — RFC: Verbatim channel send over the gateway](https://github.com/zeroclaw-labs/zeroclaw/issues/10050)** — 14 comments; notes the gateway now mounts **47 distinct `/api/*` paths**, but none of them supports operator-supplied verbatim channel sends.
- **[#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822) / [#9975](https://github.com/zeroclaw-labs/zeroclaw/issues/9975) / [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)** — 13 / 13 / 9 comments: WASM plugin observer subscriptions, `web_dist_dir` daemon compatibility contract, and composable WASM runtime architecture.

**Underlying need:** the community is actively converging the core data-plane architecture (session ownership, file model, event history) before stacking more channels and tools on top. The recurring "Revision N replaces Revision N-1 vote snapshot" pattern also shows real democratic-process friction, which is itself being addressed by RFC-process reform ([#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)).

## 5. Bugs & Stability

Bugs active in the last 24 hours, ranked by severity:

- **[S1 — #10536: macOS Seatbelt ignores configured `allowed_roots` for shell commands](https://github.com/zeroclaw-labs/zeroclaw/issues/10536)** — P1, `in-progress`, workflow-blocked. App-level security policy recognizes `allowed_roots` but shell commands still get `Operation not permitted`. **No fix PR yet.**

- **[P1 — #10533: `model_routing_config` rejects `custom.*` provider slots](https://github.com/zeroclaw-labs/zeroclaw/issues/10533)** — Tool-side validation diverges from the config schema, blocking fully-supported custom providers (e.g., `custom.truefoundry`). `in-progress`.

- **[P2/High — #10534: bounded delegates silently strip the `delegate` tool](https://github.com/zeroclaw-labs/zeroclaw/issues/10534)** — Contradicts `delegation_policy` / `max_delegation_depth` configuration; silent capability removal.

- **[S2 — #10625: internal `[media attachment]` placeholder delivered to users on non-vision models](https://github.com/zeroclaw-labs/zeroclaw/issues/10625)** — User-visible internal marker leakage on the degradation path.

- **[S2 — #10626: TTS synthesizes Markdown and emoji verbatim](https://github.com/zeroclaw-labs/zeroclaw/issues/10626)** — Spoken replies read markup and emoji names aloud on self-hosted deployments.

- **[S2 — #10532: degraded-config remediation can invoke a different binary than the running daemon](https://github.com/zeroclaw-labs/zeroclaw/issues/10532)** — **Fix PR exists: [#10630](https://github.com/zeroclaw-labs/zeroclaw/pull/10630)** now binds remediation warnings to the running executable.

- **[S3 — #10585: new log-sink test regresses migration tests under parallel runner](https://github.com/zeroclaw-labs/zeroclaw/issues/10585)** — Global tracing lock contention; test-infrastructure only.

Good news on the stability front: the multimodal source-path bug ([#10045](https://github.com/zeroclaw-labs/zeroclaw/issues/10045), fixed via [#10088](https://github.com/zeroclaw-labs/zeroclaw/pull/10088)), the Android/Termux installer issue ([#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911)), and the hardware-probe reachability bug ([#10282](https://github.com/zeroclaw-labs/zeroclaw/issues/10282)) were all resolved.

## 6. Feature Requests & Roadmap Signals

**Likely candidates for the next release (v0.8.6)** — accepted/in-progress work currently open on `master`:

- **[#10450 — Stream webhook chat turns over SSE](https://github.com/zeroclaw-labs/zeroclaw/pull/10450)** — Opt-in `stream: true` + `Accept: text/event-stream` support on `POST /webhook`.
- **[#10411 — Serialize same-session channel messages](https://github.com/zeroclaw-labs/zeroclaw/pull/10411)** — Prevents concurrent runs in one conversation session; important correctness UX.
- **[#9320 — Wall-clock timeout for cron agent job runs](https://github.com/zeroclaw-labs/zeroclaw/pull/9320)** — Binds runs to `agentic_timeout_secs` and releases locks.
- **[#10407 — Persistent session prompt attachments](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)** — SQLite-backed durable prompt attachments per chat session.

**Community feature requests:**

- **[#10641 — Per-field cron schedule input in the Web UI](https://github.com/zeroclaw-labs/zeroclaw/issues/10641)** — Filed Sep 5; replaces freeform cron text with validated per-field input. Low-cost, high-value UX improvement likely to ship quickly.
- **[#10530 — Anthropic extended-thinking passthrough over OpenAI-compatible gateways](https://github.com/zeroclaw-labs/zeroclaw/issues/10530)** — Addresses silent unavailability of extended thinking on LiteLLM/TrueFoundry/proxy paths.

**Architecture signals:** accepted RFCs waiting on implementation include verbatim channel sends ([#10050](https://github.com/zeroclaw-labs/zeroclaw/issues/10050)), WASM plugin observer subscriptions ([#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822)), web-bundle/daemon compatibility ([#9975](https://github.com/zeroclaw-labs/zeroclaw/issues/9975)), and single-tool provider rounds ([#10222](https://github.com/zeroclaw-labs/zeroclaw/issues/10222)). The bigger strategic arc is **append-only session event history with deterministic replay** ([#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)), which is now the exclusive authority for event vocabulary and will likely reshape the runtime in v0.9.

## 7. User Feedback Summary

Real user pain points visible in the data:

- **Android/Termux adoption was blocked** by a buggy installer binary selection ([#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911)) — now closed, removing a barrier for mobile/on-device users.
- **Telegram group collaboration is a hot use case but under-served**: users want per-user sessions ([#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772)), passive group context ([#10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640)), and a secure model picker ([#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)).
- **Voice/TTS users are actively deploying TTS** but hitting quality issues — Markdown/emoji being read aloud ([#10626](https://github.com/zeroclaw-labs/zeroclaw/issues/10626)) and Matrix voice being silently unsupported with no diagnostic ([#10489](https://github.com/zeroclaw-labs/zeroclaw/pull/10489)).
- **Cron power-users want guardrails**: raw freeform expressions without validation cause friction ([#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641)).
- **Sandbox policy inconsistency undermines trust in security guarantees**: macOS `allowed_roots` ignored ([#10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536)) and filesystem-policy drift across layers ([#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)).

Satisfaction signals are indirect but positive: large community participation in RFC revisions, first-party maintainer takeovers of contributor PRs (e.g., [#10435](https://github.com/zeroclaw-labs/zeroclaw/pull/10435)), and an active governance overhaul show a contributor base that is engaged and willing to invest in process.

## 8. Backlog Watch

Items needing maintainer attention or showing age risk:

**RFCs in `needs-maintainer-review` (longest-running first):**

- [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) — Granular sandbox policy, open since **May 28**.
- [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — Runtime-owned sessions, open since **Jul 28**, now on Revision 5.
- [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — Unified file/attachment architecture, open since **Jul 28**, Revision 10.
- [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) — Composable WASM plugin runtime, open since **Aug 18**.
- [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) — Session event history / replay authority, open since **Sep 1**.
- [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC-process simplification, open since **Sep 2**.

**Blocked / `do-not-merge` PRs** waiting on maintainer decisions or dependency resolution:

- [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) — Anthropic stored OAuth profiles (open since **Jul 26**).
- [#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772) — Telegram `per_user_session` toggle (open since **Aug 5**).
- [#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997) — Telegram secure model picker (open since **Aug 14**).
- [#10356](https://github.com/zeroclaw-labs/zeroclaw/pull/10356) — AnySearch web-search provider (open since **Aug 25**).
- [#10358](https://github.com/zeroclaw-labs/zeroclaw/pull/10358) — Mattermost approval prompts (open since **Aug 25**).

**Older large PRs in `needs-author-action`:** [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447) (Anthropic incomplete terminal responses, since Jul 27), [#9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320) and [#9272](https://github.com/zeroclaw-labs/zeroclaw/pull/9272) (both since Jul 23), plus [#10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401), [#10411](https://github.com/zeroclaw-labs/zeroclaw/pull/10411), [#10450](https://github.com/zeroclaw-labs/zeroclaw/pull/10450), and [#10630](https://github.com/zeroclaw-labs/zeroclaw/pull/10630) awaiting author revisions. If authors do not respond, maintainers may need to close-and-reopen or reassign to keep the queue moving.

The **maintainer decision queue tracker ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692))** remains the canonical place to monitor all of the above; it is itself updated daily and currently lists 15+ items requiring code-owner attention.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*