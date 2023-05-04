import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
const h = new Vue().$createElement
export const activedColunms = [
  {
    title: '主播信息',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    width: 200,
    fixed: 'left'
  },
  {
    title: '所属平台',
    dataIndex: 'platform',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '培训平台ID',
    dataIndex: 'collcollegeId',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    dataIndex: 'type',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    slots: {
      title: 'type',
      name: '主播类型',
      desc: (
        <div>
          <div domPropsInnerHTML="新主播：入会60天内的主播;"></div>
          <div domPropsInnerHTML="老主播-稳定：入会超过60天，且近30天内有效天≥10天;"></div>
          <div domPropsInnerHTML="老主播-不稳定：入会超过60天，且近30天内有效天<10天;"></div>
        </div>
      )
    }
  },
  {
    title: '登录手机号',
    dataIndex: 'activePhone',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '激活成功时间',
    dataIndex: 'activeTime',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '账号到期时间',
    dataIndex: 'expireTime',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '最近一次直播时间',
    dataIndex: 'lastLiveTime',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 120,
    fixed: 'right'
  }
]
export const activingColunms = [
  {
    title: '主播信息',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    width: 200,
    fixed: 'left'
  },
  {
    title: '所属平台',
    dataIndex: 'platform',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    dataIndex: 'type',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    slots: {
      title: 'type',
      name: '主播类型',
      desc: (
        <div>
          <div domPropsInnerHTML="新主播：入会60天内的主播;"></div>
          <div domPropsInnerHTML="老主播-稳定：入会超过60天，且近30天内有效天≥10天;"></div>
          <div domPropsInnerHTML="老主播-不稳定：入会超过60天，且近30天内有效天<10天;"></div>
        </div>
      )
    }
  },
  {
    title: '入会时间',
    dataIndex: 'joinGuildDate',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '累计有效天',
    dataIndex: 'effectDays',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '最近一次直播时间',
    dataIndex: 'lastLiveTime',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    dataIndex: 'phone',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    slots: {
      title: 'phone',
      name: '金数据手机号',
      desc: (
        <div>
          <div domPropsInnerHTML="金数据手机号将成为登录账号，如需修改请修改主播金数据;"></div>
        </div>
      )
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 120,
    fixed: 'right'
  }
]
export const activingModalColunms = [
  {
    title: '时间',
    dataIndex: 'datetime',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'content',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '操作人',
    dataIndex: 'operator',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  }
]
export const outTimeColunms = [
  {
    title: '主播信息',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' },
    width: 200,
    fixed: 'left'
  },
  {
    title: '所属平台',
    dataIndex: 'platform',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    dataIndex: 'type',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    slots: {
      title: 'type',
      name: '主播类型',
      desc: (
        <div>
          <div domPropsInnerHTML="新主播：入会60天内的主播;"></div>
          <div domPropsInnerHTML="老主播-稳定：入会超过60天，且近30天内有效天≥10天;"></div>
          <div domPropsInnerHTML="老主播-不稳定：入会超过60天，且近30天内有效天<10天;"></div>
        </div>
      )
    }
  },
  {
    title: '在会状态',
    dataIndex: 'isQuit',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '入会时间',
    dataIndex: 'joinGuildDate',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '最后一次直播时间',
    dataIndex: 'lastLiveTime',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '失效原因',
    dataIndex: 'invalidReason',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '培训账号状态',
    dataIndex: 'nextStatus',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    dataIndex: 'activePhone',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    slots: {
      title: 'activePhone',
      name: '金数据手机号',
      desc: (
        <div>
          <div domPropsInnerHTML="已冻结的登录手机号与冻结前一致，登录后可见历史学习记录；"></div>
          <div domPropsInnerHTML="已删除的登录手机号使用激活时刻的金数据手机号，登录后无历史记录；"></div>
        </div>
      )
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 120,
    fixed: 'right'
  }
]
