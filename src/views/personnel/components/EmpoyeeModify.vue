<template>
  <a-drawer
    class="drawer"
    :title="employeeId ? '编辑员工' : '添加员工'"
    :width="705"
    :visible="show"
    :body-style="{ paddingBottom: '80px' }"
    @close="onClose"
  >
    <tab-content title="基本信息" :titleLine="true">
      <a-form class="form" :form="form">
        <a-row>
          <a-col :xs="24" :md="12" class="form-item-con">
            <a-form-item
              label="姓名">
              <a-input
                placeholder="请输入姓名"
                v-decorator="['name', { rules: [{ required: true, message: '姓名不能为空' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12" class="form-item-con">
            <a-form-item
              label="手机号">
              <a-input
                placeholder="请输入手机号"
                v-decorator="['mobile', {rules: [{ required: true, pattern: /^1[123456789]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12" class="form-item-con">
            <a-form-item
              label="在职状态">
              <a-select
                v-decorator="['employeeStatus', { rules: [{ required: true, message: '在职状态不能为空' }] }]"
                placeholder="请选择"
              >
                <a-select-option :value="1">
                  试用
                </a-select-option>
                <a-select-option :value="2">
                  正式
                </a-select-option>
                <a-select-option :value="3">
                  离职
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12" class="form-item-con">
            <a-form-item
              label="所属组织架构">
              <a-cascader
                placeholder="请选择"
                v-decorator="['departmentId', { rules: [{ required: true, message: '组织架构不能为空' }]}]"
                :options="selectTreeData"
                change-on-select
                :allow-clear="false"
                expand-trigger="hover"
                :display-render="displayRender"
                @change="structureChange"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12" class="form-item-con">
            <a-form-item
              label="职能">
              <a-select
                v-decorator="['dutyType', { rules: [{ required: true, message: '职能不能为空' }] }]"
                placeholder="请选择"
              >
                <a-select-option :value="0">
                  其他
                </a-select-option>
                <a-select-option :value="1">
                  运营
                </a-select-option>
                <a-select-option :value="2">
                  短视频
                </a-select-option>
                <a-select-option :value="3">
                  管理层
                </a-select-option>
                <a-select-option :value="4">
                  人力
                </a-select-option>
                <a-select-option :value="5">
                  数据
                </a-select-option>
                <a-select-option :value="6">
                  客服
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12" class="form-item-con">
            <a-form-item
              label="加入时间">
              <a-date-picker
                style="width: 100%"
                placeholder="请选择日期"
                value-format="YYYY-MM-DD"
                v-decorator="['joinTime', { rules: [{ required: true, message: '加入时间不能为空' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12" class="form-item-con">
            <a-form-item
              label="转正时间">
              <a-date-picker
                :disabled="Boolean(model.ehrRegularizationDate)"
                style="width: 100%"
                placeholder="请选择日期"
                value-format="YYYY-MM-DD"
                v-decorator="['ehrRegularizationDate', { rules: [{ required: false, message: '转正时间不能为空' }] }]"
              />
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12" class="form-item-con" v-if="employeeId">
            <a-form-item
              label="培训平台账号状态">
              {{ model.coolcollegeStatus }}
            </a-form-item>
          </a-col>
          <a-col :xs="24" :md="12" class="form-item-con">
            <a-form-item
              label="是否为负责人">
              <a-radio-group
                v-decorator="['isManager', { rules: [{ required: true, message: '请选择是否为负责人' }] }]"
              >
                <a-radio :key="1" :value="true">是</a-radio>
                <a-radio :key="0" :value="false">否</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </tab-content>
    <tab-content title="数据权限 (必选)" :titleLine="true" style="margin-top:10px;">
      <div class="pri-content">
        <div class="crip">
          <p v-if="checkedNames.length > 0">
            已选择
            <span>{{ checkedNames[0] ? `${checkedNames[0]}` : '' }} {{ checkedNames[0] && checkedNames.length === 1 ? '' : '、' }} </span>
            <span>{{ checkedNames[1] ? `${checkedNames[1]}` : '' }} {{ checkedNames[1] && checkedNames.length > 2 ? '、' : '' }} </span>
            <span>{{ checkedNames[2] ? `${checkedNames[2]}` : '' }} {{ checkedNames[2] && checkedNames.length > 3 ? '、' : '' }} </span>
            <span>{{ checkedNames[3] ? `${checkedNames[3]}` : '' }} {{ checkedNames[3] && checkedNames.length > 4 ? '、' : '' }} </span>
            <span>{{ checkedNames[4] ? `${checkedNames[4]}` : '' }} </span>
            <i v-if="checkedNames.length > 5">... </i>
            , 共 <span>{{ checkedNames.length }} </span>个部门
          </p>
          <p v-else>
            请选择员工权限覆盖的部门范围 (请先选择所属组织架构)
          </p>
        </div>
        <div class="setting">
          <span v-if="checkedNames.length <= 0" @click="settingHandle()" class="pri-btn"><a-icon type="unordered-list" /> 设置范围</span>
          <span v-else @click="settingHandle()" class="pri-btn"><a-icon type="edit" /> 修改范围</span>
        </div>
      </div>
    </tab-content>

    <div
      :style="{
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: '100%',
        borderTop: '1px solid #e9e9e9',
        padding: '10px 16px',
        background: '#fff',
        textAlign: 'right',
        zIndex: 1,
      }"
    >
      <a-button class="disable" type="primary" :style="{ marginRight: '16px' }" @click="onClose">
        取消
      </a-button>
      <a-button type="primary" @click="createHandle()">
        {{ employeeId ? '确认编辑' : '确认新增' }}
      </a-button>
    </div>

    <a-modal
      title="设置"
      :width="400"
      :visible="visible"
      @cancel="cancelHandle"
      @ok="confirmHandle"
    >
      <div class="tree-content">
        <a-tree
          class="tree"
          @check="onCheck"
          v-model="checkedKeys"
          :default-expanded-keys="expandedKeys"
          :auto-expand-parent="autoExpandParent"
          checkable
          show-icon
          :tree-data="treeData"
        >
          <a-icon slot="sec" type="team" />
        </a-tree>
      </div>
    </a-modal>
  </a-drawer>
