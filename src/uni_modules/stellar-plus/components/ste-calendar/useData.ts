import { computed, defineProps, ref } from 'vue'
import utils from '../../utils/utils'
import { getCalendarData } from './date'
import propsData from './props'

export default function useData() {
  const props = defineProps(propsData)

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

  const cmpRootStyle = computed(() => ({
    '--calendar-width': utils.formatPx(props.width),
    '--calendar-height': utils.formatPx(props.height),
    '--calendar-color': props.color,
    '--calendar-bg-color': utils.Color.formatColor(props.color, 0.1),
    '--calendar-range-color': utils.Color.formatColor(props.color, 0.2),
    '--calendar-disabled-color': utils.Color.formatColor(props.color, 0.3),
    '--calendar-start-text': `"${props.startText}"`,
    '--calendar-end-text': `"${props.endText}"`,
  }))

  const cmpDates = computed(() => getCalendarData(props.minDate, props.maxDate, props.formatter))

  const cmpShowConfirm = computed(() => props.showConfirm && !props.readonly)

  return {
    props,

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

    cmpRootStyle,
    cmpDates,
    cmpShowConfirm,
  }
}
