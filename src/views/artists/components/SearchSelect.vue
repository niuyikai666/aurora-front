<template>
  <div class="select-con">
    <a-select
      class="select"
      show-search
      :value="value"
      :labelInValue="true"
      :placeholder="placeholder"
      style="min-width: 110px; width:100%;"
      :default-active-first-option="false"
      :show-arrow="true"
      :filter-option="false"
      :not-found-content="null"
      @search="fetchUser"
      @change="handleChange"
    >
      <a-select-option v-for="d in data" :key="d.value">
        {{ d.text }}
      </a-select-option>
    </a-select>
    <div class="tags" v-if="tags">
      <span v-for="(item, idx) in tags" :key="idx" @click="tagSelect(item)">{{ item.label }}</span>
    </div>
  </div>
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
    length: {
      type: Number,
      default: 1
    },
    searchFn: {
      type: Function,
      default: null
    },
    tags: {
      type: Array,
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
      data: []
    }
  },
  mounted () {
  },
  methods: {
    handleChange (value) {
      // if (value.length > this.length) {
      //   // 如果标签限制为一个 则替换当前标签
      //   if (this.length === 1) {
      //     value = value.slice(1, this.length + 1)
      //   } else {
      //     value = value.slice(0, this.length)
      //   }
      // }
      value.label = value.label.substr(0, value.label.indexOf('('))
      this.$emit('returnBack', [value])
    },
    tagSelect (value) {
      this.$emit('returnBack', [ value ])
    },
    fetchUser (value) {
      if (value.trim() === '') {
        this.data = []
        return
      }
      this.data = []
      this.fetching = true
      this.searchFn(value).then(res => {
        if (res.length === 0) {
          this.data = []
        } else {
          const data = res.map(user => ({
            text: `${user.name}(${user.departmentName})`,
            value: String(user.id)
          }))
          this.data = data
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .tags {
    padding-top: 6px;
    white-space:nowrap;
    span {
      display: inline-block;
      border: solid 1px #979797;
      font-size: 12px;
      line-height: 1.5;
      padding: 0 5px;
      color: #000;
      border-radius: 2px;
      margin-right: 5px;
      cursor: pointer;
      user-select: none;
    }
  }
  .select {
    /deep/ .ant-select-selection--multiple {
      height: 32px;
      overflow: hidden;
    }
  }
</style>
