<template>
  <a-modal
    class="modal"
    title="新增规则"
    :width="400"
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
        <a-form-item label="年月" :required="true">
          <a-month-picker
            v-decorator="['date', {rules: [{ required: true, message: '请选择' }]}]"
            style="width:100%;"
            value-format="YYYY-MM"
          >
          </a-month-picker>
        </a-form-item>
        <a-form-item label="是否暂停" :required="true">
          <a-select
            v-decorator="['skip', {rules: [{ required: true, message: '请选择' }]}]"
            placeholder="请选择"
          >
            <a-select-option :value="1">
              是
            </a-select-option>
            <a-select-option :value="0">
              否
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
import { ruleOuterModify } from '@/api/task-anchor'

export default {
  name: 'CreateRule',
  props: {
    visible: {
      type: Boolean,
      default: false
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
          this.handleModify(values)
        }
      })
    },
    handleModify (data) {
      ruleOuterModify(data).then(() => {
        this.optSuccess('新增成功！')
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
