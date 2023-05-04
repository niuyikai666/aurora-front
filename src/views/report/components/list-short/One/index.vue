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
                  <dt>累计主播数</dt>
                  <dd>截止到时间段内最后一天的主播总数</dd>
                  <dt>新增主播数</dt>
                  <dd>截止到时间段内最后一天的新增总数</dd>
                  <dt>累计粉丝量</dt>
                  <dd>时间段内产生的粉丝量</dd>
                  <dt>新增主播粉丝量</dt>
                  <dd>时间段内新增主播产生的粉丝量</dd>
                  <dt>累计点赞数</dt>
                  <dd>时间段内产生的点赞数</dd>
                  <dt>新增主播点赞数</dt>
                  <dd>时间段内新增主播产生的点赞数</dd>
                </dl>
              </div>
            </template>
            <a-icon type="question-circle" style="font-size:14px;" />
          </a-popover>
        </div>
      </span>
      <span slot="titleRightContent" v-if="permission.includes('report_video_opt_export')">
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
              title="累计主播数（人）"
              :newData="indexData.current.actorCount"
              :oldData="indexData.last ? indexData.last.actorCount : ''"
              :lastData="indexData.last"
            />
          </a-col>
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="新增主播数（人）"
              :newData="indexData.current.newEnterCount"
              :oldData="indexData.last ? indexData.last.newEnterCount : ''"
              :lastData="indexData.last"
            />
          </a-col>
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="累计粉丝量（人）"
              :newData="indexData.current.fansIncrease"
              :oldData="indexData.last ? indexData.last.fansIncrease : ''"
              :lastData="indexData.last"
            />
          </a-col>
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="新增主播粉丝量（人）"
              :newData="indexData.current.newEnterFans"
              :oldData="indexData.last ? indexData.last.newEnterFans : ''"
              :lastData="indexData.last"
            />
          </a-col>
        </a-row>
        <a-row class="static-content" style="display:block">
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="累计点赞数（个）"
              :newData="indexData.current.likes"
              :oldData="indexData.last ? indexData.last.likes : ''"
              :lastData="indexData.last"
            />
          </a-col>
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="新增主播点赞数（个）"
              :newData="indexData.current.newEnterLikes"
              :oldData="indexData.last ? indexData.last.newEnterLikes : ''"
              :lastData="indexData.last"
            />
          </a-col>
        </a-row>
      </a-skeleton>
    </tab-content>
    <tab-content title="主播情况">
      <span slot="titleRightContent">
        <a-button type="link" class="mr10" @click="changeTab('tab1active')">{{ tab1active ? '数据表' : '图表' }}</a-button>
      </span>
      <com-chart
        v-if="tab1active"
        :activeTab="VideoActorActiveTab"
        :tab="VideoActorTab"
        :lineData="VideoActorLineData"
        @change="getLine1"
      />
      <com-table
        ref="table1"
        v-if="!tab1active"
        :getList="getVideoActor"
        :columns="VideoActorColumns"
        :data="data"
      />
    </tab-content>
    <tab-content title="粉丝量情况">
      <span slot="titleRightContent">
        <a-button type="link" class="mr10" @click="changeTab('tab2active')">{{ tab2active ? '数据表' : '图表' }}</a-button>
      </span>
      <com-chart
        v-if="tab2active"
        :activeTab="VideoFanActiveTab"
        :tab="VideoFanTab"
        :lineData="VideoFanLineData"
        @change="getLine2"
      />
      <com-table
        ref="table2"
        v-if="!tab2active"
        :getList="getVideoFan"
        :columns="VideoFanColumns"
        :data="data"
      />
    </tab-content>
    <tab-content title="点赞情况">
      <span slot="titleRightContent">
        <a-button type="link" class="mr10" @click="changeTab('tab3active')">{{ tab3active ? '数据表' : '图表' }}</a-button>
      </span>
      <com-chart
        v-if="tab3active"
        :activeTab="VideoLikeActiveTab"
        :tab="VideoLikeTab"
        :lineData="VideoLikeLineData"
        @change="getLine3"
      />
      <com-table
        ref="table3"
        v-if="!tab3active"
        :getList="getVideoLike"
        :columns="VideoLikeColumns"
        :data="data"
      />
    </tab-content>
  </div>
</template>

<script>
import {
  BrokeLineDouble
} from '@/components'
import TargetData from '../../TargetData'
import ComTable from '../../ComTable'
import ComChart from '../../ComChart'
import TabContent from '../../TabContent'
import { videoActorColumns, videoFanColumns, videoLikeColumns } from './tableColumns'
import { getVideoActor, getVideoFan, getVideoLike, getVideoTargetfile, getVideoLine, getVideoTarget } from '@/api/report'
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
      VideoActorColumns: videoActorColumns,
      VideoFanColumns: videoFanColumns,
      VideoLikeColumns: videoLikeColumns,
      VideoActorActiveTab: '',
      VideoActorTab: [],
      VideoActorLineData: [],
      VideoFanActiveTab: '',
      VideoFanTab: [],
      VideoFanLineData: [],
      VideoLikeActiveTab: '',
      VideoLikeTab: [],
      VideoLikeLineData: [],
      tabWordList: [{}, {
        activeName: 'VideoActorActiveTab',
        tabList: 'VideoActorTab',
        lineData: 'VideoActorLineData'
      }, {
        activeName: 'VideoFanActiveTab',
        tabList: 'VideoFanTab',
        lineData: 'VideoFanLineData'
      }, {
        activeName: 'VideoLikeActiveTab',
        tabList: 'VideoLikeTab',
        lineData: 'VideoLikeLineData'
      }],
      tab1active: true,
      tab2active: true,
      tab3active: true
    }
  },
  mounted () {
    this.getLine1()
    this.getLine2()
    this.getLine3()
    this.getVideoTarget()
    setTimeout(() => {
      this.loading1 = false
    }, 1000)
  },
  methods: {
    getVideoTarget () {
      getVideoTarget(this.data).then(res => {
        this.indexData = res
      })
    },
    getVideoActor (params) {
      const parameter = Object.assign({}, params, this.data)
      return getVideoActor(parameter).then(res => {
        return res
      })
    },
    getVideoFan (params) {
      const parameter = Object.assign({}, params, this.data)
      return getVideoFan(parameter).then(res => {
        return res
      })
    },
    getVideoLike (params) {
      const parameter = Object.assign({}, params, this.data)
      return getVideoLike(parameter).then(res => {
        return res
      })
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
    getFiles (type, activeName, prop) {
      getVideoTargetfile({ type: type }).then(res => {
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
      getVideoLine(parameter).then(res => {
        res.forEach(item => {
          item.prop = chartItemName
        })
        this[this.tabWordList[type].lineData] = res
      })
    },
    changeTab (val) {
      this[val] = !this[val]
    },
    exportData () {
      var exportUrl = ''
      Object.keys(this.data).map((key) => {
          if (this.data[key]) {
            exportUrl += key + '=' + this.data[key] + '&'
          }
      })
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/report/video/export?${exportUrl}`
    }
  },
  watch: {
    data () {
      this.getVideoTarget()
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
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../index.less';
</style>
