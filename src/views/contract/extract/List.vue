<template>
  <div class="container">
    <a-card
      class="card-title-large min-height"
      title="合同调取"
      :bordered="false"
    >
      <div slot="extra" v-if="permission.includes('contract_call_apply')">
        <div class="opt-con">
          <div class="btn-group">
            <a-button
              type="primary"
              icon="form"
              @click="applyHandle">调取申请</a-button>
          </div>
        </div>
      </div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="60">
            <a-col :md="8" :sm="24">
              <a-form-item label="姓名">
                <a-input placeholder="请输入" v-decorator="['pbName']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="身份证号">
                <a-input placeholder="请输入" v-decorator="['pbIdCard']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="状态">
                <a-select
                  v-decorator="['state']"
                  placeholder="请选择"
                >
                  <a-select-option :value="1">
                    待审核
                  </a-select-option>
                  <a-select-option :value="2">
                    已通过
                  </a-select-option>
                  <a-select-option :value="3">
                    已拒绝
                  </a-select-option>
                  <a-select-option :value="4">
                    已过期
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="24" :sm="24">
              <span class="table-page-search-submitButtons" style="margin-bottom:24px;">
                <a-button @click="resetFormFileds">重置</a-button>
                <a-button style="margin-left: 12px" type="primary" @click="searchHandle">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <s-table
        ref="table"
        row-key="id"
        :columns="columns"
        :data="getDataHandle"
        showPagination="auto"
      >
        <template slot="state" slot-scope="text, record">
          <span v-if="record.applyState.code === 1">
            <a-tag color="orange">
              待审核
            </a-tag>
          </span>
          <span v-if="record.applyState.code === 2">
            <a-tag color="green">
              已通过
            </a-tag>
          </span>
          <span v-if="record.applyState.code === 3">
            <a-tag color="red">
              已拒绝
            </a-tag>
          </span>
          <span v-if="record.applyState.code === 4">
            <a-tag color="red">
              已过期
            </a-tag>
          </span>
        </template>
        <template slot="applyReason" slot-scope="text, record">
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ record.applyReason }}</span>
            </template>
            <div class="table-struc-con">
              {{ record.applyReason }}
            </div>
          </a-tooltip>
        </template>
        <span slot="action" slot-scope="text, record">
          <a-button v-if="record.applyState.code === 2 && record.isContent" type="link" style="margin-right: 12px;" @click="detailHandle(record.id)">内容查看</a-button>
          <a-button v-if="record.applyState.code === 4" type="link" @click="applyRepeatHandle(record.id)">重新申请</a-button>
        </span>
      </s-table>
    </a-card>
    <apply-drawer :visible="visible" @cancel="cancelContactHandle" @success="successContactHandle" :id="extractId" />
    <content-dialog :visible="visibleContent" @cancel="cancelContentHandle" :id="extractId" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { getExtractList } from '@/api/contract'
import { columns } from './columns'
import ApplyDrawer from './components/ApplyDrawer'
import ContentDialog from './components/ContentDialog'

export default {
  name: 'ContractList',
  components: {
    STable,
    ApplyDrawer,
    ContentDialog
  },
  data () {
    return {
      columns,
      visible: false,
      form: this.$form.createForm(this),
      queryParam: {},

      extractId: '',
      visibleContent: false
    }
  },
  mounted () {
  },
  methods: {
    applyHandle () {
      this.visible = true
    },
    cancelContactHandle () {
      this.extractId = ''
      this.visible = false
    },
    successContactHandle () {
      this.extractId = ''
      this.visible = false
      this.$refs.table.refresh(true)
    },
    cancelContentHandle () {
      this.extractId = ''
      this.visibleContent = false
    },
    detailHandle (id) {
      this.extractId = id
      this.visibleContent = true
    },
    applyRepeatHandle (id) {
      this.extractId = id
      this.visible = true
    },
    getDataHandle (parameter) {
      const requestParameters = Object.assign({}, parameter, this.queryParam)
      return getExtractList(requestParameters).then(res => {
        return res
      })
    },
    resetFormFileds () {
      this.form.resetFields()
      this.queryParam = {}
      this.$refs.table.refresh(true)
    },
    searchHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParam = {
            ...values
          }

          this.$refs.table.refresh(true)
        }
      })
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
</style>
