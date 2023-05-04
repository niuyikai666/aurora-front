<template>
  <div>
    <div class="clearfix" style="text-align:right;margin-bottom: 12px;">
      <a-button type="primary" class="mr12" @click="handleCreate" :disabled="!edit">新增区间</a-button>
      <a-button type="primary" @click="handlePush()" :loading="loading">应用规则</a-button>
    </div>
    <a-table
      class="my-table"
      ref="table"
      :row-key="(record, index) => index"
      :columns="columns"
      :dataSource="tableData"
    >
      <template slot="isRatio">
        <div class="tip-icon-con">
          <a-popover placement="topRight">
            <template slot="content">
              <div class="index-crip-content">
                <dl>
                  <dd>是：按照上月流水及比例进行计算</dd>
                  <dd>否：按照固定金额计算</dd>
                </dl>
              </div>
            </template>
            是否比例计算 <a-icon type="question-circle" />
          </a-popover>
        </div>
      </template>
      <template slot="zone" slot-scope="text, record">
        {{ amountFormat(record.minNum, false) }} - {{ amountFormat(record.maxNum, false) }}
      </template>
      <template slot="action" slot-scope="text, record">
        <a-button type="link" @click="handleEdit(record.id, record.groupCode)" :disabled="!edit">编辑</a-button>
      </template>
    </a-table>
    <rule-dialog
      :visible="visibleRule"
      :groupCode="groupCode"
      :id="recordId"
      @cancel="handleCancel"
      @success="handleSuccess"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { columnsRule } from '../columns'
import { groupRuleList, groupRulePush } from '@/api/task'
import { amountFormat } from '@/utils/util'
import RuleDialog from './RuleDialog'

export default {
  name: 'ToalCompOperate',
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  components: {
    RuleDialog
  },
  data () {
    return {
      amountFormat,
      columns: columnsRule,
      tableData: [],
      visibleRule: false,
      groupCode: null,
      recordId: null,
      currMoth: moment().format('YYYY-MM'),
      edit: true,
      loading: false
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    handlePush () {
      this.loading = true
      groupRulePush({
        monthCycle: this.params.monthCycle
      }).then(() => {
        this.$message.success('应用成功')
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    getData () {
      groupRuleList(this.params.monthCycle).then(res => {
        this.tableData = res
      })
    },
    handleCreate () {
      this.visibleRule = true
    },
    handleEdit (id, code) {
      this.recordId = id
      this.groupCode = code
      this.visibleRule = true
    },
    opsReset () {
      this.visibleRule = false
      this.groupCode = this.recordId = null
    },
    handleSuccess () {
      this.opsReset()
      this.getData()
    },
    handleCancel () {
      this.opsReset()
    }
  },
  watch: {
    params: {
      handler (val) {
        if (val.monthCycle === this.currMoth) {
          this.edit = true
        } else {
          this.edit = false
        }
        this.getData()
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
</style>
