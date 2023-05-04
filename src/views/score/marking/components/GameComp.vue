<template>
  <div>
    <a-card
      :bordered="false"
    >
      <tab-content title="主播生活照" class="clearfix">
        <div
          class="marking-video-wraper marking-video-wraper-float"
          v-for="(li, index) in imageFileList"
          :key="index">
          <img
            :src="urlLink + li"
            class="video-info"
          />
        </div>
      </tab-content>
      <tab-content class="clearfix" style="padding-left: 5px;">
        <div class="grade-wraper">
          <div v-for="(li, index) in info.questionOptionModelList" :key="index">
            <div class="list-item" v-if="li.optionType!=='file'">
              <span class="title">{{ li.title }}：</span>
              <span
                class="select-option"
                :class="{'active': item.checked}"
                v-for="item in li.optionModelList"
                :key="item.optionVal"
                @click="checkOption(li, item)">
                {{ item.optionVal }}
              </span>
            </div>
          </div>
        </div>
      </tab-content>
      <div class="grade-wraper">
        <div class="list-item">
          <a-button
            type="primary"
            @click="submitHandle"
            :loading="loading">
            提交
          </a-button>
          <a-button
            style="margin-left:24px"
            @click="cancel">
            取消
          </a-button>
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
  </div>
</template>

<script>
import TabContent from '@/components/TabContent'
import { personGameMark } from '@/api/score'

export default {
  components: {
    TabContent
  },
  props: {
    id: {
      type: [Number, String],
      default: null
    },
    info: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      mask: false,
      data: '',
      visible: false,
      loading: false,
      urlLink: process.env.VUE_APP_API_BASE_URL,

      imageFileList: [],
      imageFileList2: [],
      imageFileList3: []
    }
  },
  mounted () {
    // this.getImageInfo()
  },

  methods: {
    getImageInfo () {
      const imageVideoData = this.info.scorePictureS
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
    checkOption (listData, item) {
      if (listData.disableChoice) {
        return
      }
      item.checked = !item.checked
    },
    submitHandle () {
      const optionIds = []
      let flag = true
      try {
        this.info.questionOptionModelList.forEach(item => {
          if (!item.optionModelList.some(item => item.checked)) {
            throw new Error(`请选择${item.title}`)
          }
          item.optionModelList.forEach(it => {
            if (it.checked) optionIds.push(it.id)
          })
        })
      } catch (e) {
        flag = false
        this.$message.error(e.message)
      }
      if (!flag) return false

      this.loading = true
      personGameMark({
        optionIds,
        scoreId: this.id
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
    cancel () {
      window.history.go(-1)
    },
    showMask (url) {
      this.videoUrl = url
      this.mask = true
    }
  },
  watch: {
    info: {
      handler (val) {
        this.getImageInfo()
      },
      deep: true
    }
  }
}

</script>
<style lang='less' scoped>
@import '../../index.less';
</style>
