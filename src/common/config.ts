// 全局常量
const IMAGE_BASE_URL = 'https://image.whzb.com/chain/StellarUI/' // 图片根地址
const IMAGE_COMMON = ''
const BASE_URL = 'https://stellar-ui.intecloud.com.cn/api'
const SSE_URL = 'https://stellar-ui.intecloud.com.cn/sse'
const BASE_WEB_URL = 'https://stellar-ui.intecloud.com.cn'
// const BASE_URL = 'http://127.0.0.1:3000/api'
// const SSE_URL = 'http://127.0.0.1:3000/api'

const IMAGE_SYSTEM_THENE = ''
const AdminPwd = 'ste-admin'

// 顶部导航栏相关配置
const NAV_KEY_DEV = 'DEV' // 开发指南
const NAV_KEY_COMP = 'COMP' // 组件
const NAV_DATA = [
  {
    key: NAV_KEY_DEV,
    title: '开发指南',
  },
  {
    key: NAV_KEY_COMP,
    title: '组件',
  },
]

// 组件文档页导航相关配置
const NAV_COMP_KEY_DEMO = 'DEMO'
const NAV_COMP_KEY_API = 'API'
const NAV_COMP_KEY_GUIDE = 'GUIDE'
const NAV_COMP_DATA = [
  {
    key: NAV_COMP_KEY_DEMO,
    title: '示例',
  },
  {
    key: NAV_COMP_KEY_API,
    title: 'API',
  },
  {
    key: NAV_COMP_KEY_GUIDE,
    title: '指南',
  },
]

const SHOW_H5_PAGE = ['个性化']

export default {
  /** 图片根地址 */
  IMAGE_BASE_URL,
  IMAGE_COMMON,
  BASE_URL,
  AdminPwd,
  IMAGE_SYSTEM_THENE,
  SSE_URL,
  NAV_DATA,
  NAV_KEY_DEV,
  NAV_KEY_COMP,
  NAV_COMP_DATA,
  NAV_COMP_KEY_DEMO,
  NAV_COMP_KEY_API,
  NAV_COMP_KEY_GUIDE,
  BASE_WEB_URL,
  SHOW_H5_PAGE,
}
