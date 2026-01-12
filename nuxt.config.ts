
import { fileURLToPath } from 'node:url'
export default defineNuxtConfig({
  alias: {
    'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
    'images': fileURLToPath(new URL('./assets/images', import.meta.url)),
  },
})