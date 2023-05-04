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
            <a-form-item label="主播视频号昵称" class="label-max-left">
              <a-input placeholder="请输入" v-decorator="['nickName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="招募">
              <a-input placeholder="请输入" v-decorator="['recruitName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="入会时间" class="label-max-left form-flex">
              <a-range-picker
                class="flex-item"
                value-format="YYYY-MM-DD"
                v-decorator="['joinGuildDate']"
                :disabledDate="disabledDate"
                @change="searchHandle"
              />
              <a-checkbox v-decorator="['emptyJoinDate']" class="flex-right" @change="searchHandle">无入会时间</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 16 || 16" :sm="24">
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
    <s-table
      :columns="myVideoColumns"
      row-key="id"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    >
      <div slot="nickName" slot-scope="text, record">
        <p>{{ record.nickName }}</p>
        <p>视频号: {{ record.wechatInfoId }}</p>
      </div>
      <template slot="rewardMonth" slot-scope="text, record">
        {{ record.rewardMonth !== null ? numberFormat(record.rewardMonth) : '-' }} {{ record.rewardMonth > 10000 ? '万' : '' }}
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
import { myVideoColumns } from '../tableColumns'
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
      advanced: true,
      myVideoColumns
    }
  },
  mounted () {},

  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams)
      return this.fn(params).then(res => {
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
        path: '/artists-video/detail',
        query: {
          id: id,
          type: 1
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
