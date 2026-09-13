# AI CLI 工具社区动态日报 2026-09-13

> 生成时间: 2026-09-13 00:17 UTC | 覆盖工具: 7 个

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

# 跨工具 AI CLI 对比报告 — 2026-09-13

## 1. 生态系统概览

AI CLI 生态系统正从“模型能力演示”成熟为 **agent 运行时基础设施**：可靠性、成本可预测性、安全边界、会话连续性和协议正确性如今主导着社区反馈。在 Claude Code、Codex、Gemini CLI、Copilot CLI、OpenCode、Pi 和 Qwen Code 中，最强烈的痛点惊人地一致——配额/用量核算、卡死与静默失败、MCP/ACP/WebSocket 正确性、Windows/WSL/远程对等性，以及安全自主性。维护者正以针对性补丁、nightly 和大量 PR 批次作出回应，但许多回归仍然进入稳定版本。差异化越来越体现在架构上：沙箱、执行隔离、插件/RPC 接口、远程/无人值守操作、企业可观测性和提供商灵活性。

## 2. 活动对比

以下计数反映的是 2026-09-13 摘要窗口中浮现/更新的条目，而非未决积压总量。这组仓库中没有哪个被描述为禁用了 Issues/PRs；Discussions 的“N/A”表示摘要中未提供讨论数据，而非该渠道不活跃。

| 工具 | Issues（窗口） | PRs（窗口） | Discussions（窗口） | 发布状态 |
|---|---:|---:|---:|---|
| **Claude Code** | 10 个重点 | 3 个已更新（2 个已关闭，1 个待处理） | N/A | **v2.1.270** 补丁：只读 git 权限回归修复 |
| **OpenAI Codex** | 10 个重点 | 10 个关键 PR | 6 | 无 |
| **Gemini CLI** | 14 个重点（10 个热门 + 4 个关注） | 13 个（10 个关键 + 3 个值得注意） | N/A | **v0.61.0-nightly.20260912.g9c1b0a610** — 提示注入与沙箱加固 |
| **GitHub Copilot CLI** | 8 个已更新（全部覆盖） | 3 个已更新 | N/A | 无；最新引用 v1.0.83 |
| **OpenCode** | 12 个重点 | 14 个（10 个关键 + 4 个值得注意） | N/A | 无 |
| **Pi** | 43 个已更新；14 个重点 | 9 个已更新（8 个关键 + 1 个噪音） | 3 | 无 |
| **Qwen Code** | 10 个重点 | 12 个（10 个关键 + 2 个值得注意） | N/A | **v0.23.3-nightly.20260912.54aa66834b** — 渠道重构 + 破坏性变更 |

## 3. 共同功能方向

- **会话连续性、持久化与生命周期管理**
  - **Claude Code**：跨机器会话交接（#11455）、Cowork 状态持久化（#93910）、转录保留问题（#86280）。
  - **Codex**：远程/移动会话可靠性、恢复分页、备份、批量清理。
  - **Gemini CLI**：ACP `session/load` 修复（#29288）、`/compress` 持久化（#21335）。
  - **OpenCode**：交互式会话选择器、重命名、归档而不关闭（#48718、#46915、#46165）。
  - **Pi**：从恢复点 fork、永久分支删除、恢复时正确模型还原（#9521、#9531、#9243）。
  - **Qwen Code**：长会话耐久性、上下文压缩、监控恢复。

- **成本、配额与用量透明度**
  - **Claude Code**：单次高投入审查耗尽月度预算（#93894）、用量限制消息不可靠（#77469、#74165、#87007）。
  - **Codex**：配额耗尽追踪器（#41220）、严重的 5 小时消耗（#45073）、token/credit/成本估算 PR（#44970）。
  - **Copilot CLI**：子代理 prompt 缓存失败加剧 token 支出（#4829）、OTel 按阶段 credit 归因（#4825）。
  - **OpenCode**：提供商配额/认证异常（#48687、#48681、#48711）。
  - **Pi**：误导性的缓存未命中遥测（#9013）。
  - **Qwen Code**：Web Shell 中的上下文概览与手动压缩（#11700）。

- **安全、沙箱与权限控制**
  - **Gemini CLI**：通过构建文件进行间接提示注入、沙箱文件系统加固、shell 包装器绕过、MCP 允许列表强制执行（#29250、#29214、#29203、#29200）。
  - **Claude Code**：认证 token 泄漏到后续会话（#79427）、云 GitHub 出口/头问题（#86828）。
  - **Copilot CLI**：MCP 取消语义（#4759）、会话作用域的 `/remove-dir`（#4830）。
  - **OpenCode**：权限提示的远程批准（#39628）。
  - **Pi**：路由扩展失败时的沙箱逃逸类 bug（#9068）。
  - **Qwen Code**：shell 错误的未脱敏遥测（#11198）、MCP `${VAR}` 占位符未展开（#11499）。

- **MCP/ACP/协议正确性**
  - **Copilot CLI**：征询期间的 MCP 取消（#4759）。
  - **Gemini CLI**：运行时一致的 MCP 策略（#29200）。
  - **Qwen Code**：与 Claude Code 的 hook 对等性（#11610）、MCP 配置重新水合（#7771）。
  - **Codex**：app-server IPC 解码失败（#43938）、Luna Reserve 兑换（#45132）。
  - **Pi**：Responses API 图像互操作缺口（#9516）、RPC prompt 处置（#9098）。
  - **OpenCode**：子代理 ID 发现（#36761）、MCP 进程爆炸（#43845）。

- **远程、移动与无人值守操作**
  - **Codex**：iPad 远程冻结（#41695）、macOS 远程控制启用（#36946）、Windows 活动任务中断（#45075）。
  - **Claude Code**：Cowork 云会话 GitHub 访问失败（#84581、#91805）。
  - **OpenCode**：移动/第二设备批准（#39628）、桌面 sidecar 稳定性。
  - **Qwen Code**：通过 ACP 的 Android 伴侣（#11704）。
  - **Pi**：驱动手机友好仪表板的 RPC 模式（#9525）。

- **子代理/多代理可靠性与可观测性**
  - **Gemini CLI**：MAX_TURNS 被误报为 `GOAL` 成功（#22323）、通才卡死（#21409）、bug 报告中缺少子代理上下文（#21763）。
  - **OpenCode**：有效的子代理 ID 未暴露给模型（#36761）。
  - **Copilot CLI**：子代理 prompt 缓存与 token 复合（#4829）。
  - **Qwen Code**：后台代理 React 崩溃（#11500、#11732）、监控孤儿回收（#11742）。
  - **Claude Code**：代理视图组织（#83013、#80119）。

- **平台对等性与终端 UX**
  - **Claude Code**：Windows GPU 崩溃（#80444）、WSL 浏览器工具缺口（#93124）。
  - **Codex**：Windows 桌面设置/沙箱失败、TUI 光标/输入回归（#44444、#31317）。
  - **Gemini CLI**：终端闪烁/撕裂（#29294）、Wayland 浏览器子代理失败（#21983）。
  - **OpenCode**：跨 OS/VS Code/Codespaces/Screen 的剪贴板失败（#4283、#13984、#41470、#26459、#32985）。
  - **Pi**：全屏滚动/鼠标回归（#9052、#9311）、Windows 路径分隔符（#9262）。
  - **Qwen Code**：稳定版 0.23.3 上的 React #185 TUI 崩溃（#11732）、RHEL `Intl.Segmenter` 失败（#11747）。

## 4. 差异化分析

| 工具 | 功能重点 | 目标用户 | 技术方法 |
|---|---|---|---|
| **Claude Code** | 企业/云会话、权限安全、插件/mods、Windows 桌面稳定性、成本可预测性 | 专业开发团队、订阅/企业用户、长生命周期会话 | CLI + 桌面 + 云/Cowork；强大的 mod/插件测试；MCP 与权限钩子 |
| **OpenAI Codex** | 配额插桩、远程/移动会话、TUI 命令中心、Windows 桌面健壮性、多账户 | ChatGPT/Plus/Enterprise 用户、远程与移动工作流 | App-server、IPC、代理命令中心、TUI 打磨、多账户生命周期 |
| **Gemini CLI** | 安全加固、沙箱、提示注入防御、子代理正确性、AST/节省 token 的检索 | Google 生态、企业策略用户、OSS 贡献者 | Nightly 节奏；沙箱文件系统边界；MCP 策略；AST 感知工具 |
| **GitHub Copilot CLI** | GitHub/企业集成、MCP 取消、会话作用域权限、OTel 成本归因 | GitHub/Copilot 企业用户、CI 与审计环境 | WebSocket/CAPI、MCP 协议卫生、多模型路由可观测性 |
| **OpenCode** | 提供商无关操作、桌面/TUI/插件生态、剪贴板/终端兼容性、远程批准 | 高级用户、自托管/本地模型用户、多平台开发者 | V2 服务器/桌面 sidecar、SSE 流、插件 API、广泛的终端支持 |
| **Pi** | 可扩展代理平台、OAuth 订阅提供商、RPC、会话树、TUI 深度 | 插件开发者、CI/并行代理用户、提供商实验者 | RPC 模式、扩展路由、订阅 OAuth、永久会话分支 |
| **Qwen Code** | 可分离执行环境、Web Shell 上下文控制、Android/ACP、安全脱敏 | Qwen 模型用户、Web/移动用户、企业安全团队 | Harness/executor 拆分、SSH/容器 worker、Playwright 浏览器 SDK、hooks 对等性 |

## 5. 社区势头与成熟度

**最高原始参与度：** OpenCode 以剪贴板问题领先，有 131 条评论 / 123 👍（#4283）。Claude Code 紧随其后，Windows GPU 崩溃有 111 条评论（#80444），会话交接有 25 👍（#11455）。Pi 的 `openai-codex` 卡死是仓库中讨论最多的问题，有 78 条评论 / 33 👍（#4945）。Codex 拥有最强的单个 UX 投票，禁用 Pets 获得 48 👍（#34349），以及一个 40 条评论的配额追踪器（#41220）。Gemini 的头号 P1 子代理问题有 13 条评论（#22323）；Qwen 的 TUI 崩溃有 10 条（#11500）；Copilot 讨论最多的条目是一个已关闭的 WebSocket/CAPI 400，有 7 条评论（#2147）。

**快速迭代：** Gemini CLI 和 Qwen Code 正在发布带有安全/架构变更的 nightly。OpenCode 正在推送大量 V2/TUI/桌面修复批次。Pi 正在快速扩展提供商 OAuth 和会话/TUI 功能。Codex 正在迭代 TUI 打磨和用量可见性。Claude Code 发布了一个窄范围补丁，而 Copilot CLI 的 PR 活动主要是 CI/依赖卫生。

**成熟度信号：** Claude Code、Codex、Gemini CLI 和 Copilot CLI 承载更大的企业/平台积压，以及更多计费、配额或合规摩擦。OpenCode、Pi 和 Qwen Code 展现出高贡献者速度和插件/RPC 可扩展性，但也有更多回归、静默失败和平台边缘情况。Claude Code 激进的陈旧问题分诊和 Codex 的配额挫败感是值得注意的社区健康风险。

## 6. 趋势信号

- **成本可预测性如今是一项信任功能。** 配额耗尽、不透明的速率限制和损坏的 prompt 缓存正在 Codex、Claude Code、Copilot CLI、OpenCode 和 Pi 中反复出现。暴露每轮 token、credit、缓存行为和路由归因的工具将赢得开发者信心。
- **静默失败比响亮错误更具破坏性。** 卡死、虚假成功信号、丢失的 prompt、空剪贴板粘贴和卡住的流在每个社区中都有出现。强大的错误分类、不重置的截止时间、可重试分类和可见的失败状态是高杠杆修复。
- **安全默认值正受到审视。** 提示注入、沙箱逃逸、未脱敏遥测、MCP 密钥处理和权限策略绕过是活跃关切。故障关闭式沙箱、确定性脱敏和显式权限撤销正在成为基线期望。
- **协议正确性是一道竞争护城河。** MCP 取消、ACP 会话 ID、Responses API 互操作、app-server IPC 以及与 Claude Code 的 hook 对等性表明用户想要可移植、符合标准的代理基础设施。
- **远程与无人值守工作流需要更好的生命周期支持。** 移动批准、云仓库访问、会话恢复、持久监控和多账户切换是 Codex、Claude Code、OpenCode、Qwen 和 Pi 的关键诉求。
- **平台对等性仍未完成。** Windows、WSL、Linux GUI、Wayland、GNU Screen 和 Web VS Code 各自暴露出不同的 bug。跨平台 CI 和能力协商是差异化因素。
- **对于开发者：** 优先考虑健壮的流超时、结构化错误报告、会话持久化、成本遥测、MCP/ACP 合规、默认脱敏和沙箱故障关闭行为。市场正在奖励那些使代理执行 **可观测、可移植且安全**——而不仅仅是能力强大的工具。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — 社区亮点报告
**来源：** github.com/anthropics/skills · **数据截至：** 2026-09-13

