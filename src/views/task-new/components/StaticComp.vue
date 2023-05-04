<template>
  <a-card
    class="card-title-normal"
    title="拉新各阶段完成数量(仅显示2022年入驻的拉新主播数据)"
    :bordered="false"
    :loading="loading"
  >
    <div slot="extra">
      <a-button-group class="btn-group">
        <a-button
          v-for="(item, index) in timeRange"
          :key="index"
          :class="{'active': activeTimeIndex === index}"
          @click="change(index)"
        >{{ timeRange[index].text }}</a-button>
      </a-button-group>
    </div>
    <div>
      <div ref="chart" style="width: 100%; min-height: 600px;"></div>
    </div>
  </a-card>
</template>

<script>
// import { amountFormat } from '@/utils/util'
import { getNewTaskStatic } from '@/api/task'

export default {
  name: 'ToalComp',
  components: {
  },
  data () {
    return {
      loading: false,

      currTime: 1,
      activeTimeIndex: 0,
      timeRange: [
        {
          text: '首播第1-30天',
          value: 1
        },
        {
          text: '首播第31-60天',
          value: 2
        },
        {
          text: '首播第61-90天',
          value: 3
        }
      ],

      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          left: 0
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 0,
              formatter: function (params) {
                var newParamsName = ''
                var paramsNameNumber = params.length
                var provideNumber = 12
                var rowNumber = Math.ceil(paramsNameNumber / provideNumber)
                if (paramsNameNumber > provideNumber) {
                    for (var p = 0; p < rowNumber; p++) {
                        var tempStr = ''
                        var start = p * provideNumber
                        var end = start + provideNumber
                        if (p === rowNumber - 1) {
                            tempStr = params.substring(start, paramsNameNumber)
                        } else {
                            if (p > 2) {
                                tempStr = '...'
                                newParamsName += tempStr
                                break
                            } else {
                                tempStr = params.substring(start, end)
                                if (p < 2) {
                                    tempStr += '\n'
                                }
                            }
                        }
                        newParamsName += tempStr
                    }
                } else {
                    newParamsName = params
                }
                return newParamsName
              }
            },
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            min: 0,
            max: 20000,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '本月拉新招募&运营&签约人提成金额',
            type: 'bar',
            color: 'rgba(82, 76, 214, 0.85)',
            barWidth: '40%',
            data: []
          },
          {
            name: '主播数',
            type: 'line',
            yAxisIndex: 1,
            color: '#38C9BD',
            data: []
          }
        ]
      },

      labels: [],
      amountArr: [],
      artistsArr: []
    }
  },
  async mounted () {
    this.getData()
  },
  methods: {
    getData () {
      getNewTaskStatic(this.currTime).then(res => {
        const arr1 = []
        const arr2 = []
        const arr3 = []
        res.forEach(item => {
          arr1.push(item.roleExplain)
          arr2.push(item.recruitAndOperatorStatis)
          arr3.push(item.actorCount)
        })

        this.labels = arr1
        this.amountArr = arr2
        this.artistsArr = arr3

        this.$nextTick(() => {
          this.getChart()
        })
      })
    },
    change (index) {
      this.activeTimeIndex = index
      this.currTime = this.timeRange[this.activeTimeIndex].value
      this.getData()
    },

    getChart () {
      this.option.xAxis[0].data = this.labels
      this.option.series[0].data = this.amountArr
      this.option.series[1].data = this.artistsArr

      const max = [this.getArrMinMax(this.amountArr).max, this.getArrMinMax(this.artistsArr).max]
      const min = [this.getArrMinMax(this.amountArr).min, this.getArrMinMax(this.artistsArr).min]
      this.option.yAxis.forEach((item, index) => {
        item.max = max[index]
        item.min = min[index]
        if (item.max > 0) {
            const maxDigit = Math.floor(Math.log(Math.abs(item.max)) / Math.log(10)) - 1
            const maxMultiple = Math.pow(10, maxDigit)
            const resMax = Math.ceil((Math.abs(item.max) * 1.2) / maxMultiple) * maxMultiple
            item.max = resMax + (5 - (resMax % 5)) // 因 （item.interval = (item.max - item.min) / 5）划分为5等份, 如果保证数轴为整数，故做取余处理
        } else {
            item.max = 0
            // 这里如果最大值<= 0，我直接取0， 根据需求自己确定
        }
        if (item.min >= 0) {
            item.min = 0
        } else {
            const minDigit = Math.floor(Math.log(-item.min) / Math.log(10)) - 1
            const minMultiple = Math.pow(10, minDigit)
            const value = (Math.ceil((Math.abs(item.min) * 1.2) / minMultiple) * minMultiple)
            item.min = -value.toFixed(2)
        }
        item.interval = (item.max - item.min) / 5
      })
      this.myChart && this.myChart.dispose()
      this.myChart = this.$echarts.init(this.$refs.chart)
      this.myChart.setOption(this.option)
    },

    getArrMinMax (arr) {
      const newArr = JSON.parse(JSON.stringify(arr))
      const data = newArr.sort((a, b) => {
        return a - b
      })
      return {
        min: data[0],
        max: data[data.length - 1]
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .btn-group {
    .ant-btn {
      height: 28px;
    }
  }
</style>
