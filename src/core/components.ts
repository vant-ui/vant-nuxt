import { addComponent } from '@nuxt/kit'
import { libraryName } from '../config'
import { hyphenate, toArray } from '../utils'
import type { Options } from '../types'

export function resolveComponents (config: Options) {
  const { components, excludeExports } = config

  components.forEach((item) => {
    const [name, alias, from] = toArray(item)
    if (excludeExports.includes(name)) { return }
    const filePath =
      !from || from === libraryName
        ? `${libraryName}/es/${hyphenate(name)}/${name}`
        : from

    addComponent({
      name: alias || `Van${name}`,
      filePath
    })
  })
}
