<template>
  <div>
    <a-card
      class="card-title-normal"
      title="提成总计"
      :bordered="false"
    >
      <div slot="extra">
        <a-button-group class="btn-group btn-group-extra">
          <a-button :class="{'active': activeTimeIndex === 0}" @click="change(0)">{{ timeRange[0].text }}</a-button>
          <a-button :class="{'active': activeTimeIndex === 1}" @click="change(1)">{{ timeRange[1].text }}</a-button>
          <a-month-picker v-model="timeRange[2].value" :disabled-date="disabledDate" value-format="YYYY-MM" @change="changeTime()"><a-button ref="btnGroup" :class="{'active': activeTimeIndex === 2}">{{ timeRange[2].text }}</a-button></a-month-picker>
        </a-button-group>
      </div>
      <div>
        <total-comp :params="queryParams" :type="1"/>
      </div>
    </a-card>
    <a-card
      style="margin-top:24px;"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="tabActiveKey"
      @tabChange="key => handleTabChange(key)"
    >
      <div v-if="tabActiveKey === 'tab1'" >
        <table-person :params="queryParams" :type="1"/>
      </div>
      <div v-if="tabActiveKey === 'tab2'" >
        <table-squared :params="queryParams" :type="1"/>
      </div>
    </a-card>
  </div>
</template>

<script>
import qs from 'qs'
import { amountFormat } from '@/utils/util'
import moment from 'moment'
import TablePerson from '../components/TablePerson'
import TableSquared from '../components/TableSquared'
import TotalComp from '../components/TotalComp'
export default {
  name: 'CommisionStage',
  components: {
    TotalComp,
    TablePerson,
    TableSquared
  },
  data () {
    return {
      amountFormat,
      tabList: [
        { key: 'tab1', tab: '提成明细抖音个播' },
        { key: 'tab2', tab: '提成明细抖音九宫格' }
      ],
      tabActiveKey: 'tab1',

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
      ]
    }
  },
  mounted () {
  },
  methods: {
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
    changeTime () {
      this.setParams(2, this.timeRange[2].value)
    },
    setParams (index, time) {
      this.activeTimeIndex = index
      this.queryParams.monthCycle = time
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
        default:
          break
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
