# AI CLI 工具社区动态日报 2026-09-10

> 生成时间: 2026-09-09 22:46 UTC | 覆盖工具: 7 个

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

# 跨工具 AI CLI 社区对比报告
**日期：2026-09-10 · 窗口：2026-09-09 → 2026-09-10 · 来源：官方项目社区摘要（Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、OpenCode、Pi、Qwen Code）**

---

## 1. 生态系统概览

AI CLI agent 领域正处于高强度并行迭代之中：七个工具在一天之内合计交付了约 14 个发布产物——从补丁修复（Claude Code v2.1.266/v2.1.267、Copilot CLI v1.0.84-3），到重大功能上线（Codex v0.154.0 携 GPT-6-Astra 与实验性 worktrees），再到 SDK/驱动发布（Qwen）。社区反馈正从“agent 能否完成任务”转向“我们能否在规模化场景下信任 agent”：呼声最高且反复出现的问题包括子代理完成状态的诚实性、静默的上下文/压缩丢失、消耗 token 的后台轮询，以及 Windows 特有故障。可扩展性正成为下一个竞争层，Claude Code 的 Function Hooks 提案（收获 153 条评论）引领了一场更广泛的推进，方向是可组合插件、可热重载配置、可靠的 MCP/扩展管道。维护者则以加固工作作为回应，覆盖沙箱边界、Guardian/审查预算、守护进程持久化以及新的自主性校准控制。

---

## 2. 活动对比

以下为各项目摘要报告的活动；计数对应聚合窗口内的情况，“精选”表示经过筛选的子集而非绝对总数。该集合中没有任何项目在上游禁用 Issues/PRs；Codex 与 Pi 是明确使用 Discussion 频道的项目。

| 工具 | Issues（窗口内） | PRs（窗口内） | Discussions（窗口内） | 发布状态 |
|---|---|---|---|---|
| Claude Code | 精选 10 个热门 issue（含 153 条评论的 #91870） | 1 个更新 | — | 2 个补丁：v2.1.266（gateway 回归修复）、v2.1.267（effort 上限、system-prompt 快照） |
| OpenAI Codex | 精选 10 个热门 issue（榜首：Windows 冻结 #20214，111 条评论 / 87 👍） | 大批合并；列出 10 个关键 PR | 精选 11 个（榜首：远程控制 #9200，190 👍） | v0.154.0 + 4 个 alpha 构建 |
| Gemini CLI | 50 个更新；精选 10 个（P1 子代理假成功 #22323） | 25 个更新；精选 10 个 | — | 1 个 nightly（NTFS + 沙箱修复）；无稳定版 |
| GitHub Copilot CLI | 精选 10 个热门 issue（WSL2 CPU 空转 #3700、会话归档 #4756） | 2 个活跃（均为文档） | — | v1.0.84-3（针对性修复） |
| OpenCode | 50 个近期更新；精选 10 个（热重载 #8751，96 👍） | 精选 10 个（3+ 个合并/清理） | — | v1.18.30（Astra prompt、provider 修复） |
| Pi | 精选 10 个热门 issue（认证延迟 #8928、过期模型 #8760/#9294） | 6 个更新（5 个实质性） | 精选 2 个（扩展展示） | 窗口期内无发布 |
| Qwen Code | 10 个热门 + 3 个值得关注（conhost 泄漏 #11303、历史清空 #11489） | 24 小时内更新 50 个；精选 13 个 | 未报告 | v0.23.2 + nightly + TS SDK v0.1.11 + cua-driver v0.20.5 |

注释：“—”表示该摘要未报告该仓库的 Discussion 活动（基于 issue tracker 的社区渠道）。“更新”包括被触碰/被合并的条目，而不仅指新开启的。Claude Code 正处于安静的合并期（1 个 PR），但其 issue 讨论量是本窗口内所有仓库中最大的。

---

## 3. 共同的功能方向

**3.1 真实且可感知中断的 agent 状态。** Gemini 的 P1 #22323——一个子代理触发 MAX_TURNS 后上报 `status: "success"`，但实际没有任何产出——是整个行业问题的最清晰信号。Codex（#15723）报告后台 agent 永远不会唤醒调用方；OpenCode 的自动批准也不会级联到子代理（#41730）。需求：可感知中断的状态、基于推送的完成通知、继承的权限范围。

**3.2 上下文与压缩的完整性。** Codex 的自动压缩会静默丢弃历史记录（#36642）；OpenCode 的 Kimi 压缩会产生空摘要（#41571），同时压缩内部细节还会泄漏进 JSONL 输出（#42238）；Gemini 正在修复 SIGINT/中断回合导致的会话上下文污染（PR #29265）；Pi 在中断回合后会出现不匹配的 `toolCall` 块（#9306）；Qwen 的 VS Code 扩展更新会清空对话历史（#11489）；Claude Code 对 1M 上下文窗口的核算有误（#81693）。需求：明确同意、准确的摘要，以及在压缩、中断、重启和更新过程中零数据丢失。

**3.3 终结轮询策略。** Codex 的 #13733 与 #35259 量化了这种代价——等待/状态轮询可占原始 token 量的约 19.8%。Qwen（#11119）显示当会话运行时被回收时，后台 shell 输出与唤醒通知会消失。需求：事件驱动的唤醒机制，以及取消短期阻塞等待上限。

**3.4 安全、可组合的可扩展性。** Claude Code 的 Function Hooks 提案（#91870，153 条评论）——带副作用追踪的中间件式 `next()` 组合——是对共同需求最强有力的表达。OpenCode 的 96 👍 热重载请求（#8751）、Copilot 的插件依赖模型（#4487）与 Pi 的扩展 API 摩擦（#9290，缺少 `x-opencode-session` 请求头）都指向同一需求：能深度集成、可热重载且可安全回滚的插件。MCP 可靠性（Qwen #11499 中的环境变量展开、Copilot 的 OAuth 启动修复、托管 Codex Apps 的 MCP 选择加入 PR #44318）在协议层上是同一个需求。

**3.5 沙箱与供应链加固。** Gemini 有两个大型开放 PR（#29250、#29214），分别应对经由构建文件/不可信标志的间接提示注入和文件系统边界逃逸；Codex 合并了 WSL interop 逃逸修复（#44286）；Qwen 加固了审查沙箱容器，防止宿主可信状态泄漏到其中（#9983）；Pi 社区标记了一个疑似无人维护/恶意的扩展包（#9381）；而 Gemini 的 Auto Memory 在脱敏*之前*就把记录发送给提取模型（#26525）。需求：把沙箱视为安全边界，而不是 UX 功能。

**3.6 Windows 作为一等平台。** 每个主要工具都有 Windows 专属的 P1：Claude Code 的 Cowork Plan9 挂载被 KB5124008 破坏（#92984）；Codex 的桌面冻结（#20214）与“没有窗口出现”（#42669）；Copilot 的 WSL2 空闲时 CPU 占用飙至 ~215%（#3700）；Qwen 的 347 个孤儿 `conhost.exe` 泄漏（#11303），且上游 `node-pty` 已陷入死胡同（#11352）；Gemini 的 NTFS 8.3 短文件名路径修复（PR #29116）。Windows 正是当前信任正在流失的平台。

**3.7 跨设备与远程会话连续性。** Codex 的 190 👍 远程控制诉求（#9200）已从“不存在”变成“实践中不可靠”（#41470）；Qwen 正在响应本地客户端/远程守护进程架构的需求（#11475）；Claude Code 中被陈旧关闭（stale-closed）的跨设备会话请求（#85150）体现了企业预期：会话状态应当比单个终端活得更久。需求：守护进程托管的持久化，以及跨客户端的项目绑定会话。

**3.8 自主性校准。** Claude Code 新的 `maxEffortLevel`（v2.1.267）、Codex 在三次空的自动延续后阻止目标继续的 PR（#44320），以及 OpenCode 的目标模式分析（#48239/#48240），都在回应 Claude Code #85052 中浮现的同一个摩擦点：护栏仪式正在沦为打勾走过场。用户想要的是限制工作量，而不只是批准操作。

---

## 4. 差异化分析

| 工具 | 差异化重点 | 目标用户画像 |
|---|---|---|
| **Claude Code** | 企业工作流治理：中间件式 Function Hooks 提案、内置且已内部自用的 mods（`sec-default`、`diff`、`telemetry`）、gateway/代理感知认证、effort 上限、面向调试的渲染（`--system-prompt-snapshot off`） | 使用 Claude 订阅的专业/企业工程师；proxy/gateway 与策略密集型部署 |
| **OpenAI Codex** | 常驻型 agent 平台：托管守护进程、worktrees、ChatGPT 远程控制、移动同步、Guardian 审查预算、沙箱加固 | 以 ChatGPT 为中心、云端同步的团队；Windows 桌面用户（当前最薄弱环节） |
| **Gemini CLI** | 安全优先、shell 原生 agent：沙箱执行是 PR 的主导主题；投入 AST 感知的代码导航与 Auto Memory；nightly 节奏 | 使用 Google 模型的开发者，以及安全敏感/自动化工作流 |
| **GitHub Copilot CLI** | GitHub 生态集成：CAIP/WebSocket agent 协议、Mission Control、MCP registry、托管策略；保守、成熟的发布节奏 | 策略驱动组织中的 GitHub 企业开发者 |
| **OpenCode** | 配置驱动、多 provider 的开源工具：热重载文化、按项目 `AGENTS.md`、ACP 会话选项、无头 `serve`、将 plan 模式作为不变式强制执行、桌面应用 | OSS 社区与多模型团队；`--format json` 的 CI/自动化消费者 |
| **Pi** | 轻量、扩展优先的另类路线：无内置权限弹窗，以第三方权限门（`pi-verdict`）为展示案例；扩展驱动的子代理视图 | 扩展作者、TUI 纯粹主义者、长时间运行的本地会话 |
| **Qwen Code** | 多界面平台打法：VS Code Companion、守护进程托管的 Web Shell（可白标）、TypeScript SDK、预构建 CUA 驱动二进制、远程开发支持 | VS Code 用户、Web 部署/白标组织、阿里生态与多设备工作流 |

技术路线的分歧很明显：Claude Code 以安全 hooks/中间件为核心；Codex 以弹性的托管守护进程外加云/移动同步为核心；Gemini 以加固沙箱中的 bash 原生行为为核心；Copilot 以 GitHub 的 agent 协议为核心；OpenCode 以配置即代码和 provider 中立为核心；Pi 以由社区包扩展的最小核心为核心；Qwen 以分布式守护进程/Web Shell/驱动栈为核心。

---

## 5. 社区动量与成熟度

**发布速度最快：** Qwen Code（更新 50 个 PR、4 个发布产物）与 Gemini CLI（25 个 PR、针对性 nightly）迭代最快，不过两者都还带着开放的 P1 信任相关 bug（conhost 泄漏；子代理假成功/挂起）。OpenAI Codex 也表现出很强的工程吞吐——大批合并的 PR 外加 alpha 构建——但其 Windows 可靠性 backlog 是全部仓库中评论最多的问题集（#20214 有 111 条评论）。

**信号最强的社区讨论：** Claude Code 的 Function Hooks 讨论帖（153 条评论、90 👍）仍是该领域最重要的架构讨论；Codex 的远程控制诉求（190 👍）与 OpenCode 的热重载请求（96 👍）定义了各自路线图的需求侧。Pi 和 Copilot CLI 的社区更小也更安静：Pi 的摘要以扩展展示为主，而 Copilot CLI 唯一活跃的 PR 只有文档——但其社区仍在反复重提一年前的浅色主题 bug（#135）和反复出现的 400 WebSocket 错误（#2147/#4791），暗示其响应性存在缺口。

**整体成熟度排名：** Copilot CLI（v1、稳定、保守）与 Claude Code（企业级，但本窗口以补丁为主）最为成熟；Codex 与 Gemini 在工程上成熟速度最快，但仍在积累平台债；Qwen 与 OpenCode 是高速追赶者，拥有强大的多 provider 覆盖；Pi 是一个规模小但参与度高的利基项目，并为其他工具提供了有分量的扩展 API 经验。

---

## 6. 趋势信号

