import { amountFormat } from '@/utils/util'
import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
const h = new Vue().$createElement

export const columnsProcess = [
  {
    title: '小组名',
    dataIndex: 'groupName',
    fixed: 'left',
    width: 120
  },
  {
    title: '总排名',
    dataIndex: 'ranking',
    fixed: 'left',
    width: 80
  },
  {
    title: '本月老主播流水(元)',
    dataIndex: 'oldAnchorTotalIncome',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    },
    width: 170
  },
  {
    title: '流水0%档目标(元)',
    dataIndex: 'levelOneIncomeTarget',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    },
    width: 170
  },
  {
    title: '0档完成进度',
    // slots: { title: 'customName1' },
    dataIndex: 'levelOneIncomeTargetPlannedSpeed',
    scopedSlots: { customRender: 'levelOneIncomeTargetPlannedSpeed' },
    // customRender: (text, row, index) => {
    //   return text && `${amountFormat(text * 100, true, 2)}%`
    // },
    width: 150
  },
  {
    title: '流水0.2%档目标(元)',
    dataIndex: 'levelTwoIncomeTarget',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    },
    width: 170
  },
  {
    title: '0.2档完成进度',
    // slots: { title: 'customName2' },
    dataIndex: 'levelTwoIncomeTargetPlannedSpeed',
    scopedSlots: { customRender: 'levelTwoIncomeTargetPlannedSpeed' },
    // customRender: (text, row, index) => {
    //   return text && `${amountFormat(text * 100, true, 2)}%`
    // },
    width: 150
  },
  {
    dataIndex: 'todayOldAnchorIncomeTarget',
    customRender: (text, row, index) => {
      if (text && text !== '已完成' && text !== '--') {
        return amountFormat(Number(text), true, 1)
      } else {
        return text
      }
    },
    slots: {
      title: 'todayOldAnchorIncomeTarget',
      name: '今日流水目标',
      desc: '今日流水目标=（目标-老主播总流水）/本月剩余天数，（未完成目标1则按照目标1计算，已完成目标1按照目标2计算，已完成目标2则显示已完成）'
    },
    width: 120
  },
  // {
  //   title: '本月五万主播数(人)',
  //   dataIndex: 'fiftyThousandAnchorCount',
  //   customRender: (text, row, index) => {
  //     return text && `${amountFormat(text, false)}`
  //   },
  //   width: 140
  // },
  // {
  //   title: '上月五万主播数(人)',
  //   dataIndex: 'lastMonthFiftyThousandAnchorCount',
  //   customRender: (text, row, index) => {
  //     return text && `${amountFormat(text, false)}`
  //   },
  //   width: 140
  // },
  // {
  //   title: '本月五万主播数目标(人)',
  //   dataIndex: 'fiftyThousandAnchorTarget',
  //   customRender: (text, row, index) => {
  //     return text && `${amountFormat(text, false)}`
  //   },
  //   width: 170
  // },
  {
    title: '小组任务提成比例',
    dataIndex: 'groupLeaderCommissionNotInPropReward',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text * 100, true, 3)}%`
    },
    width: 140
  },
  {
    title: '小组道具流水占比',
    dataIndex: 'propRewardProportion',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text * 100, true, 2)}%`
    },
    width: 150
  },
  {
    title: '最终提成比例',
    dataIndex: 'groupLeaderCommission',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text * 100, true, 3)}%`
    },
    width: 120
  }
]

export const columnsTotal = [
  {
    title: '主播信息',
    dataIndex: 'tiktokLiveName',
    scopedSlots: { customRender: 'tiktokLiveName' }
  },
  {
    title: '本期流水(元)',
    dataIndex: 'monthReward',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  // {
  //   title: '上期流水',
  //   dataIndex: 'lastMonthTotalReward',
  //   customRender: (text, row, index) => {
  //     return text && `${amountFormat(text, true, 1)}元`
  //   }
  // },
  // {
  //   title: '流水增长率',
  //   dataIndex: 'rewardGrowthRate',
  //   customRender: (text, row, index) => {
  //     return text && `${text}%`
  //   }
  // },
  {
    title: '是否转会主播',
    dataIndex: 'isExchange',
    customRender: (text, row, index) => {
      return text === 1 ? '是' : '否'
    }
  },
  {
    title: '转入日期',
    dataIndex: 'exchangeDateStr'
  },
  {
    title: '黑天鹅主播',
    dataIndex: 'blankswan',
    customRender: (text, row, index) => {
      return text === 1 ? '是' : ''
    }
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    customRender: (text, row, index) => {
      return text || '--'
    }
  },
  {
    title: '小组',
    dataIndex: 'groupName',
    customRender: (text, row, index) => {
      return text || '--'
    }
  },
  {
    title: '分公司',
    dataIndex: 'companyName',
    customRender: (text, row, index) => {
      return text || '--'
    }
  },
  {
    title: '经纪人',
    dataIndex: 'agentName'
  }
]

export const columnsBackstage = [
  {
    title: '分公司',
    dataIndex: 'companyName',
    fixed: 'left',
    width: 160
  },
  {
    title: '小组名',
    dataIndex: 'groupName',
    width: 120
  },
  {
    title: '总排名',
    dataIndex: 'ranking',
    width: 80
  },
  {
    title: '本月老主播流水(元)',
    dataIndex: 'oldAnchorTotalIncome',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    },
    width: 170
  },
  {
    title: '流水0%档目标(元)',
    dataIndex: 'levelOneIncomeTarget',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    },
    width: 170
  },
  {
    title: '0档完成进度',
    // slots: { title: 'customName1' },
    dataIndex: 'levelOneIncomeTargetPlannedSpeed',
    scopedSlots: { customRender: 'levelOneIncomeTargetPlannedSpeed' },
    // customRender: (text, row, index) => {
    //   return text && `${amountFormat(text * 100, true, 2)}%`
    // },
    width: 150
  },
  {
    title: '流水0.2%档目标(元)',
    dataIndex: 'levelTwoIncomeTarget',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    },
    width: 170
  },
  {
    title: '0.2档完成进度',
    // slots: { title: 'customName2' },
    dataIndex: 'levelTwoIncomeTargetPlannedSpeed',
    scopedSlots: { customRender: 'levelTwoIncomeTargetPlannedSpeed' },
    // customRender: (text, row, index) => {
    //   return text && `${amountFormat(text * 100, true, 2)}%`
    // },
    width: 150
  },
  {
    dataIndex: 'todayOldAnchorIncomeTarget',
    customRender: (text, row, index) => {
      if (text && text !== '已完成' && text !== '--') {
        return amountFormat(Number(text), true, 1)
      } else {
        return text
      }
    },
    slots: {
      title: 'todayOldAnchorIncomeTarget',
      name: '今日流水目标',
      desc: '今日流水目标=（目标-老主播总流水）/本月剩余天数，（未完成目标1则按照目标1计算，已完成目标1按照目标2计算，已完成目标2则显示已完成）'
    },
    width: 120
  },
  // {
  //   title: '本月五万主播数(人)',
  //   dataIndex: 'fiftyThousandAnchorCount',
  //   customRender: (text, row, index) => {
  //     return text && `${amountFormat(text, false)}`
  //   },
  //   width: 140
  // },
  // {
  //   title: '上月五万主播数(人)',
  //   dataIndex: 'lastMonthFiftyThousandAnchorCount',
  //   customRender: (text, row, index) => {
  //     return text && `${amountFormat(text, false)}`
  //   },
  //   width: 140
  // },
  // {
  //   title: '本月五万主播数目标(人)',
  //   dataIndex: 'fiftyThousandAnchorTarget',
  //   customRender: (text, row, index) => {
  //     return text && `${amountFormat(text, false)}`
  //   },
  //   width: 170
  // },
  {
    title: '小组任务提成比例',
    dataIndex: 'groupLeaderCommissionNotInPropReward',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text * 100, true, 3)}%`
    },
    width: 140
  },
  {
    title: '小组道具流水占比',
    dataIndex: 'propRewardProportion',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text * 100, true, 2)}%`
    },
    width: 150
  },
  {
    title: '最终提成比例',
    dataIndex: 'groupLeaderCommission',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text * 100, true, 3)}%`
    },
    width: 120
  }
]

