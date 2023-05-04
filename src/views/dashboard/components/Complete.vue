<template>
  <a-row class="row process-content">
    <a-col class="title">{{ staticData.targetName }}</a-col>
    <a-col class="progress">
      <div class="pro-bg-content">
        <div class="pro-dot" :class="{'active': item <= staticData.currentValue}" v-for="(item, index) in staticData.stageList" :key="index" :style="{left: positHandle(item) + '%'}">
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ amountFormat(item) }}</span>
            </template>
            <div class="tip"></div>
          </a-tooltip>
        </div>
        <!-- <div class="finished-bg" :style="{width: finishedProgress + '%'}"></div> -->
        <a-progress class="finished-bg" :strokeColor="strokeColor" :percent="parseInt(finishedProgress)" :showInfo="false" status="active" />
        <div class="smile" :class="{'finish': staticData.currentValue > staticData.stageList[0]}" :style="{left: finishedProgressCompute + '%'}">
          <a-tooltip placement="top">
            <template slot="title">
              <span>{{ amountFormat(staticData.currentValue) }}</span>
            </template>
            <div class="tip tip2"></div>
          </a-tooltip>
        </div>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { amountFormat } from '@/utils/util'

export default {
  name: 'Task',
  props: {
    staticData: {
      type: Object,
      default: null
    },
    proIndex: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      amountFormat,
      finishedProgress: 0,
      indexData: {
        1: '一',
        2: '二',
        3: '三',
        4: '四',
        5: '五'
      },
      strokeColor: {
        from: '#a899eb',
        to: '#7f6ed6'
      }
    }
  },
  mounted () {
    const value = (this.staticData.currentValue / this.staticData.stageList[this.staticData.stageList.length - 1] - 0.01) * 100
    setTimeout(() => {
      this.finishedProgress = value >= 100 ? 100 : value
    }, 200)
  },
  methods: {
    positHandle (value) {
      return (value / this.staticData.stageList[this.staticData.stageList.length - 1] - 0.01) * 100
    }
  },
  computed: {
    finishedProgressCompute () {
      return this.finishedProgress >= 99 ? this.finishedProgress - 1.2 : this.finishedProgress - 0.4
      // if (this.finishedProgress > 2) {
        // return this.finishedProgress - 1.3
      // } else {
      //   return 0
      // }
    }
  }
}
</script>

<style lang="less" scoped>
  // .row {
  //   align-items: center;
  //   margin-top: 26px;
  //   .title {
  //     flex: 0 0 70px;
  //     color: #262626;
  //   }
  //   .progress {
  //     flex: 1 1 auto;
  //   }
  // }
  .process-content {
    display: flex;
    margin-top: 24px;
    .title {
      margin-right: 25px;
    }
    .progress {
      flex: 1;
    }
  }
  .pro-bg-content {
    position: relative;
    height: 6px;
    border-radius: 3.5px;
    background-color: #EBEEF5;
    .pro-dot {
      position: absolute;
      width: 10px;
      height: 10px;
      top: -2px;
      right: 2px;
      border: solid 2px #D2D5DA;
      border-radius: 50%;
      background-color: #fff;
      z-index: 2;
      &.active {
        border-color: #755DD7;
      }
    }
    .tip {
      position: relative;
      left: -2px;
      top: -2px;
      width: 10px;
      height: 10px;
      background-color: #f00;
      opacity: 0;
      cursor: pointer;
      &.tip2 {
        width: 24px;
        height: 24px;
      }
    }
    .finished-bg {
      position: absolute;
      top: -9px;
      // height: 6px;
      // width: 0;
      // border-radius: 3.5px;
      // background-color: #755DD7;
      // z-index: 1;
      // transition: all 1s ease;
    }
    .smile {
      position: absolute;
      left: 0;
      top: -10px;
      display: block;
      content: '';
      width: 24px;
      height: 24px;
      background: url('../../../assets/dashboard/smile_1.png') no-repeat;
      background-size: 100% 100%;
      z-index: 5;
      transition: all .3s ease;
      &.finish {
        background: url('../../../assets/dashboard/smile_2.png') no-repeat;
        background-size: 100% 100%;
      }
    }
  }
</style>
