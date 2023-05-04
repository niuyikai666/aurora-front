<template>
  <div class="pt24">
    <div class="flexbox">
      <div class="flex1">
        <a-auto-complete
          style="width: 230px;"
          placeholder="请输入抖音昵称/抖音号/抖音号原/火山号/火山号原"
          option-label-prop="title"
          allowClear
          v-model="artistInfo"
          @search="onArtistSearch"
          @select="onSelect"
        >
          <template slot="dataSource">
            <a-select-option v-for="item in artistSource" :key="item.id" :title="item.nickName">
              <dl class="search-list">
                <dd>昵称：{{ item.nickName || '-' }}</dd>
                <dd>抖音号：{{ item.account || '-' }}</dd>
              </dl>
            </a-select-option>
          </template>
          <a-input class="auto-input">
            <a-icon slot="suffix" type="search" />
          </a-input>
        </a-auto-complete>

        <a-checkbox class="ml24" v-model="queryParams.isCheck">
          道具流水前30名主播
        </a-checkbox>
      </div>
      <div class="right-con">
        <a-range-picker
          style="width: 250px;"
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          :disabledDate="disabledDate"
          @change="onDateChange"
        />
      </div>
    </div>
    <div class="pd24">
      <table-1 v-if="hasFinish" :params="queryParams" :func="getReportLiveListOperate" />
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Table1 from './components/Table1'
import { getReportLiveListOperate, reportLiveSearch, getNewTime } from '@/api/report'

export default {
  name: 'ReportLiveOperate',
  components: {
    Table1
  },
  data () {
    return {
      queryParams: {
        id: '',
        startDate: '',
        endDate: '',
        isCheck: false
      },
      dateRange: [],
      // preMonthStart: moment().subtract(1, 'months').startOf('month'),
      // preMonthEnd: moment().subtract(1, 'months').endOf('month'),
      // monthStart: moment().startOf('month'),
      // monthEnd: moment().endOf('month'),

      getReportLiveListOperate,

      artistInfo: '',
      artistSource: [],

      endNewTime: '',

      hasFinish: false
    }
  },
  mounted () {
    this.handleGetNewTime()
  },
  methods: {
    handleGetNewTime () {
      getNewTime().then(time => {
        const data = new Date(time)
        this.endNewTime = time
        this.queryParams.endDate = time
        this.queryParams.startDate = moment(data).startOf('month').format('YYYY-MM-DD')
        this.dateRange = [moment(data).startOf('month').format('YYYY-MM-DD'), time]

        this.$nextTick(() => {
          this.hasFinish = true
        })
      })
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
    onSearch (val) {
      this.queryParams.keyword = val
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    disabledDate (time) {
      return time.valueOf() > new Date(this.endNewTime) || time.valueOf() < new Date((new Date(this.endNewTime)).getTime() - 150 * 24 * 3600 * 1000)
      // return time > moment().subtract(0, 'days')
    },

    onArtistSearch (query) {
      if (query.trim() === '') return
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.handleArtistSearch(query)
      }, 200)
    },
    handleArtistSearch (query) {
      reportLiveSearch({ keyword: query }).then(res => {
        this.artistSource = []
        if (res.length > 0) {
          this.artistSource = res.map(item => {
            item.id = item.id + ''
            return item
          })
        }
      })
    },
    onSelect (value) {
      this.queryParams.id = value
    }
  },
  watch: {
    'queryParams.departmentIds' () {
      this.$refs.cascader.dropDownVisible = false
    },
    artistInfo (value) {
      if (value === '' || value === undefined) {
        this.queryParams.id = ''
      }
    }
  },
  destroyed () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="less" scoped>
  @import '../index.less';
  .flexbox {
    display: flex;
    padding: 0 24px;
    .flex1 {
      flex: 1;
    }
  }
  .search-list {
    margin-bottom: 0;
    border-bottom: solid 1px #eee;
    padding-bottom: 5px;
    dd {
      margin-bottom: 0;
    }
  }
</style>
