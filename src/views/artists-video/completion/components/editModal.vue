<template>
  <a-modal
    class="modal"
    :title="type === 1 ? '批量修改运营': '批量修改关系'"
    :width="510"
    :visible="visible"
    ok-text="提交"
    @cancel="onClose"
    @ok="submit"
    :confirmLoading="confirmLoading"
    :destroyOnClose="true"
  >
    <a-form :form="form" :label-col="{ span: 8 }" :wrapper-col="{ span: 13 }">
      <a-form-item label="运营人">
        <search-employee
          v-decorator="['operatorEmpId', {rules: [{ required: (!form.getFieldValue('recruitType') && form.getFieldValue('recruitType') !== 0) && (!form.getFieldValue('lecturerType') && form.getFieldValue('lecturerType') !== 0), message: '请选择运营人'}], initialValue: undefined}]"
          placeholder="请输入"
          :searchFn="artistSearch"
          :params="{dutyType: 1}"
          @department="changeDepartment"
        />
      </a-form-item>
      <a-form-item label="运营人所属组织" v-if="form.getFieldValue('operatorEmpId')">
        <span>{{ fullDepartmentName }}</span>
      </a-form-item>
      <template v-if="type === 2">
        <a-form-item
          label="讲师为无忧员工">
          <a-radio-group
            v-decorator="['lecturerType',{ rules: [{ required: (!form.getFieldValue('operatorEmpId') && (!form.getFieldValue('recruitType') && form.getFieldValue('recruitType') !== 0)), message: '请选择'}] }]"
            @change="changeLectureType"
          >
            <a-radio v-for="(item, index) in isInTeacher" :key="index" :value="item.value">
              {{ item.name }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="form.getFieldValue('lecturerType')"
          label="讲师姓名">
          <search-employee
            v-if="form.getFieldValue('lecturerType') === 1"
            v-decorator="['lecturerEmpId', {rules: [{ required: true, message: '请选择讲师'}], initialValue: undefined}]"
            placeholder="请输入"
            :searchFn="artistSearch"
          />
          <a-input placeholder="请输入讲师姓名" v-decorator="['lecturerName',{rules: [{ required: true, message: '请输入讲师姓名'}]}]" v-else/>
        </a-form-item>
        <a-form-item
          v-if="form.getFieldValue('lecturerType') === 2"
          label="讲师手机号">
          <a-input placeholder="请输入讲师手机号" v-decorator="['lecturerMobile',{rules: [{ required: true, message: '请输入正确讲师手机号', pattern: /^1[123456789]\d{9}$/}]}]" />
        </a-form-item>
        <a-form-item
          label="招募人为无忧员工">
          <a-radio-group
            v-decorator="['recruitType',{ rules: [{ required: (!form.getFieldValue('operatorEmpId') && (!form.getFieldValue('lecturerType') && form.getFieldValue('lecturerType') !== 0)), message: '请选择'}] }]"
            @change="changeRecruitType"
          >
            <a-radio v-for="(item, index) in isInRecruit" :key="index" :value="item.value">
              {{ item.name }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="form.getFieldValue('recruitType') === 1 || form.getFieldValue('recruitType') === 0"
          label="招募姓名">
          <search-employee
            v-if="form.getFieldValue('recruitType') === 1"
            v-decorator="['recruitEmpId', {rules: [{ required: true, message: '请选择招募人'}], initialValue: undefined}]"
            placeholder="请输入"
            :searchFn="artistSearch"
          />
          <a-input placeholder="请输入招募姓名" v-decorator="['recruitName',{rules: [{ required: true, message: '请输入招募姓名'}]}]" v-else/>
        </a-form-item>
        <a-form-item
          v-if="form.getFieldValue('recruitType') === 0"
          label="招募手机号">
          <a-input placeholder="请输入招募手机号" v-decorator="['recruitMobile',{rules: [{ required: true, message: '请输入正确招募手机号', pattern: /^1[123456789]\d{9}$/}]}]" />
        </a-form-item>
      </template>
    </a-form>
  </a-modal>
</template>

<script>
import { editOperator, editRelation } from '@/api/artists-video'
import searchEmployee from '../../components/searchEmployee'
import { artistSearch } from '@/api/gold'
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      artistSearch,
      fullDepartmentName: '',
      isInRecruit: [
        { name: '是', value: 1 },
        { name: '否', value: 0 }
      ],
      isInTeacher: [
        { name: '是', value: 1 },
        { name: '否', value: 2 },
        { name: '无讲师', value: 0 }
      ],
      confirmLoading: false
    }
  },
  props: {
    type: {
      type: Number,
      default: null
    },
    visible: {
      type: Boolean,
      default: null
    },
    selectedRowKeys: {
      type: Array,
      default: null
    }
  },
  components: {
    searchEmployee
  },

  mounted () {},

  methods: {
    submit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const params = JSON.parse(JSON.stringify(values))
          if (params.operatorEmpId) {
            params.operatorEmpId = params.operatorEmpId.key
          }
          if (params.lecturerEmpId) {
            params.lecturerEmpId = params.lecturerEmpId.key
          }
          if (params.recruitEmpId) {
            params.recruitEmpId = params.recruitEmpId.key
          }
          if (this.confirmLoading) return
          this.confirmLoading = true
          if (this.type === 1) { // 批量修改运营
            editOperator({
              ...params,
              wechatInfoIds: this.selectedRowKeys
            }).then(res => {
              this.$message.success('操作成功')
              this.$emit('cancel')
              this.$emit('refresh')
              this.confirmLoading = false
            }).catch(() => {
              this.confirmLoading = false
            })
          } else {
            editRelation({
              ...params,
              wechatInfoIds: this.selectedRowKeys
            }).then(res => {
              this.$message.success('操作成功')
              this.$emit('cancel')
              this.$emit('refresh')
              this.confirmLoading = false
            }).catch(() => {
              this.confirmLoading = false
            })
          }
        }
      })
    },
    onClose () {
      this.$emit('cancel')
    },
    changeDepartment (val) {
      this.fullDepartmentName = val
    },
    changeLectureType () {
      this.form.setFieldsValue({
        'lectureName': undefined,
        'lecturerEmpId': undefined
      })
    },
    changeRecruitType () {
      this.form.setFieldsValue({
        'recruitName': undefined,
        'recruitEmployeeId': undefined
      })
    }
  }
}

</script>
<style lang='less' scoped>
</style>
