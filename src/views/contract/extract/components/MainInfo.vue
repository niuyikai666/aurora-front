<template>
  <div>
    <div class="name">{{ dataSource.nickName }}</div>
    <a-checkbox-group :options="options" @change="onChange" v-model="checkKeys" />
  </div>
</template>

<script>

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    dataSource: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      checkKeys: [],
      options: [
        { value: 'signType', label: '签约类型' },
        { value: 'code', label: '合同编号' },
        { value: 'tempType', label: '合同模版' },
        { value: 'paType', label: '甲方信息' },
        { value: 'pbName', label: '姓名' },
        { value: 'pbMobile', label: '电话号码' },
        { value: 'pbIdCard', label: '身份证号' },
        { value: 'pbAddress', label: '联系地址' },
        { value: 'pbBank', label: '开户行' },
        { value: 'pbBankCard', label: '卡号' },
        { value: 'pbAliPay', label: '支付宝' },
        { value: 'actorType', label: '艺人类型' },
        { value: 'pbIdCardFront', label: '身份证正面' },
        { value: 'pbIdCardBack', label: '身份证反面' },
        { value: 'pbIdCardHold', label: '手持身份证' },
        { value: 'pbProp', label: '无忧渠道分成比例(乙)' },
        { value: 'paProp', label: '无忧渠道分成比例(甲)' },
        { value: 'index', label: '合同首页' },
        { value: 'content', label: '合同全文' },
        { value: 'tail', label: '合同尾页' },
        { value: 'validityStartDate', label: '合同有效期开始时间' },
        { value: 'validityEndDate', label: '合同有效期结束时间' },
        { value: 'contractType', label: '合同类型' },
        { value: 'digest', label: '内容摘要' },
        { value: 'remark', label: '备注' }
      ]
    }
  },
  mounted () {
    this.checkKeys = this.dataSource.key
  },
  methods: {
    onChange (checkedValues) {
      this.dataSource.key = this.checkKeys = checkedValues
    }
  }
}
</script>

<style lang="less" scoped>
.name {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  margin-bottom: 10px;
}
/deep/ .ant-checkbox-group-item {
  margin-bottom: 10px;
  width: 23%;
}
</style>
