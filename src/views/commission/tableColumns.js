import { amountFormat } from '@/utils/util'
import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
const h = new Vue().$createElement
// export const columnsPerson = [
//   {
//     title: '主播',
//     dataIndex: 'nickName',
//     scopedSlots: { customRender: 'nickName' },
//     width: 200,
//     fixed: 'left'
//   },
//   {
//     title: '主播任务类型',
//     dataIndex: 'totalReward',
//     customRender: (text, row, index) => {
//       return text !== null ? text : '-'
//     }
//   },
//   {
//     title: '任务开始日期',
//     dataIndex: 'retired'
//   },
//   {
//     title: '任务结束日期',
//     dataIndex: 'signMethod'
//   },
//   {
//     title: '本月最高分成比',
//     dataIndex: 'signStartDate'
//   },
//   {
//     title: '主播佣金流水核算金额(元)',
//     dataIndex: 'departmentFullName',
//     customRender: (text) => {
//       return text && `${amountFormat(text, true, 1)}`
//     }
//   },
//   {
//     title: '主播佣金比例',
//     dataIndex: 'operatorEmployeeName'
//   },
//   {
//     title: '主播佣金(元)',
//     dataIndex: 'recruitEmployeeName',
//     customRender: (text) => {
//       return text && `${amountFormat(text, true, 1)}`
//     }
//   },
//   {
//     title: '管理提成流水核算金额(元)',
//     dataIndex: 'lecturerEmployeeName',
//     customRender: (text) => {
//       return text && `${amountFormat(text, true, 1)}`
//     }
//   },
//   {
//     title: '讲师提成',
//     dataIndex: 'signEmpName'
//   },
//   {
//     title: '签约人提成',
//     dataIndex: 'signEmpName'
//   },
//   {
//     title: '招募人提成',
//     dataIndex: 'signEmpName'
//   },
//   {
//     title: '运营提成',
//     dataIndex: 'signEmpName'
//   },
//   {
//     title: '组长提成',
//     dataIndex: 'signEmpName'
//   },
//   {
//     title: '分公司负责人提成',
//     dataIndex: 'signEmpName'
//   },
//   {
//     title: '小计',
//     dataIndex: 'signEmpName'
//   }
// ]

export function columnsPerson(type) {
  return [
    {
      title: '主播',
      dataIndex: 'nickName',
      scopedSlots: { customRender: 'nickName' },
      width: 200,
      fixed: 'left'
    },
    {
      title: '入驻日期',
      dataIndex: 'joinGuildDate'
    },
    {
      title: '是否签约',
      dataIndex: 'isSign',
      customRender: (text, row, index) => {
        return (text === 1 && '签约') || '未签约'
      }
    },
    {
      title: '签约日期',
      dataIndex: 'signDate'
    },
    {
      title: '是否本月黑天鹅',
      dataIndex: 'isBlankswan',
      customRender: (text, row, index) => {
        return (text === 1 && '是') || '否'
      }
    },
    {
      title: '本月最高分成比',
      dataIndex: 'splitRatio'
    },
    {
      title: '主播佣金(元)',
      dataIndex: 'actorCommission',
      customRender: (text) => {
        return text && `${amountFormat(text, true, 1)}`
      }
    },
    {
      title: '讲师提成',
      dataIndex: 'lecturerCommission'
    },
    {
      title: '签约人提成',
      dataIndex: 'signedCommission'
    },
    {
      title: '招募人提成',
      dataIndex: 'recruitCommission'
    },
    {
      title: '运营提成',
      dataIndex: 'operatorCommission'
    },
    {
      title: '组长提成',
      dataIndex: 'groupLeaderCommission',
      hidden: type === 1
    },
    {
      title: '小计',
      dataIndex: 'totalCommission'
    }
  ]
}

