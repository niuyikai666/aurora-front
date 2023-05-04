import request from '@/utils/request'

/** 管理层 */

// 获取管理员任务列表
export function getManageList (data) {
  return request({
    url: '/mission/manage/list',
    method: 'post',
    data
  })
}

// 创建任务
export function createTask (data) {
  return request({
    url: `/mission/manage/create`,
    method: 'post',
    data
  })
}

// 任务基本信息
export function getTaskInfo (id) {
  return request({
    url: `/mission/manage/baseMissionInfo?id=${id}`,
    method: 'get'
  })
}

// 获取任务总计
export function getManageStatic (id) {
  return request({
    url: `/mission/manage/missionSum?id=${id}`,
    method: 'get'
  })
}

// 获取分公司下小组信息
export function getGroupInfo (id, componyId) {
  return request({
    url: `/mission/manage/depMission?id=${id}&departmentId=${componyId}`,
    method: 'get'
  })
}

// 管理员保存小组信息
export function saveManageGroup (data) {
  return request({
    url: `/mission/manage/splitMission`,
    method: 'post',
    data
  })
}

// 管理员确认创建
export function manageConfirm (id) {
  return request({
    url: `/mission/manage/confirmCreate?id=${id}`,
    method: 'post'
  })
}

// 关闭任务
export function taskManageClose (id) {
  return request({
    url: `/mission/manage/missionClose?id=${id}`,
    method: 'post'
  })
}

// 发布任务
export function taskManageRelease (id) {
  return request({
    url: `/mission/manage/missionRelease?id=${id}`,
    method: 'post'
  })
}

/** 组长层 */

// 任务基本信息
export function getGroupBaseInfo (id) {
  return request({
    url: `/mission/department/baseMissionInfo?id=${id}`,
    method: 'get'
  })
}
// 获取管理员任务列表
export function getGroupList (data) {
  return request({
    url: '/mission/department/list',
    method: 'post',
    data
  })
}

// 获取小组统计
export function getGroupStatic (id) {
  return request({
    url: `/mission/department/missionSum?id=${id}`,
    method: 'get'
  })
}

export function getGroupMembers (id, departmentId) {
  return request({
    url: `/mission/department/empMission?id=${id}&departmentId=${departmentId}`,
    method: 'get'
  })
}

// 小组确认创建
export function groupSplitConfirm (data) {
  return request({
    url: `/mission/department/splitMission`,
    method: 'post',
    data
  })
}

// 发布任务
export function taskGroupRelease (id) {
  return request({
    url: `/mission/department/missionSplitRelease?id=${id}`,
    method: 'post'
  })
}

// 发布任务
export function taskGroupReleaseMust (id) {
  return request({
    url: `/mission/department/missionRelease?id=${id}`,
    method: 'post'
  })
}

/** 运营层 */

// 获取运营层任务列表
export function getOperatorList (data) {
  return request({
    url: '/mission/employee/list',
    method: 'post',
    data
  })
}

// 获取运营信息
export function getOperatorInfo (id) {
  return request({
    url: `/mission/employee/getDetail?id=${id}`,
    method: 'get'
  })
}

/** 报表 */

// 管理层
// 获取报表指标数
export function getReportIndex (id) {
  return request({
    url: `/mission/targets?id=${id}`,
    method: 'get'
  })
}

// 获取指标总计
export function getReportIndexStatic (id, target) {
  return request({
    url: `/mission/target/statis?id=${id}&target=${target}`,
    method: 'get'
  })
}

// 获取分公司集合
export function getCompanyList (id) {
  return request({
    url: `/mission/company/list?id=${id}`,
    method: 'get'
  })
}

// 获取分公司总计
export function getCompanyStatic (id, departmentId, target) {
  return request({
    url: `/mission/company?missionId=${id}&departmentId=${departmentId}&target=${target}`,
    method: 'get'
  })
}

// 获取分公司下 小组统计
export function getCompanyGroupStatic (id, departmentId, target) {
  return request({
    url: `/mission/group?missionId=${id}&departmentId=${departmentId}&target=${target}`,
    method: 'get'
  })
}

// 组长层
// 获取报表指标数
export function getGroupIndex (id) {
  return request({
    url: `/mission/live/emp/targets?id=${id}`,
    method: 'get'
  })
}

// 获取指标总计
export function getGroupIndexStatic (id, target) {
  return request({
    url: `/mission/live/emp/target?id=${id}&target=${target}`,
    method: 'get'
  })
}

// 获取指标拆分总计
export function getGroupSplitStatic (id, target) {
  return request({
    url: `/mission/live/emp/resolve?id=${id}&target=${target}`,
    method: 'get'
  })
}

// 获取小组下运营总计
export function getOpretorStatic (id, target) {
  return request({
    url: `/mission/live/emp/group/operator?id=${id}&target=${target}`,
    method: 'get'
  })
}

// 获取运营层总计
export function getOpretorPersonStatic (id, target) {
  return request({
    url: `/mission/live/emp/group?id=${id}&target=${target}`,
    method: 'get'
  })
}

/**
 * 拉新任务
*/

