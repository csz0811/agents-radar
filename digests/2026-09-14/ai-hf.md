# Hugging Face 热门模型周报 2026-09-14

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-14 00:23 UTC

---

# Hugging Face 热门模型摘要 — 2026-09-14

## 1. 今日亮点
Qwen 生态占据了榜单高位：[Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) 以 14,972 个点赞和 7,768,964 次下载领跑总互动量，而其 [unsloth GGUF quantization](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) 的下载量已达 11,005,880。多模态和视频生成同样势头强劲，[MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3)、[Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) 以及社区视频衍生模型吸引了大量关注。MoE 和面向边缘的文本模型，如 [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) 以及 Nex-N2.5 mini/pro 版本，显示出对稀疏架构的持续实验。量化和微调活动非常活跃，尤其是围绕 Qwen3.8-27B GGUF 以及社区的无审查/abliterated 发布。

## 2. 热门模型

### 🧠 语言模型

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,342 | 150,110 | 来自 OpenBMB 的紧凑型 2B 文本生成模型。它因将 MiniCPM5 能力带入高效本地部署而走热，下载量为 150,110。 |
| [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 1,038 | 3,552 | 一个稀疏 MoE 预览模型，总参数 35B、激活参数 A3B，标注用于 MLX 边缘推理。其高点赞/下载比表明开发者对面向边缘优化的 MoE LLM 有强烈兴趣。 |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,154 | 21,336 | 一个 4B 文本生成模型，带有 spark2_5 和 llm 标签。作为小型、易用的 LLM 选项正受到关注，下载量为 21,336。 |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 4,036 | 15,158,496 | 经典的 GPT-2 文本生成模型，仍被广泛用作基线和教学参考。尽管有更新的架构，其 15,158,496 次下载仍显示出持久实用性。 |
| [google-bert/bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 3,302 | 46,513,338 | 一个基础的 fill-mask BERT 模型，用于通用语言理解。它以 46,513,338 次下载仍是下载量最高的模型之一。 |
| [distilbert/distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,435 | 7,325,282 | 一个蒸馏版 BERT fill-mask 模型，针对高效 NLP 优化。凭借 7,325,282 次下载，它继续因轻量推理和微调而热门。 |
| [TokenRhythm/NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 1,737 | 7,979 | 一个 4B 文本生成模型，标注用于 agentic 用途。它在相对较小的下载基数上获得 1,737 个点赞，颇为突出，表明人们对紧凑型智能体模型感兴趣。 |

### 🎨 多模态与生成

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 2,200 | 244,457 | DeepSeek 的 V4.1 Flash 图文到文本模型。作为快速多模态推理选项而走热，拥有 2,200 个点赞和 244,457 次下载。 |
| [nex-agi/Nex-N2.5-mini](https://huggingface.co/nex-agi/Nex-N2.5-mini) | nex-agi | 756 | 3,970 | 一个紧凑的 qwen3_5_moe 模型，支持文本生成，并带有图文到文本标签。作为迷你 MoE 多模态选项正受到关注，有 756 个点赞。 |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,972 | 7,768,964 | 来自 Qwen 的 27B 图文到文本对话模型。按互动量看是突出的发布，拥有 14,972 个点赞和 7,768,964 次下载。 |
| [nex-agi/Nex-N2.5-Pro](https://huggingface.co/nex-agi/Nex-N2.5-Pro) | nex-agi | 623 | 30,289 | 更高端的 Nex N2.5 MoE 模型，具备图文到文本和文本生成能力。它以 30,289 次下载获得早期关注，表明对专业版多模态 MoE 变体的需求。 |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 406 | 3,707 | 一个 3B 文本到音频音乐生成模型，具有符号规划和智能体编辑能力。在以 LLM/视频为主的热门列表中，它作为专门音频生成器值得注意。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,742 | 1,548,442 | 一个用于图生视频、文生视频和视频到视频生成的扩散模型。它是最领先的开放视频模型之一，下载量为 1,548,442。 |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 373 | 123,491 | 一个社区视频生成模型，支持文生视频、图生视频和视频到视频。它作为 MiniMax-H3 系列的衍生模型而走热，下载量为 123,491。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,238 | 4,819,845 | 官方 MiniMax-H3 图文到视频扩散模型。这是一个重要的开放视频生成发布，拥有 5,238 个点赞和 4,819,845 次下载。 |
| [tencent/AuK](https://huggingface.co/tencent/AuK) | tencent | 190 | 1,202 | 腾讯的文本到语音模型，支持零样本 TTS 和声音克隆。这是一个小众但值得注意的音频生成条目，不过当前下载量较低。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,165 | 624,390 | Qwen 的下一代 Flash 图文到文本对话模型。它正快速获得采用，拥有 5,165 个点赞和 624,390 次下载。 |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 529 | 12,880 | 一个 300M 的 wav2vec2 模型，用于大规模多语言语音预训练。它仍是关键的语音表征资源，尽管下载量不高，为 12,880。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,304 | 1,576,209 | 一个 GLM-5.3 Flash 图文到文本对话模型。它在多模态 Flash 细分领域竞争强劲，下载量为 1,576,209。 |
| [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,502 | 21,331,361 | 经典的 CLIP ViT-B/32 模型，用于零样本图像分类。它继续作为视觉-语言基线被广泛使用，下载量为 21,331,361。 |
| [Agnes-AI/Agnes-3.0-Flash](https://huggingface.co/Agnes-AI/Agnes-3.0-Flash) | Agnes-AI | 139 | 474 | 早期的 Agnes 3.0 Flash 图文到文本模型。这是一个采用率较低的发布，有 139 个点赞和 474 次下载，但标志着新进入者的活动。 |
| [Viggle/Viggle-Animate](https://huggingface.co/Viggle/Viggle-Animate) | Viggle | 216 | 0 | 一个视频到视频扩散模型，用于角色替换和视频编辑。它因专注于编辑而值得注意，尽管报告下载量为 0。 |

### 🔧 专用模型

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 774 | 797,832 | Google 的 TimesFM 3.0 PyTorch 模型，用于时间序列预测。它作为预训练预测基础模型而热门，下载量为 797,832。 |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,930 | 252,928,721 | 一个广泛使用的句子相似度嵌入模型，用于语义搜索和 RAG。其 252,928,721 次下载使其成为生态中采用最广的模型之一。 |
| [Qwen/Qwen-Drive-1.0-4B](https://huggingface.co/Qwen/Qwen-Drive-1.0-4B) | Qwen | 196 | 4,119 | 一个 4B 图文到文本模型，专门用于自动驾驶和运动规划。这是一个小众的自动驾驶发布，下载量为 4,119，显示 Qwen 正在向特定领域模型扩展。 |

### 📦 微调与量化

| 模型 | 作者 | 点赞数 | 下载量 | 摘要 |
| :--- | :--- | ---: | ---: | :--- |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 970 | 769,557 | 使用 GSQ/RCO 对 Qwen3.8-27B 进行的混合精度 GGUF 量化。它因先进的本地推理量化而热门，下载量为 769,557。 |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,009 | 11,005,880 | Unsloth 对 Qwen3.8-27B 的 GGUF 量化。它在本地推理方面获得大量采用，下载量达到 11,005,880。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 633 | 750,591 | 一个高度定制、无审查的 Qwen3.8-27B GGUF 微调。它反映出对带有激进 persona/coder 修改的社区微调仍有持续需求，下载量为 750,591。 |
| [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 433 | 30,310 | 一个经过 abliterated、移除拒答的 GLM-5.3 网络安全模型，采用 FP8。它在寻求专用安全和无审查变体的用户中热门，下载量为 30,310。 |
| [openbmb/MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) | openbmb | 217 | 99,716 | MiniCPM5-2B 的 GGUF 量化，用于本地文本生成。它让这个紧凑 LLM 更容易在本地运行，下载量为 99,716。 |

## 3. 生态信号
该列表日益以 Qwen 为中心：Qwen3.8-27B 和 Qwen3.8-Flash-Next 吸引了主要关注，Qwen3.5/Qwen3.8 MoE 标签出现在 Nex 和 Edge0 的发布中。开放权重模型主导热门榜，而 GPT-2、BERT、DistilBERT 和 CLIP 等较老基线仍是高下载量工具，而非新发布。视频生成是最显眼的生成类别：MiniMax-H3、LTX-2.5 和 Viggle-Animate 覆盖文/图生视频以及视频到视频编辑。量化是重要的采用驱动力：unsloth 的 Qwen3.8-27B-GGUF 下载量超过基础模型，ISTA-DASLab 的混合精度 GGUF 加上 DavidAU 的无审查微调显示出强劲的本地推理需求。专用细分领域也存在，包括用于预测的 TimesFM、用于嵌入的 all-MiniLM-L6-v2，以及用于自动驾驶的 Qwen-Drive。总体而言，生态偏好开放权重多模态 LLM、激进量化和针对边缘或本地部署优化的 MoE 架构。

## 4. 值得探索
- [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) — 这组模型中互动量最高的模型，拥有 14,972 个点赞和 7,768,964 次下载。它是现代多模态对话模型采用情况的强有力案例研究。
- [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) — 凭借 11,005,880 次下载，它是在本地运行 Qwen3.8-27B 的实用入口。其量化质量和部署工作流值得研究。
- [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) — 领先的开放图文到视频模型，拥有 5,238 个点赞和 4,819,845 次下载。它对于跟踪快速成熟的开放视频生成技术栈尤其相关。

---

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*