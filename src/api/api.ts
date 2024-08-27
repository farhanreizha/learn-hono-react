import { auth } from "@/api/routes/auth";
import { example } from "@/api/routes/example";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { authHandler, initAuthConfig, verifyAuth, type AuthConfig } from "@hono/auth-js";
import Credentials from "@auth/core/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/config/database";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";

const app = new Hono().basePath("/api");

app.use(logger());
app.use(csrf());
app.use(
  cors({
    origin: (origin) => origin,
    allowHeaders: ["Content-Type", "X-CSRF-Token", "x-csrf-token"],
    credentials: true,
  })
);

const route = app
  .use(
    "/auth/*",
    initAuthConfig(
      (c): AuthConfig => ({
        secret: c.env.AUTH_SECRET,
        adapter: PrismaAdapter(prisma),
        providers: [
          Credentials({
            async authorize({ request }) {
              console.log({ request });
              return null;
              // const { email, password } = credentials as { email: string; password: string };

              // const user = await prisma.user.findUnique({
              //   where: { email },
              // });

              // if (!user) throw new HTTPException(404, { message: "User not found" });

              // const isPasswordValid = await Bun.password.verify(password, user.password);

              // if (!isPasswordValid) throw new HTTPException(403, { message: "Wrong password" });

              // return {
              //   id: user.id.toString(),
              //   email: user.email,
              //   username: user.username,
              // };
            },
          }),
        ],
        callbacks: {
          session: async ({ session, user }) => {
            return {
              ...session,
              user: {
                id: user.id,
                email: user.email,
                username: user.name,
              },
            };
          },
        },
        session: {
          strategy: "jwt",
          maxAge: 60 * 60 * 24 * 30,
        },
        useSecureCookies: true,
        pages: {
          signIn: "/auth",
        },
        redirectProxyUrl: "/",
        cookies: {
          callbackUrl: {
            name: "react-auth.callback-url",
            options: {
              httpOnly: true,
              sameSite: "lax",
              path: "/",
              secure: true,
            },
          },
          csrfToken: {
            name: "react-auth.csrf-token",
            options: {
              httpOnly: true,
              sameSite: "lax",
              path: "/",
              secure: true,
            },
          },
        },
      })
    )
  )
  .use("/auth/*", authHandler())
  .use("/auth/*", verifyAuth())
  .route("/", example)
  .route("/", auth);

export type ServerType = typeof route;

export default app;
