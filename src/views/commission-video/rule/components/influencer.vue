<template>
  <div class="pd24">
    <s-table
      :columns="influencerColumns"
      :row-key="(record, index) => index"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    >
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="edit(record)" v-if="dealVisible(record.monthDate)">编辑</a-button>
      </span>
    </s-table>
    <influencer-rule :id="id" :visible="visible" @cancel="cancel"/>
  </div>
</template>

<script>
import influencerRule from './influencerRule'
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { influencerColumns } from '../tableColumns'
export default {
  props: {
    fn: {
      type: Function,
      default: null
    },
    monthDate: {
      type: String,
      default: null
    }
  },
  components: {
    STable,
    influencerRule
  },
  data () {
    return {
      numberFormat,
      influencerColumns,
      id: '',
      visible: false
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    ...mapGetters(['permission'])
  },
  methods: {
    loadData (params) {
      Object.assign(params, {
        monthDate: this.monthDate || moment().format('YYYY-MM')
      })
      return this.fn(params).then(res => {
        return res
      })
    },
    cancel () {
      this.visible = false
    },
    edit (val) {
      this.id = val.id
      this.visible = true
    },
    refresh () {
      this.$refs.table.refresh(true)
    },
    dealVisible (date) {
      const columnDate = moment(date).format('YYYY-MM')
      const nowDate = moment().format('YYYY-MM')
      const nextDate = moment().add(1, 'month').format('YYYY-MM')
      if ((columnDate === nowDate) || (columnDate === nextDate)) {
        return true
      }
      return false
    }
  },
  watch: {
    monthDate: {
      handler () {
        this.refresh()
      }
    }
  }
}

</script>
<style lang='less' scoped>
@import '../index.less';
.table-page-search-wrapper {
  /deep/ .ant-form-inline {
    .ant-form-item {
      &.label-max-left {
        .ant-form-item-label {
          left: -7px;
          width: 110px;
          padding-right: 0;
        }
      }
      &.label-max-left1 {
        .ant-form-item-label {
          left: -7px;
          width: 140px;
          padding-right: 0;
        }
      }
      &.form-flex {
        .ant-form-item-children {
          display: flex;
          .flex-item{
            flex: 1;
          }
          .flex-right{
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
