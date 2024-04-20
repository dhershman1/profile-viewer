// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxt/eslint'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '~/assets/css/search.css'],
  eslint: {
    config: {
      stylistic: true
    }
  }
})
