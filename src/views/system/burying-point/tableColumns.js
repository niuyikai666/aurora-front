export const moduleColumns = [
  {
    title: '功能模块',
    dataIndex: 'parentPageCn'
  },
  {
    title: '使用人数',
    dataIndex: 'peopleNum'
  },
  {
    title: '使用次数',
    dataIndex: 'timeNum'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export const pageColumns = [
  {
    title: '页面',
    dataIndex: 'pageCn'
  },
  {
    title: '所属模块',
    dataIndex: 'parentPageCn'
  },
  {
    title: '使用人数',
    dataIndex: 'peopleNum'
  },
  {
    title: '使用次数',
    dataIndex: 'timeNum'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
