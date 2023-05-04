<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="主播账号">
              <a-input placeholder="请输入" v-decorator="['platformCode']"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="主播昵称" class="label-max-left1">
              <a-input placeholder="请输入" v-decorator="['nickName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="入会时间">
              <a-range-picker
                value-format="YYYY-MM-DD"
                v-decorator="['joinGuildDate']"
                @change="searchHandle"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="待绑定运营">
              <a-input placeholder="请输入" v-decorator="['creatorName']"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="待绑定运营所属组织" class="label-max-left">
              <a-cascader
                placeholder="请选择"
                v-decorator="['departmentId']"
                :options="treeData"
                change-on-select
                :allow-clear="false"
                expand-trigger="hover"
                :display-render="displayRender"
                @change="searchHandle"
              />
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="经纪人">
                <search-agent :searchFn="agentSearch" placeholder="请输入" v-decorator="['agentName']"/>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :class="{'up': advanced}">
              <a-button @click="resetFormFileds">重置</a-button>
              <a-button style="margin-left: 12px" type="primary" html-type="submit">查询</a-button>
              <a @click="toggleAdvanced" style="margin-left: 16px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="flex-end">
      <a-button
        type="primary"
        @click="download">
        <svg-icon class="icon aciton-icon-com" icon-class="export-icon"/>
        导出
      </a-button>
    </div>
    <s-table
      :columns="tableColums"
      :rowKey="(record, index) => index"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    >
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="detailHandle(record)" style="margin-right:10px">填写金数据</a-button>
      </span>
    </s-table>
  </div>
</template>

<script>
import { agentSearch } from '@/api/gold'
import searchAgent from '../../components/searchAgent'
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { boudingColumns } from '../tableColumns'
import { getStructureTree } from '@/api/personnel'
import { getBoudingList } from '@/api/artists'
import createTree from '@/utils/tree/generateTree'
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  components: {
    STable,
    searchAgent
  },
  data () {
    return {
      agentSearch,
      numberFormat,
      queryParams: {},
      form: this.$form.createForm(this),
      advanced: false,
      tableColums: boudingColumns,
      treeData: []
    }
  },
  mounted () {
    this.getStructureTreeHandle()
  },

  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams)
      return getBoudingList(params).then(res => {
        return res
      })
    },
    disabledDate (current) {
      return current > moment().subtract(1, 'days')
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetFormFileds () {
      this.form.resetFields()
      this.searchHandle()
    },
    getStructureTreeHandle () {
      getStructureTree().then(res => {
        this.treeData = JSON.parse(JSON.stringify(createTree(res)))
      })
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            values.departmentId = values.departmentId && values.departmentId.length > 0 ? values.departmentId[values.departmentId.length - 1] : undefined
            const queryParams = {
              ...values,
              beginDate: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              endDate: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
              joinGuildDate: undefined
            }
            resolve(queryParams)
          }
        })
      })
    },
    searchHandle (e) {
      e && e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            values.departmentId = values.departmentId && values.departmentId.length > 0 ? values.departmentId[values.departmentId.length - 1] : undefined
            this.queryParams = {
              ...values,
              beginDate: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              endDate: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
              joinGuildDate: undefined
            }
            this.$refs.table.refresh(true)
          }
        })
      })
    },
    detailHandle (val) {
      this.$router.push({
        path: '/artists/relation-manage/gold',
        query: {
          data: JSON.stringify(val)
        }
      })
    },
    download () {
      this.getParams().then(res => {
        let url = ''
        let path = `${process.env.VUE_APP_API_BASE_URL}`
        for (const key in res) {
          if (res[key] && key !== 'page' && key !== 'size' && key !== 'type') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
        path += `/actorRelation/admin/bound/export${url}`
        window.location.href = path
      })
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}

</script>
<style lang='less' scoped>
@import '../../index.less';
.table-page-search-wrapper {
  /deep/ .ant-form-inline {
    .ant-form-item {
      &.label-max-left {
        .ant-form-item-label {
          left: -20px;
          width: 135px;
          padding-right: 0;
        }
      }
      &.label-max-left1 {
        .ant-form-item-label {
          left: -17px;
          width: 135px;
          padding-right: 0;
        }
      }
    }
  }
}
</style>
