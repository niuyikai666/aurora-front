<template>
  <div class="report-content">
    <a-card
      style="width:100%"
      :tab-list="tabList"
      title="核心数据分析"
      :active-tab-key="activeKey"
      @tabChange="onTabChange"
    >
      <div class="con">
        <a-spin :spinning="spinning" style="width:100%;">
          <tab-content style="min-height: 65vh;">
            <div class="topbar clearfix">
              <a-button style="float:right;margin-bottom:24px;" type="primary" @click="togleHandle()">{{ isStatic ? '数据表' : '图表' }}</a-button>
            </div>
            <template v-if="emperty && isStatic">
              <a-empty :image="simpleImage" style="margin-top:200px;" />
            </template>
            <template v-else>
              <template v-if="isStatic">
                <core-chart v-if="chartData.xData" :chartData="chartData" :legend="legend" />
              </template>
              <template v-if="!isStatic">
                <core-table :type="activeKey" :tableData="tableData" />
              </template>
            </template>
          </tab-content>
        </a-spin>
      </div>
    </a-card>
  </div>
</template>

<script>
import TabContent from './components/TabContent'
import CoreChart from './components/CoreChart'
import CoreTable from './components/CoreTable'
import { getReportCoreStatic, getReportCoreTable } from '@/api/report'
import { Empty } from 'ant-design-vue'

export default {
  name: 'ReportCore',
  components: {
    TabContent,
    CoreChart,
    CoreTable
  },
  data () {
    return {
      simpleImage: '',
      activeKey: '1',
      tabList: [
        {
          key: '1',
          tab: '流水'
        },
        {
          key: '2',
          tab: '1H日活均值'
        },
        {
          key: '3',
          tab: '新入驻主播'
        }
      ],
      isStatic: true,
      spinning: true,
      legend: '',
      chartData: {},

      tableData: [],
      emperty: false
    }
  },
  mounted () {
    this.getReportCoreStaticHandle()
    this.simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
  },
  methods: {
    onTabChange (key) {
      this.spinning = true
      this.activeKey = key
      if (this.isStatic) {
        this.chartData = {}
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.getReportCoreStaticHandle()
        }, 300)
      } else {
        this.getReportCoreTableHandle()
      }
    },
    getReportCoreStaticHandle () {
      getReportCoreStatic(this.activeKey).then(res => {
        if (!res.data) {
          this.emperty = true
          this.spinning = false
        } else {
          this.generateData(res)
        }
      })
    },
    generateData (res) {
      const data = {}
      const tabData = this.tabList.filter(item => item.key === this.activeKey + '')[0]
      const leftData = res.data.filter(item => item.location === 'LEFT')
      // leftData[0].y = [234927051.0, 242033206.0, 249139361.0, 256245516.0, 263351671.0, 270457826.0]
      // leftData[1].y = [234927051.0, 242033206.0, 249139361.0, 256245516.0, 263351671.0, 270457826.0]
      const rightData = res.data.filter(item => item.location === 'RIGHT')
      this.legend = [leftData.filter(item => item.isDotted === false)[0].title, leftData.filter(item => item.isDotted === true)[0].title, rightData.filter(item => item.isDotted === false)[0].title, rightData.filter(item => item.isDotted === true)[0].title]
      data.yAxisName = tabData.tab
      data.seriesLeft1 = leftData.filter(item => item.isDotted === false)[0].y
      data.seriesLeft2 = leftData.filter(item => item.isDotted === true)[0].y
      data.seriesRight1 = rightData.filter(item => item.isDotted === false)[0].y
      data.seriesRight2 = rightData.filter(item => item.isDotted === true)[0].y
      data.seriesLeftTitle1 = leftData.filter(item => item.isDotted === false)[0].title
      data.seriesLeftTitle2 = leftData.filter(item => item.isDotted === true)[0].title
      data.seriesRightTitle1 = rightData.filter(item => item.isDotted === false)[0].title
      data.seriesRightTitle2 = rightData.filter(item => item.isDotted === true)[0].title
      data.leftMax = this.getMax(leftData)
      data.leftMin = this.getMin(leftData)
      data.rightMax = this.getMax(rightData)
      data.rightMin = this.getMin(rightData)
      data.xData = res.x
      this.chartData = data
      this.spinning = false
    },
    getMax (data) {
      if (data[0].max > data[1].max) {
        return data[0].max
      } else {
        return data[1].max
      }
    },
    getMin (data) {
      if (data[0].min < data[1].min) {
        return data[0].min
      } else {
        return data[1].min
      }
    },
    getReportCoreTableHandle () {
      getReportCoreTable(this.activeKey).then(res => {
        this.tableData = res
        this.spinning = false
      })
    },
    togleHandle () {
      this.isStatic = !this.isStatic
      if (this.isStatic) {
        this.chartData = {}
        this.getReportCoreStaticHandle()
      } else {
        this.getReportCoreTableHandle()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
