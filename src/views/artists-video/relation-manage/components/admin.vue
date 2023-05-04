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
            <a-form-item label="主播信息提交人" class="label-max-left">
              <a-input placeholder="请输入" v-decorator="['creatorName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="提交人所属组织" class="label-max-left1">
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
          <a-col :md="8" :sm="24">
            <a-form-item label="填写时间" class="label-max-left">
              <a-range-picker
                value-format="YYYY-MM-DD"
                v-decorator="['joinGuildDate']"
                :disabledDate="disabledDate"
                @change="searchHandle"
              />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="主播信息状态" class="label-max-left">
              <a-select
                v-decorator="['state']"
                placeholder="请选择"
                @change="searchHandle"
              >
                <a-select-option :value="1">
                  待匹配
                </a-select-option>
                <a-select-option :value="2">
                  匹配成功
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
      :columns="adminColumns"
      row-key="id"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    >
      <div slot="nickName" slot-scope="text, record">
        <p>{{ record.nickName }}</p>
        <p>视频号: {{ record.platformCode }}</p>
      </div>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="detailHandle(record.id)" style="margin-right:10px" v-if="record.state.code === 1">详情</a-button>
      </span>
    </s-table>
  </div>
</template>

<script>
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { adminColumns } from '../tableColumns'
import { getStructureTree } from '@/api/personnel'
import createTree from '@/utils/tree/generateTree'
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
      adminColumns,
      treeData: []
    }
  },
  mounted () {
    this.getStructureTreeHandle()
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
            values.departmentId = values.departmentId && values.departmentId.length > 0 ? values.departmentId[values.departmentId.length - 1] : undefined
            const queryParams = {
              ...values,
              beginDate: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              endDate: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
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
        const path = `${process.env.VUE_APP_API_BASE_URL}/wechatPrefill/admin/prefills/export`
        for (const key in res) {
          if ((res[key] || res[key] === false) && key !== 'page' && key !== 'size' && key !== 'type') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
        console.log(url)
        window.location.href = path + url
      })
    },
    getStructureTreeHandle () {
      getStructureTree().then(res => {
        this.treeData = JSON.parse(JSON.stringify(createTree(res)))
      })
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    searchHandle (e) {
      e && e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
            values.departmentId = values.departmentId && values.departmentId.length > 0 ? values.departmentId[values.departmentId.length - 1] : undefined
            this.queryParams = {
              ...values,
              beginDate: values.joinGuildDate ? values.joinGuildDate[0] : undefined,
              endDate: values.joinGuildDate ? values.joinGuildDate[1] : undefined,
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
          type: 2
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
