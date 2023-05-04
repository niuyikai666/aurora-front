<template>
  <page-header-wrapper
    class="container"
  >
    <p class="title">请勾选部门设置部门管理员，已选择 <span> {{ checkedKeys.length }} </span>个部门</p>
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
      <a-button class="btn-submit" type="primary" @click="createHandle">确定启用</a-button>
    </div>
  </page-header-wrapper>
</template>

<script>
import { getDepartmentTree, setBathRoles } from '@/api/admin'

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
        item['disabled'] = !item.enabled
        item['scopedSlots'] = { title: 'custom' }
        item['slots'] = { icon: 'sec' }
        if (item.checked) {
          this.checkedKeys.push(item.departmentId)
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
    createHandle () {
      const checkedIds = []

      if (this.checkedKeys.length <= 0) {
        this.$message.error('请选择部门管理员')
        return false
      }

      this.treeList.forEach(item => {
        if (this.checkedKeys.indexOf(item.departmentId) !== -1 && item.id !== '') {
          checkedIds.push(item.id)
        }
      })

      setBathRoles(2, checkedIds).then(() => {
        this.$message.success('设置成功')
        this.$router.push({ path: '/admin/department/department-tree' })
      })
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
    padding-left: 16px;
    span {
      color: #755DD7;
    }
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
