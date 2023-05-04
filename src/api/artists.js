import axios from 'axios'
import request from '@/utils/request'
const CancelToken = axios.CancelToken
window.cancle = {}

// 获取艺人列表-直播
export function getArtists (data) {
  return request({
    url: '/actor/livedata',
    method: 'post',
    data,
    cancelToken: new CancelToken(function executor (c) { // 截流 取消上一次请求
      window.cancle.artistLiveTable = c
    })
  }).catch(err => console.log(err))
}

export function getArtistsRetired (params) {
  return request({
    url: '/actor/retired/page',
    method: 'get',
    params,
    cancelToken: new CancelToken(function executor (c) { // 截流 取消上一次请求
      window.cancle.artistLiveTable = c
    })
  }).catch(err => console.log(err))
}

// 获取艺人列表-短视频
export function getArtistsVideo (data) {
  return request({
    url: '/actor/videodata',
    method: 'post',
    data,
    cancelToken: new CancelToken(function executor (c) { // 截流 取消上一次请求
      window.cancle.artistShortTable = c
    })
  }).catch(err => console.log(err))
}

// 获取tab数量-直播
export function getCountLive (parameter) {
  return request({
    url: '/actor/livecount',
    method: 'get',
    params: parameter
  })
}

// 获取tab数量-短视频
export function getCountVideo (parameter) {
  return request({
    url: '/actor/videocount',
    method: 'get',
    params: parameter
  })
}

// 主播查询
export function anchorSearch (parameter) {
  return request({
    url: `/actor/info`,
    method: 'get',
    params: parameter
  })
}

// 主播查询
export function anchorScoreSearch (name) {
  return request({
    url: `/actor/actorByScore?searchName=${name}`,
    method: 'get'
  })
}

// 主播模糊查询
export function anchorSearchByName (parameter) {
  return request({
    url: `/actor/dimNickName`,
    method: 'get',
    params: parameter
  })
}

// 获取更新时间
export function getUpdateTime () {
  return request({
    url: `/dataSync/newest`,
    method: 'get'
  })
}

// 编辑备注
export function remarkEdit (parameter) {
  return request({
    url: '/anchor/updateRemark',
    method: 'get',
    params: parameter
  })
}

// 获取艺人详情
export function getArtistDetail (artistId) {
  return request({
    url: '/detail/actor',
    method: 'get',
    params: { tikTokId: artistId }
  })
}

// 获取艺人资料
export function getArtistdata (artistId) {
  return request({
    url: '/detail/data',
    method: 'get',
    params: { tikTokId: artistId }
  })
}

// 艺人时间段汇总
export function getArtistOverView (params) {
  return request({
    url: '/detail/summary',
    method: 'post',
    data: params
  })
}

// 获取梯形图数据
export function getFunnelData (params) {
  return request({
    url: '/daily/ladderdiagram',
    method: 'get',
    params: params
  })
}

// 获取折线图数据
export function getLineData (params) {
  return request({
    url: '/daily/linechart',
    method: 'get',
    params: params
  })
}

// 获取直播数据
export function getLiveData (params) {
  return request({
    url: '/detail/live',
    method: 'post',
    data: params
  })
}
// 获取直播数据
export function getMediaData (params) {
  return request({
    url: '/detail/video',
    method: 'post',
    data: params
  })
}
// 获取直播折线tab
export function getLiveTabs (params) {
  return request({
    url: '/detail/targetfile',
    method: 'get',
    params: params
  })
}
// 获取视频折线tab
export function getMediaTabs (params) {
  return request({
    url: '/detail/videotargetfile',
    method: 'get',
    params: params
  })
}
// 获取折线数据
export function getCharts (params) {
  return request({
    url: '/detail/linechart',
    method: 'get',
    params: params
  })
}
// 编辑艺人资料前台
export function artistDataModify (data) {
  return request({
    url: '/daily/editdata',
    method: 'put',
    data
  })
}

// 编辑艺人资料后台
export function artistModify (data) {
  return request({
    url: '/actResource/editdata',
    method: 'put',
    data
  })
}

// 设置运营搜索
export function artistSearch (parameter) {
  return request({
    url: '/actResource/search',
    method: 'get',
    params: parameter
  })
}

// 运营搜索 新
export function artistOperateSearch (name) {
  return request({
    url: `/employee/search/all?searchName=${name}`,
    method: 'get'
  })
}

// 运营搜索 (本分公司内人员)
export function artistCompanyOperateSearch (name) {
  return request({
    url: `/employee/search/company/name?searchName=${name}`,
    method: 'get'
  })
}

// 获取艺人统计信息
export function getArtistStatics () {
  return request({
    url: '/actResource/statis',
    method: 'get'
  })
}

// 批量设置运营
export function setBatchOperate (data) {
  return request({
    url: `/actResource/operate/${data.employeeId}/${data.departmentId}?influenceIds=${data.influenceIds}`,
    method: 'post'
  })
}

// 退会主播管理列表
export function getArtistFreedomList (parameter) {
  return request({
    url: '/retired/list',
    method: 'get',
    params: parameter
  })
}

// 退会主播管理列表
export function getRelationList (parameter) {
  return request({
    url: '/actor/relation',
    method: 'get',
    params: parameter
  })
}

