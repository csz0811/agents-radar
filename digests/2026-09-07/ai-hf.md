# Hugging Face 热门模型周报 2026-09-07

> 数据来源: [Hugging Face Hub](https://huggingface.co/) | 共 30 个模型 | 生成时间: 2026-09-06 22:45 UTC

---

# Hugging Face 热门模型摘要 — 2026-09-07

## 1. 今日亮点

本周趋势由 **Qwen3.8-27B 生态** 主导：旗舰多模态模型的单周点赞量达 14,124；以 Unsloth 下载量达 10,311,462 的 GGUF 构建为首的社区量化版和去拒答（abliterated）变体，也让 Qwen3.8-27B 成为本地 Qwen 部署中无可争议的重心。DeepSeek、智谱AI（Zhipu AI）、MiniMax、Lightricks 与腾讯（Tencent）的官方开放权重发布，让多模态对话与视频生成这两条前沿赛道持续保持看点。与此同时，社区明显在聚焦后训练效率：GGUF 量化、去拒答/无审查变体、MTP 支持以及 NVIDIA FP4 格式都在趋势榜上占据显著位置。视频生成同样在快速走向成熟，MiniMax-H3 与 Lightricks LTX-2.5 双双突破了相当亮眼的下载里程碑。

## 2. 热门模型

### 🧠 语言模型

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 3,706 | 14,612,342 | 最初的自回归语言模型，至今仍被广泛用作基线模型与兼容性基准。它持续稳定的周点赞数和庞大的下载量说明，经典开放权重模型在今天的生态中依旧扮演着基础设施的角色。 |
| [zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | zai-org | 1,734 | 410,074 | 智谱AI的GLM-5.3文本生成模型，基于GLM稀疏MoE架构。作为GLM家族中顶尖的开放权重LLM选择，它以强劲的周互动数据登上趋势榜。 |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 598 | 5,477 | Spark 2.5 系列中的一款紧凑型 4B 大语言模型。其周点赞数的快速攀升表明，小型、可自托管文本生成模型依然有持续需求。 |
| [tencent/Hy4-preview](https://huggingface.co/tencent/Hy4-preview) | tencent | 445 | 6,441 | 腾讯混元（Hunyuan）体系下的 Hy4 文本生成预览版。目前虽然仍处早期阶段，但 445 的周点赞数已释放出社区对腾讯最新开放权重 LLM 路线的兴趣。 |
| [IFM/K2-Horizon-MoVA-36B-A4B](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B) | IFM | 186 | 1,723 | 36B 参数的稀疏 MoE 模型，每 Token 仅激活 4B 参数。尽管目前下载量不高，其 K2-Horizon 架构正在吸引越来越多关注效率的团队的注意。 |

### 🎨 多模态与生成

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,124 | 6,190,807 | Qwen 的 27B 多模态图像文本到文本模型，也是本周趋势的核心发布。它带动了一个规模异常庞大的本地 GGUF、无审查（uncensored）与去拒答（abliterated）衍生生态。 |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,964 | 4,986,349 | 一款重要的开放生成式视频模型，支持文生视频与图生视频工作流。单周点赞 4,964、下载量近 5M，使其成为本期摘要中最受关注的视频发布之一。 |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 4,942 | 432,966 | Qwen 全新的 Flash-Next 视觉语言模型，被定义为面向下一代的实验性版本。它已迅速获得广泛采用，并带动了 GGUF/NVFP4 等下游量化支持。 |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 2,956 | 1,526,928 | Lightricks 的单文件扩散生成模型，支持文生视频、图生视频和视频转视频任务。凭借广泛的视频控制范围和 1.53M 下载量，它成功跻身本周趋势榜。 |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,099 | 761,364 | GLM-5.3 家族的 Flash 视觉语言版本。点赞与下载数据双双亮眼，使其成为本周重要的开放权重多模态选择之一。 |
| [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,211 | 20,579,479 | 经典的 CLIP 视觉语言对比模型，用于零样本图像分类与检索。作为多模态基础模型的常青树，其累计下载量已达 20.6M。 |
| [deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 738 | 209,191 | DeepSeek 推出的实验性 Flash 级图像文本到文本模型。对于一个刚发布的实验性检查点来说，209K 的下载量已经相当可观。 |
| [BreezeBlue/Breeze-TTS-2](https://huggingface.co/BreezeBlue/Breeze-TTS-2) | BreezeBlue | 460 | 6,357 | 一款在音频生成领域崭露头角的文本到语音（TTS）模型。目前下载量规模还不大，但 460 的周点赞数已经显现出早期社区热情。 |

### 🔧 专用模型

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,566 | 253,029,336 | 紧凑型句子嵌入模型，广泛用于语义搜索与 RAG 流水线。253M 的下载量使其成为本期整个趋势榜中下载量最高的模型。 |
| [google-bert/bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 2,989 | 52,338,347 | NLP 迁移学习的标准 BERT 编码器。作为分类、检索和表征学习任务中可复用的骨干模型，它至今依然保持着极高的人气。 |
| [distilbert/distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,156 | 7,054,316 | BERT-base 的蒸馏加速版本，面向高效 NLP 任务。7M 的下载量进一步印证了它作为默认轻量级文本编码器的地位。 |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 499 | 144,455 | Google 的时间序列预测基础模型（PyTorch 版）。作为趋势榜上少见的非 LLM 模型，它反映出业界对数值预测基础模型日益浓厚的兴趣。 |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 263 | 12,464 | 来自 Meta MMS 项目的基于 wav2vec2 的大规模多语言语音检查点。它适用于多语言自动语音识别（ASR）与低资源语音迁移学习。 |

### 📦 微调与量化模型

| 模型 | 作者 | 点赞数 | 下载量 | 简介 |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,581 | 10,311,462 | Unsloth 对 Qwen3.8-27B 的优化 GGUF 量化版本。它是本榜单中下载量最高的 Qwen 衍生版本，也是本地推理场景下的首选。 |
| [OBLITERATUS/Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 1,107 | 995,160 | 一个去拒答（abliterated）的 Qwen3.8-27B 构建，提供 GGUF、MLX 与 safetensors 三种格式。高点赞与高下载量表明，去除拒答机制的本地模型依然需求旺盛。 |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 1,000 | 2,499,368 | Qwen3.8-27B 的社区“无审查”GGUF 变体。凭借近 2.5M 的下载量，它是本周最受欢迎的本地 Qwen 发布之一。 |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 977 | 1,568,315 | 一个过滤更少的 Qwen3.8 多模态 GGUF 变体，支持 MTP 相关推理行为。1.57M 的下载量表明社区对定制化本地 Qwen 对话有着浓厚兴趣。 |
| [unsloth/Qwen3.8-Flash-Next-GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF) | unsloth | 809 | 823,733 | Unsloth 对新一代 Qwen3.8-Flash-Next 视觉语言模型的 GGUF 转换版本，让新一代 Qwen 产品线更易于部署在本地硬件上。 |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 748 | 287,720 | Qwen3.8-27B 的一个去拒答/无审查 GGUF 构建，是旨在提供更少限制交互的开放 Qwen 微调浪潮中的一员。 |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 466 | 348,389 | 一个面向研究的 GGUF 版本，采用 GSQ-RCO 混合精度量化。它在压缩 Qwen3.8-27B 时探索精度与效率之间的权衡，因此值得关注。 |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 245 | 211,018 | 一个深度融合且去拒答的 Qwen3.8 GGUF 版本，带有强烈的“无审查”定位。它代表了 Qwen 微调生态中偏创意与社区合并路线的衍生方向。 |
| [OpenVDN/vdn-minimax-h3](https://huggingface.co/OpenVDN/vdn-minimax-h3) | OpenVDN | 209 | 0 | MiniMax-H3 面向文生视频的社区微调版本。目前下载量还为 0，但 209 的周点赞数使其成为自定义视频模型工作流中值得关注的早期衍生项目。 |
| [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 146 | 15,648 | 一个面向安全/网络安全用例、去除拒答机制的 GLM-5.3 FP8 构建，集中呈现了领域微调、量化与本地部署三者的交汇。 |
| [Jackrong/Qwopus3.8-27B-Flash-GGUF](https://huggingface.co/Jackrong/Qwopus3.8-27B-Flash-GGUF) | Jackrong | 128 | 22,128 | Qwen3.8-27B 的一个对 llama.cpp 友好的 GGUF 变体，以“Qwopus”品牌命名。它是社区围绕当前 Qwen 多模态底座推出的众多 GGUF 改编版本之一。 |
| [nvidia/Qwen3.8-Flash-Next-NVFP4](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4) | nvidia | 114 | 13,321 | NVIDIA 使用 ModelOpt 对 Qwen3.8-Flash-Next 进行 NVFP4 量化的版本，指向 NVIDIA 硬件上多模态模型的高效 FP4 推理。 |

## 3. 生态信号

Qwen 是势头最明显的赢家：30 个上榜条目中约有 12 个与 Qwen 相关，覆盖官方多模态检查点、GGUF 量化、去拒答（abliterated）变体以及特定硬件 FP4 构建。GLM-5.3 家族构成了第二大强势集群，而 DeepSeek、腾讯、MiniMax 和 Lightricks 则通过开放权重的视觉与视频发布，继续拓宽前沿边界。

榜单中的所有头部条目均为开放权重，或可在 Hugging Face 上公开获取；本周列表中没有任何纯专有模型出现。社区关注的重点与其说在原始预训练，不如说更多落在后训练环节：GGUF 部署、去拒答模型、启用 MTP 的变体，以及 NVIDIA NVFP4 等硬件特定格式。与此同时，all-MiniLM-L6-v2、BERT、GPT2 这些经典实用模型仍在不断积累庞大的下载量，说明趋势榜单本身也是前沿发布与持久基础设施模型的一种混合体。

## 4. 值得探索

- [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) — 本周最大生态背后的参考检查点。把它与其 GGUF 和去拒答（abliterated）衍生版本放在一起研究，是理解当前开放权重多模态微调趋势最快的路径。
- [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) — 目前最成功的开放生成式视频模型之一。它既值得直接上手体验，也可以作为观察 OpenVDN 等社区视频微调模型如何演进的参考基础。
- [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) — 一个跳脱 LLM 中心趋势、换个口味的好选择。它代表了正在成长的这一代非文本基础模型，值得在时间序列预测任务中动手尝试。

---
*本日报由 [agents-radar](https://github.com/csz0811/agents-radar) 自动生成。*