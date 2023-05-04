<template>
  <div class="report-content">
    <!-- <a-card
      style="width:100%"
      :tab-list="tabList"
      :active-tab-key="activeKey"
      @tabChange="onTabChange"
    > -->
    <a-card
      style="width:100%"
      :tab-list="tabList"
      :active-tab-key="activeKey"
      @tabChange="onTabChange"
    >
      <div slot="title">
        数据报表
        <div class="cascader-custom report-custom" style="margin-left:24px">
          <span class="report-tit cascader-desc">数据范围:</span>
          <span class="report-name cascader-desc">{{ departmentName }} <a-icon class="antion-custom" type="down" /></span>
          <a-cascader
            placeholder="请选择"
            v-model="departmentId"
            :options="treeData"
            change-on-select
            :allow-clear="false"
            expand-trigger="hover"
            :display-render="displayRender"
            @change="changeDepartment"
          />
        </div>
      </div>
      <div class="right-bar" slot="extra">
        <span>
          <ul class="date-tab">
            <li
              v-for="(item, index) in dateTabs"
              :key="index"
              :class="{'active': dateTabSelected == index }"
              @click="dateTabHandle(index)"
            >{{ item }}</li>
          </ul>
          <a-date-picker
            v-show="dateTabSelected == 1"
            ref="overviewDaily"
            v-model="rDaily"
            :allowClear="false"
            value-format="YYYY-MM-DD"
            placeholder="选择日期"
            @change="dataOverviewOnChange"
            :disabledDate="disabledDate"
          />
          <a-week-picker
            v-show="dateTabSelected == 2"
            v-model="rWeek"
            :allowClear="false"
            placeholder="选择周"
            value-format="YYYY-MM-DD"
            @change="dataOverviewOnChange"
            :disabledDate="disabledWeekDate"
          >
            <a-icon slot="suffixIcon" type="calendar" />
          </a-week-picker>
          <a-month-picker
            v-show="dateTabSelected == 3"
            v-model="rMonth"
            :allowClear="false"
            value-format="YYYY-MM-DD"
            placeholder="选择月"
            @change="dataOverviewOnChange"
            :disabledDate="disabledMonthDate"
          />
        </span>
      </div>
      <div v-if="activeKey === 'tab1' && rDaily">
        <one ref="tab1" :data="dateParams" :permission="permission"/>
      </div>
      <div v-if="activeKey === 'tab2' && rDaily">
        <two ref="tab2" :data="dateParams" :permission="permission"/>
      </div>
    </a-card>
  </div>
</template>

<script>

import { getStructureTree, getNewTime } from '@/api/report'
import moment from 'moment'
import timeRange, { getNearMonthByAppoint } from '@/utils/timeRange'
import One from './components/list-short/One/index'
import Two from './components/list-short/Two/index'
// import TrendComp from './components/TrendComp'
// import LiveComp from './components/LiveComp'
// import DegreeComp from './components/DegreeComp'
import { mapGetters } from 'vuex'

