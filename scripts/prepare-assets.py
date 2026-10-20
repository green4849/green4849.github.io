"""Prepare deterministic browser assets. Run before every Jekyll build/preview."""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
source = ROOT / 'assets/js/_main.js'
(ROOT / 'assets/js/site.js').write_bytes(source.read_bytes())
paths = []
for folder in ('_includes', '_layouts', '_sass', '_data', 'assets/css', 'images', 'assets/publications', 'assets/documents'):
    paths.extend(p for p in (ROOT / folder).rglob('*') if p.is_file() and p.name != 'build.json')
paths.extend([source, ROOT / 'assets/fonts/roboto/Roboto-Variable.woff2'])
digest = hashlib.sha256()
for path in sorted(set(paths)):
    digest.update(str(path.relative_to(ROOT)).encode())
    digest.update(path.read_bytes())
manifest = {'version': digest.hexdigest()[:16]}
(ROOT / '_data/build.json').write_text(json.dumps(manifest, indent=2) + '\n')
print('Prepared browser script and asset version ' + manifest['version'])
