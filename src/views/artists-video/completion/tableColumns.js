// import { numberFormat, amountFormat } from '@/utils/util'
export const adminColumns = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    scopedSlots: { customRender: 'nickName' },
    width: '16.66%'
  },
  {
    title: '运营',
    dataIndex: 'operatorEmpName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '运营所属组织',
    dataIndex: 'operatorDepFullName',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '入会时间',
    dataIndex: 'joinGuildDate',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' }
  }
]
export const recordColunms = [
  {
    title: '主播',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    scopedSlots: { customRender: 'nickName' },
    width: '16.66%'
  },
  {
    title: '修改关系类型',
    dataIndex: 'operationRelationType',
    customRender: (text, row, index) => {
      return text ? text.msg : '-'
    }
  },
  {
    title: '修改前绑定人姓名',
    dataIndex: 'beforeOperationInfo',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '修改后绑定人',
    dataIndex: 'afterOperationInfo',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '修改提交人',
    dataIndex: 'modifierName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '修改提交时间',
    dataIndex: 'modifyTime',
    customRender: (text) => {
      return text || '-'
    }
  }
]
