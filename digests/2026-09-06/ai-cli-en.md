# AI CLI Tools Community Digest 2026-09-06

> Generated: 2026-09-05 22:45 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# Cross-Tool Comparison Report — AI CLI Developer Tools
*Community digest data for 2026-09-06*

## 1. Ecosystem Overview

The AI CLI ecosystem has shifted from a model-access race to an operational-reliability contest. Twenty-four hours after the GPT-6 Astra wave, Copilot, Codex, Pi, and OpenCode all shipped Astra-related fixes or support, yet the highest-signal community threads are about session wedges, silent model switches, quota opacity, Windows/WSL path bugs, and update regressions. Long-running autonomous sessions are exposing the same failure classes as distributed systems: cancellation, state consistency, compaction, and audit integrity. In parallel, the runtime frontier is moving toward realtime voice (Codex), daemon-style session management (Qwen Code), and richer agent-tool protocol layers (MCP/ACP hardening across most tools). The practical differentiator for developers is no longer model quality alone, but how honestly and durably each tool manages context, identity, limits, and filesystem state.

## 2. Activity Comparison

Counts below reflect high-signal items captured by each project’s daily digest ("hot issues," "key PRs," "hot discussions"), not full GitHub totals. All seven digests happened to curate exactly 10 hot issues; the discriminating signals in this window are PR throughput, discussion culture, and release cadence.

| Tool | Issues highlighted | PRs highlighted | Discussions highlighted | Release activity (24 h) |
|---|---|---|---|---|
| Claude Code | 10 (2 still open; 8 auto-closed as stale) | 1 | — | None |
| OpenAI Codex | 10 | 16 (10 key + 6 voice-pipeline support PRs) | 9 | `rust-v0.153.4` |
| Gemini CLI | 10 | 11 | — | `v0.60.0-nightly.20260905` |
| GitHub Copilot CLI | 10 | 0 | — | `v1.0.84-1` (adds GPT-6 Astra) |
| OpenCode | 10 | 15 (10 key + 5 additional batch) | —* | `v1.18.29` (fixes `gpt-6-astra` visibility) |
| Pi | 10 | 11 | 3 | `v0.85.1` (adds GPT-6 Astra) |
| Qwen Code | 10 | 10 | — | `v0.23.1-preview.0` + `v0.23.0-nightly.20260905` |

\* OpenCode’s digest explicitly reported no discussion data for the period. "—" means no discussion activity was captured in that tool’s digest; none of these repositories have Issues/PRs disabled upstream.

**Notable community-heat indicators:**

