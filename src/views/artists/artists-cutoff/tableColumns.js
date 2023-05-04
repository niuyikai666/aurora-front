export const columns = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    scopedSlots: { customRender: 'nickName' },
    // fixed: 'left',
    width: 200
  },
  {
    title: '招募',
    dataIndex: 'recuitName',
    width: 120
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    scopedSlots: { customRender: 'operatorName' }
  },
  {
    title: '所属组织', // 缺失
    dataIndex: 'operatorDepartmentName',
    scopedSlots: { customRender: 'operatorDepartmentName' },
    width: '180px'
  },
  {
    title: '短视频策划',
    dataIndex: 'engineerName'
  },
  {
    title: '短视频策划所属分公司',
    dataIndex: 'engineerDepartmentName'
  },
  {
    title: '断播天区间', // 缺失
    dataIndex: 'stopBroadcastInterval',
    scopedSlots: { customRender: 'stopBroadcastInterval' }
  },
  {
    title: '签约情况',
    dataIndex: 'signMethod',
    scopedSlots: { customRender: 'signMethod' }
  },
  {
    // title: '是否可激活', // 缺失
    desc: '是否可激活',
    dataIndex: 'canActivity',
    slots: { title: 'customActive' },
    customRender: (text, row, index) => {
      return text ? '是' : '否'
    },
    width: 150
  },
  {
    title: '截止到上月最高月流水',
    dataIndex: 'monthRewardMax',
    scopedSlots: { customRender: 'monthRewardMax' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 80,
    // fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]

export const columnsActived = [
  {
    title: '主播',
    dataIndex: 'nickName',
    fixed: 'left',
    scopedSlots: { customRender: 'nickName' },
    width: 200
  },
  {
    title: '原所属组织',
    dataIndex: 'operatorFullNameOrig',
    scopedSlots: { customRender: 'operatorFullNameOrig' }
  },
  {
    title: '新所属组织',
    dataIndex: 'currentOperatorFullName',
    scopedSlots: { customRender: 'currentOperatorFullName' }
  },
  {
    title: '状态',
    dataIndex: 'state',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: '原招募',
    dataIndex: 'recruitNameOrig'
  },
  {
    title: '原运营',
    dataIndex: 'operatorNameOrig'
  },
  {
    title: '现招募',
    dataIndex: 'currentRecruitName'
  },
  {
    title: '现运营',
    dataIndex: 'currentOperatorName'
  },
  {
    title: '最近开播时间', // 缺失
    dataIndex: 'lastLiveTime'
  },
  {
    title: '断播天数', // 缺失
    dataIndex: 'breakLiveDays'
  },
  // {
  //   title: '断播天区间', // 缺失
  //   dataIndex: 'stopBroadcastInterval',
  //   scopedSlots: { customRender: 'stopBroadcastInterval' }
  // },
  {
    title: '签约情况', // 缺失
    dataIndex: 'signMethod',
    scopedSlots: { customRender: 'signMethod' }
  },
  {
    title: '截止到上月最高月流水', // 缺失
    dataIndex: 'monthRewardMax',
    scopedSlots: { customRender: 'monthRewardMax' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    scopedSlots: { customRender: 'action' },
    fixed: 'right'
  }
]
