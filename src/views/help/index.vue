<template>
  <div class="container">
    <div class="top-content">
      <a-row :gutter="24">
        <a-col :sm="24" :md="8">
          <div class="top-left">
            <h3>帮助中心</h3>
            <p>极光致力为无忧的同学建设简单易用的运营业务支持平台，在这里希望能解决您日常使用系统的常见问题。</p>
          </div>
        </a-col>
        <a-col :sm="24" :md="16">
          <div class="img-cont">
            <img src="@/assets/help_bg.png" alt="">
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="help-content">
      <a-row :gutter="24">
        <a-col :sm="24">
          <div class="anchor-content">
            <div class="anchor-left">
              <a-anchor :target-offset="targetOffset">
                <a-anchor-link href="#anchor-data" title="关于数据" />
                <a-anchor-link href="#anchor-opt" title="关于操作" />
                <a-anchor-link href="#anchor-record" title="版本迭代记录" />
              </a-anchor>
            </div>
            <div class="anchor-right">
              <div id="anchor-data" class="description">
                <h3>关于数据</h3>
                <tab-content title="数据字段" :titleLine="true">
                  <a-table
                    class="table"
                    :columns="columns"
                    row-key="field"
                    :data-source="columusData"
                    :pagination="false"
                  >
                    <template slot="static" slot-scope="text, record">
                      <span v-if="record.static.includes(';')">
                        <p>{{ record.static.slice(0, record.static.indexOf(';')) }}</p>
                        <p>{{ record.static.slice(record.static.indexOf(';'), record.static.length).replace(';', '') }}</p>
                      </span>
                      <span v-else>
                        {{ record.static }}
                      </span>
                    </template>
                  </a-table>
                </tab-content>
                <tab-content title="数据时效" :titleLine="true">
                  <info title="工作台:" value="默认显示最新一日数据，13:00左右更新显示昨日数据" />
                  <info title="艺人管理:" value="默认显示最新一日数据，13:00左右更新显示昨日数据" />
                  <info title="后台艺人资源管理:" value="全量历史入库艺人" />
                </tab-content>
                <tab-content title="数据偏差" :titleLine="true">
                  <info title="主播数量:" value="极光系统每日都会入库艺人数据，由于目前系统暂未将艺人资源管理+无运营主播管理中的退会主播去重，会出现艺人资源管理+无运营主播管理>公会总主播数的情况，待后续版本更新迭代后可准确对应主播数量。" />
                </tab-content>
              </div>

              <div id="anchor-opt" class="description" style="margin-top:30px;">
                <h3>关于操作</h3>
                <tab-content title="我能用极光做什么？" :titleLine="true">
                  <info title="直播运营:" value="监测运营艺人的每日直播流水。" />
                  <info title="直播运营组长:" value="监测全组的主播运营情况，查看数据报表。 " />
                  <info title="直播数据运营:" value="查看直播数据报表，监测数据趋势，根据需要导出数据。" />
                  <info title="管理员:" value="管理极光系统的账号和账号权限。" />
                </tab-content>
                <tab-content title="如何设置直播运营的绑定关系？" :titleLine="true">
                  <info value="极光系统中一个艺人对应一个运营，后续用运营关系统计各个部门的汇总数据。 " />
                  <info value="管理员可在【公会经纪人管理】中将公会后台的主播经纪人关系绑定到极光系统账号上，实现数据同步； " />
                  <info value="可在【无运营主播管理】中将系统中没有绑定关系的设置运营； " />
                  <info value="可在【艺人资源管理】中将系统中修改运营关系。" />
                </tab-content>
              </div>

              <div id="anchor-record" class="description" style="margin-top:30px;">
                <h3>版本迭代记录</h3>
                <tab-content title="1.4.0" :titleLine="true">
                  <info value="· 新增运营提醒功能(断播、生日、开播)" />
                  <info value="· 支持自动同步公会经纪人运营关系" />
                  <info value="· 管理员权限优化" />
                  <info value="· 数据报表优化" />
                </tab-content>
                <tab-content title="1.3.1" :titleLine="true">
                  <info value="· 数据报表下钻至运营人" />
                  <info value="· 新增主播信息维护字段" />
                  <info value="· 优化数据更新时效" />
                  <info value="· 优化数据报表显示" />
                  <info value="· 一些数据字段的优化" />
                  <info value="· 修复已知bug" />
                </tab-content>
                <tab-content title="1.3" :titleLine="true">
                  <info value="· 艺人管理列表新增筛选器功能，可多条件筛选搜索艺人" />
                  <info value="· 艺人管理新增导出功能" />
                  <info value="· 管理后台新增退会标记和退会列表" />
                  <info value="· 一些数据字段的优化" />
                  <info value="· 修复已知bug" />
                </tab-content>
                <tab-content title="1.2" :titleLine="true">
                  <info value="· 新增退会主播列表，可通过该列表查询退会主播" />
                  <info value="· 新增「工作台」数据显示逻辑，可以在工作台查看最新一天的直播数据" />
                  <info value="· 合同管理中新增“签约姓名”" />
                  <info value="· 全局主播相关数据列表新增“抖音号（原）”字段，且提供筛选" />
                  <info value="· 一些已知问题优化" />
                </tab-content>
                <tab-content title="1.1" :titleLine="true">
                  <info value="· 新增数据报表功能模块，可根据组织统计直播数据 " />
                  <info value="· 新增反馈板，可在「首页」顶部反馈系统问题给开发者 " />
                  <info value="· 可通过「飞书」单点登录 " />
                  <info value="· 操作日志 " />
                  <info value="· 一些已知问题优化" />
                </tab-content>
                <tab-content title="1.0" :titleLine="true">
                  <info value="· 公会后台数据迁移(06.16)" />
                  <info value="· 可实时同步「飞书」的组织架构信息(部门信息、人员信息、人事变动)到极光" />
                  <info value="· 可设置主播的运营关系" />
                  <info value="· 可按部门隔离直播数据" />
                  <info value="· 可管理艺人合同" />
                  <info value="· 可查看艺人直播的汇总数据和每日数据" />
                </tab-content>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import TabContent from './components/TabContent'
