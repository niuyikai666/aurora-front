<template>
  <div>
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
            主播列表
          </div>
          <template v-for="li in tabListNoTitle">
            <span :slot="li.key" :key="li.key">{{ li.tabText }} {{ li.num }}</span>
          </template>
          <div slot="extra">
            <a-button class="export-result" style="margin-right:10px" type="primary" @click="exportVisible = true">导出结果</a-button>
            <a-button style="margin-right:10px" type="primary" @click="dailyVisible = true" v-if="permission.includes('wechat_import_actor_daily')">导入主播日数据</a-button>
            <a-button style="margin-right:10px" type="primary" @click="joinVisible = true" v-if="permission.includes('wechat_import_actor_join')">导入入会时间</a-button>
            <a-button style="margin-right:10px" type="primary" @click="signVisible = true" v-if="permission.includes('wechat_import_actor_sign')">导入签约信息</a-button>
          </div>
          <div class="block"></div>
          <all ref="all" :fn="getArtistAllVideoList" :type="type" v-if="type === 'all'"/>
          <retired ref="retired" :fn="getArtistRetiredVideoList" :type="type" v-if="type === 'retired'" />
        </a-card>
        <import-comp v-if="visibleImport" :visible="visibleImport" @cancel="visibleImport = false" />
      </a-col>
    </a-row>
    <import-modal
      title="导入主播日数据"
      :visible="dailyVisible"
      @cancel="dailyVisible = false"
      :templateUrl="templateDailyUrl"
      :uploadUrl="uploadDailyUrl"
      :errorUrl="errorDailyUrl"
      @refresh="refresh"/>
    <import-modal
      title="导入入会时间"
      :visible="joinVisible"
      @cancel="joinVisible = false"
      :templateUrl="templateJoinUrl"
      :uploadUrl="uploadJoinUrl"
      :errorUrl="errorJoinUrl"
      @refresh="refresh"/>
    <import-modal
      title="导入签约信息"
      :visible="signVisible"
      @cancel="signVisible = false"
      :templateUrl="templateSignUrl"
      :uploadUrl="uploadSignUrl"
      :errorUrl="errorSignUrl"
      @refresh="refresh"/>
    <export-modal
      :visible="exportVisible"
      @cancel="exportVisible = false"/>
  </div>
</template>

<script>
import importModal from './components/importModal'
import exportModal from './components/exportModal'
import all from './components/all'
import retired from './components/retired'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import TopTipVideo from '../components/TopTipVideo'
import TitleTip from '../components/TitleTip'
import { getArtistAllVideoList, getArtistRetiredVideoList, getCountManageVideoNum } from '@/api/artists-video'
import Ellipsis from '@/components/Ellipsis'
import { numberFormat } from '@/utils/util'
import importVideo from '../components/importVideo'

export default {
  name: 'ArtistsList',
  components: {
    STable,
    Ellipsis,
    TopTipVideo,
    TitleTip,
    importVideo,
    all,
    retired,
    importModal,
    exportModal
  },
  data () {
    return {
      advanced: false,
      tabListNoTitle: [],
      tabListNoTitleSource: [
        {
          key: 'all',
          tabText: '全部主播',
          num: '',
          numkey: 'allType',
          scopedSlots: { tab: 'all' }
        },
        {
          key: 'retired',
          tabText: '退会主播',
          num: '',
          numkey: 'retiredType',
          scopedSlots: { tab: 'retired' }
        }
      ],
      updateTime: '',
      loading: true,
      numberFormat,
      visibleImport: false,
      type: 'all',
      getArtistAllVideoList,
      getArtistRetiredVideoList,
      exportVisible: false,
      dailyVisible: false,
      templateDailyUrl: `${process.env.VUE_APP_API_BASE_URL}/wechat/info/download/daily/template`,
      uploadDailyUrl: `${process.env.VUE_APP_API_BASE_URL}/wechat/info/import/daily/data`,
      errorDailyUrl: `${process.env.VUE_APP_API_BASE_URL}/wechat/info/export/fail/daily`,
      joinVisible: false,
      templateJoinUrl: `${process.env.VUE_APP_API_BASE_URL}/wechat/info/download/join/template`,
      uploadJoinUrl: `${process.env.VUE_APP_API_BASE_URL}/wechat/info/import/info/join`,
      errorJoinUrl: `${process.env.VUE_APP_API_BASE_URL}/wechat/info/export/fail/join`,
      signVisible: false,
      templateSignUrl: `${process.env.VUE_APP_API_BASE_URL}/wechat/info/download/sign/template`,
      uploadSignUrl: `${process.env.VUE_APP_API_BASE_URL}/wechat/info/import/info/sign`,
      errorSignUrl: `${process.env.VUE_APP_API_BASE_URL}/wechat/info/export/fail/sign`
    }
  },
  created () {
  },
  mounted () {
    this.tabListNoTitle = this.tabListNoTitleSource
    // this.getUpdateTimeHandle()
    this.getCountHandle()
  },
  methods: {

    getCountHandle () {
      getCountManageVideoNum().then(res => {
        this.tabListNoTitle.forEach(item => {
          item.num = res[item.numkey]
        })
      })
    },

    getUpdateTimeHandle () {
      // getUpdateTime().then(res => {
      //   this.updateTime = res
      // })
    },

    importHandle () {
      this.visibleImport = true
    },
    handleTabChange (key) {
      this.type = key
    },
    refresh () {
      this.$refs[this.type].searchHandle()
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
.export-result{
  background: #fff!important;
  border: 1px solid #755DD7;
  color: #755DD7;
}
</style>
