<template>
  <div class="pd24" style="background:#fff">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="主播昵称" class="label-max-left">
              <a-input placeholder="请输入" v-decorator="['codeOrNickname']"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="所属平台">
              <a-select placeholder="请选择" v-decorator="['platform']" @change="searchHandle">
                <a-select-option v-for="li in platformList" :key="li.value" :value="li.value">{{ li.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="主播类型">
              <a-select placeholder="请选择" v-decorator="['type']" @change="searchHandle">
                <a-select-option v-for="li in typeList" :key="li.value" :value="li.value">{{ li.name }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="培训账号状态" class="label-max-left">
              <a-select placeholder="请选择" v-decorator="['status']" @change="searchHandle">
                <a-select-option v-for="li in accountType" :key="li.value" :value="li.value">{{ li.name }}</a-select-option>
              </a-select>
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
          <a-col :md="!advanced && 8 || 8" :sm="24">
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
    <div class="flex-end">
      <a-button type="primary" @click="download">导出</a-button>
    </div>
    <s-table
      :columns="outTimeColunms"
      row-key="id"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    >
      <div slot="nickName" slot-scope="text, record">
        <p>{{ record.nickname }}</p>
        <p style="margin:0">ID: {{ record.actorCode }}</p>
      </div>
      <span slot="action" slot-scope="text, record">
        <a-button
          class="mr5"
          type="link"
          @click="activeAccount(record)"
          v-if="record.nextStatus === '已冻结' || (record.nextStatus === '已删除' && record.isQuit === '在会')">激活账号</a-button>
        <a-popconfirm
          overlayClassName="normal-comfirm"
          title="确定要删除吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="delAccount(record)"
        >
          <a-button class="mr5" type="link" v-if="record.nextStatus !== '已删除'">删除账号</a-button>
        </a-popconfirm>
        <a-button type="link" @click="logs(record)">账号日志</a-button>
      </span>
    </s-table>
    <activing-modal :visible="visible" @cancel="visible = false" :id="id"/>
    <active-out-time :visible="timeVisible" @cancel="timeVisible = false" :id="id" :phone="phone"/>
  </div>
</template>

<script>
import { delAccount } from '@/api/cultivate'
import activingModal from './activingModal'
import activeOutTime from './activeOutTime'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { outTimeColunms } from '../tableColumns'
export default {
  props: {
    fn: {
      type: Function,
      default: null
    }
  },
  components: {
    STable,
    activingModal,
    activeOutTime
  },
  data () {
    return {
      queryParams: {},
      form: this.$form.createForm(this),
      advanced: true,
      outTimeColunms,
      typeList: [{
        name: '新主播',
        value: '新主播'
      }, {
        name: '老主播（稳定）',
        value: '老主播（稳定）'
      }, {
        name: '老主播（不稳定）',
        value: '老主播（不稳定）'
      }],
      platformList: [{
        name: '抖音',
        value: '抖音'
      }, {
        name: '视频号',
        value: '视频号'
      }],
      accountType: [{
        name: '已冻结',
        value: '已冻结'
      }, {
        name: '已删除',
        value: '已删除'
      }],
      id: '',
      phone: '',
      visible: false,
      timeVisible: false
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
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const queryParams = {
               ...values,
              joinGuildDate0: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              joinGuildDate1: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
              joinGuildDate: undefined
            }
            resolve(queryParams)
          }
        })
      })
    },
    download () {
      this.getParams().then(res => {
        let url = ''
        const path = `${process.env.VUE_APP_API_BASE_URL}/coolcolleges/invalids/mine/excel`
        for (const key in res) {
          if ((res[key] || res[key] === false || res[key] === 0) && key !== 'page' && key !== 'size') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
        window.location.href = path + url
      })
    },
    searchHandle (e) {
      e && e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.queryParams = {
              ...values,
              joinGuildDate0: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              joinGuildDate1: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
              joinGuildDate: undefined
            }
            this.$refs.table.refresh(true)
          }
        })
      })
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    activeAccount (val) {
      this.phone = val.activePhone
      this.id = val.id
      this.timeVisible = true
    },
    refresh (B = false) {
      if (B) {
        this.$refs.table.refresh(true)
      } else {
        this.$refs.table.refresh()
      }
    },
    logs ({ id }) {
      this.id = id
      this.visible = true
    },
    delAccount (val) {
      delAccount({
        id: val.id
      }).then(res => {
        this.$message.success('操作成功')
        this.refresh()
      })
    },
    exportData () {}
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
