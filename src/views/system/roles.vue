<template>
  <div class="container">
    <a-card class="card-title-large" title="角色管理" :bordered="false">
      <div slot="extra">
        <a-button
          type="primary"
          icon="plus"
          @click="createhandle()"
          v-if="permission.includes('system_role_opt_create')"
        >
          新建角色
        </a-button>
      </div>
      <s-table ref="table" row-key="id" :columns="columns" :data="loadData">
        <span slot="action" slot-scope="index, record">
          <div v-if="record.enabled">
            <a-button
              type="link"
              @click="edithandle(record)"
              v-if="permission.includes('system_role_opt_edit')"
            >
              修改
            </a-button>
          </div>
        </span>
      </s-table>

      <!-- 权限弹窗 -->
      <auth-dialog
        :visible="authVisible"
        :roleId="roleId"
        @cancel="roleCancelHandle"
        @success="roleSuccessHandle"
      />
    </a-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { STable } from '@/components'
import AuthDialog from './components/AuthDialog'
import { getRoles } from '@/api/system'

const columns = [
  {
    title: '角色名称',
    dataIndex: 'name'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime'
  },
  {
    title: '修改时间',
    dataIndex: 'modifyTime'
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 80
  }
]

export default {
  name: 'StruDisabled',
  components: {
    STable,
    AuthDialog
  },
  data() {
    return {
      columns,
      form: this.$form.createForm(this),
      authVisible: false,
      roleId: ''
    }
  },
  methods: {
    loadData(parameter) {
      const requestParameters = Object.assign({}, parameter, {})
      return getRoles(requestParameters).then((res) => {
        return res
      })
    },

    formatLength(rule, value, callback) {
      if (value && value.trim() === '') {
        callback(new Error('角色名称不能为空'))
      } else if (value && value.trim().length > 20) {
        callback(new Error('角色名称不能超过20个字符'))
      } else {
        callback()
      }
    },

    edithandle(item) {
      this.roleId = item.id
      this.authVisible = true
    },

    createhandle() {
      this.authVisible = true
    },

    roleSuccessHandle() {
      this.$refs.table.refresh()
    },

    roleCancelHandle() {
      this.authVisible = false
      this.roleId = ''
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
