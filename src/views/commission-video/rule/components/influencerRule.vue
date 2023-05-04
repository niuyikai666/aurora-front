<template>
  <a-modal
    title="编辑主播任务提成比例（默认左闭右开）"
    :visible="visible"
    ok-text="确认"
    @ok="submitHandle"
    :confirmLoading="loading"
    @cancel="$emit('cancel')"
    :destroyOnClose="true"
  >
    <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
      <a-form-item label="任务档位">
        <span>{{ levelType.msg }}</span>
      </a-form-item>
      <a-form-item label="有效直播天数">
        <div class="commission-flex">
          <a-input-number
            :min="0"
            :step="1"
            :precision="0"
            v-decorator="['effectDayMin']"
            class="mr5"/>
          ~
          <a-input-number
            :min="0"
            :step="1"
            :precision="0"
            v-decorator="['effectDayMax']"
            class="ml5"
          />
        </div>
      </a-form-item>
      <a-form-item label="有效直播时长">
        <div class="commission-flex">
          <a-input-number
            :min="0"
            :step="1"
            :precision="0"
            v-decorator="['liveDurationMin']"
            class="mr5"/>
          ~
          <a-input-number
            :min="0"
            :step="1"
            :precision="0"
            v-decorator="['liveDurationMax']"
            class="ml5"
          />
        </div>
      </a-form-item>
      <a-form-item label="短视频投稿天数">
        <div class="commission-flex">
          <a-input-number
            :min="0"
            :step="1"
            :precision="0"
            v-decorator="['videoContributeDayMin']"
            class="mr5"/>
          ~
          <a-input-number
            :min="0"
            :step="1"
            :precision="0"
            v-decorator="['videoContributeDayMax']"
            class="ml5"
          />
        </div>
      </a-form-item>
      <a-form-item label="短视频条数">
        <div class="commission-flex">
          <a-input-number
            :min="0"
            :step="1"
            :precision="0"
            v-decorator="['videoCountMin']"
            class="mr5"/>
          ~
          <a-input-number
            :min="0"
            :step="1"
            :precision="0"
            v-decorator="['videoCountMax']"
            class="ml5"
          />
        </div>
      </a-form-item>
      <a-form-item label="佣金比例">
        <div class="commission-flex">
          <a-input-number
            :min="0"
            :max="100"
            v-decorator="['commissionRate', {rules: [{ required: false}], initialValue: 0}]"
            class="mr5"
            style="width:100%"/>
          %
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { getInfluencerCommissionDetail, updateInfluencerCommission, manualTrigger } from '@/api/commission-video'
export default {
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this),
      levelType: {}
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: [Number, String],
      default: ''
    }
  },
  components: {},

  mounted () {},

  methods: {
    getDetail () {
      getInfluencerCommissionDetail({
        id: this.id
      }).then(res => {
        this.levelType = res.levelType
        this.form.setFieldsValue({
          commissionRate: res.commissionRate,
          effectDayMax: res.effectDayMax,
          effectDayMin: res.effectDayMin,
          liveDurationMax: res.liveDurationMax,
          liveDurationMin: res.liveDurationMin,
          videoContributeDayMax: res.videoContributeDayMax,
          videoContributeDayMin: res.videoContributeDayMin,
          videoCountMax: res.videoCountMax,
          videoCountMin: res.videoCountMin
        })
      })
    },
    submitHandle () {
      this.form.validateFields((err, values) => {
         if (!err) {
          if (this.loading) return
          this.loading = true
          for (const i in values) {
            if ((!values[i])) values[i] = 0
          }
          updateInfluencerCommission({
            ...values,
            id: this.id
          }).then(res => {
            manualTrigger()
            this.loading = false
            this.$message.success('操作成功')
            this.$emit('cancel')
            this.$parent.refresh()
          }).catch(() => {
            this.loading = false
          })
         }
       })
    }
  },
  watch: {
    visible: {
      handler (val) {
        if (val) {
          this.getDetail()
        }
      },
      immediate: true,
      deep: true
    }
  }
}

</script>
<style lang='less' scoped>
.commission-flex{
  display: flex;
  /deep/ .ant-input-number{
    flex: 1;
  }
  line-height: 30px;
}
</style>
