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
                  <dt>核心主播数</dt>
                  <dd>历史有一个月流水达到五万元的主播</dd>
                  <dt>流水>5W主播数</dt>
                  <dd>上月流水大于等于五万的主播数</dd>
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
              :newData="indexData.current.newActorCount"
              :oldData="indexData.last ? indexData.last.newActorCount : ''"
              :lastData="indexData.last"
            />
          </a-col>
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="核心主播数（人）"
              :newData="indexData.current.coreActorCount"
              :oldData="indexData.last ? indexData.last.coreActorCount : ''"
              :lastData="indexData.last"
            />
          </a-col>
          <a-col :sm="24" :md="12" :xl="6">
            <target-data
              title="流水>5W主播数（人）"
              :newData="indexData.current.coreActorCount"
              :oldData="indexData.last ? indexData.last.coreActorCount : ''"
              :lastData="indexData.last"
            />
          </a-col>
        </a-row>
      </a-skeleton>
    </tab-content>
    <tab-content title="按日期">
      <span slot="titleRightContent">
        <a-button type="link" class="mr10" @click="changeTab('tab1active')" :data-id="tab1active">{{ tab1active ? '数据表' : '图表' }}</a-button>
      </span>
      <com-chart
        v-if="tab1active"
        :activeTab="dateActiveTab"
        :tab="dateTab"
        :lineData="dateLineData"
        @change="getDateLine"
      />
      <com-table
        v-if="!tab1active"
        ref="table1"
        :getList="getRewardList"
        :columns="dateColumns"
        :data="data"
      />
    </tab-content>
    <tab-content title="按组织">
      <template slot="search">
        <a-tree-select
          allow-clear
          multiple
          v-model="groupIds"
          class="group-select"
          :tree-data="treeData"
          search-placeholder="选择组织"
        />
        <!-- <a-button type="primary" class="ml10" @click="searchGroup">搜索</a-button> -->
      </template>
      <span slot="titleRightContent">
        <a-button type="link" class="mr10" @click="changeTab('tab2active')">{{ tab2active ? '数据表' : '图表' }}</a-button>
      </span>
      <com-chart
        v-if="tab2active"
        :activeTab="groupActiveTab"
        :tab="groupTab"
        :lineData="groupLineData"
        @change="getGroupLine"
      />
      <com-table
        v-if="!tab2active"
        ref="table2"
        :getList="getGroupList"
        :columns="groupColumns"
        :data="data"
      />
    </tab-content>
    <tab-content title="按运营">
      <template slot="search">
        <search-select
          class="group-select"
          :searchFn="searchOperatorList"
          v-model="operatorIds"
          idKey="id"
          nameKey="name"
          type="2"
          :departmentId="data.departmentId"
        />
        <!-- <a-button type="primary" class="ml10" @click="searchOperator">搜索</a-button> -->
      </template>
      <span slot="titleRightContent">
        <a-button type="link" class="mr10" @click="changeTab('tab3active')">{{ tab3active ? '数据表' : '图表' }}</a-button>
      </span>
      <com-chart
        v-if="tab3active"
        :activeTab="operatorActiveTab"
        :tab="operatorTab"
        :lineData="operatorLineData"
        @change="getOperatorLine"
      />
      <com-table
        v-if="!tab3active"
        ref="table3"
        :getList="getOperatorList"
        :columns="operatorColumns"
        :data="data"
      />
    </tab-content>
    <tab-content title="按主播">
      <template slot="search">
        <search-select
          class="group-select"
          :searchFn="searchInfluencerList"
          v-model="influencerIds"
          idKey="tiktokLiveInfoId"
          nameKey="nickName"
          type="video"
          :departmentId="data.departmentId"
        />
        <!-- <a-button type="primary" class="ml10" @click="searchInfluencer">搜索</a-button> -->
      </template>
      <span slot="titleRightContent">
        <a-button type="link" class="mr10" @click="changeTab('tab4active')">{{ tab4active ? '数据表' : '图表' }}</a-button>
      </span>
      <com-chart
        v-if="tab4active"
        :activeTab="influencerActiveTab"
        :tab="influencerTab"
        :lineData="influencerLineData"
        @change="getInfluencerLine"
      />
      <com-table
        v-if="!tab4active"
        ref="table4"
        :getList="getInfluencerList"
        :columns="influencerColumns"
        :data="data"
      />
    </tab-content>
  </div>
