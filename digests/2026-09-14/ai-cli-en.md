# AI CLI Tools Community Digest 2026-09-14

> Generated: 2026-09-14 00:23 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report — AI CLI Ecosystem, 2026-09-14

## 1. Ecosystem Overview
The AI CLI ecosystem is in a **reliability, orchestration, and platform-parity phase** rather than a broad feature-launch phase. Most tools shipped no releases, yet issue volume stayed high around multi-agent workflows, session integrity, sandboxing, MCP, and Windows/WSL/Linux parity. Commercial/enterprise tools such as Claude Code, Codex, and Copilot CLI show strong user engagement but uneven PR throughput; OSS tools such as OpenCode, Pi, and Qwen Code are iterating faster and surfacing more regressions. The strongest cross-cutting signal is that users now expect agent fleets to be observable, cancellable, configurable per context, and portable across platforms.

## 2. Activity Comparison
*N/A means no data was provided in the digest; it is not a zero. None of the provided digests explicitly report upstream Issues/PRs disabled, so N/A is used only for missing data.*

| Tool | Issues (24h / listed) | PRs (24h / listed) | Discussions | Release status |
|---|---:|---:|---:|---|
| **Claude Code** | 50 updated; top #42776 has 182 comments | 5 updated | No data | None |
| **OpenAI Codex** | 10 hot listed; total not stated | 10 updated | 10 hot listed | None |
| **Gemini CLI** | Unavailable — summary failed | Unavailable | Unavailable | Unavailable |
| **GitHub Copilot CLI** | 4 updated; all listed | 2 updated; both closed Dependabot bumps | No data | None |
| **OpenCode** | 10 hot listed; total not stated | 10 updated | No data | None |
| **Pi** | 29 updated | 8 updated | 1 | None |
| **Qwen Code** | 10 hot listed + watchlist; total not stated | 10 listed + active | No data | Nightly `v0.23.3-nightly.20260913...`; `cua-driver-rs v0.20.6` |

**Data-backed engagement highlights:** Claude Code’s #42776 (182 comments) and #15942 (437 👍) remain the largest single issue signals. Codex’s remote-control discussion #9200 has 190 👍. OpenCode’s clipboard bug #4283 has 133 comments and 124 👍. Qwen’s React #185 cluster is now spread across four P1 issues.

## 3. Shared Feature Directions

