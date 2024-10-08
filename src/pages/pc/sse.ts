import config from '@/common/config'

class SSE {
  sse
  constructor(url = `/pclogin`) {
    const uuid = uni.getStorageSync('uuid')
    this.sse = new EventSource(`${config.SSE_URL}${url}?uuid=${uuid}`)
  }

  // 监听数据
  onmessage(callback: (data: string) => void) {
    this.sse.addEventListener('message', (event) => {
      callback(event.data)
    })
  }

  // 关闭sse连接
  close() {
    this.sse.close()
  }
}

export default SSE
