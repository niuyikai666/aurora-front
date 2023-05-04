<template>
  <a-modal
    title="豁免"
    :visible="visible"
    :loading="loading"
    @cancel="$emit('cancel')"
    @ok="submit"
    :confirmLoading="loading"
    :destroyOnClose="true"
  >
    <a-form :form="form" :label-col="{ span: 9 }" :wrapper-col="{ span: 14 }">
      <a-form-item
        label="豁免专业主播进阶任务">
        <a-select
          v-decorator="['exemptionMajorAdvanced', {rules: [{ required: true, message: '请选择是否豁免专业主播进阶任务'}], initialValue: 0}]"
          placeholder="请选择">
          <a-select-option :value="1">是</a-select-option>
          <a-select-option :value="0">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="豁免拉新主播进阶任务">
        <a-select
          placeholder="请选择"
          v-decorator="['exemptionLachineAdvanced', {rules: [{ required: true, message: '请选择是否豁免拉新主播进阶任务'}], initialValue: 0}]"
        >
          <a-select-option :value="1">是</a-select-option>
          <a-select-option :value="0">否</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="豁免流水增长任务">
        <a-select
          placeholder="请选择"
          v-decorator="['exemptionRewardIncrease', {rules: [{ required: true, message: '请选择是否豁免流水增长任务'}], initialValue: 0}]"
        >
          <a-select-option :value="1">是</a-select-option>
          <a-select-option :value="0">否</a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { exemptVideoTask } from '@/api/commission-video'

export default {
  name: 'AddDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this)
    }
  },
  async mounted () {
  },
  methods: {
    submit () {
      this.form.validateFields((err, values) => {
        if (!err) {
        if (this.loading) return
        this.loading = true
        exemptVideoTask({
          ...values,
          ids: this.data
        }).then(res => {
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
      handler(val) {
        if (val) {
          this.monthDate = ''
        }
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
  .upload-con {
    text-align: left;
    .up-item {
      color: #303033;
      margin-bottom: 15px;
      .down {
        color: #755DD7;
        margin-left: 16px;
      }
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
  .up-dragger-text {
    .ant-upload-drag-icon {
      color: #755DD7;
      .up-tip {
        margin-top: 20px;
        margin-bottom: 5px;
      }
    }
    .upload-text {
      color: #A2A2A2;
      font-size: 12px;
    }
  }
  .upload-dragger {
    margin-top: 10px;
  }
  /deep/ .ant-upload.ant-upload-drag {
    width: 380px;
    background-color: #fff;
  }
  /deep/ .ant-upload.ant-upload-drag .ant-upload {
    padding: 50px 0;
  }
  /deep/ .ant-upload-list {
    display: none;
  }

  .loadding-con {
    padding: 50px 0;
  }
</style>
