<template>
  <div class="descript-content">
    <h3>{{ title }}</h3>
    <div class="con">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~ant-design-vue/es/style/themes/default.less';
  .descript-content {
    // margin-bottom: 15px;
    padding-top: 13px;
    h3 {
      position: relative;
      font-size: 14px;
      color: #8C8C8C;
      margin-bottom: 15px;
    }
    input {
      width: 88%;
    }
  }
</style>
