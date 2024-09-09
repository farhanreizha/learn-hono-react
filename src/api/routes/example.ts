import { Hono } from "hono";

export const example = new Hono()
  .get("/", (c) =>
    c.json({
      status: true,
      message: "Hello this is api",
    })
  )
  .get("/test", (c) => {
    return c.json(
      {
        ok: true,
        message: "Successfully get data",
        data: {
          title: "Title Hello World",
          desc: "Description Hello World",
        },
      },
      200
    );
  })
  .get("/auth/test", async (c) => {
    const auth = c.get("jwtPayload");
    return c.json(
      {
        ok: true,
        message: "Successfully get data",
        data: {
          title: `Title Hello ${auth.email}`,
          desc: `Description Hello ${auth.username}`,
        },
      },
      200
    );
  });
