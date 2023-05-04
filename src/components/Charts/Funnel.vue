<template>
  <div>
    <v-chart
      class="fund-chart"
      :force-fit="true"
      :height="height"
      :padding="padding"
      :data="data"
      :scale="scale">
      <v-tooltip :show-title="false" :item-tpl="tooltipOpts.itemTpl" />
      <v-legend />
      <v-coord type="rect" direction="LT" />
      <v-pyramid :position="funnelOpts.position" :color="funnelOpts.color" :label="funnelOpts.label" :tooltip="funnelOpts.tooltip" />
      <v-guide
        v-for="(obj, index) in data"
        :key="index"
        type="text"
        :top="true"
        :position="getPosition(obj)"
        :content="getContent(obj)"
        :vStyle="style"
      />
    </v-chart>
  </div>
</template>

<script>

const scale = {
  dataKey: 'percent',
  nice: false
}

const tooltipOpts = {
  showTitle: false,
  itemTpl: '<li data-index={index} style="margin-bottom:4px;">' +
      '<span style="background-color:{color};" class="g2-tooltip-marker"></span>' +
      '{name}<br/>' +
      '<span style="padding-left: 16px">浏览人数：{pv}</span><br/>' +
      '<span style="padding-left: 16px">占比：{percent}</span><br/>' +
      '</li>'
}

const funnelOpts = {
  position: 'action*percent',
  color: ['action', ['#0050B3', '#1890FF', '#40A9FF', '#69C0FF', '#BAE7FF']],
  label: ['action*pv', (action, pv) => {
    return action + ' ' + pv
  }, {
    offset: 35,
    labelLine: {
      lineWidth: 1,
      stroke: 'rgba(0, 0, 0, 0.15)'
    }
  }],
  tooltip: ['action*pv*percent', (action, pv, percent) => ({
    name: action,
    percent: Math.floor(percent * 100) + '%',
    pv: pv
  })]
}

export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      padding: [ 20, 150, 95, 0 ],
      scale,
      height: 300,
      tooltipOpts,
      funnelOpts,
      style: {
        fill: '#fff',
        fontSize: '12',
        textAlign: 'center',
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)'
      }
    }
  },
  methods: {
    getPosition: (obj) => {
      return {
        action: obj.action,
        percent: 'median'
      }
    },
    getContent: (obj) => {
      return parseInt(String(obj.percent * 100)) + '%'
    }
  }
}
</script>

<style lang="less" scoped>
</style>
