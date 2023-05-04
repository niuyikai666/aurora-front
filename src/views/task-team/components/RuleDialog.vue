<template>
  <a-modal
    class="modal"
    :title="groupCode != null ? '编辑' : '新增'"
    :width="800"
    :visible="visible"
    :destroyOnClose="true"
    @cancel="onClose"
  >
    <template slot="footer">
      <span>
        <a-button class="disable" type="primary" @click="onClose">取消</a-button>
        <a-button type="primary" @click="hadleConfirm" :loading="loading">确认</a-button>
      </span>
    </template>
    <a-form :form="form" layout="inline">
      <a-row :gutter="24">
        <a-col :xs="24" :md="24" style="padding-left:20px; height:60px;">
          <a-form-item
            required
            label="基线日均流水区间">
            <a-input-number style="width: 180px;" placeholder="请输入" v-decorator="['minNum',{rules: [{ required: true, message: '请输入区间'}]}]" /> 至
            <a-input-number style="width: 180px;" placeholder="请输入" v-decorator="['maxNum',{rules: [{ required: true, message: '请输入区间'}]}]" />
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="24" style="padding-left:49px; height:60px;">
          <a-form-item
            label="是否比例增长">
            <a-select
              style="width:180px;"
              v-decorator="['isRatio',{rules: [{ required: true, message: '请选择isRatio'}]}]"
              placeholder="请选择"
            >
              <a-select-option :value="1">
                是
              </a-select-option>
              <a-select-option :value="0">
                否
              </a-select-option>
            </a-select>
            <span class="ml12">选“是”则目标为日均增长比例，选“否”则目标为月度总目标流水</span>
          </a-form-item>
        </a-col>
        <a-col :xs="24" :md="24" style="height:60px;">
          <a-form-item
            :label="form.getFieldValue('isRatio') === 1 ? '目标1日均增长比例' : '目标1月度总目标流水'">
            <a-input-number style="width:100%;" placeholder="请输入" v-decorator="['targetOne',{rules: [{ required: true, message: '请输入目标1'}]}]" />
          </a-form-item>
          <span style="position: relative;left:-10px;top:10px;">{{ form.getFieldValue('isRatio') === 1 ? `%` : '' }}</span>
          <a-form-item
            label="目标1达成后提成比例">
            <a-input-number style="width:100%;" placeholder="请输入" v-decorator="['targetOneResult',{rules: [{ required: true, message: '请输入目标1达成后提成比例'}]}]" />
          </a-form-item>
          <span style="position: relative;left:-10px;top:10px;">%</span>
        </a-col>
        <a-col :xs="24" :md="24" style="height:60px;">
          <a-form-item
            :label="form.getFieldValue('isRatio') === 1 ? '目标2日均增长比例' : '目标2月度总目标流水'">
            <a-input-number style="width:100%;" placeholder="请输入" v-decorator="['targetTwo',{rules: [{ required: true, message: '请输入目标2'}]}]" />
          </a-form-item>
          <span style="position: relative;left:-10px;top:10px;">{{ form.getFieldValue('isRatio') === 1 ? `%` : '' }}</span>
          <a-form-item
            label="目标2达成后提成比例">
            <a-input-number style="width:100%;" placeholder="请输入" v-decorator="['targetTwoResult',{rules: [{ required: true, message: '请输入目标2达成后提成比例'}]}]" />
          </a-form-item>
          <span style="position: relative;left:-10px;top:10px;">%</span>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { groupRuleCreate, groupRuleEdit, groupRuleDetail } from '@/api/task'

const fileds = [
  'isRatio',
  'maxNum',
  'minNum',
  'targetOne',
  'targetOneResult',
  'targetTwo',
  'targetTwoResult'
]

export default {
  name: 'ImportComp',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    groupCode: {
      type: String,
      default: null
    },
    id: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      loading: false
    }
  },
  async mounted () {
    // 防止表单未注册
    fileds.forEach(item => {
      this.form.getFieldDecorator(item)
    })
  },
  methods: {
    hadleConfirm () {
      if (this.loading) return
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          const data = {
            groupCode: this.groupCode || undefined,
            ...values
          }
          if (this.groupCode !== null) {
            this.handleEdit(data)
          } else {
            this.handleCreate(data)
          }
        }
      })
    },
    handleCreate (data) {
      groupRuleCreate(data).then(() => {
        this.loading = false
        this.optSuccess('操作成功！')
      }).catch(() => {
        this.loading = false
      })
    },
    handleEdit (data) {
      groupRuleEdit(data).then(() => {
        this.loading = false
        this.optSuccess('操作成功！')
      }).catch(() => {
        this.loading = false
      })
    },
    getDetail () {
      groupRuleDetail(this.id).then(res => {
        this.form.setFieldsValue(pick(res, fileds))
      })
    },
    optSuccess (msg) {
      this.$message.success(msg)
      this.$emit('success')
    },
    onClose () {
      this.$emit('cancel')
    }
  },
  watch: {
    visible (val) {
      if (val && this.id) {
        this.getDetail()
      }
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
