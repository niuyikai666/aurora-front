<template>
  <div v-if="data">
    <a-card
      :bordered="false"
      style="margin-bottom:24px"
    >
      <div class="flex-box">
        <div class="box-item">
          <p>
            {{ data.nickName }}
            <span class="score-label" v-if="data.actorCategory">{{ data.actorCategory.code | changeCategory }}</span>
            <span class="score-label-plat" v-if="data.actorCategory && data.actorCategory.code === 2">{{ data.scorePlatform && data.scorePlatform.code | platform }}</span>
          </p>
          <p>平台ID: {{ data.platformAccount || '-' }}</p>
        </div>
      </div>
    </a-card>
    <a-card
      :bordered="false"
    >
      <tab-content title="直播基本信息">
        <div class="base-info">
          <a-row :gutter="60">
            <a-col :span="8">
              主播类型: {{ data.actorType ? data.actorType.msg : '-' }}
            </a-col>
            <a-col :span="8">
              {{ data.scoreAnswer[0] }}
            </a-col>
            <a-col :span="8">
              {{ data.scoreAnswer[1] }}
            </a-col>
          </a-row>
          <a-row :gutter="60">
            <a-col :span="8">
              {{ data.scoreAnswer[2] }}
            </a-col>
            <a-col :span="8">
              {{ data.scoreAnswer[3] }}
            </a-col>
            <a-col :span="8">
              {{ data.scoreAnswer[4] }}
            </a-col>
          </a-row>
          <a-row :gutter="60">
            <a-col :span="8">
              {{ data.scoreAnswer[5] }}
            </a-col>
          </a-row>
        </div>
        <!-- <a-descriptions>
          <a-descriptions-item>
            主播类型: {{ data.actorType ? data.actorType.msg : '-' }}
          </a-descriptions-item>
          <a-descriptions-item v-for="(li, index) in data.scoreAnswer" :key="index">
            {{ li }}
          </a-descriptions-item>
        </a-descriptions> -->
      </tab-content>
      <tab-content title="主播原平台近12个月流水明细(元)" class="mt24" v-if="data.actorCategory && data.actorCategory.code === 2 && data.platformType.code === 1">
        <a-descriptions>
          <a-descriptions-item v-for="(li, index) in data.monthReward" :key="index">
            {{ li.yearAndMonth }}: {{ li.reward && amountFormat(li.reward) || '--' }}
          </a-descriptions-item>
        </a-descriptions>
      </tab-content>
      <tab-content v-if="fileList2.length > 0" title="主播流水视频" class="clearfix" style="margin-top:10px;">
        <div
          class="marking-video-wraper marking-video-wraper-float"
          v-for="(li, index) in fileList2"
          :key="index">
          <div
            class="icon-wraper">
            <img
              src="@/assets/play-video-icon.png"
              class="play-icon"
              alt=""
              @click="showMask(urlLink + li)"/>
          </div>
          <video
            :src="urlLink + li"
            class="video-info"
          ></video>
        </div>
      </tab-content>
      <tab-content v-if="fileList.length > 0" title="主播视频内容" class="clearfix" style="margin-top: 32px">
        <div
          class="marking-video-wraper marking-video-wraper-float"
          v-for="(li, index) in fileList"
          :key="index">
          <div
            class="icon-wraper">
            <img
              src="@/assets/play-video-icon.png"
              class="play-icon"
              alt=""
              @click="showMask(urlLink + li)"/>
          </div>
          <video
            :src="urlLink + li"
            class="video-info"
          ></video>
        </div>
      </tab-content>
      <tab-content v-if="fileList3.length > 0" title="主播附加分视频" class="clearfix" style="margin-top: 32px">
        <div
          class="marking-video-wraper marking-video-wraper-float"
          v-for="(li, index) in fileList3"
          :key="index">
          <div
            class="icon-wraper">
            <img
              src="@/assets/play-video-icon.png"
              class="play-icon"
              alt=""
              @click="showMask(urlLink + li)"/>
          </div>
          <video
            :src="urlLink + li"
            class="video-info"
          ></video>
        </div>
      </tab-content>
      <tab-content title="审核" class="clearfix" style="margin-top:32px;">
        <a-form style="margin-top:-15px;">
          <a-form-item label="改进建议(选填 100字以内):">
            <a-textarea :maxLength="100" :auto-size="{ minRows: 6 }" allow-clear v-model="suggestions" style="width: 400px;" />
          </a-form-item>
        </a-form>
      </tab-content>
      <div class="btn-group" style="margin-top:-10px;">
        <a-popconfirm
          overlayClassName="popoer-del"
          title="是否立即通过此主播的保底申请？"
          ok-text="确定"
          cancel-text="取消"
          @confirm="checkHandle(true)">
          <a-button :loading="loading" type="primary">通过</a-button>
        </a-popconfirm>
        <a-popconfirm
          overlayClassName="popoer-del"
          :title="cancelTitle"
          ok-text="确定"
          cancel-text="取消"
          @confirm="checkHandle(false)">
          <a-button :loading="loadingReject" class="ml16">驳回</a-button>
        </a-popconfirm>
      </div>
    </a-card>
    <div class="score-mask" v-if="mask" @click="mask = false">
      <div class="dialog">
        <span class="icon" v-if="mask"></span>
        <video
          :src="videoUrl"
          controls
          autoplay
          class="video"
          @click.stop></video>
      </div>
    </div>
  </div>
