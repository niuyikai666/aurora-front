<template>
  <div class="container">
    <a-card
      class="card-title-large"
      title="新增补充合同"
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
                label="分类">
                <a-select
                  v-decorator="['type', { rules: [{ required: true, message: '签约类型不能为空' }] }]"
                  placeholder="请选择"
                  @change="signTypeChange"
                >
                  <a-select-option :value="1">
                    补充合同
                  </a-select-option>
                  <a-select-option :value="2">
                    续约
                  </a-select-option>
                  <a-select-option :value="3">
                    解约
                  </a-select-option>
                  <a-select-option :value="4">
                    其他
                  </a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <template v-if="signType === 1">
              <a-col :md="8">
                <a-form-item
                  label="月直播天数">
                  <a-input placeholder="请输入" v-decorator="['liveDayMonthLimit', { getValueFromEvent: (e) => inputNumberHandle(e) }]" suffix="天" />
                </a-form-item>
              </a-col>
              <a-col :md="8">
                <a-form-item
                  label="月直播有效时长">
                  <a-input placeholder="请输入" v-decorator="['liveDurationMonthLimit', { getValueFromEvent: (e) => inputNumberHandle(e) }]" suffix="小时" />
                </a-form-item>
              </a-col>
              <a-col :md="8">
                <a-form-item
                  label="月更新短视频条数">
                  <a-input placeholder="请输入" v-decorator="['videoCountMonthLimit', { getValueFromEvent: (e) => inputNumberHandle(e) }]" suffix="条" />
                </a-form-item>
              </a-col>
              <a-col :md="8">
                <a-form-item
                  class="form-item-flex"
                  label="非无忧渠道分成比例(乙：甲)">
                  <div class="item-child-con">
                    <span class="child-item">
                      乙
                      <a-input
                        placeholder="请输入"
                        v-model="channelPbProp"
                        @input="channelPbProp = inputNumberHandle($event)"
                      />
                    </span>
                    <span class="child-item">
                      甲
                      <a-input
                        placeholder="请输入"
                        v-model="channelPaProp"
                        @input="channelPaProp = inputNumberHandle($event)"
                      />
                    </span>
                  </div>
                </a-form-item>
              </a-col>
              <a-col :md="8">
                <a-form-item
                  class="form-item-flex"
                  label="电商分成比例(乙：甲)">
                  <div class="item-child-con">
                    <span class="child-item">
                      乙
                      <a-input
                        placeholder="请输入"
                        v-model="echannelPbProp"
                        @input="echannelPbProp = inputNumberHandle($event)"
                      />
                    </span>
                    <span class="child-item">
                      甲
                      <a-input
                        placeholder="请输入"
                        v-model="echannelPaProp"
                        @input="echannelPaProp = inputNumberHandle($event)"
                      />
                    </span>
                  </div>
                </a-form-item>
              </a-col>
              <a-col :md="8">
                <a-form-item
                  class="form-item-flex"
                  label="小红书平台分成比例(乙：甲)">
                  <div class="item-child-con">
                    <span class="child-item">
                      乙
                      <a-input
                        placeholder="请输入"
                        v-model="rbookletPbProp"
                        @input="rbookletPbProp = inputNumberHandle($event)"
                      />
                    </span>
                    <span class="child-item">
                      甲
                      <a-input
                        placeholder="请输入"
                        v-model="rbookletPaProp"
                        @input="rbookletPaProp = inputNumberHandle($event)"
                      />
                    </span>
                  </div>
                </a-form-item>
              </a-col>
            </template>
          </a-row>
        </tab-content>
        <tab-content
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
                  :before-upload="beforeUpload"
                  @change="value => handleChange(value, 2)"
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
                  :before-upload="beforeUpload"
                  @change="value => handleChange(value, 1)"
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
                  :before-upload="beforeUpload"
                  @change="value => handleChange(value, 3)"
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
              <a-form-item class="form-item-flex" label="合同有效期">
                <a-range-picker
                  value-format="YYYY-MM-DD"
                  v-decorator="['validityDate']"
                />
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
        <tab-content
          v-if="signType === 1"
          title="合同保底"
          :titleLine="true"
        >
          <a-row :gutter="80">
            <template>
              <a-col :md="24">
                <a-form-item label="是否有保底">
                  <a-radio-group
                    v-decorator="['isMinReward', { initialValue: 1 }]"
                    @change="digestHandle"
                  >
                    <a-radio :value="1">
                      是
                    </a-radio>
                    <a-radio :value="2">
                      否
                    </a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :md="24">
                <template v-if="digest === 1">
                  <guarant :data="guaranteedData" @add="addHandle" @delete="deleteHandle"/>
                </template>
              </a-col>
            </template>
          </a-row>
        </tab-content>
        <a-row>
          <a-col>
            <a-button type="primary" @click="submit()">确认创建</a-button>
          </a-col>
        </a-row>
          <!-- <a-col :xs="12" :lg="12" :md="24">
            <div class="contract-content" style="max-height: 80vh; overflow-y: scroll">
              <div v-html="contractContent"></div>
            </div>
          </a-col> -->
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import { extraContractCreate } from '@/api/contract'
import { getContext } from '@/api/common'
import Guarant from './components/Guarant.vue'
import TabContent from '../../components/TabContent'

