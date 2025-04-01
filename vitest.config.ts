import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, ""), // assuming your code lives in src/
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',          // simulates a browser-like environment
    setupFiles: './vitest.setup.ts',
    include: ['**/*.{test,spec}.{ts,tsx}'], // optional: test file pattern
  },
});
