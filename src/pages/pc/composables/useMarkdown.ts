import { computed, onMounted, ref, watch } from 'vue'
import { components, rests } from '../markdown/index'
import type { Group, MarkdownData } from '../types'
import { btnCopy } from '../markdown/requireFiles'

export default function useMarkdown(): MarkdownData {
  const active = ref<string>('handbook-介绍')

  const setActive = (value: string) => {
    window.history.pushState(null, '', `#/?active=${value}`)
    active.value = value
  }

  const activeBtns = () => {
    nextTick(() => {
      const btns = document.querySelectorAll<HTMLButtonElement>('button.code-copy-button')
      btns.forEach(btn => btn.onclick = () => btnCopy(btn))
    })
  }

  onMounted(() => {
    const query = uni.getLaunchOptionsSync().query
    if (query.active)
      active.value = query.active as string
    activeBtns()
  })

  const h5url = ref<string>('#/pages/mp/index')

  watch(active, (value) => {
    if (value.includes('handbook') || value.includes('devGuide'))
      h5url.value = '#/pages/mp/index'
    else
      h5url.value = `#/pages/mp/demo-views/${value}/${value}`

    activeBtns()
  })

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

  return {
    contents,
    viewMarkdown,
    active,
    setActive,
    h5url,
  }
}
