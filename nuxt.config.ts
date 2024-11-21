export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui'
  ],
  runtimeConfig: {
    public: {
      wordpressUrl: process.env.WORDPRESS_URL
    }
  },
  app: {
    head: {
      title: 'Going Outs Manager',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-11-21',
  colorMode: {
    preference: 'light'
  }
})