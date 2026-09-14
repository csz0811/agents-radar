# Hugging Face Trending Models Weekly 2026-09-14

> Source: [Hugging Face Hub](https://huggingface.co/) | 30 models | Generated: 2026-09-14 00:23 UTC

---

# Hugging Face Trending Models Digest — 2026-09-14

## 1. Today's Highlights
Qwen’s ecosystem dominates the upper end of the chart: [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) leads on total engagement with 14,972 likes and 7,768,964 downloads, while its [unsloth GGUF quantization](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) has already reached 11,005,880 downloads. Multimodal and video generation are also surging, with [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3), [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5), and community video derivatives drawing strong interest. MoE and edge-focused text models such as [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) and the Nex-N2.5 mini/pro releases show continued experimentation with sparse architectures. Quantization and fine-tuning activity is heavy, especially around Qwen3.8-27B GGUF and uncensored/abliterated community releases.

## 2. Trending Models

### 🧠 Language Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [openbmb/MiniCPM5-2B](https://huggingface.co/openbmb/MiniCPM5-2B) | openbmb | 1,342 | 150,110 | A compact 2B text-generation model from OpenBMB. It is trending for bringing MiniCPM5 capabilities to efficient local deployment, with 150,110 downloads. |
| [Edge0/Edge0-35B-A3B-preview](https://huggingface.co/Edge0/Edge0-35B-A3B-preview) | Edge0 | 1,038 | 3,552 | A sparse MoE preview with 35B total and A3B active parameters, tagged for MLX edge inference. Its high likes-to-download ratio suggests strong developer curiosity about edge-optimized MoE LLMs. |
| [XHToken/Spark-X2.5-4B](https://huggingface.co/XHToken/Spark-X2.5-4B) | XHToken | 1,154 | 21,336 | A 4B text-generation model tagged spark2_5 and llm. It is gaining attention as a small, accessible LLM option with 21,336 downloads. |
| [openai-community/gpt2](https://huggingface.co/openai-community/gpt2) | openai-community | 4,036 | 15,158,496 | The classic GPT-2 text-generation model, still widely used as a baseline and educational reference. Its 15,158,496 downloads show enduring utility despite newer architectures. |
| [google-bert/bert-base-uncased](https://huggingface.co/google-bert/bert-base-uncased) | google-bert | 3,302 | 46,513,338 | A foundational fill-mask BERT model for general language understanding. It remains one of the most downloaded models at 46,513,338 downloads. |
| [distilbert/distilbert-base-uncased](https://huggingface.co/distilbert/distilbert-base-uncased) | distilbert | 1,435 | 7,325,282 | A distilled BERT fill-mask model optimized for efficient NLP. It continues to trend for lightweight inference and fine-tuning with 7,325,282 downloads. |
| [TokenRhythm/NeoHorse-1-4B](https://huggingface.co/TokenRhythm/NeoHorse-1-4B) | TokenRhythm | 1,737 | 7,979 | A 4B text-generation model tagged for agentic use. It stands out with 1,737 likes from a relatively small download base, signaling interest in compact agent models. |

### 🎨 Multimodal & Generation

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [deepseek-ai/DeepSeek-V4.1-Flash](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash) | deepseek-ai | 2,200 | 244,457 | DeepSeek's V4.1 Flash image-text-to-text model. It is trending as a fast multimodal reasoning option, with 2,200 likes and 244,457 downloads. |
| [nex-agi/Nex-N2.5-mini](https://huggingface.co/nex-agi/Nex-N2.5-mini) | nex-agi | 756 | 3,970 | A compact qwen3_5_moe model supporting text generation with image-text-to-text tags. It is attracting attention as a mini MoE multimodal option with 756 likes. |
| [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) | Qwen | 14,972 | 7,768,964 | A 27B image-text-to-text conversational model from Qwen. It is the standout release by engagement, with 14,972 likes and 7,768,964 downloads. |
| [nex-agi/Nex-N2.5-Pro](https://huggingface.co/nex-agi/Nex-N2.5-Pro) | nex-agi | 623 | 30,289 | A higher-end Nex N2.5 MoE model with image-text-to-text and text-generation capabilities. It is gaining early traction with 30,289 downloads, suggesting demand for pro multimodal MoE variants. |
| [m-a-p/YuE2-3B](https://huggingface.co/m-a-p/YuE2-3B) | m-a-p | 406 | 3,707 | A 3B text-to-audio music generation model with symbolic planning and agentic editing. It is notable as a specialized audio generator in a mostly LLM/video trending list. |
| [Lightricks/LTX-2.5](https://huggingface.co/Lightricks/LTX-2.5) | Lightricks | 3,742 | 1,548,442 | A diffusion model for image-to-video, text-to-video, and video-to-video generation. It is one of the leading open video models, with 1,548,442 downloads. |
| [WarmBloodAban/Minimax-h3_Singularity](https://huggingface.co/WarmBloodAban/Minimax-h3_Singularity) | WarmBloodAban | 373 | 123,491 | A community video-generation model supporting text-to-video, image-to-video, and video-to-video. It is trending as a derivative of the MiniMax-H3 family, with 123,491 downloads. |
| [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) | MiniMaxAI | 5,238 | 4,819,845 | The official MiniMax-H3 image-text-to-video diffusion model. It is a major open video-generation release with 5,238 likes and 4,819,845 downloads. |
| [tencent/AuK](https://huggingface.co/tencent/AuK) | tencent | 190 | 1,202 | A Tencent text-to-speech model with zero-shot TTS and voice cloning. It is a niche but notable audio generation entry, albeit with low current downloads. |
| [Qwen/Qwen3.8-Flash-Next](https://huggingface.co/Qwen/Qwen3.8-Flash-Next) | Qwen | 5,165 | 624,390 | Qwen's next-generation Flash image-text-to-text conversational model. It is quickly gaining adoption with 5,165 likes and 624,390 downloads. |
| [facebook/mms-300m](https://huggingface.co/facebook/mms-300m) | facebook | 529 | 12,880 | A 300M wav2vec2 model for massively multilingual speech pretraining. It remains a key speech representation resource, though downloads are modest at 12,880. |
| [zai-org/GLM-5.3-Flash](https://huggingface.co/zai-org/GLM-5.3-Flash) | zai-org | 2,304 | 1,576,209 | A GLM-5.3 Flash image-text-to-text conversational model. It is competing strongly in the multimodal flash segment with 1,576,209 downloads. |
| [openai/clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) | openai | 1,502 | 21,331,361 | A classic CLIP ViT-B/32 model for zero-shot image classification. It continues to be widely used as a vision-language baseline with 21,331,361 downloads. |
| [Agnes-AI/Agnes-3.0-Flash](https://huggingface.co/Agnes-AI/Agnes-3.0-Flash) | Agnes-AI | 139 | 474 | An early Agnes 3.0 Flash image-text-to-text model. It is a low-adoption release with 139 likes and 474 downloads, but signals new entrant activity. |
| [Viggle/Viggle-Animate](https://huggingface.co/Viggle/Viggle-Animate) | Viggle | 216 | 0 | A video-to-video diffusion model for character replacement and video editing. It is noteworthy for its editing focus, though it has 0 reported downloads. |

### 🔧 Specialized Models

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [google/timesfm-3.0-pytorch](https://huggingface.co/google/timesfm-3.0-pytorch) | google | 774 | 797,832 | Google's TimesFM 3.0 PyTorch model for time-series forecasting. It is trending as a pretrained forecasting foundation model with 797,832 downloads. |
| [sentence-transformers/all-MiniLM-L6-v2](https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2) | sentence-transformers | 5,930 | 252,928,721 | A widely used sentence-similarity embedding model for semantic search and RAG. Its 252,928,721 downloads make it one of the most adopted models in the ecosystem. |
| [Qwen/Qwen-Drive-1.0-4B](https://huggingface.co/Qwen/Qwen-Drive-1.0-4B) | Qwen | 196 | 4,119 | A 4B image-text-to-text model specialized for autonomous driving and motion planning. It is a niche AV release with 4,119 downloads, showing Qwen's expansion into domain-specific models. |

### 📦 Fine-tunes & Quantizations

| Model | Author | Likes | Downloads | Summary |
| :--- | :--- | ---: | ---: | :--- |
| [ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF](https://huggingface.co/ISTA-DASLab/Qwen3.8-27B-GSQ-RCO-GGUF) | ISTA-DASLab | 970 | 769,557 | A mixed-precision GGUF quantization of Qwen3.8-27B using GSQ/RCO. It is trending for advanced local-inference quantization, with 769,557 downloads. |
| [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) | unsloth | 4,009 | 11,005,880 | Unsloth's GGUF quantization of Qwen3.8-27B. It has massive adoption for local inference, reaching 11,005,880 downloads. |
| [DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF](https://huggingface.co/DavidAU/Qwen3.8-27B-TURBO-Fable-Cold-Fusion-735-882-Heretic-Uncensored-NEO-CODER-MAX-MTP-GGUF) | DavidAU | 633 | 750,591 | A heavily customized, uncensored GGUF fine-tune of Qwen3.8-27B. It reflects continued demand for community fine-tunes with aggressive persona/coder modifications, with 750,591 downloads. |
| [dealignai/GLM-5.3-CYBERSECURITY-FP8](https://huggingface.co/dealignai/GLM-5.3-CYBERSECURITY-FP8) | dealignai | 433 | 30,310 | An abliterated, refusal-removed GLM-5.3 cybersecurity model in FP8. It is trending among users seeking specialized security and uncensored variants, with 30,310 downloads. |
| [openbmb/MiniCPM5-2B-GGUF](https://huggingface.co/openbmb/MiniCPM5-2B-GGUF) | openbmb | 217 | 99,716 | A GGUF quantization of MiniCPM5-2B for local text generation. It makes the compact LLM easier to run locally and has 99,716 downloads. |

## 3. Ecosystem Signal
The list is increasingly Qwen-centric: Qwen3.8-27B and Qwen3.8-Flash-Next anchor attention, and Qwen3.5/Qwen3.8 MoE tags appear across Nex and Edge0 releases. Open-weight models dominate the trending chart, while older baselines such as GPT-2, BERT, DistilBERT, and CLIP remain high-download utilities rather than fresh releases. Video generation is the most visible generative category: MiniMax-H3, LTX-2.5, and Viggle-Animate cover text/image-to-video and video-to-video editing. Quantization is a major adoption driver: unsloth's Qwen3.8-27B-GGUF has more downloads than the base model, and ISTA-DASLab's mixed-precision GGUF plus DavidAU's uncensored fine-tune show strong local-inference demand. Specialized niches are also present, including TimesFM for forecasting, all-MiniLM-L6-v2 for embeddings, and Qwen-Drive for autonomous driving. Overall, the ecosystem favors open-weight multimodal LLMs, aggressive quantization, and MoE architectures optimized for edge or local deployment.

## 4. Worth Exploring
- [Qwen/Qwen3.8-27B](https://huggingface.co/Qwen/Qwen3.8-27B) — The highest-engagement model in the set, with 14,972 likes and 7,768,964 downloads. It is a strong case study for modern multimodal conversational model adoption.
- [unsloth/Qwen3.8-27B-GGUF](https://huggingface.co/unsloth/Qwen3.8-27B-GGUF) — With 11,005,880 downloads, it is the practical entry point for running Qwen3.8-27B locally. Worth studying for quantization quality and deployment workflow.
- [MiniMaxAI/MiniMax-H3](https://huggingface.co/MiniMaxAI/MiniMax-H3) — A leading open image-text-to-video model with 5,238 likes and 4,819,845 downloads. It is especially relevant for tracking the rapidly maturing open video-generation stack.

---
*This digest is auto-generated by [agents-radar](https://github.com/csz0811/agents-radar).*