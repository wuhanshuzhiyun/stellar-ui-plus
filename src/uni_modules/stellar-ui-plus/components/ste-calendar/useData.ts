import { ref } from 'vue'
import utils from '../../utils/utils'
import type { Dayjs } from '../../types'

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

  const scrollTop = ref(0)

  const viewDate = ref<Dayjs>(utils.dayjs())

  const viewMonth = ref<string>("")


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
    scrollTop,
    viewDate,
    viewMonth
  }
}
