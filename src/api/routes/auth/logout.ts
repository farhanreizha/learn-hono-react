import { prisma } from "@/config/database";
import { lucia } from "@/lib/lucia";
import { Context } from "@/util/type";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const logout = new Hono<Context>().post("/", async (c) => {
  const session = c.get("session");
  if (!session) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  await Promise.all([prisma.session.delete({ where: { id: session.id } }), c.set("session", null)]);

  c.header("Set-Cookie", lucia.createBlankSessionCookie().serialize(), { append: true });

  return c.json({ success: true });
});
