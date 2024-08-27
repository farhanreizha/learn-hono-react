import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Outlet } from "@tanstack/react-router";

export default function MainLayout() {
  return (
    <div>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
}
