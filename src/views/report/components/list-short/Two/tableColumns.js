import { numberFormat } from '@/utils/util'
// 按日期
export const dateColumns = [
  {
    title: '日期',
    dataIndex: 'dateTime'
  },
  {
    dataIndex: 'actorCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'actorCount',
      name: '累计主播数',
      desc: '截止到时间段内最后一天的主播总数'
    }
  },
  {
    dataIndex: 'newEnterCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterCount',
      name: '当天新增主播数',
      desc: '当天新入驻主播数'
    }
  },
  {
    dataIndex: 'coreActorCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'coreActorCount',
      name: '核心主播数',
      desc: '历史有一个月流水达到五万元的主播'
    }
  },
  {
    dataIndex: 'rewardMt5Count',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'rewardMt5Count',
      name: '流水>5W主播数',
      desc: '上月流水大于等于五万的主播数'
    }
  },
  {
    dataIndex: 'breakLiveCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'breakLiveCount',
      name: '断播主播数',
      desc: '最近开播时间距当天大于1天的主播数'
    }
  }
]
// 按小组
export const groupColumns = [
  {
    title: '组名',
    dataIndex: 'departmentName'
  },
  {
    dataIndex: 'actorCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'actorCount',
      name: '累计主播数',
      desc: '截止到时间段内最后一天的主播总数'
    }
  },
  {
    dataIndex: 'newEnterCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterCount',
      name: '新增主播数',
      desc: '时间段内本月新加入公会的主播数'
    }
  },
  {
    dataIndex: 'coreActorCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'coreActorCount',
      name: '核心主播数',
      desc: '历史有一个月流水达到五万元的主播'
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
    dataIndex: 'actorCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'actorCount',
      name: '累计主播数',
      desc: '截止到时间段内最后一天的主播总数'
    }
  },
  {
    dataIndex: 'newActorCount',
    customRender: (text, row, index) => {
      return text !== null ? numberFormat(text) + (text > 10000 ? '万' : '') : '-'
    },
    slots: {
      title: 'newActorCount',
      name: '新增主播数',
      desc: '时间段内本月新加入公会的主播数'
    }
  },
  {
    dataIndex: 'coreActorCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'coreActorCount',
      name: '核心主播数',
      desc: '历史有一个月流水达到五万元的主播'
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
    title: '入驻日期',
    dataIndex: 'joinGuildDate',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    dataIndex: 'fansTotal',
    customRender: (text, row, index) => {
      return text || '-'
    },
    slots: {
      title: 'fansTotal',
      name: '粉丝数',
      desc: '截止到时间段内最后一天的粉丝总数'
    }
  },
  {
    dataIndex: 'fansIncrease',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'fansIncrease',
      name: '新增粉丝数',
      desc: '当天新入驻主播产生的粉丝量'
    }
  },
  {
    dataIndex: 'videoCount',
    customRender: (text, row, index) => {
      return text !== null ? numberFormat(text) + (text > 10000 ? '万' : '') : '-'
    },
    slots: {
      title: 'videoCount',
      name: '发布视频数',
      desc: '时间段内发布的视频数'
    }
  },
  {
    dataIndex: 'likeCount',
    customRender: (text, row, index) => {
      return text !== null ? numberFormat(text) + (text > 10000 ? '万' : '') : '-'
    },
    slots: {
      title: 'likeCount',
      name: '累积点赞数',
      desc: '时间段内产生的点赞数'
    }
  },
  {
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text ? text.msg : '-'
    },
    slots: {
      title: 'signMethod',
      name: '签约类型',
      desc: '有全约、网签、未签约三种类型'
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
