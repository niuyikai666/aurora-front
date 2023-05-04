export const columns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' }
  },
  {
    title: '总流水',
    dataIndex: 'totalReward',
    sorter: true,
    customRender: (text, row, index) => {
      return (row.totalReward ? text : '-')
    }
  },
  {
    title: '昨日流水',
    dataIndex: 'yesterdayTotalReward',
    sorter: true,
    customRender: (text, row, index) => {
      return (row.yesterdayTotalReward ? text : '-')
    }
  },
  {
    title: '粉丝总数',
    dataIndex: 'totalFans',
    sorter: true,
    customRender: (text, row, index) => {
      return (row.totalFans ? text : '-')
    }
  },
  {
    title: '最近开播日期',
    dataIndex: 'lastLiveTime',
    sorter: true,
    customRender: (text, row, index) => {
      return (row.lastLiveTime ? text : '-')
    }
  },
  {
    title: '签约情况',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return (row.signMethod ? row.signMethod.msg : '-')
    }
  },
  {
    title: '入会时间',
    sorter: true,
    dataIndex: 'joinGuildDate',
    customRender: (text, row, index) => {
      return (row.joinGuildDate ? text : '-')
    }
  },
  {
    title: '是否退会',
    sorter: true,
    dataIndex: 'retired',
    customRender: (text, row, index) => {
      return text ? '是' : '否'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]
