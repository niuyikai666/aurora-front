<template>
  <s-table
    class="my-table"
    ref="table"
    row-key="ranking"
    :columns="columns"
    :data="getData"
    :scroll="{x: 2400}"
  >
    <template slot="levelOneIncomeTargetPlannedSpeed" slot-scope="index, record">
      <span :class="{'tips': record.shouldCompletedPlannedSpeed > record.levelOneIncomeTargetPlannedSpeed }">{{ record.levelOneIncomeTargetPlannedSpeed ? amountFormat(record.levelOneIncomeTargetPlannedSpeed * 100, true, 2) + '%' : '--' }}</span>
    </template>
    <template slot="levelTwoIncomeTargetPlannedSpeed" slot-scope="index, record">
      <span :class="{'tips': record.shouldCompletedPlannedSpeed > record.levelTwoIncomeTargetPlannedSpeed }">{{ record.levelTwoIncomeTargetPlannedSpeed ? amountFormat(record.levelTwoIncomeTargetPlannedSpeed * 100, true, 2) + '%' : '--' }}</span>
    </template>
  </s-table>
</template>

<script>
import { STable } from '@/components'
import { columnsProcess } from '../../columns'
import { getMemberProcessList } from '@/api/task'
import { amountFormat } from '@/utils/util'

export default {
  name: 'ToalComp1',
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  components: {
    STable
  },
  data () {
    return {
      amountFormat,
      columns: columnsProcess,
      updateTime: ''
    }
  },
  mounted () {
    this.columns = columnsProcess.filter(item => item.dataIndex !== 'rank')
  },
  methods: {
    getData (parameter) {
      const requestParameters = Object.assign({}, parameter, this.params || {})
      return getMemberProcessList(requestParameters).then(res => {
        return res
      })
    }
  },
  watch: {
    params: {
      handler (val) {
        this.$refs.table.refresh(true)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
  .tips {
    color: #ff4d4f;
  }
</style>
