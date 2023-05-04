export const columns = [
  {
    title: '主播昵称',
    dataIndex: 'nickname',
    width: '250px'
  },
  {
    title: '抖音号',
    dataIndex: 'tiktokCode',
    scopedSlots: { customRender: 'tiktokCode' }
  },
  {
    title: '火山号',
    dataIndex: 'volcanoCode',
    scopedSlots: { customRender: 'volcanoCode' }
  },
  {
    title: '招募',
    dataIndex: 'recruitName'
  },
  {
    title: '主播姓名',
    dataIndex: 'realname'
  },
  {
    title: '公会经纪人',
    dataIndex: 'agentName',
    scopedSlots: { customRender: 'agentName' }
  },
  {
    title: '填写时间',
    dataIndex: 'modifyTime'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '200px',
    scopedSlots: { customRender: 'action' }
  }
]
