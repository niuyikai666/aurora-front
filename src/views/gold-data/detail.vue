<template>
  <div class="artists-detail-content">
    <a-card
      :bordered="false"
      style="margin-bottom:24px"
      :loading="topLoading"
    >
      <!-- <p class="titleInfo"><span class="pointer" @click="toList">账号搜索</span><span class="xian">/</span><span class="info">主播信息</span></p> -->
      <top-content style="width:100%" :data="mainData"></top-content>
    </a-card>
    <a-card
      style="min-height:700px"
      :borderd="false"
      :tab-list="tabList"
      :active-tab-key="activeTab"
      @tabChange="onTabChange"
    >
      <tab-one v-if="activeTab == 'tab1'"></tab-one>
      <tab-two v-if="activeTab == 'tab2'"></tab-two>
    </a-card>
  </div>
</template>

<script>
import { getArtistMainData } from '@/api/goldData'
import TopContent from './components/TopContent'
import TabTwo from './components/TabTwo'
import TabOne from './components/TabOne'
export default {
  name: 'ArtistsDetail',
  components: {
    TabTwo,
    TabOne,
    TopContent
  },
  data () {
    return {
      isEdit: '',
      tabList: [],
      activeTab: '',
      mainData: {},
      topLoading: true,
      bottomLoading: true
    }
  },
  created () {
    if (!this.$route.query.id) {
      this.toList()
    }
    this.id = this.$route.query.id
    if (!this.$route.query.edit) {
      this.isEdit = 2
    } else {
      this.isEdit = this.$route.query.edit
    }
    this.getMainData()
  },
  mounted () {},
  methods: {
    getMainData () {
      getArtistMainData(this.id).then(res => {
        this.mainData = res
        if (res.isVideor) {
          this.tabList = [{
            key: 'tab1',
            tab: '主播信息'
          }, {
            key: 'tab2',
            tab: '短视频'
          }]
          this.activeTab = 'tab2'
        } else {
          this.tabList = [{
            key: 'tab1',
            tab: '主播信息'
          }]
          this.activeTab = 'tab1'
        }
        this.topLoading = false
      })
    },
    toList () {
      this.$router.push({
        path: '/artists-operation/gold-data/workplace'
      })
    },
    onTabChange (tab) {
      if (this.activeTab === tab) {
        return
      }
      this.activeTab = tab
      this.bottomLoading = true
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
.titleInfo{
  line-height: 22px;
  font-size: 14px;
  color: rgba(9, 0, 0, .45);
  .xian{
    margin: 0 8px;
  }
  .info{
     color: rgba(9, 0, 0, .65);
  }
  .pointer{
    cursor: pointer;
    &:hover{
      text-decoration: underline;
    }
  }
}
.artists-detail-content{
  min-height: 1000px;
  background: #F0F2F5;
}
</style>
