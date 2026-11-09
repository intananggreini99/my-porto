#!/usr/bin/env bash
# Run ON the VPS (Ubuntu or Debian) once:  sudo bash deploy/install-docker.sh
# Installs Docker Engine + Compose with Docker's official script and opens the web ports.
set -euo pipefail

if ! command -v docker >/dev/null 2>&1; then
  echo "Installing Docker..."
  curl -fsSL https://get.docker.com -o /tmp/get-docker.sh
  sh /tmp/get-docker.sh
else
  echo "Docker is already installed: $(docker --version)"
fi

systemctl enable --now docker

# Let the login user run docker without sudo (takes effect after re-login)
if [ -n "${SUDO_USER:-}" ] && [ "$SUDO_USER" != "root" ]; then
  usermod -aG docker "$SUDO_USER"
  echo "Added $SUDO_USER to the docker group. Log out and back in to use docker without sudo."
fi

# Open HTTP/HTTPS if the ufw firewall is active
if command -v ufw >/dev/null 2>&1 && ufw status | grep -q "Status: active"; then
  ufw allow OpenSSH
  ufw allow 80/tcp
  ufw allow 443/tcp
  ufw allow 443/udp
  echo "ufw: opened ports 80 and 443."
fi

docker compose version
echo "Done."
