<template>
  <div class="tab-content">
    <h1 class="line">{{ title }} <span class="sub-title"><slot name="subTitle"></slot></span></h1>
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
      font-size: 16px;
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
          top: 5px;
          border-right: solid 2px @primary-color;
          height: 14px;
        }
      }
      .sub-title {
        font-size: 14px;
        color: #303033;
        font-weight: normal;
        margin-left: 12px;
      }
    }
  }
</style>
