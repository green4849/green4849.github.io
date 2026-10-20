#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
case "${1:-build}" in
  build|serve)
    npm run assets:media
    python3 scripts/prepare-assets.py
    ruby scripts/check-data.rb
    node --check assets/js/_main.js
    if [ "${1:-build}" = "serve" ]; then
      bundle exec jekyll serve --host 127.0.0.1 --port "${SITE_PORT:-4187}"
    else
      JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter
      python3 scripts/check-site.py
    fi
    ;;
  links) python3 scripts/check-links.py ;;
  *) echo "Usage: bash scripts/site.sh [build|serve|links]" >&2; exit 2 ;;
esac
