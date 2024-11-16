import { addComponent, createResolver } from '@nuxt/kit'
import { libraryName } from '../config'
import { hyphenate, toArray } from '../utils'
import type { ModuleOptions } from '../types'

export function resolveComponents (config: ModuleOptions) {
  const { components, excludeExports } = config
  const { resolvePath } = createResolver(import.meta.url)

  components.forEach(async (item) => {
    const [name, alias, from] = toArray(item)
    if (excludeExports.includes(name)) { return }
    const filePath =
      !from || from === libraryName
        ? `${libraryName}/es/${hyphenate(name)}/${name}.mjs`
        : from

    addComponent({
      name: alias || `Van${name}`,
      filePath: await resolvePath(filePath)
    })
  })
}
