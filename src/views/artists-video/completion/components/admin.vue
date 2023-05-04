<template>
  <div>
    <div class="table-page-search-wrapper">
      <a-form layout="inline" :form="form" @submit="searchHandle">
        <a-row :gutter="60">
          <a-col :md="8" :sm="24">
            <a-form-item label="主播视频号ID" class="label-max-left">
              <a-input placeholder="请输入" v-decorator="['platformCode']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="运营人">
              <a-input placeholder="请输入" v-decorator="['operatorEmpName']" />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="提交人所属组织" class="label-max-left">
              <a-cascader
                placeholder="请选择"
                v-decorator="['operatorDepId']"
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
            <a-form-item label="入会时间" class="label-max-left">
              <a-range-picker
                value-format="YYYY-MM-DD"
                v-decorator="['joinGuildDate']"
                :disabledDate="disabledDate"
                @change="searchHandle"
              />
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
          <a-col :span="24">
            <span class="flex-justify mb16">
              <div>
                <a-button class="mr16" type="primary" @click="editModal(1)">批量修改运营</a-button>
                <a-button class="mr16" type="primary" @click="editModal(2)" v-if="permission.includes('wechat_actor_batch_operation')">批量修改关系</a-button>
                <a-button class="mr16" type="primary" @click="toRecord" v-if="permission.includes('wechat_actor_operation_change_list')">关系修改记录</a-button>
              </div>
              <div>
                <a-button class="mr16" type="primary" @click="importVisible = true">导入关系</a-button>
                <a-button type="primary" @click="showModal">
                  <svg-icon icon-class="export-icon" class="import-icon"></svg-icon>
                  导出
                </a-button>
              </div>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      :columns="adminColumns"
      row-key="wechatInfoId"
      :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
      :data="loadData"
      :scroll="{x: 1200}"
      ref="table"
    >
      <div slot="nickName" slot-scope="text, record">
        <p>{{ record.nickName }}</p>
        <p>视频号: {{ record.platformCode }}</p>
      </div>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="detailHandle(record.wechatInfoId)" style="margin-right:10px">详情</a-button>
      </span>
    </s-table>
    <a-modal v-model="visible" title="导出字段" @ok="handleOk" :width="790">
      <div class="box">
        <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange" class="checkAll">
          全选
        </a-checkbox>
      </div>
      <div class="checkbox">
        <a-checkbox-group v-model="checkedList" :options="options" @change="onCheckChange" />
      </div>
    </a-modal>
    <import-modal :visible="importVisible" @cancel="importVisible = false" @refresh="searchHandle"/>
    <edit-modal :selectedRowKeys="selectedRowKeys" :type="modalType" :visible="editVisible" @cancel="editVisible = false" @refresh="searchHandle"></edit-modal>
  </div>
</template>

<script>
import importModal from './importModal'
import editModal from './editModal'
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { adminColumns } from '../tableColumns'
import { getStructureTree } from '@/api/personnel'
import { getExportColumns } from '@/api/gold'
import createTree from '@/utils/tree/generateTree'
export default {
  props: {
    fn: {
      type: Function,
      default: null
    }
  },
  components: {
    STable,
    importModal,
    editModal
  },
  data () {
    return {
      numberFormat,
      queryParams: {},
      form: this.$form.createForm(this),
      advanced: true,
      adminColumns,
      treeData: [],
      selectedRowKeys: [],
      importVisible: false,
      editVisible: false,
      visible: false,
      modalType: 0,
      checkedList: [],
      options: [],
      checkAll: false,
      indeterminate: false
    }
  },
  mounted () {
    this.getStructureTreeHandle()
    this.getOptions()
  },

  methods: {
    loadData (params) {
      Object.assign(params, this.queryParams)
      return this.fn(params).then(res => {
        return res
      })
    },
    editError () {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error('请选择主播')
        return false
      }
      return true
    },
    editModal (type) {
      if (this.editError()) {
        this.modalType = type
        this.editVisible = true
      }
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
            values.operatorDepId = values.operatorDepId && values.operatorDepId.length > 0 ? values.operatorDepId[values.operatorDepId.length - 1] : undefined
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
        const path = `${process.env.VUE_APP_API_BASE_URL}/wechat/info/baseInfoExport`
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
            values.operatorDepId = values.operatorDepId && values.operatorDepId.length > 0 ? values.operatorDepId[values.operatorDepId.length - 1] : undefined
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
      console.log(id)
      this.$router.push({
        path: '/artists-video/detail',
        query: {
          id: id,
          type: 1
        }
      })
    },
    onSelectChange (selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    toRecord () {
      this.$router.push({
        path: '/artists-video/completion/record'
      })
    },
    showModal () {
      this.visible = true
      const arr = this.options.map((item, index) => {
        return item.value
      }).join(',').split(',')
      this.checkedList = arr
      this.checkAll = true
      this.indeterminate = false
    },
    getOptions () {
      getExportColumns().then(res => {
        res.forEach(item => {
          item.label = item.value
          item.value = item.name
        })
        this.options = res
      })
    },
    onCheckAllChange (e) {
      const arr = this.options.map((item, index) => {
        return item.value
      }).join(',').split(',')
      Object.assign(this, {
        checkedList: e.target.checked ? arr : [],
        indeterminate: false,
        checkAll: e.target.checked
      })
      console.log(this.checkedList)
    },
    onCheckChange (checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.options.length
      this.checkAll = checkedList.length === this.options.length
    },
    handleOk () {
      if (this.checkedList.length === 0) {
        this.$message.error('请选择导出字段')
        return
      }
      this.getParams().then(res => {
        let url = ''
        const path = `${process.env.VUE_APP_API_BASE_URL}/wechat/info/baseInfoExport`
        url += `?exportFields=${this.checkedList}`
        for (const key in res) {
          if ((res[key] || res[key] === false) && key !== 'page' && key !== 'size' && key !== 'type') {
            url = url ? `${url}&${key}=${res[key]}` : `?${key}=${res[key]}`
          }
        }
        console.log(path + url)
        window.location.href = path + url
        this.visible = false
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
