<template>
  <div class="container">
    <a-card
      class="card-title-large"
      title="公会经纪人管理"
      :bordered="false"
    >
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="60">
            <a-col :md="8" :sm="24">
              <a-form-item label="公会经纪人">
                <a-input placeholder="请输入" v-decorator="['searchName']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="绑定员工姓名">
                <a-input placeholder="请输入" v-decorator="['employeeName']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="员工所属组织">
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
              <a-form-item label="账号关联状态">
                <a-select
                  v-decorator="['status']"
                  placeholder="请选择"
                >
                  <a-select-option value="1">
                    已关联
                  </a-select-option>
                  <a-select-option value="0">
                    未关联
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="16" :sm="24">
              <span class="table-page-search-submitButtons" style="margin-bottom:24px;">
                <a-button @click="resetFormFileds" style="margin-right:16px;">重置</a-button>
                <a-button type="primary" @click="searchHandle">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <s-table
        ref="table"
        row-key="agentId"
        :columns="columns"
        :data="getAgentsHandle"
        showPagination="auto"
      >
        <template slot="name" slot-scope="text, record">
          <span> {{ record.name ? record.name : '-' }}</span>
        </template>
        <template slot="employeeName" slot-scope="text, record">
          <span> {{ record.employeeName ? record.employeeName : '-' }}</span>
        </template>
        <template slot="departmentFullName" slot-scope="text, record">
          <span> {{ record.departmentFullName ? record.departmentFullName : '-' }}</span>
        </template>
        <span slot="action" slot-scope="text, record">
          <a-button type="link" @click="setHandle(record)">设置</a-button>
        </span>
      </s-table>

      <a-modal
        title="设置绑定账号"
        :width="348"
        :visible="visible"
        @cancel="cancelHandle"
      >
        <template slot="footer">
          <a-button @click="cancelHandle">取 消</a-button>
          <a-button type="primary" @click="confirmHandle">确 定</a-button>
        </template>
        <div class="d-content">
          <div class="item">
            <p class="d-title">公会经纪人</p>
            <div class="crip">
              <span class="text">{{ agentName }}</span>
            </div>
          </div>
          <div class="item">
            <p class="d-title">绑定账号</p>
            <div class="crip">
              <a-auto-complete
                style="width: 100%"
                placeholder="请选择账号"
                option-label-prop="title"
                v-model="searchValue"
                @search="onSearch"
                @select="onSelect"
              >
                <template slot="dataSource">
                  <a-select-option v-for="item in dataSource" :key="item.id" :title="item.name">
                    <span>{{ item.name }}</span>
                  </a-select-option>
                </template>
                <a-input>
                  <a-icon slot="suffix" type="search" />
                </a-input>
              </a-auto-complete>
            </div>
          </div>
        </div>
      </a-modal>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getAgents, agentBind } from '@/api/agent'
import { employeeSearch, getStructureTree } from '@/api/personnel'
import createTree from '@/utils/tree/generateTree'

const columns = [
  {
    title: '公会经纪人',
    dataIndex: 'name',
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '绑定账号',
    dataIndex: 'employeeName',
    scopedSlots: { customRender: 'employeeName' },
    width: 180
  },
  {
    title: '员工所属组织',
    dataIndex: 'departmentFullName',
    scopedSlots: { customRender: 'departmentFullName' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 80,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'Agent',
  components: {
    STable
  },
  data () {
    return {
      columns: columns,
      visible: false,

      agentName: '',
      agentId: '',
      dataSource: [],
      searchValue: '',
      employeeId: '',
      departmentId: '',
      timer: null,
      form: this.$form.createForm(this),
      queryParam: {},
      treeData: [],
      dId: ''
    }
  },
  mounted () {
    this.getStructureTreeHandle()
  },
  methods: {
    getAgentsHandle (parameter) {
      const requestParameters = Object.assign({}, parameter, this.queryParam)
      return getAgents(requestParameters).then(res => {
        return res
      })
    },
    setHandle (record) {
      this.visible = true
      this.agentName = record.name
      this.agentId = record.id
    },
    onSelect (value, option) {
      const data = this.dataSource.filter(item => item.id === option.key)[0]
      this.employeeId = data.id
    },
    onSearch (query) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.dataSearchHandle(query)
      }, 200)
    },
    dataSearchHandle (query) {
      employeeSearch({ searchName: query }).then(res => {
        this.employeeId = ''
        this.dataSource = []
        if (res.length > 0) {
          this.dataSource = res.map(item => {
            item.id = item.id + ''
            item.name = `${item.name}(${item.departmentInfo.name})`
            return item
          })
        }
      })
    },
    cancelHandle () {
      this.visible = false
      this.searchValue = ''
      this.dataSource = []
    },
    confirmHandle () {
      if (this.employeeId === '') {
        this.$notification['error']({
          message: '错误',
          description: '请选择绑定账号',
          duration: 4
        })
        return false
      }

      this.agentBindHandle()
    },
    agentBindHandle () {
      agentBind({
        agentId: this.agentId,
        employeeId: this.employeeId
      }).then(() => {
        this.$notification['success']({
          message: '提示',
          description: '操作成功',
          duration: 2
        })
        this.$refs.table.refresh()
        this.cancelHandle()
      })
    },
    getStructureTreeHandle () {
      getStructureTree().then(res => {
        this.treeData = JSON.parse(JSON.stringify(createTree(res)))
      })
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    structureChange (value) {
      this.dId = value[value.length - 1]
    },
    resetFormFileds () {
      this.form.resetFields()
      this.queryParam = {}
      this.dId = undefined
      this.$refs.table.refresh(true)
    },
    searchHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParam = {
            ...values,
            departmentId: this.dId ? this.dId : undefined
          }

          this.$refs.table.refresh(true)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .table-page-search-wrapper {
    .ant-form-inline {
      /deep/ .ant-form-item {
        .ant-form-item-label {
          width: 105px;
        }
      }
    }
  }
  .auto-complete-dashed {
    /deep/ .ant-select-selection__clear {
      right: 36px;
    }
  }
  .d-content {
    margin-top: -5px;
    .item {
      margin-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
      }
      .d-title,
      .crip {
        font-size: 14px;
        color: rgba(115,115,115, .85);
        .text {
          font-size: 16px;
          color: #755DD7;
          font-weight: 700;
        }
      }
      .d-title {
        margin-bottom: 10px;
      }
      .label {
        color: #595959;
        margin-bottom: 10px;
        font-size: 14px;
      }
      .flex-box {
        border-bottom: solid 1px rgba(0,0,0,.06);
        padding-bottom: 16px;
      }
      .bold {
        color: rgba(0,0,0,.85);
        font-size: 16px;
        margin-right: 12px;
      }
    }
  }
</style>
