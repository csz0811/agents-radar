# OpenClaw 生态日报 2026-09-12

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-12 00:36 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-12

**数据快照：** 过去 24 小时更新了 500 个 issue（271 个开启/活跃，229 个已关闭）；过去 24 小时更新了 500 个 PR（274 个开启，226 个已合并/关闭）；1 个新版本。数据集中未提供 PR 评论数，因此以下 PR 热点按新近度、严重程度和维护者就绪度选取，而非评论量。

## 1. 今日概览

OpenClaw 仍然是一个高吞吐项目：过去 24 小时内，近一半更新过的 issue 和 PR 已关闭或合并，表明问题分诊和维护者活动强劲。然而，主要主题是围绕 2026.9.x 更新和迁移路径的稳定性，尤其是回滚安全性、handoff 租约、Doctor 迁移、会话 transcript 对账以及 Gateway 事件循环阻塞。新版本 [v2026.9.4](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4) 改进了从兼容的失败更新中恢复的能力，但紧随其后的报告显示，仍有发布阻塞的边缘情况，包括 [Issue #144742](https://github.com/openclaw/openclaw/issues/144742) 和 [Issue #145192](https://github.com/openclaw/openclaw/issues/145192)。总体健康状况为喜忧参半偏正面：维护者正在积极修复并关闭高影响 bug，但项目仍承担着显著的发布工程和会话状态风险。

## 2. 发布

### v2026.9.4
- **发布链接：** [openclaw/openclaw v2026.9.4](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4)
- **亮点：** 通过保留上一个软件包，并在 schema 和配置检查证明回滚安全时，使用先前的配置和服务将其恢复，从而从兼容的失败更新中恢复。数据库迁移仍需要经过验证的更新前备份。参考：`#140339`。
- **破坏性变更：** 提供的发布片段中未明确列出。
- **迁移说明：** 只有在 schema/配置检查后，兼容性失败才被视为可安全回滚。除非存在经过验证的更新前备份，否则数据库迁移不在此列。
- **观察到的发布风险：**
  - [Issue #144742](https://github.com/openclaw/openclaw/issues/144742) — 据报道 `2026.9.4` 发布时未包含 `#144208`；保留的 version-1 handoff 租约行可能导致每次配置写入都失败。
  - [Issue #145192](https://github.com/openclaw/openclaw/issues/145192) — `2026.9.2 → 2026.9.4` 托管更新在候选 Doctor 阶段因活跃的 v1 handoff 租约而失败，然后回滚到已迁移状态。
  - [Issue #144712](https://github.com/openclaw/openclaw/issues/144712) — 已关闭：npm 更新在“global install swap”处失败；完整的回滚被错误报告为“recovery is unverified”。

## 3. 项目进展

- **吞吐量：** 过去 24 小时内合并/关闭了 226 个 PR，关闭了 229 个 issue，表明尽管存在大量积压，维护速度仍然强劲。
- **已关闭 PR 亮点：**
  - [PR #145376](https://github.com/openclaw/openclaw/pull/145376) — Doctor 现在会在跳过旧版审计日志恢复后继续执行，而不是作为拒绝而停止。
  - [PR #145441](https://github.com/openclaw/openclaw/pull/145441) — 将会话测试类型检查保持在分片限制以下，修复了 CI 边界失败。
- **表明已修复/清理的已关闭 issue 亮点：**
  - [Issue #144712](https://github.com/openclaw/openclaw/issues/144712) — npm 更新回滚失败已关闭。
  - [Issue #140908](https://github.com/openclaw/openclaw/issues/140908) — systemd 用户服务下 Doctor/gateway 状态 EACCES 已关闭。
  - [Issue #137377](https://github.com/openclaw/openclaw/issues/137377) — Windows Doctor 最终重启失败已关闭。
  - [Issue #140971](https://github.com/openclaw/openclaw/issues/140971) — 消息驱动运行中 Feishu 插件工具被静默丢弃已关闭。
  - [Issue #140821](https://github.com/openclaw/openclaw/issues/140821) — `2026.9.2` 之后 Gateway 重启挂起已关闭。
  - [Issue #49876](https://github.com/openclaw/openclaw/issues/49876) — 工具失败时 Cron 会话交付幻觉输出已关闭。
- **推进可能的下一个修复/功能的开放 PR：**
  - [PR #145430](https://github.com/openclaw/openclaw/pull/145430) — 将仅路由代码排除在启动 bundle 之外。
  - [PR #145282](https://github.com/openclaw/openclaw/pull/145282) — 更新期间保留 macOS 启动器权限。
  - [PR #144954](https://github.com/openclaw/openclaw/pull/144954) — 仅通过工作区读取加载手动个人技能。
  - [PR #145439](https://github.com/openclaw/openclaw/pull/145439) — 按模型目录请求为 thinking 查找建立索引。
  - [PR #145382](https://github.com/openclaw/openclaw/pull/145382) — 支持公共 `gpt-live-1` 语音会话。
  - [PR #145415](https://github.com/openclaw/openclaw/pull/145415) — 显示软件包图标，而不是生成的插件图稿。

## 4. 社区热点

### 最活跃的 issue
- [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) — 17 条评论。同步 agent 持久化和 transcript 维护在规模扩大时阻塞 Gateway 事件循环。**需求：** 异步/可扩展的持久化架构。
- [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) — 15 条评论。未回收的 hook/工具子进程导致僵尸进程累积和运行时退化。**需求：** 稳健的子进程生命周期管理。
- [Issue #96834](https://github.com/openclaw/openclaw/issues/96834) — 15 条评论。WhatsApp 1:1 入站图片在处理前会卡住主通道约 3 分钟。**需求：** 多模态排队和会话状态修复。
- [Issue #140620](https://github.com/openclaw/openclaw/issues/140620) — 12 条评论。就地升级 transcript 对账导入一些会话后停滞；升级前的会话变得无法找到。**需求：** 可靠的 transcript 迁移/搜索。
- [Issue #144712](https://github.com/openclaw/openclaw/issues/144712) — 12 条评论，已关闭。npm 更新在 global install swap 处失败，而回滚报告未经验证的恢复。**需求：** 更安全的更新回滚报告。
- [Issue #127148](https://github.com/openclaw/openclaw/issues/127148) — 12 条评论。Codex `sessions.compact` 获取第二个 app-server 并遇到活跃写入者冲突。**需求：** 正确的会话所有权/压缩。
- [Issue #142585](https://github.com/openclaw/openclaw/issues/142585) — 12 条评论。Doctor 拒绝有效的旧版工作区设置和 attestation 导入。**需求：** 与旧版状态的迁移兼容性。
- [Issue #49876](https://github.com/openclaw/openclaw/issues/49876) — 12 条评论，已关闭。当工具调用失败时，Cron 会话交付幻觉输出，而不是干净地失败。**需求：** 工具失败时的信任/安全行为。
- [Issue #40786](https://github.com/openclaw/openclaw/issues/40786) — 12 条评论。向备份 CLI 添加类似 `.gitignore` 的排除模式。**需求：** 备份大小控制与敏感文件排除。

### 值得关注的活跃 PR
- [PR #136687](https://github.com/openclaw/openclaw/pull/136687) — 已保存的 gateway 账户切换；已标记兼容性/安全风险。
- [PR #145282](https://github.com/openclaw/openclaw/pull/145282) — 更新期间保留 macOS 启动器权限。
- [PR #144954](https://github.com/openclaw/openclaw/pull/144954) — 仅工作区读取下的手动个人技能。
- [PR #145382](https://github.com/openclaw/openclaw/pull/145382) — 公共 GPT-Live-1 语音会话。
- [PR #145190](https://github.com/openclaw/openclaw/pull/145190) — 登录后发现账户模型。
- [PR #144169](https://github.com/openclaw/openclaw/pull/144169) — 将会话共享谓词应用于 read-by-key RPC。
- [PR #145444](https://github.com/openclaw/openclaw/pull/145444) — 恢复由会话键指定的回复所有者。

**底层需求：** 用户和维护者正共同关注更新可靠性、会话状态完整性、规模化下的 Gateway 性能、更安全的插件/沙箱边界，以及当迁移或渠道交付失败时更清晰的恢复路径。

## 5. Bug 与稳定性

### P0 / 发布阻塞
- [Issue #144742](https://github.com/openclaw/openclaw/issues/144742) — `2026.9.4` 缺少 `#144208`；保留的 v1 handoff 租约行导致每次配置写入都失败。**发布阻塞。**
- [Issue #145192](https://github.com/openclaw/openclaw/issues/145192) — `2026.9.2 → 2026.9.4` 托管更新在候选 Doctor 阶段失败，然后回滚到已迁移状态。
- [Issue #140620](https://github.com/openclaw/openclaw/issues/140620) — 升级 transcript 对账停滞；升级前的会话无法找到。
- [Issue #142585](https://github.com/openclaw/openclaw/issues/142585) — Doctor 拒绝有效的旧版工作区设置和 attestation 导入。
- [Issue #136203](https://github.com/openclaw/openclaw/issues/136203) — Windows de-DE 升级后 Doctor 维护被阻塞；修复方案清晰/可排队。
- [Issue #135776](https://github.com/openclaw/openclaw/issues/135776) — `openclaw update` 将精确锁定的官方渠道插件留在上一个版本。
- [Issue #125333](https://github.com/openclaw/openclaw/issues/125333) — `totalTokens` 膨胀在 `2026.8.1-beta.2` 上仍可复现。
- [Issue #123326](https://github.com/openclaw/openclaw/issues/123326) — 显式多 agent Codex 迁移导致 Gateway 启动崩溃循环。
- [Issue #142394](https://github.com/openclaw/openclaw/issues/142394) — `update.run` 到 `2026.9.3` 在关闭期间导致 EPIPE，并且不会自动重启。
- [Issue #144678](https://github.com/openclaw/openclaw/issues/144678) — iOS 手动 Gateway 主机方案会静默禁用 Connect。

### P1 / 崩溃循环、消息丢失、会话状态损坏
- [Issue #144911](https://github.com/openclaw/openclaw/issues/144911) — stdio MCP 服务器初始化超时通过未处理的 rejection 使 Gateway 崩溃。修复方案清晰/可排队。
- [Issue #142476](https://github.com/openclaw/openclaw/issues/142476) — cron 会话回收器使用同步 `PRAGMA integrity_check` 打开每个 agent DB，阻塞事件循环 14–76 秒。修复方案清晰/可排队。
- [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) — 同步 agent 持久化在规模扩大时阻塞 Gateway 事件循环。
- [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) — 未回收的 hook/工具子进程导致僵尸进程累积。
- [Issue #96834](https://github.com/openclaw/openclaw/issues/96834) — WhatsApp 图片在处理前卡住主通道约 3 分钟。
- [Issue #127148](https://github.com/openclaw/openclaw/issues/127148) — Codex `sessions.compact` 遇到活跃写入者冲突。
- [Issue #141252](https://github.com/openclaw/openclaw/issues/141252) 和 [Issue #139847](https://github.com/openclaw/openclaw/issues/139847) — `2026.9.2` 回归：回复运行失败并显示“no active tool authority snapshot”；消息被丢弃。修复方案清晰/可排队。
- [Issue #126246](https://github.com/openclaw/openclaw/issues/126246) — Telegram 持久出站交付卡在 `send_attempt_started`。
- [Issue #144809](https://github.com/openclaw/openclaw/issues/144809) — 超过 `RUN_STALE_TAKEOVER_MS` 的 claude-cli 轮次会丢失生成的回复。
- [Issue #145266](https://github.com/openclaw/openclaw/issues/145266) — Git/dev Doctor 从 npm 刷新 Codex，并遮蔽重新构建的捆绑插件。
- [Issue #137294](https://github.com/openclaw/openclaw/issues/137294) — 预检压缩被更短的入口采纳看门狗中止。修复方案清晰/可排队。
- [Issue #121187](https://github.com/openclaw/openclaw/issues/121187) — 让出的请求者完成重试有意为之的 `NO_REPLY`。

### 今日修复/关闭
- [Issue #144712](https://github.com/openclaw/openclaw/issues/144712) — npm 更新回滚失败已关闭。
- [Issue #144581](https://github.com/openclaw/openclaw/issues/144581) — Windows 更新格式错误的 canary 路径已关闭。
- [Issue #140908](https://github.com/openclaw/openclaw/issues/140908) — systemd 用户服务下 Doctor/gateway EACCES 已关闭。
- [Issue #137377](https://github.com/openclaw/openclaw/issues/137377) — Windows Doctor 最终重启失败已关闭。
- [Issue #140821](https://github.com/openclaw/openclaw/issues/140821) — `2026.9.2` 之后 Gateway 重启挂起已关闭。
- [Issue #140971](https://github.com/openclaw/openclaw/issues/140971) — Feishu 插件工具被丢弃已关闭。
- [Issue #49876](https://github.com/openclaw/openclaw/issues/49876) — 工具失败时 Cron 幻觉输出已关闭。

## 6. 功能请求与路线图信号

- [Issue #40786](https://github.com/openclaw/openclaw/issues/40786) — 备份 CLI 的类似 `.gitignore` 排除模式。强烈的隐私/大小需求；仍然开放，需要产品/安全审查。
- [Issue #93120](https://github.com/openclaw/openclaw/issues/93120) — 可配置的 Gemini TPM/RPM 速率限制重试行为。
- [Issue #132601](https://github.com/openclaw/openclaw/issues/132601) — 在插件 SDK 文档中澄清安全的生成视频 URL 实体化。
- [Issue #124759](https://github.com/openclaw/openclaw/issues/124759) — 启用“显示推理和工具活动”时 iOS 应用卡顿。
- 已关闭但具有信号意义：[Issue #9016](https://github.com/openclaw/openclaw/issues/9016) OpenRouter 成本暴露，[Issue #79168](https://github.com/openclaw/openclaw/issues/79168) 基于内容的提示注入扫描，[Issue #117703](https://github.com/openclaw/openclaw/issues/117703) 持久化失败工具日志，[Issue #92367](https://github.com/openclaw/openclaw/issues/92367) 作用域绑定的 gateway 认证令牌。
- 来自活跃 PR 的可能下一版本候选：更安全的更新回滚和 macOS 权限 ([PR #145282](https://github.com/openclaw/openclaw/pull/145282))、GPT-Live-1 语音支持 ([PR #145382](https://github.com/openclaw/openclaw/pull/145382))、登录后模型发现 ([PR #145190](https://github.com/openclaw/openclaw/pull/145190))、Control UI 启动稳定性 ([PR #145430](https://github.com/openclaw/openclaw/pull/145430))、LaTeX 渲染 ([PR #144324](https://github.com/openclaw/openclaw/pull/144324))，以及仪表板子会话固定 ([PR #143719](https://github.com/openclaw/openclaw/pull/143719))。

**预测：** 下一个版本很可能是一个稳定化补丁，重点在更新/回滚、Doctor/迁移兼容性、Gateway 事件循环性能、会话 transcript 恢复，以及 Control UI/启动可靠性。如果兼容性/安全性证明完成，诸如 GPT-Live-1 语音、已保存的 gateway 账户切换和更丰富的 UI 渲染等功能工作可能会落地。

## 7. 用户反馈摘要

用户反复报告升级方面的痛点：npm/global install swap、Windows 和 macOS 更新器失败、systemd 用户服务权限检查、插件/核心版本偏差，以及 Doctor 迁移拒绝有效的旧版状态。会话状态问题也很突出：transcript 变得无法找到、回复被丢弃、长 claude-cli 轮次丢失输出、Telegram/WhatsApp 交付卡住，以及 Codex 会话压缩冲突。在规模扩大时，用户报告 Gateway 事件循环停顿、同步 DB/PRAGMA 工作和僵尸子进程累积。安全和隐私请求仍然可见：提示注入扫描、备份排除模式、作用域化的 gateway 令牌，以及更安全的插件生成媒体处理。满意度信号喜忧参半：维护者正在关闭许多高评论 bug 并排队修复，但围绕 `2026.9.x` 的频繁发布阻塞回归正在削弱对更新安全性的信心。

## 8. 积压观察

- [Issue #40786](https://github.com/openclaw/openclaw/issues/40786) — 备份排除模式，创建于 2026-03-09；P2，需要产品/安全决策。
- [Issue #96834](https://github.com/openclaw/openclaw/issues/96834) — WhatsApp 图片通道卡住，创建于 2026-06-25；P1，15 条评论。
- [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) — 僵尸子进程，创建于 2026-06-29；P1，15 条评论。
- [Issue #94716](https://github.com/openclaw/openclaw/issues/94716) — Anthropic claude-cli 过期的 user-agent bearer 认证，创建于 2026-06-19；P1，关联 PR 开放。
- [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) — 同步 agent 持久化阻塞 Gateway 事件循环，创建于 2026-08-05；P1，17 条评论。
- [Issue #123326](https://github.com/openclaw/openclaw/issues/123326) — 多 agent Codex 迁移崩溃循环，创建于 2026-08-13；P0。
- [Issue #125333](https://github.com/openclaw/openclaw/issues/125333) — `totalTokens` 膨胀，创建于 2026-08-17；P0，关联 PR 开放。
- [Issue #126246](https://github.com/openclaw/openclaw/issues/126246) — Telegram 出站交付卡住，创建于 2026-08-19；P1。
- [Issue #127148](https://github.com/openclaw/openclaw/issues/127148) — Codex `sessions.compact` 活跃写入者冲突，创建于 2026-08-21；P1。
- [Issue #135776](https://github.com/openclaw/openclaw/issues/135776) — 更新时插件/核心版本偏差，创建于 2026-09-02；P0。
- [Issue #136203](https://github.com/openclaw/openclaw/issues/136203) — Windows Doctor 升级后被阻塞，创建于 2026-09-02；P0，可排队修复。
- [Issue #137294](https://github.com/openclaw/openclaw/issues/137294) — 预检压缩被入口看门狗中止，创建于 2026-09-03；P1，可排队修复。
- [PR #120781](https://github.com/openclaw/openclaw/pull/120781) — 在 Doctor 中恢复省略的历史 transcript，创建于 2026-08-08；P1，需要证明。
- [PR #127983](https://github.com/openclaw/openclaw/pull/127983) — 当被覆盖的快照无法写入时拒绝配置自动恢复，创建于 2026-08-22；P1，等待作者。
- [PR #136687](https://github.com/openclaw/openclaw/pull/136687) — 已保存的 gateway 账户切换，创建于 2026-09-02；P2，需要兼容性/安全性证明。
- [PR #144169](https://github.com/openclaw/openclaw/pull/144169) — 会话 read-by-key 共享谓词，创建于 2026-09-10；与安全边界相关。
- [PR #145190](https://github.com/openclaw/openclaw/pull/145190) — 登录后的模型发现，创建于 2026-09-11；P2，等待作者。

---

---

## 横向生态对比

# 跨项目对比报告 — 个人 AI 助手 / Agent 开源生态
**快照日期：** 2026-09-12 | **项目：** OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态概览

个人 AI 助手 / Agent 开源领域正分化为三个层级：一个超大规模参考实现（OpenClaw），其活跃面比任何同类项目大一个数量级；一个中间层，由高速迭代、有明确主张的 agent（Hermes Agent、ZeroClaw）组成，在 profile 隔离、身份和 provider 可靠性上竞争；以及一个快速增长的产品级群体（QwenPaw），推动桌面/移动端 UX 和多租户团队版。本快照中所有活跃项目的共同主题不再是原始能力，而是**运维信任**：安全更新与回滚、并发下的会话/状态完整性、凭证与 profile 作用域、prompt 缓存正确性，以及显式故障暴露。与此同时，在高活跃度一端，治理和审查延迟已成为硬约束——ZeroClaw 合并了 50 个更新 PR 中的 3 个，而 OpenClaw 尽管在 24 小时内关闭了 226 个，仍带有多个 P0 发布阻塞问题。市场正收敛到共同的功能基线（多渠道、MCP、技能、子代理、记忆），因此差异化正转向**可靠性工程、隔离保证和部署人体工学**。

---

## 2. 活动对比

*健康评分是分析师综合评分（0–10），基于分诊吞吐量、发布节奏、未解决风险严重程度和维护者响应速度得出；并非项目公布的指标。*

| 项目 | 问题更新（24h） | PR 更新（24h） | 发布状态 | 估计健康度 |
|---|---|---|---|---|
| **OpenClaw** | 500 (271 未解决 / 229 已关闭) | 500 (274 未解决 / 226 已合并) | **v2026.9.4** 已发布，仍有未解决的 P0 后续问题 | **7.0** — 好坏参半偏正面；分诊强劲，发布工程有风险 |
| **Hermes Agent** | 50 (18 已关闭) | 50 (8 已合并/关闭) | **v2026.9.11 / v0.21.2** 热修复 | **6.5** — 响应及时；P1 `state.db` 损坏问题仍开放 |
| **IronClaw** | 0 | 1 (未解决，0 已合并) | 无 | **N/A** — 数据不足；休眠 |
| **QwenPaw** | 21 (约 6 已解决) | 41 (18 已落地/关闭) | **v2.2.1 Stable** 已提升 | **7.0** — 吞吐健康；核心运行时 bug 仍开放 |
| **ZeroClaw** | 50 (39 未解决 / 11 已关闭) | 50 (47 未解决 / 3 已合并) | 无 | **6.0** — 高活跃度，受审查带宽限制（94% PR 仍开放） |

**解读表格：** OpenClaw 的关闭比例（约 46% 问题，约 45% PR）表明在规模下具有真实的分诊速度。QwenPaw 约 44% 的 PR 关闭比例加上稳定版本，是最强的“每次合并即发布”信号。ZeroClaw 的失衡（47/50 PR 开放）和 Hermes 的低合并比例（8/50）都指向**审查带宽**，而非贡献者供给，才是瓶颈。

---

## 3. OpenClaw 的定位

**与同类相比的优势**
- **规模：** 在每日问题和 PR 上，约为 OpenClaw 最接近同类的 10 倍（500 vs 50）。这带来更快的 bug 发现和更宽的修复漏斗。
- **渠道广度：** WhatsApp、Telegram、飞书、类 Slack 界面、iOS、语音 (`gpt-live-1`) 和插件工具——比 Hermes（仪表盘/桌面）、IronClaw（以 Slack 为中心）、QwenPaw（控制台/Telegram）或 ZeroClaw（Telegram/ZeroCode/ACP）更广。
- **发布工程成熟度：** 是该集合中唯一具有文档化、安全门控回滚路径的项目（[v2026.9.4](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4)）——schema/配置验证和备份门控的 DB 迁移。这是一个真正的差异化优势。

**技术路线差异**
- Node/npm 分发，带全局安装切换、macOS 启动器权限、systemd 用户服务集成——一种与 OS 集成的长期运行 Gateway 模型。
- 架构是**以 Gateway 为中心**，带事件循环、路由启动包（[PR #145430](https://github.com/openclaw/openclaw/pull/145430)）和多通道处理。事件循环既是其优势（统一投递），也是其系统性风险（[#119720](https://github.com/openclaw/openclaw/issues/119720)、[#142476](https://github.com/openclaw/openclaw/issues/142476)）。
- 对比：Hermes 在 SQLite（`state.db` WAL）上使用 profile 作用域的多路复用；ZeroClaw 是一个 Rust 二进制，带 `RpcDispatcher` 和显式栈预算考量——一种更低层、内存敏感的设计。

**社区规模对比**
OpenClaw 的评论量（热门问题上 15–17 条）比 Hermes 和 ZeroClaw（5–15）以及 QwenPaw（3–26）高一个数量级。Hermes 有一个离群值——Skills Hub watchdog 的 **199 条评论**（[#66616](https://github.com/NousResearch/hermes-agent/issues/66616)）——但那是一个单一的服务降级线程，而非持续的广度。OpenClaw 是事实上的参考实现；其他项目正*向*其模式收敛，而非定义替代方案。

**主要风险：** 自身 2026.9.x 系列内的发布阻塞回归（[#144742](https://github.com/openclaw/openclaw/issues/144742)、[#145192](https://github.com/openclaw/openclaw/issues/145192)、[#135776](https://github.com/openclaw/openclaw/issues/135776)）。规模同时放大了发现和影响范围。

---

## 4. 共同技术焦点领域

| 需求 | 项目 | 具体需求 |
|---|---|---|
| **并发下的会话/状态完整性** | OpenClaw, Hermes, QwenPaw, ZeroClaw | 单写入者/SQLite WAL 门控 (Hermes [#103339](https://github.com/NousResearch/hermes-agent/issues/103339))；异步持久化移出事件循环 (OpenClaw [#119720](https://github.com/openclaw/openclaw/issues/119720), [#142476](https://github.com/openclaw/openclaw/issues/142476))；转录协调与幽灵会话 (OpenClaw [#140620](https://github.com/openclaw/openclaw/issues/140620), QwenPaw [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698))；失败轮次上的持久历史 (ZeroClaw [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)) |
| **安全更新 / 迁移 / 回滚** | OpenClaw, Hermes, QwenPaw | 经过验证的备份门控 DB 迁移；保留先前包 + 配置恢复 (OpenClaw)；模型路由变更时的配置迁移 (QwenPaw v2.2.1)；回归热修复节奏 (Hermes v0.21.2) |
| **多租户 / profile 隔离与凭证作用域** | Hermes, ZeroClaw, QwenPaw, OpenClaw | profile 作用域的 MCP 注册表、密钥解析和端点选择 (Hermes — 约 10 个关闭的集群)；规范主体 + 主体拥有的会话 (ZeroClaw OIDC, [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289))；Hub 管理员引导 / 多用户 (QwenPaw [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318), [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696))；会话按 key 读取的共享谓词 (OpenClaw [PR #144169](https://github.com/openclaw/openclaw/pull/144169)) |
| **上下文压缩、token 计量与缓存前缀稳定性** | ZeroClaw, QwenPaw, OpenClaw, Hermes | 主动 token 预算压缩 ([#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780))；图像/思考配置的缓存前缀失效 ([#10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777), [#10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778), [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701))；provider 上下文窗口保留 (QwenPaw [PR #7652](https://github.com/agentscope-ai/QwenPaw/pull/7652))；`totalTokens` 膨胀 (OpenClaw [#125333](https://github.com/openclaw/openclaw/issues/125333))；尾部消息 token 超限 (Hermes [#108647](https://github.com/NousResearch/hermes-agent/issues/108647)) |
| **Provider 可靠性：重试、退避、回退、配额** | ZeroClaw, Hermes, OpenClaw, QwenPaw | 非流式回退被跳过 ([#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736))；529/429 退避 ([#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787), [#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779))；Gemini 429 池耗尽 (Hermes [#108656](https://github.com/NousResearch/hermes-agent/issues/108656))；Gemini TPM/RPM 重试配置 (OpenClaw [#93120](https://github.com/openclaw/openclaw/issues/93120))；子代理模型覆盖丢失 (QwenPaw [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676)) |
| **安全边界** | ZeroClaw, OpenClaw, Hermes | OIDC 栈 + 出口授权仪式 (ZeroClaw [PR #9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584), OIDC PR 系列)；prompt 注入扫描、备份排除、作用域网关令牌 (OpenClaw [#79168](https://github.com/openclaw/openclaw/issues/79168), [#40786](https://github.com/openclaw/openclaw/issues/40786), [#92367](https://github.com/openclaw/openclaw/issues/92367))；MCP 凭证头脱敏 (Hermes [PR #108695](https://github.com/NousResearch/hermes-agent/pull/108695)) |
| **故障暴露与取消语义** | QwenPaw, ZeroClaw, OpenClaw | 停止按钮不中止执行 (QwenPaw [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567))；通知延迟取消运行中的轮次 ([#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785))；cron 幻觉而非干净失败 (OpenClaw [#49876](https://github.com/openclaw/openclaw/issues/49876)) |

**收敛信号：** 七个焦点领域中有六个出现在**三个或更多**项目中。这不再是功能竞争——而是整个生态共享的可靠性待办事项。

---

## 5. 差异化分析

| 维度 | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **主要焦点** | 广泛的多渠道 Gateway 平台 | 多 profile/多路复用正确性 | 渠道状态清晰性 (Slack) | 桌面/移动端 UX + 子代理编排 | 身份/安全优先的 agent 运行时 |
| **目标用户** | 高级自托管用户、插件开发者、多渠道运营者 | 多 profile 生产主机、研究 (Nous) | 企业 Slack/共享渠道部署 | 个人 → 团队/企业 (Hub) | 安全意识强 / 受监管部署 |
| **架构** | Node/npm、Gateway 事件循环、路由打包启动 | 基于 SQLite WAL 的 profile 作用域多路复用 | 适配器/OpenAI 兼容接口一致性 | Python (AgentScope)、控制台 + Hub 服务 | Rust、`RpcDispatcher`、ZeroCode/ACP 桌面 |
| **渠道覆盖** | WhatsApp、Telegram、飞书、iOS、语音 | 以桌面/仪表盘为中心 | Slack + 共享渠道 | 控制台、Telegram、移动网页 | Telegram、ZeroCode/ACP |
| **独特押注** | 大规模下回滚安全的发布工程 | 将 profile 隔离作为硬边界 | 断开 vs 未配对状态 UX | 按 agent 的模型路由 + 多租户 Hub | OIDC 主体 + 出口授权 |
| **治理** | 快速、大批量分诊 | 维护者积极推动，bug 集群关闭 | 近乎沉默 | 开放贡献流水线，首次贡献者 | 显式 RFC/投票流程，带决策队列 |

**值得注意的架构分歧：** QwenPaw 优化**面向用户的可配置性**（按 agent 路由、按子代理选择模型——[#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)），而 ZeroClaw 优化**可证明的边界**（规范主体、主体拥有的记忆、root 强制）。OpenClaw 占据中间：广泛能力加上后装的安全门控。Hermes 和 IronClaw 更窄——分别是 profile 多路复用和渠道状态正确性。

**按设计选择划分的风险特征：** 以事件循环为中心的设计 (OpenClaw) 继承同步持久化停顿；SQLite WAL 设计 (Hermes，部分 OpenClaw) 继承多写入者损坏；内存紧张的原生设计 (ZeroClaw) 继承栈预算失败 ([#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734))。

---

## 6. 社区势头与成熟度

**第 1 层 — 超大规模 (OpenClaw)：** 每天约 500 个问题 + 500 个 PR。成熟的分诊，不成熟的发布稳定性。社区权重是决定性的；它设定了其他项目遵循的模式。

**第 2 层 — 高活跃度 (Hermes, ZeroClaw)：** 每日 50/50。不同的画像：
- *Hermes——积极加固。* 一次协调推进在一天内关闭了约 10 个 profile 隔离问题，外加一次针对性的 `state.db` 补丁发布。成熟度在上升，但未解决的 P1 ([#103339](https://github.com/NousResearch/hermes-agent/issues/103339)，4 天内 7 次损坏) 意味着多 profile 生产尚不安全。
- *ZeroClaw——快速迭代，受审查带宽限制。* 大型堆叠 OIDC PR 系列，provider/上下文修复队列。94% 的更新 PR 仍开放；四个积压 PR 被标记为 `needs-author-action` 或 `do-not-merge`。贡献者能量超过维护者带宽。

**第 3 层 — 成长型产品 (QwenPaw)：** 21 个问题 / 41 个 PR，一个提升的稳定版本，一个 26 条评论的路线图线程 ([#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318))，以及可见的首次贡献者流水线。是该集合中最强的**功能速度 + 发布纪律**组合——但其主打 v2.2.1 功能（按 agent 模型路由）被未解决的 bug [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) 和 [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) 直接反驳。

**第 4 层 — 休眠 (IronClaw)：** 0 个问题，1 个开放 PR，无合并或发布。一个未合并的修复 PR ([#8076](https://github.com/nearai/ironclaw/pull/8076))，没有可见的审查参与。从本快照无法评估为健康；视为仅维护或停滞。

**分层总结：** OpenClaw = 规模但无稳定性；QwenPaw = 速度加上新兴的发布纪律；Hermes 与 ZeroClaw = 加固进行中；IronClaw = 不活跃。

---

## 7. 趋势信号

1. **更新安全现在是产品功能，而非运维卫生。** OpenClaw 的备份门控回滚、Hermes 的回归热修复和 QwenPaw 的迁移验证都指向同一结论：对于自托管 agent，无法证明安全回滚的更新路径是一种负债。*对开发者的可操作建议：* 设计幂等、可逆的迁移，并将破坏性 schema 变更门控在已验证的备份上。
2. **会话/状态完整性是新战场。** 每个活跃项目都报告了状态层缺陷：SQLite WAL 双写入者损坏、转录协调停滞、幽灵会话、事件循环阻塞的同步持久化。*可操作建议：* 采用单写入者/串行化状态访问，并将持久化移出热路径。
3. **多租户和 profile 隔离正从功能升级为安全边界。** Hermes 约 10 个问题的隔离清理、ZeroClaw 的 OIDC 主体栈和 QwenPaw 的 Hub 都针对同一需求——在一台主机上运行多个身份而不发生凭证或会话泄漏。*可操作建议：* 从第一天起就按主体对每个缓存、注册表和凭证查找划定作用域；后装成本高昂（Hermes 的证据）。
4. **Prompt 缓存正确性是成本控制要求。** ZeroClaw 的缓存前缀失效集群 ([#10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777), [#10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778), [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)) 和 OpenClaw 的 token 膨胀表明用户正在积极审计支出。*可操作建议：* 以仅追加方式组装 prompt；将任何对先前历史的修改视为成本回归。
5. **Agent 故障必须暴露，而非幻觉。** OpenClaw 已关闭的 cron 幻觉 bug 和 QwenPaw 的“输出折叠进思考步骤” ([#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709)) 揭示了一个信任缺口。*可操作建议：* 在工具错误上强制显式失败状态，并如实暴露取消。
6. **取消和运行控制规范不足。** QwenPaw 的停止按钮缺陷 ([#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)) 和 ZeroClaw 的通知延迟取消 ([#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785)) 表明取消语义是一个未解决的原语。*可操作建议：* 实现具有可观察运行状态和幂等恢复的协作式取消。
7. **治理延迟在规模下成为天花板。** ZeroClaw 的 RFC 决策队列 ([#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692), [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)) 和 OpenClaw 长期存在的 P0 积压表明，随着项目增长，审查和决策吞吐量——而非贡献量——决定发布质量。*可操作建议：* 在贡献者增长超过审查之前，投资维护者工具和决策 SLA。
8. **子代理模型路由是新兴的成本优化模式。** QwenPaw 的按 agent 路由（已发布）和按任务子代理模型选择 ([#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)) 预示了异构模型流水线——廉价模型用于检索，强模型用于推理。*可操作建议：* 将模型选择设为按任务参数，而非全局设置，并验证覆盖在配置流水线中存活。
9. **桌面/移动端打磨现在是竞争领域。** QwenPaw 移动端好评、Hermes 桌面分屏/本地化请求，以及 OpenClaw iOS Connect 问题都表明用户将 agent 作为产品而非 CLI 来评估。

---

**对决策者的底线：** 能力平价正在快速到来；2026 年下半年的持久差异化因素是*可证明回滚的更新、可证明的状态隔离、成本透明的 prompt 组装，以及诚实的失败语义*。将这些视为架构原语——而非后续 bug 修复——的项目，将在与多 profile、多租户生产部署的接触中存活下来。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-12

## 1. 今日概览

活跃度依然**很高**：过去 24 小时内有 50 个 issue 和 50 个 PR 更新，其中 18 个 issue 关闭，8 个 PR 合并/关闭。项目发布了热修复版本 **v2026.9.11 / v0.21.2**，聚焦于 v0.21.0 会话存储连接处理重写引入的 `state.db` 脆弱性。主导主题是**多路复用/profile 隔离**、**state.db/WAL 并发**、**cron 可靠性**、**MCP/认证加固**和**skills 索引新鲜度**。维护者正在关闭大量 profile 隔离缺陷，但仍有若干 P1/P2 issue 保持开放，尤其是活跃 WAL 损坏（[#103339](https://github.com/NousResearch/hermes-agent/issues/103339)）和 cron 空闲退出失败（[#107485](https://github.com/NousResearch/hermes-agent/issues/107485)）。整体健康状况：活跃且响应及时，但多 profile 生产环境稳定性仍是主要风险领域。

## 2. 发布

### v2026.9.11 — Hermes Agent v0.21.2（`state.db` 补丁版本）
- **发布链接：** [v2026.9.11](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.11)
- **日期：** 2026 年 9 月 11 日
- **变更内容：** 针对 `state.db` 脆弱性的补丁版本。发布说明称，v0.21.0 对会话存储的连接处理进行了大规模重写，而在某些安装环境中这使 `state.db` 变得脆弱——第二个写入者会取消彼此的锁，健康的安装也会在并发下受影响。
- **破坏性变更：** 所提供的发布摘录中未列出。
- **迁移说明：** 摘录中未包含明确的迁移命令。使用 v0.21.0/v0.21.1 的用户，尤其是多 profile 或多 gateway 主机，应升级并关注 [Issue #103339](https://github.com/NousResearch/hermes-agent/issues/103339)，该 issue 仍处于开放状态，并提出单一写入者 flock 门控。相关已关闭 issue：[hosted_room_worker corrupting shared state.db](https://github.com/NousResearch/hermes-agent/issues/102120)。

## 3. 项目进展

### 今日可见的已合并/关闭 PR
- [#108675](https://github.com/NousResearch/hermes-agent/pull/108675) — `fix(skills): preserve instructional results through both budgets`。将完整的 `skill_view` 结果保留在上下文中，而不是截断为 1,500 字符的预览。
- [#94081](https://github.com/NousResearch/hermes-agent/pull/94081) — `fix(skills): ignore generated Python cache files in drift checks`。防止 `__pycache__` / `.pyc` 产物导致误报 skills 漂移并阻塞更新。

### 已关闭 issue 显示大量 profile 隔离清理
过去 24 小时内关闭了一大批多路复用/profile 作用域问题，包括：
- [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) — MCP 连接/工具集/状态未按 profile 作用域隔离。
- [#91654](https://github.com/NousResearch/hermes-agent/issues/91654) — MCP 会话/熔断器注册表仅以服务器名称为键。
- [#107327](https://github.com/NousResearch/hermes-agent/issues/107327) — 多路复用 gateway 路径记忆化跨 profile 泄漏。
- [#103717](https://github.com/NousResearch/hermes-agent/issues/103717) — 次级 profile 所有者的忙碌会话后续消息被丢弃。
- [#65940](https://github.com/NousResearch/hermes-agent/issues/65940) — 凭据池可能使用另一个 profile 的 API key。
- [#65941](https://github.com/NousResearch/hermes-agent/issues/65941) — Nous 请求可能使用另一个 profile 的 endpoint。
- [#82903](https://github.com/NousResearch/hermes-agent/issues/82903) — `session_search` 忽略 profile 参数并搜索根 state.db。
- [#107399](https://github.com/NousResearch/hermes-agent/issues/107399) — 多路复用下 cron 派发出现 `UnscopedSecretError`。
- [#107422](https://github.com/NousResearch/hermes-agent/issues/107422) — 终端环境桥接锁存了次级 profile 的 docker 策略。
- [#99121](https://github.com/NousResearch/hermes-agent/issues/99121) — mem0 插件在自托管 OSS 上失败关闭。

这表明维护者正集中推动加固多 profile 正确性和安全边界。

## 4. 社区热门话题

### 评论最多的 issue
- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — **199 条评论**。Skills 索引陈旧/降级看门狗。自动新鲜度探测报告索引已 29.8 小时未更新，超过 26 小时限制。底层需求：可靠的 Skills Hub 索引重建/部署流水线。
- [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) — **11 条评论**。Dashboard/桌面端 profile 切换是部分实现：MCP 工具从不加载，且 `secrets/${VAR}` 从启动 profile 解析。底层需求：dashboard/桌面端端到端 profile 身份。
- [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) — **8 条评论**。通过 `doctor --fix` / `repair_state_db_schema` / hosted_rooms 的第二个写入者会损坏活跃 WAL 的 `state.db`。现场报告：4 天内 7 次损坏。底层需求：多 profile gateway 下 SQLite WAL 的单一写入者门控。
- [#51217](https://github.com/NousResearch/hermes-agent/issues/51217) — **7 条评论**。为 Hermes Desktop i18n 添加德语（`de`）locale。底层需求：更广泛的欧洲本地化。
- [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) — **6 条评论，已关闭**。多路复用 profile：MCP 连接、工具集解析和状态未按 profile 作用域隔离。
- [#107485](https://github.com/NousResearch/hermes-agent/issues/107485) — **5 条评论**。SSH 隔离后端的空闲退出会杀死正在运行的 cron 执行，并静默跳过计划槽位。
- [#108575](https://github.com/NousResearch/hermes-agent/issues/108575) — **5 条评论**。`hermes profile create --clone` 不会继承 `agent.max_turns`，导致克隆的 profile 以 4 轮预算运行。
- [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) — **5 条评论**。对于不挑战未认证请求的服务器，MCP OAuth 流程从不触发。
- [#88715](https://github.com/NousResearch/hermes-agent/issues/88715) — **5 条评论**。多路复用 profile 身份在传输、会话、存储和控制路径上是延迟绑定的。

### 活跃 PR 主题
快照中未提供 PR 评论数，但高影响的开放 PR 包括：
- [#108696](https://github.com/NousResearch/hermes-agent/pull/108696) — `web_extract` 墙钟时间派发超时。
- [#108695](https://github.com/NousResearch/hermes-agent/pull/108695) — 在 MCP 探测错误/测试显示中完全脱敏凭据头。
- [#108693](https://github.com/NousResearch/hermes-agent/pull/108693) — 为 Z.AI/Kimi 协调按 key 作用域的凭据 endpoint。
- [#108683](https://github.com/NousResearch/hermes-agent/pull/108683) — dashboard/`gateway stop` 多路复用器一致性。
- [#107932](https://github.com/NousResearch/hermes-agent/pull/107932) — 关闭 Desktop 针对 cron 的空闲退出准入竞态。
- [#102840](https://github.com/NousResearch/hermes-agent/pull/102840) — 为未列出的 tile 草稿记录 owner 存根，以便 `session.resume` 路由。
- 较早抢救的 PR：[#57180](https://github.com/NousResearch/hermes-agent/pull/57180)、[#97466](https://github.com/NousResearch/hermes-agent/pull/97466)。

底层需求：生产级 profile 隔离、凭据安全、provider 超时处理和 cron 可靠性。

## 5. 缺陷与稳定性

按严重程度/标签和活跃状态排序：

### P1
- [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) — **开启，P1**。第二个写入者损坏活跃 WAL 的 `state.db`；上游防护 fail-open。提议：惰性 flock 单一写入者门控。v0.21.2 补丁版本可能缓解部分情况，但 issue 仍处于开放状态。
- [#102840](https://github.com/NousResearch/hermes-agent/pull/102840) — **开启 PR，P1**。Desktop 未列出的 tile 草稿缺少 owner 路由，破坏 `session.resume`。修复 PR 已打开。
- [#76520](https://github.com/NousResearch/hermes-agent/pull/76520) — **开启 PR，P1**。macOS git/源码安装在恢复会话时使用系统 Python，而不是 Hermes venv。修复 PR 已打开。

### P2
- [#107485](https://github.com/NousResearch/hermes-agent/issues/107485) — **开启，P2**。SSH 隔离的 dashboard 后端空闲退出会杀死正在运行的 cron 执行并跳过槽位。修复 PR：[#107932](https://github.com/NousResearch/hermes-agent/pull/107932)。
- [#108656](https://github.com/NousResearch/hermes-agent/issues/108656) — **开启，P2**。Gemini/AI Studio 配额处理丢失模型作用域和 RetryInfo；一次 429 可能全局耗尽 API-key 池。未列出修复 PR。
- [#108638](https://github.com/NousResearch/hermes-agent/issues/108638) — **开启，P2**。当 `/v1/props` 返回 200 但 payload 不是 props 时，`_apply_llamacpp_props` 从不回退到 `/props`；已分配的 `n_ctx` 被静默丢弃。未列出修复 PR。
- [#108647](https://github.com/NousResearch/hermes-agent/issues/108647) — **开启，P2**。尾部消息下限覆盖 lean token 预算且没有上限；观察到 6.3 倍。未列出修复 PR。
- [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) — **开启，P2**。Dashboard/桌面端 profile 切换是部分实现；MCP 工具和 secrets 解析错误。
- [#108682](https://github.com/NousResearch/hermes-agent/pull/108682) — **开启 PR，P2**。在压缩期间保留并报告 provider 拒绝。
- [#108683](https://github.com/NousResearch/hermes-agent/pull/108683) — **开启 PR，P2**。Dashboard 和 `gateway stop` 将通过多路复用器服务的 profile 视为正在通过多路复用器运行。
- [#108695](https://github.com/NousResearch/hermes-agent/pull/108695) — **开启 PR，P2**。MCP 凭据头脱敏。
- [#108696](https://github.com/NousResearch/hermes-agent/pull/108696) — **开启 PR，P2**。`web_extract` 不再因 provider 卡住而挂起。
- [#108693](https://github.com/NousResearch/hermes-agent/pull/108693) — **开启 PR，P2**。在池加载时协调按 key 作用域的凭据 endpoint。

### P3
- [#108575](https://github.com/NousResearch/hermes-agent/issues/108575) — **开启，P3**。`profile create --clone` 会丢弃 `agent.max_turns`；克隆的 profile 以 4 轮预算运行，Kanban 派发失败。
- [#103586](https://github.com/NousResearch/hermes-agent/issues/103586) — **开启，P3**。当只有一个窗格向上滚动时，Desktop 的滚动到底部跳转按钮会出现在所有分屏窗格中。
- [#108688](https://github.com/NousResearch/hermes-agent/pull/108688) — **开启 PR，P3**。在 cron 超时时保留已保留的投递结果。
- [#108689](https://github.com/NousResearch/hermes-agent/pull/108689) — **开启 PR，P3**。验证桌面窗格共享重放伙伴。
- [#108690](https://github.com/NousResearch/hermes-agent/pull/108690) — **开启 PR，P3**。清理依赖审计和重复的启动警告。
- [#47403](https://github.com/NousResearch/hermes-agent/issues/47403) — **开启，P3**。CLI 在 clarify 提示上静默阻塞；PR [#108692](https://github.com/NousResearch/hermes-agent/pull/108692) 添加问题文本和 OS 回退。

### 值得注意的已关闭稳定性修复
- [#102120](https://github.com/NousResearch/hermes-agent/issues/102120) — hosted_room_worker 破坏共享 `state.db`。
- [#91654](https://github.com/NousResearch/hermes-agent/issues/91654) — MCP 注册表跨 profile 冲突。
- [#107399](https://github.com/NousResearch/hermes-agent/issues/107399) — cron 派发 `UnscopedSecretError`。
- [#107422](https://github.com/NousResearch/hermes-agent/issues/107422) — 终端环境桥接锁存错误的 docker 策略。
- [#99121](https://github.com/NousResearch/hermes-agent/issues/99121) — mem0 插件在没有 API key 时失败关闭。

## 6. 功能请求与路线图信号

- [#51217](https://github.com/NousResearch/hermes-agent/issues/51217) — 为 Hermes Desktop i18n 添加德语（`de`）locale。社区请求虽小但明确；可能作为低风险桌面改进被采纳。
- [#76221](https://github.com/NousResearch/hermes-agent/issues/76221) — 路线图提案：Hermes Agent 的多会话协作。更广泛的架构特性；可能需要维护者决策。
- [#47403](https://github.com/NousResearch/hermes-agent/issues/47403) + [#108692](https://github.com/NousResearch/hermes-agent/pull/108692) — 针对 clarify 提示的 CLI 桌面通知。PR 已经打开，因此这是近期候选。
- [#108691](https://github.com/NousResearch/hermes-agent/pull/108691) — 添加 Cloudflare Workers AI 作为一等模型 provider。新 provider 支持很可能是下一版本候选。
- [#108696](https://github.com/NousResearch/hermes-agent/pull/108696) / [#57180](https://github.com/NousResearch/hermes-agent/pull/57180) — `web_extract` 超时加固。
- [#108695](https://github.com/NousResearch/hermes-agent/pull/108695) / [#97466](https://github.com/NousResearch/hermes-agent/pull/97466) — MCP 凭据脱敏。
- [#108683](https://github.com/NousResearch/hermes-agent/pull/108683) — dashboard/gateway 界面中的多路复用器一致性。
- [#107932](https://github.com/NousResearch/hermes-agent/pull/107932) — Desktop 空闲退出 cron 准入竞态。
- [#104482](https://github.com/NousResearch/hermes-agent/pull/104482) — Dashboard 辅助用量并入正确的模型卡片。
- [#107734](https://github.com/NousResearch/hermes-agent/pull/107734) — Curator 已读标记存储播种。

**预测：** 下一版本很可能是以多路复用器一致性、凭据/MCP 脱敏、`web_extract` 超时、cron 空闲退出修复、provider 新增以及 `state.db` 单一写入者安全性为中心的加固/次要版本。德语 locale 和多会话协作更可能是长期或待决策事项。

## 7. 用户反馈摘要

用户最强烈的痛点是 **多 profile/多路复用正确性**。真实部署会在同一主机上运行默认 profile 加多个次级 profile，用户报告混合 profile 行为、secrets 从错误 profile 解析、MCP 工具只为第一个 profile 加载、`session_search` 命中根 state.db、错误的 gateway 状态，以及 cron 通知绑定到错误 profile。这些并非理论问题：今天关闭的多个 issue 直接处理了跨 profile 凭据、endpoint、MCP 注册表和会话状态泄漏。

第二大痛点是 **state.db 完整性**。[#103339](https://github.com/NousResearch/hermes-agent/issues/103339) 报告在多 profile Linux 主机上 4 天内发生 7 次损坏，并有明确的第二写入者/WAL 机制。这与 v0.21.2 补丁版本一致。用户需要持久的单一写入者设计，而不仅仅是 fail-open 防护。

其他不满信号：
- SSH 隔离 dashboard 下的 cron 可靠性：空闲退出杀死作业并跳过槽位（[#107485](https://github.com/NousResearch/hermes-agent/issues/107485)）。
- Provider 配额处理：Gemini 429 可能耗尽 API-key 池（[#108656](https://github.com/NousResearch/hermes-agent/issues/108656)）。
- Desktop UX：分屏滚动状态是全局的（[#103586](https://github.com/NousResearch/hermes-agent/issues/103586)），profile 切换是部分实现（[#67605](https://github.com/NousResearch/hermes-agent/issues/67605)）。
- Skills Hub 新鲜度：索引看门狗处于降级状态，已有 199 条评论（[#66616](https://github.com/NousResearch/hermes-agent/issues/66616)）。
- 本地化需求：德语 locale 请求（[#51217](https://github.com/NousResearch/hermes-agent/issues/51217)）。

满意度参差不齐：维护者正在关闭大量 profile 隔离缺陷，并发布有针对性的补丁版本，这显示了响应能力。但开放的 P1/P2 issue 表明，生产环境多 profile 用户仍面临数据完整性、隔离和 cron 可靠性风险。

## 8. 积压项观察

需要维护者关注的高优先级或长期事项：

- [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) — 自 2026-07-18 开放，199 条评论。Skills 索引陈旧/降级。尽管标签为 P3，社区关注度很高。
- [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) — 自 2026-07-19 开放，P2。Dashboard/桌面端 profile 切换部分实现；MCP 工具和 secrets 错误。对桌面用户重要。
- [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) — 自 2026-09-05 开放，P1。`state.db` 活跃 WAL 损坏。对多 profile 主机至关重要。
- [#51217](https://github.com/NousResearch/hermes-agent/issues/51217) — 自 2026-06-23 开放。德语 locale 请求；低风险，长期存在。
- [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) — 自 2026-08-18 开放，P2。对于不挑战的服务器，MCP OAuth 流程从不触发。
- [#88715](https://github.com/NousResearch/hermes-agent/issues/88715) — 自 2026-08-17 开放，P2。多路复用 profile 身份跨路径延迟绑定。
- [#76221](https://github.com/NousResearch/hermes-agent/issues/76221) — 自 2026-08-01 开放。多会话协作路线图；需要决策。
- [#76483](https://github.com/NousResearch/hermes-agent/issues/76483) — 自 2026-08-02 开放，P3。Kanban `notify-subscribe` 标记错误的调用 profile。
- [#94590](https://github.com/NousResearch/hermes-agent/issues/94590) — 自 2026-08-25 开放，P2。多路复用 cron ticker 重新创建已归档 profile。
- [#97360](https://github.com/NousResearch/hermes-agent/issues/97360) — 自 2026-08-28 开放，P2。`gateway status` 报告其他 profile 的 PID。
- [#57180](https://github.com/NousResearch/hermes-agent/pull/57180) — 自 2026-07-02 开放。`web_extract` 超时 PR；现在很可能被 [#108696](https://github.com/NousResearch/hermes-agent/pull/108696) 取代。
- [#76520](https://github.com/NousResearch/hermes-agent/pull/76520) — 自 2026-08-02 开放，P1。CLI git 安装在会话浏览后丢失 venv。
- [#97466](https://github.com/NousResearch/hermes-agent/pull/97466) — 自 2026-08-28 开放。MCP Bearer 脱敏；由 [#108695](https://github.com/NousResearch/hermes-agent/pull/108695) 抢救。
- [#102840](https://github.com/NousResearch/hermes-agent/pull/102840) — 自 2026-09-04 开放，P1。Desktop 会话恢复路由。
- [#104482](https://github.com/NousResearch/hermes-agent/pull/104482) — 自 2026-09-06 开放。Dashboard 辅助用量重复卡片。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-12

仓库：[nearai/ironclaw](https://github.com/nearai/ironclaw)

## 1. 今日概览
2026-09-12，IronClaw 的公开活动非常少：过去 24 小时内 0 条 issue 更新、0 个 release，仅有 1 个开放的 PR 有更新。没有 PR 被合并或关闭，也没有新 issue 被报告或分诊。唯一有更新的条目是 [PR #8076](https://github.com/nearai/ironclaw/pull/8076)，这是一个开放的修复，重点是区分已断开连接的共享频道与未配对账号。总体来看，这是一份仅有维护活动、活动量极低的快照；仅凭这些数据无法有力评估项目健康状况，但没有证据表明存在活跃故障、发布工作或广泛社区讨论。

## 2. 发布
过去 24 小时内没有新发布。没有破坏性变更、迁移说明或版本详情需要报告。

## 3. 项目进展
今天没有合并或关闭的 PR，因此该时间窗口内没有交付任何功能或修复。  
唯一向前推进的是 [PR #8076](https://github.com/nearai/ironclaw/pull/8076)，它仍处于开放状态，并推进了以下内容：
- 区分已配对用户的已断开连接共享频道与未配对账号。
- 针对用户消息和机器人命令分别渲染频道特定的指引。
- 在产品、适配器和 OpenAI 兼容接口层面保持拒绝分类一致。
- 更新 Slack 能力处理。

## 4. 社区热门话题
最活跃——也是唯一——的条目是 [PR #8076](https://github.com/nearai/ironclaw/pull/8076)，创建于 2026-09-06，更新于 2026-09-11。它有 0 个 👍 反应，评论列为 `undefined`，因此无法衡量互动量。

背后的需求：当共享频道断开连接时，需要更清晰的状态处理和面向用户的指引，尤其是在 Slack、机器人命令和 OpenAI 兼容接口层面。没有其他 Issue 或 PR 可供比较。

## 5. Bug 与稳定性
今天没有在 Issue 中报告新的 bug、崩溃或回归。  
按优先级排序的稳定性事项：
1. **中等 — 已断开连接的共享频道与未配对账号混淆**  
   [PR #8076](https://github.com/nearai/ironclaw/pull/8076) 似乎修复了一个面向用户的 UX/逻辑问题：已配对用户的已断开连接共享频道可能会被以类似未配对账号的方式处理。该修复 PR 已存在，但仍处于开放且未合并状态。

## 6. 功能请求与路线图信号
在此时间窗口内，issue 跟踪器中没有提交明确的功能请求。  
来自 [PR #8076](https://github.com/nearai/ironclaw/pull/8076) 的路线图信号：持续投入于频道状态清晰度、Slack 集成行为，以及产品/适配器/OpenAI 兼容接口层面的一致性。如果被合并，改进后的断开连接指引和频道特定的机器人响应可能是下一个发布版的候选内容，不过发布节奏数据不可用。

## 7. 用户反馈摘要
此快照中没有捕获到直接的用户反馈、issue 或评论。  
从 [PR #8076](https://github.com/nearai/ironclaw/pull/8076) 可推断出的用户痛点是：已配对用户的共享频道断开连接时会产生混淆——用户和机器人命令可能收到不清晰或不一致的拒绝消息。满意度/不满意度无法从现有数据衡量。

## 8. 积压事项关注
- [PR #8076](https://github.com/nearai/ironclaw/pull/8076)：自 2026-09-06 起开放，最后更新于 2026-09-11，2026-09-12 仍处于开放状态。它没有列出的评论，反应数为 0，因此可能需要维护者审查或做出合并/关闭决定。
- 由于 Issue 总数为 0，所提供数据中不存在长期未答复的 Issue。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-12

## 1. 今日概览

QwenPaw 正高速运转：过去 24 小时内有 **21 个 issue** 和 **41 个 PR** 被更新，同时 **v2.2.1（稳定版）** 被提升到发布渠道。合并/关闭活动强劲——**41 个 PR 中有 18 个** 已落地或关闭，**6 个 issue** 得到解决，其中包括一个 v2.2.1-beta.2 的会话路由回归。然而，今日的 issue 流严重偏向 **subagent/模型路由与会话持久化路径中的稳定性报告**，若干高严重度 bug（spawn_subagent 超时、`subagent_model` 被忽略、停止按钮并未真正终止执行）仍未关闭。多租户 **Hub** 讨论仍是参与度最高的单一讨论串（26 条评论），且 Hub 脚手架 PR 开始出现。总体而言：贡献吞吐健康，但核心运行时鲁棒性需要关注。

---

## 2. 发布

### v2.2.1（稳定版）— 发布于 2026-09-11/12
发布页：https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1

**✨ 新增**
- **按 Agent 的模型路由** — 可为每个 Agent 分别配置 provider 偏好与回退行为（[PR #7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)）。
- **Auto Fin 主动记忆审查** 以及升级的 **ReMe** 记忆后端。

**破坏性变更 / 迁移说明：** 所提供的发布说明摘录中未列出；源数据中的发布说明被截断。不过，升级的运维人员仍应验证：(a) 按 Agent 的模型路由配置能否从先前的全局配置正确迁移；(b) 升级后 subagent 模型覆盖是否仍能解析——参见未关闭 bug [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) 和 [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)，两者均在 2.2.1-beta 系列上复现。

**发布值守：** 稳定版验证 [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) 为 **已关闭**；Beta 验证 [#7674](https://github.com/agentscope-ai/QwenPaw/issues/7674) 也已关闭。

---

## 3. 项目进展

**今日值得关注的已合并/已关闭 PR：**

| PR | 摘要 | 影响 |
|---|---|---|
| [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) | 保留由 provider 解析的上下文窗口，而不是回退到 AgentScope 的 32768 默认值 | 修复大窗口模型下的**过早上下文压缩** |
| [#7688](https://github.com/agentscope-ai/QwenPaw/pull/7688) | 简化分组会话分页（移除“Collapse List”，新增“Load More”，保留滚动状态） | 控制台 UX |
| [#7677](https://github.com/agentscope-ai/QwenPaw/pull/7677) | 对非有限验证输入返回 JSON 安全的 422 | API 正确性 |
| [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) | 在 Telegram 中将 Markdown 表格渲染为 `<pre>`，而不是原始竖线 | 渠道渲染修复（被 [#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713) 取代/扩展） |
| [#6994](https://github.com/agentscope-ai/QwenPaw/pull/6994) | 杂项：v2.1.0 发布说明 | 维护性工作（已过时，现已关闭） |

**新开启的修复 PR（尚未合并）：**
- [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) — 首次贡献者：针对被丢弃的 subagent 模型覆盖增加回归测试覆盖 + 诊断（目标 [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676)）。
- [#7699](https://github.com/agentscope-ai/QwenPaw/pull/7699) — 加强读取时对 `.master_key` 文件权限的检查。
- [#7701](https://github.com/agentscope-ai/QwenPaw/pull/7701) — 修复在 `main` 上失败的审批命令处理器测试桩（py3.11/py3.13 上 7 个失败）。
- [#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703) — 围绕较旧历史记录以稳定图像批次重构 Visual Compact。
- [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696) — Hub 本地管理员引导（`qwenpaw hub --init-admin`），仅加载 auth/credential 存储。
- [#7697](https://github.com/agentscope-ai/QwenPaw/pull/7697) — 将 PR 时 CI 精简为仅 Ubuntu 的后端层级 + 增加发布时全量测试门禁。

---

## 4. 社区热点

1. **[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — QwenPaw Hub 多租户版本路线图（26 条评论，4 👍）** — 目前最活跃的讨论串。维护者正在征集团队/企业版的方向；与 [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696)（Hub 管理员引导）配对。**底层需求：** 管理员管理的 skills、多用户访问，以及低门槛首个管理员设置的可自托管团队部署。
2. **[#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — 部署页面 UX（10 条评论，已关闭）** — 移动优先相关投诉，涉及入口点位置以及 Start/Stop 按钮距离过近。**需求：** 操作关键控件在手机上必须可触达且防误触。
3. **[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) — 停止按钮报告已停止，但执行仍在继续（6 条评论，开启）** — 随后在下一条消息上出现 409 错误，同时陈旧任务仍在运行。**需求：** 真正的取消语义与可观测的运行状态。
4. **[#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) — 为 `spawn_subagent` 提供按任务模型选择（3 条评论，自 6 月 2 日起开启）** — 节省成本的多模型协作（廉价模型用于 grep/reads，主模型用于推理）。与今日 bug #7676/#7678 直接相关。
5. **[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — 每个 `spawn subAgent` 任务都超时（3 条评论，开启）** — 用户报告即使超时设得很长也 100% 失败。
6. **[#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — 幽灵会话 / 会话索引与磁盘不一致（以 invalid 关闭）** — 会话列表显示 9 月 10 日条目，但没有对应的会话文件，而是加载了 9 月 9 日内容。**维护者以 invalid 关闭；** 考虑到可能涉及数据丢失，这值得再次审视。
7. **[#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710) — 为 Agent 间工具聊天与主动消息设置专用历史分组**，以及 **[#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) — 在 #7621 之后 PDF 块仍被发送到多模态 `/chat/completions`**（各 2 条评论）。

*（源数据中没有 PR 评论数，因此上文 PR 按新近度/相关性排序。）*

---

## 5. Bug 与稳定性

按严重程度排序：

**严重**
- **[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) — Stop 无法停止执行（开启，6 条评论）。** UI 显示已停止，但 agent 仍在执行旧指令；修正后的 prompt 返回 HTTP 409。影响运行控制与数据完整性。**未发现修复 PR。**
- **[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — 所有 `spawn subAgent` 任务都因超时失败（开启）。** 在 win2.2.0 上复现；提高超时无效，说明是卡死而非任务慢。**未发现修复 PR。**

**高**
- **[#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — `subagent_model` 无效；subagent 继承父级 `active_model`。** 在 2.2.1-beta.1 与 beta.2 上复现。**修复进行中：** [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) 针对被丢弃的覆盖增加回归测试覆盖与日志。
- **[#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) — 正常使用过程中已配置模型静默丢失（win10 2.2.1 桌面版）。** UI 在会话中途报告“未配置模型”，要求重新选择。反复出现。
- **[#7693](https://github.com/agentscope-ai/QwenPaw/issues/7693) — Creator：多图生成期间的用户审批会中断进行中的图像任务且不重新调度；作业永远卡在 RUNNING。** 由于严格的串行 `model_slot("image")` 限制为 1，这可能永久卡住队列。

**中**
- **[#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) — PDF 文档块仍被序列化为 `{"type":"file",...}` 发送到多模态 OpenAI 兼容端点。** #7621 只修复了非多模态路径。
- **[#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) — 定时任务与常规聊天经常没有可见输出；结果被折叠到思考步骤中。**
- **[#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) — Agent 工作目录在重启后回退到旧路径；基于文件夹的项目会话 UI 不清晰。**
- **[#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — 幽灵会话 / 部分历史丢失**（以 invalid 关闭——见待办观察）。

**已解决 / 回归已清除**
- **[#7687](https://github.com/agentscope-ai/QwenPaw/issues/7687)（已关闭）** — 切换 agent 后立即发送消息会静默重定向到新会话；这是 2026-09-10 控制台构建引入的回归。
- **[#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652)（已合并）** — 防止因忽略 provider 上下文窗口而导致的过早压缩。
- **[#7701](https://github.com/agentscope-ai/QwenPaw/pull/7701)（开启）** — 处理 `main` 上 7 个失败的单元测试，即现有 CI 健康问题。

---

## 6. 功能请求与路线图信号

| 请求 | 链接 | 下个版本可能性 |
|---|---|---|
| 为 `spawn_subagent` 提供按任务模型选择（多模型成本优化） | [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) | **高** — 与 #7676/#7680 中活跃 bug 修复以及 v2.2.1 中发布的新按 Agent 路由重叠 |
| Loop 目标/任务模式内的 `/compact` 上下文管理 | [#7679](https://github.com/agentscope-ai/QwenPaw/issues/7679) | **高** — 与 [#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703)（Visual Compact 重构）自然配对 |
| Serply 作为第三个 `web_search` provider | [#7711](https://github.com/agentscope-ai/QwenPaw/issues/7711) / [#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712) | **高** — PR 已开启且为 BYOK/选择加入 |
| 可配置的默认 Loop 模式；将内置“Default”重命名为“Standard” | [#7714](https://github.com/agentscope-ai/QwenPaw/issues/7714) | **中** — 较小的 UX/配置面 |
| Telegram：为 Markdown 表格提供原生 Rich Messages；可选清理中间消息 | [#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713), [#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592) | **中–高** — 两个 PR 均开启 |
| 用于 Agent 间工具聊天 + 主动消息的历史分组 | [#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710) | **中** |
| 右侧停靠布局（会话在左，文档/浏览器预览在右） | [#7700](https://github.com/agentscope-ai/QwenPaw/issues/7700) | **中** — 配套 PR [#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704) 将聊天文件抽屉移到右侧 |
| Atlas Cloud 作为内置 provider | [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) | **中** — PR 自 7 月 27 日起开启 |
| 统一多渠道 bot 管理插件（`bot-manager`） | [#7702](https://github.com/agentscope-ai/QwenPaw/pull/7702) | **中** — 插件生态扩展 |

---

## 7. 用户反馈总结

**痛点（不满）：**
- **移动端/Web 部署 UX** — 操作入口被埋到首屏以下；Start/Stop 按钮距离太近（“每次操作都很紧张，怕误点到了停止”）— [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177)。
- **Android 输入体验** — 输入法只提供换行键，但换行会提交，因此长 prompt 无法多行输入 — [#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707)（已关闭）。
- **Subagent 可靠性** — 非技术用户报告 subagent spawn 时任务完全失败，并且超时信息难以理解 — [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)。
- **配置持久化** — 模型与工作目录在使用中/重启后静默回退 — [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)、[#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705)。
- **输出可见性** — 定时任务完成但没有可见结果，答案隐藏在思考块内 — [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709)。
- **长时间 Loop 运行中的 Token 成本焦虑** — 用户希望在带内进行上下文压缩 — [#7679](https://github.com/agentscope-ai/QwenPaw/issues/7679)。

**积极信号（满意）：**
- 用户明确称赞 2.2.1 的移动 Web 改进（“移动端使用的体验已经比较好了”）— [#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707)。
- 对团队/企业使用有强烈需求，Hub 上的持续参与即为证明 — [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)。
- 活跃的首次贡献者渠道（例如 #7680、#7712、#7713、#7590、#7592、#6499、#6776），表明贡献入口友好。

---

## 8. 待办观察

**需要维护者关注的问题：**
- **[#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) — subagent 的按任务模型选择。** 自 **6 月 2 日** 起开启，仅有 3 条评论，但它是今日最高严重度 subagent bug（#7676、#7678）的概念父项。在此做出设计决策将解锁多个讨论串。
- **[#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) / [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)。** 两者均在当前 beta/stable 系列上复现，并直接与 v2.2.1 主打“按 Agent 模型路由”功能相矛盾。建议高优先级分诊。
- **[#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — 幽灵会话 / 会话文件缺失，以 invalid 关闭。** 鉴于报告称列出的会话在磁盘上不存在且部分历史丢失，一份有文档记录的解释或防御性修复会比 `invalid` 标签更能提升信任。

**长期未合并的 PR：**
- **[#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) — Atlas Cloud provider。** 自 **7 月 27 日** 起开启（首次贡献者）。低风险预设新增；需要评审带宽。
- **[#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776) — 自愈已死亡的 Playwright driver 连接。** 自 **8 月 7 日** 起开启，标记为 `ready-for-human-review`。修复“一次死亡，永久死亡”的浏览器后端故障。
- **[#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) — Telegram 表格渲染。** 今日关闭，但已被 [#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713) 取代；确认替代方案落地，以便底层 bug（#7585）保持修复。

**结构性观察项：**
- CI 健康：**[#7701](https://github.com/agentscope-ai/QwenPaw/pull/7701)** 表明 `main` 上的单元测试为红；**[#7697](https://github.com/agentscope-ai/QwenPaw/pull/7697)** 提议精简 PR 门禁，同时增加发布时全量测试门禁——请一并审查，以避免以覆盖率换取速度。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-12

## 1. 今日概览

ZeroClaw 仍然非常活跃：过去 24 小时内有 50 个 issue 和 50 个 PR 被更新，其中 39 个活跃/开放 issue 和 47 个开放 PR。关闭/合并侧较少：关闭了 11 个 issue，合并/关闭了 3 个 PR，0 个新版本发布。主要主题是安全/身份、provider 可靠性、上下文/缓存正确性以及 ZeroCode/ACP 运行时行为。活跃度评估：高，但维护者审查和大型堆叠 PR 似乎是当前的吞吐瓶颈。

## 2. 发布

无新版本发布。此窗口内未发布破坏性变更或迁移说明。

## 3. 项目进展

- 今日合并/关闭了 3 个 PR，但提供的 top-20 PR 样本中仅包含开放 PR，因此无法看到已合并 PR 的标题。
- 已关闭 issue 显示在渠道、运行时、配置和 ZeroCode 方面取得进展：
  - [Issue #5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram 媒体组被批处理为一个多模态轮次。
  - [Issue #10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753) — Windows session/new 2 MB 栈溢出测试已关闭；相关开放跟踪 issue [Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) 仍然存在。
  - [Issue #10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690) — Integrations “Configure” 链接现在使用 provider family key，而不是 display-name slug。
  - [Issue #9047](https://github.com/zeroclaw-labs/zeroclaw/issues/9047) — ZeroCode 会话历史与持久内存隔离已澄清。
  - [Issue #10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609) — ZeroCode 启动目录/cwd bug 已关闭。
  - [Issue #10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115) — 工具结果截断可见性已关闭。
  - [Issue #9521](https://github.com/zeroclaw-labs/zeroclaw/issues/9521) — MCP 图像内容块映射到视觉管线已关闭。
  - [Issue #10532](https://github.com/zeroclaw-labs/zeroclaw/issues/10532) — 降级配置修复不再指向错误的二进制文件。
  - [Issue #10786](https://github.com/zeroclaw-labs/zeroclaw/issues/10786) — Anthropic 上一轮 thinking 块缓存重写已关闭。
  - [Issue #9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092) — ZeroCode 长时间会话中的按键延迟已关闭。
- 活跃推进/审查领域：OIDC/安全栈 [PR #10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248)、[PR #10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265)、[PR #10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268)、[PR #10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270)、[PR #10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274)、[PR #10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275)、[PR #10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321)；provider 多模型 [PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)；日志轮转 [PR #10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214)；Telegram 群组上下文 [PR #10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640)；服务日志修复 [PR #10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732)。

## 4. 社区热门话题

按评论数排列的 issue：
- [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — 面向 RFC/设计 issue 的维护者决策队列；15 条评论。底层需求：在 RFC、发布策略和协调跟踪器上加快维护者决策。
- [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC：通过移除强制讨论窗口并让 REVISE 停止当前快照来简化 RFC 投票；9 条评论。底层需求：减少治理摩擦。
- [Issue #5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram 媒体组批处理为一个多模态轮次；8 条评论，已关闭。底层需求：正确处理 Telegram 相册的多模态。
- [Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — RpcDispatcher::process_line 在 2 MB 栈保护线的 2% 范围内运行；Windows nextest 栈溢出；6 条评论。底层需求：Windows CI/运行时稳定性。
- [Issue #8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) — OIDC 里程碑：规范主体和入站认证；3 条评论。底层需求：身份/安全架构。
- [Issue #10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753) — Windows session/new 2 MB 栈溢出；3 条评论，已关闭。
PR：所提供数据集中评论数未定义，因此 PR 热度根据范围/更新新近度评估。最大的活跃审查面包括堆叠的 OIDC/安全 PR [PR #10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248)、[PR #10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265)、[PR #10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268)、[PR #10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270)、[PR #10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274)、[PR #10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275)、[PR #10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321)，以及 [PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)、[PR #9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584)、[PR #10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214) 和 [PR #10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640)。

## 5. Bug 与稳定性

P1 / 高风险开放：
- [Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — RpcDispatcher process_line 中的 Windows 栈溢出；p1，S2。没有可见的直接修复 PR；相关 [Issue #10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753) 已关闭。
- [Issue #10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) — 失败的 Code/ACP 轮次会从持久历史中丢弃已接受的提示和已完成的工具交互；p1，风险高。
- [Issue #10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) — zerocode 通知延迟会取消每个正在运行的轮次；p1，风险高。
- [Issue #10782](https://github.com/zeroclaw-labs/zeroclaw/issues/10782) — 渠道回复意图预检丢弃 LLM 用量，因此分类器成本/配额从未被记录；p1，风险高。
- [Issue #10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780) — 没有主动的 token 预算上下文压缩；context_compression 已移除，keep_recent/collapse_tool_results 无效；p1，风险高。
- [Issue #10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777) — Thinking/effort 请求配置在不同轮次之间翻转，并重写整个缓存历史段；p1，风险高。
- [Issue #10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778) — 多模态图像上限驱逐会重写较早的历史消息并使缓存前缀失效；p1，风险高。
- [Issue #10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) — `zeroclaw service logs` 在 daemon 健康时于 macOS、Windows 和 OpenRC 上不打印任何内容；p1。修复候选：[PR #10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732)。

P2 / 中等及其他值得注意的开放项：
- [Issue #10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) — 输出前流式失败会跳过已声明的非流式回退。
- [Issue #10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) — 单候选流恢复忽略 provider_retries；Anthropic 529 只获得一次无退避的立即重试。
- [Issue #10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779) — OpenCode FreeUsageLimitError 429 以亚秒级退避重试，而不是快速失败。
- [Issue #10759](https://github.com/zeroclaw-labs/zeroclaw/issues/10759) — SOP RPC 运行详情省略保留的失败原因；风险高。
- [Issue #10757](https://github.com/zeroclaw-labs/zeroclaw/issues/10757) — agent-browser 可用性探测超时未与缺失 CLI 错误区分开。
- [Issue #10754](https://github.com/zeroclaw-labs/zeroclaw/issues/10754) — 偏好的内存归属与传输分类冲突；风险高。
- [Issue #10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701) — 图像附件会使整个历史缓存前缀失效，而不仅仅是新消息。

已关闭 / 可能已修复：
- [Issue #10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753)、[Issue #10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609)、[Issue #10532](https://github.com/zeroclaw-labs/zeroclaw/issues/10532)、[Issue #10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690)、[Issue #10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115)、[Issue #9521](https://github.com/zeroclaw-labs/zeroclaw/issues/9521)、[Issue #10786](https://github.com/zeroclaw-labs/zeroclaw/issues/10786)、[Issue #9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092)、[Issue #5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)。

稳定性主题：provider 重试/退避/回退，来自图像/thinking/配置变更的缓存前缀失效，token 计量与压缩，ACP/ZeroCode 持久性，以及平台一致性。

## 6. 功能请求与路线图信号

- 治理/RFC：[Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) RFC 投票简化；[Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) 维护者决策队列。
- 安全/身份路线图：[Issue #8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) OIDC 里程碑；PR 栈 [PR #10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248)、[PR #10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265)、[PR #10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268)、[PR #10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270)、[PR #10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274)、[PR #10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275)、[PR #10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) 覆盖规范主体、主体拥有的会话/内存、路由层认证、浏览器 PKCE、设备授权和注册。
- Provider/模型配置：[PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) 每个 provider 配置多个模型；[PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) 原生 Hailo-Ollama 支持；[Issue #10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787)、[Issue #10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)、[Issue #10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) 暗示了重试/退避修复。
- 上下文/内存控制：[Issue #10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780) 主动 token 预算压缩；[Issue #10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781) 移除或实现无效的上下文/历史键；[PR #9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) 历史裁剪事件上的 token 计量；[Issue #9047](https://github.com/zeroclaw-labs/zeroclaw/issues/9047) Code 历史/内存隔离（已关闭）。
- 渠道/工具/平台：[PR #10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640) 被动 Telegram 群组上下文；[Issue #9521](https://github.com/zeroclaw-labs/zeroclaw/issues/9521) MCP 图像块进入 vision（已关闭）；[PR #9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) session/discord 工具的按 agent 所有权；[PR #10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214) 日志轮转和多段查询；[PR #9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) 插件的 egress 授权仪式；[PR #9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) 和 [PR #10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) git 风险/根目录强制执行。
- 预测：下一个版本更可能包含有针对性的 provider/上下文/平台修复，如果维护者合并堆叠系列，也可能包含部分 OIDC 栈。完整的 OIDC/主体隔离规模较大且审查繁重，因此可能会增量落地。

## 7. 用户反馈摘要

- 成本/缓存痛点：用户正遭遇由图像、thinking/effort 配置和多模态驱逐引起的缓存前缀重写，导致意外的缓存读/写和 token 消耗。参见 [Issue #10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777)、[Issue #10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778)、[Issue #10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)、[Issue #10786](https://github.com/zeroclaw-labs/zeroclaw/issues/10786)。
- Provider 可靠性痛点：重试、退避和回退行为不一致；529/429 情况可能重试不当，或在没有已声明回退的情况下失败。参见 [Issue #10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)、[Issue #10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787)、[Issue #10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)。
- 上下文/配置困惑：无效的上下文/历史键、缺少主动压缩，以及不可见的工具结果截断，使 token 用量难以控制。参见 [Issue #10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780)、[Issue #10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781)、[Issue #10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115)。
- ZeroCode/ACP UX：启动 cwd、通知延迟导致的取消、失败轮次的历史丢失，以及会话/内存隔离造成工作流中断。参见 [Issue #10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609)、[Issue #10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785)、[Issue #10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)、[Issue #9047](https://github.com/zeroclaw-labs/zeroclaw/issues/9047)、[Issue #9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092)。
- 平台一致性：Windows 栈溢出以及 macOS/Windows/OpenRC 上 `service logs` 为空是反复出现的运维投诉。参见 [Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)、[Issue #10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753)、[Issue #10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)。
- 治理摩擦：RFC 等待窗口和维护者决策队列正在被积极讨论。参见 [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)、[Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)。
- 满意度信号：窗口内关闭了 11 个 issue，维护者/贡献者积极参与，以及大型安全/路线图 PR 正在审查中。不满主要集中在可靠性/成本正确性和审查延迟上。

## 8. 积压观察

需要维护者关注的 issue：
- [Issue #8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — 维护者决策队列；自 2026-07-04 开放，15 条评论。
- [Issue #8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) — OIDC 里程碑跟踪器；自 2026-06-24 开放，风险高，已接受。
- [Issue #9967](https://github.com/zeroclaw-labs/zeroclaw/issues/9967) — Harness 评估框架跟踪器；自 2026-08-13 开放。
- [Issue #10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC 投票简化；自 2026-09-02 开放，needs-maintainer-review，9 条评论。
- [Issue #10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — Windows 栈溢出；自 2026-09-10 开放，p1，6 条评论。
- [Issue #10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780)、[Issue #10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781)、[Issue #10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778)、[Issue #10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777)、[Issue #10754](https://github.com/zeroclaw-labs/zeroclaw/issues/10754) — 新增/更新的高风险 issue，带有 needs-maintainer-review。

需要关注的 PR：
- [PR #9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635) — git 子命令风险分类器；自 2026-08-01 开放，needs-author-action，风险高。
- [PR #9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) — egress 授权仪式；自 2026-07-31 开放，大型安全 PR。
- [PR #10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) — git 操作允许的根目录；自 2026-08-25 开放，needs-author-action。
- [PR #9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) — 历史裁剪上的 token 计量；自 2026-08-03 开放，blocked/do-not-merge。
- [PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — 每个 provider 配置多个模型；自 2026-08-07 开放，needs-author-action。
- [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — 原生 Hailo-Ollama；自 2026-07-17 开放，do-not-merge。
- [PR #10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214) — 日志轮转/多段查询；自 2026-08-21 开放，needs-author-action。
- OIDC 栈 [PR #10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248)、[PR #10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265)、[PR #10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268)、[PR #10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270)、[PR #10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274)、[PR #10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275)、[PR #10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) — 自 2026-08-22/24 开放，needs-author-action，风险高，堆叠。
- [PR #10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640) — Telegram 被动群组上下文；自 2026-09-05 开放，needs-author-action。
- [PR #9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746) — 按 agent 的 session/discord 工具所有权；自 2026-08-04 开放，needs-maintainer-review。
- [PR #10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732) — 服务日志选择修复；自 2026-09-09 开放，needs-author-action。

数据注意事项：所提供数据集中 PR 评论/反应计数未定义，因此 PR“热度”根据新近度、范围和审查标签评估，而不是评论数。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*