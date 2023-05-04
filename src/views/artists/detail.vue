<template>
  <div class="artists-detail-content">
    <a-row :gutter="24">
      <a-col :md="24" :lg="7" :xxl="5">
        <left-content :permission="permission"/>
      </a-col>

      <!-- right content -->
      <a-col :md="24" :lg="17" :xxl="19">
        <a-card
          class="m-card-right"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="onTabChange"
        >
          <div class="right-bar" slot="tabBarExtraContent">
            <ul>
              <li
                v-for="(item, index) in dateTabs"
                :key="index"
                :class="{'active': dateTabSelected == index }"
                @click="dateTabHandle(index)"
              >{{ item }}</li>
            </ul>
            <a-range-picker
              ref="picker"
              @change="onDateChange"
              v-model="timeValue"
              :allow-clear="false"
              value-format="YYYY-MM-DD"
              :disabledDate="disabledDate"
            >
              <a-icon slot="suffixIcon" type="calendar" />
            </a-range-picker>
          </div>
          <div v-show="noTitleKey === 'live'">
            <tab-content :title="title">
              <a-skeleton active :loading="skeletonLoad1" :paragraph="{ rows: 2 }">
                <a-row class="dash-cont">
                  <a-col :xs="24" :md="8">
                    <info
                      title="流水（元）"
                      :value="viewData.totalReward ? numberFormat(viewData.totalReward) : '0'"
                      :bufix="viewData.totalReward > 10000 ? '万' : ''"
                    />
                  </a-col>
                  <a-col :xs="24" :md="8">
                    <info
                      title="有效天数（天）"
                      :value="viewData.effectiveDay ? String(numberFormat(viewData.effectiveDay)) : '0'"
                    />
                  </a-col>
                  <a-col :xs="24" :md="8">
                    <info
                      title="直播时长（小时）"
                      :value="viewData.liveBroadCastDuration ? (viewData.liveBroadCastDuration / 60).toFixed(2) : '0'"
                    />
                  </a-col>
                </a-row>
              </a-skeleton>
            </tab-content>
            <tab-content class="exchange-static" title="趋势分析">
              <a-skeleton active :loading="skeletonLoad3" :paragraph="{ rows: 6 }">
                <div class="clearfix">
                  <a-radio-group v-model="activeTab" size="small" class="fr">
                    <a-radio-button :value="li.name" v-for="li in liveTab" :key="li.name">
                      {{ li.value }}
                    </a-radio-button>
                  </a-radio-group>
                </div>
                <broke-line-double :data="lineData" />
              </a-skeleton>
            </tab-content>
            <tab-content class="exchange-static" title="数据详情">
              <a-skeleton active :loading="skeletonLoadLive">
                <s-table
                  ref="liveTable"
                  row-key="dateTime"
                  :columns="liveColumns"
                  :data="getLiveDataHandle">
                  <template slot="totalReward" slot-scope="text, record">
                    {{ numberFormat(record.totalReward) }} {{ record.totalReward > 10000 ? '万' : '' }}
                  </template>
                  <template slot="liveBroadCastDuration" slot-scope="text, record">
                    {{ record.liveBroadCastDuration ? record.liveBroadCastDuration : '-' }}
                  </template>
                  <template slot="effectLiveDuration" slot-scope="text, record">
                    {{ record.effectLiveDuration ? record.effectLiveDuration : '-' }}
                  </template>
                  <template slot="lastLiveTime" slot-scope="text, record">
                    {{ record.lastLiveTime ? record.lastLiveTime : '-' }}
                  </template>
                </s-table>
              </a-skeleton>
            </tab-content>
          </div>
          <div v-show="noTitleKey === 'media'">
            <tab-content :title="title">
              <a-skeleton active :loading="skeletonLoad1" :paragraph="{ rows: 2 }">
                <a-row class="dash-cont">
                  <a-col :xs="24" :md="8">
                    <info
                      title="视频数（个）"
                      :value="viewData.videosCount ? numberFormat(viewData.videosCount) : '0'"
                    />
                  </a-col>
                  <a-col :xs="24" :md="8">
                    <info
                      title="点赞数（个）"
                      :value="viewData.likeCount ? numberFormat(viewData.likeCount) : '0'"
                      :bufix="viewData.likeCount > 10000 ? '万' : ''"
                    />
                  </a-col>
                  <a-col :xs="24" :md="8">
                    <info
                      title="涨粉数（个）"
                      :value="viewData.increaseFans ? numberFormat(viewData.increaseFans) : '0'"
                      :bufix="viewData.increaseFans > 10000 ? '万' : ''"
                    />
                  </a-col>
                </a-row>
              </a-skeleton>
            </tab-content>
            <tab-content class="exchange-static" title="趋势分析">
              <a-skeleton active :loading="skeletonLoad3" :paragraph="{ rows: 6 }">
                <div class="clearfix">
                  <a-radio-group v-model="activeTab" size="small" class="fr">
                    <a-radio-button :value="li.name" v-for="li in liveTab" :key="li.name">
                      {{ li.value }}
                    </a-radio-button>
                  </a-radio-group>
                </div>
                <!-- <div class="exchange-tab clearfix">
                  <ul>
                    <li :class="{'active': li.name === activeTab}" @click="changeTab(li)">{{ li.value }}</li>
                  </ul>
                </div> -->
                <broke-line-double :data="lineData" />
              </a-skeleton>
            </tab-content>
            <tab-content class="exchange-static" title="数据详情">
              <a-skeleton active :loading="skeletonLoadMedia">
                <s-table
                  ref="mediaTable"
                  row-key="dateTime"
                  :columns="mediaColumns"
                  :data="getMediaDataHandle">
                  <template slot="playCount" slot-scope="text, record">
                    {{ numberFormat(record.playCount) }} {{ record.playCount > 10000 ? '万' : '' }}
                  </template>
                  <template slot="likeCount" slot-scope="text, record">
                    {{ numberFormat(record.likeCount) }} {{ record.likeCount > 10000 ? '万' : '' }}
                  </template>
                  <template slot="commentCount" slot-scope="text, record">
                    {{ numberFormat(record.commentCount) }} {{ record.commentCount > 10000 ? '万' : '' }}
                  </template>
                </s-table>
              </a-skeleton>
            </tab-content>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable, Funnel, BrokeLineDouble } from '@/components'
