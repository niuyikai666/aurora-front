<template>
  <div class="table-content">
    <a-card
      :bordered="false">
      <!-- <div slot="extra">
        <div class="btn-group">
          <a-button type="primary" icon="user-add" class="custom" @click="addStrucHandle" v-if="permission.includes('peopleManagement_group_create') && departmentType !== 4">新增组织架构</a-button>
        </div>
      </div> -->
      <s-table
        ref="table"
        row-key="id"
        :columns="columns"
        :data="loadData"
        showPagination="auto"
      >
        <span slot="type" slot-scope="text, record">
          {{ record.type.msg }}
        </span>
        <span slot="action" slot-scope="text, record">
          <div v-if="record.type.code !== 0">
            <!-- <a-button class="mr26" type="link" @click="strucDetailHandle(record.id)">查看详情</a-button> -->
            <a-button style="margin-right:20px;" type="link" @click="editHandle(record.id)" v-if="permission.includes('peopleManagement_group_edit') && record.enableEdit && record.enabled">编辑</a-button>
            <a-button type="link" @click="modifyDepartmentHandle(record.id, !record.enabled)" v-if="permission.includes('peopleManagement_group_enable')">{{ record.enabled ? '停用' : '启用' }}</a-button>
          </div>
          <div v-else>
            -
          </div>
        </span>
      </s-table>
    </a-card>
    <create-struc-form
      v-if="visible"
      :strucId="strucId"
      :departmentId="departid"
      :departmentType="departmentType"
      :treeData="treeData"
      :visible="visible"
      @cancel="cancelHandle"
      @success="successHandle"
    />
  </div>
</template>
<script>
import { getStructureTree, getDepartmentList, modifyDepartment } from '@/api/personnel'
import { STable } from '@/components'
import CreateStrucForm from '../modules/CreateStrucForm'
// import { createTree } from '@/utils/tree/selectTree'
import createTree from '@/utils/tree/generateTree'

const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    width: 300
  },
  {
    title: '上一级',
    dataIndex: 'parentDepartmentName',
    customRender: (text, row, index) => {
      return (row.parentDepartmentName ? text : '-')
    }
  },
  {
    title: '所属分类',
    dataIndex: 'type',
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '业务线',
    dataIndex: 'serviceLine',
    customRender: (text, row, index) => {
      return text.msg
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'StruTable',
  components: {
    STable,
    CreateStrucForm
  },
  props: {
    departid: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
    },
    departmentType: {
      type: Number,
      default: 0
    },
    departmentManager: {
      type: String,
      default: ''
    },
    permission: {
      type: Array,
      default: null
    }
  },
  data () {
    this.columns = columns
    return {
      // 查询参数
      queryParam: {
        departmentId: this.departid
      },

      blankData: {
        pageNum: 1,
        pageSize: 10,
        size: 10,
        totalCount: 0,
        list: []
      },

      visible: false,
      treeData: [],

      strucId: ''
    }
  },
  mounted () {
    this.getStructureTreeHandle()
  },
  methods: {
    getStructureTreeHandle () {
      getStructureTree().then(res => {
        this.treeData = createTree(res, true)
      })
    },

    // 加载数据方法 必须为 Promise 对象
    loadData (parameter) {
      if (this.departid === 0) {
        return this.blankData
      } else {
        const requestParameters = Object.assign({}, parameter, this.queryParam)
        return getDepartmentList(requestParameters).then(res => {
          return res
        })
      }
    },
    employeeDetailHandle (id) {
      this.$emit('employeeDetail', id)
      // 设置操作按钮隐藏
      this.$nextTick(() => {
        document.getElementsByClassName('ant-popover').forEach(item => {
          item.style.display = 'none'
        })
      })
    },

    // 添加部门
    addStrucHandle () {
      this.visible = true
    },
    cancelHandle () {
      this.visible = false
      this.strucId = ''
    },

    // 编辑部门
    editHandle (id) {
      this.strucId = id + ''
      this.visible = true
    },

    strucDetailHandle (id) {
      this.$emit('strucDetail', id)
      // 设置操作按钮隐藏
      // this.$nextTick(() => {
      //   document.getElementsByClassName('ant-popover').forEach(item => {
      //     item.style.display = 'none'
      //   })
      // })
    },

    modifyDepartmentHandle (id, flag) {
      const msg = flag ? '开启' : '停用'
      this.$confirm({
        title: '提示',
        content: `确定要${msg}吗?`,
        onOk: () => {
          modifyDepartment({
            departmentId: id,
            enabled: flag
          }).then(res => {
            this.$refs.table.refresh(true)
          })
        },
        onCancel () {
        }
      })
    },

    successHandle (str) {
      this.$message.success(str)
      this.cancelHandle()
      this.getStructureTreeHandle()
      this.$refs.table.refresh(true)
      this.$emit('success')
    }
  },
  watch: {
    departid (val) {
      if (val) {
        this.queryParam.departmentId = val
        this.$refs.table.refresh(true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
  .table-content {
    /deep/ .ant-card-head {
      padding: 0 16px;
      // margin-bottom: 10px;
      border: 0;
    }
    /deep/ .ant-card-body {
      padding: 0 16px;
    }
    /deep/ .ant-card-head-title {
      padding: 0;
    }
    /deep/ .ant-card-extra {
      padding: 0;
    }
  }
</style>
