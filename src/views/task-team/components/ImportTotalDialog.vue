<template>
  <a-modal
    class="modal"
    title="导入"
    :width="400"
    :visible="visible"
    @cancel="onClose"
  >
    <template slot="footer">
      <a-button
        key="create"
        type="primary"
        @click="caculateHandle"
      >开始计算</a-button>
    </template>
    <div style="font-weight: 500; padding-left:24px; padding-bottom: 30px;">
      <a-form layout="inline">
        <a-form-item label="月份" :required="true">
          <a-month-picker
            v-model="monthCycle"
            style="width:100%;"
            :disabled-date="disabledDate"
            value-format="YYYY-MM">
          </a-month-picker>
        </a-form-item>
      </a-form>
      <div class="upload-con">
        <div class="up-item">
          <div class="label">结算单</div>
          <a-upload
            name="file"
            :multiple="true"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :customRequest="customRequest"
          >
            <a-button :loading="loading1" icon="upload">上传</a-button>
          </a-upload>
          <div class="msg" v-if="upMsg1">上传成功</div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { importPreSettltment, groupCaculate } from '@/api/task'
import moment from 'moment'

export default {
  name: 'ImportComp',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      monthCycle: moment(new Date()).subtract(1, 'months').format('YYYY-MM'),
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
    customRequest (data) {
      const formData = new FormData()
      formData.append('monthCycle', this.monthCycle)
      formData.append('multipartFile', data.file)

      this.loading1 = true
      this.upMsg1 = ''
      this.uploadHandle(formData, importPreSettltment)
    },
    uploadHandle (formData, fn) {
      fn(formData).then(res => {
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
      // return time.valueOf() > moment(new Date()).subtract(1, 'months') || time.valueOf() < new Date('2021-12')
      return time.valueOf() > moment(new Date()).subtract(1, 'months')
    },

    caculateHandle () {
      groupCaculate(this.monthCycle)
      this.$message.success('操作成功')
      this.onClose()
    }
  }
}
</script>

<style lang="less" scoped>
  .upload-con {
    margin-top: 30px;
    display: flex;
    padding-left: 12px;
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
