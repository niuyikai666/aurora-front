<template>
  <a-modal
    title="反馈意见与建议"
    :width="673"
    :visible="visible"
    :confirmLoading="loading"
    @cancel="handleCancel"
    @ok="afterclosr"
  >
    <template slot="footer">
      <a-button
        key="cancel"
        @click="handleCancel"
      >取 消</a-button>
      <a-button
        key="create"
        type="primary"
        @click="handleSubmit"
      >提 交</a-button>
    </template>
    <div class="d-content">
      <p class="titles">您的意见十分宝贵,我们会定期对反馈的问题进行整理和处理</p>
      <a-form
        class="form"
        :form="form"
      >
        <tab-content
          title="问题类型"
          :titleLine="true"
        >
          <a-form-item style="margin-top:-2px">
            <a-radio-group
              class="radio-group-content"
              v-decorator="['type']"
            >
              <a-radio-button :value="1">
                <icon-font
                  class="s-icon"
                  type="icon-danxuanxuanzhong"
                /> 系统有BUG~
              </a-radio-button>
              <a-radio-button :value="2">
                <icon-font
                  class="s-icon"
                  type="icon-danxuanxuanzhong"
                /> 我要吐槽!
              </a-radio-button>
              <a-radio-button :value="3">
                <icon-font
                  class="s-icon"
                  type="icon-danxuanxuanzhong"
                /> 提个建议
              </a-radio-button>
            </a-radio-group>
          </a-form-item>
        </tab-content>
        <tab-content
          title="问题描述"
          :titleLine="true"
          class="twotab"
        >  <a-form-item>
          <a-textarea
            placeholder="请详细描述(100字以内)..."
            :max-length="100"
            style="margin-top: 2px;height:64px;"
            v-decorator="['feedbackInfo',
                          { rules: [{ required: true, message: '请输入问题描述' }] }]"
          /></a-form-item>
        </tab-content>
        <tab-content
          title="截图"
          :titleLine="true"
          class="theretab"
        >
          <div class="clearfix">
            <a-form-item>
              <a-upload
                :action="uploadUrl"
                list-type="picture-card"
                :file-list="fileList"
                @preview="handlePreview"
                @change="handleChange"
                :before-upload="beforeUpload"
              >
                <div v-if="fileList.length < 3">
                  <img
                    src="@/assets/add.png"
                    class="imges"
                  >
                  <div class="ant-upload-text">上传图片</div>
                </div>
              </a-upload>
            </a-form-item>
          </div>
        </tab-content>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="closeimgMode"
        >
          <img
            alt="example"
            style="width: 100%"
            :src="peviewImage"
          />
        </a-modal>
      </a-form></div>
    </tab-content>
    </a-form>
    </div>
    </a-upload>
    </tab-content>
    </a-form>
    </div>
  </a-modal>
</template>

<script>
import TabContent from './TabContent'
// eslint-disable-next-line no-unused-vars
import { Icon, PlusOutlined } from 'ant-design-vue'
import { Ellipsis } from '@/components'
import { addfeedback } from '@/api/feedback'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1936242_o9cmk8r2bvb.js'
})

