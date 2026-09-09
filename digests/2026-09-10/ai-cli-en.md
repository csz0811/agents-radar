# AI CLI Tools Community Digest 2026-09-10

> Generated: 2026-09-09 22:46 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Community Comparison Report
**Date: 2026-09-10 · Window: 2026-09-09 → 2026-09-10 · Sources: official project community digests (Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, Qwen Code)**

---

## 1. Ecosystem Overview

The AI CLI agent space is in heavy, concurrent iteration: across seven tools, roughly 14 release artifacts shipped in a single day — from patch fixes (Claude Code v2.1.266/v2.1.267, Copilot CLI v1.0.84-3) to major feature drops (Codex v0.154.0 with GPT-6-Astra and experimental worktrees) and SDK/driver releases (Qwen). Community feedback is shifting from "can the agent do the task" to "can we trust the agent at scale": the loudest recurring issues concern truthful subagent completion status, silent context/compaction loss, background polling that burns tokens, and Windows-specific breakage. Extensibility is emerging as the next competitive layer, with Claude Code's 153-comment Function Hooks proposal leading a broader push toward composable plugins, hot-reloadable configs, and reliable MCP/extension plumbing. Maintainers are responding with hardening work across sandbox boundaries, Guardian/review budgets, daemon persistence, and new autonomy-calibration controls.

---

## 2. Activity Comparison

Reported activity per project digest; counts reflect the aggregation window, and "features" indicate curated subsets rather than absolute totals. No project in this set has Issues/PRs disabled upstream; Codex and Pi are the explicit Discussion-channel users.

