import request from '@/utils/request'

// 获取公告列表
export function getNoticeList (parameter) {
  return request({
    url: '/notice/list',
    method: 'get',
    params: parameter
  })
}

// 获取公告详情
export function getTaskRecent (id) {
  return request({
    url: `/notice/detail?id=${id}`,
    method: 'get'
  })
}

// 新增公告
export function noticeCreate (data) {
  return request({
    url: '/notice/add',
    method: 'post',
    data
  })
}

// 修改公告
export function noticeModify (data) {
  return request({
    url: `/notice/update`,
    method: 'post',
    data
  })
}
