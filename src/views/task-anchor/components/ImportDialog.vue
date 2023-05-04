<template>
  <a-modal
    class="modal"
    :title="`导入${title.includes('结算单') && '结算单' || title}`"
    :width="400"
    :visible="visible"
    @cancel="onClose"
  >
    <template slot="footer">
      <a-button
        key="create"
        type="primary"
        @click="handleConfirm"
      >确认</a-button>
    </template>
    <div style="font-weight: 500; padding-left:24px; padding-bottom: 30px;">
      <a-form layout="inline">
        <!-- 如果是外站优质主播 不显示月份 -->
        <a-form-item v-if="!title.includes('外站优质主播')" label="月份" :required="true" class="lable-large">
          <a-month-picker
            v-model="monthCycle"
            style="width:100%;"
            :disabled-date="disabledDate"
            value-format="YYYY-MM">
          </a-month-picker>
        </a-form-item>
        <a-form-item v-if="title.includes('结算单管理')" label="结算单类型" :required="true" style="margin-top:16px;">
          <a-select
            style="width:200px;"
            v-model="settltmentType"
            placeholder="请选择"
          >
            <a-select-option v-for="(value, key) in settlementTypes" :key="key" :value="key">
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="选择文件" :required="true" style="margin-top:16px;" class="lable-large">
          <a-upload
            name="file"
            :multiple="true"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
            :customRequest="customRequest"
          >
            <a-button :loading="loading1" icon="upload" @click="upType = 'balckartist'">上传</a-button>
          </a-upload>
          <div class="msg" v-if="upMsg1">上传成功</div>
        </a-form-item>
      </a-form>
      <!-- <div class="upload-con">
        <div class="up-item">
          <div class="label">选择文件</div>
          <a-upload
            name="file"
            :multiple="true"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :customRequest="customRequest"
          >
            <a-button :loading="loading1" icon="upload" @click="upType = 'balckartist'">上传</a-button>
          </a-upload>
          <div class="msg" v-if="upMsg1">上传成功</div>
        </div>
      </div> -->
    </div>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { settlementTypes } from '../types'

export default {
  name: 'ImportComp',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    importFunc: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      settlementTypes,
      monthCycle: moment().format('YYYY-MM'),
      loading1: false,
      upMsg1: '',
      settltmentType: undefined
    }
  },
  async mounted () {
  },
  methods: {
    tabChange (key) {
      this.tabActiveKey = key
    },
    onClose () {
      this.uploadStatusReset()
      this.$emit('cancel')
    },
    handleConfirm () {
      this.uploadStatusReset()
      this.$emit('success')
    },
    customRequest (data) {
      const formData = new FormData()
      if (this.title.includes('结算单')) {
        if (!this.settltmentType) {
          this.$message.error('请选择结算单类型')
          return
        }
        formData.append('settlementType', this.settltmentType)
      }
      formData.append('monthCycle', this.monthCycle)
      formData.append('multipartFile', data.file)

      this.loading1 = true
      this.upMsg1 = ''
      this.uploadHandle(formData)
    },
    uploadHandle (formData) {
      this.importFunc(formData).then(res => {
        this.setMsg('上传成功')
      }).catch(() => {
        this.setMsg('')
      })
    },
    setMsg (message) {
      this.upMsg1 = message
      this.loading1 = false
    },
    uploadStatusReset () {
      this.loading1 = false
      this.upMsg1 = ''
    },
    disabledDate (time) {
      return time.valueOf() > Date.now() || time.valueOf() < new Date('2021-12')
    }
  },
  watch: {
    settltmentType () {
      this.upMsg1 = ''
      this.loading1 = false
    }
  }
}
</script>

<style lang="less" scoped>
  .lable-large {
    /deep/ .ant-form-item-label {
      width: 95px;
    }
  }
  .upload-con {
    margin-top: 16px;
    margin-left: 12px;
    display: flex;
    .up-item {
      flex: 1;
      .label {
        // font-weight: normal;
        margin-bottom: 8px;
        color: #333;
      }
    }
    .msg {
      color: #755dd7;
      margin-top: 5px;
    }
  }
  .ant-upload-drag-icon {
    .bg {
      width: 68px;
      height: 52px;
      background: url(~@/assets/upload_bg.png) no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
    }
  }
  /deep/ .ant-upload-list {
    display: none;
  }
</style>
