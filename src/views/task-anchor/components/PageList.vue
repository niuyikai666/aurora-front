<template>
  <div>
    <a-card
      class="card-custom"
      :bordered="false"
    >
      <div slot="title">
        提成总计
        <a-button type="link">查看详情</a-button>
      </div>
      <div slot="extra" href="#">
        <month-comp v-model="queryParams.monthCycle" />
      </div>
      <div class="static-content">
        <!-- <a-statistic title="签约提成" :value="numberFormat(78)" />
        <a-statistic title="招募提成" :value="numberFormat(78)" />
        <a-statistic title="运营提成" :value="numberFormat(78)" />
        <a-statistic title="预估提成(总计)" :value="numberFormat(78)" /> -->
        <a-statistic title="签约提成" value="--" />
        <a-statistic title="招募提成" value="--" />
        <a-statistic title="运营提成" value="--" />
        <a-statistic title="预估提成(总计)" value="--" />
      </div>
    </a-card>

    <a-card
      class="mt24"
      :bordered="false"
      :tab-list="tabList"
      :active-tab-key="activeKey"
      @tabChange="onTabChange"
    >
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="60">
            <a-col :md="8" :sm="24">
              <a-form-item label="主播昵称/ID" class="form-item-lenth7">
                <a-input placeholder="请输入" v-decorator="['keyword']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item v-if="tabInfo.key !== 'exchange'" label="运营">
                <a-input placeholder="请输入" v-decorator="['operateName']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons" style="margin-bottom:24px;">
                <a-button @click="resetFormFileds" style="margin-right:16px;">重置</a-button>
                <a-button type="primary" @click="searchHandle" :loading="loadingBtn">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="flex-box">
        <div class="box-item" style="color:#303133">
          <span style="font-weight:500;">主播任务完成情况</span>
          <div v-if="completeInfo" style="display:inline-block;">
            <span class="ml16">主播数: {{ completeInfo.totalCount !== null ? amountFormat(completeInfo.totalCount, false) : '-' }}</span>
            <span v-if="tabInfo.key !== 'exchange'" class="ml16">完成基线任务数: {{ completeInfo.baseMissionCompleteCount !== null ? amountFormat(completeInfo.baseMissionCompleteCount, false) : '-' }}</span>
          </div>
        </div>
        <a-button
          v-if="tabInfo.key !== 'exchange'"
          class="ml16"
          type="primary"
          :loading="loadingReview"
          :disabled="!isReview"
          @click="handleReview">{{ !isReviewClick && '数据回查' || '取消数据回查' }}</a-button>
        <a-button class="ml16" type="primary" @click="handleExport"><svg-icon class="icon" icon-class="export" style="margin-right:8px; color:#fff;" />导出</a-button>
      </div>

      <s-table
        v-if="completeInfo"
        style="margin-top:24px;"
        ref="table"
        :row-key="(item, index) => index"
        :columns="tableColumns"
        :data="getData"
        :scroll="{x: tableWidth}"
      >
        <span slot="nickName" slot-scope="text, record">
          <div class="flex-box">
            <div class="box-item">
              <p>{{ record.nickName }}</p>
              <p>抖音号: {{ record.tiktokCode }}</p>
              <p>火山号: {{ record.volcanoCode }}</p>
            </div>
          </div>
        </span>
        <div slot="actorRevenueRatio" slot-scope="text, record">
          <dl>
            <dd>基线比例: {{ (record.baseMissionRatio * 100).toFixed(2) + '%' }}</dd>
            <dd>进阶比例: {{ (record.advanceMissionRatio * 100).toFixed(2) + '%' }}</dd>
            <dd>总计: {{ record.isSigned === 0 ? '--' : (record.actorRevenueRatio * 100).toFixed(2) + '%' }}</dd>
          </dl>
        </div>
        <template slot="videoContributeDay" slot-scope="text, record">
          <!-- 如果是结算单 并且 完成基线 -->
          <span v-if="record.taskDataType === 1 && record.baseMissionState === 1">
            >=5
          </span>
          <span v-else>{{ amountFormat(text, false, 0) }}</span>
        </template>
        <template slot="videoSuperiorCount" slot-scope="text, record">
          <!-- 如果是结算单 并且 完成基线 -->
          <span v-if="record.taskDataType === 1 && record.baseMissionState === 1">
            >=5
          </span>
          <span v-else>{{ amountFormat(text, false, 0) }}</span>
        </template>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import qs from 'qs'
