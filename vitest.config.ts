import { defineConfig } from "vitest/config";
import path from "node:path";
import { readFileSync } from "node:fs";

// Load .env before setup.ts so DATABASE_URL etc. are available.
// Vitest's built-in env loading runs after setupFiles, so we parse manually.
function loadDotEnv(file: string) {
  try {
    const lines = readFileSync(file, "utf8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      // Only set if not already in the environment
      if (!(key in process.env)) {
        process.env[key] = val;
      }
    }
  } catch {
    // .env file may not exist — that's fine
  }
}

loadDotEnv(path.resolve(__dirname, ".env.local"));
loadDotEnv(path.resolve(__dirname, ".env"));

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts", "lib/__tests__/**/*.test.ts", "app/**/__tests__/**/*.test.ts"],
    setupFiles: ["tests/setup.ts"],
  },
});
