# AI CLI 工具社区动态日报 2026-09-07

> 生成时间: 2026-09-06 22:45 UTC | 覆盖工具: 7 个

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

# 跨工具 AI CLI 对比报告 — 2026-09-07

## 1. 生态概览

本次调研的七款主流 AI 编码工具都在向同一个现实收敛：自主多 Agent 工作流正成为默认执行模型；这个生态中最难的问题已不再是模型原始能力，而是成本治理、会话可靠性和安全边界。失控的 token 消耗、静默的假成功状态、恢复后安全门禁失效，几乎出现在每个跟踪仓库中——这说明 CLI Agent 从“demo 级”进入生产负载的速度，已经超过了其护栏成熟的进度。各厂商同时也在从终端扩展到桌面应用、受管 worktree、浏览器托管 shell；而 Windows 支持仍是最稳定的短板。在架构层面，格局正在分化为“围在自家模型花园墙内”的客户端（Claude Code、Codex、Gemini、Qwen）和“provider 无关”的集成层（Pi、OpenCode、以及 Copilot CLI 的 ACP 协议），MCP 则正在成为这些组件之间的通用连接层。

## 2. 活跃度对比

这里的数量反映的是各简报中被标记为值得关注的问题/PR/讨论，而不是整个 tracker 的总量。“无”表示当天简报里没有讨论区条目；七个仓库都没有禁用 Issues/PR，所以不涉及 N/A。

| 工具 | 热门 Issues | 值得关注的 PR | 讨论 | 窗口期内版本发布 |
| --- | --- | --- | --- | --- |
| Claude Code | 10 | 10 | 无 | **v2.1.263**（stable） |
| OpenAI Codex | 10 | 10 | 6 | 无 |
| Gemini CLI | 10 | 10 | 无* | **v0.60.0-nightly.20260906** |
| GitHub Copilot CLI | 15（10 个热门 + 5 个次要） | 1（文档） | 无 | 无 |
| OpenCode | 10 | 10 | 无 | 无 |
| Pi | 10 | 10 | 1 | 无 |
| Qwen Code | 10 | 10 | 无 | **v0.23.1-preview.1** + 2 个 nightly |

*Gemini 的简报明确说明，所提供数据中没有包含任何讨论记录。

**表格解读：** Claude Code、Codex、Gemini、OpenCode、Pi、Qwen 都保持较高的每日多 PR 吞吐量，并约有 10 个高信号活跃 Issue。Copilot CLI 是例外——PR 队列几乎静止（只有一个文档型提案），也没有版本发布，尽管它聚集了一批安全与成本敏感的回归问题，说明其开发是集中式（非社区）的。Qwen 和 Gemini 通过 nightly/preview 持续交付；Claude Code 是窗口期内唯一发布稳定版的工具。

## 3. 共性功能演进方向

**硬性花费治理与配额控制** —— 这是整个跨工具诉求中最强烈的一项。Claude Code 用户希望有硬性 token 预算、子 Agent 生成上限与消耗前警告（#90664、#87815、#89964）；OpenCode 需要预算耗尽后重试循环停止（#39790、PR #47686）；Copilot CLI 的 BYOK prompt 缓存失效（成本约为原来的 5 倍，#4720）与 Codex 那则无法解释配额耗尽的追踪 Issue（#41220），都说明模型提供方一侧存在同样的信任赤字。Pi 的 provider 上报成本 PR（#6881）指向修复方向：暴露真实核算，而不是估算值。

**按 Agent 的模型路由与动态推理强度** —— Claude Code 社区要求支持 skill/workflow 级模型覆盖，以及子 Agent 的分层路由（#83717、#87815）；Codex 用户想要 ChatGPT 式“Auto”推理档位（#8649）。两个社区都希望由编排器按任务选择最便宜且够用的模型，而不是继承父会话的高级档位。

**会话/上下文生命周期可靠性** —— Codex 这边最突出的是跨设备会话同步（#14067，61👍）与历史投影失步 bug（#43182）；Gemini 的 `/compress` 在恢复后不生效（#21335）；Copilot 在桌面应用自动更新后报“Worktree missing”（#4734）；OpenCode 修复了删除会话后残留的旧会话引用（PR #47684）。长时间任务的连续性在几乎所有工具中都是系统性短板。

**全供应链安全加固** —— 安全关注点已从模型行为扩展到沙箱语义、插件配置与遥测：Gemini 修复了 `git diff --output=` 沙箱绕过（PR #29184）和 MCP OAuth 签发方缺口（PR #29117）；Claude Code 的插件修复处理了符号链接文件泄露与 shell 注入（PRs #68689、#68786）；Qwen 标记了包含 shell 命令行、未脱敏的遥测（#11198），以及 skill 的 `PreToolUse` 门控在 `--continue` 之后静默失效的问题（#11180）；Copilot 的 ACP 模式回归为自动批准所有工具调用（#4537，#845 的复发）。

**MCP 与 OAuth 健壮性** —— Copilot 的 MCP 服务器存在 OAuth token 缓存条目重复（#4695）；OpenCode 的 MCP 工具 schema 在 Anthropic 下返回 400，且 OAuth metadata 发现逻辑不遵守 RFC 9728（`#46628`、`#44790`）；Gemini 增加了 OAuth 签发方校验；Codex 正在构建能力门控的 MCP 用户验证 API（PRs #43265、#43289）。MCP 的采用速度已经超过了其 auth/schema 的成熟度。

**ACP 与后台任务生命周期语义** —— Copilot 的 ACP 客户端需要确定性的权限执行（#4537）、不得在 `session/prompt` 时无条件中止子 Agent（#4555），以及真正的 session-idle 信号（#4743）；Qwen 希望在一个轮次运行期间支持消息排队（#8542），并能通过 ACP 将任务委派给外部 Agent（PR #11003）。自动化客户端正基于这些协议构建，它们需要可预测的语义。

**Windows 应作为一等平台被对待** —— Windows 专属故障出现在每个仓库中：Claude Code 的桌面窗口置顶（#89467）与插件因 CRLF/反斜杠处理而出错；Codex 的桌面应用启动迁移失败（#40700）与沙箱状态损坏（#34841）；Pi 的 Windows 支持缺口（#7547，55 条评论）；Copilot 的 31 GB WSL2 RSS（#4694）；Qwen 的 Windows 沙箱参数（PR #29184）。Windows 质量已成为竞争差异点。

## 4. 差异化分析

| 工具 | 定位 | 目标用户 | 技术方向 |
| --- | --- | --- | --- |
| **Claude Code** | Anthropic 原生的 Agent 平台，插件/skills 生态最深；桌面端 + CLI 双界面 | 在专有模型上运行自主多 Agent 工作流的高阶开发者 | workflow/skills 编排；可扩展性是护城河（单日 10 个社区插件 PR）；当前正在治理它所开启的“扇出”式运行带来的治理问题 |
| **OpenAI Codex** | 产品形态扩展最快的工具：统一 ChatGPT/Codex 桌面端、语音、受管 TUI worktree、服务端会话状态 | 终端重度用户，以及桌面/消费级 ChatGPT 用户 | 客户端/服务端会话架构（projection 序号、OAuth 轮换）；OS 级产品野心（语音管线、桌面宠物）；MCP 用户验证契约 |
| **Gemini CLI** | Google 的 Agent 核心，优先可靠性与安全 | 需要确定性沙箱执行与强默认模型的开发者 | Nightly 发布节奏、有纪律的 P1 分流；Auto Memory 管线、检查点健壮性、沙箱 shell 一致性 |
| **GitHub Copilot CLI** | 作为 GitHub Copilot 平台的集成资产，而非独立社区项目 | GitHub 为中心的开发者、企业/BYOK/GHEC 部署、ACP 自动化构建者 | 协议面（ACP）+ 企业合规；PR 贡献几乎停滞；开发集中化 |
| **OpenCode** | Claude Code 的独立开源 TUI 替代品——provider 无关，插件钩子架构 | 想要开源可定制性 + BYO 模型的开发者 | TypeScript/配置驱动插件；MCP 与 Claude 约定互操作；商业“Go”订阅层 |
| **Pi** | 通用多 provider 编码 Agent——高性能客户端，路由至 Codex、Copilot、OpenRouter、Anthropic 等 | 多 provider 用户，基础设施思维的开发者 | 基础设施优先工程：DNS 解析、重试上限、跨 provider fallback、缓存断点利用；扩展 API 正在活跃迭代 |
| **Qwen Code** | 模型厂商工具，正在演化为浏览器托管的生产级工作空间 | Qwen 模型用户，以及想要 IDE 式会话体验的团队 | 以 WebShell 为主要界面：workflow DAG 可视化、上下文用量面板、gzip transcript 加载、移动端支持；将 ACP 透传给外部 Agent |

## 5. 社区活力与成熟度

**Claude Code** 拥有最成熟、最经受过生产环境考验的生态：其 Issue 空间已经从“能不能跑起来”转向“我们怎么治理它”；插件社区稳定地提交安全与兼容性修复。成本事件的规模（审查 5 个文件耗掉 1.1M tokens；一个会话烧光整周配额）说明它已被真实地用于企业级规模——而平台尚未能安全承载这种使用方式。

**OpenAI Codex** 展现了最高的工程迭代速度：一个窗口期内有 10 个实质 PR，涵盖受管 worktree、语音音频路由和实验性 API，同时拥有社区功能请求支持度最高的议题（61👍 跨设备同步）。它是产品野心最大的工具，但桌面可靠性事故（启动失败、宠物无法点击、composer 消失）说明平台扩张速度超过了产品打磨速度。

**Gemini CLI** 体现了纪律性很强的维护：P1 标签 Issue、nightly 构建和快速安全修复（Windows 沙箱、OAuth 签发方）都能在 24 小时内落地。但核心可靠性债仍未还清：通用 Agent 挂死（#21409）和子 Agent 假成功报告（#22323）仍是未关闭 P1，说明稳定化仍在进行中。

**Qwen Code** 相对其简报规模而言功能发布最快（WebShell 可视化、gzip transcript、上下文面板），但发布流程不稳定（两次超时、#11109 中重复的 CI 工作）和多个未关闭的 P1 安全问题，使其势头打了折扣。

**Pi** 是单位社区规模下响应最快的：三条 Issue（#9242、#9244、#9209）从上报到修复都在当天完成，其中一条从功能诉求到代码落地只花了一天。它的社区更小但参与度很高，而拥有 76 条评论的 openai-codex freeze 问题（#4945）是它最痛的未愈伤口。

**OpenCode** 保持着稳定的贡献流，并在建立商业牵引力（付费订阅）；但计费/限流事故（#47613、#45278）和拥有 129 条评论、121👍 的复制粘贴阻塞问题（#4283），说明产品成熟度和基础设施扩展仍落后于用户增长。

**GitHub Copilot CLI** 相对于其代码贡献面而言，用户社区最活跃——15 个值得注意的 Issue，包括反复出现的安全回归——但 PR 队列几乎静止。长期 Issue 的关闭（#827、#4527）说明内部工作确实在推进；但回归模式（#4537 由 #845 复发、#4720 中静默的 BYOK 成本破坏）表明，其发布治理是外部开发者无法完全观察或影响的。

## 6. 趋势信号

1. **成本治理是企业采用的第一大阻碍。** 所有具备自主扇出能力的工具，都有用户报告配额被烧光、静默继承高级模型档位或重试风暴。平台应提供的功能包括：硬性预算、消耗前预警、按 Agent/任务进行模型路由，以及程序化用量核算——而不是事后“算完即弃”的数字。

2. **静默的假成功状态是新的可靠性前沿。** 子 Agent 在达到轮次上限后报告 `GOAL success`（Gemini #22323）；HTTP 200 之后发生 SSE 错误仍被报告为成功（Qwen #11217）；ACP 在后台工作完成前就发出 `end_turn`（Copilot #4743）。下一阶段的可靠性标准是诚实、机器可读的终态与失败传播。

3. **安全边界必须绑定到完整的会话生命周期。** skill 的 `PreToolUse` hooks 在 `--continue` 之后停止触发（Qwen #11180）；ACP 的自动批准被静默回退（Copilot #4537）；来自不可信仓库的插件配置可能导致符号链接逃逸或 shell 注入（Claude PRs #68689/#68786）。仓库提供的配置、hooks 和 skills 必须在每一个会话入口都被视为不可信输入。

4. **Windows 支持是竞争战场。** 每款主流工具都有 Windows 专属的 P1 问题，涵盖桌面启动、沙箱完整性、路径规范化与资源占用。把 Windows 当作一等平台对待的团队，将赢得目前只能围着故障打补丁的企业/大型组织用户。

