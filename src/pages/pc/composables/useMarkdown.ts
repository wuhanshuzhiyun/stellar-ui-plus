import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { components, rests } from '../markdown/index'
import type { Group, MarkdownData } from '../types'
import { btnCopy } from '../markdown/requireFiles'

export default function useMarkdown(): MarkdownData {
  const active = ref<string>('handbook-介绍')

  const isComponent = computed(() => !active.value.includes('handbook') && !active.value.includes('devGuide'))

  const activeBtns = () => {
    nextTick(() => {
      const btns = document.querySelectorAll<HTMLButtonElement>('button.code-copy-button')
      btns.forEach(btn => (btn.onclick = () => btnCopy(btn)))
    })
  }

  const setActive = (value: string) => {
    window.history.pushState(null, '', `#/?active=${value}`)
    active.value = value
    const d = document.querySelector('.pc-page-body>.content>.right')
    if (d)
      d.scrollTop = 0
    activeBtns()
  }

  watch(() => uni.getLaunchOptionsSync().query, (v) => {
    if (v.active)
      setActive(v.active as string)
  }, { immediate: true })

  onMounted(() => {
    activeBtns()
  })

  const h5url = computed(() => {
    if (active.value.includes('handbook') || active.value.includes('devGuide'))
      return '#/pages/mp/index'
    else return `#/pages/mp/demo-views/${active.value}/${active.value}`
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
    isComponent,
    active,
    setActive,
    h5url,
  }
}
