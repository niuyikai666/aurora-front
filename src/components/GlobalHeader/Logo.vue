<template>
  <div class="logo-content">
    <span>
      <i class="icon-logo">
        <logo-svg />
      </i>
    </span>
    <span class="l-title">极光数据平台</span>
  </div>
</template>

<script>
import LogoSvg from '../../assets/logo.svg?inline'

export default {
  name: 'TopLogo',
  components: {
    LogoSvg
  },
  props: {
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // goDashboard () {
    //   this.$router.push({ path: '/' })
    // }
  }
}
</script>

<style lang="less" scoped>
  .logo-content {
    width: 165px;
    .icon-logo {
      svg {
        width: 30px;
        height: 30px;
        margin: -5px 8px 0 5px;
        vertical-align: middle;
      }
    }
    .l-title {
      font-size: 14px;
      font-weight: 700;
      color: #262626;
      margin-left: 10px;
    }
  }
</style>
