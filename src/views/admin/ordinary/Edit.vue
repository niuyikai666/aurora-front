<template>
  <page-header-wrapper
    class="container"
    title="编辑普通管理员"
  >
    <div class="content">
      <tab-content title="管理员账号" :titleLine="true">
        <div class="user-cont">
          <div class="imgbox">
            <img :src="employeeDetail.portrait" alt="">
          </div>
          <div class="crip">
            <p class="p1">{{ employeeDetail.name }}({{ employeeDetail.mobile }})</p>
            <p class="p2">{{ employeeDetail.departmentName ? employeeDetail.departmentName.join(',') : '' }}</p>
          </div>
        </div>
      </tab-content>
      <tab-content title="标签分组" :titleLine="true">
        <div class="radio-content">
          <a-radio-group
            v-model="tagModel"
          >
            <a-radio-button :value="1">
              全公司
            </a-radio-button>
            <a-radio-button :value="2">
              分公司
            </a-radio-button>
            <a-radio-button :value="3">
              运营组
            </a-radio-button>
          </a-radio-group>
        </div>
      </tab-content>
      <tab-content title="设置权限" :titleLine="true">
        <div class="scrip-content">
          <a-row class="box" v-for="(item, index) in authList" :key="index">
            <a-col :xs="24" :md="11">
              <div class="set-bar">
                <span class="title">{{ item.name }}</span>
                <a-switch v-model="item.checked" :disabled="!item.authorized" @change="onChange" />
              </div>
              <p class="crip">{{ item.remark }}</p>
            </a-col>
            <!-- <a-col :xs="24" :md="13">
              <div class="opt">
                <a-button v-if="item.name !== '合同管理' && item.name !== '公会经纪人管理' && item.name !== '退会主播列表'" class="custom" icon="edit" :disabled="!item.checked" @click="settingHandle(item.id)">设置数据范围</a-button>
              </div>
            </a-col> -->
            <a-col :xs="24" :md="24">
              <div class="check-cont">
                <span class="check" v-for="its in item.children" :key="its.id + Math.random()">
                  <a-checkbox v-model="its.checked" :disabled="(!item.checked || !its.authorized)" />
                  <span class="name">{{ its.name }}</span>
                  <p class="crip">{{ its.remark }}</p>
                </span>
              </div>
            </a-col>
          </a-row>
        </div>
      </tab-content>
      <tab-content title="设置权限范围" :titleLine="true">
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
              请选择管理员权限覆盖的部门范围(不设置默认勾选自己所属部门)
            </p>
          </div>
          <div class="setting">
            <span v-if="checkedNames.length <= 0" class="pri-btn" @click="settingHandle()"><a-icon type="unordered-list" /> 设置范围</span>
            <span v-else @click="settingHandle()" class="pri-btn"><a-icon type="edit" /> 修改范围</span>
          </div>
        </div>
      </tab-content>
      <a-button class="btn-submit" type="primary" icon="save" @click="createHandle()" style="margin-left:16px;">保存设置</a-button>
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
import TabContent from './components/TabContent'
import { getPrivilegesByEmployee, getScopes, getEmployeeDetail, setEmployeePrivileges } from '@/api/admin'

