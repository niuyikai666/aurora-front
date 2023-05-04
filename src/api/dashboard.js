import request from '@/utils/request'

// 获取工作台指标
export function getTarget () {
  return request({
    url: '/index/target',
    method: 'get'
  })
}

// 最近
export function getTaskRecent () {
  return request({
    url: '/index/mission/target/near/start',
    method: 'get'
  })
}

// 最新
export function getTaskNew () {
  return request({
    url: '/index/mission/target/near/end',
    method: 'get'
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

// 获取公告列表
export function getNoticeList () {
  return request({
    url: '/notice/index/list',
    method: 'get'
  })
}
