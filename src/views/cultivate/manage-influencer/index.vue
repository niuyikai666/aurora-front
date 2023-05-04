<template>
  <div>
    <a-row>
      <a-col class="lg-24">
        <a-card
          class="card-custom head-mb5"
          style="width:100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="type"
          @tabChange="key => handleTabChange(key)"
        >
          <div slot="title">
            管理主播账号
          </div>
          <template v-for="li in tabListNoTitle">
            <span :slot="li.key" :key="li.key">{{ li.tabText }}</span>
          </template>
        </a-card>
      </a-col>
    </a-row>
    <div class="block"></div>
    <actived v-if="type === 'actived'" :fn="getManageActivedList"/>
    <activing v-if="type === 'activing'" :fn="getManageActivingList"/>
    <out-time v-if="type === 'out-time'" :fn="getManageOutTimeList"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getManageActivingList, getManageActivedList, getManageOutTimeList } from '@/api/cultivate'
import activing from './components/activing'
import actived from './components/actived'
import outTime from './components/outTime'
export default {
  name: 'ArtistsList',
  components: {
    activing,
    actived,
    outTime
  },
  data () {
    return {
      tabListNoTitle: [],
      tabListNoTitleSource: [
        {
          key: 'actived',
          tabText: '已激活主播',
          permission: 'train_manage_activate',
          scopedSlots: { tab: 'actived' }
        },
        {
          key: 'activing',
          tabText: '可激活主播',
          permission: 'train_manage_activatable',
          scopedSlots: { tab: 'activing' }
        },
        {
          key: 'out-time',
          tabText: '失效账号',
          permission: 'train_manage_failure',
          scopedSlots: { tab: 'out-time' }
        }
      ],
      type: 'actived',
      getManageOutTimeList,
      getManageActivingList,
      getManageActivedList
    }
  },
  created () {
    this.getTabList()
  },
  computed: {
    ...mapGetters(['permission'])
  },
  mounted () {
  },
  methods: {
    handleTabChange (key) {
      this.type = key
    },
    getTabList () {
      this.tabListNoTitle = this.tabListNoTitleSource.filter(item => this.permission.includes(item.permission))
      this.type = this.tabListNoTitle.length !== 0 ? this.tabListNoTitle[0].key : ''
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
