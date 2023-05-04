<template>
  <v-chart
    :forceFit="true"
    :height="600"
    :data="sourceData"
    :scale="scale"
    :padding="padding"
  >
    <v-tooltip
      :htmlContent="htmlContent"
    />
    <v-axis dataKey="dateTime" />
    <v-axis dataKey="percent" :show="false" />
    <v-legend position="right-top" />
    <v-stack-interval
      position="dateTime*percent"
      :label="label"
      :color="color"
      shape="top-line"
    />
  </v-chart>
</template>

<script>
import { amountFormatFunc } from '@/utils/util'
const DataSet = require('@antv/data-set')

export default {
  name: 'BarPercent',
  props: {
    propData: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      show: false,
      sourceData: [],
      padding: ['auto'],
      scale: [
          {
              dataKey: 'percent',
              min: 0,
              max: 1,
              formatter: function formatter (val) {
                  // if ((val * 100).toFixed(2) < 1) {
                  //   return ' '
                  // } else {
                  //    return (val * 100).toFixed(2) + '%'
                  // }
                  return (val * 100).toFixed(2) + '%'
              }
          }
      ],
      label: [
          'percent',
          {
              position: 'middle',
              offset: 0,
              textStyle: {
                  fill: '#333'
              }
          }
      ],
      color: [
          'name',
          ['#7b859e', '#eac871', '#d28972', '#a1d9b8', '#a2cde9', '#9a8ac8', '#76a5a6', '#e9b17e', '#85a0ee', '#FF6A84']
      ]
    }
  },
  mounted () {
    setTimeout(() => {
      const dv = new DataSet.View().source(this.propData).transform({
        type: 'percent',
        field: 'value', // 统计销量
        dimension: 'name', // 每年的占比
        groupBy: ['dateTime'], // 以不同产品类别为分组
        as: 'percent'
      })
      this.sourceData = dv
    }, 200)
  },
  methods: {
    htmlContent (title, items) {
      return `<div class="g2-tooltip">
                <div class="g2-tooltip-title" style="margin-bottom: 4px;">${items[0].title}</div>
                <ul class="g2-tooltip-list">
                  ${this.createChild(items)}
                </ul>
              </div>`
    },
    createChild (items) {
      var html = ''
      items.forEach(item => {
        html += `<li>
                  <div class="left">
                    <i style="background-color: ${item.color};width:18px;height:10px;border-radius:0"></i>
                    <p>${item.name}</p>
                  </div>
                  <div class="right">${amountFormatFunc(item.value)}</div>
                </li>`
      })
      return html
    }
  },
  watch: {
    propData () {
      const dv = new DataSet.View().source(this.propData).transform({
        type: 'percent',
        field: 'value', // 统计销量
        dimension: 'name', // 每年的占比
        groupBy: ['dateTime'], // 以不同产品类别为分组
        as: 'percent'
      })
      this.sourceData = dv
    }
  }
}

</script>
<style lang="less">
.g2-tooltip:hover{
  display: none!important;
}
</style>
