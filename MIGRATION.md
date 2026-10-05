# Migration record

Source: https://green4849.github.io/
Source repository commit: 65d84a1b1f89f123378fc274f8997aa130406e8d

The existing homepage and data.js supplied research, publications, awards, scholarships, and activities. The English CV supplied education, advisor, complete author lists, and presentation dates. Existing PDF files were preserved byte-for-byte.

Kept accepted / in-press status, first/third-author labels, H1 2027 expected graduation, and the ground-truth-review condition on the 0.9897 correction metric. No new DOI, paper PDF, Scholar, LinkedIn, or project-code links were invented. Public source claims were migrated, not independently verified. The source had no profile photograph, so the sidebar has no avatar.

Four main pages and six publication detail pages share profile and publication data. Static PDF snapshots and the preserved Korean HTML CV remain separate. Review GPA, credits, publication status, and ongoing projects when updating.

Template source commit: 1629ef8af8756d964ca75d0928291ce28aef16d0

Design revision: restored the template's typography, colors, layout, navigation, and theme behavior. Removed the custom monogram, serif headings, green palette, tag badges, and button styling. Email, GitHub, and CV PDF links use a horizontal icon row with accessible labels.

Validation: Jekyll production build and the 15-page internal-link/content audit passed locally. English and Korean source PDF checksums match. Browser visual QA was unavailable because the browser security policy check could not complete.

Typography revision: after further user feedback, compared the reference site's actual HTML and stylesheet against Academic Pages and the local draft. Applied locally hosted Roboto at 16px, weight 320, line-height 1.5; 1000px container; compact paper metadata and underlined self-authorship. Kept Academic Pages navigation, sidebar, and separate pages. Details and limitations are in DESIGN_NOTES.md.

Profile update: added the portrait supplied by the user, unchanged, above the sidebar name. The original 1080×1370 aspect ratio is preserved at 160px wide on desktop and 120px on mobile. Replaced the purple heart favicon with the requested 🌿 emoji.

CV refinement: reused the original English CV research summary; shared profile identity, affiliation, and research interests across pages. Added the Korean name and contact details to the web CV. Grouped journal articles, conference papers, and posters; retained known presentation dates and acceptance/award qualifiers without repeated date labels. Separated teaching, leadership/service, and selected activities. No new credentials or current-status claims were added. Static PDFs remain the supplied snapshots.
