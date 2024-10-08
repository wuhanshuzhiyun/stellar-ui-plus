export interface Markdown {
  html: string
}

export interface Content {
  name: string
  sort: number
  html: string
  key: string
  icon?: string
}
export interface Group {
  group: string
  key: string
  sort: number
  lock?: boolean
  contents: Content[]
}

export interface MarkdownData {
  contents: Ref<Group[]>
  active: Ref<string>
  setActive: (key: string) => void
  viewMarkdown: ComputedRef<string>
  h5url: Ref<string>
  isComponent: Ref<boolean>
}
