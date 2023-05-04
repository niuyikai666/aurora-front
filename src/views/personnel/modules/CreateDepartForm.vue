<template>
  <a-modal
    title="新建部门"
    :width="348"
    :visible="visible"
    :confirmLoading="loading"
    @cancel="() => $emit('cancel')"
  >
    <template slot="footer">
      <a-button key="cancel" @click="cancelHandle">取 消</a-button>
      <a-button key="create" type="primary" @click="createHandle">新 建</a-button>
    </template>
    <a-spin :spinning="loading">
      <a-form
        class="form"
        :form="form"
      >
        <a-form-item label="部门名称">
          <a-input
            v-decorator="['title', { rules: [{ required: true, message: '部门名称不能为空' }] }]"
          />
        </a-form-item>
        <!-- <a-form-item label="请选择上级部门">
          <a-select
            v-decorator="[
              'depart',
              { rules: [{ required: true, message: '请选择上级部门' }] },
            ]"
            placeholder="请选择上级部门"
          >
            <a-select-option value="male">
              male
            </a-select-option>
            <a-select-option value="female">
              female
            </a-select-option>
          </a-select>
        </a-form-item> -->
        <a-form-item label="部门负责人">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '部门负责人不能为空' }] }]"
          />
        </a-form-item>
        <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
        <!-- <a-form-item v-show="model && model.id > 0" label="主键ID">
          <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
        </a-form-item>
        <a-form-item label="描述">
          <a-input v-decorator="['description', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]" />
        </a-form-item> -->
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['title', 'name']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  created () {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  methods: {
    cancelHandle () {
      this.$emit('cancel')
    },
    createHandle () {
      this.$emit('create')
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
