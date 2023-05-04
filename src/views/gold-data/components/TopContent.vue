<template>
  <a-row :gutter="24" class="sign-content">
    <!-- <a-col :md="4" :lg="5" :xxl="4">
      <div class="flex-box">
        <div class="box-item">
          <p>{{ data.nickname ? data.nickname : '--' }}</p>
          <p>抖音号: {{ data.newTrillNumber ? data.newTrillNumber : '--' }}</p>
          <p>抖音号(原): {{ data.oldTrillNumber ? data.oldTrillNumber : '--' }}</p>
          <p>火山号: {{ data.newVolcanoNumber ? data.newVolcanoNumber : '--' }}</p>
        </div>
      </div>
    </a-col> -->
    <a-col :md="20" :lg="19" :xxl="20">
      <a-row :gutter="24">
        <a-col :md="4" :lg="4" :xxl="4">
          <description title="主播昵称">
            <p class="crip">{{ data.nickname || '--' }}</p>
          </description>
        </a-col>
        <a-col :md="4" :lg="4" :xxl="4">
          <description title="抖音号">
            <p class="crip">{{ data.newTrillNumber || '--' }}</p>
          </description>
        </a-col>
        <a-col :md="4" :lg="4" :xxl="4">
          <description title="抖音号（原）">
            <p class="crip">{{ data.oldTrillNumber || '--' }}</p>
          </description>
        </a-col>
        <a-col :md="4" :lg="4" :xxl="4">
          <description title="入会时间">
            <p class="crip">{{ data.signingTime ? data.signingTime : '--' }}</p>
          </description>
        </a-col>
        <!-- <a-col :md="4" :lg="4" :xxl="4">
          <description title="主播信息填写时间">
            <p class="crip">{{ data.firstEnteringDateOfInfluencerInfo ? data.firstEnteringDateOfInfluencerInfo : '--' }}</p>
          </description>
        </a-col>
        <a-col :md="4" :lg="4" :xxl="4">
          <description title="短视频孵化线填写时间">
            <p class="crip">{{ data.firstEnteringDateOfVideoInfo ? data.firstEnteringDateOfVideoInfo : '--' }}</p>
          </description>
        </a-col>
        <a-col :md="4" :lg="4" :xxl="4">
          <description title="进度">
            <p class="crip">{{ data.infoState }}</p>
          </description>
        </a-col>
        <a-col :md="4" :lg="4" :xxl="4">
          <description title="运营">
            <p class="crip">{{ data.operatorName ? data.operatorName : '--' }}</p>
          </description>
        </a-col>
        <a-col :md="4" :lg="4" :xxl="4">
          <description title="短视频孵化线">
            <p class="crip">{{ data.operationType ? data.operationType : '--' }}</p>
          </description>
        </a-col> -->
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import TabContent from './TabContent'
import Description from './Description'
export default {
  name: 'TopContent',
  components: {
    TabContent,
    Description
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/es/style/themes/default.less';
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
</style>
