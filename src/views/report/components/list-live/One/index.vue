<template>
  <div>
    <!-- 指标统计 -->
    <tab-content title="指标统计">
      <span slot="titleRight">
        <div class="tip-icon-con" style="position:relative; display:inline-block;">
          <a-popover placement="topLeft">
            <template slot="content">
              <div class="index-crip-content">
                <p class="title">指标说明</p>
                <dl class="list">
                  <dt>总流水</dt>
                  <dd>时间段内流水总和</dd>
                  <dt>日均流水</dt>
                  <dd>总流水/天数</dd>
                  <dt>平均1H日活</dt>
                  <dd>时间段内日活主播数总和（不去重）/天数</dd>
                  <dt>主播数</dt>
                  <dd>截止到时间段内最后一天的主播总数</dd>
                  <dt>新入驻主播数</dt>
                  <dd>时间段内本月新加入公会的主播数</dd>
                  <dt>新入驻主播开播数</dt>
                  <dd>时间段内直播时长不为0的新入驻主播数</dd>
                  <dt>新入驻主播流水</dt>
                  <dd>时间段内新入驻主播产生的流水</dd>
                  <dt>再激活主播数</dt>
                  <dd>断播主播成功激活并申请通过的主播数</dd>
                </dl>
              </div>
            </template>
            <a-icon type="question-circle" style="font-size:14px;" />
          </a-popover>
        </div>
      </span>
      <span slot="titleRightContent" v-if="permission.includes('report_live_opt_export')">
        <a-button type="primary" @click="exportData">
          <svg-icon icon-class="export-icon" class="aciton-icon-com"></svg-icon>
          导出
        </a-button>
      </span>
      <span slot="titleLeft" class="font-normal" v-if="indexData.lastCycleDate">环比周期：{{ indexData.lastCycleDate[0] }} - {{ indexData.lastCycleDate[1] }}</span>
      <a-skeleton :loading="loading1">
        <a-row class="static-content" style="display:block">
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="总流水(元)"
              :newData="indexData.current.rewardMoney"
              :oldData="indexData.last ? indexData.last.rewardMoney : ''"
              :lastData="indexData.last"
            />
          </a-col>
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="日均流水(元)"
              :newData="indexData.current.avgRewardMoney"
              :oldData="indexData.last ? indexData.last.avgRewardMoney : ''"
              :lastData="indexData.last"
            />
          </a-col>
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="平均1H日活(人)"
              :newData="indexData.current.liveAveHourCount"
              :oldData="indexData.last ? indexData.last.liveAveHourCount : ''"
              :lastData="indexData.last"
            />
          </a-col>
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="主播数(人)"
              :newData="indexData.current.actorCount"
              :oldData="indexData.last ? indexData.last.actorCount : ''"
              :lastData="indexData.last"
            />
          </a-col>
        </a-row>
        <a-row class="static-content" style="display:block">
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="新入驻主播数(人)"
              :newData="indexData.current.newEnterCount"
              :oldData="indexData.last ? indexData.last.newEnterCount : ''"
              :lastData="indexData.last"
            />
          </a-col>
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="新入驻主播开播数(人)"
              :newData="indexData.current.newEnterLiveCount"
              :oldData="indexData.last ? indexData.last.newEnterLiveCount : ''"
              :lastData="indexData.last"
            />
          </a-col>
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="新入驻主播流水(元)"
              :newData="indexData.current.newEnterRewardMoney"
              :oldData="indexData.last ? indexData.last.newEnterRewardMoney : ''"
              :lastData="indexData.last"
            />
          </a-col>
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="再激活主播数(人)"
              :newData="indexData.current.activityCount"
              :oldData="indexData.last ? indexData.last.activityCount : ''"
              :lastData="indexData.last"
            />
          </a-col>
        </a-row>
      </a-skeleton>
    </tab-content>
    <tab-content title="流水情况">
      <span slot="titleRightContent">
        <a-button type="link" class="mr10" @click="changeTab('tab1active')">{{ tab1active ? '数据表' : '图表' }}</a-button>
      </span>
      <com-chart
        v-if="tab1active"
        :activeTab="rewardActiveTab"
        :tab="rewardTab"
        :lineData="rewardLineData"
        @change="getLine1"
      />
      <com-table
        v-if="!tab1active"
        ref="table1"
        :getList="getRewardListData"
        :columns="rewardListColumns"
        :data="data"
      />
    </tab-content>
    <tab-content title="开播情况">
      <span slot="titleRightContent">
        <a-button type="link" class="mr10" @click="changeTab('tab2active')">{{ tab2active ? '数据表' : '图表' }}</a-button>
      </span>
      <com-chart
        v-if="tab2active"
        :activeTab="BroadCastingActiveTab"
        :tab="BroadCastingTab"
        :lineData="BroadCastingLineData"
        @change="getLine2"
      />
      <com-table
        ref="table2"
        v-if="!tab2active"
        :getList="getBroadCastingData"
        :columns="broadCastingColumns"
        :data="data"
      />
    </tab-content>
    <tab-content title="新入驻情况">
      <span slot="titleRightContent">
        <a-button type="link" class="mr10" @click="changeTab('tab3active')">{{ tab3active ? '数据表' : '图表' }}</a-button>
      </span>
      <com-chart
        v-if="tab3active"
        :activeTab="NewEnterActiveTab"
        :tab="NewEnterTab"
        :lineData="NewEnterLineData"
        @change="getLine3"
      />
      <com-table
        ref="table3"
        v-if="!tab3active"
        :getList="getNewEnter"
        :columns="newEnterColumns"
        :data="data"
      />
    </tab-content>
    <tab-content title="再激活情况">
      <span slot="titleRightContent">
        <a-button type="link" class="mr10" @click="changeTab('tab4active')">{{ tab4active ? '数据表' : '图表' }}</a-button>
      </span>
      <com-chart
        v-if="tab4active"
        :activeTab="ActivityActiveTab"
        :tab="ActivityTab"
        :lineData="ActivityLineData"
        @change="getLine4"
      />
      <com-table
        ref="table4"
        v-if="!tab4active"
        :getList="getActivity"
        :columns="ActivityColumns"
        :data="data"
      />
    </tab-content>
  </div>
