<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="主播视频号ID" class="label-max-left">
              <a-input placeholder="请输入主播视频号ID/昵称" v-decorator="['searchKey']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="所属组织" class="label-max-left">
              <a-cascader
                placeholder="请选择"
                v-decorator="['departmentId']"
                :options="treeData"
                change-on-select
                :allow-clear="false"
                expand-trigger="hover"
                :display-render="displayRender"
                @change="searchHandle"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="时间周期" class="label-max-left">
              <a-range-picker
                value-format="YYYY-MM-DD"
                v-decorator="['joinGuildDate']"
                @change="searchHandle"
              />
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 24 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :class="{'up': advanced}">
              <a-button @click="resetFormFileds">重置</a-button>
              <a-button style="margin-left: 12px" type="primary" html-type="submit">查询</a-button>
              <!-- <a @click="toggleAdvanced" style="margin-left: 16px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a> -->
            </span>
          </a-col>
          <a-col :span="24">
            <span class="flex-end">
              <a-button type="primary" @click="download" v-if="permission.includes('wechat_report_platform_export')" >
                <svg-icon icon-class="export-icon" class="import-icon"></svg-icon>
                导出
              </a-button>
              <a-button class="ml10" type="primary" @click="importVisible = true" v-if="permission.includes('wechat_report_detail_daily')">导出日数据明细</a-button>
              <a-button class="ml10" type="primary" @click="tableVisible = true" v-if="permission.includes('wechat_report_detail_daily')">明细导出记录</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      v-if="flag"
      :columns="platformColumns"
      row-key="wechatId"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    >
      <div slot="nickName" slot-scope="text, record">
        <p>{{ record.nickName }}</p>
        <p>视频号: {{ record.platformCode }}</p>
      </div>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="detailHandle(record.wechatId)" style="margin-right:10px">查看明细</a-button>
      </span>
    </s-table>
    <table-modal :visible="visible" :params="queryParams" :id="id" @cancel="visible = false"/>
    <import-modal :visible="importVisible" @cancel="importVisible = false"/>
    <record-table :visible="tableVisible" @cancel="tableVisible = false"/>
  </div>
</template>

<script>
import moment from 'moment'
import importModal from './importModal'
import recordTable from './recordTable'
import TableModal from './TableModal'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { platformColumns } from '../tableColumns'
import { getStructureTree } from '@/api/personnel'
import createTree from '@/utils/tree/generateTree'
import { getNewTime } from '@/api/report'

export default {
  props: {
    fn: {
      type: Function,
      default: null
    }
  },
  components: {
    STable,
    TableModal,
    importModal,
    recordTable
  },
  data () {
    return {
      queryParams: {},
      form: this.$form.createForm(this),
      advanced: true,
      platformColumns,
      treeData: [],
      visible: false,
      importVisible: false,
      tableVisible: false,
      id: '',
      dateRange: [],
      flag: false
    }
  },
  mounted () {
    this.getStructureTreeHandle()
    this.handleGetNewTime()
  },

  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams)
      return this.fn(params).then(res => {
        return res
      })
    },
    resetFormFileds () {
      this.form.resetFields()
      this.searchHandle()
    },
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            values.departmentId = values.departmentId && values.departmentId.length > 0 ? values.departmentId[values.departmentId.length - 1] : undefined
            const queryParams = {
              ...values,
              startDate: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              endDate: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
              joinGuildDate: undefined
            }
            resolve(queryParams)
          }
        })
      })
    },
    handleGetNewTime () {
      getNewTime().then(time => {
        const data = new Date(time)
        this.dateRange = [moment(data).startOf('month').format('YYYY-MM-DD'), time]
        this.form.setFieldsValue({
          joinGuildDate: this.dateRange
        })
        this.$nextTick(() => {
          this.queryParams = {
              startDate: this.dateRange[0],
              endDate: this.dateRange[1],
              joinGuildDate: undefined
          }
          this.flag = true
        })
      })
    },
    download () {
      this.getParams().then(res => {
        let url = ''
        const path = `${process.env.VUE_APP_API_BASE_URL}/wechatReport/export/all/list`
        for (const key in res) {
          if ((res[key] || res[key] === false) && key !== 'page' && key !== 'size' && key !== 'type') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
        window.location.href = path + url
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
    searchHandle (e) {
      e && e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            values.departmentId = values.departmentId && values.departmentId.length > 0 ? values.departmentId[values.departmentId.length - 1] : undefined
            this.queryParams = {
              ...values,
              startDate: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              endDate: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
              joinGuildDate: undefined
            }
            this.$refs.table.refresh(true)
          }
        })
      })
    },
    detailHandle (id) {
      this.id = id
      this.visible = true
    }
  },
  computed: {
    ...mapGetters(['permission'])
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
.mb16{
  margin-bottom:16px;
}
.mr16{
  margin-right: 16px;
}
.box {
    // padding: 10px 0 0 16px;
    /deep/ .ant-checkbox-group {
      .ant-checkbox-group-item {
        width: 30%;
        margin-bottom: 8px;
      }
    }
  }
  .checkbox{
    /deep/ .ant-checkbox-group {
      .ant-checkbox-group-item {
        width: 30%;
        margin-bottom: 8px;
      }
    }
  }
  .checkAll{
    margin-bottom: 8px;
  }
</style>
