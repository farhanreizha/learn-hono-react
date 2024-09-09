import type { QueryClient } from "@tanstack/react-query";
import { AuthContextI } from "@/context/authContext";
import { Session, User } from "lucia";
import { Env } from "hono";

export interface Iroot {
  auth: AuthContextI;
  queryClient: QueryClient;
}
interface IVariables {
  user: User | null;
  session: Session | null;
}

export interface Context extends Env {
  Variables: IVariables;
}