| Tool | Issues (window) | PRs (window) | Discussions (window) | Release status |
|---|---|---|---|---|
| Claude Code | 10 hot issues featured (incl. 153-comment #91870) | 1 updated | — | 2 patches: v2.1.266 (gateway regression fix), v2.1.267 (effort cap, system-prompt snapshot) |
| OpenAI Codex | 10 hot issues featured (top: Windows freeze #20214, 111 comments / 87 👍) | Large merged batch; 10 key PRs listed | 11 featured (top: remote-control #9200, 190 👍) | v0.154.0 + 4 alpha builds |
| Gemini CLI | 50 updated; 10 featured (P1 subagent false-success #22323) | 25 updated; 10 featured | — | 1 nightly (NTFS + sandbox fixes); no stable |
| GitHub Copilot CLI | 10 hot issues featured (WSL2 CPU-spin #3700, session-archive #4756) | 2 active (both documentation) | — | v1.0.84-3 (targeted fixes) |
| OpenCode | 50 recently updated; 10 featured (hot-reload #8751, 96 👍) | 10 featured (3+ merges/cleanups) | — | v1.18.30 (Astra prompt, provider fixes) |
| Pi | 10 hot issues featured (auth-delay #8928, stale models #8760/#9294) | 6 updated (5 substantive) | 2 featured (extension showcases) | None in window |
| Qwen Code | 10 hot + 3 notable (conhost leak #11303, history-wipe #11489) | 50 updated in 24h; 13 featured | None reported | v0.23.2 + nightly + TS SDK v0.1.11 + cua-driver v0.20.5 |

Notes: "—" means the digest did not report Discussion activity for that repo (tracker-based community channel). "Updated" includes touched/merged, not only newly opened. Claude Code was in a quiet merge period (1 PR), but its issue conversation was the largest of any repo this window.

---

## 3. Shared Feature Directions

**3.1 Truthful, interruption-aware agent status.** Gemini's P1 #22323 — a subagent hitting MAX_TURNS reports `status: "success"` with no work done — is the clearest signal of a sector-wide problem. Codex (#15723) reports background agents that never wake callers, and OpenCode's auto-approve does not cascade to subagents (#41730). Need: interrupt-aware status, push-based completion, and inherited permission scope.

**3.2 Context and compaction integrity.** Codex's auto-compaction silently discards history (#36642); OpenCode's Kimi compaction yields empty summaries (#41571) while compaction internals leak into JSONL output (#42238); Gemini is fixing session-context poisoning on SIGINT/aborted turns (PR #29265); Pi sees unmatched `toolCall` blocks after aborted turns (#9306); Qwen's VS Code extension update wipes conversation history (#11489); Claude Code mis-accounts 1M-context windows (#81693). Need: explicit consent, accurate summaries, and zero data loss across compaction, aborts, restarts, and updates.

**3.3 End polling as a strategy.** Codex's #13733 and #35259 quantify the tax — wait/status polling can be ~19.8% of raw token volume. Qwen (#11119) shows background-shell output and wake notifications vanishing when the session runtime recycles. Need: event-driven wake-ups and removal of short blocking-wait caps.

**3.4 Safe, composable extensibility.** Claude Code's Function Hooks proposal (#91870, 153 comments) — middleware-style `next()` composition with side-effect tracking — is the strongest articulation of a shared demand. OpenCode's 96-👍 hot-reload request (#8751), Copilot's plugin dependency model (#4487), and Pi's extension-API friction (#9290, missing `x-opencode-session` header) all point to the same requirement: plugins that are deep, live-reloadable, and safely reversible. MCP reliability (env-var expansion in Qwen #11499, OAuth startup fixes in Copilot, MCP opt-in for hosted Codex Apps PR #44318) is the same need at the protocol layer.

**3.5 Sandbox and supply-chain hardening.** Gemini has two large open PRs (#29250, #29214) against indirect prompt injection via build files/untrusted flags and filesystem boundary escapes; Codex merged a WSL interop-escape fix (#44286); Qwen hardened review-sandbox containers against host-trusted state leakage (#9983); Pi's community flagged a possibly-unmaintained/malicious extension package (#9381) and Gemini's Auto Memory sends transcripts to extraction models *before* redaction (#26525). Need: sandbox as a security boundary, not an UX feature.

**3.6 Windows as a first-class platform.** Every major tool has Windows-specific P1s: Claude Code's Cowork Plan9 mounts broken by KB5124008 (#92984); Codex's desktop freeze (#20214) and "no window appears" (#42669); Copilot's WSL2 idle CPU spin at ~215% (#3700); Qwen's 347-orphaned-`conhost.exe` leak (#11303) with an upstream `node-pty` dead-end (#11352); Gemini's NTFS 8.3 short-name path fixes (PR #29116). Windows is the platform where trust is currently being lost.

**3.7 Cross-device and remote session continuity.** Codex's 190-👍 remote-control ask (#9200) has shifted from "doesn't exist" to "unreliable in practice" (#41470); Qwen is fielding demand for local-client/remote-daemon architectures (#11475); Claude Code's stale-closed cross-device session request (#85150) captures the enterprise expectation that session state outlives one terminal. Need: daemon-managed persistence and project-attached sessions across clients.

**3.8 Autonomy calibration.** Claude Code's new `maxEffortLevel` (v2.1.267), Codex's PR blocking goals after three empty automatic continuations (#44320), and OpenCode's goal-mode analysis (#48239/#48240) all address the same friction surfaced in Claude Code #85052: guardrail ceremonies becoming box-checking. Users want to cap effort, not just approve actions.

---

## 4. Differentiation Analysis

| Tool | Differentiating focus | Target-user profile |
|---|---|---|
| **Claude Code** | Enterprise workflow governance: middleware-style Function Hooks proposal, dogfooded built-in mods (`sec-default`, `diff`, `telemetry`), gateway/proxy-aware auth, effort caps, debugging-oriented rendering (`--system-prompt-snapshot off`) | Pro/enterprise engineers on Claude subscriptions; proxy/gateway and policy-heavy deployments |
| **OpenAI Codex** | Always-on agent platform: managed daemon, worktrees, ChatGPT remote control, mobile sync, Guardian review budgets, sandbox hardening | ChatGPT-centric, cloud-synced teams; Windows desktop users (currently its weakest point) |
| **Gemini CLI** | Security-focused, shell-native agent: sandboxed execution is the dominant PR theme; investing in AST-aware code navigation and Auto Memory; nightly cadence | Developers on Google models and security-sensitive/automated workflows |
| **GitHub Copilot CLI** | GitHub-ecosystem integration: CAIP/WebSocket agent protocol, Mission Control, MCP registry, managed policies; conservative, mature release cadence | GitHub-enterprise developers in policy-driven organizations |
| **OpenCode** | Config-driven, multi-provider open-source tool: hot-reload culture, per-project `AGENTS.md`, ACP session options, headless `serve`, plan-mode-as-invariant enforcement, desktop app | OSS community and multi-model teams; CI/automation consumers of `--format json` |
| **Pi** | Lightweight, extension-first counterpoint: no built-in permission popups, with a third-party permission gate (`pi-verdict`) as a showcase; extension-driven sub-agent views | Extension authors, TUI purists, long-running local sessions |
| **Qwen Code** | Multi-surface platform play: VS Code Companion, daemon-hosted Web Shell (white-labelable), TypeScript SDK, prebuilt CUA driver binaries, remote-development enablement | VS Code users, web-deployed/white-label orgs, Alibaba-ecosystem and multi-device workflows |

Technical-approach divergence is clear: Claude Code centralizes around safe hooks/middleware; Codex around a resilient managed daemon plus cloud/mobile sync; Gemini around bash-native behavior inside hardened sandboxes; Copilot around GitHub's agent protocol; OpenCode around config-as-code and provider neutrality; Pi around a minimal core extended by community packages; Qwen around a distributed daemon/Web Shell/driver stack.

---

## 5. Community Momentum & Maturity

**Fastest shipping velocity:** Qwen Code (50 PRs updated, 4 release artifacts) and Gemini CLI (25 PRs, targeted nightly) are iterating fastest, though both carry open P1 trust bugs (conhost leak; subagent false-success/hangs). OpenAI Codex also shows strong engineering throughput — a large merged PR batch plus alphas — but its Windows reliability backlog is the most-commented issue set across all repos (111 comments on #20214).

**Highest-signal community conversations:** Claude Code's Function Hooks thread (153 comments, 90 👍) remains the sector's most important architecture discussion; Codex's remote-control ask (190 👍) and OpenCode's hot-reload request (96 👍) define their roadmaps' demand side. Pi and Copilot CLI have smaller, quieter communities: Pi's digest centers on extension showcases, while Copilot CLI's only active PRs were documentation — yet its community keeps resurrecting a year-old light-theme bug (#135) and recurring 400 WebSocket errors (#2147/#4791), suggesting responsiveness gaps.

**Overall maturity ranking:** Copilot CLI (v1, stable, conservative) and Claude Code (enterprise-grade but patch-focused this window) are the most mature; Codex and Gemini are maturing fastest on engineering but still accumulating platform debt; Qwen and OpenCode are high-velocity followers with strong multi-provider reach; Pi is a small-but-engaged niche with meaningful extension-API lessons for the others.

---

## 6. Trend Signals

1. **Agent state must be truthful before it can be autonomous.** The most damaging bug class this window is interrupted work masquerading as goal success (Gemini #22323) or empty continuation loops (Codex #44320). CI/automation buyers should treat status semantics as a security boundary, not a logging detail.
2. **Context management is becoming a consent UX.** Compaction that silently discards history (Codex #36642), leaks into structured output (OpenCode #42238), or produces empty summaries (OpenCode #41571) is the fastest way to lose user trust. Expect "what will be summarized/removed and when" to become a first-class UI surface.
3. **Polling is rejected across the ecosystem.** Token waste from wait-polling (Codex #13733/#35259), dropped background output (Qwen #11119), and missing wake-ups (Codex #15723) all point to one industry expectation: agents should push events, not re-enter the model to check for completion.
4. **Middleware-style plugin architecture is the emerging standard for agent extensibility.** Claude Code's `next()`-continuation hook proposal, Pi's watchdog-style permission gates, and OpenCode's hot-reload demand converge on the same design constraints: composable, order-sensitive, side-effect-tracked, and reversible.
5. **Sandboxing and supply-chain hygiene are the gating factors for unattended mode.** Indirect prompt injection through build files (Gemini #29250), WSL interop escapes (Codex #44286), redaction-after-extraction (Gemini #26525), and flagged third-party packages (Pi #9381) define the threat model for autonomous agents.
6. **Windows reliability is the current battleground for developer trust.** A Windows P1 exists in nearly every tool — Plan9 mounts, conhost/ConPTY leaks, WSL2 CPU spins, missing app windows. Cross-platform support is no longer table stakes; it is a differentiator.
7. **Session state is decoupling from the terminal.** Daemon thread restoration (Codex #44314), remote daemons (Qwen #11475), and cross-device continuity expectations (Codex #9200, Claude #85150) show the client is becoming a viewport into a durable, resumable agent session.
8. **Autonomy is becoming a configurable budget, not a binary mode.** `maxEffortLevel`, goal-loop blockers, and goal-mode proposals all indicate the industry is converging on explicit control knobs for "how much should the agent do before it reports back."

**Reference value for developers:** when evaluating an AI CLI tool today, weight four things above raw model quality: how it handles interrupted-work status, what safeguards exist around compaction/context loss, whether background work is event-driven or poll-based, and how healthy its Windows story is. Secondary differentiators — plugin safety, sandbox strength, session continuity, and effort calibration — are where the tools will separate over the next two quarters.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

Report note: The provided dataset did not expose numeric `Comments` values, so rankings follow the source list ordering, which was sorted by comment count. All PRs shown are open — none is marked merged in the snapshot.

## 1. Top Skills Ranking

**1. `skill-creator` evaluation fix — [PR #1298](https://github.com/anthropics/skills/pull/1298)**  
This is not a user-facing Skill, but a critical repair to the `skill-creator` tooling that produces/evaluates Skills. It fixes `run_eval.py` always reporting `recall=0%` by installing the eval artifact as a real Skill, plus Windows subprocess/stream reading, trigger detection, and parallel-worker issues.  
**Discussion highlights:** Community issue [#556](https://github.com/anthropics/skills/issues/556) is referenced with 10+ independent reproductions; the description-optimization loop was effectively “optimizing against noise.”  
**Status:** Open.

**2. `document-typography` — [PR #514](https://github.com/anthropics/skills/pull/514)**  
Adds a document quality-control Skill for typographic problems in generated documents: orphan word wrap, widowed paragraphs/section headers stranded at page bottom, and numbering misalignment.  
**Discussion highlights:** Positions itself as a universal issue: these problems affect “every document Claude generates” and users rarely ask for good typography explicitly.  
**Status:** Open.

**3. `scnet-hpc` — [PR #1615](https://github.com/anthropics/skills/pull/1615)**  
Adds a domain-specific Skill for operating SCNet HPC clusters through profile-based SSH and Slurm workflows. It covers cluster discovery, partition/memory/module/accelerator guidance, SSH setup, Slurm job generation, profile refresh, and compute-node instructions.  
**Discussion highlights:** A complete HPC workflow Skill; useful for scientific/research users, with recent activity in August 2026.  
**Status:** Open.

**4. `pdf` file-reference fix — [PR #538](https://github.com/anthropics/skills/pull/538)**  
Fixes eight case-sensitivity mismatches in the PDF Skill’s `SKILL.md`: `REFERENCE.md` → `reference.md` and `FORMS.md` → `forms.md`.  
**Discussion highlights:** Small but meaningful reliability fix for case-sensitive filesystems; the files were lowercase but the Skill referenced uppercase names.  
**Status:** Open.

**5. `odt` — [PR #486](https://github.com/anthropics/skills/pull/486)**  
Adds OpenDocument format support: create/fill/read/convert `.odt` and `.ods`, including template filling and ODT-to-HTML parsing. Triggers on ODF, OpenDocument, LibreOffice, ODT/ODS mentions, and ISO-standard document requests.  
**Status:** Open.

**6. `frontend-design` clarity improvement — [PR #210](https://github.com/anthropics/skills/pull/210)**  
Revises the `frontend-design` Skill so instructions are actionable inside a single conversation, internally coherent, and specific enough to steer behavior without being generic.  
**Discussion highlights:** Reflects a recurring community complaint: Skills should operate as instructions for Claude, not as human-facing developer documentation.  
**Status:** Open.

**7. `skill-quality-analyzer` + `skill-security-analyzer` — [PR #83](https://github.com/anthropics/skills/pull/83)**  
Adds two meta-Skills to the marketplace: a quality analyzer evaluating structure, documentation, examples, and resources across five weighted dimensions, and a security analyzer for risky Skill behavior.  
**Discussion highlights:** Directly relevant to community security concerns about community-contributed Skills living under the official Anthropic namespace.  
**Status:** Open.

**8. DOCX orphaned-comments detection — [PR #1734](https://github.com/anthropics/skills/pull/1734)**  
The PR description is empty in the dataset, but the title indicates a document-integrity feature for detecting orphaned DOCX comments. It attracted enough comments to sit near the top of the popular-PR list.  
**Status:** Open.

## 2. Community Demand Trends

The Issues data points to several concentrated demand areas:

- **Security and trust boundaries for Skills.** The largest issue, [#492](https://github.com/anthropics/skills/issues/492), is about community Skills distributed under the `anthropic/` namespace impersonating official Anthropic Skills. [#1175](https://github.com/anthropics/skills/issues/1175) also raises access-control and context-window concerns when handling SharePoint documents. The community is asking for identity separation, permission guardrails, and security analysis of Skills.

- **Evaluation and measurable quality of Skills.** Issues [#556](https://github.com/anthropics/skills/issues/556) and [#1390](https://github.com/anthropics/skills/issues/1390) show deep frustration with evaluation harnesses that report false-zero results. The demand is not for more Skills, but for reliable ways to test whether a Skill description actually triggers, works cross-platform, and produces valid metrics.

- **Context-window efficiency.** Issue [#1487](https://github.com/anthropics/skills/issues/1487) reports the `claude-api` Skill eagerly injecting ~156k tokens into context. Issue [#1329](https://github.com/anthropics/skills/issues/1329) proposes a `compact-memory` Skill for symbolic notation to reduce long-running agent memory overhead. Duplicate content across plugins, [#189](https://github.com/anthropics/skills/issues/189), also wastes context.

- **Organizational sharing and packaging.** Issue [#228](https://github.com/anthropics/skills/issues/228) requests org-wide Skill sharing in Claude.ai without manual `.skill` file downloads. Related packaging concerns include duplicate Skills between `document-skills` and `example-skills` ([#189](https://github.com/anthropics/skills/issues/189)), exposing Skills as MCP APIs ([#16](https://github.com/anthropics/skills/issues/16)), and running Skills via Bedrock ([#29](https://github.com/anthropics/skills/issues/29)).

- **Document/artifact quality assurance.** The community repeatedly wants validation layers around generated artifacts: typography quality ([PR #514](https://github.com/anthropics/skills/pull/514)), orphaned DOCX comments ([PR #1734](https://github.com/anthropics/skills/pull/1734)), OOXML integrity fixes ([PR #541](https://github.com/anthropics/skills/pull/541)), and self-audit/reasoning quality gates ([#1385](https://github.com/anthropics/skills/issues/1385)).

## 3. High-Potential Pending Skills

These open PRs add or substantially expand Skills and have enough community attention/recency to land soon if maintainer review proceeds:

- **`testing-patterns` — [PR #723](https://github.com/anthropics/skills/pull/723)**  
  A broad testing Skill covering testing philosophy, unit testing patterns, React component testing, and what not to test. Low-risk and generally useful.

- **`self-audit` — [PR #1367](https://github.com/anthropics/skills/pull/1367)**  
  A universal pre-delivery audit Skill: mechanical file verification first, then a four-dimension reasoning-quality audit in damage-severity order. Aligns with the community’s quality-gate demand.

- **`Hivemind` — [PR #1628](https://github.com/anthropics/skills/pull/1628)**  
  Zero-cost multi-agent orchestration: Claude Code plans/reviews/merges while headless `opencode` workers on free models handle mechanical work. High community interest, but likely needs deeper security review.

- **`buffer-api` — [PR #1627](https://github.com/anthropics/skills/pull/1627)**  
  A portable Agent Skill for the Buffer GraphQL API: account/channel discovery, post scheduling, and queue management. Works across Claude, Cursor, Codex, and other agents.

- **`scnet-hpc` — [PR #1615](https://github.com/anthropics/skills/pull/1615)**  
  Already visible in the top ranking; it is a well-scoped, profile-driven HPC/Slurm Skill with recent activity and no obvious cross-platform fragility.

- **`odt` — [PR #486](https://github.com/anthropics/skills/pull/486)**  
  OpenDocument interoperability is a recurring documentation-format gap; this Skill would round out the repo’s office-format coverage.

- **`skill-quality-analyzer` / `skill-security-analyzer` — [PR #83](https://github.com/anthropics/skills/pull/83)**  
  These meta-Skills address the ecosystem’s biggest governance gap: how to evaluate and secure Skills before users install them.

## 4. Skills Ecosystem Insight

The community’s most concentrated demand is not for more domain-specific Skills, but for **meta-Skills and infrastructure that make Skills themselves secure, measurable, context-efficient, and trustworthy** — quality analyzers, evaluation harness fixes, compact-memory patterns, self-audit gates, and document/artifact integrity checks.

---

# Claude Code Community Digest — 2026-09-10
*Window: 2026-09-09 → 2026-09-10 · Source: https://github.com/anthropics/claude-code*

## Today's Highlights

Claude Code shipped two patch releases: v2.1.266 fixes a gateway/proxy sign-in regression introduced in v2.1.265, and v2.1.267 adds a cross-provider effort cap (`maxEffortLevel`) plus `--system-prompt-snapshot off` for rendering the system prompt fresh on every request. The community's most active conversation is the Function Hooks proposal ([#91870](https://github.com/anthropics/claude-code/issues/91870), 153 comments, 90 👍) for a safe, composable plugin architecture, with a companion PR publishing Claude Code's built‑in `sec-default`, `diff`, and `telemetry` mods as hook modules. On the bug front, a Windows update (KB5124008) is breaking all Cowork Plan9 mounts ([#92984](https://github.com/anthropics/claude-code/issues/92984)), while a stale-issue sweep closed several unresolved 1M-context and safeguard false-positive reports ([#81693](https://github.com/anthropics/claude-code/issues/81693), [#83436](https://github.com/anthropics/claude-code/issues/83436)), making their fix status unclear.

## Releases

- **[v2.1.267](https://github.com/anthropics/claude-code/releases)** — Focused on control and debuggability:
  - Added `maxEffortLevel` setting (top-level or per model under `modelSettings`): caps the effort level on every provider, including Bedrock, Vertex, and Foundry; users can still pick a lower level.
  - Added `--system-prompt-snapshot off` to render the system prompt fresh on every request — useful for debugging hook interactions and prompt-caching edge cases.

- **[v2.1.266](https://github.com/anthropics/claude-code/releases)** — Regression fix for proxy/gateway users:
  - Fixed a v2.1.265 regression where `CLAUDE_CODE_USE_GATEWAY` began forcing Cloud-gateway sign-in on its own. Previously it was ignored unless both `ANTHROPIC_BASE_URL` and `ANTHROPIC_AUTH_TOKEN` were set; v2.1.266 restores that behavior. Important for LLM-gateway and proxy setups that upgrade promptly.

## Hot Issues

1. **[[#91870] Function Hooks: make plugins 10x more powerful](https://github.com/anthropics/claude-code/issues/91870)** — OPEN · 153 comments · 90 👍
   The largest community conversation on the repo right now. It proposes a middleware-style hook system (registration-order `next` continuation, Express/Koa style) with side-effect tracking over a parameterized `$` object, enabling deep but safe modifications to Claude Code. This appears to be the clearest public signal of where the plugin architecture is heading.

2. **[[#92984] Windows Cowork: all Plan9 shares fail after KB5124008](https://github.com/anthropics/claude-code/issues/92984)** — OPEN · 24 comments · 11 👍
   Filed yesterday with a repro: after Windows update KB5124008 (26200.9445), all Cowork Plan9 mounts fail with `Plan9 mount failed: invalid argument`; uninstalling the KB fixes it. A hard blocker for Windows Cowork users, with strong community engagement and a concrete workaround.

3. **[[#64568] Esc to exit /btw mode rejects the pending tool-use prompt](https://github.com/anthropics/claude-code/issues/64568)** — OPEN · 13 comments · 9 👍
   Long-standing TUI regression: pressing Esc to leave `/btw` mode is routed to the pending permission prompt and declines the tool use instead of just exiting the mode. Accidentally denying tools erodes trust in permission flows; the issue remains open after three months.

4. **[[#83436] Cyber-safeguard false positives on scientific computing session](https://github.com/anthropics/claude-code/issues/83436)** — CLOSED (stale) · 12 comments
   A legitimate IR-spectrometer calibration session was repeatedly blocked by cyber safeguards, firing on accumulated context and affecting both Opus 5 and Opus 4.8. Closed as stale without a visible resolution — representative of a recurring false-positive pattern.

5. **[[#81693] Opus 5 context window incorrectly reported as 200K instead of 1M](https://github.com/anthropics/claude-code/issues/81693)** — CLOSED (stale) · 6 comments
   The CLI reports `context_window_size: 200000` for a 1M-context model, causing the statusline gauge to saturate and `/compact` to appear ineffective. Paired with the similar Sonnet 5 report ([#84310](https://github.com/anthropics/claude-code/issues/84310)), this points to a systematic gap in how 1M-context models are accounted for internally.

6. **[[#79810] Custom sidebar groups disappear after switching Claude accounts](https://github.com/anthropics/claude-code/issues/79810)** — OPEN · 5 comments · 4 👍
   Desktop-app users who organize projects into custom sidebar groups lose that structure after switching accounts and back. An organizational-data bug that is especially disruptive for heavy multi-account users.

7. **[[#85052] Opus 5: structural guardrails are satisfiable by ceremony — 22 review rounds](https://github.com/anthropics/claude-code/issues/85052)** — CLOSED (stale) · 3 comments
   A distinctive report from a long autonomous session: the model burned roughly 22 external-review rounds on defects it should have caught before dispatching review, demonstrating that elaborate guardrail ceremonies can become box-checking rather than quality gates. Important reading for anyone building agentic review loops.

8. **[[#85150] Cross-device session continuity for Claude Code](https://github.com/anthropics/claude-code/issues/85150)** — CLOSED (stale) · 3 comments
   A Max customer requests continuity for long-running business sessions across devices. Closed by the stale sweep, but it captures an enterprise expectation that session state shouldn't be tied to a single terminal or machine.

9. **[[#88293] Cursor jumps and overwrites text in VS Code integrated terminal](https://github.com/anthropics/claude-code/issues/88293)** — OPEN · 1 comment
   A macOS-specific TUI bug (continuation of [#3116](https://github.com/anthropics/claude-code/issues/3116)) where arrow keys trigger cursor jumps/overwrites after a few minutes in the VS Code terminal. Niche but very visible to a common developer setup.

10. **[[#88877] OAuth redirect_uri mismatch on headless Linux](https://github.com/anthropics/claude-code/issues/88877)** — OPEN · 1 comment
    v2.1.240 generates `/auth/code/callback` but the OAuth server expects `/oauth/code/callback`, breaking login on headless Ubuntu VPS/tmux setups. Critical for SSH-based and automation-heavy workflows.

Note: several substantive reports above were closed by the stale sweep on 2026-09-09 without an accompanying "fixed" status, making it hard for the community to tell whether they were silently resolved or dropped.

## Key PR Progress

Only one PR was updated in the last 24 hours, so the usual top-10 list is shorter:

- **[[#93215] Add mods: sec-default, diff, and telemetry](https://github.com/anthropics/claude-code/pull/93215)** — CLOSED · author: poteat
  Publishes the three hooks-module plugins built into Claude Code as source: `sec-default` (an organization's default outermost plugin), `diff` (`/diff`), and `telemetry` (`$.telemetry`). Each folder is a complete plugin with documentation in `mods/README.md`; they load only where function hooks are enabled ("early access"). The overlap with [#91870](https://github.com/anthropics/claude-code/issues/91870) is notable: it treats security defaults, diff, and telemetry as first-class examples of a function-hooks runtime — i.e., Claude Code dogfooding its own future plugin architecture.

No other PR activity met the 24-hour filter; the repository appears to be in a quiet merge period while patch releases and the hooks discussion take center stage.

## Feature Request Trends

- **Safe, composable plugin/hook architecture.** [#91870](https://github.com/anthropics/claude-code/issues/91870) is the clearest community ask: deep modifiability with side-effect tracking and Express/Koa-style composition. PR [#93215](https://github.com/anthropics/claude-code/pull/93215) suggests the built-in `sec-default`, `diff`, and `telemetry` modules will be the reference examples.
- **Session continuity across devices and clients.** [#85150](https://github.com/anthropics/claude-code/issues/85150) (cross-device sessions for Max) and [#85131](https://github.com/anthropics/claude-code/issues/85131) (silent draft loss in the Android app) both point to the same expectation: session state should survive beyond one device or terminal.
- **Transparent plan entitlements and model availability.** [#76237](https://github.com/anthropics/claude-code/issues/76237) (Fable 5 missing from `/model` on Max 20) and [#85175](https://github.com/anthropics/claude-code/issues/85175) (Cowork disabled on Pro with confusing "Missing HCS services" messaging) show users want the CLI/desktop to reflect accurate subscription state and actionable errors.
- **Correct 1M-context handling.** [#81693](https://github.com/anthropics/claude-code/issues/81693) and [#84310](https://github.com/anthropics/claude-code/issues/84310) request that Opus 5 / Sonnet 5 be treated as 1M-context models in the statusline, context gauge, and `/compact` logic.
- **More granular effort-level control.** The new `maxEffortLevel` option in v2.1.267 begins to address the underlying demand surfaced in reports like [#85052](https://github.com/anthropics/claude-code/issues/85052): users want to cap how much effort models spend on elaborate review/ceremony vs. actual work.

## Developer Pain Points

- **Safeguard false positives keep interrupting legitimate work.** Recurring across scientific computing ([#83436](https://github.com/anthropics/claude-code/issues/83436)), offensive-security testing ([#85157](https://github.com/anthropics/claude-code/issues/85157)), and general legitimate requests ([#85164](https://github.com/anthropics/claude-code/issues/85164)) — users report classifiers pattern-matching vocabulary rather than intent, forcing workarounds like switching to Opus 4.8.
- **1M-context models are mis-accounted by the CLI.** [#81693](https://github.com/anthropics/claude-code/issues/81693) / [#84310](https://github.com/anthropics/claude-code/issues/84310): statusline gauges saturate and `/compact` appears to do nothing when the client thinks the window is 200K.
- **Fragile auth and entitlement state in long-lived or headless sessions.** Mid-session auth drops ([#83639](https://github.com/anthropics/claude-code/issues/83639)), stale subscription state ([#76237](https://github.com/anthropics/claude-code/issues/76237)), and broken OAuth redirects on headless Linux ([#88877](https://github.com/anthropics/claude-code/issues/88877)) all undermine confidence in unattended/SSH workflows.
- **OS and environment updates breaking core features.** Windows KB5124008 breaks Cowork Plan9 shares ([#92984](https://github.com/anthropics/claude-code/issues/92984)); VS Code integrated terminal cursor corruption persists on macOS ([#88293](https://github.com/anthropics/claude-code/issues/88293)); migration-assistant data transfers appear to aggravate terminal issues.
- **Multi-client inconsistency.** Sidebar groups lost on account switch in the desktop app ([#79810](https://github.com/anthropics/claude-code/issues/79810)), no sign-out/account switching in the Chrome extension ([#85159](https://github.com/anthropics/claude-code/issues/85159)), and Android draft loss ([#85131](https://github.com/anthropics/claude-code/issues/85131)) suggest client-specific persistence and account-management bugs that erode cross-platform trust.
- **Agentic behavior outruns user intent.** Reports like [#85173](https://github.com/anthropics/claude-code/issues/85173) (the agent starts implementing instead of answering) and [#85167](https://github.com/anthropics/claude-code/issues/85167) (rework loops and excessive time-to-completion) indicate that autonomous-mode calibration — when to act vs. confirm — is a growing friction point for experienced users.
- **Stale-sweep ambiguity.** A wave of labels added on 2026-09-09 closed issues without verified fixes, including the 1M-context and safeguard false-positive reports above. Without a linked fix or "resolved" note, the community has no way to distinguish silent fixes from abandoned reports.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-10

## 1. Today's Highlights
Codex CLI v0.154.0 lands GPT-6-Astra (model picker + Amazon Bedrock) and experimental worktree support for isolated session checkouts. Behind the scenes, a large batch of merged PRs hardens managed-daemon thread persistence, Guardian review budgets, and sandbox security — including a fix for WSL interop escapes. Community sentiment is dominated by two themes: token/credit drain from wait-polling loops, and Windows app reliability regressions.

## 2. Releases
**[rust-v0.154.0](https://github.com/openai/codex/releases)**
- **GPT-6-Astra** is now available in the model picker and Amazon Bedrock catalogs.
- **Experimental worktree support**: create isolated checkouts for new or forked sessions with `--worktree` or `/worktree`, then browse and resume them.

Additional builds cut in the last 24h: `0.154.0-alpha.6.1`, `0.154.0-alpha.8`, `0.154.0-alpha.10.2`, `0.154.0-alpha.11` (no individual changelogs published).

## 3. Hot Issues
- [openai/codex#20214](https://github.com/openai/codex/issues/20214) — **Codex App freezes/stutters on Windows 11 Pro** despite sufficient resources. The single most-commented issue (111 comments, 87 👍); users report regular UI stalls during normal use.
- [openai/codex#13733](https://github.com/openai/codex/issues/13733) — **Background-process polling wastes tokens**: every `write_stdin` poll triggers a full API turn with complete history. 40 comments/40 👍 — this is the canonical "burning tokens while waiting" complaint.
- [openai/codex#25178](https://github.com/openai/codex/issues/25178) — **Windows Computer Use screenshots fail on Windows 10 22H2** (`SetIsBorderRequired failed: 0x80004002`), even though window listing, activation, and keyboard input work.
- [openai/codex#35259](https://github.com/openai/codex/issues/35259) — **Codex Desktop re-enters the model during wait/status polling**; model turns whose only action was wait/status accounted for 19.8% of raw local token volume in a corrected usage window.
- [openai/codex#15723](https://github.com/openai/codex/issues/15723) — **Background subprocesses/subagents do not wake the calling agent** on completion, forcing the caller to poll instead of being notified.
- [openai/codex#36642](https://github.com/openai/codex/issues/36642) — **Auto-compaction silently discards all conversation history since 0.145.0** — a serious correctness regression that can erase context without user consent.
- [openai/codex#34337](https://github.com/openai/codex/issues/34337) — **Session rollout storage can grow to tens/hundreds of GiB (even TiB-scale)** during normal long-running use; CLI and Desktop share the store.
- [openai/codex#41470](https://github.com/openai/codex/issues/41470) — **Windows/Android Remote sync is asymmetric**: newer desktop projects don't appear on Android, and mobile-started threads hit trust gates.
- [openai/codex#36195](https://github.com/openai/codex/issues/36195) — **New realtime voice chats start projectless** instead of attaching to the selected project folder, breaking context continuity.
- [openai/codex#42669](https://github.com/openai/codex/issues/42669) — **Windows desktop app launches processes but no window ever appears** ("Artifact Session host Unix-socket transport is not available on Windows"); latest in a string of Windows UI regressions.

## 4. Key PR Progress
- [openai/codex#44320](https://github.com/openai/codex/pull/44320) — **Block goals after three empty automatic continuation turns**, marking the goal `blocked` instead of looping on empty final answers.
- [openai/codex#44286](https://github.com/openai/codex/pull/44286) — **Block WSL interop escapes from restricted filesystem sandboxes**: masks WSL interop sockets so `wsl.exe` can't re-enter the distribution as root.
- [openai/codex#44288](https://github.com/openai/codex/pull/44288) — **Prevent command hooks from hanging on blocked stdin**: writes stdin concurrently with output draining and brings stdin writes under the hook timeout.
- [openai/codex#44314](https://github.com/openai/codex/pull/44314) — **Restore saved threads when the managed daemon restarts** by consuming the recovery snapshot at startup so active goals continue without client reconnect.
- [openai/codex#44283](https://github.com/openai/codex/pull/44283) — **Persist loaded threads before managed daemon shutdown** (hidden `--managed-daemon` flag); shutdown remains forceable when rollout I/O is blocked.
- [openai/codex#44311](https://github.com/openai/codex/pull/44311) — **Honor shared Retry-After deadlines for remote control**, closing bypasses via pairing, auth changes, reconnects, and proactive token refresh.
- [openai/codex#44293](https://github.com/openai/codex/pull/44293) — **Enforce the async Guardian classifier's complete input budget**, including parent compaction checkpoints and images.
- [openai/codex#44281](https://github.com/openai/codex/pull/44281) — **Enforce complete request budgets for Guardian reviews** so review evidence plus history/tools/output format can't blow the reviewer context window.
- [openai/codex#44318](https://github.com/openai/codex/pull/44318) — **Give hosted Codex Apps an independent MCP protocol opt-in** (`features.codex_apps_mcp_2026_07_28`), disabled by default.
- [openai/codex#44307](https://github.com/openai/codex/pull/44307) — **Opt-in provisioned macOS CLI release candidates** for Apple Silicon and Intel, packaged as a relocatable `CodexCLI.app` with embedded provisioning profile.

## 5. Hot Discussions

**Ideas**
- [openai/codex#9200](https://github.com/openai/codex/discussions/9200) — **Remote-control Codex from the ChatGPT app** (190 👍, 46 comments). The most-upvoted ask; the feature now exists but many follow-up bugs show it's not yet reliable cross-device.
- [openai/codex#9618](https://github.com/openai/codex/discussions/9618) — **`/rewind` or `/revert` feature** (128 👍). Strong demand for undo support comparable to OpenCode/Claude Code.
- [openai/codex#38834](https://github.com/openai/codex/discussions/38834) — **Reader Mode with Read Aloud** for long Codex responses on desktop.

**Q&A / General**
- [openai/codex#3057](https://github.com/openai/codex/discussions/3057) — **Codex using Python to edit files instead of the File Edit tool**: users ask whether this indicates a tool problem or just model preference.
- [openai/codex#14104](https://github.com/openai/codex/discussions/14104) — **New-line insertion in Codex CLI**: request for Shift+Enter behavior instead of Ctrl+J.

**Show and tell**
- [openai/codex#42041](https://github.com/openai/codex/discussions/42041) — **agent-watch**: distinguishing DONE, FAILED, and STALL for background `codex exec` workers.
- [openai/codex#44153](https://github.com/openai/codex/discussions/44153) — **isitdone**: a Stop hook that blocks "done" until tests/typecheck/lint pass on the exact working tree.
- [openai/codex#44109](https://github.com/openai/codex/discussions/44109) — **postbag**: "letters" between Codex and Claude Code sessions on one machine using each agent's native wake-up mechanism.
- [openai/codex#44247](https://github.com/openai/codex/discussions/44247) — **Codex Voice for Intel Mac users** who can't run the ChatGPT desktop app: browser voice UI over local Codex CLI.
- [openai/codex#44291](https://github.com/openai/codex/discussions/44291) — **Brain Scanner**: inspect recorded coding-agent work, then queue the next fix from a project graph.

## 6. Feature Request Trends
- **Mobile/remote control**: #9200 remains the community's biggest feature desire (190 👍); new issues like #41470 and #44316 show the gap has shifted from "doesn't exist" to "unreliable in practice."
- **Undo/rewind/revert**: driven by #9618 (128 👍); no first-class support yet, users want agentic undo without committing on every change.
- **Kill the polling tax**: multiple issues (#13733, #35259, #31935) request event-driven wake-ups, longer blocking waits, and removal of the 60-second cap — the community consistently rejects polling as a strategy.
- **Worktree/VCS flexibility**: experimental worktree support shipped in v0.154.0; #26648 asks for Jujutsu (`jj`) support or custom worktree hooks.
- **Session continuity**: daemon restart recovery, project-attached voice chats, and thread restoration dominate both bug reports and PR work.

## 7. Developer Pain Points
- **Token/credit drain from wait-polling**: the clearest recurring frustration; polling loops re-enter the model with full history, hitting rate limits and credits.
- **Windows reliability**: freezes, missing windows after auto-update, Computer Use screenshot failures, non-atomic `config.toml` writes, and WSL/native path regressions make Windows the platform with the most open bug density.
- **Silent state/data loss**: auto-compaction discarding history (#36642), empty projected history in subagent threads (#38762), and tasks reverting to first-turn-only (#42662) undermine trust.
- **Unbounded local storage**: rollout/session stores growing from GiB to TiB scale without cleanup or caps (#34337, #42648).
- **Subagent coordination gaps**: background agents don't wake callers, subagents inherit task controls and can create independent user-owned threads (#38687), and resuming historical subagent threads spawns duplicate MCP/process stacks on Windows (#37453).
- **Remote still fragile**: asymmetric project sync, trust gates, Unix-only daemon assumptions on Windows, and WebSocket 503s on macOS pairings show the remote story is incomplete.
- **Terminal ergonomics**: paste broken in CLI 153.4 (#44323), no intuitive multi-line input (#14104), and hooks that can hang indefinitely when stdin is blocked.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-10

*Aggregated from 50 updated issues and 25 pull requests on github.com/google-gemini/gemini-cli.*

## 1. Today's Highlights

The project shipped a new nightly (`v0.61.0-nightly.20260909.ged2ac40df`) containing targeted fixes for NTFS path handling and sandbox settings isolation, while the broader PR pipeline is dominated by security hardening: two large open PRs tackle indirect prompt injection via build files and filesystem boundary enforcement. On the issue tracker, community attention remains concentrated on subagent reliability — a P1 bug where a maxed-out subagent reports `GOAL` success (#22323) is the most active thread, alongside the ever-green generalist agent hang (#21409) that users work around by disabling subagents entirely.

## 2. Releases

- [v0.61.0-nightly.20260909.ged2ac40df](https://github.com/google-gemini/gemini-cli/releases) — nightly. Captured changes:
  - `fix(core)`: mitigate NTFS 8.3 short name (SFN) path issues in sandbox/worktree scenarios — [PR #29116](https://github.com/google-gemini/gemini-cli/pull/29116)
  - `fix(cli)`: isolate the settings directory inside sandbox containers to prevent host config leakage — [PR #29216](https://github.com/google-gemini/gemini-cli/pull/29216)
  - Changelog was truncated in the sync; additional commits may be present. No stable release in this window.

## 3. Hot Issues

1. [**#22323 — Subagent recovery after MAX_TURNS reported as GOAL success**](https://github.com/google-gemini/gemini-cli/issues/22323) *(P1, bug, 13 comments)* — A `codebase_investigator` that hits its turn limit reports `status: "success"` and `Termination Reason: "GOAL"` despite doing no analysis. This is a dangerous correctness bug: interrupted work is indistinguishable from completed work. Highest-engagement issue this window and the clearest signal for an agent status/reporting rework.

2. [**#21409 — Generalist agent hangs**](https://github.com/google-gemini/gemini-cli/issues/21409) *(P1, bug, 8 comments, 8 👍)* — Any deferral to the generalist agent can hang indefinitely, even for simple folder creation. Community workaround is to instruct the model to never use subagents, which is a heavy functional compromise. High 👍 count confirms broad impact.

3. [**#19873 — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing**](https://github.com/google-gemini/gemini-cli/issues/19873) *(P2, enhancement, 9 comments)* — Proposal to give Gemini 3's bash-native behavior a safe POSIX sandbox rather than constraining it with custom tools. Aligns with this week's sandbox-hardening PRs and suggests maintainers are converging on this direction.

4. [**#22745 — EPIC: AST-aware file reads, search, and mapping**](https://github.com/google-gemini/gemini-cli/issues/22745) *(P2, feature, 7 comments)* — Tracks investigations into method-bounds reads, AST-guided search, and codebase mapping to reduce token noise and turn count. Companion issue [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) suggests `tilth`/`glyph` as starting points for the `codebase_investigator`.

5. [**#26525 — Add deterministic redaction and reduce Auto Memory logging**](https://github.com/google-gemini/gemini-cli/issues/26525) *(P2, security, 5 comments)* — Auto Memory sends transcripts to an extraction model *before* redaction happens, meaning secrets are exposed to model context and potentially logged. Security-sensitive and reinforces the need for pre-context redaction pipelines.

6. [**#25166 — Shell command execution stuck with "Waiting input"**](https://github.com/google-gemini/gemini-cli/issues/25166) *(P1, bug, 4 comments, 3 👍)* — Simple, non-interactive shell commands complete but the session hangs showing an active command awaiting input. Repeatedly reproducible and disruptive to long automation runs.

7. [**#26522 — Stop Auto Memory from retrying low-signal sessions indefinitely**](https://github.com/google-gemini/gemini-cli/issues/26522) *(P2, bug, 4 comments)* — Sessions skipped by the extractor as low-signal are never marked processed, so they can resurface forever. Points to a state-machine flaw in the memory extraction queue rather than a model-quality issue.

8. [**#21983 — Browser subagent fails in Wayland**](https://github.com/google-gemini/gemini-cli/issues/21983) *(P1, bug, 4 comments, 1 👍)* — Browser agent terminates immediately with a `GOAL` reason under Wayland. Linux/Wayland users lose browser-agent functionality entirely; likely related to the lack of Wayland support in the underlying browser automation stack.

9. [**#21968 — Gemini does not use skills and sub-agents enough**](https://github.com/google-gemini/gemini-cli/issues/21968) *(P2, bug, 6 comments)* — Anecdotal but widely felt: even with well-described custom `gradle`/`git` skills, the model rarely invokes them autonomously. Undermines the value of user-configured customizations and explains why many users see subagents as opt-in-only.

10. [**#20079 — Symlinked files in `~/.gemini/agents/` not recognized**](https://github.com/google-gemini/gemini-cli/issues/20079) *(P2, bug, 4 comments)* — Symlinked agent definitions are silently ignored. Standard dotfile-management setups (e.g., chezmoi, stow) break agent registration without any error or warning.

## 4. Key PR Progress

1. [**#29250 — Prevent indirect prompt injection via build file modifications and untrusted flags**](https://github.com/google-gemini/gemini-cli/pull/29250) *(open, XL)* — Refactors built-in execution paths (`shell`, `edit`, `write_file`) to validate workspace boundaries against build-config and external-flag tampering in restricted mode. Large, security-critical surface area.

2. [**#29214 — Harden sandbox filesystem boundaries and isolate runtime state**](https://github.com/google-gemini/gemini-cli/pull/29214) *(open, L/XL)* — Replaces host directory mounts in sandboxes with sanitized configuration files and standardizes on `realpath`-based path sensitivity checks. Directly complements the settings-isolation fix shipped in the nightly.

3. [**#29265 — Prevent session context poisoning on interrupted turns**](https://github.com/google-gemini/gemini-cli/pull/29265) *(open, P2, M)* — Fixes a critical issue where SIGINT, timeouts, or aborted tool executions corrupt chat session history and break subsequent prompts. Highly relevant to the "stuck/hang" bug family above.

4. [**#29163 — Prevent crash during authentication in git repositories**](https://github.com/google-gemini/gemini-cli/pull/29163) *(open, P1, security, L)* — The `useGitBranchName` hook crashes startup when `.git` access is restricted (macOS Seatbelt). Fixes crash-on-launch for a meaningful set of macOS users.

5. [**#29151 — Handle skill precedence and active state case-insensitively**](https://github.com/google-gemini/gemini-cli/pull/29151) *(open, P1, M)* — `SkillManager` failed to apply workspace skill precedence overrides when skill names differed only in casing; makes precedence and active-skill maps case-insensitive.

6. [**#29156 — Stop nullifying user git config in shell executions**](https://github.com/google-gemini/gemini-cli/pull/29156) *(open, core, M)* — Reverts behavior introduced in #28792 that pointed `GIT_CONFIG_GLOBAL`/`GIT_CONFIG_SYSTEM` at `/dev/null` for every shell command. Users lost `user.name`, signing keys, and other git config, breaking commits made by the CLI.

7. [**#29155 — Decode BOM-encoded content correctly in `isEmpty`**](https://github.com/google-gemini/gemini-cli/pull/29155) *(open, core, M)* — Fixes a UTF-16/UTF-32 BOM decoding bug that made whitespace-only plan files appear non-empty, blocking `validatePlanCommand` and other checks.

8. [**#29248 — Avoid duplicate history and telemetry after confirmation**](https://github.com/google-gemini/gemini-cli/pull/29248) *(open, core, M)* — Guards against duplicate slash-command history entries (e.g., `/resume save <tag>`) when another message arrives while a confirmation prompt is open.

9. [**#29063 — Stop Plan Mode from waiting on user feedback in non-interactive sessions**](https://github.com/google-gemini/gemini-cli/pull/29063) *(closed, P1, M)* — Fixes non-interactive Plan Mode hangs (`gemini -p "..." -y`) where plan workflow instructions told the agent to wait for a user turn that would never arrive. Resolves long-standing issues #28913/#26004.

10. [**#29067 — Remove misleading security schemes and hardcoded credentials from a2a-server**](https://github.com/google-gemini/gemini-cli/pull/29067) *(closed, P1/security, S)* — Strips fake `securitySchemes` and hardcoded credentials from the local-dev agent card so tooling stops advertising authentication that doesn't exist. Fixes #29001.

## 5. Feature Request Trends

- **AST-aware code navigation dominates the roadmap discussion** — Method-bounds reads, AST-guided search, and codebase mapping ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)) are positioned as the cure for noisy file reads, token bloat, and "tactful extraction" concerns ([#19561](https://github.com/google-gemini/gemini-cli/issues/19561)).
- **Bash-native, sandboxed agent execution** — Users and maintainers want the model to operate as a natural POSIX shell user without compromising security ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)); the current wave of sandbox PRs is the concrete implementation of this direction.
- **Persistent task tracking** — Replace in-context `WriteToDo` with file-based CRUD to survive session resets and reduce context rot ([#18836](https://github.com/google-gemini/gemini-cli/issues/18836), [#21000](https://github.com/google-gemini/gemini-cli/issues/21000)).
- **Browser subagent resilience** — Automatic session takeover, lock recovery, and honoring `settings.json` overrides are requested to make the browser agent production-usable ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232), [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)).
- **Observable and self-aware agents** — Users requesting subagent trajectory sharing via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)), subagent context in bug reports ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)), and CLI self-knowledge for accurate guidance ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)).

## 6. Developer Pain Points

- **Subagent outcome semantics are not trustworthy** — MAX_TURNS interruptions masquerade as goal success ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)), generalist agents hang indefinitely ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), and bug reports omit subagent context entirely ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)).
- **Shell and process control gets stuck** — Finished commands remain in "Waiting input" state ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), and scaffolding tools with interactive prompts (e.g., Vite) deadlock the session ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)).
- **Auto Memory misbehaves at the edges** — Transcripts are sent to models before secret redaction ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)), low-signal sessions are retried forever ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522)), and invalid inbox patches are silently dropped ([#26523](https://github.com/google-gemini/gemini-cli/issues/26523)).
- **The model ignores user intent for agentic behavior** — It underuses custom skills and subagents ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)), scatters temporary edit scripts across the repo ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)), and occasionally reaches for destructive git/DB commands instead of safe alternatives ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).
- **Configuration and environment friction** — Symlinked agent files are ignored ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)), `/compress` isn't persisted across session resume ([#21335](https://github.com/google-gemini/gemini-cli/issues/21335)), the browser agent fails on Wayland ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)), and >128 tools triggers a 400 API error ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-10

## Today's Highlights
v1.0.84-3 shipped with targeted fixes for `/copy` task-completion output and OAuth-authenticated MCP server startup reliability. The community remains most vocal about a nearly year-old light-theme bug (#135), a high-severity WSL2 CPU-spin/TUI-freeze regression (#3700), and Windows session-management friction (#4756). A recurring `400 input item ID does not belong to this connection` error continues to resurface, with a new documentation PR proposing a WebSocket opt-out workaround.

## Releases
**v1.0.84-3** (latest, last 24h)
- Fixed: `/copy` now includes task completion messages when available.
- Fixed: OAuth-authenticated MCP servers now connect reliably during session startup.

## Hot Issues
1. [#135 Light theme doesn't work](https://github.com/github/copilot-cli/issues/135) — Open for nearly a year with 12 comments and 12 👍. The original light-theme report (v0.0.330) remains unfixed, making this the longest-running community sore point for terminal theming.
2. [#4756 Windows app requires archiving every idle project session before creating a new Local session](https://github.com/github/copilot-cli/issues/4756) — 7 comments, 19 👍 (highest reaction count). Windows users are blocked from creating new sessions until idle ones are manually archived, failing with an `invalid argument` error.
3. [#3700 WSL2 regression: CLI MainThread spins at ~215% CPU while idle, TUI output frozen until restart](https://github.com/github/copilot-cli/issues/3700) — High-severity regression (1.0.60) that reproduces on every fresh WSL2 session; live output never paints until restart. Commenters note it regresses earlier fix #2208.
4. [#4535 `store_memory` fails in v1.0.81 prereleases: `Instance id is required`](https://github.com/github/copilot-cli/issues/4535) — Context-memory is broken in prereleases because the native memory writer is invoked without a required instance ID. 8 comments; flagged for prerelease quality.
5. [#3976 native `tgrep` indexer OOM-kills the host on large monorepos](https://github.com/github/copilot-cli/issues/3976) — The Rust trigram indexer daemon has no memory cap, crashing hosts on large repositories when the `copilot_cli_tgrep` experiment is enabled.
6. [#2147 CAIP 400: input item ID does not belong to this connection](https://github.com/github/copilot-cli/issues/2147) — Closed, but the underlying 400 WebSocket error keeps resurfacing in newer reports (#4791) and motivates the WebSocket opt-out documentation PR (#4770).
7. [#3773 Broken light theme](https://github.com/github/copilot-cli/issues/3773) — A second, more accessibility-focused report: black background on the user prompt and low-contrast selection highlights make text difficult to read. Reinforces #135 as a systemic theming problem.
8. [#2199 Add Ctrl+Backspace key combo to delete whole word](https://github.com/github/copilot-cli/issues/2199) — 7 👍, with companion Windows report #3858. Standard editor behavior is missing from the CLI input prompt; Alt+Backspace works on Windows but is the wrong convention there.
9. [#4775 Mission Control dashboard links 404: /copilot/tasks/<uuid> path doesn't exist](https://github.com/github/copilot-cli/issues/4775) — Dashboard "Created by me" links point to non-existent URLs while sessions remain reachable via `copilot --resume=<uuid>`; a navigation/UX break.
10. [#4764 Auto approval stops working after ~1 hour](https://github.com/github/copilot-cli/issues/4764) — Assisted permissions mode silently stops approving after roughly an hour; users must start a new session. Points to a session-lifecycle bug in permission state.

## Key PR Progress
Only 2 PRs were active in the last 24h — both documentation-focused, but addressing notable gaps:

1. [#4770 Document the WebSocket responses opt-out](https://github.com/github/copilot-cli/pull/4770) — Documents an escape hatch for models that advertise a WebSocket responses endpoint: when WebSockets are blocked or sessions fail with `400 input item ID does not belong to this connection`, users can opt out. Directly addresses a recurring error pattern.
2. [#4786 Revise notice regarding third-party services](https://github.com/github/copilot-cli/pull/4786) — Clarifies access requirements and terms in the third-party services notice; compliance polish for service integrations and marketplace tooling.

## Feature Request Trends
- **Theme control & accessibility** — Fix light theme entirely (#135, #3773) and allow pinning the GitHub palette to dark/light independent of OS/terminal appearance (#4620).
- **Standard keyboard editing** — Add Ctrl+Backspace word deletion, especially for Windows users (#2199, #3858).
- **Smarter session lifecycle** — Default to resuming the last session or improve session disambiguation (#1467); eliminate forced idle-session archiving on Windows (#4756).
- **Multi-account support** — Easy switching between multiple GitHub accounts (personal, work, contractor) remains requested (#367).
- **MCP & registry ecosystem** — Authenticated reads for enterprise MCP registries (#3772) and an inter/intra-marketplace dependency model for plugins (#4487).

## Developer Pain Points
- **Recurring 400 connection errors** — `input item ID does not belong to this connection` persists across versions and surfaces even when switching accounts mid-session (#2147, #4791).
- **Long-unfixed theming bugs** — Light-theme reports span nearly a year, with multiple duplicates and 16+ total 👍 across #135/#3773.
- **Windows/macOS platform friction** — Session archiving (#4756), Ctrl+Backspace (#3858), taskbar presence stuck in "working" state (#4771), sandbox `git status` permission denials (#4788), and empty clipboard over SSH on macOS (#4551).
- **WSL2 stability** — Idle CPU spin (~215%) with frozen TUI output makes the CLI unusable until restart (#3700).
- **Native tool resource usage** — `tgrep` daemon can OOM the host on large monorepos without a memory cap (#3976).
- **MCP reliability gaps** — OAuth failures when discovery metadata is behind redirects (#4769); repeated discovery reporting "Found 0 tools" for already-loaded namespaces (#4773).
- **Permission-mode flakiness** — Auto-approval stops after ~1 hour (#4764); `--yolo`/`--allow-all` can be blocked for an entire session by a fail-closed managed policy even when none applies (#4757).
- **Input/dictation regressions** — Ctrl+C while copying cancels confirmation dialogs (#4789); dictation periodically deletes entered text (#4787).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-10

## Today's Highlights

OpenCode shipped **v1.18.30** overnight, adding an Astra system prompt for GPT-6 models and fixing Bedrock DeepSeek model-ID resolution plus Azure/OpenAI provider SDK issues. On the tracker, the most-supported open feature request — hot-reloading agents, skills, and commands ([#8751](https://github.com/anomalyco/opencode/issues/8751)) — continues to build momentum at 96 👍, while a wave of deep bug reports highlights recurring pain around compaction reliability, plan-mode enforcement, and stale file indexing.

## Releases

**[v1.18.30](https://github.com/anomalyco/opencode/releases/tag/v1.18.30)**

- **Core:** Added the Astra system prompt for GPT-6 models.
- **Bugfixes:** Preserved Bedrock DeepSeek model IDs, including ARN-based IDs, so they resolve correctly ([@YeEmrick](https://github.com/anomalyco/opencode/issues?q=author:YeEmrick)); updated Azure and OpenAI provider SDKs to pick up compatibility fixes.

## Hot Issues

10 selected out of 50 recently updated.

1. **[Feature] Hot-reload agents, skills and commands — [#8751](https://github.com/anomalyco/opencode/issues/8751)** · 96 👍 · 23 comments
   The community's most-upvoted open request: allow configs to be invalidated and reloaded while opencode is running. The demand signals that creating/iterating on agents must not require a restart.

2. **[Bug] `@` file mentions do not include files created after startup — [#32747](https://github.com/anomalyco/opencode/issues/32747)** · 16 comments
   New files are invisible in the `@` picker until restart; the reporter traces it to stale search state in the TUI. This breaks a core workflow: referencing files that were just created during a session.

3. **[Feature] Change or remove email in OpenCode Zen — [#18654](https://github.com/anomalyco/opencode/issues/18654)** · 16 👍
   Changing a GitHub email creates duplicated users in OpenCode Zen with no account-management path to fix it. An identity-hygiene gap for the hosted service.

4. **[Bug] Plan mode can write and edit files via bash — [#39491](https://github.com/anomalyco/opencode/issues/39491)**
   Claude Sonnet 4.6 "forgot" it was in plan mode and wrote a `SKILL.md` through a bash heredoc after the write tool was blocked. Plan mode is currently a tool-level restriction, not a hard invariant — bash remains an escape hatch.

5. **[Bug] Compaction produces empty summaries for Kimi K3-256K since v1.18.15 — [#41571](https://github.com/anomalyco/opencode/issues/41571)**
   The compaction assistant message contains only `reasoning` and no `text`, so summaries are empty and conversation history is silently dropped. A data-loss severity issue for Kimi users.

6. **[Bug] Auto-approve permissions do not cascade to subagents — [#41730](https://github.com/anomalyco/opencode/issues/41730)**
   `opencode run --auto` does not propagate auto-approve down to subagents, leaving permission behavior inconsistent between parent runs and their children.

7. **[Bug] Auto-accept toggle disabled when no session is open — [#48237](https://github.com/anomalyco/opencode/issues/48237)**
   Includes a root-cause analysis and tested fix design: `createPermissionScopeController` only resolves its directory from session lineage. Part of the permission-scope family seen in #37617/#45159/#31137, with a viable fix already proposed.

8. **[Bug] Prompt tool list diverges from the runtime registry mid-session — [#48214](https://github.com/anomalyco/opencode/issues/48214)**
   In production headless `opencode serve` (1.18.25, multi-tenant), a session works for one batch of tool calls, then the next batch resolves nothing — with no MCP mutation involved. Broader than #39902 and concerning for server deployments.

9. **[Bug] Gemini-3.8-flash: 400 "Requests ending with a model turn are not supported" — [#47034](https://github.com/anomalyco/opencode/issues/47034)**
   Gemini 3.8 Flash fails on every request after one model turn via the Gemini API. A provider-protocol compatibility issue blocking a newer model family.

10. **[Bug] `opencode run --format json` emits auto-compaction internals as text events — [#42238](https://github.com/anomalyco/opencode/issues/42238)**
    Compaction summaries and synthetic user prompts leak into JSONL as ordinary `type:"text"` events, making machine-readable output unreliable for CI/automation consumers.

## Key PR Progress

1. **[fix(tui): guard location refresh against startup race — [#48235](https://github.com/anomalyco/opencode/pull/48235)**](https://github.com/anomalyco/opencode/pull/48235) (open)
   Closes #40002. The TUI was firing 8 concurrent location refreshes on startup via `Promise.allSettled`; this adds guards against the startup race.

2. **[fix(app): reduce cold and warm session load work — [#48223](https://github.com/anomalyco/opencode/pull/48223)**](https://github.com/anomalyco/opencode/pull/48223) (open)
   Reuses up to 16 rendered timelines per workspace with inactive-view guards and scroll restoration, and defers collaborating work — targets slow entry into large sessions.

3. **[fix(app): hide outgoing browser when switching sessions — [#48243](https://github.com/anomalyco/opencode/pull/48243)**](https://github.com/anomalyco/opencode/pull/48243) (open)
   Captures browser registration so switching sessions hides the outgoing native view even when the destination has no browser pane; tabs stay alive for fast restore.

4. **[fix(acp): restore session options and reasoning boundaries — [#48225](https://github.com/anomalyco/opencode/pull/48225)**](https://github.com/anomalyco/opencode/pull/48225) (open)
   Fixes #31961 with two bugfixes: preserves ACP reasoning boundaries and session options across the ACP lifecycle.

5. **[feat(app): add session history sidebar — [#46670](https://github.com/anomalyco/opencode/pull/46670)**](https://github.com/anomalyco/opencode/pull/46670) (open)
   Adds a persistent project and session sidebar to the v2 layout, replacing floating session tabs while keeping controls aligned.

6. **[feat(desktop): show compaction progress and outcomes — [#48152](https://github.com/anomalyco/opencode/pull/48152)**](https://github.com/anomalyco/opencode/pull/48152) (closed)
   Previously "Session compacted" displayed as soon as compaction started, even while the composer was busy. This shows accurate progress and final outcome.

7. **[feat(desktop): polish branch search and session spacing — [#48150](https://github.com/anomalyco/opencode/pull/48150)**](https://github.com/anomalyco/opencode/pull/48150) (closed)
   Focuses branch search after the menu's deferred autofocus so typing works immediately on mouse and keyboard open; cleans up session spacing.

8. **[feat(console): clarify Go model usage — [#48192](https://github.com/anomalyco/opencode/pull/48192)**](https://github.com/anomalyco/opencode/pull/48192) (closed)
   Docs improvement: adds a compact model chart, reorders limits documentation, and harmonizes terminology and links across languages.

9. **[fix(desktop): bundle CLI in release apps — [#41431](https://github.com/anomalyco/opencode/pull/41431)**](https://github.com/anomalyco/opencode/pull/41431) (closed)
   Packages the embedded V2 CLI as an external executable for dev, beta, and production desktop builds, closing a gap where packaged desktop startup expected the CLI to be present.

10. **[feat(tool): add interactive terminal tool with vscode auto-attach — [#41449](https://github.com/anomalyco/opencode/pull/41449)**](https://github.com/anomalyco/opencode/pull/41449) (closed)
    Adds a `terminal` tool letting the agent open and drive a real interactive PTY (open/read/input/close), with VS Code auto-attach support. Closed under automated cleanup, but a major capability addition if revived.

## Feature Request Trends

- **Live reload and configuration DX** — Hot-reload agents/skills/commands ([#8751](https://github.com/anomalyco/opencode/issues/8751)) is the standout request at 96 👍. A related thread asks for per-project control over `AGENTS.md`, including the ability to skip or fully replace it ([#47879](https://github.com/anomalyco/opencode/issues/47879)).
- **Desktop/host app maturity** — Persistent session history sidebar is already in flight ([#46670](https://github.com/anomalyco/opencode/pull/46670)); open requests include an MSI installer for enterprise deployment ([#48099](https://github.com/anomalyco/opencode/issues/48099)) and audible completion notifications ([#35282](https://github.com/anomalyco/opencode/issues/35282)).
- **Harder permission and plan-mode enforcement** — Multiple threads ask that plan mode be an invariant rather than a model behavior ([#39491](https://github.com/anomalyco/opencode/issues/39491)), that auto-approve cascade to subagents ([#41730](https://github.com/anomalyco/opencode/issues/41730)), and that the auto-accept toggle work outside an active session ([#48237](https://github.com/anomalyco/opencode/issues/48237)).
- **Autonomous long-horizon "goal mode"** — Proposals and analysis around a goal-driven round driver ([#48240](https://github.com/anomalyco/opencode/issues/48240), [#48239](https://github.com/anomalyco/opencode/issues/48239)) suggest growing interest in background/self-directed agent runs distinct from plan/build modes.
- **Compaction as a first-class, visible feature** — Reports that compaction drops history on certain models ([#41571](https://github.com/anomalyco/opencode/issues/41571)), leaks into structured JSON output ([#42238](https://github.com/anomalyco/opencode/issues/42238)), and fails to trigger on non-text context overflow such as Azure's 50-image cap ([#39677](https://github.com/anomalyco/opencode/issues/39677)) point toward a need for more robust and transparent context management.

## Developer Pain Points

- **Silent context loss** — Empty compaction summaries on Kimi K3-256K ([#41571](https://github.com/anomalyco/opencode/issues/41571)) and compaction internals leaking into JSONL output ([#42238](https://github.com/anomalyco/opencode/issues/42238)) undermine trust in long-session memory and automation.
- **Stale file discovery** — `@` mentions miss files created after startup ([#32747](https://github.com/anomalyco/opencode/issues/32747)), and TUI autocomplete stops at reference aliases instead of listing files under them ([#34040](https://github.com/anomalyco/opencode/issues/34040)).
- **Permission and enforcement gaps** — Plan mode can be bypassed through bash ([#39491](https://github.com/anomalyco/opencode/issues/39491)); auto-approve doesn't cascade to subagents ([#41730](https://github.com/anomalyco/opencode/issues/41730)); and the auto-accept toggle is disabled outside sessions ([#48237](https://github.com/anomalyco/opencode/issues/48237)).
- **Headless/production reliability** — A prompt tool list diverging from the runtime registry mid-session in `opencode serve` ([#48214](https://github.com/anomalyco/opencode/issues/48214)) is a serious signal for server-side and multi-tenant users.
- **Provider integration churn** — Daily fixes are still landing for Bedrock DeepSeek IDs, Azure, and OpenAI SDKs (v1.18.30), while Gemini 3.8 Flash fails mid-turn ([#47034](https://github.com/anomalyco/opencode/issues/47034)) and Kimi K3-256K regressed in compaction ([#41571](https://github.com/anomalyco/opencode/issues/41571)).
- **Session scale and bloat** — Persisting the full worktree diff into `message.summary` on every run causes GB-scale growth ([#48241](https://github.com/anomalyco/opencode/issues/48241)); cold/warm entry into large sessions is slow ([#48223](https://github.com/anomalyco/opencode/pull/48223)).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-10

## Today's Highlights
No new Pi releases shipped in the last 24 hours; attention is concentrated on provider-catalog drift and session-state reliability. The most active threads cover stale model lists causing hard 400s (OpenRouter `:free`, Anthropic fallback models, OpenAI Codex), a deterministic 48-second "No API key found" failure in parallel startup, and a flagged third-party package report. Maintainers closed six PRs in the window, including a Mistral/GLM reasoning-parameter fix and a reload guard for the coding-agent RPC runner, while two extension showcases — a permission gate and concurrent sub-agent views — drew community interest.

## Hot Issues

- **[#5291 — Sessions hang on "Working…" when used with an Anthropic subscription](https://github.com/earendil-works/pi/issues/5291)** *(closed; 10 comments, 3 👍)* — Enterprise users intermittently get stuck sessions, often all at once; interrupt/resume only sometimes recovers. Long-running (open since June 1) and highly commented, it remains a cautionary tale for third-party subscription integrations.

- **[#8928 — Parallel pi startup can report "No API key found" for ~48s when auth.json contains an expired OAuth credential for another provider](https://github.com/earendil-works/pi/issues/8928)** *(in progress; 6 comments)* — The reporter provides a deterministic repro and timing data linking this to #1871, #4919, and #6880. The error misleadingly points at the active provider's credentials, which makes multi-process debugging especially expensive.

- **[#8760 — OpenRouter `:free` models fail with 400: Pi sends `max_tokens` above provider limit](https://github.com/earendil-works/pi/issues/8760)** *(in progress; 5 comments)* — Pi uses the catalog's `maxOutputTokens`, but upstream free endpoints enforce a lower hard cap, so every request to interactive-selected `:free` models fails. Affects multiple models and makes free-tier evaluation impossible.

- **[#5105 — Compaction summarization ignores the configured transport](https://github.com/earendil-works/pi/issues/5105)** *(closed; 6 comments)* — Compaction rebuilds stream options without `sessionId` or `transport`, so `openai-codex-responses` silently falls back to `auto`, bypassing custom transports. A quiet regression in a path only triggered on long sessions.

- **[#9294 — `claude-fable-5` built-in `allowedFallbackModels` still lists `claude-opus-4-8`, which the API now rejects](https://github.com/earendil-works/pi/issues/9294)** *(open; 4 comments)* — Every fable-5 request fails immediately with a 400 because the fallback list references a model the API no longer accepts. Illustrates the broader pattern of built-in catalog metadata going stale faster than releases ship.

- **[#9290 — Extension API `modelRegistry.complete()` doesn't send `x-opencode-session` for opencode-go models](https://github.com/earendil-works/pi/issues/9290)** *(closed, no action; 5 comments)* — Since opencode.ai began enforcing the `x-opencode-session` header on 2026-09-06, every extension-initiated request through `modelRegistry.complete()` fails with `400 MissingSessionID`. Breaking change for extension authors.

- **[#8810 — Extension-registered providers: fresh sessions intermittently ignore `defaultProvider`/`defaultModel`](https://github.com/earendil-works/pi/issues/8810)** *(open; 4 comments, 1 👍)* — Sessions sometimes start on another provider's default model when the configured provider is registered via `pi.registerProvider()`. Nondeterministic fallback makes this hard to diagnose for extension-heavy setups.

- **[#9306 — Aborted/error turn leaves unmatched `toolCall` blocks in context; next continuation is rejected](https://github.com/earendil-works/pi/issues/9306)** *(open; 2 comments)* — When a turn ends with `stopReason: "error"` or `"aborted"` after streaming one or more tool calls, the unmatched blocks poison the context and the next `runAgentLoopContinue` is rejected by the provider.

- **[#9188 — anthropic-messages adapter overwrites `AssistantMessage.model` with the response-echoed name](https://github.com/earendil-works/pi/issues/9188)** *(open; 2 comments)* — Behind model-renaming proxies, the streaming path assigns `output.model = event.message.model`, breaking thinking replay for consumers that rely on the requested model name.

- **[#9381 — Package Report: `pi-safe-compact` flagged as malicious or unsafe](https://github.com/earendil-works/pi/issues/9381)** *(closed, untriaged; 5 comments)* — The reporter notes the package author `primp9053` is no longer reachable on GitHub (with screenshot evidence). A supply-chain red flag for anyone depending on this package.

## Key PR Progress
Six PRs were updated in the window; five are substantive:

- **[#9376 — fix(ai): use `reasoning_effort` for Mistral-hosted GLM (`zai-glm-5-2`)](https://github.com/earendil-works/pi/pull/9376)** — Mistral's catalog advertises `reasoning: true` for GLM-5.2, but the API only honors `reasoning_effort`, not Pi's current `prompt_mode: "reasoning"`. Corrects the request parameter for Mistral-side GLM reasoning.

- **[#9374 — fix(coding-agent): reject reload during active session operations](https://github.com/earendil-works/pi/pull/9374)** — In RPC mode, an extension command could trigger a reload while a tool is running; the tool wrapper then accessed the invalidated runner after success, causing spurious stored errors. Adds `isStreaming`/`isCompacting` checks to match the TUI path.

- **[#9382 — Always place cursor at the end while navigating through history](https://github.com/earendil-works/pi/pull/9382)** — Removes inconsistent cursor-placement logic so up-arrow history navigation matches bash and other standard TUIs.

- **[#9380 — docs: validate documentation navigation and reachability](https://github.com/earendil-works/pi/pull/9380)** — Makes `packages/coding-agent/docs/docs.json` the versioned recursive website navigation manifest and adds tests for duplicate slugs, broken local Markdown links, and unreachable pages.

- **[#9370 — docs: extract interactive testing and release guidance into skills](https://github.com/earendil-works/pi/pull/9370)** — Contributor documentation for interactive testing and release workflow is refactored into executable "skills."

- **[#9368 — (accidental PR)](https://github.com/earendil-works/pi/pull/9368)** — Closed without action; no functional changes.

## Hot Discussions
Both discussion updates this window are extension showcases (labeled `[General]`):

### Show and tell
- **[#8803 — Introducing pi-verdict, a minimal permission gate for pi](https://github.com/earendil-works/pi/discussions/8803)** — An allow/ask/deny confirmation flow in the style of Claude Code's auto mode: one file, zero dependencies, checked before every tool call. Directly addresses Pi's "no permission popups" philosophy via the extension API. *(1 comment, 1 👍)*

- **[#9373 — pi-agent-views: concurrent sub-agents, rendered by pi itself](https://github.com/earendil-works/pi/discussions/9373)** — Runs several agents in parallel, each with its own model, with `←` on an empty prompt to switch views — a Pi-native take on Claude Code's agent view feature. *(1 👍)*

## Feature Request Trends
- **TUI ergonomics & configurability**: Collapsible assistant-message code blocks (#9397), fine-grained startup display sections (#9289), configurable fullscreen scroll speed and Alt multiplier (#9315), installed package versions in `pi list` (#9398), and cursor-at-end history navigation (#9382).
- **Provider catalog hygiene**: Remove retired models (`gpt-5.4` from openai-codex #9394, stale `claude-opus-4-8` fallback #9294), respect OpenRouter `:free` upstream caps (#8760), and add provider-specific configs such as Fireworks (#9323) and a native LongCat provider (#9308).
- **Extension & SDK hardening**: Explicit ordering/priority for extension widgets (#9401), an SDK export that avoids loading CLI `main` and the esbuild native dependency (#9286), a language-neutral runtime adapter for `pi-agent-core`/`pi-ai` (#9324), and an optional `persist` flag on RPC model/thinking commands (#9393).
- **Session-state observability & cleanup**: Clear fullscreen selections on session switch (#9311), prevent unmatched `toolCall` blocks after aborted turns (#9306), and avoid duplicate steered custom messages (#9322).

## Developer Pain Points
- **Stale provider metadata causes hard daily failures**: built-in catalogs and fallback lists reference retired or unavailable models (`gpt-5.4`, `claude-opus-4-8`) and ignore upstream limits (OpenRouter `:free`), forcing users into immediate 400s and manual catalog archaeology.
- **Misleading errors waste debugging time**: Grok 403s are labeled "OpenAI API error" (#9298), and parallel-startup auth failures blame the active provider when an unrelated expired OAuth credential is the cause (#8928).
- **Session/context corruption on interrupted turns**: unmatched tool-call blocks after aborts (#9306), duplicate steer messages (#9322), compaction ignoring transport (#5105), and hung "Working…" states (#5291) all degrade multi-turn reliability.
- **Intermittent extension-provider behavior**: fresh sessions ignoring `defaultProvider`/`defaultModel` for extension-registered providers (#8810) and the missing `x-opencode-session` header in `modelRegistry.complete()` (#9290) are particularly hard to pin down.
- **Performance on long-lived, content-heavy sessions**: the loading spinner consumes CPU roughly linear in transcript size (#9399), hurting 500–2000-message sessions on older hardware; additionally, the CLI fails on Node.js v20.20.2 due to a `globSync` export error (#9400).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-10

## 1. Today's Highlights

Release v0.23.2 is out with improved Web Shell split-view session navigation, alongside TypeScript SDK v0.1.11 and cua-driver-rs v0.20.5. The community's attention remains focused on Windows process leaks (347 orphaned `conhost.exe` processes), a P1 regression where VS Code extension updates wipe conversation history, and a batch of Web Shell polish defects. PR momentum is healthy: 50 PRs were updated in the last 24 hours, with meaningful work on tool scheduling correctness, daemon session persistence, transcript export performance, and remote-development enablement.

## 2. Releases

**v0.23.2** — Stable release with no known breaking changes. Includes a Web Shell improvement: enhanced split-view session navigation ([#11250](https://github.com/QwenLM/qwen-code/pull/11250)).

**v0.23.2-nightly.20260909.2e212144d3** — Nightly containing a fix for the goal loop: retry a checkpoint that overran the claim budget instead of stalling ([#11365](https://github.com/QwenLM/qwen-code/pull/11365)).

**sdk-typescript-v0.1.11** — Bundles CLI 0.23.2 (source-built from the SDK branch/ref).

**cua-driver-rs-v0.20.5** — Prebuilt CUA driver binaries: macOS codesigned/notarized universal binary + app bundle; unsigned Linux (x86_64/arm64, glibc 2.31 floor) and Windows UIAccess/native SDK payloads.

## 3. Hot Issues

1. **[#11303](https://github.com/QwenLM/qwen-code/issues/11303) — [P1] Windows qwen-cli leaks headless `conhost.exe` ConPTY processes** — A single VS Code Companion qwen-cli process accumulated 347 child processes / ~2.8 GB RAM after 12h uptime. The top-voted community pain point this week; 12 comments, with #11352 split out to track the unfixable node-pty half.

2. **[#11489](https://github.com/QwenLM/qwen-code/issues/11489) — [P1] Extension update v0.21.x → v0.23.x drops all conversation history** — Newly filed regression: sidebar conversations vanish after update although records remain in `state.vscdb`. High-impact for existing users and currently awaiting maintainer info.

3. **[#11352](https://github.com/QwenLM/qwen-code/issues/11352) — [P1, blocked] node-pty ConPTY host leak on natural shell exit** — Root cause split from #11303: the baton is erased before `onExit`, making `ClosePseudoConsole` unreachable from JS. Maintainers note the pinned dependency makes this unfixable on the Qwen side; actively discussed.

4. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — [P1] TUI exits silently with uncaught React #185 when multiple background agents complete** — Interactive terminal drops to shell prompt with "Maximum update depth exceeded" via Ink `useBoxMetrics`; follow-on resume reports "Previous session appears…". 3 comments in first day.

5. **[#11119](https://github.com/QwenLM/qwen-code/issues/11119) — [P1] Background shell output and wake notifications silently dropped when session runtime recycles** — Daemon-hosted Web Shell sessions wedge when a long-running `run_shell_command` loop outlives the turn that started it; output and notifications vanish. 10 comments, high engagement.

6. **[#11503](https://github.com/QwenLM/qwen-code/issues/11503) — [P2] Daemon git guard denies the workspace's own repo when `.git` is a junction/symlink to another volume** — Even read-only `git status`/`log` are blocked on NTFS junction setups. Part of a broader concern about text-based shell guards; spawned the structural proposal in #11504.

7. **[#11433](https://github.com/QwenLM/qwen-code/issues/11433) — [P3] Evaluate SQLite for Session/Prompt indexing and persistence at scale** — Design discussion responding to long-conversation and many-session pain: exact Prompt queries, transcript replay, and reconnect/attach. Signals a requested direction for durable session storage.

8. **[#11499](https://github.com/QwenLM/qwen-code/issues/11499) — [P2] `${VAR}` placeholders in `.mcp.json` are not expanded** — MCP server headers are sent literally (`Authorization: Bearer ${MY_TOKEN}`) when credentials are environment-referenced. Practical security/usability bug for MCP users.

9. **[#11475](https://github.com/QwenLM/qwen-code/issues/11475) — [P3] Remote folders: connect local clients to a remote daemon** — Popular feature direction: client runs locally while daemon/workspace/agent execution run remotely, building on existing Web Shell and multi-workspace APIs.

10. **[#11096](https://github.com/QwenLM/qwen-code/issues/11096) — [P3] Source builds can pin an unpublished or stale renderer** — npm `latest` (0.23.0) was published before #9812 merged, so its tarball lacks `export-transcript-document.js`. A sharp edge for anyone consuming the export feature from published artifacts.

Also notable: **[#11465](https://github.com/QwenLM/qwen-code/issues/11465)** (nondeterministic web-shell visual rendering, 1.31% pixel diff between identical runs), **[#11186](https://github.com/QwenLM/qwen-code/issues/11186)** (channel ownership model gap when serving the home directory), and **[#11403](https://github.com/QwenLM/qwen-code/issues/11403)** (stale ECS runner fleet failing to update to 0.23.1).

## 4. Key PR Progress

1. **[#11483](https://github.com/QwenLM/qwen-code/pull/11483) — fix(core): reject pre-aborted queued tool requests** (merged) — Prevents an already-cancelled tool request from sitting behind an unrelated active batch when a cancelled signal does not replay its abort event (closes #11146).

2. **[#11468](https://github.com/QwenLM/qwen-code/pull/11468) — fix(bridge): keep pending permission/question across refreshed session loads** — Sessions parked on an unanswered permission prompt now re-present the interactive card when reopened instead of degrading to a transcript-only page.

3. **[#11342](https://github.com/QwenLM/qwen-code/pull/11342) — feat(web-shell): add model role and context window configuration** — Adds Advisor/image/voice model pickers in Web Shell Settings, endpoint-aware selection, and custom conversation/image/voice model setup.

4. **[#11244](https://github.com/QwenLM/qwen-code/pull/11244) — feat(web-shell): make product name and logo configurable** — Enables white-label deployments via `settings.json` + daemon-resolved SVG path; no source rebuild required.

5. **[#11413](https://github.com/QwenLM/qwen-code/pull/11413) — fix(web-shell): avoid duplicate cold session restoration** (merged) — Waits for workspace discovery before restoring transcript, discards React StrictMode duplicate effects, and surfaces a working retry on discovery failure.

6. **[#11289](https://github.com/QwenLM/qwen-code/pull/11289) — fix(web-shell): keep mid-turn messages the daemon rejects at idle** — Rejected messages sent during a running turn are now explicitly marked idle-so-refusals, and the browser treats them as ordinary prompts instead of failures.

7. **[#9983](https://github.com/QwenLM/qwen-code/pull/9983) — fix(review): keep host-trusted state out of the container's writable surface** — Moves worktree lease files out of the bind-mounted `.qwen/tmp` and prevents host git from resolving through a pointer inside the container's writable area; hardening for the review sandbox.

8. **[#9466](https://github.com/QwenLM/qwen-code/pull/9466) — refactor: anchor rewind mapping to stable prompt identity** — Rewind now resolves targets via persisted prompt identity instead of positional turn order, surviving session resume and headless `-p --rewind` renumbering.

9. **[#11163](https://github.com/QwenLM/qwen-code/pull/11163) — feat(web-shell): manage git remotes from the workspace branch picker** — New Manage Remotes panel: list remotes with fetch/push URLs, add a remote, and remove behind a two-click confirm.

10. **[#11485](https://github.com/QwenLM/qwen-code/pull/11485) — perf(export): split the transcript renderer's embedded CSS into a versioned asset** — The exported document now loads a version-pinned, SRI-protected stylesheet from unpkg in parallel with renderer JS, reducing inline payload.

Also active: **[#10410](https://github.com/QwenLM/qwen-code/pull/10410)** (preserve prompt cache for deferred tools via stable `tool_search`/`tool_call` bridge), **[#9921](https://github.com/QwenLM/qwen-code/pull/9921)** (propagate `ask_user_question` cancellation reasons), and **[#10347](https://github.com/QwenLM/qwen-code/pull/10347)** (auto-retry EOF-classified transport errors where Ctrl+Y is unavailable).

## 5. Hot Discussions

No discussion data was provided for this digest period.

## 6. Feature Request Trends

- **Remote-first architecture** — Requests for connecting local interactive clients to remote daemons/workspaces (#11475) and for daemon documentation syncing with proper site navigation (#11399) show growing demand for remote and headless workflows.
- **Web Shell as product surface** — Ongoing investment in white-labeling (#11244), model configuration UI (#11342), and session/workflow visuals signals the Web Shell is becoming a flagship deployable surface, not just a debug companion.
- **Durable, scalable session state** — Discussions on SQLite-backed session/prompt indexing (#11433), cache eviction fixes (#11493), and cross-session durable memory (#11502) all point to a shared desire for persistent memory at scale.
- **Model/provider flexibility** — Continued asks for OpenAI Responses API support (#889) and provider-configured reasoning edge cases (#11328) reflect demand for broader model backend compatibility.

## 7. Developer Pain Points

- **Windows reliability is the loudest theme** — Two overlapping P1 ConPTY leak issues (#11303, #11352) with a pinned-dependency dead end; users report multi-GB RAM drain that cannot be fixed without upstream changes.
- **Conversation/session state loss** — Recurring high-severity reports: VS Code extension update wipes history (#11489), saved sessions become unsendable after model/endpoint switching (#9452), and background output disappears when the daemon runtime recycles (#11119). Trust in session persistence is clearly shaken.
- **Tool permission semantics confuse users** — Pattern-denied tools produce overly strict error messages that make models abandon the tool entirely (#11405), while pre-aborted tool requests queue wastefully behind active batches (#11146).
- **Packaging and CI staleness** — Published npm tarballs missing recent renderer files (#11096), stale ECS runner fleets (#11403), and flaky E2E artifact uploads/macOS shards (PRs #11375, #11134) create friction for contributors and users alike.
- **Web Shell UI polish gaps** — A steady stream of small but visible defects — overlapping sidebar footer controls (#11453), missing session spinners during background-agent notifications (#11385), alarming reconnect banners for planned SSE reconnects (#8887), and nondeterministic visual rendering (#11465) — makes the second half of this digest feel like "Web Shell bug cleanup week."

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*