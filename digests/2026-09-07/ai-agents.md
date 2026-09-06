# OpenClaw 生态日报 2026-09-07

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-06 22:45 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-07

## 1. 今日概览

OpenClaw 正处于密集的稳定性和分流（triage）阶段。过去 24 小时内，有 500 个 issue 和 500 个 PR 被更新（377 个开放/活跃 issue，303 个开放 PR；123 个 issue 和 197 个 PR 被关闭/合并），**零新版本发布**。近期 2026.8.x → 2026.9.x 更新链路周围聚集了一批值得关注的 P0/P1 回归问题——Windows 网关启动失败、网关重启级联、静默丢失 cron 调度、会话/记录（transcript）可靠性问题。积极的一面是，维护者主导的修复 PR 持续合并或进入“待维护者查看”状态（涉及 WebSocket 传输、SDK 迭代器清理、Matrix 测试隔离、UI 焦点恢复等），表明核心维护工作仍在积极进行中。标记为 `clawsweeper:needs-maintainer-review` 和 `needs-product-decision` 的项目数量表明，当前问题发现速度已超过维护者的处理带宽。

## 2. 版本发布

**过去 24 小时内没有发布任何新版本。** 在 issue 报告中最近被公开引用的版本是 2026.9.1（`ad6fe23`）和 2026.9.2，两者都有正在积极调查中的未决回归报告——因此下一个版本很可能是补丁/修复版本。

## 3. 项目进展

过去 24 小时内共有 197 个 PR 被合并/关闭。其中有价值的高信号项包括：

