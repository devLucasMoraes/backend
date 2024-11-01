# syntax=docker/dockerfile:1


ARG NODE_VERSION=20.18.0
ARG PNPM_VERSION=9.12.2

FROM node:${NODE_VERSION}-alpine

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

WORKDIR /app-backend

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

CMD ["pnpm", "dev"]

