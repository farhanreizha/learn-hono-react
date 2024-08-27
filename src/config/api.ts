import { ServerType } from "@/api/api";
import { hc } from "hono/client";

const client = hc<ServerType>(`${window.location.origin}`);

export const api = client.api;
