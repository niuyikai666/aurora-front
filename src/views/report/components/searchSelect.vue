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
    allow-clear
    show-search
    :value="value"
    mode="multiple"
    :labelInValue="true"
    :placeholder="placeholder"
    :default-active-first-option="false"
    :show-arrow="true"
    :filter-option="false"
    :not-found-content="fetching ? undefined : null"
    @search="fetchUser"
    @change="handleChange"
  >
    <a-spin v-if="fetching" slot="notFoundContent" size="small" />
    <a-select-option v-for="d in data" :key="d.value">
      {{ d.text }}
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
    type: {
      type: String,
      default: null
    },
    idKey: {
      type: String,
      default: null
    },
    nameKey: {
      type: String,
      default: null
    },
    departmentId: {
      type: [Number, String],
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
      this.$emit('returnBack', value)
      // value.label = value.label.split('(')[0].trim()
      // this.$emit('change', value)
    },
    fetchUser (value) {
      if (value.trim() === '') {
        this.data = []
        return
      }
      this.data = []
      this.fetching = true
      this.searchFn({
        type: this.type,
        departmentId: this.departmentId,
        searchName: value
      }).then(res => {
        if (res.length === 0) {
          this.data = []
        } else {
          const data = res.map(user => ({
            text: user[this.nameKey],
            value: String(user[this.idKey])
          }))
          this.data = data
        }
        this.fetching = false
      })
    }
  }
}
</script>
