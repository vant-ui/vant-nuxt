import { useNuxt } from '@nuxt/kit'
import { libraryName } from '../config'

export function resolveOptions () {
  const nuxt = useNuxt()
  const regExp = new RegExp(`${libraryName}/es/.*/style/index.mjs`)

  nuxt.options.build.transpile.push(regExp)
}