const getNum = (text, flag, dot) => {
  return text !== null ? `${amountFormat(text, flag, dot)}` : '--'
}

export const rewardProcessColumns = [
  {
    title: '分公司',
    dataIndex: 'companyName',
    fixed: 'left'
  },
  {
    title: '分公司老主播流水(元)',
    dataIndex: 'oldAnchorTotalReward',
    customRender: (text, row, index) => {
      return getNum(text, true, 1)
    }
  },
  {
    title: '0%目标(元)',
    dataIndex: 'levelZeroRewardTarget',
    customRender: (text, row, index) => {
      return getNum(text, true, 1)
    }
  },
  {
    title: '0%完成进度',
    dataIndex: 'levelZeroRewardTargetPlannedSpeed',
    scopedSlots: { customRender: 'levelZeroRewardTargetPlannedSpeed' }
    // customRender: (text, row, index) => {
    //   return text !== null ? getNum(Number(text) * 100, true, 2) + '%' : '-'
    // }
  },
  {
    title: '0.1%目标(元)',
    dataIndex: 'levelOneRewardTarget',
    customRender: (text, row, index) => {
      return getNum(text, true, 1)
    }
  },
  {
    title: '0.1%完成进度',
    dataIndex: 'levelOneRewardTargetPlannedSpeed',
    scopedSlots: { customRender: 'levelOneRewardTargetPlannedSpeed' }
    // customRender: (text, row, index) => {
    //   return text !== null ? getNum(Number(text) * 100, true, 2) + '%' : '-'
    // }
  },
  {
    title: '0.2%目标(元)',
    dataIndex: 'levelTwoRewardTarget',
    customRender: (text, row, index) => {
      return getNum(text, true, 1)
    }
  },
  {
    title: '0.2%完成进度',
    dataIndex: 'levelTwoRewardTargetPlannedSpeed',
    scopedSlots: { customRender: 'levelTwoRewardTargetPlannedSpeed' }
    // customRender: (text, row, index) => {
    //   return text !== null ? getNum(Number(text) * 100, true, 2) + '%' : '-'
    // }
  },
  {
    title: '今日流水目标(元)',
    dataIndex: 'todayRewardTarget',
    customRender: (text, row, index) => {
      return text !== null && text < 0 ? '已完成' : getNum(text, true, 1)
    }
  },
  // {
  //   title: '本月三万主播数',
  //   dataIndex: 'threeThousandAnchorCount',
  //   customRender: (text, row, index) => {
  //     return getNum(text, false, 0)
  //   }
  // },
  // {
  //   title: '上月三万主播数',
  //   dataIndex: 'lastMonthThreeThousandAnchorCount',
  //   customRender: (text, row, index) => {
  //     return getNum(text, false, 0)
  //   }
  // },
  // {
  //   title: '本月三万主播数目标',
  //   dataIndex: 'threeThousandAnchorTarget',
  //   customRender: (text, row, index) => {
  //     return getNum(text, false, 0)
  //   }
  // },
  {
    title: '负责人提成比例',
    dataIndex: 'companyLeaderCommissionRate',
    customRender: (text, row, index) => {
      return text !== null ? getNum(Number(text) * 100, true, 3) + '%' : '-'
    }
  }
  // {
  //   title: '目标(元)',
  //   dataIndex: 'incomeTarget',
  //   customRender: (text, row, index) => {
  //     return text && `${amountFormat(text, true, 1)}`
  //   }
  // },
  // {
  //   title: '完成进度',
  //   dataIndex: 'completedPlannedSpeed',
  //   scopedSlots: { customRender: 'completedPlannedSpeed' }
  //   // customRender: (text, row, index) => {
  //   //   return text && `${amountFormat(text * 100, true, 2)}%`
  //   // }
  // },
  // {
  //   title: '今日流水目标(元)',
  //   dataIndex: 'todayOldAnchorIncomeTarget',
  //   customRender: (text, row, index) => {
  //     return text && `${amountFormat(text, true, 1)}`
  //   }
  // }
]

