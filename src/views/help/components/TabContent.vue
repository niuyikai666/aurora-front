<template>
  <div class="tab-content">
    <h4 :class="{'line': titleLine}">{{ title }}</h4>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Info',
  props: {
    title: {
      type: String,
      default: ''
    },
    titleLine: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
  @import '~ant-design-vue/es/style/themes/default.less';
  .tab-content {
    h4 {
      position: relative;
      font-size: 14px;
      font-weight: 700;
      color: rgba(0,0,0, .85);
      line-height: 24px;
      margin-bottom: 15px;
      &.line {
        padding-left: 10px;
        &::before {
          display: table;
          content: '';
          position: absolute;
          left: 0;
          top: 5px;
          border-right: solid 2px @primary-color;
          height: 14px;
        }
      }
    }
  }
</style>
