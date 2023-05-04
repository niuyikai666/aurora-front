<template>
  <div class="container">
    <a-card
      class="card-title-large"
      title="新增合同"
      :bordered="false"
    >
      <a-form class="form" :form="form">
        <tab-content
          title="合同基础信息"
          :titleLine="true"
        >
          <a-row :gutter="80">
            <a-col :md="8">
              <a-form-item
                label="签约类型">
                <a-select
                  v-decorator="['signType', { rules: [{ required: true, message: '签约类型不能为空' }] }]"
                  placeholder="请选择"
                >
                  <a-select-option :value="1">
                    全约
                  </a-select-option>
                  <a-select-option :value="2">
                    网签
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="合同编号">
                <a-input
                  placeholder="请输入合同编号"
                  v-decorator="['code', { rules: [{ required: true, message: '合同编号不能为空' }] }]"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="合同模版">
                <a-select
                  v-decorator="['tempType', { rules: [{ required: true, message: '合同模版不能为空' }] }]"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in templateType" :key="index" :value="index">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="甲方信息">
                <a-select
                  v-decorator="['paType', { rules: [{ required: true, message: '甲方信息不能为空' }] }]"
                  placeholder="请选择"
                >
                  <a-select-option :value="1">
                    海南无忧传媒娱乐有限公司
                  </a-select-option>
                  <a-select-option :value="2">
                    湖南无忧传媒娱乐有限公司
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="姓名">
                <a-input
                  placeholder="请输入姓名"
                  v-decorator="['pbName', { rules: [{ required: true, message: '姓名不能为空'}] }]"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="电话号码">
                <a-input
                  placeholder="请输入电话号码"
                  v-decorator="['pbMobile', { rules: [{ required: true, message: '电话号码不能为空' }], getValueFromEvent: (e) => inputNumberHandle(e) }]"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="身份证号">
                <a-input
                  placeholder="请输入身份证号"
                  v-decorator="['pbIdCard', { rules: [{ required: true, message: '身份证号不能为空' }] }]"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="联系地址">
                <a-input
                  placeholder="请输入"
                  v-decorator="['pbAddress']"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="开户行">
                <a-input
                  placeholder="请输入"
                  v-decorator="['pbBank']"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="卡号">
                <a-input
                  placeholder="请输入"
                  v-decorator="['pbBankCard', { getValueFromEvent: (e) => inputNumberHandle(e) }]"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="支付宝">
                <a-input
                  placeholder="请输入"
                  v-decorator="['pbAliPay']"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="艺人类型">
                <a-select
                  v-decorator="['actorType']"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in actorType" :key="index" :value="index">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                class="form-item-flex"
                label="身份证正面">
                <a-upload
                  name="file"
                  :action="uploadUrl"
                  :showUploadList="false"
                  :before-upload="beforeUpload"
                  @change="value => handleChange(value, 1)"
                >
                  <div class="upload-con" :class="{'border-zero': idCardFrontUrl}">
                    <div v-if="!idCardFrontUrl" class="u-con">
                      <img src="~@/assets/upload_bg.png" />
                      <p class="name">点击上传</p>
                      <p class="crip">文件格式：png、jpg</p>
                    </div>
                    <img v-if="idCardFrontUrl" class="picture" :src="baseUrl + idCardFrontUrl" alt="">
                  </div>
                </a-upload>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                class="form-item-flex align-item-top"
                label="身份证反面">
                <a-upload
                  name="file"
                  :action="uploadUrl"
                  :showUploadList="false"
                  :before-upload="beforeUpload"
                  @change="value => handleChange(value, 2)"
                >
                  <div class="upload-con" :class="{'border-zero': idCardBackUrl}">
                    <div v-if="!idCardBackUrl" class="u-con">
                      <img src="~@/assets/upload_bg.png" />
                      <p class="name">点击上传</p>
                      <p class="crip">文件格式：png、jpg</p>
                    </div>
                    <img v-if="idCardBackUrl" class="picture" :src="baseUrl + idCardBackUrl" alt="">
                  </div>
                </a-upload>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                class="form-item-flex align-item-top"
                label="手持身份证">
                <a-upload
                  name="file"
                  :action="uploadUrl"
                  :showUploadList="false"
                  :before-upload="beforeUpload"
                  @change="value => handleChange(value, 3)"
                >
                  <div class="upload-con" :class="{'border-zero': idCardHoldUrl}">
                    <div v-if="!idCardHoldUrl" class="u-con">
                      <img src="~@/assets/upload_bg.png" />
                      <p class="name">点击上传</p>
                      <p class="crip">文件格式：png、jpg</p>
                    </div>
                    <img v-if="idCardHoldUrl" class="picture" :src="baseUrl + idCardHoldUrl" alt="">
                  </div>
                </a-upload>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                class="form-item-flex"
                label="无忧渠道分成比例(即主合同的商务分成比例)(乙：甲)">
                <div class="item-child-con">
                  <span class="child-item">
                    乙
                    <a-input
                      placeholder="请输入"
                      v-model="pbProp"
                      @input="pbProp = inputNumberHandle($event)"
                    />
                  </span>
                  <span class="child-item">
                    甲
                    <a-input
                      placeholder="请输入"
                      v-model="paProp"
                      @input="paProp = inputNumberHandle($event)"
                    />
                  </span>
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content
          style="margin-top:10px;"
          title="合同内容"
          :titleLine="true"
        >
          <a-row :gutter="80">
            <a-col :md="8">
              <a-form-item
                class="form-item-flex"
                label="合同全文">
                <a-upload
                  name="file"
                  :action="uploadUrl"
                  :showUploadList="false"
                  :before-upload="beforeUpload2"
                  @change="value => handleChange2(value, 2)"
                >
                  <a-button> <a-icon type="upload" /> 上传 </a-button>
                </a-upload>
                <p v-if="contractConentUrl" class="file-name">{{ contractConentName }}</p>
                <a-button v-if="contractConentUrl" type="primary" @click="getContextHandle(contractConentUrl, 1)" :loading="identiryLoading1">识别</a-button>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                class="form-item-flex"
                label="合同首页">
                <a-upload
                  name="file"
                  :action="uploadUrl"
                  :showUploadList="false"
                  :before-upload="beforeUpload2"
                  @change="value => handleChange2(value, 1)"
                >
                  <a-button> <a-icon type="upload" /> 上传 </a-button>
                </a-upload>
                <p class="file-name">{{ subStr(contractIndexPageUrl) }}</p>
                <a-button v-if="contractIndexPageUrl" type="primary" @click="getContextHandle(contractIndexPageUrl, 2)" :loading="identiryLoading2">识别</a-button>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                class="form-item-flex"
                label="合同尾页">
                <a-upload
                  name="file"
                  :action="uploadUrl"
                  :showUploadList="false"
                  :before-upload="beforeUpload2"
                  @change="value => handleChange2(value, 3)"
                >
                  <a-button> <a-icon type="upload" /> 上传 </a-button>
                </a-upload>
                <p class="file-name">{{ subStr(contractLastPageUrl) }}</p>
                <a-button v-if="contractLastPageUrl" type="primary" @click="getContextHandle(contractLastPageUrl, 3)" :loading="identiryLoading3">识别</a-button>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :md="24">
              <div v-if="contractContent.length > 0" class="contract-content">
                <div v-text="contractContent"></div>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :md="8">
              <a-form-item
                label="合同期限">
                <a-select
                  v-decorator="['validityType', {initialValue: 3}]"
                  placeholder="请选择"
                >
                  <a-select-option :value="1">
                    三年
                  </a-select-option>
                  <a-select-option :value="2">
                    五年
                  </a-select-option>
                  <a-select-option :value="3">
                    自定义
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item class="form-item-flex" label="合同有效期">
                <div class="item-child-con">
                  <span class="child-item">
                    <a-date-picker
                      value-format="YYYY-MM-DD"
                      v-model="validityStartDate"
                      @change="changeStartHandle"
                    />
                  </span> - <span class="child-item">
                    <a-date-picker
                      value-format="YYYY-MM-DD"
                      v-model="validityEndDate"
                      @change="changeEndHandle"
                    />
                  </span>
                </div>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="合同类型">
                <a-select
                  v-decorator="['contractType']"
                  placeholder="请选择"
                >
                  <a-select-option v-for="(item, index) in contractType" :key="index" :value="index">
                    {{ item }}
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="内容摘要">
                <a-textarea
                  v-decorator="['digest']"
                  placeholder="请输入"
                />
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="备注">
                <a-textarea
                  v-decorator="['remark']"
                  placeholder="请输入"
                />
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <a-row>
          <a-col :md="8">
            <a-button type="primary" @click="submit()">确认创建</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { actorType, templateType, contractType } from './types'
