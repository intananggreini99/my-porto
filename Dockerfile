# ---------- 1) Build the React app (Vite + Tailwind CSS) ----------
FROM node:22-alpine AS build
WORKDIR /app

# install dependencies first so Docker can cache this layer
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY index.html vite.config.js ./
COPY src ./src
COPY public ./public
RUN npm run build

# ---------- 2) Serve the static build with nginx ----------
FROM nginx:stable-alpine

LABEL org.opencontainers.image.title="intan-portfolio" \
      org.opencontainers.image.description="Portfolio website of Intan Dwi Anggreini (React + Tailwind CSS)"

# nginx config + security headers
RUN mkdir -p /etc/nginx/snippets
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf

# Fill in SITE_URL at container start
COPY docker/40-site-url.sh /docker-entrypoint.d/40-site-url.sh
RUN chmod +x /docker-entrypoint.d/40-site-url.sh

# The built website
COPY --from=build /app/dist/ /usr/share/nginx/html/

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1/healthz || exit 1
