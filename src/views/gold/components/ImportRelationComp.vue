<template>
  <a-modal
    class="modal"
    title="导入"
    :width="510"
    :visible="visible"
    :footer="false"
    @cancel="onClose"
  >
    <div style="padding:0 40px; text-align:center; font-weight: 500;">
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
            accept=".xlsx"
            :multiple="false"
            :action="uploadUrl"
            :before-upload="beforeUpload"
            @change="handleChange"
          >
            <div class="up-dragger-text">
              <div class="ant-upload-drag-icon">
                <div class="bg"></div>
                <p class="up-tip">点击上传</p>
              </div>
              <p class="upload-text">
                单次最多可上传1000条数据，仅支持xlsx格式的文件
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
          <span>本次导入成功{{ fileInfo.successCount }}条</span>
          <span>，错误{{ fileInfo.failCount }}条</span>
          <a v-if="fileInfo.failCount && fileInfo.failCount > 0" :href="errorDownUrl" class="down" style="margin-left:16px;"><svg-icon class="icon" icon-class="download" /> 下载错误数据</a>
          <a-button type="primary" style="display:block; width:92px; margin:50px auto 0 auto" @click="confirm">确定</a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
// import { createChapter } from '@/api/config'

export default {
  name: 'AddDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      templateUrl: `${process.env.VUE_APP_API_BASE_URL}/afterGoldData/import/relationship/template`,
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/afterGoldData/import/relationship`,
      errorDownUrl: '',
      loadding: false,
      success: false,
      fileInfo: {}
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
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

      if (!isExcel) {
        this.$message.error('上传文件只能是 xlsx 格式!')
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
        this.errorDownUrl = `${process.env.VUE_APP_API_BASE_URL}/afterGoldData/import/relationship/failure-infos/${info.file.response.uploadCode}`
        // this.$message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
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
    }
  },
  watch: {
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
