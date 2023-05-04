<template>
  <div>
    <canvas id="canvas" width="40" height="40"></canvas>
  </div>
</template>
<script>

export default {
  props: {
    value: {
      type: [String, Number, Object, Array],
      default: undefined
    }
  },
  data () {
    return {
      red: 0,
      blue: 0,
      pink: 0,
      precent: [0.6, 0.4]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      var color = ['#FF0000', '#EEEE00']
      this.drawCircle('canvas', this.precent, color)
    },
    drawCircle (cancasid, precent, color) {
      var can = document.getElementById(cancasid)
      var ctx = can.getContext('2d')
      var radius = can.width * 0.5 // 半径
      ctx.clearRect(0, 10, 0, 0)
      var ox = radius // 圆心x
      var oy = radius // 圆心y
      var startAngle = 0 // 开始
      var endAngle = 0 // 结束
      for (var i = 0; i < color.length; i++) {
        endAngle = endAngle + this.precent[i] * Math.PI * 2
        ctx.fillStyle = color[i]
        ctx.beginPath()
        ctx.moveTo(ox, oy)
        ctx.arc(ox, oy, radius, startAngle, endAngle, false)
        ctx.closePath()
        ctx.fill()
        startAngle = endAngle
      }
    }
  },
  watch: {
  }
}
</script>