export default {
  name: 'Report',
  components: {
    One,
    Two
  },
  data () {
    return {
      timeValue: undefined,
      activeKey: 'tab1',
      tabList: [
        {
          key: 'tab1',
          tab: '报表概览'
        },
        {
          key: 'tab2',
          tab: '主播分析'
        }
      ],

      treeData: [],

      // 报表概览
      dateTabSelected: 3,
      dateTabs: {
        1: '日',
        2: '周',
        3: '月'
      },
      // rDaily: timeRange.dayRange[0],
      rDaily: '',
      rWeek: timeRange.nowDay[0],
      rMonth: timeRange.monthRange[0],

      dateParams: {
        cycleType: 3,
        departmentId: '',
        cycleDate: moment(timeRange.monthRange[0]).format('YYYY-MM'),
        dataType: '',
        departmentType: 0
      },
      departmentId: [],
      priRangeMap: {
        operator: '实际运营',
        agent: '抖音开放平台'
      },
      priRangeName: '实际运营',

      // 趋势分析
      trendDate: '',

      // 开播分析
      liveDate: timeRange.nearMonth[0].substring(timeRange.nearMonth[0].lastIndexOf('-'), -1),
      departmentName: '全部'
    }
  },
  created () {
    this.tabList = [
        {
          key: 'tab1',
          tab: '报表概览',
          permission: this.permission.includes('report_video_detail')
        },
        {
          key: 'tab2',
          tab: '主播分析',
          permission: this.permission.includes('report_video_analy')
        }
      ]
      this.tabList = this.tabList.filter(item => item.permission)
      this.activeKey = this.tabList[0].key
      if (sessionStorage.getItem('activeTab-shortReport')) {
        this.activeKey = sessionStorage.getItem('activeTab-shortReport')
      }
    sessionStorage.setItem('activeTab-shortReport', this.activeKey)
  },
  mounted () {
    setTimeout(() => {
      // this.dateParams.dataType = this.permission.api_privilege.includes('ARTIST_FREEDOM_LIST') ? 1 : 2
      this.getStructureTreeHandle()
      this.getNewTimeHandle()
    }, 100)
  },
  methods: {
    onTabChange (key) {
      this.activeKey = key
      sessionStorage.setItem('activeTab-shortReport', this.activeKey)
    },
    getNewTimeHandle () {
      getNewTime().then(res => {
        this.rDaily = res
        this.trendDate = getNearMonthByAppoint(res)
      })
    },
    getStructureTreeHandle () {
      getStructureTree().then(res => {
        const tree = this.toTree(res)
        this.treeData = [
          {
            label: '全部',
            value: '',
            type: {
              code: 0
            }
          },
          ...this.generateTree(tree)
        ]
      })
    },
    toTree (data) {
      const self = this
      const arr = []
      var temp = 1
      function createTree (id, array, list) {
        if (id > 500) return
        var newArr = list.filter(item => item.parentId === id)
        if (newArr.length <= 0) {
          temp = temp + 1
          if (!self.checkExist(list, temp)) {
            createTree(temp, arr, list)
          } else {
            temp = temp + 1
            if (!self.checkExist(list, temp)) {
              createTree(temp, arr, list)
            }
          }
          return array
        } else {
          newArr.forEach(item => {
            const arr = []
            item.children = createTree(item.id, arr, list)
            array.push(item)
          })
          return array
        }
      }
      createTree(temp, arr, data)
      return arr
    },
    checkExist (data, id) {
      var ids = []
      for (var i = 0; i < data.length; i++) {
        ids.push(data[i].id)
      }
      if (ids.indexOf(id) > -1) {
        return true
      } else {
        return false
      }
    },
    generateTree (arr) {
      arr.forEach(item => {
        item['label'] = item.name
        item['value'] = item.id
        if (item.children) {
          this.generateTree(item.children)
        }
        return item
      })
      return arr
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },

    // 日周月 更改
    dateTabHandle (index) {
      if (this.dateTabSelected === index) return
      this.dateTabSelected = this.dateParams.cycleType = index
      switch (parseInt(this.dateTabSelected)) {
        case 1:
          this.dateParams = {
            cycleType: this.dateParams.cycleType,
            cycleDate: this.rDaily,
            departmentId: this.dateParams.departmentId,
            dataType: this.dateParams.dataType,
            departmentType: this.dateParams.departmentType
          }
          break
        case 2:
          this.rWeek = timeRange.nearWeek[0]
          this.dateParams = {
              cycleType: this.dateParams.cycleType,
              cycleDate: this.getWeek(new Date(new Date(this.rWeek))),
              departmentId: this.dateParams.departmentId,
              dataType: this.dateParams.dataType,
              departmentType: this.dateParams.departmentType
            }
          break
        case 3:
          this.dateParams = {
            cycleType: this.dateParams.cycleType,
            cycleDate: moment(this.rMonth).format('YYYY-MM'),
            departmentId: this.dateParams.departmentId,
            dataType: this.dateParams.dataType,
            departmentType: this.dateParams.departmentType
          }
          break
        default:
          break
      }
    },
    getWeek (dateTime) {
      const temptTime = dateTime
      // 周几
      const weekday = temptTime.getDay() || 7
      // 周1+5天=周六
      temptTime.setDate(temptTime.getDate() - weekday + 1 + 5)
      let firstDay = new Date(temptTime.getFullYear(), 0, 1)
      const dayOfWeek = firstDay.getDay()
      let spendDay = 1
      if (dayOfWeek !== 0) {
        spendDay = 7 - dayOfWeek + 1
      }
      firstDay = new Date(temptTime.getFullYear(), 0, 1 + spendDay)
      const d = Math.ceil((temptTime.valueOf() - firstDay.valueOf()) / 86400000)
      const result = Math.ceil(d / 7)
      return `${dateTime.getFullYear()}-${result + 1}`
    },
    // 数据范围
    changeDepartment (val, selectedOptions) {
      this.dateParams = {
        cycleType: this.dateParams.cycleType,
        cycleDate: this.dateParams.cycleDate,
        departmentId: val && val.length > 0 ? val[val.length - 1] : '',
        dataType: this.dateParams.dataType,
        departmentType: selectedOptions[0].type.code
      }
      this.departmentName = selectedOptions && selectedOptions.length > 0 && selectedOptions[0].value !== '' ? selectedOptions[selectedOptions.length - 1].name : '全部'
    },
    // 更改日期
    dataOverviewOnChange (date, dateString) {
      switch (parseInt(this.dateTabSelected)) {
        case 1:
          this.dateParams = {
            cycleType: this.dateParams.cycleType,
            cycleDate: this.rDaily,
            departmentId: this.dateParams.departmentId,
            dataType: this.dateParams.dataType,
            departmentType: this.dateParams.departmentType
          }
          break
        case 2:
          this.dateParams = {
            cycleType: this.dateParams.cycleType,
            cycleDate: this.getWeek(new Date(new Date(this.rWeek))),
            departmentId: this.dateParams.departmentId,
            dataType: this.dateParams.dataType,
            departmentType: this.dateParams.departmentType
          }
          break
        case 3:
          this.dateParams = {
            cycleType: this.dateParams.cycleType,
            cycleDate: moment(this.rMonth).format('YYYY-MM'),
            departmentId: this.dateParams.departmentId,
            dataType: this.dateParams.dataType,
            departmentType: this.dateParams.departmentType
          }
          break
        default:
          break
      }
    },
    disabledDate (current) {
      return current > moment().subtract(1, 'days')
    },
    disabledMonthDate (current) {
      return current > moment().subtract(0, 'days')
    },
    disabledWeekDate (current) {
      return current > moment().subtract(((new Date(timeRange.nowDay[0])) - (new Date(timeRange.weekRange[0]))) / (1000 * 3600 * 24) + 2, 'days')
    },
    // 统计报表范围
    priRangeHandle (value) {
      this.priRangeName = this.priRangeMap[value]
      this.dateParams = {
        ...this.dateParams,
        dataType: value
      }
    }
  },
  computed: {
    ...mapGetters(['permission'])
  },
  destroyed () {
    sessionStorage.removeItem('activeTab-shortReport')
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
