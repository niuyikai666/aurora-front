<template>
  <div class="pd24" style="background:#fff">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="主播昵称">
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
            <a-form-item label="登录手机号">
              <a-input placeholder="请输入" v-decorator="['phone']"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="运营人">
              <search-employee
                v-decorator="['employee']"
                placeholder="请输入"
                :searchFn="artistSearch"
                :params="{dutyType: 1}"
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
    <div class="flex-justify" style="margin-bottom:16px">
      <a-button type="primary" @click="manageTime">管理到期时间</a-button>
      <a-button type="primary" @click="download">
        <svg-icon icon-class="export-icon" class="import-icon"></svg-icon>
        导出
      </a-button>
    </div>
    <s-table
      :columns="activedColunms"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
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
        <a-button type="link" @click="logs(record)">账号日志</a-button>
      </span>
    </s-table>
    <activing-modal :visible="visible" @cancel="visible = false" :id="id"/>
    <choose-time :visible="timeVisible" @cancel="timeVisible = false" :selectedRowKeys="selectedRowKeys"/>
  </div>
</template>

<script>
import searchEmployee from './searchEmployee'
import activingModal from './activingModal'
import chooseTime from './chooseTime'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { activedColunms } from '../tableColumns'
import { artistSearch } from '@/api/cultivate'
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
    chooseTime,
    searchEmployee
  },
  data () {
    return {
      queryParams: {},
      form: this.$form.createForm(this),
      advanced: true,
      activedColunms,
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
      selectedRowKeys: [],
      id: '',
      visible: false,
      timeVisible: false,
      artistSearch
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
              joinGuildDate: undefined,
              employeeId: values.employee ? values.employee.key : undefined,
              employee: undefined
            }
            resolve(queryParams)
          }
        })
      })
    },
    download () {
      this.getParams().then(res => {
        console.log(res)
        let url = ''
        const path = `${process.env.VUE_APP_API_BASE_URL}/coolcolleges/manageDownLoad`
        for (const key in res) {
          if ((res[key] || res[key] === false || res[key] === 0) && key !== 'page' && key !== 'size' && key !== 'type') {
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
              joinGuildDate: undefined,
              employeeId: values.employee ? values.employee.key : undefined,
              employee: undefined
            }
            this.$refs.table.refresh(true)
          }
        })
      })
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    manageTime () {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error('请选择主播')
        return
      }
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
