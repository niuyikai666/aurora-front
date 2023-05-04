<template>
  <div>
    <v-chart :forceFit="true" :height="500" :data="data" :padding="padding" :scale="scale">
      <v-tooltip
        :htmlContent="htmlContent"
      />
      <v-axis dataKey="dateTime" :label="label" :tickLine="tickLine"/>
      <v-axis dataKey="value" :label="labelformat" :title="title"/>
      <v-legend position="right-center" :hoverable="false"></v-legend>
      <v-interval position="dateTime*value" :opacity="1" :color="color"/>
    </v-chart>
  </div>
</template>

<script>
import { amountFormatFunc } from '@/utils/util'

const scale = [{
  dataKey: 'value',
  alias: '.'
}]

const label = {
  textStyle: {
    fill: '#aaaaaa'
  }
}

const title = {
  offset: 80
}

const tickLine = {
  alignWithLabel: false,
  length: 0
}

const labelformat = {
  textStyle: {
    fill: '#aaaaaa'
  },
  formatter: function formatter (text) {
    return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
}
const color = ['name', ['#7b859e', '#eac871', '#d28972', '#a1d9b8', '#a2cde9', '#9a8ac8', '#76a5a6', '#e9b17e', '#85a0ee', '#FF6A84']]

  export default {
    name: 'BarNum',
    props: {
      data: {
        type: Array,
        default: null
      },
      num: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        scale,
        label,
        tickLine,
        title,
        labelformat,
        color,
        padding: 'auto'
      }
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
                      <i style="background-color: ${item.color};width:18px;height:10px;border-radius:0""></i>
                      <p>${item.name}</p>
                    </div>
                    <div class="right">${amountFormatFunc(item.value)}</div>
                  </li>`
        })
        return html
      }
    }
  }
</script>
