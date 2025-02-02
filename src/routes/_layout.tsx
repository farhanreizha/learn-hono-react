import MainLayout from "@/layout/mainLayout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout")({
  component: MainLayout,
});
