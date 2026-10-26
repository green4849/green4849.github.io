"""Check rendered routes, assets, anchor links, and core migrated CV content."""
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urljoin, urlsplit

ROOT = Path('_site')
ORIGIN = 'https://green4849.github.io'


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids, self.links, self.text = set(), [], []
        self.elements = []
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.elements.append((tag, attrs))
        if tag == 'source' and 'srcset' in attrs:
            self.links.extend(item.strip().split()[0] for item in attrs['srcset'].split(','))
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for key in ('href', 'src'):
            if key in attrs:
                self.links.append(attrs[key])

    def handle_data(self, data):
        self.text.append(data)


pages = {p: Page(p.read_text()) for p in ROOT.rglob('*.html')}
errors = []
for path, page in pages.items():
    source_url = ORIGIN + '/' + str(path.relative_to(ROOT)).removesuffix('index.html')
    for link in page.links:
        parsed = urlsplit(urljoin(source_url, link))
        if parsed.scheme not in ('http', 'https') or parsed.netloc != 'green4849.github.io':
            continue
        target = ROOT / unquote(parsed.path).lstrip('/')
        if target.is_dir():
            target = target / 'index.html'
        if not target.is_file():
            errors.append(f'{path}: missing {link}')
        elif parsed.fragment and target in pages and unquote(parsed.fragment) not in pages[target].ids:
            errors.append(f'{path}: missing anchor {link}')

for route in ('index.html', 'research/index.html', 'publications/index.html', 'awards/index.html', 'cv/index.html', 'cv/en/index.html', 'cv/ko/index.html'):
    if not (ROOT / route).is_file():
        errors.append(f'Missing route: {route}')

cv_path = ROOT / 'cv/index.html'
if cv_path in pages:
    cv = ' '.join(pages[cv_path].text)
    profile = json.loads(Path('_data/profile.json').read_text())
    education = profile['education']
    for term in (education['gpa'], f"{education['credits']} credits", education['period'], '9,958', '0.9897', 'ground-truth review signals', 'Accepted', 'Third author'):
        if term not in cv:
            errors.append(f'Missing CV fact or qualifier: {term}')
    for source in Path('_publications').glob('*.md'):
        title_line = next(line for line in source.read_text().splitlines() if line.startswith('title: '))
        title = json.loads(title_line.split(': ', 1)[1])
        if title not in cv:
            errors.append(f'CV omitted publication: {title}')
        date_line = next(line for line in source.read_text().splitlines() if line.startswith('citation_date: '))
        citation_date = json.loads(date_line.split(': ', 1)[1])
        if citation_date not in cv:
            errors.append(f'CV omitted citation date: {citation_date}')
    profile = json.loads(Path('_data/profile.json').read_text())
    for category in ('awards', 'scholarships', 'activities'):
        for item in profile[category]:
            if item['title'] not in cv:
                errors.append(f'CV omitted {category} item: {item["title"]}')
    for term in (profile['name_ko'], profile['email'], 'Teaching experience', 'Leadership & service'):
        if term not in cv:
            errors.append(f'Missing CV profile field or section: {term}')

# Awards & honors live on the one-page home (/awards/ redirects to /#awards).
awards_path = ROOT / 'index.html'
if awards_path in pages:
    awards_text = ' '.join(pages[awards_path].text)
    profile = json.loads(Path('_data/profile.json').read_text())
    for item in profile['awards'] + profile['scholarships']:
        for field in ('title', 'organization', 'detail'):
            if item[field] not in awards_text:
                errors.append(f'Home awards section omitted {field}: {item[field]}')

paper_path = ROOT / 'publications/qwen3-asr-evaluation/index.html'
if paper_path in pages:
    paper_text = ' '.join(pages[paper_path].text)
    for term in ('nine Korean speech corpora', 'ten evaluation sets', 'without fine-tuning',
                 'eval_clean and eval_other', 'each model uses its best tested decoding setting on these two sets',
                 'Paper (PDF)', 'Publication record'):
        if term not in paper_text:
            errors.append(f'Paper summary omitted result or scope qualifier: {term}')

home = pages.get(ROOT / 'index.html')
if home:
    for section in ('about', 'research', 'publications', 'awards', 'contact'):
        if section not in home.ids:
            errors.append(f'Home page missing section #{section}')
    for route in ('research', 'publications', 'awards'):
        redirect = (ROOT / route / 'index.html')
        if redirect.is_file() and f'/#{route}' not in redirect.read_text():
            errors.append(f'/{route}/ must redirect to /#{route}')
    for slug in [r['slug'] for r in json.loads(Path('_data/profile.json').read_text())['research']]:
        if slug not in home.ids:
            errors.append(f'Home page missing research anchor #{slug}')

for path, page in pages.items():
    text = ' '.join(page.text)
    if any(token in text for token in ('Lorem ipsum', 'Your Name', 'GitHub University', 'Professor Git')):
        errors.append(f'Template placeholder leaked: {path}')

# Check the shared UI contract and resource mapping, without relying on display text.
registry = json.loads(Path('_data/portfolio_links.json').read_text())
for path, page in pages.items():
    if not any(tag == 'nav' and attrs.get('class') == 'site-nav' for tag, attrs in page.elements):
        continue  # Static Korean CV and redirects have independent layouts.
    for required_id in ('main', 'primary-navigation', 'theme-toggle'):
        if required_id not in page.ids:
            errors.append(f'{path}: missing shared UI landmark {required_id}')
    controls = [a for tag, a in page.elements if tag == 'button' and a.get('id') == 'theme-toggle']
    if len(controls) != 1 or 'aria-pressed' not in controls[0]:
        errors.append(f'{path}: theme control needs native button semantics')
    meta = {a.get('property', a.get('name')): a.get('content') for tag, a in page.elements if tag == 'meta'}
    for key in ('description', 'og:image', 'og:url', 'twitter:card'):
        if not meta.get(key):
            errors.append(f'{path}: missing {key} metadata')
    if any('main.min.js' in link or 'fontawesome.css' in link for link in page.links):
        errors.append(f'{path}: legacy browser bundle or icon font still loaded')
    for tag, attrs in page.elements:
        if tag == 'img' and ('width' not in attrs or 'height' not in attrs):
            errors.append(f'{path}: image dimensions must reserve layout space')
for route in ('cv/index.html', 'index.html'):
    path = ROOT / route
    if path not in pages:
        continue
    for entry in registry['entries']:
        if entry.get('url') and (route.startswith('cv/') or entry['category'] != 'activities'):
            if entry['url'] not in pages[path].links:
                errors.append(f'{path}: omitted evidence link {entry["id"]}')

if errors:
    raise SystemExit('\n'.join(errors))
print(f'Checked {len(pages)} HTML pages: all local links, anchors, assets, and CV content passed.')
