<template>
  <a-button-group class="btn-group btn-group-extra">
    <a-button :class="{'active': activeTimeIndex === 0}" @click="change(0)">{{ timeRange[0].text }}</a-button>
    <a-button :class="{'active': activeTimeIndex === 1}" @click="change(1)">{{ timeRange[1].text }}</a-button>
    <a-date-picker
      @openChange="handleOpenChange"
      @panelChange="panelChange"
      :open="show"
      mode="year"
      v-model="timeRange[2].value"
      value-format="YYYY"
      :allowClear="false"
      format="YYYY"><a-button ref="btnGroup" :class="{'active': activeTimeIndex === 2}">{{ timeRange[2].text }}</a-button></a-date-picker>
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
          text: '本年',
          value: moment().format('YYYY')
        },
        {
          text: '去年',
          value: moment(new Date()).subtract(1, 'years').format('YYYY')
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
      // this.timeRange[2].value = this.timeRange[index].value
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
      // console.log(this.$parent.getTabList)
      // return this.$parent.getTabList(time)
      // return false
      // return time.valueOf() > Date.now() || time.valueOf() < new Date('2021-12')
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
