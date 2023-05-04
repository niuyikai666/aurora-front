import { numberFormat } from '@/utils/util'

export const columns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    fixed: 'left',
    width: 220
  },
  {
    title: '流水(元)',
    dataIndex: 'reward',
    scopedSlots: { customRender: 'reward' }
  },
  {
    title: '有效天(天)',
    dataIndex: 'effectDays',
    scopedSlots: { customRender: 'effectDays' }
  },
  {
    title: '直播时长(小时)',
    dataIndex: 'liveTime',
    scopedSlots: { customRender: 'liveTime' }
  },
  {
    title: '视频多人数据',
    dataIndex: 'videoReward',
    sorter: true,
    scopedSlots: { customRender: 'videoReward' }
    // customRender: (text, row, index) => {
    //   return numberFormat(text, true, 1) + (text > 10000 ? '万' : '')
    // }
  },
  {
    title: '语音数据',
    dataIndex: 'voiceReward',
    sorter: true,
    scopedSlots: { customRender: 'voiceReward' }
  },
  {
    title: '任务有效时长(小时)',
    dataIndex: 'taskEffectDuration',
    customRender: (text, row, index) => {
      return numberFormat(text, true, 1) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '道具占比',
    dataIndex: 'propPercent',
    customRender: (text, row, index) => {
      return (text * 100).toFixed(2) + '%'
    }
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    scopedSlots: { customRender: 'operatorName' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    fixed: 'right',
    width: 80
  }
]

export const columnsDetail = [
  {
    title: '日期',
    dataIndex: 'dateTime'
  },
  {
    title: '流水(元)',
    dataIndex: 'reward',
    scopedSlots: { customRender: 'reward' }
  },
  {
    title: '有效天(天)',
    dataIndex: 'effectDays',
    scopedSlots: { customRender: 'effectDays' }
  },
  {
    title: '直播时长',
    dataIndex: 'liveTime',
    scopedSlots: { customRender: 'liveTime' }
  },
  {
    title: '视频多人数据',
    dataIndex: 'videoReward',
    scopedSlots: { customRender: 'videoReward' }
  },
  {
    title: '语音数据',
    dataIndex: 'voiceReward',
    scopedSlots: { customRender: 'voiceReward' }
  },
  {
    title: '任务有效时长(小时)',
    dataIndex: 'taskEffectDuration',
    customRender: (text, row, index) => {
      return numberFormat(text, true, 1) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '道具占比',
    dataIndex: 'propPercent',
    customRender: (text, row, index) => {
      return (text * 100).toFixed(2) + '%'
    }
  }
]
