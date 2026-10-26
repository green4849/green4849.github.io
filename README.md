# So Yeong Park — Academic Pages

Academic website based on [Academic Pages](https://github.com/academicpages/academicpages.github.io).

## Pages
- Home (one page): `_pages/about.html` — About, Research, Publications, Awards & honors and Contact sections. The navigation links to their anchors (`/#research`, `/#publications`, `/#awards`).
- `/research/`, `/publications/`, `/awards/` are redirects to those anchors (`_layouts/redirect.html` keeps an old link's `#fragment`).
- CV: `_pages/cv.html`

Shared profile data: `_data/profile.json`.
Publication records: `_publications/`. The CV and publication list use the same records.

## Preview and build
Requires Ruby 3.3/Bundler, Python 3 and Node.js 22 or newer.
```sh
bundle install
npm ci
bash scripts/site.sh serve
```
Open http://127.0.0.1:4187. For a production build, use `bash scripts/site.sh build`.

The shared command regenerates portrait sizes/social preview, copies the browser source, derives asset versions, validates stable IDs and files, builds Jekyll, and checks rendered pages. CI runs the same command. PRs build without deploying; main publishes through GitHub Pages.

## Owner workflow
- [Update guide](docs/UPDATE_GUIDE.md): where to edit, preview, publish, check sources and restore a previous version.
- [Content management design](docs/CONTENT_MANAGEMENT_DESIGN.md): specification for the next local editing dashboard and material library. The editing UI is not implemented yet.
- Run `bash scripts/site.sh links` for a manual external-link report in `.local/link-report.json`, or use the **Check external resource links** GitHub Action. Access restrictions/timeouts are reported separately from 404/410. No recurring schedule is configured.
- Keep private originals, notes, drafts and reports in ignored `.local/`; it is also excluded from site output.

## Updating content
- Copy a file in `_publications/` to add an entry; preserve its status and presentation type.
- `sort_order` controls ordering without inventing an exact publication date.
- Use optional `resources` entries (`label`, `url`) for the plain Paper / Code / Poster / Slides link row. Include only available artifacts; local publication assets live in `assets/publications/`. Keep detail bodies brief: one source figure, a short overview, and relevant links.
- `citation_date` contains the date shown in references; `citation_note` contains awards or acceptance status. Keep unknown dates at year precision.
- Introduction, research interests, CV identity, and sidebar affiliation draw from `_data/profile.json`.
- Keep item and publication `id` values stable when changing titles. Link records use `item_id`; award/publication relationships use `award_id`. Legacy `match` fields are historical notes, not lookup keys.
- `_data/portfolio_links.json` is the reusable link registry for awards, scholarships and activities. Update this file whenever matching a new article or document; Awards and CV read it through `_includes/portfolio-link.html`. Prefer matching external news outlets over university news for press links; preserve replaced university sources in `previous_sources`. Store the exact profile matching fields, an absolute URL, source/date, verification status and evidence. Use `placement: title` for direct resources, `context` / `Event coverage` for event reports that do not name the recipient, and `none` with a null URL for unresolved matches. Never replace an unresolved personal award with an unrelated recipient’s article.
- `_data/award_publications.yml` connects verified awards to their related publications in both directions.
- English and Korean PDF files are existing static snapshots. Website edits do **not** regenerate them.
- Korean HTML CV: `/cv/ko/`. Former English address `/cv/en/` redirects to `/cv/`.
- The sidebar uses the user-supplied portrait in `images/so-yeong-park.jpg`, preserving its original aspect ratio. The source is selected in `_data/media.json`; the build regenerates responsive WebP/JPEG copies and derives image dimensions automatically. The source aspect ratio is preserved.

## Design
Uses Academic Pages for the page structure, sidebar, navigation, colors, and theme switcher. Typography in `assets/css/profile.css` follows the supplied Han Zhang reference: locally hosted Roboto, a light body weight, a 1000px container, and compact publication entries. Contact links form a horizontal inline-SVG icon row with accessible labels and hover titles. Native menu/theme buttons work without an icon font or third-party JavaScript bundle. A single 925px breakpoint switches between the sidebar grid and compact profile row. Text/link contrast, first-paint theme selection, reduced-motion and keyboard focus are handled in the shared CSS/JavaScript. See `DESIGN_NOTES.md` for the source measurements and adaptations.

Academic Pages / Minimal Mistakes: MIT license in `LICENSE`.
Printable CV and font credits: `cv/THIRD_PARTY.md`.
Roboto: SIL Open Font License in `assets/fonts/roboto/OFL.txt`.
