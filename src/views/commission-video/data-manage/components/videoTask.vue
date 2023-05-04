<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="分公司">
              <a-input placeholder="请输入" v-decorator="['companyName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="小组">
              <a-input placeholder="请输入" v-decorator="['groupName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button @click="resetFormFileds">重置</a-button>
              <a-button style="margin-left: 12px" type="primary" html-type="submit">查询</a-button>
            </span>
          </a-col>
          <a-col :span="24">
            <div class="flex-justify mb16">
              <a-button type="primary" @click="exempt">豁免</a-button>
              <div>
                <a-button type="primary" class="mr10" @click="importVisible = true">
                  <svg-icon icon-class="import-icon" class="import-icon"></svg-icon>
                  导入
                </a-button>
                <a-button type="primary" @click="download">
                  <svg-icon icon-class="export-icon" class="import-icon"></svg-icon>
                  导出分公司与小组关系
                </a-button>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      :columns="videoTaskColumns"
      row-key="id"
      :data="loadData"
      :scroll="{x: 1200}"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      ref="table"
    />
    <import-modal
      title="导入"
      :visible="importVisible"
      @cancel="importVisible = false"
      :templateUrl="templateUrl"
      :fn="importVideoTask"
      :uploadUrl="uploadUrl"
      :errorUrl="errorUrl"
      @refresh="refresh"/>
    <exempt-modal
      :visible="visible"
      :data="selectedRowKeys"
      @cancel="visible = false"
      @refresh="refresh"
    />
  </div>
</template>

<script>
import importModal from './importModal'
import exemptModal from './exemptModal'
import moment from 'moment'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { videoTaskColumns } from '../tableColumns'
import { importVideoTask } from '@/api/commission-video'
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
    STable,
    importModal,
    exemptModal
  },
  data () {
    return {
      importVideoTask,
      videoTaskColumns,
      id: '',
      importVisible: false,
      queryParams: {},
      form: this.$form.createForm(this),
      templateUrl: process.env.VUE_APP_API_BASE_URL + '/wechat/info/download/taskTarget/template',
      uploadUrl: process.env.VUE_APP_API_BASE_URL + '/wechat/info/import/taskTarget',
      errorUrl: process.env.VUE_APP_API_BASE_URL + '/wechat/info/download/taskTarget/error',
      selectedRowKeys: [],
      visible: false
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
        monthDate: this.monthDate || moment().format('YYYY-MM')
      }, this.queryParams)
      return this.fn(params).then(res => {
        return res
      })
    },
    resetFormFileds () {
      this.form.resetFields()
      this.searchHandle()
    },
    cancel () {
      this.visible = false
    },
    refresh (B = true) {
      if (B) {
        this.$refs.table.refresh(true)
      } else {
        this.$refs.table.refresh()
      }
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    download () {
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/wechat/info/export/depGroup`
    },
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const queryParams = {
              ...values,
              monthDate: this.monthDate || moment().format('YYYY-MM')
            }
            resolve(queryParams)
          }
        })
      })
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
    },
    exempt () {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error('请选择数据')
        return
      }
      this.visible = true
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
