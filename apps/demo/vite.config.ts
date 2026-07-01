import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { appBuildOptions } from "../../vite.app-build";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: appBuildOptions,
  test: {
    environment: "jsdom",
    setupFiles: "../../vitest.setup.ts"
  }
});
