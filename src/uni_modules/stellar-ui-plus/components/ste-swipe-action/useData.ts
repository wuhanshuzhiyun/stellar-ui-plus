import { type StyleValue, computed, ref } from 'vue'
import TouchEvent from '../ste-touch-swipe/TouchEvent'
import utils from '../../utils/utils'
import type { ModeType, SteSwipeActionProps } from './props'

export default function useData({ props, parent, thas, emits }: {
  props: SteSwipeActionProps
  parent: any
  thas: globalThis.Ref<globalThis.ComponentPublicInstance | null | undefined>
  emits: {
    (e: 'close'): void
    (e: 'open', direction: 'left' | 'right'): void
  }
}) {
  const touch = new TouchEvent()

  const moveing = ref(false)
  const setMoveing = (val: boolean) => {
    moveing.value = val
  }

  const translateX = ref(0)
  const setTranslateX = (val: number) => {
    translateX.value = val
  }

  const dataTranslateX = ref(0)
  const setDataTranslateX = (val: number) => {
    dataTranslateX.value = val
  }

  const leftWidth = ref(0)
  const setLeftWidth = (val: number) => {
    leftWidth.value = val
  }

  const rightWidth = ref(0)
  const setRightWidth = (val: number) => {
    rightWidth.value = val
  }

  const changeCallback = ref<(v: number) => void>()
  const setChangeCallback = (val: (v: number) => void) => {
    changeCallback.value = val
  }

  const cmpMode = computed<ModeType>(() => props.mode || parent?.mode || 'right')

  const cmpLeft = computed(() => ['all', 'left'].includes(cmpMode.value))

  const cmpRight = computed(() => ['all', 'right'].includes(cmpMode.value))

  const cmpDisabled = computed<boolean>(() => props.disabled !== null ? props.disabled : parent?.disabled)

  const cmpSwipeThreshold = computed<number>(() => props.swipeThreshold || parent?.swipeThreshold || 0.35)

  const cmpDuration = computed<number>(() => props.duration || parent?.duration || 300)

  const cmpLeftIcon = computed<boolean>(() => props.leftIcon !== null ? props.leftIcon : parent?.leftIcon)

  const cmpRightIcon = computed<boolean>(() => props.rightIcon !== null ? props.rightIcon : parent?.rightIcon)

  const cmpTransform = computed<StyleValue>(() => ({
    transform: `translateX(${translateX.value}px)`,
    transitionDuration: moveing.value ? '0' : `${cmpDuration.value}ms`,
  }))

  const setTransform = (moveX: number) => {
    setTranslateX(moveX)
    if (dataTranslateX.value === moveX)
      return
    setDataTranslateX(moveX)
    if (changeCallback.value)
      changeCallback.value(moveX)
    if (moveX === 0)
      emits('close')
    else emits('open', moveX > 0 ? 'left' : 'right')
  }

  const open = (direction = cmpMode.value) => {
    setTimeout(async () => {
      if (direction === 'left') {
        const l = await utils.querySelector<false>('.swipe-action-left', thas.value)
        if (!l)
          return
        setTransform(Number(l.width))
      }
      else {
        const r = await utils.querySelector<false>('.swipe-action-right', thas.value)
        if (!r)
          return
        setTransform(-Number(r.width))
      }
    }, 30)
  }

  const close = () => setTransform(0)

  const iconOpen = (direction: ModeType) => {
    if (cmpDisabled.value)
      return
    if (dataTranslateX.value)
      close()
    else open(direction)
  }

  const onTouchstart = async (e: any) => {
    if (cmpDisabled.value)
      return
    setMoveing(true)
    touch.touchStart(e)
    if (cmpLeft.value) {
      const l = await utils.querySelector<false>('.swipe-action-left', thas.value)
      if (l)
        setLeftWidth(Number(l.width))
    }
    else {
      setLeftWidth(0)
    }
    if (cmpRight.value) {
      const r = await utils.querySelector<false>('.swipe-action-right', thas.value)
      if (r)
        setRightWidth(Number(r.width))
    }
    else {
      setRightWidth(0)
    }
  }

  const onTouchmove = (e: any) => {
    if (cmpDisabled.value)
      return
    const d = touch.touchMove(e)
    if (!d)
      return
    let x = dataTranslateX.value + d.moveX
    if (dataTranslateX.value > 0 && x < 0) {
      // 左侧按钮显示的时候，不能直接滑动到右侧按钮
      x = 0
    }
    else if (dataTranslateX.value < 0 && x > 0) {
      // 右侧按钮显示的时候，不能直接滑动到左侧按钮
      x = 0
    }
    else if (!cmpLeft.value && x > 0) {
      // 没有左侧按钮时，不能滑动到左侧
      x = 0
    }
    else if (cmpLeft.value && x > leftWidth.value) {
      // 左侧按钮显示时，左侧滑动距离不能超过按钮宽度
      x = leftWidth.value
    }
    else if (!cmpRight.value && x < 0) {
      // 没有右侧按钮时，不能滑动到右侧
      x = 0
    }
    else if (cmpRight.value && x < -rightWidth.value) {
      // 右侧按钮显示时，右侧滑动距离不能超过按钮宽度
      x = -rightWidth.value
    }
    setTranslateX(x)
  }

  const onTouchend = (e: any) => {
    setMoveing(false)
    if (cmpDisabled.value)
      return
    const { moveX } = touch.touchEnd(e)
    let x = dataTranslateX.value
    if (x === 0) {
      if (moveX > 0 && cmpLeft.value && moveX > leftWidth.value * cmpSwipeThreshold.value)
        x = leftWidth.value
      else if (moveX < 0 && cmpRight.value && Math.abs(moveX) > rightWidth.value * cmpSwipeThreshold.value)
        x = -rightWidth.value
    }
    else if (x > 0 && moveX < 0 && Math.abs(moveX) > leftWidth.value * cmpSwipeThreshold.value) {
      x = 0
    }
    else if (x < 0 && moveX > 0 && moveX > rightWidth.value * cmpSwipeThreshold.value) {
      x = 0
    }
    setTimeout(() => {
      setTransform(x)
    }, 10)
  }

  const onchange = (callback: (v: number) => void) => {
    setChangeCallback(callback)
  }

  return {
    dataTranslateX,
    onTouchstart,
    onTouchmove,
    onTouchend,
    onchange,
    iconOpen,
    open,
    close,
    cmpLeftIcon,
    cmpRightIcon,
    cmpTransform,
  }
}
