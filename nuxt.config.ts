
import { fileURLToPath } from 'node:url'
export default defineNuxtConfig({
  compatibilityDate: '2026-01-13',
  alias: {
    'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
    'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
    'scripts': fileURLToPath(new URL('./assets/scripts', import.meta.url)),
  },
})