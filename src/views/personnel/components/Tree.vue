<template>
  <div class="tree-content">
    <a-input-search class="input-search" placeholder="搜索" @change="onChange" />
    <div>
      <a-button v-if="permission.includes('peopleManagement_group_create') && departmentType !== 4 && searchValue === ''" class="btn-active btn-add" icon="plus" @click="addStrucHandle">新增组织架构</a-button>
    </div>
    <div v-if="searchValue !== ''" class="search-result-content">
      <a-spin class="tree-search-content" :spinning="spinningSearch">
        <dl v-if="searchResult && searchResult.departments.length > 0">
          <dt>部门</dt>
          <dd
            v-for="(item, index) in searchResult.departments"
            :key="index"
            @click="departDetailHandle(item)"
            :class="{'active': item.id === departSelectId}"
          >{{ item.name }}</dd>
        </dl>
      </a-spin>
    </div>
    <a-spin class="tree-load-content" :spinning="spinning">
      <a-tree
        v-if="searchValue === '' && defaultSelectKeys.length > 0"
        :expanded-keys="expandedKeys"
        :default-selected-keys="defaultSelectKeys"
        @select="onSelect"
        @expand="onExpand"
        :tree-data="treeData"
        show-icon
      >
        <a-icon slot="switcherIcon" type="caret-down" />
        <!-- <a-icon slot="top" type="cluster" /> -->
        <a-icon slot="sec" type="team" />
      </a-tree>
    </a-spin>
    <create-struc-form
      v-if="visible"
      :departmentType="departmentType"
      :treeData="treeData2"
      :visible="visible"
      @cancel="cancelHandle"
      @success="successHandle"
    />
  </div>
</template>
<script>
import { getStructureTree, searchStructureEmployee } from '@/api/personnel'
import getTreePageData from '@/utils/tree/generatePageTree'
import createTree from '@/utils/tree/generateTree'
import CreateStrucForm from '../modules/CreateStrucForm'

export default {
  name: 'StruTree',
  components: {
    CreateStrucForm
  },
  props: {
    permission: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      treeData: [],
      treeData2: [],
      expandedKeys: [],
      defaultSelectKeys: [],
      autoExpandParent: true,

      visible: false,

      timer: null,
      searchValue: '',
      searchResult: null,

      employeeSelectId: '',
      departSelectId: '',

      spinning: true,
      spinningSearch: false,

      departmentType: 1
    }
  },
  mounted () {
    this.getStructureTreeHandle()
  },
  methods: {
    getStructureTreeHandle () {
      getStructureTree().then(res => {
        this.origiTreeData = res
        const data = getTreePageData(res)
        this.treeData = data.treeData
        this.treeData2 = createTree(res, true)
        this.expandedKeys = this.defaultSelectKeys = data.defaultSelectKeys
        this.setInfoHandle(data.currId)
        this.spinning = false
      })
    },

    searchHandle () {
      searchStructureEmployee(this.searchValue).then(res => {
        this.searchResult = res
        this.spinningSearch = false
      })
    },

    // 添加部门
    addStrucHandle () {
      this.visible = true
    },

    cancelHandle () {
      this.visible = false
    },

    successHandle (str) {
      this.$message.success(str)
      this.cancelHandle()
      this.getStructureTreeHandle()
      this.$emit('success')
    },

    onChange (e) {
      this.searchValue = e.target.value
      clearTimeout(this.timer)
      if (this.searchValue.trim() === '') {
        return false
      }
      this.timer = setTimeout(() => {
        this.searchHandle()
      }, 500)
    },

    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },

    onSelect (selectedKeys, info) {
      this.setInfoHandle(selectedKeys[0])
    },

    setInfoHandle (id) {
      const data = this.origiTreeData.filter(item => item.id === id)
      if (data && data.length <= 0) return
      this.departmentType = data[0].type.code
      this.$emit('select', {
        id: id,
        type: data[0].type.code,
        title: data[0].name,
        departmentManager: data[0].departmentManager
      })
    },
    departDetailHandle (item) {
      this.$emit('departDetail', item)
      this.$emit('select', {
        id: item.id,
        title: item.name
      })
      this.departSelectId = item.id
    },

    refresh () {
      this.getStructureTreeHandle()
    }
  },
  watch: {
    searchValue (val) {
      this.searchValue = val.trim()
      this.employeeSelectId = ''
      this.departSelectId = ''
      this.spinningSearch = true
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
  .input-search {
    padding-right: 24px;
    /deep/ .ant-input-suffix {
      right: 36px;
    }
  }
  .btn-add {
    display: inline;
    margin-top: 16px;
    margin-bottom: 9px;
    font-weight: 500;
  }
  .tree-content {
    // margin-right: 10px;
    overflow: hidden;
    height: 100%;
    /deep/ .ant-tree {
      li {
        .ant-tree-node-content-wrapper {
          position: relative;
          width: 96%;
          &:hover {
            color: #755dd7;
          }
        }
        .ant-tree-node-content-wrapper.ant-tree-node-selected {
          color: #755dd7;
        }
      }
    }
  }

  .ant-pro-drop-down {
    /deep/ .action {
      margin-right: 8px;
    }
    /deep/ .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
  .opt {
    position: absolute;
    right: 20px;
    top: 2px;
  }

  .search-result-content {
    padding: 10px 5px 10px 16px;
    dl {
      dt {
        margin-bottom: 5px;
      }
      dd {
        position: relative;
        padding: 5px;
        margin-bottom: 2px;
        cursor: pointer;
        &:hover,
        &.active {
          background-color: @primary-1;
          color: @primary-color;
        }
        .opt {
          right: 2px;
          top: 4px;
        }
      }
    }
  }
  .tree-load-content,
  .tree-search-content {
    width: 100%;
    min-height: 100px;
    max-height: 700px;
    overflow-y: scroll;
    padding-right: 22px;
  }
</style>
