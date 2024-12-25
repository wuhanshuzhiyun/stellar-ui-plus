import { ref } from 'vue'

// toast 变量
const toast = ref({
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
})

function setToast(val: any) {
  toast.value = val
  console.log('toast', toast.value)
}
function getToast() {
  return toast.value
}

// 定时器变量
const toastTimer = ref([])

function setToastTimer(val: any) {
  toastTimer.value = val
}
function getToastTimer() {
  return toastTimer.value
}

// 队列变量
const toastLastParams = ref({
  time: 0,
})

function setToastLastParams(val: any) {
  toastLastParams.value = val
}
function getToastLastParams() {
  return toastLastParams.value
}
function clearToastLastParams() {
  toastLastParams.value.time = 0
}

export { toast, setToast, getToast, toastTimer, setToastTimer, getToastTimer, toastLastParams, setToastLastParams, getToastLastParams, clearToastLastParams }
