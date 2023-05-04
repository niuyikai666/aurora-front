<template>
  <div class="container">
    <a-card
      class="card-title-large"
      title="员工列表"
      :bordered="false"
    >
      <!-- <div slot="extra">
        <div class="opt-con">
          <div class="btn-group">
            <a-button
              v-if="permission.includes('peopleManagement_employee_create')"
              type="primary"
              icon="user-add"
              @click="createEmployee">添加员工</a-button>
            <a-button
              v-if="permission.includes('peopleManagement_employee_create')"
              type="primary"
              icon="usergroup-add"
              style="margin-left:10px;"
              @click="createEmployeeMutiple">批量添加员工</a-button>
            <a-button
              v-if="permission.includes('peopleManagement_employee_batch_edit')"
              type="primary"
              icon="edit"
              :disabled="selectedRowKeys.length <= 0"
              style="margin-left:10px;"
              @click="editEmployeeMutiple">批量修改员工</a-button>
            <a-button
              type="primary"
              icon="plus"
              :disabled="selectedRowKeys.length <= 0"
              style="margin-left:10px;"
              @click="addRolesMultip"
            >批量添加角色</a-button>
          </div>
        </div>
      </div> -->
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="60">
            <a-col :md="8" :sm="24">
              <a-form-item label="员工姓名">
                <a-input placeholder="请输入" v-decorator="['name']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="手机号">
                <a-input placeholder="请输入" v-decorator="['mobile']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="在职状态" class="state">
                <a-select
                  v-decorator="['employeeState']"
                  placeholder="请选择"
                >
                  <a-select-option value="1">
                    试岗
                  </a-select-option>
                  <a-select-option value="2">
                    正式
                  </a-select-option>
                  <a-select-option value="3">
                    离职
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="所属组织">
                <a-cascader
                  placeholder="请选择"
                  v-decorator="['departmentId']"
                  :options="treeData"
                  change-on-select
                  :allow-clear="false"
                  expand-trigger="hover"
                  :display-render="displayRender"
                  @change="structureChange"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="职能" class="func">
                <a-select
                  v-decorator="['dutyType']"
                  placeholder="请选择"
                >
                  <a-select-option :value="0">
                    其他
                  </a-select-option>
                  <a-select-option :value="1">
                    运营
                  </a-select-option>
                  <a-select-option :value="2">
                    短视频
                  </a-select-option>
                  <a-select-option :value="3">
                    管理层
                  </a-select-option>
                  <a-select-option :value="4">
                    人力
                  </a-select-option>
                  <a-select-option :value="5">
                    数据
                  </a-select-option>
                  <a-select-option :value="6">
                    客服
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item class="item-left" label="是否为负责人">
                  <a-select
                    v-decorator="['isDepartmentManger']"
                    placeholder="请选择"
                  >
                    <a-select-option :value="true">
                      是
                    </a-select-option>
                    <a-select-option :value="false">
                      否
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :class="{'up': advanced}">
                <a-button style="margin-right:16px;" @click="resetFormFileds">重置</a-button>
                <a-button type="primary" @click="searchHandle">查询</a-button>
                <a @click="toggleAdvanced" style="margin-left: 16px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="flex-justify" style="margin-bottom:16px">
        <div class="opt-con">
          <div class="btn-group">
            <a-button
              v-if="permission.includes('peopleManagement_employee_create')"
              type="primary"
              icon="user-add"
              @click="createEmployee">添加员工</a-button>
            <a-button
              v-if="permission.includes('peopleManagement_employee_create')"
              type="primary"
              icon="usergroup-add"
              style="margin-left:10px;"
              @click="createEmployeeMutiple">批量添加员工</a-button>
            <a-button
              v-if="permission.includes('peopleManagement_employee_batch_edit')"
              type="primary"
              icon="edit"
              :disabled="selectedRowKeys.length <= 0"
              style="margin-left:10px;"
              @click="editEmployeeMutiple">批量修改员工</a-button>
            <a-button
              type="primary"
              icon="plus"
              :disabled="selectedRowKeys.length <= 0"
              style="margin-left:10px;"
              @click="addRolesMultip"
            >批量添加角色</a-button>
            <a-button
              v-if="permission.includes('employee_default_department_change')"
              type="primary"
              style="margin-left:10px;"
              @click="strucChange"
            >所属组织变更</a-button>
          </div>
        </div>
        <a-button type="primary" @click="download" v-if="permission.includes('system_employee_export')">
          <svg-icon icon-class="export-icon" class="import-icon"></svg-icon>
          导出
        </a-button>
      </div>
      <s-table
        style="margin-bottom: 24px"
        ref="table"
        row-key="id"
        :scroll="{x: 1800}"
        :columns="columns"
        :rowSelection="rowSelection"
        :data="getEmployeesHandle"
      >
        <template slot="department" slot-scope="text, record">
          <a-tooltip placement="rightTop">
            <template slot="title">
              <span>{{ record.departmentInfo.fullName }}</span>
            </template>
            <div class="table-struc-con">
              {{ record.departmentInfo.fullName }}
            </div>
          </a-tooltip>
        </template>
        <template slot="role" slot-scope="text, record">
          <!-- <span v-if="record.role && record.role.length > 0" v-for="(item, index) in record.role" :key="index">
            {{ index === record.role.length - 1 ? item.roleName : item.roleName + ',' }}
          </span> -->
          <ellipsis :length="20" tooltip>{{ generateRoleArr(record.role) }}</ellipsis>
        </template>
        <template slot="dutyType" slot-scope="text, record">
          {{ record.dutyType && record.dutyType.msg ? record.dutyType.msg : '-' }}
        </template>
        <template slot="state" slot-scope="text, record">
          {{ record.state && record.state.msg ? record.state.msg : '-' }}
        </template>
        <span slot="action" slot-scope="text, record">
          <a-button class="mr10" type="link" @click="detailEmployee(record.id)">详情</a-button>
          <a-popover class="pover" v-if="permission.includes('peopleManagement_employee_edit') || permission.includes('peopleManagement_employee_role')" placement="bottom">
            <template slot="content">
              <div class="btn-drop-group">
                <a-button type="link" @click="editEmployee(record.id)" v-if="permission.includes('peopleManagement_employee_edit')">编辑</a-button>
                <a-button type="link" @click="roleModify(record.role, record.id)" v-if="permission.includes('peopleManagement_employee_role')">角色管理</a-button>
              </div>
            </template>
            <a-button type="link">更多<a-icon class="icon-down" type="down" /></a-button>
          </a-popover>
        </span>
      </s-table>
      <role-dialog :visible="visble" :roleIds="roleIds" @cancel="cancelDialog" @confirm="roleConfirmHandle" />
      <edit-mutiple :visible="visbleEmployee" :employeeIds="selectedRowKeys" @cancel="cancelEmployeeDialog" @confirm="editConfirm" />
      <empoyee-modify ref="employeeModify" :show="visibleModify" :employeeId="employeeId" @cancel="cancelModifyHandle" @success="successModifyHandle" />
      <structure-change
        :visible="visibleStrucChange"
        @cancel="visibleStrucChange = false"
        @success="visibleStrucChange = false"
      />
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable, Ellipsis } from '@/components'
import RoleDialog from '../components/RoleDialog'
import EditMutiple from '../components/EditMutiple'
import EmpoyeeModify from '../components/EmpoyeeModify'
import StructureChange from '../components/StructureChange'
import { getEmployees, getStructureTree, addEmployeeRoles } from '@/api/personnel'
import { columns } from '../tableColumns'
// import { createTree } from '@/utils/tree/selectTree'
import createTree from '@/utils/tree/generateTree'