export function columnsSquared(type) {
  return [
    {
      title: '主播',
      dataIndex: 'nickName',
      scopedSlots: { customRender: 'nickName' },
      width: 200,
      fixed: 'left'
    },
    {
      title: '是否签约',
      dataIndex: 'isSign',
      customRender: (text, row, index) => {
        return (text === 1 && '签约') || '未签约'
      }
    },
    {
      title: '分成比',
      dataIndex: 'splitRatio'
    },
    {
      title: '主播佣金',
      dataIndex: 'actorCommission'
    },
    {
      title: '第一档过程任务',
      dataIndex: 'oneStageTaskStatus',
      customRender: (text) => {
        return text !== null ? (text === 1 ? '已完成' : '未完成') : '--'
      }
    },
    {
      title: '第二档过程任务',
      dataIndex: 'twoStageTaskStatus',
      customRender: (text) => {
        return text !== null ? (text === 1 ? '已完成' : '未完成') : '--'
      }
    },
    {
      title: '本公会流水(元)',
      dataIndex: 'guildReward',
      customRender: (text) => {
        return text && `${amountFormat(text, true, 1)}`
      }
    },
    {
      title: '非本公会流水(元)',
      dataIndex: 'otherGuildReward',
      customRender: (text) => {
        return text && `${amountFormat(text, true, 1)}`
      }
    },
    {
      title: '厅流水(元)',
      dataIndex: 'manyPeopleVideoTotalFlow',
      customRender: (text) => {
        return text && `${amountFormat(text, true, 1)}`
      }
    },
    {
      title: '讲师提成',
      dataIndex: 'lecturerCommission'
    },
    {
      title: '签约人提成',
      dataIndex: 'signedCommission'
    },
    {
      title: '招募人提成',
      dataIndex: 'recruitCommission'
    },
    {
      title: '运营提成',
      dataIndex: 'operatorCommission'
    },
    {
      title: '组长提成',
      dataIndex: 'groupLeaderCommission',
      hidden: type === 1
    },
    {
      title: '分公司负责人提成',
      dataIndex: 'companyLeaderCommission',
      hidden: type !== 4
    },
    {
      title: '九宫格司负责人提成',
      dataIndex: 'videoPalaceCommission',
      hidden: type !== 4
    },
    {
      title: '总裁提成',
      dataIndex: 'presidentCommission',
      hidden: type !== 4
    },
    {
      title: '小计',
      dataIndex: 'totalCommission'
    }
  ]
}

export function columnsTeam(type) {
  return [
    {
      title: '姓名',
      dataIndex: 'name'
    },
    {
      title: '岗位名称',
      dataIndex: 'isSigned',
      customRender: (text, row, index) => {
        return '-'
      }
    },
    {
      title: '是否转正',
      dataIndex: 'state',
      customRender: (text, row, index) => {
        return text === 2 ? '是' : '否'
      }
    },
    {
      title: '入职日期',
      dataIndex: 'joinTime'
    },
    {
      title: '离职日期',
      dataIndex: 'dimisstionTime'
    },
    {
      title: '讲师提成',
      dataIndex: 'lecturerCommission'
    },
    {
      title: '签约人提成',
      dataIndex: 'signedCommission'
    },
    {
      title: '招募人提成',
      dataIndex: 'recruitCommission'
    },
    {
      title: '运营提成',
      dataIndex: 'operatorCommission'
    },
    {
      title: '组长提成',
      dataIndex: 'groupLeaderCommission',
      hidden: type === 1 || type === 2
    },
    {
      title: '分公司负责人提成',
      dataIndex: 'companyLeaderCommission',
      hidden: type !== 4
    },
    {
      title: '九宫格司负责人提成',
      dataIndex: 'videoPalaceCommission',
      hidden: type !== 4
    },
    {
      title: '总裁提成',
      dataIndex: 'presidentCommission',
      hidden: type !== 4
    },
    {
      title: '提成总计',
      dataIndex: 'totalCommission'
    }
  ]
}

export function innerColumnsTeam(type) {
  const arr = [
    {
      title: '任务',
      dataIndex: 'type',
      customRender: (text, row, index) => {
        return taskType[String(text)]
      }
    },
    {
      title: '讲师提成',
      dataIndex: 'lecturerCommission'
    },
    {
      title: '签约人提成',
      dataIndex: 'signedCommission'
    },
    {
      title: '招募人提成',
      dataIndex: 'recruitCommission'
    },
    {
      title: '运营提成',
      dataIndex: 'operatorCommission'
    },
    {
      title: '组长提成',
      dataIndex: 'groupLeaderCommission',
      hidden: type === 1 || type === 2
    },
    {
      title: '分公司负责人提成',
      dataIndex: 'companyLeaderCommission',
      hidden: type !== 4
    },
    {
      title: '九宫格司负责人提成',
      dataIndex: 'videoPalaceCommission',
      hidden: type !== 4
    },
    {
      title: '总裁提成',
      dataIndex: 'presidentCommission',
      hidden: type !== 4
    },
    {
      title: '提成总计',
      dataIndex: 'totalCommission'
    }
  ]
  return arr.filter((item) => !item.hidden)
}

