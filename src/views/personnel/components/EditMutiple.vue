<template>
  <a-drawer
    title="批量修改员工"
    :width="820"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <div class="role-content">
      <div>
        <a-form
          class="form-horizol"
        >
          <a-form-item
            class="form-item"
            label="所属组织"
          >
            <a-cascader
              style="width:210px;"
              placeholder="请选择"
              v-model="model.departmentId"
              :options="treeData"
              change-on-select
              :allow-clear="false"
              expand-trigger="hover"
              :display-render="displayRender"
            />
          </a-form-item>
          <a-form-item
            class="form-item"
            label="职能"
          >
            <a-select
              placeholder="请选择"
              v-model="model.dutyType"
              style="width: 210px;"
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

          <a-form-item
            class="form-item"
            label="在职状态"
          >
            <a-select
              v-model="model.status"
              style="width: 210px;"
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
        </a-form>
      </div>
      <div class="table-title">已选中员工</div>
      <s-table
        ref="table"
        row-key="id"
        :columns="columns"
        :data="getEmployees"
        showPagination="auto"
      >
        <template slot="fullDepartmentName" slot-scope="text">
          <a-tooltip placement="leftTop">
            <template slot="title">
              <span>{{ text }}</span>
            </template>
            <div class="table-struc-con">
              {{ text }}
            </div>
          </a-tooltip>
        </template>
      </s-table>
    </div>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button class="disable" type="primary" @click="$emit('cancel')" style="margin-right:16px;">取消</a-button>
      <a-button type="primary" @click="createHandle">确认</a-button>
    </div>
  </a-drawer>
</template>

<script>
// import { createTree } from '@/utils/tree/selectTree'
import createTree from '@/utils/tree/generateTree'
import { STable } from '@/components'
import { getStructureTree, editEmployeeMutiple, getEmployeeByIds } from '@/api/personnel'

const columns = [
  {
    title: '员工姓名',
    dataIndex: 'name'
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
    dataIndex: 'fullDepartmentName',
    scopedSlots: { customRender: 'fullDepartmentName' },
    width: 200
  },
  {
    title: '培训平台账号状态',
    dataIndex: 'coolcollegeStatus',
    width: 200
  }
]

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    employeeIds: {
      type: Array,
      default: null
    }
  },
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      columns,
      model: {},
      treeData: [],
      ids: []
    }
  },
  mounted () {
    this.getStructureTreeHandle()
  },

  methods: {
    onClose () {
      this.model = {}
      this.treeData = []
      this.$emit('cancel')
    },

    getEmployees (parameter) {
      const requestParameters = Object.assign({}, parameter, { employeeId: this.employeeIds })
      return getEmployeeByIds(requestParameters).then(res => {
        return res
      })
    },
    getStructureTreeHandle () {
      getStructureTree().then(res => {
        this.treeData = JSON.parse(JSON.stringify(createTree(res)))
      })
    },

    createHandle () {
      let departmentId = ''
      if (this.model.departmentId && this.model.departmentId.length >= 0) {
        departmentId = this.model.departmentId[this.model.departmentId.length - 1]
      }

      const data = {
        employeeId: this.employeeIds,
        ...this.model,
        departmentId: departmentId ? parseInt(departmentId) : undefined
      }
      this.editMutipleHandle(data)
    },

    editMutipleHandle (data) {
      editEmployeeMutiple(data).then(() => {
        this.$message.success('保存成功！')
        this.onClose()
        this.$emit('confirm')
      })
    },

    resetHandle () {
      this.model = {}
    },

    displayRender ({ labels }) {
      return labels[labels.length - 1]
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.getStructureTreeHandle()
        this.$refs.table.refresh(true)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .table-title {
    font-size: 16px;
    color: #262626;
    font-weight: 500;
  }
  .modal {
    /deep/ .ant-modal-body {
      padding: 0;
    }
    /deep/ .ant-card-head {
      border-bottom: 0;
      .ant-tabs-bar {
        border-bottom: 0;
      }
    }
    .tab-content {
      margin-top: 10px;
      padding-bottom: 10px;
      /deep/ h1 {
        margin-bottom: 5px;
      }
    }
    .item-content {
      padding: 0 25px;
      .check-box {
        margin-right: 5px;
      }
    }
    .item-child {
      margin-top: 15px;
    }
  }
  .role-content {
    overflow-y: scroll;
  }
  .form-horizol {
    &::after {
      display: flex;
      content: '';
      clear: both;
    }
    .form-item {
      float: left;
      margin-right: 40px;
    }
  }
</style>
