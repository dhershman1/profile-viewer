// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt'
  ],
  devtools: { enabled: true },
  css: ['animate.css', '~/assets/css/main.css']
})
