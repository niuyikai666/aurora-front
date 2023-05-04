import request from '@/utils/request'

// 零招募提成主播列表
export function getZeroList(params) {
  return request({
    url: `/actor/task/manage/getZeroRecruitRationActorList`,
    method: 'get',
    params
  })
}
// 刷量主播列表
export function getMuchList(params) {
  return request({
    url: `/actor/task/manage/getShamFlowActorList`,
    method: 'get',
    params
  })
}
// 签约对赌主播列表
export function getBettingList(params) {
  return request({
    url: `/actor/task/manage/getSignGamblingActor`,
    method: 'get',
    params
  })
}
// 新增零招募提成主播
export function addZero(data) {
  return request({
    url: `/actor/task/manage/addZeroRecruitRationActor`,
    method: 'post',
    data
  })
}
// 删除零招募提成主播
export function delZero(data) {
  return request({
    url: `/actor/task/manage/deleteZeroRecruitRationActor`,
    method: 'post',
    data
  })
}
// 导入零招募提成主播
export function importZero(data) {
  return request({
    url: `/actor/task/manage/importZeroRecruitRationActor`,
    method: 'post',
    data
  })
}
// 导入刷量主播
export function importMuch(data) {
  return request({
    url: `/actor/task/manage/importShamFlowActor`,
    method: 'post',
    data
  })
}
// 导入签约对赌主播
export function importBetting(data) {
  return request({
    url: `/actor/task/manage/importSignGamblingActor`,
    method: 'post',
    data
  })
}
// 新增签约对赌主播
export function addBetting(data) {
  return request({
    url: `/actor/task/manage/addSignGamblingActor`,
    method: 'post',
    data
  })
}
// 结束签约对赌主播
export function endBetting(params) {
  return request({
    url: `/actor/task/manage/updateSignGamblingEndDate`,
    method: 'get',
    params
  })
}
