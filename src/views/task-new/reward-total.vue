<template>
  <a-card
    title="提成明细"
    :bordered="false"
  >
    <a-button slot="extra" type="primary" @click="download">导出</a-button>
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
import { rewardTotalDetail } from '@/api/task'
import { rewardColumns } from './columns'
import { STable } from '@/components'
export default {
  data () {
    return {
      date: '',
      columns: rewardColumns,
      departmentId: ''
    }
  },

  components: {
    STable
  },
  created () {
    this.date = this.$route.query.date
    this.departmentId = this.$route.query.departmentId
  },
  mounted () {
  },

  methods: {
    getData (parameter) {
      parameter = Object.assign({}, parameter, {
        monthCycle: this.date,
        departmentId: this.departmentId
      })
      return rewardTotalDetail(parameter).then(res => {
        return res
      })
    },
    download () {
      window.location.href = process.env.VUE_APP_API_BASE_URL + `/lachine/total/deduct/detail/export?monthCycle=${this.date}&departmentId=${this.departmentId}`
    }
  }
}

</script>
<style lang='less' scoped>
</style>
