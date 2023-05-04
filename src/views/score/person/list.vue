<template>
  <div class="container">
    <a-card
      class="card-title-large min-height"
      title="评委管理"
      :bordered="false"
    >
      <div slot="extra">
        <a-button class="btn" type="primary" icon="plus-circle" @click="showModal">添加</a-button>
      </div>
      <s-table
        ref="table"
        row-key="id"
        :columns="columns"
        :data="getData"
        showPagination="auto"
      >
        <template slot="action" slot-scope="text, record">
          <a-popconfirm overlayClassName="popoer-del" title="确定删除该评委？" ok-text="确定" cancel-text="取消" @confirm="delHandle(record)">
            <a-button type="link">删除</a-button>
          </a-popconfirm>
        </template>
      </s-table>
    </a-card>
    <a-modal
      title="新增评委"
      :width="500"
      :visible="visible"
      :maskClosable="false"
      @cancel="() => visible = false"
    >
      <template slot="footer">
        <a-button key="cancel" @click="visible = false">取 消</a-button>
        <a-button key="create" type="primary" @click="createHandle">确认新增</a-button>
      </template>
      <employee-search
        v-model="emoplyee"
        placeholder="请输入员工工号"
        :searchFn="searchEmployee"
        :value="undefined"
      />
    </a-modal>
  </div>
</template>

<script>
import { STable } from '@/components'
import { personColumns } from '../tableColumns'
import { getPersonList, searchEmployee, delPerson, addPerson } from '@/api/score'
import EmployeeSearch from '../components/EmployeeSearch'
export default {
  components: {
    STable,
    EmployeeSearch
  },
  data () {
    return {
      columns: personColumns,
      searchEmployee: searchEmployee,
      visible: false,
      emoplyee: undefined,
      value: undefined
    }
  },
  mounted () {
  },
  methods: {
    getData (parameter) {
      return getPersonList(parameter).then(res => {
        return res
      })
    },
    createHandle () {
      addPerson({
        employeeId: this.emoplyee.key
      }).then(res => {
        this.$message.success('操作成功')
        this.visible = false
        this.$refs.table.refresh()
      })
    },
    delHandle (record) {
      delPerson({
        id: record.id
      }).then(res => {
        this.$message.success('操作成功')
        this.$refs.table.refresh()
      })
    },
    showModal () {
      this.emoplyee = undefined
      this.value = undefined
      this.visible = true
    }
  }
}
</script>

<style lang="less" scoped>
  .opt-con .btn {
    margin: 0 10px;
  }
</style>
