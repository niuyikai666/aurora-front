import { amountFormat } from '@/utils/util'
import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
const h = new Vue().$createElement

// 进行中
export function columnsNormal(sortedInfo) {
  const columns = [
    {
      title: '主播信息',
      dataIndex: 'name',
      scopedSlots: { customRender: 'name' },
      fixed: 'left'
      // width: 240
    },
    {
      title: '入驻日期',
      dataIndex: 'joinGuildDate'
    },
    {
      title: '开始时间',
      dataIndex: 'phaseDate',
      sorter: true,
      sortOrder:
        sortedInfo && sortedInfo.sortField === 'phaseDate'
          ? sortedInfo.sortOrder
          : ''
    },
    {
      title: '当前周期',
      dataIndex: 'phase',
      customRender: (text, row, index) => {
        return `${text ? text.msg : ''}/${
          row.currentDayCount === null ? '-' : row.currentDayCount
        }天`
      }
    },
    {
      title: '有效天',
      dataIndex: 'effectLiveDay',
      sorter: true,
      sortOrder:
        sortedInfo && sortedInfo.sortField === 'effectLiveDay'
          ? sortedInfo.sortOrder
          : '',
      customRender: (text, row, index) => {
        return `${text}天`
      }
    },
    {
      title: '有效时长',
      dataIndex: 'liveDuration',
      sorter: true,
      sortOrder:
        sortedInfo && sortedInfo.sortField === 'liveDuration'
          ? sortedInfo.sortOrder
          : '',
      customRender: (text, row, index) => {
        return `${text}小时`
      }
    },
    {
      title: '流水(元)',
      dataIndex: 'reward',
      sorter: true,
      sortOrder:
        sortedInfo && sortedInfo.sortField === 'reward'
          ? sortedInfo.sortOrder
          : '',
      scopedSlots: { customRender: 'reward' }
      // customRender: (text, row, index) => {
      //   return `${amountFormat(text, true, 1)}元`
      // }
    },
    {
      title: '还差天数/时长/完成下一档金额', // 已结束 不需要
      dataIndex: 'needFinish',
      scopedSlots: { customRender: 'needFinish' },
      width: 300
    },
    {
      title: '周期结束日期',
      dataIndex: 'phaseEndDate'
    },
    {
      title: '是否作弊', // 进行中不需要
      dataIndex: 'isCheating',
      customRender: (text, row, index) => {
        return text ? '是' : '否'
      }
    },
    // {
    //   title: '本周期是否可完成', // 已结束 不需要
    //   dataIndex: 'predictComplete',
    //   customRender: (text, row, index) => {
    //     return text && text.msg || '--'
    //   },
    //   width: 150
    // },
    {
      title: '完成情况',
      dataIndex: 'level',
      customRender: (text, row, index) => {
        return (text && text.msg) || '--'
      }
    },
    {
      title: '签约状态',
      dataIndex: 'signMethod',
      customRender: (text, row, index) => {
        return text !== null ? text.msg : '--'
      }
    },
    {
      title: '周期最高分成比',
      dataIndex: 'maxSplitRatio',
      customRender: (text, row, index) => {
        return text !== null ? text + '%' : '--'
      }
    },
    {
      dataIndex: 'actorStatis',
      customRender: (text, row, index) => {
        return text && `${amountFormat(text, true, 1)}`
      },
      slots: {
        title: 'actorStatis',
        name: '主播佣金(元)',
        desc: (
          <div>
            <div domPropsInnerHTML="1、周期内分成比例大于45%的主播，不计算佣金"></div>
            <div domPropsInnerHTML="2、主播签约状态是全约或网签，且完成了第三档的，佣金为周期内流水的5%"></div>
            <div domPropsInnerHTML="3、高于周期上限的那部分流水，不计算佣金"></div>
            <div domPropsInnerHTML="4、周期内作弊申诉失败的，对应周期不计算佣金填充"></div>
          </div>
        )
      },
      width: 150
    },
    {
      title: '讲师/提成比例',
      dataIndex: 'lectureNameCustom',
      scopedSlots: { customRender: 'lectureNameCustom' }
    },
    {
      title: '签约人/提成比例',
      dataIndex: 'signedNameCustom',
      scopedSlots: { customRender: 'signedNameCustom' }
    },
    {
      title: '招募/提成比例',
      dataIndex: 'recruitNameCustom',
      scopedSlots: { customRender: 'recruitNameCustom' }
    },
    {
      title: '运营/提成比例',
      dataIndex: 'operatorNameCustom',
      scopedSlots: { customRender: 'operatorNameCustom' }
    },
    {
      title: '组长/提成比例',
      dataIndex: 'groupNameCustom',
      isOperate: false,
      scopedSlots: { customRender: 'groupNameCustom' }
    }
    // {
    //   title: '主播佣金发放比例',
    //   dataIndex: 'actorPercent',
    //   customRender: (text, row, index) => {
    //     // return text && text + '%' || '--'
    //     return '--'
    //   },
    //   width: 160
    // },
    // {
    //   title: '结算年月', // 进行中 不需要
    //   dataIndex: 'statisYearMonth',
    //   width: 160
    // }
  ]

  return columns
}

