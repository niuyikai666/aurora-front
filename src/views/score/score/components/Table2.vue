<template>
  <div>
    <total :api="actorScoreCompanyStatistic" :params="params" />
    <div class="search-bar">
      <div class="left">
        <span class="title">主播评分列表</span>
        <div class="select-custom">
          分公司：{{ companyList && companyList.length > 0 ? companyList.find(item => item.id === queryParams.companyId).fullName : '' }}
          <a-icon type="caret-down" />
          <!-- <span class="label">分公司:</span> -->
          <a-select v-model="queryParams.companyId" class="company-select" style="min-width: 150px;" @change="onSearch">
            <a-select-option v-for="(item, index) in companyList" :key="index" :value="item.id">
              {{ item.fullName }}
            </a-select-option>
          </a-select>
        </div>
        <div class="select-custom">
          状态：{{ statusData.length !== 0 ? statusData.find(item => item.value === queryParams.state).text : '' }}
          <a-icon type="caret-down" />
          <!-- <span class="label">分公司:</span> -->
          <a-select v-model="queryParams.state" class="company-select" style="min-width: 150px;" @change="onSearch">
            <a-select-option v-for="(item, index) in statusData" :key="index" :value="item.value">
              {{ item.text }}
            </a-select-option>
          </a-select>
        </div>
      </div>
      <div class="right">
        <a-input-search class="input-search" v-model="keyWord" placeholder="请输入主播昵称" style="width: 200px;" @search="changeHandle" />
        <a-button type="primary" style=" margin-left:24px;" @click="downloadHandle">
          <svg-icon class="icon aciton-icon-com" icon-class="export-icon"/>
          导出
        </a-button>
      </div>
    </div>
    <s-table
      ref="table"
      row-key="id"
      :columns="columns"
      :data="getData"
      showPagination="auto"
      :scroll="{x: 3500}"
    >
      <div slot="nickName" slot-scope="text, record">
        <div class="flex-box">
          <div class="box-item">
            <p>
              {{ record.nickName }}
              <span class="score-label">{{ record.actorCategory.code | changeCategory }}</span>
              <span class="score-label-plat" v-if="record.actorCategory && record.actorCategory.code === 2">{{ record.scorePlatform && record.scorePlatform.code | platform }}</span>
            </p>
            <p>平台ID: {{ record.platformAccount || '-' }}</p>
          </div>
        </div>
      </div>
      <template slot="suggestions" slot-scope="text, record">
        <span v-if="record.suggestionList.length === 0">无</span>
        <ellipsis v-if="record.suggestionList.length > 0" :length="40" tooltip>{{ record.suggestionList.join('/') }}</ellipsis>
      </template>
      <template slot="state" slot-scope="text, record">
        <span>{{ text && text.msg }}</span>
        <svg-icon @click="handleLog(record.id)" class="icon" icon-class="time" style="margin-left:5px;cursor:pointer;"/>
      </template>
      <template slot="action" slot-scope="text, record">
        <a-button
          type="link"
          class="action-btn mr10"
          @click="detail(record)">详情</a-button>
        <a-popconfirm
          v-if="record.state && record.state.code === 0"
          overlayClassName="popoer-del"
          title="确定要删除吗？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="handleDelete(record.id)">
          <a-button type="link">删除</a-button>
        </a-popconfirm>
      </template>
    </s-table>
    <check-record
      :visible="visibleLog"
      :id="recordId"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { scoreColumns } from '../../tableColumns'
import { getScoreAdminVideoList, actorScoreCompanyStatistic, getScoreAdminDelete } from '@/api/score'
import { platformData } from '../../type'
import Total from './Total.vue'
import CheckRecord from '../../components/CheckRecord'

export default {
  name: 'ToalComp1',
  props: {
    params: {
      type: Object,
      default: null
    },
    companyList: {
      type: Array,
      default: null
    }
  },
  components: {
    Total,
    Ellipsis,
    STable,
    CheckRecord
  },
  data () {
    return {
      actorScoreCompanyStatistic,
      columns: scoreColumns,
      keyWord: '',
      queryParams: {
        keyWord: '',
        state: '',
        companyId: '',
        startDate: '',
        endDate: '',
        platformType: 2
      },

      statusData: [
        {
          text: '全部',
          value: ''
        },
        {
          text: '申请中',
          value: 0
        },
        {
          text: '预审核',
          value: 1
        },
        {
          text: '评审中',
          value: 2
        },
        {
          text: '待申诉',
          value: 3
        },
        {
          text: '客观分未通过',
          value: 4
        },
        {
          text: '预审核未通过',
          value: 5
        },
        {
          text: '保底申请未通过',
          value: 6
        },
        {
          text: '已通过',
          value: 7
        }
      ],

      platformList: [
        { id: '', name: '全部' },
        { id: 1, name: '抖音' },
        { id: 2, name: '视频号' }
      ],

      downloadUrl: '',

      visibleLog: false,
      recordId: null
    }
  },
  mounted () {
  },
  methods: {
    getData (parameter) {
      const params = Object.assign(parameter, {}, this.queryParams)
      return getScoreAdminVideoList(params).then(res => {
        return res
      })
    },
    detail (data) {
      this.$router.push({
        path: '/score/admin/detail',
        query: {
          id: data.id
        }
      })
    },

    onSearch () {
      this.$refs.table.refresh(true)
    },

    changeHandle () {
      this.queryParams.keyWord = this.keyWord
      this.$refs.table.refresh(true)
    },

    statusChangeHandle (value) {
      const data = this.statusData.filter(item => item.value === value)[0]
      this.statusName = data.text
    },

    handleDelete (id) {
      getScoreAdminDelete(id).then(() => {
        this.$refs.table.refresh()
      })
    },

    handleLog (id) {
      this.recordId = id
      this.visibleLog = true
    },
    handleCancel () {
      this.visibleLog = false
    },

    downloadHandle () {
      let url = ''
      for (const key in this.queryParams) {
        if (this.queryParams[key] || this.queryParams[key] === 0) {
          url = url && `${url}&${key}=${this.queryParams[key]}` || `?${key}=${this.queryParams[key]}`
        }
      }
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/actor/score/actorScore/admin/download-sph${url}`
    }
  },
  filters: {
    changeCategory (val) {
      if (val === 0) {
        return '存量'
      } else if (val === 1) {
        return '新'
      } else if (val === 2) {
        return '优质'
      } else if (val === 3) {
        return '游戏'
      }
    },
    platform (code) {
      return platformData[code]
    }
  },
  watch: {
    params: {
      handler (val) {
        this.queryParams = {
          ...this.queryParams,
          ...this.params
        }
        this.$refs.table.refresh(true)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../index.less';
.select-custom {
  margin: 0 24px 0 0;
}
</style>
