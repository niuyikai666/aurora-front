<template>
  <div>
    <iframe :src="path" frameborder="0" style="width:100%;height:calc(100vh - 190px)"></iframe>
  </div>
</template>

<script>
export default {
  data () {
    return {
      path: process.env.VUE_APP_API_BASE_URL + `/coolcolleges/third-password-less-login?isMobile=${false}`
    }
  },

  components: {},

  mounted () {},

  methods: {}
}

</script>
<style lang='less' scoped>
</style>
