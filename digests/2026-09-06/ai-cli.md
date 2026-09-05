# AI CLI 工具社区动态日报 2026-09-06

> 生成时间: 2026-09-05 22:45 UTC | 覆盖工具: 7 个

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

# 跨工具对比报告 — AI CLI 开发者工具
*社区摘要数据，2026-09-06*

## 1. 生态概览

AI CLI 生态已经从“模型接入竞赛”转向“运维可靠性较量”。GPT-6 Astra 浪潮过后 24 小时，Copilot、Codex、Pi 和 OpenCode 都已发布与 Astra 相关的修复或支持，但社区信号最强的讨论集中在会话卡死、静默模型切换、配额不透明、Windows/WSL 路径缺陷和更新回归上。长时间运行的自主会话开始暴露出与分布式系统同类的故障模式：取消、状态一致性、压缩和审计完整性。与此同时，运行时前沿正迈向实时语音（Codex）、守护进程式会话管理（Qwen Code）和更健壮的智能体-工具协议层（多数工具都在加固 MCP/ACP）。对开发者而言，真正的差异化因素已不再是模型质量本身，而是每个工具在上下文、身份、配额与文件系统状态管理上的诚实和可靠程度。

## 2. 活动对比

下面计数反映的是各项目每日摘要捕获到的高信号条目（“热门 issue”、“关键 PR”、“热门讨论”），而非 GitHub 全量总数。七份摘要恰好都筛选了 10 个热门 issue；这个时间窗口内真正具有判别力的信号是 PR 吞吐量、讨论文化和发布节奏。

| 工具 | 重点 Issue | 重点 PR | 重点讨论 | 发布动态（24 小时） |
|---|---|---|---|---|
| Claude Code | 10（2 个仍开启；8 个被自动关闭为过期） | 1 | — | 无 |
| OpenAI Codex | 10 | 16（10 个关键 PR + 6 个语音管线支持 PR） | 9 | `rust-v0.153.4` |
| Gemini CLI | 10 | 11 | — | `v0.60.0-nightly.20260905` |
| GitHub Copilot CLI | 10 | 0 | — | `v1.0.84-1`（新增 GPT-6 Astra） |
| OpenCode | 10 | 15（10 个关键 PR + 5 个追加 PR） | —* | `v1.18.29`（修复 `gpt-6-astra` 可见性） |
| Pi | 10 | 11 | 3 | `v0.85.1`（新增 GPT-6 Astra） |
| Qwen Code | 10 | 10 | — | `v0.23.1-preview.0` + `v0.23.0-nightly.20260905` |

\* OpenCode 的摘要明确指出该时段没有讨论数据。“—” 表示对应工具的摘要未捕获到讨论活动；上述仓库在上游均未禁用 Issues/PR。

**值得注意的社区热度指标：**

- Claude Code 的 Connector 多账户请求（#27302）依然是所有单点 issue 中最大的需求信号，目前有 369 👍。
- OpenCode 的内存问题大帖（#20695）是最活跃的开放讨论帖，共 140 条评论；维护者请用户停止运行 LLM 生成的诊断，改为提供堆快照。
- Copilot CLI 的头号请求（#1857，取消已排队的消息）在数月后仍停留在 28 👍；Codex 最活跃的开放 issue（#41463，Windows/WSL 项目创建）为 19 👍。
- Copilot CLI 和 Claude Code 的代码变动最少：Copilot 毫无 PR 活动；Claude Code 没有发布任何版本，且只有一个开放 PR（安全 glob 修复，#87079）。

## 3. 共性功能方向

**Windows/WSL 成为一等平台** — 七个工具中均有体现，且同时涉及正确性与安全性两个维度：

- Claude Code：Cowork 沙箱在挂载的主机文件夹上只能写入、不能 unlink（#55206）；僵尸进程会锁死目录（#80769）。
- Codex：WSL 下 `AbsolutePathBuf` 反序列化失败（#41463/#42984）；`Z:\AREA_01` 被破坏成 `Z:\AREA\_01`（#41486）。
- Copilot CLI：WSL2 下 `Ctrl+H` 被误读为 `Ctrl+Backspace`（#4328）；Windows 25H2 不支持沙箱（#4652）。
- Gemini CLI：NTFS 8.3 短文件名路径可绕过安全检查（#29116）。
- Qwen Code：Windows 下经过校验的 `@`-文件读取丢失了 `O_NOFOLLOW` 语义（#8227）。
- Pi：维护者正在进行一项明确的 Windows 使用情况调查（#7547）；TUI 输入重绘缺陷（#6300）。
- OpenCode：某个发布版本向 Windows 用户推送了损坏的二进制（#27963）。

**诚实的模型状态与用量可见性** — 六个工具的用户都报告了静默改写模型、幽灵授权门槛和不透明的限额执行问题：

- Copilot：静默切换到 GPT-5 mini，导致任务中途停止（#4732）。
- Gemini：被固定的 `gemini-2.5-flash` 在启用 GA 的后端上被静默改写为 3.5 Flash（#29217/#29222）。
- Claude Code：Max 套餐用户被 “usage credits”/组织限制错误挡住，而桌面应用并不会显示这些错误（#82334/#82429）。
- OpenCode：`limit.output` 被静默钳制在 32k（#29363）；v2 从不发送 `max_tokens`（#47398）。
- Codex：5 小时滚动限额的抱怨（#40707），以及不透明的预算消耗（#42983）。
- Pi：Copilot GPT-6 Astra 被路由到不受支持的 `/chat/completions` 端点（#9209）。

**长会话韧性与上下文生命周期工程** — 压缩、输出上限和 token 开销如今已成为核心可靠性话题：

- Claude Code：1M 上下文会话永久卡死，压缩也无法脱困（#82402）。
- Codex：自动压缩挂起 20 分钟以上并重启（#43062）。
- Copilot：有人提议在空闲时自动压缩，并把时机对齐到约 5 分钟的 prompt-cache TTL（#4724）。
- Gemini：用 AST 感知的文件读取来降低 token 噪声和错位读取（#22745）。
- OpenCode：手动 V2 压缩（#40601），以及携带压缩上下文的 `/handoff`（#40578）。
- Pi：用系统消息增量代替整体重写顶层提示，减少 token 反复消耗（#9116/#9117）。
- Qwen Code：会话轮换，以及持久化的 `/focus` 静默模式（#8927/#11093）。

**中断、取消与如实完成** — 智能体循环经常挂起、谎报成功或无法被中断：

- Copilot：已提交的排队消息无法取消（#1857）。
- Gemini：MAX_TURNS 被打断却报告为 GOAL 成功（#22323）；通用型智能体无限期挂起（#21409）。
- OpenCode：流式传输中触发中止并不会终止子进程（#40669）。
- Pi：扩展对话框与会话拆除存在竞争，导致 TUI 卡在 “Working…”（#6978/#9203）。
- Claude Code：上游 529 故障期间没有写入队列机制（#82402）。

**会话/历史状态完整性与审计溯源** — 已删除的对话、丢失的上下文和伪造的转录内容正在削弱信任：

- Codex：已删除的对话会以幽灵条目形式残留在 Recents 和侧边栏中（#41661/#42768）。
- Claude Code：助手响应偶尔会混入一段被捏造的用户轮次（#81912）。
- Pi：`/export` 会静默丢弃模型实际见过的 `display:false` 消息（#8896）。
- Qwen Code：冷启动恢复后审批模式丢失（#11070）；当工作区是主目录时频道设置不可见（#11083）。
- Codex 讨论 #42965 提议追踪是哪个轮次/窗口产生了持久化的世界状态。

**打包与自动更新安全** — 更新机制正在破坏五个工具原本完好可用的安装环境：

- Copilot：自动更新会重写正在运行的二进制文件，并破坏桌面重连（#4728）；运行时升级后报 “Worktree missing”（#4734）。
- Pi：0.85.0 携带一个未声明的静态 import，导致全新 npm 安装失败（#9132）。
- OpenCode：Windows 上发布了损坏的 `opencode-ai` 二进制（#27963）。
- Claude Code：Intel macOS 构建捆绑了需要 AVX2 的 Bun，导致 SIGILL（#75802）。
- Qwen Code：发布管线重复劳动，且不进行任何验证（#11109）。

**MCP/ACP/工具层加固** — 智能体-工具协议层仍是故障的高发区：

- Copilot：`tools/list` 刷新超时会永久移除某个服务器的全部工具（#4731）；JSON-RPC 序列化会破坏 `open_canvas` 参数（#4721）；研究智能体被告知调用不存在的 `github/get_me`（#4729）。
- Claude Code：MCP-over-HTTPS 在较新的 CA 根证书下失败；文档所述的环境变量覆盖无效（#82202）；`**` glob 模式会把顶层文件静默排除在安全规则之外（PR #87079）。
- Gemini：运行时 MCP 策略检查现在采用大小写不敏感的服务器名匹配，并在 allowlist 为空时按 fail-closed 处理（#29200）。
- OpenCode：ACP 子智能体活动会通过根会话呈现，并携带谱系元数据（#40654）。

## 4. 差异化分析

**Claude Code** 是治理优先的企业级工具：Connector 身份管理、通知钩子、沙箱化和安全模式执行主导了其路线图和缺陷报告。它是这组工具中发布节奏最保守的（24 小时内无发布），而其呼声最高的功能请求——每个安装支持多个 Connector 账户（#27302）——明确对应企业级多租户需求。它也是唯一一个 tracker 卫生正在反过来损害有效信号的工具：评论最多的前 30 个 issue 中约有 28 个在一轮清扫中被自动关闭。

**OpenAI Codex** 押注的是分发广度：CLI、统一的 ChatGPT/Codex 桌面应用、VS Code 扩展、Android 远程访问，如今再加上原生实时语音管线（WebRTC、Opus RTP、音频设备）。它的 PR 活动在该窗口内最高（16 个 PR），由自动合并列车驱动。它的社区面貌也是讨论氛围最浓厚的，包括一个收录了 150+ 工具的 “Awesome Codex CLI” 生态目录。它的弱点是跨端会话一致性——幽灵聊天、iOS 同步失败和桌面 UI 回归。

**GitHub Copilot CLI** 是 GitHub 生态中稳定性优先的延伸工具。它很快支持了 GPT-6 Astra，但窗口内的 PR 活动为零。社区讨论集中在输入/键盘控制（#1857）、MCP 工具链缺陷和自动更新回归上——这表明该工具功能上已经成熟，但在更新边界上运维层面比较脆弱。相比 Codex 和 Claude Code，它的功能集刻意保守。

**Gemini CLI** 是开源 “unlock the model” 项目：nightly 加固构建、同一窗口内两个独立的社区 P1 修复，以及旨在让 Gemini 模型安全使用原生 POSIX 工具链（#19873）并具备 AST 感知代码智能（#22745）的功能开发。它的安全加固异常扎实——将 `~/.gemini` 凭据与沙箱容器隔离（#29216）、净化运行时环境变量，并对不可信的工具输出强制实施信封溯源（#29215）。

**OpenCode** 是 provider 无关的兼容引擎。它的 PR 在规范化松散的 provider 载荷、容忍可空字段、处理无索引的工具调用增量、保留 Gemini 模态细节，并修复快照中的 Unicode 路径。它正处于向 2.0/Go 平台迁移的半途，眼下的痛点主要集中在 v1 可靠性（内存泄漏、输出上限）和 v2 成熟度（缺少 `max_tokens`、服务重启循环）之间。社区贡献量很高（从 8 月 5 日的一批提交中浮现出约 40 个排队修复），但维护者正在积极抵制低质量的 LLM 生成的缺陷诊断。

**Pi** 是对构建者友好的智能体内核：扩展运行时向插件作者开放、系统消息增量架构、广泛的 provider 路由（Meta/Muse、LLM Gateway、Requesty），以及句中技能调用。它是这群工具里 Windows 支持最不成熟的，维护者为此明确开展了 Windows 使用调查，以确定 TUI 修复的优先级。它的打包事故（#9132）和随后的快速双重修复，正是小规模、快节奏团队配合良好社区反馈闭环的典型特征。

**Qwen Code** 最偏向 “智能体即服务”：守护进程化会话（`qwen serve`）、命名会话 worktree、用于可信远程控制的 IPC 控制器令牌、`/loop` cron 任务，以及 web-shell 工作流可视化。它的发布节奏激进（24 小时内两个产物），但痛点集中在后台会话回收、通知被静默丢弃和导出内容膨胀（19.5 MB 的 HTML 导出，`mermaid` 被扁平化写入 transcript）。

