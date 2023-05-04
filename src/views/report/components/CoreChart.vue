<template>
  <div id="app">
    <div ref="chart" style="width: 100%; min-height: 600px;"></div>
  </div>
</template>

<script>
import { amountFormat } from '@/utils/util'

export default {
  name: 'CoreChart',
  props: {
    legend: {
      type: Array,
      default: null
    },
    chartData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      amountFormat,
      SPLIT_NUMBER: 6,
      option: {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          },
          formatter: function (params) {
            params = params.filter(item => item.seriesIndex === 0 || item.seriesIndex === 2)
            const list = []
            let listItem = ''
            for (var i = 0; i < params.length; i++) {
              list.push(
                '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                  params[i].color +
                  ';margin-right: 5px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                  params[i].seriesName +
                  '</span>&nbsp&nbsp&nbsp&nbsp' +
                  amountFormat(params[i].data)
              )
            }
            listItem = list.join('<br>')
            return '<div class="showBox">' + listItem + '</div>'
         }
        },
        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ['line', 'bar'] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        legend: {
          data: []
        },
        xAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '流水',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '月环比(%)',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '流水',
            type: 'bar',
            color: '#755DD7',
            barWidth: '40%',
            data: []
          },
          {
            name: '线性（流水）',
            type: 'line',
            smooth: true,
            color: '#755DD7',
            symbol: 'none',
            lineStyle: {
              type: 'dashed',
              width: 1.5
            },
            emphasis: {
              lineStyle: {
                width: 1.5	// hover时的折线宽度
              }
            },
            data: []
          },
          {
            name: '月环比（%）',
            type: 'line',
            yAxisIndex: 1,
            color: '#13C5BD',
            smooth: true,
            lineStyle: {
              width: 1.5
            },
            emphasis: {
              lineStyle: {
                width: 1.5	// hover时的折线宽度
              }
            },
            data: []
          },
          {
            name: '线性（月环比（%））',
            type: 'line',
            yAxisIndex: 1,
            color: '#13C5BD',
            symbol: 'none',
            smooth: true,
            lineStyle: {
              type: 'dashed',
              width: 1.5
            },
            emphasis: {
              lineStyle: {
                width: 1.5	// hover时的折线宽度
              }
            },
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    // window.addEventListener('resize', () => {
    //   this.myChart.resize()
    // })
    this.option.legend.data = this.legend
    this.option.yAxis[0].name = this.chartData.yAxisName
    this.option.xAxis[0].data = this.chartData.xData
    this.option.series[0].data = this.chartData.seriesLeft1
    this.option.series[1].data = this.chartData.seriesLeft2
    this.option.series[2].data = this.chartData.seriesRight1
    this.option.series[3].data = this.chartData.seriesRight2
    this.option.series[0].name = this.chartData.seriesLeftTitle1
    this.option.series[1].name = this.chartData.seriesLeftTitle2
    this.option.series[2].name = this.chartData.seriesRightTitle1
    this.option.series[3].name = this.chartData.seriesRightTitle2

    const max = [this.chartData.leftMax, this.chartData.rightMax]
    const min = [this.chartData.leftMin, this.chartData.rightMin]
    this.option.yAxis.forEach((item, index) => {
      item.max = max[index]
      item.min = min[index]
      if (item.max > 0) {
          const maxDigit = Math.floor(Math.log(Math.abs(item.max)) / Math.log(10)) - 1
          const maxMultiple = Math.pow(10, maxDigit)
          item.max = Math.ceil((Math.abs(item.max) * 1.2) / maxMultiple) * maxMultiple
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
    this.myChart = this.$echarts.init(this.$refs.chart)
    this.myChart.setOption(this.option)
  },
  methods: {
  }
}
</script>
