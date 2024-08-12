FROM node:20 as builder

WORKDIR /app/frontend

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as deploy

WORKDIR /app/frontend

COPY --from=builder /app/frontend/next.config.mjs ./
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/package.json ./package.json

RUN npm install --prod

EXPOSE 3000

CMD ["npm", "start"]