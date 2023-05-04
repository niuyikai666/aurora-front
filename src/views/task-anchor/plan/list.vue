<template>
  <div>
    <a-card class="card-custom" :bordered="false">
      <div slot="title">
        主播任务查询
      </div>
      <div slot="extra" href="#">
        <month-comp v-model="queryParams.monthCycle" />
      </div>
    </a-card>
    <div
      style="background-color:#fff; padding: 30px 24px 6px 24px; margin-top:24px;"
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
              <a-form-item label="招募">
                <a-input placeholder="请输入" v-decorator="['recruitName']" />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="运营">
                  <a-input placeholder="请输入" v-decorator="['operateName']" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="签约人">
                  <a-input placeholder="请输入" v-decorator="['signedName']" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="讲师">
                  <a-input
                    placeholder="请输入"
                    v-decorator="['lecturerName']"
                  />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="组长">
                  <a-input placeholder="请输入" v-decorator="['groupName']" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="分公司">
                  <a-input placeholder="请输入" v-decorator="['companyName']" />
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="(!advanced && 8) || 16" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :class="{ up: advanced }"
              >
                <a-button @click="resetFormFileds">重置</a-button>
                <a-button
                  style="margin-left: 12px"
                  type="primary"
                  @click="searchHandle"
                >
                  查询
                </a-button>
                <a @click="toggleAdvanced" style="margin-left: 16px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
    </div>

    <a-card
      class="mt24"
      :bordered="false"
      :tab-list="tabList"
      :active-tab-key="activeKey"
      @tabChange="onTabChange"
    >
      <span slot="tabExchange" slot-scope="item">
        {{ item.tabName }}
        <a-tooltip placement="top">
          <template slot="title">
            转会主播30天内各级管理提成按照50%发放
          </template>
          <a-icon type="question-circle" />
        </a-tooltip>
      </span>
      <div class="flex-box">
        <div class="box-item" style="color:#303133">
          <select-comp
            v-if="activeKey !== 'exchange'"
            :type="activeKey"
            @change="handleStatusChange"
          />
        </div>
        <a-button class="ml16" type="primary" @click="handleExport">
          <svg-icon
            class="icon"
            icon-class="export"
            style="margin-right:8px; color:#fff;"
          />
          导出
        </a-button>
        <div class="clearfix">
          <a-popover placement="right" :trigger="['click']">
            <template slot="content">
              <div class="pop-wraper">
                <a-checkbox-group
                  v-model="colunmsChecked"
                  @change="checkedChange"
                >
                  <a-row>
                    <a-col :span="8" v-for="li in checkArr" :key="li.dataIndex">
                      <a-checkbox
                        :value="li.dataIndex"
                        style="margin-bottom:10px"
                      >
                        {{ li.title }}
                      </a-checkbox>
                    </a-col>
                  </a-row>
                </a-checkbox-group>
              </div>
            </template>
            <div class="ml10" style="cursor: pointer;">
              <a-icon type="setting" class="pointer" />
              更多指标
            </div>
          </a-popover>
        </div>
      </div>
      <s-table
        style="margin-top:24px;"
        ref="table"
        :row-key="(item, index) => index"
        :columns="tableColums"
        :data="getData"
        :scroll="{ x: tableWidth }"
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
            <dd>
              基线比例:
              {{
                record.isSigned === 0
                  ? '--'
                  : (record.baseMissionRatio * 100).toFixed(2) + '%'
              }}
            </dd>
            <dd>
              进阶比例:
              {{
                record.isSigned === 0
                  ? '--'
                  : (record.advanceMissionRatio * 100).toFixed(2) + '%'
              }}
            </dd>
            <dd>
              总计:
              {{
                record.isSigned === 0
                  ? '--'
                  : (record.actorRevenueRatio * 100).toFixed(2) + '%'
              }}
            </dd>
          </dl>
        </div>
        <template slot="videoContributeDay" slot-scope="text, record">
          <!-- 如果是结算单 并且 完成基线 -->
          <span
            v-if="record.taskDataType === 1 && record.baseMissionState === 1"
          >
            >=5
          </span>
          <span v-else>{{ amountFormat(text, false, 0) }}</span>
        </template>
        <template slot="videoSuperiorCount" slot-scope="text, record">
          <!-- 如果是结算单 并且 完成基线 -->
          <span
            v-if="record.taskDataType === 1 && record.baseMissionState === 1"
          >
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
import SelectComp from '../components/SelectComp'
import { numberFormat, amountFormat } from '@/utils/util'
import MonthComp from '../components/MonthComp'
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
    STable,
    SelectComp
  },
  data() {
    return {
      advanced: false,
      form: this.$form.createForm(this),
      amountFormat,
      numberFormat,

      tabList,
      activeKey: tabList[0].key,
      tableWidth: 3000,
      tableFunc: tabList[0].func,
      completeFunc: tabList[0].completeFunc,
      exportUrl: tabList[0].exportUrl,
      tableColums: [],
      columns: [],
      tabInfo: {},

      queryParams: {
        isOperatorEmployee: 0,
        monthCycle: moment().format('YYYY-MM'),
        taskDataType: '',
        taskStatus: null
      },

      colunmsChecked: [],
      checkArr: [],
      defaultColunm: {
        base: [
          'nickName',
          'joinGuildDate',
          'isSigned',
          'effectiveDay',
          'liveBroadcastDuration',
          'videoContributeDay',
          'videoSuperiorCount',
          'action'
        ],
        'base-video': [
          'nickName',
          'joinGuildDate',
          'isSigned',
          'effectiveDay',
          'liveBroadcastDuration',
          'videoContributeDay',
          'videoSuperiorCount',
          'recommendTenHundredsCount',
          'recommendTenThousandsCount',
          'recommendHundredThousand',
          'action'
        ],
        outer: [
          'nickName',
          'joinGuildDate',
          'isSigned',
          'supportBeginTime',
          'supportEndTime',
          'supportMonth',
          'effectiveDay',
          'action'
        ],
        video: [
          'nickName',
          'joinGuildDate',
          'isSigned',
          'manyPeopleVideoFlow',
          'guildReward',
          'otherGuildReward',
          'manyPeopleVideoAverageFlow',
          'manyPeopleVideoAverageFlowLastMonth',
          'manyPeopleVideoAverageFlowIncrease',
          'effectiveDay',
          'liveBroadcastDuration'
        ],
        vertical: [
          'nickName',
          'isMature',
          'validDays',
          'actorLiveFlow',
          'operatorCommission',
          'operatorEmployeeName',
          'signedEmployeeName',
          'recruitEmployeeName',
          'lecturerEmployeeName',
          'action'
        ],
        exchange: [
          'nickName',
          'exchangeDate',
          'thirtyDaysEndTime',
          'startDate',
          'adminRewardOne',
          'adminRewardTwo',
          'signedEmployeeName',
          'recruitEmployeeName'
        ]
      }
    }
  },
  mounted() {
    this.columns = [...this.tabList[0].columns, ...this.extraColumns]
  },
  methods: {
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    getData(parameter) {
      const requestParameters = Object.assign({}, parameter, this.queryParams)
      // this.createDownloadUrl(requestParameters)
      return this.tableFunc(requestParameters).then((res) => {
        return res
      })
    },
    onTabChange(key) {
      let columns = []
      if (this.$refs.table) {
        this.$refs.table.localDataSource = []
      }
      this.queryParams.taskDataType = ''
      this.queryParams.taskStatus = null
      if (this.timer) clearTimeout(this.timer)
      this.tabInfo = tabList.find((tab) => tab.key === key)
      this.activeKey = key
      this.tableWidth = this.tabInfo.width
      this.tableFunc = this.tabInfo.func
      this.completeFunc = this.tabInfo.completeFunc
      this.exportUrl = this.tabInfo.exportUrl
      // 如果是管理员页面 视频宫格列表 则过滤掉运营页面所不需要的字段
      if (this.activeKey === 'video') {
        columns = this.tabInfo.columns.filter(item => item.dataIndex !== 'lecturerEmployeeName' && item.dataIndex !== 'signedEmployeeName' && item.dataIndex !== 'recruitEmployeeName' && item.dataIndex !== 'operatorEmployeeName')
      } else {
        columns = this.tabInfo.columns
      }
      this.columns = [...columns, ...this.extraColumns]
      this.resetFormFileds()
    },
    resetFormFileds() {
      this.form.resetFields()
      this.queryParams = {
        isOperatorEmployee: 0,
        monthCycle: this.queryParams.monthCycle,
        taskDataType: ''
      }
      this.$nextTick(() => {
        this.$refs.table.refresh(true)
      })
    },
    searchHandle() {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParams = {
            ...this.queryParams,
            ...values
          }
          this.$refs.table.refresh(true)
        }
      })
    },
    handleStatusChange(key) {
      this.queryParams = {
        ...this.queryParams,
        taskStatus: key === 'null' ? null : key
      }
      this.$refs.table.refresh(true)
    },
    checkedChange() {
      this.tableColums = this.columns.filter(
        (item) =>
          this.colunmsChecked.includes(item.dataIndex) ||
          this.defaultColunm[this.activeKey].includes(item.dataIndex)
      )
      localStorage.setItem(
        `anchor-${this.activeKey}`,
        JSON.stringify(this.colunmsChecked)
      )
    },
    handleExport() {
      if (!this.exportUrl) {
        this.$message.error('暂无导出接口')
        return
      }
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}${
        this.exportUrl
      }?${qs.stringify(this.queryParams)}`
    }
  },
  computed: {
    completeDescription() {
      if (this.activeKey === 'base') {
        return '完成基线任务数'
      } else if (this.activeKey === 'base-video') {
        return '完成基线任务数'
      } else if (this.activeKey === 'outer') {
        return '完成最高档主播数'
      } else if (this.activeKey === 'video') {
        return '完成过程任务主播数'
      } else if (this.activeKey === 'vertical') {
        return '完成垂类优质任务主播数'
      } else {
        return '-'
      }
    }
  },
  watch: {
    'queryParams.monthCycle'() {
      this.queryParams.taskDataType = ''
      this.$nextTick(() => {
        this.$refs.table.refresh(true)
      })
    },
    columns(newValue) {
      if (newValue.length === 0) {
        return
      }
      let colunms = [] // 定义选中的colunm
      if (localStorage.getItem(`anchor-${this.activeKey}`)) {
        colunms = JSON.parse(localStorage.getItem(`anchor-${this.activeKey}`))
      } else {
        colunms = []
      }
      localStorage.setItem(`anchor-${this.activeKey}`, JSON.stringify(colunms))
      this.colunmsChecked = colunms
      this.checkArr = newValue.filter(
        (item) => !this.defaultColunm[this.activeKey].includes(item.dataIndex)
      )
      this.tableColums = newValue.filter(
        (item) =>
          colunms.includes(item.dataIndex) ||
          this.defaultColunm[this.activeKey].includes(item.dataIndex)
      )
    }
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
