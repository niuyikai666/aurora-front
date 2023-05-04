import { numberFormat } from '@/utils/util'
import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
const h = new Vue().$createElement
export const videoTaskColumns = [
  {
    title: '年月',
    dataIndex: 'monthDate',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    fixed: 'left'
  },
  {
    title: '分公司',
    dataIndex: 'companyName',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '小组',
    dataIndex: 'groupName',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: (
      <div>
        <div>专业主播</div>
        <div>进阶任务</div>
      </div>
    ),
    dataIndex: 'majorAdvanced',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: (
      <div>
        <div>拉新主播</div>
        <div>进阶任务</div>
      </div>
    ),
    dataIndex: 'lachineAdvanced',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '流水增长任务',
    dataIndex: 'rewardIncrease',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: (
      <div>
        <div>是否豁免专业</div>
        <div>主播进阶任务</div>
      </div>
    ),
    dataIndex: 'exemptionMajorAdvanced',
    customRender: (text, row, index) => {
      return text !== null ? (text ? '是' : '否') : '-'
    }
  },
  {
    title: (
      <div>
        <div>是否豁免拉新</div>
        <div>主播进阶任务</div>
      </div>
    ),
    dataIndex: 'exemptionLachineAdvanced',
    customRender: (text, row, index) => {
      return text !== null ? (text ? '是' : '否') : '-'
    }
  },
  {
    title: (
      <div>
        <div style="text-align:center">是否豁免</div>
        <div>流水增长任务</div>
      </div>
    ),
    dataIndex: 'exemptionRewardIncrease',
    customRender: (text, row, index) => {
      return text !== null ? (text ? '是' : '否') : '-'
    }
  }
]
export const pullTaskColumns = [
  {
    title: '年月',
    dataIndex: 'monthDate',
    fixed: 'left'
  },
  {
    title: '有效直播天数',
    dataIndex: 'effectDay',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '有效直播时长(小时)',
    dataIndex: 'effLiveDurationHour',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    dataIndex: 'action',
    width: 120,
    fixed: 'right',
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]
export const TaskTypeColumns = [
  {
    title: '主播ID',
    dataIndex: 'platformCode',
    fixed: 'left'
  },
  {
    title: '主播昵称',
    dataIndex: 'nickName',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '拉新任务类型',
    dataIndex: 'missionType',
    customRender: (text, row, index) => {
      return text !== null ? text.msg : '-'
    }
  },
  {
    title: '拉新开始时间',
    dataIndex: 'startDate',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '拉新结束时间',
    dataIndex: 'endDate',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  }
]
export const dataInfoColumns = [
  {
    title: '主播ID',
    dataIndex: 'platformCode',
    fixed: 'left',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '主播昵称',
    dataIndex: 'nickName',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '是否达标娱乐专业主播',
    dataIndex: 'isMajorStand',
    customRender: (text, row, index) => {
      return text !== null ? (text ? '是' : '否') : '-'
    }
  },
  {
    title: (
      <div>
        <div>娱乐有效直播</div>
        <div>时长（小时）</div>
      </div>
    ),
    dataIndex: 'liveDurationHour',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: (
      <div>
        <div>娱乐有效</div>
        <div>直播天数</div>
      </div>
    ),
    dataIndex: 'effectDay',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: (
      <div>
        <div class="txt-center">短视频</div>
        <div>发布天数</div>
      </div>
    ),
    dataIndex: 'videoDayCount',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: (
      <div>
        <div class="txt-center">短视频条数</div>
        <div>（播放量100以上）</div>
      </div>
    ),
    dataIndex: 'videoCount',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  }
]
export const dayDataColumns = [
  {
    title: '数据日期',
    dataIndex: 'dateTime',
    fixed: 'left'
  },
  {
    title: '主播ID',
    dataIndex: 'platformCode',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '主播昵称',
    dataIndex: 'nickName',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '发表次数',
    dataIndex: 'videoPublishCount',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '浏览次数',
    dataIndex: 'browseCount',
    customRender: (text, row, index) => {
      if (text === null) return '-'
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '点赞次数',
    dataIndex: 'likesCount',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    }
  },
  {
    title: '评论次数',
    dataIndex: 'commentsCount',
    customRender: (text, row, index) => {
      if (text === null) return '-'
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '分享次数',
    dataIndex: 'sharedCount',
    customRender: (text, row, index) => {
      if (text === null) return '-'
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  },
  {
    title: '星标次数',
    dataIndex: 'collectCount',
    customRender: (text, row, index) => {
      if (text === null) return '-'
      return numberFormat(text) + (text > 10000 ? '万' : '')
    }
  }
]
