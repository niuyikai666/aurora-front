<template>
  <div style="min-height:600px">
    <a-spin :spinning="loading">
      <media-info v-if="sensitive == 1" :info="data"/>
      <media-info-edit v-if="sensitive == 2" :res="data"/>
    </a-spin>
  </div>
</template>

<script>
import { getMediaInfo } from '@/api/goldData'
import MediaInfo from './MediaInfo'
import MediaInfoEdit from './MediaInfoEdit'
export default {
  name: 'TabTwo',
  components: {
    MediaInfo,
    MediaInfoEdit
  },
  data () {
    return {
      sensitive: true,
      data: {
      },
      loading: true
    }
  },
  created () {
    getMediaInfo({ influencerId: this.$route.query.id }).then(res => {
      this.data = res
      if (res.sensitive) {
        this.sensitive = 1
      } else {
        this.sensitive = 2
      }
      this.loading = false
    })
  },
  mounted () {},
  methods: { }
}

</script>

<style lang="less" scoped>
</style>
