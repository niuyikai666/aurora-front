<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="抖音账号">
              <a-input placeholder="请输入" v-decorator="['searchStr']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="经纪人">
              <search-agent :searchFn="agentSearch" placeholder="请输入" v-decorator="['agentName']"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="入会时间">
              <a-date-picker
                value-format="YYYY-MM-DD"
                v-decorator="['joinGuildDate']"
                @change="searchHandle"
              />
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
                <a-select-option :value="4">
                  签约到期
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="是否退会">
              <a-select
                v-decorator="['retired']"
                placeholder="请选择"
                @change="searchHandle"
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
      <a-button
        type="primary"
        @click="download">
        <svg-icon class="icon aciton-icon-com" icon-class="export-icon"/>
        导出
      </a-button>
    </div>
    <s-table
      :columns="tableColums"
      :rowKey="(record, index) => index"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
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
      <template slot="totalReward" slot-scope="text, record">
        {{ record.totalReward !== null ? numberFormat(record.totalReward) : '-' }} {{ record.totalReward > 10000 ? '万' : '' }}
      </template>
      <template slot="yesterdayTotalReward" slot-scope="text, record">
        {{ record.yesterdayTotalReward !== null ? numberFormat(record.yesterdayTotalReward) : '-' }} {{ record.yesterdayTotalReward > 10000 ? '万' : '' }}
      </template>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="detailHandle(record.tiktokLiveInfoId)">查看详情</a-button>
      </span>
    </s-table>
  </div>
</template>

<script>
import { agentSearch } from '@/api/gold'
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { operateNoneColumns } from '../tableColumns'
import { getArtistFreedomResource } from '@/api/artists'
import searchAgent from '../../components/searchAgent'
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  components: {
    STable,
    searchAgent
  },
  data () {
    return {
      agentSearch,
      numberFormat,
      queryParams: {},
      form: this.$form.createForm(this),
      advanced: false,
      tableColums: operateNoneColumns
    }
  },
  mounted () {
  },

  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams, {
        retired: this.queryParams.retired === 1 ? true : (this.queryParams.retired === 0 ? false : '')
      })
      return getArtistFreedomResource(params).then(res => {
        return res
      })
    },
    disabledDate (current) {
      return current > moment().subtract(1, 'days')
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetFormFileds () {
      this.form.resetFields()
      this.searchHandle()
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const queryParams = {
              ...values,
              retired: values.retired === 1 ? true : (values.retired === 0 ? false : '')
            }
            console.log(queryParams)
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
              ...values
            }
            this.$refs.table.refresh(true)
          }
        })
      })
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
        path += `/freeAct/admin/bound/export${url}`
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
