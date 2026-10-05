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
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
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

awards_path = ROOT / 'awards/index.html'
if awards_path in pages:
    awards_text = ' '.join(pages[awards_path].text)
    profile = json.loads(Path('_data/profile.json').read_text())
    for item in profile['awards'] + profile['scholarships']:
        for field in ('title', 'organization', 'detail'):
            if item[field] not in awards_text:
                errors.append(f'Awards page omitted {field}: {item[field]}')

paper_path = ROOT / 'publications/qwen3-asr-evaluation/index.html'
if paper_path in pages:
    paper_text = ' '.join(pages[paper_path].text)
    for term in ('nine Korean speech corpora', 'eight evaluation sets', 'NumPattern and Welfare',
                 '12.76', '12.79%', '13.89', '15.19', 'run once', 'not across all Korean speech domains'):
        if term not in paper_text:
            errors.append(f'Paper summary omitted result or scope qualifier: {term}')

for path, page in pages.items():
    text = ' '.join(page.text)
    if any(token in text for token in ('Lorem ipsum', 'Your Name', 'GitHub University', 'Professor Git')):
        errors.append(f'Template placeholder leaked: {path}')

if errors:
    raise SystemExit('\n'.join(errors))
print(f'Checked {len(pages)} HTML pages: all local links, anchors, assets, and CV content passed.')