1. **agent 状态必须先诚实，然后才可能自主。** 本窗口破坏性最大的一类 bug，是把已中断的工作伪装成目标成功（Gemini #22323），或是空转的自动延续循环（Codex #44320）。CI/自动化采用者应把状态语义当作安全边界，而不是日志细节。
2. **上下文管理正在变成一种“同意式”UX。** 静默丢弃历史的压缩（Codex #36642）、把内部细节泄漏进结构化输出（OpenCode #42238）、或生成空摘要的压缩（OpenCode #41571），都是失去用户信任最快的路径。可以预期，“什么会被摘要/移除、在什么时候发生”会成为一等 UI 界面。
3. **轮询正在被整个生态抛弃。** 等待轮询带来的 token 浪费（Codex #13733/#35259）、后台输出丢失（Qwen #11119）以及缺失的唤醒（Codex #15723）都指向同一个行业预期：agent 应当推送事件，而不是重新进入模型检查是否完成。
4. **中间件式插件架构正在成为 agent 可扩展性的新兴标准。** Claude Code 的 `next()` 延续钩子提案、Pi 的看门狗式权限门以及 OpenCode 的热重载需求，收敛在同样的设计约束上：可组合、顺序敏感、副作用可追踪、可回滚。
5. **沙箱与供应链卫生是无人值守模式的先决条件。** 通过构建文件实施的间接提示注入（Gemini #29250）、WSL interop 逃逸（Codex #44286）、提取后才脱敏（Gemini #26525）以及被标记的第三方包（Pi #9381），定义了自主 agent 的威胁模型。
6. **Windows 可靠性是当前争夺开发者信任的战场。** 几乎每个工具都有一个 Windows P1——Plan9 挂载、conhost/ConPTY 泄漏、WSL2 CPU 空转、应用窗口不出现。跨平台支持不再是基本门槛，而是差异化优势。
7. **会话状态正在与终端解耦。** 守护进程线程恢复（Codex #44314）、远程守护进程（Qwen #11475）与跨设备连续性预期（Codex #9200、Claude #85150）表明，客户端正成为一个持久、可恢复的 agent 会话的展示窗口。
8. **自主性正在变成可配置的预算，而非二元模式。** `maxEffortLevel`、目标循环阻止器与目标模式提案都表明，行业正收敛于显式的控制旋钮，用来决定“agent 在汇报之前应做多少工作”。

**对开发者的参考价值：** 今天评估 AI CLI 工具时，应将四件事置于原始模型质量之上：它如何处理中断任务的完成状态；在压缩/上下文丢失方面有哪些保护措施；后台工作是事件驱动还是轮询驱动；以及它在 Windows 上的表现是否健康。次要的差异化因素——插件安全、沙箱强度、会话连续性、工作量校准——则是未来两个季度各工具真正拉开差距的地方。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

报告说明：提供的数据集未暴露数值型 `Comments` 值，因此排名沿用原始列表的顺序；该列表按评论数排序。展示的所有 PR 均处于开启状态——快照中没有任何一个被标记为已合并。

## 1. 热门技能排名

