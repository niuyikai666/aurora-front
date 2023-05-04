<template>
  <div>
    <!-- <a-card
      class="mt24"
      title="团队内招募任务完成情况"
      :bordered="false"
      :loading="loading"
    >
      <a-button v-if="detail" slot="extra" type="link" @click="handleDetail('recruit')">团队详情</a-button>
      <div class="static-content" style="margin-top:0">
        <a-statistic title="本月有效招募任务目标" :value="taskRecruit.recruitTaskTargetCount && amountFormat(taskRecruit.recruitTaskTargetCount, false) || '0'"/>
        <a-statistic title="团队招募人总数" :value="taskRecruit.groupRecruitTotal && amountFormat(taskRecruit.groupRecruitTotal, false) || '0'" />
        <a-statistic title="0.6%招募个数" :value="taskRecruit.levelSixRecruitCount && amountFormat(taskRecruit.levelSixRecruitCount, false) || '0'" />
        <a-statistic title="0.6% -0.8%招募个数" :value="taskRecruit.levelSixToEightRecruitCount && amountFormat(taskRecruit.levelSixToEightRecruitCount, false) || '0'" />
        <a-statistic title="0.8% -1%招募个数" :value="taskRecruit.levelEightToElevenRecruitCount && amountFormat(taskRecruit.levelEightToElevenRecruitCount, false) || '0'" />
        <a-statistic title="1.1%招募个数" :value="taskRecruit.levelElevenRecruitCount && amountFormat(taskRecruit.levelElevenRecruitCount, false)" />
      </div>
    </a-card> -->
    <a-card
      class="mt24"
      title="团队内运营任务完成情况"
      :bordered="false"
      :loading="loading2"
    >
      <a-button v-if="detail" slot="extra" type="link" @click="handleDetail('operate')">团队详情</a-button>
      <div class="static-content" style="margin-top:0">
        <a-statistic title="团队运营总数" :value="taskOperate.operatorTotal && amountFormat(taskOperate.operatorTotal, false) || '0'"/>
        <a-statistic title="0.5%运营个数" :value="taskOperate.operatorTotalFive && amountFormat(taskOperate.operatorTotalFive, false) || '0'" />
        <a-statistic title="0.5%-0.7%运营个数" :value="taskOperate.operatorTotalFiveToSeven && amountFormat(taskOperate.operatorTotalFiveToSeven, false) || '0'" />
        <a-statistic title="0.7%-1%运营个数" :value="taskOperate.operatorTotalSevenToTen && amountFormat(taskOperate.operatorTotalSevenToTen, false) || '0'" />
        <a-statistic title="1%运营个数" :value="taskOperate.operatorTotalTen && amountFormat(taskOperate.operatorTotalTen, false) || '0'" />
        <a-statistic title="运营平均提成比例(%)" :value="taskOperate.operatorTotalAvgPercent && amountFormat(taskOperate.operatorTotalAvgPercent, true, 3) || '0'" />
      </div>
    </a-card>
    <complete-detail-dialog
      :visible="visible"
      :title="titleDialog"
      :func="func"
      :tableColumns="tableColumns"
      :params="params"
      @close="handleClose"
    />
  </div>
</template>

<script>
import { amountFormat } from '@/utils/util'
import { columnsGroupRecruitComplete, columnsGroupOperateComplete } from '../columns'
import { getGroupOperateComplete, getGroupRecruitComplete, getGroupRecruitDetail, getGroupOperateDetail } from '@/api/task'
import CompleteDetailDialog from './CompleteDetailDialog'
export default {
  name: 'ToalComp',
  props: {
    params: {
      type: Object,
      default: null
    },
    detail: {
      type: Boolean,
      default: false
    }
  },
  components: {
    CompleteDetailDialog
  },
  data () {
    return {
      amountFormat,
      taskOperate: {},
      taskRecruit: {},

      loading: true,
      loading2: true,

      titleDialog: null,
      func: null,
      tableColumns: [],

      visible: false
    }
  },
  mounted () {
    this.getOperate()
    this.getRecruit()
  },
  methods: {
    getOperate () {
      getGroupOperateComplete({ monthCycle: this.params.monthCycle }).then(res => {
        this.taskOperate = res
        this.loading2 = false
      })
    },

    getRecruit () {
      getGroupRecruitComplete(this.params).then(res => {
        this.taskRecruit = res
        this.loading = false
      })
    },

    handleDetail (type) {
      if (type === 'recruit') {
        this.titleDialog = '小组招募任务完成情况'
        this.func = getGroupRecruitDetail
        this.tableColumns = columnsGroupRecruitComplete
        this.$nextTick(() => {
          this.visible = true
        })
      }
      if (type === 'operate') {
        this.titleDialog = '小组运营任务完成情况'
        this.func = getGroupOperateDetail
        this.tableColumns = columnsGroupOperateComplete
        this.$nextTick(() => {
          this.visible = true
        })
      }
    },

    handleClose () {
      this.visible = false
      this.titleDialog = ''
      this.func = null
      this.tableColumns = []
    }
  },
  watch: {
    params: {
      handler (val) {
        this.getOperate()
        this.getRecruit()
      },
      deep: true
    }
  }
}
</script>

<style lang="less">
</style>
