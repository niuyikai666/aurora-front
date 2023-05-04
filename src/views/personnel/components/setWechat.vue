<template>
  <a-modal
    title="设置绑定账号"
    :width="500"
    :visible="visible"
    :maskClosable="false"
    @cancel="() => $emit('cancel')"
  >
    <template slot="footer">
      <a-button key="cancel" @click="$emit('cancel')">取 消</a-button>
      <a-button key="create" type="primary" @click="createHandle" :loading="loading">保存配置</a-button>
    </template>
    <a-form layout="inline">
      <a-row>
        <a-col :span="24">
          <a-form-item label="微信管理员">
            {{ data.wechat || '-' }}
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="绑定员工">
            <employee-search
              placeholder="请选择"
              :searchFn="artistSearch"
              dutyType="2"
              v-model="employee"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import { setVideoAdmin } from '@/api/personnel'
import EmployeeSearch from './EmployeeSearch'
import { artistSearch } from '@/api/gold'
export default {
  data () {
   return {
     loading: false,
     artistSearch,
     employee: undefined
   }
  },

  props: {
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: [String, Object],
      default: null
    }
  },
  components: {
    EmployeeSearch
  },

  mounted () {},

  methods: {
    createHandle () {
      if (!this.employee) {
        this.$message.error('请选择员工')
        return
      }
      this.loading = true
      setVideoAdmin({
        wechat: this.data.wechat,
        employeeId: this.employee.key
      }).then(() => {
        this.loading = false
        this.$message.success('操作成功')
        this.$emit('cancel')
        this.$emit('refresh')
      }).catch(() => {
        this.loading = false
      })
    }
  },
  watch: {
    visible: {
      handler (val) {
        if (val) {
          this.employee = {
            key: this.data.authEmployeeId,
            label: this.data.employeeName
          }
        }
      }
    }
  }
}

</script>
<style lang='less' scoped>
</style>
