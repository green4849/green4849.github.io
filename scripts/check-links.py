"""Manual public-link audit. Restricted/timeout responses are not treated as broken."""
import argparse
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import ipaddress
import json
from pathlib import Path
import re
import socket
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import HTTPRedirectHandler, Request, build_opener

ROOT = Path(__file__).resolve().parents[1]

def public_url(url):
    parsed = urlsplit(url)
    if parsed.scheme != 'https' or not parsed.hostname or parsed.username or parsed.password or parsed.port not in (None, 443):
        raise ValueError('Only public HTTPS links on port 443 can be checked')
    if parsed.hostname == 'localhost' or parsed.hostname.endswith(('.localhost', '.local', '.internal')):
        raise ValueError('Local/private addresses are excluded')
    try:
        literal = ipaddress.ip_address(parsed.hostname)
    except ValueError:
        literal = None
    if literal is not None and not literal.is_global:
        raise ValueError('Local/private addresses are excluded')
    addresses = socket.getaddrinfo(parsed.hostname, 443, type=socket.SOCK_STREAM)
    if not addresses or any(not ipaddress.ip_address(address[4][0]).is_global for address in addresses):
        raise ValueError('Local/private addresses are excluded')

class PublicRedirects(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        public_url(newurl)
        return super().redirect_request(req, fp, code, msg, headers, newurl)

def check(url):
    result = {'url': url, 'checked_at': datetime.now(timezone.utc).isoformat(timespec='seconds')}
    try:
        public_url(url)
        opener = build_opener(PublicRedirects())
        request = Request(url, method='HEAD', headers={'User-Agent': 'AcademicPortfolio-LinkCheck/1.0'})
        try:
            response = opener.open(request, timeout=12)
        except HTTPError as error:
            if error.code not in (403, 404, 405, 410, 501):
                raise
            response = opener.open(Request(url, headers={'User-Agent': 'AcademicPortfolio-LinkCheck/1.0', 'Range': 'bytes=0-0'}), timeout=12)
        with response:
            result.update(status='reachable', http_status=response.status, final_url=response.url)
    except HTTPError as error:
        status = 'broken' if error.code in (404, 410) else 'restricted' if error.code in (401, 403, 429) else 'unconfirmed'
        result.update(status=status, http_status=error.code)
    except (URLError, TimeoutError, OSError, ValueError) as error:
        result.update(status='unconfirmed', detail=str(error))
    return result

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', default='.local/link-report.json')
    parser.add_argument('--strict', action='store_true', help='Fail only for confirmed 404/410 responses')
    args = parser.parse_args()
    registry = json.loads((ROOT / '_data/portfolio_links.json').read_text())
    urls = {e['url'] for e in registry['entries'] if e.get('url')}
    for source in (ROOT / '_publications').glob('*.md'):
        urls.update(re.findall(r'https://[^\s"<>]+', source.read_text().split('---', 2)[1]))
    with ThreadPoolExecutor(max_workers=4) as pool:
        results = list(pool.map(check, sorted(urls)))
    output = ROOT / args.output
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps({'checked_at': datetime.now(timezone.utc).isoformat(), 'results': results}, ensure_ascii=False, indent=2) + '\n')
    for result in results:
        print(f"{result['status']:12} {result['url']}")
    print(f'Report: {output}')
    return int(args.strict and any(r['status'] == 'broken' for r in results))

if __name__ == '__main__':
    raise SystemExit(main())
