<template>
  <page-header-wrapper
    class="container"
    :content="topContent"
  >
    <div class="content">
      <div class="scrip-content">
        <a-row class="box" v-for="(item, index) in authList" :key="index">
          <a-col :xs="24" :md="11">
            <div class="set-bar">
              <span class="title">{{ item.name }}</span>
              <a-switch v-model="item.checked" :disabled="!item.authorized" @change="onChange" />
            </div>
            <p class="crip">{{ item.remark }}</p>
          </a-col>
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
      <a-button class="btn-submit" type="primary" icon="save" @click="saveHandle">保存设置</a-button>
    </div>
  </page-header-wrapper>
</template>

<script>
import { getPrivilegesByRole, setRolePrivileges } from '@/api/admin'

export default {
  name: 'SetPrivileges',
  data () {
    return {
      topContent: '设置部门管理员拥有的默认权限，更改后会变更全部部门管理员的原有权限',
      checkedList: [],
      authList: [],
      saveList: []
    }
  },
  mounted () {
    this.getPrivilegesWidthAuthorizedHandle()
  },
  methods: {
    getPrivilegesWidthAuthorizedHandle () {
      getPrivilegesByRole(2).then(res => {
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
    saveHandle () {
      this.saveList = []
      this.generateSaveList(this.authList)
      this.setDepartmentPrivilegesHandle()
    },
    setDepartmentPrivilegesHandle () {
      if (this.saveList.length <= 0) {
        this.$message.warning('您还没有设置权限')
        return
      }
      setRolePrivileges({
        id: 2,
        pairs: this.saveList
      }).then(() => {
        this.$message.success('保存设置成功')
        this.$router.push({ path: '/admin/department/department-tree' })
      })
    },
    generateSaveList (list) {
      list.forEach(item => {
        if (item.checked) {
          this.saveList.push({
            privilegeId: item.id
          })
        }
        if (item.children) {
          this.generateSaveList(item.children)
        }
      })
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
    }
  }
}
</script>

<style lang="less" scoped>
  .content {
    min-height: 600px;
    padding-top: 8px;
    padding-bottom: 50px;
  }
</style>
