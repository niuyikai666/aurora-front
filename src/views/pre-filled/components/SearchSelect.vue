<template>
  <a-select
    placeholder="请选择公会经纪人"
    show-search
    :value="value"
    :labelInValue="true"
    style="width:100%"
    :default-active-first-option="false"
    :not-found-content="fetching ? undefined : null"
    :show-arrow="true"
    :filter-option="false"
    @search="fetchUser"
    @change="handleChange"
  >
    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
    <a-select-option v-for="li in data" :key="li.value" class="select-wraper">
      <div class="clearfix" style="width:100%">
        <img :src="li.avatar" alt="" class="fl avatar">
        <div class="fl info-wraper">
          <p class="name ellipsis" :title="li.text">{{ li.text }}</p>
          <p class="no ellipsis" :title="li.nid">{{ li.nid }}</p>
        </div>
      </div>
    </a-select-option>
  </a-select>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  props: {
    value: {
      type: [String, Number, Object, Array],
      default: undefined
    },
    placeholder: {
      type: String,
      default: ''
    },
    searchFn: {
      type: Function,
      default: null
    },
    width: {
      type: Number,
      default: 200
    }
  },
  model: {
    prop: 'value',
    event: 'returnBack'
  },
  data () {
    this.fetchUser = debounce(this.fetchUser, 200)
    return {
      data: [],
      fetching: false
    }
  },
  mounted () {
  },
  methods: {
    handleChange (value) {
      this.$emit('returnBack', value)
      this.$emit('updateInfluencer')
    },
    fetchUser (value) {
      if (value.trim() === '') {
        this.data = []
        return
      }
      this.data = []
      this.fetching = true
      this.searchFn({
        kw: value
      }).then(res => {
        if (res.length === 0) {
          this.data = []
        } else {
          const data = res.map(user => ({
            text: `${user.name}(${user.fullName})`,
            id: user.id
          }))
          this.data = data
        }
        this.fetching = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.select-wraper{
  /deep/ .avatar{
    width:50px;
    height:50px;
    border-radius:50%;
    margin-right: 10px;
    margin-top: 0;
  }
  /deep/ .info-wraper{
    width: calc(100% - 60px);
  }
  /deep/ .name{
    line-height:30px;
    font-size:14px;
    margin:0;
    width: 100%;
  }
  /deep/ .no{
    display: block;
    line-height:20px;
    font-size:12px;
    color:#ccc;
    width: 100%;
  }
}
/deep/ .avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-top: 5px;
  margin-right: 5px;
}
/deep/ .name{
  margin-bottom: 0;
}
/deep/ .info-wraper{
  width: calc(100% - 30px);
}
/deep/ .no{
  display: none;
}
</style>
