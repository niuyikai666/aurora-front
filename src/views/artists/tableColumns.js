
export const artistLiveColumns = [
  {
    title: '日期',
    dataIndex: 'dateTime',
    scopedSlots: { customRender: 'dateTime' }
  },
  {
    title: '流水',
    dataIndex: 'totalReward',
    scopedSlots: { customRender: 'totalReward' }
  },
  {
    title: '本日直播时长',
    dataIndex: 'liveBroadCastDuration',
    scopedSlots: { customRender: 'liveBroadCastDuration' },
    customRender: (text, row, index) => {
      return (text || text === 0) ? (text) : '-'
    }
  },
  {
    title: '有效直播时长',
    dataIndex: 'effectLiveDuration',
    scopedSlots: { customRender: 'effectLiveDuration' },
    customRender: (text, row, index) => {
      return (text || text === 0) ? (text) : '-'
    }
  },
  {
    title: '开播时间',
    dataIndex: 'lastLiveTime',
    scopedSlots: { customRender: 'lastLiveTime' }
  }
]
export const artistMediaColumns = [
  {
    title: '日期',
    dataIndex: 'dateTime',
    scopedSlots: { customRender: 'dateTime' }
  },
  {
    title: '播放数',
    dataIndex: 'playCount',
    scopedSlots: { customRender: 'playCount' }
  },
  {
    title: '点赞数',
    dataIndex: 'likeCount',
    scopedSlots: { customRender: 'likeCount' }
  },
  {
    title: '评论数',
    dataIndex: 'commentCount',
    scopedSlots: { customRender: 'commentCount' }
  }
]
