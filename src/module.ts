import { addPluginTemplate, defineNuxtModule } from '@nuxt/kit'
import { defaults, libraryName } from './config'
import {
  resolveComponents,
  resolveImports,
  resolveLazyload,
  resolveOptions,
  resolveStyles,
  localePlugin,
  transformPlugin
} from './core/index'
import { getLayersDir } from './utils'
import type { ModuleOptions } from './types'
export type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: libraryName,
    configKey: libraryName,
    compatibility: {
      nuxt: '>=3'
    }
  },
  defaults,
  setup (options, nuxt) {
    const layers = getLayersDir(nuxt.options._layers)

    resolveOptions()
    nuxt.options.imports.autoImport !== false && resolveImports(options)
    nuxt.options.components !== false && resolveComponents(options)
    options.lazyload && addPluginTemplate(resolveLazyload(options))

    nuxt.hook('vite:extendConfig', (config, { isClient }) => {
      const mode = isClient ? 'client' : 'server'

      config.plugins = config.plugins || []
      config.plugins.push(
        transformPlugin.vite({
          layers,
          include: options.include,
          exclude: options.exclude,
          sourcemap: nuxt.options.sourcemap[mode],
          transformStyles: name => resolveStyles(options, name)
        })
      )

      if (options.defaultLocale && options.defaultLocale !== 'zh-CN') {
        config.plugins.push(localePlugin.vite({
          sourcemap: nuxt.options.sourcemap[mode],
          locale: options.defaultLocale
        }))
      }
    })

    nuxt.hook('webpack:config', (configs) => {
      configs.forEach((config) => {
        const mode = config.name === 'client' ? 'client' : 'server'

        config.plugins = config.plugins || []
        config.plugins.push(
          transformPlugin.webpack({
            layers,
            include: options.include,
            exclude: options.exclude,
            sourcemap: nuxt.options.sourcemap[mode],
            transformStyles: name => resolveStyles(options, name)
          })
        )

        if (options.defaultLocale && options.defaultLocale !== 'zh-CN') {
          config.plugins.push(localePlugin.webpack({
            sourcemap: nuxt.options.sourcemap[mode],
            locale: options.defaultLocale
          }))
        }
      })
    })
  }
})
