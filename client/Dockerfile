# ---------- Build stage ----------
FROM node:20 AS build
WORKDIR /app

# Copy only package.json (NOT package-lock.json)
COPY package.json ./

# Install dependencies - npm sẽ tự động tạo lock file mới cho Linux
RUN npm install

# Copy source code
COPY . .

# Build Next.js app
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# ---------- Run stage ----------
FROM node:20-slim
WORKDIR /app

# Cấu hình Timezone
ENV TZ=Asia/Ho_Chi_Minh
RUN apt-get update && apt-get install -y tzdata && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV production

# Copy standalone build and static assets
COPY --from=build /app/public ./public
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

# Set permission (đảm bảo hoàn hảo về bảo mật)
RUN groupadd --system --gid 1001 nodejs && \
    useradd --system --uid 1001 nextjs && \
    chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 6866
ENV PORT 6866
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