// 获取拉新总览
export function getNewTaskTotal (month) {
  return request({
    url: `/lachine/tab/data?monthCycle=${month}`,
    method: 'get'
  })
}

// 获取拉新总览(小组)
export function getNewTaskGroupTotal (month) {
  return request({
    url: `/lachine/group/tab/data?monthCycle=${month}`,
    method: 'get'
  })
}

// 获取拉新总览(分公司)
export function getNewTaskCompanyTotal (month) {
  return request({
    url: `/lachine/company/tab/data?monthCycle=${month}`,
    method: 'get'
  })
}
// 获取拉新预览(总后台)
export function getNewTaskBackstageTotal (month, departmentId) {
  return request({
    url: `/lachine/total/tab/data?monthCycle=${month}&departmentId=${departmentId}`,
    method: 'get'
  })
}

// 获取拉新列表tab数量(运营)
export function getNewTaskTabCount (params) {
  return request({
    url: `/lachine/list/tab/count`,
    method: 'get',
    params
  })
}

// 获取拉新列表tab数量(小组)
export function getNewTaskGroupTabCount (params) {
  return request({
    url: `/lachine/group/list/tab/count`,
    method: 'get',
    params
  })
}

// 获取拉新列表tab数量(分公司)
export function getNewTaskCompanyTabCount (params) {
  return request({
    url: `/lachine/company/list/tab/count`,
    method: 'get',
    params
  })
}
// 获取拉新列表tab数量(总后台)
export function getNewTaskBackstageTabCount (params) {
  return request({
    url: `/lachine/total/list/tab/count`,
    method: 'get',
    params
  })
}

// 获取拉新列表(运营)
export function getNewTaskList (params) {
  return request({
    url: `/lachine/list`,
    method: 'get',
    params
  })
}

// 获取拉新列表(小组)
export function getNewTaskGroupList (params) {
  return request({
    url: `/lachine/group/list`,
    method: 'get',
    params
  })
}

// 获取拉新列表(分公司)
export function getNewTaskCompanyList (params) {
  return request({
    url: `/lachine/company/list`,
    method: 'get',
    params
  })
}
// 获取拉新列表(总后台)
export function getNewTaskBackstageList (params) {
  return request({
    url: `/lachine/total/list`,
    method: 'get',
    params
  })
}
// 获取拉新统计图
export function getNewTaskStatic (date) {
  return request({
    url: `/lachine/chart/data?phase=${date}`,
    method: 'get'
  })
}
// 获取拉新任务结束详情
export function getFinishedInfo (params) {
  return request({
    url: `/lachine/finished/info`,
    method: 'get',
    params
  })
}
/**
 * 小组任务
 */

// 运营 流水任务明细
export function getOperateDetailList (params) {
  return request({
    url: `/operator/task/missionDetail`,
    method: 'get',
    params
  })
}

// 任务进度
export function getMemberProcessList (params) {
  return request({
    url: `/mg/getGroupLeaderMonthCommissionRealTime`,
    method: 'get',
    params
  })
}

// 老主播流水
export function getMemberTotalList (params) {
  return request({
    url: `/mg/getOldTiktokLiveInfoList`,
    method: 'get',
    params
  })
}

// 全部老主播流水
export function getMemberTotalAllList (params) {
  return request({
    url: `/mg/getAllOldTiktokLiveInfoList`,
    method: 'get',
    params
  })
}

// 获取分公司列表
export function getGourpCompanyList (params) {
  return request({
    url: `/mg/getUserCompanyList`,
    method: 'get',
    params
  })
}

// 小组任务 开始计算
export function groupCaculate (month) {
  return request({
    url: `/mg/api/calculateGroupCommission?monthCycle=${month}`,
    method: 'get'
  })
}

// 导入黑天鹅
export function importBlackArtists (data) {
  return request({
    url: `/mg/importBlankswanAurora`,
    method: 'post',
    data
  })
}

// 导入上个月流水
export function importSettltment (data) {
  return request({
    url: `/mg/importLastMonthReward`,
    method: 'post',
    data
  })
}

// 导入结算单
export function importPreSettltment (data) {
  return request({
    url: `/mg/importRewardSettlement`,
    method: 'post',
    data
  })
}

// 导入小组人数
export function importGroupNumber (data) {
  return request({
    url: `/mg/inputGroupCountTemplateExcel`,
    method: 'post',
    data
  })
}

// 导入增长比例
export function importIncreaseRate (data) {
  return request({
    url: `/mg/inputGrowthRate`,
    method: 'post',
    data
  })
}

// 导入分公司目标
export function importCompanyTarget (data) {
  return request({
    url: `/mg/importBranchExcel`,
    method: 'post',
    data
  })
}

// 导入分公司流水任务增长率
export function importCompanyRewardRate (data) {
  return request({
    url: `/mg/inputCompanyFlowTaskGrowthRate`,
    method: 'post',
    data
  })
}

// 导入分公司运营人数
export function importCompanyOperate (data) {
  return request({
    url: `/mg/inputCompanyPersonCountTemplateExcel`,
    method: 'post',
    data
  })
}

