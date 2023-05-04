<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="平台">
              <a-select placeholder="请选择" v-decorator="['platform']">
                <a-select-option :value="li.value" v-for="li in platformList" :key="li.value">{{ li.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="主播ID">
              <a-input placeholder="请输入" v-decorator="['tiktokLiveInfoId']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button @click="resetFormFileds">重置</a-button>
              <a-button style="margin-left: 12px" type="primary" html-type="submit">查询</a-button>
            </span>
          </a-col>
          <a-col :span="24">
            <div class="flex-justify mb16">
              <a-button type="primary" @click="addVisible = true">新增</a-button>
              <a-button type="primary" class="mr10" @click="importVisible = true">
                <svg-icon icon-class="import-icon" class="import-icon"></svg-icon>
                导入
              </a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      :columns="bettingColumns"
      :row-key="(record, index) => index"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    >
      <template slot="action" slot-scope="text, record">
        <a-button type="link" @click="endBetting(record)">结束对赌</a-button>
      </template>
    </s-table>
    <add-betting-modal
      :visible="addVisible"
      @cancel="addVisible = false" />
    <end-betting
      :visible="visible"
      :id="id"
      @cancel="visible = false" />
    <import-modal
      title="导入签约对赌主播"
      :visible="importVisible"
      :importFunc="importBetting"
      :showMonth="false"
      @cancel="importVisible = false" />
  </div>
</template>

<script>
import { importBetting } from '@/api/global-data'
import addBettingModal from './addBettingModal'
import endBetting from './endBetting'
import importModal from './importModal'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { bettingColumns } from '../tableColumns'
export default {
  props: {
    fn: {
      type: Function,
      default: null
    },
    monthDate: {
      type: String,
      default: null
    }
  },
  components: {
    STable,
    addBettingModal,
    importModal,
    endBetting
  },
  data () {
    return {
      bettingColumns,
      importBetting,
      id: '',
      addVisible: false,
      importVisible: false,
      visible: false,
      queryParams: {},
      form: this.$form.createForm(this),
      platformList: [{
        name: '抖音',
        value: 0
      }, {
        name: '视频号',
        value: 1
      }]
    }
  },
  created () {
  },
  mounted () {
  },
  computed: {
    ...mapGetters(['permission'])
  },
  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams)
      return this.fn(params).then(res => {
        return res
      })
    },
    resetFormFileds () {
      this.form.resetFields()
      this.searchHandle()
    },
    cancel () {
      this.visible = false
    },
    refresh (B = true) {
      if (B) {
        this.$refs.table.refresh(true)
      } else {
        this.$refs.table.refresh()
      }
    },
    searchHandle (e) {
      e && e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.queryParams = {
              ...values
            }
            this.refresh()
          }
        })
      })
    },
    endBetting (val) {
      console.log(123)
      this.id = val.id
      this.visible = true
    }
  },
  watch: {
    monthDate: {
      handler () {
        this.refresh()
      },
      immediate: false
    }
  }
}

</script>
<style lang='less' scoped>
@import '../index.less';
.table-page-search-wrapper {
  /deep/ .ant-form-inline {
    .ant-form-item {
      &.label-max-left {
        .ant-form-item-label {
          left: -7px;
          width: 110px;
          padding-right: 0;
        }
      }
      &.label-max-left1 {
        .ant-form-item-label {
          left: -7px;
          width: 140px;
          padding-right: 0;
        }
      }
      &.form-flex {
        .ant-form-item-children {
          display: flex;
          .flex-item{
            flex: 1;
          }
          .flex-right{
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
