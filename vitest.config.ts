import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./vitest.setup.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        ".next/",
        "out/",
        "posts/",
        "public/",
        "*.config.{js,ts}",
        "vitest.setup.ts",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./"),
    },
  },
});
