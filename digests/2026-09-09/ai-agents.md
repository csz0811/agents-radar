# OpenClaw 生态日报 2026-09-09

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-08 22:47 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-09

数据来源：github.com/openclaw/openclaw | 快照时间：2026-09-09

## 1. 今日概览

OpenClaw 社区活动仍然非常活跃：过去 24 小时内有 500 个 issue 和 500 个 PR 被更新。其中，285 个 issue 处于开启/活跃状态，215 个已关闭；229 个 PR 处于开启状态，271 个已合并/关闭。期间发布了一个新版本 **v2026.9.3**，重点改进更新的安全预演与恢复机制。社区和维护者关注的核心主题集中在加固近期发布路径：Windows/更新器故障、静默会话/消息丢失、模型回退回退回归以及多智能体可靠性。总体而言，项目健康度好坏参半但响应积极——大量 P0/P1 可靠性问题已有修复或处于关闭状态，但若干长期存在的"静默丢失"类问题仍未关闭。

## 2. 版本发布

### v2026.9.3 — openclaw 2026.9.3

发布于 2026-09-09 前后窗口。主要亮点：

- **更安全的更新**：核心与插件变更在激活前会先在隔离的候选状态中进行预演。
- 支持符合条件的 **2026.9.2 迁移**。
- 无需停止健康运行的匹配 Gateway 即可恢复被放弃的更新记录。
- 相关 issue：[#136997](https://github.com/openclaw/openclaw/issues/136997)。
- 关联 PR 引用：[#138839](https://github.com/openclaw/openclaw/pull/138839)、[#141109](https://github.com/openclaw/openclaw/pull/141109)、[#141175](https://github.com/openclaw/openclaw/pull/141175)、[#1415](https://github.com/openclaw/openclaw/pull/1415)。

发布摘要中未提供明确的破坏性变更或手动迁移说明。

## 3. 项目进展

过去 24 小时内有 271 个 PR 达到合并/关闭状态。由于摘要流仅显示顶部子集，以下为已关闭或取得进展的值得关注的条目：

- [#137485](https://github.com/openclaw/openclaw/pull/137485) — **已关闭**：`fix(codex): stop marketplace polling when native plugins are disabled`
- [#142609](https://github.com/openclaw/openclaw/pull/142609) — **已关闭**：`fix(memory): align deep status with the published fallback index`
- [#142278](https://github.com/openclaw/openclaw/pull/142278) — **已关闭**：`fix(agents): explain returned fallback stops`

其他正在评审中且带有良好标签（`ready for maintainer look`、`proof: sufficient`）的高信号 PR 包括：

- [#142631](https://github.com/openclaw/openclaw/pull/142631) — `fix(update): restart Git installs upgrading from 2026.9.1`
- [#141869](https://github.com/openclaw/openclaw/pull/141869) — 在主模型超时时配置模型回退
- [#141825](https://github.com/openclaw/openclaw/pull/141825) — 使认证提供商冷却绕过变为可配置
- [#131805](https://github.com/openclaw/openclaw/pull/131805) — 保持 WebChat 新会话模型显示与路由一致
- [#137576](https://github.com/openclaw/openclaw/pull/137576) — 工作进程在设置/工作区同步期间安全等待输入
- [#142612](https://github.com/openclaw/openclaw/pull/142612) — 查看多个会话时减少冷启动在线状态工作量

更新加固 PR 以及已关闭的 memory/codex 修复表明，维护工作正在积极聚焦于 post-2026.9.x 稳定性收敛。

## 4. 社区热门话题

按评论数排列的主要 issue 显示社区对**静默丢失、消息投递和更新/重启损坏**问题高度关注：

- [#44925](https://github.com/openclaw/openclaw/issues/44925) — *子代理完成结果静默丢失——无重试、无通知、超时时不会自动重启* — **26 条评论**。长期存在的 P1 问题，严重级别为 diamond-lobster。用户报告分布式子代理故障但没有任何错误上报。
- [#135111](https://github.com/openclaw/openclaw/issues/135111) — *间歇性"Provider completed tool call with malformed JSON arguments"* — **23 条评论**。出现在 v2026.8.1 中，与 claude-sonnet-5 相关；未绑定到特定文件/工具。
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — *未被回收的 hook/tool 子进程累积为僵尸进程* — **15 条评论**。与运行时性能下降和崩溃循环风险相关。
- [#43367](https://github.com/openclaw/openclaw/issues/43367) — *多智能体编排不稳定* — **14 条评论**。配置覆盖、会话锁失败、子任务脱离运行。
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — *同步智能体持久化在大规模场景下阻塞 Gateway 事件循环* — **14 条评论**。
- [#85251](https://github.com/openclaw/openclaw/issues/85251) — *Codex app-server 发出 notification:turn/started 后进入静默状态* — **13 条评论**。嵌入式运行卡死直至整个恢复窗口结束。
- [#127229](https://github.com/openclaw/openclaw/issues/127229) — *Telegram 看门狗释放的持久化更新被错误地标记为 tombstone* — **13 条评论**。
- [#137813](https://github.com/openclaw/openclaw/issues/137813) — *Windows gateway 在 2026.9.1 后无法启动* — **12 条评论**。P0，已关闭。
- [#139714](https://github.com/openclaw/openclaw/issues/139714) — *核心更新后恢复失败，`openclaw status` 永远显示"update in progress"* — **12 条评论**。
- [#137927](https://github.com/openclaw/openclaw/issues/137927) — *内部上下文块泄漏到可见的 Telegram 消息文本中* — **12 条评论**。已关闭。

根本需求：用户需要万无一失的**可观测性和可恢复性**——如果工作无法重试，至少不能静默消失。更新/升级路径也是一个重要的信任边界。

## 5. 缺陷与稳定性

### P0 / 阻塞发布

- [#136203](https://github.com/openclaw/openclaw/issues/136203) — **P0 开启中**：Windows de-DE 2026.8.2 升级导致 Doctor 维护被阻塞，并遗留旧工作区状态。
- [#115642](https://github.com/openclaw/openclaw/issues/115642) — **P0 开启中**：订阅认证的计费冷却时间超过故障持续时间；上游瞬时错误后请求持续失败数小时。
- [#140908](https://github.com/openclaw/openclaw/issues/140908) — **P0 开启中**：`doctor --fix` / `gateway status --deep` 在 systemd 用户服务账户下因 EACCES 失败，阻塞升级后迁移。
- [#137813](https://github.com/openclaw/openclaw/issues/137813) — **P0 已关闭**：Windows gateway 在 2026.9.1 后因 `--task-supervisor` 静默退出而无法启动。

### 高严重性回归 / 开启中的缺陷

- [#139847](https://github.com/openclaw/openclaw/issues/139847) 和 [#141252](https://github.com/openclaw/openclaw/issues/141252) — **2026.9.2 回归**：回复运行失败并报错 `Reply operation has no active tool authority snapshot`；回复进行期间到达的消息可能被丢弃。两者均保持开启并带有 `fix-shape-clear`/`queueable-fix` 标签，但在顶部 PR 集中未看到专门的修复 PR。
- [#135704](https://github.com/openclaw/openclaw/issues/135704) — 带 `reply_to_guid` 的 iMessage 反射绕过回显缓存。
- [#135111](https://github.com/openclaw/openclaw/issues/135111) — v2026.8.1 上间歇性出现格式错误的 JSON 工具调用参数，与具体工具/文件无关。
- [#136183](https://github.com/openclaw/openclaw/issues/136183) — 命令执行器在生成 ssh 时挂起；等待横幅期间收到 SIGTERM（回归持续至 2026.8.2）。
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — hooks/tools 产生的僵尸子进程累积导致运行时性能下降。
- [#85251](https://github.com/openclaw/openclaw/issues/85251) — Codex app-server 会话在 `embedded_run` 中卡死直至 stuck-session 恢复机制介入。
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — 大规模场景下同步持久化阻塞事件循环；已部分修复但 issue 仍然开启。
- [#87109](https://github.com/openclaw/openclaw/issues/87109) — macOS 上 Gateway 空闲时堆内存增长，内存压力下 cron 静默失败（已关闭）。

### 更新特定故障

- [#139714](https://github.com/openclaw/openclaw/issues/139714) — 更新运行记录永远无法终结；`openclaw status` 卡在"update in progress"。
- [#133984](https://github.com/openclaw/openclaw/issues/133984) — 已关闭：2026.7.1-2 → 2026.8.1 导致 Gateway 无法启动；`doctor --fix` 跳过配置键迁移。
- [#134896](https://github.com/openclaw/openclaw/issues/134896) — 已关闭：2026.8.1 的 5-blocker gateway 重启级联故障外加自引用 `doctor --fix` 失败。

## 6. 功能请求与路线图信号

- [#96675](https://github.com/openclaw/openclaw/issues/96675) — **所有者签名的责任门控**，用于助手记忆、操作、技能和证据复用。这是一个具有实际关注度的隐私/控制功能（+2，10 条评论）。
- [#60602](https://github.com/openclaw/openclaw/issues/60602) — 为多智能体成本归属提供按智能体的 Bedrock `requestMetadata` 注入。可能对企业/多租户场景具有重要意义。
- [#46058](https://github.com/openclaw/openclaw/issues/46058) — 关于 OpenClaw 以聊天优先的 Android 交互界面的讨论；并非完整的上游 fork，而是寻求对齐的请求。
- [#83143](https://github.com/openclaw/openclaw/issues/83143) — 当 `HEARTBEAT.md` 不存在时跳过 HEARTBEAT 提示；减少不必要的模型调用。
- [#138279](https://github.com/openclaw/openclaw/issues/138279) — 发布 Linux aarch64 配套构建（.deb + AppImage）；当前 Linux 工件仅支持 amd64。
- [#115367](https://github.com/openclaw/openclaw/issues/115367) — 提供商拥有的读取门控目前锁定在内置来源，但特权聊天界面现已是外部插件；Slack/Discord/Matrix 等中的读取实际上受到限制。

预测：近期版本很可能继续聚焦于更新安全性、回复运行的工具权限修复，以及可配置的回退/冷却行为。带有 `fix-shape-clear/queueable-fix` 标签的条目（#139847、#141252、#135704、#136203）最有可能很快落地。

## 7. 用户反馈摘要

用户在 issue 中表达的情绪反映出对更新和迁移质量的真实不满：

- 升级路径仍然痛苦：用户报告需要"十几个手动修复步骤"（[#133984](https://github.com/openclaw/openclaw/issues/133984)），以及在 5-blocker 级联故障后进行"手动发行源检查"（[#134896](https://github.com/openclaw/openclaw/issues/134896)）。
- 静默丢失是最大的信任问题：子代理结果丢失且无重试/通知（[#44925](https://github.com/openclaw/openclaw/issues/44925)），Telegram 外发消息可能在重启时卡住并丢失（[#126246](https://github.com/openclaw/openclaw/issues/126246)），即使提供商健康状态正常用户也看到通用错误（[#141694](https://github.com/openclaw/openclaw/issues/141694)）。
- 记忆/大规模用户报告无法恢复的状态，例如 `memory-core` 重建索引锁从未释放以及 19 GB 的孤立临时数据库（[#136311](https://github.com/openclaw/openclaw/issues/136311)）。
- 更新后的插件/打包偏差也很常见：精确固定版本的官方插件停留在旧核心版本（[#135776](https://github.com/openclaw/openclaw/issues/135776)），官方插件可能被密钥库信任检查拒绝（[#138342](https://github.com/openclaw/openclaw/issues/138342)）。

v2026.9.3 的发布以及大量针对更新/回退问题已关闭的 PR 表明团队正在处理这些投诉，但许多用户已经对非交互式迁移/doctor 路径失去了信任。

## 8. 积压观察

长期保持开启且仍带有维护者/产品决策标记的 issue：

- [#43367](https://github.com/openclaw/openclaw/issues/43367) — 开启于 2026-03-11：多智能体编排不稳定；P1，`needs-maintainer-review`，`needs-product-decision`。已静默活跃 6 个月。
- [#44925](https://github.com/openclaw/openclaw/issues/44925) — 开启于 2026-03-13：子代理完成结果静默丢失；P1，`needs-maintainer-review`，`needs-product-decision`，26 条评论。
- [#56693](https://github.com/openclaw/openclaw/issues/56693) — 开启于 2026-03-29：OpenAI Codex OAuth 可能绑定到已停用的 ChatGPT 工作区。
- [#86174](https://github.com/openclaw/openclaw/issues/86174) — 开启于 2026-05-24：WebChat"New Session"模型显示/路由不匹配已有可评审的修复 PR（[#131805](https://github.com/openclaw/openclaw/pull/131805)），但 issue 仍然开启。
- [#92870](https://github.com/openclaw/openclaw/issues/92870) — 开启于 2026-06-14：压缩期间系统事件文本泄漏到用户 attribution；P1 安全/会话状态问题。
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — 开启于 2026-06-29：僵尸进程累积；P1，带有 `needs-maintainer-review`。
- [#115642](https://github.com/openclaw/openclaw/issues/115642) — 开启于 2026-07-29：P0 计费冷却恢复需要产品决策。
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — 开启于 2026-08-05：同步持久化阻塞 Gateway 事件循环；P1，需要产品决策。

这些高影响、长期存在的条目表明维护者带宽被发布后回归所挤压，但它们仍然是未来架构变革的重要信号：持久化会话所有权、模型回退策略和可观测的多智能体执行。

---

## 横向生态对比

# 跨项目对比报告——个人 AI 助手 / 智能体开源生态
**观察窗口：** 2026-09-09（24 小时）| **编制：** AI 智能体与个人助手 OSS 生态高级分析师

---

## 1. 生态概览

开源个人 AI 助手领域已深度进入增长期后的加固阶段：贡献者活跃度最高的项目，把更多开发周期投入到更新安全、会话持久化和提供商兼容性上，而不是全新功能。一个值得注意的项目群——OpenClaw、IronClaw、QwenPaw 和 ZeroClaw——共享命名风格和“家族相似”架构（以网关为中心、多通道的“Claw/Paw”智能体内核），而 Hermes Agent 则代表一种源自研究实验室的替代技术栈，在桌面/TUI 领域拥有深厚的积累。纵观这五个项目，主导性的信任边界已不再是模型智能，而是**可靠性基础**：消息/会话静默丢失、误报更新失败、多用户/多智能体状态隔离。最繁忙的项目正在收敛到相似的架构答案——预演式更新、归属到调用方的会话、缓存感知的上下文裁剪、按 profile 隔离的工具——这表明生态系统的标准化方向是运维成熟度，而非仅仅以智能体能力作为差异化。

## 2. 活跃度对比

*健康评分是分析师对摘要信号的综合评估：对 bug 的响应速度、关闭速度、是否存在未解决的 P0/P1、以及流程压力。评分标准：5 = 健康稳定，1 = 状态堪忧。*

| 项目 | Issue 更新数（开放 / 关闭） | PR 更新数（开放 / 合并或关闭） | 窗口内发布 | 健康度（1–5） | 主要健康信号 |
|---|---|---|---|---|---|
| **OpenClaw** | 500 (285 / 215) | 500 (229 / 271) | **v2026.9.3**——更安全的更新预演与恢复 | **3.0** | 工业化吞吐量；24 小时关闭 271 个 PR，但长期存在的 P1“静默丢失”issue 和未关闭的 P0（Windows de-DE 升级、计费冷却、systemd EACCES）让信任债高企 |
| **Hermes Agent** | 50 (49 / 1) | 50 (45 / 5) | 无 | **3.0** | 响应式流水线——新 bug 在 24 小时内就有对应的修复 PR——但 P1 Windows 更新器误报失败和桌面 WS 重连循环问题尚无可见的修复 PR |
| **IronClaw** | 2 (2 / 0) | 11 (8 / 3) | 无 | **4.0** | 体量最小的项目，闭环最干净：维护者始终在同一天将 issue 与修复 PR 配对；唯一的拖累是一个已有 6 周历史的安全相关 MCP issue（#6778），其修复已在推进中 |
| **QwenPaw** | 30 (15 / 15) | 45 (21 / 24) | **v2.2.1-beta.1**——模型路由 + 聊天流式修复 | **4.0** | 非 OpenClaw 同行中功能发布节奏最快；24 小时内 24 个 PR 合并/关闭；已报告的回归问题大多已有开放的跟进 PR |
| **ZeroClaw** | 26 | 50 (47 / 3) | 无 | **2.5** | 高质量的架构工作，但流程承压：47 个 PR 开放，若干个 `risk:high` 安全 PR 因 `needs-author-action` 停滞，RFC 投票快照被新修订版作废 |

**值得注意的体量差异：** 仅 OpenClaw 一家的 issue 和 PR 处理量就是 Hermes（第二大活跃项目）的 10 倍，而且它在一天内关闭了 271 个 PR——超过 ZeroClaw 全部开放 PR 的积压量。整个生态呈幂律分布：OpenClaw 是占主导地位的参考项目，后面跟着由专注型衍生项目组成的长尾。

## 3. OpenClaw 的竞争地位

**相对同行的优势：**
- **数量级的社区规模。** 每天有 500 个 issue + 500 个 PR 被处理，其中 271 个 PR 合并/关闭。热门 issue 能吸引 12–26 条评论，说明其背后有一个庞大且活跃的用户群，正在实际使用 Windows、Telegram、iMessage、WebChat 和 Codex 等入口。
- **唯一将更新预演投入实际发布的项目。** v2026.9.3 在激活前于隔离的候选状态中预演核心/插件变更，支持符合条件的迁移，并能在不停止健康网关的情况下恢复已放弃的更新记录。同行仍在修复基本的更新验证问题（Hermes 因 CWD 解析错误导致的误报失败；QwenPaw 的 llama.cpp 静默回滚）。
- **P0 响应速度最快。** Windows 网关 P0（#137813）在窗口期内关闭；更新加固类 PR 主导了合并流（例如，要求从 2026.9.1 升级的 Git 安装执行重启）。
- **接入面矩阵最广。** 没有同行能比肩 OpenClaw 的渠道覆盖范围（Telegram、WebChat、iMessage、Codex 应用服务器、多智能体编排），这使其成为网关架构事实上的参考基准。

**技术路线差异：** OpenClaw 的架构以网关为中心，并配有独立的运维子系统——`doctor` 维护、`--task-supervisor`、工作区同步，以及一个将迁移视为一等可恢复状态的更新系统。同行则各有不同：Hermes 使用多路复用（multiplex）profile 和桌面机群模型；QwenPaw 围绕 Console 桌面端，配备可插拔记忆后端；ZeroClaw 有意采用 RFC 驱动，围绕运行时拥有的会话和沙箱展开；IronClaw 是一个 Rust 单 crate 的托管 MCP 基础设施项目。

**社区规模对比：** OpenClaw 的日活跃度（500/500）大致相当于四个同行按自身摘要计数计算的活跃度*总和*——Hermes 50/50、QwenPaw 30/45、ZeroClaw 26/50、IronClaw 2/11。仅其开放 issue 数量（285 个）就约为 IronClaw PR+issue 总流量的 20 倍。

**总体评估：** OpenClaw 是生态系统的重心和参考实现，但其规模是一把双刃剑：它背负着数量最大的开放 P0/P1 可靠性问题绝对积压，也因更新/迁移失败承受着最严重的用户信任损伤。它的地位依然稳固，但下一个差异化任务必须是关闭以 #44925、#139847、#141252 为代表的“静默丢失”类 issue，并重建用户对非交互式迁移路径的信心。

## 4. 共性技术关注点

多个项目中独立涌现的需求（按信号强度从高到低排列）：

| 关注领域 | 涉及项目 | 具体需求 / 佐证 |
|---|---|---|
| **无静默丢失的会话/消息语义** | OpenClaw、QwenPaw、Hermes、ZeroClaw | 子智能体结果的重试/通知保证（OpenClaw #44925）；持久化回复在后续模型上下文中缺失（QwenPaw #7579）；失败轮次在会话切换时消失（ZeroClaw #9333）；关闭刷新时 session_key→session_id 的恢复（Hermes PR #106112） |
| **更新与迁移信任** | OpenClaw、Hermes、QwenPaw | 预演式/原子化候选更新（OpenClaw v2026.9.3）；更新器验证解析正确的 CWD 以杜绝误报 FAILED（Hermes #105145、#106097）；返回真实的“fetch failed”回执而不是成功横幅（Hermes #106026）；防止手动升级的 llama.cpp 在运行时被静默回滚（QwenPaw #7633） |
| **提供商适配器韧性** | 全部五个 | 主服务超时后的模型回退（OpenClaw #141869）；畸形 tool-call JSON 无法关联到工具/文件（OpenClaw #135111）；本地 Ollama 出现“no API key”回归（Hermes #106010）；新增 padding 字段导致 Mistral 流式中断（Hermes #106006）；Gemini 拒绝以模型回合收尾的请求（QwenPaw #7625）；异步工具 + 推理状态与 OpenAI Responses 对齐（ZeroClaw #10704–#10708） |
| **多智能体/多主体隔离** | IronClaw、Hermes、OpenClaw、ZeroClaw | 托管 MCP 服务器上的跨用户工具目录污染，对应按调用方归属的修复（IronClaw #6778、PR #8090、SEP-414 #8084）；多路复用配置下 MCP 工具集未按 profile 隔离（Hermes #106005）；多智能体编排不稳定，包括配置覆盖和子任务脱离（OpenClaw #43367）；运行时拥有会话所有权的 RFC（ZeroClaw #9487，Rev 5） |
| **上下文与成本经济性** | ZeroClaw、IronClaw、QwenPaw、OpenClaw | 历史裁剪破坏提示缓存，且每隔几轮就重复裁剪（ZeroClaw #10674）；缓存写入未按 Anthropic 的溢价费率计费（ZeroClaw #10716）；按会话的成本归属因守护进程级 session UUID 而失效（ZeroClaw #10700）；PDF 指针模式以避免每轮约 25k token 的内联成本（IronClaw #8082）；上下文压缩必须考虑完整提供商请求，并处理活动回合溢出（QwenPaw #7628） |
| **Windows 桌面/客户端健壮性** | Hermes、QwenPaw、OpenClaw | 误报失败的更新验证和 WS 重连循环（Hermes #105145、#94769）；事件循环冻结和控制台 stdin 继承导致的挂起（QwenPaw #7363、#7554）；更新后 Windows 网关无法启动（OpenClaw #137813，已关闭） |
| **技能/插件信任与生命周期** | Hermes、QwenPaw、OpenClaw、IronClaw | 过时的技能索引，附 180 条评论的长讨论串（Hermes #66616）；插件市场更新 UX + 批量更新（QwenPaw PR #7605）；面向记忆/动作/技能的所有者签名责任门控（OpenClaw #96675）；CLI 无法看到运行时安装的技能，从而误导调试方向（IronClaw #8086） |
| **沙箱与安全策略** | ZeroClaw、OpenClaw | 细粒度文件系统沙箱策略在应用层路径准入与 OS 后端之间存在漂移（ZeroClaw #6996）；三个停滞的 `risk:high` 安全 PR 需要作者处理（ZeroClaw #9977、#10241、#10337）；官方插件被密钥库信任检查拒绝（OpenClaw #138342） |

## 5. 差异化分析

| 项目 | 核心定位 | 目标用户 | 架构 / 方法 | 核心焦点 |
|---|---|---|---|---|
| **OpenClaw** | 通用参考级助手（社区/核心） | 自托管用户和运行多通道的高级用户；“默认”智能体网关 | Gateway + task-supervisor + doctor + 工作区同步；在隔离候选状态中预演更新 | 渠道广度和更新安全工程；网关架构的事实参考基准 |
| **Hermes Agent** | 研究实验室出身的助手（Nous Research） | 桌面/TUI 优先的个人操作者；多 profile“机群”管理者 | 桌面应用 + 网关；通过 `GATEWAY_MULTIPLEX_PROFILES` 多路复用 profile；基于 Python 的 cron 任务（`cron/jobs.py`）；Windows PowerShell 更新脚本 | Profile/会话隔离、cron 与自动化工作流（看板、邮件、Discord 语音）、桌面 UX |
| **IronClaw** | 基础设施/扩展平台（Near AI） | 托管 MCP 运营者，以及需要调用方归属的多租户部署 | Rust 单 crate 打包的扩展；托管 MCP 目录发现；SEP-414 归属 | 多租户 MCP 正确性——按调用方目录、扩展打包、提供商捆绑 |
| **QwenPaw** | AgentScope 生态中 Console 优先的助手 | 桌面主流用户，尤其是中文用户；本地模型（llama.cpp）社区 | 类 Electron 的 Console 桌面应用 + CLI；插件市场；可插拔记忆后端（ReMe、OpenViking、ADBPG/PowerContext）；优先兼容 OpenAI 的提供商（含 Zhipu GLM） | 本地化（中/英）、插件/市场 UX、记忆后端生态、本地运行时管理 |
| **ZeroClaw** | 标准/架构驱动的智能体内核 | 开发者与注重安全的运营者；ACP/Codex 和 OpenAI Responses 高级用户 | RFC 驱动的设计流程；运行时拥有的会话、统一附件、细粒度沙箱策略、WASM 插件运行时；zerocode/TUI 客户端；OpenAI Responses/Astra 原生适配器 | 构造即正确的状态所有权、成本/提示缓存精度、沙箱执行 |

**架构差异化，一句话总结：** OpenClaw 靠渠道数量来扩展广度；Hermes 靠桌面机群原语扩展多 profile 隔离能力；QwenPaw 以生态锁定形成差异化（插件市场、记忆后端、面向中国的基础设施）；ZeroClaw 靠设计严谨性和策略控制形成差异化；IronClaw 纯粹以多租户托管 MCP 的正确性竞争。

## 6. 社区势头与成熟度

**第一梯队——工业级规模，在负载下趋稳：** **OpenClaw**。其节奏（24 小时关闭 271 个 PR、窗口期内发布新补丁版本）已经达到公司级成熟项目的水平。风险不在于势头不足，而在于积压深度：285 个开放 issue 和 229 个开放 PR 意味着，即使分流响应及时，长期存在的 P1（多智能体不稳定、子智能体静默丢失）仍会带着 `needs-product-decision` 标签开放长达 6 个月。

**第二梯队——快速迭代、功能先行：** **QwenPaw** 和 **Hermes Agent**。QwenPaw 是同等规模下功能迭代速度最快的项目：beta 版本发布频繁、每天合并 24 个 PR，插件/记忆生态的扩张速度超过其稳定化速度（llama.cpp 回滚、心跳反馈循环）。Hermes 纸面上响应非常快——大多数新 P2 都有对应的修复 PR——但其 Windows 更新器和桌面会话 P1 至今没有可见修复，窗口期内也未发布任何版本，说明其稳定化短板集中在桌面/更新器代码上。

**第三梯队——架构阶段，流程承压：** **ZeroClaw**。高质量的 RFC 工作（运行时拥有的会话、沙箱策略、WASM 运行时）和出色的 bug 关闭纪律（3 个 issue 在提交后 24 小时内关闭）被决策队列瓶颈抵消：47 个开放 PR、多个 `do-not-merge`/停滞的安全 PR，以及为简化 RFC 投票和 PR 评审证据而生的元 RFC。流程本身的扩展性与贡献者速度不匹配。

**第四梯队——专注细分，健康运转：** **IronClaw**。体量最小，但 issue→PR 配对最稳定，窗口期内最老的两个 PR 已被清理（被取代）。它唯一长期存在的 issue（#6778）有正在评审中的按调用方修复——这是刻意限制范围而非停滞的信号。

**按“bug→修复闭环”质量的成熟度排序：** IronClaw ≈ QwenPaw > OpenClaw ≈ Hermes > ZeroClaw。**按架构投入的成熟度排序：** ZeroClaw > OpenClaw > IronClaw > QwenPaw > Hermes。综合成熟度最高的仍是 OpenClaw，但它也是最难重新赢得用户信任的项目。

## 7. 趋势信号

*对 AI 智能体开发者的价值——社区正在告诉我们该构建什么：*

1. **持久化执行是新的差异化关键。** 五个项目中有四个最具破坏力的 bug 类型是**静默丢失**：子智能体结果消失且没有重试/通知（OpenClaw #44925）；回复已持久化却从后续模型上下文中消失（QwenPaw #7579）；失败轮次在切换会话时消失（ZeroClaw #9333）。这意味着：智能体框架需要 outbox/队列语义、幂等的消息持久化，以及明确的“失败——不会重试”提示界面，而不是尽力而为的内存投递。

2. **更新路径是信任边界，而不是构建细节。** 窗口期内每个重要项目都出现了发布链缺陷：验证误报失败（Hermes）、用户托管的运行时被静默回滚（QwenPaw）、更新状态卡死（OpenClaw）。OpenClaw 的隔离状态预演模式正成为新兴的最佳实践；预计同行会跟进。开发者应当把“更新”当作一个面向用户的状态机来对待，具备回滚、迁移检查和如实反映成败的退出码。

3. **上下文/成本经济性是产品功能。** 工具密集型会话破坏提示缓存（ZeroClaw）、约 25k token 的 PDF 每轮重新计费（IronClaw）、缓存写入计费错误（ZeroClaw）——这些都表明 token 开销如今对用户来说与正确性一样醒目。应当构建带滞回机制的缓存感知裁剪器，用指针/文件引用模式替代内联数据块，并从一开始就提供按会话维度的成本台账。

4. **多智能体 = 多主体安全，而不仅仅是并发。** 共享 MCP 服务器上的跨用户工具目录污染（IronClaw #6778）、多路复用下未按 profile 隔离的 MCP 工具集（Hermes #106005）、多智能体编排中的配置覆盖（OpenClaw #43367）、心跳反馈循环（QwenPaw #7589）都指向同一个缺口：**会话、目录和工具的所有权必须按调用方/主体归属**。SEP-414 调用方归属这类标准，正是生态系统演进方向的早期信号。

5. **提供商兼容性是一个移动靶，本地模型是一等公民。** 新模型特性（reasoning effort、steering、不透明的推理状态、异步工具、新的流式字段）会让通用 chat-completions 适配器失灵；而且只要客户端被重构，Ollama/vLLM/Mistral/llama.cpp 的回归就会出现。除非一致性测试套件和回退垫片成为标准项目组件，否则预计一年内维护提供商适配器的成本将超过核心智能体逻辑本身。

6. **桌面/Windows UX 是整个生态中最薄弱的环节。** 误报更新失败、事件循环冻结、stdin 继承导致的挂起、侧边栏不可见、WS 重连循环等问题集中在 Windows/桌面构建上——即便是那些工程能力很强的项目也不例外。对于面向终端用户的智能体开发者来说，桌面可靠性目前是差异化投入产出比最高的方向。

7. **治理功能正从用户侧涌现，而非来自厂商。** 对所有者签名责任门控（OpenClaw #96675）、细粒度沙箱策略（ZeroClaw #6996）、插件密钥库信任（OpenClaw #138342）、官方中国镜像/更新渠道（Hermes #96858）的需求表明，高级用户希望对自己的智能体记忆、行为和分发拥有*控制权和来源可溯性*——这给产品路线图发出了一个信号：默认隐私/安全正在成为选型标准。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-09

## 1. 今日概览

Hermes Agent 经历了一个非常活跃的 24 小时维护周期：50 个 issue 被更新（49 个开放/活跃，1 个关闭），50 个 PR 被更新（45 个开放，5 个合并/关闭）。在此窗口内没有发布任何新版本或候选版本。issue 流主要被桌面/Windows 更新程序验证缺陷、profile 作用域的会话/UI 问题、网关消息投递的边界情况和 provider 兼容性回归所占据。来自 2026-09-08 的多个新 P2/P3 缺陷报告已经有关联的开放修复 PR，说明审查管线响应及时。整体活动量很高，但 Windows 更新和桌面会话状态周边仍然有大量开放的后续缺陷，表明这些领域依然是最大的稳定性风险。

## 2. 发布

本摘要周期内没有发布任何新版本。2026-09-09 没有可用的变更日志、迁移说明或破坏性变更说明。

## 3. 项目进展

- 本期有 5 个 PR 被合并/关闭，不过置顶评论 PR 样本没有展示它们的个体细节。
- 样本中唯一可见的已关闭 issue 是 [桌面 Bot Mode 跟踪 issue #94726](https://github.com/NousResearch/hermes-agent/issues/94726)，维护者重新验证后将接受范围缩小到 4 项 Bot Mode 改进，随后关闭了该 issue。
- 当前推进修复和功能的活跃 PR 包括：
  - [PR #106106 — fix(cron): 当计划类型改变时重新推导重复默认值](https://github.com/NousResearch/hermes-agent/pull/106106)，解决 issue [#106096](https://github.com/NousResearch/hermes-agent/issues/106096)。
  - [PR #106111 — CI public-surface 步骤超时上限](https://github.com/NousResearch/hermes-agent/pull/106111)，修复阻塞性 Windows-footguns CI 超时风险（[#106103](https://github.com/NousResearch/hermes-agent/issues/106103)）。
  - [PR #106018 — 通过 auxiliary custom 分支路由本地 Ollama/vLLM provider 别名](https://github.com/NousResearch/hermes-agent/pull/106018)，修复空密钥本地 Ollama 失败问题（[#106010](https://github.com/NousResearch/hermes-agent/issues/106010)）。
  - [PR #106029 — 让活跃的网关默认 profile 在 desktop fleet 下拉列表中保持可达](https://github.com/NousResearch/hermes-agent/pull/106029)，修复 [#106017](https://github.com/NousResearch/hermes-agent/issues/106017)。
  - [PR #106107 — 在群聊中将 warn 类网关状态重新路由到 home 频道](https://github.com/NousResearch/hermes-agent/pull/106107)。
  - [PR #106112 — 在关闭冲刷恢复时将 flush session_key 解析为 session_id](https://github.com/NousResearch/hermes-agent/pull/106112)。
  - [PR #106110 — 限制 agent 重试处理中的重定向/重建重启退款](https://github.com/NousResearch/hermes-agent/pull/106110)。
  - [PR #105681 — 向原生插件暴露执行作用域的原始消息上下文](https://github.com/NousResearch/hermes-agent/pull/105681)。

## 4. 社区热门话题

- [Issue #66616 — 技能索引过期或退化](https://github.com/NousResearch/hermes-agent/issues/66616)  
  **180 条评论** — 流量最高的 issue。自动新鲜度探针报告 Skills Hub 索引已有 29.8 小时历史，超过了 26 小时的限制。超长的评论串表明这个索引过期问题反复出现，已成为社区对技能可发现性/文档感到沮丧的主要来源。

- [Issue #88584 — 自动化 Nous 集成受阻](https://github.com/NousResearch/hermes-agent/issues/88584)  
  **78 条评论** — `cron/jobs.py` 中计划任务里的 Nous-to-Enterkey 合并冲突持续阻塞自动化集成工作。该问题长期存在说明背后是 cron/工作流层面的可维护性问题，而不是一次性的合并冲突。

- [Issue #105145 — Windows 桌面端驱动的 `hermes update` 在成功更新后报告 FAILED](https://github.com/NousResearch/hermes-agent/issues/105145)  
  **13 条评论，P1** — 仍在活跃使用 Windows 的用户发现更新后的验证过程解析到了错误的工作目录，即使更新成功也产生退出码 8。这是一个对用户信任影响很大的更新程序缺陷。重复 issue 已提交为 [#106097](https://github.com/NousResearch/hermes-agent/issues/106097)。

- [Issue #26277 — 按规范化主题隔离邮件会话](https://github.com/NousResearch/hermes-agent/issues/26277)  
  **11 条评论，2 👍** — 用户期望增加一种可选的邮件网关行为：按规范化主题而非发件人隔离会话。该功能自 5 月以来一直开放，很适合作为未来网关/会话工作的候选。

## 5. 缺陷与稳定性

按优先级和关注度排序：

- **P1 — Windows 更新程序验证在成功更新后使用了错误的工作目录**  
  [Issue #105145](https://github.com/NousResearch/hermes-agent/issues/105145)，重复 issue：[#106097](https://github.com/NousResearch/hermes-agent/issues/106097)。`scripts/desktop-update/windows.ps1` 使用 `cwd=$HERMES_HOME` 而不是安装根目录运行验证，因此每次桌面端驱动的更新都会错误地报告 FAILED。样本中没有直接的修复 PR；相关的受限网络回退工作见 [PR #106036](https://github.com/NousResearch/hermes-agent/pull/106036)。

- **P1 — 桌面 UI 闪烁 / WebSocket 重连循环**  
  [Issue #94769](https://github.com/NousResearch/hermes-agent/issues/94769)。多 profile 桌面环境每 2–5 秒发生一次 WebSocket 重连，在 agent 执行回合期间更严重。该 issue 仍然开放，没有可见的修复 PR。

- **P2 — 更新程序在 HTTP 429 拉取失败后打印成功横幅**  
  [Issue #106026](https://github.com/NousResearch/hermes-agent/issues/106026)。即使拉取步骤被阻止，更新程序也会报告“update complete”；用户希望得到一份诚实的“code unchanged (fetch failed)”回执。

- **P2 — 桌面 Sessions 侧边栏在标记为可见时宽度几乎为零**  
  [Issue #106009](https://github.com/NousResearch/hermes-agent/issues/106009)。`focus_pane` 报告成功，却没有恢复侧边栏，导致导航失效。

- **P2 — 快捷命令技能别名打印“Loading skill”后从不运行**  
  [Issue #106063](https://github.com/NousResearch/hermes-agent/issues/106063)。桌面/TUI worker 会丢弃指向技能的别名，而同一个别名在 Telegram 上可以正常工作。

- **P2 — WhatsApp 引用解析器丢弃短暂消息中的引用文本**  
  [Issue #106066](https://github.com/NousResearch/hermes-agent/issues/106066)。当被引用消息包装在 `ephemeralMessage` 中时，`quotedText` 为空。

- **P2 — 桌面侧边栏显示“No sessions yet”，尽管 `state.db` 中存在匹配会话**  
  [Issue #106003](https://github.com/NousResearch/hermes-agent/issues/106003)。新会话已持久化，却从未在项目列表中显示。

- **P2 — Multiplex profiles: MCP 连接和工具集未按 profile 隔离**  
  [Issue #106005](https://github.com/NousResearch/hermes-agent/issues/106005)。在 `GATEWAY_MULTIPLEX_PROFILES=true` 下，只有第一个 profile 会收到共享 MCP 服务器名称对应的工具。

- **P2 — Discord 语音不活动计时器从不重置**  
  [Issue #105974](https://github.com/NousResearch/hermes-agent/issues/105974)。活跃的双向语音通话在初始超时后会被切断，因为用户语音输入不会重置计时器。

- **P2 — Mistral 自定义 provider 流式传输因新增的 `p` 填充字段而中断**  
  [Issue #106006](https://github.com/NousResearch/hermes-agent/issues/106006)。导致 `'list' object has no attribute 'strip'` 错误，并陷入误判为网络错误的重试循环。

- **P2 — 辅助本地 Ollama provider 抛出“no API key was found”**  
  [Issue #106010](https://github.com/NousResearch/hermes-agent/issues/106010)。这是 auxiliary-client 重构引入的回归；`provider: custom` 仍然可用。修复 PR：[PR #106018](https://github.com/NousResearch/hermes-agent/pull/106018)。

- **P2 — Cron 单次 → 周期计划更新只触发一次即完成**  
  [Issue #106096](https://github.com/NousResearch/hermes-agent/issues/106096)。`update_job` 仍保留 `repeat.times=1`。修复 PR：[PR #106106](https://github.com/NousResearch/hermes-agent/pull/106106)。

- **P2 — CI advisory public-surface 检查可能超时并阻塞 Windows-footguns 任务**  
  [Issue #106103](https://github.com/NousResearch/hermes-agent/issues/106103)。修复 PR：[PR #106111](https://github.com/NousResearch/hermes-agent/pull/106111)。

- **较早的 P2/P3 稳定性债务仍然开放**  
  MCP HTTP 传输清理 `RuntimeError`（[#31987](https://github.com/NousResearch/hermes-agent/issues/31987)）、Ollama 推理模型返回空内容（[#46131](https://github.com/NousResearch/hermes-agent/issues/46131)）、Hermes Link 缺少来自 Web 的同步（[#45709](https://github.com/NousResearch/hermes-agent/issues/45709)），以及 Kanban 重生守卫阻止合法返工（[#62418](https://github.com/NousResearch/hermes-agent/issues/62418)）。

## 6. 功能请求与路线图信号

- **按规范化主题隔离邮件会话**  
  [Issue #26277](https://github.com/NousResearch/hermes-agent/issues/26277) 仍然是样本中获得最多 👍 的功能请求（2 👍，11 条评论）。它与项目目前围绕会话状态清理器展开的工作天然契合，可以作为可选的网关模式发布。

- **在活跃会话期间切换工作目录**  
  [Issue #50195](https://github.com/NousResearch/hermes-agent/issues/50195) 仍然开放，并有社区支持（1 👍）。很可能需要 CLI/TUI/Desktop 在会话状态层面协调修改才能实现。

- **官方中国镜像 / 更新频道**  
  [Issue #96858](https://github.com/NousResearch/hermes-agent/issues/96858) 是一份详细的中文请求，认为官方镜像对大陆用户和项目触达都有好处。对安装/更新基础设施而言，这是一个有用的路线图信号。

- **全量备份可靠性整合与可审计的 dry-run 覆盖**  
  [Issue #105868](https://github.com/NousResearch/hermes-agent/issues/105868) 跟踪的是验证盲区：一个归档文件可能可读但不完整，却仍然返回退出码 0。

- **面向功能的开放 PR**  
  [PR #105681](https://github.com/NousResearch/hermes-agent/pull/105681) 向原生插件暴露执行作用域的原始消息上下文；[PR #102022](https://github.com/NousResearch/hermes-agent/pull/102022) 为本地创建的技能增加可选的 required-author 强制校验（opt-in）；[PR #106083](https://github.com/NousResearch/hermes-agent/pull/106083) 为 Matrix 增加 Beeper 引用回复和表情回应支持。

近期可能的变化：cron 计划类型处理（[#106106](https://github.com/NousResearch/hermes-agent/pull/106106)）、辅助本地 provider 兼容性（[#106018](https://github.com/NousResearch/hermes-agent/pull/106018)）和桌面 profile 下拉列表恢复（[#106029](https://github.com/NousResearch/hermes-agent/pull/106029)）都足够小，应该会出现在下一个补丁/次要版本中。

## 7. 用户反馈摘要

- **虚假的失败报告正在侵蚀 Windows 更新的信任度。** 用户报告更新程序验证使用了错误的 CWD，所以成功安装被显示为硬失败（[#105145](https://github.com/NousResearch/hermes-agent/issues/105145)、[#106097](https://github.com/NousResearch/hermes-agent/issues/106097)）。反过来，HTTP 429 拉取失败时仍会打印完整的成功横幅（[#106026](https://github.com/NousResearch/hermes-agent/issues/106026)）。

- **桌面/会话体验是反复出现的痛点。** 用户报告了不可见的会话侧边栏（[#106009](https://github.com/NousResearch/hermes-agent/issues/106009)）、项目视图中缺失会话（[#106003](https://github.com/NousResearch/hermes-agent/issues/106003)）、fleet 模式下不可达的 profile（[#106017](https://github.com/NousResearch/hermes-agent/issues/106017)），以及使用 `--in DIR` 配合 `--continue --create-if-missing` 时会话未绑定（[#106016](https://github.com/NousResearch/hermes-agent/issues/106016)）。

- **高级用户正在推动正确的 profile/工作区隔离。** 多 profile 环境期望 MCP 工具、终端 CWD/AGENTS.md 注入以及会话状态都限定在活跃 profile 内。当前的回归违反了这一预期（[#106005](https://github.com/NousResearch/hermes-agent/issues/106005)、[#106012](https://github.com/NousResearch/hermes-agent/issues/106012)、[#94769](https://github.com/NousResearch/hermes-agent/issues/94769)）。

- **本地/模型 provider 用户对重构回归很敏感。** Ollama 和 Mistral 自定义环境中出现的空响应或“no API key”错误被报告为“以前还能用”的回归（[#46131](https://github.com/NousResearch/hermes-agent/issues/46131)、[#106010](https://github.com/NousResearch/hermes-agent/issues/106010)、[#106006](https://github.com/NousResearch/hermes-agent/issues/106006)）。

- **国际社区很活跃。** 一位中国用户请求官方镜像频道（[#96858](https://github.com/NousResearch/hermes-agent/issues/96858)），以及多个印尼语文档 PR（[#92192](https://github.com/NousResearch/hermes-agent/pull/92192)、[#93632](https://github.com/NousResearch/hermes-agent/pull/93632)），说明非英语用户和贡献者的参与度正在增长。

## 8. 积压观察

- [Issue #66616 — 技能索引过期或退化](https://github.com/NousResearch/hermes-agent/issues/66616)  
  自 7 月 18 日开放，180 条评论，自动 sweeper 状态为 `degraded`。这是当前最活跃的未解决 issue，需要维护者诊断为什么索引新鲜度持续失败。

- [Issue #88584 — 自动化 Nous 集成受阻](https://github.com/NousResearch/hermes-agent/issues/88584)  
  自 8 月 17 日开放，78 条评论。cron 任务冲突正在阻塞整条自动化集成路径；很可能需要维护者对合并策略或工作流所有权作出决定。

- [Issue #26277 — 按规范化主题隔离邮件会话](https://github.com/NousResearch/hermes-agent/issues/26277)  
  自 5 月 15 日开放，有社区支持，但没有可见的维护者方向或里程碑。

- [Issue #31987 — MCP HTTP 传输清理 RuntimeError](https://github.com/NousResearch/hermes-agent/issues/31987)  
  自 5 月 25 日开放。会导致 StreamableHTTP MCP 服务器出现重连失败循环；与 [PR #95756](https://github.com/NousResearch/hermes-agent/pull/95756) 中正在进行的 MCP/OAuth 安全工作相关。

- [Issue #45709 — Hermes Link 缺少来自 Web 的同步](https://github.com/NousResearch/hermes-agent/issues/45709)  
  自 6 月 13 日开放，没有可见的修复；对跨端会话连续性很重要。

- [Issue #62418 — Kanban dispatcher 的重生守卫阻止合法返工](https://github.com/NousResearch/hermes-agent/issues/62418)  
  自 7 月 11 日开放，1 👍 + 3 条评论。除了手动 claim+spawn 之外没有其他绕过方式，这让 agent 操作人员的工作流自动化走进了死胡同。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-09

## 1. 今日概览

今日相当活跃：过去 24 小时内有 11 个 PR 产生变动（8 个开启，3 个关闭/合并），2 个 issue 被更新且均仍开启。开发重心集中在 hosted-MCP 的多租户正确性上——目录隔离（#8090、#8083）、SEP-414 调用方归属（#8084）、provider 打包（#8089）——以及围绕上下文预算与配置的 agent 循环体验优化。值得注意的是，两个 7 月开启、长期挂起的 PR（#6760、#6759）已被关闭，说明较早的工作正被更干净的重写实现取代，而非就此弃置。本期没有发布新版本。项目健康度看起来不错：同一维护者持续将 issue 报告与修复 PR 配对推进；不过一个与安全相关的 MCP issue（#6778）六周后仍未解决。

## 2. 版本发布

本期无版本发布。

## 3. 项目进展

三个 PR 已关闭/合并（作者均为 kirikov）：

- **[#8083 — fix(extensions): merge discovered hosted-MCP catalogs instead of replacing them](https://github.com/nearai/ironclaw/pull/8083)** — 对应 issue #6778：在 hosted-MCP 服务器根据用户返回不同工具列表的场景中，最后一次发现会删除之前用户的工具。这种合并式修复最终被关闭，转而采用 #8090 中更完整的按调用方修复方案。
- **[#6760 — feat(extensions): bundle the agent-market marketplace extension](https://github.com/nearai/ironclaw/pull/6760)** — 以“形态上被取代，而非意图上被取代”为由关闭；捆绑扩展已改为单一 crate 结构。其意图由 #8089 延续。
- **[#6759 — feat(mcp): SEP-414 `_meta` attribution on outbound hosted-MCP tools/list + tools/call](https://github.com/nearai/ironclaw/pull/6759)** — 因需要 rebase 而关闭，已被更新的 #8084 取代。

总体进展：MCP 多租户隔离与归属方案正在积极迭代，旧方案已被吸收进更扎实的后续开放 PR。

## 4. 社区热点

唯一收到评论（2 条）的事项是：

- **[Issue #6778 — Hosted-MCP: discovered tool catalogs are published per extension id, not per installation — cross-user metadata exposure on multi-principal servers](https://github.com/nearai/ironclaw/issues/6778)**（自 2026-07-28 起开启）

问题根源：hosted-MCP 激活时会以*发起激活的用户*的凭据执行 `tools/list` 发现，然后将结果发布到仅以扩展 ID 为键的共享注册表槽位中。在多主体服务器上，每次发现都会覆盖上一个用户的工具集合，既造成功能性故障，也可能带来跨用户元数据暴露。该 issue 已催生两次修复尝试（#8083 关闭、#8090 开启中），成为当前开发工作明确的焦点。

## 5. 缺陷与稳定性

按严重程度排列：

1. **跨用户工具目录污染 / 元数据暴露（#6778）** — 高。多租户 hosted-MCP 服务器会互相覆盖对方的工具目录，因为发现结果以扩展 ID 为键，而非以安装/用户为键。修复 PR **[#8090](https://github.com/nearai/ironclaw/pull/8090)**（以调用方为键）开启中；中间修复 #8083 已关闭。
2. **运维安装的扩展包可以构建，但无法使用（#8085）** — 中。`from_host_bundled_manifest_with_inline_dynamic_schemas` 与 `validate_consistency` 在哪些清单来源可以携带内联动态描述符 schema 上存在分歧，导致运维安装的包在使用时失败。修复 PR [#8085](https://github.com/nearai/ironclaw/pull/8085) 开启中。
3. **`ironclaw skills list` 无法看到运行时写入的技能（#8086）** — 中/低。由 agent 安装的技能，或属于 CLI 未配置用户的技能，对 CLI 均不可见，会把调试方向带偏。暂无修复 PR。
4. **已设置但为空的环境变量会静默使用默认值（#8088）** — 低/中。`env_or_override` 会把 `FOO=` 当作 `FOO` 未设置处理，因此运维人员在部署关键变量（例如端点覆写）上的一处笔误会静默失败。修复 PR [#8088](https://github.com/nearai/ironclaw/pull/8088) 开启中。

## 6. 功能请求与路线图信号

当前开启中值得注意的功能 PR：

- **[#8084 — Opt-in SEP-414 caller attribution on outbound hosted-MCP calls](https://github.com/nearai/ironclaw/pull/8084)** — 让 hosted-MCP 提供方能够区分对话与重试（目前每个用户共享一个 bearer token）。是 #6759 的直接延续，很可能很快落地。
- **[#8089 — Bundle the agent-market hosted-MCP provider package](https://github.com/nearai/ironclaw/pull/8089)** — 第一方 provider 包，以静态工具声明作为发现前的兜底方案；继承了 #6760 的意图。
- **[#8087 — Make the prompt-context limit an override instead of a constant](https://github.com/nearai/ironclaw/pull/8087)** — 将 prompt-context 限制从常量改为可覆写配置。目前硬编码的 128k `DEFAULT_CONTEXT_LIMIT_TOKENS` 迫使使用更大上下文模型的部署不得不修改源码。
- **[#8082 — Opt-in pointer mode for document text in model context](https://github.com/nearai/ironclaw/pull/8082)** — 解决文档以每份 PDF 约 25k token 被内联进上下文、并且每一轮都要重新计费的问题；指针模式将引用文档而非内联。
- **[#8072 — Telegram Bot API command menu registration at activation](https://github.com/nearai/ironclaw/pull/8072)** — 在激活时通过 `setMyCommands` 注册 `/model`、`/status`、`/new`、`/stop`、`/interrupt`；自 2026-09-04 起等待维护者审查。

对下一版本的预测：按调用方修复 MCP 目录的 #8090 与 SEP-414 归属方案 #8084 最为成熟，并且能直接关闭该项目悬置最久的 issue；上下文预算类功能（#8082、#8087）回应了用户反复提出的成本抱怨，可能在同一版本或下一版本跟进。

## 7. 用户反馈摘要

在各 issue 与 PR 中表达出的真实痛点：

- **多租户 MCP 隔离在实践中已失效** — 在共享 hosted-MCP 服务器上，用户会悄悄覆盖彼此的工具，注册表结构也存在跨用户元数据暴露风险（#6778）。这是最清晰也最迫切的抱怨。
- **技能的调试体验令人困惑** — 运行时确实安装了的技能，在 CLI 中却显示为空列表，把用户引向错误的调试路径（#8086）。
- **上下文预算被悄悄耗尽** — 附上 2–3 份 PDF（每份约 25k token）后，任何实际工作开始前模型预算就已耗尽，且每个轮次都会重复消耗（#8082）。
- **配置不灵活且暗藏陷阱** — 硬编码的 128k 上下文限制迫使部署方 fork 源码（#8087）；空字符串环境变量会静默回退到默认值（#8088）。
- **扩展打包行为不一致** — 运维安装的包能构建成功却无法使用，破坏了运维工作流（#8085）。

满意度反馈好坏参半：维护者的响应很快（新 issue 当天就会出现修复 PR），但 MCP 多租户与上下文成本方面反复出现的摩擦表明，这些领域需要更深入的架构性投入。

## 8. 积压事项观察

- **[Issue #6778 — Hosted-MCP per-extension catalog keying](https://github.com/nearai/ironclaw/issues/6778)** — 自 2026-07-28 起开启，是悬置最久的开放 issue；已有两次修复尝试，按调用方修复的 #8090 需要合入并通过验证。
- **[Issue #8086 — `ironclaw skills list` visibility gap](https://github.com/nearai/ironclaw/issues/8086)** — 新 issue（2026-09-08），无评论、未指派、尚无修复 PR；需要维护者分诊处理。
- **[PR #8072 — Telegram Bot API command menu](https://github.com/nearai/ironclaw/pull/8072)** — 自 2026-09-04 开启，无维护者评论；仍在等待首次审查。

除上述事项外，积压清单整体健康：另外两个 7 月遗留事项（#6760、#6759）刚刚关闭，表明维护者正在积极清理较早的工作。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-09

## 1. 今日概览

QwenPaw 正处于高度活跃的维护与功能开发周期。在过去 24 小时内，30 个 issue 有更新（15 个开启/活跃，15 个已关闭），45 个 PR 有动态（21 个开启，24 个已合并/关闭），体现出持续的贡献者活跃度。新的测试版 **v2.2.1-beta.1** 已发布，新增了智能体模型路由设置，并修复了聊天流式传输问题。项目继续展现出强劲的社区参与度，尤其是在 Windows 控制台行为、工具结果负载处理、MCP 协议兼容性以及聊天队列可靠性方面。针对 v2.2.0 报告的若干回归问题，也已有开启中的后续 PR 在处理。

---

## 2. 版本发布

### v2.2.1-beta.1

来源：[QwenPaw v2.2.1-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.1)

包含的变更：
- **feat: 新增智能体模型路由设置** by @zhaozhuang521 — [PR #7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)
- **docs: 更新网站至 v2.2.0** by @cuiyuebing — [PR #7517](https://github.com/agentscope-ai/QwenPaw/pull/7517)
- **fix(chat): 在流式传输期间同步已解析的会话** by @zhaozh…

本次发布说明中未包含破坏性变更或迁移说明。这是测试版，因此用户应预期接下来会有迭代式的稳定性改进。

---

## 3. 项目进展

过去 24 小时合并/关闭的 PR 包含多项针对性修复与 UI/UX 改进：

- **Hub CLI 认证修复** — [`qwenpaw agents list` 现在可在 Hub 本地沙箱内完成认证](https://github.com/agentscope-ai/QwenPaw/pull/7631)。
- **MCP 旧版回退修复** — [旧版握手现在可对 401 发现探测进行仲裁](https://github.com/agentscope-ai/QwenPaw/pull/7627)，解决了此前误报“需要 OAuth”的问题。
- **控制台聊天队列强制执行** — [聊天提交不再能绕过运行中任务的队列](https://github.com/agentscope-ai/QwenPaw/pull/7610)，修复了用户报告的 409 错误工作流。
- **针对纯文本模型的 PDF 块处理** — [PR #7621](https://github.com/agentscope-ai/QwenPaw/pull/7621) 已关闭；更完善的后续修复 [PR #7636](https://github.com/agentscope-ai/QwenPaw/pull/7636) 会在所有 OpenAI 兼容的 chat-completions 请求中剥离 PDF 块。
- **Windows shell 标准输入修复** — [子进程不再继承控制台标准输入](https://github.com/agentscope-ai/QwenPaw/pull/7598)，修复了命令从标准输入读取所导致的挂起问题。
- **控制台侧边栏重新设计** — [重新设计的侧边栏与设置体验](https://github.com/agentscope-ai/QwenPaw/pull/7502)已合并到控制台。
- **插件管理器改进** — [PR #7605](https://github.com/agentscope-ai/QwenPaw/pull/7605) 已关闭；它保留了市场上下文、可检测可用更新，并新增一键/批量更新支持。
- **智能体看板本地化** — [新增中英文本地化](https://github.com/agentscope-ai/QwenPaw/pull/7482)。

其他值得注意的进行中工作：
- **QwenPaw-Data 应用 0.3.0 集成** — [PR #7637](https://github.com/agentscope-ai/QwenPaw/pull/7637) 将 QwenPaw-Data 集成为分析引擎，并内嵌通过评审的 QPD Data Console。
- **Requesty 提供商** — [PR #7638](https://github.com/agentscope-ai/QwenPaw/pull/7638) 将 Requesty 添加为 OpenAI 兼容的提供商。
- **会话级模型覆盖** — [PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) 仍在评审中。
- **OpenViking 长时记忆后端** — [PR #7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) 正在评审中。
- **滚动历史完整性优化** — [PR #7639](https://github.com/agentscope-ai/QwenPaw/pull/7639) 避免重复执行 `PRAGMA quick_check` 扫描。

---

## 4. 社区热点

讨论最活跃的 issue 同时反映了平台级缺陷与用户痛点：

- **[Issue #7579 — 模型回复意外从上下文中消失](https://github.com/agentscope-ai/QwenPaw/issues/7579)** — 8 条评论。已持久化的回复在后续请求中消失；模型“看不到自己刚说过的消息”，最终导致空响应。该问题对记忆一致性来说影响重大，且严重损害用户信任。
- **[Issue #7597 — 工具返回的图片/PDF 二进制被当作裸 base64 发送](https://github.com/agentscope-ai/QwenPaw/issues/7597)** — 6 条评论。会触发 `400 "file must have a file_id or file_data"`；已关闭，但本质上与进行中的 PDF 块处理工作相关。
- **[Issue #7559 — 任务执行期间发送消息触发 409](https://github.com/agentscope-ai/QwenPaw/issues/7559)** — 5 条评论。在通过 [PR #7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) 恢复队列路由行为后关闭。
- **[Issue #7363 — 同步调用冻结事件循环且超时永不触发](https://github.com/agentscope-ai/QwenPaw/issues/7363)** — 5 条评论。Windows 桌面版在启动和发送消息时会无响应约 2 分钟。
- **[Issue #7469 — ReMe 后台嵌入/索引任务失败](https://github.com/agentscope-ai/QwenPaw/issues/7469)** — 5 条评论。已关闭；OpenAI 兼容的嵌入后端故障会静默禁用新记忆。
- **[Issue #7589 — 心跳 cron 任务会话反馈循环](https://github.com/agentscope-ai/QwenPaw/issues/7589)** — 4 条评论。重复消息堆积导致智能体约 2 小时无响应；被标记为高严重性。
- **[Issue #7620 — MCP streamable-http 401 掩盖旧版回退](https://github.com/agentscope-ai/QwenPaw/issues/7620)** — 3 条评论。通过 [PR #7627](https://github.com/agentscope-ai/QwenPaw/pull/7627) 关闭。

获赞最多的讨论：**[Issue #7615 — 在哪里询问第三方插件/技能/部署相关问题](https://github.com/agentscope-ai/QwenPaw/issues/7615)** — 3 个 👍，表明社区希望在插件/技能市场周围有更清晰的支持渠道。

---

## 5. 缺陷与稳定性

以下 issue 在过去 24 小时内处于活跃/已关闭状态，按严重性排列：

| 严重性 | Issue | 描述 | 状态 / 修复 |
|---|---|---|---|
| **高** | [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) | llama.cpp 版本格式解析器无法解析新的 5 位构建号；`has_update` 误报有可用更新，并**静默将用户手动升级的运行时回滚**到较旧的快照。 | 开启 |
| **高** | [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) | 心跳 cron 任务会话反馈循环造成重复消息堆积；智能体约 2 小时无响应。 | 开启 |
| **高** | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) | 助手回复已持久化，但在后续请求中缺失；模型看到空上下文并返回空响应。 | 开启 |
| **高** | [#7625](https://github.com/agentscope-ai/QwenPaw/issues/7625) | 后台/异步工具调用完成后，Gemini 返回 `400 "Requests ending with a model turn are not supported"`。 | 开启 |
| **中** | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | 同步调用阻塞 Windows 桌面版事件循环；超时永不触发，导致界面卡死 118–135 秒。 | 开启 |
| **中** | [#7607](https://github.com/agentscope-ai/QwenPaw/issues/7607) | Cursor ACP Runner 的扩展方法处理违反了 JSON-RPC 协议，导致 `WritableIterable is closed` 流崩溃。 | 开启 |
| **中** | [#7619](https://github.com/agentscope-ai/QwenPaw/issues/7619) | 在 Windows 11 上，v2.2.0 + qwen-35B-A3B-FP8 的对话会意外结束。 | 开启 |
| **中** | [#7634](https://github.com/agentscope-ai/QwenPaw/issues/7634) | 当多个技能同名时，ClawHub 技能安装失败。 | 开启 |
| **中** | [#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622) | 后台页面中的对话框变为透明；v2.2.0 中模态遮罩层未渲染。 | 开启 |
| **中** | [#7630](https://github.com/agentscope-ai/QwenPaw/issues/7630) | 没有禁用 CPU 基线检测的选项；VM/云桌面用户无法启动 QwenPaw。 | 开启 |
| **低** | [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617) | 会话历史中的 PDF `DataBlock` 会永久破坏纯文本 OpenAI 兼容端点（Zhipu GLM）的可用性。已关闭；后续修复 [#7636](https://github.com/agentscope-ai/QwenPaw/pull/7636) 处于开启状态。 | 已关闭 + 修复 PR |
| **低** | [#7620](https://github.com/agentscope-ai/QwenPaw/issues/7620) | MCP 服务器返回的不合规 HTTP 401 会误导用户认为“需要 OAuth”，并阻塞旧版回退。 | 通过 [#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627) 关闭 |
| **低** | [#7612](https://github.com/agentscope-ai/QwenPaw/issues/7612) | 由于缺少运行时边界令牌，内置 CLI 命令在 Hub 本地沙箱内执行失败。 | 通过 [#7631](https://github.com/agentscope-ai/QwenPaw/pull/7631) 关闭 |
| **低** | [#7554](https://github.com/agentscope-ai/QwenPaw/issues/7554) | 在 Windows 上，shell 子进程会继承控制台标准输入；从标准输入读取的命令会挂起，且无法通过 Ctrl+C 终止。 | 通过 [#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598) 关闭 |

---

## 6. 功能请求与路线图信号

多项用户请求的功能已体现在已合并或开启的 PR 中：

- **插件市场 UX 全面改造** — [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) 请求支持更新通知、批量更新以及保留商店上下文。已在 [PR #7605](https://github.com/agentscope-ai/QwenPaw/pull/7605) 中实现。
- **未知斜杠命令反馈** — [#7479](https://github.com/agentscope-ai/QwenPaw/issues/7479) 希望像 `/mew` 这样拼写错误的命令能得到本地反馈，而不是被转发给智能体。已由开启中的 [PR #7632](https://github.com/agentscope-ai/QwenPaw/pull/7632) 处理。
- **上下文压缩预算感知** — [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) 请求压缩时考虑完整的提供商请求，而不只是可见的会话内容，并安全处理当前轮次溢出。这很可能在即将发布的 2.2.x 版本中被采纳。
- **AgentScope 社区集成** — [#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583) 请求在控制台中提供社区登录、收件箱和快速反馈闭环。这是一个周期更长的产品/社区功能。
- **禁用 CPU 基线检测** — [#7630](https://github.com/agentscope-ai/QwenPaw/issues/7630) 是针对 VM/云桌面环境的实际部署需求。
- **产物显示位置** — [#7553](https://github.com/agentscope-ai/QwenPaw/issues/7553) 希望产物显示在每条消息的时间戳上方，而不是折叠在已完成的步骤中。
- **记忆后端生态发展** — 针对 OpenViking 记忆后端（[#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613)）、ADBPG/PowerContext 的记忆后端插件迁移（[#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616)）、技能版本化与依赖校验（[#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609)）的开启中 PR 表明，平台正朝着可插拔的记忆与技能架构演进。
- **会话级模型覆盖** — 悬置已久的 [PR #5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) 将允许每个对话使用不同的 LLM；它仍是未来版本的候选功能。

---

## 7. 用户反馈摘要

真实用户的痛点主要集中在**会话历史完整性**、**聊天可重入性**、**工具结果负载兼容性**和**后台静默失败**上：

- 模型上下文丢失助手回复的问题（[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)）尤其令用户警惕，因为即使回复已经持久化，模型的后续请求也看不到它们。
- 心跳 cron 任务反馈循环（[#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589)）被认为影响巨大，因为智能体会长时间无响应，且缺少明确的恢复途径。
- 手动升级的 llama.cpp 二进制被静默回滚（[#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633)）会对本地模型重度用户造成信任问题。
- 桌面/Windows 用户持续报告卡死问题：队列 409（[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)）、事件循环冻结（[#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)）以及控制台标准输入卡死（[#7554](https://github.com/agentscope-ai/QwenPaw/issues/7554)）。
- 使用 OpenAI 兼容纯文本端点的用户，一旦 PDF/图片块进入历史记录，便会直接不可用（[#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597)、[#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617)）。
- 中文用户经常请求更简洁的管理流程：插件批量更新（[#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582)）、更合理的产物展示位置（[#7553](https://github.com/agentscope-ai/QwenPaw/issues/7553)）以及社区集成（[#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583)）。
- 总体而言，issue 反映出强烈的热情和广泛的真实部署场景，但也同时揭示出当前主要的稳定性挑战在于**边缘场景的鲁棒性**——尤其是在多模态数据、记忆后端和运行时进程方面。

---

## 8. 待办积压观察

以下项目已开启较长时间，可能需要维护者关注：

- **[Issue #7363 — 同步调用冻结事件循环且超时永不触发](https://github.com/agentscope-ai/QwenPaw/issues/7363)** — 自 2026-08-27 开启，5 条评论，Windows 桌面版响应问题。尚无关联的修复 PR。
- **[PR #5992 — 会话级模型覆盖](https://github.com/agentscope-ai/QwenPaw/pull/5992)** — 自 2026-07-12 开启，评审中，贡献者为首次贡献者；需要仔细的设计评审，但具有很高的路线图价值。
- **[PR #6399 — ReMeLightMemoryCard 的 Reranker UI 配置面板](https://github.com/agentscope-ai/QwenPaw/pull/6399)** — 自 2026-07-23 开启，评审中；它与 Reranker 后端互补，但似乎在等待维护者投入精力。
- **[PR #7427 — Creator 前端依赖漏洞](https://github.com/agentscope-ai/QwenPaw/pull/7427)** — 自 2026-08-31 开启；这是与安全相关的维护工作（React Router DOM、Nano ID、PostCSS、Undici），不应久拖。
- **[Issue #7583 — AgentScope 社区登录/收件箱/反馈](https://github.com/agentscope-ai/QwenPaw/issues/7583)** — 自 2026-09-06 开启，2 条评论；可能是一个产品方向信号，但需要维护者回应或添加路线图标签。
- **[PR #7613 — OpenViking 长时记忆后端](https://github.com/agentscope-ai/QwenPaw/pull/7613)** — 自 2026-09-07 开启，评审中，首次贡献者；记忆后端生态显然在快速扩展，因此投入评审时间非常有价值。

---

**项目整体健康状况：** 项目活跃度高、发布节奏稳健，许多报告从 issue 到 PR 的响应速度很快。主要风险领域在于**后台/运行时边缘场景的稳定性**（记忆索引、心跳、子进程、本地模型二进制），而非功能迭代速度。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目简报 — 2026-09-09

## 1. 今日概览
ZeroClaw 正处于持续的架构加固阶段：在截至 2026-09-09 的 24 小时窗口内，26 个 issue 和 50 个 PR 有更新，**未发布新版本**。设计/RFC 工作（运行时拥有的会话、统一的文件/附件处理、沙箱策略、WASM 插件运行时）占据了评论最多的条目，同时源源不断的 bug 报告和小规模修复集中在成本核算、提示缓存效率和渠道/提供商边界情况上。三个 PR 被关闭——两个小型定向修复，以及一个 XL 分支在开启当天无人回应即被关闭。项目健康状况活跃但紧张：47 个 PR 仍处于开启状态，许多标记为 `needs-author-action` 或 `needs-maintainer-review`，RFC 继续在维护者决策队列中积压。

## 2. 发布
此窗口期内**无新版本发布**。issue 报告中最常引用的面向用户的版本为 v0.8.5（参见 [#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)）。

## 3. 项目进展
窗口期内有三个 PR 被关闭/合并（GitHub 标签不区分已合并与未合并关闭）：

- **[#10718 — feat(cost): attribute ledger records to the chat conversation](https://github.com/zeroclaw-labs/zeroclaw/pull/10718)**（`size:S`，2026-09-08 关闭）。修复了 [#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700) 中账本归属的一半问题；维护者注释明确指出这仅是*部分*覆盖，追踪关联仍然悬而未决。
- **[#10719 — fix(providers): preserve tool image references through normalization](https://github.com/zeroclaw-labs/zeroclaw/pull/10719)**（`size:S`，2026-09-08 关闭）。在将工具图像转换为提供商负载时，保留原始图像路径/URL 作为 `Image reference:` 文本，使代理在归一化后仍能传递图像。
- **[#10717 — Feat/native security and helpers v2](https://github.com/zeroclaw-labs/zeroclaw/pull/10717)**（`size:XL`，2026-09-08 创建并关闭）。正文为未填写的占位符，没有变更描述或影响范围说明；这看起来是分支清理或误创建的 PR，而非实际落地的功能。

与关闭相邻的进展：**[#10716 — feat(cost): price cache writes at the configured write premium](https://github.com/zeroclaw-labs/zeroclaw/pull/10716)**（开启，`size:M`）是 #10718 的配套 PR，将修正 Anthropic 缓存写入定价（1.25x/2x 输入费率）；除窗口期更新外无新增活动。

## 4. 社区热门话题
按评论数排序的最活跃条目（均为 issue；此导出中无 PR 评论数据，且所有条目均无回应表情）：

- **[#9487 — RFC: Runtime-owned conversation sessions and transport surface adapters](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** — 35 条评论。现已到修订版 5，使修订版 4 的投票快照失效；维护者必须开启新的讨论窗口。这是关于对话状态在渠道（ACP、Telegram、Web）增多时应归属何处的核心开放问题。
- **[#9488 — RFC: Unified file and attachment architecture for conversation surfaces](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** — 28 条评论，修订版 10。与 #9487 紧密耦合；两者均由 Codex 起草并由同一作者提交。
- **[#6996 — RFC: Granular sandbox policy - filesystem restrictions](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — 26 条评论，自 2026-05-28 起 `in-progress`。解决应用层路径准入与操作系统沙箱后端（Bubblewrap/Landlock/Seatbelt）之间的偏差。
- **[#8692 — [Tracker]: Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 15 条评论。积压本身现在被作为一个 issue 来跟踪，表明 RFC 流程是主要瓶颈。
- **[#10076 — RFC: Composable WASM plugin runtime architecture](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)** — 11 条评论。修订版 1（2026-09-01）将会话历史问题委派给 #10526。
- **[#5514 — [Bug]: batch Telegram media groups into one multimodal turn](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)** — 7 条评论，自 4 月起 `in-progress`。
- **[#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366)、[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)、[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)、[#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** — 各 5–6 条评论。

**潜在需求：** ZeroClaw 社区——以维护者和主要贡献者为主导——正在公开 RFC 中积极重构状态所有权、文件处理和沙箱机制，而像 [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)（"简化 RFC 投票"）和 [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366)（"澄清 PR 评审证据"）这样的元 RFC 表明流程摩擦已在内部被感知。

## 5. 缺陷与稳定性
按严重程度排序的缺陷及其修复状态：

**S1 / 高风险**
- **[#10674 — History trimming stops at the cap, so tool-heavy sessions re-trim every few turns and defeat prompt caching](https://github.com/zeroclaw-labs/zeroclaw/issues/10674)** — 2026-09-07 提交，`p1`、`accepted`、`risk:high`。整轮修剪使历史记录恰好低于 `max_history_messages`，导致重复修剪并破坏 Anthropic/兼容提供商的提示缓存。尚无修复 PR。
- **[#9333 — Failed ACP turns disappear after switching sessions](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** — `p1`、`S1`，自 2026-07-24 起 `in-progress` 但仍在更新；对 Code/ACP 用户构成工作流阻塞。
- **[#10670 — heartbeat.target rejects a channel instance composite key (`<type>.<alias>`)](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)** — S1，在窗口期内提交并**关闭**。

**S2 / 中风险**
- **[#10667 — ZeroCode can duplicate a streamed response when prompt completion precedes TurnComplete](https://github.com/zeroclaw-labs/zeroclaw/issues/10667)** — `p2`、`in-progress`；zerocode/TUI 中转录条目重复。
- **[#10688 — WhatsApp Web voice notes are never transcribed](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)** — v0.8.5 上的 S2；渠道构建时未包含代理的转录提供商。**已关闭。**

**S3 / 轻微**
- **[#10326 — Reliable streaming errors report the requested model instead of the served pinned model](https://github.com/zeroclaw-labs/zeroclaw/issues/10326)** — **已关闭。**
- **[#10702 — Token-budget history trimming stops at the first turn boundary that fits (same hysteresis gap as the message cap)](https://github.com/zeroclaw-labs/zeroclaw/issues/10702)** — `p3`，是 #10674 的姊妹问题；无修复 PR。

**带修复的成本核算缺陷：** [#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700)（`p2`）— `CostTracker.session_id` 是守护进程生命周期的 UUID，因此无法按对话区分支出。PR [#10718](https://github.com/zeroclaw-labs/zeroclaw/pull/10718)（已关闭）修复了账本归属；追踪关联仍然悬而未决。

**仍开启的遗留缺陷：** [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram 媒体组每张图片触发一次 LLM 请求，而非单次多模态轮次；自 2026-04-08 起 `in-progress`。

除上述 WhatsApp v0.8.5 转录问题外，未发现涉及已发布版本的回归。

## 6. 功能请求与路线图信号
最清晰的路线图信号是**六项 OpenAI Responses / Astra 提供商功能的协同集中提交**，均由 IftekharUddin 于 2026-09-07 提交，且均未分诊（0 条评论）：

- [#10704 — Support asynchronous function tools with OpenAI Responses](https://github.com/zeroclaw-labs/zeroclaw/issues/10704)
- [#10705 — Support max reasoning effort for compatible OpenAI models](https://github.com/zeroclaw-labs/zeroclaw/issues/10705)（引用 GPT-6 Astra 文档中的 `max` 级别）
- [#10706 — Preserve opaque reasoning state across OpenAI Responses call paths](https://github.com/zeroclaw-labs/zeroclaw/issues/10706)
- [#10707 — Support bounded programmatic tool calling through OpenAI Responses](https://github.com/zeroclaw-labs/zeroclaw/issues/10707)
- [#10708 — Support active-response steering on OpenAI Responses WebSockets](https://github.com/zeroclaw-labs/zeroclaw/issues/10708)
- [#10709 — [Docs]: Document Astra setup for API-key and Codex subscription providers](https://github.com/zeroclaw-labs/zeroclaw/issues/10709)

这些读起来像是一个连贯的工作流：将原生 OpenAI Responses 适配器提升到与成熟的 Anthropic/兼容提供商同等水平（推理状态、转向、异步/编程式工具），然后编写文档。如果维护者将它们作为一个 epic 接纳，它们很可能是下一个次要版本的候选。

其他收到的请求：
- **[#10715 — Opt-in passive group context for Telegram group chats](https://github.com/zeroclaw-labs/zeroclaw/issues/10715)**（09-08 提交）。请求 Telegram 版的 WhatsApp Web `passive_group_context` 功能（#8379/#8389）。
- **[#10641 — [Feature] [Web]: Per-field cron schedule input](https://github.com/zeroclaw-labs/zeroclaw/issues/10641)** — `status:accepted`，为 cron 模态框添加客户端校验和人类可读确认；可能很快发布。
- **[#9727 — Epic: run and monitor multiple agents from a zerocode sidebar](https://github.com/zeroclaw-labs/zeroclaw/issues/9727)** — `in-progress`、`risk:high`。

仍在评审中的路线图塑造型 RFC：[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)（会话所有权）、[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)（附件）、[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)（沙箱策略）、[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)（仅追加会话历史）。这些属于架构层面的变更，将跨越未来多个版本落地而非集中在一个版本中。

## 7. 用户反馈摘要
本窗口期内表达的具体痛点：

- **按对话的成本可见性已损坏。** 用户无法按聊天区分支出，因为每条 `costs.jsonl` 记录共享同一个守护进程生命周期会话 ID（[#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700)）；部分修复于同日落地（[#10718](https://github.com/zeroclaw-labs/zeroclaw/pull/10718)）。
- **提供商账单虚高。** 工具密集型会话每隔几轮就重新修剪历史，破坏提示缓存（[#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674)），且缓存写入未按 Anthropic 的溢价费率计费（[#10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716)）。用户实际上为 token 付了两次钱。
- **ACP 上阻塞工作流的转录丢失。** 切换会话时，失败的轮次从实时转录中消失（[#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)）。
- **渠道缺口令用户沮丧：** WhatsApp Web 语音留言在 v0.8.5 上从不被转录（[#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)，已关闭）、Telegram 相册产生多条回复而非单次多模态轮次（[#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)）、心跳配置拒绝有效的非默认渠道实例键（[#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)，已关闭）。
- **zerocode UI 信任问题：** 即使持久化中只包含一条消息，流式响应也可能被渲染两次（[#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667)）。
- **高级用户希望 Astra/OpenAI Responses 在推理强度、转向、工具调用和异步执行方面达到同等水平**（[#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704)–[#10708](https://github.com/zeroclaw-labs/zeroclaw/issues/10708)）。

满意度信号是间接但正面的：维护者队列明显在运转（三个 bug 在提交后 24 小时内关闭，两个修复 PR 落地），长期运行的 RFC 正通过修订收敛而非停滞。

## 8. 积压观察
需要维护者关注或等待最久的条目：

- **[#6996 — RFC: Granular sandbox policy](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — 自 2026-05-28 开启（约 3.5 个月），26 条评论，`in-progress` 但仍为 `needs-maintainer-review`。最古老的未解决安全 RFC。
- **[#5514 — Telegram media groups bug](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)** — 自 2026-04-08 开启（约 5 个月），`in-progress` 但无修复 PR 关联。
- **[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) / [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** — 自 2026-07-28 开启，两个评论数最高的 RFC，修订使先前投票失效后均在等待新的维护者决策窗口。决策队列跟踪器为 [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)。
- **停滞不前的安全关键 PR，需要作者行动：**
  - [#9977 — fix(tools): confine filesystem mutations to workspace](https://github.com/zeroclaw-labs/zeroclaw/pull/9977) — `risk:high`、`size:XL`，自 8 月起 `needs-author-action`。
  - [#10241 — fix(channels): restore supervised shell approval routing](https://github.com/zeroclaw-labs/zeroclaw/pull/10241) — `risk:high`、`needs-author-action`；跨所有渠道的横切安全修复。
  - [#10337 — fix(tools): honor allowed roots for git operations](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) — `risk:high`、`needs-author-action`。
  - [#9819 — fix(multimodal): pixel-level image validation](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) — `risk:high`、`needs-author-action`。
- **标记为禁止合并/受阻的 PR：** [#9109 — native Hailo-Ollama support](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)（`do-not-merge`，自 07-17 起）和 [#9212 — gate CI on replay regression suite](https://github.com/zeroclaw-labs/zeroclaw/pull/9212)（`blocked`、`do-not-merge`，自 07-20 起）。两者都代表已完成的工作，但在维护者解决阻塞问题之前无法落地。
- **未评审的功能集群：** 六项 OpenAI Responses/Astra 条目（[#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704)–[#10709](https://github.com/zeroclaw-labs/zeroclaw/issues/10709)）均未分诊且零评论；需要维护者确认或合并范围，以免变得过时。

**整体健康评估：** 高贡献者活跃度和真正的架构投入，配合运转良好的 bug 关闭循环（24 小时内关闭 3 个 bug）。主要风险在于队列深度——47 个开启的 PR 和不断增长的 RFC 决策积压——以及设计工作集中在少数具名维护者/主要贡献者手中。

---

规则：
- 仅输出翻译文本。不要前言、不要解释、不要在整个输出周围加 markdown 围栏。
- 精确保留 Markdown 结构：标题、表格（包括列对齐行）、列表、引用块、粗体/斜体、水平线、表情符号。
- 逐字保留 URL、链接目标、代码跨度、代码块、数字和日期。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*