// 未开始
export const columnsNotStart = [
  {
    title: '主播信息',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '入驻日期',
    dataIndex: 'joinGuildDate'
  },
  {
    title: '招募',
    dataIndex: 'recruitName'
  },
  {
    title: '运营',
    dataIndex: 'operatorName',
    width: 140
  }
]

// 作弊主播
export function columnsCheat(sortedInfo) {
  const columnsCheat = [
    {
      title: '主播信息',
      dataIndex: 'name',
      scopedSlots: { customRender: 'name' },
      fixed: 'left',
      width: 220
    },
    {
      title: '入驻日期',
      dataIndex: 'joinGuildDate',
      width: 120
    },
    {
      title: '命中日期',
      dataIndex: 'cheatingDate',
      sorter: true,
      sortOrder:
        sortedInfo && sortedInfo.sortField === 'cheatingDate'
          ? sortedInfo.sortOrder
          : '',
      width: 120
    },
    {
      title: '作弊判定时间',
      dataIndex: 'cheatingJudgeDate',
      width: 120
    },
    {
      title: '本月直播流水',
      dataIndex: 'liveReward',
      sorter: true,
      sortOrder:
        sortedInfo && sortedInfo.sortField === 'liveReward'
          ? sortedInfo.sortOrder
          : '',
      customRender: (text, row, index) => {
        return text !== null ? `${amountFormat(text, true, 1)}元` : '--'
      },
      width: 180
    },
    {
      title: '基线任务流水',
      dataIndex: 'baseRewardMonth',
      customRender: (text, row, index) => {
        return text !== null ? `${amountFormat(text, true, 1)}元` : '--'
      },
      width: 180
    },
    {
      title: '申诉情况',
      customRender: (text, row, index) => {
        return text ? text.msg : '--'
      },
      dataIndex: 'appealState',
      width: 180
    }
  ]

  return columnsCheat
}

// 拉新任务结束
export const endedColunms = [
  {
    title: '主播信息',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '入驻日期',
    dataIndex: 'joinGuildDate'
  },
  {
    title: '拉新开始日期',
    dataIndex: 'phaseDate'
  },
  {
    title: '拉新结束日期',
    dataIndex: 'phaseEndDate'
  }
]

