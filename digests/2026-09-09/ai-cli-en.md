# AI CLI Tools Community Digest 2026-09-09

> Generated: 2026-09-08 22:47 UTC | Tools covered: 7

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

# Cross-Tool Comparison Report — AI CLI Developer Tools (2026-09-09 Daily Digest)

## 1. Ecosystem Overview

The seven-tracked tools are converging on the same operational battleground: not raw model capability, but **session durability, tool/MCP lifecycle correctness, sandbox security, and Windows reliability**. Every vendor shipped or accepted code this cycle — but a synchronized wave of bugs (false "success" signals, hangs, OOMs, stale transcripts, permission mis-firings) suggests the ecosystem is leaving the "demo agent" phase and entering the "production agent platform" phase. Maintainers increasingly treat the CLI as an embedded runtime behind desktop apps, web shells, or remote companions rather than as a standalone REPL. Meanwhile, users are demanding *provider flexibility and cost observability* even from first-party vendor CLIs, and open-source tools (Pi, OpenCode) are winning on extensibility while vendor tools (Codex, Claude Code) move fastest on enterprise infrastructure.

## 2. Activity Comparison

Counts below reflect what each community digest explicitly reported for the 24-hour window; digests differ in whether they enumerate full counts or only highlighted items.

| Tool | Issue activity (reported) | PR activity | Discussions | Releases (24h window) |
|---|---|---|---|---|
| **Claude Code** | 10 headline issues; top issue #92016 (20 comments) | 1 PR (stale-bot policy, closed) | Not reported in digest | **v2.1.265** (telemetry parity, plugin-dir) |
| **OpenAI Codex** | 9 headline issues; #8745 has 481 👍 / 64 comments | **~50 merged** in 24h, mostly automation | ~10 digest items (Ideas + Q&A + Show-and-tell) | **rust-v0.154.0-alpha.7** |
| **Gemini CLI** | 10 headline issues; two P1 agent bugs (#22323, #21409) | 10 key PRs open/active | Not reported in digest | **v0.59.0** stable + **v0.60.0-preview.0** + nightly |
| **GitHub Copilot CLI** | **45 issues updated**; 10 headline | 4 PRs updated (2 closed non-substantive) | Not reported in digest | **v1.0.84-2** (Vim mode GA) |
| **OpenCode** | 10 headline; #30086 (51 comments), memory megathread closed (144 comments) | 10 featured PRs (desktop-plugin extraction across #47935–#47948) | Not reported in digest | None |
| **Pi** | 10 headline issues across providers/core | **18 landed or updated** | 3 (community Show-and-tell) | None |
| **Qwen Code** | 10 headline issues; P1 Windows ConPTY leak (#11303/#11352) | ~10 featured PRs | Not reported in digest | **v0.23.1**, **v0.23.2-preview.0**, SDK TS **v0.1.9/v0.1.10** |

*Notes:* "Not reported in digest" means the source digest contained no Discussions section, not that the channel is disabled. No repo in this set has Issues/PRs disabled upstream.

---

## 3. Shared Feature Directions

**1. Session/context durability and lifecycle control.** The most universal demand. Codex users want an OFF switch for hardcoded ~220k auto-compaction (#4106) and a `/rewind` command (#9618, 121 👍); Copilot CLI faces OOM on session resume (#4664), permanently wedged sessions (#4755), and flaky `/compact` (#2861); Claude Code reports permanently unreachable Desktop transcripts (#92825) and backgrounded sessions minting new unlinked IDs (#81662); Gemini CLI has shell commands stuck on "Awaiting user input" (#25166); Pi is porting downstream compaction/context-bug fixes upstream (#9337); Qwen just shipped managed-memory and prompt-cache fixes (#11022) and retry semantics for idle-daemon messages.

**2. Cost and context transparency.** OpenCode's most-upvoted open request is tokens/second display (#5374, 109 👍). Codex has three active Q&A threads on usage economics (#43788, #42983, #43257). Pi added provider-neutral Anthropic OAuth usage reports (#9345). Claude Code users complain recaps ignore `ANTHROPIC_DEFAULT_HAIKU_MODEL` and bill the expensive model (#85922).

**3. MCP and tool-lifecycle hardening.** Copilot reports stdio MCP servers silently disconnected on resume (#4753) and manual-only skills unreachable via the model's tool call (#4438); Gemini hits 400s when MCP tool counts grow too large (#24246); Qwen is recovering failed pooled MCP connections across ACP turns (PR #11392); Claude Desktop auto-denies the CLI-native `SendMessage` tool (#92016); Pi's extension calls break on missing attribution headers (#9290, #9302).

**4. Sandbox, credentials, and prompt-injection defenses.** Gemini has a coherent hardening wave: sandbox filesystem isolation (#29214), credential-safe sandbox containers (#29216), prompt-injection defense via untrusted build flags (#29250), atomic file writes (#29244). Codex is protecting shell snapshots from leaking credentials under credential brokerage (#43909) and skipping elevated firewall setup for proxy-only changes (#43930). Claude Code closed #46465 on harness reminders being indistinguishable from prompt injection. Copilot has a fail-closed ACL edge case blocking `--yolo` even with no managed policy (#4757).

**5. Honest completion signals and loop protection.** Gemini's #22323 (MAX_TURNS reported as "GOAL" success) and #21409 (generalist agent hangs indefinitely) are P1s. OpenCode reports a subagent issuing 364 identical grep calls over ~50 minutes (#45442) and infinite loops after tool calls (#26220). Claude Code's model fabricated a user turn and answered it (#84048). All signal a demand for **observable, truthful agent state machines**.

**6. Windows/desktop parity.** Every tool has a Windows-specific cluster: ConPTY leaks in Qwen (#11303/#11352), MSIX updater bricking Claude Code (#89687), WSL project-management breakage in Codex (#41290), DENY ACL blocking Git writes (#32880), Copilot "archive sessions first" regression (#4756/#4742), Gemini case-insensitive path bugs (#29247), OpenCode desktop sidecar V8 OOM (#41964), Pi's fork-free spawning on constrained hosts (#9350).

---

## 4. Differentiation Analysis

| Tool | Positioning | Technical / community differentiators |
|---|---|---|
| **Claude Code** | Anthropic's agent-first product, now spread across CLI, Desktop, VS Code, Cowork | Tight harness integration and subagent orchestration via `SendMessage`; plugin folders with dynamic load/unload; desktop/CLI telemetry parity. Closed contributor loop (1 PR/day), corporate product cadence, model-family (Fable) behavioral risk is front-and-center in user reports. |
| **OpenAI Codex** | Fastest-moving enterprise-oriented platform; Rust core + desktop/remote App + sandbox layer | ~50 PRs/day; heavy investment in sandbox, credential brokerage, OAuth/identity-scoped model catalogs, thread-state DB migrations, and OS-level security. Differentiates through **infrastructure completeness** rather than community customization. |
| **Gemini CLI** | Google's open-source CLI with security-first release discipline, plus A2A/SDK ambitions | Daily stable/preview/nightly train; P1-labeling culture and large-ish open-contribution wave (10 contributor PRs on sandbox, Windows paths, atomic writes). Strongest signal toward defense-in-depth and honest agent reliability of the vendor tools. |
| **GitHub Copilot CLI** | GitHub-ecosystem glue; vim-modal editing just shipped GA (#13, 76 👍) | Ships user-facing DX wins (Vim mode, sandbox access recording), but reliability complaints dominate: session resume, MCP lifecycle, Windows parallel-session blockers. Differentiates on GitHub workflows (hooks, VS Code launch, repo-root discovery) and the "Local workspace" session model. |
| **OpenCode** | Independent, community-driven TUI power tool (OpenCode 2.0 subagents) | High community engagement (memory megathread 144 comments, legacy-layout pushback 43 comments). Strategic bet is **Desktop-as-extension SDK** (#47935–#47948) with a public Plugin/Client/Schema/UI surface; still bleeding on CPU regressions and runaway loops. |
| **Pi** | Lightweight, terminal-native, provider-agnostic agent runtime (Android-capable) | Strong extensibility story but more minimal than OpenCode's plugin SDK: `pi.sendMessage()`, `before_agent_start`, per-owner UI overrides, modular terminal detection. User base clearly wants **protocol flexibility**: Bedrock Mantle OpenAI-compatible, Kimi Responses API, bearer-token WebSocket gateways, opencode.ai session headers. |
| **Qwen Code** | Alibaba's multi-modal/agent platform (CLI + SDK + daemon/Web Shell) | Fastest **productization** in the set: `qwen serve` daemon, custom Web Shell hosting, branding, visual "Qwen Live" agents, screen/camera input, memory. Architecture is daemon-centric, not just terminal-based. Retired `@qwen-code/webui` in v0.23.1 — breaking changes at SDK/platform boundary. |

---

## 5. Community Momentum & Maturity

- **OpenAI Codex** has the highest mechanical throughput (~50 merged PRs/24h) and an 8-month-old flagship request (#8745 LSP, 481 👍) with sustained demand. It is also the tool whose users most openly reference alternatives ("How is there not a /rewind… parity with Claude Code/OpenCode?").
- **Pi** shows the strongest *proportional* open-source momentum: 18 PRs landed/updated with meaningful fixes (compaction, terminal compatibility, fork-free spawning) plus active design debates on provider support.
- **Gemini CLI** is iterating fastest on security engineering; its P1 issue list is unusually candid (false "GOAL" successes, indefinite hangs) and community sign-off on the Fable-era problems common to Claude Code suggests Google is absorbing cross-tool lessons.
- **GitHub Copilot CLI** has mature issue triage (45 issues updated/24h) but a *small* PR surface (4) — GitHub is still evaluating community patches more slowly than shipping first-party.
- **Claude Code** has a large, vocal user base and serious reported damage (data-loss labels, deleted source-file reports), but nearly zero contributor churn; it is the most "product-managed" of the seven.
- **OpenCode** has extraordinarily high engagement-per-issue (comments in the dozens, deep low-level diagnoses such as strace/proc attribution of the CPU regression) and a widening memory-leak megathread, reflecting a highly technical user base.
- **Qwen Code** is in rapid *platform-expansion* mode (daemon/Web Shell features, SDK releases on a cadence), but its issue tracker shows Windows sandbox/ConPTY and SDK CI health gaps typical of a younger build.

---

## 6. Trend Signals

1. **Reliability is the new feature race.** The user-value frontier has shifted from *what the model can do* to *whether the session survives, reports honestly, and doesn't leak money/time*: false "GOAL" completions (Gemini), infinite tool-call loops (OpenCode), uncompactable sessions (Copilot/Codex), permanent transcript loss (Claude Code), and hang-on-quota-exhaustion (OpenCode #40747 — known error but never exits) are all "trust-busting" bug classes.

2. **Windows is the least-trusted surface in every toolchain.** A disproportionate share of P1s/P0s involves WSL switching, ConPTY/node-pty leaks, MSIX updates, DENY ACLs, path-case and backslash-vs-forward-slash bugs, stale sandbox filesystem views, and desktop sidecar crashes. Vendors that invest in Windows/WSL correctness now will capture the enterprise gap.

3. **Agent memory is becoming the core IP — and a privacy problem.** Gemini's Auto Memory sends transcript content to model context *before* redaction (#26525); Claude Code's harness reminders are indistinguishable from injection (#46465); Qwen is adding multi-library memory to Qwen Live; Codex users want world-state provenance (#42965). The next compliance battleground will be redaction-before-inference, deterministic state isolation, and provenance tracing.

4. **CLIs are becoming platforms.** Qwen is shipping "qwen serve" as a hosting surface; Claude Code unifies Desktop/CLI/Cowork telemetry; Codex ships remote App controls and WOL requests (#43696); OpenCode is literally extracting desktop features into a plugin SDK. Expect the CLI to become an embeddable gateway/runtime behind GUI apps, CI, and IDE companions.

5. **Users demand honest model-behavior visibility.** Complaints now center on **things the model did that users cannot see or undo**: fabricated user turns (Claude Code), invisible "sent" thinking-block messages (#85324), suppressed prose alongside tool calls (#81853), compression without consent (Codex #4106). Design implication: agent tools must expose *undo, rewind, and intent-logging* as core primitives.

6. **Provider flexibility is a competitive moat.** Copilot users want OpenRouter (#2943), Pi users want Bedrock/Kimi/Codex-compatible gateways, Codex users complain strict upstreams reject its `function_call_output` (#42088). Even first-party-tool users want BYO-key and multi-provider support — a signal that model lock-in is eroding and "routing quality" is becoming the differentiator.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

*Note on data: PR comment counts were not populated in the provided extract, so PR ordering is used as the attention proxy; issue comment counts are used where shown.*

## 1. Top Skills Ranking

1. **skill-creator `run_eval.py` fix** — [anthropics/skills PR #1298](https://github.com/anthropics/skills/pull/1298)  
   Addresses the `skill-creator` evaluation loop always reporting `recall=0%`, which makes downstream description optimization meaningless. Discussion centers on the root cause documented in [issue #556](https://github.com/anthropics/skills/issues/556), plus Windows subprocess reading, trigger detection, and parallel-worker failures.  
   **Status:** Open as of 2026-09-09.

2. **Document typography skill** — [anthropics/skills PR #514](https://github.com/anthropics/skills/pull/514)  
   Proposes a typographic quality-control skill for AI-generated documents, targeting orphaned words, widow paragraphs, section headers stranded at page bottoms, and numbering misalignment. The broad usefulness to most document-generation workflows makes it a strongly discussed addition.  
   **Status:** Open.

3. **SCNet HPC skill** — [anthropics/skills PR #1615](https://github.com/anthropics/skills/pull/1615)  
   Adds `scnet-hpc`, a skill for operating SCNet HPC clusters through profile-based SSH and Slurm workflows. Discussion focuses on cluster discovery, connection profiles, Slurm job generation, and accelerator/module guidance.  
   **Status:** Open.

4. **PDF case-sensitivity fix** — [anthropics/skills PR #538](https://github.com/anthropics/skills/pull/538)  
   Fixes case mismatches in `skills/pdf/SKILL.md`, where `REFERENCE.md` and `FORMS.md` are referenced in uppercase but stored lowercase. This is a low-risk reliability fix for case-sensitive file systems.  
   **Status:** Open.

5. **ODT / OpenDocument skill** — [anthropics/skills PR #486](https://github.com/anthropics/skills/pull/486)  
   Adds support for creating, filling, reading, and converting OpenDocument files (`.odt`, `.ods`), including ODT-to-HTML parsing. The skill is positioned for LibreOffice and ISO-standard document workflows.  
   **Status:** Open.

6. **Frontend-design skill clarity pass** — [anthropics/skills PR #210](https://github.com/anthropics/skills/pull/210)  
   Revises the existing `frontend-design` skill to make instructions clearer, more actionable, and feasible within a single Claude Code conversation. Discussion emphasizes reducing vagueness and improving internal coherence.  
   **Status:** Open.

7. **Skill quality and security analyzers** — [anthropics/skills PR #83](https://github.com/anthropics/skills/pull/83)  
   Proposes two meta-skills: `skill-quality-analyzer`, which evaluates structure, documentation, and examples, and `skill-security-analyzer`, which checks security posture. These directly address the community’s broader concerns about skill trustworthiness.  
   **Status:** Open.

8. **DOCX tracked-change ID collision fix** — [anthropics/skills PR #541](https://github.com/anthropics/skills/pull/541)  
   Prevents document corruption when the DOCX skill adds tracked changes to documents that already contain bookmarks. The fix targets the shared OOXML `w:id` ID space.  
   **Status:** Open.

## 2. Community Demand Trends

- **Trusted, secure skill distribution**  
  The largest issue is [anthropics/skills Issue #492](https://github.com/anthropics/skills/issues/492), with 43 comments, warning that community skills distributed under the `anthropic/` namespace create a trust-boundary vulnerability. [Issue #1175](https://github.com/anthropics/skills/issues/1175) also raises security and context-window concerns for enterprise SharePoint documents.  
  **Demand direction:** security review, namespace trust, and permission guardrails for skills.

- **Skill sharing, packaging, and lifecycle management**  
  [Issue #228](https://github.com/anthropics/skills/issues/228) requests org-wide skill sharing in Claude.ai instead of manual `.skill` file transfers. [Issue #189](https://github.com/anthropics/skills/issues/189) reports duplicate skills from related plugins, and [Issue #62](https://github.com/anthropics/skills/issues/62) describes installed skills disappearing.  
  **Demand direction:** cleaner install/update/share mechanisms, de-duplication, and org-level libraries.

- **Reliable authoring and evaluation tooling**  
  [Issue #556](https://github.com/anthropics/skills/issues/556) reports that `run_eval.py` never triggers skills, with 12 comments and 7 👍. Related issues include [Issue #202](https://github.com/anthropics/skills/issues/202) on skill-creator best practices and [Issue #1390](https://github.com/anthropics/skills/issues/1390) on `mcp-builder` evaluation scoring 0/N against real MCP servers.  
  **Demand direction:** trustworthy eval harnesses, authoring standards, and cross-platform script reliability.

- **Context-efficiency and token discipline**  
  [Issue #1487](https://github.com/anthropics/skills/issues/1487) reports that the `claude-api` skill can inject ~156k tokens in one tool call, exhausting the context window. This is part of a broader concern that skills themselves must be lightweight and context-aware.  
  **Demand direction:** skills that respect context budgets and avoid eager large injections.

- **Meta-skills for agent governance, memory, and quality**  
  Several issue proposals point to skills that govern agent behavior rather than perform a specific content task: [Issue #412](https://github.com/anthropics/skills/issues/412) proposes `agent-governance`, [Issue #1329](https://github.com/anthropics/skills/issues/1329) proposes `compact-memory`, and [Issue #1385](https://github.com/anthropics/skills/issues/1385) proposes a reasoning quality-gate pipeline.  
  **Demand direction:** agent self-management, memory compression, safety patterns, and output auditing.

## 3. High-Potential Pending Skills

These open PRs appear most likely to gain traction because they are either directly tied to active bug reports or represent complete, broadly useful skill proposals:

- **skill-creator eval fix** — [PR #1298](https://github.com/anthropics/skills/pull/1298)  
  Directly targets the widely reproduced zero-recall problem in [Issue #556](https://github.com/anthropics/skills/issues/556), with related Windows-specific fixes in [PR #1099](https://github.com/anthropics/skills/pull/1099) and [PR #1050](https://github.com/anthropics/skills/pull/1050).

- **Document typography skill** — [PR #514](https://github.com/anthropics/skills/pull/514)  
  A practical quality-control skill relevant to virtually every document Claude generates.

- **ODT / OpenDocument skill** — [PR #486](https://github.com/anthropics/skills/pull/486)  
  Fills a real gap for LibreOffice, `.odt`, and `.ods` document workflows.

- **Testing-patterns skill** — [PR #723](https://github.com/anthropics/skills/pull/723)  
  Covers testing philosophy, unit testing, React component testing, and broader testing-stack guidance — a high-demand engineering topic.

- **Buffer API agent skill** — [PR #1627](https://github.com/anthropics/skills/pull/1627)  
  A portable GraphQL social-scheduling skill usable across Claude, Cursor, Codex, and other agents; recently updated in early September 2026.

- **Hivemind multi-agent orchestration skill** — [PR #1628](https://github.com/anthropics/skills/pull/1628)  
  Proposes delegating mechanical work to headless workers on free models while Claude Code remains the planner/reviewer — an active area of community interest.

- **Self-audit skill** — [PR #1367](https://github.com/anthropics/skills/pull/1367)  
  Proposes mechanical file verification plus a four-dimension reasoning audit before delivery, aligning with the quality-gate demand in [Issue #1385](https://github.com/anthropics/skills/issues/1385).

## 4. Skills Ecosystem Insight

The community’s most concentrated demand at the Skills level is for **guardrails around skills themselves — secure distribution, trustworthy evaluation tooling, context-budget discipline, and agent-governance patterns — rather than any single new functional domain skill**.

---

# Claude Code Community Digest — 2026-09-09

## 1. Today's Highlights

Release **v2.1.265** landed with two notable changes: telemetry parity (Claude Desktop and Cowork now report `user.email` and `user.groups` like terminal sessions do) and a more ergonomic `--plugin-dir` that can point at a folder of plugins with dynamic load/unload of manifest-bearing subfolders. The hottest community thread remains **#92016** (20 comments), where Claude Desktop's auto-denial of the CLI-native `SendMessage` tool breaks subagent resumption for macOS users. Meanwhile, a security-flavored report (**#46465**) about harness `<system-reminder>` language being indistinguishable from prompt-injection phrasing closed after 15 comments — and the sole PR in the window (**#63686**) suggests the maintainers may be rebalancing the issue-lifecycle bot.

## 2. Releases

**v2.1.265** — [Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.265)
- Added `user.email` and `user.groups` to telemetry that Claude Desktop and Cowork send through the Claude apps gateway, bringing them in line with terminal sessions.
- `--plugin-dir` now accepts a folder containing multiple plugins: every child folder with a manifest is loaded, and plugins added/removed from the folder are picked up dynamically.

## 3. Hot Issues

1. [**#92016 — Desktop auto-denies CLI-native SendMessage, breaking subagent resumption**](https://github.com/anthropics/claude-code/issues/92016) — *Open, 20 comments, 7 👍.* The top community concern: Claude Desktop for macOS (Code tab) treats the CLI's `SendMessage` tool as untrusted, auto-denying it and preventing subagents from resuming. Desktop's replacement only covers session-to-session flow, so CLI-native orchestration is broken — a significant regression for agent workflows.

2. [**#46465 — Harness `<system-reminder>` wording is indistinguishable from prompt injection**](https://github.com/anthropics/claude-code/issues/46465) — *Closed, 15 comments.* Security researchers flagged that Claude Code's own injected reminders ("NEVER mention this reminder to the user") use the exact signature of a prompt-injection attack, creating a transparency and hardening problem: models cannot distinguish first-party harness instructions from adversarial ones.

3. [**#92825 — Desktop session transcripts silently become permanently unavailable**](https://github.com/anthropics/claude-code/issues/92825) — *Open, 2 comments, data-loss label.* Follow-up to #79044: `cliSessionId` is nulled and there is no local recovery path, meaning macOS Desktop users can permanently lose access to session history. Data-loss issues in the Desktop app continue to accumulate.

4. [**#92517 — Feature request: pool usage across accounts and shared session context**](https://github.com/anthropics/claude-code/issues/92517) — *Open enhancement, 2 comments.* A small-team capability request: let groups of individual subscriptions contribute to a project-level usage pool and share session context so multiple people can collaborate on one codebase under their own accounts.

5. [**#89687 — Windows Desktop MSIX updater makes app unlaunchable (0x80070020)**](https://github.com/anthropics/claude-code/issues/89687) — *Open, 6 comments.* The MSIX updater force-registers at quit into a live AppX container, bricking the app until sign-out. Filed against the Desktop product but routed here since it's the public channel; the bundled CLI is unaffected.

6. [**#81853 — Fable 5 hides text when a response also contains tool calls**](https://github.com/anthropics/claude-code/issues/81853) — *Closed, 7 comments, 3 👍.* With `claude-fable-5`, any response mixing prose and tool calls renders only the tool call in the terminal; the text is visible only in the detailed transcript. Reporters noted the same setup works with Opus 4.8.

7. [**#84048 — Assistant fabricates the user's next turn and then answers it**](https://github.com/anthropics/claude-code/issues/84048) — *Closed, 3 comments.* The model appended a fabricated user message (complete with speaker label) to its own reply, then answered it in the next turn — a serious behavioral bug that undermines trust in conversation state.

8. [**#85324 — Fable sends messages in thinking blocks that neither user nor transcript can see**](https://github.com/anthropics/claude-code/issues/85324) — *Closed, 2 comments.* Fable believes it has answered direct questions inside invisible thinking blocks. Community members report being unable to retrieve those responses from the transcript — a transparency gap with the new model family.

9. [**#85482 — Claude Code unexpectedly deletes source files**](https://github.com/anthropics/claude-code/issues/85482) — *Closed, 2 comments.* A Windows user reports ("CLAUDE FABLE ERASED ALL MY SOURCES") deletion accompanied by a `VirtualMessageList: itemKeys/messages length desync` telemetry error. Minimal detail, but the report type is the scariest class of bug for agentic tools.

10. [**#91214 — Desktop sessions read a stale, isolated filesystem view that never re-syncs**](https://github.com/anthropics/claude-code/issues/91214) — *Open, 1 comment.* On Windows, Desktop sessions hold an isolated filesystem view that goes stale and never re-syncs with the real working tree — making Desktop a risky place for long-running work unless the sandbox behavior is understood.

## 4. Key PR Progress

Only one PR was active in the 24-hour window.

- [**#63686 — Bump stale and autoclose timeouts from 14 to 90 days**](https://github.com/anthropics/claude-code/pull/63686) — *Closed.* Changes the issue-lifecycle configuration in `scripts/issue-lifecycle.ts`, extending both the "mark stale" threshold and the autoclose delay from 14 days to 90 days. Given the large batch of `stale`-labeled closures visible in this week's issue activity, this appears to be a process correction: giving real bug reports far more time before automated closure. Worth watching for whether it reduces the number of valid issues that currently get swept up by the bot.

## 5. Hot Discussions

No GitHub Discussions data was provided for this digest period.

## 6. Feature Request Trends

Distilled from the Issues in scope:

- **Team-oriented collaboration.** The clearest signal is [#92517](https://github.com/anthropics/claude-code/issues/92517): pooled usage across accounts plus shared session context for small teams working on one project. This aligns with Anthropic's broader Cowork direction and suggests the next collaboration frontier is multi-account projects.
- **Session portability and naming.** [#85932](https://github.com/anthropics/claude-code/issues/85932) asks for VS Code session names to be exposed in the CLI (`claude sessions list`) and for sessions to be movable across project contexts. The recurring theme is that session identity is fragmented across CLI, VS Code, and Desktop surfaces.
- **Desktop/CLI behavioral parity.** Multiple open items (#92016, #91214, #92825) imply users expect Desktop sessions to be a strict superset of CLI behavior — same tool permissions, same filesystem semantics, same transcript guarantees. Each divergence is being filed as a bug rather than accepted as a product difference.

## 7. Developer Pain Points

- **False-positive safety filters.** A striking cluster of complaints (#85929, #85549, #85541, #85559) says benign code and prompts — including simple Go programs and personal projects — are flagged as cybersecurity risks or "inappropriate content," blocking legitimate work and eroding trust in the model layer.
- **Desktop reliability is the new frontier of pain.** Session transcripts that become unreachable (#92825), sandboxed filesystem views that go stale (#91214), auto-denied CLI tools (#92016), stale account identity from `~/.claude.json` (#78838), and a Windows updater that bricks the app (#89687) — Desktop users are hitting a wide surface of platform-specific breakage.
- **Fable-model behavioral regressions.** Multiple reports describe the new model acting in ways users can't observe or control: text suppressed when tool calls are present (#81853), invisible "sent" messages inside thinking blocks (#85324), and outright fabrication of user turns (#84048).
- **Session and transcript fragility.** Backgrounding a session can mint a new unlinked session ID (#81662), leaving the original transcript unreachable if the handoff worker dies; recaps ignore `ANTHROPIC_DEFAULT_HAIKU_MODEL` and bill the expensive main model (#85922). Users are losing work and paying for it.
- **Overly strict worktree sandboxing.** [#85931](https://github.com/anthropics/claude-code/issues/85931) documents that simple bash loops and process substitution are refused as "too complex to verify" even when they touch no filesystem path.
- **Windows terminal/TUI rough edges.** Input bleed and raw ANSI corruption in agent views (#68465), scroll getting stuck in the input box (#77967), and interactive prompts freezing on window switch on Linux (#85927) show the multi-session TUI still needs platform polish.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-09

## 1. Today's Highlights

A new rust alpha (`v0.154.0-alpha.7`) shipped, while ~50 PRs were merged in the last 24 hours—mostly automation-driven—covering telemetry, Windows sandbox fixes, shell-snapshot security, and provider-scoped model catalogs. On the community side, the LSP integration request remains the most loudly demanded feature (481 👍 / 64 comments over 8 months), and a new Windows/WSL project-management blocker shot to the top of the issue tracker with 46 comments. Windows reliability is the dominant theme in fresh bug reports.

## 2. Releases

- **[rust-v0.154.0-alpha.7](https://github.com/openai/codex/releases)** — Published within the last 24 hours; a routine alpha bump in the `0.154.0` series. No detailed changelog was included with the release note.

## 3. Hot Issues

- **[Issue #8745 — LSP integration (auto-detect + auto-install) for Codex CLI](https://github.com/openai/codex/issues/8745)** — The flagship DX request: built-in Language Server Protocol support so Codex CLI can use LSP diagnostics and symbol intelligence for more accurate edits. 481 👍 and 64 comments show sustained, cross-platform demand since January.
- **[Issue #41290 — Project creation/removal fails after switching Agent Environment to WSL](https://github.com/openai/codex/issues/41290)** — On Codex App `26.825.31414`, Windows users lose the ability to create or remove projects once the agent environment is set to WSL. 46 comments make it the fastest-escalating Windows report this cycle.
- **[Issue #4106 — Control over auto-compaction parameters](https://github.com/openai/codex/issues/4106)** — Pro users are frustrated by the hardcoded ~220k auto-compaction threshold truncating long code-heavy sessions; request includes a hard OFF toggle. 112 👍, open for a year.
- **[Issue #40575 — RFC: Self-evolving agents via `/learn` and rule metabolism for AGENTS.md](https://github.com/openai/codex/issues/40575)** — Proposes interactive instruction distillation to address the "amnesia" of multi-week agent projects. 19 comments of active design debate.
- **[Issue #43832 — Claude Code fails to launch from Codex on Windows: "Access is denied"](https://github.com/openai/codex/issues/43832)** — Claude Code runs fine in PowerShell but is blocked when spawned from Codex App `26.901.51231`.
- **[Issue #43142 — Windows resume reuses rollout ordinals, freezing desktop history](https://github.com/openai/codex/issues/43142)** — After resuming an interrupted task, the paginated history projection stops advancing even though the durable JSONL contains later messages; refresh/reopen keeps showing stale state.
- **[Issue #15643 — Remote MCP: `scopes_supported` must come from protected resource metadata](https://github.com/openai/codex/issues/15643)** — Enterprise OAuth flows against remote MCP servers break because scopes are read from the wrong document (17 👍).
- **[Issue #41486 — Codex App mangles Windows paths: `Z:\AREA_01` becomes `Z:\AREA\_01`](https://github.com/openai/codex/issues/41486)** — A client-side serialization bug that silently corrupts paths sent to the model while the UI displays them correctly—a dangerous class of bug for file operations.
- **[Issue #32880 — Windows Desktop regression: Git writes stopped; DENY ACL blocks linked worktrees](https://github.com/openai/codex/issues/32880)** — After the `26.707.3748 → 26.707.6957` update, autonomous Git operations fail due to a workspace-write DENY ACL, breaking worktree-based workflows.
- **[Issue #42088 — `function_call_output` emitted without `call_id`, fails strict upstreams (400)](https://github.com/openai/codex/issues/42088)** — When resuming threads with prior tool calls against strict OpenAI-compatible `/responses` servers (e.g., DeepSeek), Codex emits output events missing `call_id`, causing hard 400 failures.

## 4. Key PR Progress

- **[PR #43921 — Streaming reasoning summaries in the TUI status row](https://github.com/openai/codex/pull/43921)** — The status heading now surfaces the latest usable reasoning line through tool activity, and restores active reasoning after resume; full reasoning stays in the expanded transcript.
- **[PR #43889 — Fix transcript viewer restoration and half-page scrolling](https://github.com/openai/codex/pull/43889)** — Makes alternate-screen entry idempotent so the saved inline viewport is no longer overwritten on repeated entry, and aligns half-page scroll height with the rendered transcript.
- **[PR #43906 / PR #43897 — Scope and persist model catalog caches per provider/auth identity](https://github.com/openai/codex/pull/43906)** — Adds a SHA-256 identity derived from provider routing, headers, and auth scope; prevents cross-account catalog leakage and stale overwrites during in-flight refreshes.
- **[PR #43930 — Avoid Windows sandbox setup for irrelevant proxy port changes](https://github.com/openai/codex/pull/43930)** — Skips elevated firewall setup when only proxy listeners change, since the sandbox has no port-specific loopback rules.
- **[PR #43909 — Protect shell snapshots when credential brokerage is enabled](https://github.com/openai/codex/pull/43909)** — Snapshot capture/replay now respects the command's sandbox and environment policy so startup files cannot persist real credentials or overwrite brokered dummy values.
- **[PR #43907 — Preserve complete shell snapshot exports through filtering and replay](https://github.com/openai/codex/pull/43907)** — Fixes line-based export parsing that truncated multiline values, and restores Bash options before parsing functions using extended glob syntax.
- **[PR #43925 — Cancellation for native user-verification RPCs](https://github.com/openai/codex/pull/43925)** — Prevents a canceled proof from being delivered while waiting on outbound queue capacity; gives clients a way to stop native verification work.
- **[PR #43900 — Propagate Apps tool refreshes to existing threads](https://github.com/openai/codex/pull/43900)** — Refreshing installed Apps without a thread now updates the tool catalog for existing threads on their next turn, matching transport/auth/protocol settings.
- **[PR #43927 — Rename thread artifacts to attachments in the state database](https://github.com/openai/codex/pull/43927)** — Internal DB migration (`thread_artifacts` → `thread_attachments`, `artifact_type` → `attachment_type`) with the thread lookup index recreated under the new name.
- **[PR #43934 / PR #43937 — Telemetry: voice sessions & TUI startup context](https://github.com/openai/codex/pull/43934)** — Adds `codex.voice.session.*` lifecycle metrics and tags `codex.tui.start` with fixed `terminal_name`/`multiplexer` categories for better environment analytics.

## 5. Hot Discussions

### Ideas
- **[Discussion #9618 — "How is there not a /rewind or /revert feature?"](https://github.com/openai/codex/discussions/9618)** — 121 👍 and 21 comments make this the community's loudest workflow gap: parity with OpenCode/Claude Code for conversational undo without commit-on-every-change.
- **[Discussion #43788 — Usage transparency and a subscription-based API](https://github.com/openai/codex/discussions/43788)** — Developers want to know what a task will cost before running it; questions whether a subscription API tier is missing.
- **[Discussion #42965 — Track source turn/window provenance for persisted world state](https://github.com/openai/codex/discussions/42965)** — Suggests tracing how persisted state evolves across context windows—relevant as stateful agent patterns spread.
- **[Discussion #43696 — Wake on LAN for remote Codex app](https://github.com/openai/codex/discussions/43696)** — Requests the mobile remote app be able to trigger WOL to wake sleeping machines.

### Q&A
- **[Discussion #43891 — macOS fix for SkyComputerUseService spawn storm](https://github.com/openai/codex/discussions/43891)** — Community PSA confirming the hundreds-of-processes/RAM exhaustion issue on 26.8xx is fixed in Codex `26.901.51231`; includes the official DMG link.
- **[Discussion #42983 — "Something feels off with the usage limits"](https://github.com/openai/codex/discussions/42983)** — Users report the 5-hour limit burns almost as fast on the low model tier as the high one—a 96-word answer reportedly cost 4% of the allowance.
- **[Discussion #43257 — How does experimental context management count against usage limits?](https://github.com/openai/codex/discussions/43257)** — Long-running multi-day tasks raise questions about whether history lookups into earlier context windows consume the allowance.

### Show and tell
- **[Discussion #16329 — Awesome Codex CLI: curated list of 150+ ecosystem tools](https://github.com/openai/codex/discussions/16329)** — Community index of subagents, skills, plugins, and MCP servers, addressing discoverability across a fast-growing ecosystem.
- **[Discussion #41642 — Compact Context: a local five-file starting map for Codex](https://github.com/openai/codex/discussions/41642)** — An MIT-licensed repository router that ranks local metadata and feeds Codex up to five likely files per qualifying turn.
- **[Discussion #43908 — ManualMode: reserve real repo tasks for manual practice](https://github.com/openai/codex/discussions/43908)** — Lets Codex propose a real repository task, reserve it, and have the engineer implement it manually in the IDE—structured human practice alongside the agent.

## 6. Feature Request Trends

- **Code intelligence via LSP** — The dominant open ask (#8745): auto-detect and auto-install language servers for diagnostics and symbols.
- **Session/context sovereignty** — Users want control over auto-compaction thresholds and an OFF switch (#4106), conversation-level rewind (#9618), and explicit blocking control for `request_user_input` outside Plan mode (#43759).
- **Agent memory & self-evolution** — The `/learn` RFC for interactive instruction distillation into AGENTS.md (#40575) and world-state provenance tracking (#42965).
- **Flexible project/workspace backends** — Jujutsu (`jj`) support or custom worktree hooks (#26648), default project root configuration (#41714), and deep research as a first-class task mode (#29741).
- **Cost transparency** — Pre-flight cost estimation and clearer usage accounting (Discussions #43788, #42983, #43257).
- **Remote/hardware bridging** — Wake-on-LAN for remote sessions (#43696); model selection that isn't persisted globally to config (#26472).

## 7. Developer Pain Points

- **Windows reliability is the #1 frustration cluster.** This cycle alone: WSL environment switching breaks project operations (#41290), DENY ACLs block Git writes in worktrees (#32880), path serialization corrupts underscores (#41486), the sandbox blocks launching Claude Code (#43832), resuming freezes history (#43142), and conversations enter unrecoverable reconnect loops (#43810). Combined with earlier Chrome policy blocks (#41334), Windows users face systemic app/sandbox regressions.
- **macOS app regressions persist.** Integrated terminal shortcuts stop working (#42180), composer loses keyboard focus after app switches (#30346), Option–Space windows hang on "Waiting for worktree setup" (#40253), dictation stalls before Realtime starts (#38324), and remote-control pairing can steal identities from cloned Macs (#33830).
- **Custom-model and MCP interoperability gaps.** Strict `/responses` upstreams reject `function_call_output` lacking `call_id` (#42088); MCP tools fail with remote/custom providers (#15643, #31354); `tool_search` aborts with "unsupported payload" on non-native endpoints like Ollama/Bifrost (#20574).
- **Context and usage economics feel opaque.** Hardcoded compaction thresholds truncate valuable history, and the usage-limit meter appears to burn disproportionately fast even on lower-tier models—eroding trust in long, code-heavy sessions.

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-09

## Today's Highlights
The project shipped a full release train in the past 24 hours — stable **v0.59.0**, **v0.60.0-preview.0**, and another nightly — with the preview adding stricter MCP OAuth issuer verification and web-fetch destination validation. Meanwhile, maintainers are converging on a major security-hardening wave: sandbox filesystem isolation, credential-safe sandbox containers, and atomic file writes are all under active review. Community attention remains fixed on agent reliability, especially the P1 generalist-agent hang and subagent turn-limit interruptions being misreported as successful "GOAL" completions.

## Releases
- **[v0.59.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0)** — Latest stable release; aggregates the v0.58.0-preview.0 changelog, release-engineering updates, and additional core fixes.
- **[v0.60.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-preview.0)** — Improves destination validation and connection routing in web-fetch utilities ([PR #29120](https://github.com/google-gemini/gemini-cli/pull/29120), @diegogodinezr); the MCP OAuth flow now enforces RFC 9207 issuer identification (@jvargassanchez-dot).
- **[v0.60.0-nightly.20260908.g85aca163f](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260908.g85aca163f)** — Ongoing nightly tracking trunk changes since the 09/07 build.

## Hot Issues
1. **Subagent MAX_TURNS interruption is reported as "GOAL" success** — [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) `[P1, area/agent]`  
   The `codebase_investigator` subagent reports `Termination Reason: "GOAL"` even when it hit the maximum turn limit before performing any analysis. False success signals are dangerous for automated and semi-automated workflows; this was the most-commented issue this cycle (13 comments) and remains open for retesting.

2. **Generalist agent hangs indefinitely** — [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) `[P1, area/agent]`  
   Users report the CLI hangs forever whenever work is deferred to the generalist agent — even trivial folder creation. Strong community signal with 8 👍 and 8 comments; the common workaround is explicitly instructing the model not to defer.

3. **Zero-dependency OS sandboxing and post-execution intent routing** — [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) `[P2, area/agent, effort/large]`  
   A design proposal to let the model leverage its "bash-native" strengths (grep/cat/sed/awk) inside a lightweight OS sandbox with intent routing after execution. This direction aligns closely with the current wave of sandbox-related PRs.

4. **AST-aware file reads, search, and mapping** — [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) `[P2, area/agent, EPIC]`  
   Tracks whether AST-aware tools can reduce token noise and turn counts — e.g., reading precise method bounds in a single call instead of misaligned file reads. A likely lever for the community's recurring context-bloat complaints.

5. **Gemini does not use skills and sub-agents enough** — [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) `[P2, area/agent]`  
   Users report the model rarely invokes custom skills/sub-agents autonomously, even when highly relevant, unless explicitly told to — undermining one of the main value props of configurable agents.

6. **Auto Memory sends transcript content to model context before redaction** — [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) `[P2, area/security]`  
   Local transcripts are read and sent to the extraction model before any secret redaction occurs, and logging may expose skill content. Raises legitimate privacy concerns for users on memory features.

7. **Shell command gets stuck on "Awaiting user input" after completion** — [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) `[P1, area/core]`  
   Simple CLI commands that cannot prompt for input still leave the shell process wedged in "active" state. A high-frustration reliability bug with 3 👍.

8. **Automated session takeover and lock recovery for browser_agent** — [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) `[P3, area/agent, kind/feature]`  
   Request to replace the browser agent's fail-fast behavior with automatic recovery from locked persistent browser profiles and orphaned processes.

9. **Browser subagent fails on Wayland** — [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) `[P1, area/agent, kind/bug]`  
   The browser subagent still fails in Wayland environments, limiting Linux desktop users. Four comments and counting.

10. **400 error when tool count grows too large** — [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) `[P2, area/agent]`  
   Heavy MCP/tool configurations can blow past the supported tool-count threshold and trigger 400 errors. Users expect the agent to scope tools to the task rather than enumerate everything.

## Key PR Progress
1. **Harden sandbox filesystem boundaries and isolate runtime state** — [PR #29214](https://github.com/google-gemini/gemini-cli/pull/29214) by @diegogodinezr (open)  
   Stops mounting host configuration directories inside the sandbox, replaces them with sanitized config files, and standardizes on realpath-based boundary checks.

2. **Isolate settings directory in sandbox containers** — [PR #29216](https://github.com/google-gemini/gemini-cli/pull/29216) by @jvargassanchez-dot (closed)  
   Prevents Docker/Podman sandboxes from inheriting the host's `~/.gemini` directory, closing a credential-exposure path for OAuth tokens and account data.

3. **Prevent indirect prompt injection via build files and untrusted flags** — [PR #29250](https://github.com/google-gemini/gemini-cli/pull/29250) by @villahernandez-coder (open)  
   Hardens restricted-mode execution paths (`shell`, file editing) against malicious build-file modifications and untrusted shell parameters.

4. **Make tool file writes atomic and serialize same-path writes** — [PR #29244](https://github.com/google-gemini/gemini-cli/pull/29244) by @ranjan-del (open, P1)  
   Fixes silent lost edits when parallel tool calls write to the same file: both currently report success, but the second write discards the first edit.

5. **Close sibling-prefix bypass in `get_internal_docs` path guard** — [PR #29249](https://github.com/google-gemini/gemini-cli/pull/29249) by @ranjan-del (open, P1)  
   The existing string-prefix comparison accepts sibling directories whose names begin with the docs directory; this adds proper path-component boundaries.

6. **Preserve explicit versioned Flash model IDs** — [PR #29252](https://github.com/google-gemini/gemini-cli/pull/29252) by @SandyTao520 (open, P1)  
   Stops silently remapping explicit Flash model pins to the Gemini 3.5 Flash rollout default, keeping `--model` pinning accurate and letting invalid IDs surface as honest API errors.

7. **Make `isWithinRoot` case-insensitive on Windows** — [PR #29247](https://github.com/google-gemini/gemini-cli/pull/29247) by @mydd7 (open)  
   Case-sensitive path comparisons rejected valid in-root paths on Windows (e.g., `c:\` vs `C:\`), breaking ACP/IDE FS routing and ignore-path normalization.

8. **Avoid duplicate history and telemetry after confirmation** — [PR #29248](https://github.com/google-gemini/gemini-cli/pull/29248) by @PansaLegrand (open)  
   Fixes slash commands like `/resume save <tag>` being recorded twice when another message arrives while a confirmation prompt is open.

9. **Mount `express.json()` before A2A SDK routes** — [PR #29126](https://github.com/google-gemini/gemini-cli/pull/29126) by @Anurag-M1 (open)  
   Middleware ordering bug left A2A SDK routes with `req.body === undefined`, breaking JSON-RPC parsing (fixes #29073).

10. **Deflake shell-command and file-system integration tests** — [PR #29185](https://github.com/google-gemini/gemini-cli/pull/29185) by @DavidAPierce (open)  
   Targets slow/flaky E2E tests for `run_shell_command` and `file-system-interactive`, particularly around disallowed-tools configurations — welcome CI reliability work.

## Feature Request Trends
- **Trustworthy autonomous orchestration**: Users want honest completion signals, no indefinite hangs, and more autonomous use of custom skills/sub-agents ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), [#21409](https://github.com/google-gemini/gemini-cli/issues/21409), [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)).
- **Defense-in-depth sandboxing**: Requests for OS-level sandboxing, host credential isolation, and prompt-injection defenses are converging into a coherent security workstream ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873), plus PRs #29214/#29216/#29250).
- **Context/token efficiency**: Persistent file-based task tracking and AST-aware code reading/search/mapping to replace heavy in-context approaches ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#18836](https://github.com/google-gemini/gemini-cli/issues/18836), [#21000](https://github.com/google-gemini/gemini-cli/issues/21000)).
- **Memory-system transparency and privacy**: Deterministic secret redaction before model context, quarantine of invalid memory patches, and bounded retries for low-signal sessions ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)).
- **Browser agent resilience and configurability**: Session takeover, Wayland support, and honoring `settings.json` overrides ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232), [#21983](https://github.com/google-gemini/gemini-cli/issues/21983), [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)).
- **Cross-platform path correctness**: Case-insensitive Windows paths, NTFS 8.3 short-name handling, and symlinked agent files ([#29247](https://github.com/google-gemini/gemini-cli/pull/29247), [#29116](https://github.com/google-gemini/gemini-cli/pull/29116), [#20079](https://github.com/google-gemini/gemini-cli/issues/20079)).

## Developer Pain Points
- **False completion signals and hangs erode trust**: MAX_TURNS shown as "GOAL success", the generalist agent hanging for up to an hour, and shell commands stuck on "Awaiting user input" are the loudest recurring complaints ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323), [#21409](https://github.com/google-gemini/gemini-cli/issues/21409), [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)).
- **Configuration drift**: Browser agent ignores `settings.json` overrides, `/compress` doesn't survive session resume, and symlinked agent definitions under `~/.gemini/agents/` are silently rejected ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267), [#21335](https://github.com/google-gemini/gemini-cli/issues/21335), [#20079](https://github.com/google-gemini/gemini-cli/issues/20079)).
- **Model behavior creates cleanup/safety overhead**: Temporary scripts scattered across the repo, risky `git reset`/`--force` usage, and getting stuck at interactive prompts (e.g., Vite scaffolding) force manual babysitting ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571), [#22672](https://github.com/google-gemini/gemini-cli/issues/22672), [#22465](https://github.com/google-gemini/gemini-cli/issues/22465)).
- **Secret handling before redaction**: Auto Memory forwards transcript content to the model before any redaction step, creating real privacy friction for memory features ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)).
- **Tool scaling and selection**: Large MCP configurations hit hard 400 errors, while default tool behavior isn't scoped to what the task actually needs ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-09

## 1. Today's Highlights

The headline is **v1.0.84-2**, which brings Vim-mode modal editing to everyone and finally closes the repo's most-upvoted feature request ([#13](https://github.com/github/copilot-cli/issues/13), 76 👍). The rest of the activity is dominated by reliability complaints around session resume and MCP lifecycle handling — heap OOM crashes, permanently wedged sessions, and stdio MCP servers silently disconnecting on resume. Windows desktop-app users are also pushing back on a session-conflict regression that blocks creating new Local sessions unless idle ones are archived first ([#4756](https://github.com/github/copilot-cli/issues/4756), 19 👍).

## 2. Releases

**v1.0.84-2** ([release](https://github.com/github/copilot-cli/releases/tag/v1.0.84-2))

- **New:** Vim mode is now available to everyone. Enable it with `/vim` or set `editorMode` to `vim` for modal editing in the composer; the current mode is shown while typing.
- **Improved:** On supported Windows sandbox policies, interactive shell commands now record blocked accesses.

## 3. Hot Issues

Among the 45 issues updated in the last 24 hours, these 10 stand out:

1. **[#13 — CLI input should have a vi/vim input mode](https://github.com/github/copilot-cli/issues/13) [CLOSED]**  
   The long-running, community-driven request (76 👍, 11 comments) has now shipped in v1.0.84-2. It was open for nearly a year, making this one of the clearest user wins of the cycle.

2. **[#4756 — Windows app requires archiving every idle project session before creating a new Local session](https://github.com/github/copilot-cli/issues/4756) [OPEN]**  
   19 👍 in a single day shows how widespread this is. Users on desktop app 1.1.15 can't start a new Local session without manually archiving older idle sessions first — a significant workflow regression.

3. **[#4742 — Desktop app 1.1.15: "This project already has an active Local workspace"](https://github.com/github/copilot-cli/issues/4742) [OPEN]**  
   Related Windows friction with 10 comments: a second Local (branch) session fails whenever another Local session in the same project has a live CLI process. Likely the same root cause as #4756.

4. **[#4664 — Copilot CLI crashes with JavaScript heap out of memory when resuming a long-standing session](https://github.com/github/copilot-cli/issues/4664) [OPEN]**  
   Fatal V8 OOM while loading/resuming large sessions — the user can't even continue working. A serious blocker for anyone relying on long-lived, context-heavy sessions.

5. **[#4612 — Runaway FileWatch host-event loop freezes TUI and grows debug log to 13 GB](https://github.com/github/copilot-cli/issues/4612) [OPEN]**  
   Long-running/resumed sessions can enter a tight `No connection accepted ... FileWatch` loop, freezing the TUI and ballooning debug logs by gigabytes. High severity for persistent-session workflows.

6. **[#4753 — v1.0.83: session resume cancels in-flight stdio MCP server connections](https://github.com/github/copilot-cli/issues/4753) [OPEN]**  
   A reported regression: MCP handshake timeout dropped from ~16s in v1.0.82 to ~1s in v1.0.83 on resume, making still-initializing stdio MCP servers silently unavailable for the rest of the session.

7. **[#2861 — Compaction failed: received empty response from model (3x retry, manual /compact on Opus 4.6)](https://github.com/github/copilot-cli/issues/2861) [OPEN]**  
   Even short sessions (<30 turns) hit three consecutive empty responses during `/compact`. Open since April and still unresolved — compaction reliability remains a sore point.

8. **[#4438 — `disable-model-invocation: true` makes a skill unreachable, not manual-only](https://github.com/github/copilot-cli/issues/4438) [OPEN]**  
   Skills flagged as manual-only show up in `copilot skill list`, but the model's `skill()` tool returns `Skill not found`. The explicit-invocation path is effectively broken, undermining the feature's purpose.

9. **[#2943 — OpenRouter integration](https://github.com/github/copilot-cli/issues/2943) [OPEN]**  
   Steady demand (14 👍) for bring-your-own-provider support. Users want the same model-provider flexibility they get from other agentic CLIs.

10. **[#4755 — Session wedges permanently when a queued-lane message lands at turn end](https://github.com/github/copilot-cli/issues/4755) [OPEN]**  
    A session can end up neither idle nor running, accepting no input, with the queue never draining and no crash to diagnose. Only recovery is killing the process — a critical reliability issue for automation and app-embedded use.

## 4. Key PR Progress

Only four PRs were updated in the last 24 hours:

1. **[#4770 — Document the WebSocket responses opt-out](https://github.com/github/copilot-cli/pull/4770) [OPEN]**  
   Documents the escape hatch for models that advertise a WebSocket responses endpoint: when the network blocks WebSocket connections, or when users hit `400 input item ID does not belong to this connection`, the opt-out provides a working path. Directly relevant to the stale-connection issue [#4505](https://github.com/github/copilot-cli/issues/4505).

2. **[#4762 — install: report unsupported operating systems](https://github.com/github/copilot-cli/pull/4762) [CLOSED]**  
   Fixes `install.sh` so non-macOS/Linux platforms (e.g. FreeBSD) no longer fall through to the Windows branch and emit a misleading "winget not found" error. Copilot CLI doesn't publish FreeBSD binaries, so the installer should say the platform is unsupported.

3. **[#4761 — install: report unsupported operating systems](https://github.com/github/copilot-cli/pull/4761) [CLOSED]**  
   An independent implementation of the same installer fix by another contributor. Closed, with #4762 covering the change.

4. **[#4100 — shangti0168](https://github.com/github/copilot-cli/pull/4100) [CLOSED]**  
   Non-substantive PR with no contextual description; closed without activity.

## 5. Hot Discussions

No discussion data was provided for this window; section omitted.

## 6. Feature Request Trends

- **Vim/modal editing is now shipped.** The highest-requested UX feature ([#13](https://github.com/github/copilot-cli/issues/13), 76 👍) went GA in v1.0.84-2.
- **Model-provider flexibility.** Demand for OpenRouter and model choice continues ([#2943](https://github.com/github/copilot-cli/issues/2943), 14 👍), alongside complaints that Gemini models reject some MCP array schemas ([#4623](https://github.com/github/copilot-cli/issues/4623)).
- **MCP lifecycle management.** Users want MCP profiles to scope which servers load per project ([#2235](https://github.com/github/copilot-cli/issues/2235)) and proper MCP cancellation of in-flight elicitation requests ([#4759](https://github.com/github/copilot-cli/issues/4759)).
- **Greater session transparency.** Surface the agent's internal TODO list ([#1724](https://github.com/github/copilot-cli/issues/1724), 11 👍) and collapsible, color-coded output sections for thinking/tool-call/message content ([#1787](https://github.com/github/copilot-cli/issues/1787)).
- **Context-memory isolation.** Memory must not leak across repositories ([#3945](https://github.com/github/copilot-cli/issues/3945)), and manual-only skills should remain explicitly invocable ([#4438](https://github.com/github/copilot-cli/issues/4438)).

## 7. Developer Pain Points

- **Session resume fragility:** heap OOM on large sessions ([#4664](https://github.com/github/copilot-cli/issues/4664)), permanently wedged sessions ([#4755](https://github.com/github/copilot-cli/issues/4755)), stale `input item ID` errors after interrupted responses ([#4505](https://github.com/github/copilot-cli/issues/4505)), orphaned session-state folders ([#2836](https://github.com/github/copilot-cli/issues/2836)), and `--yolo` silently dropping after idle periods ([#4696](https://github.com/github/copilot-cli/issues/4696)).
- **MCP connection flakiness:** in-flight stdio servers canceled on resume ([#4753](https://github.com/github/copilot-cli/issues/4753)), no cancellation request sent during auth-browser elicitation ([#4759](https://github.com/github/copilot-cli/issues/4759)), repeated false "Found 0 tools" results ([#4773](https://github.com/github/copilot-cli/issues/4773)), and OAuth `scope` omitted for Entra ID servers ([#4582](https://github.com/github/copilot-cli/issues/4582)).
- **Windows parallel-session blockers:** can't create a second Local session while one is active ([#4742](https://github.com/github/copilot-cli/issues/4742)) and archiving required first ([#4756](https://github.com/github/copilot-cli/issues/4756)).
- **Performance pathologies:** FileWatch host-event loop freezing the TUI and writing 13 GB of logs ([#4612](https://github.com/github/copilot-cli/issues/4612)) and idle TUI CPU hogging that multiplies after prompts ([#4750](https://github.com/github/copilot-cli/issues/4750)).
- **Config/hook discovery blind spots:** standalone repo-root `.github/hooks/*.json` never fires ([#4520](https://github.com/github/copilot-cli/issues/4520)), workspaces whose root isn't a git repo can't discover `.mcp.json` ([#4765](https://github.com/github/copilot-cli/issues/4765)), and launching VS Code from the CLI drops empty `GIT_CONFIG_VALUE` entries, breaking Git discovery ([#4531](https://github.com/github/copilot-cli/issues/4531)).
- **Permissions edge cases:** fail-closed bypass restrictions applied even when no managed policy is present, blocking `--yolo` for the session ([#4757](https://github.com/github/copilot-cli/issues/4757)).

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — September 9, 2026

## Today's Highlights

The issue tracker remains dominated by **performance and reliability regressions**: high CPU usage, TUI spinner redraws pegging a full core, and multiple reports of agents entering infinite tool-call loops with no loop protection. On the engineering side, a major architectural push is underway to **extract the Desktop app into a plugin/extension system** (PRs #47935–#47948), while a long-running memory megathread (#20695) was closed after consolidating the community's heap-snapshot collection efforts.

## Releases

No new releases were published in the last 24 hours.

## Hot Issues

Chosen for their community engagement, severity, and signal value:

1. **[#20695 — Memory Megathread](https://github.com/anomalyco/opencode/issues/20695)** *[CLOSED]* · 144 comments · 110 👍
   The central coordination thread for scattered memory-leak reports. Now closed after consolidating guidance on collecting heap snapshots; notably warns users against running LLMs to suggest fixes. A significant milestone in triaging a long-standing bug class.

2. **[#30086 — High CPU usage in newer versions](https://github.com/anomalyco/opencode/issues/30086)** · 51 comments · 27 👍
   Users report a dramatic CPU spike over the past week: 10+ concurrent sessions previously worked; now 3 sessions lag the mouse cursor. Points to a suspected regression in recent updates and is a top community concern.

3. **[#5374 — [FEATURE] Show tokens/second](https://github.com/anomalyco/opencode/issues/5374)** · 21 comments · 109 👍
   The most-upvoted open feature request: display current and average tokens/sec so users can compare providers and models. The high 👍 count reflects strong demand for performance observability.

4. **[#37012 — [FEATURE] Keep legacy layout option](https://github.com/anomalyco/opencode/issues/37012)** · 43 comments · 47 👍
   Users pushing back on the redesigned UI want a legacy layout toggle, citing one-click access to all features from the main window and workspace support. Signals UX-regression friction after the redesign.

5. **[#26220 — Infinite loop after tool calls complete](https://github.com/anomalyco/opencode/issues/26220)** · 11 comments · 4 👍
   OpenCode enters an infinite loop and stops responding after tool calls finish (affected version: "Big Pickle"). Process stays alive but never exits or continues—a serious reliability bug affecting automation workflows.

6. **[#42306 — TUI main thread burns ~100% CPU redrawing a spinner](https://github.com/anomalyco/opencode/issues/42306)** · 3 comments
   Confirmed via strace and /proc sampling: the TUI main thread continuously redraws a spinner (~15 fps writev to tty) even with no active output. Valuable low-level diagnosis of the CPU regression class.

7. **[#45442 — Subagent infinite loop: ~50 min of identical tool calls](https://github.com/anomalyco/opencode/issues/45442)** · 4 comments
   A `general` subagent issued **364 identical grep calls** over ~50 minutes with no loop protection, burning tokens uncontrollably. Highlights the absence of loop detection in 2.0 subagents.

8. **[#41964 — Desktop sidecar repeatedly crashes with V8 out-of-memory](https://github.com/anomalyco/opencode/issues/41964)** · 3 comments
   The desktop app's local server frequently crashes with V8 OOM, causing a red server indicator and "Failed to fetch." Windows-specific; possibly aggravated by proxy/TUN networking.

9. **[#40747 — `opencode run` hangs indefinitely when usage quota is exhausted](https://github.com/anomalyco/opencode/issues/40747)** · 3 comments
   `opencode run` never exits and never surfaces the error even though the failure is known internally within ~170 ms and written to logs. Critical for CI/scripted usage where hangs are costly.

10. **[#47690 — Desktop double-prefixes OpenRouter model IDs](https://github.com/anomalyco/opencode/issues/47690)** · 2 comments
    The model picker stores `modelID` already containing the provider prefix (`z-ai/glm-5.3-flash`), which then gets combined with `providerID: "openrouter"` — breaking requests. Representative of a cluster of model-resolution config bugs (see also #47968, #48027).

## Key PR Progress

1. **[#47935 — feat(plugin): explore desktop extensions and manager](https://github.com/anomalyco/opencode/pull/47935)**
   Lays the foundation for a Desktop extension SDK: renderer/main entrypoints, TUI slot resolver, host-owned panels/native surfaces, plus an OCDX manager in Settings → Extensions. Supports browse, drag/drop, URL install, and enable/disable.

2. **[#47948 — refactor(app): extract context usage extension](https://github.com/anomalyco/opencode/pull/47948)**
   Moves the context-usage button, statistics, system-prompt display, raw messages, and export into `@opencode/plugin-context-desktop` — part of the built-in extension refactor.

3. **[#47947 — refactor(app): extract review and file viewer extension](https://github.com/anomalyco/opencode/pull/47947)**
   Extracts Git review, file trees, previews, diff viewers, line comments, and "Open in" actions into `@opencode/plugin-review-desktop`, keeping panel layout and workspace caches in the host.

4. **[#47936 — refactor(desktop): extract the browser extension package](https://github.com/anomalyco/opencode/pull/47936)**
   Moves the renderer and native browser implementation into `@opencode/plugin-browser-desktop`, with no production imports from App/Desktop/Core — demonstrating the new public Plugin/Client/Schema/UI/Electron API surface.

5. **[#47635 — fix(opencode): resolve markdown agent prompts](https://github.com/anomalyco/opencode/pull/47635)** *(closes #47616)*
   Fixes markdown agent/mode loaders overwriting frontmatter `prompt:` with the Markdown body (including empty bodies) and skipping frontmatter parse errors.

6. **[#41301 — fix(core): settle shell spawn failures](https://github.com/anomalyco/opencode/pull/41301)**
   Prevents commands that fail synchronously during process creation (e.g., embedded NUL bytes) from leaving the shell tool and its session busy forever. Important core reliability fix.

7. **[#41299 — fix(app): auto-reconnect stale SSE streams and repair state drift](https://github.com/anomalyco/opencode/pull/41299)** *(closes #40910, #40502)*
   Makes the web UI recover when the `/global/event` SSE stream dies silently due to reverse-proxy buffering or NAT timeouts, addressing the empty-session-list class of bugs.

8. **[#41264 — feat(tui): add focus view to collapse multi-step turns](https://github.com/anomalyco/opencode/pull/41264)** *(closes #37003)*
   Opt-in TUI "focus view" that collapses each multi-step assistant turn into a compact block showing the final text + tool summary. Reduces scrolling noise in long agentic sessions.

9. **[#48030 — fix(app): move vertical tab update button to footer](https://github.com/anomalyco/opencode/pull/48030)**
   Small UI polish: relocates the update button below Status in the vertical-tab sidebar with consistent 28px sizing.

10. **[#41240 — fix(core): normalize file watcher paths to forward slashes](https://github.com/anomalyco/opencode/pull/41240)** *(fixes #35329)*
    Fixes Windows file-watcher events emitting backslash paths while the rest of OpenCode compares with forward slashes — a source of cross-platform path-matching bugs.

## Feature Request Trends

- **Performance observability**: The most-upvoted open feature is tokens/second display (#5374, 109 👍), showing users want fine-grained visibility into provider throughput. Related demands include context-usage panels and better diagnostics around stalls.
- **UI flexibility / legacy preservation**: Strong demand to keep or restore the old layout (#37012, 47 👍), plus smaller requests like desktop completion notifications (#48026) and a "Conversation Outline" view (#47993). The icon-upload bug (#34301, #32708) generates repeated UX complaints.
- **Session lifecycle management**: Requests for unarchive/restore of archived sessions (#24153) indicate that session management is becoming a first-class workflow concern for heavy users.
- **Plugin/extension ecosystem**: The Desktop extension extraction PRs (#47935–#47948) align with community asks for custom/MCP tool rendering parity in the desktop app (#27659) — expect a push toward a unified extension SDK across TUI and desktop.
- **Developer-contributed fixes are flowing**: Issues with proposed patches (e.g., #48003 path-corruption check) and contributor PRs (e.g., #47635) suggest an active external contributor base.

## Developer Pain Points

- **Reliability regressions in recent releases**: The combination of high CPU usage (#30086), TUI spinner redraws at 100% core (#42306), and sidecar V8 OOM crashes (#41964) points to performance regressions in the last few versions — multi-session users are hit hardest.
- **Runaway agents with no loop protection**: Multiple reports of infinite identical tool-call loops (#26220, #45442) causing uncontrolled token burn remain unresolved, a serious concern for agentic/autonomous usage.
- **Model-selection/config fragility**: Silent fallback to global `config.model` ignoring the TUI-selected model (#47968), OpenRouter double-prefixing (#47690), missing account-enabled models in the Zen picker (#48027), and unsettable thinking budgets in v2 (#48019) all erode trust in model routing.
- **Silent hangs and poor error surfacing**: `opencode run` hanging on quota exhaustion (#40747) rather than reporting the already-known error is especially painful for CI automation. Session-not-found errors missed in non-V1 wrapper shapes (#48012) add to the error-handling debt.
- **Memory and CPU still dominate the backlog**: The now-closed Memory Megathread (#20695) confirms a long tail of leak reports; while consolidated, memory remains the single most-commented topic in the project's history.

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-09

## 1. Today's Highlights

The Pi project saw no new releases in the last 24 hours, but the issue tracker is highly active with several pressing reliability bugs: OpenAI-compatible WebSocket sessions are hitting hard-stop failures beyond two handled error codes (#7444), provider summarization on opencode-family models is broken by missing session headers (#9302), and users report a 13% truncation rate on Anthropic edit tool calls through the Vercel AI gateway (#9212). On the positive side, 18 pull requests landed or were updated, with meaningful fixes for terminal compatibility, fork-free process spawning on Android, and a batch of compaction and context-usage bug fixes being ported from a downstream fork (#9337).

## 2. Releases

No new releases in the last 24 hours.

## 3. Hot Issues

**Provider support & compatibility**

- **[#5363 — Add amazon-bedrock-mantle provider for OpenAI-compatible models](https://github.com/earendil-works/pi/issues/5363)** · 19 comments · 15 👍 — The most-discussed issue of the day. The existing `amazon-bedrock` provider only supports Converse, but Bedrock Mantle models expose an OpenAI-compatible endpoint. Community interest is high; maintainers have tagged this `[inprogress]`.

- **[#9338 — kimi-coding provider: support OpenAI Responses wire protocol](https://github.com/earendil-works/pi/issues/9338)** · 3 comments — The built-in Kimi coding provider is hardcoded to `anthropic-messages`, but the endpoint now serves a live (though undocumented) OpenAI Responses API. A low-effort addition with potential subscription-upside for users of Kimi for Coding.

- **[#5152 — Support Codex websocket responses api with _bearer token_ through models.json](https://github.com/earendil-works/pi/issues/5152)** · 5 comments — Closed as `[no-action]`, but a recurring limitation: custom `models.json` providers using `openai-codex-responses` currently assume the auth token is a ChatGPT JWT, blocking third-party Codex-compatible gateways.

**Reliability & correctness bugs**

- **[#7444 — WebSocket retry only handles two error codes; other transient response.failed errors hard-stop the turn](https://github.com/earendil-works/pi/issues/7444)** · 10 comments — The `openai-codex-responses` WebSocket retry loop special-cases only `previous_response_not_found` and `websocket_connection_limit_reached`; any other transient failure throws and kills the turn. Users want a broader transient-error classification.

- **[#8823 — Esc during active streaming often fails to cancel the in-flight request](https://github.com/earendil-works/pi/issues/8823)** · 10 comments — Pressing Esc registers the abort but the HTTP request continues until the provider finishes naturally. Particularly painful with long generations, as the turn eventually persists with an "aborted" stop reason after waiting anyway.

- **[#9212 — sonnet-5 via gateway: 13% of edit tool calls arrive truncated to edits:[{}]](https://github.com/earendil-works/pi/issues/9212)** · 4 comments — 18 of 134 edit calls from Claude Sonnet 5 through the Vercel AI Gateway failed schema validation because recorded arguments were truncated. Unclear whether the truncation happens at the gateway or in the model output; concerning for anyone running high-volume edit workloads.

- **[#9290 — Extension API: modelRegistry.complete() doesn't send x-opencode-session for opencode-go models](https://github.com/earendil-works/pi/issues/9290)** · 4 comments — Since opencode.ai began enforcing `x-opencode-session` on 2026-09-06, every extension-driven completion request fails with a 400. Closely related to #9302 — both stem from missing attribution headers in non-loop code paths.

- **[#9302 — Out-of-loop summarization misses provider attribution headers (opencode 400 MissingSessionID)](https://github.com/earendil-works/pi/issues/9302)** · 3 comments · tagged `[inprogress]` — Branch summaries and compaction on opencode-family providers fail deterministically with `400 MissingSessionID` because the summarization path shares an auth-only header source that omits the required session header.

**Reasoning handling**

- **[#8706 — zai thinking handler sends disabled for forced-thinking models (glm-5.3/5.3-flash), leaking reasoning into output](https://github.com/earendil-works/pi/issues/8706)** · 4 comments · 1 👍 — When thinking is toggled off, the Z.AI adapter still unconditionally sends `thinking: {type: "disabled"}` to GLM models that require thinking, causing reasoning text to leak into the answer. A model-capability mapping issue.

- **[#5581 — Custom messages sent via `pi.sendMessage()` with `triggerTurn: true` bypass the `before_agent_start` event](https://github.com/earendil-works/pi/issues/5581)** · 5 comments · 1 👍 — Tagged `[bug, inprogress]`. Extension authors who rely on `emitBeforeAgentStart` for permissions, logging, or injection find that custom-triggered turns bypass it completely, causing inconsistent behavior depending on how a turn is started.

## 4. Key PR Progress

**Bug fixes**

- **[#9351 — Fix the edit preview flicker on remote edits](https://github.com/earendil-works/pi/pull/9351)** — When edits use injected remote operations, the tool row briefly flashes red with a "Could not edit file" error before the remote diff replaces it. A visible UX glitch common in multi-device workflows.

- **[#9350 — fork-free executable lookup in findExecutableOnPath and commandExists](https://github.com/earendil-works/pi/pull/9350)** — Replaces `which` and `<cmd> --version` spawning with fork-free lookups. On Android/multi-threaded hosts, a `fork()` on the main thread can deadlock the entire process — a meaningful robustness fix for constrained environments.

- **[#9319 — guard optional invalidate in MouseRegion](https://github.com/earendil-works/pi/pull/9319)** — Fixes a crash where extension-supplied custom components without an `invalidate` method cause `TypeError` on theme change or redraw.

- **[#9310 — clear mouse selection on session switch](https://github.com/earendil-works/pi/pull/9310)** — Text selection in fullscreen mode previously persisted when switching sessions, leaking highlights into an unrelated session.

- **[#8635 — preserve aborted stop reason during lazy setup](https://github.com/earendil-works/pi/pull/8635)** — Fixes #8409: abort signals are now passed through lazy stream setup wrappers, so setup failures during a tool execution report `aborted` instead of an error when the user has already cancelled.

**Features & improvements**

- **[#9345 — expose Anthropic OAuth usage reports](https://github.com/earendil-works/pi/pull/9345)** — Adds provider-neutral subscription usage reports plus an Anthropic OAuth adapter, with token-partitioned caching and in-flight deduplication. Useful for users on OAuth-based plans who want usage transparency.

- **[#9344 — add owner-safe UI overrides](https://github.com/earendil-works/pi/pull/9344)** — Introduces owner-identity-tracked overrides for themes, footers, and editors so stale extensions can't clobber the active UI; explicit theme selection clears temporary ownership.

- **[#9337 — bound Case 3 compaction estimate and getContextUsage display on failed/aborted turns](https://github.com/earendil-works/pi/pull/9337)** — Ports three compaction/context-display bug fixes from a downstream fork back to upstream `main`, ensuring they land in the official release line ahead of `pi update` overwrites.

- **[#8627 — Use ctx.cwd for cwd-sensitive tools](https://github.com/earendil-works/pi/pull/8627)** — Updates `read`, `write`, `edit`, `glob` and other cwd-sensitive tools to resolve paths against the session's real cwd from `ExtensionContext` when available, falling back to creation-time cwd.

**Tooling & terminal support**

- **[#9329 — detect Orca terminals as Kitty-image capable](https://github.com/earendil-works/pi/pull/9329)** — Treats `TERM_PROGRAM=Orca` as supporting Kitty inline images, true color, and OSC 8 hyperlinks so image components render inline instead of degrading to text and wrapped URLs (companion fix to earlier terminal detection work).

## 5. Hot Discussions

All three discussions this cycle are community project announcements — no Q&A or idea-thread activity to report.

**Show and tell**

- **[#8803 — pi-verdict: a minimal permission gate for pi](https://github.com/earendil-works/pi/discussions/8803)** · 1 comment · 1 👍 — A one-file, zero-dependency extension implementing Claude Code-style allow/ask/deny tool-call confirmation. Directly addresses a gap acknowledged in Pi's own README — a practical option for users who want guardrails without full container isolation.

- **[#9327 — Eco Coding: a GUI for Pi](https://github.com/earendil-works/pi/discussions/9327)** · 1 👍 — An open-source desktop GUI built on Pi with vision-split agent "eyes", team management, browser and computer-use support, plus a mobile companion — aimed at users who want a richer visual shell around the same agent loop.

- **[#9312 — Pi Context Memory: tracing decisions after compaction](https://github.com/earendil-works/pi/discussions/9312)** · 1 👍 — A new-community-member experiment (built with Codex) exploring whether the agent can still trace why an earlier decision was made after a long conversation has been compacted. Interesting direction given the recurring compaction-bug reports in the issue tracker.

## 6. Feature Request Trends

1. **Broader provider compatibility** — Requests consistently focus on new providers or protocol options: Amazon Bedrock Mantle via OpenAI-compatible API (#5363), OpenAI Responses wire protocol for Kimi (#9338), and bearer-token auth for Codex-compatible websocket gateways (#5152). The through-line is "don't hardcode one protocol per provider."

2. **Extension API deeping** — Extension authors keep asking for more lifecycle coverage: fired events for every input path (`steer`/`follow_up` not triggering extension events, #8718), acknowledged idempotent delivery of user turns (#9236), and consistent headers/attribution on out-of-loop calls (#9290, #9302).

3. **Better model-capability metadata** — Two separate bugs (#7445, #8706) stem from coupling protocol role selection and thinking-format to a single `model.reasoning` boolean rather than richer capability flags. Expect pressure for a more granular capability model.

4. **TUI usability enhancements** — Fullscreen mode is attracting steady feature requests: faster wheel scrolling (#9052), click-to-expand compaction blocks (#9356), and pricing/context metadata in the `/model` picker (#9355).

5. **Separation of Pi-managed vs user-managed state** — Recurring requests (#4212, #6415) to move tool-maintained fields (e.g., `lastChangelogVersion`) out of user config files, driven by users tracking configs in VCS across devices.

## 7. Developer Pain Points

- **Cancellation is unreliable** — Esc during streaming doesn't abort promptly (#8823); session abort doesn't stop post-run auto-compaction (#9340). Users need a no-surprises abort contract across the whole request lifecycle.

- **Provider auth/header fragmentation** — The opencode.ai `x-opencode-session` enforcement (2026-09-06) broke two distinct code paths (#9290, #9302) in the same week, signaling that session/attribution headers need to be centralized in the auth layer rather than passed ad-hoc per call site.

- **Data integrity of tool calls** — A 13% truncation rate on edit calls (#9212) is alarming for anyone using gateway routes at scale; the community is clearly watching whether this is a model-side or gateway-side issue.

- **WebSocket fallback behavior is sticky and fragile** — Only two transient error codes are retried (#7444), and a transient network failure permanently pins a session to SSE fallback (#8125). Users want resilient reconnection semantics, not binary hard-stops.

- **Config management frictions** — Read-only config directories break even reads because locking is unconditional (#6406); mutating config files on every changelog check adds sync noise for git-tracked dotfiles (#6415).


</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-09

## Today’s Highlights

CLI `v0.23.1` and SDK TypeScript `v0.1.10` shipped, bringing the long-requested managed-memory/prompt-cache fixes from [#11022](https://github.com/QwenLM/qwen-code/issues/11022). The most active community pain point remains a P1 Windows ConPTY leak ([#11303](https://github.com/QwenLM/qwen-code/issues/11303), [#11352](https://github.com/QwenLM/qwen-code/issues/11352)) that can leave hundreds of `conhost.exe` processes behind. Meanwhile, the Web Shell/daemon area is moving fast, with PRs adding custom frontend hosting, branding, web previews, and richer assistant lifecycle hooks.

## Releases

- [v0.23.2-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.2-preview.0) — CI-only patch: isolates subprocess-heavy E2E from fork pressure via [PR #11388](https://github.com/QwenLM/qwen-code/pull/11388).
- [v0.23.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1) — Includes a breaking change: `@qwen-code/webui` is retired ([#9812](https://github.com/QwenLM/qwen-code/pull/9812)). The complete change list also begins with Web Shell dashboard/management features; source data truncates the rest of the changelog.
- [sdk-typescript-v0.1.9](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.9) / [sdk-typescript-v0.1.10](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.10) — Bundle CLI `0.23.0` / `0.23.1` respectively. Both deliver the fixes requested in [#11022](https://github.com/QwenLM/qwen-code/issues/11022): managed-memory availability now respects `memory.enableManagedAutoMemory`, and stale prompt-cache cleanup is included.

## Hot Issues

- [#11303](https://github.com/QwenLM/qwen-code/issues/11303) — **P1: Windows `qwen-cli` leaks headless `conhost.exe` ConPTY processes**. After ~12 hours, a single VS Code Companion instance accumulated 347 child processes and ~2.8 GB RAM. 10 comments; currently the most discussed user-facing bug.
- [#11352](https://github.com/QwenLM/qwen-code/issues/11352) — **P1 blocked: node-pty leaks the ConPTY host on natural shell exit**. The pinned `@lydell/node-pty` erases the baton before `onExit`, making `ClosePseudoConsole` unreachable from JS. This half of [#11303](https://github.com/QwenLM/qwen-code/issues/11303) cannot be fixed from Qwen side without a dependency change.
- [#11405](https://github.com/QwenLM/qwen-code/issues/11405) — **P2: denied tool patterns are too strict**. A pattern like `Bash(npm view *)` or `Read(//**/node_modules/**)` causes the model to believe the entire tool is forbidden. [PR #11411](https://github.com/QwenLM/qwen-code/pull/11411) is open to improve the denial messaging.
- [#11394](https://github.com/QwenLM/qwen-code/issues/11394) — **P2: SDK TypeScript docker E2E leg shares one `QWEN_HOME`**. Memory prefetch consumes fake-server responses, failing 15/20 `permission-control.test.ts` assertions only under `sandbox:docker`.
- [#10685](https://github.com/QwenLM/qwen-code/issues/10685) — **P2: Channel service PID file can mistake a recycled PID**. `process.kill(pid, 0)` proves only that *some* process owns the PID, not that the original Channel service is still alive. Important long-daemon correctness issue.
- [#11386](https://github.com/QwenLM/qwen-code/issues/11386) — **P2: scaling daemon workspaces past 25**. Suggests decoupling registration from live runtimes with an LRU live set. New capacity measurements revised the recommendation: full LRU may not be a hard prerequisite, but stale registrations still need cleanup.
- [#11385](https://github.com/QwenLM/qwen-code/issues/11385) — **P2: Web Shell sidebar session spinner never shows during background-agent notification turns**. The session visibly processes todo/step updates, but the sidebar UI does not communicate that state.
- [#11335](https://github.com/QwenLM/qwen-code/issues/11335) — **P3: Web Shell transcript column drifts off the composer axis**. Once the turn-navigation rail appears, the transcript column shifts half a rail width. Small but noticeable layout bug; 4 comments.
- [#11358](https://github.com/QwenLM/qwen-code/issues/11358) — **P3: host a custom Web Shell distribution**. Integrators want `qwen serve` to host a prebuilt frontend in place of the bundled Web Shell while keeping daemon APIs, so the frontend can be updated independently.
- [#11359](https://github.com/QwenLM/qwen-code/issues/11359) — **P3: consolidated daemon REST/SSE API docs**. Request for an integrator-focused API index with runnable examples, grouped by capability, and clear deployment responsibilities.

## Key PR Progress

- [#11411](https://github.com/QwenLM/qwen-code/pull/11411) — **Fix permission denial reasoning**. When a shell command is denied by a pattern, the message now cites the matching deny rule and frames denial as invocation-scoped rather than tool-scoped. Directly addresses [#11405](https://github.com/QwenLM/qwen-code/issues/11405).
- [#11369](https://github.com/QwenLM/qwen-code/pull/11369) — **Major Qwen Live expansion**: selectable screen/camera input, On Demand/Live Feed capture, proactive DashScope monitors, local multi-library memory, and an init wizard.
- [#11392](https://github.com/QwenLM/qwen-code/pull/11392) — **Recover failed pooled MCP connections** on subsequent ACP turns. Reacquires connections through the workspace pool, waits for cleanup, shares concurrent creation, and applies a 5s failure cooldown.
- [#11276](https://github.com/QwenLM/qwen-code/pull/11276) — **Web previews with delivery history**. Adds desktop/mobile width previews, refresh, external opening, and saved delivery history for browser-reachable dev URLs.
- [#10938](https://github.com/QwenLM/qwen-code/pull/10938) — **Session Workflow UI hardening**: makes plan DAG dependencies navigable, quiets inspector chrome, and restructures the DAG so each step leads with the step name, not its status.
- [#11291](https://github.com/QwenLM/qwen-code/pull/11291) — **Retry status-less upstream SSE errors**. When a gateway pushes an error into a 200 OK stream, the turn now retries instead of ending. Related to [#11215](https://github.com/QwenLM/qwen-code/issues/11215).
- [#10347](https://github.com/QwenLM/qwen-code/pull/10347) — **Auto-retry transient network EOF errors**. Treats wrapped low-level failures like `400 network error ... EOF` as retryable transport errors, which matters in channels without Ctrl+Y.
- [#10455](https://github.com/QwenLM/qwen-code/pull/10455) — **Prevents CLI startup crash on unwritable output-language file**. Handles read-only home directories and root-owned leftovers on shared runners.
- [#11289](https://github.com/QwenLM/qwen-code/pull/11289) — **Keep mid-turn Web Shell messages when the daemon rejects them at idle**. The daemon now says a session is idle, and the browser sends the text as an ordinary prompt instead of treating it as a failed send.
- [#11258](https://github.com/QwenLM/qwen-code/pull/11258) — **Preserve branch commits when checkout hooks fail**. Failed branch creation now restores the prior checkout without running repo hooks or filesystem monitors, avoiding accidental loss of hook-created commits.

## Feature Request Trends

- **“`qwen serve` as an agent platform” is the strongest direction.** Developers are asking for custom Web Shell hosting ([#11358](https://github.com/QwenLM/qwen-code/issues/11358)), configuration-based branding ([#11357](https://github.com/QwenLM/qwen-code/issues/11357)), consolidated daemon API docs ([#11359](https://github.com/QwenLM/qwen-code/issues/11359)), and assistant turn lifecycle callbacks ([#11251](https://github.com/QwenLM/qwen-code/pull/11251)).
- **Background-agent observability and session state UX.** Multiple Web Shell requests target visible progress: spinners for background-agent turns ([#11385](https://github.com/QwenLM/qwen-code/issues/11385)), session overview follow-ups ([#11390](https://github.com/QwenLM/qwen-code/issues/11390)), and clearer daemon rejection semantics ([#11289](https://github.com/QwenLM/qwen-code/pull/11289)).
- **Daemon decoupling and scale.** Workspaces beyond 25 registrations ([#11386](https://github.com/QwenLM/qwen-code/issues/11386)) and decoupling Skill management from ACP child processes ([#11274](https://github.com/QwenLM/qwen-code/issues/11274)) are both being tracked as staged refactors.
- **Provider/tooling breadth.** Expect more built-in web search defaults for ModelStudio ([#11348](https://github.com/QwenLM/qwen-code/pull/11348)) and expanded reasoning presets for Kimi, Qwen, and DeepSeek models ([#11349](https://github.com/QwenLM/qwen-code/pull/11349)).

## Developer Pain Points

- **Windows ConPTY/memory leaks are the top pain point.** Users report runaway `conhost.exe` children and multi-GB memory growth in the VS Code companion; one half is fixed by Qwen-side cleanup, the other is currently blocked by the pinned node-pty dependency ([#11303](https://github.com/QwenLM/qwen-code/issues/11303), [#11352](https://github.com/QwenLM/qwen-code/issues/11352)).
- **Permission error wording actively misleads models.** Pattern-based denials cause models to abandon tools entirely, making a UX/messaging issue into a behavioral correctness issue ([#11405](https://github.com/QwenLM/qwen-code/issues/11405)).
- **SDK release lag and CI variability frustrate downstream consumers.** The request to publish managed-memory fixes was tracked as [#11022](https://github.com/QwenLM/qwen-code/issues/11022), while the SDK docker E2E environment is still producing inconsistent failures ([#11394](https://github.com/QwenLM/qwen-code/issues/11394)).
- **Daemon process identity is not always trustworthy.** Recycled PID handling ([#10685](https://github.com/QwenLM/qwen-code/issues/10685)) and stale ECS runner fleets ([#11403](https://github.com/QwenLM/qwen-code/issues/11403)) show that long-running infrastructure still needs robust liveness checks.
- **Main-branch CI is noisy.** Multiple auto-filed bot issues track failed lint/E2E runs caused by fork pressure, artifact upload hiccups, and subprocess-heavy tests, indicating the CI suite is under sustained load.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*