import LeftContent from './components/LeftContent'
import Info from './components/Info'
import TabContent from './components/TabContent'
import CheckBox from './components/CheckBox'
import Skeleton from './components/Skeleton'
import { artistLiveColumns, artistMediaColumns } from './tableColumns'
import timeRange from '@/utils/timeRange'
import { numberFormat } from '@/utils/util'
import { getArtistOverView, getFunnelData, getLineData, getLiveData, getMediaData, getLiveTabs, getCharts, getMediaTabs } from '@/api/artists'
import moment from 'moment'

export default {
  name: 'ArtistsDetail',
  components: {
    LeftContent,
    STable,
    Funnel,
    BrokeLineDouble,
    Info,
    TabContent,
    CheckBox,
    Skeleton
  },
  data () {
    return {
      artistId: '',

      skeletonLoad1: true,
      skeletonLoad2: true,
      skeletonLoad3: true,
      skeletonLoadLive: true,
      skeletonLoadMedia: true,
      tabListNoTitle: [],
      noTitleKey: '',

      title: '近7日数据情况',

      dateTabSelected: 1,
      dateTabs: {
        0: '昨日',
        1: '近7日',
        2: '近30日'
      },
      dateRangeArr: {
        0: [],
        1: [],
        2: []
      },
      dateVal: [],
      timeValue: undefined,

      viewData: {},
      funelData: [],
      lineData: [],

      numberFormat,
      moment,

      downUrl: '',

      liveColumns: artistLiveColumns,
      mediaColumns: artistMediaColumns,
      activeTab: '',
      activeName: '',
      liveTab: [],
      liveChartsData: null
    }
  },
  created () {
    this.dateInit()
    if (this.permission.includes('actor_operation_live')) {
      this.noTitleKey = 'live'
      this.tabListNoTitle.push({
         key: 'live',
        tab: '直播数据'
      })
    }
    if (this.permission.includes('actor_operation_video')) {
      if (!this.permission.includes('actor_operation_live')) {
        this.noTitleKey = 'media'
      }
      this.tabListNoTitle.push({
        key: 'media',
        tab: '短视频数据'
      })
    }
  },
  mounted () {
    this.artistId = this.$route.query.id
    setTimeout(() => {
      this.skeletonLoadMedia = false
      this.skeletonLoadLive = false
    }, 500)
    this.getLiveTabsData()
  },
  methods: {
    getLiveTabsData () {
      getLiveTabs().then(res => {
        this.activeTab = res[0].name
        this.activeName = res[0].value
        this.liveTab = res
        this.getChartsData()
      })
    },
    getMediaTabsData () {
      getMediaTabs().then(res => {
        this.activeTab = res[0].name
        this.activeName = res[0].value
        this.liveTab = res
        this.getChartsData()
      })
    },
    changeTab (li) {
      this.activeTab = li.name
      this.activeName = li.value
      this.getChartsData()
    },
    getChartsData () {
      const requestParameters = Object.assign({}, { file: this.activeTab, tiktokId: this.artistId }, this.getQueryParams())
      getCharts(requestParameters).then(res => {
        res.forEach(item => {
          item.prop = this.activeName
        })
        this.lineData = res
        this.skeletonLoad3 = false
      })
    },
    onDateChange (date, dateString) {
      this.dateTabSelected = '-1'
      this.dateVal = dateString
    },
    dateTabHandle (index) {
      this.dateTabSelected = index
      this.dateVal = this.timeValue = this.dateRangeArr[index]
    },
    // 时间初始化
    dateInit () {
      this.dateRangeArr[0] = timeRange.Yestoday
      this.dateRangeArr[1] = timeRange.nearWeek
      this.dateRangeArr[2] = timeRange.nearMonth
      this.dateVal = timeRange.nearWeek
      this.timeValue = timeRange.nearWeek
    },
    changeTime (v) {
      if (!v.beginTime) {
        return v.dateTime
      }
      return moment(v.beginTime * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    setTitle () {
      switch (this.dateTabSelected) {
        case '0':
          this.title = '昨日数据情况'
          break
        case '1':
          this.title = '近7日数据情况'
          break
        case '2':
          this.title = '近30日数据情况'
          break
        case '-1':
          this.title = `${this.dateVal[0]} 至 ${this.dateVal[1]} 数据情况`
          break
        default:
          break
      }
    },
    getQueryParams () {
      return {
        tiktokId: this.artistId,
        startDate: this.dateVal[0],
        endDate: this.dateVal[1]
      }
    },

    // 获取本周数据
    getArtistOverViewHandle () {
      getArtistOverView(this.getQueryParams()).then(res => {
        this.viewData = res
        this.skeletonLoad1 = false
      })
    },

    // 获取梯形图数据
    getFunnelDataHandle () {
      getFunnelData(this.getQueryParams()).then(res => {
        this.skeletonLoad2 = false
        this.funelData = res
      })
    },

    // 获取折线图数据
    getLineDataHandle () {
      const params = {
        ...this.getQueryParams(),
        startFile: this.checkList[0] ? this.checkList[0] : '',
        endFile: this.checkList[1] ? this.checkList[1] : ''
      }
      getLineData(params).then(res => {
        if (res.length <= 0) {
          this.lineData = [
            {
              dateTime: this.dateVal[0],
              prop: '--',
              count: 0
            }
          ]
        } else {
          res.forEach(item => {
            item.prop = this.checkDataExtrange[item.prop]
          })
          this.lineData = res
        }
        this.skeletonLoad3 = false
      })
    },

    // 获取直播数据
    getLiveDataHandle (parameter) {
      const requestParameters = Object.assign({}, parameter, this.getQueryParams())
      return getLiveData(requestParameters).then(res => {
        return res
      })
    },
    // 获取短视频数据
    getMediaDataHandle (parameter) {
      const requestParameters = Object.assign({}, parameter, this.getQueryParams())
      return getMediaData(requestParameters).then(res => {
        return res
      })
    },
    disabledDate (current) {
      return current > moment().subtract(1, 'days')
    },
    onTabChange (key) {
      this.noTitleKey = key
      this.skeletonLoad3 = true
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (key === 'live') {
          this.$refs.liveTable.refresh(true)
          this.getLiveTabsData()
        } else {
          this.$refs.mediaTable.refresh(true)
          this.getMediaTabsData()
        }
      }, 300)
    }
  },

  watch: {
    dateVal () {
      this.setTitle()
      this.getArtistOverViewHandle()
      this.getChartsData()
      // this.getFunnelDataHandle()
      // this.getLineDataHandle()
      this.$refs.liveTable && this.$refs.liveTable.refresh(true)
      this.$refs.mediaTable && this.$refs.mediaTable.refresh(true)
    },
    activeTab (val) {
      this.liveTab.forEach(item => {
        if (item.name === val) {
          this.activeName = item.value
        }
      })
      this.getChartsData()
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
.tabSelect{
  line-height: 30px;
  font-size: 14px;
  color: #373737;
  display: inline-block;
  height: 32px;
  border: 1px solid #D9D9D9;
  border-radius: 2px;
  margin-bottom: 10px;
  .tab{
    cursor: pointer;
    border-radius: 2px;
    float: left;
    width: 62px;
    text-align: center;
    margin-bottom: 0;
    &.active{
      color: #fff;
      background: #755DD7;
    }
  }
}
</style>
