<template>
  <a-card
    class="no-border-card"
    :bordered="false"
    :loading="loading"
  >
    <div slot="title">
      任务总览
      <span class="card-title-desc" v-if="updateTime">数据更新时间{{ updateTime }}</span>
      <span class="card-title-desc ml24" v-if="updateTime">数据截止至{{ dateUpdateTime }}</span>
    </div>
    <div>
      <slot name="extra-custom"></slot>
    </div>
    <div slot="extra">
      <slot name="extra-btn"></slot>
    </div>
    <!-- <div class="static-content">
      <a-statistic title="本月组长平均提成(%)" :value="dataCount.averageCommission && amountFormat(dataCount.averageCommission * 100) || '0'" />
      <a-statistic title="0.8%小组个数" :value="dataCount.maxCommission && amountFormat(dataCount.maxCommission, false) || '0'" />
      <a-statistic title="0.4%小组个数" :value="dataCount.minCommission && amountFormat(dataCount.minCommission, false) || '0'" />
    </div> -->
  </a-card>
</template>

<script>
import { amountFormat } from '@/utils/util'
import { getGroupLeaderMonthCommissionUpdateTime } from '@/api/task'
import moment from 'moment'

export default {
  name: 'ToalComp',
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      amountFormat,
      dataCount: {},
      updateTime: '',
      dateUpdateTime: ''
    }
  },
  mounted () {
    this.getTotalHandle()
  },
  methods: {
    getTotalHandle () {
      getGroupLeaderMonthCommissionUpdateTime({
        monthCycle: this.params.monthCycle
      }).then(res => {
        this.updateTime = res.updateTime && moment(res.updateTime).format('YYYY-MM-DD HH:mm') || '--'
        this.dateUpdateTime = res.dateUpdateTime && moment(res.dateUpdateTime).format('YYYY-MM-DD HH:mm') || '--'
      })
    }
  },
  watch: {
    params: {
      handler (val) {
        this.getTotalHandle()
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
  .card-title-desc{
    font-size: 12px;
    color:#909399;
    display: inline-block;
  }
</style>
