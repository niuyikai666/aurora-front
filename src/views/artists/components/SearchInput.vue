<template>
  <div class="select-con">
    <a-input
      style="min-width: 110px; width:100%;"
      v-model="inputVal"
      placeholder="请输入"
      @change="changeHandle"
    />
    <div class="tags" v-if="tags">
      <span v-for="(item, idx) in tags" :key="idx" @click="tagSelect(item)">{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
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
    return {
      inputVal: ''
    }
  },
  mounted () {
    this.inputVal = this.value
  },
  methods: {
    changeHandle () {
      this.$emit('returnBack', this.inputVal)
    },
    tagSelect (value) {
      this.inputVal = value
      this.$emit('returnBack', this.inputVal)
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
</style>
