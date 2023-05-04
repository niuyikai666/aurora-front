// import { numberFormat } from '@/utils/util'
import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
const h = new Vue().$createElement
export const platformColumns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    customRender: (text, row, index) => {
      return (
        <div>
          <p style="margin:0">{row.platformCode}</p>
          <p style="margin:0">{row.nickName}</p>
        </div>
      )
    },
    fixed: 'left',
    width: 200
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    customRender: (text, row, index) => {
      return text || '-'
    },
    width: 150
  },
  {
    title: '所属组织',
    dataIndex: 'departmentName',
    customRender: (text, row, index) => {
      return text || '-'
    },
    width: 150
  },
  {
    title: '入会时间',
    dataIndex: 'joinGuildDate',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '直播总时长',
    dataIndex: 'liveDurationHour',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    sorter: true,
    width: 150
  },
  {
    title: '直播有效时长',
    dataIndex: 'effLiveDurationHour',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '直播有效天',
    dataIndex: 'effectDay',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '观看人数',
    dataIndex: 'audience',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '送礼人数',
    dataIndex: 'rewardCount',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '礼物流水',
    dataIndex: 'reward',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    sorter: true,
    width: 150
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    scopedSlots: { customRender: 'action' },
    width: 150
  }
]
export const myColumns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    customRender: (text, row, index) => {
      return (
        <div>
          <p style="margin:0">{row.platformCode}</p>
          <p style="margin:0">{row.nickName}</p>
        </div>
      )
    },
    fixed: 'left',
    width: 200
  },
  {
    title: '入会时间',
    dataIndex: 'joinGuildDate',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '直播总时长',
    dataIndex: 'liveDurationHour',
    sorter: true,
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '直播有效时长',
    dataIndex: 'effLiveDurationHour',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '直播有效天',
    dataIndex: 'effectDay',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '观看人数',
    dataIndex: 'audience',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '送礼人数',
    dataIndex: 'rewardCount',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '礼物流水',
    dataIndex: 'reward',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    sorter: true,
    width: 150
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 150
  }
]
export const columnsModal = [
  {
    title: '日期',
    dataIndex: 'dateTime',
    fixed: 'left',
    width: 160
  },
  {
    title: '有效天',
    dataIndex: 'effectDay',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '直播时长',
    dataIndex: 'liveDurationHour',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '直播有效时长',
    dataIndex: 'effLiveDurationHour',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '观看人数',
    dataIndex: 'audience',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '送礼人数',
    dataIndex: 'rewardCount',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: '礼物流水',
    dataIndex: 'reward',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  }
]
export const RecordModal = [
  {
    title: '文件名',
    dataIndex: 'fileName'
  },
  {
    title: '导出时间',
    dataIndex: 'uploadTime'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 150
  }
]
