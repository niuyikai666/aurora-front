<template>
  <div>
    <div class="table-page-search-wrapper clearfix">
      <a-form layout="inline" :form="form">
        <span class="table-page-search-submitButtons" style="float: right;">
          <a-button @click="resetFormFileds" style="margin-right:16px;">重置</a-button>
          <a-button type="primary" @click="searchHandle">查询</a-button>
        </span>
        <a-form-item label="抖音号/昵称" class="form-item-lenth5" style="float:right; margin-right: 24px;">
          <a-input placeholder="请输入" v-decorator="['tiktokCode']" />
        </a-form-item>
      </a-form>
    </div>
    <s-table
      ref="table"
      row-key="tiktokLiveInfoId"
      :columns="columns"
      :data="getData"
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
import { columnsOperateDetail } from '../columns'
import { getOperateDetailList } from '@/api/task'
import { amountFormat } from '@/utils/util'

export default {
  name: 'ToalCompOperate',
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  components: {
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      amountFormat,
      columns: columnsOperateDetail,
      queryParams: {}
    }
  },
  mounted () {
  },
  methods: {
    getData (parameter) {
      const requestParameters = Object.assign(this.queryParams, parameter, this.params || {})
      return getOperateDetailList(requestParameters).then(res => {
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

<style lang="less" scoped>
.tips {
  color: #ff4d4f;
}
</style>
