# AI CLI 工具社区动态日报 2026-09-14

> 生成时间: 2026-09-14 00:23 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# 跨工具对比报告 — AI CLI 生态，2026-09-14

## 1. 生态概览
AI CLI 生态正处于**可靠性、编排与平台一致性阶段**，而非大规模功能发布阶段。多数工具没有发布任何版本，但围绕多智能体工作流、会话完整性、沙箱、MCP 以及 Windows/WSL/Linux 一致性的 issue 数量仍居高不下。Claude Code、Codex、Copilot CLI 等商业/企业工具用户参与度很高，但 PR 吞吐不均衡；OpenCode、Pi、Qwen Code 等开源工具迭代更快，也暴露出更多回归问题。最显著的跨工具信号是：用户现在期望智能体集群可观测、可取消、可按上下文配置，并能跨平台可移植。

## 2. 活跃度对比

*N/A 表示摘要中未提供数据；它并不代表零。所提供摘要均未明确报告上游 Issues/PRs 被禁用，因此 N/A 仅用于缺失数据。*

| 工具 | Issues（24h / 列出） | PRs（24h / 列出） | Discussions | 发布状态 |
|---|---:|---:|---:|---|
| **Claude Code** | 已更新 50 个；最高 #42776 有 182 条评论 | 已更新 5 个 | 无数据 | 无 |
| **OpenAI Codex** | 列出 10 个热门；总数未说明 | 已更新 10 个 | 列出 10 个热门 | 无 |
| **Gemini CLI** | 不可用 — 摘要失败 | 不可用 | 不可用 | 不可用 |
| **GitHub Copilot CLI** | 已更新 4 个；均已列出 | 已更新 2 个；均为已关闭的 Dependabot 升级 | 无数据 | 无 |
| **OpenCode** | 列出 10 个热门；总数未说明 | 已更新 10 个 | 无数据 | 无 |
| **Pi** | 已更新 29 个 | 已更新 8 个 | 1 | 无 |
| **Qwen Code** | 列出 10 个热门 + 关注列表；总数未说明 | 列出 10 个 + 活跃 | 无数据 | Nightly `v0.23.3-nightly.20260913...`；`cua-driver-rs v0.20.6` |

**有数据支撑的参与度亮点：** Claude Code 的 #42776（182 条评论）和 #15942（437 👍）仍是单个 issue 中最大的参与信号。Codex 的远程控制讨论 #9200 有 190 👍。OpenCode 的剪贴板 bug #4283 有 133 条评论和 124 👍。Qwen 的 React #185 集群现已分散到四个 P1 issue 中。

## 3. 共同功能方向

- **多智能体可观测性、控制与生命周期**  
  出现在 **Claude Code**（Agent Hierarchy Dashboard #24537；按智能体配置模型/effort #66402）、**Codex**（持久 PR 会话 #45284；会话内调度 #25466）、**Copilot CLI**（实时进度流式传输 #2254；token 缓存 bug #4829）、**OpenCode**（后台子智能体取消 #36423）、**Qwen Code**（后台智能体、Agent Board #11755）以及 **Pi**（会话树修剪 #9531；对话中途系统消息 #9548）。

- **会话/上下文持久性与压缩正确性**  
  普遍存在于 **Codex**（历史记录消失 #44035）、**OpenCode**（会话卡住 #43277）、**Pi**（压缩截断 #9075、transcript 被清除 #9555）、**Qwen Code**（`/delete` 留下日志 #11762）以及 **Claude Code**（定时任务模型选择器 #91884）。

- **跨平台一致性，尤其是 Windows/WSL/Linux**  
  这是 **Claude Code**（#42776、#91264、#93442）、**Codex**（#41463、#31073、#36475）、**OpenCode**（#34442、#48762）、**Qwen Code**（#11747、#11778）和 **Copilot CLI**（#4833 Linux 语音崩溃）中的主要痛点集群。

- **沙箱、权限、隐私与凭证隔离**  
  见于 **Codex**（Windows MXC 沙箱、token/SID 校验）、**Qwen Code**（`bwrap` 内核沙箱 #11614；容器化子智能体 #11711；shell 允许规则绕过 #11764；AUTO 审批 #11019）、**Claude Code**（安全过滤器误报；远程控制默认开启 #88094）、**Copilot CLI**（工作区 `.mcp.json` #4832）以及 **Pi**（MCP OAuth 刷新竞态 #9563）。

- **提供商/模型互操作与路由**  
  在 **Qwen Code**（按模型的 `wireApi` #11538；`metadata` 互操作 #11590）、**OpenCode**（LiteLLM #22212；`encrypted_content` #48741；PDF 重放 #48868）、**Pi**（Azure Foundry #9558；`serverTools` #9556；上下文大小默认值 #9566）和 **Codex**（MCP 启动故障 #44458）中尤为突出。

- **TUI/IDE 用户体验打磨与可逆性**  
  体现在 **Claude Code**（VS Code 字体 #34196；自动附加开关 #24726；焦点来回跳转 #90936）、**Codex**（禁用 whimsy #44561；scrollback #45271；历史搜索 #45262）、**OpenCode**（强制 V2 布局 #48837；剪贴板损坏 #4283）、**Pi**（全屏重绘 #9255；大 diff 崩溃 #8036）以及 **Qwen Code**（React #185 TUI 崩溃集群）。

- **成本/token 治理**  
  由 **Copilot CLI**（#4829 提示缓存/token 叠加）、**Codex**（过度网络搜索、速率限制耗尽）、**Qwen Code**（可配置的网络搜索预算 #11692）和 **OpenCode**（配额耗尽 #42340）凸显。

## 4. 差异化分析

| 工具 | 主要焦点 | 目标用户 | 技术路线 / 差异化 |
|---|---|---|---|
| **Claude Code** | 企业级 IDE 集成、VS 2026、安全/隐私、多智能体集群 | 专业/企业开发者 | IDE 覆盖面广；issue 参与度高但 PR 吞吐薄弱，表明维护者存在瓶颈。 |
| **OpenAI Codex** | OpenAI/ChatGPT 生态、远程控制、Windows 沙箱、持久 PR 会话 | OpenAI 用户、ChatGPT 集成工作流 | 以讨论驱动的生态强劲；围绕 Windows 沙箱和 TUI/会话元数据的 PR 加固活跃。 |
| **Gemini CLI** | 未知 | 未知 | 摘要生成失败；无可用的对比信号。 |
| **GitHub Copilot CLI** | GitHub 原生智能体工作流、MCP、语音 | GitHub/Copilot 企业用户 | 活跃窗口低迷；4 个 issue / 2 个依赖 PR。主要风险是 v1.0.83 MCP 加载和 Linux 语音崩溃。 |
| **OpenCode** | 开源灵活性、多项目/多 worktree 高级使用、提供商选择 | 开源高级用户、多智能体运维者 | PR 迭代快，但 V2 迁移引发强烈反弹；回归和会话状态 bug 是主要信任风险。 |
| **Pi** | TUI 性能、提供商正确性、可扩展性、会话架构 | 以终端为中心的高级用户、扩展开发者 | 分类处理节奏快且有架构性 PR；存在“未修复即关闭”导致贡献者摩擦的风险。 |
| **Qwen Code** | Qwen 生态、沙箱/容器隔离、daemon/web shell、i18n | Qwen/多提供商自托管、Web/daemon 用户 | Nightly 发布和活跃 PR，但 P1 React #185 崩溃与 CI 不稳定降低了稳定性。 |

## 5. 社区势头与成熟度

- **原始参与度最高：** Claude Code（#42776：182 条评论；#15942：437 👍）、OpenCode（#4283：133 条评论，124 👍）和 Codex（#9200：190 👍）。这些社区规模大、发声多，并愿意维持长讨论串。
- **迭代最快：** Qwen Code（nightly + CUA driver）、Pi（更新 29 个 issue / 8 个 PR，许多当天完成分类）、OpenCode（10 个 PR，许多 Windows/会话修复）和 Codex（10 个 PR，聚焦 Windows 沙箱、TUI、元数据）。
- **最成熟/最商业化姿态：** Claude Code、Codex 和 Copilot CLI 表现出对企业级/IDE 深度的关注，但 Copilot CLI 在本窗口期较为安静。Claude Code 更新 50 个 issue，却只有 5 个 PR，这是明显的积压风险信号。
- **维护者吞吐：** Pi 和 OpenCode 展现出高分类/PR 速度。Pi 当天关闭很高效，但如果“未修复即关闭”成为常态，可能会让贡献者沮丧。Claude Code 看起来 issue 丰富但 PR 稀少。
- **稳定性压力：** OpenCode 的 v1.18.30 all-prompt 回归、Qwen 的 React #185 TUI 崩溃集群和 CI 不稳定，以及 Copilot CLI 的 v1.0.83 MCP/语音 bug 表明，快速迭代正在增加发布质量风险。

## 6. 趋势信号

- **多智能体编排正成为基本要求。** 用户想要实时进度、取消、按智能体配置、会话归因和集群仪表盘——而不仅仅是并行智能体。
- **平台一致性如今是信任问题。** Windows/WSL/Linux 故障在每个主流工具中反复出现。沙箱设置、路径处理、终端状态和凭证上下文是主要摩擦点。
- **沙箱与权限正成为差异化功能。** 内核沙箱、容器化子智能体、工作区级 MCP 和稳健的审批分类器正从锦上添花变为安全关键。
- **上下文/会话生命周期是下一个战场。** 压缩正确性、持久 PR 会话、对话中途系统消息、持久导出以及删除/保留保证都是活跃的需求领域。
- **成本和 token 效率对智能体用户很重要。** 提示缓存、网络搜索预算、配额处理和速率限制耗尽直接影响多智能体可行性。
- **提供商抽象和 MCP 标准化具有战略意义。** 按模型的 wire API、OpenAI 兼容网关修复、服务端工具和 MCP OAuth 稳健性，是混合模型环境所必需的。
- **发布质量与可逆性是竞争优势。** 点版本回归和没有开关的强制 UI 迁移会引发最强烈的社区负面反应。在这一领域开发的开发者应优先考虑确定性 CI、迁移逃生通道和清晰的会话/数据保证。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — 社区亮点报告
*数据快照：2026-09-14 · 来源：github.com/anthropics/skills*

