<template>
  <div>
    <total-comp :params="queryParams">
      <div class="extra-custom" slot="extra-custom">
        <div>
          <a-button-group class="btn-group btn-group-extra">
            <a-button
              :class="{ active: activeTimeIndex === 0 }"
              @click="change(0)"
            >
              {{ timeRange[0].text }}
            </a-button>
            <a-button
              :class="{ active: activeTimeIndex === 1 }"
              @click="change(1)"
            >
              {{ timeRange[1].text }}
            </a-button>
            <a-month-picker
              v-model="timeRange[2].value"
              :disabled-date="disabledDate"
              value-format="YYYY-MM"
              @change="changeTime()"
            >
              <a-button
                ref="btnGroup"
                :class="{ active: activeTimeIndex === 2 }"
              >
                {{ timeRange[2].text }}
              </a-button>
            </a-month-picker>
          </a-button-group>
          <div class="select-custom">
            分公司：{{
              companyList.length !== 0
                ? companyList.find((item) => item.id === queryParams.companyId).name
                : ''
            }}
            <a-icon type="caret-down" />
            <!-- <span class="label">分公司:</span> -->
            <a-select
              v-model="queryParams.companyId"
              class="company-select"
              style="min-width: 150px;"
              @change="selectChange"
            >
              <a-select-option
                v-for="(item, index) in companyList"
                :key="index"
                :value="item.id"
              >
                {{ item.name }}
              </a-select-option>
            </a-select>
          </div>
        </div>
        <div class="right-con">
          <a-button
            type="primary"
            style="margin: 0 6px; height:28px;"
            @click="importHandle3"
          >
            录入有效招募任务目标数
          </a-button>
          <a-button
            type="primary"
            style="margin: 0 6px; height:28px;"
            @click="importHandle"
          >
            <svg-icon
              style="margin-right:6px; color:#fff;"
              class="icon"
              icon-class="import"
            />
            导入制定目标
          </a-button>
          <a-button
            type="primary"
            style="margin: 0 6px; height:28px;"
            @click="importHandle2"
          >
            <svg-icon
              style="margin-right:6px; color:#fff;"
              class="icon"
              icon-class="import"
            />
            导入结算
          </a-button>
          <a-button
            type="primary"
            style="margin: 0 6px; height:28px;"
            @click="exportHandle"
          >
            <svg-icon icon-class="import-icon" class="import-icon"></svg-icon>
            导出小组关系
          </a-button>
          <a-button type="primary" style=" height:28px;" @click="exportHandle2">
            <svg-icon icon-class="import-icon" class="import-icon"></svg-icon>
            导出分公司关系
          </a-button>
        </div>
      </div>
    </total-comp>
    <a-card style="margin-top:24px;" :bordered="false" :loading="loading">
      <div class="static-content" style="margin-top:0">
        <a-statistic
          title="总流水(元)"
          :value="
            (task.totalIncome && amountFormat(task.totalIncome, true, 1)) || '0'
          "
        />
        <a-statistic
          title="日均流水(元)"
          :value="
            (task.dailyAverageIncome &&
              amountFormat(task.dailyAverageIncome, true, 1)) ||
              '0'
          "
        />
        <a-statistic
          title="本月预估流水(元)"
          :value="
            (task.expectedIncome &&
              amountFormat(task.expectedIncome, true, 1)) ||
              '0'
          "
        />
        <a-statistic style="opacity:0" />
      </div>
      <div class="static-content">
        <a-statistic
          title="小组任务平均提成"
          :value="
            (task.averageCommission &&
              amountFormat(task.averageCommission * 100)) ||
              0
          "
          suffix="%"
        />
        <a-statistic
          title="任务小组个数"
          :value="
            (task.groupCount && amountFormat(task.groupCount, false)) || '0'
          "
        />
        <a-statistic
          :value="
            (task.propRewardProportionTwo &&
              amountFormat(task.propRewardProportionTwo, false)) ||
              '0'
          "
        >
          <span slot="title">
            道具占比超过10%小组个数
            <a-popover placement="topLeft">
              <template slot="content">
                <div class="index-crip-content">
                  <p class="title" style="font-size:16px;">指标说明</p>
                  <dl class="list">
                    <dd>统计30%>道具占比>=10%范围的小组</dd>
                    <dd>
                      道具占比=直播明细表中总道具音浪/直播明细表中所有音浪总和*100%
                    </dd>
                  </dl>
                </div>
              </template>
              <a-icon
                type="question-circle"
                style="font-size:14px; cursor:pointer;"
              />
            </a-popover>
          </span>
        </a-statistic>
        <a-statistic
          title="道具占比超过30%小组个数"
          :value="
            (task.propRewardProportion &&
              amountFormat(task.propRewardProportion, false)) ||
              '0'
          "
        />
      </div>
    </a-card>
    <!-- <a-card style="margin-top:24px;" :bordered="false" :loading="loading2">
      <div class="t-description">
        <div class="description-item">
          <div class="item">组长提成比例</div>
          <div class="item">个数</div>
          <div class="item">累计占比</div>
        </div>
        <div
          class="description-item"
          v-for="(li, index) in stateList"
          :key="index"
        >
          <div class="item">
            <span v-if="li.startPct !== null">
              {{ amountFormat(li.startPct * 100, true, 1) }}%
            </span>
            <span v-if="li.endPct !== null && li.startPct !== null">~</span>
            <span v-if="li.endPct !== null">
              {{ amountFormat(li.endPct * 100, true, 1) }}%
            </span>
            <span>小组个数</span>
          </div>
          <div class="item">
            {{ (li.count && amountFormat(li.count, false)) || '0' }}
          </div>
          <div class="item">
            {{
              (li.cumulativeProportion &&
                amountFormat(li.cumulativeProportion * 100, true, 1)) ||
                0
            }}%
          </div>
        </div>
      </div>
    </a-card> -->
    <a-card
      style="margin-top:24px;"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="tabActiveKey"
      @tabChange="(key) => handleTabChange(key)"
    >
      <div slot="tabBarExtraContent">
        <span v-if="tabActiveKey !== 'tab4' && tabActiveKey !== 'tab6'">
          <a-button
            type="primary"
            style="display:inline-block; margin-left: 15px; height:30px;"
            @click="exportListHandle"
          >
            <svg-icon class="icon aciton-icon-com" icon-class="export-icon" />
            导出
          </a-button>
        </span>
        <span v-if="tabActiveKey === 'tab6'">
          <a-button
            type="primary"
            style="display:inline-block; margin-left: 15px; height:30px;"
            @click="handleSquaredImport"
          >
            <svg-icon class="icon aciton-icon-com" icon-class="import-icon" />
            导入
          </a-button>
        </span>
      </div>
      <div v-if="tabActiveKey === 'tab1'">
        <table1 :params="queryParams" />
      </div>
      <div v-if="tabActiveKey === 'tab2'">
        <table2 :params="queryParams" />
      </div>
      <div v-if="tabActiveKey === 'tab3'">
        <table3 :params="queryParams" @returnparams="receiveParams" />
      </div>
      <!-- <div v-if="tabActiveKey === 'tab4'">
        <table-recruit :params="queryParams" />
      </div> -->
      <div v-if="tabActiveKey === 'tab5'">
        <table-operate :params="queryParams" />
      </div>
      <div v-if="tabActiveKey === 'tab6'">
        <table-squared ref="tableSquared" :params="queryParams" />
      </div>
    </a-card>
    <import-dialog :visible="visibleImport" @cancel="cancelHandle" />
    <import-total-dialog
      :visible="visibleImportSettlement"
      @cancel="cancelHandle"
    />
    <recruit-add-dialog :visible="visibleRecruit" @cancel="cancelHandle" />
    <import-squared-dialog :visible="visibleSquared" @cancel="cancelHandle" @success="handleSuccess" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import qs from 'qs'
