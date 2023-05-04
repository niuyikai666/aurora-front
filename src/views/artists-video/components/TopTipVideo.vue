<template>
  <div class="tip">
    <span style="margin-right:50px">
      主播列表更新时间：{{ time || '-' }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'TopTip',
  props: {
    time: {
      type: String,
      default: null
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
