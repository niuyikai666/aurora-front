<template>
  <page-header-wrapper class="container" title="部门管理员">
    <template v-slot:content>
      部门管理员必须是部门的负责人
    </template>
    <div class="content">
      <a-table
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        row-key="id"
      >
        <span slot="jurisdiction">
          <a-button type="primary" class="custom-border-default">默认权限</a-button>
        </span>
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
  </page-header-wrapper>
</template>

<script>
import { STable } from '@/components'
import { getEmployees, delEmployeeRoles } from '@/api/admin'

const columns = [
  {
    title: '部门管理员姓名',
    dataIndex: 'name'
  },
  {
    title: '部门',
    dataIndex: 'departmentName'
  },
  {
    title: '权限',
    dataIndex: 'jurisdiction',
    scopedSlots: { customRender: 'jurisdiction' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'Department',
  components: {
    STable
  },
  data () {
    return {
      loading: true,
      columns: columns,
      dataSource: []
    }
  },
  mounted () {
    this.getEmployeesHandle()
  },
  methods: {
    getEmployeesHandle () {
      getEmployees(2).then(res => {
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
          delEmployeeRoles(2, employeeId).then(res => {
            this.$message.success('操作成功')
            this.getEmployeesHandle()
          })
        },
        onCancel () {
          // console.log('Cancel')
        }
      })
    }
  }
}
</script>
