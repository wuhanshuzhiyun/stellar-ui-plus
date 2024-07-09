<<<<<<< HEAD
declare module '*.vue' {
  import type { defineComponent } from 'vue'

  const Component: ReturnType<typeof defineComponent>
  export default Component
}

=======
>>>>>>> 88be933 (feat(save): save)
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
<<<<<<< HEAD

declare module 'vue3/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements { }
  }
}
=======
>>>>>>> 88be933 (feat(save): save)
