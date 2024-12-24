import { type CSSProperties, computed, ref, watch } from 'vue'
import utils from '../../utils/utils'
import type { TourPropsType } from './props'

export default function useData({ props, emits, thas }: {
  props: TourPropsType
  emits: {
    (e: 'change', current: number): void
    (e: 'update:show', show: boolean): void
    (e: 'update:current', current: number): void
    (e: 'close'): void
  }
  thas: globalThis.Ref<globalThis.ComponentPublicInstance | null | undefined>
}) {
  const dataShow = ref(false)
  const setDataShow = (val: boolean) => {
    dataShow.value = val
  }
  const dataCurrent = ref(0)
  const setDataCurrent = (val: number) => {
    dataCurrent.value = val
  }
  const stepTimeout = ref(0)
  const setStepTimeout = (callback: () => void, time: number) => {
    clearTimeout(stepTimeout.value)
    stepTimeout.value = setTimeout(() => {
      callback()
    }, time)
  }

  const dataStyle = ref<CSSProperties>({})

  const setDataStyle = (val: CSSProperties) => {
    dataStyle.value = val
  }

  const messageStyle = ref<CSSProperties>({})

  const setMessageStyle = (val: CSSProperties) => {
    messageStyle.value = val
  }

  const arrowsStyle = ref<CSSProperties>({})

  const setArrowsStyle = (val: CSSProperties) => {
    arrowsStyle.value = val
  }

  const cmpRootStyle = computed<CSSProperties>(() => ({
    '--ste-tour-radius': utils.formatPx(props.radius),
    '--ste-tour-mask': props.mask ? `0 0 0 250vh ${props.background}` : 'none',
    '--ste-tour-message-shadow': props.mask ? 'none' : `0 0 ${utils.formatPx(30)} 0 #ccc`,
    '--ste-tour-message-bg': props.messageBg,
    '--ste-tour-message-color': props.messageColor,
  }))

  const cmpStep = computed(() => props.steps[dataCurrent.value])

  const windowSize = computed(() => ({
    vw: utils.System.getWindowWidth(),
    vh: utils.System.getWindowHeight(),
  }))

  const cmpShowPrevStep = computed(() => props.showPrevStep && dataCurrent.value > 0)

  const cmpShowFooter = computed(() => props.showFooter && props.steps.length > 1)

  watch(() => props.show, (v) => {
    setDataShow(v)
    if (v)
      setDataCurrent(0)
  }, { immediate: true })

  watch(() => props.current, (v) => {
    if (v >= 0 && v <= props.steps.length - 1)
      setDataCurrent(v)
  }, { immediate: true })

  const close = () => {
    setDataShow(false)
    emits('update:show', false)
    emits('close')
  }

  const clickRoot = () => {
    if (!props.maskColse)
      return
    close()
  }

  const showTour = () => {
    setStepTimeout(async () => {
      const step = cmpStep.value
      if (!step)
        return
      let component = thas.value
      let el: UniApp.NodeInfo | null = null
      for (component = component?.$parent; !el && component; component = component?.$parent)
        el = await utils.querySelector<false>(`#${step.target}`, component)

      if (!el) {
        console.error(`未找到ID为${step.target}的元素`)
        return
      }
      const { top = 0, left = 0, bottom = 0, right = 0, width = 0, height = 0 } = el
      setDataStyle({
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        display: 'block',
      })
      let [y, x] = step.position?.split('-') || []
      const { vw, vh } = windowSize.value
      const _bottom = vh - bottom
      const _right = vw - right
      if (!y) {
        if (top > _bottom)
          y = 'top'
        else
          y = 'bottom'
      }
      if (!x) {
        if (_right > 30 && _right > left)
          x = 'start'
        else if (left > 30)
          x = 'end'
        else
          x = 'center'
      }
      const [_x = 0, _y = 0] = props.offset
      const arrowsWidth = 18
      const messageStyle: CSSProperties = { display: 'block' }
      const arrowsStyle: CSSProperties = {}

      switch (y) {
        case 'top':
          messageStyle.bottom = `${_bottom + height + _y + (arrowsWidth - 5)}px`
          arrowsStyle.bottom = `-${arrowsWidth}px`
          arrowsStyle.borderColor = `${props.messageBg} transparent transparent`

          break
        case 'bottom':
          messageStyle.top = `${bottom + _y + (arrowsWidth - 5)}px`
          arrowsStyle.top = `-${arrowsWidth}px`
          break
      }
      switch (x) {
        case 'start':
          messageStyle.left = `${left + _x}px`
          arrowsStyle.left = `${arrowsWidth}px`
          break
        case 'end':
          messageStyle.right = `${_right + _x}px`
          arrowsStyle.right = `${arrowsWidth}px`
          break
        case 'center':
          messageStyle.left = '50%'
          messageStyle.transform = `translateX(calc(-50% + ${_x}px))`
          arrowsStyle.left = '50%'
          arrowsStyle.transform = 'translateX(-50%)'
      }
      setMessageStyle(messageStyle)
      setArrowsStyle(arrowsStyle)
    }, 50)
  }

  const closeTour = () => {
    setDataStyle({})
    setMessageStyle({})
    setArrowsStyle({})
  }

  const onNext = () => {
    if (dataCurrent.value < props.steps.length - 1) {
      setDataCurrent(dataCurrent.value + 1)
      emits('update:current', dataCurrent.value)
      emits('change', dataCurrent.value)
    }
    else {
      close()
    }
  }

  const onUp = () => {
    if (dataCurrent.value > 0) {
      setDataCurrent(dataCurrent.value - 1)
      emits('update:current', dataCurrent.value)
      emits('change', dataCurrent.value)
    }
  }

  watch(() => dataShow.value, (v) => {
    if (v)
      showTour()
    else closeTour()
  }, { immediate: true })

  watch(() => dataCurrent.value, () => {
    if (dataShow.value)
      showTour()
    else closeTour()
  }, { immediate: true })

  return {
    dataShow,
    cmpRootStyle,
    clickRoot,
    dataStyle,
    messageStyle,
    arrowsStyle,
    cmpStep,
    close,
    cmpShowFooter,
    dataCurrent,
    onUp,
    cmpShowPrevStep,
    onNext,
  }
}
