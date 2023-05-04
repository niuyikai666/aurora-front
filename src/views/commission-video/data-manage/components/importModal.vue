<template>
  <a-modal
    class="modal"
    :title="title"
    :width="510"
    :visible="visible"
    :footer="false"
    @cancel="onClose"
    :destroyOnClose="true"
  >
    <div style="padding:0 40px; text-align:center; font-weight: 500;min-height:245px">
      <div style="display: flex;color:#303033" class="mb10" v-if="showMonth">
        <span style="line-height:32px" class="mr10">导入月份:</span>
        <span style="line-height:32px">{{ monthDate }}</span>
        <!-- <a-month-picker v-model="monthDate" :disabled-date="disabledDate" value-format="YYYY-MM" /> -->
      </div>
      <div>
        <div class="upload-con" v-show="!loadding">
          <div class="up-item">
            1.请先下载导入模版 <a :href="templateUrl" class="down"><svg-icon class="icon" icon-class="download" /> 下载模板</a>
          </div>
          <div class="up-item" style="margin-bottom:20px;">
            2.将需要修改的信息填入到表格内，点击上传将文件进行导入
          </div>
          <div class="up-item">
            <a-upload-dragger
              class="upload-dragger"
              name="file"
              :multiple="false"
              :before-upload="beforeUpload"
              @change="handleChange"
              :customRequest="customRequest"
            >
              <div class="up-dragger-text">
                <div class="ant-upload-drag-icon">
                  <div class="bg"></div>
                  <p class="up-tip">点击上传</p>
                </div>
                <p class="upload-text">
                  单次最多可上传2W条数据，仅支持csv格式的文件
                </p>
              </div>
            </a-upload-dragger>
          </div>
        </div>
        <div class="loadding-con" v-show="loadding && !success">
          <a-spin />
          <p>上传中...</p>
        </div>
        <div class="loadding-con" v-show="loadding && success">
          <div class="up-item">
            <span v-if="!fileInfo.failCount">导入成功</span>
            <!-- <span v-if="fileInfo.successCount">本次导入成功{{ fileInfo.successCount }}条</span> -->
            <span v-if="fileInfo.failCount > 0">导入失败，错误{{ fileInfo.failCount }}条</span>
            <a v-if="fileInfo.failCount && fileInfo.failCount > 0" :href="errorDownUrl" class="down" style="margin-left:16px;"><svg-icon class="icon" icon-class="download" /> 下载错误数据</a>
            <a-button type="primary" style="display:block; width:92px; margin:50px auto 0 auto" @click="confirm">确定</a-button>
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import moment from 'moment'
import { manualTrigger } from '@/api/commission-video'
export default {
  name: 'AddDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    showMonth: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    templateUrl: {
      type: String,
      default: ''
    },
    errorUrl: {
      type: String,
      default: ''
    },
    fn: {
      type: Function,
      default: null
    }
  },
  data () {
    return {
      // templateUrl: `${process.env.VUE_APP_API_BASE_URL}/actor/download/template`,
      // uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/actor/upload/excel`,
      errorDownUrl: '',
      loadding: false,
      success: false,
      fileInfo: {},
      monthDate: moment(new Date()).format('YYYY-MM')
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
    beforeUpload (file) {
      console.log(file.type)
      const isExcel = file.type === 'text/csv' || file.type === 'application/vnd.ms-excel'

      if (!isExcel) {
        this.$message.error('上传文件只能是 csv 格式!')
      }
      if (isExcel) {
        this.loadding = true
      }
      return isExcel
    },
    handleChange (info) {
      const status = info.file.status
      if (status === 'done') {
        this.success = true
        this.fileInfo = info.file.response
        this.errorDownUrl = ''
        this.errorDownUrl = `${this.errorUrl}/${info.file.response.uploadCode}`
        this.$emit('refresh', false)
        // this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        console.log('error', info)
        this.uploadStatusReset()
        this.$message.error(`上传失败, ${info.file.response.msg}`)
      }
    },
    confirm () {
      this.uploadStatusReset()
    },
    uploadStatusReset () {
      this.loadding = this.success = false
      this.fileInfo = {}
    },
    customRequest (data) {
      const formData = new FormData()
      formData.append('monthDate', moment(new Date()).format('YYYY-MM'))
      formData.append('file', data.file)
      this.loading = true
      this.uploadHandle(formData)
    },
    uploadHandle (formData) {
      this.fn(formData, moment(new Date()).format('YYYY-MM')).then(res => {
        manualTrigger()
        this.success = true
        this.fileInfo = res
        this.errorDownUrl = ''
        this.errorDownUrl = `${this.errorUrl}/${res.uploadCode}`
        this.$emit('refresh')
      }).catch((res) => {
        this.uploadStatusReset()
        // this.$message.error(`上传失败, ${info.msg}`)
        this.loading = false
      })
    },
    disabledDate (time) {
      const time1 = moment(moment(time).format('YYYY-MM')).format('x')
      const time2 = moment(moment(new Date()).format('YYYY-MM')).format('x')
      return time1 < time2
    }
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
  .upload-con {
    text-align: left;
    .up-item {
      color: #303033;
      margin-bottom: 15px;
      .down {
        color: #755DD7;
        margin-left: 16px;
      }
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
  .up-dragger-text {
    .ant-upload-drag-icon {
      color: #755DD7;
      .up-tip {
        margin-top: 20px;
        margin-bottom: 5px;
      }
    }
    .upload-text {
      color: #A2A2A2;
      font-size: 12px;
    }
  }
  .upload-dragger {
    margin-top: 10px;
  }
  /deep/ .ant-upload.ant-upload-drag {
    width: 380px;
    background-color: #fff;
  }
  /deep/ .ant-upload.ant-upload-drag .ant-upload {
    padding: 50px 0;
  }
  /deep/ .ant-upload-list {
    display: none;
  }

  .loadding-con {
    padding: 50px 0;
  }
</style>
