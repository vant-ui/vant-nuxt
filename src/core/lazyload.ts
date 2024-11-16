import { libraryName } from '../config'
import { isObject } from '../utils'
import type { ModuleOptions } from '../types'

export function resolveLazyload (config: ModuleOptions) {
  const { lazyload } = config
  const options = isObject(lazyload) ? `, ${JSON.stringify(lazyload)}` : ''

  return {
    filename: `${libraryName}-lazyload.plugin.mjs`,
    getContents: () => `import { defineNuxtPlugin } from '#imports';
import { Lazyload } from 'vant';

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Lazyload${options});
})
`
  }
}
