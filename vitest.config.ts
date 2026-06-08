import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    exclude: ['e2e/**', 'node_modules/**'],
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.tsx'],
    globals: true,
    env: {
      NEXT_PUBLIC_URL_IMG: 'https://image.tmdb.org/t/p/original',
      NEXT_PUBLIC_URL: 'http://localhost:3000',
      REACT_APP_API_KEY: 'test-api-key',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
