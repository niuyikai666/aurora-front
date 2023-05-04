<template>
  <s-table
    :row-key="(record, index) => index"
    ref="table"
    :columns="columns"
    :data="getList"
    showPagination="auto"
  >
    <div slot="InfluencernickName" slot-scope="text, record">
      <div class="flex-box">
        <div class="box-item">
          <p>{{ record.nickName }}</p>
          <p>抖音号: {{ record.tikTokCode }}</p>
          <p>抖音号(原): {{ record.tikTokCodeOrig }}</p>
          <p>火山号: {{ record.volcanoCode }}</p>
        </div>
      </div>
    </div>
  </s-table>
</template>

<script>
import TabContent from './TabContent'
import { STable } from '@/components'
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    getList: {
      type: Function,
      default: null
    },
    columns: {
      type: Array,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: true
    },
    url: {
      type: String,
      default: ''
    }
  },
  components: {
    STable,
    TabContent
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  methods: {
    getListData (parameter) {
      const requestParameters = Object.assign({}, parameter, this.data)
      return this.getList(requestParameters).then(res => {
        return res
      })
    },
    refresh () {
      this.$refs.table.refresh(true)
    },
    change () {
      this.$emit('change')
    }
  },
  watch: {
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
<style lang="less" scoped>
@import '../index.less';
</style>