import { amountFormat } from '@/utils/util'
import moment from 'moment'
import TotalComp from '../components/TotalComp'
import Table1 from './components/Table1'
import Table2 from './components/Table2'
import Table3 from './components/Table3'
import TableRecruit from '../components/TableRecruit'
import TableRecruitMonth from '../components/TableRecruitMonth'
import TableOperate from '../components/TableOperate'
import TableSquared from '../components/TableSquared'
import ImportDialog from '../components/ImportDialog'
import ImportTotalDialog from '../components/ImportTotalDialog'
import RecruitAddDialog from '../components/RecruitAddDialog'
import ImportSquaredDialog from '../components/ImportSquaredDialog'

import {
  getGourpCompanyList,
  getOldTiktokLiveInfoDate
  // groupCommissionStat
} from '@/api/task'

export default {
  name: 'TeamMember',
  components: {
    TotalComp,
    Table1,
    Table2,
    Table3,
    TableRecruit,
    TableRecruitMonth,
    TableOperate,
    ImportDialog,
    ImportTotalDialog,
    RecruitAddDialog,
    TableSquared,
    ImportSquaredDialog
  },
  data() {
    return {
      amountFormat,
      queryParams: {
        order: '',
        companyId: '',
        isAdminPath: 1,
        monthCycle: moment().format('YYYY-MM')
      },
      tabList: [
        { key: 'tab1', tab: '小组任务进度' },
        { key: 'tab2', tab: '分公司流水任务进度' }
        // { key: 'tab3', tab: '全部老主播流水' }
      ],
      tabActiveKey: 'tab1',
      companyList: [],

      activeTimeIndex: 0,
      timeRange: [
        {
          text: '本月',
          value: moment().format('YYYY-MM')
        },
        {
          text: '上月',
          value: moment(new Date())
            .subtract(1, 'months')
            .format('YYYY-MM')
        },
        {
          text: '自定义',
          value: undefined
        }
      ],
      visibleImport: false,
      visibleImportSettlement: false,
      visibleRecruit: false,
      visibleSquared: false,
      task: {},
      stateList: [],

      loading: true,
      loading2: true
    }
  },
  mounted() {
    let tabData = []
    if (
      this.permission.includes('group_mission_manage_all_old_actor_reward_list')
    ) {
      tabData = [...this.tabList, { key: 'tab3', tab: '流水任务明细' }]
    }
    this.tabList = [
      ...tabData,
      { key: 'tab5', tab: '运营任务' },
      { key: 'tab6', tab: '分公司入会流水任务' }
    ]
    this.getTaskInfo()
    // this.groupCommissionStat()
    this.getCompanyListHandle()
  },
  methods: {
    getTaskInfo() {
      getOldTiktokLiveInfoDate(this.queryParams).then((res) => {
        this.task = res
        this.loading = false
      })
    },
    // groupCommissionStat() {
    //   groupCommissionStat(this.queryParams).then((res) => {
    //     this.stateList = res || []
    //     this.loading2 = false
    //   })
    // },
    handleTabChange(key) {
      this.tabActiveKey = key

      // 为了处理全部老主播流水 查询参数
      this.queryParams.actorOperator = undefined
      this.queryParams.actorSearch = undefined
      this.queryParams.operatorName = undefined
    },
    // 获取分公司下拉列表
    getCompanyListHandle() {
      getGourpCompanyList(this.companyId).then((res) => {
        this.companyList = [
          {
            id: '',
            name: '全部'
          },
          ...res
        ]
      })
    },
    change(index) {
      // if (this.activeTimeIndex === index) {
      //   this.setParams(null, '')
      // } else {
      //   this.setParams(index, this.timeRange[index].value)
      // }
      this.setParams(index, this.timeRange[index].value)
    },
    changeTime() {
      this.setParams(2, this.timeRange[2].value)
    },
    setParams(index, time) {
      this.activeTimeIndex = index
      this.queryParams.monthCycle = time
      this.getTaskInfo()
      this.groupCommissionStat()
    },
    selectChange() {
      this.getTaskInfo()
    },
    handleSquaredImport () {
      this.visibleSquared = true
    },
    importHandle() {
      this.visibleImport = true
    },

    importHandle2() {
      this.visibleImportSettlement = true
    },

    importHandle3() {
      this.visibleRecruit = true
    },

    cancelHandle() {
      this.visibleImport = this.visibleImportSettlement = this.visibleRecruit = this.visibleSquared = false
    },

    handleSuccess() {
      this.cancelHandle()
      this.$refs.tableSquared.refresh()
    },

    exportHandle() {
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/mg/exportGroupCountTemplateExcel`
    },
    exportHandle2() {
      window.location.href = `${process.env.VUE_APP_API_BASE_URL}/mg/exportBranchExcel`
    },
    exportListHandle() {
      switch (this.tabActiveKey) {
        case 'tab1':
          window.location.href = `${
            process.env.VUE_APP_API_BASE_URL
          }/mg/exportGroupLeaderMonthCommission?${qs.stringify(
            this.queryParams
          )}`
          break
        case 'tab2':
          window.location.href = `${
            process.env.VUE_APP_API_BASE_URL
          }/mg/exportCompanyMonthCommissionList?${qs.stringify(
            this.queryParams
          )}`
          break
        case 'tab3':
          window.location.href = `${
            process.env.VUE_APP_API_BASE_URL
          }/mg/exportAllOldTiktokLiveInfoList?${qs.stringify(this.queryParams)}`
          break
        case 'tab5':
          window.location.href = `${process.env.VUE_APP_API_BASE_URL}/operator/task/operatorMissionDown?${qs.stringify(this.queryParams)}`
          break
        default:
          break
      }
    },
    receiveParams(params) {
      this.queryParams = {
        ...this.queryParams,
        ...params
      }
    },
    disabledDate(time) {
      return time.valueOf() > Date.now() || time.valueOf() < new Date('2021-12')
    }
  },
  computed: {
    ...mapGetters(['permission'])
  }
}
</script>

<style lang="less" scoped>
@import '../index.less';
.btn-group {
  // margin-left: 12px;
  .ant-btn {
    height: 28px;
    outline: none;
    &:focus:not(.ant-btn-primary):not(.ant-btn-danger),
    .ant-btn:hover:not(.ant-btn-primary):not(.ant-btn-danger) {
      border: 1px solid;
      border-color: #d9d9d9;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>
<style lang="less" scoped>
.select-custom {
  position: relative;
  margin-left: 16px;
  margin-right: 10px;
  display: inline-block;
  line-height: 28px;
  border-radius: 2px;
  background: #f1eefc;
  padding: 0 12px;
  color: #755dd7;
  .company-select {
    width: 100%;
    height: 28px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  // .label {
  //   margin-right: 4px;
  // }
  /deep/ .ant-select-selection {
    min-width: 100px;
    height: 28px;
    top: 1px;
    .ant-select-selection__rendered {
      line-height: 28px;
    }
    .ant-select-arrow {
      right: 8px;
      top: 51%;
    }
  }
}
.extra-custom {
  display: flex;
  justify-content: space-between;
  padding: 24px;
  padding-top: 0;
}
@media screen and (max-width: 1250px) {
  .extra-custom {
    flex-direction: column;
    .right-con {
      margin-left: -5px;
      margin-top: 20px;
    }
  }
}
</style>
