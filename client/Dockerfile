# Stage 1: Build Stage
FROM node:20-slim AS builder
WORKDIR /app

# Install build essentials for native modules
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json* ./

# Use npm install to allow correct binary resolution for Linux
RUN npm install

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

# Explicitly build for production
RUN npm run build

# Stage 2: Runner Stage
FROM node:20-slim AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV PORT 6866
ENV HOSTNAME "0.0.0.0"

EXPOSE 6866

CMD ["node", "server.js"]
