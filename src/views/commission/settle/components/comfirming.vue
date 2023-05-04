<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="结算月份">
              <a-month-picker disabled value-format="YYYY-MM" v-decorator="['monthCycle']"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="主播抖音号" class="label-max-left">
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
            <a-form-item label="结算所属组织" class="label-max-left">
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
            <a-form-item label="结算运营">
              <a-input placeholder="请输入运营人姓名" v-decorator="['operatorEmployeeName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="是否有流水">
              <a-select placeholder="请选择" v-decorator="['hasReward']">
                <a-select-option value="true">是</a-select-option>
                <a-select-option value="false">否</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 24 || 16" :sm="24">
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
                  ok-text="立即确认"
                  cancel-text="取消"
                  @confirm="comfireRelation">
                  <div slot="title" class="warning-comfirm">
                    <div>确认后，当月结算关系将<span class="font-weight">无法修改</span>！</div>
                    <div>是否立即确认？</div>
                  </div>
                  <a-button class="mr16" type="primary" v-if="permission.includes('tiktok_settle_wait_confirm')">确认结算关系</a-button>
                </a-popconfirm>
                <a-button class="mr16" type="primary" @click="timeVisible = true" v-if="permission.includes('tiktok_settle_wait_confirm_date')">设置确认时间</a-button>
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
      :columns="comfireColumns"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      row-key="id"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    >
      <div slot="nickName" slot-scope="text, record">
        <p>{{ record.nickName }}</p>
        <p>抖音号: {{ record.tiktokCode }}</p>
        <p>抖音号(原): {{ record.tiktokCodeOrg }}</p>
      </div>
      <span slot="action" slot-scope="text, record">
        <a-button v-if="permission.includes('tiktok_settle_feedback_commit')" type="link" @click="feedback(record)">关系反馈</a-button>
        <a-button type="link" @click="handleOperateChange(record)">运营变更</a-button>
      </span>
    </s-table>
    <relation-modal
      :data="employee"
      @submit="relationHandle"
      :loading="relationLoading"
      :visible="relationVisible"
      @cancel="relationVisible = false" />
    <relation-operate-modal
      :data="employee"
      @submit="relationOperateHandle"
      :loading="relationOperateLoading"
      :visible="relationOperateVisible"
      @cancel="relationOperateVisible = false" />
    <set-time
      :nowMonth="nowMonth"
      :text="dateText"
      :times="times"
      @submit="timeHandle"
      :loading="timeLoading"
      :visible="timeVisible"
      @cancel="timeVisible = false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import setTime from './setTime'
import relationModal from './relationModal'
import relationOperateModal from './relationOperateModal'
import { comfirmRelation, feedbackHandle, operateChange, setTimes } from '@/api/commission'
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { STable } from '@/components'
import { comfireColumns } from '../tableColumns'
import { getStructureTree } from '@/api/personnel'
import createTree from '@/utils/tree/generateTree'
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
    relationModal,
    relationOperateModal,
    setTime
  },
  data () {
    return {
      numberFormat,
      queryParams: {},
      form: this.$form.createForm(this),
      advanced: true,
      comfireColumns,
      treeData: [],
      selectedRowKeys: [],
      relationVisible: false,
      relationOperateVisible: false,
      relationLoading: false,
      relationOperateLoading: false,
      timeVisible: false,
      timeLoading: false,
      nowMonth: '',
      nowDate: '',
      employee: {}
    }
  },
  created () {
    this.nowMonth = moment(new Date()).subtract(1, 'months').format('M')
    this.nowDate = moment(new Date()).subtract(1, 'months').format('YYYY-MM')
    this.queryParams.monthCycle = this.nowDate
    this.getStructureTreeHandle()
  },
  mounted () {
    this.form.setFieldsValue({
      monthCycle: this.nowDate
    })
  },
  computed: {
    ...mapGetters(['permission']),
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
      Object.assign(params, this.queryParams, {
        confirmStateCode: 0
      })
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
            values.departmentId = values.departmentId && values.departmentId.length > 0 ? values.departmentId[values.departmentId.length - 1] : undefined
            const queryParams = {
              ...values,
              confirmStateCode: 0
            }
            resolve(queryParams)
          }
        })
      })
    },
    download () {
      this.getParams().then(res => {
        console.log(res)
        let url = ''
        const path = `${process.env.VUE_APP_API_BASE_URL}/settle/month/operation/export/list`
        for (const key in res) {
          if ((res[key] || res[key] === false || res[key] === 0) && key !== 'page' && key !== 'size' && key !== 'type') {
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
      comfirmRelation({
        ids: this.selectedRowKeys
      }).then(res => {
        this.$message.success('操作成功')
        this.$refs.table.refresh()
      })
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    feedback (val) {
      this.employee = val
      this.relationVisible = true
      this.data = val
    },
    handleOperateChange (val) {
      this.employee = val
      this.relationOperateVisible = true
      this.data = val
    },
    relationHandle (values) {
      this.relationLoading = true
      feedbackHandle({
        ...values,
        tiktokLiveInfoId: this.data.tiktokLiveInfoId,
        monthCycle: this.nowDate
      }).then(res => {
        this.relationLoading = false
        this.relationVisible = false
        this.$message.success('反馈成功，待管理员处理')
        this.$refs.table.refresh()
      }).catch(() => {
        this.relationLoading = false
      })
    },
    relationOperateHandle (values) {
      this.relationOperateLoading = true
      operateChange({
        ...values,
        tiktokLiveInfoId: this.data.tiktokLiveInfoId,
        monthCycle: this.nowDate
      }).then(res => {
        this.relationOperateLoading = false
        this.relationOperateVisible = false
        this.$message.success('变更成功')
        this.$refs.table.refresh()
      }).catch(() => {
        this.relationOperateLoading = false
      })
    },
    timeHandle (values) {
      this.timeLoading = true
      setTimes({
        monthCycle: this.nowDate,
        ...values
      }).then(res => {
        this.timeLoading = false
        this.timeVisible = false
        this.$message.success('设置成功')
        this.$emit('getTimes')
      }).catch(() => {
        this.timeLoading = false
      })
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
