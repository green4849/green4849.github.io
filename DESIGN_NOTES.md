# Typography reference notes

Inspected on 2026-10-05:
- https://micohan.github.io/ and https://micohan.github.io/publications/
- https://micohan.github.io/assets/css/main.css and its Bootstrap stylesheet
- Academic Pages source at commit 1629ef8af8756d964ca75d0928291ce28aef16d0

The Han Zhang reference and Academic Pages have different typography. Copying the Academic Pages defaults alone did not reproduce the supplied personal-site reference. This revision retains Academic Pages structure while adopting the reference's text density.

| Detail | Reference source | Applied here |
| --- | --- | --- |
| Body | Roboto, weight 320, 16px, line-height 1.5 | Same; locally hosted variable font |
| Container | max-width 1000px | Same maximum for content and masthead |
| Paper title | Body-size text, `bolder`, no heading margins | 16px, weight 500, zero margins |
| Paper metadata | Consecutive divs without paragraph spacing | Paragraphs with zero margins |
| Paper separation | 1rem after list items | 1rem |
| Own name | Underline; normal font style | Underline; inherited weight |
| Publication category | 1.25rem heading, divider | 1.25rem, weight 400, divider |
| Navigation | Separate pages, lighter navigation text | Academic Pages menu, weight 400/500 |

Adaptations: no invented preview images or venue abbreviations; category names and publication statuses remain intact. Page titles are 2rem, section headings 1.25rem, and project titles 1rem. The sidebar's obsolete 70px top padding was removed for the profile without an avatar. Icon links and the purple heart favicon are retained.

Validation: production build and existing internal-link/content checks. Browser access was denied because its administrative security check could not be verified, so these are source measurements, not computed browser measurements or a completed visual comparison. Mobile wrapping and final rendered appearance still require visual review.