// 分公司流水任务进度
export function getCompanyRewardProcess (params) {
  return request({
    url: `/mg/getCompanyMonthCommissionList`,
    method: 'get',
    params
  })
}
// 获取组长提成列表数据更新时间
export function getGroupLeaderMonthCommissionUpdateTime (params) {
  return request({
    url: `/mg/getGroupLeaderMonthCommissionUpdateTime`,
    method: 'get',
    params
  })
}
// 获取老主播主播信息数据-
export function getOldTiktokLiveInfoDate (params) {
  return request({
    url: `/mg/getOldTiktokLiveInfoDate`,
    method: 'get',
    params
  })
}
// 获取小组分公司概览
export function getGroupCompanyInfo (params) {
  return request({
    url: `/mg/GroupAndCompanyTarget`,
    method: 'get',
    params
  })
}
// 小组提成比例
export function groupCommissionStat (params) {
  return request({
    url: `/mg/groupCommissionStat`,
    method: 'get',
    params
  })
}
// 分成明细
export function rewardDetail (params) {
  return request({
    url: '/lachine/group/deduct/detail',
    method: 'get',
    params
  })
}
// 分成明细（总后台）
export function rewardTotalDetail (params) {
  return request({
    url: '/lachine/total/deduct/detail',
    method: 'get',
    params
  })
}
// 负责人核算
export function rewardAccount (params) {
  return request({
    url: '/lachine/group/director/check',
    method: 'get',
    params
  })
}
// 导入结算
export function caculateReward (params, data) {
  return request({
    url: '/lachine/upload/statement',
    method: 'post',
    params,
    data
  })
}

// 小组任务 运营任务信息
export function getGroupOperateInfo (params) {
  return request({
    url: '/operator/task/missionStatis',
    method: 'get',
    params
  })
}
// 小组任务 招募任务信息
export function getGroupRecruitInfo (params) {
  return request({
    url: '/recruit/task/getRecruitTaskInfo',
    method: 'get',
    params
  })
}
// 小组任务 运营任务完成情况
export function getGroupOperateComplete (params) {
  return request({
    url: '/operator/task/operatorComplete',
    method: 'get',
    params
  })
}
// 小组任务 招募任务完成情况
export function getGroupRecruitComplete (params) {
  return request({
    url: '/recruit/task/getRecruitTaskData',
    method: 'get',
    params
  })
}

// 小组任务 运营任务列表
export function getGroupOperateList (params) {
  return request({
    url: '/operator/task/operatorMission',
    method: 'get',
    params
  })
}
// 小组任务 招募任务列表
export function getGroupRecruitList (params) {
  return request({
    url: '/recruit/task/getRecruitTaskList',
    method: 'get',
    params
  })
}
// 小组任务 月度招募总流水
export function getGroupRecruitMonthList (data) {
  return request({
    url: '/mrecruit/month',
    method: 'post',
    data
  })
}
// 小组任务 招募任务详情
export function getGroupRecruitDetail (params) {
  return request({
    url: '/recruit/task/getRecruitTaskFinishDataList',
    method: 'get',
    params
  })
}
// 小组任务 运营任务详情
export function getGroupOperateDetail (params) {
  return request({
    url: '/operator/task/missionGroupTarget',
    method: 'get',
    params
  })
}
// 小组任务 录入有效招募目标数
export function saveGroupTarget (data) {
  return request({
    url: '/recruit/task/saveRecruitTaskTargetCount',
    method: 'post',
    data
  })
}

// 九宫格入会流水任务列表
export function getSquaredList (params) {
  return request({
    url: '/actor/task/manage/getVideoPalaceCompanyTarget',
    method: 'get',
    params
  })
}
// 九宫格入会流水任务导入
export function squaredImport (data) {
  return request({
    url: '/actor/task/manage/importVideoPalaceCompanyTarget',
    method: 'post',
    data
  })
}

// 视频宫格运营提成比例列表
export function getSquaredProportionList (params) {
  return request({
    url: '/actor/task/manage/getOperatorSubmitRatioList',
    method: 'get',
    params
  })
}
// 视频宫格运营提成比例新增
export function squaredProportionModify (data) {
  return request({
    url: '/actor/task/manage/addOperatorSubmitRatio',
    method: 'post',
    data
  })
}

// 小组任务-规则配置 列表
export function groupRuleList (monthDate) {
  return request({
    url: `/sbrc/list/${monthDate}`,
    method: 'get'
  })
}
// 小组任务-规则配置 创建
export function groupRuleCreate (data) {
  return request({
    url: `/sbrc/save`,
    method: 'post',
    data
  })
}
// 小组任务-规则配置 编辑
export function groupRuleEdit (data) {
  return request({
    url: `/sbrc/edit`,
    method: 'post',
    data
  })
}
// 小组任务-规则配置 详情
export function groupRuleDetail (id) {
  return request({
    url: `/sbrc/${id}`,
    method: 'get'
  })
}
// 小组任务-规则配置 手动处罚规则
export function groupRulePush (params) {
  return request({
    url: `/sbrc/missionOperator`,
    method: 'get',
    params
  })
}