export const columnsRecruit = [
  {
    title: '招募人',
    dataIndex: 'recruitName'
  },
  {
    dataIndex: 'tiktokEffectRecruitCount',
    customRender: (text, row, index) => {
      return getNum(text, false, 0)
    },
    slots: {
      title: 'tiktokEffectRecruitCount',
      name: '抖音有效招募数',
      desc: <div><div domPropsInnerHTML='本月入会，本月总流水在400元-30000元之间，计为1个有效招募;'></div><div domPropsInnerHTML='上月入会，上月总流水低于400元，本月总流水大于等于5000元计为1个有效招募;'></div></div>
    }
  },
  {
    dataIndex: 'tiktokHighQualityRecruitCount',
    customRender: (text, row, index) => {
      return getNum(text, false, 0)
    },
    slots: {
      title: 'tiktokHighQualityRecruitCount',
      name: '抖音优质招募数',
      desc: '本月入会,本月总流水大于等于30000元，计为5个有效招募'
    }
  },
  // {
  //   title: '视频号有效招募数',
  //   dataIndex: 'videoEffectRecruitCount',
  //   // slots: { title: 'viodeEffectRecruitCount' },
  //   customRender: (text, row, index) => {
  //     return getNum(text, false, 0)
  //   }
  // },
  // {
  //   title: '视频号优质招募数',
  //   dataIndex: 'videoHighQualityRecruitCount',
  //   // slots: { title: 'viodeHighQualityRecruitCount' },
  //   customRender: (text, row, index) => {
  //     return getNum(text, false, 0)
  //   }
  // },
  {
    title: '有效招募总数',
    dataIndex: 'effectRecruitTotal',
    customRender: (text, row, index) => {
      return getNum(text, false, 0)
    }
  },
  {
    title: '招募提成比例',
    dataIndex: 'recruitCommissionRatio',
    customRender: (text) => {
      return text && `${amountFormat(text * 100, true, 3)}%`
    }
  }
]

