<template>
  <a-row>
    <a-col class="lg-24">
      <top-tip :updateTime="updateTime"/>
      <a-card
        class="card-custom head-mb5"
        style="width:100%"
        :bordered="false"
        :tabList="tabListNoTitle"
        activeTabKey="all"
      >
        <div slot="title">
          金数据预填写
        </div>
        <div slot="extra">
          <a-button type="primary" icon="plus-circle" @click="toAdd">添加</a-button>
        </div>
        <div class="block"></div>
        <div class="pd24">
          <div class="table-page-search-wrapper">
            <a-form layout="inline" :form="form" :autocomplete="false" class="form" @submit="searchHandle">
              <a-row :gutter="60">
                <a-col :md="8" :sm="24">
                  <a-form-item label="抖音号">
                    <a-input placeholder="请输入" v-decorator="['tiktokCode']" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="主播昵称">
                    <a-input placeholder="请输入" v-decorator="['nickname']" />
                  </a-form-item>
                </a-col>
                <a-col :md="24" :sm="24">
                  <div class="clearfix">
                    <a-button style="margin-left: 12px" type="primary" html-type="submit" class="fr">查询</a-button>
                    <a-button @click="resetFormFileds" class="fr">重置</a-button>
                  </div>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <div class="waring">*如更新时间还未匹配金数据信息，请您检查抖音号是否填写正确</div>
          <s-table
            ref="table"
            :columns="columns"
            row-key="id"
            :data="getData"
            showPagination="auto"
          >
            <template slot="tiktokCode" slot-scope="text">
              <span>{{ text || '-' }}</span>
              <!-- <a-button class="ml10" type="link" v-if="text" @click="showModal(record, 1)">修改</a-button> -->
            </template>
            <template slot="volcanoCode" slot-scope="text">
              <span>{{ text || '-' }}</span>
              <!-- <a-button class="ml10" type="link" v-if="text" @click="showModal(record, 2)">修改</a-button> -->
            </template>
            <template slot="agentName" slot-scope="text">
              <span>{{ text || '-' }}</span>
              <!-- <a-button class="ml10" type="link" v-if="text" @click="showModal(record, 3)">修改</a-button> -->
            </template>
            <template slot="action" slot-scope="text, record">
              <a-button type="link" @click="showModal(record)">修改</a-button>
              <a-button class="ml10" type="link" @click="delRecord(record)">删除</a-button>
              <a-button class="ml10" type="link" @click="toDetail(record)">查看详情</a-button>
            </template>
          </s-table>
        </div>
      </a-card>
      <add-count @cancel="cancel" @submit="submit" :visible="accountVisible" :influencer="influencer"/>
    </a-col>
  </a-row>
</template>

<script>
import { STable } from '@/components'
import TopTip from './components/TopTip'
import AddCount from './components/AddCount'
import { getPrefillsList, editAccount, getPrefillCounts, delInfluencer } from '@/api/pre-filled'
import { columns } from './tableColumns'

export default {
  name: 'Prefilledlist',
  components: {
    STable,
    TopTip,
    AddCount
  },
  data () {
    return {
      tabListNoTitle: [
        {
          key: 'all',
          tab: '全部主播'
        }
      ],
      queryParams: {},
      columns,
      updateTime: '',
      loading: true,
      visible: false,
      tableColums: [],
      accountVisible: false,
      form: this.$form.createForm(this),
      account: '',
      title: '',
      type: '',
      influencer: ''
    }
  },
  created () {
  },
  mounted () {
    this.getCounts()
  },
  methods: {
    getCounts () {
      getPrefillCounts().then(res => {
        this.updateTime = res.latestUpdateTime
        this.tabListNoTitle = [
          {
            key: 'all',
            tab: `全部主播 ${res.ALL}`
          }
        ]
      })
    },
    getData (parameter) {
      const params = Object.assign({}, parameter, this.queryParams)
      return getPrefillsList(params).then(res => {
        return res
      })
    },
    searchHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParams = {
            ...values
          }
        }
        this.$refs.table.refresh()
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

    resetFormFileds () {
      this.queryParams = {}
      this.paramsReset()
    },

    paramsReset () {
      this.form.resetFields()
      this.$refs.table.refresh(true)
    },

    showTiktokModal () {
      this.accountVisible = true
    },

    showModal (val) {
      this.influencer = val
      this.accountVisible = true
    },
    delRecord (record) {
      this.$confirm({
        title: '提示',
        content: `是否删除当前主播信息?`,
        onOk: () => {
          delInfluencer(record.id).then(res => {
            this.$message.success('操作成功')
            this.$refs.table.refresh()
          })
        },
        onCancel () {
        }
      })
    },
    cancel () {
      this.accountVisible = false
    },
    submit (val) {
      editAccount(this.influencer.id, val).then(res => {
        this.accountVisible = false
        this.$message.success('操作成功')
        this.$refs.table.refresh()
      })
    },
    toAdd () {
      this.$router.push({
        path: '/artists/pre-filled/add'
      })
    },
    toDetail (val) {
      this.$router.push({
        path: '/artists/pre-filled/detail',
        query: {
          id: val.id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
