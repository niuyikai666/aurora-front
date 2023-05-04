import request from '@/utils/request'

// 我的主播可激活列表
export function getMyActivingList(params) {
  return request({
    url: '/coolcolleges/activables/mine',
    method: 'get',
    params
  })
}
// 日志
export function getLogsList(params) {
  return request({
    url: `/coolcollege-operate-records/by-account-id/${params.id}`,
    method: 'get',
    params
  })
}
// 激活账号
export function activeAccount(params) {
  return request({
    url: `/coolcolleges/active`,
    method: 'patch',
    params
  })
}
// 我的主播已激活列表
export function getMyActivedList(params) {
  return request({
    url: '/coolcolleges/activateds/mine',
    method: 'get',
    params
  })
}
// 我的主播已激活列表
export function manageMyActivedTime(params) {
  return request({
    url: '/coolcolleges/change-expire-time',
    method: 'patch',
    params
  })
}
// 冻结账号
export function frozenAccount(params) {
  return request({
    url: '/coolcolleges/frozen',
    method: 'patch',
    params
  })
}
// 我的主播已激活列表
export function getMyOutTimeList(params) {
  return request({
    url: '/coolcolleges/invalids/mine',
    method: 'get',
    params
  })
}
// 删除账号
export function delAccount(params) {
  return request({
    url: '/coolcolleges/delete',
    method: 'patch',
    params
  })
}
// 主播管理可激活列表
export function getManageActivingList(params) {
  return request({
    url: '/coolcolleges/activables',
    method: 'get',
    params
  })
}
// 主播管理已激活列表
export function getManageActivedList(params) {
  return request({
    url: '/coolcolleges/activateds',
    method: 'get',
    params
  })
}
// 主播管理失效列表
export function getManageOutTimeList(params) {
  return request({
    url: '/coolcolleges/invalids',
    method: 'get',
    params
  })
}
// 运营人搜索
export function artistSearch(parameter) {
  return request({
    url: '/employee/search/name/duty',
    method: 'get',
    params: parameter
  })
}
