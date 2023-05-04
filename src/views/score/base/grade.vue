<template>
  <div style="padding-bottom:24px;">
    <a-card
      :bordered="false"
      style="margin-bottom:24px"
    >
      <div class="flex-box">
        <div class="box-item">
          <p>{{ data.nickname }} <span class="score-label" v-if="data.actorCategory">{{ data.actorCategory.code | changeCategory }}</span></p>
          <p>平台ID: {{ data.platformAccount || '-' }}</p>
        </div>
      </div>
    </a-card>
    <a-card
      :bordered="false"
      :loading="!data.actorCategory"
    >
      <tab-content title="主播基本信息" class="clearfix">
        <div class="grade-wraper">
          <div class="list-item" v-if="data.actorCategory && data.actorCategory.code !== 3">
            <span class="title">主播类型：</span>
            <template v-for="item in actorList">
              <span
                class="select-option"
                :class="{'active': actorType == item.id}"
                :key="item.name"
                v-if="!(item.id === 3 && data && data.platformType.code === 2)"
                @click="checkActor(item.id)">
                {{ item.name }}
              </span>
            </template>
          </div>
          <div v-for="(li, index) in question" :key="index" v-show="!li.relatedFieldModel.relatedField || (li.relatedFieldModel.relatedField && actorType === 3)">
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
              <!-- 游戏主播直播经验 -->
              <div class="live-exp" v-if="li.specialField === 'GAME_LIVE_EXPERIENCE' && liveExpCheck">
                <div class="label-con" style="margin-left: 40px;">
                  <span class="mr16">直播年限</span>
                  <a-select
                    style="width: 100px;"
                    v-model="yearLimit"
                    placeholder="请选择"
                  >
                    <a-select-option v-for="(value, key) in yearArr" :key="key" :value="key">
                      {{ value }}
                    </a-select-option>
                  </a-select>
                </div>
                <div class="label-con" style="margin-left:60px;">
                  <span class="mr16">直播所在模块</span>
                  <a-input style="width:260px;" v-model="livePosit" placeholder="请填写直播所在平台和游戏模块,20字内" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="data.actorCategory && data.actorCategory.code === 3">
          <a-row style="margin-top:20px;">
            <a-col :span="6">
              <div class="form-item">
                <span class="label mr16"><b>*</b>试播平台:</span>
                <a-input style="width:260px;" class="item" v-model="trialLivePlatform" placeholder="请填写平台名称,50字以内" />
              </div>
            </a-col>
            <a-col :span="1"></a-col>
            <a-col :span="9">
              <div class="form-item">
                <span class="label mr16"><b>*</b>试播平台昵称或ID(可在平台搜索出):</span>
                <a-input style="width:260px;" class="item" v-model="trialLiveIdOrNickname" placeholder="请填写平台ID或名称,50字以内" />
              </div>
            </a-col>
          </a-row>
          <a-row style="margin-top:24px;">
            <a-col :span="8">
              <div class="form-item" style="width:360px;">
                <span class="label mr16"><b>*</b>试播日期和具体时间:</span>
                <a-date-picker
                  class="item"
                  v-model="trialLiveDateTimeStr"
                  show-time
                  format="YYYY-MM-DD HH:mm"
                  value-format="YYYY-MM-DD HH:mm"
                  placeholder="请选择时间"
                />
              </div>
            </a-col>
          </a-row>
        </div>
      </tab-content>
    </a-card>
    <a-card
      class="mt24"
      v-if="data.actorCategory && data.actorCategory.code === 2 && data.platformType.code === 1"
      :bordered="false"
    >
      <tab-content title="主播原平台近12个月流水明细(元)" class="clearfix">
        <a-form layout="inline" style="position:relative;margin-top:-10px;">
          <a-row>
            <a-col :span="8" v-for="(item, idx) in monthList" :key="idx">
              <a-form-item :label="item.yearAndMonth" style="margin-top:24px;">
                <a-input-number :min="0" v-model="item.reward" style="min-width: 180px;" />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </tab-content>
    </a-card>
    <!--
       1.抖音的优质主播显示主播流水视频
       2.视频号除了新主播都显示主播流水视频
       actorCategory.code：1.新主播 2.优质主播 3.存量主播
    -->
    <a-card
      class="mt24"
      :bordered="false"
      v-if="data.actorCategory && data.actorCategory.code === 3"
    >
      <tab-content title="主播生活照" class="clearfix">
        <template slot="subTitle">上传3张主播生活照</template>
        <image-comp v-model="imageFileList" :imageList="imageFileList" :limit="3" />
      </tab-content>
    </a-card>
    <a-card
      class="mt24"
      :bordered="false"
      v-if="data.actorCategory && data.actorCategory.code === 3"
    >
      <tab-content title="主播游戏段位截图" class="clearfix">
        <template slot="subTitle">上传2张主播游戏段位截图证明</template>
        <image-comp v-model="imageFileList2" :imageList="imageFileList2" :limit="2" />
      </tab-content>
    </a-card>
    <a-card
      class="mt24"
      :bordered="false"
      v-if="data.actorCategory && data.actorCategory.code === 3 && liveResource"
    >
      <tab-content title="游戏/直播资源证明截图" class="clearfix">
        <template slot="subTitle">上传至少1张主播资源证明,如:游戏公会、自己的直播车队等</template>
        <image-comp v-model="imageFileList3" :imageList="imageFileList3" :limit="2" />
      </tab-content>
    </a-card>
    <a-card
      class="mt24"
      :bordered="false"
      v-if="data.actorCategory && data.actorCategory.code !== 3 && ((data.actorCategory.code === 2 && data.platformType.code === 1) || (data.platformType.code === 2 && data.actorCategory.code !== 1))"
    >
      <tab-content title="主播流水视频" class="clearfix">
        <template slot="subTitle">上传主播流水视频资料(需上传1条视频)</template>
        <video-comp v-model="fileList2" :videoList="fileList2" :limit="1" />
        <span>主播近三个月流水+主播主页录屏+近一年总流水的录屏视频</span>
      </tab-content>
    </a-card>
    <a-card
      class="mt24"
      :bordered="false"
      v-if="data.actorCategory && data.actorCategory.code !== 3"
    >
      <tab-content title="主播视频内容" class="clearfix">
        <template slot="subTitle">上传主播视频资料(需上传2条主播相关视频)</template>
        <video-comp v-model="fileList" :videoList="fileList" :limit="2" />
      </tab-content>
    </a-card>
    <a-card
      class="mt24"
      :bordered="false"
      v-if="question.find(item => item.specialField === 'ADDITIONAL_ITEM') && question.find(item => item.specialField === 'ADDITIONAL_ITEM').optionModelList.some(item => item.checked)"
    >
      <tab-content title="附加分视频" class="clearfix">
        <template slot="subTitle">上传主播附加分视频(需上传1条视频)</template>
        <div>
          <video-comp v-model="fileList3" :videoList="fileList3" :limit="1" />
        </div>
        <span>选择附加分的情况下需上传1条视频内容</span>
      </tab-content>
    </a-card>
    <a-card
      v-if="data.actorCategory && data.actorCategory.code === 3"
      class="mt24"
      :bordered="false"
    >
      <tab-content title="主播才艺视频" class="clearfix">
        <template slot="subTitle">上传1条主播才艺展示视频</template>
        <div>
          <video-comp v-model="fileList4" :videoList="fileList4" :limit="1" />
        </div>
      </tab-content>
    </a-card>
    <div class="footer-bar">
      <a-popconfirm
        overlayClassName="popoer-del"
        title="仅可申诉一次，确认提交？"
        ok-text="确定"
        cancel-text="取消"
        @confirm="submitHandle(2)">
        <a-button type="primary" :loading="loading" v-if="data.appealable && data.state.code == 3">提交</a-button>
      </a-popconfirm>
      <a-popconfirm
        overlayClassName="popoer-del"
        title="是否立即提交本次申请？"
        ok-text="确定"
        cancel-text="取消"
        @confirm="submitHandle(1)">
        <a-button
          type="primary"
          v-if="data.state && data.state.code == 0"
          :loading="loading">
          提交
        </a-button>
      </a-popconfirm>
      <a-popconfirm
        overlayClassName="popoer-del"
        title="是否放弃本次申请？"
        ok-text="确定"
        cancel-text="取消"
        @confirm="cancel()">
        <a-button
          style="margin-left:24px"
          @click="cancel">
          取消
        </a-button>
      </a-popconfirm>
    </div>
  </div>
