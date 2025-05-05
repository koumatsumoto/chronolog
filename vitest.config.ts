// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx,js,jsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
