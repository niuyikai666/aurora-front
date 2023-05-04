<template>
  <div>
    <div class="top-bar">
      <div class="title-con">
        <div class="title">拉新任务-2022年后入会主播</div>
        <div class="crip">数据截止至{{ endTime || '--' }}</div>
        <rule-comp />
      </div>
      <div class="sub-title">拉新任务周期共计3个周期，按照“首播第1-30天”、“首播第31-60天”、“首播第61-90天”，主播流水不同档位，给予差异化提成比例奖励</div>
    </div>
    <div style="margin-top: 24px;">
      <total-manage-comp @getTime="getTimeHandle" :func="getNewTaskGroupTotal" :type="1"/>
    </div>
    <div style="margin-top: 24px;">
      <show-comp :tableFunc="getNewTaskGroupList" :tabFunc="getNewTaskGroupTabCount" :downUrl="downloadUrl" />
    </div>
  </div>
</template>

<script>
import TotalManageComp from './components/TotalManageComp'
import StaticComp from './components/StaticComp'
import ShowComp from './components/ShowComp'
import RuleComp from './components/RuleComp'
import { getNewTaskGroupList, getNewTaskGroupTabCount, getNewTaskGroupTotal } from '@/api/task'

export default {
  name: 'Salary',
  components: {
    TotalManageComp,
    StaticComp,
    ShowComp,
    RuleComp
  },
  data () {
    return {
      getNewTaskGroupList,
      getNewTaskGroupTabCount,
      getNewTaskGroupTotal,
      downloadUrl: '/lachine/group/list/export',
      endTime: ''
    }
  },
  mounted () {
  },
  methods: {
    getTimeHandle (time) {
      this.endTime = time
    }
  }
}
</script>

<style lang="less" scoped>
</style>
