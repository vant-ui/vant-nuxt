/** name: export name from the library, as: the name you want to use in your project, from: the name of library */
export type PresetImport = string | [name: string, as?: string, from?: string]

/** Used to filter files that need to automatically import styles and other functions */
export interface TransformOptions {
  include: RegExp[]
  exclude: RegExp[]
}

export interface ModuleOptions extends TransformOptions {
  /**
   * Whether to automatically load lazyload directives and components.
   *
   * @default false
   *
   * @example
   * ```ts
   * lazyload: true,
   * // or
   * lazyload: { lazyComponent: true },
   * ```
   */
  lazyload: boolean | { lazyComponent?: boolean; lazyImage?: boolean }
  /**
   * Whether to automatically import style files.
   *
   * @default true
   */
  importStyle: boolean
  /**
   * Replace default locale, you can find locale list [here](https://github.com/youzan/vant/tree/main/packages/vant/src/locale/lang).
   *
   * @default 'zh-CN'
   * @example 'en-US'
   */
  defaultLocale?: string
  /**
   * Exclude exports from Vant that are not component content.
   *
   * @default ['Lazyload', 'Locale']
   */
  excludeExports: string[]
  /**
   * If there are components that are not imported automatically from Vant, you need to add the component here.
   */
  components: PresetImport[]
  /**
   * If you wish to add automatically import content from Vant, you can add it here.
   */
  imports: PresetImport[]
}
