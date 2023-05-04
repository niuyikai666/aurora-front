export const boudingColumns = [
  {
    title: '主播昵称',
    dataIndex: 'nickName',
    fixed: 'left',
    scopedSlots: { customRender: 'nickName' },
    width: 220
  },
  {
    title: '抖音号',
    dataIndex: 'tiktokCode',
    scopedSlots: { customRender: 'tiktokCode' }
  },
  {
    title: '抖音号原',
    dataIndex: 'tiktokCodeOrig',
    scopedSlots: { customRender: 'tiktokCodeOrig' }
  },
  {
    title: '入会日期',
    dataIndex: 'joinGuildDate',
    sorter: true
  },
  {
    title: '经纪人',
    dataIndex: 'agentName'
  },
  {
    title: '待绑定运营',
    dataIndex: 'boundOperatorName'
  },
  {
    title: '待绑定运营所属组织',
    dataIndex: 'boundDepartmentName'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export const boudingMeColumns = [
  {
    title: '主播昵称',
    dataIndex: 'nickName',
    fixed: 'left',
    scopedSlots: { customRender: 'nickName' },
    width: 220
  },
  {
    title: '抖音号',
    dataIndex: 'tiktokCode',
    scopedSlots: { customRender: 'tiktokCode' }
  },
  {
    title: '抖音号原',
    dataIndex: 'tiktokCodeOrig',
    scopedSlots: { customRender: 'tiktokCodeOrig' }
  },
  {
    title: '入会日期',
    dataIndex: 'joinGuildDate',
    sorter: true
  },
  {
    title: '经纪人',
    dataIndex: 'agentName'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export const preManageColumns = [
  {
    title: '主播账号类型',
    dataIndex: 'platformType',
    customRender: (text) => {
      return text ? text.msg : ''
    },
    fixed: 'left',
    width: 220
  },
  {
    title: '账号ID',
    dataIndex: 'platformCode',
    scopedSlots: { customRender: 'platformCode' }
  },
  {
    title: '经纪人',
    dataIndex: 'agentName',
    scopedSlots: { customRender: 'agentName' }
  },
  {
    title: '主播昵称',
    dataIndex: 'nickName'
  },
  {
    title: '主播姓名',
    dataIndex: 'realName'
  },
  {
    title: '运营',
    dataIndex: 'operatorEmployeeName'
  },
  {
    title: '招募',
    dataIndex: 'recruitName'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '当前状态',
    dataIndex: 'state',
    customRender: (text, record) => {
      return text ? `${text.msg}${text.code === 4 ? ('(' + record.errorMsg + ')') : ''}` : ''
    }
  },
  {
    title: '预填写提交人',
    dataIndex: 'creatorName'
  },
  {
    title: '预填写提交人所属组织',
    dataIndex: 'creatorDepartmentName'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export const prefillColumns = [
  {
    title: '主播账号类型',
    dataIndex: 'platformType',
    customRender: (text) => {
      return text ? text.msg : ''
    },
    fixed: 'left',
    width: 220
  },
  {
    title: '账号ID',
    dataIndex: 'platformCode',
    scopedSlots: { customRender: 'platformCode' }
  },
  {
    title: '运营',
    dataIndex: 'operatorEmployeeName'
  },
  {
    title: '招募',
    dataIndex: 'recruitName'
  },
  {
    title: '经纪人',
    dataIndex: 'agentName',
    scopedSlots: { customRender: 'agentName' }
  },
  {
    title: '主播昵称',
    dataIndex: 'nickName'
  },
  {
    title: '主播姓名',
    dataIndex: 'realName'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '当前状态',
    dataIndex: 'state',
    customRender: (text, record) => {
      return text ? `${text.msg}${text.code === 4 ? ('(' + record.errorMsg + ')') : ''}` : ''
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export const operateNoneColumns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' }
  },
  {
    title: '经纪人',
    dataIndex: 'agentName',
    scopedSlots: { customRender: 'agentName' }
  },
  {
    title: '入会日期',
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
    title: '签约情况',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return (row.signMethod ? row.signMethod.msg : '-')
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
    title: '操作',
    dataIndex: 'action',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]
