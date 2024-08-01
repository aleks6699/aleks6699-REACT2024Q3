import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['/src/setupTests.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'], // Убедитесь, что покрытие включает только файлы в src
      exclude: [
        'next.config.js',
        '**/node_modules/**',
        '**/dist/**',
        '**/build/**',
      ],
    },
    css: false,
  },
});
