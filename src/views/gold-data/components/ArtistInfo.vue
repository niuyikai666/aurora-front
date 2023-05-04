<template>
  <div class="sign-info-content">
    <tab-content title="身份信息" :titleLine="true">
      <a-row class="sign-content">
        <!-- <a-col :xs="24" :md="8">
          <description title="直播平台账号昵称">
            <p class="crip">{{ info.nickname ? info.nickname : '--' }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="抖音号">
            <p class="crip">{{ info.newTrillNumber ? info.newTrillNumber : '--' }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="抖音号（原）">
            <p class="crip">{{ info.oldTrillNumber ? info.oldTrillNumber : '--' }}</p>
          </description>
        </a-col> -->
        <a-col :xs="24" :md="8">
          <description title="主播真实姓名">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="现居城市">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="主播生日">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="主播微信号">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="主播手机号">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
      </a-row>
    </tab-content>
    <tab-content title="基本信息" :titleLine="true">
      <a-row class="sign-content">
        <a-col :xs="24" :md="8">
          <description title="直播方式">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="才艺类型">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="主播评级">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="才艺情况">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="颜值评估">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="互动能力">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="初始粉丝量">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="最高月流水等级">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="首页截图">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="毕业院校">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="学历">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="专业">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="所属品类">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="加分技能">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="主播照片">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
      </a-row>
    </tab-content>
    <tab-content title="备注" :titleLine="true">
      <p class="crip">{{ text }}</p>
    </tab-content>
    <tab-content title="签约信息" :titleLine="true">
      <a-row class="sign-content">
        <!-- <a-col :xs="24" :md="8">
          <description title="签约情况">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col> -->
        <a-col :xs="24" :md="8">
          <description title="招募人为无忧员工">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="招募姓名">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8" v-if="!showRecruitType">
          <description title="招募手机号">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="运营人姓名">
            <p class="crip">{{ info.operatorName ? info.operatorName : '-' }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="运营人分公司">
            <p class="crip">{{ info.fullName ? info.fullName : '-' }}</p>
          </description>
        </a-col>
        <a-col :xs="24" :md="8">
          <description title="入驻时间">
            <p class="crip">{{ text }}</p>
          </description>
        </a-col>
      </a-row>
    </tab-content>
  </div>
</template>

<script>
import { getArtisInfo } from '@/api/goldData'
import TabContent from './TabContent'
import Description from './Description'
import { Ellipsis } from '@/components'

export default {
  name: 'ArtistInfo',
  components: {
    TabContent,
    Description,
    Ellipsis
  },
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      text: '******',
      showRecruitType: false
    }
  },
  mounted () {
    this.id = this.$route.query.id
    //  this.getInfoHandle()
  },
  methods: {
    getInfoHandle () {
      getArtisInfo({ influencerId: this.id }).then(res => {
        // videoCountOfMonth
        this.info = res
        this.showRecruitType = res.isInRecruit === 1
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import "~ant-design-vue/es/style/themes/default.less";
.sign-content {
  padding-left: 8px;
  /deep/ .descript-content {
    h3 {
      margin-bottom: 6px;
    }
    p.crip {
      font-size: 16px;
      color: rgba(0,0,0,.65);
      font-weight: normal;
      line-height: 20px;
      word-wrap: break-word;
      &.custom {
        color: @primary-color;
      }
    }
    .con {
      margin-bottom: 12px;
    }
  }
  /deep/ .ant-col {
    height: 74px;
    &.enclosure {
      height: auto;
    }
  }
}
.img-viewer {
  img {
    display: block;
    width: 100px;
    cursor: pointer;
  }
}
.tab-content{
  margin-bottom: 40px;
}
.imgs{
  height: 30px;
  width: auto!important;;
}
</style>
