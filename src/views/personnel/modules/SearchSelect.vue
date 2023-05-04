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
    mode="multiple"
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
    },
    maxLength: { // 控制最多输入个数 默认4
      type: Number,
      default: 4
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
      if (value.length > this.maxLength) {
        value = value.slice(0, this.maxLength)
      }
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
        if (res.length === 0) {
          this.data = []
        } else {
          const data = res.map(item => ({
            text: item.fullName,
            value: item.departmentId
          }))
          this.data = data
        }
      })
    }
  }
}
</script>
