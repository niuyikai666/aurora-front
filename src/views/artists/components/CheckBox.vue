<template>
  <div class="check-content">
    <h3 class="title">指标汇总<span>（最多可选两项对比）</span></h3>
    <a-checkbox-group
      class="check-group"
      v-model="checkedList"
      @change="onChange"
    >
      <a-row>
        <a-col v-if="checkData && checkData.length > 0" v-for="(item, index) in checkData" :key="index" :span="12">
          <a-checkbox :value="item.id">
            {{ item.name }}
          </a-checkbox>
        </a-col>
      </a-row>
    </a-checkbox-group>
  </div>
</template>

<script>

export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      checkData: [],
      checkedList: []
    }
  },
  methods: {
    onChange (checkedValues) {
      const checklist = this.checkedList
      if (checklist.length < 2) {
      }
      if (checklist.length > 2) {
        this.checkedList = checklist.slice(1, 3)
      }
    }
  },
  watch: {
    checkedList (val) {
      this.$emit('checked', val)
    },
    data (val) {
      if (val && val.length < 0) return
      const map = val.map(item => {
        return {
          id: item.name,
          name: item.value
        }
      })
      this.checkData = map
      this.checkedList = [this.checkData[0].id, this.checkData[1].id]
      // this.checkedListCopy = this.checkedList
    }
  }
}
</script>

<style lang="less" scoped>
@import "~ant-design-vue/es/style/themes/default.less";
  .check-content {
    .title {
      font-size: 14px;
      font-weight: 700;
      color: rgba(0,0,0,.85);
      span {
        font-size: 12px;
        color: rgba(0,0,0,.65);
        font-weight: normal;
      }
    }
    .check-group {
      width: 100%;
      margin-top: 16px;
      .ant-col {
        margin-bottom: 8px;
      }
    }
  }
</style>
