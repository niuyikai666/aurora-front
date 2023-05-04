<template>
  <a-modal
    title="新增零签约对赌主播"
    :visible="visible"
    :destroyOnClose="true"
    :confirmLoading="loading"
    @cancel="$emit('cancel')"
    @ok="submit"
  >
    <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
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
          v-decorator="['actorId', { rules: [{ required: true, message: '请输入主播ID!' }] }]"
        />
      </a-form-item>
      <a-form-item label="是否计算主播佣金">
        <a-select
          placeholder="请选择"
          v-decorator="['actorIsHaveCommission', { rules: [{ required: true, message: '请选是否计算主播佣金!' }] }]">
          <a-select-option :value="li.value" v-for="li in boolList" :key="li.value">{{ li.name }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="管理提成发放比例">
        <a-input-number
          style="width:100%"
          placeholder="请输入"
          v-decorator="['adminCommissionRatio', { rules: [{ required: true, message: '请输入管理提成发放比例!' }] }]"
        />
      </a-form-item>
      <a-form-item label="开始年月">
        <a-month-picker style="width:100%" value-format="YYYY-MM" v-decorator="['startDateMonthCycle', { rules: [{ required: false, message: '请选择核心年月!' }] }]"/>
      </a-form-item>
      <a-form-item label="结束年月">
        <a-month-picker style="width:100%" value-format="YYYY-MM" v-decorator="['endDateMonthCycle', { rules: [{ required: false, message: '请选择核心年月!' }] }]"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { addBetting } from '@/api/global-data'
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
    }],
    boolList: [{
      name: '有佣金',
      value: 1
    }, {
      name: '无佣金',
      value: 0
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
          addBetting(values).then(res => {
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
