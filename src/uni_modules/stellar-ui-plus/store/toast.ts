import { defineStore } from 'pinia'
import { ref } from 'vue'

// token配置
export const useToastStore = defineStore('toast', () => {
  const toast = ref({
    openBegin: false,
    title: '',
    icon: '',
    image: '',
    duration: 1500,
    mask: false,
    success: null,
    fail: null,
    complete: null,
    close: null,
    timer: [],
  })
  const setToast = (val: any) => {
    toast.value = val
  }
  const getToast = () => {
    return toast.value
  }

  return {
    toast,
    setToast,
    getToast,
  }
})
