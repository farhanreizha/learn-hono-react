import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const session = new Hono().get("/", async (c) => {
  const session = c.get("jwtPayload");
  if (!session) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  return c.json({ session }, 200);
});
