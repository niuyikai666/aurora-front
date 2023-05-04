<template>
  <a-table
    ref="table"
    row-key="companyName"
    :columns="columns"
    :data-source="tabelData"
    :scroll="{x: 1000}"
  >
    <template slot="completedPlannedSpeed" slot-scope="index, record">
      <span :class="{'tips': record.shouldCompletedPlannedSpeed > record.completedPlannedSpeed }">{{ record.completedPlannedSpeed ? amountFormat(record.completedPlannedSpeed * 100, true, 2) + '%' : '--' }}</span>
    </template>
  </a-table>
</template>

<script>
// import { STable } from '@/components'
import { rewardProcessColumns } from '../../columns'
import { getCompanyRewardProcess } from '@/api/task'
import { amountFormat } from '@/utils/util'

export default {
  name: 'ToalComp2',
  props: {
    params: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    // STable
  },
  data () {
    return {
      amountFormat,
      columns: rewardProcessColumns,
      tabelData: []
    }
  },
  mounted () {
  },
  methods: {
    getData () {
      return getCompanyRewardProcess(this.params).then(res => {
        this.tabelData = res
      })
    }
  },
  watch: {
    params: {
      handler (val) {
        this.getData()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
  .tips {
    color: #ff4d4f;
  }
</style>
