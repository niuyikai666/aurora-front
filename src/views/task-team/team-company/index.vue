<template>
  <div>
    <total-comp :params="queryParams">
      <div slot="extra-btn">
        <div style="text-align:right; flex: 1">
          <a-button-group class="btn-group btn-group-extra">
            <a-button :class="{'active': activeTimeIndex === 0}" @click="change(0)">{{ timeRange[0].text }}</a-button>
            <a-button :class="{'active': activeTimeIndex === 1}" @click="change(1)">{{ timeRange[1].text }}</a-button>
            <a-month-picker v-model="timeRange[2].value" :disabled-date="disabledDate" value-format="YYYY-MM" @change="changeTime()"><a-button ref="btnGroup" :class="{'active': activeTimeIndex === 2}">{{ timeRange[2].text }}</a-button></a-month-picker>
          </a-button-group>
        </div>
      </div>
    </total-comp>
    <a-card
      style="margin-top:24px;"
      :bordered="false"
      :loading="loading"
    >
      <!-- <div class="static-content" style="margin-top:0">
        <a-statistic title="小组任务平均提成" :value="task.averageCommission && amountFormat(task.averageCommission * 100) || 0" suffix="%"/>
        <a-statistic title="0.8%小组个数" :value="task.maxCommission && amountFormat(task.maxCommission, false) || '0'" />
        <a-statistic title="0.4%小组个数" :value="task.minCommission && amountFormat(task.minCommission, false) || '0'" />
        <a-statistic title="日均流水(元)" :value="task.dailyAverageIncome && amountFormat(task.dailyAverageIncome, true, 1) || '0'" />
        <a-statistic title="本月预估流水(元)" :value="task.expectedIncome && amountFormat(task.expectedIncome, true, 1) || '0'" />
      </div>
      <div class="static-content">
        <a-statistic :value="task.propRewardProportionTwo && amountFormat(task.propRewardProportionTwo, false) || '0'" >
          <span slot="title">
            道具占比超过10%小组个数
            <a-popover placement="topLeft">
              <template slot="content">
                <div class="index-crip-content">
                  <p class="title" style="font-size:16px;">指标说明</p>
                  <dl class="list">
                    <dd>统计30%>道具占比>=10%范围的小组</dd>
                    <dd>道具占比=直播明细表中总道具音浪/直播明细表中所有音浪总和*100%</dd>
                  </dl>
                </div>
              </template>
              <a-icon type="question-circle" style="font-size:14px; cursor:pointer;" />
            </a-popover>
          </span>
        </a-statistic>
        <a-statistic title="道具占比超过30%小组个数" :value="task.propRewardProportion && amountFormat(task.propRewardProportion, false) || '0'" />
        <a-statistic style="opacity:0" />
        <a-statistic style="opacity:0" />
        <a-statistic style="opacity:0" />
      </div> -->
      <div class="static-content" style="margin-top:0">
        <a-statistic title="本月总流水(元)" :value="task.totalReward && amountFormat(task.totalReward, true, 1) || '0'" />
        <a-statistic title="本月任务总流水(元)" :value="task.oldAnchorTotalIncome && amountFormat(task.oldAnchorTotalIncome, true, 1) || '0'" />
        <a-statistic title="本月日均流水(元)" :value="task.oldAnchorTotalIncomeCurAvg && amountFormat(task.oldAnchorTotalIncomeCurAvg, true, 1) || '0'" />
        <a-statistic title="本月预估任务总流水(元)" :value="task.oldAnchorTotalIncomeMonthTotal && amountFormat(task.oldAnchorTotalIncomeMonthTotal, true, 1) || '0'" />
        <a-statistic title="预估提成比例(%)" :value="task.groupLeaderCommission && amountFormat(task.groupLeaderCommission, true, 3) + '%' || '0'" />
      </div>
      <div class="static-content" style="margin-top:24px">
        <a-statistic title="昨日总流水(元)" :value="task.yesterdayReward && amountFormat(task.yesterdayReward, true, 1) || '0'" />
        <a-statistic title="昨日任务总流水(元)" :value="task.yesterdayMissionReward && amountFormat(task.yesterdayMissionReward, true, 1) || '0'" />
        <a-statistic :value="task.propRewardExceedOneCount && amountFormat(task.propRewardExceedOneCount, false) || '0'" >
          <span slot="title">
            道具占比超过10%小组个数
            <a-popover placement="topLeft">
              <template slot="content">
                <div class="index-crip-content">
                  <p class="title" style="font-size:16px;">指标说明</p>
                  <dl class="list">
                    <dd>统计30%>道具占比>=10%范围的小组</dd>
                    <dd>道具占比=直播明细表中总道具音浪/直播明细表中所有音浪总和*100%</dd>
                  </dl>
                </div>
              </template>
              <a-icon type="question-circle" style="font-size:14px; cursor:pointer;" />
            </a-popover>
          </span>
        </a-statistic>
        <a-statistic title="道具占比超过30%小组个数" :value="task.propRewardExceedTwoCount && amountFormat(task.propRewardExceedTwoCount, false) || '0'" />
        <a-statistic title="0.5%及以上小组个数/占比" :value="caculateGroup(task)" />
      </div>
    </a-card>
    <complete-comp :params="queryParams" :detail="true" />
    <a-card
      style="margin-top:24px;"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="tabActiveKey"
      @tabChange="key => handleTabChange(key)"
    >
      <div slot="tabBarExtraContent">
        <span v-if="tabActiveKey !== 'tab4' && tabActiveKey !== 'tab6'">
          <a-button type="primary" style="display:inline-block; margin-left: 15px; height:30px;" @click="exportHandle">
            <svg-icon class="icon aciton-icon-com" icon-class="export-icon"/>
            导出
          </a-button>
        </span>
      </div>
      <div v-if="tabActiveKey === 'tab1'">
        <table1 :params="queryParams" />
      </div>
      <div v-if="tabActiveKey === 'tab2'">
        <table2 :params="queryParams" @returnparams="receiveParams" />
      </div>
      <div v-if="tabActiveKey === 'tab3'">
        <table3 :params="queryParams" />
      </div>
      <!-- <div v-if="tabActiveKey === 'tab4'">
        <table-recruit :params="queryParams" />
      </div> -->
      <div v-if="tabActiveKey === 'tab5'">
        <table-operate :params="queryParams" />
      </div>
      <div v-if="tabActiveKey === 'tab6'">
        <table-squared :params="queryParams" />
      </div>
    </a-card>
  </div>
