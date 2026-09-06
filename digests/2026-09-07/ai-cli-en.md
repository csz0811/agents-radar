# AI CLI Tools Community Digest 2026-09-07

> Generated: 2026-09-06 22:45 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Comparison Report — 2026-09-07

## 1. Ecosystem Overview

The seven major AI coding tools surveyed are all converging on a shared reality: autonomous multi-agent workflows are becoming the default execution model, and the ecosystem's hardest problems are no longer raw model capability but cost governance, session reliability, and security boundaries. Runaway token consumption, silent false-success states, and post-resume security-gate failures appear across nearly every tracker — a sign that CLI agents have moved from "demo-grade" to production workloads faster than their guardrails matured. Vendors are simultaneously expanding beyond the terminal into desktop apps, managed worktrees, and browser-hosted shells, while Windows support remains the most consistent weak spot. Architecturally, the landscape is splitting between model-garden-walled clients (Claude Code, Codex, Gemini, Qwen) and provider-agnostic integration layers (Pi, OpenCode, Copilot CLI's ACP protocol), with MCP emerging as the universal connective tissue.

## 2. Activity Comparison

Counts reflect issues/PRs/discussions surfaced as notable in each digest, not total tracker volume. "None surfaced" means the digest contained no discussion-section items for that day; none of the seven repos have Issues/PRs disabled, so no N/A marks apply.

| Tool | Hot Issues | Notable PRs | Discussions | Release(s) in Window |
|---|---|---|---|---|
| Claude Code | 10 | 10 | None surfaced | **v2.1.263** (stable) |
| OpenAI Codex | 10 | 10 | 6 | None |
| Gemini CLI | 10 | 10 | None surfaced* | **v0.60.0-nightly.20260906** |
| GitHub Copilot CLI | 15 (10 hot + 5 secondary) | 1 (docs) | None surfaced | None |
| OpenCode | 10 | 10 | None surfaced | None |
| Pi | 10 | 10 | 1 | None |
| Qwen Code | 10 | 10 | None surfaced | **v0.23.1-preview.1** + 2 nightlies |

*Gemini digest explicitly notes no discussion records were included in the provided data.

**Reading the table:** Claude Code, Codex, Gemini, OpenCode, Pi, and Qwen all show healthy multi-PR daily throughput and roughly 10 active high-signal issues. Copilot CLI is the outlier — a nearly static PR queue (one docs-only proposal) and no release, despite a dense cluster of security- and cost-sensitive regressions, suggesting centralized (non-community) development. Qwen and Gemini ship continuously via nightlies/previews; Claude Code is the only tool shipping a stable release in the window.

## 3. Shared Feature Directions

