<template>
  <div class="left-content">
    <a-card class="m-card" :loading="loading" :bordered="false">
      <a-page-header
        :breadcrumb="{ props: { routes } }"
      />
      <div class="flex-box flex-box-custom">
        <!-- <span class="avatar">
          <img :src="artistDetail.avatar" alt="">
        </span> -->
        <div class="box-item">
          <p class="name">{{ artistDetail.nickName }}</p>
          <p>抖音号: {{ artistDetail.tikTokCode }}</p>
          <p>火山号: {{ artistDetail.volcanoCode }}</p>
        </div>
      </div>
      <a-row class="statics">
        <a-col :xs="24" :sm="12" :md="12">
          <a-statistic
            title="总流水"
            :value="artistDetail.totalReward ? numberFormat(artistDetail.totalReward) : '--'"
            :suffix="artistDetail.totalReward > 10000 ? '万' : ''"
          />
        </a-col>
        <a-col :xs="24" :sm="12" :md="12">
          <a-statistic
            title="粉丝数"
            :value="artistDetail.totalFans ? numberFormat(artistDetail.totalFans) : '--'"
            :suffix="artistDetail.totalFans > 10000 ? '万' : ''"
          />
        </a-col>
        <a-col :xs="24" :sm="12" :md="12">
          <a-statistic
            title="获赞数"
            :value="artistDetail.totalLikes ? numberFormat(artistDetail.totalLikes) : '--'"
            :suffix="artistDetail.totalLikes > 10000 ? '万' : ''"
          />
        </a-col>
        <a-col :xs="24" :sm="12" :md="12">
          <a-statistic
            title="作品数"
            :value="artistDetail.totalVideo? numberFormat(artistDetail.totalVideo) : '--'"
            :suffix="artistDetail.totalVideo > 10000 ? '万' : ''"
          />
        </a-col>
      </a-row>
    </a-card>
    <a-card
      class="m-card"
      style="margin-top:24px;"
      :loading="loading"
      :bordered="false"
      :tabList="leftTabTitle"
      :activeTabKey="leftTabKey"
      @tabChange="key => leftTabHandle(key, 'leftTabKey')"
    >
      <div>
        <a-row class="statis-list">
          <a-row :gutter="8">
            <a-col :md="12">
              <a-statistic
                title="公会经纪人"
                :value="artistData.agentName ? artistData.agentName : '--'"
              />
            </a-col>
            <a-col :md="12">
              <a-statistic
                title="招募"
                :value="artistData.recruitName ? artistData.recruitName : '--' | changeText"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="12">
              <a-statistic
                title="运营"
                :value="artistData.operatorName ? artistData.operatorName : '--'"
              />
            </a-col>
            <a-col :md="12">
              <a-statistic
                title="短视频策划"
                :value="artistData.engineerName ? artistData.engineerName : '--' | changeText"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="12">
              <a-statistic
                title="主播真实姓名"
                :value="artistData.realname ? artistData.realname : '--' | changeText | changeText"
              />
            </a-col>
            <a-col :md="12">
              <a-statistic
                title="才艺类型"
                :value="artistData.talentCategory ? artistData.talentCategory.msg : '--' | changeText"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="12">
              <a-statistic
                title="主播评级"
                :value="artistData.rate ? artistData.rate : '--' | changeText"
              />
            </a-col>
            <a-col :md="12">
              <a-statistic
                title="主播颜值"
                :value="artistData.appearance ? artistData.appearance.msg : '--' | changeText"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="12">
              <description class="description" title="主播图片">
                <viewer
                  v-if="artistData.actorPic"
                  :images="[artistData.actorPic]"
                  class="img-viewer"
                >
                  <img :src="picUrl+artistData.actorPic">
                </viewer>
                <template v-else>
                  {{ '--' | changeText }}
                </template>
              </description>
            </a-col>
            <a-col :md="12">
              <a-statistic
                title="主播微信号"
                groupSeparator=""
                :value="artistData.wechat ? artistData.wechat :'--' | changeText"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="12">
              <a-statistic
                title="主播手机号"
                groupSeparator=""
                :value="artistData.tel ? artistData.tel : '--' | changeText"
              />
            </a-col>
            <a-col :md="12">
              <a-statistic
                title="主播生日"
                :value="artistData.birthday ? moment(artistData.birthday).format('YYYY-MM-DD') : '--' | changeText"
              />
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="12">
              <a-statistic
                title="主播现居地"
                :value="artistData.address ? artistData.address : '--' | changeText"
              />
            </a-col>
          </a-row>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getArtistDetail, getArtistdata } from '@/api/artists'
import { numberFormat } from '@/utils/util'
import moment from 'moment'
import Description from './Description'
// let permission = []
export default {
  components: {
    Description
  },
  props: {
    permission: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      picUrl: process.env.VUE_APP_API_BASE_URL,
      routes: [
        // {
        //   path: '/artists/list',
        //   breadcrumbName: '艺人管理'
        // },
        {
          path: '/artists/detail',
          breadcrumbName: '主播详情'
        }
      ],
      moment,
      leftTabTitle: [
        {
          key: 'artistKey',
          tab: '艺人资料'
        }
      ],
      leftTabKey: 'artistKey',
      loading: true,
      artistId: '',
      artistDetail: {},
      artistData: {},
      numberFormat
    }
  },
  created () {
    // permission = this.permission
  },
  mounted () {
    setTimeout(() => {
      this.loading = false
    }, 600)

    this.artistId = this.$route.query.id
    this.getArtistDetailHandle()
    this.getArtistDataHandle()
  },
  methods: {
    leftTabHandle (key, type) {
      this[type] = key
    },

    getArtistDetailHandle () {
      getArtistDetail(this.artistId).then(res => {
        this.artistDetail = res
      })
    },

    getArtistDataHandle () {
      getArtistdata(this.artistId).then(res => {
        this.artistData = res
      })
    }
  },
  filters: {
    changeText (val) {
      // if (!permission.includes('goldData_desensitization_data')) {
      //   return '******'
      // } else {
      //   return val
      // }
      if (val === '-') {
        return '--'
      } else {
        return val
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
.statis-list {
  /deep/ .description {
    h3 {
      font-weight: normal;
    }
  }
}
.img-viewer {
  img {
    display: block;
    width: 50px;
    cursor: pointer;
  }
}
</style>
