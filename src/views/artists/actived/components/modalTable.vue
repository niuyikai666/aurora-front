<template>
  <a-table :bordered="true" :columns="columns" :data-source="data" :pagination="false">
    <template slot="approveEmpName" slot-scope="text, record">
      {{ text }} {{ record.departmentFullName ? `【${record.departmentFullName}】` : '' }}
    </template>
  </a-table>
</template>

<script>
const columns = [{
  dataIndex: 'operationState',
  title: '操作',
  customRender: (text, row, index) => {
    return text.msg
  }
}, {
  dataIndex: 'approveEmpName',
  scopedSlots: { customRender: 'approveEmpName' },
  title: '操作人'
}, {
  dataIndex: 'approveDateTime',
  title: '操作时间'
}]
export default {
  props: {
    data: {
      type: [Array, String, Object],
      default: null
    }
  },
  data () {
    return {
      columns
    }
  },

  components: {},

  mounted () {},

  methods: {}
}

</script>
<style lang='less' scoped>
</style>
