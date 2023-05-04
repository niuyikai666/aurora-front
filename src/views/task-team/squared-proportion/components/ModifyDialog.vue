<template>
  <a-modal
    class="modal"
    title="新增运营提成提报比例"
    :width="600"
    :visible="visible"
    destroyOnClose
    @cancel="onClose"
  >
    <template slot="footer">
      <a-button class="disable" type="primary" @click="onClose">取消</a-button>
      <a-button type="primary" @click="hadleConfirm" :loading="btnLoading">确认</a-button>
    </template>
    <div>
      <a-form :form="form">
        <a-row :gutter="24">
          <template v-if="model">
            <a-col :xs="24" :md="12">
              <a-form-item
                label="主播昵称">
                <a-input disabled v-model="model.nickName" />
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="12">
              <a-form-item
                label="分成比">
                <a-input disabled v-model="model.splitRatio" />
              </a-form-item>
            </a-col>
          </template>
          <a-col :xs="24" :md="12">
            <a-form-item label="年月" :required="true">
              <a-month-picker
                v-decorator="['monthCycle', {rules: [{ required: true, message: '请选择年月' }]}]"
                style="width:100%;"
                value-format="YYYY-MM"
              >
              </a-month-picker>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item
              label="主持位主播分成比例">
              <a-input-number style="width:100%;" placeholder="请输入" v-decorator="['compereActorCommissionRation',{rules: [{ required: true, message: '请输入主持位主播分成比例'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item
              label="嘉宾位主播分成比例">
              <a-input-number style="width:100%;" placeholder="请输入" v-decorator="['guestActorCommissionRation',{rules: [{ required: true, message: '请输入嘉宾位主播分成比例'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item
              label="主持位运营分成比例">
              <a-input-number style="width:100%;" placeholder="请输入" v-decorator="['compereOperatorCommissionRation',{rules: [{ required: true, message: '请输入主持位运营分成比例'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item
              label="嘉宾位运营分成比例">
              <a-input-number style="width:100%;" placeholder="请输入" v-decorator="['guestOperatorCommissionRation',{rules: [{ required: true, message: '请输入嘉宾位运营分成比例'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item
              label="主持位招募分成比例">
              <a-input-number style="width:100%;" placeholder="请输入" v-decorator="['compereRecruitCommissionRation',{rules: [{ required: true, message: '请输入主持位招募分成比例'}]}]" />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12">
            <a-form-item
              label="嘉宾位招募分成比例">
              <a-input-number style="width:100%;" placeholder="请输入" v-decorator="['guestRecruitCommissionRation',{rules: [{ required: true, message: '请输入嘉宾位招募分成比例'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
import { squaredProportionModify } from '@/api/task'

export default {
  name: 'CreateRule',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    model: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      btnLoading: false
    }
  },
  async mounted () {
  },
  methods: {
    hadleConfirm () {
      this.btnLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = {
            tiktokLiveInfoId: this.model && this.model.tiktokLiveInfoId,
            ...values
          }
          this.handleModify(data)
        }
      })
    },
    handleModify (data) {
      squaredProportionModify(data).then(() => {
        this.optSuccess('新增成功！')
      }).catch(() => {
        this.btnLoading = false
      })
    },
    optSuccess (message) {
      this.$message.success(message)
      this.form.resetFields()
      this.$emit('success')
      this.btnLoading = false
    },
    onClose () {
      this.form.resetFields()
      this.$emit('cancel')
    },
    disabledDate (time) {
      return time.valueOf() > Date.now() || time.valueOf() < new Date('2021-12')
    }
  }
}
</script>

<style lang="less" scoped>
  .ant-form-item {
    margin-bottom: 0;
  }
</style>
