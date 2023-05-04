<template>
  <a-row>
    <a-col class="lg-24">
      <a-card
        class="card-title-large"
        title="关系修改记录"
        :bordered="false"
      >
        <record-list ref="admin" :fn="getRelationLogsList"/>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import recordList from './components/recordList'
import { getRelationLogsList } from '@/api/artists-video'
import { numberFormat } from '@/utils/util'

export default {
  name: 'ArtistsList',
  components: {
    recordList
  },
  data () {
    return {
      advanced: false,
      numberFormat,
      getRelationLogsList
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
