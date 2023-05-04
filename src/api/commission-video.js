import request from '@/utils/request'

// 员工提成比例
export function getEmployeeCommissionList(data) {
  return request({
    url: '/empCommission/list',
    method: 'post',
    data
  })
}
// 员工提成查询
export function getEmployeeCommissionDetail(params) {
  return request({
    url: '/empCommission/byId',
    method: 'get',
    params
  })
}
// 更新员工提成
export function updateEmployeeCommission(data) {
  return request({
    url: '/empCommission/update',
    method: 'put',
    data
  })
}
// 主播提成比例
export function getInfluencerCommissionList(data) {
  return request({
    url: '/actorCommission/list',
    method: 'post',
    data
  })
}
// 主播提成比例查询
export function getInfluencerCommissionDetail(params) {
  return request({
    url: '/actorCommission/byId',
    method: 'get',
    params
  })
}
// 更新主播提成比例
export function updateInfluencerCommission(data) {
  return request({
    url: '/actorCommission/update',
    method: 'put',
    data
  })
}
// 视频号任务管理
export function getVideoTaskList(data) {
  return request({
    url: '/missionTaskTarget/list',
    method: 'post',
    data
  })
}
// 拉新主播进阶查询
export function getPullTaskList(data) {
  return request({
    url: '/actorAdvanced/list',
    method: 'post',
    data
  })
}
// 导入视频号任务
export function importVideoTask(data) {
  return request({
    url: '/wechat/info/import/taskTarget',
    method: 'post',
    data
  })
}
// 豁免
export function exemptVideoTask(data) {
  return request({
    url: '/missionTaskTarget/update',
    method: 'put',
    data
  })
}
// 拉新主播进阶任务管理详情
export function getPullTaskDetail(params) {
  return request({
    url: '/actorAdvanced/byId',
    method: 'get',
    params
  })
}
// 拉新主播进阶任务管理修改
export function updatePullTask(data) {
  return request({
    url: '/actorAdvanced/update',
    method: 'put',
    data
  })
}
// 导入任务类型
export function importTaskType(data, dataMonth) {
  return request({
    url: `/wm/actor/import/${dataMonth}`,
    method: 'post',
    data
  })
}
// 主播任务类型管理列表
export function getTaksTypeList(data) {
  return request({
    url: '/wm/actor/page',
    method: 'post',
    data
  })
}
// 专业主播数据管理
export function getDataInfoList(data) {
  return request({
    url: '/wm/major/page',
    method: 'post',
    data
  })
}
// 导入专业主播数据
export function importDataInfo(data, dataMonth) {
  return request({
    url: `/wm/major/import/${dataMonth}`,
    method: 'post',
    data
  })
}
// 短视频日数据列表
export function getDayDataList(data) {
  return request({
    url: '/wm/vd/page',
    method: 'post',
    data
  })
}
// 导入短视频日数据
export function importDayData(data) {
  return request({
    url: `/wm/vd/import`,
    method: 'post',
    data
  })
}
// 主播任务列表-主播任务
export function getInfluencerTaskList(data) {
  return request({
    url: `/wechat/results/page`,
    method: 'post',
    data
  })
}
// 手动触发计算
export function manualTrigger() {
  return request({
    url: `/wechat/results/manualTrigger`,
    method: 'get'
  })
}
// 主播任务列表-我的主播任务
export function getMyInfluencerTaskList(data) {
  return request({
    url: `/wechat/results/my/page`,
    method: 'post',
    data
  })
}
