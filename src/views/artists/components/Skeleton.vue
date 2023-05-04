<template>
  <div class="ske-content">
    <div class="s-con">
      <div class="rightAngle-trapezoid-box">
        <div class="rightAngle-trapezoid"></div>
        <div class="box">
          <p class="tit">曝光展现</p>
          <p class="count">{{ data[0] ? numberFormat(data[0].value) : 0 }} {{ data[0] && data[0].value > 10000 ? '万人' : '人' }}</p>
        </div>
      </div>
      <div class="rightAngle-trapezoid-box">
        <div class="rightAngle-trapezoid rightAngle-trapezoid2"></div>
        <div class="box box2">
          <p class="tit">进入直播间</p>
          <p class="count">{{ data[0] ? numberFormat(data[1].value) : 0 }} {{ data[0] && data[1].value > 10000 ? '万人' : '人' }} </p>
        </div>
      </div>
      <div class="rightAngle-trapezoid-box">
        <div class="rightAngle-trapezoid rightAngle-trapezoid3"></div>
        <div class="box box3">
          <p class="tit">打赏送礼</p>
          <p class="count">{{ data[0] ? numberFormat(data[2].value) : 0 }} {{ data[0] && data[2].value > 10000 ? '万人' : '人' }} </p>
        </div>
      </div>
    </div>
    <div class="arrow"></div>
    <div class="prop-content">
      <div class="item">
        <p class="title">转化率</p>
        <p class="res">{{ data[0] && data[0].value !== 0 ? ((data[1].value / data[0].value) * 100).toFixed(2) : 0 }}%</p>
      </div>
      <div class="item">
        <p class="title">转化率</p>
        <p class="res">{{ data[1] && data[1].value !== 0 ? ((data[2].value / data[1].value) * 100).toFixed(2) : 0 }}%</p>
      </div>
    </div>
  </div>
</template>

<script>
import { numberFormat } from '@/utils/util'

export default {
  name: 'SkelentonComp2',
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      numberFormat
    }
  }
}
</script>

<style lang="less" scoped>
  .ske-content {
    position: relative;
    .arrow {
      position: absolute;
      left: 365px;
      top: 43px;
      width: 32px;
      height: 226px;
      background: url('~@/assets/arrow.png') no-repeat;
      background-size: 100% 100%;
    }
    .prop-content {
      position: absolute;
      left: 425px;
      top: 0;
      .item {
        margin-top: 75px;
        text-align: center;
        p {
          margin-bottom: 0;
        }
        .res {
          color: #000;
          font-weight: 700;
        }
      }
    }
  }
  .s-con {
    width: 365px;
  }
  .rightAngle-trapezoid-box {
    margin-top: 10px;
    position: relative;
    width: 350px;
    height: 94px;
    .box {
      position: absolute;
      display: flex;
      width: 100%;
      height: 100%;
      right: 0;
      top: 0;
      z-index: 11;
      align-items: center;
      padding: 15px 30px 0 40px;
      .tit {
        flex: 1;
        text-align: left;
        font-size: 14px;
        color: #54575d;
      }
      .count {
        flex: 1;
        text-align: right;
        font-size: 14px;
        color: #000;
        font-weight: 700;
      }
    }
    .box2 {
      width: 318px;
    }
    .box3 {
      width: 285px;
    }
  }
  .rightAngle-trapezoid {
    position: absolute;
    top: 0;
    right: 0;
    width: 350px;
    float: right;
    height: 0;
    border-left: 30px solid transparent;
    border-top: 94px solid #f6f8ff;
    z-index: 10;
  }
  .rightAngle-trapezoid2 {
    width: 318px;
    border-top: 94px solid #e5e8fe;
  }
  .rightAngle-trapezoid3 {
    width: 285px;
    border-top: 94px solid #d4dafd;
  }
</style>
