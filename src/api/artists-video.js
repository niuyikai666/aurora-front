import request from '@/utils/request'
// 主播列表-全部主播
export function getArtistAllVideoList(data) {
  return request({
    url: '/wechatManager/all',
    method: 'post',
    data
  })
}
// 主播列表-退会主播
export function getArtistRetiredVideoList(data) {
  return request({
    url: '/wechatManager/retired',
    method: 'post',
    data
  })
}
// 主播列表-tab数量
export function getCountManageVideoNum() {
  return request({
    url: '/wechatManager/count',
    method: 'get'
  })
}
// 我的主播-全部主播
export function getArtistMyVideoList(data) {
  return request({
    url: '/wechatPersonal/all',
    method: 'post',
    data
  })
}
// 我的主播-退会主播
export function getArtistMyRetiredVideoList(data) {
  return request({
    url: '/wechatPersonal/retired',
    method: 'post',
    data
  })
}
// 我的主播Tab数
export function getCountVideoNum(params) {
  return request({
    url: '/wechatPersonal/count',
    method: 'get',
    params
  })
}
// 主播关系管理
export function getRelationManageList(params) {
  return request({
    url: '/wechatPrefill/admin/prefills',
    method: 'get',
    params
  })
}
// 我提交的主播信息列表
export function getOperateList(params) {
  return request({
    url: '/wechatPrefill/prefills',
    method: 'get',
    params
  })
}
// 无运营主播列表
export function getFreeList(params) {
  return request({
    url: '/wechatPrefill/free',
    method: 'get',
    params
  })
}
// 待我绑定主播列表
export function getBoundingList(params) {
  return request({
    url: '/wechatPrefill/mine/to/bind',
    method: 'get',
    params
  })
}
// 添加预填写
export function saveInfluecer(data) {
  return request({
    url: '/wechatPrefill/insert',
    method: 'post',
    data
  })
}
// 预填写详情
export function getPrefillInfluencerInfo(params) {
  return request({
    url: `/wechatPrefill/detail`,
    method: 'get',
    params
  })
}
// 预填写详情
export function checkPrefill(params) {
  return request({
    url: `/wechatPrefill/check`,
    method: 'get',
    params
  })
}
// 删除预填写
export function delPrefill(id) {
  return request({
    url: `/wechatPrefill/wechat/${id}`,
    method: 'delete'
  })
}
// 主播列表-导入记录
export function getExportRecord() {
  return request({
    url: `/wechat/info/current/day/export/record`,
    method: 'get'
  })
}
// 预填写修改
export function editPrefill(data) {
  return request({
    url: `/wechatPrefill/editPrefill`,
    method: 'post',
    data
  })
}
// 主播列表-修改
export function editInfluencer(data) {
  return request({
    url: `/wechatPersonal/edit`,
    method: 'post',
    data
  })
}
// 主播列表-修改
export function getCompletionList(data) {
  return request({
    url: `/wechatBaseInfo/all`,
    method: 'post',
    data
  })
}
// 批量修改运营
export function editOperator(data) {
  return request({
    url: `/wechatBaseInfo/editOperator`,
    method: 'post',
    data
  })
}
// 批量修改关系
export function editRelation(data) {
  return request({
    url: `/wechatBaseInfo/editRelation`,
    method: 'post',
    data
  })
}
// 关系修改记录列表
export function getRelationLogsList(params) {
  return request({
    url: `/wechatBaseInfo/operation/change/logs`,
    method: 'get',
    params
  })
}
