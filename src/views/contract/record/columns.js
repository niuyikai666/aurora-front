
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
      return text ? text.msg : ''
    }
  },
  {
    title: '调取人姓名',
    dataIndex: 'employeeName'
  },
  {
    title: '调取人所属组织',
    dataIndex: 'fullName'
  },
  {
    title: '调取时间',
    dataIndex: 'applyDate'
  },
  {
    title: '调取事由',
    dataIndex: 'applyReason',
    width: '12%',
    scopedSlots: { customRender: 'applyReason' }
  },
  {
    title: '审核人',
    dataIndex: 'auditorName'
  },
  {
    title: '状态',
    dataIndex: 'applyState',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '剩余可查看天数',
    dataIndex: 'validity'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]
