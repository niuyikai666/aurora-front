<template>
  <a-modal
    class="modal"
    title="录入有效招募任务目标数"
    :width="400"
    :visible="visible"
    @cancel="onClose"
  >
    <template slot="footer">
      <a-button class="disable" type="primary" :style="{ marginRight: '16px' }" @click="onClose">取消</a-button>
      <a-button type="primary" @click="hadleConfirm">确认</a-button>
    </template>
    <div>
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :xs="24" :md="24">
            <a-form-item
              label="月份">
              <a-month-picker
                v-decorator="['monthCycle',{rules: [{ required: true, message: '请选择'}]}]"
                style="width:100%;"
                :disabled-date="disabledDate"
                value-format="YYYY-MM">
              </a-month-picker>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="24">
            <a-form-item
              label="任务目标数">
              <a-input-number style="width:100%;" :min="1" placeholder="请输入" v-decorator="['targetCount',{rules: [{ required: true, message: '请输入任务目标数'}]}]" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
import { saveGroupTarget } from '@/api/task'
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
      monthCycle: moment(new Date()).subtract(1, 'months').format('YYYY-MM')
    }
  },
  async mounted () {
  },
  methods: {
    onClose () {
      this.form.resetFields()
      this.$emit('cancel')
    },
    hadleConfirm () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const data = {
            ...values
          }

          this.handleSave(data)
        }
      })
    },
    handleSave (data) {
      saveGroupTarget(data).then(() => {
        this.$message.success('操作成功')
        this.onClose()
      })
    },
    disabledDate (time) {
      // return time.valueOf() > moment(new Date()).subtract(1, 'months') || time.valueOf() < new Date('2021-12')
      return time.valueOf() > moment(new Date())
    }
  }
}
</script>

<style lang="less" scoped>
  .upload-con {
    margin-top: 30px;
    display: flex;
    padding-left: 12px;
    .up-item {
      flex: 1;
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
