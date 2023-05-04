<template>
  <a-modal
    title="关系反馈"
    :visible="visible"
    ok-text="提交反馈"
    @ok="submitHandle"
    :confirmLoading="loading"
    @cancel="$emit('cancel')"
    :destroyOnClose="true"
  >
    <div class="top-text mb14">请选择要反馈的<span class="red">{{ month }}</span>月结算关系：</div>
    <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 15 }">
      <!-- <a-form-item label="结算运营人">
        <search-employee
          :params="{dutyType: 1}"
          v-decorator="['operatorEmployeeId']"
          placeholder="请输入"></search-employee>
      </a-form-item> -->
      <a-form-item label="结算招募人">
        <search-employee
          :params="{dutyType: 1}"
          v-decorator="['recruitEmployeeId']"
          placeholder="请输入"></search-employee>
      </a-form-item>
      <a-form-item label="结算讲师">
        <search-employee
          :params="{dutyType: 1}"
          v-decorator="['lecturerEmployeeId']"
          placeholder="请输入"></search-employee>
      </a-form-item>
      <a-form-item label="结算签约人">
        <search-employee
          :params="{dutyType: 1}"
          v-decorator="['signEmpId']"
          placeholder="请输入"></search-employee>
      </a-form-item>
      <p class="red-desc">*多次提交以最后一次为准</p>
    </a-form>
  </a-modal>
</template>

<script>
import searchEmployee from './searchEmployee'
import moment from 'moment'
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      month: ''
    }
  },
  props: {
    visible: {
      type: [Boolean, Object],
      default: false
    },
    loading: {
      type: Boolean,
      default: null
    },
    data: {
      type: Object,
      default: null
    }
  },
  components: {
    searchEmployee
  },

  mounted () {
    this.month = moment(new Date()).subtract(1, 'months').format('M')
  },

  methods: {
    submitHandle () {
      this.form.validateFields((err, values) => {
         if (!err) {
            if (!values.lecturerEmployeeId && !values.recruitEmployeeId && !values.signEmpId) {
              this.$message.error('请至少填写一个关系人')
            } else {
              const data = JSON.parse(JSON.stringify(values))
              Object.keys(data).map(key => {
                if (data[key]) data[key] = data[key].key
              })
              this.$emit('submit', data)
            }
         }
       })
    }
  },
  watch: {
    visible: {
      handler (val) {
        // if (val) {
        //   const data = JSON.parse(JSON.stringify(this.data))
        //   const formData = {}
        //   if (data.operatorEmpId) {
        //     formData.operatorEmployeeId = {
        //       key: data.operatorEmpId,
        //       label: data.operatorEmployeeName
        //     }
        //   }
        //   if (data.recruitEmpId) {
        //     formData.recruitEmployeeId = {
        //       key: data.recruitEmpId,
        //       label: data.recruitEmployeeName
        //     }
        //   }
        //   if (data.lecturerEmpId) {
        //     formData.lecturerEmployeeId = {
        //       key: data.lecturerEmpId,
        //       label: data.lecturerEmployeeName
        //     }
        //   }
        //   if (data.signEmpId) {
        //     formData.signEmpId = {
        //       key: data.signEmpId,
        //       label: data.signEmpName
        //     }
        //   }
        //   this.$nextTick(() => {
        //     this.form.setFieldsValue(formData)
        //   })
        // }
      },
      immediate: true,
      deep: true
    }
  }
}

</script>
<style lang='less' scoped>
.top-text{
  .red{
    color: #e92525;
  }
}
.red-desc{
  color: rgba(233, 37, 37, 1);
  margin: 0;
  text-align: right;
  margin-top: -10px;
  padding-right: 40px;
}
</style>
