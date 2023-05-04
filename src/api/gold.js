import request from '@/utils/request'
// 获取列表信息
export function goldListData(parameter) {
  return request({
    url: '/afterGoldData/list',
    method: 'post',
    data: parameter
  })
}
// 导出字段--艺人信息
export function getExportArtist() {
  return request({
    url: '/afterGoldData/export/influencer/fields',
    method: 'get'
  })
}
// 导出字段--艺人短视频信息
export function getExportMedia() {
  return request({
    url: '/afterGoldData/export/video/fields',
    method: 'get'
  })
}
// 导出字段--艺人短视频信息
export function exportData(params) {
  return request({
    url: '/afterGoldData/export/list',
    method: 'post',
    data: params
  })
}
// 艺人详情
export function getArtisInfo(id) {
  return request({
    url: `/afterGoldData/influencer/info/${id}`,
    method: 'get'
  })
}
// 短视频详情
export function getMediaInfo(id) {
  return request({
    url: `/afterGoldData/video/info/${id}`,
    method: 'get'
  })
}
// 获取艺人头部信息
export function getArtistMainData(id) {
  return request({
    url: `/afterGoldData/main/${id}`,
    method: 'get'
  })
}
// 修改主播信息
export function editArtistMessage(params) {
  return request({
    url: '/afterGoldData/influencer/info/edit',
    method: 'post',
    data: params
  })
}
// 修改主播信息
export function editMeDiatMessage(params) {
  return request({
    url: '/afterGoldData/influencer/video/info/edit',
    method: 'post',
    data: params
  })
}
// 其他部门人搜索
export function artistSearch(parameter) {
  return request({
    url: '/employee/search/name/duty',
    method: 'get',
    params: parameter
  })
}
// 范围部门人搜索
export function artistAuthSearch(parameter) {
  return request({
    url: '/employee/search/name',
    method: 'get',
    params: parameter
  })
}
// 经纪人搜索
export function agentSearch(parameter) {
  return request({
    url: '/afterGoldData/agentSearch',
    method: 'get',
    params: parameter
  })
}
// 主播信息补全 运营人搜索
export function artistSearch2(parameter) {
  return request({
    url: '/employee/search/all/company/name',
    method: 'get',
    params: parameter
  })
}

// 无权限人员搜索
export function artistSignSearch(parameter) {
  return request({
    url: '/employee/search',
    method: 'get',
    params: parameter
  })
}

// 批量修改主播关系
export function editArtistRelation(parameter) {
  return request({
    url: '/afterGoldData/batch/update/operation',
    method: 'post',
    data: parameter
  })
}
// 修改关系列表
export function getRelationList(params) {
  return request({
    url: '/afterGoldData/operation/change/log/list',
    method: 'get',
    params: params
  })
}
// 导入签约人
export function importOperation(data) {
  return request({
    url: '/afterGoldData/upload/sign/operation',
    method: 'post',
    data
  })
}
// 保存金数据
export function saveInfluecer(data) {
  return request({
    url: `/actorRelation/prefills`,
    method: 'post',
    data
  })
}
// 预填写详情
export function getPrefillInfluencerInfo(id) {
  return request({
    url: `/actorRelation/prefills/${id}`,
    method: 'get'
  })
}

// 校验入会是否超过14天
export function checkInfluncerDays(params) {
  return request({
    url: `/actorRelation/check/day`,
    method: 'get',
    params
  })
}
// 获取导出字段
export function getExportColumns() {
  return request({
    url: `/wechat/info/export/fields`,
    method: 'get'
  })
}
// 导出所有主播
export function exportAllList(data) {
  return request({
    url: `/afterGoldData/export/list`,
    method: 'post',
    responseType: 'blob',
    data
  })
}
// 导出单个主播
export function exportInfluencer(data) {
  return request({
    url: `/afterGoldData/export/influencer`,
    method: 'post',
    responseType: 'blob',
    data
  })
}
