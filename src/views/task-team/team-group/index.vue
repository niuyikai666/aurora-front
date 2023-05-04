<template>
  <div>
    <div class="top-bar">
      <div class="title-con">
        <div class="title">
          任务总览
          <span class="card-title-desc" v-if="updateTime">数据更新时间{{ updateTime }}</span>
          <span class="card-title-desc ml24" v-if="updateTime">数据截止至{{ dateUpdateTime }}</span>
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
    <a-card
      style="margin-top:24px;"
      :bordered="false"
    >
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
        <a-statistic title="本月道具总流水(元)" :value="task.propReward && amountFormat(task.propReward, true, 1) || '0'" />
        <a-statistic title="道具流水占比(%)" :value="task.propRewardRatio && amountFormat(task.propRewardRatio, true, 2) + '%' || '0'" />
        <a-statistic style="opacity: 0;" title="" :value="0" />
      </div>
    </a-card>
    <complete-comp :params="queryParams" />
    <a-card
      style="margin-top:24px;"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="tabActiveKey"
      @tabChange="key => handleTabChange(key)"
    >
      <div slot="tabBarExtraContent">
      </div>
      <div v-if="tabActiveKey === 'tab1'">
        <table1 :params="queryParams" />
      </div>
      <div v-if="tabActiveKey === 'tab2'">
        <table2 :params="queryParams" />
      </div>
      <!-- <div v-if="tabActiveKey === 'tab3'">
        <table-recruit :params="queryParams" />
      </div> -->
      <div v-if="tabActiveKey === 'tab4'">
        <table-operate :params="queryParams" />
      </div>
      <div v-if="tabActiveKey === 'tab5'">
        <table-squared :params="queryParams" />
      </div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { amountFormat } from '@/utils/util'
import CompleteComp from '../components/CompleteComp'
import Table1 from './components/Table1'
import Table2 from './components/Table2'
import TableRecruit from '../components/TableRecruit'
import TableRecruitMonth from '../components/TableRecruitMonth'
import TableOperate from '../components/TableOperate'
import TableSquared from '../components/TableSquared'
import { getGroupLeaderMonthCommissionUpdateTime, getGroupCompanyInfo } from '@/api/task'
export default {
  name: 'TeamMember',
  components: {
    Table1,
    Table2,
    TableRecruit,
    TableRecruitMonth,
    TableOperate,
    CompleteComp,
    TableSquared
  },
  data () {
    return {
      amountFormat,
      tabList: [
        { key: 'tab1', tab: '小组任务进度' },
        { key: 'tab2', tab: '流水任务明细' },
        // { key: 'tab3', tab: '招募任务' },
        { key: 'tab4', tab: '运营任务' },
        { key: 'tab5', tab: '九宫格入会流水任务' }
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
      updateTime: '',
      dateUpdateTime: '',
      task: {}
    }
  },
  mounted () {
    this.getTotalHandle()
    this.getTaskInfo()
  },
  methods: {
    getTaskInfo () {
      getGroupCompanyInfo({ monthCycle: this.queryParams.monthCycle, type: 1 }).then(res => {
        this.task = res
      })
    },
    handleTabChange (key) {
      this.tabActiveKey = key
    },

    change (index) {
      // if (this.activeTimeIndex === index) {
      //   this.setParams(null, '')
      // } else {
      //   this.setParams(index, this.timeRange[index].value)
      // }
      this.setParams(index, this.timeRange[index].value)
    },
    getTotalHandle () {
      getGroupLeaderMonthCommissionUpdateTime({
        monthCycle: this.queryParams.monthCycle
      }).then(res => {
        this.updateTime = res.updateTime && moment(res.updateTime).format('YYYY-MM-DD HH:mm') || '--'
        this.dateUpdateTime = res.dateUpdateTime && moment(res.dateUpdateTime).format('YYYY-MM-DD HH:mm') || '--'
      })
    },
    changeTime () {
      this.setParams(2, this.timeRange[2].value)
    },
    setParams (index, time) {
      this.activeTimeIndex = index
      this.queryParams.monthCycle = time
      this.$nextTick(() => {
        this.getTaskInfo()
      })
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
  .card-title-desc{
    font-size: 12px;
    color:#909399;
    display: inline-block;
  }
  .top-bar {
    .title-con {
      .title {
        font-weight: 500;
      }
    }
  }

  .task-content {
    display: flex;
    .ant-statistic {
      position: relative;
      margin-right: 18px;
      .ant-statistic-content-value-decimal {
        font-size: 28px;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
      &::after {
        display: flex;
        position: absolute;
        right: 0;
        top: 0;
        content: '';
        height: 100%;
        border-right: solid 1px rgba(0, 0, 0, 1);
        opacity: 0.06;
      }
      flex: 1;
      .ant-statistic-title {
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }
      .ant-statistic-content {
        font-weight: 500;
        font-size: 28px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  .static-content {
    display: flex;
    margin-top: 24px;
    /deep/ .ant-statistic {
      position: relative;
      margin-right: 18px;
      .ant-statistic-content-value-decimal {
        font-size: 28px;
      }
      &:last-child {
        &::after {
          display: none;
        }
      }
      flex: 1;
      .ant-statistic-title {
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }
      .ant-statistic-content {
        font-weight: 500;
        font-size: 28px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
</style>
