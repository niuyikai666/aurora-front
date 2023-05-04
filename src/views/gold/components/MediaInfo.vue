<template>
  <a-spin :spinning="loading">
    <div class="sign-info-content">
      <!-- <tab-content title="ID信息" :titleLine="true">
        <a-row class="sign-content">
          <a-col :xs="24" :md="8">
            <description title="快手昵称">
              <p class="crip">{{ info.snackvideoNickName ? info.snackvideoNickName : '--' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="快手ID">
              <p class="crip">{{ info.snackvideoId ? info.snackvideoId : '--' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="快手数字ID">
              <p class="crip">{{ info.snackvideoCode ? info.snackvideoCode : '--' }}</p>
            </description>
          </a-col>
        </a-row>
      </tab-content> -->
      <tab-content title="孵化信息" :titleLine="true">
        <a-row class="sign-content">
          <a-col :xs="24" :md="8">
            <description title="短视频孵化线">
              <p class="crip">{{ info.operationType ? info.operationType.msg : '--' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="短视频孵化方式">
              <p class="crip">{{ info.operationMethod ? info.operationMethod.msg : '--' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="短视频介入孵化时粉丝量">
              <p class="crip">{{ info.operationInitFans!=null ? info.operationInitFans : '--' }}</p>
            </description>
          </a-col>
        </a-row>
      </tab-content>
      <tab-content title="策划信息" :titleLine="true">
        <a-row class="sign-content">
          <a-col :xs="24" :md="8">
            <description title="短视频策划">
              <p class="crip">{{ info.engineerName ? info.engineerName : '--' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="归属团队">
              <p class="crip">{{ info.engineerEmployeeDepartment ? info.engineerEmployeeDepartment : '--' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="策划组长">
              <p class="crip">{{ info.engineerManagerName ? info.engineerManagerName : '--' }}</p>
            </description>
          </a-col>
        </a-row>
      </tab-content>
      <tab-content title="孵化信息" :titleLine="true">
        <a-row class="sign-content">
          <a-col :xs="24" :md="8">
            <description title="短视频拍摄">
              <p class="crip">{{ info.shootName ? info.shootName : '--' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="短视频接手时间">
              <p class="crip">{{ info.operationStartDate ? info.operationStartDate : '--' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="短视频后期">
              <p class="crip">{{ info.edittingName ? info.edittingName : '--' }}</p>
            </description>
          </a-col>
          <a-col :xs="24" :md="8">
            <description title="后期组长">
              <p class="crip">{{ info.edittingManagerName ? info.edittingManagerName : '--' }}</p>
            </description>
          </a-col>
        </a-row>
      </tab-content>
    </div>
  </a-spin>
</template>

<script>
import { getMediaInfo } from '@/api/gold'
import TabContent from './TabContent'
import Description from './Description'
import { Ellipsis } from '@/components'

export default {
  name: 'MediaInfo',
  components: {
    TabContent,
    Description,
    Ellipsis
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      id: '',
      info: '',
      loading: true
    }
  },
  mounted () {
    this.id = this.$route.query.id
    this.getInfoData()
  },
  methods: {
    getInfoData () {
      getMediaInfo(this.id).then(res => {
        this.info = res
        this.loading = false
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
</style>
