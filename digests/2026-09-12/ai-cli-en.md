# AI CLI Tools Community Digest 2026-09-12

> Generated: 2026-09-12 00:36 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Ecosystem Comparison — 2026-09-12

## 1. Ecosystem Overview

The AI CLI/coding-agent ecosystem is in a consolidation-and-hardening phase. Core agentic loops, plugins, and MCP support are now table stakes; competition has shifted to reliability at platform edges—Windows, sandboxes, networking, and terminal compatibility—plus session/context correctness, cost guardrails, and enterprise governance. Release cadence is bifurcated: Claude Code and GitHub Copilot CLI ship stable increments, while OpenAI Codex, Gemini CLI, and Qwen Code iterate through alpha/nightly channels, and OpenCode stabilizes its V2 beta. Community engagement remains high across all tools, but maintainer throughput and PR merge capacity vary sharply.

*Note: below, “surfaced” counts are digest-listed items, not total open issues/PRs. Source digests do not expose full repo totals. “N/A” means the channel was not reported in the digest, not that it is inactive. Multiple PR numbers in one bullet are counted separately.*

## 2. Activity Comparison

| Tool | Issues surfaced | PRs surfaced | Discussions surfaced | Release status |
|---|---:|---:|---:|---|
| **Claude Code** | 15 (10 hot + 5 notable) | 1 | N/A | **v2.1.269** stable: `claude plugin eval`, `/output-style` |
| **OpenAI Codex** | 10 | 12 | 10 | 6 Rust alpha tags; no substantive changelog |
| **Gemini CLI** | 11 | 13 | N/A | `v0.61.0-nightly`; no user-facing changes |
| **GitHub Copilot CLI** | 10 | 0 | N/A | **v1.0.84-5**: session/memory import, shell completions |
| **OpenCode** | 12 (10 hot + 2 notable) | 15 | N/A | None |
| **Pi** | 16 (10 hot + 6 notable/closed) | 14 | N/A | None |
| **Qwen Code** | 10 | 10 | N/A | `v0.23.3-nightly`; breaking channels change |

**Key activity reads:**
- **Codex** has the broadest surfaced activity mix: hot issues, 12 PRs, and 10 discussions.
- **Claude Code** shows the strongest single-issue engagement—#42776 has 178 comments—but only one PR saw activity, indicating a thin community merge pipeline relative to issue volume.
- **Copilot CLI** shipped a release but had zero PR activity in the window; its issue queue remains active around MCP/auth/session lifecycle.
- **OpenCode** and **Pi** are highly active in PR throughput, largely around release stabilization, Windows fixes, and provider/extension infrastructure.

## 3. Shared Feature Directions

Several requirements recur across multiple tool communities:

