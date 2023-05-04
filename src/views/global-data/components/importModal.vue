<template>
  <a-modal
    class="modal"
    :title="title"
    :visible="visible"
    @cancel="onClose"
    :footer="null"
  >
    <!-- <template slot="footer">
      <a-button
        key="create"
        type="primary"
        @click="handleConfirm"
      >确认</a-button>
    </template> -->
    <div style="font-weight: 500;">
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
        <!-- 如果是外站优质主播 不显示月份 -->
        <a-form-item label="选择时间" v-if="showMonth">
          <a-month-picker
            v-model="monthCycle"
            style="width:100%;"
            value-format="YYYY-MM">
          </a-month-picker>
        </a-form-item>
        <a-form-item label="选择文件" v-if="(showMonth && monthCycle) || !showMonth">
          <a-upload
            name="file"
            :multiple="true"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, text/csv"
            :customRequest="customRequest"
          >
            <a-button :loading="loading1" icon="upload">上传</a-button>
          </a-upload>
          <div class="msg" v-if="upMsg1">上传成功</div>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
import moment from 'moment'

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
    },
    showMonth: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      monthCycle: moment().format('YYYY-MM'),
      loading1: false,
      upMsg1: ''
    }
  },
  async mounted () {
  },
  methods: {
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
      formData.append('monthCycle', this.monthCycle || undefined)
      formData.append('multipartFile', data.file)

      this.loading1 = true
      this.upMsg1 = ''
      this.uploadHandle(formData)
    },
    uploadHandle (formData) {
      this.importFunc(formData).then(res => {
        this.setMsg('上传成功')
        this.$parent.refresh()
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
    }
  },
  watch: {
    visible () {
      this.uploadStatusReset()
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