import Info from './components/Info'
import { STable } from '@/components'
import { columns, columusData } from './tableColumns'
export default {
  name: 'Help',
  components: {
    TabContent,
    Info,
    STable
  },
  data () {
    return {
      columns: columns,
      columusData: columusData,
      targetOffset: undefined
    }
  },
  mounted () {
    this.targetOffset = 400
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
  .top-content {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 1px;
    width: 100%;
    min-height: 120px;
    background-color: #fff;
    padding: 24px 0 0 40px;
    .top-left {
      color: #000;
      h3 {
        line-height: 1.1;
        font-size: 30px;
        font-weight: 700;
        margin-bottom: 20px;
        margin-top: 50px;
      }
      p {
        line-height: 1.5;
        margin-bottom: 8px;
      }
    }
    .img-cont {
      float: right;
      width: 690px;
      height: 240px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .help-content {
    margin-top: 265px;
    background-color: #fff;
  }
  .anchor-content {
    display: flex;
    .anchor-left {
      width: 155px;
      margin-left: 20px;
      border-left: solid 2px #e8e8e8;
      /deep/ .ant-anchor-wrapper {
        // padding-left: 2px;
        margin-left: -6px;
        margin-top: 30px;
      }
    }
    .anchor-right {
      flex: 1;
      padding-bottom: 24px;
    }
  }
  .description {
    margin-top: 20px;
    h3 {
      line-height: 1.2;
      font-size: 24px;
    }
    .tab-content {
      margin-top: 20px;
    }
  }
  .table {
    p {
      margin-bottom: 0;
    }
  }
</style>
