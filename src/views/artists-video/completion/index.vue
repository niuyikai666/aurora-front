<template>
  <a-row>
    <a-col class="lg-24">
      <!-- <top-tip :updateTime="updateTime" :permission="permission" /> -->
      <a-card
        class="card-title-large"
        title="主播信息补全"
        :bordered="false"
      >
        <admin ref="admin" :fn="getCompletionList" :type="type" v-if="type === 'admin'"/>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import admin from './components/admin'
import { getCompletionList } from '@/api/artists-video'
import { numberFormat } from '@/utils/util'

export default {
  name: 'ArtistsList',
  components: {
    admin
  },
  data () {
    return {
      advanced: false,
      numberFormat,
      type: 'admin',
      getCompletionList
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
  },
  computed: {
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