## 5. 社区势头与成熟度

- **最高的原始需求信号**：Claude Code 的 #27302（369 👍）让所有其他单点 issue 都相形见绌，但它自 2 月以来一直开放，且没有路线图回应——这是高需求撞上低透明度的典型表现。OpenCode 的内存问题大帖（140 条评论、108 👍）展现出持续的社区参与度；Copilot 的取消排队请求（28 👍）和 Codex 的 Windows/WSL issue（19 👍）则分别是这两个社区的热度锚点。

- **最快的代码推进**：Codex（16 个 PR，大部分来自自动化语音管线合并列车）、OpenCode（约 15 个 PR，大多由社区贡献）、Gemini CLI（11 个 PR，包括两个独立的外部 P1 修复）和 Pi（11 个 PR）迭代最快。Qwen Code 在窗口内发布了两个版本，但也花了大量精力在自身 CI/发布管线上。Copilot（0 个 PR）和 Claude Code（1 个 PR）是本快照中代码推进最慢的，不过两者在 issue 分诊上仍然活跃。

- **社区贡献文化**：Gemini CLI 和 Pi 拥有最健康的外部贡献者生态——Gemini 收到了两个几乎相同、针对同一模型固定缺陷的独立修复；Pi 则在窗口内把一个长期被请求的功能（句中技能调用，#8457）落地为可工作的 PR。OpenCode 的社区 PR 批量很大但噪音较多。Codex 有丰富的讨论生态，但可见的外部代码贡献不多；Copilot 和 Claude Code 则几乎没有。

- **Tracker 成熟度隐忧**：Claude Code 的 stale bot 清扫同时关闭了噪音 issue 和合法的可复现缺陷报告，让贡献者无法确定 issue 是否真的被看到或修复。OpenCode 的 stale-issue bot 也关闭了有效 issue（#21760/#26707）。相比之下，Codex 的讨论频道文化最成熟，Ideas、Q&A 和 Show-and-tell 都很活跃。Gemini、Pi 和 Qwen Code 仍保持着健康的从 issue 到 PR 的转化率。

## 6. 趋势信号

1. **可靠性在社区优先级中已经压过模型的新鲜感。** 这个发布窗口由 Astra 支持主导，但票数最高的 issue 都是关于取消、路径破坏、会话卡死和静默模型切换的。*对开发者：评估智能体 CLI 时要看故障恢复能力，而不只是模型接入。*

2. **上下文管理正在成为新的内存管理。** 压缩挂起（Codex #43062）、静默输出上限（OpenCode #29363）、1M 上下文卡死（Claude #82402）和 token 反复消耗（Pi #9116/#9117）都指向同一个结论：上下文生命周期才是长会话的关键约束。*对开发者：优先选择具备手动压缩触发、透明输出上限且不会静默丢弃上下文的工具。*

3. **取消与中断语义是必备原语，而不是锦上添花。** 排队消息无法取消（Copilot）、已中止的命令继续运行（OpenCode）、MAX_TURNS 被打断却报告为目标成功（Gemini）。当智能体无人值守运行数小时时，误报成功既是正确性风险，也是审计风险。*对开发者：设定可验证的验收标准并核实实际状态，而不是轻信工具报告的完成状态。*

4. **Windows/WSL 的采用程度将决定企业级智能体的覆盖范围。** 本报告中的每个工具都存在 Windows 特定缺陷簇，从路径破坏到沙箱语义再到 TUI 输入缺陷。能填补这些空白的平台将赢得企业开发者市场。*对开发者：在标准化之前，先分别在 WSL2 和 Windows 原生模式下测试智能体工作流。*

5. **信任需要溯源与可审计性。** 捏造的用户轮次（Claude #81912）、已删除对话的幽灵残留（Codex #41661）、导出转录遗漏模型实际见过的上下文（Pi #8896），以及不可信工具输出的信封欺骗（Gemini #29215），都在侵蚀对智能体转录的信任。*对开发者：让人机轮次清晰分离，在导出中保留完整上下文，并核实持久化状态的来源。*

6. **自动更新机制是现实存在的可靠性与安全风险。** Copilot 的自动替换运行中二进制（#4728）、Pi 的全新安装被破坏（#9132）和 Claude 的 CPU 不兼容二进制（#75802）都表明：更新通道可能静默破坏原本可用的工作环境。*对开发者：优先选择支持事务性、可延迟更新和版本固定的工具。*

7. **语音与远程控制是下一个差异化前沿。** Codex 的实时 WebRTC/Opus 工作是最明确的信号，但移动远程控制（Claude #82403、Codex Android #38023）、控制器令牌 IPC（Qwen #11090）和守护进程式会话管理都指向同一个方向：“智能体作为随时可用的服务”。*对基于这些工具进行构建的开发者：留意异步、移动和语音模式正在成为标准接口，而非实验性功能。*

**工具选型结论：** 优先选择在模型选择与配额状态上透明的工具；提供可靠压缩与取消能力的工具；把 Windows/WSL 当一等公民的工具；以清晰溯源隔离凭据与工具输出的工具；以及所发更新不会静默破坏工作会话的工具。能解决这些运维问题的工具，会比那些只会堆下一个模型的工具更快地脱颖而出。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code 技能社区亮点 — 2026-09-06

## 1. 热门技能排名

排名按仓库中的评论量排序。截至快照日期，下列每个 PR 均处于 **Open** 状态。

