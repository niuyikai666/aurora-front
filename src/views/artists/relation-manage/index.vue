<template>
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
          主播关系管理
        </div>
        <!-- <div slot="extra">
          <a-button type="primary" v-if="type === 'bounding'" @click="download">导出</a-button>
          <a-button type="primary" v-if="type === 'operateNone'" @click="download">导出</a-button>
          <a-button type="primary" v-if="type === 'preManage'" @click="download">导出</a-button>
        </div> -->
        <template v-for="li in tabListNoTitle">
          <span :slot="li.key" :key="li.key">{{ li.tabText }}</span>
        </template>
        <div class="block-desc" v-if="type !== 'operateNone'">
          <a-icon type="info-circle" style="margin-right:8px;"/>
          <span v-if="type === 'bounding' || type === 'boundingMe'">超过主播入会日期14天（含当天）未填写，将无法填写招募人！</span>
          <span v-if="type === 'preManage' || type === 'preFill'">如更新时间还未匹配金数据信息，请您检查抖音号是否填写正确</span>
        </div>
        <div class="block" v-else></div>
        <bounding ref="bounding" v-if="type === 'bounding'"/>
        <bounding-me ref="boundingMe" v-if="type === 'boundingMe'"/>
        <operate-none ref="operateNone" v-if="type === 'operateNone'"/>
        <pre-fill ref="preFill" v-if="type === 'preFill'" />
        <pre-manage ref="preManage" v-if="type === 'preManage'" />
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { numberFormat } from '@/utils/util'
import bounding from './components/bounding'
import boundingMe from './components/boundingMe'
import operateNone from './components/operateNone'
import preFill from './components/preFill'
import preManage from './components/preManage'

export default {
  name: 'RelationManage',
  components: {
    STable,
    bounding,
    boundingMe,
    operateNone,
    preFill,
    preManage
  },
  data () {
    return {
      advanced: false,
      tabListNoTitle: [],
      tabListNoTitleSource: [
        {
          key: 'bounding',
          tabText: '待绑定主播',
          scopedSlots: { tab: 'bounding' }
        },
        {
          key: 'preManage',
          tabText: '预填写管理',
          scopedSlots: { tab: 'preManage' }
        },
        {
          key: 'operateNone',
          tabText: '无运营主播',
          scopedSlots: { tab: 'operateNone' }
        },
        {
          key: 'boundingMe',
          tabText: '待我绑定',
          scopedSlots: { tab: 'boundingMe' }
        },
        {
          key: 'preFill',
          tabText: '金数据预填写',
          scopedSlots: { tab: 'preFill' }
        }
      ],
      numberFormat,
      type: 'bounding'
    }
  },
  created () {
    let arr = this.tabListNoTitleSource
    if (!this.permission.includes('actor_relation_mng_list')) {
      arr = arr.filter(item => item.key !== 'bounding' && item.key !== 'preManage')
    }
    if (!this.permission.includes('actor_relation_mng_operate_list')) {
      arr = arr.filter(item => item.key !== 'boundingMe' && item.key !== 'preFill')
    }
    if (!this.permission.includes('actor_relation_mng_non_operate_list')) {
      arr = arr.filter(item => item.key !== 'operateNone')
    }
    this.type = arr.length !== 0 ? arr[0].key : ''
    this.tabListNoTitle = arr
  },
  mounted () {
  },
  activated () {
    this.$refs[this.type].searchHandle()
  },
  methods: {
    handleTabChange (key) {
      this.type = key
    },
    download () {
      this.$refs[this.type].getParams().then(res => {
        let url = ''
        let path = `${process.env.VUE_APP_API_BASE_URL}`
        for (const key in res) {
          if ((res[key] || res[key] === false) && key !== 'page' && key !== 'size' && key !== 'type') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
        if (this.type === 'bounding') {
          path += `/actorRelation/admin/bound/export${url}`
        } else if (this.type === 'operateNone') {
          path += `/freeAct/admin/bound/export${url}`
        } else if (this.type === 'preManage') {
          path += `/actorRelation/admin/prefills/export${url}`
        }
        console.log(path)
        window.location.href = path
      })
    }
  },
  watch: {
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
.block-desc{
  line-height: 44px;
  font-size: 14px;
  background: #f0f2f5;
}
</style>
