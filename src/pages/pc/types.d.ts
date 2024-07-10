export interface Markdown {
  html: string
}

export interface Content {
  name: string
  sort?: number | string
  html: string
  key: string
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
  markdown: Ref<string>
  active: Ref<string>
  setActive: (key: string) => void
  viewMarkdown: ComputedRef<string>
}
