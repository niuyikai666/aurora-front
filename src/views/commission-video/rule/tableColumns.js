export const employeeColumns = [
  {
    title: '提成比例类型',
    dataIndex: 'commissionType',
    customRender: (text, row, index) => {
      return text ? text.msg : ''
    },
    width: 300,
    fixed: 'left'
  },
  {
    title: '讲师(%)',
    dataIndex: 'lecturerRatio',
    customRender: (text, row, index) => {
      return text !== null ? `${text}%` : '-'
    }
  },
  {
    title: '招募(%)',
    dataIndex: 'recruitRatio',
    customRender: (text, row, index) => {
      return text !== null ? `${text}%` : '-'
    }
  },
  {
    title: '运营(%)',
    dataIndex: 'operatorRatio',
    customRender: (text, row, index) => {
      return text !== null ? `${text}%` : '-'
    }
  },
  {
    title: '组长(%)',
    dataIndex: 'groupRatio',
    customRender: (text, row, index) => {
      return text !== null ? `${text}%` : '-'
    }
  },
  {
    title: '分公司负责人(%)',
    dataIndex: 'companyRatio',
    customRender: (text, row, index) => {
      return text !== null ? `${text}%` : '-'
    }
  },
  {
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]
export const influencerColumns = [
  {
    title: '年月',
    dataIndex: 'monthDate',
    width: 300,
    fixed: 'left'
  },
  {
    title: '任务档位',
    dataIndex: 'levelType',
    customRender: (text, row, index) => {
      return text ? text.msg : ''
    }
  },
  {
    title: '有效直播天',
    dataIndex: 'effectDay'
  },
  {
    title: '有效直播时长',
    dataIndex: 'liveDuration'
  },
  {
    title: '短视频投稿天数',
    dataIndex: 'videoContributeDay'
  },
  {
    title: '短视频条数',
    dataIndex: 'videoCount'
  },
  {
    title: '佣金比例(%)',
    dataIndex: 'commissionRate'
  },
  {
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]
