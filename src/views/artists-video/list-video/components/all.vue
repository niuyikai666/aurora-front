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
            <a-form-item label="运营">
              <a-input placeholder="请输入" v-decorator="['operatorEmpName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="招募" class="label-max-left">
              <a-input placeholder="请输入" v-decorator="['recruitName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="入会时间" class="label-max-left form-flex">
              <a-range-picker
                :disabled="form.getFieldValue('emptyJoinDate')"
                class="flex-item"
                value-format="YYYY-MM-DD"
                v-decorator="['joinGuildDate']"
                :disabledDate="disabledDate"
                @change="searchHandle"
              />
              <a-checkbox v-decorator="['emptyJoinDate']" class="flex-right" @change="changeCheckbox">无入会时间</a-checkbox>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="所属组织">
              <a-cascader
                placeholder="请选择"
                v-decorator="['departmentId']"
                :options="treeData"
                change-on-select
                :allow-clear="false"
                expand-trigger="hover"
                :display-render="displayRender"
                @change="searchHandle"
              />
            </a-form-item>
          </a-col>
          <a-col :md="!advanced && 24 || 24" :sm="24">
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
      :columns="videoManageAllColumns"
      row-key="id"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    >
      <div slot="nickName" slot-scope="text, record">
        <p>{{ record.nickName }}</p>
        <p>视频号: {{ record.platformCode }}</p>
      </div>
      <template slot="rewardMonth" slot-scope="text, record">
        {{ record.rewardMonth !== null ? numberFormat(record.rewardMonth) : '-' }} {{ record.rewardMonth > 10000 ? '万' : '' }}
      </template>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="detailHandle(record.wechatInfoId)" style="margin-right:10px">详情</a-button>
      </span>
    </s-table>
  </div>
</template>

<script>
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { videoManageAllColumns } from '../tableColumns'
import createTree from '@/utils/tree/generateTree'
import { getStructureTree } from '@/api/personnel'

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
      videoManageAllColumns,
      treeData: []
    }
  },
  created () {
    this.getStructureTreeHandle()
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
    getStructureTreeHandle () {
      getStructureTree().then(res => {
        this.treeData = JSON.parse(JSON.stringify(createTree(res)))
      })
    },
    getParams () {
      return new Promise((resolve, reject) => {
        this.form.validateFields((err, values) => {
          if (!err) {
            const queryParams = {
              ...values,
              joinStartDate: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              joinEndDate: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
              joinGuildDate: undefined,
              departmentId: values.departmentId && values.departmentId.length > 0 ? values.departmentId[values.departmentId.length - 1] : undefined
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
              joinGuildDate: undefined,
              departmentId: values.departmentId && values.departmentId.length > 0 ? values.departmentId[values.departmentId.length - 1] : undefined
            }
            this.$refs.table.refresh(true)
          }
        })
      })
    },
    download () {
      this.getParams().then(res => {
        let url = ''
        const path = `${process.env.VUE_APP_API_BASE_URL}/wechatManager/all/export`
        for (const key in res) {
          if ((res[key] || res[key] === false) && key !== 'page' && key !== 'size' && key !== 'type') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
        console.log(url)
        window.location.href = path + url
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
    },
    changeCheckbox (e) {
      this.$nextTick(() => {
        if (this.form.getFieldValue('emptyJoinDate')) {
          this.form.setFieldsValue({
            'joinGuildDate': undefined
          })
        }
        this.searchHandle()
      })
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
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
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
