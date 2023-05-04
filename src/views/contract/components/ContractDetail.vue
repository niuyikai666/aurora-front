<template>
  <div>
    <tab-content
      title="合同基础信息"
      :titleLine="true"
    >
      <a-row :gutter="80">
        <a-col :md="8">
          <a-form-item
            label="签约类型">
            <div class="item-child-con">{{ model.signType }}</div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="合同编号">
            <div class="item-child-con">{{ model.code }}</div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="合同模版">
            <div class="item-child-con">{{ model.tempType }}</div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="80">
        <a-col :md="8">
          <a-form-item
            label="甲方信息">
            <div class="item-child-con">{{ model.paType }}</div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="姓名">
            <div class="item-child-con">{{ model.pbName }}</div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="电话号码">
            <div class="item-child-con">{{ model.pbMobile }}</div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="80">
        <a-col :md="8">
          <a-form-item
            label="身份证号">
            <div class="item-child-con">{{ model.pbIdCard }}</div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="联系地址">
            <div class="item-child-con">{{ model.pbAddress }}</div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="开户行">
            <div class="item-child-con">{{ model.pbBank }}</div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="80">
        <a-col :md="8">
          <a-form-item
            label="卡号">
            <div class="item-child-con">{{ model.pbBankCard }}</div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="支付宝">
            <div class="item-child-con">{{ model.pbAliPay }}</div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="艺人类型">
            <div class="item-child-con">{{ model.actorType }}</div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="80">
        <a-col :md="8">
          <a-form-item
            class="form-item-flex"
            label="身份证正面">
            <div v-if="idCardFrontUrl" class="upload-con" :class="{'border-zero': idCardFrontUrl}">
              <img class="picture" :src="baseUrl + idCardFrontUrl" @click="handlePreview(baseUrl + idCardFrontUrl)" alt="">
            </div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            class="form-item-flex align-item-top"
            label="身份证反面">
            <div v-if="idCardBackUrl" class="upload-con" :class="{'border-zero': idCardBackUrl}">
              <img class="picture" :src="baseUrl + idCardBackUrl" @click="handlePreview(baseUrl + idCardBackUrl)" alt="">
            </div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            class="form-item-flex align-item-top"
            label="手持身份证">
            <div v-if="idCardHoldUrl" class="upload-con" :class="{'border-zero': idCardHoldUrl}">
              <img class="picture" :src="baseUrl + idCardHoldUrl" @click="handlePreview(baseUrl + idCardHoldUrl)" alt="">
            </div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            class="form-item-flex"
            label="无忧渠道分成比例(即主合同的商务分成比例)(乙：甲)">
            <div class="item-child-con">
              <span class="child-item">
                乙 <span style="margin-left:10px;">{{ pbProp }}</span>
              </span>
              <span class="child-item">
                甲 <span style="margin-left:10px;">{{ paProp }}</span>
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
            <p v-if="contractConentUrl" class="file-name" style="padding-left:0;">{{ contractConentName }}</p>
            <a-button v-if="contractConentUrl" type="link" @click="seeHandle(baseUrl + contractConentUrl)">查看</a-button>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            class="form-item-flex"
            label="合同首页">
            <p class="file-name" style="padding-left:0;">{{ subStr(contractIndexPageUrl) }}</p>
            <a-button v-if="contractIndexPageUrl" type="link" @click="seeHandle(baseUrl + contractIndexPageUrl)">查看</a-button>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            class="form-item-flex"
            label="合同尾页">
            <p class="file-name" style="padding-left:0;">{{ subStr(contractLastPageUrl) }}</p>
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
      <a-row :gutter="80">
        <!-- <a-col :md="8">
          <a-form-item
            label="合同期限">
            <div class="item-child-con">{{ model.validityType }}</div>
          </a-form-item>
        </a-col> -->
        <a-col :md="8">
          <a-form-item class="form-item-flex" label="合同有效期">
            <div class="item-child-con">
              <div v-if="model.validityStartDate" class="item-child-con">{{ model.validityStartDate }} - {{ model.validityEndDate }}</div>
            </div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="合同类型">
            <div class="item-child-con">{{ model.contractType }}</div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="内容摘要">
            <div class="item-child-con" style="line-height:1.4;">{{ model.digest }}</div>
          </a-form-item>
        </a-col>
        <a-col :md="8">
          <a-form-item
            label="备注">
            <div class="item-child-con" style="line-height:1.4;">{{ model.remark }}</div>
          </a-form-item>
        </a-col>
      </a-row>
      <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
        <img style="width: 100%" :src="previewImage" />
      </a-modal>
    </tab-content>
    <PDF v-if="pdfUrl" :pdfurl="pdfUrl" @closepdf="closePdfHandle" />
  </div>
</template>

<script>
import { contractDetail } from '@/api/contract'
import { getContext } from '@/api/common'
import TabContent from './TabContent'
import PDF from '@/components/PDF'

export default {
  name: 'ContractDetailMainChild',
  components: {
    TabContent,
    PDF
  },
  props: {
    contractId: {
      type: Number || String,
      default: null
    }
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/files`,
      form: this.$form.createForm(this),
      model: {},

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

      identiryLoading: false,

      previewVisible: false,
      previewImage: '',

      pdfUrl: '',
      id: ''
    }
  },
  mounted () {
    this.getContractDetailHandle()
  },
  created () {
    if (this.contractId.indexOf('a') > -1) {
      this.id = Number(this.contractId.split('a')[1])
    } else {
      this.id = Number(this.contractId)
    }
  },
  methods: {
    getContractDetailHandle () {
      contractDetail(this.id).then(model => {
        model.actorType = model.actorType ? model.actorType.msg : ''
        model.contractType = model.contractType ? model.contractType.msg : ''
        model.paType = model.paType ? model.paType.msg : ''
        model.signType = model.signType ? model.signType.msg : ''
        model.tempType = model.tempType ? model.tempType.msg : ''

        this.idCardFrontUrl = model.pbIdCardFront
        this.idCardBackUrl = model.pbIdCardBack
        this.idCardHoldUrl = model.pbIdCardHold

        this.contractIndexPageUrl = model.index
        this.contractConentUrl = model.content
        this.contractConentName = model.contentName
        this.contractLastPageUrl = model.tail

        this.validityStartDate = model.validityStartDate
        this.validityEndDate = model.validityEndDate
        this.pbProp = model.pbProp
        this.paProp = model.paProp

        this.model = model
      })
    },
    getContextHandle () {
      this.identiryLoading = true
      getContext(this.contractConentUrl).then(res => {
        this.contractContent = res
        this.identiryLoading = false
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
  @import '../manage/index.less';
  /deep/ .ant-form-item {
    margin-bottom: 12px !important;
  }
  .file-name {
    font-weight: 500;
  }
  .item-child-con {
    font-weight: 500;
    line-height: 1.3;
    min-height: 36px;
  }
</style>
