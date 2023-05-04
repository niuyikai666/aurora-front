<template>
  <a-modal
    title="新增零招募提成主播"
    :visible="visible"
    :destroyOnClose="true"
    :confirmLoading="loading"
    @cancel="$emit('cancel')"
    @ok="submit"
  >
    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
      <a-form-item label="平台">
        <a-select
          placeholder="请选择"
          v-decorator="['platform', { rules: [{ required: true, message: '请选择平台!' }] }]">
          <a-select-option :value="li.value" v-for="li in platformList" :key="li.value">{{ li.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="主播ID">
        <a-input
          placeholder="请输入"
          v-decorator="['tiktokLiveInfoId', { rules: [{ required: true, message: '请输入主播ID!' }] }]"
        />
      </a-form-item>
      <a-form-item label="核心年月">
        <a-month-picker style="width:100%" value-format="YYYY-MM" v-decorator="['monthCycle', { rules: [{ required: true, message: '请选择核心年月!' }] }]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { addZero } from '@/api/global-data'
export default {
  data () {
   return {
    form: this.$form.createForm(this),
    loading: false,
    platformList: [{
      name: '抖音',
      value: 0
    }, {
      name: '视频号',
      value: 1
    }]
   }
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {},

  mounted () {},

  methods: {
    submit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          addZero(values).then(res => {
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
