# Production Dockerfile for SNEHRA
FROM node:20-alpine as base
WORKDIR /app
COPY . .
RUN npm ci --omit=dev && npm run build
EXPOSE 3000
CMD ["node", "backend/server.js"]
