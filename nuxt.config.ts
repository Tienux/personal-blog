
import { fileURLToPath } from 'node:url'
export default defineNuxtConfig({
  alias: {
    'style': fileURLToPath(new URL('./assets/style', import.meta.url)),
  },
})