<template>
  <a-modal
    class="modal"
    title="导入"
    :width="500"
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
          <div class="label">黑天鹅主播</div>
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
        <div class="up-item">
          <div class="label">本月流水</div>
          <a-upload
            name="file"
            :multiple="true"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :customRequest="customRequest"
          >
            <a-button :loading="loading2" @click="upType = 'settlement'" icon="upload"> 上传</a-button>
          </a-upload>
          <div class="msg" v-if="upMsg2">上传成功</div>
        </div>
        <div class="up-item">
          <div class="label">小组人数</div>
          <a-upload
            name="file"
            :multiple="true"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :customRequest="customRequest"
          >
            <a-button :loading="loading3" @click="upType = 'person'" icon="upload"> 上传</a-button>
          </a-upload>
          <div class="msg" v-if="upMsg3">上传成功</div>
        </div>
        <div class="up-item">
          <div class="label">小组增长比例</div>
          <a-upload
            name="file"
            :multiple="true"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :customRequest="customRequest"
          >
            <a-button :loading="loading4" @click="upType = 'rate'" icon="upload"> 上传</a-button>
          </a-upload>
          <div class="msg" v-if="upMsg4">上传成功</div>
        </div>
        <!-- <div class="up-item">
          <div class="label">分公司目标</div>
          <a-upload
            name="file"
            :multiple="true"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :customRequest="customRequest"
          >
            <a-button :loading="loading5" @click="upType = 'company'" icon="upload"> 上传</a-button>
          </a-upload>
          <div class="msg" v-if="upMsg5">上传成功</div>
        </div> -->
      </div>
      <div class="upload-con" style="align-items: left;">
        <div class="up-item">
          <div class="label">分公司流水任务增长率</div>
          <a-upload
            name="file"
            :multiple="true"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :customRequest="customRequest"
          >
            <a-button :loading="loading6" @click="upType = 'companyRewardRate'" icon="upload"> 上传</a-button>
          </a-upload>
          <div class="msg" v-if="upMsg6">上传成功</div>
        </div>
        <div class="up-item">
          <div class="label">分公司运营人数</div>
          <a-upload
            name="file"
            :multiple="true"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            :customRequest="customRequest"
          >
            <a-button :loading="loading7" @click="upType = 'companyOperate'" icon="upload"> 上传</a-button>
          </a-upload>
          <div class="msg" v-if="upMsg7">上传成功</div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script>
import { importBlackArtists, importSettltment, importGroupNumber, importIncreaseRate, importCompanyTarget, importCompanyRewardRate, importCompanyOperate, groupCaculate } from '@/api/task'
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
      monthCycle: moment().format('YYYY-MM'),
      upType: 'balckartist',
      loading1: false,
      loading2: false,
      loading3: false,
      loading4: false,
      loading5: false,
      loading6: false,
      loading7: false,
      upMsg1: '',
      upMsg2: '',
      upMsg3: '',
      upMsg4: '',
      upMsg5: '',
      upMsg6: '',
      upMsg7: ''
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
    customRequest (data) {
      const formData = new FormData()
      formData.append('monthCycle', this.monthCycle)
      formData.append('multipartFile', data.file)

      switch (this.upType) {
        case 'balckartist':
          this.loading1 = true
          this.upMsg1 = ''
          this.uploadHandle(formData, importBlackArtists)
          break
        case 'settlement':
          this.loading2 = true
          this.upMsg2 = ''
          this.uploadHandle(formData, importSettltment)
          break
        case 'person':
          this.loading3 = true
          this.upMsg3 = ''
          this.uploadHandle(formData, importGroupNumber)
          break
        case 'rate':
          this.loading4 = true
          this.upMsg4 = ''
          this.uploadHandle(formData, importIncreaseRate)
          break
        case 'company':
          this.loading5 = true
          this.upMsg5 = ''
          this.uploadHandle(formData, importCompanyTarget)
          break
        case 'companyRewardRate':
          this.loading6 = true
          this.upMsg6 = ''
          this.uploadHandle(formData, importCompanyRewardRate)
          break
        case 'companyOperate':
          this.loading7 = true
          this.upMsg7 = ''
          this.uploadHandle(formData, importCompanyOperate)
          break
        default:
          break
      }
    },
    uploadHandle (formData, fn) {
      fn(formData).then(res => {
        this.setMsg('上传成功')
      }).catch(() => {
        this.setMsg('')
      })
    },
    setMsg (message) {
      switch (this.upType) {
        case 'balckartist':
          this.upMsg1 = message
          this.loading1 = false
          break
        case 'settlement':
          this.upMsg2 = message
          this.loading2 = false
          break
        case 'person':
          this.upMsg3 = message
          this.loading3 = false
          break
        case 'rate':
          this.upMsg4 = message
          this.loading4 = false
          break
        case 'company':
          this.upMsg5 = message
          this.loading5 = false
          break
        case 'companyRewardRate':
          this.upMsg6 = message
          this.loading6 = false
          break
        case 'companyOperate':
          this.upMsg7 = message
          this.loading7 = false
          break
        default:
          break
      }
    },
    uploadStatusReset () {
      this.loading1 = this.loading2 = this.loading3 = this.loading4 = this.loading5 = this.loading6 = this.loading7 = false
      this.upMsg1 = this.upMsg2 = this.upMsg3 = this.upMsg4 = this.upMsg5 = this.upMsg6 = this.upMsg7 = ''
    },
    disabledDate (time) {
      return time.valueOf() > Date.now() || time.valueOf() < new Date('2021-12')
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
    &::after {
      display: block;
      content: '';
      clear: both;
    }
    .up-item {
      float: left;
      margin-right: 24px;
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
