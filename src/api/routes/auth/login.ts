import { prisma } from "@/config/database";
import { lucia } from "@/lib/lucia";
import { formLogin } from "@/schema/auth";
import { Context } from "@/util/type";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const login = new Hono<Context>().post("/", zValidator("json", formLogin), async (c) => {
  const { emailOrUsername, password } = c.req.valid("json");

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
    },
  });

  if (!existingUser || !(await Bun.password.verify(password, existingUser.password))) {
    throw new HTTPException(401, { message: "Invalid credentials" });
  }

  const session = await lucia.createSession(existingUser.id, {});

  c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), { append: true });

  return c.json({ userId: existingUser.id });
});
