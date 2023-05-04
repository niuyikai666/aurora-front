<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="结算月份">
              <a-month-picker :allow-clear="false" value-format="YYYY-MM" v-decorator="['monthCycle']" @change="searchHandle"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="主播抖音号">
              <a-input placeholder="请输入主播抖音号/抖音号原" v-decorator="['tiktokCodeOrTiktokCodeOrig']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="主播昵称">
              <a-input placeholder="请输入主播昵称" v-decorator="['nickName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="在会状态">
              <a-select placeholder="请选择" v-decorator="['retired']" @change="searchHandle">
                <a-select-option :value="1">退会</a-select-option>
                <a-select-option :value="0">在会</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="金数据关系">
              <a-select placeholder="请选择" v-decorator="['hasGold']" @change="searchHandle">
                <a-select-option :value="1">有</a-select-option>
                <a-select-option :value="0">无</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="确认情况">
              <a-select placeholder="请选择" v-decorator="['confirmStateCode']" @change="searchHandle">
                <a-select-option :value="0">待确认</a-select-option>
                <a-select-option :value="1">已确认</a-select-option>
              </a-select>
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
            <div class="flex-justify mb16">
              <div class="text">
                <span v-if="times.isShow">{{ nowMonth }}月关系确认时间：{{ dateText }}</span>
              </div>
              <div>
                <a-popconfirm
                  overlayClassName="normal-comfirm"
                  ok-text="立即同步"
                  cancel-text="取消"
                  @confirm="comfireRelation">
                  <div slot="title" class="warning-comfirm">
                    <div>是否立即确认选中的{{ selectedRowKeys.length }}条结算关系</div>
                  </div>
                  <a-button class="mr16" type="primary" v-if="permission.includes('tiktok_settle_feedback_sync_cofirm')">同步到待确认</a-button>
                </a-popconfirm>
                <a-button type="primary" @click="download">
                  <svg-icon icon-class="export-icon" class="import-icon"></svg-icon>
                  导出
                </a-button>
              </div>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      :columns="recordColumns"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      row-key="id"
      :data="loadData"
      :scroll="{x: 2000}"
      ref="table"
    >
      <div slot="nickName" slot-scope="text, record">
        <p>{{ record.nickName }}</p>
        <p>抖音号: {{ record.tiktokCode }}</p>
        <p>抖音号(原): {{ record.tiktokCodeOrg }}</p>
      </div>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="seeRecord(record)">反馈记录</a-button>
      </span>
    </s-table>
    <record-table :visible="visible" :id="id" @cancel="visible = false"/>
  </div>
</template>

<script>
import recordTable from './recordTable'
import { feedbackConfirm } from '@/api/commission'
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { recordColumns } from '../tableColumns'
export default {
  props: {
    fn: {
      type: Function,
      default: null
    },
    times: {
      type: [Object, String],
      default: null
    }
  },
  components: {
    STable,
    recordTable
  },
  data () {
    return {
      numberFormat,
      queryParams: {},
      form: this.$form.createForm(this),
      advanced: true,
      visible: false,
      recordColumns,
      selectedRowKeys: [],
      nowMonth: '',
      nowDate: '',
      id: ''
    }
  },
  created () {
    this.nowMonth = moment(new Date()).subtract(1, 'months').format('M')
    this.nowDate = moment(new Date()).subtract(1, 'months').format('YYYY-MM')
    this.queryParams.monthCycle = this.nowDate
  },
  mounted () {
    this.form.setFieldsValue({
      monthCycle: this.nowDate
    })
  },
  computed: {
    dateText () {
      if (!this.times || !this.times.startDate) {
        return ''
      }
      return moment(this.times.startDate).format('MM-DD') + ' 00:00' + ' 至 ' + moment(this.times.endDate).format('MM-DD') + ' 23:59'
    },
    ...mapGetters(['permission'])
  },
  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams)
      return this.fn(params).then(res => {
        return res
      })
    },
    disabledDate (current) {
      return current > moment().subtract(0, 'days')
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetFormFileds () {
      this.form.resetFields()
      this.searchHandle()
    },
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const queryParams = {
              ...values
            }
            resolve(queryParams)
          }
        })
      })
    },
    download () {
      this.getParams().then(res => {
        let url = ''
        const path = `${process.env.VUE_APP_API_BASE_URL}/settle/month/operation/feedback/list/export`
        for (const key in res) {
          if ((res[key] || res[key] === false) && key !== 'page' && key !== 'size' && key !== 'type') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
        window.location.href = path + url
      })
    },
    searchHandle (e) {
      e && e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.queryParams = {
              ...values,
              monthCycle: values.monthCycle || this.nowDate
            }
            if (!values.monthCycle) {
              this.form.setFieldsValue({
                monthCycle: this.nowDate
              })
            }
            this.$nextTick(() => {
             this.$refs.table.refresh(true)
            })
          }
        })
      })
    },
    comfireRelation () {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error('请选择主播')
        return
      }
      console.log(this.selectedRowKeys)
      feedbackConfirm({
        feedbackIds: this.selectedRowKeys
      }).then(res => {
        this.$message.success('操作成功')
        this.$refs.table.refresh()
      })
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    feedback (val) {
      this.relationVisible = true
      this.data = val
    },
    seeRecord (val) {
      this.id = val.tiktokLiveInfoId
      this.visible = true
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
.text{
  color: #755DD7;
  line-height: 32px;
}
.warning-comfirm{
  color: #e92525;
  .tx-center{
    margin-top: 5px;
    text-align:center;
  }
  .font-weight{
    font-weight: 600;
  }
}
</style>
