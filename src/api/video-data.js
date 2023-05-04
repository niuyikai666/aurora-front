import request from '@/utils/request'

// 平台主播列表
export function getPlatformList(params) {
  return request({
    url: '/wechatReport/all/list',
    method: 'get',
    params
  })
}
// 我的主播列表
export function getMyList(params) {
  return request({
    url: '/wechatReport/mine/list',
    method: 'get',
    params
  })
}
// 数据明细
export function getDetailData(params) {
  return request({
    url: '/wechatReport/detail/list',
    method: 'get',
    params
  })
}
