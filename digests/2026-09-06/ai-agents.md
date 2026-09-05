# OpenClaw 生态日报 2026-09-06

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-05 22:45 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-06

## 1. 今日概览

OpenClaw 的活跃度很高：过去 24 小时内有 **500 个 issue** 和 **500 个 PR** 被更新（435 个 issue 仍未关闭，65 个已关闭；297 个 PR 仍未关闭，203 个已合并/关闭）。新发布了一个版本（**v2026.9.2**），重点是在处理长会话记录和磁盘密集型工作时，让聊天、仪表盘和会话交互保持响应，并将持久化历史读取移出 Gateway 事件循环。问题追踪器以 ClawSweeper 自动分诊的可靠性 bug 为主，集中在**会话状态完整性、消息丢失、认证/提供方故障转移**上；长期未决的 P0/P1 项已经形成严重积压。PR 队列也能看出维护者的处理吞吐：一大批修复（其中许多由 steipete 提交）正在等待审查或验证，说明评审管线活跃但已相当紧张。

## 2. 版本发布

**v2026.9.2** — `openclaw 2026.9.2`

**亮点：** 更快、响应更灵敏的聊天体验：在处理长会话记录和磁盘密集型工作时，聊天、仪表盘和会话交互仍能保持响应；支持仪表盘直接查询、减少冷加载工作，并将持久化历史读取移出 Gateway 事件循环。（参见 [#136862](https://github.com/openclaw/openclaw/issues/136862)、[#138…](https://github.com/openclaw/openclaw/issues/138…) —— 源数据中已截断）

发布数据中未包含破坏性变更或迁移说明。

## 3. 项目进展

本窗口期内 203 个 PR 被合并/关闭，65 个 issue 被关闭。正在积极推进的领域：

- **会话/记录持久性** — PR [#139439](https://github.com/openclaw/openclaw/pull/139439)：当一次运行在回复前失败时，在会话记录中写入一条提示；PR [#139469](https://github.com/openclaw/openclaw/pull/139469)：避免会话回收期间出现 SQLite `database is locked` 错误；PR [#119162](https://github.com/openclaw/openclaw/pull/119162)：当部分 payload 投递失败时，保留待处理的最终投递标记。
- **云/远程会话编排** — PR [#138900](https://github.com/openclaw/openclaw/pull/138900)（XL）：无需在本地检出 Gateway 即可启动云会话；PR [#139455](https://github.com/openclaw/openclaw/pull/139455)（已关闭）：让 worker 供应流程在 Gateway 重启后仍可恢复。
- **Gateway/配置韧性** — PR [#137713](https://github.com/openclaw/openclaw/pull/137713)：当 Doctor 前缀恢复失败时保留配置；PR [#139409](https://github.com/openclaw/openclaw/pull/139409)：在“运行失败”的提示文案中暴露 Gateway 存储故障。
- **频道与通知** — PR [#139456](https://github.com/openclaw/openclaw/pull/139456)：恢复 Discord/Slack 上子代理的原生进度显示，并暂停不活跃卡片的更新；PR [#139292](https://github.com/openclaw/openclaw/pull/139292)：在并发的 Telegram 论坛主题中保留“正在输入”指示器。
- **UI/UX** — PR [#139371](https://github.com/openclaw/openclaw/pull/139371)（已关闭）：在子代理会话记录中隐藏作者头像；PR [#136736](https://github.com/openclaw/openclaw/pull/136736)：在多智能体资料页 hero 区显示主用户；PR [#139372](https://github.com/openclaw/openclaw/pull/139372)：保持活动标签可见。
- **平台/基础设施** — PR [#138199](https://github.com/openclaw/openclaw/pull/138199)：在 34 个 manifest 绑定中刷新 25 个兼容 npm 依赖；PR [#137893](https://github.com/openclaw/openclaw/pull/137893)：为旧版 fs-safe 包的导出提供 Docker 支持。
- **新能力** — PR [#139466](https://github.com/openclaw/openclaw/pull/139466)：从 macOS 应用中一键完成 Chrome 扩展设置。
- **性能** — PR [#139476](https://github.com/openclaw/openclaw/pull/139476)：错误摘要投影在输出第一行后即停止；PR [#124632](https://github.com/openclaw/openclaw/pull/124632)：在近似 token 估算中排除推理回放字段。

## 4. 社区热门话题

评论互动最多的未关闭 issue：

- **[#38327 — google-vertex/gemini-3.1-pro-preview 上出现 `[Bug] "Cannot convert undefined or null to object"`](https://github.com/openclaw/openclaw/issues/38327)** — 15 条评论，3 👍 · 3 月版本引入的 P0 回归；既是严重级别最高的 bug，也是评论数最高的问题。用户似乎已被这个认证/提供方回归问题卡住数月。
- **[#69208 — 总括：跨频道的重复消息记录、回放与上下文组装问题](https://github.com/openclaw/openclaw/issues/69208)** — 14 条评论 · P1。该问题横跨 MSTeams、webchat、Telegram、followup 队列和投递镜像（delivery-mirror）路径；说明消息重复是系统性问题，而非个别频道的独立 bug。
- **[#132762 — 溢出重试可能在拿到工具结果后以“成功”结束，却缺少最终投递](https://github.com/openclaw/openclaw/issues/132762)** — 13 条评论 · P1，消息丢失。多阶段文档工作流在重试后会丢失助手的最终答复。
- **[#53763 — 功能：内置无头浏览器，实现可靠的网页访问](https://github.com/openclaw/openclaw/issues/53763)** — 12 条评论 · P3。用户反复要求提供无外部依赖的浏览器工具。
- **[#39476 — 目标智能体回复时 A2A `sessions_send` 出现重复](https://github.com/openclaw/openclaw/issues/39476)** — 12 条评论 · P1，消息丢失，已关联 PR。
- **[#96975 — 将子代理完成结果与父上下文隔离](https://github.com/openclaw/openclaw/issues/96975)** — 12 条评论，1 👍 · P2。
- **[#127229 — Telegram 看门狗释放的持久化更新被误标为 tombstone](https://github.com/openclaw/openclaw/issues/127229)** — 12 条评论 · P1，消息丢失。
- **[#14785 — 降低工具 schema 的 token 开销（~3,500 tok/session）](https://github.com/openclaw/openclaw/issues/14785)** — 10 条评论 · 成本/token 效率问题。
- **[#53408 — 长对话后 Write/exec 工具参数被静默丢弃](https://github.com/openclaw/openclaw/issues/53408)** — 11 条评论，2 👍 · 工具静默失效让用户挫败感很强。
- **[#72015 — 活动内存阻塞回复 / QMD 启动初始化让多智能体 Gateway 过载](https://github.com/openclaw/openclaw/issues/72015)** — 10 条评论，2 👍。

**潜在需求：**（1）跨频道与智能体间调用具备“保证投递/不重复”的语义；（2）能够真正恢复的认证/提供方故障转移（计费冷却、会话上限、畸形工具调用等）；（3）更低的 token/成本开销（schema 体积、prompt-cache 抖动）；（4）在长期运行会话中，将子代理完成结果与父上下文干净地隔离。

## 5. Bug 与稳定性

按严重程度排序的重点问题（除非特别注明，均仍未关闭）：

**P0 / 严重**

- **[#38327](https://github.com/openclaw/openclaw/issues/38327)** — 自 v2026.3.2 起，google-vertex/gemini-3.1 上出现 `"Cannot convert undefined or null to object"`；P0，影响认证/提供方，无修复 PR。
- **[#91931](https://github.com/openclaw/openclaw/issues/91931)** — 预置的 `SOUL.md`/`IDENTITY.md`/`USER.md` 会导致 bootstrap 自动完成并删除用户的 `BOOTSTRAP.md`；P0，数据丢失，已关联 PR。

**P1 — 投递/会话状态完整性**

- **[#69208](https://github.com/openclaw/openclaw/issues/69208)** — 跨频道的重复消息记录/回放问题总括。
- **[#132762](https://github.com/openclaw/openclaw/issues/132762)** — 溢出重试在没有最终投递的情况下错误地以 `success` 结束。
- **[#39476](https://github.com/openclaw/openclaw/issues/39476)** — A2A `sessions_send` 的回呼会产生重复消息（已关联修复 PR）。
- **[#127229](https://github.com/openclaw/openclaw/issues/127229)** — Telegram 持久化更新在看门狗释放后被错误标记为 tombstone。
- **[#112259](https://github.com/openclaw/openclaw/issues/112259)** — 入站 turn 被静默丢弃：零 payload 分发没有重试/死信机制。
- **[#54488](https://github.com/openclaw/openclaw/issues/54488)** — Followup 排空会饿死会话通道，导致入站分发阻塞 20–30 分钟。
- **[#78055](https://github.com/openclaw/openclaw/issues/78055)** — 子代理 announce 会投递过期输出；子代理会话还会继承无关历史。
- **[#49381](https://github.com/openclaw/openclaw/issues/49381)** — 模型故障转移后，飞书出现重复的最终回复。

**P1 — 运行时/阻塞/回归**

- **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — 大规模场景下，同步 agent 持久化会阻塞 Gateway 事件循环（部分修复已在 #133925/#134062 落地）。
- **[#97616](https://github.com/openclaw/openclaw/issues/97616)** — 泄漏的 hook/tool 子进程 → 僵尸进程累积，运行时性能下降。
- **[#135111](https://github.com/openclaw/openclaw/issues/135111)** — 在 v2026.8.1 的 claude-sonnet-5 上，间歇性出现 "Provider completed tool call with malformed JSON arguments" 回归。
- **[#136183](https://github.com/openclaw/openclaw/issues/136183)** — 命令执行器在生成 `ssh` 子进程时挂起，直到收到 SIGTERM（2026.8.1/8.2 回归）。
- **[#134? → #110190](https://github.com/openclaw/openclaw/issues/110190)** — 运行时上下文载体被放在用户消息之后，导致模型困惑/推理浪费。
- **[#101929](https://github.com/openclaw/openclaw/issues/101929)** — 上下文溢出估算器比实际计费用量多算约 2.3–2.6 倍。
- **[#132720](https://github.com/openclaw/openclaw/issues/132720)** — 升级到 2026.9.1-beta.1 后，即使使用有效的 paste-token，claude-cli 也会返回 `session_expired` 410；Doctor 会将主 provider 从 claude-cli 迁走。
- **[#132765](https://github.com/openclaw/openclaw/issues/132765)** — `agents_wait` 忽略 `timeoutSeconds`，约 60 秒后直接终止，而不是返回 pending。
- **[#102534](https://github.com/openclaw/openclaw/issues/102534)** — Cron 调度器在大量超时后永久停止触发，且重启后依然无法恢复。

**P1/P2 — 认证与容量**

- **[#115642](https://github.com/openclaw/openclaw/issues/115642)** — 订阅认证的计费冷却时间（固定约 5 小时）比故障持续更久。
- **[#118793](https://github.com/openclaw/openclaw/issues/118793)** — Claude CLI 的 "session limit" 会以 `surface_error` 终止，而不是触发回退链。
- **[#120162](https://github.com/openclaw/openclaw/issues/120162)** — `qualityGuard` 审计与压缩共用超时/中止预算，可能导致整个压缩失败。
- **[#53008](https://github.com/openclaw/openclaw/issues/53008)** — 内存压缩阻塞主通道 → 机器人 10 分钟以上无响应。

与未关闭 bug 相关的现有修复 PR 包括 [#119162](https://github.com/openclaw/openclaw/pull/119162)（保留待处理的最终投递标记）、[#139469](https://github.com/openclaw/openclaw/pull/139469)（数据库锁错误）、[#139439](https://github.com/openclaw/openclaw/pull/139439)（运行失败时的会话记录提示）和 [#132831](https://github.com/openclaw/openclaw/pull/132831)（节点能力审批在 5 分钟后消失，关闭 #132829）。

## 6. 功能请求与路线图信号

处于活跃讨论、有讨论支撑的提案：

- **[#53763 — 无需外部依赖即可进行网页访问的内置无头浏览器](https://github.com/openclaw/openclaw/issues/53763)** — 12 条评论。反复出现、价值很高的需求；很有可能进入未来 minor release，并与 PR [#139466](https://github.com/openclaw/openclaw/pull/139466) 中的 Chrome 扩展新工作一起推进。
- **[#14785 — 降低工具 schema 的 token 开销（~3,500 tok/session）](https://github.com/openclaw/openclaw/issues/14785)** — 这一成本优化与 v2026.9.2 的性能方向一致。
- **[#6599 — `/models` test-fallback 命令，用于验证回退链](https://github.com/openclaw/openclaw/issues/6599)** — 与当前对提供方回退可靠性的高度关注相契合。
- **[#96975 — 将子代理完成结果与父上下文隔离](https://github.com/openclaw/openclaw/issues/96975)** — 与 PR [#139456](https://github.com/openclaw/openclaw/pull/139456) 所体现的子代理上下文隔离工作相契合。
- **[#71058 — 每个 Gateway 支持多个 Azure/Teams 机器人](https://github.com/openclaw/openclaw/issues/71058)** — 企业多租户需求。
- **[#99583 — 自动为会话生成智能标题](https://github.com/openclaw/openclaw/issues/99583)** — UX 体验优化；2 👍。
- **[#54373 — RFC：为注入片段提供来源（provenance）元数据](https://github.com/openclaw/openclaw/issues/54373)** — 长期透明度/架构信号。
- **其他：** [#63990](https://github.com/openclaw/openclaw/issues/63990) 带模型感知故障转移的多索引 embedding 记忆、[#71452](https://github.com/openclaw/openclaw/issues/71452) 消息列表分页、[#85461](https://github.com/openclaw/openclaw/issues/85461) 图像生成用量元数据、[#132781](https://github.com/openclaw/openclaw/issues/132781) 将 commentary 用作进度标签。

**预测：** v2026.9.x 的后续版本很可能延续响应性/事件循环相关的工作（与版本说明对应），并会落地子代理隔离和回退链改进。无头浏览器与 `/models` test-fallback 的需求信号最强，可能会在未来 1–2 个版本中以 beta 功能形式出现。

**值得注意的关闭：** [#42840 — Control UI 中的 MathJax/LaTeX 支持](https://github.com/openclaw/openclaw/issues/42840) —— 关闭时获得 10 👍，是数据集中反响最高的一项；如果该功能尚未随版本发布，用户很可能会重新提交 issue。

## 7. 用户反馈摘要

- **升级回归是最主要的挫败点。** 有多个“在 X 版本正常、在 Y 版本损坏”的报告：google-vertex 自 2026.3.2 起崩溃（[#38327](https://github.com/openclaw/openclaw/issues/38327)）、自 v2026.8.1 起出现畸形工具调用 JSON（[#135111](https://github.com/openclaw/openclaw/issues/135111)）、ssh/exec 挂起回归（[#136183](https://github.com/openclaw/openclaw/issues/136183)）、升级 beta 后 claude-cli 认证损坏（[#132720](https://github.com/openclaw/openclaw/issues/132720)）。
- **最坏情况下的恢复负担很重：** 一次 macOS 升级导致 Gateway 无法恢复，只能通过 Time Machine 还原 `~/.openclaw`（[#85027](https://github.com/openclaw/openclaw/issues/85027)）。
- **静默故障模式会制造不信任：** 工具参数被丢弃（[#53408](https://github.com/openclaw/openclaw/issues/53408)）、入站消息无重试地消失（[#112259](https://github.com/openclaw/openclaw/issues/112259)）、cron 定时器静默失效（[#102534](https://github.com/openclaw/openclaw/issues/102534)）。
- **压缩/维护期间的机器人不可用**（10 分钟以上无响应，[#53008](https://github.com/openclaw/openclaw/issues/53008)、[#72015](https://github.com/openclaw/openclaw/issues/72015)）对需要始终在线的 Gateway 用户来说是实实在在的可靠性痛点。
- **用户的成本意识在增强：** OpenAI 上的 prompt-cache 抖动（[#95610](https://github.com/openclaw/openclaw/issues/95610)）和每个会话固定的 token 开销（[#14785](https://github.com/openclaw/openclaw/issues/14785)）——用户开始认真核算 token 浪费。
- **积极信号：** 用户在主动提出测试命令、文档改进和 E2E 工具链相关工作——尽管稳定性仍有摩擦，这仍表明社区中有一批投入度高、经验丰富的用户/运维者。

## 8. 积压观察

需要维护者关注、长期无回应或长期未解决的事项：

- **[#38327 (P0, 2026-03-06)](https://github.com/openclaw/openclaw/issues/38327)** — Critical 级 google-vertex 回归，已开放约 6 个月且无修复 PR；无论严重程度还是持续时间都令人担忧。
- **[#6599 (2026-02-01)](https://github.com/openclaw/openclaw/issues/6599)** — `/models` test-fallback 请求，有 11 条评论和 `needs-maintainer-review` 标签；自 2 月以来无人跟进。
- **[#14785 (2026-02-12)](https://github.com/openclaw/openclaw/issues/14785)** — 降低 token 开销需要产品决策；成本信号强烈。
- **[#39476 (2026-03-08)](https://github.com/openclaw/openclaw/issues/39476)** — A2A 重复问题，P1，已有打开的修复 PR，但仍未关闭。
- **[#53408 (2026-03-24)](https://github.com/openclaw/openclaw/issues/53408)** — 工具参数被静默丢弃；11 条评论，2 👍，无修复 PR。
- **[#53763 (2026-03-24)](https://github.com/openclaw/openclaw/issues/53763)** — 无头浏览器请求自 3 月以来一直处于 `needs-product-decision` 状态。
- **[#54488 (2026-03-25)](https://github.com/openclaw/openclaw/issues/54488)** — 会话通道饥饿导致入站分发阻塞 20–30 分钟；P1，消息丢失。
- **[#72015 (2026-04-26)](https://github.com/openclaw/openclaw/issues/72015)** — 活动内存阻塞多智能体 Gateway；P1。
- **[#97616 (2026-06-29)](https://github.com/openclaw/openclaw/issues/97616)** — 僵尸子进程泄漏；P1，会造成崩溃循环，尚无修复 PR。
- **[#95610 (2026-06-21)](https://github.com/openclaw/openclaw/issues/95610)** — OpenAI prompt-cache 前缀抖动；看似已关联修复 PR，但 issue 仍未关闭。
- **[#112259 (2026-07-21)](https://github.com/openclaw/openclaw/issues/112259)** — 入站消息静默丢失；状态为 `clawsweeper-recovery-stuck`。

**评审管线瓶颈：** 相当多的 PR 带有 `👀 ready for maintainer look` 标签——[#137713](https://github.com/openclaw/openclaw/pull/137713)、[#139409](https://github.com/openclaw/openclaw/pull/139409)、[#139456](https://github.com/openclaw/openclaw/pull/139456)、[#139457](https://github.com/openclaw/openclaw/pull/139457)、[#139372](https://github.com/openclaw/openclaw/pull/139372)、[#136736](https://github.com/openclaw/openclaw/pull/136736)、[#132831](https://github.com/openclaw/openclaw/pull/132831)、[#137893](https://github.com/openclaw/openclaw/pull/137893)、[#120854](https://github.com/openclaw/openclaw/pull/120854)；另一些则在等待作者处理（`⏳ waiting on author`：[#137594](https://github.com/openclaw/openclaw/pull/137594)、[#139439](https://github.com/openclaw/openclaw/pull/139439)、[#139469](https://github.com/openclaw/openclaw/pull/139469)、[#139343](https://github.com/openclaw/openclaw/pull/139343)、[#98259](https://github.com/openclaw/openclaw/pull/98259)、[#119162](https://github.com/openclaw/openclaw/pull/119162)）。面对 297 个未关闭 PR 和 435 个未关闭 issue，评审吞吐量已成为缩小可靠性差距的主要制约因素。

---

## 横向生态对比

# 跨项目对比报告 —— 个人 AI 助手开源生态

**日期：** 2026-09-06 | **来源：** OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw 社区简报

---

## 1. 生态概览

个人 AI 助手开源领域正在从“堆功能”转向**无人值守运行的可靠性**：在这五个项目中，主导的 bug 类型是消息丢失/重复、会话状态损坏、提供商/认证故障转移失效，以及 cron/计划任务失败。“Claw”谱系（以 OpenClaw 为核心参考，加上 IronClaw 与 ZeroClaw 衍生项目）与独立架构的代理（Hermes Agent、QwenPaw）并存，各自围绕不同的生态锚点运转——参考网关、研究实验室、硬件/云平台或模型家族。综合来看，这些仓库在 24 小时内处理了 **约 605 个 issue 事件和约 610 个 PR 事件**，说明有一个庞大且高度投入的运营者/开发者群体在运行常驻、多通道、多代理的部署。社区诉求目前集中在多租户、会话事件溯源、降低 Token 成本，以及将代理生命周期与桌面 UI 生命周期解耦。

## 2. 活跃度对比

| 项目 | 更新的 Issue（已关闭） | 更新的 PR（已合并/关闭） | 发布版本 | 未关闭积压 | 健康评分* |
|---|---|---|---|---|---|
| **OpenClaw** | 500（65 已关闭） | 500（203 已合并/关闭） | **v2026.9.2** | 435 个 issue / 297 个 PR | 6.5/10 |
| **ZeroClaw** | 42（8 已关闭） | 50（10 已合并/关闭） | **v0.8.5**（454 次提交，73 位贡献者） | 中等；RFC 队列吃紧 | 7.5/10 |
| **Hermes Agent** | 50（1 已关闭） | 50（4 已关闭；非功能性） | 无 | 较高；多条 issue 有 68–162 条评论 | 5.0/10 |
| **QwenPaw** | 10（3 已关闭） | 4（0 已合并） | 无 | 较小，但 PR 审查已停滞约 27 天 | 5.5/10 |
| **IronClaw** | 3（2 已关闭） | 5（2 已合并） | 无 | 极少 | 8.0/10 |

*健康评分综合衡量合并吞吐量、issue 解决率、未关闭 P0/P1 项的年限/严重性、发版节奏，以及维护者相对项目规模的响应速度。OpenClaw 以巨大体量发版，但背着一个 6 个月未解决的 P0，审查管线也相当吃紧；IronClaw 范围虽小，却能及时解决问题且修复干净利落。

## 3. OpenClaw 的定位

OpenClaw 是**毫无争议的体量领先者和事实上的参考实现**：其每天 500 个 issue / 500 个 PR 的活动量比最接近的同类项目高出一个数量级，也是唯一持续发布版本的项目（v2026.9.2 聚焦于 Gateway 事件循环响应性与持久化历史读取）。其优势在于：

- **渠道覆盖广度**——Discord、Slack、Telegram、MSTeams、飞书、webchat、A2A，没有同类项目能覆盖如此大的面积。
- **自动化可靠性分诊（ClawSweeper）**——系统性地暴露消息丢失与会话完整性问题，让项目拥有异常完整的自身故障模式全景图（即便由此产生的 435 个未关闭 issue 积压本身也是一种风险）。
- **发版节奏**——24 小时内合并/关闭 203 个 PR，证明了 Hermes 和 QwenPaw 目前尚不具备的持续维护者吞吐能力。
- **性能工程**——v2026.9.2 的事件循环/持久化历史工作直接回应了其他项目才刚刚开始报告的规模化痛点。

**薄弱环节：** 一个 P0 级 google-vertex 回归（[#38327]）已约 6 个月未修复；约 10 个 PR 在等待维护者审查，而消息丢失缺陷仍未关闭；297 个 PR 的积压使审查吞吐量成为缩小可靠性差距的硬约束。

**技术路线差异：** OpenClaw 采用以 Gateway 为中心的事件循环架构，搭配 SQLite 持久化和基于 npm 的打包方式，定位是自托管服务器网关。ZeroClaw 与其同源，但增加了 ZeroRelay/ZeroRouter、WASM 插件运行时和操作系统级沙箱后端（Bubblewrap/Landlock/Seatbelt），面向注重安全的社区治理。Hermes 是一个 Python/asyncio 桌面打包运行时；QwenPaw 是围绕创意媒体应用插件和 Qwen 模型兼容性构建的 Python 代码库；IronClaw 是绑定 NearAI 生态、面向 Telegram/设备的小型代理。

## 4. 共享技术焦点领域

| 焦点领域 | 受影响项目 | 代表性证据 |
|---|---|---|
| **故障转移与重试下无消息丢失/无重复** | OpenClaw、Hermes、ZeroClaw | OpenClaw 汇总 issue #69208（跨渠道重复）、#132762（重试未实际投递却误报成功）；Hermes PR #103565（会话重放损坏）；ZeroClaw #10526（追加式事件历史与确定性重放） |
| **提供商/认证故障转移弹性** | OpenClaw、Hermes、QwenPaw、ZeroClaw | OpenClaw P0 #38327（Vertex 回归）、#132720（claude-cli 410）；Hermes #103057（GPT-6 Astra）、#103929（模型退化回退）；QwenPaw #7474/#7576（自定义提供商在 `max_tokens` 迁移后失效）；ZeroClaw #10533（`custom.*` 提供商槽位被拒绝） |
| **Cron/计划任务可靠性** | OpenClaw、Hermes、ZeroClaw | OpenClaw #102534（定时器静默停止）；Hermes #100401（心跳死锁）、#103904（UTC 漂移）、PR #103930；ZeroClaw PR #9320（为 cron 运行引入墙钟超时） |
| **桌面/网关生命周期解耦与 UI 响应性** | OpenClaw、Hermes、QwenPaw | OpenClaw v2026.9.2（磁盘繁重工作期间保持聊天界面响应）；Hermes #58576（UI 卡顿 51 秒）、#69180（OOM 崩溃循环）、#97681（机器人聊天随 Desktop 关闭而终止）；QwenPaw #7573（编辑/回退会话） |
| **子代理/上下文隔离** | OpenClaw、Hermes、QwenPaw | OpenClaw #96975；Hermes sidecar/上下文完整性（#102194）；QwenPaw Advisor 模式将强/弱模型配对（#7569） |
| **技能/工具版本化与可观测性** | Hermes、QwenPaw、OpenClaw | Hermes #66616（技能索引过期，162 条评论）；QwenPaw #7557（技能版本/依赖元数据）；OpenClaw #53408（工具参数被静默丢弃） |
| **Token/成本效率** | OpenClaw、QwenPaw | OpenClaw #14785（工具 schema 每次会话约 3,500 token）、#95610（prompt 缓存频繁失效）；QwenPaw Advisor 模式成本拆分 |
| **沙箱/安全边界一致性** | ZeroClaw、OpenClaw | ZeroClaw #6996（跨沙箱层路径准入漂移）、#10536（macOS Seatbelt 忽略 `allowed_roots`）；OpenClaw #53763（无依赖无头浏览器请求） |

## 5. 差异化分析

| | **OpenClaw** | **Hermes Agent** | **ZeroClaw** | **QwenPaw** | **IronClaw** |
|---|---|---|---|---|---|
| **定位** | 核心参考网关；最广渠道矩阵；聚焦规模化可靠性工程 | 研究实验室代理（NousResearch），桌面优先 UX 与 Copilot 集成 | 社区治理、安全优先的衍生项目，具备严格的 RFC 流程 | Qwen 生态代理，带创意媒体 Creator 插件，多租户 Hub（v2.2.0）即将推出 | 与 NearAI 平台集成的极简 Telegram/设备代理；嵌入式 Pi 沙箱 |
| **目标用户** | 运行常驻、多通道、多代理网关的运营者 | 想要本地代理 + 无人值守后台运行的桌面高级用户 | 注重安全的自托管用户；重视架构治理的贡献者 | 创意/媒体团队；代理集群运营者（涉及 9 代理共享技能池的投诉）；采用共享 Hub 的团队 | Telegram bot 用户与基准测试/设备部署场景 |
| **架构特征** | 网关事件循环 + SQLite；Node/npm；macOS 应用；持久化会话记录存储 | Python/asyncio；桌面应用承载代理运行时；systemd/Windows 更新工具；TTS 技术栈 | ZeroRelay/ZeroRouter；WASM 插件运行时；操作系统级沙箱后端；追加式事件溯源方向 | Python 工具调度核心；应用插件模型，带 T2V/I2V/S2V 媒体调度；多租户 Hub 路线图 | 轻量级：专注配对/命令菜单；Pi 沙箱循环用于基准测试 |
| **主要风险** | 审查管线跟不上 297 个未关闭 PR；P0 久拖未决 | P0 修复在审查中搁浅；缺少发版通道；更新/重启循环侵蚀信任 | 流程摩擦：RFC 修订循环令投票失效；大量 `blocked`/`needs-author-action` PR | 窗口期内合并速度接近为零；MCP 超时 PR 已停滞 27 天 | 覆盖面小；社区能量低 |

## 6. 社区动量与成熟度

**第一梯队 —— 极度活跃、发布驱动：** *OpenClaw* 和 *ZeroClaw* 都在持续发版（v2026.9.2 与 v0.8.5），合并吞吐量高，贡献者基础雄厚（ZeroClaw：一个版本就有 73 位贡献者）。ZeroClaw 社区是**流程最成熟**的——RFC 修订周期、维护者决策队列跟踪器和治理改革提案都表明，这个社区在决策基础设施上进行投资，尽管代价是速度。OpenClaw 社区是**运维经验最丰富**的——会提交精确的消息丢失与 Token 成本报告，并提出回退测试命令与 E2E 测试框架。

**第二梯队 —— 活跃但发版受限：** *Hermes Agent* 的 issue 活跃度很高（包括一场 162 条评论的技能索引风波），但没有发布任何版本；可见的 PR 关闭都属于非功能性的整理维护。*QwenPaw* 有健康的路线图讨论（Hub 多租户话题下有 23 条评论），但窗口期内 PR 合并为零——维护者带宽似乎是瓶颈。

**第三梯队 —— 聚焦式维护：** *IronClaw* 展现出紧凑健康的缺陷修复循环：3 个活跃缺陷中有 2 个在 24 小时内连同对应修复一起关闭。范围虽窄（Telegram 接入/配对文案），但执行质量很高。

**整体成熟度格局：** 生态正在分化为两个方向——一边是**平台级网关**（OpenClaw、ZeroClaw），可靠性债务与审查容量是它们的核心战场；另一边是**小型代理**（IronClaw、QwenPaw），它们要么围绕某个生态（NearAI、Qwen）站稳脚跟，要么面临被 Claw 核心的功能广度吞并的风险。

## 7. 趋势信号

1. **无人值守运行的可靠性才是护城河。** 在所有项目中，挫败感最强的都集中在静默失败：消息未经重试便消失（OpenClaw #112259）、cron 定时器静默停止（OpenClaw #102534）、cron 失败被粉饰为成功（Hermes #20301）、更新循环无限重触发（Hermes #98022）。用户不再容忍演示级的投递语义；他们期待的是死信队列、精确一次投递和崩溃一致的会话存储。

2. **事件溯源式会话状态正在成为新兴的架构答案。** ZeroClaw 的 #10526（追加式会话事件历史与确定性重放）与 OpenClaw 的持久化历史/事件循环工作反映出一种趋同：重复/丢失类缺陷（#69208、#132762）无法靠逐通道补丁解决——它们需要可重放、权威的会话日志。

3. **多代理与多租户的需求已经到来。** QwenPaw 的 Hub 2.2.0 讨论、OpenClaw 的多代理 profile 工作，以及 ZeroClaw 按用户隔离的 Telegram 会话，都指向同一个转变：从单用户个人助手走向团队共享、管理员管理的代理集群。技能版本化/依赖元数据（QwenPaw #7557）是顺理成章的打包后续工作。

4. **提供商支持的脆弱性是一笔系统性成本。** 模型 schema 迁移（`max_tokens` → `max_output_length`）、认证 token 更替以及畸形 JSON 回归，会在升级数周后依然让用户踩坑。项目需要把提供商契约测试和回退链测试命令（OpenClaw #6599）当作一等基础设施。

5. **Token 经济正成为用户可见的功能。** Claw 用户会核算每次会话的 Token 开销；QwenPaw 用 Advisor 模式（昂贵规划器 + 廉价执行器）来回应。成本感知架构（schema 最小化、prompt 缓存卫生、模型分层路由）将成为下一代产品的差异化所在。

6. **桌面与网关的生命周期正在解耦。** Hermes 用户明确要求一个“精简版”远程客户端（#58799），以及能在 Desktop 关闭后继续存活的机器人聊天（#97681）；OpenClaw 出于同样的运维原因，把持久化读取移出了 Gateway 事件循环。代理正演变为无头服务，UI 前端只是可选项。

**给开发者的启示：** 如果你正基于这个生态进行构建，请尽早投入：(a) 支持幂等投递的追加式会话存储；(b) 持续演练、与具体提供商无关的回退链；(c) 与任何 UI 进程解耦的无头/守护进程运行。五个项目呈现出的模式高度一致：在规模化场景中，决定用户是否足够信任代理、愿意让它无人值守运行的，是会话完整性与故障转移语义——而不是模型能力。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-06

## 1. 今日概览

截至 2026-09-06，NousResearch/hermes-agent 依然高度活跃，但未发布版本：过去 24 小时内有 50 个 issue 被更新（49 个开启、1 个关闭），50 个 PR 被更新（46 个开启、4 个关闭/合并）。可见的 PR 关闭主要是 ORCH V4 的探索/重复条目，而非功能合并，因此本窗口期对代码交付的影响很小。Issue 的关注点集中在长期性的运维与重构主题上，尤其是 Skills Hub 索引过期问题（[#66616](https://github.com/NousResearch/hermes-agent/issues/66616)，162 条评论）。健康信号好坏参半：贡献速度强劲，但多个 P0/P1 修复仍未合并，也没有新版本将待处理的修复带给用户。

## 2. 版本发布

无。本窗口期没有发布任何版本或标签，因此没有 changelog、破坏性变更或迁移说明需要报告。

## 3. 项目进展

合计有 4 个 PR 被关闭/合并，但浮出的两个已关闭 PR 并非功能落地：

- [#79248](https://github.com/NousResearch/hermes-agent/pull/79248) — 已关闭：ORCH V4 sidecar 控制平面候选方案。
- [#79819](https://github.com/NousResearch/hermes-agent/pull/79819) — 已关闭：重复的 ORCH V4 纯文档 PR 预备元数据。

因此，可见的进展发生在等待评审/合并的开放 PR 中，包括：

- [#103565](https://github.com/NousResearch/hermes-agent/pull/103565) — P0 修复：按精确行标识持久化预刷新的用户上下文，防止会话回放损坏。
- [#103930](https://github.com/NousResearch/hermes-agent/pull/103930) — P1 cron 修复：针对较旧的 systemd 瞬态作用域。
- [#103609](https://github.com/NousResearch/hermes-agent/pull/103609) — Windows 更新恢复说明改进。
- [#103927](https://github.com/NousResearch/hermes-agent/pull/103927) — gateway TTS 临时目录现在遵循 `HERMES_HOME`。
- [#103928](https://github.com/NousResearch/hermes-agent/pull/103928) — Gemini TTS 超时/重试/安全拦截处理。
- [#103922](https://github.com/NousResearch/hermes-agent/pull/103922) — API 服务器的客户端管理系统提示改为 opt-in。
- [#103911](https://github.com/NousResearch/hermes-agent/pull/103911) — opt-in `display.vivid` 内容样式。
- [#103057](https://github.com/NousResearch/hermes-agent/pull/103057) — GPT-6 Astra 基线兼容性支持。

## 4. 社区热门话题

评论最多的 issue 显示出围绕自动化可靠性、架构债务以及桌面/会话行为的持续痛点：

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — Skills 索引过期/降级（162 条评论）。索引已存在 29.8 小时，超过 26 小时的上限；看门狗持续告警，但流水线始终未能恢复。
- [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) — 全仓库 godfile 清除史诗任务被重新打开，残留约 2K 项任务（81 条评论）。根本需求：一条现实可行的分片/重构完成路径。
- [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — 自动化 Nous 集成被 `cron/jobs.py` 中的冲突阻塞（68 条评论）。根本需求：为计划中的上游合并提供冲突处理。
- [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — 桌面端关闭后 Bot Group Chats 应继续工作（23 条评论）。根本需求：gateway/会话生命周期必须独立于桌面 UI 的生命周期。
- [#58576](https://github.com/NousResearch/hermes-agent/issues/58576) — Web 服务器事件循环在繁重 agent 工作下停滞长达 51 秒（9 条评论）。根本需求：降低桌面重度负载下的 GIL 争用。
- [#98022](https://github.com/NousResearch/hermes-agent/issues/98022) — 更新追赶导致的机群重启因过期回执而无限重复触发（9 条评论）。根本需求：更新回执在运行中断后必须被原子化失效。

已浮出的 issue 中获得 👍 最多的是 [#58799](https://github.com/NousResearch/hermes-agent/issues/58799)（4 👍），它请求提供一个不捆绑完整 agent 运行时的独立 Lite Desktop 客户端。

## 5. Bug 与稳定性

严重级别最高的浮出问题：

- P0 修复评审中：[#103565](https://github.com/NousResearch/hermes-agent/pull/103565) — 防止上一轮会话的 sidecar/上下文被后续提示覆盖。修复 [issue #102194](https://github.com/NousResearch/hermes-agent/issues/102194)。
- P1 [#100401](https://github.com/NousResearch/hermes-agent/issues/100401) — cron fire-claim 心跳可能在自己的栅栏上死锁，导致超过 60 秒的任务以 “Interrupted by shutdown.” 被终止。
- P1 [#98022](https://github.com/NousResearch/hermes-agent/issues/98022) — `hermes update` 可能因过期的中断回执导致机群无限重启。
- P1 [#58576](https://github.com/NousResearch/hermes-agent/issues/58576) — 在繁重的 agent/工具工作下，桌面 UI 会冻结约一分钟。
- P1 [#69180](https://github.com/NousResearch/hermes-agent/issues/69180) — 桌面渲染器在空聊天/虚拟化布局抖动场景下陷入 OOM 崩溃循环。
- P1 [#20548](https://github.com/NousResearch/hermes-agent/issues/20548) — 飞书 `root_id` 回退导致所有回复被错误地线程化。
- P1 [#96925](https://github.com/NousResearch/hermes-agent/issues/96925) — v0.20.6 之后，Copilot 集成重复进行工具调用，并反复发出重复调用警告。

本窗口期内新提交的 P2/P3 bug 报告：

- [#103840](https://github.com/NousResearch/hermes-agent/issues/103840) — `state.db` 的 `.recover` 会复活孤立的 FTS5 影子表并阻塞 gateway 启动。
- [#103904](https://github.com/NousResearch/hermes-agent/issues/103904) — 周期性 cron 的 `next_run_at` 漂移至 UTC，在欧洲/华沙时区会延迟 2 小时触发。
- [#103900](https://github.com/NousResearch/hermes-agent/issues/103900) — 桌面端固定会话仅存于本地，且未设置原生 session-store 标志。
- [#103870](https://github.com/NousResearch/hermes-agent/issues/103870) — 重复出现 `RuntimeWarning: coroutine '_watch_stdio_children' was never awaited`。
- [#103747](https://github.com/NousResearch/hermes-agent/issues/103747) — Windows 桌面更新程序完成后，其 UI 仍可能无限转圈。

针对多个 bug 簇的修复 PR 已在进行中，包括 [#103930](https://github.com/NousResearch/hermes-agent/pull/103930)、[#103927](https://github.com/NousResearch/hermes-agent/pull/103927)、[#103922](https://github.com/NousResearch/hermes-agent/pull/103922)、[#103918](https://github.com/NousResearch/hermes-agent/pull/103918) 和 [#103609](https://github.com/NousResearch/hermes-agent/pull/103609)。

## 6. 功能请求与路线图信号

过去 24 小时内可见的、值得注意的已请求或拟议功能：

- [#103917](https://github.com/NousResearch/hermes-agent/issues/103917) — 为 `delegate_task` 简化结构化输出契约，减少对内联 JSON Schema 的需求。
- [#103925](https://github.com/NousResearch/hermes-agent/issues/103925) — 通过 `dispatch_after` / `dispatch_window` 为看板卡片提供原生时间门控。
- [#103929](https://github.com/NousResearch/hermes-agent/pull/103929) — 当模型进入退化/无进展的持续生成状态时，切换到备用 provider。
- [#103605](https://github.com/NousResearch/hermes-agent/pull/103605) — 桌面语音播放的暂停/恢复支持。
- [#103911](https://github.com/NousResearch/hermes-agent/pull/103911) — opt-in 的增强 CLI 内容样式（`display.vivid`）。
- [#103057](https://github.com/NousResearch/hermes-agent/pull/103057) — OpenAI provider 中的 GPT-6 Astra 基线支持。
- [#80790](https://github.com/NousResearch/hermes-agent/issues/80790) — 带就绪状态标注的技能索引，避免推荐无法运行的技能。
- [#80791](https://github.com/NousResearch/hermes-agent/issues/80791) — curator 技能整合时的内容保留规则。
- [#58799](https://github.com/NousResearch/hermes-agent/issues/58799) — 独立 Hermes Desktop 安装程序 / 精简客户端，4 👍。
- [#43224](https://github.com/NousResearch/hermes-agent/issues/43224) — 最小化到系统托盘后的紧凑聊天弹窗。
- [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — 桌面端关闭后保持 Bot Group Chats 存活。

近期路线图中最有可能落地的是已经开放、风险较低的 PR：P0/P1 修复如 [#103565](https://github.com/NousResearch/hermes-agent/pull/103565) 和 [#103930](https://github.com/NousResearch/hermes-agent/pull/103930)，以及小型桌面/CLI 功能如 [#103605](https://github.com/NousResearch/hermes-agent/pull/103605) 和 [#103911](https://github.com/NousResearch/hermes-agent/pull/103911)。GPT-6 Astra 基线 PR（[#103057](https://github.com/NousResearch/hermes-agent/pull/103057)）为未来面向 provider 的发布提供了明确的兼容性信号。

## 7. 用户反馈摘要

本窗口期内的用户痛点集中在更新可靠性、桌面/会话恢复能力，以及被感知到的 agent 行为回归上：

- 更新/重启循环是反复出现的现实困扰：过期回执可能导致永久性的机群重启循环（[#98022](https://github.com/NousResearch/hermes-agent/issues/98022)）；从 gateway 执行更新的循环仍被报告（[#98010](https://github.com/NousResearch/hermes-agent/issues/98010)）；Windows 更新交接也可能停滞（[#102283](https://github.com/NousResearch/hermes-agent/issues/102283)）。
- 桌面用户同时报告了严重冻结与崩溃循环（[#58576](https://github.com/NousResearch/hermes-agent/issues/58576)、[#69180](https://github.com/NousResearch/hermes-agent/issues/69180)）；而高级用户希望 Desktop 成为远程客户端，而非 agent 宿主（[#58799](https://github.com/NousResearch/hermes-agent/issues/58799)、[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)）。
- v0.20.6/0.21.0 之后的 agent 行为变化正在引发不满：Copilot 工具调用重复（[#96925](https://github.com/NousResearch/hermes-agent/issues/96925)），以及强化的运行时指导覆盖了用户编写的 SOUL.md 约束（[#103919](https://github.com/NousResearch/hermes-agent/issues/103919)）。
- 偏运维的用户对静默状态损坏非常敏感：cron 预运行失败被粉饰为成功（[#20301](https://github.com/NousResearch/hermes-agent/issues/20301)），gateway 在信号关停退出后会让 systemd 单元永久处于 failed 状态（[#94757](https://github.com/NousResearch/hermes-agent/issues/94757)）。

整体用户情绪看似喜忧参半：用户正将 Hermes 推向严肃的无人值守/自托管场景，但更新循环、会话状态缺陷和桌面生命周期耦合正在侵蚀他们对无人值守运营的信任。

## 8. 积压观察

以下 issue/PR 因持续时间长、重要性高或活动悬而未决，似乎需要维护者关注：

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — 创建于 Jul 18；技能索引仍处于降级状态，162 条评论。探针持续触发，但未看到持久修复。
- [#78647](https://github.com/NousResearch/hermes-agent/issues/78647) — 创建于 Aug 4；godfile 清除史诗任务被重新打开，残留约 2K 项任务，且没有浮出的在途 PR。
- [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — 创建于 Aug 17；68 条评论；自动化 Nous-to-Enterkey 集成在 `cron/jobs.py` 中被阻塞。
- [#20301](https://github.com/NousResearch/hermes-agent/issues/20301) — 创建于 May 5；cron 预运行脚本失败被静默报告为成功；未看到修复 PR。
- [#20548](https://github.com/NousResearch/hermes-agent/issues/20548) — 创建于 May 6；`root_id` 回退导致的飞书线程 bug；未看到修复 PR。
- PR [#76146](https://github.com/NousResearch/hermes-agent/pull/76146) — 创建于 Aug 1；后台进程完成标记不会跨重启持久化；agent/gateway 重启后会过期。
- PR [#82773](https://github.com/NousResearch/hermes-agent/pull/82773) — 创建于 Aug 9；一次性 CLI 推理身份未被一致地证明。
- PR [#86508](https://github.com/NousResearch/hermes-agent/pull/86508) — 创建于 Aug 14；TUI 快速别名仍绕过原生命令处理。

这些条目代表了当前项目中最大的未解决运维、架构与合并吞吐量风险。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-06

基于最近 24 小时内更新的 GitHub 动态。

## 今日概览

活动量中等，主要集中在 Telegram 接入引导/配对修复上。共有三个 issue 更新：其中两个已关闭的 bug 被确认修复，另有一个面向用户的消息提示 bug 仍未解决。共有五个 PR 更新：三个保持开放，两个已关闭；关闭的这两个 PR 均对应 Telegram 配对相关修复。此外，项目还有一个改动较大且尚未合并的沙箱默认配置 PR，以及一个待审查的 Telegram 命令菜单功能 PR。该时间窗口内没有发布任何新版本。

## 发布

过去 24 小时内没有发布任何新版本，因此没有发布说明、破坏性变更或迁移步骤需要汇报。

## 项目进展

本阶段有两个 PR 被合并/关闭：

- [PR #8054 — fix(assistant): check pairing before command admission so first contact gets the connect notice](https://github.com/nearai/ironclaw/pull/8054)  
  修复了在配对前发送 `/start` 的 Telegram 用户。此前他们看到的是命令列表，现在则会收到正确的连接/配对提示。

- [PR #8073 — fix(device-link): say "not configured by administrator" instead of blaming the user's account](https://github.com/nearai/ironclaw/pull/8073)  
  改进了 Telegram 个人账户关联失败时的提示文案，在管理员缺少配置的情况下不再把问题归咎于用户账户。

这些修复对应以下两个已关闭的 bug 报告：

- [Issue #7956 — Telegram: unpaired sender's /start gets the command inventory instead of the connect/pairing notice](https://github.com/nearai/ironclaw/issues/7956) — 已关闭
- [Issue #7955 — Telegram personal-account linking shows generic "Something went wrong" when admin has not configured api_id/api_hash](https://github.com/nearai/ironclaw/issues/7955) — 已关闭

## 社区热门话题

社区参与度不高；目前仅有一个 issue 存在讨论动态：

- [Issue #8074 — [bug] Paired user's rejected action in a not-connected shared channel gets the pairing notice copy instead of channel-not-connected copy](https://github.com/nearai/ironclaw/issues/8074) — 1 条评论  
  这是唯一有可见评论活动的条目。背后的需求是更清晰的上下文提示：当实际问题是该安装所对应的共享频道尚未连接时，用户不应收到账户配对指引。

过去 24 小时内，没有任何 PR 出现明显的表情回应或评论活动。

## Bug 与稳定性

过去 24 小时内有三个 bug 相关 issue 被更新：

1. **[Issue #8074 — Open · Medium severity](https://github.com/nearai/ironclaw/issues/8074)**  
   **已配对**用户在**未连接**的共享频道中执行操作时，会收到本应面向未配对用户的 `connect_required` 配置清单提示。因为用户其实已经配对，这会造成困惑。目前尚未关联修复 PR。

2. **[Issue #7956 — Closed · Severity medium](https://github.com/nearai/ironclaw/issues/7956)**  
   未配对的 Telegram 发送者执行 `/start` 时返回的是命令列表，而不是配对提示。已在 [PR #8054](https://github.com/nearai/ironclaw/pull/8054) 中修复。

3. **[Issue #7955 — Closed · Severity medium](https://github.com/nearai/ironclaw/issues/7955)**  
   当管理员没有配置 `telegram_api_id` / `telegram_api_hash` 时，Telegram 个人账户关联失败，且只显示通用的“Something went wrong”错误。已在 [PR #8073](https://github.com/nearai/ironclaw/pull/8073) 中修复。

总体来看，剩余未解决的 bug 仅限于共享频道的消息文案范畴，并不表明存在系统性的稳定性回退。

## 功能请求与路线图信号

过去 24 小时内没有提交明确的新功能请求 issue，但有两个开放 PR 暗示了近期产品方向：

- [PR #8072 — feat(telegram): register the Bot API command menu at activation](https://github.com/nearai/ironclaw/pull/8072)  
  通过 `setMyCommands` 把 `/model`、`/status`、`/new`、`/stop`、`/interrupt` 注册到 Telegram 的聊天菜单按钮。这能提升频道命令的可发现性，预计很快就会合入。

- [PR #8075 — feat: make the embedded Pi sandbox loop the startup default](https://github.com/nearai/ironclaw/pull/8075)  
  将内嵌 Pi 沙箱循环设为基准测试场景下的默认启动配置。注意：该 PR 叠加在尚未合并的基础 PR 之上，尚不能立即合入。

下一版本的候选功能包括：Telegram 命令菜单注册；以及基础 PR 合入后的 Pi 沙箱默认启动变更。

## 用户反馈摘要

这些数据反映了用户在 Telegram 接入引导和配置清晰度方面遇到的几个真实痛点：

- 在配对前启动 Telegram bot 的用户收到的是命令列表而非连接指引，因此感到困惑。该问题现已修复。
- 个人账户关联时真正原因是缺少管理员配置，但用户此前只看到通用的“Something went wrong”错误。现已修正为清楚指向管理员配置的提示。
- 对于共享频道尚未连接、但用户已经配对的情形，仍存在提示混淆：用户会收到配对文案，导致误以为自己的账户尚未配对。

数据集中没有出现明确的正面或负面用户评论。

## Backlog 观察

没有 issue 看起来严重滞后，但有几项值得维护者关注：

- [PR #7988 — chore(agents): refresh codebase knowledge graph](https://github.com/nearai/ironclaw/pull/7988)  
  这是自动化的 nightly PR，2026-08-29 开启，目前仍为开放状态。它由 CI 生成，说明写着“review and merge normally”，因此很可能只需要维护者做一次例行审查。

- [Issue #8074 — Open bug with no linked fix](https://github.com/nearai/ironclaw/issues/8074)  
  新报告的提示文案 bug，尚未完成分类和指派。

- [PR #8075 — Embedded Pi sandbox loop startup default](https://github.com/nearai/ironclaw/pull/8075)  
  处于开放状态且依赖基础 PR；需要仔细跟踪，以免阻塞与基准测试相关的工作。

整体来看，项目状态健康：Telegram 接入引导相关 bug 正被积极修复并关闭；剩余开放项要么等待审查，要么存在依赖关系，要么刚刚完成分类。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-06

## 1. 今日概览

QwenPaw 的活跃度依然健康，但更多是 issue 驱动而非合并驱动：过去 24 小时内有 10 个 issue 被更新（7 个开放/活跃、3 个已关闭），4 个 PR 得到更新；没有 PR 被合并或关闭，也没有新版本发布。最热门的议题仍是即将推出的 **QwenPaw Hub 多租户版本**，issue #7318 已累计 23 条评论。缺陷分类处理也在进行中：3 个 issue 被关闭，其中包括两个 img-gen 技能 API 回归问题，以及一个自定义 provider 加载失败问题。当前没有可供总结的新版本发布；若干打开的 PR 仍在评审中——尤其是 8 月提出的 MCP 超时 PR，至今已等待近一个月。

## 2. 版本发布

该时间窗口内没有发布新的 QwenPaw 版本。最新发布版本的上下文仍指向近期 issue 报告中提到的 v2.1.0/v2.2.0 行为。今天没有可用的发布说明、迁移指南或破坏性变更通知。

## 3. 项目进展

过去 24 小时内**没有任何 PR 被合并或关闭**。4 个打开的 PR 得到更新，仍是项目当前活跃功能开发管线的代表：

- **#7509 — feat(skill): Update make-skill to v2**  
  [PR #7509](https://github.com/agentscope-ai/QwenPaw/pull/7509)  
  为可复用的工作区技能实现了一条审批驱动、基于脚本的“先草稿、后发布”工作流，提升了技能创作的可靠性。

- **#7569 — feat(modes): add Advisor Mode**  
  [PR #7569](https://github.com/agentscope-ai/QwenPaw/pull/7569)  
  新增一种对话级循环模式，将更强的 advisor 模型与更便宜的 worker 模型配对，并包含开场计划功能。

- **#6874 — feat(mcp): add configurable tool call timeout**  
  [PR #6874](https://github.com/agentscope-ai/QwenPaw/pull/6874)  
  自 8 月 10 日起一直处于评审中；该 PR 为每个 MCP 客户端增加了工具调用时限，可配置 `tool_call_timeout`，默认值为 300 秒。

- **#7486 — feat(creator) 1.1.2: runtime notification bus, async delegation, A/B compare, T2V/I2V/S2V scheduling**  
  [PR #7486](https://github.com/agentscope-ai/QwenPaw/pull/7486)  
  QwenPaw Creator 的大型应用插件更新，包含多时间线 A/B 对比、媒体提示词调度、锁定、Windows 加固与 Docker 部署。

## 4. 社区热门话题

社区讨论聚焦于平台演进与多用户场景。

- **#7318 — QwenPaw Hub 多租户版本将在 2.2.0 中推出：接下来我们应该构建什么？**  
  [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)  
  23 条评论 · 3 👍  
  这是目前最活跃的议题。其中提到的社区需求包括多用户访问、管理员可管理的技能，以及面向团队的部署。潜在需求很明确：QwenPaw 用户希望从个人助手式使用转向共享/团队部署，同时不失去现有的灵活性。

- **#7474 — `ModelInfo.max_tokens` 迁移后自定义 provider 加载失败（已关闭）**  
  [Issue #7474](https://github.com/agentscope-ai/QwenPaw/issues/7474)  
  5 条评论  
  该 issue 最初是对破坏性迁移提出的担忧，现已关闭——这表明 `max_tokens` → `max_output_length` 变更引发的兼容性问题已得到识别和解决。

- **#7557 — 功能：为技能增加版本与依赖元数据（`skill_pool`）**  
  [Issue #7557](https://github.com/agentscope-ai/QwenPaw/issues/7557)  
  2 条评论  
  一位管理 9 个智能体的集群运营者反馈，多个工作区中存在大量没有版本标识的技能副本，带来实际困扰。这是一个来自真实生产环境的信号：技能需要软件包式的元数据。

其他活跃 issue 各有 1 条评论，代表了明确的用户功能诉求，但 #7318 是社区最核心的讨论焦点。

## 5. 缺陷与稳定性

过去 24 小时内，有若干缺陷被报告或关闭。以下按严重程度大致排序：

- **高：#7576 — RetryChatModel 硬编码了 32768 context_size 回退值**  
  [Issue #7576](https://github.com/agentscope-ai/QwenPaw/issues/7576)  
  影响 v2.1.0 至 v2.2.0。该问题强制所有模型使用 32768 token 的上下文窗口，导致实际 token 预算更大时出现 `CONTEXT_UNFIT` 错误。该问题与模型无关，可能拖累多种工作流。目前尚未看到修复 PR。

- **中高：#7572 — 工具调度层吞掉了异常堆栈信息**  
  [Issue #7572](https://github.com/agentscope-ai/QwenPaw/issues/7572)  
  在 `qwenpaw/tool_calls/_coordinator.py` 中，`_drain()` 捕获所有异常后只将 `str(exc)` 返回给模型，既不调用 `logger.exception()`，也不重新抛出。这把诊断信息从日志中彻底抹去，使智能体故障排查变得极其困难。当前列表中没有修复 PR。

- **中：#7571 — “总是忘记”：记忆/路径约束未被遵守**  
  [Issue #7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)  
  Windows 2.2.0 用户报告在插件开发工作流中反复出现无法记住工作区/路径规则的问题——例如目标文件被写入错误目录，部署脚本随后又覆盖了错误的源代码树。这可能涉及记忆持久化或路径策略处理，而不只是一次简单的代码崩溃。

- **已关闭/已解决：#7474 — 自定义 provider 加载失败**  
  [Issue #7474](https://github.com/agentscope-ai/QwenPaw/issues/7474)  
  已关闭。与 `ModelInfo.max_tokens` 迁移相关。

- **已关闭/已解决：#7574 — img-gen 技能省略 model 字段，回退到 dall-e-2**  
  [Issue #7574](https://github.com/agentscope-ai/QwenPaw/issues/7574)  
  已关闭。`openai_images.py` 中的 API 请求体遗漏了模型名称，从而触发 HTTP 503 回退。

- **已关闭/已解决：#7575 — img-gen 技能 edit() 始终发送 response_format**  
  [Issue #7575](https://github.com/agentscope-ai/QwenPaw/issues/7575)  
  已关闭。无条件发送 `response_format` 导致 `gpt-image-2` 的 edit 端点返回 HTTP 400。

当前 PR 列表中没有直接关联上述开放缺陷的修复 PR，但三个已关闭的 issue 表明，维护者正在积极解决 img-gen 与 provider 兼容性回归问题。

## 6. 功能请求与路线图信号

这份数据集中可以观察到几个明显的路线图信号：

- **QwenPaw Hub / 多租户（#7318）**  
  已宣布将在 2.2.0 中推出。社区反馈强调多用户访问、管理员可管理的技能和团队部署。这是下一版本中最明确的功能方向。

- **技能的版本与依赖元数据（#7557）**  
  [Issue #7557](https://github.com/agentscope-ai/QwenPaw/issues/7557)  
  请求 `skill_pool` 支持版本、依赖关系以及工作区级修订追踪。随着 Make Skill v2 PR（#7509）的推进，技能工具链已经在演进；版本元数据是近期很可能加入的能力。

- **Web UI “编辑最后一条消息”与“回退（Rewind）”控件（#7573）**  
  [Issue #7573](https://github.com/agentscope-ai/QwenPaw/issues/7573)  
  用户希望在无需重新开始对话的情况下更正或回滚对话轮次。这是一项核心 UX 增强，很可能与现有的对话管理功能形成良好互补。

- **飞书流式卡片：自动折叠思考块（#7570）**  
  [Issue #7570](https://github.com/agentscope-ai/QwenPaw/issues/7570)  
  该 issue 提供了一个可用的本地补丁，通过 JSON 2.0 可折叠面板实现。由于这是针对飞书的独立 UI 优化，改动规模不大，可能很快合并。

- **Advisor Mode（#7569）**  
  这个打开的 PR 表明循环模式正在成为对话体验的结构性组成部分。若合并，它将为对成本敏感的用户提供双模型架构。

- **MCP 工具调用超时（#6874）**  
  该 PR 虽延宕已久，但对集成场景实际很重要。它为客户端配置调用截止时间，预计会出现在未来聚焦 MCP 的版本中。

## 7. 用户反馈摘要

今天用户表达的真实痛点：

- **破坏性变更可能破坏自定义配置**  
  #7474 自定义 provider 问题表明，像 `ModelInfo.max_tokens` → `max_output_length` 这样的迁移必须谨慎地应用到用户自定义的 provider 文件中。该 issue 虽然已关闭，但对兼容性的根本担忧依然成立。

- **图像生成技能回归令人沮丧**  
  两个已关闭的 img-gen issue（#7574、#7575）都涉及简单的 API 契约错误，却导致静默回退或 HTTP 400 响应。用户期望生成的图片使用已配置的模型，而不是回退到 `dall-e-2`。

- **智能体记忆在真实工作流中仍会失效**  
  #7571 描述了一个“总是忘记”约束的智能体：它记不住 TODO 文件应该写到哪里，也记不住哪个目录才是权威来源。用户正在进行包含多个工作区路径的插件开发，需要可靠的边界执行机制——这并非一个无足轻重的请求。

- **调试智能体错误太难**  
  #7572 本质上是一个可维护性抱怨：工具调度异常在没有任何日志的情况下消失。用户无法判断一次失败到底是由智能体、插件还是框架引起的。

- **协作/团队使用需求正在增长**  
  #7318 的高讨论量强烈表明，用户已经准备好迎接团队/多租户 Hub。该 issue 引用了此前对于多用户访问和管理员可管理技能的需求，因此这是一个可预期且经过社区验证的方向。

## 8. 待办事项观察

需要维护者关注的事项：

- **#6874 — MCP 工具调用超时 PR**  
  [PR #6874](https://github.com/agentscope-ai/QwenPaw/pull/6874)  
  自 2026-08-10 打开，约 27 天后仍处于评审中（Under Review）。这是一个具体、面向用户的功能，但看不到任何合并进展。需要维护者做出决定或给出反馈。

- **#7318 — QwenPaw Hub 路线图讨论**  
  [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)  
  该 issue 已有 23 条评论，社区投入度很高，需要维护者的官方回复或路线图清单。如果 2.2.0 即将发布，社区希望看到关于哪些 Hub 功能会率先落地的明确承诺。

- **#7557 — 技能版本/依赖元数据**  
  [Issue #7557](https://github.com/agentscope-ai/QwenPaw/issues/7557)  
  目前只有 2 条评论，但它描述了多智能体/多工作区技能集群面临的真实运维缺口。如果 QwenPaw Hub 吸引来更多此类集群运营者，这个问题可能会进一步放大。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-06

## 1. 今日概览

在 **v0.8.5** 发布（454 次提交、73 位贡献者）之后，ZeroClaw 正处在一个高速的稳定化与架构阶段。过去 24 小时内，项目共涉及 **42 个 issue**（34 个开启、8 个关闭）与 **50 个 PR**（40 个开启、10 个合并/关闭），贡献量依然强劲而持续。当前开启的队列可分为两大块：一侧是重量级架构 RFC——会话所有权（[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)）、文件/附件架构（[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)）、细粒度沙箱策略（[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)）；另一侧则是面向 Telegram、Matrix、Mattermost、Gemini、Anthropic 的渠道/提供商能力需求潮。现阶段的瓶颈是维护者评审与贡献者跟进，而不是贡献量本身：多个 RFC 仍滞留在 `needs-maintainer-review` 状态，另有一批体量较大、存在较久的 PR 被标记为 `blocked` / `do-not-merge` 或 `needs-author-action`。项目整体健康度良好，发布列车仍在前进，但决策队列已明显吃紧。

## 2. 版本发布

**[v0.8.5](https://github.com/zeroclaw-labs/zeroclaw/releases/tag/v0.8.5)** —— “面向安全、连接性与运维体验的发布，涵盖来自 **73 位贡献者**的 **454 次提交**。”

- 引入 **ZeroRelay** 与 **ZeroRouter**。
- 扩展了实时聊天与模型提供商能力。
- 加固了插件、沙箱、webhook、凭据与文件的边界。

数据中抓取到的描述信息已被截断，因此本摘要没有可用的显式 breaking-change 或迁移说明。鉴于其覆盖面之广（454 次提交横跨安全边界与连接性），运维者在升级前应完整阅读发布说明。这项有明确结束范围的每周稳定化跟踪（[#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)）与已关闭的 CI 验证 issue（[#10048](https://github.com/zeroclaw-labs/zeroclaw/issues/10048)），共同确认了 v0.8.5 稳定化工作线在此收官。

## 3. 项目进展

在报告窗口内转为 **合并/关闭** 的重点 PR：

- **[#10088 — fix(multimodal): 在源文件被移除后保留已附带图片](https://github.com/zeroclaw-labs/zeroclaw/pull/10088)** — 将图片附件标记持久化到内容寻址的工作区副本上，使后续对话轮次不再依赖原始文件；同时对反复出现的缺图告警加以频次限制。由此解决了长期未决的 issue [#10045](https://github.com/zeroclaw-labs/zeroclaw/issues/10045)。
- **[#10435 — fix(providers): 锚定 Gemini 请求时保留模型上下文](https://github.com/zeroclaw-labs/zeroclaw/pull/10435)** — 一个小而聚焦的 bug 修复，给 Gemini 请求结构正确性问题收尾。
- **[#10064 — fix(channels/telegram): 操作者点击后自动销毁审批卡片](https://github.com/zeroclaw-labs/zeroclaw/pull/10064)** — 大型（XL）Telegram 修复：审批卡片现在会在点击时 resolve 对应的 oneshot、收起内联 spinner 并重写提示文本，从而防止陈旧交互 bug。

已关闭的 issue 则进一步推进了稳定性与发布就绪性：

- [#9593](https://github.com/zeroclaw-labs/zeroclaw/issues/9593) — 运行时重构，使 `TaskRecord` 成为后台委托的唯一生命周期所有者（已关闭）。
- [#7910](https://github.com/zeroclaw-labs/zeroclaw/issues/7910) — Windows 自更新的 swap/回滚/sidecar 测试覆盖后续事项（已关闭）。
- [#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911) — `install.sh` 在 Android/Termux 上误用通用 Linux 二进制的 bug（已关闭）。
- [#10282](https://github.com/zeroclaw-labs/zeroclaw/issues/10282) — 硬件 `probe` 功能现已能正确触达工具实现（已关闭）。

## 4. 社区热门话题

最活跃的讨论都处于架构层面，目前仍未解决：

- **[#9487 — RFC: 运行时持有的对话会话与传输面适配器](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** — 33 条评论；第 5 版实质上取代了第 4 版的投票快照，这意味着维护者必须先开启新的讨论窗口，再重新投票。
- **[#9488 — RFC: 统一文件与附件架构](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** — 26 条评论；第 10 版同样让上一版投票快照失效。
- **[#6808 — RFC: 工作泳道、看板自动化与标签清理](https://github.com/zeroclaw-labs/zeroclaw/issues/6808)** — 24 条评论；该治理类 RFC 现已获批/在推进中，已迭代至 Rev 26。
- **[#6996 — RFC: 细粒度沙箱策略：文件系统限制](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — 24 条评论；针对应用层路径准入与操作系统沙箱后端（Bubblewrap/Landlock/Seatbelt）之间的策略漂移问题。
- **[#8692 — Tracker: 维护者决策队列](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 15 条评论；这是 RFC 接受、推迟与拆分后续事项的核心队列。
- **[#10050 — RFC: 经网关进行原样渠道发送](https://github.com/zeroclaw-labs/zeroclaw/issues/10050)** — 14 条评论；指出网关目前挂载了 **47 条不同的 `/api/*` 路径**，但没有一条支持操作者发起的原样（verbatim）渠道发送。
- **[#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822) / [#9975](https://github.com/zeroclaw-labs/zeroclaw/issues/9975) / [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)** — 13 / 13 / 9 条评论：WASM 插件观察者（observer）订阅、`web_dist_dir` 守护进程兼容性契约、可组合的 WASM 运行时架构。

**深层需求：** 社区正在积极收敛核心数据面架构（会话所有权、文件模型、事件历史），然后再在其上堆叠更多渠道与工具。“第 N 版替换第 N-1 版投票快照”这一模式的反复出现，也暴露出真实的民主化流程摩擦——该问题本身正由 RFC 流程改革（[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)）来处理。

## 5. Bug 与稳定性

过去 24 小时内仍活跃的 bug，按严重程度排序：

- **[S1 — #10536: macOS Seatbelt 对 shell 命令忽略已配置的 `allowed_roots`](https://github.com/zeroclaw-labs/zeroclaw/issues/10536)** — P1、`in-progress`、workflow-blocked。应用层安全策略能识别 `allowed_roots`，但 shell 命令仍会得到 `Operation not permitted`。目前还没有修复 PR。

- **[P1 — #10533: `model_routing_config` 拒绝 `custom.*` 提供商槽位](https://github.com/zeroclaw-labs/zeroclaw/issues/10533)** — 工具侧校验与配置 schema 不一致，导致完全受支持的自定义提供商（如 `custom.truefoundry`）被阻断。`in-progress`。

- **[P2/高 — #10534: 受限委托会静默剥离 `delegate` 工具](https://github.com/zeroclaw-labs/zeroclaw/issues/10534)** — 与 `delegation_policy` / `max_delegation_depth` 配置相矛盾；属于静默移除能力。

- **[S2 — #10625: 内部 `[media attachment]` 占位符在非视觉模型上被传递给用户](https://github.com/zeroclaw-labs/zeroclaw/issues/10625)** — 降级路径上出现用户可见的内部标记泄漏。

- **[S2 — #10626: TTS 会原样合成 Markdown 与 emoji](https://github.com/zeroclaw-labs/zeroclaw/issues/10626)** — 在自托管部署中，语音回复会把 Markdown 标记与 emoji 名称读出来。

- **[S2 — #10532: 降级配置的自动修复可能调用与运行中守护进程不同的二进制](https://github.com/zeroclaw-labs/zeroclaw/issues/10532)** — 已有修复 PR：[#10630](https://github.com/zeroclaw-labs/zeroclaw/pull/10630) 现在会把修复告警绑定到当前运行的可执行文件上。

- **[S3 — #10585: 新的 log-sink 测试在并行运行器下使迁移测试回归](https://github.com/zeroclaw-labs/zeroclaw/issues/10585)** — 全局追踪锁竞争；仅影响测试基础设施。

稳定性方面也有好消息：多模态源路径 bug（[#10045](https://github.com/zeroclaw-labs/zeroclaw/issues/10045)，经 [#10088](https://github.com/zeroclaw-labs/zeroclaw/pull/10088) 修复）、Android/Termux 安装程序问题（[#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911)）以及硬件 probe 无法触达工具实现的问题（[#10282](https://github.com/zeroclaw-labs/zeroclaw/issues/10282)）均已被解决。

## 6. 功能需求与路线图信号

**下一版本（v0.8.6）的潜在候选** —— 目前已在 `master` 上被接受/处于进行中的工作：

- **[#10450 — 通过 SSE 流式推送 webhook 聊天轮次](https://github.com/zeroclaw-labs/zeroclaw/pull/10450)** — 在 `POST /webhook` 上提供可选的 `stream: true` + `Accept: text/event-stream` 支持。
- **[#10411 — 串行化同一会话的渠道消息](https://github.com/zeroclaw-labs/zeroclaw/pull/10411)** — 防止同一对话会话中出现并发运行；对正确性体验很重要。
- **[#9320 — 为 cron 代理任务设置墙钟超时](https://github.com/zeroclaw-labs/zeroclaw/pull/9320)** — 将任务运行绑定到 `agentic_timeout_secs`，并释放锁。
- **[#10407 — 持久化的会话提示词附件](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)** — 基于 SQLite，为每个聊天会话提供可持久保存的提示词附件。

**社区功能需求：**

- **[#10641 — Web UI 中 cron 计划的逐字段输入](https://github.com/zeroclaw-labs/zeroclaw/issues/10641)** — 9 月 5 日提交；用经过校验的逐字段输入取代自由格式 cron 文本。这是一个低成本、高价值的 UX 改进，很可能很快发布。
- **[#10530 — Anthropic 扩展思考在 OpenAI 兼容网关上的透传](https://github.com/zeroclaw-labs/zeroclaw/issues/10530)** — 解决扩展思考在 LiteLLM/TrueFoundry/proxy 路径上被静默不可用的问题。

**架构信号：** 已接受但仍在等待实现的 RFC 包括：原样渠道发送（[#10050](https://github.com/zeroclaw-labs/zeroclaw/issues/10050)）、WASM 插件观察者订阅（[#7822](https://github.com/zeroclaw-labs/zeroclaw/issues/7822)）、web-bundle/守护进程兼容性（[#9975](https://github.com/zeroclaw-labs/zeroclaw/issues/9975)）与单工具提供商轮次（[#10222](https://github.com/zeroclaw-labs/zeroclaw/issues/10222)）。更大的战略主线是 **append-only 会话事件历史与确定性重放**（[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)），它现在已成为事件词汇的唯一权威，并很可能在 v0.9 中重塑运行时。

## 7. 用户反馈摘要

数据中可见的真实用户痛点：

- Android/Termux 的采用曾被有缺陷的安装程序二进制选择（[#7911](https://github.com/zeroclaw-labs/zeroclaw/issues/7911)）所阻碍——现已关闭，为移动端/设备端用户扫除了一大障碍。
- Telegram 群组协作是热门用例，但目前支持不足：用户希望获得按用户区分的会话（[#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772)）、被动式群组上下文（[#10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640)）和安全模型选择器（[#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)）。
- 语音/TTS 用户正在积极部署 TTS，但遇到了质量问题：Markdown/emoji 会被朗读出来（[#10626](https://github.com/zeroclaw-labs/zeroclaw/issues/10626)），Matrix 语音则没有任何诊断信息地静默不受支持（[#10489](https://github.com/zeroclaw-labs/zeroclaw/pull/10489)）。
- Cron 高级用户希望有安全护栏：未经校验的自由格式表达式造成了使用摩擦（[#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641)）。
- 沙箱策略的不一致削弱了对安全保证的信任：macOS 会忽略 `allowed_roots`（[#10536](https://github.com/zeroclaw-labs/zeroclaw/issues/10536)），且文件系统策略在各层之间存在漂移（[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)）。

满意度信号虽然间接，但整体积极：社区大规模参与 RFC 修订，第一方维护者接手贡献者 PR（例如 [#10435](https://github.com/zeroclaw-labs/zeroclaw/pull/10435)），再加上活跃的治理改革，都说明贡献者群体参与度高，也愿意在流程上投入。

## 8. 积压观察

需要维护者处理、或已暴露出搁置过久风险的事项：

**处于 `needs-maintainer-review` 状态的 RFC（按开启最久者优先）：**

- [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) — 细粒度沙箱策略，自 5 月 28 日起开启。
- [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — 运行时持有的会话，自 7 月 28 日起开启，现为第 5 版。
- [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — 统一文件/附件架构，自 7 月 28 日起开启，现为第 10 版。
- [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) — 可组合的 WASM 插件运行时，自 8 月 18 日起开启。
- [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) — 会话事件历史/重放权威，自 9 月 1 日起开启。
- [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC 流程简化，自 9 月 2 日起开启。

**等待维护者决策或依赖解决的 Blocked / `do-not-merge` PR：**

- [#9420](https://github.com/zeroclaw-labs/zeroclaw/pull/9420) — Anthropic 已存储的 OAuth 配置文件（自 7 月 26 日起开启）。
- [#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772) — Telegram `per_user_session` 开关（自 8 月 5 日起开启）。
- [#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997) — Telegram 安全模型选择器（自 8 月 14 日起开启）。
- [#10356](https://github.com/zeroclaw-labs/zeroclaw/pull/10356) — AnySearch 网页搜索提供商（自 8 月 25 日起开启）。
- [#10358](https://github.com/zeroclaw-labs/zeroclaw/pull/10358) — Mattermost 审批提示（自 8 月 25 日起开启）。

**较早且处于 `needs-author-action` 的大型 PR：** [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447)（Anthropic 不完整的终态响应，自 7 月 27 日起）、[#9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320) 与 [#9272](https://github.com/zeroclaw-labs/zeroclaw/pull/9272)（均自 7 月 23 日起），另有等待作者修订的 [#10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401)、[#10411](https://github.com/zeroclaw-labs/zeroclaw/pull/10411)、[#10450](https://github.com/zeroclaw-labs/zeroclaw/pull/10450) 和 [#10630](https://github.com/zeroclaw-labs/zeroclaw/pull/10630)。如果作者没有回应，维护者可能需要采用 close-and-reopen 或重新指派的方式，让队列继续保持流动。

**维护者决策队列跟踪器（[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)）** 仍是跟进上述所有事项的权威位置；它本身每日更新，目前列有 15 项以上需要代码所有者处理的事项。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*