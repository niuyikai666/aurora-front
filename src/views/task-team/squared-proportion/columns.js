// import { amountFormat } from '@/utils/util'
import Vue from 'vue'
// eslint-disable-next-line no-unused-vars
const h = new Vue().$createElement

export const columns = [
  {
    title: '主播',
    dataIndex: 'nickName',
    scopedSlots: { customRender: 'nickName' }
  },
  {
    title: '分成比(%)',
    dataIndex: 'splitRatio',
    customRender: (text, row, index) => {
      return text !== null ? text : '--'
    }
  },
  {
    title: (
      <div>
        <div style="text-align:center">主播分成比例(%)</div>
        <div>(主持位流水)</div>
      </div>
    ),
    dataIndex: 'compereActorCommissionRation',
    customRender: (text, row, index) => {
      return text !== null ? (Number(text) * 100).toFixed(2) : '--'
    }
  },
  {
    title: (
      <div>
        <div style="text-align:center">主播分成比例(%)</div>
        <div>(嘉宾流水)</div>
      </div>
    ),
    dataIndex: 'guestActorCommissionRation',
    customRender: (text, row, index) => {
      return text !== null ? (Number(text) * 100).toFixed(2) : '--'
    }
  },
  {
    title: (
      <div>
        <div style="text-align:center">运营分成比例(%)</div>
        <div>(主持位流水)</div>
      </div>
    ),
    dataIndex: 'compereOperatorCommissionRation',
    customRender: (text, row, index) => {
      return text !== null ? (Number(text) * 100).toFixed(2) : '--'
    }
  },
  {
    title: (
      <div>
        <div style="text-align:center">运营分成比例(%)</div>
        <div>(嘉宾流水)</div>
      </div>
    ),
    dataIndex: 'guestOperatorCommissionRation',
    customRender: (text, row, index) => {
      return text !== null ? (Number(text) * 100).toFixed(2) : '--'
    }
  },
  {
    title: (
      <div>
        <div style="text-align:center">招募分成比例(%)</div>
        <div>(主持位流水)</div>
      </div>
    ),
    dataIndex: 'compereRecruitCommissionRation',
    customRender: (text, row, index) => {
      return text !== null ? (Number(text) * 100).toFixed(2) : '--'
    }
  },
  {
    title: (
      <div>
        <div style="text-align:center">招募分成比例(%)</div>
        <div>(嘉宾流水)</div>
      </div>
    ),
    dataIndex: 'guestRecruitCommissionRation',
    customRender: (text, row, index) => {
      return text !== null ? (Number(text) * 100).toFixed(2) : '--'
    }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
    width: 100
  }
]
