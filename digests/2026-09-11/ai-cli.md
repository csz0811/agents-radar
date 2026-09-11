# AI CLI 工具社区动态日报 2026-09-11

> 生成时间: 2026-09-11 00:31 UTC | 覆盖工具: 7 个

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

# 跨工具 AI CLI 社区对比 — 2026-09-11

## 1. 生态概览

AI CLI 格局正从单轮编码助手转向长时间运行的代理运行时，具备预算、权限、记忆、子代理和插件生态。发布节奏并不均衡：Qwen Code 发布了稳定的 CLI/SDK/桌面端套装，Claude Code 发布了稳定的网关定价版本，Codex 推进了 SDK/Rust/语音构建，Gemini 仍停留在 nightly，OpenCode/Pi 没有新版本发布，但 issue/PR 变动频繁。在各社区中，最强烈的共同关切是**用量/成本核算信任**、**会话持久性与可恢复性**、**MCP/插件正确性**、**沙箱/安全加固**和**Windows 一致性**。企业治理也在从配置文件转向托管策略、提供方限制和可审计的沙箱规则。

## 2. 活跃度对比

| 工具 | Issues（过去 24 小时） | PRs（过去 24 小时） | Discussions（过去 24 小时） | 发布状态 |
|---|---:|---:|---:|---|
| **Claude Code** | 10 个重点列出；总数未报告 | 3 个有更新 | N/A — 未提供 | v2.1.268 稳定版 |
| **OpenAI Codex** | 11 个重点列出；总数未报告 | 12 个重点列出 | 20 个活跃主题，分布于 Ideas/Q&A/Show & tell | python-v0.154.0；rust v0.155.0-alpha.2.3；voice CI 构建 |
| **Gemini CLI** | 10 个重点列出 + 3 个观察项；总数未报告 | 10 个重点列出 + 3 个值得注意项 | N/A — 未提供 | v0.61.0-nightly.20260910 |
| **GitHub Copilot CLI** | 36 个有更新 | 2 个有更新 | N/A — 未提供 | v1.0.84-4 预发布版 |
| **OpenCode** | 10 个重点列出；总数未报告 | 10 个重点列出 | N/A — 未提供 | 无新版本发布 |
| **Pi** | 50 个有更新 | 21 个有更新 | 4 个重点主题 | 无新版本发布 |
| **Qwen Code** | 10 个重点列出 + 值得注意项；总数未报告 | 10 个重点列出 + 4 个也在推进 | N/A — 未提供 | v0.23.3 稳定版；sdk-typescript v0.1.12；desktop v0.3.0 + 预览版；nightly |

> 注：“重点列出”表示摘要列出了这些条目，但未报告总数。“N/A — 未提供”表示摘要中未包含 Discussions 数据；这并不代表零活动。本集合中没有任何工具报告上游禁用了 Issues/PRs。

## 3. 共同功能方向

- **可信的用量、成本与缓存核算** — Claude Code（网关定价一致性、`budget.spent()` 少报 72 倍、提示缓存恢复失败）、Codex（配额耗尽元追踪器、容量错误、轮次指标 PR）、Copilot CLI（PRU 配额意外、凭据可见性）、OpenCode（token 用量显示、免费层不透明、计费摩擦）、Pi（Bedrock 缓存写入计费、`usage.input` 规范化）。用户日益将准确计量视为产品需求，而非遥测层面的润色。
- **撤销 / 回退 / 检查点 / 可恢复会话** — Codex 的 `/rewind` 讨论是数据集中得票最高的条目；Copilot CLI 报告压缩 OOM 和过期锁会永久卡死会话；OpenCode 的自动压缩可能丢失原始任务目标；Pi 在恢复时出现模型漂移；Qwen 的 VS Code 扩展会静默隐藏 0.23.x 之前的历史。共同诉求是确定性回滚、安全压缩和持久会话状态。
- **持久记忆、指令、技能与子代理控制** — Codex（`/learn`、Memories、实时重载 `AGENTS.md`）、Claude Code（Function Hooks、按代理配置、递归限制）、Gemini（技能/子代理使用不足、Auto Memory）、Pi（扩展系统提示词追加）、Qwen（结构化召回、Goal 预算）、Copilot CLI（组织代理、自定义代理 `target`）。社区希望记忆和规则成为一等公民、可编辑且感知生命周期。
- **MCP/插件/扩展生命周期正确性** — Codex（OAuth 刷新、插件排除）、Gemini（MCP 策略、400 工具上限）、Copilot CLI（OAuth 回调不匹配、规范无效的 `server/discover`、超时后工具被剥离）、OpenCode（V2 `event.subscribe` 不交付任何内容）、Claude Code（Function Hooks）、Pi（扩展提供方默认值）、Qwen（工作区范围扩展）。关键需求：规范合规、认证可靠性、会话中工具更新和企业策略执行。
- **沙箱、安全与企业治理** — Gemini（文件系统隔离、路径遍历、提示注入）、Codex（权限配置文件、托管模型提供方、沙箱路径上下文）、Copilot CLI（组织/企业 MCP 认证）、Claude Code（出站允许列表、网关访问控制）、OpenCode（托管提供方策略）、Qwen（确定性工具执行边界）、Pi（默认工具超时）。方向是默认拒绝（fail-closed）、路径规范化、托管配置和可审计性。
- **Windows 与跨平台一致性** — Claude Code（Cowork Plan9 被 KB5124008 破坏）、Codex（桌面发送按钮、WSL 沙箱、语音/OAuth）、Copilot CLI（插件更新锁、SSH/tmux 剪贴板、WSL2 ARM64）、Gemini（Wayland、NTFS 短名称）、Pi（Windows `shellPath` 被忽略）、Qwen（Windows MCP `-32000` 连接关闭）。Windows 仍然是最持续处于降级状态的平台。
- **TUI/输入人体工学达到专业编辑器预期** — Copilot CLI（vi/vim 模式关闭、Ctrl+Backspace、复制/粘贴）、OpenCode（垂直标签页、token 显示）、Pi（全屏滚动、光标标记泄漏）、Gemini（调整大小闪烁）、Claude Code（鼠标滚轮行为）、Qwen（TUI React 崩溃）。用户期望编辑器级键位绑定和稳定渲染。
- **多提供方兼容性与缓存** — OpenCode（Anthropic 缓存断点、OpenRouter 后缀、DeepSeek 错误）、Pi（Bedrock 推理强度、Gemini `thoughtSignature`、缓存键代理）、Qwen（DashScope `metadata` 400 错误、按模型选择 OpenAI API）、Codex（切换时的模型归因）、Claude Code（提示缓存读/写正确性）。提供方怪癖如今已成为首要的可靠性与成本问题。

## 4. 差异化分析

| 工具 | 功能重点 | 目标用户 | 技术路径 |
|---|---|---|---|
| **Claude Code** | 托管网关定价、Function Hooks、Cowork/云会话、子代理编排、插件可扩展性 | 使用托管 LLM 网关的团队与企业；插件作者 | Hooks/插件、托管设置、网关一致性、桌面/CLI 界面 |
| **OpenAI Codex** | 跨桌面/CLI/SDK 界面、配额/容量、沙箱/安全、记忆 RFC、MCP OAuth | Pro/Plus 个人用户、企业 IT、多设备开发者 | Python SDK + Rust alpha、托管提供方配置、平台加固全面梳理 |
| **Gemini CLI** | 沙箱加固、AST 感知工具、代理可观测性、Workspace 认证 | Google Cloud/Workspace 企业、重度 MCP 用户 | OS 级沙箱、路径防护、提示注入防御、nightly 发布 |
| **GitHub Copilot CLI** | 插件/指令/LSP CLI、组织代理、MCP 互操作、终端一致性 | GitHub 组织/企业、VS Code 用户 | GitHub 原生认证/插件、JSON 自动化、安全机器人，但会话/记忆脆弱 |
| **OpenCode** | TUI V2、提供方兼容性、存储、支付、托管策略 | 个人开发者、成本敏感/多提供方用户、插件作者 | SQLite 事件存储、递归 TUI 分组、提供方规范化修复、Console 策略 |
| **Pi** | 提供方传输核算、扩展/RPC、全屏 TUI、无头 SDK | 扩展作者、SDK/守护进程嵌入者、多提供方高级用户 | 极简核心 + RPC、扩展钩子、缓存/用量正确性、性能修复 |
| **Qwen Code** | 守护进程/Web Shell/桌面端、DashScope 路由、IDE 集成、Goal/记忆控制 | Qwen 生态用户、守护进程集成者、VS Code/Remote-SSH 用户 | 以守护进程为平台、工作区范围扩展、结构化记忆、桌面端整合 |

Claude Code、Codex 和 Copilot CLI 最接近企业就绪平台：托管设置、组织策略、MCP/插件界面和沙箱控制。Gemini 与 Qwen 正在加固企业认证和沙箱，同时快速迭代。OpenCode 和 Pi 更偏向生态/可扩展性，其中 Pi 强调稳定核心加外部 GUI，OpenCode 强调提供方广度、TUI 和存储可靠性。

## 5. 社区动能与成熟度

- **原始 issue/PR 吞吐量最高：** Pi（50 个 issue、21 个 PR）和 Copilot CLI（36 个 issue）显示出强劲的社区体量；Copilot 的 PR 数量异常低（2），表明其更多是在做 issue 分诊，而非以合并为主的迭代。
- **多通道活动强劲：** Codex 结合了 11 个重点 issue、12 个重点 PR 和 20 个活跃 Discussions 主题，表明其拥有广泛的桌面/CLI/SDK 社区。其第三方限额仪表盘和 HUD 是成熟度信号。
- **快速发布迭代：** Qwen Code 在同一窗口内发布了稳定版 CLI、SDK、桌面端、预览版和 nightly 制品。Codex 推进了 Python SDK、Rust alpha 和语音 CI。Gemini 发布了一个 nightly。Claude Code 发布了一个稳定的网关定价版本。
- **企业成熟度：** Claude Code、Copilot CLI 和 Codex 展现出最清晰的企业控制：托管网关/提供方、组织代理、MCP 策略、沙箱规则和面向审计的遥测。然而，这三者仍在配额、成本和 Windows 可靠性方面存在显著信任缺口。
- **生态建设阶段：** OpenCode 和 Pi 显示出插件 API 摩擦，但也有活跃的社区界面——桌面应用、提供方管理器、基于 RPC 的 GUI 和会话可视化。这表明采用已超出核心 CLI。
- **风险信号：** Copilot CLI 存在内存耗尽问题集群；Qwen 有大范围 Windows MCP 失败；Codex 存在配额/容量信任问题；Claude Code 存在陈旧机器人扰动和 Windows Cowork 回归。这些是最可能影响留存的领域。

## 6. 趋势信号

- **从编码助手到代理运行时：** 市场正围绕预算、权限、子代理、记忆、沙箱和插件 API 收敛。CLI 工具正在成为编排平台。
- **计量信任是差异化因素：** 准确的按轮次、按模型、感知缓存的用量核算如今已成为竞争性功能。用户会采用那些能够解释支出并可预测地执行限制的工具。
- **会话持久性成为新的可靠性门槛：** 撤销/回退、检查点、安全压缩和可恢复性不再是锦上添花；它们是长时间运行代理工作的基线期望。
- **MCP/插件正成为企业界面：** OAuth、策略执行、生命周期正确性和规范合规正从社区边缘案例转变为 IT 要求。
- **安全左移：** 提示注入、路径遍历、沙箱隔离和托管提供方限制是 Gemini、Codex、Copilot、Claude Code、OpenCode 和 Qwen 中活跃的 PR 主题。
- **Windows 一致性仍是采用障碍：** 插件更新锁、沙箱路径映射、MCP STDIO 失败、剪贴板问题和 WSL 边缘案例在几乎所有工具中反复出现。
- **多提供方缓存与路由是成本/性能杠杆：** 推理强度透传、缓存断点、路由修饰符和错误规范化正成为高级用户的必备能力。
- **外部可观测性/控制平面正在兴起：** 社区构建的用量计量器、会话地图、桌面界面和提供方管理器表明，市场需要稳定的 CLI 核心，配合丰富的外部 GUI 和 RPC API。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — 社区亮点报告
**来源：** github.com/anthropics/skills · **数据截至：** 2026-09-11

> **数据注意事项：** 数据集中的 PR 评论数返回为 `undefined`。因此下文的 PR 排名来自**代理信号** —— 带有活跃评论串的关联 issue 数量、每个技能相关 PR 的数量、更新近期程度，以及相关 issue 的 👍 数。基于 issue 的排名使用精确评论数。

---

## 1. 顶级 Skills 排名

