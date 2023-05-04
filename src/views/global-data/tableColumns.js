import Vue from 'vue'
import { amountFormatFunc } from '@/utils/util'
// eslint-disable-next-line no-unused-vars
const h = new Vue().$createElement
const platformMap = {
  0: '抖音主播',
  1: '视频号主播'
}
const muchType = {
  0: '抖音主播',
  1: '视频号九宫格主持人',
  2: '视频号主播'
}
export const zeroColumns = [
  {
    title: '平台',
    dataIndex: 'platform',
    customRender: (text, row, index) => {
      return text !== null ? platformMap[text] || '-' : '-'
    },
    fixed: 'left'
  },
  {
    title: '主播ID',
    dataIndex: 'tiktokLiveInfoId',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '进入核心年月',
    dataIndex: 'monthCycle',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
export const muchColumns = [
  {
    title: '平台',
    dataIndex: 'platform',
    customRender: (text, row, index) => {
      return text !== null ? platformMap[text] || '-' : '-'
    },
    fixed: 'left'
  },
  {
    title: '主播ID',
    dataIndex: 'tiktokLiveInfoId',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '刷量主播类型',
    dataIndex: 'type',
    customRender: (text, row, index) => {
      return text !== null ? muchType[text] || '-' : '-'
    }
  },
  {
    title: '刷量金额',
    dataIndex: 'shamFlow',
    customRender: (text) => {
      return text ? amountFormatFunc(text) : '-'
    }
  },
  {
    title: '刷量日期',
    dataIndex: 'dateTime',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  }
]
export const bettingColumns = [
  {
    title: '平台',
    dataIndex: 'platform',
    customRender: (text, row, index) => {
      return text !== null ? platformMap[text] || '-' : '-'
    },
    width: 150,
    fixed: 'left'
  },
  {
    title: '主播ID',
    dataIndex: 'tiktokLiveInfoId',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '主播昵称',
    dataIndex: 'nickName',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '是否计算主播佣金',
    dataIndex: 'actorIsHaveCommission',
    customRender: (text, row, index) => {
      return text !== null ? (text ? '是' : '否') : '-'
    }
  },
  {
    title: '管理提成发放比例',
    dataIndex: 'adminCommissionRatio',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '开始年月',
    dataIndex: 'startDateMonthCycle',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '结束年月',
    dataIndex: 'endDateMonthCycle',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]
