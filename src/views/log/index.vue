<template>
  <page-header-wrapper class="container">
    <template v-slot:content>
      管理员在管理后台的操作事件记录
    </template>
    <div class="content">
      <s-table
        row-key="id"
        :columns="columns"
        :data="getLogsHandle"
        showPagination="auto"
      >
        <span slot="modifyContent" slot-scope="text">
          <ellipsis :length="20" tooltip>{{ text.modifyContent }}</ellipsis>
        </span>
      </s-table>
    </div>
  </page-header-wrapper>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { getLogs } from '@/api/logs'

const columns = [
  {
    title: '事件类型',
    dataIndex: 'type'
  },
  {
    title: '事件详情',
    scopedSlots: { customRender: 'modifyContent' }
  },
  {
    title: '操作人',
    dataIndex: 'operatorName'
  },
  {
    title: '日期',
    dataIndex: 'operateTime'
  },
  {
    title: 'IP',
    dataIndex: 'ipAddress'
  }
]

export default {
  name: 'Log',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      columns: columns,
      visible: false,
      superId: 0
    }
  },
  mounted () {
    this.getLogsHandle()
  },
  methods: {
    getLogsHandle (parameter) {
      return getLogs(parameter).then(res => {
        return res
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .container {
    /deep/ .ant-pro-page-header-wrap-page-header-warp {
      .ant-breadcrumb {
        display: none;
      }
    }
  }
</style>
