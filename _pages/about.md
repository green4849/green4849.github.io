---
title: "About me"
permalink: /
excerpt: "So Yeong Park — Korean speech recognition, audio-language understanding, and reliable evaluation."
redirect_from:
  - /about/
---

I am an undergraduate researcher at **AINC Lab, Hanshin University**, advised by **Prof. Seon Man Kim**. I work on Korean speech recognition, audio-language retrieval, and evaluation of language models for academic-regulation question answering.

My research focuses on how models behave across datasets and experimental settings. I design experiments, analyze results, and work toward reproducible evaluations.

I am pursuing a bachelor's degree in the School of AI & Software, with a double major in AI-Integrated Disability Life Care. I expect to graduate in the first half of 2027.

You can find more about my work on the [Research]({{ '/research/' | relative_url }}) and [Publications]({{ '/publications/' | relative_url }}) pages, or download my [CV (PDF)]({{ '/assets/Park_So_Yeong_CV_EN.pdf' | relative_url }}).

## Research interests

- Automatic speech recognition
- Audio-language understanding
- Reliable model evaluation

## Current work

{% for project in site.data.profile.research %}
- [{{ project.title }}]({{ '/research/' | relative_url }}#{{ project.slug }}). {{ project.summary }}
{% endfor %}

## Contact

[kong02931@gmail.com](mailto:kong02931@gmail.com)
