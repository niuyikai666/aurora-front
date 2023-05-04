<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <div id="water-copy"></div>
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { mapGetters } from 'vuex'
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'
import { createWatemark } from '@/utils/createWatemark'

export default {
  data () {
    return {

    }
  },
  mounted () {
    this.$nextTick(() => {
      //  水印
      createWatemark({
        text: `${ this.nickname } ${this.mobile ? this.mobile.substring(7, 11) : ''}`,
        selectors: '#water-copy',
        color: 'rgba(144,147,153,0.12)'
      })
    })
  },
  computed: {
    ...mapGetters([
      'nickname',
      'mobile'
    ]),
    locale () {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && (setDocumentTitle(`${i18nRender(title)} - ${domTitle}`))

      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  }
}
</script>

<style lang="less">
  #water-copy {
    position: fixed;
    inset: 0px;
    overflow: hidden;
    width: 100%;
    height: 100vh;
    pointer-events: none;
    z-index: 110;
  }
</style>
