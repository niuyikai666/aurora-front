<template>
  <a-modal
    title="主播任务明细"
    :width="1200"
    :visible="visible"
    :destroyOnClose="true"
    :footer="null"
    @cancel="$emit('cancel')"
  >
    <a-table
      class="my-table"
      ref="table"
      :loading="loading"
      :row-key="(record, index) => index"
      :columns="columns"
      :data-source="detailList"
      :scroll="{x: 1800}"
    >
      <template slot="nickName" slot-scope="text, record">
        <div class="flex-box">
          <div class="box-item">
            <p>昵称：{{ record.nickName || '--' }}</p>
            <p>抖音号: {{ record.tiktokCode || '--' }}</p>
            <p>抖音号原: {{ record.tiktokCodeOrig || '--' }}</p>
          </div>
        </div>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { STable } from '@/components'
import { getPersonListDetail } from '@/api/commission'
import { columnsModal } from '../tableColumns'
export default {
  data () {
   return {
     loading: false,
     columns: columnsModal(this.type),
     detailList: []
   }
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: null
    },
    type: {
      type: Number,
      default: null
    },
    tiktokLiveInfoId: {
      type: [Number, String],
      default: null
    }
  },
  components: {
    STable
  },

  mounted () {
  },

  methods: {
    getData () {
      this.loading = true
      const queryParams = {
        type: this.type,
        tiktokLiveInfoId: this.tiktokLiveInfoId
      }
      const requestParameters = Object.assign(queryParams, this.params || {})
      getPersonListDetail(requestParameters).then(res => {
        this.loading = false
        this.detailList = res
      })
    }
  },
  watch: {
    visible: {
      handler (val) {
        if (val) {
          this.getData()
        }
      }
    }
  }
}

</script>
<style lang='less' scoped>
</style>
