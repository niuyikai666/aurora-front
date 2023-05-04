<template>
  <span class="setting-content">
    <!-- <a-tooltip placement="bottom" :visible="visible" @visibleChange="onVisibleChange">
      <template v-slot:title >
        可以将使用极光中的问题和意见反馈给我们哦～
      </template>
      <svg-icon class="icon icon-tip" icon-class="feedback" @click="clickShowm" />
    </a-tooltip> -->
    <!-- <a-tooltip placement="top">
      <template slot="title">
        <span>帮助中心</span>
      </template>
      <svg-icon class="icon" icon-class="help" style="margin-left:25px;" @click="help" />
    </a-tooltip> -->
    <a-tooltip placement="top">
      <template slot="title">
        <span>服务台</span>
      </template>
      <a href="https://applink.feishu.cn/client/helpdesk/open?id=6862530815533694980&extra=%7B%22channel%22%3A1%2C%22created_at%22%3A1623378313%7D" target="_blank">
        <svg-icon class="icon" icon-class="serve" style="margin-left:25px; font-size:18px;" />
      </a>
    </a-tooltip>

    <a-tooltip v-if="permission.includes('score_list')" placement="top" style="margin-left: 20px;">
      <template slot="title">
        <span>待评分</span>
      </template>
      <a-badge :dot="show">
        <a-icon style="font-size:16px;" type="bell" @click="toScore" />
      </a-badge>
    </a-tooltip>
    <!-- <a-tooltip placement="top">
      <template slot="title">
        <span>管理后台</span>
      </template>
      <a-icon v-if="showSetting" class="icon icon-set" @click="goDashboard" type="setting" />
    </a-tooltip> -->
    <mol ref="mol"></mol>
  </span>
</template>

<script>
import { mapGetters } from 'vuex'
import LogoSvg from '../../assets/logo.svg?inline'
import store from '@/store'
import Mol from './modal/index'
import { hasScore } from '@/api/score'

export default {
  name: 'TopSetting',
  components: {
    LogoSvg,
    Mol
  },
  data () {
    return {
      showSetting: true,
      visible: true,
      show: false
    }
  },
  mounted () {
    const route = store.getters.addRouters[0]
    if (route.name === 'index' && route.children.length <= 0) {
      this.showSetting = false
    }
    if (localStorage.getItem('showtip') === null) {
      this.visible = true
    } else {
      this.visible = false
    }

    if (this.permission.includes('score_list')) {
      this.hasScoreHandle()
    }
  },
  methods: {
    goDashboard () {
      const route = store.getters.addRouters[0]
      if (route.name === 'index' && route.children.length > 0) {
        if (route.children[0] && route.children[0].children && route.children[0].children.length > 0) {
          this.$router.push({ path: route.children[0].children[0].path })
        } else {
          this.$router.push({ path: route.children[0].path })
        }
      } else {
        this.$router.push({ path: '/' })
      }
    },
    help () {
      this.$router.push({ path: '/help' })
    },
    clickShowm () {
      this.$refs.mol.showModal()
    },
    onVisibleChange () {
     this.visible = false
     localStorage.setItem('showtip', false)
    },

    hasScoreHandle () {
      hasScore().then(res => {
        if (res) {
          this.show = true
        }
      })
    },
    toScore () {
      this.$router.push({ path: '/score/marking/list' })
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>
