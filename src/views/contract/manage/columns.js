
export const columns = [
  {
    title: '合同编号',
    dataIndex: 'code',
    width: '10%'
  },
  {
    title: '合同名称',
    dataIndex: 'nickName',
    width: 150
  },
  {
    title: '姓名',
    dataIndex: 'pbName'
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
    title: '关联账号个数',
    dataIndex: 'relationCount'
  },
  {
    title: '签约日期',
    dataIndex: 'createTime'
  },
  {
    title: '开始日期',
    dataIndex: 'validityStartDate'
  },
  {
    title: '到期日期',
    dataIndex: 'validityEndDate'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    scopedSlots: { customRender: 'action' }
  }
]
