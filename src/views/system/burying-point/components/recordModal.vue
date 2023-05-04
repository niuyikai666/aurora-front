<template>
  <a-modal
    :title="`埋点记录-${data.title}`"
    :visible="visible"
    :destroyOnClose="false"
    :footer="false"
    :width="800"
    @cancel="cancel"
  >
    <s-table
      :columns="colunms"
      :row-key="(record, index) => index"
      :data="loadData"
      ref="table"
    >
    </s-table>
  </a-modal>
</template>

<script>
import { getModuleDetail, getPageDetail } from '@/api/burying-point'
import { STable } from '@/components'
const colunms = [
  {
    title: '日期',
    dataIndex: 'dateTime'
  },
  {
    title: '使用人数',
    dataIndex: 'peopleNum'
  },
  {
    title: '使用次数',
    dataIndex: 'timeNum'
  }
]
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    },
    type: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      colunms
    }
  },

  components: {
    STable
  },

  mounted () {},

  methods: {
    loadData (params) {
      Object.assign(params, this.data)
      if (this.type === 1) {
        return getModuleDetail(params).then(res => {
          return res
        })
      } else {
        return getPageDetail(params).then(res => {
          return res
        })
      }
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}

</script>
<style lang='less' scoped>
</style>
