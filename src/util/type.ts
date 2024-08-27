import type { QueryClient } from "@tanstack/react-query";
import { AuthContextI } from "@/context/authContext";

export type Iroot = {
  auth: AuthContextI;
  queryClient: QueryClient;
};
