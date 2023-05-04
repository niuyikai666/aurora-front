<template>
  <div class="pt24">
    <div class="flexbox">
      <div class="flex1">
        <!-- <a-input-search placeholder="请输入主播昵称或ID" icon="search" style="width:230px;" @search="onSearch" /> -->
        <a-auto-complete
          style="width: 230px;"
          placeholder="请输入抖音昵称/抖音号/抖音号原/火山号/火山号原"
          option-label-prop="title"
          allowClear
          v-model="artistInfo"
          @search="onArtistSearch"
          @select="onSelect"
        >
          <template slot="dataSource">
            <a-select-option v-for="item in artistSource" :key="item.id" :title="item.nickName">
              <dl class="search-list">
                <dd>昵称：{{ item.nickName || '-' }}</dd>
                <dd>抖音号：{{ item.account || '-' }}</dd>
              </dl>
            </a-select-option>
          </template>
          <a-input class="auto-input">
            <a-icon slot="suffix" type="search" />
          </a-input>
        </a-auto-complete>

        <a-checkbox class="ml24" v-model="queryParams.isCheck">
          道具流水前30名主播
        </a-checkbox>

        <div class="cascader-custom report-custom" v-if="originTreeData.length > 0">
          数据范围：{{ originTreeData && originTreeData.length > 0 ? originTreeData.find(item => item.id === queryParams.departmentIds).fullName : '' }}
          <a-icon class="antion-custom" type="down" />
          <el-cascader
            ref="cascader"
            v-model="queryParams.departmentIds"
            :options="treeData"
            :props="{ expandTrigger: 'hover', checkStrictly: true }"
            :show-all-levels="false"
            :dropDownVisible="false"
            @change="changeDepartment"
          >
            <template slot-scope="{ data }">
              <span :title="data.fullName">{{ data.label }}</span>
            </template>
          </el-cascader>
        </div>
      </div>
      <div class="right-con">
        <a-range-picker
          style="width: 250px;"
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          :disabledDate="disabledDate"
          @change="onDateChange"
        />
        <a-button v-if="permission.includes('tiktok_live_info_dep_export')" type="primary" @click="exportHandle" style="margin-left: 24px;">
          <svg-icon icon-class="export-icon" class="aciton-icon-com"></svg-icon>
          导出
        </a-button>
        <a-button class="ml10" type="primary" @click="importVisible = true" v-if="permission.includes('tiktok_month_detail_export')"><svg-icon icon-class="export-icon" class="aciton-icon-com"></svg-icon>导出关系表</a-button>
      </div>
    </div>
    <div class="pd24">
      <table-1 v-if="hasFinish" :params="queryParams" :downloadPermmison="hasDownloadDetailPermisson" :func="getReportLiveListManage" />
    </div>
    <import-modal :visible="importVisible" @cancel="importVisible = false"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import qs from 'qs'
import moment from 'moment'
import { getReportLiveListManage, getStructureTree, reportLiveSearch, getNewTime } from '@/api/report'
import createTree from '@/utils/tree/generateTree'
import Table1 from './components/Table1'
import importModal from './components/importModal'

export default {
  name: 'ReportLiveOperate',
  components: {
    Table1,
    importModal
  },
  data () {
    return {
      queryParams: {
        id: '',
        departmentIds: '',
        startDate: '',
        endDate: '',
        isCheck: false
      },
      dateRange: [],
      // preMonthStart: moment().subtract(1, 'months').startOf('month'),
      // preMonthEnd: moment().subtract(1, 'months').endOf('month'),
      // monthStart: moment().startOf('month'),
      // monthEnd: moment().endOf('month'),
      treeData: [],
      originTreeData: [],

      getReportLiveListManage,
      hasDownloadDetailPermisson: false,

      artistInfo: '',
      artistSource: [],

      endNewTime: '',

      hasFinish: false,
      importVisible: false
    }
  },
  mounted () {
    this.interval = setInterval(function () {
      document.querySelectorAll('.el-cascader-node__label').forEach(el => {
        el.onclick = function () {
          if (this.previousElementSibling) this.previousElementSibling.click()
        }
      })
    }, 1000)
    if (this.permission.includes('tiktok_live_info_daily_dep_export')) {
      this.hasDownloadDetailPermisson = true
    }
    this.handleGetNewTime()
    this.getStructureTreeHandle()
  },
  methods: {
    handleGetNewTime () {
      getNewTime().then(time => {
        const data = new Date(time)
        this.endNewTime = time
        this.queryParams.endDate = time
        this.queryParams.startDate = moment(data).startOf('month').format('YYYY-MM-DD')
        this.dateRange = [moment(data).startOf('month').format('YYYY-MM-DD'), time]

        this.$nextTick(() => {
          this.hasFinish = true
        })
      })
    },
    // 获取分公司下拉列表
    getStructureTreeHandle () {
      getStructureTree().then(res => {
        const blankData = {
          id: '',
          label: '全部',
          value: '',
          fullName: '全部',
          type: {
            code: 0
          }
        }
        this.originTreeData = [
          blankData,
          ...res
        ]
        this.treeData = [
          blankData,
          ...createTree(res.filter(item => item.parentId !== 0))
        ]
      })
    },
    changeDepartment (val) {
      this.queryParams.departmentIds = val[val.length - 1]
    },
    onDateChange (dateArr) {
      if (dateArr.length > 0) {
        this.queryParams.startDate = dateArr[0]
        this.queryParams.endDate = dateArr[1]
      } else {
        this.queryParams.startDate = ''
        this.queryParams.endDate = ''
      }
    },
    onArtistSearch (query) {
      if (query.trim() === '') return
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.handleArtistSearch(query)
      }, 200)
    },
    handleArtistSearch (query) {
      reportLiveSearch({ keyword: query }).then(res => {
        this.artistSource = []
        if (res.length > 0) {
          this.artistSource = res.map(item => {
            item.id = item.id + ''
            return item
          })
        }
      })
    },
    onSelect (value) {
      window.cancle.artistLiveManageTable && window.cancle.artistLiveManageTable() // 取消正在请求的列表接口
      this.queryParams.id = value
    },
    exportHandle () {
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/tiktok/live/info/dep/export?${qs.stringify(this.queryParams)}`
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    disabledDate (time) {
      return time.valueOf() > new Date(this.endNewTime) || time.valueOf() < new Date((new Date(this.endNewTime)).getTime() - 150 * 24 * 3600 * 1000)
      // return time > moment().subtract(0, 'days')
    }
  },
  computed: {
    ...mapGetters(['permission'])
  },
  watch: {
    'queryParams.departmentIds' () {
      this.$refs.cascader.dropDownVisible = false
    },
    artistInfo (value) {
      window.cancle.artistLiveManageTable && window.cancle.artistLiveManageTable() // 取消正在请求的列表接口
      if (value === '' || value === undefined) {
        this.queryParams.id = ''
      }
    }
  },
  destroyed () {
    clearInterval(this.interval)
  }
}
</script>

<style lang="less" scoped>
  @import '../index.less';
  .flexbox {
    display: flex;
    padding: 0 24px;
    .flex1 {
      flex: 1;
    }
  }
  .search-list {
    margin-bottom: 0;
    border-bottom: solid 1px #eee;
    padding-bottom: 5px;
    dd {
      margin-bottom: 0;
    }
  }
</style>