5. **多 provider 抽象正从加分项变成核心需求。** 需求涵盖 BYOK 缓存正确性（Copilot #4720）、provider 故障转移跳数（Pi #9242）、OpenRouter adapter 语义（Pi #9165）以及自动模型档位选择（Claude #83717、Codex #8649）。开发者希望在不受供应商锁定的前提下，获得成本感知的路由和协议兼容性（Responses API、SSE）。

6. **桌面/IDE 融合正在重新定义“CLI 工具”。** Codex 在桌面应用中加入语音与宠物；Qwen 正在构建浏览器托管的 WebShell IDE；Claude Code 发布了桌面应用；OpenCode 与 Pi 在 TUI 渲染保真度上持续投入。终端不再是唯一界面——但目前每一个新界面都以功能差距上线，并在社区中造成不成比例的大量噪音。

对开发者和技术决策者来说，实际建议是：优先选择有显式消费护栏和按任务路由模型的工具；审查任何不暴露真实用量核算的工具；把 Agent hooks 和仓库提供的配置都视为安全相关；在投入前验证 Windows 支持；同时预期 ACP/MCP 协议语义仍会变动——锁定版本，并针对权限与生命周期变更测试自动化客户端。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code 技能社区亮点 — 数据截至 2026-09-07

*来源：github.com/anthropics/skills。排名依据仓库中按评论数排序的列表；状态取自源数据中明确的 [OPEN]/[CLOSED] 标记。*

## 1. 热门技能排名

