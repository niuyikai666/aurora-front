import { numberFormat, amountFormat } from '@/utils/util'
export const videoColumns = [
  {
    title: '主播',
    dataIndex: 'nickname', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    scopedSlots: { customRender: 'nickname' },
    width: '16.66%'
  },
  {
    title: '粉丝总数',
    dataIndex: 'fansNumber',
    sorter: true,
    customRender: (text, row, index) => {
      return text && amountFormat(text, false, 0) || '-'
    },
    width: '16.66%'
  },
  {
    title: '近一年流水',
    dataIndex: 'totalFlowYearly',
    sorter: true,
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    width: '16.66%'
  },
  {
    title: '近三个月平均直播流水',
    dataIndex: 'avgFlowQuarter',
    customRender: (text, row, index) => {
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    width: '16.66%',
    sorter: true
  },
  {
    title: '合同开始日期',
    dataIndex: 'contractStartDate',
    width: '16.66%'
  },
  {
    title: '合同结束日期',
    dataIndex: 'contractEndDate',
    width: '16.66%'
  }
]
