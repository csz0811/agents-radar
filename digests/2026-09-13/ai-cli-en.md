# AI CLI Tools Community Digest 2026-09-13

> Generated: 2026-09-13 00:17 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Comparison Report — 2026-09-13

## 1. Ecosystem Overview

The AI CLI ecosystem is maturing from “model capability demos” into **agent runtime infrastructure**: reliability, cost predictability, security boundaries, session continuity, and protocol correctness now dominate community feedback. Across Claude Code, Codex, Gemini CLI, Copilot CLI, OpenCode, Pi, and Qwen Code, the loudest pain points are remarkably consistent—quota/usage accounting, hangs and silent failures, MCP/ACP/WebSocket correctness, Windows/WSL/remote parity, and safe autonomy. Maintainers are responding with targeted patches, nightlies, and large PR batches, but many regressions are still reaching stable releases. Differentiation is increasingly architectural: sandboxing, execution isolation, plugin/RPC surfaces, remote/unattended operation, enterprise observability, and provider flexibility.

## 2. Activity Comparison

Counts below reflect items surfaced/updated in the 2026-09-13 digest window, not total open backlog. No repo in this set is described as having Issues/PRs disabled; “N/A” for Discussions means no discussion data was provided in the digest, not that the channel is inactive.

| Tool | Issues (window) | PRs (window) | Discussions (window) | Release status |
|---|---:|---:|---:|---|
| **Claude Code** | 10 highlighted | 3 updated (2 closed, 1 open) | N/A | **v2.1.270** patch: read-only git permission regression fix |
| **OpenAI Codex** | 10 highlighted | 10 key PRs | 6 | None |
| **Gemini CLI** | 14 highlighted (10 hot + 4 watch) | 13 (10 key + 3 notable) | N/A | **v0.61.0-nightly.20260912.g9c1b0a610** — prompt-injection and sandbox hardening |
| **GitHub Copilot CLI** | 8 updated (all covered) | 3 updated | N/A | None; latest cited v1.0.83 |
| **OpenCode** | 12 highlighted | 14 (10 key + 4 notable) | N/A | None |
| **Pi** | 43 updated; 14 highlighted | 9 updated (8 key + 1 noise) | 3 | None |
| **Qwen Code** | 10 highlighted | 12 (10 key + 2 notable) | N/A | **v0.23.3-nightly.20260912.54aa66834b** — channel refactor + breaking change |

## 3. Shared Feature Directions

