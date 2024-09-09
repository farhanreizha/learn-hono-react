import { example } from "@/api/routes/example";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";
import { Context } from "@/util/type";
import { cors } from "hono/cors";
import { auth } from "./routes/auth";
import middleware from "./middleware";
// import { lucia } from "@/lib/lucia";
// import { getCookie } from "hono/cookie";

const app = new Hono<Context>()
  .basePath("/api")
  .use(logger())
  .use(csrf())
  .use("/auth/*", middleware)
  .use(
    cors({
      origin: "*",
      allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      exposeHeaders: ["Content-Length", "X-JSON"],
      maxAge: 600,
    })
  );

app.route("/", example).route("/", auth);

export default app;
