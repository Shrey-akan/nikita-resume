FROM node:22-bookworm-slim

WORKDIR /app

RUN apt-get update \
  && apt-get install -y --no-install-recommends ca-certificates curl \
  && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN chmod +x docker-entrypoint.sh

ENV HOST=0.0.0.0
ENV PORT=8080
ENV NODE_ENV=development

EXPOSE 8080

ENTRYPOINT ["./docker-entrypoint.sh"]
