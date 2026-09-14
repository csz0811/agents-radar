# OpenClaw 生态日报 2026-09-14

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-14 00:23 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-14

数据来源：[github.com/openclaw/openclaw](https://github.com/openclaw/openclaw)

## 1. 今日概览

OpenClaw 正处于非常高活跃度的维护窗口：过去 24 小时内更新了 500 个 issue 和 500 个 PR，其中关闭 213 个 issue、合并/关闭 254 个 PR。没有发布新版本。主要工作流是更新/升级恢复、子代理完成与路由、会话/转录一致性，以及渠道隔离/安全。项目健康度喜忧参半：吞吐量强劲，若干回归问题已关闭，但围绕更新失败、Gateway 崩溃、消息丢失和内部上下文泄漏，仍有多个 P0/P1 issue 处于打开状态。维护者审查、产品和安全决策似乎是主要瓶颈，因为许多热门 issue 带有 `clawsweeper:needs-maintainer-review` 或 `clawsweeper:needs-product-decision`。

## 2. 发布

过去 24 小时内没有新版本发布（`Latest Releases: None`）。issue 中提及的活跃版本包括 2026.9.2、2026.9.3 和 2026.9.4。[PR #146170](https://github.com/openclaw/openclaw/pull/146170) 是一个经过 rebase 的 2026.9.5 插件/命令保留工作，但根据所提供的数据，没有可用的发布说明、破坏性变更或迁移说明。

## 3. 项目进展

- **PR 吞吐量：** 24 小时窗口内有 254 个 PR 被合并/关闭，不过评论数最多的 30 个 PR 均处于打开状态；样本中没有详细的已合并 PR 摘要。
- **更新/doctor/回滚可靠性栈通过打开的 PR 推进：** [#144811](https://github.com/openclaw/openclaw/pull/144811)、[#147581](https://github.com/openclaw/openclaw/pull/147581)、[#147583](https://github.com/openclaw/openclaw/pull/147583)、[#147588](https://github.com/openclaw/openclaw/pull/147588)、[#147544](https://github.com/openclaw/openclaw/pull/147544)、[#147562](https://github.com/openclaw/openclaw/pull/147562)、[#144836](https://github.com/openclaw/openclaw/pull/144836)。
- **子代理/会话可靠性：** [#147571](https://github.com/openclaw/openclaw/pull/147571) 解释了等待并将执行与结果投递分离；[#142018](https://github.com/openclaw/openclaw/pull/142018) 在活跃写入期间收敛投影；[#147585](https://github.com/openclaw/openclaw/pull/147585) 记录执行归属并结算孤立任务记录；[#147596](https://github.com/openclaw/openclaw/pull/147596) 在并发数为 1 时完成系统专家请求。
- **UI/i18n：** [#147590](https://github.com/openclaw/openclaw/pull/147590) 为 2026.9.5 完成 Apple 语言区域；[#147574](https://github.com/openclaw/openclaw/pull/147574) 在面板内加载 Home/System 忙碌状态；[#147540](https://github.com/openclaw/openclaw/pull/147540) 将已完成的 macOS 工作折叠到回复上方；[#147568](https://github.com/openclaw/openclaw/pull/147568) 在提及/登录之间保持关联人员一致；[#143489](https://github.com/openclaw/openclaw/pull/143489) 将会话引用渲染为强调色链接。
- **已关闭/已更新且表明修复或清理的 issue：** [#135111](https://github.com/openclaw/openclaw/issues/135111) 格式错误的 JSON 工具调用参数；[#85030](https://github.com/openclaw/openclaw/issues/85030) MCP 工具未注入子代理；[#137927](https://github.com/openclaw/openclaw/issues/137927) 内部上下文泄漏到 Telegram；[#140162](https://github.com/openclaw/openclaw/issues/140162) Windows Gateway 重启；[#145563](https://github.com/openclaw/openclaw/issues/145563) 微信回复分发；[#146958](https://github.com/openclaw/openclaw/issues/146958) 2026.9.2→9.3 更新失败；[#145503](https://github.com/openclaw/openclaw/issues/145503) skill_workshop 注册；[#27445](https://github.com/openclaw/openclaw/issues/27445) announceTarget 路由。

## 4. 社区热点话题

按评论数计，最活跃的 issue 明显集中在渠道泄漏、进程/资源泄漏、子代理可靠性，以及更新/Gateway 稳定性。所提供的数据中没有 PR 评论数（热门 PR 的 `Comments: undefined`）。

| 条目 | 状态 | 活跃度 | 底层需求 |
|---|---|---:|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) 工具调用之间的文本泄漏到消息渠道 | OPEN，P1 diamond lobster | 40 条评论，👍 1 | 内部代理处理与用户可见渠道输出之间严格隔离；安全/会话状态隔离。 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) 未回收的 hook/tool 子进程导致僵尸进程累积 | OPEN，P1 silver shellfish | 30 条评论，👍 1 | 可靠的子进程生命周期与运行时资源清理。 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) 子代理完成事件静默丢失 | OPEN，P1 diamond lobster | 28 条评论，👍 2 | 持久化的子代理编排：重试、通知、超时恢复。 |
| [#135111](https://github.com/openclaw/openclaw/issues/135111) 格式错误的 JSON 工具调用参数 | CLOSED，P1 platinum hermit | 27 条评论 | 提供商/工具调用健壮性与更好的诊断。 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) Codex PreToolUse hook 中继 CPU 占用导致 gateway RPC 停滞 | OPEN，P0 silver shellfish | 23 条评论，👍 2 | Hook 执行隔离、背压和 gateway 响应性。 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) 同步持久化阻塞 Gateway 事件循环 | OPEN，P1 diamond lobster | 19 条评论 | 面向转录/会话持久化的异步 I/O 与扩展。 |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) 跨渠道重复的转录、重放、上下文组装 | OPEN，P1 silver shellfish | 15 条评论 | 跨渠道的规范化转录/上下文流水线。 |
| [#85030](https://github.com/openclaw/openclaw/issues/85030) MCP 工具未注入子代理 | CLOSED，P1 diamond lobster | 14 条评论，👍 6 | 正确的子代理工具权限、schema 注入和允许列表。 |
| [#137927](https://github.com/openclaw/openclaw/issues/137927) 内部上下文块泄漏到 Telegram 文本 | CLOSED，P1 | 14 条评论 | 内部脚手架绝不能出现在用户渠道中。 |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) SQLite 记忆表无界增长 | OPEN，P2 diamond lobster | 14 条评论 | 记忆索引和嵌入缓存的保留/逐出策略。 |

**分析：** 用户和维护者正在应对复杂多渠道、多后端代理运行时的后果。参与度最高的 issue 并非表面问题；它们涉及信任边界（用户看到什么）、数据完整性（丢失了什么）和运行时稳定性（什么会崩溃或泄漏）。子代理编排是一个反复出现的主题：完成宣告、等待、超时和终态处理出现在许多热门 issue 中。

## 5. Bug 与稳定性

### P0 / 阻塞发布

| Issue | 状态 | 症状 | 修复信号 |
|---|---|---|---|
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | OPEN | Codex PreToolUse hook 中继生成 CPU 密集的 `openclaw-hooks` 进程，并导致 Gateway RPC 停滞。 | 未注明新的修复 PR。 |
| [#146394](https://github.com/openclaw/openclaw/issues/146394) | OPEN | 更新失败：在 2026.9.3 上出现 `global-install-failed`。 | 需要维护者关注。 |
| [#145252](https://github.com/openclaw/openclaw/issues/145252) | OPEN | 跟踪 issue：2026.9.3 / 2026.9.4 更新、升级和恢复可靠性。 | 协调索引。 |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) | OPEN | 2026.9.2 → 2026.9.4 托管更新在 candidate-Doctor 阶段失败，然后回滚。 | 未注明新的修复 PR。 |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | OPEN | 代理 SQLite WAL 增长到 1.4–2.8 GB，并阻塞 Windows 上的 Gateway 启动。 | 需要信息；没有新的修复 PR。 |
| [#143334](https://github.com/openclaw/openclaw/issues/143334) | OPEN | 丢失的子代理完成事件将请求方置于 settle-yield 并饿死排队的用户消息。 | 未注明新的修复 PR。 |
| [#147160](https://github.com/openclaw/openclaw/issues/147160) | OPEN | 更新失败：2026.9.4 上的 `finalize:doctor`。 | 需要信息。 |
| [#146958](https://github.com/openclaw/openclaw/issues/146958) | CLOSED | 2026.9.2 → 2026.9.3 更新因 llm-task 包所有者元数据而失败，服务停止。 | 已关闭。 |
| [#140162](https://github.com/openclaw/openclaw/issues/140162) | CLOSED | Windows gateway 重启会杀死已就绪/启动缓慢的 gateway，并漏掉前台 gateway。 | 已关闭。 |
| [#145563](https://github.com/openclaw/openclaw/issues/145563) | CLOSED | 微信回复分发失败，报 `PreparedModelCatalogConfigReplacedError`。 | 已关闭。 |

### P1 / 高影响

| Issue | 状态 | 症状 | 修复信号 |
|---|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | OPEN | 工具调用之间的文本泄漏到消息渠道。 | 关联 PR 已打开；需要安全/产品审查。 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | OPEN | Hook/tool 子进程泄漏为僵尸进程，导致运行时性能下降。 | 没有新的修复 PR。 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | OPEN | 子代理完成事件静默丢失；没有重试、通知或自动重启。 | 没有新的修复 PR。 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | OPEN | 同步持久化/转录维护阻塞 Gateway 事件循环。 | 没有新的修复 PR。 |
| [#139847](https://github.com/openclaw/openclaw/issues/139847) | OPEN | 在回复运行活跃期间发送的消息被丢弃；2026.9.2 中的回归。 | `fix-shape-clear`、`queueable-fix`。 |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | OPEN | MCP 服务器初始化超时通过未处理的 rejection 导致 Gateway 崩溃。 | `fix-shape-clear`、`queueable-fix`。 |
| [#141474](https://github.com/openclaw/openclaw/issues/141474) | OPEN | Collector 子进程调用 `sessions_yield` 会使 `agents_wait` 搁浅；`outputSchema` 在 claude-cli 上无效。 | 需要维护者审查。 |
| [#132765](https://github.com/openclaw/openclaw/issues/132765) | OPEN | `agents_wait` 忽略 `timeoutSeconds`；约 60 秒后终止。 | 没有新的修复 PR。 |
| [#137332](https://github.com/openclaw/openclaw/issues/137332) | OPEN | 混合终态请求方结算批次在所有权检查后永远重试。 | `fix-shape-clear`、`queueable-fix`。 |
| [#145152](https://github.com/openclaw/openclaw/issues/145152) | OPEN | 卡住会话恢复将强制清除报告为中止，且未指明运行/所有者身份。 | `fix-shape-clear`、`queueable-fix`。 |
| [#113701](https://github.com/openclaw/openclaw/issues/113701) | OPEN | 大型工具输出超出上下文；压缩无法恢复；会话进入失败循环。 | 需要产品决策。 |
| [#101929](https://github.com/openclaw/openclaw/issues/101929) | OPEN | 上下文溢出预检查对 token 的计数比计费用量高约 2.3–2.6 倍。 | `fix-shape-clear`。 |
| [#144809](https://github.com/openclaw/openclaw/issues/144809) | OPEN | claude-cli 长轮次会丢失整个生成的回复；一个 42 秒轮次也会同样失败。 | 需要信息。 |
| [#81182](https://github.com/openclaw/openclaw/issues/81182) | OPEN | 溢出恢复在截断工具结果前等待完整的自动压缩超时。 | 关联 PR 已打开。 |

**稳定性评估：** P0 问题群主要由更新/升级可靠性和 gateway 崩溃构成。P1 主要由消息丢失、子代理编排挂起、上下文溢出处理，以及进程/资源泄漏构成。若干 P1 被标记为 queueable 或 fix-shape-clear，但许多仍缺少修复 PR，因此分诊能力仍是限制因素。

## 6. 功能请求与路线图信号

- **子代理完成/路由：** [#27445](https://github.com/openclaw/openclaw/issues/27445) 请求为子代理完成路由提供 `announceTarget`；该 issue 已关闭，且有关联 PR 打开。[PR #147571](https://github.com/openclaw/openclaw/pull/147571) 直接处理等待、执行和结果投递——这是下一个版本发布的强烈信号。
- **转录/会话 API：** [#79904](https://github.com/openclaw/openclaw/issues/79904)、[#79903](https://github.com/openclaw/openclaw/issues/79903) 和 [#79905](https://github.com/openclaw/openclaw/issues/79905) 请求游标式 SQLite 读取、持久会话谱系，以及类型化转录投影。它们以 stale 状态关闭，但底层需求仍在当前会话/投影 PR 中可见。
- **浏览器自动化：** [#60381](https://github.com/openclaw/openclaw/issues/60381) 请求为 click 提供 `force` 参数，并为现代前端框架暴露 `evaluate` 操作。
- **跨后端上下文：** [#79047](https://github.com/openclaw/openclaw/issues/79047) 请求在后端模型切换时保留对话上下文。
- **动态允许列表：** [#58057](https://github.com/openclaw/openclaw/issues/58057) 请求为 `dmPolicy`/`groupPolicy` 允许列表提供动态身份解析。
- **插件 SDK：** [PR #137880](https://github.com/openclaw/openclaw/pull/137880) 将允许受策略约束的 hook 枚举工具。
- **UI/UX：** [PR #147540](https://github.com/openclaw/openclaw/pull/147540)、[PR #147568](https://github.com/openclaw/openclaw/pull/147568)、[PR #143489](https://github.com/openclaw/openclaw/pull/143489) 和 [PR #147574](https://github.com/openclaw/openclaw/pull/147574) 表明围绕 macOS 转录、关联身份、会话引用和面板加载的持续打磨。

**预测：** 下一条发布/更新线很可能优先考虑更新/doctor/回滚可靠性、子代理等待/结果投递语义、会话投影收敛，以及 Apple locale/UI 打磨。更大的功能请求，如跨后端上下文保留、动态允许列表和浏览器工具 force/evaluate，除非有维护者采纳，否则可能仍留在待办中。

## 7. 用户反馈总结

- **更新可靠性是最响亮的痛点。** 用户报告更新导致服务停止、回滚循环、Doctor 失败和迁移阻塞：[#146394](https://github.com/openclaw/openclaw/issues/146394)、[#145192](https://github.com/openclaw/openclaw/issues/145192)、[#147160](https://github.com/openclaw/openclaw/issues/147160)、[#146958](https://github.com/openclaw/openclaw/issues/146958)、[#145252](https://github.com/openclaw/openclaw/issues/145252)。
- **静默的消息/数据丢失会侵蚀信任。** 报告包括活跃回复期间消息被丢弃、子代理完成事件丢失，以及 claude-cli 回复消失：[#139847](https://github.com/openclaw/openclaw/issues/139847)、[#44925](https://github.com/openclaw/openclaw/issues/44925)、[#144809](https://github.com/openclaw/openclaw/issues/144809)、[#143334](https://github.com/openclaw/openclaw/issues/143334)、[#132765](https://github.com/openclaw/openclaw/issues/132765)。
- **安全/隐私泄漏是首要担忧。** 内部工具调用文本和运行时上下文已泄漏到可见的 Telegram/Slack/消息渠道：[#25592](https://github.com/openclaw/openclaw/issues/25592)、[#137927](https://github.com/openclaw/openclaw/issues/137927)。
- **资源耗尽会影响长时间运行的部署。** 僵尸进程、CPU 密集的 hook 中继、无界的 SQLite WAL，以及记忆表增长反复出现：[#97616](https://github.com/openclaw/openclaw/issues/97616)、[#91009](https://github.com/openclaw/openclaw/issues/91009)、[#143524](https://github.com/openclaw/openclaw/issues/143524)、[#114612](https://github.com/openclaw/openclaw/issues/114612)、[#118885](https://github.com/openclaw/openclaw/issues/118885)。
- **多渠道/后端摩擦仍然很高。** 用户报告了 Telegram、WeChat、Discord、iMessage/BlueBubbles、Feishu、Docker 沙箱挂载、MCP 工具注入子代理，以及 Node v26 gzip 处理的问题：[#31331](https://github.com/openclaw/openclaw/issues/31331)、[#85030](https://github.com/openclaw/openclaw/issues/85030)、[#79752](https://github.com/openclaw/openclaw/issues/79752)、[#145563](https://github.com/openclaw/openclaw/issues/145563)。
- **情绪：** 用户参与度很高，并提供了详细复现，但挫败感集中在回归、更新失败，以及高严重度报告与维护者/产品决策之间的时间差。

## 8. 积压待办观察

需要维护者关注的重要长期未答复或高评论量事项：

| 条目 | 创建时间 | 活跃度 / 状态 | 为何关注 |
|---|---:|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 2026-02-24 | 40 条评论，OPEN，P1 diamond lobster | 安全/会话状态泄漏；需要产品/安全审查，且关联 PR 已打开。 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 2026-06-29 | 30 条评论，OPEN，P1 | 僵尸进程累积；长时间运行导致运行时退化。 |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 2026-03-13 | 28 条评论，OPEN，P1 diamond lobster | 子代理完成事件静默丢失；核心编排可靠性。 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | 2026-06-06 | 23 条评论，OPEN，P0 | CPU 密集的 hook 中继导致 Gateway RPC 停滞；影响发布。 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 2026-08-05 | 19 条评论，OPEN，P1 diamond lobster | 规模化下 Gateway 事件循环阻塞。 |
| [#69208](https://github.com/openclaw/openclaw/issues/69208) | 2026-04-20 | 15 条评论，OPEN，maintainer/P1 | 跨渠道重复转录/重放/上下文组装的伞形 issue。 |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) | 2026-07-27 | 14 条评论，OPEN，P2 | SQLite 记忆表没有保留策略；磁盘耗尽风险。 |
| [#31331](https://github.com/openclaw/openclaw/issues/31331) | 2026-03-02 | 9 条评论，OPEN，P1 | Docker 安装 + 沙箱 `workspaceAccess` 损坏。 |
| [#81182](https://github.com/openclaw/openclaw/issues/81182) | 2026-05-12 | 6 条评论，OPEN，P1 diamond lobster | 溢出恢复等待完整超时；关联 PR 已打开。 |
| [#86214](https://github.com/openclaw/openclaw/issues/86214) | 2026-05-24 | 8 条评论，OPEN，P1 | Codex app-server 客户端在大型日志时于轮次中途关闭。 |
| [PR #124467](https://github.com/openclaw/openclaw/pull/124467) | 2026-08-16 | OPEN，等待作者 | QA 线程身份重构；长期运行的栈。 |
| [PR #144811](https://github.com/openclaw/openclaw/pull/144811) | 2026-09-11 | OPEN，等待作者 | 更新健康检查失败显示；更广泛更新器可靠性的一部分。 |
| [PR #145043](https://github.com/openclaw/openclaw/pull/145043) | 2026-09-11 | OPEN，等待作者 | 防止陈旧的 Codex 迁移阻塞升级。 |
| [PR #140423](https://github.com/openclaw/openclaw/pull/140423) | 2026-09-06 | OPEN，需要证明 | 在活跃运行期间禁用 iOS 分支切换；兼容性风险。 |
| [PR #146170](https://github.com/openclaw/openclaw/pull/146170) | 2026-09-12 | OPEN，rebase 进行中 | 在变基后的 2026.9.5 中保留插件命令/更新。 |
| [PR #142018](https://github.com/openclaw/openclaw/pull/142018) | 2026-09-08 | OPEN，可供维护者查看 | 活跃写入期间的会话投影收敛。 |
| [PR #137880](https://github.com/openclaw/openclaw/pull/137880) | 2026-09-04 | OPEN，可供维护者查看 | 受策略约束的 hook 枚举工具；插件 SDK 能力。 |

---

## 横向生态对比

# 跨项目对比报告——个人 AI 助手 / Agent 开源生态
**日期：2026-09-14** · 来源：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw 社区摘要

---

## 1. 生态概览

2026 年 9 月的个人 AI 助手开源格局，由**可靠性与信任工程，而非新能力**主导。本样本中每个活跃项目都在应对同一类问题——并发下的状态持久化、静默的数据/消息丢失、渠道隔离，以及更新/安装完整性——这表明该品类已从“演示软件”跨入部署加固阶段。按规模看，**OpenClaw 是明确的参考实现**（其 issue/PR 流转速度约为最接近同行的 10 倍），而 **Hermes、ZeroClaw 和 QwenPaw** 则在桌面控制、安全/治理、轻量级以提供商为中心的 agent 等方向追求差异化生态位。**IronClaw** 在本窗口内实际处于休眠状态，只有机器人驱动的依赖更新。总体而言，维护者的评审/决策带宽——而非贡献者供给——才是进展的硬约束。

---

## 2. 活动对比

| 项目 | 24 小时内更新的 Issue | 已关闭 Issue | 24 小时内更新的 PR | 已合并/关闭 PR | 发布状态 | 健康评分* |
|---|---:|---:|---:|---:|---|---:|
| **OpenClaw** | ~500 | 213 (43%) | ~500 | 254 (51%) | 无（2026.9.2–9.4 进行中；9.5 待发布） | **6.5 / 10** |
| **Hermes Agent** | 50 | 18 (36%) | 50 | 13 (26%) | 无 | **6.0 / 10** |
| **ZeroClaw** | 37 | 5 (14%) | 50 | **0 (0%)** | 无（v0.8.5 稳定化分支） | **4.5 / 10** |
| **QwenPaw** | 6 | ≥1 | 8 | ≥1 | 无（当前 v2.2.1） | **5.5 / 10** |
| **IronClaw** | **0** | 0 | 5 | 1 (20%) | 无 | **4.5 / 10** |

\* **健康评分**是基于摘要得出的分析师综合评分（1–10），由四个维度构成：活动/参与度、合并吞吐量、未解决严重 bug 负载（反向计分）和评审响应速度。它不是官方项目指标。

**解读：** OpenClaw 和 Hermes 能将活动大规模转化为关闭项。ZeroClaw 参与度很高，但**零代码落地**——这是本组中最尖锐的吞吐量异常。IronClaw 的低分反映的是休眠，而非不稳定。

---

## 3. OpenClaw 的定位

**规模优势是结构性的，而非增量式的。** 24 小时内触及 500 个 issue + 500 个 PR，并有 254 个 PR 合并/关闭，OpenClaw 的运行量级高于同行一个数量级——在 PR 量上约为 Hermes 的 10 倍、ZeroClaw 的 13 倍、QwenPaw 的 80 倍。这意味着其贡献者和部署者基础显著更大，回归检测循环也更快。

**覆盖面的广度。** OpenClaw 是唯一可见多渠道路由矩阵的项目，覆盖 Telegram、WeChat、Discord、iMessage/BlueBubbles、Feishu，外加 Docker 沙箱执行和 MCP 工具注入。同行则更窄：Hermes 以 Desktop/Dashboard + WhatsApp/CS 部署为中心；ZeroClaw 聚焦安全原语和提供商路由；QwenPaw 聚焦带 ACP 和提供商目录的桌面聊天 UI。

**技术路线。** OpenClaw 实现了**网关 + 子 agent 编排运行时**，具备会话/转录投影、SQLite 持久化、带策略绑定钩子的插件 SDK，以及显式的更新/doctor/回滚栈——这是平台架构而非应用。Hermes 偏向 Desktop 优先，搭配托管 Nous 网关和 `browser_exec`；ZeroClaw 使用 Rust，变更受治理门控，并有强大的认证/身份层（OIDC、RPC 主体、shell 权限策略）；QwenPaw 更轻量，面向 Python/AgentScope，提供商接入快。

**OpenClaw 落后之处。** 其评审瓶颈按比例看很严重：头部 issue 带有 `needs-maintainer-review` / `needs-product-decision`，核心 P0（更新失败、hook 中继 CPU 卡顿、WAL 增长）仍未关闭且没有修复 PR。同行在小修复上的单个 issue 周转更快——Hermes 曾为四个 issue 当日提交修复 PR，ZeroClaw 展现出有纪律的分诊标签——恰恰因为它们的体量可控。

---

## 4. 共同技术重点领域

六类需求集群在两个或更多项目中反复出现：

1. **并发下的持久状态持久化** — *OpenClaw*（同步持久化阻塞事件循环 #119720；WAL 增长阻塞 Windows 启动 #143524），*Hermes*（多进程 `state.db` WAL unlink，`DeletedWalGenerationError` #109727/#110106/#109946），*ZeroClaw*（失败的回合会丢弃 prompt + 工具历史 #10788），*QwenPaw*（会话 + 模型配置丢失 #7724）。**需求：** 多进程安全存储、异步 I/O、保留/驱逐策略。

2. **渠道隔离与输出完整性** — *OpenClaw*（工具调用文本泄漏到 Telegram/Slack #25592、#137927），*Hermes*（运维诊断信息泄漏到客户 WhatsApp #107899），*QwenPaw*（任务输出隐藏在 thinking/steps 内 #7709），*ZeroClaw*（通知重新同步会取消运行中的回合 #10785）。**需求：** 将内部脚手架与用户可见输出硬隔离。

3. **编排持久性（至少一次投递）** — *OpenClaw*（静默丢失子 agent 完成事件 #44925；`agents_wait` 超时 bug #132765；settle-yield 饥饿 #143334），*Hermes*（cron 触发认领丢弃未来时槽 #110412；成功运行被错误记账 #108862），*ZeroClaw*（SOP 在 schema 拒绝前推进步骤 #10066），*QwenPaw*（定时任务不产出任何内容 #7709）。**需求：** 重试、通知、超时恢复、终态记账。

4. **上下文/记忆管理** — *OpenClaw*（无界记忆表 #114612；溢出恢复 #81182；token 过度计数 #101929），*QwenPaw*（agent 自主压缩 + 驱逐前警告 #7733；指令/范围漂移 #7571），*ZeroClaw*（上下文压缩锚定到模型窗口 #9535）。**需求：** 确定性、可观测的驱逐，而非静态阈值。

5. **凭证与密钥处理** — *Hermes*（尽管有 `redact_secrets`，`state.db` 中仍存在未脱敏密钥 #110416；OAuth 刷新令牌被擦除 #62333），*ZeroClaw*（OIDC 提供商 #10255、认证 RPC 主体 #10259、shell 权限策略 #10610），*OpenClaw*（动态 dmPolicy/groupPolicy 允许列表 #58057）。**需求：** 默认脱敏、认证持久性、策略绑定的工具权限。

6. **安装/更新/升级可靠性** — *OpenClaw*（doctor/回滚更新栈，#146394、#145192、#147160），*Hermes*（Windows 安装器 shim + 托管 `uv` 自愈 #110421），*ZeroClaw*（crates.io 打包后续工作 #9381），*QwenPaw*（Docker 中预装 CLI 工具 #3429，现已关闭）。**需求：** 可恢复升级与可复现环境。

---

## 5. 差异化分析

| 维度 | OpenClaw | Hermes | ZeroClaw | QwenPaw | IronClaw |
|---|---|---|---|---|---|
| **主要焦点** | 多渠道网关 + 子 agent 编排平台 | Desktop/Dashboard 控制面 + 托管网关 | 安全、身份、治理、本地优先网格 | 轻量级桌面 agent + 提供商目录 | Rust/WASM 运行时（当前仅维护） |
| **语言/技术栈** | Node/TS 风格网关 + SQLite | Python/TS Desktop + 网关 + TUI | Rust | Python（AgentScope）+ Desktop UI | Rust / WASM（Wasmtime） |
| **目标用户** | 重度部署者、多渠道运营者 | 桌面用户、CS/生产部署 | 注重安全者、多设备/家庭用户 | 个人开发者、插件构建者 | 生态周边/基础设施集成者 |
| **差异化押注** | 插件 SDK + 策略绑定钩子；渠道广度 | 多 profile 一等支持；实时本地网关作为后端（#109891） | RFC/ADR 治理；OIDC、RPC 主体、shell 策略 | 快速模型接入（DeepSeek V4 Flash）；ACP | 依赖/运行时现代化 |
| **弱点** | 规模化评审瓶颈；P0 更新/网关 bug | P1 存储集群；profile 生命周期脆弱 | 0 个 PR 合并；决策队列占主导 | 严重数据丢失 issue 缺少修复 PR | 无可见产品/用户活动 |

最清晰的架构分野是**治理速度 vs. 范围**：ZeroClaw 在流程（RFC 投票、评审证据规则、ADR 清单）和安全原语上投入很大，牺牲了吞吐量；OpenClaw 投入广度，交付最快，但积累高严重度债务。Hermes 和 QwenPaw 居于两者之间，优化桌面/生产易用性。

---

## 6. 社区动能与成熟度

**第 1 梯队——规模化快速迭代（OpenClaw）。** 变更最频繁、吞吐量最高、发布基础设施成熟（doctor/回滚），但 P0/P1 债务不断累积，维护者决策积压明显。迭代速度快于稳定速度。

**第 2 梯队——活跃且正在整合（Hermes、ZeroClaw）。**
- *Hermes*：贡献者响应健康（针对 #110180、#110417、#110419、#110425 的当日修复 PR），重复 PR 已合并整合，36% issue 关闭率。中等成熟度，经受真实多 profile 部署压力测试。
- *ZeroClaw*：流程成熟度和安全严谨度最高，但**24 小时内 0 个 PR 合并，而开放 PR 有 50 个**——治理是关键路径。报告质量高（#10603 获 3 个 👍），但落地停滞。

**第 3 梯队——早期/扩张中（QwenPaw）。** 体量小（6 个 issue / 8 个 PR），但 7 个开放 PR 中有 5 个来自首次贡献者——漏斗正在拓宽。积压项在推进（#4009、#3429 已关闭），但严重 issue（#7724、#7571、#7709）没有修复 PR，表明分诊与严重度不匹配。

**第 4 梯队——休眠（IronClaw）。** 0 个 issue 更新，仅有 5 个 Dependabot PR，一个 WASM 组自 2026-08-23 起开放等待评审。稳定但未演进；实际上处于维护模式。

**成熟度排名：** ZeroClaw（流程）> OpenClaw（基础设施）> Hermes（贡献者规范）> QwenPaw（早期）> IronClaw（休眠）。

---

## 7. 趋势信号

**对 AI agent 开发者而言，社区反馈指向以下行业转变：**

1. **并发正确性是新的可靠性前沿。** 多进程和多 profile 访问下的 SQLite WAL/`state.db` 处理，是最为共有的单一故障模式（Hermes P1 集群、OpenClaw WAL 增长、ZeroClaw 历史丢失、QwenPaw 会话丢失）。从第一天起就在存储设计中纳入多实例安全性；避免在事件循环上做同步 I/O。

2. **输出渠道是安全边界。** 内部工具调用文本、运行时上下文、运维诊断信息以及未脱敏凭证泄漏到用户可见渠道，均被视为最高严重度（OpenClaw #25592，Hermes #107899/#110416）。强制内部↔外部输出严格分离，并默认脱敏。

3. **静默丢失不可接受。** 丢失的子 agent 完成事件、被丢弃的消息、被丢弃的 cron 时槽，以及消失的会话，在高互动讨论中占主导。构建至少一次的任务投递，包含重试、通知、超时恢复和显式终态记账。

4. **上下文管理正变得由 agent 主导。** 需求已从固定 token 阈值，转向带驱逐前警告的 agent 参与式驱逐（QwenPaw #7733、ZeroClaw #9535、OpenClaw #81182/#101929）。可以预期，压缩/驱逐策略将成为一等、可检查的子系统。

5. **成本治理与提供商可靠性是产品特性。** 跨委派子循环的预算强制执行、重试/退避语义和回退链是反复出现的诉求（ZeroClaw #10635/#10645/#10787、Hermes 网页搜索回退 PR、QwenPaw 提供商目录）。多提供商路由需要确定性的成本和失败语义。

6. **升级/安装可靠性定义生产信任。** 可恢复更新、doctor 预检查和回滚现在是核心界面（OpenClaw 更新/doctor 栈、Hermes Windows 安装器、ZeroClaw 打包）。将升级视为经过测试的产品路径，而非事后补充。

7. **维护者决策带宽是生态的瓶颈。** OpenClaw 的 `needs-maintainer-review`/`needs-product-decision` 标签、ZeroClaw 的 RFC 决策队列（#8692）以及 Hermes 的 `needs-decision` 项（#40239、#109891）都表明，分阶段实现等待的是人工裁决，而非代码。那些将决策流程产品化的项目（清晰的分诊 SLA、委派所有权、与严重度对齐的修复分配），将在贡献者体量相同的情况下比同行交付更多。

8. **本地化完整性是成熟度信号。** pt-BR Desktop（Hermes #40239、QwenPaw #4009→#7734）和 Apple locale（OpenClaw #147590）表明，项目正在从英语优先的开发者受众向外扩展——同时，当翻译 PR 带着缺陷合并时，也暴露出质量控制缺口。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — 项目摘要
**日期：2026-09-14** · 仓库：[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
*数据说明：过去 24 小时内有 50 个 issue 和 50 个 PR 更新；本摘要反映了源数据中按评论数排序的前 30 个 issue / 20 个 PR。*

---

## 1. 今日概览

2026-09-14 的项目活动**量大且以稳定性为主导**。共涉及 50 个 issue（32 个仍开放，18 个已关闭——该时间窗口内关闭率为 36%），50 个 PR 有变动（37 个开放，13 个已合并/关闭——26%），且**未发布新版本**。最重要的信号是一组 **P1 `state.db` / `DeletedWalGenerationError` 缺陷**（[#109727](https://github.com/NousResearch/hermes-agent/issues/109727)、[#110106](https://github.com/NousResearch/hermes-agent/issues/110106)、[#109946](https://github.com/NousResearch/hermes-agent/issues/109946)），影响多进程和多 profile 部署，目前至少有一个缓解 PR 处于开放状态（[#110179](https://github.com/NousResearch/hermes-agent/pull/110179)）。次要活动集中在 Desktop 多 profile 会话元数据（两个相关 issue 已关闭）、cron 调度正确性，以及一个 pt-BR 本地化请求及其对应的实现 PR。开放 PR 队列（37 个）相对于已合并/关闭数量正在增长，值得关注。

**健康快照：** 社区吞吐量旺盛，但存储层并发/持久化缺陷不断累积，表明项目正在被真实的多 profile 和多进程部署以快于修复落地的速度进行压力测试。

---

## 2. 发布

**过去 24 小时内无新发布。** 本时间窗口内没有版本变更日志、破坏性变更或迁移说明需要报告。

---

## 3. 项目进展

### 已关闭/解决的 issue（按活动量可见排名）
- [#102792](https://github.com/NousResearch/hermes-agent/issues/102792) **[已关闭, P1]** — Desktop 项目侧边栏/标签页“+”在多 profile 安装中丢失 owner 元数据 → 立即出现“Couldn't open this session”。11 条评论 —— 当日讨论最多的条目之一。
- [#108369](https://github.com/NousResearch/hermes-agent/issues/108369) **[已关闭, 重复, P2]** — 同一缺陷家族：非默认 profile 上的标签条“+”会创建一个未列出的会话，破坏 `session.control.read`。
- [#62333](https://github.com/NousResearch/hermes-agent/issues/62333) **[已关闭, P2]** — 每次刷新都会擦除 OAuth `refresh_token`，导致通过 OAuth 认证的 MCP 服务器在登录约 1 小时后失效。这个长期存在（自 2026-07-10 起）的安全边界 bug 现已关闭。
- [#67358](https://github.com/NousResearch/hermes-agent/issues/67358) **[已关闭, P3]** — Lark/Feishu WebSocket 正常关闭（代码 1000）导致整个 gateway 崩溃；优雅断开处理已解决。
- [#108302](https://github.com/NousResearch/hermes-agent/issues/108302) **[已关闭, P2]** — 由于缺少 profile→全局根认证回退，Managed Tool Gateway 在 bot profile 上不可用。
- [#108862](https://github.com/NousResearch/hermes-agent/issues/108862) **[已关闭, P1]** — Cron 投递阶段超过 30 秒，导致 fire-claim 心跳饥饿，将成功运行记为失败。
- [#108549](https://github.com/NousResearch/hermes-agent/issues/108549) **[已关闭, P3]** — Kanban 通知器每 5 秒轮询一次，且没有配置开关。
- [#108383](https://github.com/NousResearch/hermes-agent/issues/108383) **[已关闭, P2]** — Dashboard `/chat` 会话卡在“Setup Required”，而 CLI 可以正常工作。
- [#85209](https://github.com/NousResearch/hermes-agent/issues/85209) **[已关闭, P3, 👍3]** — 模型选择器显示了模型不支持的推理强度级别。

### 已合并/关闭的 PR
- [#85246](https://github.com/NousResearch/hermes-agent/pull/85246) **[已关闭]** — `fix(reasoning)`：在 Desktop/Dashboard 模型选择器中隐藏不支持的 effort 选项（关闭 #85209）。
- [#110359](https://github.com/NousResearch/hermes-agent/pull/110359) **[已关闭, 安全]** — `fix(kanban)`：SQLite 触发器拒绝来自非规范写入者的 status/result 写入 —— 一次有意义的数据完整性加固。
- [#110378](https://github.com/NousResearch/hermes-agent/pull/110378) **[已关闭, 重复]** — Windows 安装程序 shim 解析 + 受管 `uv` 自愈（由 [#110421](https://github.com/NousResearch/hermes-agent/pull/110421) 取代）。
- [#28559](https://github.com/NousResearch/hermes-agent/pull/28559) **[已关闭, 重复]** — web_search 回退链（由 [#23315](https://github.com/NousResearch/hermes-agent/pull/23315) 取代）。

**净进展：** 当日可衡量的成果包括 Desktop 会话元数据、MCP OAuth 持久化、cron 心跳正确性、Kanban 写入完整性以及模型选择器 UX。两个重复 PR 关闭并归入规范 PR（#110421、#23315），表明维护者正在积极整合嘈杂的贡献队列。

---

## 4. 社区热门话题

| 排名 | 条目 | 评论 / 👍 | 信号 |
|---|---|---|---|
| 1 | [#40239](https://github.com/NousResearch/hermes-agent/issues/40239) pt-BR Desktop 本地化 **[开放, 需要决策]** | 12 / 👍4 | 互动量最高的 issue；用户指出后端/TUI 已经包含 `locales/pt.yaml`，因此这是 Desktop 完成度上的缺口。 |
| 2 | [#102792](https://github.com/NousResearch/hermes-agent/issues/102792) 多 profile 新建会话失败 **[已关闭, P1]** | 11 / 👍0 | 多 profile 安装是一种真实且流行的配置。 |
| 3 | [#109727](https://github.com/NousResearch/hermes-agent/issues/109727) 第二个 Hermes 进程 unlink 活跃 WAL **[开放, P1]** | 8 / 👍0 | 即使是只读命令（`hermes sessions list`）也可能使正在运行的 gateway 陷入困境。 |
| 4 | [#62333](https://github.com/NousResearch/hermes-agent/issues/62333) MCP OAuth token 擦除 **[已关闭]** | 5 / 👍0 | MCP 集成中的认证持久性。 |
| 5 | [#108369](https://github.com/NousResearch/hermes-agent/issues/108369) Desktop 会话 bug 的重复项 **[已关闭]** | 5 / 👍0 | 进一步说明 #102792 是系统性缺陷，而非一次性问题。 |
| 6 | [#105427](https://github.com/NousResearch/hermes-agent/issues/105427) gateway 生命周期扫描器误报 **[开放, P3]** | 4 / 👍0 | 防护栏拒绝良性 Python 收集器 —— 给 cron 用户带来误报摩擦。 |
| 7 | [#109480](https://github.com/NousResearch/hermes-agent/issues/109480) Web UI 中的 Profile 损坏 **[开放, 需要复现, P3]** | 4 / 👍0 | Profile 切换无法重启 gateway / 聊天停留在 `default`。 |
| 8 | [#110106](https://github.com/NousResearch/hermes-agent/issues/110106) 并发 `tui_gateway` 进程冲击 WAL **[开放, P1]** | 4 / 👍0 | 会话在回合中途静默死亡。 |

**底层需求：** (a) **多 profile 支持在用户心中是一等公民，但在存储/生命周期代码中尚不稳健**；(b) **围绕 `state.db` 的并发安全** 现在是头号系统性问题；(c) **本地化完整性** —— 已经拥有后端翻译的用户希望 Desktop 达到同等水平。

---

## 5. Bug 与稳定性

按严重程度排序，基于 2026-09-13/14 更新或创建的 issue。

### P1 — 严重
1. **[#109727](https://github.com/NousResearch/hermes-agent/issues/109727)** — 在 Linux 上，任何其他 Hermes 进程打开 `state.db` 都会 unlink 活跃的 `-wal`/`-shm`；正在运行的 gateway 会陷入 `DeletedWalGenerationError`。*修复 PR 已存在：* [#110179](https://github.com/NousResearch/hermes-agent/pull/110179)（“refuse held state.db publish; replay diverted transcripts”）。
2. **[#110106](https://github.com/NousResearch/hermes-agent/issues/110106)** — 同一 profile 上多个并发 `tui_gateway` 进程冲击 WAL 退役；agent 会话在回合中途静默死亡。与上述缺陷同类。
3. **[#109946](https://github.com/NousResearch/hermes-agent/issues/109946)** — Desktop/dashboard 全 profile 侧边栏轮询每个 profile 的 DB，在**活跃** profile gateway 中触发 deleted-WAL 检测。可直接归因于新的 Desktop 侧边栏行为。
4. **[#102792](https://github.com/NousResearch/hermes-agent/issues/102792)** *(已关闭)* — 通过“+”创建多 profile 会话完全损坏。

### P2 — 高
5. **[#110170](https://github.com/NousResearch/hermes-agent/issues/110170)** — `_atomic_write` 故障清理 trap 逃逸深了一层，因此临时文件永远不会被删除（`.hermes-tmp.*` 垃圾）。*修复 PR：* [#110180](https://github.com/NousResearch/hermes-agent/pull/110180)。
6. **[#110412](https://github.com/NousResearch/hermes-agent/issues/110412)** — 非 tick 时刻的 cron 触发认领了未来 occurrence 身份，永久静默丢弃该槽位。*修复 PR：* [#110419](https://github.com/NousResearch/hermes-agent/pull/110419)。
7. **[#107899](https://github.com/NousResearch/hermes-agent/issues/107899)** — 面向客户的 WhatsApp 聊天收到仅限操作员的诊断信息（turn-budget、verifier 消息、provider 错误、home-channel prompt）—— 生产环境中观察到 5 种不同的泄漏。
8. **[#108310](https://github.com/NousResearch/hermes-agent/issues/108310)** **[需要复现]** — 使用受管 Nous gateway + 真实 profile 的 `browser_exec` 在没有凭据的情况下路由到 direct-API，或启动一个在附加前就死亡的 Chrome。
9. **[#110392](https://github.com/NousResearch/hermes-agent/issues/110392)** — 缺少 `refs/heads` 的 Checkpoint 存储会永久损坏；自修复仅在 gc 成功后才运行 → 静默地完全丢失回滚能力。
10. **[#90683](https://github.com/NousResearch/hermes-agent/issues/90683)** **[需要复现]** — 回合后后台审查作为守护线程运行；短生命周期的 CLI/kanban worker 会在请求中途杀死它。
11. **[#109024](https://github.com/NousResearch/hermes-agent/issues/109024)** — 多路复用 Docker `MEDIA:` 解析回退到环境默认 profile，丢弃有效附件。

### P3 — 中等
12. **[#110416](https://github.com/NousResearch/hermes-agent/issues/110416)** *(今日新增)* — **会话存储以未脱敏方式持久化凭据**，出现在 `content`、`tool_calls` 和 `reasoning` 中，即使设置了 `security.redact_secrets: true`，并且审批建议会重新打印它们。*修复 PR：* [#110425](https://github.com/NousResearch/hermes-agent/pull/110425) 在 `hermes approvals suggest` 中掩码凭据。
13. **[#76947](https://github.com/NousResearch/hermes-agent/issues/76947)** **[需要复现]** — Linux + AMD RX 7900 XTX 上的 Desktop 渲染器崩溃循环（`exitCode=5`），尽管禁用了 GPU 并设置了堆标志，仍然持续；自 2026-08-02 起开放。
14. **[#105427](https://github.com/NousResearch/hermes-agent/issues/105427)** — Gateway 生命周期扫描器对 Python 目录字面量 / 绝对解释器二进制路径产生误报。
15. **[#110414](https://github.com/NousResearch/hermes-agent/issues/110414)** *(今日新增)* — iOS Safari：键盘打开时，dashboard `/chat` 会跳离输入行。*修复 PR：* [#110417](https://github.com/NousResearch/hermes-agent/pull/110417)。
16. **[#109949](https://github.com/NousResearch/hermes-agent/issues/109949)** — `tools/bot_desktop/install.py` 中的“每个 profile 一次安装”锁是进程本地的，因此 CLI 和 Desktop 可以并发安装。
17. **[#110402](https://github.com/NousResearch/hermes-agent/issues/110402)** **[需要复现]** — 技能遵循失败：agent 在行动前忽略自己加载的技能文件。
18. **[#108088](https://github.com/NousResearch/hermes-agent/issues/108088)** — Bot Mode 中继在远程主 Desktop 上永久保持本地后端存活（30 秒 WebSocket 扰动，composer/dictation 焦点丢失）。

**评估：** WAL/`state.db` 系列显然是稳定性优先事项 —— 三个 P1、一个共同根因、一个开放的缓解 PR。值得注意的是，**今天已有四个非 WAL bug 的修复 PR**（#110179、#110180、#110419、#110417），表明贡献者响应积极健康。

---

## 6. 功能请求与路线图信号

**最有可能接下来落地（issue + 实现已开放）：**
- **pt-BR Desktop 本地化** — [#40239](https://github.com/NousResearch/hermes-agent/issues/40239)（12 条评论，👍4，创建于 2026-06-06）与 PR [#92590](https://github.com/NousResearch/hermes-agent/pull/92590) 配对（将 `pt-BR` 添加到 `agent/i18n.py` + 约 3,400 行翻译）。长期运行并明确标记为 `needs-decision`；后端和 TUI 已经包含葡萄牙语，因此这是自然的下一步完成工作。
- **Desktop 中自定义 `.env` / 环境变量键管理** — [#50390](https://github.com/NousResearch/hermes-agent/issues/50390) 与 PR [#110415](https://github.com/NousResearch/hermes-agent/pull/110415) 配对（使用现有 `GET/PUT /api/env` 自定义分类后端的添加键表单）。
- **Web 搜索/提取回退链** — PR [#68524](https://github.com/NousResearch/hermes-agent/pull/68524)（`web_extract` 回退链，标记为 `sweeper:blast-moderate`）和 PR [#23315](https://github.com/NousResearch/hermes-agent/pull/23315)（`web.search_fallback_backends`）。由 Brave Search 每月 2k 免费额度等具体限制驱动。
- **模型选择器中的推理强度过滤** — 已通过 [#85246](https://github.com/NousResearch/hermes-agent/pull/85246) 关闭；预计在下一版本中发布。

**需要决策的架构信号：**
- [#109891](https://github.com/NousResearch/hermes-agent/issues/109891) **[需要决策]** — “将活跃本地 gateway 作为一等 Desktop 后端”，同时保留 `hermes serve` 作为兼容路径，直到本地 Desktop 对等以及远程 Dashboard/URL/Cloud/SSH 迁移准备就绪。这是当前队列中杠杆最高的路线图问题，并且与上述 profile/生命周期 bug 相邻。

**更长远的诉求：**
- [#50390](https://github.com/NousResearch/hermes-agent/issues/50390) 泛化为“自带 API/provider”工作流。
- [#109891](https://github.com/NousResearch/hermes-agent/issues/109891) 意味着 Desktop 将成为主要控制面，而非客户端。

---

## 7. 用户反馈总结

**痛点（以用户自己的表述）：**
- **多 profile 安装很脆弱。** 用户报告从侧边栏/标签页“+”新建会话直接失败，profile 在 Web UI 中无法重启 gateway（[#109480](https://github.com/NousResearch/hermes-agent/issues/109480)），以及切换 profile 后聊天仍绑定到 `default`。两个 P1 issue 都是从同一界面提交的。
- **持久化和并发信任正在受到侵蚀。** [#109727](https://github.com/NousResearch/hermes-agent/issues/109727) 尤其引人注目，因为*运行只读命令*（`hermes sessions list`、`hermes insights --days 1`）会使活跃 gateway 不稳定。VPS/多 profile Linux 部署的用户受影响最严重。
- **Cron 正确性。** 24 小时内有三个独立的 cron issue（[#110412](https://github.com/NousResearch/hermes-agent/issues/110412) 丢弃未来槽位；[#108862](https://github.com/NousResearch/hermes-agent/issues/108862) 将成功投递错误记为失败，现已关闭）表明自动化路径仍然缺乏确定性语义。
- **面向生产/客户部署的卫生状况。** [#107899](https://github.com/NousResearch/hermes-agent/issues/107899) 报告了针对 CS agent 用例的五种不同内部诊断信息泄漏到客户 WhatsApp 聊天中 —— 这是迄今为止最强烈的迹象，表明 Hermes 正在非操作员最终用户面前部署。
- **密钥处理。** [#110416](https://github.com/NousResearch/hermes-agent/issues/110416) 报告称，尽管设置了 `security.redact_secrets: true`，粘贴的 Telegram bot token 仍原样持久化在 `state.db` 中 —— 这是一个与合规相关的问题。
- **Windows 上的安装摩擦。** 安装程序 shim / 受管 `uv` 重跑 bug 产生了一对重复 PR（[#110378](https://github.com/NousResearch/hermes-agent/pull/110378) 已关闭 → [#110421](https://github.com/NousResearch/hermes-agent/pull/110421) 开放），评审者明确指出了阻塞性的重跑失败。
- **轻微但持续的 UX 小问题。** dashboard 上的 iOS Safari 键盘/视口处理（[#110414](https://github.com/NousResearch/hermes-agent/issues/110414)）以及 AMD/Linux 上的 Desktop 渲染器崩溃循环（[#76947](https://github.com/NousResearch/hermes-agent/issues/76947)）。

**满意度信号：** 贡献者针对当天的 issue 提交了及时、范围明确的修复 PR（#110180、#110417、#110419、#110425），重复 PR 正在被整合而非放弃 —— 这表明贡献者群体积极参与且响应迅速。总体反应数较低（只有 #40239 达到 👍4，以及 #85209 达到 👍3），表明社区通过 issue 和 PR 而非反应进行交流。

---

## 8. 积压观察

需要维护者关注的事项 —— 最旧或影响最大且未解决：

| 条目 | 年龄 | 状态 | 重要性 |
|---|---|---|---|
| [PR #23315](https://github.com/NousResearch/hermes-agent/pull/23315) — web 搜索回退链 | 创建于 2026-05-10（约 4 个月） | 开放，`sweeper:risk-compatibility`，`blast-moderate` | 样本中最旧的开放 PR；重复工作已经不得不关闭（#28559）。 |
| [Issue #40239](https://github.com/NousResearch/hermes-agent/issues/40239) — pt-BR Desktop 本地化 | 创建于 2026-06-06（约 100 天） | 开放，`needs-decision`，按评论数（12）和反应数（👍4）排名第一的 issue | 对应的实现 PR（#92590）已经开放 —— 阻塞点看起来是决策，而不是工作量。 |
| [Issue #50390](https://github.com/NousResearch/hermes-agent/issues/50390) — Desktop 中可自定义环境变量 | 创建于 2026-06-21（约 85 天） | 开放，P3 功能 | 实现 PR（#110415）于 2026-09-14 开放；等待分类。 |
| [PR #68524](https://github.com/NousResearch/hermes-agent/pull/68524) — `web_extract` 的可配置回退链 | 创建于 2026-07-21（约 8 周） | 开放，`sweeper:blast-moderate` | 与 #23315 同类；两个相关 PR 待处理，表明回退语义的设计决策尚未做出。 |
| [Issue #76947](https://github.com/NousResearch/hermes-agent/issues/76947) — Linux + AMD 上的 Desktop 渲染器崩溃循环 | 创建于 2026-08-02（约 6 周） | 开放，`needs-repro` | 反复出现的硬崩溃，尚未建立复现路径；没有针对硬件的分类很难关闭。 |
| [Issue #90683](https://github.com/NousResearch/hermes-agent/issues/90683) — 回合后后台审查被进程退出杀死 | 创建于 2026-08-20（约 3.5 周） | 开放，P2，`needs-repro` | 在每次短生命周期 CLI/kanban 运行中静默浪费全上下文重放。 |
| [Issue #108310](https://github.com/NousResearch/hermes-agent/issues/108310) — 使用受管 Nous gateway 的 `browser_exec` 路由 | 创建于 2026-09-11 | 开放，P2，`needs-repro` | 两种独立的失败模式；阻塞受管 gateway 浏览器工作流。 |
| [Issue #109891](https://github.com/NousResearch/hermes-agent/issues/109891) — 活跃本地 gateway 作为一等 Desktop 后端 | 创建于 2026-09-13 | 开放，`needs-decision` | 路线图级别的问题，决定上述 Desktop/profile bug 最终应如何修复。 |

**给维护者的建议：** 优先处理 (1) 合并或关闭 WAL 缓解 PR #110179，并解决 #109727 / #110106 / #109946 系列，因为这是唯一具有共同根因的多 P1 集群；(2) 解决 #40239 和 #109891 上的 `needs-decision` 标签，这些地方的实现或架构已经就绪；(3) 通过一项设计裁定清理重复的 web 回退 PR 队列（#23315 / #68524）。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-14

## 1. 今日概览
IronClaw 在过去 24 小时内活动较低，仅进行维护：**0 个 issue 更新**、**5 个 PR 更新**（4 个开放中，1 个已关闭/合并），以及 **0 个新发布**。所有更新的 PR 均为自动化的 **Dependabot 依赖维护**分支，覆盖 Rust crates、GitHub Actions、Tokio 生态组件以及 WASM 运行时/工具链。唯一关闭的条目是 [PR #8097](https://github.com/nearai/ironclaw/pull/8097)，这是一个较早的“everything-else”依赖升级，似乎已被较新的开放 [PR #8099](https://github.com/nearai/ironclaw/pull/8099) 取代。提供的数据中未报告任何 bug、功能请求或用户讨论。整体项目健康状况看起来稳定但安静，依赖卫生是主要可见工作流。

## 2. 发布
此时间窗口内无新发布。

## 3. 项目进展
- [PR #8097](https://github.com/nearai/ironclaw/pull/8097) — **已关闭** — Dependabot “everything-else” 组，包含 24 项更新。它在 2026-09-13 更新后被关闭，很可能已被 #8099 取代。
- [PR #8099](https://github.com/nearai/ironclaw/pull/8099) — **开放中** — Dependabot “everything-else” 组，包含 25 项更新，包括 `uuid` `1.24.0` → `1.26.1`、`base64` `0.22.1` → `0.23.1` 和 `rust_decimal`。
- [PR #8079](https://github.com/nearai/ironclaw/pull/8079) — **开放中** — GitHub Actions 组，包含 6 项更新，包括 `anthropics/claude-code-action` `1.0.183` → `1.0.221` 和 `actions/setup-node` `4.0.2` → `7.0.0`。
- [PR #8078](https://github.com/nearai/ironclaw/pull/8078) — **开放中** — Tokio 生态组，包含 2 项更新：`tower-http` `0.7.0` → `0.7.1` 和 `tokio-tungstenite`。
- [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — **开放中** — WASM 组，包含 4 项更新：`wasmtime`、`wasmtime-wasi`、`wit-component` 和 `wit-parser`。标记为 `size: L`、`risk: medium`。

**净进展：** 没有产品功能或修复取得进展。可见的进展是依赖维护性改动。

## 4. 社区热门话题
未发现热门话题。所有五个更新的 PR 均有 **0 👍**，且评论数未提供/不可用。有 **0 个更新的 issue**，因此没有可排序的 issue 讨论。

按存在时长/关注度来看最显眼的依赖 PR：
- [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — WASM 组，自 2026-08-23 起开放。
- [PR #8079](https://github.com/nearai/ironclaw/pull/8079) — GitHub Actions 组，自 2026-09-06 起开放。
- [PR #8078](https://github.com/nearai/ironclaw/pull/8078) — Tokio 生态组，自 2026-09-06 起开放。

**潜在需求：** 维护者例行审查/合并依赖 PR，尤其是主版本更新和风险更高的 WASM 变更。

## 5. Bug 与稳定性
过去 24 小时内未报告任何 bug、崩溃或回归。数据中不存在 bug 修复 PR。

可能影响稳定性的条目：
- [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — `size: L`、`risk: medium`；WASM 运行时/工具链更新是所列风险最高的依赖组。
- [PR #8079](https://github.com/nearai/ironclaw/pull/8079) — 包括重大 GitHub Actions 升级，如 `actions/setup-node` `4.0.2` → `7.0.0`。
- [PR #8099](https://github.com/nearai/ironclaw/pull/8099) — 包括 `base64` `0.22.1` → `0.23.1`，可能需要进行兼容性检查。

这些更新没有关联的事件报告或修复 PR。

## 6. 功能请求与路线图信号
未记录任何功能请求，因为此时间窗口内有 **0 个 issue 更新**，且没有面向用户的 PR。

路线图信号仅限于依赖现代化：
- 通过 [PR #8099](https://github.com/nearai/ironclaw/pull/8099) 更新 Rust crate
- 通过 [PR #8079](https://github.com/nearai/ironclaw/pull/8079) 更新 GitHub Actions
- 通过 [PR #8078](https://github.com/nearai/ironclaw/pull/8078) 更新 Tokio 生态
- 通过 [PR #7834](https://github.com/nearai/ironclaw/pull/7834) 更新 WASM 运行时/工具链

预测：基于可用数据，如果下一次发布发生，它很可能是维护导向的，并包含这些依赖更新中的某个子集，而不是新的面向用户功能。

## 7. 用户反馈摘要
过去 24 小时内没有用户反馈。没有更新的 issue，没有用户提交的 PR，依赖 PR 上也没有可见的评论或反应。因此，无法根据此数据集评估真实用户痛点、用例、满意度和不满。所有观察到的活动均为机器人生成的依赖维护。

## 8. 积压待办观察
- [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — **最需关注的积压事项。** 自 2026-08-23 起开放，2026-09-13 更新，标记为 `size: L` 和 `risk: medium`。WASM 依赖组需要维护者审查。
- [PR #8079](https://github.com/nearai/ironclaw/pull/8079) — 自 2026-09-06 起开放。GitHub Actions 组包含重大更新，包括 `actions/setup-node` `4.0.2` → `7.0.0`。
- [PR #8078](https://github.com/nearai/ironclaw/pull/8078) — 自 2026-09-06 起开放。Tokio 生态更新；可能风险较低，但仍待合并。
- [PR #8099](https://github.com/nearai/ironclaw/pull/8099) — 较新的“everything-else”升级，包含 25 项更新；取代已关闭的 [PR #8097](https://github.com/nearai/ironclaw/pull/8097)。

**需要维护者关注：** 审查并合并/拒绝开放的 Dependabot PR，尤其是长期开放的 WASM 组和重大 GitHub Actions 升级。

---

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-14

*数据来源：github.com/agentscope-ai/QwenPaw | 时间窗口：过去 24 小时*

---

## 1. 今日概览

QwenPaw 在 2026-09-14 活动平稳适中：过去 24 小时有 6 个 issue 和 8 个 PR 更新，无新版本发布。七个开放 PR 中有五个来自首次贡献者，表明贡献者漏斗健康且不断扩大。讨论重心严重偏向 **可靠性与持久化** —— 评论最多的两个 issue（#7571 记忆保持、#7724 会话丢失）都描述了 agent 状态被静默丢失，这并非孤立事件，而是反复出现的主题。积压工作正倾向于上下文/记忆架构（#7733、#7571）和 UI 易用性（#7739），而非新功能交付。一个长期存在的 PR（#4009，pt-BR 本地化，自 5 月起开放）已关闭，并已提交纠错后续 PR。

**活跃度评估：** 社区参与度中到偏高，发布节奏低，稳定性风险升高并集中在记忆/会话处理上。

---

## 2. 发布

过去 24 小时没有发布新版本（线上报告的最新版本：**v2.2.0 / v2.2.1**）。没有破坏性变更、迁移说明或特定版本回归需要报告。

---

## 3. 项目进展

**已关闭 / 已合并项**
- **#4009** — `feat(i18n): add Brazilian Portuguese (pt-BR) locale support` ([link](https://github.com/agentscope-ai/QwenPaw/pull/4009)). 自 2026-05-02 开放，最终于 2026-09-13 关闭。这是一次拖延已久的关闭（约 4.5 个月），但合并后的产物存在缺陷。
- **#3429** — `[Feature]: Pre-install himalaya and other commonly used CLI tools in Docker image` ([link](https://github.com/agentscope-ai/QwenPaw/issues/3429)). 于 2026-04-15 开放，2026-09-13 关闭 —— 一次值得注意的积压清理，也是对 Docker 用户的一项运维改进；此前他们每次重建都要重新安装工具。

**推进中的在途工作**
- **#7734** — `fix(i18n): complete pt-BR translation and repair broken strings from #4009` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7734)). 使 pt-BR 与 `en.json` 达到完整键位一致（从 3,860/4,275 个键）。
- **#7736** — `feat(providers): add DeepSeek V4 Flash capabilities` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7736)). 为打包的 provider 目录增加 1M-token 输入窗口、图像输入和 reasoning-effort 支持。
- **#7732** — `fix(acp): select permission options by protocol kind` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7732)). 修复 ACP 会话对安全工具调用回退到交互式提示的问题。
- **#7632** — `fix(runtime): return feedback for unknown slash commands` ([link](https://github.com/agentscope-ai/QwenPaw/pull/7632)). 最近被触碰的 PR（2026-09-14）；自 2026-09-08 开放。

---

## 4. 社区热点

| 排名 | 条目 | 评论数 | 类型 | 链接 |
|---|---|---|---|---|
| 1 | #7571 — Agent“总是记不住”（指令被遗忘） | 4 | 问题 / 可靠性 | [Issue #7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) |
| 2 | #7724 — 会话丢失 (session loss) | 3 | Bug | [Issue #7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) |
| 3 | #7709 — 定时任务无输出；结果被折叠进 steps/thinking | 2 | Bug | [Issue #7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) |
| 4 | #7632 — 未知 slash 命令反馈 | 不适用（09-14 更新） | PR | [PR #7632](https://github.com/agentscope-ai/QwenPaw/pull/7632) |

**底层需求分析：** 前三个 issue 本质上都是同一种用户抱怨的不同表现 —— *agent 无法可靠地保留或呈现状态*。#7571 涉及指令跨路径持久化（源目录 A 与运行时目录 C、反复违反 TODO 文件规则）；#7724 涉及对话/模型配置状态完全消失；#7709 涉及任务输出被不可见地渲染在 thinking/steps 内。三者共同表明，社区最主要未满足的需求是 **确定性、可观测的状态管理**，而不是更多能力。注意大多数条目为 0 👍 反应，因此 issue 数量由少数积极发声的强力用户驱动，而非广泛点赞。

---

## 5. Bug 与稳定性

按严重程度排序（数据丢失和静默失败优先）：

1. **🔴 #7724 — 会话丢失（严重，数据丢失）** — [link](https://github.com/agentscope-ai/QwenPaw/issues/7724)。Windows 10，桌面版 v2.2.1。一次已完成的对话（晚上 9 点）在插件重新部署/关闭中断后从 Control → Sessions 中消失；模型配置也丢失（后通过重新选择恢复）。用户报告这是重复发生（交叉引用 #7708）。**不存在修复 PR。** 这是板上风险最高的条目。
2. **🟠 #7571 — Agent 遗忘指令 / 范围漂移（高）** — [link](https://github.com/agentscope-ai/QwenPaw/issues/7571)。Agent 反复忽略用于 TODO 文件创建的路径范围规则，并编辑运行时目录 C 而非源目录 A，导致自动部署覆盖运行时代码。跨会话、可复现“数次”。**不存在修复 PR。** 直接关联 #7733 中的上下文管理缺口。
3. **🟡 #7709 — 定时任务无可见输出（中）** — [link](https://github.com/agentscope-ai/QwenPaw/issues/7709)。v2.2.1。结果被折叠进 steps/thinking 或完全省略；也间歇性影响普通对话。输出渲染/流式传输 bug。**不存在修复 PR。**
4. **🟡 #7738 — OpenAI `completions.create()` 中未识别 kwargs 引发 `TypeError`（中，崩溃）** — [link](https://github.com/agentscope-ai/QwenPaw/pull/7738)。中间件/代理注入的 kwargs（例如 `streamIdleTimeoutMs`）会使 provider 调用崩溃。**修复 PR 开放中。**
5. **🟡 #7735 — MCP HTTP 错误响应损坏（中）** — [link](https://github.com/agentscope-ai/QwenPaw/pull/7735)。过期的 body-framing headers 导致双重解压缩，破坏有用的错误详情。**修复 PR 开放中（Fixes #7716）。**
6. **🟢 #7732 — ACP 权限提示误触发（低-中，UX/安全相关）** — [link](https://github.com/agentscope-ai/QwenPaw/pull/7732)。安全工具调用因匹配 ID（而非协议 `kind`）而回退到交互式提示。**修复 PR 开放中。**
7. **🟢 #7734 — pt-BR 字符串损坏/有缺陷（低）** — [link](https://github.com/agentscope-ai/QwenPaw/pull/7734)。基于规则的翻译流程留下多类缺陷。**修复 PR 开放中。**

**模式：** 三个最严重的 issue（#7724、#7571、#7709）**没有对应修复 PR**，而中/低严重度条目均在被积极修复。维护者注意力目前与严重程度不匹配。

---

## 6. 功能请求与路线图信号

| 条目 | 请求 | 可能的下一版本信号 |
|---|---|---|
| **#7733** — Agent 自主上下文管理 ([link](https://github.com/agentscope-ai/QwenPaw/issues/7733)) | 让 agent 参与上下文逐出/压缩决策（当前是纯 token 阈值），并在逐出前警告，使工作能经受“平滑交接”。 | **下一架构周期的强候选。** 直接解决 #7571 的根因；可能是多版本工作。 |
| **#7739** — 将历史面板移到右侧 ([link](https://github.com/agentscope-ai/QwenPaw/issues/7739)) | 左侧拥挤导致 14 英寸笔记本上内容折叠；请求右侧历史选项。 | **低工作量 UI 收益**，近期补丁可能实现。 |
| **#7736** — DeepSeek V4 Flash 能力 ([link](https://github.com/agentscope-ai/QwenPaw/pull/7736)) | provider 目录中的 1M-token 上下文、图像输入、reasoning-effort 值。 | provider 目录扩展显然仍在继续；预计会持续接入新模型。 |
| **#7737** — 多 agent 协作触发关键词 ([link](https://github.com/agentscope-ai/QwenPaw/pull/7737)) | 在第一轮就识别用户用于团队协作的表述，而不是中断后重试。 | 表明对多 agent UX 的投入；可能很快落地。 |
| **#3429** — Docker 中预装 CLI 工具（已关闭） | 已交付/关闭 —— 路线图条目完成。 | 为官方镜像中捆绑工具建立先例。 |

**预测：** 近期最可能交付的是 provider/UX 批次（#7736、#7737、#7739、#7738、#7735、#7732、#7734）。影响最大的条目是 #7733，但它属于架构层面，不太可能在补丁版本中落地。

---

## 7. 用户反馈摘要

**用户自身表述中的痛点：**
- *“我不知道怎么解决了”*（“I don't know how to solve this anymore”）—— 插件开发者 `xiaohushi512` 在 #7571 中描述反复出现的指令/范围失败和破坏性部署。这是对 **可信度** 的挫败，而非功能。
- *“对话完全找不到了”*（“The conversation is completely gone”）—— 同一用户在 #7724 中，在一次插件重新部署中断会话后。重复发生（引用 issue #7708）放大了不满。
- `tina0501853` 在 #7709 中：当输出只出现在 thinking 中或从不出现时，定时任务实际上无法用于自动化。
- `sysweekup` 在 #7739 中：由于左列拥挤，Web UI 在 14 英寸笔记本上不可用 —— 一个具体的易用性抱怨。

**浮现的使用场景：** 具有源与运行时部署工作流的本地插件开发；定时/自动化后台任务；中型笔记本上的桌面使用；需要压缩的长上下文 agent 工作（#7733）。

**情绪：** 用户参与度高且技术成熟，但对持久化（记忆、会话、配置）的信心正在受到侵蚀。积极的一面是，社区贡献情绪强劲 —— 5 位首次贡献者有开放 PR，表明新人仍觉得项目易于参与。

---

## 8. 积压关注

- **#7632** — [PR, first-time contributor](https://github.com/agentscope-ai/QwenPaw/pull/7632)。自 **2026-09-08（6 天）** 开放，09-14 再次被触碰但未见合并。首次贡献者 PR 停滞是留存风险；建议安排一次审查。
- **#7571** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7571)。自 **2026-09-05** 开放，4 条评论，无关联修复 PR，无维护者解决路径。用户影响高，正在老化且无负责人。
- **#7724** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7724)。自 **2026-09-12** 开放，引用先前 issue #7708 —— 这是一次 **重复报告**，意味着底层缺陷从未被根因分析。值得升级。
- **#7709** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7709)。自 **2026-09-11** 开放，无修复 PR；输出渲染 bug 同时影响定时和交互流程。
- **#7733** — [Issue](https://github.com/agentscope-ai/QwenPaw/issues/7733)。最近提交（09-13），但设计成分重；需要维护者回应，以免成为长期无人答复的架构请求。
- **#4009 / #7734** — [PR #7734](https://github.com/agentscope-ai/QwenPaw/pull/7734) 正在修复通过 #4009 交付的本地化，该本地化“由基于规则的词典流程生成，并带着缺陷合并”。值得做一次流程复盘：一个 4.5 个月之久的 PR 明知有质量问题仍被合并。在回归到达用户前验证 #7734 已落地。

**健康提示：** #4009 和 #3429 在 09-13 关闭，表明积压在推进，但未解决且无修复 PR 的 **状态持久化缺陷** 集中出现，是本周维护者最重要的单一信号。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-14

数据窗口：过去 24 小时，基于来自 `zeroclaw-labs/zeroclaw` 的 GitHub 活动。显示的最新更新为 2026-09-13/14。

## 1. 今日概览

ZeroClaw 仍然非常活跃，但合并/发布吞吐停滞：过去 24 小时内有 37 个 issue 和 50 个 PR 更新，没有新版本发布，且 **PR 合并或关闭数为零**。Issue 活动集中在治理/RFC 跟踪项、安全/运行时稳定性缺陷和 provider 可靠性工作。有五个 issue 被关闭，表明解决进展存在，但 50 个开放 PR 以及大量 `needs-maintainer-review` / `needs-author-action` 标签表明存在审查和决策瓶颈。整体项目健康度在参与度和安全关注度方面表现强劲，但今天没有代码落地是一个警示信号。

## 2. 发布

过去 24 小时内没有发布新版本。最新发布背景仍围绕 [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) 中跟踪的 v0.8.5 稳定化分支。

## 3. 项目进展

**今日没有 PR 被合并或关闭**（`open: 50, merged/closed: 0`）。本时间窗口内没有功能代码通过 PR 流水线落地。

今日关闭的 issue：
- [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — `knowledge.db_path` 波浪号展开缺陷；已关闭。
- [#10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324) — agent 重命名期间，cron 手动触发/运行历史的先检查后操作；已关闭。
- [#10580](https://github.com/zeroclaw-labs/zeroclaw/issues/10580) — 文档链接门禁扩展到仓库范围内悬空的内部链接；已关闭。
- [#10533](https://github.com/zeroclaw-labs/zeroclaw/issues/10533) — `model_routing_config` 拒绝 `custom.*` provider 槽位；已关闭。
- [#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) — RPC `config/set` 持久化 `Config::validate()` 拒绝的值；已关闭，但相关 [#10320](https://github.com/zeroclaw-labs/zeroclaw/issues/10320) 仍开放。

值得关注的开放 PR，正在推进工作但尚未合并：
- [#10843](https://github.com/zeroclaw-labs/zeroclaw/pull/10843) — Telegram `add_reaction`/`remove_reaction` 实现，并在不支持的渠道上显式失败。
- [#10840](https://github.com/zeroclaw-labs/zeroclaw/pull/10840) — 在 mdBook 构建中生成 `llms.txt` / `llms-full.txt`。
- [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) — OIDC token 验证 provider。
- [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) — 使用 native + peercred 的经过认证 RPC principal。
- [#10610](https://github.com/zeroclaw-labs/zeroclaw/pull/10610) — shell V1 权限策略。
- [#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596) — 分页的持久化 ACP transcript。
- [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — 每个 provider profile 支持多个模型。
- [#10245](https://github.com/zeroclaw-labs/zeroclaw/pull/10245) — daemon 受监督错误链保留。
- [#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753) — 区分 risk-profile `allowed_tools` 缺失与为空。

## 4. 社区热点

数据集中未提供 PR 的评论/反应数，因此以下 issue 排名使用评论数；PR 选择依据近期活跃度、风险标签和维护者审查状态。

最活跃的 issue：
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — RFC 和设计 issue 的维护者决策队列。15 条评论。底层需求：清晰、有优先级的维护者决策流程。
- [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC：通过移除强制讨论窗口并让 REVISE 停止当前快照来简化 RFC 投票。10 条评论。底层需求：在保持审查质量的同时减少流程摩擦。
- [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) — RFC：澄清 PR 审查证据、新鲜度警告和作者行动边界。7 条评论。底层需求：可预期的审查期望，并减少贡献者的歧义。
- [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — RPC dispatcher 在 Windows 上运行到距其 2 MB 栈保护边界仅 2% 以内。7 条评论。底层需求：Windows CI 可靠性和运行时栈安全。
- [#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381) — crates.io 发布、打包和 cargo-install 后续事项。5 条评论。底层需求：更顺畅的分发和 Windows checkout 支持。
- [#10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360) — RFC：带 pull worker 和签名回执的可选加入家庭边缘 mesh。4 条评论。底层需求：超越单主机的多设备、本地优先扩展。
- [#10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) — SOP 引擎在记录 output-schema 拒绝之前就提升/运行后续步骤。4 条评论。底层需求：确定性工作流执行和快速失败行为。

值得关注的活跃 PR：
- [#10283](https://github.com/zeroclaw-labs/zeroclaw/pull/10283) — 文档：构建 Remote Agent 手机配对。
- [#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753) — 配置：risk-profile `allowed_tools` 语义。
- [#10245](https://github.com/zeroclaw-labs/zeroclaw/pull/10245) — daemon 受监督错误链。
- [#10843](https://github.com/zeroclaw-labs/zeroclaw/pull/10843) — Telegram 反应。
- [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) — OIDC provider。
- [#10840](https://github.com/zeroclaw-labs/zeroclaw/pull/10840) — llms.txt 生成。
- [#10610](https://github.com/zeroclaw-labs/zeroclaw/pull/10610) — shell V1 权限策略。
- [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) — 持久化会话 prompt 附件。

分析：社区正沿着三条战线推进——治理/流程清晰度、安全/身份边界，以及运行时/provider 可靠性。维护者决策队列跟踪项和 RFC 投票讨论占据了评论主导地位，表明流程设计目前是进展的一阶阻塞因素。

## 5. 缺陷与稳定性

按严重程度和影响排序，基于 issue 标签和摘要：

| 严重程度 | Issue | 状态 | 摘要 | 修复 PR 状态 |
|---|---|---|---|---|
| P0 / S1 | [#10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | 开放，已接受 | SOP 引擎在记录某步骤的 output-schema 拒绝之前就提升并运行后续步骤。工作流被阻塞。 | 样本中无显式关联的修复 PR。 |
| P1 | [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | 开放，进行中 | `RpcDispatcher::process_line` 运行到距 2 MB 栈保护边界仅 2% 以内；Windows 栈溢出在 advisory nextest 中暴露。 | 样本中无显式关联的修复 PR。 |
| P1 | [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | 开放，进行中 | OpenCode provider 从不发送 `x-opencode-session`，导致 Go 模型失效并有账号被标记的风险。3 👍。 | 样本中无显式关联的修复 PR。 |
| P1 | [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) | 开放，进行中 | 失败的 Code/ACP 轮次会从持久历史中丢弃已接受的 prompt 和已完成的工具交换。 | 样本中无显式关联的修复 PR。 |
| P1 | [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) | 开放，已接受 | 运行时 profile 成本限制未反映有效的全局每日预算。 | 样本中无显式关联的修复 PR。 |
| P1 | [#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645) | 开放，已接受 | 委托子循环未始终在限定范围的成本跟踪上下文中运行。 | 样本中无显式关联的修复 PR。 |
| P1 | [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) | 开放，进行中 | ZeroCode 通知延迟通过 `begin_notification_resync → session/cancel` 取消每个正在运行的轮次。 | 样本中无显式关联的修复 PR。 |
| P1 | [#10828](https://github.com/zeroclaw-labs/zeroclaw/issues/10828) | 开放，已接受 | `openai-codex --device-code` 使用过时/错误的 OpenAI 设备认证端点并返回 404。 | 样本中无显式关联的修复 PR。 |
| P2 | [#10320](https://github.com/zeroclaw-labs/zeroclaw/issues/10320) | 开放，进行中 | `config set` 和 RPC `config/set` 会持久化值而不运行验证。相关 [#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) 今日已关闭。 | 可能与已关闭的 #10837 部分重叠/重复。 |
| P2 | [#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) | 开放，已接受 | 输出前流式失败会跳过已声明的非流式回退。 | 样本中无显式关联的修复 PR。 |
| P2 | [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) | 开放，进行中 | 单候选流恢复忽略 `provider_retries`；529 过载只会立即重试一次且没有退避。 | 样本中无显式关联的修复 PR。 |
| P2 | [#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779) | 开放 | OpenCode `FreeUsageLimitError` 429 以亚秒级退避重试，而不是快速失败。 | 样本中无显式关联的修复 PR。 |
| P2 | [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793) | 开放，进行中 | advisory job 上出现三个仅 Windows 的测试失败，而被测代码没有变化。 | 样本中无显式关联的修复 PR。 |
| P2 | [#10821](https://github.com/zeroclaw-labs/zeroclaw/issues/10821) | 开放，已接受 | `zeroclaw service logs` 将过期的 stderr 显示为当前内容；服务安装的 daemon 在没有 `--verbose` 时不输出 tracing。 | 样本中无显式关联的修复 PR。 |
| P3 | [#10802](https://github.com/zeroclaw-labs/zeroclaw/issues/10802) | 开放，已接受 | 对于同一会话，`session/list-acp` 报告的 `message_count` 与 `turn_end` 不同。 | 样本中无显式关联的修复 PR。 |

今日关闭的缺陷：
- [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — `knowledge.db_path` 中的波浪号展开。
- [#10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324) — cron 手动触发/运行历史的先检查后操作。
- [#10533](https://github.com/zeroclaw-labs/zeroclaw/issues/10533) — `model_routing_config` provider 槽位验证偏差。
- [#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) — RPC `config/set` 验证缺口。

相关的稳定性/安全开放 PR：[#10245](https://github.com/zeroclaw-labs/zeroclaw/pull/10245)、[#10838](https://github.com/zeroclaw-labs/zeroclaw/pull/10838)、[#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753)、[#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)、[#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)。

## 6. 功能请求与路线图信号

流程与治理：
- [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — 简化 RFC 投票。
- [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) — 澄清 PR 审查证据和作者行动边界。
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — 维护者决策队列。
- [#8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691) — ADR 清单和已接受 RFC 决策记录。

安全与身份：
- [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) — OIDC token 验证 provider。
- [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) — 经过认证的 RPC principal。
- [#10610](https://github.com/zeroclaw-labs/zeroclaw/pull/10610) — shell V1 权限策略。
- [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) — 插件安装/列表的 egress 授权仪式。
- [#10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360) — 带签名回执的可选加入家庭边缘 mesh。

运行时、provider 与平台：
- [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — 每个 provider profile 支持多个模型。
- [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — 原生 Hailo-Ollama 支持。
- [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) — 将上下文压缩锚定到模型窗口比例。
- [#10596](https://github.com/zeroclaw-labs/zeroclaw/pull/10596) — 分页的持久化 ACP transcript。
- [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) — 持久化会话 prompt 附件。
- [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) — 声明式 skill 自动激活。

配置与 UX：
- [#10822](https://github.com/zeroclaw-labs/zeroclaw/issues/10822) — `config/set-many` 原子批量配置变更。
- [#10826](https://github.com/zeroclaw-labs/zeroclaw/issues/10826) — 显式 ZeroCode 会话根选择与保留。
- [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) — WhatsApp PDF 缩略图。
- [#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381) — crates.io 发布与打包后续事项。

可能的下一个版本候选：安全/认证阶段、配置验证与原子变更、provider 可靠性、ZeroCode/ACP 修复、文档/CI 改进，以及可能的 Telegram 反应支持。诸如 OIDC/RPC 认证、shell 权限策略、多模型 provider profile 和 edge mesh 等大型 XL 功能，除非维护者审查加速，否则可能会滑出最近的下一个发布批次。

## 7. 用户反馈摘要

本时间窗口暴露的真实痛点：
- 配置安全：用户和维护者反馈，`config set` 和 RPC `config/set` 可以在未经验证的情况下持久化无效值。
- Provider 兼容性：OpenCode 会话头、OpenAI Codex 设备认证、429 配额处理和流式回退行为是反复出现的摩擦点。
- 成本治理：运行时 profile 可能错误报告每日预算限制，且委托子循环可能逃逸限定范围的成本约束。
- 可靠性与诊断：Windows 栈溢出、仅 Windows 的测试失败、过期服务日志和 ZeroCode 轮次取消，降低了对运行时稳定性的信心。
- 工作流正确性：SOP 引擎在 schema 拒绝之前提升步骤，会阻塞工作流。
- 渠道 UX：WhatsApp 文档缺少缩略图；Telegram 反应此前被伪装为成功。

数据中可见的用例包括本地优先多设备部署、家庭边缘 mesh、OpenCode/OpenAI 兼容 provider、长时间运行的 ZeroCode/ACP 会话、委托 agent 循环，以及 WhatsApp 和 Telegram 等渠道集成。满意度信号包括详细的缺陷报告和 [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) 上的 3 👍。不满信号包括大量 `needs-author-action`、`needs-maintainer-review` 和 `status:blocked` 标签，以及今日零个已合并 PR。

## 8. 积压事项观察

长期未响应或高重要性、需要维护者关注的条目：

- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — 维护者决策队列跟踪项，创建于 2026-07-04，15 条评论。
- [#8691](https://github.com/zeroclaw-labs/zeroclaw/issues/8691) — ADR 清单和已接受 RFC 决策记录，创建于 2026-07-04。
- [#8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965) — Skills 声明式自动激活，创建于 2026-07-11，`needs-author-action`，`stacked`。
- [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — 原生 Hailo-Ollama 支持，创建于 2026-07-17，`status:blocked`，`do-not-merge`。
- [#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381) — crates.io 发布/打包后续事项，创建于 2026-07-26。
- [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) — v0.8.5 有期限的每周稳定化跟踪项，创建于 2026-07-27。
- [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) — 上下文压缩锚定到模型窗口比例，创建于 2026-07-29，`needs-author-action`。
- [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) — 插件安装/列表的 egress 授权仪式，创建于 2026-07-31。
- [#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753) — Risk-profile `allowed_tools` 语义，创建于 2026-08-04。
- [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — 每个 provider profile 支持多个模型，创建于 2026-08-07，`needs-author-action`。
- [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) — 多模态图像验证，创建于 2026-08-07，`needs-author-action`。
- [#10245](https://github.com/zeroclaw-labs/zeroclaw/pull/10245) — Daemon 受监督错误链，创建于 2026-08-22。
- [#10283](https://github.com/zeroclaw-labs/zeroclaw/pull/10283) — 文档：构建 Remote Agent 手机配对，创建于 2026-08-23。
- [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) — git 操作遵循允许的根目录，创建于 2026-08-25，`needs-author-action`。
- [#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407) — 持久化会话 prompt 附件，创建于 2026-08-27，`needs-author-action`。

主要的健康风险不是缺乏活动，而是审查吞吐量。目前有 50 个开放 PR、今日 0 个合并/关闭，以及多个高风险 XL PR 在等待，维护者带宽和决策似乎是 ZeroClaw 近期进展的关键路径。

---

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*