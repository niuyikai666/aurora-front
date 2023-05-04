<template>
  <div class="pd24">
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="主播视频号ID" class="label-max-left">
              <a-input placeholder="请输入" v-decorator="['platformCode']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="主播视频号昵称" class="label-max-left1">
              <a-input placeholder="请输入" v-decorator="['nickName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="入驻时间" class="label-max-left">
              <a-range-picker
                value-format="YYYY-MM-DD"
                v-decorator="['joinGuildDate']"
                :disabledDate="disabledDate"
                @change="searchHandle"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="运营微信号" class="label-max-left">
              <a-input placeholder="请输入" v-decorator="['administratorWechat']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="是否有待绑定运营" class="label-max-left1">
              <a-select
                v-decorator="['hasToBind']"
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
          <a-col :span="24">
            <span class="flex-end">
              <a-button type="primary" @click="download">
                <svg-icon icon-class="export-icon" class="import-icon"></svg-icon>
                导出
              </a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      :columns="noneColumns"
      row-key="id"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    >
      <div slot="nickName" slot-scope="text, record">
        <p>{{ record.nickName }}</p>
        <p>视频号: {{ record.platformCode }}</p>
      </div>
    </s-table>
  </div>
</template>

<script>
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { noneColumns } from '../tableColumns'
export default {
  props: {
    fn: {
      type: Function,
      default: null
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
      advanced: true,
      noneColumns,
      treeData: []
    }
  },
  mounted () {
  },

  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams)
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
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const queryParams = {
              ...values,
              joinStartDate: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              joinEndDate: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
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
        const path = `${process.env.VUE_APP_API_BASE_URL}/wechatPrefill/free/export`
        for (const key in res) {
          if ((res[key] || res[key] === false) && key !== 'page' && key !== 'size' && key !== 'type') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
        console.log(url)
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
              joinStartDate: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              joinEndDate: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
              joinGuildDate: undefined
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
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}

</script>
<style lang='less' scoped>
@import '../../index.less';
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
