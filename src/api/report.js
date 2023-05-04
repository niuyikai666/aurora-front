import axios from 'axios'
import request from '@/utils/request'
import qs from 'qs'
const CancelToken = axios.CancelToken
window.cancle = {}

// 结构树
export function getStructureTree() {
  return request({
    url: '/department/permission',
    method: 'get'
  })
}
// 报表最新时间
export function getNewTime() {
  return request({
    url: '/dataSync/report/max/date',
    method: 'get'
  })
}
// 开播情况
export function getBroadCasting(parameter) {
  return request({
    url: '/report/index/begin/broadcasting',
    method: 'get',
    params: parameter
  })
}
// 流水情况
export function getRewardList(parameter) {
  return request({
    url: '/report/index/reward/list',
    method: 'get',
    params: parameter
  })
}
// 新入驻情况
export function getNewEnter(parameter) {
  return request({
    url: '/report/index/new/enter',
    method: 'get',
    params: parameter
  })
}
// 再激活情况
export function getActivity(parameter) {
  return request({
    url: '/report/index/again/activity',
    method: 'get',
    params: parameter
  })
}
// 直播数据概况
export function getLiveTarget(parameter) {
  return request({
    url: '/report/index/target',
    method: 'get',
    params: parameter
  })
}
// 短视频主播情况
export function getVideoActor(parameter) {
  return request({
    url: '/report/video/actor',
    method: 'get',
    params: parameter
  })
}
// 短视频粉丝量情况
export function getVideoFan(parameter) {
  return request({
    url: '/report/video/fan',
    method: 'get',
    params: parameter
  })
}
// 短视频点赞量
export function getVideoLike(parameter) {
  return request({
    url: '/report/video/like',
    method: 'get',
    params: parameter
  })
}
// 短视频数据概况
export function getVideoTarget(parameter) {
  return request({
    url: '/report/video/target',
    method: 'get',
    params: parameter
  })
}
// 短视频折线图字段
export function getVideoTargetfile(parameter) {
  return request({
    url: '/report/video/videotargetfile',
    method: 'get',
    params: parameter
  })
}
// 短视频折线图
export function getVideoLine(parameter) {
  return request({
    url: '/report/video/linechart',
    method: 'get',
    params: parameter
  })
}
// 直播折线图字段
export function getFieldList(parameter) {
  return request({
    url: '/report/index/field/list',
    method: 'get',
    params: parameter
  })
}
// 直播折线图
export function getIndexLine(parameter) {
  return request({
    url: '/report/index/linechart',
    method: 'get',
    params: parameter
  })
}
// --------直播流水分析--------
// 流水分析概况
export function getLiveAnalyzeTarget(parameter) {
  return request({
    url: '/report/reward/liveOperator/target',
    method: 'get',
    params: parameter
  })
}
// 指标汇总字段
export function getLiveAnalyzefieldList(parameter) {
  return request({
    url: '/report/reward/field/list',
    method: 'get',
    params: parameter
  })
}
// 按日期
export function getLiveAnalyzeDateList(parameter) {
  return request({
    url: '/report/reward/reward/list',
    method: 'get',
    params: parameter
  })
}
// 按分公司、小组
export function getLiveAnalyzeDepartmentList(parameter) {
  return request({
    url: '/report/reward/department/type',
    method: 'get',
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    },
    params: parameter
  })
}
// 按运营
export function getLiveAnalyzeOperateList(parameter) {
  return request({
    url: '/report/reward/liveOperator/list',
    method: 'get',
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    },
    params: parameter
  })
}
// 按主播
export function getLiveAnalyzeInfluencerList(parameter) {
  return request({
    url: '/report/reward/liveActor/list',
    method: 'get',
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    },
    params: parameter
  })
}
// 按分公司、小组图表
export function liveAnalyzeDepartmentChart(parameter) {
  return request({
    url: '/report/reward/department/type/chart',
    method: 'get',
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    },
    params: parameter
  })
}
// 按运营图表
export function liveAnalyzeOperateChart(parameter) {
  return request({
    url: '/report/reward/liveOperator/linechart',
    method: 'get',
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    },
    params: parameter
  })
}
// 按主播图表
export function liveAnalyzeInfluencerChart(parameter) {
  return request({
    url: '/report/reward/liveActor/linechart',
    method: 'get',
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    },
    params: parameter
  })
}
// --------短视频流水分析--------
// 流水分析概况
export function getVideoAnalyzeTarget(parameter) {
  return request({
    url: '/report/video/reward/videoOperator/target',
    method: 'get',
    params: parameter
  })
}
// 指标汇总字段
export function getVideoAnalyzefieldList(parameter) {
  return request({
    url: '/report/video/reward/field/list',
    method: 'get',
    params: parameter
  })
}
// 按分公司、小组
export function getVideoAnalyzeGroupList(parameter) {
  return request({
    url: '/report/video/actor/department/type',
    method: 'get',
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    },
    params: parameter
  })
}
// 按运营
export function getVideoAnalyzeOperateList(parameter) {
  return request({
    url: '/report/video/reward/videoOperator/list',
    method: 'get',
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    },
    params: parameter
  })
}
// 按主播
export function getVideoAnalyzeInfluencerList(parameter) {
  return request({
    url: '/report/video/reward/videoActor/list',
    method: 'get',
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    },
    params: parameter
  })
}
// 按分公司、小组图表
export function videoAnalyzeGroupChart(parameter) {
  return request({
    url: '/report/video/actor/department/type/chart',
    method: 'get',
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    },
    params: parameter
  })
}
// 按运营图表
export function videoAnalyzeOperateChart(parameter) {
  return request({
    url: '/report/video/reward/videoOperator/linechart',
    method: 'get',
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    },
    params: parameter
  })
}
// 按主播图表
export function videoAnalyzeInfluencerChart(parameter) {
  return request({
    url: '/report/video/reward/videoActor/linechart',
    method: 'get',
    paramsSerializer: (params) => {
      return qs.stringify(params, { indices: false })
    },
    params: parameter
  })
}
export function searchInfluencerList(parameter) {
  return request({
    url: '/actor/actorInfo',
    method: 'get',
    params: parameter
  })
}
export function searchOperatorList(parameter) {
  return request({
    url: '/employee/search/operator',
    method: 'get',
    params: parameter
  })
}
// 根据部门id获取子部门
export function getDepartmentChild(parameter) {
  return request({
    url: '/department/childPermission',
    method: 'get',
    params: parameter
  })
}

