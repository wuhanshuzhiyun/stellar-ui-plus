import { type CSSProperties, type ComponentInternalInstance, computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import TouchEvent from '../ste-touch-swipe/TouchEvent'
import type { UniTouchEvent } from '../../types/event'
import utils from './../../utils/utils'
import type { SwiperProps } from './props'

export default function useData({ props, children, thas, emits }:
{
  props: SwiperProps
  children: ComponentInternalInstance[]
  thas: globalThis.ComponentPublicInstance | null | undefined
  emits: { (e: 'change', index: number, source: 'autoplay' | 'touch'): void }
}) {
  const initializing = ref(true)
  const setInitializing = (val: boolean) => initializing.value = val

  const moveing = ref(false)
  const setMoveing = (val: boolean) => moveing.value = val

  const reseting = ref(false)
  const setReseting = (val: boolean) => reseting.value = val

  const dataIndex = ref(0)
  const setDataIndex = (val: number) => dataIndex.value = val

  watch(() => props.current, (v) => {
    if (!children.length) {
      setDataIndex(v)
      return
    }
    setDataIndex(v < 0 ? 0 : v >= children.length ? children.length - 1 : v)
  }, { immediate: true })

  const touch = new TouchEvent()

  const boxWidth = ref<number>()
  const setBoxWidth = (val: number | undefined) => boxWidth.value = val

  const boxHeight = ref<number>()
  const setBoxHeight = (val: number | undefined) => boxHeight.value = val

  const translateX = ref(0)
  const setTranslateX = (val: number) => translateX.value = val

  const translateY = ref(0)
  const setTranslateY = (val: number) => translateY.value = val

  let childrenTimeout = 0
  const setChildrenTimeout = (callback: () => void, time: number) => {
    clearTimeout(childrenTimeout)
    childrenTimeout = setTimeout(() => {
      callback()
    }, time)
  }

  let durationTimeout = 0
  const setDurationTimeout = (callback: () => void, time: number) => {
    clearTimeout(durationTimeout)
    durationTimeout = setTimeout(() => {
      callback()
    }, time)
  }

  let autoplayTimeout = 0
  const setAutoplayTimeout = (callback: () => void, time: number) => {
    clearInterval(autoplayTimeout)
    autoplayTimeout = setInterval(() => {
      callback()
    }, time)
  }

  onBeforeUnmount(() => {
    clearInterval(autoplayTimeout)
    clearTimeout(durationTimeout)
    clearTimeout(childrenTimeout)
  })

  const source = ref<'autoplay' | 'touch'>('autoplay')
  const setSource = (val: 'autoplay' | 'touch') => source.value = val

  const cmpDuration = computed(() => props.autoplay && props.duration >= props.interval ? props.interval : props.duration)

  const cmpRootStyle = computed(() => {
    let width = props.direction === 'horizontal' ? '100%' : 'auto'
    let height = props.direction === 'vertical' ? '100%' : 'auto'
    if (props.width)
      width = utils.formatPx<'str'>(props.width)

    if (props.height)
      height = utils.formatPx<'str'>(props.height)

    return {
      '--swiper-width': width,
      '--swiper-height': height,
      '--swiper-indicator-color': props.indicatorColor,
      '--swiper-indicator-active-color': props.indicatorActiveColor,
      '--swiper-root-padding':
        props.direction === 'horizontal'
          ? `0  ${utils.formatPx(props.nextMargin)} 0 ${utils.formatPx(props.previousMargin)}`
          : `${utils.formatPx(props.previousMargin)} 0 ${utils.formatPx(props.nextMargin)} 0`,
    }
  })

  const cmpBoxStyle = computed(() => {
    const style: CSSProperties = {}
    if (props.direction === 'horizontal')
      style.gridTemplateColumns = `repeat(${children.length || 'auto-fill'}, 100%)`
    else if (props.direction === 'vertical')
      style.gridTemplateRows = `repeat(${children.length || 'auto-fill'}, 100%)`

    return style
  })

  const cmpBoxTransform = computed(() => {
    let transform = ''
    if (props.direction === 'horizontal')
      transform = `translateX(${translateX.value}px)`
    else if (props.direction === 'vertical')
      transform = `translateY(${translateY.value}px)`

    const duration = initializing.value || moveing.value || reseting.value ? 'inherit' : `${cmpDuration.value}ms`
    return { transform, transitionDuration: duration }
  })

  const cmpStartComponent = computed(() => children[0])

  const cmpEndComponent = computed(() => children[children.length - 1])

  const getBoxSize = async () => {
    if (Number(boxWidth.value) > 0 || Number(boxHeight.value) > 0)
      return
    const boxEl = await utils.querySelector<false>('.swipe-content-view', thas)
    setBoxWidth(boxEl.width)
    setBoxHeight(boxEl.height)
  }

  const isMover = (moveX = 0, moveY = 0) => {
    if (children.length < 2)
      return false
    if (props.circular)
      return true
    if (
      props.direction === 'horizontal'
      && ((dataIndex.value === 0 && moveX > 0) || (dataIndex.value === children.length - 1 && moveX < 0))
    )
      return false

    if (
      props.direction === 'vertical'
      && ((dataIndex.value === 0 && moveY > 0) || (dataIndex.value === children.length - 1 && moveY < 0))
    )
      return false

    return true
  }

  const setBoundary = (moveX = 0, moveY = 0) => {
    if (!props.circular)
      return
    const startComponent: any = cmpStartComponent.value
    const endComponent: any = cmpEndComponent.value
    const length = children.length
    const width = boxWidth.value
    const height = boxHeight.value
    if (dataIndex.value <= 0) {
      startComponent.selfValue.setTransform({})
      if (props.direction === 'horizontal' && moveX > 0)
        endComponent.selfValue.setTransform({ x: -length * Number(width) })
      else if (props.direction === 'vertical' && moveY > 0)
        endComponent.selfValue.setTransform({ y: -length * Number(height) })
    }
    else if (dataIndex.value >= length - 1) {
      endComponent.selfValue.setTransform({})
      if (props.direction === 'horizontal' && moveX < 0)
        startComponent.selfValue.setTransform({ x: length * Number(width) })
      else if (props.direction === 'vertical' && moveY < 0)
        startComponent.selfValue.setTransform({ y: length * Number(height) })
    }
  }

  const setTransform = (moveX = 0, moveY = 0) => {
    if (children.length < 2)
      return
    const bool = isMover(moveX, moveY)
    if (!bool)
      return
    if (props.direction === 'horizontal') {
      if (Math.abs(moveX) < Math.abs(moveY))
        return
      const x = -dataIndex.value * Number(boxWidth.value) + moveX
      if (moveX !== 0 && Math.abs(translateX.value - x) < 3)
        return
      setTranslateX(x)
      setBoundary(moveX)
    }
    else if (props.direction === 'vertical') {
      if (Math.abs(moveX) > Math.abs(moveY))
        return
      const y = -dataIndex.value * Number(boxHeight.value) + moveY
      if (moveY !== 0 && Math.abs(translateY.value - y) < 3)
        return
      setTranslateY(y)
      setBoundary(0, moveY)
    }
  }

  const resetBoundary = () => {
    setReseting(true)
    setTimeout(() => {
      let change = false
      if (dataIndex.value === -1) {
        setDataIndex(children.length - 1)
        change = true
      }
      else if (dataIndex.value === children.length) {
        setDataIndex(0)
        change = true
      }
      if (change)
        emits('change', dataIndex.value, source.value)

      const length = children.length
      children.forEach((component: any, index) => {
        let x = 0
        let y = 0
        if (props.circular) {
          if (index === length - 1 && dataIndex.value === 0 && length > 2) {
            x = props.direction === 'horizontal' ? -length * Number(boxWidth.value) : 0
            y = props.direction === 'vertical' ? -length * Number(boxHeight.value) : 0
          }
          else if (index === 0 && dataIndex.value === length - 1 && length > 2) {
            x = props.direction === 'horizontal' ? length * Number(boxWidth.value) : 0
            y = props.direction === 'vertical' ? length * Number(boxHeight.value) : 0
          }
        }
        component.selfValue.setTransform({ x, y })
      })
      setTimeout(() => {
        setReseting(false)
      }, 50)
    }, 50)
  }

  const setAutoplay = () => {
    if (!props.autoplay)
      return
    if (children?.length < 2)
      return
    setAutoplayTimeout(() => {
      let next = dataIndex.value + 1 <= children.length - 1 ? dataIndex.value + 1 : 0
      if (props.circular)
        next = dataIndex.value + 1

      setBoundary(-1, -1)
      setSource('autoplay')
      setDataIndex(next)
      if (next >= 0 && next <= children.length - 1)
        emits('change', next, source.value)
      setDurationTimeout(resetBoundary, cmpDuration.value - 30)
    }, props.interval)
  }

  const init = () => {
    setChildrenTimeout(async () => {
      await getBoxSize()
      setTransform()
      resetBoundary()
      setAutoplay()

      setTimeout(() => {
        setInitializing(false)
      }, 25)
    }, 25)
  }

  onMounted(init)

  watch(() => dataIndex.value, () => {
    if (!children.length)
      return
    nextTick(async () => {
      await getBoxSize()
      setTransform()
    })
  }, { immediate: true })

  watch(() => children.length, () => {
    nextTick(() => {
      init()
    })
  }, { immediate: true })

  const onTouchstart = async (e: UniTouchEvent | MouseEvent) => {
    if (props.disabled)
      return
    if (children.length < 2)
      return
    console.log(cmpEndComponent.value)
    setMoveing(true)
    await getBoxSize()
    clearInterval(autoplayTimeout)
    resetBoundary()
    touch.touchStart(e as UniTouchEvent)
  }

  const onTouchmove = (e: UniTouchEvent | MouseEvent) => {
    if (props.disabled)
      return
    if (children?.length < 2)
      return
    const res = touch.touchMove(e as UniTouchEvent)
    if (!res)
      return
    setMoveing(true)
    const { moveX, moveY } = res
    setTransform(moveX, moveY)
  }

  const onTouchend = (e: UniTouchEvent | MouseEvent) => {
    if (props.disabled)
      return
    setMoveing(false)
    const { moveX, moveY } = touch.touchEnd(e as UniTouchEvent)
    if (props.direction === 'horizontal' && !moveX)
      return
    else if (props.direction === 'vertical' && !moveY)
      return
    const bool = isMover(moveX, moveY)
    if (!bool)
      return
    setDurationTimeout(() => {
      setAutoplay()
      resetBoundary()
    }, cmpDuration.value)

    let index = dataIndex.value
    if (props.direction === 'horizontal' && Math.abs(moveX) > Number(boxWidth.value) * props.swipeThreshold)
      index = moveX > 0 ? index - 1 : index + 1
    else if (props.direction === 'vertical' && Math.abs(moveY) > Number(boxHeight.value) * props.swipeThreshold)
      index = moveY > 0 ? index - 1 : index + 1

    if (dataIndex.value === index) {
      setTransform()
      return
    }
    setSource('touch')
    setDataIndex(index)
    if (index < 0 || index >= children.length)
      return
    emits('change', index, source.value)
  }

  return {
    initializing,
    dataIndex,
    cmpRootStyle,
    cmpBoxStyle,
    cmpBoxTransform,
    onTouchstart,
    onTouchmove,
    onTouchend,
  }
}
