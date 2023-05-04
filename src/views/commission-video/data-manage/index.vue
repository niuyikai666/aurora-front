<template>
  <div class="commission-wraper">
    <a-card
      class="card-custom head-mb5"
      style="width:100%"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="type"
      @tabChange="key => handleTabChange(key)"
    >
      <div slot="title">
        数据管理
      </div>
      <template v-for="li in tabList">
        <span :slot="li.key" :key="li.key">{{ li.tabText }}</span>
      </template>
      <div slot="extra">
        <year-comp v-model="monthDate1" v-show="type === 'pull-task'"/>
        <date-comp v-model="monthDate2" v-show="type === 'day-data'"/>
        <month-comp v-model="monthDate" :disabledDate="disabledDate" v-show="type === 'video-task' || type=== 'task-type' || type=== 'data-info'"/>
      </div>
      <div class="block"></div>
      <video-task v-if="type === 'video-task'" :fn="getVideoTaskList" :monthDate="monthDate" />
      <pull-task v-if="type === 'pull-task'" :fn="getPullTaskList" :monthDate="monthDate1"/>
      <task-type v-if="type === 'task-type'" :fn="getTaksTypeList" :monthDate="monthDate"/>
      <data-info v-if="type === 'data-info'" :fn="getDataInfoList" :monthDate="monthDate"/>
      <day-data v-if="type === 'day-data'" :fn="getDayDataList" :monthDate="monthDate2"/>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import MonthComp from '../components/MonthComp'
import yearComp from '../components/yearComp'
import dateComp from '../components/dateComp'
import { getVideoTaskList, getPullTaskList, getTaksTypeList, getDataInfoList, getDayDataList } from '@/api/commission-video'
import { mapGetters } from 'vuex'
import videoTask from './components/videoTask'
import pullTask from './components/pullTask'
import taskType from './components/taskType'
import dataInfo from './components/dataInfo'
import dayData from './components/dayData'
export default {
  data () {
    return {
      tabList: [],
      tabListNoTitle: [
        {
          key: 'video-task',
          tabText: '视频号任务管理',
          permission: '',
          scopedSlots: { tab: 'video-task' }
        },
        {
          key: 'task-type',
          tabText: '主播任务类型管理',
          permission: '',
          scopedSlots: { tab: 'task-type' }
        },
        {
          key: 'data-info',
          tabText: '专业主播明细数据管理',
          permission: '',
          scopedSlots: { tab: 'data-info' }
        },
        {
          key: 'day-data',
          tabText: '短视频日数据管理',
          permission: '',
          scopedSlots: { tab: 'day-data' }
        },
        {
          key: 'pull-task',
          tabText: '拉新主播进阶任务管理',
          permission: '',
          scopedSlots: { tab: 'pull-task' }
        }
      ],
      type: '',
      getVideoTaskList,
      getPullTaskList,
      getTaksTypeList,
      getDataInfoList,
      getDayDataList,
      monthDate: moment().format('YYYY-MM'),
      monthDate1: moment().format('YYYY'),
      monthDate2: moment().format('YYYY-MM-DD')
    }
  },

  components: {
    MonthComp,
    videoTask,
    pullTask,
    yearComp,
    taskType,
    dataInfo,
    dateComp,
    dayData
  },

  mounted () {
    this.getTabList()
  },
  computed: {
    ...mapGetters(['permission'])
  },
  methods: {
    getTabList () {
      // this.tabList = this.tabListNoTitle.filter(item => this.permission.includes(item.permission))
      this.tabList = this.tabListNoTitle
      this.type = this.tabList.length !== 0 ? this.tabList[0].key : ''
    },
    handleTabChange (key) {
      this.type = key
    },
    disabledDate (time) {
      return time.valueOf() > Date.now()
    }
  }
}

</script>
<style lang='less' scoped>
@import './index.less';
</style>
