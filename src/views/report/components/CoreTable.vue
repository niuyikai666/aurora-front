<template>
  <div>
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      :row-key="(record, index) => index"
    >
    </a-table>
  </div>
</template>

<script>
import { amountFormat } from '@/utils/util'

const columns = [
  {
    title: '日期',
    dataIndex: 'yearMonth',
    width: '40%'
  },
  {
    title: '流水（元）',
    dataIndex: 'num',
    width: '40%',
    customRender: (text, row, index) => {
      return amountFormat(text)
    }
  },
  {
    title: '月环比（%）',
    dataIndex: 'ratioNum'
  }
]
export default {
  name: 'CoreData',
  props: {
    type: {
      type: [String || Number],
      default: null
    },
    tableData: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      columns,
      amountFormat
    }
  },
  mounted () {
    this.setCoumns(this.type)
  },
  methods: {
    setCoumns (val) {
      switch (val) {
        case '1':
          this.columns[1].title = '流水（元）'
          break
        case '2':
          this.columns[1].title = '1H日活均值（人）'
          break
        case '3':
          this.columns[1].title = '新入驻主播数（人）'
          break
        default:
          break
      }
    }
  },
  watch: {
    type (val) {
      this.setCoumns(val)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
