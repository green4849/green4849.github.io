# So Yeong Park — Academic Pages

Academic website based on [Academic Pages](https://github.com/academicpages/academicpages.github.io).

## Pages
- About: `_pages/about.md`
- Research: `_pages/research.html`
- Publications: `_pages/publications.html`
- CV: `_pages/cv.html`

Shared profile data: `_data/profile.json`.
Publication records: `_publications/`. The CV and publication list use the same records.

## Preview
Requires Ruby 3.3 and Bundler.
```sh
bundle install
bundle exec jekyll serve --host 127.0.0.1
```
Open http://127.0.0.1:4000.

## Build
```sh
JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter
python3 scripts/check-site.py
```
Pull requests build without deploying. Merging to main publishes through GitHub Pages.

## Updating content
- Copy a file in `_publications/` to add an entry; preserve its status and presentation type.
- `sort_order` controls ordering without inventing an exact publication date.
- English and Korean PDF files are existing static snapshots. Website edits do **not** regenerate them.
- Korean HTML CV: `/cv/ko/`. Former English address `/cv/en/` redirects to `/cv/`.
- The sidebar uses the user-supplied portrait in `images/so-yeong-park.jpg`, preserving its original aspect ratio. To replace it, update `author.avatar` in `_config.yml` and the image dimensions in `_includes/author-profile.html`.

## Design
Uses Academic Pages for the page structure, sidebar, navigation, colors, and theme switcher. Typography in `assets/css/profile.css` follows the supplied Han Zhang reference: locally hosted Roboto, a light body weight, a 1000px container, and compact publication entries. Contact links form a horizontal icon row with accessible labels and hover titles. See `DESIGN_NOTES.md` for the source measurements and adaptations.

Academic Pages / Minimal Mistakes: MIT license in `LICENSE`.
Printable CV and font credits: `cv/THIRD_PARTY.md`.
Roboto: SIL Open Font License in `assets/fonts/roboto/OFL.txt`.
