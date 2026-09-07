# AI CLI 工具社区动态日报 2026-09-08

> 生成时间: 2026-09-07 22:45 UTC | 覆盖工具: 7 个

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

# 跨工具对比报告——AI CLI 开发者工具
*来源：2026-09-08 Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、OpenCode、Pi 与 Qwen Code 的社区日报*

> **方法论说明：** 以下计数反映的是各工具每日日报中明确列出的条目（即“被突出显示/被枚举”的内容）。“None surfaced（未列出）”表示该日报中该渠道当日没有活动记录，而非该渠道被禁用。本窗口内没有哪款工具是 discussions-only；七个仓库的日报都会展示 issue/PR 追踪器，因此无需填写“N/A”。

---

## 1. 生态概述

AI CLI 工具领域的竞争重心，已经从模型能力较量明确转向**可靠性、信任和会话生命周期工程**。在这七个社区中，最强烈的抱怨已不再是代码质量，而是静默的数据丢失、幻影或不可见的会话记录内容、虚假的“成功”信号、不透明的速率限制核算，以及资源泄漏。各工具厂商正收敛到相似的架构答案上——Rust/TUI 前端、守护进程化的后台执行、基于 MCP 的工具生态、沙箱/容器化执行，以及编辑器面板集成——但在治理姿态（企业策略 vs. 开源本地优先）和发布纪律（stable、alpha、nightly 或 preview 渠道）上差异明显。最值得注意的跨工具信号是：**用户现在把会话记录当作审计工件，要求提供撤销、留存控制和诚实的完成语义**；仅凭功能本身已不再能赢得信任。

## 2. 活跃度对比

| 工具 | Issues（列出数） | PRs（列出数） | Discussions（列出数） | 发布状态（最近 24 小时） |
|---|---|---|---|---|
| **Claude Code** | 10 个被突出显示；过期清理关闭了 30 个最活跃中的 28 个 | 2（1 个已关闭修复，1 个开放中） | 无 | 无发布 |
| **OpenAI Codex** | 10 | 10（大批 TUI/守护进程相关） | 8 个讨论帖（3 个 Ideas、1 个 General、4 个 Show & tell） | `rust-v0.154.0-alpha.6` |
| **Gemini CLI** | 10（含 2 个 P1 bug、1 个 epic） | 10（5 个已关闭、5 个开放中；2 个大型沙箱安全 PR） | 无 | `v0.60.0-nightly.20260907` |
| **GitHub Copilot CLI** | 10 | 2（1 个有实质内容，1 个信息量低） | 无 | 无发布 |
| **OpenCode** | 10 | 10 个关键 PR + 一大批自动清理 PR 已关闭 | 无 | 无发布 |
| **Pi** | 10 | 10（大部分已合并） | 无 | 无发布 |
| **Qwen Code** | 约 49 个有更新（10 个被突出显示） | 约 50 个有更新（10 个被突出显示） | 无（最长的讨论串是 issue #8662，32 条评论） | `v0.23.1-preview.2`、`v0.23.0-nightly`、`cua-driver-rs v0.20.4` |

- **按原始更新量看最活跃的追踪器：** Qwen Code（约 99 条 issue+PR 更新）、Gemini CLI（活跃的机器人分诊 + nightly 发布）、OpenAI Codex（10 个 PR 和 8 场讨论）。
- **最安静的窗口：** Claude Code（无发布，仅 2 个 PR）和 Copilot CLI（无发布，2 个 PR）——不过两者在此期间都有密集的 issue 互动。
- **发布节奏领先者：** Gemini 和 Qwen 发布 nightly/preview 构建；Codex 处于快速的 Rust alpha 发布轨道上。Claude Code、Copilot CLI、OpenCode 和 Pi 在该窗口内均无发布。
>

## 3. 跨工具的共同功能方向

在多个工具社区中反复出现的需求：

1. **会话撤销、记录完整性与恢复。** 这是最强、最一致的信号。
   - **Claude Code**：无任何 opt-out 选项的静默留存清理会直接删除会话记录（#59248，41 条评论/32 👍）；助手文本不可见（#67051）；凭空出现的幻影用户轮次（#84679）。
   - **OpenAI Codex**：`/rewind`/`/revert` 请求是各日报中获 👍 最高的讨论（119 👍）——明确援引 Claude Code 和 OpenCode 作为先例。
   - **Copilot CLI**：过早按回车会让 `ask_user` 输入被永久丢弃（#4738）；会话卡死后没有任何恢复手段（#4755）。
   - **Pi**：关于过期会话记录续接 bug 的 meta-issue（#5886）。
   - **共同需求**：可回退的轮次、通过 opt-in 控件实现的留存策略、回收站/恢复语义，以及对草稿输入的自动保存。

2. **后台/子智能体任务需要诚实报告完成状态与生命周期。** 多个“虚假成功”报告正在侵蚀信任。
   - **Gemini CLI**：子智能体因 `MAX_TURNS` 退出却被报告为 `GOAL` 成功（#22323）；Wayland 环境下浏览器子智能体没有执行任何操作就报“成功”（#21983）；通才智能体卡死（#21409）。
   - **Claude Code**：远程会话显示为存活但实际已死（#80311）；后台交接丢失认证状态（#77973）。
   - **Qwen Code**：会话运行时回收后，后台 shell 输出被静默丢弃（#11119）；社区请求提供 `activeWork` 状态与智能体恢复能力（#8586）。
   - **Copilot CLI**：排队通道中的消息会导致会话永久卡死（#4755）。
   - **共同需求**：机器可读且与现实一致的状态（running / interrupted / failed / succeeded）。

3. **MCP 可靠性与安全取消。** MCP 已经成为生产环境中的承重组件，但仍然脆弱。
   - **Copilot CLI**：恢复会话会取消正在运行的 MCP 服务器（#4753）；Azure `learn=true` 超时从 0.2 秒退化为 180 秒（#4749）。
   - **Qwen Code**：取消一个长时间运行的 stdio MCP 工具会永久杀死服务器进程（#11272）。
   - **Pi**：Bedrock 拒绝 `toolResult.content` 中嵌套的图片（#8643）。
   - **Gemini CLI**：被截断的 MCP 工具名会发生静默冲突（#28971）。
   - **共同需求**：取消操作不得杀死服务器进程；MCP 连接的生命周期必须能跨会话操作存活；不同 provider 的工具 schema 互操作需要规范化。

4. **沙箱、凭据隔离与破坏性操作防护。**
   - **Gemini CLI**：宿主 `~/.gemini` 凭据被挂载进沙箱容器——相关脱敏 PR 仍在开放中（#29214、#29216）。
   - **Claude Code**：自动批准会话期间出现了删除工作目录之外文件的情况（#84107）。
   - **OpenAI Codex**：Windows 沙箱的 DENY ACL 导致可写根目录中的 git 操作失败（#18918）。
   - **Qwen Code**：过滤器界面出现安全加固回归（#11205）；审计发现仍停留在仅报告（report-only）状态（#8835）。
   - **共同需求**：最小权限文件系统边界、发送前的密钥脱敏，以及对不可逆命令（`git reset --force`、跨目录删除）的防护。

5. **速率限制、配额与成本的透明化。** 付费用户日益强烈的痛点。
   - **OpenAI Codex**：限制恢复正常后再次退化（#31322）；5 小时限额窗口消失（#32707）；每周配额仍有剩余却报容量错误（#43337）；提示缓存未命中主导成本，却看不到缓存/未缓存明细（#35925）。
   - **OpenCode**：长达数小时的 HTTP 429 故障，引发赔偿诉求（#47613）；仪表盘用量只有 6%–57% 时却持续报 `rate_limit_exceeded`（#47634）；文档中承诺的 Zen 余额回退机制从未被触发（#42938）。
   - **共同需求**：与实际执行策略一致的用量仪表盘、明确的缓存/未缓存成本计数器，以及自助重置/排队控制。

6. **编辑器/IDE 集成。** 用户越来越希望在 IDE 面板中获得 CLI 级的能力。
   - **OpenCode**：官方 VS Code 扩展是所有日报中获 👍 最高的开放功能请求（#11176，147 👍）；另有配套的 Copilot-BYOK 网关请求（#27303）。
   - **Claude Code**：当 `~/.claude/projects` 不存在时，VSCode 扩展首次启动即失败（#17822）；请求支持本地网关（#84852）。
   - **Qwen Code**：Web Shell / 分屏视图的会话导航改进。
   - **共同需求**：需要的是 IDE 原生的一流体验，而不是终端里的变通方案。

## 4. 差异化分析

| 工具 | 核心定位 | 目标用户 | 技术/产品路线 |
|---|---|---|---|
| **Claude Code** | 长期运行的企业级会话；hooks、技能、Cowork/远程控制；会话记录可审计性 | 大型代码库中的专业工程师与团队；注重治理的组织 | 成熟的 CLI + VSCode 扩展；基于 hooks 的监督；将会话视为一等工件。当前痛点：破坏性的留存清理和记录/状态不同步，正在削弱其核心的信任叙事。 |
| **OpenAI Codex** | 前沿模型编码（gpt-6-astra 等）；与 ChatGPT 账户和费率套餐深度绑定；云端/桌面应用 | ChatGPT Pro/Plus 订阅用户；API/Azure 开发者 | 基于 Rust 重写，处于 alpha 发布轨道；TUI 产品化速度很快（语音、时间戳、计算机操作分组）；大批量 PR 显示出激进的特性迭代速度。 |
| **Gemini CLI** | 多智能体编排（通才/子智能体）、技能、沙箱化执行 | Gemini 模型的高级用户；注重安全的采用者；Linux/macOS 开发者 | nightly 自动发布；容器沙箱加固与凭据隔离；AST 感知工具已列入路线图（#22745）。差异化押注：在安全、零依赖的 OS 沙箱内发挥模型对 bash 的“亲和力”（#19873）。 |
| **GitHub Copilot CLI** | 企业 GitHub 工作流；托管策略；桌面应用 + MCP/Azure 集成 | GitHub Enterprise 团队；受监管环境 | 保守且策略优先的设计（默认 fail-closed）。社区绝对规模最小，但问题集中在 1.0.83/1.1.15 引入的回归上——会话/MCP 生命周期是薄弱环节。 |
| **OpenCode** | 开源、本地优先的智能体，附带专有 Go/Zen 付费网关；多 provider + ACP 协议事件 | 开源开发者；不绑定特定 provider 的用户；寻求编辑器集成的用户 | 平台路线：OpenAI 兼容接口、插件生态、Snowflake OAuth、子智能体权限边界。独特张力：强劲的 OSS 需求与付费层级可靠性投诉并存。 |
| **Pi** | Agent-loop 运行时架构；广泛的 provider 目录；无头/SDK 嵌入 | CLI 高级用户；在服务器中嵌入智能体的开发者；排查 provider 问题的用户群体 | 维护者主导（mitsuhiko），工程深度罕见：用系统消息增量代替整段重写 prompt（PR #9116/#9117）、修复 O(n²) 热路径、provider 路由准确性。某种程度上充当了健壮 agent-loop 设计的参考实现。 |
| **Qwen Code** | 与 Qwen 模型对齐的全栈智能体：Web Shell、守护进程（`qwen serve`）、工作流、网状多智能体、渠道集成（钉钉） | Qwen 模型用户；云/合作伙伴部署；Web-UI 优先的团队 | 原始迭代速度最快（每天 49 个 issue/50 个 PR）；Web Shell 工作流可视化、会话运行时回收、分屏导航；计划将 TUI 从 ink 迁移到 OpenTUI，显示出重造渲染栈的野心。 |

**两条产品脉络总结：** *Claude Code、Codex 和 Copilot* 是面向账户集成与受管控使用场景优化的编辑器/云产品助手；*Gemini CLI、OpenCode、Pi 和 Qwen Code* 则是开源运行时，在架构、provider 中立性和开发者工效上展开竞争。

## 5. 社区势头与成熟度

