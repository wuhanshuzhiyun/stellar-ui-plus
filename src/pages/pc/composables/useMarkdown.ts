import { computed, ref, watch } from 'vue'
import { components, rests } from '../markdown/index'
import type { Group, MarkdownData } from '../types'

export default function useMarkdown(): MarkdownData {
  const markdown = ref<string>('')
  const active = ref<string>('handbook-介绍')
  const setActive = (value: string) => {
    active.value = value
  }

  const contents = ref<Group[]>(rests.concat(components))

  const viewMarkdown = computed(() => {
    let result = ''
    contents.value.forEach((group) => {
      group.contents.forEach((item) => {
        if (item.key === active.value)
          result = item.html
      })
    })
    return result
  })

  watch(() => active.value, (value) => {
    markdown.value = `# ${value}`
  })

  return {
    contents,
    markdown,
    viewMarkdown,
    active,
    setActive,
  }
}
