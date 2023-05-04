<template>
  <div class="card-content">
    <a-result v-if="!hasAuth" status="404" title="405" sub-title="抱歉！您未给该页面分配权限" style="margin-top: 50px;">
    </a-result>
    <a-card
      v-if="hasAuth"
      title="主播评分列表-管理员"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="tabActiveKey"
      @tabChange="key => handleTabChange(key)"
    >
      <div slot="extra" style="display:flex">
        <a-range-picker
          style="width: 250px;"
          :ranges="{ '本周': [weekStart, weekEnd], '本月': [monthStart, monthEnd] }"
          value-format="YYYY-MM-DD"
          @change="onDateChange"
        />
      </div>
      <tab-content style="padding-top: 0;">
        <table-1 v-if="tabActiveKey === 'tab1'" :companyList="companyList" :params="queryParams" @unauthority="unauthorityHandle" />
        <table-2 v-if="tabActiveKey === 'tab2'" :companyList="companyList" :params="queryParams" />
      </tab-content>
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import TabContent from '@/components/TabContent'
import { getStructureTreeAll } from '@/api/personnel'
import Table1 from './components/Table1'
import Table2 from './components/Table2'

export default {
  components: {
    TabContent,
    Table1,
    Table2
  },
  data () {
    return {
      hasAuth: true,
      tabList: [],
      tabData: [
        { key: 'tab1', tab: '主播评分列表-管理员', code: 'score_admin_list_all_data' },
        { key: 'tab2', tab: '主播评分列表-视频号全', code: 'score_admin_list_video_data' }
      ],
      tabActiveKey: '',
      queryParams: {
        startDate: '',
        endDate: ''
      },
      weekStart: moment(moment().week(moment().week()).startOf('week') + 24 * 60 * 60 * 1000),
      weekEnd: moment(moment().week(moment().week()).endOf('week') + 24 * 60 * 60 * 1000),
      monthStart: moment().startOf('month'),
      monthEnd: moment().endOf('month'),
      companyList: []
    }
  },
  mounted () {
    this.getTab()
    this.getStructureTreeAllHandle()
  },
  methods: {
    getTab () {
      let arr = []
      arr = this.tabData.filter(item => this.permission.includes(item.code))
      if (arr.length <= 0) {
        this.hasAuth = false
      } else {
        this.tabActiveKey = arr && arr.length > 0 ? arr[0].key : ''
        this.tabList = arr
      }
    },
    handleTabChange (key) {
      this.tabActiveKey = key
    },
    onDateChange (dateArr) {
      if (dateArr.length > 0) {
        this.queryParams.startDate = dateArr[0]
        this.queryParams.endDate = dateArr[1]
      } else {
        this.queryParams.startDate = ''
        this.queryParams.endDate = ''
      }
    },

    getStructureTreeAllHandle () {
      getStructureTreeAll().then(res => {
        const data = res.filter(item => item.type.code === 1 || item.type.code === 2)
        this.companyList = [
          { id: '', fullName: '全部' },
          ...data
        ]
      })
    },

    unauthorityHandle () {
      this.hasAuth = false
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
