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
resources:
  - label: "Paper (PDF)"
    url: "/assets/publications/qwen3-asr-korean-2026.pdf"
  - label: "Publication record"
    url: "https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART003386913"
---

<figure class="publication-figure">
  <a href="{{ '/assets/publications/qwen3-asr-korean-2026.pdf' | relative_url }}#page=7" aria-label="Read Figure 3 in the paper">
    <img src="{{ '/assets/publications/qwen3-asr-whisper-comparison.png' | relative_url }}" width="875" height="475" alt="Figure 3: Qwen3-ASR 0.6B and 1.7B have lower character error rates than Whisper medium and large-v3, respectively, on KsponSpeech eval_clean and eval_other.">
  </a>
  <figcaption>Fig. 3 from the paper. Character error rate with spaces removed (CER<sub>NS</sub>) on KsponSpeech eval_clean and eval_other; each model uses its best tested decoding setting on these two sets. Lower is better.</figcaption>
</figure>

We evaluate Qwen3-ASR 0.6B and 1.7B without fine-tuning on ten evaluation sets from nine Korean speech corpora. The study examines the effects of inference settings and identifies a practical default for the tested Korean speech conditions.

### Related presentations

- [IEIE Summer Conference poster]({{ '/publications/qwen3-asr-inference/' | relative_url }}) · 2026
- [Joint spring-conference poster]({{ '/publications/multilingual-asr-korean/' | relative_url }}) · 2026
