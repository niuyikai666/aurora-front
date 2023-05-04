<template>
  <div class="container">
    <a-card
      class="card-title-large"
      title="公告管理"
      :bordered="false"
    >
      <div slot="extra">
        <div class="opt-con">
          <div class="btn-group">
            <a-button
              type="primary"
              icon="plus-circle"
              @click="addHandle">新增公告</a-button>
          </div>
        </div>
      </div>
      <!-- <div class="table-page-search-wrapper">
        <a-form layout="inline" :form="form">
          <a-row :gutter="60">
            <a-col :md="8" :sm="24">
              <a-form-item label="创建时间">
                <a-date-picker
                  value-format="YYYY-MM-DD"
                  v-decorator="['createDate']"
                  :disabledDate="disabledDate"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="公告类型">
                <a-select
                  v-decorator="['status']"
                  placeholder="请选择"
                >
                  <a-select-option value="1">
                    系统公告
                  </a-select-option>
                  <a-select-option value="2">
                    任务公告
                  </a-select-option>
                  <a-select-option value="3">
                    报表公告
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="8">
              <span class="table-page-search-submitButtons" style="margin-bottom:24px;">
                <a-button @click="resetFormFileds" style="margin-right:16px;">重置</a-button>
                <a-button type="primary" @click="searchHandle">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div> -->
      <s-table
        ref="table"
        row-key="id"
        :columns="columns"
        :data="getData"
      >
      </s-table>

      <add-dialog v-if="visible" :show="visible" @cancel="cancelHandle" />
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getNoticeList } from '@/api/notice'
import AddDialog from './components/AddDialog.vue'

const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    width: '20%'
  },
  {
    title: '公告内容',
    dataIndex: 'content',
    width: '50%'
  },
  {
    title: '公告类型',
    dataIndex: 'type',
    customRender: (text, row, index) => {
      return text.msg
    }
  },
  {
    title: '创建人',
    dataIndex: 'name'
  }
]

export default {
  name: 'Notice',
  components: {
    STable,
    AddDialog
  },
  data () {
    return {
      columns: columns,
      form: this.$form.createForm(this),
      queryParam: {},

      visible: false
    }
  },
  mounted () {
  },
  methods: {
    getData (parameter) {
      const requestParameters = Object.assign({}, parameter, this.queryParam)
      return getNoticeList(requestParameters).then(res => {
        return res
      })
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    resetFormFileds () {
      this.form.resetFields()
      this.queryParam = {}
      this.dId = undefined
      this.$refs.table.refresh(true)
    },
    searchHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.queryParam = {
            ...values
          }

          this.$refs.table.refresh(true)
        }
      })
    },

    addHandle () {
      this.visible = true
    },
    cancelHandle () {
      this.$refs.table.refresh(true)
      this.visible = false
    },
    confirmHandle () {

    }
  }
}
</script>

<style lang="less" scoped>
  .table-page-search-wrapper {
    .ant-form-inline {
      /deep/ .ant-form-item {
        .ant-form-item-label {
          width: 105px;
        }
      }
    }
  }
  .auto-complete-dashed {
    /deep/ .ant-select-selection__clear {
      right: 36px;
    }
  }
  .d-content {
    margin-top: -5px;
    .item {
      margin-bottom: 12px;
      &:last-child {
        margin-bottom: 0;
      }
      .d-title,
      .crip {
        font-size: 14px;
        color: rgba(115,115,115, .85);
        .text {
          font-size: 16px;
          color: #755DD7;
          font-weight: 700;
        }
      }
      .d-title {
        margin-bottom: 10px;
      }
      .label {
        color: #595959;
        margin-bottom: 10px;
        font-size: 14px;
      }
      .flex-box {
        border-bottom: solid 1px rgba(0,0,0,.06);
        padding-bottom: 16px;
      }
      .bold {
        color: rgba(0,0,0,.85);
        font-size: 16px;
        margin-right: 12px;
      }
    }
  }
</style>