> **方法说明：** 源数据集中 PR 评论数返回为 `undefined`，因此以下排名使用复合关注度代理指标：(a) 从高评论数 Issue 交叉引用，(b) `updated_at` 的新近度/频率，以及 (c) 对捆绑技能的影响广度。所列 PR 均为 **开放中**；此窗口内未出现合并。

---

## 1. 热门技能排名

| # | 技能 / PR | 功能 | 讨论亮点 | 状态 |
|---|---|---|---|---|
| 1 | **[#1298](https://github.com/anthropics/skills/pull/1298)** — `skill-creator` 评测完整性修复 | 让 `run_eval.py` 将评测产物安装为真实技能；修复 Windows 流读取、触发检测、并行 worker | 直接闭环 [Issue #556](https://github.com/anthropics/skills/issues/556)（12 条评论、7👍，“10+ 次独立复现”）。描述优化循环此前一直在针对 `recall=0%` 噪声做优化——本组中影响最大的正确性修复。更新于 2026-09-13。 | 开放中 |
| 2 | **[#83](https://github.com/anthropics/skills/pull/83)** — `skill-quality-analyzer` + `skill-security-analyzer` | 两个元技能：5 维质量评分（结构、文档、示例、资源……）和安全分析器 | 与社区最热 Issue [#492](https://github.com/anthropics/skills/issues/492)（43 条评论）关于命名空间/信任滥用的主题关联最强。长期存续的 PR（2025-11-06 开启）——表明治理工具需求尚未满足。 | 开放中 |
| 3 | **[#1367](https://github.com/anthropics/skills/pull/1367)** — `self-audit` v1.3.0 | 机械式文件校验（步骤 0），随后按损害严重程度排序的四维推理质量门禁 | 不依赖模型/技术栈的“交付前审计”技能；与同一作者提出的 [Issue #1385](https://github.com/anthropics/skills/issues/1385) 推理质量门禁提案配套。 | 开放中 |
| 4 | **[#1742](https://github.com/anthropics/skills/pull/1742)** — `mcp-builder` SDK 兼容 | 迁移到 `mcp>=2`（`streamable_http_client`）和 `create_mcp_http_client`，以支持自定义请求头 | 修复 [#1668](https://github.com/anthropics/skills/issues/1668)；属于更广泛的 `mcp-builder` 可靠性问题簇，与 [#1724](https://github.com/anthropics/skills/pull/1724)、[#1602](https://github.com/anthropics/skills/pull/1602) 和 Issue [#1390](https://github.com/anthropics/skills/issues/1390) 相关。更新于 2026-09-13。 | 开放中 |
| 5 | **[#1607](https://github.com/anthropics/skills/pull/1607)** — `claude-api` 模型生命周期准确性 | 在 `shared/models.md` 中将四个已退役模型 ID 标记为已退役 | 修复 [#1603](https://github.com/anthropics/skills/issues/1603)；与高严重度 [#1487](https://github.com/anthropics/skills/issues/1487)（约 156k token 的急切注入，导致上下文耗尽）属于同一技能。 | 开放中 |
| 6 | **[#1628](https://github.com/anthropics/skills/pull/1628)** — `Hivemind` 多智能体编排 | 零成本委派：Claude Code 继续担任规划者/审查者/合并者，无头 `opencode` worker 在免费模型上执行机械性工作 | 新颖的框架：将上下文而非智能视为稀缺资源。 | 开放中 |
| 7 | **[#514](https://github.com/anthropics/skills/pull/514)** — `document-typography` | 防止生成文档中的孤词换行、寡行段落和编号错位 | 最早一批输出质量技能之一；长期休眠（最后更新 2026-03-13），但仍是“隐形输出打磨”的参考示例。 | 开放中 |
| 8 | **[#525](https://github.com/anthropics/skills/pull/525)** — `pyxel` 复古游戏开发 | 封装 `pyxel-mcp`，用于像素艺术/8 位 Python 游戏（编写 → run_and_capture → 检查 → 迭代） | 第三方 MCP 支持的技能；2026-09-13 重新激活，表明审查活动恢复。 | 开放中 |

*同样活跃：* [#1627 Buffer GraphQL](https://github.com/anthropics/skills/pull/1627)、[#1615 scnet-hpc](https://github.com/anthropics/skills/pull/1615)、[#1734 orphaned docx comments](https://github.com/anthropics/skills/pull/1734)、[#1099 Windows eval crash](https://github.com/anthropics/skills/pull/1099)。

---

## 2. 社区需求趋势

提炼自 Issue 跟踪器：

- **信任与安全边界（主导）。** [Issue #492](https://github.com/anthropics/skills/issues/492)（43 条评论）——社区技能以 `anthropic/` 命名空间发布，可通过冒充实现权限提升。由 [#1175](https://github.com/anthropics/skills/issues/1175) 进一步强化：该 Issue 涉及在 `SKILL.md` 内为 SharePoint 编写访问控制逻辑。**期望方向：签名/带来源证明的技能、命名空间隔离、权限透明。**
- **技能发现、分发与生命周期管理。** [#228](https://github.com/anthropics/skills/issues/228)（16 条评论，8👍）组织级技能共享；[#189](https://github.com/anthropics/skills/issues/189)（9👍）重复的 `document-skills`/`example-skills` 插件；[#62](https://github.com/anthropics/skills/issues/62) 用户技能悄然消失。**期望方向：共享技能库、去重、安全更新/回滚。**
- **评测与工具链可靠性。** [#556](https://github.com/anthropics/skills/issues/556)（12 条评论）0% 触发率；[#1390](https://github.com/anthropics/skills/issues/1390) `mcp-builder` 伪造工具错误 → 0/N 得分；[#1362](https://github.com/anthropics/skills/issues/1362) `web-artifacts-builder` pnpm ≥10.1 故障。**期望方向：可信的评测框架与跨平台脚本。**
- **上下文窗口经济学。** [#1487](https://github.com/anthropics/skills/issues/1487) `claude-api` 在一次调用中注入约 156k token；[#1329](https://github.com/anthropics/skills/issues/1329) `compact-memory` 符号化表示法；[#202](https://github.com/anthropics/skills/issues/202) `skill-creator` 冗长/非操作性的语气。**期望方向：延迟加载、token 高效的 SKILL.md 编写。**
- **智能体治理与推理质量门禁。** [#412](https://github.com/anthropics/skills/issues/412) 智能体治理（策略执行、威胁检测、信任评分、审计轨迹）以及 [#1385](https://github.com/anthropics/skills/issues/1385) 三道门禁流水线（任务前校准 → 对抗性审查 → 交付验证）。**期望方向：交付前验证、可审计的智能体行为。**
- **平台与协议互操作。** [#29](https://github.com/anthropics/skills/issues/29) AWS Bedrock 支持；[#16](https://github.com/anthropics/skills/issues/16) 将 Skills 暴露为 MCP。**期望方向：超越第一方界面的可移植性。**

---

## 3. 高潜力待落地技能

过去约 6 周内有活动（截至 2026-09-14）、尚未合并——最可能接下来落地：

1. **[PR #1298](https://github.com/anthropics/skills/pull/1298)** — `skill-creator` 评测修复（更新于 2026-09-13）。杠杆最高：解锁整个描述优化循环。
2. **[PR #1742](https://github.com/anthropics/skills/pull/1742)** — `mcp-builder` mcp>=2 + 自定义请求头（更新于 2026-09-13）。
3. **[PR #525](https://github.com/anthropics/skills/pull/525)** — `pyxel` 复古游戏开发技能（更新于 2026-09-13）。
4. **[PR #1734](https://github.com/anthropics/skills/pull/1734)** — 检测孤立的 docx 批注（更新于 2026-09-11）。
5. **[PR #1627](https://github.com/anthropics/skills/pull/1627)** — `buffer-api` 社交排期技能（更新于 2026-09-05）。
6. **[PR #1628](https://github.com/anthropics/skills/pull/1628)** — `Hivemind` 零成本多智能体编排（更新于 2026-08-24）。
7. **[PR #1615](https://github.com/anthropics/skills/pull/1615)** — `scnet-hpc` Slurm/SSH 集群操作（更新于 2026-08-24）。
8. **[PR #1602](https://github.com/anthropics/skills/pull/1602)** — 横切修复：评测序列化、基准指标、编码、脚本稳定性（更新于 2026-08-24）。

---

## 4. Skills 生态洞察

> **社区需求已经围绕信任与可验证性，而非能力广度凝聚：贡献者正优先处理可证明正确的评测（0% 召回率、伪造工具错误）、安全分发（命名空间冒充、插件重复）和上下文经济——也就是说，先让 Skills 在安装、度量和运行上值得信赖，再增加更多 Skills。**

---

**链接索引：** [PR #1298](https://github.com/anthropics/skills/pull/1298) · [PR #1099](https://github.com/anthropics/skills/pull/1099) · [PR #83](https://github.com/anthropics/skills/pull/83) · [PR #1367](https://github.com/anthropics/skills/pull/1367) · [PR #1742](https://github.com/anthropics/skills/pull/1742) · [PR #1607](https://github.com/anthropics/skills/pull/1607) · [PR #1628](https://github.com/anthropics/skills/pull/1628) · [PR #514](https://github.com/anthropics/skills/pull/514) · [PR #525](https://github.com/anthropics/skills/pull/525) · [Issue #492](https://github.com/anthropics/skills/issues/492) · [Issue #228](https://github.com/anthropics/skills/issues/228) · [Issue #556](https://github.com/anthropics/skills/issues/556) · [Issue #1487](https://github.com/anthropics/skills/issues/1487) · [Issue #1390](https://github.com/anthropics/skills/issues/1390)

---

# Claude Code 社区简报 — 2026-09-14

## 1. 今日亮点

过去 24 小时没有新版本发布，但社区活动依然火热：创纪录的 Windows 桌面重启 bug（#42776，182 条评论）和得票最高的 Visual Studio 2026 请求（#15942，437 👍）都出现了新动态。一位提交者（sworrl）集中提交了一批安全过滤器误报，其中许多已被关闭为重复项；与此同时，IDE/UX 打磨类请求（VS Code 字号、焦点处理、面板自动附加）继续主导增强需求积压。

## 2. 发布

过去 24 小时无。

## 3. 热门 Issue

1. **[#42776](https://github.com/anthropics/claude-code/issues/42776) — Windows 上桌面端无法重新启动（进程残留导致文件锁）** — 开放，182 条评论，88 👍。这是跟踪器中活跃度最高的讨论串；一个长期存在的文件锁 bug，导致 Windows 上桌面端无法干净地重启。尽管被标记为 `invalid`，但社区讨论量表明这是一个值得重新审视的真实平台可靠性问题。
2. **[#15942](https://github.com/anthropics/claude-code/issues/15942) — 添加对 Visual Studio 2026 集成的支持** — 开放，152 条评论，437 👍。看板上得票最高的 issue；企业用户强烈需要与现有 VS Code 路径并行的第一方 VS 2026 扩展。
3. **[#24726](https://github.com/anthropics/claude-code/issues/24726) — VS Code：增加禁用自动附加当前打开文件/选区的设置** — 开放，74 条评论，237 👍。用户希望侧边栏不再静默注入编辑器上下文；这是一个获得广泛支持、实现成本很低的直接开关。
4. **[#24537](https://github.com/anthropics/claude-code/issues/24537) — Agent 层级仪表板（TUI + Desktop）** — 开放，18 条评论。提议为多 Agent 工作流提供统一的实时可视化，解决 Agent 集群扩张时的可观测性缺口。
5. **[#34196](https://github.com/anthropics/claude-code/issues/34196) — VS Code 扩展：聊天面板字号设置** — 开放，16 条评论，91 👍。聊天面板字体比编辑器字体小，且无法覆盖；这是一个虽小但反复出现的可访问性/可读性抱怨。
6. **[#66402](https://github.com/anthropics/claude-code/issues/66402) — `/model` 和 `/effort` 会修改全局 `settings.json`** — 开放，16 条评论。破坏了 `claude agents` 集群视图中按 Agent 配置模型/effort 的能力；对多 Agent 用户来说是一个真实的架构缺口。
7. **[#88094](https://github.com/anthropics/claude-code/issues/88094) — Windows 上默认启用 Remote Control** — 开放，10 条评论。默认开启的远程行为引发隐私/安全担忧，且缺少明显的退出选项。
8. **[#91264](https://github.com/anthropics/claude-code/issues/91264) — Windows 上 PowerShell/Bash 工具调用会弹出抢焦点的控制台窗口** — 开放，2 条评论。每次工具调用都会抢走焦点；`settings.json` 中没有任何选项可以抑制窗口显示。
9. **[#93442](https://github.com/anthropics/claude-code/issues/93442) — Windows Cowork：`device_bash` 永久失效（“no Plan9 drive shares mounted”）** — 开放，2 条评论。重启和完整 OS 重启后仍然存在；据报道影响两个不同的桌面配置文件。
10. **[#94029](https://github.com/anthropics/claude-code/issues/94029) — `claude attach` 忽略 `CLAUDE_CODE_DISABLE_MOUSE`** — 开放，回归，有复现。在附加的后台会话中鼠标捕获始终开启，覆盖了文档中记录的环境变量。

其他值得关注：[#92885](https://github.com/anthropics/claude-code/issues/92885)（Cowork 执行模式可见性）、[#91884](https://github.com/anthropics/claude-code/issues/91884)（Desktop 计划任务模型选择器端到端损坏）、[#90936](https://github.com/anthropics/claude-code/issues/90936)（VS Code 面板间焦点来回跳转）、[#94062](https://github.com/anthropics/claude-code/issues/94062)（Android 物理键盘焦点丢失）。

## 4. 重点 PR 进展

1. **[#79148](https://github.com/anthropics/claude-code/pull/79148) — 为示例规则文件名添加必需的 `hookify.` 前缀**（开放）。修复示例规则被静默忽略的问题；加载器只会发现 `.claude/hookify.*.local.md`，但随附示例缺少该前缀。
2. **[#89404](https://github.com/anthropics/claude-code/pull/89404) — `validate-agent.sh`：不要在第一个警告处中止**（开放）。修复三处 `set -euo pipefail` 交互问题（包括 `((x++))` 返回非零），它们会导致有效 Agent 被误报。解决了 issue #83803。
3. **[#41621](https://github.com/anthropics/claude-code/pull/41621) — 添加缺失的 CLI 构建基础设施和打包器配置**（已关闭）。添加完整的 TS 源码构建流水线，用于将 CLI 打包为单个可执行文件，并附有 esbuild 文档。虽已关闭，但对任何从源码构建的人都有参考价值。
4. **[#93951](https://github.com/anthropics/claude-code/pull/93951) — 将 diff/sec-default/telemetry 测试移到对应 mod 旁边**（开放）。将行为测试集中放在 `mods/<mod>/tests/` 下，通过 `claude plugin test` 运行；这是迈向更清晰插件测试方案的一步。
5. **[#93932](https://github.com/anthropics/claude-code/pull/93932) — 将 telemetry mod 的 `types` 路径改为相对于 `./`**（已关闭）。一行修复，使 `plugin.json` 路径与 schema 要求一致。

该时间窗口内只有五个 PR 有更新，因此以上已全部列出。值得注意的是，相对于 issue 数量，PR 活动较为稀少——这可能是一个值得关注的维护吞吐量信号。

## 5. 热门讨论

本期未提供讨论数据。

## 6. 功能请求趋势

- **IDE 深度与对等性**：Visual Studio 2026 支持（#15942）、VS Code 字号控制（#34196）以及禁用自动附加（#24726）表明，用户需要更细粒度的 IDE 集成控制，而不是新的功能面。
- **多 Agent 可观测性与配置**：Agent 层级仪表板（#24537）加上按 Agent 配置模型/effort（#66402）揭示出，随着用户并发运行多个 Agent，对集群级管理的需求正在增长。
- **隐私与执行透明度**：Cowork 执行模式可见性（#92885）和远程控制默认值（#88094）表明，用户希望对离开本机的内容拥有明确且有文档记录的控制权。
- **跨平台对等性**：Windows 和 Android 问题（#42776、#91264、#93442、#94062）表明，非 macOS/Linux 体验仍然落后，尤其是在桌面生命周期和输入处理方面。

## 7. 开发者痛点

- **Windows 平台可靠性**：排名前三的 Windows 问题——进程残留锁、抢焦点的控制台窗口，以及 Cowork 中失效的 `device_bash`——代表了一簇长期存在的平台摩擦。#42776 上 182 条评论的讨论串凸显了这消耗了多少用户精力。
- **安全/AUP 过滤器误报**：一位提交者（sworrl）在 2026-09-14 及更早提交了大约十几个 issue，涵盖日志审查、CVE 录入、备份服务器认证排障以及聊天中沮丧感叹时的误拦截。许多被关闭为重复项，但这种模式对合法的安全和系统管理工作而言，是一种反复出现的高严重性（“会话中止”）干扰。
- **全局状态修改而非按上下文配置**：`/model` 和 `/effort` 写入全局 `settings.json`（#66402）破坏了 Agent 集群隔离；关于计划任务模型选择的类似抱怨（#91884）进一步说明，配置作用域是一个系统性缺口。
- **IDE 焦点与上下文摩擦**：自动附加文件上下文（#24726）、面板间焦点来回跳转（#90936）以及缺失的聊天字号设置（#34196）共同描绘出一个可能让人感到侵入而非助手的 VS Code 扩展。
- **PR 吞吐量偏低**：24 小时内仅有五个 PR 被处理，而有 50 个 issue 有更新，维护者与社区的比例表明，积压累积可能成为瓶颈。

---

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-14

## 今日亮点
过去 24 小时没有发布新版本。Windows/WSL 和沙箱可靠性仍然是 Issues 中的主导主题，最热 bug（#41463）获得 54 条评论和 33 个 👍。与此同时，社区 Discussions 显示出对从 ChatGPT 应用进行远程控制、持久化 PR 会话以及生态系统工具的强烈需求。

## 发布
过去 24 小时没有新版本。

## 热门 Issue

1. **[#41463] [Windows + WSL] 无法创建项目 – AbsolutePathBuf 在没有基路径的情况下被反序列化**  
   https://github.com/openai/codex/issues/41463  
   *为什么重要：* 阻止 Windows + WSL2 用户在 Codex Desktop 中创建项目。  
   *反应：* 54 条评论，33 个 👍 —— 今日互动量最高的未解决 bug。

2. **[#31073] Windows 原生沙箱：Git HTTPS 远程操作在 Codex 内失败/崩溃，但在普通 PowerShell 中正常**  
   https://github.com/openai/codex/issues/31073  
   *为什么重要：* 沙箱网络/凭据处理破坏了 Windows 上常规 Git 远程工作流。  
   *反应：* 28 条评论，自 7 月以来持续。

3. **[#44781] [Codex Desktop] 编辑并重新发送排队消息会触发 "App-server queued follow-up no longer exists"**  
   https://github.com/openai/codex/issues/44781  
   *为什么重要：* 破坏了桌面应用中的消息排队和后续编辑。  
   *反应：* 22 条评论，26 个 👍 —— 用户影响大。

4. **[#44561] 默认关闭 whimsy 效果（astra stars）**  
   https://github.com/openai/codex/issues/44561  
   *为什么重要：* TUI 视觉效果被视作故障，需要手动配置才能禁用。  
   *反应：* 15 条评论，31 个 👍 —— 强烈的 UX 反对意见。

5. **[#36475] Windows 沙箱刷新失败：现有 .sandbox-bin 上 SetNamedSecurityInfoW(ERROR_ACCESS_DENIED) 后出现 helper_sandbox_lock_failed**  
   https://github.com/openai/codex/issues/36475  
   *为什么重要：* 由于 ACL/锁处理问题，Windows 沙箱设置持续失败。  
   *反应：* 11 条评论，仍未解决。

6. **[#20988] Codex 现在更频繁且在不必要的时间搜索网页**  
   https://github.com/openai/codex/issues/20988  
   *为什么重要：* 模型行为回归，增加了延迟/噪声；现已关闭。  
   *反应：* 10 条评论，2 个 👍 —— 自 5 月以来一直跟踪。

7. **[#44458] macOS：CLI 0.154.0 实验性能力破坏了捆绑的 Messages 和 Computer History MCP 启动**  
   https://github.com/openai/codex/issues/44458  
   *为什么重要：* macOS 上的 MCP 启动回归破坏了捆绑集成。  
   *反应：* 9 条评论，3 个 👍。

8. **[#44035] [Windows App 26.901.6511.0] 最近聊天历史消失；rollout 保留较新消息时 read_thread 保持陈旧**  
   https://github.com/openai/codex/issues/44035  
   *为什么重要：* 历史同步 bug 导致桌面应用中看似数据丢失。  
   *反应：* 9 条评论，3 个 👍。

9. **[#45119] macOS 14.2：沙箱启动失败，未绑定变量 TIOCSTI**  
   https://github.com/openai/codex/issues/45119  
   *为什么重要：* 较旧 macOS 版本上沙箱启动完全失败。  
   *反应：* 8 条评论，今日更新。

10. **[#25466] 功能：会话内调度工具（Cron + ScheduleWakeup）和 /loop 命令**  
    https://github.com/openai/codex/issues/25466  
    *为什么重要：* 面向长时间运行代理会话的高需求自动化原语。  
    *反应：* 14 个 👍，2 条评论 —— 列表中信号最强的功能请求。

## 关键 PR 进展

1. **[#45276] 在 agents 概览中添加 worktree 会话创建**  
   https://github.com/openai/codex/pull/45276  
   为本地会话添加可配置的 `new_worktree` 操作并绑定到 `w`，从缓存的项目默认分支创建工作树。

2. **[#45271] 扩大 TUI 视口时保留终端回滚缓冲区**  
   https://github.com/openai/codex/pull/45271  
   防止 QTermWidget 和 xterm.js 在视口扩大时丢失历史。

3. **[#45262] 将粘贴内容路由到活动历史搜索查询**  
   https://github.com/openai/codex/pull/45262  
   修复 `Ctrl+R` 历史搜索，使粘贴文本追加到活动查询，而不是经过正常的 composer 处理。

4. **[#45255] 直接从命令中心打开新会话**  
   https://github.com/openai/codex/pull/45255  
   用会话列表替换内联任务 composer；`n` 打开空白会话，不打断正在运行的 agents。

5. **[#45248] 将捕获的步骤设置用于请求元数据和工具钩子**  
   https://github.com/openai/codex/pull/45248  
   确保模型/推理强度元数据反映发起请求或工具调用的步骤。

6. **[#45224] 在沙箱设置前注册 Windows 桌面卸载所有权**  
   https://github.com/openai/codex/pull/45224  
   修复从未完成沙箱设置或登录的安装的卸载清理。

7. **[#45185] 将直接工具调用元数据绑定到调用输出**  
   https://github.com/openai/codex/pull/45185  
   保持工具调用记录与正确调用关联，包括复用的 call ID。

8. **[#45182] 复制 SID 前验证 Windows 沙箱令牌组**  
   https://github.com/openai/codex/pull/45182  
   为令牌组条目/SID 指针添加边界检查，以提高 Windows 沙箱稳健性。

9. **[#45176] 将 Windows MXC 沙箱接入命令执行**  
   https://github.com/openai/codex/pull/45176  
   添加显式 MXC 后端选择，并通过 exec-server 报告和违规分类携带身份。

10. **[#45149] 为 musl 构建使用 OpenSSL 3.6.4**  
    https://github.com/openai/codex/pull/45149  
    直接为 x86_64 和 aarch64 musl 构建 OpenSSL 3.6.4 安全版本。

## 热门讨论

### 想法
- **[#9200] 添加从 ChatGPT 应用远程控制 codex 的能力**  
  https://github.com/openai/codex/discussions/9200  
  46 条评论，190 个 👍 —— 获赞最多的讨论；要求提供可从 ChatGPT 移动应用控制的无头/守护进程模式。

- **[#42703] 长时程上下文：历史检索是否会让历史递归自引用？**  
  https://github.com/openai/codex/discussions/42703  
  探讨多窗口线程的 token 预算/历史/笔记/new_context 方法中的失败模式。

- **[#45284] 每个 GitHub pull request 可选的持久 Codex 会话**  
  https://github.com/openai/codex/discussions/45284  
  提议每个 PR 一个持久会话，以避免重复 `@codex` 提及时上下文碎片化。

### 展示与分享
- **[#16329] Awesome Codex CLI — 150+ 生态工具的精选列表**  
  https://github.com/openai/codex/discussions/16329  
  社区维护的子代理、技能、插件和 MCP 服务器索引。

- **[#44843] 社区工具：SKILL.md → Codex 插件包转换器**  
  https://github.com/openai/codex/discussions/44843  
  MIT、仅标准库的转换器，将 Agent Skills 文件夹转换为合规的 Codex 插件清单。

- **[#45278] Polter：我让一个 Codex 成为我其他 AI CLI 的老板**  
  https://github.com/openai/codex/discussions/45278  
  终端监督程序，编排多个 AI CLI 并督促停止工作的 worker。

- **[#45238] codex-preserve — 带 fail-closed 验证的持久 Codex 会话导出**  
  https://github.com/openai/codex/discussions/45238  
  本地优先的 Python CLI，用于在应用外导出和验证 Codex 会话。

- **[#45205] Orchestrator：面向 Codex、看板任务和代码评审的免费 Mac 工作区**  
  https://github.com/openai/codex/discussions/45205  
  开源 Mac 应用，连接 Codex 任务、仓库状态、对话和 diff。

- **[#44291] Brain Scanner：在下一个任务前了解你的编码代理做了什么**  
  https://github.com/openai/codex/discussions/44291  
  用于在一个地方审查项目地图、记录的代理工作和后续任务的工具。

### 综合
- **[#45211] 公开声明：重新开放 Pro 20X 访问、解决韩语质量问题并澄清重置政策**  
  https://github.com/openai/codex/discussions/45211  
  用户反对 Pro 20X 注册暂停、韩语混合和重置政策含糊。

## 功能请求趋势
- **远程控制和移动端交接：** 持续需要从 ChatGPT 移动端/iOS 控制 Codex，并在主机之间更好地交接。
- **每个 PR 持久会话：** 请求每个 pull request 保持一个 Codex 会话来避免评审上下文碎片化。
- **会话内调度/自动化：** 用于长时间运行代理工作流的 Cron、ScheduleWakeup 和 `/loop` 命令。
- **Windows/WSL 可靠性：** 反复要求 Windows 上稳定的项目创建、沙箱设置、Git HTTPS 和凭据上下文。
- **会话/历史持久性和工具化：** 要求提供有文档的 `~/.codex` rollout 格式和持久会话导出。
- **MCP 和工具调用稳健性：** MCP 启动修复、工具调用元数据绑定和子代理等待行为。
- **UX 改进：** 默认禁用 whimsy 效果、保留回滚缓冲区、改进历史搜索，并简化命令中心导航。

## 开发者痛点
- **Windows 沙箱和权限：** 提权沙箱凭据缺口、`helper_failed`、ACL 错误、令牌/SID 验证和设置锁失败。
- **WSL/项目创建阻塞：** 在 WSL/SSH 远程下无法创建项目或正确分组 worktree 线程。
- **会话/历史不一致：** 聊天消失、`read_thread` 状态陈旧、分页历史回归和巨大的 rollout 文件。
- **模型行为回归：** 忽略指令、shell 输出错乱、过度网页搜索和意外触发速率限制消耗。
- **MCP 启动中断：** 捆绑的 Messages/Computer History MCP 在 macOS CLI 0.154.0 上失败。
- **未文档化的会话格式：** 基于 `~/.codex` rollout 文件构建的工具缺乏可安全依赖的保证。
- **远程/移动端限制：** iOS 发送按钮禁用、远程交接错误以及分页聊天无法跨主机继续。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-14

## 今日亮点
过去 24 小时未发布新版本。活跃议题主要由两个 v1.0.83 可靠性报告主导：工作区 `.mcp.json` 未被加载（[#4832](https://github.com/github/copilot-cli/issues/4832)），以及语音模式在 Linux 上因 Nemotron ASR 中的 ONNX Runtime 断言而崩溃（[#4833](https://github.com/github/copilot-cli/issues/4833)）。智能体工作流也仍是关注焦点，包括长时间子智能体运行时的提示缓存/令牌消耗 bug（[#4829](https://github.com/github/copilot-cli/issues/4829)），以及对后台子智能体实时进度流式输出的需求（[#2254](https://github.com/github/copilot-cli/issues/2254)）。仅有 4 个 issue 和 2 个 PR 有更新，因此下方列表覆盖了全部可用条目。

## 热点议题
过去 24 小时内仅有 4 个 issue 有更新；均已列出。

1. **[#4829](https://github.com/github/copilot-cli/issues/4829) — [Bug] 子智能体在单轮中执行长时间工具调用序列时，提示缓存失效并导致令牌消耗叠加**  
   - **为何重要：** 使用 `task` 工具的自主子智能体可在单轮中运行数百次工具调用；当提示缓存失效时，令牌用量会叠加，直接影响多智能体工作流的成本和延迟。报告于 v1.0.83 / Windows 11 / PowerShell，使用 Gemini 3.8 Flash。  
   - **社区反应：** 1 条评论，0 👍。

2. **[#2254](https://github.com/github/copilot-cli/issues/2254) — [area:agents] 为后台子智能体添加实时进度流式输出**  
   - **为何重要：** 多阶段编排智能体（规划 → 实现 → 交付 → 审查）缺乏丰富的可观测性；`/tasks` 仅显示工具调用次数。这将改善对长时间运行的后台智能体的监控与调试。  
   - **社区反应：** 1 条评论，0 👍。

3. **[#4833](https://github.com/github/copilot-cli/issues/4833) — [Bug] 语音模式在 Linux 上因 Nemotron ASR 中的 ONNX Runtime 断言导致 CLI 崩溃**  
   - **为何重要：** 启用语音输入会导致 Linux x64 上的 CLI 以 `SIGABRT` 中止并生成核心转储，同时本地 Nemotron 语音模型正在处理音频。这使受影响的 Linux 用户无法使用语音模式，并引发平台稳定性担忧。  
   - **社区反应：** 0 条评论，0 👍。

4. **[#4832](https://github.com/github/copilot-cli/issues/4832) — 工作区 .mcp.json 在 CLI 1.0.83 中从未被加载 — `mcp list` 未显示 Workspace 组**  
   - **为何重要：** 仓库根目录的 `.mcp.json` 被忽略，`copilot mcp list` 仅显示用户服务器，工作区 MCP 服务器从未启动。这破坏了项目范围的 MCP 集成，而不仅是显示输出。  
   - **社区反应：** 0 条评论，0 👍。

## 关键 PR 进展
过去 24 小时内仅有 2 个 PR 有更新；二者均为已关闭的 Dependabot 依赖升级。

1. **[#4827](https://github.com/github/copilot-cli/pull/4827) — build(deps): 将 actions/stale 从 9.1.0 升级到 11.0.0**  
   - **变更内容：** 针对过期 issue/PR 自动化 action 的 CI 依赖主版本升级。已关闭。  
   - **为何重要：** 使 GitHub Actions 自动化保持最新，但主版本跃升可能需要检查工作流兼容性。

2. **[#4828](https://github.com/github/copilot-cli/pull/4828) — build(deps): 将 actions/github-script 从 7.1.0 升级到 9.0.0**  
   - **变更内容：** 针对 `actions/github-script` 的 CI 依赖主版本升级。已关闭。  
   - **为何重要：** 若在 CI 中使用该脚本，会影响工作流脚本行为；也是例行依赖维护的一部分。

## 功能请求趋势
未提供 Discussions 数据；以下趋势根据 4 个已更新 issue 推断。

- **智能体可观测性：** 最明确的显式请求是为后台子智能体提供实时进度流式输出（[#2254](https://github.com/github/copilot-cli/issues/2254)），原因是 `/tasks` 可见性有限。
- **智能体运行的令牌/成本效率：** [#4829](https://github.com/github/copilot-cli/issues/4829) 突显出对长时间子智能体工具调用序列期间稳健提示缓存和可预测令牌消耗的需求。
- **项目范围的 MCP 可靠性：** [#4832](https://github.com/github/copilot-cli/issues/4832) 表明需要可靠的工作区级 MCP 配置加载以及清晰的服务器生命周期可见性。
- **跨平台语音输入稳定性：** [#4833](https://github.com/github/copilot-cli/issues/4833) 表明对 Linux 与本地 ASR 模型设置下可靠语音模式的关注。

## 开发者痛点
- **v1.0.83 MCP 回归：** 工作区 `.mcp.json` 被忽略，且工作区 MCP 服务器不会启动，从而阻碍仓库范围的工具集成（[#4832](https://github.com/github/copilot-cli/issues/4832)）。
- **Linux 上语音模式不稳定：** Nemotron ASR 处理期间出现 `SIGABRT`/核心转储，使受影响的 Linux 用户无法使用语音输入（[#4833](https://github.com/github/copilot-cli/issues/4833)）。
- **智能体成本不可预测：** 长时间子智能体工具调用序列可能破坏提示缓存并叠加令牌用量，造成成本和延迟问题（[#4829](https://github.com/github/copilot-cli/issues/4829)）。
- **后台智能体可观测性不足：** `/tasks` 缺少实时进度详情，迫使开发者在有限遥测下管理长时间运行的编排智能体（[#2254](https://github.com/github/copilot-cli/issues/2254)）。

---

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-14

## 今日亮点

过去 24 小时内没有新发布，但问题跟踪器被一个 **v1.18.30 回归** 主导，该回归会破坏每一个 prompt（`SystemPrompt.environment` TypeError），已有多位用户独立报告。与此同时，**强制移除旧版 Desktop 布局**、转向 V2 的做法，正引发多项目/多 worktree 用户的强烈反对，而 **Muse Spark / Zen `encrypted_content` 提供商错误**（#48741）是今日增长最快的新 bug。

## 发布

过去 24 小时内无。

## 热点 Issue

1. **[#4283 — Copy To Clipboard is not working](https://github.com/anomalyco/opencode/issues/4283)** — 仍然是问题跟踪器上最响亮的讨论串：133 条评论、124 👍，自 2025 年 11 月开启，今天仍有更新。从响应中复制到剪贴板在多个版本和平台上依然失效，使其成为最持久的 UX 缺陷。
2. **[#48741 — [2.0] Zen critical errors on Muse Spark family with images/tool calls](https://github.com/anomalyco/opencode/issues/48741)** — 今日新增，已有 21 条评论。Zen 上的任何 Muse Spark 模型都会失败，报错 `reasoning encrypted_content was not issued to this caller`，导致图像输入和工具调用不可用——对任何使用 beta-18050 的人来说都是阻塞性问题。
3. **[#48645 — v1.18.30 regression: every prompt crashes with TypeError](https://github.com/anomalyco/opencode/issues/48645)** 和 **[#48803 — same failure, works on v1.18.20](https://github.com/anomalyco/opencode/issues/48803)** — 两份独立且经 A/B 确认的报告显示，升级到 1.18.30 后 prompt 完全失败。今日最高严重级别的可靠性问题。
4. **[#23153 — [FEATURE]: Pay Go with crypto](https://github.com/anomalyco/opencode/issues/23153)** — 22 条评论、51 👍。长期存在的变现请求，反复浮出水面；强烈表明 OpenCode Go 需要替代支付通道。
5. **[#43277 — Sessions permanently stuck, survive reboots, cannot be recovered](https://github.com/anomalyco/opencode/issues/43277)** — 14 条评论。卡住的 session 在完整重启后仍然存在，重启服务器也无法清除，属于严重的状态损坏类 bug。
6. **[#48837 — Forced V2 interface destroys productivity for multi-project/multi-agent workflows](https://github.com/anomalyco/opencode/issues/48837)** 和 **[#48835 — Old layout removed but new layout lacks multi-worktree support](https://github.com/anomalyco/opencode/issues/48835)** — 关于 V2 迁移的两个旗舰级抱怨：没有布局切换开关，以及失去了高级用户依赖的 worktree 支持——他们用它来维持 20+ 个并发 session。
7. **[#34442 — Windows Desktop installer broken offline (ripgrep not bundled)](https://github.com/anomalyco/opencode/issues/34442)** — 在 Windows 上，无网络访问时 `grep`、`glob`、`skill` 和 `customize-opencode` 全部失败。这凸显出打包缺口，会静默禁用核心工具链。
8. **[#36423 — [2.0] No cancellation support for background subagents](https://github.com/anomalyco/opencode/issues/36423)** — 后台 subagent 可以启动和恢复，但无法取消，留下孤立工作且没有逃生出口。这是 V2 agent API 的一个显著缺口。
9. **[#48870 — Non-git sessions are unattributable; `resolve` returns `global` early](https://github.com/anomalyco/opencode/issues/48870)** — 对反复出现的“session 泄漏到无关目录”问题族进行根因分析（另见 [#38529](https://github.com/anomalyco/opencode/issues/38529) 和 [#48762](https://github.com/anomalyco/opencode/issues/48762)）。已有配套修复 PR。
10. **[#48868 — 422 error replaying sessions with PDF tool results on OpenAI-compatible providers](https://github.com/anomalyco/opencode/issues/48868)** — 通过 zen/go 网关重放 session 时出现确定性的失败；影响所有阅读 PDF 并恢复对话的用户。

## 重点 PR 进展

1. **[#48879 — fix(core): restore Windows Git fast path](https://github.com/anomalyco/opencode/pull/48879)** — 在 Windows 上将 Git 解析为绝对路径的 `.exe`，并让内部 VCS 插件走原生 spawn 路径，恢复 Windows 上的性能与正确性。
2. **[#48878 — fix(tui): force terminal reset on exit for Windows ConPTY](https://github.com/anomalyco/opencode/pull/48878)** — 修复在 Windows 上 Alacritty + zellij 下退出后终端状态损坏/原始模式残留的问题。
3. **[#48877 — fix(core): break filesystem/search import cycle](https://github.com/anomalyco/opencode/pull/48877)** — 消除导致 `filesystem.ts` 在求值时出现解引用失败的循环导入。
4. **[#48871 — fix(project): resolve associated directory to its project instead of global](https://github.com/anomalyco/opencode/pull/48871)** — 直接修复 #48870；使 `project_directory` 成为非 git 目录的权威来源，并应清理 session 归属。
5. **[#48867 — feat(core): make worktree APIs project-based](https://github.com/anomalyco/opencode/pull/48867)** — 项目级 worktree 管理的第一版；与围绕 V2 布局的多 worktree 抱怨直接相关。
6. **[#44264 — feat(session): add suffix compaction](https://github.com/anomalyco/opencode/pull/44264)** — 在 session 运行时中新增实验性 `compaction.mode: "suffix"`，这是对长时间运行的上下文管理有意义的补充。
7. **[#44535 — fix(session): stop creating phantom "unknown" tool parts on re-emitted deltas](https://github.com/anomalyco/opencode/pull/44535)** — 关闭一个长期存在的数据完整性问题（#33618）：opencode 自身会向 session 历史注入幽灵工具调用。
8. **[#45207 — fix(tui): show readable Effect errors](https://github.com/anomalyco/opencode/pull/45207)** — 将 Effect `Cause` 值的原始 `JSON.stringify` 输出替换为人类可读输出——鉴于今天大量不透明的 `TypeError` 报告，这一点很有用。
9. **[#47913 — docs: add Indonesian translation (README.id.md)](https://github.com/anomalyco/opencode/pull/47913)** — 社区本地化工作，将覆盖范围扩展到印尼开发者。
10. **[#42340 — fix(cli): stop `run` from sleeping through an exhausted quota](https://github.com/anomalyco/opencode/pull/42340)**（已关闭）— 今日落地的大批自动清理的一部分；此前 `opencode run` 在配额耗尽时没有输出且永不返回。

## 热门讨论

该时间窗口未提供讨论数据。

## 功能请求趋势

- **提供商与计费灵活性** — 将 LiteLLM 作为一等提供商（[#22212](https://github.com/anomalyco/opencode/issues/22212)，已关闭）以及 OpenCode Go 的加密货币支付（[#23153](https://github.com/anomalyco/opencode/issues/23153)）反映了对路由自由度和非银行卡支付选项的需求。
- **UI 控制与可逆性** — 用户希望恢复布局切换（[#39835](https://github.com/anomalyco/opencode/issues/39835)）、新布局支持多 worktree（[#48835](https://github.com/anomalyco/opencode/issues/48835)）、新 UI 中有 MCP 开关（[#46426](https://github.com/anomalyco/opencode/issues/46426)），以及一种清除最近项目历史记录的方法（[#19546](https://github.com/anomalyco/opencode/issues/19546)）。
- **Agent/session 生命周期 API** — 后台 subagent 的取消能力（[#36423](https://github.com/anomalyco/opencode/issues/36423)）、V2 monorepo 中的跨位置 subagent（[#36605](https://github.com/anomalyco/opencode/issues/36605)，已关闭）以及压缩模式，表明 session 编排方式日益成熟。
- **插件可扩展性** — 从插件向 bash 注入环境变量（[#11065](https://github.com/anomalyco/opencode/issues/11065)）以及 V2 promise 工具的附件/URL 处理（[#47458](https://github.com/anomalyco/opencode/issues/47458)）表明插件 API 是下一个前沿。

## 开发者痛点

- **小版本更新中的回归问题。** v1.18.30 通过 `SystemPrompt.environment` 中的 Effect 层失败破坏了*所有* prompt（[#48645](https://github.com/anomalyco/opencode/issues/48645)、[#48803](https://github.com/anomalyco/opencode/issues/48803)）。用户为了保持生产力，正在手动对二进制进行 A/B 测试。
- **强制迁移且没有逃生通道。** 旧版布局突然被移除——没有切换开关，也没有 worktree 功能对等——是今天情绪最激烈的主题（[#48837](https://github.com/anomalyco/opencode/issues/48837)、[#48835](https://github.com/anomalyco/opencode/issues/48835)、[#48859](https://github.com/anomalyco/opencode/issues/48859)）。
- **Session 状态完整性。** 卡住的 session 在重启后仍然存在（[#43277](https://github.com/anomalyco/opencode/issues/43277)），竞态条件产生陈旧的 `index.lock` 文件并永久卡住快照（[#48848](https://github.com/anomalyco/opencode/issues/48848)），以及非 git 目录坍缩到共享的全局项目（[#48870](https://github.com/anomalyco/opencode/issues/48870)、[#38529](https://github.com/anomalyco/opencode/issues/38529)）。
- **Windows 仍是二等平台。** ConPTY 退出状态损坏、缺少 Git 快速路径、未捆绑 ripgrep 导致离线安装失败，以及绝对 session 路径使 session 在 TUI 中不可见（[#48762](https://github.com/anomalyco/opencode/issues/48762)、[#34442](https://github.com/anomalyco/opencode/issues/34442)）——不过今天的 PR 队列异常集中地修复这些问题。
- **提供商侧错误不透明。** `encrypted_content` 失败（[#48741](https://github.com/anomalyco/opencode/issues/48741)、[#48805](https://github.com/anomalyco/opencode/issues/48805)）以及 session 重放时的 422 验证错误（[#48868](https://github.com/anomalyco/opencode/issues/48868)）以原始上游消息形式暴露，没有可操作的修复指导。
- **静默失败。** Desktop 轮次被随机标记为“interrupted”，但 UI 没有错误（[#48850](https://github.com/anomalyco/opencode/issues/48850)），以及剪贴板操作失败却没有反馈（[#4283](https://github.com/anomalyco/opencode/issues/4283)、[#48839](https://github.com/anomalyco/opencode/issues/48839)），比响亮的报错更侵蚀信任。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-14

## 1. 今日亮点

过去 24 小时没有新版本发布，但跟踪器经历了一轮密集的分类清理：29 个 issue 被更新，其中大多数在当天以 `[untriaged]` 关闭，此外还有 8 个 PR 和 1 个讨论。主导主题是 **TUI 渲染性能**（全屏重绘风暴、大 diff 崩溃、每帧重新渲染会话记录）和 **provider 正确性**（上下文大小默认值、Anthropic JSON Schema 丢失、MCP OAuth 竞态）。架构上最重要的开放工作是 PR #9548（对话中途的系统消息）和 issue #7739（一个正式的启动时间预算，目标是与 jcode 相当的延迟）。

## 2. 发布

*省略 — 过去 24 小时没有发布。*

## 3. 热门 Issue

1. **[#7739] 设定启动时间预算，目标是与 jcode 相当的延迟和内存** — [OPEN, 8 条评论]
   https://github.com/earendil-works/pi/issues/7739
   提议设立一项正式的启动时间预算，使用 Linux 上 10 次交互式 PTY 启动，以 jcode v0.9.1888-dev 为基准进行对比。这是感知响应速度的锚定 issue；它拥有当天最多的评论数，并且仍是相对于竞争对手的主要开放性能目标。

2. **[#8036] 渲染大 diff 时 `edit` 工具导致 TUI 崩溃** — [OPEN, 8 条评论]
   https://github.com/earendil-works/pi/issues/8036
   由包含超长物理行的 HTML 文件生成的约 14.5 MB diff 会同时导致实时渲染和会话恢复崩溃，尽管编辑本身成功。这是一个持续存在、参与度很高的渲染健壮性 bug。

3. **[#9255] TuiMainScreen：变更行位于视口顶部上方时出现全屏重绘风暴** — [OPEN, 4 条评论]
   https://github.com/earendil-works/pi/issues/9255
   长会话记录几乎每一帧都会走 `firstChanged < prevViewportTop → fullRender(true)` 路径，导致文本剧烈跳动和重复。该问题得到 #9549 的直接印证，使其成为一个已确认的问题簇，而非孤立报告。

4. **[#9075] Compaction 摘要继承会话思考级别，确定性地触达输出上限** — [OPEN, 3 条评论, 👍 3]
   https://github.com/earendil-works/pi/issues/9075
   在采用自适应思考（adaptive-thinking）的 Anthropic 模型上，思考 token 会计入 `max_tokens`，而摘要预算仍保持在 `~13k`，因此高 effort 级别会可靠地截断 compaction。这是当天唯一一个获得正面反应的 issue——一个诊断充分、确定性的正确性 bug。

5. **[#9474] Codex transport：缺少不会重置的按请求总截止时间** — [OPEN, 3 条评论]
   https://github.com/earendil-works/pi/issues/9474
   周期性的 heartbeat/partial-delta 事件会绕过空闲超时，因此停滞的 SSE/WebSocket 流可能无限挂起。广泛影响 OpenAI 兼容路径；这是可靠性缺口，而非外观问题。

6. **[#9549] [fullscreen] 大会话记录每帧重新渲染；调整大小时重新发出整个会话记录** — [CLOSED, 2 条评论]
   https://github.com/earendil-works/pi/issues/9549
   在 Windows 11 / Windows Terminal / 2 个逻辑核心（其中一个核心满载）上测得；值得注意的是，该 issue 由报告者的本地 pi agent 起草，并依据 CONTRIBUTING.md 进行了披露。这证实渲染循环问题横跨多个平台，而不只是 Unix 终端。

7. **[#9542] 流式 UI 会将第一个思考 token 渲染两次** — [CLOSED, 2 条评论]
   https://github.com/earendil-works/pi/issues/9542
   `message_start` 快照与后续 delta 共享实时可变内容，产生重复文本（"TheThe user asks…"）。已存储的消息没有问题，因此这是一个纯粹的 UI 契约缺陷——很快被关闭。

8. **[#9561] 因长度截断的响应包含 14,408 次工具调用，淹没上下文** — [CLOSED, 1 条评论]
   https://github.com/earendil-works/pi/issues/9561
   一次模型生成崩溃为每次调用都生成一个错误 toolResult，在会话记录中形成一堵 14k 条目的墙。这是一个缺失针对病态输出防护措施的醒目例子。

9. **[#9563] MCP adapter：并发会话竞争 OAuth 刷新，导致共享 token 链失效** — [CLOSED, 1 条评论]
   https://github.com/earendil-works/pi/issues/9563
   与 #9562（keychain 重写清除外部静默读取授权）配对，这是当天最清晰的生产影响场景：由 launchd 驱动的一批无头会话共享同一个使用轮换刷新 token 的 MCP 注册。

10. **[#9545] 在批量编辑唯一性检查期间复用整文件归一化** — [OPEN, 1 条评论]
    https://github.com/earendil-works/pi/issues/9545
    `countOccurrences()` 会在批量中的每次编辑时，对同一个整文件字符串重新运行 `normalizeForFuzzyMatch()`。这是 `pkg:coding-agent` / `pkg:agent` 中一个小而具体、低风险的性能收益——这类 issue 很可能很快落地。

*同样值得关注：* #9566（尽管已知真实值，上下文大小仍静默默认为 128k）、#9555（compaction_end 会清除可见会话记录）、#9554（Z.AI `glm-5.3-flash` 在 `content` 中返回思维链且没有警告——31/31 次响应）、#9565（不可写的 `/tmp/jiti` 导致每次启动都重新编译）以及 #9054（`/new` 丢弃临时模型/effort 选择——已关闭 `no-action`）。

## 4. 关键 PR 进展

*（过去 24 小时更新了 8 个 PR——全部涵盖。）*

1. **[#9548] 对话中途的系统消息** — [OPEN] 由 mitsuhiko 提交
   https://github.com/earendil-works/pi/pull/9548
   当天影响最大的 PR：将系统提示文本和工具变更纳入会话记录的一部分，而不是静默重写起始条件，因此指令/工具变更会被记录，可在恢复和分支导航中还原，并且对提示缓存友好。这是架构性变更，而非增量改进。

2. **[#9488] fix(ai)：添加规范的 Codex turn 归属** — [OPEN] 由 dannote 提交
   https://github.com/earendil-works/pi/pull/9488
   添加 Codex 的 session/thread/turn/window/request-kind 元数据以及 provider 中立的 `requestIdentity`，从而在工具续接、重试、steering 和 compaction 恢复之间实现可靠归因。

3. **[#9531] feat(tree)：添加从会话树中永久删除分支** — [CLOSED] 由 moisestohias 提交
   https://github.com/earendil-works/pi/pull/9531
   `SessionManager.pruneBranch(entryId)` + `countSubtree()` 会移除偏离路径的条目和子树，并具备活动路径保护、叶子保留、标签重新链接和 compaction 重新指向；在 `/tree` 选择器中使用 `shift+d`。

4. **[#9556] feat(ai)：serverTools——在模型配置中声明 provider 服务端工具** — [CLOSED] 由 truongsinh 提交
   https://github.com/earendil-works/pi/pull/9556
   添加原始的 API 原生工具条目，会原样追加到 `openai-responses` 和 `anthropic-messages` 请求的 tools 数组中，覆盖 OpenAI `web_search` 和 Zhipu 的 GLM coding-plan 代理。

5. **[#9558] Feat/azure foundry v3** — [CLOSED] 由 pvjagtap 提交
   https://github.com/earendil-works/pi/pull/9558
   为 Anthropic 模型提供 Azure Foundry 支持，并增加广泛的 AI 测试矩阵覆盖（stream、abort、empty、context overflow、unicode、tool-call、image、total-tokens、cross-provider handoff）。

6. **[#9543] feat：为模型提供 "Exit" 工具调用** — [CLOSED] 由 AttAditya 提交
   https://github.com/earendil-works/pi/pull/9543
   允许模型在用户说 "bye" 或 `/exit` 时关闭聊天；是讨论/issue #9544 的配套项。

7. **[#9541] fix(tui)：显示人类可读的模型标签** — [CLOSED] 由 domenicomassafra 提交
   https://github.com/earendil-works/pi/pull/9541
   在模型选择器中将受治理目录的 `name` 渲染为主要标签，而不是原始的 provider/model 标识符。小而高可见度的 UX 打磨。

8. **[#9550] fix(coding-agent)：发送前使用系统 token 和工具 token 进行 compact** — [CLOSED / withdrawn] 由 moofone 提交
   https://github.com/earendil-works/pi/pull/9550
   作者已撤回；值得注意仅因为它针对的是与 #9075 相同的 compaction 核算区域。

## 5. 热门讨论

**展示与分享**
- **[#9552] Pi Heao GUI——pi 的 Windows 桌面客户端** — [1 条评论, 👍 1] 由 Q1y1ng 提交
  https://github.com/earendil-works/pi/discussions/9552
  一个基于 pi-agent-studio 聊天 UI 构建的 Windows 原生桌面外壳，明确 *不是* 重新实现——它复用了同一套聊天 UI。这是一个有用的信号：非 Unix 终端上的用户希望拥有优于 TUI 的一流窗口化客户端。(https://github.com/Q1y1ng/pi-heao-gui)

## 6. 功能请求趋势

- **会话与状态连续性。** 围绕在边界处不丢失上下文，正在形成一个清晰的问题簇：对话中途的系统/工具变更（#9548）、跨 `/new` 继承模型/effort（#9054）、在主会话记录中查看实时会话（#9551），以及跨工作目录的非嵌套会话选择器（#9547）。
- **Provider 广度与原生能力。** 请求包括 Azure Foundry（#9558）、Commandcode 登录（#9553）、provider 服务端工具，如 `serverTools` / GLM web search / Anthropic `web_search`（#9560、#9556）、子代理可访问的实时 `llama.cpp` 目录（#9559），以及 Anthropic 工具定义的完整根 JSON Schema 透传（#9557）。
- **模型发起的操作。** 一个模型可调用的 `exit` 工具（#9544、#9543），用于处理对话中的 "bye" 和 `/exit` 意图。
- **扩展 API 表面。** 为模态提示提供作用域化的工作可见性覆盖（#9536），以及为扩展提供会话重新指向 API（#9551）。
- **性能预算。** 不只是修复，而是明确目标：定义启动时间预算（#7739）和每请求墙钟截止时间（#9474）。

## 7. 开发者痛点

- **TUI 渲染是排名第一的反复出现的挫败来源。** 长会话记录上的全屏重绘风暴（#9255）、每帧重新渲染加上调整大小时完整重新发出（#9549），以及 14.5 MB diff 上的硬崩溃（#8036），都指向一个会随会话记录大小和行长度急剧劣化的渲染管线。
- **Compaction 在两个方向上都会出问题。** 它可能在自适应思考下确定性地截断（#9075），并且在成功时清除可见会话记录（#9555）——而核算却排除了系统 token 和工具 token（参见已撤回的 #9550）。
- **病态模型输出没有缓冲机制。** 单个包含 14,408 次工具调用的响应（#9561）会淹没上下文，而 `zai/glm-5.3-flash` 在 `content` 中返回思维链，会将推理渲染为回复且没有警告（#9554）。
- **静默的配置错误。** `models.json` id 冲突会静默产生 128k 上下文以及错误的 `cost`/`input`/`maxTokens`（#9566）；内置的 `llama.cpp` provider 在 `/llama` 之前注册空的目录（#9559）。
- **凭证与 OAuth 脆弱性。** Keychain 写入会重置分区列表并清除外部静默读取授权（#9562），并发会话会竞争轮换中的 MCP 刷新 token（#9563），并且在 Windows 上的 Node/undici 下，GitHub Copilot 刷新会返回 403 scraping 响应（#9546）。
- **启动成本来自工具链，而非代码。** 不可写的 `/tmp/jiti`（例如指向另一个用户 `0700` home 的符号链接）会导致 TypeScript 扩展在每次启动时重新编译（#9565），而惰性导入 jiti 和 TUI 图的请求（#9540）进一步印证了这一点。
- **分类节奏说明：** 今天很高比例的 issue 在当天以 `[untriaged]` 关闭，而 `closed-because-weekend` / `closed-because-refactor` 等标签（#4538）表明“未修复即关闭”很常见——这可能是值得关注的贡献者摩擦来源。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-14

## 1. 今日亮点

一个新的 nightly（`v0.23.3-nightly.20260913.faa395885e`）与 `cua-driver-rs v0.20.6` 一同发布，后者为 macOS、Linux 和 Windows 提供了经过代码签名/公证的 CUA 驱动二进制文件。本周期最主要的社区信号是与后台 Agent 相关的 **React #185 “Maximum update depth exceeded” TUI 崩溃簇**——目前已有四个独立的 P1/已报告 Issue 汇聚到同一个 Ink 布局监听器反馈循环上。与此同时，CI 可靠性（OOM、SIGTERM、非确定性测试）和数据隐私泄露（AppImage 环境变量、会话日志保留）也推动了大量 Issue 流量。

## 2. 发布

**v0.23.3-nightly.20260913.faa395885e** — 从 `release/v0.23.3-nightly.20260913.faa395885e` 切出的 Nightly。变更包括 `refactor(dingtalk): remove obsolete background response aggregation`（[#11570](https://github.com/QwenLM/qwen-code/pull/11570)），以及一个破坏性的 `feat(channels)!` 变更，其描述在发布说明中被截断。

**cua-driver-rs v0.20.6** — 预构建的 Qwen CUA Driver 二进制文件，已纳入 `packages/cua-driver` 下：
- **macOS**：已代码签名 + 公证的通用二进制文件 + `QwenCuaDriver.app`
- **Linux**：未签名的 x86_64 + arm64（glibc 2.31 下限）
- **Windows**：未签名的 UIAccess worker + 原生 SDK 载荷（x86_64 + arm64）

## 3. 热门 Issue

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) [P1] 多个后台 Agent 完成时 TUI 静默退出（React #185）** — 12 条评论，是本周期互动量最高的 Issue。根因定位到 Ink `useBoxMetrics` 布局监听器的 `setState` 循环。社区成员正在交叉引用复现情况，并确认进程会直接掉回 shell，且没有渲染出任何错误。

2. **[#11756](https://github.com/QwenLM/qwen-code/issues/11756) [P1] 后台 Agent 工作流期间，虚拟化历史记录因 React #185 崩溃** — 在 stable 0.23.3 和当前 main 上启用 Virtualized History 后均可复现，说明该 bug 并不局限于 nightly 渠道。

3. **[#11783](https://github.com/QwenLM/qwen-code/issues/11783) [P1] 后台任务注册后几秒钟 TUI 即崩溃** — 触发条件已缩小到 `run_shell_command` 搭配 `is_background: true`，为维护者提供了 #185 崩溃簇的最小复现面。

4. **[#5199](https://github.com/QwenLM/qwen-code/issues/5199) 压缩版 React 错误 #185（长期未决）** — 自 6 月开放，且截至 2026-09-14 仍有更新，共 8 条评论。它横跨三个月的发布周期依然存在，说明 #185 这一类 bug 早于近期的后台 Agent 工作。

5. **[#11764](https://github.com/QwenLM/qwen-code/issues/11764) [P1] 当第一条命令以单引号内的反斜杠结尾时，Bash 允许规则会授权第二条命令** — 这是一次真正的权限绕过：一条无关命令未经确认提示即被执行。对任何依赖 `Bash(...)` 允许列表的人来说，这都会造成严重的信任影响。

6. **[#11590](https://github.com/QwenLM/qwen-code/issues/11590) [P1, CLOSED] 自动插入的 `metadata` 通过 DashScope 的 OpenAI 兼容端点破坏非 Qwen 模型** — 发往聚合网关的请求会因 `400` 失败，因为厂商期望 `metadata` 为 `string`。仅切换该字段即可恢复服务，这使其成为多提供商用户值得高度关注的互操作 bug。

7. **[#11718](https://github.com/QwenLM/qwen-code/issues/11718) [CLOSED] AppImage 捆绑的 Python `PYTHONHOME`/`PYTHONPATH` 泄漏到启动的 stdio MCP 服务器中** — 桌面守护进程的子进程继承了 AppImage 挂载路径，导致外部 Python 解释器崩溃。一天内关闭；这是一项值得注意的打包/隔离胜利。

8. **[#11724](https://github.com/QwenLM/qwen-code/issues/11724) [P2] 检测到高内存占用：7.00 GB，且 CLI 无提示中断** — 由中文用户使用 0.20.0 / Windows 客户端报告；崩溃会阻止会话恢复，迫使用户从零重建上下文。一个重复项（[#11725](https://github.com/QwenLM/qwen-code/issues/11725)）已被关闭，暗示要么是分诊重叠，要么存在配置级规避方法。

9. **[#11762](https://github.com/QwenLM/qwen-code/issues/11762) [P2] `/delete` 不会清理 `~/.qwen/tmp/<hash>/logs.json`** — 会话删除会移除 JSONL 转录记录，但会为项目中的*所有*会话保留完整对话内容（用户、助手、工具输出），且没有设置可禁用或限制保留。

10. **[#11019](https://github.com/QwenLM/qwen-code/issues/11019) [P2] AUTO 模式：用户批准从未到达分类器** — 尽管有三次肯定的 `ask_user_question` 回答，生产数据变更仍然继续执行；会话重建时批准模式也会回退到 AUTO。与安全相关，并标记为 `need-discussion`。

*同样值得关注：* [#11747](https://github.com/QwenLM/qwen-code/issues/11747)（RHEL 10 上因缺少 `Intl.Segmenter`/ICU 导致 TUI 崩溃，且没有可操作的诊断信息）、[#11760](https://github.com/QwenLM/qwen-code/issues/11760)（遥测脱敏缺少值级测试锁定）以及 [#11777](https://github.com/QwenLM/qwen-code/issues/11777)（必需的 Test 作业在所有测试通过的情况下收到 SIGTERM）。

## 4. 关键 PR 进展

1. **[#11794](https://github.com/QwenLM/qwen-code/pull/11794) `fix(cli): honor output language in stateless generation`** — 将用户配置的输出语言规则应用于无状态会话和工作区生成，并显式优先于请求的回退语言。

2. **[#11614](https://github.com/QwenLM/qwen-code/pull/11614) `feat(cli): add bwrap kernel sandbox backend for Linux`** — 可选择启用直接使用内核的沙箱：无需容器运行时、root、守护进程或镜像。macOS 和容器后端保持不变；默认情况下没有任何变化。

3. **[#11711](https://github.com/QwenLM/qwen-code/pull/11711) `feat(core): add container execution for subagents`** — 运维人员可以通过 `QWEN_AGENT_EXECUTION_BACKEND` 强制将普通子级调度放入 `docker`/`podman`；Agent 定义可以要求 `executionBackend: container`。

4. **[#11538](https://github.com/QwenLM/qwen-code/pull/11538) `feat: select the OpenAI wire API per model`** — 新增按模型配置 `wireApi: "chat-completions" | "responses"`，并在运行时选择和已记录会话中保留生效协议。与聚合网关中出现的互操作问题直接相关。

5. **[#11692](https://github.com/QwenLM/qwen-code/pull/11692) `feat(core): make the web_search budget configurable`** — 新增 `tools.webSearch.timeoutMs`（环境变量 `WEB_SEARCH_TIMEOUT_MS`），默认值从 60s 提高到 120s，并增加有界提取器回退，使超时能够优雅降级。

6. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086) `feat(serve): scope extensions to workspace runtimes`** — 使全局扩展目录可通过每个工作区选定的运行时访问，并暴露带工作区限定的守护进程/SDK 访问。约 20 轮审查；在 [#11793](https://github.com/QwenLM/qwen-code/issues/11793) 中产生了后续事项。

7. **[#11636](https://github.com/QwenLM/qwen-code/pull/11636) `feat: track background result execution across daemon and web shell`** — 为后台结果处理提供明确的守护进程执行生命周期，在安全的模型边界消费结果，并将较旧结果推迟到可自动继续时再处理。

8. **[#11242](https://github.com/QwenLM/qwen-code/pull/11242) `feat(browser-use): add Chrome Native Messaging relay`** — 通过本地原生消息主机加上 Qwen Chrome 扩展，将 Browser SDK 桥接到用户现有的 Chrome，管理调试器附加和 CDP 转发。

9. **[#11562](https://github.com/QwenLM/qwen-code/pull/11562) `fix(cli): keep one-shot system reminders out of the user's own message`** — 阻止折叠进来的提醒出现在转录行、跨会话 ↑ 召回历史、已取消轮次的输入框回填以及导出会话中。

10. **[#11722](https://github.com/QwenLM/qwen-code/pull/11722) `feat(web-shell): add PWA installability and Android development shell`** — 为守护进程提供的 Web Shell 添加可安装性元数据和生产 service worker，并对公共安装资源进行重新验证，对内容寻址资源进行缓存分离。

*同样活跃：* [#11731](https://github.com/QwenLM/qwen-code/pull/11731)（在 `e2e.yml` 中对 `npm ci` 进行有界重试）、[#11788](https://github.com/QwenLM/qwen-code/pull/11788)（将写侧 PTY `EIO` 视为良性拆除）、[#11778](https://github.com/QwenLM/qwen-code/pull/11778)（通过 `cmd` 回退 + PowerShell 探测实现 Windows 命令钩子）、[#11635](https://github.com/QwenLM/qwen-code/pull/11635)（修复会话侧边栏中的计划任务）。

## 5. 热门讨论

本周期未提供 Discussions 数据——本节省略。

## 6. 功能请求趋势

- **更强的 Agent 隔离。** 两项并行工作——Linux `bwrap` 内核沙箱（[#11614](https://github.com/QwenLM/qwen-code/pull/11614)）和子 Agent 的容器执行（[#11711](https://github.com/QwenLM/qwen-code/pull/11711)）——表明用户需要无需容器运行时或 root 依赖的隔离。
- **按模型配置提供商的灵活性。** 按模型选择 `wireApi`（[#11538](https://github.com/QwenLM/qwen-code/pull/11538)）、Anthropic `thinking` 块签名问题（[#11772](https://github.com/QwenLM/qwen-code/issues/11772)）以及 `metadata` 互操作 bug（[#11590](https://github.com/QwenLM/qwen-code/issues/11590)）都表明用户正在将 Qwen 与第三方和自托管后端混合使用。
- **守护进程/后台持久性。** 轮次状态轮询的持久性决策（[#11773](https://github.com/QwenLM/qwen-code/issues/11773)）和运行时回收重试缺口（[#11767](https://github.com/QwenLM/qwen-code/issues/11767)）表明 `qwen serve` 部署正在触及状态生命周期限制。
- **将 Web Shell 视为真正的应用。** PWA 可安装性加上 Android 开发 shell（[#11722](https://github.com/QwenLM/qwen-code/pull/11722)）和区域设置感知的 UI 字符串（[#11791](https://github.com/QwenLM/qwen-code/issues/11791)）表明 Web 界面正被视为一等客户端。
- **处处可控的语言/区域设置。** 要求在无状态生成中遵循配置的输出语言（[#11794](https://github.com/QwenLM/qwen-code/pull/11794)），并停止在命令解释面板中硬编码英语/简体中文（[#11791](https://github.com/QwenLM/qwen-code/issues/11791)）。
- **多 Agent 工作流控制。** Agent Board 后续事项（[#11755](https://github.com/QwenLM/qwen-code/issues/11755)）指出 `--as` 会隐藏可认领工作，且 `--owner` 语义不具约束力。

## 7. 开发者痛点

- **CI 不稳定是最反复出现的挫败点。** 三个独立帖子描述了没有逻辑错误的间歇性失败：必需的 Test 作业在 workspace→`test:scripts` 交接处收到 SIGTERM，而所有测试套件均为绿色（[#11777](https://github.com/QwenLM/qwen-code/issues/11777)）；`tsc --build` 在 3072 MB 堆上限处 OOM，而仅 `main` 就峰值达到 3.14 GB（[#11780](https://github.com/QwenLM/qwen-code/issues/11780)）；以及非确定性的共享运行器失败，每次运行命中的测试集都不同（[#10490](https://github.com/QwenLM/qwen-code/issues/10490)）。视觉预览同样具有非确定性（[#11465](https://github.com/QwenLM/qwen-code/issues/11465)）。
- **React #185 TUI 崩溃尚未解决，并在扩散。** 现在有四个 Issue 描述了 stable 和 main 上同样的 “Maximum update depth exceeded” 死亡问题，触发因素包括后台 Agent、后台 shell 任务和虚拟化历史记录。
- **内存压力会杀死长会话。** 7 GB 内存警告（[#11724](https://github.com/QwenLM/qwen-code/issues/11724)）会不可恢复地中断工作，用户报告之后无法恢复任务。
- **数据保留方面的意外。** `/delete` 会留下完整对话日志（[#11762](https://github.com/QwenLM/qwen-code/issues/11762)），遥测脱敏也缺少值级回归锁定（[#11760](https://github.com/QwenLM/qwen-code/issues/11760)）。
- **与安全相关的正确性缺口。** Shell 允许规则绕过（[#11764](https://github.com/QwenLM/qwen-code/issues/11764)）和从未到达分类器的 AUTO 模式批准（[#11019](https://github.com/QwenLM/qwen-code/issues/11019)）侵蚀了人们对权限模型的信任。
- **Windows 和 Linux 上的平台特定故障。** 缺少 ICU/`Intl.Segmenter` 会导致 TUI 在 RHEL 10 上崩溃，且没有可操作的诊断信息（[#11747](https://github.com/QwenLM/qwen-code/issues/11747)），Windows 命令钩子也需要修复 shell 解析（[#11778](https://github.com/QwenLM/qwen-code/pull/11778)）。
- **审查流程债务正在被显式跟踪。** 多个“延后的审查发现”Issue（[#11738](https://github.com/QwenLM/qwen-code/issues/11738)、[#11793](https://github.com/QwenLM/qwen-code/issues/11793)、[#11587](https://github.com/QwenLM/qwen-code/issues/11587)、[#11755](https://github.com/QwenLM/qwen-code/issues/11755)）表明，五轮审查规则将有效的非关键发现推入后续待办清单的速度快于清理速度。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*