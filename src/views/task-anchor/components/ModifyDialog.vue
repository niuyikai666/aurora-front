<template>
  <a-modal
    class="modal"
    :title="model && '编辑'|| '新增外站优质主播'"
    :width="400"
    :visible="visible"
    @cancel="onClose"
  >
    <template slot="footer">
      <a-button class="disable" type="primary" :style="{ marginRight: '16px' }" @click="onClose">取消</a-button>
      <a-button type="primary" @click="hadleConfirm" :loading="btnLoading">确认</a-button>
    </template>
    <div>
      <a-form :form="form">
        <a-form-item label="抖音号原" :required="true">
          <a-input
            placeholder="请输入抖音号原"
            v-decorator="['tiktokCodeOrig', {rules: [{ required: true, message: '请输入抖音号原' }]}]"
          ></a-input>
        </a-form-item>
        <a-form-item label="扶持开始时间" :required="true">
          <a-date-picker
            v-decorator="['supportBeginTime', {rules: [{ required: true, message: '请选择扶持开始时间' }]}]"
            style="width:100%;"
            value-format="YYYY-MM-DD">
          </a-date-picker>
        </a-form-item>
        <a-form-item label="扶持结束时间" :required="true">
          <a-date-picker
            v-decorator="['supportEndTime', {rules: [{ required: true, message: '请选择扶持结束时间' }]}]"
            style="width:100%;"
            value-format="YYYY-MM-DD">
          </a-date-picker>
        </a-form-item>
        <a-form-item label="优质等级" :required="true">
          <a-select
            v-decorator="['actorLevel', {rules: [{ required: true, message: '请选择优质等级' }]}]"
            placeholder="请选择"
          >
            <a-select-option v-for="(value, key) in gradeMap" :key="key" :value="key">
              {{ value }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { createOuterAnchor, editOuterAnchor } from '@/api/task-anchor'

export default {
  name: 'ImportComp',
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
      gradeMap: {
        'S': 'S',
        'S+': 'S+',
        'A': 'A',
        'B': 'B',
        'C': 'C'
      },
      btnLoading: false,

      fileds: [
        'tiktokCodeOrig',
        'supportBeginTime',
        'supportEndTime',
        'actorLevel'
      ]
    }
  },
  async mounted () {
  },
  methods: {
    hadleConfirm () {
      this.btnLoading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.model) {
            this.handleEditOuterAnchor({
              ...this.model,
              ...values
            })
          } else {
            this.handleCreateOuterAnchor({ ...values })
          }
        }
      })
    },
    handleCreateOuterAnchor (data) {
      createOuterAnchor(data).then(() => {
        this.optSuccess('新增成功！')
      })
    },
    handleEditOuterAnchor (data) {
      editOuterAnchor(data).then(() => {
        this.optSuccess('修改成功！')
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
    setModel (data) {
      this.$nextTick(() => {
        this.form.setFieldsValue(pick(data, this.fileds))
      })
    },
    disabledDate (time) {
      return time.valueOf() > Date.now() || time.valueOf() < new Date('2021-12')
    }
  },
  watch: {
    model (data) {
      if (data) {
        this.setModel(data)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .ant-form-item {
    margin-bottom: 0;
  }
</style>
