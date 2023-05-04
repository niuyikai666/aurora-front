<template>
  <page-header-wrapper class="container" title="管理员">
    <template v-slot:content>
      可根据需要设置管理员，下放自己的全部权限或部分权限
    </template>
    <template v-slot:extraContent>
      <a-button v-if="permission.operation_privilege.includes('ORGANIZATION_PRIVILEGES')" type="primary" icon="user-add" class="custom" @click="create">新建管理员</a-button>
    </template>
    <div class="content">
      <a-tabs type="card" @change="tabHandle" v-model="tag">
        <a-tab-pane :key="0" tab="全部"></a-tab-pane>
        <a-tab-pane :key="1" tab="全公司"></a-tab-pane>
        <a-tab-pane :key="2" tab="分公司"></a-tab-pane>
        <a-tab-pane :key="3" tab="运营组"></a-tab-pane>
      </a-tabs>
      <a-table
        style="margin-top:-16px;"
        :loading="loading"
        :columns="columns"
        :data-source="dataSource"
        :pagination="false"
        row-key="id"
      >
        <span slot="privilegeNames" slot-scope="text, record">
          <a-tooltip placement="topLeft">
            <template slot="title">
              <span v-for="(item, index) in record.privilegeNames" :key="index">{{ item }}、</span>
            </template>
            <div>
              <p v-if="record.privilegeNames.length > 0">
                <span>{{ record.privilegeNames[0] ? `${record.privilegeNames[0]}` : '' }} {{ record.privilegeNames[0] && record.privilegeNames.length === 1 ? '' : '、' }}</span>
                <span>{{ record.privilegeNames[1] ? `${record.privilegeNames[1]}` : '' }}</span>
                <i v-if="record.privilegeNames.length > 2">... </i>
                共 <span>{{ record.privilegeNames.length }} </span>个权限
              </p>
              <p v-else></p>
            </div>
          </a-tooltip>
        </span>
        <span slot="scopeNames" slot-scope="text, record">
          <a-tooltip placement="topLeft">
            <template slot="title">
              <span v-for="(item, index) in record.scopeNames" :key="index">{{ item }}、</span>
            </template>
            <div>
              <p v-if="record.scopeNames && record.scopeNames.length > 0">
                <span>{{ record.scopeNames[0] ? `${record.scopeNames[0]}` : '' }} {{ record.scopeNames[0] && record.scopeNames.length === 1 ? '' : '、' }} </span>
                <span>{{ record.scopeNames[1] ? `${record.scopeNames[1]}` : '' }} </span>
                <i v-if="record.scopeNames.length > 2">... </i>
                共 <span>{{ record.scopeNames.length }} </span>个部门
              </p>
              <p v-else></p>
            </div>
          </a-tooltip>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a-popover placement="bottomRight">
              <template slot="content">
                <dl class="btn-menu">
                  <dd @click="edit(record.id)">编辑管理员</dd>
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
import { mapGetters } from 'vuex'
import { Ellipsis } from '@/components'
import { getEmployeesOrdinary, delEmployeeRoles } from '@/api/admin'

const columns = [
  {
    title: '管理员姓名',
    dataIndex: 'name'
  },
  {
    title: '标签',
    dataIndex: 'tagName'
  },
  {
    title: '部门',
    dataIndex: 'departmentName'
  },
  {
    title: '权限',
    dataIndex: 'privilegeNames',
    scopedSlots: { customRender: 'privilegeNames' }
  },
  {
    title: '权限范围',
    dataIndex: 'scopeNames',
    scopedSlots: { customRender: 'scopeNames' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'OrdinaryList',
  components: {
    Ellipsis
  },
  data () {
    return {
      columns: columns,
      dataSource: [],
      tag: 0,
      loading: true
    }
  },
  mounted () {
    this.getEmployeesHandle()
    // console.log('permission', this.permission)
  },
  methods: {
    tabHandle () {
      this.getEmployeesHandle()
    },
    getEmployeesHandle () {
      getEmployeesOrdinary(this.tag).then(res => {
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
          delEmployeeRoles(3, employeeId).then(res => {
            this.$message.success('操作成功')
            this.getEmployeesHandle()
          })
        },
        onCancel () {
          console.log('Cancel')
        }
      })
    },
    create () {
      this.$router.push({ path: '/admin/ordinary/create' })
    },
    edit (id) {
      this.$router.push({ path: `/admin/ordinary/edit?id=${id}` })
    }
  },
  computed: {
    ...mapGetters([
      'permission'
    ])
  }
}
</script>