</template>

<script>
import ComTable from '../../ComTable'
import ComChart from '../../ComChart'
import TabContent from '../../TabContent'
import TargetData from '../../TargetData'
import SearchSelect from '../../searchSelect'
// import { createTree } from '@/utils/tree/selectTree'
import createTree from '@/utils/tree/generateTree'
import { dateColumns, groupColumns, operatorColumns, influencerColumns } from './tableColumns'
import {
  searchOperatorList,
  searchInfluencerList,
  videoAnalyzeInfluencerChart,
  getVideoAnalyzeInfluencerList,
  getVideoAnalyzeOperateList,
  videoAnalyzeOperateChart,
  getDepartmentChild,
  getVideoAnalyzeGroupList,
  videoAnalyzeGroupChart,
  getVideoAnalyzefieldList,
  getVideoActor,
  getVideoLine,
  getVideoTargetfile,
  getVideoAnalyzeTarget } from '@/api/report'
export default {
  name: 'DataComp',
  components: {
    TabContent,
    ComTable,
    TargetData,
    ComChart,
    SearchSelect
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
      searchOperatorList,
      searchInfluencerList,
      dateColumns,
      groupColumns,
      operatorColumns,
      influencerColumns,
      loading1: true,
      treeData: [],
      indexData: {
        current: '',
        last: ''
      },
      tab1active: true,
      tab2active: true,
      tab3active: true,
      tab4active: true,
      dateActiveTab: '',
      groupActiveTab: '',
      operatorActiveTab: '',
      influencerActiveTab: '',
      dateTab: [],
      groupTab: [],
      operatorTab: [],
      influencerTab: [],
      dateLineData: [],
      operatorLineData: [],
      groupLineData: [],
      influencerLineData: [],
      groupIds: [],
      operatorIds: [],
      influencerIds: [],
      operatorFlag: true,
      groupFlag: true,
      influencerFlag: true,
      groupsFristLoad: true,
      operatorFirstLoad: true,
      influencerFirstLoad: true
    }
  },
  mounted () {
    this.getStructureTreeHandle()
    this.getTarget()
    this.getDatefileList()
    this.getGroupfileList()
    this.getOperatorfileList()
    this.getInfluencerfileList()
    setTimeout(() => {
      this.loading1 = false
    }, 1000)
  },
  methods: {
    getTarget () { // 指标统计
      getVideoAnalyzeTarget(this.data).then(res => {
        this.indexData = res
      })
    },
    exportData () { // 导出数据
      var exportUrl = ''
      Object.keys(this.data).map((key) => {
          if (this.data[key]) {
            exportUrl += key + '=' + this.data[key] + '&'
          }
      })
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/report/video/reward/export?${exportUrl}`
    },
    getDatefileList () { // 按日期折线图字段
      getVideoTargetfile({
        type: 1
      }).then(res => {
        this.dateTab = res
        this.getDateLine(res[0].name, res[0].value)
      })
    },
    getDateLine (searchData, activeTab) { // 按日期折线图数据
      this.dateActiveTab = searchData
      const params = Object.assign({}, this.data, { file: searchData })
      getVideoLine(params).then(res => {
        res.forEach(item => {
          item.prop = activeTab
        })
        this.dateLineData = res
      })
    },
    getRewardList (params) { // 按日期数据表
      const parameter = Object.assign({}, params, this.data)
      return getVideoActor(parameter).then(res => {
        return res
      })
    },
    getGroupfileList () { // 获取 按组织、按运营、按主播折线图字段   按组织、按运营 type: 1;按主播 type: 2
      getVideoAnalyzefieldList({ type: 1 }).then(res => {
        this.groupTab = res
        this.getGroupLine(res[0].name, res[0].value)
      })
    },
    getGroupLine (searchData) { // 按组织折线图
      searchData = searchData || this.groupTab[0].name
      this.groupActiveTab = searchData
      const params = Object.assign({}, this.data, {
        file: searchData,
        departmentIds: this.groupIds
      })
      videoAnalyzeGroupChart(params).then(res => {
        if (this.groupIds.length <= 0 && this.groupsFristLoad) {
          this.groupsFristLoad = false
          this.groupIds = res.ids
        }
        if (this.groupIds.length === 0) {
          this.groupLineData = []
        } else {
          this.groupLineData = res.chartModels
        }
      })
    },
    getGroupList (params) { // 按组织数据表
      const parameter = Object.assign({}, params, this.data, {
        departmentIds: this.groupIds
      })
      return getVideoAnalyzeGroupList(parameter).then(res => {
        // this.groupIds = res.ids
        if (this.groupIds.length <= 0 && this.groupsFristLoad) {
          this.groupsFristLoad = false
          this.groupIds = res.ids
        }
        if (this.groupIds.length === 0) {
          res.pageResult.list = []
          res.pageResult.totalCount = 0
          res.pageResult.totalPages = 0
          res.pageResult.pageNum = 0
        }
        return res.pageResult
      })
    },
    getOperatorfileList () { // 获取 按组织、按运营、按主播折线图字段   按组织、按运营 type: 1;按主播 type: 2
      getVideoAnalyzefieldList({ type: 1 }).then(res => {
        this.operatorTab = res
        this.getOperatorLine(res[0].name, res[0].value)
      })
    },
    getOperatorLine (searchData) { // 按运营折线图
      searchData = searchData || this.operatorTab[0].name
      this.operatorActiveTab = searchData
      const params = Object.assign({}, this.data, {
        file: searchData,
        idList: this.operatorIds.map(item => {
          return item.key
        })
      })
      videoAnalyzeOperateChart(params).then(res => {
        if (this.operatorIds.length <= 0 && this.operatorFirstLoad) {
          this.operatorFirstLoad = false
          this.operatorIds = res.ids.map(item => ({
            label: item.name,
            key: String(item.id)
          }))
        }
        if (this.operatorIds.length === 0) {
          this.operatorLineData = []
        } else {
          this.operatorLineData = res.chartModels
        }
      })
    },
    getOperatorList (params) { // 按运营数据表
      const parameter = Object.assign({}, params, this.data, {
        idList: this.operatorIds.map(item => {
          return item.key
        })
      })
      return getVideoAnalyzeOperateList(parameter).then(res => {
        // this.operatorIds = res.ids.map(item => ({
        //   label: item.name,
        //   key: String(item.id)
        // }))
        if (this.operatorIds.length <= 0 && this.operatorFirstLoad) {
          this.operatorFirstLoad = false
          this.operatorIds = res.ids.map(item => ({
            label: item.name,
            key: String(item.id)
          }))
        }
        if (this.operatorIds.length === 0) {
           res.pageResult.list = []
          res.pageResult.totalCount = 0
          res.pageResult.totalPages = 0
          res.pageResult.pageNum = 0
        }
        return res.pageResult
      })
    },
    getInfluencerfileList () { // 获取 按组织、按运营、按主播折线图字段   按组织、按运营 type: 1;按主播 type: 2
      getVideoAnalyzefieldList({ type: 2 }).then(res => {
        this.influencerTab = res
        this.getInfluencerLine(res[0].name, res[0].value)
      })
    },
    getInfluencerLine (searchData) { // 按主播折线图
      searchData = searchData || this.influencerTab[0].name
      this.influencerActiveTab = searchData
      const params = Object.assign({}, this.data, {
        file: searchData,
        idList: this.influencerIds.map(item => {
          return item.key
        })
      })
      videoAnalyzeInfluencerChart(params).then(res => {
        if (this.influencerIds.length <= 0 && this.influencerFirstLoad) {
          this.influencerFirstLoad = false
          this.influencerIds = res.ids.map(item => ({
            label: item.nickName,
            key: String(item.tiktokLiveInfoId)
          }))
        }
        if (this.influencerIds.length === 0) {
          this.influencerLineData = []
        } else {
          this.influencerLineData = res.chartModels
        }
      })
    },
    getInfluencerList (params) { // 按主播数据表
      const parameter = Object.assign({}, params, this.data, {
        idList: this.influencerIds.map(item => {
          return item.key
        })
      })
      return getVideoAnalyzeInfluencerList(parameter).then(res => {
        if (this.influencerIds.length <= 0 && this.influencerFirstLoad) {
          this.influencerFirstLoad = false
          this.influencerIds = res.ids.map(item => ({
            label: item.name,
            key: String(item.id)
          }))
        }
        if (this.influencerIds.length === 0) {
          res.pageResult.list = []
          res.pageResult.totalCount = 0
          res.pageResult.totalPages = 0
          res.pageResult.pageNum = 0
        }
        return res.pageResult
      })
    },
    changeTab (tab) {
      this.refreshView(tab)
      this[tab] = !this[tab]
    },
    getStructureTreeHandle () {
      getDepartmentChild({ departmentId: this.data.departmentId }).then(res => {
        this.treeData = [
          ...createTree(res)
        ]
      })
    },
    searchGroup () {
      // if (this.groupIds.length <= 0) {
      //   this.$message.error('搜索条件需大于1')
      //   return
      // }
      if (this.groupIds.length > 20) {
        this.$message.error('搜索条件不能大于20')
        this.groupIds = this.groupIds.slice(0, 20)
        return
      }
      if (this.tab2active) {
        this.getGroupLine()
      } else {
        this.$refs.table2.refresh()
      }
    },
    searchOperator () {
      // if (this.operatorIds.length <= 0) {
      //   this.$message.error('搜索条件需大于1')
      //   return
      // }
      if (this.operatorIds.length > 20) {
        this.$message.error('搜索条件不能大于20')
        this.operatorIds = this.operatorIds.slice(0, 20)
        return
      }
      if (this.tab3active) {
        this.getOperatorLine()
      } else {
        this.$refs.table3.refresh()
      }
    },
    searchInfluencer () {
      // if (this.influencerIds.length <= 0) {
      //   this.$message.error('搜索条件需大于1并且小于20')
      //   return
      // }
      if (this.influencerIds.length > 20) {
        this.$message.error('搜索条件不能大于20')
        this.influencerIds = this.influencerIds.slice(0, 20)
        return
      }
      if (this.tab4active) {
        this.getInfluencerLine()
      } else {
        this.$refs.table4.refresh()
      }
    },
    refreshView (tab) {
      if (!this.tab2active && tab === 'tab2active') {
        this.getGroupLine()
      }
      if (!this.tab3active && tab === 'tab3active') {
        this.getOperatorLine()
      }
      if (!this.tab4active && tab === 'tab4active') {
        this.getInfluencerLine()
      }
    }
  },
  watch: {
    data () {
      this.groupIds = this.influencerIds = this.operatorIds = []
      this.influencerFirstLoad = this.operatorFirstLoad = this.groupsFristLoad = true
      this.getTarget()
      this.getStructureTreeHandle()
      if (this.$refs.table1) {
        this.$refs.table1.refresh(true)
      } else {
        this.getDatefileList()
      }
      if (this.$refs.table2) {
        this.$refs.table2.refresh(true)
      } else {
        this.getGroupfileList()
      }
      if (this.$refs.table3) {
        this.$refs.table3.refresh(true)
      } else {
        this.getOperatorfileList()
      }
      if (this.$refs.table4) {
        this.$refs.table4.refresh(true)
      } else {
        this.getInfluencerfileList()
      }
    },
    groupIds (newValue, oldValue) {
      if (this.groupFlag) {
        this.groupFlag = false
        return
      }
      if (newValue.length === oldValue.length) {
        return
      }
      this.searchGroup()
    },
    operatorIds (newValue, oldValue) {
      if (this.operatorFlag) {
        this.operatorFlag = false
        return
      }
      if (newValue.length === oldValue.length) {
        return
      }
      this.searchOperator()
    },
    influencerIds (newValue, oldValue) {
      if (this.influencerFlag) {
        this.influencerFlag = false
        return
      }
      if (newValue.length === oldValue.length) {
        return
      }
      this.searchInfluencer()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../index.less';
</style>
