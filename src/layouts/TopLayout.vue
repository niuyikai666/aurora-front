<template>
  <div id="topLayout" :class="['user-layout-wrapper', isMobile && 'mobile']">
    <div class="ant-layout-header" style="padding: 0px; width: 100%; z-index: 9;">
      <div class="ant-pro-global-header">
        <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
      </div>
    </div>
    <div class="top-layout-content">
      <router-view />
      <div class="footer">
        <div class="exp">
          <span>数据来源: 直播开放平台-主播列表、直播数据下载数据</span>
          <!-- <span>数据更新时间: 次日下午更新昨日数据 </span> -->
          <span>注意：数据仅用于业务分析</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deviceMixin } from '@/store/device-mixin'
// import { updateTheme } from '@ant-design-vue/pro-layout'
import { updateTheme } from '@/components/SettingDrawer/settingConfig'
import defaultSettings from '@/config/defaultSettings'
import RightContent from '@/components/GlobalHeader/RightContent'

export default {
  name: 'TopLayout',
  components: {
    RightContent
  },
  mixins: [deviceMixin],
  data () {
    return {
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // 定宽: true / 流式: false
        contentWidth: defaultSettings.layout === 'sidemenu' ? false : defaultSettings.contentWidth === 'Fixed',
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        hideHintAlert: false,
        hideCopyButton: false
      },
      // 媒体查询
      query: {}
    }
  },
  created () {
  },
  mounted () {
    document.body.classList.add('TopLayout')
    updateTheme(this.settings.primaryColor)
  },
  beforeDestroy () {
    document.body.classList.remove('TopLayout')
  }
}
</script>

<style lang="less" scoped>
  #topLayout {
    min-height: 100vh;
    background-color: #f0f2f5;
  }
  .top-layout-content {
    position: relative;
    padding: 24px;
    padding-top: 88px;
    background-color: #f0f2f5;
  }
  .footer {
    padding: 24px 0 0 0;
    .exp {
      line-height: 1.1;
    }
  }
</style>
