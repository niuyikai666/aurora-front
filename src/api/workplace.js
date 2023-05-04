import request from '@/utils/request'

// 获取直播记录
export function getLiveRecord (parameter) {
  return request({
    url: '/terminal/detail',
    method: 'get',
    params: parameter
  })
}

// 获取统计信息
export function getStatics (parameter) {
  return request({
    url: `/terminal/statis`,
    method: 'get',
    params: parameter
  })
}
// 获取运营设置
export function getReminSetting (parameter) {
  return request({
    url: `/reminder/query`,
    method: 'get',
    params: parameter
  })
}
// 获取运营提醒列表
export function getRemindList (parameter) {
  return request({
    url: `/reminder/list`,
    method: 'get',
    params: parameter
  })
}
// 设置运营设置
export function saveRemindSetting (data) {
  return request({
    url: `reminder/save`,
    method: 'post',
    data
  })
}
