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
            <a-form-item label="时间周期" class="label-max-left">
              <a-range-picker
                value-format="YYYY-MM-DD"
                v-decorator="['joinGuildDate']"
                @change="searchHandle"
              />
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 8 || 8" :sm="24">
            <span class="table-page-search-submitButtons" :class="{'up': advanced}">
              <a-button @click="resetFormFileds">重置</a-button>
              <a-button style="margin-left: 12px" type="primary" html-type="submit">查询</a-button>
              <!-- <a @click="toggleAdvanced" style="margin-left: 16px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a> -->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      :columns="myColumns"
      row-key="id"
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
    <table-modal :visible="visible" :id="id" @cancel="visible = false" :params="queryParams"/>
  </div>
</template>

<script>
import moment from 'moment'
import TableModal from './TableModal'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { myColumns } from '../tableColumns'
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
    TableModal
  },
  data () {
    return {
      queryParams: {},
      form: this.$form.createForm(this),
      advanced: true,
      myColumns,
      treeData: [],
      visible: false,
      id: '',
      dateRange: []
    }
  },
  mounted () {
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
            this.queryParams = {
              ...values,
              startDate: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              endDate: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
              joinGuildDate: undefined
            }
            resolve(this.queryParams)
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
          this.searchHandle()
        })
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
