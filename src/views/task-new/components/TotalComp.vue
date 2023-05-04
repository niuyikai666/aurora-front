<template>
  <a-card
    class="card-title-normal"
    title="数据总览"
    :bordered="false"
    :loading="loading"
  >
    <div slot="extra">
      <a-button-group class="btn-group">
        <a-button :class="{'active': activeTimeIndex === 0}" @click="change(0)">{{ timeRange[0].text }}</a-button>
        <a-button :class="{'active': activeTimeIndex === 1}" @click="change(1)">{{ timeRange[1].text }}</a-button>
        <a-month-picker v-model="timeRange[2].value" :disabled-date="disabledDate" value-format="YYYY-MM" @change="changeTime()"><a-button :class="{'active': activeTimeIndex === 2}">{{ timeRange[2].text }}</a-button></a-month-picker>
      </a-button-group>
    </div>

    <div class="static-content">
      <a-statistic title="进行中主播数" :value="dataCount.onGoingCount && amountFormat(dataCount.onGoingCount, false) || '--'" />
      <a-statistic title="周期结束主播数" :value="dataCount.finishedCount && amountFormat(dataCount.finishedCount, false) || '0'" />
      <a-statistic title="签约人拉新提成" :value="dataCount.currentSignedMoney && amountFormat(dataCount.currentSignedMoney) || '0.00'" />
      <a-statistic title="招募人拉新提成" :value="dataCount.currentMonthRecruitMoney && amountFormat(dataCount.currentMonthRecruitMoney) || '0.00'" />
      <a-statistic title="运营拉新提成" :value="dataCount.currentMonthOperatorMoney && amountFormat(dataCount.currentMonthOperatorMoney) || '0.00'" />
      <a-statistic title="讲师拉新提成" :value="dataCount.currentMonthOperatorMoney && amountFormat(dataCount.currentLectureMoney) || '0.00'" />
    </div>
  </a-card>
</template>

<script>
import moment from 'moment'
import { amountFormat } from '@/utils/util'
import { getNewTaskTotal } from '@/api/task'

export default {
  name: 'ToalComp',
  components: {
  },
  data () {
    return {
      loading: true,
      amountFormat,

      currTime: moment().format('YYYY-MM'),
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

      dataCount: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      getNewTaskTotal(this.currTime).then(res => {
        this.dataCount = res
        this.$emit('getTime', res.syncTime)
        this.$nextTick(() => {
          this.loading = false
        })
      })
    },
    change (index) {
      this.activeTimeIndex = index
      this.currTime = this.timeRange[this.activeTimeIndex].value
      this.getData()
    },
    changeTime () {
      this.activeTimeIndex = 2
      this.currTime = this.timeRange[this.activeTimeIndex].value
      this.getData()
    },
    disabledDate (time) {
      return time.valueOf() > Date.now() || time.valueOf() < new Date('2021-12')
    }
  }
}
</script>

<style lang="less">
  .btn-group {
    .ant-btn {
      height: 28px;
    }
  }
  .static-content {
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
</style>