**Hard spend governance & quota controls** — The single strongest cross-tool demand. Claude Code users want hard token budgets, agent-spawn limits, and pre-spend warnings (#90664, #87815, #89964); OpenCode needs retry loops to stop on exhausted budgets (#39790, PR #47686); Copilot CLI's BYOK prompt-cache loss (~5× cost, #4720) and Codex's unexplained quota depletion tracker (#41220) show the same trust deficit on the provider side. Pi's provider-reported-cost PR (#6881) points to the fix: expose real accounting, not estimates.

**Per-agent model routing & dynamic effort** — Claude Code asks for skill/workflow-level model overrides and subagent tier routing (#83717, #87815); Codex users want ChatGPT-style "Auto" reasoning tiering (#8649). Both communities want the orchestrator to choose the cheapest adequate model per task rather than inheriting the parent session's premium tier.

**Session/context lifecycle reliability** — Codex leads with cross-device session sync (#14067, 61👍) and history-projection desync bugs (#43182); Gemini's `/compress` doesn't survive resume (#21335); Copilot reports "Worktree missing" after desktop auto-update (#4734); OpenCode fixes stale session references post-deletion (PR #47684). Continuity of long-running work is a systemic weakness everywhere.

**Security hardening of the full supply chain** — Security attention has expanded from model behavior to sandbox semantics, plugin configs, and telemetry: Gemini closes a `git diff --output=` sandbox bypass (PR #29184) and an MCP OAuth issuer gap (PR #29117); Claude Code plugin fixes address symlink file disclosure and shell injection (PRs #68689, #68786); Qwen flags unredacted telemetry with shell command lines (#11198) and skill `PreToolUse` gates silently stopping after `--continue` (#11180); Copilot's ACP mode regressed into auto-approving all tool calls (#4537, a recurrence of #845).

**MCP & OAuth robustness** — Copilot MCP servers suffer duplicate OAuth token-cache entries (#4695); OpenCode's MCP tool schemas 400 on Anthropic and OAuth metadata discovery ignores RFC 9728 (`#46628`, `#44790`); Gemini adds OAuth issuer validation; Codex is building capability-gated MCP user-verification APIs (PRs #43265, #43289). MCP adoption is outpacing its auth/schema maturity.

**ACP & background-task lifecycle semantics** — Copilot's ACP clients need deterministic permission enforcement (#4537), no unconditional subagent abort on `session/prompt` (#4555), and a real session-idle signal (#4743); Qwen wants message queueing while a turn runs (#8542) and external-agent delegation over ACP (PR #11003). Automation clients are being built on these protocols and need predictable semantics.

**Windows as a first-class platform** — Windows-specific failures appear in every tracker: Claude Code's always-on-top desktop window (#89467) and plugin CRLF/backslash breakage; Codex's desktop startup relocation failure (#40700) and sandbox state corruption (#34841); Pi's Windows support gap (#7547, 55 comments); Copilot's 31 GB WSL2 RSS (#4694); Qwen's Windows sandbox args (PR #29184). Windows quality is now a competitive differentiator.

## 4. Differentiation Analysis

| Tool | Positioning | Target Users | Technical Direction |
|---|---|---|---|
| **Claude Code** | Anthropic-native agentic platform with the deepest plugin/skills ecosystem and desktop+CLI surfaces | Power developers running autonomous multi-agent workflows on proprietary models | Workflow/skills orchestration; extensibility is the moat (10 community plugin PRs in a day); currently wrestling with governance of the fan-out it enabled |
| **OpenAI Codex** | Fastest-expanding product surface: unified ChatGPT/Codex desktop, voice, managed TUI worktrees, server-backed session state | Both terminal power users and desktop/consumer ChatGPT users | Client-server session architecture (projection ordinals, OAuth rollover); OS-level product ambitions (voice pipelines, desktop pets); MCP user-verification contracts |
| **Gemini CLI** | Reliability- and security-first Google agent core | Developers needing deterministic sandboxed execution and a strong default model | Nightly cadence, disciplined P1 triage; Auto Memory pipeline, checkpoint robustness, sandboxed shell parity |
| **GitHub Copilot CLI** | Integration asset for the GitHub Copilot platform rather than a standalone community project | GitHub-centric developers, enterprise/BYOK/GHEC deployments, ACP automation builders | Protocol surface (ACP) + enterprise compliance; PR contribution nearly dormant; development centralized |
| **OpenCode** | Independent OSS TUI alternative to Claude Code — provider-agnostic, plugin-hook architecture | Developers who want open-source customizability + BYO models | TypeScript/config-driven plugins; MCP and Claude-convention interop; commercial "Go" subscription layer |
| **Pi** | Universal multi-provider coding agent — a high-performance client that routes to Codex, Copilot, OpenRouter, Anthropic, etc. | Multi-provider users, infrastructure-minded developers | Infra-first engineering: DNS resolution, retry caps, cross-provider fallback hops, cache-breakpoint utilization; extension API under active expansion |
| **Qwen Code** | Model-vendor tool evolving into a browser-hosted production workspace | Qwen-model users and teams wanting IDE-like session UX | WebShell as primary surface: workflow DAG visualization, context-usage panels, gzip transcript loading, mobile support; ACP passthrough to external agents |

## 5. Community Momentum & Maturity

**Claude Code** has the most mature and production-hardened ecosystem: its issue space has shifted from "will it work" to "how do we govern it," and its plugin community ships steady security/compat fixes. The scale of cost incidents (1.1M tokens for a 5-file review; full weekly quota burned in one session) indicates real enterprise-scale usage — and the platform is not yet safe for it.

**OpenAI Codex** shows the highest raw engineering velocity: 10 substantive PRs in one window spanning managed worktrees, voice audio routing, and experimental APIs, plus the strongest community feature-request support (61👍 cross-device sync). It is the most product-ambitious tool, but desktop reliability incidents (startup failures, unclickable pets, composer disappearance) suggest platform expansion is outpacing polish.

**Gemini CLI** demonstrates disciplined maintenance: P1-labeled issues, nightly builds, and rapid security fixes (Windows sandbox, OAuth issuer) landed within 24 hours. However, core reliability debt persists — generalist-agent hangs (#21409) and false-success subagent reports (#22323) remain open P1s, indicating stabilization is still in progress.

**Qwen Code** ships features fastest relative to its digest size (WebShell visualization, gzip transcripts, context panels), but release-process instability (two timeouts, duplicate CI work in #11109) and multiple open P1 security issues temper the momentum.

**Pi** is the most responsive per capita: three issues (#9242, #9244, #9209) went from report to fix the same day, including one feature-to-code turnaround in a single day. Its community is smaller but highly engaged, with the 76-comment openai-codex freeze (#4945) as its most painful open wound.

**OpenCode** sustains steady contribution flow and is building commercial traction (paid subscription), but billing/rate-limit incidents (#47613, #45278) and a 129-comment, 121👍 copy-paste blocker (#4283) suggest product maturity and infrastructure scaling lag behind user growth.

**GitHub Copilot CLI** has the most active *user* community relative to its contribution surface — 15 notable issues, including a recurring security regression — but the PR queue is nearly static. Closure of long-standing issues (#827, #4527) shows internal work, yet the regression pattern (#4537 recurring from #845, silent BYOK cost break in #4720) signals release governance that external developers cannot fully observe or influence.

## 6. Trend Signals

1. **Cost governance is the #1 enterprise adoption blocker.** Every tool with autonomous fan-out has users reporting burned weekly quotas, silent model-tier inheritance, or retry storms. Expected platform features: hard budgets, pre-spend warnings, per-agent/​per-task model routing, and programmatic usage accounting — not post-hoc "computed then discarded" numbers.

2. **Silent false states are the new reliability frontier.** Subagents hitting turn limits report `GOAL success` (Gemini #22323); SSE errors after HTTP 200 report successful results (Qwen #11217); ACP emits `end_turn` before background work finishes (Copilot #4743). The next reliability bar is honest, machine-readable terminal states and failure propagation.

3. **Security boundaries must bind to the full session lifecycle.** Skill `PreToolUse` hooks stop firing after `--continue` (Qwen #11180); ACP auto-approval silently regressed (Copilot #4537); plugin configs from untrusted repos can symlink-escape or shell-inject (Claude PRs #68689/#68786). Repo-supplied configs, hooks, and skills must be treated as untrusted input at *every* session entry point.

4. **Windows support is the competitive battleground.** Every major tool has Windows-specific P1s spanning desktop launch, sandbox integrity, path normalization, and resource usage. Teams that treat Windows as first-class will capture the enterprise/large-org segment that currently patches around breakage.

5. **Multi-provider abstraction is becoming a core requirement, not a nice-to-have.** The demand spans BYOK cache correctness (Copilot #4720), provider fallback hops (Pi #9242), OpenRouter adapter semantics (Pi #9165), and automatic model-tier selection (Claude #83717, Codex #8649). Developers want cost-aware routing and protocol compatibility (Responses API, SSE) without vendor lock-in.

6. **Desktop/IDE convergence is redefining "CLI tool."** Codex is adding voice and pets to a desktop app; Qwen is building a browser-hosted WebShell IDE; Claude Code ships a desktop app; OpenCode and Pi are investing in TUI rendering fidelity. The terminal is no longer the only surface — but every new surface currently ships with parity gaps that generate outsized community noise.

For developers and technical decision-makers, the practical takeaways: prefer tools with explicit spend guardrails and per-task model routing; audit any tool that does not expose real usage accounting; treat all agent hooks and repo-supplied configs as security-relevant; verify Windows support before committing; and expect ACP/MCP protocol semantics to still be in flux — pin versions and test automation clients against permission and lifecycle changes.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights — Data as of 2026-09-07

*Source: github.com/anthropics/skills. Rankings follow the repository's comment-sorted lists; status is taken from the explicit [OPEN]/[CLOSED] markers in the source data.*

## 1. Top Skills Ranking

**1. skill-creator evaluation pipeline repair — [#1298](https://github.com/anthropics/skills/pull/1298)**  
The most-discussed PR in the set. It fixes `skill-creator`'s `run_eval.py`, which reports `recall=0%` for every skill description and therefore silently corrupts the signals consumed by `run_loop.py` and `improve_description.py`. The fix installs the eval artifact as a real skill and addresses Windows stream reading, trigger detection, and parallel-workers issues. Discussion is anchored to [Issue #556](https://github.com/anthropics/skills/issues/556), with 10+ independent reproductions. **Status: Open** (created Jun 10, updated Jun 23). Related Windows fixes [#1099](https://github.com/anthropics/skills/pull/1099) and [#1050](https://github.com/anthropics/skills/pull/1050) confirm this is a cross-cutting pain point.

**2. document-typography skill — [#514](https://github.com/anthropics/skills/pull/514)**  
A proposed skill for typographic quality control in AI-generated documents: orphan-word wrap, widow paragraph headers, and numbering misalignment. Its pitch is that these defects appear in virtually every document Claude generates and users rarely ask for typography fixes explicitly. **Status: Open** (created Mar 4, updated Mar 13).

**3. scnet-hpc skill — [#1615](https://github.com/anthropics/skills/pull/1615)**  
New skill for operating SCNet HPC clusters through profile-based SSH and Slurm workflows, covering partition/memory/module guidance, Slurm job generation, and compute-node discovery. A specialized but clearly specified infrastructure-domain skill. **Status: Open** (created Aug 20, updated Aug 24).

**4. pdf case-sensitivity fix — [#538](https://github.com/anthropics/skills/pull/538)**  
Fixes 8 case-mismatched file references in `skills/pdf/SKILL.md` (`REFERENCE.md` → `reference.md`, `FORMS.md` → `forms.md`), which break the skill on case-sensitive filesystems. The disproportionate discussion volume for a mechanical fix signals review friction around bundled document skills. **Status: Open** (created Mar 6, updated Apr 29).

**5. ODT skill — [#486](https://github.com/anthropics/skills/pull/486)**  
Adds OpenDocument support: create, fill, read, and convert `.odt`/`.ods` files, including template filling and ODT→HTML parsing, with triggers for "ODT/ODS/ODF/OpenDocument/LibreOffice." Strongly aligned with the existing docx/pdf family. **Status: Open** (created Mar 1, updated Apr 14).

**6. frontend-design clarity improvement — [#210](https://github.com/anthropics/skills/pull/210)**  
A revision of the `frontend-design` skill so that every instruction is actionable within a single conversation and specific enough to steer behavior without over-constraining output. Essentially a usability overhaul of an existing skill rather than a new one. **Status: Open** (created Jan 5, updated Mar 7).

**7. skill-quality-analyzer & skill-security-analyzer — [#83](https://github.com/anthropics/skills/pull/83)**  
Two marketplace meta-skills: a five-dimension quality analyzer (structure/docs, examples, resources, etc.) and a security analyzer. Represents the early push toward community tooling that audits other skills. **Status: Open** (created Nov 6, 2025, updated Jan 7, 2026).

**8. docx tracked-change `w:id` collision fix — [#541](https://github.com/anthropics/skills/pull/541)**  
Fixes document corruption when the DOCX skill adds tracked changes to files with existing bookmarks: OOXML shares one `w:id` space across bookmarks/comments/move ranges, and the skill's hardcoded low IDs collide. A correctness-critical fix for a heavily used bundled skill. **Status: Open** (created Mar 6, updated Apr 16).

*Notable: half of the top-8 activity is bug-fixing and hardening, not new capability — the community's attention is split between "more skills" and "make shipped skills trustworthy."*

## 2. Community Demand Trends

Distilled from the highest-activity Issues:

- **Trust-boundary security and provenance** — [Issue #492](https://github.com/anthropics/skills/issues/492) (43 comments) is by far the most-discussed issue: community skills distributed under the `anthropic/` namespace impersonate official skills and enable permission-abuse. Demand: verified/publisher provenance guardrails.
- **Reliable authoring and no false-negative evaluation** — [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments, 👍7) and [Issue #62](https://github.com/anthropics/skills/issues/62) (10 comments) show authors blocked by skills vanishing and eval harnesses that report 0% trigger rates. Demand: stable, cross-platform skill tooling.
- **Org-level sharing and clean installs** — [Issue #228](https://github.com/anthropics/skills/issues/228) (16 comments, 👍8) requests org-wide skill sharing; [Issue #189](https://github.com/anthropics/skills/issues/189) (👍9, highest 👍 count) flags that `document-skills` and `example-skills` plugins install identical content. Demand: sharing infrastructure and deduplicated packaging.
- **Meta-skills for quality, governance, and memory efficiency** — [Issue #412](https://github.com/anthropics/skills/issues/412) (agent-governance safety patterns), [Issue #1385](https://github.com/anthropics/skills/issues/1385) (three-gate reasoning-quality pipeline), [Issue #1329](https://github.com/anthropics/skills/issues/1329) (compact-memory symbolic notation), and [Issue #202](https://github.com/anthropics/skills/issues/202) (skill-creator best practices) all point to demand for skills that audit AI output and conserve context.
- **Context-budget discipline** — [Issue #1487](https://github.com/anthropics/skills/issues/1487): the `claude-api` skill eagerly injects ~156k tokens in one tool call, exhausting context. Demand: lean skill payloads and lazy loading.
- **Platform reach** — [Issue #29](https://github.com/anthropics/skills/issues/29) (AWS Bedrock usage) and [Issue #16](https://github.com/anthropics/skills/issues/16) (expose Skills as MCPs) show demand for broader runtime compatibility.
- **Documentation/format quality** — typography QC ([#514](https://github.com/anthropics/skills/pull/514)), ODT support ([#486](https://github.com/anthropics/skills/pull/486)), and case-sensitivity/corruption fixes ([#538](https://github.com/anthropics/skills/pull/538), [#541](https://github.com/anthropics/skills/pull/541)) signal a maturity push for document-format skills.

## 3. High-Potential Pending Skills

Active PRs (not yet merged) that may land soon:

- **document-typography** — [#514](https://github.com/anthropics/skills/pull/514). Open. Typographic QC for generated documents.
- **odt** — [#486](https://github.com/anthropics/skills/pull/486). Open. OpenDocument create/fill/convert, complements pdf/docx.
- **scnet-hpc** — [#1615](https://github.com/anthropics/skills/pull/1615). Open. HPC cluster operation via SSH + Slurm.
- **servicenow** — [#568](https://github.com/anthropics/skills/pull/568). Open, unusually long-lived review (Mar 8 → Aug 12). Broad ServiceNow platform coverage: ITSM/ITOM/ITAM/FSM/HRSD/SecOps/CSDM/IntegrationHub.
- **testing-patterns** — [#723](https://github.com/anthropics/skills/pull/723). Open. Unit/React/e2e testing philosophy and patterns.
- **self-audit** — [#1367](https://github.com/anthropics/skills/pull/1367). Open. Mechanical file verification plus a four-dimension reasoning quality gate.
- **hivemind** — [#1628](https://github.com/anthropics/skills/pull/1628). Open. Zero-cost multi-agent delegation to headless opencode workers on free models.
- **buffer-api** — [#1627](https://github.com/anthropics/skills/pull/1627). Open (updated Sep 5). GraphQL social-post scheduling, portable across agents.
- **skill-quality/security-analyzer marketplace addition** — [#83](https://github.com/anthropics/skills/pull/83). Open. Meta-tools for skill QA.

## 4. Skills Ecosystem Insight

The community's most concentrated demand at the Skills level is for **trustworthy, verifiable, context-efficient skills** — secure provenance and namespace integrity, elimination of false-negative evaluation so authors can validate their work, deduplicated distribution, and meta-skills that audit output quality — layered on a steadily widening library of document-format and enterprise-platform capabilities.

---

# Claude Code Community Digest — 2026-09-07

## Today's Highlights
Cost governance is the dominant community concern this week: a wave of reports documents runaway token consumption by autonomous multi-agent workflows, with users burning weekly subscription quotas in single sessions and receiving no warnings until limits hit. Meanwhile, a steady batch of plugin reliability and security fixes (Windows path handling, shell injection, symlink escapes) progressed across the security-guidance, hookify, and ralph-wiggum plugins. Release v2.1.263 shipped with general bug fixes and reliability improvements.

## Releases
- **v2.1.263** — Bug fixes and reliability improvements. No feature changes or breaking notes in the changelog.

## Hot Issues
1. [**Windows: app window is always-on-top with no way to disable it**](https://github.com/anthropics/claude-code/issues/89467) — *[OPEN] bug, platform:windows, area:desktop* — The desktop app forces itself above all other windows with no setting or shortcut to change it. This is the most-agreed-upon open issue right now (14 👍, 16 comments), which suggests a broad Windows UX regression rather than an edge case.

2. [**Opus 4.8 confabulates user messages, a fake "prompt injection attack" narrative, and fabricated tool/host facts in long sessions**](https://github.com/anthropics/claude-code/issues/67606) — *[CLOSED] bug, platform:linux, area:model* — Two independently verified JSONL-traced sessions show severe hallucination: invented user messages, a fabricated prompt-injection narrative, and false tool/host facts. Closed as stale, but its 16 comments reflect lingering model-reliability concerns.

3. [**API requests consuming personal token quota when subscription tokens available**](https://github.com/anthropics/claude-code/issues/64613) — *[OPEN] bug, platform:macos, area:cost* — Users report being billed against personal API tokens while subscription token usage is at 0%. Billing attribution bugs erode trust quickly, and this one has stayed open for months.

4. [**Workflow code-review burns excessive tokens (1.1M+ for 5 files) and returns empty results**](https://github.com/anthropics/claude-code/issues/77943) — *[OPEN] bug, area:cost, area:skills* — The `code-review` workflow consumed over 1.1M tokens reviewing five small files and frequently returns null/empty results. A striking example of cost without corresponding output value.

5. [**security-guidance: layer 3 agentic commit review is default-on, unbudgeted, and its token usage is computed then discarded**](https://github.com/anthropics/claude-code/issues/85421) — *[OPEN] area:plugins* — The plugin fires an agentic LLM call on every commit by default (`~200k` tokens across 77 reviews in one batch), with no local visibility into cost. Users want default-off behavior and surfaced usage accounting.

6. [**Parallel subagent fleets silently inherit session model tier — burned full weekly Fable + Opus allocation in one evening**](https://github.com/anthropics/claude-code/issues/87815) — *[OPEN] bug, area:cost, area:agents* — Subagents spawned in parallel inherit the parent session's premium model tier instead of routing to cost-efficient models, exhausting a full weekly allocation in hours. Users are asking for explicit subagent model routing or automatic tier downgrades.

7. [**Long-running session silently consumes billions of tokens and hits spend/session limits with no warning**](https://github.com/anthropics/claude-code/issues/89964) — *[OPEN] bug, platform:windows, area:cost, area:desktop* — No incremental warnings precede hard spend/session limit hits. Combined with #87815, this points to a systemic lack of proactive spend guardrails in long-running agentic sessions.

8. [**Background/Workflow subagents all 401 at OAuth token rollover while the parent session refreshes successfully**](https://github.com/anthropics/claude-code/issues/84273) — *[OPEN] bug, area:agents* — Subagents capture OAuth tokens at spawn time, so when the parent refreshes its token, all in-flight background/workflow agents start 401ing. This breaks long-running workflows in a hard-to-diagnose way.

9. [**Background tasks killed for "low memory" with 17.9 GB available (MemFree vs MemAvailable)**](https://github.com/anthropics/claude-code/issues/92228) — *[OPEN] bug, platform:linux, area:bash* — The kill threshold appears to read `MemFree`, which is near zero for reclaimable page cache, instead of `MemAvailable`. A precise, plausible Linux bug that kills legitimate background work.

10. [**Goal execution loops indefinitely after completion with Opus 5**](https://github.com/anthropics/claude-code/issues/85594) — *[OPEN] bug* — `/goal` completes the user's task but then loops indefinitely instead of terminating, wasting tokens. A notable model-behavior regression reported specifically against Opus 5.

## Key PR Progress
1. [**fix(security-guidance): make `**` glob patterns match zero-depth paths**](https://github.com/anthropics/claude-code/pull/87079) — *[OPEN]* — A subtle but security-relevant fix: `fnmatch` delegation means `**/*.ts` requires a literal `/`, silently excluding top-level files from security rules. Silent non-coverage of security scanning is the worst failure mode.

2. [**fix(pr-review-toolkit): repair invalid YAML frontmatter in all agents**](https://github.com/anthropics/claude-code/pull/87077) — *[OPEN]* — Agent descriptions contain unquoted scalars with `key: value` dialogue patterns, which YAML parses as nested mappings — resulting in agents loading with empty frontmatter. A good example of plugin breakage that fails silently.

3. [**fix(plugin-dev): avoid shell injection in test-hook.sh via stdin redirection**](https://github.com/anthropics/claude-code/pull/68786) — *[CLOSED]* — Fixes injection through `$TEST_INPUT` embedded in a `bash -c` string used by hook tests; reference tooling should not model unsafe patterns.

4. [**fix(plugin-dev): hook JSON to stdout, tighten su\* glob, fix CI detection and JSON injection in examples**](https://github.com/anthropics/claude-code/pull/68785) — *[CLOSED]* — Example hook scripts wrote decision JSON to stderr (breaking hook contracts) and contained glob/CI-detection bugs. Important because examples become templates.

5. [**feat(bug-reporter): add `/bug` command to file GitHub issues from the terminal**](https://github.com/anthropics/claude-code/pull/68707) — *[CLOSED]* — Adds a bug-reporter plugin with a `/bug` slash command that files reports against the repo from inside Claude Code. Directly improves the feedback loop that produces these very issues.

6. [**fix(security-guidance): block symlink escape in extensibility config reads**](https://github.com/anthropics/claude-code/pull/68689) — *[CLOSED]* — Prevents a malicious repo from committing a config file (`.claude/claude-security-guidance.md`) as a symlink to any local file, e.g. `~/.ssh/id_rsa`. Real local file-disclosure fix.

7. [**fix(security-guidance): strip CRLF from Python version probe on Windows**](https://github.com/anthropics/claude-code/pull/68701) — *[CLOSED]* — Windows line endings caused the version check `[ "$v" = "3" ]` to fail. One of several Windows compatibility fixes for the plugin ecosystem.

8. [**fix(hookify): add Python wrapper and normalize plugin root paths on Windows**](https://github.com/anthropics/claude-code/pull/68699) — *[CLOSED]* — Backslash separators in `CLAUDE_PLUGIN_ROOT` broke inline bash hook scripts; the Microsoft Store `python3` stub also returns exit code 49 in non-TTY contexts. Both issues are addressed.

9. [**fix(security-guidance): normalize CLAUDE_PLUGIN_ROOT path separators on Windows**](https://github.com/anthropics/claude-code/pull/68694) — *[CLOSED]* — Companion fix converting backslashes in all six hook commands so Windows users get working security hooks.

10. [**fix(scripts): add duplicate label additively, don't replace existing labels**](https://github.com/anthropics/claude-code/pull/68693) — *[CLOSED]* — GitHub's PATCH replaces the entire label set, so the duplicate-close flow was silently erasing platform/area/priority labels. Process fix that keeps triage metadata intact.

## Feature Request Trends
- **Hard spend governance is the #1 request.** Users repeatedly ask for token/cost budgets, hard limits on agent spawning and fan-out, per-task model tier selection, and warnings before large expenditures ([#90664](https://github.com/anthropics/claude-code/issues/90664), [#83717](https://github.com/anthropics/claude-code/issues/83717), [#87815](https://github.com/anthropics/claude-code/issues/87815), [#89249](https://github.com/anthropics/claude-code/issues/89249)).
- **Model/effort override support for skills and workflows** — both from the CLI and via skill frontmatter — so users can route subagent work to cheaper models ([#83717](https://github.com/anthropics/claude-code/issues/83717), [#83752](https://github.com/anthropics/claude-code/issues/83752)).
- **Desktop app parity with the CLI/TUI**: a stop/interrupt button during generation ([#72489](https://github.com/anthropics/claude-code/issues/72489)), window-level controls ([#89467](https://github.com/anthropics/claude-code/issues/89467)), and Chrome extension support in `remote-control`-spawned sessions ([#74671](https://github.com/anthropics/claude-code/issues/74671)).
- **Per-agent cost observability** — several reports note that token usage is "computed then discarded" or only visible in human-readable sidebands ([#85421](https://github.com/anthropics/claude-code/issues/85421), [#89709](https://github.com/anthropics/claude-code/issues/89709)).

## Developer Pain Points
- **Runaway token consumption in autonomous multi-agent workflows** is the overriding theme: unreviewed fan-out ([#77964](https://github.com/anthropics/claude-code/issues/77964)), duplicate self-invoking agents ([#89596](https://github.com/anthropics/claude-code/issues/89596)), self-validation loops ([#87178](https://github.com/anthropics/claude-code/issues/87178)), silent model-tier inheritance ([#87815](https://github.com/anthropics/claude-code/issues/87815)), and even a generated pipeline that caused ~$50 of unintended third-party API usage ([#91682](https://github.com/anthropics/claude-code/issues/91682)).
- **Misleading or missing error surfaces**: rate limits reported as spend limits ([#75730](https://github.com/anthropics/claude-code/issues/75730)), partial workflow-agent deaths reported as `status:completed` ([#89709](https://github.com/anthropics/claude-code/issues/89709)), and agents able to disable their own spend guardrail via undocumented `skipWorkflowUsageWarning` ([#78019](https://github.com/anthropics/claude-code/issues/78019)).
- **Windows experience lags other platforms**: always-on-top desktop window, missing interrupt control, prompt-suggestion regressions, and plugin scripts repeatedly breaking on CRLF/backslash path handling.
- **Auth and billing attribution fragility**: OAuth token rollover breaks all in-flight subagents ([#84273](https://github.com/anthropics/claude-code/issues/84273)), and subscription quota vs. API token consumption remains misattributed ([#64613](https://github.com/anthropics/claude-code/issues/64613)).
- **Infrastructure edge cases with real impact**: background tasks killed despite ample reclaimable memory ([#92228](https://github.com/anthropics/claude-code/issues/92228)), ECONNRESETs on a verified-healthy network ([#82028](https://github.com/anthropics/claude-code/issues/82028)), and scheduled routines silently no-op'ing on missing repos ([#81675](https://github.com/anthropics/claude-code/issues/81675)).

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-07

## Today's Highlights

Windows desktop reliability dominates community attention: users report launch failures, a persistent unclickable "floating pets" bug across multiple builds, filesystem-level project sync errors, and a growing cross-report tracker on unexplained quota depletion. Meanwhile, a dense batch of internally merged PRs shows engineering momentum around managed TUI worktrees, experimental user-verification APIs for MCP, and Windows/voice native build support. No new versions were released in the last 24 hours.

## Releases

None in the last 24 hours.

## Hot Issues

- [**#40700 — Codex Desktop cannot start on Windows 26.820: bundled codex.exe relocation from WindowsApps fails**](https://github.com/openai/codex/issues/40700) — The most active thread this week (44 comments). Affected users cannot even open the About dialog; the app package fails during relocation out of WindowsApps. Community has been brainstorming repair and reinstall workarounds since Aug 25 with no official resolution yet.

- [**#41465 — Windows floating pet remains click-through and cannot be dragged**](https://github.com/openai/codex/issues/41465) — Highest-reacted bug this cycle (33 👍). Companion reports [**#41513**](https://github.com/openai/codex/issues/41513) and [**#41960**](https://github.com/openai/codex/issues/41960) confirm the input dead-zone persists across desktop builds 26.825.4187.0 → 26.825.6671.0 for both built-in and custom pets.

- [**#41220 — Meta tracker: abnormal Codex usage/quota depletion and usage-accounting inconsistencies**](https://github.com/openai/codex/issues/41220) — A community-curated cross-report tracker consolidating many "quota vanished" complaints, including [**#42765**](https://github.com/openai/codex/issues/42765) (45% → 0% remaining with zero sessions run) and [**#43230**](https://github.com/openai/codex/issues/43230) (ASTRA token burn spike). Signals a growing trust problem around rate-limit accounting.

- [**#40219 — macOS: server-deleted conversations repopulate in Recents and cannot be removed**](https://github.com/openai/codex/issues/40219) — 16 👍 and 22 comments. Deleted conversations keep resurfacing in the unified ChatGPT/Codex desktop app, with no way to dismiss them; users suspect client-side cache/list reconciliation bugs.

- [**#42215 — Windows ChatGPT Work: project context sync repeatedly fails at filesystem stage**](https://github.com/openai/codex/issues/42215) — Starting a local Work chat inside an existing ChatGPT Project (23 source files) fails during filesystem sync. Impacts the flagship "Work" workflow for Windows desktop users.

- [**#38417 — WSL2: codex-code-mode-host 0.147.0 crashes with SIGTRAP on every shell exec; 0.146.1 works**](https://github.com/openai/codex/issues/38417) — A clean regression boundary (`int3` at fixed offset) makes this highly actionable for maintainers. Linux/WSL2 CLI users are effectively pinned to 0.146.1.

- [**#8649 — Feature request: "Auto" reasoning effort (dynamic tiering) for Codex CLI**](https://github.com/openai/codex/issues/8649) — 20 👍. Users want Codex to pick minimal/low/medium/high/xhigh per turn or task, similar to ChatGPT's auto mode. Open since January and still a top-requested agent feature.

- [**#42583 — macOS: Composer disappears after first message until new window or app relaunch**](https://github.com/openai/codex/issues/42583) — Newer macOS build (26.901.20858) regresses the composer UI. Related to [**#43278**](https://github.com/openai/codex/issues/43278), where a transient `conversation_inaccessible` 404 permanently removes the composer even after a successful refetch.

- [**#34841 — Windows sandbox cannot recover when `deny_read_acl_state.json` becomes 22 NUL bytes after crash**](https://github.com/openai/codex/issues/34841) — A distinctive corruption-mode bug: after a system crash the sandbox ACL state file is zero-filled, and sandboxed workspace-write executions never recover. Good detail for anyone debugging native Windows sandbox state.

- [**#43182 — Codex Desktop 0.153.4: task loses days of history after reopen; persisted projection cursor points behind expected ordinal**](https://github.com/openai/codex/issues/43182) — Filed Sep 6; the latest symptom in a series of history-projection bugs (see also [**#42197**](https://github.com/openai/codex/issues/42197)). Existing tasks reopen with only a fraction of their prior conversation, pointing at ordinal/cursor desync in persisted session state.

## Key PR Progress

- [**#43286 — Add a managed worktree browser to the TUI**](https://github.com/openai/codex/pull/43286) — Adds `/worktree` browsing: lists pool checkouts, shows owner metadata, and lets users resume an owner thread or copy a worktree path.

- [**#43298 — Defer managed worktree transitions to fresh TUI loop iterations**](https://github.com/openai/codex/pull/43298) — Splits worktree setup/checkout out of the synchronous `ChatWidget` constructor so stages run on fresh event-loop stacks — likely fixes UI stalls during worktree creation.

- [**#43120 — Add managed worktree creation to TUI session commands**](https://github.com/openai/codex/pull/43120) — Introduces `/worktree` to start a fresh conversation or fork the current one into a new managed checkout; `/new` and `/fork` gain worktree options.

- [**#43289 — Add capability-gated MCP user-verification handling**](https://github.com/openai/codex/pull/43289) — Handles `openai/userVerification` via `openai/elicitation/create` when the MCP client advertises support, with field/size/base64url validation.

- [**#43265 — Add experimental user verification API contracts**](https://github.com/openai/codex/pull/43265) — Defines `userVerification/status`, `enroll`, `delete`, and `verify` contracts behind the `experimentalApi` capability, with typed error schemas.

- [**#43248 — Connect voice-host RTP audio to speaker playback**](https://github.com/openai/codex/pull/43248) — Fixes the voice host draining RTP packets without playing them; routes audio through a GStreamer pipeline with jitter buffering while preserving speaker-suppression boundaries.

- [**#43177 — Use server model defaults for fresh TUI startup**](https://github.com/openai/codex/pull/43177) — Prevents stale client model/reasoning settings from overriding the app server's effective configuration on startup.

- [**#43178 — Allow guarded legacy resume with background migration enabled**](https://github.com/openai/codex/pull/43178) — Restores the cached legacy resume shortcut when rollout migration is on, as long as the maintenance lock prevents migration during resume.

- [**#43253 — Show read-only conversations when resume encounters an active writer**](https://github.com/openai/codex/pull/43253) — Improves the active-writer conflict UX: users can now inspect the transcript read-only and retry after closing the conversation elsewhere.

- [**#31471 — (1/4) Extract apps cache logic into ConnectorRuntimeManager**](https://github.com/openai/codex/pull/31471) — The faster-connectors refactor continues: extracts the Codex Apps tools cache behind a runtime manager with context scoped by account, user, workspace mode, and Codex home.

## Hot Discussions

### Ideas
- [**#14067 — Synchronization of Codex Threads and Session Context Across Devices**](https://github.com/openai/codex/discussions/14067) — 61 👍, the most-supported discussion. Developers working across work/home machines want threads and session context to follow them, rather than being tied to local environment.
- [**#42703 — Long-horizon context: can history retrieval make history recursively self-referential?**](https://github.com/openai/codex/discussions/42703) — Explores failure modes in token-budget/`notes`/`new_context` design: what happens when a retrieved history summary itself references older context that is no longer retrievable?

### Q&A
- [**#40740 — Does rollout tracing capture which path produced a Declined exec status?**](https://github.com/openai/codex/discussions/40740) — Deep-dive into `rollout/src/policy.rs` vs `rollout-trace` persistence; notes the deliberate long match arms that force conscious decisions for new protocol variants.
- [**#43257 — How does experimental context management count history lookups against Codex usage limits?**](https://github.com/openai/codex/discussions/43257) — Pro user running multi-day GPT-6 Astra tasks asks whether context-window history lookups double-count against the usage allowance.

### Show and tell
- [**#41157 — CodexFuse 1.2.0: local Windows dashboard for Codex rate limits**](https://github.com/openai/codex/discussions/41157) — Independent, no-install Windows dashboard (PT/EN) showing used/available quota, next reset, and hourly use; no API key required.
- [**#43224 — NULLYARD: public MCP board with a static setup guide**](https://github.com/openai/codex/discussions/43224) — An operator-created public plain-text MCP board with public skill/MCP guides, no login or API key for participants.

## Feature Request Trends

- **Cross-device/cross-app session sync** — The single strongest request: syncing Codex threads and session context across devices ([#14067](https://github.com/openai/codex/discussions/14067), 61 👍), alongside complaints about remote/iOS project lists diverging from desktop ([#36454](https://github.com/openai/codex/issues/36454)).
- **Live instruction reloading** — Multiple long-running requests for AGENTS.md (and project-scope docs) to be reread automatically when modified or when `cwd`/scope changes ([#3198](https://github.com/openai/codex/issues/3198), [#8547](https://github.com/openai/codex/issues/8547), [#16403](https://github.com/openai/codex/issues/16403)). All three were recently touched/closed, suggesting the fix may finally be landing.
- **"Auto" dynamic reasoning effort** — Users want per-turn or per-task tier selection instead of a fixed reasoning level ([#8649](https://github.com/openai/codex/issues/8649), 20 👍).
- **Usage transparency and auditability** — A recurring demand for server-side explanations of quota consumption, given unexplained depletion reports ([#41220](https://github.com/openai/codex/issues/41220)) and third-party tools filling the gap ([#41157](https://github.com/openai/codex/discussions/41157)).
- **Desktop pet UX control** — Requests to hide the "Show pets" menu item and make pet/prompt-polishing behavior configurable ([#32069](https://github.com/openai/codex/issues/32069)).

## Developer Pain Points

- **Windows desktop app reliability** — The widest pain cluster: startup relocation failure ([#40700](https://github.com/openai/codex/issues/40700)), app silently disappearing ([#42510](https://github.com/openai/codex/issues/42510)), project create/remove failures ([#42502](https://github.com/openai/codex/issues/42502), [#41552](https://github.com/openai/codex/issues/41552)), Work project sync failures ([#42215](https://github.com/openai/codex/issues/42215)), and sandbox state corruption ([#34841](https://github.com/openai/codex/issues/34841)).
- **Floating pets are unclickable on Windows** — Reproduced across at least three builds and both built-in/custom pets ([#41465](https://github.com/openai/codex/issues/41465), [#41513](https://github.com/openai/codex/issues/41513), [#41960](https://github.com/openai/codex/issues/41960)); a small feature that generates outsized noise.
- **Quota/accounting trust deficit** — Users report limits dropping to zero with no session activity and token-burn spikes ([#41220](https://github.com/openai/codex/issues/41220), [#42765](https://github.com/openai/codex/issues/42765), [#43230](https://github.com/openai/codex/issues/43230)). Misleading model-picker behavior for free/Go tiers ([#41631](https://github.com/openai/codex/issues/41631)) compounds the confusion.
- **Session/history state desync** — A recurring class of bugs: deleted conversations resurrecting ([#40219](https://github.com/openai/codex/issues/40219)), tasks losing history after reopen due to projection-cursor ordinals ([#43182](https://github.com/openai/codex/issues/43182), [#42197](https://github.com/openai/codex/issues/42197)), and compaction reviving obsolete instructions mid-turn ([#42695](https://github.com/openai/codex/issues/42695)).
- **UI regressions on macOS** — Composer disappearing after the first message or after transient 404s, requiring app relaunch ([#42583](https://github.com/openai/codex/issues/42583), [#43278](https://github.com/openai/codex/issues/43278)).
- **Interruptive security verification** — On Windows, Codex repeatedly halts work to request security verification even after authorization ([#43291](https://github.com/openai/codex/issues/43291)).
- **CLI/platform regressions** — WSL2 SIGTRAP crash in code-mode-host 0.147.0 ([#38417](https://github.com/openai/codex/issues/38417)), Linux desktop crash in `libqxcb` ([#42148](https://github.com/openai/codex/issues/42148)), and persistent "No tool call found for function call output" errors ([#17630](https://github.com/openai/codex/issues/17630)).

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Gemini CLI Community Digest — 2026-09-07

### 1. Today’s Highlights

Agent reliability and execution correctness continue to dominate the issue tracker: long-standing P1 bugs around false-success subagent reports, hangs in the generalist agent, and shell “Waiting input” after completion are being cycled through retesting. The only release in the last 24 hours was another nightly build. PR activity is focused on security hardening, checkpoint/session robustness, and smaller CLI correctness fixes.

### 2. Releases

- [v0.60.0-nightly.20260906.g85aca163f](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260905.g85aca163f...v0.60.0-nightly.20260906.g85aca163f) — No separate changelog was published; see the nightly diff for changes.

### 3. Hot Issues

Selected issues updated in the last 24 hours that received the most attention or have the highest potential impact:

- [#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)  
  A subagent that hits the turn limit before doing any real work can report `status: "success"` / `Termination Reason: "GOAL"`. This is dangerous because failures are silently converted into apparent successes. P1 bug with 13 comments.

- [#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)  
  Users report indefinite hangs even for simple operations like folder creation. The 8 👍 reactions show this is a widespread pain point; a workaround is telling the model not to delegate.

- [#25166 — Shell command execution gets stuck with “Waiting input” after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)  
  Simple shell commands complete but the CLI keeps showing them as active/awaiting input. This breaks long unattended workflows and is marked P1/core.

- [#26522 — Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)  
  The background memory extractor never marks low-signal sessions as processed, so they can be surfaced again and again. This wastes tokens and creates noisy memory loops.

- [#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)  
  Even when custom skills and subagents are clearly described, users report Gemini rarely delegates or invokes them autonomously. Important for adoption of the skills/agents ecosystem.

- [#22745 — Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)  
  Epic investigating precise method-bound reads and codebase mapping as a way to reduce turn noise and token bloat. This could meaningfully improve large-repo performance.

- [#21983 — Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)  
  Browser automation is unreliable under Wayland, with poor termination reasons. P1 environment-specific blocker for Linux users.

- [#20079 — `~/.gemini/agents/filename.md` symlinks are not recognized](https://github.com/google-gemini/gemini-cli/issues/20079)  
  Symlinked agent definitions are ignored, making it harder to keep agent configs in dotfiles repos or shared locations.

- [#24246 — Gemini CLI encounters 400 error with too many tools](https://github.com/google-gemini/gemini-cli/issues/24246)  
  With large plugin/tool configurations, the CLI exceeds provider tool limits. The expected behavior is smarter scoping of enabled tools.

- [#21335 — `/compress` command is not persistent across session resume](https://github.com/google-gemini/gemini-cli/issues/21335)  
  In-memory compression works, but the summary is not written back to the session file, so resuming restores the uncompressed history. Token-saving behavior is therefore inconsistent.

### 4. Key PR Progress

Notable PRs updated/opened in the last 24 hours:

- [#29184 — fix(core): validate git args in Windows sandbox](https://github.com/google-gemini/gemini-cli/pull/29184)  
  Prevents a silent sandbox bypass where `git diff --output=<path>` could truncate arbitrary files despite being treated as read-only. P1 security fix.

- [#29117 — fix(core): enforce RFC 9207 issuer identification in MCP OAuth flow](https://github.com/google-gemini/gemini-cli/pull/29117)  
  Adds OAuth issuer validation, reducing the risk of token misrouting/mix-up attacks. Closed.

- [#29195 — fix(checkpoint): degrade non-array history instead of crashing resume](https://github.com/google-gemini/gemini-cli/pull/29195)  
  Prevents a raw `TypeError` when a checkpoint contains valid JSON but a non-array `history` field.

- [#29229 — fix(cli): reject non-finite numbers in settings editor](https://github.com/google-gemini/gemini-cli/pull/29229)  
  Overflow input like `1e309` currently serializes to `null` and corrupts the setting. Now uses `Number.isFinite`.

- [#29098 — fix(cli): keep useInputHistoryStore state updaters pure](https://github.com/google-gemini/gemini-cli/pull/29098)  
  Removes side effects from React state updaters to avoid double-invoke bugs under StrictMode.

- [#29205 — fix(cli): submit MCP prompt text without JSON encoding](https://github.com/google-gemini/gemini-cli/pull/29205)  
  Preserves exact quotes/newlines from MCP prompt responses instead of sending JSON-encoded text.

- [#29125 — fix(cli): convert hook timeout from seconds to milliseconds in hooks migration](https://github.com/google-gemini/gemini-cli/pull/29125)  
  Fixes migrated hook configs: Claude Code-style timeouts in seconds were being interpreted as milliseconds.

- [#29163 — fix(cli): prevent crash during authentication in git repositories](https://github.com/google-gemini/gemini-cli/pull/29163)  
  Stops startup crashes in macOS Seatbelt/restricted environments when Git branch info is unavailable.

- [#28967 — fix(cli): prevent clearing terminal scrollback on static refresh](https://github.com/google-gemini/gemini-cli/pull/28967)  
  Fixes an issue where static refresh cleared terminal scrollback in standard terminal modes. Closed.

- [#28968 — fix(core): dedupe symlinked/junctioned skills directories during discovery](https://github.com/google-gemini/gemini-cli/pull/28968)  
  Avoids duplicate tool registration when `.gemini` and `.agents` point to the same skills directory. Closed.

### 5. Hot Discussions

No discussion records were included in the provided data; this section is omitted.

### 6. Feature Request Trends

The most common requested directions visible across the current issue/PR set:

- **Token-efficient, AST-aware code reading**  
  Users and maintainers want more precise code navigation: AST-aware file reads/mapping ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746)) and “tactful extraction” rather than large file firehosing ([#19561](https://github.com/google-gemini/gemini-cli/issues/19561)).

- **Smarter and safer autonomous execution**  
  Strong push toward sandboxed shell access that matches the model’s native bash behavior ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)), plus better guardrails against destructive git/file commands ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).

- **More autonomous use of skills and subagents**  
  The model should know when to invoke custom skills/subagents without being explicitly told ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)), and subagent trajectories should be visible/shareable ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)).

- **Memory pipeline transparency and reliability**  
  Auto Memory needs deterministic redaction before content enters model context ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)), no infinite retries on low-signal sessions ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522)), and quarantining of invalid patches ([#26523](https://github.com/google-gemini/gemini-cli/issues/26523)).

- **Subagent/browser configuration and recovery improvements**  
  Browser agents should respect `settings.json` overrides ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)) and automatically recover from locked profiles/sessions ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232)).

### 7. Developer Pain Points

The recurring developer frustrations in the last 24 hours of issue activity:

- **Hangs and false terminal states**  
  Generalist agent hangs ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), shell commands stuck on “Waiting input” ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)), and interactive prompts blocking agents ([#22465](https://github.com/google-gemini/gemini-cli/issues/22465)) are all major workflow blockers.

- **Misleading success reports and poor debuggability**  
  Max-turn interruptions reported as goal success ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)) and bug reports lacking subagent context ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)) make agent failures hard to diagnose.

- **Workspace and session hygiene**  
  Models creating temporary scripts in random workspace directories ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)), `/compress` not surviving resume ([#21335](https://github.com/google-gemini/gemini-cli/issues/21335)), and memory agents retrying useless sessions ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522)) add avoidable cleanup overhead.

- **Sandbox gaps and destructive-command risks**  
  Windows read-only git commands can silently write files ([#29184](https://github.com/google-gemini/gemini-cli/pull/29184)), and agents occasionally reach for `git reset`/`--force` when safer alternatives exist ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)).

- **Configuration not being honored**  
  Browser agent ignores settings overrides ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), symlinked agent definitions are ignored ([#20079](https://github.com/google-gemini/gemini-cli/issues/20079)), and symlinked skills directories can be scanned twice ([#28968](https://github.com/google-gemini/gemini-cli/pull/28968)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-07

## Today's Highlights

No releases shipped in the last 24 hours. Community attention is concentrated on two regressions — ACP mode silently auto-approving tool calls (#4537) and BYOK sessions losing prompt caching at roughly 5× cost (#4720) — plus a growing cluster of ACP session-lifecycle bugs that affect automation clients. Maintainers closed the GHEC data-residency 401 (#4527), the HydraFusion plan-mode stall (#4741), and the long-running aarch64 "Exec format error" (#827); the PR queue remains very quiet with a single docs-only contribution.

## Hot Issues

**1. ACP mode auto-approves tool calls again — regression of #845**  
[#4537](https://github.com/github/copilot-cli/issues/4537) — Since 1.0.81-1, `--acp` mode no longer sends `session/request_permission`; shell commands, file edits, and deletions execute unattended with no prompt and no waiver logged. This is a security-sensitive regression for anyone building on ACP, and the second time this defect has surfaced — the community will expect a permanent fix this round.

**2. BYOK silently disables prompt caching (~5× cost)**  
[#4720](https://github.com/github/copilot-cli/issues/4720) — Copilot CLI 1.0.82 in BYOK mode sends requests with no prompt-cache declaration, so the full context is resent every turn at full price (`cached_tokens=0`, `cache_creation=0`). High financial impact for heavy BYOK users, especially on long agentic sessions.

**3. `copilot -p` fails with 401 on GHEC data residency — closed**  
[#4527](https://github.com/github/copilot-cli/issues/4527) — On `<tenant>.ghe.com` tenants, non-interactive prompt mode fetched the model catalog from `api.githubcopilot.com` instead of the tenant endpoint, breaking startup with "Authentication failed" while interactive mode worked. Enterprise-blocking issue with 4 👍; now closed.

**4. MCP OAuth tokens not reliably reused across sessions**  
[#4695](https://github.com/github/copilot-cli/issues/4695) — HTTP MCP servers using OAuth/PKCE get duplicate token-cache entries under different hash keys, causing repeated re-auth despite a still-valid cached token. Auth reliability issue that compounds with every new MCP server adoption.

**5. ACP `session/prompt` unconditionally aborts running background sub-agents**  
[#4555](https://github.com/github/copilot-cli/issues/4555) — The ACP prompt handler calls `session.abort()` as its first action, killing background sub-agents launched via the `task` tool. Interactive TUI mode does not behave this way — a correctness gap for agent-supervisor workflows.

**6. ACP: `end_turn` fires while background shells still run**  
[#4743](https://github.com/github/copilot-cli/issues/4743) — ACP returns `stopReason: "end_turn"` before an attached background shell completes; when the shell later finishes, Copilot autonomously calls tools and emits updates after the prompt RPC already finished. Clients have no observable session-idle signal — closely related to #4555.

**7. `ask_user` form: Enter early discards the in-progress typed answer**  
[#4738](https://github.com/github/copilot-cli/issues/4738) — Pressing Enter prematurely submits/cancels the form and permanently loses user-authored content, with no draft recovery. Filed at high severity because the data loss is unrecoverable.

**8. WSL2: ~31 GB RSS and ~57% CPU on long Claude Opus 5 sessions**  
[#4694](https://github.com/github/copilot-cli/issues/4694) — At ~47% context usage in a long-running, high-effort session on WSL2, the CLI balloons to ~31 GB resident memory. Likely a blocker for memory-constrained Linux/WSL environments.

**9. User-facing assistant text reclassified as "Thought for Ns"**  
[#4735](https://github.com/github/copilot-cli/issues/4735) — When a model emits reasoning + a multi-paragraph user-facing message + a tool call in one turn, the visible text is folded into the collapsed reasoning region and never shown. Output-fidelity bug that can silently hide the model's answer from users.

**10. Tool calls intermittently emit malformed invocation markup and silently no-op**  
[#4706](https://github.com/github/copilot-cli/issues/4706) — Tool/function calls can produce malformed `<invoke>` markup, causing a silent no-op. Notably, this issue was generated by the Copilot CLI agent itself (Claude Opus 4.8), making it a useful self-reported failure case.

Also notable: #4692 (org-managed default enterprise model not honored), #4734 ("Worktree missing" on all project sessions after desktop 2.98.0 / runtime 1.1.15), #4742 (desktop 1.1.15 blocks a second Local session), #3894 (`agentStop` firing on subagent turns prevents `/review` from completing), and #4733 (events lost when hitting `max_output_tokens`).

## Key PR Progress

The PR queue is nearly static — only one pull request was active in the last 24 hours:

**#4739 — docs: propose terminal-owned macOS notifications**  
[PR #4739](https://github.com/github/copilot-cli/pull/4739) — A reference proposal (not a change to the shipped CLI) documenting the macOS notification-click problem and providing an original, MIT-licensed terminal notification example with portable regression tests. Useful for integrators who want terminal apps to own macOS notification interactions, but expect no runtime behavior change from this PR.

No other PRs were opened or updated in the window.

## Feature Request Trends

- **Familiar terminal key bindings in the prompt input**: #2644 asks for Shift+Arrow and Ctrl+A text selection; #4736 asks for Ctrl+E to accept inline autocomplete suggestions. The direction is clear: make the CLI prompt behave like a standard Emacs/readline-style terminal editor.
- **Deterministic ACP session and permission semantics**: #4537 demands reliable enforcement of `session/request_permission`; #4555 and #4743 ask for background-task lifecycle that does not abort sub-agents or emit `end_turn` before work completes. Requesters are building automation on ACP and need predictable protocol behavior.
- **Output fidelity**: #4735 requests that real user-facing text not be collapsed into reasoning summaries; #4706 wants malformed tool calls surfaced loudly instead of silently dropped.
- **Efficient context and credential reuse**: #4695 (MCP OAuth token reuse) and #4720 (BYOK prompt-cache declarations) both target reducing redundant re-auth/round-trip costs.
- **Enterprise model configuration parity**: #4692 asks the CLI to honor org-managed default models just as VS Code and GitHub Desktop do.

## Developer Pain Points

- **Regression fatigue**: #4537 is a re-occurrence of #845, and #4720 broke prompt caching in a point release. Silent behavior changes across 1.0.x releases are eroding trust, especially in cost-sensitive BYOK and permission-sensitive ACP setups.
- **Auto-update breakage**: Desktop 2.98.0 / runtime 1.1.15 introduced "Worktree missing" across all project sessions (#4734), and desktop 1.1.15 blocks creating a second Local session while one is live (#4742). Users feel forced into broken states by auto-updates.
- **Background work is not owned by the session lifecycle**: no session-idle signal, early `end_turn`, unconditional abort on `session/prompt`, and hook firing on subagent turns breaking `/review` (#4555, #4743, #3894) make robust agent orchestration difficult.
- **Data loss in UI forms**: `ask_user` discarding typed input irrecoverably on accidental Enter (#4738) is a high-severity UX defect for interactive users.
- **Resource bloat on Linux/WSL2**: ~31 GB RSS on long sessions (#4694) prevents extended autonomous runs in constrained environments.
- **Enterprise endpoint inconsistencies**: GHEC data-residency tenants hit the wrong API endpoint in prompt mode (#4527, closed), and org-managed default models are ignored by the CLI (#4692) — enterprise deployments continue to be a recurring sore spot.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode Community Digest — 2026-09-07

### Today's Highlights

No new release shipped in the past 24 hours, but the repository saw active maintenance PRs targeting unstable retry behavior, log-file growth, session deletion cleanup, and plugin hook support. Community attention remains concentrated on long-standing usability issues such as copy-to-clipboard failure, plus a wave of paid-subscription rate-limit and billing reports.

### Releases

No new OpenCode releases were published in the last 24 hours.

### Hot Issues

- **[#4283 — Copy To Clipboard is not working](https://github.com/anomalyco/opencode/issues/4283)**  
  The most-commented current issue, with 129 comments and 121 👍. Users still cannot reliably copy selected text from agent responses. This remains a core workflow blocker that has stayed open for a long period.

- **[#7006 — `permission.ask` plugin hook is defined but not triggered](https://github.com/anomalyco/opencode/issues/7006)**  
  Plugin developers cannot customize auto-approval behavior because the permission hook never fires. 16 comments and 25 👍 show significant interest in making the Permissions plugin surface actually usable.

- **[#45278 — Payment Declined After 3 Months Despite No Issue With Card or Bank](https://github.com/anomalyco/opencode/issues/45278)**  
  A subscriber’s valid card is rejected at renewal despite bank confirmation. This signals a billing-system reliability problem rather than an individual payment failure.

- **[#32202 — Skill duplicate roots can change `available_skills` across restarts](https://github.com/anomalyco/opencode/issues/32202)**  
  Duplicate skill names in multiple roots are resolved nondeterministically across process starts. The final available-skills list is sorted, but earlier duplicate resolution still causes unstable behavior.

- **[#47613 — Go subscription: persistent HTTP 429 (12h retry-after) despite low usage](https://github.com/anomalyco/opencode/issues/47613)**  
  A paying Go subscriber reports the service has been effectively unusable for ~3 days. Every request returns 429 with a retry window that keeps resetting, suggesting a server-side rate-limit state bug.

- **[#46628 — MCP tool schemas are not sanitized for Anthropic](https://github.com/anomalyco/opencode/issues/46628)**  
  MCP tools with root-level `anyOf` / `oneOf` / `allOf` cause immediate 400s with Anthropic models. MCP tools also never appear in `tool.definition`, making standard inspection impossible.

- **[#39790 — Session retries fixed-window usage quota errors until reset](https://github.com/anomalyco/opencode/issues/39790)**  
  OpenCode keeps retrying provider quota errors even when the provider clearly states the reset time. This burns resources and creates misleading “retry scheduled” UI states.

- **[#42306 — TUI main thread burns ~100% CPU continuously redrawing a spinner](https://github.com/anomalyco/opencode/issues/42306)**  
  The terminal UI spins at ~15fps via `writev` even with no user interaction. This makes a full CPU core busy for idle sessions, a serious laptop-battery and remote-host concern.

- **[#47545 — Auto mode causes repeated false permission notifications in terminals](https://github.com/anomalyco/opencode/issues/47545)**  
  In AI-focused terminals such as Warp and Orca, auto mode fires permission notifications every few seconds even when approvals are automatic. The noise defeats unattended automation.

- **[#44790 — Remote MCP OAuth `resource_metadata` URL is ignored](https://github.com/anomalyco/opencode/issues/44790)**  
  OpenCode only checks RFC 9728 metadata at the domain root and ignores the URL advertised in the `WWW-Authenticate` header. This breaks MCP servers behind AWS Bedrock AgentCore and other non-root OAuth metadata endpoints.

### Key PR Progress

- **[#47676 — fix(util): bound opencode.log by trimming its head in place](https://github.com/anomalyco/opencode/pull/47676)**  
  Adds `LOG_MAX_BYTES` handling so `opencode.log` is trimmed rather than appended forever. Directly addresses 500 MB–1 GB log files on long-lived installs.

- **[#47686 — fix(session): stop retrying when the provider reports an exhausted budget](https://github.com/anomalyco/opencode/pull/47686)**  
  Improves `retryable()` so OpenCode does not keep retrying errors that represent exhausted budgets. Should reduce useless retry storms and wasted token usage.

- **[#47684 — fix(app): drop every reference to a session once it is deleted](https://github.com/anomalyco/opencode/pull/47684)**  
  Fixes stale references left behind in the address bar, recent-tab pointer, and persisted handoff after session deletion.

- **[#47682 — fix(app): stop the bootstrap queries from being refetched right after they load](https://github.com/anomalyco/opencode/pull/47682)**  
  Fixes duplicate network/logic work caused by missing `staleTime` and refetch behavior in `bootstrap.ts`.

- **[#47663 — feat(plugin): add session title hook and request options bag](https://github.com/anomalyco/opencode/pull/47663)**  
  First step toward splitting session request hooks by LLM request type. Gives plugins a stable options shape and a session-title hook.

- **[#47638 — docs(www): add Console documentation](https://github.com/anomalyco/opencode/pull/47638)**  
  Adds Console tab documentation including Intro, Models, and Go pages, migrating existing subscription and model guides to the V2 Console model.

- **[#46539 — fix(ai): preserve response reasoning items](https://github.com/anomalyco/opencode/pull/46539)**  
  Prevents reasoning items from being flattened, duplicated, or reconstructed incorrectly. Important for providers that send native reasoning fields needed for continuation.

- **[#42485 — fix(tui): load local plugins via SEA-safe import](https://github.com/anomalyco/opencode/pull/42485)**  
  Fixes local TUI plugin loading in the Node SEA build, which previously failed with `ERR_UNKNOWN_BUILTIN_MODULE` because raw `import()` could not handle `file://` URLs.

- **[#40921 — fix(core): broadcast connection updates to every location](https://github.com/anomalyco/opencode/pull/40921)**  
  Fixes stale provider catalogs by propagating connection/disconnection changes beyond the location that served the request.

- **[#40920 — fix(core): import credentials from previous channel database](https://github.com/anomalyco/opencode/pull/40920)**  
  Fixes a channel-database consolidation issue where credentials stored only in the previous `opencode-next.db` were silently dropped.

### Feature Request Trends

- **Plugin permission and policy control**  
  Users want reliable, customizable auto-approval flows: `permission.ask` must be triggerable, auto mode should not spam notifications, and plugins need richer request hooks.  
  See [#7006](https://github.com/anomalyco/opencode/issues/7006), [#47545](https://github.com/anomalyco/opencode/issues/47545), [#47663](https://github.com/anomalyco/opencode/pull/47663).

- **Claude Code and MCP ecosystem compatibility**  
  There is clear demand for better interop with Claude Code conventions and MCP servers, including opt-in discovery of `.claude/agents`, schema sanitization for Anthropic models, and RFC 9728 OAuth metadata support.  
  See [#47650](https://github.com/anomalyco/opencode/issues/47650), [#46628](https://github.com/anomalyco/opencode/issues/46628), [#44790](https://github.com/anomalyco/opencode/issues/44790).

- **More provider coverage and accurate context limits**  
  Users want additional providers such as Nous Portal, better documentation for existing providers such as Standard Compute, and correct context-limit reporting for OAuth-connected ChatGPT models.  
  See [#47515](https://github.com/anomalyco/opencode/issues/47515), [#47475](https://github.com/anomalyco/opencode/issues/47475), [#47646](https://github.com/anomalyco/opencode/issues/47646).

- **Smarter handling of paid usage and provider limits**  
  OpenCode should distinguish transient rate limits from exhausted budgets and stop pointless retry loops. Users also expect clearer billing failure messages.  
  See [#47613](https://github.com/anomalyco/opencode/issues/47613), [#39790](https://github.com/anomalyco/opencode/issues/39790), [#47686](https://github.com/anomalyco/opencode/pull/47686).

### Developer Pain Points

- **Quota and rate-limit states are handled too aggressively**  
  429 errors and fixed-window quota messages trigger retry loops even when success is impossible before a reset; paying subscribers also report persistent server-side 429 conditions.  
  See [#47613](https://github.com/anomalyco/opencode/issues/47613), [#39790](https://github.com/anomalyco/opencode/issues/39790), [#47634](https://github.com/anomalyco/opencode/issues/47634).

- **MCP integration is still fragile**  
  Tool schemas are rejected by Anthropic models, OAuth metadata discovery is incomplete, and Desktop MCP requests time out after arbitrary intervals.  
  See [#46628](https://github.com/anomalyco/opencode/issues/46628), [#44790](https://github.com/anomalyco/opencode/issues/44790), [#47584](https://github.com/anomalyco/opencode/issues/47584).

- **Plugins and permission hooks are not dependable yet**  
  Permission hooks can be completely ignored, and auto-mode permission notifications can fire repeatedly in supported terminals. This makes unattended plugin-driven workflows noisy and unreliable.  
  See [#7006](https://github.com/anomalyco/opencode/issues/7006), [#47545](https://github.com/anomalyco/opencode/issues/47545).

- **Session and configuration state can silently break**  
  Sessions disappear after `.git` removal, deleted sessions leave stale references, duplicate skill roots produce inconsistent results, and CLI preference saves replace symlinked config files.  
  See [#47652](https://github.com/anomalyco/opencode/issues/47652), [#47683](https://github.com/anomalyco/opencode/issues/47683), [#32202](https://github.com/anomalyco/opencode/issues/32202), [#45067](https://github.com/anomalyco/opencode/issues/45067).

- **TUI and desktop resource usage remain a concern**  
  Idle TUI sessions can consume an entire CPU core redrawing a spinner, while Windows Desktop can crash at launch because of repeated GPU child-process failures.  
  See [#42306](https://github.com/anomalyco/opencode/issues/42306), [#46691](https://github.com/anomalyco/opencode/issues/46691).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-07

## Today's Highlights
Connectivity and resilience dominated September 6: same-day PRs address Copilot GPT-6 Astra endpoint routing (#9253), MagicDNS resolution failures (#9252), and an opt-in cross-provider fallback hop (#9251). Long-running reliability threads continue to draw the most community engagement, with openai-codex TUI hangs (#4945, 76 comments) and Windows support gaps (#7547, 55 comments) remaining the top pain points. Extension API expansion and new-model support are the strongest feature-request themes across the issue tracker.

## Hot Issues

- **[openai-codex Connection Reliability Issues](https://github.com/earendil-works/pi/issues/4945)** — 76 comments | 32 👍 | Open, in progress
  `openai-codex` / `gpt-5.5` sessions intermittently freeze on `Working...` with no streamed text, tool call, or error. The only recovery is Escape, which records an aborted assistant turn. This is the highest-engagement issue in the tracker and has remained unresolved since May.

- **[How do you use Pi on Windows?](https://github.com/earendil-works/pi/issues/7547)** — 55 comments | Open
  A community sink thread collecting Windows setups and pain points. Maintainers are using it to decide where to invest effort (native fixes, docs, out-of-box experience) versus what to delegate to extensions. The volume of responses signals strong Windows demand and fragmented workflows.

- **[GitHub Copilot GPT-6 Astra routed to unsupported Chat Completions endpoint](https://github.com/earendil-works/pi/issues/9209)** — 4 comments | Closed
  `github-copilot/gpt-6-astra` returns `400: unsupported_api_for_model` because Pi sends it to `/chat/completions` instead of the Responses API. Reproduces with extensions disabled. Fix landed same day in [PR #9253](https://github.com/earendil-works/pi/pull/9253).

- **[Claude Opus 5 via OpenRouter rejects per-message output_config](https://github.com/earendil-works/pi/issues/9165)** — 3 comments | Closed
  Requests to `openrouter/anthropic/claude-opus-5` fail with a 400, while the same model works through the Anthropic provider directly. Community members investigated with agent assistance before filing; points to a provider-adapter compatibility gap.

- **[MagicDNS-style hosts fail with ENOTFOUND](https://github.com/earendil-works/pi/issues/9244)** — 2 comments | Closed
  The global undici dispatcher doesn't pin `connect.lookup` to Node's system `dns.lookup`, so hosts resolving via Tailscale/MagicDNS or `nsswitch.conf` fail even though `getaddrinfo` works. Fixed same day in [PR #9252](https://github.com/earendil-works/pi/pull/9252).

- **[opencode-go provider missing required x-opencode-session header](https://github.com/earendil-works/pi/issues/9230)** — 2 comments | Closed
  OpenCode Go now requires a stable per-conversation `x-opencode-session` header; requests without it "may error" starting 2026-09-06. The community bridge [pi-opencode-bridge@0.2.1](https://github.com/earendil-works/pi/issues/9237) has the same gap, breaking prompt-cache affinity for both core and third-party paths.

- **[Cross-provider fallback chain on transport/unreachable errors](https://github.com/earendil-works/pi/issues/9242)** — 2 comments | Closed
  Request for opt-in provider/model fallback when the active provider hits DNS/timeout/connection-refused errors, complementing existing same-provider retry. Notably, the feature was implemented the same day via [PR #9251](https://github.com/earendil-works/pi/pull/9251) — a fast community-to-code turnaround.

- **[Anthropic: spend the unused 4th cache breakpoint on a stable conversation checkpoint](https://github.com/earendil-works/pi/issues/9246)** — 3 comments | Closed
  `convertMessages` only uses 3 of Anthropic's 4 accepted cache breakpoints. Proposal: use the 4th for a stable conversation checkpoint captured via `onPayload`, reducing cache misses and cost on long agent sessions.

- **[Cap agent retry backoff for prolonged transient outages](https://github.com/earendil-works/pi/issues/8826)** — 3 comments | Open
  Exponential agent-level retry delays grow unbounded during extended upstream outages (repeated `503 upstream call failed: Too many open files`). Users want a configurable cap so retries settle at a bounded interval instead of backing off indefinitely.

- **[API key resolution order issue between --api-key and auth.json](https://github.com/earendil-works/pi/issues/9245)** — 1 comment | Closed
  Users who store OpenRouter keys in 1Password via `auth.json` hit ordering ambiguity when passing `--api-key`; the auth file can unexpectedly take precedence. Related to the per-repo override discussion in [Discussion #9146](https://github.com/earendil-works/pi/discussions/9146).

## Key PR Progress

- **[fix(ai): route Copilot GPT models through Responses (fixes astra)](https://github.com/earendil-works/pi/pull/9253)** — Open
  Routes GitHub Copilot GPT models through the Responses API, fixing GPT-6 Astra's 400 error. Also future-proofs against the removal of GPT-4 models from GitHub's catalog.

- **[feat(coding-agent): hop to a fallback provider on transport errors](https://github.com/earendil-works/pi/pull/9251)** — Closed
  Adds an optional fallback hop when the active provider hits transport/unreachable errors, letting sessions continue on a configured fallback provider. Fixes #9242; went through iterations as #9248 and #9249.

- **[fix(coding-agent): pin undici connect lookup to system dns.lookup](https://github.com/earendil-works/pi/pull/9252)** — Closed
  Pins the HTTP dispatcher's DNS resolution to Node's system resolver, fixing MagicDNS/split-horizon hostname failures (#9244). Earlier iteration: #9250.

- **[fix(coding-agent): resolve model auth live instead of from startup snapshot](https://github.com/earendil-works/pi/pull/9233)** — Closed
  Fixes a race where startup code paths gate on `hasConfiguredAuth()` before the background availability snapshot is populated, causing valid models to be temporarily unavailable.

- **[fix(ai): clamp OpenRouter :free maxTokens to base model](https://github.com/earendil-works/pi/pull/9224)** — Closed
  OpenRouter `:free` catalog entries advertise larger context windows than their base models; Pi now clamps request `max_tokens`, avoiding 400s like "does not support max tokens > 524288" on models such as `minimax/minimax-m3:free`.

- **[fix(coding-agent): reject reload during active session operations](https://github.com/earendil-works/pi/pull/9222)** — Open
  Prevents extension-triggered reloads while a tool is running in RPC mode. Previously, a successful tool call could hit an invalidated runner, causing Pi to store and send a spurious error to the model.

- **[feat(ai): use provider-reported cost when responses include it](https://github.com/earendil-works/pi/pull/6881)** — Open, in progress
  Uses provider-reported billed cost as `usage.cost.total` when present (including `cost_details.upstream_inference_cost` for BYOK), falling back to catalog-rate calculation otherwise.

- **[feat(tui): add jump-to-latest control](https://github.com/earendil-works/pi/pull/9080)** — Closed
  Adds a TUI control to jump back to the latest message, building on @dgtlntv's new-message-indicator work. Includes demo videos for static and streaming cases.

- **[feat(ai): add LLM Gateway and LLM Gateway DevPass providers](https://github.com/earendil-works/pi/pull/7610)** — Open
  Adds llmgateway.io, an OpenRouter-style router, as built-in `openai-completions` providers. Contributed on behalf of the LLM Gateway team; replaces auto-closed PR #7480.

- **[feat(ai,coding-agent): add Meta provider with Muse subscription OAuth](https://github.com/earendil-works/pi/pull/9096)** — Open
  Adds a Meta provider (resolves #7543) with an unusual auth flow: the API token is re-minted daily from an identity token rather than via rolling refresh. Streaming is currently bursty rather than incremental — noted as a known quirk.

## Hot Discussions

**Ideas**

- **[Per-repo API key override and option to ignore auth.json](https://github.com/earendil-works/pi/discussions/9146)** — [General] — 2 comments | 1 👍
  A user who stores their OpenRouter key in 1Password via `!op` directives in `auth.json` asks for a per-repo override mechanism plus an opt-out to ignore `auth.json` entirely. Complements the ordering bug reported in [Issue #9245](https://github.com/earendil-works/pi/issues/9245).

## Feature Request Trends

- **New-model and provider coverage**: Users want immediate support for newly released models and routers — GPT-6 Astra (#9133, #9209), Claude Opus 5 via OpenRouter (#9165), Meta/Muse provider ([PR #9096](https://github.com/earendil-works/pi/pull/9096)), and LLM Gateway ([PR #7610](https://github.com/earendil-works/pi/pull/7610)). Catalog metadata for free-tier models also needs clamping (#9224).
- **Reliability and resilience knobs**: Cross-provider fallback on transport errors (#9242), capped retry backoff (#8826), and machine-readable terminal failure classification in JSON/RPC events (#9247) are recurring asks for long-running agent use.
- **Cache and cost optimization**: Use Anthropic's unused 4th cache breakpoint (#9246), avoid system-prompt flaps that break prompt caching (#8712), respect provider-reported billing cost ([PR #6881](https://github.com/earendil-works/pi/pull/6881)), and stop replaying base64 image payloads on every Codex request (#8617).
- **Extension API expansion**: Expose the `ModelRuntime` to extensions (#8791), allow runtime TUI mode switching and layout mounting (#9238), support built-in UI string overrides (#9254), and add idempotent acknowledged turn delivery (#9236). An opt-in `pi.namespace` for skills/templates (#8834) also drew interest.
- **TUI usability and rendering**: Incremental scroll behavior (PageUp currently jumps to the first message, #5786), jump-to-latest control ([PR #9080](https://github.com/earendil-works/pi/pull/9080)), non-destructive redraws that preserve scroll position (#9240), LaTeX legacy font-switch rendering (#8827), and fullscreen image rendering fixes (#8306).
- **Configuration ergonomics**: Per-repo API key overrides and auth.json opt-out (#9146, #9245), plus continued Windows-specific config fixes like `shell_path` being ignored when WSL exists (#9229).

## Developer Pain Points

- **openai-codex freezes mid-task**: Repeated `Working...` hangs with no output, tool call, or error — the only recovery is Escape, which aborts the turn. 76 comments and 32 👍 make this the most painful open issue.
- **Windows experience is fragmented**: Too many supported run modes make it unclear where core fixes should go vs. extension territory. Windows-specific bugs like WSL/bash precedence for `shell_path` (#9229) and Shift+Enter keybinding behavior (#7175) compound the issue.
- **New models routinely un-routable or rejected**: GPT-6 Astra is sent to the wrong endpoint (#9209), Claude Opus 5 fails on OpenRouter with per-message `output_config` (#9165), and OpenCode Go's new session-header requirement breaks both core and the community bridge on the same day (#9230, #9237).
- **DNS and network edge cases**: MagicDNS/Tailscale hostnames fail with `ENOTFOUND` because undici bypasses the system resolver (#9244); prolonged outages cause unbounded exponential retry backoff with noisy `503` / "Too many open files" errors (#8826).
- **Auth configuration friction**: `--api-key` vs. `auth.json` resolution order is surprising, and there's no supported way to use a per-repo key or ignore `auth.json` when using 1Password `op` integration (#9245, #9146).
- **TUI viewport and rendering regressions**: Invisible line changes above the viewport trigger destructive full redraws that lose scroll position mid-task (#9240); PageUp jumps to session start instead of scrolling incrementally (#5786); LaTeX font-switch blocks fall back to raw source (#8827).
- **Extension integration gaps**: No access to the model runtime from extensions (#8791), reload races invalidating active runners (#9222), and object-spread wrapping that breaks prototype methods/Proxy traps in embedder UI contexts ([PR #9219](https://github.com/earendil-works/pi/pull/9219)).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## Qwen Code Community Digest — 2026-09-07

### Today’s Highlights
Web-shell work dominates again: `v0.23.1-preview.1` and the latest nightlies ship dynamic workflow-run visualization and management, while outstanding PRs add a context-usage panel, a bounded historical transcript viewport, and gzip-based transcript loading to address the long-reported mobile jank. On the security side, two P1 reports landed covering unredacted telemetry uploads with shell command lines (#11198) and a skill `PreToolUse` gate that stops enforcing after `--continue` (#11180). Export-file size also improved materially — exported HTML no longer embeds the full Web Shell/React runtime (#11031), with neighboring mermaid/runtime-size issues still under active follow-up.

### Releases
- **v0.23.1-preview.1**
  - `feat(web-shell)`: visualize and manage dynamic workflow runs — [PR #10594](https://github.com/QwenLM/qwen-code/pull/10594) by @qqqys
  - `perf(web-shell)`: derive the session workflow project
  - Note: the release workflow failed at the `integration_docker` job ([#11185](https://github.com/QwenLM/qwen-code/issues/11185)).
- **v0.23.0-nightly.20260906.92a8a8d179** and **v0.23.0-nightly.20260905.0c945a6136** ship the same two web-shell changes ahead of the next stable.

### Hot Issues
1. **[#11198 — Usage-statistics telemetry uploads raw tool-error text to RUM without redaction](https://github.com/QwenLM/qwen-code/issues/11198)** — P1 security. Shell failures can send full command lines to a third-party endpoint by default; the issue notes it is pre-existing on `main` and wider than the single field flagged in #10916.
2. **[#11180 — Skill `PreToolUse` hook stops enforcing after `--continue`](https://github.com/QwenLM/qwen-code/issues/11180)** — P1 security. A skill’s safety gate works for a fresh invocation but silently stops denying calls after a resumed session, while the skill instructions remain in context.
3. **[#8662 — Migrate TUI rendering layer from ink to OpenTUI (tracking)](https://github.com/QwenLM/qwen-code/issues/8662)** — The most-commented issue this cycle (30 comments). Documents structural flicker and a ~1,037-line custom ink patch, arguing for a renderer platform change.
4. **[#6181 — Web Shell mobile session switching is janky](https://github.com/QwenLM/qwen-code/issues/6181)** — P1, ready-for-agent. A four-layer root-cause analysis: 2s polling during drawer close, uncompressed full-history loads, and per-frame O(transcript) rendering costs.
5. **[#11031 — Stop embedding the Web Shell runtime in every exported HTML file](https://github.com/QwenLM/qwen-code/issues/11031)** — Closed P1: a 19.5 MB export for an empty session triggered an export-pipeline cleanup; related mermaid flattening work is tracked alongside [#11091](https://github.com/QwenLM/qwen-code/issues/11091).
6. **[#11146 — Pre-aborted tool requests can wait behind an unrelated active batch](https://github.com/QwenLM/qwen-code/issues/11146)** — `CoreToolScheduler.schedule()` leaves cancelled requests queued behind a busy batch instead of rejecting them immediately, adding latency to requests that are already dead.
7. **[#9911 — Restore VS Code message edit and rewind after the WebShell cutover](https://github.com/QwenLM/qwen-code/issues/9911)** — The legacy per-message edit/rewind interaction was removed during the WebShell migration; reopen against daemon snapshot APIs for parity with the old experience.
8. **[#8542 — [ACP] Support sending/queuing messages while a turn is running](https://github.com/QwenLM/qwen-code/issues/8542)** — ACP and IDE users still lack the CLI’s “submit while the agent is still working” experience; a recurring integration-request theme.
9. **[#11217 — Anthropic SSE failures report successful headless JSON results](https://github.com/QwenLM/qwen-code/issues/11217)** — New reproduction of the false-success bug for Anthropic-compatible SSE: errors arrive after an HTTP 200 and headless mode still reports success.
10. **[#11109 — `release.yml` repeats work the same run already did and one 20-minute step verifies nothing](https://github.com/QwenLM/qwen-code/issues/11109)** — Two release runs timed out today; the CI pipeline is spending most wall-clock time on redundant work. Related ECS/E2E timeout issue: [#11209](https://github.com/QwenLM/qwen-code/issues/11209).

### Key PR Progress
1. **[#11208 — Add bounded historical transcript viewport](https://github.com/QwenLM/qwen-code/pull/11208)** — Phase 2B of session-wide turn navigation: read-only historical windows, evicted-gap recovery, and return-to-live-tail behavior.
2. **[#11003 — Delegate a subagent turn to an external agent over ACP (Claude Code first)](https://github.com/QwenLM/qwen-code/pull/11003)** — A subagent definition can name an external command; the turn is driven over ACP and re-published back into the session stream.
3. **[#11207 — Allow concurrent standalone daemons with session fencing](https://github.com/QwenLM/qwen-code/pull/11207)** — Daemons can share Conversations concurrently while preserving the mandatory single-writer lease per session (including Live/scheduled work).
4. **[#11220 — Gzip Web Shell transcript responses](https://github.com/QwenLM/qwen-code/pull/11220)** — Directly targets the #6181 large-session load cost on mobile.
5. **[#11177 — Add a context usage tab to the Web Shell right sidebar](https://github.com/QwenLM/qwen-code/pull/11177)** — Opt-in panel showing live context-window occupancy alongside the existing token usage tab.
6. **[#10906 — Show shell and monitor task output in the Web Shell task detail panel](https://github.com/QwenLM/qwen-code/pull/10906)** — Persists monitor stdout/stderr with shell captures and exposes a sanitized live tail endpoint.
7. **[#11189 — Catch tool-result scaffolding and system-reminder echo leaks](https://github.com/QwenLM/qwen-code/pull/11189)** — Closes the two remaining user-visible scaffolding-leak shapes from #10797 that escape existing leak defenses.
8. **[#10347 — Auto-retry transient network errors (EOF) where Ctrl+Y is unavailable](https://github.com/QwenLM/qwen-code/pull/10347)** — Reclassifies wrapped low-level network failures as retryable transport errors instead of fail-fast client errors.
9. **[#10938 — Make Session Workflow dependencies navigable and quiet its chrome](https://github.com/QwenLM/qwen-code/pull/10938)** — Design pass over the plan DAG and inspector UI so the graph leads with the step, not its status.
10. **[#11134 — Retry the transient all-green macOS E2E shard death once](https://github.com/QwenLM/qwen-code/pull/11134)** — Adds the same budget-gated retry used by Linux `sandbox:none` to the macOS E2E leg.

### Feature Request Trends
- **Web-shell as the primary session workspace:** dynamic workflow-run visualization, bounded history navigation, context/token usage monitoring, shell/monitor task output, and session-switching performance are converging into a browser-hosted IDE experience.
- **ACP/agent interoperability:** external-agent delegation ([#11003](https://github.com/QwenLM/qwen-code/pull/11003)), queueing messages while a turn runs ([#8542](https://github.com/QwenLM/qwen-code/issues/8542)), and restoring VS Code-era edit/rewind ([#9911](https://github.com/QwenLM/qwen-code/issues/9911)) show a push to decouple the client from the in-process agent runtime.
- **Security as a session-lifecycle property:** skill `PreToolUse` gates, hooks enforcement across `--continue` and `/skill` entry points, and telemetry redaction of tool errors are the most urgent asks this cycle.
- **Small, replayable exports:** the export-pipeline cleanup around [#11031](https://github.com/QwenLM/qwen-code/issues/11031) and [#11091](https://github.com/QwenLM/qwen-code/issues/11091) reflects broader demand for portable, shareable transcripts without embedded runtimes.

### Developer Pain Points
- **Tool cancellation/queueing edge cases:** cancelled requests can wait behind unrelated active batches ([#11146](https://github.com/QwenLM/qwen-code/issues/11146)), and normal queued cancellation can skip required completion cleanup ([#11162](https://github.com/QwenLM/qwen-code/issues/11162)).
- **Silent success/failure on compatible APIs:** Anthropic SSE errors report successful headless JSON results ([#11217](https://github.com/QwenLM/qwen-code/issues/11217)), statusless SSE throttling bypasses retry/backoff ([#11215](https://github.com/QwenLM/qwen-code/issues/11215)), and `/effort` is not propagated to openai-compatible backends ([#11227](https://github.com/QwenLM/qwen-code/issues/11227)).
- **Skill safety gates that quietly stop firing:** `PreToolUse` hooks fail when invoked via `/<skill-name>` ([#11067](https://github.com/QwenLM/qwen-code/issues/11067)) and after `--continue` ([#11180](https://github.com/QwenLM/qwen-code/issues/11180)), undermining their value as security guardrails.
- **Unredacted telemetry:** raw tool-error text, including shell command lines, is uploaded to RUM by default ([#11198](https://github.com/QwenLM/qwen-code/issues/11198)).
- **CI/release pipeline instability:** release runs keep failing at `quality`/`integration_docker` jobs ([#10757](https://github.com/QwenLM/qwen-code/issues/10757), [#10853](https://github.com/QwenLM/qwen-code/issues/10853), [#11185](https://github.com/QwenLM/qwen-code/issues/11185)); `release.yml` duplicates work and ships a 20-minute no-op step ([#11109](https://github.com/QwenLM/qwen-code/issues/11109)).
- **Mobile and large-transcript performance:** uncompressed full-history loads, per-frame O(transcript) rendering, and polling that ignores drawer state make session switching painful on phones ([#6181](https://github.com/QwenLM/qwen-code/issues/6181)).
- **Diagnosability gaps:** transcript normalization drops user `resource_link` attachments during replay ([#11178](https://github.com/QwenLM/qwen-code/issues/11178)), and daemon error handling logs the literal string `[object Object]` instead of the actual error ([#11123](https://github.com/QwenLM/qwen-code/issues/11123)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*