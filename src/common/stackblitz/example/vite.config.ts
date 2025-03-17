// vite.config.js
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [
    uni(),
  ],
  define: {
    // 将环境变量注入到前端代码中
    'import.meta.env.VITE_EXAMPLE_PAGE': JSON.stringify(process.env.VITE_EXAMPLE_PAGE || '')
  },
  server: {
    // 允许CodeSandbox的主机访问
    port: 5166,
  }
})