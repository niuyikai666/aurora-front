import request from '@/utils/request'

// 保存意见反馈  保反馈留意见
export function addfeedback (data) {
  return request({
    url: `/feedback/save`,
    method: 'post',
    data
  })
}
// 获取保留列表
export function feedbacklist (parameter) {
    return request({
    url: '/feedback/feedbacklist',
    method: 'get',
    params: parameter
     })
}
