<template>
  <a-modal
    title="编辑拉新主播进阶任务数据"
    :visible="visible"
    ok-text="确认"
    @ok="submitHandle"
    :confirmLoading="loading"
    @cancel="$emit('cancel')"
    :destroyOnClose="true"
  >
    <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
      <a-form-item label="年月">
        <span>{{ monthDate }}</span>
      </a-form-item>
      <a-form-item label="有效直播天数">
        <a-input-number
          style="width:100%"
          :min="0"
          :max="100"
          :step="1"
          :precision="0"
          v-decorator="['effectDay']"
        />
      </a-form-item>
      <a-form-item label="有效直播时长(小时)">
        <a-input-number
          style="width:100%"
          :min="0"
          :max="100"
          :step="1"
          :precision="0"
          v-decorator="['effLiveDurationHour']"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { getPullTaskDetail, updatePullTask } from '@/api/commission-video'
export default {
  data () {
    return {
      loading: false,
      form: this.$form.createForm(this),
      monthDate: ''
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
      getPullTaskDetail({
        id: this.id
      }).then(res => {
        this.monthDate = res.monthDate
        this.form.setFieldsValue({
          effectDay: res.effectDay,
          effLiveDurationHour: res.effLiveDurationHour
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
          updatePullTask({
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
.commission-flex{
  display: flex;
  /deep/ .ant-input-number{
    flex: 1;
  }
}
</style>
