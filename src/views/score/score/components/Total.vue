<template>
  <div style="padding-top: 22px;">
    <a-card
      class="my-card"
      style="width:100%"
      :bordered="false"
      :tab-list="tabListNoTitle"
      :active-tab-key="noTitleKey"
      @tabChange="onTabChange"
    >
      <div v-if="noTitleKey === 'tab1'">
        <tab-content class="tab-content" title="核心数据" style="margin-top:32px;">
          <div v-if="statics" class="static-content" style="margin-top:0">
            <a-statistic title="保底发起数" :value="numberFormat(statics.numTotal)"/>
            <a-statistic title="通过主播数" :value="numberFormat(statics.numStateEq7)"/>
            <a-statistic title="待评委打分" :value="numberFormat(statics.numStateEq2)"/>
            <a-statistic title="待运营打分" :value="numberFormat(statics.numStateEq0)"/>
            <a-statistic title="客观分驳回" :value="numberFormat(statics.numStateEq4)"/>
            <a-statistic title="总分不达标" :value="numberFormat(statics.numStateEq6)"/>
          </div>
        </tab-content>
      </div>
      <div v-if="noTitleKey === 'tab2'">
        <tab-content class="tab-content" title="分公司数据" style="margin-top:32px;">
          <table class="table-custom">
            <thead>
              <tr>
                <th>分公司</th>
                <th>保底发起数</th>
                <th>通过主播数</th>
                <th>待评委打分</th>
                <th>待运营打分</th>
                <th>客观分驳回</th>
                <th>总分不达标</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in companyData" :key="index">
                <td>{{ item.companyName }}</td>
                <td>{{ numberFormat(item.numTotal) }}</td>
                <td>{{ numberFormat(item.numStateEq7) }}</td>
                <td>{{ numberFormat(item.numStateEq2) }}</td>
                <td>{{ numberFormat(item.numStateEq0) }}</td>
                <td>{{ numberFormat(item.numStateEq4) }}</td>
                <td>{{ numberFormat(item.numStateEq6) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-if="originCompanyData && originCompanyData.length > 0" style="text-align:right;margin-top:12px;">
            <span class="more" @click="handleUp"><a-icon :type="up ? 'down' : 'up'" />{{ up && '展开' || '收起' }}</span>
          </div>
        </tab-content>
      </div>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import TabContent from '@/components/TabContent'
import { numberFormat } from '@/utils/util'

export default {
  name: 'ToalComp1',
  props: {
    api: {
      type: Function,
      default: null
    },
    params: {
      type: Object,
      default: null
    }
  },
  components: {
    STable,
    TabContent
  },
  data () {
    return {
      numberFormat,
      tabListNoTitle: [
        {
          key: 'tab1',
          tab: '保底申请总况'
        },
        {
          key: 'tab2',
          tab: '各分公司申请汇总'
        }
      ],
      noTitleKey: 'tab1',
      originCompanyData: {},
      companyData: {},
      statics: null,
      up: true
    }
  },
  mounted () {
    this.handleStatics()
  },
  methods: {
    handleStatics () {
      this.api(this.params).then(res => {
        this.originCompanyData = res.list
        this.companyData = res.list.slice(0, 5)
        this.statics = res.sum
      })
    },
    handleUp () {
      if (this.up) {
        this.companyData = this.originCompanyData
      } else {
        this.companyData = this.originCompanyData.slice(0, 5)
      }
      this.up = !this.up
    },
    onTabChange (key) {
      this.noTitleKey = key
    }
  },
  watch: {
    params: {
      handler (val) {
        this.handleStatics()
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
  .my-card {
    margin-bottom: 32px;
    /deep/ .ant-card-head {
      padding: 0 !important;
    }
    /deep/ .ant-tabs .ant-tabs-large-bar .ant-tabs-tab {
      padding: 14px !important;
      line-height: 1;
      margin: 0;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
    }
    /deep/ .ant-tabs .ant-tabs-large-bar .ant-tabs-tab-active {
      border: solid 1px #ddd;
    }
    /deep/ .ant-tabs-ink-bar {
      background-color: #fff;
      transition: transform 0s, left 0s;
    }
  }
  .tab-content {
    /deep/ h1 {
      font-size: 18px;
    }
  }
  .static-content {
    display: flex;
    .ant-statistic {
      flex: 1;
      margin-right: 15px;
      border-right: solid 1px rgba(0,0,0,.06);
      /deep/ .ant-statistic-title {
        color: #000;
      }
      /deep/ .ant-statistic-content {
        font-weight: 700;
      }
    }
  }
</style>
