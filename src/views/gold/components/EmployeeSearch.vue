<template>
  <a-select
    allowClear
    show-search
    :value="value ? value : undefined"
    :labelInValue="true"
    :placeholder="placeholder"
    style="width:100%"
    :default-active-first-option="false"
    :show-arrow="true"
    :filter-option="false"
    :not-found-content="fetching ? undefined : null"
    @search="fetchUser"
    @change="handleChange"
  >
    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
    <a-select-option v-for="d in data" :key="d.id">
      {{ d.name }} <span v-if="d.fullName">({{ d.fullName }})</span>
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
    dutyType: {
      type: [String, Number],
      default: undefined
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
  model: {
    prop: 'value',
    event: 'returnBack'
  },
  data () {
    this.fetchUser = debounce(this.fetchUser, 800)
    return {
      data: [],
      fetching: false
    }
  },
  mounted () {
  },
  methods: {
    handleChange (value) {
      // const key = value.key
      // const data = this.data.find(item => {
      //   return item.value === key
      // })
      this.$emit('returnBack', value)
    },
    fetchUser (value) {
      if (value.trim() === '') {
        this.data = []
        return
      }
      this.data = []
      this.fetching = true
      this.searchFn({ name: value, dutyType: this.dutyType }).then(res => {
        if (res.length === 0) {
          this.data = []
        } else {
          const data = res.map(user => ({
            id: user.id,
            name: user.name,
            fullName: user.fullName
          }))
          this.data = data
        }
        this.fetching = false
      })
    }
  }
}
</script>
