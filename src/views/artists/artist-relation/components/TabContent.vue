<template>
  <div class="tab-content">
    <h1 :class="{'line': titleLine}">{{ title }}</h1>
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
    h1 {
      position: relative;
      font-size: 14px;
      font-weight: 700;
      color: rgba(0,0,0, .85);
      margin-bottom: 15px;
      &.line {
        padding-left: 10px;
        &::before {
          display: table;
          content: '';
          position: absolute;
          left: 0;
          top: 4px;
          border-right: solid 2px #755DD7;
          height: 14px;
        }
      }
    }
  }
</style>