- **Session continuity, persistence, and lifecycle management**  
  - **Claude Code**: session handoff across machines (#11455), Cowork state persistence (#93910), transcript retention concerns (#86280).  
  - **Codex**: remote/mobile session reliability, resume pagination, backups, bulk cleanup.  
  - **Gemini CLI**: ACP `session/load` fix (#29288), `/compress` persistence (#21335).  
  - **OpenCode**: interactive session selector, renaming, archive-without-closing (#48718, #46915, #46165).  
  - **Pi**: fork-from-resume, permanent branch deletion, correct model restoration on resume (#9521, #9531, #9243).  
  - **Qwen Code**: long-session durability, context compression, monitor recovery.

- **Cost, quota, and usage transparency**  
  - **Claude Code**: single high-effort review exhausting monthly budget (#93894), unreliable usage-limit messaging (#77469, #74165, #87007).  
  - **Codex**: quota-depletion tracker (#41220), severe 5-hour drain (#45073), token/credit/cost estimates PR (#44970).  
  - **Copilot CLI**: subagent prompt-caching failure compounding token spend (#4829), OTel per-phase credit attribution (#4825).  
  - **OpenCode**: provider quota/auth anomalies (#48687, #48681, #48711).  
  - **Pi**: misleading cache-miss telemetry (#9013).  
  - **Qwen Code**: context overview and manual compression in Web Shell (#11700).

- **Security, sandboxing, and permission control**  
  - **Gemini CLI**: indirect prompt injection via build files, sandbox filesystem hardening, shell-wrapper bypass, MCP allowlist enforcement (#29250, #29214, #29203, #29200).  
  - **Claude Code**: auth-token leak into later sessions (#79427), cloud GitHub egress/header issues (#86828).  
  - **Copilot CLI**: MCP cancellation semantics (#4759), session-scoped `/remove-dir` (#4830).  
  - **OpenCode**: remote approval for permission prompts (#39628).  
  - **Pi**: sandbox-escape class bug when routing extension fails (#9068).  
  - **Qwen Code**: unredacted telemetry of shell errors (#11198), MCP `${VAR}` placeholders not expanded (#11499).

- **MCP/ACP/protocol correctness**  
  - **Copilot CLI**: MCP cancellation during elicitation (#4759).  
  - **Gemini CLI**: consistent MCP policy at runtime (#29200).  
  - **Qwen Code**: hook parity with Claude Code (#11610), MCP config rehydration (#7771).  
  - **Codex**: app-server IPC decoding failures (#43938), Luna Reserve redemption (#45132).  
  - **Pi**: Responses API image interop gap (#9516), RPC prompt disposition (#9098).  
  - **OpenCode**: subagent ID discovery (#36761), MCP process explosion (#43845).

- **Remote, mobile, and unattended operation**  
  - **Codex**: iPad remote freezes (#41695), macOS Remote Control enablement (#36946), Windows active-task interruption (#45075).  
  - **Claude Code**: Cowork cloud session GitHub access failures (#84581, #91805).  
  - **OpenCode**: mobile/second-device approval (#39628), desktop sidecar stability.  
  - **Qwen Code**: Android companion over ACP (#11704).  
  - **Pi**: RPC mode powering a phone-friendly dashboard (#9525).

- **Subagent/multi-agent reliability and observability**  
  - **Gemini CLI**: MAX_TURNS misreported as `GOAL` success (#22323), generalist hangs (#21409), subagent context missing from bug reports (#21763).  
  - **OpenCode**: valid subagent IDs not exposed to model (#36761).  
  - **Copilot CLI**: subagent prompt-caching and token compounding (#4829).  
  - **Qwen Code**: background-agent React crash (#11500, #11732), monitor orphan reaping (#11742).  
  - **Claude Code**: agent-view organization (#83013, #80119).

- **Platform parity and terminal UX**  
  - **Claude Code**: Windows GPU crash (#80444), WSL browser-tooling gap (#93124).  
  - **Codex**: Windows desktop setup/sandbox failures, TUI cursor/input regressions (#44444, #31317).  
  - **Gemini CLI**: terminal flicker/tearing (#29294), Wayland browser subagent failure (#21983).  
  - **OpenCode**: clipboard failures across OS/VS Code/Codespaces/Screen (#4283, #13984, #41470, #26459, #32985).  
  - **Pi**: fullscreen scroll/mouse regressions (#9052, #9311), Windows path separators (#9262).  
  - **Qwen Code**: React #185 TUI crash on stable 0.23.3 (#11732), RHEL `Intl.Segmenter` failure (#11747).

## 4. Differentiation Analysis

| Tool | Feature focus | Target users | Technical approach |
|---|---|---|---|
| **Claude Code** | Enterprise/cloud sessions, permission safety, plugin/mods, Windows desktop stability, cost predictability | Professional dev teams, subscription/enterprise users, long-lived sessions | CLI + desktop + cloud/Cowork; strong mod/plugin testing; MCP and permission hooks |
| **OpenAI Codex** | Quota instrumentation, remote/mobile sessions, TUI command center, Windows desktop robustness, multi-account | ChatGPT/Plus/Enterprise users, remote and mobile workflows | App-server, IPC, agent command center, TUI polish, multi-account lifecycle |
| **Gemini CLI** | Security hardening, sandboxing, prompt-injection defense, subagent correctness, AST/token-frugal retrieval | Google ecosystem, enterprise policy users, OSS contributors | Nightly cadence; sandbox filesystem boundaries; MCP policy; AST-aware tooling |
| **GitHub Copilot CLI** | GitHub/enterprise integration, MCP cancellation, session-scoped permissions, OTel cost attribution | GitHub/Copilot enterprise users, CI and audited environments | WebSocket/CAPI, MCP protocol hygiene, multi-model routing observability |
| **OpenCode** | Provider-agnostic operation, desktop/TUI/plugin ecosystem, clipboard/terminal compatibility, remote approval | Power users, self-hosted/local-model users, multi-platform developers | V2 server/desktop sidecar, SSE streams, plugin APIs, broad terminal support |
| **Pi** | Extensible agent platform, OAuth subscription providers, RPC, session tree, TUI depth | Plugin developers, CI/parallel-agent users, provider experimenters | RPC mode, extension routing, subscription OAuth, permanent session branches |
| **Qwen Code** | Separable execution environments, Web Shell context control, Android/ACP, security redaction | Qwen model users, web/mobile users, enterprise security teams | Harness/executor split, SSH/container workers, Playwright browser SDK, hooks parity |

## 5. Community Momentum & Maturity

**Highest raw engagement:** OpenCode leads with the clipboard issue at 131 comments / 123 👍 (#4283). Claude Code follows with the Windows GPU crash at 111 comments (#80444) and session handoff at 25 👍 (#11455). Pi’s `openai-codex` hang is the most-discussed repo issue at 78 comments / 33 👍 (#4945). Codex has the strongest single UX vote at 48 👍 for disabling Pets (#34349) and a 40-comment quota tracker (#41220). Gemini’s top P1 subagent issue has 13 comments (#22323); Qwen’s TUI crash has 10 (#11500); Copilot’s most-discussed item is a closed WebSocket/CAPI 400 with 7 comments (#2147).

**Rapid iteration:** Gemini CLI and Qwen Code are shipping nightlies with security/architecture changes. OpenCode is pushing a large V2/TUI/desktop fix batch. Pi is rapidly expanding provider OAuth and session/TUI features. Codex is iterating on TUI polish and usage visibility. Claude Code shipped a narrow patch, while Copilot CLI’s PR activity is mostly CI/dependency hygiene.

**Maturity signals:** Claude Code, Codex, Gemini CLI, and Copilot CLI carry larger enterprise/platform backlogs and more billing, quota, or compliance friction. OpenCode, Pi, and Qwen Code show high contributor velocity and plugin/RPC extensibility, but also more regressions, silent failures, and platform edge cases. Claude Code’s aggressive stale triage and Codex’s quota frustration are notable community-health risks.

## 6. Trend Signals

- **Cost predictability is now a trust feature.** Quota depletion, opaque rate limits, and broken prompt caching are recurring across Codex, Claude Code, Copilot CLI, OpenCode, and Pi. Tools that expose per-turn tokens, credits, cache behavior, and routing attribution will win developer confidence.
- **Silent failures are more damaging than loud errors.** Hangs, false success signals, dropped prompts, empty clipboard pastes, and stuck streams appear in every community. Strong error taxonomies, non-resetting deadlines, retryable classifications, and visible failure states are high-leverage fixes.
- **Security defaults are under scrutiny.** Prompt injection, sandbox escapes, unredacted telemetry, MCP secret handling, and permission-policy bypasses are active concerns. Fail-closed sandboxing, deterministic redaction, and explicit permission revocation are becoming baseline expectations.
- **Protocol correctness is a competitive moat.** MCP cancellation, ACP session IDs, Responses API interop, app-server IPC, and hook parity with Claude Code show users want portable, standards-compliant agent infrastructure.
- **Remote and unattended workflows need better lifecycle support.** Mobile approval, cloud repo access, session resume, durable monitors, and multi-account switching are key asks across Codex, Claude Code, OpenCode, Qwen, and Pi.
- **Platform parity remains unfinished.** Windows, WSL, Linux GUI, Wayland, GNU Screen, and web VS Code each surface distinct bugs. Cross-platform CI and capability negotiation are differentiators.
- **For developers:** prioritize robust stream timeouts, structured error reporting, session persistence, cost telemetry, MCP/ACP compliance, redaction-by-default, and sandbox fail-closed behavior. The market is rewarding tools that make agent execution **observable, portable, and safe**—not just capable.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report
**Source:** github.com/anthropics/skills · **Data as of:** 2026-09-13

> Note: the PR feed returned `Comments: undefined` for all entries, so PRs are ranked by *attention signals* — cross-referenced issues, duplicate/competing submissions, and update recency — rather than raw comment counts. Issue comment counts are reliable and are used directly.

---

## 1. Top Skills Ranking

### 1) skill-creator / run_eval.py reliability cluster — *the highest-attention Skill in the repo*
Multiple PRs and a 12-comment issue converge on one Skill: the meta-tool that generates and optimizes other Skills.
- **[PR #1298](https://github.com/anthropics/skills/pull/1298)** (OPEN, updated 2026-09-12) — `run_eval.py` always reports `recall=0%`; installs the eval artifact as a real Skill and fixes Windows stream reading, trigger detection, and parallel workers. Explicitly cites 10+ independent reproductions in [#556](https://github.com/anthropics/skills/issues/556).
- **[PR #1099](https://github.com/anthropics/skills/pull/1099)** and **[PR #1050](https://github.com/anthropics/skills/pull/1050)** — competing Windows fixes (`WinError 10038` / `WinError 2`, `claude.cmd` vs `claude`).
- **[PR #539](https://github.com/anthropics/skills/pull/539)** — pre-parse validation for unquoted YAML descriptions containing `:`.
**Discussion highlight:** the description-optimization loop is currently "optimizing against noise" — a correctness crisis for the Skill-authoring pipeline itself. **Status:** all OPEN.

### 2) docx — comments, tracked changes, and ID safety
- **[PR #1734](https://github.com/anthropics/skills/pull/1734)** (OPEN, created 2026-09-06) — detect orphaned docx comments.
- **[PR #541](https://github.com/anthropics/skills/pull/541)** (OPEN) — prevent `w:id` collisions between tracked changes and existing bookmarks (document corruption).
**Status:** OPEN; #1734 is the freshest submission in the top set.

### 3) mcp-builder — SDK drift and broken evaluation harness
- **[PR #1742](https://github.com/anthropics/skills/pull/1742)** (OPEN, updated 2026-09-11) — support `mcp>=2` `streamable_http_client` rename and custom headers (fixes [#1668](https://github.com/anthropics/skills/issues/1668)).
- **[PR #1724](https://github.com/anthropics/skills/pull/1724)** — update `evaluation.py` default model off the `claude-3-7-sonnet` snapshot.
- **[PR #1602](https://github.com/anthropics/skills/pull/1602)** — serialization, benchmark metric, encoding, and script-stability fixes.
- Related: **[Issue #1390](https://github.com/anthropics/skills/issues/1390)** — `evaluation.py` scores 0/N against any real MCP server (TextContent not JSON-serializable). **Status:** OPEN.

### 4) document-typography — quality control for generated documents
- **[PR #514](https://github.com/anthropics/skills/pull/514)** (OPEN) — prevents orphan word wrap, widow paragraphs, and numbering misalignment. Positions typography as a universal, unrequested-but-always-needed quality layer. **Status:** OPEN.

### 5) Hivemind — zero-cost multi-agent orchestration
- **[PR #1628](https://github.com/anthropics/skills/pull/1628)** (OPEN) — delegates mechanical work to headless `opencode` workers on free models while Claude Code remains the sole planner/reviewer/merger. Framed around context as the scarce resource. **Status:** OPEN.

### 6) scnet-hpc — domain cluster operations
- **[PR #1615](https://github.com/anthropics/skills/pull/1615)** (OPEN) — profile-based SSH and Slurm workflows for SCNet HPC clusters. Representative of a widening vertical-Skill wave. **Status:** OPEN.

### 7) ODT — OpenDocument creation/conversion
- **[PR #486](https://github.com/anthropics/skills/pull/486)** (OPEN) — create, fill, read, convert `.odt`/`.ods`; ISO/open-source document formats. **Status:** OPEN (long-running, updated 2026-04-14).

### 8) self-audit — output verification quality gate
- **[PR #1367](https://github.com/anthropics/skills/pull/1367)** (OPEN, v1.3.0) — mechanical file verification followed by a four-dimension reasoning audit in damage-severity order. Predecessor proposal: **[Issue #1385](https://github.com/anthropics/skills/issues/1385)**. **Status:** OPEN.

*Also notable:* **[PR #1607](https://github.com/anthropics/skills/pull/1607)** (claude-api retired model IDs), **[PR #538](https://github.com/anthropics/skills/pull/538)** (pdf case-sensitivity breakage), **[PR #83](https://github.com/anthropics/skills/pull/83)** (marketplace skill-quality/security analyzers — oldest open PR in the set), **[PR #210](https://github.com/anthropics/skills/pull/210)** (frontend-design clarity rewrite).

---

## 2. Community Demand Trends (from Issues)

| Trend | Evidence | Signal strength |
|---|---|---|
| **Security & trust boundaries** | [#492](https://github.com/anthropics/skills/issues/492) (43 comments) — community skills distributed under the `anthropic/` namespace impersonate official Skills; users may grant elevated permissions. Also [#1175](https://github.com/anthropics/skills/issues/1175) on embedding permission logic in SKILL.md. | ★★★★★ — most-discussed issue by far |
| **Team/org distribution & sharing** | [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8 👍) — org-wide shared skill library instead of manual `.skill` file passing. [#189](https://github.com/anthropics/skills/issues/189) (9 👍) — duplicate content across `document-skills` / `example-skills`. | ★★★★ |
| **Evaluation & trigger reliability** | [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 7 👍) — 0% trigger rate; [#1390](https://github.com/anthropics/skills/issues/1390) — mcp-builder scores 0/N. | ★★★★ |
| **Context-window economy** | [#1487](https://github.com/anthropics/skills/issues/1487) — `claude-api` eagerly injects ~156k tokens in a single tool call; [#189](https://github.com/anthropics/skills/issues/189) duplicate Skills; [#1329](https://github.com/anthropics/skills/issues/1329) `compact-memory` symbolic state. | ★★★★ |
| **Skill-authoring best practice** | [#202](https://github.com/anthropics/skills/issues/202) — skill-creator reads like developer docs; verbose tone hurts token efficiency. | ★★★ |
| **Governance / agent safety patterns** | [#412](https://github.com/anthropics/skills/issues/412) — policy enforcement, threat detection, trust scoring, audit trails; [#1385](https://github.com/anthropics/skills/issues/1385) — reasoning quality gates. | ★★★ |
| **Platform & protocol reach** | [#29](https://github.com/anthropics/skills/issues/29) — AWS Bedrock support; [#16](https://github.com/anthropics/skills/issues/16) — expose Skills as MCPs. | ★★ |

**Distilled demand directions:** (a) trust/verification tooling for Skills themselves, (b) organization-scale distribution, (c) token-frugal Skill design, (d) correctness of the eval loop, (e) vertical/integration Skills (HPC, Buffer, SharePoint, Bedrock).

---

## 3. High-Potential Pending Skills

All top PRs are currently **OPEN** — no merged entries appear in this window. Highest probability of landing soon, judged by recency + linkage to open bugs:

1. **[PR #1742](https://github.com/anthropics/skills/pull/1742)** — mcp-builder `mcp>=2` import/header fix. Small, targeted, fixes a filed issue (#1668); updated 2026-09-11. *Strongest candidate.*
2. **[PR #1734](https://github.com/anthropics/skills/pull/1734)** — orphaned docx comment detection. Newest submission (2026-09-06), clean scope.
3. **[PR #1724](https://github.com/anthropics/skills/pull/1724)** — mcp-builder default model refresh. One-line-class change.
4. **[PR #1298](https://github.com/anthropics/skills/pull/1298)** — skill-creator `run_eval.py` recall fix. Highest impact, but large and overlaps #1099/#1050 — merge conflict risk is the gating factor.
5. **[PR #1607](https://github.com/anthropics/skills/pull/1607)** — claude-api retired model IDs. Documentation-only, resolves #1603.
6. **[PR #1615](https://github.com/anthropics/skills/pull/1615)** / **[PR #1627](https://github.com/anthropics/skills/pull/1627)** / **[PR #1628](https://github.com/anthropics/skills/pull/1628)** — scnet-hpc, buffer-api, Hivemind. New vertical Skills with no blocking dependencies; require maintainer review bandwidth.

**Watchlist (stale but substantive):** [#514](https://github.com/anthropics/skills/pull/514) document-typography, [#486](https://github.com/anthropics/skills/pull/486) ODT, [#83](https://github.com/anthropics/skills/pull/83) analyzer meta-Skills, [#210](https://github.com/anthropics/skills/pull/210) frontend-design.

---

## 4. Skills Ecosystem Insight

**The community's demand is concentrated on making the Skill layer itself trustworthy: fixing broken evaluation/triggering, hardening security and naming boundaries, and cutting context cost — quality-of-the-system issues matter more right now than adding new Skill domains.**

---

*Methodology caveat:* PR comment counts were unavailable (`undefined`) in the source feed; rankings are inferred from issue cross-references, duplicate submissions competing on the same bug, update recency, and 👍 signals on linked issues. Issue metrics (comments, 👍) are as reported.

---

# Claude Code Community Digest — 2026-09-13

## 1. Today's Highlights

A narrow but important patch landed: **v2.1.270** fixes a permission regression from 2.1.269 where read-only git commands in Bash began re-prompting mid-session. Community attention remains concentrated on **platform stability and cost predictability** — the Windows desktop GPU crash thread (#80444) is now the highest-traffic open issue at 111 comments, while fresh reports (#93894) highlight subscription-tier session budgets being exhausted by a single high-effort code review. Cloud/Cowork GitHub connectivity remains a systemic theme, with at least three separate issues describing repositories being unreachable or unlisted in cloud sessions.

## 2. Releases

**v2.1.270** (last 24h)
- Fixed read-only git commands executed via Bash unexpectedly requesting permission after a session had been running for some time. This was a regression introduced in **v2.1.269**.
- Impact: users running long-lived sessions with frequent `git status`/`git log`/`git diff` calls should upgrade immediately to avoid repeated permission prompts.

## 3. Hot Issues

1. **[#80444](https://github.com/anthropics/claude-code/issues/80444)** — *Windows desktop 1.24012.1 fatal GPU-process crash (0x060C201E) via in-app Browser tab* — 111 comments, 17 👍. The most active issue in the tracker. The crash leaves the MSIX package unlaunchable (`appxState=2`) until a manual Repair, and reproduces across two driver versions on an RTX 2080. This is the clearest signal that the in-app browser path has a hard stability problem on Windows.
2. **[#11455](https://github.com/anthropics/claude-code/issues/11455)** — *Feature Request: Session Handoff / Continuity Support* — 31 comments, 25 👍. The single most-upvoted open request. Long-running, multi-machine work is still not portable between CLI sessions, and the community has kept this alive since November 2025.
3. **[#84581](https://github.com/anthropics/claude-code/issues/84581)** — *Cowork cloud sessions cannot access any GitHub repository; git proxy instructs the agent to call a nonexistent `add_repo` tool* — The proxy instructs the agent to invoke a tool that does not exist, making cloud GitHub access effectively dead-ended rather than merely misconfigured.
4. **[#91805](https://github.com/anthropics/claude-code/issues/91805)** — *No repositories available in Claude Code repo picker despite GitHub App installed* — Corroborates #84581 from the UI side: GitHub App installs are not propagating to the cloud repo picker, suggesting an integration-layer rather than per-user issue.
5. **[#82624](https://github.com/anthropics/claude-code/issues/82624)** — *Web/CCR git stop hook: two false positives; the signature one prescribes an amend loop that can never converge* — The shipped `stop-hook-git-check.sh` tells agents to amend commits that are already correct, producing a non-terminating loop that rewrites history. High-severity for anyone running Claude Code on the web.
6. **[#93894](https://github.com/anthropics/claude-code/issues/93894)** — *Single code-review at high effort using Fable 5.1 blows through entire session budget at $100/month* — Fresh today. A single operation exhausting a session allocation is a hard blocker for team adoption and directly challenges the value proposition versus comparable tiers.
7. **[#79427](https://github.com/anthropics/claude-code/issues/79427)** — *Shared claude daemon leaks `ANTHROPIC_AUTH_TOKEN` into all later sessions* — Closed, but security-relevant: auth-bearing env vars from the first session to spawn the shared daemon were inherited by every subsequent session, causing silent wrong-account auth and billing.
8. **[#86280](https://github.com/anthropics/claude-code/issues/86280)** — *All Cowork projects lost after macOS update/reboot; `cleanupPeriodDays=30` silently deleted transcripts* — Compound data-loss report: session directories recreated empty, plus a default retention setting that deletes transcripts without explicit consent.
9. **[#88731](https://github.com/anthropics/claude-code/issues/88731)** — *Artifact tool absent in sessions spawned by `claude remote-control` (server mode)* — `--remote-control` works on the same machine and account, but server-mode spawns silently lack the Artifact tool — a confusing capability divergence in headless workflows.
10. **[#93124](https://github.com/anthropics/claude-code/issues/93124)** — *Claude in Chrome unusable from WSL; desktop app forces WSL runtime for WSL-path projects* — Pairs with enhancement request [#79655](https://github.com/anthropics/claude-code/issues/79655) (support Claude in Chrome on WSL, where native Linux Chrome via WSLg already works). WSL users currently have no supported path to browser tooling.

## 4. Key PR Progress

Only **3 pull requests** were updated in the last 24h, all listed below.

1. **[#93452](https://github.com/anthropics/claude-code/pull/93452)** *(CLOSED)* — `mods/diff`: aligns the `/diff` mod pane with the built-in diff panel — same code element for hunks, built-in close affordance, matching row spacing and empty-state placement, narrow-terminal resize handling, and serialized repository probes. Reduces visual drift between mods and core UI.
2. **[#93912](https://github.com/anthropics/claude-code/pull/93912)** *(CLOSED)* — Adds unit tests for diff, sec-default, and telemetry mods, typed against the plugin declarations. Tests execute in the mod's own runtime context (`$` and `on` hooks), runnable via `claude plugin test <dir>` — a meaningful step toward a stable plugin testing contract.
3. **[#61716](https://github.com/anthropics/claude-code/pull/61716)** *(OPEN)* — Docs contribution documenting the *false* "usage limit reached" error as a context-overflow misattribution: `/compact` fails with "Extra usage required for 1M context" and the error is mapped to the wrong user-facing message. Closes #50321; workaround is switching to a 1M-context model.

## 5. Hot Discussions

No discussion data was provided in this dataset; section omitted.

## 6. Feature Request Trends

- **Session continuity and handoff** — Portable, resumable sessions across machines/CLI instances (#11455). Persistent across many months with the highest 👍 count in the tracker.
- **Cowork state persistence** — Carry a chat's open tasks and progress panel state across sessions (#93910); paired with loud complaints about silent project/transcript deletion (#86280).
- **WSL and browser-tooling parity** — First-class Claude in Chrome support on WSL rather than a hard-disabled path (#79655, #93124).
- **Agent-view organization** — Grouping pinned sessions into a distinct section in FleetView rather than sorting them to the top of a flat list (#83013); reliable job lifecycle state that doesn't auto-mark sessions complete (#80119).
- **Cost transparency and gating** — Accurate usage-limit messaging (#77469, #74165, #87007) and reasonable session budgets at the $100/month tier (#93894).

## 7. Developer Pain Points

- **Usage-limit messaging is unreliable.** Multiple issues report reset times that are 3.5–4+ hours later than when access actually returns (#77469, #74165), and spend-limit messages shown when a 5-hour session limit is hit (#87007). This directly costs users working time.
- **Cloud session GitHub integration is broken end-to-end.** Session proxy points at a nonexistent tool (#84581), repo picker shows nothing despite correct GitHub App install (#91805), and the GitHub egress gate overrides "Full" network policy while swallowing Authorization headers (#86828).
- **Desktop/platform stability.** The Windows GPU-process crash that bricks the MSIX install (#80444) and intrusive console-window flashes on Windows session start (#78189) dominate the desktop experience.
- **Data loss and destructive defaults.** Empty-recreated Cowork session directories plus a 30-day transcript cleanup default that deletes user history without clear consent (#86280).
- **Silent failures in tooling.** Artifact tool missing only in server-mode remote sessions (#88731), MCP stdio servers deregistered after a single lazy reconnect while the respawned process leaks (#74329), and workspace trust dialogs failing to prompt and silently disabling gated features (#86857).
- **Aggressive stale triage.** A large share of issues updated in the last 24h are `CLOSED … stale`, including reproducible, `has-repro`-tagged bugs (#74329, #79427, #86857, #86994), which risks legitimate regressions being lost.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-13

## 1. Today's Highlights
No new Codex releases landed in the last 24h. The dominant community signal remains quota/usage-accounting pain, led by the 40-comment cross-report tracker #41220 and fresh reports of severe 5-hour drains. Separately, Windows desktop reliability and TUI/command-center polish continue to generate the highest volume of issue and PR activity.

## 2. Releases
No new releases in the last 24 hours.

## 3. Hot Issues
1. [#41220](https://github.com/openai/codex/issues/41220) — **[Meta] Abnormal Codex usage/quota depletion and usage-accounting inconsistencies**  
   Open bug/rate-limits tracker consolidating many reports of credits or subscription quota depleting faster than expected. Highest engagement in the set: 40 comments, 14 👍.

2. [#34349](https://github.com/openai/codex/issues/34349) — **Allow users to completely disable Pets and remove the “Show Pet” menu entry**  
   Still the top-voted UX request here: 11 comments, 48 👍. Users want full control over optional app surface area.

3. [#41695](https://github.com/openai/codex/issues/41695) — **iPad App freezes constantly accessing remote Codex sessions**  
   Remote sessions are a key mobile workflow, but repeated freezes make iPad use unreliable. 8 comments.

4. [#31317](https://github.com/openai/codex/issues/31317) — **`/resume` picker does not show CWD filter with `--remote ... --cd`**  
   A focused CLI/TUI correctness bug affecting remote users’ ability to find the right session. 8 comments, 2 👍.

5. [#43938](https://github.com/openai/codex/issues/43938) — **Codex tool IPC decoding failure**  
   Enterprise users report every tool invocation failing with a code-mode decode error. This blocks core agent workflows. 6 comments.

6. [#36946](https://github.com/openai/codex/issues/36946) — **macOS Remote Control cannot be enabled**  
   Remote Control adoption blocker on macOS, with 6 comments and 8 👍.

7. [#44444](https://github.com/openai/codex/issues/44444) — **codex-cli 0.154.0: cursor jumps within input line when Astra is picked**  
   TUI regression tied to model selection; annoying but highly visible for interactive users. 6 comments, 5 👍.

8. [#45073](https://github.com/openai/codex/issues/45073) — **Severe 5-hour usage drain: ~86% consumed in ~26 minutes with only 2 prompts**  
   Fresh rate-limit report from a ChatGPT Plus user on Windows and `gpt-5.6-sol medium fast`. Adds urgency to the quota tracker.

9. [#45132](https://github.com/openai/codex/issues/45132) — **app-server clients cannot use Luna Reserve**  
   `supportsLunaReserve` exists but lacks an accept/redeem action, leaving app-server clients unable to use a rate-limit recovery path. 2 comments.

10. [#45075](https://github.com/openai/codex/issues/45075) — **Windows desktop reloads during active task; running turn is interrupted**  
    A reload during an active turn turns the run into a retry button, risking lost context and interrupted work. 2 comments.

## 4. Key PR Progress
1. [#45137](https://github.com/openai/codex/pull/45137) — **Remove Astra sparkle animation from the TUI composer**  
   Removes animated stars and related input/terminal-focus/model-selection hooks. TUI polish and reduced visual noise.

2. [#45135](https://github.com/openai/codex/pull/45135) — **Preview streaming prose before a newline arrives in the TUI**  
   Fixes long single-line responses appearing invisible until a newline or stream completion.

3. [#45124](https://github.com/openai/codex/pull/45124) — **Add a feature flag for asynchronous user messages**  
   Adds disabled-by-default `send_message_to_user_async`, keeps the tool root-agent-only, and excludes subagents.

4. [#45094](https://github.com/openai/codex/pull/45094) — **Estimate history tokens from content instead of serialized envelopes**  
   Avoids inflated token estimates from message IDs, metadata, and JSON escaping.

5. [#45090](https://github.com/openai/codex/pull/45090) — **Preserve conversation context and separate next actions in recaps**  
   Improves recap quality by giving more room for completed progress, caveats, and corrections.

6. [#45089](https://github.com/openai/codex/pull/45089) — **Delay automatic recaps and compact their TUI layout**  
   Moves automatic recap delay from 3 to 30 minutes and introduces a more compact `↳ Recap:` layout.

7. [#44970](https://github.com/openai/codex/pull/44970) — **Show task tokens and usage estimates in the agent command center**  
   Displays input/output token counts plus estimated credits and USD cost, directly addressing usage-visibility demand.

8. [#44957](https://github.com/openai/codex/pull/44957) — **Add model grouping to the agent command center**  
   Lets users cycle task grouping through project, status, and model with `Ctrl+S`.

9. [#31471](https://github.com/openai/codex/pull/31471) — **[faster-connectors] Extract apps cache logic into ConnectorRuntimeManager**  
   Open PR scoping connector cache by account, ChatGPT user, workspace-account mode, and Codex home, with stale-context discard.

10. [#25383](https://github.com/openai/codex/pull/25383) — **Add app-server account session lifecycle**  
    Closed PR adding multi-account profile switching for Desktop via `accountSession/login/start`, `add`, `list`, `switch`, and `logout`.

## 5. Hot Discussions

### Show and tell
- [#44153](https://github.com/openai/codex/discussions/44153) — **isitdone: Stop hook that blocks “done” until tests/typecheck/lint pass**  
  A Codex CLI Stop hook that runs repo checks on the exact working tree and blocks completion until they pass.

- [#45128](https://github.com/openai/codex/discussions/45128) — **VibeFuse — free Windows canvas for running Codex CLI as live widgets**  
  Spawns Codex CLI, Claude Code, Gemini CLI, Cursor, and Qwen as draggable widgets.

- [#44618](https://github.com/openai/codex/discussions/44618) — **Wayfinder: trace Codex work as a visual voyage map**  
  Local-first desktop app that turns AI-assisted project work into a visual history.

- [#44291](https://github.com/openai/codex/discussions/44291) — **Brain Scanner: see what calls a shared helper before Codex changes it**  
  Gives coding agents and humans a project map for callers/dependencies before edits.

### General / Feedback
- [#45062](https://github.com/openai/codex/discussions/45062) — **thx you've listened**  
  Positive feedback referencing earlier Android/iOS suggestions.

- [#45013](https://github.com/openai/codex/discussions/45013) — **Codex review DONT subscribe wasting money**  
  Negative rating focused on usage limits rather than code quality; reflects ongoing quota frustration.

## 6. Feature Request Trends
- **Usage/quota transparency and control**: usage-accounting fixes, Luna Reserve redemption, token/credit/cost estimates, and severe drain reports dominate.
- **Remote and session reliability**: macOS Remote Control enablement, iPad remote freezes, Windows-to-Windows remote control, session storage dashboards, backups, bulk cleanup, and resume pagination.
- **Windows desktop robustness**: setup/sandbox failures, integration entries disappearing, runtime components missing, and active-task interruptions.
- **TUI/UX polish**: disabling Pets, CWD-aware resume, cursor/input fixes, streaming prose previews, recap compaction, and clipboard correctness.
- **Tool/app-server protocol reliability**: IPC decoding failures, missing fields, command runner failures, and browser/Edge discovery errors.
- **Model quality and performance**: Astra reasoning degradation, slow app behavior, and unsupported reasoning-mode switching.
- **Multi-account and connector infrastructure**: app-server account lifecycle, connector runtime cache scoping, and asynchronous user-message support.

## 7. Developer Pain Points
- **Quota depletion and inconsistent accounting** remain the sharpest pain: [#41220](https://github.com/openai/codex/issues/41220), [#45073](https://github.com/openai/codex/issues/45073), [#45132](https://github.com/openai/codex/issues/45132).
- **Windows desktop setup, sandbox, and runtime failures** are recurrent: [#40550](https://github.com/openai/codex/issues/40550), [#39245](https://github.com/openai/codex/issues/39245), [#45134](https://github.com/openai/codex/issues/45134), [#45138](https://github.com/openai/codex/issues/45138), [#45075](https://github.com/openai/codex/issues/45075).
- **Remote and mobile session reliability** is a cross-platform blocker: [#41695](https://github.com/openai/codex/issues/41695), [#36946](https://github.com/openai/codex/issues/36946), [#34028](https://github.com/openai/codex/issues/34028).
- **TUI regressions and workflow friction** keep appearing: [#44444](https://github.com/openai/codex/issues/44444), [#31317](https://github.com/openai/codex/issues/31317), [#44956](https://github.com/openai/codex/issues/44956), [#45068](https://github.com/openai/codex/issues/45068).
- **Tool-call and app-server protocol errors** break core agent execution: [#43938](https://github.com/openai/codex/issues/43938), [#44379](https://github.com/openai/codex/issues/44379), [#45139](https://github.com/openai/codex/issues/45139).
- **Session storage and resume reliability** lack first-class management: [#38838](https://github.com/openai/codex/issues/38838), [#45126](https://github.com/openai/codex/issues/45126).
- **Model quality/performance regressions** are being reported more often: [#45095](https://github.com/openai/codex/issues/45095), [#45097](https://github.com/openai/codex/issues/45097), [#41730](https://github.com/openai/codex/issues/41730).
- **Linux desktop startup fragility** appears in GUI launch failures: [#45117](https://github.com/openai/codex/issues/45117).
- **Browser/computer-use integration failures** remain unresolved: [#44169](https://github.com/openai/codex/issues/44169).
- **Plugin/skills state correctness** is a niche but concerning issue: [#45130](https://github.com/openai/codex/issues/45130).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-13

## 1. Today's Highlights

The community's attention is split between security hardening and agent reliability. The latest nightly (`v0.61.0-nightly.20260912.g9c1b0a610`) lands a core fix against indirect prompt injection via build files plus a sandbox filesystem-boundary hardening; meanwhile a cluster of P1/P2 PRs target shell-approval loops, MCP policy enforcement, and terminal flicker. Issue activity remains dominated by subagent misbehavior — hanging generalists, false `GOAL` success reports, and Auto Memory logging/privacy gaps.

## 2. Releases

**v0.61.0-nightly.20260912.g9c1b0a610** — [PR #29291](https://github.com/google-gemini/gemini-cli/pull/29291)
- `fix(core)`: Prevents indirect prompt injection via build file modifications and untrusted flags ([#29250](https://github.com/google-gemini/gemini-cli/pull/29250)).
- `fix(sandbox)`: Hardens filesystem boundaries and isolates runtime state — pairs with the sandbox PR [#29214](https://github.com/google-gemini/gemini-cli/pull/29214), which replaces host-directory mounts with sanitized config files and standardizes realpath resolution.

## 3. Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent recovery after MAX_TURNS reported as GOAL success** (P1, 13 comments, 👍2). `codebase_investigator` claims `status: "success"` / `Termination Reason: "GOAL"` despite having hit its turn limit before doing any analysis. This is the most-discussed item of the day and a correctness/honesty problem for automated workflows.
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs** (P1, 8 comments, 👍8). Highest community reaction in the set: simple folder creation hangs indefinitely when work is deferred to the generalist agent; users work around it by forbidding subagent delegation.
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-dependency OS sandboxing + post-execution intent routing** (P2, 9 comments). Proposes letting Gemini 3 use its native bash affinity (grep/cat/sed/awk) safely, a recurring architectural theme in the tracker.
4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — AST-aware file reads, search, and codebase mapping** (EPIC, 7 comments). Tracks whether AST tooling reduces misaligned reads, turn counts, and token noise — echoed by [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) investigating `tilth`/`glyph`.
5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini does not use skills and sub-agents enough** (P2, 6 comments). Anecdotal but widely shared: even with well-described `gradle`/`git` skills, the model rarely invokes them unprompted — a discovery/routing gap rather than a capability gap.
6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Deterministic redaction and reduced Auto Memory logging** (P2 security, 5 comments). Transcript content reaches the model before the redaction prompt applies; related memory-quality bugs at [#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26516](https://github.com/google-gemini/gemini-cli/issues/26516).
7. **[#29288](https://github.com/google-gemini/gemini-cli/issues/29288) — ACP session ID mismatch breaks `session/load` in Zed** (P1, 4 comments). Client and agent generate different session IDs, so sessions never resume under `--experimental-acp` on Windows. Fresh, high-impact for editor integrations.
8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell execution stuck at "Waiting input" after completion** (P1, 4 comments, 👍3). Simple commands finish but the CLI stays in an active/prompting state — one of several hang-class bugs.
9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails on Wayland** (P1, 4 comments). Reports `GOAL` termination despite failure; browser-agent resilience is tracked more broadly in [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) and [#22267](https://github.com/google-gemini/gemini-cli/issues/22267) (settings.json overrides ignored).
10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — Agent should stop/discourage destructive behavior** (P2, 3 comments). The model occasionally reaches for `git reset`/`--force` when safer alternatives exist — safety-adjacent and likely to gain visibility.

Worth watching: [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) (400 error above ~128 tools), [#21335](https://github.com/google-gemini/gemini-cli/issues/21335) (`/compress` not persisted across resume, 👍2), [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) (symlinked agent files ignored), [#21763](https://github.com/google-gemini/gemini-cli/issues/21763) (bug reports omit subagent context).

## 4. Key PR Progress

1. **[#29292](https://github.com/google-gemini/gemini-cli/pull/29292) — `fix(checkpoint)`: validate `history` is an array** (P2). Prevents `loadCheckpoint()` from accepting corrupted JSON (`{"history": null}`) and crashing `/resume`. Closes [#29194](https://github.com/google-gemini/gemini-cli/issues/29194).
2. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214) — `fix(sandbox)`: harden filesystem boundaries** (CLOSED, size/xl). Isolates sandbox runtime state from host config dirs and sanitizes mounts — a substantive security-landing paired with the nightly.
3. **[#29294](https://github.com/google-gemini/gemini-cli/pull/29294) — `fix(cli)`: prevent terminal flickering from stdout contention** (P2). Addresses aggressive flicker/tearing while typing during background command execution; closes [#29295](https://github.com/google-gemini/gemini-cli/issues/29295).
4. **[#29201](https://github.com/google-gemini/gemini-cli/pull/29201) — `fix(cli)`: preserve approved shell commands across confirmation retries** (P1). Fixes an infinite permission loop with multiple `!{...}` injections in TOML custom commands; fixes [#29197](https://github.com/google-gemini/gemini-cli/issues/29197).
5. **[#29203](https://github.com/google-gemini/gemini-cli/pull/29203) — `fix(security)`: strip shell wrappers carrying extra flags** (P2 enterprise). Extends `stripShellWrapper` to tolerate short flag clusters so the policy engine actually re-inspects inner commands — a real bypass fix.
6. **[#29200](https://github.com/google-gemini/gemini-cli/pull/29200) — `fix(core)`: enforce MCP policy consistently at runtime** (P2). Case/whitespace-normalized server-name matching and fail-closed behavior for an explicitly empty `mcp.allowed` list.
7. **[#29217](https://github.com/google-gemini/gemini-cli/pull/29217) — `fix(config)`: don't rewrite explicit `gemini-2.5-flash`** (P1/P2). `isFlashModel()`'s broad `endsWith('flash')` match was silently auto-upgrading a pinned model — a notable user-trust fix.
8. **[#29211](https://github.com/google-gemini/gemini-cli/pull/29211) — `fix(cli)`: stop scheduling state updates inside a state updater** (P2). Nested `setState` in `useInputHistoryStore.addInput()` violates React's purity contract; likely fix for input-history glitches.
9. **[#29208](https://github.com/google-gemini/gemini-cli/pull/29208) — `fix(core)`: fall back to empty on malformed `agents.json`** (P2). Guards against `TypeError` crashes from interrupted saves or sync conflicts; closes [#29207](https://github.com/google-gemini/gemini-cli/issues/29207).
10. **[#29205](https://github.com/google-gemini/gemini-cli/pull/29205) — `fix(cli)`: submit MCP prompt text without JSON encoding** (P2). Preserves embedded quotes/newlines exactly as returned by the MCP server.

Also notable: [#29118](https://github.com/google-gemini/gemini-cli/pull/29118) (CLOSED — only strip trailing `.git` suffix, preserving repos like `blog.github.io`), [#29287](https://github.com/google-gemini/gemini-cli/pull/29287) (CLOSED — map `--yolo` to an `allowedTools: ["*"]` policy, retiring `ApprovalMode.YOLO`), and [#29230](https://github.com/google-gemini/gemini-cli/pull/29230) (docs: fix seven pages of dead anchors).

## 5. Hot Discussions

No discussion data was provided for this window, so this section is omitted.

## 6. Feature Request Trends

- **AST-aware code intelligence**: [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) and [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) push for AST-based reads/search/mapping plus `tilth`- or `glyph`-style CLI tools to cut token bloat and misaligned reads.
- **Token-frugal retrieval**: [#19561](https://github.com/google-gemini/gemini-cli/issues/19561) proposes a "Tactful Extraction" hierarchy (grep → surgical read) against a ~36.6k-token/turn baseline.
- **Safer agent autonomy**: [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) (OS sandboxing for bash affinity) and [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) (discourage destructive git/DB operations).
- **Better subagent observability & sharing**: [#22598](https://github.com/google-gemini/gemini-cli/issues/22598) (`/chat share` for subagent trajectories), [#21763](https://github.com/google-gemini/gemini-cli/issues/21763) (subagent context in `/bug` reports), [#20195](https://github.com/google-gemini/gemini-cli/issues/20195) (subagent sprint tracking).
- **Agent self-awareness**: [#21432](https://github.com/google-gemini/gemini-cli/issues/21432) wants accurate CLI flags, hotkeys, and self-execution guidance.
- **Task-tracker tooling**: [#21000](https://github.com/google-gemini/gemini-cli/issues/21000) experiments with native file tools for tracker maintenance.
- **Memory system quality**: [#26516](https://github.com/google-gemini/gemini-cli/issues/26516), [#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) form a coherent Auto Memory hardening theme.

## 7. Developer Pain Points

- **Hangs and false success signals**: generalist agent hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell stuck on "Waiting input" ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), vite interactive prompt deadlock ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)), and MAX_TURNS misreported as `GOAL` success ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)).
- **Session persistence failures**: ACP session-ID mismatch breaks `session/load` in Zed ([#29288](https://github.com/google-gemini/gemini-cli/issues/29288)); `/compress` results are lost on resume ([#21335](https://github.com/google-gemini/gemini-cli/issues/21335)).
- **Permission and policy loops**: approved shell commands re-prompting forever ([#29201](https://github.com/google-gemini/gemini-cli/pull/29201)), shell-wrapper policy bypasses ([#29203](https://github.com/google-gemini/gemini-cli/pull/29203)), inconsistent MCP allowlist semantics ([#29200](https://github.com/google-gemini/gemini-cli/pull/29200)).
- **Terminal UX**: flicker/tearing under concurrent stdout ([#29294](https://github.com/google-gemini/gemini-cli/pull/29294)) and flicker on resize ([#21924](https://github.com/google-gemini/gemini-cli/issues/21924)).
- **Workspace pollution and safety**: tmp scripts scattered across directories ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)) and force/reset-style destructive commands ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).
- **Config and scaling limits**: >128 tools triggering 400 errors ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)), pinned models silently rewritten ([#29217](https://github.com/google-gemini/gemini-cli/pull/29217)), browser agent ignoring `settings.json` ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), symlinked agent files ignored ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)), and Wayland browser-agent failure ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)).
- **Trust in agent reporting**: bug reports lacking subagent context ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)) compounds the broader theme that agents under-report what they actually did.

Overall signal: the maintainers are shipping security and reliability fixes at a steady nightly cadence, but the community's loudest asks remain **subagent correctness/observability**, **hang elimination**, and **constraining agent autonomy safely**.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI — Community Digest
**Date:** 2026-09-13 · **Source:** [github.com/github/copilot-cli](https://github.com/github/copilot-cli)

---

## 1. Today's Highlights

No new releases landed in the last 24 hours, but the issue tracker stayed active with 8 updated issues and 3 PRs. The most consequential activity centers on **runtime stability** — a long-running Linux JavaScript heap OOM (#4725) and a session-blocking WebSocket/CAPI 400 error (#2147) that closed after 7 comments. On the roadmap side, contributors pushed two clear feature directions: **session-scoped directory permissions** (`/remove-dir`, #4830) and **richer observability** for multi-model routing via OpenTelemetry (#4825).

---

## 2. Releases

No new releases published in the last 24 hours. *(Latest reference version in the wild: v1.0.83, cited in #4829.)*

---

## 3. Hot Issues

> Note: only 8 issues were updated in the last 24h, so all are covered below rather than the requested 10.

**1. [#4725 — [area:platform-linux] Frequent JavaScript heap out of memory](https://github.com/github/copilot-cli/issues/4725)** `OPEN` · 4 comments · 👍 1
The highest-severity open bug. The CLI crashes every few minutes with V8 Mark-Compact failures at ~3.9 GB heap, indicating the process is exhausting memory rather than leaking gracefully. Linux-specific tagging suggests a platform-dependent retention path. Only 4 comments so far, but a crash loop is a hard blocker for anyone running long autonomous sessions.

**2. [#2147 — CAIP 400: input item ID does not belong to this connection](https://github.com/github/copilot-cli/issues/2147)** `CLOSED` · 7 comments · 👍 1
The most-discussed item in the window. A WebSocket-layer `CAPIError: 400` — "input item ID does not belong to this connection" — surfaced on `gpt-5.4 (xhigh)`, pointing at conversation-state desynchronization between client and backend. Five months from open (2026-03-18) to close, but the closure is the notable signal that connection-state handling was fixed.

**3. [#4824 — [triage] ctrl-t enqueue prompt doesn't work](https://github.com/github/copilot-cli/issues/4824)** `OPEN` · 1 comment
Prompts enqueued via `Ctrl-T` never fire after the prior turn finishes; the UI spins on "Working" indefinitely. This effectively makes the queue feature a no-op and breaks multi-step batched workflows. Reported by mziller with no 👍 yet, but it's the kind of UX dead-end that generates duplicate reports fast.

**4. [#4759 — [area:mcp] Copilot CLI should send MCP cancellation requests](https://github.com/github/copilot-cli/issues/4759)** `CLOSED` · 1 comment
The CLI failed to emit an MCP cancellation when a tool call was waiting on a URL-mode elicitation and the user cancelled the auth browser flow. Correctness issue at the protocol layer: servers kept working on abandoned requests. Closed, suggesting alignment with the [MCP 2026-07-28 cancellation spec](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/cancellation).

**5. [#4829 — Subagents fail prompt caching and compound token consumption](https://github.com/github/copilot-cli/issues/4829)** `OPEN` · 0 comments
Filed against v1.0.83 / Windows 11 / Gemini 3.8 Flash. When a subagent (e.g. via the `task` tool) runs hundreds of tool calls in one turn, prompt caching breaks down and token usage compounds. This is a cost-and-latency bug with direct billing impact — the most consequential engineering report in the batch.

**6. [#4831 — One pasted image and claude-opus-5 won't look at any more images](https://github.com/github/copilot-cli/issues/4831)** `OPEN` · 0 comments
After a single pasted screenshot, every subsequent `view` call returns "You've reached the maximum number of images you can view (1)". The CLI logs "Removed 2 images from the model," so the eviction logic appears to be miscounting or over-evicting. Blocks screenshot-driven debugging workflows entirely.

**7. [#4830 — [triage] Add /remove-dir command to revoke directory access](https://github.com/github/copilot-cli/issues/4830)** `OPEN` · 0 comments
`/add-dir` and `/list-dirs` exist, but there's no inverse. Users must restart the session to shrink the workspace trust boundary — a security-relevant gap for anyone who grants access liberally and wants to claw it back mid-session. Straightforward, well-scoped feature ask.

**8. [#4825 — HydraFusion: emit per-phase model, verdict and credit attributes to OpenTelemetry](https://github.com/github/copilot-cli/issues/4825)** `OPEN` · 0 comments
Multi-model turns produce one answer and one credit figure externally, while `~/.copilot/session-state/<id>/events.jsonl` holds the full routing detail. The request is to surface per-phase model, verdict, and credit attributes through OTel. Zero comments, but it reflects a maturing need for cost attribution and routing transparency.

---

## 4. Key PR Progress

> Note: only 3 PRs were updated in the last 24h, so all are covered below rather than the requested 10.

**1. [#4808 — Pin GitHub Actions to commit SHAs](https://github.com/github/copilot-cli/pull/4808)** `CLOSED` · github-security-bot
Supply-chain hardening from the project's own security automation. 4 files changed, 3 `uses:` references pinned to immutable SHAs, 0 warnings, 0 errors. Merged/closed on 2026-09-12 — a clean win for reproducible, tamper-resistant CI.

**2. [#4828 — build(deps): bump actions/github-script from 7.1.0 to 9.0.0](https://github.com/github/copilot-cli/pull/4828)** `OPEN` · dependabot[bot]
A two-major-version jump in the workflow scripting action. Worth review attention since v8/v9 typically carry Node runtime and API surface changes that can silently break automation scripts.

**3. [#4827 — build(deps): bump actions/stale from 9.1.0 to 11.0.0](https://github.com/github/copilot-cli/pull/4827)** `OPEN` · dependabot[bot]
Two majors on the issue/PR staleness automation. Low-risk functionally, but it governs how quickly community reports get auto-closed — relevant given the volume of `[triage]` issues flowing in.

---

## 5. Hot Discussions

No Discussions data was provided for this reporting window, so this section is omitted.

---

## 6. Feature Request Trends

Distilled from the issues updated in the last 24h:

- **Session-scoped permission control** — `/remove-dir` (#4830) as the mirror of `/add-dir`. Users want revocable, runtime-adjustable trust boundaries rather than restart-to-reset.
- **Observability and cost attribution** — per-phase model/verdict/credit attributes to OpenTelemetry (#4825), plus the implicit need to explain token consumption in subagent runs (#4829).
- **Protocol correctness for MCP** — proper cancellation semantics during long-running elicitations (#4759). Signals growing enterprise/agent-framework adoption where protocol hygiene matters.
- **Input handling correctness** — reliable multimodal input gating (#4831) and a working prompt queue (#4824) as table-stakes ergonomics.

---

## 7. Developer Pain Points

- **Unstable long-running sessions.** Linux heap OOM crashes every few minutes (#4725) and connection-state desync producing hard 400s (#2147) both break the "let the agent run" model that makes a CLI attractive.
- **Silent feature failures.** `Ctrl-T` enqueue looks accepted but never executes (#4824); images are accepted then silently evicted (#4831). Both erode trust because the UI gives no actionable failure signal.
- **Unpredictable and compounding cost.** Broken prompt caching in long subagent tool-call sequences (#4829) directly inflates token spend with no visibility into why.
- **No way to tighten access mid-session.** The absence of `/remove-dir` (#4830) forces a full session restart to reduce blast radius — friction that discourages using `/add-dir` at all.
- **Opaque multi-model routing.** Routing decisions exist on disk but not in telemetry (#4825), leaving operators unable to audit or attribute multi-model turns.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-13

*Source: [github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)*

## 1. Today's Highlights

No new releases landed in the last 24 hours, but activity was intense: the long-running **clipboard copy/paste failure cluster** keeps dominating the issue tracker, with the top issue now at 131 comments and 123 👍. Meanwhile, maintainers and contributors pushed a large batch of V2/TUI fix PRs covering session creation errors, slash-skill argument loss, streamed markdown finalization, and desktop sidecar crash recovery. Newly filed issues (#48715, #48728, #48675) show growing concern around provider authentication, headless stream stalls, and desktop stability under memory pressure.

## 2. Releases

No releases published in the last 24 hours.

## 3. Hot Issues

1. **[#4283 — Copy To Clipboard is not working](https://github.com/anomalyco/opencode/issues/4283)** *(OPEN, 131 comments, 123 👍)* — The single most-discussed issue in the repo. Selected response text never reaches the clipboard across operating systems and OpenCode 1.0.62. The comment volume and reaction count make this the community's clearest UX priority.

2. **[#13984 — Can not copy and paste in opencode CLI](https://github.com/anomalyco/opencode/issues/13984)** *(OPEN, 57 comments, 32 👍)* — The UI confirms "copied to clipboard," but `Ctrl+V` pastes nothing. This corroborates that the bug is in the clipboard bridge itself, not the notification layer.

3. **[#41470 — "Copied to clipboard" doesn't work](https://github.com/anomalyco/opencode/issues/41470)** *(OPEN, 22 comments)* — Reproduced specifically inside VS Code Server / Docker (v1.18.14), pointing to remote-container clipboard forwarding as a distinct failure mode.

4. **[#26459 — Clipboard copy fails in web-based VS Code terminals](https://github.com/anomalyco/opencode/issues/26459)** *(OPEN, 14 comments)* — Covers code-server, GitHub Codespaces, VS Code Remote SSH, and Gitpod. Cloud/browser-based development is a major use case, so this is high-leverage.

5. **[#26602 — Desktop hits 5-minute Headers Timeout Error with slow local providers](https://github.com/anomalyco/opencode/issues/26602)** *(OPEN, 12 comments)* — Local OpenAI-compatible providers are aborted at exactly 5 minutes even when `"timeout": false` is configured. A configuration contract that isn't honored — a trust problem for local-model users.

6. **[#36761 — [2.0] Expose valid subagent IDs to the model](https://github.com/anomalyco/opencode/issues/36761)** *(OPEN, 7 comments)* — The V2 `subagent` tool gives models no discovery path, so they hallucinate IDs and delegation fails at execution time. Core to making multi-agent workflows reliable.

7. **[#32985 — OpenCode broken inside GNU Screen](https://github.com/anomalyco/opencode/issues/32985)** *(OPEN, 5 comments, 3 👍)* — No truecolor, broken copy/paste, no mouse support on Ubuntu 24.04 + Screen 4.09. Terminal-compatibility breadth remains a recurring theme.

8. **[#39628 — [FEATURE] Remote approval of permission requests from mobile/second device](https://github.com/anomalyco/opencode/issues/39628)** *(OPEN, 4 comments)* — Long-running sessions block on file-edit/bash/MCP permission prompts. Remote approval would unlock genuinely unattended agent runs.

9. **[#48661 — [FEATURE] Desktop: double-click Review/Context tab to maximize/restore](https://github.com/anomalyco/opencode/issues/48661)** *(OPEN, 4 comments)* — JetBrains-style pane management, recreated after auto-close. Small but symptomatic of desktop polish demand.

10. **[#48715 — Desktop sidecar crashes repeatedly (0xC0000409) under memory pressure](https://github.com/anomalyco/opencode/issues/48715)** *(OPEN, 1 comment)* — Windows 11, 1.18.30: repeated V8 fast-fail crashes plus image-count errors that permanently brick sessions. A contributor PR (#48716) already targets it.

11. **[#48675 — "opencode run" zero-chunk provider stream stall never surfaces](https://github.com/anomalyco/opencode/issues/48675)** *(OPEN, 2 comments)* — Three parallel headless workers stalled simultaneously with no timeout, retry, or non-zero exit. Silent failure is the worst failure mode for CI automation.

12. **[#48728 — NVIDIA API key not working (needs:compliance)](https://github.com/anomalyco/opencode/issues/48728)** *(OPEN, 3 comments)* — Provider manifest appears correct but authentication fails, adding to a same-day cluster of provider/quota complaints (#48687 DeepSeek limits, #48681 subscription lockout, #48711 rate limit).

## 4. Key PR Progress

1. **[#48734 — fix(server): surface session creation errors](https://github.com/anomalyco/opencode/pull/48734)** — Closes #39775. A DB write failure during V2 session creation previously surfaced as an empty 500 with a generic client-side message; now errors propagate meaningfully.

2. **[#48733 — fix(tui): preserve slash skill arguments](https://github.com/anomalyco/opencode/pull/48733)** — Closes #48720. Trailing text after a slash-invoked skill was silently dropped; now it is submitted as a normal prompt with the skill attached.

3. **[#48732 — fix(tui): finalize streamed markdown responses](https://github.com/anomalyco/opencode/pull/48732)** — Closes #48714. Assistant messages were left in OpenTUI's streaming render mode after completion, corrupting final layout.

4. **[#48716 — fix(desktop): respawn crashed sidecar; classify image-count errors as overflow](https://github.com/anomalyco/opencode/pull/48716)** — Closes #48715. Directly addresses the Windows 0xC0000409 crash loop and the session-bricking "too many images" state.

5. **[#48638 — fix(core): eliminate durable event write amplification from turn diffs](https://github.com/anomalyco/opencode/pull/48638)** — Closes #48641. `SessionSummary.summarize` was attaching full git patch text to user messages, causing durable write amplification — relevant to the earlier SSE memory-growth report (#31087).

6. **[#48730 — fix(core): keep locations with running terminals out of eviction](https://github.com/anomalyco/opencode/pull/48730)** — Closes #48691. `LocationActivity` evicts 60 minutes after the last *session* event, but terminals emit none — so active terminal sessions were being evicted out from under users.

7. **[#48729 — fix(session): keep todo list current for non-Claude models](https://github.com/anomalyco/opencode/pull/48729)** — Closes #27560. Models outside the Anthropic prompt path never received todo-update instructions, leaving items stuck `in_progress` after work completed.

8. **[#46690 — feat(plugin): expose session forms, session list, and global event stream](https://github.com/anomalyco/opencode/pull/46690)** — Substantially widens the V2 plugin API, enabling integrations such as a Telegram bot to manage sessions and subscribe to global events.

9. **[#48724 — fix(desktop): migrate mac beta to stable installer](https://github.com/anomalyco/opencode/pull/48724)** — Routes macOS Beta users to the signed Stable DMG instead of asking Squirrel.Mac to replace a differently-identified bundle; covers updater state, dialogs, crash recovery, and titlebar.

10. **[#46165 — fix(app): keep archived sessions open in their tabs](https://github.com/anomalyco/opencode/pull/46165)** — Closes #35058. Archiving previously behaved as a navigation command and forcibly closed tabs; this decouples archival state from navigation.

*Also notable:* [#48727](https://github.com/anomalyco/opencode/pull/48727) (tab layout moved to General settings, contributed by the opencode agent bot), [#48735](https://github.com/anomalyco/opencode/pull/48735) (session title placeholder localization), [#43298](https://github.com/anomalyco/opencode/pull/43298) (submit button no longer occluded on narrow viewports), and [#48712](https://github.com/anomalyco/opencode/pull/48712) (LaTeX math rendering via kitty/sixel graphics, since closed).

## 5. Hot Discussions

No discussion data was provided for this period, so this section is omitted.

## 6. Feature Request Trends

- **Remote and async operation** — Mobile/second-device approval of permission prompts ([#39628](https://github.com/anomalyco/opencode/issues/39628)) reflects demand for unattended, long-running agent sessions that don't block on human input.
- **Desktop pane and layout ergonomics** — JetBrains-style maximize/restore ([#48661](https://github.com/anomalyco/opencode/issues/48661)), tab layout moved out of Experimental ([#48727](https://github.com/anomalyco/opencode/pull/48727)), and prompt-submit visibility on narrow viewports ([#43298](https://github.com/anomalyco/opencode/pull/43298)).
- **Session lifecycle controls** — An interactive session selector via bare `-s` ([#48718](https://github.com/anomalyco/opencode/issues/48718)), renaming from the context menu ([#46915](https://github.com/anomalyco/opencode/pull/46915)), and archive-without-closing ([#46165](https://github.com/anomalyco/opencode/pull/46165)).
- **Internationalization** — TUI i18n work ([#48731](https://github.com/anomalyco/opencode/pull/48731)), Persian README ([#47783](https://github.com/anomalyco/opencode/pull/47783)), and localized session labels ([#48735](https://github.com/anomalyco/opencode/pull/48735)).
- **Plugin ecosystem expansion** — Session forms, session lists, and global event streams ([#46690](https://github.com/anomalyco/opencode/pull/46690)), plus steady ecosystem directory contributions ([#48722](https://github.com/anomalyco/opencode/pull/48722), [#48726](https://github.com/anomalyco/opencode/pull/48726)).
- **Terminal rendering fidelity** — LaTeX/math block rendering ([#48712](https://github.com/anomalyco/opencode/pull/48712)), GNU Screen truecolor support ([#32985](https://github.com/anomalyco/opencode/issues/32985)), and copy preserving logical text rather than rendered layout ([#47165](https://github.com/anomalyco/opencode/issues/47165)).

## 7. Developer Pain Points

1. **Clipboard reliability is the #1 unresolved frustration.** Six of the top issues today (#4283, #13984, #41470, #26459, #35258, #39588, plus #32985 and #47165) are clipboard-related across TUI, VS Code extension, web VS Code, Codespaces, SSH, GNU Screen, Windows terminals, and macOS. The recurring pattern — a success notification followed by an empty paste buffer — erodes trust in every copy affordance.

2. **Silent stream and session failures.** Zero-chunk provider stalls with no timeout or non-zero exit ([#48675](https://github.com/anomalyco/opencode/issues/48675)), SSE streams that never resume after tab restore ([#47258](https://github.com/anomalyco/opencode/issues/47258)), unbounded SSE memory growth ([#31087](https://github.com/anomalyco/opencode/issues/31087), closed), and subagent stream errors surfacing as empty `<task_result>` ([#38866](https://github.com/anomalyco/opencode/issues/38866)) all mean failures are easy to miss until they're expensive.

3. **Provider auth and quota friction.** NVIDIA API keys failing to authenticate ([#48728](https://github.com/anomalyco/opencode/issues/48728)), DeepSeek 4.1 Flash quota accounting anomalies ([#48687](https://github.com/anomalyco/opencode/issues/48687)), “subscribed but locked out” reports ([#48681](https://github.com/anomalyco/opencode/issues/48681)), opaque rate-limit errors ([#48711](https://github.com/anomalyco/opencode/issues/48711)), and `ProviderModelNotFoundError` echoing the same invalid string ([#48721](https://github.com/anomalyco/opencode/issues/48721)).

4. **Configured timeouts are not honored.** The 5-minute Headers Timeout Error on Desktop despite `"timeout": false` ([#26602](https://github.com/anomalyco/opencode/issues/26602)) undermines confidence in local/self-hosted provider setups.

5. **V2 regressions around input and delegation.** Ctrl+C discarding a composed prompt draft with no recovery ([#48636](https://github.com/anomalyco/opencode/issues/48636), closed), slash-skill trailing arguments vanishing ([#48720](https://github.com/anomalyco/opencode/issues/48720)), and subagent IDs not being discoverable by the model ([#36761](https://github.com/anomalyco/opencode/issues/36761)).

6. **Desktop stability under load.** Sidecar crashes with 0xC0000409, image-count errors that permanently brick sessions ([#48715](https://github.com/anomalyco/opencode/issues/48715)), and MCP server process explosion at startup ([#43845](https://github.com/anomalyco/opencode/issues/43845)) indicate resource-management gaps in the V2 background service.

7. **Terminal/environment compatibility is still broad.** GNU Screen, macOS Terminal over SSH, Windows terminals, and web-based editors each surface distinct rendering and input bugs, suggesting the TUI needs a more explicit capability-negotiation layer.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-13

Source: [github.com/earendil-works/pi](https://github.com/earendil-works/pi)

---

## 1. Today's Highlights

No new releases shipped in the last 24 hours, but triage throughput was high — maintainers closed roughly 13 of the 43 issues updated in the window, most of them same-day `[untriaged]` reports. The most consequential open thread remains the `openai-codex` connection hang ([#4945](https://github.com/earendil-works/pi/issues/4945), 78 comments, 33 👍), which is now a multi-month reliability story rather than a one-off bug. Meanwhile, provider expansion is accelerating on the PR side, with subscription-backed OAuth integrations for Meta Muse, Google Antigravity, and Cursor Pro all in flight or merged.

---

## 2. Releases

None in the last 24 hours.

---

## 3. Hot Issues

1. **[#4945 — `openai-codex` Connection Reliability Issues](https://github.com/earendil-works/pi/issues/4945)** `[OPEN] [inprogress]`
   The TUI intermittently hangs on `Working...` with no streamed text, no tool call, and no error; the only escape is pressing Escape, which records a spurious aborted turn. This is the single most-discussed issue in the repo (78 comments, 33 👍) and the clearest signal that provider-stream robustness is still Pi's top pain point.

2. **[#8928 — Parallel startup reports "No API key found" for ~48s with an expired OAuth credential for another provider](https://github.com/earendil-works/pi/issues/8928)** `[OPEN] [inprogress]`
   A deterministic repro with timing data explains a long-standing family of multi-process auth failures (#1871, #4919, #6880). The error message misattributes the problem to the *active* provider, making it expensive to debug — the reporter spent ~3 hours on it. Directly relevant to anyone running Pi in CI or parallel agent setups.

3. **[#9052 — Fullscreen mode wheel scrolling is 3x slower than regular mode](https://github.com/earendil-works/pi/issues/9052)** `[OPEN]`
   Users adopt fullscreen for the pinned input box, then hit a regressed scroll experience. Nine comments and 4 👍 suggest the fixed-input-box layout tradeoff is a widespread adoption blocker for the mode.

4. **[#9311 — Fullscreen mouse selection survives session switch](https://github.com/earendil-works/pi/issues/9311)** `[OPEN]`
   Selected text persists into a new session after switching, requiring manual clearing. A small-state bug, but it compounds with #9052 to make fullscreen mode feel unpolished.

5. **[#9068 — `user_bash` silently falls back to host execution when a routing extension fails](https://github.com/earendil-works/pi/issues/9068)** `[OPEN] [bug]`
   The highest-severity issue in the queue: if an extension routes `!`/`!!` commands into an isolated VM (e.g. Gondolin) and its handler throws, Pi quietly executes on the host instead. That's a sandbox-escape class failure mode, not a cosmetic bug.

6. **[#9474 — Codex transport has no non-resetting per-request deadline](https://github.com/earendil-works/pi/issues/9474)** `[OPEN]`
   Periodic SSE/WebSocket events (heartbeats, partial deltas) defeat the existing idle timeout, so a stalled stream can hang indefinitely. Likely a contributing root cause to the #4945 family of hangs.

7. **[#9262 — `find` tool: Windows separators silently return no results](https://github.com/earendil-works/pi/issues/9262)** `[OPEN] [last-read]`
   Patterns like `src\**\*.ts` return empty with no error, leading agents to conclude files don't exist. Silent-wrong-answer bugs in tool layers are worse than loud failures because they corrupt agent reasoning downstream.

8. **[#9243 — Session resume restores the model from the last assistant message's echoed name](https://github.com/earendil-works/pi/issues/9243)** `[OPEN] [last-read]`
   When a provider echoes a different model name than the routed ID, resuming restores the wrong model. A state-integrity bug in `session-manager.ts` that can silently change behavior and cost across sessions.

9. **[#9354 — Prompt templates with invalid frontmatter are silently dropped](https://github.com/earendil-works/pi/issues/9354)** `[OPEN]`
   No warning at startup, nothing in `/resources`; the template just disappears from autocomplete. Skills handle the identical failure with a warning — an inconsistency that costs users real debugging time.

10. **[#9530 — Add Google Antigravity and Cursor Pro OAuth providers](https://github.com/earendil-works/pi/issues/9530)** `[CLOSED] [untriaged]`
    Closed quickly, but the corresponding PR (#9529) shows the direction of travel: subscription-backed, browser-OAuth providers with no API keys. Community appetite for "bring your existing subscription" is clearly strong.

*Also worth watching:* [#9098](https://github.com/earendil-works/pi/issues/9098) (prompt disposition in RPC responses), [#5372](https://github.com/earendil-works/pi/issues/5372) (custom OAuth callback rendering), [#9129](https://github.com/earendil-works/pi/issues/9129) (Windows bash timeout orphans pipeline processes), [#9519](https://github.com/earendil-works/pi/issues/9519) (iTerm2 inline images stack copies on every redraw).

---

## 4. Key PR Progress

1. **[#9096 — feat(ai, coding-agent): add Meta provider with Muse subscription OAuth](https://github.com/earendil-works/pi/pull/9096)** `OPEN`
   Resolves #7543. Notable quirks documented by the author: the API token is re-minted from the identity token daily rather than rolled, and streaming is effectively "fake" (burst output) on medium-sized responses. A useful reference for how non-standard provider auth models get absorbed.

2. **[#9529 — feat(ai): add Google Antigravity and Cursor Pro OAuth providers](https://github.com/earendil-works/pi/pull/9529)** `CLOSED`
   Adds two browser-OAuth, subscription-backed providers with a local callback server on port 51123 and a manual-code fallback. The paired issue (#9530) was closed the same day.

3. **[#8635 — fix(ai): preserve aborted stop reason during lazy setup](https://github.com/earendil-works/pi/pull/8635)** `OPEN`
   Fixes #8409 by threading the abort signal through lazy stream setup wrappers and reporting setup failures as aborted when the request is already cancelled. Adds a regression test for aborting during tool execution before next-auth setup.

4. **[#9531 — feat(tree): add permanent branch deletion from session tree](https://github.com/earendil-works/pi/pull/9531)** `CLOSED`
   Implements `SessionManager.pruneBranch(entryId)` + `countSubtree()`, with off-path entry removal, active-path protection, label re-chaining, and surviving-compaction re-pointing. Exposed via `shift+d` in the `/tree` selector.

5. **[#9523 — Fix #9522: Pi's own blocking prompts now emit `ui_prompt_start` / `ui_prompt_end`](https://github.com/earendil-works/pi/pull/9523)** `CLOSED`
   Previously these events only fired for extension-opened prompts, so status integrations reported "running" during model pickers, settings, resume, and session tree. A meaningful fix for anyone building "waiting for user" indicators.

6. **[#9517 — feat(tui): group long tool-call runs](https://github.com/earendil-works/pi/pull/9517)** `CLOSED`
   Collapses runs of six or more consecutive tool calls into an aggregate transcript row, retains failed calls while collapsed, and adds click-to-expand plus rendering tests. Directly addresses transcript noise in long agent loops.

7. **[#9514 — fix(tui): route hardcoded keys through configurable bindings](https://github.com/earendil-works/pi/pull/9514)** `CLOSED`
   Moves hardcoded shortcuts in the editor, input box, and model selector into keybindings, adding Ctrl+C to clear search/cancel model selection. Relevant to the keyboard-remapping requests in #7629.

8. **[#9539 — examples: add loop-guard extension (break LLM tool-call loops)](https://github.com/earendil-works/pi/pull/9539)** `CLOSED`
   A reference extension that detects and breaks repeated identical tool calls (same tool + same arguments), e.g. a verification command that can never succeed. Ships as an example rather than core behavior — a reasonable pattern for agent-safety primitives.

*(One PR in the window, [#9532](https://github.com/earendil-works/pi/pull/9532), had no description and was closed — treated as noise.)*

---

## 5. Hot Discussions

**Q&A**
- **[#3373 — Which plugins, add-ons, or extensions do you most enjoy using with the Pi agent?](https://github.com/earendil-works/pi/discussions/3373)** — Still the most active thread (16 comments, 9 👍), updated again today. A useful barometer of which extension surfaces actually get used, and evidence that users want a curated path to third-party tooling without Discord.

**Ideas / Feedback**
- **[#9516 — `openai-responses`: tool-result images in `function_call_output` dropped by compatible gateways](https://github.com/earendil-works/pi/discussions/9516)** — Pi emits the official Responses encoding (`input_image` in `output`), but compatible gateways drop it; Completions handles it only because `role: "tool"` is string-only. An interop gap, mirrored as issue #9518.

**Show and tell**
- **[#9525 — Thank you: `--mode rpc` is the backbone of a new open-source project](https://github.com/earendil-works/pi/discussions/9525)** — `web-agent`, a phone-friendly dashboard with Siri and Matrix bridges around one persistent Pi session. Concrete validation that the RPC mode is being used as a platform surface, not just an internal transport.

---

## 6. Feature Request Trends

- **Bring-your-own-subscription providers.** The strongest directional signal: Meta Muse (#9096), Google Antigravity, and Cursor Pro (#9529/#9530) are all OAuth-based, API-key-free provider integrations. Expect more of these.
- **TUI/terminal UX depth.** Fullscreen mode scroll and mouse behavior (#9052, #9311, #9538), configurable keybindings (#9514, #7629), tool-call run grouping (#9517), and inline-image repaint (#9519) dominate the UI backlog.
- **Richer extension/RPC surface.** Callers want more control and observability: prompt disposition in RPC responses (#9098), custom OAuth callback rendering (#5372), UI prompt lifecycle events for Pi's own dialogs (#9522), and scoped working-visibility overrides (#9536).
- **Session management as a first-class workflow.** Fork-from-resume (`Ctrl+F` in the resume list, #9521), permanent branch deletion (#9531), and accurate model restoration on resume (#9243).
- **Configurability without breaking compat.** Window-relative compaction budgets (#9415) and keybinding routing both follow a pattern: accept new forms while keeping existing integer/hardcoded configs valid.

---

## 7. Developer Pain Points

- **Silent failures are the dominant frustration.** Windows glob separators returning empty results (#9262), invalid frontmatter dropping templates without warning (#9354), and extension-routing failures falling back to host execution (#9068) all produce wrong behavior with no diagnostic. In an agent context, silent wrongness is more damaging than an error.
- **Streams and transports that hang instead of failing.** The `working...`-forever class (#4945), missing wall-clock deadlines (#9474), and `stream_read_error` not being classified as retryable (#9520) point at a systemic gap: Pi's error taxonomy and timeouts don't cover real-world stalled streams.
- **Windows remains a second-class platform.** Path separator handling, orphaned pipeline processes after timeout (#9129), and the bun-install/Node mismatch (#5365) form a recurring cluster.
- **Auth and credential edge cases in multi-process setups.** Expired OAuth credentials for unrelated providers causing 48-second startup failures with misleading messages (#8928) hurts CI and parallel agent workflows disproportionately.
- **Cost and cache telemetry can mislead.** False-positive cache-miss notices on local vLLM after a cloud model in the same session (#9013) undermine trust in the token accounting developers use for optimization decisions.
- **Debugging cost is high relative to bug severity.** Multiple reports note hours lost to misleading errors (#8928, #4945), reinforcing that error-message quality is itself a high-leverage fix area.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-13

## 1. Today's Highlights

Instability in the interactive TUI dominates today's activity: two P1 reports (#11500, #11732) describe the same uncaught React error #185 crash loop when background agents or native monitor tasks finish, and #11732 confirms the failure reproduces on the latest 0.23.3 release. On the architecture side, maintainers are pushing a significant direction — separating the agent harness from the execution environment (#11695, #11746) — while security-minded contributors flag unredacted telemetry paths (#11198, #11666). A new nightly (v0.23.3-nightly.20260912) landed with channel refactoring and a breaking change notice.

## 2. Releases

**v0.23.3-nightly.20260912.54aa66834b**
- `refactor(dingtalk)`: removed obsolete background response aggregation ([#11570](https://github.com/QwenLM/qwen-code/pull/11570))
- `feat(channels)!`: breaking change to the channels subsystem — changelog entry is truncated in the release notes, so consumers of channel integrations should track the PR/commit before upgrading

## 3. Hot Issues

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — TUI exits silently on React #185 when multiple background agents complete** (P1, 10 comments) — An Ink `useBoxMetrics` layout-listener setState loop kills the process with "Maximum update depth exceeded" and no rendered error; worst part, resume reports the previous session as broken. Highest-comment issue of the day and the clearest reproduction of the crash class.

2. **[#10065](https://github.com/QwenLM/qwen-code/issues/10065) — LM Studio "failed to parse grammar" with zero MCP servers** (9 comments, closed) — Local-model users on LM Studio 0.4.21 hit a hard request failure even with `tools.core=[]`, making Qwen Code unusable with a popular local server. Closed after sustained triage, but it shows how brittle the tool-schema path is for OpenAI-compatible local backends.

3. **[#7771](https://github.com/QwenLM/qwen-code/issues/7771) — Persisted `mcp_config` not loaded into main-process MCP proxy** (8 comments, closed) — Desktop users lost all MCP servers after restart because the Electron main process never rehydrated persisted config, breaking IPC calls. Long-lived (created July 26) and closed today, closing a month-old desktop reliability gap.

4. **[#11732](https://github.com/QwenLM/qwen-code/issues/11732) — 0.23.3 crashes with React #185 while native monitor task continues** (P1, 6 comments) — Same error family as #11500, but the crash fires while a long-running monitor task is still active, leaving an orphaned task behind. Reported on the current release, which raises the urgency to ship a fix rather than a nightly patch.

5. **[#11695](https://github.com/QwenLM/qwen-code/issues/11695) — tracking(core): separate the agent harness from the execution environment** (5 comments) — Umbrella proposal to make the place where tools execute a *separable, addressable* runtime component instead of a property of the agent-loop process. This is the architectural backbone behind today's sandbox/worker PRs and likely the biggest roadmap signal in the dataset.

6. **[#11704](https://github.com/QwenLM/qwen-code/issues/11704) — proposal(mobile): official Android companion client for `qwen serve` over ACP** (5 comments) — A thin-client Android app talking to `qwen serve` over ACP, with the author offering to implement and maintain the MVP. Notable because it's a community-contributed platform direction rather than a core-team proposal.

7. **[#11198](https://github.com/QwenLM/qwen-code/issues/11198) — Telemetry uploads raw tool-error text (incl. shell command lines) without redaction** (P1, 3 comments) — Default-on usage statistics ship unredacted shell failures to the RUM endpoint, broader than the field flagged in #10916. A privacy/credential-exposure risk that has been open since Sept 6.

8. **[#11499](https://github.com/QwenLM/qwen-code/issues/11499) — `${VAR}` placeholders in `.mcp.json` are not expanded** (4 comments) — Secrets are sent literally, so `Authorization: Bearer ${MY_TOKEN}` transmits placeholder text instead of the token. Breaks the standard pattern for keeping MCP credentials out of version control.

9. **[#11610](https://github.com/QwenLM/qwen-code/issues/11610) — hooks: align the hook contract with Claude Code** (P1, 3 comments) — Requests parity on plain-text stdout, `stop_hook_active`, timeout units, matchers, and common input. Purely compatibility-motivated: the engine is already structurally on par, so this is about not breaking users migrating hook configs.

10. **[#11746](https://github.com/QwenLM/qwen-code/issues/11746) — feat(core): SSH transport for the execution worker** (2 comments) — A third `ExecutionEnvironment` backend (after local and container) that runs agent tools on a remote host; explicitly depends on #11711. Earliest concrete expression of the #11695/#11696 sandbox-split direction.

## 4. Key PR Progress

1. **[#10183](https://github.com/QwenLM/qwen-code/pull/10183) — feat(memory): structured on-demand recall** — Replaces the flat, body-heavy auto-memory prompt with a push/pull recall protocol: a two-level ref/title tree on corpus change, a query-focused metadata subtree on relevant turns, and a dedicated recall tool. Potentially the largest context-efficiency win in flight.

2. **[#11241](https://github.com/QwenLM/qwen-code/pull/11241) — feat(browser-use): Playwright-based Browser SDK** — A typed, model-facing browser API inside the persistent Node REPL, controlling an existing Chrome session with semantic locators, DOM snapshot refs, and visual coordinates. Brings Qwen Code in line with Codex Browser Use.

3. **[#11636](https://github.com/QwenLM/qwen-code/pull/11636) — feat: track background result execution across daemon and web shell** — Gives background-result processing an explicit daemon lifecycle: current-execution results consumed at a safe model boundary, older results held for automatic continuation. Directly relevant to the background-agent crash reports.

4. **[#11700](https://github.com/QwenLM/qwen-code/pull/11700) — feat(web-shell): improve context overview and add manual compression** — Composer tooltip shows exact remaining capacity; context cards and the right panel expose used/total tokens, remaining capacity, and expandable category totals, plus manual compression. Addresses the "how full is my context?" gap in the Web Shell.

5. **[#11289](https://github.com/QwenLM/qwen-code/pull/11289) — fix(web-shell): keep mid-turn messages the daemon rejects at idle** — Instead of a bare refusal, the daemon now explains the session went idle and the browser re-sends the text as an ordinary prompt. Fixes silent message loss during turn transitions.

6. **[#11606](https://github.com/QwenLM/qwen-code/pull/11606) — fix(dashscope): send request metadata only for qwen-family models** — Scopes the DashScope `metadata` object to qwen-family wire models, with an `enableRequestMetadata` override for edge cases. Reduces 400-class errors on non-Qwen models behind DashScope-compatible endpoints.

7. **[#11538](https://github.com/QwenLM/qwen-code/pull/11538) — feat: select the OpenAI API per model** — Adds model-level `api: "chat-completions" | "responses"` for OpenAI-compatible providers, so a single provider config can mix endpoint styles. Good flexibility win for self-hosted gateway users.

8. **[#11466](https://github.com/QwenLM/qwen-code/pull/11466) — fix(mcp): re-arm a dead server connection when a tool call is cancelled** — Cancellation is correctly final for the call, but it also skipped every auto-reconnect branch, leaving the transport dead for all subsequent calls. Now the connection is re-armed after a cancelled call.

9. **[#11742](https://github.com/QwenLM/qwen-code/pull/11742) — fix(cli): reap running monitors when the process dies on an uncaught exception** — Calls `MonitorRegistry.abortAll({ notify: false })` before `process.exit(1)` in the session-aware handler, so orphaned monitors don't survive a crash. Pairs with the #11732 crash report.

10. **[#10906](https://github.com/QwenLM/qwen-code/pull/10906) — feat(web-shell): show shell and monitor task output** — Persists Monitor stdout/stderr alongside existing Shell capture and exposes a sanitized, live-session-owner-scoped tail endpoint for the task detail panel. Closes a long-standing observability gap in the Web Shell.

Also worth noting: **[#11443](https://github.com/QwenLM/qwen-code/pull/11443)** (LSP document sync before queries) and **[#11643](https://github.com/QwenLM/qwen-code/pull/11643)** (bundled ConPTY backend for Windows web terminals) both closed today.

## 5. Hot Discussions

No GitHub Discussions data was provided for this window; this section is omitted.

## 6. Feature Request Trends

- **Separable execution environments / sandboxing** — #11695 (harness vs. executor split), #11746 (SSH transport for the worker), plus the container backend in #11711. This is the dominant architectural ask, and it is being driven by maintainers, not just users.
- **Platform expansion beyond the terminal** — #11704 (official Android companion client over ACP) and related `roadmap/platform-distribution` issues signal appetite for thin clients against `qwen serve`.
- **Ecosystem compatibility as a contract** — #11610 (hook parity with Claude Code) and the hooks/events roadmap items indicate users want configs and hook semantics to be portable across agent CLIs.
- **Memory and context management** — structured on-demand recall (#10183) and manual context compression in the Web Shell (#11700) reflect demand for explicit, inspectable control over what enters the context window.
- **Model/provider flexibility** — per-model API selection (#11538) and scoped provider metadata (#11606) show the user base is running heterogeneous OpenAI-compatible backends and wants first-class configuration for each.

## 7. Developer Pain Points

1. **The React #185 TUI crash is now a pattern, not an incident.** #11500 and #11732 share a root signature (Ink layout-listener setState loop), and #11732 reproduces on the stable 0.23.3 release. Crash-on-exit also leaves monitors orphaned (#11742) and sessions unresumable.
2. **Telemetry defaults leak sensitive content.** #11198 (raw shell command lines in RUM) and #11666 (API request content exported despite `logPrompts=false`, closed) together undermine trust in the default-on usage-statistics pipeline.
3. **MCP configuration is the weakest link.** Placeholders not expanded (#11499), persisted desktop config not loaded at startup (#7771), and MCP tool images bypassing the `read_file` visual budget (#10834) are three distinct ways the MCP path surprises users.
4. **Local/server backends fail opaquely.** LM Studio grammar parse failures (#10065), Fireworks 400s on `messages[].reasoning` (#11657), and stale LSP document content (#11439) all surface as unexplained request failures rather than actionable diagnostics.
5. **Environment and packaging assumptions break on non-standard hosts.** The Desktop AppImage leaks `PYTHONHOME`/`PYTHONPATH` into spawned stdio MCP servers (#11718), and a missing `Intl.Segmenter` on RHEL 10 kills the TUI with no diagnostic (#11747).
6. **Resource growth and long session durability.** #11724 reports 7 GB memory usage on Windows with the CLI force-interrupted and progress unrecoverable, echoing the stale-Todo-plan finding in #10953 (plan frozen for 55m44s while work advanced).
7. **CI flakiness erodes contributor confidence.** Budget-eating smoke tests on unrelated PRs (#11736), nondeterministic visual snapshots at 1.31%/0% diff on the same commit (#11465), and fail-open contract guards (#11728) put recurring noise in front of reviewers.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*