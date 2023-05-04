<template>
  <div>
    <page-list :extraColumns="extraColumns" />
  </div>
</template>

<script>
import PageList from '../components/PageList'

export default {
  name: 'TaskBackstage',
  components: {
    PageList
  },
  data () {
    return {
      extraColumns: [
        {
          title: '小组',
          dataIndex: 'groupName'
        },
        {
          title: '分公司',
          dataIndex: 'companyName'
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
</style>
