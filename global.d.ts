declare module '*.md' {
  const attributes: Record<string, unknown>

  const toc: { level: string, content: string }[]

  const html: string

  const raw: string

  const VueComponent: ComponentOptions
  const VueComponentWith: (components: Record<string, Component>) => ComponentOptions

  export { attributes, toc, html, VueComponent, VueComponentWith }
}
declare module 'markdown-it' {
  const MarkdownIt: any
  export = MarkdownIt
}

interface Obj {
  [key: string]: any
}
