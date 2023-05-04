import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
const h = new Vue().$createElement
export const applyColumns = [
  {
    title: '主播信息',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    fixed: 'left',
    scopedSlots: { customRender: 'nickName' },
    width: 220
  },
  {
    title: '原公司负责人',
    dataIndex: 'managerEmpNameOrg'
  },
  {
    title: '原运营人',
    dataIndex: 'operatorEmpNameOrg',
    customRender: (text, row, index) => {
      console.log(row.orgOperationFullName)
      return (
        <a-tooltip
          placement="top"
          title={row.orgOperationFullName}
          arrow-point-at-center
        >
          <span>{text}</span>
        </a-tooltip>
      )
    }
  },
  {
    title: '激活发起时间',
    dataIndex: 'sponsorTime'
  },
  {
    title: '发起30天内直播有效天',
    dataIndex: 'thirtyEffectiveDay'
  },
  {
    dataIndex: 'state',
    customRender: (text, row, index) => {
      return text.msg
    },
    slots: {
      title: 'state',
      name: '当前状态',
      desc: (
        <div>
          <div domPropsInnerHTML="激活中：成功创建激活，等待创建后30天内主播有效直播10天；"></div>
          <div domPropsInnerHTML="待负责人审核：主播有效直播满10天，激活成功，等待原负责人审核，14天有效期，超时自动通过；"></div>
          <div domPropsInnerHTML="激活失败：激活创建30天内，主播未达到10天的有效直播；"></div>
          <div domPropsInnerHTML="原负责人驳回：原负责人驳回主播激活申请"></div>
          <div domPropsInnerHTML="仲裁申请中：申请人提交仲裁，等待仲裁人处理，14天有效期，超时自动驳回"></div>
          <div domPropsInnerHTML="激活申请驳回：仲裁人驳回激活申请"></div>
        </div>
      )
    }
  },
  {
    title: '激活通过后运营人',
    dataIndex: 'operatorEmpName',
    customRender: (text, row, index) => {
      console.log(row.orgOperationFullName)
      return (
        <a-tooltip
          placement="top"
          title={row.afterOperationFullName}
          arrow-point-at-center
        >
          <span>{text}</span>
        </a-tooltip>
      )
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export const receiveColumns = [
  {
    title: '主播信息',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    fixed: 'left',
    scopedSlots: { customRender: 'nickName' },
    width: 220
  },
  {
    title: '是否签约',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      if (text.code === 1 || text.code === 2) {
        return `${text.msg}/${row.signName || '-'}`
      } else {
        return text ? text.msg : ''
      }
    }
  },
  {
    title: '激活前断播天数',
    dataIndex: 'breakLiveDays'
  },
  {
    title: '原公司负责人',
    dataIndex: 'managerEmpNameOrg'
  },
  {
    title: '原运营人',
    dataIndex: 'operatorEmpNameOrg',
    customRender: (text, row, index) => {
      console.log(row.orgOperationFullName)
      return (
        <a-tooltip
          placement="top"
          title={row.orgOperationFullName}
          arrow-point-at-center
        >
          <span>{text}</span>
        </a-tooltip>
      )
    }
  },
  {
    title: '激活发起时间',
    dataIndex: 'sponsorTime'
  },
  {
    title: '发起30天内直播有效天',
    dataIndex: 'thirtyEffectiveDay'
  },
  {
    dataIndex: 'state',
    customRender: (text, row, index) => {
      return text.msg
    },
    slots: {
      title: 'state',
      name: '当前状态',
      desc: (
        <div>
          <div domPropsInnerHTML="激活中：成功创建激活，等待创建后30天内主播有效直播10天；"></div>
          <div domPropsInnerHTML="待负责人审核：主播有效直播满10天，激活成功，等待原负责人审核，14天有效期，超时自动通过；"></div>
          <div domPropsInnerHTML="激活失败：激活创建30天内，主播未达到10天的有效直播；"></div>
          <div domPropsInnerHTML="原负责人驳回：原负责人驳回主播激活申请"></div>
          <div domPropsInnerHTML="仲裁申请中：申请人提交仲裁，等待仲裁人处理，14天有效期，超时自动驳回"></div>
          <div domPropsInnerHTML="激活申请驳回：仲裁人驳回激活申请"></div>
        </div>
      )
    }
  },
  {
    title: '激活通过后运营人',
    dataIndex: 'operatorEmpName',
    customRender: (text, row, index) => {
      console.log(row.orgOperationFullName)
      return (
        <a-tooltip
          placement="top"
          title={row.afterOperationFullName}
          arrow-point-at-center
        >
          <span>{text}</span>
        </a-tooltip>
      )
    }
  },
  {
    title: '激活发起人',
    dataIndex: 'sponsorEmpName'
  },
  {
    title: '激活发起组织',
    dataIndex: 'sponsorFullName'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
export const activedColumns = [
  {
    title: '主播信息',
    dataIndex: 'nickName', // tikTokCode tikTokCodeOrig volcanoCode volcanoCodeOrig
    fixed: 'left',
    scopedSlots: { customRender: 'nickName' },
    width: 220
  },
  {
    title: '是否签约',
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      if (text.code === 1 || text.code === 2) {
        return `${text.msg}/${row.signName || '-'}`
      } else {
        return text ? text.msg : ''
      }
    }
  },
  {
    title: '激活前断播天数',
    dataIndex: 'breakLiveDays'
  },
  {
    title: '原公司负责人',
    dataIndex: 'managerEmpNameOrg'
  },
  {
    title: '原运营人',
    dataIndex: 'operatorEmpNameOrg',
    customRender: (text, row, index) => {
      console.log(row.orgOperationFullName)
      return (
        <a-tooltip
          placement="top"
          title={row.orgOperationFullName}
          arrow-point-at-center
        >
          <span>{text}</span>
        </a-tooltip>
      )
    }
  },
  {
    title: '激活发起时间',
    dataIndex: 'sponsorTime'
  },
  {
    title: '发起30天内直播有效天',
    dataIndex: 'thirtyEffectiveDay'
  },
  {
    dataIndex: 'state',
    customRender: (text, row, index) => {
      return text.msg
    },
    slots: {
      title: 'state',
      name: '当前状态',
      desc: (
        <div>
          <div domPropsInnerHTML="激活中：成功创建激活，等待创建后30天内主播有效直播10天；"></div>
          <div domPropsInnerHTML="待负责人审核：主播有效直播满10天，激活成功，等待原负责人审核，14天有效期，超时自动通过；"></div>
          <div domPropsInnerHTML="激活失败：激活创建30天内，主播未达到10天的有效直播；"></div>
          <div domPropsInnerHTML="原负责人驳回：原负责人驳回主播激活申请"></div>
          <div domPropsInnerHTML="仲裁申请中：申请人提交仲裁，等待仲裁人处理，14天有效期，超时自动驳回"></div>
          <div domPropsInnerHTML="激活申请驳回：仲裁人驳回激活申请"></div>
        </div>
      )
    }
  },
  {
    title: '激活通过后运营人',
    dataIndex: 'operatorEmpName',
    customRender: (text, row, index) => {
      console.log(row.orgOperationFullName)
      return (
        <a-tooltip
          placement="top"
          title={row.afterOperationFullName}
          arrow-point-at-center
        >
          <span>{text}</span>
        </a-tooltip>
      )
    }
  },
  {
    title: '激活发起人',
    dataIndex: 'sponsorEmpName'
  },
  {
    title: '激活发起组织',
    dataIndex: 'sponsorFullName'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]
