<template>
  <div>
    <div class="grade-wraper">
      <div class="list-item" style="margin-bottom:12px;">
        <a-upload
          name="file"
          accept=".mp4"
          :file-list="fileList"
          :action="uploadUrl"
          :showUploadList="false"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <div class="upload-con" v-if="fileList.length < limit">
            <div class="u-con">
              <img src="~@/assets/upload_bg.png" />
              <p class="name">点击上传</p>
              <p class="crip">视频最大不可超出50M</p>
            </div>
            <!-- <img v-if="idCardFrontUrl" class="picture" :src="baseUrl + idCardFrontUrl" alt=""> -->
          </div>
        </a-upload>
        <div
          class="video-wraper"
          v-for="(li, index) in fileList"
          :key="index">
          <span
            class="status-wraper"
            v-if="li.status != 'done'">
            <a-icon
              type="loading"
              v-if="li.status === 'uploading'"/>
            <span
              v-if="li.status === 'error' || !li.status">上传失败</span>
          </span>
          <div
            class="icon-wraper"
            v-if="li.status !== 'uploading'">
            <img
              src="@/assets/play-video-icon.png"
              class="play-icon"
              alt=""
              @click="showMask(index)"
              v-if="li.status === 'done'"/>
            <img
              src="@/assets/del-video.png"
              alt=""
              @click="delVideo(index)"
              class="del-icon" />
          </div>
          <video
            v-if="li.status === 'done'"
            :src="urlLink + li.response[0]"
            class="video-info"
          ></video>
        </div>
      </div>
    </div>
    <div class="score-mask" style="z-index: 100;" v-if="mask" @click="mask = false">
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

export default {
  name: 'VideoComp',
  props: {
    videoList: {
      type: Array,
      default: null
    },
    limit: {
      type: Number,
      default: 20
    }
  },
  model: {
    prop: 'value',
    event: 'returnBack'
  },
  data () {
    return {
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/files/v`,
      urlLink: process.env.VUE_APP_API_BASE_URL,
      fileList: [],
      mask: false,
      videoUrl: null
    }
  },
  async mounted () {
      this.fileList = this.videoList
  },
  methods: {
    beforeUpload (file) {
      const isMp4 = file.type === 'video/mp4'
      const is50M = file.size / 1024 / 1024 < 50
      if (!isMp4) {
        this.$message.error('上传文件只能是MP4格式!')
      }
      if (!is50M) {
        this.$message.error('上传视频大小不能超过 50MB!')
      }
      return isMp4 && is50M
    },
    handleChange ({ fileList }) {
      this.fileList = fileList.filter(item => item.status !== undefined)
      this.$emit('returnBack', this.fileList)
    },
    showMask (index) {
      this.mask = true
      this.videoUrl = this.urlLink + this.fileList[index].response[0]
    },
    delVideo (index) {
      this.fileList.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../index.less';

</style>
