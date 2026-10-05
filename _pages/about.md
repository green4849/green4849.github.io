---
title: "About"
permalink: /
excerpt: "So Yeong Park — Korean speech recognition, audio-language understanding, and reliable evaluation."
redirect_from:
  - /about/
---

<p class="eyebrow">SPEECH · AUDIO · LANGUAGE AI</p>
<p class="intro-lead">I study how speech and audio-language models behave across datasets and experimental settings.</p>

I am an undergraduate researcher at **AINC Lab, Hanshin University**, advised by **Prof. Seon Man Kim**. My work focuses on Korean speech recognition, audio-language retrieval, and reliable evaluation. I design experiments, analyze model behavior, and work toward reproducible results.

I am pursuing a bachelor's degree in the School of AI & Software, with a double major in AI-Integrated Disability Life Care. My expected graduation is in the first half of 2027.

<div class="page-actions">
  <a class="btn btn--primary" href="{{ '/cv/' | relative_url }}">View CV</a>
  <a class="btn btn--inverse" href="{{ '/assets/Park_So_Yeong_CV_EN.pdf' | relative_url }}" download>Download CV · PDF</a>
</div>

## Research interests

<div class="interest-topics">
  <span>Automatic speech recognition</span>
  <span>Audio-language understanding</span>
  <span>Reliable model evaluation</span>
</div>

## Current research

{% for project in site.data.profile.research %}
<article class="research-summary">
  <p class="entry-meta">{{ project.period }} · {{ project.status }}</p>
  <h3><a href="{{ '/research/' | relative_url }}#{{ project.slug }}">{{ project.title }}</a></h3>
  <p>{{ project.summary }}</p>
</article>
{% endfor %}

## Contact

For questions about my research, please contact [kong02931@gmail.com](mailto:kong02931@gmail.com). My code profile is available on [GitHub](https://github.com/green4849).

