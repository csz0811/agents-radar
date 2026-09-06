# Hugging Face Trending Models Weekly 2026-09-07

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-06 22:45 UTC

---

# Hugging Face Trending Models Digest — 2026-09-07

## 1. Today's Highlights

The week is dominated by the **Qwen3.8-27B ecosystem**: the flagship multimodal model is generating 14,124 weekly likes, while community quantizations and abliterated variants — led by Unsloth's GGUF build with 10,311,462 downloads — make it the clear center of gravity for local Qwen deployment. Official open-weight releases from DeepSeek, Zhipu AI, MiniMax, Lightricks, and Tencent keep the frontier interesting across both multimodal chat and video generation. Meanwhile, the community is heavily focused on post-training efficiency: GGUF quantization, refusal-removed/uncensored variants, MTP support, and NVIDIA FP4 formats all feature prominently. Video generation is also maturing rapidly, with MiniMax-H3 and Lightricks LTX-2.5 both crossing strong download milestones.

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 3,706 | 14,612,342 | The original autoregressive language model, still widely used as a baseline and compatibility target. Its sustained weekly likes and massive download count show that classic open-weight models remain infrastructure in today's ecosystem. |
| [zai-org/GLM-5.3](https://huggingface.co/zai-org/GLM-5.3) | zai-org | 1,734 | 410,074 | Zhipu AI's GLM-5.3 text-generation model, built on the GLM sparse-MoE architecture. It is trending as a top-tier open-weight LLM choice from the GLM family, with strong weekly engagement. |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 598 | 5,477 | A compact 4B LLM in the Spark 2.5 series. Its quick rise in weekly likes points to continued demand for small, self-hostable text-generation models. |
| [tencent/Hy4-preview](https://huggingface.co/tencent/Hy4-preview) | tencent | 445 | 6,441 | Tencent's Hunyuan-linked Hy4 text-generation preview. It is still early, but the 445 weekly likes signal ecosystem interest in Tencent's latest open-weight LLM direction. |
| [IFM/K2-Horizon-MoVA-36B-A4B](https://huggingface.co/IFM/K2-Horizon-MoVA-36B-A4B) | IFM | 186 | 1,723 | A 36B-parameter sparse MoE model with only 4B active parameters per token. Its K2-Horizon architecture is attracting attention from efficiency-focused teams despite a low download count so far. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,124 | 6,190,807 | Qwen's 27B multimodal image-text-to-text model and the central release of this week's trend. It anchors an unusually large ecosystem of local GGUF, uncensored, and abliterated derivatives. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 4,964 | 4,986,349 | A major open-generation video model supporting text-to-video and image-to-video workflows. Its 4,964 weekly likes and nearly 5M downloads make it one of the most-watched video releases in the digest. |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 4,942 | 432,966 | Qwen's newer Flash-Next vision-language model, marked as the next experimental generation. It is already drawing strong adoption and downstream GGUF/NVFP4 quantization support. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 2,956 | 1,526,928 | A single-file diffusion generation model for text-to-video, image-to-video, and video-to-video tasks. It is trending because of its broad video-control range and 1.53M downloads. |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,099 | 761,364 | The Flash vision-language version of the GLM-5.3 family. Its strong like/download balance makes it a key open-weight multimodal alternative this week. |
| [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,211 | 20,579,479 | The canonical CLIP vision-language contrastive model, used for zero-shot image classification and retrieval. It remains an evergreen multimodal foundation model with 20.6M downloads. |
| [deepseek-ai/DeepSeek-V4-Flash-Vision-Exp](https://huggingface.co/deepseek-ai/DeepSeek-V4-Flash-Vision-Exp) | deepseek-ai | 738 | 209,191 | An experimental Flash-tier image-text-to-text model from DeepSeek. Its 209K downloads are notable for a newly released experimental checkpoint. |
| [BreezeBlue/Breeze-TTS-2](https://huggingface.co/BreezeBlue/Breeze-TTS-2) | BreezeBlue | 460 | 6,357 | A text-to-speech model gaining traction in the audio generation space. It is still small by download count, but 460 weekly likes suggest early community enthusiasm. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,566 | 253,029,336 | A compact sentence-embedding model widely used for semantic search and RAG pipelines. Its 253M downloads make it the most-downloaded model in this entire trending list. |
| [google-bert/bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 2,989 | 52,338,347 | The standard BERT encoder for transfer learning in NLP. It retains massive popularity as a reusable backbone for classification, retrieval, and representation learning. |
| [distilbert/distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,156 | 7,054,316 | A distilled, faster version of BERT-base for efficient NLP tasks. Its 7M downloads underscore its role as a default lightweight text encoder. |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 499 | 144,455 | Google's time-series forecasting foundation model in PyTorch form. It stands out as a rare non-LLM trending model, reflecting growing interest in foundation models for numeric forecasting. |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 263 | 12,464 | A wav2vec2-based massively multilingual speech checkpoint from Meta's MMS project. It is relevant for multilingual automatic speech recognition and low-resource speech transfer learning. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 3,581 | 10,311,462 | Unsloth's optimized GGUF quantization of Qwen3.8-27B. It is the most downloaded Qwen derivative in the list and a primary choice for local inference. |
| [OBLITERATUS/Qwen3.8-27B-OBLITERATED](https://huggingface.co/OBLITERATUS/Qwen3.8-27B-OBLITERATED) | OBLITERATUS | 1,107 | 995,160 | An abliterated Qwen3.8-27B build shipped across GGUF, MLX, and safetensors formats. Its strong likes and downloads show continued demand for refusal-removed local models. |
| [JonathanColetti/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/JonathanColetti/Qwen3.8-27B-Uncensored-GGUF) | JonathanColetti | 1,000 | 2,499,368 | A community "uncensored" GGUF variant of Qwen3.8-27B. With nearly 2.5M downloads, it is among the most popular local Qwen releases this week. |
| [HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF](https://huggingface.co/HauhauCS/Qwen3.8-27B-Uncensored-HauhauCS-Aggressive-MTP-GGUF) | HauhauCS | 977 | 1,568,315 | A less-filtered Qwen3.8 multimodal GGUF variant supporting MTP-related inference behavior. Its 1.57M downloads indicate strong community interest in customized local Qwen chat. |
| [unsloth/Qwen3.8-Flash-Next-GGUF](https://huggingface.co/unsloth/Qwen3.8-Flash-Next-GGUF) | unsloth | 809 | 823,733 | Unsloth's GGUF conversion of the newer Qwen3.8-Flash-Next vision-language model. It makes the next-generation Qwen line easier to deploy on local hardware. |
| [orcarouter/Qwen3.8-27B-Uncensored-GGUF](https://huggingface.co/orcarouter/Qwen3.8-27B-Uncensored-GGUF) | orcarouter | 748 | 287,720 | An abliterated/uncensored GGUF build of Qwen3.8-27B. It is part of the broader wave of open Qwen fine-tunes aimed at less restricted interaction. |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 466 | 348,389 | A research-oriented GGUF using GSQ-RCO mixed-precision quantization. It is notable for exploring accuracy/efficiency trade-offs in compressed Qwen3.8-27B. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 245 | 211,018 | A heavily merged and abliterated Qwen3.8 GGUF with a strong "uncensored" identity. It represents the creative/community-merge side of the Qwen fine-tuning ecosystem. |
| [OpenVDN/vdn-minimax-h3](https://huggingface.co/OpenVDN/vdn-minimax-h3) | OpenVDN | 209 | 0 | A community fine-tune of MiniMax-H3 for text-to-video generation. It has no downloads yet, but 209 weekly likes make it an early derivative to watch for custom video-model workflows. |
| [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 146 | 15,648 | A refusal-removed FP8 build of GLM-5.3 focused on security/cybersecurity use cases. It shows the intersection of domain tuning, quantization, and local deployment. |
| [Jackrong/Qwopus3.8-27B-Flash-GGUF](https://huggingface.co/Jackrong/Qwopus3.8-27B-Flash-GGUF) | Jackrong | 128 | 22,128 | A llama.cpp-friendly GGUF variant of Qwen3.8-27B branded as "Qwopus". It is one of many community GGUF takes on the current Qwen multimodal base. |
| [nvidia/Qwen3.8-Flash-Next-NVFP4](https://huggingface.co/nvidia/Qwen3.8-Flash-Next-NVFP4) | nvidia | 114 | 13,321 | NVIDIA's NVFP4 quantized version of Qwen3.8-Flash-Next using ModelOpt. It points toward efficient FP4 inference for multimodal models on NVIDIA hardware. |

## 3. Ecosystem Signal

Qwen is the clearest momentum winner: roughly 12 of the 30 entries are Qwen-related, spanning official multimodal checkpoints, GGUF quantizations, abliterated variants, and hardware-specific FP4 builds. The GLM-5.3 family is the second strong cluster, while DeepSeek, Tencent, MiniMax, and Lightricks keep the frontier broad via open-weight vision and video releases.

All top entries are open-weight or openly accessible on Hugging Face; no proprietary-only model appears in the weekly list. Community attention is concentrated less on raw pretraining and more on post-training: GGUF deployment, refusal-removed models, MTP-enabled variants, and hardware-specific formats such as NVIDIA NVFP4. Meanwhile, classic utility models — all-MiniLM-L6-v2, BERT, and GPT2 — still accumulate enormous download counts, showing that the trending surface is a mix of frontier releases and durable infrastructure models.

## 4. Worth Exploring

- [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) — The reference checkpoint behind the week's largest ecosystem. Studying it alongside its GGUF and abliterated derivatives is the fastest way to understand current open-weight multimodal fine-tuning trends.
- [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) — One of the most successful open video-generation models right now. It is worth trying directly and also useful as a base for observing how community video fine-tunes, such as OpenVDN, evolve.
- [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) — A good break from LLM-centric trends. It represents the growing class of non-text foundation models and is worth experimenting with for time-series forecasting workloads.

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*