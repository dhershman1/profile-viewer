// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/eslint', '@formkit/auto-animate'],
  devtools: { enabled: true },
  css: ['animate.css', '~/assets/css/main.css', '~/assets/css/search.css'],
  eslint: {
    config: {
      stylistic: true
    }
  }
})
