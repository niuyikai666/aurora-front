<template>
  <div>
    <div class="top-bar">
      <div class="title-con">
        <div class="title">
          任务总览
        </div>
        <div style="text-align:right; flex:1;">
          <a-button-group class="btn-group btn-group-extra">
            <a-button :class="{'active': activeTimeIndex === 0}" @click="change(0)">{{ timeRange[0].text }}</a-button>
            <a-button :class="{'active': activeTimeIndex === 1}" @click="change(1)">{{ timeRange[1].text }}</a-button>
            <a-month-picker v-model="timeRange[2].value" :disabled-date="disabledDate" value-format="YYYY-MM" @change="changeTime()"><a-button ref="btnGroup" :class="{'active': activeTimeIndex === 2}">{{ timeRange[2].text }}</a-button></a-month-picker>
          </a-button-group>
        </div>
      </div>
    </div>
    <!-- <a-card
      class="mt24"
      :bordered="false"
    >
      <div slot="title">
        <span>招募任务</span>
        <span class="s2" style="font-size:14px; margin-left:12px;">本月有效招募任务目标: {{ taskRecruit.recruitTaskTargetCount }}</span>
      </div>
      <div class="static-content" style="margin-top:0">
        <a-statistic title="抖音有效招募数" :value="taskRecruit.tiktokEffectRecruitCount && amountFormat(taskRecruit.tiktokEffectRecruitCount, false) || '0'"></a-statistic>
        <a-statistic title="抖音优质招募数" :value="taskRecruit.tiktokHighQualityRecruitCount && amountFormat(taskRecruit.tiktokHighQualityRecruitCount, false) || '0'"></a-statistic>
        <a-statistic title="有效招募总数" :value="taskRecruit.effectRecruitTotal && amountFormat(taskRecruit.effectRecruitTotal, false) || '0'"></a-statistic>
        <a-statistic title="招募提成比例" :value="taskRecruit.recruitCommissionRatio && amountFormat(taskRecruit.recruitCommissionRatio * 100, true, 3) || 0" suffix="%">
        </a-statistic>
      </div>
    </a-card> -->
    <a-card
      class="mt24"
      title="运营任务"
      :bordered="false"
    >
      <div class="static-content" style="margin-top:0">
        <a-statistic title="本月任务总流水" :value="taskOperate.currentMonthReward && amountFormat(taskOperate.currentMonthReward, true, 1) || '0'"/>
        <a-statistic title="昨日任务总流水" :value="taskOperate.yesterdayReward && amountFormat(taskOperate.yesterdayReward, true, 1) || '0'" />
        <a-statistic title="目标1流水金额" :value="taskOperate.targetOneResult && amountFormat(taskOperate.targetOneResult, true, 1) || '0'" />
        <a-statistic title="目标1完成进度" :value="taskOperate.targetOneSpeedRatio && amountFormat(taskOperate.targetOneSpeedRatio, true, 2) || '0'" suffix="%" />
        <a-statistic title="目标2流水金额" :value="taskOperate.targetTwoResult && amountFormat(taskOperate.targetTwoResult, true, 1) || '0'" />
        <a-statistic title="目标2完成进度" :value="taskOperate.targetTwoSpeedRatio && amountFormat(taskOperate.targetTwoSpeedRatio , true, 2) || 0" suffix="%" />
      </div>
      <div class="static-content" style="margin-top:24px;">
        <a-statistic title="今日流水目标" :value="taskOperate.todayRewardTarget && amountFormat(taskOperate.todayRewardTarget, true, 1) || '0'" />
        <a-statistic title="运营提成比例" :value="taskOperate.operatorCommissionRatio && amountFormat(taskOperate.operatorCommissionRatio, true, 3) || 0" suffix="%" />
        <a-statistic value="" style="opacity: 0;" />
        <a-statistic value="" style="opacity: 0;" />
        <a-statistic value="" style="opacity: 0;" />
        <a-statistic value="" style="opacity: 0;" />
      </div>
    </a-card>
    <a-card
      style="margin-top:24px;"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="tabActiveKey"
      @tabChange="key => handleTabChange(key)"
    >
      <div v-if="tabActiveKey === 'tab1'">
        <table-operate-detail :params="queryParams" />
      </div>
      <div v-if="tabActiveKey === 'tab2'">
        <table-recruit-month :params="queryParams" />
      </div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { STable } from '@/components'
import { amountFormat } from '@/utils/util'
import TableOperateDetail from '../components/TableOperateDetail'
import TableRecruitMonth from '../components/TableRecruitMonth'
import { getGroupOperateInfo, getGroupRecruitInfo } from '@/api/task'
export default {
  name: 'TeamOperator',
  components: {
    STable,
    TableOperateDetail,
    TableRecruitMonth
  },
  data () {
    return {
      form: this.$form.createForm(this),
      amountFormat,
      queryParams: {
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
      taskOperate: {},
      taskRecruit: {},

      tabList: [
        { key: 'tab1', tab: '流水任务明细' },
        { key: 'tab2', tab: '月度招募流水' }
      ],
      tabActiveKey: 'tab1'
    }
  },
  mounted () {
    this.getOperate()
    this.getRecruit()
  },
  methods: {
    handleTabChange (key) {
      this.tabActiveKey = key
    },
    getOperate () {
      getGroupOperateInfo(this.queryParams).then(res => {
        this.taskOperate = res
      })
    },

    getRecruit () {
      getGroupRecruitInfo(this.queryParams).then(res => {
        this.taskRecruit = res
      })
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
      this.$nextTick(() => {
        this.getOperate()
        this.getRecruit()
      })
    },

    searchHandle () {
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
    resetFormFileds () {
      this.queryParams = {
        monthCycle: this.queryParams.monthCycle
      }
      this.form.resetFields()
      this.$refs.table.refresh(true)
    },

    disabledDate (time) {
      return time.valueOf() > Date.now() || time.valueOf() < new Date('2021-12')
    }
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
.static-title {
  p {
    margin-bottom: 0;
  }
}
</style>
