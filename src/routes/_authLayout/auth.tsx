import Auth from "@/page/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authLayout/auth")({
  component: Auth,
});
