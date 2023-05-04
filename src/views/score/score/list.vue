<template>
  <div class="container">
    <a-card
      class="card-title-large min-height"
      title="主播评分列表"
      :bordered="false"
    >
      <div slot="extra" style="display:flex">
        <div class="select-custom" style="top: 0; line-height:32px;">
          保底平台：{{ platformList.length !== 0 ? platformList.find(item => item.id === queryParams.platformType).name : '' }}
          <a-icon type="caret-down" />
          <!-- <span class="label">分公司:</span> -->
          <a-select v-model="queryParams.platformType" class="company-select" style="min-width: 150px;" @change="onSearch">
            <a-select-option v-for="(item, index) in platformList" :key="index" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
        </div>
        <div class="select-custom" style="top: 0; line-height:32px;">
          状态：{{ statusData.length !== 0 ? statusData.find(item => item.value === queryParams.state).text : '' }}
          <a-icon type="caret-down" />
          <!-- <span class="label">分公司:</span> -->
          <a-select v-model="queryParams.state" class="company-select" style="min-width: 150px;" @change="onSearch">
            <a-select-option v-for="(item, index) in statusData" :key="index" :value="item.value">
              {{ item.text }}
            </a-select-option>
          </a-select>
        </div>
        <a-input-search v-model="keyWord" placeholder="请输入主播昵称" style="width: 200px;margin:0 8px" @search="onSearch" />
        <a-range-picker
          style="width: 250px; margin-left:8px;"
          :ranges="{ '本周': [weekStart, weekEnd], '本月': [monthStart, monthEnd] }"
          value-format="YYYY-MM-DD"
          @change="onDateChange"
        />
        <a-button type="primary" style=" margin-left:16px;" @click="downloadHandle">
          <svg-icon class="icon aciton-icon-com" icon-class="export-icon"/>
          导出
        </a-button>
      </div>
      <s-table
        ref="table"
        row-key="id"
        :columns="columns"
        :data="getData"
        showPagination="auto"
        :scroll="{x: 3000}"
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
            class="action-btn"
            @click="detail(record)">详情</a-button>
        </template>
      </s-table>
    </a-card>
    <check-record
      :visible="visibleLog"
      :id="recordId"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { scoreColumns } from '../tableColumns'
import { getScoreList } from '@/api/score'
import { platformData } from '../type'
import CheckRecord from '../components/CheckRecord'

export default {
  components: {
    STable,
    Ellipsis,
    CheckRecord
  },
  data () {
    return {
      columns: scoreColumns,
      keyWord: '',
      queryParams: {
        platformType: '',
        keyWord: '',
        state: '',
        startDate: '',
        endDate: ''
      },

      weekStart: moment(moment().week(moment().week()).startOf('week') + 24 * 60 * 60 * 1000),
      weekEnd: moment(moment().week(moment().week()).endOf('week') + 24 * 60 * 60 * 1000),
      monthStart: moment().startOf('month'),
      monthEnd: moment().endOf('month'),

      statusName: '全部',
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
    onSearch () {
      this.queryParams.keyWord = this.keyWord
    },
    getData (parameter) {
      const params = Object.assign(parameter, {}, this.queryParams)
      return getScoreList(params).then(res => {
        return res
      })
    },
    detail (data) {
      this.$router.push({
        path: '/score/score/detail',
        query: {
          id: data.id
        }
      })
    },

    onDateChange (dateArr) {
      if (dateArr.length > 0) {
        this.queryParams.startDate = dateArr[0]
        this.queryParams.endDate = dateArr[1]
      } else {
        this.queryParams.startDate = ''
        this.queryParams.endDate = ''
      }
    },

    statusChangeHandle (value) {
      const data = this.statusData.filter(item => item.value === value)[0]
      this.statusName = data.text
    },

    downloadHandle () {
      let url = ''
      for (const key in this.queryParams) {
        if (this.queryParams[key] || this.queryParams[key] === 0) {
          url = url && `${url}&${key}=${this.queryParams[key]}` || `?${key}=${this.queryParams[key]}`
        }
      }
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/actor/score/actorScore/download${url}`
    },

    handleLog (id) {
      this.recordId = id
      this.visibleLog = true
    },
    handleCancel () {
      this.visibleLog = false
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
    queryParams: {
      handler () {
        this.$refs.table.refresh(true)
      },
      deep: true
    }
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
.opt-con .btn {
  margin: 0 10px;
}
.select-custom {
  margin-left: 8px;
}
.action-btn{
  &.disabled{
    cursor: not-allowed;
    color: #CFCED6!important;
  }
}
</style>
