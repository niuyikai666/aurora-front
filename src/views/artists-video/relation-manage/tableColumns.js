import { numberFormat } from '@/utils/util'
export const adminColumns = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    scopedSlots: { customRender: 'nickName' },
    width: '16.66%',
    fixed: 'left'
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '运营所属组织',
    dataIndex: 'operatorDepartmentName',
    customRender: (text, row, index) => {
      return text || '-'
    }
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
    title: '填写时间',
    dataIndex: 'createTime',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '当前状态',
    dataIndex: 'state',
    customRender: (text) => {
      return text ? text.msg : '-'
    }
  },
  {
    title: '主播信息提交人',
    dataIndex: 'creatorName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '提交人所属组织',
    dataIndex: 'creatorDepartmentName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export const mineColumns = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    scopedSlots: { customRender: 'nickName' },
    width: '16.66%'
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '运营所属组织',
    dataIndex: 'operatorDepartmentName',
    customRender: (text, row, index) => {
      return text || '-'
    }
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
    title: '填写时间',
    dataIndex: 'createTime',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '当前状态',
    dataIndex: 'state',
    customRender: (text) => {
      return text ? text.msg : '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export const noneColumns = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    scopedSlots: { customRender: 'nickName' },
    width: '16.66%',
    fixed: 'left'
  },
  {
    title: '签约人',
    dataIndex: 'signEmpName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '签约状态',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text ? text.msg : '-'
    }
  },
  {
    title: '入会时间',
    dataIndex: 'joinGuildDate',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '在会状态',
    dataIndex: 'retired',
    customRender: (text) => {
      return text !== null ? (text ? '退会' : '在会') : '-'
    }
  },
  {
    title: '到期时间',
    dataIndex: 'signExpiration',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '本月总流水',
    dataIndex: 'rewardMonth',
    customRender: (text, row, index) => {
      if (text === null) return '-'
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '本月直播总时长',
    dataIndex: 'liveDurationHourMonth',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '直播有效天',
    dataIndex: 'effectDay',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '运营微信号',
    dataIndex: 'administratorWechat',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '待绑定运营',
    dataIndex: 'operatorEmpName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '待绑定运营组织',
    dataIndex: 'departmentFullName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  }
]
export const boundingColumns = [
  {
    title: '主播昵称',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    width: 300,
    fixed: 'left',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '主播视频号ID',
    dataIndex: 'platformCode',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '入会日期',
    dataIndex: 'joinGuildDate',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