export const columnsRecruitMonth = [
  {
    title: '主播信息',
    dataIndex: 'tiktokLiveName',
    scopedSlots: { customRender: 'tiktokLiveName' }
  },
  {
    title: '月度总流水(元)',
    dataIndex: 'monthTotalReward',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '首播时间',
    dataIndex: 'laborPremiereDate'
  },
  {
    title: '入会时间',
    dataIndex: 'joinGuildDate'
  },
  {
    title: '讲师',
    dataIndex: 'lectureName'
  },
  {
    title: '签约人',
    dataIndex: 'signedName'
  },
  {
    title: '月度直播总时长',
    dataIndex: 'monthTotalDuration'
  },
  {
    title: '月度直播有效天',
    dataIndex: 'monthEffectDay'
  },
  {
    title: '管理提成核算流水(元)',
    dataIndex: 'manageCommissionReward',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  }
]

export const columnsOperate = [
  {
    title: '运营',
    dataIndex: 'operatorName'
  },
  {
    title: '本月老主播流水(元)',
    dataIndex: 'monthReward',
    customRender: (text) => {
      return text !== null && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '门槛流水目标',
    dataIndex: 'targetOneResult',
    customRender: (text) => {
      return text !== null && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '门槛目标完成度',
    dataIndex: 'targetOneSpeedRatio',
    customRender: (text) => {
      return text !== null ? `${amountFormat(text, 2)}%` : '-'
    }
  },
  {
    title: '进阶流水目标',
    dataIndex: 'targetTwoResult',
    customRender: (text) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '进阶目标完成度',
    dataIndex: 'targetTwoSpeedRatio',
    customRender: (text) => {
      return text !== null ? `${amountFormat(text, 2)}%` : '-'
    }
  },
  {
    // title: '今日流水目标',
    dataIndex: 'todayRewardTarget',
    slots: {
      title: 'todayRewardTarget',
      name: '今日流水目标',
      desc: <div><div domPropsInnerHTML='今日流水目标=（对应目标流水-老主播总流水）/本月剩余天数'></div></div>
    }
  },
  {
    title: '运营提成比例',
    dataIndex: 'operatorCommissionRatio',
    customRender: (text) => {
      return text && `${amountFormat(text, true, 3)}%`
    }
  }
]

export const columnsGroupRecruitComplete = [
  {
    title: '小组',
    dataIndex: 'groupName'
  },
  {
    title: '团队招募人总数',
    dataIndex: 'groupRecruitTotal',
    customRender: (text, row, index) => {
      return getNum(text, false, 0)
    }
  },
  {
    title: '0.6%招募个数',
    dataIndex: 'levelSixRecruitCount',
    customRender: (text, row, index) => {
      return getNum(text, false, 0)
    }
  },
  {
    title: '0.6 -0.8%招募个数',
    dataIndex: 'levelSixToEightRecruitCount',
    customRender: (text, row, index) => {
      return getNum(text, false, 0)
    }
  },
  {
    title: '0.8% -1%招募个数',
    dataIndex: 'levelEightToElevenRecruitCount',
    customRender: (text, row, index) => {
      return getNum(text, false, 0)
    }
  },
  {
    title: '1.1%招募个数',
    dataIndex: 'levelElevenRecruitCount',
    customRender: (text, row, index) => {
      return getNum(text, false, 0)
    }
  }
]

export const columnsGroupOperateComplete = [
  {
    title: '小组',
    dataIndex: 'groupName'
  },
  {
    title: '团队运营总数',
    dataIndex: 'operatorTotal',
    customRender: (text, row, index) => {
      return getNum(text, false, 0)
    }
  },
  {
    title: '0.5%运营个数',
    dataIndex: 'targetOneCount',
    customRender: (text, row, index) => {
      return getNum(text, false, 0)
    }
  },
  {
    title: '1%运营个数',
    dataIndex: 'targetTwoCount',
    customRender: (text, row, index) => {
      return getNum(text, false, 0)
    }
  }
]

export const columnsSquared = [
  {
    title: '分公司',
    dataIndex: 'companyName'
  },
  {
    title: '门槛目标(元)',
    dataIndex: 'rewardTarget',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '进阶目标(元)',
    dataIndex: 'advanceTarget',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '九宫格入会流水(元)',
    dataIndex: 'totalGuildReward',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  }
]

export const columnsOperateDetail = [
  {
    title: '主播信息',
    dataIndex: 'tiktokLiveName',
    scopedSlots: { customRender: 'tiktokLiveName' }
  },
  {
    title: '本期流水(元)',
    dataIndex: 'monthReward',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '是否转会主播',
    dataIndex: 'isExchange',
    customRender: (text, row, index) => {
      return text === 1 ? '是' : '否'
    }
  },
  {
    title: '转入日期',
    dataIndex: 'exchangeDate'
  },
  {
    title: '黑天鹅主播',
    dataIndex: 'blankswan',
    customRender: (text, row, index) => {
      return text === 1 ? '是' : '否'
    }
  }
]

export const columnsRule = [
  {
    title: '基线日均流水区间',
    dataIndex: 'zone',
    scopedSlots: { customRender: 'zone' }
  },
  {
    dataIndex: 'isRatio',
    customRender: (text) => {
      return text ? '是' : '否'
    },
    slots: {
      title: 'isRatio'
    }
  },
  {
    title: '目标1增长比例/金额',
    dataIndex: 'targetOne',
    customRender: (text, row, index) => {
      return row.isRatio ? text && `${amountFormat(text, true, 3)}%` : text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '目标1达成后提成比例',
    dataIndex: 'targetOneResult',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 3)}%`
    }
  },
  {
    title: '目标2增长比例/金额',
    dataIndex: 'targetTwo',
    customRender: (text, row, index) => {
      return row.isRatio ? text && `${amountFormat(text, true, 3)}%` : text && `${amountFormat(text, true, 1)}`
    }
  },
  {
    title: '目标2达成后提成比例',
    dataIndex: 'targetTwoResult',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 3)}%`
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
