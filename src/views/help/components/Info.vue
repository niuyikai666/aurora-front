<template>
  <div class="header-info">
    <span v-if="title">{{ title }}</span>
    <p>{{ value }} <span class="bufix">{{ bufix }}</span></p>
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
    value: {
      type: String,
      default: ''
    },
    bufix: {
      type: String,
      default: ''
    },
    bordered: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less" scoped>
@import "~ant-design-vue/es/style/themes/default.less";

.header-info {
  position: relative;
  text-align: left;
  display: flex;
  align-items: top;
  line-height: 20px;
  padding-left: 8px;
  & > span {
    display: inline-block;
    color: rgba(0,0,0,.85);
    font-size: @font-size-base;
    width: 130px;
    line-height: 22px;
  }
  & > p {
    flex: 1;
    margin: 0;
    color: rgba(0,0,0,.85);
    font-size: @font-size-base;
    line-height: 22px;
    span {
      font-size: 14px;
    }
  }
  & > em {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 56px;
    background-color: @border-color-split;
  }
}
</style>
