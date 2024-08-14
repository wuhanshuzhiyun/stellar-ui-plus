import { ref } from 'vue'

export default function useData() {
  const thas = ref<globalThis.ComponentPublicInstance | null>()
  const setThas = (has: globalThis.ComponentPublicInstance | null | undefined) => (thas.value = has)

  const dataActive = ref<string | number>(0)
  const setDataActive = (index: string | number) => (dataActive.value = index)

  const viewScrollLeft = ref(0)
  const setViewScrollLeft = (left: number) => (viewScrollLeft.value = left)

  const scrollLeft = ref(0)
  const setScrollLeft = (left: number) => (scrollLeft.value = left)

  const showComponent = ref(false)
  const setShowComponent = (show: boolean) => (showComponent.value = show)

  const listBoxEl = ref<UniApp.NodeInfo>()
  const setListBoxEl = (el: UniApp.NodeInfo) => (listBoxEl.value = el)

  const listEl = ref<UniApp.NodeInfo>()
  const setListEl = (el: UniApp.NodeInfo) => (listEl.value = el)

  const tabEls = ref<UniApp.NodeInfo[]>([])
  const setTabEls = (el: UniApp.NodeInfo[]) => (tabEls.value = el)

  const openPullDown = ref(false)
  const setOpenPullDown = (open: boolean) => (openPullDown.value = open)

  const pullTransform = ref(false)
  const setPullTransform = (transform: boolean) => (pullTransform.value = transform)

  const updateChildrenTimeout = ref(0)
  const setUpdateChildrenTimeout = (callback: () => void, timeout: number) => {
    clearTimeout(updateChildrenTimeout.value)
    updateChildrenTimeout.value = setTimeout(callback, timeout)
  }

  const updateTabsTimeout = ref(0)
  const setUpdateTabsTimeout = (callback: () => void, timeout: number) => {
    clearTimeout(updateTabsTimeout.value)
    updateTabsTimeout.value = setTimeout(callback, timeout)
  }

  return {
    thas,
    setThas,
    dataActive,
    setDataActive,
    viewScrollLeft,
    setViewScrollLeft,
    scrollLeft,
    setScrollLeft,
    showComponent,
    setShowComponent,
    listBoxEl,
    setListBoxEl,
    listEl,
    setListEl,
    tabEls,
    setTabEls,
    openPullDown,
    setOpenPullDown,
    pullTransform,
    setPullTransform,
    setUpdateChildrenTimeout,
    setUpdateTabsTimeout,
  }
}
