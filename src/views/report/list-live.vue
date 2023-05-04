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
          <span class="report-tit cascader-desc">统计报表范围:</span>
          <span class="report-name cascader-desc">{{ priRangeName }} <a-icon class="antion-custom" type="down" /></span>
          <a-select
            style="width: 110px;"
            v-model="dateParams.relationType"
            @change="priRangeHandle"
          >
            <a-select-option :value="1">
              实际运营
            </a-select-option>
            <a-select-option :value="2">
              抖音开放平台
            </a-select-option>
          </a-select>
        </div>
        <div class="cascader-custom report-custom">
          <span class="report-tit cascader-desc">数据范围:</span>
          <span class="report-name cascader-desc">{{ departmentName }} <a-icon class="antion-custom" type="down" /></span>
          <!-- <a-cascader
            placeholder="请选择"
            v-model="departmentId"
            :options="treeData"
            change-on-select
            :allow-clear="false"
            expand-trigger="hover"
            :display-render="displayRender"
            @change="changeDepartment"
          /> -->
          <el-cascader
            ref="cascader"
            v-model="departmentId"
            :options="treeData"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            :show-all-levels="false"
            :dropDownVisible="false"
            @change="changeDepartment2"
          >
            <template slot-scope="{ data }">
              <span :title="data.fullName">{{ data.label }}</span>
            </template>
          </el-cascader>
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
        <!-- <span v-if="activeKey === 'tab2'">
          <a-range-picker
            style="width:260px"
            v-model="trendDate"
            :allowClear="false"
            value-format="YYYY-MM-DD"
            :disabledDate="disabledDate"
          >
            <a-icon slot="suffixIcon" type="calendar" />
          </a-range-picker>
        </span> -->
      </div>
      <div v-if="activeKey === 'tab1' && rDaily">
        <one ref="tab1" :data="dateParams" :permission="permission"/>
      </div>
      <div v-if="activeKey === 'tab2' && rDaily">
        <two ref="tab2" :data="dateParams" :permission="permission"/>
      </div>
      <!-- <div v-if="activeKey === 'tab2' && rDaily">
        <trend-comp />
      </div>
      <div v-if="activeKey === 'tab3' && rDaily">
        <live-comp />
      </div>
      <div v-if="activeKey === 'tab4' && rDaily">
        <degree-comp />
      </div> -->
    </a-card>
  </div>
</template>

<script>

