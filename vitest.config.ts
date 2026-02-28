import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    projects: [
      "frontend/vitest.config.ts",
      "packages/**/vitest.config.ts",
    ],
  },
});
