import * as columns from './columns'
import * as api from '@/api/task-anchor'

export const tabList = [
  {
    key: 'base',
    func: api.getBaseActiveList,
    completeFunc: api.getBaseActiveCompletion,
    exportUrl: '/actor/task/exportActorBaseAdvanceActiveTaskList',
    columns: columns.base,
    tab: '基线-进阶活跃任务',
    width: 2500
  },
  {
    key: 'base-video',
    func: api.getBaseVideoList,
    completeFunc: api.getBaseVideoCompletion,
    exportUrl: '/actor/task/exportActorBaseAdvanceVideoTask',
    columns: columns.baseVideo,
    tab: '基线-进阶短视频任务',
    width: 2500
  },
  {
    key: 'outer',
    func: api.getOuterList,
    completeFunc: api.getOuterCompletion,
    exportUrl: '/actor/task/exportActorOutsideExcellentTaskList',
    columns: columns.outer,
    tab: '外站优质任务',
    width: 2500
  },
  {
    key: 'video',
    func: api.getVideoList,
    completeFunc: api.getVideoCompletion,
    exportUrl: '/actor/task/exportActorVideoPalaceTaskList',
    columns: columns.video,
    tab: '视频宫格任务',
    width: 2500
  },
  {
    key: 'vertical',
    func: api.getVerticalList,
    completeFunc: api.getVerticalCompletion,
    exportUrl: '/actor/task/exportActorVerticalTaskList',
    columns: columns.vertical,
    tab: '垂类优质任务',
    width: 1000
  },
  {
    key: 'exchange',
    func: api.getExchangeAnchorList,
    completeFunc: api.getBaseVideoCompletion,
    exportUrl: '/actor/task/exportExchangeActorList',
    columns: columns.exchange,
    // tab: '转会主播名单',
    tabName: '转会主播名单',
    scopedSlots: { tab: 'tabExchange' },
    width: 1000
  }
]

export const tabListManage = [
  {
    key: 'operate',
    func: api.getSpecialOperateProptionList,
    columns: columns.columnsOperate,
    tab: '特殊主播运营提成比例',
    importFunc: api.importOperateProp,
    permissionCode: 'actor_mission_manage_special_list'
  },
  {
    key: 'anchor',
    func: api.getOuterAnchorList,
    columns: columns.columnsAnchor,
    tab: '外站优质主播名单',
    importFunc: api.importOuterAnchor,
    permissionCode: 'actor_mission_manage_excellent_actor_list'
  },
  {
    key: 'settlement',
    func: api.getSettlementList,
    columns: columns.columnsSettlement,
    tab: '结算单管理',
    importFunc: api.importSettlement,
    permissionCode: 'actor_mission_manage_settlement_list'
  },
  {
    key: 'company',
    func: api.getCompanyTargetList,
    columns: columns.columnsCompanyTarget,
    tab: '分公司负责人提成规则',
    importFunc: api.importCompanyTarget,
    permissionCode: 'actor_mission_manage_company_target_list'
  },
  {
    key: 'lecturer',
    func: api.getLecturerList,
    columns: columns.columnsLecturer,
    tab: '讲师绩效完成度',
    importFunc: api.importLecturer,
    permissionCode: 'actor_mission_manage_lecturer_list'
  }
]

export const tabListRule = [
  {
    key: 'outer',
    tab: '外站优质任务暂停规则',
    permissionCode: 'outer_task_skip_month_role_list'
  }
]
