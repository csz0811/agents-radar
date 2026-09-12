# AI CLI 工具社区动态日报 2026-09-12

> 生成时间: 2026-09-12 00:36 UTC | 覆盖工具: 7 个

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

# 跨工具 AI CLI 生态对比 — 2026-09-12

## 1. 生态概览

AI CLI/编码代理生态正处于整合与加固阶段。核心 agentic 循环、插件和 MCP 支持如今已是基本门槛；竞争已转向平台边缘的可靠性——Windows、沙箱、网络和终端兼容性——以及会话/上下文正确性、成本护栏和企业治理。发布节奏出现分化：Claude Code 和 GitHub Copilot CLI 按稳定增量发布，而 OpenAI Codex、Gemini CLI 和 Qwen Code 通过 alpha/nightly 渠道迭代，OpenCode 则在稳定其 V2 beta。所有工具的社区参与度仍然很高，但维护者吞吐量和 PR 合并能力差异显著。

*注：下文中的“surfaced”计数是摘要列出的条目，而非全部 open issues/PRs。来源摘要不暴露完整仓库总数。“N/A”表示该渠道未在摘要中报告，而非其不活跃。同一个项目符号中的多个 PR 编号会分别计数。*

## 2. 活动对比

| 工具 | 摘要中出现的 Issue 数 | 摘要中出现的 PR 数 | 摘要中出现的讨论数 | 发布状态 |
|---|---:|---:|---:|---|
| **Claude Code** | 15（10 个热门 + 5 个值得关注） | 1 | N/A | **v2.1.269** 稳定版：`claude plugin eval`、`/output-style` |
| **OpenAI Codex** | 10 | 12 | 10 | 6 个 Rust alpha 标签；无实质性变更日志 |
| **Gemini CLI** | 11 | 13 | N/A | `v0.61.0-nightly`；无面向用户的变化 |
| **GitHub Copilot CLI** | 10 | 0 | N/A | **v1.0.84-5**：会话/记忆导入、shell 补全 |
| **OpenCode** | 12（10 个热门 + 2 个值得关注） | 15 | N/A | 无 |
| **Pi** | 16（10 个热门 + 6 个值得关注/已关闭） | 14 | N/A | 无 |
| **Qwen Code** | 10 | 10 | N/A | `v0.23.3-nightly`；破坏性 channels 变更 |

**关键活动解读：**
- **Codex** 摘要中呈现的活动组合最广：热门 Issue、12 个 PR 和 10 个讨论。
- **Claude Code** 展现出最强的单 Issue 互动——#42776 有 178 条评论——但只有一个 PR 有活动，表明相对于 Issue 数量，社区合并流水线较为薄弱。
- **Copilot CLI** 发布了一个版本，但该时间窗口内 PR 活动为零；其 Issue 队列仍围绕 MCP/认证/会话生命周期保持活跃。
- **OpenCode** 和 **Pi** 在 PR 吞吐量上非常活跃，主要围绕发布稳定化、Windows 修复和 provider/扩展基础设施。

## 3. 共同功能方向

多项需求在多个工具社区中反复出现：

- **会话连续性、回滚与记忆可移植性**
  - Codex：原生 `/rewind`/`/revert`（132 👍）。
  - OpenCode：撤销消息同时保留文件变更（#7963，12 👍）。
  - Copilot CLI：会话/记忆导入命令、跨会话上下文。
  - Qwen Code：将 rewind 锚定到稳定的 prompt 身份。
  - Claude Code：`.claude` 下项目本地、可共享的记忆（#25947，39 👍）。

- **MCP 生命周期、认证与作用域可靠性**
  - Claude Code：孤立的 stdio MCP 服务器、worktree 连接器重新注入、代理允许列表缺口。
  - Codex：浏览器控制认证失败、连接器认证检测。
  - Copilot CLI：resume 取消进行中的 stdio MCP、Atlassian OAuth 回调不匹配、`server/discover` 致命错误。
  - Qwen Code：Windows MCP `-32000 Connection closed`。
  - Gemini CLI：工具数量限制与大型 MCP 配置。

- **沙箱与权限 UX**
  - Gemini CLI：沙箱文件系统隔离、检查点路径穿越修复、执行后意图路由。
  - Qwen Code：面向 Linux 的 bwrap 内核沙箱、ConPTY 加固。
  - Codex：通过 app server 进行 Windows 沙箱设置。
  - Claude Code：Plan/只读模式下更少的权限中断。
  - Copilot CLI：辅助权限约 1 小时后过期。