export default {
  components: {
    TabContent,
    IconFont,
    Ellipsis
  },
  props: {

    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return { form: this.$form.createForm(this),
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/files`,
      imgurl: '',
      loading: '',
      imageUrl: '',
      visible: false,
      previewVisible: false,
      peviewImage: '',
      fileList: []
    }
  },
  methods: {
    closeimgMode () {
      this.previewVisible = false
    },
    handlePass (rule, value, callback) {
       this.password = value
       callback()
    },
    beforeUpload (file, fileList) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 3

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 3MB!')
      }
      return isJPG && isLt5M
      // eslint-disable-next-line no-unreachable
      // eslint-disable-next-line no-unreachable
      // this.fileList.push(fileList)
    },
    cancelHandle () {
      this.visible = false
    },
    handleSubmit (e) {
       this.form.validateFields((err, values) => {
         if (!err) {
          const imgarr = []
          this.fileList.forEach(function (item) {
              imgarr.push(item.response[0])
          })
          values.feedbackPicture = imgarr.join(',')
          values.browserEnvironment = this.getBrowserInfo()
          addfeedback(values).then(res => {
          this.visible = false
          this.$message.success('提交成功，感谢您的宝贵意见。')
          this.form.resetFields()
          this.fileList = []
          })
                 }
       })
    },
    showModal () {
      this.visible = true
    },
    handleCancel () {
          this.form.resetFields()
          this.fileList = []
          this.visible = false
    },
    afterclosr () {
          this.form.resetFields()
          this.fileList = []
          this.visible = false
      },
    handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = getBase64(file.originFileObj)
      }
      this.peviewImage = `${process.env.VUE_APP_API_BASE_URL}${file.response[0]}`
      this.previewVisible = true
    },
    handleChange (info) {
        if (info.file.status === undefined) {
          } else {
            this.fileList = info.fileList
          }
    },
     getBrowserInfo () {
    const userAgent = window.navigator.userAgent.toLowerCase()
    let browserType = ''
    let browserVersion = ''
    // eslint-disable-next-line no-unused-vars
    const isIE = userAgent.match(/msie/) != null || userAgent.match(/trident/) != null
    // 浏览器类型-IE
    if (userAgent.match(/msie/) != null || userAgent.match(/trident/) != null) {
      browserType = 'IE'
      browserVersion = this.getIeVersion()
    } else if (window.opera || (userAgent.indexOf('opr') > 0)) {
      browserType = '欧朋'
      browserVersion = this.getOperaVersion(userAgent)
    } else if (userAgent.indexOf('ubrowser') > 0) {
      browserType = 'UC'
      browserVersion = userAgent.match(/ubrowser\/([\d.]+)/)[1]
    } else if (userAgent.indexOf('bidubrowser') > 0) {
      browserType = '百度'
      browserVersion = userAgent.match(/bidubrowser\/([\d.]+)/)[1]
    } else if (userAgent.indexOf('metasr') > 0 || userAgent.indexOf('se 2.x') > 0) {
      browserType = '搜狗'
      // browserVersion =  userAgent.match(/metasr\/([\d.]+)/)[1]
    } else if (userAgent.indexOf('tencenttraveler') > 0) {
      browserType = 'QQ'
      browserVersion = userAgent.match(/tencenttraveler\/([\d.]+)/)[1]
    } else if (userAgent.indexOf('qqbrowser') > 0) {
      browserType = 'QQ'
      browserVersion = userAgent.match(/qqbrowser\/([\d.]+)/)[1]
    } else if (userAgent.indexOf('maxthon') > 0) {
      browserType = '遨游'
      browserVersion = userAgent.match(/maxthon\/([\d.]+)/)[1]
    } else if (userAgent.indexOf('firefox') > 0) {
      browserType = '火狐'
      browserVersion = userAgent.match(/firefox\/([\d.]+)/)[1]
    } else if (userAgent.indexOf('edge') > 0) {
      browserType = 'Edge'
      browserVersion = userAgent.match(/edge\/([\d.]+)/)[1]
    } else if (userAgent.indexOf('chrome') > 0) {
      if (this.validate360('type', 'application/x360mmplugin')) {
        browserType = '360'
        // browserVersion =  userAgent.match(/chrome\/([\d.]+)/)[1]
      } else {
        browserType = '谷歌'
        browserVersion = userAgent.match(/chrome\/([\d.]+)/)[1]
      }
    } else if (userAgent.indexOf('Safari') > -1) {
      browserType = 'Safari'
      browserVersion = userAgent.match(/version\/([\d.]+)/)[1]
    }
	return browserType + ' ' + browserVersion
    },
    /*
 * 判断是否为360浏览器
 */
 validate360 (option, value) {
    const mimeTypes = window.navigator.mimeTypes
    for (const mt in mimeTypes) {
      if (mimeTypes[mt][option] === value) {
        return true
      }
    }
	return false
      }, /*
 * 获取oper浏览器版本
 */
 /*
 * 获取IE浏览器版本
 */
 getIeVersion () {
	const IEMode = document.documentMode
    const rMsie = /(msie\s|trident.*rv:)([\w.]+)/
    const ma = window.navigator.userAgent.toLowerCase()
    const match = rMsie.exec(ma)
    try {
      return match[2]
    } catch (e) {
      return IEMode
    }
},
removeflie (file) {
  this.fileList = []
}
  },
  watch: {
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
.form {
  .ant-form-item {
    margin-bottom: 8px;
    /deep/ .ant-form-item-label {
      line-height: 26px;
      label {
        font-size: 14px;
        color: #8c8c8c;
      }
    }
    /deep/ .ant-form-item-control {
      p.crip {
        color: #262626;
        font-size: 14px;
        font-weight: 700;
        margin-bottom: 0;
      }
    }
  }
  /deep/ .tab-content {
    h1 {
      margin-bottom: 14px;
    }
  }
  input {
    width: 88%;
  }
}
.radio-group-content {
  .ant-radio-button-wrapper {
    margin-right: 10px;
    border: 0;
    background-color: #f7f7f7;
    color: #a6a6a6;
    box-shadow: none;
    &::before {
      width: 0;
    }
    .s-icon {
      display: none;
    }
  }
  .ant-radio-button-wrapper-checked {
    background-color: @primary-1 !important;
    color: @primary-color;
    border: 0;
    .s-icon {
      display: inline-block;
    }
    &::before {
      width: 0;
    }
    &:hover {
      background-color: @primary-1 !important;
      color: @primary-color;
      box-shadow: none;
    }
    &:focus-within {
      outline: none !important;
    }
  }
}
.detail-content {
  margin-top: 12px;
}
.picture {
  width: 50px;
  height: 50px;
  margin-left: 10px;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.imges {
  width: 40px;
  height: 40px;
}
.twotab {
  margin-top: 24px;
}
.theretab {
  margin-top: 24px;
}
.titles {
  // display: flex;
  // align-items: center;
  // justify-content: center;
  font-size: 22px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.85);
  line-height: 40px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
