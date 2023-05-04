<template>
  <div>
    <div class="top-bar">
      <div class="title-con">
        <div class="title">拉新任务-2022年后入会主播</div>
        <div class="crip">数据截止至{{ endTime || '--' }}</div>
        <rule-comp />
        <!-- <a-popover placement="bottom">
          <template slot="content">
            <div class="index-crip-content" style="width: 800px;">
              <p class="title">规则说明</p>
              <dl class="list">
                <dt style="font-weight:500;">拉新任务说明</dt>
                <dd>2022年首次加入公会主播进后台首播之日起分为三个周期，分别为“首播第 1-30 天”、“首播第 31-60 天”、“首播第 61 天-90 天”，各周期内单独考核。</dd>
                <dd>
                  <div class="table-excel normal">
                    <a-row>
                      <a-col :span="6">拉新任务周期(各周期独立)</a-col>
                      <a-col :span="6">拉新任务要求1</a-col>
                      <a-col :span="6">拉新任务要求2</a-col>
                      <a-col :span="6">各级管理提成奖励增幅</a-col>
                    </a-row>
                    <a-row>
                      <a-col :span="6" style="padding: 0 5px;">
                        <a-row>
                          <a-col :span="24" class="br0 bt0">第一周期(首播第1-30天)</a-col>
                          <a-col :span="24" class="br0 bt0">第二周期(首播第31-60天)</a-col>
                          <a-col :span="24" class="bt0">第三周期(首播第61-90天)</a-col>
                        </a-row>
                      </a-col>
                      <a-col :span="6" style="padding: 0 5px;">
                        <a-row>
                          <a-col :span="24" class="br0 bt0"></a-col>
                          <a-col :span="24" class="br0 bt0">开播有效天>=14且时长>=45小时</a-col>
                          <a-col :span="24" class="br0 bt0"></a-col>
                        </a-row>
                      </a-col>
                      <a-col :span="6">
                        <a-row>
                          <a-col :span="24" class="br0" style="padding: 0 5px;">1000 元≤周期内收益＜5000 元</a-col>
                          <a-col :span="24" class="br0" style="padding: 0 5px;">5000 元≤周期内收益＜10000 元</a-col>
                          <a-col :span="24" class="bt0" style="padding: 0 5px;">10000 元≤周期内收益</a-col>
                        </a-row>
                      </a-col>
                      <a-col :span="6">
                        <a-row>
                          <a-col :span="24" class="br0" style="padding: 0 5px;">30%【基础提成比例*（1+30%）】</a-col>
                          <a-col :span="24" class="br0" style="padding: 0 5px;">60% 【基础提成比例*（1+60%）】</a-col>
                          <a-col :span="24" class="bt0" style="padding: 0 5px;">100% 【基础提成比例*（1+100%）】</a-col>
                        </a-row>
                      </a-col>
                    </a-row>
                  </div>
                </dd>
                <div class="dd-con">
                  <dd>1. 拉新任务要求1和拉新任务要求2需同时完成才能获得对应的奖励比例，每个周期三个档次。</dd>
                  <dd>2.各级管理“基础提成比例”根据对应任务完成情况确定。</dd>
                  <dd>3.结算周期：按照拉新各周期结束日期所在月进行结算，若主播第一周期结束日期为本月15日，次月初出结算单，则次月25日发放该主播第一周期的提成。</dd>
                  <dd>4.若主播各拉新任务周期内上述任务要求均未满足，则按照“基础提成比例”，无奖励提成。</dd>
                  <dd>5.单主播每个拉新任务周期内的封顶流水为 133 万元，超过部分只按照“基础提成比例”发放各级管理提成（无增幅）。</dd>
                </div>
                <dt style="font-weight:500;">拉新主播佣金发放规则</dt>
                <dd>抖音签约拉新阶段主播三个拉新周期内，各周期完成“45小时、14有效天，1万元以上自营收”补发5%，未达成则主播不补发，三个拉新周期结束后恢复成存量主播模式。</dd>
                <dd>若拉新第三周期在月中结束，则拉新结束后至该月最后一日按照自然月基线-进阶任务数据计算主播佣金发放比例，流水按照时间断计入对应的任务。</dd>
                <dt style="font-weight:500;">拉新作弊主播管理提成及主播佣金</dt>
                <dd>判定作弊的主播无管理提成，请及时进行申诉或者选择不申诉；</dd>
                <dd>申诉失败或者选择不申诉，当日起主播任务变更为基线-进阶任务，自然月数据都计入基线-进阶任务；</dd>
                <dd>申诉成功则继续参加拉新任务。</dd>、
              </dl>
            </div>
          </template>
          <a-button type="link">规则说明</a-button>
        </a-popover> -->
      </div>
      <div class="sub-title">拉新任务周期共计3个周期，按照“首播第1-30天”、“首播第31-60天”、“首播第61-90天”，主播流水不同档位，给予差异化提成比例奖励</div>
    </div>
    <div style="margin-top: 24px;">
      <total-comp @getTime="getTimeHandle" />
    </div>
    <!-- <div style="margin-top: 24px;">
      <static-comp />
    </div> -->
    <div style="margin-top: 24px;">
      <show-comp :tableFunc="getNewTaskList" :isOperate="true" :tabFunc="getNewTaskTabCount" :downUrl="downloadUrl" type="operate"/>
    </div>
  </div>
</template>

<script>
import TotalComp from './components/TotalComp'
import StaticComp from './components/StaticComp'
import ShowComp from './components/ShowComp'
import RuleComp from './components/RuleComp'
import { getNewTaskList, getNewTaskTabCount } from '@/api/task'

export default {
  name: 'Salary',
  components: {
    TotalComp,
    StaticComp,
    ShowComp,
    RuleComp
  },
  data () {
    return {
      getNewTaskTabCount,
      getNewTaskList,
      endTime: '',
      downloadUrl: '/lachine/list/export'
    }
  },
  mounted () {
  },
  methods: {
    getTimeHandle (time) {
      this.endTime = time
    }
  }
}
</script>
