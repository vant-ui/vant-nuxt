import { allImportsWithStyle, libraryName } from '../config'
import { hyphenate } from '../utils'
import type { ModuleOptions } from '../types'

export function getStyleDir (name: string) {
  return `${libraryName}/es/${hyphenate(name)}/style/index.mjs`
}

export function resolveStyles (config: ModuleOptions, name: string) {
  const { components, importStyle } = config

  if (importStyle === false) { return undefined }
  if (name in allImportsWithStyle) {
    return getStyleDir(allImportsWithStyle[name])
  }
  if (/^Van[A-Z]/.test(name) && components.includes(name.slice(3))) {
    return getStyleDir(name.slice(3))
  }
  return undefined
}