import { parseTime } from '@/utils/util'
import { contractCreate } from '@/api/contract'
import { getContext } from '@/api/common'
import TabContent from '../components/TabContent'

export default {
  name: 'ContractCreate',
  components: {
    TabContent
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/files`,
      form: this.$form.createForm(this),

      actorType,
      templateType,
      contractType,

      pbProp: '',
      paProp: '',

      idCardFrontUrl: '',
      idCardBackUrl: '',
      idCardHoldUrl: '',

      contractIndexPageUrl: '',
      contractConentUrl: '',
      contractConentName: '',
      contractLastPageUrl: '',

      validityStartDate: '',
      validityEndDate: '',

      contractContent: '',

      identiryLoading1: false,
      identiryLoading2: false,
      identiryLoading3: false
    }
  },
  mounted () {
  },
  methods: {
    handleChange (info, type) {
      if (info.file.status === 'done') {
        switch (type) {
          case 1:
            this.idCardFrontUrl = info.file.response[0]
            break
          case 2:
            this.idCardBackUrl = info.file.response[0]
            break
          case 3:
            this.idCardHoldUrl = info.file.response[0]
            break
          default:
            break
        }
      }
      if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    beforeUpload (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },

    handleChange2 (info, type) {
      if (info.file.status === 'done') {
        switch (type) {
          case 1:
            this.contractIndexPageUrl = info.file.response[0]
            break
          case 2:
            this.contractConentUrl = info.file.response[0]
            this.contractConentName = info.file.name
            break
          case 3:
            this.contractLastPageUrl = info.file.response[0]
            break
          default:
            break
        }
      }
      if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`)
      }
    },
    beforeUpload2 (file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'application/pdf'
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 、 PNG 、PDF 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },

    getContextHandle (url, type) {
      if (this.identiryLoading1 || this.identiryLoading2 || this.identiryLoading) return
      switch (type) {
        case 1:
          this.identiryLoading1 = true
          break
        case 2:
          this.identiryLoading2 = true
          break
        case 3:
          this.identiryLoading3 = true
          break
        default:
          break
      }
      getContext(url).then(res => {
        this.contractContent = ''
        this.$nextTick(() => {
          this.contractContent = res
          this.identiryLoading1 = this.identiryLoading2 = this.identiryLoading3 = false
        })
      })
    },

    submit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = {
            ...values,
            pbProp: this.pbProp,
            paProp: this.paProp,
            pbIdCardFront: this.idCardFrontUrl,
            pbIdCardBack: this.idCardBackUrl,
            pbIdCardHold: this.idCardHoldUrl,

            index: this.contractIndexPageUrl,
            content: this.contractConentUrl,
            contentName: this.contractConentName,
            tail: this.contractLastPageUrl,

            validityStartDate: this.validityStartDate,
            validityEndDate: this.validityEndDate
          }
          this.contractCreateHandle(data)
        }
      })
    },
    contractCreateHandle (data) {
      contractCreate(data).then(() => {
        this.$message.success('创建成功')
        this.$router.push({
          path: '/contract/manage/list'
        })
      })
    },
    changeStartHandle (val) {
      const threeYearsTime = 365 * 86400000 * 3
      const fiveYearsTime = 365 * 86400000 * 5
      const startTime = new Date(val).getTime()
      const dateType = this.form.getFieldValue('validityType')
      if (dateType === 1) {
        const endTime = parseTime(startTime + threeYearsTime, '{y}-{m}-{d}')
        this.validityEndDate = endTime
      }
      if (dateType === 2) {
        const endTime = parseTime(startTime + fiveYearsTime, '{y}-{m}-{d}')
        this.validityEndDate = endTime
      }
    },
    changeEndHandle (e) {

    },
    subStr (str) {
      if (!str) return
      // eslint-disable-next-line no-useless-escape
      const index = str.lastIndexOf('\/')
      return str.substring(index + 1, str.length)
    },
    inputNumberHandle (e) {
      return e.target.value.replace(/\D+/g, '')
    }
  }
}
</script>

<style lang="less" scoped>
  @import './index.less';
</style>
