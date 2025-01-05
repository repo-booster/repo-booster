// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxt/devtools',
    '@nuxtjs/device',
    '@nuxtjs/seo',
    '@nuxtjs/sitemap'
  ],

  devtools: {
    enabled: true
  },

  app: {
    head: {
      meta: [
        { name: 'robots', content: 'noindex, nofollow' } // Default for all pages
      ]
    }
  },

  colorMode: {
    disableTransition: true
  },

  ui: {
    safelistColors: ['primary', 'red', 'orange', 'green']
  },

  routeRules: {
    '/': { prerender: true } // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
  },

  future: {
    compatibilityVersion: 4
  },

  compatibilityDate: '2025-01-02',

  typescript: {
    strict: false
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  // Add the custom main.css file
  css: ['~/assets/css/main.css'],

  sitemap: <Partial<import('@nuxtjs/sitemap').ModuleOptions>>{
    hostname: 'https://app.repo-booster.com',
    routes: [
      '/',
      '/features/analytics',
      '/features/readme-seo',
      '/features/roadmap',
      '/features/seo-toolbox',
      '/features/social-media',
      '/features/star-growth',
      '/features/updates',
      '/settings',
      '/settings/members',
      '/settings/notifications',
      '/inbox',
      '/login',
      '/signup',
      '/users'
    ]
  }
});
