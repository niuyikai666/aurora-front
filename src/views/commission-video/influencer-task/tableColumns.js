import { numberFormat } from '@/utils/util'
import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
const h = new Vue().$createElement
export const influencerColumns = [
  {
    title: '主播ID/昵称',
    dataIndex: 'nickName',
    customRender: (text, row, index) => {
      return (
        <div>
          <p style="margin:0">{row.platformCode}</p>
          <p style="margin:0">{row.nickName}</p>
        </div>
      )
    },
    fixed: 'left',
    width: 160
  },
  {
    title: (
      <div>
        <div>签约</div>
        <div>状态</div>
      </div>
    ),
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text !== null ? text.msg : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>任务</div>
        <div>类型</div>
      </div>
    ),
    dataIndex: 'missionType',
    customRender: (text, row, index) => {
      return text !== null ? text.msg : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>拉新开</div>
        <div>始时间</div>
      </div>
    ),
    dataIndex: 'startDate',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>拉新结</div>
        <div>束时间</div>
      </div>
    ),
    dataIndex: 'endDate',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>有效直</div>
        <div>播天数</div>
      </div>
    ),
    dataIndex: 'effectiveDay',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>有效直</div>
        <div>播时长</div>
      </div>
    ),
    dataIndex: 'effLiveDurationHour',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div class="txt-center">短视频</div>
        <div>投稿天数</div>
      </div>
    ),
    dataIndex: 'videoPublishDays',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>短视频</div>
        <div class="txt-center">条数</div>
      </div>
    ),
    dataIndex: 'videoCount',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>佣金</div>
        <div>比例</div>
      </div>
    ),
    dataIndex: 'commissionRate',
    customRender: (text, row, index) => {
      return text !== null ? text + '%' : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>礼物</div>
        <div class="txt-center">流水</div>
      </div>
    ),
    dataIndex: 'reward',
    sorter: true,
    customRender: (text, row, index) => {
      if (text === null) return '-'
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>主播任务</div>
        <div class="txt-center">奖励金额</div>
      </div>
    ),
    dataIndex: 'encourageReward',
    customRender: (text, row, index) => {
      if (text === null) return '-'
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    width: 150
  },
  {
    title: '讲师/比例',
    dataIndex: 'lectureName',
    customRender: (text, row, index) => {
      return `${text || '--'}${
        row.lachineId ? '/拉新 ' + row.lachineLecturerRatio : ''
      }${row.majorId ? '/存量 ' + row.majorLecturerRatio : ''}`
    },
    width: 150
  },
  {
    title: '签约人/比例',
    dataIndex: 'signEmpName',
    customRender: (text, row, index) => {
      return `${text || '--'}${
        row.lachineId ? '/拉新 ' + row.lachineSignRatio : ''
      }${row.majorId ? '/存量 ' + row.majorSignRatio : ''}`
    },
    width: 150
  },
  {
    title: '招募/比例',
    dataIndex: 'recruitName',
    customRender: (text, row, index) => {
      return `${text || '--'}${
        row.lachineId ? '/拉新 ' + row.lachineRecruitRatio : ''
      }${row.majorId ? '/存量 ' + row.majorRecruitRatio : ''}`
    },
    width: 150
  },
  {
    title: '运营/比例',
    dataIndex: 'operatorName',
    customRender: (text, row, index) => {
      return `${text || '--'}${
        row.lachineId ? '/拉新 ' + row.lachineOperatorRatio : ''
      }${row.majorId ? '/存量 ' + row.majorOperatorRatio : ''}`
    },
    width: 150
  },
  {
    title: '小组/比例',
    dataIndex: 'groupName',
    customRender: (text, row, index) => {
      return `${text || '--'}${
        row.lachineId ? '/拉新 ' + row.lachineGroupRatio : ''
      }${row.majorId ? '/存量 ' + row.majorGroupRatio : ''}`
    },
    width: 150
  },
  {
    title: '分公司/比例',
    dataIndex: 'companyName',
    customRender: (text, row, index) => {
      return `${text || '--'}${
        row.lachineId ? '/拉新 ' + row.lachineCompanyRatio : ''
      }${row.majorId ? '/存量 ' + row.majorCompanyRatio : ''}`
    },
    width: 150
  }
]
export const myInfluencerColumns = [
  {
    title: '主播ID/昵称',
    dataIndex: 'nickName',
    customRender: (text, row, index) => {
      return (
        <div>
          <p style="margin:0">{row.platformCode}</p>
          <p style="margin:0">{row.nickName}</p>
        </div>
      )
    },
    fixed: 'left',
    width: 160
  },
  {
    title: (
      <div>
        <div>签约</div>
        <div>状态</div>
      </div>
    ),
    dataIndex: 'signMethod',
    customRender: (text, row, index) => {
      return text !== null ? text.msg : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>任务</div>
        <div>类型</div>
      </div>
    ),
    dataIndex: 'missionType',
    customRender: (text, row, index) => {
      return text !== null ? text.msg : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>拉新开</div>
        <div>始时间</div>
      </div>
    ),
    dataIndex: 'startDate',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>拉新结</div>
        <div>束时间</div>
      </div>
    ),
    dataIndex: 'endDate',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>有效直</div>
        <div>播天数</div>
      </div>
    ),
    dataIndex: 'effectiveDay',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>有效直</div>
        <div>播时长</div>
      </div>
    ),
    dataIndex: 'effLiveDurationHour',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div class="txt-center">短视频</div>
        <div>投稿天数</div>
      </div>
    ),
    dataIndex: 'videoPublishDays',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>短视频</div>
        <div class="txt-center">条数</div>
      </div>
    ),
    dataIndex: 'videoCount',
    customRender: (text, row, index) => {
      return text !== null ? text : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>佣金</div>
        <div>比例</div>
      </div>
    ),
    dataIndex: 'commissionRate',
    customRender: (text, row, index) => {
      return text !== null ? text + '%' : '-'
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>礼物</div>
        <div class="txt-center">流水</div>
      </div>
    ),
    dataIndex: 'reward',
    sorter: true,
    customRender: (text, row, index) => {
      if (text === null) return '-'
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    width: 150
  },
  {
    title: (
      <div>
        <div>主播任务</div>
        <div class="txt-center">奖励金额</div>
      </div>
    ),
    dataIndex: 'encourageReward',
    customRender: (text, row, index) => {
      if (text === null) return '-'
      return numberFormat(text) + (text > 10000 ? '万' : '')
    },
    width: 150
  },
  {
    title: '讲师/比例',
    dataIndex: 'lectureName',
    customRender: (text, row, index) => {
      return `${text || '--'}${
        row.lachineId ? '/拉新 ' + row.lachineLecturerRatio : ''
      }${row.majorId ? '/存量 ' + row.majorLecturerRatio : ''}`
    },
    width: 150
  },
  {
    title: '签约人/比例',
    dataIndex: 'signEmpName',
    customRender: (text, row, index) => {
      return `${text || '--'}${
        row.lachineId ? '/拉新 ' + row.lachineSignRatio : ''
      }${row.majorId ? '/存量 ' + row.majorSignRatio : ''}`
    },
    width: 150
  },
  {
    title: '招募/比例',
    dataIndex: 'recruitName',
    customRender: (text, row, index) => {
      return `${text || '--'}${
        row.lachineId ? '/拉新 ' + row.lachineRecruitRatio : ''
      }${row.majorId ? '/存量 ' + row.majorRecruitRatio : ''}`
    },
    width: 150
  },
  {
    title: '运营/比例',
    dataIndex: 'operatorName',
    customRender: (text, row, index) => {
      return `${text || '--'}${
        row.lachineId ? '/拉新 ' + row.lachineOperatorRatio : ''
      }${row.majorId ? '/存量 ' + row.majorOperatorRatio : ''}`
    },
    width: 150
  },
  {
    title: '小组',
    dataIndex: 'groupName',
    customRender: (text, row, index) => {
      return `${text || '--'}`
    },
    width: 150
  },
  {
    title: '分公司',
    dataIndex: 'companyName',
    customRender: (text, row, index) => {
      return `${text || '--'}`
    },
    width: 150
  }
]
