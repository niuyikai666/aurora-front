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
          <a-row :gutter="60" v-for="(item, index) in baseInfo" :key="index">
            <a-col :span="12" v-for="(it, idx) in item" :key="idx">
              {{ it }}
            </a-col>
          </a-row>
        </div>
      </tab-content>
      <tab-content v-if="data.actorCategory && data.actorCategory.code === 2 && data.platformType.code === 1" title="主播原平台近12个月流水明细(元)" class="mt24">
        <a-descriptions>
          <a-descriptions-item v-for="(li, index) in data.monthReward" :key="index">
            {{ li.yearAndMonth }}: {{ li.reward && amountFormat(li.reward) || '--' }}
          </a-descriptions-item>
        </a-descriptions>
      </tab-content>
      <tab-content v-if="data.gameLiveExperience" title="直播说明" class="clearfix mt24">
        <div>
          <span style="margin-left:10px;">{{ data.gameLiveExperience }}</span>
        </div>
        <div>
          <span style="margin-left:10px;">试播平台: {{ data.trialLivePlatform || '-' }},试播平台昵称或ID: {{ data.trialLiveIdOrNickname || '-' }},试播日期和具体时间: {{ data.trialLiveDateTime || '-' }}</span>
        </div>
      </tab-content>
      <div v-if="data.actorCategory && data.actorCategory.code === 3">
        <tab-content title="主播生活照" class="clearfix mt24">
          <div
            class="marking-video-wraper marking-video-wraper-float"
            v-for="(li, index) in imageFileList"
            :key="index">
            <img
              :src="urlLink + li"
              class="video-info"
              @click="showImageMask(urlLink + li)"
            />
          </div>
        </tab-content>
        <tab-content title="主播游戏段位截图" class="clearfix mt24">
          <div
            class="marking-video-wraper marking-video-wraper-float"
            v-for="(li, index) in imageFileList2"
            :key="index">
            <img
              :src="urlLink + li"
              class="video-info"
              @click="showImageMask(urlLink + li)"
            />
          </div>
        </tab-content>
        <tab-content v-if="imageFileList3.length > 0" title="游戏/直播资源证明截图" class="clearfix mt24">
          <div
            class="marking-video-wraper marking-video-wraper-float"
            v-for="(li, index) in imageFileList3"
            :key="index">
            <img
              :src="urlLink + li"
              class="video-info"
              @click="showImageMask(urlLink + li)"
            />
          </div>
        </tab-content>
      </div>
      <tab-content v-if="data.actorCategory && ((data.actorCategory.code === 2 && data.platformType.code === 1) || (data.platformType.code === 2 && data.actorCategory.code !== 1 && data.actorCategory.code !== 3))" title="主播流水视频" class="clearfix" style="margin-top:10px;">
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
      <tab-content v-if="data.actorCategory && data.actorCategory.code !== 3" style="margin-top:24px;" title="主播视频内容" class="clearfix">
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
      <tab-content style="margin-top:24px;" title="主播附加分视频" class="clearfix" v-if="fileList3.length > 0">
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
      <tab-content style="margin-top:24px;" title="主播才艺视频" class="clearfix" v-if="fileList4.length > 0">
        <div
          class="marking-video-wraper marking-video-wraper-float"
          v-for="(li, index) in fileList4"
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
      <tab-content title="参与打分评委" style="margin-top:24px">
        <a-descriptions>
          <a-descriptions-item v-for="(li, index) in data.empAndDepartmentName" :key="index">
            {{ li }}
          </a-descriptions-item>
        </a-descriptions>
      </tab-content>
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
    <a-modal :visible="imageMask" :footer="null" @cancel="imageMask = false">
      <img style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import { amountFormat } from '@/utils/util'
import TabContent from '../components/TabContent'
import { getScoreAdminDetail } from '@/api/score'
import { platformData } from '../type'

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
      urlLink: process.env.VUE_APP_API_BASE_URL,
      videoUrl: '',
      baseInfo: [],

      imageMask: false,
      previewImage: '',
      fileList: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      imageFileList: [],
      imageFileList2: [],
      imageFileList3: []
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
      getScoreAdminDetail({
        id: this.id
      }).then(res => {
        res.scoreAnswer = [
          `主播类型:${ res.actorType && res.actorType.msg || '-' }`,
          ...res.scoreAnswer
        ]
        this.data = res
        this.getImageVideoInfo(res.scorePictureS)
        this.getBaseInfo(res.scoreAnswer)
      })
    },
    getImageVideoInfo (imageVideoData) {
      // 主播内容视频
      this.fileList = imageVideoData.find(item => item.pictureType === 1) ? this.getFileData(imageVideoData.find(item => item.pictureType === 1).pictureUrl) : []
      // 主播流水视频
      this.fileList2 = imageVideoData.find(item => item.pictureType === 2) ? this.getFileData(imageVideoData.find(item => item.pictureType === 2).pictureUrl) : []
      // 附加视频
      this.fileList3 = imageVideoData.find(item => item.pictureType === 3) ? this.getFileData(imageVideoData.find(item => item.pictureType === 3).pictureUrl) : []
      // 主播才艺视频
      this.fileList4 = imageVideoData.find(item => item.pictureType === 7) ? this.getFileData(imageVideoData.find(item => item.pictureType === 7).pictureUrl) : []

      // 主播生活照
      this.imageFileList = imageVideoData.find(item => item.pictureType === 4) ? this.getFileData(imageVideoData.find(item => item.pictureType === 4).pictureUrl) : []
      // 段位截图
      this.imageFileList2 = imageVideoData.find(item => item.pictureType === 5) ? this.getFileData(imageVideoData.find(item => item.pictureType === 5).pictureUrl) : []
      // 直播资源证明截图
      this.imageFileList3 = imageVideoData.find(item => item.pictureType === 6) ? this.getFileData(imageVideoData.find(item => item.pictureType === 6).pictureUrl) : []
    },

    getFileData (url) {
      const arr = []
      const urls = url ? url.split(',') : []
      urls.forEach((item) => {
        arr.push(item)
      })
      return arr
    },
    getBaseInfo (data) {
      var result = []
      for (var i = 0; i < data.length; i += 2) {
        result.push(data.slice(i, i + 2))
      }
      this.baseInfo = result
    },
    showMask (url) {
      this.videoUrl = url
      this.mask = true
    },

    showImageMask (url) {
      this.imageMask = true
      this.previewImage = url
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
      } else if (val === 3) {
        return '游戏'
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
