FROM node:20 as builder

WORKDIR /app/backend/builder
COPY . .

RUN npm install
RUN npm run build


FROM node:20-alpine as deploy

WORKDIR /app/backend

COPY --from=builder /app/backend/builder/dist ./dist
COPY --from=builder /app/backend/builder/package.json ./

RUN npm install --prod

EXPOSE 3000

CMD ["npm", "run", "start:prod"]