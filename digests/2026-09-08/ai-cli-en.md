# AI CLI Tools Community Digest 2026-09-08

> Generated: 2026-09-07 22:45 UTC | Tools covered: 7

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
*Source: 2026-09-08 community digests for Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, and Qwen Code*

> **Methodology note:** Counts below reflect items explicitly surfaced in each tool's daily digest ("highlighted/enumerated"). "None surfaced" means the digest reported no activity for that channel on that date, not that the channel is disabled. No tool in this window is discussions-only; all seven repos surface issue/PR trackers in their digests, so no "N/A" entries are required.

---

## 1. Ecosystem Overview

The AI CLI tool landscape has shifted decisively from a model-capability contest toward **reliability, trust, and session-lifecycle engineering**. Across all seven communities, the loudest complaints are no longer about code quality but about silent data loss, phantom or invisible transcript content, false "success" signals, opaque rate-limit accounting, and resource leaks. Tool vendors are converging on similar architectural answers — Rust/TUI frontends, daemonized background execution, MCP-based tool ecosystems, sandboxed/containerized execution, and editor-pane integration — but differ sharply in governance posture (enterprise policy vs. open-source local-first) and release discipline (stable, alpha, nightly, or preview channels). The most striking cross-cutting signal is that **users now treat the transcript as an audit artifact and demand undo, retention controls, and honest completion semantics**; features alone no longer earn trust.

## 2. Activity Comparison

