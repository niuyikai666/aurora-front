<template>
  <a-row>
    <a-col class="lg-24">
      <a-card
        class="card-custom head-mb5"
        style="width:100%"
        :bordered="false"
        :tabList="tabListNoTitle"
        :activeTabKey="type"
        @tabChange="key => handleTabChange(key)"
      >
        <div slot="title">
          埋点管理
        </div>
        <template v-for="li in tabListNoTitle">
          <span :slot="li.key" :key="li.key">{{ li.tabText }}</span>
        </template>
      </a-card>
      <div class="block"></div>
      <module v-if="type === 'module'"/>
      <page v-if="type === 'page'"/>
      <active v-if="type === 'active'"/>
    </a-col>
  </a-row>
</template>

<script>
import module from './components/module'
import page from './components/page'
import active from './components/active'
export default {
  name: 'Buryingpoint',
  components: {
    module,
    page,
    active
  },
  data () {
    return {
      tabListNoTitle: [
        {
          key: 'module',
          tabText: '模块统计',
          scopedSlots: { tab: 'module' }
        },
        {
          key: 'page',
          tabText: '页面统计',
          scopedSlots: { tab: 'page' }
        },
        {
          key: 'active',
          tabText: '活跃统计',
          scopedSlots: { tab: 'active' }
        }
      ],
      type: 'module'
    }
  },
  created () {
  },
  mounted () {
  },
  activated () {
  },
  methods: {
    handleTabChange (key) {
      this.type = key
    }
  },
  watch: {
  },
  computed: {
  }
}
</script>

<style lang="less" scoped>
.block-desc{
  line-height: 44px;
  font-size: 14px;
  background: #f0f2f5;
}
</style>