export default {
  name: 'EmployeeList',
  components: {
    STable,
    Ellipsis,
    RoleDialog,
    EditMutiple,
    EmpoyeeModify,
    StructureChange
  },
  data () {
    return {
      advanced: false,
      form: this.$form.createForm(this),
      queryParam: {},
      columns,
      treeData: [],
      roleIds: [],

      employeeId: null,
      selectedRowKeys: [],
      visble: false,
      visbleEmployee: false,
      editTableData: [],

      visibleModify: false,
      visibleStrucChange: false
    }
  },
  mounted () {
    this.getStructureTreeHandle()
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    getEmployeesHandle (parameter) {
      const requestParameters = Object.assign({}, parameter, this.queryParam)
      return getEmployees(requestParameters).then(res => {
        return res
      })
    },

    generateRoleArr (data) {
      const arr = []
      if (data && data.length > 0) {
        data.forEach(item => {
          arr.push(item.roleName)
        })
      }
      return arr.toString() ? arr.toString() : '-'
    },

    getStructureTreeHandle () {
      getStructureTree().then(res => {
        this.treeData = JSON.parse(JSON.stringify(createTree(res)))
      })
    },

    searchHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParam = {
            ...this.queryParam,
            ...values,
            departmentId: this.departmentId ? this.departmentId : undefined
          }
          this.$refs.table.refresh(true)
        }
      })
    },
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const queryParams = {
              ...this.queryParam,
              ...values,
              departmentId: this.departmentId ? this.departmentId : undefined
            }
            resolve(queryParams)
          }
        })
      })
    },
    download () {
      this.getParams().then(res => {
        let url = ''
        const path = `${process.env.VUE_APP_API_BASE_URL}employee/list/export`
        for (const key in res) {
          if ((res[key] || res[key] === false || res[key] === 0) && key !== 'page' && key !== 'size' && key !== 'type') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
        window.location.href = path + url
      })
    },
    structureChange (value) {
      this.departmentId = value[value.length - 1]
    },

    resetFormFileds () {
      this.form.resetFields()
      this.queryParam = {}
      this.departmentId = undefined
      this.$refs.table.refresh(true)
    },

    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },

    addRolesMultip () {
      if (this.selectedRowKeys.length <= 0) {
        this.$message.error('请选择员工')
        return
      }
      this.roleIds = []
      this.visble = true
    },

    strucChange () {
      this.visibleStrucChange = true
    },

    roleConfirmHandle (roleIds) {
      addEmployeeRoles({
        employeeIds: this.employeeId ? [this.employeeId] : this.selectedRowKeys,
        roleIds: roleIds
      }).then(() => {
        this.$message.success('操作成功')
        this.cancelDialog()
        this.$refs.table.refresh()
      })
    },

    cancelDialog () {
      this.visble = false
      this.employeeId = null
    },

    cancelEmployeeDialog () {
      this.visbleEmployee = false
    },

    roleModify (roles, employeeId) {
      const arr = []
      if (roles && roles.length > 0) {
        roles.forEach(item => {
          arr.push(item.roleId)
        })
      }

      this.employeeId = employeeId
      this.roleIds = arr
      this.visble = true
    },

    cancelModifyHandle () {
      this.employeeId = null
      this.visibleModify = false
    },
    successModifyHandle () {
      this.employeeId = ''
      this.$refs.table.refresh(true)
    },
    createEmployee () {
      this.visibleModify = true
    },
    createEmployeeMutiple () {
      this.$router.push({
        path: '/personnel/employee/create-mutiple'
      })
    },
    editEmployeeMutiple () {
      if (this.selectedRowKeys.length <= 0) {
        this.$message.error('请选择员工')
        return
      }
      this.visbleEmployee = true
    },
    editConfirm () {
      this.$refs.table.refresh()
    },
    editEmployee (id) {
      // this.$router.push({
      //   path: `/personnel/employee/edit?id=${id}`
      // })
      this.employeeId = id
      this.$nextTick(() => {
        this.visibleModify = true
      })
    },
    detailEmployee (id) {
      this.$router.push({
        path: `/personnel/employee/detail?id=${id}`
      })
    }
  },
  computed: {
    rowSelection () {
      const self = this
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          self.selectedRowKeys = selectedRowKeys
        }
      }
    },
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
