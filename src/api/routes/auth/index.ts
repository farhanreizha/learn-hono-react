import { Hono } from "hono";
import { login } from "./login";
import { register } from "./register";
import { logout } from "./logout";
import { session } from "./session";

export const auth = new Hono().route("/login", login).route("/register", register).route("/auth/logout", logout).route("/auth/session", session);
