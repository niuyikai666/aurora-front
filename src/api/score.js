// 评委列表
import request from '@/utils/request'
export function getPersonList (parameter) {
  return request({
    url: '/actor/score/judge/page/list',
    method: 'get',
    params: parameter
  })
}
// 添加评委
export function addPerson (parameter) {
  return request({
    url: '/actor/score/judge/add',
    method: 'post',
    data: parameter
  })
}
// 删除评委
export function delPerson (parameter) {
  return request({
    url: '/actor/score/judge/delete',
    method: 'delete',
    data: parameter
  })
}
// 搜索员工
export function searchEmployee (data) {
  return request({
    url: '/actor/score/judge/search',
    method: 'get',
    params: data
  })
}
// 基础评分列表
export function getBaseScoreList (parameter) {
  return request({
    url: '/actor/score/base/page',
    method: 'get',
    params: parameter
  })
}
// 添加主播
export function addBaseInfluencer (parameter) {
  return request({
    url: '/actor/score/add',
    method: 'post',
    data: parameter
  })
}
// 获取运营评分问题列表
export function getEmployeeQuestion (parameter) {
  return request({
    url: '/actor/score/question/type',
    method: 'get',
    params: parameter
  })
}

// 运营评分
export function employeeGrade (parameter) {
  return request({
    url: '/actor/score/answer/submit',
    method: 'post',
    data: parameter
  })
}
// 申诉
export function employeeSSGrade (parameter) {
  return request({
    url: '/actor/score/appeal/submit',
    method: 'post',
    data: parameter
  })
}
// 获取已评分列表
export function getEmployeeScoredList (parameter) {
  return request({
    url: '/actor/score/has/list',
    method: 'get',
    params: parameter
  })
}
// 评委打分列表
export function getMarkingList (parameter) {
  return request({
    url: '/judge/score/scoreJudge/list',
    method: 'get',
    params: parameter
  })
}
// 优质主播审核列表
export function getExamineList (parameter) {
  return request({
    url: '/judge/score/examine/list',
    method: 'get',
    params: parameter
  })
}
// 优质主播审核校验
export function checkExamine (parameter) {
  return request({
    url: '/judge/score/examine/list/check',
    method: 'get',
    params: parameter
  })
}
// 评委打分列表-详情
export function getMarkingDetail (parameter) {
  return request({
    url: '/judge/score/question',
    method: 'get',
    params: parameter
  })
}

// // 评委打分游戏列表-详情
// export function getMarkingGameDetail (parameter) {
//   return request({
//     url: '/judge/score/question',
//     method: 'get',
//     params: parameter
//   })
// }

// 评委打分
export function personGameMark (parameter) {
  return request({
    url: '/judge/score/answerSpecil/insert',
    method: 'post',
    data: parameter
  })
}

// 评委打分
export function personMark (parameter) {
  return request({
    url: '/judge/score/answer/insert',
    method: 'post',
    data: parameter
  })
}
// 主播评分列表
export function getScoreList (parameter) {
  return request({
    url: '/actor/score/actorScore/page',
    method: 'get',
    params: parameter
  })
}
// 主播评分列表-管理员
export function getScoreAdminList (parameter) {
  return request({
    url: '/actor/score/actorScore/admin/page',
    method: 'get',
    params: parameter
  })
}
// 主播评分列表-管理员 删除评分记录
export function getScoreAdminDelete (id) {
  return request({
    url: `/actor/score/${id}`,
    method: 'delete'
  })
}
// 主播评分列表-管理员视频号
export function getScoreAdminVideoList (parameter) {
  return request({
    url: '/actor/score/actorScore/admin/page-sph',
    method: 'get',
    params: parameter
  })
}
// 主播评分列表详情
export function getScoreDetail (parameter) {
  return request({
    url: '/actor/score/detail',
    method: 'get',
    params: parameter
  })
}

// 主播评分列表超管详情
export function getScoreAdminDetail (parameter) {
  return request({
    url: '/actor/score/reward/detail',
    method: 'get',
    params: parameter
  })
}

export function getScoreExamineDetail (parameter) {
  return request({
    url: '/actor/score/examine/detail',
    method: 'get',
    params: parameter
  })
}

// 判断是否有待评分
export function hasScore () {
  return request({
    url: '/judge/score/check/score/status',
    method: 'get'
  })
}

// 优质主播审核（通过/不通过）
export function examineCheck (data) {
  return request({
    url: '/actor/score/update',
    method: 'post',
    data
  })
}

// 评分列表管理员-统计管理员
export function actorScoreBaseStatistic (params) {
  return request({
    url: '/actor/score/actorScore/admin/page/statistic',
    method: 'get',
    params
  })
}

// 评分列表管理员-统计视频号
export function actorScoreCompanyStatistic (params) {
  return request({
    url: '/actor/score/actorScore/admin/page/statistic-sph',
    method: 'get',
    params
  })
}
