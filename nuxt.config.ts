import { fileURLToPath } from 'node:url';
export default defineNuxtConfig({
  compatibilityDate: '2026-01-13',
  alias: {
    style: fileURLToPath(new URL('./assets/style', import.meta.url)),
    images: fileURLToPath(new URL('./assets/images', import.meta.url)),
    scripts: fileURLToPath(new URL('./assets/scripts', import.meta.url)),
    constants: fileURLToPath(new URL('./app/constants', import.meta.url)),
  },
  modules: ['@nuxtjs/i18n'],

  i18n: {
    locales: [
      {
        code: 'fr',
        iso: 'fr-FR',
        name: 'Français',
        file: 'fr.json',
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
      },
    ],
    lazy: true,
    langDir: 'locales',
    defaultLocale: 'fr',
    strategy: 'prefix_except_default', // /about (fr) et /en/about (en)
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
  },
});
