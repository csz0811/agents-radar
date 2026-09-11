# AI CLI Tools Community Digest 2026-09-11

> Generated: 2026-09-11 00:31 UTC | Tools covered: 7

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

# Cross-Tool AI CLI Community Comparison — 2026-09-11

## 1. Ecosystem Overview

The AI CLI landscape is shifting from single-turn coding assistants to long-running agent runtimes with budgets, permissions, memory, subagents, and plugin ecosystems. Release cadence is uneven: Qwen Code shipped a stable CLI/SDK/desktop set, Claude Code shipped a stable gateway-pricing release, Codex advanced SDK/Rust/voice builds, Gemini remained on nightly, and OpenCode/Pi had no release but high issue/PR churn. Across communities, the strongest shared concerns are **trust in usage/cost accounting**, **session durability and resumability**, **MCP/plugin correctness**, **sandbox/security hardening**, and **Windows parity**. Enterprise governance is also moving from configuration files into managed policies, provider restrictions, and auditable sandbox rules.

## 2. Activity Comparison

| Tool | Issues (last 24h) | PRs (last 24h) | Discussions (last 24h) | Release status |
|---|---:|---:|---:|---|
| **Claude Code** | 10 highlighted; total not reported | 3 updated | N/A — not provided | v2.1.268 stable |
| **OpenAI Codex** | 11 highlighted; total not reported | 12 highlighted | 20 active threads across Ideas/Q&A/Show & tell | python-v0.154.0; rust v0.155.0-alpha.2.3; voice CI build |
| **Gemini CLI** | 10 highlighted + 3 watch; total not reported | 10 highlighted + 3 notable | N/A — not provided | v0.61.0-nightly.20260910 |
| **GitHub Copilot CLI** | 36 updated | 2 updated | N/A — not provided | v1.0.84-4 prerelease |
| **OpenCode** | 10 highlighted; total not reported | 10 highlighted | N/A — not provided | No new release |
| **Pi** | 50 updated | 21 updated | 4 highlighted threads | No new release |
| **Qwen Code** | 10 highlighted + notable; total not reported | 10 highlighted + 4 also moving | N/A — not provided | v0.23.3 stable; sdk-typescript v0.1.12; desktop v0.3.0 + preview; nightly |

> Note: “Highlighted” means the digest listed those items but did not report a total. “N/A — not provided” means no Discussions data was included in the digest; it does not imply zero activity. No tool in this set reported that Issues/PRs are disabled upstream.

## 3. Shared Feature Directions

- **Trustworthy usage, cost, and cache accounting** — Claude Code (gateway pricing parity, `budget.spent()` 72x under-report, prompt-cache resume failures), Codex (quota-depletion meta-tracker, capacity errors, turn metrics PR), Copilot CLI (PRU quota surprises, credential visibility), OpenCode (token usage display, free-tier opacity, billing friction), Pi (Bedrock cache-write billing, `usage.input` normalization). Users increasingly treat accurate metering as a product requirement, not telemetry polish.
- **Undo / rewind / checkpointing / resumable sessions** — Codex’s `/rewind` discussion is the highest-upvoted item in the dataset; Copilot CLI reports compaction OOM and stale locks that permanently brick sessions; OpenCode’s auto-compaction can lose the original task goal; Pi has model drift on resume; Qwen’s VS Code extension silently hides pre-0.23.x history. The shared ask is deterministic rollback, safe compaction, and durable session state.
- **Durable memory, instructions, skills, and subagent control** — Codex (`/learn`, Memories, live `AGENTS.md` reload), Claude Code (Function Hooks, per-agent config, recursion limits), Gemini (skills/subagents under-used, Auto Memory), Pi (extension system-prompt append), Qwen (structured recall, Goal budgets), Copilot CLI (org agents, custom agent `target`). Communities want memory and rules to be first-class, editable, and lifecycle-aware.
- **MCP/plugin/extension lifecycle correctness** — Codex (OAuth refresh, plugin exclusions), Gemini (MCP policy, 400-tool ceiling), Copilot CLI (OAuth callback mismatch, spec-invalid `server/discover`, tools stripped after timeout), OpenCode (V2 `event.subscribe` delivering nothing), Claude Code (Function Hooks), Pi (extension provider defaults), Qwen (workspace-scoped extensions). Key needs: spec compliance, auth reliability, mid-session tool updates, and enterprise policy enforcement.
- **Sandbox, security, and enterprise governance** — Gemini (filesystem isolation, path traversal, prompt injection), Codex (permission profiles, managed model providers, sandbox path context), Copilot CLI (org/enterprise MCP auth), Claude Code (egress allowlists, gateway access control), OpenCode (managed provider policies), Qwen (deterministic tool-execution boundaries), Pi (default tool timeouts). The direction is fail-closed defaults, path normalization, managed config, and auditability.
- **Windows and cross-platform parity** — Claude Code (Cowork Plan9 broken by KB5124008), Codex (desktop send button, WSL sandbox, voice/OAuth), Copilot CLI (plugin update locks, SSH/tmux clipboard, WSL2 ARM64), Gemini (Wayland, NTFS short names), Pi (Windows `shellPath` ignored), Qwen (Windows MCP `-32000` connection closed). Windows remains the most consistently degraded platform.
- **TUI/input ergonomics as professional-editor expectations** — Copilot CLI (vi/vim mode closed, Ctrl+Backspace, copy/paste), OpenCode (vertical tabs, token display), Pi (fullscreen scroll, cursor-marker leaks), Gemini (resize flicker), Claude Code (mousewheel behavior), Qwen (TUI React crash). Users expect editor-grade keybindings and stable rendering.
- **Multi-provider compatibility and caching** — OpenCode (Anthropic cache breakpoints, OpenRouter suffixes, DeepSeek errors), Pi (Bedrock reasoning effort, Gemini `thoughtSignature`, cache-key proxies), Qwen (DashScope `metadata` 400s, per-model OpenAI API selection), Codex (model attribution across switches), Claude Code (prompt-cache read/write correctness). Provider quirks are now a first-order reliability and cost issue.

## 4. Differentiation Analysis

| Tool | Feature focus | Target users | Technical approach |
|---|---|---|---|
| **Claude Code** | Managed gateway pricing, Function Hooks, Cowork/cloud sessions, subagent orchestration, plugin extensibility | Teams and enterprises using managed LLM gateways; plugin authors | Hooks/plugins, managed settings, gateway parity, desktop/CLI surface |
| **OpenAI Codex** | Cross-surface desktop/CLI/SDK, quota/capacity, sandbox/security, memory RFC, MCP OAuth | Pro/Plus individuals, enterprise IT, multi-device developers | Python SDK + Rust alpha, managed provider config, platform hardening sweep |
| **Gemini CLI** | Sandbox hardening, AST-aware tooling, agent observability, Workspace auth | Google Cloud/Workspace enterprises, MCP-heavy users | OS-level sandboxing, path guards, prompt-injection defenses, nightly releases |
| **GitHub Copilot CLI** | Plugin/instruction/LSP CLI, org agents, MCP interop, terminal parity | GitHub orgs/enterprises, VS Code users | GitHub-native auth/plugins, JSON automation, security bot, but session/memory fragility |
| **OpenCode** | TUI V2, provider compatibility, storage, payments, managed policies | Individual devs, cost-sensitive/multi-provider users, plugin authors | SQLite event store, recursive TUI grouping, provider normalize fixes, Console policies |
| **Pi** | Provider transport accounting, extensions/RPC, fullscreen TUI, headless SDK | Extension authors, SDK/daemon embedders, multi-provider power users | Minimal core + RPC, extension hooks, cache/usage correctness, performance fixes |
| **Qwen Code** | Daemon/Web Shell/desktop, DashScope routing, IDE integration, Goal/memory control | Qwen ecosystem users, daemon integrators, VS Code/Remote-SSH users | Daemon as platform, workspace-scoped extensions, structured memory, desktop consolidation |

Claude Code, Codex, and Copilot CLI are closest to enterprise-ready platforms: managed settings, org policy, MCP/plugin surfaces, and sandbox controls. Gemini and Qwen are hardening enterprise auth and sandboxing while iterating quickly. OpenCode and Pi are more ecosystem/extensibility-oriented, with Pi emphasizing a stable core plus external GUIs, and OpenCode emphasizing provider breadth, TUI, and storage reliability.

## 5. Community Momentum & Maturity

- **Highest raw issue/PR throughput:** Pi (50 issues, 21 PRs) and Copilot CLI (36 issues) show strong community volume; Copilot’s PR count was unusually low (2), suggesting issue triage rather than merge-heavy iteration.
- **Strong multi-channel activity:** Codex combines 11 highlighted issues, 12 highlighted PRs, and 20 active Discussions threads, indicating a broad desktop/CLI/SDK community. Its third-party limit dashboards and HUDs are a maturity signal.
- **Rapid release iteration:** Qwen Code shipped stable CLI, SDK, desktop, preview, and nightly artifacts in one window. Codex advanced Python SDK, Rust alpha, and voice CI. Gemini shipped a nightly. Claude Code shipped a stable gateway-pricing release.
- **Enterprise maturity:** Claude Code, Copilot CLI, and Codex show the clearest enterprise controls: managed gateways/providers, org agents, MCP policy, sandbox rules, and audit-oriented telemetry. However, all three still have significant trust gaps around quota, cost, and Windows reliability.
- **Ecosystem-building phase:** OpenCode and Pi show plugin API friction but also active community surfaces — desktop apps, provider managers, RPC-based GUIs, and session visualizations. This suggests adoption beyond the core CLI.
- **Risk signals:** Copilot CLI has a memory-exhaustion cluster; Qwen has broad Windows MCP failures; Codex has quota/capacity distrust; Claude Code has stale-bot churn and Windows Cowork regression. These are the areas most likely to affect retention.

## 6. Trend Signals

- **From coding assistant to agent runtime:** The market is converging on budgets, permissions, subagents, memory, sandboxing, and plugin APIs. CLI tools are becoming orchestration platforms.
- **Metering trust is a differentiator:** Accurate per-turn, per-model, cache-aware usage accounting is now a competitive feature. Users will adopt tools that can explain spend and enforce limits predictably.
- **Session durability is the new reliability bar:** Undo/rewind, checkpointing, safe compaction, and resumability are no longer nice-to-have; they are baseline expectations for long-running agent work.
- **MCP/plugins are becoming enterprise surfaces:** OAuth, policy enforcement, lifecycle correctness, and spec compliance are moving from community edge cases to IT requirements.
- **Security is shifting left:** Prompt injection, path traversal, sandbox isolation, and managed provider restrictions are active PR themes across Gemini, Codex, Copilot, Claude Code, OpenCode, and Qwen.
- **Windows parity remains an adoption blocker:** Plugin update locks, sandbox path mapping, MCP STDIO failures, clipboard issues, and WSL edge cases recur across nearly every tool.
- **Multi-provider caching and routing are cost/performance levers:** Reasoning-effort passthrough, cache breakpoints, route modifiers, and error normalization are becoming table stakes for power users.
- **External observability/control planes are emerging:** Community-built usage meters, session maps, desktop surfaces, and provider managers indicate demand for stable CLI cores with rich external GUIs and RPC APIs.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report
**Source:** github.com/anthropics/skills · **Data as of:** 2026-09-11

> **Data caveat:** PR comment counts in the dataset were returned as `undefined`. PR ranking below is therefore derived from **proxy signals** — volume of linked issues with active comment threads, number of related PRs per skill, update recency, and 👍 counts on related issues. Issue-based rankings use exact comment counts.

---

## 1. Top Skills Ranking

