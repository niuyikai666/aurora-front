<template>
  <div class="tip">
    <span style="margin-right:50px">
      最新匹配更新时间：{{ updateTime || '-' }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TopTip',
  props: {
    updateTime: {
      type: String,
      default: null
    },
    permission: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      visible: false
    }
  },
  mounted () {
  },
  methods: {
    recordHandle () {
      this.visible = true
    }
  }
}
</script>
<style scoped>
.tip{
  margin-top: -14px;
  margin-bottom: 8px;
  line-height: 30px;
}
</style>
