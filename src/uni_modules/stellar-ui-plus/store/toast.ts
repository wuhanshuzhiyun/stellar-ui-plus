import { reactive } from 'vue'

// 轻提示内容
export function useToastStore() {
  const toast = reactive({
    show: false,
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
    if ('show' in val)
      toast.show = val.show
    if ('title' in val)
      toast.title = val.title
    if ('icon' in val)
      toast.icon = val.icon
    if ('image' in val)
      toast.image = val.image
    if ('duration' in val)
      toast.duration = val.duration
    if ('mask' in val)
      toast.mask = val.mask
    if ('success' in val)
      toast.success = val.success
    if ('fail' in val)
      toast.fail = val.fail
    if ('complete' in val)
      toast.complete = val.complete
    if ('close' in val)
      toast.close = val.close
    if ('timer' in val)
      toast.timer = val.timer
  }
  const getToast = () => {
    return toast
  }

  return {
    toast,
    setToast,
    getToast,
  }
}

// 轻提示队列
export function useToastLastParams() {
  const toastLastParams = reactive({
    time: 0,
  })
  const setToastLastParams = (val: any) => {
    if ('time' in val)
      toastLastParams.time = val.time
  }
  const getToastLastParams = () => {
    return toastLastParams
  }

  return {
    toastLastParams,
    setToastLastParams,
    getToastLastParams,
  }
}
