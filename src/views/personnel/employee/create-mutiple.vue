<template>
  <div class="container">
    <div class="inner-content">
      <div class="exp">批量添加员工</div>
    </div>
    <div class="inner-content" style="margin-top:24px;">
      <div class="content">
        <a-form class="form" :form="form">
          <a-table
            :columns="columns"
            row-key="key"
            :data-source="tableData"
            :pagination="false"
          >
            <template slot="name" slot-scope="text, record">
              <a-form-item class="form-item">
                <a-input style="width:160px;" v-model="record.name" placeholder="请输入姓名" />
              </a-form-item>
            </template>
            <template slot="mobile" slot-scope="text, record">
              <a-form-item class="form-item">
                <a-input style="width:160px;" v-model="record.mobile" placeholder="请输入手机号" />
              </a-form-item>
            </template>
            <template slot="departmentId" slot-scope="text, record">
              <a-form-item class="form-item">
                <a-cascader
                  style="width:160px;"
                  placeholder="请选择"
                  v-model="record.departmentId"
                  :options="treeData"
                  change-on-select
                  :allow-clear="false"
                  expand-trigger="hover"
                  :display-render="displayRender"
                />
              </a-form-item>
            </template>
            <template slot="dutyType" slot-scope="text, record">
              <a-form-item class="form-item">
                <a-select
                  placeholder="请选择"
                  v-model="record.dutyType"
                  style="width:160px;"
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
            </template>
            <template slot="employeeStatus" slot-scope="text, record">
              <a-form-item class="form-item">
                <a-select
                  v-model="record.employeeStatus"
                  style="width:160px;"
                  placeholder="请选择"
                >
                  <a-select-option :value="1">
                    试用
                  </a-select-option>
                  <a-select-option :value="2">
                    正式
                  </a-select-option>
                  <a-select-option :value="3">
                    离职
                  </a-select-option>
                </a-select>
              </a-form-item>
            </template>
            <template slot="joinTime" slot-scope="text, record">
              <a-form-item class="form-item">
                <a-date-picker
                  style="width:160px;"
                  placeholder="请选择日期"
                  value-format="YYYY-MM-DD"
                  v-model="record.joinTime"
                />
              </a-form-item>
            </template>
            <template slot="action" slot-scope="text, record, index">
              <a-button type="link" @click="removeHandle(index)">删除</a-button>
            </template>
          </a-table>
          <a-button v-if="tableData.length < 10" class="btn-add" icon="plus" @click="addHandle()">添加员工</a-button>
        </a-form>
        <div class="btn-group" style="margin-top:30px">
          <a-button
            class="btn-submit"
            type="primary"
            :disabled="tableData.length <= 0"
            @click="createHandle()"
            style="margin-left:16px;margin-top:50px">创建员工</a-button>
          <a-button style="margin-left: 20px;" @click="backHandle">取 消</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStructureTree, createEmployeeMutiple } from '@/api/personnel'
// import { createTree } from '@/utils/tree/selectTree'
import createTree from '@/utils/tree/generateTree'
import timeRange from '@/utils/timeRange'

const columns = [
  {
    title: '员工姓名',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    scopedSlots: { customRender: 'mobile' }
  },
  {
    title: '所属组织',
    dataIndex: 'departmentId',
    scopedSlots: { customRender: 'departmentId' }
  },
  {
    title: '职能',
    dataIndex: 'dutyType',
    scopedSlots: { customRender: 'dutyType' }
  },
  {
    title: '在职状态',
    dataIndex: 'employeeStatus',
    scopedSlots: { customRender: 'employeeStatus' }
  },
  {
    title: '加入时间',
    dataIndex: 'joinTime',
    scopedSlots: { customRender: 'joinTime' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 100
  }
]

export default {
  name: 'EmployeeCreateMutiple',
  data () {
    return {
      form: this.$form.createForm(this),
      columns,
      tableData: [],
      treeData: []
    }
  },
  mounted () {
    // this.form = this.$form.createForm(this, { name: 'dynamic_form_item' })
    // this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
    for (let i = 0; i < 3; i++) {
        this.tableData.push({
          key: this.generateKey(36),
          name: '',
          mobile: '',
          departmentId: [],
          dutyType: 0,
          employeeStatus: 1,
          joinTime: timeRange.nowDay[0]
        })
      }
    this.getStructureTreeHandle()
  },
  methods: {
    getStructureTreeHandle () {
      getStructureTree().then(res => {
        this.treeData = createTree(res, true)
      })
    },

    addHandle () {
      this.tableData.push({
        key: this.generateKey(36),
        name: '',
        mobile: '',
        departmentId: [],
        dutyType: 0,
        employeeStatus: 1,
        joinTime: timeRange.nowDay[0]
      })
    },

    removeHandle (index) {
      this.tableData.splice(index, 1)
    },

    generateKey (length) {
      return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
    },

    createHandle () {
      let flag = true
      const data = JSON.parse(JSON.stringify(this.tableData))
      try {
        data.forEach(item => {
          item.departmentId = item.departmentId.length > 0 ? item.departmentId[item.departmentId.length - 1] : []
          if (item.name === '') {
            this.$message.error('请填写姓名')
            flag = false
            throw new Error('error')
          }
          if (item.mobile === '') {
            this.$message.error('请填写手机号')
            flag = false
            throw new Error('error')
          }
          if (item.departmentId.length <= 0) {
            this.$message.error('请选择部门')
            flag = false
            throw new Error('error')
          }
          if (item.joinTime === '') {
            this.$message.error('请填写加入时间')
            flag = false
            throw new Error('error')
          }
        })
      } catch {
      }

      if (flag) {
        this.createDo(data)
      }
    },

    createDo (data) {
      createEmployeeMutiple(data).then(() => {
        this.$message.success('创建成功')
        this.$router.push({ path: '/personnel/employee/list' })
      })
    },

    backHandle () {
      this.$router.push({ path: '/personnel/employee/list' })
    },

    displayRender ({ labels }) {
      return labels[labels.length - 1]
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    min-height: 88vh;
    .form {
      position: relative;
      .btn-add {
        width: 100%;
        margin-top: 15px;
        border: dashed 1px #D9D9D9;
      }
      .form-item {
        margin-bottom: 0 !important;
      }
    }
  }
</style>
