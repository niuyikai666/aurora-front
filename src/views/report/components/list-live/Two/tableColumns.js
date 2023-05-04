import { numberFormat } from '@/utils/util'
// 按日期
export const dateColumns = [
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
      desc: '时间段内水总和'
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
      desc: '时间段内有签约的主播产生的流水，包括全约和网签'
    }
  }
]
// 按组织
export const groupColumns = [
  {
    title: '组名',
    dataIndex: 'departmentName'
  },
  {
    dataIndex: 'rewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'rewardMoney',
      name: '总流水',
      desc: '时间段内水总和'
    }
  },
  {
    dataIndex: 'newEnterRewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterRewardMoney',
      name: '新入驻主播流水',
      desc: '时间段内新入驻主播产生的流水'
    }
  },
  {
    dataIndex: 'coreActorRewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'coreActorRewardMoney',
      name: '核心主播流水',
      desc: '时间段内核心主播产生的流水'
    }
  },
  {
    dataIndex: 'signedRewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'signedRewardMoney',
      name: '全约/网签主播流水',
      desc: '时间段内有签约的主播产生的流水，包括全约和网签'
    }
  }
]
// 按运营
export const operatorColumns = [
  {
    title: '姓名',
    dataIndex: 'name'
  },
  {
    dataIndex: 'rewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'rewardMoney',
      name: '总流水',
      desc: '时间段内水总和'
    }
  },
  {
    dataIndex: 'newEnterRewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterRewardMoney',
      name: '新入驻主播流水',
      desc: '时间段内新入驻主播产生的流水'
    }
  },
  {
    dataIndex: 'coreActorRewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'coreActorRewardMoney',
      name: '核心主播流水',
      desc: '时间段内核心主播产生的流水'
    }
  },
  {
    dataIndex: 'signedRewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'signedRewardMoney',
      name: '全约/网签主播流水',
      desc: '时间段内有签约的主播产生的流水，包括全约和网签'
    }
  }
]
// 按主播
export const influencerColumns = [
  {
    title: '主播',
    dataIndex: 'InfluencernickName',
    scopedSlots: { customRender: 'InfluencernickName' }
  },
  {
    title: '开播时间',
    dataIndex: 'lastLiveTime',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    dataIndex: 'liveBroadcastDuration',
    customRender: (text, row, index) => {
      return (text || text === 0) ? (text) : ''
    },
    slots: {
      title: 'liveBroadcastDuration',
      name: '直播时长',
      desc: '主播当天累计直播时长'
    }
  },
  {
    dataIndex: 'rewardMoney',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'rewardMoney',
      name: '总流水',
      desc: '时间段内水总和'
    }
  },
  {
    title: '入驻时间',
    dataIndex: 'joinGuildDate',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '所属小组',
    dataIndex: 'departmentName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  }
]
