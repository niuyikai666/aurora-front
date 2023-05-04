<template>
  <a-modal
    :title="strucId ? '编辑组织架构' : '新建组织架构'"
    :width="348"
    :visible="visible"
    :maskClosable="false"
    @cancel="() => $emit('cancel')"
  >
    <template slot="footer">
      <a-button key="cancel" @click="$emit('cancel')">取 消</a-button>
      <a-button key="create" type="primary" @click="createHandle">{{ strucId ? '保 存' : '创 建' }}</a-button>
    </template>
    <a-spin :spinning="false">
      <a-form
        class="form"
        :form="form"
      >
        <a-form-item label="名称">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '名称不能为空' }, { validator: formatLength }] }]"
            placeholder="请输入名称"
          />
        </a-form-item>
        <a-form-item
          label="所属组织">
          <a-cascader
            placeholder="请选择"
            v-decorator="['departmentId', { rules: [{ required: true, message: '组织架构不能为空' }], initialValue: departments }]"
            :options="treeDataOrigin"
            change-on-select
            :allow-clear="false"
            expand-trigger="hover"
            :display-render="displayRender"
            @change="changeHandle"
          />
        </a-form-item>
        <a-form-item label="所属分类">
          <a-select
            @change="fieshuDepartmentHandle"
            v-decorator="['type', { rules: [{ required: true, message: this.strucCode === 4 ? '不可在小组内新增组织架构' :'所属分类不能为空' }] }]"
            placeholder="所属分类"
          >
            <a-select-option
              v-for="(item, index) in typeData"
              :key="index"
              :value="item.code"
            >
              {{ item.msg }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="业务线">
          <a-select
            @change="fieshuDepartmentHandle"
            v-decorator="['serviceLine', { rules: [{ required: true, message: '业务线不能为空！' }] }]"
            placeholder="业务线"
          >
            <a-select-option :value="1">
              直播
            </a-select-option>
            <a-select-option :value="2">
              短视频
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="绑定飞书小组">
          <search-select
            :width="100"
            placeholder="输入飞书小组名称"
            :searchFn="getFeishuDepartmentList"
            v-decorator="['feishuDepartmentModels', { initialValue: detail.feishuDepartmentModels }]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'
import { createDepartment, editDepartment, getStructureDetail, getDepartmentTypeByType, getFeishuDepartmentList } from '@/api/personnel'
import SearchSelect from './SearchSelect'
// 表单字段
const fileds = ['name', 'type', 'departmentId', 'serviceLine', 'feishuDepartmentModels']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    treeData: {
      type: Array,
      default: null
    },
    strucId: {
      type: String,
      default: ''
    },
    departmentId: {
      type: Number,
      default: null
    },
    departmentType: {
      type: Number,
      default: null
    }
  },
  components: {
    SearchSelect
  },
  data () {
    return {
      form: this.$form.createForm(this),
      getFeishuDepartmentList,
      fileds,
      treeDataOrigin: [],
      detail: {},
      departments: [],
      typeData: [],
      strucCode: null
    }
  },
  mounted () {
    if (this.strucId) {
      this.getStrucDetailhandle()
    } else {
      this.getDepartmentTypeHandle(this.departmentType)
    }

    this.treeDataOrigin = this.treeData

    // 防止表单未注册
    this.fileds.forEach(item => {
      this.form.getFieldDecorator(item)
    })
  },
  methods: {
    getStrucDetailhandle () {
      getStructureDetail(this.strucId).then(res => {
        this.detail = res
        this.detail.type = res.type.code
        this.detail.serviceLine = res.serviceLine.code
        this.departments = this.generateDepartments(res.levelDepartmentList)
        this.detail.feishuDepartmentModels = res.feishuDepartmentModels.map(item => ({
          key: item.departmentId,
          label: item.fullName
        }))
        this.getDepartmentTypeHandle(res.levelDepartmentList[res.levelDepartmentList.length - 1].type.code, true)
      })
    },

    generateDepartments (data) {
      const arr = []
      data.forEach(item => {
        arr.push(item.id)
      })
      return arr
    },

    async getDepartmentTypeHandle (type, flag) {
      const data = await getDepartmentTypeByType(type)
      this.typeData = data
      if (flag) {
        this.$nextTick(() => {
          this.form.setFieldsValue(pick(this.detail, this.fileds))
        })
      }
    },

    changeHandle (value, selectedOptions) {
      this.strucCode = selectedOptions[selectedOptions.length - 1].type.code
      this.getDepartmentTypeHandle(this.strucCode)
      this.form.setFieldsValue({
        type: null
      })
    },

    createHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          const feishuDepartmentIds = values.feishuDepartmentModels ? values.feishuDepartmentModels.map(item => item.key) : undefined
          const data = {
            id: this.strucId ? this.strucId : undefined,
            ...values,
            parentId: values.departmentId[values.departmentId.length - 1],
            feishuDepartmentIds,
            feishuDepartmentModels: null
          }
          this.createDepartmentHandle(data)
        }
      })
    },
    createDepartmentHandle (data) {
      if (this.strucId) {
        editDepartment(data).then(() => {
          this.$emit('success', '保存成功')
        })
      } else {
        createDepartment(data).then(() => {
          this.$emit('success', '创建成功')
        })
      }
    },
    formatLength (rule, value, callback) {
      if (value && value.trim() === '') {
        callback(new Error('名称不能为空'))
      } else if (value && value.trim().length > 20) {
        callback(new Error('名称不能超过20个字符'))
      } else {
        callback()
      }
    },
    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },
    fieshuDepartmentHandle () {
      this.$nextTick(() => {
        if (this.form.getFieldValue('serviceLine') !== 1 || this.form.getFieldValue('type') !== 4) {
          this.form.setFieldsValue({
            feishuDepartmentModels: []
          })
        }
      })
    }
  },
  watch: {
    'departmentType' (value) {
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
