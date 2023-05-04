<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="主播ID/昵称" class="label-max-left">
              <a-input placeholder="请输入" v-decorator="['nickNameOrCode']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="任务类型">
              <a-select placeholder="请选择" v-decorator="['missionType']" @change="searchHandle">
                <a-select-option v-for="item in taskType" :key="item.value" :title="item.name">
                  <span>{{ item.name }}</span>
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button @click="resetFormFileds">重置</a-button>
              <a-button style="margin-left: 12px" type="primary" html-type="submit">查询</a-button>
            </span>
          </a-col>
          <a-col :span="24">
            <div class="flex-end">
              <a-button type="primary" class="mr10" @click="download">
                <svg-icon icon-class="export-icon" class="import-icon"></svg-icon>
                导出
              </a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      :columns="myInfluencerColumns"
      :row-key="(record, index) => index"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { myInfluencerColumns } from '../tableColumns'
export default {
  props: {
    fn: {
      type: Function,
      default: null
    },
    monthDate: {
      type: String,
      default: null
    }
  },
  components: {
    STable
  },
  data () {
    return {
      myInfluencerColumns,
      queryParams: {},
      form: this.$form.createForm(this),
      taskType: [{
        name: '拉新',
        value: 1
      }, {
        name: '存量',
        value: 2
      }, {
        name: '拉新转存量',
        value: 3
      }]
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    ...mapGetters(['permission'])
  },
  methods: {
    loadData (params) {
      Object.assign(params, {
        cycleDate: this.monthDate || moment().format('YYYY-MM')
      }, this.queryParams)
      return this.fn(params).then(res => {
        return res
      })
    },
    resetFormFileds () {
      this.form.resetFields()
      this.searchHandle()
    },
    download () {
      this.getParams().then(res => {
        let url = ''
        let path = `${process.env.VUE_APP_API_BASE_URL}`
        for (const key in res) {
          if (res[key] && key !== 'page' && key !== 'size') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
        path += `/wechat/results/operator/downLoad${url}`
        window.location.href = path
      })
    },
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const queryParams = {
              ...values,
              cycleDate: this.monthDate || moment().format('YYYY-MM')
            }
            resolve(queryParams)
          }
        })
      })
    },
    refresh (B = true) {
      if (B) {
        this.$refs.table.refresh(true)
      } else {
        this.$refs.table.refresh()
      }
    },
    searchHandle (e) {
      e && e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.queryParams = {
              ...values
            }
            this.refresh()
          }
        })
      })
    }
  },
  watch: {
    monthDate: {
      handler () {
        this.refresh()
      },
      immediate: false
    }
  }
}

</script>
<style lang='less' scoped>
@import '../index.less';
.table-page-search-wrapper {
  /deep/ .ant-form-inline {
    .ant-form-item {
      &.label-max-left {
        .ant-form-item-label {
          left: -7px;
          width: 110px;
          padding-right: 0;
        }
      }
      &.label-max-left1 {
        .ant-form-item-label {
          left: -7px;
          width: 140px;
          padding-right: 0;
        }
      }
      &.form-flex {
        .ant-form-item-children {
          display: flex;
          .flex-item{
            flex: 1;
          }
          .flex-right{
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
