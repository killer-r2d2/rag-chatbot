// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    openaiApiKey: process.env.NUXT_OPENAI_API_KEY,
    public: {}
  },
  devtools: { enabled: false }
})