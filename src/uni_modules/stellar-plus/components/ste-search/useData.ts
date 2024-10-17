import { ref } from 'vue'

export default function useData() {
  const dataValue = ref('')
  const setDataValue = (value: string) => {
    dataValue.value = value
  }

  const switchIndex = ref(0)
  const setSwitchIndex = (index: number) => {
    switchIndex.value = index
  }

  const cursorNumber = ref(0)
  const setCursorNumber = (num: number) => {
    cursorNumber.value = num
  }

  const showSuggestionsBox = ref<null | boolean>(null)
  const setShowSuggestionsBox = (value: boolean) => {
    showSuggestionsBox.value = value
  }

  return {
    dataValue,
    setDataValue,
    switchIndex,
    setSwitchIndex,
    cursorNumber,
    setCursorNumber,
    showSuggestionsBox,
    setShowSuggestionsBox,
  }
}
