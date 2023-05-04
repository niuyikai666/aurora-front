import { amountFormat } from '@/utils/util'
export const columns = [
  {
    title: '排名',
    dataIndex: 'ranking',
    fixed: 'left',
    width: 80
  },
  {
    title: '分公司',
    dataIndex: 'companyName',
    width: 120
  },
  {
    title: '小组名',
    dataIndex: 'groupName',
    width: 120
  },
  {
    title: '本月老主播流水(元)',
    dataIndex: 'oldAnchorTotalIncome',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    },
    width: 170
  },
  {
    title: '流水0.1%档目标(元)',
    dataIndex: 'levelOneIncomeTarget',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text)}`
    },
    width: 170
  },
  {
    title: '0.1档完成进度',
    // slots: { title: 'customName1' },
    dataIndex: 'levelOneIncomeTargetPlannedSpeed',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text * 100)}%`
    },
    width: 150
  },
  {
    title: '流水0.2%档目标(元)',
    dataIndex: 'levelTwoIncomeTarget',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text)}`
    },
    width: 170
  },
  {
    title: '0.2档完成进度',
    // slots: { title: 'customName2' },
    dataIndex: 'levelTwoIncomeTargetPlannedSpeed',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text * 100)}%`
    },
    width: 150
  },
  {
    title: '本月五万主播数(人)',
    dataIndex: 'fiftyThousandAnchorCount',
    customRender: (text, row, index) => {
      return text && amountFormat(text, false)
    },
    width: 140
  },
  {
    title: '五万主播数目标(人)',
    dataIndex: 'fiftyThousandAnchorTarget',
    customRender: (text, row, index) => {
      return text && amountFormat(text, false)
    },
    width: 140
  },
  {
    title: '小组道具流水占比',
    dataIndex: 'propRewardProportion',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text * 100)}%`
    },
    width: 140
  },
  {
    title: '组长提成',
    dataIndex: 'groupLeaderCommission',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text * 100, true, 3)}%`
    },
    width: 120
  }
]
