import request from '@/utils/request'

// 待确认结算关系,已确认结算关系,我的结算主播列表
export function getComfirmingList(params) {
  return request({
    url: '/settle/month/operation/list',
    method: 'get',
    params
  })
}
// 待确认结算关系,已确认结算关系,我的结算主播列表
export function getRecordList(params) {
  return request({
    url: '/settle/month/operation/feedback/list',
    method: 'get',
    params
  })
}
// 获取确认时间
export function getTimes(params) {
  return request({
    url: '/settle/month/operation/expirationDate',
    method: 'get',
    params
  })
}
// 设置确认时间
export function setTimes(params) {
  return request({
    url: '/settle/month/operation/set/expirationDate',
    method: 'post',
    params
  })
}
// 确认结算关系
export function comfirmRelation(data) {
  return request({
    url: '/settle/month/operation/confirm',
    method: 'post',
    data
  })
}
// 关系反馈
export function feedbackHandle(data) {
  return request({
    url: '/settle/month/operation/feedback',
    method: 'post',
    data
  })
}
// 变更运营
export function operateChange(data) {
  return request({
    url: '/settle/month/operation/fd/ope',
    method: 'post',
    data
  })
}
// 导入无运营
export function importNoImport(data) {
  return request({
    url: '/settle/month/operation/import/no/operation',
    method: 'post',
    data
  })
}
// 同步到已确认
export function feedbackConfirm(data) {
  return request({
    url: '/settle/month/operation/feedback/confirm',
    method: 'post',
    data
  })
}
export function getFeedbackInfluencer(params) {
  return request({
    url: `/settle/month/operation/feedback/list/${params.id}`,
    method: 'get',
    params
  })
}

// 提成明细-个播
export function getPersonList(params) {
  return request({
    url: `/actor/task/commission/getCommissionDetailTiktokList`,
    method: 'get',
    params
  })
}
// 主播任务明细
export function getPersonListDetail(params) {
  return request({
    url: `/actor/task/commission/getActorTaskDetail`,
    method: 'get',
    params
  })
}
// 提成明细-九宫格
export function getSquaredList(params) {
  return request({
    url: `/actor/task/commission/getCommissionDetailVideoPalaceList`,
    method: 'get',
    params
  })
}

// 提成明细-团队
export function getTeamList(params) {
  return request({
    url: `/actor/task/commission/getTeamCommissionDetailList`,
    method: 'get',
    params
  })
}

// 提成总计
export function getCommisionTotal(params) {
  return request({
    url: `/actor/task/commission/getLeaderTotalCommission`,
    method: 'get',
    params
  })
}
