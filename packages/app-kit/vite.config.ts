import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index"
    },
    rolldownOptions: {
      external: [
        "@radix-ui/react-dialog",
        "lucide-react",
        "react",
        "react-dom",
        "react/jsx-runtime"
      ]
    }
  },
  test: {
    environment: "jsdom",
    setupFiles: "../../vitest.setup.ts"
  }
});
