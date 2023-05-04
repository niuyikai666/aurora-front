<template>
  <a-drawer
    class="drawer"
    title="修改角色"
    :width="448"
    :visible="visible"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <div class="role-content">
      <s-table
        ref="table"
        row-key="id"
        :columns="columns"
        :rowSelection="rowSelection"
        :data="roleDataHandle"
        :pageSize="50"
      >
      </s-table>
    </div>
    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button class="disable" type="primary" @click="$emit('cancel')" style="margin-right:16px;">取消</a-button>
      <a-button key="create" type="primary" @click="confirmHandle">确认</a-button>
    </div>
  </a-drawer>
</template>

<script>
import { getRoles } from '@/api/system'
import { STable } from '@/components'

const columns = [
  {
    title: '',
    dataIndex: 'check',
    scopedSlots: { customRender: 'check' },
    width: 100
  },
  // {
  //   title: '角色ID',
  //   dataIndex: 'id'
  // },
  {
    title: '角色名称',
    dataIndex: 'name'
  }
]

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    roleIds: {
      type: Array,
      default: null
    }
  },
  components: {
    STable
  },
  data () {
    return {
      columns,
      selectedRowKeys: []
    }
  },

  methods: {
    onClose () {
      this.selectedRowKeys = []
      this.$emit('cancel')
    },
    roleDataHandle (parameter) {
      const requestParameters = Object.assign({}, parameter, {})
      return getRoles(requestParameters).then(res => {
        return res
      })
    },

    confirmHandle () {
      if (this.selectedRowKeys.length <= 0) {
        this.$message.error('请选择角色')
        return
      }
      this.$emit('confirm', this.selectedRowKeys)
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.selectedRowKeys = this.roleIds || []
      }
    }
  },
  computed: {
    rowSelection () {
      const self = this
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
          self.selectedRowKeys = selectedRowKeys
        },
        getCheckboxProps: record => ({
          props: {
            disabled: !record.enabled
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .modal {
    /deep/ .ant-modal-body {
      padding: 0;
    }
    /deep/ .ant-card-head {
      border-bottom: 0;
      .ant-tabs-bar {
        border-bottom: 0;
      }
    }
    .tab-content {
      margin-top: 10px;
      padding-bottom: 10px;
      /deep/ h1 {
        margin-bottom: 5px;
      }
    }
    .item-content {
      padding: 0 25px;
      .check-box {
        margin-right: 5px;
      }
    }
    .item-child {
      margin-top: 15px;
    }
  }
  .role-content {
    max-height: 84vh;
    overflow-y: scroll;
  }
</style>
