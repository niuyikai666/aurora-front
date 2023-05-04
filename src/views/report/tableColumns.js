import { numberFormat } from '@/utils/util'
// 短视频 主播情况
export const videoActorColumns = [
  {
    title: '日期',
    dataIndex: 'dateTime'
  },
  {
    title: '累计主播数',
    dataIndex: 'actorCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '当天新增主播数',
    dataIndex: 'newEnterCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '核心主播数',
    dataIndex: 'coreActorCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '流水>5W主播数',
    dataIndex: 'rewardMt5Count',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '断播主播数',
    dataIndex: 'breakLiveCount',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
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
    title: '新增粉丝量',
    dataIndex: 'totalFansIncrease',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '当天新增主播新增粉丝量',
    dataIndex: 'newEnterFansIncrease',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '涨粉1-5w主播数',
    dataIndex: 'fansIncreaseMt1',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '涨粉5-10w主播数',
    dataIndex: 'fansIncreaseMt5',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
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
    title: '点赞数',
    dataIndex: 'totalLikes',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '当天新增主播点赞数',
    dataIndex: 'newEnterLikes',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '赞>1W主播数',
    dataIndex: 'likesMt1',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '赞>5W主播数',
    dataIndex: 'likesMt5',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  }
]
