/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import { vitePlugin as remix } from '@remix-run/dev';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    remix({
      appDirectory: 'src/app',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
    },
  },
});
