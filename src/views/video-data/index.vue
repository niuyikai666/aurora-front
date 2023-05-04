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
        视频号数据明细
      </div>
      <template v-for="li in tabList" >
        <span :slot="li.key" :key="li.key">{{ li.tabText }}</span>
      </template>
      <div class="block"></div>
      <platform v-if="type === 'platform'" :fn="getPlatformList" />
      <my v-if="type === 'my'" :fn="getMyList" />
    </a-card>
  </div>
</template>

<script>
import platform from './components/platform'
import my from './components/my'
import { getPlatformList, getMyList } from '@/api/video-data'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tabList: [],
      tabListNoTitle: [
        {
          key: 'my',
          tabText: '我的主播',
          permission: 'wechat_report_mine',
          scopedSlots: { tab: 'my' }
        },
        {
          key: 'platform',
          tabText: '平台主播',
          permission: 'wechat_report_platform_list',
          scopedSlots: { tab: 'platform' }
        }
      ],
      type: '',
      getMyList,
      getPlatformList
    }
  },

  components: {
    platform,
    my
  },

  mounted () {
    this.getTabList()
  },
  computed: {
    ...mapGetters(['permission'])
  },
  methods: {
    getTabList () {
      // this.tabList = this.tabListNoTitle
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
