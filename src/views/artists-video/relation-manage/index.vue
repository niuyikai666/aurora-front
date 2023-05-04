<template>
  <a-row>
    <a-col class="lg-24">
      <!-- <top-tip :updateTime="updateTime" :permission="permission" /> -->
      <a-card
        class="card-custom head-mb5"
        style="width:100%"
        :bordered="false"
        :tabList="tabListNoTitle"
        :activeTabKey="type"
        @tabChange="key => handleTabChange(key)"
      >
        <div slot="title">
          主播关系管理
        </div>
        <template v-for="li in tabListNoTitle">
          <span :slot="li.key" :key="li.key">{{ li.tabText }}</span>
        </template>
        <div class="block"></div>
        <admin ref="admin" :fn="getRelationManageList" :type="type" v-if="type === 'admin'"/>
        <mine ref="mine" :fn="getOperateList" :type="type" v-if="type === 'mine'"/>
        <none ref="none" :fn="getFreeList" :type="type" v-if="type === 'none'"/>
        <bounding ref="bounding" :fn="getBoundingList" :type="type" v-if="type === 'bounding'"/>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import admin from './components/admin'
import mine from './components/mine'
import none from './components/none'
import bounding from './components/bounding'
import { mapGetters } from 'vuex'
import { getRelationManageList, getOperateList, getFreeList, getBoundingList } from '@/api/artists-video'
import { numberFormat } from '@/utils/util'

export default {
  name: 'ArtistsList',
  components: {
    admin,
    mine,
    none,
    bounding
  },
  data () {
    return {
      advanced: false,
      tabListNoTitle: [],
      tabListNoTitleSource: [
        {
          key: 'admin',
          tabText: '主播关系信息管理',
          scopedSlots: { tab: 'admin' }
        },
        {
          key: 'mine',
          tabText: '我提交的主播信息',
          scopedSlots: { tab: 'mine' }
        },
        {
          key: 'none',
          tabText: '无运营主播',
          scopedSlots: { tab: 'none' }
        },
        {
          key: 'bounding',
          tabText: '待我绑定主播',
          scopedSlots: { tab: 'bounding' }
        }
      ],
      numberFormat,
      type: 'admin',
      getRelationManageList,
      getOperateList,
      getFreeList,
      getBoundingList
    }
  },
  created () {
    let arr = this.tabListNoTitleSource
    if (!this.permission.includes('wechat_actor_relation_info_list')) {
      arr = arr.filter(item => item.key !== 'admin')
    }
    if (!this.permission.includes('wechat_mysubmit_actor_info_list')) {
      arr = arr.filter(item => item.key !== 'mine')
    }
    if (!this.permission.includes('wechat_no_operation_list')) {
      arr = arr.filter(item => item.key !== 'none')
    }
    this.type = arr.length !== 0 ? arr[0].key : ''
    this.tabListNoTitle = arr
  },
  mounted () {
    // this.tabListNoTitle = this.tabListNoTitleSource
  },
  methods: {
    handleTabChange (key) {
      this.type = key
    }
  },
  computed: {
    ...mapGetters(['permission'])
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
