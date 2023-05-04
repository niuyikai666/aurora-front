<template>
  <a-modal
    title="账号日志"
    :visible="visible"
    :destroyOnClose="true"
    @cancel="$emit('cancel')"
    :footer="null"
    :width="800"
  >
    <s-table
      :columns="activingModalColunms"
      row-key="id"
      :data="loadData"
      ref="table"
    >
    </s-table>
  </a-modal>
</template>

<script>
import { getLogsList } from '@/api/cultivate'
import { activingModalColunms } from '../tableColumns'
import { STable } from '@/components'
export default {
  data () {
   return {
     laoding: false,
     activingModalColunms
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
    }
  },
  components: {
    STable
  },

  mounted () {},

  methods: {
    loadData (params) {
      Object.assign(params, {
        id: this.id
      })
      return getLogsList(params).then(res => {
        return res
      })
    },
    submit () {
    }
  },
  watch: {
    visible: {
      handler (val) {
      }
    }
  }
}

</script>
<style lang='less' scoped>
</style>
