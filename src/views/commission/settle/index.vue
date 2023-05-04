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
        结算关系核对【抖音】
      </div>
      <template v-for="li in tabList">
        <span :slot="li.key" :key="li.key">{{ li.tabText }}</span>
      </template>
      <div class="block"></div>
      <!-- <div class="month-date">结算月份: <span class="normal-color">{{ tipDate }}</span></div> -->
      <comfirming v-if="type === 'confirming'" :fn="getComfirmingList" @getTimes="getTimes" :times="times"/>
      <confirmed v-if="type === 'confirmed'" :fn="getComfirmingList" @getTimes="getTimes" :times="times"/>
      <my-commission v-if="type === 'my-commission'" :fn="getComfirmingList" @getTimes="getTimes" :times="times"/>
      <feedback-record v-if="type === 'feedback-record'" :fn="getRecordList" @getTimes="getTimes" :times="times"/>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { getComfirmingList, getTimes, getRecordList } from '@/api/commission'
import comfirming from './components/comfirming'
import confirmed from './components/confirmed'
import myCommission from './components/myCommission'
import feedbackRecord from './components/feedbackRecord'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      tabList: [],
      tabListNoTitle: [
        {
          key: 'confirming',
          tabText: '待确认结算关系',
          permission: 'tiktok_settle_wait',
          scopedSlots: { tab: 'confirming' }
        },
        {
          key: 'confirmed',
          tabText: '已确认结算关系',
          permission: 'tiktok_settle_confirm',
          scopedSlots: { tab: 'confirmed' }
        },
        {
          key: 'my-commission',
          tabText: '我的结算主播',
          permission: 'tiktok_settle_myself',
          scopedSlots: { tab: 'my-commission' }
        },
        {
          key: 'feedback-record',
          tabText: '关系反馈记录',
          permission: 'tiktok_settle_feedback',
          scopedSlots: { tab: 'feedback-record' }
        }
      ],
      type: '',
      getComfirmingList,
      getRecordList,
      tipDate: '',
      times: ''
    }
  },

  components: {
    comfirming,
    confirmed,
    myCommission,
    feedbackRecord
  },

  mounted () {
    this.getTabList()
    this.tipDate = moment(new Date())
    this.getTimes()
  },
  computed: {
    ...mapGetters(['permission'])
  },
  methods: {
    getTabList () {
      this.tabList = this.tabListNoTitle.filter(item => this.permission.includes(item.permission))
      this.type = this.tabList.length !== 0 ? this.tabList[0].key : ''
    },
    handleTabChange (key) {
      this.type = key
    },
    getTimes () {
      getTimes({
        monthCycle: moment(new Date()).subtract(1, 'months').format('YYYY-MM')
      }).then(res => {
        if (!res.endDate) res.endDate = moment(this.tipDate).endOf('month').format('YYYY-MM-DD')
        if (!res.startDate) res.startDate = moment(this.tipDate).endOf('month').format('YYYY-MM-DD')
        this.times = res
      })
    }
  }
}

</script>
<style lang='less' scoped>
@import './index.less';
</style>