| # | 技能 | 关键 PR | 功能 | 状态 |
|---|-------|---------|----------|--------|
| 1 | **skill-creator**（评估框架） | [#1298](https://github.com/anthropics/skills/pull/1298), [#1099](https://github.com/anthropics/skills/pull/1099), [#1050](https://github.com/anthropics/skills/pull/1050), [#539](https://github.com/anthropics/skills/pull/539) | 元技能，用于脚手架生成新的 Skills，并通过 `run_eval.py` / `run_loop.py` 自动优化其 `description` | 全部 **open** |
| 2 | **document-skills**（docx / pdf / typography） | [#514](https://github.com/anthropics/skills/pull/514), [#1734](https://github.com/anthropics/skills/pull/1734), [#541](https://github.com/anthropics/skills/pull/541), [#538](https://github.com/anthropics/skills/pull/538) | 排版 QC（孤行/寡行/编号）、孤立批注检测、OOXML `w:id` 冲突修复、区分大小写的引用修复 | 全部 **open** |
| 3 | **mcp-builder** | [#1742](https://github.com/anthropics/skills/pull/1742), [#1724](https://github.com/anthropics/skills/pull/1724), [#1602](https://github.com/anthropics/skills/pull/1602) | 脚手架生成并评估 MCP 服务器（Phase-4 测试框架） | 全部 **open** |
| 4 | **claude-api** | [#1607](https://github.com/anthropics/skills/pull/1607) | API 参考技能（模型、退役、使用指南） | **Open** |
| 5 | **推理 / 输出质量技能** | [#1367](https://github.com/anthropics/skills/pull/1367)（self-audit） | 机械式文件校验 + 四维推理质量门禁 | **Open** |
| 6 | **元分析器** | [#83](https://github.com/anthropics/skills/pull/83) | 面向市场的 `skill-quality-analyzer` + `skill-security-analyzer` | **Open** |
| 7 | **frontend-design** | [#210](https://github.com/anthropics/skills/pull/210) | 澄清前端设计指导，并使其可执行/连贯 | **Open** |

**讨论亮点**

- **skill-creator 是最热门的单一讨论串。** PR #1298 报告 *每个* description 的 `recall=0%` —— 这意味着 `run_loop.py` 和 `improve_description.py` 正在“对噪声做优化”。它交叉引用了 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 条评论，👍7），其中记录了 10+ 次独立复现。#1099 和 #1050 分别将同一症状追踪到 Windows 子进程/`PATHEXT` 和管道读取 bug —— 三位不同作者，同一根因。
- **document-skills 呈现出经典的“正确性债务”模式：** 四个小型且无争议的修复（大小写敏感、`w:id` 冲突、孤立批注检测、排版）一直未被合并。
- **mcp-builder** 存在叠加的故障链：过时的默认模型（[#1724](https://github.com/anthropics/skills/pull/1724)）、损坏的 `mcp>=2` 导入路径（[#1742](https://github.com/anthropics/skills/pull/1742)），以及面对任何真实服务器都得到 0/N 的评估框架（[#1390](https://github.com/anthropics/skills/issues/1390)）。
- **claude-api** 引发关注的原因是资源问题，而非正确性问题 —— Issue [#1487](https://github.com/anthropics/skills/issues/1487) 报告该技能会主动注入 **~156k tokens**，在单次工具调用中耗尽上下文窗口。

---

## 2. 社区需求趋势（来自 Issues）

| 需求方向 | 证据 | 信号强度 |
|---|---|---|
| **安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492)（43 条评论）—— 社区技能冒充 `anthropic/` 命名空间；[#1175](https://github.com/anthropics/skills/issues/1175) —— SKILL.md 内的 SharePoint 访问控制 | ⭐⭐⭐ 整个数据集中评论数最高 |
| **技能分发与共享** | [#228](https://github.com/anthropics/skills/issues/228)（16 条评论，👍8）—— 组织级技能共享；[#189](https://github.com/anthropics/skills/issues/189)（👍9）—— 重复的插件内容 | ⭐⭐⭐ 👍 支持最强 |
| **评估可靠性** | [#556](https://github.com/anthropics/skills/issues/556)（12，👍7）、[#1390](https://github.com/anthropics/skills/issues/1390) | ⭐⭐⭐ |
| **上下文/token 效率** | [#1487](https://github.com/anthropics/skills/issues/1487) —— 156k-token 注入；[#1329](https://github.com/anthropics/skills/issues/1329)（9 条评论）—— `compact-memory` 符号表示法 | ⭐⭐ 新兴 |
| **治理与质量门禁** | [#412](https://github.com/anthropics/skills/issues/412)（已关闭）—— agent-governance；[#1385](https://github.com/anthropics/skills/issues/1385) —— 三道门禁的推理流水线 | ⭐⭐ |
| **可移植性 / 平台** | [#29](https://github.com/anthropics/skills/issues/29) —— AWS Bedrock；[#16](https://github.com/anthropics/skills/issues/16) —— 将 Skills 暴露为 MCPs；[#62](https://github.com/anthropics/skills/issues/62)（10） | ⭐⭐ |
| **格式与工具链覆盖** | [#1362](https://github.com/anthropics/skills/issues/1362) —— pnpm ≥10 打包；ODT/ODS 支持 | ⭐ |

**值得注意：** #202（*skill-creator should follow best practice*，已关闭）和 #412（agent-governance，已关闭）表明维护者正在关闭设计层面的提案，同时保留 bug 类 issue 处于 open 状态。

---

## 3. 高潜力待处理 Skills

以下所有条目均处于 **open 且未合并**状态，按近期活跃度排序 —— 它们最有可能接下来落地。

1. **[#1734](https://github.com/anthropics/skills/pull/1734) — 孤立 docx 批注检测**（更新于 2026-09-10，本集合中最新的 open PR）。范围窄、可测试，随现有 docx 技能发布。
2. **[#1742](https://github.com/anthropics/skills/pull/1742) — mcp-builder `mcp>=2` 导入 + 自定义 headers**（更新于 2026-09-10）。明确 `Fixes #1668`；对任何使用当前 SDK 的人来说都是硬阻塞。
3. **[#1724](https://github.com/anthropics/skills/pull/1724) — mcp-builder 默认模型 → `claude-sonnet-5`**（更新于 2026-09-07）。diff 很小，关注度高。
4. **[#1627](https://github.com/anthropics/skills/pull/1627) — buffer-api 技能**（更新于 2026-09-05）。可移植的 GraphQL 调度技能，覆盖 Claude/Cursor/Codex。
5. **[#1607](https://github.com/anthropics/skills/pull/1607) — claude-api 已退役模型 ID**（更新于 2026-09-01，`Fixes #1603`）。纯粹是文档准确性问题。
6. **[#1628](https://github.com/anthropics/skills/pull/1628) — Hivemind 多智能体编排**（2026-08-24）。将机械性工作委派给免费的无头 worker；将 Claude Code 定位为唯一的规划者/审查者。
7. **[#1615](https://github.com/anthropics/skills/pull/1615) — scnet-hpc**（2026-08-24）和 **[#1367](https://github.com/anthropics/skills/pull/1367) — self-audit**（2026-07-02）：两个内容充实的领域技能，范围说明完整，等待维护者投入精力，而非作者继续迭代。
8. **[#514](https://github.com/anthropics/skills/pull/514) — document-typography**（2026-03-13）：价值最高的新独立技能提案；适用范围广，但推进缓慢。

---

## 4. Skills 生态洞察

> **社区的需求集中在让 Skills *可信且可度量*，而不是增加更多 Skills** —— 最响亮的讨论串围绕的是报告虚假 0% recall 的评估框架、命名空间级别的信任边界滥用、token 预算爆表以及分发机制，而不是新颖的 Skill 能力。

---

*方法说明：由于 PR 评论数不可用，排名使用代理关注度信号；所有给出的 PR 状态（open/closed）均直接取自数据集。top-20 列表中没有 PR 显示为已合并。*

---

# Claude Code 社区摘要 — 2026-09-11

## 1. 今日亮点

v2.1.268 发布，带来网关定价一致性：在 `gateway.yaml` 中设置 `pricing:` 后，已登录的 Claude Code 客户端现在会通过托管设置看到相同费率，因此 `/cost` 和遥测数据与支出计量器保持一致。社区最热话题仍是 **Function Hooks**（#91870，158 条评论，91 👍），维护者承诺将“以周为单位”推进发布。与此同时，一批 Windows Cowork 报告（#92984、#93118、#93071、#93221）将 Plan9 驱动器挂载损坏与 September Windows 更新 KB5124008 关联起来——卸载该 KB 是目前可行的临时解决方案。

## 2. 版本发布

**v2.1.268** ([releases](https://github.com/anthropics/claude-code/releases))
- 网关定价一致性：当 `gateway.yaml` 中设置了 `pricing:` 时，已登录的 Claude Code 客户端会通过托管设置收到相同费率，使 `/cost` 和遥测数据与支出计量器保持一致。
- 当 `access_control.allow_cidrs` 为空时，网关新增启动警告（源中说明被截断），引导运维人员设置显式允许列表。

## 3. 热门 Issue

1. **[#42776](https://github.com/anthropics/claude-code/issues/42776)** — *Windows 上桌面端因孤儿进程文件锁而无法重新启动* (170 条评论，82 👍)。这是本组中运行时间最长、评论最多的未解决 bug；至今仍被标记为 `[invalid]`，鉴于重新启动失败可复现，社区已多次对此提出反对。
2. **[#91870](https://github.com/anthropics/claude-code/issues/91870)** — *Function Hooks——让插件强大 10x* (158 条评论，91 👍)。最具价值的增强讨论串；维护者肯定了社区的设计反馈并给出发布时间线，使其成为旗舰级扩展性事项。
3. **[#92984](https://github.com/anthropics/claude-code/issues/92984)** — *Cowork（Windows）：安装 KB5124008 后所有 Plan9 共享均以“invalid argument”失败* (81 条评论，40 👍)。有复现；卸载该 KB 即可修复，说明这是 Claude Code 必须绕过的操作系统级回归。
4. **[#30112](https://github.com/anthropics/claude-code/issues/30112)** — *Cowork 网络出口允许列表以 403 阻止自定义域名* (57 条评论，54 👍)。已存在六个月，👍/评论比很高——对于在出口控制后运行 Cowork 的团队来说，这是一个无声的阻塞问题。
5. **[#76248](https://github.com/anthropics/claude-code/issues/76248)** — *Git 代理阻止所有推送；PAT 透传不再有效* (34 条评论，14 👍)。被报告为会话中途的行为变更；直接破坏智能体推送工作流和自带凭据（BYO-credential）预期。
6. **[#83510](https://github.com/anthropics/claude-code/issues/83510)** — *Claude 第 5 代出现可衡量的质量回退* (13 条评论，21 👍)。声称冗长度约为 2x、无意义内容检测变弱，以及未充分披露的降级回退（Fable 5 → Opus 4.8），并附有可复现的测量结果——这是列表中最为严谨的质量投诉。
7. **[#83048](https://github.com/anthropics/claude-code/issues/83048)** — *SEV-1：`budget.spent()` 报告值比实际消耗低 72x* (4 条评论)。成本控制故障，在 4 小时内烧掉了一周预算；评论数很少，但对任何要对配额做监测的人来说严重性极高。
8. **[#93490](https://github.com/anthropics/claude-code/issues/93490)** / **[#91971](https://github.com/anthropics/claude-code/issues/91971)** — *`--resume` 在静态前缀之后永远不会命中提示缓存*。两份报告收敛到同一机制：会话启动上下文被作为纯字符串而非内容块重放，因此缓存写入付费却从未被读取。与 [#83913](https://github.com/anthropics/claude-code/issues/83913) 相关（hook `additionalContext` 使缓存失效）。
9. **[#92183](https://github.com/anthropics/claude-code/issues/92183)** — *桌面端不允许 SendMessage，因此无法向子智能体发消息或恢复它们* (6 条评论，18 👍)。特别破坏了桌面端 Code 标签页中的智能体编排循环，而在那里子智能体原本可以正常启动。
10. **[#82565](https://github.com/anthropics/claude-code/issues/82565)** — *通用子智能体递归生成：请求 3 个 → 运行了 24 个* (1 条评论)。浪费了 80% 的 token，并在约 20 分钟内耗尽月度支出限额；这是缺失递归/深度防护的最清楚例证。

## 4. 关键 PR 进展

过去 24h 内仅有 **3 个拉取请求** 有更新（与报告的总数一致），因此本节覆盖全部内容，而非 10 项。

1. **[#93452](https://github.com/anthropics/claude-code/pull/93452)** (OPEN, poteat) — *mods/diff：匹配内置 /diff 面板。* 使 `/diff` mod 的窗格与内置面板对齐：通过引擎的代码元素绘制 hunks、使用内置关闭 ✕、匹配行距和空状态位置、处理窄终端 resize，并且一次只进行一个仓库探测。
2. **[#93244](https://github.com/anthropics/claude-code/pull/93244)** (CLOSED, poteat) — *mods：API 重命名、遥测修复和 diff 后端接缝。* 延续插件 API 命名调整（`isFocused`、`tool`），收紧遥测（逐行 analytics 开关读取，对第三方提供商不发送数据），并引入后端接缝，以 git 作为内置实现，以便其他 VCS 后端接入。
3. **[#89404](https://github.com/anthropics/claude-code/pull/89404)** (OPEN, bcherny) — *validate-agent.sh：不要在第一个警告处中止，并停止误报有效 agent。* 修复 [#83803](https://github.com/anthropics/claude-code/issues/83803)；三个根因都是 `set -euo pipefail` 与 `((warning_count++))` 算术的交互，导致 plugin-dev skill 的验证器在其自身 agent 文件上失败。这提醒我们，仓库工具现在已成为真正的插件编写界面。

## 5. 热门讨论

此数据集中未提供 GitHub Discussions 数据——本节省略。

## 6. 功能请求趋势

- **更深入的插件/hook 扩展性**——Function Hooks（#91870）是头条；diff-mod PR（#93452、#93244）和 worktree-hook bug（#79872）表明，人们需要能在会话/worktree 生命周期事件上触发、而不仅仅是工具调用时触发的 hook。
- **按 agent 配置**——#66402：`/model` 和 `/effort` 会全局写入 `~/.claude/settings.json`，目前没有受支持的方式让一组实例使用各自独立的 model/effort 设置运行。
- **对子智能体的程序化控制**——#92183（向子智能体发消息/恢复）和 #82565（递归限制）指向对显式生成深度、预算和生命周期 API 的请求。
- **托管/Cowork 会话中可配置的网络出口**——#30112 和 #34690 要求允许列表设置真正传播到会话代理 JWT 中。
- **透明、可信的成本核算**——网关定价一致性（v2.1.268）、`budget.spent()` 准确性以及提示缓存正确性，正汇聚成一个主题：“我需要信任这个计量器。”

## 7. 开发者痛点

- **Windows Cowork 因一次操作系统更新而受损。** KB5124008（26200.9445）在多个独立报告（#92984、#93118、#93071、#93221）中破坏 Plan9 共享——`device_bash` 失效，重启和应用更新都无济于事，唯一的修复方法是卸载该 KB。
- **提示缓存在恢复时静默失效，推高支出。** #93490、#91971 和 #83913 描述了在链式 `--resume` / 历史重建时，缓存写入付费却从未被读取；静态前缀缓存正常，对话尾部则从不命中。
- **计费和配额遥测与现实不符。** #83048（`budget.spent()` 低报 72x）、#80750（套餐额度仍有剩余却消耗 credits）、#86033（配额燃烧 15–20x）以及 #68773（29 次自动充值扣费，$661）——这是消费者版和 Max 套餐中长期存在的信任问题。
- **子智能体会不可预测地消耗 token。** 没有深度防护的递归生成（#82565）和仅支持全局的 model/effort 设置（#66402），使多实例运行的成本难以预测。
- **Cowork/云凭据边界正在收紧，却没有退出选项。** #76248（PAT 透传在会话中途停止工作）和 #30112（自定义域名被 403）都破坏了此前可用的工作流，且几乎没有提前通知。
- **TUI 和桌面端的打磨问题持续数月。** #12953（鼠标滚轮滚动输入历史而非聊天，21 👍，自 Dec 2025 起未关闭）、[#93489](https://github.com/anthropics/claude-code/issues/93489)（light/dark-ansi 主题渲染成白底白字）和 #42776（桌面端重新启动，自 April 起未关闭）显示出长尾 UX 债务。
- **陈旧机器人（stale-bot）的搅动掩盖了信号。** 多个实质性成本与插件 issue（#80750、#86033、#77927、#68773）被以 `stale` 关闭，迫使用户重新提交，并分散了讨论。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区文摘 — 2026-09-11

## 1. 今日亮点

本次发布活动以 Python SDK（`python-v0.154.0`）为核心，新增了 `max`/`ultra` 推理强度值，而 Rust 分支 `0.155.0-alpha.2.3` 则继续预发布迭代。问题追踪器上，关于配额异常消耗的跨报告元追踪器（#41220）以及 Pro/Plus 账户中一系列"所选模型已满容量"报告占据主导地位——容量与用量统计的可靠性显然是社区今日最关注的问题。与此同时，PR 队列显示出一次广泛的加固扫荡，涉及沙箱路径解析、AGENTS.md 指令重载、登录重定向安全以及 Windows 语音/OAuth 健壮性。

## 2. 发布

**python-v0.154.0** — Python SDK 发布，可通过 `pip install --upgrade openai-codex==0.154.0` 安装（Python 3.10+），捆绑匹配的 `openai-codex-cli-bin==0.154.0`。
- 新增 `max` 和 `ultra` 推理强度值（[#39662](https://github.com/openai/codex/pull/39662)）——为高计算任务扩展了强度上限。
- 在同步 API 接口中新增 `ExternalMessage`。

**voice-cygwin-108b38cf67cbb731** — 用于原生 Windows 语音发布的 CI 专用构建工具：`cygwin-build-inputs.tar.gz`（103 个固定版本的 Cygwin 二进制包加签名包索引）和 `cygwin-build-sources.tar`（83 个对应源码）。**不包含在用户包中。**

**rust-v0.155.0-alpha.2.3 / alpha.2 / alpha.1** — 预发布通道增量，无发布说明。

## 3. 热门 Issue

- **[#41220](https://github.com/openai/codex/issues/41220)** — *【元】Codex 用量/配额异常消耗及用量统计不一致*（35 条评论，13 👍）。这是一系列报告的整合追踪器，这些报告指出订阅配额或购买的额度消耗速度远超 token 证据所预测的水平。今日互动量最高的问题；实际上是社区的标准投诉帖。
- **[#40968](https://github.com/openai/codex/issues/40968)** — Windows Codex 桌面版：发送按钮无限旋转，提示词永远无法提交（34 条评论，6 👍）。一位 Windows 11 build 26200 上的 Pro x5 用户；长期存在且仍未解决，阻碍了 Win11 上的基本应用可用性。
- **[#40575](https://github.com/openai/codex/issues/40575)** — *【RFC】迈向自进化 Agent：交互式指令蒸馏（`/learn`）与 `AGENTS.md` 的规则代谢*（26 条评论）。提议增加 `/learn` 命令，将会话经验蒸馏为 `AGENTS.md` 的持久规则。强烈表明社区希望 agent 记忆成为一等公民且可编辑。
- **[#29639](https://github.com/openai/codex/issues/29639)** — Browser Use Node REPL 在 Windows 桌面版配合 WSL 工作区时因 `sandboxCwd` 未映射而失败（26 条评论，8 👍）。自六月以来一直开放；一个具体的跨平台沙箱路径 bug 反复出现，今天的路径上下文 PR 在主题上与之呼应。
- **[#43375](https://github.com/openai/codex/issues/43375)** — 多个 GPT-5/GPT-6 模型返回"所选模型已满容量"（20 条评论，11 👍）。证实该错误并非特定于某个模型——它横跨整个模型阵容，这使怀疑转向容量路由或账户级状态。
- **[#21803](https://github.com/openai/codex/issues/21803)** — 功能请求：Codex 项目与聊天的跨设备同步（37 👍，展示的最高原始点赞数）。双 Mac 工作流连续性；一个随着多设备（桌面 + Android + VS Code）使用增长而不断积累支持的老请求。
- **[#42683](https://github.com/openai/codex/issues/42683)** — *【已关闭】* Alt+P 快捷键在 Win10 上导致应用崩溃退出（15 条评论）。已关闭，但作为 Windows 应用不稳定性被分类处理的有用标记而收录。
- **[#37453](https://github.com/openai/codex/issues/37453)** — Windows 桌面版：恢复历史子代理线程会生成重复的 MCP 和 `node_repl` 进程栈（10 条评论）。与 MCP 生命周期/刷新处理及子代理相关的资源泄漏类 bug。
- **[#44401](https://github.com/openai/codex/issues/44401)** — Build 26.903.8094.0：app-server 队列阻塞插件和远程控制；重启后历史记录丢失（9 条评论）。一个较新且快速增长的报告，涵盖插件卡在"加载中…"、斜杠命令失败以及远程控制设备丢失。
- **[#36755](https://github.com/openai/codex/issues/36755)** — 技能加载器将瞬态 `EMFILE` 误标为"无效的 SKILL.md 文件"，且不重试（2 条评论，2 👍）。量低但质高：一个错误分类与弹性 bug，会在启动时静默丢弃技能。
- **[#44668](https://github.com/openai/codex/issues/44668)** — Astra 推理等级频繁从 X-High 重置为 Medium（约 5% 的回合）（2 条评论）。值得注意，因为 #39662 刚刚新增了 `max`/`ultra` 强度值——所选强度的持久性现在成了缺口。

## 4. 关键 PR 进展

- **[#44676](https://github.com/openai/codex/pull/44676)** — 使用显式执行主机路径上下文解析权限配置文件。确保权限路径遵循执行主机的约定/主目录，并且 glob 语法的目录名无法放松拒绝模式。与 WSL 对 Windows 沙箱不匹配问题（#29639）直接相关。
- **[#44675](https://github.com/openai/codex/pull/44675)** — 在模型请求边界刷新全局指令。修复了根线程保留启动指令的问题，因此对全局 `AGENTS.md` 的编辑现在会在会话中途生效——这是 #40575 中提出的 `/learn` 式工作流的前提条件。
- **[#44671](https://github.com/openai/codex/pull/44671)** — 在静音和音频积压期间保持语音会话活跃。丢弃过时/多余的音频缓冲区而非终止会话，并在静音时保持传出音频流动。
- **[#44670](https://github.com/openai/codex/pull/44670)** — 将登录设置重定向限制为已知平台来源。安全修复：查询字符串中的 `platform_url` 之前可以是任意目标，会在组织设置重定向中泄露 ID token。
- **[#44669](https://github.com/openai/codex/pull/44669)** — 使用显式路径上下文解析文件系统拒绝。与 #44676 对应的拒绝路径改动；还确保无效拒绝不会被静默跳过。
- **[#44658](https://github.com/openai/codex/pull/44658)** — 在辅助进程退出后保持 Windows 沙箱私有桌面存活。在调用进程中缓存私有桌面，使短命的沙箱包装器不再销毁可复用的桌面状态。
- **[#44656](https://github.com/openai/codex/pull/44656)** — 将回合指标归因于回合中实际使用的模型。解决了模型切换和多模型回合（包括压缩）后的用量误标问题——与 #41220 中的用量统计投诉直接相邻。
- **[#44655](https://github.com/openai/codex/pull/44655)** — 在运行时能力中遵循线程级插件排除。将 `disabled_plugin_ids` 应用于插件技能、推荐、hooks 和 MCP 服务器，而不改变共享插件状态；更改在下一个任务开始时激活。
- **[#44650](https://github.com/openai/codex/pull/44650)** — 强制执行受管模型提供商选择和定义。将 `model_provider`/`model_providers` 添加到受管要求中，必需选择覆盖本地和会话配置——一个企业/IT 控制原语。
- **[#44639](https://github.com/openai/codex/pull/44639)** — 阻止 Windows 离线沙箱的非环回入站流量。通过在现有出站阻止之外添加缺失的入站规则，完善了离线防火墙方案。
- **[#44636](https://github.com/openai/codex/pull/44636)** — 通过 OIDC 从 503 响应中恢复 OAuth 元数据发现。回退到签发者的 OIDC 元数据，使过期的 MCP OAuth token 仍可在 MCP 启动期间刷新。
- **[#44629](https://github.com/openai/codex/pull/44629)** — 为 MCP OAuth 登录添加手动回调输入。新的 `codex mcp login <name> --no-browser` 流程接受粘贴的重定向 URL，适用于无头/远程环境。

## 5. 热门讨论

### 想法
- **[#9618](https://github.com/openai/codex/discussions/9618)** — *怎么会没有 `/rewind` 或 `/revert` 功能？*（23 条评论，**131 👍**）。整个数据集中点赞数最高的单项；作者称没有撤销功能"几乎不可用"，与 OpenCode 和 Claude Code 相比处于劣势。
- **[#12567](https://github.com/openai/codex/discussions/12567)** — *Codex 中的记忆*（36 条评论）。OpenAI 维护者（jif-oai）就记忆引用 UX 以及记忆是否应对用户可见/可控征求意见。讨论区评论数最高。
- **[#44547](https://github.com/openai/codex/discussions/44547)** — *请立即移除桌面宠物*（1 👍）。明确要求彻底删除吉祥物/宠物功能，理由是压力和干扰。
- **[#44421](https://github.com/openai/codex/discussions/44421)** — 在长时间运行任务期间与 Codex 吉祥物进行持久轻量聊天。对立阵营：希望有一条侧信道来添加上下文或检查进度，而不打断 agent。
- **[#44419](https://github.com/openai/codex/discussions/44419)** — VS Code Codex 历史应分页显示超过 50 个本地会话。较旧的会话存在于同一状态数据库中，可从桌面版访问但在 VS Code 中不可达。

### 问答
- **[#43257](https://github.com/openai/codex/discussions/43257)** — 实验性上下文管理如何将历史查找计入使用限制？长时间多日任务加上上下文窗口滚动使计费语义不透明。
- **[#37960](https://github.com/openai/codex/discussions/37960)** — 跨不同供应商协调本地和远程编码 agent（Claude 系列本地、Codex/GPT 系列在 Linux VM 上、人工启动的会话）。多 agent、多供应商编排正在成为真实工作流。
- **[#42503](https://github.com/openai/codex/discussions/42503)** — 有 Astra 何时进入 Codex 的消息吗？指出尽管 OpenAI 9 月 1 日称"即将推出"，Astra 既不在公共 API 目录中，也不在 Codex 发布说明中。
- **[#40385](https://github.com/openai/codex/discussions/40385)** — Windows：找不到"控制其他设备"远程连接选项（6 👍）。远程连接是一个备受期待的功能；Windows 对等性是缺口。
- **[#41771](https://github.com/openai/codex/discussions/41771)** — 换工作后丢失了 Codex for Open Source 计划的批准邮件；询问能否重发。
- **[#41314](https://github.com/openai/codex/discussions/41314)** — 关于桌面宠物状态的问题（中文帖）。

### 展示分享
- **[#44641](https://github.com/openai/codex/discussions/44641)** — **Codex Limits**：跨平台 CLI/TUI，用于查看用量、重置时间和重置额度。
- **[#41157](https://github.com/openai/codex/discussions/41157)** — **CodexFuse 1.2.0**：本地 Windows 速率限制仪表板（已用/可用、下次重置、每小时用量），无需安装、无需 API key，支持 PT/EN。
- **[#44368](https://github.com/openai/codex/discussions/44368)** — **Usage HUD**：macOS 菜单栏计量器，涵盖 Codex + Claude + Gemini + Grok + Ollama，每个数字都带置信度标签。
- **[#44643](https://github.com/openai/codex/discussions/44643)** — **CoCo**：本地 Codex 协调器，将命名工作区绑定到跨终端/仓库的 Git worktree 和 Codex 对话。
- **[#44618](https://github.com/openai/codex/discussions/44618)** — **Wayfinder**：开源本地优先 macOS 应用，将 Codex/Claude Code 会话历史转化为航程地图。
- **[#44453](https://github.com/openai/codex/discussions/44453)** — 为什么 `OPENAI_BASE_URL` 不能重定向带有 `config.toml` 的 Codex，以及 **OrcaReplay**，一个无需模型调用即可重放会话的记录/重放工具。
- **[#44291](https://github.com/openai/codex/discussions/44291)** — **Brain Scanner**：托管工作区，连接项目图、记录的 agent 上下文和变更历史。
- **[#44638](https://github.com/openai/codex/discussions/44638)** — **Artifact Relay**：将 Codex 生成的 Markdown/HTML 报告自托管发布到私有浏览器查看器。
- **[#44453](https://github.com/openai/codex/discussions/44453)**、**[#40132](https://github.com/openai/codex/discussions/40132)** — 关于真实世界 Codex 项目和工作流的一般讨论帖。

## 6. 功能请求趋势

1. **用量可观测性成为一等能力。** 最强的涌现主题：一个元追踪器（#41220）、一个专门的容量错误集群（#43375、#43368、#44113、#44395、#44516、#44531），以及至少三个社区构建的限额仪表板（#41157、#44641、#44368）。用户希望在产品内呈现准确的、按回合、按模型的 token 统计。
2. **撤销 / 回退 / 检查点。** #9618 仍以巨大差距保持最高点赞讨论；没有与 Claude Code 或 OpenCode 的 revert 流程等价的功能。
3. **持久、自进化的记忆。** #40575（`/learn`、`AGENTS.md` 的规则代谢）、#12567（记忆）和 PR #44675（AGENTS.md 实时重载）汇聚于同一诉求：指令和习得规则应持久化并在会话中途更新，无需重启。
4. **跨设备连续性。** #21803（项目/聊天同步，37 👍）、#44556（Android 远程缺少聊天）和 #40002（Android 远程路径大小写敏感）描述了同一个未兑现的承诺：桌面 ↔ 移动 ↔ VS Code 状态应为一个项目。
5. **界面平静与可控性。** #44561（默认关闭 Astra " whimsy" 星星）、#44547（移除桌面宠物）、PR #44666（遵循系统减少动效）以及 #44668（强度等级重置）——用户希望视觉装饰和每会话设置保持不变且默认关闭。
6. **IDE/历史人体工学。** #44419（VS Code 分页超过 50 个会话）、#28833（面向用户的 `PermissionRequest` 批准信号）、#40282（每标签页 vs 全部标签页侧面板）。

## 7. 开发者痛点

- **配额和容量是主要的信任问题。** "Codex 烧光了我的全部限额"（#44673）、"用量比 CLI 高得天文数字"（#44459），以及 Pro 账户上所有模型的"所选模型已满容量"（#44516、#44531），与 #41220 的追踪器结合，形成了一种认知：统计既不可预测也不可解释——尤其是应用与 CLI 之间的分歧。
- **Windows 桌面版是最不稳定的平台。** 发送按钮永远挂起（#40968）、app-server 队列阻塞插件和远程控制（#44401）、恢复子代理线程时重复的 MCP/`node_repl` 进程栈（#37453）、来自 `SetNamedSecurityInfoW` 的沙箱锁失败（#36475）、Android 远程路径大小写敏感（#40002），以及 WSL 下 Browser Use Node REPL 的 `sandboxCwd` 失败（#29639）。
- **静默回退的设置。** 推理强度在聊天中途从 X-High 降至 Medium（#44668），以及尽管选择了 ChatGPT 模式语音会话仍以 Codex 启动（#44634），侵蚀了对配置层的信心。
- **MCP/插件生命周期边缘情况。** 工具列表变更在会话中途永远不会被拾取（#37417）、OAuth 刷新在 503 元数据响应上阻塞（#44636）、缺失的环境变量诊断被密钥脱敏吞没（#44654）。
- **启动和错误处理的脆弱性。** CLI 0.154.0 在 macOS 上通过 Homebrew 升级后启动挂起（#44471），以及瞬态 `EMFILE` 被报告为"无效 SKILL.md"且不重试（#36755）——两者都是假阴性错误，浪费用户调试时间。
- **支持和账户摩擦。** #41771（丢失开源批准邮件）和 #44030（个人 Plus 席位访问错误）显示了一条不可忽视的长尾问题，它们是流程问题而非代码问题。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-11

## 1. 今日亮点

新的 nightly（`v0.61.0-nightly.20260910.ged2ac40df`）已发布，但没有面向用户的发布说明。最活跃的讨论串仍然是 P1 的企业 Workspace 身份验证失败（#29101，42 条评论）以及一组针对文件系统隔离、路径遍历防护和提示注入防御的沙箱/安全加固 PR。智能体可靠性——挂起、误导性的终止状态以及子智能体使用不足——继续主导长期 issue 讨论。

## 2. 发布

- **v0.61.0-nightly.20260910.ged2ac40df** — 自动 nightly 版本号提升。除了版本提交外没有详细 changelog；发布 PR（#29268）是由 `gemini-cli-robot` 进行的例行版本号提升。
  - Diff：`v0.61.0-nightly.20260909...v0.61.0-nightly.20260910`（两个被引用的提交都带有 `ged2ac40df` 后缀）

## 3. 热门 Issue

1. **[#29101](https://github.com/google-gemini/gemini-cli/issues/29101) — 企业 Workspace 身份验证失败（P1，42 条评论，👍2）**  
   身份验证回归，阻止配置了 Cloud Project ID 的 Enterprise/Workspace 账户。该时间窗口内互动量最高的 issue；仍未关闭，尚未有修复落地。

2. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子智能体在 MAX_TURNS 后恢复却被报告为 GOAL 成功（P1，13 条评论）**  
   `codebase_investigator` 在耗尽回合预算且未执行工作后返回 `status: "success"` / `Termination Reason: "GOAL"`。误导性遥测掩盖了真实失败——对于任何基于智能体输出构建系统的人来说都是正确性问题。

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 通用智能体挂起（P1，8 条评论，👍8）**  
   任何委托给通用智能体的操作都会无限挂起，包括创建文件夹这类简单任务。社区高度认同（8 个 👍）且有明确的变通方法（禁止子智能体委托），使其成为首要可靠性阻塞项。

4. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖操作系统沙箱与执行后意图路由（P2，9 条评论）**  
   一项大型设计提案，旨在让 Gemini 3 安全地利用其原生 bash 亲和性（grep/cat/sed/awk）。直接影响当前一波沙箱 PR。

5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — 评估 AST 感知的文件读取、搜索与映射（P2，7 条评论）**  
   探索 AST 感知工具是否能减少错位读取和 token 噪声的 Epic。配套调研（#22746）建议以 tilth/glyph 作为起点。

6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 未充分利用 skills 和子智能体（P2，6 条评论）**  
   虽属轶事，但普遍有感：自定义 skills（`gradle`、`git`）只有在明确指示时才会被调用。这表明智能体循环中存在发现/提示方面的缺口。

7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — 确定性脱敏与减少 Auto Memory 日志记录（P2，5 条评论）**  
   密钥会在脱敏指令生效之前进入模型上下文，且 skill 日志可能保留敏感数据。这是记忆子系统中的隐私/安全问题。

8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 命令完成后卡在 "Waiting input"（P1，4 条评论，👍3）**  
   简单 shell 命令已完成，但 TUI 仍显示其处于活动状态并等待输入。频繁、可复现，且干扰工作流。

9. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) — Auto Memory 无限重试低信号会话（P2，4 条评论）**  
   被提取器跳过的会话从未标记为已处理，因此它们会永远反复出现——浪费后台工作并产生噪声。

10. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — 浏览器子智能体在 Wayland 上失败（P1，4 条评论）**  
    Linux/Wayland 用户遇到浏览器子智能体失败，报告为 `Termination Reason: GOAL`。这是 #22323 中“失败却显示成功”模式的又一实例。

*同样值得关注：* #22267（浏览器智能体忽略 `settings.json` 覆盖项）、#22232（浏览器智能体的会话接管/锁恢复）、#24246（工具超过 400 个时出现 400 错误）。

## 4. 关键 PR 进展

1. **[#29283](https://github.com/google-gemini/gemini-cli/pull/29283) — fix(sandbox): 改进文件系统隔离并隔离运行时状态**  
   收紧挂载边界，并在 Docker、Podman、runsc、LXC 和 macOS Seatbelt 上隔离运行时状态；配置以只读方式访问，运行时写入为临时性的。

2. **[#29282](https://github.com/google-gemini/gemini-cli/pull/29282) — fix(auth): 登录后持久化 OAuth 凭据**  
   在浏览器/用户代码登录后立即持久化凭据，以免用户反复被要求登录 Google。与 #29101 相关的身份验证痛点直接相关。

3. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214) — fix(sandbox): 加固文件系统边界并隔离运行时状态**  
   用经过清理的配置文件替代宿主机目录挂载，并在路径敏感性检查期间统一 realpath 解析（对不存在路径提供回退）。

4. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250) — fix(core): 防止通过构建文件与不受信任标志进行间接提示注入**  
   重构 `shell`、`edit` 和 `write_file` 执行路径，以在受限工作区模式下验证工作区边界和外部命令参数。

5. **[#29249](https://github.com/google-gemini/gemini-cli/pull/29249) — fix(core): 关闭 `get_internal_docs` 路径防护中的同级前缀绕过**  
   用感知组件边界的检查替代字符串前缀比较，关闭了一个允许将同级目录读入模型上下文的路径遍历漏洞。

6. **[#29200](https://github.com/google-gemini/gemini-cli/pull/29200) — fix(core): 在运行时一致地执行 MCP 策略**  
   使运行时 MCP 检查与 CLI 匹配语义保持一致；将显式为空的 `mcp.allowed` 列表视为故障关闭。对企业策略执行很重要。

7. **[#29116](https://github.com/google-gemini/gemini-cli/pull/29116) — fix(core): 缓解 NTFS 8.3 短文件名（SFN）路径遍历** *（已关闭）*  
   在路径规范化和 `AllowedPathChecker` 中处理 Windows 短名称（`git~1`、`env~1` 等），挫败基于 SFN 的黑名单绕过。

8. **[#29134](https://github.com/google-gemini/gemini-cli/pull/29134) — fix(cli): 保护当前会话不被删除**  
   通过 `--list-sessions` / `--delete-session` 传递活动会话 ID，并仅匹配短 ID 后缀，同时增加回归测试覆盖。

9. **[#29278](https://github.com/google-gemini/gemini-cli/pull/29278) / [#29277](https://github.com/google-gemini/gemini-cli/pull/29277) — 修复环境变量展开冲突**  
   针对 `expandEnvVars()` 使用 `__GCLI_EXPAND_TARGET__` 哨兵键、但该键可能被调用方环境遮蔽的两个并行修复——现在会选择无冲突的临时键。

10. **[#29094](https://github.com/google-gemini/gemini-cli/pull/29094) — fix: 将 simple-git 升级至 3.32.3（CVE-2026-28292）** *（已关闭）*  
    修复 Trivy 在核心依赖中标记的 CRITICAL 严重性漏洞。快速合并是依赖卫生的良好信号。

*同样值得注意：* #29098（`useInputHistoryStore` 中的纯 React 状态更新器）、#29097（GitHub URL 扩展解析器中的 `.git` 后缀解析）、#29268（nightly 版本号提升）。

## 5. 热门讨论

本数据集未提供 Discussions 数据，因此省略本节。

## 6. 功能请求趋势

- **智能体可观测性与诚实性：** 多个 issue 汇聚于同一主题——终止原因必须反映现实（#22323、#21983），子智能体轨迹应当可分享（#22598），并且 `/bug` 报告应包含子智能体上下文（#21763）。
- **AST 感知的代码库工具：** #22745 和 #22746 推动精确的方法边界读取、更好的 `codebase_investigator` 行为以及更低的 token 膨胀；#19561 提出“Tactful Extraction”，以 grep 优先进行精准发现。
- **智能体自主性与自我意识：** 请求 Gemini 主动使用 skills/子智能体（#21968）、准确描述自身的标志和快捷键（#21432），并避免破坏性的 git/数据库操作（#22672）。
- **沙箱与操作系统级安全：** #19873 提出零依赖操作系统沙箱，以安全利用模型的 bash 亲和性；当前一波 PR（#29283、#29214）实现了隔离层。
- **记忆/上下文节省：** Auto Memory 质量（#26516、#26523、#26522）和节省 token 的上下文管理（#19561）是反复出现的诉求。
- **企业与策略控制：** 具有故障关闭语义的大小写不敏感 MCP 允许列表（#29200）以及可靠的 Workspace 身份验证（#29101）反映了企业部署的增长。

## 7. 开发者痛点

- **挂起与卡死状态：** 通用智能体永远挂起（#21409），shell 会话在完成后显示 "Awaiting user input"（#25166），浏览器子智能体在 Wayland 上失败（#21983），Vite 脚手架因交互式提示而阻塞（#22465）。
- **误导性的成功信号：** 子智能体在达到 MAX_TURNS 后报告 `GOAL`/`success`，导致自动化流水线不可靠（#22323、#21983）。
- **企业身份验证摩擦：** Workspace + Cloud Project ID 登录完全损坏（#29101）；OAuth 凭据在登录后未持久化（#29282）。
- **配置未被遵守：** 浏览器智能体忽略 `settings.json` 覆盖项，例如 `maxTurns`（#22267）；`~/.gemini/agents/` 中符号链接的智能体文件被静默忽略（#20079）。
- **工具扩展限制：** 可用工具超过 400 个时出现 400 错误（#24246）——这对 MCP 密集型配置来说是真实上限。
- **工作区卫生：** 当限制为 shell 执行时，模型会在各目录中散落临时脚本（#23571）。
- **终端用户体验：** 调整大小时出现闪烁和性能问题（#21924）；`/compress` 摘要无法在会话恢复后持久保留（#21335）。
- **安全面：** 通过构建文件和标志进行提示注入（#29250）、路径防护绕过（#29249、#29116），以及 Auto Memory 中未脱敏的密钥（#26525）都在同一个 24 小时窗口内出现——这明确表明沙箱/身份验证加固是社区当前的首要工程优先级。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI — 社区摘要
**日期：2026-09-11** · 来源：[github/copilot-cli](https://github.com/github/copilot-cli)
*窗口：最近 24 小时 — 1 个版本发布，36 个 issue 更新，2 个 PR 更新*

---

## 1. 今日亮点

新的预发布版 **v1.0.84-4** 重塑了插件/扩展 CLI 命令面：`copilot instruction list` 和 `copilot lsp list` 取代了旧的 `plugins list --kind` 标志，`--json` 输出登陆 plugin/marketplace 命令，插件也获得了 `enable`/`disable`。与此同时，issue 跟踪器被一个**内存耗尽集群**主导——四份独立报告涉及 V8 堆 OOM、压缩崩溃循环，以及会话数据永久无法恢复。长期存在的 **vi/vim 输入模式请求（#13，76 👍）已关闭**，这是键盘/UX 对等性工作正在落地的最清晰信号。

---

## 2. 版本发布

### v1.0.84-4 ([发布](https://github.com/github/copilot-cli/releases))
**新增**
- `copilot instruction list` 和 `copilot lsp list` — 取代 `copilot plugins list --kind instruction` 和 `--kind lsp`（对脚本而言是破坏性的 CLI 命令面变更）。
- `copilot plugin list`、`copilot plugin marketplace list` 和 `copilot plugin marketplace browse` 上的 `--json` 标志 — 使插件工具可脚本化/对 CI 友好。
- `copilot plugin` 上的 `enable` 和 `disable` 子命令。

**要点：** 插件子系统正从带命名空间的标志提升为一等命令，并提供机器可读输出——对自动化很有用，但任何解析 `--kind` 输出的人都需要迁移。

---

## 3. 热门 Issue

1. **[#13 [CLOSED] CLI input should have a vi/vim input mode](https://github.com/github/copilot-cli/issues/13)** — 12 条评论 · **76 👍** · 创建于 2025-09-25
   本窗口内获赞最多的条目终于关闭。交互式提示符的模态编辑曾是最受关注的键盘驱动请求；约 1 年后关闭，表明 vim 键绑定已发布或已被取代。关注用户在实际使用中确认该行为。

2. **[#4095 [OPEN] Windows: plugin update fails with "Access is denied (os error 5)" while VS Code is running](https://github.com/github/copilot-cli/issues/4095)** — 3 条评论 · **21 👍** · area:platform-windows, area:plugins
   反应数最高的开放 bug：VS Code Copilot 扩展在 `installed-plugins` 上持有 watcher 句柄，因此 `copilot plugin update` 和桌面应用都会失败。这阻塞了 Windows 上整个插件更新路径。

3. **[#4742 [OPEN] Desktop app 1.1.15: cannot create a second Local (branch) session while one is running](https://github.com/github/copilot-cli/issues/4742)** — 11 条评论 · 5 👍 · triage
   `"This project already has an active Local workspace"` 在 1.1.15 自动更新后阻止并行分支会话。直接破坏多智能体/并行工作流；评论量表明影响范围很大。

4. **[#1285 [OPEN] Organisation-level Agent not showing up](https://github.com/github/copilot-cli/issues/1285)** — 9 条评论 · 11 👍 · area:agents, area:enterprise
   放在 `{org}/.github-private` 中的 Agent 永远不会在 CLI 或 VS Code 中显示。自 2 月以来持续存在——这是集中管理 agent 目录的企业采用阻塞项。

5. **[#4686 [OPEN] Node.js OOM crash after ~37 min — 31,965 leaked async libuv handles (SEA ignores NODE_OPTIONS)](https://github.com/github/copilot-cli/issues/4686)** — 3 条评论 · area:sessions
   技术上最精确的 OOM 报告：单可执行文件 Node 运行时中的句柄泄漏，而且没有规避手段，因为 `NODE_OPTIONS` 被忽略。为维护者提供了极佳的根因证据。

6. **[#4780 [OPEN] Session compaction OOMs and never completes, leaving the session permanently unresumable](https://github.com/github/copilot-cli/issues/4780)** — 1 条评论 · 3 👍 · triage
   压缩在约 4.3 GB 上限处进入崩溃循环；每次 `--resume` 都会重新触发。高严重性——它把瞬态内存问题变成永久的数据/工作丢失。

7. **[#4795 [OPEN] Atlassian MCP OAuth fails: callback URL mismatch (random port vs registered 33418)](https://github.com/github/copilot-cli/issues/4795)** — 2 条评论 · 2 👍 · triage
   在 WSL Ubuntu 的 1.0.83 和 1.0.84-3 上复现：CLI 使用临时重定向端口而非已注册端口，导致 OAuth 永远无法完成。对某个主要企业级 MCP 服务器而言是硬阻塞。

8. **[#4807 [OPEN] Idle Copilot CLI enters `FileWatch` event storm, consumes two CPU cores, and writes a 33+ GB log](https://github.com/github/copilot-cli/issues/4807)** — 0 条评论 · triage · 提交于 2026-09-10
   新出现且令人担忧：约 221% CPU 持续 35+ 小时，数十 GB 被拒绝的 file-watch 事件追加到调试日志。对长期运行或守护进程式部署存在磁盘/CPU 耗尽风险。

9. **[#3260 [OPEN] Copy/Paste broken in Copilot CLI via SSH inside tmux → Windows Server 2025](https://github.com/github/copilot-cli/issues/3260)** — 7 条评论 · 1 👍 · area:input-keyboard, area:platform-windows
   在 v1.0.47 中回归且仍开放。一份整理完善的跨场景复现矩阵表明这是系统性终端集成问题，而非一次性问题。

10. **[#2199 [OPEN] Add Ctrl+Backspace key combo to delete whole word](https://github.com/github/copilot-cli/issues/2199)** — 4 条评论 · 7 👍 · area:input-keyboard
    虽小但具有象征意义：社区不断要求标准编辑器肌肉记忆。随着 #13 关闭，这是键盘对等性的自然下一个候选。

*同样值得关注：* [#4809](https://github.com/github/copilot-cli/issues/4809)（在 `initialize` 之前调用非标准的 `server/discover`，违反 MCP 生命周期并使合规服务器崩溃）、[#4725](https://github.com/github/copilot-cli/issues/4725)（Linux 上频繁出现堆 OOM）、[#4699](https://github.com/github/copilot-cli/issues/4699)（长时间 `--resume` 时 OOM；崩溃转储写入用户的 cwd）、[#4805](https://github.com/github/copilot-cli/issues/4805)（陈旧的 `inuse.<pid>.lock` 使会话无法复活）。

---

## 4. 关键 PR 进展

最近 24 小时仅有 **2 个 pull request** 更新——PR 方面非常安静的一天。

1. **[#4808 [OPEN] Pin GitHub Actions to commit SHAs](https://github.com/github/copilot-cli/pull/4808)** — 作者：github-security-bot
   供应链加固：更改 4 个文件，发现 3 个 `uses:` 引用且全部 3 个固定到不可变 SHA，0 警告/错误。针对 CI 工作流可变标签被攻破的标准防御性实践。

2. **[#4786 [CLOSED] Revise notice regarding third-party services](https://github.com/github/copilot-cli/pull/4786)** — 作者：nkasuku
   仅文档变更：澄清通知中第三方服务的访问要求和条款。在窗口内关闭。

---

## 5. 热门讨论

*略过——本时间窗口未提供 Discussions 数据。*

---

## 6. 功能请求趋势

从最近 24 小时更新的所有 Issue 中提炼：

- **终端/编辑器级输入对等性** — vi/vim 模态模式（[#13](https://github.com/github/copilot-cli/issues/13)，已关闭）、Ctrl+Backspace 整词删除（[#2199](https://github.com/github/copilot-cli/issues/2199)）、通过 SSH/tmux 可靠复制/粘贴（[#3260](https://github.com/github/copilot-cli/issues/3260)）以及在 WSL2 ARM64 中可靠复制/粘贴（[#3534](https://github.com/github/copilot-cli/issues/3534)）。社区将 CLI 视为专业编辑器，并期望匹配的键绑定。
- **可脚本化的插件/扩展管理** — 处处支持 `--json`，一等公民 `instruction`/`lsp`/`enable`/`disable` 命令（v1.0.84-4），以及更新健壮性：安装失败后复用已下载的包而非重新下载（[#4799](https://github.com/github/copilot-cli/issues/4799)），并修复 Windows 更新锁定（[#4095](https://github.com/github/copilot-cli/issues/4095)）。
- **企业/组织级配置** — 组织 agent 无法从 `.github-private` 中显示（[#1285](https://github.com/github/copilot-cli/issues/1285)）、已记录但无效的自定义 agent `target` 属性（[#4806](https://github.com/github/copilot-cli/issues/4806)），以及 EMU/Entra audience 不匹配导致桌面应用中的 MCP 登录失败（[#4796](https://github.com/github/copilot-cli/issues/4796)）。
- **MCP 互操作性正确性** — 规范合规（在 `server/discover` 之前执行 `initialize`，[#4809](https://github.com/github/copilot-cli/issues/4809)）、OAuth 重定向端口注册（[#4795](https://github.com/github/copilot-cli/issues/4795)），以及取消调用后不会永久剥离工具（[#4731](https://github.com/github/copilot-cli/issues/4731)）。
- **真正能持久保存的配置** — `settings.json` 中的顶层 `model` 键在启动时被忽略（[#4067](https://github.com/github/copilot-cli/issues/4067)），并在退出时被启动时的值静默覆盖（[#4252](https://github.com/github/copilot-cli/issues/4252)）。
- **多账号切换**（[#367](https://github.com/github/copilot-cli/issues/367)，已关闭）— 无需手动重新认证即可管理个人/工作/承包商身份，仍是反复出现的诉求。

---

## 7. 开发者痛点

- **内存耗尽是 #1 稳定性主题。** 同一窗口内有四份独立的 OOM 报告：泄漏的 libuv 句柄（[#4686](https://github.com/github/copilot-cli/issues/4686)）、Linux 上泛化的 `heap out of memory`（[#4725](https://github.com/github/copilot-cli/issues/4725)）、长时间 `--resume` 期间 OOM 且转储污染用户工作目录（[#4699](https://github.com/github/copilot-cli/issues/4699)），以及永久损坏会话的压缩 OOM（[#4780](https://github.com/github/copilot-cli/issues/4780)）。值得注意的是，SEA 构建中忽略 `NODE_OPTIONS`，因此用户甚至无法提高堆上限。
- **会话生命周期脆弱。** 当排队消息在轮次结束时到达，会话可能永久卡住（[#4755](https://github.com/github/copilot-cli/issues/4755)）；因陈旧的 `inuse.<pid>.lock` 而无法复活（[#4805](https://github.com/github/copilot-cli/issues/4805)）；或在约 1 小时后静默丢失 assisted-permissions 模式（[#4764](https://github.com/github/copilot-cli/issues/4764)）。恢复通常需要杀掉进程或重新开始——用户丢失的是上下文，而不仅是时间。
- **MCP 集成是互操作方面最尖锐的边缘。** 无法完成的 OAuth 流程（[#4795](https://github.com/github/copilot-cli/issues/4795)）、会使合规服务器崩溃的非规范生命周期调用（[#4809](https://github.com/github/copilot-cli/issues/4809)），以及超时后在该进程生命周期内永久移除服务器工具（[#4731](https://github.com/github/copilot-cli/issues/4731)）。
- **Windows 仍是二等平台。** 插件更新被 VS Code watcher 句柄阻塞（[#4095](https://github.com/github/copilot-cli/issues/4095)）、通过 SSH/tmux 时剪贴板失败（[#3260](https://github.com/github/copilot-cli/issues/3260)）以及在 WSL2 ARM64 中失败（[#3534](https://github.com/github/copilot-cli/issues/3534)）。
- **桌面应用和 CLI 行为不同。** 桌面应用捆绑的 1.0.83 运行时及其自有 auth/session 层与独立 CLI 存在分歧——同一台机器上 MCP Entra 登录（[#4796](https://github.com/github/copilot-cli/issues/4796)）和 Local 工作区限制（[#4742](https://github.com/github/copilot-cli/issues/4742)）的差异使调试更困难。
- **凭据和配额意外。** 本地沙箱静默注入一个无关的缓存 fine-grained PAT，而不是活动的 `gh` OAuth 会话，并且无法看到选择了哪个凭据（[#4804](https://github.com/github/copilot-cli/issues/4804)）；另一位用户报告启用 Assisted Permissions 后 PRU 配额被清空（[#4802](https://github.com/github/copilot-cli/issues/4802)）。
- **失控的后台资源使用。** 空闲进程进入 `FileWatch` 风暴、占用约 221% CPU 并写出 33 GB 日志（[#4807](https://github.com/github/copilot-cli/issues/4807)），对任何将 Copilot CLI 作为长期存活 agent 运行的人来说都是严重问题。

---

*根据 2026-09-11 的 GitHub 活动生成。评论/反应计数反映生成时的快照；同日提交的 issue（#4802–#4810）没有太多时间积累社区信号。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区简报 — 2026-09-11

来源：`github.com/anomalyco/opencode`  
过去 24 小时内没有发布新版本。参与度最高的动态集中在 SQLite/事件表膨胀、计费/支付摩擦，以及 V2 TUI/提供商兼容性工作。

## 今日亮点
- 最关键的开放可靠性讨论仍是事件快照导致的 **`opencode.db` 无限制增长**，长期运行的实例已达到 13GB+ 并耗尽磁盘。
- 支付与订阅问题持续引发社区强烈反应，尤其是卡片被拒、加密货币支付和免费层使用限制。
- PR 方面，主要工作流是 **V2 TUI 递归分组**、**提供商/缓存兼容性修复** 和 **托管提供商策略**。

## 热门 Issue

1. **[#33356](https://github.com/anomalyco/opencode/issues/33356) — [2.0] `event` 表无限制增长**  
   开放，30 条评论，9 👍。由于 `message.updated.1` 快照从未被清理或压缩，`opencode.db` 达到 13GB+。这是长期运行实例最严重的可靠性问题之一；相关社区工具已在 [#41175](https://github.com/anomalyco/opencode/issues/41175) 中提出。

2. **[#15585](https://github.com/anomalyco/opencode/issues/15585) — 免费模型“free usage exceed”**  
   已关闭，55 条评论，17 👍。三个免费模型上的用户都遇到相同的配额错误，让用户困惑免费模型是否存在未公开限制。高评论量表明社区希望更清晰的配额提示和执行机制。

3. **[#23153](https://github.com/anomalyco/opencode/issues/23153) — 用加密货币支付 Go**  
   开放，21 条评论，50 👍。一个获得大量点赞的请求，希望 OpenCode Go 支持加密货币支付。它反映了更广泛的支付渠道受阻问题，尤其是在卡片支付失败的地区。

4. **[#36942](https://github.com/anomalyco/opencode/issues/36942) — 垂直标签页**  
   开放，15 条评论，31 👍。新 UI 强制使用水平标签页，使超过少数几个会话标题后就难以浏览。这是一个明确的 TUI/UX 生产力请求，支持度很高。

5. **[#13003](https://github.com/anomalyco/opencode/issues/13003) — 在 TUI 中显示 token 用量信息**  
   开放，13 条评论，53 👍。Token 用量在内部有跟踪，但没有清晰展示。这是样本中点赞最高的 Issue，反映了对成本/上下文可观测性的需求。

6. **[#45278](https://github.com/anomalyco/opencode/issues/45278) — 3 个月后支付被拒，尽管卡/银行没有问题**  
   开放，13 条评论，2 👍。一个反复出现的计费可靠性问题：之前可用的卡片在续费时突然失败。这直接影响订阅信任和留存。

7. **[#41358](https://github.com/anomalyco/opencode/issues/41358) — 自动压缩未经确认继续执行并丢失任务目标**  
   开放，8 条评论。在 Windows Desktop 上，长会话会自动压缩，agent 未经确认继续行动，随后忘记原始任务。这是一个高风险的 agent 连续性 bug。

8. **[#36826](https://github.com/anomalyco/opencode/issues/36826) — DeepSeek V4 Flash “Unexpected server error”**  
   开放，8 条评论，1 👍。在 VS Code 中，向 DeepSeek V4 Flash 发送提示词会因服务器错误而失败。此类提供商特定故障仍是反复出现的痛点。

9. **[#44788](https://github.com/anomalyco/opencode/issues/44788) — [2.0] `event.subscribe` 不传递任何事件；上下文钩子从未到达提示词**  
   开放，4 条评论，1 👍。V2 插件 API 无法按照文档机制传递事件或注入上下文。这阻碍了插件作者采用 V2，很可能是关键的生态阻塞项。

10. **[#48246](https://github.com/anomalyco/opencode/issues/48246) — 显式缓存断点仅应用于 Anthropic 系列模型**  
    开放，3 条评论。非 Anthropic 提供商完全依赖隐式前缀缓存，没有推进锚点。这对长 agent 会话的成本和延迟很重要。

## 关键 PR 进展

1. **[#48324](https://github.com/anomalyco/opencode/pull/48324) — feat(skill): 两层渐进式技能披露**  
   开放。增加渐进式技能披露，并改进自定义网关兼容性，包括 OpenAI Responses `gpt-5.*` 的 `textVerbosity` 处理。

2. **[#48117](https://github.com/anomalyco/opencode/pull/48117) — fix(provider): 解析 OpenRouter 路由修饰符后缀**  
   开放。处理模型 ID 中的 OpenRouter 请求时后缀，如 `:floor`、`:nitro`、`:exacto` 和 `:online`。

3. **[#48403](https://github.com/anomalyco/opencode/pull/48403) — feat(core): 强制执行托管提供商策略**  
   开放。在目录读取时，在已编写策略之后应用 Console 组织规则；与 OpenCode Console 工作配套。对团队/企业治理很重要。

4. **[#48376](https://github.com/anomalyco/opencode/pull/48376) — fix(ai): 规范化扁平 Responses 流错误**  
   已关闭。将扁平的 `code`、`message` 和 `param` 字段规范化为 SSE 和 WebSocket 响应共用的嵌套错误结构。提升网关兼容性。

5. **[#48397](https://github.com/anomalyco/opencode/pull/48397) — fix(core): 打破编译后提示词中的文件系统循环**  
   开放。解决原生/压缩后的 Bun 构建因提示词准备期间的文件系统/搜索循环而在首次提示时失败的问题。

6. **[#48399](https://github.com/anomalyco/opencode/pull/48399) — refactor(tui): 通过树引擎投影生产子组**  
   开放。将推理/探索分组经由通用树引擎路由，用于历史水合和实时追加。

7. **[#48394](https://github.com/anomalyco/opencode/pull/48394) — feat(tui): 添加递归分组树**  
   开放。在生产集成前添加可配置嵌套路径的纯分组引擎。

8. **[#48395](https://github.com/anomalyco/opencode/pull/48395) — feat(tui): 添加递归会话分组树**  
   开放。添加由每条目分组路径驱动的通用递归分组树，并为转录预算提供叶子计数缓存。

9. **[#23755](https://github.com/anomalyco/opencode/pull/23755) — fix: 在 Anthropic 转换中保留 thinking/redacted_thinking 块**  
   已关闭。修复 Anthropic API 错误：最新 assistant 消息中的 thinking 块被丢弃。

10. **[#41594](https://github.com/anomalyco/opencode/pull/41594) — fix(compaction): 在压缩期间遵循 agent variant 配置**  
    已关闭。使 `agent.compaction.variant` 生效，而不是硬编码从父用户消息继承。

## 功能请求趋势
- **TUI/UX 改进：** 垂直标签页、token 用量显示、Markdown 渲染、远程权限审批和递归分组持续被请求。
- **支付与账户生命周期：** 加密货币支付、卡片被拒修复、Go 订阅完成流程和符合 GDPR 的账户删除是反复出现的主题。
- **存储/保留控制：** 事件表压缩、快照增量、数据库大小限制和更安全的自动压缩主导了可靠性讨论。
- **提供商兼容性：** OpenRouter 路由修饰符、Anthropic 之外的显式缓存断点、DeepSeek `reasoning_content`、Anthropic thinking 块和 OpenAI Responses 错误规范化。
- **V2 插件/平台 API：** 事件传递、上下文钩子、托管提供商策略和文件系统快照重新设计是关键的生态诉求。
- **IDE/平台扩展：** Visual Studio 2026 支持和 GitLab API 可靠性仍在关注范围内。

## 开发者痛点
- **磁盘耗尽：** `event` 表无限制增长、13GB+ 的 SQLite 文件和 TUI `ENOSPC` 崩溃正在造成真实运营故障。
- **计费摩擦：** 卡片被拒、Go 订阅失败、没有加密货币选项以及无法自助删除账户，带来信任和支持负担。
- **免费层不透明：** 用户只有遇到“free usage exceed”才知道免费模型的使用限制。
- **压缩行为：** 自动压缩可能未经确认继续执行、丢失原始任务目标，并污染 JSONL 输出。
- **V2 插件 API 损坏：** 据报告 `event.subscribe` 和上下文钩子不传递任何内容，阻碍插件迁移。
- **提供商特定错误：** DeepSeek V4 Flash、Anthropic thinking 块、OpenRouter 后缀和非 Anthropic 缓存需要针对性修复。
- **TUI 打磨缺口：** 仅水平标签页、原始 Markdown 渲染和缺失 token 用量使长会话更难管理。
- **原生/编译构建回归：** Bun 原生构建可能在首次提示时失败，文件系统循环问题需要关注。

---

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-11

## 今日亮点

过去 24 小时内没有新版本发布，但 issue 和 PR 吞吐量依然很高（50 个 issue、21 个 PR 有更新）。主要主题是 **provider/transport 计费核算的正确性** — Bedrock 缓存写入计费、`usage.input` 归一化以及 OpenAI reasoning-effort 透传都引起了维护者关注。在 TUI 方面，光标标记泄漏和全屏渲染回归继续同时催生 bug 报告和相互竞争的修复。

## 版本发布

过去 24 小时内没有新版本发布。

## 热门 Issue

1. **[#9323 [CLOSED] Improve fireworks-specific config](https://github.com/earendil-works/pi/issues/9323)** — 今日评论最多（14 条评论）。这是一份针对 Fireworks 的 provider 特定配置处理的 bug 报告；讨论热度表明 provider 配置分层是反复出现的摩擦点。

2. **[#8061 [OPEN] [inprogress] Context budget ignores maxTokens output reservation](https://github.com/earendil-works/pi/issues/8061)** — 在 1M token 窗口约 78% 时请求被拒绝，而 compact-and-retry 恢复也因同样原因失败。这是一个高严重度的上下文管理 bug，因为自动安全网实际上无法恢复。

3. **[#9052 [OPEN] Fullscreen wheel scrolling is 3x slower than regular mode](https://github.com/earendil-works/pi/issues/9052)** — 4 个 👍 和 8 条评论。用户想要固定输入框的全屏模式，但滚动回归让它在长会话中不可用；这是旗舰 TUI 功能采用过程中的典型阻碍。

4. **[#8133 [CLOSED] Per-model compaction settings](https://github.com/earendil-works/pi/issues/8133)** — 5 个 👍。请求提供以 model id 为键、带全局回退的 `compaction.profiles` 映射。虽已关闭，但它明确体现出对模型感知的上下文预算、而非单一全局设置的需求。

5. **[#8810 [OPEN] [bug] Extension-registered providers ignore defaultProvider/defaultModel on fresh sessions](https://github.com/earendil-works/pi/issues/8810)** — 当通过 `pi.registerProvider()` 注册默认值时，会话会间歇性地以错误的 provider 启动。非确定性的扩展性 bug 会侵蚀对扩展 API 的信任。

6. **[#9294 [OPEN] [inprogress] claude-fable-5 allowedFallbackModels still lists claude-opus-4-8 (400)](https://github.com/earendil-works/pi/issues/9294)** — 内置回退元数据落后于上游 API 变更，导致每个请求都立刻硬失败。

7. **[#9276 [OPEN] [bug, inprogress] grep tool with context lines can cause OOM](https://github.com/earendil-works/pi/issues/9276)** — 堆耗尽可追溯到读取每个匹配项的周围上下文；对于在长期运行进程中作为 headless SDK 使用的 `pi-coding-agent` 至关重要。

8. **[#9265 [OPEN] O(n²) tool-call argument re-parsing in openai-completions streaming](https://github.com/earendil-works/pi/issues/9265)** — 在每个 delta 上重新解析完整累积的 argument JSON 会使嵌入式/多会话 daemon 中的事件循环冻结。值得注意的是，当天就开了一个修复 PR（#9461）。

9. **[#9331 [OPEN] [bug] Bedrock: OpenAI reasoning effort is never sent to the model](https://github.com/earendil-works/pi/issues/9331)** — 在 Bedrock 上，对 OpenAI 模型而言 thinking-level 变更会静默地变成 no-op，这是在做基准测试时发现的。静默的配置 no-op 是最糟糕的一类 provider bug。

10. **[#8752 [OPEN] bedrock-converse: usage.input not normalized across model families](https://github.com/earendil-works/pi/issues/8752)** — 5 个 👍。Anthropic 报告的是扣除缓存后的 `input` 净额，而 OpenAI 系列报告的是毛额，从而产生虚假的缓存未命中提示和翻倍的输入成本估算。再加上 [#9457](https://github.com/earendil-works/pi/issues/9457)（1h 缓存写入按 5m 费率计费），Bedrock 成本报告明显存在一组缺陷。

*同样值得关注：* [#9361](https://github.com/earendil-works/pi/issues/9361)（Windows 上 `shellPath` 被非确定性地忽略；回退到 WSL `bash.exe`）和 [#9460](https://github.com/earendil-works/pi/issues/9460)（bash 工具没有默认超时——一个忽略 SIGTERM 的子进程会让会话死锁）。

## 关键 PR 进展

1. **[#9461 [OPEN] fix(ai): defer streamed tool argument parsing until read](https://github.com/earendil-works/pi/pull/9461)** — 针对 #9265 的直接修复；按版本缓存解析结果，仅在访问时重新解析。作者标记其不够惯用，并正在征求评审——值得一看。

2. **[#9441 [OPEN] fix(tui): prevent cursor marker leaks](https://github.com/earendil-works/pi/pull/9441)** — 将 APC 光标标记视为位置元数据，而不是持久化样式，从而同时修复全屏拖拽选择损坏（#9332）和重复标记发出（#9257）。

3. **[#9442 [OPEN] fix(ai): allow prompt cache keys for compatible proxies](https://github.com/earendil-works/pi/pull/9442)** — 新增 `compat.supportsPromptCacheKey`，使 OpenAI 兼容代理可以选择在短保留期下接收 pi 的会话密钥。

4. **[#9459 [OPEN] fix(coding-agent): prefer recorded model changes on resume](https://github.com/earendil-works/pi/pull/9459)** — 恢复会话时使用最后记录的 `model_change`，而不是从最后一条 assistant 消息推断，修复恢复时的静默模型漂移。

5. **[#9434 [OPEN] feat(coding-agent): allow extensions to append to the session system prompt](https://github.com/earendil-works/pi/pull/9434)** — `session_start` 处理器现在可以返回仅追加的 `systemPromptAppend` 贡献，并带有来源元数据和错误隔离。这对扩展生态系统而言是一次有意义的能力提升。

6. **[#9431 [CLOSED] feat(agent): default 3 minute timeout for every tool call](https://github.com/earendil-works/pi/pull/9431)** — 为每个工具设定边界，而不只是 `bash`/`powershell`，解决 #9460 中报告的挂起工具死锁类问题。

7. **[#9297 [CLOSED] fix(ai): remove invalid Fable 5 fallback target](https://github.com/earendil-works/pi/pull/9297)** — 保持 Opus 5 作为 Claude Fable 5 的唯一内置回退；作者还在 models.dev 上开了一个咨询，讨论在上游建模回退，而不是硬编码。

8. **[#9443 [CLOSED] fix(ai): capture and replay Gemini thoughtSignature on openai-completions tool calls](https://github.com/earendil-works/pi/pull/9443)** — 位于 OpenAI 兼容网关后面的 Gemini 在每个响应上都会丢失 `thoughtSignature`；现在已接通重放路径。

9. **[#8744 [OPEN] feat(tui): add opt-in overlay selection exclusion](https://github.com/earendil-works/pi/pull/8744)** — 让全屏复制操作在 overlay 可见时仍可从 transcript `ScrollView` 获取内容。与 [#9438](https://github.com/earendil-works/pi/pull/9438) 相关，后者让 overlay 真正覆盖终端图像。

10. **[#8612 [OPEN] fix(coding-agent): clear delivered image-only queue entries](https://github.com/earendil-works/pi/pull/8612)** — 修复仅图像 steering/follow-up 消息的待处理计数不同步问题，并附带回归测试。

*快速提及：* [#9425](https://github.com/earendil-works/pi/pull/9425) 新增 DeepSeek V4.1 Flash；[#9416](https://github.com/earendil-works/pi/pull/9416) 允许技能名称中包含点/下划线，以实现跨 harness 兼容；[#9435](https://github.com/earendil-works/pi/pull/9435) 将值解析扩展到 provider `baseUrl`；[#9407](https://github.com/earendil-works/pi/pull/9407) 新增多选模型偏好守卫示例。

## 热门讨论

**问答**
- **[#3373 你最喜欢将哪些 plugins、add-ons 或 extensions 与 Pi agent 搭配使用？](https://github.com/earendil-works/pi/discussions/3373)** — 16 条评论，8 个 👍，仍是活跃度最高的社区帖。它可以很好地反映哪些扩展表面真正被使用。

**想法**
- **[#8420 从 DSH 插件生态到 pi：我们是否缺少一个官方 Web UI 基座？](https://github.com/earendil-works/pi/discussions/8420)** — 文章认为 DSH 的插件社区严重偏向 UI 插件（聊天、工作区面板、终端嵌入、状态栏），而 pi 的生态则偏向非 UI 扩展，并询问是否缺少一个官方 Web UI 基础。

**展示与分享**
- **[#9446 Phosphor —— 面向 pi 的桌面界面](https://github.com/earendil-works/pi/discussions/9446)** — 一个桌面应用，每个会话以 `pi --mode rpc` 方式运行，并将聊天、diff、文件、终端和 artifacts 并排展示；支持所有 pi provider，以及 Claude Pro/Max 和 ChatGPT 订阅。
- **[#9427 Pi Manager — 用于 providers、models 和写入 ~/.pi/agent 的本地 UI](https://github.com/earendil-works/pi/discussions/9427)** — 一个非 fork 的本地控制平面，用于添加 OpenAI 兼容中继、登录原生 provider、编辑 catalog/cycle 列表/thinking 映射，以及备份 agent 配置。

## 功能请求趋势

- **模型感知的上下文与压缩控制** — `compaction.profiles`（#8133）和感知 maxTokens 的预算（#8061）指向同一个方向：当用户混用 1M token 和小窗口模型时，全局上下文设置过于粗糙。
- **围绕稳定核心的外部 GUI** — 讨论 #8420、#9446、#9427 都围绕同一想法：保留 pi 极简核心和 RPC 模式，让社区构建 Web/桌面界面。预计会持续出现对受支持的 Web UI 基座、或至少更强 RPC 保证的诉求。
- **扩展可见的会话控制** — 系统提示词追加钩子（#9434）、overlay 选择行为（#8744）和 provider/model 默认解析（#8810）都在扩展扩展程序能够确定性影响的范围。
- **更安全的工具执行默认值** — 默认工具超时（#9431）和 grep 内存上限（#9276）反映出对在 headless/SDK 部署中仍然有效的护栏的需求。
- **会话树与工作流人体工学** — 分支删除（#5366）、尊重模型变更的恢复（#9459）和模型偏好守卫（#9407）表明用户正在操作大量长期会话，并希望获得更细粒度的生命周期控制。

## 开发者痛点

1. **Bedrock 上的成本与缓存核算不可靠。** [#8752](https://github.com/earendil-works/pi/issues/8752)（未归一化的 `usage.input`）、[#9457](https://github.com/earendil-works/pi/issues/9457)（1h 缓存写入按 5m 费率计费）和 [#9210](https://github.com/earendil-works/pi/issues/9210)（经网关时 `cacheWrite1h` 从未设置）构成一个缺陷簇。虚假的缓存未命中警告和被翻倍的估算会摧毁用户对用量报告的信任。
2. **内置目录和回退元数据落后于 provider。** [#9294](https://github.com/earendil-works/pi/issues/9294)、[#9394](https://github.com/earendil-works/pi/issues/9394) 和 [#8463](https://github.com/earendil-works/pi/issues/8463) 都源于硬编码模型，而上游已更改或移除这些模型。
3. **配置中的静默 no-op。** Bedrock OpenAI 模型上的 reasoning effort 被忽略（#9331）、无效 `--mode` 值被静默吞掉（[#9045](https://github.com/earendil-works/pi/issues/9045)），以及 Windows 上 `shellPath` 被忽略（#9361）。用户只有在生产环境中才会发现这些问题。
4. **全屏 TUI 渲染回归。** 光标标记泄漏（#9257、#9332）、滚动速度下降（#9052）、视口跳动（[#9424](https://github.com/earendil-works/pi/issues/9424)）以及图像/overlay 合成（#9438、#2374）表明全屏路径需要持续加固。
5. **Headless/嵌入式性能限制。** O(n²) 流式解析（#9265）、grep 上下文 OOM（#9276）和无限制的工具执行（#9460）恰恰在 pi 被采用的 SDK/daemon 用例中打击最重。
6. **受扩展影响的启动存在非确定性。** [#8810](https://github.com/earendil-works/pi/issues/8810) 和 [#9361](https://github.com/earendil-works/pi/issues/9361) 都描述了行为会因是否加载扩展而变化——这是用户最难复现或绕开的一类 bug。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-11

## 1. 今日亮点

Qwen Code 发布了 **v0.23.3**，以及配套的 TypeScript SDK（v0.1.12）和新的 **Desktop v0.3.0**（含一个预览版构建）；与此同时，发布流水线遇到了一次 flaky CI 失败，但很快被定位并修复。在 issue 跟踪器中，社区的注意力集中在 **VS Code 扩展会话历史回归**、**Windows MCP 连接失败**，以及 **daemon 扩缩容/配置限制**（每个 ACP 子进程的内存、硬编码的 25 个工作区上限）上。一个高优先级 bug（#11590）表明，请求中自动注入的 `metadata` 可能会让通过 DashScope OpenAI 兼容网关路由的非 Qwen 模型以 HTTP 400 失败。

---

## 2. 发版

| 版本 | 说明 |
| --- | --- |
| **v0.23.3** | 最新稳定版。无已知破坏性变更。头条功能：为 Kimi、Qwen 和 DeepSeek 扩展了推理预设（[#11349](https://github.com/QwenLM/qwen-code/pull/11349)）。发布任务最初在 `quality` 通道失败（[#11580](https://github.com/QwenLM/qwen-code/issues/11580)），已由 [#11588](https://github.com/QwenLM/qwen-code/pull/11588) 修复。 |
| **v0.23.3-nightly.20260910.c46cb85cf2** | Nightly 版。包含 `refactor(dingtalk)`：移除过时的后台响应聚合（[#11570](https://github.com/QwenLM/qwen-code/pull/11570)）以及一次破坏性的 `feat(channels)!` 清理。 |
| **sdk-typescript v0.1.12** | 捆绑 CLI 0.23.3（与 SDK 从同一 branch/ref 构建）。注意：发布说明中仍有过时的 CLI 0.23.2 引用。 |
| **desktop v0.3.0** | Desktop 打包已在 CI 中按计划演练（[#11519](https://github.com/QwenLM/qwen-code/pull/11519)）；修复 bridge 以保留待处理的权限/队列状态。 |
| **desktop v0.3.0-preview.0** | 仅预发布——`desktop-latest` 更新源仍指向 `0.2.2`，因此现有安装不会自动迁移。 |

---

## 3. 热门 Issue

1. **[#8102 — proposal(core): deterministic tool-execution boundaries for a trustworthy agent runtime](https://github.com/QwenLM/qwen-code/issues/8102)**（OPEN，P3，18 条评论）
   提议将 LLM 置于信任边界之外，由运行时确定性地约束、授权、观测和评估模型动作。这是跟踪器中被讨论最多的开放设计 issue——表明社区希望有正式的安全/agent 运行时模型，而不是临时审批。

2. **[#8182 — daemon authorises each ACP child 50% of host memory, never divided by child count](https://github.com/QwenLM/qwen-code/issues/8182)**（OPEN，P2，7 条评论）
   `getAcpMemoryArgs()` 根据**宿主机**内存推导 V8 old-space 上限并缓存它，因此 N 个子进程都以为自己独占一半的机器。这直接关系到任何使用多个工作区运行 `qwen serve` 的人。

3. **[#11386 — feat(serve): decouple registration from live runtimes (LRU live set)](https://github.com/QwenLM/qwen-code/issues/11386)**（CLOSED，P2，4 条评论）
   包含实测的 1/25/256 工作区容量基线，以及修订后的建议：空闲主机成本不足以证明必须把完整 LRU 作为硬性前提。对 daemon 运维人员很有用。

4. **[#8596 — Deprecate the Electron desktop app and rename desktop-shell to desktop](https://github.com/QwenLM/qwen-code/issues/8596)**（OPEN，6 条评论）和 **[#8092 — Build a lower-maintenance desktop app around Web Shell](https://github.com/QwenLM/qwen-code/issues/8092)**（OPEN，6 条评论）
   一组配对的路线图讨论：冻结 Electron 包，提升 Tauri shell，并复用 Web Shell 作为单一 UI 界面，以降低维护负担。

5. **[#11574 — VS Code extension hides all prior session history](https://github.com/QwenLM/qwen-code/issues/11574)**（OPEN，P2，5 条评论）和 **[#11489 — Extension update drops all conversation history (v0.21.x → v0.23.x)](https://github.com/QwenLM/qwen-code/issues/11489)**（CLOSED，P1，5 条评论）
   历史对话框硬编码了 `sourceType: "vscode"` 过滤器，但 0.23.x 之前写入的记录缺少该 metadata——因此升级会静默清空可见历史，尽管数据仍保存在 `state.vscdb` 中。这是一个高可见度的升级回归。

6. **[#9693 — MCP -32000 "Connection closed" at startup on Windows](https://github.com/QwenLM/qwen-code/issues/9693)**（OPEN，P2，5 条评论）、**[#11597](https://github.com/QwenLM/qwen-code/issues/11597)** 和 **[#11460](https://github.com/QwenLM/qwen-code/issues/11460)**（OPEN）
   一组 Windows STDIO 传输 MCP 失败，影响 filesystem/sequential-thinking 服务器，以及首次交互后 filesystem 挂起。这是当前单一报告量最高的平台缺陷族。

7. **[#11590 — 自动插入的 metadata 导致非 Qwen 模型 400](https://github.com/QwenLM/qwen-code/issues/11590)**（OPEN，**P1**，3 条评论）
   Qwen Code 在面向 DashScope 的 OpenAI 兼容端点时会注入一个顶层 `metadata` 对象；网关会将其转发给第三方后端（例如 ZHIPU/GLM-5.3-Flash），而后者的结构体期望 `metadata` 是字符串，于是产生硬 400，使这些模型完全不可用。删除该字段即可修复请求——这是一个影响面小但完全阻塞的 bug。

8. **[#11500 — TUI exits silently (uncaught React #185) when multiple background agents complete](https://github.com/QwenLM/qwen-code/issues/11500)**（OPEN，**P1**，3 条评论）
   当多个后台 agent 几乎同时完成时，Ink `useBoxMetrics` 布局监听器的 setState 循环会让交互式终端退出，且不渲染任何错误；恢复会话时会显示为“损坏”。

9. **[#11556 — vscode-ide-companion 0.23.1 cannot work under Remote-SSH](https://github.com/QwenLM/qwen-code/issues/11556)**（OPEN，**P1**，3 条评论）
   Webview 一直卡在加载状态：linux-x64 客户端连接 linux-arm64 远程服务器。这阻塞了常见的专业工作流（远程开发机）。

10. **[#11359 — docs(daemon): organize REST and SSE API documentation for integrators](https://github.com/QwenLM/qwen-code/issues/11359)**（OPEN，P3，5 条评论）和 **[#9316](https://github.com/QwenLM/qwen-code/issues/9316) / [#9304](https://github.com/QwenLM/qwen-code/issues/9304) — make `MAX_DAEMON_WORKSPACES=25` configurable**
    同一个“daemon 即平台”主题的两面：集成方希望有整合后的 API 文档，运维方希望工作区上限通过 `QWEN_SERVE_MAX_WORKSPACES` 暴露，而不是硬编码常量。

*其他值得关注：* [#10118 — Roadmap: split Live into a standalone voice app](https://github.com/QwenLM/qwen-code/issues/10118)、[#11579 — invalid model config surfaces as a generic internal error on daemon-backed UIs](https://github.com/QwenLM/qwen-code/issues/11579)、[#11353 — Windows WebTerminalRegistry holds exited PTY resources up to 15 minutes](https://github.com/QwenLM/qwen-code/issues/11353)、[#11554 — Feishu channel loses media/code/link context](https://github.com/QwenLM/qwen-code/issues/11554)。

---

## 4. 关键 PR 进展

1. **[#11588 — fix(ci): widen the review-salvage replay's timeline margin past contention stalls](https://github.com/QwenLM/qwen-code/pull/11588)** — 通过修复导致首次尝试卡住的 flaky `scripts` 通道 replay 测试，解除 v0.23.3 发布的阻塞。

2. **[#11538 — feat: select the OpenAI API per model](https://github.com/QwenLM/qwen-code/pull/11538)** — 为 OpenAI 兼容提供商增加按模型的 `api: "chat-completions" | "responses"`；补充了 #11596 中的修复，并让用户真正控制端点。

3. **[#11596 — fix(core): recover from rejected Responses encrypted reasoning](https://github.com/QwenLM/qwen-code/pull/11596)** — 在 HTTP 400 `invalid_encrypted_content` 时，使用可读的推理摘要重试一次，同时保留对话、工具调用和结果。

4. **[#11086 — feat(serve): scope extensions to workspace runtimes](https://github.com/QwenLM/qwen-code/pull/11086)** — 使扩展目录可按工作区运行时提供，并支持工作区限定的 daemon/SDK 访问以及 composer/`@` 菜单更新。这是多租户 daemon 使用的核心。

5. **[#11395 — fix(acp): preserve caller-owned mode after child reap](https://github.com/QwenLM/qwen-code/pull/11395)** — 在会话冷加载或恢复时，重新应用 daemon API 调用方的批准模式，避免 ACP 子进程拆除后发生静默的模式降级。

6. **[#10183 — feat(memory): add structured on-demand recall](https://github.com/QwenLM/qwen-code/pull/10183)** — 将受管的自动记忆从扁平的 prompt blob 演进为 push/pull 的 ref-title 树，外加专用 recall 工具。

7. **[#11457 — feat(goal): stop a Goal at a turn or an active-time budget](https://github.com/QwenLM/qwen-code/pull/11457)** — 在现有 token 预算之上增加 `model.goalMaxTurns` 和 `model.goalMaxActiveMinutes` 上限。

8. **[#11163 — feat(web-shell): manage git remotes from the workspace branch picker](https://github.com/QwenLM/qwen-code/pull/11163)** — 直接在工作区 git 弹出层中列出/添加/移除 remote（删除需两次点击确认）。

9. **[#10906 — feat(web-shell): show shell and monitor task output](https://github.com/QwenLM/qwen-code/pull/10906)** — 持久化 Monitor 的 stdout/stderr，并为任务详情面板暴露一个按 live-session-owner 限定范围、经过清理的 tail 端点。

10. **[#11531 — ci: add host-level cleanup for ECS runners](https://github.com/QwenLM/qwen-code/pull/11531)** 和 **[#11297 — fix(ci): retry a failed E2E checkout once after a workspace reset](https://github.com/QwenLM/qwen-code/pull/11297)**
    基础设施加固：版本化的主机维护包（Docker 清理、systemd timer、`/tmp` 保留 7 天），以及为自托管 E2E checkout 通道增加有界重试。

*其他有进展：* [#10347](https://github.com/QwenLM/qwen-code/pull/10347)（自动重试瞬态 `400 network error ... EOF`）、[#10237](https://github.com/QwenLM/qwen-code/pull/10237)（防止重复的 task-owner 派发）、[#8783](https://github.com/QwenLM/qwen-code/pull/8783)（从标题/回顾中排除 hook 上下文）、[#11531](https://github.com/QwenLM/qwen-code/pull/11531)、[#9305](https://github.com/QwenLM/qwen-code/pull/9305)（短 VP 内容底部对齐）。

---

## 5. 热门讨论

本数据集未提供 Discussions 数据；本节省略。

---

## 6. 功能请求趋势

- **可信 / 确定性的 agent 运行时** —— #8102 提出将信任边界移出模型（工具调用的授权、观测、评估），这是最活跃的设计讨论串。
- **Daemon 即平台** —— 可配置的工作区上限（`QWEN_SERVE_MAX_WORKSPACES`，#9304/#9316）、正确的按子进程内存预算（#8182）、工作区范围的扩展（#11086），以及面向集成方的整合 REST/SSE API 文档（#11359）。
- **桌面端整合** —— 退役 Electron 包，提升 Tauri shell，并基于 Web Shell 重建桌面体验（#8596、#8092、desktop v0.3.0 工作）。
- **IDE 集成深度** —— 跨升级的会话历史持久性（#11574、#11489、#11511）、Remote-SSH 支持（#11556），以及在 UI 中暴露完整的 "Max" 思考强度（#11514）。
- **Memory 与 Goal 控制** —— 结构化按需召回（#10183）以及 Goal 的轮次/活跃时间预算（#11457）。
- **Channel 功能对齐** —— 为 Feishu 提供更丰富的消息处理（#11554），并清理旧 channels/dingtalk 路径。
- **语音作为一等界面** —— 将 Live 拆分为适用于所有会话的独立语音入口（#10118）。

---

## 7. 开发者痛点

1. **Windows 上的 MCP 普遍不可用。** 多份独立报告（#9693、#11597、#11460、#9675、#10056）描述了 `-32000 Connection closed`、首次交互后挂起，以及工具报告“connected”但跨会话不可用。这是报告量最高的平台投诉。
2. **升级会静默破坏会话历史。** VS Code companion 按 `sourceType` 过滤的历史对话框（#11574/#11489）会让 0.23.x 之前的记录不可见——数据在磁盘上安全，但对用户而言实际已丢失。这会侵蚀日常用户的信任。
3. **Daemon 限制被硬编码且难以诊断。** 字面量 `MAX_DAEMON_WORKSPACES = 25`、基于宿主机 RAM 推导的按子进程内存上限（#8182），以及 `git status` 调用耗时约 1039 ms、而原始约 20 ms（#11591），都让 `qwen serve` 的扩缩容变得不透明。
4. **第三方 / 非 Qwen 模型会因路由特定怪癖而出问题。** 注入的 `metadata` 字段（#11590，P1）会让 DashScope 网关后的 GLM 及类似模型硬失败；模型配置拼写错误会在 daemon 支持的 UI 上表现为通用内部错误（#11579）。
5. **交互式 TUI 不稳定。** 并发后台 agent 完成时未捕获的 React #185（#11500）会终止会话且不输出错误——对于长时间运行的 agentic 工作来说，这是一种糟糕的失败模式。
6. **Flaky CI 对最终用户可见。** v0.23.3 发布的首次尝试因一个时序余量测试失败（#11580 → #11588），这是一个反复出现的模式，项目现在正通过系统性重试来应对（#11297、#11134、#11531）。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*