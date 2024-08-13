FROM node:20 AS builder

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

FROM node:20 as deploy

WORKDIR /app/frontend

COPY --from=builder /app/frontend/next.config.mjs ./
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/node_modules ./node_modules
COPY --from=builder /app/frontend/package.json ./package.json

EXPOSE 3000

CMD ["npm", "run", "dev"]