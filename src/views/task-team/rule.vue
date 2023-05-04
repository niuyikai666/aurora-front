<template>
  <a-card
    style="margin-top:24px;"
    :bordered="false"
    :tabList="tabList"
    :activeTabKey="tabActiveKey"
    @tabChange="key => handleTabChange(key)"
  >
    <div slot="tabBarExtraContent">
      <a-button-group class="btn-group btn-group-extra">
        <a-button :class="{'active': activeTimeIndex === 0}" @click="change(0)">{{ timeRange[0].text }}</a-button>
        <a-button :class="{'active': activeTimeIndex === 1}" @click="change(1)">{{ timeRange[1].text }}</a-button>
        <a-month-picker v-model="timeRange[2].value" :disabled-date="disabledDate" value-format="YYYY-MM" @change="changeTime()"><a-button ref="btnGroup" :class="{'active': activeTimeIndex === 2}">{{ timeRange[2].text }}</a-button></a-month-picker>
      </a-button-group>
    </div>
    <div v-if="tabActiveKey === 'tab1'">
      <operate-ratio :params="queryParams" />
    </div>
  </a-card>
</template>

<script>
import moment from 'moment'
import { amountFormat } from '@/utils/util'
import OperateRatio from './components/OperateRatio'
export default {
  name: 'TeamRule',
  components: {
    OperateRatio
  },
  data () {
    return {
      amountFormat,
      tabList: [
        { key: 'tab1', tab: '运营增长比例' }
      ],
      tabActiveKey: 'tab1',

      queryParams: {
        monthCycle: moment().format('YYYY-MM')
      },

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
      ]
    }
  },
  mounted () {
  },
  methods: {
    handleTabChange (key) {
      this.tabActiveKey = key
    },

    change (index) {
      // if (this.activeTimeIndex === index) {
      //   this.setParams(null, '')
      // } else {
      //   this.setParams(index, this.timeRange[index].value)
      // }
      this.setParams(index, this.timeRange[index].value)
    },
    changeTime () {
      this.setParams(2, this.timeRange[2].value)
    },
    setParams (index, time) {
      this.activeTimeIndex = index
      this.queryParams.monthCycle = time
    },

    disabledDate (time) {
      return time.valueOf() > Date.now() || time.valueOf() < new Date('2021-12')
    }
  }
}
</script>

<style lang="less" scoped>
  .btn-group {
    margin-left: 12px;
    .ant-btn {
      height: 28px;
      outline: none;
      &:focus:not(.ant-btn-primary):not(.ant-btn-danger), .ant-btn:hover:not(.ant-btn-primary):not(.ant-btn-danger) {
        border: 1px solid;
        border-color: #d9d9d9;
        color:rgba(0, 0, 0, 0.65);
      }
    }
  }
</style>
