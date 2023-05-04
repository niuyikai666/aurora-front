<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="抖音账号">
              <a-input placeholder="请输入" v-decorator="['tikTokCode']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="所属组织">
              <a-cascader
                placeholder="请选择"
                v-decorator="['belongDepartmentId']"
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
            <a-form-item label="招募姓名">
              <a-input placeholder="请输入" v-decorator="['recruitName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="运营姓名">
              <a-input placeholder="请输入" v-decorator="['operatorName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="签约情况">
              <a-select
                v-decorator="['signMethod']"
                placeholder="请选择"
                @change="searchHandle"
              >
                <a-select-option :value="1">
                  全约
                </a-select-option>
                <a-select-option :value="2">
                  网签
                </a-select-option>
                <a-select-option :value="3">
                  未签约
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item class="label-left" label="最近开播时间">
                <a-range-picker
                  value-format="YYYY-MM-DD"
                  v-decorator="['percentDate']"
                  @change="searchHandle"
                />
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :class="{'up': advanced}">
              <a-button style="margin-right:16px;" @click="resetFormFileds">重置</a-button>
              <a-button type="primary" html-type="submit">查询</a-button>
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
        v-if="permission.includes('actor_list_resume_live_export')"
        type="primary"
        style="margin-right:16px; color:#fff;"
        @click="download">
        <svg-icon class="icon aciton-icon-com" icon-class="export-icon"/>
        导出
      </a-button>
      <a-popover placement="right" :trigger="['click']">
        <template slot="content">
          <div class="pop-wraper">
            <a-checkbox-group v-model="colunmsChecked" @change="checkedChange">
              <a-row>
                <a-col :span="8" v-for="li in checkArr" :key="li.dataIndex">
                  <a-checkbox :value="li.dataIndex" style="margin-bottom:10px">
                    {{ li.title }}
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </div>
        </template>
        <div style="margin-bottom:0;margin-top:5px">
          <a-icon type="setting" class="pointer"/>
          更多指标
        </div>
      </a-popover>
    </div>
    <s-table
      :columns="tableColums"
      row-key="id"
      :data="loadData"
      ref="table"
      :scroll="{x: 1200}"
    >
      <div slot="nickName" slot-scope="text, record">
        <div class="flex-box">
          <div class="box-item">
            <a-popover placement="rightTop">
              <template slot="content">
                <div class="box-item-pover">
                  <p class="title">{{ record.nickName }}</p>
                  <p>抖音号: {{ record.tikTokCode }}</p>
                  <p>抖音号(原): {{ record.tikTokCodeOrig }}</p>
                  <p>火山号: {{ record.volcanoCode }}</p>
                </div>
              </template>
              <p>{{ record.nickName }}</p>
              <p>抖音号: {{ record.tikTokCode }}</p>
            </a-popover>
          </div>
        </div>
      </div>
      <template slot="operatorFullNameOrig" slot-scope="text">
        <a-tooltip placement="rightTop">
          <template slot="title">
            <span>{{ text }}</span>
          </template>
          <div class="table-struc-con">
            {{ text }}
          </div>
        </a-tooltip>
      </template>
      <template slot="currentMonthTotalReward" slot-scope="text, record">
        {{ record.currentMonthTotalReward !== null ? numberFormat(record.currentMonthTotalReward) : '-' }} {{ record.currentMonthTotalReward > 10000 ? '万' : '' }}
      </template>
      <template slot="currentOperatorFullName" slot-scope="text">
        <a-tooltip placement="rightTop">
          <template slot="title">
            <span>{{ text }}</span>
          </template>
          <div class="table-struc-con">
            {{ text }}
          </div>
        </a-tooltip>
      </template>
      <template slot="state" slot-scope="text, record">
        {{ record.state ? record.state.msg : '' }}
      </template>
      <template slot="signMethod" slot-scope="text, record">
        {{ record.signMethod ? record.signMethod.msg : '' }}
      </template>
      <template slot="stopBroadcastInterval" slot-scope="text, record">
        {{ record.stopBroadcastInterval ? record.stopBroadcastInterval.msg : '' }}
      </template>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="detailHandle(record.id)" style="margin-right:10px">详情</a-button>
      </span>
    </s-table>
  </div>
</template>

<script>
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { rebroadcastColumns } from '../tableColumns'
import { getStructureTree } from '@/api/personnel'
import createTree from '@/utils/tree/generateTree'
export default {
  props: {
    fn: {
      type: Function,
      default: null
    },
    dataType: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },
  components: {
    STable
  },
  data () {
    return {
      numberFormat,
      queryParams: {},
      form: this.$form.createForm(this),
      advanced: false,
      tableColums: [],
      colunmsChecked: [],
      checkArr: [],
      defaultColunm: ['nickName', 'lastLiveTime', 'breakLiveDays', 'signMethod', 'action'],
      treeData: []
    }
  },
  created () {
    if (!(this.permission.includes('actor_operation_live') || this.permission.includes('actor_operation_video'))) {
      this.defaultColunm = this.defaultColunm.filter(item => item !== 'action')
    }
    this.getTableColumns()
    this.getStructureTreeHandle()
  },
  mounted () {},

  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams, { dataType: this.dataType, type: this.type })
      return this.fn(params).then(res => {
        return res
      })
    },
    disabledDate (current) {
      return current > moment().subtract(0, 'days')
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
    getTableColumns () {
      const storageColumns = localStorage.getItem(`artists-live-${this.type}`) ? JSON.parse(localStorage.getItem(`artists-live-${this.type}`)) : []
      this.tableColums = rebroadcastColumns.filter(item => storageColumns.includes(item.dataIndex) || this.defaultColunm.includes(item.dataIndex))
      this.colunmsChecked = storageColumns
      this.checkArr = rebroadcastColumns.filter(item => !this.defaultColunm.includes(item.dataIndex) && item.dataIndex !== 'action')
    },
    checkedChange () {
      this.tableColums = rebroadcastColumns.filter(item => this.colunmsChecked.includes(item.dataIndex) || this.defaultColunm.includes(item.dataIndex))
      localStorage.setItem(`artists-live-${this.type}`, JSON.stringify(this.colunmsChecked))
    },
    searchHandle (e) {
      e && e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            values.belongDepartmentId = values.belongDepartmentId && values.belongDepartmentId.length > 0 ? values.belongDepartmentId[values.belongDepartmentId.length - 1] : undefined
            this.queryParams = {
              ...values,
              lastOpenStartDate: values.percentDate ? values.percentDate[0] : undefined,
              lastOpenEndDate: values.percentDate ? values.percentDate[1] : undefined,
              percentDate: undefined
            }
            this.$refs.table.refresh(true)
          }
        })
      })
    },
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            values.belongDepartmentId = values.belongDepartmentId && values.belongDepartmentId.length > 0 ? values.belongDepartmentId[values.belongDepartmentId.length - 1] : undefined
            const queryParams = {
              ...values,
              dataType: this.dataType,
              type: this.type,
              lastOpenStartDate: values.percentDate ? values.percentDate[0] : undefined,
              lastOpenEndDate: values.percentDate ? values.percentDate[1] : undefined,
              percentDate: undefined
            }
            resolve(queryParams)
          }
        })
      })
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    detailHandle (id) {
      this.$router.push({
        path: '/artists/detail',
        query: {
          id: id
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
        path += `/activityAct/list/export${url}`
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
</style>
