import { auth } from "@/api/routes/auth";
import { example } from "@/api/routes/example";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { jwt, JwtVariables } from "hono/jwt";

const app = new Hono<{ Variables: JwtVariables }>().basePath("/api");

app
  .use(logger())
  .use(csrf())
  .use(
    cors({
      origin: (origin) => origin,
      allowHeaders: ["Content-Type", "X-CSRF-Token", "x-csrf-token"],
      credentials: true,
    })
  )
  .use(
    "/auth/*",
    jwt({
      secret: Bun.env.AUTH_SECRET || "",
    })
  );

const route = app.route("/", example).route("/", auth);

export type ServerType = typeof route;

export default app;
