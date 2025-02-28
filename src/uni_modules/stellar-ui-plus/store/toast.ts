// import { defineStore } from 'pinia'
// import { ref } from 'vue'

// // 轻提示内容
// export const useToastStore = defineStore('toast', () => {
//   const toast = ref({
//     show: false,
//     title: '',
//     icon: '',
//     image: '',
//     duration: 1500,
//     mask: false,
//     success: null,
//     fail: null,
//     complete: null,
//     close: null,
//     timer: [],
//   })
//   const setToast = (val: any) => {
//     toast.value = val
//   }
//   const getToast = () => {
//     return toast.value
//   }

//   return {
//     toast,
//     setToast,
//     getToast,
//   }
// })

// // 轻提示队列
// export const useToastLastParams = defineStore('toastLastParams', () => {
//   const toastLastParams = ref({
//     time: 0,
//   })
//   const setToastLastParams = (val: any) => {
//     toastLastParams.value = val
//   }
//   const getToastLastParams = () => {
//     return toastLastParams.value
//   }

//   return {
//     toastLastParams,
//     setToastLastParams,
//     getToastLastParams,
//   }
// })