export const finishedChildColunm = [
  {
    title: '当前周期',
    dataIndex: 'phase',
    customRender: (text, row, index) => {
      return `${text ? text.msg : ''}/${
        row.currentDayCount === null ? '-' : row.currentDayCount
      }天`
    },
    width: 150
  },
  {
    title: '周期开始日期',
    dataIndex: 'phaseDate',
    width: 150
  },
  {
    title: '周期结束日期',
    dataIndex: 'phaseEndDate',
    width: 150
  },
  {
    title: '有效天',
    dataIndex: 'effectLiveDay',
    customRender: (text, row, index) => {
      return `${text}天`
    },
    width: 180
  },
  {
    title: '时长',
    dataIndex: 'liveDuration',
    customRender: (text, row, index) => {
      return `${text}小时`
    },
    width: 180
  },
  {
    title: '流水(元)',
    dataIndex: 'reward',
    scopedSlots: { customRender: 'reward' },
    // customRender: (text, row, index) => {
    //   return `${amountFormat(text, true, 1)}元`
    // },
    width: 180
  },
  {
    title: '签约人/提成比例',
    dataIndex: 'signedNameCustom',
    scopedSlots: { customRender: 'signedNameCustom' },
    customRender: (text, row, index) => {
      return `${row.signedName || '--'}/${(row.signedPercent &&
        amountFormat(row.signedPercent, true, 3) + '%') ||
        '--'}`
    },
    width: 140
  },
  {
    title: '招募/提成比例',
    dataIndex: 'recruitNameCustom',
    scopedSlots: { customRender: 'recruitNameCustom' },
    customRender: (text, row, index) => {
      return `${row.recruitName || '--'}/${(row.recruitPercent &&
        amountFormat(row.recruitPercent, true, 3) + '%') ||
        '--'}`
    },
    width: 140
  },
  {
    title: '运营/提成比例',
    dataIndex: 'operatorNameCustom',
    scopedSlots: { customRender: 'operatorNameCustom' },
    customRender: (text, row, index) => {
      return `${row.operatorName || '--'}/${(row.operatorPercent &&
        amountFormat(row.operatorPercent, true, 3) + '%') ||
        '--'}`
    },
    width: 140
  },
  {
    title: '组长/提成比例',
    dataIndex: 'groupNameCustom',
    customRender: (text, row, index) => {
      return `${row.departmentManagerName ||
        '--'}/${(row.deparmentManagerPercent &&
        amountFormat(row.deparmentManagerPercent, true, 3) + '%') ||
        '--'}`
    },
    width: 140
  },
  {
    title: '是否作弊', // 进行中不需要
    dataIndex: 'isCheating',
    customRender: (text, row, index) => {
      return text ? '是' : '否'
    },
    width: 140
  },
  {
    title: '签约状态',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text !== null ? text.msg : '--'
    },
    width: 140
  },
  {
    title: '周期最高分成比',
    dataIndex: 'maxSplitRatio',
    customRender: (text, row, index) => {
      return text !== null ? text + '%' : '--'
    },
    width: 140
  },
  {
    title: (
      <div>
        <span>主播佣金(元)</span>
        <a-tooltip placement="top">
          <div slot="title">
            <div domPropsInnerHTML="1、周期内分成比例大于45%的主播，不计算佣金"></div>
            <div domPropsInnerHTML="2、主播签约状态是全约或网签，且完成了第三档的，佣金为周期内流水的5%"></div>
            <div domPropsInnerHTML="3、高于周期上限的那部分流水，不计算佣金"></div>
            <div domPropsInnerHTML="4、周期内作弊申诉失败的，对应周期不计算佣金填充"></div>
          </div>
          <a-icon type="question-circle" style="margin-left:5px" />
        </a-tooltip>
      </div>
    ),
    dataIndex: 'actorStatis',
    customRender: (text, row, index) => {
      return text && `${amountFormat(text, true, 1)}`
    },
    width: 140
  },
  {
    title: '讲师/提成比例',
    dataIndex: 'lectureNameCustom',
    scopedSlots: { customRender: 'lectureNameCustom' },
    width: 140
  }
]

export const rewardColumns = [
  {
    title: '分公司',
    dataIndex: 'companyName'
  },
  {
    title: '小组',
    dataIndex: 'departmentName'
  },
  {
    title: '姓名',
    dataIndex: 'employeeName'
  },
  {
    title: '岗位',
    dataIndex: 'duty'
  },
  {
    title: '讲师拉新提成',
    dataIndex: 'lectureStatis',
    customRender: (text, row, index) => {
      return text && text !== null ? `${amountFormat(text, true, 1)}元` : '--'
    }
  },
  {
    title: '签约人拉新提成',
    dataIndex: 'signedStatis',
    customRender: (text, row, index) => {
      return `${amountFormat(text, true, 1)}元`
    }
  },
  {
    title: '招募拉新提成',
    dataIndex: 'recruitStatis',
    customRender: (text, row, index) => {
      return text === null ? '--' : `${amountFormat(text, true, 1)}元`
    }
  },
  {
    title: '运营拉新提成',
    dataIndex: 'operatorStatis',
    customRender: (text, row, index) => {
      return text === null ? '--' : `${amountFormat(text, true, 1)}元`
    }
  },
  {
    title: '组长拉新提成',
    dataIndex: 'departmentManagerStatis',
    customRender: (text, row, index) => {
      return text === null ? '--' : `${amountFormat(text, true, 1)}元`
    }
  },
  {
    title: '总计',
    dataIndex: 'totalStatis',
    customRender: (text, row, index) => {
      return text === null ? '--' : `${amountFormat(text, true, 1)}元`
    }
  }
]

export const rewardAccountColumns = [
  {
    title: '主播昵称',
    dataIndex: 'nickname'
  },
  {
    title: '抖音号原',
    dataIndex: 'tiktokCodeOrig'
  },
  {
    title: '运营人姓名',
    dataIndex: 'operatorName'
  },
  {
    title: '所属分公司',
    dataIndex: 'companyName'
  },
  {
    title: '负责人姓名',
    dataIndex: 'companyManagerName'
  },
  {
    title: '负责人核算流水(元)',
    dataIndex: 'directorCheckStatis',
    customRender: (text, row, index) => {
      return text === null ? '--' : `${amountFormat(text, true, 1)}`
    }
  }
]
