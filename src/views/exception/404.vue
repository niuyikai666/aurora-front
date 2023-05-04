<template>
  <a-result class="content-404" status="404" title="404" sub-title="抱歉！您无权访问该页面或页面不存在">
    <template #extra>
      <p>{{ veriName }} 后跳转到首页</p>
      <a-button type="primary" @click="toHome">
        返回首页
      </a-button>
    </template>
  </a-result>
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
  beforeDestroy () {
    clearInterval(this.inteval)
  },
  methods: {
    toHome () {
      this.$router.push({ path: '/' })
    },
    countDown () {
      this.inteval = setInterval(() => {
        this.veriName = `${this.veriCount}s`
        this.veriCount = --this.veriCount
        if (this.veriCount < 0) {
          this.veriName = '0s'
          this.veriCount = 5
          this.toHome()
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
  .content-404 /deep/ .ant-result-extra {
    margin-top: 16px;
    p {
      margin-bottom: 20px;
    }
  }
</style>