**1. skill-creator 评估流水线修复 — [#1298](https://github.com/anthropics/skills/pull/1298)**  
该系列中讨论度最高的 PR。它修复了 `skill-creator` 的 `run_eval.py`——该脚本对每条技能描述都报告 `recall=0%`，进而静默污染了 `run_loop.py` 与 `improve_description.py` 所消费的信号。修复方案将评估产物安装为真正的技能，并解决了 Windows 流读取、触发器检测和并行 worker 等问题。相关讨论锚定于 [Issue #556](https://github.com/anthropics/skills/issues/556)，已有 10+ 次独立复现。**状态：Open**（创建于 6 月 10 日，更新于 6 月 23 日）。相关的 Windows 修复 [#1099](https://github.com/anthropics/skills/pull/1099) 与 [#1050](https://github.com/anthropics/skills/pull/1050) 也证实了这是一个影响广泛的痛点。

**2. document-typography 技能 — [#514](https://github.com/anthropics/skills/pull/514)**  
拟新增的 AI 生成文档排版质控技能：孤词换行、孤立段落标题、编号错位。其核心在于，这些缺陷几乎出现在 Claude 生成的每一份文档中，而用户很少明确要求排版修正。**状态：Open**（创建于 3 月 4 日，更新于 3 月 13 日）。

**3. scnet-hpc 技能 — [#1615](https://github.com/anthropics/skills/pull/1615)**  
用于通过基于 profile 的 SSH 与 Slurm 工作流操作 SCNet HPC 集群的新技能，涵盖分区/内存/模块指导、Slurm 作业生成和计算节点发现。这是一个专业化但规格清晰的基础设施领域技能。**状态：Open**（创建于 8 月 20 日，更新于 8 月 24 日）。

**4. pdf 大小写敏感修复 — [#538](https://github.com/anthropics/skills/pull/538)**  
修复 `skills/pdf/SKILL.md` 中 8 处大小写不一致的文件引用（`REFERENCE.md` → `reference.md`，`FORMS.md` → `forms.md`），这些引用会导致技能在大小写敏感的文件系统上失效。一个纯机械性修复却带来了不成比例的讨论量，暴露出围绕随附文档技能的评审摩擦。**状态：Open**（创建于 3 月 6 日，更新于 4 月 29 日）。

**5. ODT 技能 — [#486](https://github.com/anthropics/skills/pull/486)**  
新增 OpenDocument 支持：创建、填充、读取和转换 `.odt`/`.ods` 文件，包括模板填充与 ODT→HTML 解析，并面向 “ODT/ODS/ODF/OpenDocument/LibreOffice” 提供触发器。与现有 docx/pdf 技能家族高度契合。**状态：Open**（创建于 3 月 1 日，更新于 4 月 14 日）。

**6. frontend-design 清晰度改进 — [#210](https://github.com/anthropics/skills/pull/210)**  
对 `frontend-design` 技能的一次修订，目标是让每条指令都可在单次对话中落地执行，且足够具体以引导行为，又不过度约束输出。本质上是对现有技能的可用性大修，而非新技能。**状态：Open**（创建于 1 月 5 日，更新于 3 月 7 日）。

**7. skill-quality-analyzer & skill-security-analyzer — [#83](https://github.com/anthropics/skills/pull/83)**  
两个面向技能市场的元技能：一个五维质量分析器（结构/文档、示例、资源等）与一个安全分析器。代表了社区向“审计其他技能的社区工具”方向的早期推进。**状态：Open**（创建于 2025 年 11 月 6 日，更新于 2026 年 1 月 7 日）。

**8. docx tracked-change `w:id` 冲突修复 — [#541](https://github.com/anthropics/skills/pull/541)**  
修复 DOCX 技能向带有现有书签的文件添加修订时所导致的文档损坏：OOXML 在书签/评论/移动范围之间共享同一个 `w:id` 空间，而该技能硬编码的小 ID 会与之冲突。这是对重度使用的随附文档技能的一次正确性关键修复。**状态：Open**（创建于 3 月 6 日，更新于 4 月 16 日）。

*值得注意：前 8 名的活跃内容中有一半是 bug 修复与加固，而非新能力——社区的注意力在“新增更多技能”与“让已发布的技能值得信赖”之间一分为二。*

## 2. 社区需求趋势

从活跃度最高的 Issues 中提炼：

- **信任边界安全与来源追溯** — [Issue #492](https://github.com/anthropics/skills/issues/492)（43 条评论）是目前讨论度最高的 Issue：在 `anthropic/` 命名空间下分发的社区技能冒充官方技能，并为权限滥用打开了方便之门。需求：经过核验的发布者来源护栏。
- **可靠的创作工具链与无误判评估** — [Issue #556](https://github.com/anthropics/skills/issues/556)（12 条评论，👍7）与 [Issue #62](https://github.com/anthropics/skills/issues/62)（10 条评论）显示，创作者受阻于技能无故消失、评估框架报告 0% 触发率。需求：稳定、跨平台的技能工具链。
- **组织级共享与干净安装** — [Issue #228](https://github.com/anthropics/skills/issues/228)（16 条评论，👍8）请求组织级技能共享；[Issue #189](https://github.com/anthropics/skills/issues/189)（👍9，为 👍 数最高者）指出 `document-skills` 与 `example-skills` 插件安装了完全相同的内容。需求：共享基础设施与去重打包。
- **用于质量、治理与记忆效率的元技能** — [Issue #412](https://github.com/anthropics/skills/issues/412)（agent 治理安全模式）、[Issue #1385](https://github.com/anthropics/skills/issues/1385)（三闸门推理质量流水线）、[Issue #1329](https://github.com/anthropics/skills/issues/1329)（紧凑记忆的符号化记法）以及 [Issue #202](https://github.com/anthropics/skills/issues/202)（skill-creator 最佳实践）都指向同一个需求：能够审计 AI 输出并节约上下文的技能。
- **上下文预算纪律** — [Issue #1487](https://github.com/anthropics/skills/issues/1487)：`claude-api` 技能一上来就在一次工具调用中注入约 156k token，将上下文消耗殆尽。需求：精简的技能载荷与懒加载。
- **平台覆盖** — [Issue #29](https://github.com/anthropics/skills/issues/29)（在 AWS Bedrock 中使用）与 [Issue #16](https://github.com/anthropics/skills/issues/16)（将 Skills 暴露为 MCP）反映出对更广泛运行时兼容性的需求。
- **文档/格式质量** — 排版质控（[#514](https://github.com/anthropics/skills/pull/514)）、ODT 支持（[#486](https://github.com/anthropics/skills/pull/486)）以及大小写敏感/文档损坏修复（[#538](https://github.com/anthropics/skills/pull/538)、[#541](https://github.com/anthropics/skills/pull/541)）共同表明，文档格式技能正在经历一轮成熟化推进。

## 3. 高潜力的待合并技能

活跃中的 PR（尚未合并），可能很快就会落地：

- **document-typography** — [#514](https://github.com/anthropics/skills/pull/514)。Open。面向生成文档的排版质控。
- **odt** — [#486](https://github.com/anthropics/skills/pull/486)。Open。OpenDocument 创建/填充/转换，与 pdf/docx 互补。
- **scnet-hpc** — [#1615](https://github.com/anthropics/skills/pull/1615)。Open。通过 SSH + Slurm 进行 HPC 集群运维。
- **servicenow** — [#568](https://github.com/anthropics/skills/pull/568)。Open，评审周期异常长（3 月 8 日 → 8 月 12 日）。ServiceNow 平台覆盖面广：ITSM/ITOM/ITAM/FSM/HRSD/SecOps/CSDM/IntegrationHub。
- **testing-patterns** — [#723](https://github.com/anthropics/skills/pull/723)。Open。单元/React/e2e 测试理念与模式。
- **self-audit** — [#1367](https://github.com/anthropics/skills/pull/1367)。Open。机械式文件验证外加四维推理质量闸门。
- **hivemind** — [#1628](https://github.com/anthropics/skills/pull/1628)。Open。零成本多代理委派，将任务分发给运行在免费模型上的无头 opencode worker。
- **buffer-api** — [#1627](https://github.com/anthropics/skills/pull/1627)。Open（更新于 9 月 5 日）。GraphQL 社交帖子排程，可跨代理移植。
- **skill-quality/security-analyzer 市场新增** — [#83](https://github.com/anthropics/skills/pull/83)。Open。用于技能 QA 的元工具。

## 4. 技能生态洞察

社区在技能层面最集中的需求是**可信、可验证、上下文高效的技能**——安全的来源追溯与命名空间完整性、消除误判评估以让创作者能够验证自身工作、去重分发，以及审计输出质量的元技能——这一切都叠加在一个持续扩展的文档格式与企业平台技能库之上。

---

# Claude Code 社区摘要 — 2026-09-07

## 今日焦点
成本治理是本周社区最关心的话题：一系列报告记录了自主多智能体工作流中失控的 token 消耗——用户在一次会话中就耗尽了整周订阅配额，直到触顶限额才收到警告。与此同时，一批插件可靠性与安全修复（Windows 路径处理、shell 注入、符号链接逃逸）在 security-guidance、hookify 与 ralph-wiggum 插件中持续推进。v2.1.263 已发布，带来常规 bug 修复与可靠性改进。

## 版本发布
- **v2.1.263** — 常规 bug 修复与可靠性改进，变更日志中没有功能变更或破坏性说明。

## 热门问题
1. [**Windows：应用窗口始终置顶且无法禁用**](https://github.com/anthropics/claude-code/issues/89467) — *[OPEN] bug, platform:windows, area:desktop* — 桌面应用将窗口强制置于所有其他窗口之上，且没有任何设置或快捷键可以更改。这是当前获得最多认同的未解决问题（14 👍、16 条评论），说明这是大范围的 Windows UX 回归问题，而非边缘个案。

2. [**Opus 4.8 在长时间会话中虚构用户消息、编造"提示注入攻击"叙事并捏造工具/主机事实**](https://github.com/anthropics/claude-code/issues/67606) — *[CLOSED] bug, platform:linux, area:model* — 两个经独立验证的 JSONL 追踪会话显示出严重的幻觉问题：凭空捏造的用户消息、编造的提示注入叙事，以及虚假的工具/主机事实。被标记为 stale 后关闭，但其 16 条评论反映出人们对模型可靠性的持续担忧。

3. [**订阅 token 可用时，API 请求仍消耗个人 token 配额**](https://github.com/anthropics/claude-code/issues/64613) — *[OPEN] bug, platform:macos, area:cost* — 用户反映在订阅 token 用量为 0% 的情况下，个人 API token 仍被计费。计费归属错误会迅速侵蚀信任，而该问题已经持续数月未关闭。

4. [**Workflow code-review 过度消耗 token（5 个文件消耗 1.1M+）并返回空结果**](https://github.com/anthropics/claude-code/issues/77943) — *[OPEN] bug, area:cost, area:skills* — `code-review` 工作流审查五个小文件竟消耗了超过 110 万 token，且频繁返回 null/空结果。这是成本与产出价值完全不匹配的典型案例。

5. [**security-guidance: 第 3 层 agentic 提交审查默认开启且无预算，token 用量被计算后即被丢弃**](https://github.com/anthropics/claude-code/issues/85421) — *[OPEN] area:plugins* — 该插件默认在每次提交时触发一次 agentic LLM 调用（某批次 77 次审查消耗 `~200k` token），且本地无法查看成本。用户希望将其改为默认关闭，并公开用量统计。

6. [**并行子代理集群静默继承会话模型档位——一晚耗尽整周 Fable + Opus 配额**](https://github.com/anthropics/claude-code/issues/87815) — *[OPEN] bug, area:cost, area:agents* — 并行生成的子代理继承了父会话的高级模型档位，而没有路由到更经济的模型，数小时内即耗尽整周配额。用户要求支持显式的子代理模型路由或自动降档。

7. [**长时间运行的会话静默消耗数十亿 token，命中支出/会话限额时没有任何警告**](https://github.com/anthropics/claude-code/issues/89964) — *[OPEN] bug, platform:windows, area:cost, area:desktop* — 在触达硬性支出/会话限额之前没有任何递进式警告。结合 #87815，这表明长时间运行的 agentic 会话中系统性地缺少主动支出防护机制。

8. [**OAuth token 轮换后，后台/工作流子代理全部返回 401，而父会话刷新成功**](https://github.com/anthropics/claude-code/issues/84273) — *[OPEN] bug, area:agents* — 子代理在生成时捕获 OAuth token，因此父会话刷新 token 后，所有进行中的后台/工作流代理开始全部返回 401。这会以难以排查的方式破坏长时间运行的工作流。

9. [**可用内存尚有 17.9 GB 时后台任务因"内存不足"被终止（MemFree 与 MemAvailable）**](https://github.com/anthropics/claude-code/issues/92228) — *[OPEN] bug, platform:linux, area:bash* — 终止阈值似乎读取的是 `MemFree` 而非 `MemAvailable`；当存在大量可回收页缓存时，`MemFree` 会接近零。这是一个定位精准且很可能成立的 Linux bug，会误杀合法的后台任务。

10. [**Opus 5 下 `/goal` 在任务完成后无限循环**](https://github.com/anthropics/claude-code/issues/85594) — *[OPEN] bug* — `/goal` 完成了用户任务后不终止，而是无限循环，白白浪费 token。这是针对 Opus 5 报告的值得注意的模型行为回归。

## 关键 PR 进展
1. [**fix(security-guidance): 使 `**` glob 模式匹配零深度路径**](https://github.com/anthropics/claude-code/pull/87079) — *[OPEN]* — 一个细微但涉及安全的修复：由于委托给 `fnmatch`，`**/*.ts` 要求路径中包含字面 `/`，导致顶层文件被静默排除在安全规则之外。安全扫描的静默漏覆盖是最糟糕的失败模式。

2. [**fix(pr-review-toolkit): 修复所有 agent 中无效的 YAML frontmatter**](https://github.com/anthropics/claude-code/pull/87077) — *[OPEN]* — agent 描述中包含带有 `key: value` 对话模式的未加引号标量，YAML 会将其解析为嵌套映射，导致 agent 以空 frontmatter 加载。这是插件以静默方式损坏的典型例子。

3. [**fix(plugin-dev): 通过 stdin 重定向避免 test-hook.sh 中的 shell 注入**](https://github.com/anthropics/claude-code/pull/68786) — *[CLOSED]* — 修复了 hook 测试使用的 `bash -c` 字符串中嵌入 `$TEST_INPUT` 导致的注入问题；参考工具不应示范不安全的模式。

4. [**fix(plugin-dev): 将 hook JSON 输出到 stdout，收紧 su\* glob，修复示例中的 CI 检测与 JSON 注入**](https://github.com/anthropics/claude-code/pull/68785) — *[CLOSED]* — 示例 hook 脚本曾将决策 JSON 写入 stderr（违反 hook 契约），并包含 glob/CI 检测错误。由于示例会成为模板，这一问题至关重要。

5. [**feat(bug-reporter): 新增 `/bug` 命令，从终端直接提交 GitHub issue**](https://github.com/anthropics/claude-code/pull/68707) — *[CLOSED]* — 新增 bug-reporter 插件，提供 `/bug` 斜杠命令，可在 Claude Code 内部直接向仓库提交问题报告。直接改善了催生这些 issue 的反馈闭环。

6. [**fix(security-guidance): 阻止扩展性配置读取中的符号链接逃逸**](https://github.com/anthropics/claude-code/pull/68689) — *[CLOSED]* — 防止恶意仓库将配置文件（`.claude/claude-security-guidance.md`）以符号链接形式指向任意本地文件，例如 `~/.ssh/id_rsa`。这是真实的本地文件泄露修复。

7. [**fix(security-guidance): 在 Windows 上从 Python 版本探测中剥离 CRLF**](https://github.com/anthropics/claude-code/pull/68701) — *[CLOSED]* — Windows 行尾导致版本检查 `[ "$v" = "3" ]` 失败。这是插件生态系统中多个 Windows 兼容性修复之一。

8. [**fix(hookify): 添加 Python 包装器并规范化 Windows 上的插件根路径**](https://github.com/anthropics/claude-code/pull/68699) — *[CLOSED]* — `CLAUDE_PLUGIN_ROOT` 中的反斜杠分隔符破坏了内联 bash hook 脚本；Microsoft Store 的 `python3` 存根在非 TTY 环境下还会返回退出码 49。两个问题均已解决。

9. [**fix(security-guidance): 在 Windows 上规范化 CLAUDE_PLUGIN_ROOT 路径分隔符**](https://github.com/anthropics/claude-code/pull/68694) — *[CLOSED]* — 配套修复，将所有六个 hook 命令中的反斜杠统一转换，让 Windows 用户获得可正常工作的安全 hook。

10. [**fix(scripts): 以附加方式添加重复标签，不替换现有标签**](https://github.com/anthropics/claude-code/pull/68693) — *[CLOSED]* — GitHub 的 PATCH 会替换整个标签集，因此重复关闭流程曾静默擦除 platform/area/priority 标签。这一流程修复保住了分类元数据。

## 功能请求趋势
- **硬性支出治理是排名第一的需求**。用户反复要求提供 token/成本预算、代理创建与并行分发（fan-out）的硬性上限、按任务选择模型档位，以及大额支出前的警告（[#90664](https://github.com/anthropics/claude-code/issues/90664)、[#83717](https://github.com/anthropics/claude-code/issues/83717)、[#87815](https://github.com/anthropics/claude-code/issues/87815)、[#89249](https://github.com/anthropics/claude-code/issues/89249)）。
- **为技能和工作流提供模型/effort 覆盖支持**——既可从 CLI 设置，也可通过技能 frontmatter 设置——以便用户将子代理任务路由到更便宜的模型（[#83717](https://github.com/anthropics/claude-code/issues/83717)、[#83752](https://github.com/anthropics/claude-code/issues/83752)）。
- **桌面应用与 CLI/TUI 功能对齐**：生成期间的停止/中断按钮（[#72489](https://github.com/anthropics/claude-code/issues/72489)）、窗口级控制（[#89467](https://github.com/anthropics/claude-code/issues/89467)），以及在 `remote-control` 启动的会话中支持 Chrome 扩展（[#74671](https://github.com/anthropics/claude-code/issues/74671)）。
- **按代理维度的成本可观测性**——多份报告指出 token 用量被"计算后即丢弃"，或只能通过人类可读的辅助输出查看（[#85421](https://github.com/anthropics/claude-code/issues/85421)、[#89709](https://github.com/anthropics/claude-code/issues/89709)）。

## 开发者痛点
- **自主多智能体工作流中失控的 token 消耗**是最突出的主题：未经审查的并行分发（[#77964](https://github.com/anthropics/claude-code/issues/77964)）、重复自我调用的代理（[#89596](https://github.com/anthropics/claude-code/issues/89596)）、自我验证循环（[#87178](https://github.com/anthropics/claude-code/issues/87178)）、静默的模型档位继承（[#87815](https://github.com/anthropics/claude-code/issues/87815)），甚至还有一条自动生成的流水线造成了约 $50 的意外第三方 API 开销（[#91682](https://github.com/anthropics/claude-code/issues/91682)）。
- **误导性或缺失的错误提示**：速率限制被报告为支出限制（[#75730](https://github.com/anthropics/claude-code/issues/75730)）、部分工作流代理死亡被报告为 `status:completed`（[#89709](https://github.com/anthropics/claude-code/issues/89709)）、代理可通过未文档化的 `skipWorkflowUsageWarning` 禁用自身的支出防护（[#78019](https://github.com/anthropics/claude-code/issues/78019)）。
- **Windows 体验落后于其他平台**：桌面窗口始终置顶、缺少中断控制、prompt 建议功能的回归，以及插件脚本反复因 CRLF/反斜杠路径处理而失效。
- **认证与计费归属的脆弱性**：OAuth token 轮换会中断所有进行中的子代理（[#84273](https://github.com/anthropics/claude-code/issues/84273)），订阅配额与 API token 消耗的归属问题仍未解决（[#64613](https://github.com/anthropics/claude-code/issues/64613)）。
- **有实际影响的基础设施边缘问题**：后台任务在可回收内存充足时仍被终止（[#92228](https://github.com/anthropics/claude-code/issues/92228)）、在确认健康的网络上出现 ECONNRESET（[#82028](https://github.com/anthropics/claude-code/issues/82028)）、定时任务在仓库缺失时静默空转（[#81675](https://github.com/anthropics/claude-code/issues/81675)）。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-07

## 今日要点

Windows 桌面版可靠性问题占据社区主要关注：用户报告启动失败、多个构建版本中持续存在的“悬浮宠物”无法点击的 Bug、文件系统级别的项目同步错误，以及一个不断扩大的关于不明配额消耗的跨报告追踪帖。与此同时，一批密集合并的内部 PR 显示出工程进展围绕托管 TUI worktree、面向 MCP 的实验性用户验证 API，以及 Windows/语音原生构建支持。过去 24 小时内没有发布新版本。

## 版本发布

过去 24 小时内无发布。

## 热门 Issue

- [**#40700 — Codex Desktop 无法在 Windows 26.820 上启动：捆绑的 codex.exe 从 WindowsApps 迁移失败**](https://github.com/openai/codex/issues/40700) — 本周最活跃的讨论串（44 条评论）。受影响用户甚至无法打开“关于”对话框；应用包在从 WindowsApps 迁出时失败。社区自 8 月 25 日起一直在集思广益修复和重装方案，尚无官方解决方案。

- [**#41465 — Windows 悬浮宠物仍无法点击且无法拖拽**](https://github.com/openai/codex/issues/41465) — 本周期获赞最多的 Bug（33 👍）。配套报告 [**#41513**](https://github.com/openai/codex/issues/41513) 和 [**#41960**](https://github.com/openai/codex/issues/41960) 确认该输入死区在内置和自定义宠物上均持续存在于桌面构建版本 26.825.4187.0 → 26.825.6671.0。

- [**#41220 — 综合追踪帖：Codex 用量/配额异常消耗及用量计账不一致**](https://github.com/openai/codex/issues/41220) — 一个社区策划的跨报告追踪帖，汇总了许多“配额凭空消失”的投诉，包括 [**#42765**](https://github.com/openai/codex/issues/42765)（零会话运行却从 45% → 0% 剩余额度）和 [**#43230**](https://github.com/openai/codex/issues/43230)（ASTRA token 消耗激增）。这预示着速率限制计账方面日益增长的信任问题。

- [**#40219 — macOS：已在服务器删除的对话重新出现在“最近”列表中且无法移除**](https://github.com/openai/codex/issues/40219) — 16 👍 和 22 条评论。已删除的对话在统一的 ChatGPT/Codex 桌面应用中反复重新出现，且无法消除；用户怀疑是客户端缓存/列表协调 Bug。

- [**#42215 — Windows ChatGPT Work：项目上下文同步在文件系统阶段反复失败**](https://github.com/openai/codex/issues/42215) — 在现有 ChatGPT 项目（23 个源文件）内启动本地 Work 聊天时，在文件系统同步阶段失败。影响了 Windows 桌面用户的核心“Work”工作流。

- [**#38417 — WSL2：codex-code-mode-host 0.147.0 在每次 shell 执行时以 SIGTRAP 崩溃；0.146.1 正常**](https://github.com/openai/codex/issues/38417) — 回归边界清晰（固定偏移处的 `int3`），对维护者而言高度可操作。Linux/WSL2 CLI 用户实际上被固定在 0.146.1。

- [**#8649 — 功能请求：Codex CLI 的“自动”推理强度（动态分级）**](https://github.com/openai/codex/issues/8649) — 20 👍。用户希望 Codex 能按回合或任务自动选择 minimal/low/medium/high/xhigh，类似 ChatGPT 的自动模式。自一月份开放以来，一直是代理功能中呼声最高的请求之一。

- [**#42583 — macOS：Composer 在第一条消息后消失，直到新开窗口或重启应用**](https://github.com/openai/codex/issues/42583) — 较新的 macOS 构建版本（26.901.20858）引入了 composer UI 回归。与 [**#43278**](https://github.com/openai/codex/issues/43278) 相关，后者中一次短暂的 `conversation_inaccessible` 404 即使在成功重新获取后也会永久移除 composer。

- [**#34841 — Windows 沙箱在崩溃后 `deny_read_acl_state.json` 变为 22 个 NUL 字节时无法恢复**](https://github.com/openai/codex/issues/34841) — 一个独特的损坏模式 Bug：系统崩溃后沙箱 ACL 状态文件被零填充，沙箱化的工作区写入执行永远无法恢复。对任何调试原生 Windows 沙箱状态的人都是有价值的细节。

- [**#43182 — Codex Desktop 0.153.4：任务在重新打开后丢失数天的历史记录；持久化投影游标指向预期序号之后**](https://github.com/openai/codex/issues/43182) — 9 月 6 日提交；一系列历史投影 Bug 的最新症状（另见 [**#42197**](https://github.com/openai/codex/issues/42197)）。现有任务重新打开后只剩之前对话的一小部分，指向持久化会话状态中的序号/游标失步。

## 关键 PR 进展

- [**#43286 — 为 TUI 添加托管 worktree 浏览器**](https://github.com/openai/codex/pull/43286) — 添加 `/worktree` 浏览功能：列出池检出，显示所有者元数据，并允许用户恢复所有者线程或复制 worktree 路径。

- [**#43298 — 将托管 worktree 转换推迟到新的 TUI 事件循环迭代**](https://github.com/openai/codex/pull/43298) — 将 worktree 设置/检出从同步的 `ChatWidget` 构造函数中拆分出来，使各阶段在新的事件循环栈上运行——可能修复 worktree 创建期间的 UI 卡顿。

- [**#43120 — 在 TUI 会话命令中添加托管 worktree 创建**](https://github.com/openai/codex/pull/43120) — 引入 `/worktree` 以启动新对话或将当前对话分叉到新的托管检出中；`/new` 和 `/fork` 增加 worktree 选项。

- [**#43289 — 添加能力门控的 MCP 用户验证处理**](https://github.com/openai/codex/pull/43289) — 当 MCP 客户端声明支持时，通过 `openai/elicitation/create` 处理 `openai/userVerification`，包含字段/大小/base64url 验证。

- [**#43265 — 添加实验性用户验证 API 契约**](https://github.com/openai/codex/pull/43265) — 在 `experimentalApi` 能力后面定义 `userVerification/status`、`enroll`、`delete` 和 `verify` 契约，附带类型化错误模式。

- [**#43248 — 将 voice-host RTP 音频连接到扬声器播放**](https://github.com/openai/codex/pull/43248) — 修复 voice host 排空 RTP 数据包但不播放的问题；通过带抖动缓冲的 GStreamer 管线路由音频，同时保留扬声器抑制边界。

- [**#43177 — 新 TUI 启动时使用服务器模型默认值**](https://github.com/openai/codex/pull/43177) — 防止启动时过期的客户端模型/推理设置覆盖应用服务器的有效配置。

- [**#43178 — 在启用后台迁移时允许受守护的旧版恢复**](https://github.com/openai/codex/pull/43178) — 当发布迁移开启时恢复缓存的旧版恢复快捷方式，前提是维护锁在恢复期间阻止迁移。

- [**#43253 — 恢复遇到活动写入者时显示只读对话**](https://github.com/openai/codex/pull/43253) — 改进活动写入者冲突 UX：用户现在可以只读检查对话记录，并在其他地方关闭对话后重试。

- [**#31471 — (1/4) 将 apps 缓存逻辑抽取到 ConnectorRuntimeManager**](https://github.com/openai/codex/pull/31471) — 更快连接器重构持续推进：将 Codex Apps 工具缓存抽取到按账户、用户、工作区模式和 Codex home 限定上下文范围的运行时管理器之后。

## 热门讨论

### 创意
- [**#14067 — Codex 线程和会话上下文跨设备同步**](https://github.com/openai/codex/discussions/14067) — 61 👍，最受支持的讨论。跨工作/家庭机器开发的开发者希望线程和会话上下文能跟随他们，而不是被绑定在本地环境上。
- [**#42703 — 长程上下文：历史检索能否使历史递归地自引用？**](https://github.com/openai/codex/discussions/42703) — 探索 token 预算/`notes`/`new_context` 设计中的失败模式：当检索到的历史摘要本身引用已不可检索的旧上下文时会发生什么？

### 问答
- [**#40740 — 回滚追踪能否捕获哪个路径产生了 Declined exec 状态？**](https://github.com/openai/codex/discussions/40740) — 深入探讨 `rollout/src/policy.rs` 与 `rollout-trace` 持久化之间的对比；指出那些刻意写得很长的 match 分支强制对新协议变体做出有意识的决策。
- [**#43257 — 实验性上下文管理如何将历史查找计入 Codex 用量限制？**](https://github.com/openai/codex/discussions/43257) — 一位运行多日 GPT-6 Astra 任务的 Pro 用户询问上下文窗口历史查找是否会重复计入用量配额。

### 展示与分享
- [**#41157 — CodexFuse 1.2.0：Codex 速率限制的本地 Windows 仪表板**](https://github.com/openai/codex/discussions/41157) — 独立的免安装 Windows 仪表板（PT/EN），显示已用/可用配额、下次重置时间和每小时用量；无需 API 密钥。
- [**#43224 — NULLYARD：带静态设置指南的公共 MCP 板**](https://github.com/openai/codex/discussions/43224) — 由运营者创建的公共纯文本 MCP 板，附带公开的技能/MCP 指南，参与者无需登录或 API 密钥。

## 功能请求趋势

- **跨设备/跨应用会话同步** — 最强单项需求：跨设备同步 Codex 线程和会话上下文（[#14067](https://github.com/openai/codex/discussions/14067)，61 👍），同时有用户抱怨远程/iOS 项目列表与桌面端不一致（[#36454](https://github.com/openai/codex/issues/36454)）。
- **指令实时重载** — 多个长期请求要求 AGENTS.md（以及项目范围内的文档）在修改时或 `cwd`/范围变化时自动重新读取（[#3198](https://github.com/openai/codex/issues/3198)、[#8547](https://github.com/openai/codex/issues/8547)、[#16403](https://github.com/openai/codex/issues/16403)）。这三个最近都被处理/关闭，暗示修复可能终于要落地了。
- **“自动”动态推理强度** — 用户希望按回合或任务选择分级，而不是固定的推理级别（[#8649](https://github.com/openai/codex/issues/8649)，20 👍）。
- **用量透明度和可审计性** — 鉴于不明消耗报告（[#41220](https://github.com/openai/codex/issues/41220)）和第三方工具在填补空白（[#41157](https://github.com/openai/codex/discussions/41157)），对配额消耗的服务端解释成为一种反复出现的需求。
- **桌面宠物 UX 控制** — 请求隐藏“显示宠物”菜单项并使宠物/提示优化的行为可配置（[#32069](https://github.com/openai/codex/issues/32069)）。

## 开发者痛点

- **Windows 桌面应用可靠性** — 最广泛的痛点集群：启动迁移失败（[#40700](https://github.com/openai/codex/issues/40700)）、应用静默消失（[#42510](https://github.com/openai/codex/issues/42510)）、项目创建/删除失败（[#42502](https://github.com/openai/codex/issues/42502)、[#41552](https://github.com/openai/codex/issues/41552)）、Work 项目同步失败（[#42215](https://github.com/openai/codex/issues/42215)）以及沙箱状态损坏（[#34841](https://github.com/openai/codex/issues/34841)）。
- **Windows 上悬浮宠物无法点击** — 至少在三个构建版本及内置/自定义宠物上都可复现（[#41465](https://github.com/openai/codex/issues/41465)、[#41513](https://github.com/openai/codex/issues/41513)、[#41960](https://github.com/openai/codex/issues/41960)）；一个小功能却引发了不成比例的噪音。
- **配额/计账信任赤字** — 用户报告在没有会话活动的情况下额度降到零，以及 token 消耗激增（[#41220](https://github.com/openai/codex/issues/41220)、[#42765](https://github.com/openai/codex/issues/42765)、[#43230](https://github.com/openai/codex/issues/43230)）。免费/Go 层级中误导性的模型选择器行为（[#41631](https://github.com/openai/codex/issues/41631)）加剧了困惑。
- **会话/历史状态失步** — 一类反复出现的 Bug：已删除的对话复活（[#40219](https://github.com/openai/codex/issues/40219)）、由于投影游标序号导致任务重开后丢失历史（[#43182](https://github.com/openai/codex/issues/43182)、[#42197](https://github.com/openai/codex/issues/42197)），以及压缩在回合中途复活过时指令（[#42695](https://github.com/openai/codex/issues/42695)）。
- **macOS 上的 UI 回归** — Composer 在第一条消息后或瞬时 404 后消失，需要重启应用（[#42583](https://github.com/openai/codex/issues/42583)、[#43278](https://github.com/openai/codex/issues/43278)）。
- **打断性安全验证** — 在 Windows 上，Codex 即使在授权后仍反复暂停工作以请求安全验证（[#43291](https://github.com/openai/codex/issues/43291)）。
- **CLI/平台回归** — WSL2 上 code-mode-host 0.147.0 的 SIGTRAP 崩溃（[#38417](https://github.com/openai/codex/issues/38417)）、Linux 桌面版在 `libqxcb` 中崩溃（[#42148](https://github.com/openai/codex/issues/42148)），以及持续的“No tool call found for function call output”错误（[#17630](https://github.com/openai/codex/issues/17630)）。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

## Gemini CLI 社区文摘 — 2026-09-07

### 1. 今日亮点

Agent 的可靠性和执行正确性继续主导着 issue 追踪器：子代理误报成功、通用 agent 卡住、shell 在命令执行完毕后仍显示“Waiting input”等长期 P1 bug，正在被反复回归测试。过去 24 小时内唯一的发布是又一个 nightly 构建。PR 动态集中在安全加固、检查点/会话健壮性以及较小的 CLI 正确性修复上。

### 2. 版本发布

- [v0.60.0-nightly.20260906.g85aca163f](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260905.g85aca163f...v0.60.0-nightly.20260906.g85aca163f) — 未单独发布 changelog；改动请见 nightly diff。

### 3. 热门 Issue

以下是过去 24 小时内更新过、关注度最高或潜在影响最大的 issue：

- [#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success](https://github.com/google-gemini/gemini-cli/issues/22323)  
  子代理还没有做任何实际工作就撞上 turn 上限时，仍可能报告 `status: "success"` / `Termination Reason: "GOAL"`。这很危险：失败会被静默地包装成看似成功。P1 bug，已有 13 条评论。

- [#21409 — Generalist agent hangs](https://github.com/google-gemini/gemini-cli/issues/21409)  
  用户报告，即使是创建文件夹这样的简单操作也会无限期卡住。8 个 👍 表明这是一个普遍痛点；一种变通办法是告诉模型不要委派任务。

- [#25166 — Shell command execution gets stuck with “Waiting input” after command completes](https://github.com/google-gemini/gemini-cli/issues/25166)  
  简单 shell 命令已执行完毕，但 CLI 仍把它们显示为运行中/等待输入状态。这会破坏长时间无人值守的工作流，已被标记为 P1/core。

- [#26522 — Stop Auto Memory from retrying low-signal sessions indefinitely](https://github.com/google-gemini/gemini-cli/issues/26522)  
  后台记忆提取器永远不会把低信号会话标记为“已处理”，因此它们会一遍又一遍地被重新提取。这会浪费 token，并形成噪声很大的记忆循环。

- [#21968 — Gemini does not use skills and sub-agents enough](https://github.com/google-gemini/gemini-cli/issues/21968)  
  用户反映，即使自定义 skills 和子代理已被清楚描述，Gemini 也很少自主委派或调用它们。这对 skills/agents 生态的推广采用非常重要。

- [#22745 — Assess the impact of AST-aware file reads, search, and mapping](https://github.com/google-gemini/gemini-cli/issues/22745)  
  这个 Epic 正在评估精确到方法（method）层级的文件读取与代码库映射，以减少 turn 噪声和 token 膨胀。这可能显著改善大型仓库的性能。

- [#21983 — Browser subagent fails on Wayland](https://github.com/google-gemini/gemini-cli/issues/21983)  
  Wayland 下浏览器自动化不可靠，终止原因也不充分。这是 Linux 用户面对的 P1 环境特定阻塞问题。

- [#20079 — `~/.gemini/agents/filename.md` symlinks are not recognized](https://github.com/google-gemini/gemini-cli/issues/20079)  
  通过符号链接（symlink）指向的 agent 定义会被忽略，导致难以把 agent 配置统一放在 dotfiles 仓库或共享位置中管理。

- [#24246 — Gemini CLI encounters 400 error with too many tools](https://github.com/google-gemini/gemini-cli/issues/24246)  
  当插件/工具配置规模很大时，CLI 会超出 provider 的工具数量上限。预期行为应当是更智能地裁剪已启用工具的范围。

- [#21335 — `/compress` command is not persistent across session resume](https://github.com/google-gemini/gemini-cli/issues/21335)  
  内存中的压缩是有效的，但摘要不会写回会话文件，因此恢复会话后得到的仍是未压缩的历史记录。token 节省行为因此并不一致。

### 4. 关键 PR 进展

过去 24 小时内更新或新开的值得注意的 PR：

- [#29184 — fix(core): validate git args in Windows sandbox](https://github.com/google-gemini/gemini-cli/pull/29184)  
  防止一种静默的沙箱绕过：`git diff --output=<path>` 虽然被视为只读操作，却可能截断任意文件。P1 安全修复。

- [#29117 — fix(core): enforce RFC 9207 issuer identification in MCP OAuth flow](https://github.com/google-gemini/gemini-cli/pull/29117)  
  在 MCP OAuth 流程中强制进行 RFC 9207 issuer（签发方）校验，降低 token 误路由/混用（mix-up）攻击的风险。已关闭。

- [#29195 — fix(checkpoint): degrade non-array history instead of crashing resume](https://github.com/google-gemini/gemini-cli/pull/29195)  
  当检查点包含合法 JSON、但 `history` 字段不是数组时，避免恢复流程直接抛出 `TypeError`，而是降级处理。

- [#29229 — fix(cli): reject non-finite numbers in settings editor](https://github.com/google-gemini/gemini-cli/pull/29229)  
  目前 `1e309` 这类溢出输入会被序列化成 `null` 并破坏设置项。现在改用 `Number.isFinite` 进行校验。

- [#29098 — fix(cli): keep useInputHistoryStore state updaters pure](https://github.com/google-gemini/gemini-cli/pull/29098)  
  移除 React 状态更新函数中的副作用，避免 StrictMode 下的双重调用 bug。

- [#29205 — fix(cli): submit MCP prompt text without JSON encoding](https://github.com/google-gemini/gemini-cli/pull/29205)  
  原样保留 MCP prompt 响应中的引号和换行，而不是发送 JSON 编码后的文本。

- [#29125 — fix(cli): convert hook timeout from seconds to milliseconds in hooks migration](https://github.com/google-gemini/gemini-cli/pull/29125)  
  修复迁移后的 hook 配置：此前 Claude Code 风格的秒级超时被当成了毫秒来处理。

- [#29163 — fix(cli): prevent crash during authentication in git repositories](https://github.com/google-gemini/gemini-cli/pull/29163)  
  解决 macOS Seatbelt/受限环境中 Git 分支信息不可用时的启动崩溃问题。

- [#28967 — fix(cli): prevent clearing terminal scrollback on static refresh](https://github.com/google-gemini/gemini-cli/pull/28967)  
  修复静态刷新在标准终端模式下清空终端回滚历史的问题。已关闭。

- [#28968 — fix(core): dedupe symlinked/junctioned skills directories during discovery](https://github.com/google-gemini/gemini-cli/pull/28968)  
  在 skills 目录发现阶段对符号链接/junction 目录去重，避免 `.gemini` 与 `.agents` 指向同一目录时重复注册工具。已关闭。

### 5. 热门讨论

所提供的数据中不包含讨论记录，故本节从略。

### 6. 功能需求趋势

当前 issue/PR 集合中最常见的需求方向如下：

- **token 高效、AST 感知的代码读取**  
  用户和维护者都希望获得更精确的代码导航：AST 感知的文件读取/映射（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#22746](https://github.com/google-gemini/gemini-cli/issues/22746)），以及“精准提取（tactful extraction）”，而不是把大文件整个灌给模型（[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)）。

- **更智能、更安全的自主执行**  
  社区在强烈推动提供与模型原生 bash 行为一致的沙箱 shell 访问（[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)），并为破坏性 git/文件命令提供更完善的护栏（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）。

- **更自主地使用 skills 与子代理**  
  模型应当无需被明确告知就知道何时调用自定义 skills/子代理（[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)），子代理的执行轨迹也应可见、可分享（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）。

- **记忆流水线的透明度与可靠性**  
  Auto Memory 需要在内容进入模型上下文前先进行确定性脱敏（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)）；低信号会话不能被无限重试（[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)）；无效补丁应被隔离（[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)）。

- **子代理/浏览器配置与恢复改进**  
  浏览器 agent 应当遵守 `settings.json` 中的覆盖设置（[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)），并自动从被锁定的配置文件/会话中恢复（[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)）。

### 7. 开发者痛点

过去 24 小时的 issue 动态中反复出现的开发者痛点包括：

- **卡住与终端状态误报**  
  通用 agent 卡住（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)）、shell 命令卡在“Waiting input”（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)）、交互式提示阻塞 agent（[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)），这些都是主要的工作流阻塞点。

- **误导性的成功报告与可调试性不佳**  
  达到 max turn 的中断被报告为成功达成目标（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)）、bug 报告缺少子代理上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)），这些都会让 agent 故障难以诊断。

- **工作区与会话整洁问题**  
  模型在工作区随机目录中创建临时脚本（[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)）、`/compress` 在会话恢复后不保留（[#21335](https://github.com/google-gemini/gemini-cli/issues/21335)）、记忆 agent 反复重试无价值的会话（[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)），这些都带来了本可避免的清理开销。

- **沙箱缺口与破坏性命令风险**  
  Windows 下被视为只读的 git 命令可能会静默写入文件（[#29184](https://github.com/google-gemini/gemini-cli/pull/29184)）；即使存在更安全的替代方案，agent 偶尔也会使用 `git reset`/`--force`（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）。

- **配置未按预期生效**  
  浏览器 agent 忽略 `settings.json` 中的覆盖设置（[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)）；符号链接指向的 agent 定义被忽略（[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)）；符号链接指向的 skills 目录可能被扫描两次（[#28968](https://github.com/google-gemini/gemini-cli/pull/28968)）。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-07

## 今日亮点

过去 24 小时内没有发布任何新版本。社区注意力集中在两个回归问题上——ACP 模式静默自动批准工具调用（#4537）和 BYOK 会话丢失提示缓存、产生约 5× 成本（#4720）——以及一批正在影响自动化客户端、数量不断增长的 ACP 会话生命周期缺陷。维护者关闭了 GHEC 数据驻留 401 问题（#4527）、HydraFusion 计划模式停滞（#4741）和长期存在的 aarch64 "Exec format error"（#827）；PR 队列依然非常平静，只有一份纯文档贡献。

## 热门问题

**1. ACP 模式再次自动批准工具调用——#845 回归**
[#4537](https://github.com/github/copilot-cli/issues/4537) — 自 1.0.81-1 起，`--acp` 模式不再发送 `session/request_permission`；shell 命令、文件编辑和删除都会在没有任何提示、也没有任何豁免（waiver）记录的情况下无人值守地执行。对于所有在 ACP 之上进行构建的开发者来说，这是一个安全敏感型回归，也是该缺陷第二次出现——社区期待这一轮能得到永久修复。

**2. BYOK 静默禁用提示缓存（约 5× 成本）**
[#4720](https://github.com/github/copilot-cli/issues/4720) — Copilot CLI 1.0.82 在 BYOK 模式下发送的请求不包含提示缓存声明，因此每一轮都会按全价重新发送完整上下文（`cached_tokens=0`、`cache_creation=0`）。对重度 BYOK 用户来说财务影响很大，尤其是在长时间代理式（agentic）会话中。

**3. `copilot -p` 在 GHEC 数据驻留租户上返回 401——已关闭**
[#4527](https://github.com/github/copilot-cli/issues/4527) — 在 `<tenant>.ghe.com` 租户上，非交互式提示模式从 `api.githubcopilot.com` 而不是租户端点获取模型目录，导致启动时出现 "Authentication failed"，而交互模式却能正常工作。这是阻塞企业用户的问题，获得 4 个 👍；现已关闭。

**4. MCP OAuth 令牌无法在会话之间可靠复用**
[#4695](https://github.com/github/copilot-cli/issues/4695) — 使用 OAuth/PKCE 的 HTTP MCP 服务器会在不同哈希键下产生重复的令牌缓存条目，导致即使缓存令牌仍然有效，也会反复重新认证。这是一个认证可靠性问题，并且会随着每个新增 MCP 服务器的接入而进一步加剧。

**5. ACP `session/prompt` 会无条件中止正在运行的后台子代理**
[#4555](https://github.com/github/copilot-cli/issues/4555) — ACP 提示处理器把 `session.abort()` 作为第一个动作执行，会杀掉通过 `task` 工具启动的后台子代理。交互式 TUI 模式没有这种行为——这是代理-监督者（agent-supervisor）工作流中的一个正确性缺口。

**6. ACP：后台 shell 仍在运行时即触发 `end_turn`**
[#4743](https://github.com/github/copilot-cli/issues/4743) — ACP 在附加的后台 shell 完成之前就返回 `stopReason: "end_turn"`；当该 shell 稍后结束时，Copilot 会在提示 RPC 已经结束后自主调用工具并发出更新。客户端没有任何可观察的会话空闲信号——与 #4555 密切相关。

**7. `ask_user` 表单：过早按 Enter 会丢弃正在输入的回答**
[#4738](https://github.com/github/copilot-cli/issues/4738) — 过早按下 Enter 会提交/取消表单，并永久丢失用户已输入的内容，且没有任何草稿恢复机制。由于数据丢失不可恢复，此问题被标记为高严重性。

**8. WSL2：长时间 Claude Opus 5 会话占用约 31 GB RSS 和约 57% CPU**
[#4694](https://github.com/github/copilot-cli/issues/4694) — 在 WSL2 上运行长时间、高强度的会话时，当上下文使用量达到约 47% 后，CLI 常驻内存膨胀到约 31 GB。对内存受限的 Linux/WSL 环境来说，这很可能是阻塞性问题。

**9. 面向用户的助手文本被重新归类为 "Thought for Ns"**
[#4735](https://github.com/github/copilot-cli/issues/4735) — 当模型在一轮中同时输出推理内容、多段面向用户的消息和一个工具调用时，可见文本会被折叠进收起的推理区域，永远不会显示给用户。这是一个输出保真度缺陷，可能静默隐藏模型给用户的回答。

**10. 工具调用间歇性产生格式错误的调用标记并静默空操作**
[#4706](https://github.com/github/copilot-cli/issues/4706) — 工具/函数调用可能会生成格式错误的 `<invoke>` 标记，导致静默的空操作。值得注意的是，此问题是由 Copilot CLI 代理自身（Claude Opus 4.8）生成的，因此是一条很有价值的自我报告失败案例。

其他值得注意的问题：#4692（组织管理的默认企业模型未被遵循）、#4734（desktop 2.98.0 / runtime 1.1.15 之后所有项目会话出现 "Worktree missing"）、#4742（desktop 1.1.15 阻止创建第二个 Local 会话）、#3894（`agentStop` 在子代理回合触发导致 `/review` 无法完成），以及 #4733（达到 `max_output_tokens` 时事件丢失）。

## 主要 PR 进展

PR 队列几乎处于静止状态——过去 24 小时内只有一个拉取请求处于活跃状态：

**#4739 — docs：提议由终端应用拥有 macOS 通知**
[PR #4739](https://github.com/github/copilot-cli/pull/4739) — 这是一份参考提案（不是对已发布 CLI 的更改），记录了 macOS 通知点击问题，并提供了一个原创的、采用 MIT 许可的终端通知示例及可移植的回归测试。对于希望让终端应用接管 macOS 通知交互的集成者来说很有用；但预计此 PR 不会带来任何运行时行为变化。

该时间窗口内没有其他 PR 被打开或更新。

## 功能请求趋势

- **熟悉的终端按键绑定**：#2644 请求支持 Shift+Arrow 和 Ctrl+A 文本选择；#4736 请求支持用 Ctrl+E 接受内联自动补全建议。方向很明确：让 CLI 提示符表现得像标准 Emacs/readline 风格的终端编辑器。
- **确定性的 ACP 会话与权限语义**：#4537 要求可靠执行 `session/request_permission`；#4555 和 #4743 要求后台任务的生命周期不会中止子代理，也不会在工作完成前发出 `end_turn`。提出者正在 ACP 之上构建自动化，需要可预测的协议行为。
- **输出保真度**：#4735 要求真实的面向用户文本不要被折叠进推理摘要；#4706 希望格式错误的工具调用被醒目地暴露出来，而不是被静默丢弃。
- **上下文与凭据的高效复用**：#4695（MCP OAuth 令牌复用）和 #4720（BYOK 提示缓存声明）都旨在降低冗余的重新认证/往返成本。
- **企业模型配置对齐**：#4692 要求 CLI 像 VS Code 和 GitHub Desktop 一样遵循组织管理的默认模型。

## 开发者痛点

- **回归疲劳**：#4537 是 #845 的再次出现，#4720 则在补丁版本中破坏了提示缓存。1.0.x 版本中的静默行为变化正在侵蚀信任，尤其是在成本敏感的 BYOK 和权限敏感的 ACP 场景中。
- **自动更新引发故障**：desktop 2.98.0 / runtime 1.1.15 在所有项目会话中引入了 "Worktree missing"（#4734）；desktop 1.1.15 在存在活跃 Local 会话时阻止创建第二个 Local 会话（#4742）。用户感觉被自动更新强行推进了故障状态。
- **后台工作不受会话生命周期管理**：没有会话空闲信号、过早触发 `end_turn`、`session/prompt` 无条件中止，以及子代理回合触发钩子导致 `/review` 失败（#4555、#4743、#3894）——这些都让健壮的代理编排变得困难。
- **UI 表单中的数据丢失**：`ask_user` 在意外按下 Enter 时不可恢复地丢弃已输入的内容（#4738），对交互式用户来说是一个高严重性的 UX 缺陷。
- **Linux/WSL2 上的资源膨胀**：长时间会话中约 31 GB 的 RSS（#4694）使受限环境无法进行长时间自主运行。
- **企业端点不一致**：GHEC 数据驻留租户在提示模式下命中了错误的 API 端点（#4527，已关闭），组织管理的默认模型也被 CLI 忽略（#4692）——企业部署仍然是一个反复出现的痛点。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode 社区摘要 — 2026-09-07

### 今日亮点

过去 24 小时内没有发布新版本，但仓库中出现了多个活跃的维护性 PR，针对不稳定的重试行为、日志文件增长、会话删除清理以及插件钩子支持等问题。社区关注点依然集中在长期存在的可用性问题（如复制到剪贴板失败）上，同时也涌现了大量关于付费订阅限流和计费的反馈。

### 版本发布

过去 24 小时内没有发布任何新的 OpenCode 版本。

### 热门 Issue

- **[#4283 — 复制到剪贴板不可用](https://github.com/anomalyco/opencode/issues/4283)**  
  当前评论数最多的 issue，共 129 条评论和 121 个 👍。用户仍然无法可靠地从 agent 回复中复制所选文本。这在很长一段时间内一直是核心工作流阻塞问题。

- **[#7006 — `permission.ask` 插件钩子已定义但未触发](https://github.com/anomalyco/opencode/issues/7006)**  
  插件开发者无法自定义自动批准行为，因为权限钩子从未触发。16 条评论和 25 个 👍 表明各方对让 Permissions 插件接口真正可用的兴趣颇高。

- **[#45278 — 支付在 3 个月后被拒绝，卡片或银行均无问题](https://github.com/anomalyco/opencode/issues/45278)**  
  订阅者在续费时，尽管银行确认无误，有效卡仍被拒绝。这表明是计费系统可靠性问题，而非个别支付失败。

- **[#32202 — 技能重复根目录会让 `available_skills` 在重启后发生变化](https://github.com/anomalyco/opencode/issues/32202)**  
  多个根目录中存在重名技能时，进程启动间的去重解析结果不确定。最终可用技能列表虽然会排序，但早期的重复项解析仍会造成不稳定行为。

- **[#47613 — Go 订阅：使用率不高却持续收到 HTTP 429（重试等待 12 小时）](https://github.com/anomalyco/opencode/issues/47613)**  
  一位付费 Go 订阅用户报告服务已持续约 3 天实际不可用。每次请求都返回 429，且重试窗口不断重置，这暗示存在服务端限流状态 bug。

- **[#46628 — MCP 工具 schema 未针对 Anthropic 进行清洗](https://github.com/anomalyco/opencode/issues/46628)**  
  带有根级 `anyOf` / `oneOf` / `allOf` 的 MCP 工具在使用 Anthropic 模型时会立即导致 400 错误。此外，MCP 工具从不出现在 `tool.definition` 中，导致标准检查无法进行。

- **[#39790 — 会话在配额重置前持续重试固定窗口的用量配额错误](https://github.com/anomalyco/opencode/issues/39790)**  
  即使提供方明确给出了重置时间，OpenCode 仍持续重试配额错误。这会浪费资源，并产生误导性的“已计划重试”界面状态。

- **[#42306 — TUI 主线程持续以约 100% CPU 占用率重绘 spinner](https://github.com/anomalyco/opencode/issues/42306)**  
  终端 UI 即便没有任何用户交互，也会以约 15fps 的频率通过 `writev` 持续重绘。这让空闲会话也占满一个完整 CPU 核心，对笔记本续航和远程主机都构成严重问题。

- **[#47545 — 自动模式在终端中反复产生虚假的权限通知](https://github.com/anomalyco/opencode/issues/47545)**  
  在 Warp、Orca 等 AI 终端中，自动模式即使所有审批都已自动进行，仍每隔几秒触发一次权限通知。这种噪音使无人值守自动化无法正常使用。

- **[#44790 — 远程 MCP OAuth 的 `resource_metadata` URL 被忽略](https://github.com/anomalyco/opencode/issues/44790)**  
  OpenCode 只会在域名根路径检查 RFC 9728 元数据，而忽略 `WWW-Authenticate` 头中通告的 URL。这会导致 AWS Bedrock AgentCore 等非根路径 OAuth 元数据端点后面的 MCP 服务器无法正常工作。

### 关键 PR 进展

- **[#47676 — fix(util): 就地裁剪 opencode.log 头部以限制大小](https://github.com/anomalyco/opencode/pull/47676)**  
  加入 `LOG_MAX_BYTES` 处理，使 `opencode.log` 会被裁剪而非无限追加。直接解决长期运行的安装中 500 MB–1 GB 的日志文件问题。

- **[#47686 — fix(session): 提供方报告预算耗尽时停止重试](https://github.com/anomalyco/opencode/pull/47686)**  
  改进 `retryable()`，使 OpenCode 不再持续重试代表预算已耗尽的错误，从而减少无意义的重复重试和 token 浪费。

- **[#47684 — fix(app): 会话被删除后移除其所有引用](https://github.com/anomalyco/opencode/pull/47684)**  
  修复会话删除后地址栏、最近标签页指针以及持久化交接中遗留的过期引用。

- **[#47682 — fix(app): 防止引导查询在加载后立即被重新拉取](https://github.com/anomalyco/opencode/pull/47682)**  
  修复 `bootstrap.ts` 中因缺少 `staleTime` 和 refetch 行为而导致的重复网络/逻辑工作。

- **[#47663 — feat(plugin): 新增会话标题钩子和请求 options 包](https://github.com/anomalyco/opencode/pull/47663)**  
  按 LLM 请求类型拆分会话请求钩子的第一步，为插件提供稳定的 options 结构和会话标题钩子。

- **[#47638 — docs(www): 新增 Console 文档](https://github.com/anomalyco/opencode/pull/47638)**  
  新增 Console 标签页文档，包括 Intro、Models 和 Go 页面，将现有订阅与模型指南迁移到 V2 Console 模型。

- **[#46539 — fix(ai): 保留响应中的 reasoning 条目](https://github.com/anomalyco/opencode/pull/46539)**  
  防止 reasoning 条目被扁平化、重复或以错误方式重建。对发送原生 reasoning 字段且需要用于继续生成的提供方很重要。

- **[#42485 — fix(tui): 通过 SEA 安全导入加载本地插件](https://github.com/anomalyco/opencode/pull/42485)**  
  修复 Node SEA 构建中本地 TUI 插件加载失败的问题；此前原生 `import()` 无法处理 `file://` URL，导致报错 `ERR_UNKNOWN_BUILTIN_MODULE`。

- **[#40921 — fix(core): 将连接状态更新广播到所有位置](https://github.com/anomalyco/opencode/pull/40921)**  
  通过让连接/断开变化传播到除发起请求位置之外的所有位置，修复提供方目录过期的问题。

- **[#40920 — fix(core): 从旧渠道数据库中导入凭据](https://github.com/anomalyco/opencode/pull/40920)**  
  修复渠道数据库整合问题：仅存储在旧 `opencode-next.db` 中的凭据被静默丢失。

### 功能需求趋势

- **插件权限与策略控制**  
  用户需要可靠且可自定义的自动批准流程：`permission.ask` 必须真正可触发，自动模式不应滥发通知，插件也需要更丰富的请求钩子。  
  参见 [#7006](https://github.com/anomalyco/opencode/issues/7006)、[#47545](https://github.com/anomalyco/opencode/issues/47545)、[#47663](https://github.com/anomalyco/opencode/pull/47663)。

- **Claude Code 与 MCP 生态兼容性**  
  用户明显需要与 Claude Code 约定和 MCP 服务器更好的互操作，包括可选发现 `.claude/agents`、针对 Anthropic 模型的 schema 清洗，以及 RFC 9728 OAuth 元数据支持。  
  参见 [#47650](https://github.com/anomalyco/opencode/issues/47650)、[#46628](https://github.com/anomalyco/opencode/issues/46628)、[#44790](https://github.com/anomalyco/opencode/issues/44790)。

- **更多提供方覆盖与准确上下文限制**  
  用户希望新增 Nous Portal 等提供方，完善 Standard Compute 等现有提供方的文档，并让 OAuth 连接的 ChatGPT 模型能正确上报上下文限制。  
  参见 [#47515](https://github.com/anomalyco/opencode/issues/47515)、[#47475](https://github.com/anomalyco/opencode/issues/47475)、[#47646](https://github.com/anomalyco/opencode/issues/47646)。

- **更智能地处理付费使用量与提供方限制**  
  OpenCode 应区分临时限流与预算耗尽，停止无意义的循环重试。用户也期待更清晰的计费失败信息。  
  参见 [#47613](https://github.com/anomalyco/opencode/issues/47613)、[#39790](https://github.com/anomalyco/opencode/issues/39790)、[#47686](https://github.com/anomalyco/opencode/pull/47686)。

### 开发者痛点

- **配额与限流状态处理过度激进**  
  即使重置前不可能成功，429 错误和固定窗口配额消息也会触发循环重试；付费订阅用户还报告服务端出现持久的 429 状态。  
  参见 [#47613](https://github.com/anomalyco/opencode/issues/47613)、[#39790](https://github.com/anomalyco/opencode/issues/39790)、[#47634](https://github.com/anomalyco/opencode/issues/47634)。

- **MCP 集成仍然脆弱**  
  MCP 工具 schema 被 Anthropic 模型拒绝，OAuth 元数据发现不完整，Desktop MCP 请求会在任意时间后超时。  
  参见 [#46628](https://github.com/anomalyco/opencode/issues/46628)、[#44790](https://github.com/anomalyco/opencode/issues/44790)、[#47584](https://github.com/anomalyco/opencode/issues/47584)。

- **插件与权限钩子仍不可靠**  
  权限钩子可能被完全忽略，自动模式的权限通知在受支持终端中会反复触发。这让无人值守、插件驱动的工作流既嘈杂又不可靠。  
  参见 [#7006](https://github.com/anomalyco/opencode/issues/7006)、[#47545](https://github.com/anomalyco/opencode/issues/47545)。

- **会话与配置状态可能静默损坏**  
  移除 `.git` 后会话消失，已删除会话留下过期引用，重复技能根目录产生不一致结果，保存 CLI 偏好会替换符号链接配置文件。  
  参见 [#47652](https://github.com/anomalyco/opencode/issues/47652)、[#47683](https://github.com/anomalyco/opencode/issues/47683)、[#32202](https://github.com/anomalyco/opencode/issues/32202)、[#45067](https://github.com/anomalyco/opencode/issues/45067)。

- **TUI 和桌面端资源占用仍是问题**  
  空闲 TUI 会话可能占满一个完整 CPU 核心来重绘 spinner，Windows Desktop 则可能因 GPU 子进程反复失败而在启动时崩溃。  
  参见 [#42306](https://github.com/anomalyco/opencode/issues/42306)、[#46691](https://github.com/anomalyco/opencode/issues/46691)。

---

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区文摘 — 2026-09-07

## 今日亮点

9 月 6 日的主题是连接性与韧性：当天提交的 PR 分别涉及 Copilot GPT-6 Astra 的端点路由（#9253）、MagicDNS 解析失败（#9252）与一个可选的跨服务商回退跳转（#9251）。长期存在的可靠性讨论串仍是社区参与度最高的内容，其中 openai-codex 的 TUI 挂起（#4945，76 条评论）与 Windows 支持缺口（#7547，55 条评论）继续位居最大痛点。在整个 issue 跟踪器中，呼声最高的功能需求主题是 Extension API 的扩展与新模型支持。

## 热门 Issue

- **[openai-codex 连接可靠性问题](https://github.com/earendil-works/pi/issues/4945)** — 76 条评论 | 32 👍 | 未关闭，进行中
  `openai-codex` / `gpt-5.5` 会话会间歇性地卡在 `Working...` 状态，没有流式文本、工具调用或错误输出。唯一的恢复方式是按 Escape，而这会记录一次已中止的助手回合。这是 issue 跟踪器中参与度最高的问题，自 5 月以来一直未能解决。

- **[你是怎么在 Windows 上使用 Pi 的？](https://github.com/earendil-works/pi/issues/7547)** — 55 条评论 | 未关闭
  这是一条社区收集帖，用于汇总 Windows 下的使用方式与痛点。维护者正依据它决定该在哪些方面投入精力（原生修复、文档、开箱即用体验），以及哪些工作应交给扩展去覆盖。从回复量来看，Windows 需求强烈，但工作流相当分散。

- **[GitHub Copilot GPT-6 Astra 被路由到不受支持的 Chat Completions 端点](https://github.com/earendil-works/pi/issues/9209)** — 4 条评论 | 已关闭
  `github-copilot/gpt-6-astra` 返回 `400: unsupported_api_for_model`，因为 Pi 把它发送到了 `/chat/completions` 而不是 Responses API。禁用扩展后仍可复现。修复于当日在 [PR #9253](https://github.com/earendil-works/pi/pull/9253) 中完成。

- **[经 OpenRouter 调用 Claude Opus 5 时逐消息 output_config 被拒绝](https://github.com/earendil-works/pi/issues/9165)** — 3 条评论 | 已关闭
  发往 `openrouter/anthropic/claude-opus-5` 的请求会返回 400，而同一模型直接通过 Anthropic 服务商调用却可以正常工作。社区成员在提交 issue 前借助 agent 辅助进行了排查；问题指向 provider 适配器的兼容性缺口。

- **[MagicDNS 风格的主机名解析报 ENOTFOUND](https://github.com/earendil-works/pi/issues/9244)** — 2 条评论 | 已关闭
  全局 undici dispatcher 没有把 `connect.lookup` 固定到 Node 的系统 `dns.lookup`，因此通过 Tailscale/MagicDNS 或 `nsswitch.conf` 解析的主机名即使 `getaddrinfo` 正常也会解析失败。修复于当日在 [PR #9252](https://github.com/earendil-works/pi/pull/9252) 中完成。

- **[opencode-go provider 缺少必需的 x-opencode-session 请求头](https://github.com/earendil-works/pi/issues/9230)** — 2 条评论 | 已关闭
  OpenCode Go 现在要求携带随会话保持稳定的 `x-opencode-session` 请求头；自 2026-09-06 起，缺少该请求头的请求“可能会报错”。社区桥接 [pi-opencode-bridge@0.2.1](https://github.com/earendil-works/pi/issues/9237) 也有同样的缺口，导致核心路径与第三方路径的提示缓存亲和性都被破坏。

- **[传输/不可达错误时的跨服务商回退链](https://github.com/earendil-works/pi/issues/9242)** — 2 条评论 | 已关闭
  该请求希望在当前服务商遇到 DNS/超时/连接被拒等错误时，支持可选的服务商/模型回退，作为现有同服务商重试的补充。值得注意的是，该功能当天就通过 [PR #9251](https://github.com/earendil-works/pi/pull/9251) 实现了——社区需求到代码落地的周转非常快。

- **[Anthropic：把未使用的第 4 个缓存断点用于稳定的对话检查点](https://github.com/earendil-works/pi/issues/9246)** — 3 条评论 | 已关闭
  `convertMessages` 只用了 Anthropic 允许的 4 个缓存断点中的 3 个。提议：将第 4 个用于保存通过 `onPayload` 捕获的稳定对话检查点，以减少长 agent 会话中的缓存未命中与成本。

- **[为长时间临时故障中的 agent 重试退避设置上限](https://github.com/earendil-works/pi/issues/8826)** — 3 条评论 | 未关闭
  在上游长时间中断期间（反复出现 `503 upstream call failed: Too many open files`），agent 级的指数退避重试延迟会无限增长。用户希望有一个可配置的上限，让重试间隔稳定在有界范围内，而不是无限期地退避下去。

- **[--api-key 与 auth.json 之间的 API key 解析顺序问题](https://github.com/earendil-works/pi/issues/9245)** — 1 条评论 | 已关闭
  通过 `auth.json` 把 OpenRouter key 存放在 1Password 中的用户，在传入 `--api-key` 时会遇到解析顺序不明确的问题；auth 文件可能意外地获得更高优先级。这与 [Discussion #9146](https://github.com/earendil-works/pi/discussions/9146) 中的按仓库覆盖讨论相关。

## 关键 PR 进展

- **[fix(ai): route Copilot GPT models through Responses (fixes astra)](https://github.com/earendil-works/pi/pull/9253)** — 未关闭
  将 GitHub Copilot GPT 模型路由到 Responses API，修复 GPT-6 Astra 的 400 错误；同时也为将来 GitHub 从目录中移除 GPT-4 模型做了前瞻性适配。

- **[feat(coding-agent): hop to a fallback provider on transport errors](https://github.com/earendil-works/pi/pull/9251)** — 已关闭
  当当前服务商遇到传输/不可达错误时，新增一个可选的回退跳转，让会话可以在配置的回退服务商上继续运行。修复 #9242；该 PR 此前曾以 #9248、#9249 两个编号迭代。

- **[fix(coding-agent): pin undici connect lookup to system dns.lookup](https://github.com/earendil-works/pi/pull/9252)** — 已关闭
  将 HTTP dispatcher 的 DNS 解析固定为 Node 的系统解析器，修复 MagicDNS/水平分割（split-horizon）主机名解析失败的问题（#9244）。早期迭代版本为 #9250。

- **[fix(coding-agent): resolve model auth live instead of from startup snapshot](https://github.com/earendil-works/pi/pull/9233)** — 已关闭
  修复一个竞态：启动阶段的代码路径会在后台可用性快照填充之前就以 `hasConfiguredAuth()` 作为门控，导致有效模型被暂时判定为不可用。

- **[fix(ai): clamp OpenRouter :free maxTokens to base model](https://github.com/earendil-works/pi/pull/9224)** — 已关闭
  OpenRouter `:free` 目录条目标注的上下文窗口大于其基础模型所支持的值；Pi 现在会把请求中的 `max_tokens` 限制在基础模型允许的范围内，避免在 `minimax/minimax-m3:free` 等模型上出现 “does not support max tokens > 524288” 之类的 400 错误。

- **[fix(coding-agent): reject reload during active session operations](https://github.com/earendil-works/pi/pull/9222)** — 未关闭
  防止在 RPC 模式下工具运行期间执行由扩展触发的重载。此前，一次成功的工具调用可能落到已失效的 runner 上，导致 Pi 记录并向模型发送一条虚假错误。

- **[feat(ai): use provider-reported cost when responses include it](https://github.com/earendil-works/pi/pull/6881)** — 未关闭，进行中
  当响应中包含服务商上报的计费成本时，将其用作 `usage.cost.total`（BYOK 场景下包括 `cost_details.upstream_inference_cost`）；否则回退为按目录费率计算。

- **[feat(tui): add jump-to-latest control](https://github.com/earendil-works/pi/pull/9080)** — 已关闭
  新增一个可跳回最新消息的 TUI 控件，基于 @dgtlntv 的新消息指示器工作实现，并附有静态与流式场景的演示视频。

- **[feat(ai): add LLM Gateway and LLM Gateway DevPass providers](https://github.com/earendil-works/pi/pull/7610)** — 未关闭
  将 OpenRouter 风格的路由服务 llmgateway.io 作为内置的 `openai-completions` provider 加入。该 PR 由 LLM Gateway 团队代为提交，取代了自动关闭的 PR #7480。

- **[feat(ai,coding-agent): add Meta provider with Muse subscription OAuth](https://github.com/earendil-works/pi/pull/9096)** — 未关闭
  新增 Meta provider（解决 #7543），其认证流程比较特殊：API token 每天基于身份令牌重新签发，而不是通过滚动刷新。流式输出目前是突发式的，而非增量式的——这一点已被标注为已知怪癖。

## 热门讨论

**想法**

- **[按仓库覆盖 API key 及忽略 auth.json 的选项](https://github.com/earendil-works/pi/discussions/9146)** — [General] — 2 条评论 | 1 👍
  一位通过 `auth.json` 中的 `!op` 指令把 OpenRouter key 存在 1Password 里的用户，希望有一个按仓库覆盖的机制，并能选择彻底忽略 `auth.json`。这与 [Issue #9245](https://github.com/earendil-works/pi/issues/9245) 中报告的优先级 bug 互为补充。

## 功能需求趋势

- **新模型与新服务商支持**：用户希望尽快支持新发布的模型与路由服务——GPT-6 Astra（#9133、#9209）、经 OpenRouter 访问的 Claude Opus 5（#9165）、Meta/Muse provider（[PR #9096](https://github.com/earendil-works/pi/pull/9096)）以及 LLM Gateway（[PR #7610](https://github.com/earendil-works/pi/pull/7610)）。免费层模型的目录元数据也需要截断限制（#9224）。
- **可靠性与韧性调节项**：在长时间运行的 agent 使用场景中，传输错误时的跨服务商回退（#9242）、重试退避上限（#8826）以及 JSON/RPC 事件中机器可读的终止性失败分类（#9247）是反复出现的需求。
- **缓存与成本优化**：使用 Anthropic 未使用的第 4 个缓存断点（#9246）、避免系统提示词抖动从而破坏提示缓存（#8712）、以服务商上报的计费成本为准（[PR #6881](https://github.com/earendil-works/pi/pull/6881)），以及停止在每次 Codex 请求中重复发送 base64 图像负载（#8617）。
- **Extension API 扩展**：向扩展暴露 `ModelRuntime`（#8791）、允许在运行时切换 TUI 模式并挂载布局（#9238）、支持覆盖内置 UI 字符串（#9254），以及增加幂等且带确认的回合消息投递（#9236）。为技能/模板提供可选的 `pi.namespace`（#8834）也引起了关注。
- **TUI 可用性与渲染**：增量滚动行为（PageUp 目前会跳到第一条消息，#5786）、跳至最新消息的控件（[PR #9080](https://github.com/earendil-works/pi/pull/9080)）、保留滚动位置的非破坏性重绘（#9240）、LaTeX 旧式字体切换渲染（#8827）以及全屏图像渲染修复（#8306）。
- **配置易用性**：按仓库覆盖 API key 及忽略 auth.json 的选项（#9146、#9245），以及持续的 Windows 专用配置修复，如存在 WSL 时 `shell_path` 被忽略的问题（#9229）。

## 开发者痛点

- **openai-codex 任务中途卡死**：反复停留在 `Working...` 状态，没有任何输出、工具调用或错误——唯一的恢复方式是按 Escape 中止当前回合。76 条评论加 32 个 👍，使其成为最令人头疼的未解决问题。
- **Windows 体验碎片化**：支持的运行模式太多，核心修复与扩展职责范围的界限变得模糊。WSL/bash 优先于 `shell_path`（#9229）、Shift+Enter 键位行为（#7175）等 Windows 专属 bug 进一步加剧了问题。
- **新模型经常无法路由或被拒绝**：GPT-6 Astra 被送往错误的端点（#9209）；Claude Opus 5 经 OpenRouter 调用时因逐消息 `output_config` 而失败（#9165）；OpenCode Go 新的会话请求头要求在同一天同时破坏了核心路径与社区桥接（#9230、#9237）。
- **DNS 与网络边界情况**：由于 undici 绕过了系统解析器，MagicDNS/Tailscale 主机名会报 ENOTFOUND（#9244）；长时间中断会导致指数重试退避无限增长，并伴随大量 `503` / “Too many open files” 错误刷屏（#8826）。
- **认证配置摩擦**：`--api-key` 与 `auth.json` 的解析顺序出人意料；而且在通过 1Password `op` 集成保存 key 时，没有受支持的方式使用按仓库的 key 或完全忽略 `auth.json`（#9245、#9146）。
- **TUI 视口与渲染回归**：视口上方的行即使只发生不可见的变化，也会触发破坏性的全量重绘，导致任务中途丢失滚动位置（#9240）；PageUp 直接跳到会话开头，而不是按增量滚动（#5786）；LaTeX 字体切换块会退化为显示原始源码（#8827）。
- **扩展集成缺口**：扩展无法访问模型运行时（#8791）；重载竞态会使活动中的 runner 失效（#9222）；在宿主 UI 上下文中，对象展开（object-spread）式的包装会破坏原型方法与 Proxy 陷阱（[PR #9219](https://github.com/earendil-works/pi/pull/9219)）。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

## Qwen Code 社区摘要 — 2026-09-07

### 今日亮点

Web Shell 相关开发再次成为主角：`v0.23.1-preview.1` 与最新 nightly 版本带来了动态工作流运行的可视化与管理能力；同时，尚在评审中的 PR 增加了上下文用量面板、有界历史会话记录视口，以及基于 gzip 的会话记录加载，旨在解决长期被反馈的移动端卡顿问题。安全方面收到两份 P1 报告：一份涉及未脱敏的遥测上传，其中包含 shell 命令行（#11198）；另一份涉及技能 `PreToolUse` 门禁在 `--continue` 之后不再强制生效（#11180）。导出文件体积亦有显著改善——导出的 HTML 不再嵌入完整的 Web Shell/React 运行时（#11031），相邻的 mermaid/运行时体积问题仍在持续跟进中。

### 版本发布

- **v0.23.1-preview.1**
  - `feat(web-shell)`: 可视化并管理动态工作流运行 — [PR #10594](https://github.com/QwenLM/qwen-code/pull/10594)，作者 @qqqys
  - `perf(web-shell)`: 从会话推导工作流项目
  - 注意：发布工作流在 `integration_docker` job 上失败（[#11185](https://github.com/QwenLM/qwen-code/issues/11185)）。
- **v0.23.0-nightly.20260906.92a8a8d179** 与 **v0.23.0-nightly.20260905.0c945a6136** 先于下一个稳定版携带了上述两项 web-shell 变更。

### 热门 Issue

1. **[#11198 — 使用统计遥测将未脱敏的工具错误原始文本上传至 RUM](https://github.com/QwenLM/qwen-code/issues/11198)** — P1 安全问题。Shell 失败时，默认情况下可能将完整命令行发送给第三方端点；该 issue 指出，此问题在 `main` 上早已存在，影响范围比 #10916 标记的单个字段更广。
2. **[#11180 — 技能 `PreToolUse` 钩子在 `--continue` 之后停止生效](https://github.com/QwenLM/qwen-code/issues/11180)** — P1 安全问题。技能的安全门禁在全新调用时有效，但会话恢复后会静默地不再拒绝调用，即使技能指令仍保留在上下文中。
3. **[#8662 — 将 TUI 渲染层从 ink 迁移到 OpenTUI（跟踪 issue）](https://github.com/QwenLM/qwen-code/issues/8662)** — 本周期评论最多的 issue（30 条）。该 issue 记录了结构性闪烁与约 1,037 行的自定义 ink 补丁，主张更换渲染器平台。
4. **[#6181 — Web Shell 移动端会话切换卡顿](https://github.com/QwenLM/qwen-code/issues/6181)** — P1，ready-for-agent。其根因分析分为四层：抽屉关闭期间的 2 秒轮询、未压缩的全量历史加载，以及每帧 O(transcript) 的渲染开销。
5. **[#11031 — 不要在每个导出的 HTML 文件中嵌入 Web Shell 运行时](https://github.com/QwenLM/qwen-code/issues/11031)** — 已关闭的 P1：空会话的导出体积达到 19.5 MB，触发了导出管线清理；相关 mermaid 扁平化工作正与 [#11091](https://github.com/QwenLM/qwen-code/issues/11091) 一同跟踪。
6. **[#11146 — 已提前中止的工具请求仍可能排在无关活动批次之后等待](https://github.com/QwenLM/qwen-code/issues/11146)** — `CoreToolScheduler.schedule()` 会让已取消的请求继续在繁忙批次后排队，而不是立即拒绝，给这些已失效的请求徒增延迟。
7. **[#9911 — 在 WebShell 切换后恢复 VS Code 消息编辑与回退](https://github.com/QwenLM/qwen-code/issues/9911)** — WebShell 迁移期间移除了旧的逐条消息编辑/回退交互；应基于 daemon 快照 API 重新实现，以与旧体验对齐。
8. **[#8542 — [ACP] 支持在 turn 运行期间发送/排队消息](https://github.com/QwenLM/qwen-code/issues/8542)** — ACP 与 IDE 用户仍缺少 CLI 中“agent 仍在工作时即可提交”的体验；这是一个反复出现的集成需求主题。
9. **[#11217 — Anthropic SSE 失败时仍上报成功的 headless JSON 结果](https://github.com/QwenLM/qwen-code/issues/11217)** — 针对 Anthropic 兼容 SSE 误报成功 bug 的新复现：错误在 HTTP 200 之后才到达，而 headless 模式仍会报告成功。
10. **[#11109 — `release.yml` 重复执行同一次运行已完成的工作，且某个 20 分钟步骤未验证任何内容](https://github.com/QwenLM/qwen-code/issues/11109)** — 今天有两次发布运行超时；CI 管线将大部分实际耗时花在冗余工作上。相关 ECS/E2E 超时 issue：[#11209](https://github.com/QwenLM/qwen-code/issues/11209)。

### 关键 PR 进展

1. **[#11208 — 添加有界历史会话记录视口](https://github.com/QwenLM/qwen-code/pull/11208)** — 会话级 turn 导航的第 2B 阶段：只读历史窗口、对被逐出后留下的历史空隙进行恢复，以及回到实时消息流末尾的行为。
2. **[#11003 — 通过 ACP 将子代理 turn 委托给外部 agent（首选 Claude Code）](https://github.com/QwenLM/qwen-code/pull/11003)** — 子代理定义中可以指定一个外部命令；该 turn 通过 ACP 驱动，并重新发布回会话流中。
3. **[#11207 — 支持带会话 fencing 的并发独立 daemon](https://github.com/QwenLM/qwen-code/pull/11207)** — daemon 可以并发共享 Conversations，同时保留每个会话强制性的单写者租约（包括 Live/定时任务）。
4. **[#11220 — 对 Web Shell 会话记录响应启用 gzip 压缩](https://github.com/QwenLM/qwen-code/pull/11220)** — 直接针对 #6181 中移动端大型会话的加载开销。
5. **[#11177 — 在 Web Shell 右侧边栏添加“上下文用量”标签页](https://github.com/QwenLM/qwen-code/pull/11177)** — 一个按需开启的面板，与现有 token 用量标签页并列，实时显示上下文窗口占用情况。
6. **[#10906 — 在 Web Shell 任务详情面板中展示 shell 与 monitor 任务输出](https://github.com/QwenLM/qwen-code/pull/10906)** — 将 monitor 的 stdout/stderr 与 shell 捕获内容一起持久化，并暴露一个经脱敏处理的实时 tail 端点。
7. **[#11189 — 封堵工具结果脚手架与系统提醒回显泄漏](https://github.com/QwenLM/qwen-code/pull/11189)** — 修复了 #10797 中绕过现有泄漏防御的剩余两种用户可见脚手架泄漏形态。
8. **[#10347 — 在无法使用 Ctrl+Y 时自动重试瞬时网络错误（EOF）](https://github.com/QwenLM/qwen-code/pull/10347)** — 将包装后的底层网络失败重新归类为可重试的传输错误，而非快速失败的客户端错误。
9. **[#10938 — 让 Session Workflow 依赖可导航，并收敛其界面装饰](https://github.com/QwenLM/qwen-code/pull/10938)** — 对 plan DAG 与 inspector UI 做了一轮设计调整，让图以步骤本身而非其状态为先。
10. **[#11134 — 为瞬时性全绿 macOS E2E 分片死亡增加一次重试](https://github.com/QwenLM/qwen-code/pull/11134)** — 为 macOS E2E 环节补充了与 Linux `sandbox:none` 相同的预算受限重试机制。

### 功能需求趋势

- **Web Shell 成为主要会话工作区：** 动态工作流运行可视化、有界历史导航、上下文/token 用量监控、shell/monitor 任务输出，以及会话切换性能，正在汇聚成一种由浏览器承载的 IDE 式体验。
- **ACP/agent 互操作性：** 外部 agent 委托（[#11003](https://github.com/QwenLM/qwen-code/pull/11003)）、在 turn 运行期间排队发送消息（[#8542](https://github.com/QwenLM/qwen-code/issues/8542)），以及恢复 VS Code 时代的编辑/回退（[#9911](https://github.com/QwenLM/qwen-code/issues/9911)），都体现了推动客户端与进程内 agent 运行时解耦的趋势。
- **安全成为贯穿会话生命周期的属性：** 技能 `PreToolUse` 门禁、跨 `--continue` 与 `/skill` 入口的钩子强制生效，以及工具错误的遥测脱敏，是本周期最迫切的需求。
- **小巧且可回放的导出：** 围绕 [#11031](https://github.com/QwenLM/qwen-code/issues/11031) 与 [#11091](https://github.com/QwenLM/qwen-code/issues/11091) 的导出管线清理，反映了对无需内嵌运行时、可移植可分享的会话记录更广泛的需求。

### 开发者痛点

- **工具取消/排队的边界情况：** 已取消的请求可能排在无关的活动批次之后等待（[#11146](https://github.com/QwenLM/qwen-code/issues/11146)）；常规的排队取消也可能跳过必要的完成清理（[#11162](https://github.com/QwenLM/qwen-code/issues/11162)）。
- **兼容 API 上的静默成功/失败：** Anthropic SSE 错误会上报成功的 headless JSON 结果（[#11217](https://github.com/QwenLM/qwen-code/issues/11217)）；无状态码的 SSE 限流会绕过重试/退避机制（[#11215](https://github.com/QwenLM/qwen-code/issues/11215)）；`/effort` 不会传递给 OpenAI 兼容后端（[#11227](https://github.com/QwenLM/qwen-code/issues/11227)）。
- **技能安全门禁悄然停止触发：** `PreToolUse` 钩子通过 `/<skill-name>` 调用（[#11067](https://github.com/QwenLM/qwen-code/issues/11067)）以及在 `--continue` 之后（[#11180](https://github.com/QwenLM/qwen-code/issues/11180)）都会失效，削弱了其作为安全护栏的价值。
- **未脱敏的遥测：** 包含 shell 命令行在内的工具错误原始文本，默认会被上传至 RUM（[#11198](https://github.com/QwenLM/qwen-code/issues/11198)）。
- **CI/发布管线不稳定：** 发布运行持续在 `quality`/`integration_docker` job 上失败（[#10757](https://github.com/QwenLM/qwen-code/issues/10757)、[#10853](https://github.com/QwenLM/qwen-code/issues/10853)、[#11185](https://github.com/QwenLM/qwen-code/issues/11185)）；`release.yml` 重复已有工作，并且包含一个 20 分钟的空操作步骤（[#11109](https://github.com/QwenLM/qwen-code/issues/11109)）。
- **移动端与大型会话记录性能：** 未压缩的全量历史加载、每帧 O(transcript) 渲染，以及无视抽屉状态的轮询，让手机上的会话切换非常痛苦（[#6181](https://github.com/QwenLM/qwen-code/issues/6181)）。
- **可诊断性缺口：** 会话记录规范化会在重放时丢弃用户的 `resource_link` 附件（[#11178](https://github.com/QwenLM/qwen-code/issues/11178)）；daemon 的错误处理将字面字符串 `[object Object]` 写入日志，而非真实错误（[#11123](https://github.com/QwenLM/qwen-code/issues/11123)）。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*