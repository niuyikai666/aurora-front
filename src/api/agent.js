import request from '@/utils/request'

// 获取经纪人列表
export function getAgents (parameter) {
  return request({
    url: '/agent/page',
    method: 'get',
    params: parameter
  })
}

// 绑定账号
export function agentBind (data) {
  return request({
    url: `/agent/update/${data.agentId}/${data.employeeId}`,
    method: 'post'
  })
}
