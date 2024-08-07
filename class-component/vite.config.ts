/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { vitePlugin as remix } from '@remix-run/dev';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    !process.env.VITEST
      ? remix({
          appDirectory: 'src/app',
        })
      : react(),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
    },

    env: loadEnv('test', process.cwd(), ''),
  },
});
