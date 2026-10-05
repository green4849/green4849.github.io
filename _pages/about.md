---
title: "About me"
permalink: /
excerpt: "So Yeong Park — Korean speech recognition, audio-language understanding, and reliable evaluation."
redirect_from:
  - /about/
---
{% assign profile = site.data.profile %}

I am an undergraduate researcher at {{ profile.lab.name }}, {{ profile.lab.institution }}, advised by {{ profile.lab.advisor }}.

{{ profile.research_summary }}

I am pursuing a bachelor's degree in the {{ profile.education.school }}, with a double major in AI-Integrated Disability Life Care. I expect to graduate in the first half of 2027.

You can find more about my work on the [Research]({{ '/research/' | relative_url }}) and [Publications]({{ '/publications/' | relative_url }}) pages, or see my [CV]({{ '/cv/' | relative_url }}).

## Research interests

{% for interest in profile.research_interests %}
- {{ interest }}
{% endfor %}

## Current work

{% for project in profile.research %}
- [{{ project.title }}]({{ '/research/' | relative_url }}#{{ project.slug }}). {{ project.summary }}
{% endfor %}

## Contact

[{{ profile.email }}](mailto:{{ profile.email }})