</template>

<script>
import ComTable from '../../ComTable'
import ComChart from '../../ComChart'
import TabContent from '../../TabContent'
import {
  BrokeLineDouble
} from '@/components'
import TargetData from '../../TargetData'
import { rewardListColumns, broadCastingColumns, newEnterColumns, ActivityColumns } from './tableColumns'
import { getBroadCasting, getRewardList, getFieldList, getIndexLine, getLiveTarget, getNewEnter, getActivity } from '@/api/report'
export default {
  name: 'DataComp',
  components: {
    TabContent,
    ComTable,
    TargetData,
    BrokeLineDouble,
    ComChart
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    permission: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      loading1: true,
      indexData: {
        current: '',
        last: ''
      },
      rewardListColumns: rewardListColumns,
      broadCastingColumns: broadCastingColumns,
      newEnterColumns: newEnterColumns,
      ActivityColumns: ActivityColumns,
      rewardActiveTab: '',
      rewardTab: [],
      rewardLineData: [],
      BroadCastingActiveTab: '',
      BroadCastingTab: [],
      BroadCastingLineData: [],
      ActivityActiveTab: '',
      ActivityTab: [],
      ActivityLineData: [],
      NewEnterActiveTab: '',
      NewEnterTab: [],
      NewEnterLineData: [],
      tabWordList: [{}, {
        activeName: 'rewardActiveTab',
        tabList: 'rewardTab',
        lineData: 'rewardLineData'
      }, {
        activeName: 'BroadCastingActiveTab',
        tabList: 'BroadCastingTab',
        lineData: 'BroadCastingLineData'
      }, {
        activeName: 'NewEnterActiveTab',
        tabList: 'NewEnterTab',
        lineData: 'NewEnterLineData'
      }, {
        activeName: 'ActivityActiveTab',
        tabList: 'ActivityTab',
        lineData: 'ActivityLineData'
      }],
      tab1active: true,
      tab2active: true,
      tab3active: true,
      tab4active: true
    }
  },
  mounted () {
    this.getLine1()
    this.getLine2()
    this.getLine3()
    this.getLine4()
    this.getLiveTarget()
    setTimeout(() => {
      this.loading1 = false
    }, 1000)
  },
  methods: {
    getBroadCastingData (params) {
      const parameter = Object.assign({}, params, this.data)
      return getBroadCasting(parameter).then(res => {
        return res
      })
    },
    getLiveTarget () {
      getLiveTarget(this.data).then(res => {
        this.indexData = res
      })
    },
    getRewardListData (params) {
      const parameter = Object.assign({}, params, this.data)
      return getRewardList(parameter).then(res => {
        return res
      })
    },
    getNewEnter (params) {
      const parameter = Object.assign({}, params, this.data)
      return getNewEnter(parameter).then(res => {
        return res
      })
    },
    getActivity (params) {
      const parameter = Object.assign({}, params, this.data)
      return getActivity(parameter).then(res => {
        return res
      })
    },
    exportData () {
      var exportUrl = ''
      Object.keys(this.data).map((key) => {
          if (this.data[key]) {
            exportUrl += key + '=' + this.data[key] + '&'
          }
      })
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/report/index/export?${exportUrl}`
    },
    getLine1 (activeName, prop) {
      this.getFiles(1, activeName, prop)
    },
    getLine2 (activeName, prop) {
      this.getFiles(2, activeName, prop)
    },
    getLine3 (activeName, prop) {
      this.getFiles(3, activeName, prop)
    },
    getLine4 (activeName, prop) {
      this.getFiles(4, activeName, prop)
    },
    getFiles (type, activeName, prop) {
      getFieldList({ type: type }).then(res => {
        this[this.tabWordList[type].tabList] = res
        let chartItemName = ''
        if (res.length > 0) {
          // 图表提示文字
          chartItemName = prop || res[0].value
          // 对应comChart中的 activeTab
          this[this.tabWordList[type].activeName] = activeName || res[0].name
        }
        this.getLine(this[this.tabWordList[type].activeName], chartItemName, type)
      })
    },
    getLine (tab, chartItemName, type) {
      const parameter = Object.assign({}, this.data, { file: tab })
      getIndexLine(parameter).then(res => {
        res.forEach(item => {
          item.prop = chartItemName
          if (item.prop.includes('率')) {
            item.count = (item.count * 100).toFixed(2)
          }
        })
        this[this.tabWordList[type].lineData] = res
      })
    },
    changeTab (val) {
      this[val] = !this[val]
    }
  },
  watch: {
    data () {
      this.getLiveTarget()
      if (this.$refs.table1) {
        this.$refs.table1.refresh()
      } else {
        this.getLine1()
      }
      if (this.$refs.table2) {
        this.$refs.table2.refresh()
      } else {
        this.getLine2()
      }
      if (this.$refs.table3) {
        this.$refs.table3.refresh()
      } else {
        this.getLine3()
      }
      if (this.$refs.table4) {
        this.$refs.table4.refresh()
      } else {
        this.getLine4()
      }
    },
    activeTab (val) {
      this.tab.forEach(item => {
        if (item.name === val) {
          this.activeName = item.value
        }
      })
      this.getLine()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../index.less';
</style>
