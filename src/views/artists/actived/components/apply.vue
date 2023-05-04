<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="主播昵称">
              <a-input allow-clear placeholder="请输入" v-decorator="['searchKey']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="发起日期">
              <a-range-picker
                allow-clear
                value-format="YYYY-MM-DD"
                v-decorator="['date']"
                @change="searchHandle"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="当前状态">
              <a-select
                allow-clear
                v-decorator="['state']"
                placeholder="请选择"
                @change="searchHandle"
              >
                <a-select-option :value="li.id" v-for="li in sateList" :key="li.id">
                  {{ li.value }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <span class="table-page-search-submitButtons">
              <a-button @click="resetFormFileds">重置</a-button>
              <a-button style="margin-left: 12px" type="primary" html-type="submit">查询</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="flex-justify" style="margin-bottom:16px">
      <a-button
        type="primary"
        icon="plus-circle"
        @click="visible = true">创建激活申请</a-button>
    </div>
    <s-table
      :columns="colunms"
      row-key="id"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    >
      <div slot="nickName" slot-scope="text, record">
        <p>{{ record.nickName }}</p>
        <p style="margin-bottom:0">抖音号: {{ record.tiktokCode }}</p>
      </div>
      <template slot="action" slot-scope="text, record">
        <a-button class="mr10" type="link" @click="showDetail(record.id)">查看</a-button>
        <a-popconfirm
          overlayClassName="popoer-del"
          title="确定要删除吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="confirmDel(record)"
        >
          <a-button type="link" v-if="record.state.code === 1 || record.state.code === 2">删除</a-button>
        </a-popconfirm>
        <a-button class="mr10" type="link" @click="showApplyModal(record.id)" v-if="record.state.code === 5">发起仲裁</a-button>
      </template>
    </s-table>
    <add-modal :visible="visible" @cancel="visible = false"/>
    <detail-modal :id="id" :visible="detailVisible" @cancel="detailVisible = false" />
    <apply-modal :id="id" :visible="applyVisible" @cancel="applyVisible = false" />
  </div>
</template>

<script>
import addModal from './addModal'
import applyModal from './applyModal'
import detailModal from './detailModal'
import { getApplyList, delApplyList } from '@/api/actived'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { applyColumns } from '../tableColumns'
export default {
  components: {
    STable,
    addModal,
    detailModal,
    applyModal
  },
  data () {
    return {
      colunms: applyColumns,
      visible: false,
      detailVisible: false,
      applyVisible: false,
      queryParams: {},
      form: this.$form.createForm(this),
      sateList: [{
        id: 1,
        value: '激活中'
      }, {
        id: 2,
        value: '待负责人审核'
      }, {
        id: 3,
        value: '激活通过'
      }, {
        id: 4,
        value: '激活失败'
      }, {
        id: 5,
        value: '原负责人驳回'
      }, {
        id: 6,
        value: '仲裁申请中'
      }, {
        id: 7,
        value: '激活申请驳回'
      }],
      id: ''
    }
  },
  created () {
  },
  mounted () {},

  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams)
      return getApplyList(params).then(res => {
        return res
      })
    },
    resetFormFileds () {
      this.form.resetFields()
      this.searchHandle()
    },
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const queryParams = {
              ...values,
              beginDate: values.date ? values.date[0] : undefined,
              endDate: values.date ? values.date[1] : undefined,
              date: undefined
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
            this.queryParams = {
              ...values,
              beginDate: values.date ? values.date[0] : undefined,
              endDate: values.date ? values.date[1] : undefined,
              date: undefined
            }
            this.$refs.table.refresh(true)
          }
        })
      })
    },
    showDetail (id) {
      this.id = id
      this.detailVisible = true
    },
    showApplyModal (id) {
      this.id = id
      this.applyVisible = true
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
        path += `/actor/livedata/download${url}`
        window.location.href = path
      })
    },
    confirmDel (val) {
      delApplyList(val.id).then(res => {
        this.$message.success('操作成功')
        this.$refs.table.refresh(true)
      })
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}

</script>
<style lang='less' scoped>
.mr5{
  margin-right: 10px;
}
@import '../../index.less';
</style>
