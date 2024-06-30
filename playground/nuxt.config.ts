import { defineNuxtConfig } from 'nuxt/config'
import Vant from '..'

export default defineNuxtConfig({
  devtools: true,
  modules: [Vant],
  vant: {
    lazyload: true
  }
})
