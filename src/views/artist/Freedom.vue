<template>
  <div class="container">
    <a-card
      class="card-title-large min-height"
      title="无运营主播"
      :bordered="false"
    >
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form" @submit="onSearch">
          <a-row :gutter="60">
            <a-col :md="8" :sm="24">
              <a-form-item label="抖音账号">
                <a-input placeholder="请输入" v-decorator="['searchStr']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="入会时间">
                <a-date-picker
                  value-format="YYYY-MM-DD"
                  v-decorator="['joinGuildDate']"
                  :disabledDate="disabledDate"
                  @change="onSearch"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="签约情况">
                <a-select
                  v-decorator="['signMethod']"
                  placeholder="请选择"
                  @change="onSearch"
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
              <a-form-item label="是否退会">
                <a-select
                  v-decorator="['retired']"
                  placeholder="请选择"
                  @change="onSearch"
                >
                  <a-select-option :value="1">
                    是
                  </a-select-option>
                  <a-select-option :value="2">
                    否
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="16" :sm="24">
              <span class="table-page-search-submitButtons" style="margin-bottom:24px;">
                <a-button style="margin-right:16px;" @click="resetFormFileds">重置</a-button>
                <a-button type="primary" @click="onSearch">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <s-table
        ref="table"
        row-key="tiktokLiveInfoId"
        :columns="columns"
        :data="loadDataHandle"
        showPagination="auto"
      >
        <div slot="nickName" slot-scope="text, record">
          <div class="flex-box">
            <div class="box-item">
              <a-popover placement="rightTop">
                <template slot="content">
                  <div class="box-item-pover">
                    <p class="title">{{ record.nickName }}</p>
                    <p>抖音号: {{ record.tiktokCode }}</p>
                    <p>抖音号(原): {{ record.tiktokCodeOrig }}</p>
                    <p>火山号: {{ record.volcanoCode }}</p>
                  </div>
                </template>
                <p class="title">{{ record.nickName }}</p>
                <p>抖音号: {{ record.tiktokCode }}</p>
              </a-popover>
            </div>
          </div>
        </div>
        <span slot="action" slot-scope="text, record">
          <a-button type="link" @click="detailHandle(record.tiktokLiveInfoId)">查看详情</a-button>
        </span>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { columns } from './tableColumns'
import { getArtistFreedomResource } from '@/api/artists'

export default {
  name: 'Artist',
  components: {
    STable
  },
  data () {
    return {
      artistCount: 0,

      queryParams: {
        searchStr: '',
        joinGuildDate: '',
        signMethod: '',
        retired: ''
      },
      columns,
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    if (!(this.permission.includes('actor_operation_live') || this.permission.includes('actor_operation_video'))) {
      this.columns = columns.filter(item => item.dataIndex !== 'action')
    }
  },
  methods: {
    loadDataHandle (parameter) {
      const requestParameters = Object.assign({}, parameter, this.queryParams, {
        retired: this.queryParams.retired === 1 ? true : (this.queryParams.retired === 2 ? false : '')
      })
      return getArtistFreedomResource(requestParameters).then(res => {
        this.checkDisabled = false
        if (this.artistCount <= 0) this.artistCount = res.totalCount
        return res
      })
    },

    onSearch (e) {
      e && e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.queryParams = {
              ...values
            }
            console.log(this.queryParams)
            this.$refs.table.refresh(true)
          }
        })
      })
    },
    resetFormFileds () {
      this.form.resetFields()
      this.onSearch()
      // this.$refs.table.refresh(true)
    },
    detailHandle (id) {
      this.$router.push({
        path: '/artists/detail',
        query: {
          id: id
        }
      })
    },
    onFreedomChange () {

    },
    disabledDate (current) {
      return current > moment().subtract(1, 'days')
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
