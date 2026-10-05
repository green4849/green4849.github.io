---
year: "2026"
type: "journal"
typeLabel: "Journal article"
title: "Evaluation and inference parameter analysis of Qwen3-ASR on multiple Korean speech corpora"
title_ko: "다중 한국어 음성 코퍼스에서의 Qwen3-ASR 평가 및 추론 파라미터 분석"
venue: "The Journal of the Acoustical Society of Korea, 45(5), 582–590"
role: "First author"
note: "Accepted Aug 25, 2026"
authors: ["So Yeong Park","Seon Man Kim"]
display_date: "Accepted Aug 25, 2026"
citation_date: "2026"
citation_note: "Accepted Aug 25, 2026"
doi: "10.7776/ASK.2026.45.5.582"
record_url: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003386913"
sort_order: 60
permalink: "/publications/qwen3-asr-evaluation/"
layout: "publication"
excerpt: "Evaluated how model size and inference settings affect recognition accuracy across Korean speech datasets."
---

## Overview

How well does Qwen3-ASR recognize Korean speech across different recording conditions, and which decoding settings offer a practical starting point when tuning each corpus is infeasible?

We evaluated the 0.6B and 1.7B models without additional fine-tuning. The study covers **10 evaluation sets from nine Korean speech corpora**, including spontaneous conversation, meetings, lectures, non-native speech, and low-quality telephone audio.

## Evaluation

- **Metric:** character error rate after removing spaces (CER<sub>NS</sub>), with the same corpus-specific normalization applied to references and predictions.
- **Search:** 72 decoding configurations per model and evaluation set, crossing language selection, generation length, temperature, and repetition penalty.
- **Selection:** settings were compared by their average CER gap from each evaluation set's observed minimum. Large corpora were sampled at approximately 3,000 utterances for tuning.
- **Validation:** the recommended setting was evaluated on the full sets for eight evaluation sets. NumPattern and Welfare were excluded from this full-set validation.

## Recommended decoding settings

| Parameter | Value |
| --- | --- |
| `language` | `korean` |
| `max_new_tokens` | `512` |
| `temperature` | `0.0` |
| `repetition_penalty` | `1.0` |

This is a default for the evaluated Korean speech conditions when corpus-specific tuning is impractical. It is not the best setting for every evaluation set. Temperature 0.0 was selected to avoid stochastic sampling because average losses between 0.0 and 0.2 were small.

## Main findings

- The 1.7B model achieved a lower minimum CER<sub>NS</sub> than the 0.6B model on all ten evaluation sets in the search.
- Stronger repetition penalties increased average loss, particularly for the smaller model. Raising the generation limit above 512 produced little change within the tested range.
- The recommended setting's mean gap from the observed per-set minimum was **0.03 percentage points for 1.7B** and **0.07 for 0.6B** on the tuning sets (Fig. 2).

### Comparison with Whisper

The table below reports CER<sub>NS</sub> (%) on KsponSpeech. **Each model uses its best tested decoding setting on these sets**, rather than the single recommended setting above. Lower is better.

| Model | eval_clean | eval_other |
| --- | ---: | ---: |
| Qwen3-ASR 1.7B | 12.76 | 12.60 |
| Whisper large-v3 | 13.89 | 13.62 |
| Qwen3-ASR 0.6B | 15.15 | 15.01 |
| Whisper medium | 16.16 | 15.19 |

Source: Section 5.4 and Fig. 3. The 1.7B recommended setting gives **12.79%** on eval_clean (Table 4); the **12.76%** result above is from the tuned comparison. These results establish a difference on the two KsponSpeech sets, not across all Korean speech domains.

## My contribution

First author. Research design, experiment implementation, results analysis, and manuscript writing.

## Scope and limitations

Each configuration with a nonzero temperature was run once, so variability across repeated sampling runs was not measured. Transfer to other ASR models, languages, and unseen Korean datasets was not established. Beam search and contextual prompting were outside the Qwen3-ASR search space studied here.

## Related presentations

- [Inference parameter optimization of Qwen3-ASR across multiple Korean speech corpora]({{ '/publications/qwen3-asr-inference/' | relative_url }}) — IEIE Summer Conference poster.
- [Inference parameter optimization of a public multilingual ASR model for Korean speech recognition]({{ '/publications/multilingual-asr-korean/' | relative_url }}) — joint spring-conference poster.

## Citation

So Yeong Park and Seon Man Kim. “Evaluation and inference parameter analysis of Qwen3-ASR on multiple Korean speech corpora.” *The Journal of the Acoustical Society of Korea*, 45(5), 582–590, 2026. DOI: 10.7776/ASK.2026.45.5.582.