- **Windows 对等性与可靠性**
  - Claude Code：孤立进程锁、MSIX 自动更新杀死正在运行的应用。
  - Codex：发送按钮挂起、浏览器/Computer Use 问题、沙箱设置、推理强度重置。
  - Copilot CLI：插件更新“Access is denied”、native-runtime 崩溃。
  - Pi：硬编码的 `C:\`、Store 别名、RPC 关闭崩溃、IME/Alt 键 bug。
  - Qwen Code：MCP STDIO 失败、孤立的 `conhost.exe`。

- **插件/技能标准与可扩展性**
  - Claude Code：`claude plugin eval`，用于评分、可复现的插件评估。
  - Codex：SKILL.md → Codex 插件转换器、插件/市场卫生。
  - OpenCode：支持 Agent Plugins 标准。
  - Copilot CLI：仅手动技能不可触达、AGENTS.md 发现边界。
  - Pi：围绕凭据持久化与重载语义的扩展 API 缺口。

- **浏览器/computer-use 集成**
  - Claude Code：VS Code 浏览器共享 API，以便 agent 验证 Web UI 变更。
  - Codex：浏览器扩展管理、API key 认证、原生应用访问。
  - Gemini CLI：浏览器子代理可靠性。
  - Qwen Code：基于 Playwright 的 Browser SDK。

- **成本、上下文与循环护栏**
  - Claude Code：advisor 工具使报告的上下文大小翻倍；自我检查无上限。
  - OpenCode：子代理无限循环、Copilot 旧版配额在一个 prompt 中耗尽。
  - Gemini CLI：`/compress` 未持久化、超过 128 个工具导致 400。
  - Pi：对多兆字节工具结果触发压缩误判。
  - Codex：大型本地历史记录降低桌面性能。

- **隐私、脱敏与治理**
  - Qwen Code：尽管 `logPrompts=false`，遥测仍导出完整 API 请求内容；原始工具错误文本泄露。
  - Gemini CLI：机密在 prompt 级脱敏之前进入模型上下文。
  - Claude Code：治理 hook 自我失效；自动记忆优先级高于项目指令。

## 4. 差异化分析

| 工具 | 主要焦点 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 插件生态、输出样式、远程/云端会话、治理/上下文核算 | Anthropic 生态团队、插件作者、企业治理 | 一等公民插件评估、Remote Control、记忆/上下文管理 |
| **OpenAI Codex** | Windows 对等性、原生 app-server、语音/TUI、回滚/还原 API | OpenAI/ChatGPT 高级用户、重度 Windows 团队 | Rust alpha 列车、app-server 架构、快速 API 现代化 |
| **Gemini CLI** | 安全边界、沙箱、AST 感知代码智能 | Google/企业、大型 MCP/工具用户 | OS/文件系统沙箱加固、策略执行、代码库映射 |
| **GitHub Copilot CLI** | GitHub/VS Code 集成、会话/记忆交换、组织策略 | GitHub Enterprise 开发者 | Copilot/VS Code 生态集成、企业认证与技能 |
| **OpenCode** | 多 provider 灵活性、V2 beta 稳定化、插件可移植性 | OSS 开发者、本地/多 provider 用户 | provider 无关打包、稳定 `@opencode/*`、Agent Plugins |
| **Pi** | Windows 一等支持、扩展 API、provider 广度 | 扩展作者、高级用户、非标准终端 | 平台抽象、Bedrock/Vertex/OpenAI 兼容修复、system-message 增量 |
| **Qwen Code** | Hooks 对等性、Linux 沙箱、浏览器自动化、隐私 | Qwen/企业、隐私敏感、Web 自动化用户 | bwrap 内核沙箱、Claude Code hook 契约对等、遥测脱敏 |

## 5. 社区势头与成熟度

- **原始互动量最高：** Claude Code。Issue #42776 有 178 条评论和 88 👍，tracker 显示有大量活跃 backlog。然而，只有一个 PR 有活动，表明社区报告速度可以快于维护者合并速度。
- **迭代最快：** OpenAI Codex。一天内六个 Rust alpha 标签、12 个 PR 和 10 个讨论，包括原生 `/rewind`（132 👍）这类高信号请求。发布说明较单薄，但速度很高。
- **稳定化势头强劲：** OpenCode 和 Pi。OpenCode 正在修复 V2 打包、签名、Docker 路径和 TUI 启动回归。Pi 正在集中处理 Windows shell 发现并推进 provider 兼容性。
- **安全/企业加固：** Gemini CLI 和 Qwen Code。两者都在大力投入沙箱边界、路径穿越修复、脱敏以及 CI/安全门禁。
- **企业集成伴随生命周期脆弱性：** GitHub Copilot CLI。该版本增加了有用的导入/补全功能，但 PR 活动为零且反复出现 MCP/认证/会话 bug，表明维护者注意力在别处或受到限制。
- **成熟度画像：** Claude Code、Copilot CLI 和 Gemini CLI 在范围与企业姿态上看起来更成熟，但背负长期可靠性债务。Codex、OpenCode、Pi 和 Qwen Code 迭代更快，PR 队列更可见，也有更多平台特定回归。

## 6. 趋势信号

1. **Agent 插件/技能标准正在形成。** Claude Code 的 `plugin eval`、Codex 的 SKILL.md 转换器、OpenCode 对 Agent Plugins 的支持，以及 Copilot 的 skills/AGENTS.md 工作，都指向可移植、CI 级的 agent 扩展。

2. **沙箱正在成为默认执行模型。** Gemini 的文件系统隔离、Qwen 的 bwrap 后端以及 Codex 的 Windows 沙箱设置，反映出从逐命令提示转向在强 OS 边界内原生执行。

3. **MCP 是关键基础设施——但依然脆弱。** 在 Claude、Codex、Copilot 和 Qwen 中，MCP 生命周期、OAuth、stdio 清理和连接器作用域都是反复出现的阻塞项。开发者应将 MCP 可靠性视为一等部署风险。

4. **会话状态与上下文核算是产品差异化因素。** 回退/还原、记忆可移植性、压缩持久化和准确用量报告几乎出现在每个社区中。做对这些的工具将赢得长期 agent 工作的信任。

5. **Windows 和非标准终端仍未得到充分服务。** Windows 桌面生命周期、shell 发现、IME、粘贴和修饰键处理造成不成比例的痛点。跨平台对等仍是重大机会。

6. **隐私与治理是企业阻塞项。** Qwen 的遥测脱敏问题和 Gemini 的 Auto Memory 顾虑表明，隐私开关必须可强制执行，而不能只是尽力而为。

7. **成本与循环护栏默认缺失。** 失控子代理、无上限自我调度、上下文膨胀以及单个 prompt 耗尽配额，表明用户需要熔断器、上限和更好的归因。

8. **多 provider 抽象是竞争轴。** OpenCode、Pi 和 Codex 都在处理 provider 路由、兼容代理、Bedrock/Vertex 支持和认证边界。供应商锁定正受到积极挑战。

9. **发布工程很重要。** V2 Docker 制品、Windows 签名、nightly 渠道和 alpha 标签正在消耗维护者时间。分发质量如今已成为开发者体验的一部分。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点 — 2026-09-12

> 注：所提供的 feed 中未填充 PR 评论数（`Comments: undefined`），因此下方排名依据 feed 的评论数排序，并结合更新时效性/影响力。除另有说明外，列出的所有 PR 均为 `OPEN`。

## 1. 顶尖 Skills 排名

| 排名 | Skill / PR | 功能 | 讨论亮点 | 状态 |
|---|---|---|---|---|
| 1 | [skill-creator: fix `run_eval.py` 0% recall](https://github.com/anthropics/skills/pull/1298) | 修复 `run_loop.py` 和 `improve_description.py` 使用的评估工具；修复 Windows 流读取、触发检测、并行 worker。 | 关键问题：每个描述都报告 `recall=0%`；描述优化在噪声上进行。引用 issue #556 和 10+ 次复现。 | OPEN，更新于 2026-09-11 |
| 2 | [Detect orphaned docx comments](https://github.com/anthropics/skills/pull/1734) | 扩展 DOCX skill 以检测孤立批注。 | 近期高关注度 PR；未提供摘要，但主题契合文档生命周期卫生。 | OPEN，更新于 2026-09-11 |
| 3 | [Add document-typography skill](https://github.com/anthropics/skills/pull/514) | 对生成文档进行排版质量控制。 | 防止孤词换行、寡行段落和编号错位；被定位为通用文档质量痛点。 | OPEN，更新于 2026-03-13 |
| 4 | [mcp-builder: support `mcp>=2` and custom headers](https://github.com/anthropics/skills/pull/1742) | 更新 MCP Builder，以适配 `streamable_http_client` 重命名和 header 配置变更。 | 修复 issue #1668；解决 `mcp>=2.0.0` 中的 SDK 漂移。 | OPEN，更新于 2026-09-11 |
| 5 | [Add `scnet-hpc` skill](https://github.com/anthropics/skills/pull/1615) | 通过基于 profile 的 SSH 和 Slurm 工作流操作 SCNet HPC 集群。 | 覆盖集群发现、Slurm 作业、模块、加速器、profile 刷新。 | OPEN，更新于 2026-08-24 |
| 6 | [pdf: correct case-sensitive file references](https://github.com/anthropics/skills/pull/538) | 修复 `SKILL.md` 链接，例如 `REFERENCE.md` → `reference.md` 和 `FORMS.md` → `forms.md`。 | 在区分大小写的文件系统上会出错；修复了 8 处不匹配。 | OPEN，更新于 2026-04-29 |
| 7 | [Add ODT skill](https://github.com/anthropics/skills/pull/486) | 创建 OpenDocument 文本、填充模板、将 ODT 解析为 HTML。 | 面向 `.odt`、`.ods`、`.odf`、LibreOffice/开源文档工作流。 | OPEN，更新于 2026-04-14 |
| 8 | [Improve frontend-design skill clarity](https://github.com/anthropics/skills/pull/210) | 修订 frontend-design Skill，以提高清晰度、可操作性和内部一致性。 | 聚焦于 Claude 能在单次对话中实际遵循的指令。 | OPEN，更新于 2026-03-07 |

## 2. 社区需求趋势

从 Issues feed 来看，最强烈的需求并不只是“更多 skills”，而是**可靠、安全且可管理的 Skill 基础设施**：

- **Skill 评估与触发可靠性** — [Issue #556](https://github.com/anthropics/skills/issues/556)、[Issue #202](https://github.com/anthropics/skills/issues/202)、[Issue #1390](https://github.com/anthropics/skills/issues/1390)。用户希望 `run_eval.py` 能真正触发 skills、产生有意义的 recall，并正确评估 MCP 服务器。
- **信任、安全与治理** — [Issue #492](https://github.com/anthropics/skills/issues/492) 有 43 条评论，并警告社区 skills 冒充 `anthropic/` 命名空间。相关：[Issue #412](https://github.com/anthropics/skills/issues/412)、[Issue #1175](https://github.com/anthropics/skills/issues/1175)。
- **组织级共享与 marketplace 卫生** — [Issue #228](https://github.com/anthropics/skills/issues/228) 请求为团队提供共享 skill 库；[Issue #189](https://github.com/anthropics/skills/issues/189) 指出来自 `document-skills` 和 `example-skills` 的重复 skills。
- **上下文与 token 效率** — [Issue #1487](https://github.com/anthropics/skills/issues/1487) 报告 `claude-api` 会提前注入约 156k tokens；[Issue #1329](https://github.com/anthropics/skills/issues/1329) 提议用 `compact-memory` 表示符号化 agent 状态。
- **互操作性与可移植性** — [Issue #16](https://github.com/anthropics/skills/issues/16) 要求将 Skills 以 MCP 形式暴露；[Issue #29](https://github.com/anthropics/skills/issues/29) 要求支持 AWS Bedrock。
- **输出质量门禁与评审** — [Issue #1385](https://github.com/anthropics/skills/issues/1385) 提议校准、对抗性评审和交付验证；[Issue #1362](https://github.com/anthropics/skills/issues/1362) 强调 `web-artifacts-builder` 中构建/工具链的脆弱性。

## 3. 高潜力待处理 Skills

这些开放 PR 较新、关联 issue，或影响力足够高，因此很有可能很快落地：

| PR | 领域 | 为何重要 | 状态 |
|---|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 评估 | 修复影响整个描述优化循环的 0% recall 阻塞问题。 | OPEN，更新于 2026-09-11 |
| [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder 兼容性 | 解除 `mcp>=2` 用户的阻塞；直接修复 issue #1668。 | OPEN，更新于 2026-09-11 |
| [#1734](https://github.com/anthropics/skills/pull/1734) | DOCX 批注 | 为官方文档 skill 增加孤立批注检测。 | OPEN，更新于 2026-09-11 |
| [#1615](https://github.com/anthropics/skills/pull/1615) | HPC/Slurm 运维 | 将垂直企业/HPC 工作流带入 Skills。 | OPEN，更新于 2026-08-24 |
| [#1628](https://github.com/anthropics/skills/pull/1628) | 多智能体编排 | Hivemind 将机械性工作委托给 headless opencode worker；Claude Code 继续担任规划者/评审者。 | OPEN，更新于 2026-08-24 |
| [#1627](https://github.com/anthropics/skills/pull/1627) | Buffer GraphQL API | 用于社交排程与分析的可移植 Agent Skill。 | OPEN，更新于 2026-09-05 |
| [#1607](https://github.com/anthropics/skills/pull/1607) | claude-api 文档 | 正确标记已退役模型 ID；修复 issue #1603。 | OPEN，更新于 2026-09-01 |
| [#1602](https://github.com/anthropics/skills/pull/1602) | 评估/脚本稳定性 | 修复 MCP 序列化、基准指标、编码和跨平台稳定性。 | OPEN，更新于 2026-08-24 |

## 4. Skills 生态洞察

社区最集中的需求是**可信的 Skill 基础设施**——可靠的评估/触发、命名空间安全、上下文效率，以及团队级共享/治理——而不只是额外的一次性 Skills。

---

# Claude Code 社区摘要 — 2026-09-12

## 今日亮点

Anthropic 发布了 **v2.1.269**，引入 `claude plugin eval`，用于带评分、可复现的插件评估（JSON + HTML 报告），以及一个可在 Remote Control 和云会话中使用的 `/output-style [name]` 命令。Issue 流量主要由 macOS 上 Cowork/Desktop 网络回归、一批 Windows 桌面生命周期 bug，以及长期存在的治理/上下文核算抱怨所占据。值得注意的是，过去 24 小时内仅有一个 PR 有动态，这表明相对于 issue 积压而言，合并窗口相当冷清。

## 发布

**v2.1.269**
- 新增 `claude plugin eval` —— 针对 Claude Code 运行插件的 eval 套件，并提供带评分、可复现的结果（JSON + HTML 报告）。参见 `claude plugin eval --help`。
- 新增 `/output-style [name]`，用于列出和切换输出样式，包括通过 Remote Control 以及在云环境中。

*要点：* 插件作者现在拥有了一等公民般、可自动化的验证工具——这是朝着拥有 CI 级质量门禁的真正插件生态迈出的重要一步。

## 热门 Issue

1. **[#42776](https://github.com/anthropics/claude-code/issues/42776)** — *Windows 桌面版因孤立进程文件锁而无法重新启动*（OPEN，178 条评论，88 👍）
   这是跟踪器中互动量最高的单个 issue。一个已存在数月的 Windows 重启失败问题，尽管被标记为 `invalid`，仍在不断累积确认。社区的不满从 👍 数量中清晰可见。

2. **[#93507](https://github.com/anthropics/claude-code/issues/93507)** — *Cowork macOS：沙箱 VM 启动后没有网络路由；出站代理对所有域名返回 403*（OPEN，9 条评论，自 2026-09-10 23:15 UTC 起出现回归）
   一份新鲜、定位明确的回归报告，带有精确时间戳。由于在启用 "All domains" 时完全切断了出站连接，它实际上让 macOS 上的 Cowork 网络瘫痪。

3. **[#11897](https://github.com/anthropics/claude-code/issues/11897)** — *Web 版 Claude Code：即使启用 "All domains"，.NET SDK 二进制下载仍被代理拦截*（OPEN，21 条评论，25 👍）
   长期存在（自 2025 年 11 月起）且仍未解决。凸显了 "All domains" 开关与实际代理允许列表在工具链引导方面行为之间的系统性差距。

4. **[#57034](https://github.com/anthropics/claude-code/issues/57034)** — *支持 VS Code 的浏览器共享 API，以便 Claude 能验证 Web UI 改动*（OPEN，6 条评论，41 👍）
   看板上获赞最多的增强请求。直接解决了一个核心 agent 能力缺口：看不到浏览器的 agent 无法验证前端工作。

5. **[#25947](https://github.com/anthropics/claude-code/issues/25947)** — *将项目记忆文件存储在项目本地的 `.claude` 文件夹中*（OPEN，9 条评论，39 👍）
   长期存在、需求很高的请求。项目记忆目前位于 `~/.claude/projects/<encoded-path>/memory/` 下，这使其无法共享、无法纳入版本控制，队友也看不到。

6. **[#81620](https://github.com/anthropics/claude-code/issues/81620)** — *`advisor` 工具使报告的上下文大小翻倍，在真实窗口约 50% 时就触发自动压缩*（OPEN，5 条评论，4 👍）
   advisor 转发的 transcript 提示词被汇总到与主回合相同的 `usage` 块中，因此 Claude Code 认为上下文占用是实际的两倍。这会导致无声的质量与成本退化。

7. **[#93494](https://github.com/anthropics/claude-code/issues/93494)** — *Cowork macOS：会话中途所有出站连接丢失（桌面工作区 + 云容器）*（OPEN，有复现，5 条评论，4 👍）
   是 #93507 的姊妹问题。会话中途故障模式比冷启动失败更糟——它会让进行中的工作搁浅。

8. **[#93087](https://github.com/anthropics/claude-code/issues/93087)** — *会话结束时仍在连接的 Stdio MCP 服务器永不会被终止，并成为孤儿进程*（OPEN，有复现，macOS/VSCode，2 条评论）
   MCP 生命周期卫生问题。孤儿进程会跨会话累积——对任何运行大量短生命周期 agent 任务的人来说都是部署隐患。

9. **[#93722](https://github.com/anthropics/claude-code/issues/93722)** — *桌面 worktree 会话会重新加载每个 claude.ai 连接器；按项目的禁用列表不会跟随 worktree*（OPEN，macOS，area:mcp，1 条评论）
   新提交的。每会话一个 worktree 的隔离被连接器重新注入破坏，而 `deniedMcpServers` 完全无法抑制应用注入的连接器。

10. **[#78146](https://github.com/anthropics/claude-code/issues/78146)** — *Windows Bash 工具永久卡死：`CLAUDE_ENV_FILE` 每次压缩都会增长*（OPEN，有复现，2 条评论）
    一行被截断的 export（`line 182: e: command not found`，退出码 127）会永久破坏长会话中的每条 Bash 命令。环境变量无界累积，没有去重或截断。

*同样值得关注：* [#89992](https://github.com/anthropics/claude-code/issues/89992)（MSIX 自动更新会杀死正在运行的应用）、[#93738](https://github.com/anthropics/claude-code/issues/93738)（在 v2.1.269 上 `claude stop` 后会话恢复失败）、[#93607](https://github.com/anthropics/claude-code/issues/93607)（`pkill -f`/`pgrep -f` 匹配到工具自身的 wrapper）、[#93679](https://github.com/anthropics/claude-code/issues/93679)（Design 窗口渲染器增长到 2–4GB 并被 OOM 杀死）、[#93743](https://github.com/anthropics/claude-code/issues/93743)（非 ASCII 路径 slug 冲突，合并了无关项目的存储）。

## 关键 PR 进展

过去 24 小时内只有 **一个** pull request 有活动——鉴于有 50 个活跃 issue，这条流水线明显单薄。

1. **[#42205](https://github.com/anthropics/claude-code/pull/42205)** — `fix(hookify): normalize tool matcher parsing`（CLOSED，Balajitechlabs）
   在求值前修剪 matcher 字符串，并规范化每个 OR 段，修复了 `Edit | Write` 这类未修剪值导致比较失败的情况。改动虽小，但对依赖基于 matcher 的 hook 路由的人价值很高。

*观察：* 一个长期休眠的社区 PR 关闭，对于这种规模的积压来说吞吐量远远不够。活跃社区 PR 队列的缺席表明，贡献在很大程度上被限制在 issue 报告环节。

## 热门讨论

*源数据集中未提供讨论数据；本节省略。*

## 功能请求趋势

- **项目本地、可共享的状态** — [#25947](https://github.com/anthropics/claude-code/issues/25947)（39 👍）：记忆应位于 `<project>/.claude/memory/`，而不是全局的编码路径 slug。相关：[#93743](https://github.com/anthropics/claude-code/issues/93743)，其中非 ASCII 路径 slug 化会导致跨项目存储冲突。
- **更深入的 IDE/agent 集成** — [#57034](https://github.com/anthropics/claude-code/issues/57034)（41 👍）：采用 VS Code 的浏览器共享 API，使 agent 能读取 DOM、截图、控制台输出和导航，以自我验证 Web UI 改动。
- **只读模式下更少的权限中断** — [#80846](https://github.com/anthropics/claude-code/issues/80846)：Plan 模式仍会对每条只读 Bash 命令（`git log`、`jq`、`python3 -c`）弹出提示，且没有自动批准路径。
- **可强制执行的项目治理** — [#82184](https://github.com/anthropics/claude-code/issues/82184)：强制执行 hook 会自我中和，压缩会丢弃治理信息却保留叙述，而自动记忆的优先级高于项目指令。
- **UI 自定义 / statusline 控制** — [#93667](https://github.com/anthropics/claude-code/issues/93667)（6 👍）：在 v2.1.268 的页脚改动之后，将 IDE 选中指示器恢复到页脚，而不是内联在提示词中。
- **成本护栏** — [#77310](https://github.com/anthropics/claude-code/issues/77310)：反复进行的 PR 监视自检没有循环次数限制或成本上限，耗尽多天的使用预算。

## 开发者痛点

1. **Windows 桌面生命周期是最大的挫败来源。** 孤立的文件锁阻止重新启动（[#42776](https://github.com/anthropics/claude-code/issues/42776)，178 条评论）、MSIX 自动更新终止正在运行的应用（[#89992](https://github.com/anthropics/claude-code/issues/89992)），以及 Code 标签页消失（[#86576](https://github.com/anthropics/claude-code/issues/86576)），构成了一致的打包/进程管理缺陷模式。
2. **Cowork 沙箱网络回归速度快于修复速度。** 48 小时内两份几乎相同的 macOS 报告（[#93507](https://github.com/anthropics/claude-code/issues/93507)、[#93494](https://github.com/anthropics/claude-code/issues/93494)），加上已有一年之久的代理允许列表缺口（[#11897](https://github.com/anthropics/claude-code/issues/11897)），都指向同一个根本抱怨："All domains" 并不代表所有域名。
3. **上下文与成本核算不可信。** advisor 工具虚增的 `usage`（[#81620](https://github.com/anthropics/claude-code/issues/81620)）导致过早压缩；无上限的自调度循环（[#77310](https://github.com/anthropics/claude-code/issues/77310)）耗尽预算；防护机制对合法工作误报（[#86687](https://github.com/anthropics/claude-code/issues/86687)）。
4. **资源与进程清理是事后才考虑的。** 孤立的 stdio MCP 服务器（[#93087](https://github.com/anthropics/claude-code/issues/93087)）、Bash 环境变量无界增长（[#78146](https://github.com/anthropics/claude-code/issues/78146)），以及 Design 渲染器膨胀到 2–4GB（[#93679](https://github.com/anthropics/claude-code/issues/93679)）。
5. **MCP/连接器作用域不尊重项目边界。** worktree 会话会重新加载每个账户连接器，而且按项目的禁用列表既不跟随 worktree，也不响应 `deniedMcpServers`（[#93722](https://github.com/anthropics/claude-code/issues/93722)）。
6. **分诊透明度令人担忧。** 很大一部分条目被以 `stale` 或 `invalid` 关闭，而高票、可复现的 bug 却仍然开放——今天的列表即可见（[#42776](https://github.com/anthropics/claude-code/issues/42776)、[#86436](https://github.com/anthropics/claude-code/issues/86436)、[#86686](https://github.com/anthropics/claude-code/issues/86686)）。再加上只有一个 PR 的一天，这放大了社区信号超出维护者吞吐量的观感。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区简报 — 2026-09-12

## 1. 今日亮点
Windows 可靠性仍是主导主题：最热门问题涵盖桌面端发送按钮卡死、带 API-key 认证的浏览器控制、Computer Use 原生应用访问、沙箱设置失败以及聊天历史不同步。最强的社区信号仍是对原生 `/rewind`/`/revert` 支持的请求（[Discussion #9618](https://github.com/openai/codex/discussions/9618)，132 👍），而 PR 活动则将线程回滚推向更新的 API，并推进语音/TUI 工作。Rust alpha 发布节奏在过去 24 小时内也继续发布了六个 alpha 标签，不过发布说明仅包含版本字符串。

## 2. 发布
过去 24 小时内发布了六个 Rust alpha 版本：
- `rust-v0.155.0-alpha.3.10`、`.9`、`.8`、`.7`、`.3`
- `rust-v0.154.0-alpha.6.2`

除版本号提升外，未提供实质性变更日志。这表明是快速的 alpha 迭代，而非稳定功能发布。参见 [openai/codex releases](https://github.com/openai/codex/releases)。

## 3. 热门问题
- [Issue #40968](https://github.com/openai/codex/issues/40968) — **Windows Codex 桌面端发送按钮一直转圈**：在 Windows 11 上完全阻止后续提示；36 条评论和 6 👍 表明有活跃复现。高严重度的应用可用性错误。
- [Issue #44720](https://github.com/openai/codex/issues/44720) — **“ChatGPT hit a snag” 可复现的应用错误**：31 条评论和 5 👍 后快速关闭，表明高影响的崩溃/回归得到了迅速分诊。
- [Issue #20730](https://github.com/openai/codex/issues/20730) — **自定义 pets 因路径规范化在 WSL 中失败**：27 条评论和 30 👍，尽管这是一个较窄的功能，却使其成为最受赞同的活跃问题之一。
- [Issue #43410](https://github.com/openai/codex/issues/43410) — **Windows 浏览器控制在 API-key 认证下失败**：22 条评论和 13 👍。浏览器扩展可以连接，但 Codex 拒绝 `apikey` 认证用于浏览器操作。
- [Issue #18693](https://github.com/openai/codex/issues/18693) — **本地历史记录非常大时桌面端性能崩溃**：20 条评论和 9 👍。影响高级用户的输入、滚动、线程列表渲染以及随机退出。
- [Issue #42435](https://github.com/openai/codex/issues/42435) — **Windows 推理强度从 Extra High 重置为 Instant**：14 条评论。持续性的设置回归，削弱了对模型配置的信任。
- [Issue #43596](https://github.com/openai/codex/issues/43596) — **Windows Computer Use 无法访问原生应用**：应用清单为空且 sky RPC 不可用，破坏了 Computer Use 工作流；12 条评论。
- [Issue #44035](https://github.com/openai/codex/issues/44035) — **Windows 最近聊天历史消失，而 rollout 保留较新消息**：8 条评论。指向过期的 `read_thread` 状态与较新本地记录不一致。
- [Issue #44743](https://github.com/openai/codex/issues/44743) — **macOS 应用因循环导入出现空白窗口**：8 条评论和 4 👍。存在回滚变通方案，但这是一个关键的启动回归。
- [Issue #44398](https://github.com/openai/codex/issues/44398) — **Astra composer 闪烁动画阻止在 kitty 中用鼠标选择文本**：5 条评论和 8 👍。一个聚焦的 TUI 可访问性/终端兼容性烦扰，且社区强烈认同。

## 4. 关键 PR 进展
- [PR #44945](https://github.com/openai/codex/pull/44945) — **通过应用服务器路由 TUI Windows 沙箱设置**：处理提权和非提权设置、完成通知，并验证实际生效的沙箱模式。
- [PR #44939](https://github.com/openai/codex/pull/44939) — **在 Windows 沙箱设置中遵循执行主机**：防止 TUI 配置远程执行器的沙箱，并将设置就绪状态绑定到本地应用服务器。
- [PR #44944](https://github.com/openai/codex/pull/44944) — **对现有 app-server 线程强制执行托管提供商要求**：根据当前托管要求重新验证保留的模型提供商。
- [PR #25383](https://github.com/openai/codex/pull/25383) — **用于多账户配置文件切换的 App-server 账户会话生命周期**：为桌面端多账户支持添加 login/add/list/switch/logout 路由。
- [PR #44921](https://github.com/openai/codex/pull/44921) — **默认启用 TUI 语音对话**：将 `realtime_conversation` 提升为稳定版，并移除实验性公告。
- [PR #44922](https://github.com/openai/codex/pull/44922) — **在 Windows 发布版中捆绑原生语音运行时**：添加语音 helper/原生音频库以及用于实时 TLS 的 Windows 证书验证。
- [PR #44946](https://github.com/openai/codex/pull/44946), [PR #44935](https://github.com/openai/codex/pull/44935), [PR #44930](https://github.com/openai/codex/pull/44930) — **淘汰/移除 personality 选择**：移除 `/personality` TUI 流程，并在捆绑的 GPT-5.4/5.5 预设中嵌入固定的友好指令。
- [PR #44915](https://github.com/openai/codex/pull/44915) — **移除已弃用的 `thread/rollback` API**：删除旧的请求/响应类型和核心操作，引导客户端转向 `thread/revert`。
- [PR #44932](https://github.com/openai/codex/pull/44932) — **统一上下文快照并将请求分组为窗口**：通过一致地渲染追加项和边界窗口，改进请求历史检查。
- [PR #44938](https://github.com/openai/codex/pull/44938) — **在没有安装 URL 时检测连接器认证失败**：即使没有安装 URL，也能识别有效的认证失败元数据。

## 5. 热门讨论

### 想法
- [Discussion #9618](https://github.com/openai/codex/discussions/9618) — **原生 `/rewind` 或 `/revert` 功能**：23 条评论和 132 👍。社区将 Codex 的撤销支持与 OpenCode 和 Claude Code 相比，认为不如后者。
- [Discussion #41716](https://github.com/openai/codex/discussions/41716) — **ChatGPT Planner 与 Codex Worker 编排**：提议将 ChatGPT 作为持久规划者/项目负责人，将 Codex 实例作为执行工作者。
- [Discussion #44797](https://github.com/openai/codex/discussions/44797) — **一等公民的浏览器扩展管理**：请求 Codex 能打开扩展弹窗、调用操作、配置选项并管理权限。
- [Discussion #44792](https://github.com/openai/codex/discussions/44792) — **通用实时 Google 知识集成**：请求对 Drive 文件夹、Calendar 和 Keep 进行同步索引。
- [Discussion #27754](https://github.com/openai/codex/discussions/27754) — **AGENTS.md 可复用项目指南地图**：一个插件实验，用于生成紧凑的仓库本地操作地图。

### 综合
- [Discussion #40132](https://github.com/openai/codex/discussions/40132) — **你在用 Codex 构建什么？**：面向 Codex 新用户的工作流、项目和技巧的开放讨论帖。

### 展示与分享
- [Discussion #44453](https://github.com/openai/codex/discussions/44453) — **`OPENAI_BASE_URL` 在 `config.toml` 下的行为以及一个记录/回放工具**：解释了 origin 解析摩擦，并分享了 OrcaReplay。
- [Discussion #44643](https://github.com/openai/codex/discussions/44643) — **CoCo: Codex Coordinator**：跨终端和仓库组织并恢复并行 Codex 工作。
- [Discussion #44153](https://github.com/openai/codex/discussions/44153) — **isitdone Stop hook**：在工作树上的测试、类型检查和 lint 通过之前，阻止“完成”声明。
- [Discussion #44843](https://github.com/openai/codex/discussions/44843) — **SKILL.md → Codex 插件包转换器**：MIT、仅标准库的工具，用于将 Agent Skills 转换为 Codex 插件清单。

## 6. 功能请求趋势
- **撤销/回退/还原**：参与度最高的讨论要求一等公民的回滚，PR 将已弃用的 `thread/rollback` 替换为 `thread/revert`，进一步强化了这一需求。[#9618](https://github.com/openai/codex/discussions/9618)
- **跨设备会话/历史同步**：反复出现关于过期检查点、缺失线程、重复 ID 和账户范围项目的报告。[#29163](https://github.com/openai/codex/issues/29163), [#43017](https://github.com/openai/codex/issues/43017), [#43434](https://github.com/openai/codex/issues/43434), [#44035](https://github.com/openai/codex/issues/44035), [#44409](https://github.com/openai/codex/issues/44409)
- **Windows 对等性与可靠性**：沙箱设置、浏览器认证、Computer Use、应用卡死、推理强度持久化以及 execpolicy 误报仍然反复出现。[#40968](https://github.com/openai/codex/issues/40968), [#43410](https://github.com/openai/codex/issues/43410), [#43596](https://github.com/openai/codex/issues/43596), [#44783](https://github.com/openai/codex/issues/44783)
- **远程控制与编排**：用户希望 Windows 到 Windows 远程控制、移动端/桌面端一致性以及规划者/工作者编排。[#34028](https://github.com/openai/codex/issues/34028), [#41716](https://github.com/openai/codex/discussions/41716)
- **浏览器与计算机使用集成**：API-key 认证支持、原生应用清单、可信 RPC 可用性以及浏览器扩展管理是频繁的请求。[#43410](https://github.com/openai/codex/issues/43410), [#42745](https://github.com/openai/codex/issues/42745), [#44797](https://github.com/openai/codex/discussions/44797)
- **插件/技能/配置卫生**：项目级技能禁用、市场清理、AGENTS.md 地图和 SKILL.md 转换显示了对更好插件生命周期控制的需求。[#24237](https://github.com/openai/codex/issues/24237), [#39421](https://github.com/openai/codex/issues/39421), [#27754](https://github.com/openai/codex/discussions/27754)
- **CLI/TUI 可访问性与终端兼容性**：tmux 卡死、VoiceOver 回归、kitty 选择问题以及不正确的非交互式退出码仍然活跃。[#44767](https://github.com/openai/codex/issues/44767), [#44728](https://github.com/openai/codex/issues/44728), [#44398](https://github.com/openai/codex/issues/44398), [#15536](https://github.com/openai/codex/issues/15536)

## 7. 开发者痛点
- **Windows 仍是摩擦最高的平台**：沙箱创建、浏览器/Computer Use、认证方法、应用发送操作以及设置持久化都在产生活跃的错误报告。[#44783](https://github.com/openai/codex/issues/44783), [#40968](https://github.com/openai/codex/issues/40968), [#43410](https://github.com/openai/codex/issues/43410), [#29782](https://github.com/openai/codex/issues/29782), [#40060](https://github.com/openai/codex/issues/40060)
- **跨各端会话/历史状态不可靠**：用户报告最近轮次缺失、检查点过期、线程 ID 重复，以及历史与本地 rollout 数据不匹配。[#44035](https://github.com/openai/codex/issues/44035), [#44409](https://github.com/openai/codex/issues/44409), [#43017](https://github.com/openai/codex/issues/43017), [#43434](https://github.com/openai/codex/issues/43434)
- **超大对话历史会降低桌面端性能**：拥有少量超大本地线程的配置文件会拖慢输入、滚动和线程列表渲染。[#18693](https://github.com/openai/codex/issues/18693)
- **认证和提供商配置仍让用户意外**：API-key 认证可能破坏浏览器控制，且当 `config.toml` 存在时，`OPENAI_BASE_URL` 的行为不明确。[#43410](https://github.com/openai/codex/issues/43410), [#44453](https://github.com/openai/codex/discussions/44453)
- **CLI 正确性和终端兼容性需要关注**：`codex exec` 可能在命令失败后以 0 退出，TUI 回归影响 tmux、VoiceOver 和 kitty 选择。[#15536](https://github.com/openai/codex/issues/15536), [#43820](https://github.com/openai/codex/issues/43820), [#44767](https://github.com/openai/codex/issues/44767), [#44728](https://github.com/openai/codex/issues/44728)
- **插件/市场资源泄漏严重**：一份报告显示 41 天内产生了 559 GB 和 4,972 个孤立的暂存目录。[#39421](https://github.com/openai/codex/issues/39421)

---

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-12

## 1. 今日亮点

本周期以安全边界加固为主：沙箱文件系统隔离、checkpoint 路径遍历修复，以及 Windows `git diff --output` 参数校验补丁，均已在 PR 队列中落地或取得进展。智能体可靠性仍是社区首要抱怨，长期存在的“通用智能体挂起”(#21409) 和 MAX_TURNS 被误报为成功 (#22323) 问题仍是互动量最高的事项。仅发布了一个 nightly 版本，不含面向用户的变更。

## 2. 发布

**v0.61.0-nightly.20260911.ged2ac40df** — 自动 nightly 版本号提升 ([PR #29285](https://github.com/google-gemini/gemini-cli/pull/29285))。除版本号递增外无 changelog 条目；与前一 nightly 对比见[此处](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260910.ged2ac40df...v0.61.0-nightly.20260911.ged2ac40df)。

## 3. 热门 Issue

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子智能体 MAX_TURNS 被报告为 GOAL 成功** (p1, 13 条评论, 👍2)。`codebase_investigator` 在尚未进行任何分析前就触及轮次上限，却返回 `status: "success"` / `Termination Reason: "GOAL"`。这会静默破坏智能体遥测，并使评估结果不可信——本时间窗内评论数最多的问题。
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 通用智能体无限期挂起** (p1, 8 条评论, 👍8)。一旦发生委派，琐碎任务（例如创建文件夹）就会挂起长达一小时；避免使用子智能体是唯一的变通方法。列表中最高的 👍 数表明影响广泛。
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖 OS 沙箱 + 执行后意图路由** (p2, 9 条评论)。提议让 Gemini 3 对 bash 的原生亲和力在 OS 沙箱内自由发挥，而不是逐条命令提示——这是将下方多个沙箱 PR 串联起来的基础设计方向。
4. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 命令在完成后卡在 "Waiting input"** (p1, 4 条评论, 👍3)。CLI 在从未请求 stdin 的简单命令上挂起，阻塞多步骤工作流。
5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 很少在未被提示时调用技能/子智能体** (p2, 6 条评论)。用户报告即使对几乎相同的任务也需显式指令，削弱了可扩展性模型。
6. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — 浏览器子智能体在 Wayland 上失败** (p1)。报告失败却显示虚假的 "Termination Reason: GOAL"——与 #22323 属于同一类误导性状态。
7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory 的确定性脱敏** (p2, area/security)。机密在提示级脱敏运行之前就进入模型上下文，技能内容也会落入日志。一个真实的合规隐忧。
8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 工具数 >128 时出现 400 错误** (p2)。智能体无法智能裁剪工具范围，在大型 MCP/工具配置上硬失败。
9. **[#21335](https://github.com/google-gemini/gemini-cli/issues/21335) — `/compress` 在会话恢复后未持久化** (p2, 👍2)。压缩仅存在于内存中，因此恢复时 token 成本会再次出现——一个直接但极恼人的 bug。
10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — 劝阻破坏性智能体行为** (p2, 👍1)。在存在更安全路径时，智能体却会使用 `git reset`/`--force`；与正在进行的沙箱和政策工作相关。
11. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — AST 感知的文件读取、搜索和代码库映射** (p2 epic)。可减少错位读取和 token 噪声——待办事项中最明确的架构押注。

## 4. 关键 PR 进展

1. **[#29282](https://github.com/google-gemini/gemini-cli/pull/29282) — 登录后持久化 OAuth 凭据** (OPEN)。阻止 CLI 在成功完成浏览器/用户代码流程后再次提示 Google 登录。
2. **[#29283](https://github.com/google-gemini/gemini-cli/pull/29283) / [#29214](https://github.com/google-gemini/gemini-cli/pull/29214) — 加固沙箱文件系统边界** (CLOSED)。跨 Docker、Podman、runsc、LXC 和 macOS Seatbelt 提供只读配置访问以及临时运行时状态。
3. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250) — 阻止通过构建文件进行的间接提示注入** (CLOSED)。重构 `shell`、`edit` 和 `write_file`，以在受限模式下强制执行工作区边界校验。
4. **[#29184](https://github.com/google-gemini/gemini-cli/pull/29184) — 在 Windows 沙箱中校验 git 参数** (OPEN, p1/security)。修复一个静默截断漏洞：在非 YOLO 模式下，`git diff --output=<path>` 未经提示即可运行。
5. **[#29287](https://github.com/google-gemini/gemini-cli/pull/29287) — 将 `--yolo` 映射到 `allowedTools: ["*"]`** (CLOSED)。移除 `ApprovalMode.YOLO` 作为独立状态，统一策略处理（关闭 #11303）。
6. **[#29192](https://github.com/google-gemini/gemini-cli/pull/29192) — 遏制旧版原始标签 checkpoint 路径** (OPEN, p1/security)。修复 `/chat delete <tag>` 使用 `../` 删除 checkpoints 目录之外文件的问题。
7. **[#29195](https://github.com/google-gemini/gemini-cli/pull/29195) — 对非数组 checkpoint 历史降级处理而非崩溃** (OPEN)。`/resume` 不再对格式错误的 checkpoint 文件抛出原始 `TypeError`。
8. **[#29186](https://github.com/google-gemini/gemini-cli/pull/29186) — 修复沙箱拒绝启发式中的 `exitCode` 空值检查** (OPEN, fixes #29043)。`exitCode` 类型为 `number | null`，因此现有检查会在沙箱拒绝时误触发。
9. **[#29188](https://github.com/google-gemini/gemini-cli/pull/29188) — 在 `read-many-files` 中精确匹配 include 模式** (OPEN, p1)。替换子字符串匹配，此前会错误地将二进制资产视为被显式请求。
10. **[#29110](https://github.com/google-gemini/gemini-cli/pull/29110) — 通过 `FileSystemService` 路由 `read_file`** (CLOSED)。使声明 `fs.readTextFile` 的 ACP 客户端能真正提供读取服务，而不是访问本地磁盘。
11. **[#29208](https://github.com/google-gemini/gemini-cli/pull/29208) — 对格式错误的 `agents.json` 回退处理** (CLOSED)。防止因保存中断或手工编辑配置导致的 `TypeError` 崩溃。
12. **[#29190](https://github.com/google-gemini/gemini-cli/pull/29190) — 修复 VS Code companion disposables** (OPEN)。逗号运算符 bug 导致命令和工作区文件夹监听器在停用时未被释放。

## 5. 热门讨论

本时间窗未提供 Discussion 数据；本节省略。

## 6. 功能请求趋势

- **将沙箱化作为一等执行模型** — 多个讨论串（#19873、#29283、#29214、#29184）趋于一致：让模型在强 OS/文件系统隔离内原生使用 bash，而不是逐条命令提示。
- **AST 感知的代码智能** — #22745 和 #22746 推动基于 AST 的读取、搜索和代码库映射，以减少 `codebase_investigator` 的轮次和 token 噪声。
- **持久、耐用的状态** — #18836（用基于文件的 CRUD 替代上下文内 `WriteToDo`）和 #21335（`/compress` 持久化）都要求 CLI 不再在会话之间丢失状态。
- **子智能体可观测性** — #22598（为子智能体轨迹提供 `/chat share`）和 #21763（bug 报告缺少子智能体上下文）都针对委派工作的可诊断性。
- **智能体自我认知与克制** — #21432（准确的 CLI 标志/热键）和 #22672（避免破坏性 git 操作）要求智能体推理自身能力与影响范围。
- **对开发者友好的工具范围限定** — #24246 请求为大型 MCP 配置提供更智能的工具裁剪。

## 7. 开发者痛点

- **挂起和假完成是主要挫败来源。** #21409（通用智能体挂起）、#25166（shell 卡在 "Waiting input"）、#22465（vite 交互式提示死锁）和 #22186（hook 崩溃）都描述了会直接停滞的工作流。
- **子智能体状态报告不可信。** #22323 和 #21983 都显示失败或轮次上限耗尽却以 `GOAL`/`success` 呈现，破坏自动化和评估框架。
- **配置被静默忽略。** #22267（浏览器智能体忽略 `settings.json` 的 `maxTurns`）、#20079（符号链接的智能体文件未被识别）和 #29208（损坏的 `agents.json` 崩溃）指向脆弱的配置加载。
- **CLI 自身的安全边界缺口。** checkpoint 中的路径遍历（#29192）、未校验的 Windows git 参数（#29184）、非确定性机密脱敏（#26525），以及 memory inbox 中静默跳过无效补丁（#26523）是本周期反复出现的主题。
- **Token 与上下文经济学。** #19561（"Tactful Extraction"）、#21335（`/compress` 不持久化）和 #24246（工具数导致 400 错误）反映出持续的成本/上下文管理压力。
- **工作区卫生。** #23571（模型将临时脚本散落到各目录）导致在干净提交前需要额外清理。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## 今日亮点

今天的 **v1.0.84-5** 版本为语义 JSONL 交换格式新增了会话和记忆导入命令，并加入了由 CLI 自身解析器语法生成的 Shell 补全。问题队列仍以 MCP/会话生命周期可靠性、认证摩擦和平台稳定性为主——尤其是在 resume/clear 行为和长时间运行的会话方面。过去 24 小时内没有拉取请求更新。

## 发布

- [v1.0.84-5](https://github.com/github/copilot-cli/releases/tag/v1.0.84-5)
  - **新增：** 面向语义 JSONL 交换格式的会话和记忆导入命令。
  - **改进：** Shell 补全由 CLI 解析时所用的同一套语法生成，因此 `copilot <TAB>` 会同时提供根级标志和子命令，而每个子命令只提供自己的选项。
  - 发布摘要中还包含一条被截断的 `Command` 改进项；未提供更多细节。

## 热点问题

- [#4438](https://github.com/github/copilot-cli/issues/4438) — **技能标记为仅手动后无法访问。** `disable-model-invocation: true` 会导致显式调用失败并报 `Skill not found`，即便该技能出现在 `copilot skill list` 中。这破坏了预期的仅手动技能工作流。**反应：** 5 条评论，7 👍。
- [#4753](https://github.com/github/copilot-cli/issues/4753) — **会话恢复会取消进行中的 stdio MCP 连接。** 在 v1.0.83 中，resume 会以约 1 秒超时终止仍在初始化的 MCP 服务器，导致它们在本次会话中静默不可用。这是严重的 MCP/会话回归。**反应：** 4 条评论，1 👍。
- [#3700](https://github.com/github/copilot-cli/issues/3700) — **高严重性 WSL2 空闲 CPU 空转。** 空闲时主线程以约 215% CPU 空转，TUI 输出会冻结直至重启。被标记为 #2208 的回归，成为平台稳定性方面的首要问题。**反应：** 4 条评论，2 👍。
- [#1168](https://github.com/github/copilot-cli/issues/1168) — **授权疲劳。** 单个高层级请求可能产生十几次确认提示，拖慢工作流并促使用户盲目批准。这是一个长期存在的 UX/信任问题。**反应：** 4 条评论，2 👍。
- [#4764](https://github.com/github/copilot-cli/issues/4764) — **辅助权限约 1 小时后过期。** 自动批准会停止工作，直到启动新会话，从而打断权限辅助模式下的长时间工作。**反应：** 4 条评论。
- [#4795](https://github.com/github/copilot-cli/issues/4795) — **Atlassian MCP OAuth 回调不匹配。** OAuth 失败，因为 CLI 使用随机回调端口而非已注册的 `33418`，导致在 WSL/Ubuntu 上无法使用 Atlassian MCP。**反应：** 3 条评论，3 👍。
- [#4699](https://github.com/github/copilot-cli/issues/4699) — **长时间恢复会话时发生 OOM 崩溃。** 在长时间 `--resume` 会话中，V8 堆在 4 GiB 上限处 OOM，崩溃转储会写入用户当前工作目录。**反应：** 3 条评论，5 👍。
- [#4095](https://github.com/github/copilot-cli/issues/4095) — **Windows 插件更新失败并提示 “Access is denied.”。** 插件更新在 VS Code 运行时失败，因为 Copilot 扩展持有已安装插件的 watcher 句柄。社区对 Windows 工作流阻塞问题反响强烈。**反应：** 2 条评论，21 👍。
- [#4370](https://github.com/github/copilot-cli/issues/4370) — **MCP 初始化在 `server/discover` 错误时失败。** FastMCP 返回 `-32602 Invalid request parameters`，而 Copilot 在 MCP 初始化期间将其视为致命错误。这凸显了 MCP 互操作性缺口。**反应：** 3 条评论，3 👍。
- [#4026](https://github.com/github/copilot-cli/issues/4026) — **Windows 原生运行时崩溃跨版本持续存在。** 用户报告至少自 2026 年 5 月以来在多个版本中频繁出现不可预测的崩溃，且没有明确的单一触发因素。**反应：** 3 条评论。

## 关键 PR 进展

过去 24 小时内没有 PR 更新（0 项），因此没有可总结的 PR 层面进展。

## 功能请求趋势

- **会话连续性与记忆可移植性：** 用户希望跨会话上下文查询（[#2436](https://github.com/github/copilot-cli/issues/2436)）、更好的恢复行为，以及会话记忆的导入/导出。新发布的 v1.0.84-5 导入命令正符合这一方向。
- **生命周期自动化与 hooks：** 对会话结束 hook（[#4820](https://github.com/github/copilot-cli/issues/4820)）和更可靠的排队提示（[#4824](https://github.com/github/copilot-cli/issues/4824)）的请求表明，用户需要可脚本化的会话工作流。
- **MCP 认证与互操作性：** 多个问题指向 OAuth 回调处理、令牌刷新，以及更严格的 MCP 生命周期合规性（[#4795](https://github.com/github/copilot-cli/issues/4795)、[#4370](https://github.com/github/copilot-cli/issues/4370)、[#4809](https://github.com/github/copilot-cli/issues/4809)）。
- **成本与模型选择控制：** 请求包括 OpenAI Flex 层级支持（[#4821](https://github.com/github/copilot-cli/issues/4821)）以及对组织策略模型列表的更好处理（[#4819](https://github.com/github/copilot-cli/issues/4819)）。
- **技能与指令 UX：** 用户希望可预测的技能调用（[#4438](https://github.com/github/copilot-cli/issues/4438)）、更简洁的 `/skills list` 输出（[#4823](https://github.com/github/copilot-cli/issues/4823)），以及更严格的 AGENTS.md 发现边界（[#4822](https://github.com/github/copilot-cli/issues/4822)）。

## 开发者痛点

- **MCP 生命周期脆弱性：** Resume、`/clear`、启动协调、OAuth，以及对非标准 `server/discover` 的处理，反复使 MCP 服务器陷入不可用状态，或使符合规范的服务器崩溃。参见 [#4753](https://github.com/github/copilot-cli/issues/4753)、[#4370](https://github.com/github/copilot-cli/issues/4370)、[#4636](https://github.com/github/copilot-cli/issues/4636)、[#4818](https://github.com/github/copilot-cli/issues/4818) 和 [#4809](https://github.com/github/copilot-cli/issues/4809)。
- **认证与权限摩擦：** 过多提示、辅助模式过期，以及 OAuth 刷新/回调流程损坏，使长会话不可靠（[#1168](https://github.com/github/copilot-cli/issues/1168)、[#4764](https://github.com/github/copilot-cli/issues/4764)、[#4795](https://github.com/github/copilot-cli/issues/4795)、[#4464](https://github.com/github/copilot-cli/issues/4464)）。
- **资源与长会话稳定性：** WSL2 CPU 空转、Windows 崩溃，以及恢复会话 OOM 仍是活跃阻塞项（[#3700](https://github.com/github/copilot-cli/issues/3700)、[#4026](https://github.com/github/copilot-cli/issues/4026)、[#4699](https://github.com/github/copilot-cli/issues/4699)）。
- **安装器与平台设置失败：** 语音运行时通过私有 Azure 源安装失败，Windows 沙盒支持不一致，PATH 处理在长环境中出错（[#4035](https://github.com/github/copilot-cli/issues/4035)、[#4814](https://github.com/github/copilot-cli/issues/4814)、[#4652](https://github.com/github/copilot-cli/issues/4652)、[#4816](https://github.com/github/copilot-cli/issues/4816)）。
- **技能/上下文发现的边缘情况：** 仅手动技能可能变得不可访问，重复技能查找产生噪声，AGENTS.md 发现可能通过符号链接祖先导入无关仓库（[#4438](https://github.com/github/copilot-cli/issues/4438)、[#4637](https://github.com/github/copilot-cli/issues/4637)、[#4822](https://github.com/github/copilot-cli/issues/4822)）。
- **TUI/输入回归：** 用户仍会遇到 `@` 文件引用、`ask_user` 选项渲染，以及 `ctrl-t` 提示入队问题（[#3854](https://github.com/github/copilot-cli/issues/3854)、[#4817](https://github.com/github/copilot-cli/issues/4817)、[#4824](https://github.com/github/copilot-cli/issues/4824)）。

---

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-12

## 1. 今日亮点
**2.0 (V2) beta** 的稳定化主导了今日动态：针对 V2 Docker 制品、Windows CLI 签名以及稳定 `@opencode/*` 包路径的发布工程修复今日落地，同时 TUI 启动回归修复（主题检测、主页提示词渲染）仍在持续累积。在 issue 跟踪器中，计费/配额完整性是最突出的主题——付费 **OpenCode Go** 订阅卡在“Insufficient balance”错误之后，以及 **Copilot 旧版套餐**被单条 V2 提示词完全耗尽。围绕子代理循环保护（#45442）和 V2 中工具调用参数损坏（#47902）的可靠性担忧也依然存在。

## 2. 发布
过去 24 小时内没有新版本发布。

## 3. 热门 Issue

1. **#37790 — [BUG] 付费 OpenCode Go 订阅显示“Insufficient balance”** (18 条评论, OPEN)
   Stripe 付款成功，但工作区从未配置相应权益，彻底阻塞了付费用户。这是当日互动量最高的 issue，也是关乎信任/收入的关键故障。
   https://github.com/anomalyco/opencode/issues/37790

2. **#30308 — [FEATURE] Claude Code 风格动态工作流** (10 条评论, 👍5)
   请求与 Claude Code 的声明式工作流系统对齐。这表明用户需要可编排的多步骤代理流水线，而不是临时提示。
   https://github.com/anomalyco/opencode/issues/30308

3. **#37231 — [CLOSED] “Error from provider (Console Go): Upstream request failed”** (9 条评论)
   所有 Go 模型在 CLI、桌面端和 OpenChamber 中同时失败——这是一次广泛的提供商侧故障。已关闭，但说明平台依赖脆弱性反复出现。
   https://github.com/anomalyco/opencode/issues/37231

4. **#7963 — [CLOSED] 仅撤销消息，保留文件变更（类似 Claude Code）** (9 条评论, 👍12)
   长期存在的 UX 请求：`/undo` 目前会同时还原对话和文件；用户希望清理历史记录，同时保留代码。九个月来获得了强烈的赞同票支持。
   https://github.com/anomalyco/opencode/issues/7963

5. **#45442 — [2.0] 子代理无限循环：约 50 分钟内 364 次相同 grep 调用** (8 条评论, 👍1)
   一个 `general` 子代理发出了 364 次相同工具调用，且没有循环保护，导致 token 消耗失控。凸显 V2 代理编排中缺少安全护栏。
   https://github.com/anomalyco/opencode/issues/45442

6. **#36241 — macOS：`reasoning part rs_*:0 not found` 在 gpt-5.6-sol-fast/high 上中止** (7 条评论, 👍2)
   使用 Codex OAuth 时，流式输出会在推理中途中止。对通过 OAuth 使用 OpenAI 的用户而言，该问题持续、可复现且具有破坏性。
   https://github.com/anomalyco/opencode/issues/36241

7. **#40993 — [FEATURE] 支持 Agent Plugins 标准（agent-plugins.org）** (6 条评论, 👍12)
   提议采用将 Agent Skills + MCP 服务器打包在一起的厂商中立打包规范。高赞同票数反映出用户对跨代理厂商可移植性的需求。
   https://github.com/anomalyco/opencode/issues/40993

8. **#48330 — [2.0] Copilot 旧版套餐被单条提示词完全耗尽** (6 条评论)
   一份每月 1,500 次请求的 Copilot 订阅在一次会话中被耗尽，最终返回 HTTP 429。这是相对于 OpenCode 1 的回归——一个严重的多请求计数 bug。
   https://github.com/anomalyco/opencode/issues/48330

9. **#27110 — [FEATURE] 设置以限制最大并行子代理数** (5 条评论, 👍32)
   本组中赞同票最多的 issue。本地模型用户需要并发上限，以避免上下文/内存耗尽。
   https://github.com/anomalyco/opencode/issues/27110

10. **#47902 — [2.0] 工具调用参数跨调用损坏；schema 无效的调用仍可执行** (4 条评论)
    参数泄漏了序列化标记（`<|DELIM_AE|>step_type...`），被截断或混入其他字段——却仍然被执行。这是 V2 工具流水线中的正确性与安全风险。
    https://github.com/anomalyco/opencode/issues/47902

*其他值得关注：* #10939 (CLOSED) — `auth login <url>` 在未经确认的情况下运行远程提供的 `auth.command`（安全加固，👍6）；#48530 — `session.error` 事件被全局同步忽略，导致会话卡在“busy”状态且没有可见错误。

## 4. 重要 PR 进展

1. **#48576 — docs：使用稳定版 V2 包** (MERGED/CLOSED, thdxr)
   将 V2 安装、客户端、SDK、插件和命令示例从 `@beta` 切换为稳定版 `@opencode/*`。明确表明 V2 打包已经成熟。
   https://github.com/anomalyco/opencode/pull/48576

2. **#48571 — fix(release)：使用 V2 Docker 制品路径**
   修正 V2 Docker 镜像，使其复制真实的 `cli-linux-*` 构建制品目录；此前首次 2.0.0 尝试发布了损坏的 npm 包。
   https://github.com/anomalyco/opencode/pull/48571

3. **#48568 — fix(release)：从 `latest` 中省略 Node CLI**
   将实验性 Node CLI 分发从官方 `latest` 版本中排除；dev/beta 构建保持不变。
   https://github.com/anomalyco/opencode/pull/48568

4. **#48567 / #48566 — fix(release)：签名 V2 Windows CLI**
   为主要 V2 Windows 二进制文件启用 Azure Trusted Signing（Node 分发的可执行文件因签名失败而被排除）。
   https://github.com/anomalyco/opencode/pull/48567 · https://github.com/anomalyco/opencode/pull/48566

5. **#48564 — fix(release)：省略 V2 Windows 桌面端**
   在 `v2` 分支尚未配置签名期间，暂时从 V2 稳定版中移除 Windows 桌面制品。
   https://github.com/anomalyco/opencode/pull/48564

6. **#48575 — fix(tui)：在插件稳定之前渲染主页提示词**
   内置主题就绪后立即挂载生产环境 Home 提示词，并预留骨架空间，使插件界面不再导致重新挂载或焦点跳转。基于 #48570 堆叠。
   https://github.com/anomalyco/opencode/pull/48575

7. **#48570 — fix(tui)：延迟命名主题调色板检测**
   命名主题不再阻塞等待系统调色板探测，从而为不响应批量 OSC 4 查询的终端消除约 300 ms 的启动延迟。
   https://github.com/anomalyco/opencode/pull/48570

8. **#48117 — fix(provider)：解析模型 ID 中的 OpenRouter 路由修饰符后缀**
   通过处理 `:floor`、`:nitro`、`:exacto`、`:online` 及类似 OpenRouter 请求时路由修饰符，而不是将它们视为模型 slug 的一部分，从而关闭 #48016。
   https://github.com/anomalyco/opencode/pull/48117

9. **#48526 — feat(app)：Codex 风格侧边栏导航，带实时线程状态、settle 和固定项**
   新增可选的持久导航侧边栏（Settings → General → Navigation），带实时线程状态、settling 和固定线程。
   https://github.com/anomalyco/opencode/pull/48526

10. **#41830 — refactor(core)：集中管理会话消息行** (CLOSED)
    引入 `SessionMessageRow` 作为唯一持久化的 `SessionMessage` 边界，取代了跨会话持久化中重复的 `{ id, type, data }` 组装与拆分。
    https://github.com/anomalyco/opencode/pull/41830

*清理过程中还合入：* #41842（将 VCS/session TUI 事件限定到本地目录，关闭 #39181），#41811（新增插件会话停止钩子，关闭 #16626），#41803（恢复桌面服务器 CORS 策略），#41824（通过 `GET /api/usage` 暴露 Go/Zen 用量）。

## 5. 热门讨论
未提供该时间窗口的讨论数据；本节省略。

## 6. 功能请求趋势

- **代理编排控制** — 动态/声明式工作流（#30308）、最大并行子代理数限制（#27110, 👍32），以及失控子代理的循环/成本保护（#45442）。
- **历史记录与文件状态解耦** — 撤销/删除消息同时保留文件变更（#7963, 👍12）；用于继续会话推理的命令（#44921）。
- **跨厂商可移植性与扩展性** — 支持 Agent Plugins 标准（#40993, 👍12）、跨平台 `SKILL.md` 发布（#48504），以及生态/MCP 文档贡献。
- **开箱即用的提供商发现** — 在 dev 上自动发现 vLLM 模型（#47344），避免手写 `@ai-sdk/openai-compatible` 配置。
- **TUI 布局可配置性** — 隐藏/调整右侧状态面板大小（#24373，现已关闭）、切换侧边栏（#48569）。
- **凭证与合规规范** — 运行远程 `auth.command` 前确认（#10939）、修复 OAuth 登录失败（#48572），以及处理过时的非英文文档（#48565）。

## 7. 开发者痛点

1. **计费与权益不同步。** 付费 Go 订阅无法配置权益（#37790）、Copilot 旧版配额被单条 V2 提示词烧尽（#48330），以及 Go/Zen 端点上 DeepSeek 提示缓存命中率近乎为零（#41125, #43218）——用户付了钱却没有获得预期价值。
2. **V2 代理安全缺口。** 没有熔断的相同工具调用循环（#45442），以及损坏、schema 无效却仍会执行的工具参数（#47902），是针对 2.0 最严重的正确性/安全性报告。
3. **静默失败与卡死状态。** 会话一直处于“busy”且没有暴露错误（#48530）、提示词完全不产生响应（#48503, #48506），以及瞬时的“Failed to fetch”错误（#48552），都让故障难以诊断。
4. **提供商兼容性摩擦。** V2 无条件发送 `prompt_cache_key`，会破坏更严格的 OpenAI 兼容中转（#45113）；尽管已在目录中列出，Go 模型在 `muse-spark-1.3-contributor` 上的“Invalid upload request”和 HTTP 500 仍然存在（#47237, #48512）。
5. **终端/环境脆弱性。** TUI 状态监视器出现 `ENOSPC`（#48384），以及库的 `console.*` 输出破坏备用屏幕（#48520），降低了核心 TUI 体验。
6. **发布通道混乱。** 同日一波发布修复（Docker 路径、Windows 签名、排除 Node CLI）表明贡献者仍在摸索 V2 打包与分发的边界。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-12

## 今日要点

过去 24 小时没有发布版本，但跟踪器极其活跃：Windows 运行时行为同时主导了 issue 和 PR，涵盖 shell 发现、Store 别名、RPC 关闭崩溃以及 IME/Alt 键输入处理。与此同时，`mitsuhiko` 的堆叠式 system-message PR（#9116、#9117）已进入合并路径，改变了会话中途 prompt 和工具变更传递给 provider 的方式。Provider 兼容性修复（Bedrock、OpenAI-compatible streams、Codex attribution）也取得进展。

## 版本发布

过去 24 小时无。

## 热门 Issue

1. **[#7547](https://github.com/earendil-works/pi/issues/7547) — 如何在 Windows 上使用 Pi？（62 条评论）** — 关于 Windows 碎片化问题的长期汇总帖。跟踪器中参与度最高的 issue；今天提交的大量 Windows bug（见下文）实际上就是对其前提的回答。
2. **[#9323](https://github.com/earendil-works/pi/issues/9323) — 改进 Fireworks 专用配置（14 条评论）** — provider 配置处理中的 bug，讨论有持续的来回互动；这很重要，因为 provider 专用配置路径是静默异常行为的常见来源。
3. **[#5323](https://github.com/earendil-works/pi/issues/5323) — 改进 Vertex + GCP 元数据服务器支持（9 条评论，👍2）** — Pi 的 `is Vertex authed?` 检查使用同步 `existsSync`，而不是元数据服务器，导致标准 GCP 工作负载无法正常运行。与企业场景相关。
4. **[#9410](https://github.com/earendil-works/pi/issues/9410) — 流式传输期间按 Escape 会冻结 TUI 约 58s（4 条评论）** — 可在约 465k token 的 `gemini-3.8-flash` 会话中复现；大上下文下中断不可用。最新版本中的高严重性 UX 回归。
5. **[#7321](https://github.com/earendil-works/pi/issues/7321) — 没有 bracketed paste 时多行粘贴损坏（5 条评论）** — Termux/Android 及其他不支持 bracketed paste 的终端会在 `\r` 上提交，而不是插入。这表明 Pi 假设用户使用现代终端。
6. **[#6108](https://github.com/earendil-works/pi/issues/6108) — 发布版二进制在 `/reload` 时重新评估扩展依赖副作用（5 条评论）** — 扩展依赖副作用在重新加载时重放（例如主题注册）。阻碍了复杂扩展获得可靠的重新加载语义。
7. **[#8810](https://github.com/earendil-works/pi/issues/8810) — 扩展注册的 provider 间歇性未被视为默认（5 条评论，👍1）** — 新会话会静默回退到另一个 provider 的默认值。问题间歇出现，使扩展作者调试成本高昂。
8. **[#7658](https://github.com/earendil-works/pi/issues/7658) — 用于持久化 API 密钥凭据的扩展 API（4 条评论）** — 扩展可以注册 provider，但无法写入 `auth.json`。这是扩展表面中一个明确且常被提及的缺口。
9. **[#9045](https://github.com/earendil-works/pi/issues/9045) — 无效的 `--mode` 值被静默忽略（4 条评论）** — `parseArgs(["--mode","yaml"])` 产生 `mode: undefined`，且没有任何诊断信息。会破坏脚本的静默失败。
10. **[#6930](https://github.com/earendil-works/pi/issues/6930) — 将 `renderPage` / OAuth HTML 函数公开（4 条评论）** — 一个小型 API 表面请求，可让扩展复用带品牌的 OAuth 页面，而无需重新实现。

*其他值得注意（今日关闭）：* [#9490](https://github.com/earendil-works/pi/issues/9490) `findPowerShell` 硬编码 `C:\`，[#9500](https://github.com/earendil-works/pi/issues/9500) SIGILL 崩溃归因于捆绑的 `fs-native-extensions`，[#9497](https://github.com/earendil-works/pi/issues/9497) Windows 上的 CJK IME 延迟，[#9507](https://github.com/earendil-works/pi/issues/9507) Windows 关闭时 RPC 模式的 libuv 断言，以及关于非拉丁布局下 Alt+字母键绑定失效的重复报告 [#9509](https://github.com/earendil-works/pi/issues/9509)/[#9510](https://github.com/earendil-works/pi/issues/9510)。

## 关键 PR 进展

1. **[#9504](https://github.com/earendil-works/pi/pull/9504) — 接受 Windows Store shell 别名** — 将 shell 验证切换为 `accessSync(F_OK)`；`existsSync` 会以 `EACCES` 拒绝可运行的 Store 别名。
2. **[#9501](https://github.com/earendil-works/pi/pull/9501) — 从安装目录解析 Windows shell** — 统一了此前分散的硬编码路径/环境变量/分支逻辑，并记录了 Windows 行为。
3. **[#9117](https://github.com/earendil-works/pi/pull/9117) — 将 prompt 和工具变更作为 system-message 增量传递** — #8998 拆分的后半部分；取代会话中途的顶层 prompt 重写。
4. **[#9116](https://github.com/earendil-works/pi/pull/9116) — 向 pi-ai 添加会话中途 system 消息** — 新增 `system` 角色，贯穿 `pi-agent-core` 和 coding agent。
5. **[#9505](https://github.com/earendil-works/pi/pull/9505) — 在 openai-completions 流式路径中遵循 `model.samplingParams`** — 修复使用工具的轮次中 vLLM/llama.cpp 参数（`repetition_penalty`、`dry_multiplier`）被丢弃的问题；与 issue [#9506](https://github.com/earendil-works/pi/issues/9506) 配套。
6. **[#9488](https://github.com/earendil-works/pi/pull/9488) — 规范 Codex 轮次归属** — 添加 provider 中立的 `requestIdentity`（session/thread/turn/window/request-kind），以便跨工具续接、重试和压缩恢复对请求进行归属。
7. **[#9442](https://github.com/earendil-works/pi/pull/9442) — 允许兼容代理使用 prompt cache key** — 新增 `compat.supportsPromptCacheKey` 选择加入，因为 `prompt_cache_key` 此前仅限直接 OpenAI URL 使用。
8. **[#8572](https://github.com/earendil-works/pi/pull/8572) — 支持 Amazon Bedrock Mantle** — 通过 Mantle 提供的 GPT 系列模型此前被路由到 Converse，并无法通过验证。进行中，等待 API 密钥权限以进行 e2e。
9. **[#9489](https://github.com/earendil-works/pi/pull/9489) — 按模型系列将 Bedrock Converse `usage.input` 规范化为净额** — Claude 报告缓存净输入 token，其他系列不这样；修复 #8752。直接影响成本/用量核算。
10. **[#9478](https://github.com/earendil-works/pi/pull/9478) — 在压缩 token 估算中限制每条消息字符数** — 两个约 6.6MB 的 `web_fetch` 结果导致自动压缩在成功压缩几分钟后误触发。

*其他已合并：* [#9483](https://github.com/earendil-works/pi/pull/9483)（选择加入 `customCwd`，恢复被 #8627 破坏的兼容性）、[#9468](https://github.com/earendil-works/pi/pull/9468)（`requestReload` 在 settle 时延迟/合并）、[#9467](https://github.com/earendil-works/pi/pull/9467)（设置阶段中止归类为 `aborted`）、[#8708](https://github.com/earendil-works/pi/pull/8708)（不通过限流的 GitHub API 解析 fd/ripgrep 版本）。

## 热门讨论

本周期未提供讨论数据。

## 功能请求趋势

- **将 Windows 作为一等平台。** 唯一主导主题：shell/二进制发现（#9501、#9504、#9490）、RPC 关闭稳定性（#9507）、终端键绑定（#9509、#9510）、IME 渲染（#9497）。#7547 汇总帖之所以存在，正是因为重点不明确。
- **扩展 API 的扩充。** 将凭据持久化到 `auth.json`（#7658）、公开 OAuth/HTML 渲染辅助函数（#6930）、可靠的 provider 注册与默认值（#8810），以及安全的扩展重载语义（#6108、#9468）。
- **Provider 广度与正确性。** Vertex/GCP 元数据认证（#5323）、Bedrock Mantle 路由（#8572）、OpenAI-compatible provider 容错（#9508）、采样参数保真（#9505/#9506），以及 Codex 请求身份（#9488）。
- **会话生命周期与大上下文体验。** 限制压缩输入（#8371、#9478）、更快的启动/恢复（#9475），以及高 token 数下可响应的中断（#9410）。
- **非标准终端支持。** 缺少 bracketed paste（#7321）和非拉丁键盘布局（#9509、#9510）都属于“假设现代终端”的失败模式。

## 开发者痛点

- **Windows 分歧不断产生级联 bug。** 一天内出现了三类独立故障——硬编码 `C:\` 路径、Store 别名 `EACCES` 和 libuv 拆卸断言——表明平台特定代码路径分散而非集中。PR #9501 是一次明确的整合尝试。
- **静默失败是破坏性最大的一类。** 无效 `--mode` 值没有任何诊断直接通过（#9045），`samplingParams` 在使用工具的轮次中消失（#9506），扩展注册的默认值间歇性被忽略（#8810）。这三者都会产生看似正确但行为错误的运行。
- **终端输入处理在常规路径之外很脆弱。** 粘贴、IME 组合和修饰键在非默认配置下都会失效，对非英语和非桌面用户影响尤为严重。
- **扩展编写能力领先于 API 表面。** 扩展可以注册 provider，但无法持久化凭据、无法复用 OAuth 渲染，并且无法在不重放依赖副作用的情况下可靠重载。
- **大上下文会话降低用户可见的响应性。** 58 秒的 Escape 冻结（#9410）和多兆字节工具结果上的压缩误触发（#9478）都源于对对话历史进行无界处理。
- **受速率限制的第三方依赖导致首次运行失败。** GitHub API 配额问题（#8594 → #8708）和 npm 12 的 `EALLOWREMOTE`（#9499）凸显安装/更新路径暴露于外部限制。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区简报 — 2026-09-12

## 1. 今日亮点

活动仍以 **P1 可靠性工作** 为主：多个后台 agent 完成时的 TUI 静默崩溃（#11500）、Windows PTY/ConPTY 泄漏（#11352）以及 VS Code Remote-SSH 故障（#11556）都持续受到关注。与此同时，围绕遥测出现了一批 **隐私/脱敏修复与报告**——原始请求体、工具错误文本和 shell 命令行泄漏到日志与 RUM（#11666、#11667、#11198），对应 PR（#11649）现已开放。功能方面，贡献者提交了内核级 Linux sandbox（#11614）和基于 Playwright 的 Browser SDK（#11241）提案，hook 引擎则朝着 Claude Code 契约对齐推进（#11610、#11613、#11675）。

## 2. 发布

**v0.23.3-nightly.20260911.aaa6a32aae**（nightly）

| 变更 | 作者 | PR |
|---|---|---|
| `refactor(dingtalk)`: 移除过时的后台响应聚合 | @qqqys | [#11570](https://github.com/QwenLM/qwen-code/pull/11570) |
| `feat(channels)!`: 破坏性 channel 变更（源中说明被截断） | — | — |

今天只有一个 nightly 版本；`!` 标记表示 channels 子系统存在破坏性变更，因此基于 channel adapter 构建的集成方在升级前应跟踪完整 release notes。

## 3. 热点 Issue

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — 后台 agent 完成时 TUI 静默退出（React #185）** `P1 / ui / rendering`
   Ink 的 `useBoxMetrics` 布局监听器 setState 循环在多个后台 subagent 连续快速完成时，以 "Maximum update depth exceeded" 杀死交互式 TUI，而 resume 报告 "Previous session appears…"。当日评论最多 issue（6 条）——一个未暴露任何错误的硬崩溃，正是会削弱对后台自动化信任的那类故障。

2. **[#11352](https://github.com/QwenLM/qwen-code/issues/11352) — Windows web-terminal PTY 泄漏 `conhost.exe`** `P1 / performance / windows`
   2026-09-11 范围已被主动收窄：shell 工具那一半由 #11497（内置 ConPTY backend）修复，剩下 web-terminal PTY。这是一个很好的例子：经过分诊、部分解决的泄漏，维护者明确跟踪了剩余部分。

3. **[#11556](https://github.com/QwenLM/qwen-code/issues/11556) — `vscode-ide-companion` 0.23.1 在 Remote-SSH 下损坏** `P1 / vscode / ide-integration`
   当 VS Code 客户端为 x64 Linux 而服务端为 arm64 时，Webview 卡在加载中。一个跨架构 IDE 回归，阻断了一整类远程工作流；已有 5 条评论且仍在增加。

4. **[#9693](https://github.com/QwenLM/qwen-code/issues/9693) — Qwen Desktop：Windows 上 MCP `-32000 Connection closed`** `P2 / mcp / windows`
   即使未激活 MCP，官方 filesystem 和 sequential-thinking STDIO server 也都会失败。长期存在（2026-08-21 开启）且仍为 `need-retesting`——Windows MCP 传输是长期薄弱点（另见 #4218，现已关闭）。

5. **[#11666](https://github.com/QwenLM/qwen-code/issues/11666) — 尽管 `logPrompts=false`，遥测仍导出完整 API 请求内容**
   即使禁用 prompt 日志记录，`api_request.request_text` 仍携带整个请求。提交时附带了精确的 `main` SHA 和代码指针——与面向用户的隐私开关直接矛盾。

6. **[#11198](https://github.com/QwenLM/qwen-code/issues/11198) — 用量统计遥测上传原始工具错误文本** `P1 / security / data-privacy`
   默认开启的 channel 会将未脱敏的 shell 命令行发送到 RUM，包括可能的 URL 凭据和 `Authorization: Bearer` header。被标记为 `main` 上已存在问题，且范围比 #10916 更广；修复 PR（#11649）现已开放。

7. **[#11610](https://github.com/QwenLM/qwen-code/issues/11610) — Hooks：与 Claude Code 对齐契约** `P1 / hooks-events`
   提议统一纯文本 stdout、`stop_hook_active`、超时单位、matcher 和通用输入结构。hooks 引擎被描述为已经“结构上对齐”——这关乎生态兼容性以及用户迁移 hook 配置时的摩擦。

8. **[#10850](https://github.com/QwenLM/qwen-code/issues/10850) — 依赖 CVE 审计在仓库范围失败** `P1 / security / ci-cd`
   来自 `fast-uri`/`qs`/`uuid` advisory 的 4 个漏洞（1 low、2 moderate、1 high）导致 `main` 上的 audit job 失败。阻塞 CI 且 `ready-for-human`——一道需要 owner 的供应链门禁。

9. **[#8138](https://github.com/QwenLM/qwen-code/issues/8138) — Worktree `settings.json` 被写入项目根目录** `P2 / configuration / welcome-pr`
   在 git worktree 内，设置变更会落到根 `.qwen/`，而不是 worktree 自己的目录。标记为 `welcome-pr`，因此这是对首次贡献者的明确邀请。

10. **[#11564](https://github.com/QwenLM/qwen-code/issues/11564) — `web_search`：为引用来源设计页面标题** `P2 / feature-request`
   经过两轮 review 后从 #11490 拆分出来，因为需要先确定设计再写更多代码。值得注意的是，团队选择了设计共识而非交付部分修复——工具描述已经要求模型引用 `[title](url)`。

## 4. 重点 PR 进展

1. **[#11614](https://github.com/QwenLM/qwen-code/pull/11614) — `feat(cli)`：面向 Linux 的 bwrap 内核 sandbox backend**
   通过内核原语限制 agent，无需容器运行时、root、daemon 或镜像；按名称 opt-in，macOS 与 container backend 不受影响。当前在途最具分量的新能力。

2. **[#11241](https://github.com/QwenLM/qwen-code/pull/11241) — `feat(browser-use)`：基于 Playwright 的 Browser SDK**
   运行在持久化 Node REPL 中、面向 model 的类型化 SDK，驱动现有 Chrome 会话，提供 semantic locator、DOM snapshot ref 和 visual coordinate 三种定位模式。

3. **[#11669](https://github.com/QwenLM/qwen-code/pull/11669) — fix(core)：阻止仓库自身的 git config 运行程序**
   加固自动 git 调用（启动上下文、working-tree status/diff、ignore probing、tree search），防止执行 `.git/config` 声明的程序。针对不可信仓库的安全相关修复。

4. **[#11649](https://github.com/QwenLM/qwen-code/pull/11649) — fix(core)：在用量统计遥测 sink 中脱敏错误文本**
   直接回应 #11198，shell 命令行被认定为主要泄漏载体。与报告同日落地。

5. **[#11643](https://github.com/QwenLM/qwen-code/pull/11643) — fix(core)：在捆绑的 ConPTY backend 上运行 web terminal PTY**
   通过放弃 node-pty 的 inbox backend，关闭 #11352 `conhost.exe` 泄漏剩余的一半；该 backend 的 exit watcher 会在 `onExit` 触发前擦除 pty baton。

6. **[#11270](https://github.com/QwenLM/qwen-code/pull/11270) — fix(core)：让停滞的后台 agent 超时**
   为新启动、恢复运行和常驻延续固定了 watchdog：15 分钟无 model/control 进展，每个执行中的 tool 10 分钟。与 #11500 的 TUI 崩溃修复互补，提升后台 agent 整体健壮性。

7. **[#11613](https://github.com/QwenLM/qwen-code/pull/11613) — fix(core)：在 Stop hooks 上报告真实的 `stop_hook_active`**
   现在在第一次 stop 检查时为 `false`，只有在因阻塞 Stop hook 而继续时才为 `true`，包括 tool 调用之后。属于 #11610 中 Claude Code 对齐推进的一部分。

8. **[#11653](https://github.com/QwenLM/qwen-code/pull/11653) — fix(acp-bridge)：拒绝 ACP child heap 的无限制 cgroup sentinel**
   停止根据 libuv 的 "unlimited" sentinel（接近 2^64）推导 V8 old-space 目标，改为使用机器实际可支撑的内存。防止默认 ACP child spawn 中出现荒谬的 heap 配置。

9. **[#9466](https://github.com/QwenLM/qwen-code/pull/9466) — refactor：将 rewind 映射锚定到稳定的 prompt identity**
   Rewind 现在通过持久化的 prompt identity 解析目标，而不是按位置的 turn order，从而能在 session resume 以及会重新编号或重排 turn 的界面中存活。长期运行（`autofix/takeover`），但对 session 正确性具有结构性重要意义。

10. **[#11562](https://github.com/QwenLM/qwen-code/pull/11562) — fix(cli)：让一次性 system reminder 不进入用户自己的消息**
   阻止注入的 reminder 出现在 transcript、跨 session ↑-recall 历史和重新填充的 composer 文本中。一个小而高可见度的 UX 正确性修复；延后的 review 发现跟踪于 #11587。

## 5. 热点讨论

本窗口未提供 GitHub Discussions 数据；本节省略。

## 6. 功能请求趋势

- **Agent sandbox 与隔离** —— #11614（bwrap kernel sandbox），延续 container/macOS backend 路线，朝着无 root、无 daemon 的隔离推进。
- **浏览器自动化成为一等工具** —— #11241（Playwright Browser SDK）加上 `web_search` 引用打磨（#11564），指向更丰富的面向 model 的 web 交互。
- **Hooks 生态兼容性** —— #11610 和 #11675（启动时暴露旧式 ms 单位超时）旨在实现 Claude Code 契约对齐并简化迁移。
- **Session 与 worktree 生命周期管理** —— #11024（worktree 清理残留）、#10103（owner 作用域命名 session）、#8908（无 workspace 的独立 session）、#8927（`sessionRotation` 边界）——一组密集的 session 治理请求。
- **扩展命名空间与作用域** —— #9408（`extension:skill` 限定）和 #11086（将扩展限定到 workspace 运行时）推动面向多租户、感知 workspace 的扩展目录。
- **配置正确性** —— #8138（worktree 本地 `settings.json`）和 #11665（Responses reasoning/tool-call 相邻性）反映出对可预测配置解析和 prompt 历史完整性的需求。

## 7. 开发者痛点

- **Windows 仍是最难用的平台。** MCP STDIO 失败（#9693）、PTY 产生孤儿 `conhost.exe`（#11352）以及未回收的 hook 进程树（#11623）构成原生进程处理 bug 的反复模式。
- **隐私开关行为与宣传不符。** 两份独立报告（#11666、#11198）加上 debug-log 泄漏（#11667）表明，在 responses、遥测和 RUM 路径中内容脱敏不一致——这是信任问题，而不仅仅是 bug。
- **后台 agent 难以监管。** 静默 TUI 崩溃（#11500）加上无 watchdog 的无进展卡死（#11270、#11326），意味着故障要么不可见，要么无法归因。
- **CI 与发布基础设施不稳定。** CVE audit 失败（#10850）、release host 与 PR CI 共享 `ecs-qwen` label（#10879）以及陈旧的 ECS runner fleet（#11633）正在消耗维护者本可用于产品工作的注意力。
- **跨界面 session 状态正确性。** Worktree 设置路径（#8138）、rewind 位置漂移（#9466）、被取代 session 强制关闭（#11511）以及 session catalog 过滤（#11584）都反映出状态分散在 CLI、daemon、VS Code 和 web-shell 中的成本。
- **Review 循环开销。** 相当一部分开放 PR 是 `autofix/takeover` 或 `review/self-reported`，且延后发现被拆成单独的 issue（#11408、#11587、#9490）——这表明多轮 review 产生后续债务的速度快于其关闭速度。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*