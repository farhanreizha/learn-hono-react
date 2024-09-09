import { login } from "./login";
import { register } from "./register";
import { logout } from "./logout";
import { Hono } from "hono";
import { Context } from "@/util/type";
import { session } from "./session";

export const auth = new Hono<Context>()
  .route("/login", login)
  .route("/register", register)
  .route("/auth/logout", logout)
  .route("/auth/session", session);
