import { Context } from "@/util/type";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const session = new Hono<Context>().get("/", async (c) => {
  const session = c.get("session");
  if (!session) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const user = c.get("user");
  return c.json({ user });
});
