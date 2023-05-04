<template>
  <page-header-wrapper
    class="container"
    title="新建普通管理员"
    :content="topContent"
  >
    <div class="content">
      <tab-content title="设置管理员账号" :titleLine="true">
        <div class="search-cont">
          <a-auto-complete
            style="width: 100%"
            placeholder="请选择账号"
            option-label-prop="title"
            @search="onSearch"
            @select="onSelect"
          >
            <template slot="dataSource">
              <a-select-option class="auto-option" v-for="item in dataSource" :key="item.id" :title="item.name">
                <div class="auto-box">
                  <div class="imgbox">
                    <img class="porait" :src="item.portrait" alt="">
                  </div>
                  <div class="crip">
                    <p class="uname">{{ item.name }}({{ item.mobile }})</p>
                    <p class="udepartment">{{ item.departmentName.join(',') }}</p>
                  </div>
                </div>
              </a-select-option>
            </template>
            <a-input>
              <a-icon slot="suffix" type="search" />
            </a-input>
          </a-auto-complete>
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
      <a-button class="btn-submit" type="primary" icon="save" @click="createHandle()" style="margin-left:16px;">创 建</a-button>
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
import { getPrivilegesByRole, getScopes, employeesSearch, setEmployeePrivileges } from '@/api/admin'

export default {
  name: 'OrdinaryCreate',
  components: {
    TabContent
  },
  data () {
    return {
      topContent: '设置管理员的权限及权限范围',
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

      employeeId: '',
      tagModel: 1
    }
  },
  mounted () {
    this.getScopesHandle()
    this.getPrivilegesWidthAuthorizedHandle()
  },
  methods: {
    getPrivilegesWidthAuthorizedHandle () {
      getPrivilegesByRole(3).then(res => {
        this.origiList = res
        this.authList = this.generateAuthList(res)
      })
    },
    generateAuthList (res) {
      const parent = res.filter(item => item.parentId === 0)
      res.forEach(item => {
        parent.forEach(it => {
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
    settingHandle (id) {
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
      this.originTree.forEach(item => {
        this.checkedKeys.forEach(id => {
          if (item.id === id) {
            this.checkedNames.push(item.name)
          }
        })
      })
      this.visible = false
    },
    cancelHandle () {
      this.visible = false
    },
    createHandle () {
      this.saveList = []
      this.generateSaveList(this.authList)
      this.setDepartmentPrivilegesHandle()
    },

    setDepartmentPrivilegesHandle () {
      if (this.employeeId === '') {
        this.$message.warning('请选择账号')
        return
      }
      if (this.saveList.length <= 0) {
        this.$message.warning('您还没有设置权限')
        return
      }
      setEmployeePrivileges({
        tagType: this.tagModel,
        id: this.employeeId,
        pairs: this.saveList
      }).then(() => {
        this.$message.success('创建成功')
        this.$router.push({ path: '/admin/ordinary/list' })
      })
    },

    onSelect (value, option) {
      const data = this.dataSource.filter(item => item.id === option.key)[0]
      this.employeeId = data.id
    },
    onSearch (query) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.dataSearchHandle(query)
      }, 500)
    },
    dataSearchHandle (query) {
      if (query.trim() === '') return
      employeesSearch(query).then(res => {
        this.employeeId = ''
        this.dataSource = []
        if (res.length > 0) {
          this.dataSource = res.map(item => {
            item.id = item.id + ''
            item.name = `${item.name}`
            return item
          })
        }
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
      color: #FAAD755DD714;
    }
    .pri-btn {
      cursor: pointer;
    }
  }
</style>
