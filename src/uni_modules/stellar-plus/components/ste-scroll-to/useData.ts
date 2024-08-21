import { type ComponentInternalInstance, computed, ref, watch } from 'vue'
import type { ScrollViewOnScrollEvent } from '@uni-helper/uni-app-types'
import utils from '../../utils/utils'

export default function useData({
  thas,
  emits,
  props,
  children,
}: {
  thas: globalThis.ComponentPublicInstance | null | undefined
  emits: { (event: 'change', index: number): void, (event: 'update:active', top: number): void }
  props: { active: number, height: number | string }
  children: ComponentInternalInstance[]
}) {
  let boxHeight = 0
  let initEnd = false

  const dataActive = ref(0)
  const setDataActive = (index: number) => {
    if (dataActive.value === index)
      return
    dataActive.value = index
    emits('change', index)
    emits('update:active', index)
  }

  const childrenTops = ref<number[]>([])
  const setChildrenTops = (tops: number[]) => (childrenTops.value = tops)

  let scrollTypeTimeout = 0
  const setScrollTypeTimeout = (callback: () => void, timeout: number) => {
    clearTimeout(scrollTypeTimeout)
    scrollTypeTimeout = setTimeout(() => {
      callback()
    }, timeout)
  }

  const scrollType = ref<'scroll' | 'active' | 'init'>('init')
  const setScrollType = (type: 'scroll' | 'active' | 'init') => {
    scrollType.value = type
    if (type === 'init')
      return
    setScrollTypeTimeout(() => {
      scrollType.value = 'init'
    }, 200)
  }

  const scrollTop = ref(0)
  const setScrollTop = (top: number) => (scrollTop.value = top)

  const _scrollTop = ref(0)
  const setScrollTop_ = (top: number) => (_scrollTop.value = top)

  let childrenTimeout = 0
  const setChildrenTimeout = (callback: () => void, timeout: number) => {
    clearTimeout(childrenTimeout)
    childrenTimeout = setTimeout(() => {
      callback()
    }, timeout)
  }

  let activeTimeout = 0
  const setActiveTimeout = (callback: () => void, timeout: number) => {
    clearTimeout(activeTimeout)
    activeTimeout = setTimeout(() => {
      callback()
    }, timeout)
  }

  let scrollTopTimeout = 0
  const setScrollTopTimeout = (callback: () => void, timeout: number) => {
    clearTimeout(scrollTopTimeout)
    scrollTopTimeout = setTimeout(() => {
      callback()
    }, timeout)
  }

  const initChildren = (init?: boolean) => {
    if (init)
      initEnd = false
    if (initEnd)
      return
    setChildrenTimeout(async () => {
      const view = await utils.querySelector<false>('.ste-scroll-to-root', thas)
      const box = await utils.querySelector<false>('.ste-scroll-to-content', thas)
      if (!view || !box)
        return
      if (box.height === boxHeight)
        initEnd = true
      else boxHeight = Number(box.height)

      let max = Number(box.height) - Number(view.height) // 最大滚动距离
      if (max < 0)
        max = 0
      const tops: number[] = []
      for (let i = 0; i < children.length; i++) {
        const comp = children[i]
        const child = await utils.querySelector<false>('.ste-scroll-to-item-root', comp)
        const top = Number(child.top) - Number(box.top)
        tops.push(top > max + 10 ? max + 10 : top)
      }
      let diff = childrenTops.value.length !== tops.length
      if (!diff) {
        for (let i = 0; i < tops.length; i++) {
          if (tops[i] !== childrenTops.value[i]) {
            diff = true
            break
          }
        }
      }
      if (diff)
        setChildrenTops(tops)
    }, 50)
  }

  watch(
    () => children,
    () => {
      initChildren(true)
    },
    { immediate: true },
  )

  const setScrollTopByIndex = (index: number) => {
    setScrollTopTimeout(() => {
      if (!index) {
        setScrollTop(0)
        setScrollTop_(0)
        return
      }
      const top = childrenTops.value[index]
      if (!utils.isNum(top))
        return
      if (_scrollTop.value >= top) {
        const next = childrenTops.value[index + 1]
        if (!utils.isNum(next))
          return
        if (next > _scrollTop.value + 10)
          return
      }
      setScrollTop(top)
      setScrollTop_(top)
    }, 50)
  }
  watch(
    () => props.active,
    (v) => {
      if (dataActive.value !== v)
        setDataActive(v)
      initChildren()
    },
    { immediate: true },
  )
  watch(
    () => dataActive.value,
    (v) => {
      if (!children.length)
        return
      if (scrollType.value === 'scroll')
        return
      const top = childrenTops.value[v]
      if (!utils.isNum(top))
        return
      setScrollType('active')
      setScrollTopByIndex(v)
    },
  )

  watch(
    () => childrenTops.value,
    () => {
      if (!children.length)
        return
      setScrollType('init')
      setScrollTopByIndex(dataActive.value)
    },
  )

  const setActiveByTop = (top: number) => {
    setActiveTimeout(() => {
      if (!top) {
        setDataActive(0)
        return
      }
      for (let i = 0; i < childrenTops.value.length; i++) {
        const t = childrenTops.value[i]
        if (!utils.isNum(t))
          continue
        const next = childrenTops.value[i + 1]
        if (!utils.isNum(next) || next === top || (top >= t && next > top)) {
          setDataActive(i)
          return
        }
      }
    }, 20)
  }

  const onScroll = ({ detail }: ScrollViewOnScrollEvent) => {
    initChildren()
    setScrollTop_(detail.scrollTop)
    if (scrollType.value === 'active')
      return
    setScrollType('scroll')
    setActiveByTop(detail.scrollTop)
  }

  const cmpRootStyle = computed(() => ({ height: utils.formatPx(props.height) }))

  return { scrollTop, cmpRootStyle, onScroll, initChildren }
}
