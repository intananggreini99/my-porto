#!/bin/sh
# Option C helper: fills the __SITE_URL__ placeholder in a copied site folder.
# Usage: sudo sh deploy/apply-site-url.sh /var/www/intan-portfolio https://example.com
set -eu
ROOT="${1:?Usage: apply-site-url.sh <site folder> <https://your-domain>}"
URL="${2:?Usage: apply-site-url.sh <site folder> <https://your-domain>}"
SITE_ROOT="$ROOT" SITE_URL="$URL" sh "$(dirname "$0")/../docker/40-site-url.sh"