/* -------- 无运营艺人管理 -------- */
// 获取艺人列表
export function getArtistFreedomResource (params) {
  return request({
    url: '/freeAct/page',
    method: 'get',
    params: params
  })
}

/* -------- 断播主播 -------- */
export function getCutoffArtists (data) {
  return request({
    url: '/stop/broadcasting/list',
    method: 'post',
    data,
    cancelToken: new CancelToken(function executor (c) { // 截流 取消上一次请求
      window.cancle.artistCutOffTable = c
    })
  }).catch(err => console.log(err))
}

// 获取tab数量-断播列表
export function getCountCutoff (parameter) {
  return request({
    url: '/stop/broadcasting/count',
    method: 'get',
    params: parameter
  })
}

// 断播主播查询
export function anchorCutoffSearch (parameter) {
  return request({
    url: `/activityAct/activitySearch`,
    method: 'get',
    params: parameter
  })
}

// 断播主播激活申请
export function cutoffArtistsApply (data) {
  return request({
    url: '/activityAct',
    method: 'post',
    data
  })
}

// 获取激活列表
export function getCutoffActiedArtists (parameter) {
  return request({
    url: `/activityAct/list`,
    method: 'get',
    params: parameter
  })
}

// 获取申请激活列表
export function getCutoffActiedApplyArtists (parameter) {
  return request({
    url: `/activityAct/applylist`,
    method: 'get',
    params: parameter
  })
}

// 激活列表tab数量
export function getCutoffActiedATabCount () {
  return request({
    url: '/activityAct/activecount',
    method: 'get'
  })
}

// 查询申请详情
export function getCutoffActiedApplyDetail (applyId) {
  return request({
    url: `/activityAct/activityecho?applyId=${applyId}`,
    method: 'get'
  })
}

// 审核
export function cutoffActiedApplyCheck (applyId, state) {
  return request({
    url: `/activityAct/apply/${applyId}/${state}`,
    method: 'post'
  })
}
/* -------- 断播主播 end -------- */

/** 主播关系管理 */
// 主播关系管理列表
export function getOperateRelationList (data) {
  return request({
    url: `/actor/relation/manage/all/list`,
    method: 'post',
    data
  })
}

// 批量修改运营关系
export function operateMutipleModify (data) {
  return request({
    url: `/actor/relation/manage/all/update/operator`,
    method: 'post',
    data
  })
}

// 获取修改记录
export function getOperateRelationHistory (id) {
  return request({
    url: `/actor/relation/manage/operation/history?tiktokLiveInfoId=${id}`,
    method: 'get'
  })
}

// 新入驻主播列表
export function newArtistList (data) {
  return request({
    url: `/actor/relation/manage/new/list`,
    method: 'post',
    data
  })
}

// 新入驻主播批量修改运营关系
export function newOperateMutipleModify (data) {
  return request({
    url: `/actor/relation/manage/new/update/operator`,
    method: 'post',
    data
  })
}

// 批量修改分公司
export function newCompanyMutipleModify (data) {
  return request({
    url: `/actor/relation/manage/new/update/company`,
    method: 'post',
    data
  })
}

// 获取分公司
export function getCompany () {
  return request({
    url: `/department/company/list`,
    method: 'get'
  })
}

// 分公司主播关系列表
export function companyOperateList (data) {
  return request({
    url: `/actor/relation/manage/company/list`,
    method: 'post',
    data
  })
}

// 我的主播
export function getOperateArtists (parameter) {
  return request({
    url: `/my/actor/page/list`,
    method: 'get',
    params: parameter
  })
}

// 获取tab数量-直播
export function getCountOperate (parameter) {
  return request({
    url: '/my/actor/tab/count',
    method: 'get',
    params: parameter
  })
}
// 视频号主播人数
export function getCountVideoNum (parameter) {
  return request({
    url: '/wechat-live-infos/counts',
    method: 'get',
    params: parameter
  })
}
// 获取视频号主播
export function getVideoArtists (data) {
  return request({
    url: '/wechat-live-infos',
    method: 'get',
    params: data,
    cancelToken: new CancelToken(function executor (c) { // 截流 取消上一次请求
      window.cancle.artistVideoTable = c
    })
  }).catch(err => console.log(err))
}
// 待绑定列表-管理员
export function getBoudingList (parameter) {
  return request({
    url: '/actorRelation/admin/bound',
    method: 'get',
    params: parameter
  })
}
// 待绑定列表-运营
export function getBoudingMeList (parameter) {
  return request({
    url: '/actorRelation/bound',
    method: 'get',
    params: parameter
  })
}
// 预填写-管理员
export function getManagePreList (parameter) {
  return request({
    url: '/actorRelation/admin/prefills',
    method: 'get',
    params: parameter
  })
}
// 预填写-运营
export function getPrefillList (parameter) {
  return request({
    url: '/actorRelation/prefills',
    method: 'get',
    params: parameter
  })
}
// 删除预填写
export function delPrefill (id) {
  return request({
    url: `/actorRelation/prefills/${id}`,
    method: 'delete'
  })
}
// 激活预填写
export function activePrefill (id) {
  return request({
    url: `/actorRelation/activatable/${id}`,
    method: 'get'
  })
}
// 预填写校验
export function checkPrefill (params) {
  return request({
    url: `/actorRelation/check`,
    method: 'get',
    params
  })
}
