import { createPinia } from 'pinia'
import { createSSRApp } from 'vue'
import App from '@/App.vue'

const store = createPinia()
const app = createSSRApp(App)
app.use(store)
export default store
// 模块统一导出
export * from './toast'
export * from './message-box'
