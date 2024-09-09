import { Context } from "@/util/type";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const example = new Hono<Context>()
  .get("/", (c) =>
    c.json({
      status: true,
      message: "Hello this is api",
    })
  )
  .get("/test", (c) =>
    c.json(
      {
        ok: true,
        message: "Successfully get data",
        data: {
          title: "Title Hello World",
          desc: "Description Hello World",
        },
      },
      200
    )
  )
  .get("/auth/test/protected", (c) => {
    const session = c.get("session");
    if (!session) throw new HTTPException(401, { message: "Unauthorized" });

    const user = c.get("user");
    return c.json({
      ok: true,
      message: "Successfully get data",
      data: {
        title: `Title Hello ${user?.username ?? "World"}`,
        desc: `Description Hello ${user?.email ?? "World"}`,
      },
    });
  });
