import request from '@/utils/request'

// 我发起的列表
export function getApplyList (params) {
  return request({
    url: `/activation/myActivation`,
    method: 'get',
    params
  })
}
// 详情
export function applyDetail (id) {
  return request({
    url: `/activation/detail/${id}`,
    method: 'get'
  })
}
// 创建激活申请
export function addApplyList (data) {
  return request({
    url: `/activation/insert`,
    method: 'post',
    data
  })
}
// 删除激活申请
export function delApplyList (id) {
  return request({
    url: `/activation/${id}`,
    method: 'delete'
  })
}
// 已收到激活申请列表
export function getReceiveList (params) {
  return request({
    url: `/activation/receivedActivation`,
    method: 'get',
    params
  })
}
// 已收到激活申请列表
export function getActivedList (params) {
  return request({
    url: `/activation/sendActivation`,
    method: 'get',
    params
  })
}
// 处理仲裁
export function dealList (params) {
  return request({
    url: `/activation/handle/arbitration`,
    method: 'put',
    params
  })
}
// 审核
export function handleArbitration (params) {
  return request({
    url: `/activation/examine`,
    method: 'put',
    params
  })
}
// 申请仲裁
export function applicationHandle (id) {
  return request({
    url: `/activation/launch/arbitration/${id}`,
    method: 'put'
  })
}
