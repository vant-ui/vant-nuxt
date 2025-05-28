import { createUnplugin } from 'unplugin'
import MagicString from 'magic-string'
import type { NuxtOptions } from '@nuxt/schema'
import { createResolver } from '@nuxt/kit'
import { allImportsWithStyle, libraryName } from '../config'
import { camelize, genSideEffectsImport, toRegExp } from '../utils'
import type { TransformOptions } from '../types'

interface PluginOptions extends TransformOptions {
  layers: string[]
  sourcemap?: NuxtOptions['sourcemap']['client']
  transformStyles: (name: string) => undefined | string
}

const componentsRegExp =
  /(?<=[ (])_?resolveComponent\(\s*["'](lazy-|Lazy)?([^'"]*?)["'][\s,]*[^)]*\)/g
const importsRegExp = toRegExp(Object.keys(allImportsWithStyle), 'g')

export const transformPlugin = createUnplugin((options: PluginOptions) => {
  const { layers, include, exclude, transformStyles } = options

  return {
    name: `${libraryName}:transform`,
    enforce: 'post',
    transformInclude (id) {
      if (layers.some(layer => id.startsWith(layer))) {
        return true
      }
      if (exclude.some(pattern => id.match(pattern))) {
        return false
      }
      if (include.some(pattern => id.match(pattern))) {
        return true
      }
    },
    async transform (code, id) {
      const { resolvePath } = createResolver(import.meta.url)
      const styles = new Set<string>()
      const s = new MagicString(code)

      s.replace(componentsRegExp, (full, lazy, name) => {
        styles.add(camelize(name))
        return full
      })

      s.replace(importsRegExp, (full, name) => {
        styles.add(name)
        return full
      })

      if (styles.size) {
        let imports: string = ''

        for (const name of styles) {
          const style = transformStyles(name)
          if (style) {
            const path = await resolvePath(style)
            imports += genSideEffectsImport(path)
          }
        }

        s.prepend(imports)
      }

      if (s.hasChanged()) {
        return {
          code: s.toString(),
          map: options.sourcemap
            ? s.generateMap({ source: id, includeContent: true })
            : undefined
        }
      }
    }
  }
})
