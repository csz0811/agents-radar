# OpenClaw 生态日报 2026-09-13

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-13 00:17 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-13

## 1. 今日概览
OpenClaw 仍然极其活跃：过去 24 小时内更新了 500 个 issue 和 500 个 PR，其中 230 个 issue 已关闭，234 个 PR 已合并/关闭。没有发布新版本，因此今天的活动重点是稳定化，而非版本交付。主要风险簇集中在 2026.9.3/2026.9.4 的升级/更新可靠性，包括 P0 迁移、Doctor、认证锁和回滚失败。子代理完成结果投递、进程泄漏以及消息/会话状态丢失也仍是反复出现的稳定性主题。活动评估：维护者吞吐量非常高，但核心生命周期路径的发布质量风险偏高。

## 2. 发布
无。过去 24 小时内未发布新的 OpenClaw 版本，因此没有特定于版本的破坏性变更、迁移说明或变更日志条目可总结。下文升级/迁移问题仍然活跃，应被视为 2026.9.x 用户的运维风险信号。

## 3. 项目进展
- 总体活动：过去 24 小时内合并/关闭了 234 个 PR，关闭了 230 个 issue。
- 头部样本中可见的已关闭/已合并 PR 包括：
  - [#146353](https://github.com/openclaw/openclaw/pull/146353) — CI 性能：在测试组之间共享已编译 worker。
  - [#146508](https://github.com/openclaw/openclaw/pull/146508) — Gateway：对打开超时进行分类并修复生命周期检查。
- 可见集合中值得注意的已关闭 issue 包括：
  - [#142476](https://github.com/openclaw/openclaw/issues/142476) — cron 会话回收器因同步 PRAGMA 完整性检查而阻塞事件循环。
  - [#140620](https://github.com/openclaw/openclaw/issues/140620) — 原地升级期间会话转录对账停滞。
  - [#144793](https://github.com/openclaw/openclaw/issues/144793) — 存在第二个活跃 CLI 会话时 claude-cli token 认证失败。
  - [#145689](https://github.com/openclaw/openclaw/issues/145689) — cron 更新被 tool-policy 迁移和 owner 校验阻塞。
  - [#146096](https://github.com/openclaw/openclaw/issues/146096) — 陈旧的基于读取的整文件写入丢弃了其间的工作区更新。
  - [#145266](https://github.com/openclaw/openclaw/issues/145266) — Doctor 从 npm 刷新 Codex 并遮蔽重新构建的捆绑插件。
- 正在推进的开放高优先级修复包括排队的 Swarm 调用方上下文（[#146490](https://github.com/openclaw/openclaw/pull/146490)）、将 PDF 作为核心媒体工具（[#146408](https://github.com/openclaw/openclaw/pull/146408)）、限定范围的子代理对账（[#146542](https://github.com/openclaw/openclaw/pull/146542)）、在所属更新运行内进行更新修复（[#146514](https://github.com/openclaw/openclaw/pull/146514)），以及 Node 前缀变更后的 Gateway 升级（[#145335](https://github.com/openclaw/openclaw/pull/145335)）。

## 4. 社区热点
按评论数统计，所提供数据中最活跃的 issue：

- [#97616](https://github.com/openclaw/openclaw/issues/97616) — 28 条评论，1 个 👍 — OpenClaw 泄漏未回收的 hook/tool 子进程，导致僵尸进程累积和运行时性能下降。底层需求：健壮的子进程生命周期/回收机制。
- [#44925](https://github.com/openclaw/openclaw/issues/44925) — 27 条评论，2 个 👍 — 子代理完成结果在超时后静默丢失，且没有重试、通知或自动重启。底层需求：持久化的子代理完成结果投递和编排保证。
- [#142585](https://github.com/openclaw/openclaw/issues/142585) — 17 条评论 — 当规范行缺失时，2026.9.3 Doctor 拒绝有效的旧版工作区设置和证明导入。底层需求：从旧版安装进行安全、可预测的迁移。
- [#67777](https://github.com/openclaw/openclaw/issues/67777) — 16 条评论 — 子代理完成结果投递可能在 direct-announce 超时、drain 或 orphan prune 时丢失。已关闭，但凸显了与 #44925 相同的投递可靠性需求。
- [#78308](https://github.com/openclaw/openclaw/issues/78308) — 16 条评论，1 个 👍 — 通过 consent envelope 对 MCP 工具调用进行通道中介审批。底层需求：外部/改变状态工具的安全与同意。
- [#144502](https://github.com/openclaw/openclaw/issues/144502) — 12 条评论 — WhatsApp 移动端因 48 kHz + Lavf 厂商标签而无法播放 TTS 语音消息。底层需求：通道媒体兼容性。
- [#142476](https://github.com/openclaw/openclaw/issues/142476) — 12 条评论 — cron 会话回收器在大型网关上阻塞事件循环。已关闭，但仍是重要稳定性信号。
- [#136183](https://github.com/openclaw/openclaw/issues/136183) — 12 条评论 — 生成 ssh 时命令执行器挂起。底层需求：可靠的子进程超时/终止行为。
- [#140620](https://github.com/openclaw/openclaw/issues/140620) — 12 条评论 — 升级时会话转录对账只导入部分会话然后停滞。已关闭，但属于升级信任问题的一部分。

提供的数据集中未填充 PR 评论数，但维护者队列在 Gateway、agents、update 和 UI 修复方面明显活跃，包括 [#146490](https://github.com/openclaw/openclaw/pull/146490)、[#146408](https://github.com/openclaw/openclaw/pull/146408)、[#146587](https://github.com/openclaw/openclaw/pull/146587)、[#146498](https://github.com/openclaw/openclaw/pull/146498) 和 [#146581](https://github.com/openclaw/openclaw/pull/146581)。

## 5. 缺陷与稳定性
在过去 24 小时内更新的 issue 中，可见缺陷集明显偏向 P0/P1 回归和生命周期失败。

**P0 / 阻断发布**
- [#142585](https://github.com/openclaw/openclaw/issues/142585) — Doctor 拒绝有效的旧版工作区设置和证明导入。开放；`clawsweeper:needs-info`、`impact:ux-release-blocker`。
- [#145929](https://github.com/openclaw/openclaw/issues/145929) — 自更新中断后，认证配置文件的注销/写入会因 `lock-may-be-busy` 永久失败。开放；未指示新的修复 PR。
- [#145510](https://github.com/openclaw/openclaw/issues/145510) — 更新失败：在 2026.9.3 上出现 `runtime-verification-failed`。开放；需要更多信息。
- [#145192](https://github.com/openclaw/openclaw/issues/145192) — 2026.9.2 → 2026.9.4 受管更新在活动 v1 交接租约上的 candidate-Doctor 处失败，然后回滚到已迁移状态。开放；未指示新的修复 PR。
- [#144739](https://github.com/openclaw/openclaw/issues/144739) — 2026.9.3 → 2026.9.4 的 npm 更新会针对 schema-17 候选状态运行 2026.9.3。开放。
- [#112475](https://github.com/openclaw/openclaw/issues/112475) — 设备配对移除后恢复失败。开放；P0，安全/UX 发布阻断。
- [#145252](https://github.com/openclaw/openclaw/issues/145252) — 跟踪 issue：2026.9.3/2026.9.4 更新、升级和恢复可靠性。开放；维护者协调中。
- [#145782](https://github.com/openclaw/openclaw/issues/145782) — 更新失败：在 2026.9.3 上修复中。已关闭；P0 发布阻断。
- [#126876](https://github.com/openclaw/openclaw/issues/126876) — 可访问性审计：13 个屏幕阅读器障碍。已关闭；P0 UX 发布阻断。

**P1 / 高严重性**
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — 僵尸子进程累积和运行时性能下降。开放。
- [#144911](https://github.com/openclaw/openclaw/issues/144911) — MCP 服务器初始化超时通过子进程清理中的未处理拒绝使 Gateway 崩溃。开放；`queueable-fix`。
- [#136183](https://github.com/openclaw/openclaw/issues/136183) — banner 交换回归后，生成 ssh 时命令执行器挂起。开放。
- [#139847](https://github.com/openclaw/openclaw/issues/139847) — 在回复运行活跃期间发送的消息会被丢弃。开放；`queueable-fix`。
- [#141474](https://github.com/openclaw/openclaw/issues/141474) — Collector 子进程调用 `sessions_yield` 会使 `agents_wait` 永久搁置。开放。
- [#140455](https://github.com/openclaw/openclaw/issues/140455) — Google Meet 代理语音损坏，因通话中 circular-JSON 崩溃。开放；`queueable-fix`。
- [#144502](https://github.com/openclaw/openclaw/issues/144502) — WhatsApp TTS 语音消息在移动端失败。开放；关联 PR 开放。
- [#137332](https://github.com/openclaw/openclaw/issues/137332) — 混合 terminal requester-settle 批次在所有权检查后永远重试。开放；`queueable-fix`。
- [#146118](https://github.com/openclaw/openclaw/issues/146118) — 被取代任务的压缩防护未覆盖 Codex 原生或非溢出压缩。开放。
- [#118776](https://github.com/openclaw/openclaw/issues/118776) — 叶子子代理保留 `sessions_yield`，但丢失了可能产生所等待事件的工具。开放。

**P2 / 中等严重性**
- [#145503](https://github.com/openclaw/openclaw/issues/145503) — Workshop 迁移后 `skill_workshop` 工具未注册；Doctor `--fix` 建议了一个被拒绝的 allowlist 修复。
- [#145993](https://github.com/openclaw/openclaw/issues/145993) — Codex 提示词标注对已准备内容而非已持久化准入内容进行指纹计算。
- [#146004](https://github.com/openclaw/openclaw/issues/146004) — 子代理完成会触发不需要的无通道 dashboard 心跳轮次。
- [#141558](https://github.com/openclaw/openclaw/issues/141558) — 即使已禁用，心跳轮询仍会发生。
- [#138260](https://github.com/openclaw/openclaw/issues/138260) — Doctor runtime-tool-schemas 自检在临时快照清理时失败。
- [#114158](https://github.com/openclaw/openclaw/issues/114158) — `fs-safe` 硬编码 `0o600` 忽略 umask，破坏共享工作区。

## 6. 功能请求与路线图信号
- [#78308](https://github.com/openclaw/openclaw/issues/78308) — 通过 consent envelope 对 MCP 工具调用进行通道中介审批。强烈的安全/同意信号；仍需产品和安全审查。
- [#131457](https://github.com/openclaw/openclaw/issues/131457) — 为 Feishu/Lark 通道添加进度流式模式，与 Slack/Discord/Telegram 等保持一致。
- [#101656](https://github.com/openclaw/openclaw/issues/101656) — Telegram 分离式子代理可以在没有存活信号或终止通知的情况下静默运行。
- [#122019](https://github.com/openclaw/openclaw/issues/122019) — `openclaw update status` 应暴露已配置插件的可用性和不可逆迁移风险。
- [#117243](https://github.com/openclaw/openclaw/issues/117243) — 已启用且加入 allowlist 的插件若被排除在 Gateway 启动范围之外，会在所有诊断中不可见。
- [#77798](https://github.com/openclaw/openclaw/issues/77798) — 通过 Canvas 嵌入实现的协作式 Markdown 编辑器。已关闭，但代表持续的 UX/文档编辑兴趣。
- [#126876](https://github.com/openclaw/openclaw/issues/126876) — 来自一位盲人 VoiceOver 用户的可访问性审计。已关闭，但可能影响设置/CLI 可访问性工作。

预测：下一个 2026.9.x 补丁最可能优先处理更新/升级/恢复可靠性、认证存储锁定、子代理完成结果投递和进程清理。MCP 审批信封和通道流式传输可能会更晚落地，除非被纳入发布阻断响应。

## 7. 用户反馈摘要
真实用户痛点仍集中在生产可靠性上：
- 升级/更新失败与回滚：用户报告更新阶段在运行时验证、修复、candidate-Doctor 或 schema 迁移步骤失败（[#145510](https://github.com/openclaw/openclaw/issues/145510)、[#145192](https://github.com/openclaw/openclaw/issues/145192)、[#144739](https://github.com/openclaw/openclaw/issues/144739)、[#142585](https://github.com/openclaw/openclaw/issues/142585)）。
- 认证与锁定：即使没有竞争进程，认证配置文件写入/注销也会因 `lock-may-be-busy` 失败（[#145929](https://github.com/openclaw/openclaw/issues/145929)）。
- 子代理编排：完成结果静默丢失、发生挂起，或分离式子代理在没有存活反馈的情况下运行（[#44925](https://github.com/openclaw/openclaw/issues/44925)、[#101656](https://github.com/openclaw/openclaw/issues/101656)、[#141474](https://github.com/openclaw/openclaw/issues/141474)）。
- 数据/消息完整性：消息丢失、陈旧的整文件写入和会话状态丢失反复出现（[#139847](https://github.com/openclaw/openclaw/issues/139847)、[#146096](https://github.com/openclaw/openclaw/issues/146096)）。
- 平台/通道兼容性：WhatsApp TTS、Google Meet 语音、Telegram、Discord 和飞书特定问题持续存在（[#144502](https://github.com/openclaw/openclaw/issues/144502)、[#140455](https://github.com/openclaw/openclaw/issues/140455)、[#131457](https://github.com/openclaw/openclaw/issues/131457)）。
- 可访问性和共享工作区用例：屏幕阅读器障碍以及 NFS/SMB 多用户权限问题对于非默认部署仍然重要（[#126876](https://github.com/openclaw/openclaw/issues/126876)、[#114158](https://github.com/openclaw/openclaw/issues/114158)）。

满意信号：大量详细的复现步骤和维护者回应表明用户群体是高度参与的高级用户。不满意信号：反复出现的更新/回滚和静默丢失报告表明发布稳定性是主要信任风险。

## 8. 积压事项观察
看起来长期存在且仍需要维护者/产品/安全关注的重要事项：

- [#44925](https://github.com/openclaw/openclaw/issues/44925) — 创建于 2026-03-13，27 条评论，P1。子代理完成结果静默丢失；需要产品决策和维护者审查。
- [#78308](https://github.com/openclaw/openclaw/issues/78308) — 创建于 2026-05-06，16 条评论，P2。MCP 工具调用审批 consent envelope；需要产品和安全审查。
- [#115367](https://github.com/openclaw/openclaw/issues/115367) — 创建于 2026-07-28，P1。提供商拥有的读取门控与外部通道插件冲突；需要安全/产品决策。
- [#101656](https://github.com/openclaw/openclaw/issues/101656) — 创建于 2026-07-07，P2。Telegram 分离式子代理缺少存活/终止通知。
- [#112475](https://github.com/openclaw/openclaw/issues/112475) — 创建于 2026-07-22，P0。设备配对移除后恢复失败；陈旧但仍阻断发布。
- [#114158](https://github.com/openclaw/openclaw/issues/114158) — 创建于 2026-07-26，P2。`fs-safe` 文件模式破坏共享工作区。
- [#117243](https://github.com/openclaw/openclaw/issues/117243) — 创建于 2026-08-01，P2。插件在 Gateway 诊断中不可见。
- [#118776](https://github.com/openclaw/openclaw/issues/118776) — 创建于 2026-08-03，P1。叶子子代理丢失了产生其所等待事件所需的工具。
- [#122019](https://github.com/openclaw/openclaw/issues/122019) — 创建于 2026-08-11，P2。更新状态省略了插件可用性和不可逆迁移风险。

值得关注维护者带宽的 PR 包括 [#135648](https://github.com/openclaw/openclaw/pull/135648)（浏览器配置文件默认值）、[#138579](https://github.com/openclaw/openclaw/pull/138579)（Gateway 转发发送者推断）和 [#145335](https://github.com/openclaw/openclaw/pull/145335)（Node 前缀变更后的 Gateway 升级）。

---

---

## 横向生态对比

## 跨项目对比报告 — 个人 AI 助手 / Agent 开源生态  
**日期：** 2026-09-13  
**范围：** OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw  
**数据基础：** 24 小时社区摘要。计数反映窗口内更新/关闭/合并的条目，而非项目积压总量。健康分是分析师对吞吐量、未解决 P0/P1/安全风险、发布稳定性和积压时长的综合评估。

---

### 1. 生态概览

个人 AI 助手 / agent 开源生态正分化为一个大规模核心参考层和一组专业化挑战者。OpenClaw 在原始活动量和覆盖面方面占据主导，但其主要风险是核心生命周期路径上的发布/升级可靠性。Hermes Agent、ZeroClaw 和 QwenPaw 正围绕网关隔离、自动化可靠性、MCP/ACP 互操作性以及桌面/多通道连续性进行迭代。IronClaw 较为安静且以稳定性为导向，社区信号有限。所有项目中反复出现的信任缺口是更新/迁移安全性、持久会话/子代理状态、可强制执行的安全边界，以及静默失败的可观测性。

---

### 2. 活动对比

| 项目 | Issues 更新数（24h） | PRs 更新数（24h） | 吞吐量信号 | 发布状态 | 健康分* |
|---|---:|---:|---|---|---|
| **OpenClaw** | 500（230 个已关闭） | 500（234 个已合并/关闭） | 非常高；以稳定化为主 | 窗口内无发布 | **7.0/10** — 高吞吐量，P0 更新/迁移风险偏高 |
| **Hermes Agent** | 50（3 个已关闭，47 个开放） | 50（2 个已合并/关闭，48 个开放） | 输入多、评审受限 | 无 | **6.0/10** — 报告质量高，安全修复待处理 |
| **IronClaw** | 0 | 2（1 个已关闭，1 个开放） | 极少 / 安静 | 无 | **8.0/10** — 稳定但信号低 |
| **QwenPaw** | 17（3 个已关闭，14 个活跃/开放） | 7（0 个已合并/关闭，7 个开放） | 分类与贡献者活跃，零合并 | 无 | **6.5/10** — 贡献者活跃，关键 bug 未解决 |
| **ZeroClaw** | 24（6 个已关闭） | 50（11 个已合并/关闭） | 高；合并/关闭活跃 | 无 | **7.5/10** — 吞吐量良好，稳定性债务明显 |

\*健康分是分析师评估，并非官方维护者指标。

**关键解读：** 窗口期内没有项目发布版本。OpenClaw 的 issue/PR 更新量大致是 Hermes 和 ZeroClaw 的 10 倍，但这种规模伴随着发布质量风险。Hermes 和 QwenPaw 的瓶颈在评审/合并吞吐量。IronClaw 在 issue 活动方面实际上处于休眠状态。

---

### 3. OpenClaw 的定位

**相较同行的优势**
- **规模与中心性：** 24 小时内更新了 500 个 issues 和 500 个 PRs，其中 230 个 issues 已关闭、234 个 PRs 已合并/关闭。这远超 Hermes（50/50）、ZeroClaw（24/50）、QwenPaw（17/7）和 IronClaw（0/2）。
- **最广泛的覆盖面：** OpenClaw 覆盖网关、更新/Doctor/回滚、认证、子代理、MCP、通道、插件、无障碍和工作区安全。同行则倾向于专精化。
- **核心参考地位：** 其 issues 被视为生态级信号：升级可靠性、子代理完成投递、进程回收和插件迁移都会影响下游预期。
- **维护者吞吐量：** 尽管风险偏高，OpenClaw 仍以高体量关闭和合并，表明其拥有庞大的维护者/贡献者群体。

**技术路线差异**
OpenClaw 似乎是一个完整的个人助手平台，并具备一等公民的生命周期层：更新、迁移、Doctor、回滚、认证存储锁定、通道适配器和插件作用域。Hermes 侧重于网关/profile 多路复用以及 cron/Kanban 自动化。ZeroClaw 强调安全主体、类型化插件配置、调度器 outbox 和运行时/RPC 安全。QwenPaw 聚焦于桌面 + MCP/ACP + 记忆/插件商店用户体验。IronClaw 则范围较窄，围绕助手通道处理和轮次状态谱系。

**社区规模对比**
OpenClaw 按可见活动量计算是最大的，领先一个数量级。Hermes 在 issue/PR 量上明显处于第二梯队。ZeroClaw 就其规模而言拥有强劲的 PR 吞吐量。QwenPaw 分类活跃，但合并吞吐量低。IronClaw 可见社区动态极少。

---

### 4. 共同技术关注领域

多个项目中浮现的需求：

1. **升级 / 更新 / 迁移信任**
   - **OpenClaw：** P0 2026.9.x 更新、Doctor、auth-lock、回滚、schema 迁移失败。
   - **Hermes：** Windows/macOS 更新脆弱、npm/venv 依赖陈旧、网关回滚。
   - **ZeroClaw：** Windows advisory nextest 失败、publish-contract 问题、服务/守护进程恢复。
   - **QwenPaw：** Post-2.2.x MCP/session/model 回归。
   - **需求：** 具备预检验证和安全回滚的幂等、可观测、可恢复升级。

2. **持久会话、子代理和轮次状态**
   - **OpenClaw：** 子代理完成丢失、`sessions_yield` 搁浅、消息丢失、进程泄漏。
   - **Hermes：** 并发陈旧快照、Bot Group Chats 在 Desktop 关闭后仍存活、会话连续性。
   - **QwenPaw：** 会话/模型丢失、内存耗尽、子代理模型覆盖。
   - **ZeroClaw：** 失败轮次丢弃持久历史、RPC/session 替换、内存并发。
   - **IronClaw：** 轮次状态谱系元数据回归测试。
   - **需求：** 服务端权威、持久、幂等的编排，并显式投递完成结果。

3. **安全 / 审批 / 身份边界**
   - **OpenClaw：** MCP 工具调用同意信封、auth-lock、设备配对恢复。
   - **Hermes：** 跨源凭据泄漏、跨 profile OAuth 身份采纳、审批门绕过、`config set` 绕过。
   - **QwenPaw：** 通过 ACP/kimi-code 绕过工作区外写入。
   - **ZeroClaw：** 规范化主体/授权、`always_ask` 在 Full autonomy 下仍然生效。
   - **需求：** 可强制执行、按 profile 隔离的权限和审批层，CLI/插件无法静默绕过。

4. **MCP / A2A / ACP 互操作性**
   - **OpenClaw：** MCP 审批信封、工具集成可靠性。
   - **Hermes：** 面向非挑战型服务器的 MCP OAuth、网关 `/reload-mcp` 崩溃。
   - **QwenPaw：** MCP discover 信封处理、ACP 权限选择、A2A 路线图需求。
   - **ZeroClaw：** MCP 恢复污染、受治理的插件 webhook 入口。
   - **需求：** 稳健的协议适配器、标准化认证和清晰的错误信封。

5. **静默失败与可观测性**
   - **Hermes：** 静默配置回退、Telegram 消息被静默丢弃、空工具参数、陈旧回答。
   - **QwenPaw：** Daily Paper 静默失败、插件目录回退缺口、控制台错误事件。
   - **ZeroClaw：** 通知延迟取消轮次、内存存储数据丢失、重试/退避缺口。
   - **OpenClaw：** 会话/记录对账停滞、更新阶段不明确。
   - **需求：** 显式报错诊断、结构化错误和用户可见的恢复路径。

6. **跨平台与通道一致性**
   - **OpenClaw：** WhatsApp TTS、Telegram、Feishu、Google Meet、Discord。
   - **Hermes：** Discord、BlueBubbles、Telegram、Windows Docker、macOS launchd。
   - **QwenPaw：** Telegram、Feishu、QQ、OneBot、Windows/macOS 桌面端。
   - **ZeroClaw：** Windows CI、Telegram、WhatsApp、Edge TTS。
   - **IronClaw：** Slack/共享通道助手指导。
   - **需求：** 在移动端、桌面端、守护进程和消息传输之间保持一致行为。

7. **资源生命周期、内存和进程安全**
   - **OpenClaw：** 僵尸子进程、阻塞事件循环的 cron reaper、MCP 子进程清理。
   - **QwenPaw：** 无界缓冲区导致 OOM/卡死、keep-alive 堆叠、工作区 watcher 冻结。
   - **ZeroClaw：** 内存后端并发丢失、栈保护接近阈值、进程拆除竞态。
   - **需求：** 有界队列、回收保证、背压和内存安全并发。

8. **模型路由、提供商正确性与成本**
   - **OpenClaw：** 认证 profile 失败、Codex/Claude CLI 认证、插件运行时 schema。
   - **Hermes：** 模型别名 `base_url` 丢失、Gemini 自动纠正、缓存提示词错误答案。
   - **QwenPaw：** 子代理模型覆盖、独立记忆模型、DeepSeek 能力元数据。
   - **ZeroClaw：** 提供商重试、OpenRouter 流式超时、缓存写入成本核算。
   - **需求：** 可预测的模型选择、透明的重试、正确的计费/缓存语义。

---

### 5. 差异化分析

| 项目 | 功能重点 | 目标用户 | 架构信号 |
|---|---|---|---|
| **OpenClaw** | 完整个人助手平台：网关、更新/Doctor、通道、子代理、MCP、插件、无障碍 | 高级用户、生产部署、生态构建者 | 集中式生命周期/更新层；广泛适配器矩阵；高发布风险面 |
| **Hermes Agent** | 网关/profile 隔离、cron/Kanban 自动化、桌面/多设备连续性、bot 群聊 | 技术自动化用户、多 profile 运营者、研究实验室 | profile 多路复用、worker 协作契约、网关回滚、cron/Kanban 调度 |
| **IronClaw** | 助手共享通道处理、轮次状态谱系 | 窄范围/稳定助手部署、NEAR 相关用户 | 轮次状态元数据、适配器/OpenAI 兼容接口、回归测试导向 |
| **QwenPaw** | 桌面助手 + 多通道操作、MCP/ACP、记忆、插件商店 | 桌面和多通道用户，尤其是中文生态 | AgentScope 基础、ACP 驱动、ReMeLight 记忆、watcher/插件市场 |
| **ZeroClaw** | 安全/插件平台、守护进程/服务可靠性、调度器/outbox、通道用户体验 | 注重安全的运营者、插件密集型部署 | Rust/RPC 运行时、类型化插件配置、安全主体、持久调度器原语 |

**主要对比：** OpenClaw 试图成为最广泛的参考实现。Hermes 针对持久、隔离、无头自动化进行优化。ZeroClaw 针对受治理的运行时/插件安全进行优化。QwenPaw 针对桌面 + 协议互操作性进行优化。IronClaw 范围窄、安静且以稳定性为导向。

---

### 6. 社区动能与成熟度

**活动层级**
- **第 1 梯队 — OpenClaw：** 活动量非常高。生态成熟，贡献者/维护者吞吐量巨大，但发布质量风险偏高，且存在 P0 升级阻塞。
- **第 2 梯队 — Hermes Agent 和 ZeroClaw：** 活动量高，但瓶颈不同。Hermes 输入多且受评审限制，存在未解决的安全项。ZeroClaw 合并/关闭情况良好，但在 Windows CI、内存和运行时历史方面背负稳定性债务。
- **第 3 梯队 — QwenPaw：** issue 接收和贡献者 PR 活跃，但窗口内零合并。Post-2.2.x 可靠性和安全问题拖累最大。
- **第 4 梯队 — IronClaw：** 活动量低，稳定但安静。如果优先考虑稳定性则不错，但社区动能或路线图信号有限。

**成熟度解读**
- **规模化下最成熟：** OpenClaw。
- **快速迭代但风险偏高：** OpenClaw、Hermes、ZeroClaw。
- **趋于稳定 / 受依赖约束：** QwenPaw。
- **安静 / 维护模式信号：** IronClaw。

---

### 7. 趋势信号

1. **发布工程是新的竞争护城河。** OpenClaw、Hermes、ZeroClaw 和 QwenPaw 都表现出更新/升级/迁移信任缺口。用户会惩罚失败的回滚、schema 不匹配和静默配置重置。
2. **持久编排已是基本要求。** 子代理完成、会话连续性、轮次历史和跨设备持久化出现在 OpenClaw、Hermes、QwenPaw、ZeroClaw 和 IronClaw 中。
3. **安全正从文档走向强制执行。** 跨源密钥泄漏、profile OAuth 采纳、审批绕过和工作区写入逃逸表明，权限模型必须由代码强制执行并可审计。
4. **MCP 很常见，但 MCP/A2A/ACP 互操作性尚未解决。** OAuth 缺口、非标准错误信封、reload 崩溃和 A2A 时间线问题反复出现。
5. **静默失败是头等 UX 和信任问题。** 配置回退、消息丢失、空工具参数和误导性的“已完成”状态，比显式崩溃更侵蚀信心。
6. **跨平台一致性仍然代价高昂。** Windows CI、macOS 服务管理、移动端 TTS、Docker 路径和消息传输怪癖持续存在。
7. **插件生态正成熟为治理问题。** 权限作用域、类型化配置、webhook 入口、目录回退和依赖卫生在 ZeroClaw、QwenPaw、OpenClaw 和 Hermes 中都很活跃。
8. **成本、缓存和模型路由正成为一等可靠性特性。** 重试/退避、缓存写入核算、提示词前缀稳定性和提供商元数据不再是利基问题。

**对 AI agent 开发者的价值：** 优先考虑持久会话/状态设计、幂等更新路径、严格的身份/权限边界、MCP/A2A/ACP 适配器稳健性、显式报错可观测性和跨平台 CI。这些正是生态系统用户报告生产痛点最多的领域。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — 项目摘要
**日期：** 2026-09-13 · **仓库：** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)
*基于提供的 24 小时快照（50 个 issue，50 个 PR 更新）。*

---

## 1. 今日概览

Hermes Agent 正处于高速维护阶段：过去 24 小时内有 100 个 issue 和 PR 被触及，但仅有 3 个 issue 关闭、2 个 PR 合并/关闭，而开放 PR 为 48 个、开放 issue 为 47 个——这是典型**输入密集、吞吐受限**的一天。没有发布版本，待审查积压继续增长。活动集中在四个主题：**网关/profile 隔离与认证边界**、**cron/Kanban 调度可靠性**、**配置/CLI 变更安全**，以及**桌面/多设备会话连续性**。若干高严重性安全类 issue（跨源凭据泄露、跨 profile OAuth 身份采纳、审批门禁绕过）仍处于开放状态且尚无关联修复 PR，这是本快照中的主要健康隐患。令人鼓舞的是，维护者和贡献者已为当天许多回归问题（cron 冷启动、网关回滚、UTF-8 状态损坏、Discord/BlueBubbles 传输 bug）开设了针对性修复 PR。

---

## 2. 发布

过去 24 小时内无发布。无可报告的迁移说明或破坏性变更。

---

## 3. 项目进展

该时间窗口内有 2 个 PR 被合并/关闭（1 个已确认，另 1 个不在可见的前 20 条内）：

- **[PR #98470 — CLOSED] feat(agent): 增加经过验证的 worker 协作契约** ([链接](https://github.com/NousResearch/hermes-agent/pull/98470)) — 增加了一个被动、JSON 安全的契约层，用于 worker 协作（证据、目标、能力、共识、worker 模式预期），该层在不改变运行时权限或调度的前提下以 fail-closed 方式失败。这是今天可见的最重要已落地变更。
- 另一个已合并/关闭的 PR 未出现在前 20 条样本中。

**今日新开的重要修复 PR（提升稳定性）：**
- [PR #109252](https://github.com/NousResearch/hermes-agent/pull/109252) — `fix(cron): allow cold external worker startup`（将 ack 窗口从 5s 延长至 12s 冷启动预算），直接针对 issue #109243。
- [PR #109465](https://github.com/NousResearch/hermes-agent/pull/109465) — `fix(state): degrade undecodable UTF-8 cells instead of aborting session queries`（单个损坏的 `system_prompts` 行目前会中断所有会话查询）。
- [PR #109372](https://github.com/NousResearch/hermes-agent/pull/109372) — 针对 `HERMES_HOME` 的破坏性终端命令的审批下限。
- [PR #109477](https://github.com/NousResearch/hermes-agent/pull/109477) — Discord 线程重命名传输所有者保留。
- [PR #109484](https://github.com/NousResearch/hermes-agent/pull/109484) — BlueBubbles 仅出站 webhook 路径（cron/origin 投递端口冲突）。
- [PR #109483](https://github.com/NousResearch/hermes-agent/pull/109483) — 网关 `/reload-mcp` 在元组键控多路复用 MCP 连接上崩溃。
- [PR #109249](https://github.com/NousResearch/hermes-agent/pull/109249) — A2A 长时间运行任务不再被错误记录为失败。
- [PR #109250](https://github.com/NousResearch/hermes-agent/pull/109250) — macOS launchd PID 轮询，以避免重生后误报 "gateway DOWN"。
- [PR #109255](https://github.com/NousResearch/hermes-agent/pull/109255) / [PR #109251](https://github.com/NousResearch/hermes-agent/pull/109251) — Windows ZIP 更新构建产物保留，以及缺失 `get-windows` 构建的韧性修复。
- [PR #109256](https://github.com/NousResearch/hermes-agent/pull/109256) — 使用自定义提供程序的仪表盘会话不再报告 "Setup Required"。
- [PR #109253](https://github.com/NousResearch/hermes-agent/pull/109253) — 打破 SDK 模块循环，恢复桌面运行时插件。

**已关闭 issue：** [#101975](https://github.com/NousResearch/hermes-agent/issues/101975)（模型自动纠正到错误的 Gemini 模型）、[#109448](https://github.com/NousResearch/hermes-agent/issues/109448)（memory/hindsight 守护进程在每次会话初始化时重启），以及另外一项已关闭条目。

**观察：** [PR #109478](https://github.com/NousResearch/hermes-agent/pull/109478) 和 [PR #109481](https://github.com/NousResearch/hermes-agent/pull/109481) 是来自不同作者的几乎相同的 "fix(gateway): make standalone rollback recoverable" PR——可能存在重复工作，值得维护者去重。

---

## 4. 社区热点话题

| 条目 | 评论数 | 信号 |
|---|---|---|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — Bot Group Chats 应在桌面端关闭后继续工作 | **28** (👍1) | 今日互动量最高的 issue |
| [#109243](https://github.com/NousResearch/hermes-agent/issues/109243) — cron 外部 worker 交接 ack 为 5s，而冷启动约 12s | **17** | 新出现、可复现，修复 PR 已开放 |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) — `--initial-status blocked` 自动提升为 `ready`，绕过审批门禁 | **16** (👍1) | P1，自 6 月起开放 |
| [#94375](https://github.com/NousResearch/hermes-agent/issues/94375) — `hermes doctor --fix` 因 npm 漏洞而失败 | 7 | 依赖卫生 |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) — `hermes config set` 绕过系统配置写保护 | 6 | 安全边界 |
| [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) — 对于不发起挑战的服务器（Gmail MCP），MCP OAuth 从不触发 | 6 | 互操作缺口 |

**深层需求分析：**
1. **持久、无头、跨设备 agent 会话。** #97681 要求 Bot Group Chats 在桌面端关闭后仍能存活，并跨设备交接——这反映出对服务器权威会话状态而非绑定桌面端的运行时需求。相关会话状态 issue：[#84235](https://github.com/NousResearch/hermes-agent/issues/84235)、[#109375](https://github.com/NousResearch/hermes-agent/issues/109375)。
2. **确定性、可观测的自动化。** #109243 和 [#109452](https://github.com/NousResearch/hermes-agent/issues/109452)（Kanban 无退避地重新提升）表明用户正在运行无人值守的 cron/Kanban 工作负载，并遇到在冷启动或反复失败下失效的时序假设。
3. **可强制执行的安全边界。** #59293 和 [#109440](https://github.com/NousResearch/hermes-agent/issues/109440) 反映出一种一致预期：CLI 便利功能不得静默绕过审批层。
4. **一流的 MCP/OAuth 支持。** #89412 强调，仅被动式认证挑战会将主要提供程序排除在外。

---

## 5. Bug 与稳定性

**P1 / 严重**
- **[#109440](https://github.com/NousResearch/hermes-agent/issues/109440)** — `hermes chat -q -m <direct alias>` 会将别名的 API key 发送到 **默认提供程序的主机**（跨源凭据泄露），已在 v0.21.2 复现。标记为 `sweeper:risk-security-boundary`，重复。**未见修复 PR。**
- **[#107191](https://github.com/NousResearch/hermes-agent/issues/107191)** — `model_aliases` 自定义 `base_url` 在 CLI 启动时被静默丢弃 → 回退到 OpenRouter 并返回 401。**未见修复 PR。**
- **[#109422](https://github.com/NousResearch/hermes-agent/issues/109422)** — 在 `gateway.multiplex_profiles: true` 下，共享 OAuth MCP 服务器 URL 的 profile 会静默采纳彼此已认证的身份。**未见修复 PR。**
- **[#39609](https://github.com/NousResearch/hermes-agent/issues/39609)** — `--initial-status blocked` 在创建后约 1s 被自动提升为 `ready`，且无操作者，绕过人工审批门禁。

**P2 / 高**
- **[#109243](https://github.com/NousResearch/hermes-agent/issues/109243)** — cron 外部 worker ack 超时（5s）短于冷启动（约 12s）→ 任务间歇性永不运行。**修复 PR：[#109252](https://github.com/NousResearch/hermes-agent/pull/109252)。**
- **[#102945](https://github.com/NousResearch/hermes-agent/issues/102945)** — 无法解析的 `config.yaml` 会静默回退到默认值，丢弃所有用户覆盖项，仅给出短暂的 stderr 警告。
- **[#109452](https://github.com/NousResearch/hermes-agent/issues/109452)** — Kanban 每个调度器 tick 都重新提升非粘性 blocked 卡片：**30 分钟内产生 30 次相同的模型运行**，没有退避或熔断。
- **[#84235](https://github.com/NousResearch/hermes-agent/issues/84235)** — 同一会话上的并发轮次基于过期快照执行 → 重复执行和真实世界副作用。
- **[#109423](https://github.com/NousResearch/hermes-agent/issues/109423)** — Telegram `allowed_chats` 以 JSON 字符串存储时被错误解析 → 群组消息被静默丢弃。
- **[#90679](https://github.com/NousResearch/hermes-agent/issues/90679)** — Windows 上的 Docker 后端：新桌面会话的 cwd 被设置为宿主路径（`D:\.hermes`），每个命令都以退出码 126 失败。
- **[#108302](https://github.com/NousResearch/hermes-agent/issues/108302)** — Managed Tool Gateway 在每个 bot profile 上不可用（缺少 profile→global-root 认证回退）。
- **[#108659](https://github.com/NousResearch/hermes-agent/issues/108659)** — 当自定义提供程序强制 `cache_prompt` 时，原生图像/视频轮次可能收到 **上一请求的答案**。
- **[#107511](https://github.com/NousResearch/hermes-agent/issues/107511)** — `hermes config set` 会重新序列化整个 YAML 文件，重新格式化无关的列表部分。
- **[#95078](https://github.com/NousResearch/hermes-agent/issues/95078)** — 嵌套 Hermes 继承过期的 `TERMINAL_CWD`。

**P3 / 中等**
- [#109375](https://github.com/NousResearch/hermes-agent/issues/109375) 技能后台审查在短生命周期的 Kanban/Group Chat 运行时中丢失；[#109063](https://github.com/NousResearch/hermes-agent/issues/109063) 桌面插件路由在延迟注册后过期；[#109480](https://github.com/NousResearch/hermes-agent/issues/109480) profile 切换/仪表盘损坏；[#109258](https://github.com/NousResearch/hermes-agent/issues/109258) Telegram `/save md` 错误（`GatewayRunner` 没有 `get_adapter`）；[#96610](https://github.com/NousResearch/hermes-agent/issues/96610) 在 schema 约束后端上 tool_call 桥接参数为空。

**稳定性解读：** *静默失败* bug 的数量（静默配置回退、静默丢弃消息、静默空工具参数、静默错误答案）是主导模式——这既是正确性缺口，也是可观测性/日志缺口。

---

## 6. 功能请求与路线图信号

| 请求 | Issue/PR | 近期工作可能性 |
|---|---|---|
| 跨设备/桌面端关闭后持久的 Bot Group Chats | [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 高——顶级社区信号，涉及会话/网关/桌面端 |
| 无人值守自主任务生命周期（受监督的后台作业、资源清理、持久任务状态） | [#82304](https://github.com/NousResearch/hermes-agent/issues/82304) | 中——`needs-decision`，由事后复盘驱动 |
| 每次发布前的依赖卫生门禁（`npm-check` + `npm outdated`） | [#102563](https://github.com/NousResearch/hermes-agent/issues/102563) | 高——流程变更简单；[PR #109240](https://github.com/NousResearch/hermes-agent/pull/109240) 已修补 4 个有漏洞的 npm 解析项 |
| 刷新约 50+ 个过期的 venv Python 包（包括 `certifi`） | [#83673](https://github.com/NousResearch/hermes-agent/issues/83673) | 中 |
| 通过 Realms/VM 为每个 agent 提供 Linux 桌面 | [PR #104567](https://github.com/NousResearch/hermes-agent/pull/104567) | 中——大型、`needs-decision`，仍在迭代 |
| 以执行范围所有权取代 PID/心跳过期回收 | [#84258](https://github.com/NousResearch/hermes-agent/issues/84258) | 中——与安全审计活动联动 |

**预测：** 下一个版本最有可能包含 cron 冷启动容忍、网关回滚修复、UTF-8 状态韧性、npm 安全升级，以及可能包含刚刚合并的 worker 协作契约——而不是更大的架构项（#97681、#82304、#104567），这些还需要决策。

---

## 7. 用户反馈总结

**痛点（不满）：**
- **配置/CLI 信任侵蚀。** 多份报告称 `hermes config set` 意外修改文件（#107511）、绕过安全保护（#59293），或者损坏的配置会静默丢弃所有用户设置（#102945）。用户将这些描述为对安全层的 "前门" 绕过。
- **更新/安装脆弱性。** Windows（`node_modules` 被锁定、ZIP 路径抹掉构建产物）和 macOS（launchd 重生被报告为 DOWN）更新是反复出现的摩擦——见 #94375、与 [#90495](https://github.com/NousResearch/hermes-agent/issues/90495) 相关的 PR、与 [#94743](https://github.com/NousResearch/hermes-agent/issues/94743) 相关的 PR #109250。
- **自动化不可预测性。** "间歇性永不运行" 的 cron 任务和生成 30 次相同模型运行的 Kanban 卡片侵蚀了对无人值守操作的信心。
- **跨 profile/凭据歧义。** 运行多路复用 profile 的用户期望严格隔离，却发现它们之间存在身份和密钥泄露。
- **依赖陈旧。** 持续有抱怨称发布版本附带超过 50 个过期 Python 包和已知 npm 漏洞。

**积极信号：**
- 高质量、可复现的报告，包含版本哈希、环境和根因分析（例如 #109243、#109465、#109440）——一个积极参与的技术用户群体。
- 维护者/贡献者响应速度：针对 cron 冷启动、网关回滚、Discord 重命名、BlueBubbles webhook 和状态损坏的修复 PR 当天出现。
- 用户正将 Hermes 推向类生产场景（多 bot 群聊、租用 GPU、无人值守任务），表明采用已超越玩具用途。

---

## 8. 待办积压观察

需要维护者关注的条目（存在时间、严重性且无可见解决方案）：

1. **[#39609](https://github.com/NousResearch/hermes-agent/issues/39609)** — 阻塞任务上的 P1 审批门禁绕过。自 **2026-06-05** 开放，16 条评论，无关联修复 PR。样本中最古老的高严重性条目。
2. **[#59293](https://github.com/NousResearch/hermes-agent/issues/59293)** — `needs-decision`，安全：`hermes config set` 无门禁地禁用审批层。自 **2026-07-06** 开放。
3. **[#82304](https://github.com/NousResearch/hermes-agent/issues/82304)** — `needs-decision`：无人值守任务生命周期/资源。自 **2026-08-09** 开放。
4. **[#84235](https://github.com/NousResearch/hermes-agent/issues/84235)** / **[#84258](https://github.com/NousResearch/hermes-agent/issues/84258)** — 并发轮次过期快照（重复副作用）和过期回收所有权模型。自 **2026-08-12** 开放；#84258 标记为 `type/security`。
5. **[#89412](https://github.com/NousResearch/hermes-agent/issues/89412)** — 非挑战型服务器的 MCP OAuth 流程缺口。自 **2026-08-18** 开放，标记为重复——值得设立一个规范跟踪 issue。
6. **[#92146](https://github.com/NousResearch/hermes-agent/issues/92146)** — `needs-decision`，安全：`HERMES_HOME` 豁免短路受保护指令门禁（`SOUL.md`/`AGENTS.md` 无门禁）。自 **2026-08-22** 开放。
7. **[#94375](https://github.com/NousResearch/hermes-agent/issues/94375)** — `hermes doctor --fix` 留下不安全的 npm 应用（标记为重复，自 **2026-08-25** 仍开放）。
8. **[PR #104567](https://github.com/NousResearch/hermes-agent/pull/104567)** — Realms/可选每 agent Linux 桌面，自 **2026-09-06** 开放，`needs-decision`；影响面大，需要审查者投入。

**积压风险评估：** 四个 P1/安全条目（#109440、#107191、#109422、#39609）缺少关联修复 PR，是本快照中最大的单一健康风险。此外，标记为 `duplicate` 的开放 issue 比例很高，表明分类整合落后于接收速度——值得进行一次专门去重和设立规范跟踪 issue。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-13

## 1. 今日概览
IronClaw 在 2026-09-13 表现为**低活跃度**：**0 条 issue 更新**、**2 条 PR 更新**、**0 个新发布**。一个打开的 PR（#8098）为 turn-state lineage 元数据增加了回归覆盖，另一个已关闭的 PR（#8076）修复了助手对已断开连接的共享频道的处理。issue 跟踪器没有变动，因此在此窗口内没有新的用户报告缺陷或功能请求进入项目。总体项目健康度看起来**稳定但安静**，主要是维护、测试和助手行为修复，而非面向发布的变更。

## 2. 发布
过去 24 小时没有发布新版本。最新发布：**无**。  
从该数据窗口看，没有适用的破坏性变更或迁移说明。

## 3. 项目进展
- **[CLOSED] [nearai/ironclaw PR #8076](https://github.com/nearai/ironclaw/pull/8076) — fix(assistant): 区分已断开连接的共享频道**  
  作者：be-student | 创建：2026-09-06 | 更新：2026-09-12  
  此已关闭的修复区分已配对用户的共享频道断开连接与未配对账户，为用户消息和 bot 命令渲染频道特定指引，在产品、适配器和 OpenAI 兼容接口之间保持拒绝分类一致，并包含 Slack 能力更新。它推进了助手频道处理和面向用户的指引。

- **[OPEN] [nearai/ironclaw PR #8098](https://github.com/nearai/ironclaw/pull/8098) — test(turns): 锁定状态派生的 lineage 丢弃行为**  
  作者：huiq777 | 创建：2026-09-12 | 更新：2026-09-12  
  这个打开的测试 PR 在现有 terminal-rewrite lineage 测试旁补充了缺失的反向回归测试。它证明所声称的元数据最初携带 depth、activation provenance 和 descendant cap，然后锁定随后由 `TurnRunState` 派生的快照会故意省略全部三个 lineage 字段。它推进了 turn-state lineage 行为的测试覆盖和回归安全性。

## 4. 社区热门话题
在提供的数据中，没有 Issue 或 PR 记录有评论或反应。两个更新的 PR 都显示 **0 👍** 和 **undefined comments**，因此今天没有真正的“热门话题”讨论。

唯一更新的条目是：
- [#8076 — fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)
- [#8098 — test(turns): pin state-derived lineage drop](https://github.com/nearai/ironclaw/pull/8098)

从 PR 摘要暗示的潜在需求：
- 当已配对用户的共享频道断开连接时，助手行为和指引更清晰。
- 对 turn lineage 元数据语义是有意为之且受测试保护的更强信心。

## 5. 缺陷与稳定性
过去 24 小时没有通过 Issue 报告新缺陷、崩溃或回归：**0 个 issue 更新**。

相关 PR 活动：
- **[CLOSED] [PR #8076](https://github.com/nearai/ironclaw/pull/8076)** 似乎解决了一个助手频道分类/UX 问题：区分已断开连接的共享频道与未配对账户，并提供频道特定指引。修复 PR 存在且已关闭。根据摘要，严重程度可能为**中等**，没有崩溃或数据丢失迹象。
- **[OPEN] [PR #8098](https://github.com/nearai/ironclaw/pull/8098)** 是针对 turn-state lineage 字段的预防性回归测试覆盖，而不是已报告的生产缺陷修复。它锁定了由 `TurnRunState` 派生的快照省略 depth、activation provenance 和 descendant cap 的预期行为。

## 6. 功能请求与路线图信号
Issue 中没有记录新功能请求：**0 个 issue 更新**。

来自 PR 摘要的低置信度路线图信号：
- 围绕**助手频道处理**的持续打磨，包括断开连接的共享频道和 Slack 能力更新（#8076）。
- 针对 **turn-state lineage 元数据**语义的持续测试加固（#8098）。

根据这些数据，下一版本更可能包含**助手行为修复和回归测试改进**，而不是重大新功能工作。提供的数据中没有版本目标或路线图承诺。

## 7. 用户反馈摘要
此窗口没有可用的评论/反应数据或新用户反馈。仅从 PR 摘要推断的痛点：
- 当已配对用户的共享频道断开连接，而不是未配对时，用户和 bot 可能需要更清晰的指引（#8076）。
- 开发者可能需要确信 lineage 元数据在由 `TurnRunState` 派生的快照中被有意丢弃（#8098）。

提供的数据集中没有满意度/不满意度指标。

## 8. 积压事项观察
提供的数据中没有出现长期未答复的 Issue 或 PR。今天报告**没有 issue 积压**。

唯一打开的 PR 是：
- [#8098 — test(turns): pin state-derived lineage drop](https://github.com/nearai/ironclaw/pull/8098) — 创建并更新于 2026-09-12，因此仅约一天。它有 0 个反应和 undefined comments；它并不陈旧，但它是需要关注审查/合并的主要事项。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-13

**数据快照：** 过去 24 小时有 17 个 issue 更新（14 个开放/活跃，3 个已关闭）· 7 个 PR 更新（7 个开放，0 个已合并/已关闭）· 0 个新版本。所有列出的 issue 均显示 0 👍；下方活跃度排名按评论数排序。

## 1. 今日概览

QwenPaw 在过去 24 小时内 issue 和 PR 活跃度很高，但没有代码合并，也没有版本发布。活动集中在稳定性和兼容性上：MCP/ACP 协议处理、workspace-watcher 冻结、内存耗尽、模型/会话持久化以及插件商店 UX。社区贡献者为若干高影响 bug 提交了针对性修复 PR，但尚无一个落地，因此面向用户的缓解仍待发布。整体项目健康度：分诊积极、贡献者势头强劲，但被未解决的关键稳定性/安全性报告以及今日零合并吞吐所抵消。

## 2. 版本发布

过去 24 小时没有新版本发布。没有需要报告的破坏性变更或迁移说明。

## 3. 项目进展

- **今日已合并/关闭的 PR：** 0。没有 PR 代码落地。
- **今日已关闭的 issue：** 3 个 —— [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676)、[#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582)、[#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664)。数据集中未说明解决细节。
- **正在推进修复/功能的开放 PR：**
  - [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) `fix(acp): select permission options by protocol kind` — 针对 [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726)。
  - [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) `fix(mcp): recognize Java jsonRpcError envelope on discover probe` — 针对 [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728)。
  - [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) `fix(workspace): replace blocking watchfiles.awatch SSE watcher with threaded polling` — 针对 [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721)。
  - [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) `fix(console): emit an error event when stream_one fails` — 提升客户端故障可见性。
  - [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) `feat(memory): allow a separate model for ReMeLight memory writing` — 与已关闭的 [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) 相关。
  - [#7718](https://github.com/agentscope-ai/QwenPaw/pull/7718) `fix(telegram): render approval-card markdown via HTML parse_mode`。
  - [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) `fix(agents): diagnose dropped subagent model overrides` — 与已关闭的 [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) 相关。

## 4. 社区热门话题

按评论数排序的最活跃 issue：

- [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) — **QwenPaw 2.x 上的 A2A 支持**（3 条评论）。用户指出架构文档提到统一 MCP/A2A/ACP Driver 支持，但仅实现了 MCP。潜在需求：官方 A2A 时间表和协议对齐。
- [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) — **已配置的 LLM 消失**（3 条评论）。Windows 桌面版 2.2.1 用户报告模型设置在使用过程中消失。潜在需求：可靠的配置持久化。
- [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) — **arxiv.org 不可达时 Daily Paper 静默失败**（3 条评论）。误导性的“已完成但未返回内容”掩盖了代理/网络错误。潜在需求：可配置端点/代理和真实的诊断信息。
- [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — **`subagent_model` 不生效**（3 条评论，已关闭）。生成的子代理继承父级 `active_model`。潜在需求：按任务/按代理选择模型。

其他值得关注的活跃条目：

- [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) — 桌面版 2.2.1 会话丢失及模型丢失（2 条评论）。
- [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) — MCP `server/discover` HTTP 500，涉及 Java/Kotlin SDK envelope 问题（2 条评论；修复 PR [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) 开放）。
- [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) — 通过三条叠加路径导致内存耗尽（2 条评论）。
- [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) — 升级到 2.2.x 后 MCP 无法连接/注册（2 条评论）。

**数据集中 PR 评论数报告为 `undefined`**，因此热门话题排名由 issue 驱动。

## 5. Bug 与稳定性

按严重程度排序，并在已知时附上修复 PR 状态：

1. **严重 — [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)：内存耗尽 / OOM / 挂起。** 无界流缓冲区、keep-alive 实例堆叠以及 doom-loop 门控绕过；提供了受控复现。未列出直接修复 PR。
2. **严重/高 — [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721)：工作区文件浏览器冻结整个服务器。** 大型工作区通过 `watchfiles.awatch`/RustNotify 同步初始化阻塞事件循环。修复 PR [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) 开放。
3. **高 — [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724)：对话/会话丢失和模型丢失。** 桌面版 2.2.1 用户在中断后无法找到先前的会话。未列出修复 PR。
4. **高 — [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)：已配置的 LLM 消失。** Windows 桌面版 2.2.1 反复出现的问题；用户必须重新选择模型。未列出修复 PR。
5. **高 — [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727)：工作区外写入硬阻止被 kimi-code Write 工具通过 ACP 绕过。** 安全边界问题；`_paths` 提取漏掉了 kimi toolCall 字段。未列出修复 PR。
6. **高 — [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716)：自 2.2.x 起 MCP 无法连接/注册。** 从 2.1.1b3 到 2.2.0/2.2.1 的回归。未列出修复 PR。
7. **中/高 — [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728)：MCP `server/discover` HTTP 500，涉及非标准 `jsonRpcError` envelope。** Java/Kotlin MCP SDK 服务器被拒绝。修复 PR [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) 开放。
8. **中 — [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715)：arxiv.org 不可达时 Daily Paper 静默失败。** 没有代理/端点配置；收件箱消息具有误导性。未列出修复 PR。
9. **中 — [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726)：ACP `trusted: true` 静默回退到交互式提示。** `_pick_allow_option` 仅匹配 `allow_*` optionIds。修复 PR [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) 开放。
10. **中 — [#7720](https://github.com/agentscope-ai/QwenPaw/issues/7720)：Creator 将 prompt-sync 阻塞隐藏在 GATED 之后。** 缺少手动图像验收；故事板生成受阻。未列出修复 PR。
11. **中 — [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730)：插件目录读取失败绕过了文档化的离线回退。** 连接重置/CDN 响应中断会返回服务器错误，而不是带错误字段的空目录。未列出修复 PR。

**需要关注的回归：** [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) 明确与 2.2.x 升级相关。[#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) 和 [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) 是反复出现的桌面版 2.2.1 模型/会话丢失报告。

## 6. 功能请求与路线图信号

- [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) — **QwenPaw 2.x 中的官方 A2A 支持。** 开放路线图问题；当前工作以 MCP/ACP 修复为主，因此除非维护者确认时间表，A2A 可能属于较长期事项。
- [#7731](https://github.com/agentscope-ai/QwenPaw/issues/7731) — **文件面板中针对点前缀文件/文件夹的开关。** 低复杂度 UI 请求；可能成为近期增强。
- [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) — **DeepSeek 原生能力元数据、prompt 前缀稳定性、KV-cache 可观测性。** 提供商级增强提案；若被优先考虑，可能进入提供商路线图。
- [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) — **为 ReMeLight 使用独立记忆模型。** 已关闭，实现 PR [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) 开放；若合并，很有可能进入下个版本。
- [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) — **插件商店一键更新和更新通知。** 已关闭的 UX 请求；表明对插件市场的持续投入。
- [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — **子代理模型覆盖行为。** 已关闭，但相关诊断 PR [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) 仍开放；表明模型路由工作仍在继续。

**预测：** 下个版本可能包含 MCP/ACP 兼容性修复、workspace-watcher 解阻塞、控制台错误传播，以及若 PR [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) 合并可能包含 `memory_model` 配置。A2A 官方支持仍是最大的开放路线图信号。

## 7. 用户反馈摘要

**报告的痛点：**
- 桌面端模型设置和会话消失（[#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)、[#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724)）。
- 升级到 2.2.x 后 MCP 损坏（[#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716)、[#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728)）。
- 工作区文件浏览器导致整个服务器冻结（[#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721)）。
- 内存耗尽/OOM/挂起（[#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)）。
- 通过 ACP/kimi-code 绕过安全边界（[#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727)）。
- 插件商店摩擦：反复手动更新且没有更新通知（[#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582)）。
- 使用昂贵的主模型进行后台记忆写入（[#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664)）。
- Daily Paper 和插件目录中的静默失败与糟糕诊断（[#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715)、[#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730)）。
- Creator 工作流因 GATED 状态受阻（[#7720](https://github.com/agentscope-ai/QwenPaw/issues/7720)）。

**使用场景：** Windows/macOS 上的桌面助手、多渠道运行（飞书/QQ/OneBot）、MCP/ACP 集成、记忆/定时任务、跨多台机器的大量插件部署。

**情绪：** 社区活跃，有具体复现和首次贡献者 PR。不满主要集中在 2.2.x 之后的可靠性、配置/会话持久化、安全边界和诊断。今日没有合并修复，因此用户可见的缓解尚未落地。

## 8. 积压事项观察

需要维护者关注的重要开放事项：

- [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) — A2A 支持时间表；自 2026-09-02 开放，3 条评论，数据中未见官方答复。
- [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) + [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) — 模型/会话丢失类问题；反复出现的桌面端数据丢失风险，尚无修复 PR。
- [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) — 关键内存耗尽/OOM/挂起，带有受控复现；需要优先处理。
- [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) — 通过 ACP/kimi-code 绕过工作区外写入；安全敏感，仅 1 条评论。
- [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) — 自 2.2.x 起的 MCP 回归；对集成影响大，尚无修复 PR。
- 等待审查/合并的开放 PR：[#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680)、[#7718](https://github.com/agentscope-ai/QwenPaw/pull/7718)、[#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719)、[#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723)、[#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725)、[#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)、[#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)。
- [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730) — 插件目录离线回退缺口。
- [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) — DeepSeek 提供商提案；以及 [#7731](https://github.com/agentscope-ai/QwenPaw/issues/7731) — 点文件开关，两者都是范围清晰的功能请求，但截至目前评论量较低。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-13
_报告窗口：过去 24 小时的 GitHub 活动，数据截至 2026-09-12。_

## 今日概览
ZeroClaw 在过去 24 小时表现出高活跃度：更新了 24 个 issue 和 50 个 PR，关闭了 6 个 issue，合并/关闭了 11 个 PR，但没有新发布。Bug 分诊聚焦于 Windows advisory nextest 失败、运行时历史持久性、提供方重试行为、内存并发和渠道 UX。维护者和贡献者正在积极接受、关闭并跟进 P1/P2 issue，同时若干大型安全/插件/运行时 PR 仍处于评审中。项目吞吐量健康度很强，但 Windows CI 和高严重性数据丢失或工作流阻塞 bug 中可见稳定性债务。

## 发布
报告窗口内没有新发布。没有可用的发布说明、破坏性变更或迁移指南。

## 项目进展
**已关闭 issue（6 个）：**
- [#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534) — 受限委托会静默剥离 `delegate` 工具，与 `delegation_policy`/`max_delegation_depth` 相矛盾。
- [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) — 当回复以 `[` 开头时，Telegram 语音回复被跳过（ElevenLabs v3 音频标签）。
- [#10277](https://github.com/zeroclaw-labs/zeroclaw/issues/10277) — 已发布的 `zerorelay` 镜像基础标签按 digest 固定。
- [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) — 当守护进程健康时，`zeroclaw service logs` 在 macOS、Windows 和 OpenRC 上没有任何输出。
- [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) — 成本账本将缓存写入按普通输入费率计价，低估了缓存未命中。
- [#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436) — 原生 OpenRouter 流式传输使用总请求超时，会截断活跃响应。

**top-20 样本中可见的已关闭/已合并 PR：**
- [#10726](https://github.com/zeroclaw-labs/zeroclaw/pull/10726) — 按 digest 固定已发布的 relay 基础镜像。
- [#10091](https://github.com/zeroclaw-labs/zeroclaw/pull/10091) — 加固响应缓存存储权限。
- [#10449](https://github.com/zeroclaw-labs/zeroclaw/pull/10449) — 以仅所有者权限创建 Edge TTS 产物。
- [#9577](https://github.com/zeroclaw-labs/zeroclaw/pull/9577) — 使用代码库内工具 fixture 端到端验证类型化插件配置。
- [#10169](https://github.com/zeroclaw-labs/zeroclaw/pull/10169) — 将 ADR-014 插件出口权限作为 proposed 提交。

**进行中的工作：**
- [#10775](https://github.com/zeroclaw-labs/zeroclaw/pull/10775) — 当 RPC 模式替换失败时保留活动会话。
- [#10813](https://github.com/zeroclaw-labs/zeroclaw/pull/10813) — 拒绝过期的 SOP 步骤结果和重复的 headless 驱动。
- [#10266](https://github.com/zeroclaw-labs/zeroclaw/pull/10266) — 为 WhatsApp Web 实现 `is_direct_message`。
- [#9724](https://github.com/zeroclaw-labs/zeroclaw/pull/9724) — 让 `always_ask` 在 Full 自主模式下仍然生效。
- [#10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401) — 让 Telegram 未授权通知可配置并感知授权状态。
- [#10751](https://github.com/zeroclaw-labs/zeroclaw/pull/10751) — 将完整插件连接预算耗尽报告为 connection-limit-reached。

_注：总体共有 11 个 PR 已合并/关闭；提供的 top-20 样本仅暴露 5 个已关闭 PR，因此此列表不完整。_

## 社区热门话题
报告窗口内评论最多的 issue：
- [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — **6 条评论**。`RpcDispatcher::process_line` 运行时距离其 2 MB 栈保护仅 2% 余量，由 Advisory Windows nextest 暴露。底层需求：跨平台 CI 可靠性与运行时栈安全。
- [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) — **2 条评论**。失败的 Code/ACP 轮次会从持久历史中丢弃已接受的提示和已完成的工具交互。底层需求：提供方失败时持久、可恢复的会话历史。
- [#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534) — **2 条评论，已关闭**。受限委托在配置存在时仍剥离 delegate 工具。底层需求：配置与委托策略一致性。
- [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) — **2 条评论，已关闭**。当文本以 `[` 开头时，Telegram TTS 语音回复被静默跳过。底层需求：可预测的渠道输出模态处理。

数据集中未提供 PR 评论/反应计数。按范围和更新活跃度来看，高关注度 PR 包括：
- [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) — 规范主体与共享授权解析。
- [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) — 协调 agent 生命周期变更。
- [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) — 在历史裁剪事件上暴露 token 统计；标记为 blocked/do-not-merge。
- [#8862](https://github.com/zeroclaw-labs/zeroclaw/pull/8862) 和 [#8949](https://github.com/zeroclaw-labs/zeroclaw/pull/8949) — 受治理的插件 webhook 入口与类型化 challenge 回复。
- [#9139](https://github.com/zeroclaw-labs/zeroclaw/pull/9139) 和 [#9138](https://github.com/zeroclaw-labs/zeroclaw/pull/9138) — 持久调度器 outbox 与类型化事件路由基础。

底层需求：可靠的 Windows CI、持久运行时历史、一致的工具/配置策略、成熟的插件平台原语，以及安全的身份/权限处理。

## Bug 与稳定性
根据提供的数据按严重程度排序：

- **S0 — 数据丢失：** [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) — 当 `store()` 调用重叠时，Markdown 记忆后端会静默丢失已存储条目。P1，风险高，`memory:backend`。未列出修复 PR。
- **S1 — 工作流阻塞：** [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) — MCP 连接因一次失败恢复尝试而被永久污染。未列出修复 PR。
- **P1/S2：** [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — `RpcDispatcher::process_line` 在 Windows advisory nextest 中接近 2 MB 栈保护边界。
- **P1/S2：** [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) — 失败的 Code/ACP 轮次会丢弃已接受的提示和已完成工具交互。
- **P1/高风险：** [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) — zerocode 通知延迟会通过 `begin_notification_resync → session/cancel` 取消每个正在运行的轮次。
- **P2/S2：** [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) — 单候选流恢复忽略 `provider_retries`；过载 529 只获得一次立即重试，没有退避。
- **P2/S2：** [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) — `zeroclaw agent` 交互式 REPL 从不启用终端 IUTF8；多字节字符后的退格会删除原始字节。
- **P2/S3：** [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793)、[#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794)、[#10805](https://github.com/zeroclaw-labs/zeroclaw/issues/10805) — 多个 Windows advisory nextest 失败：仅 Windows 的测试失败、publish-contract 失败，以及控制平面进程拆除竞态。
- **P2：** [#10791](https://github.com/zeroclaw-labs/zeroclaw/issues/10791) — 终端写入器失败后停用本地 RPC 连接。
- **P3：** [#10802](https://github.com/zeroclaw-labs/zeroclaw/issues/10802) — `session/list-acp` 报告的 `message_count` 与 `turn_end` 不同。
- **P3：** [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) — ZeroCode 聊天输入忽略 Delete 键。

窗口内已关闭的 bug 包括 [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)、[#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)、[#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436)、[#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)、[#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534)。提供的数据中，大多数未解决的高严重性 bug 没有关联的修复 PR。

## 功能请求与路线图信号
- [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) — 填充 `DocumentMessage.jpegThumbnail`，使通过 WhatsApp 发送的 PDF 能在手机上预览。
- [#10400](https://github.com/zeroclaw-labs/zeroclaw/issues/10400) — 可配置的 Telegram 未授权发送者通知，并感知渠道授权路径。实现 PR [#10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401) 已开放。
- [#8733](https://github.com/zeroclaw-labs/zeroclaw/issues/8733) — models.dev 目录仅解析模型 ID；视觉等逐模型能力被丢弃。
- [#10792](https://github.com/zeroclaw-labs/zeroclaw/issues/10792) — 澄清守护进程拒绝重载后的 Windows 恢复方式。
- [#10789](https://github.com/zeroclaw-labs/zeroclaw/issues/10789) — 本地化 ZeroCode 守护进程启动诊断信息。
- 路线图级 PR 信号：[#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) 安全主体/授权，[#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) agent 生命周期协调，[#9139](https://github.com/zeroclaw-labs/zeroclaw/pull/9139)/[#9138](https://github.com/zeroclaw-labs/zeroclaw/pull/9138) 插件 outbox/事件路由，[#8908](https://github.com/zeroclaw-labs/zeroclaw/pull/8908) 插件包目录，以及 [#10562](https://github.com/zeroclaw-labs/zeroclaw/pull/10562) 关于 holding-crate 例外情况的 ADR。

若合并，下一版本候选可能包括安全身份/权限、插件平台成熟度、Telegram/WhatsApp 渠道 UX、提供方重试/成本正确性，以及 Windows CI 稳定化。数据中未暗示版本或发布日期。

## 用户反馈摘要
真实用户痛点集中在静默降级、数据丢失和平台不一致：
- 数据丢失：[#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) 记忆后端并发问题。
- 工作流阻塞：[#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) MCP 恢复污染。
- 运行时/会话可靠性：[#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785)、[#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)。
- Windows CI 噪音：[#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)、[#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793)、[#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794)、[#10805](https://github.com/zeroclaw-labs/zeroclaw/issues/10805)。
- 终端/渠道 UX：[#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795)、[#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796)、[#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812)。
- 提供方/成本/日志：[#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787)、[#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)、[#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436)、[#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)。

所列 issue 上没有记录反应或 👍。情绪未被直接捕获，但反馈模式显示活跃技术用户正在遇到边缘情况；维护者通过关闭和后续 issue 做出响应。不满主要针对静默失败和跨平台不一致，而非缺少核心能力。

## 待办积压观察
需要维护者关注或长期处于特定状态的事项：
- [#8733](https://github.com/zeroclaw-labs/zeroclaw/issues/8733) — 自 2026-07-05 起，0 条评论，P2 `status:no-stale`；models.dev 能力被忽略。对模型特定的视觉支持很重要。
- [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) — 自 2026-08-03 起，`status:blocked`、`do-not-merge`；历史裁剪事件上的 token 统计。
- [#8862](https://github.com/zeroclaw-labs/zeroclaw/pull/8862) — 自 2026-07-08 起，`needs-author-action`，堆叠；受治理的插件 webhook 入口。
- [#8949](https://github.com/zeroclaw-labs/zeroclaw/pull/8949) — 自 2026-07-10 起，`needs-author-action`，堆叠；类型化插件 webhook challenge 回复。
- [#8908](https://github.com/zeroclaw-labs/zeroclaw/pull/8908) — 自 2026-07-09 起；插件包目录。
- [#9139](https://github.com/zeroclaw-labs/zeroclaw/pull/9139) 和 [#9138](https://github.com/zeroclaw-labs/zeroclaw/pull/9138) — 自 2026-07-18 起；持久调度器 outbox 与类型化事件路由。
- [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) — 自 2026-08-22 起，`needs-author-action`；规范主体/安全授权。
- [#10266](https://github.com/zeroclaw-labs/zeroclaw/pull/10266) — 自 2026-08-23 起，`needs-maintainer-review`；WhatsApp Web 直接消息处理。
- [#10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401) — 自 2026-08-26 起，`needs-author-action`、`stale-candidate`；Telegram 未授权通知。
- [#10562](https://github.com/zeroclaw-labs/zeroclaw/pull/10562) — 自 2026-09-02 起，`needs-maintainer-review`；关于 holding-crate 例外情况的 ADR。
- [#10400](https://github.com/zeroclaw-labs/zeroclaw/issues/10400) — 开放，进行中，风险高；可配置的 Telegram 未授权发送者通知。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*