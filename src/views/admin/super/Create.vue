<template>
  <page-header-wrapper
    class="container"
    title="新建超级管理员"
    content="设置管理员的权限及权限范围"
  >
    <div class="content">
      <tab-content title="设置管理员账号" :titleLine="true">
        <div class="search-cont">
          <a-auto-complete
            style="width: 100%; margin-top:10px;"
            placeholder="请选择账号"
            option-label-prop="title"
            @search="onSearch"
            @select="onSelect"
          >
            <template slot="dataSource">
              <a-select-option class="auto-option" v-for="item in dataSource" :key="item.id" :title="item.name">
                <!-- <span>{{ item.name }}({{ item.departmentName.join(',') }})</span> -->
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
      <a-button class="btn-submit" type="primary" style="margin-left:15px;margin-top:10px" @click="createHandle">确认添加</a-button>
    </div>
  </page-header-wrapper>
</template>

<script>
import TabContent from './components/TabContent'
import { employeesSearch, setEmployeeRoles } from '@/api/admin'

export default {
  name: 'SuperCreate',
  components: {
    TabContent
  },
  data () {
    return {
      visible: false,
      dataSource: [],
      searchValue: '',
      employeeId: ''
    }
  },
  mounted () {
  },
  methods: {
    createHandle () {
      // console.log('create')
      if (this.employeeId === '') {
        this.$message.error('请选择账号')
        return false
      }
      setEmployeeRoles(1, this.employeeId).then(() => {
        this.$message.success('创建成功')
        this.$router.push({ path: '/admin/super/list' })
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
</style>
