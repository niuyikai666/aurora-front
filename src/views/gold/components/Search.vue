<template>
  <!-- <div class="child">
    <p>我是儿子，父亲对我说： {{ give }}</p>
    <a-button @click="returnBackFn">回应</a-button>
  </div> -->
  <!-- <a-select :default-value="give" style="width: 120px" @change="returnBackFn">
    <a-select-option value="jack">
      Jack
    </a-select-option>
    <a-select-option value="lucy">
      Lucy
    </a-select-option>
    <a-select-option value="Yiminghe">
      yiminghe
    </a-select-option>
  </a-select> -->
  <a-select
    show-search
    :value="value"
    :labelInValue="true"
    :placeholder="placeholder"
    style="width: 200px"
    :default-active-first-option="false"
    :show-arrow="true"
    :filter-option="false"
    :not-found-content="null"
    @search="fetchUser"
    @change="handleChange"
  >
    <a-select-option v-for="d in data" :key="d.value">
      {{ d.text }} ({{ d.department }})
    </a-select-option>
  </a-select>
</template>
<script>
import debounce from 'lodash/debounce'
export default {
  props: {
    value: {
      type: [String, Number, Object],
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    searchFn: {
      type: Function,
      default: null
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
      value.label = value.label.split('(')[0].trim()
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
        name: value
      }).then(res => {
        const data = res.map(user => ({
          text: user.name,
          value: user.id,
          department: user.fullName
        }))
        this.data = data
      })
    }
  }
}
</script>
