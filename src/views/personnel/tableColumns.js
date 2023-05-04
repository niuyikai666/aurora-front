import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
const h = new Vue().$createElement
export const columns = [
  {
    title: '员工姓名',
    dataIndex: 'name',
    fixed: 'left',
    width: 100
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '工号',
    dataIndex: 'employeeNo',
    customRender: (text, row, index) => {
      return text || '-'
    }
  },
  {
    title: '所属组织',
    dataIndex: 'department',
    width: '150px',
    scopedSlots: { customRender: 'department' }
  },
  {
    title: '职能',
    dataIndex: 'dutyType',
    scopedSlots: { customRender: 'dutyType' }
  },
  {
    title: '在职状态',
    dataIndex: 'state',
    scopedSlots: { customRender: 'state' }
  },
  {
    title: 'ehr在职状态',
    dataIndex: 'ehrEmployeeStatus',
    customRender: (text, row, index) => {
      return text ? text.msg : '-'
    }
  },
  {
    title: (
      <div>
        <p style="margin:0">培训平台</p>
        <p style="margin:0">账号状态</p>
      </div>
    ),
    dataIndex: 'coolcollegeStatus',
    scopedSlots: { customRender: 'coolcollegeStatus' }
  },
  {
    title: '是否为负责人',
    dataIndex: 'isDepartmentManger',
    customRender: (text, row, index) => {
      return row.isDepartmentManger ? '是' : '否'
    }
  },
  {
    title: '角色',
    dataIndex: 'role',
    scopedSlots: { customRender: 'role' }
  },
  {
    title: '加入时间',
    dataIndex: 'joinTime',
    customRender: (text, row, index) => {
      return row.joinTime ? text : '-'
    }
  },
  {
    title: '转正时间',
    dataIndex: 'ehrRegularizationDate',
    customRender: (text, row, index) => {
      return row.ehrRegularizationDate ? text : '-'
    }
  },
  {
    title: '操作离职时间',
    dataIndex: 'dimisstionTime',
    customRender: (text, row, index) => {
      return row.dimisstionTime ? text : '-'
    }
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
    customRender: (text, row, index) => {
      return row.modifyTime ? text : '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    fixed: 'right',
    width: 120
  }
]
export const videoAdminColumns = [
  {
    title: '主播管理员微信号',
    dataIndex: 'wechat',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '绑定状态',
    dataIndex: 'bindState',
    customRender: (text) => {
      return text !== null ? (text ? '已绑定' : '未绑定') : '-'
    }
  },
  {
    title: '绑定运营姓名',
    dataIndex: 'employeeName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '员工所属组织',
    dataIndex: 'departmentFullName',
    customRender: (text) => {
      return text || '-'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 120
  }
]
