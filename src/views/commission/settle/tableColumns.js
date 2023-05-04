// import { numberFormat, amountFormat } from '@/utils/util'
export const comfireColumns = [
  {
    title: '主播信息',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    width: 200,
    fixed: 'left'
  },
  {
    title: '月度流水(元)',
    dataIndex: 'totalReward',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '在会状态',
    dataIndex: 'retired',
    customRender: (text, row, index) => {
      return text !== null ? (text ? '退会' : '在会') : '-'
    }
  },
  {
    title: '签约状态',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text ? text.msg : '-'
    }
  },
  {
    title: '签约日期',
    dataIndex: 'signStartDate',
    customRender: (text, row, index) => {
      return (row.signStartDate || '-') + '至' + (row.signEndDate || '-')
    }
  },
  {
    title: '结算所属组织',
    dataIndex: 'departmentFullName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算运营人',
    dataIndex: 'operatorEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算招募人',
    dataIndex: 'recruitEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算讲师',
    dataIndex: 'lecturerEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算签约人',
    dataIndex: 'signEmpName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    scopedSlots: { customRender: 'action' },
    slots: {
      title: 'action',
      name: '操作',
      desc: '在会无运营的主播，请直接填写主播金数据'
    }
  }
]
export const comfiredColumns = [
  {
    title: '主播信息',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    width: 200,
    fixed: 'left'
  },
  {
    title: '月度流水(元)',
    dataIndex: 'totalReward',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '在会状态',
    dataIndex: 'retired',
    customRender: (text, row, index) => {
      return text !== null ? (text ? '退会' : '在会') : '-'
    }
  },
  {
    title: '金数据关系',
    dataIndex: 'hasGold',
    customRender: (text, row, index) => {
      return text !== null ? (text ? '有' : '无') : '-'
    }
  },
  {
    title: '签约状态',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text ? text.msg : '-'
    }
  },
  {
    title: '签约日期',
    dataIndex: 'signStartDate',
    customRender: (text, row, index) => {
      return (row.signStartDate || '-') + '至' + (row.signEndDate || '-')
    }
  },
  {
    title: '结算所属组织',
    dataIndex: 'departmentFullName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算运营人',
    dataIndex: 'operatorEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算招募人',
    dataIndex: 'recruitEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算讲师',
    dataIndex: 'lecturerEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算签约人',
    dataIndex: 'signEmpName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '确认方式',
    dataIndex: 'confirmMethod',
    width: 120,
    fixed: 'right',
    customRender: (text) => {
      return text ? text.msg : '-'
    }
  }
]
export const myColumns = [
  {
    title: '主播信息',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    width: 200,
    fixed: 'left'
  },
  {
    title: '月度流水(元)',
    dataIndex: 'totalReward',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '在会状态',
    dataIndex: 'retired',
    customRender: (text, row, index) => {
      return text !== null ? (text ? '退会' : '在会') : '-'
    }
  },
  {
    title: '签约状态',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text ? text.msg : '-'
    }
  },
  {
    title: '签约日期',
    dataIndex: 'signStartDate',
    customRender: (text, row, index) => {
      return (row.signStartDate || '-') + '至' + (row.signEndDate || '-')
    }
  },
  {
    title: '结算招募人',
    dataIndex: 'recruitEmployeeName',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '结算讲师',
    dataIndex: 'lecturerEmployeeName',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '结算签约人',
    dataIndex: 'signEmpName',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  }
]
export const recordColumns = [
  {
    title: '主播信息',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    width: 200,
    fixed: 'left'
  },
  {
    title: '在会状态',
    dataIndex: 'retired',
    customRender: (text, row, index) => {
      return text !== null ? (text ? '退会' : '在会') : '-'
    }
  },
  {
    title: '金数据关系',
    dataIndex: 'hasGoldData',
    customRender: (text, row, index) => {
      return text !== null ? (text ? '有' : '无') : '-'
    }
  },
  {
    title: '结算运营人',
    dataIndex: 'operatorEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '运营人组织',
    dataIndex: 'operatorDepartmentFullName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算招募人',
    dataIndex: 'recruitEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '招募人组织',
    dataIndex: 'recruitDepartmentFullName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算讲师',
    dataIndex: 'lecturerEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '讲师组织',
    dataIndex: 'lecturerDepartmentName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算签约人',
    dataIndex: 'signEmpName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '签约人组织',
    dataIndex: 'signDepartmentFullName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '最后一次反馈人',
    dataIndex: 'submitEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '确认情况',
    dataIndex: 'confirmState',
    customRender: (text) => {
      return text ? text.msg : '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    scopedSlots: { customRender: 'action' },
    fixed: 'right'
  }
]
export const modalColumns = [
  {
    title: '结算运营人',
    dataIndex: 'operatorEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '运营人组织',
    dataIndex: 'operatorDepartmentFullName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算招募人',
    dataIndex: 'recruitEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '招募人组织',
    dataIndex: 'recruitDepartmentFullName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算讲师',
    dataIndex: 'lecturerEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '讲师组织',
    dataIndex: 'lecturerDepartmentName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '结算签约人',
    dataIndex: 'signEmpName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '签约人组织',
    dataIndex: 'signDepartmentFullName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '反馈人',
    dataIndex: 'submitEmployeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '提交时间',
    dataIndex: 'createTime',
    customRender: (text) => {
      return text || '-'
    }
  }
]