- Claude Code’s Connector multi-account request (#27302) remains the single largest demand signal at 369 👍.
- OpenCode’s memory megathread (#20695) is the most active open thread at 140 comments, with maintainers asking users to stop running LLM-generated diagnoses and provide heap snapshots.
- Copilot CLI’s top request (#1857, cancel queued messages) holds 28 👍 after months; Codex’s top active issue (#41463, Windows/WSL project creation) holds 19 👍.
- Copilot CLI and Claude Code had the least code movement: Copilot had zero PR activity; Claude Code shipped no release and only one open PR (a security-glob fix, #87079).

## 3. Shared Feature Directions

**Windows/WSL as a first-class platform** — Visible across all seven tools, with both correctness and security dimensions:
- Claude Code: Cowork sandbox can write but not unlink on mounted host folders (#55206); zombie processes lock directories (#80769).
- Codex: WSL `AbsolutePathBuf` deserialization failures (#41463/#42984); `Z:\AREA_01` mangled to `Z:\AREA\_01` (#41486).
- Copilot CLI: `Ctrl+H` misread as `Ctrl+Backspace` under WSL2 (#4328); sandboxing unsupported on Windows 25H2 (#4652).
- Gemini CLI: NTFS 8.3 short-name paths bypass safety checks (#29116).
- Qwen Code: Windows validated `@`-file reads lose `O_NOFOLLOW` semantics (#8227).
- Pi: maintainers running an explicit Windows usage survey (#7547); TUI input redraw defects (#6300).
- OpenCode: corrupted Windows binaries shipped in a release (#27963).

**Honest model-state and usage visibility** — Users across six tools report silent model rewrites, phantom entitlement gates, and opaque limit enforcement:
- Copilot: silent switch to GPT-5 mini that stopped mid-task (#4732).
- Gemini: pinned `gemini-2.5-flash` silently rewritten to 3.5 Flash on GA-enabled backends (#29217/#29222).
- Claude Code: Max-plan users blocked by "usage credits"/org-restriction errors that the Desktop app does not show (#82334/#82429).
- OpenCode: `limit.output` silently clamped at 32k (#29363); `max_tokens` never sent in v2 (#47398).
- Codex: 5-hour rolling limit complaints (#40707) and opaque budget burn (#42983).
- Pi: Copilot GPT-6 Astra routed to the unsupported `/chat/completions` endpoint (#9209).

**Long-session resilience and context-lifecycle engineering** — Compaction, output caps, and token overhead are now core reliability topics:
- Claude Code: 1M-context session permanently wedged with no compaction escape (#82402).
- Codex: automatic compaction hangs 20+ minutes and restarts (#43062).
- Copilot: proposal for idle auto-compaction aligned to the ~5-minute prompt-cache TTL (#4724).
- Gemini: AST-aware file reads to reduce token noise and misaligned reads (#22745).
- OpenCode: manual V2 compaction (#40601) and `/handoff` with compressed context (#40578).
- Pi: system-message deltas instead of rewriting the top-level prompt to reduce token churn (#9116/#9117).
- Qwen Code: session rotation and persistent `/focus` quiet mode (#8927/#11093).

**Interrupt, cancellation, and truthful completion** — Agent loops frequently hang, report false success, or cannot be interrupted:
- Copilot: cannot cancel queued messages once submitted (#1857).
- Gemini: MAX_TURNS interruption reported as GOAL success (#22323); generalist agent hangs indefinitely (#21409).
- OpenCode: abort triggered during streaming does not terminate the child process (#40669).
- Pi: extension dialogs racing session teardown leave the TUI stuck on "Working…" (#6978/#9203).
- Claude Code: no write-queueing during upstream 529 outages (#82402).

**Session/history state integrity and audit provenance** — Deleted conversations, lost context, and fabricated transcript content erode trust:
- Codex: deleted conversations persist as ghost entries in Recents and sidebars (#41661/#42768).
- Claude Code: assistant responses occasionally include a fabricated user turn (#81912).
- Pi: `/export` silently drops `display:false` messages that the model actually saw (#8896).
- Qwen Code: approval mode lost across cold resume (#11070); channel settings invisible when workspace is the home directory (#11083).
- Codex discussion #42965 proposes tracking which turn/window produced persisted world state.

**Packaging and auto-update safety** — Update mechanisms are breaking working installations across five tools:
- Copilot: auto-update rewrites the running executable and breaks desktop reconnection (#4728); "Worktree missing" after a runtime upgrade (#4734).
- Pi: 0.85.0 shipped an undeclared static import that broke fresh npm installs (#9132).
- OpenCode: corrupted `opencode-ai` binary on Windows (#27963).
- Claude Code: Intel macOS builds ship AVX2-requiring Bun, causing SIGILL (#75802).
- Qwen Code: release pipeline repeats work and verifies nothing (#11109).

**MCP/ACP/tool-layer hardening** — The agent-tool protocol layer remains a concentrated source of breakage:
- Copilot: `tools/list` refresh timeout permanently strips a server’s tools (#4731); JSON-RPC serialization corrupts `open_canvas` arguments (#4721); research agent told to call nonexistent `github/get_me` (#4729).
- Claude Code: MCP-over-HTTPS fails against newer CA roots; documented env override has no effect (#82202); `**` glob patterns silently exclude top-level files from security rules (PR #87079).
- Gemini: runtime MCP policy checks now align with case-insensitive server-name matching and fail-closed empty allowlists (#29200).
- OpenCode: ACP subagent activity surfaced through the root session with lineage metadata (#40654).

## 4. Differentiation Analysis

**Claude Code** is the governance-first enterprise tool: Connector identity management, notification hooks, sandboxing, and security-pattern enforcement dominate both its roadmap and its bug reports. Its release cadence is the most conservative of the group (none in 24 h), and its dominant feature request — multiple Connector accounts per installation (#27302) — is explicitly an enterprise multi-tenant need. It is also the only tool where tracker hygiene is actively damaging signal: ~28 of the top 30 most-commented issues were auto-closed in one sweep.

**OpenAI Codex** is the distribution-breadth play: CLI, unified ChatGPT/Codex desktop, VS Code extension, Android remote, and now a native realtime voice pipeline (WebRTC, Opus RTP, audio devices). Its PR activity is the highest in the window (16 PRs), driven by an automated merge train. The community surface is also the most discussion-rich, including an "Awesome Codex CLI" ecosystem directory (150+ tools). Its weakness is cross-surface session consistency — ghost chats, iOS synchronization failures, and desktop UI regressions.

**GitHub Copilot CLI** is the stability-first GitHub ecosystem extension. It shipped GPT-6 Astra support quickly but had zero PR activity in the window. The community is concentrated around input/keyboard control (#1857), MCP tooling bugs, and auto-update regressions — suggesting the tool is functionally mature but operationally fragile at the update boundary. Its feature set is deliberately conservative relative to Codex and Claude Code.

**Gemini CLI** is the open-source "unlock the model" project: nightly hardening builds, two independent community P1 fixes in one window, and feature work aimed at letting Gemini models use native POSIX toolchains safely (#19873) plus AST-aware code intelligence (#22745). Security hardening is unusually strong — isolating `~/.gemini` credentials from sandbox containers (#29216), sanitizing runtime env vars, and enforcing envelope provenance for untrusted tool output (#29215).

**OpenCode** is the provider-agnostic compatibility engine. Its PRs normalize loose provider payloads, tolerate nullable fields, handle indexless tool-call deltas, preserve Gemini modality details, and fix Unicode paths in snapshots. It is mid-migration to a 2.0/Go platform, and much of its current pain is split between v1 reliability (memory leaks, output caps) and v2 maturity (missing `max_tokens`, service restart loops). Community contribution volume is high (~40 queued fixes surfaced from an Aug 5 batch), but maintainers are actively fighting low-quality LLM-generated bug diagnoses.

**Pi** is the builder-friendly agent kernel: extension runtime exposed to plugin authors, system-message delta architecture, broad provider routing (Meta/Muse, LLM Gateway, Requesty), and mid-sentence skill invocation. It is the most Windows-immature of the group, with maintainers explicitly surveying Windows usage to prioritize TUI fixes. Its packaging incident (#9132) and quick double-fix are characteristic of a small, fast-moving team with good community feedback loops.

**Qwen Code** is the most "agent-as-service" oriented: daemonized sessions (`qwen serve`), named-session worktrees, IPC controller tokens for trusted remote control, `/loop` cron tasks, and web-shell workflow visualization. Its release cadence is aggressive (two artifacts in 24 h), but its pain points are concentrated in background-session reclamation, silently dropped notifications, and export bloat (19.5 MB HTML exports, `mermaid` flattened into transcripts).

## 5. Community Momentum & Maturity

- **Highest raw demand signals**: Claude Code’s #27302 (369 👍) dwarfs all other single issues, but it has been open since February with no roadmap response — a sign of high demand meeting low transparency. OpenCode’s memory megathread (140 comments, 108 👍) shows sustained community engagement, while Copilot’s queue-cancellation request (28 👍) and Codex’s Windows/WSL issue (19 👍) anchor those communities.

- **Fastest code movement**: Codex (16 PRs, largely an automated voice-pipeline merge train), OpenCode (~15 PRs, mostly community-authored), Gemini CLI (11 PRs including two independent external P1 fixes), and Pi (11 PRs) are iterating fastest. Qwen Code shipped two releases in the window but also spent significant effort on its own CI/release pipeline. Copilot (0 PRs) and Claude Code (1 PR) are the slowest-moving codebases in this snapshot, though both remain active on issue triage.

- **Community contribution culture**: Gemini CLI and Pi have the healthiest external-contributor dynamics — Gemini received two near-identical independent fixes for the same model-pinning bug, and Pi converted a long-requested feature (mid-sentence skill invocation, #8457) into a working PR within the window. OpenCode’s community PR batch is large but noisy. Codex has a rich discussion ecosystem but little visible external code contribution; Copilot and Claude Code show almost none.

- **Tracker maturity concerns**: Claude Code’s stale-bot sweep closed both noise and legitimate, reproducible bug reports, leaving contributors unsure whether issues were seen or fixed. OpenCode’s stale-issue bot has similarly closed valid issues (#21760/#26707). Codex, by contrast, has the most developed discussion-channel culture, with ideas, Q&A, and show-and-tell all active. Gemini, Pi, and Qwen Code still show healthy issue-to-PR conversion rates.

## 6. Trend Signals

1. **Reliability now outranks model novelty in community priorities.** The release window was dominated by Astra support, yet the most-voted issues are about cancellation, path mangling, session wedges, and silent model switches. *For developers: evaluate agent CLIs on failure recovery, not just model access.*

2. **Context management is becoming the new memory management.** Compaction hangs (Codex #43062), silent output caps (OpenCode #29363), 1M-context wedges (Claude #82402), and token-churn reduction (Pi #9116/#9117) all point to context lifecycle as the key long-session constraint. *For developers: prefer tools with manual compaction triggers, transparent output limits, and no silent context drops.*

3. **Cancellation and interrupt semantics are required primitives, not nice-to-haves.** Queued messages cannot be cancelled (Copilot), aborted commands keep running (OpenCode), and MAX_TURNS interruptions are reported as goal success (Gemini). As agents run unattended for hours, false-success reporting is a correctness and audit hazard. *For developers: instrument acceptance criteria and verify state rather than trusting tool-reported completion.*

4. **Windows/WSL adoption will decide enterprise agent reach.** Every tool in this report has a Windows-specific defect cluster, from path mangling to sandbox semantics to TUI input bugs. The platforms that close these gaps will win the enterprise developer segment. *For developers: test agentic workflows under WSL2 and Windows-native modes before standardizing.*

5. **Trust requires provenance and auditability.** Fabricated user turns (Claude #81912), ghost deleted conversations (Codex #41661), exported transcripts that omit model-visible context (Pi #8896), and untrusted tool-output envelope spoofing (Gemini #29215) all erode trust in agent transcripts. *For developers: keep human/agent turns clearly separated, preserve full context in exports, and verify persisted-state provenance.*

6. **Auto-update mechanisms are a live reliability and security risk.** Copilot’s self-replacing executable (#4728), Pi’s broken fresh install (#9132), and Claude’s CPU-incompatible binary (#75802) all demonstrate that update channels can silently break working environments. *For developers: prefer tools with transactional, deferrable updates and pinned-version support.*

7. **Voice and remote control are the next differentiation frontier.** Codex’s realtime WebRTC/Opus work is the clearest signal, but mobile remote control (Claude #82403, Codex Android #38023), controller-token IPC (Qwen #11090), and daemon-style session management all point toward "agent as always-available service." *For developers building on these tools: watch for async/mobile/voice patterns to become standard interfaces, not experimental features.*

**Bottom line for tool selection:** prioritize tools that are transparent about model selection and quota state, offer reliable compaction and cancellation, treat Windows/WSL as first-class, isolate credentials and tool outputs with clear provenance, and ship updates that cannot silently break working sessions. The tools that solve these operational problems will separate themselves from the field faster than those that simply add the next model.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights — 2026-09-06

## 1. Top Skills Ranking

All ranking follows the repository's comment-volume sort. Every PR below is **Open** as of the snapshot date.

1. **skill-creator: `run_eval.py` 0% recall fix** — [#1298](https://github.com/anthropics/skills/pull/1298)
   Fixes `run_eval.py` reporting `recall=0%` for every skill description by installing the eval artifact as a real skill, plus Windows stream-reading, trigger-detection, and parallel-worker fixes. The summary notes issue [#556](https://github.com/anthropics/skills/issues/556) has "10+ independent reproductions" and that the description-optimization loop was "optimizing against noise." The most-discussed PR in the repo.

2. **document-typography skill** — [#514](https://github.com/anthropics/skills/pull/514)
   Adds typographic quality control for AI-generated documents: orphan word wrap, widow paragraph headers, and numbering misalignment. Discussion centers on defects that affect essentially every Claude-generated document and are rarely caught by user review.

3. **scnet-hpc skill** — [#1615](https://github.com/anthropics/skills/pull/1615)
   New skill for operating SCNet HPC clusters via profile-based SSH and Slurm: connection profiles, partition/memory/module guidance, Slurm job generation, cluster discovery, and compute-node workflows. Signals research-computing operations as an emerging Skills domain.

4. **pdf skill case-sensitivity fix** — [#538](https://github.com/anthropics/skills/pull/538)
   Corrects 8 uppercase/lowercase mismatches (`REFERENCE.md` → `reference.md`, `FORMS.md` → `forms.md`) in `skills/pdf/SKILL.md` that break on case-sensitive file systems. High attention because it affects every Linux/macOS user of the official PDF skill.

5. **ODT skill — OpenDocument text & template filling** — [#486](https://github.com/anthropics/skills/pull/486)
   Adds creation, filling, reading, and conversion for `.odt`/`.ods` files, plus ODT→HTML parsing, with explicit triggers for LibreOffice/OpenDocument requests. Part of a strong document-format demand cluster.

6. **frontend-design skill revision** — [#210](https://github.com/anthropics/skills/pull/210)
   Revises the official frontend-design skill for clarity, actionability, and internal coherence so every instruction is executable within one conversation. Discussed from January through March; the conversation centers on prompt specificity versus generic design advice.

7. **skill-quality-analyzer + skill-security-analyzer** — [#83](https://github.com/anthropics/skills/pull/83)
   Adds two meta-skills to the example marketplace: a 5-dimension quality analyzer (structure/docs 20%, examples, resources) and a complementary security analyzer — a direct response to the community's growing trust-and-quality concerns.

8. **docx tracked-change ID collision fix** — [#541](https://github.com/anthropics/skills/pull/541)
   Prevents document corruption when tracked-change `w:id` values collide with existing bookmarks in OOXML — a subtle but dangerous correctness bug in the official DOCX skill's examples.

## 2. Community Demand Trends

From the issue tracker, the strongest demand directions:

- **Skill-creator tooling reliability** — Issue [#556](https://github.com/anthropics/skills/issues/556) ("0% trigger rate across all queries", 12 comments, 7 👍) is the most-discussed bug and has spawned at least three independent fix PRs ([#1298](https://github.com/anthropics/skills/pull/1298), [#1099](https://github.com/anthropics/skills/pull/1099), [#1050](https://github.com/anthropics/skills/pull/1050)). The community is spending significant effort making Skill evaluation work correctly, including on Windows.
- **Trust, security & provenance** — Issue [#492](https://github.com/anthropics/skills/issues/492) (43 comments — the most-commented issue in the repo) argues that community skills distributed under the `anthropic/` namespace enable trust-boundary abuse and permission escalation.
- **Org-wide sharing & distribution** — Issue [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍) requests org-level skill libraries/direct sharing in Claude.ai rather than manual .skill file transfers.
- **Duplicate plugin content** — Issue [#189](https://github.com/anthropics/skills/issues/189) (9 👍 — highest 👍 count): `document-skills` and `example-skills` plugins install identical skills, doubling context usage; the community wants clean, non-overlapping packaging.
- **Context-window efficiency** — Issue [#1487](https://github.com/anthropics/skills/issues/1487) reports the `claude-api` skill eagerly injecting ~156k tokens in a single tool call. Token discipline for skill references is becoming a review criterion.
- **Meta-skills for long-running agents** — Proposals for agent governance ([#412](https://github.com/anthropics/skills/issues/412)), compact symbolic agent memory ([#1329](https://github.com/anthropics/skills/issues/1329), 9 comments), and reasoning quality-gate pipelines ([#1385](https://github.com/anthropics/skills/issues/1385)) show demand for skills that supervise agents, not just domain knowledge.

## 3. High-Potential Pending Skills

Actively discussed, not-yet-merged PRs with the most recent activity:

- **buffer-api Agent Skill (Buffer GraphQL)** — [#1627](https://github.com/anthropics/skills/pull/1627) — updated 2026-09-05 (day before snapshot): social post scheduling/analytics, portable across Claude, Cursor, Codex, n8n, and more.
- **claude-api: retire four model IDs** — [#1607](https://github.com/anthropics/skills/pull/1607) — updated 2026-09-01: straightforward maintenance fix marking deprecated models; likely to land quickly.
- **UIZZE partner skill** — [#1595](https://github.com/anthropics/skills/pull/1595) — updated 2026-08-29: free anti-UI-slop design skill with optional authenticated MCP reference retrieval from 800,000+ screens.
- **scnet-hpc** — [#1615](https://github.com/anthropics/skills/pull/1615) — updated 2026-08-24: HPC cluster operations (see Top Skills).
- **Hivemind: zero-cost multi-agent orchestration** — [#1628](https://github.com/anthropics/skills/pull/1628) — updated 2026-08-24: Claude Code stays planner/reviewer/merger while headless opencode workers on free models execute mechanical work.
- **ServiceNow platform skill** — [#568](https://github.com/anthropics/skills/pull/568) — updated 2026-08-12: broad enterprise coverage — ITSM, ITOM, SAM/ITAM, FSM, HR/CSM, SPM, CSDM, and IntegrationHub.
- **pyxel retro-game development skill** — [#525](https://github.com/anthropics/skills/pull/525) — updated 2026-07-15: MCP-driven workflow for the Pyxel 8-bit engine: write → run_and_capture → inspect → iterate.
- **self-audit (v1.3.0)** — [#1367](https://github.com/anthropics/skills/pull/1367) — updated 2026-07-02: mechanical file verification first, then a four-dimension reasoning audit in damage-severity order before delivering output.

Two slower-moving but substantial submissions remain strong candidates: **document-typography** ([#514](https://github.com/anthropics/skills/pull/514), open since March with sustained discussion) and **testing-patterns** ([#723](https://github.com/anthropics/skills/pull/723), Testing Trophy methodology covering unit/React testing and what *not* to test).

## 4. Skills Ecosystem Insight

Across PRs and issues alike, the community's most concentrated demand is not for any single vertical skill but for **trustworthy skill infrastructure** — fixing the skill-creator evaluation pipeline, securing the `anthropic/` namespace's trust boundary, and eliminating duplicate or context-window-heavy skill loading.

---

# Claude Code Community Digest — 2026-09-06

## Today's Highlights
No new releases shipped in the last 24 hours. The issue tracker shows heavy stale-bot maintenance: roughly 28 of the top 30 most-commented issues were auto-closed on 2026-09-05, leaving only the Connector multi-account feature request ([#27302](https://github.com/anthropics/claude-code/issues/27302), 369 👍) and the Windows Cowork sandbox bug ([#55206](https://github.com/anthropics/claude-code/issues/55206), 15 comments) active. Many closed items were genuine, reproducible reports that appear to have aged out without a publicly visible fix.

## Hot Issues

**Still open**

- [#27302 — Support multiple Connector accounts (same connector, different accounts)](https://github.com/anthropics/claude-code/issues/27302) — The dominant demand signal on the tracker by far, with 242 comments and 369 👍 since February. Enterprise and multi-tenant users want to switch between Connector identities for `claude.ai/code` without re-authenticating. Community reaction is overwhelmingly positive, but there is still no roadmap signal from the team.

- [#55206 — Cowork on Windows: sandbox can create files on mounted host folders but unlink is denied](https://github.com/anthropics/claude-code/issues/55206) — A well-scoped, reproducible bug where sandboxed Bash on Windows can write but not delete, breaking every `git` write operation in Cowork sessions. 15 comments and 11 👍 make this the most active open bug report in the window; multiple users corroborate the repro.

**Closed as stale (not necessarily fixed)**

- [#82402 — Long session unrecoverable after 529, then "Prompt is too long" with no compaction escape](https://github.com/anthropics/claude-code/issues/82402) — A 1M-context Opus session wedged permanently: writes blocked during an upstream 529, then an oversized tool result made the session unrecoverable. Highlights two reliability gaps: no write-queueing during upstream outages and no escape hatch when a single tool result overflows context.

- [#81912 — Assistant response occasionally includes a fabricated user turn](https://github.com/anthropics/claude-code/issues/81912) — The model appended a contextually plausible `user:` message the human never sent. For agentic coding tools, this is an audit-integrity concern; it received little triage before the stale sweep.

- [#82334 — Model switching blocked by "organization settings" on a personal account](https://github.com/anthropics/claude-code/issues/82334) — User was stranded on Fable 5 with `/model` rejected by an org-restriction error despite using a personal account. Part of a late-July cluster of Fable-era entitlement problems; see also [#82429](https://github.com/anthropics/claude-code/issues/82429) and [#82404](https://github.com/anthropics/claude-code/issues/82404).

- [#82429 — Fable model blocked by "manage usage credits" prompt despite 100% credits remaining](https://github.com/anthropics/claude-code/issues/82429) — The CLI showed a pay-per-credit billing gate to a Max subscriber, while the Desktop app allowed the same model. Suggests a CLI entitlement-check bug rather than a real credit problem. Low comment count but high confusion potential.

- [#81788 — Notification hooks (permission_prompt/idle_prompt) never fire in Desktop app](https://github.com/anthropics/claude-code/issues/81788) — The same hooks work for `Stop` events in Desktop and for all events in the CLI. Silent failure of notification infrastructure is painful for teams relying on Desktop for approvals and idle alerts.

- [#75802 — darwin-x64 ships AVX2-requiring Bun; SIGILL on pre-Haswell Intel Macs](https://github.com/anthropics/claude-code/issues/75802) — Since v2.1.113, older Intel Macs crash with `Illegal instruction: 4`, while linux-x64 ships a baseline build. Closed as duplicate/stale, but there is no sign of a packaging alignment fix.

- [#82202 — Linux native binary fails MCP-over-HTTPS against newer CA roots; CLAUDE_CODE_CERT_STORE has no effect](https://github.com/anthropics/claude-code/issues/82202) — A valid Let's Encrypt chain anchored on newer ISRG roots fails with `UNKNOWN_CERTIFICATE_VERIFICATION_ERROR` in the native binary, while every other TLS stack on the machine verifies it. The documented environment override is non-functional.

- [#80769 — Windows PID-verification PowerShell probe leaves permanently unkillable zombie processes](https://github.com/anthropics/claude-code/issues/80769) — A 1000 ms internal probe spawns processes that survive and lock the project directory. Filesystem-lock issues like this are a recurring Windows-specific frustration with no workaround suggested before auto-close.

## Key PR Progress

Only one pull request was active in this window:

- [#87079 — fix(security-guidance): make ** glob patterns match zero-depth paths](https://github.com/anthropics/claude-code/pull/87079) — A community fix for a silent security-rule gap. Because matching delegates to `fnmatch`, a bare `*` already crosses `/`, so `**/*.ts` requires a literal `/` and excludes top-level files from `security-patterns.json` — even though the docstring promises `**` matches "any depth". For security exclusions, silent non-coverage is the worst failure mode, making this PR worth tracking closely.

No other PRs were opened, merged, or updated in the last 24 hours.

## Feature Request Trends

- **Multi-account and identity switching** — [#27302](https://github.com/anthropics/claude-code/issues/27302) dwarfs everything else on the tracker. The clear ask: let one installation hold multiple Connector accounts and switch between them per session or project. Enterprise users are effectively blocked from adopting Connectors in organizations with several identities.

- **Remote and mobile control** — [#82403](https://github.com/anthropics/claude-code/issues/82403) proposes starting a new Claude Code session from mobile in the host session's local directory. Complements the earlier "remote control" direction and suggests users want Claude Code to behave like a daemon they can drive from anywhere.

- **Plugin scoping and config-path consistency** — Users expect project-scoped plugins ([#74612](https://github.com/anthropics/claude-code/issues/74612)) and custom `CLAUDE_CONFIG_DIR` ([#82428](https://github.com/anthropics/claude-code/issues/82428)) to work identically across CLI, VS Code, and the Desktop app. Currently behavior silently diverges by surface.

- **Model-state persistence** — [#80272](https://github.com/anthropics/claude-code/issues/80272): resuming a 1M-context session keeps the model family but silently drops the `[1m]` variant until the picker is reopened. Users want the model selection to be sticky and honestly displayed on resume.

## Developer Pain Points

- **Entitlement and billing confusion around new models** — A cluster of reports ([#82429](https://github.com/anthropics/claude-code/issues/82429), [#82404](https://github.com/anthropics/claude-code/issues/82404), [#82334](https://github.com/anthropics/claude-code/issues/82334), [#82401](https://github.com/anthropics/claude-code/issues/82401)) shows Max-plan users being blocked by "usage credits required" gates or phantom org restrictions in the CLI. The community reaction is frustration: the errors contradict their plan status and the Desktop app.

- **Sandbox and safety false positives** — Recurring complaints that guardrails block legitimate work: refusing to type repo-provided credentials into the user's own app ([#81771](https://github.com/anthropics/claude-code/issues/81771)), "overly aggressive" filter rejections on routine tasks ([#82415](https://github.com/anthropics/claude-code/issues/82415), [#82411](https://github.com/anthropics/claude-code/issues/82411)), the Windows unlink denial ([#55206](https://github.com/anthropics/claude-code/issues/55206)), and the macOS sandbox blocking its own zsh `eval` wrapper with exit 126 ([#77466](https://github.com/anthropics/claude-code/issues/77466)).

- **Cross-platform inconsistency** — Windows-specific breakage (zombie processes locking directories [#80769](https://github.com/anthropics/claude-code/issues/80769), Cowork sandbox semantics [#55206](https://github.com/anthropics/claude-code/issues/55206), VS Code plugin scoping [#74612](https://github.com/anthropics/claude-code/issues/74612)), an Intel-macOS packaging regression ([#75802](https://github.com/anthropics/claude-code/issues/75802)), and Linux CA-bundle staleness ([#82202](https://github.com/anthropics/claude-code/issues/82202)). The pattern: a feature ships on one platform or surface and behaves differently elsewhere.

- **Long-session fragility** — Sessions can become permanently wedged by upstream 529s plus oversized tool results ([#82402](https://github.com/anthropics/claude-code/issues/82402)), stream stalls ([#81609](https://github.com/anthropics/claude-code/issues/81609)), or fabricated turns that corrupt the transcript ([#81912](https://github.com/anthropics/claude-code/issues/81912)). Power users running long automation sessions are the ones hitting these, and they have no recovery path.

- **Tracker hygiene vs. real signal** — A meaningful share of the swept issues were AI-agent-filed or low-signal ([#82211](https://github.com/anthropics/claude-code/issues/82211), [#82430](https://github.com/anthropics/claude-code/issues/82430), [#82420](https://github.com/anthropics/claude-code/issues/82420), [#82425](https://github.com/anthropics/claude-code/issues/82425)). The stale-bot sweep on 2026-09-05 closed both noise and legitimate bug reports alike, leaving contributors unsure whether their issues were seen or fixed.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-06

## Today's Highlights

OpenAI shipped `rust-v0.153.4`, which fixes Astra visibility in the bundled model picker and makes Astra the default when no model is explicitly configured. PR activity this cycle was dominated by an automated merge train laying groundwork for a native realtime voice pipeline (WebRTC, Opus RTP, audio devices), alongside useful CLI improvements such as `/copy` for `/status` output and managed worktrees for interactive sessions. On the community side, the most heated thread remains Windows + WSL project-creation failures (#41463, 29 comments, 19 👍), joined by a wave of desktop sidebar/session-state bugs.

## Releases

**rust-v0.153.4** — Bug-fix release:
- Fixed Astra’s visibility in the bundled model picker and made it the bundled default when no model is explicitly configured. (#42874)
- Updated Astra’s guidance to use asynchronous questions only when the tool is available in the session. (#42878)

[Full changelog](https://github.com/openai/codex/releases)

## Hot Issues

1. **[#41463 — Windows + WSL: Cannot create projects — AbsolutePathBuf deserialized without base path](https://github.com/openai/codex/issues/41463)**  
   The most-voted active issue (19 👍, 29 comments). Project creation in the Windows desktop app fails under WSL2 due to an `AbsolutePathBuf` deserialization error. A follow-up, [#42984](https://github.com/openai/codex/issues/42984), reports the same root cause after switching from Windows-native to WSL mode.

2. **[#38023 — Android Remote cannot start turns in an idle large task](https://github.com/openai/codex/issues/38023)**  
   A 30-second `turn/start` timeout makes the Android remote permanently unusable for large, long-running tasks while the task view remains unhydrated. Raises real questions about mobile-client timeout and task hydration design.

3. **[#37884 — New ChatGPT App: scrolling issues on macOS](https://github.com/openai/codex/issues/37884)**  
   Long-standing UI regression (11 comments) in the unified ChatGPT/Codex app; scrolling in long conversations behaves erratically. Community reports suggest the new view layer needs a pass on scroll-state fidelity.

4. **[#39933 — Windows IDE extension cannot execute commands: `helper_unknown_error`](https://github.com/openai/codex/issues/39933)**  
   VS Code extension on Windows fails with `helper_unknown_error: setup refresh had errors`. Windows helper reliability is a recurring blocker for IDE users.

5. **[#42583 — macOS: Composer disappears after first message](https://github.com/openai/codex/issues/42583)**  
   6 👍 in 3 days. The composer vanishes after the first turn and only returns after relaunch or opening a new window — a severe app-level regression for daily Chat/Codex use.

6. **[#41661 — Deleted conversations remain stuck in Recents on macOS](https://github.com/openai/codex/issues/41661)**  
   Conversations deleted on the server stay as ghost entries in `Chat > Recents` and return `404 conversation_deleted`. Related report: [#42768](https://github.com/openai/codex/issues/42768) shows the same ghost-entry behavior in the Codex project sidebar.

7. **[#41486 — Windows path mangling: `Z:\AREA_01` sent to model as `Z:\AREA\_01`](https://github.com/openai/codex/issues/41486)**  
   UI displays paths correctly but client-side serialization inserts a spurious backslash before underscores. Dangerous for any agentic file operation; 3 👍 and community-made repro.

8. **[#39846 — Windows 11: desktop continuously flickers on AMD Ryzen iGPU](https://github.com/openai/codex/issues/39846)**  
   Flickering on Radeon integrated graphics (Ryzen 7 9700X). Pairs with the earlier macOS flicker report [#35101](https://github.com/openai/codex/issues/35101), suggesting GPU/compositing robustness issues across platforms.

9. **[#37192 — OAuth fallback silently uses hardcoded "dummy" API key after network change](https://github.com/openai/codex/issues/37192)**  
   After a network switch, the CLI silently falls back to a hardcoded dummy key instead of re-authenticating, producing confusing 401s. A correctness and trust issue for OAuth-based CLI users; related macOS report [#41975](https://github.com/openai/codex/issues/41975).

10. **[#43062 — Automatic context compaction hangs 20+ minutes and restarts on GPT-6 Astra Ultra](https://github.com/openai/codex/issues/43062)**  
   Long-running Windows threads hit an unstoppable compaction loop on GPT-6 Astra Ultra. Users with multi-hour agentic sessions are increasingly hitting context-management edge cases.

## Key PR Progress

1. **[#43097 — Add a helper-backed realtime WebRTC session API](https://github.com/openai/codex/pull/43097)**  
   New `RealtimeWebrtcSession` with startup, answer negotiation, audio controls, level meters, and error reporting. Devices open only after negotiation — clean baseline for voice in the helper.

2. **[#43090 — Send processed microphone audio over RTP in voice-host](https://github.com/openai/codex/pull/43090)**  
   Connects capture to the outgoing media track with resampling, mute-boundary preservation, and stale-audio limits. Previously, captured audio was drained locally and never sent to the peer.

3. **[#43100 — Add bounded incoming Opus RTP handling to the voice host](https://github.com/openai/codex/pull/43100)**  
   Adds memory bounds (64 packets / 2 MiB) and per-packet limits for incoming Opus RTP, preserving arrival timestamps without duplicate queuing — important hardening for realtime media.

4. **[#43069 — Support managed worktrees for interactive sessions and forks](https://github.com/openai/codex/pull/43069)**  
   Extends `--worktree` beyond `codex exec` to interactive sessions, resolving configuration/policy for the destination before the first turn.

5. **[#43055 — Allow `/copy` to copy status output and individual fields](https://github.com/openai/codex/pull/43055)**  
   After `/status`, the copy picker now offers whole status, model, full directory, and individual fields — a nice CLI UX parity fix.

6. **[#43113 — Save subagent and memory opt-ins through the app server](https://github.com/openai/codex/pull/43113)**  
   Routes TUI subagent/memory enable prompts through server config writes for new threads, reporting success/override/failure without mutating the current thread.

7. **[#43110 — Record reasoning effort changes in conversation history behind a flag](https://github.com/openai/codex/pull/43110)**  
   For OpenAI models with `use_responses_lite`, appends a trusted `configuration_update` when effort is not established — improves session auditability under a disabled-by-default flag.

8. **[#43079 — Add opt-in local audio devices to the voice helper](https://github.com/openai/codex/pull/43079)**  
   Adds `openDevices`/`setAudioControls` over CPAL on macOS, Linux, and Windows, with devices initially muted and suppressed — safe default for private audio.

9. **[#43043 — Avoid filesystem scans when seeding the agents overview](https://github.com/openai/codex/pull/43043)**  
   Uses `use_state_db_only` for recent-thread list requests, eliminating startup filesystem scans for unindexed rollouts. Good performance hygiene for large agent histories.

10. **[#43074 — Show a retryable error when the apps popup fails to load](https://github.com/openai/codex/pull/43074)**  
    Replaces the infinite "Loading apps..." state with a failure message plus Retry action when `/apps` initial fetch fails.

Supporting the voice theme are the Bazel/native build PRs [#43117](https://github.com/openai/codex/pull/43117), [#43114](https://github.com/openai/codex/pull/43114), [#43111](https://github.com/openai/codex/pull/43111), [#43109](https://github.com/openai/codex/pull/43109), [#43102](https://github.com/openai/codex/pull/43102), and [#43099](https://github.com/openai/codex/pull/43099).

## Hot Discussions

### Ideas
- **[#37693 — Keyboard shortcuts to jump between user messages](https://github.com/openai/codex/discussions/37693)** — 3 👍 for configurable "jump to previous/next user message" commands that anchor the nearest user-authored message at top of conversation.
- **[#28073 — Clickable user prompt navigator for current conversation](https://github.com/openai/codex/discussions/28073)** — Visual index of user prompts within one thread; complements the keyboard jump idea above.
- **[#42965 — Track source turn/window provenance for persisted world state](https://github.com/openai/codex/discussions/42965)** — Suggests recording which turn/window produced persisted state to avoid stale updates across context windows.

### Q&A
- **[#37960 — How do you coordinate local and remote coding agents using different model vendors?](https://github.com/openai/codex/discussions/37960)** — Practical discussion on orchestrating a local client agent (Claude) and a remote server agent (Codex/GPT) across machines.
- **[#30870 — MCP install headers via CLI](https://github.com/openai/codex/discussions/30870)** — Users want `--header` support like Claude CLI instead of manually editing `.toml`, citing onboarding friction.

### Show and tell
- **[#16329 — Awesome Codex CLI: curated list of 150+ ecosystem tools](https://github.com/openai/codex/discussions/16329)** — Categorized list of subagents, skills, plugins, and MCP servers; the closest thing to a Codex ecosystem directory.
- **[#42913 — Craft Studio: free Codex sampler](https://github.com/openai/codex/discussions/42913)** — Product brief, copy revision, and frontend critique workflows with editable templates.

### General
- **[#40707 — 5 hours limit is back](https://github.com/openai/codex/discussions/40707)** — 4 👍; users prefer the weekly-only limit and find the additional rolling 5-hour cap disruptive for intensive days.
- **[#42983 — Usage limits feel broken](https://github.com/openai/codex/discussions/42983)** — Reports that low-tier Luna burns the 5h budget nearly as fast as Astra high, making limits opaque and hard to plan around.

## Feature Request Trends

- **Conversation navigation & history hygiene.** The recurring combination of ghost/deleted conversations, lost Recents content, missing sidebar threads, and requests for jump-to-prompt navigation indicates desktop session management is a top user priority. ([#41661](https://github.com/openai/codex/issues/41661), [#42768](https://github.com/openai/codex/issues/42768), [#37693](https://github.com/openai/codex/discussions/37693), [#28073](https://github.com/openai/codex/discussions/28073))
- **Transparent usage limits and model controls.** Complaints about the 5-hour limit ([#40707](https://github.com/openai/codex/discussions/40707)), fast budget burn ([#42983](https://github.com/openai/codex/discussions/42983)), and difficulty defining multiple models per provider ([#6241](https://github.com/openai/codex/discussions/6241)) point to demand for finer-grained, user-visible usage and model configuration.
- **Skills/plugin provenance and access.** Users want to know where a skill comes from when names collide ([#39459](https://github.com/openai/codex/issues/39459)), expect official plugins like Computer Use on Windows ([#41281](https://github.com/openai/codex/issues/41281)), and hit access walls for project-scoped memory/plugins ([#43088](https://github.com/openai/codex/issues/43088)).
- **Agent/session isolation semantics.** Subagents posting progress into unrelated threads ([#42935](https://github.com/openai/codex/issues/42935)) and internal OpenClaw sessions appearing as top-level chats ([#42992](https://github.com/openai/codex/discussions/42992)) show users want cleaner task-parenting and visibility boundaries.

## Developer Pain Points

- **Windows/WSL filesystem issues are the top recurring cluster.** `AbsolutePathBuf` project-creation failures ([#41463](https://github.com/openai/codex/issues/41463), [#42984](https://github.com/openai/codex/issues/42984)), underscore path mangling ([#41486](https://github.com/openai/codex/issues/41486)), and Windows IDE/helper setup errors ([#39933](https://github.com/openai/codex/issues/39933)) all block core coding workflows on Windows.
- **Auth reliability.** Silent fallback to hardcoded "dummy" keys after network change ([#37192](https://github.com/openai/codex/issues/37192)) and 401s while the same token works via curl ([#41975](https://github.com/openai/codex/issues/41975)) erode trust in OAuth-based CLI/desktop flows.
- **Session state sync across clients.** Deleted chats persisting as ghosts on macOS ([#41661](https://github.com/openai/codex/issues/41661)), iOS failing to load CLI-paginated threads ([#38889](https://github.com/openai/codex/issues/38889)), and account switches resurrecting stale turns ([#42971](https://github.com/openai/codex/issues/42971)) indicate cross-surface consistency is still fragile.
- **Performance at long-context scale.** Large idle tasks time out on mobile ([#38023](https://github.com/openai/codex/issues/38023)), compaction loops for 20+ minutes ([#43062](https://github.com/openai/codex/issues/43062)), and startup filesystem scans slow down the agents overview — all symptoms of context/state management not yet scaling to heavy agentic use.
- **Desktop UI regressions.** Repeated reports of scrolling glitches ([#37884](https://github.com/openai/codex/issues/37884)), disappearing composers ([#42583](https://github.com/openai/codex/issues/42583)), and GPU flicker on both macOS and Windows ([#39846](https://github.com/openai/codex/issues/39846), [#35101](https://github.com/openai/codex/issues/35101)) suggest the unified ChatGPT/Codex desktop shell needs a stabilization pass.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-06

## 1. Today's Highlights

The latest nightly build ([v0.60.0-nightly.20260905.g85aca163f](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260905.g85aca163f)) focuses on hardening: extensions now must prompt for environment changes, runtime-altering env vars are sanitized, and workspace path-boundary checks with symlink resolution were strengthened. Meanwhile, two independent contributors submitted near-identical P1 fixes to stop silently rewriting an explicitly pinned `gemini-2.5-flash` model to `gemini-3.5-flash`, and agent reliability continues to dominate the open issue tracker.

## 2. Releases

### v0.60.0-nightly.20260905.g85aca163f

- **fix(extensions):** Prompt for consent on environment changes and sanitize runtime-altering environment variables ([#28863](https://github.com/google-gemini/gemini-cli/pull/28863), by @amelidev)
- **fix(core):** Enhance workspace path-boundary checks and symlink resolution in the command-safety layer

The release is otherwise an automated nightly version bump ([#29218](https://github.com/google-gemini/gemini-cli/pull/29218)).

## 3. Hot Issues

High-signal issues updated in the last 24 hours:

- [**#22323**](https://github.com/google-gemini/gemini-cli/issues/22323) — **Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption.** The subagent reports `status: "success"` / `Termination Reason: "GOAL"` even when it hit its turn limit before doing any analysis. This is dangerous because the main agent cannot tell that work was never completed. 13 comments.
- [**#21409**](https://github.com/google-gemini/gemini-cli/issues/21409) — **Generalist agent hangs.** Any task deferred to the generalist agent can hang indefinitely — one user waited an hour before canceling. Instructing the model not to use subagents is the only reliable workaround. 8 👍 and 8 comments make this one of the most acute P1 agent bugs.
- [**#19873**](https://github.com/google-gemini/gemini-cli/issues/19873) — **Leverage the model's bash affinity via zero-dependency OS sandboxing and post-execution intent routing.** The proposal would let Gemini 3 models safely use native POSIX toolchains instead of being constrained away from their strengths. 9 comments.
- [**#25166**](https://github.com/google-gemini/gemini-cli/issues/25166) — **Shell command execution gets stuck with "Waiting input" after the command completes.** Happens repeatedly for trivial commands that never await input. Users must intervene manually; 3 👍.
- [**#21968**](https://github.com/google-gemini/gemini-cli/issues/21968) — **Gemini does not use skills and sub-agents enough.** The model ignores well-described custom skills (e.g., `gradle`, `git`) unless explicitly instructed to use them. 6 comments.
- [**#22745**](https://github.com/google-gemini/gemini-cli/issues/22745) — **EPIC: Assess AST-aware file reads, search, and mapping.** Would allow method-boundary-precise reads with a single tool call, reducing both token noise and misaligned reads. 7 comments.
- [**#22232**](https://github.com/google-gemini/gemini-cli/issues/22232) — **Enhance browser_agent resilience with automatic session takeover and lock recovery.** The current fail-fast strategy on locked persistent browser profiles makes legitimate recovery impossible. 4 comments.
- [**#26525**](https://github.com/google-gemini/gemini-cli/issues/26525) — **Add deterministic redaction and reduce Auto Memory logging.** Auto Memory sends transcript content to the model before prompt-based redaction has a chance to run, and the service can log existing skills. Security-relevant with 5 comments.
- [**#24246**](https://github.com/google-gemini/gemini-cli/issues/24246) — **400 error with very large tool sets.** Gemini CLI hits API request limits once too many tools are available; users want smarter scoping of enabled tools. 3 comments.
- [**#20079**](https://github.com/google-gemini/gemini-cli/issues/20079) — **Symlinked agent `.md` files are not recognized.** Users who manage `~/.gemini/agents/` via dotfile symlinks find their custom agents silently ignored. 4 comments.

## 4. Key PR Progress

Notable pull requests updated in the last 24 hours:

- [**#29222**](https://github.com/google-gemini/gemini-cli/pull/29222) / [**#29217**](https://github.com/google-gemini/gemini-cli/pull/29217) — **Don't rewrite explicitly pinned `gemini-2.5-flash`.** Two independent P1 fixes stop `isFlashModel()`'s broad `endsWith('flash')` match from silently upgrading pinned 2.5 Flash to 3.5 Flash on GA-enabled backends — a regression that breaks environments without 3.5 access.
- [**#29200**](https://github.com/google-gemini/gemini-cli/pull/29200) — **Enforce MCP policy consistently at runtime.** Aligns runtime checks with case-insensitive, whitespace-trimmed server-name matching and treats an explicit empty allowlist as fail-closed.
- [**#29216**](https://github.com/google-gemini/gemini-cli/pull/29216) — **Isolate the settings directory inside sandbox containers.** Previously the host's `~/.gemini` was mounted directly into Docker/Podman sandboxes, potentially exposing OAuth tokens and credentials.
- [**#29215**](https://github.com/google-gemini/gemini-cli/pull/29215) — **Enforce envelope metadata provenance for untrusted tool outputs.** Instructs the model to trust only top-level envelope properties for author identity and operational status when processing MCP/external tool results.
- [**#29211**](https://github.com/google-gemini/gemini-cli/pull/29211) — **Stop scheduling state updates from inside a state updater.** Fixes nested `setState` calls in `useInputHistoryStore.addInput()`, which violates React's updater purity and causes terminal-history re-render issues.
- [**#29116**](https://github.com/google-gemini/gemini-cli/pull/29116) — **Mitigate NTFS 8.3 short-name (SFN) paths.** Handles Windows short names such as `git~1`, `env~1`, and `node_m~1` in path normalization and the `AllowedPathChecker` safety engine.
- [**#29114**](https://github.com/google-gemini/gemini-cli/pull/29114) — **Prevent duplicate `handleExit` execution on spawn failure.** Guards against both `error` and `close` firing after a failed `child_process` spawn, which previously triggered duplicated cleanup.
- [**#29110**](https://github.com/google-gemini/gemini-cli/pull/29110) — **Route `read_file` content through `FileSystemService`.** Brings `read_file` in line with `write_file`/`replace` so ACP clients advertising virtual filesystems are honored.
- [**#29118**](https://github.com/google-gemini/gemini-cli/pull/29118) — **Only strip a trailing `.git` suffix when parsing extension repositories.** Prevents names like `blog.github.io` from being mangled by naive `.git` removal.
- [**#29218**](https://github.com/google-gemini/gemini-cli/pull/29218) — Automated release version bump for the current nightly.

## 5. Feature Request Trends

Recurring feature directions across recent issues and PRs:

- **Transparent agent execution:** Expose subagent trajectories via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), include subagent context in `/bug` reports ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), and improve CLI self-awareness about flags and hotkeys ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).
- **AST-aware code intelligence:** Multiple tracks explore AST-aware file reads, search, and codebase mapping to reduce token bloat and improve navigation ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#19561](https://github.com/google-gemini/gemini-cli/issues/19561)).
- **Native shell affinity with strong sandboxing:** Users want the model to use Unix toolchains freely, but inside OS-level sandboxes with post-execution intent routing and safer path handling ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)).
- **Browser agent durability:** Requests for automatic session takeover, lock recovery, and proper honoring of `settings.json` overrides such as `maxTurns` ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232), [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)).
- **Predictable configuration:** No silent model rewriting, consistent MCP allowlist semantics, and support for symlinked agent definitions ([#29217](https://github.com/google-gemini/gemini-cli/pull/29217), [#29222](https://github.com/google-gemini/gemini-cli/pull/29222), [#20079](https://github.com/google-gemini/gemini-cli/issues/20079)).

## 6. Developer Pain Points

- **Agents hang or stall without useful diagnostics:** The generalist agent hangs indefinitely ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell commands finish but remain stuck on "Awaiting user input" ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), and interactive prompts (e.g., Vite scaffolding) trap the agent ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)).
- **False success reports undermine trust:** MAX_TURNS interruptions are labeled as GOAL success ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)), and user-facing bug reports omit what the subagent actually did ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)).
- **Manually steering the model is too common:** Users must explicitly forbid or force subagent/skill usage because the model does not reliably choose relevant tools on its own ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409), [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)).
- **Browser agent fragility:** Failures on Wayland, locked persistent profiles, and ignored `settings.json` overrides remain frequent ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983), [#22232](https://github.com/google-gemini/gemini-cli/issues/22232), [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)).
- **Security edge cases keep surfacing:** Auto Memory can forward secrets into model context before redaction ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)); sandboxed containers previously mounted host credentials ([#29216](https://github.com/google-gemini/gemini-cli/pull/29216)).
- **Path and naming edge cases cause silent breakage:** NTFS short names bypass safety paths on Windows ([#29116](https://github.com/google-gemini/gemini-cli/pull/29116)); symlinked agent definitions are ignored ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)); repositories containing `.git` internally are misparsed ([#29118](https://github.com/google-gemini/gemini-cli/pull/29118)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-06

## Today's Highlights
The project shipped **v1.0.84-1** with support for **GPT-6 Astra**, while community attention centered on reliability: the most-upvoted open feature request (#1857, 28 👍) asks for the ability to cancel queued messages. A wave of triage bugs landed around **MCP tooling**, **auto-update regressions**, and **model behavior** — notably users being silently switched to GPT-5 mini and hitting mid-task stops.

## Releases
- **[v1.0.84-1](https://github.com/github/copilot-cli/releases)**  
  **Added:** Support for GPT-6 Astra.

## Hot Issues

1. **[#1857 — Allow users to cancel or remove enqueued messages before they are executed](https://github.com/github/copilot-cli/issues/1857)** · `area:input-keyboard`  
   Open for months but still the community's top ask (28 👍, 11 comments). Once a message is queued via `Ctrl+Q`/`Ctrl+Enter`, it can't be cancelled while the agent is busy or during `/compact`. Users want an escape hatch for long queues of queued commands.

2. **[#4734 — "Worktree missing" on all project sessions after upgrade to desktop 2.98.0 / runtime 1.1.15](https://github.com/github/copilot-cli/issues/4734)** · `triage`  
   A cross-cutting regression: every existing *and new* worktree-backed session is broken after an auto-update. Zero comments yet, but this falls into the highest-impact category — update broke core session functionality.

3. **[#4732 — Copilot suddenly switched me to GPT-5 mini which just stops mid-task](https://github.com/github/copilot-cli/issues/4732)** · `triage`  
   A user reports an unexpected model switch to GPT-5 mini; it generated patches, then emptied them and stopped as if done. Especially topical given the new GPT-6 Astra release. Signals a need for clearer model-override visibility and fallback behavior.

4. **[#4728 — Auto-update rewrites the running copilot.exe, breaking the GitHub Copilot desktop app](https://github.com/github/copilot-cli/issues/4728)** · `area:sessions, area:installation`  
   Running `copilot` in a terminal can silently self-replace the executable that launched it, after which the desktop app can't reconnect to any existing session. A notable packaging/update design flaw surfaced in the wild.

5. **[#4731 — MCP tools/list refresh times out and permanently strips a server's tools](https://github.com/github/copilot-cli/issues/4731)** · `area:mcp, area:tools`  
   After a tool call to a stdio MCP server hits its timeout, the runtime immediately dispatches a `tools/list` refresh into the same blocked server. The refresh times out too and the server's tools are lost for the lifetime of the process.

6. **[#4725 — Frequent JavaScript heap out of memory on Linux](https://github.com/github/copilot-cli/issues/4725)** · `area:platform-linux`  
   CLI crashes every few minutes with ~4 GB heap exhausted during Mark-Compact. Reports a serious stability issue for long-running sessions on Linux.

7. **[#4328 — Ctrl+H misread as Ctrl+Backspace under WSL2 due to WT_SESSION leaking](https://github.com/github/copilot-cli/issues/4328)** · `area:input-keyboard, area:platform-windows`  
   Under WSL2, `Ctrl+H` deletes the whole word instead of one character. Diagnosed to a `WT_SESSION` leak from Windows Terminal messing up key detection. Seven comments and several months old — a persistent annoyance for WSL2 users.

8. **[#4721 — Canvas open_canvas arguments corrupted by JSON-RPC serialization bug](https://github.com/github/copilot-cli/issues/4721)** · `area:mcp, area:tools`  
   Tool arguments get concatenated with a trailing `}{}` suffix, truncating values mid-JSON. When dispatching to canvas extensions, the malformed payload makes calls fail with "Unexpected end of JSON input."

9. **[#4729 — Built-in research agent tells subagents to call unavailable github/get_me tool](https://github.com/github/copilot-cli/issues/4729)** · `area:agents, area:mcp`  
   The `research` subagent's prompt instructs calls to `github/get_me`, but the MCP server doesn't expose it. Subagents visibly fight the mismatch, wasting tokens/time and leaking reasoning noise.

10. **[#4652 — Sandboxing unsupported on latest Windows 25H2 build](https://github.com/github/copilot-cli/issues/4652)** · `triage`  
    `copilot --experimental --sandbox` warns that sandboxing isn't supported on the newest Windows build, meaning shell commands and sandboxed services will fail. Platform lag between Windows releases and CLI capability checks.

## Key PR Progress
No pull requests were created or updated in the last 24 hours.

## Feature Request Trends

- **Queue and input control.** The clearest signal remains #1857 (28 👍): give users the ability to cancel or prune queued messages instead of letting them run in order. Keyboard/input correctness is also a live theme (#4328, #4722).
- **Context lifecycle management.** #4724 proposes auto-compaction on idle aligned to the model's ~5-minute prompt-cache TTL, aiming to avoid full-context re-reads after idle gaps and cut both latency and cost.
- **Model visibility and control.** Users want to know *which* model is serving them and why it may change — #4732 shows an unexpected silent switch to GPT-5 mini causing incorrect "done" results, while enterprise users report models being disabled by policy with no UI to enable them (#4272).

## Developer Pain Points

- **Upgrade and auto-update regressions.** Repeated reports of updates breaking existing functionality: "Worktree missing" across all sessions (#4734), self-replacing executables breaking the desktop app (#4728), and Windows 25H2 sandbox incompatibility (#4652).
- **MCP/tool-integration fragility.** A cluster of tooling bugs — permanently stripped tools after refresh timeouts (#4731), corrupted JSON-RPC arguments (#4721), and agents told to call nonexistent tools (#4729) — undermines trust in the plugin ecosystem.
- **Model behavior and determinism.** Mid-task stops, silent model downgrades, and truncated outputs (#4732, #4733) erode confidence, especially for BYOK/providers with high token limits.
- **Stability on Linux.** Repeated JS heap OOM crashes (#4725) every few minutes make the CLI unusable in some long-running environments.
- **Input correctness.** Keyboard handling bugs keep resurfacing: `Ctrl+H` behaving like `Ctrl+Backspace` under WSL2 (#4328) and Markdown stripping leading underscores such as `_test` (#4722).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-06

## 1. Today's Highlights

Release v1.18.29 shipped with a narrow but important fix: Codex OAuth model filtering now recognizes integer GPT versions like `gpt-6`, restoring `gpt-6-astra` visibility for OpenAI subscription users. On the tracker, the community remains focused on three fronts — the sprawling memory megathread (#20695, now 140 comments), silent output-token caps that ignore `limit.output` (#29363), and a wave of 2.0/OpenCode Go reliability and billing complaints (service restart loops, missing `max_tokens`, quota miscalculation). A large batch of Aug 5 community PRs also moved to closed state, surfacing ~40 queued fixes covering TUI skills, shell aborts, Unicode snapshot paths, and ACP subagent visibility.

## 2. Releases

**v1.18.29** (latest)
- Bugfix: Codex OAuth model filtering now recognizes integer GPT versions such as `gpt-6`
- Bugfix: fixes `gpt-6-astra` not appearing for OpenAI subscription users
- Docs: Chinese translation bold-rendering fix from community contributor @Peter267

## 3. Hot Issues

1. **[#20695 – Memory Megathread](https://github.com/anomalyco/opencode/issues/20695)** — 140 comments, 108 👍. The longest-running thread collecting memory/leak reports. Maintainers explicitly plead: *"PLEASE DO NOT RUN YOUR LLM AND SUGGEST SOLUTIONS"* — they want heap snapshots via a manual snapshot flow to diagnose properly.

2. **[#29363 – `limit.output` silently capped at 32k](https://github.com/anomalyco/opencode/issues/29363)** — 19 comments, 17 👍. Config values such as `384000` for DeepSeek or `128000` for GPT/Claude are silently clamped per step; the only documented escape hatch is `OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX`. Users are frustrated by an undocumented, experimental workaround for a config value that is simply ignored.

3. **[#19466 – opencode burns CPU while "doing nothing"](https://github.com/anomalyco/opencode/issues/19466)** — 17 comments, 16 👍. While waiting out API quota exhaustion ("retrying in 18m 12s"), opencode consumes ~50% of a single core on an i9-14900. Widely upvoted as a basic resource-hygiene bug.

4. **[#35486 – Internal Server Error with DeepSeek v4 Flash](https://github.com/anomalyco/opencode/issues/35486)** — 14 comments. Reproducible even with a fresh session and cleared cache in OpenCode Go/Desktop. One of several DeepSeek-v4-specific reliability complaints this week.

5. **[#27963 – Corrupted executable on Windows (v1.15.3)](https://github.com/anomalyco/opencode/issues/27963)** — 11 comments. The shipped `opencode-ai` binary fails on Windows 10/11 with "The specified executable is not a valid application for this OS platform." Release-pipeline trust issue that still draws engagement.

6. **[#47168 – Unimplemented `commentary` channel in gpt.txt](https://github.com/anomalyco/opencode/issues/47168)** — 4 comments. The GPT system prompt instructs models to post progress updates on a `commentary` channel that opencode never implements; on chat-completions providers, each update ends the turn mid-task. A subtle protocol bug with real UX impact.

7. **[#37239 – [2.0] service restart silent retry loop](https://github.com/anomalyco/opencode/issues/37239)** — 6 comments. `opencode2 service restart` intermittently spawns `serve --service` ~16 times over 2.5 minutes, each dying silently until one succeeds — forcing manual process kills.

8. **[#47398 – [2.0] `max_tokens` never sent on openai-compatible models](https://github.com/anomalyco/opencode/issues/47398)** — v2 CLI omits `max_tokens` entirely, ignoring `limit.output`; thinking turns then truncate at provider defaults. Note stable v1.18.20 sends `max_tokens: 32000` with identical config — a clear v2 regression.

9. **[#47501 – Single-line file mention expands to wrong line range](https://github.com/anomalyco/opencode/issues/47501)** — Closed, but technically insightful: `@file#42` builds 1-based file URLs while LSP document symbols use 0-based ranges, so single-line mentions expand to the wrong enclosing function/class.

10. **[#47491 / #47492 – OpenCode Go quota sums percentages, not dollars](https://github.com/anomalyco/opencode/issues/47491)** — Quota limits defined as dollar allowances ($12/5h, $30/week, $60/month) are apparently computed by summing percentage values, causing premature service refusal for paying subscribers. #47492 is an abusive duplicate of the same report; the underlying billing bug is significant. Related: [#44851](https://github.com/anomalyco/opencode/issues/44851) reports a subscription not activated despite a successful $10 renewal payment.

## 4. Key PR Progress

1. **[#47441 – fix(app): load worktree inventory on demand](https://github.com/anomalyco/opencode/pull/47441)** — Fresh fix for Desktop hanging with a red server dot: hundreds of local API jobs were created within seconds, stalling health preflights and question-reply POSTs on a stalled socket pool. Loads worktree inventory lazily and caps concurrent server requests.

2. **[#40674 – feat(tui): skill UX improvements](https://github.com/anomalyco/opencode/pull/40674)** — Closes #31220. Adds multi-select for skills, compact display, and slash-command dedupe so SKILL.md bodies no longer pollute the TUI transcript.

3. **[#40669 – fix(shell): stop aborted commands after output](https://github.com/anomalyco/opencode/pull/40669)** — Closes #39565. Tightens the abort path so an abort triggered while output is streaming actually terminates the child process immediately.

4. **[#40706 – fix(ai): normalize loose provider usage](https://github.com/anomalyco/opencode/pull/40706)** — Fixes #40690. Accepts nullable provider usage fields at protocol boundaries, supports indexless OpenAI-compatible tool-call deltas across chunks, retains Gemini modality details, and tolerates nullable Anthropic fields.

5. **[#40654 – fix(acp): surface subagent activity](https://github.com/anomalyco/opencode/pull/40654)** — Projects foreground subagent messages and tools onto the root ACP session, namespaces child tool calls, includes lineage metadata, and routes child permissions through the root session.

6. **[#40648 – fix(snapshot): preserve unicode paths on revert](https://github.com/anomalyco/opencode/pull/40648)** — Closes #19357. Fixes the Unicode-path branch of snapshot revert by checking existence in the target snapshot before deciding between copy and delete.

7. **[#40601 – feat(core): implement V2 manual compaction](https://github.com/anomalyco/opencode/pull/40601)** — Implements explicit manual compaction on top of automatic request-budget compaction, as spec'd in `specs/v2/session.md`.

8. **[#40578 – feat(session): add /handoff command](https://github.com/anomalyco/opencode/pull/40578)** — Closes #26757. Enables handing off a session with compressed context — the author notes two related issues (#21760, #26707) were previously closed by the stale-issue bot rather than on merit.

9. **[#40582 – feat(desktop): inline conversation visualizations](https://github.com/anomalyco/opencode/pull/40582)** — Closes #40583. Lets models emit versioned fragments through a `visualize` channel, rendered as inline HTML visualizations in Desktop conversations.

10. **[#40590 – feat: support GITHUB_TOKEN auth in install script](https://github.com/anomalyco/opencode/pull/40590)** — Closes #40589. The install script makes three anonymous GitHub requests (version detection, release check, asset download); this adds `GITHUB_TOKEN` support for rate-limit relief.

Also notable in the churned batch: [#40727](https://github.com/anomalyco/opencode/pull/40727) plain-text paste (`Ctrl+Alt+V`), [#40668](https://github.com/anomalyco/opencode/pull/40668) sessionID attribution for shell `create` hooks, [#40708](https://github.com/anomalyco/opencode/pull/40708) workspace-scoped Stripe customer reuse, [#40606](https://github.com/anomalyco/opencode/pull/40606) locale-independent git worktree error classification, and [#40599](https://github.com/anomalyco/opencode/pull/40599) preventing separate clones of the same repo from being treated as sandboxes.

## 5. Hot Discussions

No discussion data was provided for this digest period.

## 6. Feature Request Trends

- **Richer Desktop/Web UX**: clickable file-path chips that open in editor/Finder ([#37891](https://github.com/anomalyco/opencode/issues/37891)), a portable (non-NSIS) Windows build ([#37893](https://github.com/anomalyco/opencode/issues/37893)), OS-level notifications via the Web Notifications API ([#47479](https://github.com/anomalyco/opencode/issues/47479)), and image paste/drag-drop support in the TUI ([#44310](https://github.com/anomalyco/opencode/issues/44310)).
- **2.0 platform maturity**: scope event subscriptions by client interest ([#36443](https://github.com/anomalyco/opencode/issues/36443)), manual compaction ([#40601](https://github.com/anomalyco/opencode/pull/40601)), `/handoff` session command ([#40578](https://github.com/anomalyco/opencode/pull/40578)), and interactive inline visualizations ([#40582](https://github.com/anomalyco/opencode/pull/40582)).
- **Community & ecosystem**: Swedish community translation ([#40717](https://github.com/anomalyco/opencode/pull/40717)), third-party plugin/docs additions such as opencode-tabs and OutageDeck MCP ([#40714](https://github.com/anomalyco/opencode/pull/40714), [#40630](https://github.com/anomalyco/opencode/pull/40630)), and install-script auth support ([#40590](https://github.com/anomalyco/opencode/pull/40590)).
- **Lifting arbitrary hard limits**: removing the silent 32k output cap ([#29363](https://github.com/anomalyco/opencode/issues/29363)), sending `max_tokens` properly in v2 ([#47398](https://github.com/anomalyco/opencode/issues/47398)), and bumping bundled Bun from 1.3.14 to 1.4.x ([#44945](https://github.com/anomalyco/opencode/issues/44945)).

## 7. Developer Pain Points

- **Config silently ignored**: the 32k `limit.output` cap ([#29363](https://github.com/anomalyco/opencode/issues/29363)), missing `max_tokens` in v2 ([#47398](https://github.com/anomalyco/opencode/issues/47398)), model-name mapping corruption (`deepseek-v4-pro` → `deepseek/deepseek-v4-pro`, [#47508](https://github.com/anomalyco/opencode/issues/47508)), and providers rejecting injected fields like `metadata` on xAI Grok ([#47496](https://github.com/anomalyco/opencode/issues/47496)).
- **OpenCode Go billing & quota distrust**: percentage-vs-dollar quota miscalculation ([#47491](https://github.com/anomalyco/opencode/issues/47491)), lost subscriptions after successful renewal ([#44851](https://github.com/anomalyco/opencode/issues/44851)), and slow models consuming usage without progress ([#47520](https://github.com/anomalyco/opencode/issues/47520)).
- **Stability regressions**: corrupted Windows binaries ([#27963](https://github.com/anomalyco/opencode/issues/27963)), Internal Server Errors on DeepSeek v4 Flash ([#35486](https://github.com/anomalyco/opencode/issues/35486)), SSE stream transport errors on Go ([#47500](https://github.com/anomalyco/opencode/issues/47500)), and the v2 service restart loop ([#37239](https://github.com/anomalyco/opencode/issues/37239)).
- **Resource waste**: ~50% core usage while backoff-idle ([#19466](https://github.com/anomalyco/opencode/issues/19466)), Desktop freezes from unbounded worktree-inventory loading ([#47441](https://github.com/anomalyco/opencode/pull/47441)), and the still-open memory megathread ([#20695](https://github.com/anomalyco/opencode/issues/20695)).
- **Desktop/install friction**: `EACCES` on first run creating `~/.config/opencode` ([#47540](https://github.com/anomalyco/opencode/issues/47540)), unclickable file paths ([#37891](https://github.com/anomalyco/opencode/issues/37891)), stuck "Open in File Manager" spinner on Pop!_OS ([#46981](https://github.com/anomalyco/opencode/issues/46981)), and silent failures renaming local "global" projects ([#47494](https://github.com/anomalyco/opencode/issues/47494)).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-06

## Today's Highlights

v0.85.1 shipped with **GPT-6 Astra** support through OpenAI API keys and OpenAI Codex subscriptions. Meanwhile, the community converged on reliability: a 0.85.0 packaging regression that broke fresh installs got an immediate double fix ([#9170](https://github.com/earendil-works/pi/pull/9170), [#9172](https://github.com/earendil-works/pi/pull/9172)), and a long-requested UX feature — invoking skills mid-sentence — moved from issue to working PR ([#9214](https://github.com/earendil-works/pi/pull/9214)). Windows support remains the most active community thread, with 52 comments in the maintainers' call for usage feedback.

## Releases

**v0.85.1** — Adds **GPT-6 Astra** access via OpenAI API keys and OpenAI Codex subscriptions. See the provider docs for API key and Codex configuration details.

## Hot Issues

- [#7547 — [Windows] How do you use Pi on Windows? What issues are you seeing?](https://github.com/earendil-works/pi/issues/7547) (52 comments) — Maintainers are collecting Windows usage scenarios — TUI bugs, docs gaps, or setups that should be delegated to extensions — to prioritize effort.
- [#9132 — 0.85.0: published dist/cli.js statically imports @earendil-works/pi-server, which is not declared](https://github.com/earendil-works/pi/issues/9132) (5👍) — Release-breaking packaging bug for fresh npm installs; fixed by today's PRs [#9170](https://github.com/earendil-works/pi/pull/9170)/[#9172](https://github.com/earendil-works/pi/pull/9172).
- [#5023 — Terminal scrolls to beginning without reason](https://github.com/earendil-works/pi/issues/5023) (19 comments, closed) — The TUI randomly jumps to session start and fast-scrolls to the end while the model is producing output.
- [#8896 — /export HTML silently drops context sent to the model (display:false messages)](https://github.com/earendil-works/pi/issues/8896) — `display:false` is documented as a TUI-only toggle, but it also filters exported transcripts, losing context that the model actually saw.
- [#6300 — Windows: input line redrawn on every keystroke](https://github.com/earendil-works/pi/issues/6300) — Each character appears on a new line in cmd.exe and Windows Terminal; one of several Windows TUI blockers.
- [#8684 — PI_OFFLINE silently disables all provider model discovery](https://github.com/earendil-works/pi/issues/8684) — PI_OFFLINE's documented scope is startup housekeeping only, but it also disables remote model-catalog discovery for the whole session.
- [#9209 — Copilot GPT-6 Astra routed to unsupported /chat/completions endpoint](https://github.com/earendil-works/pi/issues/9209) — Copilot rejects Astra over Chat Completions; Pi needs to route it through the Responses-compatible path.
- [#9212 — Sonnet-5 via gateway: 13% of edit tool calls arrive truncated to `edits:[{}]`](https://github.com/earendil-works/pi/issues/9212) — Statistical report of truncated tool arguments failing schema validation; a gateway fidelity red flag.
- [#8457 — Invoke skills mid-sentence like prompt templates](https://github.com/earendil-works/pi/issues/8457) (4👍, closed) — Skills only expand at the start of input; now addressed by PR [#9214](https://github.com/earendil-works/pi/pull/9214).
- [#8791 — Expose the model runtime to extensions](https://github.com/earendil-works/pi/issues/8791) (4👍, closed) — Extension authors building isolated in-process agent sessions need `ModelRuntime` exposed on `ExtensionContext`.

## Key PR Progress

- [#9170 + #9172 — Declare pi-server runtime dependency & guard package publication](https://github.com/earendil-works/pi/pull/9170) — Fixes the 0.85.0 broken-install regression and adds a CI guard so undeclared static imports in the published package root can't ship again.
- [#9214 — Invoke skills and prompt templates mid-sentence](https://github.com/earendil-works/pi/pull/9214) — Expands `/skill:name` and `/template` anywhere in the input line, not just at the start; closes #8457.
- [#9117 — Deliver prompt and tool changes as system message deltas](https://github.com/earendil-works/pi/pull/9117) (stacked on #9116) — Stops rewriting the top-level system prompt on tool-loadout changes; sends deltas instead, reducing token churn in long sessions.
- [#9116 — Add mid-conversation system messages](https://github.com/earendil-works/pi/pull/9116) — pi-ai-level foundation for injecting system messages mid-session (extension state changes, permission updates, etc.).
- [#9096 — Add Meta provider with Muse subscription OAuth](https://github.com/earendil-works/pi/pull/9096) — Adds Meta as a sub-provider; documents its unusual daily token re-minting and currently bursty streaming.
- [#7610 — Add LLM Gateway and LLM Gateway DevPass providers](https://github.com/earendil-works/pi/pull/7610) — OpenRouter-style router added as built-in `openai-completions` providers, contributed on behalf of the LLM Gateway team.
- [#9163 — Simplify clipboard handling](https://github.com/earendil-works/pi/pull/9163) — Replaces a heavy Rust clipboard dependency with leaner native glue; originally motivated by NixOS/Nix builds.
- [#9182 — Skip session events on invalidated extension runners](https://github.com/earendil-works/pi/pull/9182) — Fixes a race where a second teardown during `/new` or Ctrl+C would hang on an invalidated shared extension runtime.
- [#9179 — Reject tree navigation during compaction](https://github.com/earendil-works/pi/pull/9179) — Prevents session-tree navigation while compaction is in-flight and keeps summaries tied to the branch they were prepared on, with regression tests.
- [#7970 — Show when the fullscreen transcript is scrolled up](https://github.com/earendil-works/pi/pull/7970) — Adds a `↓` indicator in the status row when the transcript isn't following the live end; clears on scroll-to-bottom.

## Hot Discussions

**Ideas**
- [#9207 — Suggestion: remove "Available tools" section from system message](https://github.com/earendil-works/pi/discussions/9207) — Proposes that tool schemas are sufficient and the textual tool list adds noise and tokens; 2👍.
- [#9177 — Integrate CommandCode Plan into login](https://github.com/earendil-works/pi/discussions/9177) — Request for CommandCode Plan support at the authentication layer.

**Show and tell**
- [#9213 — Embed Agent-Friendly Score badge in README](https://github.com/earendil-works/pi/discussions/9213) — pi scored 86.2/100 on agent-friendliness; submission includes a ready-to-add badge.

## Feature Request Trends

- **Windows as a first-class platform**: the explicit Windows survey ([#7547](https://github.com/earendil-works/pi/issues/7547)), plus fixes for input redraw ([#6300](https://github.com/earendil-works/pi/issues/6300)), fullscreen image rendering ([#9169](https://github.com/earendil-works/pi/issues/9169)), and IME behavior ([#5200](https://github.com/earendil-works/pi/issues/5200)), shows real pressure to close Windows TUI gaps.
- **Provider & routing breadth**: native Meta/Muse ([#9096](https://github.com/earendil-works/pi/pull/9096)), LLM Gateway ([#7610](https://github.com/earendil-works/pi/pull/7610)), Requesty ([#5473](https://github.com/earendil-works/pi/issues/5473)), correct Responses routing for Astra ([#9209](https://github.com/earendil-works/pi/issues/9209)), and OpenAI async tool calling ([#9113](https://github.com/earendil-works/pi/issues/9113)).
- **Prompt & context efficiency**: system-message deltas ([#9116](https://github.com/earendil-works/pi/pull/9116)/[#9117](https://github.com/earendil-works/pi/pull/9117)), top-level `instructions` for Responses providers ([#8734](https://github.com/earendil-works/pi/pull/8734)), removal of redundant tool descriptions ([#9207](https://github.com/earendil-works/pi/discussions/9207)), and mid-sentence skill/template expansion ([#8457](https://github.com/earendil-works/pi/issues/8457)).
- **Session-lifecycle reliability**: compaction re-entrancy guards ([#9179](https://github.com/earendil-works/pi/pull/9179)), retry after `session_compact` ([#9051](https://github.com/earendil-works/pi/issues/9051)), extension-runner cleanup ([#9182](https://github.com/earendil-works/pi/pull/9182)), and stateful Responses continuation ([#7317](https://github.com/earendil-works/pi/issues/7317)).
- **Packaging & distribution**: Nix flake ([#9137](https://github.com/earendil-works/pi/pull/9137)), simpler cross-platform clipboard builds ([#9163](https://github.com/earendil-works/pi/pull/9163)), and package-root publication guards ([#9172](https://github.com/earendil-works/pi/pull/9172)).

## Developer Pain Points

- **Broken fresh installs**: 0.85.0 shipped with an undeclared `@earendil-works/pi-server` static import, forcing the community to debug a broken package root out of the box ([#9132](https://github.com/earendil-works/pi/issues/9132)).
- **Windows TUI defects**: keystroke redraw issues in cmd/Windows Terminal, broken fullscreen images in WezTerm, and stuck IME candidate windows all sit in the top issues with no core fix yet ([#6300](https://github.com/earendil-works/pi/issues/6300), [#9169](https://github.com/earendil-works/pi/issues/9169), [#5200](https://github.com/earendil-works/pi/issues/5200)).
- **Provider stream fidelity**: truncated edit calls from gatewayed Sonnet ([#9212](https://github.com/earendil-works/pi/issues/9212)), heap OOM from the Codex SSE parser ([#9036](https://github.com/earendil-works/pi/issues/9036)), and Ollama `terminated`/"length" regressions since 0.84.x ([#9216](https://github.com/earendil-works/pi/issues/9216)).
- **Silently dropped or over-broad config**: `bash` tool silently ignores `cwd` ([#5904](https://github.com/earendil-works/pi/issues/5904)), `PI_OFFLINE` disables more than documented ([#8684](https://github.com/earendil-works/pi/issues/8684)), and `/export` omits `display:false` context ([#8896](https://github.com/earendil-works/pi/issues/8896)).
- **Races and hangs in session lifecycle**: extension dialogs racing each other or session teardown leave the TUI stuck on "Working…" ([#6978](https://github.com/earendil-works/pi/issues/6978), [#9203](https://github.com/earendil-works/pi/issues/9203)), tree navigation during compaction can strand context ([#9179](https://github.com/earendil-works/pi/pull/9179)), and `session_compact` overflow retries skip queued messages ([#9051](https://github.com/earendil-works/pi/issues/9051)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-06

## Today's Highlights

Two new web-shell-oriented releases landed, focused on visualizing and managing dynamic workflow runs plus a projection performance improvement. Meanwhile, community and maintainer attention is concentrated on **export-size regressions** and **background/session reliability in daemon/Web Shell mode**, with at least one P1 issue prompting a dedicated fix PR. CI stability also remains a recurring theme, especially around release-pipeline duplication and flaky test infrastructure.

## Releases

- [v0.23.1-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.0)
- [v0.23.0-nightly.20260905.e3d26283e6](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260905.e3d26283e6)

Both releases include:

- **feat(web-shell)**: visualize and manage dynamic workflow runs — [#10594](https://github.com/QwenLM/qwen-code/pull/10594)
- **perf(web-shell)**: derive the session workflow project more efficiently

## Hot Issues

1. [**#11091**](https://github.com/QwenLM/qwen-code/issues/11091) — `mermaid` (~6 MB) is still flattened into the exported transcript renderer.  
   This directly affects exported HTML size and load behavior, even after the external renderer work from #9812. It has 6 comments and is flagged `need-discussion`, showing it is not fully settled.

2. [**#11031**](https://github.com/QwenLM/qwen-code/issues/11031) — `/export html` still embeds the entire Web Shell runtime, producing ~19.5 MB files even for empty sessions.  
   P1 issue; a major obstacle for anyone relying on portable HTML exports.

3. [**#11119**](https://github.com/QwenLM/qwen-code/issues/11119) — Background shell output and wake notifications are silently dropped when the session runtime recycles, wedging the session.  
   P1 daemon/session-management bug. This is especially dangerous for CI-polling loops and unattended background work.

4. [**#11118**](https://github.com/QwenLM/qwen-code/issues/11118) — Sessions doing cron, goal, monitor, or history-mutation work can never be reclaimed by `qwen serve`.  
   The child process uses two incompatible notions of “busy,” causing idle-reclamation to fail for valid background workloads.

5. [**#11109**](https://github.com/QwenLM/qwen-code/issues/11109) — `release.yml` repeats work the same run already did, and one 20-minute step verifies nothing.  
   Two release runs timed out today. This explains many recent release-pipeline delays.

6. [**#10892**](https://github.com/QwenLM/qwen-code/issues/10892) — `vi.waitFor` uses a hardcoded 1-second deadline, and 2,047 call sites rely on it.  
   A developer-machine default causes avoidable CI flakes on slow/contended runners.

7. [**#10904**](https://github.com/QwenLM/qwen-code/issues/10904) — Cron-interactive E2E tests intermittently time out, and `continue-on-error: true` hides the failures.  
   The suite can go red without failing the overall job, making regressions easy to miss.

8. [**#8227**](https://github.com/QwenLM/qwen-code/issues/8227) — Windows validated `@`-file reads lose `O_NOFOLLOW` and may have ineffective dev/ino identity checks.  
   Security follow-up to #7206. Important for cross-platform parity and TOCTOU protection.

9. [**#11096**](https://github.com/QwenLM/qwen-code/issues/11096) — Exports built from `main` point to an unpkg URL that 404s.  
   `0.23.0` was published before #9812 merged, so the external renderer file is absent from the published tarball. This breaks exports for `main`/latest consumers.

10. [**#5823**](https://github.com/QwenLM/qwen-code/issues/5823) — `/loop` cron tasks fire silently with no visibility; the model cannot list or stop its own scheduled tasks.  
    Closed as an issue but remains an important background-automation gap, with 6 comments and clear community interest.

## Key PR Progress

1. [**#11133**](https://github.com/QwenLM/qwen-code/pull/11133) — **fix(core)**: defer background task notifications instead of silently dropping them.  
   Direct response to #11119-style session-recycle notification loss.

2. [**#11015**](https://github.com/QwenLM/qwen-code/pull/11015) — **feat(channels)**: implement named-session worktree reset (Part 4B).  
   Enables `/clear`, `/new`, and `/reset` on worktree-isolated sessions while preserving daemon-attested state.

3. [**#11090**](https://github.com/QwenLM/qwen-code/pull/11090) — **feat(ipc)**: allow a user-minted controller token to drive a session without per-message review.  
   Relaxes the inbound gate for a legitimate trusted-controller use case without compromising stranger safety.

4. [**#11093**](https://github.com/QwenLM/qwen-code/pull/11093) — **Add persistent focus mode for quieter terminal transcripts.**  
   Adds optional `/focus` to hide reasoning rows and summarize completed tool groups, including failures.

5. [**#11070**](https://github.com/QwenLM/qwen-code/pull/11070) — **fix(acp)**: preserve approval mode across cold resume.  
   Ensures daemon session approval state survives ACP child reaping and cold load/resume.

6. [**#11083**](https://github.com/QwenLM/qwen-code/pull/11083) — **fix(serve)**: read channel settings from user scope when workspace is home.  
   Fixes channel configuration becoming invisible to Web Shell/management API when workspace == home directory.

7. [**#11134**](https://github.com/QwenLM/qwen-code/pull/11134) — **fix(ci)**: retry the transient all-green macOS E2E shard death once.  
   Mirrors the existing Linux retry with a budget-gated single retry.

8. [**#11103**](https://github.com/QwenLM/qwen-code/pull/11103) — **ci**: stop failing the Test job on a starved vitest worker RPC alone.  
   Adds a classifier to distinguish real test failures from vitest infrastructure flakes.

9. [**#11139**](https://github.com/QwenLM/qwen-code/pull/11139) — **Keep API leaders and local workers on separate credentials.**  
   Improves safety when using API-backed leaders with local/Ollama workers under native subagents and Agent Team.

10. [**#11080**](https://github.com/QwenLM/qwen-code/pull/11080) — **ci**: enrich deferred-findings tracking issues with PR context and assignment.  
    Improves the autofix/review follow-up workflow by making deferred review findings actionable and discoverable.

## Feature Request Trends

Recurring feature directions across the current issues and PRs include:

- **Smaller dependency-light HTML exports** — #11031, #11091, and #11096 all push toward keeping Web Shell and large dependencies like `mermaid` out of exported transcripts.
- **Visible, controllable background automation** — #5823 and #11118 highlight the need to list, stop, and safely reclaim cron/scheduled sessions from the user or model side.
- **Session/channel lifecycle management** — #11015 and #11024 continue the named-session worktree cleanup and reset roadmap.
- **Web Shell UI/UX parity** — #11111 proposes session search over conversation content rather than only titles; #11112 targets model-selection errors in Web Shell settings.
- **Session rotation and quiet output modes** — #8927 (sessionRotation) and #11093 (persistent `/focus`) point toward more controllable long-running sessions.

## Developer Pain Points

- **Export pipeline fragility and bloat** — 19.5 MB empty exports, flattening `mermaid`, and unpkg 404s make HTML export a source of repeated regressions.
- **Daemon/Web Shell background execution gaps** — silent cron tasks, dropped notifications during session recycling, and incorrect “busy” detection create trust issues for unattended use.
- **CI/test instability** — hardcoded `vi.waitFor` timeouts, hidden `continue-on-error` failures, starved vitest workers, and repeated release-pipeline work consume maintainer time.
- **Cross-platform security gaps** — Windows symlink/TOCTOU protection is not equivalent to Linux, leaving validated file-read semantics weaker than expected.
- **Configuration/session state loss** — channel settings become invisible when the workspace is the user’s home directory, and approval mode can be lost across cold resume.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*