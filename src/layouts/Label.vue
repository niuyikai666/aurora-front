<template>
  <div class="label-wraper">
    <a-tag
      style="margin-bottom:6px"
      v-for="(li, index) in labelList"
      :closable="closable(li)"
      :key="index"
      :data-id="index"
      @click="toLink(li)"
      :color="dealColor(li)"
      @close="close($event, index)">{{ li.name }}</a-tag>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      labelList: []
    }
  },

  components: {},
  created () {
  },
  mounted () {
    // console.log(this.addRouters)
  },

  methods: {
    queryHandle (path, query) {
      let queryString = ''
      for (const key in query) {
        if (query[key]) {
          queryString = queryString ? `${queryString}&${key}=${query[key]}` : `?${key}=${query[key]}`
        }
      }
      return path + queryString
    },
    toLink (value) {
      // if (this.queryHandle(value.path, value.query) === this.queryHandle(this.$route.path, this.$route.query)) return
      this.$router.push({
        path: value.path,
        query: {
          ...value.query
        }
      })
    },
    close (e, index) {
      e.preventDefault()
      this.labelList.splice(index, 1)
    },
    dealColor (value) {
      if (value.path === this.$route.path) {
        return '#755dd7'
      }
      return ''
    },
    closable (value) {
      if (value.path === this.$route.path) {
        return false
      }
      return true
    }
  },
  watch: {
    $route: {
      handler (value) {
        value = { ...value }
        if (this.labelList.some(it => it.path === value.path)) {
          this.labelList.find(it => it.path === value.path).query = {
            ...value.query
          }
          return
        }
        this.labelList.push({
          name: value.meta.parentTitle + '-' + value.meta.title,
          path: value.path,
          query: {
            ...value.query
          }
        })
        if (this.labelList.length > 10) {
          this.labelList.splice(0, 1)
        }
      },
      immediate: true
    }
  },
  computed: {
    ...mapGetters([
      'addRouters'
    ])
  }
}

</script>
<style lang='less' scoped>
.label-wraper{
  margin-bottom: 5px;
  /deep/ .ant-tag{
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