1. **skill-creator：修复 `run_eval.py` 的 0% 召回率问题** — [#1298](https://github.com/anthropics/skills/pull/1298)
   通过把评估产物安装为真正的技能，修复了 `run_eval.py` 对所有技能描述都报告 `recall=0%` 的问题；同时修复了 Windows 流读取、触发检测和并行 worker 等问题。PR 摘要提到，issue [#556](https://github.com/anthropics/skills/issues/556) 已有“10+ 个独立复现”，并指出此前的描述优化循环其实是在“对着噪声做优化”。这是本仓库中讨论最多的 PR。

2. **document-typography 技能** — [#514](https://github.com/anthropics/skills/pull/514)
   为 AI 生成的文档增加排版质量控制：孤立单词换行问题（orphan word）、段落标题孤行（widow paragraph header）和编号错位。讨论聚焦于这类缺陷——它们几乎影响每一份 Claude 生成的文档，却极少被用户审阅时发现。

3. **scnet-hpc 技能** — [#1615](https://github.com/anthropics/skills/pull/1615)
   一个通过基于 profile 的 SSH 与 Slurm 操作 SCNet HPC 集群的新技能：连接配置文件、分区/内存/模块指导、Slurm 作业生成、集群发现和计算节点工作流。这说明科研计算运维正在成为技能（Skills）的一个新兴应用领域。

4. **pdf 技能大小写敏感修复** — [#538](https://github.com/anthropics/skills/pull/538)
   修正了 `skills/pdf/SKILL.md` 中 8 处大小写不一致（`REFERENCE.md` → `reference.md`、`FORMS.md` → `forms.md`），这些问题在大小写敏感的文件系统上会导致失败。由于影响所有在 Linux/macOS 上使用官方 PDF 技能的用户，因此关注度很高。

5. **ODT 技能 — OpenDocument 文本与模板填充** — [#486](https://github.com/anthropics/skills/pull/486)
   新增对 `.odt`/`.ods` 文件的创建、填充、读取与转换支持，以及 ODT→HTML 解析，并为 LibreOffice/OpenDocument 相关请求提供显式触发词。这是当前需求旺盛的文档格式簇中的一部分。

6. **frontend-design 技能修订** — [#210](https://github.com/anthropics/skills/pull/210)
   对官方 frontend-design 技能进行修订，使其更清晰、更可操作、内部更一致，确保每条指令都能在一次对话中执行。讨论从 1 月一直持续到 3 月，核心在于提示词的具体化与泛泛的设计建议之间的取舍。

7. **skill-quality-analyzer + skill-security-analyzer** — [#83](https://github.com/anthropics/skills/pull/83)
   为示例市场新增两个元技能：一个 5 维质量分析器（结构/文档 20%、示例、资源），外加一个互补的安全分析器——这是对社区日益增长的信任与质量担忧的直接回应。

8. **docx 修订 ID 冲突修复** — [#541](https://github.com/anthropics/skills/pull/541)
   避免修订（tracked change）的 `w:id` 与 OOXML 中既有书签冲突时导致文档损坏——这是官方 DOCX 技能示例中一个隐蔽但危险的正确性 bug。

## 2. 社区需求趋势

从 issue 追踪器来看，需求最旺盛的方向有：

- **skill-creator 工具链可靠性** — issue [#556](https://github.com/anthropics/skills/issues/556)（“所有查询的触发率均为 0%”，12 条评论，7 👍）是当前讨论最多的 bug，已催生至少三个独立的修复 PR（[#1298](https://github.com/anthropics/skills/pull/1298)、[#1099](https://github.com/anthropics/skills/pull/1099)、[#1050](https://github.com/anthropics/skills/pull/1050)）。社区正在投入大量精力让技能评估能够正确工作，Windows 环境也不例外。
- **信任、安全与来源可追溯** — issue [#492](https://github.com/anthropics/skills/issues/492)（43 条评论——本仓库中评论数最高的 issue）认为，在 `anthropic/` 命名空间下分发的社区技能，会为信任边界滥用与权限提升提供可乘之机。
- **组织级共享与分发** — issue [#228](https://github.com/anthropics/skills/issues/228)（16 条评论，8 👍）希望在 Claude.ai 中提供组织级技能库/直接共享，而不是手动传输 `.skill` 文件。
- **重复的插件内容** — issue [#189](https://github.com/anthropics/skills/issues/189)（9 👍，为全仓库最高 👍 数）：`document-skills` 和 `example-skills` 插件会安装完全相同的技能，导致上下文占用翻倍；社区希望得到干净、彼此不重叠的打包方式。
- **上下文窗口效率** — issue [#1487](https://github.com/anthropics/skills/issues/1487) 报告，`claude-api` 技能会在一次工具调用中急切地注入约 156k token。对技能引用所占 token 的约束，正在成为一项评审标准。
- **面向长时间运行 Agent 的元技能** — 针对 Agent 治理（[#412](https://github.com/anthropics/skills/issues/412)）、紧凑的符号化 Agent 记忆（[#1329](https://github.com/anthropics/skills/issues/1329)，9 条评论）以及推理质量门控流水线（[#1385](https://github.com/anthropics/skills/issues/1385)）的提案表明，社区需要的是能够监督 Agent 的技能，而不仅仅是领域知识。

## 3. 高潜力的待合并技能

以下 PR 讨论活跃、尚未合并，且近期仍有新的动态：

- **buffer-api Agent 技能（Buffer GraphQL）** — [#1627](https://github.com/anthropics/skills/pull/1627) — 更新于 2026-09-05（快照前一天）：社交媒体帖子排程/数据分析，可跨 Claude、Cursor、Codex、n8n 等平台使用。
- **claude-api：淘汰四个模型 ID** — [#1607](https://github.com/anthropics/skills/pull/1607) — 更新于 2026-09-01：一项直接的维护修复，将这些模型标记为已弃用；预计很快合入。
- **UIZZE 合作技能** — [#1595](https://github.com/anthropics/skills/pull/1595) — 更新于 2026-08-29：一个免费的 anti-UI-slop 设计技能，可选通过经认证的 MCP 从 800,000+ 个屏幕中检索参考。
- **scnet-hpc** — [#1615](https://github.com/anthropics/skills/pull/1615) — 更新于 2026-08-24：HPC 集群运维（见“热门技能排名”）。
- **Hivemind：零成本多 Agent 编排** — [#1628](https://github.com/anthropics/skills/pull/1628) — 更新于 2026-08-24：Claude Code 继续担任规划者/审查者/合并者，由运行在免费模型上的无头 opencode worker 执行机械性工作。
- **ServiceNow 平台技能** — [#568](https://github.com/anthropics/skills/pull/568) — 更新于 2026-08-12：企业级覆盖范围很广——ITSM、ITOM、SAM/ITAM、FSM、HR/CSM、SPM、CSDM 和 IntegrationHub。
- **pyxel 复古游戏开发技能** — [#525](https://github.com/anthropics/skills/pull/525) — 更新于 2026-07-15：面向 Pyxel 8 位引擎的 MCP 驱动工作流：编写 → run_and_capture → 检查 → 迭代。
- **self-audit（v1.3.0）** — [#1367](https://github.com/anthropics/skills/pull/1367) — 更新于 2026-07-02：先执行机械式文件校验，再按危害严重程度依次进行四维推理审计，最后才交付输出。

还有两个进展较慢但分量十足的提交依然是有力候选：**document-typography**（[#514](https://github.com/anthropics/skills/pull/514)，自 3 月起保持持续讨论）和 **testing-patterns**（[#723](https://github.com/anthropics/skills/pull/723)，Testing Trophy 方法论，涵盖单元测试/React 测试，以及哪些内容*不*该测试）。

## 4. 技能生态观察

纵观 PR 和 issue，社区最集中的需求并不是某个单一垂直技能，而是**可信赖的技能基础设施**：修复 skill-creator 的评估流水线、守住 `anthropic/` 命名空间的信任边界，并消除重复加载或过度占用上下文窗口的技能加载方式。

---

# Claude Code 社区摘要 — 2026-09-06

## 今日亮点

过去 24 小时内没有发布任何新版本。议题追踪器上可见大量 stale-bot 维护动作：评论最多的前 30 个议题中，约有 28 个已于 2026-09-05 被自动关闭，仅剩 Connector 多账户功能请求（[#27302](https://github.com/anthropics/claude-code/issues/27302)，369 👍）和 Windows Cowork 沙箱 bug（[#55206](https://github.com/anthropics/claude-code/issues/55206)，15 条评论）仍在活跃。被关闭的条目中有不少是真实、可复现的问题报告，但看起来它们只是过期后被自动清理，并没有公开可见的修复。

## 热门议题

**仍然开放**

- [#27302 — 支持多个 Connector 账户（同一个 Connector、不同账户）](https://github.com/anthropics/claude-code/issues/27302) — 这是追踪器上目前占绝对主导地位的需求信号，自 2 月以来已有 242 条评论和 369 个 👍。企业和多租户用户希望无需重新认证即可在 `claude.ai/code` 的不同 Connector 身份之间切换。社区反馈总体非常积极，但团队那边仍然没有给出任何路线图信号。

- [#55206 — Windows 上的 Cowork：沙箱可以在挂载的主机文件夹中创建文件，但 unlink 被拒绝](https://github.com/anthropics/claude-code/issues/55206) — 一个范围明确、可复现的 bug：Windows 上处于沙箱中的 Bash 可以写入却无法删除，导致 Cowork 会话中所有 `git` 写操作都失败。15 条评论和 11 个 👍 使其成为本期窗口内最活跃的开放 bug 报告；多名用户确认了相同的复现步骤。

**因过期关闭（不一定已修复）**

- [#82402 — 长会话在 529 后不可恢复，随后出现 "Prompt is too long"，且没有上下文压缩逃生通道](https://github.com/anthropics/claude-code/issues/82402) — 一个 1M 上下文的 Opus 会话被永久卡死：写入在一次上游 529 期间被阻塞，随后一个过大的工具结果使会话彻底无法恢复。这暴露了两个可靠性缺口：上游中断期间没有写入排队机制，以及单个工具结果超出上下文时没有任何逃生出口。

- [#81912 — 助手响应偶尔包含一段伪造的用户轮次](https://github.com/anthropics/claude-code/issues/81912) — 模型会附加一条在语境上貌似合理、但人类从未发送过的 `user:` 消息。对于智能体式编码工具来说，这属于审计完整性问题；在被过期清理之前，它几乎没有得到任何分流处理。

- [#82334 — 个人账户上的模型切换被 “organization settings” 阻止](https://github.com/anthropics/claude-code/issues/82334) — 用户被困在 Fable 5 上，即使用的是个人账户，`/model` 也会被组织限制错误拒绝。这属于 7 月下旬 Fable 时代授权问题集群的一部分；另见 [#82429](https://github.com/anthropics/claude-code/issues/82429) 和 [#82404](https://github.com/anthropics/claude-code/issues/82404)。

- [#82429 — 剩余 100% 额度仍被 “manage usage credits” 提示拦住：Fable 模型不可用](https://github.com/anthropics/claude-code/issues/82429) — CLI 向 Max 订阅用户展示了一个按量计费门槛，而 Desktop 应用却允许使用同一个模型。这更像是 CLI 的授权检查 bug，而不是真正的额度问题。评论数不多，但造成困惑的潜力很高。

- [#81788 — 通知钩子（permission_prompt/idle_prompt）在 Desktop 应用中从不触发](https://github.com/anthropics/claude-code/issues/81788) — 同样的钩子可以在 Desktop 中为 `Stop` 事件触发，也可以在 CLI 中为所有事件触发。通知基础设施的静默失败，对依赖 Desktop 做审批和空闲提醒的团队来说非常痛苦。

- [#75802 — darwin-x64 附带需要 AVX2 的 Bun；在 Haswell 之前的 Intel Mac 上触发 SIGILL](https://github.com/anthropics/claude-code/issues/75802) — 自 v2.1.113 起，较旧的 Intel Mac 会因 `Illegal instruction: 4` 崩溃，而 linux-x64 附带的则是基线构建。该议题已作为重复/过期议题关闭，但没有任何打包对齐修复的迹象。

- [#82202 — Linux 原生二进制在较新的 CA 根证书下 MCP-over-HTTPS 失败；CLAUDE_CODE_CERT_STORE 没有效果](https://github.com/anthropics/claude-code/issues/82202) — 一条锚定在较新的 ISRG 根证书上的有效 Let's Encrypt 证书链，在原生二进制中触发了 `UNKNOWN_CERTIFICATE_VERIFICATION_ERROR`，而机器上所有其他 TLS 栈都能正常验证该链。文档中记录的环境变量覆盖设置并未生效。

- [#80769 — Windows PID 校验 PowerShell 探测会留下永久无法杀死的僵尸进程](https://github.com/anthropics/claude-code/issues/80769) — 一个 1000 毫秒的内部探测会生成一些进程，这些进程会残留下来并锁定项目目录。此类文件系统锁问题是 Windows 上反复出现的痛点，而自动关闭前没有任何变通方案被提出。

## 关键 PR 进展

本期窗口内只有一个 PR 处于活跃状态：

- [#87079 — fix(security-guidance)：让 ** glob 模式匹配零深度路径](https://github.com/anthropics/claude-code/pull/87079) — 一个针对静默安全规则漏洞的社区修复。由于匹配逻辑委托给了 `fnmatch`，而 `fnmatch` 不会把 `**` 当作特殊语法处理：单个 `*` 本身就能跨过 `/`，所以 `**/*.ts` 仍然要求路径中有一个字面 `/`，导致顶层文件被排除在 `security-patterns.json` 之外——尽管 docstring 承诺 `**` 可以匹配“任意深度”。对安全排除规则来说，静默地不覆盖是最糟糕的失败模式，因此这个 PR 值得密切关注。

过去 24 小时内没有其他 PR 被开启、合并或更新。

## 功能需求趋势

- **多账户与身份切换** — [#27302](https://github.com/anthropics/claude-code/issues/27302) 在追踪器上远超其他所有议题。需求很明确：让一次安装可以持有多个 Connector 账户，并支持按会话或项目切换身份。企业用户实际上无法在拥有多个身份的组织中采用 Connector。

- **远程与移动端控制** — [#82403](https://github.com/anthropics/claude-code/issues/82403) 提议从移动端在宿主会话的本地目录中启动一个新的 Claude Code 会话。这与更早提出的“远程控制”方向互补，也说明用户希望 Claude Code 能像一个守护进程那样，可以从任何地方驱动。

- **插件作用域与配置路径一致性** — 用户期望项目级插件（[#74612](https://github.com/anthropics/claude-code/issues/74612)）和自定义 `CLAUDE_CONFIG_DIR`（[#82428](https://github.com/anthropics/claude-code/issues/82428)）在 CLI、VS Code 与 Desktop 应用中的行为完全一致。目前，不同入口下的行为会静默分叉。

- **模型状态持久化** — [#80272](https://github.com/anthropics/claude-code/issues/80272)：恢复 1M 上下文会话时，模型系列会被保留，但 `[1m]` 变体被静默丢弃，直到重新打开选择器。用户希望恢复会话时模型选择能够保持固定并被如实展示。

## 开发者痛点

- **新模型引发的授权与计费困惑** — 一组报告（[#82429](https://github.com/anthropics/claude-code/issues/82429)、[#82404](https://github.com/anthropics/claude-code/issues/82404)、[#82334](https://github.com/anthropics/claude-code/issues/82334)、[#82401](https://github.com/anthropics/claude-code/issues/82401)）显示，Max 计划用户会在 CLI 中被 “usage credits required” 门槛或幽灵式组织限制拦截。社区的普遍感受是沮丧：这些报错与用户的套餐状态相矛盾，也与 Desktop 应用的表现不一致。

- **沙箱与安全规则误报** — 关于安全护栏阻碍正常工作的投诉反复出现：拒绝把仓库提供的凭据输入用户自己的应用（[#81771](https://github.com/anthropics/claude-code/issues/81771)）；对常规任务“过于激进”的过滤器拒绝（[#82415](https://github.com/anthropics/claude-code/issues/82415)、[#82411](https://github.com/anthropics/claude-code/issues/82411)）；Windows 的 unlink 拒绝（[#55206](https://github.com/anthropics/claude-code/issues/55206)）；macOS 沙箱以退出码 126 拦下自身的 zsh `eval` 封装（[#77466](https://github.com/anthropics/claude-code/issues/77466)）。

- **跨平台不一致** — Windows 特有的故障（僵尸进程锁定目录 [#80769](https://github.com/anthropics/claude-code/issues/80769)、Cowork 沙箱语义 [#55206](https://github.com/anthropics/claude-code/issues/55206)、VS Code 插件作用域 [#74612](https://github.com/anthropics/claude-code/issues/74612)）、Intel Mac 打包回归（[#75802](https://github.com/anthropics/claude-code/issues/75802)），以及 Linux CA 证书包陈旧（[#82202](https://github.com/anthropics/claude-code/issues/82202)）。规律很明显：许多功能只在一个平台或一种入口上交付，换个环境行为就不一样了。

- **长会话脆弱性** — 上游 529 叠加过大的工具结果（[#82402](https://github.com/anthropics/claude-code/issues/82402)）、流式中断（[#81609](https://github.com/anthropics/claude-code/issues/81609)）或伪造轮次污染对话记录（[#81912](https://github.com/anthropics/claude-code/issues/81912)），都可能让会话永久卡死。运行长时自动化会话的重度用户最容易遇到这些问题，而且没有任何恢复路径。

- **追踪器清洁与真实信号的矛盾** — 被清理的议题中有相当一部分是由 AI agent 提交的，或属于低信号议题（[#82211](https://github.com/anthropics/claude-code/issues/82211)、[#82430](https://github.com/anthropics/claude-code/issues/82430)、[#82420](https://github.com/anthropics/claude-code/issues/82420)、[#82425](https://github.com/anthropics/claude-code/issues/82425)）。2026-09-05 的 stale-bot 清理把噪音和正当的 bug 报告一并关闭，让贡献者无法确定自己的议题是否被看到或修复。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

OpenAI Codex 社区摘要 — 2026-09-06

## 今日亮点

OpenAI 发布了 `rust-v0.153.4`，修复了 Astra 在内置模型选择器中的可见性，并让 Astra 在未显式配置模型时成为内置默认模型。本周期 PR 活动主要被一组自动化 merge train 主导，为原生实时语音管线（WebRTC、Opus RTP、音频设备）打基础；同时也有一些实用的 CLI 改进，例如为 `/status` 输出增加 `/copy`，以及为交互式会话引入托管 worktree。社区方面，最热门的线程仍是 Windows + WSL 下创建项目失败的问题（#41463，29 条评论，19 👍），此外还涌现了一批桌面端侧边栏/会话状态相关的 bug。

## 版本发布

**rust-v0.153.4** — 缺陷修复版本：
- 修复了 Astra 在内置模型选择器中的可见性，并使其在未显式配置模型时成为内置默认模型。(#42874)
- 更新了 Astra 的引导，使其只在会话中存在该工具时才使用异步问题。(#42878)

[完整更新日志](https://github.com/openai/codex/releases)

## 热门 Issue

1. **[#41463 — Windows + WSL: Cannot create projects — AbsolutePathBuf deserialized without base path](https://github.com/openai/codex/issues/41463)**  
   得票最多的活跃 issue（19 👍，29 条评论）。在 WSL2 下，Windows 桌面应用创建项目时会因 `AbsolutePathBuf` 反序列化错误而失败。后续 issue [#42984](https://github.com/openai/codex/issues/42984) 报告，从 Windows 原生模式切换到 WSL 模式后仍然存在同样的根因。

2. **[#38023 — Android Remote cannot start turns in an idle large task](https://github.com/openai/codex/issues/38023)**  
   `turn/start` 的 30 秒超时会让 Android Remote 在大型、长期运行的任务中永久不可用，而任务视图仍然处于未 hydrate 状态。这确实让人质疑移动端超时与任务 hydration 的设计。

3. **[#37884 — New ChatGPT App: scrolling issues on macOS](https://github.com/openai/codex/issues/37884)**  
   统一版 ChatGPT/Codex 应用中长期存在的 UI 回归（11 条评论）；长对话中的滚动行为很不稳定。社区反馈显示，新的视图层需要在滚动状态保真度上再做一轮处理。

4. **[#39933 — Windows IDE extension cannot execute commands: `helper_unknown_error`](https://github.com/openai/codex/issues/39933)**  
   Windows 上 VS Code 扩展报 `helper_unknown_error: setup refresh had errors` 错误。Windows helper 的可靠性一直是 IDE 用户反复遇到的阻塞点。

5. **[#42583 — macOS: Composer disappears after first message](https://github.com/openai/codex/issues/42583)**  
   3 天获得 6 👍。Composer 在第一轮对话后消失，只有重启应用或打开新窗口才会恢复——这是日常 Chat/Codex 使用中一个严重的应用级回归。

6. **[#41661 — Deleted conversations remain stuck in Recents on macOS](https://github.com/openai/codex/issues/41661)**  
   已在服务器端删除的对话仍会作为幽灵条目残留在 `Chat > Recents` 中，并返回 `404 conversation_deleted`。相关报告：[#42768](https://github.com/openai/codex/issues/42768) 显示 Codex 项目侧边栏中也存在同样的幽灵条目行为。

7. **[#41486 — Windows path mangling: `Z:\AREA_01` sent to model as `Z:\AREA\_01`](https://github.com/openai/codex/issues/41486)**  
   UI 中显示的路径是正确的，但客户端序列化时会在下划线前插入多余的反斜杠。对任何 agentic 文件操作来说这都是危险的；3 👍，已有社区复现。

8. **[#39846 — Windows 11: desktop continuously flickers on AMD Ryzen iGPU](https://github.com/openai/codex/issues/39846)**  
   在 Radeon 集成显卡（Ryzen 7 9700X）上持续闪烁。这与早期 macOS 闪烁报告 [#35101](https://github.com/openai/codex/issues/35101) 相互印证，说明 GPU/合成器健壮性问题跨平台存在。

9. **[#37192 — OAuth fallback silently uses hardcoded "dummy" API key after network change](https://github.com/openai/codex/issues/37192)**  
   网络切换后，CLI 不会重新认证，而是静默回退到硬编码的 dummy key，导致出现令人困惑的 401。对基于 OAuth 的 CLI 用户来说，这既是正确性问题，也是信任问题；相关 macOS 报告：[#41975](https://github.com/openai/codex/issues/41975)。

10. **[#43062 — Automatic context compaction hangs 20+ minutes and restarts on GPT-6 Astra Ultra](https://github.com/openai/codex/issues/43062)**  
    Windows 上长时间运行的会话会在 GPT-6 Astra Ultra 上陷入无法停止的上下文压缩循环。随着用户跑数小时长的 agentic 会话，上下文管理边缘问题被越来越多地触发。

## 关键 PR 进展

1. **[#43097 — Add a helper-backed realtime WebRTC session API](https://github.com/openai/codex/pull/43097)**  
   新增 `RealtimeWebrtcSession`，涵盖启动、answer 协商、音频控制、电平表和错误报告。设备只在协商完成后才打开——为 helper 内的语音功能提供了干净的基线。

2. **[#43090 — Send processed microphone audio over RTP in voice-host](https://github.com/openai/codex/pull/43090)**  
   将音频采集连接到出站媒体轨道，支持重采样、保留静音边界以及陈旧音频限制。此前，采集到的音频只被本地消费掉，从未发送给对端。

3. **[#43100 — Add bounded incoming Opus RTP handling to the voice host](https://github.com/openai/codex/pull/43100)**  
   为入站 Opus RTP 增加内存上限（64 包 / 2 MiB）和单包限制，保留到达时间戳且不重复排队——这是实时媒体方面的重要加固。

4. **[#43069 — Support managed worktrees for interactive sessions and forks](https://github.com/openai/codex/pull/43069)**  
   将 `--worktree` 支持从 `codex exec` 扩展到交互式会话，在第一轮对话前先解析目标目录的配置/策略。

5. **[#43055 — Allow `/copy` to copy status output and individual fields](https://github.com/openai/codex/pull/43055)**  
   在 `/status` 之后，copy 选择器现在提供完整状态、模型、完整目录以及各个单独字段的复制选项——不错的 CLI UX 一致性修复。

6. **[#43113 — Save subagent and memory opt-ins through the app server](https://github.com/openai/codex/pull/43113)**  
   将 TUI 中 subagent/memory 启用提示改为通过服务器配置写入来影响新线程，并上报成功/覆盖/失败，而不改变当前线程。

7. **[#43110 — Record reasoning effort changes in conversation history behind a flag](https://github.com/openai/codex/pull/43110)**  
   对于使用 `use_responses_lite` 的 OpenAI 模型，在 effort 尚未建立时会追加一条可信的 `configuration_update`；该行为由默认关闭的 flag 控制，用于改进会话可审计性。

8. **[#43079 — Add opt-in local audio devices to the voice helper](https://github.com/openai/codex/pull/43079)**  
   通过 CPAL 在 macOS、Linux 和 Windows 上新增 `openDevices` / `setAudioControls`，设备初始状态为静音并抑制输出——为私人音频提供安全的默认值。

9. **[#43043 — Avoid filesystem scans when seeding the agents overview](https://github.com/openai/codex/pull/43043)**  
   对 recent-thread 列表请求使用 `use_state_db_only`，避免启动时为未索引的 rollout 做文件系统扫描。对大型 agent 历史来说，这是很好的性能卫生习惯。

10. **[#43074 — Show a retryable error when the apps popup fails to load](https://github.com/openai/codex/pull/43074)**  
    将 `/apps` 初始获取失败时的无限 “Loading apps...” 状态替换为错误信息加重试操作。

支持语音主题的还有以下 Bazel/原生构建 PR：[#43117](https://github.com/openai/codex/pull/43117)、[#43114](https://github.com/openai/codex/pull/43114)、[#43111](https://github.com/openai/codex/pull/43111)、[#43109](https://github.com/openai/codex/pull/43109)、[#43102](https://github.com/openai/codex/pull/43102)、[#43099](https://github.com/openai/codex/pull/43099)。

## 热门讨论

### 想法
- **[#37693 — Keyboard shortcuts to jump between user messages](https://github.com/openai/codex/discussions/37693)** — 3 👍，希望提供可配置的“跳转到上一条/下一条用户消息”命令，将会话中最近的用户消息定位到顶部。
- **[#28073 — Clickable user prompt navigator for current conversation](https://github.com/openai/codex/discussions/28073)** — 在一个线程内提供用户提示的可视化索引；与上面的键盘跳转想法互补。
- **[#42965 — Track source turn/window provenance for persisted world state](https://github.com/openai/codex/discussions/42965)** — 建议记录是哪个 turn/window 产生了持久化状态，以避免跨上下文窗口出现陈旧更新。

### 问答
- **[#37960 — How do you coordinate local and remote coding agents using different model vendors?](https://github.com/openai/codex/discussions/37960)** — 关于如何协调本地客户端 agent（Claude）和远程服务器端 agent（Codex/GPT）的实用讨论。
- **[#30870 — MCP install headers via CLI](https://github.com/openai/codex/discussions/30870)** — 用户希望像 Claude CLI 一样支持 `--header`，而不是手动编辑 `.toml`；这被视为上手时的摩擦点。

### 展示与分享
- **[#16329 — Awesome Codex CLI: curated list of 150+ ecosystem tools](https://github.com/openai/codex/discussions/16329)** — 按类别整理的 subagents、skills、plugins 与 MCP servers 列表；目前最接近 Codex 生态目录的东西。
- **[#42913 — Craft Studio: free Codex sampler](https://github.com/openai/codex/discussions/42913)** — 产品简报、文案修改和前端评审工作流，含可编辑模板。

### 综合
- **[#40707 — 5 hours limit is back](https://github.com/openai/codex/discussions/40707)** — 4 👍；用户更希望只保留按周计算的限额，并觉得额外引入的滚动 5 小时上限会打断高强度使用日。
- **[#42983 — Usage limits feel broken](https://github.com/openai/codex/discussions/42983)** — 有用户反馈低档位 Luna 消耗 5 小时额度的速度几乎与 Astra 高档位一样快，导致限额机制不透明、难以规划。

## 功能请求趋势

- **对话导航与历史记录整洁性。** 幽灵/已删除对话、Recents 内容丢失、侧边栏线程缺失，以及跳转到某条用户消息的导航需求反复出现，说明桌面端会话管理是用户最关心的问题之一。（[#41661](https://github.com/openai/codex/issues/41661)、[#42768](https://github.com/openai/codex/issues/42768)、[#37693](https://github.com/openai/codex/discussions/37693)、[#28073](https://github.com/openai/codex/discussions/28073)）
- **透明的用量限额与模型控制。** 关于 5 小时限制（[#40707](https://github.com/openai/codex/discussions/40707)）、额度快速耗尽（[#42983](https://github.com/openai/codex/discussions/42983)）以及难以按 provider 配置多个模型（[#6241](https://github.com/openai/codex/discussions/6241)）的抱怨，说明用户需要更细粒度、用户可见的用量与模型配置能力。
- **Skills/插件来源与访问控制。** 用户希望在名称冲突时能知道某个 skill 来自哪里（[#39459](https://github.com/openai/codex/issues/39459)），期待官方插件（如 Windows 上的 Computer Use）也能在 Windows 使用（[#41281](https://github.com/openai/codex/issues/41281)），同时还会在项目级 memory/plugins 前遇到访问墙（[#43088](https://github.com/openai/codex/issues/43088)）。
- **Agent/会话隔离语义。** subagent 将进度发布到无关线程（[#42935](https://github.com/openai/codex/issues/42935)），以及内部 OpenClaw 会话显示为顶级聊天（[#42992](https://github.com/openai/codex/discussions/42992)），说明用户希望有更清晰的任务父子关系和可见性边界。

## 开发者痛点

- **Windows/WSL 文件系统问题是最高频的痛点组。** `AbsolutePathBuf` 导致的项目创建失败（[#41463](https://github.com/openai/codex/issues/41463)、[#42984](https://github.com/openai/codex/issues/42984)）、下划线路径错乱（[#41486](https://github.com/openai/codex/issues/41486)）以及 Windows IDE/helper 设置错误（[#39933](https://github.com/openai/codex/issues/39933)），都在阻塞 Windows 上的核心编码工作流。
- **认证可靠性。** 网络切换后静默回退到硬编码的 “dummy” key（[#37192](https://github.com/openai/codex/issues/37192)），以及同一 token 用 curl 正常但某些流程返回 401（[#41975](https://github.com/openai/codex/issues/41975)），都在削弱用户对 OAuth CLI/桌面流程的信任。
- **跨客户端会话状态同步。** 已删除的聊天在 macOS 上仍然残留（[#41661](https://github.com/openai/codex/issues/41661)）、iOS 无法加载 CLI 分页线程（[#38889](https://github.com/openai/codex/issues/38889)）、切换账号后陈旧 turn 复活（[#42971](https://github.com/openai/codex/issues/42971)），说明跨端会话一致性仍然脆弱。
- **长上下文规模下的性能。** 大型空闲任务在移动端超时（[#38023](https://github.com/openai/codex/issues/38023)）、上下文压缩循环卡住 20 多分钟（[#43062](https://github.com/openai/codex/issues/43062)）、启动文件系统扫描拖慢 agents 总览——这些都是上下文/状态管理尚未真正适配重度 agentic 使用的征兆。
- **桌面端 UI 回归。** 反复出现的滚动异常（[#37884](https://github.com/openai/codex/issues/37884)）、Composer 消失（[#42583](https://github.com/openai/codex/issues/42583)）以及 macOS 和 Windows 上的 GPU 闪烁（[#39846](https://github.com/openai/codex/issues/39846)、[#35101](https://github.com/openai/codex/issues/35101)），说明统一后的 ChatGPT/Codex 桌面外壳需要一轮稳定化修复。

---

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区文摘 — 2026-09-06

## 1. 今日要点

最新的 nightly 构建（[v0.60.0-nightly.20260905.g85aca163f](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260905.g85aca163f)）侧重于安全加固：扩展现在必须先征得用户同意才能更改环境；会改变运行时行为的环境变量会被清理；结合符号链接解析的工作区路径边界检查也得到加强。与此同时，两位独立贡献者提交了几乎相同的 P1 修复，以阻止将显式固定的 `gemini-2.5-flash` 模型静默改写为 `gemini-3.5-flash`。智能体可靠性问题仍是公开 issue 追踪器上的主导议题。

## 2. 版本发布

### v0.60.0-nightly.20260905.g85aca163f

- **fix(extensions):** 进行环境更改前先请求用户同意，并清理会改变运行时行为的环境变量（[#28863](https://github.com/google-gemini/gemini-cli/pull/28863)，由 @amelidev 提交）
- **fix(core):** 增强命令安全层中的工作区路径边界检查与符号链接解析

除此之外，本次发布只是一个自动化的 nightly 版本号提升（[#29218](https://github.com/google-gemini/gemini-cli/pull/29218)）。

## 3. 热门议题

过去 24 小时内更新过的高价值议题：

- [**#22323**](https://github.com/google-gemini/gemini-cli/issues/22323) — **子智能体在 MAX_TURNS 后的恢复被报告为 GOAL 成功，掩盖了中断。** 即使子智能体在做任何分析之前就已达轮次上限，它仍会报告 `status: "success"` / `Termination Reason: "GOAL"`。这很危险，因为主智能体无法判断任务实际上从未完成。13 条评论。
- [**#21409**](https://github.com/google-gemini/gemini-cli/issues/21409) — **通用智能体挂起。** 任何交给通用智能体的任务都可能无限期挂起——有用户等了一个小时才取消。让模型不要使用子智能体是唯一可靠的变通办法。8 个 👍 和 8 条评论使其成为目前最严重的 P1 智能体缺陷之一。
- [**#19873**](https://github.com/google-gemini/gemini-cli/issues/19873) — **借助零依赖的 OS 沙箱与执行后意图路由，发挥模型对 bash 的亲和力。** 该提案将让 Gemini 3 模型安全地使用原生 POSIX 工具链，而不是被限制得无法发挥自身长处。9 条评论。
- [**#25166**](https://github.com/google-gemini/gemini-cli/issues/25166) — **Shell 命令执行完成后仍卡在 “Waiting input” 状态。** 对于一些从不等待输入的简单命令也会反复出现。用户必须手动干预；3 个 👍。
- [**#21968**](https://github.com/google-gemini/gemini-cli/issues/21968) — **Gemini 对技能和子智能体的使用不够充分。** 除非被明确指示使用，否则模型会忽略描述详尽的自定义技能（如 `gradle`、`git`）。6 条评论。
- [**#22745**](https://github.com/google-gemini/gemini-cli/issues/22745) — **EPIC：评估基于 AST 的文件读取、搜索与映射。** 这将允许通过一次工具调用实现精确到方法边界的读取，减少 token 噪音和对齐错位的读取。7 条评论。
- [**#22232**](https://github.com/google-gemini/gemini-cli/issues/22232) — **通过自动会话接管与锁恢复增强 browser_agent 的韧性。** 目前对已锁定的持久化浏览器配置文件采用快速失败（fail-fast）策略，使正当的恢复变得毫无可能。4 条评论。
- [**#26525**](https://github.com/google-gemini/gemini-cli/issues/26525) — **增加确定性脱敏机制，并减少 Auto Memory 的日志记录。** Auto Memory 会抢在基于提示词（prompt）的脱敏逻辑运行之前，把对话记录内容发送给模型，并且该服务还可能记录已有技能。涉及安全问题，5 条评论。
- [**#24246**](https://github.com/google-gemini/gemini-cli/issues/24246) — **工具集过大导致 400 错误。** 一旦可用的工具过多，Gemini CLI 就会触及 API 请求限制；用户希望对启用的工具进行更智能的范围管理。3 条评论。
- [**#20079**](https://github.com/google-gemini/gemini-cli/issues/20079) — **符号链接形式的智能体 `.md` 文件无法被识别。** 通过 dotfile 符号链接管理 `~/.gemini/agents/` 的用户会发现，自定义智能体被静默忽略。4 条评论。

## 4. 重要 PR 进展

过去 24 小时内有重要更新的 PR：

- [**#29222**](https://github.com/google-gemini/gemini-cli/pull/29222) / [**#29217**](https://github.com/google-gemini/gemini-cli/pull/29217) — **不要改写显式固定的 `gemini-2.5-flash`。** 两个独立的 P1 修复阻止了 `isFlashModel()` 中宽泛的 `endsWith('flash')` 匹配在启用 GA 的后端上把固定的 2.5 Flash 静默升级为 3.5 Flash——这个回归问题会破坏无法访问 3.5 的环境。
- [**#29200**](https://github.com/google-gemini/gemini-cli/pull/29200) — **在运行时一致地执行 MCP 策略。** 使运行时检查与不区分大小写、去除首尾空白的服务器名匹配保持一致，并将显式设置为空的允许列表视为 fail-closed（默认拒绝）。
- [**#29216**](https://github.com/google-gemini/gemini-cli/pull/29216) — **在沙箱容器内隔离设置目录。** 此前，宿主机的 `~/.gemini` 会被直接挂载到 Docker/Podman 沙箱中，从而可能暴露 OAuth 令牌和凭据。
- [**#29215**](https://github.com/google-gemini/gemini-cli/pull/29215) — **对不受信任的工具输出强制校验信封元数据的来源。** 指示模型在处理 MCP/外部工具结果时，仅将顶层信封属性作为作者身份与操作状态的可信依据。
- [**#29211**](https://github.com/google-gemini/gemini-cli/pull/29211) — **禁止在状态更新器内部调度状态更新。** 修复了 `useInputHistoryStore.addInput()` 中嵌套调用 `setState` 的问题——这种写法违反了 React 对更新器纯度的要求，并导致终端历史记录重渲染异常。
- [**#29116**](https://github.com/google-gemini/gemini-cli/pull/29116) — **缓解 NTFS 8.3 短文件名（SFN）路径问题。** 在路径规范化及 `AllowedPathChecker` 安全引擎中加入对 `git~1`、`env~1`、`node_m~1` 这类 Windows 短名称的处理。
- [**#29114**](https://github.com/google-gemini/gemini-cli/pull/29114) — **防止 spawn 失败时重复执行 `handleExit`。** 在 `child_process` 启动失败后，防范 `error` 与 `close` 事件同时触发——此前这会引发重复的清理操作。
- [**#29110**](https://github.com/google-gemini/gemini-cli/pull/29110) — **让 `read_file` 的内容读取经由 `FileSystemService`。** 使 `read_file` 与 `write_file`/`replace` 保持一致，从而正确支持那些声明了虚拟文件系统的 ACP 客户端。
- [**#29118**](https://github.com/google-gemini/gemini-cli/pull/29118) — **只在解析扩展仓库时去除末尾的 `.git` 后缀。** 避免 `blog.github.io` 这类名称被简单粗暴的 `.git` 去除逻辑错误改写。
- [**#29218**](https://github.com/google-gemini/gemini-cli/pull/29218) — 当前 nightly 的自动化发布版本号提升。

## 5. 功能需求趋势

近期 issue 与 PR 中反复出现的功能需求方向：

- **透明的智能体执行过程：** 通过 `/chat share` 公开子智能体的执行轨迹（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)），在 `/bug` 报告中包含子智能体上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)），并让 CLI 更清楚地感知自身支持的 flags 与热键（[#21432](https://github.com/google-gemini/gemini-cli/issues/21432)）。
- **基于 AST 的代码智能：** 多条路线正在探索基于 AST 的文件读取、搜索与代码库映射，以减少 token 膨胀并改进导航（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#22746](https://github.com/google-gemini/gemini-cli/issues/22746)、[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)）。
- **原生 shell 亲和力 + 强沙箱：** 用户希望模型能自由使用 Unix 工具链，但必须在操作系统级沙箱内进行，并配合执行后的意图路由与更安全的路径处理（[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)）。
- **浏览器智能体的韧性：** 用户期望实现自动会话接管、锁恢复，并正确遵循 `settings.json` 中诸如 `maxTurns` 的覆盖配置（[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)、[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)）。
- **配置的可预测性：** 不静默改写模型、MCP 允许列表语义保持一致，并支持符号链接形式的智能体定义（[#29217](https://github.com/google-gemini/gemini-cli/pull/29217)、[#29222](https://github.com/google-gemini/gemini-cli/pull/29222)、[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)）。

## 6. 开发者痛点

- **智能体挂起或停滞，且缺少有用的诊断信息：** 通用智能体会无限期挂起（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)）；shell 命令执行完成却仍卡在 “Awaiting user input”（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)）；交互式提示（如 Vite 脚手架）也会困住智能体（[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)）。
- **虚假的成功报告削弱信任：** MAX_TURNS 造成的中断被标记为 GOAL 成功（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)），而且面向用户的缺陷报告没有包含子智能体的实际行为（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)）。
- **手动操控模型仍然太常见：** 用户必须显式禁止或强制指定子智能体/技能的使用，因为模型并不能可靠地自行选择合适的工具（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)、[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)）。
- **浏览器智能体仍然脆弱：** Wayland 下运行失败、持久化配置文件被锁定以及 `settings.json` 覆盖配置被忽略等问题仍频繁出现（[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)、[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)、[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)）。
- **安全边界问题不断浮现：** Auto Memory 可能在脱敏前把机密信息转发到模型上下文中（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)）；沙箱容器此前会挂载宿主机凭据（[#29216](https://github.com/google-gemini/gemini-cli/pull/29216)）。
- **路径与命名的边界情况会造成静默故障：** Windows 上 NTFS 短名称会绕过安全路径（[#29116](https://github.com/google-gemini/gemini-cli/pull/29116)）；符号链接形式的智能体定义会被忽略（[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)）；名称内部包含 `.git` 的仓库会被错误解析（[#29118](https://github.com/google-gemini/gemini-cli/pull/29118)）。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-06

## 今日亮点

项目发布了 **v1.0.84-1**，新增了对 **GPT-6 Astra** 的支持。社区关注重心仍然放在可靠性上：目前获赞最多的开放功能请求（#1857，28 👍）希望允许用户取消已排队的消息。与此同时，一批处于 triage 状态的 bug 集中在 **MCP 工具链**、**自动更新回归** 和 **模型行为** 上——尤其是用户被静默切换到 GPT-5 mini，并在任务中途停止的问题。

## 版本发布

- **[v1.0.84-1](https://github.com/github/copilot-cli/releases)**  
  **新增：** 支持 GPT-6 Astra。

## 热门 Issue

1. **[#1857 — 允许用户在执行前取消或移除已排队的消息](https://github.com/github/copilot-cli/issues/1857)** · `area:input-keyboard`  
   该 issue 已开放数月，却依然是社区的头号诉求（28 👍，11 条评论）。一旦消息通过 `Ctrl+Q`/`Ctrl+Enter` 进入队列，在 agent 繁忙或执行 `/compact` 期间将无法取消。用户希望为长串排队命令提供一个逃生舱。

2. **[#4734 — 升级到 desktop 2.98.0 / runtime 1.1.15 后，所有项目会话都出现 “Worktree missing”](https://github.com/github/copilot-cli/issues/4734)** · `triage`  
   这是一个影响范围很广的回归：自动更新后，所有既有*和新建*的基于 worktree 的会话都被破坏。目前还没有评论，但已属于影响级别最高的一类——更新破坏了核心会话功能。

3. **[#4732 — Copilot 突然把我切换到 GPT-5 mini，而它会在任务中途直接停下](https://github.com/github/copilot-cli/issues/4732)** · `triage`  
   有用户报告模型被意外切换到了 GPT-5 mini；该模型生成了补丁，随后又把补丁清空，像任务完成一样停了下来。考虑到 GPT-6 Astra 刚刚发布，这个问题尤其应景。它反映出用户需要更清晰的模型覆盖可见性和回退行为。

4. **[#4728 — 自动更新会覆盖正在运行的 copilot.exe，导致 GitHub Copilot 桌面应用被破坏](https://github.com/github/copilot-cli/issues/4728)** · `area:sessions, area:installation`  
   在终端中运行 `copilot` 时，自动更新会在静默中替换启动它的可执行文件，之后桌面应用便无法重连任何已有会话。这是一个在实际使用中暴露出的打包/更新设计缺陷。

5. **[#4731 — MCP tools/list 刷新超时，服务器工具被永久移除](https://github.com/github/copilot-cli/issues/4731)** · `area:mcp, area:tools`  
   当对某个 stdio MCP 服务器的工具调用触发超时后，运行时会立即向同一台已阻塞的服务器派发 `tools/list` 刷新请求。这次刷新同样超时，于是该服务器的工具会在进程的整个生命周期内全部丢失。

6. **[#4725 — Linux 上频繁出现 JavaScript 堆内存耗尽](https://github.com/github/copilot-cli/issues/4725)** · `area:platform-linux`  
   CLI 每隔几分钟就会崩溃，约 4 GB 堆内存在 Mark-Compact 阶段被耗尽。这暴露了 Linux 上长时间运行会话的严重稳定性问题。

7. **[#4328 — WT_SESSION 泄漏导致 WSL2 下 Ctrl+H 被误识别为 Ctrl+Backspace](https://github.com/github/copilot-cli/issues/4328)** · `area:input-keyboard, area:platform-windows`  
   在 WSL2 下，`Ctrl+H` 会删除整个单词而不是单个字符。经诊断，是 Windows Terminal 泄漏的 `WT_SESSION` 干扰了按键检测。该问题已存在数月，累计 7 条评论，对 WSL2 用户来说是个长期困扰。

8. **[#4721 — JSON-RPC 序列化 bug 导致 Canvas open_canvas 参数损坏](https://github.com/github/copilot-cli/issues/4721)** · `area:mcp, area:tools`  
   工具参数会被拼接上一个尾随的 `}{}` 后缀，导致值在 JSON 中途被截断。分发到 canvas 扩展时，畸形载荷会让调用失败并报错 “Unexpected end of JSON input.”

9. **[#4729 — 内置 research agent 让子 agent 调用不可用的 github/get_me 工具](https://github.com/github/copilot-cli/issues/4729)** · `area:agents, area:mcp`  
   `research` 子 agent 的提示词要求调用 `github/get_me`，但 MCP 服务器并未暴露该工具。子 agent 明显在跟这种错位较劲，白白浪费 token 和时间，还产生大量推理噪音。

10. **[#4652 — 最新 Windows 25H2 build 不支持沙箱](https://github.com/github/copilot-cli/issues/4652)** · `triage`  
    `copilot --experimental --sandbox` 会警告：最新的 Windows 版本不支持沙箱，这意味着 shell 命令和沙箱化服务都会失败。这是 Windows 版本发布与 CLI 能力检查之间存在平台滞后的又一例证。

## 主要 PR 进展

过去 24 小时内，没有创建或更新的 PR。

## 功能请求趋势

- **队列与输入控制。** 最清晰的信号依然是 #1857（28 👍）：让用户能够取消或移除排队消息，而不是让它们按顺序依次执行。键盘/输入正确性也是持续的热点（#4328、#4722）。

- **上下文生命周期管理。** #4724 提议在空闲时自动压缩上下文，并使其与模型约 5 分钟的 prompt-cache TTL 对齐，从而避免在空闲间隔后重新读取完整上下文，同时降低延迟和成本。

- **模型可见性与控制。** 用户想知道当前是*哪个*模型在为自己服务，以及它为什么会变化——#4732 展示了一次意外静默切换到 GPT-5 mini、并导致错误“完成”结果的案例；而企业用户则报告模型因策略被禁用，且没有任何界面可以重新启用（#4272）。

## 开发者痛点

- **升级与自动更新回归。** 不断有报告称更新破坏了现有功能：所有会话都报 “Worktree missing”（#4734）、可执行文件自我替换导致桌面应用崩溃（#4728）、Windows 25H2 沙箱不兼容（#4652）。

- **MCP/工具集成的脆弱性。** 这一组工具链 bug——刷新超时后工具被永久移除（#4731）、JSON-RPC 参数损坏（#4721）、agent 被要求调用不存在的工具（#4729）——削弱了人们对插件生态的信任。

- **模型行为与确定性。** 任务中途停止、模型被静默降级、输出被截断（#4732、#4733）等问题正在侵蚀信心，尤其对 BYOK 或使用高 token 上限 provider 的用户而言。

- **Linux 上的稳定性。** 每隔几分钟就发生的 JavaScript 堆内存耗尽崩溃（#4725）让 CLI 在某些长期运行的环境中几乎不可用。

- **输入正确性。** 键盘处理 bug 仍在不断复现：WSL2 下 `Ctrl+H` 会表现出 `Ctrl+Backspace` 的行为（#4328）；Markdown 会剥离 `_test` 这类词开头的下划线（#4722）。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-06

## 1. 今日焦点

v1.18.29 已发布。修复范围不大但很关键：Codex OAuth 模型过滤现在能识别像 `gpt-6` 这样的整数版 GPT，恢复了 OpenAI 订阅用户对 `gpt-6-astra` 的可见性。在 issue tracker 上，社区关注点仍集中在三条战线——庞大的内存主题帖（#20695，目前 140 条评论）、忽略 `limit.output` 的静默输出 token 上限（#29363），以及一波 2.0/OpenCode Go 的可靠性和计费投诉（服务重启循环、缺少 `max_tokens`、配额计算错误）。8 月 5 日的一大批社区 PR 也已转入 closed 状态，带出了约 40 个排队中的修复，覆盖 TUI skill、shell 中止、Unicode 快照路径和 ACP 子代理可见性。

## 2. 版本发布

**v1.18.29**（最新）
- 修复：Codex OAuth 模型过滤现在能识别 `gpt-6` 这样的整数版 GPT
- 修复：解决 OpenAI 订阅用户看不到 `gpt-6-astra` 的问题
- 文档：修复来自社区贡献者 @Peter267 的中文翻译粗体渲染问题

## 3. 热门 Issue

1. **[#20695 – Memory Megathread](https://github.com/anomalyco/opencode/issues/20695)** — 140 条评论，108 👍。这个帖子运行时间最长，专门收集内存/泄漏报告。维护者明确恳求：*“请不要让 LLM 跑一遍后直接提出解决方案”*——他们希望大家通过手动快照流程提供堆快照，以便正确诊断。

2. **[#29363 – `limit.output` silently capped at 32k](https://github.com/anomalyco/opencode/issues/29363)** — 19 条评论，17 👍。DeepSeek 的 `384000`、GPT/Claude 的 `128000` 等配置值，每一步都会被静默截断；目前唯一有文档记载的绕行方式是 `OPENCODE_EXPERIMENTAL_OUTPUT_TOKEN_MAX`。用户不满的是：一个被直接忽略的配置值，居然要靠一个无文档、实验性的 workaround 来绕过。

3. **[#19466 – opencode burns CPU while "doing nothing"](https://github.com/anomalyco/opencode/issues/19466)** — 17 条评论，16 👍。在等待 API 配额耗尽恢复（“retrying in 18m 12s”）时，opencode 在 i9-14900 上仍消耗约 50% 的单核 CPU。这个 bug 被广泛点赞，被认为是最基本的资源管理问题。

4. **[#35486 – Internal Server Error with DeepSeek v4 Flash](https://github.com/anomalyco/opencode/issues/35486)** — 14 条评论。即使在 OpenCode Go/Desktop 中开启全新会话并清除缓存后也能复现。这是本周多个针对 DeepSeek v4 的可靠性投诉之一。

5. **[#27963 – Corrupted executable on Windows (v1.15.3)](https://github.com/anomalyco/opencode/issues/27963)** — 11 条评论。随发布提供的 `opencode-ai` 二进制在 Windows 10/11 上无法运行，提示 “The specified executable is not a valid application for this OS platform.”。这个发布管道信任问题至今仍受关注。

6. **[#47168 – Unimplemented `commentary` channel in gpt.txt](https://github.com/anomalyco/opencode/issues/47168)** — 4 条评论。GPT 系统提示词要求模型在 `commentary` 通道上发布进度更新，但 opencode 从未实现该通道；在 chat-completions provider 上，每次更新都会让回合在任务中途结束。这是一个微妙但确实影响用户体验的协议 bug。

7. **[#37239 – [2.0] service restart silent retry loop](https://github.com/anomalyco/opencode/issues/37239)** — 6 条评论。`opencode2 service restart` 会间歇性地在 2.5 分钟内启动约 16 次 `serve --service`，每次静默退出，直到其中一次成功——用户只能手动 kill 进程。

8. **[#47398 – [2.0] `max_tokens` never sent on openai-compatible models](https://github.com/anomalyco/opencode/issues/47398)** — v2 CLI 完全不会发送 `max_tokens`，等于忽略 `limit.output`；thinking 轮次随后会在 provider 默认上限处被截断。注意稳定版 v1.18.20 在相同配置下会发送 `max_tokens: 32000`——这是明确的 v2 回归。

9. **[#47501 – Single-line file mention expands to wrong line range](https://github.com/anomalyco/opencode/issues/47501)** — 已关闭，但技术分析很有价值：`@file#42` 生成的是基于 1 的文件 URL，而 LSP document symbols 使用基于 0 的 range，因此单行引用会展开到错误的包含函数/类。

10. **[#47491 / #47492 – OpenCode Go quota sums percentages, not dollars](https://github.com/anomalyco/opencode/issues/47491)** — 配额限制本来以美元额度定义（5 小时 $12、每周 $30、每月 $60），实际却似乎是靠把百分比值相加来计算，导致付费订阅用户过早被拒绝服务。#47492 是同一报告的滥用性重复提交；底层计费 bug 相当严重。相关：[#44851](https://github.com/anomalyco/opencode/issues/44851) 报告一次 $10 续费成功后订阅仍未激活。

## 4. 关键 PR 进展

1. **[#47441 – fix(app): load worktree inventory on demand](https://github.com/anomalyco/opencode/pull/47441)** — 针对 Desktop 一直卡在服务红点状态的新修复：此前会在数秒内创建数百个本地 API job，导致健康预检和问答 POST 请求阻塞在一个停滞的 socket 池上。现在会按需加载 worktree inventory，并限制并发 server 请求。

2. **[#40674 – feat(tui): skill UX improvements](https://github.com/anomalyco/opencode/pull/40674)** — 关闭 #31220。新增 skill 多选、紧凑显示和斜杠命令去重，让 SKILL.md 正文不再污染 TUI 会话记录。

3. **[#40669 – fix(shell): stop aborted commands after output](https://github.com/anomalyco/opencode/pull/40669)** — 关闭 #39565。收紧中止路径：在输出流式传输时触发 abort，现在会真正立即终止子进程。

4. **[#40706 – fix(ai): normalize loose provider usage](https://github.com/anomalyco/opencode/pull/40706)** — 修复 #40690。在协议边界接受可空的 provider usage 字段，支持跨 chunk、无索引的 OpenAI 兼容 tool-call delta，保留 Gemini 的 modality 细节，并容忍可空的 Anthropic 字段。

5. **[#40654 – fix(acp): surface subagent activity](https://github.com/anomalyco/opencode/pull/40654)** — 将前台子代理的消息和工具调用投射到根 ACP 会话，为子工具调用加命名空间，包含 lineage 元数据，并将子代理的权限请求通过根会话路由。

6. **[#40648 – fix(snapshot): preserve unicode paths on revert](https://github.com/anomalyco/opencode/pull/40648)** — 关闭 #19357。修复 snapshot revert 的 Unicode 路径分支：在决定执行 copy 还是 delete 前，先检查路径是否存在于目标 snapshot 中。

7. **[#40601 – feat(core): implement V2 manual compaction](https://github.com/anomalyco/opencode/pull/40601)** — 按 `specs/v2/session.md` 中的定义，在自动 request-budget compaction 之上实现了显式手动压缩。

8. **[#40578 – feat(session): add /handoff command](https://github.com/anomalyco/opencode/pull/40578)** — 关闭 #26757。允许以压缩后的上下文交接会话。作者指出，两个相关问题（#21760、#26707）之前是被 stale-issue bot 关闭的，而不是因为议题本身已解决。

9. **[#40582 – feat(desktop): inline conversation visualizations](https://github.com/anomalyco/opencode/pull/40582)** — 关闭 #40583。允许模型通过 `visualize` 通道输出带版本号的内容片段，并在 Desktop 会话中渲染为内联 HTML 可视化。

10. **[#40590 – feat: support GITHUB_TOKEN auth in install script](https://github.com/anomalyco/opencode/pull/40590)** — 关闭 #40589。安装脚本会发起三次匿名 GitHub 请求（版本检测、release 检查、资源下载）；此 PR 增加 `GITHUB_TOKEN` 支持，以缓解 rate limit 限制。

另外，这批批量处理的 PR 中值得注意的还有：[#40727](https://github.com/anomalyco/opencode/pull/40727) 纯文本粘贴（`Ctrl+Alt+V`）、[#40668](https://github.com/anomalyco/opencode/pull/40668) 为 shell `create` hooks 增加 sessionID 归因、[#40708](https://github.com/anomalyco/opencode/pull/40708) 在 workspace 范围内复用 Stripe customer、[#40606](https://github.com/anomalyco/opencode/pull/40606) 使 git worktree 错误分类不依赖 locale，以及 [#40599](https://github.com/anomalyco/opencode/pull/40599) 防止同一仓库的多个 clone 被误当作 sandbox。

## 5. 热门讨论

本期未提供讨论数据。

## 6. 功能需求趋势

- **更丰富的 Desktop/Web 体验**：可点击、可在编辑器/Finder 中打开的文件路径标签（[#37891](https://github.com/anomalyco/opencode/issues/37891)）；便携版（非 NSIS）Windows 构建（[#37893](https://github.com/anomalyco/opencode/issues/37893)）；通过 Web Notifications API 发出系统级通知（[#47479](https://github.com/anomalyco/opencode/issues/47479)）；TUI 支持图片粘贴/拖放（[#44310](https://github.com/anomalyco/opencode/issues/44310)）。
- **2.0 平台成熟度**：按客户端兴趣限定事件订阅范围（[#36443](https://github.com/anomalyco/opencode/issues/36443)）、手动压缩（[#40601](https://github.com/anomalyco/opencode/pull/40601)）、`/handoff` 会话命令（[#40578](https://github.com/anomalyco/opencode/pull/40578)）、交互式内联可视化（[#40582](https://github.com/anomalyco/opencode/pull/40582)）。
- **社区与生态**：瑞典语社区翻译（[#40717](https://github.com/anomalyco/opencode/pull/40717)）；opencode-tabs、OutageDeck MCP 等第三方插件/文档补充（[#40714](https://github.com/anomalyco/opencode/pull/40714)、[#40630](https://github.com/anomalyco/opencode/pull/40630)）；安装脚本认证支持（[#40590](https://github.com/anomalyco/opencode/pull/40590)）。
- **突破各种硬性限制**：移除 32k 静默输出上限（[#29363](https://github.com/anomalyco/opencode/issues/29363)）；在 v2 中正确发送 `max_tokens`（[#47398](https://github.com/anomalyco/opencode/issues/47398)）；将内置 Bun 从 1.3.14 升级到 1.4.x（[#44945](https://github.com/anomalyco/opencode/issues/44945)）。

## 7. 开发者痛点

- **配置被静默忽略**：32k 的 `limit.output` 上限（[#29363](https://github.com/anomalyco/opencode/issues/29363)）；v2 中缺失 `max_tokens`（[#47398](https://github.com/anomalyco/opencode/issues/47398)）；模型名映射错误（`deepseek-v4-pro` → `deepseek/deepseek-v4-pro`，[#47508](https://github.com/anomalyco/opencode/issues/47508)）；以及 xAI Grok 等 provider 拒绝 `metadata` 这类被注入的字段（[#47496](https://github.com/anomalyco/opencode/issues/47496)）。
- **OpenCode Go 计费与配额信任问题**：配额按百分比而非美元金额计算（[#47491](https://github.com/anomalyco/opencode/issues/47491)）；续费成功后订阅丢失（[#44851](https://github.com/anomalyco/opencode/issues/44851)）；响应缓慢的模型消耗用量却没有任何进展（[#47520](https://github.com/anomalyco/opencode/issues/47520)）。
- **稳定性回归**：Windows 可执行文件损坏（[#27963](https://github.com/anomalyco/opencode/issues/27963)）；DeepSeek v4 Flash 出现 Internal Server Error（[#35486](https://github.com/anomalyco/opencode/issues/35486)）；Go 端 SSE 流传输错误（[#47500](https://github.com/anomalyco/opencode/issues/47500)）；v2 service restart 重启循环（[#37239](https://github.com/anomalyco/opencode/issues/37239)）。
- **资源浪费**：退避等待空闲时仍占用约 50% CPU（[#19466](https://github.com/anomalyco/opencode/issues/19466)）；无限制加载 worktree inventory 导致 Desktop 冻结（[#47441](https://github.com/anomalyco/opencode/pull/47441)）；仍未关闭的内存汇总帖（[#20695](https://github.com/anomalyco/opencode/issues/20695)）。
- **Desktop/安装摩擦**：首次运行创建 `~/.config/opencode` 时出现 `EACCES`（[#47540](https://github.com/anomalyco/opencode/issues/47540)）；文件路径无法点击（[#37891](https://github.com/anomalyco/opencode/issues/37891)）；在 Pop!_OS 上 “Open in File Manager” 一直卡在转圈状态（[#46981](https://github.com/anomalyco/opencode/issues/46981)）；重命名本地 “global” 项目时静默失败（[#47494](https://github.com/anomalyco/opencode/issues/47494)）。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-06

## 今日亮点

v0.85.1 已发布，通过 OpenAI API 密钥和 OpenAI Codex 订阅支持 **GPT-6 Astra**。与此同时，社区围绕可靠性达成共识：导致全新安装失败的 0.85.0 打包回归问题获得了双重紧急修复（[#9170](https://github.com/earendil-works/pi/pull/9170)、[#9172](https://github.com/earendil-works/pi/pull/9172)），而一个长期请求的 UX 功能——在句子中间调用技能——已从 issue 推进到可用的 PR（[#9214](https://github.com/earendil-works/pi/pull/9214)）。Windows 支持仍然是社区最活跃的话题，维护者发起的用法反馈征集已收到 52 条评论。

## 版本发布

**v0.85.1** — 通过 OpenAI API 密钥和 OpenAI Codex 订阅新增 **GPT-6 Astra** 访问支持。API 密钥和 Codex 配置详情请参阅 provider 文档。

## 热门 Issue

- [#7547 — [Windows] 你如何在 Windows 上使用 Pi？你遇到了哪些问题？](https://github.com/earendil-works/pi/issues/7547)（52 条评论）— 维护者正在收集 Windows 使用场景——TUI 缺陷、文档缺口、或应委托给扩展的配置——以确定工作优先级。
- [#9132 — 0.85.0：发布的 dist/cli.js 静态导入了未声明的 @earendil-works/pi-server](https://github.com/earendil-works/pi/issues/9132)（5👍）— 导致全新 npm 安装失败的发布级打包缺陷；已由今日的 PR [#9170](https://github.com/earendil-works/pi/pull/9170)/[#9172](https://github.com/earendil-works/pi/pull/9172) 修复。
- [#5023 — 终端无故滚动到开头](https://github.com/earendil-works/pi/issues/5023)（19 条评论，已关闭）— 模型生成输出时 TUI 会随机跳转到会话开头并快速滚动到底部。
- [#8896 — /export HTML 静默丢弃发送给模型的上下文（display:false 消息）](https://github.com/earendil-works/pi/issues/8896) — `display:false` 被文档化为仅 TUI 的切换选项，但它同时过滤了导出的对话记录，丢失了模型实际看到的上下文。
- [#6300 — Windows：每次按键时输入行被重绘](https://github.com/earendil-works/pi/issues/6300) — 在 cmd.exe 和 Windows Terminal 中每个字符都出现在新的一行；这是多个 Windows TUI 阻塞问题之一。
- [#8684 — PI_OFFLINE 静默禁用所有 provider 模型发现](https://github.com/earendil-works/pi/issues/8684) — PI_OFFLINE 的文档化范围仅限启动时的内务处理，但它同时禁用了整个会话的远程模型目录发现。
- [#9209 — Copilot GPT-6 Astra 被路由到不支持的 /chat/completions 端点](https://github.com/earendil-works/pi/issues/9209) — Copilot 拒绝通过 Chat Completions 使用 Astra；Pi 需要将其路由到兼容 Responses 的路径。
- [#9212 — 通过网关调用 Sonnet-5：13% 的编辑工具调用被截断为 `edits:[{}]`](https://github.com/earendil-works/pi/issues/9212) — 关于工具参数截断导致 schema 校验失败的统计报告；这是一个网关保真度的警示信号。
- [#8457 — 像提示词模板一样在句子中间调用技能](https://github.com/earendil-works/pi/issues/8457)（4👍，已关闭）— 技能只能在输入开头展开；现在已由 PR [#9214](https://github.com/earendil-works/pi/pull/9214) 解决。
- [#8791 — 向扩展暴露模型运行时](https://github.com/earendil-works/pi/issues/8791)（4👍，已关闭）— 构建进程内隔离 agent 会话的扩展作者需要在 `ExtensionContext` 上暴露 `ModelRuntime`。

## 关键 PR 进展

- [#9170 + #9172 — 声明 pi-server 运行时依赖并保护包发布流程](https://github.com/earendil-works/pi/pull/9170) — 修复了 0.85.0 安装失败回归，并添加 CI 保护，确保已发布包根目录中不再出现未声明的静态导入。
- [#9214 — 在句子中间调用技能和提示词模板](https://github.com/earendil-works/pi/pull/9214) — 允许在输入行的任意位置展开 `/skill:name` 和 `/template`，而非仅限于行首；关闭 #8457。
- [#9117 — 以系统消息增量的方式传递提示词和工具变更](https://github.com/earendil-works/pi/pull/9117)（基于 #9116 堆叠）— 不再在工具集变更时重写顶层系统提示词，而是发送增量，减少长会话中的 token 消耗。
- [#9116 — 添加会话中途系统消息](https://github.com/earendil-works/pi/pull/9116) — pi-ai 层面的基础能力，支持在会话中途注入系统消息（扩展状态变更、权限更新等）。
- [#9096 — 添加 Meta provider 及 Muse 订阅 OAuth](https://github.com/earendil-works/pi/pull/9096) — 新增 Meta 作为子 provider；记录了其独特的每日 token 重新铸造机制以及目前突发式的流式输出。
- [#7610 — 添加 LLM Gateway 和 LLM Gateway DevPass providers](https://github.com/earendil-works/pi/pull/7610) — 以 LLM Gateway 团队名义贡献，新增内置的 OpenRouter 风格路由器作为 `openai-completions` providers。
- [#9163 — 简化剪贴板处理](https://github.com/earendil-works/pi/pull/9163) — 用更轻量的原生胶水代码替换了重量级 Rust 剪贴板依赖；最初由 NixOS/Nix 构建触发。
- [#9182 — 跳过已失效扩展运行器上的会话事件](https://github.com/earendil-works/pi/pull/9182) — 修复了在 `/new` 或 Ctrl+C 期间第二次 teardown 可能因共享扩展运行时失效而挂起的竞态问题。
- [#9179 — 在压缩期间拒绝树导航](https://github.com/earendil-works/pi/pull/9179) — 防止压缩进行中时进行会话树导航，并确保摘要与生成摘要的分支保持绑定；附带回归测试。
- [#7970 — 全屏转录向上滚动时显示提示](https://github.com/earendil-works/pi/pull/7970) — 当转录内容未跟随实时末尾时，在状态行中添加 `↓` 指示器；滚动到底部时清除。

## 热门讨论

**想法**
- [#9207 — 建议：从系统消息中移除"可用工具"部分](https://github.com/earendil-works/pi/discussions/9207) — 提议工具 schema 已足够，文本形式的工具列表只会增加噪音和 token 消耗；2👍。
- [#9177 — 将 CommandCode Plan 集成到登录流程](https://github.com/earendil-works/pi/discussions/9177) — 请求在认证层支持 CommandCode Plan。

**展示与分享**
- [#9213 — 在 README 中嵌入 Agent-Friendly Score 徽章](https://github.com/earendil-works/pi/discussions/9213) — pi 在 agent 友好度上得分 86.2/100；提交内容包含可直接添加的徽章。

## 功能请求趋势

- **Windows 作为一等平台**：明确的 Windows 调查（[#7547](https://github.com/earendil-works/pi/issues/7547)），加上针对输入重绘（[#6300](https://github.com/earendil-works/pi/issues/6300)）、全屏图像渲染（[#9169](https://github.com/earendil-works/pi/issues/9169)）和 IME 行为（[#5200](https://github.com/earendil-works/pi/issues/5200)）的修复，表明填补 Windows TUI 缺口存在切实压力。
- **Provider 与路由广度**：原生 Meta/Muse（[#9096](https://github.com/earendil-works/pi/pull/9096)）、LLM Gateway（[#7610](https://github.com/earendil-works/pi/pull/7610)）、Requesty（[#5473](https://github.com/earendil-works/pi/issues/5473)）、修复 Astra 的 Responses 路由（[#9209](https://github.com/earendil-works/pi/issues/9209)）以及 OpenAI 异步工具调用（[#9113](https://github.com/earendil-works/pi/issues/9113)）。
- **提示词与上下文效率**：系统消息增量（[#9116](https://github.com/earendil-works/pi/pull/9116)/[#9117](https://github.com/earendil-works/pi/pull/9117)）、Responses providers 的顶层 `instructions`（[#8734](https://github.com/earendil-works/pi/pull/8734)）、移除冗余工具描述（[#9207](https://github.com/earendil-works/pi/discussions/9207)）以及句中技能/模板展开（[#8457](https://github.com/earendil-works/pi/issues/8457)）。
- **会话生命周期可靠性**：压缩重入保护（[#9179](https://github.com/earendil-works/pi/pull/9179)）、`session_compact` 后的重试（[#9051](https://github.com/earendil-works/pi/issues/9051)）、扩展运行器清理（[#9182](https://github.com/earendil-works/pi/pull/9182)）以及有状态的 Responses 续接（[#7317](https://github.com/earendil-works/pi/issues/7317)）。
- **打包与分发**：Nix flake（[#9137](https://github.com/earendil-works/pi/pull/9137)）、更简单的跨平台剪贴板构建（[#9163](https://github.com/earendil-works/pi/pull/9163)）以及包根目录发布保护（[#9172](https://github.com/earendil-works/pi/pull/9172)）。

## 开发者痛点

- **全新安装即损坏**：0.85.0 发布时携带了未声明的 `@earendil-works/pi-server` 静态导入，迫使社区从开箱即坏的包根目录开始调试（[#9132](https://github.com/earendil-works/pi/issues/9132)）。
- **Windows TUI 缺陷**：cmd/Windows Terminal 中的按键重绘问题、WezTerm 中全屏图像损坏以及 IME 候选窗口卡死，均位列热门 issue 之中，但尚无核心修复（[#6300](https://github.com/earendil-works/pi/issues/6300)、[#9169](https://github.com/earendil-works/pi/issues/9169)、[#5200](https://github.com/earendil-works/pi/issues/5200)）。
- **Provider 流保真度**：来自网关 Sonnet 的截断编辑调用（[#9212](https://github.com/earendil-works/pi/issues/9212)）、Codex SSE 解析器导致的堆内存溢出（[#9036](https://github.com/earendil-works/pi/issues/9036)）以及自 0.84.x 以来 Ollama 的 `terminated`/"length" 回归（[#9216](https://github.com/earendil-works/pi/issues/9216)）。
- **静默丢失或范围过大的配置**：`bash` 工具静默忽略 `cwd`（[#5904](https://github.com/earendil-works/pi/issues/5904)）、`PI_OFFLINE` 禁用范围超出文档说明（[#8684](https://github.com/earendil-works/pi/issues/8684)）以及 `/export` 遗漏 `display:false` 上下文（[#8896](https://github.com/earendil-works/pi/issues/8896)）。
- **会话生命周期中的竞态与挂起**：扩展对话框相互竞争或与会话 teardown 竞争导致 TUI 卡在"Working…"（[#6978](https://github.com/earendil-works/pi/issues/6978)、[#9203](https://github.com/earendil-works/pi/issues/9203)）、压缩期间进行树导航可能导致上下文丢失（[#9179](https://github.com/earendil-works/pi/pull/9179)）以及 `session_compact` 溢出重试跳过排队消息（[#9051](https://github.com/earendil-works/pi/issues/9051)）。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-06

## 今日亮点

两个面向 Web Shell 的新版本发布，重点引入了动态工作流运行的可视化管理，以及一项投影性能优化。与此同时，社区与维护者的注意力主要集中在**导出体积回退**和**daemon/Web Shell 模式下的后台与会话可靠性**上，其中至少一个 P1 问题已促使专门的修复 PR 落地。CI 稳定性也依旧是反复出现的主题，尤其是发布流水线重复作业和脆弱的测试基础设施。

## 版本发布

- [v0.23.1-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.0)
- [v0.23.0-nightly.20260905.e3d26283e6](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260905.e3d26283e6)

两个版本均包含：

- **feat(web-shell)**：可视化并管理动态工作流运行 — [#10594](https://github.com/QwenLM/qwen-code/pull/10594)
- **perf(web-shell)**：更高效地推导会话工作流项目

## 热点问题

1. [**#11091**](https://github.com/QwenLM/qwen-code/issues/11091) — `mermaid`（约 6 MB）仍被打平到导出的转录渲染器中。  
   即使 #9812 已完成外部渲染器相关工作，这仍直接影响导出的 HTML 体积和加载行为。该问题已有 6 条评论，并被标记为 `need-discussion`，说明尚未完全定论。

2. [**#11031**](https://github.com/QwenLM/qwen-code/issues/11031) — `/export html` 仍会嵌入整个 Web Shell 运行时，即使空会话也会生成约 19.5 MB 的文件。  
   属于 P1 问题，是依赖便携式 HTML 导出的用户面临的主要障碍。

3. [**#11119**](https://github.com/QwenLM/qwen-code/issues/11119) — 当会话运行时回收时，后台 shell 输出和唤醒通知会被静默丢弃，导致会话卡死。  
   属于 P1 daemon/会话管理缺陷。这对 CI 轮询循环和无人值守的后台任务尤其危险。

4. [**#11118**](https://github.com/QwenLM/qwen-code/issues/11118) — 执行 cron、goal、monitor 或 history-mutation 任务的会话永远无法被 `qwen serve` 回收。  
   子进程对“busy”的两种不兼容理解，导致合法的后台工作负载无法完成空闲回收。

5. [**#11109**](https://github.com/QwenLM/qwen-code/issues/11109) — `release.yml` 重复执行同一运行已完成的工作，且一个 20 分钟的步骤实际上什么也没验证。  
   今天有两次发布运行超时。这解释了许多近期发布流水线延迟的原因。

6. [**#10892**](https://github.com/QwenLM/qwen-code/issues/10892) — `vi.waitFor` 使用硬编码的 1 秒截止时间，且 2047 个调用点依赖此行为。  
   面向开发者机器的默认值，会在慢速或高负载 runner 上导致可避免的 CI 不稳定。

7. [**#10904**](https://github.com/QwenLM/qwen-code/issues/10904) — Cron 交互式 E2E 测试间歇性超时，且 `continue-on-error: true` 掩盖了失败。  
   测试套件可能在未导致整体任务失败的情况下变红，使回归问题容易被遗漏。

8. [**#8227**](https://github.com/QwenLM/qwen-code/issues/8227) — Windows 下经过验证的 `@`-file 读取丢失了 `O_NOFOLLOW`，且 dev/ino 身份检查可能无效。  
   这是 #7206 的安全后续问题。对跨平台对等性和 TOCTOU 防护非常重要。

9. [**#11096**](https://github.com/QwenLM/qwen-code/issues/11096) — 从 `main` 构建的导出指向返回 404 的 unpkg URL。  
   `0.23.0` 在 #9812 合并前发布，因此外部渲染器文件未包含在已发布的 tarball 中。这破坏了 `main`/latest 用户的导出功能。

10. [**#5823**](https://github.com/QwenLM/qwen-code/issues/5823) — `/loop` cron 任务静默触发，无任何可见性；模型无法列出或停止自己的计划任务。  
    虽然已作为 issue 关闭，但这仍然是后台自动化方面的重要缺口，已有 6 条评论且社区关注度明显。

## 关键 PR 进展

1. [**#11133**](https://github.com/QwenLM/qwen-code/pull/11133) — **fix(core)**：延迟后台任务通知，而不是静默丢弃。  
   直接回应 #11119 类型的会话回收通知丢失问题。

2. [**#11015**](https://github.com/QwenLM/qwen-code/pull/11015) — **feat(channels)**：实现命名会话 worktree 重置（Part 4B）。  
   在保留 daemon 认证状态的前提下，为 worktree 隔离的会话启用 `/clear`、`/new` 和 `/reset`。

3. [**#11090**](https://github.com/QwenLM/qwen-code/pull/11090) — **feat(ipc)**：允许用户铸造的 controller token 驱动会话而无需逐条消息审查。  
   在不妨碍陌生人安全的前提下，为合法的可信 controller 用例放宽入站限制。

4. [**#11093**](https://github.com/QwenLM/qwen-code/pull/11093) — **新增持久专注模式，让终端转录更安静。**  
   增加可选的 `/focus`，用于隐藏推理行并汇总已完成的工具组（包括失败情况）。

5. [**#11070**](https://github.com/QwenLM/qwen-code/pull/11070) — **fix(acp)**：在冷恢复后保持审批模式。  
   确保 daemon 会话的审批状态在 ACP 子进程回收以及冷加载/恢复后依然有效。

6. [**#11083**](https://github.com/QwenLM/qwen-code/pull/11083) — **fix(serve)**：当工作区为 home 目录时，从用户作用域读取 channel 设置。  
   修复当工作区 == home 目录时，channel 配置对 Web Shell/管理 API 不可见的问题。

7. [**#11134**](https://github.com/QwenLM/qwen-code/pull/11134) — **fix(ci)**：对偶发的全绿 macOS E2E 分片死亡重试一次。  
   与现有的 Linux 重试机制保持一致，采用有预算限制的单次重试。

8. [**#11103**](https://github.com/QwenLM/qwen-code/pull/11103) — **ci**：不再因 vitest worker RPC 饥饿而单独导致 Test 任务失败。  
   增加分类器，区分真实测试失败与 vitest 基础设施抖动。

9. [**#11139**](https://github.com/QwenLM/qwen-code/pull/11139) — **让 API leader 与本地 worker 使用不同的凭据。**  
   在原生 subagents 和 Agent Team 中使用 API 支持的 leader 与本地/Ollama worker 混合部署时，提升安全性。

10. [**#11080**](https://github.com/QwenLM/qwen-code/pull/11080) — **ci**：为延后发现的跟踪 issue 补充 PR 上下文和负责人信息。  
   通过让延后审查发现的问题可操作、可发现，改进自动修复/审查后续工作流。

## 功能请求趋势

当前 issue 和 PR 中反复出现的功能方向包括：

- **更小且依赖更少的 HTML 导出** — #11031、#11091 和 #11096 都指向将 Web Shell 以及 `mermaid` 等大型依赖排除在导出转录之外。
- **可见、可控的后台自动化** — #5823 和 #11118 凸显了从用户或模型侧列出、停止并安全回收 cron/计划会话的需求。
- **会话/channel 生命周期管理** — #11015 和 #11024 持续推进命名会话 worktree 清理与重置路线图。
- **Web Shell UI/UX 对等性** — #11111 提出基于对话内容而非仅标题进行会话搜索；#11112 针对 Web Shell 设置中的模型选择错误。
- **会话轮换与安静输出模式** — #8927（sessionRotation）和 #11093（持久 `/focus`）指向让长时间运行的会话更可控。

## 开发者痛点

- **导出流水线脆弱且臃肿** — 19.5 MB 的空导出、打平 `mermaid`、unpkg 404，使 HTML 导出成为反复回归的源头。
- **Daemon/Web Shell 后台执行缺口** — cron 任务静默运行、会话回收期间通知丢失、“busy”检测错误，给无人值守使用带来信任问题。
- **CI/测试不稳定** — 硬编码的 `vi.waitFor` 超时、被隐藏的 `continue-on-error` 失败、vitest worker 饥饿、发布流水线重复作业，持续消耗维护者时间。
- **跨平台安全缺口** — Windows 的符号链接/TOCTOU 防护与 Linux 不对等，导致经过验证的文件读取语义弱于预期。
- **配置/会话状态丢失** — 当工作区为用户 home 目录时 channel 设置不可见，且审批模式可能在冷恢复后丢失。

</details>

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*