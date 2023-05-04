<template>
  <a-modal
    title="所属组织变更"
    :width="400"
    :visible="visible"
    :maskClosable="false"
    :destroyOnClose="true"
    @cancel="() => $emit('cancel')"
  >
    <template slot="footer">
      <a-button key="cancel" @click="$emit('cancel')">取 消</a-button>
      <a-button key="create" type="primary" @click="hadleConfirm" :loading="loading">确认设置</a-button>
    </template>
    <a-form :form="form" class="form-min">
      <a-row>
        <a-col :span="24">
          <a-form-item
            label="员工姓名">
            <a-select
              class="select"
              v-decorator="['employeeId',{rules: [{ required: true, message: '请选择员工'}]}]"
              show-search
              :labelInValue="true"
              placeholder="请搜索"
              style="width:100%;"
              :default-active-first-option="false"
              :show-arrow="true"
              :filter-option="false"
              :not-found-content="null"
              @search="fetchEmployee"
            >
              <a-spin v-if="fetching" slot="notFoundContent" size="small" />
              <a-select-option v-for="d in employeeList" :key="d.key">
                {{ d.label }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="所属组织">
            <a-input disabled value="无部门归属人员" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item label="手机号">
            <a-input v-decorator="['mobile', { rules: [{ required: true, message: '手机号不能为空' }]}]" />
          </a-form-item>
        </a-col>
        <a-col :span="24">
          <a-form-item
            label="所属组织">
            <a-cascader
              placeholder="请选择"
              v-decorator="['departmentId', { rules: [{ required: true, message: '组织架构不能为空' }]}]"
              :options="selectTreeData"
              change-on-select
              :allow-clear="false"
              expand-trigger="hover"
              :display-render="displayRender"
            />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </a-modal>
</template>

<script>
import debounce from 'lodash/debounce'
import createTree from '@/utils/tree/generateTree'
import { getStructureTree, employeeStrucChange, getStructureDepartmentNone } from '@/api/personnel'

export default {
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

  data () {
    this.fetchEmployee = debounce(this.fetchEmployee, 800)
   return {
      form: this.$form.createForm(this),
      loading: false,
      employee: undefined,
      selectTreeData: [],
      employeeList: [],
      fetching: false
   }
  },

  mounted () {
    this.getStructureTreeHandle()
  },

  methods: {
    hadleConfirm () {
      if (this.loading) return
      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          this.handleModify({
            ...values,
            employeeId: values.employeeId ? values.employeeId.key : undefined,
            departmentId: values.departmentId ? values.departmentId[values.departmentId.length - 1] : []
          })
        } else {
          this.loading = false
        }
      })
    },
    handleModify (data) {
      employeeStrucChange(data).then(() => {
        this.$message.success('操作成功')
        this.$emit('success')
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    getStructureTreeHandle () {
      getStructureTree().then(res => {
        const tree = createTree(res)
        this.selectTreeData = this.generateTree1(tree)
      })
    },
    generateTree1 (arr) {
      arr.forEach(item => {
        item['label'] = item.name
        item['value'] = item.id
        if (!item.enabled) {
          item['disabled'] = true
        }
        if (item.children) {
          this.generateTree1(item.children)
        }
        return item
      })
      return arr
    },
    fetchEmployee (value) {
      if (!value.trim()) return
      this.employeeList = []
      this.fetching = true
      getStructureDepartmentNone(value).then(res => {
        const data = res.map(item => ({
          key: item.id,
          label: `${item.name}(${item.employeeNo || '无工号'})${item.departmentName}`
        }))
        this.employeeList = data
        this.fetching = false
      })
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    }
  }
}

</script>
<style lang='less' scoped>
</style>
