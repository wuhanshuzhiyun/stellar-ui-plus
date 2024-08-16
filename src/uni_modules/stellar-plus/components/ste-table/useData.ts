import type { CSSProperties, SetupContext } from 'vue'
import { nextTick, ref } from 'vue'
import type { TableColumnProps } from '../ste-table-column/props'
import utils from '../../utils/utils'
import type { Obj } from '../../types'
import type { AllStateType, SelectColType } from './types'
import type { TableEmits, TableProps } from './props'
import { getStyleOrClass } from './utils'

export default function useData(props: TableProps, emits: SetupContext<TableEmits>['emit']) {
  const tableData = ref<Obj[]>([])

  const columns = ref<TableColumnProps[]>([])
  const sumData = ref([])
  const currentRow = ref()

  const checkStatesSet = ref(new Set<number>())
  const checkStates = ref<number[]>([])
  const canCheckStates = ref<number[]>([])

  const checkAllState = ref<AllStateType>('none')
  const selectType = ref<SelectColType>('checkbox')

  function calcSum() {
    if (!props.summaryMethod)
      return
    sumData.value = props.summaryMethod({ columns: columns.value, data: tableData.value })
  }

  function loadSelectType() {
    columns.value.forEach((e) => {
      if (e.type)
        selectType.value = e.type as SelectColType
    })
  }

  function loadCanCheckArr() {
    const tmp: number[] = []
    tableData.value.forEach((e, index) => {
      const selectFlag = props.selectable ? props.selectable(e, index) : true
      const readonlyFlag = props.readable ? !props.readable(e, index) : true

      if (selectFlag && readonlyFlag)
        tmp.push(index)
    })
    canCheckStates.value = tmp
  }

  function initSelection() {
    loadCanCheckArr()
    checkStates.value = checkStates.value.filter(e => canCheckStates.value.includes(e))
    calcAllState()
  }

  function calcAllState() {
    // 处理当前全选框的状态
    if (checkStates.value.length > 0) {
      if (canCheckStates.value.length === checkStates.value.length)
        checkAllState.value = 'all'
      else
        checkAllState.value = 'indeterminate'
    }
    else {
      checkAllState.value = 'none'
    }
  }

  function changeCheckAll() {
    if (checkAllState.value !== 'all') {
      emits(
        'selectAll',
        canCheckStates.value.map(e => tableData.value[e]),
      )
    }
    else {
      emits('selectAll', [])
    }
    toggleAllSelection()
  }

  // column组件更改Check状态
  function handleCheck(row: Obj, isEmit = true) {
    const rowIndex = row.rowIndex
    const state = !checkStatesSet.value.has(rowIndex)
    if (selectType.value === 'radio') {
      checkStatesSet.value = new Set()
      checkStatesSet.value.add(rowIndex)
    }
    else {
      if (state)
        checkStatesSet.value.add(rowIndex)
      else
        checkStatesSet.value.delete(rowIndex)
    }
    checkStates.value = Array.from(checkStatesSet.value)

    isEmit && emits('select', getSelection(), row)
    // this.currentRow = row;
    calcAllState()
    // this.$forceUpdate();
  }

  function cellClick(row: Obj, column: TableColumnProps, event: Event) {
    emits('cellClick', row, column, event)
  }
  function rowClick(row: Obj, event: Event) {
    currentRow.value = row
    emits('rowClick', row, event)
  }
  function headerClick(column: TableColumnProps, event: Event) {
    emits('headerClick', column, event)
  }
  function handleScrollToLower() {
    emits('scrollToLower')
  }

  // ***自定义class和style相关***
  function getHeaderRowClass() {
    const classes = [getStyleOrClass(props.headerRowClassName)]
    return classes.join(' ')
  }
  function getHeaderRowStyle() {
    return getStyleOrClass<object>(props.headerRowStyle)
  }
  function getHeaderCellClass(column: TableColumnProps, columnIndex: number) {
    const classArr = []
    if (column.headerAlign && column.headerAlign !== 'left')
      classArr.push(`align-${column.headerAlign}`)
    else if (column.align && column.align !== 'left')
      classArr.push(`align-${column.align}`)

    classArr.push(getStyleOrClass(props.headerCellClassName, { columnIndex, column }))
    return classArr.join(' ')
  }
  function getHeaderCellStyle(column: TableColumnProps, columnIndex: number, isProp = false) {
    if (!isProp) {
      const style = {} as CSSProperties
      if (column.width)
        style.width = utils.addUnit(column.width)

      if (column.minWidth)
        style.minWidth = utils.addUnit(column.minWidth)

      return style
    }
    else {
      return getStyleOrClass<object>(props.headerCellStyle, { columnIndex, column })
    }
  }
  function getRowClass(row: Obj, rowIndex: number) {
    const classArr: any[] = [`row-${rowIndex}`]
    if (props.highlightCurrentRow && utils.deepEqual(row, currentRow.value, ['rowIndex', 'colIndex']))
      classArr.push('current-row')

    if (props.highlightSelectionRow && checkStatesSet.value.has(rowIndex))
      classArr.push('selection-row')

    // const t = getStyleOrClass(props.rowClassName, { row, rowIndex })
    classArr.push(getStyleOrClass(props.rowClassName, { row, rowIndex }))
    return classArr.join(' ')
  }
  function getRowStyle(row: Obj, rowIndex: number) {
    return getStyleOrClass(props.rowStyle, { row, rowIndex })
  }

  // ***Table Methods 方法***
  // 获取当前选择的数据
  function getSelection() {
    return checkStates.value.map(e => tableData.value[e])
  }

  // 清空选择项
  function clearSelection() {
    checkStatesSet.value.clear()
    checkStates.value = Array.from(checkStatesSet.value)
    checkAllState.value = 'none'
  }
  // 切换某行的选中状态
  function toggleRowSelection(row: Obj, isTriggerSelectEvent = true) {
    nextTick(() => {
      const index = tableData.value.findIndex(e => utils.deepEqual(row, e, ['rowIndex', 'colIndex']))
      if (canCheckStates.value.indexOf(index) <= -1)
        return
      row.rowIndex = index
      handleCheck(row, isTriggerSelectEvent)
    })
  }
  // 切换全选的状态
  function toggleAllSelection() {
    if (checkAllState.value === 'all') {
      clearSelection()
    }
    else {
      canCheckStates.value.forEach((e) => {
        checkStatesSet.value.add(e)
      })
      checkStates.value = Array.from(checkStatesSet.value)
      checkAllState.value = 'all'
    }
  }

  return {
    tableData,
    columns,
    sumData,
    currentRow,
    checkStatesSet,
    checkStates,
    canCheckStates,
    checkAllState,
    selectType,
    calcSum,
    loadSelectType,
    loadCanCheckArr,
    getHeaderRowStyle,
    getHeaderRowClass,
    getHeaderCellStyle,
    getHeaderCellClass,
    headerClick,
    changeCheckAll,
    handleScrollToLower,
    getRowStyle,
    getRowClass,
    initSelection,
    rowClick,
    handleCheck,
    cellClick,
    toggleRowSelection,
    toggleAllSelection,
    clearSelection,
    getSelection,
  }
}
