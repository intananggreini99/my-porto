#!/bin/sh
# Runs automatically when the nginx container starts (/docker-entrypoint.d).
# Replaces the __SITE_URL__ placeholder in the SEO files with $SITE_URL,
# e.g. SITE_URL=https://intan.my.id -> canonical URL, og:image, sitemap.
# With SITE_URL empty, the links simply become relative ("/...").
set -eu

ROOT="${SITE_ROOT:-/usr/share/nginx/html}"
URL="${SITE_URL:-}"
URL="${URL%/}"                                   # drop a trailing slash
URL=$(printf '%s' "$URL" | sed 's/[&#\\]/\\&/g')  # escape sed specials

for f in "$ROOT/index.html" "$ROOT/robots.txt" "$ROOT/sitemap.xml"; do
    [ -f "$f" ] && sed -i "s#__SITE_URL__#${URL}#g" "$f"
done

echo "40-site-url.sh: SITE_URL=${SITE_URL:-<not set, using relative links>}"