> 注意：PR feed 对所有条目都返回了 `Comments: undefined`，因此 PR 依据*关注信号*排名——交叉引用的 issue、重复/竞争提交以及更新新鲜度——而非原始评论数。Issue 评论数可靠，直接采用。

---

## 1. 热门 Skill 排行

### 1) skill-creator / run_eval.py 可靠性问题簇 — *仓库中关注度最高的 Skill*
多个 PR 和一个 12 条评论的 issue 都指向同一个 Skill：用于生成和优化其他 Skill 的元工具。
- **[PR #1298](https://github.com/anthropics/skills/pull/1298)**（OPEN，更新于 2026-09-12）— `run_eval.py` 始终报告 `recall=0%`；将 eval 产物安装为真实 Skill，并修复 Windows 流读取、触发检测和并行 worker。明确引用了 [#556](https://github.com/anthropics/skills/issues/556) 中 10+ 个独立复现。
- **[PR #1099](https://github.com/anthropics/skills/pull/1099)** 和 **[PR #1050](https://github.com/anthropics/skills/pull/1050)** — 相互竞争的 Windows 修复（`WinError 10038` / `WinError 2`、`claude.cmd` vs `claude`）。
- **[PR #539](https://github.com/anthropics/skills/pull/539)** — 针对包含 `:` 的未加引号 YAML description 的预解析校验。
**讨论亮点：** description 优化循环目前正在“对着噪声做优化”——这对 Skill 编写流水线本身是一场正确性危机。**状态：** 全部 OPEN。

### 2) docx — 评论、修订记录与 ID 安全
- **[PR #1734](https://github.com/anthropics/skills/pull/1734)**（OPEN，创建于 2026-09-06）— 检测孤立的 docx 评论。
- **[PR #541](https://github.com/anthropics/skills/pull/541)**（OPEN）— 防止修订记录与现有书签之间的 `w:id` 冲突（文档损坏）。
**状态：** OPEN；#1734 是头部集合中最新的提交。

### 3) mcp-builder — SDK 漂移与损坏的评估测试框架
- **[PR #1742](https://github.com/anthropics/skills/pull/1742)**（OPEN，更新于 2026-09-11）— 支持 `mcp>=2` 的 `streamable_http_client` 重命名和自定义 headers（修复 [#1668](https://github.com/anthropics/skills/issues/1668)）。
- **[PR #1724](https://github.com/anthropics/skills/pull/1724)** — 将 `evaluation.py` 默认模型从 `claude-3-7-sonnet` 快照更新掉。
- **[PR #1602](https://github.com/anthropics/skills/pull/1602)** — 序列化、基准指标、编码和脚本稳定性修复。
- 相关：**[Issue #1390](https://github.com/anthropics/skills/issues/1390)** — `evaluation.py` 对任何真实 MCP server 都评分为 0/N（TextContent 无法 JSON 序列化）。**状态：** OPEN。

### 4) document-typography — 生成文档的质量控制
- **[PR #514](https://github.com/anthropics/skills/pull/514)**（OPEN）— 防止孤行换行、寡行段落和编号错位。将排版定位为通用、未被请求但始终需要的质量层。**状态：** OPEN。

### 5) Hivemind — 零成本多智能体编排
- **[PR #1628](https://github.com/anthropics/skills/pull/1628)**（OPEN）— 将机械性工作委派给免费模型上的 headless `opencode` worker，而 Claude Code 仍是唯一的规划者/审查者/合并者。围绕上下文是稀缺资源这一理念展开。**状态：** OPEN。

### 6) scnet-hpc — 领域集群运维
- **[PR #1615](https://github.com/anthropics/skills/pull/1615)**（OPEN）— 面向 SCNet HPC 集群的基于 profile 的 SSH 和 Slurm 工作流。代表正在扩大的垂直 Skill 浪潮。**状态：** OPEN。

### 7) ODT — OpenDocument 创建/转换
- **[PR #486](https://github.com/anthropics/skills/pull/486)**（OPEN）— 创建、填充、读取、转换 `.odt`/`.ods`；ISO/开源文档格式。**状态：** OPEN（长期运行，更新于 2026-04-14）。

### 8) self-audit — 输出验证质量门禁
- **[PR #1367](https://github.com/anthropics/skills/pull/1367)**（OPEN，v1.3.0）— 机械性文件验证，随后按损害严重程度顺序进行四维推理审计。前身提案：**[Issue #1385](https://github.com/anthropics/skills/issues/1385)**。**状态：** OPEN。

*其他值得注意：* **[PR #1607](https://github.com/anthropics/skills/pull/1607)**（claude-api 已退役模型 ID）、**[PR #538](https://github.com/anthropics/skills/pull/538)**（pdf 大小写敏感性故障）、**[PR #83](https://github.com/anthropics/skills/pull/83)**（marketplace Skill 质量/安全分析器——该集合中最古老的 open PR）、**[PR #210](https://github.com/anthropics/skills/pull/210)**（frontend-design 清晰度重写）。

---

## 2. 社区需求趋势（来自 Issues）

| 趋势 | 证据 | 信号强度 |
|---|---|---|
| **安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492)（43 条评论）— 以 `anthropic/` 命名空间分发的社区 Skill 冒充官方 Skill；用户可能授予提升后的权限。另见 [#1175](https://github.com/anthropics/skills/issues/1175)，关于在 SKILL.md 中嵌入权限逻辑。 | ★★★★★ — 迄今为止讨论最多的 issue |
| **团队/组织分发与共享** | [#228](https://github.com/anthropics/skills/issues/228)（16 条评论，8 👍）— 组织级共享 Skill 库，而非手动传递 `.skill` 文件。[#189](https://github.com/anthropics/skills/issues/189)（9 👍）— `document-skills` / `example-skills` 中存在重复内容。 | ★★★★ |
| **评估与触发可靠性** | [#556](https://github.com/anthropics/skills/issues/556)（12 条评论，7 👍）— 0% 触发率；[#1390](https://github.com/anthropics/skills/issues/1390) — mcp-builder 评分为 0/N。 | ★★★★ |
| **上下文窗口经济性** | [#1487](https://github.com/anthropics/skills/issues/1487) — `claude-api` 在单次工具调用中急切注入约 156k tokens；[#189](https://github.com/anthropics/skills/issues/189) 重复 Skill；[#1329](https://github.com/anthropics/skills/issues/1329) `compact-memory` 符号状态。 | ★★★★ |
| **Skill 编写最佳实践** | [#202](https://github.com/anthropics/skills/issues/202) — skill-creator 读起来像开发者文档；冗长语气损害 token 效率。 | ★★★ |
| **治理/智能体安全模式** | [#412](https://github.com/anthropics/skills/issues/412) — 策略执行、威胁检测、信任评分、审计追踪；[#1385](https://github.com/anthropics/skills/issues/1385) — 推理质量门禁。 | ★★★ |
| **平台与协议覆盖** | [#29](https://github.com/anthropics/skills/issues/29) — AWS Bedrock 支持；[#16](https://github.com/anthropics/skills/issues/16) — 将 Skills 暴露为 MCP。 | ★★ |

**提炼出的需求方向：** (a) 针对 Skill 本身的信任/验证工具，(b) 组织规模的分发，(c) token 节约型 Skill 设计，(d) eval 循环的正确性，(e) 垂直/集成 Skill（HPC、Buffer、SharePoint、Bedrock）。

---

## 3. 高潜力待定 Skills

目前所有头部 PR 均为 **OPEN**——本时间窗口内没有已合并条目。根据新鲜度 + 与未解决 bug 的关联判断，最有可能很快落地的是：

1. **[PR #1742](https://github.com/anthropics/skills/pull/1742)** — mcp-builder `mcp>=2` 导入/header 修复。小而精准，修复已提交的 issue（#1668）；更新于 2026-09-11。*最强候选。*
2. **[PR #1734](https://github.com/anthropics/skills/pull/1734)** — 孤立 docx 评论检测。最新提交（2026-09-06），范围干净。
3. **[PR #1724](https://github.com/anthropics/skills/pull/1724)** — mcp-builder 默认模型刷新。一行级别的改动。
4. **[PR #1298](https://github.com/anthropics/skills/pull/1298)** — skill-creator `run_eval.py` recall 修复。影响最大，但体量大且与 #1099/#1050 重叠——合并冲突风险是关键限制因素。
5. **[PR #1607](https://github.com/anthropics/skills/pull/1607)** — claude-api 已退役模型 ID。仅文档，解决 #1603。
6. **[PR #1615](https://github.com/anthropics/skills/pull/1615)** / **[PR #1627](https://github.com/anthropics/skills/pull/1627)** / **[PR #1628](https://github.com/anthropics/skills/pull/1628)** — scnet-hpc、buffer-api、Hivemind。新的垂直 Skill，没有阻塞依赖；需要维护者审查带宽。

**观察列表（陈旧但实质）：** [#514](https://github.com/anthropics/skills/pull/514) document-typography、[#486](https://github.com/anthropics/skills/pull/486) ODT、[#83](https://github.com/anthropics/skills/pull/83) analyzer 元 Skill、[#210](https://github.com/anthropics/skills/pull/210) frontend-design。

---

## 4. Skills 生态系统洞察

**社区的需求集中在让 Skill 层本身可信：修复损坏的评估/触发，加固安全和命名边界，并削减上下文成本——当前系统质量问题比增加新的 Skill 领域更重要。**

---

*方法学说明：* 源 feed 中 PR 评论数不可用（`undefined`）；排名是依据 issue 交叉引用、针对同一 bug 的重复提交、更新新鲜度以及关联 issue 上的 👍 信号推断得出。Issue 指标（评论、👍）按报告原样呈现。

---

# Claude Code 社区文摘 — 2026-09-13

## 1. 今日亮点

一个范围虽窄但重要的补丁已落地：**v2.1.270** 修复了 2.1.269 引入的权限回归——Bash 中的只读 git 命令在会话运行一段时间后开始重新请求授权。社区关注点仍集中在**平台稳定性与成本可预测性**——Windows 桌面 GPU 崩溃讨论帖（#80444）现已成为评论数最高的开放 issue，共 111 条评论，而新报告（#93894）则指出，单次高 effort 代码审查就会耗尽订阅档位的会话预算。Cloud/Cowork GitHub 连接性仍是一个系统性问题，至少有 3 个独立 issue 描述了云会话中仓库无法访问或未列出。

## 2. 发布

**v2.1.270**（过去 24 小时）
- 修复了通过 Bash 执行的只读 git 命令在会话运行一段时间后意外请求权限的问题。这是 **v2.1.269** 引入的回归。
- 影响：频繁调用 `git status`/`git log`/`git diff` 的长时间会话用户应立即升级，以避免反复出现权限提示。

## 3. 热门 Issue

1. **[#80444](https://github.com/anthropics/claude-code/issues/80444)** — *Windows 桌面版 1.24012.1 通过应用内浏览器标签页触发 GPU 进程致命崩溃（0x060C201E）* — 111 条评论，17 👍。这是跟踪器中活动最频繁的 issue。该崩溃会导致 MSIX 包无法启动（`appxState=2`），直到手动 Repair 才能恢复，并且在 RTX 2080 上的两个驱动版本上均可复现。这是最明确的信号，表明应用内浏览器路径在 Windows 上存在硬稳定性问题。
2. **[#11455](https://github.com/anthropics/claude-code/issues/11455)** — *功能请求：会话交接/连续性支持* — 31 条评论，25 👍。这是当前获赞最多的开放请求。长期运行、跨机器的工作仍无法在 CLI 会话之间迁移，社区自 2025 年 11 月以来一直让该请求保持活跃。
3. **[#84581](https://github.com/anthropics/claude-code/issues/84581)** — *Cowork 云会话无法访问任何 GitHub 仓库；git 代理指示 agent 调用不存在的 `add_repo` 工具* — 该代理指示 agent 调用一个并不存在的工具，使云端 GitHub 访问实际上变成死路，而不仅仅是配置错误。
4. **[#91805](https://github.com/anthropics/claude-code/issues/91805)** — *尽管已安装 GitHub App，Claude Code 仓库选择器中仍无可用仓库* — 从 UI 侧印证了 #84581：GitHub App 安装未传播到云端仓库选择器，表明这是集成层问题，而非单个用户问题。
5. **[#82624](https://github.com/anthropics/claude-code/issues/82624)** — *Web/CCR git stop hook：两个误报；其中标志性的一个规定了一个永远无法收敛的 amend 循环* — 随附的 `stop-hook-git-check.sh` 会告诉 agent 去 amend 已经正确的提交，产生一个会重写历史的非终止循环。对于任何在 Web 上运行 Claude Code 的人来说，这属于高严重性。
6. **[#93894](https://github.com/anthropics/claude-code/issues/93894)** — *在 $100/月档位下，使用 Fable 5.1 以高 effort 执行单次代码审查就耗尽整个会话预算* — 今日新增。单次操作耗尽会话配额，是团队采用的硬性阻碍，并直接质疑了其相对于同档位产品的价值主张。
7. **[#79427](https://github.com/anthropics/claude-code/issues/79427)** — *共享 claude daemon 将 `ANTHROPIC_AUTH_TOKEN` 泄漏到之后所有会话中* — 已关闭，但涉及安全：第一个生成共享 daemon 的会话所携带的认证环境变量被后续每个会话继承，导致静默的账户认证错误和计费错误。
8. **[#86280](https://github.com/anthropics/claude-code/issues/86280)** — *macOS 更新/重启后所有 Cowork 项目丢失；`cleanupPeriodDays=30` 静默删除了会话记录* — 复合型数据丢失报告：会话目录被重新创建为空，另有默认保留设置会在未经明确同意的情况下删除会话记录。
9. **[#88731](https://github.com/anthropics/claude-code/issues/88731)** — *由 `claude remote-control`（服务器模式）生成的会话中缺少 Artifact 工具* — `--remote-control` 在同一台机器和同一账户上可以工作，但服务器模式生成的会话会静默缺少 Artifact 工具——这是无头工作流中令人困惑的能力差异。
10. **[#93124](https://github.com/anthropics/claude-code/issues/93124)** — *Claude in Chrome 在 WSL 中无法使用；桌面应用对 WSL 路径项目强制使用 WSL 运行时* — 与增强请求 [#79655](https://github.com/anthropics/claude-code/issues/79655)（支持在 WSL 中使用 Claude in Chrome；其中通过 WSLg 运行原生 Linux Chrome 已经可以工作）配套。WSL 用户目前没有受支持的方式使用浏览器工具。

## 4. 关键 PR 进展

过去 24 小时内仅有 **3 个 pull request** 更新，全部列示如下。

1. **[#93452](https://github.com/anthropics/claude-code/pull/93452)** *(CLOSED)* — `mods/diff`：将 `/diff` mod 面板与内置 diff 面板对齐——hunk 使用相同代码元素、采用内置关闭控件、匹配行距与空状态位置、处理窄终端 resize，并进行串行化仓库探测。减少 mod 与核心 UI 之间的视觉偏差。
2. **[#93912](https://github.com/anthropics/claude-code/pull/93912)** *(CLOSED)* — 为 diff、sec-default 和 telemetry mod 添加单元测试，并依据插件声明进行类型化。测试在 mod 自身的运行时上下文中执行（`$` 和 `on` 钩子），可通过 `claude plugin test <dir>` 运行——这是迈向稳定插件测试契约的有意义一步。
3. **[#61716](https://github.com/anthropics/claude-code/pull/61716)** *(OPEN)* — 文档贡献，记录*虚假*的“usage limit reached”错误其实是上下文溢出误归因：`/compact` 失败并提示“Extra usage required for 1M context”，而该错误被映射到了错误的用户可见消息。关闭 #50321；变通方法是切换到 1M 上下文模型。

## 5. 热门讨论

本数据集未提供讨论数据；本节省略。

## 6. 功能请求趋势

- **会话连续性与交接** — 跨机器/CLI 实例的可移植、可恢复会话（#11455）。该请求持续数月，并且是跟踪器中 👍 数最高的。
- **Cowork 状态持久化** — 跨会话保留聊天的未完成任务和进度面板状态（#93910）；同时伴随对静默删除项目/会话记录的强烈投诉（#86280）。
- **WSL 与浏览器工具对等性** — 在 WSL 上提供一流的 Claude in Chrome 支持，而不是硬禁用路径（#79655、#93124）。
- **Agent 视图组织** — 在 FleetView 中将固定会话分组到单独区域，而不是将其排序到扁平列表顶部（#83013）；可靠的任务生命周期状态，不会自动将会话标记为完成（#80119）。
- **成本透明度与额度控制** — 准确的使用限额消息（#77469、#74165、#87007）以及 $100/月档位下合理的会话预算（#93894）。

## 7. 开发者痛点

- **使用限额消息不可靠。** 多个 issue 报告的重置时间比访问实际恢复时间晚 3.5–4+ 小时（#77469、#74165），并且在触发 5 小时会话限制时却显示支出限额消息（#87007）。这直接浪费了用户的工作时间。
- **云会话 GitHub 集成端到端损坏。** 会话代理指向不存在的工具（#84581），GitHub App 安装正确但仓库选择器不显示任何内容（#91805），并且 GitHub 出口网关覆盖“Full”网络策略，同时吞掉 Authorization headers（#86828）。
- **桌面/平台稳定性。** 导致 MSIX 安装变砖的 Windows GPU 进程崩溃（#80444），以及 Windows 会话启动时侵入性的控制台窗口闪烁（#78189），主导了桌面体验。
- **数据丢失与破坏性默认值。** Cowork 会话目录被重新创建为空，加上默认 30 天会话记录清理会在未明确同意的情况下删除用户历史（#86280）。
- **工具链中的静默失败。** Artifact 工具仅在服务器模式远程会话中缺失（#88731），MCP stdio 服务器在一次惰性重连后被注销，而重新生成的进程发生泄漏（#74329），以及工作区信任对话框无法弹出提示并静默禁用受限功能（#86857）。
- **激进的陈旧 issue 分流。** 过去 24 小时更新的 issue 中有很大一部分是 `CLOSED … stale`，包括可复现、带有 `has-repro` 标签的 bug（#74329、#79427、#86857、#86994），这可能导致合法回归被丢失。

---

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-13

## 1. 今日亮点
过去 24 小时内没有新的 Codex 发布。社区中的主导信号仍然是配额/用量核算痛点，以 40 条评论的跨报告追踪器 #41220 为首，以及新的关于 5 小时严重耗尽的报告。另外，Windows 桌面端可靠性与 TUI/命令中心打磨继续产生最多的 issue 和 PR 活动。

## 2. 发布
过去 24 小时内没有新发布。

## 3. 热门 Issue
1. [#41220](https://github.com/openai/codex/issues/41220) — **[Meta] Codex 用量/配额异常耗尽与用量核算不一致**  
   开放的 bug/速率限制追踪器，汇总了许多关于额度或订阅配额消耗快于预期的报告。本组互动最高：40 条评论，14 👍。

2. [#34349](https://github.com/openai/codex/issues/34349) — **允许用户完全禁用 Pets 并移除“Show Pet”菜单项**  
   仍是这里得票最高的 UX 请求：11 条评论，48 👍。用户希望对可选应用界面区域拥有完全控制权。

3. [#41695](https://github.com/openai/codex/issues/41695) — **iPad App 在访问远程 Codex 会话时频繁卡死**  
   远程会话是关键移动工作流，但反复卡死使 iPad 使用不可靠。8 条评论。

4. [#31317](https://github.com/openai/codex/issues/31317) — **`/resume` 选择器在使用 `--remote ... --cd` 时不显示 CWD 过滤器**  
   一个聚焦的 CLI/TUI 正确性 bug，影响远程用户找到正确会话的能力。8 条评论，2 👍。

5. [#43938](https://github.com/openai/codex/issues/43938) — **Codex 工具 IPC 解码失败**  
   企业用户报告每次工具调用都因 code-mode 解码错误而失败。这阻碍了核心 agent 工作流。6 条评论。

6. [#36946](https://github.com/openai/codex/issues/36946) — **macOS 远程控制无法启用**  
   macOS 上采用远程控制的阻碍，6 条评论，8 👍。

7. [#44444](https://github.com/openai/codex/issues/44444) — **codex-cli 0.154.0：选择 Astra 时光标在输入行内跳动**  
   与模型选择相关的 TUI 回归；令人烦恼，但对交互式用户非常明显。6 条评论，5 👍。

8. [#45073](https://github.com/openai/codex/issues/45073) — **5 小时用量严重耗尽：仅 2 个提示词，约 26 分钟消耗约 86%**  
   来自 Windows 上 ChatGPT Plus 用户、使用 `gpt-5.6-sol medium fast` 的最新速率限制报告。为配额追踪器增添了紧迫性。

9. [#45132](https://github.com/openai/codex/issues/45132) — **app-server 客户端无法使用 Luna Reserve**  
   `supportsLunaReserve` 存在，但缺少接受/兑换操作，导致 app-server 客户端无法使用速率限制恢复路径。2 条评论。

10. [#45075](https://github.com/openai/codex/issues/45075) — **Windows 桌面端在活动任务期间重载；正在运行的回合被中断**  
    活动回合期间重载会让运行变成重试按钮，可能导致上下文丢失和工作中断。2 条评论。

## 4. 关键 PR 进展
1. [#45137](https://github.com/openai/codex/pull/45137) — **从 TUI 输入组件中移除 Astra 闪光动画**  
   移除动画星星及相关输入/终端焦点/模型选择钩子。TUI 打磨并减少视觉噪音。

2. [#45135](https://github.com/openai/codex/pull/45135) — **在 TUI 中于换行符到达前预览流式文本**  
   修复长单行响应在换行符或流完成前不可见的问题。

3. [#45124](https://github.com/openai/codex/pull/45124) — **为异步用户消息添加功能标志**  
   添加默认禁用的 `send_message_to_user_async`，保持该工具仅限根 agent 使用，并排除子 agent。

4. [#45094](https://github.com/openai/codex/pull/45094) — **基于内容而非序列化信封估算历史 token**  
   避免因消息 ID、元数据和 JSON 转义导致 token 估算虚高。

5. [#45090](https://github.com/openai/codex/pull/45090) — **在回顾中保留对话上下文并分离后续操作**  
   通过为已完成进展、注意事项和更正留出更多空间，提高回顾质量。

6. [#45089](https://github.com/openai/codex/pull/45089) — **延迟自动回顾并压缩其 TUI 布局**  
   将自动回顾延迟从 3 分钟改为 30 分钟，并引入更紧凑的 `↳ Recap:` 布局。

7. [#44970](https://github.com/openai/codex/pull/44970) — **在 agent 命令中心显示任务 token 与用量估算**  
   显示输入/输出 token 数以及估算的额度和美元成本，直接满足用量可见性需求。

8. [#44957](https://github.com/openai/codex/pull/44957) — **为 agent 命令中心添加模型分组**  
   让用户通过 `Ctrl+S` 在项目、状态和模型之间循环切换任务分组。

9. [#31471](https://github.com/openai/codex/pull/31471) — **[faster-connectors] 将 apps 缓存逻辑提取到 ConnectorRuntimeManager**  
   开放 PR，按账户、ChatGPT 用户、工作区账户模式和 Codex home 限定连接器缓存范围，并丢弃过期上下文。

10. [#25383](https://github.com/openai/codex/pull/25383) — **添加 app-server 账户会话生命周期**  
    已关闭 PR，通过 `accountSession/login/start`、`add`、`list`、`switch` 和 `logout` 为 Desktop 添加多账户配置文件切换。

## 5. 热门讨论

### 展示与分享
- [#44153](https://github.com/openai/codex/discussions/44153) — **isitdone：在 tests/typecheck/lint 通过前阻止“done”的 Stop hook**  
  一个 Codex CLI Stop hook，会在确切的工作树上运行仓库检查，并在通过前阻止完成。

- [#45128](https://github.com/openai/codex/discussions/45128) — **VibeFuse — 免费的 Windows 画布，可将 Codex CLI 作为实时小组件运行**  
  将 Codex CLI、Claude Code、Gemini CLI、Cursor 和 Qwen 作为可拖拽小组件启动。

- [#44618](https://github.com/openai/codex/discussions/44618) — **Wayfinder：将 Codex 工作追踪为可视化航行地图**  
  本地优先的桌面应用，将 AI 辅助的项目工作转化为可视化历史。

- [#44291](https://github.com/openai/codex/discussions/44291) — **Brain Scanner：在 Codex 更改共享 helper 之前查看谁调用了它**  
  在编辑前为编码 agent 和人类提供调用方/依赖项的项目地图。

### 综合 / 反馈
- [#45062](https://github.com/openai/codex/discussions/45062) — **谢谢，你们听取了意见**  
  针对早先 Android/iOS 建议的正面反馈。

- [#45013](https://github.com/openai/codex/discussions/45013) — **Codex 评价：别订阅，浪费钱**  
  负面评价，关注的是使用限制而非代码质量；反映了持续存在的配额挫败感。

## 6. 功能请求趋势
- **用量/配额透明度与控制**：用量核算修复、Luna Reserve 兑换、token/额度/成本估算以及严重耗尽报告占主导。
- **远程与会话可靠性**：macOS 远程控制启用、iPad 远程卡死、Windows 到 Windows 远程控制、会话存储仪表盘、备份、批量清理以及 resume 分页。
- **Windows 桌面端健壮性**：安装/沙箱失败、集成条目消失、运行时组件缺失以及活动任务中断。
- **TUI/UX 打磨**：禁用 Pets、感知 CWD 的 resume、光标/输入修复、流式文本预览、回顾压缩以及剪贴板正确性。
- **工具/app-server 协议可靠性**：IPC 解码失败、字段缺失、命令运行器失败以及浏览器/Edge 发现错误。
- **模型质量与性能**：Astra 推理退化、应用行为缓慢以及不支持的推理模式切换。
- **多账户与连接器基础设施**：app-server 账户生命周期、连接器运行时缓存范围限定以及异步用户消息支持。

## 7. 开发者痛点
- **配额耗尽与核算不一致**仍是最尖锐的痛点：[#41220](https://github.com/openai/codex/issues/41220)、[#45073](https://github.com/openai/codex/issues/45073)、[#45132](https://github.com/openai/codex/issues/45132)。
- **Windows 桌面端安装、沙箱与运行时失败**反复出现：[#40550](https://github.com/openai/codex/issues/40550)、[#39245](https://github.com/openai/codex/issues/39245)、[#45134](https://github.com/openai/codex/issues/45134)、[#45138](https://github.com/openai/codex/issues/45138)、[#45075](https://github.com/openai/codex/issues/45075)。
- **远程与移动端会话可靠性**是跨平台阻碍：[#41695](https://github.com/openai/codex/issues/41695)、[#36946](https://github.com/openai/codex/issues/36946)、[#34028](https://github.com/openai/codex/issues/34028)。
- **TUI 回归与工作流摩擦**持续出现：[#44444](https://github.com/openai/codex/issues/44444)、[#31317](https://github.com/openai/codex/issues/31317)、[#44956](https://github.com/openai/codex/issues/44956)、[#45068](https://github.com/openai/codex/issues/45068)。
- **工具调用与 app-server 协议错误**破坏核心 agent 执行：[#43938](https://github.com/openai/codex/issues/43938)、[#44379](https://github.com/openai/codex/issues/44379)、[#45139](https://github.com/openai/codex/issues/45139)。
- **会话存储与 resume 可靠性**缺乏一等管理机制：[#38838](https://github.com/openai/codex/issues/38838)、[#45126](https://github.com/openai/codex/issues/45126)。
- **模型质量/性能回归**的报告越来越频繁：[#45095](https://github.com/openai/codex/issues/45095)、[#45097](https://github.com/openai/codex/issues/45097)、[#41730](https://github.com/openai/codex/issues/41730)。
- **Linux 桌面端启动脆弱性**体现在 GUI 启动失败中：[#45117](https://github.com/openai/codex/issues/45117)。
- **浏览器/computer-use 集成失败**仍未解决：[#44169](https://github.com/openai/codex/issues/44169)。
- **插件/skills 状态正确性**是一个小众但令人担忧的问题：[#45130](https://github.com/openai/codex/issues/45130)。

---

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-13

## 1. 今日亮点

社区的注意力分散在安全加固和智能体可靠性两端。最新 nightly（`v0.61.0-nightly.20260912.g9c1b0a610`）上线了一项针对通过构建文件进行间接提示注入的核心修复，以及沙箱文件系统边界加固；与此同时，一批 P1/P2 PR 针对 shell 审批循环、MCP 策略执行和终端闪烁。Issue 活动仍以子智能体行为异常为主——通用型智能体卡死、错误的 `GOAL` 成功报告，以及 Auto Memory 日志/隐私缺口。

## 2. 发布

**v0.61.0-nightly.20260912.g9c1b0a610** — [PR #29291](https://github.com/google-gemini/gemini-cli/pull/29291)
- `fix(core)`：防止通过构建文件修改和不可信的 flags 进行间接提示注入（[#29250](https://github.com/google-gemini/gemini-cli/pull/29250)）。
- `fix(sandbox)`：加固文件系统边界并隔离运行时状态——与 sandbox PR [#29214](https://github.com/google-gemini/gemini-cli/pull/29214) 配套，该 PR 将宿主机目录挂载替换为经过净化的配置文件，并统一 realpath 解析。

## 3. 热门 Issue

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — MAX_TURNS 后子智能体恢复被报告为 GOAL 成功**（P1，13 条评论，👍2）。`codebase_investigator` 在尚未进行任何分析前就已达到轮次上限，却声称 `status: "success"` / `Termination Reason: "GOAL"`。这是当天讨论最多的条目，也是自动化工作流中的正确性/诚实性问题。
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 通用型智能体卡死**（P1，8 条评论，👍8）。本组中社区反响最高：当把工作交给通用型智能体处理时，简单的文件夹创建会无限期卡住；用户通过禁止子智能体委派来绕过此问题。
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖 OS 沙箱化 + 执行后意图路由**（P2，9 条评论）。提议让 Gemini 3 安全地使用其原生 bash 亲和性（grep/cat/sed/awk），这是跟踪器中反复出现的架构主题。
4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — AST 感知的文件读取、搜索和代码库映射**（EPIC，7 条评论）。跟踪 AST 工具是否能减少偏离目标的读取、轮次数量和 token 噪声——#22746 对 `tilth`/`glyph` 的调研也呼应了这一点。
5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 没有充分使用技能和子智能体**（P2，6 条评论）。虽是轶事，但被广泛认同：即使有描述完善的 `gradle`/`git` 技能，模型也很少主动调用它们——这是发现/路由缺口，而非能力缺口。
6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — 确定性脱敏与减少 Auto Memory 日志记录**（P2 安全，5 条评论）。对话记录内容在脱敏提示生效前就已到达模型；相关的记忆质量问题见 [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)、[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)、[#26516](https://github.com/google-gemini/gemini-cli/issues/26516)。
7. **[#29288](https://github.com/google-gemini/gemini-cli/issues/29288) — ACP 会话 ID 不匹配导致 Zed 中的 `session/load` 失效**（P1，4 条评论）。客户端和智能体生成不同的会话 ID，因此在 Windows 上使用 `--experimental-acp` 时会话永远无法恢复。新出现，对编辑器集成影响很大。
8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 执行完成后卡在“Waiting input”**（P1，4 条评论，👍3）。简单命令已完成，但 CLI 仍停留在活动/提示状态——这是多类卡死 bug 之一。
9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — 浏览器子智能体在 Wayland 上失败**（P1，4 条评论）。尽管失败，却报告 `GOAL` 终止；浏览器智能体的韧性在 [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) 和 [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)（`settings.json` 覆盖被忽略）中有更广泛的跟踪。
10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — 智能体应停止/劝阻破坏性行为**（P2，3 条评论）。当存在更安全的替代方案时，模型偶尔会动用 `git reset`/`--force`——这与安全相关，可能会获得更多关注。

值得关注：[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)（超过 ~128 个工具时出现 400 错误）、[#21335](https://github.com/google-gemini/gemini-cli/issues/21335)（`/compress` 在恢复时未持久化，👍2）、[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)（符号链接的智能体文件被忽略）、[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)（bug 报告遗漏子智能体上下文）。

## 4. 关键 PR 进展

1. **[#29292](https://github.com/google-gemini/gemini-cli/pull/29292) — `fix(checkpoint)`：验证 `history` 是数组**（P2）。防止 `loadCheckpoint()` 接受损坏的 JSON（`{"history": null}`）并导致 `/resume` 崩溃。关闭 [#29194](https://github.com/google-gemini/gemini-cli/issues/29194)。
2. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214) — `fix(sandbox)`：加固文件系统边界**（CLOSED，size/xl）。将沙箱运行时状态与宿主机配置目录隔离，并净化挂载——这是与 nightly 配套落地的重要安全修复。
3. **[#29294](https://github.com/google-gemini/gemini-cli/pull/29294) — `fix(cli)`：防止 stdout 争用导致的终端闪烁**（P2）。解决后台命令执行期间输入时出现的严重闪烁/撕裂；关闭 [#29295](https://github.com/google-gemini/gemini-cli/issues/29295)。
4. **[#29201](https://github.com/google-gemini/gemini-cli/pull/29201) — `fix(cli)`：在确认重试间保留已批准的 shell 命令**（P1）。修复 TOML 自定义命令中多个 `!{...}` 注入导致的无限权限循环；修复 [#29197](https://github.com/google-gemini/gemini-cli/issues/29197)。
5. **[#29203](https://github.com/google-gemini/gemini-cli/pull/29203) — `fix(security)`：剥离携带额外 flags 的 shell 包装器**（P2 企业）。扩展 `stripShellWrapper` 以容忍短 flag 组合，使策略引擎真正重新检查内部命令——一个真实的绕过修复。
6. **[#29200](https://github.com/google-gemini/gemini-cli/pull/29200) — `fix(core)`：在运行时一致地执行 MCP 策略**（P2）。对服务器名称匹配进行大小写/空白规范化，并对显式为空的 `mcp.allowed` 列表采取故障关闭行为。
7. **[#29217](https://github.com/google-gemini/gemini-cli/pull/29217) — `fix(config)`：不要重写显式指定的 `gemini-2.5-flash`**（P1/P2）。`isFlashModel()` 宽泛的 `endsWith('flash')` 匹配会静默自动升级已固定模型——这是一个值得注意的用户信任修复。
8. **[#29211](https://github.com/google-gemini/gemini-cli/pull/29211) — `fix(cli)`：停止在状态更新器内调度状态更新**（P2）。`useInputHistoryStore.addInput()` 中的嵌套 `setState` 违反了 React 的纯度契约；可能修复输入历史故障。
9. **[#29208](https://github.com/google-gemini/gemini-cli/pull/29208) — `fix(core)`：遇到格式错误的 `agents.json` 时回退为空**（P2）。防止因保存中断或同步冲突导致的 `TypeError` 崩溃；关闭 [#29207](https://github.com/google-gemini/gemini-cli/issues/29207)。
10. **[#29205](https://github.com/google-gemini/gemini-cli/pull/29205) — `fix(cli)`：提交 MCP 提示文本时不进行 JSON 编码**（P2）。精确保留 MCP 服务器返回的内嵌引号/换行符。

其他值得注意：[#29118](https://github.com/google-gemini/gemini-cli/pull/29118)（CLOSED——仅剥离末尾 `.git` 后缀，保留像 `blog.github.io` 这样的仓库）、[#29287](https://github.com/google-gemini/gemini-cli/pull/29287)（CLOSED——将 `--yolo` 映射到 `allowedTools: ["*"]` 策略，弃用 `ApprovalMode.YOLO`），以及 [#29230](https://github.com/google-gemini/gemini-cli/pull/29230)（docs：修复七个页面中的失效锚点）。

## 5. 热门讨论

本窗口未提供讨论数据，因此省略本节。

## 6. 功能请求趋势

- **AST 感知的代码智能**：[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) 和 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) 推动基于 AST 的读取/搜索/映射，以及 `tilth` 或 `glyph` 风格的 CLI 工具，以减少 token 膨胀和偏离目标的读取。
- **节省 token 的检索**：[#19561](https://github.com/google-gemini/gemini-cli/issues/19561) 提出一种“Tactful Extraction”层级（grep → 精准读取），以应对每轮约 36.6k token 的基线。
- **更安全的智能体自主性**：[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)（为 bash 亲和性提供 OS 沙箱化）和 [#22672](https://github.com/google-gemini/gemini-cli/issues/22672)（劝阻破坏性 git/DB 操作）。
- **更好的子智能体可观测性与共享**：[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)（为子智能体轨迹提供 `/chat share`）、[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)（在 `/bug` 报告中包含子智能体上下文）、[#20195](https://github.com/google-gemini/gemini-cli/issues/20195)（子智能体冲刺跟踪）。
- **智能体自我认知**：[#21432](https://github.com/google-gemini/gemini-cli/issues/21432) 希望获得准确的 CLI flags、快捷键和自我执行指导。
- **任务跟踪器工具**：[#21000](https://github.com/google-gemini/gemini-cli/issues/21000) 实验使用原生文件工具进行跟踪器维护。
- **记忆系统质量**：[#26516](https://github.com/google-gemini/gemini-cli/issues/26516)、[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)、[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)、[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) 构成一个连贯的 Auto Memory 加固主题。

## 7. 开发者痛点

- **卡死与错误的成功信号**：通用型智能体卡死（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)），shell 卡在“Waiting input”（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)），vite 交互式提示死锁（[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)），以及 MAX_TURNS 被错误报告为 `GOAL` 成功（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)）。
- **会话持久化失败**：ACP 会话 ID 不匹配导致 Zed 中的 `session/load` 失效（[#29288](https://github.com/google-gemini/gemini-cli/issues/29288)）；`/compress` 结果在恢复时丢失（[#21335](https://github.com/google-gemini/gemini-cli/issues/21335)）。
- **权限与策略循环**：已批准的 shell 命令反复提示（[#29201](https://github.com/google-gemini/gemini-cli/pull/29201)），shell 包装器策略绕过（[#29203](https://github.com/google-gemini/gemini-cli/pull/29203)），MCP 允许列表语义不一致（[#29200](https://github.com/google-gemini/gemini-cli/pull/29200)）。
- **终端用户体验**：并发 stdout 下的闪烁/撕裂（[#29294](https://github.com/google-gemini/gemini-cli/pull/29294)）以及调整大小时的闪烁（[#21924](https://github.com/google-gemini/gemini-cli/issues/21924)）。
- **工作区污染与安全**：tmp 脚本散落在各目录（[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)），以及 force/reset 风格的破坏性命令（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）。
- **配置与扩展限制**：工具超过 128 个会触发 400 错误（[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)），固定模型被静默重写（[#29217](https://github.com/google-gemini/gemini-cli/pull/29217)），浏览器智能体忽略 `settings.json`（[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)），符号链接的智能体文件被忽略（[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)），以及 Wayland 浏览器智能体失败（[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)）。
- **对智能体报告的信任**：bug 报告缺少子智能体上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)），加剧了智能体少报实际行为这一更广泛主题。

总体信号：维护者正以稳定的 nightly 节奏发布安全性和可靠性修复，但社区最强烈的诉求仍然是**子智能体正确性/可观测性**、**消除卡死**，以及**安全地约束智能体自主性**。

---

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI — 社区摘要
**日期：** 2026-09-13 · **来源：** [github.com/github/copilot-cli](https://github.com/github/copilot-cli)

---

## 1. 今日亮点

过去 24 小时没有新版本发布，但 issue 追踪器依然活跃，有 8 个 issue 更新、3 个 PR。最关键的活动集中在**运行时稳定性**——一个长时间运行的 Linux JavaScript 堆 OOM（#4725），以及一个阻塞会话的 WebSocket/CAPI 400 错误（#2147），后者在 7 条评论后关闭。路线图方面，贡献者推动了两条明确的功能方向：**会话级目录权限**（`/remove-dir`，#4830）和通过 OpenTelemetry 为多模型路由提供**更丰富的可观测性**（#4825）。

---

## 2. 发布

过去 24 小时内未发布新版本。*（当前在用的最新参考版本：v1.0.83，见 #4829。）*

---

## 3. 热门 Issue

> 注：过去 24 小时内只有 8 个 issue 更新，因此下面覆盖了全部，而非请求的 10 个。

**1. [#4725 — [area:platform-linux] Frequent JavaScript heap out of memory](https://github.com/github/copilot-cli/issues/4725)** `OPEN` · 4 条评论 · 👍 1
最高严重级别的开放 bug。CLI 每隔几分钟就以 V8 Mark-Compact 失败崩溃，堆内存约 3.9 GB，表明进程是在耗尽内存，而不是优雅地泄漏。Linux 专属标签暗示存在平台相关的保留路径。目前只有 4 条评论，但崩溃循环对任何运行长时间自主会话的人来说都是硬性阻塞。

**2. [#2147 — CAIP 400: input item ID does not belong to this connection](https://github.com/github/copilot-cli/issues/2147)** `CLOSED` · 7 条评论 · 👍 1
本时间窗口内讨论最多的条目。一个 WebSocket 层 `CAPIError: 400`——“input item ID does not belong to this connection”——出现在 `gpt-5.4 (xhigh)` 上，指向客户端与后端之间的会话状态不同步。从开启（2026-03-18）到关闭历时五个月，但关闭本身是一个值得注意的信号：连接状态处理已修复。

**3. [#4824 — [triage] ctrl-t enqueue prompt doesn't work](https://github.com/github/copilot-cli/issues/4824)** `OPEN` · 1 条评论
通过 `Ctrl-T` 入队的提示词在前一轮结束后永远不会触发；UI 会一直卡在“Working”上转圈。这实际上让队列功能形同虚设，并破坏多步批量工作流。由 mziller 报告，目前还没有 👍，但这是那种会迅速产生重复报告的 UX 死胡同。

**4. [#4759 — [area:mcp] Copilot CLI should send MCP cancellation requests](https://github.com/github/copilot-cli/issues/4759)** `CLOSED` · 1 条评论
当工具调用正在等待 URL 模式的 elicitation 而用户取消了认证浏览器流程时，CLI 未能发出 MCP 取消请求。这是协议层的正确性问题：服务器继续处理已被放弃的请求。该 issue 已关闭，表明已与 [MCP 2026-07-28 cancellation spec](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/cancellation) 对齐。

**5. [#4829 — Subagents fail prompt caching and compound token consumption](https://github.com/github/copilot-cli/issues/4829)** `OPEN` · 0 条评论
针对 v1.0.83 / Windows 11 / Gemini 3.8 Flash 提交。当子代理（例如通过 `task` 工具）在一轮中执行数百次工具调用时，提示缓存失效，token 消耗叠加。这是一个直接带来计费影响的开销与延迟 bug——本批中最具分量的工程报告。

**6. [#4831 — One pasted image and claude-opus-5 won't look at any more images](https://github.com/github/copilot-cli/issues/4831)** `OPEN` · 0 条评论
粘贴一张截图后，之后每次 `view` 调用都会返回“You've reached the maximum number of images you can view (1)”。CLI 记录“Removed 2 images from the model”，因此驱逐逻辑似乎计数错误或过度驱逐。这会完全阻塞依赖截图的调试工作流。

**7. [#4830 — [triage] Add /remove-dir command to revoke directory access](https://github.com/github/copilot-cli/issues/4830)** `OPEN` · 0 条评论
`/add-dir` 和 `/list-dirs` 已存在，但没有反向操作。用户必须重启会话才能缩小工作区信任边界——对于任何宽松授予访问权限并希望在会话中途收回的人来说，这是一个与安全相关的缺口。这是一个直接、范围明确的功能请求。

**8. [#4825 — HydraFusion: emit per-phase model, verdict and credit attributes to OpenTelemetry](https://github.com/github/copilot-cli/issues/4825)** `OPEN` · 0 条评论
多模型轮次对外只产生一个答案和一个 credit 数值，而 `~/.copilot/session-state/<id>/events.jsonl` 保存了完整的路由细节。请求是通过 OTel 暴露每阶段的模型、判定和 credit 属性。零评论，但它反映出对成本归因和路由透明度的需求正在成熟。

---

## 4. 关键 PR 进展

> 注：过去 24 小时内只有 3 个 PR 更新，因此下面覆盖了全部，而非请求的 10 个。

**1. [#4808 — Pin GitHub Actions to commit SHAs](https://github.com/github/copilot-cli/pull/4808)** `CLOSED` · github-security-bot
项目自身安全自动化带来的供应链加固。更改 4 个文件，将 3 处 `uses:` 引用固定到不可变 SHA，0 个警告，0 个错误。于 2026-09-12 合并/关闭——这是可复现、防篡改 CI 的一次干净胜利。

**2. [#4828 — build(deps): bump actions/github-script from 7.1.0 to 9.0.0](https://github.com/github/copilot-cli/pull/4828)** `OPEN` · dependabot[bot]
工作流脚本 action 跨越两个主版本升级。值得审查关注，因为 v8/v9 通常带来 Node 运行时和 API 表面变化，可能会悄然破坏自动化脚本。

**3. [#4827 — build(deps): bump actions/stale from 9.1.0 to 11.0.0](https://github.com/github/copilot-cli/pull/4827)** `OPEN` · dependabot[bot]
issue/PR 陈旧度自动化跨两个主版本升级。功能上风险较低，但它决定社区报告被自动关闭的速度——考虑到大量 `[triage]` issue 涌入，这一点值得关注。

---

## 5. 热门讨论

本报告窗口未提供 Discussions 数据，因此省略本节。

---

## 6. 功能请求趋势

从过去 24 小时内更新的 issue 中提炼：

- **会话级权限控制** — `/remove-dir`（#4830）作为 `/add-dir` 的镜像。用户希望信任边界可撤销、可在运行时调整，而不是靠重启来重置。
- **可观测性与成本归因** — 将每阶段的模型/判定/credit 属性发送到 OpenTelemetry（#4825），以及解释子代理运行中 token 消耗的隐含需求（#4829）。
- **MCP 协议正确性** — 长时间运行的 elicitation 期间具备正确的取消语义（#4759）。这表明企业/代理框架的采用正在增长，而协议规范在其中很重要。
- **输入处理正确性** — 可靠的多模态输入门控（#4831）和可用的提示队列（#4824）属于基础体验要求。

---

## 7. 开发者痛点

- **长时间运行的会话不稳定。** Linux 堆 OOM 每隔几分钟崩溃（#4725），以及连接状态不同步产生硬 400 错误（#2147），都破坏了让 CLI 具有吸引力的“让代理自己跑”的模式。
- **功能静默失败。** `Ctrl-T` 入队看似被接受，但从不执行（#4824）；图片被接受后又被静默驱逐（#4831）。两者都会侵蚀信任，因为 UI 没有给出可操作的失败信号。
- **成本不可预测且不断叠加。** 长时间子代理工具调用序列中的提示缓存失效（#4829）会直接抬高 token 开销，却无法看清原因。
- **无法在会话中途收紧访问权限。** 缺少 `/remove-dir`（#4830）迫使用户完全重启会话以缩小影响范围——这种摩擦会让人干脆不愿使用 `/add-dir`。
- **多模型路由不透明。** 路由决策存在于磁盘上，却不在遥测中（#4825），使运维人员无法审计多模型轮次或进行归因。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-13

*来源：[github.com/anomalyco/opencode](https://github.com/anomalyco/opencode)*

## 1. 今日亮点

过去 24 小时内没有新版本发布，但活动非常密集：长期存在的**剪贴板复制/粘贴失败问题簇**继续主导 issue 跟踪器，最热 issue 目前已有 131 条评论和 123 👍。与此同时，维护者和贡献者推送了一大批 V2/TUI 修复 PR，涵盖会话创建错误、斜杠技能参数丢失、流式 markdown 收尾以及桌面 sidecar 崩溃恢复。新提交的 issue（#48715、#48728、#48675）显示，社区对 provider 身份验证、无头流停滞以及内存压力下的桌面稳定性的担忧正在上升。

## 2. 发布

过去 24 小时内未发布任何版本。

## 3. 热点 Issue

1. **[#4283 — Copy To Clipboard is not working](https://github.com/anomalyco/opencode/issues/4283)** *（OPEN，131 条评论，123 👍）* — 这是仓库中讨论最多的 issue。在多个操作系统和 OpenCode 1.0.62 上，选中的响应文本始终无法进入剪贴板。评论量和 reaction 数使其成为社区最明确的 UX 优先事项。

2. **[#13984 — Can not copy and paste in opencode CLI](https://github.com/anomalyco/opencode/issues/13984)** *（OPEN，57 条评论，32 👍）* — UI 确认“已复制到剪贴板”，但 `Ctrl+V` 什么也粘贴不出来。这证实了 bug 出在剪贴板桥接层本身，而非通知层。

3. **[#41470 — "Copied to clipboard" doesn't work](https://github.com/anomalyco/opencode/issues/41470)** *（OPEN，22 条评论）* — 在 VS Code Server / Docker（v1.18.14）中可复现，指向远程容器剪贴板转发这一独立故障模式。

4. **[#26459 — Clipboard copy fails in web-based VS Code terminals](https://github.com/anomalyco/opencode/issues/26459)** *（OPEN，14 条评论）* — 涵盖 code-server、GitHub Codespaces、VS Code Remote SSH 和 Gitpod。云端/浏览器开发是重要用例，因此影响面很大。

5. **[#26602 — Desktop hits 5-minute Headers Timeout Error with slow local providers](https://github.com/anomalyco/opencode/issues/26602)** *（OPEN，12 条评论）* — 即使配置了 `"timeout": false`，本地 OpenAI 兼容 provider 仍会在整整 5 分钟时被中止。这是配置契约未被遵守的问题——对本地模型用户来说是一个信任问题。

6. **[#36761 — [2.0] Expose valid subagent IDs to the model](https://github.com/anomalyco/opencode/issues/36761)** *（OPEN，7 条评论）* — V2 的 `subagent` 工具没有为模型提供发现路径，因此模型会幻觉出 ID，委派在执行时失败。这对让多 agent 工作流可靠至关重要。

7. **[#32985 — OpenCode broken inside GNU Screen](https://github.com/anomalyco/opencode/issues/32985)** *（OPEN，5 条评论，3 👍）* — 在 Ubuntu 24.04 + Screen 4.09 上没有 truecolor、复制/粘贴损坏、没有鼠标支持。终端兼容性广度仍是一个反复出现的主题。

8. **[#39628 — [FEATURE] Remote approval of permission requests from mobile/second device](https://github.com/anomalyco/opencode/issues/39628)** *（OPEN，4 条评论）* — 长时间运行的会话会因文件编辑/bash/MCP 权限提示而阻塞。远程批准将解锁真正无人值守的 agent 运行。

9. **[#48661 — [FEATURE] Desktop: double-click Review/Context tab to maximize/restore](https://github.com/anomalyco/opencode/issues/48661)** *（OPEN，4 条评论）* — JetBrains 风格的面板管理，在自动关闭后重新创建。虽小，但体现了对桌面精细打磨的需求。

10. **[#48715 — Desktop sidecar crashes repeatedly (0xC0000409) under memory pressure](https://github.com/anomalyco/opencode/issues/48715)** *（OPEN，1 条评论）* — Windows 11、1.18.30：反复出现 V8 fast-fail 崩溃，以及会永久损坏会话的图片数量错误。已有贡献者 PR（#48716）针对此问题。

11. **[#48675 — "opencode run" zero-chunk provider stream stall never surfaces](https://github.com/anomalyco/opencode/issues/48675)** *（OPEN，2 条评论）* — 三个并行无头 worker 同时停滞，没有超时、重试或非零退出。对 CI 自动化而言，静默失败是最糟糕的失败模式。

12. **[#48728 — NVIDIA API key not working (needs:compliance)](https://github.com/anomalyco/opencode/issues/48728)** *（OPEN，3 条评论）* — Provider manifest 看起来正确，但身份验证失败，加入了同日爆发的 provider/配额投诉集群（#48687 DeepSeek 限制、#48681 订阅锁定、#48711 速率限制）。

## 4. 关键 PR 进展

1. **[#48734 — fix(server): surface session creation errors](https://github.com/anomalyco/opencode/pull/48734)** — 关闭 #39775。此前 V2 会话创建期间发生 DB 写入失败时，只会暴露为空 500 和通用的客户端消息；现在错误会以有意义的方式传播。

2. **[#48733 — fix(tui): preserve slash skill arguments](https://github.com/anomalyco/opencode/pull/48733)** — 关闭 #48720。斜杠调用技能后的尾随文本此前会被静默丢弃；现在它会作为普通 prompt 提交，并附带该技能。

3. **[#48732 — fix(tui): finalize streamed markdown responses](https://github.com/anomalyco/opencode/pull/48732)** — 关闭 #48714。助手消息完成后仍停留在 OpenTUI 的流式渲染模式，导致最终布局损坏。

4. **[#48716 — fix(desktop): respawn crashed sidecar; classify image-count errors as overflow](https://github.com/anomalyco/opencode/pull/48716)** — 关闭 #48715。直接解决 Windows 0xC0000409 崩溃循环以及会使会话报废的“图片过多”状态。

5. **[#48638 — fix(core): eliminate durable event write amplification from turn diffs](https://github.com/anomalyco/opencode/pull/48638)** — 关闭 #48641。`SessionSummary.summarize` 会把完整 git patch 文本附加到用户消息上，造成持久写入放大——这与早先的 SSE 内存增长报告（#31087）相关。

6. **[#48730 — fix(core): keep locations with running terminals out of eviction](https://github.com/anomalyco/opencode/pull/48730)** — 关闭 #48691。`LocationActivity` 会在最后一个*会话*事件后 60 分钟驱逐，但终端不会发出任何事件——因此活跃终端会话会在用户眼皮底下被驱逐。

7. **[#48729 — fix(session): keep todo list current for non-Claude models](https://github.com/anomalyco/opencode/pull/48729)** — 关闭 #27560。Anthropic prompt 路径之外的模型从未收到 todo 更新指令，导致工作完成后条目仍卡在 `in_progress`。

8. **[#46690 — feat(plugin): expose session forms, session list, and global event stream](https://github.com/anomalyco/opencode/pull/46690)** — 大幅扩展 V2 插件 API，使 Telegram bot 等集成能够管理会话并订阅全局事件。

9. **[#48724 — fix(desktop): migrate mac beta to stable installer](https://github.com/anomalyco/opencode/pull/48724)** — 将 macOS Beta 用户引导到已签名的 Stable DMG，而不是让 Squirrel.Mac 替换一个标识不同的 bundle；涵盖更新器状态、对话框、崩溃恢复和标题栏。

10. **[#46165 — fix(app): keep archived sessions open in their tabs](https://github.com/anomalyco/opencode/pull/46165)** — 关闭 #35058。此前归档表现为导航命令并强制关闭标签页；现在将归档状态与导航解耦。

*同样值得注意：* [#48727](https://github.com/anomalyco/opencode/pull/48727)（标签页布局移至常规设置，由 opencode agent bot 贡献）、[#48735](https://github.com/anomalyco/opencode/pull/48735)（会话标题占位符本地化）、[#43298](https://github.com/anomalyco/opencode/pull/43298)（窄视口下提交按钮不再被遮挡）、[#48712](https://github.com/anomalyco/opencode/pull/48712)（通过 kitty/sixel 图形渲染 LaTeX 数学公式，现已关闭）。

## 5. 热门讨论

本周期未提供讨论数据，因此省略本节。

## 6. 功能请求趋势

- **远程与异步操作** — 通过移动端/第二设备批准权限提示（[#39628](https://github.com/anomalyco/opencode/issues/39628)）反映了对无人值守、长时间运行且不会因等待人工输入而阻塞的 agent 会话的需求。
- **桌面面板与布局易用性** — JetBrains 风格的最大化/恢复（[#48661](https://github.com/anomalyco/opencode/issues/48661)）、标签页布局移出 Experimental（[#48727](https://github.com/anomalyco/opencode/pull/48727)），以及窄视口下 prompt 提交按钮的可见性（[#43298](https://github.com/anomalyco/opencode/pull/43298)）。
- **会话生命周期控制** — 通过裸 `-s` 打开交互式会话选择器（[#48718](https://github.com/anomalyco/opencode/issues/48718)）、从上下文菜单重命名（[#46915](https://github.com/anomalyco/opencode/pull/46915)），以及归档但不关闭（[#46165](https://github.com/anomalyco/opencode/pull/46165)）。
- **国际化** — TUI i18n 工作（[#48731](https://github.com/anomalyco/opencode/pull/48731)）、波斯语 README（[#47783](https://github.com/anomalyco/opencode/pull/47783)），以及本地化会话标签（[#48735](https://github.com/anomalyco/opencode/pull/48735)）。
- **插件生态扩展** — 会话表单、会话列表和全局事件流（[#46690](https://github.com/anomalyco/opencode/pull/46690)），以及稳定的生态目录贡献（[#48722](https://github.com/anomalyco/opencode/pull/48722)、[#48726](https://github.com/anomalyco/opencode/pull/48726)）。
- **终端渲染保真度** — LaTeX/数学块渲染（[#48712](https://github.com/anomalyco/opencode/pull/48712)）、GNU Screen truecolor 支持（[#32985](https://github.com/anomalyco/opencode/issues/32985)），以及复制时保留逻辑文本而非渲染布局（[#47165](https://github.com/anomalyco/opencode/issues/47165)）。

## 7. 开发者痛点

1. **剪贴板可靠性是第 1 大未解决挫败感。** 今日热门 issue 中有六个（#4283、#13984、#41470、#26459、#35258、#39588，加上 #32985 和 #47165）与剪贴板相关，横跨 TUI、VS Code 扩展、Web VS Code、Codespaces、SSH、GNU Screen、Windows 终端和 macOS。反复出现的模式——先提示成功，随后粘贴缓冲区却为空——侵蚀了人们对每一个复制入口的信任。

2. **静默流和会话失败。** 零 chunk provider 停滞且没有超时或非零退出（[#48675](https://github.com/anomalyco/opencode/issues/48675)）、标签页恢复后 SSE 流永不恢复（[#47258](https://github.com/anomalyco/opencode/issues/47258)）、SSE 内存无界增长（[#31087](https://github.com/anomalyco/opencode/issues/31087)，已关闭），以及 subagent 流错误以空 `<task_result>` 形式出现（[#38866](https://github.com/anomalyco/opencode/issues/38866)），都意味着失败容易被忽略，直到代价高昂时才被发现。

3. **Provider 认证和配额摩擦。** NVIDIA API key 无法通过身份验证（[#48728](https://github.com/anomalyco/opencode/issues/48728)）、DeepSeek 4.1 Flash 配额计量异常（[#48687](https://github.com/anomalyco/opencode/issues/48687)）、“已订阅但被锁定”的报告（[#48681](https://github.com/anomalyco/opencode/issues/48681)）、不透明的速率限制错误（[#48711](https://github.com/anomalyco/opencode/issues/48711)），以及 `ProviderModelNotFoundError` 回显同一个无效字符串（[#48721](https://github.com/anomalyco/opencode/issues/48721)）。

4. **配置的超时未被遵守。** 尽管设置了 `"timeout": false`，Desktop 仍出现 5 分钟 Headers Timeout Error（[#26602](https://github.com/anomalyco/opencode/issues/26602)），削弱了对本地/自托管 provider 设置的信心。

5. **V2 在输入和委派方面的回归。** Ctrl+C 丢弃已编写的 prompt 草稿且无法恢复（[#48636](https://github.com/anomalyco/opencode/issues/48636)，已关闭）、斜杠技能尾随参数消失（[#48720](https://github.com/anomalyco/opencode/issues/48720)），以及 subagent ID 无法被模型发现（[#36761](https://github.com/anomalyco/opencode/issues/36761)）。

6. **负载下的桌面稳定性。** sidecar 以 0xC0000409 崩溃、会永久损坏会话的图片数量错误（[#48715](https://github.com/anomalyco/opencode/issues/48715)），以及启动时 MCP 服务器进程爆炸（[#43845](https://github.com/anomalyco/opencode/issues/43845)），都表明 V2 后台服务存在资源管理缺口。

7. **终端/环境兼容性仍然很广。** GNU Screen、通过 SSH 使用的 macOS Terminal、Windows 终端和基于 Web 的编辑器各自暴露出不同的渲染和输入 bug，说明 TUI 需要更明确的能力协商层。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-13

Source: [github.com/earendil-works/pi](https://github.com/earendil-works/pi)

---

## 1. 今日亮点

过去 24 小时没有新版本发布，但工单分诊吞吐量很高——维护者关闭了该时间窗口内更新的 43 个 issue 中的约 13 个，其中多数是当天提交的 `[untriaged]` 报告。最重要的开放讨论仍是 `openai-codex` 连接挂起（[#4945](https://github.com/earendil-works/pi/issues/4945)，78 条评论，33 👍），如今它已成为持续数月的可靠性问题，而非一次性 bug。与此同时，provider 扩展正在 PR 侧加速，Meta Muse、Google Antigravity 和 Cursor Pro 的基于订阅的 OAuth 集成都在推进中或已合并。

---

## 2. 发布

过去 24 小时内无发布。

---

## 3. 热门 Issue

1. **[#4945 — `openai-codex` Connection Reliability Issues](https://github.com/earendil-works/pi/issues/4945)** `[OPEN] [inprogress]`
   TUI 会间歇性卡在 `Working...`，没有流式文本、没有工具调用，也没有错误；唯一的办法是按 Escape，而这会记录一次虚假的中止回合。这是仓库中讨论最多的单个 issue（78 条评论，33 👍），也是最清晰的信号：provider 流式稳健性仍是 Pi 的首要痛点。

2. **[#8928 — Parallel startup reports "No API key found" for ~48s with an expired OAuth credential for another provider](https://github.com/earendil-works/pi/issues/8928)** `[OPEN] [inprogress]`
   一个带有计时数据的确定性复现，解释了一类长期存在的多进程认证失败（#1871、#4919、#6880）。错误信息把问题错误归因到 *active* provider，导致调试成本很高——报告者为此花了约 3 小时。与任何在 CI 或并行 agent 环境中运行 Pi 的人直接相关。

3. **[#9052 — Fullscreen mode wheel scrolling is 3x slower than regular mode](https://github.com/earendil-works/pi/issues/9052)** `[OPEN]`
   用户为了固定输入框而采用全屏模式，随后却遇到滚动体验回退。九条评论和 4 个 👍 表明，固定输入框布局的权衡是该模式被广泛采用的阻碍。

4. **[#9311 — Fullscreen mouse selection survives session switch](https://github.com/earendil-works/pi/issues/9311)** `[OPEN]`
   切换会话后，选中的文本会保留到新会话中，需要手动清除。这是一个小状态 bug，但与 #9052 叠加后，让全屏模式显得不够精致。

5. **[#9068 — `user_bash` silently falls back to host execution when a routing extension fails](https://github.com/earendil-works/pi/issues/9068)** `[OPEN] [bug]`
   队列中严重性最高的 issue：如果扩展将 `!`/`!!` 命令路由到隔离 VM（例如 Gondolin），而它的 handler 抛出异常，Pi 会悄悄改为在宿主机上执行。这是沙箱逃逸类故障模式，而不是表面 bug。

6. **[#9474 — Codex transport has no non-resetting per-request deadline](https://github.com/earendil-works/pi/issues/9474)** `[OPEN]`
   周期性的 SSE/WebSocket 事件（心跳、部分增量）会绕过现有的空闲超时，因此停滞的流可能无限挂起。很可能是 #4945 系列挂起的贡献性根因。

7. **[#9262 — `find` tool: Windows separators silently return no results](https://github.com/earendil-works/pi/issues/9262)** `[OPEN] [last-read]`
   像 `src\**\*.ts` 这样的模式会返回空结果且没有错误，导致 agent 得出文件不存在的结论。工具层中的静默错误答案比响亮失败更糟，因为它们会在下游破坏 agent 推理。

8. **[#9243 — Session resume restores the model from the last assistant message's echoed name](https://github.com/earendil-works/pi/issues/9243)** `[OPEN] [last-read]`
   当 provider 回显的模型名与路由 ID 不同时，恢复会话会恢复错误的模型。这是 `session-manager.ts` 中的状态完整性 bug，可能跨会话悄悄改变行为并影响成本。

9. **[#9354 — Prompt templates with invalid frontmatter are silently dropped](https://github.com/earendil-works/pi/issues/9354)** `[OPEN]`
   启动时没有警告，`/resources` 中也没有任何提示；模板只是从自动补全中消失。Skills 处理相同失败时会给出警告——这种不一致会浪费用户真实的调试时间。

10. **[#9530 — Add Google Antigravity and Cursor Pro OAuth providers](https://github.com/earendil-works/pi/issues/9530)** `[CLOSED] [untriaged]`
    很快被关闭，但对应的 PR（#9529）显示了方向：基于订阅、浏览器 OAuth、无需 API key 的 provider。社区对“带上你已有的订阅”的需求显然很强。

*同样值得关注：* [#9098](https://github.com/earendil-works/pi/issues/9098)（RPC 响应中的 prompt 处置）、[#5372](https://github.com/earendil-works/pi/issues/5372)（自定义 OAuth 回调渲染）、[#9129](https://github.com/earendil-works/pi/issues/9129)（Windows bash 超时后遗留管道进程）、[#9519](https://github.com/earendil-works/pi/issues/9519)（iTerm2 内联图片在每次重绘时堆叠副本）。

---

## 4. 关键 PR 进展

1. **[#9096 — feat(ai, coding-agent): add Meta provider with Muse subscription OAuth](https://github.com/earendil-works/pi/pull/9096)** `OPEN`
   解决 #7543。作者记录了一些值得注意的怪癖：API token 每天从 identity token 重新铸造，而不是滚动更新；并且在中型响应上，流式传输实际上是“假的”（突发输出）。对于理解非标准 provider 认证模型如何被吸收，这是一个有用的参考。

2. **[#9529 — feat(ai): add Google Antigravity and Cursor Pro OAuth providers](https://github.com/earendil-works/pi/pull/9529)** `CLOSED`
   新增两个浏览器 OAuth、基于订阅的 provider，使用本地回调服务器端口 51123，并提供手动输入 code 的回退。配对的 issue（#9530）在同一天被关闭。

3. **[#8635 — fix(ai): preserve aborted stop reason during lazy setup](https://github.com/earendil-works/pi/pull/8635)** `OPEN`
   通过将 abort signal 贯穿到惰性流设置包装器，并在请求已被取消时将设置失败报告为 aborted，修复 #8409。新增了一个回归测试，用于在 next-auth 设置之前、工具执行期间中止的情况。

4. **[#9531 — feat(tree): add permanent branch deletion from session tree](https://github.com/earendil-works/pi/pull/9531)** `CLOSED`
   实现 `SessionManager.pruneBranch(entryId)` + `countSubtree()`，支持移除非路径上的 entry、保护活动路径、label 重新链接，以及存活 compaction 重新指向。通过 `/tree` 选择器中的 `shift+d` 暴露。

5. **[#9523 — Fix #9522: Pi's own blocking prompts now emit `ui_prompt_start` / `ui_prompt_end`](https://github.com/earendil-works/pi/pull/9523)** `CLOSED`
   此前这些事件只对扩展打开的 prompt 触发，因此状态集成在模型选择器、设置、恢复和会话树期间会报告“running”。这对任何构建“等待用户”指示器的人来说都是重要修复。

6. **[#9517 — feat(tui): group long tool-call runs](https://github.com/earendil-works/pi/pull/9517)** `CLOSED`
   将连续六次或以上的工具调用折叠为一条聚合 transcript 行，在折叠时保留失败调用，并添加点击展开和渲染测试。直接解决长 agent 循环中的 transcript 噪声。

7. **[#9514 — fix(tui): route hardcoded keys through configurable bindings](https://github.com/earendil-works/pi/pull/9514)** `CLOSED`
   将编辑器、输入框和模型选择器中硬编码的快捷键迁移到 keybindings，新增 Ctrl+C 用于清除搜索/取消模型选择。与 #7629 中的键盘重映射请求相关。

8. **[#9539 — examples: add loop-guard extension (break LLM tool-call loops)](https://github.com/earendil-works/pi/pull/9539)** `CLOSED`
   一个参考扩展，用于检测并打断重复的相同工具调用（相同工具 + 相同参数），例如永远无法成功的验证命令。它作为示例而非核心行为发布——这是 agent 安全原语的一种合理模式。

*（时间窗口内有一个 PR，[#9532](https://github.com/earendil-works/pi/pull/9532)，没有描述且已关闭——视为噪声。）*

---

## 5. 热门讨论

**问答**
- **[#3373 — 你最喜欢配合 Pi agent 使用哪些插件、附加组件或扩展？](https://github.com/earendil-works/pi/discussions/3373)** — 仍是活跃度最高的讨论串（16 条评论，9 👍），今天再次更新。它能很好地衡量哪些扩展界面真正被使用，也证明用户希望有一条经过筛选的途径来获取第三方工具，而不必依赖 Discord。

**想法 / 反馈**
- **[#9516 — `openai-responses`：兼容网关会丢弃 `function_call_output` 中的工具结果图片](https://github.com/earendil-works/pi/discussions/9516)** — Pi 会发出官方 Responses 编码（`output` 中的 `input_image`），但兼容网关会丢弃它；Completions 之所以能处理，只是因为 `role: "tool"` 仅支持字符串。这是一个互操作缺口，也镜像为 issue #9518。

**展示与分享**
- **[#9525 — 谢谢：`--mode rpc` 是一个新开源项目的骨干](https://github.com/earendil-works/pi/discussions/9525)** — `web-agent`，一个对手机友好的仪表盘，围绕一个持久 Pi 会话提供 Siri 和 Matrix 桥接。具体验证了 RPC 模式正被用作平台界面，而不仅仅是内部传输。

---

## 6. 功能请求趋势

- **自带订阅的 provider。** 最强的方向性信号：Meta Muse（#9096）、Google Antigravity 和 Cursor Pro（#9529/#9530）都是基于 OAuth、无需 API key 的 provider 集成。预计会有更多此类集成。
- **TUI/终端 UX 深度。** 全屏模式滚动和鼠标行为（#9052、#9311、#9538）、可配置 keybindings（#9514、#7629）、工具调用运行分组（#9517）以及内联图片重绘（#9519）主导了 UI 待办列表。
- **更丰富的扩展/RPC 接口面。** 调用方想要更多控制和可观测性：RPC 响应中的 prompt 处置（#9098）、自定义 OAuth 回调渲染（#5372）、Pi 自身对话框的 UI prompt 生命周期事件（#9522），以及有作用域的工作可见性覆盖（#9536）。
- **会话管理成为一等工作流。** 从恢复点分叉（恢复列表中的 `Ctrl+F`，#9521）、永久分支删除（#9531），以及恢复时准确还原模型（#9243）。
- **不破坏兼容性的可配置性。** 窗口相对 compaction 预算（#9415）和 keybinding 路由都遵循一种模式：接受新形式，同时保持现有整数/硬编码配置仍然有效。

---

## 7. 开发者痛点

- **静默失败是主要的挫败来源。** Windows glob 分隔符返回空结果（#9262）、无效 frontmatter 无警告地丢弃模板（#9354），以及扩展路由失败回退到宿主机执行（#9068），都会在没有诊断信息的情况下产生错误行为。在 agent 语境中，静默错误比报错更有破坏性。
- **流和传输会挂起而不是失败。** “一直 `working...`”这一类问题（#4945）、缺少墙钟截止时间（#9474），以及 `stream_read_error` 未被归类为可重试（#9520），都指向一个系统性缺口：Pi 的错误分类和超时没有覆盖现实世界中停滞的流。
- **Windows 仍是二等平台。** 路径分隔符处理、超时后遗留的管道进程（#9129），以及 bun-install/Node 不匹配（#5365）构成了一组反复出现的问题。
- **多进程设置中的认证和凭证边缘情况。** 无关 provider 的过期 OAuth 凭证导致 48 秒启动失败，并给出误导性消息（#8928），对 CI 和并行 agent 工作流造成不成比例的伤害。
- **成本和缓存遥测可能误导。** 同一会话中在云端模型之后使用本地 vLLM 时出现误报的缓存未命中提示（#9013），会削弱开发者对用于优化决策的 token 核算的信任。
- **调试成本相对于 bug 严重性偏高。** 多份报告提到因误导性错误而损失数小时（#8928、#4945），这进一步说明错误消息质量本身就是一个高杠杆的修复领域。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区简报 — 2026-09-13

## 1. 今日亮点

交互式 TUI 的不稳定性主导了今日动态：两个 P1 报告（#11500、#11732）描述了同一类未捕获的 React error #185 崩溃循环，发生在后台 agent 或原生 monitor 任务结束时；#11732 确认该故障在最新的 0.23.3 版本上可复现。架构方面，维护者正在推动一个重要方向——将 agent harness 与执行环境分离（#11695、#11746）——同时注重安全的贡献者指出未脱敏的遥测路径（#11198、#11666）。一个新的 nightly（v0.23.3-nightly.20260912）已发布，包含 channel 重构和一项破坏性变更通知。

## 2. 版本发布

**v0.23.3-nightly.20260912.54aa66834b**
- `refactor(dingtalk)`：移除了过时的后台响应聚合（[#11570](https://github.com/QwenLM/qwen-code/pull/11570)）
- `feat(channels)!`：对 channels 子系统进行了破坏性变更——发布说明中的 changelog 条目被截断，因此 channel 集成的使用者在升级前应跟踪相关 PR/commit

## 3. 热门 Issue

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — 多个后台 agent 完成时，TUI 因 React #185 静默退出**（P1，10 条评论）——Ink `useBoxMetrics` 布局监听器的 setState 循环以 “Maximum update depth exceeded” 终止进程，且没有渲染出错误；最糟糕的是，resume 会将上一个会话报告为已损坏。这是当日评论数最多的 issue，也是该类崩溃最清晰的可复现案例。

2. **[#10065](https://github.com/QwenLM/qwen-code/issues/10065) — 零个 MCP server 时 LM Studio “failed to parse grammar”**（9 条评论，已关闭）——LM Studio 0.4.21 上的本地模型用户即使在 `tools.core=[]` 时也会遭遇硬性请求失败，导致 Qwen Code 无法与这个流行的本地服务器一起使用。经过持续排查后已关闭，但它表明对于 OpenAI-compatible 本地后端，tool-schema 路径有多么脆弱。

3. **[#7771](https://github.com/QwenLM/qwen-code/issues/7771) — 持久化的 `mcp_config` 未加载到主进程 MCP proxy**（8 条评论，已关闭）——桌面端用户在重启后丢失所有 MCP server，因为 Electron 主进程从未重新载入持久化配置，导致 IPC 调用失败。该 issue 长期存在（创建于 7 月 26 日）并在今日关闭，弥合了一个长达一个月的桌面端可靠性缺口。

4. **[#11732](https://github.com/QwenLM/qwen-code/issues/11732) — 原生 monitor 任务继续运行时，0.23.3 因 React #185 崩溃**（P1，6 条评论）——与 #11500 属于同一错误族，但崩溃发生在长时间运行的 monitor 任务仍处于活动状态时，留下一个孤儿任务。该问题报告于当前正式版本，这提高了发布修复而非 nightly 补丁的紧迫性。

5. **[#11695](https://github.com/QwenLM/qwen-code/issues/11695) — tracking(core)：将 agent harness 与执行环境分离**（5 条评论）——这是一项总括提案，旨在让工具执行的位置成为一个*可分离、可寻址*的运行时组件，而不是 agent-loop 进程的一个属性。这是今日 sandbox/worker PR 背后的架构主干，也可能是数据集中最大的路线图信号。

6. **[#11704](https://github.com/QwenLM/qwen-code/issues/11704) — proposal(mobile)：通过 ACP 为 `qwen serve` 提供官方 Android 配套客户端**（5 条评论）——一个通过 ACP 与 `qwen serve` 通信的瘦客户端 Android 应用，作者提出愿意实现并维护 MVP。值得注意的是，这是社区贡献的平台方向，而非核心团队提案。

7. **[#11198](https://github.com/QwenLM/qwen-code/issues/11198) — 遥测上传未脱敏的原始 tool-error 文本（包括 shell 命令行）**（P1，3 条评论）——默认开启的使用统计会将未脱敏的 shell 失败发送到 RUM 端点，比 #10916 中标记的字段范围更广。这是一个自 9 月 6 日以来一直未解决的隐私/凭证泄露风险。

8. **[#11499](https://github.com/QwenLM/qwen-code/issues/11499) — `.mcp.json` 中的 `${VAR}` 占位符未被展开**（4 条评论）——密钥会被原样发送，因此 `Authorization: Bearer ${MY_TOKEN}` 传输的是占位符文本而不是 token。这打破了将 MCP 凭证排除在版本控制之外的标准模式。

9. **[#11610](https://github.com/QwenLM/qwen-code/issues/11610) — hooks：让 hook 契约与 Claude Code 对齐**（P1，3 条评论）——要求在纯文本 stdout、`stop_hook_active`、超时单位、matcher 和通用输入方面实现对齐。纯粹出于兼容性动机：引擎在结构上已经相当，因此这是为了不破坏迁移 hook 配置的用户。

10. **[#11746](https://github.com/QwenLM/qwen-code/issues/11746) — feat(core)：为 execution worker 提供 SSH transport**（2 条评论）——继 local 和 container 之后的第三种 `ExecutionEnvironment` 后端，可在远程主机上运行 agent 工具；明确依赖 #11711。这是 #11695/#11696 sandbox-split 方向最早的具体体现。

## 4. 关键 PR 进展

1. **[#10183](https://github.com/QwenLM/qwen-code/pull/10183) — feat(memory)：结构化按需召回**——用 push/pull 召回协议替代扁平、正文繁重的 auto-memory prompt：在语料变更时提供两级 ref/title 树，在相关轮次提供聚焦查询的元数据子树，并提供一个专用 recall 工具。这可能是进行中最大的上下文效率提升。

2. **[#11241](https://github.com/QwenLM/qwen-code/pull/11241) — feat(browser-use)：基于 Playwright 的 Browser SDK**——在持久化 Node REPL 内提供一个带类型、面向模型的浏览器 API，通过语义定位器、DOM 快照 ref 和视觉坐标控制现有 Chrome 会话。使 Qwen Code 与 Codex Browser Use 保持一致。

3. **[#11636](https://github.com/QwenLM/qwen-code/pull/11636) — feat：跨 daemon 与 web shell 跟踪后台结果执行**——为后台结果处理提供显式的 daemon 生命周期：当前执行结果在安全的模型边界被消费，较旧结果保留以用于自动续接。与后台 agent 崩溃报告直接相关。

4. **[#11700](https://github.com/QwenLM/qwen-code/pull/11700) — feat(web-shell)：改进上下文概览并添加手动压缩**——Composer tooltip 显示准确的剩余容量；上下文卡片和右侧面板展示已用/总 token、剩余容量以及可展开的分类总计，并支持手动压缩。解决了 Web Shell 中“我的上下文有多满？”这一缺口。

5. **[#11289](https://github.com/QwenLM/qwen-code/pull/11289) — fix(web-shell)：保留 daemon 在空闲时拒绝的轮次中途消息**——daemon 不再只是直接拒绝，而是说明会话已进入空闲状态，浏览器会将文本作为普通 prompt 重新发送。修复了轮次转换期间的静默消息丢失。

6. **[#11606](https://github.com/QwenLM/qwen-code/pull/11606) — fix(dashscope)：仅对 qwen 系列模型发送请求元数据**——将 DashScope `metadata` 对象限定到 qwen 系列 wire 模型，并提供 `enableRequestMetadata` 覆盖以处理边缘情况。减少 DashScope 兼容端点后面非 Qwen 模型的 400 类错误。

7. **[#11538](https://github.com/QwenLM/qwen-code/pull/11538) — feat：按模型选择 OpenAI API**——为 OpenAI-compatible provider 添加模型级 `api: "chat-completions" | "responses"`，因此单个 provider 配置可以混合使用不同 endpoint 风格。对自托管网关用户而言是很好的灵活性提升。

8. **[#11466](https://github.com/QwenLM/qwen-code/pull/11466) — fix(mcp)：当工具调用被取消时重新武装已断开的 server 连接**——取消对该调用而言正确地是最终状态，但它也跳过了所有自动重连分支，导致 transport 对所有后续调用都处于断开状态。现在，在调用被取消后会重新武装连接。

9. **[#11742](https://github.com/QwenLM/qwen-code/pull/11742) — fix(cli)：当进程因未捕获异常死亡时回收正在运行的 monitor**——在 session-aware 处理器中，在 `process.exit(1)` 之前调用 `MonitorRegistry.abortAll({ notify: false })`，这样孤儿 monitor 不会在崩溃后继续存活。与 #11732 崩溃报告配套。

10. **[#10906](https://github.com/QwenLM/qwen-code/pull/10906) — feat(web-shell)：显示 shell 与 monitor 任务输出**——将 Monitor stdout/stderr 与现有 Shell 捕获一起持久化，并为任务详情面板暴露一个经过净化、按 live-session-owner 限定范围的 tail 端点。弥合了 Web Shell 中长期存在的可观测性缺口。

另外值得注意：**[#11443](https://github.com/QwenLM/qwen-code/pull/11443)**（查询前同步 LSP 文档）和 **[#11643](https://github.com/QwenLM/qwen-code/pull/11643)**（为 Windows web 终端内置 ConPTY 后端）均已于今日关闭。

## 5. 热门讨论

本时间窗口未提供 GitHub Discussions 数据；本节省略。

## 6. 功能请求趋势

- **可分离的执行环境 / 沙箱化**——#11695（harness 与 executor 拆分）、#11746（为 worker 提供 SSH 传输），以及 #11711 中的 container 后端。这是占主导地位的架构诉求，而且是由维护者而不只是用户在推动。
- **终端之外的平台扩展**——#11704（通过 ACP 的官方 Android 配套客户端）以及相关的 `roadmap/platform-distribution` issue，表明用户对基于 `qwen serve` 的瘦客户端有需求。
- **作为契约的生态兼容性**——#11610（与 Claude Code 的 hook 对齐）以及 hooks/events 路线图条目表明，用户希望配置和 hook 语义能在不同 agent CLI 之间可移植。
- **记忆与上下文管理**——结构化按需召回（#10183）和 Web Shell 中的手动上下文压缩（#11700）反映出用户希望对进入上下文窗口的内容进行显式、可检查的控制。
- **模型/provider 灵活性**——按模型选择 API（#11538）和限定范围的 provider 元数据（#11606）表明，用户群体正在运行异构的 OpenAI-compatible 后端，并希望为每个后端提供一等配置。

## 7. 开发者痛点

1. **React #185 TUI 崩溃现在是一种模式，而不是孤立事件。** #11500 和 #11732 共享相同的根因特征（Ink 布局监听器 setState 循环），并且 #11732 在稳定版 0.23.3 上可复现。退出时崩溃还会留下孤儿 monitor（#11742）以及无法恢复的会话。
2. **遥测默认设置泄露敏感内容。** #11198（RUM 中的原始 shell 命令行）和 #11666（尽管 `logPrompts=false` 仍导出 API 请求内容，已关闭）共同削弱了对默认开启的使用统计管道的信任。
3. **MCP 配置是最薄弱的一环。** 占位符未展开（#11499）、持久化的桌面端配置在启动时未加载（#7771），以及 MCP 工具图像绕过 `read_file` 视觉预算（#10834），是 MCP 路径让用户感到意外的三种不同方式。
4. **本地/服务器后端以不透明的方式失败。** LM Studio 语法解析失败（#10065）、Fireworks 对 `messages[].reasoning` 返回 400（#11657），以及陈旧的 LSP 文档内容（#11439），都以无法解释的请求失败出现，而不是可操作的诊断信息。
5. **环境和打包假设在非标准主机上失效。** Desktop AppImage 会将 `PYTHONHOME`/`PYTHONPATH` 泄漏到生成的 stdio MCP server 中（#11718），而 RHEL 10 上缺少 `Intl.Segmenter` 会导致 TUI 毫无诊断信息地终止（#11747）。
6. **资源增长与长会话持久性。** #11724 报告 Windows 上出现 7 GB 内存占用，CLI 被强制中断且进度无法恢复，这与 #10953 中过时 Todo 计划的发现相呼应（计划冻结了 55m44s，而工作仍在推进）。
7. **CI 不稳定削弱贡献者信心。** 无关 PR 上消耗预算的 smoke test（#11736）、同一 commit 上 1.31%/0% diff 的非确定性视觉快照（#11465），以及 fail-open 契约守卫（#11728），给评审者带来了反复出现的噪声。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*