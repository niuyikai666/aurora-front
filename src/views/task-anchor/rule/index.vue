<template>
  <div>
    <a-result
      v-if="!hasAuth"
      status="404"
      title="405"
      sub-title="抱歉！您未给该页面分配权限"
      style="margin-top: 50px"
    ></a-result>
    <a-card
      v-if="hasAuth"
      :bordered="false"
      :tab-list="tabListRule"
      :active-tab-key="activeKey"
      @tabChange="onTabChange"
    >
      <outer />
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { tabListRule } from '../tab'
import Outer from './components/Outer'

export default {
  name: 'TaskRule',
  components: {
    Outer
  },
  data() {
    return {
      hasAuth: true,
      tabListRule,
      activeKey: 'outer'
    }
  },
  mounted() {
    this.generateTabsHandle()
  },
  methods: {
    generateTabsHandle() {
      const tabArr = tabListRule.filter((item) =>
        this.permission.includes(item.permissionCode)
      )
      if (tabArr.length <= 0) {
        this.hasAuth = false
      } else {
        this.tabListRule = tabArr
        this.activeKey = tabArr[0].key
      }
    },
    onTabChange(key) {
      this.activeKey = key
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
