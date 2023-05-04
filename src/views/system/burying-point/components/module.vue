<template>
  <a-card
    title="统计列表"
    class="card-custom head-mb5"
  >
    <template slot="extra">
      <a-range-picker v-model="searchDate" @change="searchHandle" :allowClear="false" value-format="YYYY-MM-DD"/>
    </template>
    <s-table
      :columns="colunms"
      :row-key="(record, index) => index"
      :data="loadData"
      ref="table"
    >
      <template slot="action" slot-scope="text, record">
        <a-button class="mr10" type="link" @click="showModal(record)">记录</a-button>
      </template>
    </s-table>
    <record-modal :type="1" :data="data" :visible="visible" @cancel="visible = false" v-if="visible"/>
  </a-card>
</template>

<script>
import moment from 'moment'
import { getModuleList } from '@/api/burying-point'
import recordModal from './recordModal'
import { STable } from '@/components'
import { moduleColumns } from '../tableColumns'
export default {
  components: {
    STable,
    recordModal
  },
  data () {
    return {
      colunms: moduleColumns,
      searchDate: [],
      visible: false,
      data: {}
    }
  },
  created () {
    this.changeMonth()
  },
  mounted () {},

  methods: {
    loadData (params) {
      let beginDate, endDate
      if (this.searchDate && this.searchDate.length !== 0) {
        beginDate = this.searchDate[0]
        endDate = this.searchDate[1]
      }
      Object.assign(params, { beginDate, endDate })
      return getModuleList(params).then(res => {
        return res
      })
    },
    searchHandle () {
      this.$refs.table.refresh(true)
      // this.$nextTick(() => {
      //   this.$refs.table.refresh(true)
      // })
    },
    changeMonth () {
      const searchMonth = moment().subtract(1, 'day').format('YYYY-MM-DD')
      const searchDay = Number(moment(searchMonth).format('D'))
      if (searchDay === 1) {
        const start = moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
        const end = moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
        this.searchDate = [start, end]
      } else {
        const start = moment(searchMonth).startOf('month').format('YYYY-MM-DD')
        const end = searchMonth
        this.searchDate = [start, end]
      }
    },
    showModal (data) {
      this.data = {
        beginDate: this.searchDate[0],
        endDate: this.searchDate[1],
        path: data.parentPath,
        title: data.parentPageCn
      }
      this.visible = true
    }
  },
  computed: {
  }
}

</script>
<style lang='less' scoped>
.card-custom{
  /deep/ .ant-card-body{
    padding: 24px;
    padding-top: 0;
  }
  /deep/ .ant-card-head{
    border: none;
  }
}
.mr5{
  margin-right: 10px;
}
</style>
