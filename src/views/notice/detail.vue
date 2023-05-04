<template>
  <div class="container">
    <a-card
      style="min-height:82vh;"
      class="card-title-large"
      title="公告详情"
      :bordered="false"
    >
      <dl class="crip-con">
        <dt>{{ detail.title }}</dt>
        <dd>{{ detail.content }}</dd>
      </dl>
    </a-card>
  </div>
</template>

<script>
import { getTaskRecent } from '@/api/notice'

export default {
  name: 'NoticeDetail',
  data () {
    return {
      detail: Object
    }
  },
  mounted () {
    this.getTaskRecentHandle()
  },
  methods: {
    getTaskRecentHandle () {
      getTaskRecent(this.$route.query.id).then(res => {
        this.detail = res
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .crip-con {
    dt {
      font-size: 18px;
    }
    dd {
      margin-top: 10px;
    }
  }
</style>
