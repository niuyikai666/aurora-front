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
        抖音数据明细
      </div>
      <template v-for="li in tabList" >
        <span :slot="li.key" :key="li.key">{{ li.tabText }}</span>
      </template>
      <div class="block"></div>
      <my v-if="type === 'my'"/>
      <platform v-if="type === 'platform'" />
    </a-card>
  </div>
</template>

<script>
import my from './operate'
import platform from './manage'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tabList: [],
      tabListNoTitle: [
        {
          key: 'my',
          tabText: '我的主播',
          permission: 'tiktok_live_info_operator_list_look',
          scopedSlots: { tab: 'my' }
        },
        {
          key: 'platform',
          tabText: '平台主播',
          permission: 'tiktok_live_info_dep_list_look',
          scopedSlots: { tab: 'platform' }
        }
      ],
      type: ''
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
