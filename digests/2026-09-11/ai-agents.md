# OpenClaw 生态日报 2026-09-11

> Issues: 421 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-11 00:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw Project Digest — 2026-09-11

*来源：github.com/openclaw/openclaw。数据反映滚动 24 小时窗口；issue/PR 详情取自按评论数排序的头部事项（前 50 个 issue、前 30 个 PR），因此长尾活动未被充分体现。*

---

## 1. 今日概览

OpenClaw 仍然是一个迭代速度极高的项目：24 小时内触及 421 个 issue 和 500 个 PR，其中 264 个 PR 已合并/关闭，186 个 issue 已关闭，另有 235 个 issue 仍处于活跃状态——issue 关闭率约 44%，PR 关闭率约 53%，表明分诊吞吐强劲，而非积压失控增长。共发布一个版本：**v2026.6.35**，即 2026 年 6 月 Extended Stable（LTS）的最终版本，为旧 LTS 线路收尾，而主线停留在 2026.9.x。稳定性讨论主要集中在三类反复出现的问题——**SQLite/存储耗尽**（无界表、锁争用和长时间事件循环停顿）、**Windows gateway 生命周期**（restart/install/service 行为），以及跨 Telegram、Teams 和 WebChat 的**消息投递可靠性**。健康评估：维护响应性良好（许多 P1 事项现已附带 `clawsweeper:queueable-fix` PR 和可复现的源码线索），但 persistence 和 memory-core 子系统中积累了大量稳定性债务，正在影响生产环境中的自托管部署。

---

## 2. 发布

