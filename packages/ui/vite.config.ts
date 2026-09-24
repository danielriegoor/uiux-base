import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/bundle.ts"),
      cssFileName: "components",
      formats: ["es"],
      fileName: "index"
    },
    rolldownOptions: {
      external: [
        "@radix-ui/react-checkbox",
        "@radix-ui/react-dialog",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-select",
        "@radix-ui/react-slot",
        "@radix-ui/react-tabs",
        "@radix-ui/react-tooltip",
        "@tanstack/react-table",
        "class-variance-authority",
        "clsx",
        "lucide-react",
        "react",
        "react-dom",
        "react/jsx-runtime",
        "sonner",
        "tailwind-merge",
        "uiux-base-app-kit"
      ]
    }
  },
  test: {
    environment: "jsdom",
    setupFiles: "../../vitest.setup.ts"
  }
});