</template>

<script>
import TabContent from './TabContent'
import { getStructureTree, getStructureTreeAll, createEmployee, getDepartmentChildById, editEmployee, getEmployeeDetail } from '@/api/personnel'
// import { toTree } from '@/utils/tree/selectTree'
import createTree from '@/utils/tree/generateTree'
import pick from 'lodash.pick'

const fileds = [
  'name',
  'mobile',
  'employeeStatus',
  'departmentId',
  'joinTime',
  'isManager',
  'dutyType',
  'ehrRegularizationDate'
]

export default {
  name: 'Info',
  components: {
    TabContent
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    employeeId: {
      type: [Number, String],
      default: null
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      selectTreeData: [],

      // 组织架构
      originTree: [],
      struCheckKeys: [],

      fileds,
      model: {},

      // 数据权限
      visible: false,
      originTreeArr: [],
      treeData: [],
      expandedKeys: [1],
      autoExpandParent: true,
      checkedKeys: [],
      checkedNames: []
    }
  },
  async mounted () {
    await this.pageInit()
  },
  methods: {
    onClose () {
      this.form.resetFields()
      this.checkedKeys = []
      this.checkedNames = []
      this.model = {}
      this.$emit('cancel')
    },

    async pageInit () {
      await this.getStructureTreeHandle()
      await this.getStructureTreeAllHandle()
      if (this.employeeId) {
        await this.getEmployeeDetailHandle()
      }

      // // 防止表单未注册
      // this.fileds.forEach(item => {
      //   this.form.getFieldDecorator(item)
      // })
    },

    getEmployeeDetailHandle () {
      getEmployeeDetail(this.employeeId).then(res => {
        this.model = res
        this.model.employeeStatus = res.state.code
        this.model.dutyType = res.dutyType.code
        this.model.isManager = res.isDepartmentManger
        this.model.departmentId = res.levelDepartmentList ? this.generateDepartments(res.levelDepartmentList) : []
        this.getDepartmentChildHandle(this.model.departmentId[this.model.departmentId.length - 1]).then(items => {
          this.structureInit({
            strucKes: this.generateDepartments(items),
            permissionKes: res.dataPermission
          })
          this.model && this.form.setFieldsValue(pick(this.model, this.fileds))
        })
      })
    },

    generateDepartments (data) {
      const mData = JSON.parse(JSON.stringify(data))
      const arr = []
      mData.forEach(item => {
        arr.push(item.id)
      })
      return arr
    },

    structureInit (data) {
      this.struCheckKeys = data.strucKes
      this.checkedKeys = data.permissionKes
      this.$nextTick(() => {
        this.generateCheckNames()
        this.generateTree2(this.originTree)
      })
    },

    getStructureTreeHandle () {
      getStructureTree().then(res => {
        const tree = createTree(res)
        this.selectTreeData = this.generateTree1(tree)
      })
    },

    async getStructureTreeAllHandle () {
      const data = await getStructureTreeAll()
      this.originTreeArr = data
      this.originTree = createTree(data)
      this.treeData = this.generateTree2(this.originTree)
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

    generateTree2 (arr) {
      arr.forEach(item => {
        item['title'] = item.name
        item['key'] = item.id
        item['scopedSlots'] = { title: 'custom' }
        item['slots'] = { icon: 'sec' }
        item['disableCheckbox'] = false
        if (!item.enabled) {
          item['disableCheckbox'] = true
        }
        if (this.struCheckKeys.length > 0 && this.struCheckKeys.includes(item.id)) {
          item['disableCheckbox'] = true
        }

        if (item.children) {
          this.generateTree2(item.children)
        }
        return item
      })
      return arr
    },

    displayRender ({ labels }) {
      return labels[labels.length - 1]
    },

    createHandle () {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (this.checkedKeys.length <= 0) {
            this.$message.error('请设置数据范围')
            return
          }
          const data = {
            ...values,
            departmentId: values.departmentId ? values.departmentId[values.departmentId.length - 1] : [],
            dataPermission: this.checkedKeys,
            id: this.employeeId || undefined
          }

          if (this.employeeId) {
            this.editEmployeeHandle(data)
          } else {
            this.createEmployeeHandle(data)
          }
        }
      })
    },

    createEmployeeHandle (data) {
      createEmployee(data).then(() => {
        this.$message.success('创建成功')
        this.onClose()
        setTimeout(() => {
          this.$emit('success')
        })
      })
    },

    editEmployeeHandle (data) {
      editEmployee(data).then(() => {
        this.$message.success('修改成功')
        this.onClose()
        setTimeout(() => {
          this.$emit('success')
        })
      })
    },

    async getDepartmentChildHandle (id) {
      const data = await getDepartmentChildById(id)
      return data
    },

    createDepartmentIds (childs) {
      const arr = []
      childs.forEach(item => {
        arr.push(item.id)
      })
      return arr
    },

    // 组织架构
    async structureChange (value) {
      const departmentChilds = await this.getDepartmentChildHandle(value[value.length - 1])
      this.struCheckKeys = this.checkedKeys = this.createDepartmentIds(departmentChilds)
      this.generateCheckNames()
      this.generateTree2(this.originTree)
    },

    // 数据权限
    settingHandle (id) {
      this.visible = true
    },
    cancelHandle () {
      this.visible = false
    },
    onCheck (checkedKeys) {
      this.checkedKeys = checkedKeys
    },
    confirmHandle () {
      this.generateCheckNames()
      this.visible = false
    },
    generateCheckNames () {
      this.checkedNames = []
      this.originTreeArr.forEach(item => {
        this.checkedKeys.forEach(id => {
          if (item.id === id) {
            this.checkedNames.push(item.name)
          }
        })
      })
    }
  },
  watch: {
    show (val) {
      if (val) {
        this.pageInit()
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .form-item-con {
    padding-right: 10%;
    .ant-form-item {
      margin-bottom: 8px;
    }
  }
  .tree-content {
    height: 300px;
    overflow-y: scroll;
    /deep/ .ant-tree li span.ant-tree-checkbox {
      margin-top: 3px;
    }
  }
  .radio-content {
    margin: 0 0 18px 16px;
    .ant-radio-group {
      .ant-radio-button-wrapper {
        margin-right: 12px;
      }
    }
  }
  .pri-content {
    span {
      color: #755DD7;
    }
    .pri-btn {
      cursor: pointer;
    }
  }
</style>
