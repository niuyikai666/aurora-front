<template>
  <div class="container">
    <a-card
      class="card-auth card-title-large"
      title="权限管理"
      :bordered="false"
    >
      <div class="author-content">
        <div class="left-content">
          <a-table
            row-key="id"
            :columns="leftColumns"
            :data-source="roleData"
            :loading="loading"
            :pagination="false"
            :customRow="Rowclick"
            :rowClassName="record => 'pointer'"
          >
            <span slot="check" slot-scope="text, record">
              <a-checkbox name="check" :checked="record.checked" @click="checkHandle(record.id)" />
            </span>
          </a-table>
        </div>
        <div class="right-content">
          <div data-show="true" class="ant-alert ant-alert-info" style="margin-bottom: 16px;">
            <i aria-label="图标: info-circle" class="anticon anticon-info-circle ant-alert-icon">
              <svg
                viewBox="64 64 896 896"
                data-icon="info-circle"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              ><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path></svg></i>
            <span class="ant-alert-message">
              <span style="margin-right: 12px;">共有: <a style="font-weight: 600;">{{ totalCount }}</a> 人</span>
            </span>
            <span class="ant-alert-description"></span>
          </div>
          <s-table
            style="margin-bottom: 24px"
            ref="table"
            row-key="mobile"
            :columns="rightColumns"
            :data="getEmployeeHandle">
            <span slot="departmentInfo" slot-scope="text, record">
              {{ record.departmentInfo.name }}
            </span>
          </s-table>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { STable } from '@/components'
import { getRoles, getEmployeeById } from '@/api/system'

const leftColumns = [
  {
    title: '',
    dataIndex: 'check',
    scopedSlots: { customRender: 'check' },
    width: '0'
  },
  {
    title: '角色名称',
    dataIndex: 'name'
  }
]

const rightColumns = [
  {
    title: '员工姓名',
    dataIndex: 'name'
  },
  {
    title: '手机号',
    dataIndex: 'mobile'
  },
  {
    title: '部门',
    dataIndex: 'departmentInfo',
    scopedSlots: { customRender: 'departmentInfo' }
  }
]

export default {
  name: 'StruDisabled',
  components: {
    STable
  },
  data () {
    return {
      leftColumns,
      rightColumns,
      loading: true,
      roleData: [],
      queryParams: {
        roleId: 1
      },

      totalCount: 0
    }
  },
  mounted () {
    this.roleDataHandle()
  },
  methods: {
    roleDataHandle () {
      getRoles({
        page: 1,
        size: 100
      }).then(res => {
        this.loading = false
        res.list.forEach((item, index) => {
          item.checked = false
          if (index === 0) {
            item.checked = true
            this.queryParams.roleId = item.id
          }
        })
        this.roleData = res.list
        this.$refs.table.refresh(true)
      })
    },

    getEmployeeHandle  (parameter) {
      const requestParameters = Object.assign({}, parameter, this.queryParams)
      return getEmployeeById(requestParameters).then(res => {
        this.totalCount = res.totalCount
        return res
      })
    },

    checkHandle (id) {
      this.roleData.forEach(item => {
        if (item.id === id) {
          item.checked = true
        } else {
          item.checked = false
        }
      })

      this.queryParams.roleId = id
      this.$refs.table.refresh(true)
    },
    Rowclick (record) {
      return {
        on: {
          click: () => {
            this.checkHandle(record.id)
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
