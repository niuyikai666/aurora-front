// import { numberFormat, amountFormat } from '@/utils/util'
export const myVideoColumns = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    scopedSlots: { customRender: 'nickName' }
  },
  {
    title: '招募',
    dataIndex: 'recruitName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '讲师',
    dataIndex: 'lectureName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '签约状态',
    dataIndex: 'signMethod',
    customRender: (text) => {
      return text ? text.msg : '-'
    }
  },
  {
    title: '签约人',
    dataIndex: 'signEmpName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '入会时间',
    dataIndex: 'joinGuildDate',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '到期时间',
    dataIndex: 'signExpiration',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '本月总流水',
    dataIndex: 'rewardMonth'
  },
  {
    title: '本月直播总时长',
    dataIndex: 'liveDurationHourMonth'
  },
  {
    title: '直播有效天',
    dataIndex: 'effectDay'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export const myRetiredColumns = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    scopedSlots: { customRender: 'nickName' }
  },
  {
    title: '招募',
    dataIndex: 'recruitName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '讲师',
    dataIndex: 'lectureName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '签约状态',
    dataIndex: 'signMethod',
    customRender: (text) => {
      return text ? text.msg : '-'
    }
  },
  {
    title: '签约人',
    dataIndex: 'signEmpName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '入会时间',
    dataIndex: 'joinGuildDate',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '到期时间',
    dataIndex: 'signExpiration',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '退会时间',
    dataIndex: 'retiredDate',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
