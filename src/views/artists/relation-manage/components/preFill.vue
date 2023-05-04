<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="主播账号">
              <a-input placeholder="请输入" v-decorator="['platformCode']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="主播昵称">
              <a-input placeholder="请输入" v-decorator="['nickName']" />
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
          <a-col :md="!advanced && 24 || 24" :sm="24" style="margin-bottom:10px">
            <span class="table-page-search-submitButtons" :class="{'up': advanced}">
              <a-button @click="resetFormFileds">重置</a-button>
              <a-button style="margin-left: 12px" type="primary" html-type="submit">查询</a-button>
              <!-- <a @click="toggleAdvanced" style="margin-left: 16px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a> -->
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div>
      <a-button icon="plus-circle" type="primary" style="margin-bottom:10px" @click="visible = true">添加</a-button>
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
        <a-popover class="pover" placement="bottom">
          <template slot="content">
            <div class="btn-drop-group">
              <a-button type="link" @click="toGold(record)" v-if="record.state.code !== 2">修改</a-button>
              <a-popconfirm
                overlayClassName="popoer-del"
                title="确定要删除吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirmDel(record)"
              >
                <a-button type="link" v-if="record.state.code !== 2">删除</a-button>
              </a-popconfirm>
              <a-popconfirm
                overlayClassName="popoer-del"
                title="确定要激活吗?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="confirmActive(record)"
              >
                <a-button type="link" v-if="record.state.code === 3">激活</a-button>
              </a-popconfirm>
            </div>
          </template>
          <a-button type="link" v-if="record.state.code !== 2">更多<a-icon class="icon-down" type="down" /></a-button>
        </a-popover>
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
import { prefillColumns } from '../tableColumns'
import { getStructureTree } from '@/api/personnel'
import { getPrefillList, delPrefill, activePrefill, checkPrefill } from '@/api/artists'
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
      advanced: false,
      tableColums: prefillColumns,
      treeData: [],
      visible: false,
      prefillForm: this.$form.createForm(this)
    }
  },
  mounted () {
    this.getStructureTreeHandle()
  },

  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams)
      return getPrefillList(params).then(res => {
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
    searchHandle (e) {
      e && e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.queryParams = {
              ...values
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
    toGold (val) {
      this.$router.push({
        path: '/artists/relation-manage/gold',
        query: {
          id: val.id
        }
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
</style>
