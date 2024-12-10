import { type CSSProperties, computed, nextTick, ref, watch } from 'vue'
import utils from '../../utils/utils'
import type { TabProps } from '../ste-tab/props'
import type { SelfComponentInternalInstance } from '../../utils/mixin'
import type { UniScrollViewOnScrollEvent } from '../../types/event'
import type { SteTabsProps } from './props'

export default function useData({
  thas,
  props,
  emits,
  internalChildren,
}: {
  thas: globalThis.Ref<globalThis.ComponentPublicInstance | null | undefined>
  props: SteTabsProps
  internalChildren: SelfComponentInternalInstance[]
  emits: {
    (e: 'click-tab', tab: TabProps): void
    (e: 'update:active', active: number | string): void
    (e: 'change', tab: TabProps): void
  }
}) {
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

  const cmpShowLine = computed(() => props.type === 'line' && props.showLine && !props.showSubtitle)

  const cmpTabList = computed(() =>
    internalChildren.map((item, index) => {
      const tab: TabProps & { active: boolean } = { ...item.props } as any
      switch (typeof dataActive.value) {
        case 'string':
          tab.active = dataActive.value === tab.name
          break
        case 'number':
          tab.active = dataActive.value === index
          break
      }
      if (tab.subTitle?.length > 6)
        tab.subTitle = tab.subTitle.slice(0, 6)

      return tab
    }),
  )

  const cmpDisabledIndexs = computed(() => {
    const indexs: number[] = []
    cmpTabList.value.forEach((item, i) => {
      if (item.disabled)
        indexs.push(i)
    })
    return indexs
  })

  const cmpRootStyle = computed(() => {
    let tabCardBg = utils.Color.formatColor(props.titleColor, 0.05)
    let tabCardBgActive = utils.Color.formatColor(props.color, 0.1)
    let tabCardSubBg = props.color
    let tabCardSubColor = '#fff'
    let activeTitleColor = props.activeTitleColor
    let borderWidthStart = '0'
    let borderWidth = '0'
    if (props.type === 'card') {
      activeTitleColor = props.color
      if (props.border) {
        tabCardBg = 'none'
        tabCardBgActive = props.color
        tabCardSubBg = '#fff'
        tabCardSubColor = props.color
        activeTitleColor = '#fff'
        borderWidthStart = '1px'
        borderWidth = '1px 1px 1px 0'
        if (Number(props.tabSpace) > 0)
          borderWidth = '1px'
      }
    }
    const tabSpace = utils.formatPx<'str'>(props.tabSpace)
    let tabSpaceLine = '0'
    if (props.showGapLine)
      tabSpaceLine = '1px'

    let tabWidth = utils.formatPx<'str'>(props.tabWidth)
    if (internalChildren.length > 0 && internalChildren.length <= props.divideNum) {
      const listWidth = listEl.value?.width || 375
      const tabsWidth = listWidth - Number(tabSpace.slice(0, -2)) * (internalChildren.length - 1)
      tabWidth = `${tabsWidth / internalChildren.length}px`
    }

    const style = {
      '--tabs-color': props.color,
      '--tabs-radius': utils.formatPx(props.radius),
      '--tabs-card-background': tabCardBg,
      '--tabs-card-background-active': tabCardBgActive,
      '--tabs-card-sub-bg': tabCardSubBg,
      '--tabs-card-sub-color': tabCardSubColor,
      '--tabs-line-width': utils.formatPx(props.lineWidth),
      '--tabs-line-height': utils.formatPx(props.lineHeight),
      '--tabs-tab-width': tabWidth,
      '--tabs-tab-padding': utils.formatPx(props.tabPadding),
      '--tabs-tab-padding-bottom': cmpShowLine.value ? utils.formatPx(4) : utils.formatPx(props.tabPadding),
      '--tabs-transition-duration': props.duration ? `${props.duration}s` : 'inherit',
      '--tabs-tab-space': tabSpace,
      '--tabs-tab-space-line': tabSpaceLine,
      '--tabs-tab-border-width': borderWidth,
      '--tabs-tab-border-width-start': borderWidthStart,
      '--tabs-sticky': props.sticky ? 'sticky' : 'relative',
      '--tabs-offset-top': utils.formatPx(props.offsetTop),
      '--tabs-title-color': props.titleColor,
      '--tabs-active-title-color': activeTitleColor,
      '--tabs-title-height': utils.formatPx(props.titleHeight),
      '--tabs-sub-title-height': utils.formatPx(props.subTitleHeight),
      '--tabs-sub-title-radius': utils.formatPx(props.subTitleRadius),
      '--tabs-list-height': openPullDown.value && listEl.value ? `${listEl.value?.height}px` : 'initial',
      '--tabs-image-width': utils.formatPx(props.imageWidth),
      '--tabs-image-height': utils.formatPx(props.imageHeight),
      '--tabs-image-radius': utils.formatPx(props.imageRadius),
      '--tabs-image-border-width': utils.formatPx(props.imageBorderWidth),
      '--tabs-sub-color': props.subColor,
      '--tabs-active-sub-color': props.activeSubColor,
      '--tabs-mask-top': utils.formatPx(props.maskTop),
      '--tabs-mask-right': utils.formatPx(props.maskRight),
      '--tabs-mask-bottom': utils.formatPx(props.maskBottom),
      '--tabs-mask-left': utils.formatPx(props.maskLeft),
      '--tabs-mask-zindex': props.maskZindex,
      'opacity': showComponent.value ? '1' : '0',
      'zIndex': openPullDown.value ? '1001' : '1',
    }
    return style
  })

  const cmpListBackground = computed(() => utils.bg2style(props.background))

  const cmpActiveIndex = computed(() => cmpTabList.value.findIndex(m => m.active))

  const cmpActiveTabEl = computed(() => tabEls.value[cmpActiveIndex.value] || {})

  const cmpLineStyle = computed(() => {
    const width = utils.formatPx<'str'>(props.lineWidth)
    const display = tabEls.value.length ? 'block' : 'none'
    let marginLeft = '0'
    if (cmpActiveIndex.value !== -1) {
      const activeEl = tabEls.value[cmpActiveIndex.value]
      if (activeEl)
        marginLeft = `${(activeEl.left || 0) - (listEl.value?.left || 0) + ((activeEl.width || 0) - Number(width.slice(0, -2))) / 2}px`
    }
    return { marginLeft, display }
  })

  const cmpScrollX = computed(() => internalChildren.length > props.divideNum)

  const cmpPullDown = computed(() => props.divideNum > 0 && cmpScrollX.value && props.pullDown)

  const cmpPullStyle = computed(() => {
    if (!listBoxEl.value || !openPullDown.value)
      return {}
    return {
      top: `${listBoxEl.value?.top}px`,
      left: `${listBoxEl.value?.left}px`,
      width: `${listBoxEl.value?.width}px`,
    }
  })

  const cmpPullListTransform = computed(() => ({ transform: `translateY(${pullTransform.value ? '0' : '-100%'})` }))

  const cmpPullIconTransform = computed(() => ({ transform: `rotate(${pullTransform.value ? '180deg' : '0'})` }))

  const cmpEllipsis = computed(() => {
    if (props.ellipsis)
      return { whiteSpace: 'nowrap', textOverflow: 'ellipsis' } as CSSProperties

    return {}
  })

  const cmpTitleStyle = computed(() => {
    if (props.showSubtitle)
      return { fontWeight: 'bold', fontSize: utils.formatPx<'str'>(32) }

    return {}
  })

  const initChildren = () => {
    setShowComponent(false)
    setUpdateChildrenTimeout(() => {
      if (!thas.value)
        return
      nextTick(async () => {
        setListBoxEl(await utils.querySelector<false>('.tab-list-box', thas.value))
        setListEl(await utils.querySelector<false>('.tab-list-box .tab-list.view-list', thas.value))
        setTabEls(await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item', thas.value, true))
        setShowComponent(true)
      })
    }, 100)
  }

  const onCloseDown = () => {
    setPullTransform(false)
    setTimeout(() => {
      setOpenPullDown(false)
    }, 200)
  }

  const onSelect = async (tab: TabProps, index: number) => {
    if (tab.disabled || props.disabled || props.lock)
      return false
    if (openPullDown.value)
      await onCloseDown()
    let active = dataActive.value
    if (typeof active === 'string')
      active = tab.name
    else if (typeof active === 'number')
      active = index

    setDataActive(active)
    emits('update:active', active)
    emits('change', { ...tab, index })
    return true
  }

  const onClickTab = (tab: TabProps, index: number) => {
    emits('click-tab', { ...tab, index })
    onSelect(tab, index)
  }

  const scrollToActive = () => {
    nextTick(async () => {
      if (!thas.value)
        return
      const activeEl = await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item.active', thas.value, false)
      if (!activeEl)
        return
      if (!tabEls.value[cmpActiveIndex.value])
        setTabEls(await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item', thas.value, true))

      if (!listEl.value)
        setListEl(await utils.querySelector('.tab-list-box .tab-list.view-list', thas.value, false))

      const scrollLeft = utils.scrollViewX({
        viewLeft: activeEl.left || 0,
        viewRight: activeEl.right || 0,
        boxLeft: listEl.value?.left || 0,
        boxRight: listEl.value?.right || 0,
        prevWidth: tabEls.value[cmpActiveIndex.value - 1]?.width || 0,
        nextWidth: tabEls.value[cmpActiveIndex.value + 1]?.width || 0,
        scrollLeft: viewScrollLeft.value,
      })
      setViewScrollLeft(scrollLeft)
      setScrollLeft(scrollLeft)
    })
  }

  const onScroll = (e: UniScrollViewOnScrollEvent) => {
    setViewScrollLeft(e?.detail?.scrollLeft || 0)
  }

  const onOpenDown = () => {
    return new Promise((resolve, reject) => {
      nextTick(async () => {
        try {
          setListBoxEl(await utils.querySelector('.tab-list-box', thas.value, false))
          setOpenPullDown(true)
          setTimeout(() => {
            setPullTransform(true)
            resolve(true)
          }, 20)
        }
        catch (error) {
          reject(error)
        }
      })
    })
  }

  const onSliding = (index: number) => {
    if (props.disabled)
      return
    const tab = cmpTabList.value[index]
    onSelect(tab, index)
  }

  watch(
    () => props.active,
    v => setDataActive(v),
    { immediate: true },
  )

  watch(
    [() => cmpActiveIndex.value, () => thas.value],
    () => {
      scrollToActive()
    },
    { immediate: true },
  )

  watch([() => cmpRootStyle.value, () => thas.value], () => {
    if (!thas.value)
      return
    setUpdateTabsTimeout(async () => setTabEls(await utils.querySelector('.tab-list-box .tab-list.view-list .tab-item', thas.value, true)), 10)
  })
  watch([() => internalChildren.length, () => thas.value], () => initChildren())

  return {
    cmpRootStyle,
    cmpListBackground,
    cmpPullDown,
    openPullDown,
    cmpScrollX,
    scrollLeft,
    onScroll,
    cmpTabList,
    cmpShowLine,
    cmpActiveTabEl,
    onClickTab,
    cmpEllipsis,
    cmpTitleStyle,
    cmpLineStyle,
    onOpenDown,
    cmpPullStyle,
    onCloseDown,
    cmpPullIconTransform,
    cmpPullListTransform,
    cmpActiveIndex,
    cmpDisabledIndexs,
    onSliding,
  }
}
