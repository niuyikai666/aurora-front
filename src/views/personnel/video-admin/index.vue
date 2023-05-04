<template>
  <div class="container">
    <a-card
      class="card-title-large"
      title="视频号管理员"
      :bordered="false"
    >
      <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form" @submit="searchHandle">
          <a-row :gutter="60">
            <a-col :md="8" :sm="24">
              <a-form-item label="管理员微信号" class="label-max-left">
                <a-input placeholder="请输入" v-decorator="['wechat']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="绑定运营姓名" class="label-max-left">
                <a-input placeholder="请输入" v-decorator="['employeeName']" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="运营所属组织" class="label-max-left">
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
              <a-form-item label="账号绑定状态" class="label-max-left">
                <a-select
                  placeholder="请选择"
                  v-decorator="['bindState']"
                >
                  <a-select-option :value="1">已绑定</a-select-option>
                  <a-select-option :value="0">未绑定</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="!advanced && 24 || 24" :sm="24">
              <span class="table-page-search-submitButtons" :class="{'up': advanced}">
                <a-button @click="resetFormFileds">重置</a-button>
                <a-button style="margin-left: 12px" type="primary" html-type="submit">查询</a-button>
              </span>
            </a-col>
            <a-col :span="24">
              <span class="flex-end">
                <a-button class="mr10" type="primary" @click="visible = true">
                  导入运营关系
                </a-button>
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
        :columns="videoAdminColumns"
        row-key="id"
        :data="loadData"
        :scroll="{x: 1200}"
        ref="table"
      >
        <span slot="action" slot-scope="text, record">
          <a-button type="link" @click="setHandle(record)">设置</a-button>
        </span>
      </s-table>
    </a-card>
    <import-modal :visible="visible" @cancel="visible = false" @refresh="searchHandle"/>
    <set-wechat :visible="setVisible" @cancel="setVisible = false" :data="data" @refresh="searchHandle"/>
  </div>
</template>
<script>
import importModal from '../components/importModal'
import setWechat from '../components/setWechat'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { videoAdminColumns } from '../tableColumns'
import { getStructureTree, getVideoAdminList } from '@/api/personnel'
import createTree from '@/utils/tree/generateTree'
export default {
  components: {
    STable,
    importModal,
    setWechat
  },
  data () {
    return {
      queryParams: {},
      form: this.$form.createForm(this),
      advanced: true,
      videoAdminColumns,
      treeData: [],
      visible: false,
      id: '',
      setVisible: false,
      data: {}
    }
  },
  mounted () {
    this.getStructureTreeHandle()
  },

  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams)
      return getVideoAdminList(params).then(res => {
        return res
      })
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
              ...values
            }
            resolve(queryParams)
          }
        })
      })
    },
    download () {
      this.getParams().then(res => {
        let url = ''
        const path = `${process.env.VUE_APP_API_BASE_URL}/wechatManager/export/administrator/wechat`
        for (const key in res) {
          if ((res[key] || res[key] === false) && key !== 'page' && key !== 'size' && key !== 'type') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
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
              ...values
            }
            this.$refs.table.refresh(true)
          }
        })
      })
    },
    setHandle (val) {
      this.data = val
      this.setVisible = true
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}

</script>
<style lang='less' scoped>
// @import '../index.less';
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
.mb16{
  margin-bottom:16px;
}
.mr16{
  margin-right: 16px;
}
.box {
    // padding: 10px 0 0 16px;
    /deep/ .ant-checkbox-group {
      .ant-checkbox-group-item {
        width: 30%;
        margin-bottom: 8px;
      }
    }
  }
  .checkbox{
    /deep/ .ant-checkbox-group {
      .ant-checkbox-group-item {
        width: 30%;
        margin-bottom: 8px;
      }
    }
  }
  .checkAll{
    margin-bottom: 8px;
  }
</style>
