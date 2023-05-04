<template>
  <div>
    <div class="grade-wraper">
      <div class="list-item" style="margin-bottom:12px;">
        <a-upload
          name="file"
          accept="image/gif, image/jpeg, image/png"
          :file-list="fileList"
          :action="uploadUrl"
          :showUploadList="false"
          @change="handleChange"
        >
          <div class="upload-con" v-if="fileList && fileList.length < limit">
            <div class="u-con">
              <img src="~@/assets/upload_bg.png" />
              <p class="name">点击上传</p>
              <p class="crip">图片最大不可超出5M</p>
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
              style="opacity:0; width:100%; height:100%;"
              src="@/assets/play-video-icon.png"
              class="play-icon"
              alt=""
              @click="showMask(urlLink + li.response[0])"
              v-if="li.status === 'done'"/>
            <img
              src="@/assets/del-video.png"
              alt=""
              @click="delImage(index)"
              class="del-icon" />
          </div>
          <img
            v-if="li.status === 'done'"
            :src="urlLink + li.response[0]"
            class="video-info"
          />
        </div>
      </div>
    </div>
    <a-modal :visible="imageMask" :footer="null" @cancel="imageMask = false">
      <img style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>

export default {
  name: 'ImageComp',
  props: {
    imageList: {
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
      imageMask: false,
      previewImage: ''
    }
  },
  async mounted () {
    this.fileList = this.imageList
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
    showMask (url) {
      this.imageMask = true
      this.previewImage = url
    },
    delImage (index) {
      this.fileList.splice(index, 1)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../index.less';

</style>
