import request from '@/utils/request'

// 模块列表
export function getModuleList (data) {
  return request({
    url: '/interfaceStatis/parent',
    method: 'post',
    data
  })
}
// 页面列表
export function getPageList (data) {
  return request({
    url: '/interfaceStatis/page',
    method: 'post',
    data
  })
}
// 模块详情
export function getModuleDetail (data) {
  return request({
    url: '/interfaceStatis/parent/details',
    method: 'post',
    data
  })
}
// 页面详情详情
export function getPageDetail (data) {
  return request({
    url: '/interfaceStatis/page/detail',
    method: 'post',
    data
  })
}
// 日活跃统计
export function getDaysData (params) {
  return request({
    url: '/interfaceStatis/day',
    method: 'get',
    params
  })
}
// 月活统计
export function getMonthsData (params) {
  return request({
    url: '/interfaceStatis/month',
    method: 'get',
    params
  })
}
