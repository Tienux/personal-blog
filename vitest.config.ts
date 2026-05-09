import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      scripts: fileURLToPath(new URL('./assets/scripts', import.meta.url)),
      style: fileURLToPath(new URL('./assets/style', import.meta.url)),
      images: fileURLToPath(new URL('./assets/images', import.meta.url)),
    },
  },
});
