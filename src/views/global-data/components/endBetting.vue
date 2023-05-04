<template>
  <a-modal
    title="结束对赌"
    :visible="visible"
    :destroyOnClose="true"
    :confirmLoading="loading"
    @cancel="$emit('cancel')"
    @ok="submit"
  >
    <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="选择结束时间">
        <a-month-picker style="width:100%" value-format="YYYY-MM" v-decorator="['endDateMonthCycle', { rules: [{ required: true, message: '请选择结束时间!' }] }]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { endBetting } from '@/api/global-data'
export default {
  data () {
   return {
    form: this.$form.createForm(this),
    loading: false
   }
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    id: {
      type: [String, Number],
      default: ''
    }
  },
  components: {},

  mounted () {},

  methods: {
    submit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          endBetting({
            ...values,
            actorId: this.id
          }).then(res => {
            this.$message.success('操作成功')
            this.$emit('cancel')
            this.$parent.refresh()
            this.loading = false
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
      }
    }
  }
}

</script>
<style lang='less' scoped>
</style>
