<template>
  <div>
    <a-card
      :bordered="false"
      style="margin-bottom:24px"
    >
      <div class="sign-info-content">
        <a-row class="sign-content">
          <a-col :xs="24" :md="8">
            <description title="运营人姓名">
              <p class="crip">{{ info.operatorEmployeeName ? info.operatorEmployeeName : '--' }}</p>
            </description>
          </a-col>
          <!-- <a-col :xs="24" :md="8">
            <description title="签约人姓名">
              <p class="crip">{{ info.signedEmpName ? info.signedEmpName : '--' }}</p>
            </description>
          </a-col> -->
          <a-col :xs="24" :md="8">
            <description title="运营人分公司">
              <p class="crip">{{ info.fullDepartmentName ? info.fullDepartmentName : '--' }}</p>
            </description>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-card
      :bordered="false"
    >
      <div class="sign-info-content">
        <tab-content title="签约信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <description title="招募人为无忧员工">
                <p class="crip">{{ getText((info.isInRecruit || info.isInRecruit===0) ? (info.isInRecruit == 1 ? '是' : '否') : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="招募姓名">
                <p class="crip">{{ getText(info.recruitName ? info.recruitName : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8" v-if="!showRecruitType">
              <description title="招募手机号">
                <p class="crip">{{ getText(info.recruitMobile ? info.recruitMobile : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="公会经纪人">
                <p class="crip">{{ info.agentName || '--' }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="是否为讲师招募">
                <p class="crip">{{ getText((info.isLecturerRecruit || info.isLecturerRecruit === 0 ) ? (info.isLecturerRecruit == 1 ? '是' : '否') : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8" v-if="info.isLecturerRecruit !== 0">
              <description title="讲师姓名">
                <p class="crip">{{ getText(info.lecturerRecruitName ? info.lecturerRecruitName : '--') }}</p>
              </description>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content title="身份信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <description title="抖音号">
                <p class="crip">{{ info.tiktokCode || '--' }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="火山号">
                <p class="crip">{{ info.volcanoCode || '--' }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="直播平台账号昵称">
                <p class="crip">{{ info.nickname ? info.nickname : '--' }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="真实姓名">
                <p class="crip">{{ getText(info.realname ? info.realname : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="现居城市">
                <p class="crip">{{ getText(info.address ? info.address : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="主播生日">
                <p class="crip">{{ getText(info.birthday ? info.birthday : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="个人微信">
                <p class="crip">{{ getText(info.wechat ? info.wechat : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="联系电话">
                <p class="crip">{{ getText(info.tel ? info.tel : '--') }}</p>
              </description>
            </a-col>
          </a-row>
        </tab-content>
        <tab-content title="基本信息" :titleLine="true">
          <a-row class="sign-content">
            <a-col :xs="24" :md="8">
              <description title="直播方式">
                <p class="crip">{{ getText(info.liveType ? info.liveType.msg : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="才艺类型">
                <p class="crip">{{ info.talentCategory ? info.talentCategory.msg : '--' }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="主播评级">
                <p class="crip">{{ getText(info.rate ? info.rate : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="才艺情况">
                <p class="crip">{{ getText(info.acquirement ? info.acquirement.msg : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="颜值评估">
                <p class="crip">{{ getText(info.appearance ? info.appearance.msg : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="互动能力">
                <p class="crip">{{ getText(info.interaction ? info.interaction.msg : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="初始粉丝量">
                <p class="crip">{{ getText(info.initFans ? info.initFans : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="最高月流水等级">
                <p class="crip">{{ getText(info.monthAmountType ? info.monthAmountType.msg : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="首页截图">
                <p class="crip">
                  <viewer
                    v-if="info.indexPicUrl"
                    :images="[baseUrl+info.indexPicUrl]"
                    class="img-viewer"
                    style="display:inline-block;margin-left:10px;width:auto"
                  >
                    <div class="images">
                      <img
                        :src="baseUrl+info.indexPicUrl"
                        class="imgs"
                      >
                    </div>
                  </viewer>
                </p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="毕业院校">
                <p class="crip">{{ getText(info.graduation ? info.graduation : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="学历">
                <p class="crip">{{ getText(info.qualification ? info.qualification.msg : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="专业">
                <p class="crip">{{ getText(info.profession ? info.profession : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="所属品类">
                <p class="crip">{{ getText(info.actorCategory ? info.actorCategory.msg : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="加分技能">
                <p class="crip">{{ getText(info.bonusSkill ? info.bonusSkill.msg : '--') }}</p>
              </description>
            </a-col>
            <a-col :xs="24" :md="8">
              <description title="主播照片">
                <p class="crip">
                  <viewer
                    v-if="info.actorPic"
                    :images="[baseUrl+info.actorPic]"
                    class="img-viewer"
                    style="display:inline-block;margin-left:10px;width:auto"
                  >
                    <div class="images">
                      <img
                        :src="baseUrl+info.actorPic"
                        class="imgs"
                      >
                    </div>
                  </viewer>
                </p>
              </description>
            </a-col>
          </a-row>
        </tab-content>
      </div>
    </a-card>
  </div>
</template>

<script>
import { getInfluencerInfo } from '@/api/pre-filled'
import TabContent from './components/TabContent'
import Description from './components/Description'
import { Ellipsis } from '@/components'
export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      info: '',
      showRecruitType: false,

      loading: true
    }
  },

  components: {
    TabContent,
    Description,
    Ellipsis
  },

  mounted () {
    this.id = this.$route.query.id
     this.getInfoHandle()
  },

  methods: {
    getInfoHandle () {
      getInfluencerInfo(this.id).then(res => {
        // videoCountOfMonth
        this.info = res
        this.showRecruitType = res.isInRecruit === 1
        this.loading = false
      })
    },
    getText (val) {
      return val
    }
  }
}

</script>
<style lang='less' scoped>
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
