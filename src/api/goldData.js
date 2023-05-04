import request from '@/utils/request'

// 搜索接口
export function search (number) {
  return request({
    url: `/beforeGoldData/search?newTrillNumberOrOldTrillNumber=${number}`,
    method: 'get'
  })
}
// 艺人详情
export function getArtisInfo (parameter) {
  return request({
    url: `/beforeGoldData/before/find/influencer/info`,
    method: 'get',
    params: parameter
  })
}
// 修改主播信息
export function editArtistMessage (params) {
  return request({
    url: '/beforeGoldData/influencer/info/edit',
    method: 'post',
    data: params
  })
}
// 运营搜索
export function artistInfoSearch (parameter) {
  return request({
    url: '/beforeGoldData/employee/search/operate',
    method: 'get',
    params: parameter
  })
}
// 结构树
export function getStructure () {
  return request({
    url: '/department/business/structure',
    method: 'get'
  })
}
// 短视频详情
export function getMediaInfo (parameter) {
  return request({
    url: `/beforeGoldData/before/find/influencer/video/info`,
    method: 'get',
    params: parameter
  })
}
// 修改主播信息
export function editMeDiatMessage (params) {
  return request({
    url: '/beforeGoldData/influencer/video/info/edit',
    method: 'post',
    data: params
  })
}
// 获取艺人头部信息
export function getArtistMainData (id) {
  return request({
    url: `/beforeGoldData/main/${id}`,
    method: 'get'
  })
}
// 登录
export function login (parameter) {
  return request({
    url: '/login/test',
    method: 'post',
    data: parameter
  })
}
// 其他部门人搜索
export function artistSearch (parameter) {
  return request({
    url: '/employee/search/name/duty',
    method: 'get',
    params: parameter
  })
}
