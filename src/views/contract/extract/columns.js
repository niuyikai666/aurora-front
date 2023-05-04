
export const columns = [
  {
    title: '姓名',
    dataIndex: 'pbName',
    width: '8%'
  },
  {
    title: '身份证号',
    dataIndex: 'pbIdCard',
    width: '15%'
  },
  {
    title: '签约类型',
    dataIndex: 'signType',
    customRender: (text, row, index) => {
      return text.msg
    }
  },
  {
    title: '调取时间',
    dataIndex: 'applyDate'
  },
  {
    title: '调取事由',
    dataIndex: 'applyReason',
    scopedSlots: { customRender: 'applyReason' },
    width: '12%'
  },
  {
    title: '状态',
    dataIndex: 'applyState',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '剩余可查询天数',
    dataIndex: 'validity'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]
