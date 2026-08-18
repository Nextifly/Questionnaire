# ===== BUILD STAGE =====
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# собираем Next.js
RUN npm run build


# ===== PRODUCTION STAGE =====
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# ставим только production deps
COPY package*.json ./
RUN npm install --omit=dev

# копируем build output
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./

EXPOSE 3000

CMD ["npm", "run", "start"]