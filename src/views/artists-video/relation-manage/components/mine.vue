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
            <a-button icon="plus-circle" type="primary" @click="visible = true" style="margin-bottom:16px">添加</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table
      :columns="mineColumns"
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
        <a-button type="link" style="margin-right:10px" @click="detailHandle(record.id)" v-if="record.state.code === 1">详情</a-button>
        <!-- <a-button type="link" style="margin-right:10px" v-if="record.state.code === 1" @click="toEdit(record)">修改</a-button> -->
        <a-popconfirm
          overlayClassName="popoer-del"
          title="确定要删除吗?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="confirmDel(record)"
        >
          <a-button type="link" style="margin-right:10px" v-if="record.state.code === 1">删除</a-button>
        </a-popconfirm>
      </span>
    </s-table>
    <a-modal
      :visible="visible"
      title="添加主播信息"
      :destroyOnClose="true"
      @ok="prefillSubmit"
      @cancel="visible = false"
    >
      <a-form :form="prefillForm" :label-col="{ span: 9 }" :wrapper-col="{ span: 11 }">
        <a-form-item label="填写主播视频号的ID">
          <a-input
            v-decorator="['platformCode', { rules: [{ required: true, message: '请填写主播视频号的ID!' }] }]"
            placeholder="请输入"
          />
        </a-form-item>
        <p class="red-desc">*主播ID错误将无法匹配到主播，请务必确认准确！</p>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import moment from 'moment'
import { numberFormat } from '@/utils/util'
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import { mineColumns } from '../tableColumns'
import { checkPrefill, delPrefill } from '@/api/artists-video'
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
      mineColumns,
      treeData: [],
      visible: false,
      prefillForm: this.$form.createForm(this)
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
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    searchHandle (e) {
      e && e.preventDefault && e.preventDefault()
      this.$nextTick(() => {
        this.form.validateFields((err, values) => {
          if (!err) {
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
    },
    prefillSubmit () {
      this.prefillForm.validateFields((err, values) => {
         if (!err) {
            checkPrefill(values).then(res => {
              this.visible = false
              this.$router.push({
                path: '/artists-video/relation-manage/add',
                query: {
                  ...values
                }
              })
            })
         }
       })
    },
    toEdit (val) {
      this.$router.push({
        path: '/artists-video/relation-manage/add',
        query: {
          id: val.id,
          type: 2
        }
      })
    },
    confirmDel (val) {
      delPrefill(val.id).then(res => {
        this.$message.success('操作成功')
        this.$refs.table.refresh()
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
.red-desc{
  color: rgba(233, 37, 37, 1);
  margin: 0;
  // text-align: center;
  padding-left: 30px;
  margin-top: -10px;
}
</style>
