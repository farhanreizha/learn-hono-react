import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Outlet } from "@tanstack/react-router";

export default function MainLayout() {
  return (
    <main className="flex flex-col min-h-screen max-w-7xl mx-auto">
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </main>
  );
}
