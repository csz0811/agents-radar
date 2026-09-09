# OpenClaw 生态日报 2026-09-10

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-09 22:46 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-10

*本摘要基于最近 24 小时内更新的 500+ 项内容，从中抽取前 50 个 issue 与前 30 个 PR 作为样本。*

---

## 1. 今日概览

OpenClaw 仍处于高强度的稳定化与功能交付周期中：最近 24 小时内有 500 个 issue 和 500 个 PR 获得更新，其中约 40% 的 issue 已关闭（197 个），约一半的 PR 已合并/关闭（251 个）——吞吐量相当健康。今天没有发布新版本；项目似乎正在向 2026.9.3 之后的下一版本收敛，围绕 ClawHub 插件发现/安装体验的一大组连贯 PR 正等待维护者审阅。当前社区活跃反馈中有很大一部分由回归问题驱动，集中在 2026.8.1/2026.9.x 升级路径、Codex OAuth 认证、记忆/会话持久化以及多智能体编排可靠性上。值得注意的是，数个 P0/P1 回归（Windows 网关启动、Telegram 上下文泄漏、飞书插件工具丢失）已在最近 24 小时内关闭，说明分流与修复流水线运转活跃。

---

## 2. 版本发布

**新版本：0 个。** 此时间窗口内未发布任何版本，因此不涉及变更日志、破坏性变更或迁移说明。多个 issue 表明 2026.9.2/2026.9.3 是目前回归反馈的主要目标版本（例如 #143278、#142336、#141617）。

---

## 3. 项目进展

**已合并/关闭的 PR（可见样本）：** 总体有 251 个 PR 已合并/关闭。在前 30 的样本中仅有一个 PR 处于关闭状态——一项测试基础设施改进：

