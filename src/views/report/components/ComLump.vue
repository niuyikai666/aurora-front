<template>
  <tab-content :title="title">
    <span slot="titleRightContent">
      <a-button type="link" class="mr10" @click="changeTab('tabActive')">{{ tabActive ? '数据表' : '图表' }}</a-button>
    </span>
    <com-chart
      v-if="tabActive"
      :activeTab="activeTab"
      :tab="filedsData"
      :lineData="chartData"
      @change="getChartData"
      :chartType="chartType"
    />
    <com-table
      v-if="!tabActive"
      ref="table"
      :getList="getTableData"
      :columns="columns"
      :data="data"
    />
  </tab-content>
</template>

<script>
import TabContent from './TabContent'
import ComTable from './ComTable'
import ComChart from './ComChart'
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    getTableData: {
      type: Function,
      default: null
    },
    columns: {
      type: Array,
      default: null
    },
    getChart: {
      type: Function,
      default: null
    },
    type: {
      type: Number,
      default: null
    },
    getFileds: {
      type: Function,
      default: null
    },
    chartType: {
      type: Number,
      default: 1
    },
    departmentType: {
      type: Number,
      default: 0
    }
  },
  components: {
    TabContent,
    ComTable,
    ComChart
  },
  data () {
    return {
      tabActive: true,
      filedsData: [],
      chartData: [],
      activeTab: ''
    }
  },
  mounted () {
    this.getFilesData()
  },
  methods: {
    getFilesData () {
      this.getFileds({
        type: this.type
      }).then(res => {
        this.filedsData = res
        this.getChartData(res[0].name, res[0].value)
      })
    },
    getChartData (file, name) {
      if (name === this.activeTab) {
        return
      }
      const params = Object.assign({}, this.data, {
        file: file,
        type: this.type,
        departmentType: this.departmentType
      })
      this.getChart(params).then(res => {
        if (this.chartType === 2) {
          res.forEach(item => {
            item.dateTime = item.dateTime.split('-')[1] + '-' + item.dateTime.split('-')[2]
          })
        }
        if (this.chartType === 1) {
          res.forEach(item => {
            item.prop = name
          })
        }
        this.activeTab = file
        this.chartData = res
      })
    },
    changeTab () {
      this.tabActive = !this.tabActive
    },
    refresh () {
      if (this.$refs.table) {
        this.$refs.table.refresh()
      } else {
        this.getFilesData()
      }
    }
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
@import "~ant-design-vue/es/style/themes/default.less";
@import '../index.less';
  .check-content {
    .title {
      font-size: 14px;
      font-weight: 700;
      color: rgba(0,0,0,.85);
      span {
        font-size: 12px;
        color: rgba(0,0,0,.65);
        font-weight: normal;
      }
    }
    .check-group {
      width: 100%;
      .ant-col {
        margin-bottom: 8px;
      }
    }
  }
</style>
