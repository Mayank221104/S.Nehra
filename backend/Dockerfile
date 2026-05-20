FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx prisma generate
RUN npx esbuild dev-api.ts --bundle --platform=node --format=cjs --packages=external --sourcemap --outfile=dist/server.cjs
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/prisma ./prisma
RUN npm ci --omit=dev && npx prisma generate

EXPOSE 5000
CMD ["node", "dist/server.cjs"]