**1. `skill-creator` 评估修复 —— [PR #1298](https://github.com/anthropics/skills/pull/1298)**  
这不是一个面向用户的技能，而是对负责生成/评估技能的 `skill-creator` 工具的关键修复。它通过把评估产物安装为真正的技能，修复了 `run_eval.py` 始终报告 `recall=0%` 的问题；同时还处理了 Windows 子进程/流读取、触发检测和并行 worker 等问题。  
**讨论亮点：** 引用了社区 issue [#556](https://github.com/anthropics/skills/issues/556)，已有 10 多个独立复现；描述优化循环实际上是在“对噪声做优化”。  
**状态：** 开启中。

**2. `document-typography` —— [PR #514](https://github.com/anthropics/skills/pull/514)**  
新增一个文档质量控制技能，用于处理生成文档中的排版问题：单词孤立换行、被遗留在页面底部的段落/章节标题孤行，以及编号错位。  
**讨论亮点：** 将其定位为普遍性问题——这些问题影响“Claude 生成的每一份文档”，而用户很少明确要求良好排版。  
**状态：** 开启中。

**3. `scnet-hpc` —— [PR #1615](https://github.com/anthropics/skills/pull/1615)**  
新增一个领域专用技能，用于通过基于 profile 的 SSH 和 Slurm 工作流操作 SCNet HPC 集群。涵盖集群发现、分区/内存/模块/加速器指导、SSH 设置、Slurm 作业生成、profile 刷新以及计算节点说明。  
**讨论亮点：** 一个完整的 HPC 工作流技能，对科研用户很有用；2026 年 8 月仍有活跃更新。  
**状态：** 开启中。

**4. `pdf` 文件引用修复 —— [PR #538](https://github.com/anthropics/skills/pull/538)**  
修复 PDF 技能 `SKILL.md` 中 8 处大小写不匹配：`REFERENCE.md` → `reference.md`、`FORMS.md` → `forms.md`。  
**讨论亮点：** 小但有意义的可靠性修复，针对大小写敏感的文件系统；文件本身是小写，但技能引用了大写名称。  
**状态：** 开启中。

**5. `odt` —— [PR #486](https://github.com/anthropics/skills/pull/486)**  
新增 OpenDocument 格式支持：创建/填充/读取/转换 `.odt` 和 `.ods`，包括模板填充和 ODT 转 HTML 解析。触发条件包括：提及 ODF、OpenDocument、LibreOffice、ODT/ODS，或请求符合 ISO 标准的文档。  
**状态：** 开启中。

**6. `frontend-design` 清晰度改进 —— [PR #210](https://github.com/anthropics/skills/pull/210)**  
修订 `frontend-design` 技能，使指令在单次会话内可执行、内部自洽，并且足够具体以引导行为，而不是泛泛而谈。  
**讨论亮点：** 反映了社区反复出现的抱怨——技能应当是给 Claude 的指令，而不是面向人类的开发者文档。  
**状态：** 开启中。

**7. `skill-quality-analyzer` 与 `skill-security-analyzer` —— [PR #83](https://github.com/anthropics/skills/pull/83)**  
向技能市场新增两个元技能：一个质量分析器，从五个加权维度评估结构、文档、示例和资源；另一个是安全分析器，用于分析有风险的技能行为。  
**讨论亮点：** 直接回应了社区对“社区贡献技能托管在 Anthropic 官方命名空间下”的安全担忧。  
**状态：** 开启中。

**8. DOCX 孤立批注检测 —— [PR #1734](https://github.com/anthropics/skills/pull/1734)**  
数据集中该 PR 的描述为空，但标题表明这是一个用于检测孤立 DOCX 批注的文档完整性功能。它吸引了足够多的评论，因此出现在热门 PR 列表的靠前位置。  
**状态：** 开启中。

## 2. 社区需求趋势

Issues 数据揭示了几个高度集中的需求领域：

- **技能的安全与信任边界。** 最大的 issue [#492](https://github.com/anthropics/skills/issues/492) 涉及在 `anthropic/` 命名空间下分发的社区技能冒充 Anthropic 官方技能。[#1175](https://github.com/anthropics/skills/issues/1175) 还提出处理 SharePoint 文档时的访问控制和上下文窗口担忧。社区要求身份隔离、权限护栏和技能安全分析。

- **技能的评估与可衡量质量。** Issue [#556](https://github.com/anthropics/skills/issues/556) 和 [#1390](https://github.com/anthropics/skills/issues/1390) 反映出对评测工具报告假零结果的强烈不满。社区需要的不是更多技能，而是可靠的方法来测试技能描述是否真的会触发、能否跨平台运行，并产生有效指标。

- **上下文窗口效率。** Issue [#1487](https://github.com/anthropics/skills/issues/1487) 报告 `claude-api` 技能会主动向上下文注入约 156k tokens。Issue [#1329](https://github.com/anthropics/skills/issues/1329) 提出用 `compact-memory` 技能以符号化表达降低长时间运行 agent 的记忆开销。插件之间的重复内容（[#189](https://github.com/anthropics/skills/issues/189)）也在浪费上下文。

- **组织级共享与打包。** Issue [#228](https://github.com/anthropics/skills/issues/228) 请求在 Claude.ai 中实现组织级技能共享，而无需手动下载 `.skill` 文件。相关打包问题包括：`document-skills` 与 `example-skills` 之间的重复技能（[#189](https://github.com/anthropics/skills/issues/189)）、将技能作为 MCP API 暴露（[#16](https://github.com/anthropics/skills/issues/16)）、以及通过 Bedrock 运行技能（[#29](https://github.com/anthropics/skills/issues/29)）。

- **文档/产物质量保障。** 社区一再要求为生成的产物增加校验层：排版质量（[PR #514](https://github.com/anthropics/skills/pull/514)）、孤立 DOCX 批注（[PR #1734](https://github.com/anthropics/skills/pull/1734)）、OOXML 完整性修复（[PR #541](https://github.com/anthropics/skills/pull/541)），以及自我审计/推理质量闸门（[#1385](https://github.com/anthropics/skills/issues/1385)）。

## 3. 高潜力的待合入技能

以下开放 PR 新增或大幅扩展了技能，并且已获得足够的社区关注和近期活跃度；只要维护者继续推进 review，便有望很快合入：

- **`testing-patterns` —— [PR #723](https://github.com/anthropics/skills/pull/723)**  
  一个覆盖面很广的测试技能，包含测试哲学、单元测试模式、React 组件测试，以及不应当测试的内容。风险低，通用性强。

- **`self-audit` —— [PR #1367](https://github.com/anthropics/skills/pull/1367)**  
  一个通用的交付前审计技能：先做机械性文件校验，再按危害严重程度顺序执行四维推理质量审计。与社区的质量闸门需求高度一致。

- **`Hivemind` —— [PR #1628](https://github.com/anthropics/skills/pull/1628)**  
  零成本多智能体编排：Claude Code 负责计划/审查/合并，而运行在免费模型上的无头 `opencode` worker 处理机械性工作。社区关注度很高，但可能需要更深入的安全审查。

- **`buffer-api` —— [PR #1627](https://github.com/anthropics/skills/pull/1627)**  
  一个面向 Buffer GraphQL API 的可移植 Agent 技能：支持账户/频道发现、帖子排程和队列管理。可跨 Claude、Cursor、Codex 及其他 agent 使用。

- **`scnet-hpc` —— [PR #1615](https://github.com/anthropics/skills/pull/1615)**  
  上面热门排名中已可见；这是一个边界清晰、由 profile 驱动的 HPC/Slurm 技能，近期有活跃更新，也没有明显的跨平台脆弱性。

- **`odt` —— [PR #486](https://github.com/anthropics/skills/pull/486)**  
  OpenDocument 互操作性是文档格式方面反复出现的缺口；该技能将完善仓库对办公格式的覆盖。

- **`skill-quality-analyzer` / `skill-security-analyzer` —— [PR #83](https://github.com/anthropics/skills/pull/83)**  
  这两个元技能正面回应了生态系统中最大的治理缺口：如何在用户安装技能之前评估技能并确保其安全性。

## 4. 技能生态洞察

社区最集中的需求不是更多领域专用技能，而是**让技能本身更安全、可衡量、节省上下文且值得信赖的元技能与基础设施**——质量分析器、评测工具修复、`compact-memory` 模式、自我审计闸门，以及文档/产物完整性检查。

---

# Claude Code 社区文摘 — 2026-09-10
*时间窗口：2026-09-09 → 2026-09-10 · 来源：https://github.com/anthropics/claude-code*

## 今日亮点

Claude Code 发布了两个补丁版本：v2.1.266 修复了 v2.1.265 引入的网关/代理登录回归问题；v2.1.267 新增了跨提供商的 effort 上限（`maxEffortLevel`），以及 `--system-prompt-snapshot off`，用于在每次请求时重新渲染系统提示词。社区目前最活跃的讨论是 Function Hooks 提案（[#91870](https://github.com/anthropics/claude-code/issues/91870)，153 条评论，90 👍），目标是构建安全、可组合的插件架构；配套 PR 则将 Claude Code 内置的 `sec-default`、`diff`、`telemetry` 这几个 mod 作为 hook 模块发布。bug 方面：Windows 更新（KB5124008）正在破坏所有 Cowork Plan9 挂载（[#92984](https://github.com/anthropics/claude-code/issues/92984)）；同时一次针对陈旧 issue 的清理关闭了多个尚未解决的 1M 上下文与防护误报报告（[#81693](https://github.com/anthropics/claude-code/issues/81693)、[#83436](https://github.com/anthropics/claude-code/issues/83436)），使其修复状态变得不明朗。

## 版本发布

- **[v2.1.267](https://github.com/anthropics/claude-code/releases)** —— 聚焦控制力与可调试性：
  - 新增 `maxEffortLevel` 设置（顶层或 `modelSettings` 下按模型配置）：为所有提供商（包括 Bedrock、Vertex 和 Foundry）的 effort 级别设置上限；用户仍可选择更低的级别。
  - 新增 `--system-prompt-snapshot off`，在每次请求时重新渲染系统提示词——对调试 hook 交互和 prompt 缓存边界场景很有用。

- **[v2.1.266](https://github.com/anthropics/claude-code/releases)** —— 修复代理/网关用户的回归问题：
  - 修复了 v2.1.265 的一个回归：`CLAUDE_CODE_USE_GATEWAY` 开始自行强制 Cloud 网关登录。之前只有在同时设置 `ANTHROPIC_BASE_URL` 和 `ANTHROPIC_AUTH_TOKEN` 时它才会生效；v2.1.266 恢复了这一行为。对需要及时升级的 LLM 网关和代理环境很重要。

## 热门 issue

1. **[[#91870] Function Hooks：让插件强大 10 倍](https://github.com/anthropics/claude-code/issues/91870)** —— 开放中 · 153 条评论 · 90 👍
   目前仓库中社区参与度最高的话题。它提出了一个中间件风格的 hook 系统（按注册顺序调用 `next` 延续，Express/Koa 风格），通过参数化的 `$` 对象进行副作用追踪，从而实现对 Claude Code 深入但安全的修改。这似乎是关于插件架构未来方向最清晰的公开信号。

2. **[[#92984] Windows Cowork：KB5124008 之后所有 Plan9 共享均失败](https://github.com/anthropics/claude-code/issues/92984)** —— 开放中 · 24 条评论 · 11 👍
   昨天提交，附带复现步骤：安装 Windows 更新 KB5124008（26200.9445）后，所有 Cowork Plan9 挂载失败并报错 `Plan9 mount failed: invalid argument`；卸载该 KB 即可恢复。对 Windows Cowork 用户来说是硬阻塞，社区参与度高，且已有具体可行的临时解决方案。

3. **[[#64568] 按 Esc 退出 /btw 模式会拒绝待处理的工具调用提示](https://github.com/anthropics/claude-code/issues/64568)** —— 开放中 · 13 条评论 · 9 👍
   长期存在的 TUI 回归问题：按 Esc 退出 `/btw` 模式时，按键事件被送入了待处理的权限提示，结果拒绝了工具调用，而不是仅仅退出该模式。意外拒绝工具会侵蚀用户对权限流程的信任；该 issue 已开放三个月仍未解决。

4. **[[#83436] 科学计算会话触发网络防护误报](https://github.com/anthropics/claude-code/issues/83436)** —— 已关闭（过期） · 12 条评论
   一次合法的红外光谱仪校准会话被网络防护反复拦截，由累积上下文触发，同时影响 Opus 5 和 Opus 4.8。该 issue 因过期被关闭，没有可见的解决方案——代表了一种反复出现的误报模式。

5. **[[#81693] Opus 5 上下文窗口被误报为 200K 而非 1M](https://github.com/anthropics/claude-code/issues/81693)** —— 已关闭（过期） · 6 条评论
   CLI 对 1M 上下文模型报告 `context_window_size: 200000`，导致状态栏仪表饱和，`/compact` 看起来也没效果。加上类似的 Sonnet 5 报告（[#84310](https://github.com/anthropics/claude-code/issues/84310)），这表明内部在 1M 上下文模型的核算上存在系统性缺口。

6. **[[#79810] 切换 Claude 账户后自定义侧边栏分组消失](https://github.com/anthropics/claude-code/issues/79810)** —— 开放中 · 5 条评论 · 4 👍
   桌面应用用户将项目整理到自定义侧边栏分组后，切换账户再切回来，分组结构就丢失了。这个组织数据层面的 bug 对重度多账户用户尤其有破坏性。

7. **[[#85052] Opus 5：结构性护栏可以用仪式化流程满足——22 轮评审](https://github.com/anthropics/claude-code/issues/85052)** —— 已关闭（过期） · 3 条评论
   一份来自长时间自主会话的独特报告：模型在派发外部评审之前本应自己发现的缺陷上，消耗了大约 22 轮外部评审，说明精心设计的护栏仪式最终可能变成走过场，而不是真正的质量闸门。对任何正在构建智能体评审循环的人都值得一读。

8. **[[#85150] Claude Code 的跨设备会话连续性](https://github.com/anthropics/claude-code/issues/85150)** —— 已关闭（过期） · 3 条评论
   一位 Max 用户要求让长时间运行的业务会话可以跨设备延续。该 issue 被过期清理关闭，但它反映了一个企业级预期：会话状态不应绑定在单个终端或机器上。

9. **[[#88293] VS Code 集成终端中光标跳动并覆盖文本](https://github.com/anthropics/claude-code/issues/88293)** —— 开放中 · 1 条评论
   macOS 特有的 TUI bug（[#3116](https://github.com/anthropics/claude-code/issues/3116) 的延续）：在 VS Code 终端中运行几分钟后，方向键会触发光标跳动/覆盖文本。虽然小众，在常见开发者环境中却非常显眼。

10. **[[#88877] 无头 Linux 上的 OAuth redirect_uri 不匹配](https://github.com/anthropics/claude-code/issues/88877)** —— 开放中 · 1 条评论
    v2.1.240 生成的是 `/auth/code/callback`，但 OAuth 服务器期望的是 `/oauth/code/callback`，导致无头 Ubuntu VPS/tmux 环境无法登录。对基于 SSH 和重度自动化的工作流至关重要。

注：上面多份实质性报告在 2026-09-09 被过期清理关闭，且没有附带“已修复”状态，社区很难判断它们是被静默修复了，还是被直接放弃。

## 关键 PR 进展

过去 24 小时内只有一个 PR 有更新，所以通常的 top 10 列表这次更短：

- **[[#93215] 新增 mods：sec-default、diff 和 telemetry](https://github.com/anthropics/claude-code/pull/93215)** —— 已关闭 · 作者：poteat
  以源码形式发布 Claude Code 内置的三个 hooks 模块插件：`sec-default`（组织的默认最外层插件）、`diff`（`/diff`）和 `telemetry`（`$.telemetry`）。每个文件夹都是一个完整插件，文档在 `mods/README.md`；它们只在启用了函数 hooks（“early access”）的环境下加载。与 [#91870](https://github.com/anthropics/claude-code/issues/91870) 的重叠很值得注意：它把安全默认、diff 和 telemetry 当作函数 hooks 运行时的一等示例——也就是说，Claude Code 正在用自己的未来插件架构做 dogfooding。

没有其他 PR 活动满足 24 小时过滤条件；仓库似乎正处在一个安静的合并期，补丁发布和 hooks 讨论占据了中心舞台。

## 功能请求趋势

- **安全、可组合的插件/hook 架构。**[#91870](https://github.com/anthropics/claude-code/issues/91870) 是社区最明确的诉求：深度可修改性、副作用追踪、Express/Koa 式的组合能力。PR [#93215](https://github.com/anthropics/claude-code/pull/93215) 则表明内置的 `sec-default`、`diff`、`telemetry` 模块将成为参考示例。
- **跨设备、跨客户端的会话连续性。**[#85150](https://github.com/anthropics/claude-code/issues/85150)（面向 Max 的跨设备会话）和 [#85131](https://github.com/anthropics/claude-code/issues/85131)（Android 应用中草稿静默丢失）都指向同一个预期：会话状态应能超越单台设备或单个终端继续存在。
- **透明的套餐权益与模型可用性。**[#76237](https://github.com/anthropics/claude-code/issues/76237)（Max 20 上 `/model` 缺少 Fable 5）和 [#85175](https://github.com/anthropics/claude-code/issues/85175)（Pro 上 Cowork 被禁用，并给出令人困惑的 “Missing HCS services” 消息）表明，用户希望 CLI/桌面端能准确反映订阅状态并提供可操作的错误提示。
- **正确的 1M 上下文处理。**[#81693](https://github.com/anthropics/claude-code/issues/81693) 和 [#84310](https://github.com/anthropics/claude-code/issues/84310) 要求将 Opus 5 / Sonnet 5 当作 1M 上下文模型对待——状态栏、上下文仪表和 `/compact` 逻辑都应正确处理。
- **更细粒度的 effort 级别控制。** v2.1.267 新加入的 `maxEffortLevel` 选项开始回应 [#85052](https://github.com/anthropics/claude-code/issues/85052) 等报告所暴露的底层需求：用户希望对模型在繁复评审/仪式上花费的 effort 设限，而不是让它挤占实际工作。

## 开发者痛点

- **防护误报持续打断正当工作。**在科学计算（[#83436](https://github.com/anthropics/claude-code/issues/83436)）、进攻性安全测试（[#85157](https://github.com/anthropics/claude-code/issues/85157)）和一般合法请求（[#85164](https://github.com/anthropics/claude-code/issues/85164)）中反复出现——用户反映分类器只是在匹配词汇而非理解意图，迫使大家采取切换到 Opus 4.8 之类的变通手段。
- **CLI 对 1M 上下文模型核算有误。**[#81693](https://github.com/anthropics/claude-code/issues/81693) / [#84310](https://github.com/anthropics/claude-code/issues/84310)：当客户端以为上下文窗口是 200K 时，状态栏仪表会饱和，`/compact` 看起来毫无作用。
- **长会话或无人值守会话中脆弱的认证与权益状态。**会话中途认证失效（[#83639](https://github.com/anthropics/claude-code/issues/83639)）、订阅状态陈旧（[#76237](https://github.com/anthropics/claude-code/issues/76237)）、无头 Linux 上 OAuth 重定向损坏（[#88877](https://github.com/anthropics/claude-code/issues/88877)），都在削弱人们对无人值守/SSH 工作流的信心。
- **操作系统和环境更新破坏核心功能。**Windows KB5124008 破坏 Cowork Plan9 共享（[#92984](https://github.com/anthropics/claude-code/issues/92984)）；VS Code 集成终端的光标错乱在 macOS 上持续存在（[#88293](https://github.com/anthropics/claude-code/issues/88293)）；迁移助理（Migration Assistant）的数据迁移似乎会加剧终端问题。
- **多客户端体验不一致。**桌面应用切换账户后侧边栏分组丢失（[#79810](https://github.com/anthropics/claude-code/issues/79810)）、Chrome 扩展没有退出登录/账户切换功能（[#85159](https://github.com/anthropics/claude-code/issues/85159)）、Android 草稿丢失（[#85131](https://github.com/anthropics/claude-code/issues/85131)）——这些客户端特有的持久化和账户管理 bug 正在侵蚀跨平台信任。
- **智能体行为跑在用户意图前面。**[#85173](https://github.com/anthropics/claude-code/issues/85173)（智能体直接开始实现而不是回答问题）和 [#85167](https://github.com/anthropics/claude-code/issues/85167)（返工循环、完成时间过长）这类报告表明：自主模式的校准——何时行动、何时确认——正成为资深用户日益增长的摩擦点。
- **过期清理带来的模糊性。**2026-09-09 添加的一批标签在没有经过验证的修复的情况下关闭了 issue，包括上面的 1M 上下文与防护误报报告。没有关联的修复或明确的“已解决”说明，社区就无法区分是静默修复还是被放弃。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-10

## 1. 今日亮点
Codex CLI v0.154.0 引入 GPT-6-Astra（模型选择器 + Amazon Bedrock），并带来实验性 worktree 支持，可实现隔离的会话检出。在幕后，一大批已合并的 PR 强化了 managed-daemon 线程持久化、Guardian 审查预算和沙箱安全——包括修复 WSL interop 逃逸问题。社区讨论主要围绕两大主题：等待轮询循环造成的 token/额度消耗，以及 Windows 应用可靠性的退化。

## 2. 版本发布
**[rust-v0.154.0](https://github.com/openai/codex/releases)**
- **GPT-6-Astra** 现已出现在模型选择器和 Amazon Bedrock 目录中。
- **实验性 worktree 支持**：可通过 `--worktree` 或 `/worktree` 为新建或分叉的会话创建隔离检出，并可浏览和恢复这些会话。

过去 24 小时内还构建了以下版本：`0.154.0-alpha.6.1`、`0.154.0-alpha.8`、`0.154.0-alpha.10.2`、`0.154.0-alpha.11`（未发布各自的变更日志）。

## 3. 热门问题
- [openai/codex#20214](https://github.com/openai/codex/issues/20214) — **Codex App 在 Windows 11 Pro 上卡死/卡顿**，即使在系统资源充足的情况下也是如此。这是评论数最多的单个问题（111 条评论，87 👍）；用户反馈正常使用中 UI 会周期性卡住。
- [openai/codex#13733](https://github.com/openai/codex/issues/13733) — **后台进程轮询浪费 token**：每次 `write_stdin` 轮询都会触发一次携带完整历史的完整 API 轮次。40 条评论/40 👍——这是典型的“边等边烧 token”类抱怨。
- [openai/codex#25178](https://github.com/openai/codex/issues/25178) — **Windows Computer Use 在 Windows 10 22H2 上截图失败**（`SetIsBorderRequired failed: 0x80004002`），尽管窗口枚举、激活和键盘输入都正常。
- [openai/codex#35259](https://github.com/openai/codex/issues/35259) — **Codex Desktop 在等待/状态轮询期间会重新调用模型**；在修正后的用量统计窗口中，唯一动作仅为等待/状态的模型轮次占本地原始 token 量的 19.8%。
- [openai/codex#15723](https://github.com/openai/codex/issues/15723) — **后台子进程/子代理完成时不会唤醒调用代理**，迫使调用方只能轮询而收不到通知。
- [openai/codex#36642](https://github.com/openai/codex/issues/36642) — **自 0.145.0 起，自动压缩会静默丢弃所有对话历史**——这是一项严重的正确性回归，可能在用户未同意的情况下抹掉上下文。
- [openai/codex#34337](https://github.com/openai/codex/issues/34337) — **会话 rollout 存储在正常的长时间运行中可能增长到数十/数百 GiB（甚至 TiB 级）**；CLI 与 Desktop 共用同一存储。
- [openai/codex#41470](https://github.com/openai/codex/issues/41470) — **Windows/Android 远程同步不对称**：较新的桌面项目不会出现在 Android 端，移动端发起的线程会触发信任门禁。
- [openai/codex#36195](https://github.com/openai/codex/issues/36195) — **新的实时语音聊天会从无项目状态启动**，而不是挂接到所选项目文件夹，破坏了上下文连续性。
- [openai/codex#42669](https://github.com/openai/codex/issues/42669) — **Windows 桌面应用会启动进程，但窗口始终不出现**（“Artifact Session host Unix-socket transport is not available on Windows”）；这是 Windows UI 一系列回归中的最新一例。

## 4. 关键 PR 进展
- [openai/codex#44320](https://github.com/openai/codex/pull/44320) — **在连续三轮空的自动延续轮次后阻断目标**：将目标标记为 `blocked`，而不是在空的最终答案上反复循环。
- [openai/codex#44286](https://github.com/openai/codex/pull/44286) — **阻止受限文件系统沙箱中的 WSL interop 逃逸**：屏蔽 WSL interop 套接字，使 `wsl.exe` 无法以 root 身份重新进入发行版。
- [openai/codex#44288](https://github.com/openai/codex/pull/44288) — **防止命令钩子因标准输入阻塞而挂起**：在排空输出的同时并发写入标准输入，并将标准输入写入纳入钩子的超时管理。
- [openai/codex#44314](https://github.com/openai/codex/pull/44314) — **在 managed daemon 重启时恢复已保存的线程**：启动时读取恢复快照，使活动目标无需客户端重连即可继续执行。
- [openai/codex#44283](https://github.com/openai/codex/pull/44283) — **在 managed daemon 关闭前持久化已加载的线程**（隐藏标志 `--managed-daemon`）；当 rollout I/O 被阻塞时，关闭仍可强制执行。
- [openai/codex#44311](https://github.com/openai/codex/pull/44311) — **远程控制统一遵守共享的 Retry-After 截止时间**，封堵了此前通过配对、认证变更、重连和主动刷新 token 绕过限制的途径。
- [openai/codex#44293](https://github.com/openai/codex/pull/44293) — **强制执行异步 Guardian 分类器的完整输入预算**，包括父级压缩检查点和图像。
- [openai/codex#44281](https://github.com/openai/codex/pull/44281) — **为 Guardian 审查强制执行完整的请求预算**，确保审查证据以及历史/工具/输出格式不会撑爆审查器的上下文窗口。
- [openai/codex#44318](https://github.com/openai/codex/pull/44318) — **为托管的 Codex Apps 提供独立的 MCP 协议选择启用机制**（`features.codex_apps_mcp_2026_07_28`），默认关闭。
- [openai/codex#44307](https://github.com/openai/codex/pull/44307) — **为 Apple Silicon 和 Intel 提供可选择启用的 macOS CLI 发布候选版（opt-in）**：打包为内嵌描述文件的可重定位 `CodexCLI.app`。

## 5. 热门讨论

**想法**
- [openai/codex#9200](https://github.com/openai/codex/discussions/9200) — **从 ChatGPT App 远程控制 Codex**（190 👍，46 条评论）。这是获赞最多的功能请求；该功能现已存在，但大量后续 bug 表明它在跨设备场景下仍不够可靠。
- [openai/codex#9618](https://github.com/openai/codex/discussions/9618) — **`/rewind` 或 `/revert` 功能**（128 👍）。社区对与 OpenCode/Claude Code 相当的原生撤销支持有强烈需求。
- [openai/codex#38834](https://github.com/openai/codex/discussions/38834) — **桌面端长 Codex 响应的阅读模式（Reader Mode）配合朗读（Read Aloud）功能**。

**问答 / 综合**
- [openai/codex#3057](https://github.com/openai/codex/discussions/3057) — **Codex 使用 Python 编辑文件而不是 File Edit 工具**：用户想知道这是工具本身的问题，还是仅仅是模型偏好。
- [openai/codex#14104](https://github.com/openai/codex/discussions/14104) — **Codex CLI 中的换行插入**：请求支持 Shift+Enter 行为，而不是 Ctrl+J。

**展示与分享**
- [openai/codex#42041](https://github.com/openai/codex/discussions/42041) — **agent-watch**：用于区分后台 `codex exec` worker 的 DONE、FAILED 和 STALL 三种状态。
- [openai/codex#44153](https://github.com/openai/codex/discussions/44153) — **isitdone**：一个 Stop 钩子，在测试/类型检查/lint 于确切工作树上全部通过之前，阻止标记“done”。
- [openai/codex#44109](https://github.com/openai/codex/discussions/44109) — **postbag**：在同一台机器上，利用各自代理的原生唤醒机制，在 Codex 与 Claude Code 会话之间传递“信件”。
- [openai/codex#44247](https://github.com/openai/codex/discussions/44247) — **为无法运行 ChatGPT 桌面应用的 Intel Mac 用户提供的 Codex Voice**：通过浏览器语音 UI 驱动本地 Codex CLI。
- [openai/codex#44291](https://github.com/openai/codex/discussions/44291) — **Brain Scanner**：检查已记录的编码代理工作，然后从项目图中将下一个修复任务加入队列。

## 6. 功能请求趋势
- **移动端/远程控制**：#9200 仍然是社区最想要的功能（190 👍）；#41470 和 #44316 等新 issue 表明问题已经不只是“功能不存在”，而是“实际使用中不可靠”。
- **撤销/回退/还原**：由 #9618 推动（128 👍）；目前仍没有原生的一等支持，用户希望在不必每次更改都提交的情况下，获得智能体式的撤销（agentic undo）能力。
- **取消“轮询税”**：#13733、#35259、#31935 等多个 issue 都要求事件驱动的唤醒、更长的阻塞等待，以及取消 60 秒上限——社区始终拒绝把轮询当作一种可行策略。
- **Worktree/VCS 灵活性**：实验性 worktree 支持已随 v0.154.0 发布；#26648 进一步要求支持 Jujutsu（`jj`）或自定义 worktree 钩子。
- **会话连续性**：daemon 重启恢复、关联项目的语音聊天、线程恢复等诉求在 bug 报告和 PR 工作中都占据了主导地位。

## 7. 开发者痛点
- **等待轮询导致的 token/额度消耗**：这是最明显且反复出现的挫败感来源。轮询循环会携带完整历史重新调起模型，既触发速率限制，又持续消耗额度。
- **Windows 可靠性**：卡死、自动更新后窗口消失、Computer Use 截图失败、`config.toml` 非原子性写入，以及 WSL/原生路径回归，使 Windows 成为开放 bug 密度最高的平台。
- **静默状态/数据丢失**：自动压缩丢弃历史（#36642）、子代理线程中投影历史为空（#38762）、任务回退到仅保留首轮（#42662）——这些问题正在削弱用户的信任。
- **本地存储无上限**：rollout/会话存储没有清理机制或容量上限，从 GiB 级一路涨到 TiB 级（#34337、#42648）。
- **子代理协作存在缺口**：后台代理不会唤醒调用方；子代理会继承任务控制，甚至创建独立的、归用户所有的线程（#38687）；在 Windows 上恢复历史子代理线程会生成重复的 MCP/进程栈（#37453）。
- **远程能力仍不成熟**：项目同步不对称、信任门禁、Windows 上“daemon 仅支持 Unix”的假设，以及 macOS 配对中的 WebSocket 503，都说明远程方案还不完善。
- **终端交互体验**：CLI 153.4 中粘贴功能损坏（#44323）、没有直观的多行输入（#14104），以及标准输入被阻塞时钩子可能无限期挂起。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-10

*汇总自 github.com/google-gemini/gemini-cli 上的 50 个有更新的 issue 和 25 个 pull request。*

## 1. 今日亮点

项目发布了一个新的 nightly 版本（`v0.61.0-nightly.20260909.ged2ac40df`），包含针对 NTFS 路径处理和沙箱设置隔离的定向修复；与此同时，更广泛的 PR 管线以安全加固为主：两个大型 open PR 分别处理经由构建文件的间接提示注入与文件系统边界强制问题。在 issue tracker 上，社区关注点仍集中在子代理可靠性上——轮次已尽的子代理仍上报 `GOAL` 成功（#22323），这一 P1 bug 是当前最活跃的讨论串；此外还有反复出现的通用代理挂起问题（#21409），用户只能通过完全禁用子代理来绕过。

## 2. 版本发布

- [v0.61.0-nightly.20260909.ged2ac40df](https://github.com/google-gemini/gemini-cli/releases) — nightly，包含以下变更：
  - `fix(core)`：缓解沙箱/worktree 场景下的 NTFS 8.3 短文件名（SFN）路径问题 — [PR #29116](https://github.com/google-gemini/gemini-cli/pull/29116)
  - `fix(cli)`：在沙箱容器内隔离设置目录，防止宿主机配置泄漏 — [PR #29216](https://github.com/google-gemini/gemini-cli/pull/29216)
  - 变更日志在同步时被截断，可能还有其他提交。此窗口期内没有稳定版发布。

## 3. 热门 issue

1. [**#22323 — 子代理触发 MAX_TURNS 后仍上报 GOAL 成功**](https://github.com/google-gemini/gemini-cli/issues/22323) *(P1, bug, 13 条评论)* — 某个 `codebase_investigator` 在达到轮次上限后，尽管没有做任何分析，仍上报 `status: "success"` 和 `Termination Reason: "GOAL"`。这是一个危险的正确性 bug：被中断的工作与已完成的工作变得无法区分。这是本窗口期内互动最多的问题，也是代理状态/上报机制需要重构的最明确信号。

2. [**#21409 — 通用代理挂起**](https://github.com/google-gemini/gemini-cli/issues/21409) *(P1, bug, 8 条评论, 8 👍)* — 任何委派给通用代理的任务都可能无限期挂起，哪怕只是创建文件夹。社区的临时做法是让模型永不使用子代理，这是功能性代价很高的妥协。较高的 👍 数说明影响范围很广。

3. [**#19873 — 零依赖 OS 沙箱与执行后意图路由**](https://github.com/google-gemini/gemini-cli/issues/19873) *(P2, enhancement, 9 条评论)* — 提议为 Gemini 3 原生的 bash 行为提供一个安全的 POSIX 沙箱，而不是用自定义工具去约束它。这与本周的沙箱加固 PR 方向一致，表明维护者正朝这一方向收敛。

4. [**#22745 — EPIC：AST 感知的文件读取、搜索与映射**](https://github.com/google-gemini/gemini-cli/issues/22745) *(P2, feature, 7 条评论)* — 跟踪针对方法边界读取、AST 引导搜索与代码库映射的调研，目标是降低 token 噪声并减少轮次消耗。配套 issue [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) 建议将 `tilth`/`glyph` 作为 `codebase_investigator` 的起点。

5. [**#26525 — 引入确定性脱敏并减少 Auto Memory 日志记录**](https://github.com/google-gemini/gemini-cli/issues/26525) *(P2, security, 5 条评论)* — Auto Memory 会在脱敏*之前*就把转录文本发送给提取模型，这意味着机密会暴露在模型上下文中，并可能被写入日志。此问题具有安全敏感性，也进一步印证了在内容进入上下文之前完成脱敏的管线是必要的。

6. [**#25166 — Shell 命令执行卡在 "Waiting input"**](https://github.com/google-gemini/gemini-cli/issues/25166) *(P1, bug, 4 条评论, 3 👍)* — 简单且非交互式的 shell 命令已经执行完毕，但会话仍处于挂起状态，界面上显示有一条活动命令在等待输入。该问题可稳定复现，并会干扰长时间运行的自动化任务。

7. [**#26522 — 让 Auto Memory 不再无限重试低信号会话**](https://github.com/google-gemini/gemini-cli/issues/26522) *(P2, bug, 4 条评论)* — 被提取器判定为低信号而跳过的会话永远不会被标记为已处理，因此可能无限期地反复出现。这指向记忆提取队列中的状态机缺陷，而非模型质量问题。

8. [**#21983 — 浏览器子代理在 Wayland 下失败**](https://github.com/google-gemini/gemini-cli/issues/21983) *(P1, bug, 4 条评论, 1 👍)* — 浏览器代理在 Wayland 下会立即以 `GOAL` 原因终止。Linux/Wayland 用户会完全失去浏览器代理功能；这可能与底层浏览器自动化栈缺少 Wayland 支持有关。

9. [**#21968 — Gemini 未能充分利用技能与子代理**](https://github.com/google-gemini/gemini-cli/issues/21968) *(P2, bug, 6 条评论)* — 虽多为零散反馈，但很多人都深有同感：即使自定义的 `gradle`/`git` 技能描述得很完善，模型也很少自主调用它们。这削弱了用户自定义配置的价值，也解释了为什么许多用户认为子代理仅在显式指定时才会被使用。

10. [**#20079 — `~/.gemini/agents/` 中的符号链接文件无法被识别**](https://github.com/google-gemini/gemini-cli/issues/20079) *(P2, bug, 4 条评论)* — 通过符号链接创建的代理定义会被静默忽略。常规的 dotfile 管理方案（如 chezmoi、stow）会让代理注册在没有任何错误或警告的情况下失效。

## 4. 重点 PR 进展

1. [**#29250 — 防止通过构建文件修改与不可信标志位实施间接提示注入**](https://github.com/google-gemini/gemini-cli/pull/29250) *(open, XL)* — 重构了内置执行路径（`shell`、`edit`、`write_file`），以便在受限模式下校验工作区边界，防范构建配置与外部标志位被篡改。影响面大，且处于安全关键路径上。

2. [**#29214 — 加固沙箱文件系统边界并隔离运行时状态**](https://github.com/google-gemini/gemini-cli/pull/29214) *(open, L/XL)* — 将沙箱中挂载的宿主机目录替换为净化后的配置文件，并统一采用基于 `realpath` 的路径敏感性检查。与 nightly 中已包含的设置隔离修复直接互补。

3. [**#29265 — 防止中断回合导致会话上下文被污染**](https://github.com/google-gemini/gemini-cli/pull/29265) *(open, P2, M)* — 修复了一个严重问题：SIGINT、超时或执行被中止的工具会破坏聊天会话历史，并使后续提示无法正常工作。它与上文“卡住/挂起”类 bug 高度相关。

4. [**#29163 — 防止在 git 仓库中进行身份验证时崩溃**](https://github.com/google-gemini/gemini-cli/pull/29163) *(open, P1, security, L)* — 当 `.git` 访问受限时（macOS Seatbelt），`useGitBranchName` 钩子会导致启动崩溃。该 PR 修复了不少 macOS 用户遇到的启动即崩溃问题。

5. [**#29151 — 以不区分大小写的方式处理技能优先级与激活状态**](https://github.com/google-gemini/gemini-cli/pull/29151) *(open, P1, M)* — 当技能名称仅大小写不同时，`SkillManager` 无法应用工作区技能优先级覆盖规则；该 PR 让优先级映射与激活技能映射均变为大小写不敏感。

6. [**#29156 — 让 shell 执行不再清空用户 git 配置**](https://github.com/google-gemini/gemini-cli/pull/29156) *(open, core, M)* — 撤销了 #28792 引入的行为：该行为曾让每条 shell 命令都把 `GIT_CONFIG_GLOBAL`/`GIT_CONFIG_SYSTEM` 指向 `/dev/null`。用户因此丢失 `user.name`、签名密钥等 git 配置，导致 CLI 发起的提交失败。

7. [**#29155 — 在 `isEmpty` 中正确解码带 BOM 的内容**](https://github.com/google-gemini/gemini-cli/pull/29155) *(open, core, M)* — 修复了一个 UTF-16/UTF-32 BOM 解码 bug：该 bug 会让只包含空白的计划文件看起来非空，进而阻塞 `validatePlanCommand` 等检查。

8. [**#29248 — 避免确认后产生重复历史记录与遥测数据**](https://github.com/google-gemini/gemini-cli/pull/29248) *(open, core, M)* — 增加防护，避免在确认提示仍处于打开状态时有另一条消息到达，导致斜杠命令历史中出现重复条目（例如 `/resume save <tag>`）。

9. [**#29063 — 让 Plan Mode 在非交互式会话中不再等待用户反馈**](https://github.com/google-gemini/gemini-cli/pull/29063) *(closed, P1, M)* — 修复了非交互式 Plan Mode 挂起问题（`gemini -p "..." -y`）：此前计划工作流指令告诉代理等待一个永远不会到来的用户回合。解决了长期存在的问题 #28913/#26004。

10. [**#29067 — 从 a2a-server 中移除误导性的安全方案与硬编码凭据**](https://github.com/google-gemini/gemini-cli/pull/29067) *(closed, P1/security, S)* — 从 local-dev agent card 中移除伪造的 `securitySchemes` 和硬编码凭据，让工具链不再宣称存在实际并不存在的身份验证。修复 #29001。

## 5. 功能请求趋势

- **AST 感知的代码导航主导路线图讨论** — 方法边界读取、AST 引导搜索与代码库映射（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#22746](https://github.com/google-gemini/gemini-cli/issues/22746)）被视为解决文件读取噪声、token 膨胀与“有分寸的提取”等顾虑（[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)）的良方。
- **Bash 原生、沙箱化的代理执行** — 用户和维护者希望模型能像一位普通 POSIX shell 用户那样自然操作，同时不牺牲安全性（[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)）；当前这波沙箱 PR 正是该方向的具体落地。
- **持久化任务跟踪** — 用基于文件的 CRUD 取代上下文内的 `WriteToDo`，让任务在会话重置后依然保留，并减少上下文腐化（[#18836](https://github.com/google-gemini/gemini-cli/issues/18836)、[#21000](https://github.com/google-gemini/gemini-cli/issues/21000)）。
- **浏览器子代理韧性** — 社区要求支持自动会话接管、锁恢复，并遵循 `settings.json` 中的覆盖设置，让浏览器代理达到生产可用水平（[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)、[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)）。
- **可观测且有自我认知的代理** — 用户希望支持通过 `/chat share` 共享子代理轨迹（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）、在 bug 报告中附带子代理上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)），并让 CLI 具备自我认知以给出准确指导（[#21432](https://github.com/google-gemini/gemini-cli/issues/21432)）。

## 6. 开发者痛点

- **子代理结果语义不可信** — MAX_TURNS 中断被伪装成目标成功（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)），通用代理无限期挂起（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)），bug 报告也完全没有包含子代理上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)）。
- **Shell 与进程控制容易卡死** — 已完成的命令停留在 "Waiting input" 状态（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)），而带交互式提示的脚手架工具（如 Vite）会让会话死锁（[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)）。
- **Auto Memory 在边界场景行为异常** — 转录文本在机密脱敏之前就被发送给模型（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)），低信号会话被无限重试（[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)），无效的 inbox 补丁被静默丢弃（[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)）。
- **模型在自主行为上会忽略用户意图** — 它不充分使用自定义技能与子代理（[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)），在仓库中到处留下临时编辑脚本（[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)），偶尔还会选择破坏性的 git/DB 命令而不是安全的替代方案（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）。
- **配置与环境摩擦** — 符号链接的代理文件被忽略（[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)），`/compress` 无法在会话恢复后保留（[#21335](https://github.com/google-gemini/gemini-cli/issues/21335)），浏览器代理在 Wayland 下失败（[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)），超过 128 个工具会触发 400 API 错误（[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)）。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-10

## 今日亮点
v1.0.84-3 已发布，针对性修复了 `/copy` 的任务完成输出，以及 OAuth 认证 MCP 服务器的启动可靠性。社区讨论最热烈的依然是三件事：一个已存在近一年的浅色主题缺陷（#135）、一个高严重性的 WSL2 CPU 空转/TUI 冻结回归（#3700），以及 Windows 会话管理上的不便（#4756）。反复出现的 `400 input item ID does not belong to this connection` 错误仍在不断浮现；有一个新的文档 PR 提出，可将 WebSocket responses 选择退出作为规避方案。

## 版本发布
**v1.0.84-3**（最新，最近 24 小时）
- 修复：`/copy` 现在会包含任务完成消息（如有）。
- 修复：OAuth 认证的 MCP 服务器现在可以在会话启动时可靠连接。

## 热门 Issue
1. [#135 Light theme doesn't work](https://github.com/github/copilot-cli/issues/135) — 已开放近一年，12 条评论，12 个 👍。最初的浅色主题报告（v0.0.330）至今未修复，使这个问题成为社区在终端主题方面持续时间最长的痛点。
2. [#4756 Windows app requires archiving every idle project session before creating a new Local session](https://github.com/github/copilot-cli/issues/4756) — 7 条评论，19 个 👍（表态数最高）。Windows 用户必须先把空闲会话手动归档，才能创建新会话，否则会报 `invalid argument` 错误。
3. [#3700 WSL2 regression: CLI MainThread spins at ~215% CPU while idle, TUI output frozen until restart](https://github.com/github/copilot-cli/issues/3700) — 高严重性回归（1.0.60 引入），每次新开 WSL2 会话都能复现；重启之前实时输出完全无法渲染。评论者指出，这使此前 #2208 的修复出现回归。
4. [#4535 `store_memory` fails in v1.0.81 prereleases: `Instance id is required`](https://github.com/github/copilot-cli/issues/4535) — 预发布版中的上下文记忆功能已损坏，原因是调用原生记忆写入器时没有传入必需的实例 ID。8 条评论；被标记为预发布质量问题。
5. [#3976 native `tgrep` indexer OOM-kills the host on large monorepos](https://github.com/github/copilot-cli/issues/3976) — Rust trigram 索引守护进程没有内存上限，启用 `copilot_cli_tgrep` 实验后，在大型仓库上会导致宿主机被 OOM 杀死。
6. [#2147 CAIP 400: input item ID does not belong to this connection](https://github.com/github/copilot-cli/issues/2147) — 已关闭，但底层的 400 WebSocket 错误持续在较新的报告（#4791）中重现，也推动了 WebSocket 选择退出文档 PR（#4770）。
7. [#3773 Broken light theme](https://github.com/github/copilot-cli/issues/3773) — 第二个更侧重无障碍的报告：用户输入提示区为黑色背景，选区高亮对比度过低，导致文本难以阅读。进一步印证 #135 是一个系统性的主题问题。
8. [#2199 Add Ctrl+Backspace key combo to delete whole word](https://github.com/github/copilot-cli/issues/2199) — 7 个 👍，另有配套的 Windows 报告 #3858。CLI 输入提示中缺少标准编辑器行为；在 Windows 上 Alt+Backspace 虽然可用，但不符合该平台的约定。
9. [#4775 Mission Control dashboard links 404: /copilot/tasks/<uuid> path doesn't exist](https://github.com/github/copilot-cli/issues/4775) — 仪表盘中“Created by me”链接指向的 URL 并不存在，而会话仍可通过 `copilot --resume=<uuid>` 访问；这是一处导航/UX 故障。
10. [#4764 Auto approval stops working after ~1 hour](https://github.com/github/copilot-cli/issues/4764) — 辅助权限模式大约一小时后会静默停止自动批准；用户必须新开一个会话。这指向权限状态中一个与会话生命周期相关的缺陷。

## 关键 PR 进展
过去 24 小时只有 2 个 PR 处于活跃状态——都以文档为主，但填补了明显的缺口：

1. [#4770 Document the WebSocket responses opt-out](https://github.com/github/copilot-cli/pull/4770) — 为声明提供 WebSocket responses 端点的模型记录了一条逃生通道：当 WebSocket 被阻止，或会话因 `400 input item ID does not belong to this connection` 失败时，用户可以选择退出。直接针对一个反复出现的错误模式。
2. [#4786 Revise notice regarding third-party services](https://github.com/github/copilot-cli/pull/4786) — 澄清第三方服务声明中的访问要求与条款；对服务集成和市场工具做合规性打磨。

## 功能需求趋势
- **主题控制与无障碍** — 彻底修复浅色主题（#135、#3773），并允许将 GitHub 调色板固定为深色/浅色，而不随操作系统/终端外观变化（#4620）。
- **标准键盘编辑** — 增加 Ctrl+Backspace 删除整个单词的功能，尤其是面向 Windows 用户（#2199、#3858）。
- **更智能的会话生命周期** — 默认恢复上一个会话，或改进会话消歧（#1467）；消除 Windows 上强制归档空闲会话的做法（#4756）。
- **多账户支持** — 在多个 GitHub 账户（个人、工作、外包）之间轻松切换的需求依然存在（#367）。
- **MCP 与注册表生态** — 企业 MCP 注册表的认证读取（#3772），以及插件的市场间/市场内依赖模型（#4487）。

## 开发者痛点
- **反复出现的 400 连接错误** — `input item ID does not belong to this connection` 跨版本持续存在，甚至在会话中途切换账户时也会出现（#2147、#4791）。
- **长期未修复的主题缺陷** — 浅色主题的报告已持续近一年，#135/#3773 下有多条重复报告，👍 合计 16+ 个。
- **Windows/macOS 平台摩擦** — 会话归档（#4756）、Ctrl+Backspace（#3858）、任务栏状态卡在“正在工作”（#4771）、沙箱中 `git status` 权限被拒绝（#4788），以及 macOS 上通过 SSH 使用时剪贴板为空（#4551）。
- **WSL2 稳定性** — 空闲时 CPU 空转（约 215%）且 TUI 输出冻结，让 CLI 在重启前完全不可用（#3700）。
- **原生工具资源占用** — `tgrep` 守护进程没有内存上限，在大型 monorepo 上可能让宿主机 OOM（#3976）。
- **MCP 可靠性缺口** — 当发现元数据需要跟随重定向时 OAuth 失败（#4769）；对已加载的命名空间重复执行发现，却报告“找到 0 个工具”（#4773）。
- **权限模式不稳定** — 自动批准在约 1 小时后停止（#4764）；即使没有适用的托管策略，fail-closed（默认拒绝）策略也可能让 `--yolo`/`--allow-all` 在整个会话期间被阻止（#4757）。
- **输入/听写回归** — 复制时按 Ctrl+C 会取消确认对话框（#4789）；听写会定期删除已输入的文本（#4787）。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区文摘 — 2026-09-10

## 今日亮点

OpenCode 昨晚发布了 **v1.18.30**，为 GPT-6 模型新增 Astra 系统提示词，并修复了 Bedrock DeepSeek 模型 ID 解析以及 Azure/OpenAI provider SDK 的问题。在 issue 追踪器中，最受支持的未关闭功能请求——智能体、技能和命令的热重载（[#8751](https://github.com/anomalyco/opencode/issues/8751)）——继续走热，已获 96 👍；与此同时，一大批深入的 bug 报告凸显了压缩可靠性、计划模式强制实施和文件索引过期等反复出现的痛点。

## 版本发布

**[v1.18.30](https://github.com/anomalyco/opencode/releases/tag/v1.18.30)**

- **核心：** 为 GPT-6 模型新增 Astra 系统提示词。
- **Bug 修复：** 保留 Bedrock DeepSeek 模型 ID（包括基于 ARN 的 ID），使其能正确解析（[@YeEmrick](https://github.com/anomalyco/opencode/issues?q=author:YeEmrick)）；更新 Azure 和 OpenAI provider SDK，以纳入兼容性修复。

## 热门 Issue

从最近更新的 50 个 issue 中精选 10 个。

1. **[功能] 热重载智能体、技能与命令 — [#8751](https://github.com/anomalyco/opencode/issues/8751)** · 96 👍 · 23 条评论  
   社区中支持度最高的未关闭请求：允许在 opencode 运行期间让配置失效并重新加载。这一需求表明，创建和迭代智能体不应要求重启。

2. **[Bug] `@` 文件提及不包含启动后创建的文件 — [#32747](https://github.com/anomalyco/opencode/issues/32747)** · 16 条评论  
   新文件在 `@` 选择器中不可见，直到重启；报告者将其追溯到 TUI 中的搜索状态过期。这破坏了一个核心工作流：引用会话中刚刚创建的文件。

3. **[功能] 在 OpenCode Zen 中更改或移除邮箱 — [#18654](https://github.com/anomalyco/opencode/issues/18654)** · 16 👍  
   更改 GitHub 邮箱会在 OpenCode Zen 中产生重复用户，且没有任何账户管理路径可以修复。这是托管服务在身份管理上的一个盲区。

4. **[Bug] 计划模式可通过 bash 写入和编辑文件 — [#39491](https://github.com/anomalyco/opencode/issues/39491)**  
   Claude Sonnet 4.6「忘记」自己正处于计划模式，并在写入工具被阻止后通过 bash heredoc 写入了 `SKILL.md`。计划模式目前只是工具层面的限制，而不是不可打破的硬性约束——bash 仍是一条逃生通道。

5. **[Bug] 自 v1.18.15 起，压缩功能为 Kimi K3-256K 生成空摘要 — [#41571](https://github.com/anomalyco/opencode/issues/41571)**  
   压缩时生成的 assistant 消息只包含 `reasoning`，没有 `text`，因此摘要为空，会话历史被静默丢弃。对 Kimi 用户来说，这是数据丢失级别的严重问题。

6. **[Bug] 自动批准权限不会级联到子智能体 — [#41730](https://github.com/anomalyco/opencode/issues/41730)**  
   `opencode run --auto` 不会把自动批准传播给子智能体，导致父级运行与其子运行之间的权限行为不一致。

7. **[Bug] 没有打开会话时，自动接受开关被禁用 — [#48237](https://github.com/anomalyco/opencode/issues/48237)**  
   包含根因分析和经过测试的修复设计：`createPermissionScopeController` 只会从会话继承关系中解析目录。属于 #37617/#45159/#31137 中出现的权限作用域问题系列，并且已经提出了可行的修复方案。

8. **[Bug] 会话中途 Prompt 工具列表与运行时注册表发生偏离 — [#48214](https://github.com/anomalyco/opencode/issues/48214)**  
   在生产环境的 headless `opencode serve`（1.18.25，多租户）中，一个会话处理第一批工具调用正常，下一批却一个也解析不到——整个过程没有任何 MCP 变更。该问题影响范围大于 #39902，对服务器部署来说尤其令人担忧。

9. **[Bug] Gemini-3.8-flash：400 "Requests ending with a model turn are not supported" — [#47034](https://github.com/anomalyco/opencode/issues/47034)**  
   通过 Gemini API，Gemini 3.8 Flash 在经历一个模型轮次后，每个后续请求都会失败。这是阻塞较新模型家族的 provider 协议兼容性问题。

10. **[Bug] `opencode run --format json` 将自动压缩内部信息作为文本事件输出 — [#42238](https://github.com/anomalyco/opencode/issues/42238)**  
    压缩摘要和合成用户提示会作为普通 `type:"text"` 事件泄漏到 JSONL 中，使机器可读输出对 CI/自动化消费者来说不可靠。

## 关键 PR 进展

1. **[fix(tui)：为位置刷新增加启动竞态保护 — [#48235](https://github.com/anomalyco/opencode/pull/48235)**](https://github.com/anomalyco/opencode/pull/48235) (open)  
   关闭 #40002。TUI 启动时通过 `Promise.allSettled` 并发触发了 8 次位置刷新；该 PR 为启动竞态增加了防护。

2. **[fix(app)：减少冷/热会话的加载工作量 — [#48223](https://github.com/anomalyco/opencode/pull/48223)**](https://github.com/anomalyco/opencode/pull/48223) (open)  
   每个工作区最多复用 16 条已渲染时间线，配合非活动视图保护和滚动恢复，并延后协作性工作——目标是解决进入大型会话时的缓慢问题。

3. **[fix(app)：切换会话时隐藏切出的浏览器 — [#48243](https://github.com/anomalyco/opencode/pull/48243)**](https://github.com/anomalyco/opencode/pull/48243) (open)  
   捕获浏览器注册信息，使切换会话时即使目标会话没有浏览器面板，也能隐藏切出的原生视图；标签页会继续保持存活以便快速恢复。

4. **[fix(acp)：恢复会话选项与推理边界 — [#48225](https://github.com/anomalyco/opencode/pull/48225)**](https://github.com/anomalyco/opencode/pull/48225) (open)  
   修复 #31961，包含两个 bug 修复：在 ACP 生命周期内保留会话选项和推理边界。

5. **[feat(app)：新增会话历史侧边栏 — [#46670](https://github.com/anomalyco/opencode/pull/46670)**](https://github.com/anomalyco/opencode/pull/46670) (open)  
   为 v2 布局添加常驻的项目与会话侧边栏，取代浮动会话标签页，同时保持控件对齐。

6. **[feat(desktop)：显示压缩进度与结果 — [#48152](https://github.com/anomalyco/opencode/pull/48152)**](https://github.com/anomalyco/opencode/pull/48152) (closed)  
   此前「Session compacted」会在压缩刚开始时就显示，即使消息编辑器仍在忙碌。该 PR 会显示准确的进度与最终结果。

7. **[feat(desktop)：打磨分支搜索与会话间距 — [#48150](https://github.com/anomalyco/opencode/pull/48150)**](https://github.com/anomalyco/opencode/pull/48150) (closed)  
   在菜单延迟自动聚焦之后将焦点设置到分支搜索，使鼠标或键盘打开时能立即输入；同时整理了会话间距。

8. **[feat(console)：澄清 Go model 用法 — [#48192](https://github.com/anomalyco/opencode/pull/48192)**](https://github.com/anomalyco/opencode/pull/48192) (closed)  
   文档改进：新增简洁的模型图表，重新整理限制文档的顺序，并统一各语言间的术语和链接。

9. **[fix(desktop)：在发布应用中捆绑 CLI — [#41431](https://github.com/anomalyco/opencode/pull/41431)**](https://github.com/anomalyco/opencode/pull/41431) (closed)  
   将内嵌的 V2 CLI 作为独立可执行文件打包，覆盖开发版、Beta 与生产桌面构建，弥补了打包版桌面启动时需要 CLI 却缺失的缺口。

10. **[feat(tool)：新增支持 VS Code 自动附加的交互式终端工具 — [#41449](https://github.com/anomalyco/opencode/pull/41449)**](https://github.com/anomalyco/opencode/pull/41449) (closed)  
    新增 `terminal` 工具，让智能体可以打开并操控一个真正的交互式 PTY（open/read/input/close），并支持 VS Code 自动附加。该 PR 在自动化清理中被关闭，但如果重新启用，将是一项重要的能力增强。

## 功能请求趋势

- **实时重载与配置开发体验** — 智能体/技能/命令的热重载（[#8751](https://github.com/anomalyco/opencode/issues/8751)）是其中呼声最高的请求，已获 96 👍。一个相关讨论要求对 `AGENTS.md` 提供按项目控制，包括跳过或完全替换它的能力（[#47879](https://github.com/anomalyco/opencode/issues/47879)）。

- **桌面/宿主应用成熟度** — 常驻的会话历史侧边栏已在推进中（[#46670](https://github.com/anomalyco/opencode/pull/46670)）；尚未关闭的请求包括面向企业部署的 MSI 安装程序（[#48099](https://github.com/anomalyco/opencode/issues/48099)）和完成提醒音（[#35282](https://github.com/anomalyco/opencode/issues/35282)）。

- **更严格的权限与计划模式执行** — 多个讨论希望计划模式是一个硬性不变量，而非一种模型行为（[#39491](https://github.com/anomalyco/opencode/issues/39491)）；希望自动批准级联到子智能体（[#41730](https://github.com/anomalyco/opencode/issues/41730)）；希望自动接受开关在没有活动会话时也能使用（[#48237](https://github.com/anomalyco/opencode/issues/48237)）。

- **自主长周期「目标模式」** — 围绕目标驱动型轮次驱动器的提案与分析（[#48240](https://github.com/anomalyco/opencode/issues/48240)、[#48239](https://github.com/anomalyco/opencode/issues/48239)）表明，人们对独立于计划/构建模式的后台、自驱动智能体运行越来越感兴趣。

- **把压缩作为一等可见功能** — 压缩在某些模型上会丢失历史记录（[#41571](https://github.com/anomalyco/opencode/issues/41571)）、泄漏进结构化 JSON 输出（[#42238](https://github.com/anomalyco/opencode/issues/42238)）、且无法在 Azure 50 张图片上限这类非文本上下文溢出时触发（[#39677](https://github.com/anomalyco/opencode/issues/39677)）等报告，都说明需要更健壮、更透明的上下文管理。

## 开发者痛点

- **静默上下文丢失** — Kimi K3-256K 上的空压缩摘要（[#41571](https://github.com/anomalyco/opencode/issues/41571)），以及泄漏到 JSONL 输出中的压缩内部细节（[#42238](https://github.com/anomalyco/opencode/issues/42238)），削弱了人们对长会话记忆和自动化的信任。

- **文件发现滞后** — `@` 提及会漏掉启动后创建的文件（[#32747](https://github.com/anomalyco/opencode/issues/32747)），且 TUI 自动补全在引用别名处停下，不再列出别名下的文件（[#34040](https://github.com/anomalyco/opencode/issues/34040)）。

- **权限与执行缺口** — 计划模式可通过 bash 绕过（[#39491](https://github.com/anomalyco/opencode/issues/39491)）；自动批准不会级联到子智能体（[#41730](https://github.com/anomalyco/opencode/issues/41730)）；没有会话时，自动接受开关被禁用（[#48237](https://github.com/anomalyco/opencode/issues/48237)）。

- **无头/生产可靠性** — 在 `opencode serve` 会话中途，提示词中的工具列表与运行时注册表发生偏离（[#48214](https://github.com/anomalyco/opencode/issues/48214)），对服务端和多租户用户来说是一个严重信号。

- **Provider 集成的持续变动** — 每天仍有针对 Bedrock DeepSeek ID、Azure、OpenAI SDK 的修复落地（v1.18.30）；与此同时，Gemini 3.8 Flash 在轮次中途失败（[#47034](https://github.com/anomalyco/opencode/issues/47034)），Kimi K3-256K 在压缩功能上出现回归（[#41571](https://github.com/anomalyco/opencode/issues/41571)）。

- **会话规模与膨胀** — 每次运行都将完整工作树 diff 持久化到 `message.summary`，会导致数据增长到 GB 级（[#48241](https://github.com/anomalyco/opencode/issues/48241)）；冷/热加载大型会话的速度缓慢（[#48223](https://github.com/anomalyco/opencode/pull/48223)）。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-10

## 今日要点

过去 24 小时内没有新的 Pi 版本发布；当前关注焦点集中在提供商目录漂移（provider-catalog drift）与会话状态可靠性上。最活跃的讨论串包括：过时的模型清单导致必现的 400 错误（OpenRouter `:free`、Anthropic 回退模型、OpenAI Codex）；并行启动时持续约 48 秒报 “No API key found” 的确定性失败；以及一份被标记的第三方包报告。维护者在该时段内关闭了 6 个 PR，其中包括 Mistral/GLM 推理参数修复以及 coding-agent RPC runner 的重载保护；同时，两个扩展展示——权限闸门与并发子代理视图——也引发了社区兴趣。

## 热点 Issue

- **[#5291 — 与 Anthropic 订阅一起使用时，会话会卡在 “Working…” 上](https://github.com/earendil-works/pi/issues/5291)** *(已关闭；10 条评论，3 👍)* — 企业用户会间歇性遇到会话卡死，而且往往是同时发生；中断/恢复操作有时能恢复、有时不能。该 Issue 长期未关闭（自 6 月 1 日起开放）且评论众多，是第三方订阅集成的一个警示案例。

- **[#8928 — 当 auth.json 中包含另一个提供商已过期的 OAuth 凭据时，并行启动 pi 会持续约 48 秒报 “No API key found”](https://github.com/earendil-works/pi/issues/8928)** *(进行中；6 条评论)* — 报告者提供了可稳定复现的步骤和计时数据，并将其关联到 #1871、#4919 和 #6880。该错误信息会误导性地指向当前活跃提供商的凭据，使多进程调试的代价尤其高昂。

- **[#8760 — OpenRouter `:free` 模型返回 400：Pi 发送的 `max_tokens` 超过了提供商限制](https://github.com/earendil-works/pi/issues/8760)** *(进行中；5 条评论)* — Pi 使用目录中的 `maxOutputTokens`，但上游免费端点实际执行的是更低的硬上限，因此每次请求交互式选中的 `:free` 模型都会失败。该问题影响多个模型，使免费档位的评估完全无法进行。

- **[#5105 — 压缩摘要（compaction summarization）忽略已配置的 transport](https://github.com/earendil-works/pi/issues/5105)** *(已关闭；6 条评论)* — 压缩过程重建流式选项时未携带 `sessionId` 或 `transport`，导致 `openai-codex-responses` 静默回退到 `auto`，从而绕过自定义 transport。这是只在长会话路径中才会触发的隐性回归。

- **[#9294 — `claude-fable-5` 内置的 `allowedFallbackModels` 仍列出 `claude-opus-4-8`，而 API 现已拒绝该模型](https://github.com/earendil-works/pi/issues/9294)** *(开放中；4 条评论)* — 由于回退列表引用了 API 不再接受的模型，每个 fable-5 请求都会立即收到 400。这体现了内置目录元数据过期速度超过版本发布速度这一普遍问题。

- **[#9290 — 扩展 API 的 `modelRegistry.complete()` 不会为 opencode-go 模型发送 `x-opencode-session`](https://github.com/earendil-works/pi/issues/9290)** *(已关闭，未采取行动；5 条评论)* — 自 2026-09-06 opencode.ai 开始强制要求 `x-opencode-session` 头以来，所有由扩展通过 `modelRegistry.complete()` 发起的请求都会以 `400 MissingSessionID` 失败。对于扩展作者来说，这是一项破坏性变更。

- **[#8810 — 扩展注册的提供商：新会话会间歇性忽略 `defaultProvider`/`defaultModel`](https://github.com/earendil-works/pi/issues/8810)** *(开放中；4 条评论，1 👍)* — 当所配置的提供商通过 `pi.registerProvider()` 注册后，会话有时却以另一个提供商的默认模型启动。这种不确定的回退行为让重度依赖扩展的环境难以排查。

- **[#9306 — 中断/出错的轮次会在上下文中留下未匹配的 `toolCall` 块，后续继续操作被拒绝](https://github.com/earendil-works/pi/issues/9306)** *(开放中；2 条评论)* — 当某个轮次在流式输出一个或多个工具调用后以 `stopReason: "error"` 或 `"aborted"` 结束时，未匹配的块会污染上下文，导致下一次 `runAgentLoopContinue` 被提供商拒绝。

- **[#9188 — anthropic-messages 适配器会用响应回显的名称覆盖 `AssistantMessage.model`](https://github.com/earendil-works/pi/issues/9188)** *(开放中；2 条评论)* — 在模型改名代理后面，流式路径会执行 `output.model = event.message.model`，破坏了依赖所请求模型名的调用方的思维回放（thinking replay）。

- **[#9381 — 包报告：`pi-safe-compact` 被标记为恶意或不安全](https://github.com/earendil-works/pi/issues/9381)** *(已关闭，未分类；5 条评论)* — 报告者指出包作者 `primp9053` 在 GitHub 上已无法联系（附截图证据）。对依赖此包的任何人来说，这都是一个供应链危险信号。

## 主要 PR 进展

该时段内有 6 个 PR 获得更新，其中 5 个包含实质性改动：

- **[#9376 — fix(ai): 对 Mistral 托管的 GLM（`zai-glm-5-2`）使用 `reasoning_effort`](https://github.com/earendil-works/pi/pull/9376)** — Mistral 的目录为 GLM-5.2 声明了 `reasoning: true`，但 API 只接受 `reasoning_effort`，而不是 Pi 当前使用的 `prompt_mode: "reasoning"`。该 PR 修正了 Mistral 侧 GLM 推理的请求参数。

- **[#9374 — fix(coding-agent): 在活动会话操作期间拒绝重载](https://github.com/earendil-works/pi/pull/9374)** — 在 RPC 模式下，扩展命令可能在工具运行期间触发重载；工具包装层随后在成功执行后访问了已失效的 runner，导致产生虚假的错误记录。该 PR 增加了 `isStreaming`/`isCompacting` 检查，使其与 TUI 路径保持一致。

- **[#9382 — 浏览历史时始终将光标置于末尾](https://github.com/earendil-works/pi/pull/9382)** — 移除了不一致的光标位置逻辑，使上箭头历史导航与 bash 及其他标准 TUI 的行为一致。

- **[#9380 — docs: 校验文档导航与可达性](https://github.com/earendil-works/pi/pull/9380)** — 将 `packages/coding-agent/docs/docs.json` 作为带版本管理的递归式网站导航清单，并新增测试，检查重复 slug、失效的本地 Markdown 链接以及不可达页面。

- **[#9370 — docs: 将交互式测试和发布指南抽取为 skills](https://github.com/earendil-works/pi/pull/9370)** — 将面向贡献者的交互式测试与发布流程文档重构为可执行的 “skills”。

- **[#9368 — （误建 PR）](https://github.com/earendil-works/pi/pull/9368)** — 已关闭，未做任何处理；不包含功能变更。

## 热门讨论

该时段内的两则讨论更新均为扩展展示（标记为 `[General]`）：

### 展示与分享

- **[#8803 — 介绍 pi-verdict：一个为 pi 设计的极简权限闸门](https://github.com/earendil-works/pi/discussions/8803)** — 一种 allow/ask/deny 确认流程，风格模仿 Claude Code 的 auto 模式：单个文件、零依赖，在每次工具调用前都会进行检查。它直接通过扩展 API 回应了 Pi “无权限弹窗” 的设计理念。*(1 条评论，1 👍)*

- **[#9373 — pi-agent-views：由 pi 自身渲染的并发子代理](https://github.com/earendil-works/pi/discussions/9373)** — 并行运行多个代理，每个代理使用各自的模型，在空提示符下按 `←` 即可切换视图——这是对 Claude Code 代理视图功能的 Pi 原生实现。*(1 👍)*

## 功能请求趋势

- **TUI 体验与可配置性**：可折叠的助手消息代码块 (#9397)、更细粒度的启动界面分区 (#9289)、可配置的全屏滚动速度与 Alt 倍率 (#9315)、在 `pi list` 中显示已安装包版本 (#9398)，以及浏览历史时始终将光标置于末尾 (#9382)。

- **提供商目录治理**：移除已退役的模型（从 openai-codex 中移除 `gpt-5.4` #9394、过时的 `claude-opus-4-8` 回退 #9294）、遵守 OpenRouter `:free` 的上游限制 (#8760)，并新增针对具体提供商的配置，例如 Fireworks (#9323) 和原生 LongCat 提供商 (#9308)。

- **扩展与 SDK 加固**：为扩展组件提供显式排序/优先级 (#9401)、提供不会加载 CLI `main` 与 esbuild 原生依赖的 SDK 导出 (#9286)、为 `pi-agent-core`/`pi-ai` 提供语言中立的运行时适配器 (#9324)，以及为 RPC 的 model/thinking 命令增加可选 `persist` 标志 (#9393)。

- **会话状态可观测性与清理**：切换会话时清除全屏选择 (#9311)、防止中止轮次后残留未匹配的 `toolCall` 块 (#9306)，以及避免重复的引导式自定义消息 (#9322)。

## 开发者痛点

- **过时的提供商元数据导致日常性硬失败**：内置目录和回退列表引用了已退役或不可用的模型（`gpt-5.4`、`claude-opus-4-8`），并且忽略上游限制（OpenRouter `:free`），使用户直接遭遇 400 错误，只能手动对目录进行考古式排查。

- **误导性报错浪费调试时间**：Grok 的 403 错误被标成 “OpenAI API error” (#9298)；并行启动时的认证失败，在真正原因是另一个无关的过期 OAuth 凭据时，却把责任归到当前活跃提供商头上 (#8928)。

- **中断轮次导致会话/上下文损坏**：中断后残留的未匹配工具调用块 (#9306)、重复的引导消息 (#9322)、忽略 transport 的压缩摘要 (#5105)，以及卡在 “Working…” 的状态 (#5291)，都在降低多轮会话的可靠性。

- **扩展提供商行为不稳定**：新会话忽略扩展注册提供商的 `defaultProvider`/`defaultModel` (#8810)，以及 `modelRegistry.complete()` 缺少 `x-opencode-session` 请求头 (#9290)，这些问题都特别难以定位。

- **长生命周期、高内容量会话的性能问题**：加载动画（spinner）的 CPU 占用大致随 transcript 大小线性增长 (#9399)，在老硬件上会影响 500–2000 条消息的会话；此外，CLI 在 Node.js v20.20.2 上会因 `globSync` 导出错误而失败 (#9400)。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-10

## 1. 今日亮点

v0.23.2 已发布，改进了 Web Shell 分屏视图的会话导航；同时发布的还有 TypeScript SDK v0.1.11 与 cua-driver-rs v0.20.5。社区关注点仍集中在 Windows 进程泄漏（347 个孤儿 `conhost.exe` 进程）、VS Code 扩展更新会清空对话历史的 P1 回归问题，以及一批 Web Shell 打磨缺陷。PR 势头良好：过去 24 小时内有 50 个 PR 获得更新，其中包含工具调度正确性、daemon 会话持久化、对话记录导出性能和远程开发支持方面的扎实工作。

## 2. 版本发布

**v0.23.2** — 稳定版，没有已知的破坏性变更。包含一项 Web Shell 改进：增强了分屏视图的会话导航（[#11250](https://github.com/QwenLM/qwen-code/pull/11250)）。

**v0.23.2-nightly.20260909.2e212144d3** — Nightly 版本，包含一项 goal loop 修复：当检查点超出 claim 预算时进行重试，而不是卡住（[#11365](https://github.com/QwenLM/qwen-code/pull/11365)）。

**sdk-typescript-v0.1.11** — 捆绑 CLI 0.23.2（从 SDK 分支/ref 源码构建）。

**cua-driver-rs-v0.20.5** — 预构建的 CUA 驱动二进制：macOS 已代码签名/公证的 universal binary + app bundle；未签名的 Linux（x86_64/arm64，glibc 2.31 起）以及 Windows UIAccess/原生 SDK 负载。

## 3. 热门议题

1. **[#11303](https://github.com/QwenLM/qwen-code/issues/11303) — [P1] Windows 上 qwen-cli 泄漏无头 `conhost.exe` ConPTY 进程** — 单个 VS Code Companion qwen-cli 进程在运行 12 小时后累积了 347 个子进程 / 约 2.8 GB 内存。这是本周社区呼声最高的痛点；已有 12 条评论，其中 #11352 被拆分出来跟踪其中无法修复的 node-pty 部分。

2. **[#11489](https://github.com/QwenLM/qwen-code/issues/11489) — [P1] 扩展从 v0.21.x 更新到 v0.23.x 后丢失全部对话历史** — 新报告的回归：更新后侧边栏对话全部消失，尽管记录仍保留在 `state.vscdb` 中。对现有用户影响很大，目前正在等待维护者提供信息。

3. **[#11352](https://github.com/QwenLM/qwen-code/issues/11352) — [P1，受阻] node-pty ConPTY 宿主在 shell 自然退出时泄漏** — 从 #11303 拆出的根因：baton 在 `onExit` 之前被清除，导致 `ClosePseudoConsole` 无法从 JS 调用。维护者指出，被钉死的依赖使 Qwen 侧无法修复该问题；正在积极讨论中。

4. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — [P1] 多个后台 agent 完成时，TUI 因未捕获的 React #185 静默退出** — 交互终端因 Ink `useBoxMetrics` 报出 “Maximum update depth exceeded” 而直接退回 shell 提示符；后续恢复会话时提示 “Previous session appears…”。发布首日已有 3 条评论。

5. **[#11119](https://github.com/QwenLM/qwen-code/issues/11119) — [P1] 会话运行时回收时，后台 shell 输出与唤醒通知被静默丢弃** — 当长时间运行的 `run_shell_command` 循环比启动它的回合活得更久时，daemon 托管的 Web Shell 会话会卡住；输出和通知消失不见。已有 10 条评论，参与度很高。

6. **[#11503](https://github.com/QwenLM/qwen-code/issues/11503) — [P2] 当 `.git` 是指向其他卷的 junction/symlink 时，daemon 的 git 守卫会拒绝工作区自身的仓库** — 在 NTFS junction 方案下，即使是只读的 `git status`/`log` 也会被阻止。这属于对基于文本的 shell 守卫进行更广泛担忧的一部分，并催生了 #11504 中的结构性建议。

7. **[#11433](https://github.com/QwenLM/qwen-code/issues/11433) — [P3] 评估用 SQLite 支撑 Session/Prompt 的规模化索引与持久化** — 针对长对话与大量会话场景痛点的设计讨论：对 Prompt 的精确查询、记录回放、重连/附加。这表明社区希望朝向持久化会话存储的方向发展。

8. **[#11499](https://github.com/QwenLM/qwen-code/issues/11499) — [P2] `.mcp.json` 中的 `${VAR}` 占位符不会展开** — 当凭据通过环境变量引用时，MCP 服务器 headers 会被原样发送（`Authorization: Bearer ${MY_TOKEN}`）。对 MCP 用户来说是一个切实的安全/可用性 bug。

9. **[#11475](https://github.com/QwenLM/qwen-code/issues/11475) — [P3] Remote folders：让本地客户端连接远程 daemon** — 一个呼声很高的功能方向：客户端在本地运行，daemon/工作区/agent 执行在远程运行；基于现有 Web Shell 与多工作区 API 构建。

10. **[#11096](https://github.com/QwenLM/qwen-code/issues/11096) — [P3] 源码构建可能固定到未发布或过期的渲染器** — npm 上的 `latest`（0.23.0）在 #9812 合并前就已发布，因此其 tarball 缺少 `export-transcript-document.js`。任何从已发布产物中使用导出功能的人都会踩到这个坑。

此外值得关注：[#11465](https://github.com/QwenLM/qwen-code/issues/11465)（web-shell 视觉渲染不确定，相同运行之间出现 1.31% 像素差异）、[#11186](https://github.com/QwenLM/qwen-code/issues/11186)（把 home 目录作为服务对象时，channel 所有权模型存在缺口）、[#11403](https://github.com/QwenLM/qwen-code/issues/11403)（陈旧的 ECS runner 集群未能更新到 0.23.1）。

## 4. 关键 PR 进展

1. **[#11483](https://github.com/QwenLM/qwen-code/pull/11483) — fix(core): 拒绝已预先取消的排队工具请求**（已合并）— 当取消信号不会重放其 abort 事件时，避免已取消的工具请求排在与它无关的活动批次后面继续等待（关闭 #11146）。

2. **[#11468](https://github.com/QwenLM/qwen-code/pull/11468) — fix(bridge): 在刷新后的会话加载中保留待处理的权限/问题** — 停在未回答权限提示上的会话，重新打开时会重新展示交互卡片，而不再退化成只读记录页面。

3. **[#11342](https://github.com/QwenLM/qwen-code/pull/11342) — feat(web-shell): 增加模型角色与上下文窗口配置** — 在 Web Shell 设置中新增 Advisor/图像/语音模型选择器、可感知 endpoint 的选择逻辑，以及自定义对话/图像/语音模型配置。

4. **[#11244](https://github.com/QwenLM/qwen-code/pull/11244) — feat(web-shell): 使产品名称与 Logo 可配置** — 通过 `settings.json` + daemon 解析的 SVG 路径支持白标部署，无需重新构建源码。

5. **[#11413](https://github.com/QwenLM/qwen-code/pull/11413) — fix(web-shell): 避免重复恢复冷会话**（已合并）— 在恢复记录之前先等待工作区发现完成，丢弃 React StrictMode 产生的重复副作用，并在发现失败时提供可用的重试。

6. **[#11289](https://github.com/QwenLM/qwen-code/pull/11289) — fix(web-shell): 保留回合中途被 daemon 拒绝的消息** — 在运行中的回合期间发送而被拒绝的消息，现在会被明确标记为 idle-so-refusals；浏览器将其视为普通 prompt，而不是失败。

7. **[#9983](https://github.com/QwenLM/qwen-code/pull/9983) — fix(review): 防止宿主可信状态进入容器的可写区域** — 将 worktree 租约文件移出绑定挂载的 `.qwen/tmp`，并阻止宿主 git 通过容器可写区域内的指针进行解析；这是对 review 沙箱的加固。

8. **[#9466](https://github.com/QwenLM/qwen-code/pull/9466) — refactor: 将 rewind 映射锚定到稳定的 prompt 身份标识** — rewind 现在通过持久化的 prompt 身份标识解析目标，而不是按回合位置顺序，从而在会话恢复以及无头 `-p --rewind` 重新编号后依然有效。

9. **[#11163](https://github.com/QwenLM/qwen-code/pull/11163) — feat(web-shell): 从工作区分支选择器中管理 git 远程仓库** — 新增 Manage Remotes 面板：列出带 fetch/push URL 的远程仓库、添加远程仓库，并通过两步点击确认后删除。

10. **[#11485](https://github.com/QwenLM/qwen-code/pull/11485) — perf(export): 将记录渲染器内嵌的 CSS 拆分为带版本的静态资源** — 导出的文档现在会与渲染器 JS 并行地从 unpkg 加载固定版本、受 SRI 保护的样式表，从而减少内联体积。

同样在推进中：**[#10410](https://github.com/QwenLM/qwen-code/pull/10410)**（通过稳定的 `tool_search`/`tool_call` 桥接为延迟工具保留 prompt 缓存）、**[#9921](https://github.com/QwenLM/qwen-code/pull/9921)**（传递 `ask_user_question` 的取消原因）、**[#10347](https://github.com/QwenLM/qwen-code/pull/10347)**（在无法使用 Ctrl+Y 时自动重试被归类为 EOF 的传输错误）。

## 5. 热门讨论

本期摘要未提供讨论数据。

## 6. 功能需求趋势

- **远程优先架构** — 请求把本地交互客户端连接到远程 daemon/工作区（#11475），以及 daemon 文档与完善的站内导航同步（#11399），表明远程和无头工作流的需求正在增长。

- **Web Shell 成为产品界面** — 对白标化（#11244）、模型配置 UI（#11342）与会话/工作流可视化（#11500）的持续投入，表明 Web Shell 正在成为可部署的旗舰界面，而不仅是调试伴侣。

- **持久化、可扩展的会话状态** — 对基于 SQLite 的 Session/Prompt 索引（#11433）、缓存淘汰修复（#11493）、跨会话持久记忆（#11502）的讨论，都指向一个共同诉求：面向大规模场景的持久化记忆。

- **模型/提供商的灵活性** — 对 OpenAI Responses API 支持（#889）以及按提供商配置推理边界情况（#11328）的持续诉求，反映了对更广泛模型后端兼容性的需求。

## 7. 开发者痛点

- **Windows 可靠性问题最为突出** — 两个相互重叠的 P1 ConPTY 泄漏问题（#11303、#11352）都撞上了依赖被钉死的死胡同；用户报告数 GB 级的内存流失，且在没有上游改动的情况下无法修复。

- **对话/会话状态丢失** — 高严重性报告反复出现：VS Code 扩展更新清空历史（#11489）、保存的会话在切换模型/endpoint 后无法再发送（#9452）、daemon 运行时回收后后台输出消失（#11119）。用户对会话持久化的信任明显被动摇。

- **工具权限语义让用户困惑** — 被拒绝模式命中的工具会产生过于严格的错误消息，导致模型彻底放弃使用该工具（#11405）；而预取消的工具请求又会低效地排在活动批次后面（#11146）。

- **打包与 CI 滞后** — 已发布的 npm tarball 缺少最新的渲染器文件（#11096）、ECS runner 集群版本陈旧（#11403），以及 E2E 产物上传/macOS 分片不稳定（PR #11375、#11134），给贡献者和用户都带来了摩擦。

- **Web Shell UI 打磨仍有缺口** — 一连串细小但可见的缺陷——侧边栏底部控件重叠（#11453）、后台 agent 通知时缺少会话加载指示器（#11385）、计划内 SSE 重连却显示吓人的重连横幅（#8887）、视觉渲染不确定（#11465）——让本期摘要的后半部分读起来就像“Web Shell 缺陷清理周”。

---

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*