import moment from 'moment'
import { STable } from '@/components'
import TabContent from '@/components/TabContent'
import { numberFormat, amountFormat } from '@/utils/util'
import MonthComp from './MonthComp'
import { tabList } from '../tab'

export default {
  name: 'TaskOperate',
  props: {
    extraColumns: {
      type: Array,
      default: () => []
    }
  },
  components: {
    MonthComp,
    TabContent,
    STable
  },
  data () {
    return {
      form: this.$form.createForm(this),
      amountFormat,
      numberFormat,

      tabList,
      activeKey: tabList[0].key,
      tableWidth: 3000,
      tableFunc: tabList[0].func,
      completeFunc: tabList[0].completeFunc,
      exportUrl: tabList[0].exportUrl,
      tableColumns: [ ...tabList[0].columns, ...this.extraColumns ],
      tabInfo: {},

      queryParams: {
        isOperatorEmployee: 0,
        keyword: '',
        monthCycle: moment().format('YYYY-MM'),
        taskDataType: ''
      },

      completeInfo: null, // 完成情况
      isReview: false, // 是否显示回查
      isReviewClick: false, // 回查是否点击
      loading: false,
      loadingBtn: false,
      loadingReview: false
    }
  },
  mounted () {
    this.handleCompleteFunc()
  },
  methods: {
    handleCompleteFunc (isReviewClick) {
      window.cancle.artistLiveTable && window.cancle.taskAnchor()
      if (this.loading) return
      this.loading = true
      if (isReviewClick !== undefined) {
        this.queryParams.taskDataType = !isReviewClick && 1 || 0
      }
      // this.$refs.table && this.$refs.table.refresh(true)
      this.completeFunc(this.queryParams).then(res => {
        this.completeInfo = JSON.parse(JSON.stringify(res))

        // 根据完成情况返回值settlementDataCount 判断queryParams里面的taskDataType 是1或者是0
        const reviewState = this.getReviewState(this.completeInfo.settlementDataCount)
        // 用户手动点击数据回查时 走用户点击行为
        if (this.queryParams.taskDataType === '') {
          this.queryParams.taskDataType = reviewState && 1 || 0
        }

        // 设置数据回查是否disable
        this.isReview = reviewState

        // 刷新列表
        this.$refs.table && this.$refs.table.refresh(true)
        this.$nextTick(() => {
          this.loading = this.loadingBtn = this.loadingReview = false
        })
      })
    },
    handleReview () {
      this.loadingReview = true
      this.isReviewClick = !this.isReviewClick
      this.handleCompleteFunc(this.isReviewClick)
    },
    getReviewState () {
      // 判断settlementDataCount 大于0 则可展示数据回查 否则disable
      return this.completeInfo.settlementDataCount > 0
    },
    getData (parameter) {
      const requestParameters = Object.assign({}, parameter, this.queryParams)
      // this.createDownloadUrl(requestParameters)
      return this.tableFunc(requestParameters).then(res => {
        return res
      })
    },
    onTabChange (key) {
      this.$refs.table.localDataSource = []
      this.queryParams.taskDataType = ''
      this.loadingReview = false
      if (this.timer) clearTimeout(this.timer)
      this.tabInfo = tabList.find(tab => tab.key === key)
      this.loading = false
      this.activeKey = key
      this.tableWidth = this.tabInfo.width
      this.tableFunc = this.tabInfo.func
      this.completeFunc = this.tabInfo.completeFunc
      this.exportUrl = this.tabInfo.exportUrl
      this.tableColumns = [ ...this.tabInfo.columns, ...this.extraColumns ]
      this.resetFileds()
      this.timer = setTimeout(() => {
        this.handleCompleteFunc()
      }, 500)
    },
    resetFormFileds () {
      this.resetFileds()
      this.$refs.table.refresh(true)
    },
    resetFileds () {
      this.form.resetFields()
      this.queryParams = {
        ...this.queryParams,
        keyword: undefined,
        operateName: undefined
      }
    },
    searchHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loadingBtn = true
          this.queryParams = {
            ...this.queryParams,
            ...values
          }
          this.loading = false
          // this.$refs.table.refresh(true)
          this.handleCompleteFunc()
        }
      })
    },
    handleExport () {
      if (!this.exportUrl) {
        this.$message.error('暂无导出接口')
        return
      }
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}${this.exportUrl}?${qs.stringify(this.queryParams)}`
    }
  },
  watch: {
    'queryParams.monthCycle' () {
        this.handleCompleteFunc()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