</template>

<script>
import qs from 'qs'
import { amountFormat } from '@/utils/util'
import moment from 'moment'
import TotalComp from '../components/TotalComp'
import CompleteComp from '../components/CompleteComp'
import Table1 from './components/Table1'
import Table2 from './components/Table2'
import Table3 from './components/Table3'
import TableRecruit from '../components/TableRecruit'
import TableRecruitMonth from '../components/TableRecruitMonth'
import TableOperate from '../components/TableOperate'
import TableSquared from '../components/TableSquared'

import { getGroupCompanyInfo } from '@/api/task'
export default {
  name: 'TeamMember',
  components: {
    TotalComp,
    CompleteComp,
    Table1,
    Table2,
    Table3,
    TableRecruit,
    TableRecruitMonth,
    TableOperate,
    TableSquared
  },
  data () {
    return {
      amountFormat,
      tabList: [
        { key: 'tab1', tab: '小组任务进度' },
        { key: 'tab2', tab: '流水任务明细' },
        { key: 'tab3', tab: '分公司流水任务进度' },
        // { key: 'tab4', tab: '招募任务' },
        { key: 'tab5', tab: '运营任务' },
        { key: 'tab6', tab: '九宫格入会流水任务' }
      ],
      tabActiveKey: 'tab1',

      queryParams: {
        order: '',
        companyId: '',
        monthCycle: moment().format('YYYY-MM')
      },

      activeTimeIndex: 0,
      timeRange: [
        {
          text: '本月',
          value: moment().format('YYYY-MM')
        },
        {
          text: '上月',
          value: moment(new Date()).subtract(1, 'months').format('YYYY-MM')
        },
        {
          text: '自定义',
          value: undefined
        }
      ],
      task: {},

      loading: true
    }
  },
  mounted () {
    this.getTaskInfo()
  },
  methods: {
    getTaskInfo () {
      getGroupCompanyInfo({ monthCycle: this.queryParams.monthCycle, type: 0 }).then(res => {
        this.task = res
        this.loading = false
      })
    },
    handleTabChange (key) {
      this.tabActiveKey = key

      // 为了处理全部老主播流水 查询参数
      this.queryParams.operatorName = undefined
      this.queryParams.actorSearch = undefined
    },

    change (index) {
      // if (this.activeTimeIndex === index) {
      //   this.setParams(null, '')
      // } else {
      //   this.setParams(index, this.timeRange[index].value)
      // }
      this.setParams(index, this.timeRange[index].value)
    },
    changeTime () {
      this.setParams(2, this.timeRange[2].value)
    },
    setParams (index, time) {
      this.activeTimeIndex = index
      this.queryParams.monthCycle = time
      this.getTaskInfo()
    },

    caculateGroup (task) {
      return `${task.oneTargetGroupCount && amountFormat(task.oneTargetGroupCount, false) || '0'} / ${task.oneTargetGroupRatio && amountFormat(task.oneTargetGroupRatio, true, 2) + '%' || '0'}`
    },

    exportHandle () {
      switch (this.tabActiveKey) {
        case 'tab1':
          window.location.href = `${process.env.VUE_APP_API_BASE_URL}/mg/exportGroupLeaderMonthCommission?${qs.stringify(this.queryParams)}`
          break
        case 'tab2':
          window.location.href = `${process.env.VUE_APP_API_BASE_URL}/mg/exportOldTiktokLiveInfoList?${qs.stringify(this.queryParams)}`
          break
        case 'tab3':
          window.location.href = `${process.env.VUE_APP_API_BASE_URL}/mg/exportCompanyMonthCommissionList?${qs.stringify(this.queryParams)}`
          break
        case 'tab5':
          window.location.href = `${process.env.VUE_APP_API_BASE_URL}/operator/task/operatorMissionDown?${qs.stringify(this.queryParams)}`
          break
        default:
          break
      }
    },

    receiveParams (params) {
      this.queryParams = {
        ...this.queryParams,
        ...params
      }
    },

    disabledDate (time) {
      return time.valueOf() > Date.now() || time.valueOf() < new Date('2021-12')
    }
  }
}
</script>

<style lang="less" scoped>
  .btn-group {
    margin-left: 12px;
    .ant-btn {
      height: 28px;
      outline: none;
      &:focus:not(.ant-btn-primary):not(.ant-btn-danger), .ant-btn:hover:not(.ant-btn-primary):not(.ant-btn-danger) {
        border: 1px solid;
        border-color: #d9d9d9;
        color:rgba(0, 0, 0, 0.65);
      }
    }
  }
</style>