- **Claude Code** 拥有*情绪浓度最高*的 issue 氛围：#59248（静默删除会话记录）一天之内就收获 41 条评论/32 个 👍；对 30 个最活跃 issue 清理掉 28 个，既说明参与度很高，也说明维护者正在收口。本窗口内几乎完全没有 PR/发布活动，暗示产品处于稳定化阶段——社区在告诉维护者：*修复信任*比功能开发优先级更高。
- **OpenAI Codex** 展现出最强劲的*产品需求动能*：一个获 119 👍 的 `/rewind` 讨论，外加 10 个 PR 落地（TUI 语音、时间戳、守护进程更新控制、多智能体 fork 上下文修复），说明它仍在 UX 上激进迭代，但在会话历史可靠性上落后（幽灵对话、历史记录冻结）。
- **Gemini CLI** 是本窗口内*最安全优先*的工程路线：两个大型凭据隔离 PR 加上对已 EOL 的 Node 版本的移除，说明加固工作非常活跃；而 P1 卡死和虚假 GOAL 报告则让社区持续紧绷。机器人分诊产生的大量 “need-retesting” 流转，说明维护团队响应积极，但也承受着持续的回归验证压力。
- **Copilot CLI** 是绝对参与量最小的社区（大多数 issue 只有个位数 👍），但 issue 编号集中在 1.0.83/1.1.15 引入的新回归上。需求信号仍在成熟过程中；获 18 👍 的 scoped-plugin 请求体现了企业级配置需求。
- **OpenCode** 拥有整个日报集中最大的单一开放功能请求（#11176 VS Code 扩展，147 👍，已开放 7 个多月）——这是社区*在等*路线图承诺的典型标志。付费层级可靠性投诉（429、配额不一致）则是另一端的反向砝码。
- **Pi** 拥有最有深度的长期技术讨论串：#4945（OpenAI Codex 连接停滞，77 条评论）和 #7547（Windows 使用情况调研，61 条评论）是所有日报中评论最多的条目。这是一群成熟、技术功底深厚的用户——只要维护者深度参与，他们愿意容忍不稳定性。
- **Qwen Code** 在原始吞吐量上领先（24 小时内 99 条 issue/PR 更新、多个版本发布）。其中一部分来自机器人自动化，但其广度——工作流可视化、守护进程生命周期、网状多智能体、Web Shell 安全——说明其功能面异常宽广，且都在积极开发中。

**排名小结：** *迭代最快：* Qwen Code > OpenAI Codex > Gemini CLI > Pi。*人均信任度最高的社区互动：* Claude Code（激烈但正在收口）、Pi、OpenAI Codex。*需求缺口最大：* OpenCode（VS Code 扩展）。

## 6. 趋势信号

1. **“成功”不再意味着成功。** Gemini 的 `MAX_TURNS` 被当成 `GOAL` 的 bug、Copilot 的会话卡死、OpenCode 的永久卡死会话，以及 Claude 的幻影用户轮次，都指向同一个行业缺口：**智能体轮次和子智能体结果缺乏标准化、真实的生命周期语义。** 评估工具的开发者应该去探查每个工具如何区分*已中断*、*失败*和*成功*——以及界面渲染出的状态是否与已持久化的状态一致。

2. **会话记录正在变成合规工件。** 用户开始把对话日志当作审计记录，要求留存控制、导出、撤销和证据链（参见 DoneAudit——一个用于核实“完成”声明的社区工具）。任何会静默篡改、丢失或伪造会话记录内容的工具——即使只是出于 bug——都将面临最强烈的社区反弹，Claude Code 的 #59248 就是例证。*设计启示：* 清理必须 opt-in、基于回收站且可恢复；永远不要渲染模型实际并未看到的会话记录。

3. **MCP 已进入生产关键路径，但运维成熟度不足。** 取消会杀死服务器（Qwen）、恢复会话让连接变成孤儿（Copilot）、截断的工具名发生冲突（Gemini）、provider schema 转换损坏工具（OpenCode）。可以预计，2026–2027 年 MCP 服务端/客户端加固——超时、取消语义、OAuth 流程、进程回收——将成为所有工具的重点投入方向。

4. **配额/速率限制核算已经成为用户可见的产品表面。** 基于订阅的智能体让用量核算从后端细节变成了面向用户的可靠性功能。实际执行与仪表盘显示不一致（OpenCode、Codex），以及看不见的成本计数器（#35925），正在成为用户流失的驱动因素。*参考建议：* 如果你基于这些工具构建，请把缓存/未缓存的 token 成本和用量窗口可见性暴露出来；如果你要选型工具，请先在实际工作负载下验证它的速率限制行为，再作最终决定。

5. **沙箱是新的信任战场。** Gemini 的凭据暴露 PR、Claude 的工作目录外删除、Codex 的 Windows ACL 故障，都说明执行隔离正是破坏性 bug 的藏身之处。方向很明确：配置挂载前净化、宿主机路径只读化、发送前脱敏，以及对不可逆 git/文件系统操作加护栏。

6. **Windows 仍然是可靠性的前沿阵地。** Conhost/ConPTY 泄漏（Qwen）、沙箱 ACL 故障（Codex）、MCP 子进程堆积（Codex），都说明整个生态中 Windows 的生命周期处理落后于 macOS/Linux。对于标准化到 Windows 上的团队，请做好当修复补丁早期测试员的准备。

7. **跨智能体会话回放正在成为一个新品类。** `deja-vu`（在 Codex/Claude/Cursor/opencode 会话上进行召回）和 DoneAudit 等社区工具，预示着开发者的一项新期待：**智能体会话应该是可移植、可回放的数据**——而不是被锁在某个厂商的会话记录存储里。互操作性（ACP 事件、共享会话格式）将成为差异化优势。

**给技术决策者的最终结论：** 这些工具之间的能力差距正在收窄；**数据完整性保障、生命周期诚实性、沙箱边界和用量透明度**才是新的评估标准。能够把会话当作可逆、可审计、机器可读的工件，并如实上报完成状态的工具，将赢得专业开发者的信任；而那些会静默删除、卡死或误报的工具，无论模型质量多高，都会不断流失社区信心。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code 技能社区精选
*来源：github.com/anthropics/skills · 数据截至 2026-09-08*

## 1. 热门技能排行

*排行按评论活跃度对 PR 列表排序；下列 PR 均仍处于 OPEN 状态。*

