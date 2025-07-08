FROM node:18-alpine AS base

WORKDIR /app

COPY ../../package*.json ./
COPY ../../nx.json ./
COPY ../../tsconfig*.json ./

RUN npm install -g pnpm
RUN pnpm install

COPY ../../ .

EXPOSE 3000

CMD ["npm", "run", "start:backend"]
