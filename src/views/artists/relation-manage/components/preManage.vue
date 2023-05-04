<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="主播账号">
              <a-input placeholder="请输入" v-decorator="['platformCode']" @pressEnter="searchHandle" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="主播昵称" class="label-max-left1">
              <a-input placeholder="请输入" v-decorator="['nickName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="预填写时间" class="label-max-left label-max-left3">
              <a-range-picker
                value-format="YYYY-MM-DD"
                v-decorator="['joinGuildDate']"
                :disabledDate="disabledDate"
                @change="searchHandle"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="经纪人">
              <search-agent :searchFn="agentSearch" placeholder="请输入" v-decorator="['agentName']"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="预填写提交人" class="label-max-left1">
              <a-input placeholder="请输入" v-decorator="['creatorName']"/>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="预填写提交人所属组织" class="label-max-left">
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
            <a-col :md="8" :sm="24">
              <a-form-item label="预填写状态">
                <a-select placeholder="请选择" v-decorator="['state']" @change="searchHandle">
                  <a-select-option :value="1">待匹配</a-select-option>
                  <a-select-option :value="2">匹配成功</a-select-option>
                  <a-select-option :value="4">匹配失败</a-select-option>
                  <a-select-option :value="3">记录失效</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 16" :sm="24">
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
    <div class="flex-justify" style="margin-bottom:10px">
      <a-button icon="plus-circle" type="primary" @click="visible = true">添加</a-button>
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
        <a-button class="mr10" type="link" @click="toDetail(record.id)">详情</a-button>
      </span>
    </s-table>
    <a-modal
      :visible="visible"
      title="添加待绑定主播"
      :destroyOnClose="true"
      @ok="prefillSubmit"
      @cancel="visible = false"
    >
      <a-form :form="prefillForm" :label-col="{ span: 9 }" :wrapper-col="{ span: 11 }">
        <a-form-item label="账号所属平台">
          <a-radio-group
            v-decorator="[ 'platformType', { rules: [{ required: false }], initialValue: 1 }]"
          >
            <a-radio :value="1">
              抖音
            </a-radio>
            <a-radio :value="2">
              火山
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="主播账号ID">
          <a-input
            v-decorator="['platformCode', { rules: [{ required: true, message: '请输入主播账号ID!' }] }]"
            placeholder="请输入主播账号ID"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { agentSearch } from '@/api/gold'
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { preManageColumns } from '../tableColumns'
import { getStructureTree } from '@/api/personnel'
import { getManagePreList, delPrefill, activePrefill, checkPrefill } from '@/api/artists'
import createTree from '@/utils/tree/generateTree'
import searchAgent from '../../components/searchAgent'
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
      prefillForm: this.$form.createForm(this),
      advanced: false,
      tableColums: preManageColumns,
      treeData: [],
      visible: false
    }
  },
  mounted () {
    this.getStructureTreeHandle()
  },

  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams)
      return getManagePreList(params).then(res => {
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
    detailHandle (id) {
      this.$router.push({
        path: '/artists/detail',
        query: {
          id: id
        }
      })
    },
    confirmDel (val) {
      delPrefill(val.id).then(res => {
        this.$message.success('操作成功')
        this.$refs.table.refresh()
      })
      // this.$message.success('操作成功')
    },
    confirmActive (val) {
      activePrefill(val.id).then(res => {
        this.$message.success('操作成功')
        this.$refs.table.refresh()
      })
    },
    toGold (val) {
      this.$router.push({
        path: '/artists/relation-manage/gold',
        query: {
          id: val.id
        }
      })
    },
    showModal () {
    },
    prefillSubmit () {
      this.prefillForm.validateFields((err, values) => {
         if (!err) {
            checkPrefill(values).then(res => {
              this.visible = false
              this.$router.push({
                path: '/artists/relation-manage/gold',
                query: {
                  ...values
                }
              })
            })
         }
       })
    },
    toDetail (id) {
      this.$router.push({
        path: '/artists/relation-manage/goldDetail',
        query: {
          id
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
        path += `/actorRelation/admin/prefills/export${url}`
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
          left: -15px;
          width: 145px;
          padding-right: 0;
        }
      }
      &.label-max-left1 {
        .ant-form-item-label {
          left: -15px;
          width: 100px;
          padding-right: 0;
        }
      }
      &.label-max-left3 {
        .ant-form-item-label {
          left: -7px;
        }
      }
    }
  }
}
</style>
