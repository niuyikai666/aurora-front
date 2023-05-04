<template>
  <a-select
    class="asdf1"
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
      <div :title="`${d.text}(${d.no})${d.full}`">
        <span>{{ d.text }}</span>
        <span class="no">({{ d.no }})</span>
        <span class="full">{{ d.full }}</span>
        <!-- <span :title="d.text">{{ `${d.text}(${d.no})${d.full}` }}</span> -->
      </div>
    </a-select-option>
  </a-select>
</template>
<script>
import { artistSearch } from '@/api/gold'
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
    params: {
      type: Object,
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
      value.label = this.data.find(item => item.value === value.key).text
      this.$emit('change', value)
    },
    fetchUser (value) {
      if (value.trim() === '') {
        this.data = []
        return
      }
      this.data = []
      this.fetching = true
      const params = this.params || {}
      artistSearch({ // dutyType为1时是搜索范围内的运营，不传时，搜索全部员工
        name: value,
        ...params
      }).then(res => {
        if (res.length === 0) {
          this.data = []
        } else {
          const data = res.map(item => ({
            text: item.name,
            value: item.id,
            full: item.fullName,
            no: item.employeeNo
          }))
          this.data = data
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.asdf1 {
  /deep/ .ant-select-selection-selected-value {
    .no, .full{
      display: none;
    }
  }
}
</style>
