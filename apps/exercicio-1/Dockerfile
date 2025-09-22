FROM node:22-alpine AS base

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY nest-cli.json tsconfig.json tsconfig.build.json ./

RUN pnpm install --frozen-lockfile

COPY apps/exercicio-1/ ./apps/exercicio-1/

FROM base AS build
RUN pnpm run build exercicio-1

FROM node:22-alpine AS production

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/nest-cli.json ./

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001
USER nestjs

EXPOSE 3000

CMD ["node", "dist/apps/exercicio-1/main"]
