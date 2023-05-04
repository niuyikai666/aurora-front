<template>
  <div>
    <div class="opt-con">
      <span class="flex1">
        <a-month-picker
          v-model="queryParams.date"
          value-format="YYYY-MM"
          @change="onChange"
        />
      </span>
      <a-button
        v-if="permission.includes('outer_task_skip_month_role_add')"
        class="mr10"
        type="primary"
        @click="handleCreate"
      >
        新增
      </a-button>
      <a-button
        v-if="permission.includes('outer_task_skip_month_role_del')"
        type="primary"
        :disabled="!hasSelected"
        @click="handleDelete()"
      >
        批量删除
      </a-button>
    </div>
    <div>
      <s-table
        style="margin-top:24px;"
        ref="table"
        row-key="id"
        :columns="columnsOuter"
        :data="getData"
        :row-selection="rowSelection"
      ></s-table>
      <modify-outer-dialog
        :visible="visibleOuter"
        @cancel="handleCancel"
        @success="handleSuccess"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { STable } from '@/components'
import { columnsOuter } from '../columns'
import { ruleOuterList, ruleOuterDelete } from '@/api/task-anchor'
import ModifyOuterDialog from './ModifyOuterDialog'

export default {
  name: 'Outer',
  components: {
    STable,
    ModifyOuterDialog
  },
  data() {
    return {
      columnsOuter,
      queryParams: {
        date: moment().format('YYYY-MM')
      },
      visibleOuter: false,

      selectedRowKeys: []
    }
  },
  mounted() {},
  methods: {
    getData(parameter) {
      const requestParameters = Object.assign({}, parameter, this.queryParams)
      return ruleOuterList(requestParameters).then((res) => {
        return res
      })
    },
    onChange() {
      this.$refs.table.refresh(true)
    },

    handleCreate() {
      this.visibleOuter = true
    },

    handleDelete() {
      this.$confirm({
        title: '提示',
        content: `确定要删除吗?`,
        onOk: () => {
          ruleOuterDelete({
            id: this.selectedRowKeys
          }).then(() => {
            this.$message.success('操作成功')
            this.$refs.table.refresh(true)
          })
        },
        onCancel() {
          // console.log('Cancel')
        }
      })
    },

    propReset() {
      this.visibleOuter = false
    },
    handleSuccess() {
      this.propReset()
      this.$refs.table.refresh(true)
    },
    handleCancel() {
      this.propReset()
    }
  },
  computed: {
    ...mapGetters(['permission']),
    hasSelected() {
      return this.selectedRowKeys.length > 0
    },
    rowSelection() {
      const self = this
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          self.selectedRowKeys = selectedRowKeys
        }
        // getCheckboxProps: record => ({
        //   props: {
        //     disabled: record.auditStatus === 1 || record.auditStatus === 2
        //   }
        // })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.opt-con {
  display: flex;
  .flex1 {
    flex: 1;
  }
}
</style>
