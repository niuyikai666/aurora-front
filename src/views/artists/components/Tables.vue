<template>
  <s-table
    ref="table"
    row-key="dateTime"
    :columns="columns"
    :data="getLiveDataHandle">
    <template slot="dateTime" slot-scope="text, record">
      {{ moment(record.dateTime).format('YYYY-MM-DD') }}
    </template>
    <template slot="validLiveDuration" slot-scope="text, record">
      {{ (record.validLiveDuration / 3600).toFixed(2) }}
    </template>
    <template slot="soundbyte" slot-scope="text, record">
      {{ numberFormat(record.soundbyte) }} {{ record.soundbyte > 10000 ? '万' : '' }}
    </template>
    <template slot="showUv" slot-scope="text, record">
      {{ numberFormat(record.showUv) }} {{ record.showUv > 10000 ? '万' : '' }}
    </template>
    <template slot="showPv" slot-scope="text, record">
      {{ numberFormat(record.showPv) }} {{ record.showPv > 10000 ? '万' : '' }}
    </template>
    <template slot="watchUv" slot-scope="text, record">
      {{ numberFormat(record.watchUv) }} {{ record.watchUv > 10000 ? '万' : '' }}
    </template>
    <template slot="watchPv" slot-scope="text, record">
      {{ numberFormat(record.watchPv) }} {{ record.watchPv > 10000 ? '万' : '' }}
    </template>
    <template slot="enterRoomConversionRate" slot-scope="text, record">
      {{ record.enterRoomConversionRate.toFixed(2) }}%
    </template>
    <template slot="watchDurationUserAvg" slot-scope="text, record">
      {{ (record.watchDurationUserAvg / 60).toFixed(2) }}
    </template>
  </s-table>
</template>
<script>
import { STable } from '@/components'
export default {
  props: {
    columns: {
      type: Array,
      default: null
    },
    getLiveDataHandle: {
      type: Function,
      default: null
    }
  },
  components: {
    STable
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
