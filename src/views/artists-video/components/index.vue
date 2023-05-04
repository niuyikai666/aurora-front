<template>
  <a-row>
    <a-col class="lg-24">
      <top-tip-video :time="updateTime"/>
      <a-card
        class="card-custom head-mb5"
        style="width:100%"
        :bordered="false"
        :tabList="tabListNoTitle"
        activeTabKey="all"
        title="主播列表-视频号"
      >
        <div slot="extra" v-if="permission.includes('wechat_live_infos_import')">
          <a-button type="primary" @click="importHandle"><svg-icon class="icon" icon-class="import" style="margin-right:8px; color:#fff;" /> 导入</a-button>
        </div>
        <div class="block"></div>
        <div class="pd24">
          <div class="table-page-search-wrapper">
            <a-form layout="inline">
              <a-row :gutter="60">
                <a-col :md="8" :sm="24">
                  <a-form-item label="主播昵称">
                    <a-input placeholder="请输入" v-model="queryParams.nickname" @pressEnter="searchHandle" />
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-button @click="resetFormFileds">重置</a-button>
                  <a-button style="margin-left: 12px" type="primary" @click="searchHandle">查询</a-button>
                </a-col>
              </a-row>
            </a-form>
          </div>
          <a-table
            :columns="videoColumns"
            row-key="id"
            :data-source="dataSource"
            :pagination="pagination"
            :loading="loading"
            @change="handleTableChange"
          >
            <div slot="nickname" slot-scope="text, record">
              <div class="flex-box">
                <div class="box-item">
                  <p>{{ record.nickname }}</p>
                </div>
              </div>
            </div>
          </a-table>
        </div>
      </a-card>
      <import-video v-if="visibleImport" :visible="visibleImport" @cancel="visibleImport = false" />
    </a-col>
  </a-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import TopTipVideo from '../components/TopTipVideo'
import TitleTip from '../components/TitleTip'
import { getVideoArtists, getCountVideoNum, getUpdateTime } from '@/api/artists'
import { videoColumns } from './tableColumns'
import Ellipsis from '@/components/Ellipsis'
import { numberFormat } from '@/utils/util'
import importVideo from '../components/importVideo'
// import timeRange from '@/utils/timeRange'

export default {
  name: 'ArtistsList',
  components: {
    STable,
    Ellipsis,
    TopTipVideo,
    TitleTip,
    importVideo
  },
  data () {
    return {
      advanced: false,
      tabListNoTitle: [],
      tabListNoTitleSource: [
        {
          key: 'all',
          tab: '全部主播'
        }
      ],
      updateTime: '',
      loading: true,
      dataSource: [],
      pagination: {},
      columns: [],
      queryParams: {
        nickname: '',
        page: 1,
        size: 10
      },
      numberFormat,
      videoColumns,
      visibleImport: false
    }
  },
  created () {
  },
  mounted () {
    this.tabListNoTitle = this.tabListNoTitleSource
    this.loadDataHandle()
    // this.getUpdateTimeHandle()
    this.getCountHandle()
  },
  methods: {
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

    async loadDataHandle () {
      // 截流
      window.cancle.artistVideoTable && window.cancle.artistVideoTable()
      this.loading = true
      const res = await getVideoArtists(this.queryParams)
      if (!res) return
      const pagination = { ...this.pagination }
      this.defaultFiled = null
      pagination.total = res.totalCount
      this.loading = false
      this.dataSource = res.list
      this.pagination = pagination
    },

    getCountHandle () {
      getCountVideoNum().then(res => {
        this.tabListNoTitle[0].tab = `全部主播 ${res.ALL}`
        this.updateTime = res.latestUpdateTime
      })
    },

    getUpdateTimeHandle () {
      getUpdateTime().then(res => {
        this.updateTime = res
      })
    },

    searchHandle () {
      if (this.loading) return
      this.loadDataHandle()
    },

    resetFormFileds () {
      this.paramsReset()
      this.loadDataHandle()
    },

    paramsReset () {
      this.queryParams.nickname = ''
      this.queryParams.page = this.pagination.current = 1
      this.queryParams.sortField = undefined
      this.queryParams.sortOrder = undefined
    },

    importHandle () {
      this.visibleImport = true
    }
  },
  computed: {
    ...mapGetters(['permission'])
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
