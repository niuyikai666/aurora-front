export const allColumns = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    fixed: 'left',
    scopedSlots: { customRender: 'nickName' },
    width: 220
  },
  {
    title: '本月总流水',
    dataIndex: 'currentMonthTotalReward',
    sorter: true,
    scopedSlots: { customRender: 'currentMonthTotalReward' }
  },
  {
    title: '粉丝总数',
    dataIndex: 'totalFans',
    sorter: true,
    scopedSlots: { customRender: 'totalFans' }
  },
  {
    title: '本月有效天(天)',
    dataIndex: 'currentMonthEffectiveDays',
    sorter: true
  },
  {
    title: '本月总时长(小时)',
    dataIndex: 'currentMonthEffectiveDuration',
    sorter: true
  },
  {
    title: '最近开播日期',
    dataIndex: 'lastLiveTime',
    sorter: true
  },
  {
    title: '签约情况',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text.msg
    }
  },
  {
    title: '真实姓名',
    dataIndex: 'realName'
  },
  {
    title: '入会日期',
    scopedSlots: { customRender: 'joinGuildDate' },
    dataIndex: 'joinGuildDate'
  },
  {
    title: '分成比',
    dataIndex: 'splitRatio',
    scopedSlots: { customRender: 'splitRatio' }
  },
  {
    title: '经纪人',
    dataIndex: 'agentName',
    scopedSlots: { customRender: 'agentName' }
  },
  {
    title: '招募',
    dataIndex: 'recruitName'
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    scopedSlots: { customRender: 'operatorName' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export const coreColumns = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    fixed: 'left',
    scopedSlots: { customRender: 'nickName' },
    width: 220
  },
  {
    title: '本月总流水',
    dataIndex: 'currentMonthTotalReward',
    sorter: true,
    scopedSlots: { customRender: 'currentMonthTotalReward' }
  },
  {
    title: '粉丝总数',
    dataIndex: 'totalFans',
    sorter: true,
    scopedSlots: { customRender: 'totalFans' }
  },
  {
    title: '本月有效天(天)',
    dataIndex: 'currentMonthEffectiveDays',
    sorter: true
  },
  {
    title: '本月总时长(小时)',
    dataIndex: 'currentMonthEffectiveDuration',
    sorter: true
  },
  {
    title: '最近开播日期',
    dataIndex: 'lastLiveTime',
    sorter: true
  },
  {
    title: '签约情况',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text.msg
    }
  },
  {
    title: '真实姓名',
    dataIndex: 'realName'
  },
  {
    title: '入会日期',
    scopedSlots: { customRender: 'joinGuildDate' },
    dataIndex: 'joinGuildDate'
  },
  {
    title: '分成比',
    dataIndex: 'splitRatio',
    scopedSlots: { customRender: 'splitRatio' }
  },
  {
    title: '经纪人',
    dataIndex: 'agentName',
    scopedSlots: { customRender: 'agentName' }
  },
  {
    title: '招募',
    dataIndex: 'recruitName'
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    scopedSlots: { customRender: 'operatorName' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export const EnterUnionColumns = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    fixed: 'left',
    scopedSlots: { customRender: 'nickName' },
    width: 220
  },
  {
    title: '本月总流水',
    dataIndex: 'currentMonthTotalReward',
    sorter: true,
    scopedSlots: { customRender: 'currentMonthTotalReward' }
  },
  {
    title: '粉丝总数',
    dataIndex: 'totalFans',
    sorter: true,
    scopedSlots: { customRender: 'totalFans' }
  },
  {
    title: '本月有效天(天)',
    dataIndex: 'currentMonthEffectiveDays',
    sorter: true
  },
  {
    title: '本月总时长(小时)',
    dataIndex: 'currentMonthEffectiveDuration',
    sorter: true
  },
  {
    title: '最近开播日期',
    dataIndex: 'lastLiveTime',
    sorter: true
  },
  {
    title: '签约情况',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text.msg
    }
  },
  {
    title: '真实姓名',
    dataIndex: 'realName'
  },
  {
    title: '入会日期',
    scopedSlots: { customRender: 'joinGuildDate' },
    dataIndex: 'joinGuildDate'
  },
  {
    title: '分成比',
    dataIndex: 'splitRatio',
    scopedSlots: { customRender: 'splitRatio' }
  },
  {
    title: '经纪人',
    dataIndex: 'agentName',
    scopedSlots: { customRender: 'agentName' }
  },
  {
    title: '招募',
    dataIndex: 'recruitName'
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    scopedSlots: { customRender: 'operatorName' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export const interruptColumns = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    fixed: 'left',
    scopedSlots: { customRender: 'nickName' },
    width: 220
  },
  {
    title: '本月总流水',
    dataIndex: 'currentMonthTotalReward',
    sorter: true,
    scopedSlots: { customRender: 'currentMonthTotalReward' }
  },
  {
    title: '粉丝总数',
    dataIndex: 'totalFans',
    sorter: true,
    scopedSlots: { customRender: 'totalFans' }
  },
  {
    title: '本月有效天(天)',
    dataIndex: 'currentMonthEffectiveDays',
    sorter: true
  },
  {
    title: '本月总时长(小时)',
    dataIndex: 'currentMonthEffectiveDuration',
    sorter: true
  },
  {
    title: '最近开播日期',
    dataIndex: 'lastLiveTime',
    sorter: true
  },
  {
    title: '签约情况',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text.msg
    }
  },
  {
    title: '真实姓名',
    dataIndex: 'realName'
  },
  {
    title: '断播天数', // 断播字段
    dataIndex: 'breakLiveDays',
    sorter: true
  },
  {
    title: '入会日期',
    scopedSlots: { customRender: 'joinGuildDate' },
    dataIndex: 'joinGuildDate'
  },
  {
    title: '分成比',
    dataIndex: 'splitRatio',
    scopedSlots: { customRender: 'splitRatio' }
  },
  {
    title: '经纪人',
    dataIndex: 'agentName',
    scopedSlots: { customRender: 'agentName' }
  },
  {
    title: '招募',
    dataIndex: 'recruitName'
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    scopedSlots: { customRender: 'operatorName' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export const retiredColumns = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    fixed: 'left',
    scopedSlots: { customRender: 'nickName' },
    width: 220
  },
  {
    title: '粉丝总数',
    dataIndex: 'totalFans',
    sorter: true,
    scopedSlots: { customRender: 'totalFans' }
  },
  {
    title: '本月有效天(天)',
    dataIndex: 'currentMonthEffectiveDays',
    sorter: true
  },
  {
    title: '本月总时长(小时)',
    dataIndex: 'currentMonthEffectiveDuration',
    sorter: true
  },
  {
    title: '最近开播日期',
    dataIndex: 'lastLiveTime',
    sorter: true
  },
  {
    title: '签约情况',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text.msg
    }
  },
  {
    title: '真实姓名',
    dataIndex: 'realName'
  },
  {
    title: '断播天数', // 断播字段
    dataIndex: 'breakLiveDays',
    sorter: true
  },
  {
    title: '入会日期',
    scopedSlots: { customRender: 'joinGuildDate' },
    dataIndex: 'joinGuildDate'
  },
  {
    title: '退会日期',
    dataIndex: 'retiredDate'
  },
  {
    title: '分成比',
    dataIndex: 'splitRatio',
    scopedSlots: { customRender: 'splitRatio' }
  },
  {
    title: '经纪人',
    dataIndex: 'agentName',
    scopedSlots: { customRender: 'agentName' }
  },
  {
    title: '招募',
    dataIndex: 'recruitName'
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    scopedSlots: { customRender: 'operatorName' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export const rebroadcastColumns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    fixed: 'left',
    scopedSlots: { customRender: 'nickName' },
    width: 200
  },
  {
    title: '原所属组织',
    dataIndex: 'operatorFullNameOrig',
    scopedSlots: { customRender: 'operatorFullNameOrig' }
  },
  {
    title: '新所属组织',
    dataIndex: 'currentOperatorFullName',
    scopedSlots: { customRender: 'currentOperatorFullName' }
  },
  {
    title: '原招募',
    dataIndex: 'recruitNameOrig'
  },
  {
    title: '原运营',
    dataIndex: 'operatorNameOrig'
  },
  {
    title: '现招募',
    dataIndex: 'currentRecruitName'
  },
  {
    title: '现运营',
    dataIndex: 'currentOperatorName'
  },
  {
    title: '最近开播时间', // 缺失
    dataIndex: 'lastLiveTime'
  },
  {
    title: '断播天数', // 缺失
    dataIndex: 'breakLiveDays'
  },
  // {
  //   title: '断播天区间', // 缺失
  //   dataIndex: 'stopBroadcastInterval',
  //   scopedSlots: { customRender: 'stopBroadcastInterval' }
  // },
  {
    title: '签约情况', // 缺失
    dataIndex: 'signMethod',
    scopedSlots: { customRender: 'signMethod' }
  },
  {
    title: '截止到上月最高月流水', // 缺失
    dataIndex: 'monthRewardMax',
    scopedSlots: { customRender: 'monthRewardMax' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    scopedSlots: { customRender: 'action' },
    fixed: 'right'
  }
]
