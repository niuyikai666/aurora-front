<template>
  <a-modal
    :visible="visibleModal"
    title="创建激活申请"
    :destroyOnClose="true"
    :confirmLoading="confirmLoading"
    @ok="submit"
    @cancel="cancel"
  >
    <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="主播抖音ID">
        <a-input
          v-decorator="['tiktokCode', { rules: [{ required: true, message: '请输入主播抖音ID!' }] }]"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="主播真实姓名">
        <a-input
          v-decorator="['realName', { rules: [{ required: true, message: '请输入主播真实姓名!' }] }]"
          placeholder="请输入"
        />
      </a-form-item>
      <a-form-item label="激活后运营人">
        <search-employee
          v-decorator="['operatorEmpId', {rules: [{ required: true, message: '请选择运营人'}]}]"
          placeholder="请输入"
          :searchFn="artistSearch2"
        />
      </a-form-item>
    </a-form>
    <div class="modal-tip">
      <div>激活主播要求：</div>
      <div>1、连续断播60天的主播，允许提交</div>
      <div>2、激活提交后，从激活当天起30天内，主播累计达到10个直播有效天，允许被激活</div>
      <div>3、提交后退会，会造成激活失败</div>
    </div>
  </a-modal>
</template>

<script>
import { addApplyList } from '@/api/actived'
import { artistSearch2 } from '@/api/gold'
import searchEmployee from '../../components/searchEmployee'
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      artistSearch2,
      confirmLoading: false,
      visibleModal: false
    }
  },

  components: {
    searchEmployee
  },

  mounted () {},

  methods: {
    cancel () {
      this.$emit('cancel')
    },
    submit () {
      this.form.validateFields((err, values) => {
          if (!err) {
            const params = JSON.parse(JSON.stringify(values))
            params.operatorEmpId = params.operatorEmpId.key
            this.confirmLoading = true
            addApplyList(params).then(res => {
              this.confirmLoading = false
              this.$message.success('操作成功')
              this.cancel()
              this.$parent.searchHandle()
            }).catch(() => {
              this.confirmLoading = false
            })
          }
        })
    }
  },
  watch: {
    visible: {
      handler (val) {
        this.visibleModal = val
      },
      immediate: true
    }
  }
}

</script>
<style lang='less' scoped>
.modal-tip{
  color:#DC0D0D;
  line-height: 22px;
  padding-left: 20px;
}
</style>
