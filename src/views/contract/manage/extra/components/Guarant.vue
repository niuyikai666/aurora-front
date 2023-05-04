<template>
  <div>
    <a-row :gutter="12">
      <a-col :md="24">
        <teed
          v-for="(item, index) in data"
          :key="index"
          :data="item"
          :index="index"
          :disable="disable"
          @delete="deleteHandle"
        />
      </a-col>
      <a-col v-if="!disable" :md="8">
        <a-button v-if="data.length < 3" type="dashed" style="width: 100%;margin-bottom:24px;" @click="addHandle">
          <a-icon type="plus" />
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import Teed from './Teed.vue'

export default {
  name: 'Guarant',
  components: {
    Teed
  },
  props: {
    data: {
      type: Array,
      default: null
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    addHandle () {
      this.$emit('add')
    },
    deleteHandle (index) {
      this.$emit('delete', index)
    }
  }
}
</script>

<style lang="less" scoped>
  .form-item-con {
    padding-right: 10%;
    .ant-form-item {
      margin-bottom: 8px;
    }
  }
  .tree-content {
    height: 300px;
    overflow-y: scroll;
    /deep/ .ant-tree li span.ant-tree-checkbox {
      margin-top: 3px;
    }
  }
  .radio-content {
    margin: 0 0 18px 16px;
    .ant-radio-group {
      .ant-radio-button-wrapper {
        margin-right: 12px;
      }
    }
  }
  .pri-content {
    span {
      color: #755DD7;
    }
    .pri-btn {
      cursor: pointer;
    }
  }
</style>
