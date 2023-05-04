<template>
  <div>
    <a-card
      :bordered="false"
      style="margin-bottom:24px"
    >
      <div class="flex-box">
        <div class="box-item">
          <p>{{ data.nickName || data.nickname }} <span class="score-label" v-if="data.actorCategory">{{ data.actorCategory.code | changeCategory }}</span></p>
          <p>平台ID: {{ data.platformAccount || '-' }}</p>
        </div>
      </div>
    </a-card>
    <div>
      <a-card
        :bordered="false"
      >
        <div v-if="actorCategory === 3">
          <tab-content title="主播生活照" class="clearfix">
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
          <tab-content v-if="actorCategory === 3" title="主播才艺视频" class="clearfix mt24">
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
          <tab-content v-if="actorCategory === 3" title="直播说明" class="clearfix mt24">
            <div>
              <span style="margin-left:10px;">{{ data.gameLiveExperience }}</span>
            </div>
            <div>
              <span style="margin-left:10px;">试播平台: {{ data.trialLivePlatform }},试播平台昵称或ID: {{ data.trialLiveIdOrNickname }},试播日期和具体时间: {{ data.trialLiveDateTime }}</span>
            </div>
          </tab-content>
        </div>
        <tab-content v-if="actorCategory !== 3" title="主播视频内容" class="clearfix mt24">
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
        <tab-content title="评委打分" style="width: 610px;margin-top:24px">
          <a-form labelAlign="left" :label-col="{ span: 8 }" :wrapper-col="{ span: 12 }">
            <a-form-item :required="true" style="display:flex;align-items:center;" :label="item.title" v-for="(item, index) in scoreData" :key="index">
              <score-marking-comp :scoreItem="item" />
            </a-form-item>
            <a-form-item class="item-custom" label="改进建议(100字以内)">
              <a-textarea :maxLength="100" v-model="suggestions" />
            </a-form-item>
          </a-form>
        </tab-content>
        <div class="grade-wraper">
          <div class="list-item">
            <a-popconfirm
              overlayClassName="popoer-del"
              title="是否立即提交本次评分？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="submitHandle()">
              <a-button
                type="primary"
                :loading="loading">
                提交
              </a-button>
            </a-popconfirm>
            <a-popconfirm
              overlayClassName="popoer-del"
              title="是否放弃本次评分？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="cancel()">
              <a-button style="margin-left:24px" >取消</a-button>
            </a-popconfirm>
          </div>
        </div>
      </a-card>
      <div class="score-mask" v-if="mask" @click="mask = false">
        <div class="dialog">
          <video
            :src="videoUrl"
            controls
            autoplay
            muted
            class="video"
            @click.stop></video>
        </div>
      </div>
      <a-modal :visible="imageMask" :footer="null" @cancel="imageMask = false">
        <img style="width: 100%" :src="previewImage" />
      </a-modal>
    </div>
  </div>
</template>

<script>
import TabContent from '../components/TabContent'
import { getMarkingDetail, personMark } from '@/api/score'
import ScoreMarkingComp from '../components/ScoreMarkingComp'
import GameComp from './components/GameComp'

export default {
  components: {
    TabContent,
    ScoreMarkingComp,
    GameComp
  },
  data () {
    return {
      id: this.$route.query.id,
      actorCategory: null,
      isGameActor: false,
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/files`,
      mask: false,
      data: '',
      visible: false,
      loading: false,
      urlLink: process.env.VUE_APP_API_BASE_URL,
      videoUrl: '',
      scoreData: [],
      suggestions: '',

      imageMask: false,
      previewImage: '',

      fileList: [],
      fileList4: [],
      imageFileList: [],
      imageFileList2: [],
      imageFileList3: []
    }
  },
  mounted () {
    this.getDetailQuestion()
  },

  methods: {
    getDetailQuestion () {
      getMarkingDetail({
        id: this.id
      }).then(res => {
        this.data = res
        this.actorCategory = res.actorCategory.code
        this.getImageVideoInfo(res.scorePictureS)
        this.scoreData = this.generateScoreMap(res.scoreSubQuestions)
      })
    },
    getImageVideoInfo (imageVideoData) {
      // 主播内容视频
      this.fileList = imageVideoData.find(item => item.pictureType === 1) ? this.getFileData(imageVideoData.find(item => item.pictureType === 1).pictureUrl) : []
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

    generateScoreMap (data) {
      const arr = []
      for (const key in data) {
        arr.push({
          title: key,
          list: data[key],
          id: undefined,
          score: undefined
        })
      }
      return arr
    },
    showImageMask (url) {
      this.imageMask = true
      this.previewImage = url
    },
    cancel () {
      window.history.go(-1)
    },
    submitHandle () {
      let flag = true
      const arr = []
      try {
        this.scoreData.forEach(item => {
          if (item.score === undefined) throw new Error(`请选择${item.title}分数`)
          arr.push({
            score: item.score,
            scoreId: this.id,
            subQuestionId: item.id
          })
        })
      } catch (error) {
        flag = false
        this.$message.error(error.message)
      }
      if (!flag) return
      this.loading = true
      personMark({
        info: arr,
        suggestions: this.suggestions
      }).then(() => {
        this.loading = false
        this.$message.success('操作成功')
        this.$router.push({
          path: '/score/marking/list'
        })
      }).catch(() => {
        this.loading = false
      })
    },
    showMask (url) {
      this.videoUrl = url
      this.mask = true
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
        return '游戏女主播'
      }
    }
  }
}

</script>
<style lang='less' scoped>
@import '../index.less';
.item-custom {
  /deep/ .ant-form-item-label-left {
    padding-left: 12px;
  }
}
</style>
