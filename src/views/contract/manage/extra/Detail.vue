<template>
  <div class="container">
    <a-card
      class="card-title-large"
      title="补充合同详情"
      :bordered="false"
    >
      <a-form class="form" :form="form">
        <tab-content
          title="合同基础信息"
          :titleLine="true"
        >
          <a-row :gutter="24">
            <a-col :md="8">
              <a-form-item
                label="分类">
                <div class="item-child-con">{{ model.type }}</div>
              </a-form-item>
            </a-col>
            <template v-if="type === 1">
              <a-col :md="8">
                <a-form-item
                  label="月直播天数">
                  <div class="item-child-con">{{ model.liveDayMonthLimit }}</div>
                </a-form-item>
              </a-col>
              <a-col :md="8">
                <a-form-item
                  label="月直播有效时长">
                  <div class="item-child-con">{{ model.liveDurationMonthLimit }}</div>
                </a-form-item>
              </a-col>
              <a-col :md="8">
                <a-form-item
                  label="月更新短视频条数">
                  <div class="item-child-con">{{ model.videoCountMonthLimit }}</div>
                </a-form-item>
              </a-col>
              <a-col :md="8">
                <a-form-item
                  class="form-item-flex"
                  label="非无忧渠道分成比例(乙：甲)">
                  <div class="item-child-con">
                    <span class="child-item">
                      乙  <span style="margin-left: 10px;">{{ channelPbProp }}</span>
                    </span>
                    <span class="child-item">
                      甲  <span style="margin-left: 10px;">{{ channelPaProp }}</span>
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
                      <span style="margin-left: 10px;">{{ echannelPbProp }}</span>
                    </span>
                    <span class="child-item">
                      甲
                      <span style="margin-left: 10px;">{{ echannelPaProp }}</span>
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
                      <span style="margin-left: 10px;">{{ rbookletPbProp }}</span>
                    </span>
                    <span class="child-item">
                      甲
                      <span style="margin-left: 10px;">{{ rbookletPaProp }}</span>
                    </span>
                  </div>
                </a-form-item>
              </a-col>
            </template>
          </a-row>
        </tab-content>
        <tab-content
          style="margin-top: 10px;"
          title="合同内容"
          :titleLine="true"
        >
          <a-row :gutter="24">
            <a-col :md="8">
              <a-form-item
                class="form-item-flex"
                label="合同全文">
                <p v-if="contractConentUrl" class="file-name">{{ contractConentName }}</p>
                <a-button v-if="contractConentUrl" type="link" @click="seeHandle(baseUrl + contractConentUrl)">查看</a-button>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                class="form-item-flex"
                label="合同首页">
                <p class="file-name">{{ subStr(contractIndexPageUrl) }}</p>
                <a-button v-if="contractIndexPageUrl" type="link" @click="seeHandle(baseUrl + contractIndexPageUrl)">查看</a-button>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                class="form-item-flex"
                label="合同尾页">
                <p class="file-name">{{ subStr(contractLastPageUrl) }}</p>
                <a-button v-if="contractLastPageUrl" type="link" @click="seeHandle(baseUrl + contractLastPageUrl)">查看</a-button>
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
          <a-row :gutter="24">
            <a-col :md="8">
              <a-form-item class="form-item-flex" label="合同有效期">
                <div class="item-child-con" v-if="model.validityStartDate">{{ model.validityStartDate }} - {{ model.validityEndDate }}</div>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="内容摘要">
                <div class="digest-con" style="line-height: 1.4">
                  {{ model.digest }}
                </div>
              </a-form-item>
            </a-col>
            <a-col :md="8">
              <a-form-item
                label="备注">
                <div class="digest-con" style="line-height: 1.4">
                  {{ model.remark }}
                </div>
              </a-form-item>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content
          style="margin-top:10px;"
          v-if="type === 1"
          title="合同保底"
          :titleLine="true"
        >
          <a-row :gutter="24">
            <template>
              <a-col :md="24">
                <a-form-item label="是否有保底" style="display:flex;">
                  <p class="digest-con">{{ model.isMinReward === 1 ? '是' : '否' }}</p>
                </a-form-item>
              </a-col>
              <a-col :md="24">
                <template v-if="reward === 1">
                  <guarant :data="guaranteedData" :disable="true"/>
                </template>
              </a-col>
            </template>
          </a-row>
        </tab-content>
        <a-row>
          <a-col>
            <a-button type="primary" @click="goBack()">返回</a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img style="width: 100%" :src="previewImage" />
    </a-modal>
    <PDF v-if="pdfUrl" :pdfurl="pdfUrl" @closepdf="closePdfHandle" />
  </div>
</template>

<script>
import { extraContractDetail } from '@/api/contract'
import { getContext } from '@/api/common'
import Guarant from './components/Guarant.vue'
import TabContent from '../../components/TabContent'
import PDF from '@/components/PDF'

export default {
  name: 'ContractExtraCreate',
  components: {
    TabContent,
    Guarant,
    PDF
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/files`,
      form: this.$form.createForm(this),

      model: {},
      type: '',
      reward: 1,

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
      id: '',

      identiryLoading: false,

      previewVisible: false,
      previewImage: '',

      pdfUrl: ''
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getContractDetailHandle()
  },
  methods: {
    getContractDetailHandle () {
      extraContractDetail(this.id).then(model => {
        this.type = model.type.code

        this.$nextTick(() => {
          this.reward = model.isMinReward
          this.channelPbProp = model.channelPbProp
          this.channelPaProp = model.channelPaProp
          this.echannelPbProp = model.echannelPbProp
          this.echannelPaProp = model.echannelPaProp
          this.rbookletPbProp = model.rbookletPbProp
          this.rbookletPaProp = model.rbookletPaProp

          this.contractIndexPageUrl = model.index
          this.contractConentUrl = model.content
          this.contractConentName = model.contentName
          this.contractLastPageUrl = model.tail

          // model['validityDate'] = [ model.validityStartDate, model.validityEndDate ]
          model.type = model.type.msg
          this.model = model

          this.guaranteedData = this.generateGuarant(model.rewardMinDTOList)

          // model && this.form.setFieldsValue(pick(model, this.fileds))
        })
      })
    },
    generateGuarant (data) {
      if (!data) {
        this.guaranteedData.push(JSON.parse(JSON.stringify(this.blankData)))
        return
      }
      data.forEach(item => {
        item.dateType = item.dateType.code
        item.type = item.type.code
      })

      return data
    },
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

    getContextHandle () {
      this.identiryLoading = true
      getContext(this.contractConentUrl).then(res => {
        this.contractContent = res
        this.identiryLoading = false
      })
    },
    goBack () {
      this.$router.push({
        path: `/contract/manage/extra-list`
      })
    },
    subStr (str) {
      if (!str) return
      // eslint-disable-next-line no-useless-escape
      const index = str.lastIndexOf('\/')
      return str.substring(index + 1, str.length)
    },

    handleCancel () {
      this.previewVisible = false
    },
    handlePreview (url) {
      this.previewImage = url
      this.previewVisible = true
    },

    seeHandle (url) {
      const type = url.split('.')[1]
      if (type === 'pdf') {
        this.pdfUrl = url
      } else {
        this.previewImage = url
        this.previewVisible = true
      }
    },
    closePdfHandle () {
      this.pdfUrl = ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../index.less';
  /deep/ .ant-form-item {
    margin-bottom: 12px !important;
  }
  .file-name {
    font-weight: 500;
  }
  .digest-con {
    font-weight: 500;
  }
  .item-child-con {
    font-weight: 500;
    line-height: 1.3;
    min-height: 36px;
  }
</style>
