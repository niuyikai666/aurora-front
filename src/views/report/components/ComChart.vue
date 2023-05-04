
<template>
  <div>
    <a-skeleton active :row="4" :loading="activeTab == ''">
      <a-radio-group v-model="activeName" size="small" class="radio-group" style="display:block">
        <a-radio-button :value="li.name" v-for="li in tab" :key="li.name" style="margin-bottom:10px">
          {{ li.value }}
        </a-radio-button>
      </a-radio-group>
      <a-empty :image="simpleImage" v-if="!lineData || (lineData.length == 0 && this.activeTab!= '')" style="margin-top:50px;margin-bottom:50px"/>
      <div v-if="chartType==1">
        <broke-line-double :data="lineData" v-show="lineData && lineData.length !== 0"/>
      </div>
      <div v-if="chartType==2">
        <report-bar :data="lineData" v-show="lineData && lineData.length !== 0"/>
      </div>
    </a-skeleton>
  </div>
</template>

<script>
import { Empty } from 'ant-design-vue'
import TabContent from './TabContent'
import { BrokeLineDouble, ReportBar } from '@/components'
export default {
  props: {
    getList: {
      type: Function,
      default: null
    },
    tab: {
      type: Array,
      default: null
    },
    lineData: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    activeTab: {
      type: String,
      default: ''
    },
    chartType: {
      type: Number,
      default: 1
    }
  },
  components: {
    TabContent,
    BrokeLineDouble,
    ReportBar
  },
  data () {
    return {
      activeName: ''
    }
  },
  beforeCreate () {
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
  },
  mounted () {
    this.activeName = this.activeTab
  },
  methods: {
  },
  watch: {
    activeTab (newValue) {
      this.activeName = newValue
    },
    activeName (newValue, oldValue) {
      if (newValue === oldValue || oldValue === '') {
        return
      }
      const arr = this.tab.filter(item => item.name === newValue)
      if (arr.length !== 0) {
        this.$emit('change', newValue, arr[0].value)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import "~ant-design-vue/es/style/themes/default.less";
  .check-content {
    .title {
      font-size: 14px;
      font-weight: 700;
      color: rgba(0,0,0,.85);
      span {
        font-size: 12px;
        color: rgba(0,0,0,.65);
        font-weight: normal;
      }
    }
    .check-group {
      width: 100%;
      .ant-col {
        margin-bottom: 8px;
      }
    }
  }
</style>
<style lang="less" scoped>
@import '../index.less';
</style>
