import request from '@/utils/request'

// 预填写列表
export function getPrefillsList (parameter) {
  return request({
    url: '/afterGoldData/prefills',
    method: 'get',
    params: parameter
  })
}
// 抖音、火山号搜索
export function searchAccount (parameter) {
  return request({
    url: '/afterGoldData/prefills/check-if-possible',
    method: 'get',
    params: parameter
  })
}
// 添加预填写
export function saveInformation (data) {
  return request({
    url: '/afterGoldData/prefills',
    method: 'post',
    data
  })
}

// 编辑抖音号
export function editAccount (id, data) {
  return request({
    url: `/afterGoldData/prefills/${id}`,
    method: 'patch',
    data
  })
}
// 预填写详情
export function getInfluencerInfo (id) {
  return request({
    url: `/afterGoldData/prefills/${id}`,
    method: 'get'
  })
}
// 预填写统计
export function getPrefillCounts (id) {
  return request({
    url: `/afterGoldData/prefills/counts`,
    method: 'get'
  })
}
// 删除
export function delInfluencer (id) {
  return request({
    url: `/afterGoldData/prefills/${id}`,
    method: 'delete'
  })
}
