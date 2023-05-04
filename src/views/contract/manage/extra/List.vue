<template>
  <div class="container">
    <a-card
      class="card-title-large"
      title="补充合同"
      :bordered="false"
    >
      <div slot="extra">
        <div class="opt-con" v-if="permission.includes('contract_agreement_add')">
          <div class="btn-group">
            <a-button
              type="primary"
              icon="plus-circle"
              @click="addHandle">新增补充合同</a-button>
          </div>
        </div>
      </div>
      <s-table
        v-if="contractId"
        ref="table"
        row-key="id"
        :columns="columns"
        :data="getDataHandle"
        showPagination="auto"
      >
        <span slot="action" slot-scope="text, record">
          <a-button type="link" style="margin-right:16px;" @click="detailHandle(record.id)">详情</a-button>
          <a-button v-if="permission.includes('contract_agreement_update')" type="link" style="margin-right:16px;" @click="editHandle(record.id)">编辑</a-button>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { getExtraContracts } from '@/api/contract'

const columns = [
  {
    title: '合同名称',
    dataIndex: 'nickName'
  },
  {
    title: '签约日期',
    dataIndex: 'createTime'
  },
  {
    title: '开始日期',
    dataIndex: 'validityStartDate'
  },
  {
    title: '到期日期',
    dataIndex: 'validityEndDate'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 120,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'ContractList',
  components: {
    STable
  },
  data () {
    return {
      columns: columns,
      contractId: ''
    }
  },
  created () {
    this.contractId = sessionStorage.getItem('contractid')
    if (!this.contractId) {
      this.$router.push({
        path: `/contract/manage/list`
      })
    }
  },
  mounted () {
  },
  methods: {
    addHandle () {
      this.$router.push({
        path: `/contract/manage/extra-create?id=${this.contractId}`
      })
    },
    getDataHandle (parameter) {
      const requestParameters = Object.assign({}, parameter, { contractId: this.contractId })
      return getExtraContracts(requestParameters).then(res => {
        return res
      })
    },

    editHandle (id) {
      this.$router.push({
        path: `/contract/manage/extra-edit?contractId=${this.contractId}&id=${id}`
      })
    },
    detailHandle (id) {
      this.$router.push({
        path: `/contract/manage/extra-detail?id=${id}`
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
