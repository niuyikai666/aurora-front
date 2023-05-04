<template>
  <a-modal
    title="数据明细"
    :width="1200"
    :visible="visible"
    :destroyOnClose="true"
    :footer="null"
    @cancel="$emit('cancel')"
  >
    <s-table
      class="my-table"
      row-key="id"
      :data="loadData"
      :scroll="{x: 1200}"
      :columns="columns"
      ref="table"
    >
    </s-table>
  </a-modal>
</template>

<script>
import { STable } from '@/components'
import { getDetailData } from '@/api/video-data'
import { columnsModal } from '../tableColumns'
export default {
  data () {
   return {
     loading: false,
     columns: columnsModal,
     detailList: []
   }
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String],
      default: null
    },
    params: {
      type: Object,
      default: null
    }
  },
  components: {
    STable
  },

  mounted () {
  },

  methods: {
    loadData (params) {
      let dateRange = {}
      if (this.params.startDate) {
        dateRange = {
          startDate: this.params.startDate,
          endDate: this.params.endDate
        }
      }
      Object.assign(params, { wechatId: this.id, ...dateRange })
      return getDetailData(params).then(res => {
        return res
      })
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
</style>
