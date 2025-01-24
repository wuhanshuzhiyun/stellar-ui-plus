import { type CSSProperties, computed, nextTick, ref, watch } from 'vue'
import utils from '../../utils/utils'
import { useColorStore } from '../../store/color'
import type { SelectOption, SelectValue, SteSelectProps } from './props'
import { type DateMode, formatDate, getFormatStr } from './defaultDate'

const { getColor } = useColorStore()

const isData = (d: any) => d || d === 0 || d === ''

export default function useData({
  props,
  emits,
  thas,
}: {
  props: SteSelectProps
  emits: {
    (e: 'update:modelValue', value: SelectValue): void
    (e: 'change', value: SelectValue, option: SelectOption | SelectOption[]): void
    (e: 'cancel'): void
    (e: 'confirm', value: SelectValue): void
    (e: 'inputFilterable', value: string): void
    (e: 'loadMore'): void
  }
  thas: globalThis.Ref<globalThis.ComponentPublicInstance | null | undefined>
}) {
  const inputView = ref('')
  const setInputView = (value: string) => {
    inputView.value = value
  }
  const userFilterable = ref('')
  const setUserFilterable = (value: string) => {
    userFilterable.value = value
  }

  const inputPlaceholder = ref('')
  const setInputPlaceholder = (value: string) => {
    inputPlaceholder.value = value
  }

  let filterableTime = 0
  const setFilterableTime = (callback: () => void, time: number) => {
    clearTimeout(filterableTime)
    filterableTime = setTimeout(callback, time)
  }

  const dataAllowCreate = ref<SelectOption>()

  const setDataAllowCreate = (value?: SelectOption) => {
    dataAllowCreate.value = value
  }

  const selected = ref<(string | number)[]>([])
  const setSelected = (value: (string | number)[]) => {
    selected.value = value
  }

  const confirmValue = ref<(string | number)[]>([])
  const setConfirmValue = (value: (string | number)[]) => {
    confirmValue.value = value
  }

  const showOptions = ref(false)
  const setShowOptions = (value: boolean) => {
    showOptions.value = value
  }

  const contentStyle = ref<CSSProperties>({})
  const setContentStyle = (value: CSSProperties) => {
    contentStyle.value = value
  }

  const optionsStyle = ref<CSSProperties>({})
  const setOptionsStyle = (value: CSSProperties) => {
    optionsStyle.value = value
  }

  const dataOptions = ref<SelectOption[][]>([])
  const setDataOptions = (value: SelectOption[][]) => {
    dataOptions.value = value
  }

  const viewOptions = ref<SelectOption[][]>([])
  const setViewOptions = (value: SelectOption[][]) => {
    viewOptions.value = value
  }

  const cmpInputPlaceholder = computed(() => (confirmValue.value.length > 0 ? '' : props.placeholder))

  const cmpShowDate = computed(() => ['date', 'datetime', 'time', 'month', 'minute'].includes(props.mode))

  const cmpFilterable = computed(() => props.mode === 'filterable' && dataOptions.value.length <= 1)

  const cmpAutoFilterable = computed(() => cmpFilterable.value && props.autoFilterable)

  const cmpMultiple = computed(() => !cmpShowDate.value && (dataOptions.value.length > 1 || props.multiple))

  const cmpAllowCreate = computed(() => props.allowCreate && cmpFilterable.value)

  const cmpRootStyle = computed(() => ({
    '--ste-select-font-size': `var(--font-size-${props.fontSize},${utils.formatPx(props.fontSize)})`,
    '--ste-select-width': utils.formatPx(props.width),
    '--ste-select-height': utils.formatPx(props.height),
    '--ste-select-line-height': `${utils.formatPx(props.height, 'num') - 2}px`,
    '--ste-select-multiple-placeholder-height': `${utils.formatPx(props.height, 'num') - 6}px`,
    '--ste-select-multiple-line-height': `${utils.formatPx(props.height, 'num') - 8}px`,
    '--ste-select-background': props.background,
    '--ste-select-border': `1px solid ${props.borderColor}`,
    '--ste-select-border-radius': utils.formatPx(props.borderRadius),
    '--ste-theme-color': getColor().steThemeColor,
  }))

  const cmpMultiseriateValue = computed(() => {
    if (cmpShowDate.value)
      return []

    const value = [...selected.value]
    const values = dataOptions.value.map((item, i) => {
      const index = item.findIndex(v => v[props.valueKey] === value[i])
      return index !== -1 ? index : 0
    })
    return values
  })

  const cmpViewValue = computed(() => {
    if (cmpShowDate.value) {
      const values = confirmValue.value
      const v = formatDate(values as number[], props.mode as DateMode)
      return v ? v.format(getFormatStr(props.mode as DateMode)) : ''
    }

    const view: string[] = []
    confirmValue.value.forEach((value, index) => {
      let item = null
      if (props.mode === 'tree')
        item = utils.findTreeNode(props.list, value, props.valueKey, props.childrenKey)
      else if (props.multiple && dataOptions.value.length === 1)
        item = dataOptions.value[0]?.find(item => item[props.valueKey] === value)
      else item = dataOptions.value[index]?.find(item => item[props.valueKey] === value)

      view.push(item?.[props.labelKey] || '')
    })
    return !cmpMultiple.value && view[0] ? view[0] : view
  })

  const cmpShowClearable = computed(() => props.clearable && confirmValue.value.length)

  const getViewOptions = () => {
    nextTick(() => {
      let list = dataOptions.value
      if (cmpAutoFilterable.value && userFilterable.value) {
        // 处理筛选数据
        list = list.map(item => item.filter(value => value[props.labelKey].includes(userFilterable.value)))
      }
      setViewOptions(list)
    })
  }

  const initTreeOptions = () => {
    const options = utils.treeToTable(props.list, selected.value, props.valueKey, props.childrenKey)
    setDataOptions(options)
    getViewOptions()
  }

  const initOptions = () => {
    if (cmpShowDate.value)
      return

    if (props.mode === 'tree') {
      initTreeOptions()
      return
    }

    let list = props.list
    if (!list || !list.length)
      list = [[]]
    if (list[0] && !Array.isArray(list[0]))
      list = [list]

    setDataOptions(list as SelectOption[][])
    getViewOptions()
  }

  watch(() => props.list, initOptions, { immediate: true })

  watch(
    () => props.modelValue,
    (v) => {
      if (Array.isArray(v)) {
        setConfirmValue(v)
      }
      else if (cmpShowDate.value) {
        const value = v ? utils.dayjs(v).format('YYYY MM DD HH mm ss').split(' ') : []
        setConfirmValue(value.map(item => Number(item)))
      }
      else {
        if (dataOptions.value.length > 1 || props.multiple)
          console.error('ste-select: value必须为数组（单列单选模式value可以为string或number类型）')

        setConfirmValue(isData(v) ? [v as number | string] : [])
      }
      setSelected([...confirmValue.value])
    },
    { immediate: true },
  )

  watch(() => userFilterable.value, getViewOptions)

  const onUserFilterable = (e?: any) => {
    const value = inputView.value
    setFilterableTime(() => {
      setUserFilterable(value)
      if (e)
        emits('inputFilterable', value)
      if (cmpAllowCreate.value && value) {
        setDataAllowCreate({
          [props.valueKey]: value,
          [props.labelKey]: value,
        })
      }
      else {
        setDataAllowCreate(undefined)
      }
    }, 10)
  }

  const onBlur = () => {
    setInputPlaceholder(cmpInputPlaceholder.value)
    if (!cmpFilterable.value)
      return
    nextTick(() => {
      const v = confirmValue.value
      // 单选时将confirmValue赋值给输入框。
      if (!cmpMultiple.value && isData(v[0])) {
        const value = dataOptions.value[0]?.find(item => item[props.valueKey] === v[0])
        setInputView(value && value[props.labelKey] ? value[props.labelKey] : '')
        onUserFilterable()
      }
    })
  }

  watch(() => confirmValue.value, onBlur, { immediate: true })

  const onCancel = () => {
    setShowOptions(false)
    setContentStyle({})
    setOptionsStyle({})
    onBlur()
  }

  const clickCancel = () => {
    onCancel()
    emits('cancel') // 触发cancel事件。
  }

  const clickMask = () => {
    if (!props.maskClose)
      return
    clickCancel() // 关闭选项列表。
  }

  const initSelected = (values: Array<string | number>) => {
    const result: Array<string | number> = []
    dataOptions.value.forEach((item, i) => {
      const v = isData(values[i]) && item.find(m => m[props.valueKey] === values[i]) ? values[i] : item[0][props.valueKey]
      result.push(v)
    })
    return result
  }

  const onFocus = () => {
    if (!cmpAutoFilterable.value)
      return
    setInputView('')
    const v = confirmValue.value
    const value = dataOptions.value[0]?.find(item => item[props.valueKey] === v[0])
    setInputPlaceholder(value && value[props.labelKey] ? value[props.labelKey] : cmpInputPlaceholder.value)
    onUserFilterable()
  }

  const openOptions = async () => {
    if (props.disabled)
      return
    if (selected.value.length < dataOptions.value.length) {
      let selected: Array<string | number> = []
      if (dataOptions.value.length > 1)
        selected = initSelected(selected)

      setSelected(selected)
    }

    const el = await utils.querySelector<false>('.ste-select-root', thas.value)
    const { width = 0, height = 0, top = 0, left = 0, bottom = 0 } = el
    setContentStyle({
      position: 'absolute',
      left: `${left}px`,
      top: `${top}px`,
      width: `${width}px`,
      height: `${height}px`,
    })

    const boundary = utils.System.getElementBoundary(el)
    let [y = 'auto', x = 'auto'] = props.optionsPosition === 'auto' ? [] : props.optionsPosition.split('-')

    if (y === 'auto') {
      y = 'bottom'
      if (boundary.top - boundary.bottom > 0)
        y = 'top'
    }

    if (x === 'auto') {
      x = 'start'
      if (boundary.right - boundary.left < 0)
        x = 'end'
    }

    const style: CSSProperties = {
      position: 'absolute',
      display: 'block',
      width: props.optionsWidth === 'auto' ? `${width}px` : utils.formatPx(props.optionsWidth),
    }
    switch (y) {
      case 'top':
        style.bottom = `${boundary.bottom + height + 8}px`
        break
      case 'bottom':
        style.top = `${bottom + 8}px`
        break
    }

    switch (x) {
      case 'start':
        style.left = `${left}px`
        break
      case 'end':
        style.right = `${boundary.right}px`
        break
    }
    setOptionsStyle(style)
    onFocus()
    setShowOptions(true)
  }

  const clickOpenIcon = () => {
    if (showOptions.value)
      onCancel()
    else openOptions()
  }

  const onMultiseriateChange = ({ detail: { value } }: { detail: { value: number[] } }) => {
    const result: Array<string | number> = []
    value.forEach((i, index) => {
      const value = dataOptions.value[index][i]
      if (!value)
        return
      result.push(value[props.valueKey])
    })
    setSelected(result)

    if (props.mode === 'tree') {
      initTreeOptions()
      nextTick(() => {
        setSelected(
          cmpMultiseriateValue.value.map((i, index) => {
            const item = dataOptions.value[index][i]
            return item ? item[props.valueKey] : null
          }),
        )
      })
    }
  }

  const onConfirm = () => {
    setConfirmValue([...selected.value])
    let value: number[] | string | number | undefined = confirmValue.value as number[]

    let objs: SelectOption | SelectOption[] = []
    if (dataOptions.value.length === 1) {
      objs = dataOptions.value[0].filter(value => confirmValue.value.includes(value[props.valueKey]))
    }
    else {
      objs = dataOptions.value.map((item, index) => {
        return item.find(value => value[props.valueKey] === confirmValue.value[index])
      })
    }

    if (cmpShowDate.value && !Array.isArray(props.modelValue)) {
      value = formatDate(confirmValue.value as number[], props.mode as DateMode)?.format(getFormatStr(props.mode as DateMode))
    }
    else if (!cmpMultiple.value && !Array.isArray(props.modelValue)) {
      value = confirmValue.value[0]
      objs = (objs as SelectOption[])[0]
    }

    emits('update:modelValue', value)
    emits('change', value, objs as SelectOption)
    return value
  }

  const onSelect = (col: number, item: SelectOption, isAllowCreate = false) => {
    if (props.multiple && dataOptions.value.length === 1) {
      // 只有一列选项的时候，多选
      const index = selected.value.findIndex(value => value === item[props.valueKey])
      if (index > -1)
        selected.value.splice(index, 1)
      else selected.value.push(item[props.valueKey])
    }
    else {
      const _selected = [...selected.value]
      _selected[col] = item[props.valueKey]
      setSelected(_selected)
    }
    if (cmpAllowCreate.value && isAllowCreate) {
      dataOptions.value[0].unshift(dataAllowCreate.value as SelectOption)
      setDataAllowCreate(undefined)
      getViewOptions()
    }
    onConfirm()
    if (!props.multiple)
      nextTick(onCancel)
  }

  const active = (index: number, item: SelectOption) => {
    if (dataOptions.value.length > 1)
      return selected.value[index] === item[props.valueKey]
    else return selected.value.includes(item[props.valueKey])
  }

  const clickConfirm = () => {
    const value = onConfirm()
    emits('confirm', value)
    nextTick(onCancel)
  }

  const clickClearable = () => {
    confirmValue.value = []
    inputView.value = ''
    selected.value = []
    onConfirm()
  }

  return {
    dataOptions,
    confirmValue,
    selected,
    inputView,
    onUserFilterable,
    inputPlaceholder,
    dataAllowCreate,
    showOptions,
    cmpRootStyle,
    clickMask,
    contentStyle,
    openOptions,
    cmpMultiple,
    cmpFilterable,
    cmpViewValue,
    cmpShowClearable,
    clickOpenIcon,
    optionsStyle,
    cmpShowDate,
    cmpMultiseriateValue,
    onMultiseriateChange,
    viewOptions,
    onSelect,
    active,
    clickCancel,
    clickConfirm,
    clickClearable,
  }
}
