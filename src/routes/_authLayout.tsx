import AuthLayout from "@/layout/authLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authLayout")({
  component: AuthLayout,
});
