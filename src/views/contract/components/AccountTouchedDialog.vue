<template>
  <a-modal
    title="已关联账号"
    :width="800"
    :visible="visible"
    :footer="false"
    @cancel="() => $emit('cancel')"
  >
    <template slot="footer">
      <!-- <a-button key="cancel" @click="cancelHandle">取 消</a-button> -->
      <!-- <a-button key="create" type="primary" @click="cancelHandle">关闭</a-button> -->
    </template>
    <a-table
      ref="table"
      row-key="id"
      :columns="columns"
      :dataSource="dataSource"
      :pagination="false"
    >
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="deleteHandle(record.contractRelationId)">删除</a-button>
      </span>
    </a-table>
  </a-modal>
</template>

<script>
import { getContractAccountList, deletContractAccount } from '@/api/contract'

const columns = [
  {
    title: '昵称',
    dataIndex: 'nickName'
  },
  {
    title: '账号',
    dataIndex: 'account'
  },
  {
    title: '直播平台',
    dataIndex: 'platform',
    customRender: (text, row, index) => {
      return text.msg
    }
  },
  {
    title: '是否关联',
    dataIndex: 'isBindTiktok',
    customRender: (text, row, index) => {
      return text ? '是' : '否'
    }
  },
  {
    title: '招募',
    dataIndex: 'recruitName'
  },
  {
    title: '运营',
    dataIndex: 'operatorName'
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 80,
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    contractId: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      columns,
      pagination: {
        pageSize: 5
      },
      dataSource: []
    }
  },
  mounted () {
    this.getDataHandle()
  },
  methods: {
    getDataHandle () {
      getContractAccountList(this.contractId).then(res => {
        this.dataSource = res
      })
    },
    cancelHandle () {
      this.$emit('cancel')
    },
    createHandle () {
      this.$emit('create')
    },
    deleteHandle (id) {
      this.$confirm({
        title: '提示',
        content: `确定要删除吗?`,
        onOk: () => {
          this.deleteDo(id)
        },
        onCancel () {
        }
      })
    },
    deleteDo (id) {
      deletContractAccount(id).then(() => {
        this.$message.success('删除成功')
        this.getDataHandle()
      })
    }
  }
}
</script>
