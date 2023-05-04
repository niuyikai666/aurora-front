<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="运营分类">
              <a-select
                v-decorator="['actorOperator',{rules: [{ required: false, message: '请选择'}]}]"
                @change="handleChange"
                placeholder="请选择"
              >
                <a-select-option value="yes">
                  有运营主播
                </a-select-option>
                <a-select-option value="no">
                  无运营主播
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="抖音号/抖音号(原)" class="form-item-lenth8">
              <a-input placeholder="请输入" v-decorator="['actorSearch']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="运营名称">
              <a-input placeholder="请输入" v-decorator="['operatorName']" />
            </a-form-item>
          </a-col>
          <a-col :md="24" :sm="24">
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
      :row-key="(record, index) => index"
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
import { getMemberTotalAllList } from '@/api/task'
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
      columns: columnsTotal,
      form: this.$form.createForm(this),
      queryParams: {}
    }
  },
  mounted () {
  },
  methods: {
    getData (parameter) {
      console.log(1, this.queryParams)
      console.log(2, parameter)
      console.log(3, this.params)
      const requestParameters = Object.assign(this.queryParams, parameter, this.params || {})
      return getMemberTotalAllList(requestParameters).then(res => {
        return res
      })
    },

    searchHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParams = {
            ...values
          }
          // this.$refs.table.refresh(true)
        }
      })
    },
    handleChange (e) {
      this.$nextTick(() => {
        this.searchHandle()
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
    },
    queryParams: {
      handler (val) {
        this.queryParams.page && delete this.queryParams.page
        this.queryParams.size && delete this.queryParams.size
        this.$emit('returnparams', this.queryParams)
      },
      deep: true
    }
  }
}
</script>
