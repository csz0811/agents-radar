# OpenClaw Ecosystem Digest 2026-09-12

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-12 00:36 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-12

**Data snapshot:** 500 issues updated in last 24h (271 open/active, 229 closed); 500 PRs updated in last 24h (274 open, 226 merged/closed); 1 new release. PR comment counts were not provided in the dataset, so PR hot topics below are selected by recency, severity, and maintainer readiness rather than comment volume.

## 1. Today's Overview

OpenClaw remains a high-throughput project: nearly half of all updated issues and PRs were closed or merged in the last 24 hours, indicating strong triage and maintainer activity. However, the dominant theme is stability around the 2026.9.x update and migration path, especially rollback safety, handoff leases, Doctor migrations, session transcript reconciliation, and Gateway event-loop blocking. The new release, [v2026.9.4](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4), improves recovery from compatible failed updates, but immediate follow-up reports show release-blocking edge cases remain, including [Issue #144742](https://github.com/openclaw/openclaw/issues/144742) and [Issue #145192](https://github.com/openclaw/openclaw/issues/145192). Overall health is mixed-positive: maintainers are actively fixing and closing high-impact bugs, but the project is carrying significant release-engineering and session-state risk.

## 2. Releases

### v2026.9.4
- **Release link:** [openclaw/openclaw v2026.9.4](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4)
- **Highlight:** Recovers from compatible failed updates by retaining the previous package and restoring it with the previous configuration and service when schema and configuration checks prove rollback is safe. Database migrations still require a verified pre-update backup. Reference: `#140339`.
- **Breaking changes:** None explicitly listed in the provided release snippet.
- **Migration notes:** Rollback is only considered safe for compatible failures after schema/config checks. Database migrations are excluded unless a verified pre-update backup exists.
- **Observed release risks:**
  - [Issue #144742](https://github.com/openclaw/openclaw/issues/144742) — `2026.9.4` reportedly ships without `#144208`; a retained version-1 handoff lease row can fail every config write.
  - [Issue #145192](https://github.com/openclaw/openclaw/issues/145192) — `2026.9.2 → 2026.9.4` managed update fails at candidate-Doctor on a live v1 handoff lease, then rolls back onto migrated state.
  - [Issue #144712](https://github.com/openclaw/openclaw/issues/144712) — closed: npm update failed at “global install swap”; intact rollback was erroneously reported as “recovery is unverified.”

## 3. Project Progress

- **Throughput:** 226 PRs merged/closed and 229 issues closed in the last 24h, suggesting strong maintenance velocity despite a large open queue.
- **Closed PR highlights:**
  - [PR #145376](https://github.com/openclaw/openclaw/pull/145376) — Doctor now continues past skipped legacy audit-log recovery instead of stopping as a refusal.
  - [PR #145441](https://github.com/openclaw/openclaw/pull/145441) — Keeps session test typechecks below the shard limit, fixing a CI boundary failure.
- **Closed issue highlights indicating fixes/cleanup:**
  - [Issue #144712](https://github.com/openclaw/openclaw/issues/144712) — npm update rollback failure closed.
  - [Issue #140908](https://github.com/openclaw/openclaw/issues/140908) — Doctor/gateway status EACCES under systemd user service closed.
  - [Issue #137377](https://github.com/openclaw/openclaw/issues/137377) — Windows Doctor final restart failure closed.
  - [Issue #140971](https://github.com/openclaw/openclaw/issues/140971) — Feishu plugin tools silently dropped in message-driven runs closed.
  - [Issue #140821](https://github.com/openclaw/openclaw/issues/140821) — Gateway restart hang after `2026.9.2` closed.
  - [Issue #49876](https://github.com/openclaw/openclaw/issues/49876) — Cron sessions delivering hallucinated output on tool failure closed.
- **Open PRs advancing likely next fixes/features:**
  - [PR #145430](https://github.com/openclaw/openclaw/pull/145430) — keep route-only code out of startup bundle.
  - [PR #145282](https://github.com/openclaw/openclaw/pull/145282) — preserve macOS launcher permissions during updates.
  - [PR #144954](https://github.com/openclaw/openclaw/pull/144954) — load manual personal skills with workspace-only reads.
  - [PR #145439](https://github.com/openclaw/openclaw/pull/145439) — index thinking lookups per model catalog request.
  - [PR #145382](https://github.com/openclaw/openclaw/pull/145382) — support public `gpt-live-1` voice sessions.
  - [PR #145415](https://github.com/openclaw/openclaw/pull/145415) — show package icons instead of generated plugin artwork.

## 4. Community Hot Topics

### Most active issues
- [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) — 17 comments. Synchronous agent persistence and transcript maintenance block the Gateway event loop at scale. **Need:** async/scalable persistence architecture.
- [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) — 15 comments. Unreaped hook/tool child processes cause zombie accumulation and runtime degradation. **Need:** robust child-process lifecycle management.
- [Issue #96834](https://github.com/openclaw/openclaw/issues/96834) — 15 comments. WhatsApp 1:1 inbound image wedges the main lane for ~3 minutes before processing. **Need:** multimodal queueing and session-state fixes.
- [Issue #140620](https://github.com/openclaw/openclaw/issues/140620) — 12 comments. In-place upgrade transcript reconciliation imports some sessions then stalls; pre-upgrade sessions become unfindable. **Need:** reliable transcript migration/search.
- [Issue #144712](https://github.com/openclaw/openclaw/issues/144712) — 12 comments, closed. npm update fails at global install swap while rollback reports unverified recovery. **Need:** safer update rollback reporting.
- [Issue #127148](https://github.com/openclaw/openclaw/issues/127148) — 12 comments. Codex `sessions.compact` acquires a second app-server and hits active-writer conflict. **Need:** correct session ownership/compaction.
- [Issue #142585](https://github.com/openclaw/openclaw/issues/142585) — 12 comments. Doctor refuses valid legacy workspace setup and attestation import. **Need:** migration compatibility with legacy state.
- [Issue #49876](https://github.com/openclaw/openclaw/issues/49876) — 12 comments, closed. Cron sessions deliver hallucinated output instead of failing cleanly when tool calls fail. **Need:** trust/safety behavior on tool failure.
- [Issue #40786](https://github.com/openclaw/openclaw/issues/40786) — 12 comments. Add `.gitignore`-like exclude patterns to backup CLI. **Need:** backup size control and sensitive-file exclusion.

### Active PRs worth watching
- [PR #136687](https://github.com/openclaw/openclaw/pull/136687) — saved gateway account switching; flagged compatibility/security risk.
- [PR #145282](https://github.com/openclaw/openclaw/pull/145282) — macOS launcher permission preservation during updates.
- [PR #144954](https://github.com/openclaw/openclaw/pull/144954) — manual personal skills under workspace-only reads.
- [PR #145382](https://github.com/openclaw/openclaw/pull/145382) — public GPT-Live-1 voice sessions.
- [PR #145190](https://github.com/openclaw/openclaw/pull/145190) — discover account models after sign-in.
- [PR #144169](https://github.com/openclaw/openclaw/pull/144169) — apply session-sharing predicate to read-by-key RPCs.
- [PR #145444](https://github.com/openclaw/openclaw/pull/145444) — recover the reply owner named by the session key.

**Underlying needs:** Users and maintainers are converging on update reliability, session-state integrity, Gateway performance under scale, safer plugin/sandbox boundaries, and clearer recovery paths when migrations or channel deliveries fail.

## 5. Bugs & Stability

### P0 / release-blocking
- [Issue #144742](https://github.com/openclaw/openclaw/issues/144742) — `2026.9.4` missing `#144208`; retained v1 handoff lease row fails every config write. **Release blocker.**
- [Issue #145192](https://github.com/openclaw/openclaw/issues/145192) — `2026.9.2 → 2026.9.4` managed update fails at candidate-Doctor, then rolls back onto migrated state.
- [Issue #140620](https://github.com/openclaw/openclaw/issues/140620) — upgrade transcript reconciliation stalls; pre-upgrade sessions unfindable.
- [Issue #142585](https://github.com/openclaw/openclaw/issues/142585) — Doctor refuses valid legacy workspace setup and attestation import.
- [Issue #136203](https://github.com/openclaw/openclaw/issues/136203) — Windows de-DE upgrade leaves Doctor maintenance blocked; fix shape clear/queueable.
- [Issue #135776](https://github.com/openclaw/openclaw/issues/135776) — `openclaw update` leaves exact-pinned official channel plugins on previous release.
- [Issue #125333](https://github.com/openclaw/openclaw/issues/125333) — `totalTokens` inflation still reproduces on `2026.8.1-beta.2`.
- [Issue #123326](https://github.com/openclaw/openclaw/issues/123326) — explicit multi-agent Codex migration crash-loops Gateway startup.
- [Issue #142394](https://github.com/openclaw/openclaw/issues/142394) — `update.run` to `2026.9.3` causes EPIPE during shutdown and no auto-restart.
- [Issue #144678](https://github.com/openclaw/openclaw/issues/144678) — iOS manual Gateway host schemes silently disable Connect.

### P1 / crash-loop, message loss, session-state corruption
- [Issue #144911](https://github.com/openclaw/openclaw/issues/144911) — stdio MCP server init timeout crashes Gateway via unhandled rejection. Fix shape clear/queueable.
- [Issue #142476](https://github.com/openclaw/openclaw/issues/142476) — cron session reaper opens every agent DB with synchronous `PRAGMA integrity_check`, blocking event loop 14–76s. Fix shape clear/queueable.
- [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) — synchronous persistence blocks Gateway event loop at scale.
- [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) — unreaped hook/tool child processes cause zombie accumulation.
- [Issue #96834](https://github.com/openclaw/openclaw/issues/96834) — WhatsApp image wedges main lane ~3 min before processing.
- [Issue #127148](https://github.com/openclaw/openclaw/issues/127148) — Codex `sessions.compact` hits active-writer conflict.
- [Issue #141252](https://github.com/openclaw/openclaw/issues/141252) and [Issue #139847](https://github.com/openclaw/openclaw/issues/139847) — `2026.9.2` regression: reply runs fail with “no active tool authority snapshot”; messages dropped. Fix shape clear/queueable.
- [Issue #126246](https://github.com/openclaw/openclaw/issues/126246) — Telegram durable outbound deliveries stuck in `send_attempt_started`.
- [Issue #144809](https://github.com/openclaw/openclaw/issues/144809) — claude-cli turns longer than `RUN_STALE_TAKEOVER_MS` lose generated replies.
- [Issue #145266](https://github.com/openclaw/openclaw/issues/145266) — Git/dev Doctor refreshes Codex from npm and shadows rebuilt bundled plugin.
- [Issue #137294](https://github.com/openclaw/openclaw/issues/137294) — preflight compaction aborted by shorter ingress adoption watchdog. Fix shape clear/queueable.
- [Issue #121187](https://github.com/openclaw/openclaw/issues/121187) — yielded requester completion retries intentional `NO_REPLY`.

### Fixed/closed today
- [Issue #144712](https://github.com/openclaw/openclaw/issues/144712) — npm update rollback failure closed.
- [Issue #144581](https://github.com/openclaw/openclaw/issues/144581) — Windows update malformed canary path closed.
- [Issue #140908](https://github.com/openclaw/openclaw/issues/140908) — Doctor/gateway EACCES under systemd user service closed.
- [Issue #137377](https://github.com/openclaw/openclaw/issues/137377) — Windows Doctor final restart failure closed.
- [Issue #140821](https://github.com/openclaw/openclaw/issues/140821) — Gateway restart hang after `2026.9.2` closed.
- [Issue #140971](https://github.com/openclaw/openclaw/issues/140971) — Feishu plugin tools dropped closed.
- [Issue #49876](https://github.com/openclaw/openclaw/issues/49876) — Cron hallucinated output on tool failure closed.

## 6. Feature Requests & Roadmap Signals

- [Issue #40786](https://github.com/openclaw/openclaw/issues/40786) — `.gitignore`-like exclude patterns for backup CLI. Strong privacy/size need; still open and needing product/security review.
- [Issue #93120](https://github.com/openclaw/openclaw/issues/93120) — configurable Gemini TPM/RPM rate-limit retry behavior.
- [Issue #132601](https://github.com/openclaw/openclaw/issues/132601) — clarify safe generated-video URL materialization in plugin SDK docs.
- [Issue #124759](https://github.com/openclaw/openclaw/issues/124759) — iOS app lag when “show reasoning and tool activity” is enabled.
- Closed but signal-bearing: [Issue #9016](https://github.com/openclaw/openclaw/issues/9016) OpenRouter cost exposure, [Issue #79168](https://github.com/openclaw/openclaw/issues/79168) content-based prompt-injection scanning, [Issue #117703](https://github.com/openclaw/openclaw/issues/117703) persistent failed-tool logs, [Issue #92367](https://github.com/openclaw/openclaw/issues/92367) scope-bound gateway auth tokens.
- Likely next-version candidates from active PRs: safer update rollback and macOS permissions ([PR #145282](https://github.com/openclaw/openclaw/pull/145282)), GPT-Live-1 voice support ([PR #145382](https://github.com/openclaw/openclaw/pull/145382)), model discovery after sign-in ([PR #145190](https://github.com/openclaw/openclaw/pull/145190)), Control UI startup stability ([PR #145430](https://github.com/openclaw/openclaw/pull/145430)), LaTeX rendering ([PR #144324](https://github.com/openclaw/openclaw/pull/144324)), and dashboard child-session pinning ([PR #143719](https://github.com/openclaw/openclaw/pull/143719)).

**Prediction:** The next release is likely a stabilization patch focused on update/rollback, Doctor/migration compatibility, Gateway event-loop performance, session transcript recovery, and Control UI/startup reliability. Feature work such as GPT-Live-1 voice, saved gateway account switching, and richer UI rendering may land if compatibility/security proof is completed.

## 7. User Feedback Summary

Users are reporting repeated pain around upgrades: npm/global install swaps, Windows and macOS updater failures, systemd user-service permission checks, plugin/core version skew, and Doctor migrations refusing valid legacy state. Session-state issues are also prominent: transcripts becoming unfindable, replies being dropped, long claude-cli turns losing output, Telegram/WhatsApp delivery wedges, and Codex session compaction conflicts. At scale, users report Gateway event-loop stalls, synchronous DB/PRAGMA work, and zombie child-process accumulation. Security and privacy requests remain visible: prompt-injection scanning, backup exclude patterns, scoped gateway tokens, and safer plugin-generated media handling. Satisfaction signal is mixed: maintainers are closing many high-comment bugs and queueing fixes, but frequent release-blocker regressions around `2026.9.x` are eroding confidence in update safety.

## 8. Backlog Watch

- [Issue #40786](https://github.com/openclaw/openclaw/issues/40786) — backup exclude patterns, created 2026-03-09; P2, needs product/security decision.
- [Issue #96834](https://github.com/openclaw/openclaw/issues/96834) — WhatsApp image lane wedge, created 2026-06-25; P1, 15 comments.
- [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) — zombie child processes, created 2026-06-29; P1, 15 comments.
- [Issue #94716](https://github.com/openclaw/openclaw/issues/94716) — Anthropic claude-cli stale user-agent bearer auth, created 2026-06-19; P1, linked PR open.
- [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) — synchronous agent persistence blocks Gateway event loop, created 2026-08-05; P1, 17 comments.
- [Issue #123326](https://github.com/openclaw/openclaw/issues/123326) — multi-agent Codex migration crash-loop, created 2026-08-13; P0.
- [Issue #125333](https://github.com/openclaw/openclaw/issues/125333) — `totalTokens` inflation, created 2026-08-17; P0, linked PR open.
- [Issue #126246](https://github.com/openclaw/openclaw/issues/126246) — Telegram outbound deliveries stuck, created 2026-08-19; P1.
- [Issue #127148](https://github.com/openclaw/openclaw/issues/127148) — Codex `sessions.compact` active-writer conflict, created 2026-08-21; P1.
- [Issue #135776](https://github.com/openclaw/openclaw/issues/135776) — plugin/core version skew on update, created 2026-09-02; P0.
- [Issue #136203](https://github.com/openclaw/openclaw/issues/136203) — Windows Doctor blocked after upgrade, created 2026-09-02; P0, queueable fix.
- [Issue #137294](https://github.com/openclaw/openclaw/issues/137294) — preflight compaction aborted by ingress watchdog, created 2026-09-03; P1, queueable fix.
- [PR #120781](https://github.com/openclaw/openclaw/pull/120781) — recover omitted historical transcripts in Doctor, created 2026-08-08; P1, needs proof.
- [PR #127983](https://github.com/openclaw/openclaw/pull/127983) — refuse config auto-restore when clobbered snapshot cannot be written, created 2026-08-22; P1, waiting on author.
- [PR #136687](https://github.com/openclaw/openclaw/pull/136687) — saved gateway account switching, created 2026-09-02; P2, compatibility/security proof needed.
- [PR #144169](https://github.com/openclaw/openclaw/pull/144169) — session read-by-key sharing predicate, created 2026-09-10; security-boundary relevant.
- [PR #145190](https://github.com/openclaw/openclaw/pull/145190) — model discovery after sign-in, created 2026-09-11; P2, waiting on author.

---

## Cross-Ecosystem Comparison

# Cross-Project Comparison Report — Personal AI Assistant / Agent OSS Ecosystem
**Snapshot date:** 2026-09-12 | **Projects:** OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. Ecosystem Overview

The personal AI assistant / agent open-source landscape is stratifying into three layers: a hyper-scale reference implementation (OpenClaw) with an order-of-magnitude larger activity surface than any peer; a middle tier of high-velocity, opinionated agents (Hermes Agent, ZeroClaw) competing on profile isolation, identity, and provider reliability; and a fast-growing product-tier cohort (QwenPaw) pushing desktop/mobile UX and multi-tenant team editions. The unifying theme across all active projects in this snapshot is no longer raw capability, but **operational trust**: safe updates and rollback, session/state integrity under concurrency, credential and profile scoping, prompt-cache correctness, and explicit failure surfacing. Meanwhile, governance and review latency have become the binding constraint at the high-activity end — ZeroClaw merged 3 of 50 updated PRs, and OpenClaw carries multiple P0 release blockers despite 226 closures in 24h. The market is converging on a common functional baseline (multi-channel, MCP, skills, subagents, memory), so differentiation is shifting to **reliability engineering, isolation guarantees, and deployment ergonomics**.

---

## 2. Activity Comparison

*Health score is an analyst composite (0–10) derived from triage throughput, release cadence, open-risk severity, and maintainer responsiveness; it is not a project-published metric.*

| Project | Issues updated (24h) | PRs updated (24h) | Release status | Est. health |
|---|---|---|---|---|
| **OpenClaw** | 500 (271 open / 229 closed) | 500 (274 open / 226 merged) | **v2026.9.4** shipped, with open P0 follow-ups | **7.0** — mixed-positive; strong triage, release-engineering risk |
| **Hermes Agent** | 50 (18 closed) | 50 (8 merged/closed) | **v2026.9.11 / v0.21.2** hotfix | **6.5** — responsive; P1 `state.db` corruption open |
| **IronClaw** | 0 | 1 (open, 0 merged) | None | **N/A** — insufficient data; dormant |
| **QwenPaw** | 21 (~6 resolved) | 41 (18 landed/closed) | **v2.2.1 Stable** promoted | **7.0** — healthy throughput; core runtime bugs open |
| **ZeroClaw** | 50 (39 open / 11 closed) | 50 (47 open / 3 merged) | None | **6.0** — high activity, review-bound (94% PRs still open) |

**Reading the table:** OpenClaw's closure ratios (~46% issues, ~45% PRs) indicate genuine triage velocity at scale. QwenPaw's ~44% PR closure ratio with a stable release is the strongest ship-per-merge signal. ZeroClaw's imbalance (47/50 PRs open) and Hermes' low merge ratio (8/50) both point to **review bandwidth**, not contributor supply, as the bottleneck.

---

## 3. OpenClaw's Position

**Advantages vs peers**
- **Scale:** ~10× OpenClaw's nearest peer on both issues and PRs per day (500 vs 50). This yields faster bug discovery and a wider fix funnel.
- **Channel breadth:** WhatsApp, Telegram, Feishu, Slack-adjacent surfaces, iOS, voice (`gpt-live-1`), and plugin tooling — broader than Hermes (dashboard/desktop), IronClaw (Slack-centric), QwenPaw (console/Telegram), or ZeroClaw (Telegram/ZeroCode/ACP).
- **Release engineering maturity:** Only project in the set with a documented, safety-gated rollback path ([v2026.9.4](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4)) — schema/config verification and backup-gated DB migration. This is a genuine differentiator.

**Technical approach differences**
- Node/npm distribution with global install swap, macOS launcher permissions, systemd user-service integration — an OS-integrated, long-running Gateway model.
- Architecture is **Gateway-centric** with an event loop, routed startup bundles ([PR #145430](https://github.com/openclaw/openclaw/pull/145430)), and multi-lane channel processing. The event loop is simultaneously its strength (unified delivery) and its systemic risk ([#119720](https://github.com/openclaw/openclaw/issues/119720), [#142476](https://github.com/openclaw/openclaw/issues/142476)).
- Contrast: Hermes uses profile-scoped multiplexing over SQLite (`state.db` WAL); ZeroClaw is a Rust binary with a `RpcDispatcher` and explicit stack-budget concerns — a lower-level, memory-sensitive design.

**Community size comparison**
OpenClaw's comment volumes (15–17 on top issues) are an order of magnitude above Hermes and ZeroClaw (5–15) and QwenPaw (3–26). Hermes holds one outlier — the Skills Hub watchdog at **199 comments** ([#66616](https://github.com/NousResearch/hermes-agent/issues/66616)) — but that is a single degraded-service thread, not sustained breadth. OpenClaw is the de facto reference implementation; the others are converging *toward* its patterns rather than defining alternatives.

**Principal risk:** release-blocking regressions inside its own 2026.9.x line ([#144742](https://github.com/openclaw/openclaw/issues/144742), [#145192](https://github.com/openclaw/openclaw/issues/145192), [#135776](https://github.com/openclaw/openclaw/issues/135776)). Scale amplifies both discovery and blast radius.

---

## 4. Shared Technical Focus Areas

| Requirement | Projects | Specific needs |
|---|---|---|
| **Session/state integrity under concurrency** | OpenClaw, Hermes, QwenPaw, ZeroClaw | Single-writer/SQLite WAL gating (Hermes [#103339](https://github.com/NousResearch/hermes-agent/issues/103339)); async persistence off the event loop (OpenClaw [#119720](https://github.com/openclaw/openclaw/issues/119720), [#142476](https://github.com/openclaw/openclaw/issues/142476)); transcript reconciliation & ghost sessions (OpenClaw [#140620](https://github.com/openclaw/openclaw/issues/140620), QwenPaw [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698)); durable history on failed turns (ZeroClaw [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)) |
| **Safe update / migration / rollback** | OpenClaw, Hermes, QwenPaw | Verified backup-gated DB migrations; retained previous package + config restore (OpenClaw); config migration on model-routing change (QwenPaw v2.2.1); hotfix cadence for regressions (Hermes v0.21.2) |
| **Multi-tenant / profile isolation & credential scoping** | Hermes, ZeroClaw, QwenPaw, OpenClaw | Profile-scoped MCP registries, secret resolution, and endpoint selection (Hermes — cluster of ~10 closures); canonical principals + principal-owned sessions (ZeroClaw OIDC, [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)); Hub admin bootstrap / multi-user (QwenPaw [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318), [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696)); session read-by-key sharing predicate (OpenClaw [PR #144169](https://github.com/openclaw/openclaw/pull/144169)) |
| **Context compaction, token accounting & cache-prefix stability** | ZeroClaw, QwenPaw, OpenClaw, Hermes | Proactive token-budget compaction ([#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780)); image/thinking-config cache-prefix invalidation ([#10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777), [#10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778), [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)); provider context-window preservation (QwenPaw [PR #7652](https://github.com/agentscope-ai/QwenPaw/pull/7652)); `totalTokens` inflation (OpenClaw [#125333](https://github.com/openclaw/openclaw/issues/125333)); tail-message token overrun (Hermes [#108647](https://github.com/NousResearch/hermes-agent/issues/108647)) |
| **Provider reliability: retries, backoff, fallback, quota** | ZeroClaw, Hermes, OpenClaw, QwenPaw | Non-streaming fallback skipped ([#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)); 529/429 backoff ([#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787), [#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)); Gemini 429 pool exhaustion (Hermes [#108656](https://github.com/NousResearch/hermes-agent/issues/108656)); Gemini TPM/RPM retry config (OpenClaw [#93120](https://github.com/openclaw/openclaw/issues/93120)); subagent model override loss (QwenPaw [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676)) |
| **Security boundaries** | ZeroClaw, OpenClaw, Hermes | OIDC stack + egress grant ceremony (ZeroClaw [PR #9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584), OIDC PR series); prompt-injection scanning, backup excludes, scoped gateway tokens (OpenClaw [#79168](https://github.com/openclaw/openclaw/issues/79168), [#40786](https://github.com/openclaw/openclaw/issues/40786), [#92367](https://github.com/openclaw/openclaw/issues/92367)); MCP credential header redaction (Hermes [PR #108695](https://github.com/NousResearch/hermes-agent/pull/108695)) |
| **Failure surfacing & cancellation semantics** | QwenPaw, ZeroClaw, OpenClaw | Stop-button does not halt execution (QwenPaw [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)); notification lag cancels running turns ([#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785)); cron hallucinations instead of clean failure (OpenClaw [#49876](https://github.com/openclaw/openclaw/issues/49876)) |

**Convergence signal:** six of seven focus areas appear in **three or more** projects. This is no longer feature competition — it is a shared reliability backlog across the ecosystem.

---

## 5. Differentiation Analysis

| Dimension | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **Primary focus** | Broad multi-channel Gateway platform | Multi-profile/multiplex correctness | Channel-state clarity (Slack) | Desktop/mobile UX + subagent orchestration | Identity/security-first agent runtime |
| **Target user** | Power self-hosters, plugin devs, multi-channel operators | Multi-profile production hosts, research (Nous) | Enterprise Slack/shared-channel deployments | Individual → team/enterprise (Hub) | Security-conscious / regulated deployments |
| **Architecture** | Node/npm, Gateway event loop, route-bundled startup | Profile-scoped multiplex over SQLite WAL | Adapter/OpenAI-compatible surface consistency | Python (AgentScope), console + Hub service | Rust, `RpcDispatcher`, ZeroCode/ACP desktop |
| **Channel surface** | WhatsApp, Telegram, Feishu, iOS, voice | Desktop/dashboard-centric | Slack + shared channels | Console, Telegram, mobile web | Telegram, ZeroCode/ACP |
| **Distinctive bet** | Rollback-safe release engineering at scale | Profile isolation as a hard boundary | Disconnect vs unpaired state UX | Per-agent model routing + multi-tenant Hub | OIDC principals + egress grants |
| **Governance** | Fast, high-volume triage | Active maintainer push, bug-cluster closures | Near-silent | Open contribution pipeline, first-time contributors | Explicit RFC/voting process with a decision queue |

**Notable architectural divergence:** QwenPaw optimizes for **user-facing configurability** (per-agent routing, model selection per subagent — [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)), while ZeroClaw optimizes for **provable boundaries** (canonical principals, principal-owned memory, root enforcement). OpenClaw occupies the middle: broad capability with safety gates retrofitted. Hermes and IronClaw are narrower — profile multiplexing and channel-state correctness respectively.

**Risk profile by design choice:** event-loop-centric designs (OpenClaw) inherit synchronous-persistence stalls; SQLite WAL designs (Hermes, partially OpenClaw) inherit multi-writer corruption; memory-tight native designs (ZeroClaw) inherit stack-budget failures ([#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)).

---

## 6. Community Momentum & Maturity

**Tier 1 — Hyper-scale (OpenClaw):** ~500 issues + 500 PRs/day. Mature triage, immature release stability. Community weight is decisive; it sets the patterns others follow.

**Tier 2 — High activity (Hermes, ZeroClaw):** 50/50 daily. Distinct profiles:
- *Hermes — actively hardening.* A single coordinated push closed ~10 profile-isolation issues in one day, plus a targeted `state.db` patch release. Maturity is rising, but the open P1 ([#103339](https://github.com/NousResearch/hermes-agent/issues/103339), 7 corruptions in 4 days) means multi-profile production is not yet safe.
- *ZeroClaw — rapidly iterating, review-bound.* Large stacked OIDC PR series, provider/context fix queue. 94% of updated PRs remain open; four backlog PRs are tagged `needs-author-action` or `do-not-merge`. Contributor energy exceeds maintainer bandwidth.

**Tier 3 — Growing product (QwenPaw):** 21 issues / 41 PRs, a promoted stable release, a 26-comment roadmap thread ([#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)), and a visible first-time-contributor pipeline. Strongest **feature velocity + ship discipline** combination in the set — but its headline v2.2.1 feature (per-agent model routing) is directly contradicted by open bugs [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) and [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678).

**Tier 4 — Dormant (IronClaw):** 0 issues, 1 open PR, no merges or releases. A single unmerged fix PR ([#8076](https://github.com/nearai/ironclaw/pull/8076)) with no visible review engagement. Cannot be assessed as healthy from this snapshot; treat as maintenance-only or stalled.

**Tiering summary:** OpenClaw = scale without stability; QwenPaw = velocity with emerging ship discipline; Hermes & ZeroClaw = hardening in progress; IronClaw = inactive.

---

## 7. Trend Signals

1. **Update safety is now a product feature, not ops hygiene.** OpenClaw's backup-gated rollback, Hermes' regression hotfix, and QwenPaw's migration verification all point to the same conclusion: for self-hosted agents, an update path that cannot prove safe rollback is a liability. *Actionable for developers:* design idempotent, reversible migrations and gate destructive schema changes on verified backups.
2. **Session/state integrity is the new battleground.** Every active project reported state-layer defects: SQLite WAL double-writer corruption, transcript reconciliation stalls, ghost sessions, event-loop-blocking synchronous persistence. *Actionable:* adopt single-writer/serialized state access and move persistence off the hot path.
3. **Multi-tenant and profile isolation are graduating from feature to security boundary.** Hermes' ~10-issue isolation cleanup, ZeroClaw's OIDC principal stack, and QwenPaw's Hub all target the same need — running multiple identities on one host without credential or session bleed. *Actionable:* scope every cache, registry, and credential lookup by principal from day one; retrofitting is expensive (Hermes' evidence).
4. **Prompt-cache correctness is a cost-control requirement.** ZeroClaw's cache-prefix invalidation cluster ([#10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777), [#10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778), [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)) and OpenClaw's token inflation show users are actively auditing spend. *Actionable:* assemble prompts append-only; treat any mutation of earlier history as a cost regression.
5. **Agent failures must surface, not hallucinate.** OpenClaw's closed cron-hallucination bug and QwenPaw's "output folded into thinking steps" ([#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709)) reveal a trust gap. *Actionable:* enforce explicit failure states on tool errors and surface cancellation truthfully.
6. **Cancellation and run control are under-specified.** QwenPaw's stop-button defect ([#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)) and ZeroClaw's cancellation-on-notification-lag ([#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785)) indicate cancellation semantics are an unsolved primitive. *Actionable:* implement cooperative cancellation with observable run state and idempotent resume.
7. **Governance latency becomes the ceiling at scale.** ZeroClaw's RFC decision queue ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692), [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)) and OpenClaw's long-lived P0 backlog show that as projects grow, review and decision throughput — not contribution volume — determines release quality. *Actionable:* invest in maintainer tooling and decision SLAs before contributor growth outpaces review.
8. **Subagent model routing is the emerging cost-optimization pattern.** QwenPaw's per-agent routing (shipped) and per-task subagent model selection ([#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)) prefigure heterogeneous model pipelines — cheap models for retrieval, strong models for reasoning. *Actionable:* make model selection a per-task parameter, not a global setting, and verify overrides survive the config pipeline.
9. **Desktop/mobile polish is now competitive ground.** QwenPaw mobile praise, Hermes desktop split-pane/localization requests, and OpenClaw iOS Connect issues all indicate users evaluate agents as products, not CLIs.

**Bottom line for decision-makers:** capability parity is arriving fast; the durable differentiators in 2026 H2 are *rollback-provable updates, provable state isolation, cost-transparent prompt assembly, and honest failure semantics*. Projects that treat these as architectural primitives — rather than follow-up bug fixes — will be the ones that survive contact with multi-profile, multi-tenant production deployments.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent Project Digest — 2026-09-12

## 1. Today's Overview

Activity remains **high**: 50 issues and 50 PRs were updated in the last 24h, with 18 issues closed and 8 PRs merged/closed. The project shipped a hotfix release, **v2026.9.11 / v0.21.2**, focused on `state.db` fragility introduced by the v0.21.0 session-store connection-handling rewrite. The dominant themes are **multiplex/profile isolation**, **state.db/WAL concurrency**, **cron reliability**, **MCP/auth hardening**, and **skills index freshness**. Maintainers are closing many profile-isolation bugs, but several P1/P2 issues remain open, especially live-WAL corruption ([#103339](https://github.com/NousResearch/hermes-agent/issues/103339)) and cron idle-exit failures ([#107485](https://github.com/NousResearch/hermes-agent/issues/107485)). Overall health: active and responsive, but multi-profile production stability is still the main risk area.

## 2. Releases

### v2026.9.11 — Hermes Agent v0.21.2 (The `state.db` Patch Release)
- **Release link:** [v2026.9.11](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.11)
- **Date:** September 11, 2026
- **What changed:** Patch release for `state.db` fragility. The release note says v0.21.0 shipped a large rewrite of the session store’s connection handling, and for some installs it made `state.db` fragile — second writers cancelling each other’s locks, healthy installs affected under concurrency.
- **Breaking changes:** None listed in the provided release excerpt.
- **Migration notes:** No explicit migration commands were included in the excerpt. Users on v0.21.0/v0.21.1, especially multi-profile or multi-gateway hosts, should upgrade and monitor [Issue #103339](https://github.com/NousResearch/hermes-agent/issues/103339), which remains open and proposes a single-writer flock gate. Related closed issue: [hosted_room_worker corrupting shared state.db](https://github.com/NousResearch/hermes-agent/issues/102120).

## 3. Project Progress

### Merged/closed PRs visible today
- [#108675](https://github.com/NousResearch/hermes-agent/pull/108675) — `fix(skills): preserve instructional results through both budgets`. Keeps complete `skill_view` results in context instead of truncating to a 1,500-character preview.
- [#94081](https://github.com/NousResearch/hermes-agent/pull/94081) — `fix(skills): ignore generated Python cache files in drift checks`. Prevents `__pycache__` / `.pyc` artifacts from causing false skills drift and blocked updates.

### Closed issues indicating significant profile-isolation cleanup
A large cluster of multiplex/profile-scoping issues closed in the last 24h, including:
- [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) — MCP connections/toolset/status not profile-scoped.
- [#91654](https://github.com/NousResearch/hermes-agent/issues/91654) — MCP session/circuit-breaker registries keyed only by server name.
- [#107327](https://github.com/NousResearch/hermes-agent/issues/107327) — multiplexed gateway path memoisation leaking across profiles.
- [#103717](https://github.com/NousResearch/hermes-agent/issues/103717) — busy-session follow-ups from secondary profile owners dropped.
- [#65940](https://github.com/NousResearch/hermes-agent/issues/65940) — credential pool can use another profile’s API key.
- [#65941](https://github.com/NousResearch/hermes-agent/issues/65941) — Nous requests can use another profile’s endpoint.
- [#82903](https://github.com/NousResearch/hermes-agent/issues/82903) — `session_search` ignored profile arg and searched root state.db.
- [#107399](https://github.com/NousResearch/hermes-agent/issues/107399) — cron dispatch `UnscopedSecretError` under multiplex.
- [#107422](https://github.com/NousResearch/hermes-agent/issues/107422) — terminal ambient bridge latched secondary profile’s docker policy.
- [#99121](https://github.com/NousResearch/hermes-agent/issues/99121) — mem0 plugin failed closed on self-hosted OSS.

This suggests a focused maintainer push to harden multi-profile correctness and security boundaries.

## 4. Community Hot Topics

### Most-commented issues
- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — **199 comments**. Skills index stale/degraded watchdog. The automated freshness probe reports the index is 29.8h old against a 26h limit. Underlying need: reliable Skills Hub index rebuild/deploy pipeline.
- [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) — **11 comments**. Dashboard/desktop profile switch is partial: MCP tools never load, and `secrets/${VAR}` resolves from the launch profile. Underlying need: end-to-end profile identity in dashboard/desktop.
- [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) — **8 comments**. Second writer via `doctor --fix` / `repair_state_db_schema` / hosted_rooms corrupts live-WAL `state.db`. Field report: 7 corruptions in 4 days. Underlying need: single-writer gate for SQLite WAL under multi-profile gateways.
- [#51217](https://github.com/NousResearch/hermes-agent/issues/51217) — **7 comments**. Add German (`de`) locale to Hermes Desktop i18n. Underlying need: broader European localization.
- [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) — **6 comments, closed**. Multiplex profiles: MCP connections, toolset resolution, and status not profile-scoped.
- [#107485](https://github.com/NousResearch/hermes-agent/issues/107485) — **5 comments**. SSH-isolated backend idle-exit kills running cron executions and silently skips scheduled slots.
- [#108575](https://github.com/NousResearch/hermes-agent/issues/108575) — **5 comments**. `hermes profile create --clone` does not carry over `agent.max_turns`, causing cloned profiles to run with a 4-turn budget.
- [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) — **5 comments**. MCP OAuth flow never triggers for servers that don’t challenge unauthenticated requests.
- [#88715](https://github.com/NousResearch/hermes-agent/issues/88715) — **5 comments**. Multiplex profile identity is late-bound across transport, session, storage, and control paths.

### Active PR themes
PR comment counts were not provided in the snapshot, but high-impact open PRs include:
- [#108696](https://github.com/NousResearch/hermes-agent/pull/108696) — `web_extract` wall-clock dispatch timeout.
- [#108695](https://github.com/NousResearch/hermes-agent/pull/108695) — fully redact credential headers in MCP probe errors/test display.
- [#108693](https://github.com/NousResearch/hermes-agent/pull/108693) — reconcile key-scoped credential endpoints for Z.AI/Kimi.
- [#108683](https://github.com/NousResearch/hermes-agent/pull/108683) — dashboard/`gateway stop` multiplexer parity.
- [#107932](https://github.com/NousResearch/hermes-agent/pull/107932) — close Desktop idle-exit admission race for cron.
- [#102840](https://github.com/NousResearch/hermes-agent/pull/102840) — record owner stub for unlisted tile drafts so `session.resume` routes.
- Older salvaged PRs: [#57180](https://github.com/NousResearch/hermes-agent/pull/57180), [#97466](https://github.com/NousResearch/hermes-agent/pull/97466).

Underlying demand: production-grade profile isolation, credential safety, provider timeout handling, and cron reliability.

## 5. Bugs & Stability

Ranked by severity/labels and active status:

### P1
- [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) — **OPEN, P1**. Second writer corrupts live-WAL `state.db`; upstream guards fail-open. Proposal: lazy flock single-writer gate. The v0.21.2 patch release may mitigate some cases, but the issue remains open.
- [#102840](https://github.com/NousResearch/hermes-agent/pull/102840) — **OPEN PR, P1**. Desktop unlisted tile drafts lack owner routing, breaking `session.resume`. Fix PR open.
- [#76520](https://github.com/NousResearch/hermes-agent/pull/76520) — **OPEN PR, P1**. macOS git/source installs resume sessions with system Python instead of Hermes venv. Fix PR open.

### P2
- [#107485](https://github.com/NousResearch/hermes-agent/issues/107485) — **OPEN, P2**. SSH-isolated dashboard backend idle-exit kills running cron executions and skips slots. Fix PR: [#107932](https://github.com/NousResearch/hermes-agent/pull/107932).
- [#108656](https://github.com/NousResearch/hermes-agent/issues/108656) — **OPEN, P2**. Gemini/AI Studio quota handling loses model scope and RetryInfo; one 429 can exhaust API-key pools globally. No fix PR listed.
- [#108638](https://github.com/NousResearch/hermes-agent/issues/108638) — **OPEN, P2**. `_apply_llamacpp_props` never falls back to `/props` when `/v1/props` returns 200 with non-props payload; allocated `n_ctx` silently discarded. No fix PR listed.
- [#108647](https://github.com/NousResearch/hermes-agent/issues/108647) — **OPEN, P2**. Tail message floor overrides lean token budget with no upper bound; 6.3x observed. No fix PR listed.
- [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) — **OPEN, P2**. Dashboard/desktop profile switch is partial; MCP tools and secrets resolve incorrectly.
- [#108682](https://github.com/NousResearch/hermes-agent/pull/108682) — **OPEN PR, P2**. Preserve and report provider refusals during compression.
- [#108683](https://github.com/NousResearch/hermes-agent/pull/108683) — **OPEN PR, P2**. Dashboard and `gateway stop` treat multiplexer-served profile as running via multiplexer.
- [#108695](https://github.com/NousResearch/hermes-agent/pull/108695) — **OPEN PR, P2**. MCP credential header redaction.
- [#108696](https://github.com/NousResearch/hermes-agent/pull/108696) — **OPEN PR, P2**. `web_extract` no longer hangs on stuck provider.
- [#108693](https://github.com/NousResearch/hermes-agent/pull/108693) — **OPEN PR, P2**. Reconcile key-scoped credential endpoints at pool load.

### P3
- [#108575](https://github.com/NousResearch/hermes-agent/issues/108575) — **OPEN, P3**. `profile create --clone` drops `agent.max_turns`; cloned profiles run with 4-turn budget and Kanban dispatch fails.
- [#103586](https://github.com/NousResearch/hermes-agent/issues/103586) — **OPEN, P3**. Desktop scroll-to-bottom jump button appears in all split panes when only one pane scrolled up.
- [#108688](https://github.com/NousResearch/hermes-agent/pull/108688) — **OPEN PR, P3**. Preserve retained delivery outcomes at cron timeout.
- [#108689](https://github.com/NousResearch/hermes-agent/pull/108689) — **OPEN PR, P3**. Validate desktop pane share replay partner.
- [#108690](https://github.com/NousResearch/hermes-agent/pull/108690) — **OPEN PR, P3**. Clear dependency audits and repeated startup warnings.
- [#47403](https://github.com/NousResearch/hermes-agent/issues/47403) — **OPEN, P3**. CLI blocks silently on clarify prompts; PR [#108692](https://github.com/NousResearch/hermes-agent/pull/108692) adds question text and OS fallback.

### Notable closed stability fixes
- [#102120](https://github.com/NousResearch/hermes-agent/issues/102120) — hosted_room_worker corrupting shared `state.db`.
- [#91654](https://github.com/NousResearch/hermes-agent/issues/91654) — MCP registries colliding across profiles.
- [#107399](https://github.com/NousResearch/hermes-agent/issues/107399) — cron dispatch `UnscopedSecretError`.
- [#107422](https://github.com/NousResearch/hermes-agent/issues/107422) — terminal ambient bridge latching wrong docker policy.
- [#99121](https://github.com/NousResearch/hermes-agent/issues/99121) — mem0 plugin failing closed without API key.

## 6. Feature Requests & Roadmap Signals

- [#51217](https://github.com/NousResearch/hermes-agent/issues/51217) — Add German (`de`) locale to Hermes Desktop i18n. Small but clear community request; could be picked up as a low-risk desktop improvement.
- [#76221](https://github.com/NousResearch/hermes-agent/issues/76221) — Roadmap proposal: multi-session collaboration for Hermes Agent. Broader architectural feature; likely needs maintainer decision.
- [#47403](https://github.com/NousResearch/hermes-agent/issues/47403) + [#108692](https://github.com/NousResearch/hermes-agent/pull/108692) — CLI desktop notifications for clarify prompts. PR is already open, so this is a near-term candidate.
- [#108691](https://github.com/NousResearch/hermes-agent/pull/108691) — Add Cloudflare Workers AI as a first-class model provider. New provider support is a likely next-release candidate.
- [#108696](https://github.com/NousResearch/hermes-agent/pull/108696) / [#57180](https://github.com/NousResearch/hermes-agent/pull/57180) — `web_extract` timeout hardening.
- [#108695](https://github.com/NousResearch/hermes-agent/pull/108695) / [#97466](https://github.com/NousResearch/hermes-agent/pull/97466) — MCP credential redaction.
- [#108683](https://github.com/NousResearch/hermes-agent/pull/108683) — Multiplexer parity in dashboard/gateway surfaces.
- [#107932](https://github.com/NousResearch/hermes-agent/pull/107932) — Desktop idle-exit cron admission race.
- [#104482](https://github.com/NousResearch/hermes-agent/pull/104482) — Dashboard aux usage folded into correct model card.
- [#107734](https://github.com/NousResearch/hermes-agent/pull/107734) — Curator read-mark store seeding.

**Prediction:** The next version is likely a hardening/minor release centered on multiplexer parity, credential/MCP redaction, `web_extract` timeouts, cron idle-exit fixes, provider additions, and `state.db` single-writer safety. German locale and multi-session collaboration are more likely longer-term or needs-decision items.

## 7. User Feedback Summary

The strongest user pain point is **multi-profile/multiplex correctness**. Real deployments run a default profile plus secondary profiles on one host, and users report hybrid profile behavior, secrets resolving from the wrong profile, MCP tools loading only for the first profile, `session_search` hitting root state.db, wrong gateway status, and cron notifications tied to the wrong profile. These are not theoretical: multiple closed issues today directly addressed cross-profile credential, endpoint, MCP registry, and session-state leaks.

The second major pain point is **state.db integrity**. [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) reports 7 corruptions in 4 days on a multi-profile Linux host, with a clear second-writer/WAL mechanism. This aligns with the v0.21.2 patch release. Users need a durable single-writer design, not just fail-open guards.

Other dissatisfaction signals:
- Cron reliability under SSH-isolated dashboards: idle-exit kills jobs and skips slots ([#107485](https://github.com/NousResearch/hermes-agent/issues/107485)).
- Provider quota handling: Gemini 429s can exhaust API-key pools ([#108656](https://github.com/NousResearch/hermes-agent/issues/108656)).
- Desktop UX: split-pane scroll state is global ([#103586](https://github.com/NousResearch/hermes-agent/issues/103586)), profile switching is partial ([#67605](https://github.com/NousResearch/hermes-agent/issues/67605)).
- Skills Hub freshness: the index watchdog is degraded with 199 comments ([#66616](https://github.com/NousResearch/hermes-agent/issues/66616)).
- Localization demand: German locale request ([#51217](https://github.com/NousResearch/hermes-agent/issues/51217)).

Satisfaction is mixed: maintainers are closing many profile-isolation bugs and shipping a targeted patch release, which shows responsiveness. But open P1/P2 issues indicate that production multi-profile users still face data-integrity, isolation, and cron-reliability risks.

## 8. Backlog Watch

High-priority or long-running items needing maintainer attention:

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — Open since 2026-07-18, 199 comments. Skills index stale/degraded. High community visibility despite P3 label.
- [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) — Open since 2026-07-19, P2. Dashboard/desktop profile switch partial; MCP tools and secrets wrong. Important for desktop users.
- [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) — Open since 2026-09-05, P1. `state.db` live-WAL corruption. Critical for multi-profile hosts.
- [#51217](https://github.com/NousResearch/hermes-agent/issues/51217) — Open since 2026-06-23. German locale request; low risk, long-standing.
- [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) — Open since 2026-08-18, P2. MCP OAuth flow never triggers for non-challenging servers.
- [#88715](https://github.com/NousResearch/hermes-agent/issues/88715) — Open since 2026-08-17, P2. Multiplex profile identity is late-bound across paths.
- [#76221](https://github.com/NousResearch/hermes-agent/issues/76221) — Open since 2026-08-01. Multi-session collaboration roadmap; needs decision.
- [#76483](https://github.com/NousResearch/hermes-agent/issues/76483) — Open since 2026-08-02, P3. Kanban `notify-subscribe` stamps wrong invoking profile.
- [#94590](https://github.com/NousResearch/hermes-agent/issues/94590) — Open since 2026-08-25, P2. Multiplex cron ticker recreates archived profiles.
- [#97360](https://github.com/NousResearch/hermes-agent/issues/97360) — Open since 2026-08-28, P2. `gateway status` reports other profiles’ PIDs.
- [#57180](https://github.com/NousResearch/hermes-agent/pull/57180) — Open since 2026-07-02. `web_extract` timeout PR; now likely superseded by [#108696](https://github.com/NousResearch/hermes-agent/pull/108696).
- [#76520](https://github.com/NousResearch/hermes-agent/pull/76520) — Open since 2026-08-02, P1. CLI git installs lose venv after session browse.
- [#97466](https://github.com/NousResearch/hermes-agent/pull/97466) — Open since 2026-08-28. MCP Bearer redaction; salvaged by [#108695](https://github.com/NousResearch/hermes-agent/pull/108695).
- [#102840](https://github.com/NousResearch/hermes-agent/pull/102840) — Open since 2026-09-04, P1. Desktop session resume routing.
- [#104482](https://github.com/NousResearch/hermes-agent/pull/104482) — Open since 2026-09-06. Dashboard aux usage duplicate cards.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-12

Repository: [nearai/ironclaw](https://github.com/nearai/ironclaw)

## 1. Today’s Overview
On 2026-09-12, IronClaw showed very low public activity: 0 issue updates, 0 releases, and only 1 open PR updated in the last 24 hours. No PRs were merged or closed, and no new issues were reported or triaged. The sole updated item is [PR #8076](https://github.com/nearai/ironclaw/pull/8076), an open fix focused on distinguishing disconnected shared channels from unpaired accounts. Overall, this is a maintenance-only snapshot with minimal activity; project health cannot be strongly assessed from this data alone, but there is no evidence of active incidents, release work, or broad community discussion.

## 2. Releases
No new releases in the last 24 hours. No breaking changes, migration notes, or version details to report.

## 3. Project Progress
No merged or closed PRs today, so no features or fixes shipped in this window.  
The only forward movement is [PR #8076](https://github.com/nearai/ironclaw/pull/8076), which remains open and advances:
- Distinguishing a paired user’s disconnected shared channel from an unpaired account.
- Rendering channel-specific guidance for both user messages and bot commands.
- Keeping rejection classification consistent across product, adapter, and OpenAI-compatible surfaces.
- Updating Slack capability handling.

## 4. Community Hot Topics
The most active — and only — item is [PR #8076](https://github.com/nearai/ironclaw/pull/8076), created 2026-09-06 and updated 2026-09-11. It has 0 👍 reactions and comments are listed as `undefined`, so engagement volume cannot be measured.

Underlying need: clearer state handling and user-facing guidance when shared channels are disconnected, especially across Slack, bot commands, and OpenAI-compatible surfaces. No other Issues or PRs are available for comparison.

## 5. Bugs & Stability
No new bugs, crashes, or regressions were reported in Issues today.  
Ranked stability item:
1. **Moderate — disconnected shared channel vs. unpaired account confusion**  
   [PR #8076](https://github.com/nearai/ironclaw/pull/8076) appears to fix a user-facing UX/logic issue where a paired user’s disconnected shared channel may be handled similarly to an unpaired account. The fix PR exists but is still open and unmerged.

## 6. Feature Requests & Roadmap Signals
No explicit feature requests were submitted in the issue tracker during this window.  
Roadmap signal from [PR #8076](https://github.com/nearai/ironclaw/pull/8076): continued investment in channel-state clarity, Slack integration behavior, and consistency across product/adapter/OpenAI-compatible surfaces. If merged, improved disconnect guidance and channel-specific bot responses are plausible candidates for the next release, though release cadence data is unavailable.

## 7. User Feedback Summary
No direct user feedback, issues, or comments were captured in this snapshot.  
The implied user pain point from [PR #8076](https://github.com/nearai/ironclaw/pull/8076) is confusion when a paired user’s shared channel is disconnected: users and bot commands may receive unclear or inconsistent rejection messaging. Satisfaction/dissatisfaction cannot be measured from the available data.

## 8. Backlog Watch
- [PR #8076](https://github.com/nearai/ironclaw/pull/8076): open since 2026-09-06, last updated 2026-09-11, still open on 2026-09-12. It has no listed comments and 0 reactions, so maintainer review or a merge/close decision may be needed.
- No long-unanswered Issues are present in the provided data because total Issues = 0.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-12

## 1. Today's Overview

QwenPaw is operating at high velocity: **21 issues** and **41 PRs** were updated in the last 24 hours, alongside the promotion of **v2.2.1 (Stable)** to the release channel. Merge/close activity was strong — **18 of 41 PRs** landed or were closed, and **6 issues** were resolved, including a v2.2.1-beta.2 conversation-routing regression. However, the day's issue flow skews heavily toward **stability reports in the subagent/model-routing and session-persistence paths**, with several high-severity bugs (spawn_subagent timeouts, ignored `subagent_model`, stop-button not actually halting execution) still open. The multi-tenant **Hub** discussion remains the single most-engaged thread (26 comments), and Hub scaffolding PRs are beginning to appear. Overall: healthy contribution throughput, but core runtime robustness needs attention.

---

## 2. Releases

### v2.2.1 (Stable) — released 2026-09-11/12
Release page: https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1

**✨ Added**
- **Per-agent model routing** — configure provider preferences and fallback behavior separately for each Agent ([PR #7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)).
- **Auto Fin proactive memory review** and an upgraded **ReMe** memory backend.

**Breaking changes / migration notes:** None stated in the release excerpt provided; the release notes were truncated in the source data. Operators upgrading should nevertheless verify (a) per-agent model routing configs migrate correctly from the previous global configuration, and (b) subagent model overrides still resolve post-upgrade — see open bugs [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) and [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678), both reproduced on 2.2.1-beta lines.

**Release duty:** Stable verification [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) is **closed**; Beta verification [#7674](https://github.com/agentscope-ai/QwenPaw/issues/7674) also closed.

---

## 3. Project Progress

**Notable merged/closed PRs today:**

| PR | Summary | Impact |
|---|---|---|
| [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) | Preserve provider-resolved context windows instead of falling back to AgentScope's 32768 default | Fixes **premature context compaction** for large-window models |
| [#7688](https://github.com/agentscope-ai/QwenPaw/pull/7688) | Simplify grouped session pagination (remove "Collapse List", add "Load More", preserve scroll state) | Console UX |
| [#7677](https://github.com/agentscope-ai/QwenPaw/pull/7677) | Return JSON-safe 422 for non-finite validation inputs | API correctness |
| [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) | Render Markdown tables as `<pre>` in Telegram instead of raw pipes | Channel rendering fix (superseded/extended by [#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713)) |
| [#6994](https://github.com/agentscope-ai/QwenPaw/pull/6994) | Chore: v2.1.0 release notes | Housekeeping (stale, now closed) |

**Fix PRs newly opened (not yet merged):**
- [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) — first-time contributor: regression coverage + diagnostics for dropped subagent model overrides (targets [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676)).
- [#7699](https://github.com/agentscope-ai/QwenPaw/pull/7699) — harden `.master_key` file permission checks on read.
- [#7701](https://github.com/agentscope-ai/QwenPaw/pull/7701) — repair approval-command handler test stub that is red on `main` (7 failures on py3.11/py3.13).
- [#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703) — rework Visual Compact around older history with stable image batches.
- [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696) — Hub local admin bootstrap (`qwenpaw hub --init-admin`), loading only auth/credential storage.
- [#7697](https://github.com/agentscope-ai/QwenPaw/pull/7697) — slim PR-time CI to Ubuntu-only backend tiers + add a release-time full test gate.

---

## 4. Community Hot Topics

1. **[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — QwenPaw Hub multi-tenant edition roadmap (26 comments, 4 👍)** — The most active thread by far. Maintainers are soliciting direction for the team/enterprise edition; paired with [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696) (Hub admin bootstrap). **Underlying need:** admin-managed skills, multi-user access, and self-hostable team deployment with low-friction first-admin setup.
2. **[#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — Deploy page UX (10 comments, CLOSED)** — Mobile-first complaints about entry-point placement and proximity of Start/Stop buttons. **Need:** operation-critical controls must be reachable and mis-tap-safe on phones.
3. **[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) — Stop button reports stopped but execution continues (6 comments, OPEN)** — Followed by a 409 error on the next message while the stale task keeps running. **Need:** true cancellation semantics and observable run state.
4. **[#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) — Per-task model selection for `spawn_subagent` (3 comments, OPEN since June 2)** — Cost-saving multi-model collaboration (cheap model for grep/reads, main model for reasoning). Directly implicated in today's bugs #7676/#7678.
5. **[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — Every `spawn subAgent` task times out (3 comments, OPEN)** — User reports 100% failure even with very long timeouts.
6. **[#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — Ghost sessions / session index vs. disk mismatch (CLOSED as invalid)** — Session list showed Sep 10 entries with no corresponding session file, loading Sep 9 content instead. **Maintainers closed as invalid;** given the data-loss implication, this warrants a second look.
7. **[#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710) — Dedicated history groups for inter-agent tool chats and proactive messages**, and **[#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) — PDF blocks still sent to multimodal `/chat/completions` after #7621** (2 comments each).

*(PR comment counts were not available in the source data, so PRs are ranked by recency/relevance above.)*

---

## 5. Bugs & Stability

Ranked by severity:

**Critical**
- **[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) — Stop does not stop execution (OPEN, 6 comments).** UI shows stopped, but the agent keeps executing the old instruction; a corrected prompt returns HTTP 409. Affects run control and data integrity. **No fix PR identified.**
- **[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — All `spawn subAgent` tasks fail with timeout (OPEN).** Reproduced on win2.2.0; raising timeout has no effect, indicating a hang rather than a slow task. **No fix PR identified.**

**High**
- **[#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — `subagent_model` has no effect; subagents inherit parent `active_model`.** Reproduced on 2.2.1-beta.1 and beta.2. **Fix in progress:** [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) adds regression coverage and logging around the dropped override.
- **[#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) — Configured model silently lost during normal use (win10 2.2.1 desktop).** UI reports "no model configured" mid-session, requiring re-selection. Recurring.
- **[#7693](https://github.com/agentscope-ai/QwenPaw/issues/7693) — Creator: user approval during multi-image generation interrupts the in-flight image task without rescheduling; job stuck in RUNNING forever.** With a strict serial `model_slot("image")` limit of 1, this can permanently wedge the queue.

**Medium**
- **[#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) — PDF document blocks still serialized as `{"type":"file",...}` to multimodal OpenAI-compatible endpoints.** #7621 only fixed the non-multimodal path.
- **[#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) — Scheduled tasks and regular chats frequently produce no visible output; results folded into thinking steps.**
- **[#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) — Agent working directory reverts to an old path after restart; unclear UI for folder-based project sessions.**
- **[#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — Ghost sessions / partial history loss** (closed as invalid — see Backlog Watch).

**Resolved / regression-cleared**
- **[#7687](https://github.com/agentscope-ai/QwenPaw/issues/7687) (CLOSED)** — Sending a message right after switching agents silently redirected to a new conversation; a regression introduced in the 2026-09-10 console build.
- **[#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) (merged)** — Prevents premature compaction caused by ignored provider context windows.
- **[#7701](https://github.com/agentscope-ai/QwenPaw/pull/7701) (open)** — Addresses 7 red unit tests on `main`, i.e., an existing CI health issue.

---

## 6. Feature Requests & Roadmap Signals

| Request | Link | Likelihood for next release |
|---|---|---|
| Per-task model selection for `spawn_subagent` (multi-model cost optimization) | [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) | **High** — overlaps with the active bug fixes in #7676/#7680 and the new per-agent routing shipped in v2.2.1 |
| `/compact` context management inside Loop goal/task modes | [#7679](https://github.com/agentscope-ai/QwenPaw/issues/7679) | **High** — pairs naturally with [#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703) (Visual Compact rework) |
| Serply as a third `web_search` provider | [#7711](https://github.com/agentscope-ai/QwenPaw/issues/7711) / [#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712) | **High** — PR already open and BYOK/opt-in |
| Configurable default Loop mode; rename built-in "Default" → "Standard" | [#7714](https://github.com/agentscope-ai/QwenPaw/issues/7714) | **Medium** — small UX/config surface |
| Telegram: native Rich Messages for Markdown tables; optional cleanup of intermediate messages | [#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713), [#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592) | **Medium–High** — both PRs open |
| History groups for inter-agent tool chats + proactive messages | [#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710) | **Medium** |
| Right-side dock layout (conversations left, docs/browser preview right) | [#7700](https://github.com/agentscope-ai/QwenPaw/issues/7700) | **Medium** — companion PR [#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704) moves the chat files drawer right |
| Atlas Cloud as built-in provider | [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) | **Medium** — PR open since July 27 |
| Unified multi-channel bot management plugin (`bot-manager`) | [#7702](https://github.com/agentscope-ai/QwenPaw/pull/7702) | **Medium** — plugin ecosystem expansion |

---

## 7. User Feedback Summary

**Pain points (dissatisfaction):**
- **Mobile/web deploy UX** — operation entry points buried below the fold; Start/Stop buttons too close together ("每次操作都很紧张，怕误点到了停止") — [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177).
- **Android input ergonomics** — IME offers only a newline key, but newline submits, so long prompts cannot be multi-lined — [#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707) (closed).
- **Subagent reliability** — non-technical users report total task failure on subagent spawn and incomprehensible timeouts — [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678).
- **Config persistence** — models and working directories silently reverting mid-use/after restart — [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708), [#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705).
- **Output visibility** — scheduled tasks finishing with no visible result, answers hidden inside thinking blocks — [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709).
- **Token cost anxiety in long Loop runs** — users want in-band context compaction — [#7679](https://github.com/agentscope-ai/QwenPaw/issues/7679).

**Positive signals (satisfaction):**
- Users explicitly praise mobile web improvements in 2.2.1 ("移动端使用的体验已经比较好了") — [#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707).
- Strong pull toward team/enterprise use, evidenced by sustained engagement on Hub — [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318).
- Active first-time contributor pipeline (e.g., #7680, #7712, #7713, #7590, #7592, #6499, #6776), indicating a welcoming contribution surface.

---

## 8. Backlog Watch

**Issues needing maintainer attention:**
- **[#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) — per-task model selection for subagents.** Open since **June 2** with only 3 comments, yet it is the conceptual parent of today's highest-severity subagent bugs (#7676, #7678). A design decision here would unblock multiple threads.
- **[#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) / [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678).** Both reproduced on current beta/stable lines and directly contradict the headline v2.2.1 "per-agent model routing" feature. High-priority triage recommended.
- **[#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — ghost sessions / missing session files, closed as invalid.** Given the reported on-disk absence of a listed session and partial history loss, a documented explanation or defensive fix would improve trust more than an `invalid` label.

**PRs aging without merge:**
- **[#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) — Atlas Cloud provider.** Open since **July 27** (first-time contributor). Low-risk preset addition; needs review bandwidth.
- **[#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776) — self-heal dead Playwright driver connections.** Open since **August 7**, marked `ready-for-human-review`. Fixes a "die once, dead forever" browser-backend failure.
- **[#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) — Telegram table rendering.** Closed today, but superseded by [#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713); confirm the replacement lands so the underlying bug (#7585) stays fixed.

**Structural watch items:**
- CI health: **[#7701](https://github.com/agentscope-ai/QwenPaw/pull/7701)** indicates unit tests are red on `main`; **[#7697](https://github.com/agentscope-ai/QwenPaw/pull/7697)** proposes slimming the PR gate while adding a release-time full test gate — review these together to avoid trading coverage for speed.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-12

## 1. Today's Overview
ZeroClaw remains highly active: 50 issues and 50 PRs were updated in the last 24h, with 39 active/open issues and 47 open PRs. The close/merge side is thinner: 11 issues closed and 3 PRs merged/closed, with 0 new releases. The dominant themes are security/identity, provider reliability, context/cache correctness, and ZeroCode/ACP runtime behavior. Activity assessment: high, but maintainer review and large stacked PRs appear to be the current throughput bottleneck.

## 2. Releases
No new releases. No breaking changes or migration notes were published in this window.

## 3. Project Progress
- 3 PRs were merged/closed today, but the supplied top-20 PR sample contains only open PRs, so merged PR titles are not visible.
- Closed issues show progress across channels, runtime, config, and ZeroCode:
  - [Issue #5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram media groups batched into one multimodal turn.
  - [Issue #10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753) — Windows session/new 2 MB stack overflow test closed; related open tracker [Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) remains.
  - [Issue #10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690) — Integrations “Configure” link now uses provider family key instead of display-name slug.
  - [Issue #9047](https://github.com/zeroclaw-labs/zeroclaw/issues/9047) — ZeroCode session history vs persistent-memory isolation clarified.
  - [Issue #10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609) — ZeroCode launch directory/cwd bug closed.
  - [Issue #10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115) — Tool-result truncation visibility closed.
  - [Issue #9521](https://github.com/zeroclaw-labs/zeroclaw/issues/9521) — MCP image content blocks mapped into vision pipeline closed.
  - [Issue #10532](https://github.com/zeroclaw-labs/zeroclaw/issues/10532) — Degraded-config remediation no longer points at wrong binary.
  - [Issue #10786](https://github.com/zeroclaw-labs/zeroclaw/issues/10786) — Anthropic previous-turn thinking blocks cache rewrite closed.
  - [Issue #9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092) — ZeroCode keystroke lag in long sessions closed.
- Active advancement/review areas: OIDC/security stack [PR #10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248), [PR #10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265), [PR #10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268), [PR #10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270), [PR #10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274), [PR #10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275), [PR #10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321); provider multi-model [PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809); log rotation [PR #10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214); Telegram group context [PR #10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640); service log fix [PR #10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732).

## 4. Community Hot Topics
Issues by comment count:
- [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — Maintainer decision queue for RFCs/design issues; 15 comments. Underlying need: faster maintainer decisions on RFCs, release policy, and coordination trackers.
- [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC: simplify RFC voting by removing mandatory discussion windows and making REVISE stop the current snapshot; 9 comments. Underlying need: reduce governance friction.
- [Issue #5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram media groups batched into one multimodal turn; 8 comments, closed. Underlying need: correct multimodal handling for Telegram albums.
- [Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — RpcDispatcher::process_line runs within 2% of 2 MB stack guard; Windows nextest stack overflow; 6 comments. Underlying need: Windows CI/runtime stability.
- [Issue #8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) — OIDC milestone: canonical principals and inbound authentication; 3 comments. Underlying need: identity/security architecture.
- [Issue #10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753) — Windows session/new 2 MB stack overflow; 3 comments, closed.
PRs: comment counts are undefined in the supplied dataset, so PR hotness is assessed by scope/update recency. Largest active review surfaces include the stacked OIDC/security PRs [PR #10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248), [PR #10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265), [PR #10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268), [PR #10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270), [PR #10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274), [PR #10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275), [PR #10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321), plus [PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809), [PR #9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584), [PR #10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214), and [PR #10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640).

## 5. Bugs & Stability
P1 / high-risk open:
- [Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — Windows stack overflow in RpcDispatcher process_line; p1, S2. No direct fix PR visible; related [Issue #10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753) is closed.
- [Issue #10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) — Failed Code/ACP turn discards accepted prompt and completed tool exchanges from durable history; p1, risk high.
- [Issue #10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) — zerocode notification lag cancels every running turn; p1, risk high.
- [Issue #10782](https://github.com/zeroclaw-labs/zeroclaw/issues/10782) — Channel reply-intent precheck discards LLM usage, so classifier cost/quota is never recorded; p1, risk high.
- [Issue #10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780) — No proactive token-budget context compaction; context_compression removed and keep_recent/collapse_tool_results inert; p1, risk high.
- [Issue #10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777) — Thinking/effort request config flips between turns and rewrites the whole cached history segment; p1, risk high.
- [Issue #10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778) — Multimodal image cap eviction rewrites earlier history messages and invalidates cache prefix; p1, risk high.
- [Issue #10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) — `zeroclaw service logs` prints nothing on macOS, Windows and OpenRC when daemon is healthy; p1. Fix candidate: [PR #10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732).

P2 / medium and other notable open:
- [Issue #10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) — Pre-output stream failure skips advertised non-streaming fallback.
- [Issue #10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) — Single-candidate stream recovery ignores provider_retries; Anthropic 529 gets one immediate retry with no backoff.
- [Issue #10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779) — OpenCode FreeUsageLimitError 429 is retried with sub-second backoff instead of failing fast.
- [Issue #10759](https://github.com/zeroclaw-labs/zeroclaw/issues/10759) — SOP RPC run detail omits retained failure reason; risk high.
- [Issue #10757](https://github.com/zeroclaw-labs/zeroclaw/issues/10757) — agent-browser availability probe timeouts not distinguished from missing CLI errors.
- [Issue #10754](https://github.com/zeroclaw-labs/zeroclaw/issues/10754) — Memory authorship vs transport classification for preferences; risk high.
- [Issue #10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701) — Image attachment invalidates whole history cache prefix, not just the new message.

Closed / likely fixed:
- [Issue #10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753), [Issue #10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609), [Issue #10532](https://github.com/zeroclaw-labs/zeroclaw/issues/10532), [Issue #10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690), [Issue #10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115), [Issue #9521](https://github.com/zeroclaw-labs/zeroclaw/issues/9521), [Issue #10786](https://github.com/zeroclaw-labs/zeroclaw/issues/10786), [Issue #9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092), [Issue #5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514).

Stability themes: provider retry/backoff/fallback, cache-prefix invalidation from images/thinking/config changes, token accounting and compaction, ACP/ZeroCode durability, and platform parity.

## 6. Feature Requests & Roadmap Signals
- Governance/RFC: [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) RFC voting simplification; [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) maintainer decision queue.
- Security/identity roadmap: [Issue #8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) OIDC milestone; PR stack [PR #10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248), [PR #10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265), [PR #10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268), [PR #10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270), [PR #10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274), [PR #10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275), [PR #10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) covering canonical principals, principal-owned sessions/memory, route-layer auth, browser PKCE, device grant, and enrollment.
- Provider/model configuration: [PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) multiple models per provider profile; [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) native Hailo-Ollama support; retry/backoff fixes implied by [Issue #10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787), [Issue #10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779), [Issue #10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736).
- Context/memory controls: [Issue #10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780) proactive token-budget compaction; [Issue #10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781) remove or implement inert context/history keys; [PR #9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) token accounting on history-trim events; [Issue #9047](https://github.com/zeroclaw-labs/zeroclaw/issues/9047) Code history/memory isolation (closed).
- Channels/tools/platform: [PR #10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640) passive Telegram group context; [Issue #9521](https://github.com/zeroclaw-labs/zeroclaw/issues/9521) MCP image blocks into vision (closed); [PR #9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) per-agent ownership for session/discord tools; [PR #10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214) log rotation and multi-segment queries; [PR #9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) egress grant ceremony for plugins; [PR #9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) and [PR #10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) git risk/root enforcement.
- Prediction: the next release is more likely to include targeted provider/context/platform fixes and possibly parts of the OIDC stack if maintainers merge the stacked series. Full OIDC/principal isolation appears large and review-heavy, so it may land incrementally.

## 7. User Feedback Summary
- Cost/cache pain: users are hitting cache-prefix rewrites from images, thinking/effort config, and multimodal eviction, leading to unexpected cache reads/writes and token spend. See [Issue #10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777), [Issue #10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778), [Issue #10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701), [Issue #10786](https://github.com/zeroclaw-labs/zeroclaw/issues/10786).
- Provider reliability pain: retries, backoff, and fallback behavior are inconsistent; 529/429 cases can retry poorly or fail without advertised fallback. See [Issue #10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736), [Issue #10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787), [Issue #10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779).
- Context/config confusion: inert context/history keys, missing proactive compaction, and invisible tool-result truncation make token usage hard to control. See [Issue #10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780), [Issue #10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781), [Issue #10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115).
- ZeroCode/ACP UX: launch cwd, notification-lag cancellations, failed-turn history loss, and session/memory isolation create workflow disruption. See [Issue #10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609), [Issue #10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785), [Issue #10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788), [Issue #9047](https://github.com/zeroclaw-labs/zeroclaw/issues/9047), [Issue #9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092).
- Platform parity: Windows stack overflow and empty `service logs` on macOS/Windows/OpenRC are recurring operational complaints. See [Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734), [Issue #10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753), [Issue #10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731).
- Governance friction: RFC waiting windows and the maintainer decision queue are actively discussed. See [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549), [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692).
- Satisfaction signals: 11 issues closed in the window, active maintainer/contributor engagement, and large security/roadmap PRs in review. Dissatisfaction is concentrated on reliability/cost-correctness and review latency.

## 8. Backlog Watch
Issues needing maintainer attention:
- [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — Maintainer decision queue; open since 2026-07-04, 15 comments.
- [Issue #8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) — OIDC milestone tracker; open since 2026-06-24, risk high, accepted.
- [Issue #9967](https://github.com/zeroclaw-labs/zeroclaw/issues/9967) — Harness evaluation framework tracker; open since 2026-08-13.
- [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC voting simplification; open since 2026-09-02, needs-maintainer-review, 9 comments.
- [Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — Windows stack overflow; open since 2026-09-10, p1, 6 comments.
- [Issue #10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780), [Issue #10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781), [Issue #10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778), [Issue #10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777), [Issue #10754](https://github.com/zeroclaw-labs/zeroclaw/issues/10754) — new/updated high-risk issues with needs-maintainer-review.

PRs needing attention:
- [PR #9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) — git subcommand risk classifier; open since 2026-08-01, needs-author-action, risk high.
- [PR #9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) — egress grant ceremony; open since 2026-07-31, large security PR.
- [PR #10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) — allowed roots for git operations; open since 2026-08-25, needs-author-action.
- [PR #9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) — token accounting on history-trim; open since 2026-08-03, blocked/do-not-merge.
- [PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — multiple models per provider profile; open since 2026-08-07, needs-author-action.
- [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — native Hailo-Ollama; open since 2026-07-17, do-not-merge.
- [PR #10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214) — log rotation/multi-segment queries; open since 2026-08-21, needs-author-action.
- OIDC stack [PR #10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248), [PR #10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265), [PR #10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268), [PR #10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270), [PR #10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274), [PR #10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275), [PR #10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) — open since 2026-08-22/24, needs-author-action, risk high, stacked.
- [PR #10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640) — Telegram passive group context; open since 2026-09-05, needs-author-action.
- [PR #9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) — per-agent session/discord tool ownership; open since 2026-08-04, needs-maintainer-review.
- [PR #10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732) — service log selection fix; open since 2026-09-09, needs-author-action.

Data caveat: PR comment/reaction counts were undefined in the supplied dataset, so PR “hotness” is assessed by recency, scope, and review tags rather than comments.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*