| # | Skill | Key PRs | Function | Status |
|---|-------|---------|----------|--------|
| 1 | **skill-creator** (eval harness) | [#1298](https://github.com/anthropics/skills/pull/1298), [#1099](https://github.com/anthropics/skills/pull/1099), [#1050](https://github.com/anthropics/skills/pull/1050), [#539](https://github.com/anthropics/skills/pull/539) | Meta-skill that scaffolds new Skills and auto-optimizes their `description` via `run_eval.py` / `run_loop.py` | All **open** |
| 2 | **document-skills** (docx / pdf / typography) | [#514](https://github.com/anthropics/skills/pull/514), [#1734](https://github.com/anthropics/skills/pull/1734), [#541](https://github.com/anthropics/skills/pull/541), [#538](https://github.com/anthropics/skills/pull/538) | Typographic QC (orphans/widows/numbering), orphaned-comment detection, OOXML `w:id` collision fix, case-sensitive reference fix | All **open** |
| 3 | **mcp-builder** | [#1742](https://github.com/anthropics/skills/pull/1742), [#1724](https://github.com/anthropics/skills/pull/1724), [#1602](https://github.com/anthropics/skills/pull/1602) | Scaffolds and evaluates MCP servers (Phase-4 harness) | All **open** |
| 4 | **claude-api** | [#1607](https://github.com/anthropics/skills/pull/1607) | API reference skill (models, retirements, usage guidance) | **Open** |
| 5 | **Reasoning / output quality skills** | [#1367](https://github.com/anthropics/skills/pull/1367) (self-audit) | Mechanical file verification + four-dimension reasoning quality gate | **Open** |
| 6 | **Meta analyzers** | [#83](https://github.com/anthropics/skills/pull/83) | `skill-quality-analyzer` + `skill-security-analyzer` for marketplace | **Open** |
| 7 | **frontend-design** | [#210](https://github.com/anthropics/skills/pull/210) | Clarifies and makes frontend design guidance actionable/coherent | **Open** |

**Discussion highlights**

- **skill-creator is the single hottest thread.** PR #1298 reports `recall=0%` for *every* description — meaning `run_loop.py` and `improve_description.py` are "optimizing against noise." It cross-references Issue [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 👍7), which documents 10+ independent reproductions. #1099 and #1050 independently trace the same symptom to Windows subprocess/`PATHEXT` and pipe-reading bugs — three separate authors, same root cause.
- **document-skills shows the classic "correctness debt" pattern:** four small, uncontroversial fixes (case sensitivity, `w:id` collisions, orphan detection, typography) sitting unmerged.
- **mcp-builder** has a compounding failure chain: stale default model ([#1724](https://github.com/anthropics/skills/pull/1724)), broken `mcp>=2` import path ([#1742](https://github.com/anthropics/skills/pull/1742)), and an evaluation harness that scores 0/N against any real server ([#1390](https://github.com/anthropics/skills/issues/1390)).
- **claude-api** drew attention for a resource problem rather than a correctness one — Issue [#1487](https://github.com/anthropics/skills/issues/1487) reports the skill eagerly injects **~156k tokens**, exhausting the context window in a single tool call.

---

## 2. Community Demand Trends (from Issues)

| Demand direction | Evidence | Signal strength |
|---|---|---|
| **Security & trust boundaries** | [#492](https://github.com/anthropics/skills/issues/492) (43 comments) — community skills impersonating `anthropic/` namespace; [#1175](https://github.com/anthropics/skills/issues/1175) — SharePoint access-control inside SKILL.md | ⭐⭐⭐ Highest comment count in the entire dataset |
| **Skill distribution & sharing** | [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 👍8) — org-wide skill sharing; [#189](https://github.com/anthropics/skills/issues/189) (👍9) — duplicate plugin content | ⭐⭐⭐ Strongest 👍 support |
| **Evaluation reliability** | [#556](https://github.com/anthropics/skills/issues/556) (12, 👍7), [#1390](https://github.com/anthropics/skills/issues/1390) | ⭐⭐⭐ |
| **Context/token efficiency** | [#1487](https://github.com/anthropics/skills/issues/1487) — 156k-token injection; [#1329](https://github.com/anthropics/skills/issues/1329) (9 comments) — `compact-memory` symbolic notation | ⭐⭐ Emerging |
| **Governance & quality gates** | [#412](https://github.com/anthropics/skills/issues/412) (closed) — agent-governance; [#1385](https://github.com/anthropics/skills/issues/1385) — three-gate reasoning pipeline | ⭐⭐ |
| **Portability / platform** | [#29](https://github.com/anthropics/skills/issues/29) — AWS Bedrock; [#16](https://github.com/anthropics/skills/issues/16) — expose Skills as MCPs; [#62](https://github.com/anthropics/skills/issues/62) (10) | ⭐⭐ |
| **Format & toolchain coverage** | [#1362](https://github.com/anthropics/skills/issues/1362) — pnpm ≥10 bundling; ODT/ODS support | ⭐ |

**Notable:** #202 (*skill-creator should follow best practice*, closed) and #412 (agent-governance, closed) suggest maintainers are closing design-level proposals while keeping bug-class issues open.

---

## 3. High-Potential Pending Skills

All items below are **open and unmerged**, ranked by recent activity — these are the most likely to land next.

1. **[#1734](https://github.com/anthropics/skills/pull/1734) — Orphaned docx comment detection** (updated 2026-09-10, newest open PR in the set). Narrow, testable, ships in the existing docx skill.
2. **[#1742](https://github.com/anthropics/skills/pull/1742) — mcp-builder `mcp>=2` import + custom headers** (updated 2026-09-10). Explicitly `Fixes #1668`; a hard blocker for anyone on current SDKs.
3. **[#1724](https://github.com/anthropics/skills/pull/1724) — mcp-builder default model → `claude-sonnet-5`** (updated 2026-09-07). Trivial diff, high visibility.
4. **[#1627](https://github.com/anthropics/skills/pull/1627) — buffer-api skill** (updated 2026-09-05). Portable GraphQL scheduling skill spanning Claude/Cursor/Codex.
5. **[#1607](https://github.com/anthropics/skills/pull/1607) — claude-api retired model IDs** (updated 2026-09-01, `Fixes #1603`). Pure documentation accuracy.
6. **[#1628](https://github.com/anthropics/skills/pull/1628) — Hivemind multi-agent orchestration** (2026-08-24). Delegates mechanical work to free headless workers; positions Claude Code as sole planner/reviewer.
7. **[#1615](https://github.com/anthropics/skills/pull/1615) — scnet-hpc** (2026-08-24) and **[#1367](https://github.com/anthropics/skills/pull/1367) — self-audit** (2026-07-02): two substantial domain skills with complete scope statements, awaiting maintainer bandwidth rather than further author iteration.
8. **[#514](https://github.com/anthropics/skills/pull/514) — document-typography** (2026-03-13): the highest-value *new standalone* skill proposal; widely applicable but slow-moving.

---

## 4. Skills Ecosystem Insight

> **The community's demand is concentrated on making Skills *trustworthy and measurable* rather than on adding more of them** — the loudest threads are about evaluation harnesses that report false 0% recall, namespace-level trust-boundary abuse, token-budget blowouts, and distribution mechanics, not about novel Skill capabilities.

---

*Methodology note: rankings use proxy attention signals because PR comment counts were unavailable; all stated PR statuses (open/closed) are taken directly from the dataset. No PR in the top-20 list shows as merged.*

---

# Claude Code Community Digest — 2026-09-11

## 1. Today's Highlights

Release v2.1.268 lands gateway pricing parity: with `pricing:` set in `gateway.yaml`, signed-in Claude Code clients now see the same rates via managed settings, so `/cost` and telemetry line up with the spend meter. The dominant community thread remains **Function Hooks** (#91870, 158 comments, 91 👍), where maintainers committed to shipping "on the scale of weeks." Meanwhile, a cluster of Windows Cowork reports (#92984, #93118, #93071, #93221) ties broken Plan9 drive mounts to the September Windows update KB5124008 — uninstalling the KB is the current workaround.

## 2. Releases

**v2.1.268** ([releases](https://github.com/anthropics/claude-code/releases))
- Gateway pricing parity: when `pricing:` is set in `gateway.yaml`, signed-in Claude Code clients receive the same rates through managed settings, aligning `/cost` and telemetry with the spend meter.
- New startup warning for gateways when `access_control.allow_cidrs` is empty (note truncated in source), nudging operators toward an explicit allowlist.

## 3. Hot Issues

1. **[#42776](https://github.com/anthropics/claude-code/issues/42776)** — *Desktop fails to relaunch on Windows due to orphaned process file lock* (170 comments, 82 👍). The longest-running and most-commented open bug in the set; still `[invalid]`-tagged, which the community has repeatedly pushed back on given the reproducible relaunch failure.
2. **[#91870](https://github.com/anthropics/claude-code/issues/91870)** — *Function Hooks — make plugins 10x more powerful* (158 comments, 91 👍). Highest-signal enhancement thread; maintainers credited community design feedback and gave a shipping timeline, making this the flagship extensibility item.
3. **[#92984](https://github.com/anthropics/claude-code/issues/92984)** — *Cowork (Windows): all Plan9 shares fail with "invalid argument" after KB5124008* (81 comments, 40 👍). Has repro; uninstalling the KB fixes it, implicating an OS-level regression that Claude Code must work around.
4. **[#30112](https://github.com/anthropics/claude-code/issues/30112)** — *Cowork network egress allowlist blocks custom domains with 403* (57 comments, 54 👍). Six months old with a high 👍-to-comment ratio — a silent blocker for teams running Cowork behind egress controls.
5. **[#76248](https://github.com/anthropics/claude-code/issues/76248)** — *Git proxy blocks all pushes; PAT pass-through no longer works* (34 comments, 14 👍). Reported as a mid-session behavior change; directly breaks agentic push workflows and BYO-credential expectations.
6. **[#83510](https://github.com/anthropics/claude-code/issues/83510)** — *Measurable quality regression in Claude generation 5* (13 comments, 21 👍). Claims ~2x verbosity, weaker nonsense detection, and under-disclosed fallback (Fable 5 → Opus 4.8) with reproducible measurements — the most rigorous quality complaint in the list.
7. **[#83048](https://github.com/anthropics/claude-code/issues/83048)** — *SEV-1: `budget.spent()` reports 72x under actual consumption* (4 comments). Cost-control failure that burned a weekly budget in 4 hours; low comment count but critical severity for anyone instrumenting quotas.
8. **[#93490](https://github.com/anthropics/claude-code/issues/93490)** / **[#91971](https://github.com/anthropics/claude-code/issues/91971)** — *`--resume` never hits the prompt cache past the static prefix*. Two reports converging on the same mechanism: session-start context is replayed as a plain string instead of content blocks, so cache writes are paid but never read. Related to [#83913](https://github.com/anthropics/claude-code/issues/83913) (hook `additionalContext` invalidating cache).
9. **[#92183](https://github.com/anthropics/claude-code/issues/92183)** — *Desktop disallows SendMessage, so subagents cannot be messaged or resumed* (6 comments, 18 👍). Breaks the agent-orchestration loop specifically in the desktop Code tab, where subagents otherwise launch fine.
10. **[#82565](https://github.com/anthropics/claude-code/issues/82565)** — *general-purpose subagents recursively spawn: 3 requested → 24 ran* (1 comment). 80% of tokens wasted and a monthly spend limit consumed in ~20 minutes; the clearest illustration of missing recursion/depth guards.

## 4. Key PR Progress

Only **3 pull requests** were updated in the last 24h (matching the total reported), so this section covers the full set rather than 10 items.

1. **[#93452](https://github.com/anthropics/claude-code/pull/93452)** (OPEN, poteat) — *mods/diff: match the built-in /diff panel.* Aligns the `/diff` mod's pane with the built-in panel: hunks drawn through the engine's code element, the built-in close ✕, matching row spacing and empty-state placement, narrow-terminal resize handling, and only one repository probe in flight at a time.
2. **[#93244](https://github.com/anthropics/claude-code/pull/93244)** (CLOSED, poteat) — *mods: API renames, telemetry fixes, and a diff backend seam.* Follows the plugin API naming pass (`isFocused`, `tool`), tightens telemetry (per-row analytics switch reads, no data sent for third-party providers), and introduces a backend seam with git as the built-in so other VCS backends can plug in.
3. **[#89404](https://github.com/anthropics/claude-code/pull/89404)** (OPEN, bcherny) — *validate-agent.sh: don't abort at the first warning and stop false-flagging valid agents.* Fixes [#83803](https://github.com/anthropics/claude-code/issues/83803); three root causes were all `set -euo pipefail` interactions with `((warning_count++))` arithmetic, which made the plugin-dev skill's validator fail on its own agent files. A reminder that repo tooling is now a real plugin-authoring surface.

## 5. Hot Discussions

No GitHub Discussions data was provided in this dataset — section omitted.

## 6. Feature Request Trends

- **Deeper plugin/hook extensibility** — Function Hooks (#91870) is the headline; the diff-mod PRs (#93452, #93244) and worktree-hook bugs (#79872) show demand for hooks that fire on session/worktree lifecycle events, not just tool calls.
- **Per-agent configuration** — [#66402](https://github.com/anthropics/claude-code/issues/66402): `/model` and `/effort` write globally to `~/.claude/settings.json`, with no supported way to run a fleet with independent model/effort settings.
- **Programmatic control over subagents** — [#92183](https://github.com/anthropics/claude-code/issues/92183) (message/resume subagents) and [#82565](https://github.com/anthropics/claude-code/issues/82565) (recursion limits) point to requests for explicit spawning depth, budgets, and lifecycle APIs.
- **Configurable network egress in managed/Cowork sessions** — [#30112](https://github.com/anthropics/claude-code/issues/30112) and [#34690](https://github.com/anthropics/claude-code/issues/34690) ask that allowlist settings actually propagate into the session proxy JWT.
- **Transparent, trustworthy cost accounting** — gateway pricing parity (v2.1.268), `budget.spent()` accuracy, and prompt-cache correctness are converging into a single "I need to trust the meter" theme.

## 7. Developer Pain Points

- **Windows Cowork is degraded by an OS update.** KB5124008 (26200.9445) breaks Plan9 sharing across multiple independent reports (#92984, #93118, #93071, #93221) — `device_bash` is dead, restarts and app updates don't help, and the only fix is uninstalling the KB.
- **Prompt caching silently fails on resume, inflating spend.** #93490, #91971, and #83913 describe cache writes being paid for but never read on chained `--resume` / history rebuilds; the static prefix caches fine, the conversation tail never does.
- **Billing and quota telemetry disagree with reality.** #83048 (`budget.spent()` 72x under-report), #80750 (credits consumed while plan allowance remains), #86033 (15–20x quota burn), and #68773 (29 auto-recharge charges, $661) — a persistent trust problem across consumer and Max plans.
- **Subagents burn tokens unpredictably.** Recursive spawning with no depth guard (#82565) and global-only model/effort settings (#66402) make fleet runs hard to cost-predict.
- **Cowork/cloud credential boundaries are tightening without opt-outs.** #76248 (PAT pass-through stopped working mid-session) and #30112 (custom domains 403'd) both break previously working workflows with little advance notice.
- **TUI and desktop polish issues linger for months.** #12953 (mousewheel scrolls input history instead of chat, 21 👍, open since Dec 2025), [#93489](https://github.com/anthropics/claude-code/issues/93489) (light/dark-ansi themes render white-on-white), and #42776 (desktop relaunch, open since April) show long-tail UX debt.
- **Stale-bot churn obscures signal.** Several substantive cost and plugin issues (#80750, #86033, #77927, #68773) were closed as `stale`, forcing users to re-file and fragmenting the discussion.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-11

## 1. Today's Highlights

Release activity centered on the Python SDK (`python-v0.154.0`) landing new `max`/`ultra` reasoning-effort values, while Rust line `0.155.0-alpha.2.3` continues pre-release iteration. The issue tracker is dominated by a cross-report meta-tracker (#41220) on abnormal quota depletion and by a cluster of "Selected model is at capacity" reports across Pro/Plus accounts — capacity and usage-accounting reliability is clearly the community's top concern today. Meanwhile, the PR queue shows a broad hardening sweep touching sandbox path resolution, AGENTS.md instruction reloading, login redirect security, and Windows voice/OAuth robustness.

## 2. Releases

**python-v0.154.0** — Python SDK release, installable via `pip install --upgrade openai-codex==0.154.0` (Python 3.10+), bundled with matching `openai-codex-cli-bin==0.154.0`.
- Adds `max` and `ultra` reasoning-effort values ([#39662](https://github.com/openai/codex/pull/39662)) — expands the effort ceiling for high-compute tasks.
- Adds `ExternalMessage` to the synchronous API surface.

**voice-cygwin-108b38cf67cbb731** — CI-only build tooling for native Windows voice releases: `cygwin-build-inputs.tar.gz` (103 pinned Cygwin binary packages plus signed package index) and `cygwin-build-sources.tar` (83 corresponding sources). **Not included in user packages.**

**rust-v0.155.0-alpha.2.3 / alpha.2 / alpha.1** — Pre-release channel increments with no published notes.

## 3. Hot Issues

- **[#41220](https://github.com/openai/codex/issues/41220)** — *[Meta] Abnormal Codex usage/quota depletion and usage-accounting inconsistencies* (35 comments, 13 👍). The consolidating tracker for a family of reports where subscription quota or purchased credits drain far faster than token evidence predicts. Highest-engagement issue of the day; effectively the community's canonical complaint thread.
- **[#40968](https://github.com/openai/codex/issues/40968)** — Windows Codex desktop: Send button spins forever, prompts never submit (34 comments, 6 👍). A Pro x5 user on Windows 11 build 26200; long-running and still unresolved, blocking basic app usability on Win11.
- **[#40575](https://github.com/openai/codex/issues/40575)** — *[RFC] Towards Self-Evolving Agents: Interactive Instruction Distillation (`/learn`) and Rule Metabolism for `AGENTS.md`* (26 comments). Proposes a `/learn` command that distills session experience into durable rules for `AGENTS.md`. Strong signal that the community wants agent memory to be first-class and editable.
- **[#29639](https://github.com/openai/codex/issues/29639)** — Browser Use Node REPL fails on Windows Desktop with WSL workspace due to unmapped `sandboxCwd` (26 comments, 8 👍). Open since June; a concrete cross-platform sandbox path bug that keeps resurfacing, and thematically matched by today's path-context PRs.
- **[#43375](https://github.com/openai/codex/issues/43375)** — Multiple GPT-5/GPT-6 models return "Selected model is at capacity" (20 comments, 11 👍). Confirms the error is not model-specific — it spans the model lineup, which shifts suspicion to capacity routing or account-level state.
- **[#21803](https://github.com/openai/codex/issues/21803)** — Feature request: Cross-device sync for Codex Projects and Chats (37 👍, highest raw upvote count shown). Two-Mac workflow continuity; an old request that keeps accruing support as multi-device (desktop + Android + VS Code) usage grows.
- **[#42683](https://github.com/openai/codex/issues/42683)** — *[CLOSED]* Alt+P shortcut crashes and exits the app on Win10 (15 comments). Closed, but included as a useful marker of Windows app instability getting triaged out.
- **[#37453](https://github.com/openai/codex/issues/37453)** — Windows Desktop: resuming historical subagent threads spawns duplicate MCP and `node_repl` process stacks (10 comments). Resource-leak class bug tied to MCP lifecycle/refresh handling and subagents.
- **[#44401](https://github.com/openai/codex/issues/44401)** — Build 26.903.8094.0: app-server queue blocks plugins and Remote Control; history omitted after restart (9 comments). A newer, fast-growing report covering plugins stuck on "Loading…", slash-command failures, and Remote Control device loss.
- **[#36755](https://github.com/openai/codex/issues/36755)** — Skill loader mislabels transient `EMFILE` as "invalid SKILL.md files", with no retry (2 comments, 2 👍). Low volume but high-quality: an error-classification and resilience bug that silently drops skills on startup.
- **[#44668](https://github.com/openai/codex/issues/44668)** — Astra reasoning level frequently resets from X-High to Medium (~5% of turns) (2 comments). Notable because #39662 just added `max`/`ultra` effort values — persistence of the selected effort is now the gap.

## 4. Key PR Progress

- **[#44676](https://github.com/openai/codex/pull/44676)** — Resolve permission profiles with explicit execution-host path context. Ensures permission paths follow the execution host's conventions/home dir and that glob-syntax directory names can't loosen deny patterns. Directly relevant to WSL-vs-Windows sandbox mismatches (#29639).
- **[#44675](https://github.com/openai/codex/pull/44675)** — Refresh global instructions at model-request boundaries. Fixes root threads retaining startup instructions, so edits to global `AGENTS.md` now take effect mid-session — a prerequisite for the `/learn`-style workflows proposed in #40575.
- **[#44671](https://github.com/openai/codex/pull/44671)** — Keep voice sessions alive through mute and audio backlog. Drops stale/excess audio buffers instead of terminating the session, and keeps outgoing audio flowing while muted.
- **[#44670](https://github.com/openai/codex/pull/44670)** — Restrict login setup redirects to known platform origins. Security fix: `platform_url` from the query string could previously be an arbitrary destination, leaking the ID token in the org-setup redirect.
- **[#44669](https://github.com/openai/codex/pull/44669)** — Resolve filesystem denials with explicit path context. Sister change to #44676 for deny paths; also ensures invalid denials aren't silently skipped.
- **[#44658](https://github.com/openai/codex/pull/44658)** — Keep Windows sandbox private desktops alive across helper exits. Caches private desktops in the calling process so short-lived sandbox wrappers no longer destroy reusable desktop state.
- **[#44656](https://github.com/openai/codex/pull/44656)** — Attribute turn metrics to the models actually used during the turn. Addresses mislabeled usage after model switches and multi-model turns (including compaction) — directly adjacent to the usage-accounting complaints in #41220.
- **[#44655](https://github.com/openai/codex/pull/44655)** — Honor thread-level plugin exclusions across runtime capabilities. Applies `disabled_plugin_ids` to plugin skills, recommendations, hooks, and MCP servers without mutating shared plugin state; changes activate at next task start.
- **[#44650](https://github.com/openai/codex/pull/44650)** — Enforce managed model provider selection and definitions. Adds `model_provider`/`model_providers` to managed requirements, with required selection overriding local and session config — an enterprise/IT-control primitive.
- **[#44639](https://github.com/openai/codex/pull/44639)** — Block non-loopback inbound traffic for the Windows offline sandbox. Completes the offline firewall story by adding the missing inbound rule alongside the existing outbound block.
- **[#44636](https://github.com/openai/codex/pull/44636)** — Recover OAuth metadata discovery from 503 responses via OIDC. Falls back to the issuer's OIDC metadata so expired MCP OAuth tokens can still refresh during MCP startup.
- **[#44629](https://github.com/openai/codex/pull/44629)** — Add manual callback input to MCP OAuth login. New `codex mcp login <name> --no-browser` flow accepts a pasted redirect URL for headless/remote environments.

## 5. Hot Discussions

### Ideas
- **[#9618](https://github.com/openai/codex/discussions/9618)** — *How is there not a `/rewind` or `/revert` feature?* (23 comments, **131 👍**). The single most-upvoted item in the entire dataset; the author calls it "almost unusable" without undo, comparing unfavorably to OpenCode and Claude Code.
- **[#12567](https://github.com/openai/codex/discussions/12567)** — *Memories in Codex* (36 comments). An OpenAI maintainer (jif-oai) soliciting input on memory citation UX and whether memories should be user-visible/controllable. Highest comment count in Discussions.
- **[#44547](https://github.com/openai/codex/discussions/44547)** — *Please remove desktop pets immediately* (1 👍). Explicit request to delete the mascot/pet feature outright, citing stress and disruption.
- **[#44421](https://github.com/openai/codex/discussions/44421)** — Persistent lightweight chat with the Codex mascot during long-running tasks. The opposite camp: wants a side channel to add context or check progress without interrupting the agent.
- **[#44419](https://github.com/openai/codex/discussions/44419)** — VS Code Codex history should paginate beyond 50 local sessions. Older sessions exist in the same state DB and are reachable from Desktop but not VS Code.

### Q&A
- **[#43257](https://github.com/openai/codex/discussions/43257)** — How does experimental context management count history lookups against usage limits? Long-running multi-day tasks plus context-window rollover make billing semantics opaque.
- **[#37960](https://github.com/openai/codex/discussions/37960)** — Coordinating local and remote coding agents across different vendors (Claude-family local, Codex/GPT-family on a Linux VM, human-started sessions). Multi-agent, multi-vendor orchestration is emerging as a real workflow.
- **[#42503](https://github.com/openai/codex/discussions/42503)** — Any news on when Astra reaches Codex? Points out Astra isn't in the public API catalog or Codex release notes despite OpenAI's Sept 1 "coming soon" framing.
- **[#40385](https://github.com/openai/codex/discussions/40385)** — Windows: "control other devices" Remote Connections option not found (6 👍). Remote Connections was a heavily anticipated feature; Windows parity is the gap.
- **[#41771](https://github.com/openai/codex/discussions/41771)** — Lost the approval email for the Codex for Open Source program after a job change; asking about resends.
- **[#41314](https://github.com/openai/codex/discussions/41314)** — Status question on the desktop pet (Chinese-language thread).

### Show and tell
- **[#44641](https://github.com/openai/codex/discussions/44641)** — **Codex Limits**: cross-platform CLI/TUI for usage, reset times, and reset credits.
- **[#41157](https://github.com/openai/codex/discussions/41157)** — **CodexFuse 1.2.0**: local Windows dashboard for rate limits (used/available, next reset, hourly use), no install, no API key, PT/EN.
- **[#44368](https://github.com/openai/codex/discussions/44368)** — **Usage HUD**: macOS menu-bar meter spanning Codex + Claude + Gemini + Grok + Ollama, with confidence labels on every number.
- **[#44643](https://github.com/openai/codex/discussions/44643)** — **CoCo**: local Codex coordinator binding named workspaces to Git worktrees and Codex conversations across terminals/repositories.
- **[#44618](https://github.com/openai/codex/discussions/44618)** — **Wayfinder**: open-source local-first macOS app turning Codex/Claude Code session history into a voyage map.
- **[#44453](https://github.com/openai/codex/discussions/44453)** — Why `OPENAI_BASE_URL` doesn't redirect a Codex with a `config.toml`, plus **OrcaReplay**, a record/replay harness that re-runs a session with no model calls.
- **[#44291](https://github.com/openai/codex/discussions/44291)** — **Brain Scanner**: hosted workspace connecting a project graph, recorded agent context, and change history.
- **[#44638](https://github.com/openai/codex/discussions/44638)** — **Artifact Relay**: self-hosted publishing of Codex-generated Markdown/HTML reports to a private browser viewer.
- **[#44453](https://github.com/openai/codex/discussions/44453)**, **[#40132](https://github.com/openai/codex/discussions/40132)** — general threads on real-world Codex projects and workflows.

## 6. Feature Request Trends

1. **Usage observability as a first-class capability.** The strongest emergent theme: a meta-tracker (#41220), a dedicated capacity-error cluster (#43375, #43368, #44113, #44395, #44516, #44531), and at least three community-built limit dashboards (#41157, #44641, #44368). Users want accurate, per-turn, per-model token accounting surfaced in-product.
2. **Undo / rewind / checkpointing.** #9618 remains the highest-upvoted discussion by a wide margin; there is no equivalent of Claude Code's or OpenCode's revert flow.
3. **Durable, self-improving memory.** #40575 (`/learn`, rule metabolism for `AGENTS.md`), #12567 (Memories), and PR #44675 (live AGENTS.md reload) converge on the same ask: instructions and learned rules should persist and update mid-session without restarting.
4. **Cross-device continuity.** #21803 (Projects/Chats sync, 37 👍), #44556 (Android Remote missing chats), and #40002 (Android Remote path case-sensitivity) describe the same broken promise: the desktop ↔ mobile ↔ VS Code state should be one project.
5. **UI calm and controllability.** #44561 (turn off Astra "whimsy" stars by default), #44547 (remove desktop pets), PR #44666 (honor system reduced-motion), plus #44668 (effort level resets) — users want visual chrome and per-session settings to stay put and to be off by default.
6. **IDE/history ergonomics.** #44419 (VS Code pagination past 50 sessions), #28833 (user-facing `PermissionRequest` approval signal), #40282 (per-tab vs all-tabs side panel).

## 7. Developer Pain Points

- **Quota and capacity are the dominant trust problem.** "Codex burned through my entire limit" (#44673), "usage astronomically higher than CLI" (#44459), and "Selected model is at capacity" across all models on Pro accounts (#44516, #44531) combine with #41220's tracker into a perception that accounting is neither predictable nor explainable — especially with app-vs-CLI divergence.
- **Windows Desktop is the least stable platform.** Send button hanging forever (#40968), the app-server queue blocking plugins and Remote Control (#44401), duplicate MCP/`node_repl` process stacks on resumed subagent threads (#37453), sandbox lock failures from `SetNamedSecurityInfoW` (#36475), Android Remote path case-sensitivity (#40002), and Browser Use Node REPL `sandboxCwd` failures under WSL (#29639).
- **Settings that silently revert.** Reasoning effort dropping from X-High to Medium mid-chat (#44668) and voice sessions launching as Codex despite selecting ChatGPT mode (#44634) erode confidence in the config layer.
- **MCP/plugin lifecycle edge cases.** Tool-list changes are never picked up mid-session (#37417), OAuth refresh blocks on 503 metadata responses (#44636), and missing env-var diagnostics get swallowed by secret redaction (#44654).
- **Startup and error-handling fragility.** CLI 0.154.0 hanging on launch after a Homebrew upgrade on macOS (#44471) and transient `EMFILE` being reported as "invalid SKILL.md" with no retry (#36755) — both are false-negative errors that cost users debugging time.
- **Support and account friction.** #41771 (lost open-source approval email) and #44030 (access errors on a personal Plus seat) show a non-trivial tail of issues that are process, not code.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-11

## 1. Today's Highlights

A new nightly (`v0.61.0-nightly.20260910.ged2ac40df`) shipped with no user-facing notes. The most active threads remain the P1 Enterprise Workspace authentication failure (#29101, 42 comments) and a cluster of sandbox/security-hardening PRs targeting filesystem isolation, path-traversal guards, and prompt-injection defenses. Agent reliability — hangs, misleading termination status, and subagent under-use — continues to dominate long-running issue discussions.

## 2. Releases

- **v0.61.0-nightly.20260910.ged2ac40df** — Automated nightly bump. No detailed changelog beyond the version commit; the release PR (#29268) is a routine version bump by `gemini-cli-robot`.
  - Diff: `v0.61.0-nightly.20260909...v0.61.0-nightly.20260910` (both referenced commits share the `ged2ac40df` suffix)

## 3. Hot Issues

1. **[#29101](https://github.com/google-gemini/gemini-cli/issues/29101) — Enterprise Workspace authentication failure (P1, 42 comments, 👍2)**  
   Auth regression blocking Enterprise/Workspace accounts configured with a Cloud Project ID. Highest-engagement issue in the window; still open with no fix landed.

2. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent recovery after MAX_TURNS reported as GOAL success (P1, 13 comments)**  
   `codebase_investigator` returns `status: "success"` / `Termination Reason: "GOAL"` after exhausting its turn budget without doing work. Misleading telemetry hides real failures — a correctness issue for anyone building on agent output.

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs (P1, 8 comments, 👍8)**  
   Any delegation to the generalist agent hangs indefinitely, including trivial tasks like folder creation. High community agreement (8 👍) and a clear workaround (forbid subagent delegation) make this a top reliability blocker.

4. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-dependency OS sandboxing & post-execution intent routing (P2, 9 comments)**  
   Large design proposal to let Gemini 3 lean on its native bash affinity (grep/cat/sed/awk) safely. Directly informs the current wave of sandbox PRs.

5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — Assess AST-aware file reads, search, and mapping (P2, 7 comments)**  
   Epic exploring whether AST-aware tooling reduces misaligned reads and token noise. A companion investigation (#22746) suggests tilth/glyph as starting points.

6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini does not use skills and sub-agents enough (P2, 6 comments)**  
   Anecdotal but widely felt: custom skills (`gradle`, `git`) are only invoked when explicitly instructed. Points to a discovery/prompting gap in the agent loop.

7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Deterministic redaction and reduced Auto Memory logging (P2, 5 comments)**  
   Secrets reach model context before redaction instructions apply, and skill logs may retain sensitive data. A privacy/security concern in the memory subsystem.

8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell command stuck on "Waiting input" after completion (P1, 4 comments, 👍3)**  
   Simple shell commands finish but the TUI still shows them active and awaiting input. Frequent, reproducible, and disruptive to flow.

9. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) — Auto Memory retries low-signal sessions indefinitely (P2, 4 comments)**  
   Sessions skipped by the extractor are never marked processed, so they resurface forever — wasted background work and noise.

10. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails on Wayland (P1, 4 comments)**  
    Linux/Wayland users hit browser subagent failures reported as `Termination Reason: GOAL`. Another instance of the "success despite failure" pattern seen in #22323.

*Also worth watching:* #22267 (browser agent ignores `settings.json` overrides), #22232 (session takeover/lock recovery for browser agent), #24246 (400 error with >400 tools).

## 4. Key PR Progress

1. **[#29283](https://github.com/google-gemini/gemini-cli/pull/29283) — fix(sandbox): improve filesystem isolation and isolate runtime state**  
   Tightens mount boundaries and isolates runtime state across Docker, Podman, runsc, LXC, and macOS Seatbelt; read-only config access with ephemeral runtime writes.

2. **[#29282](https://github.com/google-gemini/gemini-cli/pull/29282) — fix(auth): persist OAuth credentials after login**  
   Persists credentials immediately after browser/user-code login so users aren't re-prompted for Google sign-in. Directly relevant to the auth pain around #29101.

3. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214) — fix(sandbox): harden filesystem boundaries and isolate runtime state**  
   Replaces host directory mounts with sanitized config files and standardizes realpath resolution during path-sensitivity checks (with non-existent-path fallbacks).

4. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250) — fix(core): prevent indirect prompt injection via build files and untrusted flags**  
   Refactors `shell`, `edit`, and `write_file` execution paths to validate workspace boundaries and external command parameters under restricted workspace mode.

5. **[#29249](https://github.com/google-gemini/gemini-cli/pull/29249) — fix(core): close sibling-prefix bypass in `get_internal_docs` path guard**  
   Replaces string-prefix comparison with component-boundary-aware checks, closing a path traversal that let sibling directories be read into model context.

6. **[#29200](https://github.com/google-gemini/gemini-cli/pull/29200) — fix(core): enforce MCP policy consistently at runtime**  
   Aligns runtime MCP checks with CLI matching semantics; treats an explicitly empty `mcp.allowed` list as fail-closed. Important for enterprise policy enforcement.

7. **[#29116](https://github.com/google-gemini/gemini-cli/pull/29116) — fix(core): mitigate NTFS 8.3 short name (SFN) path traversal** *(closed)*  
   Handles Windows short names (`git~1`, `env~1`, etc.) in both path normalization and `AllowedPathChecker`, defeating SFN-based blocklist bypasses.

8. **[#29134](https://github.com/google-gemini/gemini-cli/pull/29134) — fix(cli): protect current session from deletion**  
   Passes the active session ID through `--list-sessions` / `--delete-session` and matches only on the short-ID suffix, plus regression coverage.

9. **[#29278](https://github.com/google-gemini/gemini-cli/pull/29278) / [#29277](https://github.com/google-gemini/gemini-cli/pull/29277) — fix env-var expansion collision**  
   Two parallel fixes for `expandEnvVars()` using a `__GCLI_EXPAND_TARGET__` sentinel key that could be shadowed by caller environment — now picks a collision-free temp key.

10. **[#29094](https://github.com/google-gemini/gemini-cli/pull/29094) — fix: upgrade simple-git to 3.32.3 (CVE-2026-28292)** *(closed)*  
    Addresses a CRITICAL-severity vulnerability flagged by Trivy in a core dependency. Quick merge is a good sign for dependency hygiene.

*Also notable:* #29098 (pure React state updaters in `useInputHistoryStore`), #29097 (`.git` suffix parsing in GitHub URL extension resolver), #29268 (nightly version bump).

## 5. Hot Discussions

No Discussions data was provided in this dataset, so this section is omitted.

## 6. Feature Request Trends

- **Agent observability and honesty:** Several issues converge on the same theme — termination reasons must reflect reality (#22323, #21983), subagent trajectories should be shareable (#22598), and `/bug` reports should include subagent context (#21763).
- **AST-aware codebase tooling:** #22745 and #22746 push toward precise method-bound reads, better `codebase_investigator` behavior, and lower token bloat; #19561 proposes "Tactful Extraction" with grep-first surgical discovery.
- **Agent autonomy and self-awareness:** Requests that Gemini proactively use skills/subagents (#21968), accurately describe its own flags and hotkeys (#21432), and avoid destructive git/DB operations (#22672).
- **Sandboxing and OS-level safety:** #19873 proposes zero-dependency OS sandboxing to safely exploit the model's bash affinity; the current PR wave (#29283, #29214) implements the isolation layer.
- **Memory/context frugality:** Auto Memory quality (#26516, #26523, #26522) and token-frugal context management (#19561) are recurring asks.
- **Enterprise and policy controls:** Case-insensitive MCP allowlists with fail-closed semantics (#29200) and reliable Workspace auth (#29101) reflect growing enterprise deployment.

## 7. Developer Pain Points

- **Hangs and stuck states:** Generalist agent hangs forever (#21409), shell sessions show "Awaiting user input" after completion (#25166), browser subagent fails on Wayland (#21983), and Vite scaffolding blocks on interactive prompts (#22465).
- **Misleading success signals:** Subagents report `GOAL`/`success` after hitting MAX_TURNS, making automated pipelines unreliable (#22323, #21983).
- **Enterprise authentication friction:** Workspace + Cloud Project ID sign-in broke entirely (#29101); OAuth credentials weren't persisted post-login (#29282).
- **Configuration not honored:** Browser agent ignores `settings.json` overrides such as `maxTurns` (#22267); symlinked agent files in `~/.gemini/agents/` are silently ignored (#20079).
- **Tool scaling limits:** 400 errors when more than 400 tools are available (#24246) — a real ceiling for MCP-heavy setups.
- **Workspace hygiene:** Model scatters ad-hoc temp scripts across directories when restricted to shell execution (#23571).
- **Terminal UX:** Flicker and performance problems on resize (#21924); `/compress` summaries don't persist across session resume (#21335).
- **Security surface:** Prompt injection via build files and flags (#29250), path-guard bypasses (#29249, #29116), and unredacted secrets in Auto Memory (#26525) all landed in one 24-hour window — a clear signal that sandbox/auth hardening is the community's top engineering priority right now.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI — Community Digest
**Date: 2026-09-11** · Source: [github/copilot-cli](https://github.com/github/copilot-cli)
*Window: last 24h — 1 release, 36 issues updated, 2 PRs updated*

---

## 1. Today's Highlights

A new prerelease, **v1.0.84-4**, reshapes the plugin/extension CLI surface: `copilot instruction list` and `copilot lsp list` replace the older `plugins list --kind` flags, `--json` output lands on plugin/marketplace commands, and plugins gain `enable`/`disable`. Meanwhile, the issue tracker is dominated by a **memory-exhaustion cluster** — four separate reports of V8 heap OOM, compaction crash loops, and session data that becomes permanently unresumable. The long-standing **vi/vim input mode request (#13, 76 👍) was closed**, the clearest signal yet that keyboard/UX parity work is landing.

---

## 2. Releases

### v1.0.84-4 ([release](https://github.com/github/copilot-cli/releases))
**Added**
- `copilot instruction list` and `copilot lsp list` — replacing `copilot plugins list --kind instruction` and `--kind lsp` (breaking CLI surface change for scripts).
- `--json` flag on `copilot plugin list`, `copilot plugin marketplace list`, and `copilot plugin marketplace browse` — makes plugin tooling scriptable/CI-friendly.
- `enable` and `disable` subcommands on `copilot plugin`.

**Takeaway:** the plugin subsystem is being promoted from a namespaced flag to first-class commands with machine-readable output — useful for automation, but anyone parsing `--kind` output needs to migrate.

---

## 3. Hot Issues

1. **[#13 [CLOSED] CLI input should have a vi/vim input mode](https://github.com/github/copilot-cli/issues/13)** — 12 comments · **76 👍** · opened 2025-09-25
   The single most-upvoted item in this window has finally closed. Modal editing for the interactive prompt was the top keyboard-driven request; closure after ~1 year suggests vim keybindings shipped or were superseded. Watch for users confirming behavior in the wild.

2. **[#4095 [OPEN] Windows: plugin update fails with "Access is denied (os error 5)" while VS Code is running](https://github.com/github/copilot-cli/issues/4095)** — 3 comments · **21 👍** · area:platform-windows, area:plugins
   Highest-reacted open bug: the VS Code Copilot extension holds watcher handles on `installed-plugins`, so `copilot plugin update` and the desktop app both fail. Blocks the entire plugin update path on Windows.

3. **[#4742 [OPEN] Desktop app 1.1.15: cannot create a second Local (branch) session while one is running](https://github.com/github/copilot-cli/issues/4742)** — 11 comments · 5 👍 · triage
   `"This project already has an active Local workspace"` blocks parallel branch sessions after the 1.1.15 auto-update. Directly breaks multi-agent/parallel workflows; the comment volume shows a large blast radius.

4. **[#1285 [OPEN] Organisation-level Agent not showing up](https://github.com/github/copilot-cli/issues/1285)** — 9 comments · 11 👍 · area:agents, area:enterprise
   Agents placed in `{org}/.github-private` never surface in the CLI or VS Code. Persistent since February — an enterprise adoption blocker for centrally managed agent catalogs.

5. **[#4686 [OPEN] Node.js OOM crash after ~37 min — 31,965 leaked async libuv handles (SEA ignores NODE_OPTIONS)](https://github.com/github/copilot-cli/issues/4686)** — 3 comments · area:sessions
   The most technically precise OOM report: a handle leak in the single-executable Node runtime, with no escape hatch because `NODE_OPTIONS` is ignored. Excellent root-cause evidence for maintainers.

6. **[#4780 [OPEN] Session compaction OOMs and never completes, leaving the session permanently unresumable](https://github.com/github/copilot-cli/issues/4780)** — 1 comment · 3 👍 · triage
   Compaction enters a crash loop at the ~4.3 GB cap; every `--resume` re-triggers it. High severity — it converts a transient memory issue into permanent data/work loss.

7. **[#4795 [OPEN] Atlassian MCP OAuth fails: callback URL mismatch (random port vs registered 33418)](https://github.com/github/copilot-cli/issues/4795)** — 2 comments · 2 👍 · triage
   Reproduced on 1.0.83 and 1.0.84-3 in WSL Ubuntu: the CLI uses an ephemeral redirect port instead of the registered one, so OAuth can never complete. A hard blocker for a major enterprise MCP server.

8. **[#4807 [OPEN] Idle Copilot CLI enters `FileWatch` event storm, consumes two CPU cores, and writes a 33+ GB log](https://github.com/github/copilot-cli/issues/4807)** — 0 comments · triage · filed 2026-09-10
   Fresh and alarming: ~221% CPU for 35+ hours and tens of gigabytes of rejected file-watch events appended to the debug log. Disk/CPU exhaustion risk for long-running or daemon-style deployments.

9. **[#3260 [OPEN] Copy/Paste broken in Copilot CLI via SSH inside tmux → Windows Server 2025](https://github.com/github/copilot-cli/issues/3260)** — 7 comments · 1 👍 · area:input-keyboard, area:platform-windows
   Regressed in v1.0.47 and still open. A well-tabulated reproduction matrix across scenarios shows this is a systemic terminal-integration issue, not a one-off.

10. **[#2199 [OPEN] Add Ctrl+Backspace key combo to delete whole word](https://github.com/github/copilot-cli/issues/2199)** — 4 comments · 7 👍 · area:input-keyboard
    Small but symbolically important: the community keeps asking for standard editor muscle memory. With #13 closed, this is the natural next keyboard-parity candidate.

*Also notable:* [#4809](https://github.com/github/copilot-cli/issues/4809) (non-standard `server/discover` before `initialize` violates MCP lifecycle and crashes compliant servers), [#4725](https://github.com/github/copilot-cli/issues/4725) (frequent heap OOM on Linux), [#4699](https://github.com/github/copilot-cli/issues/4699) (OOM on long `--resume`; crash dumps written into the user's cwd), [#4805](https://github.com/github/copilot-cli/issues/4805) (stale `inuse.<pid>.lock` makes sessions unrevivable).

---

## 4. Key PR Progress

Only **2 pull requests** were updated in the last 24h — a very quiet day on the PR side.

1. **[#4808 [OPEN] Pin GitHub Actions to commit SHAs](https://github.com/github/copilot-cli/pull/4808)** — author: github-security-bot
   Supply-chain hardening: 4 files changed, 3 `uses:` refs found and all 3 pinned to immutable SHAs, 0 warnings/errors. Standard defensive hygiene against mutable-tag compromise of CI workflows.

2. **[#4786 [CLOSED] Revise notice regarding third-party services](https://github.com/github/copilot-cli/pull/4786)** — author: nkasuku
   Documentation-only: clarifies access requirements and terms for third-party services in the notice. Closed within the window.

---

## 5. Hot Discussions

*Omitted — no Discussions data was provided for this window.*

---

## 6. Feature Request Trends

Distilled from all Issues updated in the last 24h:

- **Terminal/editor-grade input parity** — vi/vim modal mode ([#13](https://github.com/github/copilot-cli/issues/13), closed), Ctrl+Backspace word deletion ([#2199](https://github.com/github/copilot-cli/issues/2199)), reliable copy/paste over SSH/tmux ([#3260](https://github.com/github/copilot-cli/issues/3260)) and in WSL2 ARM64 ([#3534](https://github.com/github/copilot-cli/issues/3534)). The community treats the CLI as a professional editor and expects matching keybindings.
- **Scriptable plugin/extension management** — `--json` everywhere, first-class `instruction`/`lsp`/`enable`/`disable` commands (v1.0.84-4), plus update robustness: reuse downloaded packages instead of re-downloading after a failed install ([#4799](https://github.com/github/copilot-cli/issues/4799)) and fixing Windows update lockouts ([#4095](https://github.com/github/copilot-cli/issues/4095)).
- **Enterprise/org-level configuration** — org agents not surfacing from `.github-private` ([#1285](https://github.com/github/copilot-cli/issues/1285)), the documented-but-inert custom agent `target` property ([#4806](https://github.com/github/copilot-cli/issues/4806)), and EMU/Entra audience mismatch breaking MCP sign-in in the desktop app ([#4796](https://github.com/github/copilot-cli/issues/4796)).
- **MCP interoperability correctness** — spec compliance (`initialize` before `server/discover`, [#4809](https://github.com/github/copilot-cli/issues/4809)), OAuth redirect-port registration ([#4795](https://github.com/github/copilot-cli/issues/4795)), and not permanently stripping tools after a cancelled call ([#4731](https://github.com/github/copilot-cli/issues/4731)).
- **Configuration that actually persists** — the top-level `model` key in `settings.json` is ignored at startup ([#4067](https://github.com/github/copilot-cli/issues/4067)) and is silently overwritten with launch-time values on exit ([#4252](https://github.com/github/copilot-cli/issues/4252)).
- **Multi-account switching** ([#367](https://github.com/github/copilot-cli/issues/367), closed) — managing personal/work/contractor identities without manual re-auth remains a recurring ask.

---

## 7. Developer Pain Points

- **Memory exhaustion is the #1 stability theme.** Four independent OOM reports in one window: leaked libuv handles ([#4686](https://github.com/github/copilot-cli/issues/4686)), generic Linux `heap out of memory` ([#4725](https://github.com/github/copilot-cli/issues/4725)), OOM during long `--resume` with dumps polluting the user's working directory ([#4699](https://github.com/github/copilot-cli/issues/4699)), and compaction OOM that permanently bricks a session ([#4780](https://github.com/github/copilot-cli/issues/4780)). Notably, `NODE_OPTIONS` is ignored in the SEA build, so users cannot even raise the heap cap.
- **Session lifecycle fragility.** Sessions can wedge permanently when a queued message lands at turn end ([#4755](https://github.com/github/copilot-cli/issues/4755)), become unrevivable due to a stale `inuse.<pid>.lock` ([#4805](https://github.com/github/copilot-cli/issues/4805)), or silently lose assisted-permissions mode after ~1 hour ([#4764](https://github.com/github/copilot-cli/issues/4764)). Recovery frequently requires killing the process or starting over — users lose context, not just time.
- **MCP integration is the sharpest interop edge.** OAuth flows that can't complete ([#4795](https://github.com/github/copilot-cli/issues/4795)), non-spec lifecycle calls that crash compliant servers ([#4809](https://github.com/github/copilot-cli/issues/4809)), and timeouts that permanently remove a server's tools for the life of the process ([#4731](https://github.com/github/copilot-cli/issues/4731)).
- **Windows remains a second-class platform.** Plugin updates blocked by VS Code watcher handles ([#4095](https://github.com/github/copilot-cli/issues/4095)), clipboard failures over SSH/tmux ([#3260](https://github.com/github/copilot-cli/issues/3260)) and in WSL2 ARM64 ([#3534](https://github.com/github/copilot-cli/issues/3534)).
- **Desktop app and CLI behave differently.** The desktop app's bundled 1.0.83 runtime and its own auth/session layer diverge from the standalone CLI — same-machine differences in MCP Entra sign-in ([#4796](https://github.com/github/copilot-cli/issues/4796)) and Local workspace limits ([#4742](https://github.com/github/copilot-cli/issues/4742)) make debugging harder.
- **Credential and quota surprises.** Local sandboxing silently injects an unrelated cached fine-grained PAT instead of the active `gh` OAuth session, with no visibility into which credential was chosen ([#4804](https://github.com/github/copilot-cli/issues/4804)); another user reports PRU quota wiped out after enabling Assisted Permissions ([#4802](https://github.com/github/copilot-cli/issues/4802)).
- **Runaway background resource use.** An idle process entering a `FileWatch` storm at ~221% CPU and a 33 GB log ([#4807](https://github.com/github/copilot-cli/issues/4807)) is a serious concern for anyone running Copilot CLI as a long-lived agent.

---

*Generated from GitHub activity for 2026-09-11. Comment/reaction counts reflect the snapshot at generation time; issues filed same-day (#4802–#4810) have had little time to accumulate community signal.*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-11

Source: `github.com/anomalyco/opencode`  
No new releases were published in the last 24h. The highest-engagement activity is around SQLite/event-table bloat, billing/payment friction, and V2 TUI/provider-compatibility work.

## Today's Highlights
- The most critical open reliability thread remains **unbounded `opencode.db` growth** from event snapshots, with long-running instances hitting 13GB+ and disk exhaustion.
- Payment and subscription issues continue to generate strong community reaction, especially around declined cards, crypto payments, and free-tier usage limits.
- On the PR side, the main workstreams are **V2 TUI recursive grouping**, **provider/cache compatibility fixes**, and **managed provider policies**.

## Hot Issues

1. **[#33356](https://github.com/anomalyco/opencode/issues/33356) — [2.0] Unbounded growth of the `event` table**  
   Open, 30 comments, 9 👍. `opencode.db` reaches 13GB+ because `message.updated.1` snapshots are never pruned or compacted. This is one of the most serious long-running-instance reliability issues; related community tooling is proposed in [#41175](https://github.com/anomalyco/opencode/issues/41175).

2. **[#15585](https://github.com/anomalyco/opencode/issues/15585) — Free model “free usage exceed”**  
   Closed, 55 comments, 17 👍. Users on all three free models hit the same quota error, creating confusion over whether free models have undocumented limits. High comment volume shows the community wants clearer quota messaging and enforcement.

3. **[#23153](https://github.com/anomalyco/opencode/issues/23153) — Pay Go with crypto**  
   Open, 21 comments, 50 👍. A strongly upvoted request for crypto payment support for OpenCode Go. It reflects broader payment-access frustration, especially in regions where card payments fail.

4. **[#36942](https://github.com/anomalyco/opencode/issues/36942) — Vertical tabs**  
   Open, 15 comments, 31 👍. The new UI forces horizontal tabs, making more than a few session titles hard to scan. This is a clear TUI/UX productivity request with strong support.

5. **[#13003](https://github.com/anomalyco/opencode/issues/13003) — Display token usage information in the TUI**  
   Open, 13 comments, 53 👍. Token usage is tracked internally but not surfaced clearly. This is the highest-upvoted issue in the sample and reflects demand for cost/context observability.

6. **[#45278](https://github.com/anomalyco/opencode/issues/45278) — Payment declined after 3 months despite no card/bank issue**  
   Open, 13 comments, 2 👍. A recurring billing reliability problem: previously working cards suddenly fail on renewal. This directly affects subscription trust and retention.

7. **[#41358](https://github.com/anomalyco/opencode/issues/41358) — Auto-compaction continues without confirmation and loses task goal**  
   Open, 8 comments. On Windows Desktop, long sessions auto-compact and the agent keeps acting without confirmation, then forgets the original task. This is a high-risk agent-continuity bug.

8. **[#36826](https://github.com/anomalyco/opencode/issues/36826) — DeepSeek V4 Flash “Unexpected server error”**  
   Open, 8 comments, 1 👍. Prompt sending fails with a server error for DeepSeek V4 Flash in VS Code. Provider-specific failures like this remain a recurring pain point.

9. **[#44788](https://github.com/anomalyco/opencode/issues/44788) — [2.0] `event.subscribe` delivers no events; context hooks never reach prompt**  
   Open, 4 comments, 1 👍. V2 plugin API cannot deliver events or inject context by documented mechanisms. This blocks plugin authors from adopting V2 and is likely a key ecosystem blocker.

10. **[#48246](https://github.com/anomalyco/opencode/issues/48246) — Explicit cache breakpoints only applied to Anthropic-family models**  
    Open, 3 comments. Non-Anthropic providers rely entirely on implicit prefix caching, with no advancing anchor. Important for cost and latency on long agent sessions.

## Key PR Progress

1. **[#48324](https://github.com/anomalyco/opencode/pull/48324) — feat(skill): two-tier progressive skill disclosure**  
   Open. Adds progressive skill disclosure and improves custom gateway compatibility, including OpenAI Responses `gpt-5.*` `textVerbosity` handling.

2. **[#48117](https://github.com/anomalyco/opencode/pull/48117) — fix(provider): resolve OpenRouter route-modifier suffixes**  
   Open. Handles OpenRouter request-time suffixes like `:floor`, `:nitro`, `:exacto`, and `:online` in model IDs.

3. **[#48403](https://github.com/anomalyco/opencode/pull/48403) — feat(core): enforce managed provider policies**  
   Open. Applies Console organization rules after authored policies at catalog read time; paired with OpenCode Console work. Important for team/enterprise governance.

4. **[#48376](https://github.com/anomalyco/opencode/pull/48376) — fix(ai): normalize flat Responses stream errors**  
   Closed. Normalizes flat `code`, `message`, and `param` fields into the shared nested error shape for SSE and WebSocket responses. Improves gateway compatibility.

5. **[#48397](https://github.com/anomalyco/opencode/pull/48397) — fix(core): break filesystem cycle in compiled prompts**  
   Open. Addresses native/minified Bun builds failing on first prompt due to a filesystem/search cycle during prompt preparation.

6. **[#48399](https://github.com/anomalyco/opencode/pull/48399) — refactor(tui): project production subgroups through tree engine**  
   Open. Routes reasoning/exploration grouping through the generic tree engine for history hydration and live appends.

7. **[#48394](https://github.com/anomalyco/opencode/pull/48394) — feat(tui): add recursive grouping tree**  
   Open. Adds the pure grouping engine with configurable nesting paths before production integration.

8. **[#48395](https://github.com/anomalyco/opencode/pull/48395) — feat(tui): add recursive session grouping tree**  
   Open. Adds a generic recursive grouping tree driven by per-entry grouping paths, with leaf-count caching for transcript budgets.

9. **[#23755](https://github.com/anomalyco/opencode/pull/23755) — fix: preserve thinking/redacted_thinking blocks in Anthropic transforms**  
   Closed. Fixes Anthropic API errors where thinking blocks in the latest assistant message were dropped.

10. **[#41594](https://github.com/anomalyco/opencode/pull/41594) — fix(compaction): respect agent variant config during compaction**  
    Closed. Makes `agent.compaction.variant` effective instead of hardcoding inheritance from the parent user message.

## Feature Request Trends
- **TUI/UX improvements:** vertical tabs, token usage display, Markdown rendering, remote permission approvals, and recursive grouping are consistently requested.
- **Payment and account lifecycle:** crypto payments, card-decline fixes, Go subscription completion, and GDPR-compliant account deletion are recurring themes.
- **Storage/retention controls:** event-table compaction, snapshot deltas, DB size limits, and safer auto-compaction dominate reliability discussions.
- **Provider compatibility:** OpenRouter route modifiers, explicit cache breakpoints beyond Anthropic, DeepSeek `reasoning_content`, Anthropic thinking blocks, and OpenAI Responses error normalization.
- **V2 plugin/platform API:** event delivery, context hooks, managed provider policies, and filesystem snapshot redesign are key ecosystem asks.
- **IDE/platform expansion:** Visual Studio 2026 support and GitLab API reliability remain on the radar.

## Developer Pain Points
- **Disk exhaustion:** unbounded `event` table growth, 13GB+ SQLite files, and TUI `ENOSPC` crashes are causing real operational failures.
- **Billing friction:** declined cards, failed Go subscriptions, no crypto option, and no self-service account deletion create trust and support burdens.
- **Free-tier opacity:** users do not understand free-model usage limits until they hit “free usage exceed.”
- **Compaction behavior:** auto-compaction can continue without confirmation, lose the original task goal, and pollute JSONL output.
- **V2 plugin API breakage:** `event.subscribe` and context hooks reportedly deliver nothing, blocking plugin migration.
- **Provider-specific errors:** DeepSeek V4 Flash, Anthropic thinking blocks, OpenRouter suffixes, and non-Anthropic caching require targeted fixes.
- **TUI polish gaps:** horizontal-only tabs, raw Markdown rendering, and missing token usage make long sessions harder to manage.
- **Native/compiled build regressions:** Bun-native builds can fail on first prompt, and filesystem-cycle issues need attention.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-11

## Today's Highlights

No new releases landed in the last 24 hours, but issue and PR throughput stayed high (50 issues, 21 PRs updated). The dominant theme is **correctness of provider/transport accounting** — Bedrock cache-write billing, `usage.input` normalization, and OpenAI reasoning-effort passthrough all drew maintainer attention. On the TUI side, cursor-marker leakage and fullscreen rendering regressions continue to generate both bug reports and competing fixes.

## Releases

No new releases in the last 24h.

## Hot Issues

1. **[#9323 [CLOSED] Improve fireworks-specific config](https://github.com/earendil-works/pi/issues/9323)** — The most-commented item of the day (14 comments). A bug report against provider-specific config handling for Fireworks; the volume of discussion suggests provider config layering is a recurring friction point.

2. **[#8061 [OPEN] [inprogress] Context budget ignores maxTokens output reservation](https://github.com/earendil-works/pi/issues/8061)** — Requests rejected at ~78% of a 1M-token window, and the compact-and-retry recovery fails for the same reason. This is a high-severity context-management bug because the automatic safety net doesn't actually recover.

3. **[#9052 [OPEN] Fullscreen wheel scrolling is 3x slower than regular mode](https://github.com/earendil-works/pi/issues/9052)** — 4 👍 and 8 comments. Users want the fixed-input-box fullscreen mode, but the scroll regression makes it unusable for long sessions; a classic adoption blocker for a marquee TUI feature.

4. **[#8133 [CLOSED] Per-model compaction settings](https://github.com/earendil-works/pi/issues/8133)** — 5 👍. Request for a `compaction.profiles` map keyed by model id with global fallback. Closed, but it crystallizes the demand for model-aware context budgeting rather than one global setting.

5. **[#8810 [OPEN] [bug] Extension-registered providers ignore defaultProvider/defaultModel on fresh sessions](https://github.com/earendil-works/pi/issues/8810)** — Intermittent session startup on the wrong provider when defaults are registered via `pi.registerProvider()`. Nondeterministic extensibility bugs erode trust in the extension API.

6. **[#9294 [OPEN] [inprogress] claude-fable-5 allowedFallbackModels still lists claude-opus-4-8 (400)](https://github.com/earendil-works/pi/issues/9294)** — Built-in fallback metadata drifts behind upstream API changes, causing immediate hard failures on every request.

7. **[#9276 [OPEN] [bug, inprogress] grep tool with context lines can cause OOM](https://github.com/earendil-works/pi/issues/9276)** — Heap exhaustion traced to reading each match's surrounding context; critical for `pi-coding-agent` used as a headless SDK in long-running processes.

8. **[#9265 [OPEN] O(n²) tool-call argument re-parsing in openai-completions streaming](https://github.com/earendil-works/pi/issues/9265)** — Re-parsing the full accumulated argument JSON on every delta freezes the event loop in embedded/multi-session daemons. Notable because a fix PR (#9461) was opened the same day.

9. **[#9331 [OPEN] [bug] Bedrock: OpenAI reasoning effort is never sent to the model](https://github.com/earendil-works/pi/issues/9331)** — Thinking-level changes are silently no-ops for OpenAI models on Bedrock, discovered during benchmarking. Silent configuration no-ops are the worst class of provider bug.

10. **[#8752 [OPEN] bedrock-converse: usage.input not normalized across model families](https://github.com/earendil-works/pi/issues/8752)** — 5 👍. Anthropic reports `input` net of cache while OpenAI-family reports gross, producing false cache-miss notices and doubled input cost estimates. Paired with [#9457](https://github.com/earendil-works/pi/issues/9457) (1h cache writes billed at the 5m rate), Bedrock cost reporting has a clear cluster of defects.

*Also worth watching:* [#9361](https://github.com/earendil-works/pi/issues/9361) (Windows `shellPath` nondeterministically ignored; falls through to WSL `bash.exe`) and [#9460](https://github.com/earendil-works/pi/issues/9460) (bash tool has no default timeout — a SIGTERM-ignoring child deadlocks the session).

## Key PR Progress

1. **[#9461 [OPEN] fix(ai): defer streamed tool argument parsing until read](https://github.com/earendil-works/pi/pull/9461)** — Direct fix for #9265; caches the parse per version and only re-parses on access. Author flags it as non-idiomatic and is soliciting review — worth a look.

2. **[#9441 [OPEN] fix(tui): prevent cursor marker leaks](https://github.com/earendil-works/pi/pull/9441)** — Treats APC cursor markers as positional metadata rather than persistent styling, fixing both fullscreen drag-selection corruption (#9332) and duplicate-marker emission (#9257).

3. **[#9442 [OPEN] fix(ai): allow prompt cache keys for compatible proxies](https://github.com/earendil-works/pi/pull/9442)** — Adds `compat.supportsPromptCacheKey` so OpenAI-compatible proxies can opt into receiving pi's session key under short retention.

4. **[#9459 [OPEN] fix(coding-agent): prefer recorded model changes on resume](https://github.com/earendil-works/pi/pull/9459)** — Resumes sessions with the last recorded `model_change` instead of inferring from the last assistant message, fixing silent model drift on resume.

5. **[#9434 [OPEN] feat(coding-agent): allow extensions to append to the session system prompt](https://github.com/earendil-works/pi/pull/9434)** — `session_start` handlers can now return append-only `systemPromptAppend` contributions with source metadata and error isolation. A meaningful capability increase for the extension ecosystem.

6. **[#9431 [CLOSED] feat(agent): default 3 minute timeout for every tool call](https://github.com/earendil-works/pi/pull/9431)** — Bounds every tool, not just `bash`/`powershell`, addressing the hung-tool deadlock class reported in #9460.

7. **[#9297 [CLOSED] fix(ai): remove invalid Fable 5 fallback target](https://github.com/earendil-works/pi/pull/9297)** — Keeps Opus 5 as the sole built-in fallback for Claude Fable 5; author also opened a models.dev inquiry about modeling fallbacks upstream instead of hardcoding.

8. **[#9443 [CLOSED] fix(ai): capture and replay Gemini thoughtSignature on openai-completions tool calls](https://github.com/earendil-works/pi/pull/9443)** — Gemini behind an OpenAI-compatible gateway was losing `thoughtSignature` on every response; the replay path is now wired up.

9. **[#8744 [OPEN] feat(tui): add opt-in overlay selection exclusion](https://github.com/earendil-works/pi/pull/8744)** — Lets fullscreen copy operations keep sourcing from the transcript `ScrollView` when overlays are visible. Related to [#9438](https://github.com/earendil-works/pi/pull/9438), which makes overlays actually cover terminal images.

10. **[#8612 [OPEN] fix(coding-agent): clear delivered image-only queue entries](https://github.com/earendil-works/pi/pull/8612)** — Fixes pending-count desync for image-only steering/follow-up messages, with a regression test.

*Quick hits:* [#9425](https://github.com/earendil-works/pi/pull/9425) adds DeepSeek V4.1 Flash; [#9416](https://github.com/earendil-works/pi/pull/9416) accepts dots/underscores in skill names for cross-harness compatibility; [#9435](https://github.com/earendil-works/pi/pull/9435) extends value resolution to provider `baseUrl`; [#9407](https://github.com/earendil-works/pi/pull/9407) adds a multi-select model-preference guard example.

## Hot Discussions

**Q&A**
- **[#3373 Which plugins, add-ons, or extensions do you most enjoy using with the Pi agent?](https://github.com/earendil-works/pi/discussions/3373)** — 16 comments, 8 👍, still the most active community thread. A useful pulse on which extension surfaces actually get used.

**Ideas**
- **[#8420 From the DSH plugin ecosystem to pi: are we missing an official Web UI base?](https://github.com/earendil-works/pi/discussions/8420)** — Argues that DSH's plugin community skews heavily toward UI plugins (chat, workspace panels, terminal embedding, status bars) while pi's ecosystem skews toward non-UI extensions, and asks whether an official Web UI foundation is missing.

**Show and tell**
- **[#9446 Phosphor – a desktop surface for pi](https://github.com/earendil-works/pi/discussions/9446)** — Desktop app built as one `pi --mode rpc` per session, with chat, diffs, files, terminal, and artifacts side by side; supports all pi providers plus Claude Pro/Max and ChatGPT subscriptions.
- **[#9427 Pi Manager — a local UI for providers, models, and writing ~/.pi/agent](https://github.com/earendil-works/pi/discussions/9427)** — A non-forking local control plane for adding OpenAI-compatible relays, signing in to native providers, editing catalog/cycle lists/thinking maps, and backing up agent config.

## Feature Request Trends

- **Model-aware context and compaction control** — `compaction.profiles` (#8133) and maxTokens-aware budgets (#8061) point to one direction: global context settings are too blunt when users mix 1M-token and small-window models.
- **External GUIs around a stable core** — Discussions #8420, #9446, and #9427 all orbit the same idea: keep pi's minimal core and RPC mode, and let the community build web/desktop surfaces. Expect continued pressure for a supported Web UI base or at least stronger RPC guarantees.
- **Extension-visible session control** — System-prompt append hooks (#9434), overlay selection behavior (#8744), and provider/model default resolution (#8810) all expand what extensions can influence deterministically.
- **Safer tool execution defaults** — Default tool timeouts (#9431) and grep memory bounds (#9276) reflect demand for guardrails that hold in headless/SDK deployments.
- **Session tree and workflow ergonomics** — Branch deletion (#5366), model-change-respecting resume (#9459), and model-preference guards (#9407) show users operating many long-lived sessions and wanting finer lifecycle control.

## Developer Pain Points

1. **Cost and cache accounting is unreliable on Bedrock.** [#8752](https://github.com/earendil-works/pi/issues/8752) (un-normalized `usage.input`), [#9457](https://github.com/earendil-works/pi/issues/9457) (1h cache writes billed at 5m rate), and [#9210](https://github.com/earendil-works/pi/issues/9210) (cacheWrite1h never set via gateway) form a cluster. False cache-miss warnings and doubled estimates destroy trust in usage reporting.
2. **Built-in catalogs and fallback metadata drift behind providers.** [#9294](https://github.com/earendil-works/pi/issues/9294), [#9394](https://github.com/earendil-works/pi/issues/9394), and [#8463](https://github.com/earendil-works/pi/issues/8463) all stem from hardcoded models that upstreams changed or removed.
3. **Silent no-ops in configuration.** Reasoning effort ignored on Bedrock OpenAI models (#9331), invalid `--mode` values silently swallowed ([#9045](https://github.com/earendil-works/pi/issues/9045)), and ignored `shellPath` on Windows (#9361). Users only discover these in production.
4. **Fullscreen TUI rendering regressions.** Cursor-marker leakage (#9257, #9332), scroll-speed degradation (#9052), viewport jumping ([#9424](https://github.com/earendil-works/pi/issues/9424)), and image/overlay compositing (#9438, #2374) indicate the fullscreen path needs sustained hardening.
5. **Headless/embedded performance limits.** O(n²) streaming parse (#9265), grep-context OOM (#9276), and unbounded tool execution (#9460) hit hardest exactly in the SDK/daemon use case pi is being adopted for.
6. **Nondeterminism in extension-influenced startup.** [#8810](https://github.com/earendil-works/pi/issues/8810) and [#9361](https://github.com/earendil-works/pi/issues/9361) both describe behavior that changes depending on whether extensions are loaded — the hardest class of bug for users to reproduce or work around.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-11

## 1. Today's Highlights

Qwen Code shipped **v0.23.3** plus a matching TypeScript SDK (v0.1.12) and a new **Desktop v0.3.0** (with a preview build), while the release pipeline hit a flaky CI failure that was quickly traced and patched. On the issue tracker, the community's attention is concentrated on **VS Code extension session-history regressions**, **Windows MCP connectivity failures**, and **daemon scaling/configuration limits** (memory per ACP child, the hardcoded 25-workspace cap). A high-priority bug (#11590) shows that automatically injected `metadata` in requests can break non-Qwen models routed through DashScope's OpenAI-compatible gateway with HTTP 400.

---

## 2. Releases

| Release | Notes |
| --- | --- |
| **v0.23.3** | Latest stable. No known breaking changes. Headline feature: expanded reasoning presets for Kimi, Qwen and DeepSeek ([#11349](https://github.com/QwenLM/qwen-code/pull/11349)). Release job initially failed on the `quality` lane ([#11580](https://github.com/QwenLM/qwen-code/issues/11580)), fixed by [#11588](https://github.com/QwenLM/qwen-code/pull/11588). |
| **v0.23.3-nightly.20260910.c46cb85cf2** | Nightly. Includes `refactor(dingtalk)`: removal of obsolete background response aggregation ([#11570](https://github.com/QwenLM/qwen-code/pull/11570)) and a breaking `feat(channels)!` cleanup. |
| **sdk-typescript v0.1.12** | Bundles CLI 0.23.3 (built from the same branch/ref as the SDK). Note: release notes contain a stale reference to CLI 0.23.2. |
| **desktop v0.3.0** | Desktop packaging exercised on a schedule in CI ([#11519](https://github.com/QwenLM/qwen-code/pull/11519)); bridge fix to keep pending permission/queue state. |
| **desktop v0.3.0-preview.0** | Prerelease only — the `desktop-latest` updater feed still points at `0.2.2`, so existing installs are not auto-migrated. |

---

## 3. Hot Issues

1. **[#8102 — proposal(core): deterministic tool-execution boundaries for a trustworthy agent runtime](https://github.com/QwenLM/qwen-code/issues/8102)** (OPEN, P3, 18 comments)
   Proposes keeping the LLM outside the trust boundary and having the runtime deterministically constrain, authorize, observe and evaluate model actions. The most-discussed open design issue in the tracker — a sign the community wants a formal security/agent-runtime model rather than ad-hoc approvals.

2. **[#8182 — daemon authorises each ACP child 50% of host memory, never divided by child count](https://github.com/QwenLM/qwen-code/issues/8182)** (OPEN, P2, 7 comments)
   `getAcpMemoryArgs()` derives a V8 old-space ceiling from the **host's** memory and caches it, so N children each believe they own half the box. Directly relevant to anyone running `qwen serve` with multiple workspaces.

3. **[#11386 — feat(serve): decouple registration from live runtimes (LRU live set)](https://github.com/QwenLM/qwen-code/issues/11386)** (CLOSED, P2, 4 comments)
   Includes a measured 1/25/256-workspace capacity baseline and a revised recommendation: idle-host cost doesn't justify full LRU as a hard prerequisite. Useful data for daemon operators.

4. **[#8596 — Deprecate the Electron desktop app and rename desktop-shell to desktop](https://github.com/QwenLM/qwen-code/issues/8596)** (OPEN, 6 comments) and **[#8092 — Build a lower-maintenance desktop app around Web Shell](https://github.com/QwenLM/qwen-code/issues/8092)** (OPEN, 6 comments)
   A paired roadmap discussion: freeze the Electron package, promote the Tauri shell, and reuse Web Shell as the single UI surface to reduce maintenance burden.

5. **[#11574 — VS Code extension hides all prior session history](https://github.com/QwenLM/qwen-code/issues/11574)** (OPEN, P2, 5 comments) and **[#11489 — Extension update drops all conversation history (v0.21.x → v0.23.x)](https://github.com/QwenLM/qwen-code/issues/11489)** (CLOSED, P1, 5 comments)
   The history dialog hardcodes a `sourceType: "vscode"` filter, but transcripts written before 0.23.x lack that metadata — so upgrading silently wipes the visible history even though data still lives in `state.vscdb`. High-visibility upgrade regression.

6. **[#9693 — MCP -32000 "Connection closed" at startup on Windows](https://github.com/QwenLM/qwen-code/issues/9693)** (OPEN, P2, 5 comments), **[#11597](https://github.com/QwenLM/qwen-code/issues/11597)** and **[#11460](https://github.com/QwenLM/qwen-code/issues/11460)** (OPEN)
   A cluster of Windows STDIO-transport MCP failures affecting filesystem/sequential-thinking servers and a filesystem hang after first interaction. This is the single most-reported platform defect family right now.

7. **[#11590 — 自动插入的 metadata 导致非 Qwen 模型 400](https://github.com/QwenLM/qwen-code/issues/11590)** (OPEN, **P1**, 3 comments)
   Qwen Code injects a top-level `metadata` object when targeting DashScope's OpenAI-compatible endpoint; the gateway forwards it to third-party backends (e.g. ZHIPU/GLM-5.3-Flash) whose structs expect `metadata` as a string, producing a hard 400 and making those models completely unusable. Deleting the field fixes the request — a small-blast-radius but total-blocker bug.

8. **[#11500 — TUI exits silently (uncaught React #185) when multiple background agents complete](https://github.com/QwenLM/qwen-code/issues/11500)** (OPEN, **P1**, 3 comments)
   Ink `useBoxMetrics` layout-listener setState loop kills the interactive terminal with no rendered error when several subagents finish near-simultaneously; sessions appear "corrupt" on resume.

9. **[#11556 — vscode-ide-companion 0.23.1 cannot work under Remote-SSH](https://github.com/QwenLM/qwen-code/issues/11556)** (OPEN, **P1**, 3 comments)
   Webview stuck loading with a linux-x64 client against a linux-arm64 remote server. Blocks a common professional workflow (remote dev boxes).

10. **[#11359 — docs(daemon): organize REST and SSE API documentation for integrators](https://github.com/QwenLM/qwen-code/issues/11359)** (OPEN, P3, 5 comments) and **[#9316](https://github.com/QwenLM/qwen-code/issues/9316) / [#9304](https://github.com/QwenLM/qwen-code/issues/9304) — make `MAX_DAEMON_WORKSPACES=25` configurable**
    Two sides of the same "daemon as a platform" theme: integrators want consolidated API docs, and operators want the workspace cap exposed as `QWEN_SERVE_MAX_WORKSPACES` instead of a hardcoded constant.

*Also notable:* [#10118 — Roadmap: split Live into a standalone voice app](https://github.com/QwenLM/qwen-code/issues/10118), [#11579 — invalid model config surfaces as a generic internal error on daemon-backed UIs](https://github.com/QwenLM/qwen-code/issues/11579), [#11353 — Windows WebTerminalRegistry holds exited PTY resources up to 15 minutes](https://github.com/QwenLM/qwen-code/issues/11353), [#11554 — Feishu channel loses media/code/link context](https://github.com/QwenLM/qwen-code/issues/11554).

---

## 4. Key PR Progress

1. **[#11588 — fix(ci): widen the review-salvage replay's timeline margin past contention stalls](https://github.com/QwenLM/qwen-code/pull/11588)** — Unblocks the v0.23.3 release by fixing the flaky `scripts`-lane replay test that stalled the first attempt.

2. **[#11538 — feat: select the OpenAI API per model](https://github.com/QwenLM/qwen-code/pull/11538)** — Adds per-model `api: "chat-completions" | "responses"` for OpenAI-compatible providers; complements the fix in #11596 and gives users real endpoint control.

3. **[#11596 — fix(core): recover from rejected Responses encrypted reasoning](https://github.com/QwenLM/qwen-code/pull/11596)** — On HTTP 400 `invalid_encrypted_content`, retries once with readable reasoning summaries while preserving conversation, tool calls and results.

4. **[#11086 — feat(serve): scope extensions to workspace runtimes](https://github.com/QwenLM/qwen-code/pull/11086)** — Makes the extension catalog available per workspace runtime, with workspace-qualified daemon/SDK access and composer/`@` menu updates. Core to multi-tenant daemon use.

5. **[#11395 — fix(acp): preserve caller-owned mode after child reap](https://github.com/QwenLM/qwen-code/pull/11395)** — Reapplies the daemon API caller's approval mode when a session is cold-loaded or resumed, avoiding silent mode downgrades after ACP child teardown.

6. **[#10183 — feat(memory): add structured on-demand recall](https://github.com/QwenLM/qwen-code/pull/10183)** — Evolves managed auto-memory from a flat prompt blob into a push/pull ref-title tree plus a dedicated recall tool.

7. **[#11457 — feat(goal): stop a Goal at a turn or an active-time budget](https://github.com/QwenLM/qwen-code/pull/11457)** — Adds `model.goalMaxTurns` and `model.goalMaxActiveMinutes` ceilings on top of the existing token budget.

8. **[#11163 — feat(web-shell): manage git remotes from the workspace branch picker](https://github.com/QwenLM/qwen-code/pull/11163)** — List/add/remove remotes (with two-click delete confirmation) directly from the workspace git popover.

9. **[#10906 — feat(web-shell): show shell and monitor task output](https://github.com/QwenLM/qwen-code/pull/10906)** — Persists Monitor stdout/stderr and exposes a live-session-owner-scoped, sanitized tail endpoint for the task detail panel.

10. **[#11531 — ci: add host-level cleanup for ECS runners](https://github.com/QwenLM/qwen-code/pull/11531)** and **[#11297 — fix(ci): retry a failed E2E checkout once after a workspace reset](https://github.com/QwenLM/qwen-code/pull/11297)**
    Infrastructure hardening: a versioned host-maintenance package (Docker cleanup, systemd timer, 7-day `/tmp` retention) and a bounded retry for the self-hosted E2E checkout lane.

*Also moving:* [#10347](https://github.com/QwenLM/qwen-code/pull/10347) (auto-retry transient `400 network error ... EOF`), [#10237](https://github.com/QwenLM/qwen-code/pull/10237) (prevent duplicate task-owner dispatch), [#8783](https://github.com/QwenLM/qwen-code/pull/8783) (exclude hook context from titles/recaps), [#11531](https://github.com/QwenLM/qwen-code/pull/11531), [#9305](https://github.com/QwenLM/qwen-code/pull/9305) (bottom-align short VP content).

---

## 5. Hot Discussions

No Discussions data was provided in this dataset; this section is omitted.

---

## 6. Feature Request Trends

- **Trustworthy / deterministic agent runtime** — #8102's proposal to move the trust boundary out of the model (authorization, observation, evaluation of tool calls) is the most active design thread.
- **Daemon as a platform** — configurable workspace caps (`QWEN_SERVE_MAX_WORKSPACES`, #9304/#9316), correct per-child memory budgeting (#8182), workspace-scoped extensions (#11086), and consolidated REST/SSE API docs for integrators (#11359).
- **Desktop consolidation** — retire the Electron package, promote the Tauri shell and rebuild the desktop experience on Web Shell (#8596, #8092, desktop v0.3.0 work).
- **IDE integration depth** — session-history durability across upgrades (#11574, #11489, #11511), Remote-SSH support (#11556), and exposing the full "Max" thinking effort in the UI (#11514).
- **Memory & Goal control** — structured on-demand recall (#10183) and turn/active-time budgets for Goals (#11457).
- **Channel parity** — richer message handling for Feishu (#11554) and cleanup of legacy channels/dingtalk paths.
- **Voice as a first-class surface** — splitting Live into a standalone voice entry point for all sessions (#10118).

---

## 7. Developer Pain Points

1. **MCP on Windows is broadly broken.** Multiple independent reports (#9693, #11597, #11460, #9675, #10056) describe `-32000 Connection closed`, hangs after first interaction, and tools that report "connected" but are unusable across sessions. This is the highest-volume platform complaint.
2. **Upgrades silently destroy session history.** The VS Code companion's `sourceType`-filtered history dialog (#11574/#11489) makes pre-0.23.x transcripts invisible — data is safe on disk but effectively lost to the user. Trust-eroding for daily drivers.
3. **Daemon limits are hardcoded and undiagnosable.** A literal `MAX_DAEMON_WORKSPACES = 25`, per-child memory ceilings derived from host RAM (#8182), and `git status` calls costing ~1039 ms vs ~20 ms raw (#11591) make scaling `qwen serve` opaque.
4. **Third-party / non-Qwen models break on route-specific quirks.** The injected `metadata` field (#11590, P1) hard-fails GLM and similar models behind DashScope's gateway; model config typos surface as generic internal errors on daemon-backed UIs (#11579).
5. **Interactive TUI instability.** Uncaught React #185 when concurrent background agents complete (#11500) terminates the session with no error output — a bad failure mode for long-running agentic work.
6. **Flaky CI is visible to end users.** Release v0.23.3's first attempt failed on a timing-margin test (#11580 → #11588), a recurring pattern the project is now systematically retrying around (#11297, #11134, #11531).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*