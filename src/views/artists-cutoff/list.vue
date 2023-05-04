<template>
  <a-row>
    <a-col class="lg-24">
      <a-card
        class="card-custom head-mb5 min-height"
        title="断播主播列表"
        :bordered="false"
        :tabList="tabListNoTitle"
        :activeTabKey="queryParams.type"
        @tabChange="key => handleTabChange(key)"
      >
        <div slot="extra">
          <a :href="downloadUrl">
            <a-button type="primary" icon="download">导出</a-button>
          </a>
        </div>
        <div class="block"></div>
        <div class="pd24">
          <div class="table-page-search-wrapper">
            <a-form layout="inline" :form="form">
              <a-row :gutter="60">
                <a-col :md="8" :sm="24">
                  <a-form-item label="抖音账号">
                    <a-input placeholder="请输入" v-decorator="['trillNumber']" />
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
                    />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="招募">
                    <a-input placeholder="请输入" v-decorator="['recruitName']" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="运营">
                    <a-input placeholder="请输入" v-decorator="['operatorName']" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="断播区间" class="cutoff-number">
                    <a-input-group class="input-group">
                      <a-input-number class="start-number" :min="0" placeholder="开始天" suffix="天" v-decorator="['startDays']"/>
                      <a-input
                        class="medium-icon"
                        placeholder="-"
                        disabled
                      />
                      <a-input-number class="end-number" :min="0" placeholder="结束天" suffix="天" v-decorator="['endDays']"/>
                    </a-input-group>
                  </a-form-item>
                </a-col>
                <template v-if="advanced">
                  <a-col :md="8" :sm="24">
                    <a-form-item label="签约情况">
                      <a-select
                        v-decorator="['signMethod']"
                        placeholder="请选择"
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
                  <a-col :md="8" :sm="24">
                    <a-form-item v-if="queryParams.type === 'all'" label="是否可激活">
                      <a-select
                        v-decorator="['canActivity']"
                        placeholder="请选择"
                      >
                        <a-select-option :value="1">
                          是
                        </a-select-option>
                        <a-select-option :value="0">
                          否
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                </template>
                <a-col :md="!advanced && 8 || 16" :sm="24">
                  <span class="table-page-search-submitButtons" :class="{'up': advanced}">
                    <a-button style="margin-right:16px;" @click="resetFormFileds">重置</a-button>
                    <a-button type="primary" @click="searchHandle">查询</a-button>
                    <a @click="toggleAdvanced" style="margin-left: 16px">
                      {{ advanced ? '收起' : '展开' }}
                      <a-icon :type="advanced ? 'up' : 'down'"/>
                    </a>
                  </span>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <div class="clearfix">
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
              <div class="fr more-action">
                <a-icon type="setting" class="pointer"/>
                更多指标
              </div>
            </a-popover>
          </div>
          <a-table
            :columns="tableColums"
            row-key="id"
            :data-source="dataSource"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
          >
            <!-- :scroll="{x: 1400}" -->
            <span slot="customActive">
              是否可激活
              <a-tooltip placement="topRight">
                <template slot="title">
                  <span>是否可激活：断播30天以上的主播</span>
                </template>
                <a-icon style="position:relative; top:-10px; cursor:pointer;" type="question-circle" />
              </a-tooltip>
            </span>
            <div slot="nickName" slot-scope="text, record">
              <div class="flex-box">
                <div class="box-item">
                  <a-popover placement="rightTop">
                    <template slot="content">
                      <div class="box-item-pover">
                        <p class="title">{{ record.nickname }}</p>
                        <p>抖音号: {{ record.tikTokCode }}</p>
                        <p>抖音号(原): {{ record.tikTokCodeOrig }}</p>
                        <p>火山号: {{ record.volcanoCode }}</p>
                      </div>
                    </template>
                    <p>{{ record.nickname }}</p>
                    <p>抖音号: {{ record.tikTokCode }}</p>
                  </a-popover>
                </div>
              </div>
            </div>
            <template slot="operatorDepartmentName" slot-scope="text">
              <a-tooltip placement="rightTop">
                <template slot="title">
                  <span>{{ text }}</span>
                </template>
                <div class="table-struc-con">
                  {{ text }}
                </div>
              </a-tooltip>
            </template>
            <template slot="stopBroadcastInterval" slot-scope="text, record">
              {{ record.stopBroadcastInterval ? record.stopBroadcastInterval.msg : '-' }}
            </template>
            <template slot="signMethod" slot-scope="text, record">
              {{ record.signMethod ? record.signMethod.msg : '-' }}
            </template>
            <template slot="monthRewardMax" slot-scope="text, record">
              {{ numberFormat(record.monthRewardMax) }} {{ record.monthRewardMax > 10000 ? '万' : '' }}
            </template>
            <span slot="action" slot-scope="text, record">
              <a-button type="link" @click="detailHandle(record.id)">详情</a-button>
            </span>
          </a-table>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { getCutoffArtists, getCountCutoff } from '@/api/artists'
