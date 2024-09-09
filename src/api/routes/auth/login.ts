import { prisma } from "@/config/database";
import { formLogin } from "@/schema/auth";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { setCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import { sign } from "hono/jwt";

export const login = new Hono().post("/", zValidator("json", formLogin), async (c) => {
  try {
    const { emailOrUsername, password } = c.req.valid("json");

    const user = await prisma.user.findFirst({
      where: { OR: [{ email: emailOrUsername }, { username: emailOrUsername }] },
    });

    if (!user) throw new HTTPException(404, { message: "User not found" });

    const isPasswordValid = await Bun.password.verify(password, user.password);

    if (!isPasswordValid) throw new HTTPException(403, { message: "Wrong password" });

    const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days in seconds

    const payload = {
      id: user.id,
      email: user.email,
      username: user.username,
      exp,
    };

    const token = await sign(payload, Bun.env.AUTH_SECRET || "");
    setCookie(c, "token", token);

    return c.json({ message: "Login Successful" }, 200);
  } catch (error) {
    if (error instanceof HTTPException) {
      throw error;
    }
    throw new HTTPException(500, { message: "An error occurred" });
  }
});
