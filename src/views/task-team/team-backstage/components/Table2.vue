<template>
  <s-table
    ref="table"
    row-key="companyName"
    :columns="columns"
    :data="getData"
    :scroll="{x: 2200}"
  >
    <template slot="levelZeroRewardTargetPlannedSpeed" slot-scope="text, record">
      <span :class="{'tips': needTip(record.shouldCompletedPlannedSpeed, text) }">{{ getVal(text) }}</span>
    </template>
    <template slot="levelOneRewardTargetPlannedSpeed" slot-scope="text, record">
      <span :class="{'tips': needTip(record.shouldCompletedPlannedSpeed, text) }">{{ getVal(text) }}</span>
    </template>
    <template slot="levelTwoRewardTargetPlannedSpeed" slot-scope="text, record">
      <span :class="{'tips': needTip(record.shouldCompletedPlannedSpeed, text) }">{{ getVal(text) }}</span>
    </template>
  </s-table>
</template>

<script>
import { STable } from '@/components'
import { rewardProcessColumns } from '../../columns'
import { getCompanyRewardProcess } from '@/api/task'
import { amountFormat } from '@/utils/util'

export default {
  name: 'ToalComp3',
  props: {
    params: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    STable
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
    getData (parameter) {
      const requestParameters = Object.assign({}, parameter, this.params || {})
      return getCompanyRewardProcess(requestParameters).then(res => {
        return res
      })
    },
    needTip (needVal, value) {
      if (value === null) {
        return false
      } else if (needVal * 100 > Number(value) * 100) {
        return true
      }
    },
    getVal (value) {
      return value !== null ? `${amountFormat(Number(value) * 100, true, 2)}%` : '-'
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
