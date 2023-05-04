import { amountFormatFunc } from '@/utils/util'
export const personColumns = [
  {
    title: '姓名',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '员工号',
    dataIndex: 'employeeNo',
    scopedSlots: { customRender: 'employeeNo' }
  },
  {
    title: '所属组织架构',
    dataIndex: 'departmentFullName',
    scopedSlots: { customRender: 'departmentFullName' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
export const baseColumns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' }
  },
  {
    title: '保底平台',
    dataIndex: 'platformType',
    customRender: (text) => {
      return text && text.msg || '-'
    }
  },
  {
    title: '平台类型',
    dataIndex: 'scorePlatform',
    customRender: (text) => {
      return text && text.msg || '--'
    }
  },
  {
    title: '状态',
    dataIndex: 'state',
    customRender: (text) => {
      return text && text.msg || '-'
    }
  },
  // {
  //   title: '驳回原因',
  //   dataIndex: 'rejectionReasons'
  // },
  {
    title: '直播任务',
    dataIndex: 'liveTask'
  },
  {
    title: '视频任务',
    dataIndex: 'videoTask'
  },
  {
    title: 'PK次数',
    dataIndex: 'playKill'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
export const artistScoredColumns = [
  {
    title: '保底申请ID',
    dataIndex: 'scoreCode',
    fixed: 'left',
    width: 200
  },
  {
    title: '主播',
    dataIndex: 'nickName',
    width: 280,
    scopedSlots: { customRender: 'nickName' }
  },
  {
    title: '平台类型',
    dataIndex: 'scorePlatform',
    customRender: (text) => {
      return text && text.msg || '--'
    }
  },
  {
    title: '总分',
    dataIndex: 'score',
    customRender: (text, record) => {
      return text
    }
  },
  {
    title: '保底时长',
    dataIndex: 'guaranteeDuration',
    customRender: (text) => {
      return text ? (text + '个月') : '-'
    }
  },
  {
    title: '保底金额',
    dataIndex: 'guarantee',
    customRender: (text) => {
      return text ? (amountFormatFunc(text) + '元') : '-'
    }
  },
  {
    title: '评分生效时间',
    dataIndex: 'finishedDate',
    customRender: (text) => {
      return text || '-'
    }
  }, {
    title: '直播任务',
    dataIndex: 'liveTask'
  },
  {
    title: '视频任务',
    dataIndex: 'videoTask'
  },
  {
    title: 'PK次数',
    dataIndex: 'playKill'
  },
  // {
  //   title: '驳回原因',
  //   dataIndex: 'rejectionReasons'
  // },
  {
    title: '状态',
    dataIndex: 'state',
    width: 150,
    scopedSlots: { customRender: 'state' }
    // customRender: (text) => {
    //   return text && text.msg || '-'
    // }
  },
  {
    title: '改进建议',
    dataIndex: 'suggestions',
    scopedSlots: { customRender: 'suggestions' },
    width: 180
  }
]
export const markingColumns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' }
  },
  {
    title: '保底平台',
    dataIndex: 'platformType',
    customRender: (text) => {
      return text && text.msg || '-'
    }
  },
  {
    title: '主播类型',
    dataIndex: 'actorType',
    customRender: (text) => {
      return text && text.msg || '-'
    }
  },
  {
    title: '评分发起时间',
    dataIndex: 'createTime',
    scopedSlots: { customRender: 'createTime' }
  },
  {
    title: '直播任务',
    dataIndex: 'liveTask'
  },
  {
    title: '视频任务',
    dataIndex: 'videoTask'
  },
  {
    title: 'PK次数',
    dataIndex: 'playKill'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
export const examineColumns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' }
  },
  {
    title: '保底平台',
    dataIndex: 'platformType',
    customRender: (text) => {
      return text && text.msg || '-'
    }
  },
  {
    title: '主播类型',
    dataIndex: 'actorType',
    customRender: (text) => {
      return text && text.msg || '-'
    }
  },
  {
    title: '评分发起时间',
    dataIndex: 'createTime',
    scopedSlots: { customRender: 'createTime' }
  },
  {
    title: '直播任务',
    dataIndex: 'liveTask'
  },
  {
    title: '视频任务',
    dataIndex: 'videoTask'
  },
  {
    title: 'PK次数',
    dataIndex: 'playKill'
  },
  {
    title: '状态',
    dataIndex: 'state',
    customRender: (text) => {
      return text && text.msg || '-'
    },
    width: 100
  },
  {
    title: '改进建议',
    dataIndex: 'suggestions',
    scopedSlots: { customRender: 'suggestions' },
    width: 200
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]
export const scoreColumns = [
  {
    title: '保底申请ID',
    dataIndex: 'scoreCode',
    fixed: 'left',
    width: 200
  },
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    width: 280
  },
  // {
  //   title: '真实姓名',
  //   dataIndex: 'reallyName',
  //   customRender: (text, record) => {
  //     return record.reallyName || '-'
  //   },
  //   width: 100
  // },
  {
    title: '保底平台',
    dataIndex: 'platformType',
    customRender: (text) => {
      return text && text.msg || '-'
    }
  },
  {
    title: '客观评分',
    dataIndex: 'baseScore',
    scopedSlots: { customRender: 'baseScore' }
  },
  {
    title: '主观评分',
    dataIndex: 'subScore',
    scopedSlots: { customRender: 'subScore' }
  },
  {
    title: '总分',
    dataIndex: 'score',
    scopedSlots: { customRender: 'score' }
  },
  {
    title: '断播月数',
    dataIndex: 'breakLiveDay',
    customRender: (text, record) => {
      return text ? `${text}个月` : '-'
    }
  },
  {
    title: '保底时长',
    dataIndex: 'guaranteeDuration',
    customRender: (text, record) => {
      return text ? `${text}个月` : '-'
    }
  },
  {
    title: '保底金额',
    dataIndex: 'guarantee',
    customRender: (text) => {
      return text ? (amountFormatFunc(text) + '元') : '-'
    }
  },
  {
    title: '保底有效期',
    dataIndex: 'effectiveDate'
  },
  {
    title: '评级',
    dataIndex: 'levelType',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '评分生效时间',
    dataIndex: 'finishedDate',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '保底申请人',
    dataIndex: 'applyEmpName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '分公司',
    dataIndex: 'companyName'
  },
  {
    title: '评分发起时间',
    dataIndex: 'createTime',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '状态',
    dataIndex: 'state',
    scopedSlots: { customRender: 'state' }
    // customRender: (text) => {
    //   return text && text.msg || '-'
    // }
  },
  // {
  //   title: '驳回原因',
  //   dataIndex: 'rejectionReasons'
  // },
  {
    title: '改进建议',
    dataIndex: 'suggestions',
    scopedSlots: { customRender: 'suggestions' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 100,
    scopedSlots: { customRender: 'action' }
  }
]
