import { defineNuxtConfig } from 'nuxt/config'
import Vant from '..'

export default defineNuxtConfig({
  modules: [Vant],
  vant: {
    lazyload: true,
    defaultLocale: 'en-US',
    imports: ['Locale', 'useCurrentLang']
  }
})
