<template>
  <div>
    <a-result v-if="!hasAuth" status="404" title="405" sub-title="抱歉！您未给该页面分配权限" style="margin-top: 50px;">
    </a-result>
    <a-card
      v-if="hasAuth"
      :bordered="false"
      :tab-list="tabListManage"
      :active-tab-key="activeKey"
      @tabChange="onTabChange"
    >
      <div slot="tabBarExtraContent" href="#">
        <span class="mr10">
          <a-input
            style="width: 160px;"
            v-if="activeKey === 'company'"
            class="search"
            v-model="companyName"
            @pressEnter="handleCmpanySearch"
            placeholder="请输入分公司名称">
            <a-icon slot="suffix" type="search" @click="handleCmpanySearch" />
          </a-input>
        </span>
        <month-comp v-if="activeKey !== 'anchor'" v-model="queryParams.monthCycle" />
        <span v-if="activeKey === 'anchor'">
          扶植周期:
          <a-range-picker
            style="width:220px;"
            v-model="outTime"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            @change="onTimeChange"
          />
        </span>
        <a-button
          v-if="canImport"
          style="margin-left:16px;"
          type="primary"
          @click="handleImport"
        >
          <svg-icon style="margin-right:6px; color:#fff;" class="icon" icon-class="import" /> 导入
        </a-button>
        <a-button v-if="tabInfo.key === 'anchor' && permission.includes('actor_mission_manage_excellent_actor_add')" style="margin-left:16px;" type="primary" @click="handleCreate">新建</a-button>
      </div>
      <s-table
        v-if="activeKey"
        ref="table"
        :row-key="(item, index) => index"
        :columns="tableColumns"
        :data="getData"
      >
        <span slot="nickName" slot-scope="index, record">
          <div class="flex-box">
            <div class="box-item">
              <p>{{ record.nickName }}</p>
              <p>抖音号: {{ record.tiktokCode }}</p>
              <p>火山号: {{ record.volcanoCode }}</p>
            </div>
          </div>
        </span>
        <span slot="action" slot-scope="index, record">
          <a-button v-if="permission.includes('actor_mission_manage_excellent_actor_update')" type="link" @click="handleEdit(record)">编辑</a-button>
        </span>
      </s-table>
    </a-card>
    <import-dialog
      :visible="visible"
      :title="importTitle"
      :importFunc="importFunc"
      @cancel="handleCancel"
      @success="handleSuccess" />
    <modify-dialog :visible="visibleCreate" :model="anchorModel" @cancel="handleCreateCancel" @success="handleSuccess" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'
import { STable } from '@/components'
import MonthComp from '../components/MonthComp'
import { amountFormat } from '@/utils/util'
import { tabListManage } from '../tab'
import ImportDialog from '../components/ImportDialog'
import ModifyDialog from '../components/ModifyDialog'

export default {
  name: 'TaskBackstageManage',
  components: {
    STable,
    MonthComp,
    ImportDialog,
    ModifyDialog
  },
  data () {
    return {
      visible: false,
      visibleCreate: false,
      anchorId: null,
      anchorModel: null,
      amountFormat,

      tabListManage: [],
      activeKey: '',
      tableFunc: null,
      tableColumns: [],
      importFunc: null,
      importTitle: '',
      tabInfo: {},

      queryParams: {
        monthCycle: moment().format('YYYY-MM'),
        beginTime: '',
        endTime: ''
      },

      outTime: [],
      companyName: '',

      hasAuth: true
    }
  },
  mounted () {
    this.generateTabsHandle()
  },
  methods: {
    generateTabsHandle () {
      const tabArr = tabListManage.filter(item => this.permission.includes(item.permissionCode))
      if (tabArr.length <= 0) {
        this.hasAuth = false
      } else {
        this.tabInfo = tabArr[0]
        this.tabListManage = tabArr
        this.setTableHandle(this.tabInfo.key, this.tabInfo)
      }
    },
    getData (parameter) {
      const params = this.queryParams
      if (this.outTime.length > 0) {
        params['beginTime'] = this.outTime[0]
        params['endTime'] = this.outTime[1]
      }
      params['companyName'] = this.companyName || undefined
      const requestParameters = Object.assign({}, parameter, params)
      // this.createDownloadUrl(requestParameters)
      return this.tableFunc(requestParameters).then(res => {
        return res
      })
    },
    onTimeChange () {
      this.$refs.table.refresh(true)
    },
    onTabChange (key) {
      this.$refs.table.localDataSource = []
      if (this.timer) clearTimeout(this.timer)
      this.tabInfo = this.tabListManage.find(tab => tab.key === key)
      this.setTableHandle(key, this.tabInfo)
      this.timer = setTimeout(() => {
        this.$refs.table.refresh(true)
      }, 500)
    },

    handleCmpanySearch () {
      this.$refs.table.refresh(true)
    },

    setTableHandle (key, tabInfo) {
      this.activeKey = key
      this.tableFunc = tabInfo.func
      this.tableColumns = tabInfo.columns
      this.importFunc = tabInfo.importFunc
      this.importTitle = tabInfo.tab
    },

    handleImport () {
      this.visible = true
    },

    handleCancel () {
      this.visible = false
    },

    handleSuccess () {
      this.visible = this.visibleCreate = false
      this.$refs.table.refresh(true)
    },

    cancelReset () {
      this.anchorModel = null
      this.visibleCreate = false
    },

    handleCreateCancel () {
      this.cancelReset()
    },

    handleCreate () {
      this.visibleCreate = true
    },

    handleEdit (record) {
      this.anchorModel = record
      this.visibleCreate = true
    }
  },
  computed: {
    ...mapGetters(['permission']),
    canImport () {
      if (this.tabInfo.key === 'operate' && this.permission.includes('actor_mission_manage_special_import')) {
        return true
      } else if (this.tabInfo.key === 'anchor' && this.permission.includes('actor_mission_manage_excellent_actor_import')) {
        return true
      } else if (this.tabInfo.key === 'settlement' && this.permission.includes('actor_mission_manage_settlement_import')) {
        return true
      } else if (this.tabInfo.key === 'lecturer' && this.permission.includes('actor_mission_manage_lecturer_import')) {
        return true
      } else if (this.tabInfo.key === 'company' && this.permission.includes('actor_mission_manage_company_target_import')) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    'queryParams.monthCycle' () {
      this.$refs.table && this.$refs.table.refresh(true)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
