<template>
  <a-tooltip placement="top">
    <template slot="title">
      <slot></slot>
    </template>
    <a-icon type="question-circle" style="margin-left:5px"/>
  </a-tooltip>
</template>

<script>
export default {
  name: 'Doubt',
  props: {
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
</style>
