<template>
  <a-row>
    <a-col class="lg-24">
      <top-tip :updateTime="updateTime" :permission="permission" />
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
          <div class="cascader-custom" style="margin-left:12px;" v-if="!(!permission.includes('actor_list_operation') && !permission.includes('actor_list_tiktok_operation'))">
            <span class="tit">数据关系:</span>
            <span class="select-name">{{ priRangeName }} <a-icon class="antion-custom" type="down" /></span>
            <a-select
              style="width: 110px;"
              v-model="dataType"
              @change="priRangeHandle"
            >
              <a-select-option value="operator" v-if="permission.includes('actor_list_operation')">
                实际运营
              </a-select-option>
              <a-select-option value="agent" v-if="permission.includes('actor_list_tiktok_operation')">
                抖音开放平台
              </a-select-option>
            </a-select>
          </div>
        </div>
        <template v-for="li in tabListNoTitle">
          <span :slot="li.key" :key="li.key">{{ li.tabText }} {{ li.num }}</span>
        </template>
        <div slot="extra">
          <!-- <a-button style="margin-right:10px" v-if="type === 'all' && permission.includes('tiktok_actor_live_upload')" type="primary" @click="importHandle"><svg-icon class="icon" icon-class="import" style="margin-right:8px; color:#fff;" /> 导入</a-button>
          <span
            v-if="(type === 'all' && permission.includes('actor_operation_opt_export')) || type === 'retired' || type === 'interrupt' || (type === 'rebroadcast' && permission.includes('actor_list_resume_live_export'))"
            @click="download"
          >
            <a-button type="primary"><svg-icon class="icon" icon-class="export" style="margin-right:8px; color:#fff;" /> 导出</a-button>
          </span> -->
          <div class="tip-icon-con">
            <a-popover placement="bottomRight">
              <template slot="content">
                <div class="index-crip-content">
                  <p class="title">指标说明</p>
                  <dl class="list">
                    <dt>核心主播</dt>
                    <dd>历史有一个月流水大于等于五万人民币的主播</dd>
                    <dt>新入驻主播</dt>
                    <dd>当月加入直播开放平台的主播</dd>
                    <dt>断播主播</dt>
                    <dd>最近开播日期非昨日的主播</dd>
                    <!-- <dt>再激活主播</dt>
                    <dd>激活申请并通过后，激活申请时填写的激活时间两月内的主播</dd> -->
                    <dt>退会主播</dt>
                    <dd>未在最新下载的直播开放平台—主播列表内的主播</dd>
                  </dl>
                </div>
              </template>
              <a-icon type="question-circle" />
            </a-popover>
          </div>
        </div>
        <div class="block"></div>
        <all ref="all" :fn="getArtists" :dataType="dataType" :type="type" v-if="type === 'all'"/>
        <core ref="core" :fn="getArtists" :dataType="dataType" :type="type" v-if="type === 'core'"/>
        <enter-union ref="enterUnion" :fn="getArtists" :dataType="dataType" :type="type" v-if="type === 'enterUnion'"/>
        <interrupt ref="interrupt" :fn="getArtists" :dataType="dataType" :type="type" v-if="type === 'interrupt'" />
        <retired ref="retired" :fn="getArtists" :dataType="dataType" :type="type" v-if="type === 'retired'" />
        <rebroadcast ref="rebroadcast" :fn="getArtists" :dataType="dataType" :type="type" v-if="type === 'rebroadcast'" />
      </a-card>
      <!-- <import-comp v-if="visibleImport" :visible="visibleImport" @cancel="visibleImport = false" /> -->
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { getArtists, getCountLive, getUpdateTime } from '@/api/artists'
import { numberFormat } from '@/utils/util'
import TopTip from '../components/TopTip'
import ImportComp from '../components/ImportComp'
import all from './components/all'
import core from './components/core'
import enterUnion from './components/enterUnion'
import interrupt from './components/interrupt'
import retired from './components/retired'
import rebroadcast from './components/rebroadcast'
export default {
  name: 'ArtistsList',
  components: {
    TopTip,
    ImportComp,
    all,
    core,
    enterUnion,
    interrupt,
    retired,
    rebroadcast
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
          numkey: 'allCount',
          scopedSlots: { tab: 'all' }
        },
        {
          key: 'core',
          tabText: '核心主播',
          num: '',
          numkey: 'coreCount',
          scopedSlots: { tab: 'core' }
        },
        {
          key: 'enterUnion',
          tabText: '新入驻主播',
          num: '',
          numkey: 'enterUnionCount',
          scopedSlots: { tab: 'enterUnion' }
        },
        {
          key: 'interrupt',
          tabText: '断播主播',
          num: '',
          numkey: 'interruptCount',
          scopedSlots: { tab: 'interrupt' }
        },
        {
          key: 'rebroadcast',
          tabText: '复播主播',
          num: '',
          numkey: 'rebroadcastCount',
          scopedSlots: { tab: 'rebroadcast' }
        },
        {
          key: 'retired',
          tabText: '退会主播',
          num: '',
          numkey: 'retiredCount',
          scopedSlots: { tab: 'retired' }
        }
      ],

      updateTime: {},
      dataType: '',
      priRangeMap: {
        'operator': '实际运营',
        'agent': '抖音开放平台'
      },
      priRangeName: '实际运营',
      numberFormat,
      downloadUrl: '',
      downloadUrlRetired: '',
      getArtists,
      visibleImport: false,
      type: 'all'
    }
  },
  created () {
    if (this.permission.includes('actor_list_operation')) {
      this.dataType = 'operator'
      this.priRangeName = '实际运营'
    } else {
      if (this.permission.includes('actor_list_tiktok_operation')) {
        this.dataType = 'agent'
        this.priRangeName = '抖音开放平台'
      }
    }
    let arr = this.tabListNoTitleSource
    if (!this.permission.includes('actor_list_break_live_view')) {
      arr = arr.filter(item => item.key !== 'interrupt')
    }
    if (!this.permission.includes('actor_list_resume_live_view')) {
      arr = arr.filter(item => item.key !== 'rebroadcast')
    }
    this.tabListNoTitle = arr
  },
  mounted () {
    this.getUpdateTimeHandle()
    this.getCountHandle()
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    handleTabChange (key) {
      this.type = key
    },

    getCountHandle () {
      getCountLive({
        dataType: this.dataType
      }).then(res => {
        this.tabListNoTitle.forEach(item => {
          item.num = res[item.numkey]
        })
        // console.log(this.tabListNoTitle)
      })
    },

    getUpdateTimeHandle () {
      getUpdateTime().then(res => {
        this.updateTime = res
      })
    },

    detailHandle (id) {
      this.$router.push({
        path: '/artists/detail',
        query: {
          id: id
        }
      })
    },
    download () {
      this.$refs[this.type].getParams().then(res => {
        let url = ''
        let path = `${process.env.VUE_APP_API_BASE_URL}`
        for (const key in res) {
          if (res[key] && key !== 'page' && key !== 'size' && key !== 'type') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
        if (this.type === 'all') {
          path += `/actor/livedata/download${url}`
        } else if (this.type === 'interrupt') {
          path += `/stop/broadcasting/export${url}`
        } else if (this.type === 'rebroadcast') {
          path += `/activityAct/list/export${url}`
        } else if (this.type === 'retired') {
          path += `/actor/retired/export${url}`
        }
        window.location.href = path
      })
    },
    priRangeHandle (value) {
      this.priRangeName = this.priRangeMap[value]
      this.dataType = value
      this.$nextTick(() => {
        this.getCountHandle()
        this.$refs[this.type].searchHandle()
      })
    },

    importHandle () {
      this.visibleImport = true
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
