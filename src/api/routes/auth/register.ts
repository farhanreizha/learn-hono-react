import { prisma } from "@/config/database";
import { lucia } from "@/lib/lucia";
import { formRegister } from "@/schema/auth";
import { Context } from "@/util/type";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const register = new Hono<Context>().post(
  "/",
  zValidator("json", formRegister, (result) => {
    if (!result.success) throw new HTTPException(400, { message: result.error.message });
  }),
  async (c) => {
    const { email, password, username } = c.req.valid("json");

    try {
      const hashPassword = await Bun.password.hash(password, {
        algorithm: "bcrypt",
        cost: 12,
      });

      const user = await prisma.user.create({
        data: { name: username, email, password: hashPassword, username },
      });

      const session = await lucia.createSession(user.id, {});

      c.header("Set-Cookie", lucia.createSessionCookie(session.id).serialize(), { append: true });
      return c.json({ message: "Register Successful" }, 201);
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "P2002") {
        throw new HTTPException(403, { message: "User already exists" });
      }
      throw new HTTPException(500, { message: "An error occurred" });
    }
  }
);