import { prisma } from "@/config/database";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { formRegister } from "@/schema/auth";
import { HTTPException } from "hono/http-exception";

export const auth = new Hono().post(
  "/register",
  zValidator("json", formRegister, (result) => {
    if (!result.success) throw new HTTPException(400, { message: result.error.message });
  }),
  async (c) => {
    const { email, password, username } = c.req.valid("json");
    if (!email || !password) throw new HTTPException(400, { message: "Email and password are required" });

    if (!username) throw new HTTPException(400, { message: "Username is required" });

    const hashPassword = await Bun.password.hash(password, {
      algorithm: "bcrypt",
      cost: 12,
    });

    try {
      await prisma.user.create({
        data: {
          name: username,
          email,
          password: hashPassword,
          username,
        },
      });

      return c.json({ message: "Register Successful" }, 201);
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "P2002") {
        throw new HTTPException(403, { message: "Email already exists" });
      }

      throw new HTTPException(500, { message: "An error occurred during registration" });
    }
  }
);
