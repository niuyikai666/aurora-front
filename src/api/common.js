import request from '@/utils/request'

// 获取验证码(登录)
export function getCode (params) {
  return request({
    url: '/sms/ver-code/4login',
    method: 'get',
    params
  })
}

// 获取验证码(通用1)
export function getCode1 (type) {
  return request({
    url: '/sms/ver-code/2self',
    method: 'get',
    params: { type }
  })
}

// 获取验证码（通用2）
export function getCode2 (params) {
  return request({
    url: '/sms/ver-code/2phone',
    method: 'get',
    params
  })
}

// 获取最新数据时间
export function getNewTime () {
  return request({
    url: '/dataSync/newest',
    method: 'get'
  })
}

// 解析图片/pdf文本
export function getContext (url) {
  return request({
    url: `/files/ocr?filename=${url}`,
    method: 'get'
  })
}
