import { amountFormat } from '@/utils/util'
import { settlementTypes } from './types'

// 基线 进阶活跃
export const base = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    fixed: 'left',
    width: 200
  },
  {
    title: '入驻日期',
    dataIndex: 'joinGuildDate'
  },
  {
    title: '是否签约',
    dataIndex: 'isSigned',
    customRender: (text, row, index) => {
      return (text === 1 && '签约') || '未签约'
    }
  },
  {
    title: '基线有效天(天)',
    dataIndex: 'effectiveDay',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, false, 0)}`
    }
  },
  {
    title: '基线任务时长(小时)',
    dataIndex: 'liveBroadcastDuration',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text)}`
    }
  },
  {
    title: '基线投稿天(天)',
    dataIndex: 'videoContributeDay',
    sorter: true,
    scopedSlots: { customRender: 'videoContributeDay' }
    // customRender: (text, row, index) => {
    //   return text && `${amountFormat(text, false, 0)}`
    // }
  },
  {
    title: '基线基础视频数',
    dataIndex: 'videoSuperiorCount',
    sorter: true,
    scopedSlots: { customRender: 'videoSuperiorCount' }
    // customRender: (text, row, index) => {
    //   return text && `${amountFormat(text, false, 0)}`
    // }
  },
  {
    title: '进阶有效天(天)',
    dataIndex: 'advanceEffectiveDay',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, false, 0)}`
    }
  },
  {
    title: '进阶任务时长(小时)',
    dataIndex: 'advanceLiveBroadcastDuration',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text)}`
    }
  },
  // {
  //   title: '基线任务补发比例',
  //   dataIndex: 'baseMissionRatio',
  //   customRender: (text, row, index) => {
  //     return (text * 100).toFixed(2) + '%'
  //   }
  // },
  // {
  //   title: '进阶任务补发比例',
  //   dataIndex: 'advanceMissionRatio',
  //   customRender: (text, row, index) => {
  //     return (text * 100).toFixed(2) + '%'
  //   }
  // },
  {
    title: '主播佣金流水核算',
    dataIndex: 'actorRevenueFlow',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '签约主播佣金比例',
    dataIndex: 'actorRevenueRatio',
    scopedSlots: { customRender: 'actorRevenueRatio' }
    // customRender: (text, row, index) => {
    //   if (row.isSigned === 0) {
    //     return '--'
    //   } else {
    //     return (text * 100).toFixed(2) + '%'
    //   }
    // }
  },
  {
    title: '管理提成流水核算',
    dataIndex: 'managementRevenueFlow',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '讲师/提成比例(%)',
    dataIndex: 'lecturerEmployeeName',
    customRender: (text, row, index) => {
      return `${row.lecturerEmployeeName || '--'}/${
        row.lecturerEmployeeName
          ? (row.lecturerCommissionRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '招募/提成比例(%)',
    dataIndex: 'recruitRevenueRatio',
    customRender: (text, row, index) => {
      return `${row.recruitEmployeeName || '--'}/${
        row.recruitRevenueRatio
          ? (row.recruitRevenueRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '签约人/提成比例(%)',
    dataIndex: 'signedRevenueRatio',
    customRender: (text, row, index) => {
      return `${row.signedEmployeeName || '--'}/${
        row.signedRevenueRatio
          ? (row.signedRevenueRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '运营/提成比例(%)',
    dataIndex: 'operatorRevenueRatio',
    customRender: (text, row, index) => {
      return `${row.operatorEmployeeName || '--'}/${
        row.operatorRevenueRatio
          ? (row.operatorRevenueRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '组长/提成比例(%)',
    dataIndex: 'groupLeaderName',
    customRender: (text, row, index) => {
      return `${row.groupLeaderName || '--'}/${
        row.groupLeaderName
          ? (row.groupLeaderCommissionRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '分公司',
    dataIndex: 'companyName'
  },
  {
    title: '分公司负责人',
    dataIndex: 'companyLeaderName'
  }
  // {
  //   title: '分公司负责人/提成比例(%)',
  //   dataIndex: 'companyLeaderName',
  //   customRender: (text, row, index) => {
  //     return `${row.companyLeaderName || '--'}/${ row.companyLeaderName ? ((row.companyLeaderCommissionRatio) * 100).toFixed(2) : '--'}`
  //   }
  // },
  // {
  //   title: '小组',
  //   dataIndex: 'groupName'
  // }
  // {
  //   title: '本月老主播流水(元)',
  //   dataIndex: 'oldAnchorTotalIncome',
  //   customRender: (text, row, index) => {
  //     return text && `${amountFormat(text, true, 1)}`
  //   },
  //   width: 170
  // },
]

// 基线 进阶短视频
export const baseVideo = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    fixed: 'left',
    width: 200
  },
  {
    title: '入驻日期',
    dataIndex: 'joinGuildDate'
  },
  {
    title: '是否签约',
    dataIndex: 'isSigned',
    customRender: (text, row, index) => {
      return (text === 1 && '签约') || '未签约'
    }
  },
  {
    title: '基线有效天(天)',
    dataIndex: 'effectiveDay',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, false, 0)}`
    }
  },
  {
    title: '基线任务时长(小时)',
    sorter: true,
    dataIndex: 'liveBroadcastDuration',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text)}`
    }
  },
  {
    title: '基线投稿天(天)',
    dataIndex: 'videoContributeDay',
    sorter: true,
    scopedSlots: { customRender: 'videoContributeDay' }
    // customRender: (text, row, index) => {
    //   return text && `${amountFormat(text, false, 0)}`
    // }
  },
  {
    title: '基线基础视频数',
    dataIndex: 'videoSuperiorCount',
    sorter: true,
    scopedSlots: { customRender: 'videoSuperiorCount' }
    // customRender: (text, row, index) => {
    //   return text && `${amountFormat(text, false, 0)}`
    // }
  },
  {
    title: '1000+',
    dataIndex: 'recommendTenHundredsCount',
    sorter: true,
    customRender: (text, row, index) => {
      return text ? amountFormat(text, false, 0) : '--'
    }
  },
  {
    title: '10000+',
    sorter: true,
    dataIndex: 'recommendTenThousandsCount',
    customRender: (text, row, index) => {
      return text ? amountFormat(text, false, 0) : '--'
    }
  },
  {
    title: '100000+',
    sorter: true,
    dataIndex: 'recommendHundredThousand',
    customRender: (text, row, index) => {
      return text ? amountFormat(text, false, 0) : '--'
    }
  },
  // {
  //   title: '基线任务补发比例',
  //   dataIndex: 'baseMissionRatio',
  //   customRender: (text, row, index) => {
  //     return (text * 100).toFixed(2) + '%'
  //   }
  // },
  // {
  //   title: '进阶任务补发比例',
  //   dataIndex: 'advanceMissionRatio',
  //   customRender: (text, row, index) => {
  //     return (text * 100).toFixed(2) + '%'
  //   }
  // },
  {
    title: '主播佣金流水核算',
    dataIndex: 'actorRevenueFlow',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '签约主播佣金比例',
    dataIndex: 'actorRevenueRatio',
    scopedSlots: { customRender: 'actorRevenueRatio' }
    // customRender: (text, row, index) => {
    //   if (row.isSigned === 0) {
    //     return '--'
    //   } else {
    //     return (text * 100).toFixed(2) + '%'
    //   }
    // }
  },
  {
    title: '管理提成流水核算',
    dataIndex: 'managementRevenueFlow',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '讲师/提成比例(%)',
    dataIndex: 'lecturerEmployeeName',
    customRender: (text, row, index) => {
      return `${row.lecturerEmployeeName || '--'}/${
        row.lecturerEmployeeName
          ? (row.lecturerCommissionRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '招募/提成比例(%)',
    dataIndex: 'recruitRevenueRatio',
    customRender: (text, row, index) => {
      return `${row.recruitEmployeeName || '--'}/${
        row.recruitRevenueRatio
          ? (row.recruitRevenueRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '签约人/提成比例(%)',
    dataIndex: 'signedRevenueRatio',
    customRender: (text, row, index) => {
      return `${row.signedEmployeeName || '--'}/${
        row.signedRevenueRatio
          ? (row.signedRevenueRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '运营/提成比例(%)',
    dataIndex: 'operatorRevenueRatio',
    customRender: (text, row, index) => {
      return `${row.operatorEmployeeName || '--'}/${
        row.operatorRevenueRatio
          ? (row.operatorRevenueRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '组长/提成比例(%)',
    dataIndex: 'groupLeaderName',
    customRender: (text, row, index) => {
      return `${row.groupLeaderName || '--'}/${
        row.groupLeaderName
          ? (row.groupLeaderCommissionRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '分公司',
    dataIndex: 'companyName'
  },
  {
    title: '分公司负责人',
    dataIndex: 'companyLeaderName'
  }
  // {
  //   title: '分公司负责人/提成比例(%)',
  //   dataIndex: 'companyLeaderName',
  //   customRender: (text, row, index) => {
  //     return `${row.companyLeaderName || '--'}/${ row.companyLeaderName ? ((row.companyLeaderCommissionRatio) * 100).toFixed(2) : '--'}`
  //   }
  // },
  // {
  //   title: '小组',
  //   dataIndex: 'groupName'
  // }
]

// 外站 优质任务
export const outer = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    fixed: 'left',
    width: 200
  },
  // {
  //   title: '主播等级',
  //   dataIndex: 'date0'
  // },
  {
    title: '入驻日期',
    dataIndex: 'joinGuildDate'
  },
  {
    title: '是否签约',
    dataIndex: 'isSigned',
    customRender: (text, row, index) => {
      return (text === 1 && '签约') || '未签约'
    }
  },
  {
    title: '外站扶持起始日期',
    dataIndex: 'supportBeginTime'
  },
  {
    title: '外站扶持结束日期',
    dataIndex: 'supportEndTime'
  },
  {
    title: '当前扶持月份',
    dataIndex: 'supportMonth'
  },
  {
    title: '有效天(天)',
    dataIndex: 'effectiveDay',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, false, 0)}`
    }
  },
  {
    title: '有效时长(小时)',
    dataIndex: 'effectiveDuration',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text)}`
    }
  },
  {
    title: '主播佣金流水核算',
    dataIndex: 'actorRevenueFlow',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '签约主播佣金比例',
    dataIndex: 'actorRevenueRatio',
    customRender: (text, row, index) => {
      // return (text * 100).toFixed(2) + '%'
      if (row.isSigned === 0) {
        return '--'
      } else {
        return (text * 100).toFixed(2)
      }
    }
  },
  {
    title: '管理提成流水核算',
    dataIndex: 'managementRevenueFlow',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '讲师/提成比例(%)',
    dataIndex: 'lecturerEmployeeName',
    customRender: (text, row, index) => {
      return `${row.lecturerEmployeeName || '--'}/${
        row.lecturerEmployeeName
          ? (row.lecturerCommissionRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '招募/提成比例(%)',
    dataIndex: 'recruitRevenueRatio',
    customRender: (text, row, index) => {
      return `${row.recruitEmployeeName || '--'}/${
        row.recruitRevenueRatio
          ? (row.recruitRevenueRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '签约人/提成比例(%)',
    dataIndex: 'signedRevenueRatio',
    customRender: (text, row, index) => {
      return `${row.signedEmployeeName || '--'}/${
        row.signedRevenueRatio
          ? (row.signedRevenueRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '运营/提成比例(%)',
    dataIndex: 'operatorRevenueRatio',
    customRender: (text, row, index) => {
      return `${row.operatorEmployeeName || '--'}/${
        row.operatorRevenueRatio
          ? (row.operatorRevenueRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '组长/提成比例(%)',
    dataIndex: 'groupLeaderName',
    customRender: (text, row, index) => {
      return `${row.groupLeaderName || '--'}/${
        row.groupLeaderName
          ? (row.groupLeaderCommissionRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '分公司',
    dataIndex: 'companyName'
  },
  {
    title: '分公司负责人',
    dataIndex: 'companyLeaderName'
  }
  // {
  //   title: '分公司负责人/提成比例(%)',
  //   dataIndex: 'companyLeaderName',
  //   customRender: (text, row, index) => {
  //     return `${row.companyLeaderName || '--'}/${ row.companyLeaderName ? ((row.companyLeaderCommissionRatio) * 100).toFixed(2) : '--'}`
  //   }
  // },
  // {
  //   title: '小组',
  //   dataIndex: 'groupName'
  // }
]

// 视频宫格 任务
const finishType = {
  0: '未完成',
  1: '已完成'
}
const finishType2 = {
  0: '未完成门槛任务',
  1: '完成门槛任务',
  2: '完成进阶任务'
}
export const video = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    fixed: 'left',
    width: 200
  },
  {
    title: '入驻日期',
    dataIndex: 'joinGuildDate'
  },
  {
    title: '是否签约',
    dataIndex: 'isSigned',
    customRender: (text, row, index) => {
      return (text === 1 && '签约') || '未签约'
    }
  },
  {
    title: '分成比(%)',
    dataIndex: 'splitRatio',
    customRender: (text, row, index) => {
      return text !== null ? text : '--'
    }
  },
  {
    title: '视频多人有效时长(小时)',
    dataIndex: 'liveBroadcastDuration',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text)}`
    }
  },
  {
    title: '视频多人有效天(天)',
    dataIndex: 'effectiveDay',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, false, 0)}`
    }
  },
  {
    title: '视频多人主持位流水(元)',
    dataIndex: 'manyPeopleVideoCompereFlow',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '视频多人嘉宾流水(元)',
    dataIndex: 'manyPeopleVideoGuestFlow',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '视频多人总流水(元)',
    dataIndex: 'manyPeopleVideoTotalFlow',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '过程任务第一档完成情况',
    dataIndex: 'oneStageTaskStatus',
    customRender: (text, row, index) => {
      return text !== null ? finishType[text] : '--'
    }
  },
  {
    title: '过程任务第二档完成情况',
    dataIndex: 'twoStageTaskStatus',
    customRender: (text, row, index) => {
      return text !== null ? finishType[text] : '--'
    }
  },
  {
    title: '主持位流水主播佣金比例(%)',
    dataIndex: 'actorCommissionCompereRatio',
    customRender: (text, row, index) => {
      return text !== null ? (Number(text) * 100).toFixed(2) : '--'
    }
  },
  {
    title: '嘉宾流水主播佣金比例(%)',
    dataIndex: 'actorCommissionGuestRatio',
    customRender: (text, row, index) => {
      // if (row.isSigned === 0 || Number(text) === 0) {
      //   return '--'
      // } else {
      //   return (Number(text) * 100).toFixed(2)
      // }
      return text !== null ? (Number(text) * 100).toFixed(2) : '--'
    }
  },
  {
    title: '主播佣金金额(元)',
    dataIndex: 'actorCommission',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '视频多人入会流水(元)',
    dataIndex: 'guildReward',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '视频多人非入会流水(元)',
    dataIndex: 'otherGuildReward',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '分公司入会流水任务完成情况',
    dataIndex: 'companyTargetStatus',
    customRender: (text, row, index) => {
      return text !== null ? finishType2[text] : '--'
    }
  },
  {
    title: '讲师/提成比例(%)', // 仅运营页面展示
    dataIndex: 'lecturerEmployeeName',
    customRender: (text, row, index) => {
      return `${row.lecturerEmployeeName || '--'}/${
        row.lecturerGuildCommissionRatio
          ? (row.lecturerGuildCommissionRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '签约人/提成比例(%)', // 仅运营页面展示
    dataIndex: 'signedEmployeeName',
    customRender: (text, row, index) => {
      return `${row.signedEmployeeName || '--'}/${
        row.signedGuildCommissionRatio
          ? (row.signedGuildCommissionRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '招募/提成比例(%)', // 仅运营页面展示
    dataIndex: 'recruitEmployeeName',
    customRender: (text, row, index) => {
      return `${row.recruitEmployeeName || '--'}/${
        row.recruitGuildCommissionRatio
          ? (row.recruitGuildCommissionRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '运营/提成比例(%)', // 仅运营页面展示
    dataIndex: 'operatorEmployeeName',
    customRender: (text, row, index) => {
      return `${row.operatorEmployeeName || '--'}/${
        row.operatorGuildCommissionRatio
          ? (row.operatorGuildCommissionRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '组长/提成比例(%)', // 仅管理--页面展示
    dataIndex: 'groupLeaderName',
    customRender: (text, row, index) => {
      return `${row.groupLeaderName || '--'}/${
        row.groupLeaderCommissionRatio
          ? (row.groupLeaderCommissionRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '分公司负责人/提成比例(%)', // 仅管理--页面展示
    dataIndex: 'companyLeaderName',
    customRender: (text, row, index) => {
      return `${row.companyLeaderName || '--'}/${
        row.companyLeaderCommissionRatio
          ? (row.companyLeaderCommissionRatio * 100).toFixed(2)
          : '--'
      }`
    }
  },
  {
    title: '九宫格负责人', // 仅管理--页面展示
    dataIndex: 'videoPalaceCommissionRatio',
    customRender: (text, row, index) => {
      return text !== null ? (Number(text) * 100).toFixed(2) : '--'
    }
  },
  {
    title: '总裁', // 仅管理--页面展示
    dataIndex: 'presidentCommissionRatio',
    customRender: (text, row, index) => {
      return text !== null ? (Number(text) * 100).toFixed(2) : '--'
    }
  }
]

// 垂类优质任务
export const vertical = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    fixed: 'left',
    width: 200
  },
  {
    title: '任务类型',
    dataIndex: 'isMature',
    customRender: (text, row, index) => {
      return text === 1 ? '老主播' : '新主播'
    }
  },
  {
    title: '优质有效天(天)',
    dataIndex: 'validDays',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, false, 0)}`
    }
  },
  {
    title: '直播流水(元)',
    dataIndex: 'actorLiveFlow',
    sorter: true,
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '奖励金额(元)',
    dataIndex: 'operatorCommission',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '讲师',
    dataIndex: 'lecturerEmployeeName'
  },
  {
    title: '招募',
    dataIndex: 'recruitEmployeeName'
  },
  {
    title: '签约人',
    dataIndex: 'signedEmployeeName'
  },
  {
    title: '运营',
    dataIndex: 'operatorEmployeeName'
  },
  // {
  //   title: '小组',
  //   dataIndex: 'groupName'
  // },
  {
    title: '组长',
    dataIndex: 'groupLeaderName'
  },
  // {
  //   title: '组长/提成比例(%)',
  //   dataIndex: 'groupLeaderName',
  //   customRender: (text, row, index) => {
  //     return `${row.groupLeaderName || '--'}/${ row.groupLeaderName ? ((row.groupLeaderCommissionRatio) * 100).toFixed(2) : '--'}`
  //   }
  // },
  {
    title: '分公司',
    dataIndex: 'companyName'
  }
]

// 转会主播名单
export const exchange = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    fixed: 'left',
    width: 200
  },
  {
    title: '转入日期',
    dataIndex: 'exchangeDate'
  },
  {
    title: '30天结束日期',
    dataIndex: 'thirtyDaysEndTime'
  },
  {
    title: '流水计算周期',
    dataIndex: 'startDate',
    customRender: (text, row, index) => {
      return text ? `${text}-${row.endDate}` : '-'
    }
  },
  {
    title: '管理提成流水核算(不含视频宫格)',
    dataIndex: 'adminRewardOne',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '管理提成流水核算(视频宫格)',
    dataIndex: 'adminRewardTwo',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '讲师',
    dataIndex: 'lecturerEmployeeName'
  },
  {
    title: '招募',
    dataIndex: 'recruitEmployeeName'
  },
  {
    title: '签约人',
    dataIndex: 'signedEmployeeName'
  },
  {
    title: '运营',
    dataIndex: 'operatorEmployeeName'
  },
  // {
  //   title: '小组',
  //   dataIndex: 'groupName'
  // },
  {
    title: '分公司',
    dataIndex: 'companyName'
  }
]

export const columnsOperate = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    width: 200
  },
  {
    title: '时间',
    dataIndex: 'monthCycle'
  },
  {
    title: '抖音号原',
    dataIndex: 'tiktokCodeOrig'
  },
  {
    title: '特殊主播运营提成比例',
    dataIndex: 'growthRate',
    customRender: (text, row, index) => {
      return (text * 100).toFixed(2) + '%'
    }
  }
]

export const columnsAnchor = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    width: 200
  },
  // {
  //   title: '时间',
  //   dataIndex: 'monthCycle'
  // },
  {
    title: '抖音号原',
    dataIndex: 'tiktokCodeOrig'
  },
  {
    title: '优质等级',
    dataIndex: 'actorLevel'
  },
  {
    title: '扶持开始日期',
    dataIndex: 'supportBeginTime'
  },
  {
    title: '扶持结束日期',
    dataIndex: 'supportEndTime'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 80,
    scopedSlots: { customRender: 'action' }
  }
]

export const columnsSettlement = [
  {
    title: '时间',
    dataIndex: 'monthCycle'
  },
  {
    title: '结算单类型',
    dataIndex: 'settlementType',
    customRender: (text, row, index) => {
      return settlementTypes[Number(text)]
    }
  },
  {
    title: '导入人',
    dataIndex: 'importUser'
  },
  {
    title: '导入时间',
    dataIndex: 'createTime',
    width: 180
  }
]

export const columnsCompanyTarget = [
  {
    title: '年月',
    dataIndex: 'monthCycle'
  },
  {
    title: '分公司',
    dataIndex: 'companyName'
  },
  {
    title: '门槛目标',
    dataIndex: 'rewardTarget',
    customRender: (text, row, index) => {
      return text ? text.toFixed(2) : '-'
    }
  },
  {
    title: '提成比例',
    dataIndex: 'commissionRate',
    customRender: (text, row, index) => {
      return text ? text.toFixed(2) : '-'
    }
  },
  {
    title: '基础比例',
    dataIndex: 'baseCommissionRate',
    customRender: (text, row, index) => {
      return text ? text.toFixed(2) : '-'
    }
  }
]

export const columnsLecturer = [
  {
    title: '时间',
    dataIndex: 'monthCycle'
  },
  {
    title: '姓名',
    dataIndex: 'lecturerRecruitName'
  },
  {
    title: '绩效完成百分比(%)',
    dataIndex: 'performanceCompletionRatio',
    customRender: (text, row, index) => {
      return text ? (text * 100).toFixed(2) : '-'
    }
  }
]