import { getStructureTree, getNewTime } from '@/api/report'
import moment from 'moment'
import timeRange, { getNearMonthByAppoint } from '@/utils/timeRange'
import One from './components/list-live/One/index'
import Two from './components/list-live/Two/index'
// import TrendComp from './components/TrendComp'
// import LiveComp from './components/LiveComp'
// import DegreeComp from './components/DegreeComp'
import { mapGetters } from 'vuex'
// import { createTree } from '@/utils/tree/selectTree'
import createTree from '@/utils/tree/generateTree'

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
      tabListOrig: [],
      tabList: [],

      treeData: [],
      originTreeData: [],

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
        relationType: 1,
        departmentType: 0
      },
      departmentId: [],
      priRangeMap: {
        1: '实际运营',
        2: '抖音开放平台'
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
    this.createTab()
  },
  mounted () {
    this.interval = setInterval(function () {
      document.querySelectorAll('.el-cascader-node__label').forEach(el => {
        el.onclick = function () {
          if (this.previousElementSibling) this.previousElementSibling.click()
        }
      })
    }, 1000)
    setTimeout(() => {
      // this.dateParams.dataType = this.permission.api_privilege.includes('ARTIST_FREEDOM_LIST') ? 1 : 2
      this.getStructureTreeHandle()
      this.getNewTimeHandle()
    }, 100)
  },
  methods: {
    createTab (flag) {
      this.tabList = [
        {
          key: 'tab1',
          tab: '报表概览',
          permission: this.permission.includes('report_live_detail')
        },
        {
          key: 'tab2',
          tab: '流水分析',
          permission: this.permission.includes('report_live_reward') && this.dateParams.relationType !== 2
        }
      ]
      this.tabList = this.tabList.filter(item => item.permission)
      this.activeKey = this.tabList[0].key
      if (sessionStorage.getItem('activeTab-liveReport') && !flag) {
        this.activeKey = sessionStorage.getItem('activeTab-liveReport')
      }
      sessionStorage.setItem('activeTab-liveReport', this.activeKey)
    },
    onTabChange (key) {
      this.activeKey = key
      sessionStorage.setItem('activeTab-liveReport', this.activeKey)
    },
    getNewTimeHandle () {
      getNewTime().then(res => {
        this.rDaily = res
        this.trendDate = getNearMonthByAppoint(res)
      })
    },
    getStructureTreeHandle () {
      getStructureTree().then(res => {
        const blankData = {
          id: '',
          label: '全部',
          value: '',
          fullName: '全部',
          type: {
            code: 0
          }
        }
        this.originTreeData = [
          blankData,
          ...res
        ]
        this.treeData = [
          blankData,
          ...createTree(res)
        ]
      })
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
            relationType: this.dateParams.relationType,
            departmentType: this.dateParams.departmentType
          }
          break
        case 2:
          this.rWeek = timeRange.nearWeek[0]
          this.dateParams = {
              cycleType: this.dateParams.cycleType,
              cycleDate: this.getWeek(new Date(new Date(this.rWeek))),
              departmentId: this.dateParams.departmentId,
              relationType: this.dateParams.relationType,
              departmentType: this.dateParams.departmentType
            }
          break
        case 3:
          this.dateParams = {
            cycleType: this.dateParams.cycleType,
            cycleDate: moment(this.rMonth).format('YYYY-MM'),
            departmentId: this.dateParams.departmentId,
            relationType: this.dateParams.relationType,
            departmentType: this.dateParams.departmentType
          }
          break
        default:
          break
      }
    },
    // 数据范围
    // changeDepartment (val, selectedOptions) {
    //   this.dateParams = {
    //     cycleType: this.dateParams.cycleType,
    //     cycleDate: this.dateParams.cycleDate,
    //     departmentId: val && val.length > 0 ? val[val.length - 1] : '',
    //     relationType: this.dateParams.relationType,
    //     departmentType: selectedOptions[0].type.code
    //   }
    //   this.departmentName = selectedOptions && selectedOptions.length > 0 && selectedOptions[0].value !== '' ? selectedOptions[selectedOptions.length - 1].name : '全部'
    // },
    changeDepartment2 (val) {
      const departInfo = this.originTreeData.filter(item => item.id === val[val.length - 1])[0]
      this.dateParams = {
        cycleType: this.dateParams.cycleType,
        cycleDate: this.dateParams.cycleDate,
        departmentId: val[val.length - 1],
        relationType: this.dateParams.relationType,
        departmentType: departInfo.type.code
      }
      this.departmentName = departInfo.fullName
    },
    // 更改日期
    dataOverviewOnChange (date, dateString) {
      switch (parseInt(this.dateTabSelected)) {
        case 1:
          this.dateParams = {
            cycleType: this.dateParams.cycleType,
            cycleDate: this.rDaily,
            departmentId: this.dateParams.departmentId,
            relationType: this.dateParams.relationType,
            departmentType: this.dateParams.departmentType
          }
          break
        case 2:
          this.dateParams = {
            cycleType: this.dateParams.cycleType,
            cycleDate: this.getWeek(new Date(new Date(this.rWeek))),
            departmentId: this.dateParams.departmentId,
            relationType: this.dateParams.relationType,
            departmentType: this.dateParams.departmentType
          }
          break
        case 3:
          this.dateParams = {
            cycleType: this.dateParams.cycleType,
            cycleDate: moment(this.rMonth).format('YYYY-MM'),
            departmentId: this.dateParams.departmentId,
            relationType: this.dateParams.relationType,
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
        relationType: value
      }
      this.createTab(true)
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
    }
  },
  computed: {
    ...mapGetters(['permission'])
  },
  watch: {
    'departmentId' () {
      this.$refs.cascader.dropDownVisible = false
    }
  },
  destroyed () {
    clearInterval(this.interval)
    sessionStorage.removeItem('activeTab-liveReport')
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