- [#143427 [已关闭] test: 复用已准备的 entry 以覆盖 CLI JSON 失败场景](https://github.com/openclaw/openclaw/pull/143427) — 通过复用已准备的 entry，将 CLI 冷加载测试运行时间从 79–95 秒降了下来。

**最近 24 小时值得关注的 issue 关闭**（意味着修复已落地/通过验证）：
- [#137813（P0）2026.9.1 更新后 Windows 网关无法启动 — `--task-supervisor` 静默退出且返回码为 0](https://github.com/openclaw/openclaw/issues/137813) — 已关闭。
- [#137927 内部 `<BEGIN_OPENCLAW_INTERNAL_CONTEXT>` 块泄漏到可见的 Telegram 文本中](https://github.com/openclaw/openclaw/issues/137927) — 已关闭。
- [#135111 间歇性出现 "Provider completed tool call with malformed JSON arguments"（claude-sonnet-5）](https://github.com/openclaw/openclaw/issues/135111) — 已关闭的 P1 回归，26 条评论。
- [#140971 消息驱动运行中所有飞书插件工具被静默丢弃](https://github.com/openclaw/openclaw/issues/140971) — 已关闭。
- [#141617（P0）2026.9.2 npm update 卡在 requested/running](https://github.com/openclaw/openclaw/issues/141617) — 已关闭。
- [#91352 OpenAI Codex OAuth 迁移后遗留陈旧 profile](https://github.com/openclaw/openclaw/issues/91352)、[#95121 Codex OAuth 约 28 秒延迟](https://github.com/openclaw/openclaw/issues/95121)、[#116851 SQLite 会话中 Codex 最终回复丢失](https://github.com/openclaw/openclaw/issues/116851) — 均已关闭。

**推进中的功能/PR 工作（多数为开启状态，评审中）：**

- **ClawHub 插件目录与 Control UI 相关 PR 栈**（当前主导主题，约 11 个 PR，其中多个标记为“等待维护者查看”）：统一插件发现与安装 [#142782](https://github.com/openclaw/openclaw/pull/142782)、统一已安装插件的详情标签页 [#142713](https://github.com/openclaw/openclaw/pull/142713)、插件包自有分类体系/回填 [#142710](https://github.com/openclaw/openclaw/pull/142710)、ClawHub 分类信息完善 [#142711](https://github.com/openclaw/openclaw/pull/142711)、按分类对已安装插件分组 [#142712](https://github.com/openclaw/openclaw/pull/142712)、补全插件目录 [#137659](https://github.com/openclaw/openclaw/pull/137659)、从 Control UI 安装的引导向导 [#137886](https://github.com/openclaw/openclaw/pull/137886)、本地插件联合 [#137856](https://github.com/openclaw/openclaw/pull/137856)、插件详情页 [#137846](https://github.com/openclaw/openclaw/pull/137846)、统一内置/ClawHub 插件发现 [#138755](https://github.com/openclaw/openclaw/pull/138755)、插件设置状态/图标清晰化 [#142624](https://github.com/openclaw/openclaw/pull/142624)。
- **网关/运行时修复：** 从 CLI 进行运行时感知的环境列表 [#143446](https://github.com/openclaw/openclaw/pull/143446)、修复隔离会话中心跳 MCP 子进程泄漏 [#143433](https://github.com/openclaw/openclaw/pull/143433)、修复 draining 状态下 ingress claim 的问题 [#142768](https://github.com/openclaw/openclaw/pull/142768)、记忆召回在触发器超时后继续执行 [#142693](https://github.com/openclaw/openclaw/pull/142693)。
- **原生/平台：** 将 macOS Apple Event 权限探测移出协作线程池 [#143329](https://github.com/openclaw/openclaw/pull/143329)、App Intents 路由到所选会话（iOS/macOS；草稿，等待安全评审）[#143259](https://github.com/openclaw/openclaw/pull/143259)。
- **云端 worker：** 跨云会话复用已完成的项目设置 [#143227](https://github.com/openclaw/openclaw/pull/143227)。
- **UI 打磨：** 保留被接管会话的原生菜单 [#143342](https://github.com/openclaw/openclaw/pull/143342)、回合结束后 Stop 按钮保持 sticky [#143437](https://github.com/openclaw/openclaw/pull/143437)、清理过期的 git 更新提示 [#142959](https://github.com/openclaw/openclaw/pull/142959)、progress 回合中 exit 行的淘汰机制 [#142802](https://github.com/openclaw/openclaw/pull/142802)、iMessage 输入状态/已读回执恢复 [#142626](https://github.com/openclaw/openclaw/pull/142626)。

---

## 4. 社区热门话题

评论数最多的 issue 折射出社区最关注的三大焦虑：**升级回归、认证不稳定、会话/记忆完整性。**

- [#135111（26 条评论，已关闭）间歇性出现 "Provider completed tool call with malformed JSON arguments" — v2026.8.1 上的回归，claude-sonnet-5](https://github.com/openclaw/openclaw/issues/135111)。这是参与度最高的讨论；该故障不局限于特定文件/工具，难以复现——反映出用户对次版本升级后运行时可靠性的不安。
- [#97616（15 条评论）OpenClaw 泄漏未被回收的 hook/工具子进程 → 僵尸进程堆积与运行时性能退化](https://github.com/openclaw/openclaw/issues/97616)。自 6 月以来的未修复 P1 回归；运维人员运行着长生命周期的网关，看着其性能随时间不断下降。
- [#119720（15 条评论）同步的智能体持久化/会话记录维护在大规模场景下阻塞 Gateway 事件循环](https://github.com/openclaw/openclaw/issues/119720)。未修复 P1；社区希望网关在会话增长时依然保持响应。与 #140231/#138984 的部分修复相关联。
- [#137927（14 条评论，已关闭）内部上下文块泄漏到可见的 Telegram 消息文本中](https://github.com/openclaw/openclaw/issues/137927)。该问题与安全相关且让用户难堪；在本窗口内关闭是一个积极信号。
- [#53628（14 条评论）从 ClawHub 安装技能时 `${XDG_CONFIG_HOME}` 未被展开](https://github.com/openclaw/openclaw/issues/53628)。长期存在的 P2，有关联 PR 处于开启状态；Docker 用户反复踩到。
- [#43367（14 条评论）多智能体编排不稳定：配置被覆盖、会话锁失败、子任务脱离](https://github.com/openclaw/openclaw/issues/43367)。有关联 PR 开启；并行智能体工作流依然摩擦重重。
- [#89278（12 条评论，P0）Codex OAuth 刷新成功，但 cron/心跳仍因 10 秒认证刷新超时而失败](https://github.com/openclaw/openclaw/issues/89278) — 2 👍；发版阻断级的认证可靠性问题。
- [#95610（12 条评论，2 👍）Prompt 缓存前缀频繁变动，导致 OpenAI 自动前缀缓存失效](https://github.com/openclaw/openclaw/issues/95610) — 一个引发重度 API 用户共鸣的成本/性能问题。
- [#88757（6 条评论，3 👍）智能体主动消息在会话上下文中不可见 → 对话失步](https://github.com/openclaw/openclaw/issues/88757) — 样本中 👍 密度最高；定时/心跳用户对此感受尤深。

背后的需求：用户正在运行越来越自主化、定时化、多渠道、多智能体的工作负载，对**状态连续性**——会话上下文、认证状态和进程生命周期——的任何中断都高度敏感。升级回归问题的高反馈量（v2026.7.1-2 → v2026.8.1 反复出现）表明，用户希望次版本发布采用更保守的稳定性标准。

---

## 5. Bug 与稳定性

最近 24 小时内仍活跃的 Bug，按严重程度排序：

**P0 / 发版阻断**
- [#89278 — Codex OAuth 刷新耗时超过 10 秒；即使探测成功，cron/心跳仍以认证刷新超时失败](https://github.com/openclaw/openclaw/issues/89278) — 开启中，有关联 PR，标记为 `ux-release-blocker`。
- [#115642 — 计费冷却时间比故障持续时间更长（`disabledUntil` 约 5 小时）；订阅认证没有基于探测的恢复机制，也无法手动重置](https://github.com/openclaw/openclaw/issues/115642) — 开启中，`ux-release-blocker`。
- *（本窗口内已关闭）* [#137813 2026.9.1 更新后 Windows 网关无法启动](https://github.com/openclaw/openclaw/issues/137813) 与 [#141617 2026.9.2 npm update 卡在 requested/running](https://github.com/openclaw/openclaw/issues/141617) — 均已解决。

**P1 / 高**
- [#97616 — 僵尸/未回收子进程堆积导致长期运行的网关性能退化](https://github.com/openclaw/openclaw/issues/97616) — 自 6 月开启，15 条评论，需要维护者提供信息/修复。
- [#119720 — 同步持久化在大规模场景下阻塞 Gateway 事件循环](https://github.com/openclaw/openclaw/issues/119720) — 开启中，较复杂，已部分修复。
- [#136311 — memory-core 重建索引锁在每次 Gateway 启动时被重新获取 → 索引无法修复，遗留 19 GB 孤儿临时数据库](https://github.com/openclaw/openclaw/issues/136311) — 开启中，标记为 platinum-hermit 严重级别。
- [#140010 — Windows 睡眠/唤醒：唤醒后 30–60 秒以上 UI/WebSocket 无法重连](https://github.com/openclaw/openclaw/issues/140010) — 开启中。
- [#142336 — 核心 `/dashboard` 命令遮蔽了 Telegram Mini App 启动器（2026.9.2+ 回归）](https://github.com/openclaw/openclaw/issues/142336) — 开启中，标记为 queueable-fix。
- [#139274 — 原生 `/codex bind` 丢弃语音消息附件并跳过已配置的 STT](https://github.com/openclaw/openclaw/issues/139274) — 开启中。
- [#125570 — Skill Workshop 更新会覆盖线上技能描述，静默破坏技能路由](https://github.com/openclaw/openclaw/issues/125570) — 开启中。
- [#123799 — 生产环境停留在 2026.5.12，需要针对 Codex compact 404 的安全升级/反向移植指南](https://github.com/openclaw/openclaw/issues/123799) — 开启中；运维人员希望有一条逃生通道。
- [#112160 — SSH 沙箱不会将入站媒体暂存到现有远程工作区](https://github.com/openclaw/openclaw/issues/112160) — 开启中。
- [#128637 — 多智能体后台操作因 `AgentSelectionRequiredError` 失败](https://github.com/openclaw/openclaw/issues/128637) — 开启中。
- [#138042 — Gateway 控制请求停滞 157–276 秒（health/control/chat.history）](https://github.com/openclaw/openclaw/issues/138042) — 开启中；属于崩溃/挂起类问题。
- [#115367 — Provider 拥有的读取门要求 `origin: bundled`，但特权面却作为外部插件发布 → 读取被锁定在当前会话](https://github.com/openclaw/openclaw/issues/115367) — 开启中的安全/架构 P1。
- [#88757 — 主动消息在会话上下文中不可见 → 对话失步](https://github.com/openclaw/openclaw/issues/88757) — 开启中。
- [#135111 — 间歇性出现工具调用参数 JSON 格式错误（claude-sonnet-5）](https://github.com/openclaw/openclaw/issues/135111) — **本窗口内已关闭**。
- [#137927 — 内部上下文块泄漏到 Telegram](https://github.com/openclaw/openclaw/issues/137927) — **本窗口内已关闭**。

较小但值得注意：#143278（2026.9.3 上心跳内部输出泄漏到 Telegram 用户聊天）、#141747（每回合约 686 token 的不可退订运行时脚手架开销）、#139714（`update in progress` 永久卡住）、#139710（回合中途插件被取代导致系统智能体回合被终止）、#142037（Slack 显式路由回复被记录为 "mute"）、#126906（拒绝 write 工具会静默禁用记忆持久化）。

**修复 PR 可用性：** #89278 有直接的修复 PR（`linked-pr-open`）。#53628、#43367、#95610、#44502、#50611、#128076 和 #133692 也带有已开启的关联 PR。上述许多 P1（如 #97616、#119720、#136311、#140010）在样本中仍没有明确关联的修复。

---

## 6. 功能请求与路线图信号

**需求明确且活跃的功能请求：**
- [#6599 — `/models test-fallback` 命令：无需等待真实故障即可验证回退链](https://github.com/openclaw/openclaw/issues/6599)（2026 年 2 月，P3，维护者评审与产品决策待定）。
- [#6757 — 智能体触发的上下文压缩（self-compact 工具）](https://github.com/openclaw/openclaw/issues/6757)（2 👍；由某个智能体自主提交——说明高级用户正在自助解决自身需求）。
- [#6625 — 子智能体优雅超时，带超时前预警以保存工作](https://github.com/openclaw/openclaw/issues/6625)。
- [#50291 — 插件 hooks 的追踪上下文（messageId/runId/parentSpanId），用于分布式追踪](https://github.com/openclaw/openclaw/issues/50291) — 偏可观测性视角；随着多智能体部署规模扩大，优先级可能会提升。
- [#87584 — 使群组 room 事件转向（steering）可配置](https://github.com/openclaw/openclaw/issues/87584)（2 👍）。
- [#46058 — 以聊天优先的 Android 端形态讨论](https://github.com/openclaw/openclaw/issues/46058)；[#70266 — macOS Talk Mode 悬浮层中的助手头像](https://github.com/openclaw/openclaw/issues/70266)。

**PR 栈揭示的下一步发布方向：** ClawHub/插件体验是最清晰的路线图信号——插件包自有分类（#142710）、ClawHub 分类信息完善（#142711）、按分类分组（#142712）、统一的发现/安装/详情流程（#142782、#142713、#137886、#137659、#137846）都已排队，且大多标记为“等待维护者查看”。辅助信号包括：云会话项目设置复用（#143227）、iOS/macOS 原生 App Intents（#143259）、macOS 应用生命周期修复（#143329）。预测：**下一个次版本很可能是“插件生态 UX”版本**，并可能捎带心跳/MCP 与 iMessage/draining 相关修复（#143433、#142768、#142626）作为稳定性补强。

---

## 7. 用户反馈摘要

- **升级疲劳真实存在：** issue 中反复出现的句式是“之前还能用，现在坏了”，涉及 2026.7.1-2 → 2026.8.1、2026.8.2 → 2026.9.1/9.2/9.3 等版本对。数位用户明确表示生产环境仍停留在旧版本（#123799，运行在 2026.5.12），并希望获得运维指引而不只是修复。
- **认证是最让人头疼的子系统：** Codex OAuth 在热门 issue 中占了异常高的比例——超时（#89278）、延迟（#95121）、陈旧 profile（#91352）、插件导致的运行时切换（#99449）、计费冷却（#115642）。用户需要认证具备自愈能力和可观测性。
- **状态完整性抱怨主导舆情：** 主动消息不可见、WebChat 会话上下文丢失（#99925）、记忆写入被静默禁用（#126906）、内部脚手架泄漏到聊天渠道（#137927、#143278）、“update in progress” 永久卡住（#139714）——每一类都在侵蚀用户对智能体“现实模型”的信任。
- **积极信号：** 社区参与度高且具体——包括报告中的源码级详细分析（#119720、#138042），以及智能体自主提交功能请求（#6757）。同一窗口内 P0/P1 回归的快速关闭（Windows 启动、飞书工具、内部上下文泄漏）表明维护者响应迅速；由 `clawsweeper` 机器人驱动的分流标签（needs-maintainer-review、needs-product-decision、fix-shape-clear）说明评审队列纪律严明、健康有序。

---

## 8. 积压事项观察

长期存在、信号强烈但仍需维护者关注的事项：

- [#97616 — 僵尸/未回收子进程泄漏（P1，自 2026-06-29 开启，15 条评论）](https://github.com/openclaw/openclaw/issues/97616) — 样本中开启时间最久的严重回归，且没有可见的修复 PR。
- [#43367 — 多智能体编排不稳定（P2，自 2026-03-11 开启，14 条评论，有关联 PR 开启）](https://github.com/openclaw/openclaw/issues/43367) — 涉及并发 `agents add`、会话锁失败和子任务脱离等风险。
- [#53628 — 安装技能时 `${XDG_CONFIG_HOME}` 未被展开（P2，自 2026-03-24 开启，14 条评论，有关联 PR 开启）](https://github.com/openclaw/openclaw/issues/53628) — 一个在 Docker 环境中看似很小的修复却久等未至。
- [#41201 — Control UI 头像图片裂图（回归，自 2026-03-09 开启，12 条评论）](https://github.com/openclaw/openclaw/issues/41201) — 外观问题但一直存在；需要产品决策。
- [#88757 — 主动消息在会话上下文中不可见（P1，自 2026-05-31 开启，3 👍）](https://github.com/openclaw/openclaw/issues/88757) — 影响所有定时/心跳类的重度用户。
- [#60612 — `doctor` 会警告 NVM node 问题，但每次重启都会用 NVM 路径重新生成 launchd plist（自 2026-04-04 开启）](https://github.com/openclaw/openclaw/issues/60612) — macOS 上无法消除的警告循环。
- [#6599 / #6757 / #6625 — 2026 年 2 月的功能请求（回退测试、self-compact、子智能体优雅超时）](https://github.com/openclaw/openclaw/issues/6599) — 仍全部处于产品决策阶段；已搁置约 7 个月。
- [#114612 — SQLite 中 `memory_index_chunks` / `memory_embedding_cache` 无界增长（P2，自 2026-07-27 开启）](https://github.com/openclaw/openclaw/issues/114612) — 属于“撑爆磁盘”类问题；已标记 `dedupe:parent`，等待产品决策。

---

*总体健康度评估：项目活跃度高，issue 吞吐量强劲，且有一组异常连贯的功能 PR 正在进行；但项目在认证与会话状态方面背负着不容忽视的回归债，正在侵蚀用户的升级信心。近期可关注以插件 UX 为核心的版本发布；预计 Codex OAuth 自愈与记忆/会话留存方面仍会持续投入。*

---

## 横向生态对比

# 跨项目对比报告 — 个人 AI 助手 / Agent 开源生态
**日期：** 2026-09-11（内容基于 2026-09-10 摘要）

---

## 1. 生态总览

个人 AI 助手开源领域已经进入普遍的稳定与加固阶段，而非全新功能的扩张期：五个受调研项目在 2026-09-10 当天均未发布版本，但都保持着持续的 PR/issue 吞吐。跨项目来看，社区的焦虑集中在**状态连续性**（会话持久化、上下文压缩、认证状态）、**升级回归疲劳**和 **Windows 平台可靠性**。模型上下文协议（Model Context Protocol, MCP）已从新鲜事物进化为生产级基础设施——多租户、调用方归属、超时和发现机制正在被积极加固。插件/扩展经济生态（ClawHub、QwenPaw skills/应用市场、ZeroClaw 的 WASM RFC）正成为下一片竞争战场，而成本可观测性与提示词缓存管理则开始成为标配功能。

---

## 2. 活动量对比

*数据来自各项目自行报告的摘要（最近 24 小时）。OpenClaw 的数据口径为从 500+500 总更新量中抽取的 top-50 issue/top-30 PR 样本。*

| 项目 | 更新的 issues（已关闭） | 更新的 PRs（已合并/关闭） | 发布 | 健康度* |
|---|---|---|---|---|
| **OpenClaw** | 500+ 采样；197 已关闭（约 40%） | 500+ 采样；251 已合并/关闭（约 50%） | 无 | 8.0/10 |
| **Hermes Agent** | 50（5 已关闭） | 50（4 已合并/关闭） | 无 | 7.0/10 |
| **IronClaw** | 1（0 已关闭） | 6（2 已关闭） | 无 | 7.5/10 |
| **QwenPaw** | 22（11 已关闭） | 34（8 已合并/关闭） | 无 | 7.5/10 |
| **ZeroClaw** | 37（3 已关闭） | 50（1 已合并/关闭） | 无 | 6.5/10 |

*健康度 = 分析师定性评分，加权考虑吞吐量、关闭率、修复 PR 可用性与积压债务。*

**解读：** OpenClaw 的 issue/PR 体量约为任何同行的 10 倍，且保持着最高的关闭率。QwenPaw 展现出最强的单 issue 关闭效率（50%）。Hermes 的 PR 响应覆盖良好，但背负着可观的基础设施债。ZeroClaw 的吞吐量受限于 RFC 决策/评审瓶颈。IronClaw 体量小但稳定，没有严重的未决痛点。

---

## 3. OpenClaw 的地位

**相比同行的优势：**
- **无与伦比的社区规模：** 24 小时内更新 500 个 issue + 500 个 PR，而下一梯队仅为 37–50；单日关闭 197 个 issue，超过多数同行的全部开放问题量。
- **最快的 P0/P1 分诊管线：** Windows 网关启动失败、Telegram 内部上下文泄露、飞书插件工具丢失和 Codex OAuth 过期配置均在窗口期内被打开*并*关闭——这是有纪律、机器人辅助的分诊队列（`clawsweeper` 标签）的明证。
- **最连贯的在途功能栈：** 约 11 个 PR 共同构成一个统一的 ClawHub 插件发现/安装/分类 UX——一次方向异常一致的插件经济版本冲刺。
- **最广的渠道覆盖面：** Telegram、Slack、iMessage、飞书、WebChat 的覆盖范围比任何同行的集成集都要宽。

**技术路线差异：** OpenClaw 的架构是一个**网关运行时**（事件循环驱动，带 `--task-supervisor`、心跳/MCP 子进程），支持自主的定时/多 Agent 工作负载。同行则各有偏重：Hermes 偏桌面应用，IronClaw 偏托管 MCP 基础设施，QwenPaw 偏本地运行时优先，ZeroClaw 偏 RFC 治理的核心 + IDE 界面。

**社区规模对比：** OpenClaw 是参考项目，其活动量让整个领域相形见绌。主要的隐忧是：规模带来了成比例的回归债——认证（Codex OAuth）与会话状态 bug 是最活跃的投诉集中区。社区情绪表现出“升级疲劳”，用户持续报告特定版本升级后出现的回归（2026.7.x → 2026.8.x/9.x），而这一现象在较小项目中不那么明显。

---

## 4. 共同技术关注点

以下需求正在多个项目中浮现：

| 关注领域 | 涉及项目 | 具体需求 |
|---|---|---|
| **会话/状态连续性** | OpenClaw、Hermes、QwenPaw、ZeroClaw | 非阻塞持久化（OpenClaw #119720）、压缩正确性与无静默超时（Hermes #98466/#106866）、FTS 历史记录损坏修复（QwenPaw #7596）、追加式事件历史 + 转录保真度（ZeroClaw #10526, #10697）、主动消息的上下文可见性（OpenClaw #88757） |
| **认证自愈与可观测性** | OpenClaw、Hermes、IronClaw、ZeroClaw | OAuth 刷新超时/计费冷却（OpenClaw #89278/#115642）、会损坏 URL 的清理器（Hermes #48860）、共享 MCP 服务器上的调用方身份区分（IronClaw #8084/#8090）、OAuth 缓存标记正确性（ZeroClaw #10662） |
| **Windows 可靠性** | OpenClaw、Hermes、QwenPaw | 网关启动/睡眠恢复失败（OpenClaw #137813/#140010）、桌面更新误报失败、DPI/透明窗口处理、构建失败（Hermes #105145/#105629/#106285）、事件循环冻结（QwenPaw #7363） |
| **MCP 生产级加固** | IronClaw、QwenPaw、Hermes、OpenClaw | 可配置的客户端超时（QwenPaw #7649）、多用户目录隔离（IronClaw #8090）、带认证的 Streamable HTTP（Hermes #43633）、心跳子进程泄漏（OpenClaw #143433） |
| **成本与缓存核算** | ZeroClaw、OpenClaw、Hermes | $0 消费报告击穿预算上限（ZeroClaw #9816）、缓存前缀抖动（OpenClaw #95610）、过期/交叉污染的上下文用量统计（Hermes #94001） |
| **插件/技能生态** | OpenClaw、QwenPaw、ZeroClaw、IronClaw | 统一的发现/安装 UX（ClawHub）、技能版本管理 + 依赖校验（QwenPaw #7609）、可组合的插件运行时（ZeroClaw #10076）、一致的扩展打包规则（IronClaw #8085） |
| **多 Agent 编排** | OpenClaw、ZeroClaw、Hermes | 会话锁失败/配置被覆盖（OpenClaw #43367）、转录中的子 Agent 可见性（ZeroClaw #8763）、委派验收标准（Hermes #356 — 已关闭但未实现） |
| **IME / 多语言输入** | IronClaw（+ QwenPaw 相关上下文） | Enter 键确认 IME 组合态时触发过早提交（IronClaw #8091）；影响整个生态中的 CJK 用户 |

---

## 5. 差异化分析

| 项目 | 主要定位 | 目标用户 | 架构特征 |
|---|---|---|---|
| **OpenClaw** | 完整的个人 AI 助手网关；多渠道、多 Agent 自主运行 | 运行常驻助手的 Prosumer/运维者（定时、心跳、cron） | 网关运行时 + ClawHub 插件经济；Control UI；基于 npm 分发 |
| **Hermes Agent** | 以桌面为中心的专业 Agent，重度会话/压缩管理，云会话（Astra） | 桌面重度用户、多 profile 的专业用户 | Electron 桌面应用；精密的压缩/上下文管线；自定义 provider 适配器 |
| **IronClaw** | 托管 MCP 服务器基础设施与扩展打包（nearai 生态） | MCP provider/运维者；多租户部署 | 托管 MCP 目录；按调用方归属；扩展 manifest 校验 |
| **QwenPaw** | 自托管助手，本地运行时（llama.cpp）、应用市场、WebChat 控制台 | 中文 + 全球自托管社区；AgentScope 血统 | 本地优先的模型运行时；技能市场；浏览器控制台（v2.2.0）；积极的测试覆盖率冲刺 |
| **ZeroClaw** | RFC 治理、架构优先的 Agent 核心 + zeroCode IDE/ACP 集成 | 重视治理与沙箱机制的开发者/技术集成者 | 重型 RFC 流程；WASM 插件路线图；Bubblewrap/Landlock/Seatbelt 沙箱；Rust/JS 混合工具链 |

**关键差异：** OpenClaw 为*自主性与渠道广度*而优化；Hermes 为*桌面 UX 与会话正确性*；IronClaw 为*多租户 MCP 基础设施正确性*；QwenPaw 为*本地/自托管控制力*；ZeroClaw 为*架构严谨性与代码面集成*（zeroCode）。ZeroClaw 是唯一一个社区主导话题为元架构层面（RFC 修订周期、投票流程改革）而非 bug 或功能驱动的项目。

---

## 6. 社区动量与成熟度

**第一梯队 — 海量规模、快速迭代：**
- **OpenClaw** — 每日 500/500 的 issue/PR 更新；功能栈正收敛于一个看似“插件生态 UX”的发布版本；P0/P1 回归当日关闭。参考项目与领跑者。

**第二梯队 — 稳步加固，伴随特定技术债：**
- **QwenPaw** — 动量强劲（22 个 issue 中关闭 11 个），还完成了引人注目的 2,475 用例测试覆盖率冲刺；但仍背负着严重的未处理事项（事件循环冻结、静默的 llama.cpp 运行时回滚）。2.2.0 回归修复正在快速推进。
- **Hermes Agent** — 修复 PR 文化响应迅速（压缩、Windows 网关挂起、大转录防护），但正因两个长期存在的自动化基础设施故障而公开流失信任（#66616，自 7 月以来 186 条评论；#88584，自 8 月以来 81 条评论）。用户对 Windows 的信心明显低于 macOS/Linux。
- **ZeroClaw** — 架构层面成果颇丰（包含三个 issue 的 zeroCode 侧边栏里程碑已交付），但 RFC 决策队列（#8692）跟不上节奏：5 个高影响力 RFC 等待维护者评审，8 个 PR 因 `needs-author-action` 而搁置，一批与 Anthropic 成本/缓存相关的大型 bug 簇仍停留在 `in-progress`。评审吞吐量是硬约束。

**第三梯队 — 小体量、专注整合：**
- **IronClaw** — 在托管 MCP 多租户和输入法输入正确性上低调迭代。没有风波，但唯一开放的 Telegram PR（#8072）自 9 月 4 日以来一直在等待——表明维护者人手有限。

**总体：** 本窗口期内没有任何项目发布版本——生态正处在周期中段：OpenClaw 收敛于插件 UX 发布；Hermes 正在吸收压缩/Windows 修复；ZeroClaw 正在收尾 zeroCode 侧边栏批次；QwenPaw 正在整合 2.2.0 回归修复。

---

## 7. 趋势信号

**对 AI Agent 开发者而言，2026-09-10 的摘要共同释放出以下信号：**

1. **状态连续性是第一信任轴。** 会话持久化、上下文压缩、记忆写入和主动消息可见性主导了跨项目投诉。那些会静默丢失状态的 Agent——消息不可见、工具结果丢失、记忆持久化失效——引发最强烈的社区情绪反弹。会话架构应当作为可靠性功能来构建，而不是事后补丁。

2. **升级回归疲劳正在重塑发布策略。** OpenClaw 用户明确报告在生产环境中继续锁定旧版本（#123799）；QwenPaw 用户被静默运行时回滚烧伤；Hermes 用户遭遇 Windows 更新误报失败。市场需求是：对 minor 版本设置保守的稳定性门槛、提供 backport/逃生通道指引，以及能捕获“以前能用、现在坏了”这类配对的回归测试套件。

3. **认证必须自愈且可观测。** Codex OAuth 超时、过期 profile、计费冷却死路和会损坏 URL 的清理器，在头部 issue 中出现的频率高得不成比例。Agent 开发者应当把认证当作长生命周期的有状态子系统来对待——配备刷新探测、恢复路径和清晰的状态呈现——而不是一次性握手。

4. **插件/扩展经济是下一个战场。** ClawHub 约 11 个 PR 构成的连贯功能栈、QwenPaw 的技能版本管理与依赖校验工作、ZeroClaw 的 WASM 插件 RFC、IronClaw 的扩展打包修复都指向同一个方向：胜出的 Agent 平台将让第三方能力的安装/发现/打包变得可靠且安全。

5. **MCP 已经进入生产阶段。** 问题已不再是“什么是 MCP”，而是多租户目录隔离、调用方归属（SEP-414）、可配置超时和子进程生命周期。共享 MCP 基础设施上的多用户正确性仍是一个未解问题，大多数项目才刚刚开始触碰。

6. **成本/缓存透明性已成为基本预期。** $0 消费报告击穿预算上限（ZeroClaw）、提示词缓存前缀抖动（OpenClaw）和过期的上下文用量计量器（Hermes）表明：重度用户会要求平台提供准确的成本核算，包括缓存写入与缓存读取的粒度。

7. **Windows 依然是薄弱侧翼——也是差异化机遇。** 五个项目中有三个带着 Windows 专属的 P1 问题（网关启动、睡眠/恢复、桌面构建失败、事件循环冻结）。谁能把 Windows 可靠性当作一等公民对待，谁就能拿下这个市场中服务最不到位的用户群体。

8. **自动化/运维可信度至关重要。** 本周期整个生态中评论数最高的两个 issue，正是 Hermes 自己的自动化新鲜度看门狗（#66616）和定时合并阻塞器（#88584）——持续数月的基础设施故障，评论量巨大。对 Agent 平台而言，亲身体验自家产品的可靠性（或在这件事上明显翻车）都会产生超大的社区影响。

---

*本报告根据 2026-09-10 各项目社区摘要汇编。Issue/PR 数量按各项目自行报告的口径统计，采样方法各有差异；OpenClaw 的指标采样自 500+500 的日更新量。健康度分数为分析师的定性评估，并非项目指标。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-10

**项目：**[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日概览

Hermes Agent 正处于高活跃度的维护与加固阶段：过去 24 小时内 **50 个 issue** 和 **50 个 PR** 获得更新，triage 分流进展良好（45 open / 5 closed issue；46 open / 4 merged-or-closed PR）。今天没有发布新版本，但流水线显然正在向稳定性工作收敛——当前主导议题是 **Windows 平台可靠性**、**会话状态/压缩正确性** 和 **桌面端 UX 缺陷**。几个高严重度 bug 已有修复 PR 在推进（[#106866](https://github.com/NousResearch/hermes-agent/pull/106866)、[#106934](https://github.com/NousResearch/hermes-agent/pull/106934)、[#106838](https://github.com/NousResearch/hermes-agent/pull/106838)），说明维护者响应很快。社区注意力依然分散在自动化基础设施故障（[#66616](https://github.com/NousResearch/hermes-agent/issues/66616)、[#88584](https://github.com/NousResearch/hermes-agent/issues/88584)）与桌面会话管理、移动访问等产品方向需求上。

---

## 2. 版本发布

过去 24 小时内**没有发布新版本**。项目似乎正处于两次发布之间的间歇，当前精力集中在回归修复和待合并 PR 上，这些 PR 很可能会并入下一版本。

---

## 3. 项目进展

**已合并/关闭的 PR（今日可见）：**

- **[#106866 — fix: compression no longer times out silently on aux retries and stays on the session's OpenAI endpoint](https://github.com/NousResearch/hermes-agent/pull/106866)** *(已关闭)* — 接替了 #98480，并解决了 [#98466](https://github.com/NousResearch/hermes-agent/issues/98466)——该 P2 bug 会让辅助重试/回退绕过 progress-hook 包装器，导致空闲看门狗误杀健康压缩调用。这是长会话压缩在可靠性上一次有分量的改进。

- **[#106927 — fix(web): Firecrawl waitFor for lazily loaded extracts](https://github.com/NousResearch/hermes-agent/pull/106927)** *(以重复项关闭)* — 针对首次绘制后才完成 hydrate、返回看似空白 markdown 的页面做了处理；因与已有工作重叠而关闭。

**今日解决的 issue：**

- **[#105145 — Windows desktop-driven `hermes update` false FAILED (exit 8)](https://github.com/NousResearch/hermes-agent/issues/105145)** *(已关闭，P1)* — 更新后的校验解析了错误的工作目录；这个本周评论最多的 bug 已修复。

- **[#98466 — Auxiliary retry/fallback bypasses progress-hook wrapper](https://github.com/NousResearch/hermes-agent/issues/98466)** *(已关闭，P2)* — 通过上面的 #106866 修复。

- **[#105369 — Fresh Astra session fails after background review with conflicting authenticated continuation identities](https://github.com/NousResearch/hermes-agent/issues/105369)** *(已关闭，P2)*。

- **[#356 — Feature: Acceptance Criteria & Independent Judge for Sub-agent Delegation](https://github.com/NousResearch/hermes-agent/issues/356)** *(已关闭)* — 这个自 3 月起就长期开启的功能提案终于关闭，不过并不是经由某个明确的已合并实现关闭的。

**进行中的主题：** 压缩交接去重（[#106867](https://github.com/NousResearch/hermes-agent/pull/106867)）、大型会话记录导致的网关资源耗尽（[#106838](https://github.com/NousResearch/hermes-agent/pull/106838)）、Windows 非交互式网关挂起/双重启动（[#106934](https://github.com/NousResearch/hermes-agent/pull/106934)），以及记忆策略透明化（[#106928](https://github.com/NousResearch/hermes-agent/pull/106928)）。

---

## 4. 社区热门话题

- **[#66616 — Skills index is stale or degraded](https://github.com/NousResearch/hermes-agent/issues/66616)** — **186 条评论。** 热度大幅领先的最活跃 issue。自 7 月 18 日起，自动化新鲜度探针持续报告 `/docs/api/skills-index.json` 处于降级状态（29.8 小时旧，26 小时上限）。评论量表明社区对一个迟迟未解决的基础设施问题相当不满。

- **[#88584 — Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584)** — **81 条评论。** 计划中的 Nous-to-Enterkey 合并自 8 月 17 日起一直被 `cron/jobs.py` 中的冲突阻塞。这是热度第二的 issue，同样属于自动化/运维可靠性问题，而非产品 bug。

- **[#105145 — Windows `hermes update` false FAILED (exit 8)](https://github.com/NousResearch/hermes-agent/issues/105145)** — **17 条评论，现已关闭。** Windows 更新回归问题讨论度很高；现已解决。

- **[#70421 — Desktop: show all chats under a project](https://github.com/NousResearch/hermes-agent/issues/70421)** — **7 👍、5 条评论。** 本周期正向反馈最强的信号：用户希望在多聊天项目场景中移除 3 个会话预览上限。

- **[#11911 — Native Mobile App (iOS & Android) with Voice Calling](https://github.com/NousResearch/hermes-agent/issues/11911)** — **7 条评论、2 👍。** 自 4 月以来的长期路线图诉求，仍停留在 `needs-decision`。

- **[#48860 — OAuth prompt sanitizer greedy-replaces docs URL](https://github.com/NousResearch/hermes-agent/issues/48860)** — **5 条评论、P1。** 由于字符串替换范围过宽，`hermes-agent.nousresearch.com` 被改写为已失效的 `claude-code.nousresearch.com`（NXDOMAIN）。

**深层需求：** 热度最高的话题集中在*对自动化基础设施的信任*（看门狗、定时集成）与*桌面端会话管理的交互体验*上，而不是模型质量——这意味着核心 agent 体验已经足够稳定，用户开始关注功能表面和运维层面。

---

## 5. Bug 与稳定性

按严重程度排序。过去 24 小时的新报告标为 *（新）*。

**P1 — 严重**

- **[#48860 — OAuth sanitizer breaks docs URLs (NXDOMAIN)](https://github.com/NousResearch/hermes-agent/issues/48860)** *(自 6 月起开启)* — `agent/anthropic_adapter.py` 中范围过宽的字符串替换破坏了真实 URL。尚无修复 PR。

- **[#105629 — Windows desktop build fails: electron-builder asar rewrite → rcedit "Unable to commit changes"](https://github.com/NousResearch/hermes-agent/issues/105629)** *(较新，9 月 8 日)* — Windows 11 上可稳定复现的打包构建失败，影响 `hermes update` / `hermes desktop`。

- **[#105145](https://github.com/NousResearch/hermes-agent/issues/105145)** — 本周期已解决（见上文）。

**P2 — 高**

- **[#106838 (PR) — Large legacy transcripts exhaust the gateway (P0-impact description)](https://github.com/NousResearch/hermes-agent/pull/106838)** — 打开大型压缩会话可能会分配数 GB 内存，并使 Desktop RPC 冻结 30 秒以上。修复 PR 已开启。

- **[#102792 — Desktop "+" new session loses owner metadata → "Couldn't open this session" on multi-profile installs](https://github.com/NousResearch/hermes-agent/issues/102792)** — 需要复现步骤；会破坏多 profile 用户的新建会话功能。

- **[#106909 — Rootless Docker: iron-proxy binds to unreachable loopback](https://github.com/NousResearch/hermes-agent/issues/106909)** *（新）* — 代理在 `127.0.0.1` 上报告健康，但容器把 `host.docker.internal` 解析为 `172.17.0.1`；所有出站沙箱均失败。

- **[#94001 — Desktop status-bar context usage stale/cross-session-contaminated after compression](https://github.com/NousResearch/hermes-agent/issues/94001)** — 显示的 token 百分比不正确；压缩与统计信息之间存在相互影响。

- **[#92644 — Scanner false-positives on SOUL.md content describing prompt-injection defenses](https://github.com/NousResearch/hermes-agent/issues/92644)** — 合法的安全教学内容被扫描器误拦截。

**P3 — 中等**

- **[#106359 — Gateway zombie on Windows: TCP port exhaustion freezes event loop](https://github.com/NousResearch/hermes-agent/issues/106359)** *（新）* — 心跳停止，但后台线程仍在写日志；会话最终通过 `ws_orphan_reap` 丢失。

- **[#106285 — Windows Desktop window becomes transparent crossing DPI-scaled displays](https://github.com/NousResearch/hermes-agent/issues/106285)** *（新）*。

- **[#106292 — Kanban CLI completion bypasses `pre_tool_call` hooks → premature root completion](https://github.com/NousResearch/hermes-agent/issues/106292)** *（新）* — 生命周期策略存在执行盲区。

- **[#99533 — Firecrawl `web_extract` flattens 403/404 into successful empty results](https://github.com/NousResearch/hermes-agent/issues/99533)** — `metadata.statusCode` 从未被检查；已关闭的 PR #106927 表明修复方案在别处已存在。

- **[#105247 — Group chat harvest window drops late replies after busy-extended timeouts](https://github.com/NousResearch/hermes-agent/issues/105247)**。

**修复 PR 覆盖情况：** 良好——#106866（压缩辅助重试）、#106934（Windows 网关挂起与双重启动）、#106838（大型会话记录）、#106933（Mistral/自定义 provider 工具参数崩溃）、#106916（自定义 provider key 扁平化）、#106931（修复 `hermes doctor` 的 traceback）。

---

## 6. 功能请求与路线图信号

**高信号需求：**

- **[#70421 — Show all chats under a project](https://github.com/NousResearch/hermes-agent/issues/70421)** — 7 👍。移除侧边栏 3 个会话上限。近期桌面版发布的强有力候选。

- **[#106267 — Per-tool-scope YOLO mode via `/yolo allow/deny`](https://github.com/NousResearch/hermes-agent/issues/106267)** *（新）* — 提供按工具维度的豁免审批，而不是全有或全无。可以很自然地基于现有 YOLO 基础设施构建。

- **[#106258 — Resolve slash commands from loose natural language](https://github.com/NousResearch/hermes-agent/issues/106258)** *（新）* — “switch to grok oauth”这类松散自然语言应能映射到 `/model xai-oauth`。

- **[#106253 — Desktop "Fast" toggle clarity](https://github.com/NousResearch/hermes-agent/issues/106253)** *（新）* — 用户把“Fast”误读成质量取舍，而不是一项付费优先通道；这属于 UX 文案和控件暗示层面的修复。

- **[#106918 — Show effective background memory approval policy in `/memory`](https://github.com/NousResearch/hermes-agent/issues/106918)** *（新）* — 配套修复 PR [#106928](https://github.com/NousResearch/hermes-agent/pull/106928) 已开启。

- **[#106908 — Cron: support future `start_at` for recurring jobs](https://github.com/NousResearch/hermes-agent/issues/106908)** *（新）* — 避免“在全新 LLM 会话中比较墙钟时间”这类不安全的 workaround。

**更长期的路线图信号：** 带语音的原生移动应用（[#11911](https://github.com/NousResearch/hermes-agent/issues/11911)，自 4 月起）、任务中途切换模型/提示注入（[#106269](https://github.com/NousResearch/hermes-agent/issues/106269)）、终端 provider 插件的动态工作区绑定（[#104163](https://github.com/NousResearch/hermes-agent/issues/104163)）、设置页模型缓存（[#106299](https://github.com/NousResearch/hermes-agent/issues/106299)）。

**预测：** 下一版本很可能会纳入压缩交接去重（[#106867](https://github.com/NousResearch/hermes-agent/pull/106867)）、Windows 网关挂起修复（[#106934](https://github.com/NousResearch/hermes-agent/pull/106934)）以及大型会话记录保护（[#106838](https://github.com/NousResearch/hermes-agent/pull/106838)）。像 `/memory` 策略展示这类 UX 打磨，也已经配好了对应 PR。中期来看，per-tool YOLO 和项目会话列表是最可能新增的功能，现有基础设施也支持这么做。

---

## 7. 用户反馈摘要

- **Windows 依然是主要痛点。** 用户报告了更新误报失败（exit 8，现已修复）、稳定复现的打包构建失败（[#105629](https://github.com/NousResearch/hermes-agent/issues/105629)）、跨 DPI 显示器时的窗口透明问题（[#106285](https://github.com/NousResearch/hermes-agent/issues/106285)）以及冻结事件循环的 TCP 端口耗尽（[#106359](https://github.com/NousResearch/hermes-agent/issues/106359)）。Windows 上的信心明显低于 macOS/Linux。

- **桌面端会话管理让高级用户不满。** 反复出现的不满集中在 3 个会话上限（[#70421](https://github.com/NousResearch/hermes-agent/issues/70421)）、多 profile 环境中“+”新建会话失效（[#102792](https://github.com/NousResearch/hermes-agent/issues/102792)）、上下文用量过期或被跨会话污染（[#94001](https://github.com/NousResearch/hermes-agent/issues/94001)）、内嵌内容卡住并遮挡 UI（[#79833](https://github.com/NousResearch/hermes-agent/issues/79833)）。

- **工具链的准确性与信任问题：** 用户不满扫描器拦截其合法的、介绍提示注入防御内容的 SOUL.md（[#92644](https://github.com/NousResearch/hermes-agent/issues/92644)），也不满 Firecrawl 把失败变成一场看似成功的空提取（[#99533](https://github.com/NousResearch/hermes-agent/issues/99533)）——两者都在损害对 agent 工具链的信任。

- **对控制力与透明度的期望：** 用户希望得到更细粒度的审批控制（per-tool YOLO）、实时灵活的 CLI（自然语言斜杠命令、任务中途切换模型），以及“Fast”这类付费功能的如实标注。

- **基础设施观感：** 评论量最高的两个 issue（[#66616](https://github.com/NousResearch/hermes-agent/issues/66616)、[#88584](https://github.com/NousResearch/hermes-agent/issues/88584)）表明，用户对项目自身自动化工具能否持续保持绿色仍然心存疑虑。

---

## 8. 待办积压观察

需要维护者关注的事项：

- **[#66616 — Skills index stale/degraded](https://github.com/NousResearch/hermes-agent/issues/66616)** — 186 条评论，自 **7 月 18 日** 起开启。一个自动化新鲜度看门狗失效约两个月，是社区可见范围内最大的可靠性污点。

- **[#88584 — Automated Nous integration blocked](https://github.com/NousResearch/hermes-agent/issues/88584)** — 81 条评论，自 **8 月 17 日** 起开启；cron 合并冲突至今未解决。

- **[#48860 — P1 OAuth sanitizer docs-URL corruption](https://github.com/NousResearch/hermes-agent/issues/48860)** — 自 **6 月 19 日** 起开启，且没有修复 PR；严重度为 P1，却已悬置很久。

- **[#11911 — Native mobile app request](https://github.com/NousResearch/hermes-agent/issues/11911)** — 自 **4 月 18 日** 起开启，标记为 `needs-decision`；应当在路线图上给出明确答复。

- **[#79833 — Desktop stuck inline embed overlay](https://github.com/NousResearch/hermes-agent/issues/79833)** — 自 **8 月 6 日** 起开启，毫无动静；一个阻塞 UI 的 bug。

- **长期未合并、需要评审/合并的 PR：**
  - [#43633 — feat(mcp): authenticated Streamable HTTP serving](https://github.com/NousResearch/hermes-agent/pull/43633) *(自 6 月 10 日起开启)*
  - [#45317 — fix(bluebubbles): prevent duplicate turns](https://github.com/NousResearch/hermes-agent/pull/45317) *(自 6 月 13 日起开启)*
  - [#73572 — fix(auth): honor built-in provider api_key config](https://github.com/NousResearch/hermes-agent/pull/73572) *(自 7 月 28 日起开启)*
  - [#93452 — fix(honcho): session titles must not override sessionStrategy](https://github.com/NousResearch/hermes-agent/pull/93452) *(自 8 月 24 日起开启)*

---

**总体健康评估：** Hermes Agent 正在稳定交付回归修复，PR 响应覆盖也不错，但在自动化基础设施（[#66616](https://github.com/NousResearch/hermes-agent/issues/66616)、[#88584](https://github.com/NousResearch/hermes-agent/issues/88584)）和 Windows 平台信心方面仍有可观的 backlog 债务。近期发布风险较低；正在推进中的压缩/会话状态修复，正好也命中代码库中最复杂的正确性领域。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-10

## 今日概览

IronClaw 过去 24 小时活跃度中等：**1 个新开 issue**、**6 个 pull request 更新**，其中 **2 个 PR 已关闭**，没有发布任何新版本。主要开发精力集中在 hosted-MCP 行为、扩展打包和 WebChat 输入处理上。当前没有版本发布或破坏性变更的信号。项目整体健康状况稳定，维护者正在多用户 MCP 正确性以及面向运维人员的配置语义方面积极迭代。

## 版本发布

无。该时间窗口内没有发布任何新的 IronClaw 版本。

## 项目进展

这两个已关闭的 PR 分别代表了配置与 hosted-MCP 打包领域的收尾工作：

- [#8088 [CLOSED] feat(common): distinguish a set-but-empty env var from an unset one](https://github.com/nearai/ironclaw/pull/8088)  
  修复了一种静默失败模式：此前 `FOO=` 与未设置 `FOO` 被同等对待，导致值为空的环境变量会错误地回退到默认值。这在端点覆盖（endpoint override）等部署决策中很关键。

- [#8089 [CLOSED] feat(extensions): bundle the agent-market hosted-MCP provider package](https://github.com/nearai/ironclaw/pull/8089)  
  以与其他内置 hosted-MCP 包相同的形式加入第一方 agent.market provider 包，并附上静态工具声明，作为工具发现流程开始之前的兜底（fallback）。

## 社区热门话题

当前数据中没有评论或 reaction 数量异常高的条目，但近期更新的几个 PR 和 issue 是社区关注的主要焦点：

- [#8091 [OPEN] bug(webchat-v2): Enter sends the message while confirming IME composition](https://github.com/nearai/ironclaw/issues/8091)  
  一个影响 IME 用户的输入类缺陷。日语/中文/韩语输入法依赖 Enter 键确认组字，而这里的问题在于：确认操作被当成了聊天消息提交。

- [#8084 [OPEN] feat(mcp): opt-in SEP-414 caller attribution on outbound hosted-MCP calls](https://github.com/nearai/ironclaw/pull/8084)  
  回应了 provider 端的诉求：出站 hosted-MCP 调用需要按会话区分调用与重试，而不是每个用户只看到一个 bearer token。

- [#8090 [OPEN] fix(mcp): key discovered hosted-MCP catalogs per caller, not per extension](https://github.com/nearai/ironclaw/pull/8090)  
  修复了多用户工具目录被覆盖的问题。其背后需求是在共享 hosted-MCP 服务器上实现正确的按调用方隔离。

这些条目表明，社区对让 hosted-MCP 服务器具备会话感知能力并实现安全多租户有强烈兴趣。

## Bug 与稳定性

按严重程度排序：

1. **输入法组字确认时误发送聊天消息** — [#8091](https://github.com/nearai/ironclaw/issues/8091)  
   在 WebChat v2 中，按 Enter 确认输入法组字会过早发送消息。对 IME 用户来说这是高严重度问题，因为会把未完成的文本发出去。目前没有关联的修复 PR。

2. **hosted-MCP 目录在多用户之间发生冲突** — [#8090](https://github.com/nearai/ironclaw/pull/8090)  
   工具发现结果按扩展 ID 存储，因此在依赖凭据的服务器上，一个用户的发现结果会覆盖另一个用户的。已有修复 PR 开启。

3. **运维人员安装的包可构建但无法使用** — [#8085 [OPEN] fix(extensions)](https://github.com/nearai/ironclaw/pull/8085)  
   `from_host_bundled_manifest_with_inline_dynamic_schemas` 与 `validate_consistency` 之间的规则不一致，导致部分由运维人员安装的包在使用时失败。已有修复 PR 开启。

4. **置空的环境变量被当作未设置** — [#8088](https://github.com/nearai/ironclaw/pull/8088)  
   已关闭并修复。此前，运维人员一旦误将变量留空，就可能静默地走向默认配置路径。

## 功能请求与路线图信号

- **针对 hosted-MCP 的 SEP-414 调用方归属** — [#8084](https://github.com/nearai/ironclaw/pull/8084)  
  这是明确的路线图事项：通过 opt-in 归属机制，让 hosted-MCP provider 能够识别会话与重试。该功能很可能继续推进到下一个版本。

- **Telegram 命令菜单注册** — [#8072](https://github.com/nearai/ironclaw/pull/8072)  
  自 2026-09-04 起开启，规模评估为 **L**，且为 **低风险**。它在激活时注册 Bot API 命令菜单。这是一个面向用户的 Telegram 体验打磨功能，应该很快合入。

- **内置 hosted-MCP provider 包** — [#8089](https://github.com/nearai/ironclaw/pull/8089)  
  虽然已经关闭，但该工作的完成表明项目会继续投入建设内置的第一方 hosted-MCP provider 生态。

## 用户反馈摘要

- **WebChat v2 的 IME 用户** 对 Enter 在确认组字的同时立即发送消息不满。期望行为是：除非用户明确触发发送，否则 Enter 只应提交组字中的文本，而不应发送消息。

- **hosted-MCP 管理员/开发人员** 反馈需要会话级、感知重试的身份标识，并提醒按扩展维度保存的目录会导致用户 A 的工具泄漏到用户 B 的会话中，甚至覆盖用户 B 的会话。

- **运维人员** 希望「有意设为空」的环境变量被尊重，而不是被静默忽略；也希望由运维安装的扩展包与主机内置包行为一致。

- **Telegram 频道用户** 看起来能受益于通过 Bot API 命令菜单发现命令，该功能已在 [#8072](https://github.com/nearai/ironclaw/pull/8072) 中实现。

## 积压事项观察

- [#8072 [OPEN] feat(telegram): register the Bot API command menu at activation](https://github.com/nearai/ironclaw/pull/8072)  
  本批次中开启最久的 PR，创建于 2026-09-04，截至 2026-09-10 仍处于开启状态。标记为 **size: L**、**risk: low**，看起来已准备好让维护者审查/合入。

- [#8091 [OPEN] bug(webchat-v2): Enter sends the message while confirming IME composition](https://github.com/nearai/ironclaw/issues/8091)  
  虽然开启时间不长，但目前没有任何评论或关联的修复。该问题影响大量 IME 用户，值得维护者尽早分诊处理。

当前数据集中没有其他长期无人回应且高优先级的条目。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-10

## 1. 今日概览
在截至 2026-09-10 的 24 小时窗口内，QwenPaw 展现出较高的维护活跃度：22 个 issue 和 34 个 PR 得到更新，其中 11 个 issue 被关闭，8 个 PR 被标记为合并/关闭。未发布新版本。待办工作仍然可观——11 个开启/活跃的 issue 和 26 个开启的 PR——但活动重心偏向缺陷修复、代码评审和整合巩固，而非全新功能的发布。社区讨论继续在中文 UI/UX 反馈与更广泛的自主托管、渠道、记忆和工具链请求之间分布。项目整体健康状况良好，但流式传输、数据库完整性、事件循环响应性和静默运行时自动更新方面仍存在持续的稳定性隐忧。

## 2. 版本发布
本报告窗口内没有发布任何版本，因此没有变更日志条目、破坏性变更说明或迁移指南可供汇总。

## 3. 项目进展
在摘要中可见的 PR 中，两个已关闭的 PR 代表了具体的功能进展：

- [PR #7649 — feat(mcp): support configurable timeout for HTTP/SSE clients](https://github.com/agentscope-ai/QwenPaw/pull/7649)：为 MCP 客户端配置、API schema 和驱动处理增加了可选的 `http_timeout` 参数。这解决了长期存在的 [issue #3997](https://github.com/agentscope-ai/QwenPaw/issues/3997)——MCP 超时被静默丢弃的问题。
- [PR #7609 — feat(skills): expose versions and validate declared dependencies](https://github.com/agentscope-ai/QwenPaw/pull/7609)：实现了 [issue #7557](https://github.com/agentscope-ai/QwenPaw/issues/7557) 中请求的技能版本化/依赖元数据功能，包括 MCP 需求检查和更安全的技能加载。

多个开启中的 PR 也取得了显著进展，很可能成为下一批合并的对象：

- [PR #7655 — fix(history): repair FTS corruption and retention cleanup](https://github.com/agentscope-ai/QwenPaw/pull/7655) 针对 [issue #7596](https://github.com/agentscope-ai/QwenPaw/issues/7596)。
- [PR #7652 — fix(models): preserve provider-resolved context windows](https://github.com/agentscope-ai/QwenPaw/pull/7652) 防止过早的上下文压缩。
- [PR #7647 — fix(channels): support Base64 data URLs in outbound media](https://github.com/agentscope-ai/QwenPaw/pull/7647) 修复了 data URL 被误判为文件路径的问题。
- [PR #7653 — test(unit): coverage sprint batch 2, 2475 cases](https://github.com/agentscope-ai/QwenPaw/pull/7653) 将语句覆盖率从 64.41% 提升至 69.43%。

本窗口内关闭的 issue 同样表明了 UI/UX 回归和缺陷报告方面的进展，涵盖模态框遮罩样式、MCP 超时配置、工作目录路径编辑以及 QQ 群频道行为等。

## 4. 社区热点
最近 24 小时内讨论最多的 issue 集中在 UI 人机工程、桌面端响应性和 Web 控制台行为方面：

- [Issue #7177 — Feature: optimize the deploy homepage UX](https://github.com/agentscope-ai/QwenPaw/issues/7177) — 8 条评论。用户希望将主要操作放在首屏上方，并让"停止"控件的放置更安全，尤其是在移动端。
- [Issue #7597 — Bug: tool-returned image/PDF base64 triggers 400](https://github.com/agentscope-ai/QwenPaw/issues/7597) — 7 条评论，已关闭。与向用户返回文件的智能体工具高度相关。
- [Issue #7363 — Bug: sync calls freeze event loop and timeout never fires](https://github.com/agentscope-ai/QwenPaw/issues/7363) — 6 条评论，开启中。Windows 桌面端在启动和发送期间出现 118–135 秒的无响应。
- [Issue #7228 — Bug: installed marketplace apps still show "Install" on hover](https://github.com/agentscope-ai/QwenPaw/issues/7228) — 6 条评论，已关闭。应用市场状态反馈令人困惑。
- [Issue #5329 — Feature: add agent-switch button in collapsed sidebar](https://github.com/agentscope-ai/QwenPaw/issues/5329) — 5 条评论，已关闭。移动端浏览器用户在侧边栏折叠后无法切换智能体。
- [Issue #6460 — High CPU in Edge + Wayland on home/session page](https://github.com/agentscope-ai/QwenPaw/issues/6460) — 5 条评论，已关闭。怀疑与大结果渲染/WebSocket 推送有关。
- [Issue #7642 — Bug: console streaming renders nothing until turn completes in Chrome](https://github.com/agentscope-ai/QwenPaw/issues/7642) — 4 条评论，开启中。同一会话在 Safari 中正常，指向 Chromium 特有的流式传输/渲染问题。

底层的用户需求很明确：更安全高效的移动/Web UI、可靠的流式响应、更好的桌面端响应性，以及应用市场/智能体切换器中更清晰的状态反馈。

## 5. 缺陷与稳定性
按用户影响和严重程度大致排序：

- **高 — [Issue #7363: Synchronous calls block the event loop and timeout never fires](https://github.com/agentscope-ai/QwenPaw/issues/7363)**。QwenPaw 桌面版在 Windows 上启动和发送消息期间会无响应约 2 分钟。目前还没有可见的修复 PR，因此这是一个关键的稳定性问题。
- **高 — [Issue #7633: llama.cpp version format parsing failure causes silent rollback](https://github.com/agentscope-ai/QwenPaw/issues/7633)**。手动升级的 5 位版本号 llama.cpp 构建会因为 `has_update` 错误解析版本号而被静默替换回固定的旧版本。这削弱了用户对桌面端运行时更新器的信任。
- **高 — [Issue #7642: Console streaming renders nothing until the turn completes in Chrome](https://github.com/agentscope-ai/QwenPaw/issues/7642)**。在 Chromium 中表现为阻塞行为而 Safari 中正常，表明这是浏览器特定的流式传输回归。
- **中 — [Issue #7628: Context compaction can exceed provider request budget](https://github.com/agentscope-ai/QwenPaw/issues/7628)**。由于压缩未考虑完整的 provider 请求大小，活跃会话仍可能失败。
- **中 — [Issue #7596: history.db FTS corruption undetected; retention purge fails silently](https://github.com/agentscope-ai/QwenPaw/issues/7596)**。已关闭，修复 PR [PR #7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) 现已开启。
- **中 — [Issue #7597: Tool-returned binary sent as bare base64 causes 400 errors](https://github.com/agentscope-ai/QwenPaw/issues/7597)**。已关闭。
- **低/回归 — [Issue #7622: Modal backgrounds "transparent" in v2.2.0](https://github.com/agentscope-ai/QwenPaw/issues/7622)**。已关闭。
- **低/回归 — [Issue #7601: Working directory picker no longer supports manual path editing in 2.2.0](https://github.com/agentscope-ai/QwenPaw/issues/7601)**。已关闭。
- **低 — [Issue #7618: QQ group messages ignored after adding bot to a group](https://github.com/agentscope-ai/QwenPaw/issues/7618)**。已关闭。

进行中的相关修复 PR 包括 [PR #7654](https://github.com/agentscope-ai/QwenPaw/pull/7654)（音频回退错误分类）和 [PR #7647](https://github.com/agentscope-ai/QwenPaw/pull/7647)（出站渠道媒体中的 Base64 data URL）。

## 6. 功能请求与路线图信号
若干功能请求暗示了项目可能的下一个发展方向：

- **浏览器/控制台 UX 定制**：
  - [Issue #7648 — custom webpage title for multiple QwenPaw panels](https://github.com/agentscope-ai/QwenPaw/issues/7648)。
  - [Issue #7177 — deploy-page layout and mobile action placement](https://github.com/agentscope-ai/QwenPaw/issues/7177)。
  - [Issue #5329 — agent switch in collapsed sidebar mode](https://github.com/agentscope-ai/QwenPaw/issues/5329)，现已关闭。
  - [Issue #7600 — QwenPaw "traffic light" status indicator](https://github.com/agentscope-ai/QwenPaw/issues/7600)。
- **渠道/通知集成**：
  - [Issue #7657 — add ntfy channel support with working implementation ready](https://github.com/agentscope-ai/QwenPaw/issues/7657)。
  - [Issue #7650 — pass channel-level metadata such as QQ number/phone to MCP tools](https://github.com/agentscope-ai/QwenPaw/issues/7650)。
- **记忆/上下文与模型路由**：
  - [Issue #7656 — durable memory across sessions](https://github.com/agentscope-ai/QwenPaw/issues/7656)。
  - [Issue #7628 — better context compaction budget handling](https://github.com/agentscope-ai/QwenPaw/issues/7628)。
  - [Issue #7644 — make default-agent essential parameters editable in the UI](https://github.com/agentscope-ai/QwenPaw/issues/7644)。
- **技能/生态**：
  - [Issue #7557 — skill versioning and dependency metadata](https://github.com/agentscope-ai/QwenPaw/issues/7557)，已由 [PR #7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) 处理。

从评审速度来看，MCP 超时支持（[PR #7649](https://github.com/agentscope-ai/QwenPaw/pull/7649)）和技能版本化（[PR #7609](https://github.com/agentscope-ai/QwenPaw/pull/7609)）是下一个补丁/次要版本的有力候选。ntfy 功能（[Issue #7657](https://github.com/agentscope-ai/QwenPaw/issues/7657)）如果维护者接受已提交的实现，可能会快速推进；持久化记忆（[Issue #7656](https://github.com/agentscope-ai/QwenPaw/issues/7656)）看起来更像是路线图层面的讨论项。

## 7. 用户反馈摘要
过去 24 小时内用户真实的痛点包括：

- **移动/浏览器 UI 仍不够舒适**：用户反映会误触"停止"按钮、在侧边栏折叠模式下无法触达智能体切换按钮，以及在运行多个 QwenPaw 面板时需要自定义页面标题。
- **版本回归影响重大**：2.2.0 用户报告了工作目录选择器丢失手动路径编辑功能、模态框遮罩透明化，以及应用市场"安装/卸载"状态问题。
- **自托管/高级用户想要更多掌控权**：他们对 llama.cpp 运行时静默回退、MCP 超时不可配置以及通过 ntfy 推送通知的选项有限感到沮丧。
- **流式传输和性能影响信任**：Chrome 用户在会话结束前看不到控制台输出；Windows 桌面用户遭遇事件循环阻塞行为；Edge/Wayland 用户报告大页面上的持续 CPU 占用。
- **贡献者能量高涨**：多个 issue 附带现成的实现或详细的根因分析——例如 ntfy 支持、Playwright 自愈、FTS 损坏修复和大规模测试覆盖率批次。

整体满意度喜忧参半：项目响应足够迅速，关闭了许多已报告的缺陷，但用户继续期待更高的可靠性和对运行时、UI 及渠道行为更细粒度的控制。

## 8. 待办积压观察
多个开启中的 PR 和 issue 似乎在等待维护者评审或后续跟进：

- [PR #6399 — feat: add reranker UI config panel to ReMeLightMemoryCard](https://github.com/agentscope-ai/QwenPaw/pull/6399)，创建于 2026-07-23，仍在评审中。
- [Issue #7363 — synchronous calls freeze event loop and timeout never fires](https://github.com/agentscope-ai/QwenPaw/issues/7363)，创建于 2026-08-27，尽管严重程度高但尚未看到修复 PR。
- [PR #6776 — fix(browser): self-heal dead Playwright driver connections](https://github.com/agentscope-ai/QwenPaw/pull/6776)，首次贡献者，自 2026-08-07 起开启。
- [PR #6969 — fix: avoid duplicate tool result when MCP returns structuredContent](https://github.com/agentscope-ai/QwenPaw/pull/6969)，自 2026-08-13 起开启/评审中。
- [PR #7057 — fix(shell): add user-local bin dirs to subprocess PATH](https://github.com/agentscope-ai/QwenPaw/pull/7057)，已标记为待人工评审，自 2026-08-15 起开启。
- [PR #7237 — fix(console): prevent session races during queued sends and switches](https://github.com/agentscope-ai/QwenPaw/pull/7237)，自 2026-08-24 起开启。
- [PR #7378 — DO NOT MERGE: QwenPaw native mobile experience](https://github.com/agentscope-ai/QwenPaw/pull/7378)，自 2026-08-28 起作为草稿开启。

这些项目值得关注：其中多个是成熟、目标明确的修复，具有清晰的用户影响，如果长期无人评审可能会成为瓶颈。

---

规则：
- 仅输出翻译内容。不要前言、不要解释、不要在整个输出周围加 markdown 围栏。
- 精确保留 Markdown 结构：标题、表格（包括列对齐行）、列表、引用块、粗体/斜体、水平分割线、表情符号。
- 原样保留 URL、链接目标、代码跨度、代码块、数字和日期。
- 项目名称、仓库路径、用户名、版本标签、文件路径和 API/配置标识符保持原样——不要翻译。
- Issue/PR 引用如 #12345 及其链接文本保持原样。
- 使用自然的技术中文，采用中文开发者通讯稿的语气——不要逐字直译。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目简报 — 2026-09-10

## 1. 今日概览

ZeroClaw 正处于高活跃度、无发版的阶段：过去 24 小时内更新过的 37 个 issue 中，34 个仍处于开放状态；50 个更新过的 PR 中，49 个仍在评审中。没有发布新版本。三个已标记为 accepted 的 zeroCode UI issue 被关闭，标志着多会话/智能体侧边栏里程碑的完成（[#9729](https://github.com/zeroclaw-labs/zeroclaw/issues/9729)、[#9730](https://github.com/zeroclaw-labs/zeroclaw/issues/9730)、[#9731](https://github.com/zeroclaw-labs/zeroclaw/issues/9731)），另有一个 PR 转为已合并/已关闭状态。最活跃的讨论线程仍是长期持续的架构 RFC，此外还出现了一批值得关注的新 Anthropic 成本/缓存计费缺陷。项目整体健康度较强，但主要风险在于决策与评审吞吐量：多个高风险 RFC 正在等待维护者处理，且相当一部分大型开放 PR 因 `needs-author-action` 或 `blocked` 而停滞。

## 2. 发版情况

过去 24 小时内无新版本发布。

## 3. 项目进展

唯一被合并/关闭的 PR 未出现在展示的前 20 项清单中，但这三个已关闭的 issue 清楚表明相关工作已经交付：

- [#9729 — zeroCode: track multiple concurrent live sessions per chat pane](https://github.com/zeroclaw-labs/zeroclaw/issues/9729) — 已关闭；为智能体侧边栏奠定了基础。
- [#9730 — zeroCode: agent sidebar with status dots, add-picker, and click-to-switch](https://github.com/zeroclaw-labs/zeroclaw/issues/9730) — 已关闭。
- [#9731 — zeroCode: move Quickstart from the mode bar into the sidebar](https://github.com/zeroclaw-labs/zeroclaw/issues/9731) — 已关闭。

上述关闭补全了 [#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727) 所跟踪的 zeroCode 智能体侧边栏批次，相关功能应会在下一个 zeroCode 版本中落地。

今天新进入评审的修复与维护类 PR：

- [#10732 — fix(service): select the daemon log by content, not existence](https://github.com/zeroclaw-labs/zeroclaw/pull/10732) — 解决 macOS/Windows/OpenRC 上 `service logs` 失效的问题（[#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)）。
- [#10733 — fix(channels): voice replies opening with an expressive audio tag](https://github.com/zeroclaw-labs/zeroclaw/pull/10733) — 阻止语音“实质性回复”启发式逻辑拒绝 `[whispers]`/`[laughs]` 等 ElevenLabs 标签。
- [#10729 — chore(deps): bump js-yaml to 4.3.2](https://github.com/zeroclaw-labs/zeroclaw/pull/10729) — 将 GHSA-2883-xcg3-v3hh 安全公告从每日 `npm audit` 检查中清除。
- [#10730 — chore(assets): optimize PR-evidence images](https://github.com/zeroclaw-labs/zeroclaw/pull/10730) — 无损 PNG 压缩。
- [#10680 — chore(deps): bump rust-all group with 44 updates](https://github.com/zeroclaw-labs/zeroclaw/pull/10680) — 需要维护者评审。

## 4. 社区热门话题

按评论数排序的高参与度 issue：

- [#9487 — RFC: Runtime-owned conversation sessions and transport surface adapters](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — 36 条评论；目前为 Revision 5，取代了 Revision 4 的投票快照。这是一场关于会话状态存放位置、以及传输适配器如何暴露该状态的基础性辩论。
- [#9488 — RFC: Unified file and attachment architecture for conversation surfaces](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — 29 条评论；Revision 10，一场漫长且经过大量修改的设计讨论。
- [#6996 — RFC: Granular sandbox policy — filesystem restrictions](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) — 28 条评论；自 May 28 起开放，仍处于 `in-progress` 状态，需要在应用层路径准入与 Bubblewrap/Landlock/Seatbelt 后端之间达成一致。
- [#8692 — Tracker: Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — 15 条评论；这是项目自身用于清空 RFC 决策积压的机制。
- [#10076 — RFC: Composable WASM plugin runtime architecture](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) — 12 条评论。
- [#5514 — Bug: batch Telegram media groups into one multimodal turn](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — 8 条评论；长期存在的用户可见渠道缺陷。
- [#10526 — RFC: Append-only session event history, deterministic state replay](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) 与 [#10549 — RFC: Simplify RFC voting](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — 各有 6 条评论。

深层需求：社区正朝着更严谨的会话/数据模型收敛（追加式历史记录、文件附件、WASM 插件），但 RFC 流程本身正在制造摩擦——Revision 5 与 Revision 10 快照、强制讨论窗口和重新投票，促使人们提出一个用于简化投票的元 RFC（[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)）。PR 评论数未在本次报告中列出，但最大的几个开放 PR——[#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430)（Gemini 语音到语音代理）、[#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)（每个提供商配置支持多个模型）、[#8966](https://github.com/zeroclaw-labs/zeroclaw/pull/8966)（用量事件中的实时提供商身份）以及 [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)（锚定在模型窗口上的上下文压缩）——代表了最具影响力的在途变更。

## 5. 缺陷与稳定性

新报告或新近重新活跃的缺陷，按严重程度排序：

**高（P1）：**

- [#9816 — Anthropic provider reports $0.00 spend, so daily/monthly budget caps can never fire](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) — `in-progress` 和 `accepted`。直连 Anthropic 提供商下，设有支出上限的用户实际上得不到任何保护。
- [#10697 — ZeroCode ACP transcript drops assistant text emitted before a tool call](https://github.com/zeroclaw-labs/zeroclaw/issues/10697) — `P1`、`risk:high`。只有最后一次工具调用之后输出的文本才会作为回复渲染，导致 Code/ACP 会话中的转录数据丢失。

**中（P2 / S2）：**

- [#10731 — `zeroclaw service logs` prints nothing on macOS, Windows and OpenRC when the daemon is healthy](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) — 新提交；修复 PR 已存在（[#10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732)）。
- [#10721 — knowledge.db_path tilde expansion is a global replace, not a home prefix — knowledge tool silently dropped](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — 新提交；路径中任何位置的 `~` 都会被全局替换，导致路径损坏。尚无修复 PR。
- [#10625 — Internal `[media attachment]` placeholder delivered to users when a non-vision model is in use](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) — accepted；向最终用户泄露内部标记。
- [#10699 — cost ledger prices cache writes at the plain input rate, understating cache misses](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) — `ModelCostRates` 和 `TokenUsage` 中均不存在 `cache-write` 费率。
- [#10662 — OAuth system-prefix cache marker is below Anthropic's cache minimum and consumes one of four breakpoint slots](https://github.com/zeroclaw-labs/zeroclaw/issues/10662).
- [#10701 — user image attachment invalidates the entire history cache prefix on compatible providers](https://github.com/zeroclaw-labs/zeroclaw/issues/10701).
- [#10548 — Mermaid diagram accessibility lost inside the zoom dialog](https://github.com/zeroclaw-labs/zeroclaw/issues/10548) — S2 文档回归，由 PR #10515 引入。

**低（S3）：**

- [#10690 — Integrations "Configure" link slugifies provider display name (Z.AI → z-ai, path_not_found)](https://github.com/zeroclaw-labs/zeroclaw/issues/10690).
- [#10720 — zeroCode v0.8.5 agent responses render twice in the chat pane](https://github.com/zeroclaw-labs/zeroclaw/issues/10720) — 仅显示问题；工具调用只触发一次。
- [#5514 — Telegram media groups not batched into one multimodal turn](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — 自 April 起一直开放，仍为 `in-progress`。

缓存定价与缓存前缀缺陷（[#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)、[#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)、[#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)、[#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)）如此集中，说明提供商的成本/缓存计费确实是一个稳定性痛点。

## 6. 功能请求与路线图信号

- **zeroCode 侧边栏里程碑已完成**（[#9729](https://github.com/zeroclaw-labs/zeroclaw/issues/9729)、[#9730](https://github.com/zeroclaw-labs/zeroclaw/issues/9730)、[#9731](https://github.com/zeroclaw-labs/zeroclaw/issues/9731)）——预计将在下一个 zeroCode 版本中落地。
- **OpenAI Responses API 系列功能提案**——IftekharUddin 提交的四个全新且互相关联的提案：[async function tools](https://github.com/zeroclaw-labs/zeroclaw/issues/10704)、[preserving opaque reasoning state across call paths](https://github.com/zeroclaw-labs/zeroclaw/issues/10706)、[bounded programmatic tool calling](https://github.com/zeroclaw-labs/zeroclaw/issues/10707) 和 [active-response steering over WebSockets](https://github.com/zeroclaw-labs/zeroclaw/issues/10708)。这些提案均为 P2、`needs-maintainer-review`、`risk:high`——这是一个强烈信号，表明下一个主要周期将以 Responses 原生的流式与引导能力为核心。
- [#10663 — Configurable 1-hour prompt-cache TTL for Anthropic cache markers](https://github.com/zeroclaw-labs/zeroclaw/issues/10663) — 由用户推动的成本控制功能，适用于原生与透传 Anthropic 提供商。
- [#8763 — Show subagent activity and expandable tool results in ZeroCode](https://github.com/zeroclaw-labs/zeroclaw/issues/8763) — accepted；很可能会与新的侧边栏配合使用。
- 即将进入决策阶段的 RFC：[#10526 — append-only session event history](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) 被 [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) 明确指定为事件词汇表的唯一权威来源，这表明它是下一代会话/回放功能的架构基石。

## 7. 用户反馈摘要

- **支出安全与成本可见性**是最尖锐的痛点。直连 Anthropic 提供商的用户会看到 `Spent today: $0.0000`，而预算上限却永远无法触发（[#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)）；缓存写入成本被低估（[#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)）；图片附件会重置缓存前缀（[#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)），推高成本。用户正在要求对缓存 TTL 进行细粒度控制（[#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)）。
- **zeroCode UI 信任度**：回复重复（[#10720](https://github.com/zeroclaw-labs/zeroclaw/issues/10720)）与工具调用前助手文本丢失（[#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)）正在损害用户对 Code/ACP 转录记录的信心；用户希望获得可展开的子代理/工具可见性（[#8763](https://github.com/zeroclaw-labs/zeroclaw/issues/8763)）。
- **渠道行为**：Telegram 用户一次发送多张图片时，会收到多个代理回复而不是合并为一轮（[#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)）；使用非视觉模型时，Matrix/"core" 用户会收到字面的 `[media attachment]` 占位符（[#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625)）；以方括号表达标签开头的语音回复会被错误分类（修复见 [#10733](https://github.com/zeroclaw-labs/zeroclaw/pull/10733)）。
- **运维摩擦**：`service logs` 在 systemd 之外会静默地不产生任何输出（[#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)），知识工具则会因 `~` 展开逻辑损坏而被静默丢弃（[#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721)）。这些都指向“静默失败”行为这一反复出现的困扰。

整体情绪是积极参与但保持谨慎：贡献者迭代迅速，维护者也在关闭已接受的批次，而成本计费与 ZeroCode 转录缺陷是本周期最明显的用户不满来源。

## 8. 积压情况观察

- **[#6996 — RFC: Granular sandbox policy (filesystem restrictions)](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — 自 May 28 起开放，已有 28 条评论；这是仍处于 `in-progress` 状态的最古老的大型 RFC，需要在应用层策略与操作系统沙箱策略之间达成收敛。
- **等待维护者决策的 RFC** — [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)（Revision 5）、[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)（Revision 10）、[#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)、[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) 和 [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) 均带有 `needs-maintainer-review`。维护者决策队列跟踪器 [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 的存在正是为了清空这一积压，但多次修订/重新投票的周期表明其节奏并未跟上。
- **处于 `needs-author-action` 状态的 PR** — [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430)（Gemini 语音到语音，XL，自 Aug 28 起）、[#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391)、[#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)、[#8966](https://github.com/zeroclaw-labs/zeroclaw/pull/8966)（自 Jul 11 起）、[#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)、[#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)、[#10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214) 和 [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) ——大量高价值的特性开发工作正在等待作者返工。
- **被阻塞 / 禁止合并的 PR** — [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)（历史裁剪时的 token 核算）、[#10358](https://github.com/zeroclaw-labs/zeroclaw/pull/10358)（Mattermost 审批提示）和 [#10304](https://github.com/zeroclaw-labs/zeroclaw/pull/10304)（PR 评审策略文档）需要解除阻塞或被明确延期。
- **等待评审已久的项目** — [#8546 — fix(cli): localize status fragments](https://github.com/zeroclaw-labs/zeroclaw/pull/8546) 自 Jun 30 起一直处于开放状态，维护者曾针对回归问题对其进行过刷新；大约两个半月后，仍在等待维护者评审。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*