const taskType = {
  '0': '抖音个播',
  '1': '抖音九宫格',
  '2': '视频号',
  '-1': '总计'
}
export function columnsTotal(type) {
  const arr = [
    {
      title: '任务',
      dataIndex: 'type',
      customRender: (text, row, index) => {
        return taskType[String(text)]
      }
    },
    {
      title: '讲师提成',
      dataIndex: 'lecturerCommission'
    },
    {
      title: '签约人提成',
      dataIndex: 'signedCommission'
    },
    {
      title: '招募人提成',
      dataIndex: 'recruitCommission'
    },
    {
      title: '运营提成',
      dataIndex: 'operatorCommission',
      hidden: type === 2
    },
    {
      title: '组长提成',
      dataIndex: 'groupLeaderCommission',
      hidden: type === 1
    },
    {
      title: '分公司负责人提成',
      dataIndex: 'companyLeaderCommission',
      hidden: type !== 3
    }
  ]
  return arr.filter((item) => !item.hidden)
}
export function columnsModal(type) {
  return [
    {
      title: '主播',
      dataIndex: 'nickName',
      scopedSlots: { customRender: 'nickName' },
      width: 200,
      fixed: 'left'
    },
    {
      title: '主播任务类型',
      dataIndex: 'taskType',
      width: 120
    },
    {
      title: '任务开始日期',
      dataIndex: 'taskStartDate',
      width: 120
    },
    {
      title: '任务结束日期',
      dataIndex: 'taskEndDate',
      width: 120
    },
    {
      title: '本月最高分成比',
      dataIndex: 'splitRatio',
      width: 120
    },
    {
      title: (
        <div>
          <p style="margin:0">主播佣金流</p>
          <p style="margin:0">水核算金额</p>
        </div>
      ),
      dataIndex: 'actorFlow',
      customRender: (text) => {
        return text && `${amountFormat(text, true, 1)}`
      },
      width: 120
    },
    {
      title: '主播佣金比例',
      dataIndex: 'actorCommissionRatio',
      customRender: (text) => {
        return text !== null ? (text * 100).toFixed(2) + '%' : '--'
      },
      width: 120
    },
    {
      title: '主播佣金(元)',
      dataIndex: 'actorCommission',
      customRender: (text) => {
        return text && `${amountFormat(text, true, 1)}`
      },
      width: 120
    },
    {
      title: (
        <div>
          <p style="margin:0">管理提成流</p>
          <p style="margin:0">水核算金额</p>
        </div>
      ),
      dataIndex: 'managementRevenueFlow',
      customRender: (text) => {
        return text && `${amountFormat(text, true, 1)}`
      },
      width: 120
    },
    {
      title: '讲师提成',
      dataIndex: 'lecturerName',
      customRender: (text, row) => {
        return `${row.lecturerName || '--'}/${
          row.lecturerCommissionRatio
            ? (row.lecturerCommissionRatio * 100).toFixed(2) + '%'
            : '--'
        }/${
          row.lecturerCommission !== null
            ? amountFormat(row.lecturerCommission, true, 1)
            : '--'
        }`
      },
      width: 120
    },
    {
      title: '签约人提成',
      dataIndex: 'signName',
      customRender: (text, row) => {
        return `${row.signName || '--'}/${
          row.signedCommissionRatio
            ? (row.signedCommissionRatio * 100).toFixed(2) + '%'
            : '--'
        }/${
          row.signedCommission !== null
            ? amountFormat(row.signedCommission, true, 1)
            : '--'
        }`
      },
      width: 120
    },
    {
      title: '招募人提成',
      dataIndex: 'recruitName',
      customRender: (text, row) => {
        return `${row.recruitName || '--'}/${
          row.recruitCommissionRatio
            ? (row.recruitCommissionRatio * 100).toFixed(2) + '%'
            : '--'
        }/${
          row.recruitCommission !== null
            ? amountFormat(row.recruitCommission, true, 1)
            : '--'
        }`
      },
      width: 120
    },
    {
      title: '运营提成',
      dataIndex: 'operatorName',
      customRender: (text, row) => {
        return `${row.operatorName || '--'}/${
          row.operatorCommissionRatio
            ? (row.operatorCommissionRatio * 100).toFixed(2) + '%'
            : '--'
        }/${
          row.operatorCommission !== null
            ? amountFormat(row.operatorCommission, true, 1)
            : '--'
        }`
      },
      width: 120
    },
    {
      title: '组长提成',
      dataIndex: 'groupLeaderName',
      customRender: (text, row) => {
        return `${row.groupLeaderName || '--'}/${
          row.groupLeaderCommissionRatio
            ? (row.groupLeaderCommissionRatio * 100).toFixed(2) + '%'
            : '--'
        }/${
          row.groupLeaderCommission !== null
            ? amountFormat(row.groupLeaderCommission, true, 1)
            : '--'
        }`
      },
      width: 120
    }
  ]
}
