<template>
  <a-row>
    <a-col class="lg-24">
      <a-card
        class="card-custom head-mb5 min-height"
        title="复播主播"
        :bordered="false"
        :tabList="tabListNoTitle"
        :activeTabKey="queryParams.type"
        @tabChange="key => handleTabChange(key)"
      >
        <!-- <div slot="extra" v-if="permission.includes('breakLive_activity_opt_export')">
          <a v-if="queryParams.type === 'actived'" :href="downloadUrl">
            <a-button type="primary" icon="download">导出</a-button>
          </a>
        </div> -->
        <div class="tip-icon-con">
          <a-popover placement="bottomRight">
            <template slot="content">
              <div class="index-crip-content">
                <p class="title">指标说明</p>
                <dl class="list">
                  <dt>复播主播</dt>
                  <dd>断播30天以上且再次开播的主播</dd>
                </dl>
              </div>
            </template>
            <a-icon type="question-circle" />
          </a-popover>
        </div>
        <div class="block"></div>
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
                        :disabledDate="disabledDate"
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
              v-if="permission.includes('breakLive_activity_opt_export') && queryParams.type === 'actived'"
              type="primary"
              style="margin-right:16px; color:#fff;">
              <svg-icon class="icon aciton-icon-com" icon-class="export-icon"/>
              <a style="color:#fff" :href="downloadUrl">导出</a>
            </a-button>
            <a-popover placement="right" :trigger="['click']">
              <template slot="content">
                <div class="pop-wraper">
                  <a-checkbox-group v-model="colunmsChecked" @change="checkedChange">
                    <a-row>
                      <a-col :span="8" v-for="li in checkArr" :key="li.dataIndex">
                        <a-checkbox :value="li.dataIndex" style="margin-bottom:10px">
                          {{ li.title || li.desc }}
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
          <a-table
            :columns="tableColums"
            row-key="uid"
            :data-source="dataSource"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
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
              <a-button style="margin-right:16px;" v-if="queryParams.type === 'apply' && (!record.state || record.state.code==1) && permission.includes('breakLive_activity_opt_apply')" type="link" @click="activeHandle(record.tiktokLiveInfoId)">审核</a-button>
              <a-button type="link" @click="detailHandle(record.id)">详情</a-button>
            </span>
          </a-table>
        </div>
      </a-card>
    </a-col>
    <active-form v-if="visible" :visible="visible" :id="applyId" @success="finishHandle" @cancel="finishHandle" />
  </a-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import ActiveForm from './modules/ActiveForm'
import { getCutoffActiedArtists, getCutoffActiedApplyArtists, getCutoffActiedATabCount } from '@/api/artists'
import { getStructureTree } from '@/api/personnel'
import { columnsActived } from './tableColumns'
import Ellipsis from '@/components/Ellipsis'
import TitleTip from '../components/TitleTip'
import { numberFormat } from '@/utils/util'
import moment from 'moment'
import createTree from '@/utils/tree/generateTree'

