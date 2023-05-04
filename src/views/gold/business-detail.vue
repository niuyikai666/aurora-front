<template>
  <div class="artists-detail-content">
    <a-card
      :loading="loading"
      :bordered="false"
      style="margin-bottom:24px"
    >
      <top-content style="width:100%" :data="mainData"></top-content>
    </a-card>
    <a-card
      :borderd="false"
      :tab-list="tabList"
      :active-tab-key="activeTab"
      @tabChange="onTabChange"
    >
      <a-button type="primary" slot="tabBarExtraContent" @click="changeEdit(2)" v-if="isEdit === 1 && permission.includes('goldData_operation_inside_edit')">修改</a-button>
      <a-button slot="tabBarExtraContent" @click="changeEdit(1)" v-if="isEdit === 2 && permission.includes('goldData_operation_inside_edit')">取消</a-button>
      <artist-info v-if="isEdit===1"/>
      <artist-info-edit v-if="isEdit===2" @changeEdit="changeEdit"/>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getArtistMainData } from '@/api/gold'
import TopContent from './components/TopContent'
import ArtistInfo from './components/ArtistInfo'
import ArtistInfoEdit from './components/ArtistInfoEdit'
import MediaInfo from './components/MediaInfo'
import MediaInfoEdit from './components/MediaInfoEdit'
export default {
  name: 'ArtistsDetail',
  components: {
    TopContent,
    ArtistInfo,
    MediaInfo,
    MediaInfoEdit,
    ArtistInfoEdit
  },
  data () {
    return {
      isEdit: 1,
      tabList: [{
        key: 'tab1',
        tab: '主播信息'
      }],
      activeTab: 'tab1',
      mainData: {},
      loading: true
    }
  },
  created () {
    if (!this.$route.query.id) {
      this.toList()
    }
    this.id = this.$route.query.id
    this.getMainData()
  },
  mounted () {
  },
  methods: {
    getMainData () {
      getArtistMainData(this.id).then(res => {
        this.mainData = res
        this.loading = false
      })
    },
    toList () {
      this.$router.push({
        path: '/gold/list'
      })
    },
    onTabChange (tab) {
      if (this.activeTab === tab) {
        return
      }
      this.activeTab = tab
    },
    changeEdit (type) {
      this.getMainData()
      this.isEdit = type
    }
  },
  computed: {
    ...mapGetters(['permission'])
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
</style>