### v2026.6.35 — 2026 年 6 月 Extended Stable（LTS）最终版本
- **亮点（已发布说明）：** 更安全的 provider 和 channel 边界——捆绑的 providers 和 channel adapters 现在会限制不可信响应体大小，在昂贵工作前拒绝超大输入，并在传输失败时保留安全恢复能力。
- **破坏性变更 / 迁移说明：** 已发布说明中未声明（源数据中的发布文本被截断）。实质性迁移信号来自生命周期，而非代码：**这是 2026 年 6 月最后一个 LTS 版本**，因此锁定 LTS 的部署应规划迁移到更新的稳定线路。
- **升级规划注意事项：** 当前稳定线路并非毫无摩擦。[#142585](https://github.com/openclaw/openclaw/issues/142585)（P0）报告 2026.9.3 Doctor 在从 2026.7.1-2 升级时拒绝有效的旧版 workspace/attestation 状态，而 [#136183](https://github.com/openclaw/openclaw/issues/136183)（P1）报告了 2026.8.1 引入并在 2026.8.2 中持续存在的 SSH 挂起回归。从 6 月 LTS 迁出的团队应首先针对 2026.9.x 验证。

---

## 3. 项目进展

窗口内关闭或合并的重要事项（共 264 个 PR 已合并/关闭，186 个 issue 已关闭）：

- **[#139714](https://github.com/openclaw/openclaw/issues/139714)（CLOSED，P2）— `openclaw status` 永远卡在 "update in progress"。** 由 post-core update resume child 写入的一行 `update_runs` 无法被最终确定。修复移除了更新报告中一个持续存在的错误状态。
- **[#132762](https://github.com/openclaw/openclaw/issues/132762)（CLOSED，P1，diamond lobster）— 溢出重试在工具结果上成功结束，但没有最终投递。** 多阶段文档工作流中的一类消息丢失 bug；已以明确的修复形态关闭。
- **[#101763](https://github.com/openclaw/openclaw/issues/101763)（CLOSED，P0）— Hosted Molty 模型选择器无法持久化**，导致带点的 `claude-opus-4.8` id 被发送给 Anthropic，所有回复都失败。高影响的托管 provider 修复。
- **[#90711](https://github.com/openclaw/openclaw/issues/90711)（CLOSED）— launchd plist 的 `StandardErrorPath` 硬编码为 `/dev/null`**，会在 macOS 上静默丢弃所有 gateway stderr。为 macOS 自托管者恢复可观测性。
- **[#109657](https://github.com/openclaw/openclaw/issues/109657)（CLOSED，P1）— 在 WhatsApp、Discord、Slack、Signal、iMessage 上采用核心 durable ingress drain。** 这会将规范 durable-ingress worker（来自 #108924）扩展到其余 channels——防止消息丢失的基础性步骤。
- **[#136833](https://github.com/openclaw/openclaw/pull/136833)（CLOSED，P1）— 在持久化前拒绝 placement 不兼容的模型变更。** 防止固定到远程节点 worker 的会话因不支持的模型切换而变砖。
- **[#141592](https://github.com/openclaw/openclaw/pull/141592)（CLOSED，P2）— 防止压缩时出现无 terminal 的 Responses 流**，修复在压缩协商的 OpenAI 兼容端点上出现 "stream ended before a terminal response event" 的问题。

**进行中并推进：** LINE channel 对齐工作（[#132136](https://github.com/openclaw/openclaw/pull/132136) 多图单轮、[#142092](https://github.com/openclaw/openclaw/pull/142092) 回复引用）、Mattermost 交互式 `ask_user` 按钮（[#135350](https://github.com/openclaw/openclaw/pull/135350)）、面向纯人工步骤的浏览器移动端交接（[#143015](https://github.com/openclaw/openclaw/pull/143015)）、按 agent 的 `web_fetch` SSRF 策略（[#67421](https://github.com/openclaw/openclaw/pull/67421)），以及 owner 作用域的 ClawHub skill 引用（[#87764](https://github.com/openclaw/openclaw/pull/87764)）。

---

## 4. 社区热点

| 事项 | 评论数 | 信号 |
|---|---|---|
| [#125626](https://github.com/openclaw/openclaw/issues/125626) — *2026.8.1 beta 反馈*（CLOSED，maintainer） | 24 | 发布验证循环按设计运作；流量最高的单一线程是结构化 beta 反馈，而不是缺陷。 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex `PreToolUse` hook relay 生成 CPU 密集型进程，阻塞 gateway RPC（P0，OPEN，👍2） | 22 | 长期存在（2026-06-06 开启）的架构问题：hook relay 进程模型过重。 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) — 未回收的 hook/tool 子进程 → 僵尸进程累积（P1，OPEN） | 15 | 与 #91009 同一根因领域：子进程生命周期管理。 |
| [#114612](https://github.com/openclaw/openclaw/issues/114612) — memory-core SQLite 表没有保留策略，最终会填满磁盘（P2，OPEN，diamond lobster） | 13 | 生产环境现场证据；存储治理是系统性缺口。 |
| [#139714](https://github.com/openclaw/openclaw/issues/139714) — `update in progress` 永远持续（CLOSED） | 13 | 更新状态机的正确性。 |
| [#132762](https://github.com/openclaw/openclaw/issues/132762) — 溢出重试结束但没有最终投递（CLOSED） | 12 | 静默消息丢失。 |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) — SSH spawn 挂起回归（OPEN，P1） | 11 | 跨两个版本存在的回归，仍未关闭。 |
| [#142585](https://github.com/openclaw/openclaw/issues/142585) — 2026.9.3 Doctor 拒绝旧版 workspace 迁移（P0，OPEN） | 11 | **升级阻塞项**，仍为 `needs-info`。 |

**底层需求：** 社区正汇聚为两项诉求——（1）**可预测的资源生命周期**（子进程被回收、DB 表被清理、锁有界），以及（2）**确定性的升级路径**（Doctor 迁移、更新状态、配置变更后的模型路由）。用户越来越多地运行大型集群（一份报告在 [#142476](https://github.com/openclaw/openclaw/issues/142476) 中描述了 **632-agent gateway**），这会将每个 agent 的小效率问题转化为数秒级的事件循环停顿。

---

## 5. Bug 与稳定性

**P0 / 发布阻塞**
- [#142585](https://github.com/openclaw/openclaw/issues/142585) — 2026.9.3 Doctor 在规范行缺失时拒绝有效的旧版 workspace 设置和 attestation 导入。升级/迁移阻塞项；`clawsweeper:needs-info`，尚无修复 PR。
- [#144066](https://github.com/openclaw/openclaw/issues/144066) — 在过期的 `auth_profile_state.order` 条目于 profile 移除后仍存在时，`gpt-5.4`/`gpt-5.4-mini` 会间歇性被错误路由到 `openai-codex`；请求返回 400 且无 body。回归，`ux-release-blocker`。**未见修复 PR。**
- [#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex hook relay 生成 CPU 密集型的 `openclaw-hooks` 进程，阻塞 gateway RPC（崩溃循环，👍2）。自 6 月起开启；需要维护者审查。
- [#140162](https://github.com/openclaw/openclaw/issues/140162) — Windows：`gateway restart` 在 181 秒超时后将正在启动/就绪的 gateway 视为 "stale" 并杀死，且永远找不到手动启动的前台 gateway。完全中断故障模式。

**P1**
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — 僵尸子进程累积 → 运行时性能退化。
- [#142476](https://github.com/openclaw/openclaw/issues/142476) — 2026.9.3 cron session reaper 对每个 agent DB 运行同步 `PRAGMA integrity_check`，在 632-agent gateway 上阻塞事件循环 14–76 秒。`queueable-fix` → **预计很快修复**。
- [#117262](https://github.com/openclaw/openclaw/issues/117262) — 对 `state/openclaw.sqlite` 的 3 个并发写句柄导致约 33 秒事件循环停顿（内部 DEF-61）。
- [#143640](https://github.com/openclaw/openclaw/issues/143640) — memory-core 全量索引发布在一个 `IMMEDIATE` 事务中运行，超过并发 agent DB 写入的 5 秒 busy timeout。
- [#136311](https://github.com/openclaw/openclaw/issues/136311) — gateway 每次启动都会重新获取 reindex 锁，导致索引无法修复；19 GB 孤立的 `memory-reindex-*` 临时 DB 不断累积。
- [#139847](https://github.com/openclaw/openclaw/issues/139847) — 在活跃回复运行期间发送的消息被丢弃（"no active tool authority snapshot"），2026.9.2 回归。`queueable-fix`。
- [#136183](https://github.com/openclaw/openclaw/issues/136183) — SSH spawn 等待服务器 banner 时挂起（回归 2026.8.1 → 在 2026.8.2 持续存在）。
- [#137332](https://github.com/openclaw/openclaw/issues/137332) — 混合 terminal requester-settle 批次在所有权检查后永远重试。`queueable-fix`。
- [#144424](https://github.com/openclaw/openclaw/issues/144424) — 并发 heartbeat lanes 在不相关的 dashboard 会话上冲突，触发真实的 Anthropic 429，并忽略重试退避 → 自我维持的风暴。`queueable-fix`。
- [#128971](https://github.com/openclaw/openclaw/issues/128971) — 当 terminal receipt 返回 `delivery_ambiguous` 时，Telegram 最终回复被静默丢失。
- [#136360](https://github.com/openclaw/openclaw/issues/136360) — 内部 runtime-context carrier 在 Microsoft Teams 上泄漏为可见的用户轮次（同类 bug 已在 Slack、Telegram、Feishu、Discord 上出现过）。
- [#139274](https://github.com/openclaw/openclaw/issues/139274) — 原生 `/codex` bind 丢弃语音便签附件并跳过已配置的 STT。
- [#95866](https://github.com/openclaw/openclaw/issues/95866) — 强制 gateway restart 使用 0 ms 回复 drain，并静默丢弃进行中的回复。

**当前为稳定性问题开启的修复 PR：** [#144488](https://github.com/openclaw/openclaw/pull/144488)（可配置/可恢复的 embedding 请求超时）、[#144519](https://github.com/openclaw/openclaw/pull/144519)（静默 heartbeat 不再重新投递上一条最终回复）、[#144521](https://github.com/openclaw/openclaw/pull/144521)（显示上限重新物化已退役的 live-buffer 字节）、[#140902](https://github.com/openclaw/openclaw/pull/140902)（在 context-overflow 预检中包含 tool-schema tokens）、[#144518](https://github.com/openclaw/openclaw/pull/144518)（让新建和恢复的 CLI 运行保持在同一个 session lane）、[#143391](https://github.com/openclaw/openclaw/pull/143391)（为原生 compaction 解析 CLI 执行认证身份）。

---

## 6. 功能请求与路线图信号

- **内置自动更新，支持计划、确认和更新后通知** — [#12855](https://github.com/openclaw/openclaw/issues/12855)（P2，自 2026-02-09 开启，需要安全审查）。随着 update-state bug（#139714）和打包激活风险（[#143752](https://github.com/openclaw/openclaw/issues/143752)）正在积极处理，一旦这些问题落地，托管式自动更新流程是下一版本可能的功能。
- **在 agent 处理前自动发送确认消息** — [#8285](https://github.com/openclaw/openclaw/issues/8285)（P3，自 2026-02-03 开启）。低成本的 UX 收益；很可能是配置级新增，而非核心重设计。
- **`message_sent` hooks 上的投递关联数据** — [#109370](https://github.com/openclaw/openclaw/issues/109370)。直接补充当前按 channel 落地的 durable-ingress 工作（#109657）；非常契合插件幂等投递的路线图。
- **Owner 作用域的 ClawHub skill 引用** — [#87764](https://github.com/openclaw/openclaw/pull/87764)（维护者撰写，约 3.5 个月）。将 skill 生态扩展到命名空间所有权；被标记存在兼容性和安全边界合并风险。
- **按 agent 的 `web_fetch` SSRF 覆盖** — [#67421](https://github.com/openclaw/openclaw/pull/67421)（自 2026-04-15 开启）。多租户/运维 agent 隔离请求。
- **远程浏览器任务的浏览器移动端交接** — [#143015](https://github.com/openclaw/openclaw/pull/143015)。解决手机发起的会话在 CAPTCHA/登录环节的人工介入缺口。
- **Mattermost 交互式 `ask_user` 按钮** — [#135350](https://github.com/openclaw/openclaw/pull/135350)。追赶 Telegram/Discord 的 channel 对齐。
- **在 UI 中暴露 gateway 隔离** — [#144243](https://github.com/openclaw/openclaw/pull/144243)。可运维性/加固信号。

**预测：** 最有可能近期落地的是 channel 对齐 PR（LINE 引用/多图、Mattermost 按钮）、浏览器移动端交接，以及 memory/embedding 超时修复。Owner 作用域的 ClawHub 引用和按 agent 的 SSRF 覆盖风险更高，可能会错过下一个 minor。

---

## 7. 用户反馈摘要

**按频率划分的痛点：**
1. **存储与进程泄漏** — `memory_index_chunks`/`memory_embedding_cache` 无界增长（[#114612](https://github.com/openclaw/openclaw/issues/114612)）、19 GB 孤立的 reindex 临时 DB（[#136311](https://github.com/openclaw/openclaw/issues/136311)），以及僵尸进程（[#97616](https://github.com/openclaw/openclaw/issues/97616)）。用户明确将其描述为“随时间推移会填满磁盘”，即长期运行主机的可持续性问题。
2. **延迟与锁争用** — 运行超大型 gateway 的运维人员报告 33 秒事件循环停顿（[#117262](https://github.com/openclaw/openclaw/issues/117262)）和 14–76 秒完整性检查阻塞（[#142476](https://github.com/openclaw/openclaw/issues/142476)）。
3. **升级与生命周期不确定性** — Doctor 拒绝旧版迁移（[#142585](https://github.com/openclaw/openclaw/issues/142585)）、包激活中断后 CLI 搁浅（[#143752](https://github.com/openclaw/openclaw/issues/143752)），以及 Windows 无人值守服务故障（[#143757](https://github.com/openclaw/openclaw/issues/143757)、[#140162](https://github.com/openclaw/openclaw/issues/140162)）。
4. **投递可信度** — 用户能看到 agent 完成工作，却仍然丢失最终答案（Telegram [#128971](https://github.com/openclaw/openclaw/issues/128971)、运行中 ack 丢失 [#139847](https://github.com/openclaw/openclaw/issues/139847)、restart drain [#95866](https://github.com/openclaw/openclaw/issues/95866)、WebChat 图片附件 [#103198](https://github.com/openclaw/openclaw/issues/103198)）。
5. **成本/token 开销** — 每轮注入约 686 tokens 的 `<system-reminder>` 运行时脚手架，且无法退出（[#141747](https://github.com/openclaw/openclaw/issues/141747)）——对高用量用户而言是直接的账单问题。
6. **Provider/auth 不稳定** — profile 编辑后模型误路由（[#144066](https://github.com/openclaw/openclaw/issues/144066)、[#101763](https://github.com/openclaw/openclaw/issues/101763)）、过期订阅阻塞（[#123009](https://github.com/openclaw/openclaw/issues/123009)）、本地 auth 实体化失败（[#141033](https://github.com/openclaw/openclaw/issues/141033)）。

**满意度信号：** 报告一贯详细且可复现，包含内部 ID（DEF-61）、精确 commit 和版本——这表明用户群体技术参与度高。许多 P1 issue 已被标记为 `queueable-fix`/`fix-shape-clear`，且 2026.8.1 beta 反馈线程被干净关闭，表明用户认为维护者响应及时。不满集中在*持续时间*，而非响应性：若干 P0/P1 事项（#91009 自 6 月、#95866 自 6 月、#112110 自 7 月）仍未关闭，等待安全或产品决策。

---

## 8. 积压事项观察

长期未答复或高影响、需要维护者关注的事项：

| 事项 | 类型 | 时长 | 重要性 |
|---|---|---|---|
| [#8285](https://github.com/openclaw/openclaw/issues/8285) | 功能（P3） | 约 7 个月（2026-02-03） | 简单的预处理确认；毫无进展。 |
| [#12855](https://github.com/openclaw/openclaw/issues/12855) | 功能（P2） | 约 7 个月（2026-02-09） | 自动更新是最反复出现的请求之一，且现在与进行中的 update-state 工作相互影响。 |
| [#67421](https://github.com/openclaw/openclaw/pull/67421) | PR（P2） | 约 5 个月（2026-04-15） | 按 agent 的 `web_fetch` SSRF 覆盖；卡在 `needs proof`，带有安全边界风险。 |
| [#79588](https://github.com/openclaw/openclaw/issues/79588) | Bug（P1） | 约 4 个月（2026-05-09） | Compaction 质量保护不验证标识符留存——摘要中 UUID/SHA/session key 的静默丢失。 |
| [#83440](https://github.com/openclaw/openclaw/pull/83440) | 功能（P2） | 约 4 个月（2026-05-18） | CLI 解决待处理的 exec 审批；安全边界审查待进行。 |
| [#87441](https://github.com/openclaw/openclaw/issues/87441) | Bug（P2） | 约 3.5 个月（2026-05-27） | Memory 诊断阈值参数从未接入配置——可观测性缺口。 |
| [#87764](https://github.com/openclaw/openclaw/pull/87764) | 功能（maintainer，P2） | 约 3.5 个月（2026-05-28） | Owner 作用域的 ClawHub 引用；影响面大（docs、web-ui、gateway、cli、agents）。 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Bug（P0） | 约 3 个月（2026-06-06） | CPU 密集的 hook relay 阻塞 gateway RPC；仍为 `needs-maintainer-review`。 |
| [#95866](https://github.com/openclaw/openclaw/issues/95866) | Bug（P1） | 约 2.5 个月（2026-06-22） | 强制 restart 丢弃进行中的回复；需要产品决策。 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Bug（P1） | 约 2.5 个月（2026-06-29） | 僵尸进程累积；与 #91009 配对，以共享子进程生命周期修复。 |
| [#112110](https://github.com/openclaw/openclaw/issues/112110) | 安全（P1） | 约 1.5 个月（2026-07-21） | Subagent MCP 工具授权针对父会话而非受限能力边界进行评估；`needs-security-review`。 |

**维护者行动呼吁：** 杠杆最高的集群是 **子进程生命周期 + SQLite 并发**（#91009、#97616、#117262、#142476、#143640、#136311）。一次协调一致的加固处理，围绕进程回收和 DB 事务大小，将一次性解决或降低六个未关闭 P0/P1 事项的风险，并直接应对跟踪器中可信度最高的生产中断报告。

---

## 横向生态对比

# 跨项目对比报告 — 个人 AI 助手 / Agent 开源生态
**数据窗口：2026-09-11 · 项目：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw**

---

## 1. 生态概览

2026 年末的个人 AI 助手 / Agent 开源格局正围绕一条共同的成熟度曲线收敛：项目已走过功能新奇阶段，如今正与**生产环境加固债务**作战——资源生命周期、会话完整性、消息投递保证与安全边界。一种明显的双速动态已经形成：一边是**高吞吐参考平台**（OpenClaw、QwenPaw），每日发布修复与版本；另一边是**贡献者众多但评审受限的项目**（ZeroClaw、Hermes），其接收量远超合并能力。每个项目都反复出现相同的痛点簇：无界的内存/SQLite 增长、未被回收的子进程、跨渠道泄漏身份的会话，以及脆弱的升级路径。安全不再是次要问题——沙箱逃逸、工具允许列表绕过、多租户凭证隔离，如今在五个项目中的四个里都列为最高严重级别事项。净信号是：生态正进入**可运维性与信任阶段**，决定哪些项目能留住自托管与企业用户的，是可靠性工程与治理——而非原始能力。

---

## 2. 活动对比

*数据反映滚动约 24 小时窗口。“吞吐” = 已关闭 issue + 已合并/关闭 PR。若摘要仅采样头部条目，长尾活动会被低估。*

| 项目 | Issues（触及 / 活跃 / 关闭） | PRs（触及 / 开放 / 合并-关闭） | 发布状态（24h） | 健康分* |
|---|---|---|---|---|
| **OpenClaw** | 421 / 235 / 186 | 500 / — / 264 | ✅ v2026.6.35（最终 June LTS） | **7.5 / 10** |
| **QwenPaw** | 29 / 19 / 10 | 35 / 23 / 12 | ✅ v2.2.1-beta.2 | **8.0 / 10** |
| **Hermes Agent** | 50 / 46 / 4 | 50 / 49 / 1 | ⛔ 无 | **6.0 / 10** |
| **ZeroClaw** | 50 / 50 / 0 | 50 / 50 / 0 | ⛔ 无（最后为 v0.8.3） | **5.0 / 10** |
| **IronClaw** | ~1 / 1 / 0 | 8 / 6 / 2 | ⛔ 无 | **7.0 / 10** |

*\*健康分是活动量、分类/合并吞吐、积压风险与未解决严重级别事项的综合评分（0–10 主观量表）。*

**关键观察：**
- **OpenClaw** 的原始吞吐约为任何同行的 ~10 倍，并维持 **>50% 的 PR 关闭率**——以其规模而言确实非同寻常。
- **QwenPaw** 给出最佳*平衡*信号：高活跃度，一天内关闭 10 个 issue、合并 12 个 PR，并发布一个 beta。
- **ZeroClaw** 呈现最尖锐的分化：**50 个开放 PR、0 个合并**——典型的评审容量瓶颈。
- **Hermes** 与 **IronClaw** 更安静；Hermes 有大量开放积压（49 个开放 PR）且消化极少，而 IronClaw 规模小、以维护为主（8 个 PR 中有 5 个是 Dependabot）。

---

## 3. OpenClaw 的定位

**相对同行的优势**
- **规模与速度：** 24 小时内触及 421 个 issue / 500 个 PR，其中 264 个 PR 已合并/关闭——比其余所有项目加起来还高一个数量级。这是生态的*事实参考实现*。
- **发布纪律：** 窗口期内只有 OpenClaw 与 QwenPaw 交付了软件；OpenClaw 正在管理成熟的 LTS/主线拆分（v2026.6.x LTS vs. 2026.9.x 主线），这是企业级生命周期管理的标志。
- **生态广度：** owner-scoped ClawHub 技能、按 agent 的 SSRF 策略、浏览器移动端交接、LINE/Mattermost 对等支持——它是唯一运营真正**插件/技能市场**维度的项目。
- **分类成熟度：** 许多 P1 已带有 `clawsweeper:queueable-fix` 标签和修复形态追踪，表明存在结构化、自动化的分类流水线。

**技术路线差异**
- OpenClaw 围绕 **gateway + durable-ingress worker + SQLite state** 架构构建，现正将规范化的持久入站扩展到 WhatsApp、Discord、Slack、Signal 和 iMessage（#109657）。同行仍在逐个渠道修补投递。
- 高度重视**大规模多 agent 集群**——**632 个 agent 的网关**（#142476）这一突出现场报告独一无二；没有同行被记录运行在该规模。
- 其弱点是该规模的架构副作用：无界的内存表、33 秒事件循环停顿，以及对数百个 agent DB 同步执行 `PRAGMA integrity_check`。

**社区规模对比**
OpenClaw 的参与度在类别上更大——其头部 issue 线程有 20–24 条评论，并带有 diamond-lobster/P0 标记，且有多个活跃 P0。QwenPaw 参与度最高的线程（Hub roadmap）有 24 条评论；Hermes 有两个自动化线程，分别有 193 和 85 条评论（但由机器人驱动）；ZeroClaw 的头部线程有 19 条评论。**OpenClaw 是唯一 issue 量、贡献者数与发布节奏都处于大规模层级的项目**——同行要么属于“小而健康”（IronClaw），要么属于“大量接收、消化受限”（ZeroClaw/Hermes）。

---

## 4. 共同技术聚焦领域

这些需求在**多个**项目中浮现，代表生态级缺口：

| 需求 | 项目 | 具体证据 |
|---|---|---|
| **资源生命周期 / 进程回收** | OpenClaw, Hermes, ZeroClaw | 僵尸子进程（OpenClaw #97616）、孤立的 Chrome（Hermes #32047）、浏览器守护进程回收器盲区（Hermes #100855）、无界 RSS 增长（ZeroClaw #8642）、CPU 受限的 hook relay（OpenClaw #91009） |
| **存储 / SQLite 治理** | OpenClaw, QwenPaw, Hermes | 内存表无保留策略（OpenClaw #114612）、19 GB 孤儿 reindex 临时 DB（#136311）、FTS 损坏修复（QwenPaw #7655）、`PRAGMA quick_check` 缓存（QwenPaw #7639） |
| **消息投递可靠性 / 持久入站** | OpenClaw, QwenPaw, ZeroClaw | Telegram 最终回复丢失（OpenClaw #128971）、跨渠道持久入站（#109657）、Feishu 队列消费者卡死（QwenPaw #7534）、终端响应被错误报告为成功（ZeroClaw #9421） |
| **会话 / 跨渠道隔离** | QwenPaw, OpenClaw, Hermes | 控制台停止取消 Feishu 会话（QwenPaw #7011）、错误会话投递（#7231）、重复会话创建（#7661）、会话头缺失（Hermes #65094） |
| **安全边界（沙箱、允许列表、租户隔离）** | QwenPaw, ZeroClaw, IronClaw, OpenClaw | Windows 沙箱绕过（QwenPaw #7672）、`delegate` 工具允许列表绕过（ZeroClaw #8279）、shell 工作区边界绕过（#9247）、MCP 跨调用方工具覆盖（IronClaw #8090）、子 agent 对父会话的 MCP 认证（OpenClaw #112110） |
| **平台对等（Windows / macOS）** | OpenClaw, Hermes, ZeroClaw | Windows gateway 生命周期（OpenClaw #140162）、`.sh` cron 路径被篡改（Hermes #43073）、74 个 Windows 测试失败（ZeroClaw #7462） |
| **升级 / 更新可靠性** | OpenClaw, Hermes, QwenPaw | Doctor 拒绝旧版迁移（OpenClaw #142585）、Windows 自更新假失败（Hermes #107685）、update-state 永远卡住（OpenClaw #139714） |
| **渠道对等与新渠道** | OpenClaw, QwenPaw, ZeroClaw, IronClaw | LINE/Mattermost（OpenClaw）、ntfy — *实现就绪*（QwenPaw #7657）、Sendblue iMessage/SMS（ZeroClaw #10768）、Telegram 命令菜单（IronClaw #8072） |
| **内存架构与成本控制** | OpenClaw, QwenPaw, Hermes | 可配置 embedding 超时（OpenClaw #144488）、`memory_model` 解耦（#7664）、跨重启持久内存（#7656）、按会话模型覆盖（QwenPaw #5992） |
| **多租户 / 企业就绪** | QwenPaw, IronClaw, OpenClaw | Hub 多租户路线图（QwenPaw #7318，24 条评论）、按调用方 MCP 目录（IronClaw #8090）、按 agent 的 SSRF/web_fetch 作用域（OpenClaw #67421） |
| **本地 / 自托管模型摩擦** | QwenPaw, ZeroClaw, Hermes | 通过 Hub 的 LAN 模型端点（QwenPaw #7445）、HF 下载/量化选择（#7666）、Hailo-Ollama provider 被阻塞（ZeroClaw #9109）、Codex 兼容 provider（Hermes #65094） |

**收敛信号：** 行业的下一个难题不是“更多 agent 能力”，而是**遏制**——遏制进程、存储、会话、凭证与爆炸半径。每个项目都独立得出这一点，因此它是一项经过验证、横切各方的需求，而非某家厂商的路线图选择。

---

## 5. 差异化分析

| 维度 | OpenClaw | QwenPaw | Hermes Agent | ZeroClaw | IronClaw |
|---|---|---|---|---|---|
| **主要焦点** | 规模、多 agent 集群、LTS 生命周期 | 发布前硬化、多租户 “Hub” | 桌面 + 插件生态 | 安全/认证 + 平台可移植性 | 精简 WebUI + 渠道集成 |
| **目标用户** | 自托管集群、运维/企业操作者 | 团队、多租户/管理员、移动用户 | 桌面高级用户、插件开发者 | 安全意识强的用户 + Windows/非 Linux 用户 | 轻量/自托管者、CJK 用户 |
| **架构** | Gateway + durable-ingress + SQLite state；技能市场（ClawHub） | Console + IM 渠道（WeCom/Feishu/Telegram/Matrix）；ReMe memory；Hub 版 | 桌面应用（Electron 风格）、插件运行时、TUI | Rust 原生、RPC dispatch、ACP、OIDC/PKCE auth stack | Rust 后端 + WebUI、以 MCP 为中心 |
| **标志性差异点** | 632-agent 单网关规模；按渠道持久入站 | 会话管理命令在 IM 对等支持中落地（#6978）；Hub 多租户路线图 | 参与度最高的自动化（193 条评论线程）；桌面内存/UX | RFC 驱动治理；供应链证明整合 | MCP 多租户正确性；IME/CJK 输入处理 |
| **架构成熟阶段** | 成熟、扩展中 | 走向 GA 前硬化 | 功能丰富、维护压力大 | 重构中（auth stack 未落地） | 小型、稳定 |

**解读：** OpenClaw 优化*广度与规模*；QwenPaw 优化*多租户/团队部署*；Hermes 优化*桌面深度*；ZeroClaw 优化*安全与 Rust 原生可移植性*；IronClaw 优化*精简 MCP 集成*。它们很大程度上互补而非直接替代——表明生态正按部署模式（集群 vs. 桌面 vs. 团队 vs. 单用户）细分，而非收敛到一种形态。

---

## 6. 社区动能与成熟度

**活动层级（按吞吐而非接收量）：**

- **第 1 层 — 高速度、高消化：** *OpenClaw*（264 个 PR 已合并/关闭；44% issue / 53% PR 关闭率）。*QwenPaw*（合并 12 个 PR、关闭 10 个 issue；小修复周转快——#7663、#7667 当日交付）。
- **第 2 层 — 大量接收、消化受限：** *ZeroClaw*（50 个开放 PR，**0 个合并**）——本组中最严重的容量风险；一个堆叠的 7 层 auth 系列与两个 `do-not-merge` XL PR 有无限期停滞风险。*Hermes*（49 个开放 PR，1 个合并）——7 月/8 月合并积压，桌面 P1 缺少可见修复 PR。
- **第 3 层 — 低活动、稳定：** *IronClaw*（8 个 PR，多为 Dependabot；1 个开放 issue）——安静但功能健康；仅维护姿态。

**迭代 vs. 稳定：**
- **快速迭代：** OpenClaw（v2026.9.x 主线频繁变动）、QwenPaw（2.2.1 beta 周期、积压燃尽）。
- **试图稳定但受阻：** ZeroClaw（auth 统一、Windows CI）与 Hermes（桌面可靠性）——两者都有*内容*，但没有推进所需的*评审吞吐*。
- **已稳定 / 低野心：** IronClaw。

**成熟度裁决：** 只有 OpenClaw 与 QwenPaw 展示了持续交付。ZeroClaw 与 Hermes 显现**结构性维护者容量约束**——生态的约束瓶颈如今是评审者/合并者时间，而非贡献者意愿。

---

## 7. 趋势信号

从跨项目社区反馈中提取，按对 AI-agent 开发者的战略价值排序：

1. **资源生命周期是新的可靠性前沿。** 无界内存表、僵尸进程与 SQLite 锁竞争在规模下主导抱怨（OpenClaw 的 632-agent 网关、ZeroClaw 的 OOM 报告、Hermes 的 5 GB 渲染器占用）。*价值：* 将保留策略、进程回收器与有界事务大小作为一等功能交付——而非事后补丁。

2. **投递保证是信任前提。** 用户能容忍 agent 慢，但不能容忍最终答案无声丢失（OpenClaw Telegram/WebChat、QwenPaw Feishu、ZeroClaw 终端成功假阳性）。*价值：* 持久入站 + 幂等投递 + 投递关联钩子（OpenClaw #109370）将成为基本要求。

3. **安全边界正在生产环境被压力测试。** 沙箱逃逸（QwenPaw）、工具允许列表绕过（ZeroClaw）、MCP 租户覆盖（IronClaw）与父会话认证泄漏（OpenClaw）都是开放、高严重级别，且常常*没有修复 PR*。*价值：* 按 agent/按调用方隔离与能力作用域委派正成为新兴需求，而非可选硬化。

4. **多租户/企业就绪是下一个产品前沿。** QwenPaw 的 Hub 路线图（24 条评论）、IronClaw 的按调用方 MCP 目录，以及 OpenClaw 的 owner-scoped 技能都指向同一方向。*价值：* RBAC、命名空间技能与管理员管理策略是解锁团队与企业采用的功能。

5. **内存成本控制与持久内存正在融合。** 将摘要与昂贵的主 LLM 解耦（QwenPaw #7664）、embedding 超时恢复（OpenClaw #144488）与跨重启持久内存（#7656）反映了将内存视为*受治理基础设施*的成熟观点。

6. **平台对等（尤其是 Windows + CJK）是服务不足的市场。** Windows 生命周期故障、非 Apple iMessage（Sendblue）、IME 组合与本地化配置缺口反复出现。*价值：* 跨平台 CI（ZeroClaw #7461）与国际化是低风险、高差异化的收益。

7. **治理与 CI 吞吐如今制约交付。** ZeroClaw 的 RFC 投票与评审证据争论、15–20 分钟 CI 运行，加上 Hermes 的合并积压，表明**开发者体验与流程摩擦直接抑制发布速度**。*价值：* 投资合并自动化与快速 CI 与功能工作同样具有战略重要性。

8. **Provider/auth 抖动仍是持续税负。** 过期的 auth-profile 状态（OpenClaw #144066）、会话头缺失（Hermes #65094）与 OIDC/PKCE 现代化（ZeroClaw）表明，随着 provider 多样性增长，auth/路由正确性是一个持续成本中心。

**给决策者的底线：** 未来 6–12 个月的赢家项目，将是那些把*可靠性工程*（生命周期、投递、隔离）与*评审/CI 吞吐*转化为交付速度的项目。OpenClaw 在规模上领先，QwenPaw 在均衡执行上领先，而生态的集体未满足需求是**遏制、正确性与企业级治理**。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-11

## 1. 今日概览
Hermes Agent 依然非常活跃：过去 24 小时内更新了 50 个 issue 和 50 个 PR，其中 46 个 issue 仍处于开放/活跃状态，49 个 PR 仍开放。维护者今日处理量较低——仅关闭 4 个 issue，合并/关闭 1 个 PR——且没有新版本发布。主要主题是桌面端稳定性/性能、插件加载回归、cron/gateway 可靠性以及 Windows/macOS 平台缺口。项目显示出较强的用户报告和分诊活动，但待修复积压和高评论量的自动化 issue 表明维护压力较大。

## 2. 发布
过去 24 小时内没有新版本发布。没有可用的破坏性变更或迁移说明。

## 3. 项目进展
仅 **1 个 PR 被合并/关闭**，且它不在所示前 20 个 PR 中，因此无法总结详情。今日关闭的 issue 包括：
- [#96391](https://github.com/NousResearch/hermes-agent/issues/96391) — `hermes cron run` 绕过了每次触发用量审计；手动运行在成本审计中不可见。已关闭。
- [#107484](https://github.com/NousResearch/hermes-agent/issues/107484) — Windows 打包构建：所有运行时磁盘插件均无法加载。已作为重复项关闭。
- [#17961](https://github.com/NousResearch/hermes-agent/issues/17961) — TUI 调整大小出现幽灵副本。已关闭。
- [#107304](https://github.com/NousResearch/hermes-agent/issues/107304) — 桌面端生产构建：所有磁盘上的插件均无法加载。已作为重复项关闭。

大部分实际代码进展仍体现在开放的 PR 中，而非已合并变更。值得注意的开放修复包括：
- [#98511](https://github.com/NousResearch/hermes-agent/pull/98511) — cron 执行历史保留。
- [#107793](https://github.com/NousResearch/hermes-agent/pull/107793) — Kanban `initial_status=blocked` 粘滞问题。
- [#107795](https://github.com/NousResearch/hermes-agent/pull/107795) — gateway `/save` 投递适配器。
- [#84236](https://github.com/NousResearch/hermes-agent/pull/84236) — 中断轮次的可见结束消息。
- [#105308](https://github.com/NousResearch/hermes-agent/pull/105308) — 回放历史规范化。

## 4. 社区热门话题
所提供数据中没有 PR 评论数，因此热门列表由 issue 驱动。

| 条目 | 类型 | 评论 / 反应 | 潜在需求 |
|---|---:|---:|---|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | 未关闭 issue | 193 条评论，0 👍 | 技能索引陈旧/降级；自动化新鲜度看门狗需要持久修复。 |
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | 未关闭 issue | 85 条评论，0 👍 | 自动化 Nous-to-Enterkey 集成因 `cron/jobs.py` 冲突被阻塞；计划维护可靠性。 |
| [#77311](https://github.com/NousResearch/hermes-agent/issues/77311) | 未关闭 P1 | 8 条评论，0 👍 | 桌面端渲染器将所有消息保留在内存中；fleet 占用 5 GB。需要会话驱逐/资源限制。 |
| [#84361](https://github.com/NousResearch/hermes-agent/issues/84361) | 未关闭 P2 | 8 条评论，0 👍 | 桌面端 `MEDIA:` 文件链接失效，原因是正则/URI 处理；桌面端文件打开 UX。 |
| [#32047](https://github.com/NousResearch/hermes-agent/issues/32047) | 未关闭 P2 | 6 条评论，0 👍 | Windows `agent-browser` 遗留 200+ 个孤立 Chrome 进程；需要生命周期清理。 |
| [#18990](https://github.com/NousResearch/hermes-agent/issues/18990) | 未关闭 P3 | 5 条评论，0 👍 | Kimi Coding 视觉支持被错误阻止；提供商能力更新。 |
| [#101535](https://github.com/NousResearch/hermes-agent/issues/101535) | 未关闭 P2 | 5 条评论，0 👍 | 桌面端 v0.21.0 Bot Mode “Bots” 标签页缺失；功能可发现性/回归。 |
| [#65094](https://github.com/NousResearch/hermes-agent/issues/65094) | 未关闭 P2 | 5 条评论，0 👍 | 自定义 Codex 兼容 `/v1` 提供商省略 Hermes 会话头；提供商兼容性。 |
| [#43073](https://github.com/NousResearch/hermes-agent/issues/43073) | 未关闭 P2 | 5 条评论，0 👍 | Windows `.sh` cron 脚本因反斜杠路径改写而失败；跨平台 cron。 |

## 5. Bug 与稳定性
按严重性和可见影响排序：

**P1 / 高影响**
- [#77311](https://github.com/NousResearch/hermes-agent/issues/77311) — 桌面端渲染器内存无限制增长；重度使用后 fleet 占用达 5 GB。未关闭。前 20 中未见修复 PR。
- [#79859](https://github.com/NousResearch/hermes-agent/issues/79859) — 桌面端 “Talk to Hermes” 在使用 OpenAI TTS 时仍采用延迟的整文件 MP3 播放。未关闭，1 👍。
- [#107721](https://github.com/NousResearch/hermes-agent/issues/107721) — 桌面端：更新后所有运行时加载的插件均失败（“Cannot convert undefined or null to object”）。这是更广泛插件加载事件的开放重复项；相关的 [#107484](https://github.com/NousResearch/hermes-agent/issues/107484) 和 [#107304](https://github.com/NousResearch/hermes-agent/issues/107304) 已作为重复项关闭。

**P2 / 稳定性与平台**
- [#84361](https://github.com/NousResearch/hermes-agent/issues/84361) — 桌面端 `MEDIA:` 文件链接失效；标签正则和 `file://` 处理损坏。
- [#32047](https://github.com/NousResearch/hermes-agent/issues/32047) — Windows `agent-browser` 遗留孤立 Chrome 进程。
- [#101535](https://github.com/NousResearch/hermes-agent/issues/101535) — 桌面端 Bot Mode 的 Bots 标签页缺失。
- [#65094](https://github.com/NousResearch/hermes-agent/issues/65094) — Codex 兼容提供商省略 Hermes 会话头。
- [#43073](https://github.com/NousResearch/hermes-agent/issues/43073) — Windows `.sh` cron 脚本因反斜杠路径改写而失败。
- [#87822](https://github.com/NousResearch/hermes-agent/issues/87822) — A2A 快速单轮 `message/send` 返回空文本。
- [#100855](https://github.com/NousResearch/hermes-agent/issues/100855) — 浏览器守护进程对孤立进程回收器不可见；卡死的守护进程存活了 47 小时。
- [#107774](https://github.com/NousResearch/hermes-agent/issues/107774) — macOS 折叠侧边栏标签绘制到标题栏上并遮挡展开按钮。
- [#91547](https://github.com/NousResearch/hermes-agent/issues/91547) — `hermes gateway restart` 与自身端口竞争，并在没有 API server 的情况下运行。
- [#107559](https://github.com/NousResearch/hermes-agent/issues/107559) — Cron 手动重新触发被陈旧的内存触发锁永久阻塞。
- [#107666](https://github.com/NousResearch/hermes-agent/issues/107666) — 桌面端 cron 列出 `profile=all` 但保存活动 profile；非所有者作用域返回 404。
- [#107685](https://github.com/NousResearch/hermes-agent/issues/107685) — Windows 自更新将健康安装报告为 FAILED 退出码 8。

**P3 / 严重性较低但反复出现**
- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — 技能索引陈旧/降级。
- [#107661](https://github.com/NousResearch/hermes-agent/issues/107661) 和 [#107758](https://github.com/NousResearch/hermes-agent/issues/107758) — Kanban 因模块缺失/导入损坏而不可用。
- [#87739](https://github.com/NousResearch/hermes-agent/issues/87739) — `/hatch` 在重试无法分割的行时消耗付费图片请求。修复 PR：[#87803](https://github.com/NousResearch/hermes-agent/pull/87803)、[#107796](https://github.com/NousResearch/hermes-agent/pull/107796)。
- [#107784](https://github.com/NousResearch/hermes-agent/issues/107784) — Kanban 依赖类型阻塞会重新派发 worker。修复 PR：[#107793](https://github.com/NousResearch/hermes-agent/pull/107793)。

若干 issue 已有修复 PR，包括 [#84236](https://github.com/NousResearch/hermes-agent/pull/84236)、[#105308](https://github.com/NousResearch/hermes-agent/pull/105308)、[#107483](https://github.com/NousResearch/hermes-agent/pull/107483)、[#107047](https://github.com/NousResearch/hermes-agent/pull/107047)、[#67779](https://github.com/NousResearch/hermes-agent/pull/67779)、[#79052](https://github.com/NousResearch/hermes-agent/pull/79052) 和 [#80760](https://github.com/NousResearch/hermes-agent/pull/80760)。然而，P1 桌面端内存和插件加载事件在前 20 中尚未显示可见的修复 PR。

## 6. 功能请求与路线图信号
- [#107700](https://github.com/NousResearch/hermes-agent/issues/107700) — `feat(secrets)`：source-apply 水合、工具凭据句柄、HTTP 注入包装。安全/密钥管理路线图信号。
- [#96299](https://github.com/NousResearch/hermes-agent/issues/96299) — 用于 Kanban 分派的共享命名容量池。标记为 `needs-decision`；可能需要设计批准。
- [#104586](https://github.com/NousResearch/hermes-agent/pull/104586) — OpenRouter 服务层级：flex/priority、按模型覆盖、可选 TTFT 升级。若被接受，是下一个功能合并的有力候选。
- [#98511](https://github.com/NousResearch/hermes-agent/pull/98511) — Cron 执行历史保留公平性。可能作为 cron 可靠性/配置改进落地。
- [#107794](https://github.com/NousResearch/hermes-agent/pull/107794) — 飞书卡片正文润色及耗时/模型页脚。平台特定消息增强。
- [#82155](https://github.com/NousResearch/hermes-agent/pull/82155) — 在 CLI 配置器中暴露可配置搜索工具集。
- [#80760](https://github.com/NousResearch/hermes-agent/pull/80760) — 跨后端的私有持久化结果写入。安全加固。
- [#67779](https://github.com/NousResearch/hermes-agent/pull/67779) — 用于视觉的 `file://` URI 中的 Windows 驱动器盘符。
- [#79052](https://github.com/NousResearch/hermes-agent/pull/79052) — 为委派子项保留活动 profile 的 SOUL 身份。
- [#84236](https://github.com/NousResearch/hermes-agent/pull/84236) — 中断轮次的可见结束消息和结构化 `stop_kind`。

可能的下一版本信号：插件加载热修复、桌面端会话/内存修复、cron 保留/配置、OpenRouter 服务层级、飞书卡片润色，以及 Windows/macOS 平台兼容性修复。没有可用于确认时间安排的发布节奏数据。

## 7. 用户反馈摘要
真实用户痛点集中在几个方面：
- **桌面端可靠性与性能：** 渲染器内存无限制增长（[#77311](https://github.com/NousResearch/hermes-agent/issues/77311)）、`MEDIA:` 链接失效（[#84361](https://github.com/NousResearch/hermes-agent/issues/84361)）、Bot Mode 标签页缺失（[#101535](https://github.com/NousResearch/hermes-agent/issues/101535)）、侧边栏/标题栏重叠（[#107774](https://github.com/NousResearch/hermes-agent/issues/107774)）以及 TTS 播放延迟（[#79859](https://github.com/NousResearch/hermes-agent/issues/79859)）。
- **插件生态损坏：** 多位用户报告更新后所有运行时加载的插件均失败（[#107721](https://github.com/NousResearch/hermes-agent/issues/107721)，重复项 [#107484](https://github.com/NousResearch/hermes-agent/issues/107484)、[#107304](https://github.com/NousResearch/hermes-agent/issues/107304)）。这是一个高度令人沮丧的回归，因为它会全局禁用已安装扩展。
- **Windows 平台缺口：** 孤立 Chrome 进程（[#32047](https://github.com/NousResearch/hermes-agent/issues/32047)）、cron `.sh` 路径改写（[#43073](https://github.com/NousResearch/hermes-agent/issues/43073)）以及自更新误报失败（[#107685](https://github.com/NousResearch/hermes-agent/issues/107685)）。
- **Cron/gateway/成本可靠性：** 手动 cron 锁（[#107559](https://github.com/NousResearch/hermes-agent/issues/107559)）、profile 作用域 404（[#107666](https://github.com/NousResearch/hermes-agent/issues/107666)）、gateway 重启竞争（[#91547](https://github.com/NousResearch/hermes-agent/issues/91547)）以及 `/hatch` 消耗付费图片请求（[#87739](https://github.com/NousResearch/hermes-agent/issues/87739)）。
- **参与模式：** 大多数热门 issue 为 0 👍；仅 [#79859](https://github.com/NousResearch/hermes-agent/issues/79859) 和已关闭的 [#17961](https://github.com/NousResearch/hermes-agent/issues/17961) 显示 1 👍。评论主要由详细 bug 报告和自动化噪声主导，而非广泛的功能热情。

整体满意度信号好坏参半：用户正在积极测试和报告，部分 issue 已作为重复项关闭或得到修复，但桌面端和 Windows 回归正在造成明显不满。

## 8. 积压事项观察
需要维护者关注的长期运行或高关注度事项：
- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — 193 条评论；自动化技能索引看门狗。需要策略/自动化修复，而非反复探测。
- [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — 85 条评论；自动化 Nous 集成因合并冲突被阻塞。需要明确调度/冲突解决责任。
- [#32047](https://github.com/NousResearch/hermes-agent/issues/32047) — 开放于 2026-05-25；Windows 孤立 Chrome 进程。长期存在的 P2。
- [#18990](https://github.com/NousResearch/hermes-agent/issues/18990) — 开放于 2026-05-02；Kimi Coding 视觉支持。旧的提供商兼容性 issue。
- [#43073](https://github.com/NousResearch/hermes-agent/issues/43073) — 开放于 2026-06-09；Windows cron `.sh` 失败。跨平台积压。
- [#65094](https://github.com/NousResearch/hermes-agent/issues/65094) — 开放于 2026-07-15；Codex 兼容提供商会话头。
- [#72202](https://github.com/NousResearch/hermes-agent/issues/72202) — 开放于 2026-07-26；自定义提供商回退丢失 `reasoning_effort`。
- [#87822](https://github.com/NousResearch/hermes-agent/issues/87822) — 开放于 2026-08-16；A2A 快速单轮回复返回空文本。
- [#91547](https://github.com/NousResearch/hermes-agent/issues/91547) — 开放于 2026-08-21；gateway 重启竞争。
- [#100855](https://github.com/NousResearch/hermes-agent/issues/100855) — 开放于 2026-09-02；浏览器守护进程孤立回收器盲区。
- [#105308](https://github.com/NousResearch/hermes-agent/pull/105308) — 开放于 2026-09-07；P1 回放历史规范化。重要但仍未关闭。
- 7 月/8 月长期开放的 PR：[#67779](https://github.com/NousResearch/hermes-agent/pull/67779)、[#71581](https://github.com/NousResearch/hermes-agent/pull/71581)、[#71674](https://github.com/NousResearch/hermes-agent/pull/71674)、[#74011](https://github.com/NousResearch/hermes-agent/pull/74011)、[#74026](https://github.com/NousResearch/hermes-agent/pull/74026)、[#79052](https://github.com/NousResearch/hermes-agent/pull/79052)、[#80760](https://github.com/NousResearch/hermes-agent/pull/80760)、[#82155](https://github.com/NousResearch/hermes-agent/pull/82155)、[#84236](https://github.com/NousResearch/hermes-agent/pull/84236)。这些表明存在审查/合并积压，可能拖慢路线图交付。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-11

## 今日概览
截至 2026-09-11，IronClaw 在过去 24 小时内记录到 8 个 PR 更新（6 个开放，2 个已关闭/已合并）、1 个开放 issue 更新，没有新版本发布。活动量低到中等，且以维护为主：8 个 PR 中有 5 个是 Dependabot 依赖升级，另有 3 个是人工提交的更改，涉及 Telegram、WebUI 输入和 MCP 隔离。两个 PR 已关闭/已合并：Telegram 命令菜单功能（[#8072](https://github.com/nearai/ironclaw/pull/8072)）和一个较旧的 Rust 依赖组（[#8080](https://github.com/nearai/ironclaw/pull/8080)）；一个涉及 24 项更新的更广泛替代 PR（[#8097](https://github.com/nearai/ironclaw/pull/8097)）仍处于开放状态。最重要的开放工作是（[#8090](https://github.com/nearai/ironclaw/pull/8090)），这是一个针对跨调用方 MCP 工具覆盖的高影响修复；另外还有（[#8092](https://github.com/nearai/ironclaw/pull/8092)），用于聊天输入框中的 IME 组合输入。总体来看，项目健康状况稳定但较为平静，维护和缺陷修复活跃，但本时间窗口内没有发布或社区讨论。

## 版本发布
未发布新版本。最新发布：无。

## 项目进展
- **已关闭/已合并 — Telegram 命令 UX 推进：**（[#8072](https://github.com/nearai/ironclaw/pull/8072)）`feat(telegram): register the Bot API command menu at activation`。Telegram 的聊天菜单现在会列出已声明的命令——`/model`、`/status`、`/new`、`/stop`、`/interrupt`——这些命令在扩展激活时通过 `setMyCommands` 注册，并通过 `deleteMyCommands` 尽力清理。
- **已关闭/已合并 — Rust 依赖组刷新：**（[#8080](https://github.com/nearai/ironclaw/pull/8080)）将“everything-else” Rust 组升级了 21 项更新。一个更新的、范围更大的 PR（[#8097](https://github.com/nearai/ironclaw/pull/8097)）现在提议 24 项更新，因此 #8080 似乎已因更大的升级而被关闭。
- **开放修复推进中，尚未合并：**（[#8090](https://github.com/nearai/ironclaw/pull/8090)）将发现的托管 MCP 目录按调用方而不是按扩展作为键；（[#8092](https://github.com/nearai/ironclaw/pull/8092)）在 WebUI 聊天输入框中保留 IME 组合输入。
- **开放依赖维护：**（[#8097](https://github.com/nearai/ironclaw/pull/8097)）Rust 组，（[#8096](https://github.com/nearai/ironclaw/pull/8096)）Vitest，（[#8094](https://github.com/nearai/ironclaw/pull/8094)）js-yaml，以及（[#8095](https://github.com/nearai/ironclaw/pull/8095)）baseline-browser-mapping。

## 社区热点话题
按互动指标来看没有热点话题：唯一一个 issue（[#8093](https://github.com/nearai/ironclaw/issues/8093)）有 0 条评论和 0 个 👍，而提供的信息流中无法获得 PR 评论数。按内容来看最实质的讨论串是：
- （[#8090](https://github.com/nearai/ironclaw/pull/8090)）— 托管 MCP 目录隔离；底层需求是当工具列表依赖凭据时的多租户正确性。
- （[#8092](https://github.com/nearai/ironclaw/pull/8092)）— IME/Safari 聊天输入框处理；底层需求是可靠的国际化文本输入。
- （[#8072](https://github.com/nearai/ironclaw/pull/8072)）— Telegram 命令菜单注册；底层需求是频道命令的可发现性。
- （[#8093](https://github.com/nearai/ironclaw/issues/8093)）— `officeqa` 的每日失败分类；底层需求是基准/评估可靠性和模型错误分类。

## 缺陷与稳定性
按严重程度排序：
1. **高 — MCP 跨调用方工具覆盖：**（[#8090](https://github.com/nearai/ironclaw/pull/8090)）描述了一个托管 MCP 服务器，其工具列表取决于凭据；发现的目录按扩展 ID 发布，因此用户 A 和用户 B 的工具会互相覆盖。修复 PR 已开放。
2. **中 — WebUI IME 组合输入回归：**（[#8092](https://github.com/nearai/ironclaw/pull/8092)）处理原生 IME 组合键、命令菜单处理、回车发送以及 Safari 的 `keyCode 229` 行为。修复 PR 已开放，并包含回归用例。
3. **低/维护 — 依赖缺陷修复：**（[#8096](https://github.com/nearai/ironclaw/pull/8096)）Vitest `4.1.9 → 4.1.11`，（[#8094](https://github.com/nearai/ironclaw/pull/8094)）js-yaml `4.3.1 → 4.3.2`，以及（[#8095](https://github.com/nearai/ironclaw/pull/8095)）baseline-browser-mapping `2.10.17 → 2.11.22`。
4. **质量信号，而非代码缺陷：**（[#8093](https://github.com/nearai/ironclaw/issues/8093)）报告称 `officeqa` 的 42 个未通过任务“绝大多数是真正的模型错误”，指向模型/评估问题而非测试框架故障。

今天的 issue 信息流中没有明确报告崩溃或安全回归。

## 功能请求与路线图信号
- **Telegram 命令菜单**（[#8072](https://github.com/nearai/ironclaw/pull/8072)）：已关闭/已合并；如果尚未发布，很可能会出现在下一个版本中。
- **WebUI 国际化/输入**（[#8092](https://github.com/nearai/ironclaw/pull/8092)）：IME 和 Safari 回车处理是更广泛 CJK/IME 支持的强烈信号。
- **多租户 MCP 正确性**（[#8090](https://github.com/nearai/ironclaw/pull/8090)）：按调用方区分目录对托管/企业 MCP 部署很重要。
- **依赖现代化**（[#8097](https://github.com/nearai/ironclaw/pull/8097)、[#8096](https://github.com/nearai/ironclaw/pull/8096)、[#8094](https://github.com/nearai/ironclaw/pull/8094)、[#8095](https://github.com/nearai/ironclaw/pull/8095)）：持续维护；注意 #8097 中的 `base64 0.22.1 → 0.23.1`、`uuid 1.24.0 → 1.26.0` 和 `rust_decimal` 更新可能需要兼容性审查。
- **基准失败分类**（[#8093](https://github.com/nearai/ironclaw/issues/8093)）：可能推动评估自动化或模型路由修复。

提供的数据中没有出现明确的用户请求功能。

## 用户反馈摘要
本时间窗口内没有直接用户反馈：该 issue 上没有记录到评论或反应，且 PR 评论数不可用。从代码变更推断出的痛点包括：
- 在依赖凭据的托管服务器上，跨用户的 MCP 工具覆盖（[#8090](https://github.com/nearai/ironclaw/pull/8090)）。
- WebUI 聊天输入框中的 IME/CJK/Safari 输入摩擦（[#8092](https://github.com/nearai/ironclaw/pull/8092)）。
- Telegram 命令可发现性（[#8072](https://github.com/nearai/ironclaw/pull/8072)）。
- `officeqa` 基准运行中的模型失败（[#8093](https://github.com/nearai/ironclaw/issues/8093)）。

无法从互动数据衡量满意度/不满意度，但开放的修复 PR 表明维护者对正确性和 UX 问题响应积极。

## 积压观察
- （[#8090](https://github.com/nearai/ironclaw/pull/8090)）— 自 2026-09-08 起开放，2026-09-10 更新，未记录到评论。高优先级 MCP 租户隔离修复；需要评审/合并关注。
- （[#8093](https://github.com/nearai/ironclaw/issues/8093)）— 0 条评论；每日失败分类可能需要分诊、标签或跟进。
- （[#8092](https://github.com/nearai/ironclaw/pull/8092)）— 新的 IME 修复；需要评审。
- （[#8097](https://github.com/nearai/ironclaw/pull/8097)）— 包含 `base64 0.23.1` 的 24 包 Rust 升级；需要 CI/兼容性验证。
- 低风险依赖 PR：（[#8096](https://github.com/nearai/ironclaw/pull/8096)）、（[#8094](https://github.com/nearai/ironclaw/pull/8094)）、（[#8095](https://github.com/nearai/ironclaw/pull/8095)）。

提供的数据中看不到超过数天仍长期未答复的 issue 或 PR。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-11

*数据窗口：过去 24 小时 · 来源：github.com/agentscope-ai/QwenPaw*

---

## 1. 今日概览

QwenPaw 正处于活跃的发布前加固周期。过去 24 小时内，仓库有 **29 个 issue 更新**（19 个开放/活跃，10 个已关闭）和 **35 个 PR 更新**（23 个开放，12 个已合并/已关闭），另有 **一个新 beta 版本（v2.2.1-beta.2）**。今日的主要主题是 **bug 修复整合**：大量 Console、渠道（WeCom/飞书/Telegram）以及会话路由缺陷被关闭，同时长期开放的会话管理功能 PR（#6978）终于落地。活动量远高于基线，并偏向稳定性而非新增功能面，不过若干 **未解决的 subagent 与沙箱安全问题**（见 §5）是该 beta 系列的主要风险。

---

## 2. 发布

### v2.2.1-beta.2 (Beta)
发布页面：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2

包含的变更：
- **feat(console): improve mobile agent selector** — [PR #7623](https://github.com/agentscope-ai/QwenPaw/pull/7623) (@zhaozhuang521)
- **chore: bump version to 2.2.1b2** — [PR #7643](https://github.com/agentscope-ai/QwenPaw/pull/7643) (@cuiyuebing)
- **fix(console): align qwenpaw CSS selectors** — (@zhaozhuang，PR 在源数据中被截断)

**破坏性变更 / 迁移说明：** 发布说明中未标明。

**发布流程信号：** 一个自动化的 Release Duty 验证 issue 已开启 — [#7674](https://github.com/agentscope-ai/QwenPaw/issues/7674) “QwenPaw v2.2.1-beta.2 (Beta) — Installation Verification” — 附带跨平台检查点的 **4 小时通过截止时间**。发布说明 PR [#7673](https://github.com/agentscope-ai/QwenPaw/pull/7673) 仍处于开放状态，表明最终发布文档尚未完成。

---

## 3. 项目进展

### 今日已合并 / 已关闭的 PR

| PR | 标题 | 影响 |
|---|---|---|
| [#6978](https://github.com/agentscope-ai/QwenPaw/pull/6978) | feat(commands): add session management slash commands (`/sessions`, `/session`) | **功能落地** — 让 IM 渠道（Matrix、QQ、Telegram）和 HTTP 调用方在列出、切换和创建会话方面与 Console/TUI 具备同等能力 |
| [#7647](https://github.com/agentscope-ai/QwenPaw/pull/7647) | fix(channels): support Base64 data URLs in outbound media | 修复各渠道出站 `data:<mime>;base64,...` 媒体时的 `OSError` |
| [#7663](https://github.com/agentscope-ai/QwenPaw/pull/7663) | fix(memory): fall back when plugin backend is unavailable | 当插件后端不可用时优雅降级到内置 ReMeLight，而不是导致工作区启动失败 |
| [#7667](https://github.com/agentscope-ai/QwenPaw/pull/7667) | fix(files): show upload only in workspace | UI 清理 — 在只读的 Profile/Daily/Digest 标签页中隐藏上传入口 |

### 值得关注的开放 PR 进展

- [#7639](https://github.com/agentscope-ai/QwenPaw/pull/7639) — `perf(scroll)`：避免重复的 `PRAGMA quick_check` 历史完整性扫描（按进程缓存 + 并发保护）。
- [#7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) — `fix(history)`：修复 FTS 损坏（`SQLITE_CORRUPT_VTAB`）以及针对 #7596 的保留清理。
- [#7637](https://github.com/agentscope-ai/QwenPaw/pull/7637) — feat：QwenPaw-Data 应用 0.3.0，将 QPD Data Console 作为受管分析引擎嵌入。
- [#7665](https://github.com/agentscope-ai/QwenPaw/pull/7665) — `feat(console)`：分组聊天历史，支持组内分页。
- [#7677](https://github.com/agentscope-ai/QwenPaw/pull/7677) — `fix(api)`：对非有限验证输入返回结构化 422。
- [#7669](https://github.com/agentscope-ai/QwenPaw/pull/7669) — 仅测试：为 Console 嵌入验证和 `toDisplayUrl` 增加 18 个回归用例。
- [#7663](https://github.com/agentscope-ai/QwenPaw/pull/7663) 和 [#7667](https://github.com/agentscope-ai/QwenPaw/pull/7667) 在开启当天关闭 — 小修复快速周转。

---

## 4. 社区热门话题

**1. [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — [讨论] QwenPaw Hub 多租户版路线图** · 24 条评论 · 4 👍 · 自 2026-08-26 起 OPEN
这是最活跃的讨论帖。QwenPaw 正在征询社区，对于 2.2.0 中发布的多租户 “Hub” 版应优先处理哪些事项，并关联了此前的需求，如 #2324（多用户访问 + 管理员管理的技能）。**底层需求：** 团队希望拥有带基于角色管理的共享部署 — 这是从项目个人助手起源的明显转变。

**2. [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — [已关闭] 模型回复从上下文中丢失** · 10 条评论
一份详细且埋点充分的问题报告：助手回复已持久化，但对后续请求不可见，产生 “空响应” 症状。高互动量和快速关闭表明维护者认真对待了该问题。**底层需求：** 在持久化和上下文组装之间保持可靠的会话状态一致性。

**3. [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — 优化 platform.agentscope.io/deploy 首页** · 9 条评论 · OPEN
移动端 UX 投诉：主要操作入口被埋没，且 “Open” 位于 “Stop” 之后，导致误触。**底层需求：** 面向非技术运维人员的移动优先部署流程。

**4. [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — [已关闭] Console 停止请求会取消活跃的飞书会话** · 8 条评论
跨会话身份泄漏：Console 停止操作取消了正在进行的飞书对话。**底层需求：** 多个 UI 共享同一后端时的严格会话隔离。

---

## 5. Bug 与稳定性

按严重程度排序，并注明新增/更新状态。

### 严重 / 高

| Issue | 严重程度 | 状态 | 备注 |
|---|---|---|---|
| [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) — **Windows 上安全沙箱被绕过**（2.2.0） | 🔴 安全 | OPEN，1 条评论 | 安全研究系列第 1/4 部分；附有知乎文章链接。未发现修复 PR。看板上最高优先级事项。 |
| [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — **`spawn subAgent` 任务全部失败/超时**（win 2.2.0） | 🔴 高 | OPEN，2026-09-11 新增 | 用户报告无论超时设置如何，所有 subagent 任务都会超时。无修复 PR。 |
| [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — **`subagent_model` 不生效**（2.2.1-beta.1/beta.2） | 🔴 高 | OPEN | 生成的 subagent 始终继承父级 `active_model`。直接削弱了按任务选择模型的工作（#6302、#4901）。两个 beta 上均可复现。 |
| [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) — 飞书会话队列消费者卡住仍存活 → 会话静默无响应 | 🟠 高 | 自 2026-09-03 起 OPEN | 高优先级（priority=10 卡片）消息卡住消费者；新消息无法生成替代消费者。无修复 PR。 |
| [#7668](https://github.com/agentscope-ai/QwenPaw/issues/7668) — 邮件监控 `last_uid = 0` 绕过首次运行保护，重新处理整个 INBOX | 🟠 高 | OPEN，1 条评论 | 状态文件边界情况，可能对每封邮箱消息触发唤醒风暴。无修复 PR。 |

### 中等

- [#7661](https://github.com/agentscope-ai/QwenPaw/issues/7661) — **错误地创建新会话**：继续已有对话时反而生成重复会话（main @ a403b24）。OPEN，4 条评论。
- [#7445](https://github.com/agentscope-ai/QwenPaw/issues/7445) — QwenPaw Hub 无法连接本地/局域网模型服务（`127.0.0.1:8088/v1`），而云端 API 正常。自 2026-08-31 起 OPEN。
- [#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507) — 企业微信逐字符流式输出（150 毫秒节流），而微信发送完整片段。OPEN。

### 今日已解决（已修复/已关闭）

- [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — 助手回复从上下文中丢失（空响应症状）。✅
- [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) — 在 Chrome 中 Console 流式输出直到回合完成前不渲染任何内容（Safari 中正常）。✅
- [#7231](https://github.com/agentscope-ai/QwenPaw/issues/7231) — 切换时 Console 消息被投递到错误会话。✅
- [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — Console 停止操作取消了活跃的飞书会话。✅
- [#3254](https://github.com/agentscope-ai/QwenPaw/issues/3254) — Console 聊天 UUID 缺失（与 `GET /chats` 存在竞态）。✅
- [#7662](https://github.com/agentscope-ai/QwenPaw/issues/7662) — Telegram 轮询在代理黑洞下静默失效；看门狗只检查 `updater.running`。✅
- [#7516](https://github.com/agentscope-ai/QwenPaw/issues/7516) & [#7370](https://github.com/agentscope-ai/QwenPaw/issues/7370) — 企业微信 base64 data-URL 图片崩溃（`OSError [Errno 36]`）。✅ **修复：[PR #7647](https://github.com/agentscope-ai/QwenPaw/pull/7647)**
- [#7666](https://github.com/agentscope-ai/QwenPaw/issues/7666) — HF 本地模型下载失败 / 无法选择量化文件（已关闭，稍后复核）。✅
- [#7634](https://github.com/agentscope-ai/QwenPaw/issues/7634) — ClawHub 技能因名称重复而安装失败。✅

**结论：** Console + 渠道 bug 积压正在被高效清理，但 **subagent 执行（#7678、#7676）和 Windows 沙箱安全（#7672）仍是进入 2.2.1 GA 前未缓解的开放风险。**

---

## 6. 功能请求与路线图信号

**今日新增/更新的请求：**

| Issue | 请求 | 下一版本可能性 |
|---|---|---|
| [#7671](https://github.com/agentscope-ai/QwenPaw/issues/7671) | 自动缩小过大的图片，而不是将其作为占位符丢弃（>2 MiB `MAX_INLINE_MEDIA_BYTES`） | 中等 — 自包含、低风险 |
| [#7670](https://github.com/agentscope-ai/QwenPaw/issues/7670) | 在文件面板预览模式中提供语法高亮 | 中等 — Console 打磨，可能与现有查看器工作配套 |
| [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) | `memory_model` 配置，将记忆摘要/dream 与昂贵的主 LLM 解耦 | 中高 — 节省成本，与当前 ReMe/记忆重构（#7444、#7663）方向一致 |
| [#7657](https://github.com/agentscope-ai/QwenPaw/issues/7657) | 添加 **ntfy** 渠道（自托管推送，约 34k ★）；**可工作的实现已就绪** | 高 — 贡献者提供，契合渠道矩阵 |
| [#7656](https://github.com/agentscope-ai/QwenPaw/issues/7656) | 持久化的跨会话/重启记忆（MemCode 提供集成） | 低-中 — 厂商集成，需要设计评审 |
| [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) | 部署页面移动端 UX 重新设计 | 中等 — 反复出现的移动端主题（参见 #7623、#7378） |
| [#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) | 为 MCP streamable_http 客户端提供 `tls_verify` / `ca_file`（自签名 / 私有 CA） | 中等 — 企业/自托管阻碍 |

**路线图解读：** 两个方向正在汇合 — **（a）多租户/企业就绪**（Hub #7318、MCP TLS #4175、邮件/队列健壮性）以及 **（b）移动优先的 console**（#7623 已发布、#7378 原生应用草稿、#7177）。记忆成本控制（#7664）和持久化记忆（#7656）表明记忆架构是下一个主要投入领域。

---

## 7. 用户反馈总结

**痛点（不满）：**
- **多 UI/多渠道环境中的会话完整性** — 最集中的一类：#7231、#7011、#3254、#7661、#7676。同时运行 Console + 飞书/Telegram 的用户会遇到消息落入错误会话、幽灵新会话以及交叉取消。
- **Subagent 可靠性** — #7678（“没有任何任务完成，全部超时”）和 #7676（`subagent_model` 被静默忽略）对高级用户而言是真实的功能损坏。
- **自托管 / 本地模型摩擦** — #7445（通过 Hub 访问局域网模型端点）和 #7666（HF 下载 + 量化文件选择）表明家庭实验室用户遇到安装配置障碍。
- **移动端人体工学** — #7177（误点 Stop、入口被埋没）以及已发布的 #7623 移动端选择器修复表明移动端需求持续存在。
- **渠道性能一致性** — #7507（企业微信 150 毫秒逐字符流式输出）是与微信相比的感知质量差距。

**积极信号 / 满意度：**
- Hub 路线图帖获得 4 👍 和 24 条评论，表明社区参与度高、投入度高，并且正在被直接征询意见。
- 多个高质量、证据充分的 bug 报告（#7534、#7579、#7662 中的复现步骤、版本锁定、日志摘录）以及 **贡献者提供的解决方案**（#7657 ntfy “实现已就绪”、#5992 按会话模型、#6960 PawPort）表明贡献者管道健康。
- 单日快速关闭 10 个 issue — 大多数在提交后数天内 — 表明维护响应及时。

---

## 8. 积压观察

需要维护者关注的事项 — 长期开放和/或高影响但进展有限。

| 事项 | 持续时间 | 状态 | 重要性 |
|---|---|---|---|
| [#3113](https://github.com/agentscope-ai/QwenPaw/issues/3113) — 团队协作指令在重试前被忽略 | **约 5 个月**（自 2026-04-08） | OPEN，2 条评论 | 多 agent 协作是旗舰能力；首次请求失败会直接损害演示路径。 |
| [#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) — MCP `tls_verify` / `ca_file` | **约 4 个月**（自 2026-05-10） | OPEN，3 条评论 | 阻碍企业自签名/私有 CA MCP 服务器。改动小、范围明确。 |
| [PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) — 按会话模型覆盖 | **约 2 个月**（自 2026-07-12） | OPEN，Under Review，首次贡献者 | 与今日 #7676 回归直接相关；合入后可解决重叠的模型选择投诉。 |
| [PR #6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) — Reranker UI 配置面板 | **约 7 周**（自 2026-07-23） | OPEN，Under Review | reranker 功能的 UI 部分；配套后端 PR 不明确。存在漂移/冲突风险。 |
| [PR #6969](https://github.com/agentscope-ai/QwenPaw/pull/6969) — 避免 MCP `structuredContent` 上重复的工具结果（#6958） | 约 4 周（自 2026-08-13） | OPEN，Under Review | 正确性 bug，影响所有同时返回 `content` 和 `structuredContent` 的 FastMCP 工具。 |
| [PR #6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) — PawPort 导入流程（Codex/Qoder 迁移） | 约 4 周（自 2026-08-13） | OPEN | 大型、高价值的上手功能，但看不到评审活动。 |
| [PR #7444](https://github.com/agentscope-ai/QwenPaw/pull/7444) — 统一 ReMe 斜杠命令 | 约 11 天 | OPEN | 已基于合入的 #7561 变基；需要评审者接手以完成记忆命令统一。 |
| [PR #7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) — 原生移动体验（Expo/RN） | 约 2 周 | OPEN，**DO NOT MERGE** | 战略移动客户端；需要明确范围与合入路径决策。 |
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — Hub 路线图讨论 | 16 天 | OPEN，24 条评论 | 社区投入高；需要维护者综合/决策以保持势头。 |

---

*本摘要基于 2026-09-11 的 GitHub 活动数据生成。所有链接均指向 `github.com/agentscope-ai/QwenPaw`。*

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-11

## 1. 今日概览

ZeroClaw 呈现出**极高的原始活动量但零吞吐**：过去 24 小时内有 50 个 issue 和 50 个 PR 被触及，但 **0 个 issue 关闭，0 个 PR 合并或关闭**。活跃面完全处于开放状态（50/50 个 open issue，50/50 个 open PR），表明队列在增长而非消化。工作集中在三个集群：Windows/平台可移植性（`#7462`, `#7461`, `#8800`, `#10735`, `#10703`）、围绕 auth/principals/attestation 的安全加固（`#10248`, `#10255`, `#10275`, `#10321`, `#9101`），以及 release/CI 卫生（`#7108`, `#9101`, `#8519`）。没有发布新版本，因此项目仍停留在 `#9101` 中提到的 v0.8.x 线。总体健康信号：**贡献者参与度高，但存在明显的审查/合并瓶颈，以及庞大且老化中的 P1 积压。**

---

## 2. 发布

**无。** 过去 24 小时没有新发布，也没有发布说明可总结。开放工作中引用的最近版本是 **v0.8.3**，在 issue [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) 中被提到随附三种并行的来源/签名机制（cosign bundles、GitHub artifact attestations、slsa-github-generator）。

---

## 3. 项目进展

**今天没有 PR 被合并或关闭**，因此没有可报告的已交付进展。不过，有几个 PR 在审查活动中取得推进：

| PR | 标题 | 状态信号 |
|---|---|---|
| [#10735](https://github.com/zeroclaw-labs/zeroclaw/pull/10735) | fix(rpc): 为 Windows 栈对最大的 `process_line` 分发分支进行 heap-pin | 2026-09-11 更新，小（`size:XS`），聚焦 Windows |
| [#10768](https://github.com/zeroclaw-labs/zeroclaw/pull/10768) | feat(channels): 增加 Sendblue iMessage/SMS 频道 | 新增（创建于 2026-09-10），`size:XL` |
| [#10703](https://github.com/zeroclaw-labs/zeroclaw/pull/10703) | fix(providers): 让 cache builder 满足 Windows Clippy | 小型 Windows CI 修复 |
| [#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511) | feat(quickstart): 在 provider 拒绝凭据时阻止持久化 | 引导流程正确性 |
| [#10565](https://github.com/zeroclaw-labs/zeroclaw/pull/10565) | fix(zerocode): 将本地 Code 会话固定到进程 cwd | `#10541` 的回归跟进 |

**阻塞 / do-not-merge 工作：** [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)（history-trim 上的 token accounting）是 `status:blocked` + `do-not-merge`；[#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)（原生 Hailo-Ollama provider）也是 `do-not-merge`。

**结构性观察：** 安全栈系列 `#10248 → #10255 → #10275 → #10321`（RFC 7141 / #8289 auth 重做：规范 principals、OIDC 验证、浏览器 PKCE、Nevis/iam_policy 退役）完全开放且堆叠，意味着 auth 现代化没有任何一项落地。

---

## 4. 社区热点

按评论数排序（仅 issue；数据集中 PR 评论数不可用）：

1. **[#7462 — Windows 上 74 个测试失败（19 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — 仅 Unix 的测试命令、路径语义、控制台编码（CP936）。P1，`status:in-progress`，高风险。于 6 月 10 日打开，三个月后仍开放。底层需求：**CI 不在 Test job 中测试 Windows**，因此可移植性腐化在无人察觉中累积。
2. **[#9101 — 整合发布证明机制（9 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/9101)** — 三种签名方案交付 53 个发布资产。需求：降低 CI 成本和供应链歧义。
3. **[#10549 — RFC：简化 RFC 投票（8 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)** — 移除强制讨论窗口，让 REVISE 停止快照。需求：减少治理摩擦。
4. **[#5514 — 将 Telegram 媒体组批量合并为一个多模态轮次（8 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)** — 每张图像都会生成单独的 LLM 请求。自 4 月以来开放。需求：一致的多模态用户体验。
5. **[#6157 — Nextcloud Talk 正确的 bot 消息 API（8 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/6157)** — `status:blocked`，错误的 API URL/secret 处理。需求：可用的企业聊天集成。
6. **[#10366 — RFC：PR 审查证据与作者行动边界（7 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/10366)** 和 **[#7108 — 改进缓存 Rust 构建 / CI 关键路径（7 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/7108)** — 两者都反映了贡献者对 15–20 分钟 PR CI 和不明晰审查期望的挫败感。
7. **[#9486 — 高熵检测器对 Solana 钱包地址脱敏（7 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/9486)** — `high_entropy_tokens=false` 在 channel 路径上未被遵守。

**元信号：** 排名前三的热门 issue 全都关于**流程和基础设施**，而非产品功能——这表明贡献者群体正在遭遇规模化摩擦。

---

## 5. Bug 与稳定性

按声明的严重性排序：

### S0 — 数据丢失 / 安全风险
- **[#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279)** — `delegate` 绕过父级的工具 allowlist；子 agent 可以调用父策略排除的工具。P1，已接受，高风险。**此窗口内未发现关联修复 PR。**
- **[#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247)** — Shell 工具工作区边界绕过：工作区内的符号链接允许 shell 命令读写其外部。P1，已接受，高风险。**未发现关联修复 PR。**

### S1 — 工作流阻塞
- **[#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559)** — 在 Web dashboard 中关闭聊天窗口后，Agent 停止工作；循环被视为用户中断。
- **[#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207)** — `web_fetch` 对 gzip/brotli/deflate 响应返回乱码。进行中。
- **[#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** — 切换会话后失败的 ACP 轮次消失；transcript 丢失。
- **[#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421)** — 不完整的终端响应可能被报告为成功。进行中。
- **[#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)** — Cron agent 作业没有墙上时钟超时；进行中的锁仅在进程启动时清除。
- **[#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390)** — 紧急停止只是一个仅 CLI 的状态文件，没有任何运行时路径读取它。
- **[#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519)** — `audit.toml`/`deny.toml` 漂移；未解决的 wasmtime-wasi CVE。
- **[#9393](https://github.com/zeroclaw-labs/zeroclaw/issues/9393)** — Bluesky 和 Reddit 频道没有发送者授权，也没有中央闸门。
- **[#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794)** — 在工作过程中停止 agent 会从上下文中擦除工具调用和思考。
- **[#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800)** — Windows：被终止的进程留下端口占用（僵尸 LISTENING/CLOSE_WAIT），新 daemon 启动失败。

### S2/S3 — 降级行为
- **[#9284](https://github.com/zeroclaw-labs/zeroclaw/issues/9284)** — Config flush 可能覆盖并发写入（P1）。
- **[#9391](https://github.com/zeroclaw-labs/zeroclaw/issues/9391)** — Command audit logging 默认启用但不写入任何内容（P1）。
- **[#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)** — MCP/tool-schema 克隆导致 agent 循环中 RSS 无界增长（P1，help wanted）。
- **[#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486)** — 高熵检测器对 Solana 钱包地址脱敏（P2）。
- **[#9363](https://github.com/zeroclaw-labs/zeroclaw/issues/9363)** — 本地化的 ZeroCode/web 界面中 Config 元数据仍为英文（P2）。
- **[#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198)** — dashboard daemon 重载后 Discord typing indicator 卡住（P2）。
- **[#9089](https://github.com/zeroclaw-labs/zeroclaw/issues/9089)** — 工具输出支持 `[IMAGE:]` 但不支持 `[AUDIO:]` 标记（P2）。
- **[#9332](https://github.com/zeroclaw-labs/zeroclaw/issues/9332)** — 多模态上下文计量严重低估图像密集型请求（P2）。
- **[#9177](https://github.com/zeroclaw-labs/zeroclaw/issues/9177)** — Qwen3.6-35B-A3B 的 JIT 加载失败，报错“Engine protocol startup was aborted”（P2）。
- **[#7899](https://github.com/zeroclaw-labs/zeroclaw/issues/7899)** — OpenAI STT provider 忽略基于 env 的凭据（P3）。

**修复 PR 覆盖情况：** 部分覆盖。Windows 平台修复有匹配的 PR（[#10735](https://github.com/zeroclaw-labs/zeroclaw/pull/10735), [#10703](https://github.com/zeroclaw-labs/zeroclaw/pull/10703)）；ACP/轮次持久化有 [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)；图像拒绝有 [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480)；终端回退投递有 [#10417](https://github.com/zeroclaw-labs/zeroclaw/pull/10417)；git allowed-roots 有 [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)。两个 **S0 安全问题（#8279, #9247）在此窗口内没有对应的修复 PR**。

---

## 6. 功能请求与路线图信号

| 信号 | 条目 | 下个版本的可能性 |
|---|---|---|
| 新频道：Sendblue iMessage/SMS（非 Apple 主机） | [PR #10768](https://github.com/zeroclaw-labs/zeroclaw/pull/10768) | 高 — XL PR 已开放且刚更新过 |
| 原生 Hailo-Ollama provider | [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | 低/中 — 当前为 `do-not-merge` |
| OIDC token 验证 provider（`oidc.<alias>`） | [PR #10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) | 中 — 堆叠在 `#10248` 上，需要整个栈落地 |
| 浏览器 PKCE + 跨界面注册 API | [PR #10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) | 中 — 深层栈（7+ 层） |
| 用 config shim 退役 Nevis/`iam_policy` | [PR #10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275) | 中 — 重构 + 文档 |
| 将 Telegram 媒体组批量合并为一个轮次 | [Issue #5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) | 中 — 长期存在，进行中 |
| Windows + macOS CI 测试矩阵 | [Issue #7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) | 中 — 直接阻塞 #7462 |
| CI Rust cache / 关键路径改进 | [Issue #7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) | 中 — 已接受，高价值 |
| 整合发布证明（53 → ~20 个资产） | [Issue #9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) | 中 — 已接受，范围明确 |
| Quickstart 在凭据被拒绝时阻止持久化 | [PR #10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511) | 高 — 小型、自包含 |

**预测的下个版本主题：** 安全/auth 统一（RFC 7141 / #8289）、引导流程正确性（quickstart 凭据验证），以及平台一致性（Windows/macOS CI + Clippy/RPC 栈修复）。

---

## 7. 用户反馈总结

**反复出现的痛点：**

- **Agent 自主性在 UI 中很脆弱。** 两个独立的 issue（[#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559), [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794)）报告称，离开 dashboard 或在工作过程中停止 agent 会破坏或中断运行及其上下文。这是数据集中最强烈的不满信号。
- **安全功能对合法内容误伤。** [#9486](https://github.com/zeroclaw-labs/zeroclaw/issues/9486) — agent 无法说出 Solana 钱包地址；每个地址都会变成 `[REDACTED_HIGH_ENTROPY_TOKEN]`，而文档中给出的逃生通道（`high_entropy_tokens=false`）在 channel 路径上不起作用。其中包含一条真实、可复现的用户引述。
- **引导流程可能在凭据错误时静默成功。** [#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511) 描述了一次“成功”的 quickstart，但只在用户第一条消息时才失败。
- **国际化缺口。** [#9363](https://github.com/zeroclaw-labs/zeroclaw/issues/9363) — 本地化的 ZeroCode 仍然显示英文 Config 元数据。[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) 是专门在简体中文 Windows 控制台（CP936）上提交的，表明非英语、非 Linux 用户未得到充分服务。
- **贡献者体验摩擦。** [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) 和 [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) 显示贡献者反对审查证据要求和强制 RFC 讨论计时器；[#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) 提到 15–20 分钟的 PR CI 运行是一种拖累。
- **资源稳定性。** [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642)（RSS 无界增长）明确源自用户报告的 WSL2（#5542）中的 OOM 场景，表明存在持续的内存压力投诉。

**满意度信号：** 在此窗口中不太明显 — 没有记录到正面反应（所有 👍 计数均为 0），也没有已合并的 PR 可以作为已交付价值来指称。

---

## 8. 积压观察

具有显著存续时间和/或重要性、需要维护者关注的开放条目：

| 条目 | 存续时间 | 为何重要 |
|---|---|---|
| [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) Telegram 媒体批处理 | 开放于 2026-04-08（约 5 个月） | 高评论、进行中、仍未修复的多模态 UX bug |
| [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) Nextcloud Talk API | 开放于 2026-04-27 | **`status:blocked`** — 集成已损坏，且看不到前进路径 |
| [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) CI cache 关键路径 | 开放于 2026-06-02 | 影响每个贡献者的迭代速度 |
| [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) / [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) Windows/macOS CI + 74 个失败 | 开放于 2026-06-10 | 已开放三个月；三个相关平台 PR 仍未合并 |
| [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) Delegate 工具 allowlist 绕过（S0） | 开放于 2026-06-24 | 安全边界违规，且**没有修复 PR** |
| [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) cargo-audit/deny 漂移 + wasmtime CVE | 开放于 2026-06-30 | 供应链风险，audit 忽略列表漂移 |
| [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) 聊天窗口退出时 Agent 停止 | 开放于 2026-06-30 | S1，进行中，用户首要投诉 |
| [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) RSS 无界增长 | 开放于 2026-07-03 | `help wanted`，OOM 报告 |
| [#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247) Shell 工作区边界绕过（S0） | 开放于 2026-07-21 | 安全边界违规，且**没有修复 PR** |
| [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) Hailo-Ollama provider | 开放于 2026-07-17 | XL PR，`do-not-merge` — 需要做决定，而不是继续漂移 |
| [PR #9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) history-trim 上的 token accounting | 开放于 2026-08-03 | `status:blocked` + `do-not-merge`；阻碍对 trim 行为（#9619）的可见性 |
| [PR #9399](https://github.com/zeroclaw-labs/zeroclaw/pull/9399) Quickstart 检查清单终端宽度 | 开放于 2026-07-26 | 一个范围有限的 CLI 修复六周未合并 |

**积压风险评估：** 在 S0 安全问题缺少修复 PR、一个 `blocked` 频道集成，以及两个 `do-not-merge` XL PR 逐渐老化的情况下，维护者/审查者容量——而非贡献者意愿——似乎是约束瓶颈。今天最大的单一健康风险是**面对 50 个开放 PR 的零合并日**；如果持续下去，将导致安全栈（#10248 → #10255 → #10275 → #10321）和平台可移植性修复无限期停滞。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*