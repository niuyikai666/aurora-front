<template>
  <div :class="wrpCls">
    <div class="top-right-content">
      <a-row>
        <a-col :xs="12" :md="17" :lg="20">
          <div class="router-path" :class="{'collape': isCollaped}">
            <page-header-wrapper />
          </div>
        </a-col>
        <a-col :xs="12" :md="7" :lg="4">
          <div class="top-right">
            <setting />
            <avatar-dropdown :menu="showMenu" :current-user="nickname" :avatar="avatar" :class="prefixCls" />
            <!-- <select-lang :class="prefixCls" /> -->
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AvatarDropdown from './AvatarDropdown'
import Setting from './Setting'
import Logo from './Logo'
import TopMenu from './TopMenu'
import SelectLang from '@/components/SelectLang'

export default {
  name: 'RightContent',
  components: {
    Logo,
    TopMenu,
    AvatarDropdown,
    SelectLang,
    Setting
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    },
    isCollaped: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showMenu: true
    }
  },
  computed: {
    ...mapGetters([
      'nickname',
      'avatar'
    ]),
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
  .top-right-content {
    padding-right: 8px;
  }
  .top-right {
    text-align: right !important;
  }
  .router-path {
    padding-left: 224px;
    padding-top: 20px;
    transition: all .2s ease;
    &.collape {
      padding-left: 104px;
    }
  }
</style>
