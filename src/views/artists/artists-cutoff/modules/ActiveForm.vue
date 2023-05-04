<template>
  <a-modal
    title="激活申请审核"
    :width="348"
    :visible="visible"
    @cancel="() => $emit('cancel')"
  >
    <template slot="footer">
      <a-button key="cancel" @click="$emit('cancel')">取 消</a-button>
      <a-button key="create" type="primary" @click="confirmHandle">确认</a-button>
    </template>
    <a-spin :spinning="false">
      <a-form
        class="form"
        :form="form"
        layout="inline"
      >
        <a-form-item class="form-item" label="激活时间">
          <p>{{ detail.activityDate ? detail.activityDate : '-' }}</p>
        </a-form-item>
        <br />
        <a-form-item class="form-item" label="激活招募">
          <p>{{ detail.newRecruitName ? detail.newRecruitName : '-' }}</p>
        </a-form-item>
        <br />
        <a-form-item class="form-item" label="激活运营">
          <p>{{ detail.newOperateName ? detail.newOperateName : '-' }}</p>
        </a-form-item>
        <br />
        <a-form-item class="form-item" label="审核结果">
          <a-radio-group
            v-decorator="['state', { initialValue: 3 }]"
          >
            <a-radio :value="3">
              通过
            </a-radio>
            <a-radio :value="4">
              不通过
            </a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getCutoffActiedApplyDetail, cutoffActiedApplyCheck } from '@/api/artists'

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      detail: {},
      departments: []
    }
  },
  mounted () {
    this.getCutoffActiedApplyDetailHandle()
  },
  methods: {
    getCutoffActiedApplyDetailHandle () {
      getCutoffActiedApplyDetail(this.id).then(res => {
        this.detail = res
      })
    },

    confirmHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.confirmSubmit(values.state)
        }
      })
    },
    confirmSubmit (state) {
      cutoffActiedApplyCheck(this.id, state).then(() => {
        this.$message.success('操作成功')
        this.$emit('success')
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .form {
    .ant-form-item {
      margin-bottom: 0;
    }
  }
</style>
