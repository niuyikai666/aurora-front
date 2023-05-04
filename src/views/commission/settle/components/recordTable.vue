<template>
  <a-modal
    :width="1200"
    title="反馈记录"
    :visible="visible"
    :footer="null"
    @cancel="$emit('cancel')"
    :destroyOnClose="true"
  >
    <s-table
      :columns="modalColumns"
      row-key="id"
      :data="loadData"
      ref="table"
    >
    </s-table>
  </a-modal>
</template>

<script>
import { getFeedbackInfluencer } from '@/api/commission'
import { STable } from '@/components'
import moment from 'moment'
import { modalColumns } from '../tableColumns'
export default {
  props: {
    id: {
      type: [Number, String],
      default: null
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      modalColumns
    }
  },

  components: {
    STable
  },

  mounted () {},

  methods: {
    loadData (params) {
      Object.assign(params, {
        id: this.id,
        monthCycle: moment(new Date()).subtract(1, 'months').format('YYYY-MM')
      })
      return getFeedbackInfluencer(params).then(res => {
        return res
      })
    }
  }
}

</script>
<style lang='less' scoped>
</style>
