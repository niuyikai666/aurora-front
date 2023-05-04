<template>
  <div>
    <v-chart
      :forceFit="true"
      :height="400"
      :data="data"
      :padding="[40, 200, 50, 100]"
      :scale="scale">
      <v-tooltip/>
      <v-axis dataKey="dateTime" :label="label"/>
      <v-axis dataKey="count" :label="labelformat" :title="title"/>
      <v-legend position="right-center" :hoverable="false"></v-legend>
      <v-interval position="dateTime*count" :opacity="1" :color="color"/>
    </v-chart>
  </div>
</template>

<script>
const scale = [{
  dataKey: 'count',
  alias: ' '
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
const color = ['prop', ['#7b859e', '#eac871', '#d28972', '#a1d9b8', '#a2cde9', '#9a8ac8', '#76a5a6', '#e9b17e', '#85a0ee', '#FF6A84']]

  export default {
    props: {
      data: {
        type: Array,
        default: null
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
        adjust: [{
          type: 'dodge',
          marginRatio: 1 / 32
        }]
      }
    },
    mounted () {
    }
  }
</script>
