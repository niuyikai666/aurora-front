<template>
  <div class="select-con">
    <a-select
      style="min-width: 120px; width:100%;"
      v-model="inputVal"
      placeholder="请选择"
      @change="handleChange"
    >
      <a-select-option v-for="(item, index) in companyList" :key="index" :value="item.id">
        {{ item.name }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    companyList: {
      type: Array,
      default: null
    }
  },
  model: {
    prop: 'value',
    event: 'returnBack'
  },
  data () {
    return {
      inputVal: ''
    }
  },
  mounted () {
    this.inputVal = this.value
  },
  methods: {
    handleChange (value) {
      this.$emit('returnBack', value)
    }
  }
}
</script>

<style lang="less" scoped>
  .tags {
    padding-top: 6px;
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
    }
  }
</style>
