<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form">
        <a-row :gutter="60">
          <a-col :md="4" :sm="24">
            <a-form-item class="form-item-lenth6">
              <a-input placeholder="请输入主播昵称/ID" v-decorator="['search']" />
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <span class="table-page-search-submitButtons" style="margin-bottom:24px;">
              <a-button @click="resetFormFileds" style="margin-right:16px;">重置</a-button>
              <a-button type="primary" @click="searchHandle">查询</a-button>
            </span>
          </a-col>
          <a-col :md="16" :sm="24">
            <a-button
              type="primary"
              style="color:#fff; float: right;"
              @click="download">
              <svg-icon class="icon aciton-icon-com" icon-class="export-icon"/>
              导出
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      class="my-table"
      ref="table"
      :row-key="(record, index) => index"
      :columns="columns"
      :data="getData"
      :scroll="{x: 1600}"
    >
      <template slot="nickName" slot-scope="text, record">
        <div class="flex-box" @click="showDetail(record)">
          <div class="box-item">
            <p>昵称：{{ record.nickName || '--' }}</p>
            <p>抖音号: {{ record.tiktokCode || '--' }}</p>
            <p>抖音号原: {{ record.tiktokCodeOrig || '--' }}</p>
          </div>
        </div>
      </template>
    </s-table>
    <table-modal :visible="visible" :type="type" :params="params" :tiktokLiveInfoId="tiktokLiveInfoId" @cancel="visible = false"/>
  </div>
</template>

<script>
import TableModal from './TableModal'
import { STable } from '@/components'
import { columnsPerson } from '../tableColumns'
import { getPersonList } from '@/api/commission'
import { amountFormat } from '@/utils/util'

export default {
  name: 'ToalCompOperate',
  props: {
    params: {
      type: Object,
      default: null
    },
    type: {
      type: Number,
      default: null
    }
  },
  components: {
    STable,
    TableModal
  },
  data () {
    return {
      form: this.$form.createForm(this),
      amountFormat,
      columns: columnsPerson(this.type),
      queryParams: {},
      tiktokLiveInfoId: '',
      visible: false
    }
  },
  mounted () {
  },
  methods: {
    getData (parameter) {
      const queryParams = {
        ...this.queryParams,
        type: this.type
      }
      const requestParameters = Object.assign(queryParams, this.params || {}, parameter)
      return getPersonList(requestParameters).then(res => {
        return res
      })
    },
    searchHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParams = {
            ...values
          }
          this.$refs.table.refresh(true)
        }
      })
    },
    resetFormFileds () {
      this.queryParams = {}
      this.form.resetFields()
      this.$refs.table.refresh(true)
    },
    download () {
      const path = `${process.env.VUE_APP_API_BASE_URL}/actor/task/commission/exportCommissionDetailTiktokList?type=${this.type}&monthCycle=${this.params ? this.params.monthCycle : null}${this.queryParams.search ? ('&search=' + this.queryParams.search) : ''}`
      window.location.href = path
    },
    showDetail (val) {
      this.visible = true
      this.tiktokLiveInfoId = val.tiktokLiveInfoId
    }
  },
  watch: {
    params: {
      handler (val) {
        this.$refs.table.refresh(true)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
.table-page-search-wrapper {
  .ant-col {
    .table-page-search-submitButtons {
      position: relative;
      left: -43%;
    }
  }
}
</style>
