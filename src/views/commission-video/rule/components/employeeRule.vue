<template>
  <a-modal
    :title="`编辑${title}`"
    :visible="visible"
    ok-text="确认"
    @ok="submitHandle"
    :confirmLoading="loading"
    @cancel="$emit('cancel')"
    :destroyOnClose="true"
  >
    <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
      <a-form-item label="讲师">
        <a-input-number
          :min="0"
          :max="100"
          v-decorator="['lecturerRatio']"
          style="width:90%"/> %
      </a-form-item>
      <a-form-item label="招募">
        <a-input-number
          :min="0"
          :max="100"
          v-decorator="['recruitRatio', {rules: [{ required: false}], initialValue: 0}]"
          style="width:90%"/> %
      </a-form-item>
      <a-form-item label="运营">
        <a-input-number
          :min="0"
          :max="100"
          v-decorator="['operatorRatio', {rules: [{ required: false}], initialValue: 0}]"
          style="width:90%"/> %
      </a-form-item>
      <a-form-item label="组长">
        <a-input-number
          :min="0"
          :max="100"
          v-decorator="['groupRatio', {rules: [{ required: false}], initialValue: 0}]"
          style="width:90%"/> %
      </a-form-item>
      <a-form-item label="分公司负责人">
        <a-input-number
          :min="0"
          :max="100"
          v-decorator="['companyRatio', {rules: [{ required: false}], initialValue: 0}]"
          style="width:90%"/> %
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { getEmployeeCommissionDetail, updateEmployeeCommission } from '@/api/commission-video'
export default {
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this)
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
    },
    title: {
      type: String,
      default: ''
    }
  },
  components: {},

  mounted () {},

  methods: {
    getDetail () {
      getEmployeeCommissionDetail({
        id: this.id
      }).then(res => {
        this.form.setFieldsValue({
          companyRatio: res.companyRatio,
          groupRatio: res.groupRatio,
          lecturerRatio: res.lecturerRatio,
          operatorRatio: res.operatorRatio,
          recruitRatio: res.recruitRatio
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
          updateEmployeeCommission({
            ...values,
            id: this.id
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
</style>
