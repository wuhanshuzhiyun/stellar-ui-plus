import { ref } from 'vue'
import type { InputAccept, UploadFileType } from '../../types'

export default function useData() {
  const dataValue = ref<UploadFileType[]>([])
  const setDataValue = (val: UploadFileType[]) => {
    dataValue.value = val
  }

  const previewIndex = ref<number | null>(null)
  const setPreviewIndex = (val: number | null) => {
    previewIndex.value = val
  }

  const reading = ref<boolean | null>(null)
  const setReading = (val: boolean | null) => {
    reading.value = val
  }

  const deleting = ref<boolean | null>(null)
  const setDeleting = (val: boolean | null) => {
    deleting.value = val
  }

  // #ifdef MP-ALIPAY
  const mediaType = ref<InputAccept>('image')
  const setMediaType = (val: InputAccept) => {
    mediaType.value = val
  }
  // #endif

  return {
    dataValue,
    setDataValue,
    previewIndex,
    setPreviewIndex,
    reading,
    setReading,
    deleting,
    setDeleting,
    // #ifdef MP-ALIPAY
    mediaType,
    setMediaType,
    // #endif
  }
}
