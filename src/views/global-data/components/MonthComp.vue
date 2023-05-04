<template>
  <a-button-group class="btn-group btn-group-extra">
    <a-button :class="{'active': activeTimeIndex === 0}" @click="change(0)">{{ timeRange[0].text }}</a-button>
    <a-button :class="{'active': activeTimeIndex === 1}" @click="change(1)">{{ timeRange[1].text }}</a-button>
    <a-month-picker
      v-model="timeRange[2].value"
      value-format="YYYY-MM"
      @change="changeTime()"><a-button ref="btnGroup" :class="{'active': activeTimeIndex === 2}">{{ timeRange[2].text }}</a-button></a-month-picker>
  </a-button-group>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MonthPick',
  model: {
    prop: 'value',
    event: 'returnBack'
  },
  props: {
    disabledDate: {
      type: Function,
      default: null
    },
    type: {
      type: String,
      default: 'month'
    }
  },
  data () {
    return {
      activeTimeIndex: 0,
      timeRange: [
        {
          text: '本月',
          value: moment().format('YYYY-MM')
        },
        {
          text: '上月',
          value: moment(new Date()).subtract(1, 'months').format('YYYY-MM')
        },
        {
          text: '自定义',
          value: undefined
        }
      ],
      show: false
    }
  },
  mounted () {
    // this.$emit('returnBack', this.timeRange[this.activeTimeIndex].value)
  },
  methods: {
    change (index) {
      this.setParams(index, this.timeRange[index].value)
    },
    changeTime () {
      this.setParams(2, this.timeRange[2].value)
    },
    setParams (index, time) {
      this.activeTimeIndex = index
      this.$emit('returnBack', time)
    },
    disabled (time) {
      return this.disabledDate(time)
    },
    panelChange (value) {
      const year = moment(value).format('YYYY')
      this.setParams(2, year)
      this.show = false
    },
    handleOpenChange (status) {
      this.show = status
    }
  }
}
</script>

<style lang="less" scoped>
  .btn-group {
    // margin-left: 12px;
    .ant-btn {
      height: 32px;
      outline: none;
      &:focus:not(.ant-btn-primary):not(.ant-btn-danger), .ant-btn:hover:not(.ant-btn-primary):not(.ant-btn-danger) {
        border: 1px solid;
        border-color: #d9d9d9;
        color:rgba(0, 0, 0, 0.65);
      }
    }
  }
</style>
