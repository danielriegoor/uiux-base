import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(import.meta.dirname, "src/index.ts"),
      formats: ["es"],
      fileName: "index"
    }
  },
  test: {
    environment: "jsdom",
    setupFiles: "../../vitest.setup.ts"
  }
});
