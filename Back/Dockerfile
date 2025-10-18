FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json package-lock.json ./
RUN npm install
COPY . .
ENV NODE_ENV=production

RUN apk add --no-cache docker-cli docker-cli-buildx

EXPOSE 3000
CMD ["node", "index.js"]