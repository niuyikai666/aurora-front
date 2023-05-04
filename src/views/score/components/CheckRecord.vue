<template>
  <a-modal
    class="modal"
    title="操作日志"
    :width="800"
    :visible="visible"
    @cancel="onClose"
  >
    <template slot="footer">
      <a-button type="primary" @click="onClose()">关闭</a-button>
    </template>
    <a-table
      class="table-min"
      :row-key="(record, index) => index"
      :columns="columns"
      :data-source="dataSource"
      :loading="loading"
      bordered
      :pagination="false"
    >
      <template slot="opsMsg" slot-scope="text">
        <ellipsis :length="30" tooltip>{{ text }}</ellipsis>
      </template>
    </a-table>
  </a-modal>
</template>

<script>
import { Ellipsis } from '@/components'
import TabContent from '@/components/TabContent'
import { getLogsById } from '@/api/logs'

const columns = [
  {
    title: '操作',
    dataIndex: 'successDetail'
  },
  {
    title: '操作人',
    dataIndex: 'detail'
  },
  {
    title: '操作时间',
    dataIndex: 'createTime'
  }
]
export default {
  name: 'LogComp',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: null
    }
  },
  components: {
    TabContent,
    Ellipsis
  },
  data () {
    return {
      dataSource: [],
      loading: true,
      columns
    }
  },
  async mounted () {
  },
  methods: {
    onClose () {
      this.$emit('cancel')
      this.dataSource = []
      this.loading = true
    },
    handleGetLog () {
      getLogsById({
        id: this.id,
        page: 1,
        size: 100
      }).then(res => {
        console.log(res)
        this.loading = false
        this.dataSource = res.list
      })
    }
  },
  watch: {
    visible (val) {
      if (val) {
        this.handleGetLog()
      }
    }
  }
}
</script>
