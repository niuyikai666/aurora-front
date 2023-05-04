<template>
  <page-header-wrapper class="container" title="超级管理员">
    <template v-slot:content>
      超级管理员拥有系统的所有权限
    </template>
    <template v-slot:extraContent>
      <a-button type="primary" icon="user-add" class="custom" @click="addSuper">添加超级管理员</a-button>
    </template>
    <div class="content">
      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        row-key="id"
      >
        <span slot="action" slot-scope="text, record">
          <template>
            <a-popover placement="bottomRight">
              <template slot="content">
                <dl class="btn-menu">
                  <dd type="danger" @click="delHandle(record.id)">删除</dd>
                </dl>
              </template>
              <a-icon class="icon-more" type="ellipsis" />
            </a-popover>
          </template>
        </span>
      </a-table>
    </div>
    <change-dialog :visible.sync="visible" :id="superId" />
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import ChangeDialog from './modules/ChangeDialog'
import { getEmployees, delEmployeeRoles } from '@/api/admin'

const columns = [
  {
    title: '超级管理员姓名',
    dataIndex: 'name'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'Super',
  components: {
    STable,
    ChangeDialog
  },
  data () {
    return {
      loading: true,
      columns: columns,
      dataSource: [],
      visible: false,
      superId: 0
    }
  },
  mounted () {
    this.getEmployeesHandle()
  },
  methods: {
    getEmployeesHandle () {
      getEmployees(1).then(res => {
        this.dataSource = res
        this.loading = false
      })
    },

    delHandle (employeeId) {
      this.confirmHandle(employeeId)
    },

    confirmHandle (employeeId) {
      this.$confirm({
        title: '提示',
        content: `确定要删除吗?`,
        onOk: () => {
          delEmployeeRoles(1, employeeId).then(res => {
            this.$message.success('操作成功')
            this.getEmployeesHandle()
          })
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },

    changeHandle () {
      this.visible = true
    },

    addSuper () {
      this.$router.push({ path: '/admin/super/create' })
    }
  }
}
</script>
