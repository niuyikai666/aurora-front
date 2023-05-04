<template>
  <div>
    <div class="name">{{ dataSource.nickName }}</div>
    <a-checkbox-group :options="options" @change="onChange" v-model="checkKeys" />
  </div>
</template>

<script>
// import { getContractAccountList, deletContractAccount } from '@/api/contract'

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
      options: [],
      options1: [
        { value: 'type', label: '分类' },
        { value: 'index', label: '合同首页' },
        { value: 'content', label: '合同全文' },
        { value: 'tail', label: '合同尾页' },
        { value: 'validityStartDate', label: '合同有效期开始时间' },
        { value: 'validityEndDate', label: '合同有效期结束时间' },
        { value: 'digest', label: '内容摘要' },
        { value: 'remark', label: '备注' }
      ],
      options2: [
        { value: 'type', label: '分类' },
        { value: 'index', label: '合同首页' },
        { value: 'content', label: '合同全文' },
        { value: 'tail', label: '合同尾页' },
        { value: 'validityStartDate', label: '合同有效期开始时间' },
        { value: 'validityEndDate', label: '合同有效期结束时间' },
        { value: 'digest', label: '内容摘要' },
        { value: 'remark', label: '备注' },
        { value: 'liveDayMonthLimit', label: '月直播天数' },
        { value: 'liveDurationMonthLimit', label: '月直播有效时长' },
        { value: 'videoCountMonthLimit', label: '月更新短视频条数' },
        { value: 'channelPbProp', label: '非无忧渠道分成比例(乙)' },
        { value: 'channelPaProp', label: '非无忧渠道分成比例(甲)' },
        { value: 'echannelPbProp', label: '电商分成比例(乙)' },
        { value: 'echannelPaProp', label: '电商分成比例(甲)' },
        { value: 'rbookletPbProp', label: '小红书平台分成比例(乙)' },
        { value: 'rbookletPaProp', label: '小红书平台分成比例(甲)' },
        { value: 'isMinReward', label: '是否有保底' },
        { value: 'minRewardList', label: '保底内容' }

      ]
    }
  },
  mounted () {
    this.options = parseInt(this.dataSource.type) === 1 ? this.options2 : this.options1
    this.$nextTick(() => {
      this.checkKeys = this.dataSource.key
    })
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
  margin-bottom: 8px;
  margin-top: 10px;
}
/deep/ .ant-checkbox-group-item {
  margin-bottom: 10px;
  width: 23%;
}
</style>
