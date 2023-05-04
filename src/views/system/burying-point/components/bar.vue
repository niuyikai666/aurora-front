<template>
  <div :ref="`charts${type}`" style="width:100%;height: 600px"></div>
</template>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: null
    },
    data: {
      type: [Object, String],
      default: null
    }
  },
  data () {
    return {
    }
  },

  components: {},

  mounted () {
    this.init()
  },

  methods: {
    init () {
      if (!this.data) return
      this.myChart && this.myChart.dispose()
      console.log(this.$refs[`charts${this.type}`])
      this.myChart = this.$echarts.init(this.$refs[`charts${this.type}`])
      this.myChart.setOption(this.data)
    }
  },
  watch: {
    data: {
      handler (val) {
        this.$nextTick(() => {
          if (val) {
            this.init()
          }
        })
      },
      deep: true
    }
  }
}

</script>
<style lang='less' scoped>
</style>
