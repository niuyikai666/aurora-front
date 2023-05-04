<template>
  <!-- <a-select
    show-search
    :value="value"
    :labelInValue="true"
    :placeholder="placeholder"
    style="width:100%;min-width:100px"
    :default-active-first-option="false"
    :show-arrow="true"
    :filter-option="false"
    :not-found-content="null"
    @search="fetchUser"
    @change="handleChange"
  >
    <a-select-option v-for="d in data" :key="d.value">
      <span :title="d.text">{{ d.text }}</span>
    </a-select-option>
  </a-select> -->
  <a-auto-complete
    :value="value"
    :data-source="data"
    placeholder="请输入"
    @search="fetchUser"
    @change="handleChange"
  />
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
  data () {
    this.fetchUser = debounce(this.fetchUser, 800)
    return {
      data: []
    }
  },
  mounted () {
  },
  methods: {
    handleChange (value) {
      console.log(value)
      this.$emit('change', value)
    },
    fetchUser (value) {
      if (value.trim() === '') {
        this.data = []
        return
      }
      this.data = []
      this.fetching = true
      this.searchFn({
        searchName: value
      }).then(res => {
        if (res.length === 0) {
          this.data = []
        } else {
          const data = res
          this.data = data
        }
      })
    }
  }
}
</script>
