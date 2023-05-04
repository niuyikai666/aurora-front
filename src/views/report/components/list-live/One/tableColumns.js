import { numberFormat } from '@/utils/util'
// 开播情况
export const broadCastingColumns = [
  {
    title: '日期',
    dataIndex: 'dateTime'
  },
  {
    dataIndex: 'liveCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'liveCount',
      name: '开播主播数',
      desc: '时间段内直播时长不为0的主播数'
    }
  },
  {
    // 主播1H日活
    dataIndex: 'liveHourCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'liveHourCount',
      name: '主播1H日活',
      desc: '当天开播1小时(1个有效天)总主播数'
    }
  },
  {
    // 主播1H日活率
    dataIndex: 'liveHourPercent',
    customRender: (text, row, index) => {
      return text ? (text * 100).toFixed(1) + '%' : '-'
    },
    slots: {
      title: 'liveHourPercent',
      name: '主播1H日活率',
      desc: '当天开播1小时(1个有效天)总主播数/总开播主播数'
    }
  },
  {
    dataIndex: 'newEnterLiveCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterLiveCount',
      name: '当天新入驻主播开播数',
      desc: '当天新入驻主播中直播时长不为0的主播数'
    }
  },
  {
    dataIndex: 'newEnterLiveHour',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterLiveHour',
      name: '当天新入驻主播1H日活',
      desc: '当天新入驻主播单次直播时长大于1小时的主播数'
    }
  }
]
// 流水情况
export const rewardListColumns = [
  {
    title: '日期',
    dataIndex: 'dateTime'
  },
  {
    dataIndex: 'rewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'rewardMoney',
      name: '总流水',
      desc: '时间段内流水总和'
    }
  },
  {
    dataIndex: 'newEnterRewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterRewardMoney',
      name: '当天新入驻主播流水',
      desc: '当天新入驻主播产生的流水'
    }
  },
  {
    dataIndex: 'coreActorRewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'coreActorRewardMoney',
      name: '当天核心主播流水',
      desc: '当天核心主播产生的流水'
    }
  },
  {
    dataIndex: 'signedActorRewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'signedActorRewardMoney',
      name: '全约/网签主播流水',
      desc: '当天有签约的主播产生的流水，包括全约和网签'
    }
  }
]
// 新入驻情况
export const newEnterColumns = [
  {
    title: '日期',
    dataIndex: 'dateTime'
  },
  {
    dataIndex: 'newEnterCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterCount',
      name: '当天新入驻主播数',
      desc: '当天加入直播开放平台的主播数'
    }
  },
  {
    dataIndex: 'newEnterLiveCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterLiveCount',
      name: '当天新入驻主播开播数',
      desc: '当天新入驻主播中直播时长不为0的主播数'
    }
  },
  {
    // title: '新入驻主播有效开播数',
    dataIndex: 'newEnterLiveEffectMonth',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterLiveEffectMonth',
      name: '当月新入驻主播有效开播数',
      desc: '当月新入驻主播当天开播25分钟以上'
    }
  },
  {
    // title: '当月新入驻主播有效开播率',
    dataIndex: 'newEnterLiveEffectPercentMonth',
    customRender: (text, row, index) => {
      return text ? (text * 100).toFixed(1) + '%' : '-'
    },
    slots: {
      title: 'newEnterLiveEffectPercentMonth',
      name: '当月新入驻主播有效开播率',
      desc: '当月新入驻有效开播主播数/新入驻开播主播数'
    }
  },
  {
    // title: '当天新入驻主播1H日活',
    dataIndex: 'newEnterLiveHour',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterLiveHour',
      name: '当天新入驻主播1H日活',
      desc: '当天新入驻主播开播1小时(1个有效天)主播数'
    }
  },
  {
    // title: '当天新入驻1H日活率',
    dataIndex: 'newEnterLiveHourPercent',
    customRender: (text, row, index) => {
      return text ? (text * 100).toFixed(1) + '%' : '-'
    },
    slots: {
      title: 'newEnterLiveHourPercent',
      name: '当天新入驻1H日活率',
      desc: '新入驻1小时(1个有效天)开播主播数/新入驻开播主播数'
    }
  },
  {
    dataIndex: 'newEnterRewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterRewardMoney',
      name: '当天新入驻主播流水',
      desc: '当天新入驻主播产生的流水'
    }
  }
]
// 再激活情况
export const ActivityColumns = [
  {
    title: '日期',
    dataIndex: 'dateTime'
  },
  {
    dataIndex: 'activityCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'activityCount',
      name: '再激活主播数',
      desc: '断播主播成功激活并申请通过的主播数'
    }
  },
  {
    dataIndex: 'activityLiveCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'activityLiveCount',
      name: '再激活主播开播数',
      desc: '再激活主播中直播时长不为0的主播数'
    }
  },
  {
    // title: '再激活主播有效开播数',
    dataIndex: 'activityLiveEffect',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'activityLiveEffect',
      name: '再激活主播有效开播数',
      desc: '再激活主播当天开播大于25分钟以上主播数'
    }
  },
  {
    // title: '再激活主播有效开播率',
    dataIndex: 'activityLiveEffectPercent',
    customRender: (text, row, index) => {
      return text ? (text * 100).toFixed(1) + '%' : '-'
    },
    slots: {
      title: 'activityLiveEffectPercent',
      name: '再激活主播有效开播率',
      desc: '再激活主播有效开播主播数/再激活开播总主播数'
    }
  },
  {
    // title: '再激活主播1H日活',
    dataIndex: 'activityLiveHour',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'activityLiveHour',
      name: '再激活主播1H日活',
      desc: '再激活主播当天开播(1个有效天)主播数'
    }
  },
  {
    // title: '再激活1H日活率',
    dataIndex: 'activityLiveHourPercent',
    customRender: (text, row, index) => {
      return text ? (text * 100).toFixed(1) + '%' : '-'
    },
    slots: {
      title: 'activityLiveHourPercent',
      name: '再激活1H日活率',
      desc: '再激活主播当天开播(1个有效天)主播数/再激活开播总主播数'
    }
  },
  {
    dataIndex: 'activityRewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'activityRewardMoney',
      name: '再激活主播流水',
      desc: '时间段内再激活主播产生的流水'
    }
  }
]
