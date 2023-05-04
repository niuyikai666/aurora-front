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
          我的主播
        </div>
        <template v-for="li in tabListNoTitle">
          <span :slot="li.key" :key="li.key">{{ li.tabText }} {{ li.num }}</span>
        </template>
        <div class="block"></div>
        <all ref="all" :fn="getArtistMyVideoList" :type="type" v-if="type === 'all'"/>
        <!-- <enter-union ref="enterUnion" :fn="getArtistMyRetiredVideoList" :type="type" v-if="type === 'enterUnion'"/> -->
        <retired ref="retired" :fn="getArtistMyRetiredVideoList" :type="type" v-if="type === 'retired'" />
      </a-card>
      <import-comp v-if="visibleImport" :visible="visibleImport" @cancel="visibleImport = false" />
    </a-col>
  </a-row>
</template>

<script>
import all from './components/all'
import retired from './components/retired'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import TopTipVideo from '../components/TopTipVideo'
import TitleTip from '../components/TitleTip'
import { getArtistMyVideoList, getArtistMyRetiredVideoList, getCountVideoNum } from '@/api/artists-video'
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
    retired
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
      getArtistMyVideoList,
      getArtistMyRetiredVideoList
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
      getCountVideoNum().then(res => {
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

    handleTabChange (key) {
      this.type = key
    },

    importHandle () {
      this.visibleImport = true
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