- **Session continuity, rollback, and memory portability**
  - Codex: native `/rewind`/`/revert` (132 👍).
  - OpenCode: undo message while keeping file changes (#7963, 12 👍).
  - Copilot CLI: session/memory import commands, cross-session context.
  - Qwen Code: rewind anchored to stable prompt identity.
  - Claude Code: project-local, shareable memory under `.claude` (#25947, 39 👍).

- **MCP lifecycle, auth, and scoping reliability**
  - Claude Code: orphaned stdio MCP servers, worktree connector re-injection, proxy allowlist gaps.
  - Codex: browser control auth failures, connector auth detection.
  - Copilot CLI: resume cancels in-flight stdio MCP, Atlassian OAuth callback mismatch, `server/discover` fatal errors.
  - Qwen Code: Windows MCP `-32000 Connection closed`.
  - Gemini CLI: tool-count limits and large MCP setups.

- **Sandboxing and permission UX**
  - Gemini CLI: sandbox filesystem isolation, checkpoint path-traversal fixes, post-execution intent routing.
  - Qwen Code: bwrap kernel sandbox for Linux, ConPTY hardening.
  - Codex: Windows sandbox setup via app server.
  - Claude Code: fewer permission interruptions in Plan/read-only modes.
  - Copilot CLI: assisted permissions expiring after ~1 hour.

- **Windows parity and reliability**
  - Claude Code: orphaned process locks, MSIX auto-update kills running app.
  - Codex: send-button hangs, browser/Computer Use issues, sandbox setup, reasoning-effort resets.
  - Copilot CLI: plugin update “Access is denied,” native-runtime crashes.
  - Pi: hardcoded `C:\`, Store aliases, RPC shutdown crashes, IME/Alt-key bugs.
  - Qwen Code: MCP STDIO failures, orphaned `conhost.exe`.

- **Plugin/skill standards and extensibility**
  - Claude Code: `claude plugin eval` for scored, reproducible plugin evaluation.
  - Codex: SKILL.md → Codex plugin converter, plugin/marketplace hygiene.
  - OpenCode: support for the Agent Plugins standard.
  - Copilot CLI: manual-only skills unreachable, AGENTS.md discovery boundaries.
  - Pi: extension API gaps around credential persistence and reload semantics.

- **Browser/computer-use integration**
  - Claude Code: VS Code browser-sharing API so agents can validate web UI changes.
  - Codex: browser extension management, API-key auth, native app access.
  - Gemini CLI: browser subagent reliability.
  - Qwen Code: Playwright-based Browser SDK.

- **Cost, context, and loop guardrails**
  - Claude Code: advisor tool doubles reported context size; uncapped self-check-ins.
  - OpenCode: subagent infinite loop, Copilot legacy quota consumed in one prompt.
  - Gemini CLI: `/compress` not persisted, >128 tools causes 400s.
  - Pi: compaction misfires on multi-megabyte tool results.
  - Codex: large local histories degrade desktop performance.

- **Privacy, redaction, and governance**
  - Qwen Code: telemetry exports full API request content despite `logPrompts=false`; raw tool-error text leaks.
  - Gemini CLI: secrets enter model context before prompt-level redaction.
  - Claude Code: governance hooks self-neutralize; auto-memory outranks project instructions.

## 4. Differentiation Analysis

| Tool | Primary focus | Target users | Technical approach |
|---|---|---|---|
| **Claude Code** | Plugin ecosystem, output styling, remote/cloud sessions, governance/context accounting | Anthropic ecosystem teams, plugin authors, enterprise governance | First-class plugin eval, Remote Control, memory/context management |
| **OpenAI Codex** | Windows parity, native app-server, voice/TUI, rollback/revert APIs | OpenAI/ChatGPT power users, Windows-heavy teams | Rust alpha train, app-server architecture, rapid API modernization |
| **Gemini CLI** | Security boundaries, sandboxing, AST-aware code intelligence | Google/enterprise, large MCP/tool users | OS/filesystem sandbox hardening, policy enforcement, codebase mapping |
| **GitHub Copilot CLI** | GitHub/VS Code integration, session/memory interchange, org policy | GitHub Enterprise developers | Copilot/VS Code ecosystem integration, enterprise auth and skills |
| **OpenCode** | Multi-provider flexibility, V2 beta stabilization, plugin portability | OSS developers, local/multi-provider users | Provider-agnostic packaging, stable `@opencode/*`, Agent Plugins |
| **Pi** | Windows first-class support, extension API, provider breadth | Extension authors, power users, non-standard terminals | Platform abstraction, Bedrock/Vertex/OpenAI-compatible fixes, system-message deltas |
| **Qwen Code** | Hooks parity, Linux sandboxing, browser automation, privacy | Qwen/enterprise, privacy-sensitive, web-automation users | bwrap kernel sandbox, Claude Code hook contract parity, telemetry redaction |

## 5. Community Momentum & Maturity

- **Highest raw engagement:** Claude Code. Issue #42776 has 178 comments and 88 👍, and the tracker shows a large active backlog. However, only one PR saw activity, suggesting the community can report faster than maintainers can merge.
- **Fastest iteration:** OpenAI Codex. Six Rust alpha tags, 12 PRs, and 10 discussions in one day, including high-signal requests like native `/rewind` (132 👍). Release notes are thin, but velocity is high.
- **Strong stabilization momentum:** OpenCode and Pi. OpenCode is fixing V2 packaging, signing, Docker paths, and TUI startup regressions. Pi is centralizing Windows shell discovery and advancing provider compatibility.
- **Security/enterprise hardening:** Gemini CLI and Qwen Code. Both are investing heavily in sandbox boundaries, path-traversal fixes, redaction, and CI/security gates.
- **Enterprise integration with lifecycle fragility:** GitHub Copilot CLI. The release adds useful import/completion features, but zero PR activity and recurring MCP/auth/session bugs suggest maintainer attention is elsewhere or gated.
- **Maturity profile:** Claude Code, Copilot CLI, and Gemini CLI look more mature in scope and enterprise posture, but carry long-running reliability debt. Codex, OpenCode, Pi, and Qwen Code are iterating faster, with more visible PR queues and platform-specific regressions.

## 6. Trend Signals

1. **Agent plugin/skill standards are forming.** Claude Code’s `plugin eval`, Codex’s SKILL.md converter, OpenCode’s Agent Plugins support, and Copilot’s skills/AGENTS.md work all point toward portable, CI-grade agent extensions.

2. **Sandboxing is becoming the default execution model.** Gemini’s filesystem isolation, Qwen’s bwrap backend, and Codex’s Windows sandbox setup reflect a shift from prompt-per-command to native execution inside strong OS boundaries.

3. **MCP is critical infrastructure—and still fragile.** Across Claude, Codex, Copilot, and Qwen, MCP lifecycle, OAuth, stdio cleanup, and connector scoping are recurring blockers. Developers should treat MCP reliability as a first-order deployment risk.

4. **Session state and context accounting are product differentiators.** Rewind/revert, memory portability, compaction persistence, and accurate usage reporting appear in nearly every community. Tools that get this right will win trust for long-running agent work.

5. **Windows and non-standard terminals are underserved.** Windows desktop lifecycle, shell discovery, IME, paste, and modifier-key handling generate disproportionate pain. Cross-platform parity remains a major opportunity.

6. **Privacy and governance are enterprise blockers.** Qwen’s telemetry redaction issues and Gemini’s Auto Memory concerns show that privacy switches must be enforceable, not best-effort.

7. **Cost and loop guardrails are missing defaults.** Runaway subagents, uncapped self-scheduling, context inflation, and quota exhaustion in a single prompt indicate users need circuit breakers, caps, and better attribution.

8. **Multi-provider abstraction is a competitive axis.** OpenCode, Pi, and Codex are all addressing provider routing, compatible proxies, Bedrock/Vertex support, and auth boundaries. Vendor lock-in is being actively challenged.

9. **Release engineering matters.** V2 Docker artifacts, Windows signing, nightly channels, and alpha tags are consuming maintainer time. Distribution quality is now part of the developer experience.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights — 2026-09-12

> Note: PR comment counts were not populated in the provided feed (`Comments: undefined`), so the ranking below follows the feed’s top-comments ordering plus update recency/impact. All listed PRs are `OPEN` unless otherwise noted.

## 1. Top Skills Ranking

| Rank | Skill / PR | Function | Discussion Highlights | Status |
|---|---|---|---|---|
| 1 | [skill-creator: fix `run_eval.py` 0% recall](https://github.com/anthropics/skills/pull/1298) | Repairs the evaluation harness used by `run_loop.py` and `improve_description.py`; fixes Windows stream reading, trigger detection, parallel workers. | Critical issue: every description reports `recall=0%`; description optimization is running against noise. References issue #556 and 10+ reproductions. | OPEN, updated 2026-09-11 |
| 2 | [Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734) | Extends DOCX skill to detect orphaned comments. | Recent high-attention PR; summary not provided, but topic fits document lifecycle hygiene. | OPEN, updated 2026-09-11 |
| 3 | [Add document-typography skill](https://github.com/anthropics/skills/pull/514) | Typographic quality control for generated documents. | Prevents orphan word wrap, widow paragraphs, and numbering misalignment; framed as universal document-quality pain. | OPEN, updated 2026-03-13 |
| 4 | [mcp-builder: support `mcp>=2` and custom headers](https://github.com/anthropics/skills/pull/1742) | Updates MCP Builder for `streamable_http_client` rename and header configuration changes. | Fixes issue #1668; addresses SDK drift in `mcp>=2.0.0`. | OPEN, updated 2026-09-11 |
| 5 | [Add `scnet-hpc` skill](https://github.com/anthropics/skills/pull/1615) | Operates SCNet HPC clusters through profile-based SSH and Slurm workflows. | Covers cluster discovery, Slurm jobs, modules, accelerators, profile refresh. | OPEN, updated 2026-08-24 |
| 6 | [pdf: correct case-sensitive file references](https://github.com/anthropics/skills/pull/538) | Fixes `SKILL.md` links such as `REFERENCE.md` → `reference.md` and `FORMS.md` → `forms.md`. | Breaks on case-sensitive filesystems; 8 mismatches fixed. | OPEN, updated 2026-04-29 |
| 7 | [Add ODT skill](https://github.com/anthropics/skills/pull/486) | OpenDocument text creation, template filling, parsing ODT to HTML. | Targets `.odt`, `.ods`, `.odf`, LibreOffice/open-source document workflows. | OPEN, updated 2026-04-14 |
| 8 | [Improve frontend-design skill clarity](https://github.com/anthropics/skills/pull/210) | Revises frontend-design Skill for clarity, actionability, and internal coherence. | Focus on instructions Claude can actually follow in one conversation. | OPEN, updated 2026-03-07 |

## 2. Community Demand Trends

From the Issues feed, the strongest demand is not simply “more skills” but **reliable, secure, and manageable Skill infrastructure**:

- **Skill evaluation and trigger reliability** — [Issue #556](https://github.com/anthropics/skills/issues/556), [Issue #202](https://github.com/anthropics/skills/issues/202), [Issue #1390](https://github.com/anthropics/skills/issues/1390). Users want `run_eval.py` to actually trigger skills, produce meaningful recall, and evaluate MCP servers correctly.
- **Trust, security, and governance** — [Issue #492](https://github.com/anthropics/skills/issues/492) has 43 comments and warns about community skills impersonating the `anthropic/` namespace. Related: [Issue #412](https://github.com/anthropics/skills/issues/412), [Issue #1175](https://github.com/anthropics/skills/issues/1175).
- **Org-wide sharing and marketplace hygiene** — [Issue #228](https://github.com/anthropics/skills/issues/228) requests shared skill libraries for teams; [Issue #189](https://github.com/anthropics/skills/issues/189) flags duplicate skills from `document-skills` and `example-skills`.
- **Context and token efficiency** — [Issue #1487](https://github.com/anthropics/skills/issues/1487) reports `claude-api` eagerly injecting ~156k tokens; [Issue #1329](https://github.com/anthropics/skills/issues/1329) proposes `compact-memory` for symbolic agent state.
- **Interoperability and portability** — [Issue #16](https://github.com/anthropics/skills/issues/16) asks for Skills exposed as MCPs; [Issue #29](https://github.com/anthropics/skills/issues/29) asks for AWS Bedrock support.
- **Output quality gates and review** — [Issue #1385](https://github.com/anthropics/skills/issues/1385) proposes calibration, adversarial review, and delivery verification; [Issue #1362](https://github.com/anthropics/skills/issues/1362) highlights build/toolchain fragility in `web-artifacts-builder`.

## 3. High-Potential Pending Skills

These open PRs are recent, issue-linked, or high-impact enough to plausibly land soon:

| PR | Area | Why It Matters | Status |
|---|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator evaluation | Fixes the 0% recall blocker affecting the whole description-optimization loop. | OPEN, updated 2026-09-11 |
| [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder compatibility | Unblocks `mcp>=2` users; directly fixes issue #1668. | OPEN, updated 2026-09-11 |
| [#1734](https://github.com/anthropics/skills/pull/1734) | DOCX comments | Adds orphaned-comment detection to an official document skill. | OPEN, updated 2026-09-11 |
| [#1615](https://github.com/anthropics/skills/pull/1615) | HPC/Slurm operations | Brings a vertical enterprise/HPC workflow into Skills. | OPEN, updated 2026-08-24 |
| [#1628](https://github.com/anthropics/skills/pull/1628) | Multi-agent orchestration | Hivemind delegates mechanical work to headless opencode workers; Claude Code stays planner/reviewer. | OPEN, updated 2026-08-24 |
| [#1627](https://github.com/anthropics/skills/pull/1627) | Buffer GraphQL API | Portable Agent Skill for social scheduling and analytics. | OPEN, updated 2026-09-05 |
| [#1607](https://github.com/anthropics/skills/pull/1607) | claude-api docs | Marks retired model IDs correctly; fixes issue #1603. | OPEN, updated 2026-09-01 |
| [#1602](https://github.com/anthropics/skills/pull/1602) | Evaluation/script stability | Fixes MCP serialization, benchmark metrics, encoding, and cross-platform stability. | OPEN, updated 2026-08-24 |

## 4. Skills Ecosystem Insight

The community’s most concentrated demand is **trustworthy Skill infrastructure** — reliable evaluation/triggering, namespace security, context efficiency, and team-grade sharing/governance — rather than just additional one-off Skills.

---

# Claude Code Community Digest — 2026-09-12

## Today's Highlights

Anthropic shipped **v2.1.269**, introducing `claude plugin eval` for scored, reproducible plugin evaluation (JSON + HTML reports) and an `/output-style [name]` command that works across Remote Control and cloud sessions. Issue traffic was dominated by **Cowork/Desktop networking regressions** on macOS, a cluster of Windows desktop lifecycle bugs, and long-running governance/context-accounting complaints. Notably, only one PR was touched in the last 24 hours, signaling a quiet merge window relative to the issue backlog.

## Releases

**v2.1.269**
- Added `claude plugin eval` — runs a plugin's eval suite against Claude Code with scored, reproducible results (JSON + HTML report). See `claude plugin eval --help`.
- Added `/output-style [name]` to list and switch output styles, including over Remote Control and in cloud environments.

*Takeaway:* Plugin authors now get first-class, automatable verification tooling — a meaningful step toward a real plugin ecosystem with CI-grade quality gates.

## Hot Issues

1. **[#42776](https://github.com/anthropics/claude-code/issues/42776)** — *Desktop fails to relaunch on Windows due to orphaned process file lock* (OPEN, 178 comments, 88 👍)
   The single highest-engagement issue in the tracker. A months-old Windows relaunch failure that keeps accumulating confirmations despite being labeled `invalid`. Community frustration is visible in the 👍 count.

2. **[#93507](https://github.com/anthropics/claude-code/issues/93507)** — *Cowork macOS: sandbox VM starts with no network route; egress proxy 403s every domain* (OPEN, 9 comments, regression since 2026-09-10 23:15 UTC)
   Fresh, well-pinned regression report with a precise timestamp. Because it breaks egress entirely while "All domains" is enabled, it effectively bricks Cowork networking on macOS.

3. **[#11897](https://github.com/anthropics/claude-code/issues/11897)** — *Claude Code on the Web: .NET SDK binary downloads blocked by proxy even with "All domains"* (OPEN, 21 comments, 25 👍)
   Long-lived (since Nov 2025) and still unresolved. Highlights a systemic gap between the "All domains" toggle and actual proxy allowlist behavior for toolchain bootstrapping.

4. **[#57034](https://github.com/anthropics/claude-code/issues/57034)** — *Support VS Code's browser-sharing API so Claude can validate web UI changes* (OPEN, 6 comments, 41 👍)
   The most-upvoted enhancement on the board. Directly addresses a core agentic gap: agents that can't see the browser can't verify front-end work.

5. **[#25947](https://github.com/anthropics/claude-code/issues/25947)** — *Store project memory files in project-local `.claude` folder* (OPEN, 9 comments, 39 👍)
   Persistent, high-demand request. Project memory currently lives under `~/.claude/projects/<encoded-path>/memory/`, which makes it unshareable, unversionable, and invisible to teammates.

6. **[#81620](https://github.com/anthropics/claude-code/issues/81620)** — *`advisor` tool doubles reported context size, firing auto-compact at ~50% of real window* (OPEN, 5 comments, 4 👍)
   The advisor's forwarded-transcript prompt is summed into the same `usage` block as the main turn, so Claude Code believes context is twice as full as it is. Silent quality and cost degradation.

7. **[#93494](https://github.com/anthropics/claude-code/issues/93494)** — *Cowork macOS: all outbound egress lost mid-session (desktop workspace + cloud container)* (OPEN, has repro, 5 comments, 4 👍)
   Companion to #93507. The mid-session failure mode is worse than a cold-start failure — it strands in-flight work.

8. **[#93087](https://github.com/anthropics/claude-code/issues/93087)** — *Stdio MCP servers still connecting at session end are never terminated and are orphaned* (OPEN, has repro, macOS/VSCode, 2 comments)
   MCP lifecycle hygiene. Orphaned processes accumulate across sessions — a deployment footgun for anyone running many short-lived agent runs.

9. **[#93722](https://github.com/anthropics/claude-code/issues/93722)** — *Desktop worktree sessions reload every claude.ai connector; per-project disable list doesn't follow worktrees* (OPEN, macOS, area:mcp, 1 comment)
   Freshly filed. Worktree-per-session isolation is defeated by connector re-injection, and `deniedMcpServers` can't suppress app-injected connectors at all.

10. **[#78146](https://github.com/anthropics/claude-code/issues/78146)** — *Windows Bash tool permanently wedged: `CLAUDE_ENV_FILE` grows on every compact* (OPEN, has repro, 2 comments)
    A torn export line (`line 182: e: command not found`, exit 127) permanently breaks every Bash command in long sessions. Unbounded env accumulation with no dedup or truncation.

*Also notable:* [#89992](https://github.com/anthropics/claude-code/issues/89992) (MSIX auto-update kills running app), [#93738](https://github.com/anthropics/claude-code/issues/93738) (session resume fails after `claude stop` on v2.1.269), [#93607](https://github.com/anthropics/claude-code/issues/93607) (`pkill -f`/`pgrep -f` match the tool's own wrapper), [#93679](https://github.com/anthropics/claude-code/issues/93679) (Design window renderer grows to 2–4GB and is OOM-killed), [#93743](https://github.com/anthropics/claude-code/issues/93743) (non-ASCII path slugs collide, merging unrelated projects' storage).

## Key PR Progress

Only **one** pull request saw activity in the last 24 hours — a notably thin pipeline given 50 active issues.

1. **[#42205](https://github.com/anthropics/claude-code/pull/42205)** — `fix(hookify): normalize tool matcher parsing` (CLOSED, Balajitechlabs)
   Trims matcher strings before evaluation and normalizes each OR segment, fixing cases like `Edit | Write` where untrimmed values failed comparison. Small but high-leverage for anyone relying on matcher-based hook routing.

*Observation:* A single, long-dormant community PR closing is not enough throughput for a backlog this size. The absence of an active community PR queue suggests contributions are largely gated to issue reporting.

## Hot Discussions

*No discussion data was provided in the source dataset; this section is omitted.*

## Feature Request Trends

- **Project-local, shareable state** — [#25947](https://github.com/anthropics/claude-code/issues/25947) (39 👍): memory should live in `<project>/.claude/memory/`, not a global encoded-path slug. Related: [#93743](https://github.com/anthropics/claude-code/issues/93743), where non-ASCII path slugging causes cross-project storage collisions.
- **Deeper IDE/agent integration** — [#57034](https://github.com/anthropics/claude-code/issues/57034) (41 👍): adopt VS Code's browser-sharing API so agents can read DOM, screenshots, console output, and navigation to self-validate web UI changes.
- **Fewer permission interruptions in read-only modes** — [#80846](https://github.com/anthropics/claude-code/issues/80846): Plan mode still prompts for every read-only Bash command (`git log`, `jq`, `python3 -c`) with no auto-approve path.
- **Enforceable project governance** — [#82184](https://github.com/anthropics/claude-code/issues/82184): enforcement hooks self-neutralize, compaction drops governance while preserving narrative, and auto-memory outranks project instructions.
- **UI customization / statusline control** — [#93667](https://github.com/anthropics/claude-code/issues/93667) (6 👍): restore the IDE selection indicator to the footer instead of inlining it in the prompt after v2.1.268's footer change.
- **Cost guardrails** — [#77310](https://github.com/anthropics/claude-code/issues/77310): recurring PR-watch self-check-ins had no cycle limit or cost cap, draining multi-day usage budgets.

## Developer Pain Points

1. **Windows desktop lifecycle is the top frustration.** Orphaned file locks blocking relaunch ([#42776](https://github.com/anthropics/claude-code/issues/42776), 178 comments), MSIX auto-update terminating the running app ([#89992](https://github.com/anthropics/claude-code/issues/89992)), and a vanishing Code tab ([#86576](https://github.com/anthropics/claude-code/issues/86576)) form a consistent pattern of packaging/process-management defects.
2. **Cowork sandbox networking is regressing faster than it's being fixed.** Two near-identical macOS reports in 48 hours ([#93507](https://github.com/anthropics/claude-code/issues/93507), [#93494](https://github.com/anthropics/claude-code/issues/93494)) plus the year-old proxy allowlist gap ([#11897](https://github.com/anthropics/claude-code/issues/11897)) all share one root complaint: "All domains" doesn't mean all domains.
3. **Context and cost accounting is untrustworthy.** Inflated `usage` from the advisor tool ([#81620](https://github.com/anthropics/claude-code/issues/81620)) causes premature compaction; uncapped self-scheduling loops ([#77310](https://github.com/anthropics/claude-code/issues/77310)) drain budgets; safeguards false-positive on legitimate work ([#86687](https://github.com/anthropics/claude-code/issues/86687)).
4. **Resource and process cleanup is an afterthought.** Orphaned stdio MCP servers ([#93087](https://github.com/anthropics/claude-code/issues/93087)), unbounded Bash env growth ([#78146](https://github.com/anthropics/claude-code/issues/78146)), and a Design renderer ballooning to 2–4GB ([#93679](https://github.com/anthropics/claude-code/issues/93679)).
5. **MCP/connector scoping doesn't respect project boundaries.** Worktree sessions reload every account connector, and per-project disable lists neither follow worktrees nor respond to `deniedMcpServers` ([#93722](https://github.com/anthropics/claude-code/issues/93722)).
6. **Triage transparency concerns.** A large share of items are closed as `stale` or `invalid` while high-vote, reproducible bugs remain open — visible in today's list ([#42776](https://github.com/anthropics/claude-code/issues/42776), [#86436](https://github.com/anthropics/claude-code/issues/86436), [#86686](https://github.com/anthropics/claude-code/issues/86686)). Combined with a one-PR day, this amplifies the perception that community signal outpaces maintainer throughput.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-12

## 1. Today's Highlights
Windows reliability remains the dominant theme: top issues cover desktop send-button hangs, browser control with API-key auth, Computer Use native-app access, sandbox setup failures, and chat-history desync. The strongest community signal is still the request for native `/rewind`/`/revert` support ([Discussion #9618](https://github.com/openai/codex/discussions/9618), 132 👍), while PR activity moves thread rollback toward newer APIs and promotes voice/TUI work. The Rust alpha release train also continued with six alpha tags in the last 24h, though release notes contain only version strings.

## 2. Releases
Six Rust alpha releases were published in the last 24h:
- `rust-v0.155.0-alpha.3.10`, `.9`, `.8`, `.7`, `.3`
- `rust-v0.154.0-alpha.6.2`

No substantive changelog was provided beyond the version bump. This indicates rapid alpha iteration rather than a stable feature release. See [openai/codex releases](https://github.com/openai/codex/releases).

## 3. Hot Issues
- [Issue #40968](https://github.com/openai/codex/issues/40968) — **Windows Codex desktop send button spins forever**: blocks follow-up prompts entirely on Windows 11; 36 comments and 6 👍 show active reproduction. High-severity app usability bug.
- [Issue #44720](https://github.com/openai/codex/issues/44720) — **“ChatGPT hit a snag” reproducible app bug**: closed quickly after 31 comments and 5 👍, suggesting a high-impact crash/regression received rapid triage.
- [Issue #20730](https://github.com/openai/codex/issues/20730) — **Custom pets fail in WSL due to path normalization**: 27 comments and 30 👍 make this one of the most upvoted active issues, despite being a narrow feature.
- [Issue #43410](https://github.com/openai/codex/issues/43410) — **Windows browser control fails with API-key auth**: 22 comments and 13 👍. The browser extension connects, but Codex rejects `apikey` auth for browser operations.
- [Issue #18693](https://github.com/openai/codex/issues/18693) — **Desktop performance collapses with very large local histories**: 20 comments and 9 👍. Impacts typing, scrolling, thread list rendering, and random exits for power users.
- [Issue #42435](https://github.com/openai/codex/issues/42435) — **Windows reasoning effort resets from Extra High to Instant**: 14 comments. Persistent settings regression that undermines model configuration trust.
- [Issue #43596](https://github.com/openai/codex/issues/43596) — **Windows Computer Use cannot access native apps**: empty app inventory and unavailable sky RPC break the Computer Use workflow; 12 comments.
- [Issue #44035](https://github.com/openai/codex/issues/44035) — **Windows recent chat history disappears while rollout retains newer messages**: 8 comments. Points to stale `read_thread` state versus newer local records.
- [Issue #44743](https://github.com/openai/codex/issues/44743) — **macOS app blank window from circular import**: 8 comments and 4 👍. A rollback workaround exists, but this is a critical launch regression.
- [Issue #44398](https://github.com/openai/codex/issues/44398) — **Astra composer sparkle animation blocks mouse text selection in kitty**: 5 comments and 8 👍. A focused TUI accessibility/terminal-compatibility annoyance with strong community agreement.

## 4. Key PR Progress
- [PR #44945](https://github.com/openai/codex/pull/44945) — **Route TUI Windows sandbox setup through the app server**: handles elevated and unelevated setup, completion notifications, and verifies effective sandbox mode.
- [PR #44939](https://github.com/openai/codex/pull/44939) — **Respect execution hosts in Windows sandbox setup**: prevents the TUI from configuring a remote executor’s sandbox and ties setup readiness to the local app server.
- [PR #44944](https://github.com/openai/codex/pull/44944) — **Enforce managed provider requirements on existing app-server threads**: revalidates retained model providers against current managed requirements.
- [PR #25383](https://github.com/openai/codex/pull/25383) — **App-server account session lifecycle for multi-account profile switching**: adds login/add/list/switch/logout routes for Desktop multi-account support.
- [PR #44921](https://github.com/openai/codex/pull/44921) — **Enable TUI voice conversations by default**: promotes `realtime_conversation` to stable and removes the experimental announcement.
- [PR #44922](https://github.com/openai/codex/pull/44922) — **Bundle native voice runtimes in Windows releases**: adds voice helper/native audio libraries and Windows certificate validation for realtime TLS.
- [PR #44946](https://github.com/openai/codex/pull/44946), [PR #44935](https://github.com/openai/codex/pull/44935), [PR #44930](https://github.com/openai/codex/pull/44930) — **Retire/remove personality selection**: removes `/personality` TUI flows and embeds fixed friendly instructions in bundled GPT-5.4/5.5 presets.
- [PR #44915](https://github.com/openai/codex/pull/44915) — **Remove deprecated `thread/rollback` API**: drops old request/response types and core op, steering clients toward `thread/revert`.
- [PR #44932](https://github.com/openai/codex/pull/44932) — **Unify context snapshots and group requests into windows**: improves request-history inspection by rendering appended items and boundary windows consistently.
- [PR #44938](https://github.com/openai/codex/pull/44938) — **Detect connector auth failures without an install URL**: allows valid auth-failure metadata to be recognized even when no install URL is present.

## 5. Hot Discussions

### Ideas
- [Discussion #9618](https://github.com/openai/codex/discussions/9618) — **Native `/rewind` or `/revert` feature**: 23 comments and 132 👍. The community compares Codex unfavorably to OpenCode and Claude Code for undo support.
- [Discussion #41716](https://github.com/openai/codex/discussions/41716) — **ChatGPT Planner & Codex Worker orchestration**: proposes ChatGPT as persistent planner/project lead with Codex instances as execution workers.
- [Discussion #44797](https://github.com/openai/codex/discussions/44797) — **First-class browser extension management**: asks Codex to open extension popups, invoke actions, configure options, and manage permissions.
- [Discussion #44792](https://github.com/openai/codex/discussions/44792) — **Universal live Google knowledge integration**: requests synced indexing of Drive folders, Calendar, and Keep.
- [Discussion #27754](https://github.com/openai/codex/discussions/27754) — **AGENTS.md reusable project guidance maps**: a plugin experiment for generating compact repository-local action maps.

### General
- [Discussion #40132](https://github.com/openai/codex/discussions/40132) — **What are you building with Codex?**: open thread for workflows, projects, and tips from newer Codex users.

### Show and tell
- [Discussion #44453](https://github.com/openai/codex/discussions/44453) — **`OPENAI_BASE_URL` behavior with `config.toml` and a record/replay tool**: explains origin-resolution friction and shares OrcaReplay.
- [Discussion #44643](https://github.com/openai/codex/discussions/44643) — **CoCo: Codex Coordinator**: organizes and resumes parallel Codex work across terminals and repositories.
- [Discussion #44153](https://github.com/openai/codex/discussions/44153) — **isitdone Stop hook**: blocks “done” claims until tests, typecheck, and lint pass on the working tree.
- [Discussion #44843](https://github.com/openai/codex/discussions/44843) — **SKILL.md → Codex plugin bundle converter**: MIT, stdlib-only tool for converting Agent Skills into Codex plugin manifests.

## 6. Feature Request Trends
- **Undo/rewind/revert**: The highest-engagement discussion asks for first-class rollback, reinforced by PRs replacing deprecated `thread/rollback` with `thread/revert`. [#9618](https://github.com/openai/codex/discussions/9618)
- **Cross-device session/history sync**: Repeated reports of stale checkpoints, missing threads, duplicate IDs, and account-scoped projects. [#29163](https://github.com/openai/codex/issues/29163), [#43017](https://github.com/openai/codex/issues/43017), [#43434](https://github.com/openai/codex/issues/43434), [#44035](https://github.com/openai/codex/issues/44035), [#44409](https://github.com/openai/codex/issues/44409)
- **Windows parity and reliability**: Sandbox setup, browser auth, Computer Use, app hangs, reasoning-effort persistence, and execpolicy false positives remain recurring. [#40968](https://github.com/openai/codex/issues/40968), [#43410](https://github.com/openai/codex/issues/43410), [#43596](https://github.com/openai/codex/issues/43596), [#44783](https://github.com/openai/codex/issues/44783)
- **Remote control and orchestration**: Users want Windows-to-Windows remote control, mobile/desktop consistency, and planner/worker orchestration. [#34028](https://github.com/openai/codex/issues/34028), [#41716](https://github.com/openai/codex/discussions/41716)
- **Browser and computer-use integration**: API-key auth support, native app inventory, trusted RPC availability, and browser extension management are frequent asks. [#43410](https://github.com/openai/codex/issues/43410), [#42745](https://github.com/openai/codex/issues/42745), [#44797](https://github.com/openai/codex/discussions/44797)
- **Plugin/skills/config hygiene**: Project-level skill disabling, marketplace cleanup, AGENTS.md maps, and SKILL.md conversion show demand for better plugin lifecycle control. [#24237](https://github.com/openai/codex/issues/24237), [#39421](https://github.com/openai/codex/issues/39421), [#27754](https://github.com/openai/codex/discussions/27754)
- **CLI/TUI accessibility and terminal compatibility**: tmux hangs, VoiceOver regressions, kitty selection issues, and incorrect non-interactive exit codes remain active. [#44767](https://github.com/openai/codex/issues/44767), [#44728](https://github.com/openai/codex/issues/44728), [#44398](https://github.com/openai/codex/issues/44398), [#15536](https://github.com/openai/codex/issues/15536)

## 7. Developer Pain Points
- **Windows remains the highest-friction platform**: sandbox creation, browser/Computer Use, auth methods, app send actions, and settings persistence are all producing active bug reports. [#44783](https://github.com/openai/codex/issues/44783), [#40968](https://github.com/openai/codex/issues/40968), [#43410](https://github.com/openai/codex/issues/43410), [#29782](https://github.com/openai/codex/issues/29782), [#40060](https://github.com/openai/codex/issues/40060)
- **Session/history state is unreliable across surfaces**: users report missing recent turns, stale checkpoints, duplicate thread IDs, and history that does not match local rollout data. [#44035](https://github.com/openai/codex/issues/44035), [#44409](https://github.com/openai/codex/issues/44409), [#43017](https://github.com/openai/codex/issues/43017), [#43434](https://github.com/openai/codex/issues/43434)
- **Large conversation histories degrade desktop performance**: a profile with a few very large local threads can slow typing, scrolling, and thread-list rendering. [#18693](https://github.com/openai/codex/issues/18693)
- **Auth and provider configuration still surprise users**: API-key auth can break browser control, and `OPENAI_BASE_URL` behavior is unclear when `config.toml` exists. [#43410](https://github.com/openai/codex/issues/43410), [#44453](https://github.com/openai/codex/discussions/44453)
- **CLI correctness and terminal compatibility need attention**: `codex exec` can exit 0 after a failed command, and TUI regressions affect tmux, VoiceOver, and kitty selection. [#15536](https://github.com/openai/codex/issues/15536), [#43820](https://github.com/openai/codex/issues/43820), [#44767](https://github.com/openai/codex/issues/44767), [#44728](https://github.com/openai/codex/issues/44728)
- **Plugin/marketplace resource leaks are severe**: one report shows 559 GB and 4,972 orphaned staging directories over 41 days. [#39421](https://github.com/openai/codex/issues/39421)

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-12

## 1. Today's Highlights

This cycle is dominated by a hardening pass on security boundaries: sandbox filesystem isolation, checkpoint path-traversal fixes, and a Windows `git diff --output` argument-validation patch all landed or advanced in the PR queue. Agent reliability remains the top community complaint, with the long-running "generalist agent hangs" (#21409) and MAX_TURNS-misreported-as-success (#22323) issues still the highest-engagement items. Only one nightly release shipped, containing no user-facing changes.

## 2. Releases

**v0.61.0-nightly.20260911.ged2ac40df** — automated nightly bump ([PR #29285](https://github.com/google-gemini/gemini-cli/pull/29285)). No changelog entries beyond the version increment; compare against the prior nightly [here](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260910.ged2ac40df...v0.61.0-nightly.20260911.ged2ac40df).

## 3. Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent MAX_TURNS reported as GOAL success** (p1, 13 comments, 👍2). `codebase_investigator` returns `status: "success"` / `Termination Reason: "GOAL"` despite hitting its turn limit before doing any analysis. This silently corrupts agent telemetry and makes eval results untrustworthy — the highest-comment issue of the window.
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs indefinitely** (p1, 8 comments, 👍8). Trivial tasks (e.g. folder creation) hang for up to an hour once delegation occurs; avoiding subagents is the only workaround. Highest 👍 count in the list signals broad user impact.
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-dependency OS sandboxing + post-execution intent routing** (p2, 9 comments). Proposes letting Gemini 3's native bash affinity run freely inside an OS sandbox rather than prompting per command — a foundational design direction tying together several sandbox PRs below.
4. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell commands stuck at "Waiting input" after completion** (p1, 4 comments, 👍3). CLI hangs on simple commands that never request stdin, blocking multi-step workflows.
5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini rarely invokes skills/sub-agents unprompted** (p2, 6 comments). Users report explicit instruction is required even for near-identical tasks, undermining the extensibility model.
6. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails on Wayland** (p1). Reports a false "Termination Reason: GOAL" despite failure — the same misleading-status class as #22323.
7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Deterministic redaction for Auto Memory** (p2, area/security). Secrets enter model context *before* prompt-level redaction runs, and skill content lands in logs. A real compliance concern.
8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 400 error with >128 tools** (p2). The agent doesn't prune tool scope intelligently, hard-failing on large MCP/tool setups.
9. **[#21335](https://github.com/google-gemini/gemini-cli/issues/21335) — `/compress` not persisted across session resume** (p2, 👍2). Compression exists only in memory, so token costs return on resume — a straightforward but high-annoyance bug.
10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — Discourage destructive agent behavior** (p2, 👍1). Agent reaches for `git reset`/`--force` when safer paths exist; ties to ongoing sandbox and policy work.
11. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — AST-aware file reads, search, and codebase mapping** (p2 epic). Could cut misaligned reads and token noise — the clearest architectural bet in the backlog.

## 4. Key PR Progress

1. **[#29282](https://github.com/google-gemini/gemini-cli/pull/29282) — Persist OAuth credentials after login** (OPEN). Stops the CLI from re-prompting for Google sign-in after a successful browser/user-code flow.
2. **[#29283](https://github.com/google-gemini/gemini-cli/pull/29283) / [#29214](https://github.com/google-gemini/gemini-cli/pull/29214) — Harden sandbox filesystem boundaries** (CLOSED). Read-only config access plus ephemeral runtime state across Docker, Podman, runsc, LXC, and macOS Seatbelt.
3. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250) — Block indirect prompt injection via build files** (CLOSED). Refactors `shell`, `edit`, and `write_file` to enforce workspace-boundary validation in restricted mode.
4. **[#29184](https://github.com/google-gemini/gemini-cli/pull/29184) — Validate git args in Windows sandbox** (OPEN, p1/security). Closes a silent-truncation hole where `git diff --output=<path>` ran unprompted in non-YOLO mode.
5. **[#29287](https://github.com/google-gemini/gemini-cli/pull/29287) — Map `--yolo` to `allowedTools: ["*"]`** (CLOSED). Removes `ApprovalMode.YOLO` as a distinct state, unifying policy handling (closes #11303).
6. **[#29192](https://github.com/google-gemini/gemini-cli/pull/29192) — Contain legacy raw-tag checkpoint path** (OPEN, p1/security). Fixes `/chat delete <tag>` with `../` deleting files outside the checkpoints directory.
7. **[#29195](https://github.com/google-gemini/gemini-cli/pull/29195) — Degrade non-array checkpoint history instead of crashing** (OPEN). `/resume` no longer throws a raw `TypeError` on malformed checkpoint files.
8. **[#29186](https://github.com/google-gemini/gemini-cli/pull/29186) — Fix `exitCode` null check in sandbox denial heuristic** (OPEN, fixes #29043). `exitCode` is `number | null`, so the existing check misfires on sandbox denials.
9. **[#29188](https://github.com/google-gemini/gemini-cli/pull/29188) — Exact include-pattern matching in `read-many-files`** (OPEN, p1). Replaces substring matching that wrongly treated binary assets as explicitly requested.
10. **[#29110](https://github.com/google-gemini/gemini-cli/pull/29110) — Route `read_file` through `FileSystemService`** (CLOSED). Enables ACP clients advertising `fs.readTextFile` to actually serve reads instead of hitting local disk.
11. **[#29208](https://github.com/google-gemini/gemini-cli/pull/29208) — Fall back on malformed `agents.json`** (CLOSED). Prevents `TypeError` crashes from interrupted saves or hand-edited config.
12. **[#29190](https://github.com/google-gemini/gemini-cli/pull/29190) — Fix VS Code companion disposables** (OPEN). Comma-operator bug left commands and workspace-folder listeners undisposed on deactivation.

## 5. Hot Discussions

No Discussion data was provided for this window; this section is omitted.

## 6. Feature Request Trends

- **Sandboxing as a first-class execution model** — Multiple threads (#19873, #29283, #29214, #29184) converge on letting the model use bash natively inside strong OS/filesystem isolation rather than prompting per command.
- **AST-aware code intelligence** — #22745 and #22746 push toward AST-based reads, search, and codebase mapping to reduce turns and token noise for `codebase_investigator`.
- **Persistent, durable state** — #18836 (replace in-context `WriteToDo` with file-based CRUD) and #21335 (`/compress` persistence) both ask the CLI to stop losing state between sessions.
- **Subagent observability** — #22598 (`/chat share` for subagent trajectories) and #21763 (bug reports lack subagent context) target diagnosability of delegated work.
- **Agent self-awareness and restraint** — #21432 (accurate CLI flags/hotkeys) and #22672 (avoid destructive git operations) ask the agent to reason about its own capabilities and blast radius.
- **Developer-friendly tool scoping** — #24246 requests smarter tool pruning for large MCP setups.

## 7. Developer Pain Points

- **Hangs and false-completion are the dominant frustration.** #21409 (generalist agent hangs), #25166 (shell stuck at "Waiting input"), #22465 (vite interactive prompt deadlock), and #22186 (hook crash) all describe workflows that simply stall.
- **Subagent status reporting is untrustworthy.** #22323 and #21983 both show failures or turn-limit exhaustion surfaced as `GOAL`/`success`, which breaks automation and eval harnesses.
- **Configuration is silently ignored.** #22267 (browser agent ignores `settings.json` `maxTurns`), #20079 (symlinked agent files not recognized), and #29208 (corrupt `agents.json` crash) point to brittle config loading.
- **Security boundary gaps in the CLI itself.** Path traversal in checkpoints (#29192), unvalidated Windows git args (#29184), non-deterministic secret redaction (#26525), and silent invalid-patch skipping in memory inbox (#26523) are a recurring theme this cycle.
- **Token and context economics.** #19561 ("Tactful Extraction"), #21335 (`/compress` non-persistent), and #24246 (tool-count 400s) reflect ongoing cost/context-management strain.
- **Workspace hygiene.** #23571 (model scatters temp scripts across directories) creates cleanup overhead before clean commits.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## Today's Highlights

Today’s release **v1.0.84-5** adds session and memory import commands for a semantic JSONL interchange format, plus shell completions generated from the CLI’s own parser grammar. The issue queue is still dominated by MCP/session lifecycle reliability, authentication friction, and platform stability—especially around resume/clear behavior and long-running sessions. No pull requests were updated in the last 24 hours.

## Releases

- [v1.0.84-5](https://github.com/github/copilot-cli/releases/tag/v1.0.84-5)
  - **Added:** Session and memory import commands for the semantic JSONL interchange format.
  - **Improved:** Shell completions are generated from the same grammar the CLI parses with, so `copilot <TAB>` offers root flags alongside subcommands and each subcommand offers only its own options.
  - The release excerpt also includes a truncated `Command` improvement item; no further details were provided.

## Hot Issues

- [#4438](https://github.com/github/copilot-cli/issues/4438) — **Skills become unreachable when marked manual-only.** `disable-model-invocation: true` causes explicit invocation to fail with `Skill not found`, even though the skill appears in `copilot skill list`. This breaks expected manual-only skill workflows. **Reaction:** 5 comments, 7 👍.
- [#4753](https://github.com/github/copilot-cli/issues/4753) — **Session resume cancels in-flight stdio MCP connections.** In v1.0.83, resume tears down still-initializing MCP servers with a ~1s timeout, leaving them silently unavailable for the session. This is a serious MCP/session regression. **Reaction:** 4 comments, 1 👍.
- [#3700](https://github.com/github/copilot-cli/issues/3700) — **High-severity WSL2 idle CPU spin.** The main thread spins at ~215% CPU while idle, and TUI output freezes until restart. Marked as a regression of #2208, making it a top platform-stability concern. **Reaction:** 4 comments, 2 👍.
- [#1168](https://github.com/github/copilot-cli/issues/1168) — **Authorization fatigue.** A single high-level request can produce more than a dozen confirmation prompts, slowing workflows and encouraging blind approvals. This is a long-standing UX/trust issue. **Reaction:** 4 comments, 2 👍.
- [#4764](https://github.com/github/copilot-cli/issues/4764) — **Assisted permissions expire after ~1 hour.** Auto-approval stops working until a new session is started, disrupting long-running work in permissions-assisted mode. **Reaction:** 4 comments.
- [#4795](https://github.com/github/copilot-cli/issues/4795) — **Atlassian MCP OAuth callback mismatch.** OAuth fails because the CLI uses a random callback port instead of the registered `33418`, blocking Atlassian MCP usage on WSL/Ubuntu. **Reaction:** 3 comments, 3 👍.
- [#4699](https://github.com/github/copilot-cli/issues/4699) — **OOM crashes on long resumed sessions.** V8 heap OOMs at the 4 GiB cap during long `--resume` sessions, and crash dumps are written into the user’s current working directory. **Reaction:** 3 comments, 5 👍.
- [#4095](https://github.com/github/copilot-cli/issues/4095) — **Windows plugin updates fail with “Access is denied.”** Plugin update fails while VS Code is running because the Copilot extension holds watcher handles on installed plugins. High community signal for a Windows workflow blocker. **Reaction:** 2 comments, 21 👍.
- [#4370](https://github.com/github/copilot-cli/issues/4370) — **MCP initialization fails on `server/discover` errors.** FastMCP returns `-32602 Invalid request parameters`, and Copilot treats that as fatal during MCP initialization. This highlights MCP interoperability gaps. **Reaction:** 3 comments, 3 👍.
- [#4026](https://github.com/github/copilot-cli/issues/4026) — **Windows native-runtime crashes persist across versions.** Users report frequent, unpredictable crashes since at least May 2026 across multiple versions, with no clear single trigger. **Reaction:** 3 comments.

## Key PR Progress

No pull requests were updated in the last 24 hours (0 items), so there is no PR-level progress to summarize.

## Feature Request Trends

- **Session continuity and memory portability:** Users want cross-session context querying ([#2436](https://github.com/github/copilot-cli/issues/2436)), better resume behavior, and import/export of session memory. The new v1.0.84-5 import commands align with this direction.
- **Lifecycle automation and hooks:** Requests for an end-of-session hook ([#4820](https://github.com/github/copilot-cli/issues/4820)) and more reliable queued prompts ([#4824](https://github.com/github/copilot-cli/issues/4824)) show demand for scriptable session workflows.
- **MCP auth and interoperability:** Multiple issues point to OAuth callback handling, token refresh, and stricter MCP lifecycle compliance ([#4795](https://github.com/github/copilot-cli/issues/4795), [#4370](https://github.com/github/copilot-cli/issues/4370), [#4809](https://github.com/github/copilot-cli/issues/4809)).
- **Cost and model selection controls:** Requests include OpenAI Flex tier support ([#4821](https://github.com/github/copilot-cli/issues/4821)) and better handling of org-policy model lists ([#4819](https://github.com/github/copilot-cli/issues/4819)).
- **Skill and instruction UX:** Users want predictable skill invocation ([#4438](https://github.com/github/copilot-cli/issues/4438)), cleaner `/skills list` output ([#4823](https://github.com/github/copilot-cli/issues/4823)), and tighter AGENTS.md discovery boundaries ([#4822](https://github.com/github/copilot-cli/issues/4822)).

## Developer Pain Points

- **MCP lifecycle fragility:** Resume, `/clear`, startup reconciliation, OAuth, and non-standard `server/discover` handling repeatedly strand MCP servers or crash spec-compliant ones. See [#4753](https://github.com/github/copilot-cli/issues/4753), [#4370](https://github.com/github/copilot-cli/issues/4370), [#4636](https://github.com/github/copilot-cli/issues/4636), [#4818](https://github.com/github/copilot-cli/issues/4818), and [#4809](https://github.com/github/copilot-cli/issues/4809).
- **Authentication and permissions friction:** Excessive prompts, expiring assisted mode, and broken OAuth refresh/callback flows make long sessions unreliable ([#1168](https://github.com/github/copilot-cli/issues/1168), [#4764](https://github.com/github/copilot-cli/issues/4764), [#4795](https://github.com/github/copilot-cli/issues/4795), [#4464](https://github.com/github/copilot-cli/issues/4464)).
- **Resource and long-session stability:** WSL2 CPU spin, Windows crashes, and resume-session OOMs remain active blockers ([#3700](https://github.com/github/copilot-cli/issues/3700), [#4026](https://github.com/github/copilot-cli/issues/4026), [#4699](https://github.com/github/copilot-cli/issues/4699)).
- **Installer and platform setup failures:** Voice runtime installs fail via private Azure feeds, Windows sandbox support is inconsistent, and PATH handling breaks on long environments ([#4035](https://github.com/github/copilot-cli/issues/4035), [#4814](https://github.com/github/copilot-cli/issues/4814), [#4652](https://github.com/github/copilot-cli/issues/4652), [#4816](https://github.com/github/copilot-cli/issues/4816)).
- **Skill/context discovery edge cases:** Manual-only skills can become unreachable, duplicate skill lookups create noise, and AGENTS.md discovery may import unrelated repos via symlink ancestry ([#4438](https://github.com/github/copilot-cli/issues/4438), [#4637](https://github.com/github/copilot-cli/issues/4637), [#4822](https://github.com/github/copilot-cli/issues/4822)).
- **TUI/input regressions:** Users continue to hit issues with `@` file references, `ask_user` choice rendering, and `ctrl-t` prompt enqueueing ([#3854](https://github.com/github/copilot-cli/issues/3854), [#4817](https://github.com/github/copilot-cli/issues/4817), [#4824](https://github.com/github/copilot-cli/issues/4824)).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-12

## 1. Today's Highlights
Stabilization of the **2.0 (V2) beta** dominates activity: release engineering fixes for V2 Docker artifacts, Windows CLI signing, and stable `@opencode/*` package paths landed today, while TUI startup regression fixes (theme detection, home prompt rendering) continue to stack. On the issue tracker, billing/quota integrity is the loudest theme — a paid **OpenCode Go** subscription stuck behind an "Insufficient balance" error and a **Copilot legacy plan** being fully consumed by a single V2 prompt. Reliability concerns also persist around subagent loop protection (#45442) and corrupted tool-call arguments in V2 (#47902).

## 2. Releases
No new releases in the last 24 hours.

## 3. Hot Issues

1. **#37790 — [BUG] Paid OpenCode Go subscription shows "Insufficient balance"** (18 comments, OPEN)
   A Stripe payment succeeds but the workspace never provisions the entitlement, blocking paid users entirely. Highest-engagement issue of the day and a trust/revenue-critical failure.
   https://github.com/anomalyco/opencode/issues/37790

2. **#30308 — [FEATURE] Claude Code-style dynamic workflows** (10 comments, 👍5)
   Requests parity with Claude Code's declarative workflow system. Signals demand for orchestratable, multi-step agent pipelines rather than ad-hoc prompting.
   https://github.com/anomalyco/opencode/issues/30308

3. **#37231 — [CLOSED] "Error from provider (Console Go): Upstream request failed"** (9 comments)
   All Go models failed across CLI, desktop, and OpenChamber simultaneously — a broad provider-side outage. Closed, but illustrates recurring platform dependency fragility.
   https://github.com/anomalyco/opencode/issues/37231

4. **#7963 — [CLOSED] Undo message only, keep file changes (like Claude Code)** (9 comments, 👍12)
   Long-standing UX request: `/undo` currently reverts both conversation and files; users want to clean up history while preserving code. Strong upvote support across nine months.
   https://github.com/anomalyco/opencode/issues/7963

5. **#45442 — [2.0] Subagent infinite loop: 364 identical grep calls over ~50 min** (8 comments, 👍1)
   A `general` subagent issued 364 identical tool calls with no loop protection, causing uncontrollable token burn. Highlights a missing safety rail in V2 agent orchestration.
   https://github.com/anomalyco/opencode/issues/45442

6. **#36241 — macOS: `reasoning part rs_*:0 not found` aborts on gpt-5.6-sol-fast/high** (7 comments, 👍2)
   Streaming aborts mid-reasoning with Codex OAuth. Persistent, reproducible and disruptive for OpenAI-via-OAuth users.
   https://github.com/anomalyco/opencode/issues/36241

7. **#40993 — [FEATURE] Support the Agent Plugins standard (agent-plugins.org)** (6 comments, 👍12)
   Proposal to adopt the vendor-neutral packaging spec bundling Agent Skills + MCP servers. High upvote count reflects appetite for portability across agent vendors.
   https://github.com/anomalyco/opencode/issues/40993

8. **#48330 — [2.0] Copilot legacy plan fully consumed by a single prompt** (6 comments)
   A 1,500-request/month Copilot subscription was exhausted in one session, ending in HTTP 429. Regression versus OpenCode 1 — a serious multi-request accounting bug.
   https://github.com/anomalyco/opencode/issues/48330

9. **#27110 — [FEATURE] Setting to limit max parallel subagents** (5 comments, 👍32)
   The most upvoted issue in the set. Local-model users need a concurrency cap to avoid context/memory exhaustion.
   https://github.com/anomalyco/opencode/issues/27110

10. **#47902 — [2.0] Tool-call arguments corrupt across calls; schema-invalid calls can execute** (4 comments)
    Arguments leaked serialization markers (`<|DELIM_AE|>step_type...`), were truncated, or mixed fields — yet executed anyway. Correctness and safety risk in the V2 tool pipeline.
    https://github.com/anomalyco/opencode/issues/47902

*Also notable:* #10939 (CLOSED) — `auth login <url>` ran a remote-provided `auth.command` without confirmation (security hardening, 👍6); #48530 — `session.error` events ignored by global sync, leaving sessions stuck "busy" with no visible error.

## 4. Key PR Progress

1. **#48576 — docs: use stable V2 packages** (MERGED/CLOSED, thdxr)
   Switches V2 install, client, SDK, plugin, and command examples from `@beta` to stable `@opencode/*`. A clear signal that V2 packaging has graduated.
   https://github.com/anomalyco/opencode/pull/48576

2. **#48571 — fix(release): use V2 Docker artifact paths**
   Corrects the V2 Docker image to copy real `cli-linux-*` build artifact directories after the first 2.0.0 attempt published broken npm packages.
   https://github.com/anomalyco/opencode/pull/48571

3. **#48568 — fix(release): omit Node CLI from `latest`**
   Excludes the experimental Node CLI distribution from official `latest` releases; dev/beta builds unchanged.
   https://github.com/anomalyco/opencode/pull/48568

4. **#48567 / #48566 — fix(release): sign the V2 Windows CLI**
   Activates Azure Trusted Signing for the primary V2 Windows binaries (Node-distribution executables are excluded as they fail signing).
   https://github.com/anomalyco/opencode/pull/48567 · https://github.com/anomalyco/opencode/pull/48566

5. **#48564 — fix(release): omit V2 Windows desktop**
   Temporarily drops Windows desktop artifacts from V2 stable while signing isn't configured on the `v2` branch.
   https://github.com/anomalyco/opencode/pull/48564

6. **#48575 — fix(tui): render the home prompt before plugins settle**
   Mounts the production Home prompt as soon as the built-in theme is ready, with skeleton space reserved, so plugin chrome no longer causes remounts or focus jumps. Stacked on #48570.
   https://github.com/anomalyco/opencode/pull/48575

7. **#48570 — fix(tui): defer named-theme palette detection**
   Named themes no longer block on the system-palette probe, eliminating roughly 300 ms of startup latency from terminals that don't answer bulk OSC 4 queries.
   https://github.com/anomalyco/opencode/pull/48570

8. **#48117 — fix(provider): resolve OpenRouter route-modifier suffixes in model IDs**
   Closes #48016 by handling `:floor`, `:nitro`, `:exacto`, `:online` and similar OpenRouter request-time route modifiers instead of treating them as part of the model slug.
   https://github.com/anomalyco/opencode/pull/48117

9. **#48526 — feat(app): Codex-style sidebar navigation with live thread status, settle and pins**
   Adds an optional persistent navigation sidebar (Settings → General → Navigation) with live thread status, settling, and pinned threads.
   https://github.com/anomalyco/opencode/pull/48526

10. **#41830 — refactor(core): centralize session message rows** (CLOSED)
    Introduces `SessionMessageRow` as the single persisted `SessionMessage` boundary, replacing duplicated `{ id, type, data }` assembly and splitting across session persistence.
    https://github.com/anomalyco/opencode/pull/41830

*Also landed in the cleanup sweep:* #41842 (scope VCS/session TUI events to the local directory, closes #39181), #41811 (new plugin session-stopping hook, closes #16626), #41803 (restore desktop server CORS policy), #41824 (expose Go/Zen usage via `GET /api/usage`).

## 5. Hot Discussions
No discussion data was provided for this window; this section is omitted.

## 6. Feature Request Trends

- **Agent orchestration controls** — dynamic/declarative workflows (#30308), max parallel subagent limits (#27110, 👍32), and loop/cost protection for runaway subagents (#45442).
- **History vs. file-state independence** — undo/remove messages while keeping file changes (#7963, 👍12); a command to continue session inference (#44921).
- **Cross-vendor portability & extensibility** — Agent Plugins standard support (#40993, 👍12), cross-platform `SKILL.md` publishing (#48504), and ecosystem/MCP documentation contributions.
- **Out-of-the-box provider discovery** — auto-discovery of vLLM models on dev (#47344), avoiding hand-written `@ai-sdk/openai-compatible` config.
- **TUI layout configurability** — hide/resize the right-side status panel (#24373, now closed), toggle the sidebar (#48569).
- **Credentials & compliance hygiene** — confirmation before running remote `auth.command` (#10939), OAuth login failure fixes (#48572), and stale non-English docs handling (#48565).

## 7. Developer Pain Points

1. **Billing and entitlement desync.** Paid Go subscriptions failing to provision (#37790), Copilot legacy quotas burned by a single V2 prompt (#48330), and near-zero DeepSeek prompt-cache hit rates on the Go/Zen endpoint (#41125, #43218) — users are paying and not getting expected value.
2. **V2 agent safety gaps.** Identical tool-call loops with no circuit breaker (#45442) and corrupted, schema-invalid tool arguments that still execute (#47902) are the most severe correctness/security reports against 2.0.
3. **Silent failures and stuck states.** Sessions that stay "busy" with no error surfaced (#48530), prompts that produce no response at all (#48503, #48506), and transient "Failed to fetch" errors (#48552) make failures hard to diagnose.
4. **Provider compatibility friction.** V2 unconditionally sending `prompt_cache_key` breaks stricter OpenAI-compatible relays (#45113); Go-model "Invalid upload request" and HTTP 500s on `muse-spark-1.3-contributor` (#47237, #48512) persist despite catalog listing.
5. **Terminal/environment fragility.** `ENOSPC` on the TUI state watcher (#48384) and library `console.*` output corrupting the alternate screen (#48520) degrade the core TUI experience.
6. **Release-channel confusion.** A wave of same-day release fixes (Docker paths, Windows signing, Node CLI exclusion) suggests contributors are still navigating V2 packaging and distribution boundaries.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-12

## Today's Highlights

No releases shipped in the last 24 hours, but the tracker was extremely active: Windows runtime behavior dominated both issues and PRs, spanning shell discovery, Store aliases, RPC shutdown crashes, and IME/Alt-key input handling. Alongside that, `mitsuhiko`'s stacked system-message PRs (#9116, #9117) landed on the merge path, changing how mid-session prompt and tool changes are delivered to providers. Provider compatibility fixes (Bedrock, OpenAI-compatible streams, Codex attribution) also moved forward.

## Releases

None in the last 24 hours.

## Hot Issues

1. **[#7547](https://github.com/earendil-works/pi/issues/7547) — How do you use Pi on Windows? (62 comments)** — The long-running sink-thread on Windows fragmentation. Highest-engagement issue in the tracker; the volume of Windows bugs filed today (see below) is effectively the answer to its premise.
2. **[#9323](https://github.com/earendil-works/pi/issues/9323) — Improve fireworks-specific config (14 comments)** — Bug in provider config handling with active back-and-forth; matters because provider-specific config paths are a common source of silent misbehavior.
3. **[#5323](https://github.com/earendil-works/pi/issues/5323) — Improve Vertex + GCP metadata server support (9 comments, 👍2)** — Pi's `is Vertex authed?` check uses a synchronous `existsSync` rather than the metadata server, breaking standard GCP workloads. Enterprise-relevant.
4. **[#9410](https://github.com/earendil-works/pi/issues/9410) — Escape during streaming freezes TUI ~58s (4 comments)** — Reproducible on a ~465k-token `gemini-3.8-flash` session; interrupt is unusable at large context. High-severity UX regression on the newest version.
5. **[#7321](https://github.com/earendil-works/pi/issues/7321) — Multi-line paste broken without bracketed paste (5 comments)** — Termux/Android and other non-bracketed-paste terminals submit on `\r` instead of inserting. Signals Pi assumes a modern terminal.
6. **[#6108](https://github.com/earendil-works/pi/issues/6108) — Release binary re-evaluates extension dependency side effects on `/reload` (5 comments)** — Extension dependency side effects replay on reload (e.g. theme registration). Blocks reliable reload semantics for nontrivial extensions.
7. **[#8810](https://github.com/earendil-works/pi/issues/8810) — Extension-registered providers intermittently ignored as default (5 comments, 👍1)** — Fresh sessions silently fall back to another provider's default. Intermittent, which makes it expensive to debug for extension authors.
8. **[#7658](https://github.com/earendil-works/pi/issues/7658) — Extension API for persisting API-key credentials (4 comments)** — Extensions can register providers but cannot write to `auth.json`. A clear, frequently-cited gap in the extension surface.
9. **[#9045](https://github.com/earendil-works/pi/issues/9045) — Invalid `--mode` values silently ignored (4 comments)** — `parseArgs(["--mode","yaml"])` yields `mode: undefined` with no diagnostic. Script-breaking silent failure.
10. **[#6930](https://github.com/earendil-works/pi/issues/6930) — Make `renderPage` / OAuth HTML functions public (4 comments)** — Small API-surface request that would let extensions reuse branded OAuth pages instead of reimplementing them.

*Also notable (closed today):* [#9490](https://github.com/earendil-works/pi/issues/9490) `findPowerShell` hardcodes `C:\`, [#9500](https://github.com/earendil-works/pi/issues/9500) SIGILL crash attributed to bundled `fs-native-extensions`, [#9497](https://github.com/earendil-works/pi/issues/9497) CJK IME lag on Windows, [#9507](https://github.com/earendil-works/pi/issues/9507) RPC-mode libuv assertion on Windows shutdown, and duplicate reports [#9509](https://github.com/earendil-works/pi/issues/9509)/[#9510](https://github.com/earendil-works/pi/issues/9510) on Alt+letter keybindings dying under non-Latin layouts.

## Key PR Progress

1. **[#9504](https://github.com/earendil-works/pi/pull/9504) — Accept Windows Store shell aliases** — Switches shell validation to `accessSync(F_OK)`; `existsSync` rejects runnable Store aliases with `EACCES`.
2. **[#9501](https://github.com/earendil-works/pi/pull/9501) — Resolve Windows shells from installation directories** — Unifies the previously scattered hardcoded-path/env-var/branching logic and documents Windows behavior.
3. **[#9117](https://github.com/earendil-works/pi/pull/9117) — Deliver prompt and tool changes as system-message deltas** — Second half of the #8998 split; replaces top-level prompt rewrites mid-session.
4. **[#9116](https://github.com/earendil-works/pi/pull/9116) — Add mid-conversation system messages to pi-ai** — New `system` role plumbed through `pi-agent-core` and the coding agent.
5. **[#9505](https://github.com/earendil-works/pi/pull/9505) — Honor `model.samplingParams` in the openai-completions stream path** — Fixes dropped vLLM/llama.cpp params (`repetition_penalty`, `dry_multiplier`) on tool-using turns; pairs with issue [#9506](https://github.com/earendil-works/pi/issues/9506).
6. **[#9488](https://github.com/earendil-works/pi/pull/9488) — Canonical Codex turn attribution** — Adds provider-neutral `requestIdentity` (session/thread/turn/window/request-kind) so requests can be attributed across tool continuations, retries, and compaction recovery.
7. **[#9442](https://github.com/earendil-works/pi/pull/9442) — Allow prompt cache keys for compatible proxies** — New `compat.supportsPromptCacheKey` opt-in, since `prompt_cache_key` was gated to direct OpenAI URLs.
8. **[#8572](https://github.com/earendil-works/pi/pull/8572) — Amazon Bedrock Mantle support** — GPT-family models served via Mantle were being routed through Converse and failing validation. WIP pending API-key permissions for e2e.
9. **[#9489](https://github.com/earendil-works/pi/pull/9489) — Normalize Bedrock Converse `usage.input` to net per model family** — Claude reports cache-net input tokens, other families don't; fixes #8752. Directly affects cost/usage accounting.
10. **[#9478](https://github.com/earendil-works/pi/pull/9478) — Cap per-message chars in compaction token estimate** — Two ~6.6MB `web_fetch` results caused auto-compaction to misfire minutes after a successful compaction.

*Also merged:* [#9483](https://github.com/earendil-works/pi/pull/9483) (opt-in `customCwd`, restoring compat broken by #8627), [#9468](https://github.com/earendil-works/pi/pull/9468) (`requestReload` deferred/coalesced at settle), [#9467](https://github.com/earendil-works/pi/pull/9467) (setup-phase aborts classified as `aborted`), [#8708](https://github.com/earendil-works/pi/pull/8708) (resolve fd/ripgrep versions without the rate-limited GitHub API).

## Hot Discussions

No discussion data was provided for this period.

## Feature Request Trends

- **Windows as a first-class platform.** The single dominant theme: shell/binary discovery (#9501, #9504, #9490), RPC shutdown stability (#9507), terminal keybindings (#9509, #9510), IME rendering (#9497). The #7547 sink-thread exists precisely because focus is unclear.
- **Extension API expansion.** Persisting credentials to `auth.json` (#7658), making OAuth/HTML render helpers public (#6930), reliable provider registration and defaults (#8810), and safe extension reload semantics (#6108, #9468).
- **Provider breadth and correctness.** Vertex/GCP metadata auth (#5323), Bedrock Mantle routing (#8572), OpenAI-compatible provider tolerance (#9508), sampling-param fidelity (#9505/#9506), and Codex request identity (#9488).
- **Session lifecycle and large-context ergonomics.** Bounding compaction input (#8371, #9478), faster startup/resume (#9475), and responsive interrupt at high token counts (#9410).
- **Non-standard terminal support.** Bracketed-paste absence (#7321) and non-Latin keyboard layouts (#9509, #9510) are both "assumed modern terminal" failure modes.

## Developer Pain Points

- **Windows divergence keeps producing cascading bugs.** Three independent failure classes surfaced in a single day — hardcoded `C:\` paths, Store alias `EACCES`, and libuv teardown assertions — suggesting platform-specific code paths are scattered rather than centralized. PR #9501 is an explicit attempt to consolidate them.
- **Silent failures are the most damaging class.** Invalid `--mode` values pass through with no diagnostic (#9045), `samplingParams` vanish on tool-using turns (#9506), and extension-registered defaults are intermittently ignored (#8810). All three produce correct-looking runs with wrong behavior.
- **Terminal input handling is fragile outside the happy path.** Paste, IME composition, and modifier keys all break under non-default configurations, disproportionately affecting non-English and non-desktop users.
- **Extension authoring is ahead of the API surface.** Extensions can register providers but can't persist credentials, can't reuse OAuth rendering, and can't reliably reload without replaying dependency side effects.
- **Large-context sessions degrade user-visible responsiveness.** The 58-second Escape freeze (#9410) and compaction misfires on multi-megabyte tool results (#9478) both stem from unbounded work over conversation history.
- **Rate-limited third-party dependencies cause first-run failures.** The GitHub API quota issue (#8594 → #8708) and npm 12's `EALLOWREMOTE` (#9499) highlight that install/update paths are exposed to external limits.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-12

## 1. Today's Highlights

Activity remains dominated by **P1 reliability work**: a silent TUI crash when multiple background agents complete (#11500), Windows PTY/ConPTY leaks (#11352), and VS Code Remote-SSH breakage (#11556) all drew sustained attention. In parallel, a cluster of **privacy/redaction fixes and reports** surfaced around telemetry — raw request bodies, tool-error text, and shell command lines leaking into logs and RUM (#11666, #11667, #11198), with matching PRs (#11649) now open. On the feature side, contributors landed proposals for a kernel-level Linux sandbox (#11614) and a Playwright-based Browser SDK (#11241), while the hook engine moved toward Claude Code contract parity (#11610, #11613, #11675).

## 2. Releases

**v0.23.3-nightly.20260911.aaa6a32aae** (nightly)

| Change | Author | PR |
|---|---|---|
| `refactor(dingtalk)`: remove obsolete background response aggregation | @qqqys | [#11570](https://github.com/QwenLM/qwen-code/pull/11570) |
| `feat(channels)!`: breaking channel change (notes truncated in source) | — | — |

Only a nightly cut today; the `!` marker signals a breaking change in the channels subsystem, so integrators building on channel adapters should track the full release notes before upgrading.

## 3. Hot Issues

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — TUI exits silently (React #185) when background agents complete** `P1 / ui / rendering`
   Ink's `useBoxMetrics` layout-listener setState loop kills the interactive TUI with "Maximum update depth exceeded" when several background subagents finish in quick succession, and resume reports "Previous session appears…". Highest-comment issue of the day (6) — a hard crash with no error surfaced is exactly the kind of failure that erodes trust in background automation.

2. **[#11352](https://github.com/QwenLM/qwen-code/issues/11352) — Windows web-terminal PTYs leak `conhost.exe`** `P1 / performance / windows`
   Scope actively narrowed on 2026-09-11: the shell-tool half is fixed by #11497 (bundled ConPTY backend), leaving web-terminal PTYs. Good example of a triaged, partially-resolved leak where the maintainer explicitly tracked what remains.

3. **[#11556](https://github.com/QwenLM/qwen-code/issues/11556) — `vscode-ide-companion` 0.23.1 broken under Remote-SSH** `P1 / vscode / ide-integration`
   Webview stuck loading when the VS Code client is x64 Linux and the server side is arm64. A cross-architecture IDE regression that blocks an entire class of remote workflows; 5 comments and counting.

4. **[#9693](https://github.com/QwenLM/qwen-code/issues/9693) — Qwen Desktop: MCP `-32000 Connection closed` on Windows** `P2 / mcp / windows`
   Fails for both official filesystem and sequential-thinking STDIO servers even without MCP activated. Long-running (opened 2026-08-21) and still `need-retesting` — Windows MCP transport is a persistent weak spot (see also #4218, now closed).

5. **[#11666](https://github.com/QwenLM/qwen-code/issues/11666) — Telemetry exports full API request content despite `logPrompts=false`**
   `api_request.request_text` carries the whole request even when prompt logging is disabled. Filed with a precise `main` SHA and code pointer — a direct contradiction of a user-facing privacy switch.

6. **[#11198](https://github.com/QwenLM/qwen-code/issues/11198) — Usage-statistics telemetry uploads raw tool-error text** `P1 / security / data-privacy`
   Default-on channel sends unredacted shell command lines to RUM, including potential URL credentials and `Authorization: Bearer` headers. Flagged as pre-existing on `main` and wider than #10916; a fix PR (#11649) is now open.

7. **[#11610](https://github.com/QwenLM/qwen-code/issues/11610) — Hooks: align contract with Claude Code** `P1 / hooks-events`
   Proposes unifying plain-text stdout, `stop_hook_active`, timeout units, matchers, and common input shape. The hooks engine is described as already "structurally on par" — this is about ecosystem compatibility and migration friction for users porting hook configs.

8. **[#10850](https://github.com/QwenLM/qwen-code/issues/10850) — Dependency CVE audit fails repo-wide** `P1 / security / ci-cd`
   4 vulnerabilities (1 low, 2 moderate, 1 high) from `fast-uri`/`qs`/`uuid` advisories break the audit job on `main`. Blocking CI plus `ready-for-human` — a supply-chain gate that needs an owner.

9. **[#8138](https://github.com/QwenLM/qwen-code/issues/8138) — Worktree `settings.json` written to project root** `P2 / configuration / welcome-pr`
   Inside a git worktree, settings changes land in the root `.qwen/` instead of the worktree's own. Tagged `welcome-pr`, so it's an explicit invitation for a first-time contributor.

10. **[#11564](https://github.com/QwenLM/qwen-code/issues/11564) — `web_search`: design page titles for cited sources** `P2 / feature-request`
    Split out of #11490 after two review rounds because the design needs deciding before more code is written. Notable as a case where the team chose design consensus over shipping a partial fix — the tool description already asks the model to cite `[title](url)`.

## 4. Key PR Progress

1. **[#11614](https://github.com/QwenLM/qwen-code/pull/11614) — `feat(cli)`: bwrap kernel sandbox backend for Linux**
   Confines the agent via kernel primitives with no container runtime, root, daemon, or image; opt-in by name, macOS and container backends untouched. The most consequential new capability in flight.

2. **[#11241](https://github.com/QwenLM/qwen-code/pull/11241) — `feat(browser-use)`: Playwright-based Browser SDK**
   Typed, model-facing SDK running inside the persistent Node REPL, driving an existing Chrome session with semantic locators, DOM snapshot refs, and visual coordinates as three targeting modes.

3. **[#11669](https://github.com/QwenLM/qwen-code/pull/11669) — fix(core): stop a repo's own git config from running programs**
   Hardens the automatic git calls (startup context, working-tree status/diff, ignore probing, tree search) against `.git/config`-declared programs. A security-relevant fix for untrusted repositories.

4. **[#11649](https://github.com/QwenLM/qwen-code/pull/11649) — fix(core): redact error text in usage-statistics telemetry sink**
   Directly answers #11198, with shell command lines identified as the dominant leak vector. Landed same-day as the report.

5. **[#11643](https://github.com/QwenLM/qwen-code/pull/11643) — fix(core): run web terminal PTYs on bundled ConPTY backend**
   Closes the remaining half of the #11352 `conhost.exe` leak by abandoning node-pty's inbox backend, whose exit watcher erases the pty baton before `onExit` fires.

6. **[#11270](https://github.com/QwenLM/qwen-code/pull/11270) — fix(core): time out stalled background agents**
   Fixed watchdogs for fresh launches, restored runs, and resident continuations: 15 min without model/control progress, 10 min per executing tool. Complements the TUI crash fix in #11500 for overall background-agent robustness.

7. **[#11613](https://github.com/QwenLM/qwen-code/pull/11613) — fix(core): report real `stop_hook_active` on Stop hooks**
   Now `false` on the first stop check and `true` only while continuing due to a blocking Stop hook, including after tool calls. Part of the Claude Code parity push in #11610.

8. **[#11653](https://github.com/QwenLM/qwen-code/pull/11653) — fix(acp-bridge): reject unlimited cgroup sentinel for ACP child heaps**
   Stops deriving V8 old-space targets from libuv's "unlimited" sentinel (near 2^64) by using memory the machine can actually back. Prevents absurd heap configuration in default ACP child spawns.

9. **[#9466](https://github.com/QwenLM/qwen-code/pull/9466) — refactor: anchor rewind mapping to stable prompt identity**
   Rewind now resolves targets via persisted prompt identity rather than positional turn order, surviving session resume and surfaces that renumber or reorder turns. Long-running (`autofix/takeover`) but structurally important for session correctness.

10. **[#11562](https://github.com/QwenLM/qwen-code/pull/11562) — fix(cli): keep one-shot system reminders out of the user's own message**
    Stops injected reminders from appearing in the transcript, cross-session ↑-recall history, and refilled composer text. A small but high-visibility UX correctness fix; deferred review findings tracked in #11587.

## 5. Hot Discussions

No GitHub Discussions data was provided for this window; this section is omitted.

## 6. Feature Request Trends

- **Agent sandboxing & isolation** — #11614 (bwrap kernel sandbox), continuing the container/macOS backend story toward rootless, daemonless confinement.
- **Browser automation as a first-class tool** — #11241 (Playwright Browser SDK) plus `web_search` citation polish (#11564) point to richer model-facing web interaction.
- **Hooks ecosystem compatibility** — #11610 and #11675 (surface legacy ms-unit timeouts at startup) aim at Claude Code contract parity and easier migration.
- **Session & worktree lifecycle management** — #11024 (worktree cleanup residuals), #10103 (owner-scoped named sessions), #8908 (standalone sessions without a workspace), #8927 (`sessionRotation` bounds) — a dense cluster of session-governance requests.
- **Extension namespacing and scoping** — #9408 (`extension:skill` qualification) and #11086 (scope extensions to workspace runtimes) push toward multi-tenant, workspace-aware extension catalogs.
- **Configuration correctness** — #8138 (worktree-local `settings.json`) and #11665 (Responses reasoning/tool-call adjacency) reflect demand for predictable config resolution and prompt-history integrity.

## 7. Developer Pain Points

- **Windows remains the roughest platform.** MCP STDIO failures (#9693), orphaned `conhost.exe` from PTYs (#11352), and unreaped hook process trees (#11623) form a recurring pattern of native process-handling bugs.
- **Privacy switches don't behave as advertised.** Two separate reports (#11666, #11198) plus the debug-log leak (#11667) show content redaction is inconsistent across responses, telemetry, and RUM paths — a trust issue, not just a bug.
- **Background agents are hard to supervise.** Silent TUI crashes (#11500) plus no-progress stalls with no watchdog (#11270, #11326) mean failures are either invisible or unattributed.
- **CI and release infrastructure instability.** CVE audit failures (#10850), a release host sharing the `ecs-qwen` label with PR CI (#10879), and a stale ECS runner fleet (#11633) are consuming maintainer attention that would otherwise go to product work.
- **Session-state correctness across surfaces.** Worktree settings pathing (#8138), rewind positional drift (#9466), superseded-session force-close (#11511), and session catalog filtering (#11584) all reflect the cost of state living across CLI, daemon, VS Code, and web-shell.
- **Review-loop overhead.** A visible share of open PRs are `autofix/takeover` or `review/self-reported` with deferred findings spun into separate issues (#11408, #11587, #9490) — a sign that multi-round review is generating follow-up debt faster than it closes.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*