<template>
  <div>
    <a-card
      title="日活统计（人次）"
      class="card-custom head-mb5"
    >
      <template slot="extra">
        <a-month-picker
          :allowClear="false"
          v-model="daysDate"
          @change="searchHandle"
          value-format="YYYY-MM"/>
      </template>
      <bar :data="dayList" :type="1" v-if="dayList"/>
    </a-card>
    <div class="block"></div>
    <a-card
      title="月活统计（人次）"
      class="card-custom head-mb5"
    >
      <template slot="extra">
        <a-date-picker
          @openChange="handleOpenChange"
          @panelChange="panelChange"
          :open="show"
          mode="year"
          v-model="monthDate"
          value-format="YYYY"
          :allowClear="false"
          format="YYYY"/>
      </template>
      <bar :data="monthList" :type="2" v-if="monthList"/>
    </a-card>
  </div>
</template>
<script>
import bar from './bar'
import { getDaysData, getMonthsData } from '@/api/burying-point'
import moment from 'moment'
export default {
  data () {
    return {
      daysDate: '',
      monthDate: '',
      show: false,
      dayList: '',
      monthList: '',
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            type: 'bar',
            data: [],
            barMaxWidth: '48'
          }
        ]
      }
    }
  },

  components: {
    bar
  },
  created () {
    this.changeDate()
  },
  mounted () {
    this.getDaysData()
    this.getMonthsData()
  },

  methods: {
    getDaysData () {
      getDaysData({
        monthValue: this.daysDate
      }).then(res => {
        const dateArr = []
        const dataArr = []
        res.forEach(item => {
          dateArr.push(item.dayValue)
          dataArr.push(item.timeNum)
        })
        this.dayList = JSON.parse(JSON.stringify(this.option))
        this.dayList.xAxis.data = dateArr
        this.dayList.series[0].data = dataArr
      })
    },
    getMonthsData () {
      getMonthsData({
        yearValue: this.monthDate
      }).then(res => {
        const dateArr = []
        const dataArr = []
        res.forEach(item => {
          item.monthValue = item.monthValue + '月'
          dateArr.push(item.monthValue)
          dataArr.push(item.timeNum)
        })
        this.monthList = JSON.parse(JSON.stringify(this.option))
        this.monthList.xAxis.data = dateArr
        this.monthList.series[0].data = dataArr
      })
    },
    changeDate () {
      this.daysDate = moment().subtract(1, 'day').format('YYYY-MM')
      this.monthDate = moment().subtract(1, 'day').format('YYYY')
    },
    searchHandle () {
      this.getDaysData()
    },
    panelChange (value) {
      const year = moment(value).format('YYYY')
      this.monthDate = year
      this.show = false
      this.getMonthsData()
    },
    disabledDate (current) {
      return current.valueOf() < new Date('2021')
    },
    handleOpenChange (status) {
      this.show = status
    }
  }
}

</script>
<style lang='less' scoped>
.block-desc{
  line-height: 44px;
  font-size: 14px;
  background: #f0f2f5;
}
.card-custom{
  /deep/ .ant-card-body{
    padding: 24px;
    padding-top: 0;
  }
  /deep/ .ant-card-head-title{
    font-size: 18px;
  }
  /deep/ .ant-card-head{
    border: none;
  }
}
.mr5{
  margin-right: 10px;
}
</style>
