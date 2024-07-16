import type { ExtractPropTypes } from 'vue'

export const pageNavProps = {
  title: String,
}

export type PageNavProps = ExtractPropTypes<typeof pageNavProps>