1. **skill-creator 评估可靠性 — [PR #1298](https://github.com/anthropics/skills/pull/1298)**（相关：[PR #1099](https://github.com/anthropics/skills/pull/1099)、[PR #1050](https://github.com/anthropics/skills/pull/1050)）—— 这个用于构建技能的元技能，其评估循环是坏的：`run_eval.py` 对每个描述都报出 `recall=0%`，导致 `run_loop.py` 和 `improve_description.py` 实际上是“对着噪声优化”。修复方案会把评估产物安装成真正可用的技能，并解决 Windows 流读取、触发检测及并行 worker 等问题。讨论中引用了已有 10+ 次独立复现的 issue [#556](https://github.com/anthropics/skills/issues/556)，此外还并行存在 Windows 专项修复（WinError 10038、`claude.cmd` PATHEXT）。**状态：OPEN。**

2. **document-typography — [PR #514](https://github.com/anthropics/skills/pull/514)** —— 面向生成文档排版质量控制的新技能：孤词换行（1–6 个词溢出到下一行）、段落标题成为孤立行滞留页底、编号错位。讨论将其定位为生成后的质量关卡：用户很少主动要求排版质量，但每一份 AI 生成的文档都难以避免此类问题。**状态：OPEN。**

3. **scnet-hpc — [PR #1615](https://github.com/anthropics/skills/pull/1615)** —— SCNet HPC 集群的运维技能：基于 profile 的 SSH 与 Slurm 工作流、分区/内存/模块/加速器指南、集群发现与计算节点访问。值得注意的是，这是一个领域/基础设施技能，编码的是租户专属运维配置，而非通用知识。**状态：OPEN。**

4. **odt（OpenDocument）— [PR #486](https://github.com/anthropics/skills/pull/486)** —— 用于创建、填充、读取和转换 OpenDocument 文件（.odt/.ods/.odf）的技能，支持模板填充与 ODT→HTML 解析；在提到 “OpenDocument” 和 “LibreOffice” 时触发。它将文档格式家族从 PDF/DOCX 扩展到符合 ISO 标准的开放格式。**状态：OPEN。**

5. **frontend-design 改进 — [PR #210](https://github.com/anthropics/skills/pull/210)** —— 对 frontend-design 技能的修订，让每条指令都能在单次对话内执行，并且足够具体，可以引导行为又不会冗长。讨论聚焦于一个原则：技能应当是给 Claude 的操作指令，而不是写给人看的教育文档（这与 issue [#202](https://github.com/anthropics/skills/issues/202) 中的批评相呼应）。**状态：OPEN。**

6. **skill-quality-analyzer 与 skill-security-analyzer — [PR #83](https://github.com/anthropics/skills/pull/83)** —— 面向 example-skills 市场的两个元技能：前者从五个维度进行质量分析（结构与文档 20%、示例、资源……），后者对技能内容做安全分析。讨论直接关联到社区对技能分发可信度的担忧。**状态：OPEN。**

7. **Hivemind — [PR #1628](https://github.com/anthropics/skills/pull/1628)** —— 零成本多智能体编排技能：将机械性工作委派给运行在免费模型上的无头 opencode worker，而 Claude Code 仍是唯一的规划者、审查者与合入者。核心前提是：“昂贵模型的上下文才是稀缺资源，而非它的智能。”**状态：OPEN。**

8. **testing-patterns — [PR #723](https://github.com/anthropics/skills/pull/723)** —— 综合性测试技能：Testing Trophy 理念、测什么与不测什么、单元测试的 AAA 模式/命名/边界用例，以及基于 Testing Library 的 React 组件测试。它填补了该技能集合在测试生成指导方面的空白。**状态：OPEN。**

**观察：** 文档格式的 *维护* 类 PR 同样凭评论数位列前茅——[PR #538](https://github.com/anthropics/skills/pull/538)（PDF 文件引用大小写敏感问题）、[PR #541](https://github.com/anthropics/skills/pull/541)（DOCX `w:id` 冲突破坏修订记录）、[PR #1734](https://github.com/anthropics/skills/pull/1734)（孤立 DOCX 注释检测）——说明这些文档技能在真实使用中频率很高。

## 2. 社区需求趋势

*提炼自评论数最高的 Issues：*

- **安全与信任边界 — [Issue #492](https://github.com/anthropics/skills/issues/492)（43 条评论，👍2）。** 社区最关心的问题：以 `anthropic/` 命名空间分发的社区自制技能会冒充官方技能，由此形成信任边界漏洞——用户误以为这些技能来自官方，因而授予其更高权限。治理与安全需求在 [Issue #412](https://github.com/anthropics/skills/issues/412)（agent 治理提案，已关闭）与 [Issue #1175](https://github.com/anthropics/skills/issues/1175)（SharePoint 访问控制隐患，已关闭）中得到进一步印证。
- **组织级分发 — [Issue #228](https://github.com/anthropics/skills/issues/228)（16 条评论，👍8）。** 用户需要组织级技能库或直接分享链接，而不是通过 Slack 手动传递 `.skill` 文件，再到 Settings > Capabilities 上传。
- **技能工具链可靠性 — [Issue #556](https://github.com/anthropics/skills/issues/556)（12 条评论，👍7）。** 技能作者无法信任自己的评估框架：没有任何查询能触发被测技能，于是产生虚假的 0% recall 与无意义的 precision 指标。相关提案在寻求质量关卡（[Issue #1385](https://github.com/anthropics/skills/issues/1385) 推理关卡流水线；[PR #1367](https://github.com/anthropics/skills/pull/1367) 自审计技能）。
- **上下文与记忆经济性 — [Issue #1487](https://github.com/anthropics/skills/issues/1487)**（claude-api 技能在一次调用中就把约 156k tokens 全部注入）和 [Issue #1329](https://github.com/anthropics/skills/issues/1329)（compact-memory 符号式表示提案）。这些讨论体现出对既能节约上下文、又能高效表示 agent 状态的技能的需求。
- **技能管理 — [Issue #189](https://github.com/anthropics/skills/issues/189)（👍9）** 同时安装 `document-skills` 与 `example-skills` 插件会出现重复技能；[Issue #62](https://github.com/anthropics/skills/issues/62) 本地上传的技能会悄然消失。
- **互操作性 — [Issue #29](https://github.com/anthropics/skills/issues/29)（与 AWS Bedrock 配合使用）和 [Issue #16](https://github.com/anthropics/skills/issues/16)（将 Skills 暴露为 MCP）** 表明，社区需要在标准的 Claude Code 本地路径之外运行 Skills。

## 3. 高潜力待合入技能

*讨论持续进行、可能很快合入的开放 PR：*

- **[PR #514](https://github.com/anthropics/skills/pull/514) — document-typography**：生成文档的排版质检关卡；全仓库讨论量第二高的 PR。
- **[PR #1628](https://github.com/anthropics/skills/pull/1628) — Hivemind**：多智能体委派，将任务分发给免费的无头 worker；近期活跃（Aug 2026）。
- **[PR #1627](https://github.com/anthropics/skills/pull/1627) — buffer-api**：可移植的 Buffer GraphQL 调度技能，适用于任何 agent（Claude、Cursor、Codex、n8n）；更新一直持续到 9 月。
- **[PR #1367](https://github.com/anthropics/skills/pull/1367) — self-audit (v1.3.0)**：交付前按危害严重程度依次执行机械式文件验证与四维度推理审计。
- **[PR #1615](https://github.com/anthropics/skills/pull/1615) — scnet-hpc**：基于配置文件的 SSH/Slurm HPC 运维操作；更新于 Aug 24。
- **[PR #83](https://github.com/anthropics/skills/pull/83) — 技能质量/安全分析器**：直接回应生态系统中信任问题的元技能。
- **[PR #1298](https://github.com/anthropics/skills/pull/1298) (+ #1099, #1050) — skill-creator 评估修复**：讨论度最高的 PR 群组；解除了 Windows 用户的阻塞，并修正了虚假的 0% recall。
- **[PR #538](https://github.com/anthropics/skills/pull/538), [#541](https://github.com/anthropics/skills/pull/541), [#1734](https://github.com/anthropics/skills/pull/1734)** —— document-skill 正确性修复（PDF 大小写敏感、DOCX ID 冲突、孤立注释）。

## 4. 技能生态观察

社区在技能层面最集中的需求是**保障（assurance）**：既包括确保 Claude 生成产物（文档、代码、推理）质量与安全性的技能；同样也包括让技能生态本身变得可信赖的技能与工具，覆盖从安全分发、可靠评估到上下文安全执行的各个环节。

---

# Claude Code 社区摘要 — 2026-09-08

## 1. 今日要点

过去 24 小时没有发布新版本，但 issue 追踪器上变动不小：一轮 stale issue 清理一口气关闭了 30 个最活跃 issue 中的 28 个，**#59248**（静默删除会话记录）以 41 条评论和 32 👍 成为社区当下最明确的爆发点。无论在仍然活跃的 issue 里，还是刚被清理掉的 issue 里，占主导的主题都是**数据丢失、静默状态失同步、后台/远程会话可靠性**——相比模型能力，用户更担心的是 CLI 会不会做出破坏性或不可见的操作。只有 2 个 PR 有动态；其中影响最大的一个，是针对原生安装器引导脚本的修复——该引导脚本据称会删除用户已有的安装。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 热门 Issue

- **[#59248 — 静默保留期清理在无警告、未征得同意、无恢复机制的情况下删除会话记录](https://github.com/anthropics/claude-code/issues/59248)** *（OPEN，数据丢失，41 条评论，32 👍）* —— 一位 macOS/Cursor 用户丢失了当前会话之前的**全部**会话记录，包括前一天的工作内容。清理过程完全静默，用户既无法选择退出，也没有任何恢复途径。这是目前追踪器上社区反应最激烈的 issue；可以预见上游将面临压力，要求落实保留策略、选择加入控制以及回收站/恢复机制。

- **[#84679 — 模型上下文中存在幽灵用户消息，但持久化的会话记录里没有](https://github.com/anthropics/claude-code/issues/84679)** *（完整性）* —— 在一个长会话中，模型看到了一段从未输入过、也不存在于会话记录里的用户消息，并据此做出了行动——执行了用户从未授权的自主操作。无论这是同步 bug 还是上下文注入的产物，它都是严重的可审计性与安全问题。

- **[#67051 — 工具调用之前/间隙的助手文本被 CLI 渲染静默丢弃](https://github.com/anthropics/claude-code/issues/67051)** *（7 条评论，7 👍）* —— 模型“说”出了用户永远看不到的内容；这些文本存在于会话记录中，hooks 也据此来评判模型，但 TUI 将其隐藏了。社区的担忧在于：基于 hook 的监督正在评估用户不可见的内容，使得渲染出来的会话记录成为不可靠的依据。

- **[#68092 — Cowork：所有任务均失败，先陷入重试循环，然后报 ECONNRESET](https://github.com/anthropics/claude-code/issues/68092)** —— Cowork 在多个网络环境下完全无法工作，包括手机热点；干净重装后依然复现；当天早些时候还能正常使用。除了 `ECONNRESET` 之外没有任何可诊断的错误状态——这是网络相关 issue 中反复出现的抱怨。

- **[#56984 — CLAUDE_CODE_EXTRA_BODY 的 “thinking” 配置会让 Opus 上的 WebSearch 和 WebFetch 失效](https://github.com/anthropics/claude-code/issues/56984)** *（6 条评论，6 👍）* —— 一个为绕开先前上下文 bug 而流行的临时配置，如今会静默破坏 Web 工具。这体现了未文档化的“逃生舱”式设置何其脆弱。

- **[#17822 — `~/.claude/projects` 不存在时，VSCode 扩展加载失败并报 ServiceWorker 错误](https://github.com/anthropics/claude-code/issues/17822)** *（8 👍）* —— 这批 issue 中最古老的一个，至今仍在收获反响。全新机器、容器和 CI 环境都会在首次启动时失败。这次 stale 自动关闭很可能会引来重新打开它的压力。

- **[#77973 — 前台转后台后，后台 worker 无法读取 Keychain 凭据](https://github.com/anthropics/claude-code/issues/77973)** *（回归，2.1.211）* —— 将会话发送到后台会使其报 “Not logged in · Please run /login” 并终止。这是后台化场景特有的认证回归，也让后台会话可靠性问题雪上加霜。

- **[#80311 — 远程控制：达到会话上限或瞬时断连都会导致会话永久死亡](https://github.com/anthropics/claude-code/issues/80311)** —— 移动应用仍然把已死亡的会话显示为存活，并静默丢弃消息。这是一个复合缺陷：一个 bug 杀死会话，另一个 bug 对它的状态撒谎。

- **[#84313 — Safeguard 对法律研究提示词误报；`/feedback` 返回 403](https://github.com/anthropics/claude-code/issues/84313)** —— 一个 issue 里套着两个问题：安全过滤器对合法的法律研究内容触发误报，而产品内反馈命令返回 403——也就是说，遇到误报的用户无法通过预期渠道上报问题。

- **[#92742 — 限流中断反馈；agent 无视“读取完整日志”的核心记忆](https://github.com/anthropics/claude-code/issues/92742)** *（OPEN）* —— 新提交且仍处于打开状态。用户保存了一条指示 agent 读取完整日志文件的核心记忆，并确认 agent 记住了它，但几分钟后眼睁睁看着它只读取了日志的开头和结尾。这与被清理 issue 中占主导的“模型不遵守指令”类抱怨如出一辙。

## 4. 关键 PR 进展

窗口期内只有 2 个 PR 有更新：

- **[#26175 — fix: 替换坏掉的原生安装器引导脚本](https://github.com/anthropics/claude-code/pull/26175)** *（CLOSED）* —— 针对一个很棘手的安装器陷阱：`curl -fsSL https://claude.ai/install.sh | bash` 会委托给一个子命令，该子命令会**静默地无法创建 `~/.local/bin/claude`**，随后又以“清理”为名删除用户已有的 npm 全局安装——最终连一个可用的 Claude 都不剩。如果这个 PR 落地，将终结 onboarding 阶段最具破坏性的失败模式之一。注意：PR 状态为 closed；是否合并无法从数据中看到。

- **[#39043 — 从 Frontend Design Skill 中移除 “retro-futuristic” 建议](https://github.com/anthropics/claude-code/pull/39043)** *（OPEN，作者：t3dotgg）* —— 一个很小的 diff，意图却很清楚：默认的 Frontend Design Skill 目前会让生成的 UI 偏向某种特定的“复古未来主义”审美。移除之后，输出会少一些主观倾向，更适合生产级应用。作者的总结是：*“Trust me on this one.”* 这是来自社区侧的一个信号：默认技能存在过度引导的问题。

## 5. 热门讨论

本时段未提供讨论数据。

## 6. 功能需求趋势

- **会话记录的保留控制与恢复机制** —— #59248 的讨论串清楚地表明，用户希望在运行任何清理之前，就能选择保留、导出会话记录，并拥有恢复路径。
- **无人值守会话的长期权限** —— 定时任务和远程控制会话会卡在每次运行的权限询问上，没有任何途径授予持续有效的工具族权限（[#83166](https://github.com/anthropics/claude-code/issues/83166)、[#81036](https://github.com/anthropics/claude-code/issues/81036)）。
- **Agent View 与远程控制的准确生命周期状态** —— 按真实完成状态排序/筛选（[#80244](https://github.com/anthropics/claude-code/issues/80244)）、如实上报存活状态（[#80311](https://github.com/anthropics/claude-code/issues/80311)），以及后台会话的凭据连续性（[#77973](https://github.com/anthropics/claude-code/issues/77973)）。
- **VSCode 扩展支持自托管/本地网关** —— 遵循 `ANTHROPIC_BASE_URL`/`ANTHROPIC_API_KEY`，同时不强制要求登录（[#84852](https://github.com/anthropics/claude-code/issues/84852)）。
- **CLI 易用性** —— 允许在确认单选提示时附带备注（[#78553](https://github.com/anthropics/claude-code/issues/78553)）；让 `--verbose` 不改变 JSON 输出结构（[#84784](https://github.com/anthropics/claude-code/issues/84784)）。

## 7. 开发者痛点

- **静默数据丢失与破坏性清理。** 保留逻辑清除会话记录（[#59248](https://github.com/anthropics/claude-code/issues/59248)）、自动批准会话期间工作目录之外的文件被删除（[#84107](https://github.com/anthropics/claude-code/issues/84107)）、安装器移除正常工作的 npm 全局安装（[#26175](https://github.com/anthropics/claude-code/pull/26175)）——全都指向同一个主题：工具在用户不知情、未同意的情况下销毁用户数据。
- **渲染出的会话记录并非真实记录。** 不可见的助手文本（[#67051](https://github.com/anthropics/claude-code/issues/67051)）和幽灵用户消息（[#84679](https://github.com/anthropics/claude-code/issues/84679)）让开发者无法审计模型实际被告知了什么、实际又说了什么。
- **静默失败与状态失同步。** 消息在没有任何报错的情况下被丢弃（[#76382](https://github.com/anthropics/claude-code/issues/76382)）、远程会话看似存活却从不应答（[#80311](https://github.com/anthropics/claude-code/issues/80311)）、后台进程认证失败（[#77973](https://github.com/anthropics/claude-code/issues/77973)、[#79511](https://github.com/anthropics/claude-code/issues/79511)、[#77678](https://github.com/anthropics/claude-code/issues/77678)）。
- **网络不稳定且错误信息不透明。** ECONNRESET 重试循环（[#68092](https://github.com/anthropics/claude-code/issues/68092)、[#84456](https://github.com/anthropics/claude-code/issues/84456)）和远程控制桥接在约 1.3 秒后便永久放弃（[#81036](https://github.com/anthropics/claude-code/issues/81036)）都缺少机器可读的失败状态，使得无人值守使用变得十分脆弱。
- **护栏误报不断叠加恶化。** 安全过滤器会对良性的跨多文件内容或法律内容触发误报，并随上下文累积不断升级，甚至在用户试图讨论这次误报时再次触发（[#74295](https://github.com/anthropics/claude-code/issues/74295)、[#84313](https://github.com/anthropics/claude-code/issues/84313)、[#84821](https://github.com/anthropics/claude-code/issues/84821)）。
- **模型指令遵从是反复出现（虽然噪音较大）的抱怨点。** stale 清理关闭了一大批充满挫败感的报告——agent 无视用户的明确纠正、“核心记忆”和 STOP 命令，或跨多轮坚持错误的解决方案（[#84759](https://github.com/anthropics/claude-code/issues/84759)、[#84760](https://github.com/anthropics/claude-code/issues/84760)、[#84842](https://github.com/anthropics/claude-code/issues/84842)、[#84779](https://github.com/anthropics/claude-code/issues/84779)、[#92742](https://github.com/anthropics/claude-code/issues/92742)）。虽然信噪比不高，但这个数量说明上下文保留与纠错处理值得在评测中重点关注。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-08

## 今日亮点

最新版本是又一个 Rust alpha 预发布版：`rust-v0.154.0-alpha.6`，不过没有附带详细变更日志。社区关注焦点仍然集中在反复出现的速率限制/容量账户状态问题，以及桌面端会话/历史记录缺陷上；Windows 特有的沙箱和进程生命周期问题也引发了较多讨论。工程方面，一大批 PR 相继落地，涉及 TUI 语音/UX 改进、可配置的应用服务器守护进程更新、用户验证 RPC，以及保留多代理 fork 上下文等方面。

## 版本发布

- [rust-v0.154.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.6) — 以 `0.154.0-alpha.6` 版本发布。数据中未提供更多发布说明或变更日志细节。

## 热门 Issue

- [openai/codex#26867](https://github.com/openai/codex/issues/26867) — **从 Business 工作区迁移到 Personal Pro 账户后，GitHub PR 审查仍在使用已停用的工作区** *（已关闭；29 条评论，15 👍）*。这是本周期内评论最多的问题，也说明 Codex 驱动的 PR 审查在工作区/认证选择上仍然非常脆弱。

- [openai/codex#18918](https://github.com/openai/codex/issues/18918) — **Windows 沙箱对 `writable_roots` 中的 `.git` 目录应用 DENY ACL，导致 git 提交失败** *（15 条评论，6 👍）*。这是一个 Windows 上痛点很突出的缺陷：沙箱权限会直接阻止正常的 git 操作在可写项目根目录中执行。

- [openai/codex#31322](https://github.com/openai/codex/issues/31322) — **用量额度今早恢复正常，但傍晚又出现回退，消耗速度再次快了约 5 倍** *（14 条评论）*。用户认为这是系统性的速率限制计量故障，而不是一次性的偶发峰值。

- [openai/codex#32707](https://github.com/openai/codex/issues/32707) — **Pro 账户：5 小时用量桶从 Codex App 和 `account/rateLimits/read` 中消失** *（12 条评论，3 👍）*。对重度 Pro 用户来说，失去对短期速率限制窗口的可见性会让会话规划变得困难。

- [openai/codex#43337](https://github.com/openai/codex/issues/43337) — **尽管每周额度完全可用，多个 Codex 模型仍出现账户级容量错误** *（10 条评论）*。这是当前影响 `gpt-6-astra` 和 `gpt-5.6-luna` 低推理档位的容量/速率限制问题。

- [openai/codex#41399](https://github.com/openai/codex/issues/41399) — **完全重置本地配置文件后，已删除的 ChatGPT 会话仍留在侧边栏中** *（12 条评论，12 👍）*。这是多份“幽灵会话”报告之一；配置文件重置本应清除本地状态，因此社区反应强烈。

- [openai/codex#28361](https://github.com/openai/codex/issues/28361) — **Windows：`codex mcp-server`/应用服务器及其子 MCP 服务器进程从未被回收** *（8 条评论，3 👍）*。每个请求都可能泄漏进程，直到累积到数百个；这是 Windows MCP 用户面临的严重资源生命周期问题。

- [openai/codex#43124](https://github.com/openai/codex/issues/43124) — **macOS 桌面端历史记录在较早轮次处冻结：projection 预期 ordinal 3185，实际得到 3184** *（8 条评论）*。长时间会话即使数据仍存在于 rollout JSONL 中，也可能从可见历史中丢失较新的轮次。

- [openai/codex#32513](https://github.com/openai/codex/issues/32513) — **个人用户有一个无法删除的“Default templates”插件，被标记为管理员安装/默认安装** *（8 条评论，13 👍）*。高 👍 数反映出用户对非受管工作区中强制存在/无法删除的插件状态的不满。

- [openai/codex#35925](https://github.com/openai/codex/issues/35925) — **一次 $210 会话的未缓存成本中，提示缓存未命中占 94%；计数器无法区分缓存与未缓存用量** *（4 条评论）*。对于依赖提示缓存的 API/Azure 用户来说，这是一个严重的成本可观测性缺口。

## 主要 PR 进展

- [openai/codex#43581](https://github.com/openai/codex/pull/43581) — **为 TUI 添加实时 WebRTC 语音对话**。引入受功能开关控制的 `/voice`、`/voice mute` 和 `/voice stop` 命令，并支持实时转录和麦克风/扬声器电平显示。

- [openai/codex#43576](https://github.com/openai/codex/pull/43576) — **在 TUI 中将相邻的计算机操作分组显示**。将相邻的 `cua_repl` 调用渲染为紧凑的“Using computer”/“Used computer”分组，并展示操作次数、失败情况及截图预览。

- [openai/codex#43603](https://github.com/openai/codex/pull/43603) — **在 TUI 中补上遗漏的 tmux 尺寸变化通知**。在 Unix 上新增后台尺寸监视器，每 500 ms 检测一次终端尺寸变化。

- [openai/codex#43558](https://github.com/openai/codex/pull/43558) — **在 TUI 轮次成功后显示完成时间戳**。用 `done 2:32 PM` 这类弱化显示的元数据取代水平分隔线。

- [openai/codex#43572](https://github.com/openai/codex/pull/43572) — **让受管应用服务器的关闭宽限期可配置**。在守护进程设置中新增 `shutdownGraceSeconds`。

- [openai/codex#43562](https://github.com/openai/codex/pull/43562) — **新增显式的应用服务器守护进程更新命令**。即使自动更新已禁用，`codex app-server daemon update` 也会检查一次最新稳定版。

- [openai/codex#43542](https://github.com/openai/codex/pull/43542) — **让应用服务器守护进程的自动更新可配置**。新增 `updater.autoUpdateEnabled` 和 `updater.updateIntervalMinutes` 偏好设置。

- [openai/codex#43568](https://github.com/openai/codex/pull/43568) — **将应用服务器用户验证 RPC 接入原生 provider**。实现了真实的状态检查/注册/删除/质询签名流程，而不是返回“unavailable”；基于 [openai/codex#43547](https://github.com/openai/codex/pull/43547) 中的 provider 抽象构建。

- [openai/codex#43545](https://github.com/openai/codex/pull/43545) — **保留 fork 的运行时版本，无需加载完整模型上下文**。在 fork 截止点恢复多代理运行时信息时，避免昂贵的上下文重新加载。

- [openai/codex#43540](https://github.com/openai/codex/pull/43540) — **在轮次截止点 fork 时保留多代理版本**。修复了在首个轮次之前 fork 会丢失源会话所选多代理运行时版本的问题。

## 热门讨论

### 想法

- [openai/codex discussion #9618](https://github.com/openai/codex/discussions/9618) — **“怎么会没有 /rewind 或 /revert 功能？”** *（20 条评论，119 👍）*。这是本期摘要中最强烈的产品信号：用户希望 Codex 会话拥有完善的撤销/回退能力，并以 Claude Code 和 OpenCode 为例。

- [openai/codex discussion #7366](https://github.com/openai/codex/discussions/7366) — **引用被 gitignore 忽略的文件** *（2 条评论，7 👍）*。用户希望通过 `@` 引用被 gitignore 忽略的文件来提供上下文，而不必强制提交这些文件。

- [openai/codex discussion #37611](https://github.com/openai/codex/discussions/37611) — **通过签名企业工单实现对更高能力 Codex 模型的受治理访问** *（2 条评论）*。这是一份来自企业终端用户的治理提案，该用户对前沿模型的能力阈值表示担忧。

### 综合

- [openai/codex discussion #7782](https://github.com/openai/codex/discussions/7782) — **弃用 Codex 对 `chat/completions` 的支持** *（14 条评论，21 👍）*。这是一场围绕从 `chat/completions` 迁移到 Responses API 的重要 API 迁移讨论。

### 展示与分享

- [openai/codex discussion #43532](https://github.com/openai/codex/discussions/43532) — **DoneAudit — 在信任“done”之前验证 AI 证据**。该工具会先检查测试、必需检查项和源代码证据，然后才会接受编码代理的“已完成”声明。

- [openai/codex discussion #43427](https://github.com/openai/codex/discussions/43427) — **Blume.codes — 将编码代理会话转化为规则与技能**。其构建目的是减少代理漂移。

- [openai/codex discussion #43598](https://github.com/openai/codex/discussions/43598) — **deja-vu — 回溯 Codex 及其他代理写入磁盘的会话**。可读取 Codex、Claude Code、Cursor、opencode、Amp 等工具写入本地的 rollout/会话文件。

- [openai/codex discussion #41157](https://github.com/openai/codex/discussions/41157) — **CodexFuse 1.2.0 — Codex 速率限制的本地 Windows 仪表盘**。这是针对速率限制可见性痛点的社区工具。

## 功能请求趋势

- **会话撤销/回退是最受期待的方向。** `/rewind` 或 `/revert` 的讨论帖获得 119 👍。开发者希望可以直接回滚轮次，而不必在每次变更后都手动提交（[#9618](https://github.com/openai/codex/discussions/9618)）。

- **速率限制的透明度与自助控制。** 用户希望获得可排队/可兑换的累积重置额度（[#32218](https://github.com/openai/codex/issues/32218)）、缓存与未缓存 Token 成本的可见性（[#35925](https://github.com/openai/codex/issues/35925)），以及短期速率限制窗口的一致可见性（[#32707](https://github.com/openai/codex/issues/32707)）。

- **更顺手的文件/上下文引用方式。** 支持在不提交这些文件的情况下引用 gitignore 忽略的文件（[#7366](https://github.com/openai/codex/discussions/7366)）。

- **企业治理控制。** 对更高能力模型的访问需要签名工单或类似的准入机制（[#37611](https://github.com/openai/codex/discussions/37611)）。

## 开发者痛点

- **速率限制与容量计量仍是最普遍的挫败感来源。** 额度恢复正常后又再次回退（[#31322](https://github.com/openai/codex/issues/31322)），速率限制用量桶无故消失（[#32707](https://github.com/openai/codex/issues/32707)），每周额度仍有富余却出现容量错误（[#43337](https://github.com/openai/codex/issues/43337)），累积的重置额度也可能在未经明确确认的情况下被消耗（[#41801](https://github.com/openai/codex/issues/41801)）。

- **桌面端历史/侧边栏状态并不可靠。** 在 macOS 和 Windows 上，已删除的会话会以幽灵条目形式残留（[#41399](https://github.com/openai/codex/issues/41399)、[#41987](https://github.com/openai/codex/issues/41987)、[#43613](https://github.com/openai/codex/issues/43613)）；长会话历史可能冻结，或在错误的序号处恢复（[#43124](https://github.com/openai/codex/issues/43124)、[#43142](https://github.com/openai/codex/issues/43142)）。

- **Windows 的进程与沙箱生命周期问题仍在不断出现。** MCP/应用服务器/Node 子进程会不断累积（[#28361](https://github.com/openai/codex/issues/28361)、[#38614](https://github.com/openai/codex/issues/38614)）；沙箱 ACL 可能导致 git 提交失败（[#18918](https://github.com/openai/codex/issues/18918)），或在项目文件夹归 `BUILTIN\Administrators` 所有时出现问题（[#31414](https://github.com/openai/codex/issues/31414)）。

- **API 用户的成本可观测性不足。** 提示缓存未命中可能主导一次会话的未缓存成本，但现有计数器无法区分缓存与未缓存用量（[#35925](https://github.com/openai/codex/issues/35925)）。

- **桌面端自主/浏览器控制仍存在信任缺口。** 关闭应用内最后一个 Browser Use 标签页可能导致应用崩溃（[#43347](https://github.com/openai/codex/issues/43347)）；自动化可能在可见面板仍为空白时控制隐藏的浏览器会话（[#22678](https://github.com/openai/codex/issues/22678)）；处于锁定状态的 Computer Use 并不总能被远程中断（[#33471](https://github.com/openai/codex/issues/33471)）。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## 今日要点

过去 24 小时里，Gemini CLI 项目一直在滚动处理积压的智能体可靠性与沙箱安全工作，期间发布了新的 v0.60.0 夜间版，一批由机器人分流的问题也转入了 `need-retesting` 状态。社区最主要的痛点依然是智能体挂起与误导性的成功报告——尤其是子智能体在超出 `MAX_TURNS` 后退场，却被记录为 `GOAL` 成功。PR 方面最受关注的是文件系统沙箱加固：两个大型开放 PR 将主机凭据与容器沙箱隔离开来，另有一个已关闭的安全 PR 把已停止维护（EOL）的 Node 20 运行时从沙箱镜像中移除。

## 版本发布

- **[v0.60.0-nightly.20260907.g85aca163f](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260907.g85aca163f)** — 自动发布的夜间版，无面向用户的变更日志。与上一个夜间版的差异参见 [完整变更日志](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260906.g85aca163f...v0.60.0-nightly.20260907.g85aca163f)。

## 热点问题

- **[#22323 — 达到 MAX_TURNS 后子智能体退出被报告为 GOAL 成功，掩盖了中断](https://github.com/google-gemini/gemini-cli/issues/22323)** (P1 · bug · 13 条评论，👍 2)  
  `codebase_investigator` 子智能体在达到轮次上限后，即使没有执行任何分析，也会上报 `status: "success"` 和 `Termination Reason: "GOAL"`。这是一个严重的信任/正确性问题：父智能体和用户无法将真正的完成与中断区分开。维护者已将其移入 `need-retesting`，说明修复可能已经在推进中。

- **[#21409 — 通用智能体挂起](https://github.com/google-gemini/gemini-cli/issues/21409)** (P1 · bug · 8 条评论，👍 8)  
  用户报告，只要 `gemini-cli` 把任务转交给通用智能体，就会“永远”挂起——哪怕只是创建文件夹这种琐碎操作——最长可等一小时。目前已知的唯一规避方法是让模型绝不使用子智能体。很高的 👍 数说明影响面相当广。

- **[#19873 — 利用零依赖 OS 沙箱与执行后意图路由，发挥模型对 bash 的亲和性](https://github.com/google-gemini/gemini-cli/issues/19873)** (P2 · enhancement · 9 条评论，👍 1)  
  提议让 Gemini 3 在零依赖的操作系统沙箱中发挥其原生 POSIX 工具技能，并通过执行后意图路由保障用户安全。这是当前多个沙箱加固 PR 对应的设计层议题，也反映出维护者打算把智能体执行引向何方。

- **[#22745 — 评估 AST 感知的文件读取、搜索和映射的影响](https://github.com/google-gemini/gemini-cli/issues/22745)** (P2 · epic · 7 条评论，👍 1)  
  该 Epic 用于追踪 AST 感知工具能否降低轮次消耗和 token 噪音（精确到方法边界的读取、更完善的代码库映射）。社区讨论相当活跃，因为 token 膨胀依然是长时间智能体会话中主要的成本痛点之一。

- **[#21968 — Gemini 对技能和子智能体的使用不够充分](https://github.com/google-gemini/gemini-cli/issues/21968)** (P2 · bug · 6 条评论)  
  虽然多为经验之谈，但许多人都能对号入座：只要没有显式强制，模型就不会使用自定义技能和子智能体，哪怕它们高度相关（例如已有 `gradle`/`git` 技能可用）。这是智能体“自我编排”能力的核心缺口，让用户配置的工作流价值大打折扣。

- **[#26525 — 增加确定性脱敏并减少 Auto Memory 日志输出](https://github.com/google-gemini/gemini-cli/issues/26525)** (P2 · security · 5 条评论)  
  Auto Memory 会在任何脱敏提示执行前，先把本地会话记录内容发送给提取模型——也就是说，机密在脱敏之前就已进入模型上下文。它还可能在日志中记录技能取值。社区正推动在发送前进行确定性脱敏，并削减日志噪音。

- **[#25166 — Shell 命令执行完成后卡在“Waiting input”](https://github.com/google-gemini/gemini-cli/issues/25166)** (P1 · core · 4 条评论，👍 3)  
  简单的非交互式 CLI 命令执行完毕后，界面仍将其显示为活动状态并提示“Waiting input”，必须手动介入。这是一个核心 shell 可靠性缺陷，会卡住长时间无人值守的运行。

- **[#21983 — 浏览器子智能体在 Wayland 下失败](https://github.com/google-gemini/gemini-cli/issues/21983)** (P1 · bug · 4 条评论，👍 1)  
  浏览器子智能体在 Wayland 下未完成任务即以 `Termination Reason: GOAL` 终止——又一次假成功上报，只不过这次与显示服务器有关。Linux/Wayland 用户无法依赖浏览器自动化。

- **[#20079 — `~/.gemini/agents/filename.md` 符号链接无法被识别为智能体](https://github.com/google-gemini/gemini-cli/issues/20079)** (P2 · bug · 4 条评论)  
  符号链接形式的智能体定义文件会被静默忽略。这会让 dotfile 管理器和基于符号链接的配置工作流失效，也让自定义智能体的版本管理更加困难。

- **[#21335 — `/compress` 命令在恢复会话后不会保留](https://github.com/google-gemini/gemini-cli/issues/21335)** (P2 · bug · 2 条评论，👍 2)  
  `/compress` 会在内存中汇总历史，但不会把摘要写回磁盘上的会话文件，因此恢复会话时加载的仍是完整原始历史——省 token 的功能形同虚设。该问题 👍 数远高于评论数，说明大量用户虽未发声但都深受其扰。

## 关键 PR 进展

- **[#29214 — fix(sandbox): 加固文件系统边界，隔离运行时状态](https://github.com/google-gemini/gemini-cli/pull/29214)** (open · L)  
  将主机目录挂载替换为清洗后的只读配置文件，在路径敏感性检查中解析符号链接，并将容器环境与主机状态解耦。这是让沙箱成为真正安全边界的重要一步。

- **[#29216 — fix(cli): 在沙箱容器中隔离设置目录](https://github.com/google-gemini/gemini-cli/pull/29216)** (open · L)  
  此前，沙箱容器会直接挂载主机的 `~/.gemini` 目录——包括 OAuth token 与账户凭据都会一并进入容器。该 PR 改为挂载一份清洗后的配置。这是一项重要的凭据暴露修复。

- **[#28973 — fix(sandbox): 将沙箱镜像从已 EOL 的 node:20-slim 升级到 node:22-slim](https://github.com/google-gemini/gemini-cli/pull/28973)** (closed · P1 · XS)  
  Node 20 已于 2026 年 4 月结束生命周期（EOL），不再获得安全修复。改动小且精准，正是沙箱需要的依赖卫生。

- **[#28972 — fix(core): 让 formatTruncatedToolOutput 对非正数 maxChars 做防护](https://github.com/google-gemini/gemini-cli/pull/28972)** (closed · P1 · S)  
  当 `maxChars` 缺失或为非正数时，避免产生损坏的截断工具输出——负的预算会产生非法切片，进而破坏模型上下文。

- **[#28971 — fix(core): 保持截断后的 MCP 工具名唯一](https://github.com/google-gemini/gemini-cli/pull/28971)** (closed · P2 · M)  
  过长的 MCP 工具名被截断为首尾各 30 个字符后不再是单射：两个首尾相同的工具名会坍缩为同一个注册条目。该修复解决了重度 MCP 配置中静默发生的工具注册冲突。

- **[#28975 — fix(core): 修复符号链接工作区根目录下 glob 结果丢失的问题](https://github.com/google-gemini/gemini-cli/pull/28975)** (closed · P2 · M)  
  当工作区根目录经由符号链接访问时，`glob` 会返回“No files found”——比如 macOS 上 `/tmp` 就是指向 `/private/tmp` 的符号链接，任何在 `/tmp` 下打开的项目默认都会命中这一情况。

- **[#28983 — fix(core): 检测混合行尾，而不是仅凭单个匹配就标记 CRLF](https://github.com/google-gemini/gemini-cli/pull/28983)** (closed · P2 · M)  
  旧的 `detectLineEnding()` 只要在文件中发现一个 `\r\n` 就会把整个文件判定为 CRLF。本次修复可识别混合行尾，避免做出错误的整文件重写决策。

- **[#29239 — fix(cli): 防止窄宽度下幽灵文本换行导致死循环](https://github.com/google-gemini/gemini-cli/pull/29239)** (open · P2 · S · help wanted)  
  修复某个单词宽度超过终端输入宽度时 `getGhostTextLines` 陷入死循环的问题。场景不大，但对使用窄窗格的用户来说是一个实打实的挂起。

- **[#29237 — fix: 修复 list_background_processes 对被信号终止的进程打印 (Exit Code: null) 的问题](https://github.com/google-gemini/gemini-cli/pull/29237)** (open · P3 · S)  
  展示层修复：进程因信号而非数字退出码被终止时，不再输出误导性的 `(Exit Code: null)`。

- **[#29134 — fix(cli): 保护当前会话，防止被删除](https://github.com/google-gemini/gemini-cli/pull/29134)** (open · P2 · M)  
  通过仅匹配预期的短 ID 文件名后缀，避免用户通过 `--delete-session` 意外删除当前活动会话。针对一个令人后怕的故障模式的小型安全修复。

## 功能需求趋势

纵观积压议题，几个清晰的功能方向已经浮现：

- **沙箱化、有安全边界的执行。** 围绕 #19873（bash 亲和力 + 零依赖 OS 沙箱）、#29214/#29216（文件系统隔离）与 #22672（劝阻破坏性的 `git reset` / `--force` 行为）的议题群表明，社区希望让模型使用原生 shell 技能，同时避免模型接触主机凭据或发起不可逆操作。
- **AST 感知且省 token 的代码工具。** #22745 与其配套议题 #22746 提议基于 AST 完成文件读取/搜索/映射；#19561（“Tactful Extraction”）与 #18836（基于文件的任务跟踪）则面向同一个根源问题：长时间编码会话中的上下文漫灌与 token 膨胀。
- **更好的智能体自编排与可观测性。** 用户希望模型真正用上技能和子智能体（#21968）、通过 `/chat share` 暴露子智能体的运行轨迹（#22598）、并在 `/bug` 报告中纳入子智能体上下文（#21763）。
- **Auto Memory 加固。** 四个 P2 议题（#26516、#26522、#26523、#26525）都指向 Auto Memory 流水线：发送前脱敏、隔离无效收件箱补丁、停止对低信号会话的重试。
- **面向高级用户环境的健壮性。** 相关诉求涵盖 Wayland 下的浏览器支持（#21983）、可感知符号链接的智能体发现（#20079）、以及超多工具数量（#24246：工具数一旦超过 128 个/触及 API 限制，就会返回 400 错误）的支持。

## 开发者痛点

- **挂起与虚假/缺失的终态。** 这类问题最常以三连形态出现：通用智能体无限挂起（#21409）、shell 命令执行完却卡在“Waiting input”（#25166）、交互式提示（比如 `vite` 脚手架）永远等不到结果（#22465）。
- **中断被包装成成功。** 子智能体 `MAX_TURNS` 退出被上报为 `GOAL` 成功（#22323），浏览器智能体在 Wayland 下什么都没干就宣告“完成”（#21983）——这些问题都在侵蚀用户对智能体结果的信任。
- **Windows/CRLF 项目中的行尾符 bug。** 为了修复 CRLF 误判导致的整文件 diff 和文件类型误判，一共需要三个不同 PR（#28983、#29131、#29132）——足以说明社区在这件事上反复踩坑。
- **混乱的文件系统行为。** 模型会把临时编辑脚本写到各种随机目录（#23571），偶尔还会动用破坏性命令（#22672），逼用户收拾残局，也让用户工作面临风险。
- **配置与会话的可移植性缺口。** 符号链接形式的智能体文件被静默忽略（#20079），`/compress` 摘要也会在恢复会话时丢失（#21335）——吃亏的正是那些配置组织良好并纳入版本控制的用户。
- **终端 UX 回退。** 幽灵文本换行死循环（#29239）、调整窗口大小时闪烁（#21924）、游离的 `\n` 转义问题（#22466），以及误导性的后台进程 `(Exit Code: null)` 输出，都在拉低交互体验。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区文摘 — 2026-09-08

## 今日亮点

过去 24 小时内没有发布新版本。当前问题以 Copilot CLI 1.0.83 与 Desktop 应用 1.1.15 的回归为主：会话恢复可能中断进行中的 MCP 连接，Azure MCP 的 `learn=true` 调用从约 0.2 秒退化为 180 秒超时，空闲工作区还会阻塞 Desktop 中 Local 会话的创建。此外，即使账户中不存在任何托管策略，一个故障关闭（fail-closed）的托管策略 bug 也会禁用 `--yolo` / `--allow-all`，会话与 MCP 的可靠性由此成为社区当前的主要痛点。

## 热门问题

1. **故障关闭的绕过限制导致无托管策略的账户无法使用 `--yolo` / `--allow-all`**  
   [Issue #4757](https://github.com/github/copilot-cli/issues/4757)  
   每次交互式启动时，CLI 都会采取故障关闭姿态，禁用绕过权限模式——即使托管策略并不存在。该限制在会话的整个生命周期内都不会解除。开发者实际上没有遇到任何策略故障，却失去了 `--yolo` 模式。目前已有 3 条评论，可能还会吸引更多关注。

2. **Windows：创建新的 Local 会话之前必须先归档项目中的所有空闲会话**  
   [Issue #4756](https://github.com/github/copilot-cli/issues/4756)  
   在 Desktop 应用 1.1.15 中，用户必须先归档空闲会话，然后才能在项目中创建新的 Local 会话。这严重干扰了正常的分支/并行会话工作流。报告窗口期内获得 7 个 👍，可见影响范围之广。

3. **会话恢复会取消正在进行中的 stdio MCP 服务器连接**  
   [Issue #4753](https://github.com/github/copilot-cli/issues/4753)  
   恢复会话时，仍在初始化中的 MCP 服务器可能会被取消，导致它们在本次会话的剩余时间内静默不可用。据报道，超时时间从 v1.0.82 的约 16 秒缩短到了 v1.0.83 的约 1 秒。对于重度依赖 MCP 的工作流来说，这是一个明显的回归。

4. **CLI 1.0.83-5 中 Azure MCP 的 `learn=true` 调用在 180 秒后超时**  
   [Issue #4749](https://github.com/github/copilot-cli/issues/4749)  
   在 v1.0.80 下约 0.2 秒即可完成的 Azure MCP 分层发现调用，现在会稳定地触发 180 秒超时。直接子命令调用仍然正常，因此回归范围被隔离在 `learn=true` 上。

5. **Desktop 应用 1.1.15：已有 Local 分支会话在运行时无法再创建第二个**  
   [Issue #4742](https://github.com/github/copilot-cli/issues/4742)  
   当 CLI 进程仍在运行时，用户尝试创建第二个 Local 会话会收到 `This project already has an active Local workspace` 的错误提示。7 条评论表明这已对并行会话工作流产生了实际影响。

6. **MCP OAuth：非第一方 HTTP 服务器会取消宿主 token，且永远不会启动浏览器授权流程**  
   [Issue #4017](https://github.com/github/copilot-cli/issues/4017)  
   配置为 `"type": "http"` 的远程 MCP 服务器（如 Atlassian 或 incident.io）会静默认证失败。没有弹窗、没有错误提示，也无法重连。已被分类为认证/MCP bug；获得 3 个 👍。

7. **项目/仓库级作用域的 Copilot CLI 插件**  
   [Issue #1665](https://github.com/github/copilot-cli/issues/1665)  
   插件目前按用户安装并全局加载，导致难以实现针对具体仓库/项目的插件。该 issue 现已关闭，但它是本窗口期内信号最强的一项，获得 18 个 👍 和 14 条评论，反映出社区对作用域化插件配置的持续需求。

8. **排队通道消息在轮次结束时到达会导致会话永久卡死**  
   [Issue #4755](https://github.com/github/copilot-cli/issues/4755)  
   会话可能永久卡死——既非空闲也非运行状态——唯一的恢复办法是杀死进程。这是一个严重的会话状态 bug，很可能会让运行长时会话的用户感到十分沮丧。

9. **扩展启动失败后工具调用会一直挂起**  
   [Issue #4670](https://github.com/github/copilot-cli/issues/4670)  
   如果扩展在报告就绪之前在 `joinSession()` 内失败，CLI 仍会继续提供其自定义工具，但由于处理器永远不会执行，调用将永久挂起。这对任何构建或使用基于扩展的工具的人来说都非常重要。

10. **`ask_user` 表单：过早按 Enter 会提交/取消并永久丢弃已输入的内容**  
    [Issue #4738](https://github.com/github/copilot-cli/issues/4738)  
    这是一个导致数据丢失的 UX bug：如果过早按下 Enter，用户撰写的大量内容将无法恢复。报告者建议增加草稿自动保存/恢复，并将 Enter 视为换行符。

## 主要 PR 进展

过去 24 小时内仅有两个拉取请求被更新或创建，因此以下涵盖了全部可用的 PR 动态。

1. **实验性 next-action 扩展原型**  
   [PR #4746](https://github.com/github/copilot-cli/pull/4746)  
   在 `examples/next-best-action/` 下添加了一个需要主动启用的实验性 SDK 扩展示例，位于扩展自动发现范围之外。它通过 `joinSession()` 和无工具 UI 事件流复用现有前台会话，为模型推断的下一步操作提供了参考实现，且无需修改已安装的 CLI。

2. **“Add joke cli”**  
   [PR #4748](https://github.com/github/copilot-cli/pull/4748)  
   没有提供任何描述或细节。这看起来属于低信号/非实质性 PR 活动，而非有意义的代码变更。

## 功能请求趋势

- **项目与仓库级作用域配置**  
  获赞最多的主题是将插件和配置的作用域限定到仓库/项目，而非某个单一用户。参见 [Issue #1665](https://github.com/github/copilot-cli/issues/1665)。与此相关，通过 `--add-dir` 加载的自定义 agent 应能与顶层 `--agent` 标志一起使用。参见 [Issue #4752](https://github.com/github/copilot-cli/issues/4752)。

- **会话作用域与工作区组织**  
  用户希望按仓库/解决方案过滤会话标签页和 `/resume` 列表，而不是查看跨所有仓库的每个会话。参见 [Issue #4693](https://github.com/github/copilot-cli/issues/4693)。多仓库集合工作区还需要正确处理混合的默认分支。参见 [Issue #4709](https://github.com/github/copilot-cli/issues/4709)。

- **生产级 MCP 支持**  
  多个 issue 都指向 MCP 加固需求：支持取消请求（[Issue #4759](https://github.com/github/copilot-cli/issues/4759)）；在会话恢复期间保持进行中的连接不中断（[Issue #4753](https://github.com/github/copilot-cli/issues/4753)）；保留 OAuth `initialize` 请求上的自定义标头/User-Agent（[Issue #4681](https://github.com/github/copilot-cli/issues/4681)）；修复失效的非第一方 OAuth 流程（[Issue #4017](https://github.com/github/copilot-cli/issues/4017)）。

- **会话生命周期可靠性**  
  用户明确期待更可预测的会话行为：删除被驱逐的会话应真正持久化（[Issue #4754](https://github.com/github/copilot-cli/issues/4754)）；队列消息不应导致会话卡死（[Issue #4755](https://github.com/github/copilot-cli/issues/4755)）；Desktop 用户应能并发运行多个 Local 会话（[Issue #4742](https://github.com/github/copilot-cli/issues/4742)、[Issue #4756](https://github.com/github/copilot-cli/issues/4756)）。

- **输入与表单安全**  
  用户希望在信息收集表单中获得更好的输入保护，包括自动保存/恢复和更安全的 Enter 处理。参见 [Issue #4738](https://github.com/github/copilot-cli/issues/4738)。国际化键盘支持也仍然是一个反复出现的问题，例如在德语键盘上输入 `@`。参见 [Issue #1999](https://github.com/github/copilot-cli/issues/1999)。

## 开发者痛点

- **MCP 回归与认证脆弱性**  
  MCP 服务器会因恢复超时而静默不可用（[Issue #4753](https://github.com/github/copilot-cli/issues/4753)）；Azure `learn=true` 请求超时（[Issue #4749](https://github.com/github/copilot-cli/issues/4749)）；OAuth 之后自定义标头/User-Agent 丢失（[Issue #4681](https://github.com/github/copilot-cli/issues/4681)）；非第一方 OAuth 流程永远不会打开浏览器（[Issue #4017](https://github.com/github/copilot-cli/issues/4017)）。

- **Desktop 的 Local 会话阻塞问题**  
  活跃或空闲的 Local 会话会阻止创建新的 Local 会话，用户必须归档这些会话才能继续并行工作。参见 [Issue #4742](https://github.com/github/copilot-cli/issues/4742) 和 [Issue #4756](https://github.com/github/copilot-cli/issues/4756)。

- **策略与权限的不可预测性**  
  一个故障关闭的托管策略 bug 会在不存在任何托管策略时依然禁用 `--yolo` / `--allow-all`，且该限制会持续到整个会话结束。参见 [Issue #4757](https://github.com/github/copilot-cli/issues/4757)。

- **状态损坏与静默数据丢失**  
  会话可能永久卡死（[Issue #4755](https://github.com/github/copilot-cli/issues/4755)）；删除被驱逐的会话可能静默无效，无法从 `data.db` 中级联删除（[Issue #4754](https://github.com/github/copilot-cli/issues/4754)）；误按 Enter 可能导致 `ask_user` 输入被永久丢弃（[Issue #4738](https://github.com/github/copilot-cli/issues/4738)）。

- **扩展与插件边界 bug**  
  扩展启动失败会留下损坏的自定义工具，调用时直接挂起（[Issue #4670](https://github.com/github/copilot-cli/issues/4670)）；`--agent` 无法识别通过 `--add-dir` 加载的自定义 agent（[Issue #4752](https://github.com/github/copilot-cli/issues/4752)）；按用户全局加载插件的机制也让项目级作用域的工作流难以实现（[Issue #1665](https://github.com/github/copilot-cli/issues/1665)）。

- **平台与输入问题**  
  在 Windows 上，若 pid 文件被删除而进程仍然存活，可能发生语音服务器死锁（[Issue #4740](https://github.com/github/copilot-cli/issues/4740)）；TUI 即使空闲也可能占用大量 CPU（[Issue #4750](https://github.com/github/copilot-cli/issues/4750)）；非美式键盘布局在输入 `@` 等重要字符时存在困难（[Issue #1999](https://github.com/github/copilot-cli/issues/1999)）。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区文摘 — 2026-09-08

## 今日亮点

发布方面是平静的一天——过去 24 小时内没有新版本发布——但社区讨论在两个方向上颇为热烈：获赞最多的开放请求（147 👍）依然是 **官方 VS Code 扩展**（`#11176`），而付费 Go/Zen 层的可靠性在经历持续数小时的 **HTTP 429 宕机**以及多起会话永久卡死的报告后正受到严密审视。与此同时，8 月 7 日"automated-pr-cleanup"队列中的一大批 PR 被标记为已关闭，表明 TUI、console 和 provider 路由修复的大规模整合已经落地。

## 版本发布

过去 24 小时内无新版本发布。

## 热门 Issue

1. **[#11176 — [功能请求]：OpenCode 官方 VS Code 扩展](https://github.com/anomalyco/opencode/issues/11176)** — 获得支持最多的开放功能请求（147 👍，29 条评论，已开放 7 个多月）。社区希望 OpenCode 能在 VS Code 内原生运行，而非通过各种变通方案；持续的参与度表明用户对 IDE 原生工作流有强烈需求。

2. **[#47613 — Go 订阅：2026-09-06 HTTP 429 宕机；要求补偿](https://github.com/anomalyco/opencode/issues/47613)** — 一位付费 Go 订阅用户记录了 `opencode.ai/zen/go/v1/messages` 端点持续数小时的宕机，并反复收到 `retry-after` 响应。除技术故障本身外，明确的补偿请求也将商业服务的可靠性问题摆在了维护者面前。

3. **[#43199 — Mistral 的 GLM-5.2 工具调用报错](https://github.com/anomalyco/opencode/issues/43199)** — 通过 `mistral` provider 使用 GLM-5.2（Mistral 托管的第三方智谱模型）时，文本响应正常，但工具调用失败。这与各 provider 相互托管对方模型的整体趋势相关；8 👍 表明影响范围较广。

4. **[#43277 — 正常使用中会话永久卡死，重启后依旧](https://github.com/anomalyco/opencode/issues/43277)** — 即使完全重启系统和服务器，会话仍拒绝接受新消息。疑似状态机/持久化 bug；卡死状态在重启后依然存在，这一点对日常使用者来说尤其具有破坏性。

5. **[#37580 — SSE 流中途静默断开，导致会话/子代理永久挂起](https://github.com/anomalyco/opencode/issues/37580)** — 子代理在运行中途冻结，OpenAI/Codex 路径上没有默认的 `chunkTimeout`；唯一的出路是中断整个会话，而这会杀死所有子代理。根本原因可能出在流式客户端而非模型本身。

6. **[#27303 — 面向 VSCode Copilot 的 Go/Zen BYOK provider 扩展](https://github.com/anomalyco/opencode/issues/27303)** — 这是 #11176 的姊妹请求：在 VS Code Copilot 中将 OpenCode 的 Go/Zen 网关用作自定义 BYOK 语言模型 provider。与社区对编辑器集成的诉求相一致。

7. **[#42938 — Go 套餐用量达 100% 后阻塞 12 小时；$39.89 Zen 余额从未被使用](https://github.com/anomalyco/opencode/issues/42938)** — 一位 Go 订阅用户报告称，当月度套餐配额耗尽时，文档（`opencode.ai/docs/go/`）中描述的 Zen 余额回退机制根本不会触发。这是直接影响收入的计费/配额逻辑 bug。

8. **[#45011 — CLI/TUI 会话从未出现在 Web Home 中](https://github.com/anomalyco/opencode/issues/45011)** — 从 shell（`opencode run`、TUI、agents）创建的会话在 Web 仪表盘中不可见，因为项目注册表驻留在浏览器端。这指向了各客户端之间的架构性不一致。

9. **[#47545 — Auto 模式导致重复的虚假权限通知](https://github.com/anomalyco/opencode/issues/47545)** — 在 Auto 模式下，即使权限已自动批准且无需用户输入，终端中仍会弹出权限提示。批准发生在客户端，但此时服务器已经发出了 `permission` 事件——这是一个削弱无人值守模式信任度的 UX bug。

10. **[#47634 — Console Go 在配额未用尽时持续出现 rate_limit_exceeded](https://github.com/anomalyco/opencode/issues/47634)** — 每次请求都会触发限流错误，而用量仪表盘显示用量仅为 6% / 57% / 23%；自动重试同样失败。结合 #47613，这表明问题更可能出在 Go console 内部的配额计算不准确，而非真正的客户端过载。

## 关键 PR 进展

1. **[#47858 — feat(updates): serve updates under opencode.ai/update](https://github.com/anomalyco/opencode/pull/47858)** — 维护者主导的变更，将更新 Worker 部署到 `opencode.ai/update` 并支持本地制品 AUR 发布，可能是在为下一次更新通道发布做准备。

2. **[#47859 — fix(session-ui): align retry icon with label](https://github.com/anomalyco/opencode/pull/47859)** — 移除了重试 spinner 变为警告图标后遗留的 spinner 专属顶部偏移，并添加了组件几何回归测试。改动虽小，但表明 UI 测试成熟度在提升。

3. **[#47835 — fix(app): keep tab progress visible on hover](https://github.com/anomalyco/opencode/pull/47835)** — 移除了 `revealProjectOnHover` 选项，在会话忙碌时始终渲染进度指示器，避免忙碌会话在未悬停时看起来像是空闲状态。

4. **[#41135 — feat(app): add message timeline navigation strip](https://github.com/anomalyco/opencode/pull/41135)** — 实现了长会话消息导航的紧凑变体（Refs #32999）：采用 DeepSeek Web 风格的串珠式导航条而非完整侧边栏，解决了一个顶级的导航痛点。

5. **[#41132 — fix(acp): emit plan updates for todos](https://github.com/anomalyco/opencode/pull/41132)** — 将 OpenCode 的 `todo.updated` 事件映射为 ACP `session/update` 消息，附带 `sessionUpdate: "plan"`，使 ACP 客户端能够实时跟踪 todo/plan 状态。

6. **[#41130 — fix(console): preserve anthropic tool names](https://github.com/anomalyco/opencode/pull/41130)** — 修复了 Anthropic `/messages` → OpenAI 兼容 `/chat/completions` 转换过程中工具定义被丢弃或损坏的问题。直接改善了 `Console` 用户的互操作性。

7. **[#41128 — fix(console): normalize root composition tool schemas](https://github.com/anomalyco/opencode/pull/41128)** — 规范化传入的 OpenAI 兼容 schema，其根节点使用 `oneOf`/`anyOf`/`allOf` 对象分支但缺少顶层类型，解决了一类工具 schema 校验失败问题。

8. **[#41100 — fix(opencode): enforce per-target task subagent permissions](https://github.com/anomalyco/opencode/pull/41100)** — 使按目标配置的 `task` 权限规则（例如仅允许 `explore`）成为模型尝试调用被禁止的子代理目标时的硬性运行时边界——这是一个与安全相关的修复。

9. **[#41111 — feat(core): Snowflake Cortex OAuth login for V2](https://github.com/anomalyco/opencode/pull/41111)** — V2 已支持通过 PAT/env 认证使用 Snowflake Cortex；此 PR 补充了 V1 支持的浏览器 OAuth 登录路径，弥合了功能差距（Closes #34780）。

10. **[#41104 — feat(provider): discover local model context limits](https://github.com/anomalyco/opencode/pull/41104)** — 为本地/LAN OpenAI 兼容 provider 增加了一条窄路径发现机制，当所配置模型缺少 `limit.context` 时自动发现上下文限制，减少本地模型用户的手动配置负担。

## 功能请求趋势

- **编辑器与 IDE 集成是主导主题。** 官方 VS Code 扩展（#11176）在所有 issue 中获得的反应数遥遥领先，Copilot BYOK provider 扩展（#27303）与之相辅相成。像"在 Cursor 中使用 OpenCode 无效"（#47842）这类已关闭 issue 表明，用户越来越希望获得由 OpenCode 驱动的 Codex/Copilot 风格的侧边面板。
- **暴露 OpenAI 兼容接口的需求持续出现。** 相关请求从将本地 `opencode serve` 暴露为 OpenAI 兼容端点（#31724），到让托管的 Go/Zen 网关可供第三方应用使用（#47820、与 #47834 相关）。PR 队列中的 console 转换修复（#41130、#41128）与该方向一致。
- **面向模型/代理控制的 TUI 与桌面端体验优化：** 在 `/models` 对话框中增加可绑定的"将此设为该代理的默认模型"操作（#47836）、更清晰的 Auto Router 错误/模型状态指示器（#47794），以及 Desktop App 可配置的启动目的地（#47807）。
- **长会话与可观测性 UX：** 消息时间线导航（#32999/PR #41135）和预留的插件数据流/指标面板（#46156）代表着让深入的多小时会话更易于导航和测度方向的努力。

## 开发者痛点

- **会话卡死且无法恢复。** 多份报告描述了永久性忙碌状态：重启后依然"卡死"的会话（#43277）、SSE 流断开导致父会话和子代理永久挂起（#37580）、子代理权限请求被静默丢弃而 `stop`/`interrupt` 无效（#44747）。这是本周严重程度最高的可靠性问题集群。
- **配额与限流行为令人困惑且代价高昂。** 付费订阅用户尽管仪表盘显示用量很低，仍持续遭遇 `rate_limit_exceeded`（#47634）；一次持续数小时的 429 宕机引发了赔偿要求（#47613）；Go 套餐达到上限时文档所述的 Zen 余额回退机制从不生效（#42938）。
- **工具调用与 provider 层不兼容问题。** 通过第三方 provider 代理的模型（Mistral 上的 GLM-5.2）在工具调用时失败（#43199）；工具调用修复可能丢弃未命名调用所需的 `tool` 字段（#47831）；即使直接 SigV4 调用成功，Bedrock 模型也不会被列出（#40663）。
- **Auto 模式的权限 UX 噪声过大。** 即使批准是自动完成的，客户端仍会发出权限通知（#47545），削弱了免干预承诺。
- **客户端/状态一致性问题持续存在。** CLI 会话在 Web Home UI 中不可见（#45011）、Desktop 提供当前活跃 provider 状态中不存在的 OAuth 模型（#47490）、Windows GUI 白屏报告（#23949）、移动端客户端无法列出 API 返回的会话（#47834）——这些都表明多客户端架构仍在追赶 CLI。

---

规则：
- 仅输出翻译。不要前言、不要解释、不要在整个输出周围加 Markdown 围栏。
- 精确保留 Markdown 结构：标题、表格（包括列对齐行）、列表、引用块、粗体/斜体、水平线、表情符号。
- 逐字保留 URL、链接目标、代码跨度、代码块、数字和日期。
- 项目名称、仓库路径、用户名、版本标签、文件路径以及 API/配置标识符保持原样 —— 不要翻译。
- 类似 #12345 的 Issue/PR 引用及其链接文本保持不变。
- 使用自然的技术中文，采用中文开发者通讯稿的语气 —— 而非逐字逐句的直译。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-08

## 今日亮点
一波 provider 兼容性补丁成为主线：GitHub Copilot 的 GPT-6 Astra 路由错误已通过 PR #9253 修复，多名贡献者同时聚焦于 OpenCode Go 新强制执行的 `x-opencode-session` 请求头。架构方面，维护者 mitsuhiko 推进了一项双层改动（#9116、#9117），将会话中途的提示词/工具变更以系统消息增量的方式下发，而非重写顶层提示词。最活跃的社区讨论仍然是长期未决的 openai-codex 连接停滞问题（#4945，77 条评论）以及一项 Windows 使用情况调查（#7547，61 条评论）。

## 版本发布
过去 24 小时内没有发布新版本。

## 热门问题
1. [openai-codex 连接可靠性问题（#4945）](https://github.com/earendil-works/pi/issues/4945) — 77 条评论，👍33。最热门的开放讨论帖：`gpt-5.5` 会话间歇性地使 TUI 卡在 `Working...` 状态，没有流式文本、工具调用或错误返回；需要按 Escape 退出并记录一次中断的回合。报告显示该问题持续多日反复出现，且难以定位。
2. [你在 Windows 上如何使用 Pi？遇到了哪些问题？（#7547）](https://github.com/earendil-works/pi/issues/7547) — 61 条评论。有意征集 Windows 使用报告，以便决定核心修复/文档工作应投入哪些方向，以及哪些应委派给扩展。其中包含大量环境相关的 bug（WezTerm、Node、PTY）。
3. [AgentSession 结算/续接与 assistant-tail 生命周期 bug（#5886）](https://github.com/earendil-works/pi/issues/5886) — 11 条评论，👍4。一类反复出现的运行后 bug 的元问题：续接逻辑读取了过期或已不活跃的 transcript 数据；被标记为需要一次整体性的大修复。
4. [Gemini 3.x 模型在工具调用期间因缺少 thought_signature 而失败（#6996）](https://github.com/earendil-works/pi/issues/6996) — 9 条评论（已关闭）。Gemini 3.x 模型会拒绝历史记录中缺少 `thought_signature` 的工具结果提交；已解决。
5. [流式生成过程中按 Esc 经常无法取消正在进行的请求（#8823）](https://github.com/earendil-works/pi/issues/8823) — 6 条评论。中止操作已记录，但 HTTP 请求会一直运行到 provider 自然结束——在长时间生成过程中造成明显的 UX 困扰。
6. [无法启动 0.84.1：zlib.createZstdDecompress is not a function（#7771）](https://github.com/earendil-works/pi/issues/7771) — 6 条评论（已关闭）。Node 23 用户在 `pi update` 后遇到未处理的 `zlib` 错误；已关闭，无需处理。
7. [OpenRouter :free 模型返回 400 — Pi 发送的 max_tokens 超出 provider 限制（#8760）](https://github.com/earendil-works/pi/issues/8760) — 5 条评论，处理中。Pi 发送的是目录中的 `maxOutputTokens`，超过了上游免费层的硬限制，导致多个 `:free` 模型不可用。
8. [GitHub Copilot GPT-6 Astra 被路由到不受支持的 Chat Completions 端点（#9209）](https://github.com/earendil-works/pi/issues/9209) — 5 条评论（已关闭）。Copilot 对 `gpt-6-astra` 拒绝 `/chat/completions` 请求；已由 PR #9253 修复，GPT 模型改走 Responses 端点。
9. [Bedrock：OpenAI 模型拒绝嵌套在 toolResult.content 中的图片（#8643）](https://github.com/earendil-works/pi/issues/8643) — 5 条评论。贡献者 YuvalSarel1 已在 fork 上准备好修复及回归测试：将工具结果中的图片提升到同级用户内容块中。
10. [EventStream 在排空缓冲事件时存在二次方 CPU 开销（#9055）](https://github.com/earendil-works/pi/issues/9055) — 4 条评论。长时间运行的 agent-loop 服务会遭遇 O(n²) 开销，因为每次出队时 `shift()` 都会移动剩余数组；有人提议改用真正的队列。

## 关键 PR 进展
1. [fix(ai)：将 Copilot GPT 模型改经 Responses 端点路由（#9253）](https://github.com/earendil-works/pi/pull/9253) — 修复 #9209，将 Copilot GPT 模型（包括 `gpt-6-astra`）改经 Responses 端点发送。已合并。
2. [feat(ai)：增加会话中途系统消息支持（#9116）](https://github.com/earendil-works/pi/pull/9116) — mitsuhiko 对 #8998 拆分后的第一层：让 pi-ai 能够在会话中途携带 system 角色消息而不破坏 coding agent。
3. [feat(coding-agent)：以系统消息增量方式下发提示词和工具变更（#9117）](https://github.com/earendil-works/pi/pull/9117) — 第二层，基于 #9116 堆叠：将重写顶层提示词改为通过系统消息增量来下发提示词和工具配置变更。
4. [feat(coding-agent)：确认设备码浏览器与剪贴板操作（#9301）](https://github.com/earendil-works/pi/pull/9301) — 对 #9282 的选择性回归：在用户确认的前提下，尽力打开验证页面并复制用户代码，用于设备码登录。
5. [fix(ai)：移除无效的 Fable 5 回退目标（#9297）](https://github.com/earendil-works/pi/pull/9297) — 从 Fable 5 的内置回退列表中移除 `claude-opus-4-8`（API 现在以 400 拒绝该模型），仅保留 Opus 5；同时覆盖生成的元数据。
6. [feat(coding-agent)：新增手动重试 API/命令（#9292）](https://github.com/earendil-works/pi/pull/9292) — 为自动重试过早放弃或从未尝试恢复的场景增加手动重试路径。
7. [feat(ai)：Ollama Cloud 支持（#7742）](https://github.com/earendil-works/pi/pull/7742) — 使用 `OLLAMA_API_KEY` 提供一等公民的 Ollama Cloud provider 支持，沿用现有 provider 模式和 models.dev 目录。
8. [fix(coding-agent)：修复渲染 diff 时缩进丢失的问题（#9274）](https://github.com/earendil-works/pi/pull/9274) — 修复编辑工具的行内渲染器在删除行前插入文本、其余内容不变时丢失行首空白的问题。
9. [fix(agent)：agentLoop 被拒绝时以错误结果结束流（#9269）](https://github.com/earendil-works/pi/pull/9269) — 为 `agentLoop()` 补充缺失的拒绝处理；同步抛错、OAuth 刷新失败以及 `getApiKey` 被拒绝现在都会以流错误的形式呈现。
10. [docs(coding-agent)：记录在 Docker Sandbox 中运行 pi（#9077）](https://github.com/earendil-works/pi/pull/9077) — 在 `containerization.md` 中新增 Docker Sandboxes 章节和表格行，落实 #8788 中的请求。

## 功能请求趋势
- **Provider 目录与路由准确性**：反复出现的诉求是修复模型元数据而非掩盖症状——OpenRouter `:free` 的 max_tokens 上限（#8760）、Copilot 端点路由（#9209/#9277）、Fable 5 回退列表（#9294）、Grok 错误归属（#9298）。
- **会话/身份体系**：一批 issue 和 PR 跟踪 OpenCode Go 新强制执行的 `x-opencode-session` 请求头（#9230、#9237、#9290），并请求在 Pi 核心中增加基于主机的自动注入。
- **用户对 agent 运行时的控制**：手动重试 API（#9292）、agent 重试退避上限（#8826）、启动时显示区块开关（#9289），以及恢复模型/思考变更的自动持久化（#9273）。
- **性能架构**：用系统消息增量替代提示词重写（#9116/#9117）、替换 EventStream 排空中的 O(n²) 热点路径（#9055）和流式工具调用重复解析（#9063），以及更廉价的模糊搜索（#9267）——这些迹象表明无头/SDK 使用场景正在增长。

## 开发者痛点
- **流式与中止可靠性**：`openai-codex` 会话卡在 `Working...`（#4945）以及 Esc 无法取消进行中的 HTTP 请求（#8823）是最响亮的重复投诉。
- **上游 provider 变动频繁**：破坏性变更持续涌入——OpenCode Go 会话请求头、Copilot 端点限制、Gemini `thought_signature`、OpenRouter 免费层限制以及 Fable 5 回退拒绝，本周全部需要快速补丁循环。
- **Windows 体验不确定性**：61 条评论的调查（#7547）反映出社区对 Pi 官方应支持众多 Windows 运行模式中的哪些感到困惑。
- **服务器/SDK 可扩展性**：无头用户报告在带上下文的 grep 中出现 OOM（#9276）、EventStream 排空呈二次方复杂度（#9055），以及在长时间运行的服务中嵌入 pi-coding-agent 时反复出现的流式参数重复解析（#9063）。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-08

## 1. 今日亮点

过去 24 小时的社区动态以 Web Shell 工作流管理和守护进程/会话可靠性为主。最新 preview 和 nightly 版本新增了动态工作流运行的实时可视化/管理功能，并附带一个相关性能修复；同时两个 P1 问题仍处于开放状态：会话回收期间后台输出被丢弃，以及 Windows `conhost.exe` 泄漏。过去 24 小时约有 49 个 issue 和 50 个 PR 被更新；持续时间最长的讨论仍是计划中的 TUI 从 `ink` 迁移到 OpenTUI，已有 32 条评论。

## 2. 版本发布

- **`v0.23.1-preview.2` 和 `v0.23.0-nightly.20260907.f1ed3bc31a`** 包含：
  - `feat(web-shell)`：动态工作流运行的可视化/管理 —— [#10594](https://github.com/QwenLM/qwen-code/pull/10594)
  - `perf(web-shell)`：以更高效的方式派生会话工作流项目。
- **`cua-driver-rs v0.20.4`**：更新了 Qwen CUA Driver 预构建二进制文件。macOS 构建已完成代码签名和公证；Linux/Windows 二进制文件仍未签名，另含平台特定的部署变更。

## 3. 热门 Issue

1. **[#8662 — Migrate TUI rendering layer from ink to OpenTUI](https://github.com/QwenLM/qwen-code/issues/8662)**  
   该跟踪 issue 的目标是用 OpenTUI 替换经过大量修补的 `ink 7 + React 19` 渲染器。它以 32 条评论成为评论数最高的线程，反映出当前 TUI 技术栈中反复出现的闪烁、渲染开销以及结构性限制。

2. **[#8586 — Track activeWork and recover background Agents](https://github.com/QwenLM/qwen-code/issues/8586)**  
   请求在守护进程健康状态中增加显式的 `activeWork` 状态，并为在其发起提示结束后仍在运行的后台代理提供恢复路径。这是表明 `qwen serve` 下的后台自动化需要更好生命周期可观测性的多个信号之一。

3. **[#11119 — Background shell output and wake notifications silently dropped after session runtime recycle](https://github.com/QwenLM/qwen-code/issues/11119)**  
   一个 P1 守护进程/Web Shell 缺陷：CI 轮询型后台 shell 在轮次结束后继续运行，但当会话运行时被回收后，其输出和唤醒通知不再投递，可能导致会话卡死。8 条评论。

4. **[#11303 — Windows qwen-cli leaks headless conhost.exe / ConPTY processes](https://github.com/QwenLM/qwen-code/issues/11303)**  
   P1 Windows 可靠性问题。VS Code Companion 内嵌 CLI 在约 12 小时后累积了 347 个子进程，占用约 2.8 GB 内存，原因在于无头 `conhost.exe` 进程未被释放。6 条评论。

5. **[#10530 / #10435 — 400 "Failed to initialize samplers" with local llama-server](https://github.com/QwenLM/qwen-code/issues/10530)**  
   多个重复报告指出，在本地 llama-server 上运行的 Qwen 3.8/3.6 现在会启动失败并返回 `400 Failed to initialize samplers: failed to parse grammar`。该回归出现在 0.22.3 中；Pi 和 OpenCode 不受影响，说明问题出在 Qwen Code 与 llama-server 的语法/采样器集成上。

6. **[#3361 — Agent misinterprets non-empty shell output as empty](https://github.com/QwenLM/qwen-code/issues/3361)**  
   `pwd && git rev-parse --show-toplevel` 这类命令可以成功执行并显示输出，但在使用 OpenAI 兼容 API 时，代理却得出“输出为空”的结论。该问题已开放数月，说明这是一个棘手的工具输出解析缺陷。

7. **[#10865 — Web Shell workflow projection derived three times per render](https://github.com/QwenLM/qwen-code/issues/10865)**  
   工作流可视化功能合并后出现的后续性能回归：`SessionWorkflowCockpit.tsx` 每次渲染都会重建 3 次开销昂贵的投影/索引。5 条评论。

8. **[#11272 — Cancelling a long-running stdio MCP tool call kills the server permanently](https://github.com/QwenLM/qwen-code/issues/11272)**  
   在 Channel 部署中，取消长时间运行的 MCP 工具调用会终止 stdio MCP 服务器，且服务器永远不会恢复。对钉钉等交互式卡片工作流而言，这是一个生产环境阻塞问题。3 条评论。

9. **[#11205 — Main filter screen lost six security hardenings](https://github.com/QwenLM/qwen-code/issues/11205)**  
   评审后续指出，`main` 分支的筛选层丢失了对读取顺序、`EACCES`、`U+FFFD`、spawn 超时、候选上限和保留策略的保护。这是多个独立评审流在集成阶段导致安全修复回归的一个典型案例。

10. **[#8835 — Repo-hygiene W33 report-only findings](https://github.com/QwenLM/qwen-code/issues/8835)**  
    机器人生成的安全审计包含 8 项发现，包括 ACP 会话 cwd 检查中的 `..` 包含问题以及 worktree sidecar 包含问题。该审计仅作报告用途，但其中几项发现触及安全敏感的验证路径。

## 4. 关键 PR 进展

1. **[#11206 — feat(mesh): add persistent shared-thread agent collaboration](https://github.com/QwenLM/qwen-code/pull/11206)**  
   新增持久化的工作区级代理身份，用于在共享线程上协作，涵盖分配、插话、结果归属、取消、评审和阻塞解除。

2. **[#11250 — feat(web-shell): Improve split-view session navigation](https://github.com/QwenLM/qwen-code/pull/11250)**  
   完善分屏视图体验：复用侧边栏的会话详情弹出层来展示标题，高亮当前活动面板，并支持通过工具栏在等待工具审批或用户输入的面板之间循环切换。

3. **[#10999 — feat(core): configure model reasoning capabilities](https://github.com/QwenLM/qwen-code/pull/10999)**  
   为 provider 模型定义添加声明式推理能力元数据，并将其贯穿到 ACP、会话恢复、TUI effort 控件以及最终的 OpenAI 兼容请求中。

4. **[#11282 — feat(core): expand `${session_id}` in per-provider customHeaders](https://github.com/QwenLM/qwen-code/pull/11282)**  
   在 `modelProviders[].generationConfig.customHeaders` 中实现了所请求的 `${session_id}` 模板，并按请求进行解析——适用于按会话的路由/网关请求头。

5. **[#10906 — feat(web-shell): show shell and monitor task output](https://github.com/QwenLM/qwen-code/pull/10906)**  
   持久化 shell/monitor 的 stdout 和 stderr，并暴露一个仅限会话所有者的 tail 端点，让 Web Shell 用户可以直接在 UI 中查看所捕获的任务输出。

6. **[#11196 — feat(workflows): journal failed agents and settle agent failures to null](https://github.com/QwenLM/qwen-code/pull/11196)**  
   改进工作流恢复语义：日志现在会区分“已启动并返回”“已中断”和“已失败”的代理，并将失败代理最终置为 `null`，而不是留下模棱两可的进行中状态。

7. **[#11305 — feat(goal): size the checkpoint verifier timeout for a full claim list](https://github.com/QwenLM/qwen-code/pull/11305)**  
   将 Goal 证据检查点验证器的上限从 30 秒提高到 180 秒，并新增可由运维配置的 `model.goalCheckpointTimeoutSeconds` 设置。

8. **[#11304 — fix(goal): count an unanswered checkpoint as a stall](https://github.com/QwenLM/qwen-code/pull/11304)**  
   从不响应的检查点验证器现在会计入检查点停滞上限，即使该验证器没有返回以往常见的溢出形态。作为 #11305 的补充。

9. **[#11315 — fix(serve): fail fast on unsupported target mutations in the CDP tunnel](https://github.com/QwenLM/qwen-code/pull/11315)**  
   守护进程的 CDP WebSocket 隧道此前对无法识别的浏览器级命令返回空成功响应，等于静默“成功”处理了 4 个 target 变更操作。本 PR 让这些操作显式失败。

10. **[#11169 — fix(web-shell): close trust-gate and bystander gaps in the local-files bridge](https://github.com/QwenLM/qwen-code/pull/11169)**  
    作为已合并的 local-files bridge 的后续 PR，包含 4 项最终评审修复，包括显式的“仍在解析中”工作区路由守卫，以及更严格的信任/旁观者检查。

## 6. 功能需求趋势

- **Web Shell / 会话工作流工具**仍是最集中的需求方向：过去 24 小时内出现了动态工作流运行可视化、分屏导航、跨会话轮次导航、shell/monitor 输出可见性等诉求。相关：[#10750](https://github.com/QwenLM/qwen-code/issues/10750)、[#10938](https://github.com/QwenLM/qwen-code/pull/10938)、[#11250](https://github.com/QwenLM/qwen-code/pull/11250)、[#10906](https://github.com/QwenLM/qwen-code/pull/10906)。
- **守护进程后台自动化韧性**：用户希望后台代理获得一流的跟踪与恢复能力、公平的会话回收，并且运行时回收后不再静默丢失输出。相关：[#8586](https://github.com/QwenLM/qwen-code/issues/8586)、[#11119](https://github.com/QwenLM/qwen-code/issues/11119)。
- **自托管语义记忆**：要求内置本地 memory MCP 服务器、或为现有 `MEMORY.md` 自动记忆系统添加基于 embedding 的召回能力的请求正获得更多关注。相关：[#10684](https://github.com/QwenLM/qwen-code/issues/10684)。
- **提供商/后端无关的请求控制**：用户希望实现按会话的请求头模板化、将 `/effort` 转发到 OpenAI 兼容后端，并具备可重试的传输错误处理。相关：[#10995](https://github.com/QwenLM/qwen-code/issues/10995)、[#11227](https://github.com/QwenLM/qwen-code/issues/11227)、[#10347](https://github.com/QwenLM/qwen-code/pull/10347)。
- **TUI 现代化**：OpenTUI 迁移被明确视为路线图级别的终端 UX 投入。相关：[#8662](https://github.com/QwenLM/qwen-code/issues/8662)。

## 7. 开发者痛点

- **本地和 OpenAI 兼容后端依然脆弱**：llama-server 的语法解析回归、`/effort` 未被转发、shell 输出被误读为空，都指向后端无关兼容性方面仍存在缺口。相关：[#10530](https://github.com/QwenLM/qwen-code/issues/10530)、[#11227](https://github.com/QwenLM/qwen-code/issues/11227)、[#3361](https://github.com/QwenLM/qwen-code/issues/3361)。
- **Windows 仍是资源泄漏重灾区**：`conhost.exe`/ConPTY 泄漏报告，以及规范路径问题导致 Windows CI 测试失败，都说明 Windows 专属的进程与路径处理仍需进一步加固。相关：[#11303](https://github.com/QwenLM/qwen-code/issues/11303)、[#11318](https://github.com/QwenLM/qwen-code/pull/11318)。
- **守护进程/会话生命周期语义难以做对**：后台输出丢失、会话无法回收、Channel 所有权缺口等问题表明，`qwen serve` 的会话结算/回收一直是 bug 的多发来源。相关：[#11119](https://github.com/QwenLM/qwen-code/issues/11119)、[#11118](https://github.com/QwenLM/qwen-code/issues/11118)、[#11186](https://github.com/QwenLM/qwen-code/issues/11186)。
- **MCP 工具取消不安全**：取消长时间运行的 stdio 工具可能会彻底杀死 MCP 服务器，并且在 Channel 模式下不会恢复。相关：[#11272](https://github.com/QwenLM/qwen-code/issues/11272)。
- **TUI/渲染性能问题仍是吐槽热点**：Web Shell 界面的闪烁、对齐缺陷以及开销高昂的重复派生，反映出 OpenTUI 迁移之前整个渲染技术栈承受的压力。相关：[#8662](https://github.com/QwenLM/qwen-code/issues/8662)、[#10865](https://github.com/QwenLM/qwen-code/issues/10865)。

---

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*