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

  return {
    dataValue,
    setDataValue,
    switchIndex,
    setSwitchIndex,
  }
}
