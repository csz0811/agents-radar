# OpenClaw Ecosystem Digest 2026-09-13

> Issues: 500 | PRs: 500 | Projects covered: 5 | Generated: 2026-09-13 00:17 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw Deep Dive

# OpenClaw Project Digest — 2026-09-13

## 1. Today’s Overview
OpenClaw remains extremely active: 500 issues and 500 PRs were updated in the last 24h, with 230 issues closed and 234 PRs merged/closed. No new releases shipped, so today’s activity is focused on stabilization rather than version delivery. The dominant risk cluster is upgrade/update reliability around 2026.9.3/2026.9.4, including P0 migration, Doctor, auth-lock, and rollback failures. Subagent completion delivery, process leakage, and message/session-state loss also remain recurring stability themes. Activity assessment: very high maintainer throughput, but elevated release-quality risk across core lifecycle paths.

## 2. Releases
None. No new OpenClaw releases were published in the last 24h, so there are no release-specific breaking changes, migration notes, or changelog items to summarize. Upgrade/migration issues below are still active and should be treated as operational risk signals for 2026.9.x users.

## 3. Project Progress
- Aggregate activity: 234 PRs were merged/closed and 230 issues were closed in the last 24h.
- Visible closed/merged PRs in the top sample include:
  - [#146353](https://github.com/openclaw/openclaw/pull/146353) — CI performance: share compiled workers across test groups.
  - [#146508](https://github.com/openclaw/openclaw/pull/146508) — Gateway: classify opening timeouts and repair lifetime checks.
- Notable closed issues in the visible set include:
  - [#142476](https://github.com/openclaw/openclaw/issues/142476) — cron session reaper blocking event loop with synchronous PRAGMA integrity checks.
  - [#140620](https://github.com/openclaw/openclaw/issues/140620) — session-transcript reconciliation stall during in-place upgrade.
  - [#144793](https://github.com/openclaw/openclaw/issues/144793) — claude-cli token auth failure with second live CLI session.
  - [#145689](https://github.com/openclaw/openclaw/issues/145689) — cron update blocked by tool-policy migration and owner validation.
  - [#146096](https://github.com/openclaw/openclaw/issues/146096) — stale read-derived whole-file writes discarding intervening workspace updates.
  - [#145266](https://github.com/openclaw/openclaw/issues/145266) — Doctor refreshing Codex from npm and shadowing rebuilt bundled plugin.
- Open high-priority fixes advancing include queued Swarm caller context ([#146490](https://github.com/openclaw/openclaw/pull/146490)), PDF as a core media tool ([#146408](https://github.com/openclaw/openclaw/pull/146408)), scoped subagent reconciliation ([#146542](https://github.com/openclaw/openclaw/pull/146542)), update repair within owning update run ([#146514](https://github.com/openclaw/openclaw/pull/146514)), and Gateway upgrades after Node prefix changes ([#145335](https://github.com/openclaw/openclaw/pull/145335)).

## 4. Community Hot Topics
Most active issues by comment count in the provided data:

- [#97616](https://github.com/openclaw/openclaw/issues/97616) — 28 comments, 1 👍 — OpenClaw leaks unreaped hook/tool child processes, causing zombie accumulation and runtime degradation. Underlying need: robust child-process lifecycle/reaping.
- [#44925](https://github.com/openclaw/openclaw/issues/44925) — 27 comments, 2 👍 — Subagent completion silently lost with no retry, notification, or auto-restart on timeout. Underlying need: durable subagent completion delivery and orchestration guarantees.
- [#142585](https://github.com/openclaw/openclaw/issues/142585) — 17 comments — 2026.9.3 Doctor refuses valid legacy workspace setup and attestation import when canonical rows are absent. Underlying need: safe, predictable migration from legacy installs.
- [#67777](https://github.com/openclaw/openclaw/issues/67777) — 16 comments — Subagent completion delivery can be lost on direct-announce timeout, drain, or orphan prune. Closed, but highlights the same delivery-reliability need as #44925.
- [#78308](https://github.com/openclaw/openclaw/issues/78308) — 16 comments, 1 👍 — Channel-mediated approval for MCP tool calls via consent envelope. Underlying need: security and consent for external/state-mutating tools.
- [#144502](https://github.com/openclaw/openclaw/issues/144502) — 12 comments — WhatsApp mobile cannot play TTS voice notes due to 48 kHz + Lavf vendor tag. Underlying need: channel media compatibility.
- [#142476](https://github.com/openclaw/openclaw/issues/142476) — 12 comments — cron session reaper blocking event loop on large gateways. Closed, but a major stability signal.
- [#136183](https://github.com/openclaw/openclaw/issues/136183) — 12 comments — Command executor hangs when spawning ssh. Underlying need: reliable subprocess timeout/termination behavior.
- [#140620](https://github.com/openclaw/openclaw/issues/140620) — 12 comments — Upgrade session-transcript reconciliation imports only part of sessions then stalls. Closed, but part of the upgrade trust problem.

PR comment counts were not populated in the provided dataset, but the maintainer queue is visibly active around Gateway, agents, update, and UI fixes, including [#146490](https://github.com/openclaw/openclaw/pull/146490), [#146408](https://github.com/openclaw/openclaw/pull/146408), [#146587](https://github.com/openclaw/openclaw/pull/146587), [#146498](https://github.com/openclaw/openclaw/pull/146498), and [#146581](https://github.com/openclaw/openclaw/pull/146581).

## 5. Bugs & Stability
Among issues updated in the last 24h, the visible bug set is heavily weighted toward P0/P1 regressions and lifecycle failures.

**P0 / release-blocking**
- [#142585](https://github.com/openclaw/openclaw/issues/142585) — Doctor refuses valid legacy workspace setup and attestation import. Open; `clawsweeper:needs-info`, `impact:ux-release-blocker`.
- [#145929](https://github.com/openclaw/openclaw/issues/145929) — Auth profile logout/write permanently fails with `lock-may-be-busy` after interrupted self-update. Open; no new fix PR indicated.
- [#145510](https://github.com/openclaw/openclaw/issues/145510) — Update failure: `runtime-verification-failed` on 2026.9.3. Open; needs info.
- [#145192](https://github.com/openclaw/openclaw/issues/145192) — 2026.9.2 → 2026.9.4 managed update fails at candidate-Doctor on live v1 handoff lease, then rolls back onto migrated state. Open; no new fix PR indicated.
- [#144739](https://github.com/openclaw/openclaw/issues/144739) — 2026.9.3 → 2026.9.4 npm update runs 2026.9.3 against schema-17 candidate state. Open.
- [#112475](https://github.com/openclaw/openclaw/issues/112475) — Device pairing recovery fails after removal. Open; P0, security/UX release blocker.
- [#145252](https://github.com/openclaw/openclaw/issues/145252) — Tracking issue: 2026.9.3/2026.9.4 update, upgrade, and recovery reliability. Open; maintainer coordination.
- [#145782](https://github.com/openclaw/openclaw/issues/145782) — Update failure: repairing on 2026.9.3. Closed; P0 release blocker.
- [#126876](https://github.com/openclaw/openclaw/issues/126876) — Accessibility audit: 13 screen reader barriers. Closed; P0 UX release blocker.

**P1 / high severity**
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — Zombie child-process accumulation and runtime degradation. Open.
- [#144911](https://github.com/openclaw/openclaw/issues/144911) — MCP server init timeout crashes Gateway via unhandled rejection in child cleanup. Open; `queueable-fix`.
- [#136183](https://github.com/openclaw/openclaw/issues/136183) — Command executor hangs when spawning ssh after banner exchange regression. Open.
- [#139847](https://github.com/openclaw/openclaw/issues/139847) — Message sent while a reply run is active is dropped. Open; `queueable-fix`.
- [#141474](https://github.com/openclaw/openclaw/issues/141474) — Collector child calling `sessions_yield` strands `agents_wait` forever. Open.
- [#140455](https://github.com/openclaw/openclaw/issues/140455) — Google Meet agent voice broken with circular-JSON in-call crash. Open; `queueable-fix`.
- [#144502](https://github.com/openclaw/openclaw/issues/144502) — WhatsApp TTS voice notes fail on mobile. Open; linked PR open.
- [#137332](https://github.com/openclaw/openclaw/issues/137332) — Mixed terminal requester-settle batches retry forever after ownership check. Open; `queueable-fix`.
- [#146118](https://github.com/openclaw/openclaw/issues/146118) — Superseded-task compaction guard does not cover Codex-native or non-overflow compaction. Open.
- [#118776](https://github.com/openclaw/openclaw/issues/118776) — Leaf sub-agents keep `sessions_yield` but lose tools that could produce the awaited event. Open.

**P2 / medium severity**
- [#145503](https://github.com/openclaw/openclaw/issues/145503) — `skill_workshop` tool not registered after Workshop migration; Doctor `--fix` recommends a rejected allowlist fix.
- [#145993](https://github.com/openclaw/openclaw/issues/145993) — Codex prompt annotation fingerprints prepared content instead of persisted admission.
- [#146004](https://github.com/openclaw/openclaw/issues/146004) — Subagent completion triggers unwanted channel-less dashboard heartbeat turn.
- [#141558](https://github.com/openclaw/openclaw/issues/141558) — Heartbeat polls occur even when disabled.
- [#138260](https://github.com/openclaw/openclaw/issues/138260) — Doctor runtime-tool-schemas self-check fails on temporary snapshot cleanup.
- [#114158](https://github.com/openclaw/openclaw/issues/114158) — `fs-safe` hardcoded `0o600` ignores umask, breaking shared workspaces.

## 6. Feature Requests & Roadmap Signals
- [#78308](https://github.com/openclaw/openclaw/issues/78308) — Channel-mediated approval for MCP tool calls via consent envelope. Strong security/consent signal; still needs product and security review.
- [#131457](https://github.com/openclaw/openclaw/issues/131457) — Add progress streaming mode to the Feishu/Lark channel, matching Slack/Discord/Telegram/etc.
- [#101656](https://github.com/openclaw/openclaw/issues/101656) — Telegram detached subagents can run silently without liveness or terminal notification.
- [#122019](https://github.com/openclaw/openclaw/issues/122019) — `openclaw update status` should expose configured-plugin availability and irreversible migration risk.
- [#117243](https://github.com/openclaw/openclaw/issues/117243) — Enabled, allow-listed plugin excluded from Gateway startup scope is invisible on all diagnostics.
- [#77798](https://github.com/openclaw/openclaw/issues/77798) — Collaborative markdown editor via Canvas embed. Closed, but represents ongoing UX/document-editing interest.
- [#126876](https://github.com/openclaw/openclaw/issues/126876) — Accessibility audit from a blind VoiceOver user. Closed, but likely to influence setup/CLI accessibility work.

Prediction: the next 2026.9.x patch is most likely to prioritize update/upgrade/recovery reliability, auth-store locking, subagent completion delivery, and process cleanup. MCP approval envelopes and channel streaming may land later unless pulled into a release-blocker response.

## 7. User Feedback Summary
Real user pain points remain concentrated in production reliability:
- Upgrade/update failures and rollbacks: users report update phases failing at runtime verification, repair, candidate-Doctor, or schema migration steps ([#145510](https://github.com/openclaw/openclaw/issues/145510), [#145192](https://github.com/openclaw/openclaw/issues/145192), [#144739](https://github.com/openclaw/openclaw/issues/144739), [#142585](https://github.com/openclaw/openclaw/issues/142585)).
- Auth and locking: auth profile writes/logouts fail with `lock-may-be-busy` even without competing processes ([#145929](https://github.com/openclaw/openclaw/issues/145929)).
- Subagent orchestration: completions are silently lost, hangs occur, or detached subagents run without liveness feedback ([#44925](https://github.com/openclaw/openclaw/issues/44925), [#101656](https://github.com/openclaw/openclaw/issues/101656), [#141474](https://github.com/openclaw/openclaw/issues/141474)).
- Data/message integrity: dropped messages, stale whole-file writes, and lost session state are recurring ([#139847](https://github.com/openclaw/openclaw/issues/139847), [#146096](https://github.com/openclaw/openclaw/issues/146096)).
- Platform/channel compatibility: WhatsApp TTS, Google Meet voice, Telegram, Discord, and Feishu-specific issues continue ([#144502](https://github.com/openclaw/openclaw/issues/144502), [#140455](https://github.com/openclaw/openclaw/issues/140455), [#131457](https://github.com/openclaw/openclaw/issues/131457)).
- Accessibility and shared-workspace use cases: screen-reader barriers and NFS/SMB multi-user permission problems remain important for non-default deployments ([#126876](https://github.com/openclaw/openclaw/issues/126876), [#114158](https://github.com/openclaw/openclaw/issues/114158)).

Satisfaction signal: the volume of detailed repros and maintainer responses shows a highly engaged power-user base. Dissatisfaction signal: repeated update/rollback and silent-loss reports indicate release stability is the main trust risk.

## 8. Backlog Watch
Important items that appear long-lived and still need maintainer/product/security attention:

- [#44925](https://github.com/openclaw/openclaw/issues/44925) — Created 2026-03-13, 27 comments, P1. Subagent completion silently lost; needs product decision and maintainer review.
- [#78308](https://github.com/openclaw/openclaw/issues/78308) — Created 2026-05-06, 16 comments, P2. MCP tool-call approval consent envelope; needs product and security review.
- [#115367](https://github.com/openclaw/openclaw/issues/115367) — Created 2026-07-28, P1. Provider-owned read gate conflicts with external channel plugins; security/product decision needed.
- [#101656](https://github.com/openclaw/openclaw/issues/101656) — Created 2026-07-07, P2. Telegram detached subagents lack liveness/terminal notification.
- [#112475](https://github.com/openclaw/openclaw/issues/112475) — Created 2026-07-22, P0. Device pairing recovery fails after removal; stale but still release-blocking.
- [#114158](https://github.com/openclaw/openclaw/issues/114158) — Created 2026-07-26, P2. `fs-safe` file mode breaks shared workspaces.
- [#117243](https://github.com/openclaw/openclaw/issues/117243) — Created 2026-08-01, P2. Plugin invisible on Gateway diagnostics.
- [#118776](https://github.com/openclaw/openclaw/issues/118776) — Created 2026-08-03, P1. Leaf sub-agents lose the tools needed to produce the event they wait for.
- [#122019](https://github.com/openclaw/openclaw/issues/122019) — Created 2026-08-11, P2. Update status omits plugin availability and irreversible migration risk.

PRs worth watching for maintainer bandwidth include [#135648](https://github.com/openclaw/openclaw/pull/135648) (browser profile defaults), [#138579](https://github.com/openclaw/openclaw/pull/138579) (Gateway forwarded sender inference), and [#145335](https://github.com/openclaw/openclaw/pull/145335) (Gateway upgrades after Node prefix changes).

---

## Cross-Ecosystem Comparison

## Cross-Project Comparison Report — Personal AI Assistant / Agent OSS Ecosystem  
**Date:** 2026-09-13  
**Scope:** OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw  
**Data basis:** 24-hour community digests. Counts reflect items updated/closed/merged in the window, not total project backlog. Health score is an analyst composite of throughput, unresolved P0/P1/security risk, release stability, and backlog age.

---

### 1. Ecosystem Overview

The personal AI assistant / agent OSS landscape is splitting into a high-scale core reference layer and a set of specialized challengers. OpenClaw dominates raw activity and surface area, but its main risk is release/upgrade reliability across core lifecycle paths. Hermes Agent, ZeroClaw, and QwenPaw are iterating around gateway isolation, automation reliability, MCP/ACP interoperability, and desktop/multi-channel continuity. IronClaw is quiet and stability-oriented, with limited community signal. Across all projects, the recurring trust gaps are update/migration safety, durable session/subagent state, enforceable security boundaries, and silent-failure observability.

---

### 2. Activity Comparison

| Project | Issues updated (24h) | PRs updated (24h) | Throughput signal | Release status | Health score* |
|---|---:|---:|---|---|---|
| **OpenClaw** | 500 (230 closed) | 500 (234 merged/closed) | Very high; stabilization-heavy | None in window | **7.0/10** — high throughput, elevated P0 update/migration risk |
| **Hermes Agent** | 50 (3 closed, 47 open) | 50 (2 merged/closed, 48 open) | Input-heavy, review-constrained | None | **6.0/10** — strong reports, security fixes pending |
| **IronClaw** | 0 | 2 (1 closed, 1 open) | Minimal / quiet | None | **8.0/10** — stable but low signal |
| **QwenPaw** | 17 (3 closed, 14 active/open) | 7 (0 merged/closed, 7 open) | Triage and contributor activity, zero merge | None | **6.5/10** — active contributors, critical bugs unresolved |
| **ZeroClaw** | 24 (6 closed) | 50 (11 merged/closed) | High; active merge/close | None | **7.5/10** — good throughput, visible stability debt |

\*Health score is an analyst assessment, not an official maintainer metric.

**Key read:** No project shipped a release in the window. OpenClaw operates at roughly 10× the issue/PR update volume of Hermes and ZeroClaw, but that scale comes with release-quality risk. Hermes and QwenPaw are bottlenecked on review/merge throughput. IronClaw is effectively dormant for issue activity.

---

### 3. OpenClaw’s Position

**Advantages vs peers**
- **Scale and centrality:** 500 issues and 500 PRs updated in 24h, with 230 issues closed and 234 PRs merged/closed. This is far beyond Hermes (50/50), ZeroClaw (24/50), QwenPaw (17/7), and IronClaw (0/2).
- **Broadest surface area:** OpenClaw covers gateway, update/Doctor/rollback, auth, subagents, MCP, channels, plugins, accessibility, and workspace safety. Peers tend to specialize.
- **Core-reference status:** Its issues are treated as ecosystem-level signals: upgrade reliability, subagent completion delivery, process reaping, and plugin migration affect downstream expectations.
- **Maintainer throughput:** Despite elevated risk, OpenClaw closes and merges at high volume, indicating a large maintainer/contributor pool.

**Technical approach differences**
OpenClaw appears to be a full personal-assistant platform with a first-class lifecycle layer: update, migration, Doctor, rollback, auth-store locking, channel adapters, and plugin scopes. Hermes leans into gateway/profile multiplexing and cron/Kanban automation. ZeroClaw emphasizes security principals, typed plugin config, scheduler outbox, and runtime/RPC safety. QwenPaw focuses on desktop + MCP/ACP + memory/plugin-store UX. IronClaw is narrow around assistant channel handling and turn-state lineage.

**Community size comparison**
OpenClaw is the largest by visible activity by an order of magnitude. Hermes is the clear second tier in issue/PR volume. ZeroClaw has strong PR throughput for its size. QwenPaw has active triage but low merge throughput. IronClaw has minimal visible community movement.

---

### 4. Shared Technical Focus Areas

Requirements emerging across multiple projects:

1. **Upgrade / update / migration trust**
   - **OpenClaw:** P0 2026.9.x update, Doctor, auth-lock, rollback, schema migration failures.
   - **Hermes:** Windows/macOS update fragility, npm/venv dependency staleness, gateway rollback.
   - **ZeroClaw:** Windows advisory nextest failures, publish-contract issues, service/daemon recovery.
   - **QwenPaw:** Post-2.2.x MCP/session/model regressions.
   - **Need:** Idempotent, observable, recoverable upgrades with preflight validation and safe rollback.

2. **Durable session, subagent, and turn state**
   - **OpenClaw:** Subagent completions lost, `sessions_yield` strands, message drops, process leaks.
   - **Hermes:** Concurrent stale snapshots, Bot Group Chats surviving Desktop closure, session continuity.
   - **QwenPaw:** Session/model loss, memory exhaustion, subagent model overrides.
   - **ZeroClaw:** Failed turns discard durable history, RPC/session replacement, memory concurrency.
   - **IronClaw:** Turn-state lineage metadata regression tests.
   - **Need:** Server-authoritative, durable, idempotent orchestration with explicit completion delivery.

3. **Security / approval / identity boundaries**
   - **OpenClaw:** MCP tool-call consent envelope, auth-lock, device pairing recovery.
   - **Hermes:** Cross-origin credential leak, cross-profile OAuth identity adoption, approval-gate bypass, `config set` bypass.
   - **QwenPaw:** Out-of-workspace write bypass via ACP/kimi-code.
   - **ZeroClaw:** Canonical principals/grants, `always_ask` surviving Full autonomy.
   - **Need:** Enforceable, profile-isolated permissions and approval layers that CLI/plugins cannot silently bypass.

4. **MCP / A2A / ACP interoperability**
   - **OpenClaw:** MCP approval envelopes, tool integration reliability.
   - **Hermes:** MCP OAuth for non-challenging servers, gateway `/reload-mcp` crashes.
   - **QwenPaw:** MCP discover envelope handling, ACP permission selection, A2A roadmap demand.
   - **ZeroClaw:** MCP recovery poisoning, governed plugin webhook ingress.
   - **Need:** Robust protocol adapters, standardized auth, and clear error envelopes.

5. **Silent failures and observability**
   - **Hermes:** Silent config fallback, silently dropped Telegram messages, empty tool args, stale answers.
   - **QwenPaw:** Daily Paper silent failure, plugin catalog fallback gaps, console error events.
   - **ZeroClaw:** Notification lag canceling turns, memory store data loss, retry/backoff gaps.
   - **OpenClaw:** Session/transcript reconciliation stalls, update-phase ambiguity.
   - **Need:** Fail-loud diagnostics, structured errors, and user-visible recovery paths.

6. **Cross-platform and channel parity**
   - **OpenClaw:** WhatsApp TTS, Telegram, Feishu, Google Meet, Discord.
   - **Hermes:** Discord, BlueBubbles, Telegram, Windows Docker, macOS launchd.
   - **QwenPaw:** Telegram, Feishu, QQ, OneBot, Windows/macOS desktop.
   - **ZeroClaw:** Windows CI, Telegram, WhatsApp, Edge TTS.
   - **IronClaw:** Slack/shared-channel assistant guidance.
   - **Need:** Consistent behavior across mobile, desktop, daemon, and messaging transports.

7. **Resource lifecycle, memory, and process safety**
   - **OpenClaw:** Zombie child processes, event-loop blocking cron reaper, MCP child cleanup.
   - **QwenPaw:** OOM/hang from unbounded buffers, keep-alive stacking, workspace watcher freezes.
   - **ZeroClaw:** Memory backend concurrency loss, stack guard proximity, process teardown races.
   - **Need:** Bounded queues, reaping guarantees, backpressure, and memory-safe concurrency.

8. **Model routing, provider correctness, and cost**
   - **OpenClaw:** Auth profile failures, Codex/Claude CLI auth, plugin runtime schemas.
   - **Hermes:** Model alias `base_url` drops, Gemini auto-correction, cache-prompt wrong answers.
   - **QwenPaw:** Subagent model override, separate memory model, DeepSeek capability metadata.
   - **ZeroClaw:** Provider retries, OpenRouter streaming timeouts, cache-write cost accounting.
   - **Need:** Predictable model selection, transparent retries, correct billing/caching semantics.

---

### 5. Differentiation Analysis

| Project | Feature focus | Target users | Architecture signals |
|---|---|---|---|
| **OpenClaw** | Full personal assistant platform: gateway, update/Doctor, channels, subagents, MCP, plugins, accessibility | Power users, production deployments, ecosystem builders | Centralized lifecycle/update layer; broad adapter matrix; high release-risk surface |
| **Hermes Agent** | Gateway/profile isolation, cron/Kanban automation, desktop/multi-device continuity, bot group chats | Technical automation users, multi-profile operators, research labs | Profile multiplexing, worker collaboration contracts, gateway rollback, cron/Kanban scheduling |
| **IronClaw** | Assistant shared-channel handling, turn-state lineage | Narrow/stable assistant deployments, NEAR-aligned users | Turn-state metadata, adapter/OpenAI-compatible surfaces, regression-test focus |
| **QwenPaw** | Desktop assistant + multi-channel operation, MCP/ACP, memory, plugin store | Desktop and multi-channel users, especially Chinese ecosystem | AgentScope foundation, ACP driver, ReMeLight memory, watcher/plugin marketplace |
| **ZeroClaw** | Security/plugin platform, daemon/service reliability, scheduler/outbox, channel UX | Security-conscious operators, plugin-heavy deployments | Rust/RPC runtime, typed plugin config, security principals, durable scheduler primitives |

**Main contrast:** OpenClaw tries to be the broadest reference implementation. Hermes optimizes for persistent, isolated, headless automation. ZeroClaw optimizes for governed runtime/plugin security. QwenPaw optimizes for desktop + protocol interoperability. IronClaw is narrow, quiet, and stability-oriented.

---

### 6. Community Momentum & Maturity

**Activity tiers**
- **Tier 1 — OpenClaw:** Very high activity. Mature ecosystem, massive contributor/maintainer throughput, but elevated release-quality risk and P0 upgrade blockers.
- **Tier 2 — Hermes Agent and ZeroClaw:** High activity with different bottlenecks. Hermes is input-heavy and review-constrained, with unresolved security items. ZeroClaw is merging/closing well but carries stability debt in Windows CI, memory, and runtime history.
- **Tier 3 — QwenPaw:** Active issue intake and contributor PRs, but zero merges in the window. Post-2.2.x reliability and security issues are the main drag.
- **Tier 4 — IronClaw:** Low activity, stable but quiet. Good if stability is the priority, but limited community momentum or roadmap signal.

**Maturity read**
- **Most mature at scale:** OpenClaw.
- **Rapidly iterating but risk-heavy:** OpenClaw, Hermes, ZeroClaw.
- **Stabilizing / dependency-constrained:** QwenPaw.
- **Quiet / maintenance-mode signal:** IronClaw.

---

### 7. Trend Signals

1. **Release engineering is the new competitive moat.** OpenClaw, Hermes, ZeroClaw, and QwenPaw all show update/upgrade/migration trust gaps. Users punish failed rollbacks, schema mismatches, and silent config resets.
2. **Durable orchestration is table stakes.** Subagent completion, session continuity, turn history, and cross-device persistence appear in OpenClaw, Hermes, QwenPaw, ZeroClaw, and IronClaw.
3. **Security is moving from documentation to enforcement.** Cross-origin key leaks, profile OAuth adoption, approval bypass, and workspace write escapes show that permission models must be code-enforced and auditable.
4. **MCP is common, but MCP/A2A/ACP interoperability is not solved.** OAuth gaps, non-standard error envelopes, reload crashes, and A2A timeline questions are recurring.
5. **Silent failure is a top UX and trust problem.** Config fallback, dropped messages, empty tool args, and misleading “completed” states erode confidence more than explicit crashes.
6. **Cross-platform parity remains expensive.** Windows CI, macOS service management, mobile TTS, Docker paths, and messaging transport quirks are persistent.
7. **Plugin ecosystems are maturing into governance problems.** Permission scopes, typed config, webhook ingress, catalog fallback, and dependency hygiene are active across ZeroClaw, QwenPaw, OpenClaw, and Hermes.
8. **Cost, caching, and model routing are becoming first-class reliability features.** Retry/backoff, cache-write accounting, prompt-prefix stability, and provider metadata are no longer niche concerns.

**Value for AI agent developers:** Prioritize durable session/state design, idempotent update paths, strict identity/permission boundaries, MCP/A2A/ACP adapter robustness, fail-loud observability, and cross-platform CI. These are the areas where the ecosystem’s users are reporting the most production pain.

---

## Peer Project Reports

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — Project Digest
**Date:** 2026-09-13 · **Repo:** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
*Based on the provided 24-hour snapshot (50 issues, 50 PRs updated).*

---

## 1. Today's Overview

Hermes Agent is in a high-velocity maintenance phase: 100 issues and PRs were touched in the last 24h, but only 3 issues closed and 2 PRs merged/closed against 48 open PRs and 47 open issues — a strongly **input-heavy, throughput-constrained** day. No releases shipped, and the backlog of pending review work continued to grow. Activity clusters around four themes: **gateway/profile isolation and auth boundaries**, **cron/Kanban scheduling reliability**, **config/CLI mutation safety**, and **desktop/multi-device session continuity**. Several high-severity security-class issues (cross-origin credential leak, cross-profile OAuth identity adoption, approval-gate bypass) are open with no linked fix PR yet, which is the main health concern in this snapshot. Encouragingly, maintainers and contributors have opened targeted fix PRs for many of the day's regressions (cron cold-start, gateway rollback, UTF-8 state corruption, Discord/BlueBubbles transport bugs).

---

## 2. Releases

None in the last 24h. No migration notes or breaking changes to report.

---

## 3. Project Progress

Two PRs were merged/closed in the window (one confirmed, one outside the visible top 20):

- **[PR #98470 — CLOSED] feat(agent): add validated worker collaboration contracts** ([link](https://github.com/NousResearch/hermes-agent/pull/98470)) — adds a passive, JSON-safe contract layer for worker collaboration (evidence, objectives, capabilities, consensus, worker-mode expectations) that fails closed without changing runtime authority or dispatch. This is the most significant landed change visible today.
- A second merged/closed PR is not shown in the top-20 sample.

**Notable fix PRs opened today (advancing stability):**
- [PR #109252](https://github.com/NousResearch/hermes-agent/pull/109252) — `fix(cron): allow cold external worker startup` (extends ack window 5s → 12s cold-start budget), directly targeting issue #109243.
- [PR #109465](https://github.com/NousResearch/hermes-agent/pull/109465) — `fix(state): degrade undecodable UTF-8 cells instead of aborting session queries` (single corrupt `system_prompts` row currently breaks all session queries).
- [PR #109372](https://github.com/NousResearch/hermes-agent/pull/109372) — approval floor for destructive terminal commands against `HERMES_HOME`.
- [PR #109477](https://github.com/NousResearch/hermes-agent/pull/109477) — Discord thread-rename transport owner preservation.
- [PR #109484](https://github.com/NousResearch/hermes-agent/pull/109484) — BlueBubbles outbound-only webhook path (cron/origin delivery port conflict).
- [PR #109483](https://github.com/NousResearch/hermes-agent/pull/109483) — gateway `/reload-mcp` crash on tuple-keyed multiplexed MCP connections.
- [PR #109249](https://github.com/NousResearch/hermes-agent/pull/109249) — A2A long-running tasks no longer falsely recorded as failed.
- [PR #109250](https://github.com/NousResearch/hermes-agent/pull/109250) — macOS launchd PID polling to avoid false "gateway DOWN" after respawn.
- [PR #109255](https://github.com/NousResearch/hermes-agent/pull/109255) / [PR #109251](https://github.com/NousResearch/hermes-agent/pull/109251) — Windows ZIP-update build-output preservation and missing `get-windows` build resilience.
- [PR #109256](https://github.com/NousResearch/hermes-agent/pull/109256) — dashboard sessions with custom providers no longer report "Setup Required".
- [PR #109253](https://github.com/NousResearch/hermes-agent/pull/109253) — breaks an SDK module cycle restoring desktop runtime plugins.

**Closed issues:** [#101975](https://github.com/NousResearch/hermes-agent/issues/101975) (model auto-correction to wrong Gemini model), [#109448](https://github.com/NousResearch/hermes-agent/issues/109448) (memory/hindsight daemon restarting every session init), plus one additional closed item.

**Observation:** [PR #109478](https://github.com/NousResearch/hermes-agent/pull/109478) and [PR #109481](https://github.com/NousResearch/hermes-agent/pull/109481) are near-identical "fix(gateway): make standalone rollback recoverable" PRs from different authors — possible duplicate effort worth maintainer de-duplication.

---

## 4. Community Hot Topics

| Item | Comments | Signal |
|---|---|---|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — Bot Group Chats should keep working after Desktop closes | **28** (👍1) | Highest-engagement issue of the day |
| [#109243](https://github.com/NousResearch/hermes-agent/issues/109243) — cron external-worker handoff ack 5s vs ~12s cold start | **17** | Fresh, reproducible, fix PR already open |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) — `--initial-status blocked` auto-promotes to `ready`, approval gate bypassed | **16** (👍1) | P1, open since June |
| [#94375](https://github.com/NousResearch/hermes-agent/issues/94375) — `hermes doctor --fix` breaks on npm vulnerabilities | 7 | Dependency hygiene |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) — `hermes config set` bypasses system-config write protection | 6 | Security boundary |
| [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) — MCP OAuth never triggers for non-challenging servers (Gmail MCP) | 6 | Interop gap |

**Underlying needs analysis:**
1. **Persistent, headless, cross-device agent sessions.** #97681 asks for Bot Group Chats that survive Desktop closure and hand off across devices — a demand for server-authoritative session state rather than desktop-tethered runtimes. Related session-state issues: [#84235](https://github.com/NousResearch/hermes-agent/issues/84235), [#109375](https://github.com/NousResearch/hermes-agent/issues/109375).
2. **Deterministic, observable automation.** #109243 and [#109452](https://github.com/NousResearch/hermes-agent/issues/109452) (Kanban re-promotion with no backoff) show users running unattended cron/Kanban workloads and hitting timing assumptions that break at cold start or under repeated failure.
3. **Enforceable security boundaries.** #59293 and [#109440](https://github.com/NousResearch/hermes-agent/issues/109440) reflect a consistent expectation that CLI conveniences must not silently bypass the approval layer.
4. **First-class MCP/OAuth support.** #89412 highlights that reactive-only auth challenges exclude major providers.

---

## 5. Bugs & Stability

**P1 / Critical**
- **[#109440](https://github.com/NousResearch/hermes-agent/issues/109440)** — `hermes chat -q -m <direct alias>` sends the alias's API key to the **default provider's host** (cross-origin credential leak), reproduced on v0.21.2. Tagged `sweeper:risk-security-boundary`, duplicate. **No fix PR visible.**
- **[#107191](https://github.com/NousResearch/hermes-agent/issues/107191)** — `model_aliases` custom `base_url` silently dropped at CLI startup → falls through to OpenRouter with 401. **No fix PR visible.**
- **[#109422](https://github.com/NousResearch/hermes-agent/issues/109422)** — Under `gateway.multiplex_profiles: true`, profiles sharing an OAuth MCP server URL silently adopt each other's authenticated identity. **No fix PR visible.**
- **[#39609](https://github.com/NousResearch/hermes-agent/issues/39609)** — `--initial-status blocked` auto-promoted to `ready` ~1s after creation with no actor, bypassing the human approval gate.

**P2 / High**
- **[#109243](https://github.com/NousResearch/hermes-agent/issues/109243)** — cron external worker ack timeout (5s) shorter than cold start (~12s) → jobs intermittently never run. **Fix PR: [#109252](https://github.com/NousResearch/hermes-agent/pull/109252).**
- **[#102945](https://github.com/NousResearch/hermes-agent/issues/102945)** — unparseable `config.yaml` silently falls back to defaults, discarding all user overrides with only a transient stderr warning.
- **[#109452](https://github.com/NousResearch/hermes-agent/issues/109452)** — Kanban re-promotes a non-sticky blocked card every dispatcher tick: **30 identical model runs in 30 minutes**, no backoff or circuit breaker.
- **[#84235](https://github.com/NousResearch/hermes-agent/issues/84235)** — concurrent turns on the same session act on stale snapshots → duplicate execution and real-world side effects.
- **[#109423](https://github.com/NousResearch/hermes-agent/issues/109423)** — Telegram `allowed_chats` stored as JSON string is mis-parsed → group messages silently dropped.
- **[#90679](https://github.com/NousResearch/hermes-agent/issues/90679)** — Docker backend on Windows: new desktop session cwd set to host path (`D:\.hermes`), every command fails with exit 126.
- **[#108302](https://github.com/NousResearch/hermes-agent/issues/108302)** — Managed Tool Gateway unavailable on every bot profile (missing profile→global-root auth fallback).
- **[#108659](https://github.com/NousResearch/hermes-agent/issues/108659)** — native image/video turns can receive a **previous request's answer** when a custom provider forces `cache_prompt`.
- **[#107511](https://github.com/NousResearch/hermes-agent/issues/107511)** — `hermes config set` re-serializes the whole YAML file, reformatting unrelated list sections.
- **[#95078](https://github.com/NousResearch/hermes-agent/issues/95078)** — nested Hermes inherits stale `TERMINAL_CWD`.

**P3 / Moderate**
- [#109375](https://github.com/NousResearch/hermes-agent/issues/109375) skill background review lost in short-lived Kanban/Group Chat runtimes; [#109063](https://github.com/NousResearch/hermes-agent/issues/109063) desktop plugin routes stale after late registration; [#109480](https://github.com/NousResearch/hermes-agent/issues/109480) profile-switch/dashboard breakage; [#109258](https://github.com/NousResearch/hermes-agent/issues/109258) Telegram `/save md` error (`GatewayRunner` has no `get_adapter`); [#96610](https://github.com/NousResearch/hermes-agent/issues/96610) tool_call bridge arguments empty on schema-constrained backends.

**Stability read:** the volume of *silent-failure* bugs (silent config fallback, silently dropped messages, silently empty tool args, silently wrong answers) is the dominant pattern — an observability/logging gap as much as a correctness gap.

---

## 6. Feature Requests & Roadmap Signals

| Request | Issue/PR | Likelihood of near-term work |
|---|---|---|
| Persistent Bot Group Chats across devices/Desktop closure | [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | High — top community signal, touches sessions/gateway/desktop |
| Unattended autonomous mission lifecycle (supervised background jobs, resource cleanup, persistent task state) | [#82304](https://github.com/NousResearch/hermes-agent/issues/82304) | Medium — `needs-decision`, post-mortem-driven |
| Dependency hygiene gates (`npm-check` + `npm outdated`) before every release | [#102563](https://github.com/NousResearch/hermes-agent/issues/102563) | High — trivial process change; [PR #109240](https://github.com/NousResearch/hermes-agent/pull/109240) already patches 4 vulnerable npm resolutions |
| Refresh ~50+ outdated venv Python packages (incl. `certifi`) | [#83673](https://github.com/NousResearch/hermes-agent/issues/83673) | Medium |
| Per-agent Linux desktops via Realms/VMs | [PR #104567](https://github.com/NousResearch/hermes-agent/pull/104567) | Medium — large, `needs-decision`, still iterating |
| Execution-scope ownership replacing PID/heartbeat stale reclaim | [#84258](https://github.com/NousResearch/hermes-agent/issues/84258) | Medium — security-audit campaign interlock |

**Prediction:** the next release is most likely to carry cron cold-start tolerance, gateway rollback fixes, UTF-8 state resilience, npm security bumps, and possibly the worker collaboration contracts just merged — rather than the larger architectural items (#97681, #82304, #104567), which need decisions.

---

## 7. User Feedback Summary

**Pain points (dissatisfaction):**
- **Config/CLI trust erosion.** Multiple reports that `hermes config set` mutates files unexpectedly (#107511), bypasses security protections (#59293), or that corrupt config silently discards every user setting (#102945). Users describe these as "front door" bypasses of safety layers.
- **Update/install fragility.** Windows (locked `node_modules`, ZIP path wiping build outputs) and macOS (launchd respawn reported as DOWN) updates are recurring friction — see #94375, [#90495](https://github.com/NousResearch/hermes-agent/issues/90495)-related PRs, [#94743](https://github.com/NousResearch/hermes-agent/issues/94743)-related PR #109250.
- **Automation unpredictability.** Cron jobs that "intermittently never run" and Kanban cards that spawn 30 identical model runs erode confidence in unattended operation.
- **Cross-profile/credential ambiguity.** Users running multiplexed profiles expect strict isolation and are finding identity and key leakage between them.
- **Dependency staleness.** A persistent complaint that releases ship with >50 outdated Python packages and known npm vulnerabilities.

**Positive signals:**
- High-quality, reproducible reports with version hashes, environments, and root-cause analysis (e.g. #109243, #109465, #109440) — an engaged, technical user base.
- Maintainer/contributor responsiveness: fix PRs appeared same-day for cron cold start, gateway rollback, Discord renames, BlueBubbles webhooks, and state corruption.
- Users are pushing Hermes into production-like scenarios (multi-bot group chats, rented GPUs, unattended missions), indicating adoption beyond toy usage.

---

## 8. Backlog Watch

Items needing maintainer attention (age, severity, and no visible resolution):

1. **[#39609](https://github.com/NousResearch/hermes-agent/issues/39609)** — P1 approval-gate bypass on blocked tasks. Open since **2026-06-05**, 16 comments, no linked fix PR. Oldest high-severity item in the sample.
2. **[#59293](https://github.com/NousResearch/hermes-agent/issues/59293)** — `needs-decision`, security: `hermes config set` disables the approval layer un-gated. Open since **2026-07-06**.
3. **[#82304](https://github.com/NousResearch/hermes-agent/issues/82304)** — `needs-decision`: unattended mission lifecycle/resources. Open since **2026-08-09**.
4. **[#84235](https://github.com/NousResearch/hermes-agent/issues/84235)** / **[#84258](https://github.com/NousResearch/hermes-agent/issues/84258)** — concurrent-turn stale snapshots (duplicate side effects) and stale-reclaim ownership model. Open since **2026-08-12**; #84258 is tagged `type/security`.
5. **[#89412](https://github.com/NousResearch/hermes-agent/issues/89412)** — MCP OAuth flow gap for non-challenging servers. Open since **2026-08-18**, marked duplicate — deserves a canonical tracking issue.
6. **[#92146](https://github.com/NousResearch/hermes-agent/issues/92146)** — `needs-decision`, security: `HERMES_HOME` exemption short-circuits protected-instruction gate (`SOUL.md`/`AGENTS.md` ungated). Open since **2026-08-22**.
7. **[#94375](https://github.com/NousResearch/hermes-agent/issues/94375)** — `hermes doctor --fix` leaves insecure npm apps (marked duplicate, still open since **2026-08-25**).
8. **[PR #104567](https://github.com/NousResearch/hermes-agent/pull/104567)** — Realms/optional per-agent Linux desktops, open since **2026-09-06**, `needs-decision`; large surface area, needs reviewer bandwidth.

**Backlog risk assessment:** the absence of linked fix PRs on the four P1/security items (#109440, #107191, #109422, #39609) is the single biggest health risk in this snapshot. Additionally, the high proportion of `duplicate`-tagged open issues suggests triage consolidation is lagging behind intake — worth a dedicated dedup pass and canonical tracking issues.

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw Project Digest — 2026-09-13

## 1. Today's Overview
IronClaw showed **low activity** on 2026-09-13: **0 issue updates**, **2 PR updates**, and **0 new releases**. One open PR (#8098) adds regression coverage for turn-state lineage metadata, while one closed PR (#8076) fixes assistant handling for disconnected shared channels. There was no issue-tracker movement, so no new user-reported bugs or feature requests entered the project in this window. Overall project health appears **stable but quiet**, with maintenance, testing, and assistant-behavior fixes rather than release-facing changes.

## 2. Releases
No new releases were published in the last 24h. Latest releases: **None**.  
No breaking changes or migration notes are applicable from this data window.

## 3. Project Progress
- **[CLOSED] [nearai/ironclaw PR #8076](https://github.com/nearai/ironclaw/pull/8076) — fix(assistant): distinguish disconnected shared channels**  
  Author: be-student | Created: 2026-09-06 | Updated: 2026-09-12  
  This closed fix distinguishes a paired user’s disconnected shared channel from an unpaired account, renders channel-specific guidance for both user messages and bot commands, keeps rejection classification consistent across product, adapter, and OpenAI-compatible surfaces, and includes Slack capability updates. It advances assistant channel handling and user-facing guidance.

- **[OPEN] [nearai/ironclaw PR #8098](https://github.com/nearai/ironclaw/pull/8098) — test(turns): pin state-derived lineage drop**  
  Author: huiq777 | Created: 2026-09-12 | Updated: 2026-09-12  
  This open test PR adds the missing inverse regression test beside the existing terminal-rewrite lineage test. It proves claimed metadata initially carries depth, activation provenance, and descendant cap, then pins that a subsequent `TurnRunState`-derived snapshot deliberately omits all three lineage fields. It advances test coverage and regression safety for turn-state lineage behavior.

## 4. Community Hot Topics
No Issues or PRs in the provided data had recorded comments or reactions. Both updated PRs show **0 👍** and **undefined comments**, so there is no genuine “hot topic” discussion today.

The only updated items were:
- [#8076 — fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)
- [#8098 — test(turns): pin state-derived lineage drop](https://github.com/nearai/ironclaw/pull/8098)

Underlying needs suggested by the PR summaries:
- Clearer assistant behavior and guidance when a paired user’s shared channel is disconnected.
- Stronger confidence that turn lineage metadata semantics are intentional and protected by tests.

## 5. Bugs & Stability
No new bugs, crashes, or regressions were reported via Issues in the last 24h: **0 issues updated**.

Relevant PR activity:
- **[CLOSED] [PR #8076](https://github.com/nearai/ironclaw/pull/8076)** appears to address an assistant channel-classification/UX issue: distinguishing a disconnected shared channel from an unpaired account and providing channel-specific guidance. Fix PR exists and is closed. Severity is likely **moderate** based on the summary, with no crash or data-loss indication.
- **[OPEN] [PR #8098](https://github.com/nearai/ironclaw/pull/8098)** is preventive regression-test coverage for turn-state lineage fields, not a reported production bug fix. It pins expected behavior around `TurnRunState`-derived snapshots omitting depth, activation provenance, and descendant cap.

## 6. Feature Requests & Roadmap Signals
No new feature requests were recorded in Issues: **0 issues updated**.

Low-confidence roadmap signals from PR summaries:
- Continued polish around **assistant channel handling**, including disconnected shared channels and Slack capability updates (#8076).
- Continued test hardening for **turn-state lineage metadata** semantics (#8098).

Given the data, the next version is more likely to include **assistant behavior fixes and regression-test improvements** than major new feature work. No version targets or roadmap commitments are present in the provided data.

## 7. User Feedback Summary
No comment/reaction data or new user feedback was available for this window. Pain points inferred only from PR summaries:
- Users and bots may need clearer guidance when a paired user’s shared channel is disconnected rather than unpaired (#8076).
- Developers may need assurance that lineage metadata is intentionally dropped in `TurnRunState`-derived snapshots (#8098).

There is no satisfaction/dissatisfaction metric in the provided dataset.

## 8. Backlog Watch
No long-unanswered Issues or PRs appear in the provided data. There is **no issue backlog** reported today.

The only open PR is:
- [#8098 — test(turns): pin state-derived lineage drop](https://github.com/nearai/ironclaw/pull/8098) — created and updated 2026-09-12, so it is only about one day old. It has 0 reactions and undefined comments; it is not stale, but it is the main item to watch for review/merge.

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw Project Digest — 2026-09-13

**Data snapshot:** 17 issues updated in the last 24h (14 open/active, 3 closed) · 7 PRs updated (7 open, 0 merged/closed) · 0 new releases. All listed issues show 0 👍; activity ranking below is by comment count.

## 1. Today’s Overview

QwenPaw had high issue and PR activity in the last 24h, but no code was merged and no release shipped. Activity is concentrated on stability and compatibility: MCP/ACP protocol handling, workspace-watcher freezes, memory exhaustion, model/session persistence, and plugin-store UX. Community contributors have opened targeted fix PRs for several high-impact bugs, but none have landed yet, so user-visible relief is still pending. Overall project health: strong triage and contributor momentum, offset by unresolved critical stability/security reports and zero merge throughput today.

## 2. Releases

No new releases in the last 24h. No breaking changes or migration notes to report.

## 3. Project Progress

- **Merged/closed PRs today:** 0. No PR code landed.
- **Closed issues today:** 3 — [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676), [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582), [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664). Resolution details are not specified in the dataset.
- **Open PRs advancing fixes/features:**
  - [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) `fix(acp): select permission options by protocol kind` — targets [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726).
  - [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) `fix(mcp): recognize Java jsonRpcError envelope on discover probe` — targets [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728).
  - [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) `fix(workspace): replace blocking watchfiles.awatch SSE watcher with threaded polling` — targets [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721).
  - [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) `fix(console): emit an error event when stream_one fails` — improves failure visibility for clients.
  - [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) `feat(memory): allow a separate model for ReMeLight memory writing` — related to closed [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664).
  - [#7718](https://github.com/agentscope-ai/QwenPaw/pull/7718) `fix(telegram): render approval-card markdown via HTML parse_mode`.
  - [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) `fix(agents): diagnose dropped subagent model overrides` — related to closed [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676).

## 4. Community Hot Topics

Most active issues by comment count:

- [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) — **A2A support on QwenPaw 2.x** (3 comments). Users note architecture docs mention unified MCP/A2A/ACP Driver support, but only MCP is implemented. Underlying need: official A2A timeline and protocol parity.
- [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) — **Configured LLM disappears** (3 comments). Windows desktop 2.2.1 users report model settings vanishing during use. Underlying need: reliable config persistence.
- [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) — **Daily Paper silent failure when arxiv.org is unreachable** (3 comments). Misleading “completed with no returned content” hides proxy/network errors. Underlying need: configurable endpoint/proxy and honest diagnostics.
- [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — **`subagent_model` has no effect** (3 comments, closed). Spawned subagents inherit parent `active_model`. Underlying need: per-task/per-agent model selection.

Other notable active items:

- [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) — session loss plus model loss on desktop 2.2.1 (2 comments).
- [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) — MCP `server/discover` HTTP 500 with Java/Kotlin SDK envelope issue (2 comments; fix PR [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) open).
- [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) — memory exhaustion via three compounding paths (2 comments).
- [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) — MCP cannot connect/register since upgrade to 2.2.x (2 comments).

**PR comment counts were reported as `undefined` in the dataset**, so hot-topic ranking is issue-driven.

## 5. Bugs & Stability

Ranked by severity, with fix-PR status where known:

1. **Critical — [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722): memory exhaustion / OOM / hang.** Unbounded stream buffers, keep-alive instance stacking, and doom-loop gate evasion; controlled repro provided. No direct fix PR listed.
2. **Critical/High — [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721): workspace file browser freezes entire server.** Large workspaces block the event loop via `watchfiles.awatch`/RustNotify sync init. Fix PR [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) open.
3. **High — [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724): conversation/session loss and model loss.** Desktop 2.2.1 user cannot find prior session after interruption. No fix PR listed.
4. **High — [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708): configured LLM disappears.** Recurring Windows desktop 2.2.1 issue; user must reselect model. No fix PR listed.
5. **High — [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727): out-of-workspace write hard-block bypassed by kimi-code Write tool via ACP.** Security-boundary issue; `_paths` extraction misses kimi toolCall fields. No fix PR listed.
6. **High — [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716): MCP cannot connect/register since 2.2.x.** Regression from 2.1.1b3 to 2.2.0/2.2.1. No fix PR listed.
7. **Medium/High — [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728): MCP `server/discover` HTTP 500 with non-standard `jsonRpcError` envelope.** Java/Kotlin MCP SDK servers rejected. Fix PR [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) open.
8. **Medium — [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715): Daily Paper fails silently when arxiv.org unreachable.** No proxy/endpoint config; misleading inbox message. No fix PR listed.
9. **Medium — [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726): ACP `trusted: true` silently falls back to interactive prompts.** `_pick_allow_option` only matches `allow_*` optionIds. Fix PR [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) open.
10. **Medium — [#7720](https://github.com/agentscope-ai/QwenPaw/issues/7720): Creator hides prompt-sync blocker behind GATED.** Lacks manual image acceptance; storyboard generation blocked. No fix PR listed.
11. **Medium — [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730): plugin catalog read failures escape documented offline fallback.** Connection reset/interrupted CDN response yields server error instead of empty catalog with error field. No fix PR listed.

**Regressions to watch:** [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) is explicitly tied to the 2.2.x upgrade. [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) and [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) are recurring desktop 2.2.1 model/session-loss reports.

## 6. Feature Requests & Roadmap Signals

- [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) — **Official A2A support in QwenPaw 2.x.** Open roadmap question; MCP/ACP fixes dominate current work, so A2A may be longer-term unless maintainers confirm a timeline.
- [#7731](https://github.com/agentscope-ai/QwenPaw/issues/7731) — **Files panel toggle for dot-prefixed files/folders.** Low-complexity UI request; plausible near-term enhancement.
- [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) — **DeepSeek native capability metadata, prompt-prefix stability, KV-cache observability.** Provider-level enhancement proposal; may enter provider roadmap if prioritized.
- [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) — **Separate memory model for ReMeLight.** Closed, with implementation PR [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) open; strong candidate for next release if merged.
- [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) — **Plugin store one-click update and update notifications.** Closed UX request; signals continued plugin-marketplace investment.
- [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — **Subagent model override behavior.** Closed, but related diagnostic PR [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) remains open; suggests model-routing work continues.

**Prediction:** The next release is likely to include MCP/ACP compatibility fixes, workspace-watcher unblocking, console error propagation, and possibly `memory_model` configuration if PR #7719 merges. A2A official support remains the biggest open roadmap signal.

## 7. User Feedback Summary

**Pain points reported:**
- Model settings and sessions vanishing on desktop ([#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708), [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724)).
- MCP breakage after 2.2.x upgrade ([#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716), [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728)).
- Whole-server freeze from workspace file browser ([#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721)).
- Memory exhaustion/OOM/hang ([#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)).
- Security-boundary bypass via ACP/kimi-code ([#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727)).
- Plugin-store friction: repeated manual updates and no update notifications ([#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582)).
- Expensive main model used for background memory writing ([#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664)).
- Silent failures and poor diagnostics in Daily Paper and plugin catalog ([#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715), [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730)).
- Creator workflow blocked by GATED status ([#7720](https://github.com/agentscope-ai/QwenPaw/issues/7720)).

**Use cases:** desktop assistant on Windows/macOS, multi-channel operation (Feishu/QQ/OneBot), MCP/ACP integrations, memory/cron jobs, plugin-heavy deployments across multiple machines.

**Sentiment:** The community is active, with concrete repros and first-time-contributor PRs. Dissatisfaction is concentrated on post-2.2.x reliability, config/session persistence, security boundaries, and diagnostics. No merged fixes today, so user-visible relief has not yet landed.

## 8. Backlog Watch

Important open items needing maintainer attention:

- [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) — A2A support timeline; open since 2026-09-02, 3 comments, no official answer visible in data.
- [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) + [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) — model/session loss class; recurring desktop data-loss risk, no fix PR yet.
- [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) — critical memory exhaustion/OOM/hang with controlled repro; needs prioritization.
- [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) — out-of-workspace write bypass via ACP/kimi-code; security-sensitive, only 1 comment.
- [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) — MCP regression since 2.2.x; high impact for integrations, no fix PR yet.
- Open PRs awaiting review/merge: [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680), [#7718](https://github.com/agentscope-ai/QwenPaw/pull/7718), [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719), [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723), [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725), [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729), [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732).
- [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730) — plugin catalog offline fallback gap.
- [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) — DeepSeek provider proposal; and [#7731](https://github.com/agentscope-ai/QwenPaw/issues/7731) — dotfile toggle, both clear-scope feature requests with low comment volume so far.

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw Project Digest — 2026-09-13
_Reporting window: last 24h of GitHub activity, data through 2026-09-12._

## Today's Overview
ZeroClaw showed high activity in the last 24h: 24 issues and 50 PRs were updated, with 6 issues closed and 11 PRs merged/closed, but no new releases. Bug triage centered on Windows advisory nextest failures, runtime history durability, provider retry behavior, memory concurrency, and channel UX. Maintainers and contributors are actively accepting, closing, and following up on P1/P2 issues, while several large security/plugin/runtime PRs remain in review. Project health is strong on throughput, but stability debt is visible in Windows CI and in high-severity data-loss or workflow-blocking bugs.

## Releases
No new releases in the reporting window. No release notes, breaking changes, or migration guidance are available.

## Project Progress
**Closed issues (6):**
- [#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534) — Bounded delegates silently stripped the `delegate` tool, contradicting `delegation_policy`/`max_delegation_depth`.
- [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) — Telegram voice reply skipped when reply started with `[` (ElevenLabs v3 audio tags).
- [#10277](https://github.com/zeroclaw-labs/zeroclaw/issues/10277) — Published `zerorelay` image base tags were pinned by digest.
- [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) — `zeroclaw service logs` printed nothing on macOS, Windows, and OpenRC when daemon was healthy.
- [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) — Cost ledger priced cache writes at plain input rate, understating cache misses.
- [#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436) — Native OpenRouter streaming used a total request timeout and cut off active responses.

**Closed/merged PRs visible in the top-20 sample:**
- [#10726](https://github.com/zeroclaw-labs/zeroclaw/pull/10726) — Pin published relay base images by digest.
- [#10091](https://github.com/zeroclaw-labs/zeroclaw/pull/10091) — Harden response cache storage permissions.
- [#10449](https://github.com/zeroclaw-labs/zeroclaw/pull/10449) — Create Edge TTS artifact with owner-only permissions.
- [#9577](https://github.com/zeroclaw-labs/zeroclaw/pull/9577) — Prove typed plugin config end to end with an in-tree tool fixture.
- [#10169](https://github.com/zeroclaw-labs/zeroclaw/pull/10169) — File ADR-014 plugin egress authority as proposed.

**In-flight work:**
- [#10775](https://github.com/zeroclaw-labs/zeroclaw/pull/10775) — Preserve live sessions when RPC mode replacement fails.
- [#10813](https://github.com/zeroclaw-labs/zeroclaw/pull/10813) — Refuse stale SOP step results and duplicate headless drivers.
- [#10266](https://github.com/zeroclaw-labs/zeroclaw/pull/10266) — Implement `is_direct_message` for WhatsApp Web.
- [#9724](https://github.com/zeroclaw-labs/zeroclaw/pull/9724) — Make `always_ask` survive Full autonomy.
- [#10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401) — Make Telegram unauthorized notice configurable and authorization-aware.
- [#10751](https://github.com/zeroclaw-labs/zeroclaw/pull/10751) — Report full plugin connection budget as connection-limit-reached.

_Note: 11 PRs were merged/closed overall; the provided top-20 sample only exposes 5 closed PRs, so this list is partial._

## Community Hot Topics
Most-commented issues in the reporting window:
- [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — **6 comments**. `RpcDispatcher::process_line` runs within 2% of its 2 MB stack guard, surfaced by Advisory Windows nextest. Underlying need: cross-platform CI reliability and runtime stack safety.
- [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) — **2 comments**. Failed Code/ACP turn discards accepted prompt and completed tool exchanges from durable history. Underlying need: durable, recoverable session history on provider failure.
- [#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534) — **2 comments, closed**. Bounded delegates stripped the delegate tool despite config. Underlying need: configuration and delegation policy consistency.
- [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) — **2 comments, closed**. Telegram TTS voice reply silently skipped when text starts with `[`. Underlying need: predictable channel output modality handling.

PR comment/reaction counts were not provided in the dataset. High-touch PRs by scope and update activity include:
- [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) — Canonical principals and shared grant resolution.
- [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) — Coordinate agent lifecycle mutations.
- [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) — Expose token accounting on history-trim events; marked blocked/do-not-merge.
- [#8862](https://github.com/zeroclaw-labs/zeroclaw/pull/8862) and [#8949](https://github.com/zeroclaw-labs/zeroclaw/pull/8949) — Governed plugin webhook ingress and typed challenge replies.
- [#9139](https://github.com/zeroclaw-labs/zeroclaw/pull/9139) and [#9138](https://github.com/zeroclaw-labs/zeroclaw/pull/9138) — Durable scheduler outbox and typed event routing foundations.

Underlying needs: reliable Windows CI, durable runtime history, consistent tool/config policy, mature plugin platform primitives, and secure identity/permission handling.

## Bugs & Stability
Ranked by severity from the provided data:

- **S0 — data loss:** [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) — Markdown memory backend silently loses stored entries when `store()` calls overlap. P1, risk high, `memory:backend`. No fix PR listed.
- **S1 — workflow blocked:** [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) — MCP connection is permanently poisoned by one failed recovery attempt. No fix PR listed.
- **P1/S2:** [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — `RpcDispatcher::process_line` near 2 MB stack guard on Windows advisory nextest.
- **P1/S2:** [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) — Failed Code/ACP turn discards accepted prompt and completed tool exchanges.
- **P1/high risk:** [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) — zerocode notification lag cancels every running turn via `begin_notification_resync → session/cancel`.
- **P2/S2:** [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) — Single-candidate stream recovery ignores `provider_retries`; overload 529 gets one immediate retry with no backoff.
- **P2/S2:** [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) — `zeroclaw agent` interactive REPL never enables terminal IUTF8; backspace after multi-byte chars deletes raw bytes.
- **P2/S3:** [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793), [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794), [#10805](https://github.com/zeroclaw-labs/zeroclaw/issues/10805) — Multiple Windows advisory nextest failures: Windows-only test failures, publish-contract failure, and control-plane process teardown races.
- **P2:** [#10791](https://github.com/zeroclaw-labs/zeroclaw/issues/10791) — Retire local RPC connections after terminal writer failure.
- **P3:** [#10802](https://github.com/zeroclaw-labs/zeroclaw/issues/10802) — `session/list-acp` reports a different `message_count` than `turn_end`.
- **P3:** [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) — ZeroCode chat input ignores the Delete key.

Closed bugs in the window include [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731), [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699), [#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436), [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689), and [#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534). Most open high-severity bugs do not have a linked fix PR in the provided data.

## Feature Requests & Roadmap Signals
- [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) — Populate `DocumentMessage.jpegThumbnail` so PDFs sent over WhatsApp preview on phones.
- [#10400](https://github.com/zeroclaw-labs/zeroclaw/issues/10400) — Configurable Telegram unauthorized-sender notice, aware of channel authorization path. Implementation PR [#10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401) is open.
- [#8733](https://github.com/zeroclaw-labs/zeroclaw/issues/8733) — models.dev catalog is parsed for model IDs only; per-model capabilities such as vision are discarded.
- [#10792](https://github.com/zeroclaw-labs/zeroclaw/issues/10792) — Clarify Windows recovery after daemon reload refusal.
- [#10789](https://github.com/zeroclaw-labs/zeroclaw/issues/10789) — Localize ZeroCode daemon startup diagnostics.
- Roadmap-scale PR signals: [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) security principals/grants, [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) agent lifecycle coordination, [#9139](https://github.com/zeroclaw-labs/zeroclaw/pull/9139)/[#9138](https://github.com/zeroclaw-labs/zeroclaw/pull/9138) plugin outbox/event routing, [#8908](https://github.com/zeroclaw-labs/zeroclaw/pull/8908) plugin package catalog, and [#10562](https://github.com/zeroclaw-labs/zeroclaw/pull/10562) ADR for holding-crate exceptions.

Likely next-version candidates, if merged, are security identity/permissions, plugin platform maturity, Telegram/WhatsApp channel UX, provider retry/cost correctness, and Windows CI stabilization. No version or release date is signaled in the data.

## User Feedback Summary
Real user pain points are concentrated in silent degradation, data loss, and platform inconsistency:
- Data loss: [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) memory backend concurrency.
- Workflow blocking: [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) MCP recovery poisoning.
- Runtime/session reliability: [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785), [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788).
- Windows CI noise: [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734), [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793), [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794), [#10805](https://github.com/zeroclaw-labs/zeroclaw/issues/10805).
- Terminal/channel UX: [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795), [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796), [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812).
- Provider/cost/logging: [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787), [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699), [#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436), [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731).

No reactions or 👍 were recorded on the listed issues. Sentiment is not captured directly, but the feedback pattern shows active technical users hitting edge cases; maintainers are responsive via closures and follow-up issues. Dissatisfaction is mainly with silent failures and cross-platform inconsistency rather than missing core capabilities.

## Backlog Watch
Items needing maintainer attention or with long-running status:
- [#8733](https://github.com/zeroclaw-labs/zeroclaw/issues/8733) — Since 2026-07-05, 0 comments, P2 `status:no-stale`; models.dev capabilities ignored. Important for model-specific vision support.
- [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) — Since 2026-08-03, `status:blocked`, `do-not-merge`; token accounting on history-trim events.
- [#8862](https://github.com/zeroclaw-labs/zeroclaw/pull/8862) — Since 2026-07-08, `needs-author-action`, stacked; governed plugin webhook ingress.
- [#8949](https://github.com/zeroclaw-labs/zeroclaw/pull/8949) — Since 2026-07-10, `needs-author-action`, stacked; typed plugin webhook challenge replies.
- [#8908](https://github.com/zeroclaw-labs/zeroclaw/pull/8908) — Since 2026-07-09; plugin package catalog.
- [#9139](https://github.com/zeroclaw-labs/zeroclaw/pull/9139) and [#9138](https://github.com/zeroclaw-labs/zeroclaw/pull/9138) — Since 2026-07-18; durable scheduler outbox and typed event routing.
- [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) — Since 2026-08-22, `needs-author-action`; canonical principals/security grants.
- [#10266](https://github.com/zeroclaw-labs/zeroclaw/pull/10266) — Since 2026-08-23, `needs-maintainer-review`; WhatsApp Web direct-message handling.
- [#10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401) — Since 2026-08-26, `needs-author-action`, `stale-candidate`; Telegram unauthorized notice.
- [#10562](https://github.com/zeroclaw-labs/zeroclaw/pull/10562) — Since 2026-09-02, `needs-maintainer-review`; ADR for holding-crate exceptions.
- [#10400](https://github.com/zeroclaw-labs/zeroclaw/issues/10400) — Open, in-progress, risk high; configurable Telegram unauthorized-sender notice.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*