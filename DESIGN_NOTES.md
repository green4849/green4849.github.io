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

## Quality pass — 2026-10-20

Retained the approved 16px Roboto 320 / 1.5 typography and 1000px container. Replaced inherited float/fixed sidebar layouts with a 160px sidebar + 4rem gap grid; at 924px and below the profile becomes a 120px portrait row. Unified navigation/layout breakpoint at 925px. Footer stays in normal flex document flow, removing its resize timer and overlay risk.

Text links use #276b80 on white; dark links use #8ad2e5 on #25292d. Plain inline links have underlines; paper title links retain the compact academic list treatment. Controls use native buttons, current-page ARIA, visible keyboard focus and Escape/outside-click menu dismissal. Icons are inline SVG, so no icon-font dependency. Early theme selection tolerates unavailable localStorage.

Roboto is served as WOFF2 (222,204 bytes vs 488,584-byte TTF); source supplied portrait is resized/encoded with preserved aspect ratio, responsive 160/320/480px WebP and JPEG fallback. Share preview uses the supplied portrait and existing public identity. Images regenerate from `_data/media.json` and profile data in every build; original sources remain intact.

Build/data/link/metadata checks are separate from visual checks. The app browser control timed out twice during this pass, so final desktop/mobile browser appearance has not been visually verified.
