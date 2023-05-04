<template>
  <div class="container">
    <a-card
      class="card-title-large"
      :bordered="false"
    >
      <div slot="title">
        合同详情
        <div class="cascader-custom report-custom">
          <span class="report-name cascader-desc">{{ tabName }} <a-icon class="antion-custom" type="down" /></span>
          <a-select
            style="width: 180px;"
            v-model="tab"
            @change="changeHandle"
          >
            <a-select-option v-for="item in tabList" :key="item.id" :value="item.contractId">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="detail-content">
        <contract-detail v-if="isMain" :contractId="contractId" />
        <contract-extra-detail v-if="!isMain" :contractId="contractId" />
      </div>
      <!-- <a-row>
        <a-col>
          <a-button type="primary" @click="goBack()">返回</a-button>
        </a-col>
      </a-row> -->
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ContractDetail from '../components/ContractDetail.vue'
import ContractExtraDetail from '../components/ContractExtraDetail.vue'
import { contractDetailTab } from '@/api/contract'

export default {
  name: 'ContractDetailMain',
  components: {
    ContractDetail,
    ContractExtraDetail
  },
  data () {
    return {
      contractId: 'a' + this.$route.query.id,
      tab: '',
      isMain: true,
      tabList: [],
      tabName: '主合同'
    }
  },
  mounted () {
    this.tabList.push({
      contractId: this.contractId,
      name: '主合同',
      isMain: true
    })
    this.tab = this.contractId

    if (this.permission.includes('contract_agreement_list')) {
      this.contractDetailTabHandle()
    }
  },
  methods: {
    contractDetailTabHandle () {
      const id = this.contractId.split('a')[1]
      contractDetailTab(id).then(res => {
        const data = []
        res.forEach(item => {
          data.push({
            contractId: String(item.id),
            name: item.nickName,
            isMain: false
          })
        })
        this.tabList = [
          ...this.tabList,
          ...data
        ]
      })
    },

    changeHandle (id) {
      const data = this.tabList.filter(item => item.contractId === id)[0]
      this.isMain = data.isMain
      this.contractId = data.contractId
      this.tabName = data.name
    },

    goBack () {
      this.$router.push({
        path: `/contract/manage/list`
      })
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
