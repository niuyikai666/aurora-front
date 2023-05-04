<template>
  <a-card
    :bordered="false"
  >
    <div slot="title">负责人核算流水 <span style="font-size:16px; color:#755dd7;">{{ this.date }}</span></div>
    <!-- <a-button slot="extra" type="primary" @click="download">导出</a-button> -->
    <s-table
      ref="table"
      :row-key="(item, index) => index"
      :columns="columns"
      :data="getData"
    >
    </s-table>
  </a-card>
</template>

<script>
import { rewardAccount } from '@/api/task'
import { rewardAccountColumns } from './columns'
import { STable } from '@/components'
export default {
  data () {
    return {
      date: '',
      columns: rewardAccountColumns
    }
  },

  components: {
    STable
  },
  created () {
    this.date = this.$route.query.date
  },
  mounted () {
  },

  methods: {
    getData (parameter) {
      parameter = Object.assign({}, parameter, {
        monthCycle: this.date
      })
      return rewardAccount(parameter).then(res => {
        return res
      })
    }
  }
}

</script>
<style lang='less' scoped>
</style>
