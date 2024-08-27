// vite.config.ts
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  /**
   * Registers the TanStackRouterVite and viteReact plugins with Vite.
   *
   * The TanStackRouterVite plugin enables the use of the TanStack Router library in the Vite-based application.
   * The viteReact plugin enables the use of React in the Vite-based application.
   */
  plugins: [TanStackRouterVite(), viteReact()],
  /**
   * Configures a proxy server for the Vite development server.
   *
   * The proxy is set up to forward requests to `/api` to `http://localhost:3000`. This allows the Vite development server to proxy API requests to a separate backend server running on `localhost:3000`.
   *
   * The `changeOrigin` option is set to `true` to ensure the correct origin is used when forwarding the requests.
   */
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  /**
   * Configures the Vite resolver to use an alias for the `@` symbol, pointing it to the `src` directory of the project.
   * This allows importing files from the `src` directory using the `@` prefix, instead of having to use relative paths.
   */
  resolve: {
    alias: {
      "@": process.cwd() + "/src",
    },
  },
});
