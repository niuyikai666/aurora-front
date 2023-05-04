<template>
  <a-card
    class="card-content card-title-normal"
    :bordered="false"
    :loading="loading"
  >
    <div slot="title">
      任务进度
      <a-button-group class="btn-group">
        <a-button
          v-for="(item, index) in tabs"
          :key="index"
          :class="{'active': activeIndex === index}"
          @click="tabChange(index)"
        >{{ tabs[index].text }}</a-button>
      </a-button-group>
    </div>
    <template slot="extra">
      <a-button-group class="btn-group btn-group-extra">
        <a-button :class="{'active': activeTimeIndex === 0}" @click="change(0)">{{ timeRange[0].text }}</a-button>
        <a-button :class="{'active': activeTimeIndex === 1}" @click="change(1)">{{ timeRange[1].text }}</a-button>
        <a-month-picker v-model="timeRange[2].value" :disabled-date="disabledDate" value-format="YYYY-MM" @change="changeTime">
          <a-button ref="btnGroup" :class="{'active': activeTimeIndex === 2}">{{ timeRange[2].text }}</a-button>
        </a-month-picker>
      </a-button-group>
      <a-input class="search" ref="userNameInput" v-model="nickname" @pressEnter="searchHandle" placeholder="请输入主播昵称或ID">
        <a-icon slot="suffix" type="search" />
      </a-input>

      <div class="cascader-custom" style="margin-left:16px; top:-1px;">
        <span class="tit">完成进度:</span>
        <span class="select-name">{{ processName }} <a-icon class="antion-custom" type="down" /></span>
        <a-select
          style="width: 110px;"
          v-model="queryParams.level"
          @change="processHandle"
        >
          <a-select-option v-for="(item, index) in processData" :key="index" :value="item.value">
            {{ item.text }}
          </a-select-option>
        </a-select>
      </div>
      <a style="margin-left: 16px" :href="downloadUrl" v-if="type !== 'operate'">
        <a-button style="height: 28px;" type="primary">
          <svg-icon class="icon aciton-icon-com" icon-class="export-icon"/>
          导出
        </a-button>
      </a>
    </template>

    <div>
      <table-comp
        :isOperate="isOperate"
        :tabType="queryParams.type"
        :params="queryParams"
        @getDownloadUrl="getDownloadUrlHandle"
        :tableFunc="tableFunc"
        :downUrl="downUrl"
      />
    </div>
  </a-card>
</template>

<script>
import moment from 'moment'
import TableComp from './TableComp'