// 核心统计
export function getReportCoreStatic(targetCode) {
  return request({
    url: `/rc/${targetCode}`,
    method: 'get'
  })
}

// 获取核心统计列表
export function getReportCoreTable(targetCode) {
  return request({
    url: `/rc/table/${targetCode}`,
    method: 'get'
  })
}

// 直播数据明细-组织
export function getReportLiveListManage(parameter) {
  return request({
    url: `/tiktok/live/info/dep/page`,
    method: 'get',
    params: parameter,
    cancelToken: new CancelToken(function executor(c) {
      // 截流 取消上一次请求
      window.cancle.artistLiveManageTable = c
    })
  }).catch((err) => console.log(err))
}

// 直播数据明细-运营
export function getReportLiveListOperate(parameter) {
  return request({
    url: `/tiktok/live/info/operator/page`,
    method: 'get',
    params: parameter
  })
}

// 直播数据明细-详情
export function getReportLiveListDetail(parameter) {
  return request({
    url: `/tiktok/live/info/detail`,
    method: 'get',
    params: parameter
  })
}

// 直播明细搜索
export function reportLiveSearch(parameter) {
  return request({
    url: `/actor/search/nickname/tiktokcode/volcano`,
    method: 'get',
    params: parameter
  })
}
// 直播数据明细 平台关系导出
export function exportPlatformRelation(month) {
  return request({
    url: `/tiktok/exportMonthDetail/${month}`,
    method: 'get',
    responseType: 'blob'
  })
}
// 平台主播-导出日明细数据
export function exportDayliyData(params) {
  return request({
    url: `/wechatReport/platform/daily-details/export`,
    method: 'get',
    params: params
  })
}
// 平台主播-导出记录
export function exportLogs(params) {
  return request({
    url: `/wechatReport/detail/export/log`,
    method: 'get',
    params: params
  })
}
