<template>
  <a-card :bordered="false">
    <div class="sign-info-content">
      <tab-content title="签约信息" :titleLine="true">
        <a-row class="sign-content">
          <a-col :xs="24" :md="8">
            <description title="主播运营人">
              <p class="crip">{{ info.operatorName || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="运营人所在组织">
              <p class="crip">{{ info.operatorDepartmentName || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="招募人为无忧员工">
              <p class="crip">{{ info.recruitType === 1 ? '是' : (info.isInRecruit === null ? '-' : '否') }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="招募姓名">
              <p class="crip">{{ info.recruitName || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8" v-if="info.recruitType === 0">
            <description title="招募手机号">
              <p class="crip">{{ info.recruitMobile || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="讲师为无忧员工">
              <p class="crip">{{ info.lecturerType ? info.lecturerType.msg : '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="讲师姓名" v-if="info.lecturerType && info.lecturerType.code">
              <p class="crip">{{ info.lectureName || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8" v-if="info.lecturerType && info.lecturerType.code === 2">
            <description title="讲师手机号">
              <p class="crip">{{ info.lectureMobile || '-' }}</p>
            </description>
          </a-col>
        </a-row>
      </tab-content>
      <tab-content title="入会信息" :titleLine="true">
        <a-row class="sign-content">
          <a-col :xs="24" :md="8">
            <description title="在会状态">
              <p class="crip">{{ info.retired ? '退会' : (info.retired === null ? '-' : '在会') }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="入会时间">
              <p class="crip">{{ info.joinGuildDate || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="退会时间">
              <p class="crip">{{ info.retiredDate || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="签约状态">
              <p class="crip">{{ info.signMethod ? info.signMethod.msg : '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="签约人">
              <p class="crip">{{ info.signEmpName || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="到期时间">
              <p class="crip">{{ info.signExpiration || '-' }}</p>
            </description>
          </a-col>
        </a-row>
      </tab-content>
      <tab-content title="身份信息" :titleLine="true">
        <a-row class="sign-content">
          <a-col :xs="24" :md="8">
            <description title="主播视频号ID">
              <p class="crip">{{ info.platformCode || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="主播视频号昵称">
              <p class="crip">{{ info.nickName || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="主播微信">
              <p class="crip">{{ info.wechat || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="联系电话">
              <p class="crip">{{ info.tel || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="主播真实姓名">
              <p class="crip">{{ info.realName || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="主播生日">
              <p class="crip">{{ info.birthday || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="视频号是否创建7天内">
              <p class="crip">{{ info.createRecent === 1 ? '是' : (info.createRecent === null ? '-' : '否') }}</p>
            </description>
          </a-col>
        </a-row>
      </tab-content>
      <tab-content title="基本信息" :titleLine="true">
        <a-row class="sign-content">
          <a-col :xs="24" :md="8">
            <description title="KOL垂类">
              <p class="crip">{{ info.kolType ? info.kolType.msg : '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="有无外站平台账号">
              <p class="crip">{{ info.otherPlatformType === 1 ? '有' : (info.otherPlatformType === null ? '-' : '无') }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="外站平台名称" v-if="info.otherPlatformType === 1">
              <p class="crip">{{ info.otherPlatform || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="外站昵称" v-if="info.otherPlatformType === 1">
              <p class="crip">{{ info.otherPlatformName || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="外站粉丝数" v-if="info.otherPlatformType === 1">
              <p class="crip">{{ info.otherFans }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="当前是否直播" v-if="info.otherPlatformType === 1">
              <p class="crip">{{ info.liveNow === 1 ? '是' : (info.liveNow === null ? '-' : '否') }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="24">
            <description title="外站10W以上平台主页链接" v-if="info.otherPlatformType === 1">
              <p class="crip">{{ info.otherUrl || '-' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="24">
            <description title="事迹/外部影响力">
              <p class="crip">{{ info.deed || '-' }}</p>
            </description>
          </a-col>
        </a-row>
      </tab-content>
      <div class="btn-group">
        <a-button type="primary" @click="changeEdit">修改信息</a-button>
      </div>
    </div>
  </a-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPrefillInfluencerInfo } from '@/api/artists-video'
import TabContent from '../components/TabContent'
import Description from '../components/Description'
import { Ellipsis } from '@/components'
export default {
  data () {
    return {
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      info: '',
      showRecruitType: false,
      lecturerType: {
        0: '无讲师',
        1: '内部讲师',
        2: '外部讲师'
      },
      type: ''
    }
  },

  components: {
    TabContent,
    Description,
    Ellipsis
  },

  mounted () {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    this.getInfoHandle()
  },

  methods: {
    getInfoHandle () {
      getPrefillInfluencerInfo({
        id: this.id,
        type: this.type
      }).then(res => {
        this.info = res
      })
    },
    changeEdit () {
      this.$emit('change')
    }
  },
  computed: {
    ...mapGetters(['permission'])
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
.btn-group{
  display: flex;
  // justify-content: flex-end;
}
</style>