export default {
  name: 'ArtistsList',
  components: {
    STable,
    Ellipsis,
    ActiveForm,
    TitleTip
  },
  data () {
    return {
      advanced: false,
      tabListNoTitle: [],

      loading: true,
      dataSource: [],
      pagination: {},
      columns: [],
      queryParams: {
        type: 'actived',
        page: 1,
        size: 10
      },

      numberFormat,
      timer: null,

      form: this.$form.createForm(this),
      downloadUrl: '',

      treeData: [],

      stateMap: {
        1: '申请中',
        2: '申请撤回',
        3: '审核通过',
        4: '申请驳回',
        5: '处理完成'
      },

      visible: false,
      applyId: '',
      columnsActived: columnsActived,
      colunmsChecked: [],
      tableColums: [],
      checkArr: [],
      defaultColunm: {
        actived: ['nickName', 'lastLiveTime', 'breakLiveDays', 'signMethod', 'action'],
        apply: ['nickName', 'lastLiveTime', 'breakLiveDays', 'signMethod', 'state', 'action']
      }
    }
  },
  created () {
    const arr = []
    if (this.permission.includes('breakLive_activity_list')) {
      arr.push({
        key: 'actived',
        tab: '复播主播'
      })
    }
    if (this.permission.includes('breakLive_activity_apply')) {
      if (!this.permission.includes('breakLive_activity_list')) {
        this.queryParams.type = 'apply'
      }
       arr.push({
        key: 'apply',
        tab: '激活申请'
      })
    }
    this.tabListNoTitle = arr
  },
  mounted () {
    if (!(this.permission.includes('actor_operation_live') || this.permission.includes('actor_operation_video'))) {
      this.columnsActived = columnsActived.filter(item => item.dataIndex !== 'action')
    }
    this.createDownloadUrl()
    this.generateFileds()
    this.getStructureTreeHandle()
    this.getCountHandle()
    this.loadDataHandle()
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    handleTabChange (key) {
      this.loading = true
      clearTimeout(this.timer)
      this.queryParams.type = key
      this.generateFileds()
      this.paramsReset()
      this.timer = setTimeout(() => {
        this.loadDataHandle()
      }, 400)
    },

    handleTableChange (pagination, filters, sorter) {
      this.loading = true
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager

      this.queryParams = {
        ...this.queryParams,
        size: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      }
      this.loadDataHandle()
    },

    getStructureTreeHandle () {
      getStructureTree().then(res => {
        this.treeData = JSON.parse(JSON.stringify(createTree(res)))
      })
    },

    generateFileds () {
      switch (this.queryParams.type) {
        case 'actived':
          this.columns = this.columnsActived.filter(item => item.dataIndex !== 'state')
          break
        case 'apply':
          this.columns = this.columnsActived
          break
        default:
          break
      }
    },

    checkedChange () {
      this.tableColums = this.columns.filter(item => this.colunmsChecked.includes(item.dataIndex) || this.defaultColunm[this.queryParams.type].includes(item.dataIndex))
      localStorage.setItem(`cutoff-actived-${this.queryParams.type}`, JSON.stringify(this.colunmsChecked))
    },

    loadDataHandle () {
      if (this.queryParams.type === 'actived') {
        this.getCutoffActiedArtistsHandle()
      } else {
        this.getCutoffActiedArtistsApplyHandle()
      }
    },

    getCutoffActiedArtistsHandle () {
      getCutoffActiedArtists(this.queryParams).then(res => {
        const pagination = { ...this.pagination }
        this.defaultFiled = null
        pagination.total = res.totalCount
        this.loading = false
        res.list.forEach((item, index) => {
          item['uid'] = index
        })
        this.dataSource = res.list
        this.pagination = pagination
      })
    },

    getCutoffActiedArtistsApplyHandle () {
      getCutoffActiedApplyArtists(this.queryParams).then(res => {
        const pagination = { ...this.pagination }
        this.defaultFiled = null
        pagination.total = res.totalCount
        this.loading = false
        res.list.forEach((item, index) => {
          item['uid'] = index
        })
        this.dataSource = res.list
        this.pagination = pagination
      })
    },

    getCountHandle () {
      getCutoffActiedATabCount().then(res => {
        if (this.permission.includes('breakLive_activity_list')) {
          this.tabListNoTitle[0].tab = `${this.tabListNoTitle[0].tab} ${res.activityCount ? res.activityCount : 0}`
          if (this.permission.includes('breakLive_activity_apply')) {
            this.tabListNoTitle[1].tab = `${this.tabListNoTitle[1].tab} ${res.applyCount}`
          }
        } else {
          if (this.permission.includes('breakLive_activity_apply')) {
            this.tabListNoTitle[0].tab = `${this.tabListNoTitle[0].tab} ${res.applyCount}`
          }
        }
        // this.tabListNoTitle[0].value = `${this.tabListNoTitle[0].value}(${res.activityCount ? res.activityCount : 0})`
        // this.tabListNoTitle[1].tab = `${this.tabListNoTitle[1].tab}(${res.applyCount})`
      })
    },

    searchHandle (e) {
      e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.paramsReset(true)
        this.loadDataHandle()
      })
    },

    setFormFileds () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.belongDepartmentId = values.belongDepartmentId && values.belongDepartmentId.length > 0 ? values.belongDepartmentId[values.belongDepartmentId.length - 1] : undefined
          this.queryParams = {
            ...this.queryParams,
            ...values,
            lastOpenStartDate: values.percentDate ? values.percentDate[0] : undefined,
            lastOpenEndDate: values.percentDate ? values.percentDate[1] : undefined,
            percentDate: undefined
          }
        }
      })
      this.createDownloadUrl()
    },

    createDownloadUrl () {
      let url = ''
      for (const key in this.queryParams) {
        if (this.queryParams[key] && key !== 'page' && key !== 'size') {
          url = url ? `${url}&${key}=${this.queryParams[key]}` : `?${key}=${this.queryParams[key]}`
        }
      }
      this.downloadUrl = `${process.env.VUE_APP_API_BASE_URL}/activityAct/list/export${url}`
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
      this.paramsReset()
      this.loadDataHandle()
    },

    paramsReset (flag) {
      if (!flag) {
        this.form.resetFields()
      }
      this.setFormFileds()
      this.queryParams.page = this.pagination.current = 1
      this.queryParams.sortField = undefined
      this.queryParams.sortOrder = undefined
    },

    activeHandle (id) {
      this.applyId = id
      this.visible = true
    },

    finishHandle () {
      this.applyId = ''
      this.visible = false
    },

    disabledDate (current) {
      return current > moment().subtract(1, 'days')
    },

    displayRender ({ labels }) {
      return labels[labels.length - 1]
    }
  },
  computed: {
    ...mapGetters(['permission'])
  },
  watch: {
    columns (newValue) {
      if (newValue.length === 0) {
        return
      }
      let colunms = [] // 定义选中的colunm
      if (localStorage.getItem(`cutoff-actived-${this.queryParams.type}`)) {
        colunms = JSON.parse(localStorage.getItem(`cutoff-actived-${this.queryParams.type}`))
      } else {
        colunms = []
      }
      localStorage.setItem(`cutoff-actived-${this.queryParams.type}`, JSON.stringify(colunms))
      this.colunmsChecked = colunms
      this.checkArr = newValue.filter(item => !this.defaultColunm[this.queryParams.type].includes(item.dataIndex))
      this.tableColums = newValue.filter(item => colunms.includes(item.dataIndex) || this.defaultColunm[this.queryParams.type].includes(item.dataIndex))
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
