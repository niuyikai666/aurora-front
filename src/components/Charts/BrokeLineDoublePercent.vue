<template>
  <div>
    <v-chart
      :forceFit="true"
      :height="height"
      :data="data"
      :scale="scale"
      :padding="[40, 40, 60, 80]"
    >
      <v-tooltip
        :crosshairs="crosshairs"
        :htmlContent="htmlContent"
      />
      <v-axis dataKey="count" :label="label"/>
      <v-legend :attachLast="false" position="bottom-left"/>
      <v-smooth-line position="dateTime*count" color="prop" />
      <v-point position="dateTime*count" color="prop" size="2" shape="circle" :style="style" />
    </v-chart>
  </div>
</template>

<script>
// const data = [{
//   date: '2020-05-01',
//   prop: 'Tokyo',
//   temperature: 1000
// }, {
//   'date': '2020-05-01',
//   'prop': 'London',
//   'temperature': 3.9
// }, {
//   'date': '2020-05-02',
//   'prop': 'Tokyo',
//   'temperature': 1200
// }, {
//   'date': '2020-05-02',
//   'prop': 'London',
//   'temperature': 4.2
// }, {
//   'date': '2020-05-03',
//   'prop': 'Tokyo',
//   'temperature': 1500
// }, {
//   'date': '2020-05-03',
//   'prop': 'London',
//   'temperature': 5.7
// }, {
//   'date': '2020-05-04',
//   'prop': 'Tokyo',
//   'temperature': 5000
// }, {
//   'date': '2020-05-04',
//   'prop': 'London',
//   'temperature': 8.5
// }, {
//   'date': '2020-05-05',
//   'prop': 'Tokyo',
//   'temperature': 3800
// }, {
//   'date': '2020-05-05',
//   'prop': 'London',
//   'temperature': 11.9
// }, {
//   'date': '2020-05-06',
//   'prop': 'Tokyo',
//   'temperature': 9002
// }, {
//   'date': '2020-05-06',
//   'prop': 'London',
//   'temperature': 15.2
// }, {
//   'date': '2020-05-07',
//   'prop': 'Tokyo',
//   'temperature': 10001
// }, {
//   'date': '2020-05-07',
//   'prop': 'London',
//   'temperature': 17
// }, {
//   'date': '2020-05-08',
//   'prop': 'Tokyo',
//   'temperature': 3000
// }, {
//   'date': '2020-05-08',
//   'prop': 'London',
//   'temperature': 16.6
// }, {
//   'date': '2020-05-09',
//   'prop': 'Tokyo',
//   'temperature': 3000
// }, {
//   'date': '2020-05-09',
//   'prop': 'London',
//   'temperature': 14.2
// }, {
//   'date': '2020-05-10',
//   'prop': 'Tokyo',
//   'temperature': 4500
// }, {
//   'date': '2020-05-10',
//   'prop': 'London',
//   'temperature': 10.3
// }, {
//   'date': '2020-05-11',
//   'prop': 'Tokyo',
//   'temperature': 500
// }, {
//   'date': '2020-05-11',
//   'prop': 'London',
//   'temperature': 6.6
// }, {
//   'date': '2020-05-12',
//   'prop': 'Tokyo',
//   'temperature': 7600
// }, {
//   'date': '2020-05-12',
//   'prop': 'London',
//   'temperature': 4.8
// }, {
//   'date': '2020-05-13',
//   'prop': 'Tokyo',
//   'temperature': 7600
// }, {
//   'date': '2020-05-13',
//   'prop': 'London',
//   'temperature': 4.8
// }]

const scale = [{
  dataKey: 'date',
  min: 0,
  max: 100
}]

const crosshairs = {
  type: 'line'
}

const label = {
  formatter: function formatter (val) {
    return val + '%'
  }
}

const style = {
  stroke: '#fff',
  lineWidth: 1
}

export default {
  name: 'Doubleline',
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      scale,
      height: 400,
      crosshairs,
      label,
      style
    }
  },
  methods: {
    htmlContent (title, items) {
      // console.log('hover-line', items)
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
                    <i style="background-color: ${item.color}"></i>
                    <p>${item.name}</p>
                  </div>
                  <div class="right">${Number(item.value).toFixed(2)}%</div>
                </li>`
      })
      return html
    }
  }
}
</script>
<style lang="less">
  .g2-tooltip {
    position: absolute;
    left: 0;
    top: 0;
    padding: 8px;
    box-shadow: 0 0 6px 1px #ddd;
    background-color: rgba(255, 255, 255, .98);
    .g2-tooltip-list {
      padding: 0;
      margin: 0;
      li {
        display: flex;
        width: 100%;
        margin: 0;
        p {
          margin: 0;
          margin-bottom: 6px;
        }
        .left {
          float: left;
          width: 180px;
          i {
            display: block;
            float: left;
            width: 6px;
            height: 6px;
            margin-top: 8px;
            margin-right: 5px;
            border-radius: 50%;
            overflow: hidden;
          }
        }
        .right {
          flex: 1;
          text-align: right;
        }
      }
    }
  }
</style>
