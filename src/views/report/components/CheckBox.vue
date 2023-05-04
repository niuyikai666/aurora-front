<template>
  <div class="check-content">
    <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
      全部
    </a-checkbox>
    <a-checkbox-group v-model="checkedList" :options="plainOptions" @change="onChange" />
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
      checkedList: [],
      plainOptions: [],
      indeterminate: false,
      checkAll: true
    }
  },
  mounted () {
  },
  methods: {
    onChange (checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.plainOptions.length
      this.checkAll = checkedList.length === this.plainOptions.length
    },
    onCheckAllChange (e) {
      Object.assign(this, {
        checkedList: e.target.checked ? this.plainOptions : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
    }
  },
  watch: {
    checkedList (list) {
      const arr = []
      list.map(item => {
        this.data.map(it => {
          if (item === it.value) {
            arr.push(it.name)
          }
        })
      })
      this.$emit('checked', arr)
    },
    data (data) {
      data.map(item => {
        this.plainOptions.push(item.value)
      })
      this.checkedList = this.plainOptions
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
      .ant-col {
        margin-bottom: 8px;
      }
    }
  }
</style>
