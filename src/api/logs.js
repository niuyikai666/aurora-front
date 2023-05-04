import request from '@/utils/request'

// 获取经纪人列表
export function getLogs (parameter) {
  return request({
    url: '/logs',
    method: 'get',
    params: parameter
  })
}

// 获取记录操作日志
export function getLogsById (params) {
  return request({
    url: '/log/listById',
    method: 'get',
    params
  })
}
