import { ref } from 'vue'

export default function useData() {
  const initing = ref(false)
  const setIniting = (val: boolean) => initing.value = val
  const startDate = ref<number | string | null>(null)
  const setStartDate = (val: number | string | null) => startDate.value = val

  const endDate = ref<number | string | null>(null)
  const setEndDate = (val: number | string | null) => endDate.value = val

  const dataList = ref<(number | string)[]>([])
  const setDataList = (val: (number | string)[]) => dataList.value = val

  const contentScrollTop = ref(0)
  const setContentScrollTop = (val: number) => contentScrollTop.value = val

  return {
    initing,
    setIniting,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    dataList,
    setDataList,
    contentScrollTop,
    setContentScrollTop,
  }
}
