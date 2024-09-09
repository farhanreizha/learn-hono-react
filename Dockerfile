FROM oven/bun

WORKDIR /app

COPY . .

RUN bun install

EXPOSE 5173
