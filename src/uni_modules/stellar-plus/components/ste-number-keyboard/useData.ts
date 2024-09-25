import { computed, ref, watch } from 'vue'
import utils from '../../utils/utils'
import type { NumberKeyboardProps } from './props'

export default function useData({ props, emits }: {
  props: NumberKeyboardProps
  emits: {
    (e: 'change', value: string): void
    (e: 'input', value: string): void
    (e: 'update:modelValue', value: string): void
    (e: 'clear'): void
    (e: 'backspace'): void
    (e: 'confirm', value: string): void
    (e: 'click', key: string): void
    (e: 'beforeinput', key: string, suspend: () => void, next: () => void, stop: () => void): void
    (e: 'close'): void
    (e: 'update:show', show: boolean): void
    (e: 'open'): void
  }
}) {
  const dataValue = ref('')
  const setDataValue = (value: string) => {
    if (value === dataValue.value)
      return
    if (value === null || value === undefined)
      dataValue.value = ''
    else if (typeof value === 'string')
      dataValue.value = value
    else dataValue.value = String(value)
  }

  const dataShow = ref(false)
  const setDataShow = (value: boolean) => {
    if (value === dataShow.value)
      return
    dataShow.value = value
  }

  const cmpNumbers = computed(() => {
    let keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
    if (props.randomKeys)
      keys = utils.randomArray(keys)

    if (Array.isArray(props.customKeys))
      keys.push(...props.customKeys)

    if (!props.rightKeys) {
      if (!props.showClear) {
        keys.push('backspace')
        return
      }
      const d = keys.length % 3
      if (d === 1) {
        const end = keys.pop()
        keys.push('clear', end || '', 'backspace')
      }
      else {
        keys.push('clear', 'backspace')
      }
    }
    return keys
  })

  const cmpRootStyle = computed(() => {
    const fontsize = utils.formatPx(props.textSize, 'num')
    return {
      '--ste-number-keyboard-text-color': props.textColor,
      '--ste-number-keyboard-text-size': utils.formatPx(props.textSize),
      '--ste-number-keyboard-clear-text-size': utils.isNaN(fontsize) ? fontsize : `${fontsize - 8}px`,
      '--ste-number-keyboard-confirm-text-size': utils.isNaN(fontsize) ? fontsize : `${fontsize - 3}px`,
      '--ste-number-keyboard-confirm-bg': props.confirmBg,
      '--ste-number-keyboard-confirm-bg-active': utils.Color.formatColor(props.confirmBg, 0.8),
      '--ste-number-keyboard-confirm-color': props.confirmColor,
    }
  })

  watch(() => props.modelValue, setDataValue, { immediate: true })
  watch(() => props.show, setDataShow, { immediate: true })

  const onClose = () => {
    setDataShow(false)
    emits('update:show', false)
    emits('close')
  }

  const beforInput = async (value: string) => {
    let next = true
    const stop = new Promise((resolve, reject) => {
      emits(
        'beforeinput',
        value,
        () => (next = false),
        () => resolve('next'),
        () => reject(new Error('beforInput stop')),
      )
    })
    if (!next)
      await stop

    /* eslint prefer-promise-reject-errors: "error" */
  }

  const onChange = async (value: string) => {
    try {
      if (value === 'confirm') {
        emits('confirm', dataValue.value)
        onClose()
        return
      }
      switch (value) {
        case 'backspace':
          setDataValue(dataValue.value.slice(0, dataValue.value.length - 1))
          emits('backspace')
          break
        case 'clear':
          setDataValue('')
          emits('clear')
          break
        default:
          await beforInput(value)
          emits('click', value)
          if (props.maxlength && dataValue.value.length >= Number(props.maxlength))
            return
          dataValue.value += value
          break
      }
      emits('input', dataValue.value)
      emits('change', dataValue.value)
      emits('update:modelValue', dataValue.value)
    }
    catch (e) {
      if (e)
        console.error(e)
    }
  }

  const onOpen = () => emits('open')

  return { cmpNumbers, cmpRootStyle, dataShow, onClose, onChange, onOpen }
}
