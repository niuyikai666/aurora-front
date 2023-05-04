<template>
  <div class="commission-wraper">
    <a-card
      style="width:100%"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="type"
      @tabChange="key => handleTabChange(key)"
    >
      <template v-for="li in tabList">
        <span :slot="li.key" :key="li.key">{{ li.tabText }}</span>
      </template>
      <div slot="tabBarExtraContent">
        <month-comp v-model="monthDate" v-if="type === 'much'"/>
      </div>
      <zero v-if="type === 'zero'" :fn="getZeroList"/>
      <much v-if="type === 'much'" :fn="getMuchList" :monthDate="monthDate"/>
      <betting v-if="type === 'betting'" :fn="getBettingList"/>
    </a-card>
  </div>
</template>

<script>
import { getZeroList, getMuchList, getBettingList } from '@/api/global-data'
import Zero from './components/Zero'
import Much from './components/Much'
import Betting from './components/Betting'
import MonthComp from './components/MonthComp'
import moment from 'moment'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      getZeroList,
      getMuchList,
      getBettingList,
      tabList: [],
      tabListNoTitle: [
        {
          key: 'zero',
          tabText: '零招募提成主播名单管理',
          permission: '',
          scopedSlots: { tab: 'zero' }
        },
        {
          key: 'much',
          tabText: '刷量主播名单管理',
          permission: '',
          scopedSlots: { tab: 'much' }
        },
        {
          key: 'betting',
          tabText: '签约对赌主播名单管理',
          permission: '',
          scopedSlots: { tab: 'betting' }
        }
      ],
      type: '',
      monthDate: moment().format('YYYY-MM')
    }
  },

  components: {
    MonthComp,
    Zero,
    Much,
    Betting
  },

  mounted () {
    this.getTabList()
  },
  computed: {
    ...mapGetters(['permission'])
  },
  methods: {
    getTabList () {
      // this.tabList = this.tabListNoTitle.filter(item => this.permission.includes(item.permission))
      this.tabList = this.tabListNoTitle
      this.type = this.tabList.length !== 0 ? this.tabList[0].key : ''
    },
    handleTabChange (key) {
      this.type = key
    },
    disabledDate (time) {
      return time.valueOf() > Date.now()
    }
  }
}

</script>
<style lang='less' scoped>
@import './index.less';
</style>