export default {
  name: 'ToalComp',
  components: {
    TableComp
  },
  props: {
    tableFunc: {
      type: Function,
      default: null
    },
    tabFunc: {
      type: Function,
      default: null
    },
    downUrl: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    id: {
      type: [Number, String, Object],
      default: null
    },
    isOperate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      loading: false,
      downloadUrl: '',

      nickname: '',
      queryParams: {
        monthCycle: '',
        type: 1,
        nickname: '',
        level: '',
        departmentId: ''
      },

      activeIndex: 0,
      tabs: [
        {
          text: '进行中',
          value: 1
        },
        {
          text: '未开始',
          value: 2
        },
        {
          text: '周期结束',
          value: 3
        },
        {
          text: '作弊主播',
          value: 4
        },
        {
          text: '拉新任务结束',
          value: 4
        }
      ],

      activeTimeIndex: null,
      timeRange: [
        {
          text: '本月',
          value: moment().format('YYYY-MM')
        },
        {
          text: '上月',
          value: moment(new Date()).subtract(1, 'months').format('YYYY-MM')
        },
        {
          text: '自定义',
          value: undefined
        }
      ],
      monthDate: '',

      processName: '全部',
      processData: [
        {
          text: '全部',
          value: ''
        },
        {
          text: '已完成第一档',
          value: 1
        },
        {
          text: '已完成第二档',
          value: 2
        },
        {
          text: '已完成第三档',
          value: 3
        },
        {
          text: '未完成',
          value: 0
        }
      ]
    }
  },
  mounted () {
    this.getNewTaskTabCountHandle()
  },
  methods: {
    getNewTaskTabCountHandle () {
      this.tabFunc(this.queryParams).then(res => {
        const tabs = [
          {
            text: `进行中 ${res.onGoingCount}`,
            value: 1
          },
          {
            text: `未开始 ${res.unPlayCount}`,
            value: 2
          },
          {
            text: `周期结束 ${res.finishedCount}`,
            value: 3
          },
          {
            text: `作弊主播 ${res.isCheatingCount}`,
            value: 4
          },
          {
            text: `拉新任务结束 ${res.endCount}`,
            value: 5
          }
        ]
        this.tabs = tabs
      })
    },
    getData () {
      // getNewTaskTabCount()
    },

    tabChange (index) {
      this.activeIndex = index
      this.queryParams.type = this.tabs[this.activeIndex].value
    },

    searchHandle () {
      this.queryParams.nickname = this.nickname
    },

    processHandle (value) {
      const data = this.processData.filter(item => item.value === value)[0]
      this.processName = data.text
    },

    change (index) {
      if (this.activeTimeIndex === index) {
        this.activeTimeIndex = null
        this.queryParams.monthCycle = ''
      } else {
        this.activeTimeIndex = index
        this.queryParams.monthCycle = this.timeRange[this.activeTimeIndex].value
      }
    },
    changeTime (date) {
      this.activeTimeIndex = 2
      if (this.monthDate !== '' && this.monthDate === date) {
        this.monthDate = ''
        this.queryParams.monthCycle = ''
        this.activeTimeIndex = null
      } else {
        this.monthDate = date
        this.queryParams.monthCycle = this.timeRange[this.activeTimeIndex].value
      }
    },
    getDownloadUrlHandle (url) {
      this.downloadUrl = url
    },
    disabledDate (time) {
      return time.valueOf() > Date.now() || time.valueOf() < new Date('2021-12')
    }
  },

  watch: {
    queryParams: {
      handler (val) {
        this.getNewTaskTabCountHandle()
      },
      deep: true
    },
    id: {
      handler (val) {
        this.queryParams.departmentId = val
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
  .btn-group-extra,
  .search {
    float: left;
  }
  .search {
    width: 180px;
    margin-left: 16px;
    /deep/ .ant-input {
      height: 28px;
    }
  }
  .btn-group {
    margin-left: 12px;
    .ant-btn {
      height: 28px;
      outline: none;
      &:focus:not(.ant-btn-primary):not(.ant-btn-danger), .ant-btn:hover:not(.ant-btn-primary):not(.ant-btn-danger) {
        border: 1px solid;
        border-color: #d9d9d9;
        color:rgba(0, 0, 0, 0.65);
      }
    }
  }
  .static-content {
    display: flex;
    /deep/ .ant-statistic {
      position: relative;
      margin-right: 18px;
      &:last-child {
        &::after {
          display: none;
        }
      }
      &::after {
        display: flex;
        position: absolute;
        right: 0;
        top: 0;
        content: '';
        height: 100%;
        border-right: solid 1px rgba(0, 0, 0, 1);
        opacity: 0.06;
      }
      flex: 1;
      .ant-statistic-title {
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
      }
      .ant-statistic-content {
        font-weight: 500;
        font-size: 28px;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
  .cascader-custom {
    background-color: rgba(241, 238, 252, 1);
    height: 28px;
    line-height: 26px;
    padding: 0 12px;
  }

  @media (max-width: 1500px) {
    .card-content {
      /deep/ .ant-card-head-wrapper {
        flex-direction: column;
        align-items: flex-start;
        .ant-card-extra {
          float: left;
          margin: 0;
          margin-left: -10px;
        }
      }
    }
  }
</style>
