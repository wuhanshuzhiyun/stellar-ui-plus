declare module 'vue3/jsx-runtime' {
  namespace JSX {
    interface IntrinsicElements {
      /**
       * 视图容器，和 div 类似，用于包裹各种元素内容
       *
       * 包裹文字建议使用 text
       *
       * 如果使用 div，会编译成 view
       */
      view: HTMLDivElement
      canvas: HTMLCanvasElement
    }
  }
}

interface IntrinsicElementAttributes {
  view: HTMLDivElement
  canvas: HTMLCanvasElement
}