export default {
  name: 'ContractExtraCreate',
  components: {
    TabContent,
    Guarant
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/files`,
      form: this.$form.createForm(this),

      signType: '',
      digest: 1,

      channelPbProp: '',
      channelPaProp: '',
      echannelPbProp: '',
      echannelPaProp: '',
      rbookletPbProp: '',
      rbookletPaProp: '',

      contractIndexPageUrl: '',
      contractConentUrl: '',
      contractConentName: '',
      contractLastPageUrl: '',

      blankData: {
        type: '',
        minNum: '',
        dateType: 1,
        startDate: '',
        endDate: ''
      },
      guaranteedData: [],

      contractContent: '',

      contractId: '',

      identiryLoading1: false,
      identiryLoading2: false,
      identiryLoading3: false
    }
  },
  mounted () {
    this.contractId = this.$route.query.id
    this.guaranteedData.push(JSON.parse(JSON.stringify(this.blankData)))
  },
  methods: {
    handleChange (info, type) {
      if (info.file.status === 'done') {
        switch (type) {
          case 1:
            this.contractIndexPageUrl = info.file.response[0]
            this.contractIndexPageName = info.file.name
            break
          case 2:
            this.contractConentUrl = info.file.response[0]
            this.contractConentName = info.file.name
            break
          case 3:
            this.contractLastPageUrl = info.file.response[0]
            this.contractLastPageName = info.file.name
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
            contractId: this.contractId,
            channelPbProp: this.channelPbProp || undefined,
            channelPaProp: this.channelPaProp || undefined,
            echannelPbProp: this.echannelPbProp || undefined,
            echannelPaProp: this.echannelPaProp || undefined,
            rbookletPbProp: this.rbookletPbProp || undefined,
            rbookletPaProp: this.rbookletPaProp || undefined,

            index: this.contractIndexPageUrl || undefined,
            content: this.contractConentUrl || undefined,
            contentName: this.contractConentName || undefined,
            tail: this.contractLastPageUrl || undefined,

            validityStartDate: values.validityDate ? values.validityDate[0] : undefined,
            validityEndDate: values.validityDate ? values.validityDate[1] : undefined,

            minRewardList: this.guaranteedData
          }
          this.contractCreateHandle(data)
        }
      })
    },
    contractCreateHandle (data) {
      extraContractCreate(data).then(() => {
        this.$message.success('创建成功')
        this.$router.push({
          path: `/contract/manage/extra-list?id=${this.contractId}`
        })
      })
    },
    subStr (str) {
      if (!str) return
      // eslint-disable-next-line no-useless-escape
      const index = str.lastIndexOf('\/')
      return str.substring(index + 1, str.length)
    },
    inputNumberHandle (e) {
      return e.target.value.replace(/\D+/g, '')
    },

    signTypeChange (val) {
      this.digest = 1
      this.signType = val
    },

    digestHandle (e) {
      this.digest = e.target.value
    },

    // 保底业务
    addHandle () {
      if (this.guaranteedData.length >= 3) return
      this.guaranteedData.push(JSON.parse(JSON.stringify(this.blankData)))
    },
    deleteHandle (index) {
      if (this.guaranteedData.length <= 1) return
      this.guaranteedData.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../index.less';
</style>
