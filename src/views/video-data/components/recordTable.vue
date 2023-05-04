<template>
  <a-modal
    title="明细导出记录"
    :width="800"
    :visible="visible"
    :destroyOnClose="true"
    :footer="null"
    @cancel="$emit('cancel')"
  >
    <p class="record-txt">导出记录仅保留24h，请及时下载</p>
    <s-table
      class="my-table"
      row-key="id"
      :data="loadData"
      :columns="columns"
      ref="table"
    >
      <template slot="action" slot-scope="text, record">
        <a-button type="link" @click="down(record)">下载</a-button>
      </template>
    </s-table>
  </a-modal>
</template>

<script>
import { STable } from '@/components'
import { exportLogs } from '@/api/report'
import { RecordModal } from '../tableColumns'
export default {
  data () {
   return {
     loading: false,
     columns: RecordModal
   }
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    STable
  },

  mounted () {
  },

  methods: {
    loadData (params) {
      return exportLogs(params).then(res => {
        return res
      })
    },
    down (val) {
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/wechatReport/download/disk/daily/detail?fileKey=${val.fileKey}`
    }
  },
  watch: {
    queryParams (val) {
      if (val) {
        this.$refs.table.refresh()
      }
    }
  }
}

</script>
<style lang='less' scoped>
.record-txt{
  font-size: 14px;
  color: #755dd7;
}
</style>