**值得注意的已合并/关闭 PR：**
- [#140490](https://github.com/openclaw/openclaw/pull/140490) — fix: node 流使用已安装的 WebSocket 传输（避免误选 Bun WebSocket 适配器）
- [#140485](https://github.com/openclaw/openclaw/pull/140485) — fix(sdk): 迭代器关闭时释放缓冲事件（防止迭代器退役/过滤失败后仍保留 payload）
- [#139272](https://github.com/openclaw/openclaw/pull/139272) — fix: 当预览停滞时保留完整 Codex 回复（关闭 [#139249](https://github.com/openclaw/openclaw/issues/139249)）
- [#139699](https://github.com/openclaw/openclaw/pull/139699) — feat(directives): 在预运行拒绝时发出 `directive.rejected` 诊断（例如 `/model` 作用域变更失败）

**相应关闭的 issue（位于 top-50 列表中）：**
- [#124991](https://github.com/openclaw/openclaw/issues/124991) — [P1] CLI 会话 reseed 在 SQLite 会话存储上无效
- [#137056](https://github.com/openclaw/openclaw/issues/137056) — [P1] memory-core: 将维护操作移出搜索/监听热路径

**推进中（fix 与 feature）的开放 PR**（大多处于“待维护者查看”状态）：plugin-SDK 门面整合（[#140489](https://github.com/openclaw/openclaw/pull/140489)、[#140500](https://github.com/openclaw/openclaw/pull/140500)），Matrix fixture/运行时隔离（[#140496](https://github.com/openclaw/openclaw/pull/140496)、[#140491](https://github.com/openclaw/openclaw/pull/140491)），空心跳重试风暴修复（[#137936](https://github.com/openclaw/openclaw/pull/137936)），长记录在 `sessions_yield` 中可用（[#137381](https://github.com/openclaw/openclaw/pull/137381)），错过 Gateway 更新后的 UI 标签恢复（[#140484](https://github.com/openclaw/openclaw/pull/140484)），以及 iOS 位置状态刷新（[#140424](https://github.com/openclaw/openclaw/pull/140424)）。

## 4. 社区热门话题

最活跃的讨论（按评论数）集中在运行时可靠性和升级阵痛上：

- [#135111](https://github.com/openclaw/openclaw/issues/135111) *（14 条评论，P1）* — 在 v2026.8.1 上搭配 claude-sonnet-5 时间歇性出现 “Provider completed tool call with malformed JSON arguments”。与文件/工具无关；约出现 6 次。用户需要可确定复现步骤，而不是这种偶发的、provider 特定的错误。
- [#97616](https://github.com/openclaw/openclaw/issues/97616) *（13 条评论，P1）* — 未被回收的 hook/工具子进程导致僵尸进程累积，造成长时间运行后性能退化。对 24/7 运行的网关主机是严重的运维问题。
- [#119720](https://github.com/openclaw/openclaw/issues/119720) *（12 条评论，P1）* — 同步的 agent 持久化/记录维护在大规模情况下阻塞 Gateway 事件循环。历史范围已通过 [#133925](https://github.com/openclaw/openclaw/pull/133925)/[#134062](https://github.com/openclaw/openclaw/pull/134062) 部分修复；核心的 Gateway 线程问题仍然存在。
- [#132762](https://github.com/openclaw/openclaw/issues/132762) *（12 条评论，P1）* — Overflow 重试可能在工具结果未被最终送达时报告成功，导致静默丢消息。
- [#113306](https://github.com/openclaw/openclaw/issues/113306) *（12 条评论，P2）* — SQLite 快照恢复缺少端到端的崩溃与身份保证（存在数据丢失风险）。
- [#96975](https://github.com/openclaw/openclaw/issues/96975) *（12 条评论，P2）* — 功能/缺陷：将子 agent 完成结果与父上下文隔离，避免重型 payload 注入。
- [#41201](https://github.com/openclaw/openclaw/issues/41201) *（11 条评论，P2，👍 1）* — Control UI 头像图片损坏——自 2026 年 3 月起一直开放。
- [#95610](https://github.com/openclaw/openclaw/issues/95610) *（11 条评论，P2，👍 2）* — 每轮动态注入破坏 OpenAI prompt 缓存，推高成本。
- [#137813](https://github.com/openclaw/openclaw/issues/137813) *（11 条评论，P0）* — 2026.9.1 更新后 Windows Gateway 永远无法启动；新的 `--task-supervisor` 标志静默退出 0。

**潜在需求：** 用户正在要求持久可靠的消息投递、Windows 上可预期的更新体验、更好的成本效率（prompt 缓存）、以及清晰的会话/子 agent 隔离——稳定压倒新功能。

## 5. Bug 与稳定性

**P0 — 阻断发布 / 严重：**

- [#137813](https://github.com/openclaw/openclaw/issues/137813) — Windows 11：2026.9.1 后 Gateway 永远无法启动；`--task-supervisor` 通过计划任务静默退出 0；子进程从未被拉起。*尚无修复 PR。*
- [#114967](https://github.com/openclaw/openclaw/issues/114967) — Agent 触发的热更新留下了 `launchctl submit` keepalive 校验器，导致 Gateway 每约 2 分钟被强制重启。*需要维护者查看；无修复 PR。*
- [#136203](https://github.com/openclaw/openclaw/issues/136203) — Windows de-DE 2026.8.2 升级导致 Doctor 维护被阻塞，并遗留旧工作区状态。*标记为 queueable-fix；无新的修复 PR。*
- [#48920](https://github.com/openclaw/openclaw/issues/48920) — 实时文档超前于发布版本（例如 `IsolatedSessions` 已在文档中但未随版本发布）。文档/发布流水线问题，自 3 月开放，4 个 👍。

**P1 — 高影响（本周新出现）：**

- [#139847](https://github.com/openclaw/openclaw/issues/139847) *（9 月 6 日创建）* — 2026.9.2 中的回归：在回复运行处于活动状态时发送的消息被丢弃（“Reply operation has no active tool authority snapshot”）。*尚无修复 PR。*
- [#139578](https://github.com/openclaw/openclaw/issues/139578) *（9 月 6 日创建）* — llama.cpp 托管的 EmbeddingGemma 在服务器默认 ubatch 512 下运行（[#134389](https://github.com/openclaw/openclaw/pull/134389) 引入的回归）。*需要在线复现。*
- [#139215](https://github.com/openclaw/openclaw/issues/139215) *（9 月 5 日创建）* — 自 2026.9.1 起 cron 调度器静默吞掉定时调度；运行永远不会启动，也不会写入运行记录。

**P1 — 既有积压：**

- Malformed JSON 参数回归： [#135111](https://github.com/openclaw/openclaw/issues/135111)
- 僵尸子进程泄漏： [#97616](https://github.com/openclaw/openclaw/issues/97616)
- Gateway 事件循环阻塞（持久化/记录）： [#119720](https://github.com/openclaw/openclaw/issues/119720)
- Overflow 重试成功但未最终投递： [#132762](https://github.com/openclaw/openclaw/issues/132762)
- 更新/回滚后过期的模块导入路径导致静默丢弃入站消息（`ERR_MODULE_NOT_FOUND`）： [#92241](https://github.com/openclaw/openclaw/issues/92241)
- 会话车道饥饿阻塞入站调度 20–30 分钟： [#54488](https://github.com/openclaw/openclaw/issues/54488)
- CLI 会话 reseed 在 SQLite 上无效： [#124991](https://github.com/openclaw/openclaw/issues/124991) — *已关闭*
- 核心更新后恢复会接纳不可终结的 `update_runs` 行 → 永远显示“更新进行中”： [#139714](https://github.com/openclaw/openclaw/issues/139714)
- 多 agent 环境操作失败并报 `AgentSelectionRequiredError`： [#128637](https://github.com/openclaw/openclaw/issues/128637)
- Memory dreaming 将 Gateway 事件循环占满约 10 分钟： [#99910](https://github.com/openclaw/openclaw/issues/99910)

**一线希望：** 一些相关问题的修复 PR 正在推进或刚刚落地——空心跳重试风暴（[#137936](https://github.com/openclaw/openclaw/pull/137936)）、Codex 回复截断（[#139272](https://github.com/openclaw/openclaw/pull/139272)）、memory-flush 压缩上下文（[#137440](https://github.com/openclaw/openclaw/pull/137440)）、同版本渠道切换报告（[#140493](https://github.com/openclaw/openclaw/pull/140493)）。

## 6. 功能请求与路线图信号

**最强路线图候选（高参与度或接近产品决策）：**

- [#96975](https://github.com/openclaw/openclaw/issues/96975) — 将子 agent 完成结果与父上下文隔离；只返回状态和子会话链接。12 条评论；解决重型子 agent 会话膨胀问题。*需要产品决策。*
- [#99583](https://github.com/openclaw/openclaw/issues/99583) — 使用现有 LLM slug 生成器智能地自动命名会话（2 个 👍，7 条评论）。
- [#71058](https://github.com/openclaw/openclaw/issues/71058) — 在单个 Gateway 上运行多个 Azure/Teams 机器人（8 条评论）。
- [#14376](https://github.com/openclaw/openclaw/issues/14376) — 感知原因的 cron 护栏：针对 402/速率限制失败提供配额/鉴权感知的退避与熔断器。
- [#120244](https://github.com/openclaw/openclaw/issues/120244) — 每日 cron 维护窗口，具备角色隔离与 FIFO 重放。
- [#51572](https://github.com/openclaw/openclaw/issues/51572) — 在会话重置/修剪时触发 `session-memory` hook，而不仅限于压缩时。
- [#84242](https://github.com/openclaw/openclaw/issues/84242) — 将 LanceDB `memory_store`/`memory_recall`/`memory_forget` 暴露为可调用的 agent 工具（3 个 👍——最受喜爱的开放功能）。

**来自新 PR 的信号：** 有人贡献了一个外部 AIgateway provider 插件（[#140146](https://github.com/openclaw/openclaw/pull/140146)），此外一个针对每 agent 每日模型支出告警的自动化修复 PR（[#138679](https://github.com/openclaw/openclaw/pull/138679)，目标 issue [#113481](https://github.com/openclaw/openclaw/issues/113481)）表明成本控制正在成为一个新兴主题。大型开放 PR [#135868](https://github.com/openclaw/openclaw/pull/135868)（在更新/启动失败后进行安装自有的恢复）表明自愈式安装是近期优先方向。

**预测：** 下一个次要版本将大量依赖更新路径可靠性（Windows、supervisor 标志、launchd keepalive 清理、doctor 自修复），以及插件/扩展打磨；子 agent 隔离和 session-memory 生命周期 hook 仍是最有可能在之后一个版本中落地的功能候选。

## 7. 用户反馈摘要

- **Windows 更新/恢复是头号痛点。** 三份不同的 P0/P1 报告（[#137813](https://github.com/openclaw/openclaw/issues/137813)、[#136203](https://github.com/openclaw/openclaw/issues/136203)、[#134896](https://github.com/openclaw/openclaw/issues/134896)）描述了升级导致 Gateway 损坏、Doctor 被阻塞或进程静默退出——全部需要人工干预。预计以 Windows 为重点的 QA 将成为明确优先事项。
- **静默失败侵蚀信任。** 多份报告描述消息或运行被丢弃且没有显示任何错误（零 payload 的入站 turn 分发、从未启动的 cron 调度、以无最终投递结束的 overflow 重试、卡住会话的自我抑制）。用户一致要求提供死信队列、重试和可见的失败状态。
- **文档/发布漂移让用户沮丧。** P0 级“实时文档超前于发布”问题（[#48920](https://github.com/openclaw/openclaw/issues/48920)）已有 4 个 👍，且自 3 月以来一直开放。
- **OpenAI 路径用户的成本压力是真实存在的。** Prompt 缓存抖动（[#95610](https://github.com/openclaw/openclaw/issues/95610)，2 个 👍）和中途估算器过度计数（[#101929](https://github.com/openclaw/openclaw/issues/101929)）表明企业/重度用户正在密切关注 token 消耗。
- **社区能量积极：** 外部贡献者（仅 steipete 一人就在本轮落地/推进了约 8 个 PR）以及新的 provider 插件（AIgateway）表明围绕插件 SDK 正在形成健康的贡献者生态。

## 8. 积压观察

长期存在、高重要性但仍在等待维护者关注的项目：

- [#41201](https://github.com/openclaw/openclaw/issues/41201) — Control UI 头像图片损坏（自 **3 月 9 日** 起开放，11 条评论，`needs-maintainer-review` + `needs-product-decision`）。
- [#44130](https://github.com/openclaw/openclaw/issues/44130) — TUI 滚动跳跃/自动滚动具有干扰性（自 3 月 12 日起开放；3 个 👍；`needs-maintainer-review`、`needs-product-decision`、`needs-info`）。
- [#48920](https://github.com/openclaw/openclaw/issues/48920) — 文档超前于发布（P0，自 3 月 17 日起开放）。
- [#49381](https://github.com/openclaw/openclaw/issues/49381) — 模型故障转移后飞书重复发送最终回复（自 3 月 18 日起开放；无维护者标签，仅有 P2/影响级别）。
- [#54488](https://github.com/openclaw/openclaw/issues/54488) — 会话车道饥饿阻塞入站调度（P1，自 3 月 25 日起开放；`no-new-fix-pr`、`needs-product-decision`）。
- [#51572](https://github.com/openclaw/openclaw/issues/51572) — 在重置/修剪时触发 session-memory hook（自 3 月 21 日起开放；1 个 👍；等待产品决策）。
- [#14376](https://github.com/openclaw/openclaw/issues/14376) — 感知原因的 cron 护栏（自 **2 月 12 日** 起开放，5 条评论）。
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — 僵尸子进程泄漏（P1，自 6 月 29 日起开放，13 条评论）——最受关注的可靠性 bug 之一，仍为 `needs-maintainer-review` 且没有修复 PR。

**结论：** 项目节奏很高，但开放分流标签（`needs-maintainer-review`、`needs-product-decision`）与已合并修复之间的比例表明，维护者团队是关键瓶颈。在进入下一个版本时，更新/回滚子系统和 Windows 支持是最明显的稳定性风险。

---

## 横向生态对比

# 跨项目对比报告 — 个人 AI 助手 / 智能体开源生态
**数据窗口：** 2026-09-07（24h 摘要）· **项目：** OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态概览

开源个人 AI 助手生态横跨多种形态：从工业级网关平台（OpenClaw）到专注且重治理的智能体运行时（ZeroClaw）、Rust/MCP 原生宿主（IronClaw）、桌面集成智能体（Hermes）以及控制台优先的多渠道智能体（QwenPaw）。整个生态正处于集体稳定期——窗口期内没有任何项目发布版本——但综合活跃度依然很高，24 小时内约有 600 个 issue 和 620 个 PR 产生动态，内容以回归缺陷分诊、贡献者修复 PR 和架构 RFC 为主。当下占主导的工程主题是**信任工程**：持久化记忆、可靠投递、提示缓存成本控制和跨平台可靠性，而不是新模型能力。社区健康度呈两极分化：贡献者基础正在扩大（QwenPaw 出现了首次贡献的修复 PR，OpenClaw 的外部贡献者持续不断），而维护者带宽与 RFC 决策流程正成为生态的关键瓶颈。

---

## 2. 活跃度对比

| 项目 | Issues（24h） | PRs（24h） | 合并/关闭（24h） | 发布状态 | 健康评分* |
|---|---|---|---|---|---|
| **OpenClaw** | 500 有动态（377 开放中） | 500 有动态（303 开放中） | 123 issues、197 PRs | 无 — 预计将发布补丁修复 2026.9.x 回归 | 6.0 / 10 |
| **Hermes Agent** | 50 有动态（39 开放中） | 50 有动态（48 开放中） | 2 PRs | 无 | 6.5 / 10 |
| **IronClaw** | 0 有动态（0 开放中） | 9 有动态（6 开放中） | 3 PRs（均为 Dependabot） | 无 | 7.5 / 10 |
| **QwenPaw** | 20 有动态（17 开放中） | 10 有动态（9 开放中） | 1 PR、3 issues | 无 — 2.2.x 补丁队列等待评审 | 6.0 / 10 |
| **ZeroClaw** | 32 有动态 | 50 有动态 | 6 PRs、3 issues | 无 — v0.8.5 收尾状态不明 | 5.5 / 10 |

\* 综合稳定性信号、修复速度、维护者响应能力与积压压力得出的判断。

**表中要点：**

- **OpenClaw** 的活跃度比其他任何一个同类项目都高出一到两个数量级，但速度已超过维护者承载能力——`needs-maintainer-review`、`needs-product-decision` 等标签条目正在持续堆积，多个 P0 回归缺陷仍无修复 PR。
- **Hermes** 平台工作扎实（WhatsApp 技术栈、profile 隔离），但合并吞吐偏弱——50 个 PR 有动态，却只有 2 个 PR 脱离开放状态。
- **IronClaw** 用户报告的 issue 为零、回归为零：这是健康但低参与度的维护状态，队列几乎被自动化依赖升级占据。
- **ZeroClaw** 的稳定性与功能发展最不成比例：合并了 6 个 PR，但多个 S1 缺陷仍未修复，大型 PR 卡在 `blocked`/`do-not-merge` 状态。
- **QwenPaw** 展现了最健康的贡献者动态——10 个 PR 中有 9 个来自首次贡献者——但新出现的一批严重级记忆丢失报告抵消了这一势头。

---

## 3. OpenClaw 的地位

### 相对同类的优势

- **社区规模：** 约 377 个开放 issue、约 303 个开放 PR，远超所有同类（最接近的 Hermes 为 39/48）。有名字的外部贡献者（如 steipete 在一个周期内合入/推进约 8 个 PR）与外部 provider 插件（AIgateway）都证明这是一个能自我持续的贡献者生态。
- **覆盖面广：** OpenClaw 是唯一把网关运行时、记忆核心子系统、控制 UI、cron、插件 SDK 与多 provider 推理（包括托管的 llama.cpp）整合成统一平台的项目。采用 OpenClaw，买到的是完整覆盖，而不是自行拼装。
- **维护者吞吐：** 24 小时内合并/关闭 197 个 PR——这一合并速度没有任何同类项目能够接近，即便分诊已经落后。

### 技术路线差异

- OpenClaw 运行在基于 Bun/JS 的强类型运行时上，带显式 WebSocket 传输适配器、任务监督器/launchd/计划任务进程模型，以及一套“在线自愈的安装/更新/回滚”子系统——对更新路径可靠性做如此高的投入、把它当作平台的一等关注点，实属少见。
- 它采用**指令/钩子/记忆核心架构**并配有控制 UI，这与 Hermes 以桌面应用为中心的模式、IronClaw 的 Rust/WASM/MCP 宿主，以及 ZeroClaw 以 OS 沙箱驱动的安全姿态形成了差异。

### 社区规模对比

| 项目 | 开放 Issues | 开放 PRs | 24h 合并量 |
|---|---|---|---|
| OpenClaw | ~377 | ~303 | 197 PRs |
| Hermes | 39 | 48 | 2 PRs |
| IronClaw | 0 | 6 | 3 个依赖 PR |
| QwenPaw | 17 | 9 | 1 PR |
| ZeroClaw | N/A | N/A（50 有动态） | 6 PRs |

### 弱点

OpenClaw 最明显的弱点在 Windows 的更新/恢复路径上（**P0 #137813** —— 2026.9.1 之后网关根本无法启动；**P0 #136203** —— 升级后 Doctor 被阻塞），静默失败模式（cron tick 丢失、消息丢弃）又加剧了问题。同类与竞品也无法幸免（ZeroClaw 也有一段平行的 Windows CI 长期波折），但 OpenClaw 的规模使其回归缺陷在比例上更加显眼。

---

## 4. 共同技术关注领域

跨项目出现的需求包括：

1. **记忆与上下文持久化完整性（全部五个项目）。** OpenClaw：会话重播种（session reseed）、对话记录可靠性、子智能体上下文隔离（#96975）。Hermes：`state.db` WAL 脑裂损坏（#104596）、对话中途 `/steer` 指令丢失（#104442）。QwenPaw：助手自己的回复从上下文中消失（#7579、#7584）。ZeroClaw：历史裁剪时的 token 核算（#9713）、失败轮次对话记录的持久化（#9378）。**共同需求：** 需要持久化、抗损坏、带完整性校验的会话存储，以及能优先保留幸存数据的恢复语义。

2. **提示缓存与成本工程（OpenClaw、Hermes、ZeroClaw）。** OpenClaw：每轮动态注入会破坏 OpenAI 提示缓存（#95610），还缺少每智能体每日支出告警（#138679）。Hermes：重放偏差导致 75–85% 的缓存未命中（#104442）；另有一次有记录可查的 $19k 自主运行。ZeroClaw：针对 Anthropic 四槽位限制，出现了一组新的缓存断点与 TTL 提案（#10660/#10662/#10663）。**共同需求：** 把缓存感知的上下文组装与可配置的缓存断点/TTL 当作产品功能来设计，而不是实现细节。

3. **子智能体编排：进度可见性与隔离（OpenClaw、QwenPaw、ZeroClaw、Hermes）。** OpenClaw：将子智能体的完成情况与父上下文隔离（#96975）。QwenPaw：智能体只在被明确要求时才查询子智能体状态（#7450）；拟增加阻塞式 wait-for-agent 工具（#7580）。ZeroClaw：向父级暴露 delegate 的进度（#10531）；把 delegate 结果绑定到属主主体（#10644）。Hermes：异步委托完成从未投递给 API 创建的会话（#104582）。**共同需求：** 标准子智能体生命周期原语——结构化完成事件、进度流和上下文隔离。

4. **投递保证/杜绝静默失败（OpenClaw、Hermes、QwenPaw、ZeroClaw）。** OpenClaw：溢出重试在最终投递未完成时报告成功（#132762）；cron tick 被静默吞掉（#139215）。QwenPaw：任务中途的追问返回 HTTP 409，而不是预期的队列语义（#7559）。ZeroClaw：不完整的终端响应被报告为成功（#9421）。Hermes：异步完成投递被静默丢弃。**共同需求：** 死信队列、可见的失败状态，以及基于队列的消息语义。

5. **Windows 与桌面端对齐（OpenClaw、ZeroClaw、QwenPaw、Hermes）。** OpenClaw 的 P0 Windows 网关故障；ZeroClaw 的 74 个 Windows 测试失败（#7462）；QwenPaw Windows 桌面端事件循环冻结数分钟（#7363）；Hermes 桌面渲染器信任缺陷（#68321）。**共同需求：** Windows CI 对齐与桌面会话状态加固已成为入场门槛。

6. **多 profile/多租户隔离（Hermes 领先，其他项目亦有回声）。** Hermes 占据最大的问题集群：profile 作用域的 MCP 工具隔离（#104534）、环境变量解析（#104265）、cron 任务所有权（#103188）、仪表盘轮次隔离（#101501）。OpenClaw 与 ZeroClaw 在子智能体上下文隔离与属主绑定上表现出并行需求。**共同需求：** 随着网关多路复用的采用增长，需要在工具、环境、cron 与会话之间建立隔离边界。

7. **渠道体验打磨（QwenPaw、ZeroClaw、IronClaw、Hermes）。** QwenPaw：Telegram Markdown 表格、飞书卡片自动折叠、Telegram 中间消息清理。ZeroClaw：Matrix 转录 provider、企业微信文档。IronClaw：Slack 共享频道断开连接指引。Hermes：基于 AST 的 WhatsApp 渲染。**共同需求：** 各渠道渲染保真度与流式消息整洁性。

---

## 5. 差异化分析

| 项目 | 定位 | 主要用户 | 技术架构 | 差异化重点 |
|---|---|---|---|---|
| **OpenClaw** | 核心参考实现，自托管常驻 AI 网关 | 高级用户、网关运维者、插件开发者 | Bun/JS 强类型运行时；网关 + 记忆核心 + 控制 UI + 插件 SDK；托管式本地模型 | 更新路径自愈、规模化可靠性、生态广度 |
| **Hermes Agent** | 桌面集成式智能体平台（Nous Research） | 桌面优先用户、多 profile 运维者 | 桌面应用 + 网关 + cron + 技能索引；profile 隔离边界 | 桌面连续性、WhatsApp 扩张、成本/上下文核算 |
| **IronClaw** | Rust/MCP 原生智能体宿主（nearai） | MCP/LLM 工具开发者、Slack 工作区运维者 | Rust、WASM/WIT、MCP 通道、HTTP 宿主 API | MCP 安全诊断、助手共享频道行为、依赖整洁性 |
| **QwenPaw** | 控制台 + SDK 智能体框架（AgentScope） | Python 开发者、渠道运营人员（飞书/Telegram/Discord） | Python 核心、控制台 UI、基于适配器的渠道 | 记忆可靠性、队列语义、快速社区修复机制 |
| **ZeroClaw** | 由 RFC 治理的安全智能体平台 | 注重安全的团队、TUI/ZeroCode 用户 | WASM 插件、操作系统级沙箱后端（Bubblewrap/Landlock/Seatbelt）、ACP 集成 | 沙箱策略、提示缓存调优、RFC 驱动的架构演进 |

**架构断层线：** OpenClaw 与 IronClaw 代表**网关/宿主**范式（常驻、传输无关）；Hermes 与 QwenPaw 锚定在**面向用户的形态**（桌面应用/控制台）；ZeroClaw 则以**安全治理**和正式 RFC 流程形成差异化。IronClaw 是唯一的 Rust/WASM 优先实现；OpenClaw 与 QwenPaw 构建在高级动态运行时之上（Bun/JS 与 Python）。Hermes 的 Nous 血统赋予其鲜明的本地模型与研究导向；QwenPaw 的 AgentScope 背景暗示其社区偏重东亚/飞书；而 OpenClaw 已经在接收来自所有这些生态的贡献。

---

## 6. 社区势头与成熟度

**第一梯队 — 工业级规模，在负载下趋于稳定：**

- **OpenClaw** — 吞吐量惊人（500/500 有动态）、外部贡献广泛，但 P0/P1 回归缺陷成群出现、分诊标签不断堆积，说明用户规模已经超出维护者带宽。下个版本将是可靠性补丁，而不是功能版本。

**第二梯队 — 快速迭代，边角锋利：**

- **Hermes Agent** — 平台扩展势头强劲（WhatsApp 技术栈、profile 隔离、群聊连续性），但合并吞吐量低（2 PRs/24h），加上一个尚未解决的新 P1 WAL 损坏缺陷，给势头降了温。

- **QwenPaw** — 相对项目体量而言贡献者生态最有活力——9 个开放 PR 来自两位首次贡献者，其中几个在 issue 提出的当天就提交上来。严重级记忆丢失报告与不断累积的评审积压是主要拖累。

- **ZeroClaw** — 原始活跃度高（50 个 PR 有动态），但管线拥堵：大量 PR 卡在 `blocked`/`do-not-merge`，活跃的 S1 缺陷没有对应修复 PR，RFC 反复修订（#9487 v5、#9488 v10）更显流程疲态。

**第三梯队 — 维护模式：**

- **IronClaw** — 用户报告的 issue 为零、依赖整洁、无回归缺陷——但也没有功能势头。这表示产品成熟稳定，正处于平静维护期，而非活跃增长期。

---

## 7. 趋势信号

1. **智能体记忆持久性正成为新的信任前沿。** 在全部五个项目中，情绪最激烈、评论最多的报告，都是关于智能体忘记自己的输出、丢失常驻指令或破坏会话状态。对开发者而言，这意味着：**把对话记录/会话存储当作持久性关键的子系统来对待**，配以 WAL 完整性检查、原子恢复和重放安全的 API。

2. **提示缓存成本正在成为必须产品化的头等议题。** ZeroClaw 正在增加缓存断点/TTL 配置；OpenClaw 与 Hermes 则在对抗动态上下文组装导致的缓存频繁失效。给开发者的价值在于：**把上下文组装设计成缓存友好**——固定前缀、稳定顺序、显式缓存标记，并配以可配置 TTL。

3. **用户要求的是投递保证，而不是静默的 best-effort。** 多个项目反复出现同类投诉：消息或任务在毫无报错的情况下消失（cron tick 被吞、重试假报成功、委托丢失）。死信队列、幂等重试和可见的失败状态正成为智能体基础设施的入场门槛。

4. **子智能体编排需要标准协议。** OpenClaw、QwenPaw、ZeroClaw 与 Hermes 在隔离（返回状态 + 子会话链接，而非完整上下文）、进度事件和 wait/join 原语上的收敛，指向同一个抽象：**带显式父子边界的结构化子智能体生命周期。**

5. **Windows 与桌面是下一个增长前沿，也是最大的风险所在。** 五个项目中有三个存在活跃的 Windows 专属故障；所有项目都出现过桌面 UI 回归，即便数据完好也会摧毁用户信任。跨平台 CI 对齐与渲染器状态加固是明确的投资信号。

6. **多 profile/多租户隔离正在快速升温。** Hermes 的 profile 作用域隔离问题集群表明，真实的网关多路复用采用正在撞上各种尖锐边角。构建多智能体部署的开发者应从第一天起规划**跨工具、环境变量、cron 所有权与会话存储的隔离**。

7. **治理是大项目和重流程项目的共同瓶颈。** OpenClaw 的 `needs-product-decision` 积压与 ZeroClaw 的 RFC 投票推倒重来，都指向同一件事：**维护者的决策队列才是生态中的稀缺资源。** 修复周转快的社区（QwenPaw 当天即收到首次贡献 PR）表明，降低流程开销可以释放贡献者能量。

**给 AI 智能体开发者的核心结论：** 生态正在向一个可靠性内核收敛——持久且缓存感知的上下文、带可见失败模式的可靠投递、结构化子智能体语义与跨平台对齐。功能差异化正在转向渠道体验、安全沙箱和桌面集成；而那些把快速维护者响应与轻量贡献流程制度化的项目，正在赢得社区健康竞赛。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目简报 — 2026-09-07

## 1. 今日概览
Hermes Agent 正处于**高活跃度的稳定化与平台扩展阶段**：过去 24 小时内有 50 个 issue 和 50 个 PR 被更新，其中 39 个 issue 和 48 个 PR 仍处于开启状态。**没有新版本发布**，但 PR 队列显示出跨桌面群聊连续性、WhatsApp 传输、cron 用户体验和网关配置文件隔离方面的强劲推进势头。问题热度仍集中在长期运行的自动化/看门狗问题上，尤其是过期的技能索引（#66616，168 条评论）和被阻塞的 Nous 到 Enterkey 合并（#88584，72 条评论）。最紧迫的新稳定性信号是 `state.db`（#104596）中的一个 P1 级单进程 WAL 脑裂损坏 bug，已附带可复现的损坏前代码路径上报。

## 2. 版本发布
此时间窗口内未发布新的版本标签。没有变更日志、破坏性变更或迁移说明需要报告。

## 3. 项目进展
聚合 PR 数据显示，过去 24 小时内有 **2 个 PR 移出开启状态**（已合并/已关闭），但其标题未出现在提供的顶层 PR 快照中，因此本简报无法对具体合并变更做出确切声明。

重要的开启中 PR 已取得进展或仍在积极开发中：

- **群聊连续性** — #98307 是“桌面端关闭后群聊继续工作”的较大规模 bot 模式实现，而 #104601 则在参与者网关上增加了经过身份验证的群聊历史记录保留功能。直接支持 #97681。  
  https://github.com/NousResearch/hermes-agent/pull/98307  
  https://github.com/NousResearch/hermes-agent/pull/104601
- **WhatsApp 平台扩展** — 三个堆叠 PR：#104133 将基于正则表达式的 markdown 格式化器替换为基于 AST 的 CommonMark → WhatsApp 渲染器；#104245 增加了观察到的未提及群组上下文；#104247 将 WAHA 添加为第三个 WhatsApp 传输通道。  
  https://github.com/NousResearch/hermes-agent/pull/104133  
  https://github.com/NousResearch/hermes-agent/pull/104245  
  https://github.com/NousResearch/hermes-agent/pull/104247
- **网关多路复用下的配置文件隔离** — 来自贡献者的一大批 PR，旨在改善跨配置文件数据安全性：MCP 服务器/工具隔离（#104534）、配置文件作用域的环境变量解析（#104265）、会话存储配置文件接缝（#102146）、cron 任务所有权路由（#103188）以及仪表盘轮次隔离（#101501）。  
  https://github.com/NousResearch/hermes-agent/pull/104534  
  https://github.com/NousResearch/hermes-agent/pull/104265  
  https://github.com/NousResearch/hermes-agent/pull/102146  
  https://github.com/NousResearch/hermes-agent/pull/103188  
  https://github.com/NousResearch/hermes-agent/pull/101501
- **网关/桌面可靠性修复** — 原生交接期间的输入指示器（#104598）、排队后续消息的进度气泡清理（#104500）、自由响应频道的 Discord 自动线程行为（#104499）、Discord `delete_message` 支持（#104600）、沙箱进程组终止验证（#104597）以及更新检查源 URL 隔离（#104599）均已更新或新开启。  
  https://github.com/NousResearch/hermes-agent/pull/104598  
  https://github.com/NousResearch/hermes-agent/pull/104500  
  https://github.com/NousResearch/hermes-agent/pull/104499  
  https://github.com/NousResearch/hermes-agent/pull/104597  
  https://github.com/NousResearch/hermes-agent/pull/104599

## 4. 社区热门话题
按评论数计算最活跃的 issue 主要集中在自动化可靠性、架构连续性和上下文/成本正确性方面：

- **#66616 — 技能索引过期或降级**（168 条评论，自 7 月 18 日起开启）  
  https://github.com/NousResearch/hermes-agent/issues/66616  
  新鲜度探针报告技能中心索引已存在 29.8 小时，而限制为 26 小时。极高的评论数表明看门狗一直在重复触发而未有持久修复，或至少引发了持续的社区/集成讨论。
- **#88584 — 自动化 Nous 集成受阻**（72 条评论）  
  https://github.com/NousResearch/hermes-agent/issues/88584  
  计划中的 Nous 到 Enterkey 合并被 `cron/jobs.py` 中的冲突阻塞。评论的长尾表明这是集成所有者的挫败感，而非核心 agent bug。
- **#97681 — 桌面端关闭后 Bot 群聊应继续工作**（25 条评论）  
  https://github.com/NousResearch/hermes-agent/issues/97681  
  用户对持久、设备无关的多 agent 群聊有强烈需求。这是活跃的 #98307/#104601 PR 工作背后的旗舰功能 issue。
- **#68321 — 桌面端：切换聊天时所有助手消息消失**（10 条评论，P1）  
  https://github.com/NousResearch/hermes-agent/issues/68321  
  一个最高优先级的桌面 bug：助手消息从渲染聊天中消失，而数据库保持完整。
- **#73327 — 可自定义的 cron 响应包装模板**（6 条评论，3 个 👍）  
  https://github.com/NousResearch/hermes-agent/issues/73327  
  用户希望控制 cron 投递包装，而非使用 `cron/scheduler.py` 中硬编码的页眉/页脚。

潜在信号：用户关注**索引新鲜度**、**跨机器会话连续性**、**平台连接器打磨**以及**准确的上下文/成本核算**。

## 5. Bug 与稳定性
按严重程度排序的新增或仍开启的稳定性 issue：

| 严重程度 | Issue | 摘要 |
|---|---|---|
| **P1** | [#104596 — 单进程内 `state.db` WAL 脑裂](https://github.com/NousResearch/hermes-agent/issues/104596) | 新报告的损坏路径：当日志模式探针失败时，`apply_wal_with_fallback` 执行 set-pragma，从而取消关联其他连接的 `-wal`/`-shm` 文件的链接。导致重复出现 `btreeInitPage() returns error code 11`。目前未见修复 PR。 |
| **P1** | [#104442 — 回合中途的 /steer 文本永不持久化](https://github.com/NousResearch/hermes-agent/issues/104442) | 重放的历史记录发生分歧，导致 75–85% 的提示缓存未命中，并丢失用户指令。标记为重复，但未解决的行为对会话正确性影响巨大。 |
| **P1** | [#68321 — 切换聊天后桌面助手消息消失](https://github.com/NousResearch/hermes-agent/issues/68321) | 自 7 月 21 日起开启。仅渲染问题，数据库完好，但严重削弱了用户对桌面会话的信任。 |
| **P2** | [#104582 — 异步委派完成从未投递给 API 创建的会话](https://github.com/NousResearch/hermes-agent/issues/104582) | `delegate_task` 在 `api-` 前缀会话上的完成永远不会触发 `gateway.wake`；投递不会重试。与之前的异步唤醒 bug 不同。 |
| **P2** | [#104541 — Cron 监控器 `no_change` 桩破坏上下文连续性](https://github.com/NousResearch/hermes-agent/issues/104541) | 静默的监控模式 tick 会清除 `continuity`/`context_from: [self]` 上下文；较安静的任务会更快丢失连续性。 |
| **P2** | [#104176 — 继承的 ContextCompressor 摘要覆盖在 `bypass_cooldown` 上出错](https://github.com/NousResearch/hermes-agent/issues/104176) | 子类化 `ContextCompressor` 的第三方上下文引擎因 `bypass_cooldown` 被添加到内部摘要调用签名中而失效。API 兼容性回归。 |
| **P2** | [#104169 — `refresh_agent_mcp_tools()` 静默丢弃会话组装上下文](https://github.com/NousResearch/hermes-agent/issues/104169) | 工具数组的重新推导会丢失任何 `get_tool_definitions()` 未显式重现的内容。对重度 MCP 会话而言是结构性问题。 |
| **P2** | [#100302 — DOM 规范化器移除 Chromium 的活动光标节点；输入停止](https://github.com/NousResearch/hermes-agent/issues/100302) | macOS 桌面编辑器在短时间输入后失去活动光标；contenteditable 仍处于活动状态但不再插入字符。 |
| **P2** | [#100836 — `hermes doctor --fix` 将自身检测为活动写入者](https://github.com/NousResearch/hermes-agent/issues/100836) | `doctor.py` 中泄漏的 `COUNT(*)` 连接阻止了损坏的 `state.db` 的修复，即使没有网关在运行。 |

一些相邻可靠性问题已有修复 PR：#104597 解决沙箱进程组终止，#104534 按配置文件隔离 MCP 工具，#104265 修复随配置文件变化的环境变量泄漏。

## 6. 功能请求与路线图信号
最清晰的近期路线图信号是**持久化的群聊连续性**：issue #97681 已由 PR #98307 和 #104601 积极响应，使其成为下一个功能版本的有力候选。

另外值得注意：

- **Cron 可用性** — 用户希望支持原子化创建禁用任务（#104572）、桌面端“投递给全部”（#44968）以及提示文件/无 cron 提示/附加到会话选项（#103189）。结合可自定义 cron 包装的请求（#73327），cron 用户体验是明确的次要路线图主题。  
  https://github.com/NousResearch/hermes-agent/issues/104572  
  https://github.com/NousResearch/hermes-agent/issues/44968  
  https://github.com/NousResearch/hermes-agent/pull/103189
- **WhatsApp 作为一等网关平台** — 堆叠的 WAHA PR 集（#104247、#104245、#104133）表明即将推出内置的第三个 WhatsApp 传输通道。
- **上下文文件组合** — #98614 提议为 `SOUL.md`、`.hermes.md`、`AGENTS.md` 和 `CLAUDE.md` 增加 `@path` 包含指令，这将改善多文件身份/设置工作流。  
  https://github.com/NousResearch/hermes-agent/pull/98614
- **可信执行通道** — #44993 请求一个可信配置文件通道，允许操作机器人无需逐个脚本审批即可执行 `execute_code`。自 6 月以来一直开启。  
  https://github.com/NousResearch/hermes-agent/issues/44993
- **模型行为控制** — #44817 请求可选的“第二声音”护栏，用于逐步执行控制，尤其是针对较小的本地模型。  
  https://github.com/NousResearch/hermes-agent/issues/44817

预测：下一个次要版本很可能包含**配置文件感知的网关/cron/MCP 隔离**以及**群聊历史保留**；如果堆叠的 PR 能干净合并，WhatsApp/WAHA 和 cron 用户体验功能可能一同落地。

## 7. 用户反馈摘要
此窗口内用户的痛点集中在三个主题：

- **桌面前端可靠性** — 用户反复报告不会损坏数据但使 UI 无法使用的渲染器/会话状态 bug：助手消息消失（#68321）、自动更新后侧边栏显示零会话（#97762）、输入时光标消失（#100302）以及鼠标对角线移动时模型子菜单关闭（#97505）。“数据库完好/仅渲染器问题”的表述反复出现，表明即使用户持久化状态正确，他们也希望会话渲染更加健壮。
- **成本/上下文正确性** — 多位用户报告预检估算器和压缩触发器做出了错误决策：推理重复计费（#99398）、用量锚点从不生效（#99421）、在极小线程上触发压缩（#100381）以及编辑重发触发虚假压缩（#103391）。取证式事后分析 #103563 记录了一次消耗 $19,302.59 / 1,393 个 agent 的重构运行，需要 13 次测试框架修复，展示了大型自主运行的力量与脆弱性。
- **配置文件/多 agent 隔离** — 贡献者和用户正在积极推动配置文件、cron 任务、MCP 服务器和环境之间的正确隔离（#104534、#104265、#103188、#101501）。配置文件作用域修复的数量表明网关多路复用正在获得实际应用并遇到尖锐的边缘问题。

满意度信号在 issue 文本中低于平常水平：大多数评论描述的是自动化失败、上下文丢失或 UI 回归。然而，社区正在积极提交高质量的修复 PR，包括堆叠的 WhatsApp 工作和广泛的配置文件隔离清理，这是一个积极的健康指标。

## 8. 积压事项观察
以下 issue 似乎需要维护者关注或分类跟进：

- **#104596 — `state.db` 中的 P1 WAL 脑裂 bug**  
  新提交但属于最高严重级别的开启中 issue；应立即获得维护者分类。  
  https://github.com/NousResearch/hermes-agent/issues/104596
- **#68321 — P1 桌面助手消息消失**  
  自 7 月 21 日起开启；尽管是 P1，仍未解决且仅有 10 条评论。  
  https://github.com/NousResearch/hermes-agent/issues/68321
- **#66616 — 技能索引过期/降级**  
  评论数高且由机器人驱动更新；需要根本原因分析而非重复探测。  
  https://github.com/NousResearch/hermes-agent/issues/66616
- **#47815 — OIDC ID 令牌验证没有时钟偏差余量**  
  一个小而易于理解的修复（`jwt.decode` 无 `leeway`），自 6 月 17 日起开启。很可能是维护者容易拿下的胜利。  
  https://github.com/NousResearch/hermes-agent/issues/47815
- **#84672 — 内容扫描器将安全文档标记为攻击**  
  P2，在 cron 扫描器和技能守卫之间有建议的共同根本原因；自 8 月 12 日起开启。  
  https://github.com/NousResearch/hermes-agent/issues/84672
- **#44817 / #44968 / #44993 — 较早的 P3 功能请求**  
  均自 6 月 12 日起开启，评论活动很少；它们需要维护者做出明确决定（路线图 vs. 不予修复）以清理积压。  
  https://github.com/NousResearch/hermes-agent/issues/44817  
  https://github.com/NousResearch/hermes-agent/issues/44968  
  https://github.com/NousResearch/hermes-agent/issues/44993

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

## 1. 今日概览

截至 2026-09-07，Ironclaw 显示**低 issue 活跃度与中等 PR 活跃度**：过去 24 小时内没有 issue 被更新、没有发布新版本，另有 9 个 pull request 被活动涉及。3 个依赖相关 PR 被关闭，另有 6 个 PR 保持打开，其中包括两个人工编写的修复：分别针对 MCP 诊断和 assistant 共享频道行为。项目整体健康，处于维护导向阶段，自动化依赖升级占据队列主导，且没有新的回归或面向用户的缺陷报告。

## 2. 发布

**没有发布任何新版本。**

此次摘要窗口内没有需要报告的发布说明、破坏性变更通知或迁移细节。

## 3. 项目进展

本窗口内没有功能完整（feature-complete）的 PR 被合并或关闭。被关闭的 3 个 PR 均为自动化依赖更新：

- [PR #8049](https://github.com/nearai/ironclaw/pull/8049) — 已关闭。将 `everything-else` Rust 依赖组升级了 19 个更新，包括 `uuid`、`base64` 和 `toml`。
- [PR #7835](https://github.com/nearai/ironclaw/pull/7835) — 已关闭。将 GitHub Actions 组升级了 5 个更新，包括 `anthropics/claude-code-action` 以及将 `actions/setup-node` 从 `4.0.2` 升级到 `7.0.0`。
- [PR #7020](https://github.com/nearai/ironclaw/pull/7020) — 已关闭。在 `tokio-ecosystem` 组中将 `tokio-tungstenite` 从 `0.29.0` 升级到 `0.30.0`。

这些属于常规维护和 CI 卫生变更。过去 24 小时内没有面向用户的特性 PR 或缺陷修复 PR 被合并或关闭。

## 4. 社区热门话题

提供的 PR 数据流中没有评论/反应数据，因此无法依据社区参与度来特别标记任何 PR。最值得关注的两个开放 PR 是非 Dependabot 的变更：

- [PR #8077](https://github.com/nearai/ironclaw/pull/8077) — `fix(mcp): classify response leak diagnostics`
- [PR #8076](https://github.com/nearai/ironclaw/pull/8076) — `fix(assistant): distinguish disconnected shared channels`

这两个 PR 最值得维护者和贡献者关注，因为它们修改的是运行时行为而非依赖元数据。其余开放的 PR 均为 Dependabot 自动分组更新，没有记录的讨论内容。

## 5. 缺陷与稳定性

过去 24 小时内，通过 issue 跟踪器没有报告新的缺陷、崩溃或回归。不过，两个开放的 PR 针对的是现有的可靠性/正确性问题：

1. **[PR #8077](https://github.com/nearai/ironclaw/pull/8077) — 中等/安全相关。**  
   处理围绕响应泄漏阻断的 MCP 出口诊断问题。它集中了 `ironclaw_host_api::http` 中共享的 `response_leak_blocked` 哨兵，并让 MCP 通道在保持宿主泄漏阻断安全的同时保留一个不同的、MCP 可见的原因。这关闭了所引用的 issue #8009。

2. **[PR #8076](https://github.com/nearai/ironclaw/pull/8076) — 严重性较低，面向用户。**  
   修复了当配对用户的共享频道断开时 assistant 的行为，将该状态与未配对账户区分开来。它还在用户消息和机器人命令中呈现频道特定的指引，改善了跨 product、adapter 和 OpenAI 兼容表面的拒绝原因分类，并更新了 Slack 能力信息。

本窗口内未发现任何回归或会导致发布中断的稳定性问题。

## 6. 功能请求与路线图信号

过去 24 小时内没有明确的功能请求 issue 被更新。最清晰的路线图信号来自开放的源代码 PR：

- **MCP 宿主诊断细化**（见 [PR #8077](https://github.com/nearai/ironclaw/pull/8077)）表明项目正在改进 MCP 集成的安全诊断。
- **Assistant 频道状态用户体验**（见 [PR #8076](https://github.com/nearai/ironclaw/pull/8076)）表明 Slack/assistant 共享频道行为以及跨表面一致性方面的工作仍在继续。

如果合并，两者都更可能是补丁或次要级别（minor-level）的改进，而非重大功能新增。在此摘要窗口内，没有可见的大型路线图级功能。

## 7. 用户反馈摘要

本窗口内的 issue 或 PR 数据中没有捕获到直接的用户反馈。来自两个开放修复 PR 的间接信号指向了真实用户痛点：

- MCP 用户可能收到过不清晰或重叠的“response leak blocked”诊断信息。
- Slack 上的 assistant 用户在配对共享频道断开时可能没有得到足够的指引，甚至可能被当作未配对账户处理。

两个问题都有对应的开放修复 PR，一旦合并应能对用户体验产生积极影响。总体而言，目前没有可用的满意度/不满意度数据。

## 8. 积压事项观察

没有开放的 issue 被更新或在 issue 跟踪器中等待处理。主要的积压事项是一个长期存在的依赖 PR：

- [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — 自 2026-08-23 起开放，最近更新于 2026-09-06。  
  将 `wasm` 组升级 4 个更新：`wasmtime`、`wasmtime-wasi`、`wit-component` 和 `wit-parser`。标签为 `size: L`、`risk: medium`。鉴于 WASM/WIT 依赖的敏感性，该 PR 很可能需要维护者审核以确认兼容性和合并就绪状态。

其余开放的 PR 是近期的 Dependabot 分组更新，以及仍在等待审核的两个源代码修复 PR。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目简报 — 2026-09-07

## 1. 今日概览

QwenPaw 正处于高度活跃、外部贡献密集的时期：过去 24 小时内 20 个 issue 有更新（17 个打开、3 个关闭），10 个 PR 有更新（9 个打开、1 个关闭），且无新版本发布。当前最突出的主题是智能体记忆/上下文可靠性——就在维护者关闭若干相互重叠的旧报告（[#7447]、[#7548]、[#6814]）的同时，新的严重报告仍陆续出现：助手回复从上下文窗口中消失（[#7579]、[#7584]）。令人鼓舞的是，贡献者势头很强：10 个打开的 PR 中有 9 个来自两位首次贡献者（Bruce-Yii 和 kabishou11），他们为控制台、Telegram、飞书和工具调用可观测性问题带来了现成的修复。项目健康方面的主要隐忧是维护者的响应能力——自 9 月 5 日以来约有 10 个新 issue 堆积起来，若干高严重度项没有关联修复，同时 2.2.x 这一版本线上待审查的首次贡献者 PR 也在持续积压。

## 2. 版本发布

本窗口内没有新版本发布。

## 3. 项目进展

- PR [#2134](https://github.com/agentscope-ai/QwenPaw/pull/2134) **feat(heartbeat)** — *已关闭。* 新增一个可在控制台中配置的每次运行心跳超时，取代原先硬编码的 120 秒运行超时。这是本窗口内唯一被关闭的 PR。
- 以下为新提交、目前等待审查的修复/功能 PR：
  - [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521) — 在上下文压力下折叠已消费的 `ThinkingBlock` 内容，避免长时间运行的单轮智能体工作流因重放旧推理而耗尽上下文窗口。
  - [#7546](https://github.com/agentscope-ai/QwenPaw/pull/7546) — 延迟加载未使用的内置渠道模块；在仅使用控制台的工作区中，消除重型 SDK（如 `lark_oapi`）带来的数十秒启动开销。
  - [#7547](https://github.com/agentscope-ai/QwenPaw/pull/7547) — 恢复飞书高优先级过程中卡住的每会话队列消费者（会话卡在“already running”状态）。
  - [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577) — `POST /console/chat` 现在会在任务运行期间将后续文本/文件消息入队，而不是返回 HTTP 409。直接解决 [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)。
  - [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) — 在 `tool_calls/_coordinator.py::_drain()` 中使用 `logger.exception` 记录异常，避免处理器失败再以裸字符串的形式消失。修复 [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572)。
  - [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) — 在 Telegram 上将 GFM Markdown 表格渲染为 `<pre>` 块，而不是转义后的裸竖线。修复 [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585)。
  - [#7591](https://github.com/agentscope-ai/QwenPaw/pull/7591) — 最终输出确定后自动折叠飞书推理流式卡片。修复 [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570)。
  - [#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592) — 在最终回答后，可选地针对请求清理 Telegram 中间消息；默认关闭以保持向后兼容。关闭 [#7586](https://github.com/agentscope-ai/QwenPaw/issues/7586)。
  - [#7593](https://github.com/agentscope-ai/QwenPaw/pull/7593) — 在控制台的图形选择器旁恢复 v2.1 风格的工作目录直接路径输入。修复 [#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588)。

## 4. 社区热点话题

- [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)（8 条评论）—— 主智能体 + 多子智能体任务只在用户明确询问“进度如何？”时才查询子智能体状态，导致长时间静默停滞。用户真正需要的是主动的编排监控，而不是由用户发起的轮询。
- [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)（5 条评论）—— 任务进行中发送消息或文件会触发 HTTP 409；用户期望的是队列语义而非拒绝。同步聊天 API 与长时间运行的异步智能体任务之间存在预期落差，这是一个反复让用户感到困惑的点。
- [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)（4 条评论）—— Windows 桌面端启动时会冻结 118–135 秒，且每处理一条消息约冻结 126 秒，原因是同步调用阻塞事件循环，而超时始终没有触发。自 8 月 27 日起一直打开，无关联修复。
- [#6814](https://github.com/agentscope-ai/QwenPaw/issues/6814)（4 条评论，已关闭）—— 在 macOS 上打开 Scroll 的 `history.db` 时，于 `sqlite3WalFindFrame` 内发生 SIGBUS 崩溃；本窗口内已关闭。
- 记忆丢失类问题 [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) / [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584) —— 用户报告已持久化的回复从后续请求中消失（“模型看不到自己刚说的话”），触发空响应和工具调用循环。讨论串中用户的表达情绪非常强烈。
- UX 回退类讨论 [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570) 与 [#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588) 均在一天内催生了首次贡献者提交的 PR——这说明社区对渠道和控制台体验打磨的关注度很高。

## 5. Bug 与稳定性

按严重程度排序：

- **严重 —— 助手回复从上下文中丢失。** [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)：已持久化的回复在后续模型请求中缺失（2.2.0 后端），表现为“空响应”。[#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584)：后续报告称 AI 行为异常——包括重复执行、工具结果丢失和工具调用死循环。较早的相关报告 [#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)、[#7548](https://github.com/agentscope-ai/QwenPaw/issues/7548) 已于本窗口内关闭，但新的报告中仍出现同样的症状模式。
- **高 —— 心跳 cron 反馈循环。** [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589)：重复消息堆积导致智能体约 2 小时无响应；已在 2.0.1 和最新 `main` 上验证。
- **高 —— 任务中途发送后续消息返回 409。** [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)；修复 PR [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577) 尚未合并。
- **中 —— 事件循环冻结 / 超时失效。** [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)：同步调用阻塞事件循环；无关联修复 PR。
- **中 —— 工具异常被吞掉。** [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572)：`_drain()` 将 `str(exc)` 直接返回给模型而不记录堆栈；修复 PR [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) 尚未合并。
- **中 —— Telegram Markdown 表格不可读。** [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585)：直接输出原始 `|`/`---`；修复 PR [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) 尚未合并。
- **中 —— 经 WUSRouter 返回 Cloudflare 403。** [#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587)：获取 OpenAI 兼容模型列表时被受管质询页拦截而失败；需要分类处理。
- **较低 —— DeepSeek 滚动压缩失败。** [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541)：`[context compressed]` 块使用 `role=user`，导致 `MODEL_EXECUTION_ERROR`；自 7 月 29 日起一直打开。
- **本窗口内已关闭：** [#6814](https://github.com/agentscope-ai/QwenPaw/issues/6814) macOS 上 SQLite WAL SIGBUS；[#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447) 长上下文中早期记录丢失；[#7548](https://github.com/agentscope-ai/QwenPaw/issues/7548) 切换会话后导航历史丢失。

## 6. 功能请求与路线图信号

- **控制台工作目录输入回退。** 用户希望恢复 v2.1.0 的内联路径输入体验；PR [#7593](https://github.com/agentscope-ai/QwenPaw/pull/7593) 已恢复该功能——这很可能成为近期的补丁候选。
- **渠道消息整洁化。** Telegram 中间消息自动清理（[#7586](https://github.com/agentscope-ai/QwenPaw/issues/7586)，PR [#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592)）和飞书推理卡片自动折叠（[#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570)，PR [#7591](https://github.com/agentscope-ai/QwenPaw/pull/7591)）都已有现成实现。
- **用于委派智能体任务的阻塞等待工具。** [#7580](https://github.com/agentscope-ai/QwenPaw/issues/7580) 提议内置一个用于等待 `submit_to_agent` 任务完成的工具，以取代对 `check_agent_task` 的脆弱轮询。这与 [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450) 中的编排痛点一致；作为核心智能体增强是可行的。
- **心跳可配置化**已通过 PR [#2134](https://github.com/agentscope-ai/QwenPaw/pull/2134) 落地；预计后续版本会在控制台提供超时配置项。
- **生态 / 分发功能。** [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) 请求一键插件更新、更新通知和更平顺的商店导航；[#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583) 请求 AgentScope 社区登录、邮箱和快速反馈闭环。这些信号表明产品层面正在向插件分发和社区集成方向加大投入。

## 7. 用户反馈摘要

- **记忆可靠性是第一痛点。** 多位用户报告助手“总是记不住”——例如忘记 TODO 文件可创建位置这类固定规则、静默切换到错误的工作目录并覆盖已部署代码（[#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)）、在长文档工作流中丢失早期上下文（[#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)），以及丢失自己刚写出的回复（[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)）。
- **用户对自主性的期望很高。** 他们不想通过询问“进度如何？”来触发子智能体状态检查（[#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)）；他们期望智能体自行检测失败并独立恢复。
- **高级用户能立刻感知到 UX 回退。** 2.2.x 移除直接路径输入引发了强烈批评（[#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588)），社区也在当天就用贡献者 PR 快速给出了修复。
- **渠道 UX 的不满非常具体。** Telegram/飞书的流式刷屏是反复出现的投诉点；一位用户贡献了本地验证过的飞书卡片折叠实现（[#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570)），说明这是一个成熟且亲力亲为的贡献者群体。

## 8. 积压观察

- [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) — DeepSeek 滚动上下文 `role=user` 缺陷，自 7 月 29 日起一直打开，无关联 PR；影响一个主要模型系列。
- [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — 同步调用导致事件循环冻结，自 8 月 27 日起一直打开，无修复 PR；导致 Windows 桌面端出现持续数分钟的冻结。
- [#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450) — 多子智能体编排停滞，8 条评论，自 9 月 1 日起打开，无维护者回应或关联 PR。
- [#7580](https://github.com/agentscope-ai/QwenPaw/issues/7580) — 请求提供等待智能体任务完成的工具，尚无维护者回应。
- [#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587) — 经 WUSRouter 返回 Cloudflare 403，需要分类处理（可能是服务提供方问题）。
- [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) — 心跳重复消息反馈循环，9 月 6 日提交，高严重度，尚无回应。
- **PR 审查积压：** 9 个打开的 PR 等待维护者审查，包括首次贡献者提交的 [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) 至 [#7593](https://github.com/agentscope-ai/QwenPaw/pull/7593)、[#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577)、[#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578)，以及更早的 [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521)、[#7546](https://github.com/agentscope-ai/QwenPaw/pull/7546)、[#7547](https://github.com/agentscope-ai/QwenPaw/pull/7547)。未来几天的合并/审查速度将是判断维护者响应能力和项目健康度的关键指标。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-07

## 1. 今日概览

ZeroClaw 保持持续的大规模活跃：**过去 24 小时内有 32 个 issue 和 50 个 PR 被改动**，没有发布新版本。issue 跟踪器的重心明显偏向**进入新一轮修订周期的架构 RFC**（#9487、#9488、#10526、#10076），以及过去两天新提交的一批 **Anthropic prompt-cache bug/功能请求**（#10660、#10662、#10663）。PR 管线依然拥堵但产出可观：6 个 PR 被合并/关闭，针对 Windows 测试套件（#10668）、Matrix CI（#10650）和 RPC 栈溢出加固（#10654）的新修复也已到位。项目整体状态是活跃但积压严重——大量热门 PR 仍被标记为 `blocked`、`do-not-merge` 或 `needs-author-action`，并且有几个 S1 bug 依然没有经过验证的修复。

## 2. 版本发布

**该时间窗口内没有新版本发布。** v0.8.5 有限每周稳定化发布线（[#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)）仍是当前活跃的里程碑跟踪贴；其最初的功能合入冻结日期（August 4）以及持续到 August 30 的每周切割计划都已过期，而该帖子仍在更新——维护者可能想明确收尾工作和 changelog 状态。

## 3. 项目进展

过去 24 小时内有 6 个 PR 被合并/关闭，其中两个出现在高活跃列表中：

- **[PR #10650 — `ci(channels/matrix): execute every Matrix lib test, not one module`](https://github.com/zeroclaw-labs/zeroclaw/pull/10650)** — 已关闭。修复了一个 CI 盲区：`channel-matrix` 会被编译，但其库测试从未运行；工作区中的 Matrix 测试缺口现已补齐。
- **[PR #10487 — `fix(channels/matrix): resolve transcription providers from live config`](https://github.com/zeroclaw-labs/zeroclaw/pull/10487)** — 已关闭。Matrix 现在在调度时会从带类型的 `[providers.transcription.*]` 配置解析转录 provider，而不是使用构造时的快照，从而修复了 provider 注册和路由问题。

另有 3 个 issue 被关闭：

- **[#9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575)** — OpenAI 兼容的预热逻辑现在使用 `GET /models`，而不是错误的 chat-completions 请求。
- **[#9653](https://github.com/zeroclaw-labs/zeroclaw/issues/9653)** — 插件 `wasi:http` 的信任库缺口（仅内置 webpki 根证书）已关闭，相关工作由 destination-policy 工作（#9395 / PR #9137）取代。
- **[#10572](https://github.com/zeroclaw-labs/zeroclaw/issues/10572)** — “为 WeCom 渠道编写文档”的任务已关闭；WeCom 现在需要有超出“标签到文件映射”范围的用户文档。

## 4. 社区热门话题

评论最多的 issue 全都是**长期的架构与流程辩论**：

- **[#9487 — RFC: Runtime-owned conversation sessions and transport surface adapters](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)**（34 条评论，修订版 5）— 这是对修订版 4 投票快照的一次实质性替换；更早的 no-vote 不会顺延到新修订版，需要重新开启维护者讨论窗口。属于高风险的核心架构决策。
- **[#9488 — RFC: Unified file and attachment architecture for conversation surfaces](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)**（27 条评论，修订版 10）— 围绕附件的配套 RFC；与 #9487 一样存在反复修订/重新投票的循环。
- **[#6996 — RFC: Granular sandbox policy — filesystem restrictions](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)**（25 条评论）— 自 May 28 起一直开放；处理应用层路径准入与操作系统沙箱后端（Bubblewrap/Landlock/Seatbelt）之间的漂移。
- **[#7462 — [Bug]: 74 test failures on Windows](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)**（19 条评论）— 一场跨平台质量持久战：仅 Unix 可用的命令、路径语义和控制台代码页 936 会让测试套件在 Windows 11 简体中文上崩溃。
- **[#8692 — Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**（15 条评论）— 这是这些 RFC 最终汇入的那个积压队列的集中跟踪器。

**深层诉求：** RFC 决策流程存在结构性瓶颈。新的流程简化 RFC（[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)）与 #9487/#9488 中“快照/重置”带来的摩擦同时出现，说明社区对强制讨论窗口感到沮丧，希望投票流程更精简——贡献者希望维护者少花时间在流程上、多花时间在实质问题上。

## 5. Bug 与稳定性

按严重级别列出新增和活跃 bug，并标注修复状态：

**S1 — 工作流受阻**

- **[#10659 (new, S1)](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)** — 超出预算的 Code/ACP 轮次在会话恢复后，会丢失已经流式输出的进度。目前还没有修复 PR。直接影响 ZeroCode TUI 体验。
- **[#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** — Quickstart agent 初始化期间的守护进程启动/重载会出现栈溢出。新的 **[PR #10654](https://github.com/zeroclaw-labs/zeroclaw/pull/10654)**（`fix(runtime): bound RPC dispatch stack usage`）看起来就是针对性的缓解措施；仍在等待 `r:needs-repro` 中的复现。
- **[#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421)** — 在 Anthropic/reliable/compatible provider 上，不完整的终止响应可能被报告为成功。这是一个严重的信任类 bug，仍处于打开状态，且没有可见的修复 PR。
- **[#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)** — Cron agent 作业**没有 wall-clock 超时**；进行中的锁只在进程启动时清除。自 July 20 起已被接受并处理中；当前没有修复 PR。

**P1 / 高风险回归（新增）**

- **[#10617](https://github.com/zeroclaw-labs/zeroclaw/issues/10617)** — `thinking.display = "updates"` 在 Claude Fable 5.1 上返回 HTTP 400；display 枚举必须收窄为 `summarized`/`omitted`。
- **[#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)** — 运行时 profile 报告 `max_cost_per_day_cents = 4294967295`，而全局账本仍然在达到 $10.00 时拒绝——向用户呈现了误导性配置。
- **[#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)** — OAuth 系统前缀缓存标记低于 Anthropic 的缓存最小值，并且占用了四个断点槽位之一。

**S2 / 测试与 UX 稳定性**

- **[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — Windows 上 74 个测试失败；新的 **[PR #10668](https://github.com/zeroclaw-labs/zeroclaw/pull/10668)** 将 Windows 测试选择范围收窄到包内 `locales/` 资源，以避免依赖区域设置的失败。
- **[#10302](https://github.com/zeroclaw-labs/zeroclaw/issues/10302)** — ZeroCode 的 Code 窗格在浏览历史时卡在 Processing 状态，持续消耗 CPU。
- **[#10645 / #10644](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)** — 来自 #10601 的已接受 P1 后续问题：委托子循环不会在成本跟踪上下文中运行；后台委托结果没有绑定到所有者主体（owner principal）。两者都已作为修复事项登记，等待 PR。
- **[#10655](https://github.com/zeroclaw-labs/zeroclaw/pull/10655)**（PR）新增结构化的 `tool_result_truncated` 警告；**[#10664](https://github.com/zeroclaw-labs/zeroclaw/pull/10664)**（PR）对公开的 `/health` 端点进行净化，避免泄漏诊断快照。

## 6. 功能请求与路线图信号

最突出的新路线图信号是 **Anthropic prompt-cache 优化**：

- **[#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660)** — 在上一轮的最后一条消息上添加第三个缓存断点，让轮次边界的未命中回退到历史记录，而不是系统提示词。
- **[#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)** — 为原生（native）和透传（passthrough）缓存标记提供可配置的 1 小时 prompt-cache TTL。

其他活跃项：

- **[#10531](https://github.com/zeroclaw-labs/zeroclaw/issues/10531)** — 把委托子 agent 的进度（工具回执、部分输出）暴露给父 agent。
- **[#10426](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)** — 为 Telegram 渠道提供面向用户的 agent 进度。
- **[#10580](https://github.com/zeroclaw-labs/zeroclaw/issues/10580)** — 全仓库文档内部链接检查；对应的 **[PR #10646](https://github.com/zeroclaw-labs/zeroclaw/pull/10646)** 正在等待作者操作。

一旦解除阻塞，以下大型在途功能 PR 很可能在下一个次版本中落地：**webhook 轮次的 SSE 流式传输**（[#10450](https://github.com/zeroclaw-labs/zeroclaw/pull/10450)）、**同会话消息序列化**（[#10411](https://github.com/zeroclaw-labs/zeroclaw/pull/10411)）、**存储感知的 CLI 记忆后端**（[#10652](https://github.com/zeroclaw-labs/zeroclaw/pull/10652)）以及 **Mattermost 审批提示**（[#10358](https://github.com/zeroclaw-labs/zeroclaw/pull/10358)）。

预测：下一个版本很可能会将 **缓存断点/TTL 修复（#10660/#10662/#10663）、Windows 测试修复（#7462/#10668）和委托结果所有权/成本修复（#10644/#10645）** 一起打包——它们规模小、价值高，而且已经有 accepted issue 或打开的 PR。规模更大的 RFC 驱动重写（runtime 持有的会话 #9487、文件附件 #9488、WASM 插件运行时 #10076、会话事件历史 #10526）则要更晚一些。

## 7. 用户反馈摘要

在 issue 和 PR 中反复出现的痛点：

- **跨平台与本地化覆盖缺失：** 使用简体中文/代码页 936 的 Windows 用户会遇到 74 个测试失败；CI 只跑 Linux，导致仅 Unix 可用的测试命令和编码类 bug 不断腐坏（[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)）。PR #10668 只是向对齐迈出一步，尚未完全对齐。
- **对 RFC 流程感到疲惫：** 贡献者明确提出，固定讨论窗口“往往并不能带来更多评审”，并要求 REVISE 能立即终止投票（[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)）；两个大型 RFC 刚刚作废了此前的投票并被“重置到 Revision 5/10”（[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)、[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)）。
- **agent 可见性不足：** Telegram 用户在长时间工具调用期间只能看到“静默”（[#10426](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)）；在委托完成前，父 agent 处于盲目状态（[#10531](https://github.com/zeroclaw-labs/zeroclaw/issues/10531)）；ZeroCode 可能出现幽灵般的 `Processing...` 窗格并持续消耗 CPU（[#10302](https://github.com/zeroclaw-labs/zeroclaw/issues/10302)）。
- **预算/生命周期数据丢失：** 轮次中触达成本上限会丢弃已经流式输出的助手文本和工具结果（[#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)）；profile 中显示的成本上限与实际执行不一致，削弱了信任（[#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)）。
- **文档缺口：** WeCom 上线时没有任何面向用户的文档（[#10572](https://github.com/zeroclaw-labs/zeroclaw/issues/10572)）；存量内部链接会静默失效，因为文档门禁只检查新增行（[#10580](https://github.com/zeroclaw-labs/zeroclaw/issues/10580)）。

## 8. 积压观察

需要维护者关注、按时间/风险排序的事项：

- **[#6932 (May 25)](https://github.com/zeroclaw-labs/zeroclaw/issues/6932)** — 已接受的功能：将 gateway WebSocket 会话持久化为完整转录（transcripts）。已接受并处于 `no-stale` 状态超过 3 个月，却没有任何可见实现。
- **[#6996 (May 28)](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — 文件系统沙箱 RFC，25 条评论，自 5 月底以来一直等待维护者评审；最接近“可决策”状态，同时阻塞着相关的安全策略工作。
- **[#7462 (Jun 10)](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — 74 个 Windows 测试失败，accepted/in-progress，目前有一个针对 CI 的部分修复正在评审中（[#10668](https://github.com/zeroclaw-labs/zeroclaw/pull/10668)）。
- **[#7759 (Jun 16)](https://github.com/zeroclaw-labs/zeroclaw/issues/7759)** — P1：将 gateway WebSocket 生命周期与 agent 轮次解耦（进行中，已接受）。客户端断开即取消仍是默认行为——这是一个重大的 UX/可靠性缺口。
- **[#9191 (Jul 20)](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)** — S1 cron 作业没有 wall-clock 超时；已接受，但没有在途 PR。
- **[#8692 (Jul 4)](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 维护者决策队列本身仍是一个进行中的工作系统；以上好几项实际上都在该队列中排队。

**在评审中搁浅或被阻塞的 PR：**

- **[#9713 (Aug 3)](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)** — 历史裁剪事件中的 token 核算；XL、`blocked`、`do-not-merge`。
- **[#9739 (Aug 4)](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)** — ZeroCode 多会话窗格（带 agent 侧边栏）；维护者已更新，仍为 `needs-maintainer-review`。
- **[#10016 (Aug 15)](https://github.com/zeroclaw-labs/zeroclaw/pull/10016)** — 按身份进行 Webhook 审计关联；XL，与安全相关，需要维护者评审。
- **[#9997 / #10358 / #10356](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)** — 安全 Telegram model picker、Mattermost 审批和 AnySearch provider 均处于 `blocked` + `do-not-merge` 状态；Mattermost 和 AnySearch 自 Aug 25 起一直在等待。
- **[#9378 (Jul 26)](https://github.com/zeroclaw-labs/zeroclaw/pull/9378)** — ACP 失败/取消时的 transcript 持久化被标为 `stale-candidate` 和 `needs-author-action`；如果被放弃，将重新打开会话持久性缺口。

最清晰的项目健康指标仍然是：**一批已接受却缺少已合并修复的 S1/P1 运行时正确性 bug（#9191、#9421、#10230）高度集中**——项目的功能/RFC 推进速度正在超过其稳定性吞吐能力。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*