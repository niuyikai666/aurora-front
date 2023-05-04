import axios from 'axios'
import request from '@/utils/request'
const CancelToken = axios.CancelToken
window.cancle = {}

// 基线-进阶活跃任务列表
export function getBaseActiveList(parameter) {
  return request({
    url: '/actor/task/getActorBaseAdvanceActiveTaskList',
    method: 'get',
    params: parameter,
    cancelToken: new CancelToken(function executor(c) {
      // 截流 取消上一次请求
      window.cancle.taskAnchor = c
    })
  }).catch((err) => console.log(err))
}

// 基线-进阶活跃任务 完成情况
export function getBaseActiveCompletion(parameter) {
  return request({
    url: '/actor/task/getActorBaseAdvanceActiveTaskData',
    method: 'get',
    params: parameter
  })
}

// 基线-进阶短视频任务列表
export function getBaseVideoList(parameter) {
  return request({
    url: '/actor/task/getActorBaseAdvanceVideoTask',
    method: 'get',
    params: parameter,
    cancelToken: new CancelToken(function executor(c) {
      // 截流 取消上一次请求
      window.cancle.taskAnchor = c
    })
  }).catch((err) => console.log(err))
}

// 基线-进阶短视频任务 完成情况
export function getBaseVideoCompletion(parameter) {
  return request({
    url: '/actor/task/getActorBaseAdvanceVideoTaskData',
    method: 'get',
    params: parameter
  })
}

// 视频宫格任务
export function getVideoList(parameter) {
  return request({
    url: '/actor/task/getActorVideoPalaceTaskList',
    method: 'get',
    params: parameter,
    cancelToken: new CancelToken(function executor(c) {
      // 截流 取消上一次请求
      window.cancle.taskAnchor = c
    })
  }).catch((err) => console.log(err))
}

// 视频宫格任务 完成情况
export function getVideoCompletion(parameter) {
  return request({
    url: '/actor/task/getActorVideoPalaceTaskData',
    method: 'get',
    params: parameter
  })
}

// 外站优质任务 列表
export function getOuterList(parameter) {
  return request({
    url: '/actor/task/getActorOutsideExcellentTaskList',
    method: 'get',
    params: parameter,
    cancelToken: new CancelToken(function executor(c) {
      // 截流 取消上一次请求
      window.cancle.taskAnchor = c
    })
  }).catch((err) => console.log(err))
}

// 外站优质任务 完成情况
export function getOuterCompletion(parameter) {
  return request({
    url: '/actor/task/getActorOutsideExcellentTaskData',
    method: 'get',
    params: parameter
  })
}

// 垂类优质任务 列表
export function getVerticalList(parameter) {
  return request({
    url: '/actor/task/getActorVerticalTaskList',
    method: 'get',
    params: parameter,
    cancelToken: new CancelToken(function executor(c) {
      // 截流 取消上一次请求
      window.cancle.taskAnchor = c
    })
  }).catch((err) => console.log(err))
}

// 垂类优质任务 完成情况
export function getVerticalCompletion(parameter) {
  return request({
    url: '/actor/task/getActorVerticalTaskData',
    method: 'get',
    params: parameter
  })
}

// 转会主播名单 列表
export function getExchangeAnchorList(parameter) {
  return request({
    url: '/actor/task/getExchangeActorList',
    method: 'get',
    params: parameter,
    cancelToken: new CancelToken(function executor(c) {
      // 截流 取消上一次请求
      window.cancle.taskAnchor = c
    })
  }).catch((err) => console.log(err))
}
// 转会主播名单 完成情况
export function getExchangeCompletion(parameter) {
  return request({
    url: '/actor/task/getActorVerticalTaskData',
    method: 'get',
    params: parameter
  })
}

// 导入特殊主播运营提成比例
export function importOperateProp(data) {
  return request({
    url: '/actor/task/importSpecialActorOperationsGrowthRate',
    method: 'post',
    data
  })
}

// 导入外站优质主播
export function importOuterAnchor(data) {
  return request({
    url: '/actor/task/importOuterActor',
    method: 'post',
    data
  })
}

// 导入结算单
export function importSettlement(data) {
  return request({
    url: '/actor/task/importSettlement',
    method: 'post',
    data
  })
}

// 导入分公司流水任务
export function importCompanyTarget(data) {
  return request({
    url: '/actor/task/importCompanyTarget',
    method: 'post',
    data
  })
}

/**
 * 主播任务后台管理
 */

// 获取特殊主播运营提成比例
export function getSpecialOperateProptionList(parameter) {
  return request({
    url: '/actor/task/getSpecialActorOperationsGrowthRate',
    method: 'get',
    params: parameter
  })
}

// 获取外站优质主播
export function getOuterAnchorList(parameter) {
  return request({
    url: '/actor/task/getOuterActorList',
    method: 'get',
    params: parameter
  })
}

// 获取结算单
export function getSettlementList(parameter) {
  return request({
    url: '/actor/task/getSettlementList',
    method: 'get',
    params: parameter
  })
}

// 获取分公司流水任务
export function getCompanyTargetList(parameter) {
  return request({
    url: '/actor/task/getCompanyTargetList',
    method: 'get',
    params: parameter
  })
}

// 新增外站主播
export function createOuterAnchor(data) {
  return request({
    url: '/actor/task/addOuterActor',
    method: 'post',
    data
  })
}

// 编辑外站主播
export function editOuterAnchor(data) {
  return request({
    url: '/actor/task/editOuterActor',
    method: 'post',
    data
  })
}

// 获取讲师绩效完成度
export function getLecturerList(parameter) {
  return request({
    url: '/actor/task/getLecturerRecruitPerformanceList',
    method: 'get',
    params: parameter
  })
}
// 导入讲师绩效完成度
export function importLecturer(data) {
  return request({
    url: '/actor/task/importLecturerRecruitPerformance',
    method: 'post',
    data
  })
}

/** 任务规则管理 */
// 外站优质任务暂停规则 列表
export function ruleOuterList(parameter) {
  return request({
    url: '/actor/task/getOuterTaskSkipMonthList',
    method: 'get',
    params: parameter
  })
}

// 外站优质任务暂停规则 新增
export function ruleOuterModify(data) {
  return request({
    url: '/actor/task/addOuterTaskSkipMonth',
    method: 'post',
    data
  })
}

// 外站优质任务暂停规则 删除
export function ruleOuterDelete(data) {
  return request({
    url: '/actor/task/delOuterTaskSkipMonth',
    method: 'post',
    data
  })
}
