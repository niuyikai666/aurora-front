import { numberFormat } from '@/utils/util'
// 短视频 主播情况
export const videoActorColumns = [
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
      name: '当天新入驻主播数',
      desc: '截止到时间段内最后一天的主播总数'
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
// 短视频 粉丝情况
export const videoFanColumns = [
  {
    title: '日期',
    dataIndex: 'dateTime'
  },
  {
    dataIndex: 'totalFansIncrease',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'totalFansIncrease',
      name: '新增粉丝量',
      desc: '当天新入驻主播产生的粉丝量'
    }
  },
  {
    dataIndex: 'newEnterFansIncrease',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterFansIncrease',
      name: '当天新增主播新增粉丝量',
      desc: '当天新增主播产生的粉丝量'
    }
  },
  {
    dataIndex: 'fansIncreaseMt1',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'fansIncreaseMt1',
      name: '涨粉1-5w主播数',
      desc: '时间段内涨粉大于等于1万且小于5万主播数'
    }
  },
  {
    dataIndex: 'fansIncreaseMt5',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'fansIncreaseMt5',
      name: '涨粉5-10w主播数',
      desc: '时间段内涨粉大于等于5万且小于10万主播数'
    }
  }
]
// 短视频 粉丝情况
export const videoLikeColumns = [
  {
    title: '日期',
    dataIndex: 'dateTime'
  },
  {
    dataIndex: 'totalLikes',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'totalLikes',
      name: '点赞数',
      desc: '时间段内产生的点赞数'
    }
  },
  {
    dataIndex: 'newEnterLikes',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'newEnterLikes',
      name: '当天新增主播点赞数',
      desc: '当天新入驻主播产生的点赞数'
    }
  },
  {
    dataIndex: 'likesMt1',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'likesMt1',
      name: '赞>1W主播数',
      desc: '时间段内获得赞大于等于1万的主播数'
    }
  },
  {
    dataIndex: 'likesMt5',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    slots: {
      title: 'likesMt5',
      name: '赞>5W主播数',
      desc: '时间段内获得赞大于等于5万的主播数'
    }
  }
]
