#!/usr/bin/env bash
# Upload the project to the VPS and (re)start it — run on your own computer
# (Linux, macOS, WSL or Git Bash; needs ssh + rsync).
#
#   ./deploy/deploy.sh user@VPS_IP https    # domain + automatic HTTPS (Option A)
#   ./deploy/deploy.sh user@VPS_IP http     # HTTP only (Option B)
#
# Put your .env next to this README first; it is uploaded with the project.
set -euo pipefail

TARGET="${1:?Usage: deploy.sh user@host [https|http]}"
MODE="${2:-https}"
REMOTE_DIR="${REMOTE_DIR:-~/intan-portfolio}"
cd "$(dirname "$0")/.."

echo "Uploading to $TARGET:$REMOTE_DIR ..."
ssh "$TARGET" "mkdir -p $REMOTE_DIR"
# node_modules and dist are rebuilt inside Docker, so they are not uploaded
rsync -az --delete --exclude '.git' --exclude '*.zip' --exclude 'node_modules' --exclude 'dist' ./ "$TARGET:$REMOTE_DIR/"

case "$MODE" in
  https) COMPOSE="docker compose -f docker-compose.https.yml" ;;
  http)  COMPOSE="docker compose" ;;
  *) echo "Unknown mode: $MODE (use https or http)"; exit 1 ;;
esac

echo "Building the React app and starting containers ($MODE) ..."
ssh "$TARGET" "cd $REMOTE_DIR && $COMPOSE up -d --build && $COMPOSE ps"
echo "Done."
