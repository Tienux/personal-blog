import { fileURLToPath } from 'node:url';
export default defineNuxtConfig({
  compatibilityDate: '2026-01-13',
  runtimeConfig: {
    public: {
      siteUrl: 'https://example.com',
      siteName: 'Etienne Portron - Portfolio & Blog',
      defaultOgImage: '/og-image.jpg',
    },
  },
  app: {
    head: {
      titleTemplate: '%s | Etienne Portron',
      meta: [
        { name: 'description', content: 'Portfolio et blog tech d Etienne Portron.' },
        { property: 'og:title', content: 'Etienne Portron - Portfolio & Blog' },
        { property: 'og:description', content: 'Portfolio et blog tech d Etienne Portron.' },
        { property: 'og:image', content: '/og-image.jpg' },
        { property: 'og:type', content: 'website' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
    },
  },
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
