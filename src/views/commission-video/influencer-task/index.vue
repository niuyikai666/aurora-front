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
        主播任务列表
      </div>
      <template v-for="li in tabList">
        <span :slot="li.key" :key="li.key">{{ li.tabText }}</span>
      </template>
      <div slot="extra">
        <month-comp v-model="monthDate" :disabledDate="disabledDate"/>
      </div>
      <div class="block"></div>
      <influencer-task v-if="type === 'influencer-task'" :fn="getInfluencerTaskList" :monthDate="monthDate" />
      <my-influencer v-if="type === 'my-influencer-task'" :fn="getMyInfluencerTaskList" :monthDate="monthDate" />
    </a-card>
  </div>
</template>

<script>
import influencerTask from './components/InfluencerTask'
import myInfluencer from './components/myInfluencer'
import moment from 'moment'
import MonthComp from '../components/MonthComp'
import { getInfluencerTaskList, getMyInfluencerTaskList } from '@/api/commission-video'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tabList: [],
      tabListNoTitle: [
        {
          key: 'my-influencer-task',
          tabText: '我的主播任务',
          permission: 'wechat_settle_list_myself',
          scopedSlots: { tab: 'my-influencer-task' }
        },
        {
          key: 'influencer-task',
          tabText: '主播任务',
          permission: 'wechat_settle_list_actor',
          scopedSlots: { tab: 'influencer-task' }
        }
      ],
      type: '',
      getInfluencerTaskList,
      getMyInfluencerTaskList,
      monthDate: moment().format('YYYY-MM')
    }
  },

  components: {
    MonthComp,
    influencerTask,
    myInfluencer
  },

  mounted () {
    this.getTabList()
  },
  computed: {
    ...mapGetters(['permission'])
  },
  methods: {
    getTabList () {
      this.tabList = this.tabListNoTitle.filter(item => this.permission.includes(item.permission))
      this.type = this.tabList.length !== 0 ? this.tabList[0].key : ''
    },
    handleTabChange (key) {
      this.type = key
    },
    disabledDate (time) {
      // return time.valueOf() > Date.now()
      return false
    }
  }
}

</script>
<style lang='less' scoped>
@import './index.less';
</style>
