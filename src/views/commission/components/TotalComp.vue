<template>
  <div>
    <a-row class="mb24" style="font-weight: 500; color:#333;">
      <a-col :span="6">
        <span>姓名:</span> {{ detailData.name }}
      </a-col>
      <a-col :span="6">
        <span>岗位:</span> -
      </a-col>
      <a-col :span="6">
        <span>是否转正:</span> {{ detailData.state === 2 ? '是' : '否' }}
      </a-col>
      <a-col :span="6">
        <span>入职日期-离职日期:</span> {{ detailData.joinTime }} - {{ detailData.dimisstionTime }}
      </a-col>
    </a-row>
    <a-table
      class="my-table"
      ref="table"
      :loading="loading"
      :row-key="(record, index) => index"
      :columns="columns"
      :data-source="detailData.detail"
    >
      <template slot="nickName" slot-scope="text, record">
        <div class="flex-box">
          <div class="box-item">
            <p>{{ record.tiktokLiveName }}</p>
            <p>抖音号: {{ record.tiktokCode || '--' }}</p>
            <p>抖音号原: {{ record.tiktokCodeOrig || '--' }}</p>
          </div>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import { STable } from '@/components'
import { columnsTotal } from '../tableColumns'
import { getCommisionTotal } from '@/api/commission'
import { amountFormat } from '@/utils/util'

export default {
  name: 'ToalCompOperate',
  props: {
    params: {
      type: Object,
      default: null
    },
    type: {
      type: Number,
      default: null
    }
  },
  components: {
    STable
  },
  data () {
    return {
      amountFormat,
      loading: false,
      columns: columnsTotal(this.type),
      detailData: {}
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData (parameter) {
      this.loading = true
      // const requestParameters = Object.assign({}, this.params || {}, parameter)
      getCommisionTotal(parameter).then(res => {
        this.loading = false
        this.detailData = res
      })
    }
  },
  watch: {
    params: {
      handler (val) {
        this.getData()
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
