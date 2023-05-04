<template>
  <div class="content-200">
    <img src="@/assets/200.png" alt="">
    <a-button type="primary" class="btn-success" @click="toHome">
      {{ veriName }} 返回主页
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'Exception404',
  data () {
    return {
      veriName: '5s',
      veriCount: 4,
      inteval: null
    }
  },
  mounted () {
    this.countDown()
  },
  methods: {
    toHome () {
      clearInterval(this.inteval)
      this.$router.push({ path: '/artists-operation/gold-data/workplace' })
    },
    countDown () {
      this.inteval = setInterval(() => {
        this.veriName = `${this.veriCount}s`
        this.veriCount = --this.veriCount
        if (this.veriCount < 0) {
          this.veriName = '0s'
          this.veriCount = 5
          this.toHome()
          clearInterval(this.inteval)
        }
      }, 1000)
    }
  },
  beforeDestroy () {
    if (this.inteval) {
      clearInterval(this.inteval)
    }
  }
}
</script>

<style lang="less" scoped>
  .content-200{
    padding: 48px 32px;
    img{
      width: 600px;
      height: auto;
      margin: 0 auto;
      display: block;
    }
    .btn-success{
      display: block;
      margin: 0 auto;
      border-radius: 2px;
    }
  }
</style>
