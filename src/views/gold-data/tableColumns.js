// 新入驻主播
export const weekEnterUnionColumns = [
  {
    title: '主播',
    dataIndex: 'name',
    width: '250px',
    scopedSlots: { customRender: 'artists' }
  },
  {
    title: '总音浪',
    dataIndex: 'totalSoundbyte',
    scopedSlots: { customRender: 'totalSoundbyte' },
    width: '150px',
    defaultSortOrder: 'descend',
    sorter: true
  },
  {
    title: '昨日音浪',
    dataIndex: 'yesterSoundByte',
    scopedSlots: { customRender: 'yesterSoundByte' },
    sorter: true
  },
  {
    title: '昨日开播时长(小时)',
    scopedSlots: { customRender: 'yesterLiveDuration' },
    dataIndex: 'yesterLiveDuration',
    sorter: true
  },
  {
    title: '最近开播日期',
    dataIndex: 'lastLiveDateTime',
    scopedSlots: { customRender: 'lastLiveDateTime' },
    sorter: true
  },
  {
    title: '入会时间',
    dataIndex: 'signingTime'
  },
  {
    title: '分成比',
    dataIndex: 'splitRatio',
    scopedSlots: { customRender: 'splitRatio' }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '240px',
    scopedSlots: { customRender: 'remark' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
// 稳定开播主播
export const steadyColumns = [
  {
    title: '主播',
    dataIndex: 'name',
    width: '250px',
    scopedSlots: { customRender: 'artists' }
  },
  {
    title: '总音浪',
    dataIndex: 'totalSoundbyte',
    scopedSlots: { customRender: 'totalSoundbyte' },
    width: '150px',
    defaultSortOrder: 'descend',
    sorter: true
  },
  {
    title: '近30日音浪',
    dataIndex: 'last30SoundByte',
    scopedSlots: { customRender: 'last30SoundByte' },
    sorter: true
  },
  {
    title: '近30日开播时长(小时)',
    dataIndex: 'last30LiveDuration',
    sorter: true
  },
  {
    title: '最近开播日期',
    dataIndex: 'lastLiveDateTime',
    scopedSlots: { customRender: 'lastLiveDateTime' },
    sorter: true
  },
  {
    title: '入会时间',
    dataIndex: 'signingTime'
  },
  {
    title: '分成比',
    dataIndex: 'splitRatio',
    scopedSlots: { customRender: 'splitRatio' }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '240px',
    scopedSlots: { customRender: 'remark' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
// 高收入主播
export const highColumns = [
  {
    title: '主播',
    dataIndex: 'name',
    width: '250px',
    scopedSlots: { customRender: 'artists' }
  },
  {
    title: '总音浪',
    dataIndex: 'totalSoundbyte',
    scopedSlots: { customRender: 'totalSoundbyte' },
    width: '150px',
    defaultSortOrder: 'descend',
    sorter: true
  },
  {
    title: '近30日音浪',
    dataIndex: 'last30SoundByte',
    scopedSlots: { customRender: 'last30SoundByte' },
    sorter: true
  },
  {
    title: '近30日开播时长(小时)',
    dataIndex: 'yesterLiveDuration',
    sorter: true
  },
  {
    title: '最近开播日期',
    dataIndex: 'lastLiveDateTime',
    scopedSlots: { customRender: 'lastLiveDateTime' },
    sorter: true
  },
  {
    title: '入会时间',
    dataIndex: 'signingTime'
  },
  {
    title: '分成比',
    dataIndex: 'splitRatio',
    scopedSlots: { customRender: 'splitRatio' }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '240px',
    scopedSlots: { customRender: 'remark' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
// 断播主播
export const interruptColumns = [
  {
    title: '主播',
    dataIndex: 'name',
    width: '250px',
    scopedSlots: { customRender: 'artists' }
  },
  {
    title: '总音浪',
    dataIndex: 'totalSoundbyte',
    scopedSlots: { customRender: 'totalSoundbyte' },
    width: '150px',
    defaultSortOrder: 'descend',
    sorter: true
  },
  {
    title: '近30日音浪',
    dataIndex: 'last30SoundByte',
    scopedSlots: { customRender: 'last30SoundByte' },
    sorter: true
  },
  {
    title: '断播天数',
    dataIndex: 'cutOffSowingDays',
    scopedSlots: { customRender: 'cutOffSowingDays' },
    sorter: true
  },
  {
    title: '最近开播日期',
    dataIndex: 'lastLiveDateTime',
    scopedSlots: { customRender: 'lastLiveDateTime' },
    sorter: true
  },
  {
    title: '入会时间',
    dataIndex: 'signingTime'
  },
  {
    title: '分成比',
    dataIndex: 'splitRatio',
    scopedSlots: { customRender: 'splitRatio' }
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: '240px',
    scopedSlots: { customRender: 'remark' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
export const artistDetailColumns = [
  {
    title: '日期',
    dataIndex: 'dateTime',
    scopedSlots: { customRender: 'dateTime' }
  },
  {
    title: '音浪(火力)',
    dataIndex: 'soundbyte',
    scopedSlots: { customRender: 'soundbyte' }
  },
  {
    title: '有效开播时长(小时)',
    dataIndex: 'validLiveDuration',
    scopedSlots: { customRender: 'validLiveDuration' }
  },
  {
    title: '曝光人数(人)',
    dataIndex: 'showUv',
    scopedSlots: { customRender: 'showUv' }
  },
  {
    title: '曝光次数(次)',
    dataIndex: 'showPv',
    scopedSlots: { customRender: 'showPv' }
  },
  {
    title: '进入直播间人数(人)',
    dataIndex: 'watchUv',
    scopedSlots: { customRender: 'watchUv' }
  },
  {
    title: '进入直播间次数(次)',
    dataIndex: 'watchPv',
    scopedSlots: { customRender: 'watchPv' }
  },
  {
    title: '进入直播间转化率',
    dataIndex: 'enterRoomConversionRate',
    scopedSlots: { customRender: 'enterRoomConversionRate' }
  },
  {
    title: '人均观看时长(分钟)',
    dataIndex: 'watchDurationUserAvg',
    scopedSlots: { customRender: 'watchDurationUserAvg' }
  }
]
export const giftColumns = [
  {
    title: '排行',
    dataIndex: 'rank',
    scopedSlots: { customRender: 'rank' }
  },
  {
    title: '土豪信息',
    dataIndex: 'info',
    scopedSlots: { customRender: 'info' }
  },
  {
    title: '打赏音浪',
    dataIndex: 'soundbyte',
    scopedSlots: { customRender: 'soundbyte' }
  }
]
