<template>
  <a-modal
    class="modal"
    :title="title"
    :width="1200"
    :visible="visible"
    @cancel="onClose"
  >
    <template slot="footer">
      <a-button type="primary" @click="onClose">关闭</a-button>
    </template>
    <div>
      <s-table
        v-if="func"
        class="my-table"
        ref="table"
        :row-key="(record, index) => index"
        :columns="tableColumns"
        :data="getData"
      >
      </s-table>
    </div>
  </a-modal>
</template>

<script>
import { STable } from '@/components'
import { amountFormat } from '@/utils/util'

export default {
  name: 'ToalComp1',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    tableColumns: {
      type: Array,
      default: null
    },
    func: {
      type: Function,
      default: null
    }
  },
  components: {
    STable
  },
  data () {
    return {
      amountFormat
    }
  },
  mounted () {
  },
  methods: {
    getData (parameter) {
      const requestParameters = Object.assign({}, parameter, this.params || {})
      return this.func(requestParameters).then(res => {
        return res
      })
    },

    onClose () {
      this.$emit('close')
    }
  },
  watch: {
    // visible (val) {
    //   if (val) {
    //     this.$nextTick(() => {
    //       this.$refs.table.refresh(true)
    //     })
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
</style>
