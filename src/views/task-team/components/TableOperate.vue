<template>
  <s-table
    class="my-table"
    ref="table"
    :row-key="(record, index) => index"
    :columns="columns"
    :data="getData"
  >
    <template slot="dailyAverageReward" slot-scope="text, record">
      <span :class="{'tips': text && Number(text) < Number(record.lastMonthDailyAverageReward) }">{{ text && amountFormat(text, true, 2) || '--' }}</span>
    </template>
    <template slot="effLiveActorCount" slot-scope="text, record">
      <span :class="{'tips': text && Number(text) < Number(record.lastMonthEffLiveActorCount) }">{{ text && amountFormat(text, false) || '--' }}</span>
    </template>
  </s-table>
</template>

<script>
import { STable } from '@/components'
import { columnsOperate } from '../columns'
import { getGroupOperateList } from '@/api/task'
import { amountFormat } from '@/utils/util'

export default {
  name: 'ToalCompOperate',
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
      columns: columnsOperate
    }
  },
  mounted () {
  },
  methods: {
    getData (parameter) {
      const requestParameters = Object.assign({}, this.params || {}, parameter)
      return getGroupOperateList(requestParameters).then(res => {
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
