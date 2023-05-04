export const artistsColumns = [
  {
    title: '主播',
    dataIndex: 'nickname',
    width: '250px',
    fixed: 'left',
    scopedSlots: { customRender: 'artists' }
  },
  {
    title: '入会时间',
    dataIndex: 'signingTime',
    scopedSlots: { customRender: 'signingTime' }
  },
  {
    title: '主播信息填写时间',
    dataIndex: 'firstEnteringDateOfInfluencerInfo',
    scopedSlots: { customRender: 'firstEnteringDateOfInfluencerInfo' }
  },
  {
    title: '短视频孵化线填写时间',
    dataIndex: 'firstEnteringDateOfVideoInfo',
    scopedSlots: { customRender: 'firstEnteringDateOfVideoInfo' }
  },
  {
    title: '进度',
    dataIndex: 'infoState'
  },
  {
    title: '招募',
    dataIndex: 'recruitName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    scopedSlots: { customRender: 'operatorName' }
  },
  {
    title: '讲师',
    dataIndex: 'lecturerName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '签约信息',
    dataIndex: 'signMethod',
    scopedSlots: { customRender: 'signMethod' }
  },
  {
    title: '签约时间',
    dataIndex: 'signStartDate',
    scopedSlots: { customRender: 'signStartDate' }
  },
  {
    title: '短视频孵化线',
    dataIndex: 'operationType',
    scopedSlots: { customRender: 'operationType' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '200px',
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export const relationColumns = [
  {
    title: '主播',
    dataIndex: 'nickname',
    scopedSlots: { customRender: 'artists' }
  },
  {
    title: '修改关系',
    dataIndex: 'category',
    scopedSlots: { customRender: 'category' }
  },
  {
    title: '修改后员工姓名',
    dataIndex: 'newEmployeeName',
    scopedSlots: { customRender: 'newEmployeeName' }
  },
  {
    title: '修改后员工手机号',
    dataIndex: 'newEmployeeMobile',
    scopedSlots: { customRender: 'newEmployeeMobile' }
  },
  {
    title: '修改时间',
    dataIndex: 'operateTime',
    scopedSlots: { customRender: 'operateTime' }
  },
  {
    title: '修改人',
    dataIndex: 'operatorName',
    scopedSlots: { customRender: 'operatorName' }
  }
]
