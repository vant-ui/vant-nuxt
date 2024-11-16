import { defineNuxtConfig } from 'nuxt/config'
import Vant from '../src/module'

export default defineNuxtConfig({
  modules: [Vant],
  vant: {
    lazyload: true,
    defaultLocale: 'en-US',
    imports: ['Locale', 'useCurrentLang']
  }
})
