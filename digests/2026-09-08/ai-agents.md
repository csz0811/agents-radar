# OpenClaw 生态日报 2026-09-08

> Issues: 480 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-07 22:45 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw Project Digest — 2026-09-08

## 1. Today’s Overview

OpenClaw activity is very high: 480 issues and 500 PRs were updated in the last 24 hours, with 241 issues and 236 PRs closing/merging. No new release was cut in this window, so the project is in a consolidation-and-bugfix phase around the current 2026.8.x/2026.9.x line. The most active discussion clusters are core runtime reliability problems: transcript/session-state stalls, SQLite contention, child-process leaks, and channel/multi-agent regressions. Maintainers are actively labeling and triaging issues, but a large share of top issues still carry `clawsweeper:no-new-fix-pr` or `needs-maintainer-review`, indicating a substantial unresolved backlog.

## 2. Releases

No new releases were published in the observed 24-hour window.

## 3. Project Progress

No major feature merge appeared in the top PR set, but there was steady maintainer-driven cleanup and targeted fixes. Seeing the 236 merged/closed PRs, representative examples include:

- [#141618](https://github.com/openclaw/openclaw/pull/141618) — `fix(status): report missing skill requirements`; closes #141606.
- [#141619](https://github.com/openclaw/openclaw/pull/141619) — `fix(state): distinguish slow database validation stages`, improving diagnosis of slow agent-database opens.
- [#141623](https://github.com/openclaw/openclaw/pull/141623) — refactors provider HTTP error normalization to reduce duplicate parsing complexity.
- [#141601](https://github.com/openclaw/openclaw/pull/141601) — `fix(telegram): keep successful album recovery quiet`, fixing noisy error logs after photo-limit recovery.
- [#141311](https://github.com/openclaw/openclaw/pull/141311) — `fix(ui): avoid broken characters in download filenames` with UTF-16-safe truncation.
- [#141622](https://github.com/openclaw/openclaw/pull/141622) — reuses Discord allowlist fixtures in test coverage.
- [#141624](https://github.com/openclaw/openclaw/pull/141624) — preserves unavailable/corrupt plugin update coverage in release tests.
- [#137587](https://github.com/openclaw/openclaw/pull/137587) — isolates the macOS log locator test directory to avoid shared `/tmp` race conditions.

High-value feature/repair PRs are also gathering maintainer review, including:

- [#141562](https://github.com/openclaw/openclaw/pull/141562) — recovery from stale update runs without stopping healthy gateways.
- [#140579](https://github.com/openclaw/openclaw/pull/140579) — preserving authored settings through updates and setup.
- [#140339](https://github.com/openclaw/openclaw/pull/140339) — update checkpoints and interrupted-update recovery.
- [#141628](https://github.com/openclaw/openclaw/pull/141628) — retain `TOOLS.md` as an optional workspace file.

## 4. Community Hot Topics

The most commented and reacted issues reveal a clear focus on reliability under real-world load and channel/multi-agent edge cases:

- [#135111](https://github.com/openclaw/openclaw/issues/135111) — 17 comments  
  Intermittent `Provider completed tool call with malformed JSON arguments` regressed after v2026.8.1 with Claude Sonnet 5. This is actively discussed because it is not tied to a single tool/file, making it hard to reproduce.

- [#115908](https://github.com/openclaw/openclaw/issues/115908) — 16 comments  
  Session transcript projection can livelock under sustained writes, blocking the Node event loop and all channel transports.

- [#97616](https://github.com/openclaw/openclaw/issues/97616) — 15 comments, 1 👍  
  Hook/tool child processes are left unreaped, accumulating zombies and degrading runtime health.

- [#126360](https://github.com/openclaw/openclaw/issues/126360) — 15 comments  
  `AgentSelectionRequiredError` floods logs under explicit multi-agent ownership because logbook, Control UI RPCs, and system-agent turns lack `agentId` targets.

- [#79077](https://github.com/openclaw/openclaw/issues/79077) — 15 comments, 8 👍  
  Telegram guest-bot and bot-to-bot support request. It has the strongest positive reaction among recent issues, suggesting real community demand for Telegram platform parity.

- [#43367](https://github.com/openclaw/openclaw/issues/43367) — 14 comments, 1 👍  
  Multi-agent orchestration remains unreliable: concurrent `agents add` overwrites config, session-lock failures, and detached child work.

- [#74586](https://github.com/openclaw/openclaw/issues/74586) — 14 comments, 3 👍  
  AM embedded runs abort `memory_search` tool calls and classify them as timeouts even after the model completed.

The underlying need across these threads is core stability: event-loop health, session-state correctness, process lifecycle hygiene, multi-agent ownership, and channel-specific delivery guarantees.

## 5. Bugs & Stability

Severity is high overall, with several P0/P1 issues active in the window.

P0 / release-blocker-level:

- [#140908](https://github.com/openclaw/openclaw/issues/140908) — P0, open  
  `doctor --fix` and `gateway status --deep` fail with EACCES under `systemctl --user is-enabled` when run via a systemd user service account. This blocks all post-upgrade migrations. No fix PR is visible yet.

- [#140620](https://github.com/openclaw/openclaw/issues/140620) — P0, open  
  In-place upgrade 2026.7.1-2 → 2026.9.2 imports only 27/~1,500 sessions during transcript reconciliation, then stalls. Pre-upgrade sessions become unfindable.

- [#140497](https://github.com/openclaw/openclaw/issues/140497) — P0, closed  
  Discord setup can accept an application ID as a bot token, mark the channel configured, and never start with `lastError=null`.

- [#138965](https://github.com/openclaw/openclaw/issues/138965) — P0, closed  
  Interrupted transcript rewrite can make stale history the active conversation.

P1 regressions/instability:

- [#140971](https://github.com/openclaw/openclaw/issues/140971) — P1, open  
  All Feishu plugin tools are silently dropped in message-driven runs; host restriction blocks the whole plugin entry. Regression between 2026.7.1-2 and 2026.8.1.

- [#136183](https://github.com/openclaw/openclaw/issues/136183) — P1, open  
  Command executor hangs spawning `ssh` — SIGTERM while waiting for server banner; regression persists in 2026.8.2.

- [#137927](https://github.com/openclaw/openclaw/issues/137927) — P1, open  
  Internal context block leaks into visible Telegram message text, a security/UX issue.

- [#101793](https://github.com/openclaw/openclaw/issues/101793) — P1, open  
  Assistant text preceding a tool call in the same turn is silently dropped on the Signal channel.

- [#121232](https://github.com/openclaw/openclaw/issues/121232) — P1, open  
  `memory-core` dreaming ranker nominates candidates the applier always rejects; nightly reports show `Ranked N, Promoted 0`.

Some notable P1 issues have no visible fix PR, while a few are being addressed through linked PRs — for example the update/status stale-run problem has an open fix in [#141562](https://github.com/openclaw/openclaw/pull/141562).

## 6. Feature Requests & Roadmap Signals

The highest-signal feature requests in the dataset are mostly about channel support, context/memory control, and multi-agent ergonomics:

- [#79077](https://github.com/openclaw/openclaw/issues/79077) — Telegram guest-bot and bot-to-bot communication. Strongly upvoted; likely to return for a platform-parity roadmap.
- [#51441](https://github.com/openclaw/openclaw/issues/51441) — Expose the resolved backend model in `session_status` and agent runtime. Useful for LiteLLM/proxy users.
- [#42276](https://github.com/openclaw/openclaw/issues/42276) — Reasoning-stream-style overwrite output in the terminal. User-facing UX improvement.
- [#45503](https://github.com/openclaw/openclaw/issues/45503) — Manual clearing of large tool results from context, rather than only TTL-based pruning.
- [#137613](https://github.com/openclaw/openclaw/issues/137613) — Enable pre-compaction memory flush on CLI backends; surfaced as a correctness/context-loss issue.
- [#141472](https://github.com/openclaw/openclaw/issues/141472) — Make Workboard card notes/comments clickable for URLs and Markdown links.
- [#126781](https://github.com/openclaw/openclaw/issues/126781) — Detached managed Lobster runs after tool return, though much of this is now covered by `/loop` and TaskFlow.

Open PRs that may land in the next release include config-preservation ([#140579](https://github.com/openclaw/openclaw/pull/140579)), interrupted-update checkpoints ([#140339](https://github.com/openclaw/openclaw/pull/140339)), `TOOLS.md` retention ([#141628](https://github.com/openclaw/openclaw/pull/141628)), and exposing `pause`/`resume` to the `update_goal` tool ([#131467](https://github.com/openclaw/openclaw/pull/131467)).

## 7. User Feedback Summary

User pain points in this window cluster around reliability after upgrades, silent failures, and multi-agent complexity:

- Upgrade pain is prominent. Users report broken gateway restarts, stalled transcript reconciliation, and update-history rows that never finalize.
- Silent failure modes are especially frustrating: Telegram messages dead-lettered after one failed send without retry/alert ([#125764](https://github.com/openclaw/openclaw/issues/125764)); Feishu tools disappearing from agent tool lists ([#140971](https://github.com/openclaw/openclaw/issues/140971)); Discord `/new` not resetting the session but returning “No reply was generated” ([#140535](https://github.com/openclaw/openclaw/issues/140535)).
- Multi-agent users continue to report unsafe concurrent config writes and session ownership confusion ([#43367](https://github.com/openclaw/openclaw/issues/43367), [#126360](https://github.com/openclaw/openclaw/issues/126360)).
- Telegram platform features are actively wanted, with 8 👍 on the guest-bot/bot-to-bot request.
- There is scattered positive signal in reactions to bug reports that affect many users, e.g. 5 👍 on the gateway-restart regression ([#106920](https://github.com/openclaw/openclaw/issues/106920)).

Overall sentiment is engaged but strained: contributors are filing detailed reproductions, while users are waiting on fixes for event-loop stalls, session-state corruption, and channel adapter regressions.

## 8. Backlog Watch

Several important issues remain open for weeks or months and appear stalled in maintainer review/product decisions:

- [#43367](https://github.com/openclaw/openclaw/issues/43367) — open since 2026-03-11; P1 multi-agent orchestration instability, config overwrites, session-lock failures.
- [#51441](https://github.com/openclaw/openclaw/issues/51441) — open since 2026-03-21; P2 feature to expose resolved backend model in session metadata.
- [#74586](https://github.com/openclaw/openclaw/issues/74586) — open since 2026-04-29; P2 AM embedded run aborts `memory_search`, misclassified as timeout.
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — open since 2026-06-29; P1 zombie process accumulation from hook/tool children.
- [#115908](https://github.com/openclaw/openclaw/issues/115908) — open since 2026-07-29; P1 transcript projection livelock blocking the main thread.
- [#117262](https://github.com/openclaw/openclaw/issues/117262) — open since 2026-08-01; P1 SQLite 3-writer contention causing ~33s event-loop stalls.
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — open since 2026-08-05; P1 synchronous agent persistence blocks the Gateway event loop at scale.
- [#126874](https://github.com/openclaw/openclaw/issues/126874) — open since 2026-08-20; P2 Windows CI runs only 66 of 10,979 test files.

These are the issues most likely to need maintainer attention next: they are recurring sources of performance degradation, data-loss risk, or platform reliability complaints.

---

## 横向生态对比

# 跨项目对比报告：开源个人 AI 助手与 Agent 生态系统
**数据窗口：** 2026-09-07 至 2026-09-08 · 项目：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态系统概览

开源个人 AI 助手赛道目前正围绕一种共同的架构模式收敛：一个常驻网关守护进程在聊天渠道、Agent 运行时、记忆子系统和模型提供商之间路由消息。五个主要项目在对话记录完整性、SQLite/state-db 并发、多 Agent 所有权语义和渠道投递保障上投入的工程精力，已经超过了对模型侧新功能的投入——这表明市场已经从演示 demo 能力转向追求生产级信任。第二个结构性趋势是按部署理念分化：OpenClaw、Hermes、ZeroClaw 和 IronClaw 以渠道优先的网关面向自托管专业用户与团队工作流；QwenPaw 则通过长期记忆研究和对中国市场/LLM 技术栈的深度整合来实现差异。值得注意的是，本周所有项目都表现出相同的故障特征——静默数据丢失、对话轮次重复或丢失、升级/迁移损坏——这预示着行业的下一个竞争前沿是持久且可观测的会话状态。

---

## 2. 活跃度对比

*健康评分（0–10）= 综合窗口期内观察到的更新吞吐量、关闭/合并比率、未解决问题严重程度和维护者响应速度。*

| 项目 | 有更新的 Issue（关闭） | 有更新的 PR（合并/关闭） | 窗口期内发布 | 健康评分 | 关键健康信号 |
|---|---|---|---|---|---|
| **OpenClaw** | 480（241） | 500（236） | 无（2026.8.x/9.x 版本线） | 6.0 | 吞吐量巨大，但 P0 升级阻塞仍开放（#140908、#140620），且 `needs-maintainer-review` 积压严重 |
| **Hermes Agent** | 50（8） | 50（5） | **v0.21.1 / v2026.9.7** | 7.0 | 已发补丁；关闭了安全相关问题（审批绕过、重复持久化）；集成自动化仍被阻塞（#88584） |
| **IronClaw** | 1（0） | 5（0） | 无 | 6.0 | 非常平静；零合并；WebUI 打磨 PR 在审；无可见回归 |
| **QwenPaw** | 39（16） | 48（18） | 无（v2.2.0 版本线） | 6.5 | 分诊快速、首次贡献者管道健康；核心上下文丢失问题（#7579）仍无修复 PR |
| **ZeroClaw** | 30（3） | 50（5） | 无（v0.8.5 版本线） | 6.5 | 维护者响应出色；S0/S1 持久化问题族（#10121、#9333）已被开放的 PR #10197 部分解决 |

**要点：** OpenClaw 的原始吞吐量大约比所有同类项目高一个数量级，但它的未解决 P0 数量和过期 issue 积压也最严重。Hermes 是唯一一个以可见发布节奏持续发布带标签版本的项目。

---

## 3. OpenClaw 的定位

**相对同类项目的优势**

- **规模与覆盖面：** OpenClaw 在 24 小时内更新 480 个 issue 和 500 个 PR，而第二梯队的量级为 30–50。作为指定的核心参考实现，OpenClaw 相当于生态系统的早期预警系统——会话状态、事件循环和渠道适配器的缺陷总是先在这里暴露，随后才出现在衍生项目和相邻项目中。
- **渠道广度：** 没有同类项目能比肩它的传输覆盖范围（Telegram、Discord、Signal、飞书，外加访客 bot 与 bot-to-bot 需求）。它是默认的"连接一切"网关。
- **多 Agent 成熟度：** 多 Agent 编排是一等支持，尽管并发配置写入和所有权路由仍然不稳定（#43367、#126360）。
- **第三方贡献者漏斗：** 该项目每天合并/关闭 236 个 PR——这套贡献者与评审机制目前没有竞争对手能接近。

**技术路线差异**

- OpenClaw 的运行时以 Node.js 为中心；其最严重的可靠性问题是同步执行会话记录投影和 Agent 持久化所导致的事件循环停滞（#115908、#119720）。使用其他运行时的同类项目（例如基于 Rust/Tokio 的 ZeroClaw）不会出现这类主线程阻塞。
- 稳定性工作集中在异步化改造、SQLite 争用缓解和 provider HTTP 规范化上——也就是加固网关核心，而不是扩充 Agent 能力。
- 积压清理是同类项目中最弱的：头部 issue 经常挂着 `clawsweeper:no-new-fix-pr` 或 `needs-maintainer-review`，而 P0 级升级后迁移失败（#140908、#140620）目前没有可见的修复 PR。如果这些问题再开放一个周期，将削弱其参考实现地位。

---

## 4. 共同技术重点领域

多个项目独立涌现出的需求：

| 重点领域 | 涉及项目 | 具体证据 |
|---|---|---|
| **对话记录与会话状态完整性** | 全部 | OpenClaw #115908（投影活锁）、Hermes #104653（重复持久化）、QwenPaw #7579（助手回复从上下文中丢失）、ZeroClaw #10121/#9333/#10673（部分/失败轮次消失） |
| **SQLite/state-db 并发与锁安全** | OpenClaw、Hermes、QwenPaw | OpenClaw #117262（3 个写入者造成的停滞）、Hermes #102589（raw open 丢失 POSIX 锁）+ fail-closed 的 PR #105101、QwenPaw 协调器 `_drain()` 吞掉异常 |
| **任务生命周期序列化** | OpenClaw、QwenPaw、ZeroClaw | QwenPaw #7559（返回 409 而非排队）、#7567（stop 无法停止）；ZeroClaw #10408（第二条消息触发并行运行）；OpenClaw #43367（并发 `agents add` 互相覆盖） |
| **Provider/API 规范化与自定义 provider 配置** | OpenClaw、QwenPaw、Hermes | OpenClaw #135111（畸形 tool-call JSON）；QwenPaw #7576（硬编码 32K 上下文回退）、#7587（Cloudflare 质询）；Hermes #105371/#105384（自定义 provider 超时/API-key 缺口） |
| **平台/渠道对等性** | OpenClaw、ZeroClaw、QwenPaw | Telegram 访客 bot（OpenClaw #79077）、Telegram 语音/STT（ZeroClaw #10688/#10689）、飞书工具被丢弃（OpenClaw #140971）、Discord 设置校验（OpenClaw #140497） |
| **审批门禁与安全扫描器正确性** | Hermes、ZeroClaw、QwenPaw | Hermes #104308（approvals.deny 绕过）、#39609（被阻塞的 Kanban 仍被自动提升）、#92478（扫描器误报）；ZeroClaw #10606（健康端点脱敏） |
| **升级与迁移可靠性** | OpenClaw、Hermes、QwenPaw | OpenClaw #140908/#140620；Hermes #105228（Desktop 更新后 profile 报错）；QwenPaw v2.2.0 回归潮（路径输入、空闲超时、上下文回退） |
| **Prompt 缓存经济性与成本透明度** | ZeroClaw、OpenClaw | ZeroClaw 缓存断点问题族（#10660–#10702）；OpenClaw #137613（压缩前内存刷新） |

**最明确的跨项目需求：** *对话运行必须可序列化、可持久化且崩溃安全*——不能出现重复回复、不能丢失已流式输出的进度、不能静默吞掉工具异常。每个项目都在积极为此投入工程力量。

---

## 5. 差异化分析

| 项目 | 目标用户 | 核心价值主张 | 技术/架构特征 | 阶段 |
|---|---|---|---|---|
| **OpenClaw** | 自托管用户、以渠道为中心的专业用户、多 Agent 部署 | 广播式渠道网关 + Agent 运行时，生态规模最大 | Node.js 网关、插件适配器、会话记录投影、大量异步化改造 | 整合收敛期（2026.9.x） |
| **Hermes Agent** | 需要治理能力的团队；Desktop/TUI 用户 | 安全优先的 Agent 运维：审批、门禁、扫描器、集群 profile、cron/Kanban | 多 profile 网关、Desktop 应用、带 POSIX 锁的 state-db、安全扫描器流水线 | 按发布节奏稳定推进（v0.21.x） |
| **IronClaw** | Slack/团队助手用户 | 共享渠道上的精致助手体验；WebUI 命令 UX | OpenAI 兼容接口面、assistant/共享渠道适配器、基准驱动的质量跟踪（每日故障分类） | 静默维护期 |
| **QwenPaw** | 记忆密集型 Agent 构建者；中国市场 LLM/提供商 | 长期记忆研究（ADBPG、PowerContext、ReMe、OpenViking），移动端/控制台 UX | 基于 Python（Agentscope 血统）、记忆后端插件化、MCP 工具链、Console 测试投入大 | 扩张期（v2.2.0，`main` 上的记忆重构） |
| **ZeroClaw** | 运行 Code/ACP 与 CLI 内嵌 Agent 会话的开发者 | 可靠的 Code/ACP 会话语义、prompt 缓存正确性、底层运行时纪律 | Rust/Tokio 运行时（有栈溢出和 worker 中止报告）、渠道 STT/TTS、ZeroCode UI、缓存断点 | 1.0 前加固期（v0.8.5） |

**架构总结：** OpenClaw 胜在广度；QwenPaw 胜在记忆深度；ZeroClaw 胜在底层会话纪律与缓存成本控制；Hermes 胜在治理能力；IronClaw 占据精致但偏窄的 Slack/WebUI 细分市场。

---

## 6. 社区动能与成熟度

**第一梯队——高速度、高负荷（OpenClaw）。** 每天合并/关闭 236 个 PR，贡献者吞吐量无可匹敌；但开放的高严重性问题和 `needs-maintainer-review` 条目的数量表明，评审流水线已接近满载。风险在于：P0 升级阻塞问题在多个补丁版本线上持续存在。

**第二梯队——快速迭代、信号健康（QwenPaw、ZeroClaw）。** QwenPaw 正在吸收大型架构 PR（记忆重构 #7561、CI 发布守护），同时迎来一波首次贡献者（BiDi 渲染、Computer Use 重启、OpenViking 记忆后端）——这是本数据集中最强劲的积极贡献者趋势。ZeroClaw 展现出最好的维护者响应行为：当天关闭、维护者主动将 master 合入贡献者分支、对新 issue 进行详细的严重性/风险标注。两者目前都被关键的数据完整性缺陷所阻塞，这些修复必须在下一次发布前落地。

**第三梯队——有节奏地稳定推进（Hermes）。** Hermes 发布了补丁版本，关闭了有实际意义的状态与审批门禁缺陷，并正在有条不紊地加固 SQLite 和自定义 provider 路径。其最明显的拖累来自内部：Nous-to-Enterkey 自动化阻塞（#88584）已有 75 条评论，`model.picker_explicit_only`（#65149，已开放约 2 个月）这类范围明确的 PR 进展缓慢。

**第四梯队——静默维护（IronClaw）。** Issue 活跃度低，窗口期零 PR 合并，也无发布。并非不健康——只是一个较小的团队在打磨 WebUI。反复出现的每日基准分类 issue 更多说明这是内部质量工具，而非社区驱动开发。

---

## 7. 趋势信号

1. **对话记录完整性成为新的基准。** 所有项目的用户对上下文丢失、助手消息被丢弃和对话轮次重复的容忍度，比对模型质量缺陷的容忍度更低。预计"持久会话"将成为一个被市场宣传的差异化卖点。
2. **静默失败是 UX 的头号敌人。** 进入死信队列的 Telegram 消息、被静默丢弃的飞书工具、按了也停不下来的停止按钮，换来的是最沮丧的用户反馈。用户宁愿看到一个明确的报错，也不愿系统悄悄进入错误状态。
3. **多 Agent 确定性是前提，而不是功能特性。** 入站消息的排队语义、每个内部 RPC 上携带所有权 ID、并发配置写入的安全性，是 OpenClaw、QwenPaw 和 ZeroClaw 中正在运行真实多 Agent 部署的用户反复提出的需求。
4. **Prompt 缓存经济性正在变成成本透明度问题。** ZeroClaw 的缓存断点、TTL、裁剪迟滞和成本账本缺陷群说明，随着 Agent 上下文越来越长，用户要求掌控缓存放置位置并获得精确的成本核算。这一趋势会扩散到其他项目。
5. **自带 provider 的摩擦是部署采用的瓶颈。** 硬编码的上下文回退、缺失的超时/API-key 透传、OpenAI 兼容代理上的 Cloudflare 质询，以及云端推理模型的超时下限，都在惩罚自托管用户和中国市场用户。Provider 配置 UX 正成为一个竞争面。
6. **语音与多模态渠道预期正在上升。** WhatsApp 语音转写、Telegram TTS 边界情况，以及工具返回的图片/PDF 二进制无法通过 provider 校验，都说明渠道适配器现在必须端到端处理多模态负载。
7. **安全正在从模型护栏转向运维门禁。** approvals.deny 绕过、Kanban 自动提升、自我伪造的 steer 标记和健康端点信息泄露说明：信任必须在工作流状态机中强制执行，而不仅仅依赖 prompt。扫描器误报（把拒绝读取密钥的 skill 标记为风险）则暴露了下一个问题：安全评分要基于行为，而不是基于文本字面。
8. **社区本身也在变得 AI 辅助化。** QwenPaw 收到了 AI 生成的双语 bug 报告；IronClaw 在跑自动化每日故障分类；ZeroClaw 维护者会在 issue 到达时自动标注严重性/风险。项目维护者需要据此规划对工具链的预期。
9. **首次贡献者健康度是最好的先行指标。** QwenPaw 高质量外部 PR 的涌入与其活跃的维护者投入正相关；OpenClaw 的贡献者机器仍然强劲，但其 stale 标签积压是一个警告信号；IronClaw 接近零的外部贡献说明社区拉力有限。

**给决策者的结论：** 如果你需要渠道广度和生态杠杆，OpenClaw 仍是默认选择，但要承担升级迁移风险。如果你需要治理与审批控制，Hermes 最为成熟。如果你的工作负载是 Code/ACP 或对缓存敏感的长会话，ZeroClaw 值得重点关注——等待它的 S0 持久化修复落地即可。如果你的差异点是长期记忆，或者你服务的是中国市场模型，QwenPaw 的路线图最活跃。如果你需要一个稳定、不折腾的 Slack/WebUI 助手，IronClaw 稳定但缓慢。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-08

## 1. 今日概览

Hermes Agent 正处于积极的维护加固周期：过去 24 小时更新了 50 个 issue（42 个开启，8 个已关闭），也更新了 50 个 PR（45 个开启，5 个已合并/关闭）。9 月 7 日发布了一个补丁版本 **v2026.9.7 / v0.21.1**。当前最显著的工作集中在会话状态完整性、SQLite/state-db 安全性、cron 与看板可靠性、Desktop/TUI 回归问题，以及自定义 provider 的配置处理上。考虑到开放 PR 数量较多，且近期报告了大量 P1/P2 缺陷，项目目前似乎更优先推进稳定性和安全收尾，而非新功能。

---

## 2. 版本发布

### Hermes Agent v0.21.1（v2026.9.7）— 2026 年 9 月 7 日

- **标签：**`v2026.9.7`
- **类型：**补丁发布 / main 汇总
- **Measured commit：**`6178e9f4eed8d99f4fc550add939d58c7bed6206`
- **目的：**汇总 main 自 v0.21.0 以来的当前内容，供打标签部署和下游消费者使用。

发布说明在所给片段中没有列出明确的 breaking-change 或迁移说明。这看起来是一个携带 `main` 分支累积修复的稳定性发布；v0.21.0 用户应针对此标签验证部署。

---

## 3. 项目进展

本次快照未列出 5 个已合并/关闭的 PR，但 8 个已关闭的 issue 表明 bug 队列得到了一次有意义的清理：

- **#101147** — 封装的 venv 环境遗漏了 `hermes_state_registry`，导致 `state.db` 不可用，并使会话在静默状态下未被建立索引。*已关闭。*  
  https://github.com/NousResearch/hermes-agent/issues/101147
- **#104653** — P1：入站用户轮次被 gateway 与 agent flush 各持久化一次，导致历史记录重建时出现重复消息。*已关闭。*  
  https://github.com/NousResearch/hermes-agent/issues/104653
- **#104308** — `approvals.deny` 在文档中被描述为“不可绕过”，但可通过路径重写绕过。*已关闭。*  
  https://github.com/NousResearch/hermes-agent/issues/104308
- **#98680** — Desktop 端 keep-alive 的 transcript tick 会闪动 composer 输入框并抢走焦点。*已关闭。*  
  https://github.com/NousResearch/hermes-agent/issues/98680
- **#46152** — 当变量只存在于 `.env` 中时，`terminal.env_passthrough` 在本地后端下不生效。*已关闭。*  
  https://github.com/NousResearch/hermes-agent/issues/46152
- **#96070** — raw 会话中的异步委派完成通知被静默丢弃。*已关闭。*  
  https://github.com/NousResearch/hermes-agent/issues/96070
- **#85575** — 由 dispatcher 创建的会话所生成的看板卡片继承了临时会话的通知目标。*已关闭。*  
  https://github.com/NousResearch/hermes-agent/issues/85575
- **#57645** — macOS 上 Desktop 的应用内更新在未实际更新的情况下退出。*已关闭。*  
  https://github.com/NousResearch/hermes-agent/issues/57645

值得关注的开放 PR 也在重要领域推进修复：

- **#105101** — 对暴露于 WAL-reset 损坏风险的 SQLite `state.db` 写入者采用 fail-closed 策略。  
  https://github.com/NousResearch/hermes-agent/pull/105101
- **#105144** — 统一 CLI、工具、后台委派和 API 路径下手动 cron-run 的执行语义。  
  https://github.com/NousResearch/hermes-agent/pull/105144
- **#102411** — P0 修复：针对预持久化用户轮次进行行寻址 `api_content` 回填，解决持久化 CLI 会话中的 prompt-cache 未命中问题。  
  https://github.com/NousResearch/hermes-agent/pull/102411
- **#105380** — 修复命名自定义 provider 的配置键解析问题。  
  https://github.com/NousResearch/hermes-agent/pull/105380
- **#105392** — 在 agent 轮次结束时上报待处理的委派工作。  
  https://github.com/NousResearch/hermes-agent/pull/105392

---

## 4. 社区热门话题

最活跃的讨论集中在自动化阻塞、审批门禁完整性，以及安全扫描误报上。

- **#88584 — 自动化的 Nous 集成受阻**（75 条评论）  
  计划中的 Nous 到 Enterkey 合并因 `cron/jobs.py` 中的冲突而被阻塞，仪表盘更新器仍停留在最后经过测试的 Enterkey 版本上。这是仓库中活跃度最高的问题，也反映出持续存在的发布/集成瓶颈。  
  https://github.com/NousResearch/hermes-agent/issues/88584

- **#39609 — 使用 `--initial-status blocked` 创建的看板任务会在没有操作者（actor）的情况下自动提升为 `ready`**（12 条评论，1 👍）  
  这会绕过人工审批门禁，对于使用看板驱动 agent 工作流的团队来说，是一个重大的信任/安全隐患。  
  https://github.com/NousResearch/hermes-agent/issues/39609

- **#96532 — 允许从 fleet profile 侧栏中隐藏应用管理的 “This device” 网关**（5 条评论，2 👍）  
  仅使用远程网关的 Desktop 用户希望设备 profile 更简洁，不出现未使用的本地运行时条目。  
  https://github.com/NousResearch/hermes-agent/issues/96532

- **#92478 — `skills_guard` 会把技能自身的 denylist 标记为 `ssh_backdoor` / `aws_dir_access`**（4 条评论）  
  明确拒绝读取密钥的技能反而被当作威胁隔离。底层需求是：安全扫描器应该评估行为，而不是字符串字面量。  
  https://github.com/NousResearch/hermes-agent/issues/92478

- **#84672 — 内容扫描器会把安全文档标记为攻击**（4 条评论）  
  cron prompt 扫描器和 skills guard 的根因相同：它们惩罚的是对危险行为的准确描述，而非真正的危险行为。  
  https://github.com/NousResearch/hermes-agent/issues/84672

---

## 5. 缺陷与稳定性

过去 24 小时的缺陷报告主要集中在会话状态失败、Cron/看板状态损坏，以及 Desktop/TUI 回归上。

### 高严重度 / 高影响

- **P1 — 多路复用 gateway 使非默认 profile 无法获得 MCP 服务器**（#105396）  
  scope 标记与按名称键控的发现机制绑定；在非默认 profile 上执行 `/reload-mcp` 会报告 “No MCP servers connected.”。  
  https://github.com/NousResearch/hermes-agent/issues/105396

- **P1 — Cron/lifecycle_guard 直接打开 `state.db`，导致 gateway 的 POSIX 锁丢失 → WAL 脑裂**（#102589）  
  一条提到 state-db 路径的终端命令可以从 gateway 进程内部关闭 gateway 的锁。这是严重的数据完整性风险。  
  https://github.com/NousResearch/hermes-agent/issues/102589

- **P1 — 更新 Desktop 后，默认 profile 中的新会话和既有会话均报错**（#105228）  
  仅在默认 profile 中出现 “Profile '.hermes' does not exist” 错误；其他 profile 不受影响。  
  https://github.com/NousResearch/hermes-agent/issues/105228

- **P1 — 入站用户轮次被持久化两次**（#104653，已关闭）  
  其中一行有 `platform_message_id`，另一行为 NULL；两行都保持 active，因此模型会看到重复的用户消息。  
  https://github.com/NousResearch/hermes-agent/issues/104653

### 安全与审批完整性缺陷

- **#104308 — `approvals.deny` 可通过路径重写绕过**（*已关闭*，但仍具安全相关性）  
  https://github.com/NousResearch/hermes-agent/issues/104308
- **#81828 — 模型可以自行伪造 steer-marker**，由此打开 prompt injection 通道。  
  https://github.com/NousResearch/hermes-agent/issues/81828
- **#39609 — `blocked` 状态的看板任务自动提升为 `ready`，且没有记录操作者**，从而绕过人工审批。  
  https://github.com/NousResearch/hermes-agent/issues/39609

### 配置 / Provider 缺陷

- **#105371 — 命名自定义 provider 会忽略 `providers.<name>.timeout` 设置**，因为运行时查找使用的是 `providers["custom"]`。修复见 PR #105380。  
  https://github.com/NousResearch/hermes-agent/issues/105371  
  https://github.com/NousResearch/hermes-agent/pull/105380
- **#105384 — 自定义 provider 的 API key 不会转发到 endpoint 探测**（修复 PR 已开启）。  
  https://github.com/NousResearch/hermes-agent/pull/105384
- **#104402 — Reasoning 模型的 stale-timeout 下限会抑制 local-endpoint 的 disarm**，损害自托管模型上的长 prefill 场景。  
  https://github.com/NousResearch/hermes-agent/issues/104402
- **#105367 — 内置的 Hindsight provider 每次 daemon 启动时都会重写 `profiles/hermes.env`**，清空用户设置的环境变量。  
  https://github.com/NousResearch/hermes-agent/issues/105367

### Desktop / TUI 回归

- **#105186 — TUI 网关崩溃：`_session_info` 中出现 `Profile 'hermes' does not exist`**  
  https://github.com/NousResearch/hermes-agent/issues/105186
- **#98680 — Desktop keep-alive tick 会闪动 composer 并抢走焦点**（已关闭）  
  https://github.com/NousResearch/hermes-agent/issues/98680
- **#57645 — macOS 上 Desktop 的应用内更新直接退出，未真正安装**（已关闭）  
  https://github.com/NousResearch/hermes-agent/issues/57645

### 进行中的相关修复 PR

- **#105101** — 对易受 WAL-reset 损坏影响的 SQLite `state.db` 写入者采用 fail-closed。  
  https://github.com/NousResearch/hermes-agent/pull/105101
- **#102411** — 针对预持久化用户轮次的 P0 prompt-cache/回填修复。  
  https://github.com/NousResearch/hermes-agent/pull/102411
- **#105403** — 允许延迟 Codex `turn/start` 确认，而不是在 10 秒后结束对话。  
  https://github.com/NousResearch/hermes-agent/pull/105403
- **#105144** — 统一手动 cron-run 执行语义。  
  https://github.com/NousResearch/hermes-agent/pull/105144

---

## 6. 功能请求与路线图信号

多个功能请求指向更好的**配置控制**、**自托管 provider 支持**，以及**更安全的多 profile Desktop/gateway 行为**。

- **#96532 — 使用远程网关时隐藏应用管理的 “This device” 网关**  
  可能与此后 Desktop fleet/profile 打磨相关。  
  https://github.com/NousResearch/hermes-agent/issues/96532

- **PR #65149 — 添加 `model.picker_explicit_only` 配置项**  
  解决一个常见的用户抱怨：`/model` 选择器会列出所有 provider，即使用户没有 API key。这是一个很适合未来 minor release 的候选功能。  
  https://github.com/NousResearch/hermes-agent/pull/65149

- **PR #96933 / 重复 issue #105235 — 让 streaming-TTS 首句阈值可配置**  
  多位用户希望 “Yes.” / “Sure.” 这类短开场句不必等待稳态批处理即可输出。重复的 issue 说明这一需求真实存在。  
  https://github.com/NousResearch/hermes-agent/pull/96933  
  https://github.com/NousResearch/hermes-agent/issues/105235

- **PR #94266 — Hermes Collective Wisdom Agent V1**  
  这是一个大型功能 PR，围绕社区驱动的 skill/wisdom 贡献与安装展开。这是一个重要的路线图信号，表明项目正走向插件/生态层。  
  https://github.com/NousResearch/hermes-agent/pull/94266

- **PR #104038 — 在投递流式响应前设置闸门**  
  在 agent 输出与平台投递之间提供一个可选的投递前强制边界，可能面向企业/安全场景。  
  https://github.com/NousResearch/hermes-agent/pull/104038

- **PR #104562 — 让 memory-prefetch 超时时间可配置，并保留迟到结果**  
  提升对超出硬超时的托管/memory provider 的容错能力。  
  https://github.com/NousResearch/hermes-agent/pull/104562

- **PR #105221 — 添加只读 cron 执行回执**  
  引入一个经过身份认证、不含内容的 cron 执行回执端点，供外部观察者使用。  
  https://github.com/NousResearch/hermes-agent/pull/105221

---

## 7. 用户反馈摘要

这一时期的用户反馈主要集中在**稳定性、安全性和配置摩擦**上。

- **审批与安全信任是反复出现的痛点。**  
  用户担心审批绕过（如 #39609、#104308）和 prompt injection 攻击面（#81828）。这些问题更多关乎对自主运行的信任，而非简单的便利性。

- **安全扫描器正在产生误报，惩罚了良性行为者。**  
  明确拒绝读取密钥的技能被标记为后门/凭据访问风险（#92478）。安全文档被内容扫描器判为攻击（#84672）。这很可能会让安全意识强的用户和技能作者感到困扰。

- **自托管和自定义 provider 用户正在遭遇配置缺口。**  
  命名自定义 provider 会忽略超时配置（#105371），endpoint 探测中缺少自定义 provider 的 key（#105384），自托管本地端点还继承了云端 reasoning 模型的 stale-timeout 下限（#104402）。这些问题表明，Hermes 的自定义 provider 方案仍需打磨。

- **会话状态类缺陷最让日常用户感到不安。**  
  入站消息重复持久化（#104653）、SQLite 锁丢失（#102589），以及特定 profile 的初始化失败（#105228、#105186），都在削弱用户对对话持久性的信心，尤其是在升级之后。

- **Desktop 用户仍在报告 UX 回归问题。**  
  抢走焦点的闪动（#98680）、macOS 应用内更新失效（#57645），以及特定 profile 下的桌面端错误（#105228），都是可见的质量问题。

总体来看，社区情绪比较复杂：用户正在积极地于复杂的多 profile/gateway/自托管环境中部署 Hermes，但他们期望更严格的护栏、更少的状态完整性缺陷，以及更清晰的配置行为。

---

## 8. 积压事项观察

以下事项重要且仍未关闭，似乎需要维护者关注：

- **#88584 — 自动化的 Nous 集成受阻**（创建于 8 月 17 日，75 条评论）  
  这是一个长期存在的流程/自动化阻塞问题，社区关注度高，且在本次快照中尚无明确解决方案。  
  https://github.com/NousResearch/hermes-agent/issues/88584

- **#39609 — `blocked` 状态看板任务会自动提升并绕过审批门禁**（创建于 6 月 5 日，已开放约 3 个月）  
  这是一个 P2 问题，对工作流安全有直接影响，且未关联已确认的修复 PR。  
  https://github.com/NousResearch/hermes-agent/issues/39609

- **#102589 — Cron/lifecycle_guard 直接打开 `state.db`，导致 gateway POSIX 锁丢失**（创建于 9 月 4 日，P1）  
  严重状态损坏风险；已有相关的 fail-closed PR（#105101），但该 issue 仍未关闭。  
  https://github.com/NousResearch/hermes-agent/issues/102589

- **#92478 — `skills_guard` 会隔离明确拒绝读取密钥的技能**（创建于 8 月 22 日）  
  这是技能安全评分中的根因缺陷。需要维护者就“匹配行为”还是“匹配提及”作出设计决策。  
  https://github.com/NousResearch/hermes-agent/issues/92478

- **#84672 — 内容扫描器将安全文档标记为攻击**（创建于 8 月 12 日）  
  与 #92478 根因类似；可能值得做一个统一的安全扫描修复。  
  https://github.com/NousResearch/hermes-agent/issues/84672

- **#81828 — 模型可以自行伪造 steer-marker**（创建于 8 月 8 日）  
  尚未解决的安全/prompt injection 问题，目前没有明显修复方案。  
  https://github.com/NousResearch/hermes-agent/issues/81828

- **#90451 — 插件安装器拒绝 `manifest_version: 2`，尽管加载器已支持**（创建于 8 月 20 日）  
  安装器与加载器不一致，导致 v2 插件无法安装。  
  https://github.com/NousResearch/hermes-agent/issues/90451

- **PR #65149 — `model.picker_explicit_only` 配置项**（创建于 7 月 15 日）  
  已开放近两个月；这是一个范围清晰的 UX/配置改进，但维护者尚未推进。  
  https://github.com/NousResearch/hermes-agent/pull/65149

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目简报 — 2026-09-08

## 今日概览

过去 24 小时活动量为低到中等：1 个未关闭 issue 和 5 个未合并 PR 有更新；没有 PR 被合并/关闭，也没有发布任何版本。当前焦点明显集中在 WebUI 命令结果优化和斜杠命令可用性上，另有一个未合并 PR 涉及 assistant/共享频道行为。所有 PR 仍处于未合并状态，说明项目在积极迭代，但此窗口内没有代码落地。基准测试失败跟踪也在继续，新增了一个每日失败分类 issue。

## 版本发布

此期间没有发布新版本。

## 项目进展

过去 24 小时内没有 PR 被合并或关闭。

有推进或仍在评审中的活跃未合并 PR：

- [#8076 fix(assistant): 区分断开连接的共享频道](https://github.com/nearai/ironclaw/pull/8076)  
  将已配对用户断开连接的共享频道与未配对账户区分开，添加频道特定的引导提示，并使拒绝分类在产品、适配器和 OpenAI 兼容接口之间保持一致。

- [#8071 fix(webui): 保持命令结果卡片高度](https://github.com/nearai/ironclaw/pull/8071)  
  防止命令结果卡片、内联命令提示和拒绝结果在会话记录中被压缩；滚动仍由外层消息视口负责。

- [#8070 fix(webui): 对齐斜杠命令元数据](https://github.com/nearai/ironclaw/pull/8070)  
  将斜杠命令行切换为一致的响应式网格，改善桌面端对齐，并处理窄屏下的堆叠。

- [#8069 fix(webui): 为命令结果卡片添加关闭操作](https://github.com/nearai/ironclaw/pull/8069)  
  为成功、命令列表、回退和拒绝命令结果添加关闭功能，同时保留持久聊天消息。

- [#8068 fix(webui): 保持当前斜杠命令可见](https://github.com/nearai/ironclaw/pull/8068)  
  确保选中的斜杠命令在键盘和指针导航期间保持可见，并提供回归测试覆盖。

## 社区热门话题

此窗口内 issue/PR 上没有记录到评论或表态计数，因此没有可见的社区讨论可供分析。最近更新的条目是每日失败分类 issue [#8081](https://github.com/nearai/ironclaw/issues/8081) 以及上面的 5 个未合并 PR。

WebUI PR 的扎堆出现表明维护者高度聚焦于命令结果可用性：防止布局塌陷、添加关闭操作、改进斜杠命令导航。这些更可能是对内部 UX 测试或先前 bug 报告的响应，而不是本快照中用户讨论产生的反馈。

## Bug 与稳定性

没有新合并的 bug 修复。按可能影响排序：

1. **[#8081 每日 ironclaw 失败分类 — 2026-09-07](https://github.com/nearai/ironclaw/issues/8081)**  
   报告 `officeqa` 套件中有 42 个未通过用例，摘录中将其描述为「绝大多数是真正的模型质量数值错误」。这看起来是基准/模型质量信号，而非已确认的 IronClaw 回归问题；但它仍是唯一未关闭的 issue，且尚无关联的修复 PR。

2. **[#8076 fix(assistant): 区分断开连接的共享频道](https://github.com/nearai/ironclaw/pull/8076)**  
   处理一个功能性的 assistant/适配器问题：断开连接的共享频道可能被误分类为未配对账户。修复尚未合并。

3. **WebUI 可用性 bug/限制（均有未合并的修复 PR）**  
   - [#8071](https://github.com/nearai/ironclaw/pull/8071)：命令结果卡片高度塌陷  
   - [#8069](https://github.com/nearai/ironclaw/pull/8069)：命令结果缺少关闭操作  
   - [#8068](https://github.com/nearai/ironclaw/pull/8068)：选中的斜杠命令可能超出可见菜单区域  
   - [#8070](https://github.com/nearai/ironclaw/pull/8070)：斜杠命令元数据对齐不一致

## 功能请求与路线图信号

issue 数据中没有显式的用户功能请求。不过，未合并的 PR 暗示了可能的路线图方向：

- WebUI 中的临时/可关闭命令结果（#8069）
- 改进斜杠命令菜单的可用性与布局稳定性（#8068、#8070、#8071）
- assistant/Slack 界面中更完善的共享频道断开处理（#8076）

如果这些 PR 通过评审，下一个 IronClaw 版本很可能会包含一批 WebUI 命令结果优化，以及共享频道 assistant 改进。

## 用户反馈摘要

本快照中几乎没有直接的用户反馈：没有 issue 评论、PR 评论或 👍 表态。唯一的间接信号是每日基准 issue [#8081](https://github.com/nearai/ironclaw/issues/8081)，它指出 `officeqa` 中的模型质量数值错误。无法从该数据窗口推断出满意或不满意趋势。

## 待办事项观察

本快照中未检测到长期无人回复的 issue 或长期未更新的 PR。最早的未合并 PR 创建于 2026-09-04，并在 2026-09-07 有更新，说明它们仍处于积极修改/评审中。#8081 还没有任何评论，但它是 2026-09-07 才新建的；如果此类 issue 后续每天都继续出现，则可能需要维护者跟进。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目动态摘要 — 2026-09-08

## 1. 今日概览

QwenPaw（github.com/agentscope-ai/QwenPaw）在过去 24 小时内活动密集，共有 39 个 Issue 和 48 个 Pull Request 被更新。其中 16 个 issue 和 18 个 PR 已离开开启状态，说明团队在积极进行分流（triage）和评审，而不仅仅是在接收报告。该时间窗口内没有发布新版本，因此项目仍运行在 v2.2.0 这条版本线上，同时一批回归与健壮性修复不断累积在 `main` 上。从逐日活动看，本期主题集中在三个方面：**记忆／对话上下文损坏**、**provider API 不兼容**，以及 **v2.2.0 前后引入的控制台／桌面端 UX 回归**。一个明显的积极信号是，本周有不少高质量的首次贡献者 PR 落地（BiDi 渲染修复、Computer Use helper 重启、OpenViking 记忆后端、协调器异常日志），说明贡献者社区健康并且正在持续壮大。

## 2. 发布

**无。** 数据集显示该窗口内新发布数为 0，也没有任何 RC 或 beta 构建产物可见。因此最新发布版本仍为 v2.2.0，目前仍有一些未关闭的 bug 是针对该版本上报的（见“Bug 与稳定性”一节）。

## 3. 项目进展

以下 PR 在本窗口内离开了开启状态（已关闭/已合并）。可见的已关闭条目主要集中在记忆架构、provider 正确性和前端加固方面：

- **[PR #7561 — refactor(memory): 统一自动记忆生命周期与动作](https://github.com/agentscope-ai/QwenPaw/pull/7561)** — 一次有意的破坏性（breaking）重构，涉及 memory-manager 契约，将自动记忆采集、召回、后台执行与后端动作统一起来。这是架构层面的一大步，很可能为下一个小版本铺路。
- **[PR #6936 — fix(providers): 强制转换模型以 JSON 数字形式输出的字符串类型工具参数](https://github.com/agentscope-ai/QwenPaw/pull/6936)** — 修复了长期被报告的 MCP bug：模型对 schema 中声明为字符串的字段输出了未加引号的数字/布尔值（见 issue #6839）。这为中国市场真实的券商/数据类 MCP 工具扫清了障碍。
- **[PR #7499 — fix(console): 用 Spark 折线系列统一导航与主题切换图标](https://github.com/agentscope-ai/QwenPaw/pull/7499)** — 控制台侧边栏的视觉一致性修复。
- **[PR #7530 — test(console): 扩充控制台单元测试（+245 个用例，语句覆盖率 +5.02 个百分点）](https://github.com/agentscope-ai/QwenPaw/pull/7530)** — 前端覆盖率专项的第四次冲刺；很好地说明了团队在控制台上持续投入质量。
- **[PR #7603 — ci: 发布期间冻结默认分支合并](https://github.com/agentscope-ai/QwenPaw/pull/7603)** — 流程/CI 护栏，用于防止 v2.2.0-beta.4 那次“发版中途合入 PR”的事故重演。

**仍在进行中的重点（开启状态）：** [PR #7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) 将 ADBPG 和 PowerContext 从核心中抽取出来，从而完成记忆后端插件化迁移；[PR #7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) 让聊天提交改走队列（直接针对 409 bug，即 issue #7559）；[PR #7521](https://github.com/agentscope-ai/QwenPaw/pull/7521) 防止长时间运行的 agent 重放已经被消费过的思考内容。

## 4. 社区热点讨论

最活跃的讨论反映出真实的部署痛点，而不是猜测性问题。

- **[Issue #7505 — LAN LLM 服务器 “client disconnect” 重试/超时循环（已关闭，12 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/7505)** — 本窗口内评论数最高的 issue。一位用户让 QwenPaw 连接局域网内的 LM Studio 服务器（qwen3.8-flash-next-q3），反复出现 `client disconnect` 错误并最终超时。该问题已经得到确认并关闭，但它提醒我们：LAN/自托管用户是一个重要且敏感的群体。
- **[Issue #7576 — RetryChatModel 硬编码 32768 上下文回退（开启，5 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/7576)** — 已在 v2.1.0→v2.2.0 上确认：对于上下文设置不同的模型，硬编码的 `context_size=32768` 回退值会在 token 数超过约 31,130 时触发 `CONTEXT_UNFIT` 错误。这个问题尤为显眼，因为它会让所有未显式声明上下文大小的 model provider 被静默错误配置。
- **[Issue #7579 / #7584 — 模型回复从上下文中丢失，导致 AI 行为循环（开启 / 按重复关闭，5+2 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/7579)** — 用户报告：assistant 的回复会被持久化，却**没有包含在后续请求中**——模型“看不到自己刚说过的话”，导致反复的工具调用循环和不稳定行为。重复提交的 #7584 被明确标记为 `[严重⚠️⚠️]`（“非常严重”）。重复 issue 被快速关闭，说明维护者已经注意到该问题，**但目前还看不到修复 PR**。
- **[Issue #7559 — 任务执行中发送消息报 409（开启，5 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/7559)** — 一个反复出现的 UX 冲突：任务执行时，UI 报 `409 {"detail":"A task is already..."}`，而不是把用户的新消息排队。用户期望队列语义，这完全合理。
- **[Issue #7597 — 工具返回的图片/PDF 二进制以裸 base64 形式导致 400（开启，4 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/7597)** — 影响 `send_file_to_user`/`view_image` 这类工具；以 `"type":"data"` 发送的载荷会被拒绝，并提示 “file must have a file_id or file_data”。值得注意的是，这个 issue 本身由 AI 生成，并且采用双语撰写——这是该社区 AI 辅助上报 issue 的一个有趣信号。
- **[Issue #7587 — 使用 WUSRouter 的 OpenAI 兼容 endpoint 时遇到 Cloudflare 403（开启，4 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/7587)** — 某个社区路由器/代理 provider 在拉取模型列表时返回 Cloudflare 验证挑战。这进一步印证了非标准 OpenAI 兼容网关带来的兼容性摩擦。

## 5. Bug 与稳定性

大致按严重程度和用户影响排序：

**严重 / 高**

1. **assistant 回复被静默地从上下文中丢弃（[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)，重复问题 [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584)）** — agent 会重复执行工具调用、遗忘最近的对话轮次，并出现不稳定行为。这直接打击了核心价值主张（长程 agent 记忆），并削弱用户信任。目前尚无修复 PR。
2. **Heartbeat cron 反馈循环——重复消息堆积（[#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589)）** — 已在 2.0.1 和当前 `main` 上验证；agent 约 2 小时无响应。报告者替维护者完成了验证工作；这个问题应尽快处理。
3. **停止控件并不能真正停止（[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)）** — UI 显示任务已停止，但刷新后任务仍在执行错误指令。结合 #7559 和 [#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594)（任务输出重复出现 3 次）来看，任务生命周期的状态管理需要加固。

**中等**

4. **硬编码的 32768 上下文大小回退（[#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576)）** — 在所有 model provider 中系统性地造成 `CONTEXT_UNFIT` 错误配置；已在已发布的所有 v2.1.0–v2.2.0 版本中确认。
5. **PDF DataBlock 会让纯文本 endpoint 的整个会话被“污染”（[#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617)）** — 新上报：一旦历史中包含 PDF 工具结果，即使只是一句简单的 “hi”，对智谱 GLM 的请求也会以 HTTP 400（错误码 1210）失败。
6. **难以诊断的工具失败：`_coordinator.py` 的 `_drain()` 中异常被吞掉（[#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572)）** — 修复已存在于开启状态的 [PR #7578](https://github.com/agentscope-ai/QwenPaw/pull/7578)，补上了 `logger.exception()`。
7. **v2.2.0 中流式空闲超时被硬编码、不可配置（[#7604](https://github.com/agentscope-ai/QwenPaw/issues/7604)，已关闭）** — 30 秒的空闲看门狗会导致慢速模型超时，而且在桌面版构建中无法通过 WebUI/envs.json 配置。
8. **工具返回的二进制以裸 base64 形式传出（[#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597)）** — 会在某些 provider 上阻塞图片/PDF 发送类工具；目前没有修复。
9. **deepseek-v4-pro 等模型上的工具调用污染（[#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513)）** — 模型输出与 QwenPaw 的工具调用渲染混在一起；报告者指出其他 agent 框架没有此现象。

**低 / 小众**

10. **Telegram 的 Markdown 表格被渲染成原始 `|` / `---`（[#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585)）；Hub 本地沙箱中 CLI 命令失败（[#7612](https://github.com/agentscope-ai/QwenPaw/issues/7612)）；旧版 LAN LM Studio 断连（[#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505)，已关闭）；由来已久的 BiDi 阿拉伯语/英语渲染问题（[#2120](https://github.com/agentscope-ai/QwenPaw/issues/2120)）——目前已有修复 PR 处于开启状态（[#7611](https://github.com/agentscope-ai/QwenPaw/pull/7611)）。**

## 6. 功能请求与路线图信号

多方面的信号显示出了项目未来的方向：

- **“恢复 v2.1.0 的工作目录文本输入框”** — 有两个独立请求（[#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588)、[#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601)）在窗口内被关闭。由于期间没有发版，修复很可能已经合入 `main`；预计会在下一个 v2.2.x 补丁中发布。这是一个“自己引入回归、又根据用户反馈迅速回滚”的好例子。
- **飞书 CardKit：自动折叠流式思考卡片（[#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570)）** — 报告者已经**实现并验证了一份本地补丁**，使用 JSON 2.0 可折叠面板。考虑到 GLM-5.x 强制思考模型会生成非常长的推理文本，这个补丁很有希望被上游采纳。
- **UI 字体缩放与可点击的文件路径链接（[#4077](https://github.com/agentscope-ai/QwenPaw/issues/4077)，已关闭）** — 在本次分流处理中被关闭；可能已被开启中的 [PR #7502](https://github.com/agentscope-ai/QwenPaw/pull/7502)（侧边栏/设置页重新设计）取代。
- **记忆子系统正在积极重构和插件化** — 已关闭的 [PR #7561](https://github.com/agentscope-ai/QwenPaw/pull/7561)，加上开启中的 [PR #7616](https://github.com/agentscope-ai/QwenPaw/pull/7616)（ADBPG/PowerContext → 插件）和 [PR #7606](https://github.com/agentscope-ai/QwenPaw/pull/7606)（Auto-Dream ↔ ReMe 0.4.1.12）。长期记忆后端显然是路线图的核心；第三方 OpenViking 后端（[PR #7613](https://github.com/agentscope-ai/QwenPaw/pull/7613)）也说明生态对可扩展性抱有兴趣。
- **Agent 执行契约与 prompt 文件工作区（[PR #7526](https://github.com/agentscope-ai/QwenPaw/pull/7526)）** — 在 workspace prompt 文件之前新增了受保护的执行/澄清/授权契约；这很可能会影响 “skills” 与 agent 策略接下来的形态。
- **Skill/插件市场正在走向成熟** — 新 PR 开始暴露 skill 版本并校验声明的依赖（[#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609)）、增加插件更新检测/UI（[#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605)），以及记忆卡片中的 reranker 设置面板（[#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)，自 7 月起一直在评审中）。与此同时，[Issue #7615](https://github.com/agentscope-ai/QwenPaw/issues/7615) 将第三方插件问题引导到社区渠道——这是生态与用户支持的一个里程碑。

**对下一个小版本的预测：** 先出 v2.2.1 补丁，修复 v2.2.0 引入的回归（上下文回退、空闲超时不可配置、路径输入框被移除、通过 #7610 修复 409 队列语义），随后是基于 #7561/#7616 重构、以记忆为核心的 v2.3.0。

## 7. 用户反馈总结

中文用户群体参与度很高、发声也积极，本窗口约一半的 issue 来自该群体。最强烈的几类重复痛点：

- **“AI 遗忘”正在侵蚀信任。** Issue #7571（“总是记不住，还是会遗忘”）描述了一位插件开发者：他的 agent 反复违反 TODO 文件应该放在哪里的指令，甚至把错误代码自动部署并覆盖到源码目录。作者自己也说不清该怪模型还是 QwenPaw——这本身就是一种信任信号。其他上下文丢失的报告（#7579/#7584）使用了“严重”“请重视”等措辞。
- **对 v2.2.0 的回归非常敏感。** 用户会明确拿 v2.1.0 做对比：路径编辑是“我记得2.1.0是可以的”；目录选择器是“v2.1.0 那个设计很好啊”；“为什么砍掉这个有用的设计”。409 阻塞行为和停止按钮不一致的问题，进一步让人感觉 2.2.0 发布时打磨略有不足。
- **与竞品对比。** Issue #7513 在工具调用污染问题上明确写道“其他 AI agent 工具没有遇到这个情况”——这是 QwenPaw 需要认真对待的竞争压力。
- **规模化痛点。** Issue #7242（Docker 中运行 74 个 agent 时，仪表盘需要 6 分钟以上才能加载）表明多 agent 生产部署已经在发生，性能工作必须跟上。

积极的一面是，用户在上报之前会做足功课：先在 `main` 上验证、解包 PyInstaller 产物来确认版本、用最小示例复现，甚至会提交经过验证的本地补丁（#7570）。这是一个成熟且乐于互助的社区——但如果在 #7579/#7589 这类高严重度 bug 上迟迟不出现修复 PR，这份好感也会很快消耗殆尽。

## 8. 积压事项观察

以下 issue/PR 看起来已经停滞或关注不足，需要维护者关注：

- **[Issue #7242 — 74 个 agent 时仪表盘加载需要 6 分钟以上（自 8 月 24 日起开启，3 条评论）](https://github.com/agentscope-ai/QwenPaw/issues/7242)** — 看不到维护者的回应或修复。这是生产规模下的性能投诉，不是边角个例。
- **[Issue #2120 — 阿拉伯语/英语的 BiDi 文本渲染（自 3 月 23 日起开启）](https://github.com/agentscope-ai/QwenPaw/issues/2120)** — 这个存在四个月之久的 UI/无障碍 bug 终于有了修复 PR（[#7611](https://github.com/agentscope-ai/QwenPaw/pull/7611)）；需要评审并合入。
- **[PR #6399 — Reranker UI 配置面板（自 7 月 23 日起开启，评审中）](https://github.com/agentscope-ai/QwenPaw/pull/6399)** — 已经在评审中搁置了两个月，看不到任何进展。要么推进它，要么给出明确指引后关闭。
- **[Issue #7587 — WUSRouter 上的 Cloudflare 403（自 9 月 6 日起开启）](https://github.com/agentscope-ai/QwenPaw/issues/7587)** — 目前只有用户侧讨论的 provider 兼容性问题；维护者应明确：是否需要增加请求头控制，或提供一个 “challenge 模式”的逃生通道。
- **[Issue #7612 — Hub 沙箱中内置 CLI 命令失败（自 9 月 7 日起开启）](https://github.com/agentscope-ai/QwenPaw/issues/7612)** — 沙箱/RuntimeBoundary 冲突，连 `qwenpaw agents list` 都会受影响；这对平台叙事很重要。值得注意的是，该 issue 的作者也提交了 PR #7526，说明这是一位活跃的技术贡献者，他的报告应尽快得到官方回应。
- **[Issue #7571 — “总是记不住，还是会遗忘”：长期指令遵循问题（自 9 月 5 日起开启）](https://github.com/agentscope-ai/QwenPaw/issues/7571)** — 严格来说不算是代码 bug；可能需要使用指导或记忆持久化文档的跟进，而不是沉默对待。

---

*数据窗口：2026-09-07 当天更新的 issue 与 PR（即摘要日期 2026-09-08 前 24 小时）。数据聚合自 github.com/agentscope-ai/QwenPaw。*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-08

## 1. 今日概览

ZeroClaw 正处于高强度、高活跃度的稳定化阶段：过去 24 小时内**有 30 个 issue 和 50 个 PR 被更新**（27 个未关闭 issue、45 个未关闭 PR），但**没有发布任何新版本**——外部实际可见的最新用户版本仍是 **v0.8.5**。当前主导主题是 **Code/ACP 与 ZeroCode 会话的轮次持久化/会话记录完整性**：其中有 1 个 S0 数据丢失报告（[#10121](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)）和一批 S1“工作流受阻”的重复/衍生 issue（[#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)、[#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)、[#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673)、[#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)），它们都指向被中断的流式/持久化路径。第二个重要主题是 **Anthropic 提示词缓存正确性与成本账本准确性**：一个功能随其 PR 一起关闭（[#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660) / [#10666](https://github.com/zeroclaw-labs/zeroclaw/pull/10666)），但又有几个相关 bug 刚刚提交。维护者响应速度看起来不错——3 个 issue 已关闭，新的跟踪 issue（[#10684](https://github.com/zeroclaw-labs/zeroclaw/issues/10684)、[#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685)）批量归拢相关修复，维护者也在积极把 master 合入贡献者分支——但未关闭的 S0/S1 项数量意味着，下个版本很可能是重度 bug 修复版本。

## 2. 版本发布

**本窗口期内没有新版本发布。** 没有发布说明、破坏性变更或迁移说明需要汇报。鉴于已关闭/落地的大量修复（缓存断点、提示词预算、ACP 持久化、渠道 STT 加固），一旦大型 open PR 合并，v0.8.5 之后的补丁/次版本提升似乎很快就会到来。

## 3. 项目进展

本窗口期内有 5 个 PR 被关闭/合并；其中 3 个出现在 top-20 列表中：

- **[PR #10666 — feat(providers): place a third cache breakpoint on the previous turn's last message](https://github.com/zeroclaw-labs/zeroclaw/pull/10666)**（XL，高风险）— 关闭 [#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660)。新增第三个 `cache_control` 标记，使轮次边界处的缓存未命中回退到历史消息而非系统提示词，从而提高 Anthropic 及兼容提供商的缓存读取命中率。
- **[PR #10465 — feat(runtime): enforce compact local prompt budget](https://github.com/zeroclaw-labs/zeroclaw/pull/10465)**（M，高风险）— 内置的 `local_small` 配置档现在会选用精简的技能元数据，并将系统提示词上限设为 8,000 字符；旧的 `compact_context` 提示词则保留规范的项目指令。
- **[PR #10669 — test(channels/discord): prove STT dispatch selects the agent's provider](https://github.com/zeroclaw-labs/zeroclaw/pull/10669)**（XS，仅测试）— 补齐了 [#10624](https://github.com/zeroclaw-labs/zeroclaw/issues/10624) 中指出的回归测试缺口，锁定了按配置路由进行转写的行为。

同时关闭的还有：**[#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)**（Bedrock Nova 2 Lite `cachePoint` 禁用请求，经过 12 条评论的来回讨论后关闭）和 **[#10693](https://github.com/zeroclaw-labs/zeroclaw/issues/10693)**（ZeroCode 在显示 “Connected” 时忽略 Enter 提交——当天提交、当天关闭）。

## 4. 社区热点

- **[Issue #8720 — Disable cachePoint for Bedrock Nova 2 Lite via config?](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)** — *12 条评论（本窗口期最高），现已关闭。* 一位用户遇到了随机的 Bedrock 缓存错误，希望有一个配置级的总开关。底层需求是：无需改代码即可按提供商/按模型控制缓存——这一需求在较新的缓存标记 issue 中反复出现。
- **[Issue #10230 — Daemon startup or reload can overflow during agent initialization](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** — *6 条评论，S1。* 在守护进程运行期间应用 Quickstart 配置，会让某个 Tokio worker 因栈溢出而中止。需要复现；风险被标记为高。
- **[Issue #9333 — Failed ACP turns disappear after switching sessions](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** — *4 条评论，S1。* 发生提供商错误的轮次会在切换会话后从实时会话记录中消失；由此派生出后续子 issue [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673)。
- **[Issue #10408 — Second message during an active turn starts a parallel run → duplicate work/reply](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)** 和 **[#10121 — Partial Code/ACP turns disappear if the process exits before completion](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)** — *各有 3 条评论。* 它们共同揭示了核心需求：**会话运行必须串行化且持久可靠**（既不能出现重复回复，也不能在崩溃或预算耗尽时丢失已流式输出的进度）。

在 PR 侧，讨论最实质的内容集中在 **[#10197 — fix(acp): persist interrupted turn progress](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)**（很可能是 S0/S1 ACP 问题族的修复）、**[#9739 — feat(zerocode): multi-session panes](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)**，以及体量非常大的 **[#10611 — adaptive-thinking Claude models](https://github.com/zeroclaw-labs/zeroclaw/pull/10611)**——它横跨 providers、runtime、CLI 与 channels。

## 5. Bug 与稳定性

过去 24 小时内更新/仍然活跃的 bug，按严重程度排序：

**S0 — 数据丢失/安全风险**

- **[#10121 — Partial Code/ACP turns disappear if the process exits before completion](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)**（p1、已接受、no-stale）— 修复 PR 已打开：[#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)。

**S1 — 工作流受阻**

- **[#10230 — Daemon startup/reload stack overflow during Quickstart apply](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)**（p1、需复现）。
- **[#9333 — Failed ACP turns disappear after session switching](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)**（p1）+ **[#10673 — Persist failed ACP turns on the daemon RPC path](https://github.com/zeroclaw-labs/zeroclaw/issues/10673)**（p1，#9333 在另一条代码路径上的“剩余部分”）。
- **[#10659 — Budget-exceeded Code turn loses visible progress after session restore](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)**（p1、后续问题）。
- **[#10697 — ACP transcript drops assistant text emitted before a tool call](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)**（p1、后续问题；只有最后一次工具调用之后生成的文本会被渲染）。
- **[#10670 — heartbeat.target rejects a channel instance composite key (`<type>.<alias>`)](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)**（p2，但属 S1）。
- **[#10408 — Parallel run/duplicate reply when a second message arrives mid-turn](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)**（p1，被归为 S2 降级，但实际影响是重复工作/回复）。

**S2 — 降级行为（p1/p2）**

- **[#9940 — Turn-context tells agents to use an unresolvable cron delivery channel](https://github.com/zeroclaw-labs/zeroclaw/issues/9940)**（p1、已接受、no-stale）。
- **[#10689 — Telegram voice reply silently skipped when text starts with `[`](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)**（ElevenLabs v3 音频标签）— p2，尚无修复 PR。
- **[#10688 — WhatsApp Web voice notes are never transcribed](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)**（渠道构建时未包含 agent 的转写提供商）— p2，尚无修复 PR。
- **[#10694 — PowerShell shell tests intermittently time out on Windows CI](https://github.com/zeroclaw-labs/zeroclaw/issues/10694)**（p2）。
- **[#10674 — History trimming stops at the cap, re-trims every few turns, defeats prompt caching](https://github.com/zeroclaw-labs/zeroclaw/issues/10674)**（p1、已接受）；token 预算裁剪器中存在同样的滞后模式：[#10702](https://github.com/zeroclaw-labs/zeroclaw/issues/10702)（p3）。

**S3 与正确性/计费**

- **[#10690 — Integrations page "Configure" slugifies display name instead of family key (Z.AI → 404)](https://github.com/zeroclaw-labs/zeroclaw/issues/10690)**（p2、S3、Web 仪表盘）。
- **[#10701 — Image attachment invalidates whole history cache prefix](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)**（p2、成本倍增）。
- **[#10699 — Cost ledger prices cache writes at plain input rate, understating cache misses](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)**（p2）和 **[#10700 — Cost records carry a daemon-lifetime session id, not per-conversation](https://github.com/zeroclaw-labs/zeroclaw/issues/10700)**（p2）。
- **[#10104 — zeroclaw-hardware feature-gated tests never execute in CI](https://github.com/zeroclaw-labs/zeroclaw/issues/10104)**（p2、已接受）。
- **[#10662 — OAuth cache marker below Anthropic's cache minimum, wasting a breakpoint slot](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)**（p2、后续问题）。

## 6. 功能请求与路线图信号

- **提示词缓存成本优化（很可能进入下一个补丁）：** [#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660) 已由 [#10666](https://github.com/zeroclaw-labs/zeroclaw/pull/10666) 关闭，相邻请求正在排队：可配置的 1 小时缓存 TTL（[#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)）、修复 OAuth 前缀标记低于缓存下限（[#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)）、防止图片附件让缓存前缀整体失效（[#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)）。预计这些会打包进下一个次版本发布。
- **可靠的无人值守投递：** 跟踪 issue [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685) 明确协调了四个修复（误报发送成功、重复回复、cron 结果缺失、投递渠道错配），让运维人员能够信任 cron 输出——这是一个强烈信号，表明该方向是优先级的可靠性主题。
- **引导启动器与发布注册表：** 跟踪 issue [#10684](https://github.com/zeroclaw-labs/zeroclaw/issues/10684) 以及开放的 canonical release-target registry PR（[#10590](https://github.com/zeroclaw-labs/zeroclaw/pull/10590)）都指向 MCP 宿主驱动的安装/规划工作流。
- **ZeroCode 多客户端协作：** [#10695](https://github.com/zeroclaw-labs/zeroclaw/issues/10695)（刷新被另一客户端修改过的会话）建立在大型 multi-session panes PR [#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739) 之上。
- **安全加固：** [#10606](https://github.com/zeroclaw-labs/zeroclaw/issues/10606)（对未认证 `/health` 响应中的组件错误进行脱敏）已作为 p1/高风险被接受。
- **进行中最大的路线图项目：** [#10611 — adaptive-thinking Claude models](https://github.com/zeroclaw-labs/zeroclaw/pull/10611)（XL，涉及 Anthropic + Bedrock、channels、CLI）。考虑到其广度以及“needs-maintainer-review”状态，它看起来更像 0.9.0 级别的功能，而不是补丁。

## 7. 用户反馈摘要

- **缓存可配置性与成本信任感是最突出的痛点。** [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720) 中的 Bedrock Nova 2 Lite 用户想彻底禁用缓存；现在又有用户报告缓存 TTL 太短（[#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)）、历史裁剪破坏缓存（[#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674)）、成本账本“低估”缓存写入开销（[#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)）——也就是说，用户觉得自己无法信任页面上显示的成本。
- **Code/ACP 用户对数据丢失/重复的担忧程度很高：** 失败轮次丢失（[#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)）、退出时（[#10121](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)）或预算耗尽时（[#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)）进度丢失、工具调用前已生成的文本被丢弃（[#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)）、回复重复（[#10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)、[#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667)）。其中多个携带 `no-stale`/`follow-up` 标签，说明维护者清楚这些问题的分量。
- **语音/多模态渠道方面的期望在上升：** Telegram TTS 回复被静默跳过（[#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)）和 WhatsApp 语音消息从不转写（[#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)）都在本周期内出现——用户期望自带的 STT/TTS 提供商能在所有渠道一致生效。
- **运维可见性：** cron/投递用户无法判断无人值守任务是否真正运行了、是否到达了目的地（[#9940](https://github.com/zeroclaw-labs/zeroclaw/issues/9940)、跟踪 issue [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685)）。
- **满意度信号：** 分诊速度是加分项——新 issue 上报时就带有 severity/priority/risk 标签，快速关闭可在一个工作日内完成（[#10693](https://github.com/zeroclaw-labs/zeroclaw/issues/10693)），维护者也在积极返工贡献者的 PR，而不是直接关闭。

## 8. 积压事项观察

**需要维护者回复或处理的 issue：**

- **[#10104 — zeroclaw-hardware tests never execute in CI](https://github.com/zeroclaw-labs/zeroclaw/issues/10104)** — 自 2026-08-18 起已接受，无可见 PR。
- **[#9940 — Cron delivery channel misdirection](https://github.com/zeroclaw-labs/zeroclaw/issues/9940)** — p1、no-stale，自 2026-08-12 起已接受。
- **[#10606 — Sanitize health-response errors](https://github.com/zeroclaw-labs/zeroclaw/issues/10606)** — 自 2026-09-03 起已接受，p1/高风险，尚未关联 PR。
- **[#10230 — Daemon stack overflow during Quickstart](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** — 属 S1，但仍在等待复现（`r:needs-repro`）。

**等待维护者审查的 PR（等待时间较长）：**

- **[#9739 — ZeroCode multi-session panes](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)** — 自 2026-08-04 起 open，XL；`needs-maintainer-review`。
- **[#9410 — Default command audit logging to disabled](https://github.com/zeroclaw-labs/zeroclaw/pull/9410)** — 自 2026-07-26 起 open；与安全相关。
- **[#9678 — Harden Git shell policy arguments](https://github.com/zeroclaw-labs/zeroclaw/pull/9678)** — 自 2026-08-02 起 open；与安全相关。
- **[#10611 — Adaptive-thinking Claude models](https://github.com/zeroclaw-labs/zeroclaw/pull/10611)** — 自 2026-09-04 起 open；XL、影响面广。

**有停滞风险的 PR（需要作者操作；部分已标记 `stale-candidate`）：** [#10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214)（日志轮转，XL）、[#9326](https://github.com/zeroclaw-labs/zeroclaw/pull/9326)（Signal 的 Note to Self，XL）、[#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584)（出站授权流程，XL）、[#10034](https://github.com/zeroclaw-labs/zeroclaw/pull/10034)（provider 别名探测）、[#9283](https://github.com/zeroclaw-labs/zeroclaw/pull/9283)（web_fetch 解压——**stale-candidate**，自 07-23 起 open）、[#9399](https://github.com/zeroclaw-labs/zeroclaw/pull/9399)、[#9939](https://github.com/zeroclaw-labs/zeroclaw/pull/9939)、[#9313](https://github.com/zeroclaw-labs/zeroclaw/pull/9313)（微信同步游标）。这 8 个是拖累吞吐量的主要因素；清掉它们将显著降低 PR 数量压力。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*