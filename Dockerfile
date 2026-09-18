# unierp-corporate-website (marketing-site) — L4 — Presentation.
#
# Built from THIS repository alone; `@kannan19302/*` comes from the registry / localpkgs.
#
#   docker build -t unierp-marketing-site .

# ── build ───────────────────────────────────────────────────────────────────
FROM node:22-slim AS builder
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./
COPY prisma ./prisma

ARG UNIERP_REGISTRY=https://registry.npmjs.org/
RUN printf '@kannan19302:registry=%s\nregistry=https://registry.npmjs.org/\n' "$UNIERP_REGISTRY" > .npmrc \
 && rm -f package-lock.json \
 && npm install --no-audit --no-fund --legacy-peer-deps

RUN npx prisma generate

COPY tsconfig.json next.config.mjs next-env.d.ts ./
COPY app ./app
COPY lib ./lib
COPY components ./components
COPY public ./public

# ── local package build (DEV ONLY) ──────────────────────────────────────────
#
# Build shared and design-system from local workspace sources.
# Sources come from the `localpkgs` named build context (repo root, wired in infra/docker-compose.platform.yml).
FROM node:22-slim AS localpkgs-build
WORKDIR /build

COPY --from=localpkgs shared/package.json shared/tsconfig.json shared/tsconfig.base.json ./shared/
COPY --from=localpkgs shared/src ./shared/src
RUN cd shared && npm install --no-audit --no-fund --legacy-peer-deps && npm run build

COPY --from=localpkgs design-system/package.json design-system/tsconfig.json design-system/tsconfig.base.json design-system/tsconfig.build.json design-system/.token-baseline.json ./ui/
COPY --from=localpkgs design-system/src ./ui/src
COPY --from=localpkgs design-system/scripts ./ui/scripts
RUN cd ui && npm install --no-audit --no-fund --legacy-peer-deps && npm run build

# ── local package overlay (DEV ONLY) ────────────────────────────────────────
FROM builder AS localdeps
COPY --from=localpkgs-build /build/shared/package.json /tmp/shared/package.json
COPY --from=localpkgs-build /build/shared/dist /tmp/shared/dist
COPY --from=localpkgs-build /build/shared/node_modules /tmp/shared/node_modules
COPY --from=localpkgs-build /build/ui/package.json /tmp/ui/package.json
COPY --from=localpkgs-build /build/ui/dist /tmp/ui/dist
COPY --from=localpkgs-build /build/ui/node_modules /tmp/ui/node_modules
RUN rm -rf node_modules/@kannan19302/shared node_modules/@kannan19302/ui \
 && mkdir -p node_modules/@kannan19302 \
 && mv /tmp/shared node_modules/@kannan19302/shared \
 && mv /tmp/ui node_modules/@kannan19302/ui

# ── dev ─────────────────────────────────────────────────────────────────────
FROM localdeps AS dev
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--max-old-space-size=8192
EXPOSE 4000
CMD ["npx", "next", "dev", "-p", "4000", "-H", "0.0.0.0"]

# ── build ───────────────────────────────────────────────────────────────────
FROM builder AS prod-builder
ENV NODE_ENV=development
ARG API_URL=http://api:3001
ARG IDP_URL=http://idp:3005
ENV API_URL=$API_URL
ENV IDP_URL=$IDP_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--max-old-space-size=8192
RUN npm run build

# ── runner ──────────────────────────────────────────────────────────────────
FROM node:22-slim AS runner
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
ENV PORT=4000

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs

COPY --from=prod-builder /app/public ./public
COPY --from=prod-builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=prod-builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=prod-builder /app/prisma ./prisma
COPY --from=prod-builder /app/node_modules/@prisma ./node_modules/@prisma

USER nextjs
EXPOSE 4000

CMD ["node", "server.js"]
