<template>
  <page-header-wrapper
    class="container"
  >
    <template v-slot:content>
      已设置 <span class="title"> {{ checkedKeys.length }} </span>个部门
    </template>
    <template v-slot:extraContent>
      <a-button type="primary" icon="unordered-list" class="custom" style="margin-right:8px;" @click="departmentList">管理员列表</a-button>
      <a-button type="primary" icon="sliders" class="custom" style="margin-right:8px;" @click="setPrivileges">设置默认权限</a-button>
      <a-button type="primary" icon="user-add" class="custom" @click="setDepartment">设置部门管理员</a-button>
    </template>
    <div class="content">
      <a-tree
        class="tree"
        v-model="checkedKeys"
        :expanded-keys="expandedKeys"
        checkable
        show-icon
        @expand="onExpand"
        :tree-data="treeData"
      >
        <a-icon slot="sec" type="team" />
      </a-tree>
    </div>
  </page-header-wrapper>
</template>

<script>
import { getDepartmentTree } from '@/api/admin'

export default {
  name: 'SetDepartment',
  data () {
    return {
      treeData: [],
      treeList: [],
      expandedKeys: [],
      checkedKeys: []
    }
  },
  mounted () {
    this.getScopesHandle()
  },
  methods: {
    getScopesHandle () {
      getDepartmentTree().then(res => {
        this.treeList = res
        const tree = this.toTree(res)
        this.treeData = this.generateTree(tree)
        this.expandedKeys.push(1)
      })
    },
    toTree (data) {
      const arr = []
      function createTree (id, array, list) {
        const newArr = list.filter(item => item.departmentParentId === id)
        newArr.forEach(item => {
          const arr = []
          item.departmentName = item.name ? `${item.departmentName}(${item.name})` : item.departmentName
          item.children = createTree(item.departmentId, arr, list)
          array.push(item)
        })
        return array
      }
      createTree(0, arr, data)
      return arr
    },
    generateTree (arr) {
      arr.forEach(item => {
        item['title'] = item.departmentName
        item['key'] = item.departmentId
        item['disableCheckbox'] = !item.enabled
        item['disabled'] = true
        item['scopedSlots'] = { title: 'custom' }
        item['slots'] = { icon: 'sec' }
        if (item.checked) {
          this.checkedKeys.push(item.departmentId)
          this.expandedKeys.push(item.departmentId)
        }

        if (item.departmentName.includes('直播事业部')) {
          this.expandedKeys.push(item.departmentId)
        }

        if (item.departmentParentId === 9) {
          this.expandedKeys.push(item.departmentId)
        }

        if (item.children) {
          this.generateTree(item.children)
        }
        return item
      })
      return arr
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
    },
    departmentList () {
      this.$router.push({ path: '/admin/department/list' })
    },
    setPrivileges () {
      this.$router.push({ path: '/admin/department/set-privileges' })
    },
    setDepartment () {
      this.$router.push({ path: '/admin/department/set-department' })
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    min-height: 600px;
    padding-bottom: 30px;
  }
  .title {
    color: #755DD7;
  }
  .tree {
    /deep/ li {
      span.ant-tree-checkbox {
        margin-top: 3px !important;
      }
    }
  }
  .btn-submit {
    margin-top: 15px;
  }
</style>
