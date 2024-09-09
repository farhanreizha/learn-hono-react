import { Hono } from "hono";
import { deleteCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";

export const logout = new Hono().post("/", async (c) => {
  try {
    deleteCookie(c, "token");
    return c.json({ message: "Logout Successful" }, 200);
  } catch (error) {
    throw new HTTPException(500, { message: "An error occurred" });
  }
});