</template>

<script>
import TabContent from '../components/TabContent'
import VideoComp from './components/VideoComp'
import ImageComp from './components/ImageComp'
import { getEmployeeQuestion, employeeGrade, employeeSSGrade } from '@/api/score'

export default {
  components: {
    TabContent,
    VideoComp,
    ImageComp
  },
  data () {
    return {
      query: {
        scoreId: undefined,
        tiktokLiveInfoId: undefined
      },
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}/files/v`,
      mask: false,
      question: [],
      data: {},
      visible: false,
      loading: false,
      actorType: '',
      actorListNormal: [{
        id: 1,
        name: '颜值类型'
      }, {
        id: 2,
        name: '才艺型'
      }, {
        id: 3,
        name: '人气型'
      }],
      actorList: [],
      fileList: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      urlLink: process.env.VUE_APP_API_BASE_URL,
      videoUrl: '',
      monthList: [],

      imageFileList: [],
      imageFileList2: [],
      imageFileList3: [],

      liveResource: false,

      liveExpCheck: false,
      livePosit: '',
      yearLimit: '',
      yearArr: {
        '0.5年': '0.5年',
        '1年': '1年',
        '1.5年': '1.5年',
        '2年': '2年',
        '2.5年': '2.5年',
        '3年': '3年',
        '3.5年': '3.5年',
        '4年': '4年',
        '4.5年': '4.5年',
        '5年': '5年',
        '5年以上': '5年以上'
      },

      trialLivePlatform: null,
      trialLiveIdOrNickname: null,
      trialLiveDateTimeStr: null
    }
  },

  mounted () {
    this.query.tiktokLiveInfoId = this.$route.query.tiktokLiveInfoId
    this.query.scoreId = this.$route.query.scoreId
    this.getDetailQuestion()
  },

  methods: {
    getDetailQuestion () {
      getEmployeeQuestion(this.query).then(res => {
        const imageVideoData = res.scorePictureS

        // 主播内容视频
        this.fileList = imageVideoData.find(item => item.pictureType === 1) ? this.getFileData(imageVideoData.find(item => item.pictureType === 1).pictureUrl) : []
        // 主播流水视频
        this.fileList2 = imageVideoData.find(item => item.pictureType === 2) ? this.getFileData(imageVideoData.find(item => item.pictureType === 2).pictureUrl) : []
        // 附加视频
        this.fileList3 = imageVideoData.find(item => item.pictureType === 3) ? this.getFileData(imageVideoData.find(item => item.pictureType === 3).pictureUrl) : []
        // 附加视频
        this.fileList4 = imageVideoData.find(item => item.pictureType === 7) ? this.getFileData(imageVideoData.find(item => item.pictureType === 7).pictureUrl) : []

        // 如果是新主播，主播类型不显示人气型
        if (res.actorCategory.code === 1) {
          this.actorList = this.actorListNormal.filter(item => item.id !== 3)
        } else {
          this.actorList = this.actorListNormal
        }
        // 主播类型
        this.actorType = res.actorType ? res.actorType.code : ''
        this.data = res
        // 题目列表
        this.question = res.questionOptionModelList.filter(item => item.optionType !== 'input')
        // 月份列表
        this.monthList = res.questionOptionModelList.find(item => item.optionType === 'input') && res.questionOptionModelList.find(item => item.optionType === 'input').monthRewardModels

        // 如果是游戏女主播
        if (res.actorCategory.code === 3) {
          this.trialLivePlatform = res.trialLivePlatform
          this.trialLiveIdOrNickname = res.trialLiveIdOrNickname
          this.trialLiveDateTimeStr = res.trialLiveDateTime
          this.livePosit = res.livePlate
          this.yearLimit = res.liveYear
          // 判断直播经验
          const gamedata = res.questionOptionModelList.find(item => item.specialField === 'GAME_LIVE_EXPERIENCE')
          const gameSource = res.questionOptionModelList.find(item => item.specialField === 'GAME_LIVE_RESOURCES')
          const item = gamedata.optionModelList.find(item => item.checked === true)
          if (item && item.optionVal === '无') {
            this.liveExpCheck = false
          }
          if (item && item.optionVal === '有') {
            this.liveExpCheck = true
          }

          // 如果有资源 则展示资源截图
          if (gameSource && gameSource.optionModelList[0].checked) {
            this.liveResource = true
          }

          // 主播生活照
          this.imageFileList = imageVideoData.find(item => item.pictureType === 4) ? this.getFileData(imageVideoData.find(item => item.pictureType === 4).pictureUrl) : []
          // 段位截图
          this.imageFileList2 = imageVideoData.find(item => item.pictureType === 5) ? this.getFileData(imageVideoData.find(item => item.pictureType === 5).pictureUrl) : []
          // 直播资源证明截图
          this.imageFileList3 = imageVideoData.find(item => item.pictureType === 6) ? this.getFileData(imageVideoData.find(item => item.pictureType === 6).pictureUrl) : []
          console.log(123, this.imageFileList3)
        }
      })
    },
    getFileData (url) {
      const arr = []
      const urls = url ? url.split(',') : []
      urls.forEach((item, index) => {
        arr.push({
          status: 'done',
          response: [item],
          uid: index,
          name: item
        })
      })
      return arr
    },

    checkOption (listData, item) {
      if (listData.disableChoice) {
        return
      }
      if (listData.optionType === 'radio') {
        listData.optionModelList.forEach(it => {
          if (item.id !== it.id) it.checked = false
        })
        item.checked = !item.checked

        // 是否有直播经验
        if (item.optionVal === '无') {
          this.liveExpCheck = false
        }
        if (item.optionVal === '有') {
          this.liveExpCheck = item.checked || false
        }
      } else {
        item.checked = !item.checked
        // 是否拥有资源
        if (item.optionVal.includes('拥有游戏/直播类目资源')) {
          this.liveResource = item.checked || false
          this.imageFileList3 = []
        }
      }
    },
    checkActor (val) {
      this.actorType = val
      this.question.forEach(item => {
        if (!item.disableChoice) {
          item.optionModelList.forEach(itx => {
            itx.checked = false
          })
        }
      })
    },
    cancel () {
      window.history.go(-1)
    },
    submitHandle (type) {
      if (this.data.actorCategory.code === 3) {
        // 逻辑太多 如果是游戏主播单独处理
        this.handleGameSubmit(type)
        return
      }
      if (this.loading) {
        return
      }
      if (!this.actorType) {
        this.$message.error('请选择主播类型')
        return
      }
      const optionIds = []
      let flag = true
      try {
        this.question.forEach(item => {
          if (item.optionType !== 'file' && !item.optionModelList.some(item => item.checked) && item.isRequired) {
            if (item.specialField !== 'ADDITIONAL_ITEM' && (!item.relatedFieldModel.relatedField || (item.relatedFieldModel.relatedField && this.actorType === 3))) {
              throw new Error(`请选择${item.title}`)
            }
          }
          item.optionModelList.forEach(it => {
            if (it.checked) optionIds.push(it.id)
          })
        })
      } catch (e) {
        flag = false
        this.$message.error(e.message)
      }
      if (!flag) return
      if ((this.data.platformType.code === 1 && this.data.actorCategory.code === 2 && this.fileList2.length === 0) || ((this.data.platformType.code === 2 && this.data.actorCategory.code !== 1 && this.fileList2.length === 0))) {
        this.$message.error('请上传主播流水视频')
        flag = false
        return
      }
      if (this.fileList.length === 0) {
        this.$message.error('请上传主播视频资料')
        flag = false
        return
      }
      if (this.fileList.length !== 2) {
        this.$message.error('需上传2条主播视频资料')
        flag = false
        return
      }
      if (this.question.find(item => item.specialField === 'ADDITIONAL_ITEM') && this.question.find(item => item.specialField === 'ADDITIONAL_ITEM').optionModelList.some(item => item.checked)) {
        if (this.fileList3.length === 0) {
          this.$message.error('请上传附加分视频')
          flag = false
          return
        }
      } else {
        this.fileList3 = []
      }
      // 抖音优质主播类型时 判断流水信息
      if (this.data.actorCategory.code === 2 && this.data.platformType.code === 1) {
        try {
          this.monthList.forEach(item => {
            if (!item.reward && item.reward !== 0) {
              throw new Error(`您有未填写的流水信息`)
            }
          })
        } catch (e) {
          flag = false
          this.$message.error(e.message)
        }
      }
      const imageVideoList = this.generateVideoImageData()

      if (!flag) return
      this.loading = true
      if (type === 1) {
        employeeGrade({
          actorType: this.actorType,
          optionIds,
          monthRewards: this.monthList,
          ...this.query,
          scorePictureS: imageVideoList
        }).then(res => {
          this.loading = false
          this.$message.success('操作成功')
          this.$router.push({
            path: '/score/base/list'
          })
        }).catch(res => {
          this.loading = false
        })
      } else {
        employeeSSGrade({
          actorType: this.actorType,
          optionIds,
          monthRewards: this.monthList,
          ...this.query,
          scorePictureS: imageVideoList
        }).then(res => {
          this.loading = false
          this.$message.success('操作成功')
          this.$router.push({
            path: '/score/base/list'
          })
        }).catch(res => {
          this.loading = false
        })
      }
    },
    handleGameSubmit (type) {
      if (this.loading) {
        return
      }
      const optionIds = []
      let flag = true
      try {
        this.question.forEach(item => {
          if (item.optionType !== 'file' && !item.optionModelList.some(item => item.checked) && item.isRequired) {
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

      // 如果选择了 直播经验 则必填项判断
      if (this.liveExpCheck) {
        if (!this.yearLimit) {
          this.$message.error('请选择直播年限')
          return
        }
        if (!this.livePosit) {
          this.$message.error('请填写直播所在模块')
          return
        }
      }

      if (!this.trialLivePlatform) {
        this.$message.error('请填写试播平台')
        return
      }
      if (!this.trialLiveIdOrNickname) {
        this.$message.error('请填写试播平台昵称或id')
        return
      }
      if (!this.trialLiveDateTimeStr) {
        this.$message.error('请填写试播日期')
        return
      }

      if (this.imageFileList.length < 3) {
        this.$message.error('请上传3张主播生活照')
        return
      }
      if (this.imageFileList2.length < 2) {
        this.$message.error('请上传2张主播游戏段位截图')
        return
      }

      // 如果直播资源 是  则必须上传一张图片
      if (this.liveResource && this.imageFileList3.length < 1) {
        this.$message.error('请上传1张以上 游戏/直播资源证明截图')
        return
      }

      const imageVideoList = this.generateVideoImageData()
      this.loading = true

      const data = {
        optionIds,
        ...this.query,
        liveYear: this.yearLimit,
        livePlate: this.livePosit,
        trialLivePlatform: this.trialLivePlatform,
        trialLiveIdOrNickname: this.trialLiveIdOrNickname,
        trialLiveDateTimeStr: this.trialLiveDateTimeStr,
        scorePictureS: imageVideoList
      }

      if (type === 1) {
        employeeGrade(data).then(res => {
          this.loading = false
          this.$message.success('操作成功')
          this.$router.push({
            path: '/score/base/list'
          })
        }).catch(res => {
          this.loading = false
        })
      } else {
        employeeSSGrade(data).then(res => {
          this.loading = false
          this.$message.success('操作成功')
          this.$router.push({
            path: '/score/base/list'
          })
        }).catch(res => {
          this.loading = false
        })
      }
    },
    generateVideoImageData () {
      const arr = [
        {
          pictureType: 1,
          pictureUrl: this.getUrls(this.fileList)
        },
        {
          pictureType: 2,
          pictureUrl: this.getUrls(this.fileList2)
        },
        {
          pictureType: 3,
          pictureUrl: this.getUrls(this.fileList3)
        },
        {
          pictureType: 4,
          pictureUrl: this.getUrls(this.imageFileList)
        },
        {
          pictureType: 5,
          pictureUrl: this.getUrls(this.imageFileList2)
        },
        {
          pictureType: 6,
          pictureUrl: this.getUrls(this.imageFileList3)
        },
        {
          pictureType: 7,
          pictureUrl: this.getUrls(this.fileList4)
        }
      ]

      return arr
    },
    getUrls (list) {
      const arr = []
      if (list && list.length > 0) {
        list.forEach(item => {
          if (item.status === 'error' || item.status === undefined) {
            throw new Error(`视频上传失败，请重试`)
          } else if (item.status === 'uploading') {
            throw new Error(`视频上传中，请稍后再试`)
          }
          arr.push(item.response[0])
        })
      }

      return arr.toString()
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
    }
  }
}

</script>
<style lang='less' scoped>
@import '../index.less';
.live-exp {
  display: flex;
  align-items: center;
  margin-top: 10px;
}
.footer-bar {
    position: fixed;
    background-color: #fff;
    padding: 16px 24px;
    text-align: right;
    width: 100%;
    left: 0;
    bottom: 0;
    z-index: 10;
  }
.form-item {
  .label {
    color: #333;
  }
}
</style>
