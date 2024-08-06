FROM node:20 as builder

WORKDIR /app/builder
COPY . .

RUN npm install
RUN npm run build


FROM node:20-alpine as deploy

WORKDIR /app

COPY --from=builder /app/builder/dist ./dist
COPY --from=builder /app/builder/package.json ./

RUN npm install --prod

EXPOSE 3000

CMD ["npm", "run", "start:prod"]