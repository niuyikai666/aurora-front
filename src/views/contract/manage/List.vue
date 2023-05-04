<template>
  <div class="container">
    <a-card
      class="card-title-large min-height"
      title="合同列表"
      :bordered="false"
    >
      <div slot="extra">
        <div class="opt-con" v-if="permission.includes('contract_base_add')">
          <div class="btn-group">
            <a-button
              type="primary"
              icon="plus-circle"
              @click="addHandle">新增合同</a-button>
          </div>
        </div>
      </div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="60">
            <a-col :md="8" :sm="24">
              <a-form-item label="合同编号">
                <a-input placeholder="请输入" v-decorator="['code']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="姓名">
                <a-input placeholder="请输入" v-decorator="['name']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="身份证号">
                <a-input placeholder="请输入" v-decorator="['pbIdCard']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="签约类型">
                <a-select
                  v-decorator="['signType']"
                  placeholder="请选择"
                >
                  <a-select-option :value="1">
                    全约
                  </a-select-option>
                  <a-select-option :value="2">
                    网签
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="签约日期">
                <a-date-picker
                  value-format="YYYY-MM-DD"
                  v-decorator="['signDate']"
                />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="开始时间">
                  <a-date-picker
                    value-format="YYYY-MM-DD"
                    v-decorator="['startDate']"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="到期日期">
                  <a-date-picker
                    value-format="YYYY-MM-DD"
                    v-decorator="['endDate']"
                  />
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 16" :sm="24">
              <span class="table-page-search-submitButtons" :class="{'up': advanced}">
                <a-button @click="resetFormFileds">重置</a-button>
                <a-button style="margin-left: 12px" type="primary" @click="searchHandle">查询</a-button>
                <a @click="toggleAdvanced" style="margin-left: 16px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'"/>
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <s-table
        ref="table"
        row-key="id"
        style="display:block; width:100%;"
        :columns="columns"
        :data="getDataHandle"
        showPagination="auto"
      >
        <span slot="action" slot-scope="text, record">
          <a-button type="link" style="margin-right:16px;" @click="detailHandle(record.id)">详情</a-button>
          <a-popover class="pover" placement="bottom">
            <template slot="content">
              <div class="btn-drop-group">
                <a-button v-if="permission.includes('contract_base_update')" type="link" @click="editContract(record.id)">编辑</a-button>
                <a-button v-if="permission.includes('contract_agreement_list')" type="link" @click="extraHande(record.id)">补充合同</a-button>
                <a-button v-if="permission.includes('contract_relation')" type="link" @click="touchedHandle(record.id)">已关联账号</a-button>
                <a-button v-if="permission.includes('contract_relation')" type="link" @click="addContact(record.id)">新增关联账号</a-button>
              </div>
            </template>
            <a-button type="link">更多<a-icon class="icon-down" type="down" /></a-button>
          </a-popover>
        </span>
      </s-table>
    </a-card>
    <account-dialog :visible="visible" v-if="contractId" :contractId="contractId" @cancel="cancelContactHandle" />
    <account-touched-dialog v-if="contractId" :contractId="contractId" :visible="visible2" @cancel="cancelContactHandle" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { getContracts } from '@/api/contract'
import { columns } from './columns'
import AccountDialog from '../components/AccountDialog'
import AccountTouchedDialog from '../components/AccountTouchedDialog'

export default {
  name: 'ContractList',
  components: {
    STable,
    AccountDialog,
    AccountTouchedDialog
  },
  data () {
    return {
      advanced: false,
      columns,
      visible: false,
      visible2: false,
      form: this.$form.createForm(this),
      queryParam: {},
      contractId: ''
    }
  },
  mounted () {
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    addHandle () {
      this.$router.push({
        path: '/contract/manage/create'
      })
    },
    addContact (id) {
      this.visible = true
      this.contractId = id
    },
    touchedHandle (id) {
      this.contractId = ''
      this.$nextTick(() => {
        this.contractId = id
        this.visible2 = true
      })
    },
    cancelContactHandle () {
      this.visible = false
      this.visible2 = false
    },
    extraHande (id) {
      sessionStorage.setItem('contractid', id)
      this.$router.push({
        path: `/contract/manage/extra-list`
      })
    },
    editContract (id) {
      this.$router.push({
        path: `/contract/manage/edit?id=${id}`
      })
    },
    detailHandle (id) {
      this.$router.push({
        path: `/contract/manage/detail?id=${id}`
      })
    },
    getDataHandle (parameter) {
      const requestParameters = Object.assign({}, parameter, this.queryParam)
      return getContracts(requestParameters).then(res => {
        return res
      })
    },
    resetFormFileds () {
      this.form.resetFields()
      this.queryParam = {}
      this.$refs.table.refresh(true)
    },
    searchHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParam = {
            ...values
          }

          this.$refs.table.refresh(true)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['permission'])
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
