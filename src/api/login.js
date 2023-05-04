import request from '@/utils/request'
import { USER_INFO } from '@/store/mutation-types'
import storage from 'store'

export function login (parameter) {
  return request({
    url: '/login',
    method: 'post',
    data: parameter
  })
}

// 获取用户信息
export function getInfo () {
  const userInfo = storage.get(USER_INFO)
  return Promise.resolve(JSON.parse(userInfo))
}

// 根据uid获取用户信息
export function getUserInfo (uid) {
  return request({
    url: `/login/feishu/employee/cache?uid=${uid}`,
    method: 'get'
  })
}

// 登出
export function logout () {
  return request({
    url: '/logout',
    method: 'get'
  })
}

// 获取二维码信息
export function getQrcodeUrl () {
  return request({
    url: '/login/feishu/url',
    method: 'get'
  })
}
