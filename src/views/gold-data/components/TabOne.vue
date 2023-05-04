<template>
  <div style="min-height:600px">
    <a-spin :spinning="loading">
      <artist-info v-if="sensitive == 1" :info="data"/>
      <artist-info-edit v-if="sensitive == 2" :res="data"/>
    </a-spin>
  </div>
</template>

<script>
import { getArtisInfo } from '@/api/goldData'
import ArtistInfo from './ArtistInfo'
import ArtistInfoEdit from './ArtistInfoEdit'
export default {
  name: 'TabOne',
  components: {
    ArtistInfo,
    ArtistInfoEdit
  },
  data () {
    return {
      sensitive: '',
      data: {},
      loading: true
    }
  },
  created () {
    getArtisInfo({ influencerId: this.$route.query.id }).then(res => {
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
