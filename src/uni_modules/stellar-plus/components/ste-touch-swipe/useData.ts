import { ref } from 'vue'
import TouchEvent from './TouchEvent'

export default function useData() {
  const initializing = ref(false)
  const setInitializing = (val: boolean) => (initializing.value = val)
  const showNode = ref(false)
  const setShowNode = (val: boolean) => (showNode.value = val)
  const boxEl = ref<UniApp.NodeInfo>()
  const setBoxEl = (val: UniApp.NodeInfo) => (boxEl.value = val)
  const touch = new TouchEvent()
  const moveing = ref(false)
  const setMoveing = (val: boolean) => (moveing.value = val)
  const translateX = ref(0)
  const setTranslateX = (val: number) => (translateX.value = val)
  const translateY = ref(0)
  const setTranslateY = (val: number) => (translateY.value = val)
  const dataIndex = ref(0)
  const setDataIndex = (val: number) => (dataIndex.value = val)
  const dataChildrenLength = ref(0)
  const setDataChildrenLength = (val: number) => (dataChildrenLength.value = val)
  const dataDisabledIndexs = ref<number[]>([])
  const setDataDisabledIndexs = (val: number[]) => (dataDisabledIndexs.value = val)
  const timeout = ref<number>()
  const set_timeout = (val: number) => (timeout.value = val)
  return {
    initializing,
    setInitializing,
    showNode,
    setShowNode,
    boxEl,
    setBoxEl,
    touch,
    moveing,
    setMoveing,
    translateX,
    setTranslateX,
    translateY,
    setTranslateY,
    dataIndex,
    setDataIndex,
    dataChildrenLength,
    setDataChildrenLength,
    dataDisabledIndexs,
    setDataDisabledIndexs,
    timeout,
    set_timeout,
  }
}
