<template>
  <page-header-wrapper
    class="container"
    title="员工详情"
  >
    <div class="content">
      <tab-content title="基本信息" :titleLine="true">
        <a-form class="form" :form="form">
          <a-row>
            <a-col :xs="24" :md="8" class="form-item-con">
              <a-form-item
                label="姓名">
                <span>{{ model.name ? model.name : '-' }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" class="form-item-con">
              <a-form-item
                label="工号">
                <span>{{ model.employeeNo || '-' }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" class="form-item-con">
              <a-form-item
                label="手机号">
                <span>{{ model.mobile ? model.mobile : '-' }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" class="form-item-con">
              <a-form-item
                label="所属组织架构">
                <span>{{ model.departments ? model.departments : '-' }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" class="form-item-con">
              <a-form-item
                label="职能">
                <span>{{ model.dutyType ? model.dutyType.msg : '-' }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" class="form-item-con">
              <a-form-item
                label="在职状态">
                <span>{{ model.state ? model.state.msg : '-' }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" class="form-item-con">
              <a-form-item
                label="加入时间">
                <span>{{ model.joinTime ? model.joinTime : '-' }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" class="form-item-con">
              <a-form-item
                label="转正时间">
                <span>{{ model.ehrRegularizationDate || '-' }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" class="form-item-con">
              <a-form-item
                label="操作离职时间">
                <span>{{ model.dimisstionTime ? model.dimisstionTime : '-' }}</span>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" class="form-item-con">
              <a-form-item
                label="是否为负责人">
                <a-radio-group
                  v-decorator="['isManager', { rules: [{ required: true, message: '请选择是否为负责人' }] }]"
                >
                  {{ model.isDepartmentManger ? '是' : '否' }}
                </a-radio-group>
              </a-form-item>
            </a-col>
            <a-col :xs="24" :md="8" class="form-item-con">
              <a-form-item
                label="培训平台账号状态">
                <span>{{ model.coolcollegeStatus || '-' }}</span>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </tab-content>
      <tab-content title="数据权限" :titleLine="true">
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
              -
            </p>
          </div>
        </div>
      </tab-content>
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
  </page-header-wrapper>
</template>

<script>
import TabContent from '../components/TabContent'
import { getStructureTree, editEmployee, getEmployeeDetail } from '@/api/personnel'
import pick from 'lodash.pick'

const fileds = [
  'name',
  'mobile',
  'employeeStatus',
  'joinTime',
  'dimissionTime',
  'isManager'
]

export default {
  name: 'EmployeeCreate',
  components: {
    TabContent
  },
  data () {
    return {
      form: this.$form.createForm(this),
      selectTreeData: [],

      fileds,
      model: {},

      // 组织架构
      originTree: [],
      struCheckKeys: [],

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
  mounted () {
    this.getStructureTreeHandle()
    this.getEmployeeDetailHandle()

    // 防止表单未注册
    this.fileds.forEach(item => {
      this.form.getFieldDecorator(item)
    })
  },
  methods: {

    getEmployeeDetailHandle () {
      getEmployeeDetail(this.$route.query.id).then(res => {
        this.model = res
        this.model.employeeStatus = res.state.code
        this.model.departments = res.levelDepartmentList ? this.generateDepartments(res.levelDepartmentList) : '-'

        this.structureInit({
          strucKes: [res.departmentId],
          permissionKes: res.dataPermission
        })
        this.model && this.form.setFieldsValue(pick(this.model, this.fileds))
      })
    },

    generateDepartments (data) {
      let str = ''
      data.forEach((item, index) => {
        if (index === data.length - 1) {
          str += item.name
        } else {
          str += item.name + '-'
        }
      })

      return str
    },

    getStructureTreeHandle () {
      getStructureTree().then(res => {
        this.originTreeArr = res
        this.originTree = this.toTree(res)
        this.selectTreeData = this.generateTree1(this.originTree)
        this.treeData = this.generateTree2(this.originTree)
      })
    },

    toTree (data) {
      const arr = []
      function createTree (id, array, list) {
        const newArr = list.filter(item => item.parentId === id)
        newArr.forEach(item => {
          const arr = []
          item.children = createTree(item.id, arr, list)
          array.push(item)
        })
        return array
      }
      createTree(0, arr, data)
      return arr
    },

    generateTree1 (arr) {
      arr.forEach(item => {
        item['label'] = item.name
        item['value'] = item.id
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
          const data = {
            ...values,
            departmentId: values.departmentId[values.departmentId.length - 1],
            dataPermission: this.checkedKeys,
            id: this.$route.query.id
          }

          this.editEmployeeHandle(data)
        }
      })
    },

    editEmployeeHandle (data) {
      editEmployee(data).then(() => {
        this.$message.success('保存成功')
        setTimeout(() => {
          this.$router.push({
            path: '/personnel/employee'
          })
        })
      })
    },

    // 组织架构
    structureChange (value) {
      this.struCheckKeys = this.checkedKeys = [value[value.length - 1]]
      this.generateCheckNames()
      this.generateTree2(this.originTree)
    },

    structureInit (data) {
      this.struCheckKeys = data.strucKes
      this.checkedKeys = data.permissionKes
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
  }
}
</script>

<style lang="less" scoped>
  .content {
    min-height: 700px;
    padding-top: 8px;
    padding-bottom: 40px;
  }
  .form-item-con {
    padding-right: 10%;
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
    margin: 0 0 22px 16px;
    span {
      color: #755DD7;
    }
    .pri-btn {
      cursor: pointer;
    }
  }
</style>