export default {
  name: 'OrdinaryCreate',
  components: {
    TabContent
  },
  data () {
    return {
      employeeId: '',
      employeeDetail: {},
      visible: false,
      dataSource: [],
      searchValue: '',
      authList: [],
      origiList: [],
      saveList: [],

      originTree: [],
      treeData: [],
      expandedKeys: [1],
      autoExpandParent: true,
      checkedKeys: [],
      checkedNames: [],

      currScopeId: 1,
      scopeMap: {},
      tagModel: 1
    }
  },
  mounted () {
    this.employeeId = this.$route.query.id
    this.getScopesHandle()
    this.getEmployeeDetailHandle()
    this.getPrivilegesWidthAuthorizedHandle()
  },
  methods: {
    getEmployeeDetailHandle () {
      getEmployeeDetail(this.employeeId).then(res => {
        this.employeeDetail = res
        this.tagModel = res.employeeTagType.code
      })
    },
    getPrivilegesWidthAuthorizedHandle () {
      getPrivilegesByEmployee(this.employeeId).then(res => {
        this.origiList = res
        this.authList = this.generateAuthList(res)

        // 回显所设置的权限
        setTimeout(() => {
          res.forEach(item => {
            if (item.scope.length > 0) {
              this.scopeMap[this.currScopeId] = this.checkedKeys = item.scope
              return true
            }
          })
          this.getCheckedNames()
        }, 200)
      })
    },
    generateAuthList (res) {
      const parent = res.filter(item => item.parentId === 0)
      res.forEach(item => {
        this.scopeMap[item.id] = item.scope
        parent.forEach(it => {
          this.scopeMap[it.id] = it.scope
          if (item.parentId === it.id) {
            if (it['children']) {
              it['children'].push(item)
            } else {
              it['children'] = []
              it['children'].push(item)
            }
          }
        })
      })
      return parent
    },
    settingHandle () {
      this.visible = true
    },
    getScopesHandle () {
      getScopes(this.currScopeId).then(res => {
        this.originTree = res
        const tree = this.toTree(res)
        this.treeData = this.generateTree(tree)
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
    generateTree (arr) {
      arr.forEach(item => {
        item['title'] = item.name
        item['key'] = item.id
        item['scopedSlots'] = { title: 'custom' }
        item['slots'] = { icon: 'sec' }

        if (item.children) {
          this.generateTree(item.children)
        }
        return item
      })
      return arr
    },
    onCheck (checkedKeys, info) {
      this.checkedKeys = checkedKeys
    },
    onSearch (searchText) {
      this.dataSource = !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)]
    },
    onChange () {
      this.authList.forEach(item => {
        if (item.checked) {
          this.saveList.push({
            privilegeId: item.id
          })
        }
        if (item.children) {
          item.children.forEach(it => {
            if (!item.checked) {
              it.checked = false
            }
          })
        }
      })
    },
    generateSaveList (list) {
      // 过滤掉不无权限的菜单
      // const filterList = list.filter(item => item.name !== '合同管理' && item.name !== '公会经纪人管理' && item.name !== '退会主播列表')
      // filterList.forEach(item => {
      //   if (item.checked) {
      //     this.saveList.push({
      //       privilegeId: item.id,
      //       scope: this.scopeMap[this.currScopeId] ? this.scopeMap[this.currScopeId].toString() : ''
      //     })
      //   }
      //   if (item.children) {
      //     this.generateSaveList(item.children)
      //   }
      // })

      list.forEach(item => {
        if (item.checked) {
          if (item.name === '合同管理' || item.name === '公会经纪人管理' || item.name === '退会主播列表') {
            this.saveList.push({
              privilegeId: item.id,
              scope: ''
            })
          } else {
            this.saveList.push({
              privilegeId: item.id,
              scope: this.scopeMap[this.currScopeId] ? this.scopeMap[this.currScopeId].toString() : ''
            })
          }
        }
        if (item.children) {
          this.generateSaveList(item.children)
        }
      })
    },

    confirmHandle () {
      this.scopeMap[this.currScopeId] = this.checkedKeys
      this.checkedNames = []
      this.getCheckedNames()
      this.visible = false
    },
    getCheckedNames () {
      this.originTree.forEach(item => {
        this.checkedKeys.forEach(id => {
          if (item.id === id) {
            this.checkedNames.push(item.name)
          }
        })
      })
    },
    cancelHandle () {
      this.visible = false
    },

    setDepartmentPrivilegesHandle () {
      setEmployeePrivileges({
        tagType: this.tagModel,
        id: this.employeeId,
        pairs: this.saveList
      }).then(() => {
        this.$message.success('修改成功')
        this.$router.push({ path: '/admin/ordinary/list' })
      })
    },

    createHandle () {
      this.saveList = []
      this.generateSaveList(this.authList)
      this.setDepartmentPrivilegesHandle()
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    min-height: 730px;
    padding-top: 8px;
    padding-bottom: 40px;
  }
  .search-cont {
    width: 300px;
    margin: 0 0 18px 16px;
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
  .user-cont {
    display: flex;
    flex: 1;
    margin: 20px 0 17px 0;
    .imgbox {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 16px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    .crip {
      flex: 1;
      p {
        margin-bottom: 6px;
        margin-top: 2px;
        &.p1 {
          font-size: 16px;
          color: rgba(0,0,0,.85);
        }
        &.p2 {
          font-size: 12px;
          color: #8C8C8C;
        }
      }
    }
  }
</style>
