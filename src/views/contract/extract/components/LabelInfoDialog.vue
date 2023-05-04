<template>
  <a-modal
    title="选择调取内容"
    :width="850"
    :visible="visible"
    @cancel="() => $emit('cancel')"
  >
    <template slot="footer">
      <a-button key="cancel" @click="cancelHandle">取 消</a-button>
      <a-button key="create" type="primary" @click="confirmHandle">确定</a-button>
    </template>
    <div>
      <main-info v-if="mainData.length > 0" v-for="item in mainData" :key="item.contractType" :dataSource="item" />
      <extra-info v-if="agreeData.length > 0" v-for="(item, index) in agreeData" :key="index" :dataSource="item" />
    </div>
  </a-modal>
</template>

<script>
import ExtraInfo from './ExtraInfo'
import MainInfo from './MainInfo'

export default {
  components: {
    MainInfo,
    ExtraInfo
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    checkData: {
      type: Array,
      default: () => { return [] }
    }
  },
  data () {
    return {
      mainData: [],
      agreeData: []
    }
  },
  mounted () {
    if (this.checkData.length > 0) {
      this.mainData = JSON.parse(JSON.stringify(this.checkData.filter(item => item.contractType === 'contract')))
      this.agreeData = JSON.parse(JSON.stringify(this.checkData.filter(item => item.contractType === 'agreements')))
    }
  },
  methods: {
    // getDataHandle () {
    //   getContractAccountList(this.contractId).then(res => {
    //     this.dataSource = res
    //   })
    // },
    confirmHandle () {
      this.$emit('confirm', [
        ...this.mainData,
        ...this.agreeData
      ])
    },
    cancelHandle () {
      this.$emit('cancel')
    },
    createHandle () {
      this.$emit('create')
    }
  }
}
</script>
<style lang="less" scoped>
/deep/ .ant-modal-body {
  padding-top: 18px;
}
</style>
