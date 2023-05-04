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
          主播激活
        </div>
        <template v-for="li in tabListNoTitle">
          <span :slot="li.key" :key="li.key">{{ li.tabText }}</span>
        </template>
        <div class="block"></div>
        <apply ref="apply" v-if="type === 'apply'"/>
        <actived ref="actived" v-if="type === 'actived'"/>
        <received ref="received" v-if="type === 'received'"/>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { numberFormat } from '@/utils/util'
import apply from './components/apply'
import actived from './components/actived'
import received from './components/received'

export default {
  name: 'RelationManage',
  components: {
    STable,
    apply,
    actived,
    received
  },
  data () {
    return {
      tabListNoTitle: [],
      tabListNoTitleSource: [
        {
          key: 'apply',
          tabText: '我发起的',
          scopedSlots: { tab: 'apply' }
        },
        {
          key: 'actived',
          tabText: '已发起激活申请',
          scopedSlots: { tab: 'actived' }
        },
        {
          key: 'received',
          tabText: '已收到激活申请',
          scopedSlots: { tab: 'received' }
        }
      ],
      numberFormat,
      type: ''
    }
  },
  created () {
    let arr = this.tabListNoTitleSource
    if (!this.permission.includes('my_apply_list')) {
      arr = arr.filter(item => item.key !== 'apply')
    }
    if (!this.permission.includes('sponsor_apply_look_list')) {
      arr = arr.filter(item => item.key !== 'actived')
    }
    if (!this.permission.includes('received_apply_look_list')) {
      arr = arr.filter(item => item.key !== 'received')
    }
    this.tabListNoTitle = arr
    this.type = arr.length !== 0 ? arr[0].key : ''
  },
  mounted () {
  },
  activated () {
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