import { getStructureTree } from '@/api/personnel'
import { columns } from './tableColumns'
import Ellipsis from '@/components/Ellipsis'
import { numberFormat } from '@/utils/util'
import moment from 'moment'
import createTree from '@/utils/tree/generateTree'

export default {
  name: 'ArtistsList',
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      advanced: false,
      tabListNoTitle: [
        {
          key: 'canActivity',
          tab: '可激活主播'
        },
        {
          key: 'all',
          tab: '全部'
        }
      ],

      loading: true,
      dataSource: [],
      pagination: {},
      columns,
      queryParams: {
        type: 'canActivity',
        page: 1,
        size: 10
      },

      numberFormat,
      timer: null,

      form: this.$form.createForm(this),
      downloadUrl: '',

      treeData: [],
      colunmsChecked: [],
      tableColums: [],
      checkArr: [],
      defaultColunm: {
        canActivity: ['nickName', 'stopBroadcastInterval', 'signMethod', 'monthRewardMax', 'action'],
        all: ['nickName', 'stopBroadcastInterval', 'signMethod', 'monthRewardMax', 'canActivity', 'action']
      }
    }
  },
  mounted () {
    if (!(this.permission.includes('actor_operation_live') || this.permission.includes('actor_operation_video'))) {
      this.columns = columns.filter(item => item.dataIndex !== 'action')
    }
    this.createDownloadUrl()
    this.getStructureTreeHandle()
    this.getCountHandle()
    this.generateFileds()
    this.loadDataHandle()
  },
  methods: {
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    handleTabChange (key) {
      this.loading = true
      this.queryParams.type = key
      this.generateFileds()
      this.paramsReset()
      this.loadDataHandle()
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

    async loadDataHandle () {
      window.cancle.artistCutOffTable && window.cancle.artistCutOffTable()
      const res = await getCutoffArtists(this.queryParams)
      if (!res) return
      const pagination = { ...this.pagination }
      this.defaultFiled = null
      pagination.total = res.totalCount
      this.loading = false
      this.dataSource = res.list
      this.pagination = pagination
    },

    getCountHandle () {
      getCountCutoff().then(res => {
        this.tabListNoTitle[0].tab = `${this.tabListNoTitle[0].tab} ${res.canActivityCount}`
        this.tabListNoTitle[1].tab = `${this.tabListNoTitle[1].tab} ${res.allCount}`
        // this.tabListNoTitle[2].tab = `${this.tabListNoTitle[2].tab} ${res.outCount}`
        // this.tabListNoTitle[3].tab = `${this.tabListNoTitle[3].tab} ${res.inCount}`
      })
    },

    generateFileds () {
      if (this.queryParams.type === 'all') {
        this.columns = columns
      } else {
        this.columns = this.columns.filter(item => item.dataIndex !== 'canActivity')
      }
    },

    checkedChange () {
      this.tableColums = this.columns.filter(item => this.colunmsChecked.includes(item.dataIndex) || this.defaultColunm[this.queryParams.type].includes(item.dataIndex))
      localStorage.setItem(`cutoff-list-${this.queryParams.type}`, JSON.stringify(this.colunmsChecked))
    },

    selectChange () {
      clearTimeout(this.timer)
      this.paramsReset()
      this.timer = setTimeout(() => {
        this.getCountHandle()
        this.loadDataHandle()
      }, 2000)
    },

    searchHandle () {
      if (this.loading) return
      this.loading = true
      this.paramsReset(true)
      this.loadDataHandle()
    },

    setFormFileds () {
      this.form.validateFields((err, values) => {
        if (!err) {
          values.belongDepartmentId = values.belongDepartmentId && values.belongDepartmentId.length > 0 ? values.belongDepartmentId[values.belongDepartmentId.length - 1] : undefined
          this.queryParams = {
            ...this.queryParams,
            ...values
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
      this.downloadUrl = `${process.env.VUE_APP_API_BASE_URL}/stop/broadcasting/export${url}`
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
      if (localStorage.getItem(`cutoff-list-${this.queryParams.type}`)) {
        colunms = JSON.parse(localStorage.getItem(`cutoff-list-${this.queryParams.type}`))
      } else {
        colunms = []
      }
      localStorage.setItem(`cutoff-list-${this.queryParams.type}`, JSON.stringify(colunms))
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