| Tool | Issues (surfaced) | PRs (surfaced) | Discussions (surfaced) | Release status (last 24h) |
|---|---|---|---|---|
| **Claude Code** | 10 highlighted; stale-sweep closed 28 of 30 most-active | 2 (1 closed fix, 1 open) | None surfaced | No release |
| **OpenAI Codex** | 10 | 10 (large TUI/daemon batch) | 8 threads (3 Ideas, 1 General, 4 Show & tell) | `rust-v0.154.0-alpha.6` |
| **Gemini CLI** | 10 (incl. 2 P1 bugs, 1 epic) | 10 (5 closed, 5 open; 2 large sandbox-security PRs) | None surfaced | `v0.60.0-nightly.20260907` |
| **GitHub Copilot CLI** | 10 | 2 (1 substantive, 1 low-signal) | None surfaced | No release |
| **OpenCode** | 10 | 10 key PRs + large auto-cleanup batch closed | None surfaced | No release |
| **Pi** | 10 | 10 (mostly merged) | None surfaced | No release |
| **Qwen Code** | ~49 updated (10 highlighted) | ~50 updated (10 highlighted) | None surfaced (longest thread is issue #8662, 32 comments) | `v0.23.1-preview.2`, `v0.23.0-nightly`, `cua-driver-rs v0.20.4` |
>

- **Most active trackers by raw churn:** Qwen Code (~99 issue+PR updates), Gemini CLI (active bot triage + nightly cut), OpenAI Codex (10 PRs and 8 discussions).
- **Quietest window:** Claude Code (no release, only 2 PRs) and Copilot CLI (no release, 2 PRs) — though both saw intense issue engagement.
- **Release cadence leaders:** Gemini and Qwen ship nightly/preview builds; Codex is on a rapid Rust-alpha train. Claude Code, Copilot CLI, OpenCode, and Pi had no release in the window.

## 3. Shared Feature Directions

Requirements appearing across multiple tool communities:

1. **Session undo, transcript integrity, and recovery.** The strongest and most consistent signal.
   - **Claude Code**: silent retention cleanup deletes transcripts with no opt-out (#59248, 41 comments/32 👍); invisible assistant text (#67051); phantom user turns (#84679).
   - **OpenAI Codex**: `/rewind`/`/revert` request is the highest-👍 discussion in any digest (119 👍) — explicitly cites Claude Code and OpenCode as precedents.
   - **Copilot CLI**: `ask_user` input permanently discarded on early Enter (#4738); wedged sessions with no recovery (#4755).
   - **Pi**: meta-issue for stale-transcript continuation bugs (#5886).
   - **Shared need**: reversible turns, retention policies via opt-in controls, trash/recovery semantics, and autosave for draft input.

2. **Honest completion and lifecycle semantics for background/subagent work.** Multiple false-success reports erode trust.
   - **Gemini CLI**: subagent `MAX_TURNS` exits reported as `GOAL` success (#22323); browser subagent "succeeds" on Wayland without doing work (#21983); generalist agent hangs (#21409).
   - **Claude Code**: remote sessions shown as alive but dead (#80311); background handoff loses auth (#77973).
   - **Qwen Code**: background shell output silently dropped after session-runtime recycle (#11119); requests for `activeWork` state + agent recovery (#8586).
   - **Copilot CLI**: queued-lane message permanently wedges sessions (#4755).
   - **Shared need**: machine-readable state (running / interrupted / failed / succeeded) that matches reality.

3. **MCP reliability and safe cancellation.** MCP has become production load-bearing but is still fragile.
   - **Copilot CLI**: session resume cancels in-flight MCP servers (#4753); Azure `learn=true` regressed from 0.2s to 180s timeouts (#4749).
   - **Qwen Code**: cancelling a long-running stdio MCP tool kills the server permanently (#11272).
   - **Pi**: Bedrock rejects images nested in `toolResult.content` (#8643).
   - **Gemini CLI**: truncated MCP tool names silently collide (#28971).
   - **Shared need**: cancellation must not kill server processes; MCP connection lifecycle must survive session operations; provider tool-schema interop needs normalization.

4. **Sandboxing, credential isolation, and protection from destructive operations.**
   - **Gemini CLI**: host `~/.gemini` credentials mounted into sandbox containers — sanitization PRs open (#29214, #29216).
   - **Claude Code**: files deleted outside working directory during auto-approve sessions (#84107).
   - **OpenAI Codex**: Windows sandbox DENY ACLs break git operations in writable roots (#18918).
   - **Qwen Code**: security-hardening regressions in filter screens (#11205) and report-only audit findings (#8835).
   - **Shared need**: least-privilege filesystem boundaries, pre-send secret redaction, and guards against irreversible commands (`git reset --force`, cross-directory deletes).

5. **Rate-limit, quota, and cost transparency.** A growing pain point for paid tiers.
   - **OpenAI Codex**: limits normalize then regress (#31322); 5-hour bucket disappears (#32707); capacity errors despite available weekly allowance (#43337); prompt-cache misses dominate costs with no cached/uncached visibility (#35925).
   - **OpenCode**: multi-hour HTTP 429 outage with compensation demand (#47613); constant `rate_limit_exceeded` at 6–57% dashboard usage (#47634); documented Zen-balance fallback never activates (#42938).
   - **Shared need**: usage dashboards that match enforcement, explicit cached-vs-uncached cost counters, and self-service reset/queuing controls.

6. **Editor/IDE integration.** Users increasingly want CLI power inside IDE panes.
   - **OpenCode**: official VS Code extension is the most-upvoted open request across all digests (#11176, 147 👍); companion Copilot-BYOK gateway request (#27303).
   - **Claude Code**: VSCode extension fails at first launch when `~/.claude/projects` is absent (#17822); local-gateway support request (#84852).
   - **Qwen Code**: Web Shell / split-view session navigation improvements.
   - **Shared need**: first-class IDE-native experiences, not terminal workarounds.

## 4. Differentiation Analysis

| Tool | Core emphasis | Target users | Technical / product approach |
|---|---|---|---|
| **Claude Code** | Long-lived enterprise-grade sessions; hooks, skills, Cowork/remote control; transcript auditability | Professional engineers and teams in large codebases; governance-conscious orgs | Mature CLI + VSCode extension; hooks-based supervision; sessions as first-class artifacts. Current pain: destructive retention cleanup and transcript/state desync undermine its core trust narrative. |
| **OpenAI Codex** | Frontier-model coding (gpt-6-astra etc.); tight ChatGPT-account and rate-plan coupling; cloud/desktop app | ChatGPT Pro/Plus subscribers, API/Azure developers | Rust rewrite on an alpha release train; rapid TUI productization (voice, timestamps, computer-action grouping); large PR batches show aggressive feature velocity. |
| **Gemini CLI** | Multi-agent orchestration (generalist/subagents), skills, sandboxed execution | Power users of Gemini models; security-conscious adopters; Linux/macOS developers | Nightly auto-releases; container-sandbox hardening with credential isolation; AST-aware tooling on the roadmap (#22745). Distinguishing bet: model "bash affinity" inside a safe zero-dependency OS sandbox (#19873). |
| **GitHub Copilot CLI** | Enterprise GitHub workflow; managed policies; Desktop app + MCP/Azure integration | GitHub Enterprise teams; regulated environments | Conservative, policy-first design (fail-closed postures). Community is smallest in absolute numbers but concentrated on regressions shipped in 1.0.83/1.1.15 — session/MCP lifecycle is the weak spot. |
| **OpenCode** | Open-source local-first agent with proprietary Go/Zen paid gateway; multi-provider + ACP protocol events | Open-source developers; provider-agnostic users; editor-integration seekers | Platform play: OpenAI-compatible surfaces, plugin ecosystem, Snowflake OAuth, subagent permission boundaries. Unique tension: strong OSS demand vs. paid-tier reliability complaints. |
| **Pi** | Agent-loop runtime architecture; broad provider catalog; headless/SDK embedding | CLI power users; developers embedding agents in servers; provider-troubleshooting crowd | Maintainer-led (mitsuhiko) with unusually deep engineering: system-message deltas instead of prompt rewrites (PRs #9116/#9117), O(n²) hot-path fixes, provider-routing accuracy. Acts partly as a reference implementation of robust agent-loop design. |
| **Qwen Code** | Qwen-model-aligned full-stack agent: Web Shell, daemon (`qwen serve`), workflows, mesh multi-agent, channel integrations (DingTalk) | Qwen-model users; cloud/partner deployments; Web-UI-first teams | Fastest raw iteration (49 issues/50 PRs/day); Web Shell workflow visualization, session runtime recycling, split-view navigation; planned TUI migration from ink to OpenTUI signals rendering-stack ambition. |

**Broad two-lineage summary:** *Claude Code, Codex, and Copilot* are editor/cloud product assistants optimized for account-integrated, governed use; *Gemini CLI, OpenCode, Pi, and Qwen Code* are open-source runtimes competing on architecture, provider neutrality, and developer ergonomics.

## 5. Community Momentum & Maturity

- **Claude Code** has the most *emotionally charged* issue environment: #59248 (silent transcript deletion) drew 41 comments/32 👍 in a single day, and a 28-of-30 issue sweep signals both high engagement and maintainer consolidation. The near-total absence of PR/release activity this window suggests a stabilization phase — the community is telling the maintainers that *trust repair* outranks feature work.
- **OpenAI Codex** shows the strongest *product-demand velocity*: a 119-👍 `/rewind` discussion plus 10 PRs landing (voice in TUI, timestamps, daemon update controls, multi-agent fork-context fixes) indicates a tool still aggressively iterating on UX while trailing on session-history reliability (ghost conversations, frozen history).
- **Gemini CLI** has the most *security-forward* engineering trajectory this window: two large credential-isolation PRs plus EOL Node removal show active hardening, while P1 hangs and false-GOAL reports keep the community on edge. Bot-triaged "need-retesting" churn suggests a responsive but pressure-tested maintainer team.
- **Copilot CLI** is the smallest community in absolute engagement (single-digit 👍 on most issues), but its issue IDs cluster around fresh regressions in 1.0.83/1.1.15. Demand signals are still maturing; the 18-👍 scoped-plugin request shows enterprise-style configuration needs.
- **OpenCode** has the largest single open feature request in the entire digest set (#11176 VS Code extension, 147 👍, open 7+ months) — a classic marker of a community *waiting on* a roadmap commitment. Paid-tier reliability complaints (429s, quota mismatches) are the counterweight.
- **Pi** hosts the deepest long-running technical threads: #4945 (openai-codex connection stalls, 77 comments) and #7547 (Windows usage survey, 61 comments) are the most-commented items across all digests. This is a mature, technically sophisticated user base that tolerates instability when the maintainer engages deeply.
- **Qwen Code** leads on raw throughput (99 issue/PR updates in 24h, multiple releases). Some of this is bot automation, but the breadth — workflow visualization, daemon lifecycle, mesh agents, Web Shell security — indicates an unusually wide feature surface being actively developed.

**Ranking summary:** *Fastest iteration:* Qwen Code > OpenAI Codex > Gemini CLI > Pi. *Highest-trust community engagement per capita:* Claude Code (intense but consolidating), Pi, OpenAI Codex. *Most unmet demand:* OpenCode (VS Code extension).

## 6. Trend Signals

1. **"Success" no longer means success.** The Gemini `MAX_TURNS`-as-`GOAL` bug, Copilot's wedged sessions, OpenCode's permanently stuck sessions, and Claude's phantom user turns all point to the same industry gap: **there are no standardized, truthful lifecycle semantics for agent turns and subagent outcomes.** Developers evaluating tools should probe how each tool distinguishes *interrupted*, *failed*, and *succeeded* — and whether rendered state matches persisted state.

2. **Transcripts are becoming compliance artifacts.** Users are treating the conversation log as an audit record and demanding retention controls, export, undo, and evidence trails (see DoneAudit, a community tool that verifies "done" claims). Tools that silently mutate, drop, or fabricate transcript content — even through bugs — will face the strongest community backlash, as Claude Code's #59248 demonstrates. *Design implication:* make cleanup opt-in, trash-based, and recoverable; never render a transcript the model didn't actually see.

3. **MCP is production-critical but operationally immature.** Cancellation kills servers (Qwen), session resume orphans connections (Copilot), tool-name truncation collides (Gemini), and provider-schema conversion mangles tools (OpenCode). Expect MCP server/client hardening — timeouts, cancellation semantics, OAuth flows, and process reaping — to be a major investment area across all tools through 2026–2027.

4. **Quota/rate-limit accounting is now product surface.** Subscription-based agents make usage accounting a user-facing reliability feature, not a backend detail. Inconsistent enforcement vs. dashboards (OpenCode, Codex) and invisible cost counters (#35925) are becoming churn drivers. *Reference value:* if you build on these tools, expose cached/uncached token costs and usage-window visibility; if you choose a tool, verify its rate-limit behavior under real workloads before committing.

5. **Sandboxing is the new trust battleground.** The Gemini credential-exposure PRs, Claude's out-of-cwd deletions, and Codex's Windows ACL breakage all show that execution isolation is where destructive bugs hide. The direction is clear: sanitized config mounts, read-only host paths, pre-send redaction, and guards on irreversible git/filesystem operations.

6. **Windows remains the reliability frontier.** Conhost/ConPTY leaks (Qwen), sandbox ACL breakage (Codex), and MCP child-process accumulation (Codex) show Windows lifecycle handling lags macOS/Linux across the ecosystem. For teams standardizing on Windows, expect to be early testers of fixes.

7. **Cross-agent session replay is emerging as a category.** Community tools like `deja-vu` (recall over Codex/Claude/Cursor/opencode sessions) and DoneAudit signal a new developer expectation: **agent sessions should be portable, replayable data** — not siloed inside one vendor's transcript store. Interoperability (ACP events, shared session formats) will become a differentiator.

**Bottom line for technical decision-makers:** capability differences between these tools are narrowing; **data-integrity guarantees, lifecycle honesty, sandbox boundaries, and usage transparency** are the new evaluation criteria. Tools that treat sessions as reversible, auditable, machine-readable artifacts — and that ship truthful completion states — will win the trust of professional developers; tools that silently delete, wedge, or misreport will bleed community confidence regardless of model quality.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights
*Source: github.com/anthropics/skills · Data as of 2026-09-08*

## 1. Top Skills Ranking

*Ranking reflects the PR list sorted by comment activity; all listed PRs remain OPEN.*

1. **skill-creator evaluation reliability — [PR #1298](https://github.com/anthropics/skills/pull/1298)** (related: [PR #1099](https://github.com/anthropics/skills/pull/1099), [PR #1050](https://github.com/anthropics/skills/pull/1050)) — The meta-skill for building skills has a broken eval loop: `run_eval.py` reports `recall=0%` for every description, so `run_loop.py` and `improve_description.py` "optimize against noise." The fix installs the eval artifact as a real skill and addresses Windows stream reading, trigger detection, and parallel workers. Discussion cites issue [#556](https://github.com/anthropics/skills/issues/556) with 10+ independent reproductions, plus parallel Windows-specific fixes (WinError 10038, `claude.cmd` PATHEXT). **Status: OPEN.**

2. **document-typography — [PR #514](https://github.com/anthropics/skills/pull/514)** — New skill for typographic quality control of generated documents: orphan word wrap (1–6 words spilling to the next line), widow paragraph headers stranded at page bottom, and numbering misalignment. Discussion frames it as a post-generation quality gate: users rarely request typography, yet every AI-generated document suffers from it. **Status: OPEN.**

3. **scnet-hpc — [PR #1615](https://github.com/anthropics/skills/pull/1615)** — Operational skill for SCNet HPC clusters: profile-based SSH and Slurm workflows, partition/memory/module/accelerator guidance, cluster discovery, and compute-node access. Notable as a domain/infrastructure skill encoding tenant-specific operational profiles rather than generic knowledge. **Status: OPEN.**

4. **odt (OpenDocument) — [PR #486](https://github.com/anthropics/skills/pull/486)** — Skill for creating, filling, reading, and converting OpenDocument files (.odt/.ods/.odf), including template filling and ODT→HTML parsing; triggers on "OpenDocument" and "LibreOffice" mentions. Extends the document-format family beyond PDF/DOCX with ISO-standard open formats. **Status: OPEN.**

5. **frontend-design improvement — [PR #210](https://github.com/anthropics/skills/pull/210)** — Revision of the frontend-design skill to make every instruction executable within a single conversation and specific enough to steer behavior without verbosity. Discussion centers on the principle that skills should be operational instructions for Claude, not educational documentation for humans (mirroring the critique in issue [#202](https://github.com/anthropics/skills/issues/202)). **Status: OPEN.**

6. **skill-quality-analyzer & skill-security-analyzer — [PR #83](https://github.com/anthropics/skills/pull/83)** — Two meta-skills for the example-skills marketplace: quality analysis across five dimensions (Structure & Documentation 20%, examples, resources, …) and security analysis of skill content. Discussion connects directly to the community's trust concerns about distributed skills. **Status: OPEN.**

7. **Hivemind — [PR #1628](https://github.com/anthropics/skills/pull/1628)** — Zero-cost multi-agent orchestration skill: delegates mechanical work to headless opencode workers on free models while Claude Code remains the only planner, reviewer, and merger. Core premise: "the expensive model's context is the scarce resource, not its intelligence." **Status: OPEN.**

8. **testing-patterns — [PR #723](https://github.com/anthropics/skills/pull/723)** — Comprehensive testing skill: Testing Trophy philosophy, what to test vs. not, unit-testing AAA pattern/naming/edge cases, and React component testing with Testing Library. Fills a gap for test-generation guidance in the collection. **Status: OPEN.**

**Observation:** document-format *maintenance* PRs also rank near the top by comments — [PR #538](https://github.com/anthropics/skills/pull/538) (PDF case-sensitive file references), [PR #541](https://github.com/anthropics/skills/pull/541) (DOCX `w:id` collision corrupting tracked changes), [PR #1734](https://github.com/anthropics/skills/pull/1734) (orphaned DOCX comment detection) — indicating heavy real-world usage of the document skills.

## 2. Community Demand Trends

Distilled from Issues (highest comment counts):

- **Security and trust boundaries — [Issue #492](https://github.com/anthropics/skills/issues/492) (43 comments, 👍2).** The top community concern: community-made skills distributed under the `anthropic/` namespace impersonate official skills, creating a trust-boundary vulnerability where users grant elevated permissions believing skills are official. Governance and security demand is reinforced by [Issue #412](https://github.com/anthropics/skills/issues/412) (agent-governance proposal, closed) and [Issue #1175](https://github.com/anthropics/skills/issues/1175) (SharePoint access-control concerns, closed).
- **Organizational distribution — [Issue #228](https://github.com/anthropics/skills/issues/228) (16 comments, 👍8).** Users want org-wide skill libraries or direct sharing links instead of manual `.skill` file transfer via Slack and Settings > Capabilities uploads.
- **Skill-tooling reliability — [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments, 👍7).** Skill authors cannot trust their evaluation harness: no query ever triggers the skill under test, yielding false 0% recall and meaningless precision metrics. Related proposals seek quality gates ([Issue #1385](https://github.com/anthropics/skills/issues/1385) reasoning-gate pipeline; [PR #1367](https://github.com/anthropics/skills/pull/1367) self-audit skill).
- **Context and memory economy — [Issue #1487](https://github.com/anthropics/skills/issues/1487)** (claude-api skill eagerly injecting ~156k tokens in one call) and [Issue #1329](https://github.com/anthropics/skills/issues/1329) (compact-memory symbolic notation proposal). Demand for skills that conserve context and represent agent state efficiently.
- **Skill management — [Issue #189](https://github.com/anthropics/skills/issues/189) (👍9)** duplicate skills when installing both `document-skills` and `example-skills` plugins; [Issue #62](https://github.com/anthropics/skills/issues/62) locally uploaded skills silently disappearing.
- **Interoperability — [Issue #29](https://github.com/anthropics/skills/issues/29)** (usage with AWS Bedrock) and [Issue #16](https://github.com/anthropics/skills/issues/16) (exposing Skills as MCPs) show demand for running Skills outside the standard Claude Code local path.

## 3. High-Potential Pending Skills

Open PRs with sustained discussion that may land soon:

- **[PR #514](https://github.com/anthropics/skills/pull/514) — document-typography**: typographic QC gate for generated documents; second-most-discussed PR overall.
- **[PR #1628](https://github.com/anthropics/skills/pull/1628) — Hivemind**: multi-agent delegation to free headless workers; recent activity (Aug 2026).
- **[PR #1627](https://github.com/anthropics/skills/pull/1627) — buffer-api**: portable Buffer GraphQL scheduling skill for any agent (Claude, Cursor, Codex, n8n); actively updated into September.
- **[PR #1367](https://github.com/anthropics/skills/pull/1367) — self-audit (v1.3.0)**: mechanical file verification plus four-dimension reasoning audit in damage-severity order before delivery.
- **[PR #1615](https://github.com/anthropics/skills/pull/1615) — scnet-hpc**: profile-based SSH/Slurm HPC operations; updated Aug 24.
- **[PR #83](https://github.com/anthropics/skills/pull/83) — skill-quality/security analyzers**: meta-skills directly addressing the ecosystem's trust concerns.
- **[PR #1298](https://github.com/anthropics/skills/pull/1298) (+ #1099, #1050) — skill-creator eval fixes**: the most-discussed PR cluster; unblocks Windows users and corrects false 0% recall.
- **[PR #538](https://github.com/anthropics/skills/pull/538), [#541](https://github.com/anthropics/skills/pull/541), [#1734](https://github.com/anthropics/skills/pull/1734)** — document-skill correctness fixes (PDF case-sensitivity, DOCX ID collisions, orphaned comments).

## 4. Skills Ecosystem Insight

The community's most concentrated demand at the Skills level is **assurance**: skills that guarantee the quality and security of Claude's generated output — documents, code, reasoning — and, equally, skills and tooling that make the skill ecosystem itself trustworthy, from secure distribution and reliable evaluation to context-safe execution.

---

# Claude Code Community Digest — 2026-09-08

## 1. Today's Highlights

No release shipped in the last 24 hours, but the tracker saw heavy churn: a stale-issue sweep closed 28 of the 30 most-active issues, leaving **#59248** (silent transcript deletion) as the clear community flashpoint with 41 comments and 32 👍. The dominant themes across live and swept issues are **data loss, silent state desync, and background/remote session reliability** — users are less concerned about model capability than about the CLI doing destructive or invisible things. Only two PRs saw activity; the most consequential is a fix for the native installer bootstrap that reportedly deletes existing installs.

## 2. Releases

No new releases in the last 24 hours.

## 3. Hot Issues

- **[#59248 — Silent retention cleanup deletes session transcripts with no warning, opt-in, or recovery](https://github.com/anthropics/claude-code/issues/59248)** *(OPEN, data-loss, 41 comments, 32 👍)* — A macOS/Cursor user lost **all** transcripts older than the current session, including work from the prior day. The cleanup is silent, with no opt-out or recovery path. The community reaction is the strongest on the tracker right now; expect upstream pressure for a retention policy, opt-in controls, and trash/recovery semantics.

- **[#84679 — Phantom user message exists in model context but absent from persisted transcript](https://github.com/anthropics/claude-code/issues/84679)** *(integrity)* — During a long session, the model saw a user turn that was never typed and doesn't exist in the transcript, then acted on it — performing autonomous work the user never authorized. Whether this is a sync bug or a context-injection artifact, it's a serious auditability and safety problem.

- **[#67051 — Assistant text before/between tool calls is silently dropped from the CLI render](https://github.com/anthropics/claude-code/issues/67051)** *(7 comments, 7 👍)* — The model "says" things the user never sees; the text exists in the transcript and hooks judge the model on it, but the TUI hides it. Community concern: hook-based supervision is evaluating invisible content, making the rendered transcript an unreliable record.

- **[#68092 — Cowork: all tasks fail with retry loop then ECONNRESET](https://github.com/anthropics/claude-code/issues/68092)** — Complete Cowork failure across multiple networks, including phone hotspot; survived a clean reinstall; worked hours earlier the same day. The lack of diagnosable error state beyond `ECONNRESET` is a recurring complaint in networking-related issues.

- **[#56984 — CLAUDE_CODE_EXTRA_BODY "thinking" config breaks WebSearch and WebFetch on Opus](https://github.com/anthropics/claude-code/issues/56984)** *(6 comments, 6 👍)* — A popular workaround config for a prior context bug now silently breaks web tools. Illustrates the fragility of undocumented escape-hatch settings.

- **[#17822 — VSCode Extension fails to load with ServiceWorker error when `~/.claude/projects` doesn't exist](https://github.com/anthropics/claude-code/issues/17822)** *(8 👍)* — Oldest issue in the set and still getting reactions. Fresh machines, containers, and CI environments fail at first launch. The stale-close will likely draw reopen pressure.

- **[#77973 — Background worker cannot read Keychain credentials after foreground→background handoff](https://github.com/anthropics/claude-code/issues/77973)** *(regression, 2.1.211)* — Sending a session to the background kills it with "Not logged in · Please run /login". An auth regression specific to backgrounding, which compounds the broader background-session reliability narrative.

- **[#80311 — Remote control: sessions die permanently on session-limit hit and transient disconnects](https://github.com/anthropics/claude-code/issues/80311)** — Mobile app still shows dead sessions as alive and silently drops messages. A compound defect: one bug kills the session, another lies about its state.

- **[#84313 — Safeguard false-positive on legal research prompts; `/feedback` returns 403](https://github.com/anthropics/claude-code/issues/84313)** — Two issues in one: the safety filter fires on legitimate legal research, and the in-product feedback command fails with 403 — meaning users hitting false positives can't report them through the intended channel.

- **[#92742 — Ratelimit interrupts feedback; agent ignores "read the whole log" core memory](https://github.com/anthropics/claude-code/issues/92742)** *(OPEN)* — Newly filed and still open. The user saved a core memory instructing the agent to read entire log files, confirmed the agent remembered it, then watched it read only the start/end minutes later. Echoes the model-compliance complaints that dominate the swept issues.

## 4. Key PR Progress

Only 2 PRs were updated in the window:

- **[#26175 — fix: replace broken native installer bootstrap script](https://github.com/anthropics/claude-code/pull/26175)** *(CLOSED)* — Targets a nasty installer trap: `curl -fsSL https://claude.ai/install.sh | bash` delegates to a subcommand that **silently fails to create `~/.local/bin/claude`**, then deletes the user's existing npm global install as "cleanup" — leaving no working Claude at all. If this lands, it closes one of the most damaging onboarding failure modes. Note: PR state is closed; merge status not visible in the data.

- **[#39043 — Remove "retro-futuristic" recommendation from Frontend Design Skill](https://github.com/anthropics/claude-code/pull/39043)** *(OPEN, author: t3dotgg)* — A tiny diff with a clear intent: the default Frontend Design skill currently biases generated UI toward a specific "retro-futuristic" aesthetic. Removing it makes output less opinionated and more appropriate for production apps. Author's summary: *"Trust me on this one."* Community-adjacent signal that default skills over-steer.

## 5. Hot Discussions

No discussion data was provided for this period.

## 6. Feature Request Trends

- **Retention controls and recovery for transcripts** — the #59248 thread makes clear users want opt-in retention, export, and a recovery path before any cleanup runs.
- **Standing permissions for unattended sessions** — scheduled routines and remote-control sessions stall on per-run permission prompts with no way to grant persistent tool-family permissions ([#83166](https://github.com/anthropics/claude-code/issues/83166), [#81036](https://github.com/anthropics/claude-code/issues/81036)).
- **Accurate lifecycle state for Agent View & remote control** — sorting/filtering by real completion state ([#80244](https://github.com/anthropics/claude-code/issues/80244)), honest liveness signaling ([#80311](https://github.com/anthropics/claude-code/issues/80311)), and credential continuity for backgrounded sessions ([#77973](https://github.com/anthropics/claude-code/issues/77973)).
- **Self-hosted / local gateway support in the VSCode extension** — honor `ANTHROPIC_BASE_URL`/`ANTHROPIC_API_KEY` without forcing login ([#84852](https://github.com/anthropics/claude-code/issues/84852)).
- **CLI ergonomics** — allow attaching comments when confirming single-select prompts ([#78553](https://github.com/anthropics/claude-code/issues/78553)); make `--verbose` not change JSON output shape ([#84784](https://github.com/anthropics/claude-code/issues/84784)).

## 7. Developer Pain Points

- **Silent data loss and destructive cleanup.** Transcripts wiped by retention logic ([#59248](https://github.com/anthropics/claude-code/issues/59248)), files deleted outside the working directory during auto-approve sessions ([#84107](https://github.com/anthropics/claude-code/issues/84107)), and an installer that removes working npm installs ([#26175](https://github.com/anthropics/claude-code/pull/26175)) all share one theme: the tool destroys user data without visibility or consent.
- **The displayed transcript is not the real transcript.** Invisible assistant text ([#67051](https://github.com/anthropics/claude-code/issues/67051)) and phantom user turns ([#84679](https://github.com/anthropics/claude-code/issues/84679)) make it impossible for developers to audit what the model was actually told or said.
- **Silent failures and state desync.** Messages dropped with no error ([#76382](https://github.com/anthropics/claude-code/issues/76382)), remote sessions that look alive but never answer ([#80311](https://github.com/anthropics/claude-code/issues/80311)), and background processes failing auth ([#77973](https://github.com/anthropics/claude-code/issues/77973), [#79511](https://github.com/anthropics/claude-code/issues/79511), [#77678](https://github.com/anthropics/claude-code/issues/77678)).
- **Networking flakiness with opaque errors.** ECONNRESET retry loops ([#68092](https://github.com/anthropics/claude-code/issues/68092), [#84456](https://github.com/anthropics/claude-code/issues/84456)) and remote-control bridges that give up permanently after ~1.3s ([#81036](https://github.com/anthropics/claude-code/issues/81036)) lack machine-readable failure states, making unattended use fragile.
- **Guardrail false positives that compound.** Safety filters trigger on benign multi-file or legal content, escalate with context accumulation, and re-trigger when the user tries to discuss the false positive ([#74295](https://github.com/anthropics/claude-code/issues/74295), [#84313](https://github.com/anthropics/claude-code/issues/84313), [#84821](https://github.com/anthropics/claude-code/issues/84821)).
- **Model instruction-following is a recurring, if noisy, complaint.** The stale sweep closed a cluster of frustrated reports — agents ignoring explicit corrections, "core memories," and STOP commands, or persisting with wrong solutions across turns ([#84759](https://github.com/anthropics/claude-code/issues/84759), [#84760](https://github.com/anthropics/claude-code/issues/84760), [#84842](https://github.com/anthropics/claude-code/issues/84842), [#84779](https://github.com/anthropics/claude-code/issues/84779), [#92742](https://github.com/anthropics/claude-code/issues/92742)). Low signal-to-noise, but the volume suggests context-retention and correction-handling deserve eval attention.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-08

## Today’s Highlights

The latest release is another Rust alpha pre-release: `rust-v0.154.0-alpha.6`, though no detailed changelog was published. Community attention is heavily focused on recurring rate-limit/capacity account-state issues and desktop session/history bugs, with Windows-specific sandbox and process-lifecycle defects also drawing engagement. On the engineering side, a large PR batch landed around TUI voice/UX improvements, configurable app-server daemon updates, user-verification RPCs, and preserving multi-agent fork context.

## Releases

- [rust-v0.154.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.6) — Published as `0.154.0-alpha.6`. No additional release notes or changelog details were provided in the data.

## Hot Issues

- [openai/codex#26867](https://github.com/openai/codex/issues/26867) — **GitHub PR review still uses deactivated workspace after migrating from Business workspace to Personal Pro account** (*closed; 29 comments, 15 👍*). The most-commented issue in this window; shows how fragile workspace/auth selection remains for Codex-powered PR review.

- [openai/codex#18918](https://github.com/openai/codex/issues/18918) — **Windows sandbox applies DENY ACLs to `.git` directories in `writable_roots`, breaking git commits** (*15 comments, 6 👍*). A high-friction Windows bug: sandbox permissions actively prevent normal git operations in writable project roots.

- [openai/codex#31322](https://github.com/openai/codex/issues/31322) — **Usage limits normalized this morning but regressed by evening, draining ~5x faster again** (*14 comments*). Users report this as a systematic rate-limit accounting failure rather than a one-off spike.

- [openai/codex#32707](https://github.com/openai/codex/issues/32707) — **Pro account: 5-hour usage bucket disappeared from Codex App and `account/rateLimits/read`** (*12 comments, 3 👍*). Losing visibility into the short-term rate-limit window makes session planning difficult for heavy Pro users.

- [openai/codex#43337](https://github.com/openai/codex/issues/43337) — **Account-specific capacity errors across Codex models despite a fully available weekly allowance** (*10 comments*). A current capacity/rate-limit issue affecting `gpt-6-astra` and `gpt-5.6-luna` at low reasoning.

- [openai/codex#41399](https://github.com/openai/codex/issues/41399) — **Deleted ChatGPT conversations remain in sidebar after full local profile reset** (*12 comments, 12 👍*). One of several “ghost conversation” reports, with strong community reaction because profile resets should clear local state.

- [openai/codex#28361](https://github.com/openai/codex/issues/28361) — **Windows: `codex mcp-server` / app-server and child MCP servers are never reaped** (*8 comments, 3 👍*). Every request can leak processes until hundreds accumulate; a serious resource-lifecycle problem for Windows MCP users.

- [openai/codex#43124](https://github.com/openai/codex/issues/43124) — **macOS desktop history freezes at older turns: projection expected ordinal 3185, got 3184** (*8 comments*). Long-lived conversations can lose recent turns from the visible history even though the data exists in the rollout JSONL.

- [openai/codex#32513](https://github.com/openai/codex/issues/32513) — **Personal user has undeletable “Default templates” plugin marked installed-by-admin / installed-by-default** (*8 comments, 13 👍*). High 👍 count reflects user frustration over forced/undeletable plugin state outside managed workspaces.

- [openai/codex#35925](https://github.com/openai/codex/issues/35925) — **Prompt-cache misses were 94% of a $210 session’s uncached cost; counters can’t show cached vs uncached** (*4 comments*). A serious cost-observability gap for API/Azure users relying on prompt caching.

## Key PR Progress

- [openai/codex#43581](https://github.com/openai/codex/pull/43581) — **Add live WebRTC voice conversations to the TUI**. Introduces feature-gated `/voice`, `/voice mute`, and `/voice stop` commands, with live transcripts and mic/speaker levels.

- [openai/codex#43576](https://github.com/openai/codex/pull/43576) — **Group adjacent computer actions in the TUI**. Renders adjacent `cua_repl` calls as compact “Using computer” / “Used computer” groups with action counts, failures, and screenshot previews.

- [openai/codex#43603](https://github.com/openai/codex/pull/43603) — **Recover missed tmux resize notifications in the TUI**. Adds a background size monitor on Unix to detect terminal-size changes every 500 ms.

- [openai/codex#43558](https://github.com/openai/codex/pull/43558) — **Show completion timestamps after successful TUI turns**. Replaces horizontal separators with dim metadata like `done 2:32 PM`.

- [openai/codex#43572](https://github.com/openai/codex/pull/43572) — **Make the managed app-server shutdown grace period configurable**. Adds `shutdownGraceSeconds` to daemon settings.

- [openai/codex#43562](https://github.com/openai/codex/pull/43562) — **Add an explicit app-server daemon update command**. `codex app-server daemon update` checks once for the latest stable release even if automatic updates are disabled.

- [openai/codex#43542](https://github.com/openai/codex/pull/43542) — **Make app-server daemon automatic updates configurable**. Adds `updater.autoUpdateEnabled` and `updater.updateIntervalMinutes` preferences.

- [openai/codex#43568](https://github.com/openai/codex/pull/43568) — **Wire app-server user verification RPCs to the native provider**. Adds real status/enrollment/deletion/challenge-signing flows instead of returning “unavailable”; builds on the provider abstractions from [openai/codex#43547](https://github.com/openai/codex/pull/43547).

- [openai/codex#43545](https://github.com/openai/codex/pull/43545) — **Preserve fork runtime versions without loading full model context**. Avoids expensive context reloads when recovering multi-agent runtime information at a fork cutoff.

- [openai/codex#43540](https://github.com/openai/codex/pull/43540) — **Preserve the multi-agent version when forking at a turn cutoff**. Fixes cases where forking before the first turn loses the source thread’s selected multi-agent runtime version.

## Hot Discussions

### Ideas

- [openai/codex discussion #9618](https://github.com/openai/codex/discussions/9618) — **“How is there not a /rewind or /revert feature?”** (*20 comments, 119 👍*). The strongest product signal in this digest: users want first-class undo/revert for Codex sessions, citing Claude Code and OpenCode as examples.

- [openai/codex discussion #7366](https://github.com/openai/codex/discussions/7366) — **Reference files that are gitignored** (*2 comments, 7 👍*). Users want `@`-references to gitignored files for context without forcing those files to be committed.

- [openai/codex discussion #37611](https://github.com/openai/codex/discussions/37611) — **Signed enterprise work orders for governed access to higher-capability Codex models** (*2 comments*). A governance proposal from an enterprise end-user concerned about frontier-model capability thresholds.

### General

- [openai/codex discussion #7782](https://github.com/openai/codex/discussions/7782) — **Deprecating `chat/completions` support in Codex** (*14 comments, 21 👍*). Important API-migration discussion around moving from `chat/completions` to the Responses API.

### Show and tell

- [openai/codex discussion #43532](https://github.com/openai/codex/discussions/43532) — **DoneAudit — verify AI evidence before trusting “done”**. A tool that checks tests, required checks, and source evidence before accepting coding-agent completion claims.

- [openai/codex discussion #43427](https://github.com/openai/codex/discussions/43427) — **Blume.codes — turns coding-agent sessions into rules and skills**. Built to reduce agent drift.
- [openai/codex discussion #43598](https://github.com/openai/codex/discussions/43598) — **deja-vu — recall over sessions Codex and other agents wrote to disk**. Reads local rollouts/session files from Codex, Claude Code, Cursor, opencode, Amp, and more.

- [openai/codex discussion #41157](https://github.com/openai/codex/discussions/41157) — **CodexFuse 1.2.0 — local Windows dashboard for Codex rate limits**. Community tooling addressing rate-limit visibility pain.

## Feature Request Trends

- **Session undo/revert is the most requested direction.** The `/rewind` or `/revert` discussion has 119 👍. Developers want to roll back turns without manually committing after every change ([#9618](https://github.com/openai/codex/discussions/9618)).

- **Rate-limit transparency and self-service controls.** Users want queued/redeemable banked resets ([#32218](https://github.com/openai/codex/issues/32218)), cached-vs-uncached token cost visibility ([#35925](https://github.com/openai/codex/issues/35925)), and consistent visibility into short-term rate-limit windows ([#32707](https://github.com/openai/codex/issues/32707)).

- **More ergonomic file/context references.** Support referencing gitignored files without committing them ([#7366](https://github.com/openai/codex/discussions/7366)).

- **Enterprise governance controls.** Signed work orders or similar gating mechanisms for higher-capability model access ([#37611](https://github.com/openai/codex/discussions/37611)).

## Developer Pain Points

- **Rate-limit and capacity accounting remains the broadest source of frustration.** Limits normalize and regress ([#31322](https://github.com/openai/codex/issues/31322)), rate-limit buckets disappear ([#32707](https://github.com/openai/codex/issues/32707)), capacity errors appear despite available weekly allowance ([#43337](https://github.com/openai/codex/issues/43337)), and banked resets can be consumed without explicit confirmation ([#41801](https://github.com/openai/codex/issues/41801)).

- **Desktop history/sidebar state is unreliable.** Deleted conversations remain as ghost entries across macOS and Windows ([#41399](https://github.com/openai/codex/issues/41399), [#41987](https://github.com/openai/codex/issues/41987), [#43613](https://github.com/openai/codex/issues/43613)), and long-session history can freeze or resume at wrong ordinals ([#43124](https://github.com/openai/codex/issues/43124), [#43142](https://github.com/openai/codex/issues/43142)).

- **Windows process and sandbox lifecycle issues keep surfacing.** MCP/app-server/Node child processes accumulate ([#28361](https://github.com/openai/codex/issues/28361), [#38614](https://github.com/openai/codex/issues/38614)), while sandbox ACLs can break git commits ([#18918](https://github.com/openai/codex/issues/18918)) or fail when project folders are owned by `BUILTIN\Administrators` ([#31414](https://github.com/openai/codex/issues/31414)).

- **Cost observability is insufficient for API users.** Prompt-cache misses can dominate a session’s uncached cost, but current counters do not expose cached vs uncached usage ([#35925](https://github.com/openai/codex/issues/35925)).

- **Desktop autonomous/browser controls still have trust gaps.** Closing the last in-app Browser Use tab can crash the app ([#43347](https://github.com/openai/codex/issues/43347)), automation can control a hidden browser session while the visible panel stays blank ([#22678](https://github.com/openai/codex/issues/22678)), and locked Computer Use cannot always be interrupted remotely ([#33471](https://github.com/openai/codex/issues/33471)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Today's Highlights

The Gemini CLI project spent the last 24 hours cycling through a backlog of agent-reliability and sandbox-security work, with a new v0.60.0 nightly cut and a wave of bot-triaged issues moving to `need-retesting`. The most significant community pain points remain agent hangs and misleading success reports — notably subagent exits after `MAX_TURNS` being recorded as `GOAL` success. On the PR side, the headliner is filesystem sandbox hardening: two large open PRs isolate host credentials from container sandboxes, while a closed security PR removes the EOL Node 20 runtime from the sandbox image.

## Releases

- **[v0.60.0-nightly.20260907.g85aca163f](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260907.g85aca163f)** — Automated nightly release with no user-facing changelog. See the [full changelog](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260906.g85aca163f...v0.60.0-nightly.20260907.g85aca163f) for the diff against the previous nightly.

## Hot Issues

- **[#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption](https://github.com/google-gemini/gemini-cli/issues/22323)** (P1 · bug · 13 comments, 👍 2)  
  A `codebase_investigator` subagent that hits its turn limit reports `status: "success"` and `Termination Reason: "GOAL"` even though no analysis was performed. This is a serious trust/correctness issue: parent agents and users cannot distinguish genuine completion from interruption. Maintainers have moved it to `need-retesting`, suggesting a fix may be in flight.

- **[#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)** (P1 · bug · 8 comments, 👍 8)  
  Users report `gemini-cli` hanging "forever" whenever it defers to the generalist agent — even for trivial operations like folder creation — with waits up to an hour. The only known workaround is instructing the model to never use subagents. High 👍 count indicates broad impact.

- **[#19873 — Leverage model's bash affinity via Zero-Dependency OS Sandboxing & Post-Execution Intent Routing](https://github.com/google-gemini/gemini-cli/issues/19873)** (P2 · enhancement · 9 comments, 👍 1)  
  Proposes letting Gemini 3 use its native POSIX-tool skills inside a zero-dependency OS sandbox, with post-execution intent routing to keep the user safe. This is the design-level counterpart to several sandbox-hardening PRs now open and signals where the maintainers are steering agent execution.

- **[#22745 — Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)** (P2 · epic · 7 comments, 👍 1)  
  Epic tracking whether AST-aware tools can reduce turn counts and token noise (precise method-bound reads, better codebase mapping). Community discussion is active because token bloat remains one of the top cost pain points for long agent sessions.

- **[#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)** (P2 · bug · 6 comments)  
  Anecdotal but widely recognizable: the model ignores custom skills and subagents unless explicitly forced, even when highly relevant (e.g., `gradle`/`git` skills are available). This is a core "agent self-orchestration" gap that reduces the value of user-configured workflows.

- **[#26525 — Add deterministic redaction and reduce Auto Memory logging](https://github.com/google-gemini/gemini-cli/issues/26525)** (P2 · security · 5 comments)  
  Auto Memory sends local transcript content to the extraction model before any redaction prompt executes, meaning secrets are already in model context. It can also log skill values. The community is pushing for deterministic, pre-send redaction and quieter logging.

- **[#25166 — Shell command execution gets stuck with "Waiting input" after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)** (P1 · core · 4 comments, 👍 3)  
  Simple, non-interactive CLI commands finish but remain displayed as active with "Waiting input," forcing manual intervention. A core-shell reliability bug that blocks long unattended runs.

- **[#21983 — Browser subagent fails in Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)** (P1 · bug · 4 comments, 👍 1)  
  The browser subagent terminates with `Termination Reason: GOAL` on Wayland without completing its task — another instance of false-success reporting, this time display-server-specific. Linux/Wayland users cannot rely on browser automation.

- **[#20079 — `~/.gemini/agents/filename.md` symlink not recognized as an agent](https://github.com/google-gemini/gemini-cli/issues/20079)** (P2 · bug · 4 comments)  
  Symlinked agent definition files are silently ignored. This breaks dotfile managers and symlink-based config workflows, making it harder to version-control custom agents.

- **[#21335 — `/compress` command is not persistent across session resume](https://github.com/google-gemini/gemini-cli/issues/21335)** (P2 · bug · 2 comments, 👍 2)  
  `/compress` summarizes history in memory but never writes the summary back to the on-disk session file, so resuming a session restores the original full history — defeating the token-saving feature. High 👍-to-comment ratio suggests broad silent agreement.

## Key PR Progress

- **[#29214 — fix(sandbox): harden filesystem boundaries and isolate runtime state](https://github.com/google-gemini/gemini-cli/pull/29214)** (open · L)  
  Replaces host directory mounts with sanitized read-only config files, resolves symlinks during path-sensitivity checks, and decouples container environment from host state. A major step toward making the sandbox a genuine security boundary.

- **[#29216 — fix(cli): isolate settings directory in sandbox containers](https://github.com/google-gemini/gemini-cli/pull/29216)** (open · L)  
  Previously the host `~/.gemini` directory — including OAuth tokens and account credentials — was mounted directly into sandbox containers. This PR mounts a sanitized configuration instead. Important credential-exposure fix.

- **[#28973 — fix(sandbox): bump sandbox image from EOL node:20-slim to node:22-slim](https://github.com/google-gemini/gemini-cli/pull/28973)** (closed · P1 · XS)  
  Node 20 reached end-of-life in April 2026 and no longer receives security fixes. Small, surgical, and exactly the kind of dependency hygiene the sandbox needs.

- **[#28972 — fix(core): guard formatTruncatedToolOutput against non-positive maxChars](https://github.com/google-gemini/gemini-cli/pull/28972)** (closed · P1 · S)  
  Prevents corrupt truncated tool output when `maxChars` is missing or non-positive — negative budgets produced invalid slices that corrupted model context.

- **[#28971 — fix(core): keep truncated MCP tool names unique](https://github.com/google-gemini/gemini-cli/pull/28971)** (closed · P2 · M)  
  Long MCP tool names truncated to first/last 30 characters are not injective: two tools sharing both ends collapsed into one registry entry. Fixes silent tool-registration collisions for MCP-heavy setups.

- **[#28975 — fix(core): keep glob results for symlinked workspace roots](https://github.com/google-gemini/gemini-cli/pull/28975)** (closed · P2 · M)  
  `glob` returns "No files found" when the workspace root is reached via symlink — e.g., `/tmp` → `/private/tmp` on macOS, which is the default for any project opened under `/tmp`.

- **[#28983 — fix(core): detect mixed line endings instead of flagging CRLF on a single match](https://github.com/google-gemini/gemini-cli/pull/28983)** (closed · P2 · M)  
  Old `detectLineEnding()` classified a file as CRLF if it contained even one `\r\n`. The fix recognizes mixed endings, preventing incorrect whole-file rewrite decisions.

- **[#29239 — fix(cli): prevent ghost text wrapping infinite loop at narrow widths](https://github.com/google-gemini/gemini-cli/pull/29239)** (open · P2 · S · help wanted)  
  Fixes an infinite loop in `getGhostTextLines` when a word is wider than the terminal input width. Niche, but a real hang for users with narrow panes.

- **[#29237 — fix: list_background_processes prints (Exit Code: null) for signal-killed processes](https://github.com/google-gemini/gemini-cli/pull/29237)** (open · P3 · S)  
  Cosmetic fix that stops misleading `(Exit Code: null)` output for processes terminated by signals instead of numeric exit codes.

- **[#29134 — fix(cli): protect current session from deletion](https://github.com/google-gemini/gemini-cli/pull/29134)** (open · P2 · M)  
  Prevents users from accidentally deleting the active session via `--delete-session` by matching only the expected short-ID filename suffix. A small safety fix for a frightening failure mode.

## Feature Request Trends

Across the issue backlog, several clear feature directions emerged:

- **Sandboxed, safety-bounded execution.** The cluster around #19873 (bash-affinity + zero-dependency OS sandboxing), #29214/#29216 (filesystem isolation), and #22672 (discourage destructive `git reset`/`--force` behavior) shows a push to let models use native shell skills without letting them touch host credentials or irreversible operations.
- **AST-aware and token-frugal code tooling.** #22745 and companion #22746 propose AST-based file reads/search/mapping; #19561 ("Tactful Extraction") and #18836 (file-based task tracking) address the same root cause: context firehosing and token bloat during long coding sessions.
- **Better agent self-orchestration and observability.** Users want the model to actually use skills/subagents (#21968), to expose subagent trajectories through `/chat share` (#22598), and to include subagent context in `/bug` reports (#21763).
- **Auto Memory hardening.** Four P2 issues (#26516, #26522, #26523, #26525) target the Auto Memory pipeline: pre-send redaction, quarantine of invalid inbox patches, and terminating retries of low-signal sessions.
- **Robustness for power-user environments.** Requests span Wayland browser support (#21983), symlink-aware agent discovery (#20079), and support for very large tool counts (#24246, 400 errors once >128 tools / API limits are hit).

## Developer Pain Points

- **Hangs with false or missing terminal states.** The recurring trifecta: generalist agent hanging indefinitely (#21409), finished shell commands stuck at "Waiting input" (#25166), and interactive prompts (e.g., `vite` scaffolding) never resolving (#22465).
- **Interruptions disguised as success.** Subagent `MAX_TURNS` exits reported as `GOAL` success (#22323) and browser agents "finishing" on Wayland without doing work (#21983) erode confidence in agent results.
- **Line-ending bugs on Windows/CRLF projects.** Three distinct PRs (#28983, #29131, #29132) were needed to fix CRLF misdetection causing full-file diffs and incorrect file classification — a clear sign of repeated community friction.
- **Messy filesystem behavior.** The model writes temporary edit scripts across random directories (#23571) and occasionally reaches for destructive commands (#22672), forcing cleanup overhead and risky operations on user work.
- **Configuration and session portability gaps.** Symlinked agent files silently ignored (#20079) and `/compress` summaries lost on session resume (#21335) punish users with well-structured, version-controlled setups.
- **Terminal UX regressions.** Ghost-text wrapping infinite loops (#29239), resize flicker (#21924), stray `\n` escape issues (#22466), and misleading `(Exit Code: null)` background-process output all degrade the interactive experience.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-08

## Today’s Highlights

No new release was published in the last 24 hours. The current issue set is dominated by regressions in Copilot CLI 1.0.83 and the Desktop app 1.1.15: session resume can kill in-flight MCP connections, Azure MCP `learn=true` calls regress from ~0.2s to 180s timeouts, and Desktop Local-session creation is blocked by idle workspaces. A fail-closed managed-policy bug can also lock out `--yolo` / `--allow-all` even when no managed policy exists, making session and MCP reliability the main community pressure points.

## Hot Issues

1. **Fail-closed bypass restriction blocks `--yolo` / `--allow-all` on an account with no managed policy**  
   [Issue #4757](https://github.com/github/copilot-cli/issues/4757)  
   On every interactive start, the CLI applies a fail-closed posture that disables bypass-permission mode — even when the managed policy is absent. The restriction is never lifted for the life of the session. Developers lose `--yolo` mode without any actual policy failure. 3 comments already; likely to draw more attention.

2. **Windows: every idle project session must be archived before creating a new Local session**  
   [Issue #4756](https://github.com/github/copilot-cli/issues/4756)  
   In Desktop app 1.1.15, users cannot create a new Local session in a project until they archive idle sessions. This significantly disrupts normal branch/parallel-session workflows. 7 👍 in the reporting window shows broad impact.

3. **Session resume cancels in-flight stdio MCP server connections**  
   [Issue #4753](https://github.com/github/copilot-cli/issues/4753)  
   Resuming a session can cancel MCP servers still initializing, leaving them silently unavailable for the rest of the session. The timeout reportedly dropped from ~16s in v1.0.82 to ~1s in v1.0.83. This is a clear regression for MCP-heavy workflows.

4. **Azure MCP `learn=true` calls time out after 180s in CLI 1.0.83-5**  
   [Issue #4749](https://github.com/github/copilot-cli/issues/4749)  
   Azure MCP hierarchical discovery calls that complete in ~0.2 seconds under v1.0.80 now consistently hit a 180-second timeout. Direct child-command calls still work, isolating the regression to `learn=true`.

5. **Desktop app 1.1.15: cannot create a second Local branch session while one is running**  
   [Issue #4742](https://github.com/github/copilot-cli/issues/4742)  
   Users get `This project already has an active Local workspace` when they try to create a second Local session with a live CLI process. 7 comments indicate real workflow impact around parallel sessions.

6. **MCP OAuth: non-first-party HTTP servers cancel host token, then never launch the browser flow**  
   [Issue #4017](https://github.com/github/copilot-cli/issues/4017)  
   Remote MCP servers such as Atlassian or incident.io configured with `"type": "http"` silently fail to authenticate. No popup, no error, no reconnect. Triaged as authentication/MCP bug; 3 👍.

7. **Project/repository-scoped Copilot CLI plugins**  
   [Issue #1665](https://github.com/github/copilot-cli/issues/1665)  
   Plugins are currently installed per-user and loaded globally, making repo/project-specific plugins difficult. Now closed, but this is the highest-signal item in the window with 18 👍 and 14 comments, reflecting ongoing demand for scoped plugin configuration.

8. **Session wedges permanently when a queued-lane message lands at turn end**  
   [Issue #4755](https://github.com/github/copilot-cli/issues/4755)  
   A session can become permanently stuck — neither idle nor running — with the only recovery being process kill. This is a serious session-state bug that will likely frustrate users running long-lived sessions.

9. **Tool call hangs after an extension startup failure**  
   [Issue #4670](https://github.com/github/copilot-cli/issues/4670)  
   If an extension fails inside `joinSession()` before reporting ready, the CLI continues offering its custom tool, but invocation hangs forever because the handler never runs. Significant for anyone building or using extension-based tools.

10. **`ask_user` form: pressing Enter early submits/cancels and permanently discards typed input**  
    [Issue #4738](https://github.com/github/copilot-cli/issues/4738)  
    This is a data-loss UX bug: substantial user-authored content is unrecoverable if Enter is pressed too early. The reporter suggests draft autosave/restore and treating Enter as a newline.

## Key PR Progress

Only two pull requests were updated or opened in the last 24 hours, so this covers all available PR activity.

1. **Experimental next-action extension prototype**  
   [PR #4746](https://github.com/github/copilot-cli/pull/4746)  
   Adds an opt-in, experimental SDK extension example under `examples/next-best-action/`, outside extension auto-discovery. It reuses the existing foreground session through `joinSession()` and a no-tools UI event flow, providing a reference for model-inferred next actions without modifying the installed CLI.

2. **“Add joke cli”**  
   [PR #4748](https://github.com/github/copilot-cli/pull/4748)  
   No description or detail is provided. This appears to be low-signal / non-substantive PR activity rather than a meaningful code change.

## Feature Request Trends

- **Project- and repo-scoped configuration**  
  The most-upvoted theme is scoping plugins and configuration to a repository/project rather than a single user. See [Issue #1665](https://github.com/github/copilot-cli/issues/1665). Relatedly, custom agents loaded from `--add-dir` should be usable with the top-level `--agent` flag. See [Issue #4752](https://github.com/github/copilot-cli/issues/4752).

- **Session scoping and workspace organization**  
  Users want to filter session tabs and the `/resume` list by repository/solution instead of seeing every session across all repos. See [Issue #4693](https://github.com/github/copilot-cli/issues/4693). Multi-repo collection workspaces also need to handle mixed default branches correctly. See [Issue #4709](https://github.com/github/copilot-cli/issues/4709).

- **Production-grade MCP support**  
  Multiple issues point toward MCP hardening: support cancellation requests ([Issue #4759](https://github.com/github/copilot-cli/issues/4759)), preserve in-flight connections during session resume ([Issue #4753](https://github.com/github/copilot-cli/issues/4753)), preserve custom headers/User-Agent on OAuth `initialize` requests ([Issue #4681](https://github.com/github/copilot-cli/issues/4681)), and fix broken non-first-party OAuth flows ([Issue #4017](https://github.com/github/copilot-cli/issues/4017)).

- **Session lifecycle reliability**  
  There is clear demand for more predictable session behavior: deleting evicted sessions should actually persist ([Issue #4754](https://github.com/github/copilot-cli/issues/4754)), queued messages should never wedge a session ([Issue #4755](https://github.com/github/copilot-cli/issues/4755)), and Desktop users should be able to run multiple Local sessions concurrently ([Issue #4742](https://github.com/github/copilot-cli/issues/4742), [Issue #4756](https://github.com/github/copilot-cli/issues/4756)).

- **Input and form safety**  
  Users want better input preservation in elicitation forms, with autosave/restore and safer Enter handling. See [Issue #4738](https://github.com/github/copilot-cli/issues/4738). International keyboard support also remains a recurring concern, e.g. entering `@` on German keyboards. See [Issue #1999](https://github.com/github/copilot-cli/issues/1999).

## Developer Pain Points

- **MCP regressions and authentication fragility**  
  MCP servers are silently becoming unavailable due to resume timeouts ([Issue #4753](https://github.com/github/copilot-cli/issues/4753)), Azure `learn=true` requests timing out ([Issue #4749](https://github.com/github/copilot-cli/issues/4749)), missing custom headers/User-Agent after OAuth ([Issue #4681](https://github.com/github/copilot-cli/issues/4681)), and non-first-party OAuth flows never opening a browser ([Issue #4017](https://github.com/github/copilot-cli/issues/4017)).

- **Desktop Local-session blockers**  
  Active or idle Local sessions block creation of new Local sessions, forcing users to archive sessions before continuing parallel work. See [Issue #4742](https://github.com/github/copilot-cli/issues/4742) and [Issue #4756](https://github.com/github/copilot-cli/issues/4756).

- **Policy and permission unpredictability**  
  A fail-closed managed-policy bug disables `--yolo` / `--allow-all` even when no managed policy is present, and the restriction lasts for the entire session. See [Issue #4757](https://github.com/github/copilot-cli/issues/4757).

- **State corruption and silent data loss**  
  Sessions can become permanently wedged ([Issue #4755](https://github.com/github/copilot-cli/issues/4755)), deleting evicted sessions can silently no-op and fail to cascade-delete from `data.db` ([Issue #4754](https://github.com/github/copilot-cli/issues/4754)), and `ask_user` input can be permanently discarded by an accidental Enter ([Issue #4738](https://github.com/github/copilot-cli/issues/4738)).

- **Extension and plugin boundary bugs**  
  Extension startup failures leave broken custom tools that hang when invoked ([Issue #4670](https://github.com/github/copilot-cli/issues/4670)), `--agent` does not recognize custom agents loaded through `--add-dir` ([Issue #4752](https://github.com/github/copilot-cli/issues/4752)), and global per-user plugin loading makes project-scoped workflows hard ([Issue #1665](https://github.com/github/copilot-cli/issues/1665)).

- **Platform and input issues**  
  Windows voice-server deadlocks can occur when the pid file is deleted while the process survives ([Issue #4740](https://github.com/github/copilot-cli/issues/4740)), the TUI can hog CPU even while idle ([Issue #4750](https://github.com/github/copilot-cli/issues/4750)), and non-US keyboard layouts struggle with important characters like `@` ([Issue #1999](https://github.com/github/copilot-cli/issues/1999)).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-08

## Today's Highlights

A quiet day on the release front — no new versions shipped in the last 24 hours — but the community conversation was loud on two fronts: the most-upvoted open request (147 👍) remains the **official VS Code extension** (`#11176`), and reliability of the paid Go/Zen tier is under heavy scrutiny after a multi-hour **HTTP 429 outage** and several reports of sessions permanently stuck. Meanwhile, a large batch of PRs from the Aug 7 "automated-pr-cleanup" queue was marked closed, suggesting a major consolidation of TUI, console, and provider-routing fixes landed.

## Releases

No new releases in the last 24 hours.

## Hot Issues

1. **[#11176 — [FEATURE]: Official OpenCode VS Code extension](https://github.com/anomalyco/opencode/issues/11176)** — The single most-supported open feature request (147 👍, 29 comments, open for 7+ months). The community wants OpenCode to run natively inside VS Code rather than through workarounds; the sustained engagement signals strong demand for IDE-native workflows.

2. **[#47613 — Go subscription: HTTP 429 outage on 2026-09-06; compensation requested](https://github.com/anomalyco/opencode/issues/47613)** — A paying Go subscriber documents a multi-hour outage on `opencode.ai/zen/go/v1/messages` with persistent `retry-after` responses. Beyond the technical failure, the explicit compensation request puts a commercial-service reliability question in front of maintainers.

3. **[#43199 — Tool calls throw errors for Mistral's GLM-5.2](https://github.com/anomalyco/opencode/issues/43199)** — Text responses work, but tool calls fail when using GLM-5.2 (third-party Zhipu model hosted by Mistral) via the `mistral` provider. Relevant to the broader trend of providers hosting each other's models; 8 👍 indicates wide impact.

4. **[#43277 — Sessions permanently stuck during normal use, survive reboots](https://github.com/anomalyco/opencode/issues/43277)** — Sessions refuse new messages even after full system reboots and server restarts. A suspected state-machine/persistence bug; the fact that it survives reboots makes it especially disruptive for daily drivers.

5. **[#37580 — SSE stream silently dropped mid-response hangs session/subagents forever](https://github.com/anomalyco/opencode/issues/37580)** — Subagents freeze mid-run with no `chunkTimeout` default on the OpenAI/Codex path; the only escape is interrupting the whole session, which kills all subagents. Root cause is likely in the streaming client rather than the model.

6. **[#27303 — Go/Zen BYOK provider extension for VSCode Copilot](https://github.com/anomalyco/opencode/issues/27303)** — A companion to #11176: use OpenCode's Go/Zen gateway as a custom BYOK language-model provider inside VS Code Copilot. Aligns with editor-integration pressure from the community.

7. **[#42938 — Go plan hits 100%, blocks for 12h; $39.89 Zen balance never used](https://github.com/anomalyco/opencode/issues/42938)** — A Go subscriber reports the fallback to Zen balance (documented on `opencode.ai/docs/go/`) simply does not happen when the monthly plan quota is exhausted. Billing/quota logic bug with direct revenue impact.

8. **[#45011 — CLI/TUI sessions never appear in web Home](https://github.com/anomalyco/opencode/issues/45011)** — Sessions created from the shell (`opencode run`, TUI, agents) are invisible to the web dashboard because the project registry lives client-side in the browser. Points at an architectural mismatch between clients.

9. **[#47545 — Auto mode causes repeated false permission notifications](https://github.com/anomalyco/opencode/issues/47545)** — In Auto mode, permission prompts fire in the terminal even though they are auto-approved and never need user input. Approval happens client-side *after* the server has already emitted the `permission` event — a UX bug that erodes trust in unattended mode.

10. **[#47634 — Constant rate_limit_exceeded below quota on Console Go](https://github.com/anomalyco/opencode/issues/47634)** — Rate-limit errors fire on every request while the usage dashboard shows 6% / 57% / 23% usage; automatic retries also fail. Combined with #47613, this suggests inaccurate quota accounting inside the Go console rather than genuine client overload.

## Key PR Progress

1. **[#47858 — feat(updates): serve updates under opencode.ai/update](https://github.com/anomalyco/opencode/pull/47858)** — Maintainer-driven change to serve the update Worker at `opencode.ai/update` and support local-artifact AUR publishing, likely preparing the next update-channel rollout.

2. **[#47859 — fix(session-ui): align retry icon with label](https://github.com/anomalyco/opencode/pull/47859)** — Removes the spinner-specific top offset left behind when the retry spinner became a warning icon, adding a component geometry regression test. Small but indicative of growing UI-test maturity.

3. **[#47835 — fix(app): keep tab progress visible on hover](https://github.com/anomalyco/opencode/pull/47835)** — Drops the `revealProjectOnHover` option and always renders the progress indicator while a session is busy, preventing busy sessions from looking idle when not hovered.

4. **[#41135 — feat(app): add message timeline navigation strip](https://github.com/anomalyco/opencode/pull/41135)** — Implements the compact variant of message navigation for long sessions (Refs #32999): a DeepSeek-web-style bead strip instead of a full sidebar, addressing a top navigation pain point.

5. **[#41132 — fix(acp): emit plan updates for todos](https://github.com/anomalyco/opencode/pull/41132)** — Maps OpenCode `todo.updated` events into ACP `session/update` messages with `sessionUpdate: "plan"`, letting ACP clients follow todo/plan state in real time.

6. **[#41130 — fix(console): preserve anthropic tool names](https://github.com/anomalyco/opencode/pull/41130)** — Fixes the Anthropic `/messages` → OpenAI-compatible `/chat/completions` conversion dropping or mangling tool definitions. Directly improves interop for `Console` users.

7. **[#41128 — fix(console): normalize root composition tool schemas](https://github.com/anomalyco/opencode/pull/41128)** — Normalizes incoming OpenAI-compatible schemas whose root uses `oneOf`/`anyOf`/`allOf` object branches but omits a top-level type, resolving a class of tool-schema validation failures.

8. **[#41100 — fix(opencode): enforce per-target task subagent permissions](https://github.com/anomalyco/opencode/pull/41100)** — Makes per-target `task` permission rules (e.g., allow only `explore`) a hard runtime boundary when the model tries to invoke a disallowed subagent target — a security-relevant fix.

9. **[#41111 — feat(core): Snowflake Cortex OAuth login for V2](https://github.com/anomalyco/opencode/pull/41111)** — V2 already had Snowflake Cortex with PAT/env auth; this adds the browser OAuth login path that V1 supported, closing the parity gap (Closes #34780).

10. **[#41104 — feat(provider): discover local model context limits](https://github.com/anomalyco/opencode/pull/41104)** — Adds a narrow discovery path for local/LAN OpenAI-compatible providers whose configured model is missing `limit.context`, reducing manual config for local-model users.

## Feature Request Trends

- **Editor and IDE integration is the dominant theme.** The official VS Code extension (#11176) has by far the most reactions of any issue, and a Copilot BYOK provider extension (#27303) complements it. Closed issues like "Using OpenCode in Cursor doesn't work" (#47842) show users increasingly want Codex/Copilot-style panes backed by OpenCode.
- **Exposed OpenAI-compatible surfaces keep coming up.** Requests range from exposing the local `opencode serve` as an OpenAI-compatible endpoint (#31724) to making the hosted Go/Zen gateway consumable from third-party apps (#47820, #47834-related). The console conversion fixes in the PR queue (#41130, #41128) align with this direction.
- **TUI and desktop ergonomics for model/agent control:** A bindable "set as default model for this agent" action in the `/models` dialog (#47836), clearer Auto Router error/model status indicators (#47794), and configurable startup destinations for the Desktop App (#47807).
- **Long-session and observability UX:** Message timeline navigation (#32999/PR #41135) and a reserved plugin dataflow/metrics panel (#46156) represent a push to make deep, multi-hour sessions easier to navigate and instrument.

## Developer Pain Points

- **Sessions get stuck and cannot be recovered.** Multiple reports describe permanent busy states: "stuck" sessions surviving reboots (#43277), SSE stream drops hanging parent sessions and subagents forever (#37580), and subagent permission requests silently dropped while `stop`/`interrupt` are no-ops (#44747). This is the highest-severity reliability cluster this week.
- **Quota and rate-limit behavior is confusing and costly.** Paying subscribers see constant `rate_limit_exceeded` despite dashboards showing low usage (#47634), a multi-hour 429 outage prompted compensation demands (#47613), and documented Zen-balance fallback never activates when the Go plan caps out (#42938).
- **Tool-call and provider-layer incompatibilities.** Models proxied through third-party providers (GLM-5.2 via Mistral) fail on tool calls (#43199); tool-call repair can drop the required `tool` field for unnamed calls (#47831); and Bedrock models aren't listed even when direct SigV4 calls succeed (#40663).
- **Auto-mode permission UX is noisy.** Clients emit permission notifications even when approval is automatic (#47545), undermining the hands-off promise.
- **Client/state parity issues persist.** CLI sessions invisible in the web Home UI (#45011), Desktop offering OAuth models absent from active provider state (#47490), Windows GUI white-screen reports (#23949), and mobile clients failing to list sessions returned by the API (#47834) indicate the multi-client architecture is still catching up to the CLI.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-08

## Today's Highlights
A provider-compatibility patch wave dominates: GitHub Copilot's GPT-6 Astra routing bug is fixed via PR #9253, and several contributors converge on OpenCode Go's newly enforced `x-opencode-session` header. On the architecture side, maintainer mitsuhiko advanced a two-layer effort (#9116, #9117) to deliver mid-session prompt/tool changes as system-message deltas instead of rewriting the top-level prompt. The most active community threads remain the long-running openai-codex connection-stall investigation (#4945, 77 comments) and a Windows usage survey (#7547, 61 comments).

## Releases
No new releases were published in the last 24 hours.

## Hot Issues
1. [openai-codex Connection Reliability Issues (#4945)](https://github.com/earendil-works/pi/issues/4945) — 77 comments, 👍33. The hottest open thread: `gpt-5.5` sessions intermittently leave the TUI stuck on `Working...` with no streamed text, tool call, or error; recovery requires Escape and records an aborted turn. Reports suggest it repeats across days and resists diagnosis.
2. [How do you use Pi on Windows? What issues are you seeing? (#7547)](https://github.com/earendil-works/pi/issues/7547) — 61 comments. A deliberate call for Windows usage reports to decide where core fixes/docs energy should go versus delegating to extensions. Rich source of environment-specific bugs (WezTerm, Node, PTY).
3. [AgentSession settlement/continuation and assistant-tail lifecycle bugs (#5886)](https://github.com/earendil-works/pi/issues/5886) — 11 comments, 👍4. Meta-issue for a recurring class of post-run bugs where continuation logic reads from stale or no-longer-active transcripts; flagged as needing a cohesive larger fix.
4. [Gemini 3.x models fail during tool use due to missing thought_signature (#6996)](https://github.com/earendil-works/pi/issues/6996) — 9 comments (closed). Gemini 3.x models reject tool-result submissions lacking `thought_signature` in history; resolved.
5. [Esc during active streaming often fails to cancel the in-flight request (#8823)](https://github.com/earendil-works/pi/issues/8823) — 6 comments. The abort is registered but the HTTP request runs until the provider finishes naturally — a UX frustration during long generations.
6. [Unable to start 0.84.1: zlib.createZstdDecompress is not a function (#7771)](https://github.com/earendil-works/pi/issues/7771) — 6 comments (closed). Node 23 users hit an unhandled `zlib` error after `pi update`; closed as no-action.
7. [OpenRouter :free models fail with 400 — Pi sends max_tokens above provider limit (#8760)](https://github.com/earendil-works/pi/issues/8760) — 5 comments, in progress. Pi sends the catalog's `maxOutputTokens`, which exceeds upstream free-tier hard limits, breaking multiple `:free` models.
8. [GitHub Copilot GPT-6 Astra routed to unsupported Chat Completions endpoint (#9209)](https://github.com/earendil-works/pi/issues/9209) — 5 comments (closed). Copilot rejects `/chat/completions` for `gpt-6-astra`; fixed by PR #9253 routing GPT models through Responses.
9. [Bedrock: OpenAI models reject images nested in toolResult.content (#8643)](https://github.com/earendil-works/pi/issues/8643) — 5 comments. Contributor YuvalSarel1 has a fix plus regression test ready on a fork: hoist tool-result images into sibling user content blocks.
10. [EventStream has quadratic CPU cost when draining buffered events (#9055)](https://github.com/earendil-works/pi/issues/9055) — 4 comments. Long-running agent-loop servers pay O(n²) because `shift()` moves the remaining array on every dequeue; a proper queue is proposed.

## Key PR Progress
1. [fix(ai): route Copilot GPT models through Responses (#9253)](https://github.com/earendil-works/pi/pull/9253) — Fixes #9209 by sending Copilot GPT models (including `gpt-6-astra`) through the Responses endpoint. Merged.
2. [feat(ai): add mid-conversation system messages (#9116)](https://github.com/earendil-works/pi/pull/9116) — First layer of mitsuhiko's split of #8998: lets pi-ai carry system-role messages that arrive mid-session without breaking the coding agent.
3. [feat(coding-agent): deliver prompt and tool changes as system message deltas (#9117)](https://github.com/earendil-works/pi/pull/9117) — Second layer, stacked on #9116; replaces rewriting the top-level prompt with system-message deltas for prompt and tool-loadout changes.
4. [feat(coding-agent): confirm device-code browser and clipboard actions (#9301)](https://github.com/earendil-works/pi/pull/9301) — Opt-in revival of #9282: opens the verification page and copies the user code on a best-effort, user-confirmed basis for device-code logins.
5. [fix(ai): remove invalid Fable 5 fallback target (#9297)](https://github.com/earendil-works/pi/pull/9297) — Drops `claude-opus-4-8` from Fable 5's built-in fallbacks (the API now rejects it with 400), keeping Opus 5 only; covers generated metadata.
6. [feat(coding-agent): add manual retry api/command (#9292)](https://github.com/earendil-works/pi/pull/9292) — Adds a manual retry path for cases where auto-retry gives up too early or never attempts recovery.
7. [feat(ai): Ollama Cloud support (#7742)](https://github.com/earendil-works/pi/pull/7742) — First-class Ollama Cloud provider support using `OLLAMA_API_KEY`, following existing provider patterns and models.dev catalogs.
8. [fix(coding-agent): preserve indentation in rendered diffs (#9274)](https://github.com/earendil-works/pi/pull/9274) — Fixes the edit-tool intra-line renderer dropping leading whitespace when a removed line has text inserted before otherwise-unchanged content.
9. [fix(agent): end agentLoop stream with error result on loop rejection (#9269)](https://github.com/earendil-works/pi/pull/9269) — Adds missing rejection handling for `agentLoop()`; synchronous throws, OAuth refresh failures, and `getApiKey` rejections now surface as stream errors.
10. [docs(coding-agent): document running pi in Docker Sandboxes (#9077)](https://github.com/earendil-works/pi/pull/9077) — Adds a Docker Sandboxes section and table row to `containerization.md`, closing the request in #8788.

## Feature Request Trends
- **Provider catalog & routing accuracy**: recurring asks to fix model metadata rather than paper over symptoms — OpenRouter `:free` max_tokens caps (#8760), Copilot endpoint routing (#9209/#9277), Fable 5 fallback lists (#9294), Grok error attribution (#9298).
- **Session/identity plumbing**: a cluster of issues and PRs track OpenCode Go's newly enforced `x-opencode-session` header (#9230, #9237, #9290), with requests for host-based auto-injection in Pi core.
- **User control over agent runtime**: manual retry APIs (#9292), a cap on agent retry backoff (#8826), startup display section toggles (#9289), and restoring automatic persistence for model/thinking changes (#9273).
- **Performance architecture**: system-message deltas to stop prompt rewrites (#9116/#9117), replacing O(n²) hot paths in EventStream drains (#9055) and streaming tool-call re-parsing (#9063), and cheaper fuzzy search (#9267) — signs of growing headless/SDK usage.

## Developer Pain Points
- **Streaming and abort reliability**: `openai-codex` sessions stuck on `Working...` (#4945) and Escape failing to cancel in-flight HTTP requests (#8823) are the loudest recurring complaints.
- **Upstream provider churn**: breaking changes keep landing — OpenCode Go session headers, Copilot endpoint restrictions, Gemini `thought_signature`, OpenRouter free-tier limits, and Fable 5 fallback rejections all required rapid patch cycles this week.
- **Windows experience uncertainty**: the 61-comment survey (#7547) reflects confusion over which of the many Windows run modes Pi should officially support.
- **Server/SDK scalability**: headless users report OOM from grep with context lines (#9276), quadratic EventStream draining (#9055), and repeated streaming-argument re-parsing (#9063) when embedding pi-coding-agent in long-running services.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-08

## 1. Today's Highlights

Activity is dominated by Web Shell workflow management and daemon/session reliability. The newest preview and nightly releases add live workflow-run visualization/management plus a related performance fix, while two P1 issues — dropped background output during session recycling and Windows `conhost.exe` leaks — are open. Roughly 49 issues and 50 PRs were updated in the last 24 hours; the longest-running discussion remains the planned TUI migration from `ink` to OpenTUI, with 32 comments.

## 2. Releases

- **`v0.23.1-preview.2` and `v0.23.0-nightly.20260907.f1ed3bc31a`** include:
  - `feat(web-shell)`: visualize and manage dynamic workflow runs — [#10594](https://github.com/QwenLM/qwen-code/pull/10594)
  - `perf(web-shell)`: derive the session workflow project more efficiently.
- **`cua-driver-rs v0.20.4`**: Updated Qwen CUA Driver prebuilt binaries. macOS builds are codesigned and notarized; Linux/Windows binaries remain unsigned, with platform-specific deployment changes.

## 3. Hot Issues

1. **[#8662 — Migrate TUI rendering layer from ink to OpenTUI](https://github.com/QwenLM/qwen-code/issues/8662)**  
   The tracking issue for replacing the heavily patched `ink 7 + React 19` renderer with OpenTUI. It is the highest-comment thread at 32 comments, reflecting recurring flicker, rendering overhead, and structural limitations in the current TUI stack.

2. **[#8586 — Track activeWork and recover background Agents](https://github.com/QwenLM/qwen-code/issues/8586)**  
   Requests an explicit `activeWork` state in daemon health plus a recovery path for background agents that outlive their originating prompt. This is one of several signals that background automation under `qwen serve` needs better lifecycle observability.

3. **[#11119 — Background shell output and wake notifications silently dropped after session runtime recycle](https://github.com/QwenLM/qwen-code/issues/11119)**  
   A P1 daemon/Web Shell bug: a CI-polling background shell keeps running after a turn ends, but its output and wake notifications stop being delivered when the session runtime recycles, potentially wedging the session. 8 comments.

4. **[#11303 — Windows qwen-cli leaks headless conhost.exe / ConPTY processes](https://github.com/QwenLM/qwen-code/issues/11303)**  
   P1 Windows reliability issue. The VS Code Companion embedded CLI accumulated 347 child processes holding roughly 2.8 GB RAM after ~12 hours, caused by unreleased headless `conhost.exe` processes. 6 comments.

5. **[#10530 / #10435 — 400 "Failed to initialize samplers" with local llama-server](https://github.com/QwenLM/qwen-code/issues/10530)**  
   Duplicate reports that launched Qwen 3.8/3.6 on local llama-server now fail with `400 Failed to initialize samplers: failed to parse grammar`. The regression appeared in 0.22.3; Pi and OpenCode are unaffected, pointing to Qwen Code's grammar/sampler integration with llama-server.

6. **[#3361 — Agent misinterprets non-empty shell output as empty](https://github.com/QwenLM/qwen-code/issues/3361)**  
   Commands such as `pwd && git rev-parse --show-toplevel` execute successfully and display output, but the agent concludes the output was empty when using OpenAI-compatible APIs. Still open after several months, indicating a tricky tool-output parsing issue.

7. **[#10865 — Web Shell workflow projection derived three times per render](https://github.com/QwenLM/qwen-code/issues/10865)**  
   Follow-up performance regression after the workflow visualization work merged: `SessionWorkflowCockpit.tsx` rebuilds an expensive projection/index three times per render. 5 comments.

8. **[#11272 — Cancelling a long-running stdio MCP tool call kills the server permanently](https://github.com/QwenLM/qwen-code/issues/11272)**  
   In Channel deployments, cancelling a long-running MCP tool call terminates the stdio MCP server and it never recovers. This is a production blocker for interactive card workflows such as DingTalk. 3 comments.

9. **[#11205 — Main filter screen lost six security hardenings](https://github.com/QwenLM/qwen-code/issues/11205)**  
   Review follow-up noting that `main`'s filter screen dropped protections for read order, `EACCES`, `U+FFFD`, spawn timeouts, candidate caps, and retention. A good example of how separate review streams can regress security fixes during integration.

10. **[#8835 — Repo-hygiene W33 report-only findings](https://github.com/QwenLM/qwen-code/issues/8835)**  
    Bot-generated security audit with 8 findings, including `..` containment issues in ACP session cwd checks and worktree sidecar containment. It is report-only, but several findings touch security-sensitive validation paths.

## 4. Key PR Progress

1. **[#11206 — feat(mesh): add persistent shared-thread agent collaboration](https://github.com/QwenLM/qwen-code/pull/11206)**  
   Adds persistent workspace-level agent identities collaborating on shared threads, including assignment, interjection, result attribution, cancellation, review, and blocker resolution.

2. **[#11250 — feat(web-shell): Improve split-view session navigation](https://github.com/QwenLM/qwen-code/pull/11250)**  
   Refines split-view UX by reusing the sidebar session-details popover for titles, highlighting the active pane, and adding toolbar cycling through panes waiting on tool approval or user input.

3. **[#10999 — feat(core): configure model reasoning capabilities](https://github.com/QwenLM/qwen-code/pull/10999)**  
   Adds declarative reasoning capability metadata to provider model definitions and propagates it through ACP, session restoration, TUI effort controls, and the final OpenAI-compatible request.

4. **[#11282 — feat(core): expand `${session_id}` in per-provider customHeaders](https://github.com/QwenLM/qwen-code/pull/11282)**  
   Implements the requested `${session_id}` template in `modelProviders[].generationConfig.customHeaders`, resolved per request — useful for per-session routing/gateway headers.

5. **[#10906 — feat(web-shell): show shell and monitor task output](https://github.com/QwenLM/qwen-code/pull/10906)**  
   Persists shell/monitor stdout and stderr and exposes a session-owner-scoped tail endpoint so Web Shell users can read captured task output directly in the UI.

6. **[#11196 — feat(workflows): journal failed agents and settle agent failures to null](https://github.com/QwenLM/qwen-code/pull/11196)**  
   Improves workflow resume semantics: the journal now distinguishes started-and-returned, interrupted, and failed agents, and settles failed agents to `null` instead of leaving ambiguous in-flight state.

7. **[#11305 — feat(goal): size the checkpoint verifier timeout for a full claim list](https://github.com/QwenLM/qwen-code/pull/11305)**  
   Raises the Goal evidence-checkpoint verifier ceiling from 30s to 180s and adds an operator-configurable `model.goalCheckpointTimeoutSeconds` setting.

8. **[#11304 — fix(goal): count an unanswered checkpoint as a stall](https://github.com/QwenLM/qwen-code/pull/11304)**  
   A checkpoint verifier that never responds now counts toward the checkpoint stall limit, even when the verifier did not return the usual overflow shape. Complements #11305.

9. **[#11315 — fix(serve): fail fast on unsupported target mutations in the CDP tunnel](https://github.com/QwenLM/qwen-code/pull/11315)**  
   The daemon's CDP WebSocket tunnel previously returned empty success for unrecognized browser-level commands, silently “succeeding” four target-mutation operations. This makes them fail explicitly.

10. **[#11169 — fix(web-shell): close trust-gate and bystander gaps in the local-files bridge](https://github.com/QwenLM/qwen-code/pull/11169)**  
    Follow-up to the merged local-files bridge carrying four final review fixes, including an explicit “still resolving” workspace-route guard and tighter trust/bystander checks.

## 6. Feature Request Trends

- **Web Shell / session workflow tooling** remains the strongest request cluster: dynamic workflow-run visualization, split-view navigation, session-wide turn navigation, and shell/monitor output visibility all appeared in the last 24 hours. Relevant: [#10750](https://github.com/QwenLM/qwen-code/issues/10750), [#10938](https://github.com/QwenLM/qwen-code/pull/10938), [#11250](https://github.com/QwenLM/qwen-code/pull/11250), [#10906](https://github.com/QwenLM/qwen-code/pull/10906).
- **Daemon background-automation resilience**: users want first-class tracking and recovery for background agents, fair session reclamation, and no silent output drops after runtime recycling. Relevant: [#8586](https://github.com/QwenLM/qwen-code/issues/8586), [#11119](https://github.com/QwenLM/qwen-code/issues/11119).
- **Self-hosted semantic memory**: requests to bundle a local memory MCP server or add embedding-based recall to the existing `MEMORY.md` auto-memory system are gaining attention. Relevant: [#10684](https://github.com/QwenLM/qwen-code/issues/10684).
- **Provider/backend-agnostic request control**: users want per-session header templating, `/effort` forwarded to OpenAI-compatible backends, and retryable transport-error handling. Relevant: [#10995](https://github.com/QwenLM/qwen-code/issues/10995), [#11227](https://github.com/QwenLM/qwen-code/issues/11227), [#10347](https://github.com/QwenLM/qwen-code/pull/10347).
- **TUI modernization**: the OpenTUI migration is explicitly framed as a roadmap-level terminal-UX investment. Relevant: [#8662](https://github.com/QwenLM/qwen-code/issues/8662).

## 7. Developer Pain Points

- **Local and OpenAI-compatible backends remain brittle**: grammar parsing regressions with llama-server, `/effort` not being forwarded, and shell output being misread as empty all point to gaps in backend-agnostic compatibility. Relevant: [#10530](https://github.com/QwenLM/qwen-code/issues/10530), [#11227](https://github.com/QwenLM/qwen-code/issues/11227), [#3361](https://github.com/QwenLM/qwen-code/issues/3361).
- **Windows is still a resource-leak hotspot**: `conhost.exe`/ConPTY leak reports, plus canonical path issues breaking Windows CI tests, show that Windows-specific process and path handling needs more hardening. Relevant: [#11303](https://github.com/QwenLM/qwen-code/issues/11303), [#11318](https://github.com/QwenLM/qwen-code/pull/11318).
- **Daemon/session lifecycle semantics are hard to get right**: dropped background output, unreclaimable sessions, and channel ownership gaps suggest that `qwen serve` session settlement/recycling is a recurring source of bugs. Relevant: [#11119](https://github.com/QwenLM/qwen-code/issues/11119), [#11118](https://github.com/QwenLM/qwen-code/issues/11118), [#11186](https://github.com/QwenLM/qwen-code/issues/11186).
- **MCP tool cancellation is unsafe**: cancelling long-running stdio tools can kill the MCP server entirely, and it never recovers in Channel mode. Relevant: [#11272](https://github.com/QwenLM/qwen-code/issues/11272).
- **TUI/rendering performance still draws complaints**: flicker, alignment bugs, and expensive repeated derivations in Web Shell surfaces reflect a broader rendering-stack tension ahead of the OpenTUI migration. Relevant: [#8662](https://github.com/QwenLM/qwen-code/issues/8662), [#10865](https://github.com/QwenLM/qwen-code/issues/10865).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*