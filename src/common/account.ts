import request from './request'
import { getToken, removeToken, setToken } from './token'

export async function isLogin() {
  try {
    const token = getToken()
    if (!token)
      return false
    const info = await getInfo()
    if (!info)
      return false
    return token
  }
  catch (e) {
    // TODO handle the exception
    return false
  }
}

export async function getInfo(pull = false) {
  try {
    let info = pull ? null : uni.getStorageSync('user-info')
    if (info)
      return JSON.parse(info)
    const token = getToken()
    if (!token)
      return null
    info = await request('/account/info')
    uni.setStorageSync('user-info', JSON.stringify(info))
    return info
  }
  catch (e) {
    // TODO handle the exception
    return null
  }
}

export async function login() {
  try {
    const {
      code,
    } = await wx.login()
    const token = await request('/account/login', {
      code,
    }, 'POST')
    setToken(token)
  }
  catch (e) {
    return false
  }
}

export async function logout() {
  try {
    await request('/account/logout')
    removeToken()
  }
  catch (e) {
    // TODO handle the exception
  }
}
