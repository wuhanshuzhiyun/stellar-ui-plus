import { ref } from 'vue'
import type TouchScaleing from './TouchScaleing'

export default function useData() {
  const dataIndex = ref(0)
  const setDataIndex = (index: number) => {
    dataIndex.value = index
  }

  const dataShow = ref(false)
  const setDataShow = (show: boolean) => {
    dataShow.value = show
  }

  const touch = ref<TouchScaleing>()
  const setTouch = (_touch: TouchScaleing) => {
    touch.value = _touch
  }

  const scaling = ref(1)
  const setScaling = (scale: number) => {
    scaling.value = scale
  }

  const translate = ref('0')
  const setTranslate = (_translate: string) => {
    translate.value = _translate
  }

  const rotate = ref(0)
  const setRotate = (_rotate: number) => {
    rotate.value = _rotate
  }

  const transition = ref('0')
  const setTransition = (_transition: string) => {
    transition.value = _transition
  }

  const dataShowmenu = ref(false)
  const setDataShowmenu = (show: boolean) => {
    dataShowmenu.value = show
  }

  return {
    dataIndex,
    setDataIndex,
    dataShow,
    setDataShow,
    touch,
    setTouch,
    scaling,
    setScaling,
    translate,
    setTranslate,
    rotate,
    setRotate,
    transition,
    setTransition,
    dataShowmenu,
    setDataShowmenu,
  }
}
