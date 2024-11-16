import { addImportsSources } from '@nuxt/kit'
import { libraryName } from '../config'
import type { ModuleOptions } from '../types'

export function resolveImports (config: ModuleOptions) {
  const { imports } = config

  addImportsSources({
    from: libraryName,
    imports
  })
}
