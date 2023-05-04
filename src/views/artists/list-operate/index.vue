<template>
  <a-row>
    <a-col class="lg-24">
      <top-tip :updateTime="updateTime" />
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
        <div slot="extra">
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
        <all ref="all" :fn="handleData" :type="type" v-if="type === 'all'"/>
        <core ref="core" :fn="handleData" :type="type" v-if="type === 'core'"/>
        <enter-union ref="enterUnion" :fn="handleData" :type="type" v-if="type === 'enterUnion'"/>
        <interrupt ref="interrupt" :fn="handleData" :type="type" v-if="type === 'interrupt'" />
        <retired ref="retired" :fn="handleData" :type="type" v-if="type === 'retired'" />
      </a-card>
      <import-comp v-if="visibleImport" :visible="visibleImport" @cancel="visibleImport = false" />
    </a-col>
  </a-row>
</template>

<script>
import { STable } from '@/components'
import TopTip from '../components/TopTip'
import { numberFormat } from '@/utils/util'
import { getOperateArtists, getCountOperate, getUpdateTime } from '@/api/artists'
import all from './components/all'
import core from './components/core'
import enterUnion from './components/enterUnion'
import interrupt from './components/interrupt'
import retired from './components/retired'
import moment from 'moment'

export default {
  name: 'MyArtist',
  components: {
    STable,
    TopTip,
    all,
    core,
    enterUnion,
    interrupt,
    retired
  },
  data () {
    return {
      advanced: false,
      handleData: getOperateArtists,
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
          key: 'retired',
          tabText: '退会主播',
          num: '',
          numkey: 'retiredCount',
          scopedSlots: { tab: 'retired' }
        }
      ],

      updateTime: {},
      priRangeName: '实际运营',
      numberFormat,
      visibleImport: false,
      type: 'all'
    }
  },
  mounted () {
    this.tabListNoTitle = this.tabListNoTitleSource
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
      getCountOperate().then(res => {
        this.tabListNoTitle.forEach(item => {
          item.num = res[item.numkey]
        })
      })
    },

    getUpdateTimeHandle () {
      getUpdateTime().then(res => {
        this.updateTime = res
      })
    },

    disabledDate (current) {
      return current > moment().subtract(1, 'days')
    }
  },
  watch: {
    columns (newValue) {
      if (newValue.length === 0) {
        return
      }
      let colunms = [] // 定义选中的colunm
      if (localStorage.getItem(`my-artists-${this.queryParams.type}`)) {
        colunms = JSON.parse(localStorage.getItem(`my-artists-${this.queryParams.type}`))
      } else {
        colunms = []
      }
      localStorage.setItem(`my-artists-${this.queryParams.type}`, JSON.stringify(colunms))
      this.colunmsChecked = colunms
      this.checkArr = newValue.filter(item => !this.defaultColunm[this.queryParams.type].includes(item.dataIndex))
      this.tableColums = newValue.filter(item => colunms.includes(item.dataIndex) || this.defaultColunm[this.queryParams.type].includes(item.dataIndex))
    }
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
