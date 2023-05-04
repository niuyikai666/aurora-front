<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="抖音号/昵称" class="form-item-lenth6">
              <a-input placeholder="请输入" v-decorator="['actorSearch']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="运营名称">
              <a-input placeholder="请输入" v-decorator="['operatorName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8 || 8" :sm="24">
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
      row-key="tiktokLiveInfoId"
      :columns="columns"
      :data="getData"
      :scroll="{x: 1000}"
    >
      <template slot="tiktokLiveName" slot-scope="text, record">
        <div class="flex-box">
          <div class="box-item">
            <p>{{ record.tiktokLiveName }}</p>
            <p>抖音号: {{ record.tiktokCode || '--' }}</p>
            <p>抖音号原: {{ record.tiktokCodeOrig || '--' }}</p>
          </div>
        </div>
      </template>
    </s-table>
  </div>
</template>

<script>
import { STable } from '@/components'
import { columnsTotal } from '../../columns'
import { getMemberTotalList } from '@/api/task'
import { amountFormat } from '@/utils/util'

export default {
  name: 'ToalComp2',
  props: {
    params: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    STable
  },
  data () {
    return {
      amountFormat,
      columns: [],
      form: this.$form.createForm(this),
      queryParams: {}
    }
  },
  mounted () {
    this.columns = columnsTotal.filter(item => item.dataIndex !== 'agentName')
  },
  methods: {
    getData (parameter) {
      const requestParameters = Object.assign(this.queryParams, parameter, this.params || {})
      return getMemberTotalList(requestParameters).then(res => {
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
