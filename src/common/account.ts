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
    info = await request('/client/account/info')
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
    const token = await request('/client/account/login', {
      code,
    }, 'POST')
    console.log("ttttttttttttt", token)
    setToken(token)
  } catch (e) {
    console.log(e)
    return false
  }
}

export async function logout() {
  try {
    await request('/client/account/logout')
    removeToken()
  }
  catch (e) {
    // TODO handle the exception
  }
}
