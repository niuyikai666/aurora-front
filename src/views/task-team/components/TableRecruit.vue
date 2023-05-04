<template>
  <s-table
    class="my-table"
    ref="table"
    :row-key="(record, index) => index"
    :columns="columns"
    :data="getData"
  >
    <!-- <template slot="tiktokEffectRecruitCount">
      <div>抖音有效招募数</div>
      <div>(400-30000元)</div>
    </template>
    <template slot="tiktokHighQualityRecruitCount">
      <div>抖音优质招募数</div>
      <div>(30000元以上)</div>
    </template>
    <template slot="viodeEffectRecruitCount">
      <div>视频号有效招募数</div>
      <div>(1800-30000元)</div>
    </template>
    <template slot="viodeHighQualityRecruitCount">
      <div>视频号优质招募数</div>
      <div>(30000元以上)</div>
    </template> -->
  </s-table>
</template>

<script>
import { STable } from '@/components'
import { columnsRecruit } from '../columns'
import { getGroupRecruitList } from '@/api/task'
import { amountFormat } from '@/utils/util'

export default {
  name: 'ToalCompRecruit',
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  components: {
    STable
  },
  data () {
    return {
      amountFormat,
      columns: columnsRecruit
    }
  },
  mounted () {
  },
  methods: {
    getData (parameter) {
      const requestParameters = Object.assign({}, this.params || {}, parameter)
      return getGroupRecruitList(requestParameters).then(res => {
        return res
      })
    }
  },
  watch: {
    params: {
      handler (val) {
        this.$refs.table.refresh(true)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
// /deep/ .ant-table-column-title {
//   .anticon-question-circle {
//     display: none;
//   }
// }
</style>