- **Multi-agent observability, control, and lifecycle**  
  Appears in **Claude Code** (Agent Hierarchy Dashboard #24537; per-agent model/effort config #66402), **Codex** (persistent PR session #45284; in-session scheduling #25466), **Copilot CLI** (live progress streaming #2254; token-caching bug #4829), **OpenCode** (background subagent cancellation #36423), **Qwen Code** (background agents, Agent Board #11755), and **Pi** (session tree pruning #9531; mid-conversation system messages #9548).

- **Session/context durability and compaction correctness**  
  Common across **Codex** (disappearing history #44035), **OpenCode** (stuck sessions #43277), **Pi** (compaction truncation #9075, transcript wipe #9555), **Qwen Code** (`/delete` leaves logs #11762), and **Claude Code** (scheduled-task model picker #91884).

- **Cross-platform parity, especially Windows/WSL/Linux**  
  A dominant pain cluster in **Claude Code** (#42776, #91264, #93442), **Codex** (#41463, #31073, #36475), **OpenCode** (#34442, #48762), **Qwen Code** (#11747, #11778), and **Copilot CLI** (#4833 Linux voice crash).

- **Sandboxing, permissions, privacy, and credential isolation**  
  Seen in **Codex** (Windows MXC sandbox, token/SID validation), **Qwen Code** (`bwrap` kernel sandbox #11614; container subagents #11711; shell allow-rule bypass #11764; AUTO approvals #11019), **Claude Code** (safety-filter false positives; remote-control default #88094), **Copilot CLI** (workspace `.mcp.json` #4832), and **Pi** (MCP OAuth refresh races #9563).

- **Provider/model interoperability and routing**  
  Strong in **Qwen Code** (per-model `wireApi` #11538; `metadata` interop #11590), **OpenCode** (LiteLLM #22212; `encrypted_content` #48741; PDF replay #48868), **Pi** (Azure Foundry #9558; `serverTools` #9556; context-size defaults #9566), and **Codex** (MCP startup breakage #44458).

- **TUI/IDE UX polish and reversibility**  
  Evident in **Claude Code** (VS Code font #34196; auto-attach toggle #24726; focus ping-pong #90936), **Codex** (disable whimsy #44561; scrollback #45271; history search #45262), **OpenCode** (forced V2 layout #48837; broken clipboard #4283), **Pi** (full-screen redraw #9255; large-diff crash #8036), and **Qwen Code** (React #185 TUI crash cluster).

- **Cost/token governance**  
  Highlighted by **Copilot CLI** (#4829 prompt caching/token compounding), **Codex** (excessive web search, rate-limit drain), **Qwen Code** (configurable web-search budget #11692), and **OpenCode** (quota exhaustion #42340).

## 4. Differentiation Analysis

| Tool | Primary focus | Target users | Technical approach / differentiation |
|---|---|---|---|
| **Claude Code** | Enterprise IDE integration, VS 2026, safety/privacy, multi-agent fleets | Professional/enterprise developers | Broad IDE surface; high issue engagement but thin PR throughput suggests maintainer bottleneck. |
| **OpenAI Codex** | OpenAI/ChatGPT ecosystem, remote control, Windows sandbox, persistent PR sessions | OpenAI users, ChatGPT-integrated workflows | Strong discussion-led ecosystem; active PR hardening around Windows sandbox and TUI/session metadata. |
| **Gemini CLI** | Unknown | Unknown | Digest generation failed; no comparative signal available. |
| **GitHub Copilot CLI** | GitHub-native agentic workflows, MCP, voice | GitHub/Copilot enterprise users | Low activity window; 4 issues / 2 dependency PRs. Key risks are v1.0.83 MCP loading and Linux voice crashes. |
| **OpenCode** | OSS flexibility, multi-project/multi-worktree power use, provider choice | OSS power users, multi-agent operators | Fast PR iteration but strong V2 migration backlash; regressions and session-state bugs are major trust risks. |
| **Pi** | TUI performance, provider correctness, extensibility, session architecture | Terminal-centric power users, extension developers | High triage cadence and architectural PRs; risk of closed-without-fix contributor friction. |
| **Qwen Code** | Qwen ecosystem, sandbox/container isolation, daemon/web shell, i18n | Qwen/multi-provider self-hosted, web/daemon users | Nightly releases and active PRs, but P1 React #185 crashes and CI flakiness reduce stability. |

## 5. Community Momentum & Maturity

- **Highest raw engagement:** Claude Code (#42776: 182 comments; #15942: 437 👍), OpenCode (#4283: 133 comments, 124 👍), and Codex (#9200: 190 👍). These communities are large, vocal, and willing to sustain long threads.
- **Fastest iteration:** Qwen Code (nightly + CUA driver), Pi (29 issues / 8 PRs updated, many same-day triage), OpenCode (10 PRs, many Windows/session fixes), and Codex (10 PRs focused on Windows sandbox, TUI, metadata).
- **Most mature/commercial posture:** Claude Code, Codex, and Copilot CLI show enterprise/IDE-depth concerns, but Copilot CLI was quiet this window. Claude Code’s 50 updated issues vs only 5 PRs is a visible backlog-risk signal.
- **Maintainer throughput:** Pi and OpenCode show high triage/PR velocity. Pi’s same-day closures are efficient but may frustrate contributors if “closed-without-fix” becomes common. Claude Code appears issue-rich but PR-thin.
- **Stability pressure:** OpenCode’s v1.18.30 all-prompt regression, Qwen’s React #185 TUI crash cluster and CI flakiness, and Copilot CLI’s v1.0.83 MCP/voice bugs show that rapid iteration is increasing release-quality risk.

## 6. Trend Signals

- **Multi-agent orchestration is becoming table stakes.** Users want live progress, cancellation, per-agent configuration, session attribution, and fleet dashboards — not just parallel agents.
- **Platform parity is now a trust issue.** Windows/WSL/Linux failures are recurring across every major tool. Sandbox setup, path handling, terminal state, and credential context are the top friction points.
- **Sandboxing and permissions are differentiating features.** Kernel sandboxes, containerized subagents, workspace-scoped MCP, and robust approval classifiers are moving from nice-to-have to security-critical.
- **Context/session lifecycle is the next battleground.** Compaction correctness, persistent PR sessions, mid-conversation system messages, durable exports, and deletion/retention guarantees are all active demand areas.
- **Cost and token efficiency matter to agentic users.** Prompt caching, web-search budgets, quota handling, and rate-limit drain are directly affecting multi-agent viability.
- **Provider abstraction and MCP standardization are strategic.** Per-model wire APIs, OpenAI-compatible gateway fixes, server-side tools, and MCP OAuth robustness are required for mixed-model environments.
- **Release quality and reversibility are competitive edges.** Point-release regressions and forced UI migrations without toggles generate the strongest negative community reactions. Developers building in this space should prioritize deterministic CI, migration escape hatches, and clear session/data guarantees.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report
*Data snapshot: 2026-09-14 · Source: github.com/anthropics/skills*

> **Methodology note:** PR comment counts were returned as `undefined` in the source dataset, so the ranking below uses a composite attention proxy: (a) cross-referenced from high-comment Issues, (b) recency/frequency of `updated_at`, and (c) breadth of impact across bundled skills. All listed PRs are **OPEN**; no merges appear in this window.

---

## 1. Top Skills Ranking

| # | Skill / PR | What it does | Discussion highlights | Status |
|---|---|---|---|---|
| 1 | **[#1298](https://github.com/anthropics/skills/pull/1298)** — `skill-creator` eval integrity fix | Makes `run_eval.py` install the eval artifact as a real skill; fixes Windows stream reading, trigger detection, parallel workers | Directly closes the loop on [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments, 7👍, "10+ independent reproductions"). The description-optimization loop was optimizing against `recall=0%` noise — highest-impact correctness fix in the set. Updated 2026-09-13. | OPEN |
| 2 | **[#83](https://github.com/anthropics/skills/pull/83)** — `skill-quality-analyzer` + `skill-security-analyzer` | Two meta-skills: 5-dimension quality scoring (structure, docs, examples, resources…) and a security analyzer | Strongest thematic link to the community's hottest issue, [#492](https://github.com/anthropics/skills/issues/492) (43 comments) on namespace/trust abuse. Long-lived PR (opened 2025-11-06) — signals unmet demand for governance tooling. | OPEN |
| 3 | **[#1367](https://github.com/anthropics/skills/pull/1367)** — `self-audit` v1.3.0 | Mechanical file verification (Step 0) followed by a four-dimension reasoning quality gate in damage-severity order | Model/stack-agnostic "audit before delivery" skill; pairs with the [Issue #1385](https://github.com/anthropics/skills/issues/1385) Reasoning Quality Gate proposal from the same author. | OPEN |
| 4 | **[#1742](https://github.com/anthropics/skills/pull/1742)** — `mcp-builder` SDK compat | Migrates to `mcp>=2` (`streamable_http_client`) and `create_mcp_http_client` for custom headers | Fixes [#1668](https://github.com/anthropics/skills/issues/1668); part of a wider `mcp-builder` reliability cluster with [#1724](https://github.com/anthropics/skills/pull/1724), [#1602](https://github.com/anthropics/skills/pull/1602) and Issue [#1390](https://github.com/anthropics/skills/issues/1390). Updated 2026-09-13. | OPEN |
| 5 | **[#1607](https://github.com/anthropics/skills/pull/1607)** — `claude-api` model lifecycle accuracy | Marks four retired model IDs as retired in `shared/models.md` | Fixes [#1603](https://github.com/anthropics/skills/issues/1603); same skill as the high-severity [#1487](https://github.com/anthropics/skills/issues/1487) (~156k-token eager injection, context exhaustion). | OPEN |
| 6 | **[#1628](https://github.com/anthropics/skills/pull/1628)** — `Hivemind` multi-agent orchestration | Zero-cost delegation: Claude Code stays planner/reviewer/merger, headless `opencode` workers on free models do mechanical work | Novel framing around context as the scarce resource rather than intelligence. | OPEN |
| 7 | **[#514](https://github.com/anthropics/skills/pull/514)** — `document-typography` | Prevents orphan word wrap, widow paragraphs, and numbering misalignment in generated documents | One of the earliest quality-of-output skills; long-dormant (last update 2026-03-13) but still the reference example of "invisible output polish." | OPEN |
| 8 | **[#525](https://github.com/anthropics/skills/pull/525)** — `pyxel` retro game dev | Wraps `pyxel-mcp` for pixel-art/8-bit Python games (write → run_and_capture → inspect → iterate) | Third-party MCP-backed skill; re-activated 2026-09-13, indicating renewed review activity. | OPEN |

*Also active:* [#1627 Buffer GraphQL](https://github.com/anthropics/skills/pull/1627), [#1615 scnet-hpc](https://github.com/anthropics/skills/pull/1615), [#1734 orphaned docx comments](https://github.com/anthropics/skills/pull/1734), [#1099 Windows eval crash](https://github.com/anthropics/skills/pull/1099).

---

## 2. Community Demand Trends

Distilled from the Issue tracker:

- **Trust & security boundaries (dominant).** [Issue #492](https://github.com/anthropics/skills/issues/492) (43 comments) — community skills shipping under the `anthropic/` namespace, enabling permission escalation via impersonation. Reinforced by [#1175](https://github.com/anthropics/skills/issues/1175) on writing access-control logic inside `SKILL.md` for SharePoint. **Direction wanted: signed/provenanced skills, namespace separation, permission transparency.**
- **Skill discovery, distribution & lifecycle management.** [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 8👍) org-wide skill sharing; [#189](https://github.com/anthropics/skills/issues/189) (9👍) duplicate `document-skills`/`example-skills` plugins; [#62](https://github.com/anthropics/skills/issues/62) user skills silently disappearing. **Direction wanted: shared skill libraries, deduplication, safe update/rollback.**
- **Evaluation & toolchain reliability.** [#556](https://github.com/anthropics/skills/issues/556) (12 comments) 0% trigger rate; [#1390](https://github.com/anthropics/skills/issues/1390) `mcp-builder` fabricating tool errors → 0/N scores; [#1362](https://github.com/anthropics/skills/issues/1362) `web-artifacts-builder` pnpm ≥10.1 breakage. **Direction wanted: trustworthy eval harnesses and cross-platform scripts.**
- **Context-window economics.** [#1487](https://github.com/anthropics/skills/issues/1487) `claude-api` injecting ~156k tokens in one call; [#1329](https://github.com/anthropics/skills/issues/1329) `compact-memory` symbolic notation; [#202](https://github.com/anthropics/skills/issues/202) `skill-creator` verbose/non-operational tone. **Direction wanted: lazy loading, token-efficient SKILL.md authoring.**
- **Agent governance & reasoning quality gates.** [#412](https://github.com/anthropics/skills/issues/412) agent-governance (policy enforcement, threat detection, trust scoring, audit trails) and [#1385](https://github.com/anthropics/skills/issues/1385) three-gate pipeline (pre-task calibration → adversarial review → delivery verification). **Direction wanted: verification-before-delivery, auditable agent behavior.**
- **Platform & protocol interop.** [#29](https://github.com/anthropics/skills/issues/29) AWS Bedrock support; [#16](https://github.com/anthropics/skills/issues/16) exposing Skills as MCPs. **Direction wanted: portability beyond first-party surfaces.**

---

## 3. High-Potential Pending Skills

Active in the last ~6 weeks (as of 2026-09-14), not yet merged — most likely to land next:

1. **[PR #1298](https://github.com/anthropics/skills/pull/1298)** — `skill-creator` eval fix (updated 2026-09-13). Highest-leverage: unblocks the entire description-optimization loop.
2. **[PR #1742](https://github.com/anthropics/skills/pull/1742)** — `mcp-builder` mcp>=2 + custom headers (updated 2026-09-13).
3. **[PR #525](https://github.com/anthropics/skills/pull/525)** — `pyxel` retro game dev skill (updated 2026-09-13).
4. **[PR #1734](https://github.com/anthropics/skills/pull/1734)** — detect orphaned docx comments (updated 2026-09-11).
5. **[PR #1627](https://github.com/anthropics/skills/pull/1627)** — `buffer-api` social scheduling skill (updated 2026-09-05).
6. **[PR #1628](https://github.com/anthropics/skills/pull/1628)** — `Hivemind` zero-cost multi-agent orchestration (updated 2026-08-24).
7. **[PR #1615](https://github.com/anthropics/skills/pull/1615)** — `scnet-hpc` Slurm/SSH cluster operations (updated 2026-08-24).
8. **[PR #1602](https://github.com/anthropics/skills/pull/1602)** — cross-cutting fixes: eval serialization, benchmark metrics, encoding, script stability (updated 2026-08-24).

---

## 4. Skills Ecosystem Insight

> **The community's demand has consolidated around trust and verifiability, not capability breadth: contributors are prioritizing provably correct evaluation (0% recall, fabricated tool errors), safe distribution (namespace impersonation, plugin duplication), and context economy — i.e., making Skills trustworthy to install, measure, and run, before adding more of them.**

---

**Links index:** [PR #1298](https://github.com/anthropics/skills/pull/1298) · [PR #1099](https://github.com/anthropics/skills/pull/1099) · [PR #83](https://github.com/anthropics/skills/pull/83) · [PR #1367](https://github.com/anthropics/skills/pull/1367) · [PR #1742](https://github.com/anthropics/skills/pull/1742) · [PR #1607](https://github.com/anthropics/skills/pull/1607) · [PR #1628](https://github.com/anthropics/skills/pull/1628) · [PR #514](https://github.com/anthropics/skills/pull/514) · [PR #525](https://github.com/anthropics/skills/pull/525) · [Issue #492](https://github.com/anthropics/skills/issues/492) · [Issue #228](https://github.com/anthropics/skills/issues/228) · [Issue #556](https://github.com/anthropics/skills/issues/556) · [Issue #1487](https://github.com/anthropics/skills/issues/1487) · [Issue #1390](https://github.com/anthropics/skills/issues/1390)

---

# Claude Code Community Digest — 2026-09-14

## 1. Today's Highlights

No new releases shipped in the last 24 hours, but community activity remains intense: a record-breaking Windows desktop restart bug (#42776, 182 comments) and the top-voted Visual Studio 2026 request (#15942, 437 👍) both saw fresh activity. A notable wave of safety-filter false positives was filed by a single reporter (sworrl), many already closed as duplicates, while IDE/UX polish requests (VS Code font size, focus handling, panel auto-attach) continue to dominate the enhancement backlog.

## 2. Releases

None in the last 24 hours.

## 3. Hot Issues

1. **[#42776](https://github.com/anthropics/claude-code/issues/42776) — Desktop fails to relaunch on Windows (orphaned process file lock)** — Open, 182 comments, 88 👍. The single most active thread in the tracker; a long-lived file-lock bug that keeps Desktop from restarting cleanly on Windows. Despite being tagged `invalid`, community volume suggests a real platform reliability problem worth revisiting.
2. **[#15942](https://github.com/anthropics/claude-code/issues/15942) — Add support for Visual Studio 2026 Integration** — Open, 152 comments, 437 👍. Highest-voted issue on the board; strong enterprise demand for a first-class VS 2026 extension alongside the existing VS Code path.
3. **[#24726](https://github.com/anthropics/claude-code/issues/24726) — VS Code: setting to disable auto-attach of open file/selection** — Open, 74 comments, 237 👍. Users want the sidebar to stop silently injecting editor context; a straightforward toggle that has broad support and low implementation cost.
4. **[#24537](https://github.com/anthropics/claude-code/issues/24537) — Agent Hierarchy Dashboard (TUI + Desktop)** — Open, 18 comments. Proposes unified real-time visualization for multi-agent workflows, addressing observability gaps as fleets grow.
5. **[#34196](https://github.com/anthropics/claude-code/issues/34196) — VS Code extension: font size setting for chat panel** — Open, 16 comments, 91 👍. The chat panel font is smaller than editor font with no override; a small but recurring accessibility/readability complaint.
6. **[#66402](https://github.com/anthropics/claude-code/issues/66402) — `/model` and `/effort` mutate global `settings.json`** — Open, 16 comments. Breaks per-agent model/effort configuration in `claude agents` fleet view; a real architectural gap for multi-agent users.
7. **[#88094](https://github.com/anthropics/claude-code/issues/88094) — Remote Control enabled by default on Windows** — Open, 10 comments. Default-on remote behavior raises privacy/security concerns and lacks an obvious opt-out.
8. **[#91264](https://github.com/anthropics/claude-code/issues/91264) — PowerShell/Bash tool calls spawn focus-stealing console window on Windows** — Open, 2 comments. Every tool call steals focus; no `settings.json` option exists to suppress window visibility.
9. **[#93442](https://github.com/anthropics/claude-code/issues/93442) — Windows Cowork: `device_bash` permanently dead ("no Plan9 drive shares mounted")** — Open, 2 comments. Survives restart and full OS reboot; reportedly affects two distinct desktop profiles.
10. **[#94029](https://github.com/anthropics/claude-code/issues/94029) — `claude attach` ignores `CLAUDE_CODE_DISABLE_MOUSE`** — Open, regression, has repro. Mouse capture is always on in attached background sessions, overriding documented env vars.

Honorable mentions: [#92885](https://github.com/anthropics/claude-code/issues/92885) (Cowork execution-mode visibility), [#91884](https://github.com/anthropics/claude-code/issues/91884) (Desktop scheduled-task model picker broken end-to-end), [#90936](https://github.com/anthropics/claude-code/issues/90936) (VS Code focus ping-pong between panels), [#94062](https://github.com/anthropics/claude-code/issues/94062) (Android physical-keyboard focus loss).

## 4. Key PR Progress

1. **[#79148](https://github.com/anthropics/claude-code/pull/79148) — Add mandatory `hookify.` prefix to example rule filenames** (Open). Fixes silently-ignored example rules; the loader only discovers `.claude/hookify.*.local.md`, but shipped examples omit the prefix.
2. **[#89404](https://github.com/anthropics/claude-code/pull/89404) — `validate-agent.sh`: don't abort at first warning** (Open). Fixes three `set -euo pipefail` interactions (including `((x++))` returning non-zero) that caused valid agents to be false-flagged. Addresses issue #83803.
3. **[#41621](https://github.com/anthropics/claude-code/pull/41621) — Add missing CLI build infrastructure and bundler config** (Closed). Adds full TS source build pipeline for bundling the CLI into a single executable, with esbuild docs. Closed, but contextually valuable for anyone building from source.
4. **[#93951](https://github.com/anthropics/claude-code/pull/93951) — Move diff/sec-default/telemetry tests next to their mods** (Open). Co-locates behavior tests under `mods/<mod>/tests/`, run via `claude plugin test`; a step toward a cleaner plugin testing story.
5. **[#93932](https://github.com/anthropics/claude-code/pull/93932) — Telemetry mod `types` path made `./`-relative** (Closed). One-line fix aligning `plugin.json` paths with schema requirements.

Only five PRs were updated in the window, so all are listed above. Notably, PR activity is thin relative to issue volume — a possible maintenance-throughput signal worth watching.

## 5. Hot Discussions

No discussion data was provided for this period.

## 6. Feature Request Trends

- **IDE depth and parity**: Visual Studio 2026 support (#15942), VS Code font-size control (#34196), and disabling auto-attach (#24726) point to a demand for finer-grained IDE integration control rather than new surface area.
- **Multi-agent observability and configuration**: The Agent Hierarchy Dashboard (#24537) plus per-agent model/effort configuration (#66402) reveal a growing need for fleet-level management as users run multiple concurrent agents.
- **Privacy and execution transparency**: Cowork execution-mode visibility (#92885) and remote-control defaults (#88094) show users want explicit, documented control over what leaves their machine.
- **Cross-platform parity**: Windows and Android issues (#42776, #91264, #93442, #94062) signal that non-macOS/Linux experiences lag behind, particularly around desktop lifecycle and input handling.

## 7. Developer Pain Points

- **Windows platform reliability**: The top three Windows issues — orphaned process locks, focus-stealing console windows, and dead `device_bash` in Cowork — represent a cluster of long-standing platform friction. The 182-comment thread on #42776 underscores how much user energy this burns.
- **Safety/AUP filter false positives**: A single reporter (sworrl) filed roughly a dozen issues on 2026-09-14 and earlier, covering false blocks during log review, CVE entry, backup server auth troubleshooting, and frustrated exclamations in chat. Many were closed as duplicates, but the pattern is a recurring, high-severity ("session-halted") disruption for legitimate security and sysadmin work.
- **Global state mutation over per-context config**: `/model` and `/effort` writing to global `settings.json` (#66402) breaks agent-fleet isolation; similar complaints about scheduled-task model selection (#91884) reinforce that configuration scoping is a systemic gap.
- **IDE focus and context friction**: Auto-attached file context (#24726), ping-ponging focus between panels (#90936), and the missing chat font size setting (#34196) collectively describe a VS Code extension that can feel intrusive rather than assistive.
- **Thin PR throughput**: With only five PRs touched in 24 hours against 50 updated issues, the maintainer-to-community ratio suggests backlog accumulation may become a bottleneck.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-14

## Today's Highlights
No new releases were published in the last 24 hours. Windows/WSL and sandbox reliability remain the dominant themes across Issues, with the top bug (#41463) drawing 54 comments and 33 👍. Meanwhile, community Discussions show strong appetite for remote control from the ChatGPT app, persistent PR sessions, and ecosystem tooling.

## Releases
No new releases in the last 24 hours.

## Hot Issues

1. **[#41463] [Windows + WSL] Cannot create projects – AbsolutePathBuf deserialized without a base path**  
   https://github.com/openai/codex/issues/41463  
   *Why it matters:* Blocks project creation for Windows + WSL2 users in Codex Desktop.  
   *Reaction:* 54 comments, 33 👍 — highest-engagement open bug today.

2. **[#31073] Windows native sandbox: Git HTTPS remote operations fail/crash inside Codex but work in normal PowerShell**  
   https://github.com/openai/codex/issues/31073  
   *Why it matters:* Sandbox networking/credential handling breaks routine Git remote workflows on Windows.  
   *Reaction:* 28 comments, sustained since July.

3. **[#44781] [Codex Desktop] Editing and resending a queued message triggers "App-server queued follow-up no longer exists"**  
   https://github.com/openai/codex/issues/44781  
   *Why it matters:* Breaks message queuing and follow-up editing in the desktop app.  
   *Reaction:* 22 comments, 26 👍 — high user impact.

4. **[#44561] Turn off whimsy effect (astra stars) by default**  
   https://github.com/openai/codex/issues/44561  
   *Why it matters:* TUI visual effect is perceived as a glitch and requires manual config to disable.  
   *Reaction:* 15 comments, 31 👍 — strong UX pushback.

5. **[#36475] Windows sandbox refresh fails with helper_sandbox_lock_failed after SetNamedSecurityInfoW(ERROR_ACCESS_DENIED) on existing .sandbox-bin**  
   https://github.com/openai/codex/issues/36475  
   *Why it matters:* Persistent Windows sandbox setup failures due to ACL/lock handling.  
   *Reaction:* 11 comments, still unresolved.

6. **[#20988] Codex is now searching the web way more frequently and at unnecessary times**  
   https://github.com/openai/codex/issues/20988  
   *Why it matters:* Model behavior regression that increased latency/noise; now closed.  
   *Reaction:* 10 comments, 2 👍 — tracked since May.

7. **[#44458] macOS: CLI 0.154.0 experimental capability breaks bundled Messages and Computer History MCP startup**  
   https://github.com/openai/codex/issues/44458  
   *Why it matters:* MCP startup regression on macOS breaks bundled integrations.  
   *Reaction:* 9 comments, 3 👍.

8. **[#44035] [Windows App 26.901.6511.0] Recent chat history disappears; read_thread stays stale while rollout retains newer messages**  
   https://github.com/openai/codex/issues/44035  
   *Why it matters:* History synchronization bug causes apparent data loss in the desktop app.  
   *Reaction:* 9 comments, 3 👍.

9. **[#45119] macOS 14.2: sandbox startup fails with unbound variable TIOCSTI**  
   https://github.com/openai/codex/issues/45119  
   *Why it matters:* Sandbox startup completely fails on older macOS versions.  
   *Reaction:* 8 comments, updated today.

10. **[#25466] Feature: in-session scheduling tools (Cron + ScheduleWakeup) and a /loop command**  
    https://github.com/openai/codex/issues/25466  
    *Why it matters:* Highly requested automation primitive for long-running agent sessions.  
    *Reaction:* 14 👍, 2 comments — strongest feature-request signal in the list.

## Key PR Progress

1. **[#45276] Add worktree session creation to the agents overview**  
   https://github.com/openai/codex/pull/45276  
   Adds a configurable `new_worktree` action bound to `w` for local sessions, creating worktrees from the cached project default branch.

2. **[#45271] Preserve terminal scrollback when growing the TUI viewport**  
   https://github.com/openai/codex/pull/45271  
   Prevents history loss in QTermWidget and xterm.js when the viewport grows.

3. **[#45262] Route pastes into the active history search query**  
   https://github.com/openai/codex/pull/45262  
   Fixes `Ctrl+R` history search so pasted text appends to the active query instead of going through normal composer handling.

4. **[#45255] Open new sessions directly from the command center**  
   https://github.com/openai/codex/pull/45255  
   Replaces inline task composer with a session list; `n` opens a blank session without interrupting running agents.

5. **[#45248] Use captured step settings for request metadata and tool hooks**  
   https://github.com/openai/codex/pull/45248  
   Ensures model/reasoning-effort metadata reflects the step that issued the request or tool call.

6. **[#45224] Register Windows desktop uninstall ownership before sandbox setup**  
   https://github.com/openai/codex/pull/45224  
   Fixes uninstall cleanup for installations that never completed sandbox setup or sign-in.

7. **[#45185] Bind direct tool-call metadata to invocation outputs**  
   https://github.com/openai/codex/pull/45185  
   Keeps tool-call records associated with the correct invocation, including reused call IDs.

8. **[#45182] Validate Windows sandbox token groups before copying SIDs**  
   https://github.com/openai/codex/pull/45182  
   Adds bounds checking for token group entries/SID pointers to improve Windows sandbox robustness.

9. **[#45176] Wire the Windows MXC sandbox into command execution**  
   https://github.com/openai/codex/pull/45176  
   Adds explicit MXC backend selection and carries identity through exec-server reporting and violation classification.

10. **[#45149] Use OpenSSL 3.6.4 for musl builds**  
    https://github.com/openai/codex/pull/45149  
    Builds the OpenSSL 3.6.4 security release directly for x86_64 and aarch64 musl builds.

## Hot Discussions

### Ideas
- **[#9200] Add the ability to remote control codex from ChatGPT app**  
  https://github.com/openai/codex/discussions/9200  
  46 comments, 190 👍 — the most-upvoted discussion; asks for headless/daemon mode controllable from the ChatGPT mobile app.

- **[#42703] Long-horizon context: can history retrieval make history recursively self-referential?**  
  https://github.com/openai/codex/discussions/42703  
  Explores failure modes in token-budget/history/notes/new_context approaches for multi-window threads.

- **[#45284] Optional persistent Codex session per GitHub pull request**  
  https://github.com/openai/codex/discussions/45284  
  Proposes one persistent session per PR to avoid context fragmentation across repeated `@codex` mentions.

### Show and tell
- **[#16329] Awesome Codex CLI — curated list of 150+ ecosystem tools**  
  https://github.com/openai/codex/discussions/16329  
  Community-maintained index of subagents, skills, plugins, and MCP servers.

- **[#44843] Community tool: SKILL.md → Codex plugin bundle converter**  
  https://github.com/openai/codex/discussions/44843  
  MIT, stdlib-only converter that turns Agent Skills folders into compliant Codex plugin manifests.

- **[#45278] Polter: I made one Codex the boss of my other AI CLIs**  
  https://github.com/openai/codex/discussions/45278  
  Terminal supervisor that orchestrates multiple AI CLIs and nags workers that stop.

- **[#45238] codex-preserve — durable Codex session exports with fail-closed verification**  
  https://github.com/openai/codex/discussions/45238  
  Local-first Python CLI for exporting and verifying Codex sessions outside the app.

- **[#45205] Orchestrator: free Mac workspace for Codex, Kanban tasks and code review**  
  https://github.com/openai/codex/discussions/45205  
  Open-source Mac app connecting Codex tasks, repository state, conversations, and diffs.

- **[#44291] Brain Scanner: understand what your coding agent did before the next task**  
  https://github.com/openai/codex/discussions/44291  
  Tool for reviewing project maps, recorded agent work, and follow-up tasks in one place.

### General
- **[#45211] Open statement: reopen Pro 20X access, address Korean-language quality issues, and clarify reset policy**  
  https://github.com/openai/codex/discussions/45211  
  User objection to Pro 20X signup pause, Korean-language mixing, and reset policy ambiguity.

## Feature Request Trends
- **Remote control and mobile handoff:** Persistent demand for controlling Codex from ChatGPT mobile/iOS, with better handoff across hosts.
- **Persistent sessions per PR:** Requests to keep one Codex session per pull request to avoid fragmented review context.
- **In-session scheduling/automation:** Cron, ScheduleWakeup, and `/loop` commands for long-running agent workflows.
- **Windows/WSL reliability:** Repeated asks for stable project creation, sandbox setup, Git HTTPS, and credential context on Windows.
- **Session/history durability and tooling:** Calls for documented `~/.codex` rollout formats and durable session exports.
- **MCP and tool-call robustness:** MCP startup fixes, tool-call metadata binding, and subagent wait behavior.
- **UX refinements:** Disable whimsy effects by default, preserve scrollback, improve history search, and streamline command center navigation.

## Developer Pain Points
- **Windows sandbox and permissions:** Elevated sandbox credential gaps, `helper_failed`, ACL errors, token/SID validation, and setup lock failures.
- **WSL/project creation blockers:** Inability to create projects or group worktree threads correctly under WSL/SSH remotes.
- **Session/history inconsistency:** Disappearing chats, stale `read_thread` state, paginated history regressions, and giant rollout files.
- **Model behavior regressions:** Ignoring instructions, garbled shell output, excessive web search, and unexpected rate-limit drain.
- **MCP startup breakage:** Bundled Messages/Computer History MCP failing on macOS CLI 0.154.0.
- **Undocumented session formats:** Lack of safe-to-rely-on guarantees for tooling built on `~/.codex` rollout files.
- **Remote/mobile limitations:** iOS send button disabled, remote handoff errors, and paginated chats not continuing across hosts.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ Summary generation failed.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-14

## Today's Highlights
No new releases were published in the last 24 hours. The active set is dominated by two v1.0.83 reliability reports: workspace `.mcp.json` is not loaded ([#4832](https://github.com/github/copilot-cli/issues/4832)), and voice mode crashes on Linux via an ONNX Runtime assertion in Nemotron ASR ([#4833](https://github.com/github/copilot-cli/issues/4833)). Agentic workflows also remained a focus, with a prompt-caching/token-consumption bug for long subagent runs ([#4829](https://github.com/github/copilot-cli/issues/4829)) and a request for live progress streaming for background subagents ([#2254](https://github.com/github/copilot-cli/issues/2254)). Only 4 issues and 2 PRs were updated, so the lists below cover all available items.

## Hot Issues
Only 4 issues were updated in the last 24h; all are listed.

1. **[#4829](https://github.com/github/copilot-cli/issues/4829) — [Bug] Subagents executing long tool-call sequences in a single turn fail prompt caching and compound token consumption**  
   - **Why it matters:** Autonomous subagents using the `task` tool can run hundreds of tool calls in one turn; when prompt caching fails, token usage compounds, directly affecting cost and latency for multi-agent workflows. Reported on v1.0.83 / Windows 11 / PowerShell with Gemini 3.8 Flash.  
   - **Community reaction:** 1 comment, 0 👍.

2. **[#2254](https://github.com/github/copilot-cli/issues/2254) — [area:agents] Add live progress streaming for background sub-agents**  
   - **Why it matters:** Multi-phase orchestrator agents (plan → implement → deliver → review) lack rich observability; `/tasks` only shows tool call count. This would improve monitoring and debugging of long-running background agents.  
   - **Community reaction:** 1 comment, 0 👍.

3. **[#4833](https://github.com/github/copilot-cli/issues/4833) — [Bug] Voice mode crashes CLI with ONNX Runtime assertion in Nemotron ASR on Linux**  
   - **Why it matters:** Enabling voice input causes CLI abort with `SIGABRT` and core dump on Linux x64 while the local Nemotron speech model processes audio. This makes voice mode unusable for affected Linux users and raises platform stability concerns.  
   - **Community reaction:** 0 comments, 0 👍.

4. **[#4832](https://github.com/github/copilot-cli/issues/4832) — Workspace .mcp.json is never loaded in CLI 1.0.83 — `mcp list` shows no Workspace group**  
   - **Why it matters:** A repo-root `.mcp.json` is ignored, `copilot mcp list` shows only user servers, and workspace MCP servers are never started. This breaks project-scoped MCP integrations, not just display output.  
   - **Community reaction:** 0 comments, 0 👍.

## Key PR Progress
Only 2 PRs were updated in the last 24h; both are closed Dependabot dependency bumps.

1. **[#4827](https://github.com/github/copilot-cli/pull/4827) — build(deps): bump actions/stale from 9.1.0 to 11.0.0**  
   - **What changed:** Major-version CI dependency bump for the stale issue/PR automation action. Closed.  
   - **Why it matters:** Keeps GitHub Actions automation current, though major version jumps may require workflow compatibility checks.

2. **[#4828](https://github.com/github/copilot-cli/pull/4828) — build(deps): bump actions/github-script from 7.1.0 to 9.0.0**  
   - **What changed:** Major-version CI dependency bump for `actions/github-script`. Closed.  
   - **Why it matters:** Affects workflow scripting behavior if used in CI; also part of routine dependency maintenance.

## Feature Request Trends
No Discussions data was provided; trends below are inferred from the four updated issues.

- **Agent observability:** The clearest explicit request is live progress streaming for background subagents ([#2254](https://github.com/github/copilot-cli/issues/2254)), driven by limited `/tasks` visibility.
- **Token/cost efficiency for agentic runs:** [#4829](https://github.com/github/copilot-cli/issues/4829) highlights demand for robust prompt caching and predictable token consumption during long subagent tool-call sequences.
- **Project-scoped MCP reliability:** [#4832](https://github.com/github/copilot-cli/issues/4832) points to a need for reliable workspace-level MCP configuration loading and clear server lifecycle visibility.
- **Cross-platform voice input stability:** [#4833](https://github.com/github/copilot-cli/issues/4833) signals interest in dependable voice mode across Linux and local ASR model setups.

## Developer Pain Points
- **v1.0.83 MCP regression:** Workspace `.mcp.json` is ignored and workspace MCP servers are not started, blocking repo-scoped tool integrations ([#4832](https://github.com/github/copilot-cli/issues/4832)).
- **Voice mode instability on Linux:** `SIGABRT`/core dump during Nemotron ASR processing makes voice input unusable for affected Linux users ([#4833](https://github.com/github/copilot-cli/issues/4833)).
- **Unpredictable agent costs:** Long subagent tool-call sequences can break prompt caching and compound token usage, creating cost and latency concerns ([#4829](https://github.com/github/copilot-cli/issues/4829)).
- **Insufficient background-agent observability:** `/tasks` lacks live progress detail, forcing developers to manage long-running orchestrator agents with limited telemetry ([#2254](https://github.com/github/copilot-cli/issues/2254)).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-14

## Today's Highlights

No releases shipped in the last 24 hours, but the tracker is dominated by a **v1.18.30 regression** that breaks every prompt (`SystemPrompt.environment` TypeError), reported independently by multiple users. Meanwhile, the **forced removal of the legacy Desktop layout** in favor of V2 is generating strong pushback from multi-project/multi-worktree users, and the **Muse Spark / Zen `encrypted_content` provider error** (#48741) is the fastest-growing new bug of the day.

## Releases

None in the last 24 hours.

## Hot Issues

1. **[#4283 — Copy To Clipboard is not working](https://github.com/anomalyco/opencode/issues/4283)** — Still the single loudest thread on the tracker: 133 comments, 124 👍, open since Nov 2025 and updated today. Clipboard copy from responses remains broken across versions and platforms, making this the most persistent UX defect.
2. **[#48741 — [2.0] Zen critical errors on Muse Spark family with images/tool calls](https://github.com/anomalyco/opencode/issues/48741)** — New today with 21 comments. Any Muse Spark model on Zen fails with `reasoning encrypted_content was not issued to this caller`, breaking image input and tool calls — a blocker for anyone on beta-18050.
3. **[#48645 — v1.18.30 regression: every prompt crashes with TypeError](https://github.com/anomalyco/opencode/issues/48645)** and **[#48803 — same failure, works on v1.18.20](https://github.com/anomalyco/opencode/issues/48803)** — Two independent A/B-confirmed reports of total prompt failure after the 1.18.30 upgrade. Highest-severity reliability issue of the day.
4. **[#23153 — [FEATURE]: Pay Go with crypto](https://github.com/anomalyco/opencode/issues/23153)** — 22 comments, 51 👍. Long-running monetization request that keeps resurfacing; strong signal for alternative payment rails for OpenCode Go.
5. **[#43277 — Sessions permanently stuck, survive reboots, cannot be recovered](https://github.com/anomalyco/opencode/issues/43277)** — 14 comments. Stuck sessions persist across full reboots and aren't cleared by restarting the server, which is a serious state-corruption class bug.
6. **[#48837 — Forced V2 interface destroys productivity for multi-project/multi-agent workflows](https://github.com/anomalyco/opencode/issues/48837)** and **[#48835 — Old layout removed but new layout lacks multi-worktree support](https://github.com/anomalyco/opencode/issues/48835)** — The two flagship complaints about the V2 migration: no layout toggle, and loss of worktree support that power users rely on for 20+ concurrent sessions.
7. **[#34442 — Windows Desktop installer broken offline (ripgrep not bundled)](https://github.com/anomalyco/opencode/issues/34442)** — `grep`, `glob`, `skill`, and `customize-opencode` all fail without network access on Windows. Highlights a packaging gap that silently disables core tooling.
8. **[#36423 — [2.0] No cancellation support for background subagents](https://github.com/anomalyco/opencode/issues/36423)** — Background subagents can be launched and resumed but not cancelled, leaving orphaned work with no escape hatch. A notable gap in the V2 agent API.
9. **[#48870 — Non-git sessions are unattributable; `resolve` returns `global` early](https://github.com/anomalyco/opencode/issues/48870)** — Root-cause analysis of the recurring "sessions leak across unrelated directories" family (see also [#38529](https://github.com/anomalyco/opencode/issues/38529) and [#48762](https://github.com/anomalyco/opencode/issues/48762)). Already has a paired fix PR.
10. **[#48868 — 422 error replaying sessions with PDF tool results on OpenAI-compatible providers](https://github.com/anomalyco/opencode/issues/48868)** — Deterministic session replay failure through the zen/go gateway; affects anyone reading PDFs and resuming conversations.

## Key PR Progress

1. **[#48879 — fix(core): restore Windows Git fast path](https://github.com/anomalyco/opencode/pull/48879)** — Resolves Git to an absolute `.exe` on Windows and routes the internal VCS plugin through the native spawn path, restoring performance and correctness on Windows.
2. **[#48878 — fix(tui): force terminal reset on exit for Windows ConPTY](https://github.com/anomalyco/opencode/pull/48878)** — Fixes corrupted/raw terminal state after exiting under Alacritty + zellij on Windows.
3. **[#48877 — fix(core): break filesystem/search import cycle](https://github.com/anomalyco/opencode/pull/48877)** — Eliminates a circular import that caused evaluation-time dereference failures in `filesystem.ts`.
4. **[#48871 — fix(project): resolve associated directory to its project instead of global](https://github.com/anomalyco/opencode/pull/48871)** — Direct fix for #48870; makes `project_directory` authoritative for non-git directories and should clean up session attribution.
5. **[#48867 — feat(core): make worktree APIs project-based](https://github.com/anomalyco/opencode/pull/48867)** — First pass at project-scoped worktree management; directly relevant to the multi-worktree complaints around the V2 layout.
6. **[#44264 — feat(session): add suffix compaction](https://github.com/anomalyco/opencode/pull/44264)** — Adds experimental `compaction.mode: "suffix"` across session runtimes, a meaningful addition for long-running context management.
7. **[#44535 — fix(session): stop creating phantom "unknown" tool parts on re-emitted deltas](https://github.com/anomalyco/opencode/pull/44535)** — Closes a long-standing data-integrity bug (#33618) where opencode itself injected phantom tool calls into session history.
8. **[#45207 — fix(tui): show readable Effect errors](https://github.com/anomalyco/opencode/pull/45207)** — Replaces raw `JSON.stringify` of Effect `Cause` values with human-readable output — useful given today's wave of opaque `TypeError` reports.
9. **[#47913 — docs: add Indonesian translation (README.id.md)](https://github.com/anomalyco/opencode/pull/47913)** — Community localization effort expanding reach to Indonesian developers.
10. **[#42340 — fix(cli): stop `run` from sleeping through an exhausted quota](https://github.com/anomalyco/opencode/pull/42340)** (closed) — Part of a large automated-cleanup batch landing today; `opencode run` previously produced no output and never returned on quota exhaustion.

## Hot Discussions

No discussion data was provided for this window.

## Feature Request Trends

- **Provider & billing flexibility** — LiteLLM as a first-class provider ([#22212](https://github.com/anomalyco/opencode/issues/22212), closed) and crypto payments for OpenCode Go ([#23153](https://github.com/anomalyco/opencode/issues/23153)) reflect demand for routing freedom and non-card payment options.
- **UI control and reversibility** — Users want a layout toggle back ([#39835](https://github.com/anomalyco/opencode/issues/39835)), multi-worktree support in the new layout ([#48835](https://github.com/anomalyco/opencode/issues/48835)), an MCP toggle in the new UI ([#46426](https://github.com/anomalyco/opencode/issues/46426)), and a way to clear recent project history ([#19546](https://github.com/anomalyco/opencode/issues/19546)).
- **Agent/session lifecycle APIs** — Cancellation for background subagents ([#36423](https://github.com/anomalyco/opencode/issues/36423)), cross-location subagents in V2 monorepos ([#36605](https://github.com/anomalyco/opencode/issues/36605), closed), and compaction modes signal growing sophistication in how sessions are orchestrated.
- **Plugin extensibility** — Environment-variable injection into bash from plugins ([#11065](https://github.com/anomalyco/opencode/issues/11065)) and attachment/URL handling for V2 promise tools ([#47458](https://github.com/anomalyco/opencode/issues/47458)) point to the plugin API being the next frontier.

## Developer Pain Points

- **Regressions shipping in point releases.** v1.18.30 breaks *all* prompts via an Effect layer failure in `SystemPrompt.environment` ([#48645](https://github.com/anomalyco/opencode/issues/48645), [#48803](https://github.com/anomalyco/opencode/issues/48803)). Users are A/B-testing binaries manually to stay productive.
- **Forced migration without escape hatches.** The sudden removal of the legacy layout — with no toggle and no worktree parity — is the most emotionally charged theme of the day ([#48837](https://github.com/anomalyco/opencode/issues/48837), [#48835](https://github.com/anomalyco/opencode/issues/48835), [#48859](https://github.com/anomalyco/opencode/issues/48859)).
- **Session state integrity.** Stuck sessions surviving reboots ([#43277](https://github.com/anomalyco/opencode/issues/43277)), race conditions producing stale `index.lock` files that permanently wedge snapshots ([#48848](https://github.com/anomalyco/opencode/issues/48848)), and non-git directories collapsing into a shared global project ([#48870](https://github.com/anomalyco/opencode/issues/48870), [#38529](https://github.com/anomalyco/opencode/issues/38529)).
- **Windows remains a second-class platform.** Broken ConPTY exit state, missing Git fast path, non-bundled ripgrep breaking offline installs, and absolute session paths hiding sessions from the TUI ([#48762](https://github.com/anomalyco/opencode/issues/48762), [#34442](https://github.com/anomalyco/opencode/issues/34442)) — though the day's PR queue is unusually focused on fixing this.
- **Provider-side error opacity.** `encrypted_content` failures ([#48741](https://github.com/anomalyco/opencode/issues/48741), [#48805](https://github.com/anomalyco/opencode/issues/48805)) and 422 validation errors on session replay ([#48868](https://github.com/anomalyco/opencode/issues/48868)) surface as raw upstream messages with no actionable remediation guidance.
- **Silent failures.** Desktop turns randomly marked "interrupted" with no UI error ([#48850](https://github.com/anomalyco/opencode/issues/48850)) and clipboard operations that fail without feedback ([#4283](https://github.com/anomalyco/opencode/issues/4283), [#48839](https://github.com/anomalyco/opencode/issues/48839)) erode trust more than loud errors do.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-14

## 1. Today's Highlights

No new releases shipped in the last 24 hours, but the tracker saw a heavy triage sweep: 29 issues were updated, the majority closed same-day as `[untriaged]`, alongside 8 PRs and 1 discussion. The dominant themes were **TUI rendering performance** (full-screen redraw storms, large-diff crashes, transcript re-render on every frame) and **provider correctness** (context-size defaults, Anthropic JSON Schema loss, MCP OAuth races). The most architecturally significant open work is PR #9548 (mid-conversation system messages) and issue #7739 (a formal startup-time budget targeting jcode-comparable latency).

## 2. Releases

*Omitted — no releases in the last 24h.*

## 3. Hot Issues

1. **[#7739] Set a startup-time budget targeting jcode-comparable latency and memory** — [OPEN, 8 comments]
   https://github.com/earendil-works/pi/issues/7739
   Proposes a formal startup-time budget, benchmarked against jcode v0.9.1888-dev using 10 interactive PTY launches on Linux. This is the anchor issue for perceived responsiveness; it has the highest comment count of the day and remains the main open performance target versus a competitor.

2. **[#8036] `edit` tool crashes TUI when rendering a large diff** — [OPEN, 8 comments]
   https://github.com/earendil-works/pi/issues/8036
   A ~14.5 MB diff produced from HTML files with very long physical lines crashes both live rendering and session resume, even though the edit itself succeeds. A persistent, high-engagement rendering-robustness bug.

3. **[#9255] TuiMainScreen: full-screen redraw storm when changed rows sit above the viewport top** — [OPEN, 4 comments]
   https://github.com/earendil-works/pi/issues/9255
   Long transcripts take the `firstChanged < prevViewportTop → fullRender(true)` path nearly every frame, causing violently jumping and doubled text. Directly corroborated by #9549, making this a confirmed cluster rather than an isolated report.

4. **[#9075] Compaction summarisation inherits session thinking level, deterministically hitting the output cap** — [OPEN, 3 comments, 👍 3]
   https://github.com/earendil-works/pi/issues/9075
   On adaptive-thinking Anthropic models, thinking tokens count against `max_tokens` while the summary budget stays at `~13k`, so high effort levels reliably truncate compaction. The only issue of the day with positive reactions — a well-diagnosed, deterministic correctness bug.

5. **[#9474] Codex transport: no non-resetting per-request total deadline** — [OPEN, 3 comments]
   https://github.com/earendil-works/pi/issues/9474
   Periodic heartbeat/partial-delta events defeat the idle timeout, so a stalled SSE/WebSocket stream can hang indefinitely. Affects the OpenAI-compatible path broadly; a reliability gap rather than a cosmetic one.

6. **[#9549] [fullscreen] Large transcripts re-render every frame; resize re-emits the whole transcript** — [CLOSED, 2 comments]
   https://github.com/earendil-works/pi/issues/9549
   Measured on Windows 11 / Windows Terminal / 2 logical cores with one core saturated; notably drafted by the reporter's local pi agent and disclosed per CONTRIBUTING.md. Confirms the render-loop problem spans platforms, not just Unix terminals.

7. **[#9542] Streaming UIs render the first thinking token twice** — [CLOSED, 2 comments]
   https://github.com/earendil-works/pi/issues/9542
   The `message_start` snapshot shares live mutable content with later deltas, producing duplicated text ("TheThe user asks…"). Stored messages are fine, so this is a pure UI-contract defect — closed quickly.

8. **[#9561] Length-truncated response with 14,408 tool calls floods context** — [CLOSED, 1 comment]
   https://github.com/earendil-works/pi/issues/9561
   A model generation collapse materialized one error toolResult per call, producing a 14k-entry wall in the transcript. A striking example of missing guardrails against pathological outputs.

9. **[#9563] MCP adapter: concurrent sessions race the OAuth refresh, invalidating the shared token chain** — [CLOSED, 1 comment]
   https://github.com/earendil-works/pi/issues/9563
   Paired with #9562 (keychain rewrites wiping external silent-read grants), this is the clearest production-impact scenario of the day: a launchd-driven fleet of headless sessions sharing one rotating-refresh-token MCP registration.

10. **[#9545] Reuse whole-file normalization during batch edit uniqueness checks** — [OPEN, 1 comment]
    https://github.com/earendil-works/pi/issues/9545
    `countOccurrences()` re-runs `normalizeForFuzzyMatch()` over the same whole-file string for every edit in a batch. Small, concrete, low-risk performance win in `pkg:coding-agent` / `pkg:agent` — the kind of issue likely to land quickly.

*Also worth watching:* #9566 (context size silently defaults to 128k despite real values being known), #9555 (compaction_end wipes the visible transcript), #9554 (Z.AI `glm-5.3-flash` returns chain-of-thought in `content` with no warning — 31/31 responses), #9565 (unwritable `/tmp/jiti` causes recompilation on every launch), and #9054 (`/new` discards temporary model/effort picks — closed `no-action`).

## 4. Key PR Progress

*(8 PRs updated in the last 24h — all covered.)*

1. **[#9548] Mid conversation system messages** — [OPEN] by mitsuhiko
   https://github.com/earendil-works/pi/pull/9548
   The highest-impact PR of the day: makes system prompt text and tool changes part of the transcript rather than silently rewriting starting conditions, so instruction/tool changes are recorded, restorable across resume and branch navigation, and prompt-cache-friendly. Architectural, not incremental.

2. **[#9488] fix(ai): add canonical Codex turn attribution** — [OPEN] by dannote
   https://github.com/earendil-works/pi/pull/9488
   Adds Codex session/thread/turn/window/request-kind metadata and a provider-neutral `requestIdentity`, enabling reliable attribution across tool continuations, retries, steering, and compaction recovery.

3. **[#9531] feat(tree): add permanent branch deletion from session tree** — [CLOSED] by moisestohias
   https://github.com/earendil-works/pi/pull/9531
   `SessionManager.pruneBranch(entryId)` + `countSubtree()` removes off-path entries and subtrees with active-path protection, leaf preservation, label re-chaining, and compaction re-pointing; `shift+d` in the `/tree` selector.

4. **[#9556] feat(ai): serverTools — declare provider server-side tools in model config** — [CLOSED] by truongsinh
   https://github.com/earendil-works/pi/pull/9556
   Adds raw API-native tool entries appended verbatim to the request's tools array for `openai-responses` and `anthropic-messages`, covering OpenAI `web_search` and Zhipu's GLM coding-plan proxy.

5. **[#9558] Feat/azure foundry v3** — [CLOSED] by pvjagtap
   https://github.com/earendil-works/pi/pull/9558
   Azure Foundry support for Anthropic models, plus a broad AI test-matrix coverage (stream, abort, empty, context overflow, unicode, tool-call, image, total-tokens, cross-provider handoff).

6. **[#9543] feat: "Exit" tool call for models** — [CLOSED] by AttAditya
   https://github.com/earendil-works/pi/pull/9543
   Lets the model close the chat when a user says "bye" or `/exit`; companion to discussion/issue #9544.

7. **[#9541] fix(tui): show human model labels** — [CLOSED] by domenicomassafra
   https://github.com/earendil-works/pi/pull/9541
   Renders governed-catalog `name` as the primary label in model pickers instead of raw provider/model identifiers. Small but high-visibility UX polish.

8. **[#9550] fix(coding-agent): compact before send using system and tool tokens** — [CLOSED / withdrawn] by moofone
   https://github.com/earendil-works/pi/pull/9550
   Withdrawn by the author; notable only because it targets the same compaction-accounting area as #9075.

## 5. Hot Discussions

**Show and tell**
- **[#9552] Pi Heao GUI — a Windows desktop client for pi** — [1 comment, 👍 1] by Q1y1ng
  https://github.com/earendil-works/pi/discussions/9552
  A Windows-native desktop shell built on the pi-agent-studio chat UI, explicitly *not* a reimplementation — it reuses the same chat UI. Useful signal that users on non-Unix terminals want a first-class windowed client over the TUI. (https://github.com/Q1y1ng/pi-heao-gui)

## 6. Feature Request Trends

- **Session and state continuity.** A clear cluster is forming around not losing context at boundaries: mid-conversation system/tool changes (#9548), inheriting model/effort across `/new` (#9054), viewing a live session in the main transcript (#9551), and non-nesting session selectors across working directories (#9547).
- **Provider breadth and native capabilities.** Requests for Azure Foundry (#9558), Commandcode login (#9553), provider server-side tools such as `serverTools` / GLM web search / Anthropic `web_search` (#9560, #9556), a live `llama.cpp` catalog reachable by subagents (#9559), and full-root JSON Schema passthrough for Anthropic tool definitions (#9557).
- **Model-initiated actions.** A model-callable `exit` tool (#9544, #9543) to handle conversational "bye" and `/exit` intents.
- **Extension API surface.** A scoped working-visibility override for modal prompts (#9536) and a session re-pointing API for extensions (#9551).
- **Performance budgets.** Not just fixes but explicit targets: a defined startup-time budget (#7739) and per-request wall-clock deadlines (#9474).

## 7. Developer Pain Points

- **TUI rendering is the #1 recurring frustration.** Full-screen redraw storms on long transcripts (#9255), re-rendering every frame plus full re-emit on resize (#9549), and a hard crash on a 14.5 MB diff (#8036) point to a render pipeline that degrades sharply with transcript size and line length.
- **Compaction misbehaves in both directions.** It can truncate deterministically under adaptive thinking (#9075) and it wipes the visible transcript on success (#9555) — with accounting that excludes system and tool tokens (cf. withdrawn #9550).
- **Pathological model output has no dampers.** A single 14,408-tool-call response (#9561) floods context, and `zai/glm-5.3-flash` returning chain-of-thought in `content` renders reasoning as the reply with no warning (#9554).
- **Silent configuration wrongness.** A `models.json` id collision silently yields 128k context plus wrong `cost`/`input`/`maxTokens` (#9566); the bundled `llama.cpp` provider registers an empty catalog until `/llama` (#9559).
- **Credential and OAuth fragility.** Keychain writes reset partition lists and wipe external silent-read grants (#9562), concurrent sessions race rotating MCP refresh tokens (#9563), and GitHub Copilot refresh returns a 403 scraping response under Node/undici on Windows (#9546).
- **Startup cost from tooling, not code.** An unwritable `/tmp/jiti` (e.g. a symlink into another user's `0700` home) causes TypeScript extension recompilation on every launch (#9565), reinforced by the request to lazily import jiti and the TUI graph (#9540).
- **Triage cadence note:** a high proportion of today's issues were closed same-day as `[untriaged]`, and labels such as `closed-because-weekend` / `closed-because-refactor` (#4538) suggest closed-without-fix is common — a possible source of contributor friction worth monitoring.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-14

## 1. Today's Highlights

A new nightly (`v0.23.3-nightly.20260913.faa395885e`) landed alongside `cua-driver-rs v0.20.6` with codesigned/notarized CUA driver binaries for macOS, Linux and Windows. The dominant community signal this cycle is the **React #185 "Maximum update depth exceeded" TUI crash cluster** tied to background agents — now four separate P1/reported issues converging on the same Ink layout-listener feedback loop. In parallel, CI reliability (OOM, SIGTERM, nondeterministic tests) and data-privacy leaks (AppImage env vars, session log retention) drove heavy issue traffic.

## 2. Releases

**v0.23.3-nightly.20260913.faa395885e** — Nightly cut from `release/v0.23.3-nightly.20260913.faa395885e`. Changes include `refactor(dingtalk): remove obsolete background response aggregation` ([#11570](https://github.com/QwenLM/qwen-code/pull/11570)) and a breaking `feat(channels)!` change whose description is truncated in the release notes.

**cua-driver-rs v0.20.6** — Prebuilt Qwen CUA Driver binaries, vendored under `packages/cua-driver`:
- **macOS**: codesigned + notarized universal binary + `QwenCuaDriver.app`
- **Linux**: unsigned x86_64 + arm64 (glibc 2.31 floor)
- **Windows**: unsigned UIAccess worker + native SDK payload (x86_64 + arm64)

## 3. Hot Issues

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) [P1] TUI exits silently (React #185) when multiple background agents complete** — 12 comments, the highest-engagement issue of the cycle. Root-caused to an Ink `useBoxMetrics` layout-listener `setState` loop. Community members are cross-referencing reproductions and confirming the process drops to the shell with no rendered error.

2. **[#11756](https://github.com/QwenLM/qwen-code/issues/11756) [P1] Virtualized history crashes with React #185 during background-agent workflows** — Reproduced on stable 0.23.3 and current main with Virtualized History enabled, indicating the bug is not confined to the nightly channel.

3. **[#11783](https://github.com/QwenLM/qwen-code/issues/11783) [P1] TUI crashes a few seconds after a background task is registered** — Narrowed the trigger to `run_shell_command` with `is_background: true`, giving maintainers a minimal repro surface for the #185 cluster.

4. **[#5199](https://github.com/QwenLM/qwen-code/issues/5199) Minified React error #185 (long-running)** — Open since June and still updated 2026-09-14 with 8 comments. Its persistence across three months of releases suggests the #185 class of bugs predates the recent background-agent work.

5. **[#11764](https://github.com/QwenLM/qwen-code/issues/11764) [P1] Bash allow rule authorises a second command when the first ends with a backslash inside single quotes** — A genuine permission-bypass: an unrelated command executes with no confirmation prompt. High trust-impact for anyone relying on `Bash(...)` allowlists.

6. **[#11590](https://github.com/QwenLM/qwen-code/issues/11590) [P1, CLOSED] Auto-inserted `metadata` breaks non-Qwen models via DashScope's OpenAI-compatible endpoint** — Requests to aggregating gateways fail with `400` because the vendor expects `metadata` as a `string`. Toggling the field alone restored service, making this a high-signal interop bug for multi-provider users.

7. **[#11718](https://github.com/QwenLM/qwen-code/issues/11718) [CLOSED] AppImage's bundled Python `PYTHONHOME`/`PYTHONPATH` leak into spawned stdio MCP servers** — Desktop daemon children inherit AppImage mount paths, crashing external Python interpreters. Closed within a day; a notable packaging/isolation win.

8. **[#11724](https://github.com/QwenLM/qwen-code/issues/11724) [P2] High memory usage detected: 7.00 GB, with unprompted CLI interruption** — Reported in Chinese with a 0.20.0 / Windows client; the crash prevents session resumption, forcing users to rebuild context from scratch. A duplicate ([#11725](https://github.com/QwenLM/qwen-code/issues/11725)) was closed, suggesting either triage overlap or a config-level workaround.

9. **[#11762](https://github.com/QwenLM/qwen-code/issues/11762) [P2] `/delete` does not clean `~/.qwen/tmp/<hash>/logs.json`** — Session deletion removes the JSONL transcript but leaves full conversation content (user, assistant, tool output) for *all* sessions of a project, with no setting to disable or bound retention.

10. **[#11019](https://github.com/QwenLM/qwen-code/issues/11019) [P2] AUTO mode: user approvals never reach the classifier** — A production data change proceeded despite three affirmative `ask_user_question` answers; approval mode also reverts to AUTO on session rebuild. Security-adjacent and marked `need-discussion`.

*Also worth watching:* [#11747](https://github.com/QwenLM/qwen-code/issues/11747) (TUI crash on RHEL 10 from missing `Intl.Segmenter`/ICU with no actionable diagnostic), [#11760](https://github.com/QwenLM/qwen-code/issues/11760) (telemetry redaction lacks a value-level test pin), and [#11777](https://github.com/QwenLM/qwen-code/issues/11777) (required Test job SIGTERMs with all tests green).

## 4. Key PR Progress

1. **[#11794](https://github.com/QwenLM/qwen-code/pull/11794) `fix(cli): honor output language in stateless generation`** — Applies the user's configured output-language rule to stateless session and workspace generation, with an explicit precedence rule over the request's fallback language.

2. **[#11614](https://github.com/QwenLM/qwen-code/pull/11614) `feat(cli): add bwrap kernel sandbox backend for Linux`** — Opt-in sandboxing using the kernel directly: no container runtime, root, daemon, or image. macOS and container backends untouched; nothing changes by default.

3. **[#11711](https://github.com/QwenLM/qwen-code/pull/11711) `feat(core): add container execution for subagents`** — Operators can force ordinary child dispatches into `docker`/`podman` via `QWEN_AGENT_EXECUTION_BACKEND`; agent definitions may require `executionBackend: container`.

4. **[#11538](https://github.com/QwenLM/qwen-code/pull/11538) `feat: select the OpenAI wire API per model`** — Adds per-model `wireApi: "chat-completions" | "responses"`, with effective protocol retained across runtime selection and recorded sessions. Directly relevant to the interop issues seen with aggregating gateways.

5. **[#11692](https://github.com/QwenLM/qwen-code/pull/11692) `feat(core): make the web_search budget configurable`** — `tools.webSearch.timeoutMs` (env `WEB_SEARCH_TIMEOUT_MS`), default raised 60s → 120s, plus a bounded extractor fallback so timeouts degrade gracefully.

6. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086) `feat(serve): scope extensions to workspace runtimes`** — Makes the global extension catalog available through each workspace's selected runtime and exposes workspace-qualified daemon/SDK access. ~20 review rounds; produced follow-ups in [#11793](https://github.com/QwenLM/qwen-code/issues/11793).

7. **[#11636](https://github.com/QwenLM/qwen-code/pull/11636) `feat: track background result execution across daemon and web shell`** — Gives background-result processing an explicit daemon execution lifecycle, consuming results at a safe model boundary and deferring older ones until automatic continuation is possible.

8. **[#11242](https://github.com/QwenLM/qwen-code/pull/11242) `feat(browser-use): add Chrome Native Messaging relay`** — Bridges the Browser SDK to the user's existing Chrome via a local native-messaging host plus the Qwen Chrome extension, managing debugger attachment and CDP forwarding.

9. **[#11562](https://github.com/QwenLM/qwen-code/pull/11562) `fix(cli): keep one-shot system reminders out of the user's own message`** — Stops folded-in reminders from appearing in the transcript line, cross-session ↑-recall history, cancelled-turn composer refill, and exported sessions.

10. **[#11722](https://github.com/QwenLM/qwen-code/pull/11722) `feat(web-shell): add PWA installability and Android development shell`** — Adds installability metadata and a production service worker to the daemon-served Web Shell, with revalidation for public install resources and cache separation for content-addressed assets.

*Also active:* [#11731](https://github.com/QwenLM/qwen-code/pull/11731) (bounded `npm ci` retry in `e2e.yml`), [#11788](https://github.com/QwenLM/qwen-code/pull/11788) (treat write-side PTY `EIO` as benign teardown), [#11778](https://github.com/QwenLM/qwen-code/pull/11778) (Windows command hooks via `cmd` fallback + PowerShell probe), [#11635](https://github.com/QwenLM/qwen-code/pull/11635) (fixed scheduled tasks in session sidebar).

## 5. Hot Discussions

No Discussions data was provided for this cycle — section omitted.

## 6. Feature Request Trends

- **Stronger isolation for agents.** Two parallel efforts — the Linux `bwrap` kernel sandbox ([#11614](https://github.com/QwenLM/qwen-code/pull/11614)) and container execution for subagents ([#11711](https://github.com/QwenLM/qwen-code/pull/11711)) — signal demand for confinement without container-runtime or root dependencies.
- **Per-model provider flexibility.** Per-model `wireApi` selection ([#11538](https://github.com/QwenLM/qwen-code/pull/11538)), the Anthropic `thinking`-block signature issue ([#11772](https://github.com/QwenLM/qwen-code/issues/11772)), and the `metadata` interop bug ([#11590](https://github.com/QwenLM/qwen-code/issues/11590)) all point to users mixing Qwen with third-party and self-hosted backends.
- **Daemon/background durability.** Turn-status polling durability decisions ([#11773](https://github.com/QwenLM/qwen-code/issues/11773)) and runtime-recycle retry gaps ([#11767](https://github.com/QwenLM/qwen-code/issues/11767)) show `qwen serve` deployments hitting state-lifecycle limits.
- **Web Shell as a real app.** PWA installability plus an Android development shell ([#11722](https://github.com/QwenLM/qwen-code/pull/11722)) and locale-aware UI strings ([#11791](https://github.com/QwenLM/qwen-code/issues/11791)) indicate the web surface is being treated as a first-class client.
- **Language/locale control everywhere.** Requests to honor configured output language in stateless generation ([#11794](https://github.com/QwenLM/qwen-code/pull/11794)) and to stop hardcoding English/Simplified Chinese in the command-explanation panel ([#11791](https://github.com/QwenLM/qwen-code/issues/11791)).
- **Multi-agent workflow controls.** Agent Board follow-ups ([#11755](https://github.com/QwenLM/qwen-code/issues/11755)) flag `--as` hiding claimable work and non-binding `--owner` semantics.

## 7. Developer Pain Points

- **CI flakiness is the top recurring frustration.** Three separate threads describe intermittent failures with no logic errors: the required Test job SIGTERMing at the workspace→`test:scripts` handoff with all suites green ([#11777](https://github.com/QwenLM/qwen-code/issues/11777)), `tsc --build` OOMing at the 3072 MB heap cap with `main` alone peaking at 3.14 GB ([#11780](https://github.com/QwenLM/qwen-code/issues/11780)), and non-deterministic shared-runner failures hitting a different test set each run ([#10490](https://github.com/QwenLM/qwen-code/issues/10490)). Visual previews are also nondeterministic ([#11465](https://github.com/QwenLM/qwen-code/issues/11465)).
- **The React #185 TUI crash is unresolved and spreading.** Four issues now describe the same "Maximum update depth exceeded" death across stable and main, triggered by background agents, background shell tasks, and virtualized history.
- **Memory pressure kills long sessions.** The 7 GB memory warning ([#11724](https://github.com/QwenLM/qwen-code/issues/11724)) interrupts work irrecoverably, and users report no way to resume the task afterward.
- **Data retention surprises.** `/delete` leaves full conversation logs behind ([#11762](https://github.com/QwenLM/qwen-code/issues/11762)), and telemetry redaction lacks a value-level regression pin ([#11760](https://github.com/QwenLM/qwen-code/issues/11760)).
- **Security-adjacent correctness gaps.** Shell allow-rule bypasses ([#11764](https://github.com/QwenLM/qwen-code/issues/11764)) and AUTO-mode approvals that never reach the classifier ([#11019](https://github.com/QwenLM/qwen-code/issues/11019)) erode trust in the permission model.
- **Platform-specific breakage on Windows and Linux.** Missing ICU/`Intl.Segmenter` crashes the TUI on RHEL 10 with no actionable diagnostic ([#11747](https://github.com/QwenLM/qwen-code/issues/11747)), and Windows command hooks needed a shell-resolution fix ([#11778](https://github.com/QwenLM/qwen-code/pull/11778)).
- **Review-process debt is being explicitly tracked.** Multiple "deferred review findings" issues ([#11738](https://github.com/QwenLM/qwen-code/issues/11738), [#11793](https://github.com/QwenLM/qwen-code/issues/11793), [#11587](https://github.com/QwenLM/qwen-code/issues/11587), [#11755](https://github.com/QwenLM/qwen-code/issues/11755)) show the five-round review rule pushing valid non-critical findings into follow-up backlog faster than they are cleared.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*