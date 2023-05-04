<template>
  <div class="commission-wraper">
    <a-card
      class="card-custom head-mb5"
      style="width:100%"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="type"
      @tabChange="key => handleTabChange(key)"
    >
      <div slot="title">
        提成规则管理
      </div>
      <template v-for="li in tabList">
        <span :slot="li.key" :key="li.key">{{ li.tabText }}</span>
      </template>
      <div slot="extra">
        <month-comp v-model="monthDate" :disabledDate="disabledDate"/>
      </div>
      <div class="block"></div>
      <employee v-if="type === 'employee'" :fn="getEmployeeCommissionList" :monthDate="monthDate"/>
      <influencer v-if="type === 'influencer'" :fn="getInfluencerCommissionList" :monthDate="monthDate"/>
    </a-card>
  </div>
</template>

<script>
import MonthComp from '../components/MonthComp'
import { getEmployeeCommissionList, getInfluencerCommissionList } from '@/api/commission-video'
import employee from './components/employee'
import influencer from './components/influencer'
import { mapGetters } from 'vuex'
import moment from 'moment'
export default {
  data () {
    return {
      tabList: [],
      tabListNoTitle: [
        {
          key: 'employee',
          tabText: '员工提成比例管理',
          permission: 'tiktok_settle_wait',
          scopedSlots: { tab: 'employee' }
        },
        {
          key: 'influencer',
          tabText: '主播任务提成管理',
          permission: 'tiktok_settle_confirm',
          scopedSlots: { tab: 'influencer' }
        }
      ],
      type: '',
      getEmployeeCommissionList,
      getInfluencerCommissionList,
      monthDate: ''
    }
  },

  components: {
    employee,
    influencer,
    MonthComp
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
      return time.valueOf() > Date.now() && (moment(time).format('YYYY-MM')) !== (moment().add(1, 'months').format('YYYY-MM'))
    }
  }
}

</script>
<style lang='less' scoped>
@import './index.less';
</style>