</template>

<script>
import TabContent from '../components/TabContent'
import { getScoreExamineDetail, examineCheck } from '@/api/score'
import { platformData } from '../type'
import { amountFormat } from '@/utils/util'

export default {
  data () {
    return {
      amountFormat,
      id: '',
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/files`,
      mask: false,
      data: '',
      visible: false,
      loading: false,
      loadingReject: false,
      urlLink: process.env.VUE_APP_API_BASE_URL,
      videoUrl: '',
      suggestions: '',

      fileList: [],
      fileList2: [],
      fileList3: []
    }
  },
  components: {
    TabContent
  },
  created () {
  },
  mounted () {
    this.id = this.$route.query.id
    this.getDetailQuestion()
  },

  methods: {
    getDetailQuestion () {
      getScoreExamineDetail({
        id: this.id
      }).then(res => {
        res.additionalVideoUrl = res.additionalVideoUrl ? res.additionalVideoUrl.split(',') : ''
        this.data = res
        this.getImageVideoInfo(res.scorePictureS)
      })
    },
    getImageVideoInfo (imageVideoData) {
      // 主播内容视频
      this.fileList = imageVideoData.find(item => item.pictureType === 1) ? this.getFileData(imageVideoData.find(item => item.pictureType === 1).pictureUrl) : []
      // 主播流水视频
      this.fileList2 = imageVideoData.find(item => item.pictureType === 2) ? this.getFileData(imageVideoData.find(item => item.pictureType === 2).pictureUrl) : []
      // 附加视频
      this.fileList3 = imageVideoData.find(item => item.pictureType === 3) ? this.getFileData(imageVideoData.find(item => item.pictureType === 3).pictureUrl) : []
    },

    getFileData (url) {
      const arr = []
      const urls = url ? url.split(',') : []
      urls.forEach((item) => {
        arr.push(item)
      })
      return arr
    },
    showMask (url) {
      this.videoUrl = url
      this.mask = true
    },
    checkHandle (state) {
      if (state) {
        this.loading = true
      } else {
        this.loadingReject = true
      }
      examineCheck({
        id: this.id,
        approved: state,
        suggestions: this.suggestions
      }).then(() => {
        this.$message.success('操作成功')
        this.$router.push({
          path: '/score/examine/list'
        })
      }).catch(() => {
        this.loading = false
        this.loadingReject = false
      })
    },

    cancelTitle () {
      return <span>是否立即<b style="color:#f00;">驳回</b>此主播的保底申请？</span>
    }
  },
  filters: {
    changeCategory (val) {
      if (val === 0) {
        return '存量'
      } else if (val === 1) {
        return '新'
      } else if (val === 2) {
        return '优质'
      }
    },
    platform (code) {
      return platformData[code]
    }
  }
}

</script>
<style lang='less' scoped>
@import '../index.less';
</style>
